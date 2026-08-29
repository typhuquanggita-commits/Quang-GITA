/**
 * Item calibration.
 *
 * The documentation has said from the start that the parameters shipped with
 * this bank are author estimates rather than calibrations, and that a
 * production deployment must replace them with values estimated from real
 * response data. This is the machinery that does it.
 *
 * Marginal maximum likelihood via the EM algorithm, which is the standard
 * approach and the right one here for a specific reason: it estimates item
 * parameters by integrating ability out over the population distribution,
 * rather than estimating an ability for every examinee and treating those
 * estimates as if they were known. The latter — joint maximum likelihood —
 * produces item parameters that are inconsistent as the sample grows, which
 * is exactly the wrong property for a bank meant to be reused.
 *
 * Also here: the fit statistics and the differential-item-functioning screen
 * that decide whether an item is fit to keep. Calibrating without those
 * produces confident numbers for items that should have been discarded.
 */

import type { IrtParams } from '../types.ts';
import { D, pCorrect } from './irt.ts';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

/**
 * A response matrix. `null` means the item was not administered to that
 * examinee, which is the normal case for a bank calibrated through pretest
 * slots — every examinee sees a different handful of items.
 */
export interface ResponseMatrix {
  itemIds: string[];
  /** One row per examinee; one entry per item id, in order. */
  rows: Array<Array<0 | 1 | null>>;
}

export interface CalibrationOptions {
  /** Quadrature nodes across the ability distribution. */
  nodes?: number;
  /** Range of the quadrature grid. */
  range?: [number, number];
  maxIterations?: number;
  /** Stop once the largest parameter change falls below this. */
  tolerance?: number;
  /** Bounds keep a poorly-determined item from running away. */
  aBounds?: [number, number];
  bBounds?: [number, number];
  /**
   * Called after each EM iteration. A calibration over a real bank takes tens
   * of seconds, so the caller needs to be able to show that it is working
   * rather than hung — and, off the main thread, to report how far along.
   */
  onIteration?(progress: { iteration: number; delta: number; maxIterations: number }): void;
}

export interface ItemCalibration {
  itemId: string;
  params: IrtParams;
  /** Examinees who saw this item. */
  n: number;
  /** Proportion correct among those who saw it. */
  pValue: number;
  /** Correlation between this item and total score on the rest. */
  pointBiserial: number;
  /** Outfit mean square: sensitive to unexpected responses far from b. */
  outfit: number;
  /** Infit mean square: weighted, sensitive to responses near b. */
  infit: number;
  /** Whether the item passes the acceptance screen. */
  accepted: boolean;
  /** Why it was rejected, when it was. */
  rejectReasons: string[];
}

export interface CalibrationResult {
  items: ItemCalibration[];
  iterations: number;
  converged: boolean;
  /** Largest parameter change on the final iteration. */
  finalDelta: number;
  /** Ability estimates implied by the final item parameters. */
  abilities: number[];
}

/* ------------------------------------------------------------------ */
/* Acceptance thresholds                                               */
/* ------------------------------------------------------------------ */

/**
 * The screen an item must pass to enter an operational bank.
 *
 * These are conventional values, and they are deliberately stated as data
 * rather than buried in a condition, so a programme can defend or change them
 * as a policy decision rather than a code change.
 */
export const ACCEPTANCE = {
  /** Below this the item barely separates strong from weak examinees. */
  minDiscrimination: 0.5,
  /** Above this the item is suspiciously deterministic — often a clue leak. */
  maxDiscrimination: 3.0,
  /** Outside this range the item is far off the population it will serve. */
  difficultyRange: [-3, 3] as [number, number],
  /** Below this the item does not correlate with the construct. */
  minPointBiserial: 0.15,
  /** Fit mean squares outside this band indicate the model does not describe the item. */
  fitRange: [0.7, 1.4] as [number, number],
  /** Below this sample size an estimate is not stable enough to trust. */
  minSample: 200,
};

/* ------------------------------------------------------------------ */
/* Quadrature                                                          */
/* ------------------------------------------------------------------ */

