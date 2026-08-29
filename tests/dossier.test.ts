/**
 * The learner dossier and the route it derives.
 *
 * The line these tests hold is the one this codebase holds everywhere else: a
 * signal that has not been measured is not scored, and a step with no evidence
 * behind it is not generated. A dossier is a document someone will act on, so
 * a plausible-looking route built from nothing is the worst failure available
 * to it — worse than an empty one, because an empty one is honest.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { buildDossier, gapToTarget, scoreMovement } from '../src/engine/dossier.ts';
import { LESSONS } from '../src/data/lesson-index.ts';
import { BANK, QUESTION_BY_ID } from '../src/data/bank.ts';
import { addDays } from '../src/lib/util.ts';
import type { Attempt, Question, Response, ScoreReport } from '../src/types.ts';

const TODAY = '2026-06-17';
const TEACHABLE = new Set(LESSONS.map((l) => l.skill));

function base(over: Partial<Parameters<typeof buildDossier>[0]> = {}) {
  return {
    attempts: [] as Attempt[],
    questions: QUESTION_BY_ID,
    targetTotal: 1500,
    testDate: addDays(TODAY, 60),
    activity: {} as Record<string, number>,
    activeDays28: 20,
    lessonsRead: [] as string[],
    lessonsTotal: LESSONS.length,
    teachableSkills: TEACHABLE,
    today: TODAY,
    ...over,
  };
}

function response(question: Question, correct: boolean, seconds?: number): Response {
  return {
    questionId: question.id,
    value: correct ? String(question.answer) : 'ZZ',
    correct,
    flagged: false,
    msSpent: (seconds ?? question.targetSeconds) * 1000,
    eliminated: [],
    visits: 1,
    lastChangedAt: Date.parse(`${TODAY}T10:00:00`),
  };
}

/** An attempt whose responses are drawn from one skill, so a route can name it. */
function attemptFor(skill: string, correctCount: number, wrongCount: number, id = 'att_1'): Attempt {
  const items = BANK.filter((q) => q.skill === skill).slice(0, correctCount + wrongCount);
  const responses: Record<string, Response> = {};
  items.forEach((q, i) => {
    responses[q.id] = response(q, i < correctCount);
  });
  return {
    id,
    mode: 'practice',
    formId: 'form_1',
    label: 'Practice',
    startedAt: Date.parse(`${TODAY}T09:00:00`),
    submittedAt: Date.parse(`${TODAY}T10:00:00`),
    status: 'submitted',
    deliveredModuleIds: [],
    currentModuleIndex: 0,
    currentQuestionIndex: 0,
    moduleDeadline: null,
    responses,
    annotations: [],
    integrity: [],
    timeMultiplier: 1,
  };
}

function scored(total: number, date: string, id: string): Attempt {
  const report = {
    attemptId: id,
    scoredAt: Date.parse(`${date}T10:00:00`),
    total,
    totalBand: [total - 30, total + 30] as [number, number],
    sections: [
      { section: 'rw' } as unknown as ScoreReport['sections'][number],
      { section: 'math' } as unknown as ScoreReport['sections'][number],
    ],
    percentile: 50,
    benchmarks: [],
    pacing: [],
  } satisfies ScoreReport;

  return {
    id,
    mode: 'full-test',
    formId: 'form_1',
    label: `Test ${id}`,
    startedAt: Date.parse(`${date}T08:00:00`),
    submittedAt: Date.parse(`${date}T10:00:00`),
    status: 'submitted',
    deliveredModuleIds: [],
    currentModuleIndex: 0,
    currentQuestionIndex: 0,
    moduleDeadline: null,
    responses: {},
    annotations: [],
    integrity: [],
    timeMultiplier: 1,
    score: report,
  };
}

test('a brand-new learner gets one step, and it is to get measured', () => {
  const dossier = buildDossier(base());

  assert.equal(dossier.latestTotal, null);
  assert.equal(dossier.skills.length, 0);
  assert.equal(dossier.pathway.length, 1, 'a route from no evidence must not be elaborated');
  assert.equal(dossier.pathway[0].kind, 'measure');
  // And the document says what it does not know, rather than implying zero.
  assert.ok(dossier.unmeasured.length >= 2);
  assert.equal(dossier.unmeasured.length, dossier.unmeasuredVi.length, 'gaps must be bilingual');
});

test('every gap and every step is stated in both languages', () => {
  const dossier = buildDossier(
    base({ attempts: [scored(1200, TODAY, 'a1'), attemptFor('transitions', 2, 6, 'a2')] }),
  );
  for (const step of dossier.pathway) {
    assert.ok(step.title.trim().length > 0, `${step.kind}: empty English title`);
    assert.ok(step.titleVi.trim().length > 0, `${step.kind}: empty Vietnamese title`);
    assert.ok(step.because.trim().length > 0, `${step.kind}: a step with no stated reason`);
    assert.ok(step.becauseVi.trim().length > 0, `${step.kind}: no reason (vi)`);
  }
});

