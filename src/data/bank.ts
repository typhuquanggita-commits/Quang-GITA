/**
 * The assembled item bank.
 *
 * Authored items and generated items are indistinguishable to the delivery
 * engine — both carry IRT parameters, a blueprint classification, and a
 * worked explanation — so a form can draw on either.
 */

import type { Question, SectionId } from '../types.ts';
import { RW_BANK_1 } from './bank-rw-1.ts';
import { RW_BANK_2 } from './bank-rw-2.ts';
import { RW_BANK_3 } from './bank-rw-3.ts';
import { RW_BANK_4 } from './bank-rw-4.ts';
import { RW_BANK_5 } from './bank-rw-5.ts';
import { MATH_BANK_1 } from './bank-math-1.ts';
import { MATH_BANK_2 } from './bank-math-2.ts';
import { generateMathItems } from './generators.ts';

const AUTHORED: Question[] = [
  ...RW_BANK_1,
  ...RW_BANK_2,
  ...RW_BANK_3,
  ...RW_BANK_4,
  ...RW_BANK_5,
  ...MATH_BANK_1,
  ...MATH_BANK_2,
];

/**
 * Generated Math items are appended once, at module load, from a fixed seed —
 * so every device sees exactly the same bank and a shared form id refers to
 * the same questions everywhere.
 */
const GENERATED: Question[] = generateMathItems();

export const BANK: Question[] = [...AUTHORED, ...GENERATED];

export const QUESTION_BY_ID = new Map<string, Question>(BANK.map((q) => [q.id, q]));

export function getQuestion(id: string): Question | undefined {
  return QUESTION_BY_ID.get(id);
}

export function bankForSection(section: SectionId): Question[] {
  return BANK.filter((q) => q.section === section);
}

export interface BankStats {
  total: number;
  bySection: Record<SectionId, number>;
  byBand: Record<string, number>;
  byDomain: Record<string, number>;
  sprCount: number;
  authored: number;
  generated: number;
}

export function bankStats(): BankStats {
  const bySection: Record<SectionId, number> = { rw: 0, math: 0 };
  const byBand: Record<string, number> = {};
  const byDomain: Record<string, number> = {};
  let sprCount = 0;

  for (const q of BANK) {
    bySection[q.section] += 1;
    byBand[q.band] = (byBand[q.band] ?? 0) + 1;
    byDomain[q.domain] = (byDomain[q.domain] ?? 0) + 1;
    if (q.format === 'spr') sprCount += 1;
  }

  return {
    total: BANK.length,
    bySection,
    byBand,
    byDomain,
    sprCount,
    authored: AUTHORED.length,
    generated: GENERATED.length,
  };
}
