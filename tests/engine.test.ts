/**
 * Engine tests.
 *
 * These cover the parts where a silent error would be invisible to a user but
 * would corrupt every score the platform reports: ability estimation, the
 * scale transform, answer checking, adaptive assembly, and the review
 * scheduler. UI behaviour is covered separately by the browser smoke test.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  pCorrect,
  information,
  estimateAbility,
  logLikelihood,
  standardError,
  marginalReliability,
  formReliability,
  reliabilityGrade,
} from '../src/engine/irt.ts';
import {
  isCorrect,
  normaliseSpr,
  sprToNumber,
  percentileForTotal,
  scoreAttempt,
  thetaToScaled,
  scaledToTheta,
  SECTION_MIN,
  SECTION_MAX,
} from '../src/engine/scoring.ts';
import { allocate, assembleForm, assembleModuleItems, routePathway, ROUTING_THRESHOLD } from '../src/engine/adaptive.ts';
import { newCard, review, isMastered, dueCards, GRADE_AGAIN, GRADE_GOOD, GRADE_EASY } from '../src/engine/srs.ts';
import { classifyError, currentStreak, skillStats } from '../src/engine/analytics.ts';
import { assessFeasibility, generatePlan, planProgress } from '../src/engine/studyPlan.ts';
import { compile, evaluate, ExprError, tokenize, stripAssignment } from '../src/lib/expr.ts';
import { BANK, QUESTION_BY_ID, bankStats } from '../src/data/bank.ts';
import { validateGenerated, generateMathItems } from '../src/data/generators.ts';
import { DOMAINS, SECTION_SPEC } from '../src/data/blueprint.ts';
import { permissionsFor, can, canForClass, canViewLearner, levelForScore, rankAtLeast, pointsToNextLevel, TEACHER_RANK_ORDER } from '../src/auth/roles.ts';
import { addDays, daysBetween, formatClock, formatDuration, isoDate, makeRng, roundTo } from '../src/lib/util.ts';
import type { Attempt, Question, TestModule } from '../src/types.ts';

/* ================= IRT ================= */

test('pCorrect is monotone in ability and centred at the item difficulty', () => {
  const item = { a: 1.2, b: 0.5 };
  assert.ok(pCorrect(-2, item) < pCorrect(0, item));
  assert.ok(pCorrect(0, item) < pCorrect(2, item));
  // At theta = b the model predicts exactly a coin flip.
  assert.ok(Math.abs(pCorrect(0.5, item) - 0.5) < 1e-9);
});

test('pCorrect stays a probability at extreme abilities', () => {
  const item = { a: 2.5, b: 0 };
  const low = pCorrect(-40, item);
  const high = pCorrect(40, item);

  assert.ok(low >= 0 && low <= 1, `low was ${low}`);
  assert.ok(high >= 0 && high <= 1, `high was ${high}`);
  assert.ok(low < 1e-9, `low should be vanishing, was ${low}`);
  assert.ok(high > 1 - 1e-9, `high should be near certain, was ${high}`);

  // At this distance the true probability differs from 1 by around 1e-74,
  // which float64 cannot represent, so `high` rounds to exactly 1. The
  // guarantee that matters is downstream: a saturated probability paired with
  // the opposite outcome must not send the log likelihood to -Infinity.
  assert.ok(Number.isFinite(logLikelihood(40, [{ item, correct: false }])));
  assert.ok(Number.isFinite(logLikelihood(-40, [{ item, correct: true }])));
});

test('information peaks where the item difficulty matches the ability', () => {
  const item = { a: 1.5, b: 0.8 };
  const atPeak = information(0.8, item);
  assert.ok(atPeak > information(-0.5, item));
  assert.ok(atPeak > information(2.2, item));
});

test('ability estimate rises with the number of correct responses', () => {
  const item = { a: 1.2, b: 0 };
  const allWrong = estimateAbility(Array.from({ length: 10 }, () => ({ item, correct: false })));
  const mixed = estimateAbility(Array.from({ length: 10 }, (_, i) => ({ item, correct: i < 5 })));
  const allRight = estimateAbility(Array.from({ length: 10 }, () => ({ item, correct: true })));

  assert.ok(allWrong.theta < mixed.theta, 'wrong < mixed');
  assert.ok(mixed.theta < allRight.theta, 'mixed < right');
  // A half-correct run on medium items should land near the scale centre.
  assert.ok(Math.abs(mixed.theta) < 0.25, `mixed theta was ${mixed.theta}`);
});

test('ability estimate stays finite for a perfect and a zero score', () => {
  const item = { a: 1.5, b: 0 };
  const perfect = estimateAbility(Array.from({ length: 30 }, () => ({ item, correct: true })));
  const zero = estimateAbility(Array.from({ length: 30 }, () => ({ item, correct: false })));

  assert.ok(Number.isFinite(perfect.theta) && Math.abs(perfect.theta) < 5, `perfect ${perfect.theta}`);
  assert.ok(Number.isFinite(zero.theta) && Math.abs(zero.theta) < 5, `zero ${zero.theta}`);
  // This is exactly why EAP is used rather than maximum likelihood, which
  // diverges to infinity for both of these response patterns.
});

test('standard error shrinks as more items are administered', () => {
  const item = { a: 1.2, b: 0 };
  const few = estimateAbility(Array.from({ length: 4 }, (_, i) => ({ item, correct: i % 2 === 0 })));
  const many = estimateAbility(Array.from({ length: 40 }, (_, i) => ({ item, correct: i % 2 === 0 })));
  assert.ok(many.se < few.se, `${many.se} should be < ${few.se}`);
});

test('empty response set returns the prior unchanged', () => {
  const result = estimateAbility([]);
  assert.equal(result.theta, 0);
  assert.equal(result.se, 1);
});

