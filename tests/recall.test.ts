/**
 * The recall check.
 *
 * The line these tests hold is the one in the module's own header: it reports
 * what the missed items *needed*, never what the learner does not know. Most
 * of what follows is about the things it must refuse to say.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import type { SkillId, SrsCard } from '../src/types.ts';
import type { ReviewRow, Verdict, Pace } from '../src/engine/attemptReview.ts';
import type { ErrorKind } from '../src/engine/analytics.ts';
import { MUST_KNOW } from '../src/data/mustKnow.ts';
import { SKILL_BY_ID } from '../src/data/blueprint.ts';
import {
  factIdFromRef,
  factsForSkill,
  gradeForOutcome,
  missesBySkill,
  recallCheck,
  recallProgress,
  recallRef,
  MIN_ORDINARY_MISSES,
} from '../src/engine/recall.ts';

let n = 0;

function row(
  skill: SkillId,
  verdict: Verdict,
  opts: { error?: ErrorKind | null; pace?: Pace; pretest?: boolean } = {},
): ReviewRow {
  n += 1;
  return {
    number: n,
    question: { id: `q${n}`, skill } as ReviewRow['question'],
    response: null,
    moduleId: 'm1',
    stage: 1,
    pretest: opts.pretest ?? false,
    verdict,
    given: null,
    key: 'A',
    seconds: 60,
    targetSeconds: 60,
    pace: opts.pace ?? 'on-pace',
    error: opts.error ?? (verdict === 'correct' ? null : 'concept'),
    flagged: false,
    visits: 1,
    eliminated: [],
  };
}

/* ---------------------------------------------------------------- */
/* The mapping is authored, and must stay complete                   */
/* ---------------------------------------------------------------- */

test('every must-know fact names at least one real skill', () => {
  for (const fact of MUST_KNOW) {
    assert.ok(fact.invokedBy.length > 0, `${fact.id} names no skill`);
    for (const skill of fact.invokedBy) {
      assert.ok(SKILL_BY_ID.get(skill), `${fact.id} names an unknown skill: ${skill}`);
    }
  }
});

test('the mapping runs both ways — a skill can be asked what it calls on', () => {
  const covered = new Set(MUST_KNOW.flatMap((f) => f.invokedBy));
  for (const skill of covered) {
    assert.ok(factsForSkill(skill).length > 0);
  }
});

test('a skill id from a URL cannot reach Object.prototype', () => {
  assert.deepEqual(factsForSkill('constructor' as SkillId), []);
  assert.deepEqual(factsForSkill('__proto__' as SkillId), []);
  assert.deepEqual(factsForSkill(undefined), []);
});

/* ---------------------------------------------------------------- */
/* What it refuses to say                                            */
/* ---------------------------------------------------------------- */

test('a clean attempt raises nothing at all', () => {
  const rows = [row('transitions', 'correct'), row('boundaries', 'correct')];
  assert.deepEqual(recallCheck(rows), []);
});

test('no attempt at all raises nothing — absence of evidence is not a gap', () => {
  assert.deepEqual(recallCheck([]), []);
});

test('a single ordinary miss is not enough', () => {
  assert.equal(MIN_ORDINARY_MISSES, 2);
  assert.deepEqual(recallCheck([row('circles', 'incorrect')]), []);
});

test('a careless slip is never evidence of a missing fact', () => {
  // classifyError has already judged that the learner holds this material and
  // slipped. Proposing a formula contradicts the platform's own reading.
  const rows = [
    row('circles', 'incorrect', { error: 'careless' }),
    row('circles', 'incorrect', { error: 'careless' }),
    row('circles', 'incorrect', { error: 'careless', pace: 'slow' }),
  ];
  assert.deepEqual(recallCheck(rows), []);
});

test('an unscored field-test item is not evidence about the learner', () => {
  const rows = [
    row('circles', 'incorrect', { pretest: true }),
    row('circles', 'incorrect', { pretest: true }),
  ];
  assert.deepEqual(recallCheck(rows), []);
});

/* ---------------------------------------------------------------- */
/* What it does say                                                  */
/* ---------------------------------------------------------------- */

test('two ordinary misses in one skill raise that skill’s facts', () => {
  const rows = [row('circles', 'incorrect'), row('circles', 'incorrect')];
  const out = recallCheck(rows);
  assert.ok(out.length > 0);
  for (const c of out) {
    assert.ok(c.fact.invokedBy.includes('circles'));
    assert.equal(c.evidence.length, 2);
  }
});

