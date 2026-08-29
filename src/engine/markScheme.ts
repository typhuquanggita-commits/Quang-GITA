/**
 * Mark schemes for published papers.
 *
 * ## Why this exists, given that the platform argues against raw score
 *
 * `docs/PSYCHOMETRICS.md` opens by rejecting raw-score conversion, and the
 * reason is sound: under adaptive delivery a student routed to the harder
 * module faces different items, so twenty correct there means something
 * different from twenty correct on the easier one. Any single conversion table
 * applied across both pathways reports a number that does not mean what it
 * appears to mean.
 *
 * A **published paper** is a different object. It is linear — every candidate
 * receives the same items in the same order, with no routing — precisely so it
 * can be printed, distributed, and marked by a person with no computer. On a
 * linear form the objection above does not apply, because there is only one
 * item set and therefore only one relationship between raw score and ability.
 *
 * So the rule this file encodes: **a mark scheme belongs to one specific form
 * and to no other.** It is computed from that form's own items, it is stamped
 * with the form's identifier, and applying it to a different paper is an error
 * the interface should make difficult.
 *
 * ## How the conversion is derived
 *
 * Not by curve-fitting to a table someone else published. The test
 * characteristic curve of a form is the sum of its item response functions:
 *
 *     E[raw | θ] = Σ P(correct | θ, item)
 *
 * This is monotonic in θ, so it inverts. For each attainable raw score the
 * conversion finds the θ at which that score is expected, then applies the
 * same scale transform the adaptive engine uses. The result is consistent with
 * the platform's own scoring by construction rather than by coincidence.
 *
 * Two honest limits, both surfaced on the printed scheme:
 *
 *   • The extremes are not identified. A perfect raw score is consistent with
 *     any ability above the point where the curve flattens, and a zero with
 *     any below. Those rows are reported as bounds, not as points.
 *   • The parameters are author estimates. A conversion is only as good as the
 *     item parameters underneath it, and these are not calibrated.
 */

import type { DifficultyBand, IrtParams, Question, SectionId } from '../types.ts';
import { pCorrect } from './irt.ts';
import { thetaToScaled } from './scoring.ts';

/** Expected number correct on a form at a given ability. */
export function characteristicCurve(theta: number, items: readonly IrtParams[]): number {
  let expected = 0;
  for (const item of items) expected += pCorrect(theta, item);
  return expected;
}

const THETA_MIN = -4;
const THETA_MAX = 4;

/**
 * The ability at which a given raw score is expected.
 *
 * Bisection rather than a closed form: the characteristic curve is a sum of
 * logistics with no analytic inverse, and it is monotonic, so bisection is both
 * correct and fast enough at fifty iterations to be exact to five decimal
 * places.
 */
export function rawToTheta(raw: number, items: readonly IrtParams[]): number {
  const lowest = characteristicCurve(THETA_MIN, items);
  const highest = characteristicCurve(THETA_MAX, items);

  // Outside the attainable range the score does not identify an ability.
  if (raw <= lowest) return THETA_MIN;
  if (raw >= highest) return THETA_MAX;

  let lo = THETA_MIN;
  let hi = THETA_MAX;
  for (let i = 0; i < 50; i += 1) {
    const mid = (lo + hi) / 2;
    if (characteristicCurve(mid, items) < raw) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export interface MarkSchemeRow {
  raw: number;
  theta: number;
  scaled: number;
  /**
   * True where the raw score does not identify an ability — the flat ends of
   * the curve. Reported as a bound rather than as a point.
   */
  bounded: boolean;
}

export interface MarkScheme {
  /** The form this scheme belongs to. Applying it to another paper is an error. */
  formId: string;
  section: SectionId;
  operationalCount: number;
  rows: MarkSchemeRow[];
}

export function markScheme(
  formId: string,
  section: SectionId,
  operational: readonly Question[],
): MarkScheme {
  const params = operational.map((q) => q.irt);
  const lowest = characteristicCurve(THETA_MIN, params);
  const highest = characteristicCurve(THETA_MAX, params);

  const rows: MarkSchemeRow[] = [];
  for (let raw = 0; raw <= operational.length; raw += 1) {
    const bounded = raw <= lowest || raw >= highest;
    const theta = rawToTheta(raw, params);
    rows.push({ raw, theta, scaled: thetaToScaled(theta), bounded });
  }

  return { formId, section, operationalCount: operational.length, rows };
}

/**
 * The total for a pair of section scores.
 *
 * Kept here rather than inlined so a printed scheme and the on-screen report
 * add up the same way. Two places computing a total is two places for them to
 * disagree.
 */
export function totalFromSections(rw: number, math: number): number {
  return rw + math;
}

/** Difficulty mix of a form, for the paper's own specification sheet. */
export function formComposition(items: readonly Question[]): {
  byBand: Record<DifficultyBand, number>;
  byDomain: Array<{ domain: string; count: number }>;
  meanDifficulty: number;
} {
  const byBand: Record<DifficultyBand, number> = { easy: 0, medium: 0, hard: 0 };
  const domains = new Map<string, number>();
  for (const item of items) {
    byBand[item.band] += 1;
    domains.set(item.domain, (domains.get(item.domain) ?? 0) + 1);
  }
  return {
    byBand,
    byDomain: [...domains].map(([domain, count]) => ({ domain, count })).sort((a, b) => b.count - a.count),
    meanDifficulty:
      items.length === 0 ? 0 : items.reduce((acc, q) => acc + q.irt.b, 0) / items.length,
  };
}