test('marginal reliability is between 0 and 1 and rises as error falls', () => {
  const noisy = marginalReliability([0.7, 0.8, 0.75]);
  const precise = marginalReliability([0.25, 0.3, 0.28]);
  assert.ok(noisy >= 0 && noisy <= 1);
  assert.ok(precise > noisy);
});

test('reliability weights the population, not the ability range', () => {
  // The tails are where a form measures worst. Averaging SE evenly across the
  // range over-counts them and understates the reliability any real cohort,
  // which clusters near the middle, would actually experience.
  const seValues = [1.2, 0.4, 0.3, 0.4, 1.2];
  const weights = [0.05, 0.2, 0.5, 0.2, 0.05];
  const flat = marginalReliability(seValues);
  const weighted = marginalReliability(seValues, 1, weights);
  assert.ok(weighted > flat, 'a population-weighted figure must exceed the flat average here');
  assert.ok(weighted <= 1);
});

test('an infinite standard error does not poison the whole reliability figure', () => {
  // A node where the form carries no information yields SE = Infinity. Left in
  // the mean, one such node makes every form report reliability 0.
  const withGap = marginalReliability([0.3, Infinity, 0.3]);
  assert.ok(Number.isFinite(withGap));
  assert.ok(withGap > 0.8, `expected a usable figure, got ${withGap}`);
  assert.equal(marginalReliability([Infinity, Infinity]), 0, 'no information anywhere means no reliability');
});

test('form reliability rises with length', () => {
  const short = formReliability([{ a: 1, b: 0 }, { a: 1, b: 0.5 }]);
  const long = formReliability(Array.from({ length: 27 }, (_, i) => ({ a: 1, b: -1.3 + i * 0.1 })));

  assert.ok(short >= 0 && short <= 1);
  assert.ok(long > short, 'a longer form must measure more reliably');
  assert.equal(formReliability([]), 0, 'a form with no items measures nothing');
});

test('discrimination only helps where the form covers the population', () => {
  /*
   * Measured, not assumed. Sharpening every item while holding the difficulty
   * range fixed makes each one informative in a narrower neighbourhood, so the
   * form stops measuring the tails at all: at a = 2.5 over b ∈ [-1.3, 1.3] the
   * standard error at θ = 2.5 is 1.78, against 0.69 for the same form at
   * a = 1. Marginal reliability peaks near a = 1.4 and then collapses.
   *
   * This is a real constraint on assembly, not a quirk of the arithmetic:
   * chasing discrimination without widening difficulty coverage buys precision
   * for the middle of the cohort by abandoning its ends.
   */
  const span = (a: number, lo: number, hi: number) =>
    formReliability(Array.from({ length: 27 }, (_, i) => ({ a, b: lo + (i * (hi - lo)) / 26 })));

  const modest = span(1, -1.3, 1.3);
  const sharper = span(1.4, -1.3, 1.3);
  const tooSharp = span(2.5, -1.3, 1.3);

  assert.ok(sharper > modest, 'moderate discrimination should help');
  assert.ok(
    tooSharp < modest,
    `extreme discrimination over a narrow range should hurt, got ${tooSharp.toFixed(2)}`,
  );

  // Widen the difficulty range to match and the same items measure superbly.
  assert.ok(span(2.5, -2.6, 2.6) > 0.9, 'coverage is what makes discrimination pay');
});

test('a full operational module reaches the reliability a score report claims', () => {
  // 27 operational items is what an SAT365 module delivers. If a real module
  // cannot clear the group-only threshold, the score report is overstating
  // what it can support and this test should fail rather than the interface
  // quietly reporting a number nobody checked.
  const module = Array.from({ length: 27 }, (_, i) => ({ a: 1.15, b: -1.3 + i * 0.1 }));
  const reliability = formReliability(module);
  assert.ok(reliability >= 0.7, `a delivered module reached only ${reliability.toFixed(2)}`);
  assert.equal(reliabilityGrade(reliability), reliability >= 0.9 ? 'individual' : reliability >= 0.8 ? 'adequate' : 'group-only');
});

test('a reliability grade never overstates what the figure licenses', () => {
  assert.equal(reliabilityGrade(0.95), 'individual');
  assert.equal(reliabilityGrade(0.9), 'individual');
  // The boundary must not round up: 0.899 is not good enough for one student.
  assert.equal(reliabilityGrade(0.899), 'adequate');
  assert.equal(reliabilityGrade(0.8), 'adequate');
  assert.equal(reliabilityGrade(0.75), 'group-only');
  assert.equal(reliabilityGrade(0.4), 'insufficient');
  assert.equal(reliabilityGrade(0), 'insufficient');
});

test('standardError is infinite with no items and finite with them', () => {
  assert.equal(standardError(0, []), Infinity);
  assert.ok(Number.isFinite(standardError(0, [{ a: 1, b: 0 }, { a: 1, b: 0.5 }])));
});

/* ================= Scale transform ================= */

test('theta maps onto the 200-800 scale with the documented anchors', () => {
  assert.equal(thetaToScaled(0), 500);
  assert.equal(thetaToScaled(1), 600);
  assert.equal(thetaToScaled(-1), 400);
});

test('scaled score is clamped to the reportable range', () => {
  assert.equal(thetaToScaled(9), SECTION_MAX);
  assert.equal(thetaToScaled(-9), SECTION_MIN);
});

test('scaled score is always a multiple of ten', () => {
  for (let theta = -3; theta <= 3; theta += 0.07) {
    assert.equal(thetaToScaled(theta) % 10, 0, `theta ${theta}`);
  }
});

test('routing to the lower module caps the reportable section score', () => {
  const upper = thetaToScaled(3, 'upper');
  const lower = thetaToScaled(3, 'lower');
  assert.equal(upper, 800);
  assert.ok(lower < upper, 'lower pathway must cap below the ceiling');
});

