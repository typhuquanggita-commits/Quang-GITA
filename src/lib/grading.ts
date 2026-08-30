import type { AnswerValue, Attempt, Question, QuestionResult } from '@/types';
import { plainMath } from '@/lib/mathText';

/* =====================================================================
   MATHGITA — ENGINE CHẤM ĐIỂM
   Áp dụng nguyên tắc chấm của Bộ GD&ĐT:
   • Trắc nghiệm nhiều lựa chọn: đúng trọn điểm, sai 0 điểm.
   • Trắc nghiệm đúng/sai (4 ý): 1 ý đúng 10%, 2 ý 25%, 3 ý 50%, 4 ý 100%.
   • Trả lời ngắn: so khớp đáp số sau khi chuẩn hoá (chấp nhận nhiều cách viết).
   • Tự luận: chấm theo thang rubric từng bước.
   ===================================================================== */

const TF_SCALE = [0, 0.1, 0.25, 0.5, 1];

/** Chuẩn hoá một đáp số dạng chuỗi để so khớp. */
export function normalizeShort(raw: string): string {
  let s = plainMath(String(raw ?? '')).toLowerCase().trim();
  s = s.replace(/\s+/g, '');
  s = s.replace(/[；;]/g, ',');
  // 3,5 -> 3.5 (dấu phẩy thập phân kiểu Việt Nam), nhưng giữ 1,2 khi là danh sách nghiệm
  s = s.replace(/(\d),(\d)(?![\d,]*[,])/g, (m, a: string, b: string) => (m.length <= 4 ? `${a}.${b}` : m));
  s = s.replace(/^\+/, '');
  s = s.replace(/x=|y=|s=|v=/g, '');
  s = s.replace(/(cm|dm|mm|km|m|độ|°)(2|3|²|³)?$/g, '');
  // Quy phân số về dạng tối giản a/b
  const f = s.match(/^(-?\d+)\/(\d+)$/);
  if (f) {
    const a = Number(f[1]), b = Number(f[2]);
    const g = (x: number, y: number): number => (y === 0 ? Math.abs(x) : g(y, x % y));
    const d = g(a, b) || 1;
    const n = a / d, m = b / d;
    return m === 1 ? String(n) : `${n}/${m}`;
  }
  // Bỏ số 0 vô nghĩa: 3.50 -> 3.5 ; 3.0 -> 3
  if (/^-?\d+\.\d+$/.test(s)) s = String(Number(s));
  return s;
}

/** So khớp một đáp số với đáp án đúng và các dạng viết được chấp nhận. */
export function matchShort(given: string, answer: string, accept?: string[]): boolean {
  const g = normalizeShort(given);
  if (!g) return false;
  const pool = [answer, ...(accept ?? [])].map(normalizeShort);
  if (pool.includes(g)) return true;
  // So khớp tập nghiệm không kể thứ tự: "2,-3" == "-3,2"
  const asSet = (x: string) => x.split(',').filter(Boolean).sort().join(',');
  return pool.some((p) => p.includes(',') && asSet(p) === asSet(g));
}

/** Chấm một câu, trả về phần điểm đạt được theo tỉ lệ 0..1 */
export function scoreOne(q: Question, given: AnswerValue): { correct: boolean; partial: number } {
  if (given === null || given === undefined || given === '') return { correct: false, partial: 0 };

  switch (q.kind) {
    case 'MC': {
      const ok = typeof given === 'number' && given === q.answer;
      return { correct: ok, partial: ok ? 1 : 0 };
    }
    case 'TF': {
      const key = q.answer as boolean[];
      const arr = Array.isArray(given) ? (given as boolean[]) : [];
      let hit = 0;
      key.forEach((k, i) => { if (arr[i] === k) hit++; });
      const partial = TF_SCALE[Math.min(hit, 4)] ?? 0;
      return { correct: hit === key.length, partial };
    }
    case 'SHORT': {
      const ok = matchShort(String(given), String(q.answer), q.accept);
      return { correct: ok, partial: ok ? 1 : 0 };
    }
    case 'ESSAY': {
      // Học sinh tự đối chiếu từng ý theo thang rubric: given = "1,0,1,1"
      const marks = String(given).split(',').map((x) => x === '1');
      const rows = q.rubric ?? [];
      const totalPts = rows.reduce((s, r) => s + r.points, 0) || 1;
      const got = rows.reduce((s, r, i) => s + (marks[i] ? r.points : 0), 0);
      const partial = Math.max(0, Math.min(1, got / totalPts));
      return { correct: partial >= 0.999, partial };
    }
    default:
      return { correct: false, partial: 0 };
  }
}

/** Chấm toàn bộ bài làm. */
export function gradeAll(
  questions: Question[],
  answers: Record<string, AnswerValue>,
  times: Record<string, number>
): { results: QuestionResult[]; earned: number; total: number; score10: number } {
  const results: QuestionResult[] = questions.map((q) => {
    const given = answers[q.id] ?? null;
    const { correct, partial } = scoreOne(q, given);
    return {
      questionId: q.id,
      templateId: q.templateId,
      topicId: q.topicId,
      tag: q.tag,
      level: q.level,
      strand: q.strand,
      kind: q.kind,
      given,
      correct,
      partial,
      earned: Math.round(partial * q.points * 100) / 100,
      points: q.points,
      seconds: Math.round(times[q.id] ?? 0),
    };
  });
  const earned = Math.round(results.reduce((s, r) => s + r.earned, 0) * 100) / 100;
  const total = Math.round(questions.reduce((s, q) => s + q.points, 0) * 100) / 100;
  const score10 = total > 0 ? Math.round((earned / total) * 1000) / 100 : 0;
  return { results, earned, total, score10 };
}

/** Xếp loại theo thang điểm 10 của Bộ GD&ĐT (Thông tư 22). */
export function band(score10: number): Attempt['review']['band'] {
  if (score10 >= 9) return 'XUAT_SAC';
  if (score10 >= 8) return 'GIOI';
  if (score10 >= 6.5) return 'KHA';
  if (score10 >= 5) return 'TB';
  return 'YEU';
}

export const BAND_LABEL: Record<Attempt['review']['band'], string> = {
  XUAT_SAC: 'Xuất sắc',
  GIOI: 'Giỏi',
  KHA: 'Khá',
  TB: 'Trung bình',
  YEU: 'Cần cải thiện',
};

export const BAND_COLOR: Record<Attempt['review']['band'], string> = {
  XUAT_SAC: 'var(--gita-gold-600)',
  GIOI: 'var(--gita-teal-600)',
  KHA: 'var(--gita-navy-800)',
  TB: 'var(--gita-gold-700)',
  YEU: 'var(--gita-red-600)',
};
