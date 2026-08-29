/**
 * The generator kit: the shared vocabulary every Math template is written in.
 *
 * Extracted so the per-domain generator files can use it without importing the
 * module that composes them. The cycle worked — function declarations hoist —
 * but a cycle that happens to work is a cycle waiting to stop working the
 * moment one of these becomes a const arrow function.
 */

import type { DifficultyBand, Question } from '../types.ts';

export interface GenContext {
  rng: () => number;
  /** Deterministic index, used to build stable ids. */
  index: number;
}

export type Generator = {
  id: string;
  skill: string;
  domain: Question['domain'];
  band: DifficultyBand;
  irt: { a: number; b: number };
  targetSeconds: number;
  build(ctx: GenContext): Omit<Question, 'id' | 'section' | 'domain' | 'skill' | 'band' | 'irt' | 'targetSeconds'>;
};

/** Random integer in [min, max]. */
export function randInt(rng: () => number, min: number, max: number): number {
  return min + Math.floor(rng() * (max - min + 1));
}

export function pick<T>(rng: () => number, items: readonly T[]): T {
  return items[Math.floor(rng() * items.length)];
}

/** Builds four labelled choices from [key, ...wrong], shuffled deterministically. */
export function makeChoices(
  rng: () => number,
  key: string,
  wrong: readonly string[],
  notes: readonly string[],
): { choices: Question['choices']; answer: string; distractorNotes: Record<string, string> } {
  const entries = [{ text: key, note: null as string | null }, ...wrong.map((text, i) => ({ text, note: notes[i] ?? '' }))];
  // Fisher–Yates on a copy.
  for (let i = entries.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [entries[i], entries[j]] = [entries[j], entries[i]];
  }
  const ids = ['A', 'B', 'C', 'D'];
  const choices = entries.map((entry, i) => ({ id: ids[i], text: entry.text }));
  const answer = ids[entries.findIndex((e) => e.note === null)];
  const distractorNotes: Record<string, string> = {};
  entries.forEach((entry, i) => {
    if (entry.note !== null) distractorNotes[ids[i]] = entry.note;
  });
  return { choices, answer, distractorNotes };
}