test('scaledToTheta inverts thetaToScaled inside the unclamped range', () => {
  for (const theta of [-2, -1, 0, 1, 2]) {
    assert.ok(Math.abs(scaledToTheta(thetaToScaled(theta)) - theta) < 0.06);
  }
});

test('percentile increases monotonically with the total score', () => {
  let previous = -1;
  for (let total = 400; total <= 1600; total += 50) {
    const percentile = percentileForTotal(total);
    assert.ok(percentile >= previous, `percentile fell at ${total}`);
    assert.ok(percentile >= 1 && percentile <= 99);
    previous = percentile;
  }
});

/* ================= Answer checking ================= */

test('multiple choice compares against the keyed choice id', () => {
  const question = QUESTION_BY_ID.get('ma_l1_001')!;
  assert.equal(question.answer, 'C');
  assert.ok(isCorrect(question, 'C'));
  assert.ok(!isCorrect(question, 'A'));
  assert.ok(!isCorrect(question, null));
  assert.ok(!isCorrect(question, ''));
});

test('student-produced responses accept every equivalent numeric form', () => {
  const question: Question = {
    id: 'spr_test',
    section: 'math',
    domain: 'algebra',
    skill: 'linear-equations-1var',
    format: 'spr',
    band: 'medium',
    irt: { a: 1, b: 0 },
    targetSeconds: 60,
    prompt: 'test',
    answer: ['3/4'],
    explanation: 'x'.repeat(40),
  };

  for (const value of ['3/4', '0.75', '.75', ' 0.75 ', '+0.75']) {
    assert.ok(isCorrect(question, value), `${value} should be accepted`);
  }
  for (const value of ['0.7', '4/3', 'abc', '']) {
    assert.ok(!isCorrect(question, value), `${value} should be rejected`);
  }
});

test('student-produced responses reject a division by zero', () => {
  assert.equal(sprToNumber('3/0'), null);
});

test('normaliseSpr strips whitespace and a leading plus', () => {
  assert.equal(normaliseSpr('  + 12 '), '12');
});

/* ================= Bank integrity ================= */

test('every item in the bank is structurally valid', () => {
  const seen = new Set<string>();
  for (const question of BANK) {
    assert.ok(!seen.has(question.id), `duplicate id ${question.id}`);
    seen.add(question.id);

    assert.ok(question.prompt.trim().length > 0, `${question.id} has no prompt`);
    assert.ok(question.explanation.trim().length >= 20, `${question.id} has a thin explanation`);
    assert.ok(question.irt.a > 0, `${question.id} has a non-positive discrimination`);
    assert.ok(question.targetSeconds > 0, `${question.id} has no time target`);

    if (question.format === 'mcq') {
      assert.equal(question.choices?.length, 4, `${question.id} needs four choices`);
      const ids = question.choices!.map((c) => c.id);
      assert.deepEqual(ids, ['A', 'B', 'C', 'D'], `${question.id} choice ids`);
      assert.ok(ids.includes(String(question.answer)), `${question.id} key is not a choice`);

      const texts = question.choices!.map((c) => c.text.trim());
      assert.equal(new Set(texts).size, 4, `${question.id} has duplicate choice text`);
      assert.ok(texts.every((x) => x.length > 0), `${question.id} has an empty choice`);
    } else {
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      assert.ok(answers.length > 0, `${question.id} has no accepted answer`);
      assert.ok(
        answers.every((a) => sprToNumber(a) !== null),
        `${question.id} has a non-numeric grid-in key`,
      );
    }
  }
});

test('every item classifies into the published blueprint', () => {
  const skillIds = new Set(DOMAINS.flatMap((d) => d.skills.map((s) => s.id)));
  const domainIds = new Set(DOMAINS.map((d) => d.id));

  for (const question of BANK) {
    assert.ok(domainIds.has(question.domain), `${question.id}: unknown domain ${question.domain}`);
    assert.ok(skillIds.has(question.skill), `${question.id}: unknown skill ${question.skill}`);

    const domain = DOMAINS.find((d) => d.id === question.domain)!;
    assert.equal(domain.section, question.section, `${question.id}: domain/section mismatch`);
    assert.ok(
      domain.skills.some((s) => s.id === question.skill),
      `${question.id}: skill does not belong to its domain`,
    );
  }
});

test('grid-in items appear only in Math', () => {
  for (const question of BANK) {
    if (question.format === 'spr') assert.equal(question.section, 'math', question.id);
  }
});

test('domain weights sum to one within each section', () => {
  for (const section of ['rw', 'math'] as const) {
    const total = DOMAINS.filter((d) => d.section === section).reduce((acc, d) => acc + d.weight, 0);
    assert.ok(Math.abs(total - 1) < 1e-9, `${section} weights summed to ${total}`);
  }
});

test('the bank is deep enough to deliver a full adaptive form', () => {
  const stats = bankStats();
  for (const section of ['rw', 'math'] as const) {
    // Routing module plus both second-stage pathways, none sharing items with
    // the routing module.
    const needed = SECTION_SPEC[section].questionsPerModule * 2;
    assert.ok(
      stats.bySection[section] >= needed,
      `${section} bank holds ${stats.bySection[section]}, needs at least ${needed}`,
    );
  }
});

test('generated items are all valid and reproducible from their seed', () => {
  const first = generateMathItems(4242, 3);
  const second = generateMathItems(4242, 3);

  assert.ok(first.length > 0);
  assert.deepEqual(
    first.map((q) => q.id + '|' + JSON.stringify(q.answer)),
    second.map((q) => q.id + '|' + JSON.stringify(q.answer)),
    'the same seed must produce the same items',
  );

  for (const item of first) {
    assert.equal(validateGenerated(item), null, `${item.id}: ${validateGenerated(item)}`);
  }
});

