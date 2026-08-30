/**
 * The expert solution library, composed.
 *
 * Kept separate from `lesson-index.ts` because these answer a different
 * question. A lesson's worked example demonstrates a method at the band where
 * the method is clearest; an expert solution shows the decision the method
 * does not make, at the band where that decision is the item.
 */

import type { SkillId } from '../types.ts';
import { bareRecord, own } from '../lib/record.ts';
import { SOLUTIONS_RW, type ExpertSolution } from './solutions.ts';
import { SOLUTIONS_MATH } from './solutions-math.ts';

export type { ExpertSolution, SolutionStep, WrongTurn } from './solutions.ts';

export const SOLUTIONS: ExpertSolution[] = [...SOLUTIONS_RW, ...SOLUTIONS_MATH];

const BY_SKILL: Record<string, ExpertSolution[]> = bareRecord(
  [...new Set(SOLUTIONS.map((s) => s.skill))].map(
    (skill) => [skill, SOLUTIONS.filter((s) => s.skill === skill)] as const,
  ),
);

/** Prototype-safe: a skill id arriving from a URL must not reach Object.prototype. */
export function solutionsForSkill(skill: SkillId | undefined): ExpertSolution[] {
  return own(BY_SKILL, skill) ?? [];
}

export function solutionById(id: string | undefined): ExpertSolution | undefined {
  return SOLUTIONS.find((s) => s.id === id);
}

export interface SolutionStats {
  total: number;
  skills: number;
  hard: number;
  /** Total distinct wrong turns documented. */
  wrongTurns: number;
  /** Mean expert time, in seconds. */
  meanSeconds: number;
}

export function solutionStats(): SolutionStats {
  return {
    total: SOLUTIONS.length,
    skills: new Set(SOLUTIONS.map((s) => s.skill)).size,
    hard: SOLUTIONS.filter((s) => s.band === 'hard').length,
    wrongTurns: SOLUTIONS.length,
    meanSeconds: Math.round(SOLUTIONS.reduce((n, s) => n + s.seconds, 0) / SOLUTIONS.length),
  };
}