function quadrature(count: number, range: [number, number]) {
  const nodes: number[] = [];
  const weights: number[] = [];
  const step = (range[1] - range[0]) / (count - 1);

  for (let i = 0; i < count; i += 1) {
    const theta = range[0] + i * step;
    nodes.push(theta);
    weights.push(Math.exp(-0.5 * theta * theta));
  }
  const total = weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < weights.length; i += 1) weights[i] /= total;

  return { nodes, weights };
}

/* ------------------------------------------------------------------ */
/* MMLE-EM                                                             */
/* ------------------------------------------------------------------ */

export function calibrate(
  matrix: ResponseMatrix,
  options: CalibrationOptions = {},
): CalibrationResult {
  const {
    nodes: nodeCount = 41,
    range = [-4, 4],
    maxIterations = 200,
    tolerance = 1e-4,
    aBounds = [0.2, 4],
    bBounds = [-5, 5],
    onIteration,
  } = options;

  const { nodes, weights } = quadrature(nodeCount, range);
  const itemCount = matrix.itemIds.length;
  const examineeCount = matrix.rows.length;

  // Start from a neutral prior on every item. Starting from the author's own
  // estimates would bias the result toward them, which defeats the purpose.
  const params: IrtParams[] = Array.from({ length: itemCount }, () => ({ a: 1, b: 0 }));

  let iterations = 0;
  let delta = Infinity;

  for (; iterations < maxIterations && delta > tolerance; iterations += 1) {
    /* ---- E step: expected counts at each quadrature node ---- */
    // nk[k]   — expected examinees at node k
    // rjk[j][k] — expected correct responses to item j at node k
    // njk[j][k] — expected administrations of item j at node k
    const nk = new Array<number>(nodeCount).fill(0);
    const rjk = Array.from({ length: itemCount }, () => new Array<number>(nodeCount).fill(0));
    const njk = Array.from({ length: itemCount }, () => new Array<number>(nodeCount).fill(0));

    for (let e = 0; e < examineeCount; e += 1) {
      const row = matrix.rows[e];
      const posterior = new Array<number>(nodeCount);
      let norm = 0;

      for (let k = 0; k < nodeCount; k += 1) {
        // Log space, so a long response vector cannot underflow.
        let logLike = 0;
        for (let j = 0; j < itemCount; j += 1) {
          const response = row[j];
          if (response === null || response === undefined) continue;
          const p = clampProbability(pCorrect(nodes[k], params[j]));
          logLike += response === 1 ? Math.log(p) : Math.log(1 - p);
        }
        posterior[k] = logLike;
      }

      const maxLog = Math.max(...posterior);
      for (let k = 0; k < nodeCount; k += 1) {
        posterior[k] = weights[k] * Math.exp(posterior[k] - maxLog);
        norm += posterior[k];
      }
      if (norm === 0) continue;

      for (let k = 0; k < nodeCount; k += 1) {
        const w = posterior[k] / norm;
        nk[k] += w;
        for (let j = 0; j < itemCount; j += 1) {
          const response = row[j];
          if (response === null || response === undefined) continue;
          njk[j][k] += w;
          if (response === 1) rjk[j][k] += w;
        }
      }
    }

    /* ---- M step: fit each item to its expected counts ---- */
    delta = 0;
    for (let j = 0; j < itemCount; j += 1) {
      const before = params[j];
      const after = fitItem(nodes, njk[j], rjk[j], before, aBounds, bBounds);
      delta = Math.max(delta, Math.abs(after.a - before.a), Math.abs(after.b - before.b));
      params[j] = after;
    }

    onIteration?.({ iteration: iterations + 1, delta, maxIterations });
  }

  /* ---- Ability estimates under the final parameters ---- */

  /**
   * Posterior log-likelihood per node, kept alongside each item's own
   * contribution, so a leave-one-out posterior can be formed by subtraction
   * rather than by recomputing from scratch for every examinee-item pair.
   */
  const abilities: number[] = [];
  const looTheta: number[][] = []; // [examinee][item]
  const looPosterior: number[][][] = []; // [examinee][item][node]

  for (let e = 0; e < examineeCount; e += 1) {
    const row = matrix.rows[e];
    const logTotal = new Array<number>(nodeCount).fill(0);
    const logItem = Array.from({ length: itemCount }, () => new Array<number>(nodeCount).fill(0));

    for (let k = 0; k < nodeCount; k += 1) {
      for (let j = 0; j < itemCount; j += 1) {
        const response = row[j];
        if (response === null || response === undefined) continue;
        const p = clampProbability(pCorrect(nodes[k], params[j]));
        const contribution = response === 1 ? Math.log(p) : Math.log(1 - p);
        logItem[j][k] = contribution;
        logTotal[k] += contribution;
      }
    }

    abilities.push(posteriorMean(nodes, weights, logTotal));

    const perItemTheta = new Array<number>(itemCount).fill(0);
    const perItemPosterior: number[][] = [];

    for (let j = 0; j < itemCount; j += 1) {
      const response = row[j];
      if (response === null || response === undefined) {
        perItemPosterior.push([]);
        continue;
      }
      // Subtracting this item's own contribution leaves the posterior that
      // the rest of the responses imply. Without this, the item influences the
      // ability used to judge it, and every fit statistic comes back
      // optimistically low.
      const held = logTotal.map((value, k) => value - logItem[j][k]);
      const posterior = normalisedPosterior(weights, held);
      perItemPosterior.push(posterior);
      perItemTheta[j] = posterior.reduce((acc, w, k) => acc + w * nodes[k], 0);
    }

    looTheta.push(perItemTheta);
    looPosterior.push(perItemPosterior);
  }

  /* ---- Diagnostics and acceptance ---- */
  const items = matrix.itemIds.map((itemId, j) =>
    diagnose(itemId, j, matrix, params[j], nodes, looPosterior),
  );

  return {
    items,
    iterations,
    converged: delta <= tolerance,
    finalDelta: delta,
    abilities,
  };
}