/* ================= Adaptive assembly ================= */

test('allocate distributes exactly the requested total', () => {
  for (const total of [22, 27, 44, 54]) {
    const parts = allocate([0.35, 0.35, 0.15, 0.15], total);
    assert.equal(parts.reduce((a, b) => a + b, 0), total);
    assert.ok(parts.every((n) => n >= 0));
  }
});

test('allocate handles a zero total and a single weight', () => {
  assert.deepEqual(allocate([0.5, 0.5], 0), [0, 0]);
  assert.deepEqual(allocate([1], 7), [7]);
});

test('a full-length form matches the published structure exactly', () => {
  const form = assembleForm({ scope: 'full', bank: BANK, label: 'T', seed: 7 });

  for (const section of ['rw', 'math'] as const) {
    const spec = SECTION_SPEC[section];
    const modules = form.modules.filter((m) => m.section === section);
    // One routing module and two candidate second-stage modules.
    assert.equal(modules.length, 3, `${section} module count`);

    for (const module of modules) {
      assert.equal(module.questionIds.length, spec.questionsPerModule, `${module.id} length`);
      assert.equal(new Set(module.questionIds).size, module.questionIds.length, `${module.id} duplicates`);
      assert.equal(module.durationSeconds, spec.moduleSeconds, `${module.id} duration`);
      assert.equal(module.pretestIds.length, spec.pretestPerModule, `${module.id} pretest count`);

      for (const id of module.questionIds) {
        const question = QUESTION_BY_ID.get(id);
        assert.ok(question, `${module.id} references unknown item ${id}`);
        assert.equal(question!.section, section, `${module.id} carries a wrong-section item`);
      }
      for (const id of module.pretestIds) {
        assert.ok(module.questionIds.includes(id), `${module.id} pretest id is not in the module`);
      }
    }

    // A student must never see the same item twice within a section.
    const stage1 = modules.find((m) => m.stage === 1)!;
    for (const pathway of ['upper', 'lower'] as const) {
      const stage2 = modules.find((m) => m.stage === 2 && m.pathway === pathway)!;
      const overlap = stage2.questionIds.filter((id) => stage1.questionIds.includes(id));
      assert.equal(overlap.length, 0, `${section}/${pathway} repeats ${overlap.length} items from module 1`);
    }
  }

  assert.equal(form.breakSeconds, 600, 'a full test carries the ten-minute break');
});

test('a full-length delivery is 98 operational-plus-pretest items', () => {
  const perSection = SECTION_SPEC.rw.questionsPerModule * 2 + SECTION_SPEC.math.questionsPerModule * 2;
  assert.equal(perSection, 98);
});

test('the upper pathway is genuinely harder than the lower one', () => {
  const form = assembleForm({ scope: 'full', bank: BANK, label: 'D', seed: 99 });
  for (const section of ['rw', 'math'] as const) {
    const meanDifficulty = (pathway: string) => {
      const module = form.modules.find((m) => m.section === section && m.stage === 2 && m.pathway === pathway)!;
      return (
        module.questionIds.reduce((acc, id) => acc + QUESTION_BY_ID.get(id)!.irt.b, 0) /
        module.questionIds.length
      );
    };
    assert.ok(
      meanDifficulty('upper') > meanDifficulty('lower') + 0.3,
      `${section}: upper ${meanDifficulty('upper').toFixed(2)} vs lower ${meanDifficulty('lower').toFixed(2)}`,
    );
  }
});

test('form assembly is reproducible from its seed', () => {
  const a = assembleForm({ scope: 'full', bank: BANK, label: 'X', seed: 1234 });
  const b = assembleForm({ scope: 'full', bank: BANK, label: 'X', seed: 1234 });
  assert.deepEqual(
    a.modules.map((m) => m.questionIds),
    b.modules.map((m) => m.questionIds),
  );
});

test('a section form delivers only that section, with no break', () => {
  const form = assembleForm({ scope: 'math', bank: BANK, label: 'M', seed: 5 });
  assert.ok(form.modules.every((m) => m.section === 'math'));
  assert.equal(form.breakSeconds, 0);
});

test('a diagnostic form is shorter in both items and time', () => {
  const full = assembleForm({ scope: 'full', bank: BANK, label: 'F', seed: 3 });
  const quick = assembleForm({ scope: 'full', bank: BANK, label: 'Q', seed: 3, diagnostic: true });
  const rwFull = full.modules.find((m) => m.section === 'rw')!;
  const rwQuick = quick.modules.find((m) => m.section === 'rw')!;

  assert.ok(rwQuick.questionIds.length < rwFull.questionIds.length);
  assert.ok(rwQuick.durationSeconds < rwFull.durationSeconds);
});

test('routing sends stronger performers up and weaker ones down', () => {
  assert.equal(routePathway(2), 'upper');
  assert.equal(routePathway(-2), 'lower');
  assert.equal(routePathway(ROUTING_THRESHOLD), 'upper', 'the threshold itself routes upward');
  assert.equal(routePathway(ROUTING_THRESHOLD - 0.01), 'lower');
});

test('module assembly respects an exclusion set', () => {
  const exclude = new Set(BANK.filter((q) => q.section === 'rw').slice(0, 30).map((q) => q.id));
  const items = assembleModuleItems({
    section: 'rw',
    pathway: 'routing',
    count: 20,
    exclude,
    bank: BANK,
    rng: makeRng(11),
  });
  assert.equal(items.length, 20);
  assert.ok(items.every((q) => !exclude.has(q.id)), 'an excluded item was selected');
});

/* ================= Scoring an attempt ================= */

