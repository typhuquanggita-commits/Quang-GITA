/**
 * The calibration console's own logic: what evidence exists, and whether an
 * imported matrix is trustworthy enough to calibrate.
 *
 * The estimator is tested in `calibration.test.ts`. What is tested here is the
 * gate in front of it — because the failure this console exists to prevent is
 * not a wrong number, it is a plausible one produced from data that could
 * never have supported it.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { assess, matrixFromAttempts, parseImport, MIN_EXAMINEES } from '../src/features/calibration/matrix.ts';
import { ACCEPTANCE } from '../src/engine/calibration.ts';
import { BANK } from '../src/data/bank.ts';
import type { Attempt, Response } from '../src/types.ts';

function response(questionId: string, correct: boolean): Response {
  return {
    questionId,
    value: 'A',
    correct,
    flagged: false,
    msSpent: 40_000,
    eliminated: [],
    visits: 1,
    lastChangedAt: Date.now(),
  };
}

function attempt(ids: string[], id = 'att_1'): Attempt {
  const responses: Record<string, Response> = {};
  ids.forEach((qid, i) => {
    responses[qid] = response(qid, i % 2 === 0);
  });
  return {
    id,
    mode: 'full-test',
    formId: 'form_1',
    label: 'Test',
    startedAt: Date.now(),
    submittedAt: Date.now(),
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

test('a matrix from one device is built, and declared unusable anyway', () => {
  const ids = BANK.slice(0, 40).map((q) => q.id);
  const matrix = matrixFromAttempts([attempt(ids)]);

  assert.equal(matrix.itemIds.length, BANK.length, 'every bank item must appear as a column');
  assert.equal(matrix.rows.length, 1);
  assert.equal(
    matrix.rows[0].filter((v) => v !== null).length,
    40,
    'only answered items carry a response',
  );

  // One learner is not a population. The estimator would still return numbers.
  const readiness = assess(matrix, 1);
  assert.equal(readiness.usable, false);
  assert.ok(readiness.blockers.length > 0);
  assert.equal(readiness.blockers.length, readiness.blockersVi.length, 'blockers must be bilingual');
  assert.ok(
    readiness.blockers.some((b) => b.includes(String(MIN_EXAMINEES))),
    'the examinee floor must be named, not merely implied',
  );
});

test('an unanswered attempt contributes no row', () => {
  const empty = matrixFromAttempts([attempt([])]);
  assert.equal(empty.rows.length, 0, 'a row of nothing but nulls is not evidence');
  assert.equal(assess(empty, 0).usable, false);
});

test('readiness counts the acceptance floor, not merely the responses', () => {
  const ids = BANK.slice(0, 3).map((q) => q.id);
  // Enough examinees, but each item still short of the sample floor.
  const rows = Array.from({ length: MIN_EXAMINEES + 10 }, () => attempt(ids));
  const readiness = assess(matrixFromAttempts(rows), MIN_EXAMINEES + 10);

  assert.equal(readiness.itemsWithData, 3);
  assert.ok(readiness.itemsAtSample < 3 || ACCEPTANCE.minSample <= MIN_EXAMINEES + 10);
  assert.equal(readiness.usable, false, 'three items out of a whole bank is not a calibration');
});

test('the importer refuses malformed data rather than coercing it', () => {
  const bad = [
    ['not json at all', /JSON/],
    ['{}', /itemIds/],
    ['{"itemIds":[],"rows":[[1]]}', /empty/],
    ['{"itemIds":["a","a"],"rows":[[1,0]]}', /duplicate/],
    ['{"itemIds":["a","b"],"rows":[]}', /non-empty/],
    ['{"itemIds":["a","b"],"rows":[[1]]}', /1 entries but there are 2/],
    ['{"itemIds":["a","b"],"rows":[[1,2]]}', /expected 0, 1, or null/],
    ['{"itemIds":["a","b"],"rows":[[1,0]],"groups":[0,1]}', /one entry per row/],
    ['{"itemIds":["a","b"],"rows":[[1,0]],"groups":[2]}', /0 \(reference\) or 1 \(focal\)/],
  ] as const;

  for (const [text, pattern] of bad) {
    const parsed = parseImport(text);
    assert.equal(parsed.ok, false, `should have rejected: ${text}`);
    if (!parsed.ok) assert.match(parsed.error, pattern);
  }
});

test('a well-formed import parses, with groups when present', () => {
  const withoutGroups = parseImport('{"itemIds":["a","b"],"rows":[[1,0],[null,1]]}');
  assert.ok(withoutGroups.ok);
  if (withoutGroups.ok) {
    assert.equal(withoutGroups.value.matrix.rows.length, 2);
    assert.equal(withoutGroups.value.groups, undefined);
    assert.equal(withoutGroups.value.examinees, 2);
    assert.equal(withoutGroups.value.matrix.rows[1][0], null, 'a null must survive as a null');
  }

  const withGroups = parseImport('{"itemIds":["a","b"],"rows":[[1,0],[0,1]],"groups":[0,1]}');
  assert.ok(withGroups.ok);
  if (withGroups.ok) assert.deepEqual(withGroups.value.groups, [0, 1]);
});

test('a real cohort import passes the readiness gate', () => {
  // What the console is actually for: enough examinees, enough responses per
  // item, and the whole bank covered.
  const itemIds = BANK.map((q) => q.id);
  const rows = Array.from({ length: ACCEPTANCE.minSample + 50 }, (_, e) =>
    itemIds.map((_id, j) => ((e + j) % 3 === 0 ? 0 : 1) as 0 | 1),
  );
  const readiness = assess({ itemIds, rows }, rows.length);

  assert.equal(readiness.usable, true, readiness.blockers.join(' | '));
  assert.equal(readiness.itemsAtSample, itemIds.length);
});
