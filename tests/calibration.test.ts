/**
 * Calibration tests.
 *
 * The decisive test for an estimator is parameter recovery: simulate
 * responses from known item parameters, run the estimator, and check it gets
 * back what generated the data. Everything else here is a guard around that.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ACCEPTANCE,
  applyLinking,
  calibrate,
  linkingConstants,
  screenDif,
  summarise,
  type ResponseMatrix,
} from '../src/engine/calibration.ts';
import { pCorrect } from '../src/engine/irt.ts';
import { makeRng } from '../src/lib/util.ts';
import type { IrtParams } from '../src/types.ts';

/** Box–Muller, so simulated abilities are normal rather than uniform. */
function normal(rng: () => number): number {
  const u = Math.max(1e-12, rng());
  const v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Simulates a complete response matrix from known parameters. */
function simulate(
  truth: IrtParams[],
  examinees: number,
  seed: number,
  options: { administer?: number; groupShift?: number; difItem?: number; difSize?: number } = {},
): { matrix: ResponseMatrix; groups: Array<0 | 1>; abilities: number[] } {
  const rng = makeRng(seed);
  const itemIds = truth.map((_, i) => `i${i}`);
  const rows: Array<Array<0 | 1 | null>> = [];
  const groups: Array<0 | 1> = [];
  const abilities: number[] = [];

  for (let e = 0; e < examinees; e += 1) {
    const group: 0 | 1 = rng() < 0.5 ? 0 : 1;
    const theta = normal(rng) + (group === 1 ? (options.groupShift ?? 0) : 0);
    groups.push(group);
    abilities.push(theta);

    const row: Array<0 | 1 | null> = truth.map((params, j) => {
      if (options.administer !== undefined && rng() > options.administer) return null;

      // A DIF item is harder for the focal group at equal ability. That is
      // exactly what the screen is supposed to catch.
      const shifted =
        options.difItem === j && group === 1
          ? { a: params.a, b: params.b + (options.difSize ?? 0) }
          : params;

      return rng() < pCorrect(theta, shifted) ? 1 : 0;
    });
    rows.push(row);
  }

  return { matrix: { itemIds, rows }, groups, abilities };
}

const TRUTH: IrtParams[] = [
  { a: 0.9, b: -1.6 },
  { a: 1.1, b: -1.0 },
  { a: 1.4, b: -0.5 },
  { a: 0.8, b: 0.0 },
  { a: 1.6, b: 0.3 },
  { a: 1.2, b: 0.8 },
  { a: 1.0, b: 1.2 },
  { a: 1.5, b: 1.7 },
  { a: 0.7, b: -0.3 },
  { a: 1.3, b: 0.5 },
];

/* ================= Parameter recovery ================= */

test('calibration recovers the parameters that generated the data', () => {
  const { matrix } = simulate(TRUTH, 3000, 1234);
  const result = calibrate(matrix);

  assert.ok(result.converged, `did not converge after ${result.iterations} iterations`);

  let worstB = 0;
  let worstA = 0;
  for (let j = 0; j < TRUTH.length; j += 1) {
    const estimated = result.items[j].params;
    worstB = Math.max(worstB, Math.abs(estimated.b - TRUTH[j].b));
    worstA = Math.max(worstA, Math.abs(estimated.a - TRUTH[j].a));
  }

  assert.ok(worstB < 0.25, `worst difficulty error was ${worstB.toFixed(3)}`);
  assert.ok(worstA < 0.4, `worst discrimination error was ${worstA.toFixed(3)}`);
});

test('recovery preserves the ordering of item difficulty', () => {
  const { matrix } = simulate(TRUTH, 2500, 77);
  const result = calibrate(matrix);

  const byTruth = TRUTH.map((p, j) => ({ j, b: p.b })).sort((x, y) => x.b - y.b);
  const byEstimate = result.items
    .map((item, j) => ({ j, b: item.params.b }))
    .sort((x, y) => x.b - y.b);

  // Rank correlation of 1 would be ideal; allow a couple of adjacent swaps
  // among items whose true difficulties are close together.
  let inversions = 0;
  for (let i = 0; i < byTruth.length; i += 1) {
    if (byTruth[i].j !== byEstimate[i].j) inversions += 1;
  }
  assert.ok(inversions <= 2, `${inversions} items were out of difficulty order`);
});

test('recovery still works when each examinee sees only some items', () => {
  // The realistic case: items calibrated through pretest slots, so the matrix
  // is sparse and no examinee sees the whole bank.
  const { matrix } = simulate(TRUTH, 4000, 555, { administer: 0.4 });
  const result = calibrate(matrix);

  let worstB = 0;
  for (let j = 0; j < TRUTH.length; j += 1) {
    worstB = Math.max(worstB, Math.abs(result.items[j].params.b - TRUTH[j].b));
  }
  assert.ok(worstB < 0.35, `worst difficulty error on a sparse matrix was ${worstB.toFixed(3)}`);
});

test('ability estimates correlate with the abilities that generated the data', () => {
  const { matrix, abilities } = simulate(TRUTH, 1500, 909);
  const result = calibrate(matrix);

  const n = abilities.length;
  const meanTrue = abilities.reduce((a, b) => a + b, 0) / n;
  const meanEst = result.abilities.reduce((a, b) => a + b, 0) / n;

  let cov = 0;
  let varTrue = 0;
  let varEst = 0;
  for (let i = 0; i < n; i += 1) {
    const dt = abilities[i] - meanTrue;
    const de = result.abilities[i] - meanEst;
    cov += dt * de;
    varTrue += dt * dt;
    varEst += de * de;
  }
  const r = cov / Math.sqrt(varTrue * varEst);
  assert.ok(r > 0.8, `ability recovery correlation was only ${r.toFixed(3)}`);
});

/* ================= Robustness ================= */

test('calibration does not throw on a degenerate matrix', () => {
  const empty: ResponseMatrix = { itemIds: ['a', 'b'], rows: [] };
  assert.doesNotThrow(() => calibrate(empty));

  const allNull: ResponseMatrix = { itemIds: ['a', 'b'], rows: [[null, null], [null, null]] };
  assert.doesNotThrow(() => calibrate(allNull));

  const constant: ResponseMatrix = {
    itemIds: ['a'],
    rows: Array.from({ length: 50 }, () => [1 as const]),
  };
  const result = calibrate(constant);
  assert.ok(Number.isFinite(result.items[0].params.a));
  assert.ok(Number.isFinite(result.items[0].params.b));
});

test('estimates stay inside the configured bounds', () => {
  // An item everybody gets right pushes difficulty toward negative infinity.
  const matrix: ResponseMatrix = {
    itemIds: ['easy', 'hard'],
    rows: Array.from({ length: 400 }, () => [1 as const, 0 as const]),
  };
  const result = calibrate(matrix, { aBounds: [0.2, 3], bBounds: [-4, 4] });

  for (const item of result.items) {
    assert.ok(item.params.a >= 0.2 && item.params.a <= 3, `a out of bounds: ${item.params.a}`);
    assert.ok(item.params.b >= -4 && item.params.b <= 4, `b out of bounds: ${item.params.b}`);
  }
});

/* ================= Acceptance screen ================= */

test('a well-behaved item passes and a random one does not', () => {
  const truth: IrtParams[] = [...TRUTH, { a: 0.05, b: 0 }];
  const { matrix } = simulate(truth, 1200, 4242);
  const result = calibrate(matrix);

  const good = result.items[4]; // a = 1.6, b = 0.3
  assert.ok(good.accepted, `a strong item was rejected: ${good.rejectReasons.join('; ')}`);

  const noise = result.items[result.items.length - 1];
  assert.ok(!noise.accepted, 'an item with almost no discrimination was accepted');
  assert.ok(
    noise.rejectReasons.some((r) => /discrimination|point-biserial/.test(r)),
    `unexpected rejection reasons: ${noise.rejectReasons.join('; ')}`,
  );
});

test('an item with too small a sample is rejected regardless of its statistics', () => {
  const { matrix } = simulate(TRUTH, 40, 31);
  const result = calibrate(matrix);
  for (const item of result.items) {
    assert.ok(!item.accepted);
    assert.ok(item.rejectReasons.some((r) => r.includes('sample')));
  }
  assert.ok(ACCEPTANCE.minSample > 40);
});

test('the summary groups rejections by kind rather than by value', () => {
  const { matrix } = simulate(TRUTH, 60, 11);
  const report = summarise(calibrate(matrix));

  assert.equal(report.total, TRUTH.length);
  assert.equal(report.accepted + report.rejected, report.total);
  assert.equal(report.rejected, TRUTH.length, 'a 60-examinee calibration should accept nothing');

  // Every item fails on sample size, and those ten distinct messages — each
  // carrying a different count — must collapse into a single grouped reason.
  const sampleKey = Object.keys(report.reasons).find((k) => k.startsWith('sample'));
  assert.ok(sampleKey, `no grouped sample reason in ${Object.keys(report.reasons).join(' | ')}`);
  assert.equal(report.reasons[sampleKey!], TRUTH.length);
});

test('fit statistics centre on one for items that fit the model', () => {
  // Data generated from the model itself should produce mean squares near 1.
  // They do not if fit is evaluated at an ability the item helped estimate:
  // that plug-in bias pulled outfit down to roughly 0.65 before the estimator
  // moved to a leave-one-out posterior predictive.
  const { matrix } = simulate(TRUTH, 3000, 24680);
  const result = calibrate(matrix);

  const mean = (values: number[]) => values.reduce((a, b) => a + b, 0) / values.length;
  const outfit = mean(result.items.map((i) => i.outfit));
  const infit = mean(result.items.map((i) => i.infit));

  assert.ok(Math.abs(outfit - 1) < 0.12, `mean outfit was ${outfit.toFixed(3)}`);
  assert.ok(Math.abs(infit - 1) < 0.08, `mean infit was ${infit.toFixed(3)}`);

  for (const item of result.items) {
    assert.ok(item.outfit > 0.6 && item.outfit < 1.6, `${item.itemId} outfit ${item.outfit.toFixed(2)}`);
  }
});

test('point-biserial is computed against the rest of the test, not the whole', () => {
  const { matrix } = simulate(TRUTH, 1500, 606);
  const result = calibrate(matrix);
  for (const item of result.items) {
    assert.ok(item.pointBiserial > 0.1, `${item.itemId} correlated at only ${item.pointBiserial.toFixed(2)}`);
    assert.ok(item.pointBiserial < 0.95, 'an item appears to be correlated with itself');
  }
});

/* ================= Differential item functioning ================= */

test('an item that is harder for one group at equal ability is flagged', () => {
  const { matrix, groups } = simulate(TRUTH, 4000, 2026, { difItem: 3, difSize: 1.1 });
  const flagged = screenDif(matrix, groups, 3);
  const clean = screenDif(matrix, groups, 5);

  assert.ok(Math.abs(flagged.delta) > Math.abs(clean.delta), 'the planted DIF item was not the more extreme one');
  assert.notEqual(flagged.classification, 'A', `planted DIF classified as negligible: delta ${flagged.delta.toFixed(2)}`);
  assert.equal(clean.classification, 'A', `a clean item was flagged: delta ${clean.delta.toFixed(2)}`);
});

test('a moderate group difference in ability is not mistaken for DIF', () => {
  // The focal group is genuinely weaker, but no item behaves differently at
  // equal ability. Matching on total score is what prevents a false positive.
  const { matrix, groups } = simulate(TRUTH, 4000, 808, { groupShift: -0.4 });

  for (let j = 0; j < TRUTH.length; j += 1) {
    const result = screenDif(matrix, groups, j);
    assert.equal(
      result.classification,
      'A',
      `item ${j} flagged from a pure ability difference: delta ${result.delta.toFixed(2)}`,
    );
  }
});

test('a large group ability difference inflates DIF but never to the review threshold', () => {
  // Mantel-Haenszel is known to over-flag when the two ability distributions
  // are far apart: matching on observed score cannot fully equate groups whose
  // true abilities differ, so some items drift into the moderate band. What
  // must not happen is a clean item reaching the band that triggers content
  // review, and this test is what holds that line.
  const { matrix, groups } = simulate(TRUTH, 4000, 808, { groupShift: -0.8 });

  const results = TRUTH.map((_, j) => screenDif(matrix, groups, j));
  assert.ok(
    results.every((r) => r.classification !== 'C'),
    `a clean item reached the review threshold: ${results
      .filter((r) => r.classification === 'C')
      .map((r) => `${r.itemId} delta ${r.delta.toFixed(2)}`)
      .join(', ')}`,
  );
  assert.ok(
    results.filter((r) => r.classification === 'A').length >= TRUTH.length / 2,
    'more than half the clean items were flagged',
  );
});

test('DIF on an undefined comparison reports no difference rather than infinity', () => {
  const matrix: ResponseMatrix = {
    itemIds: ['x'],
    rows: Array.from({ length: 100 }, () => [1 as const]),
  };
  const groups = Array.from({ length: 100 }, (_, i) => (i % 2) as 0 | 1);
  const result = screenDif(matrix, groups, 0);

  assert.ok(Number.isFinite(result.delta));
  assert.equal(result.classification, 'A');
});

/* ================= Linking ================= */

test('linking brings a shifted calibration back onto the reference scale', () => {
  const reference: IrtParams[] = TRUTH;
  // The same items on a scale where theta_reference = 1.2 * theta_fresh + 0.5.
  // Difficulty transforms with theta; discrimination transforms inversely,
  // because compressing the ability metric must steepen the item to keep the
  // logit unchanged.
  const fresh: IrtParams[] = TRUTH.map((p) => ({ a: p.a * 1.2, b: (p.b - 0.5) / 1.2 }));

  const link = linkingConstants(reference, fresh);
  assert.ok(Math.abs(link.slope - 1.2) < 0.05, `slope ${link.slope}`);
  assert.ok(Math.abs(link.intercept - 0.5) < 0.05, `intercept ${link.intercept}`);

  for (let j = 0; j < reference.length; j += 1) {
    const linked = applyLinking(fresh[j], link);
    assert.ok(Math.abs(linked.b - reference[j].b) < 0.05, `item ${j} difficulty did not link back`);
    assert.ok(Math.abs(linked.a - reference[j].a) < 0.05, `item ${j} discrimination did not link back`);
  }
});

test('linking is the identity when the two calibrations already agree', () => {
  const link = linkingConstants(TRUTH, TRUTH);
  assert.ok(Math.abs(link.slope - 1) < 1e-9);
  assert.ok(Math.abs(link.intercept) < 1e-9);
});

test('linking degrades safely with too few anchor items', () => {
  const link = linkingConstants([TRUTH[0]], [TRUTH[0]]);
  assert.equal(link.slope, 1);
  assert.equal(link.intercept, 0);
});