function buildScoredAttempt(correctCount: number): { attempt: Attempt; modules: Map<string, TestModule> } {
  const form = assembleForm({ scope: 'full', bank: BANK, label: 'S', seed: 2024 });
  const modules = new Map(form.modules.map((m) => [m.id, m]));

  const rw1 = form.modules.find((m) => m.section === 'rw' && m.stage === 1)!;
  const rw2 = form.modules.find((m) => m.section === 'rw' && m.stage === 2 && m.pathway === 'upper')!;
  const math1 = form.modules.find((m) => m.section === 'math' && m.stage === 1)!;
  const math2 = form.modules.find((m) => m.section === 'math' && m.stage === 2 && m.pathway === 'upper')!;
  const delivered = [rw1, rw2, math1, math2];

  const responses: Attempt['responses'] = {};
  let marked = 0;
  for (const module of delivered) {
    for (const id of module.questionIds) {
      const question = QUESTION_BY_ID.get(id)!;
      const correct = marked < correctCount;
      marked += 1;
      responses[id] = {
        questionId: id,
        value: question.format === 'mcq' ? (correct ? String(question.answer) : 'ZZ') : correct ? String((Array.isArray(question.answer) ? question.answer : [question.answer])[0]) : '99999',
        correct,
        flagged: false,
        msSpent: question.targetSeconds * 1000,
        eliminated: [],
        visits: 1,
        lastChangedAt: Date.now(),
      };
    }
  }

  const attempt: Attempt = {
    id: 'att_test',
    mode: 'full-test',
    formId: form.id,
    label: 'S',
    startedAt: Date.now() - 8000000,
    submittedAt: Date.now(),
    status: 'submitted',
    deliveredModuleIds: delivered.map((m) => m.id),
    currentModuleIndex: 3,
    currentQuestionIndex: 0,
    moduleDeadline: null,
    responses,
    annotations: [],
    integrity: [],
    timeMultiplier: 1,
  };

  return { attempt, modules };
}

test('a scored attempt reports a total inside the reportable range', () => {
  for (const correctCount of [0, 25, 60, 98]) {
    const { attempt, modules } = buildScoredAttempt(correctCount);
    const report = scoreAttempt(attempt, { questions: QUESTION_BY_ID, modules });

    assert.ok(report.total >= 400 && report.total <= 1600, `total ${report.total} at ${correctCount} correct`);
    assert.equal(report.sections.length, 2);
    for (const section of report.sections) {
      assert.ok(section.scaled >= 200 && section.scaled <= 800, `section ${section.scaled}`);
      assert.equal(section.scaled % 10, 0);
      assert.ok(section.sem >= 0);
    }
  }
});

test('more correct answers produce a higher total score', () => {
  const low = buildScoredAttempt(20);
  const high = buildScoredAttempt(90);
  const lowReport = scoreAttempt(low.attempt, { questions: QUESTION_BY_ID, modules: low.modules });
  const highReport = scoreAttempt(high.attempt, { questions: QUESTION_BY_ID, modules: high.modules });
  assert.ok(highReport.total > lowReport.total, `${highReport.total} should exceed ${lowReport.total}`);
});

test('pretest items are excluded from the raw score', () => {
  const { attempt, modules } = buildScoredAttempt(98);
  const report = scoreAttempt(attempt, { questions: QUESTION_BY_ID, modules });

  for (const section of report.sections) {
    const spec = SECTION_SPEC[section.section];
    const expected = (spec.questionsPerModule - spec.pretestPerModule) * 2;
    assert.equal(section.operationalCount, expected, `${section.section} operational count`);
    assert.ok(section.rawAttempted > section.operationalCount, 'attempted should include pretest items');
  }
});

test('the reported band brackets the total score', () => {
  const { attempt, modules } = buildScoredAttempt(55);
  const report = scoreAttempt(attempt, { questions: QUESTION_BY_ID, modules });
  assert.ok(report.totalBand[0] <= report.total);
  assert.ok(report.totalBand[1] >= report.total);
  assert.ok(report.totalBand[0] >= 400 && report.totalBand[1] <= 1600);
});

test('benchmarks are reported against the published cut scores', () => {
  const { attempt, modules } = buildScoredAttempt(95);
  const report = scoreAttempt(attempt, { questions: QUESTION_BY_ID, modules });
  const rw = report.benchmarks.find((b) => b.section === 'rw')!;
  const math = report.benchmarks.find((b) => b.section === 'math')!;
  assert.equal(rw.benchmark, 480);
  assert.equal(math.benchmark, 530);
  assert.equal(rw.met, report.sections.find((s) => s.section === 'rw')!.scaled >= 480);
});

/* ================= Spaced repetition ================= */

test('a new card is due immediately', () => {
  const card = newCard('q:x', 1000);
  assert.equal(card.dueAt, 1000);
  assert.equal(card.repetitions, 0);
});

test('successive good reviews lengthen the interval', () => {
  let card = newCard('q:x', 0);
  const intervals: number[] = [];
  for (let i = 0; i < 5; i += 1) {
    card = review(card, GRADE_GOOD, card.dueAt);
    intervals.push(card.intervalDays);
  }
  for (let i = 1; i < intervals.length; i += 1) {
    assert.ok(intervals[i] >= intervals[i - 1], `interval shrank at step ${i}: ${intervals}`);
  }
  assert.ok(intervals[intervals.length - 1] > 10, `final interval was ${intervals[intervals.length - 1]}`);
});

test('a lapse shortens the interval without resetting it to a single day', () => {
  let card = newCard('q:x', 0);
  for (let i = 0; i < 4; i += 1) card = review(card, GRADE_EASY, card.dueAt);
  const before = card.intervalDays;
  card = review(card, GRADE_AGAIN, card.dueAt);

  assert.ok(card.intervalDays < before, 'a lapse must shorten the interval');
  assert.equal(card.repetitions, 0, 'a lapse resets the repetition count');
  assert.equal(card.lapses, 1);
  assert.ok(card.intervalDays >= 1);
});