test('a weak untaught skill is taught before it is drilled', () => {
  const dossier = buildDossier(base({ attempts: [scored(1200, TODAY, 'a1'), attemptFor('transitions', 1, 7, 'a2')] }));

  const learn = dossier.pathway.find((s) => s.kind === 'learn' && s.skill === 'transitions');
  assert.ok(learn, 'an untaught weak skill must produce a lesson step');
  assert.match(learn!.because, /never been read/);

  const drill = dossier.pathway.find((s) => s.kind === 'drill' && s.skill === 'transitions');
  assert.equal(drill, undefined, 'it must not also be queued for drilling in the same breath');
});

test('once the lesson is read the same skill becomes a drill, not a re-teach', () => {
  const dossier = buildDossier(
    base({
      attempts: [scored(1200, TODAY, 'a1'), attemptFor('transitions', 1, 7, 'a2')],
      lessonsRead: ['transitions'],
    }),
  );

  assert.equal(dossier.pathway.find((s) => s.kind === 'learn'), undefined);
  const drill = dossier.pathway.find((s) => s.kind === 'drill' && s.skill === 'transitions');
  assert.ok(drill, 'a taught weak skill must be drilled');
  assert.match(drill!.because, /practice rather than instruction/);
});

test('a skill with too few responses never enters the route', () => {
  // Three responses is noise. Naming it as a weakness would send a learner
  // after a problem the evidence cannot say they have.
  const dossier = buildDossier(base({ attempts: [scored(1200, TODAY, 'a1'), attemptFor('transitions', 0, 3, 'a2')] }));

  assert.equal(dossier.skills.length, 0);
  assert.equal(dossier.pathway.filter((s) => s.skill !== undefined).length, 0);
});

test('poor attendance is addressed before any content step', () => {
  const dossier = buildDossier(
    base({ attempts: [scored(1200, TODAY, 'a1'), attemptFor('transitions', 1, 7, 'a2')], activeDays28: 3 }),
  );

  const habitAt = dossier.pathway.findIndex((s) => s.kind === 'habit');
  const contentAt = dossier.pathway.findIndex((s) => s.kind === 'learn' || s.kind === 'drill');
  assert.ok(habitAt >= 0, 'three study days in 28 must raise the rhythm step');
  assert.ok(contentAt === -1 || habitAt < contentAt, 'no content plan survives a schedule that is not kept');
});

test('good attendance raises no rhythm step', () => {
  const dossier = buildDossier(base({ attempts: [scored(1200, TODAY, 'a1')], activeDays28: 22 }));
  assert.equal(dossier.pathway.find((s) => s.kind === 'habit'), undefined);
});

test('the score history is chronological and the movement needs two points', () => {
  const one = buildDossier(base({ attempts: [scored(1200, '2026-05-01', 'a1')] }));
  assert.equal(scoreMovement(one), null, 'one score is not a trend');
  assert.equal(gapToTarget(one), 300);

  const two = buildDossier(
    base({ attempts: [scored(1310, '2026-06-01', 'a2'), scored(1200, '2026-05-01', 'a1')] }),
  );
  assert.deepEqual(two.scores.map((s) => s.total), [1200, 1310], 'history must run oldest to newest');
  assert.equal(two.latestTotal, 1310);
  assert.equal(scoreMovement(two), 110);
  assert.equal(gapToTarget(two), 190);
});

test('a single-section attempt is not reported as a total', () => {
  // Only a delivery covering both sections produces a 400–1600 figure; a
  // section test scored as a total would understate the learner by 800 points.
  const single = scored(620, TODAY, 'a1');
  single.score!.sections = [single.score!.sections[0]];

  const dossier = buildDossier(base({ attempts: [single] }));
  assert.equal(dossier.scores.length, 0);
  assert.equal(dossier.latestTotal, null);
});

test('no test date is named as a gap and blocks the rehearsal cadence step', () => {
  const dossier = buildDossier(base({ attempts: [scored(1200, TODAY, 'a1')], testDate: null }));

  assert.equal(dossier.daysToTest, null);
  assert.ok(dossier.unmeasured.some((g) => /test date/i.test(g)));
  assert.equal(dossier.pathway.find((s) => s.kind === 'review'), undefined);
});

test('the route is stable in order across rebuilds', () => {
  // A route that reshuffles between renders cannot be followed, and reads as
  // though the system changed its mind.
  const input = base({
    attempts: [scored(1200, TODAY, 'a1'), attemptFor('transitions', 1, 7, 'a2')],
    activeDays28: 2,
  });
  const first = buildDossier(input).pathway.map((s) => `${s.kind}:${s.order}`);
  const second = buildDossier(input).pathway.map((s) => `${s.kind}:${s.order}`);
  assert.deepEqual(first, second);
  for (let i = 1; i < first.length; i += 1) {
    const prev = buildDossier(input).pathway[i - 1].order;
    assert.ok(buildDossier(input).pathway[i].order >= prev, 'steps must be ordered');
  }
});

test('the dossier reports lesson coverage honestly', () => {
  const dossier = buildDossier(base({ lessonsRead: ['transitions', 'central-ideas'] }));
  assert.equal(dossier.lessonsRead, 2);
  assert.equal(dossier.lessonsTotal, LESSONS.length);
});
