/**
 * Spaced repetition (SM-2 with the usual practical modifications).
 *
 * Anything the learner got wrong becomes a card. The scheduler decides when
 * it comes back, so review effort concentrates on what is actually fading
 * rather than on whatever is most recent.
 */

import type { SrsCard } from '../types.ts';

/** 0 = total blackout … 5 = perfect recall. The UI exposes four of these. */
export type Grade = 0 | 1 | 2 | 3 | 4 | 5;

export const GRADE_AGAIN: Grade = 1;
export const GRADE_HARD: Grade = 3;
export const GRADE_GOOD: Grade = 4;
export const GRADE_EASY: Grade = 5;

const DAY_MS = 86400000;
const MIN_EASINESS = 1.3;
const MAX_EASINESS = 3.0;

export function newCard(ref: string, now = Date.now()): SrsCard {
  return {
    id: ref,
    ref,
    easiness: 2.5,
    intervalDays: 0,
    repetitions: 0,
    dueAt: now,
    lapses: 0,
    lastGrade: null,
  };
}

/**
 * Applies a grade and returns the rescheduled card.
 *
 * Deviations from textbook SM-2, both standard in modern implementations:
 * a lapse drops the interval rather than resetting it to a single day, which
 * avoids re-teaching material the learner mostly knows; and intervals carry a
 * small deterministic spread so cards learned together do not all fall due on
 * the same day months later.
 */
export function review(card: SrsCard, grade: Grade, now = Date.now()): SrsCard {
  const next: SrsCard = { ...card, lastGrade: grade };

  if (grade < 3) {
    next.repetitions = 0;
    next.lapses += 1;
    // Retain a fraction of the previous interval instead of dropping to zero.
    next.intervalDays = Math.max(1, Math.round(card.intervalDays * 0.35));
    next.easiness = clampEasiness(card.easiness - 0.2);
  } else {
    next.repetitions = card.repetitions + 1;
    if (next.repetitions === 1) next.intervalDays = 1;
    else if (next.repetitions === 2) next.intervalDays = 6;
    else next.intervalDays = Math.round(card.intervalDays * card.easiness);

    // SM-2 easiness update.
    const delta = 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02);
    next.easiness = clampEasiness(card.easiness + delta);
  }

  // Interval fuzz of ±5%, derived from the card id so it is stable.
  const spread = 1 + ((hash(card.id) % 100) / 1000 - 0.05);
  const days = Math.max(1, next.intervalDays * spread);
  next.dueAt = now + days * DAY_MS;
  next.intervalDays = Math.max(1, Math.round(days));

  return next;
}

function clampEasiness(value: number): number {
  return Math.min(MAX_EASINESS, Math.max(MIN_EASINESS, value));
}

function hash(text: string): number {
  let h = 5381;
  for (let i = 0; i < text.length; i += 1) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
  return h;
}

export function dueCards(cards: Record<string, SrsCard>, now = Date.now()): SrsCard[] {
  return Object.values(cards)
    .filter((card) => card.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt);
}

export function upcomingCards(cards: Record<string, SrsCard>, withinDays = 7, now = Date.now()): SrsCard[] {
  const horizon = now + withinDays * DAY_MS;
  return Object.values(cards)
    .filter((card) => card.dueAt > now && card.dueAt <= horizon)
    .sort((a, b) => a.dueAt - b.dueAt);
}

/** A card is treated as learned once it survives three good reviews. */
export function isMastered(card: SrsCard): boolean {
  return card.repetitions >= 3 && card.intervalDays >= 21;
}

/** Forecast of how many cards fall due on each of the next `days` days. */
export function reviewForecast(cards: Record<string, SrsCard>, days = 14, now = Date.now()): number[] {
  const out = new Array<number>(days).fill(0);
  for (const card of Object.values(cards)) {
    const offset = Math.floor((card.dueAt - now) / DAY_MS);
    if (offset >= 0 && offset < days) out[offset] += 1;
    else if (offset < 0) out[0] += 1;
  }
  return out;
}