test('easiness stays inside its documented bounds under repeated failure', () => {
  let card = newCard('q:x', 0);
  for (let i = 0; i < 30; i += 1) card = review(card, GRADE_AGAIN, card.dueAt);
  assert.ok(card.easiness >= 1.3, `easiness fell to ${card.easiness}`);
  assert.ok(card.easiness <= 3.0);
});

test('a card becomes mastered only after sustained success', () => {
  let card = newCard('q:x', 0);
  assert.ok(!isMastered(card));
  for (let i = 0; i < 6; i += 1) card = review(card, GRADE_EASY, card.dueAt);
  assert.ok(isMastered(card), `repetitions ${card.repetitions}, interval ${card.intervalDays}`);
});

test('dueCards returns only cards whose time has come, oldest first', () => {
  const now = 1_000_000;
  const cards = {
    a: { ...newCard('a'), dueAt: now - 500 },
    b: { ...newCard('b'), dueAt: now + 5000 },
    c: { ...newCard('c'), dueAt: now - 9000 },
  };
  const due = dueCards(cards, now);
  assert.deepEqual(due.map((c) => c.ref), ['c', 'a']);
});

/* ================= Analytics ================= */

test('error classification separates a slip from a knowledge gap', () => {
  const question = QUESTION_BY_ID.get('ma_l1_001')!;
  const base = {
    questionId: question.id,
    flagged: false,
    eliminated: [],
    visits: 1,
    lastChangedAt: Date.now(),
  };

  const omitted = classifyError({
    question,
    attemptId: 'a',
    at: 0,
    response: { ...base, value: null, correct: false, msSpent: 5000 },
  });
  assert.equal(omitted, 'omitted');

  const rushed = classifyError({
    question,
    attemptId: 'a',
    at: 0,
    response: { ...base, value: 'A', correct: false, msSpent: question.targetSeconds * 200 },
  });
  assert.equal(rushed, 'timeout');

  const concept = classifyError({
    question,
    attemptId: 'a',
    at: 0,
    response: { ...base, value: 'A', correct: false, msSpent: question.targetSeconds * 1500 },
  });
  assert.equal(concept, 'concept');

  const none = classifyError({
    question,
    attemptId: 'a',
    at: 0,
    response: { ...base, value: 'C', correct: true, msSpent: question.targetSeconds * 1000 },
  });
  assert.equal(none, null);
});

test('streak counts consecutive study days and stops at the first gap', () => {
  const today = '2026-08-20';
  const activity = {
    '2026-08-20': 600,
    '2026-08-19': 900,
    '2026-08-18': 300,
    // 2026-08-17 missing
    '2026-08-16': 1200,
  };
  assert.equal(currentStreak(activity, today), 3);
});

test('a streak survives a day that has not been studied yet', () => {
  const activity = { '2026-08-19': 600, '2026-08-18': 600 };
  assert.equal(currentStreak(activity, '2026-08-20'), 2);
});

test('an empty activity log has no streak', () => {
  assert.equal(currentStreak({}, '2026-08-20'), 0);
});

test('skill statistics aggregate per skill and rank weakest first', () => {
  const q1 = QUESTION_BY_ID.get('ma_l1_001')!;
  const q2 = BANK.find((q) => q.skill !== q1.skill && q.section === 'math')!;
  const mk = (question: Question, correct: boolean) => ({
    question,
    attemptId: 'a',
    at: Date.now(),
    response: {
      questionId: question.id,
      value: 'A',
      correct,
      flagged: false,
      msSpent: 30000,
      eliminated: [],
      visits: 1,
      lastChangedAt: Date.now(),
    },
  });

  const stats = skillStats([
    mk(q1, true), mk(q1, true), mk(q1, true),
    mk(q2, false), mk(q2, false), mk(q2, false),
  ]);

  assert.equal(stats.length, 2);
  assert.ok(stats[0].mastery < stats[1].mastery, 'weakest skill must sort first');
  assert.equal(stats.find((s) => s.skill === q1.skill)!.correct, 3);
  assert.equal(stats.find((s) => s.skill === q2.skill)!.correct, 0);
});

/* ================= Study plan ================= */

test('a generated plan covers every day up to the test date', () => {
  const today = '2026-01-01';
  const plan = generatePlan({
    testDate: '2026-03-01',
    targetScore: 1400,
    baselineScore: 1150,
    hoursPerWeek: 10,
    weakSkills: [],
    locale: 'en',
    today,
  });

  const days = new Set(plan.tasks.map((t) => t.date));
  const span = daysBetween(today, '2026-03-01');
  assert.equal(days.size, span, `expected ${span} scheduled days, got ${days.size}`);
  assert.ok(plan.tasks.every((t) => t.date >= today && t.date < '2026-03-01'));
});

test('a plan schedules full-length rehearsals and rest days', () => {
  const plan = generatePlan({
    testDate: '2026-04-01',
    targetScore: 1500,
    baselineScore: 1200,
    hoursPerWeek: 12,
    weakSkills: [],
    locale: 'en',
    today: '2026-01-01',
  });
  assert.ok(plan.tasks.some((t) => t.kind === 'full-test'), 'no full-length rehearsal scheduled');
  assert.ok(plan.tasks.some((t) => t.kind === 'rest'), 'no rest day scheduled');
});

test('feasibility is stricter when less time is available', () => {
  const base = {
    testDate: '2026-06-01',
    targetScore: 1550,
    baselineScore: 1100,
    weakSkills: [],
    locale: 'en' as const,
    today: '2026-05-01',
  };
  const thin = assessFeasibility({ ...base, hoursPerWeek: 2 });
  const thick = assessFeasibility({ ...base, hoursPerWeek: 30 });

  assert.ok(thick.projectedScore > thin.projectedScore);
  assert.ok(!thin.feasible, 'two hours a week to gain 450 points should not read as feasible');
});

