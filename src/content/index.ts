import type { Grade, Strand, Term, Topic } from '@/types';
import { G6_TOPICS } from './g6';
import { G7_TOPICS } from './g7/topics';
import { G8_TOPICS } from './g8/topics';
import { G9_TOPICS } from './g9/topics';
import { EXTRA_TYPES_G6 } from './enrich-g6';
import { EXTRA_TYPES_G7 } from './enrich-g7';
import { EXTRA_TYPES_G8 } from './enrich-g8';
import { EXTRA_TYPES_G9 } from './enrich-g9';
import { EXTRA_TYPES_MONG } from './enrich-mong';
import { EXTRA_SKILLS } from './skills';
import { EXTRA_DECODE } from './decode-plus';
import { EXTRA_THEORY } from './theory-plus';

/** Dạng bài bổ sung, gộp vào chuyên đề gốc theo mã chuyên đề. */
/** Gộp nhiều nguồn dạng bài theo mã chuyên đề — **nối mảng** chứ không ghi đè,
 *  vì cùng một chuyên đề có thể được bổ sung từ nhiều file khác nhau. */
const mergeTypes = (
  ...sources: Record<string, import('@/types').ProblemType[]>[]
): Record<string, import('@/types').ProblemType[]> => {
  const out: Record<string, import('@/types').ProblemType[]> = {};
  for (const src of sources) {
    for (const [key, list] of Object.entries(src)) {
      out[key] = [...(out[key] ?? []), ...list];
    }
  }
  return out;
};

const EXTRA_TYPES = mergeTypes(
  EXTRA_TYPES_G6, EXTRA_TYPES_G7, EXTRA_TYPES_G8, EXTRA_TYPES_G9, EXTRA_TYPES_MONG,
);

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

/** Quy tắc đọc vị bổ sung, gộp theo mã chuyên đề và khử trùng theo dấu hiệu. */
const withDecode = (t: Topic): Topic => {
  const extra = EXTRA_DECODE[t.id];
  if (!extra?.length) return t;
  const seen = new Set(t.decode.map((d) => norm(d.signal)));
  const add = extra.filter((d) => !seen.has(norm(d.signal)));
  return { ...t, decode: [...t.decode, ...add] };
};

/** Khối lý thuyết bổ sung, gộp theo mã chuyên đề và khử trùng theo tiêu đề. */
const withTheory = (t: Topic): Topic => {
  const extra = EXTRA_THEORY[t.id];
  if (!extra?.length) return t;
  const seen = new Set(t.theory.map((b) => norm(b.heading)));
  const add = extra.filter((b) => !seen.has(norm(b.heading)));
  return { ...t, theory: [...t.theory, ...add] };
};

export const ALL_TOPICS: Topic[] = [...G6_TOPICS, ...G7_TOPICS, ...G8_TOPICS, ...G9_TOPICS]
  .map(withExtras).map(withSkills).map(withDecode).map(withTheory);

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
export * from './lessons';
