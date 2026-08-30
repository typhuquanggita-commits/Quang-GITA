import type { FormulaCard, Grade } from '@/types';
import { FORMULAS as BASE } from './formulas';
import { FORMULAS_PLUS } from './formulas-plus';
import { FORMULAS_FULL } from './formulas-full';

const RANK: Record<string, number> = { SO_DAI_SO: 0, HINH_HOC: 1, THONG_KE_XS: 2, THUC_TIEN: 3 };

/** Toàn bộ Cẩm nang công thức điểm 10, xếp theo khối rồi theo mạch kiến thức. */
export const FORMULAS: FormulaCard[] = [...BASE, ...FORMULAS_PLUS, ...FORMULAS_FULL].sort(
  (a, b) => a.grade - b.grade || RANK[a.strand] - RANK[b.strand] || a.topic.localeCompare(b.topic, 'vi')
);

export const formulasOfGrade = (g: Grade): FormulaCard[] => FORMULAS.filter((f) => f.grade === g);