test('plan progress counts only scheduled work, not rest days', () => {
  const plan = generatePlan({
    testDate: '2026-02-01',
    targetScore: 1400,
    baselineScore: 1200,
    hoursPerWeek: 8,
    weakSkills: [],
    locale: 'en',
    today: '2026-01-01',
  });
  const progress = planProgress(plan, '2026-01-01');
  assert.equal(progress.done, 0);
  assert.ok(progress.total > 0);
  assert.equal(progress.total, plan.tasks.filter((t) => t.kind !== 'rest').length);
});

/* ================= Expression parser ================= */

test('the parser respects arithmetic precedence and associativity', () => {
  const cases: Array<[string, number]> = [
    ['2+3*4', 14],
    ['(2+3)*4', 20],
    ['2^3^2', 512],
    ['-3^2', -9],
    ['10-4-3', 3],
    ['100/10/2', 5],
    ['10%3', 1],
  ];
  for (const [source, expected] of cases) {
    assert.equal(evaluate(source), expected, source);
  }
});

test('the parser handles implicit multiplication and absolute value', () => {
  assert.equal(evaluate('2x', { x: 5 }), 10);
  assert.equal(evaluate('3(x+1)', { x: 2 }), 9);
  assert.equal(evaluate('2sin(pi/2)'), 2);
  assert.equal(evaluate('|x-7|', { x: 2 }), 5);
  assert.equal(evaluate('|3|+|(-4)|'), 7);
});

test('the parser supports the documented function table', () => {
  assert.equal(evaluate('sqrt(16)'), 4);
  assert.equal(evaluate('log(1000)'), 3);
  assert.ok(Math.abs(evaluate('ln(e)')! - 1) < 1e-12);
  assert.equal(evaluate('max(1,7,3)'), 7);
  assert.equal(evaluate('min(1,7,3)'), 1);
  assert.equal(evaluate('nthroot(27,3)'), 3);
  assert.equal(evaluate('round(2.6)'), 3);
});

test('the parser rejects malformed input rather than guessing', () => {
  for (const source of ['2+', '(1+2', 'foo(3)', '1..2', '*3', '|1']) {
    assert.equal(evaluate(source), null, `${source} should not evaluate`);
  }
});

test('the parser refuses an unknown variable instead of treating it as zero', () => {
  assert.throws(() => compile('a+1').evaluate({}), ExprError);
  assert.equal(evaluate('a+1'), null);
});

test('compile reports the free variables it found', () => {
  assert.deepEqual(compile('2x+y').variables.sort(), ['x', 'y']);
  assert.deepEqual(compile('sin(pi)').variables, []);
});

test('tokenize rejects a character outside the grammar', () => {
  assert.throws(() => tokenize('2 $ 3'), ExprError);
});

test('stripAssignment accepts the forms a student types', () => {
  assert.equal(stripAssignment('y = 2x + 1'), '2x + 1');
  assert.equal(stripAssignment('f(x) = x^2'), 'x^2');
  assert.equal(stripAssignment('2x + 1'), '2x + 1');
});

/* ================= Authorisation ================= */

test('a student holds learner permissions and no teaching ones', () => {
  const student = { role: 'student' as const };
  assert.ok(can(student, 'practice.run'));
  assert.ok(can(student, 'test.take'));
  assert.ok(can(student, 'analytics.own'));
  assert.ok(!can(student, 'roster.view'));
  assert.ok(!can(student, 'student.responses.view'));
  assert.ok(!can(student, 'teacher.promote'));
});

test('teacher ranks are strictly cumulative', () => {
  let previous = new Set<string>();
  for (const rank of TEACHER_RANK_ORDER) {
    const held = permissionsFor({ role: 'teacher', rank });
    for (const permission of previous) {
      assert.ok(held.has(permission as never), `${rank} lost ${permission} held by the rank below`);
    }
    assert.ok(held.size >= previous.size, `${rank} holds fewer permissions than the rank below`);
    previous = held as unknown as Set<string>;
  }
});

test('each teacher rank grants exactly what it should', () => {
  const assistant = { role: 'teacher' as const, rank: 'assistant' as const };
  assert.ok(can(assistant, 'roster.view'));
  assert.ok(can(assistant, 'assignment.grade'));
  assert.ok(!can(assistant, 'assignment.create'), 'an assistant must not create work');
  assert.ok(!can(assistant, 'class.create'));
  assert.ok(!can(assistant, 'teacher.promote'));

  const teacher = { role: 'teacher' as const, rank: 'teacher' as const };
  assert.ok(can(teacher, 'assignment.create'));
  assert.ok(!can(teacher, 'class.create'));

  const senior = { role: 'teacher' as const, rank: 'senior' as const };
  assert.ok(can(senior, 'class.create'));
  assert.ok(can(senior, 'bank.author'));
  assert.ok(!can(senior, 'teacher.promote'), 'only a head may change ranks');
  assert.ok(!can(senior, 'bank.publish'));

  const head = { role: 'teacher' as const, rank: 'head' as const };
  assert.ok(can(head, 'teacher.promote'));
  assert.ok(can(head, 'bank.publish'));
  assert.ok(can(head, 'audit.view'));
});

test('a teacher may still study', () => {
  const head = { role: 'teacher' as const, rank: 'head' as const };
  assert.ok(can(head, 'practice.run'));
  assert.ok(can(head, 'test.take'));
});

test('an administrator holds every permission', () => {
  const admin = { role: 'admin' as const };
  assert.ok(can(admin, 'org.settings'));
  assert.ok(can(admin, 'teacher.promote'));
  assert.ok(can(admin, 'practice.run'));
});

