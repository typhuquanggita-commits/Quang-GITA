import type { SrsCard } from '../types';

/**
 * On tap ngat quang — bien the SM-2 dieu chinh cho luyen thi ngan han.
 *
 * Khac biet so voi SM-2 goc:
 *  - Buoc dau ngan hon (1 / 3 / 7 ngay) vi ky thi chi cach vai thang.
 *  - Co tran khoang cach (`maxIntervalDays`) de khong cau nao "bien mat"
 *    truoc ngay thi.
 *  - Sai lam giam khoang cach thay vi dat lai ve 0 hoan toan, tranh viec
 *    nguoi hoc phai lam lai tu dau mot the da gan thuoc.
 */

export type Grade = 0 | 1 | 2 | 3;

export const GRADE_LABEL: Record<Grade, string> = {
  0: 'Quen han',
  1: 'Kho',
  2: 'On',
  3: 'De',
};

export const DEFAULT_EASE = 2.5;
const MIN_EASE = 1.3;
const MAX_EASE = 3.2;
export const DAY_MS = 86400000;

export function createCard(
  questionId: string,
  reason: SrsCard['reason'],
  now: number = Date.now(),
): SrsCard {
  return {
    questionId,
    ease: DEFAULT_EASE,
    intervalDays: 0,
    due: now,
    reps: 0,
    lapses: 0,
    reason,
  };
}

export interface ScheduleOptions {
  now?: number;
  /** Khong de khoang cach vuot qua so ngay con lai truoc ky thi. */
  maxIntervalDays?: number;
}

export function schedule(card: SrsCard, grade: Grade, options: ScheduleOptions = {}): SrsCard {
  const now = options.now ?? Date.now();
  const cap = Math.max(1, options.maxIntervalDays ?? 120);

  let { ease, intervalDays, reps, lapses } = card;

  if (grade === 0) {
    lapses += 1;
    reps = 0;
    ease = clampEase(ease - 0.2);
    intervalDays = 0; // hoc lai trong phien nay
  } else if (grade === 1) {
    lapses += 1;
    reps = Math.max(0, reps - 1);
    ease = clampEase(ease - 0.15);
    intervalDays = Math.max(1, Math.round(intervalDays * 0.5));
  } else {
    reps += 1;
    if (grade === 3) ease = clampEase(ease + 0.1);
    if (reps === 1) intervalDays = 1;
    else if (reps === 2) intervalDays = 3;
    else if (reps === 3) intervalDays = 7;
    else intervalDays = Math.round(intervalDays * ease);
  }

  intervalDays = Math.min(intervalDays, cap);

  return {
    ...card,
    ease,
    intervalDays,
    reps,
    lapses,
    lastReviewed: now,
    // Grade 0 → den han ngay (hoc lai sau 10 phut).
    due: intervalDays === 0 ? now + 10 * 60_000 : now + intervalDays * DAY_MS,
  };
}

function clampEase(value: number): number {
  return Math.min(MAX_EASE, Math.max(MIN_EASE, Number(value.toFixed(2))));
}

/** Cac the den han, sap xep: qua han lau nhat truoc, roi den the hay quen. */
export function dueCards(cards: readonly SrsCard[], now: number = Date.now()): SrsCard[] {
  return cards
    .filter((c) => c.due <= now)
    .sort((a, b) => a.due - b.due || b.lapses - a.lapses);
}

/** So the se den han trong `days` ngay toi — dung ve bieu do tai on tap. */
export function forecast(cards: readonly SrsCard[], days: number, now: number = Date.now()): number[] {
  const buckets = new Array<number>(days).fill(0);
  for (const card of cards) {
    const offset = Math.floor((card.due - now) / DAY_MS);
    const index = Math.min(days - 1, Math.max(0, offset));
    buckets[index] = (buckets[index] ?? 0) + 1;
  }
  return buckets;
}