/** Normalised posterior weights across the quadrature grid. */
function normalisedPosterior(
  priorWeights: readonly number[],
  logLikelihood: readonly number[],
): number[] {
  let maxLog = -Infinity;
  for (const value of logLikelihood) if (value > maxLog) maxLog = value;

  const out = new Array<number>(logLikelihood.length);
  let norm = 0;
  for (let k = 0; k < logLikelihood.length; k += 1) {
    out[k] = priorWeights[k] * Math.exp(logLikelihood[k] - maxLog);
    norm += out[k];
  }
  if (norm === 0) return priorWeights.slice();
  for (let k = 0; k < out.length; k += 1) out[k] /= norm;
  return out;
}

function posteriorMean(
  nodes: readonly number[],
  priorWeights: readonly number[],
  logLikelihood: readonly number[],
): number {
  const posterior = normalisedPosterior(priorWeights, logLikelihood);
  let mean = 0;
  for (let k = 0; k < nodes.length; k += 1) mean += nodes[k] * posterior[k];
  return mean;
}

function clampProbability(p: number): number {
  return Math.min(Math.max(p, 1e-10), 1 - 1e-10);
}

/**
 * Newton–Raphson on the two-parameter logistic likelihood at the quadrature
 * nodes, with a step-halving fallback.
 *
 * The fallback matters: the 2PL surface is not globally concave in `a`, and a
 * full Newton step from a poor start can jump into a worse region. Halving
 * until the likelihood improves keeps the iteration monotone, which is what
 * makes the outer EM loop converge at all.
 */
