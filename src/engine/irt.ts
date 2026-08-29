/**
 * Item response theory under the two-parameter logistic (2PL) model.
 *
 * Every scored response in SAT365 feeds an ability estimate on the theta
 * scale. Using IRT rather than percent-correct means a score is comparable
 * across forms of unequal difficulty — the property that makes adaptive
 * delivery defensible, and the reason the Digital SAT itself is built this
 * way.
 *
 *   P(correct | theta) = 1 / (1 + exp(-D * a * (theta - b)))
 *
 * D = 1.7 puts the logistic metric on the normal-ogive scale, which is the
 * convention used in published SAT technical documentation.
 */

import type { IrtParams } from '../types.ts';

export const D = 1.702;

/** Probability of a correct response. */
export function pCorrect(theta: number, item: IrtParams): number {
  const z = D * item.a * (theta - item.b);
  // Numerically stable logistic.
  return z >= 0 ? 1 / (1 + Math.exp(-z)) : Math.exp(z) / (1 + Math.exp(z));
}

/**
 * Fisher information contributed by an item at a given ability. Item
 * selection maximises this: the most informative item is the one whose
 * outcome is least predictable, which is where a response teaches us most.
 */
export function information(theta: number, item: IrtParams): number {
  const p = pCorrect(theta, item);
  return D * D * item.a * item.a * p * (1 - p);
}

export interface ScoredResponse {
  item: IrtParams;
  correct: boolean;
}

/** Log likelihood of a response vector at a candidate ability. */
export function logLikelihood(theta: number, responses: readonly ScoredResponse[]): number {
  let total = 0;
  for (const { item, correct } of responses) {
    const p = pCorrect(theta, item);
    // Guard the tails so a single extreme item cannot produce -Infinity.
    const clamped = Math.min(Math.max(p, 1e-9), 1 - 1e-9);
    total += correct ? Math.log(clamped) : Math.log(1 - clamped);
  }
  return total;
}

/**
 * Ability estimate. Uses expected a posteriori (EAP) estimation over a
 * standard-normal prior, evaluated on a fixed quadrature grid.
 *
 * EAP is preferred over maximum likelihood here because MLE diverges for
 * perfect and zero scores — a real case in short practice sets. The prior
 * keeps every estimate finite and supplies an honest posterior standard
 * deviation to report as measurement error.
 */
export interface AbilityResult {
  theta: number;
  /** Posterior standard deviation — the standard error of the estimate. */
  se: number;
}

const GRID_MIN = -4;
const GRID_MAX = 4;
const GRID_STEPS = 161; // 0.05 spacing

let quadrature: { nodes: number[]; priorWeights: number[] } | null = null;

function grid(): { nodes: number[]; priorWeights: number[] } {
  if (quadrature) return quadrature;
  const nodes: number[] = [];
  const priorWeights: number[] = [];
  const step = (GRID_MAX - GRID_MIN) / (GRID_STEPS - 1);
  for (let i = 0; i < GRID_STEPS; i += 1) {
    const t = GRID_MIN + i * step;
    nodes.push(t);
    // Standard normal prior N(0, 1).
    priorWeights.push(Math.exp(-0.5 * t * t));
  }
  const total = priorWeights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < priorWeights.length; i += 1) priorWeights[i] /= total;
  quadrature = { nodes, priorWeights };
  return quadrature;
}

export function estimateAbility(
  responses: readonly ScoredResponse[],
  prior: { mean: number; sd: number } = { mean: 0, sd: 1 },
): AbilityResult {
  const { nodes } = grid();
  if (responses.length === 0) return { theta: prior.mean, se: prior.sd };

  const posterior = new Array<number>(nodes.length);
  let maxLog = -Infinity;
  const logs = new Array<number>(nodes.length);

  for (let i = 0; i < nodes.length; i += 1) {
    const t = nodes[i];
    const z = (t - prior.mean) / prior.sd;
    const logPrior = -0.5 * z * z;
    const value = logPrior + logLikelihood(t, responses);
    logs[i] = value;
    if (value > maxLog) maxLog = value;
  }

  // Subtract the max before exponentiating to avoid underflow.
  let norm = 0;
  for (let i = 0; i < nodes.length; i += 1) {
    posterior[i] = Math.exp(logs[i] - maxLog);
    norm += posterior[i];
  }

  let theta = 0;
  for (let i = 0; i < nodes.length; i += 1) {
    posterior[i] /= norm;
    theta += nodes[i] * posterior[i];
  }

  let variance = 0;
  for (let i = 0; i < nodes.length; i += 1) {
    const d = nodes[i] - theta;
    variance += d * d * posterior[i];
  }

  return { theta, se: Math.sqrt(variance) };
}

/**
 * Test information at an ability level, and the standard error it implies.
 * SE = 1 / sqrt(I) is the classical relationship used to publish score bands.
 */
export function testInformation(theta: number, items: readonly IrtParams[]): number {
  let total = 0;
  for (const item of items) total += information(theta, item);
  return total;
}

export function standardError(theta: number, items: readonly IrtParams[]): number {
  const info = testInformation(theta, items);
  return info <= 0 ? Infinity : 1 / Math.sqrt(info);
}

/**
 * Marginal reliability, the IRT analogue of Cronbach's alpha. Reported on the
 * score report so the reliability of every delivered form is visible rather
 * than assumed.
 */
export function marginalReliability(seValues: readonly number[], populationVariance = 1): number {
  if (seValues.length === 0) return 0;
  const meanErrorVariance = seValues.reduce((acc, se) => acc + se * se, 0) / seValues.length;
  return Math.max(0, 1 - meanErrorVariance / populationVariance);
}
