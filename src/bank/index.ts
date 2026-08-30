import type { Grade, Question, Template } from '@/types';
import { makeRng } from '@/lib/rng';
import { BANK_G6 } from './g6';
import { BANK_G7 } from './g7';
import { BANK_G8 } from './g8';
import { BANK_G9 } from './g9';
import { BANK_G6_PLUS } from './g6-plus';
import { BANK_G7_PLUS } from './g7-plus';
import { BANK_G8_PLUS } from './g8-plus';
import { BANK_G9_PLUS } from './g9-plus';
import { BANK_G6_GITA } from './g6-gita';

export const ALL_TEMPLATES: Template[] = [
  ...BANK_G6, ...BANK_G6_PLUS, ...BANK_G6_GITA,
  ...BANK_G7, ...BANK_G7_PLUS,
  ...BANK_G8, ...BANK_G8_PLUS,
  ...BANK_G9, ...BANK_G9_PLUS,
];

export const templatesOfGrade = (g: Grade): Template[] => ALL_TEMPLATES.filter((t) => t.grade === g);
export const templatesOfTopic = (topicId: string): Template[] => ALL_TEMPLATES.filter((t) => t.topicId === topicId);
export const getTemplate = (id: string): Template | undefined => ALL_TEMPLATES.find((t) => t.id === id);

export const tagOf = (templateId: string): string => getTemplate(templateId)?.tag ?? templateId;

/** Điểm mặc định theo loại câu hỏi (thang nội bộ, sẽ được quy về thang 10). */
const DEFAULT_POINTS: Record<Question['kind'], number> = { MC: 1, TF: 2, SHORT: 1.5, ESSAY: 4 };

/** Sinh một câu hỏi cụ thể từ khuôn và hạt giống. */
export function buildQuestion(tpl: Template, seed: number, index: number): Question {
  const r = makeRng(seed * 7919 + index * 104729 + 13);
  const body = tpl.build(r);
  return {
    id: `${tpl.id}#${seed}#${index}`,
    templateId: tpl.id,
    topicId: tpl.topicId,
    grade: tpl.grade,
    level: tpl.level,
    kind: tpl.kind,
    strand: tpl.strand,
    tag: tpl.tag,
    points: body.points ?? DEFAULT_POINTS[tpl.kind],
    stem: body.stem,
    options: body.options,
    answer: body.answer,
    accept: body.accept,
    solution: body.solution,
    thinking: body.thinking,
    pitfall: body.pitfall,
    rubric: body.rubric,
  };
}