test('class permissions are scoped to the classes a teacher teaches', () => {
  const teacher = { role: 'teacher' as const, rank: 'senior' as const, classIds: ['cls_a'] };
  assert.ok(canForClass(teacher, 'class.edit', 'cls_a'));
  assert.ok(!canForClass(teacher, 'class.edit', 'cls_b'), 'a teacher must not edit a class they do not teach');
  assert.ok(canForClass({ role: 'admin' }, 'class.edit', 'cls_b'), 'an administrator is unscoped');
});

test('reading another learner requires a shared class', () => {
  const teacher = { role: 'teacher' as const, rank: 'teacher' as const, classIds: ['cls_a'] };

  assert.ok(
    canViewLearner(teacher, { selfId: 't1', targetId: 's1', targetClassIds: ['cls_a'] }),
    'a shared class should permit access',
  );
  assert.ok(
    !canViewLearner(teacher, { selfId: 't1', targetId: 's2', targetClassIds: ['cls_b'] }),
    'no shared class must deny access',
  );
  assert.ok(
    canViewLearner({ role: 'student' }, { selfId: 's1', targetId: 's1', targetClassIds: [] }),
    'anyone may read their own record',
  );
  assert.ok(
    !canViewLearner({ role: 'student' }, { selfId: 's1', targetId: 's2', targetClassIds: ['cls_a'] }),
    'a student must not read a classmate',
  );
});

test('a student a teacher no longer shares a class with becomes unreadable', () => {
  // The record view resolves the target's classes on every render rather than
  // caching them, so unenrolling a student closes the teacher's access to
  // their record immediately — not at the next reload.
  const teacher = { role: 'teacher' as const, rank: 'teacher' as const, classIds: ['cls_a'] };
  assert.ok(canViewLearner(teacher, { selfId: 't1', targetId: 's1', targetClassIds: ['cls_a'] }));
  assert.ok(
    !canViewLearner(teacher, { selfId: 't1', targetId: 's1', targetClassIds: [] }),
    'a student in no shared class must not stay readable',
  );
});

test('a teacher without the analytics permission cannot read a shared student', () => {
  // Sharing a class is necessary, not sufficient. A rank that does not grant
  // student.analytics.view must be refused even inside its own classroom.
  const assistant = { role: 'teacher' as const, rank: 'assistant' as const, classIds: ['cls_a'] };
  const holds = permissionsFor(assistant).has('student.analytics.view');
  assert.equal(
    canViewLearner(assistant, { selfId: 't1', targetId: 's1', targetClassIds: ['cls_a'] }),
    holds,
    'access must follow the permission, not the class membership alone',
  );
});

test('a student level never grants authority', () => {
  // The elite level is the highest a learner can earn; it must not widen the
  // permission set by even one entry.
  const plain = permissionsFor({ role: 'student' });
  assert.ok(!plain.has('roster.view'));
  assert.equal(levelForScore(1600), 'elite');
  // levelForScore feeds content unlocking only — permissionsFor takes no level.
  assert.equal(permissionsFor({ role: 'student' }).size, plain.size);
});

test('student levels are earned at the documented score boundaries', () => {
  assert.equal(levelForScore(400), 'foundation');
  assert.equal(levelForScore(999), 'foundation');
  assert.equal(levelForScore(1000), 'developing');
  assert.equal(levelForScore(1200), 'proficient');
  assert.equal(levelForScore(1400), 'advanced');
  assert.equal(levelForScore(1520), 'elite');
  assert.equal(levelForScore(1600), 'elite');
});

test('the distance to the next level is reported, and nothing beyond the top', () => {
  const next = pointsToNextLevel(1150);
  assert.equal(next?.next, 'proficient');
  assert.equal(next?.points, 50);
  assert.equal(pointsToNextLevel(1600), null);
});

test('rankAtLeast orders the teacher ladder correctly', () => {
  assert.ok(rankAtLeast('head', 'assistant'));
  assert.ok(rankAtLeast('teacher', 'teacher'));
  assert.ok(!rankAtLeast('assistant', 'senior'));
});

/* ================= Utilities ================= */

test('formatClock renders minutes and hours correctly', () => {
  assert.equal(formatClock(0), '0:00');
  assert.equal(formatClock(59), '0:59');
  assert.equal(formatClock(60), '1:00');
  assert.equal(formatClock(1920), '32:00');
  assert.equal(formatClock(3661), '1:01:01');
  assert.equal(formatClock(-5), '0:00');
});

test('formatDuration never reports real time as zero', () => {
  assert.equal(formatDuration(0, 'en'), '0m');
  assert.equal(formatDuration(30, 'en'), '<1m');
  assert.equal(formatDuration(120, 'en'), '2m');
  assert.equal(formatDuration(3600, 'en'), '1h');
  assert.equal(formatDuration(5400, 'en'), '1h 30m');
});

test('date helpers stay on local calendar days', () => {
  assert.equal(addDays('2026-01-31', 1), '2026-02-01');
  assert.equal(addDays('2026-03-01', -1), '2026-02-28');
  assert.equal(daysBetween('2026-01-01', '2026-01-31'), 30);
  assert.equal(daysBetween('2026-01-31', '2026-01-01'), -30);
  assert.equal(isoDate(new Date(2026, 0, 5)), '2026-01-05');
});

test('roundTo rounds to the nearest step', () => {
  assert.equal(roundTo(504, 10), 500);
  assert.equal(roundTo(505, 10), 510);
  assert.equal(roundTo(-504, 10), -500);
});

test('the seeded generator is deterministic and stays in range', () => {
  const a = makeRng(42);
  const b = makeRng(42);
  for (let i = 0; i < 200; i += 1) {
    const value = a();
    assert.equal(value, b());
    assert.ok(value >= 0 && value < 1);
  }
});
