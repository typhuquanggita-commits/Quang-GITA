/**
 * Turning a finished attempt into worked solutions and an analysis.
 *
 * These rows drive three surfaces — the solutions screen, the analysis table,
 * and the learner's dossier — so an error here is an error a learner sees
 * three times, phrased three different ways, and cannot reconcile.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  bandBreakdown,
  buildReview,
  skillBreakdown,
  summariseReview,
} from '../src/engine/attemptReview.ts';
import { BANK, QUESTION_BY_ID } from '../src/data/bank.ts';
import type { Attempt, Question, Response, TestModule } from '../src/types.ts';

const rw = BANK.filter((q) => q.section === 'rw' && q.format === 'mcq');

function response(question: Question, over: Partial<Response> = {}): Response {
  return {
    questionId: question.id,
    value: String(question.answer),
    correct: true,
    flagged: false,
    msSpent: question.targetSeconds * 1000,
    eliminated: [],
    visits: 1,
    lastChangedAt: Date.now(),
    ...over,
  };
}

function wrongChoice(question: Question): string {
  const key = String(question.answer);
  return question.choices!.find((c) => c.id !== key)!.id;
}

function scenario(options: { pretestCount?: number } = {}) {
  const items = rw.slice(0, 8);
  const modules: TestModule[] = [
    {
      id: 'mod_1',
      section: 'rw',
      stage: 1,
      pathway: 'routing',
      durationSeconds: 1920,
      questionIds: items.map((q) => q.id),
      pretestIds: items.slice(0, options.pretestCount ?? 0).map((q) => q.id),
    },
  ];

  const responses: Record<string, Response> = {};
  items.forEach((question, i) => {
    if (i === 3) return; // left blank entirely
    responses[question.id] = response(question, {
      correct: i % 2 === 0,
      value: i % 2 === 0 ? String(question.answer) : wrongChoice(question),
      flagged: i === 5,
      // Question 1 answered in a fifth of the time it needs.
      msSpent: (i === 1 ? question.targetSeconds * 0.2 : question.targetSeconds) * 1000,
      visits: i === 5 ? 3 : 1,
    });
  });

  const attempt: Attempt = {
    id: 'att_1',
    mode: 'section-test',
    formId: 'form_1',
    label: 'Rehearsal',
    startedAt: Date.now(),
    submittedAt: Date.now(),
    status: 'submitted',
    deliveredModuleIds: ['mod_1'],
    currentModuleIndex: 0,
    currentQuestionIndex: 0,
    moduleDeadline: null,
    responses,
    annotations: [],
    integrity: [],
    timeMultiplier: 1,
  };

  return { items, attempt, modules: new Map(modules.map((m) => [m.id, m])) };
}

test('the review is built in delivery order, not sorted', () => {
  const { items, attempt, modules } = scenario();
  const rows = buildReview(attempt, modules, QUESTION_BY_ID);

  assert.equal(rows.length, items.length);
  assert.deepEqual(rows.map((r) => r.question.id), items.map((q) => q.id));
  // Numbering has to match the exam, or a learner cannot find the question
  // they remember struggling with.
  assert.deepEqual(rows.map((r) => r.number), [1, 2, 3, 4, 5, 6, 7, 8]);
});

test('an unanswered question is omitted, not incorrect, and keeps its row', () => {
  const { attempt, modules } = scenario();
  const rows = buildReview(attempt, modules, QUESTION_BY_ID);
  const blank = rows[3];

  assert.equal(blank.verdict, 'omitted');
  assert.equal(blank.given, null);
  assert.equal(blank.error, 'omitted');
  assert.equal(blank.response, null);
  // It still scores as wrong, but a learner who ran out of time and one who
  // guessed wrong need different advice, so the two stay distinguishable.
  assert.equal(summariseReview(rows).omitted, 1);
  assert.equal(summariseReview(rows).incorrect, 3);
});

test('the key and the learner’s answer are both carried', () => {
  const { attempt, modules } = scenario();
  const rows = buildReview(attempt, modules, QUESTION_BY_ID);
  const wrong = rows.find((r) => r.verdict === 'incorrect')!;

  assert.equal(wrong.key, String(wrong.question.answer));
  assert.notEqual(wrong.given, wrong.key, 'a wrong answer must differ from the key');
  assert.ok(wrong.given, 'the answer given must be preserved for review');
});

test('pace is measured against the item’s own target, not a fixed clock', () => {
  const { attempt, modules } = scenario();
  const rows = buildReview(attempt, modules, QUESTION_BY_ID);

  assert.equal(rows[1].pace, 'rushed', 'a fifth of the target is rushed');
  assert.equal(rows[0].pace, 'on-pace');
  // And rushing is classified as its own error, distinct from not knowing.
  assert.equal(rows[1].error, 'timeout');
});

test('flags and revisits survive into the review', () => {
  const { attempt, modules } = scenario();
  const rows = buildReview(attempt, modules, QUESTION_BY_ID);

  assert.equal(rows[5].flagged, true);
  assert.equal(rows[5].visits, 3);
  assert.equal(summariseReview(rows).flagged, 1);
});

test('field-test items are shown but never counted', () => {
  const { attempt, modules } = scenario({ pretestCount: 2 });
  const rows = buildReview(attempt, modules, QUESTION_BY_ID);
  const summary = summariseReview(rows);

  assert.equal(rows.filter((r) => r.pretest).length, 2, 'a pretest item still gets a row');
  assert.equal(summary.total, 8);
  assert.equal(summary.scored, 6, 'unscored items must not enter the score');

  // And they must not enter the roll-ups either, or a skill would be reported
  // against responses that never counted.
  const skills = skillBreakdown(rows);
  const counted = skills.reduce((acc, s) => acc + s.attempted + s.omitted, 0);
  assert.equal(counted, 6);
});

test('the skill breakdown is weakest first and names the dominant error', () => {
  const { attempt, modules } = scenario();
  const skills = skillBreakdown(buildReview(attempt, modules, QUESTION_BY_ID));

  assert.ok(skills.length > 0);
  for (let i = 1; i < skills.length; i += 1) {
    assert.ok(skills[i].mastery >= skills[i - 1].mastery, 'skills must be ordered weakest first');
  }
  // Mastery is modelled, not percent correct, so it never reads as a raw ratio.
  for (const skill of skills) {
    assert.ok(skill.mastery >= 0 && skill.mastery <= 1);
  }
  assert.ok(skills.some((s) => s.dominantError !== null), 'an attempt with errors must name one');
});

test('a skill answered perfectly has no dominant error', () => {
  const items = rw.slice(0, 4);
  const modules = new Map<string, TestModule>([
    ['m', { id: 'm', section: 'rw', stage: 1, pathway: 'routing', durationSeconds: 1920, questionIds: items.map((q) => q.id), pretestIds: [] }],
  ]);
  const responses: Record<string, Response> = {};
  for (const q of items) responses[q.id] = response(q);

  const attempt: Attempt = {
    id: 'a', mode: 'practice', formId: 'f', label: 'x', startedAt: 0, submittedAt: 1,
    status: 'submitted', deliveredModuleIds: ['m'], currentModuleIndex: 0,
    currentQuestionIndex: 0, moduleDeadline: null, responses, annotations: [],
    integrity: [], timeMultiplier: 1,
  };

  const skills = skillBreakdown(buildReview(attempt, modules, QUESTION_BY_ID));
  assert.ok(skills.every((s) => s.dominantError === null), 'no mistakes means no dominant error');
});

test('the band breakdown separates a leak from a ceiling', () => {
  const { attempt, modules } = scenario();
  const bands = bandBreakdown(buildReview(attempt, modules, QUESTION_BY_ID));

  assert.deepEqual(bands.map((b) => b.band), ['easy', 'medium', 'hard']);
  for (const band of bands) {
    assert.ok(band.correct <= band.attempted, 'more correct than attempted is impossible');
  }
});

test('a missing module or question is skipped rather than crashing the review', () => {
  // Forms and banks change. A review that threw on a stale attempt would lock
  // a learner out of their own history.
  const { attempt } = scenario();
  const rows = buildReview(attempt, new Map(), QUESTION_BY_ID);
  assert.equal(rows.length, 0);

  const { modules } = scenario();
  const empty = buildReview(attempt, modules, new Map());
  assert.equal(empty.length, 0);
});