test('one slow miss is enough on its own', () => {
  // Deriving instead of recalling costs seconds. A miss that also ran long is
  // exactly the shape the cost model predicts, so it does not wait for a second.
  const out = recallCheck([row('circles', 'incorrect', { pace: 'slow' })]);
  assert.ok(out.length > 0);
  assert.equal(out[0]!.evidence[0]!.slow, true);
  assert.match(out[0]!.rationale, /ran long/);
});

test('an omitted item counts, and says so in the evidence', () => {
  const rows = [
    row('probability', 'omitted', { error: 'omitted' }),
    row('probability', 'omitted', { error: 'omitted' }),
  ];
  const out = recallCheck(rows);
  assert.ok(out.some((c) => c.fact.id === 'mk_prob_cond'));
});

test('ranking is by seconds recoverable, not by difficulty', () => {
  const rows = [
    row('circles', 'incorrect'),
    row('circles', 'incorrect'),
    row('circles', 'incorrect'),
    row('one-variable-data', 'incorrect'),
    row('one-variable-data', 'incorrect'),
  ];
  const out = recallCheck(rows);
  for (let i = 1; i < out.length; i += 1) {
    assert.ok(out[i - 1]!.payback >= out[i]!.payback);
  }
  assert.equal(out[0]!.payback, out[0]!.fact.cost * out[0]!.evidence.length);
});

test('every candidate carries the item numbers it was raised from', () => {
  const rows = [row('transitions', 'incorrect'), row('transitions', 'incorrect')];
  const numbers = rows.map((r) => r.number);
  const out = recallCheck(rows);
  const family = out.find((c) => c.fact.id === 'mk_transition_families');
  assert.ok(family);
  assert.deepEqual(family.evidence.map((e) => e.number), numbers);
});

test('the rationale invites a self-check rather than asserting a gap', () => {
  const out = recallCheck([row('circles', 'incorrect', { pace: 'slow' })]);
  const c = out[0]!;
  assert.match(c.rationale, /Self-check/);
  assert.match(c.rationale, /the error was somewhere else/);
  assert.match(c.rationaleVi, /tự kiểm tra/);
  // Nothing here may claim the learner lacks the fact.
  assert.doesNotMatch(c.rationale, /you do not know|you don't know|missing/i);
});

test('misses are grouped by skill with the slow flag preserved', () => {
  const grouped = missesBySkill([
    row('circles', 'incorrect', { pace: 'slow' }),
    row('circles', 'incorrect'),
    row('transitions', 'incorrect'),
    row('transitions', 'correct'),
  ]);
  assert.equal(grouped.get('circles')!.rows.length, 2);
  assert.equal(grouped.get('circles')!.anySlow, true);
  assert.equal(grouped.get('transitions')!.rows.length, 1);
  assert.equal(grouped.get('transitions')!.anySlow, false);
});

/* ---------------------------------------------------------------- */
/* The schedule                                                      */
/* ---------------------------------------------------------------- */

test('facts use their own SRS namespace, round-tripping cleanly', () => {
  assert.equal(recallRef('mk_vieta'), 'mk:mk_vieta');
  assert.equal(factIdFromRef('mk:mk_vieta'), 'mk_vieta');
  assert.equal(factIdFromRef('q:rw_tr_001'), null);
  assert.equal(factIdFromRef('v:austere'), null);
});

test('a self-reported outcome maps to a grade that schedules honestly', () => {
  assert.ok(gradeForOutcome('missed') < gradeForOutcome('slow'));
  assert.ok(gradeForOutcome('slow') < gradeForOutcome('instant'));
  // Recalled-but-slow must come back: not automatic is the thing being fixed.
  assert.ok(gradeForOutcome('slow') < 4);
});

test('progress counts only what has actually been sat', () => {
  const now = 1_000_000;
  const card = (ref: string, dueAt: number, repetitions: number): SrsCard => ({
    id: ref, ref, easiness: 2.5, intervalDays: 1, repetitions, dueAt, lapses: 0, lastGrade: null,
  });
  const cards: Record<string, SrsCard> = {
    'mk:mk_vieta': card('mk:mk_vieta', now + 86_400_000, 3),
    'mk:mk_sohcahtoa': card('mk:mk_sohcahtoa', now - 1000, 1),
    'q:rw_tr_001': card('q:rw_tr_001', now - 1000, 5),
  };
  const progress = recallProgress(cards, now);
  assert.equal(progress.tested, 2);
  assert.equal(progress.holding, 1);
  assert.equal(progress.due, 1);
  assert.equal(progress.total, MUST_KNOW.length);
});

test('an untouched schedule reports nothing tested, not everything held', () => {
  const progress = recallProgress({}, Date.now());
  assert.equal(progress.tested, 0);
  assert.equal(progress.holding, 0);
  assert.equal(progress.total, MUST_KNOW.length);
});
