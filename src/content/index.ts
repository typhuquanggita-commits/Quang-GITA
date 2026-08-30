import type { Grade, Strand, Term, Topic } from '@/types';
import { G6_TOPICS } from './g6';
import { G7_TOPICS } from './g7/topics';
import { G8_TOPICS } from './g8/topics';
import { G9_TOPICS } from './g9/topics';
import { EXTRA_TYPES_G6 } from './enrich-g6';
import { EXTRA_TYPES_G7 } from './enrich-g7';
import { EXTRA_TYPES_G8 } from './enrich-g8';
import { EXTRA_TYPES_G9 } from './enrich-g9';
import { EXTRA_SKILLS } from './skills';

/** Dạng bài bổ sung, gộp vào chuyên đề gốc theo mã chuyên đề. */
const EXTRA_TYPES: Record<string, import('@/types').ProblemType[]> = {
  ...EXTRA_TYPES_G6, ...EXTRA_TYPES_G7, ...EXTRA_TYPES_G8, ...EXTRA_TYPES_G9,
};

const LEVEL_RANK = { NB: 0, TH: 1, VD: 2, VDC: 3 } as const;

const withExtras = (t: Topic): Topic => {
  const extra = EXTRA_TYPES[t.id];
  if (!extra?.length) return t;
  return {
    ...t,
    types: [...t.types, ...extra].sort((a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level]),
  };
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-zà-ỹ0-9]/gi, '');

const withSkills = (t: Topic): Topic => {
  const extra = EXTRA_SKILLS[t.id];
  if (!extra?.length) return t;
  const seen = new Set((t.practiceSkills ?? []).map((x) => norm(x.title)));
  const add = extra.filter((x) => !seen.has(norm(x.title)));
  return { ...t, practiceSkills: [...(t.practiceSkills ?? []), ...add] };
};

export const ALL_TOPICS: Topic[] = [...G6_TOPICS, ...G7_TOPICS, ...G8_TOPICS, ...G9_TOPICS].map(withExtras).map(withSkills);

export const topicsOfGrade = (g: Grade): Topic[] =>
  ALL_TOPICS.filter((t) => t.grade === g).sort((a, b) => a.order - b.order);

export const getTopic = (id: string): Topic | undefined => ALL_TOPICS.find((t) => t.id === id);

export const topicName = (id: string): string => getTopic(id)?.name ?? id;

export const STRAND_LABEL: Record<Strand, string> = {
  SO_DAI_SO: 'Số & Đại số',
  HINH_HOC: 'Hình học & Đo lường',
  THONG_KE_XS: 'Thống kê & Xác suất',
  THUC_TIEN: 'Toán thực tiễn',
};

export const TERM_LABEL: Record<Term, string> = { HK1: 'Học kỳ I', HK2: 'Học kỳ II' };

export const GRADES: Grade[] = [6, 7, 8, 9];

export { FORMULAS } from './formulas-merged';
export * from './hsg-all';
export * from './roadmap';
export * from './skills';
