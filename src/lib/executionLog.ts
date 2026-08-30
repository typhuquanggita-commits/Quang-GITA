import { TOTAL_QUESTIONS } from '../config';
import { ERROR_CLASSES } from '../data/perfect';
import type { ExecutionError, PersistedState, SectionId } from '../types';
import { cleanSheetProbability, maxErrorRateFor, oneErrorIn } from './perfect';

/**
 * SO LOI THUC THI
 *
 * Giao thuc diem tuyet doi yeu cau nguoi hoc lap mot cuon so RIENG cho loi
 * thuc thi, tach hoan toan khoi so tay loi sai kien thuc. Tep nay bien yeu
 * cau do thanh mot chi so do duoc.
 *
 * Vi sao phai tach hai loai loi: chung can hai cach chua khac han nhau. Lo
 * hong kien thuc chua bang cach hoc lai chuyen de; loi thuc thi chua bang mot
 * thao tac vat ly trong phong thi, nhu gach chan tu phu dinh hay doc lai dap
 * an truoc khi sang cau. Gop chung mot cuon so thi ca hai chi so deu mat y
 * nghia, va nguoi hoc se do them gio vao dung cho khong phai diem nghen.
 */

/** So cau tuong duong mot bo muoi de — don vi do cua KPI trong giao thuc. */
export const PAPERS_FOR_KPI = 10;
export const QUESTIONS_FOR_KPI = TOTAL_QUESTIONS * PAPERS_FOR_KPI;

export interface ErrorClassCount {
  classId: string;
  name: string;
  count: number;
  share: number;
}

export interface ExecutionStats {
  /** So loi da ghi trong cua so dang xet. */
  total: number;
  /** So cau lam ban tinh tren cua so do. */
  questions: number;
  /** Ti le sai bat can quan sat duoc, hoac null khi chua du du lieu. */
  rate: number | null;
  /** Cu bao nhieu cau moi sai mot cau. */
  oneErrorPer: number | null;
  /** Xac suat lam dung ca bai voi ti le nay. */
  chance: number | null;
  /** Ti le toi da cho phep de giu 50% co hoi dat diem tuyet doi. */
  budget: number;
  /** So loi toi da cho phep tren mot bo muoi de. */
  budgetPerTenPapers: number;
  /** Dang trong nguong hay da vuot. */
  withinBudget: boolean | null;
  byClass: readonly ErrorClassCount[];
  bySection: Readonly<Record<SectionId, number>>;
  /** Nhom loi chiem nhieu nhat — cho can dat quy tac chong o tuan sau. */
  dominant: ErrorClassCount | null;
}

/** Cac loi trong khoang `days` ngay gan nhat. */
export function recentErrors(
  errors: readonly ExecutionError[],
  days = 28,
  now: number = Date.now(),
): ExecutionError[] {
  const from = now - days * 86_400_000;
  return errors.filter((e) => e.at >= from);
}

/**
 * Thong ke so loi thuc thi.
 *
 * `questions` la so cau nguoi hoc da lam trong cung cua so thoi gian; khong
 * co no thi so loi tuyet doi khong noi len dieu gi — sai 5 loi tren 200 cau
 * khac han sai 5 loi tren 1500 cau.
 */
export function executionStats(
  errors: readonly ExecutionError[],
  questions: number,
  minimumQuestions = 150,
): ExecutionStats {
  const total = errors.length;
  const budget = maxErrorRateFor(0.5);

  const counts = new Map<string, number>();
  for (const error of errors) counts.set(error.classId, (counts.get(error.classId) ?? 0) + 1);

  const byClass: ErrorClassCount[] = ERROR_CLASSES.map((cls) => {
    const count = counts.get(cls.id) ?? 0;
    return { classId: cls.id, name: cls.name, count, share: total > 0 ? count / total : 0 };
  }).sort((a, b) => b.count - a.count);

  const bySection = { quantitative: 0, qualitative: 0, science: 0 } as Record<SectionId, number>;
  for (const error of errors) bySection[error.section] += 1;

  // Chua du du lieu thi tra ve null thay vi mot con so bia: mot ti le tinh
  // tren vai chuc cau se dao dong qua manh de dua ra ket luan nao.
  const enough = questions >= minimumQuestions;
  const rate = enough ? total / questions : null;
  const dominant = byClass[0] && byClass[0].count > 0 ? byClass[0] : null;

  return {
    total,
    questions,
    rate,
    oneErrorPer: rate !== null && rate > 0 ? oneErrorIn(rate) : null,
    chance: rate !== null ? cleanSheetProbability(rate) : null,
    budget,
    budgetPerTenPapers: Math.floor(budget * QUESTIONS_FOR_KPI),
    withinBudget: rate === null ? null : rate <= budget,
    byClass,
    bySection,
    ...(dominant ? { dominant } : { dominant: null }),
  };
}

/**
 * So cau nguoi hoc da lam trong `days` ngay gan nhat.
 *
 * Lay tu nhat ky theo ngay chu khong tu so luot lam phieu, vi nhat ky ngay la
 * noi duy nhat ghi day du moi cau da tra loi, ke ca cau trong bai thi thu.
 */
export function questionsAnswered(
  state: PersistedState,
  days = 28,
  now: Date = new Date(),
): number {
  const from = now.getTime() - days * 86_400_000;
  let total = 0;
  for (const log of Object.values(state.days)) {
    const at = new Date(`${log.date}T00:00:00`).getTime();
    if (Number.isFinite(at) && at >= from) total += log.questions;
  }
  return total;
}

/** Thong ke cho cua so 28 ngay gan nhat, lay thang tu trang thai nguoi hoc. */
export function executionStatsOf(
  state: PersistedState,
  days = 28,
  now: Date = new Date(),
): ExecutionStats {
  return executionStats(
    recentErrors(state.executionErrors, days, now.getTime()),
    questionsAnswered(state, days, now),
  );
}
