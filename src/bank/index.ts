import type { Grade, Question, Template } from '@/types';
import { makeRng } from '@/lib/rng';
import { BANK_G6 } from './g6';
import { BANK_G7 } from './g7';
import { BANK_G8 } from './g8';
import { BANK_G9 } from './g9';
import { BANK_G6_PLUS } from './g6-plus';
import { BANK_G7_PLUS } from './g7-plus';
import { BANK_G7_DECUONG } from './g7-decuong';
import { BANK_G8_PLUS } from './g8-plus';
import { BANK_G9_PLUS } from './g9-plus';
import { BANK_G6_GITA } from './g6-gita';
import { BANK_G9_HINH } from './g9-hinh';
import { BANK_G7_HINH } from './g7-hinh';
import { BANK_G8_DECUONG } from './g8-decuong';
import { BANK_G8_HINH } from './g8-hinh';
import { BANK_G9_DECUONG } from './g9-decuong';
import { BANK_G6_NB } from './g6-nb';
import { BANK_G7_NB } from './g7-nb';
import { BANK_G8_NB } from './g8-nb';
import { BANK_G9_NB } from './g9-nb';
import { BANK_G6_DECUONG } from './g6-decuong';

export const ALL_TEMPLATES: Template[] = [
  ...BANK_G6, ...BANK_G6_PLUS, ...BANK_G6_GITA, ...BANK_G6_DECUONG, ...BANK_G6_NB,
  ...BANK_G7, ...BANK_G7_PLUS, ...BANK_G7_DECUONG, ...BANK_G7_HINH, ...BANK_G7_NB,
  ...BANK_G8, ...BANK_G8_PLUS, ...BANK_G8_DECUONG, ...BANK_G8_HINH, ...BANK_G8_NB,
  ...BANK_G9, ...BANK_G9_PLUS, ...BANK_G9_HINH, ...BANK_G9_DECUONG, ...BANK_G9_NB,
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