function fitItem(
  nodes: readonly number[],
  n: readonly number[],
  r: readonly number[],
  start: IrtParams,
  aBounds: [number, number],
  bBounds: [number, number],
): IrtParams {
  let { a, b } = start;

  const logLike = (aa: number, bb: number): number => {
    let total = 0;
    for (let k = 0; k < nodes.length; k += 1) {
      if (n[k] <= 0) continue;
      const p = clampProbability(pCorrect(nodes[k], { a: aa, b: bb }));
      total += r[k] * Math.log(p) + (n[k] - r[k]) * Math.log(1 - p);
    }
    return total;
  };

  for (let step = 0; step < 40; step += 1) {
    let gA = 0;
    let gB = 0;
    let hAA = 0;
    let hAB = 0;
    let hBB = 0;

    for (let k = 0; k < nodes.length; k += 1) {
      if (n[k] <= 0) continue;
      const theta = nodes[k];
      const p = clampProbability(pCorrect(theta, { a, b }));
      const w = n[k] * p * (1 - p);
      const residual = r[k] - n[k] * p;
      const dz_da = D * (theta - b);
      const dz_db = -D * a;

      gA += residual * dz_da;
      gB += residual * dz_db;

      hAA -= w * dz_da * dz_da;
      hAB -= w * dz_da * dz_db;
      hBB -= w * dz_db * dz_db;
    }

    const det = hAA * hBB - hAB * hAB;
    if (!Number.isFinite(det) || Math.abs(det) < 1e-12) break;

    // Solve the 2x2 system H·step = −g.
    const stepA = -(hBB * gA - hAB * gB) / det;
    const stepB = -(-hAB * gA + hAA * gB) / det;
    if (!Number.isFinite(stepA) || !Number.isFinite(stepB)) break;

    const current = logLike(a, b);
    let scale = 1;
    let nextA = a;
    let nextB = b;
    let improved = false;

    for (let halving = 0; halving < 12; halving += 1) {
      nextA = clamp(a + scale * stepA, aBounds[0], aBounds[1]);
      nextB = clamp(b + scale * stepB, bBounds[0], bBounds[1]);
      if (logLike(nextA, nextB) >= current) {
        improved = true;
        break;
      }
      scale /= 2;
    }
    if (!improved) break;

    const moved = Math.max(Math.abs(nextA - a), Math.abs(nextB - b));
    a = nextA;
    b = nextB;
    if (moved < 1e-6) break;
  }

  return { a, b };
}

function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

/* ------------------------------------------------------------------ */
/* Fit and acceptance                                                  */
/* ------------------------------------------------------------------ */

/**
 * Fit statistics and the acceptance screen for one item.
 *
 * Fit is integrated over the leave-one-out ability posterior rather than
 * evaluated at a point estimate. Both corrections matter: a point estimate
 * ignores how uncertain the ability is, and an ability that the item itself
 * helped estimate makes the item look better than it is. Together they biased
 * outfit down by roughly a third on simulated data that fitted the model
 * perfectly.
 */
function diagnose(
  itemId: string,
  j: number,
  matrix: ResponseMatrix,
  params: IrtParams,
  nodes: readonly number[],
  looPosterior: readonly number[][][],
): ItemCalibration {
  let n = 0;
  let correct = 0;
  let outfitSum = 0;
  let infitNumerator = 0;
  let infitDenominator = 0;

  const itemScores: number[] = [];
  const restScores: number[] = [];

  for (let e = 0; e < matrix.rows.length; e += 1) {
    const response = matrix.rows[e][j];
    if (response === null || response === undefined) continue;

    n += 1;
    if (response === 1) correct += 1;

    // The posterior predictive probability of a correct response: the model's
    // prediction with the ability uncertainty already integrated out. The
    // residual is standardised once against its own variance, rather than
    // per node — standardising inside the integral divides by a vanishing
    // variance at nodes far from the truth and inflates the statistic.
    const posterior = looPosterior[e][j];
    let predicted = 0;
    for (let k = 0; k < nodes.length; k += 1) {
      const w = posterior[k];
      if (w <= 0) continue;
      predicted += w * pCorrect(nodes[k], params);
    }
    predicted = clampProbability(predicted);

    const variance = predicted * (1 - predicted);
    const residual = response - predicted;

    outfitSum += (residual * residual) / variance;
    infitNumerator += residual * residual;
    infitDenominator += variance;

    // Point-biserial against the rest of the test, not the whole test, so an
    // item is not credited for correlating with itself.
    itemScores.push(response);
    let rest = 0;
    let restCount = 0;
    for (let k = 0; k < matrix.itemIds.length; k += 1) {
      if (k === j) continue;
      const other = matrix.rows[e][k];
      if (other === null || other === undefined) continue;
      rest += other;
      restCount += 1;
    }
    restScores.push(restCount === 0 ? 0 : rest / restCount);
  }

  const outfit = n === 0 ? 1 : outfitSum / n;
  const infit = infitDenominator === 0 ? 1 : infitNumerator / infitDenominator;
  const pValue = n === 0 ? 0 : correct / n;
  const pointBiserial = correlation(itemScores, restScores);

  const rejectReasons: string[] = [];
  if (n < ACCEPTANCE.minSample) rejectReasons.push(`sample of ${n} below ${ACCEPTANCE.minSample}`);
  if (params.a < ACCEPTANCE.minDiscrimination) rejectReasons.push(`discrimination ${params.a.toFixed(2)} too low`);
  if (params.a > ACCEPTANCE.maxDiscrimination) rejectReasons.push(`discrimination ${params.a.toFixed(2)} implausibly high`);
  if (params.b < ACCEPTANCE.difficultyRange[0] || params.b > ACCEPTANCE.difficultyRange[1]) {
    rejectReasons.push(`difficulty ${params.b.toFixed(2)} outside the served range`);
  }
  if (pointBiserial < ACCEPTANCE.minPointBiserial) {
    rejectReasons.push(`point-biserial ${pointBiserial.toFixed(2)} below ${ACCEPTANCE.minPointBiserial}`);
  }
  if (outfit < ACCEPTANCE.fitRange[0] || outfit > ACCEPTANCE.fitRange[1]) {
    rejectReasons.push(`outfit ${outfit.toFixed(2)} outside ${ACCEPTANCE.fitRange.join('-')}`);
  }
  if (infit < ACCEPTANCE.fitRange[0] || infit > ACCEPTANCE.fitRange[1]) {
    rejectReasons.push(`infit ${infit.toFixed(2)} outside ${ACCEPTANCE.fitRange.join('-')}`);
  }

  return {
    itemId,
    params,
    n,
    pValue,
    pointBiserial,
    outfit,
    infit,
    accepted: rejectReasons.length === 0,
    rejectReasons,
  };
}

