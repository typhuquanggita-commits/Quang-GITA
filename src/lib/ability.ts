import { DIFFICULTY_MIX } from '../config';
import type { Difficulty } from '../types';

/**
 * Uoc luong nang luc theo mo hinh Rasch (IRT 1 tham so).
 *
 * Vi sao khong dung "phan tram cau dung": ti le dung chi co nghia khi de bai
 * co cung do kho. Rasch tach do kho cua cau ra khoi nang luc cua nguoi hoc,
 * nen 8/10 cau kho va 8/10 cau de cho hai ket qua khac nhau — dung nhu thuc te.
 *
 *   P(dung | theta, b) = 1 / (1 + exp(-(theta - b)))
 *
 * theta (logit) uoc luong bang Newton-Raphson tren ham hop ly cuc dai,
 * co them mot lop prior nhe de khong phan ky khi nguoi hoc dung/sai tat ca.
 */

/** Anh xa do kho 1..5 sang thang logit. */
export function difficultyToLogit(difficulty: Difficulty | number): number {
  const clamped = Math.min(5, Math.max(1, difficulty));
  return (clamped - 3) * 0.9;
}

export function probabilityCorrect(theta: number, difficultyLogit: number): number {
  return 1 / (1 + Math.exp(-(theta - difficultyLogit)));
}

export interface AbilityObservation {
  difficulty: Difficulty | number;
  correct: boolean;
}

export const NEUTRAL_ABILITY = 0;

/**
 * Uoc luong theta. Tra ve NEUTRAL_ABILITY khi khong co du lieu.
 * `priorWeight` keo ket qua ve 0 khi mau con nho (Bayes rat nhe).
 */
export function estimateAbility(
  observations: readonly AbilityObservation[],
  priorWeight = 0.6,
): number {
  if (observations.length === 0) return NEUTRAL_ABILITY;

  const items = observations.map((o) => ({
    b: difficultyToLogit(o.difficulty),
    x: o.correct ? 1 : 0,
  }));

  let theta = 0;
  for (let iter = 0; iter < 60; iter += 1) {
    let gradient = -priorWeight * theta; // dao ham cua prior N(0, 1/priorWeight)
    let hessian = -priorWeight;

    for (const item of items) {
      const p = probabilityCorrect(theta, item.b);
      gradient += item.x - p;
      hessian -= p * (1 - p);
    }

    if (Math.abs(hessian) < 1e-9) break;
    const step = gradient / hessian;
    theta -= step;
    // Chan trong khoang hop ly de tranh cac gia tri vo nghia su pham.
    theta = Math.min(4, Math.max(-4, theta));
    if (Math.abs(step) < 1e-6) break;
  }

  return theta;
}

/**
 * Sai so chuan cua uoc luong (dung de bao "khoang tin cay" cho diem du bao).
 * Cang nhieu cau, cang gan do kho voi nang luc thi sai so cang nho.
 */
export function abilityStandardError(
  theta: number,
  observations: readonly AbilityObservation[],
  priorWeight = 0.6,
): number {
  let information = priorWeight;
  for (const o of observations) {
    const p = probabilityCorrect(theta, difficultyToLogit(o.difficulty));
    information += p * (1 - p);
  }
  return 1 / Math.sqrt(Math.max(information, 1e-6));
}

/**
 * Ti le dung ky vong tren mot de chuan (phan bo do kho DIFFICULTY_MIX).
 * Day la cau noi giua theta va diem so tren thang 50.
 */
export function expectedAccuracy(theta: number): number {
  let sum = 0;
  let weight = 0;
  for (const [difficulty, share] of Object.entries(DIFFICULTY_MIX)) {
    sum += share * probabilityCorrect(theta, difficultyToLogit(Number(difficulty)));
    weight += share;
  }
  return weight > 0 ? sum / weight : 0;
}

/** Nang luc toi thieu de dat ti le dung mong muon tren de chuan (nghich dao so hoc). */
export function abilityForAccuracy(targetAccuracy: number): number {
  const target = Math.min(0.999, Math.max(0.001, targetAccuracy));
  let lo = -4;
  let hi = 4;
  for (let i = 0; i < 60; i += 1) {
    const mid = (lo + hi) / 2;
    if (expectedAccuracy(mid) < target) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}