function correlation(x: readonly number[], y: readonly number[]): number {
  const n = Math.min(x.length, y.length);
  if (n < 2) return 0;

  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < n; i += 1) {
    sumX += x[i];
    sumY += y[i];
  }
  const meanX = sumX / n;
  const meanY = sumY / n;

  let cov = 0;
  let varX = 0;
  let varY = 0;
  for (let i = 0; i < n; i += 1) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    cov += dx * dy;
    varX += dx * dx;
    varY += dy * dy;
  }
  if (varX === 0 || varY === 0) return 0;
  return cov / Math.sqrt(varX * varY);
}

/* ------------------------------------------------------------------ */
/* Differential item functioning                                       */
/* ------------------------------------------------------------------ */

export interface DifResult {
  itemId: string;
  /** Mantel–Haenszel common odds ratio. */
  alpha: number;
  /** ETS delta scale: −2.35·ln(alpha). Negative favours the reference group. */
  delta: number;
  /** ETS classification: A negligible, B moderate, C large. */
  classification: 'A' | 'B' | 'C';
  /** Examinees contributing, after thin strata are dropped. */
  n: number;
}

/**
 * Mantel–Haenszel differential item functioning.
 *
 * Compares performance on one item between two groups **matched on total
 * score**, which is the point: an item is not unfair because one group scores
 * lower on the test, only because equally able members of the two groups
 * answer it differently.
 *
 * A programme that calibrates without running this ships fairness defects it
 * has the data to detect.
 */
export function screenDif(
  matrix: ResponseMatrix,
  groups: readonly (0 | 1)[],
  itemIndex: number,
  strata = 10,
): DifResult {
  const itemId = matrix.itemIds[itemIndex];

  // Match on the number correct across the other items.
  const totals: number[] = matrix.rows.map((row) =>
    row.reduce<number>((acc, value, k) => (k === itemIndex || value === null ? acc : acc + value), 0),
  );

  const maxTotal = Math.max(1, ...totals);
  const bucketOf = (total: number) => Math.min(strata - 1, Math.floor((total / (maxTotal + 1)) * strata));

  let numerator = 0;
  let denominator = 0;
  let contributing = 0;

  for (let s = 0; s < strata; s += 1) {
    // Reference group is 0, focal group is 1.
    let refCorrect = 0;
    let refWrong = 0;
    let focCorrect = 0;
    let focWrong = 0;

    for (let e = 0; e < matrix.rows.length; e += 1) {
      const response = matrix.rows[e][itemIndex];
      if (response === null || response === undefined) continue;
      if (bucketOf(totals[e]) !== s) continue;

      if (groups[e] === 0) {
        if (response === 1) refCorrect += 1;
        else refWrong += 1;
      } else if (response === 1) focCorrect += 1;
      else focWrong += 1;
    }

    const total = refCorrect + refWrong + focCorrect + focWrong;
    // A stratum with nobody in one group carries no information about the
    // comparison and would only add noise.
    if (total === 0 || refCorrect + refWrong === 0 || focCorrect + focWrong === 0) continue;

    numerator += (refCorrect * focWrong) / total;
    denominator += (refWrong * focCorrect) / total;
    contributing += total;
  }

  // A zero on either side means one group got the item uniformly right or
  // wrong within every usable stratum; the odds ratio is undefined, so report
  // no detectable difference rather than an infinity.
  const alpha = denominator === 0 || numerator === 0 ? 1 : numerator / denominator;
  const delta = -2.35 * Math.log(alpha);
  const magnitude = Math.abs(delta);

  return {
    itemId,
    alpha,
    delta,
    classification: magnitude < 1 ? 'A' : magnitude < 1.5 ? 'B' : 'C',
    n: contributing,
  };
}

/* ------------------------------------------------------------------ */
/* Linking                                                             */
/* ------------------------------------------------------------------ */

export interface LinkingConstants {
  /** Multiplicative constant applied to the theta metric. */
  slope: number;
  /** Additive constant applied to the theta metric. */
  intercept: number;
}

/**
 * Mean–sigma linking from anchor items.
 *
 * Two calibrations of the same items land on different scales, because the
 * theta metric is only identified up to a linear transform. Without linking,
 * a bank update silently shifts every reported score — the failure is
 * invisible precisely because both sets of numbers look reasonable.
 */
export function linkingConstants(
  reference: readonly IrtParams[],
  fresh: readonly IrtParams[],
): LinkingConstants {
  const n = Math.min(reference.length, fresh.length);
  if (n < 2) return { slope: 1, intercept: 0 };

  const meanOf = (values: number[]) => values.reduce((a, b) => a + b, 0) / values.length;
  const sdOf = (values: number[]) => {
    const m = meanOf(values);
    return Math.sqrt(values.reduce((acc, v) => acc + (v - m) ** 2, 0) / values.length);
  };

  const refB = reference.slice(0, n).map((p) => p.b);
  const freshB = fresh.slice(0, n).map((p) => p.b);

  const sdFresh = sdOf(freshB);
  const slope = sdFresh === 0 ? 1 : sdOf(refB) / sdFresh;
  const intercept = meanOf(refB) - slope * meanOf(freshB);

  return { slope, intercept };
}

/** Applies linking constants to bring a fresh calibration onto the reference scale. */
export function applyLinking(params: IrtParams, link: LinkingConstants): IrtParams {
  return {
    a: params.a / link.slope,
    b: link.slope * params.b + link.intercept,
  };
}

/* ------------------------------------------------------------------ */
/* Reporting                                                           */
/* ------------------------------------------------------------------ */

export interface CalibrationReport {
  total: number;
  accepted: number;
  rejected: number;
  converged: boolean;
  iterations: number;
  /** Rejection counts by reason, so a bank problem is visible as a pattern. */
  reasons: Record<string, number>;
  meanDiscrimination: number;
  meanDifficulty: number;
}

export function summarise(result: CalibrationResult): CalibrationReport {
  const reasons: Record<string, number> = {};
  for (const item of result.items) {
    for (const reason of item.rejectReasons) {
      // Group by the kind of failure, not the specific number in the message.
      const kind = reason.replace(/[-\d.]+/g, 'N').replace(/N+/g, 'N');
      reasons[kind] = (reasons[kind] ?? 0) + 1;
    }
  }

  const accepted = result.items.filter((i) => i.accepted);

  return {
    total: result.items.length,
    accepted: accepted.length,
    rejected: result.items.length - accepted.length,
    converged: result.converged,
    iterations: result.iterations,
    reasons,
    meanDiscrimination:
      accepted.length === 0 ? 0 : accepted.reduce((acc, i) => acc + i.params.a, 0) / accepted.length,
    meanDifficulty:
      accepted.length === 0 ? 0 : accepted.reduce((acc, i) => acc + i.params.b, 0) / accepted.length,
  };
}
