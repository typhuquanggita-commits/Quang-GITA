import type { StrandId, TrackId } from '@/types';
import { Rng, hashSeed } from '@/lib/rng';
import { GENERATORS, generateItem, type GenItem, type ItemGenerator } from './generators';
import { TOPICS } from './topics';

/**
 * BỘ ĐỀ LUYỆN THI — 100 ĐỀ MỖI KHỐI, TỪ LỚP 6 ĐẾN LỚP 12
 *
 * Vì sao sinh tất định thay vì viết tay từng đề: 700 đề viết tay ở mức chất
 * lượng của kho Đề mẫu (mỗi câu có lời giải từng bước, barem tới 0,25 điểm và
 * bảng phân tích) là khối lượng của nhiều năm biên soạn. Cách làm ở đây là
 * dựng đề từ chính kho bộ sinh đề đã được kiểm chứng: mỗi đề có một hạt giống
 * riêng, nên nội dung ổn định qua mọi lần mở, ai mở cùng mã đề cũng thấy cùng
 * một đề, và mỗi câu đều có sẵn lời giải từng bước.
 *
 * Ranh giới cần nói rõ: đây là ĐỀ LUYỆN TẬP theo đúng cấu trúc và ma trận, KHÔNG
 * phải đề thi thật và cũng không thay thế được 10 đề mẫu biên soạn tay trong
 * kho Đề thi thử — những đề đó có thêm barem chi tiết và bảng phân tích cho
 * từng câu, thứ mà đề sinh tự động không có.
 */

export type BankSet = 'giua-ky-1' | 'cuoi-ky-1' | 'giua-ky-2' | 'cuoi-ky-2' | 'tong-on';

export const BANK_SET_LABEL: Record<BankSet, { label: string; short: string; color: string }> = {
  'giua-ky-1': { label: 'Ôn giữa học kỳ I', short: 'Giữa kỳ I', color: '#0d9488' },
  'cuoi-ky-1': { label: 'Ôn cuối học kỳ I', short: 'Cuối kỳ I', color: '#1B4F9C' },
  'giua-ky-2': { label: 'Ôn giữa học kỳ II', short: 'Giữa kỳ II', color: '#7c3aed' },
  'cuoi-ky-2': { label: 'Ôn cuối học kỳ II', short: 'Cuối kỳ II', color: '#E01B24' },
  'tong-on': { label: 'Tổng ôn cả năm', short: 'Tổng ôn', color: '#b45309' },
};

export type BankGrade = 6 | 7 | 8 | 9 | 10 | 11 | 12;
export const BANK_GRADES: BankGrade[] = [6, 7, 8, 9, 10, 11, 12];

/** Mỗi khối 100 đề, chia đều cho năm đợt ôn. */
const PER_GRADE = 100;
const SETS: BankSet[] = ['giua-ky-1', 'cuoi-ky-1', 'giua-ky-2', 'cuoi-ky-2', 'tong-on'];

export interface BankExamMeta {
  id: string;
  code: string;
  grade: BankGrade;
  /** Số thứ tự trong khối, từ 1 đến 100. */
  index: number;
  set: BankSet;
  title: string;
  minutes: number;
  totalPoints: number;
  /** Định dạng: THPT dùng ba phần như đề tốt nghiệp, THCS dùng trắc nghiệm + tự luận. */
  format: 'ba-phan' | 'tn-tu-luan';
  level: 1 | 2 | 3 | 4 | 5;
  seed: number;
}

/* ---------------- Kho bộ sinh đề theo khối ---------------- */

/** Khối lớp của một chuyên đề; chuyên đề THCS không ghi khối thì coi là lớp 9. */
const gradeOfTopic = (topicId: string): number => {
  const t = TOPICS.find((x) => x.id === topicId);
  if (!t) return 9;
  if (t.grade) return t.grade;
  return 9;
};

const TRACK_OF_GRADE = (g: BankGrade): TrackId => (g <= 9 ? 'chinh-khoa' : 'chinh-khoa');

/** Bộ sinh đề dùng được cho một khối lớp. */
export function generatorsOfGrade(grade: BankGrade): ItemGenerator[] {
  const track = TRACK_OF_GRADE(grade);
  const exact = GENERATORS.filter(
    (g) => g.tracks.includes(track) && gradeOfTopic(g.topicId) === grade,
  );
  if (exact.length >= 6) return exact;
  /* Khối chưa đủ bộ sinh đề riêng thì mượn thêm khối liền trước, vẫn đúng luồng. */
  const near = GENERATORS.filter(
    (g) => g.tracks.includes(track) && Math.abs(gradeOfTopic(g.topicId) - grade) <= 1,
  );
  return near.length >= 6 ? near : GENERATORS.filter((g) => g.tracks.includes(track));
}

/* ---------------- Danh mục 700 đề ---------------- */

const pad = (n: number, w: number) => String(n).padStart(w, '0');

function buildBank(): BankExamMeta[] {
  const out: BankExamMeta[] = [];
  for (const grade of BANK_GRADES) {
    const format: BankExamMeta['format'] = grade >= 10 ? 'ba-phan' : 'tn-tu-luan';
    for (let i = 1; i <= PER_GRADE; i++) {
      const set = SETS[Math.floor((i - 1) / (PER_GRADE / SETS.length))];
      /* Độ khó tăng dần trong mỗi đợt: 20 đề chia thành 5 mức. */
      const inSet = ((i - 1) % (PER_GRADE / SETS.length)) + 1;
      const level = (Math.min(5, Math.max(1, Math.ceil(inSet / 4))) as 1 | 2 | 3 | 4 | 5);
      const id = `BD-${grade}-${pad(i, 3)}`;
      out.push({
        id,
        code: `M365-BĐ-${grade}-${pad(i, 3)}`,
        grade,
        index: i,
        set,
        title: `Đề luyện số ${i} — Toán ${grade}`,
        minutes: 90,
        totalPoints: 10,
        format,
        level,
        seed: hashSeed(`bank:${grade}:${i}`),
      });
    }
  }
  return out;
}

export const EXAM_BANK: BankExamMeta[] = buildBank();
export const bankExamById = (id: string) => EXAM_BANK.find((x) => x.id === id);
export const bankByGrade = (grade: BankGrade) => EXAM_BANK.filter((x) => x.grade === grade);

/* ---------------- Dựng nội dung một đề ---------------- */

export type BankItemFormat = 'trac-nghiem' | 'dung-sai' | 'tra-loi-ngan' | 'tu-luan';

export interface BankClaim {
  text: string;
  value: boolean;
  why: string;
}

export interface BankItem {
  id: string;
  label: string;
  format: BankItemFormat;
  points: number;
  topicId: string;
  strand: StrandId;
  skill: string;
  statement: string;
  /** Trắc nghiệm. */
  choices?: string[];
  correctIndex?: number;
  /** Đúng/sai — bốn mệnh đề con. */
  claims?: BankClaim[];
  /** Đáp án viết gọn, dùng cho trả lời ngắn và tự luận. */
  answer: string;
  solution: string[];
}

export interface BankPart {
  label: string;
  points: number;
  note: string;
  items: BankItem[];
}

export interface BankExam extends BankExamMeta {
  parts: BankPart[];
}

/** Lấy n câu khác đề nhau từ kho bộ sinh đề của khối. */
function pickItems(pool: ItemGenerator[], n: number, r: Rng, used: Set<string>): GenItem[] {
  const out: GenItem[] = [];
  let guard = 0;
  while (out.length < n && guard < n * 40) {
    guard += 1;
    const gen = pool[r.int(0, pool.length - 1)];
    const it = generateItem(gen, r);
    if (used.has(it.prompt)) continue;
    used.add(it.prompt);
    out.push(it);
  }
  /* Chốt chặn: nếu không gian tham số cạn thì chấp nhận lặp để đề vẫn đủ câu. */
  while (out.length < n && pool.length) {
    const gen = pool[r.int(0, pool.length - 1)];
    out.push(generateItem(gen, r));
  }
  return out;
}

const claimsFrom = (it: GenItem): BankClaim[] => {
  const correct = it.choices[it.correct];
  return it.choices.map((c) => ({
    text: `Kết quả của câu hỏi trên là ${c}.`,
    value: c === correct,
    why:
      c === correct
        ? `Đúng. ${it.steps[it.steps.length - 1] ?? `Đáp số là ${correct}.`}`
        : `Sai. Đáp số đúng là ${correct}; giá trị ${c} là một phương án nhiễu điển hình của dạng này.`,
  }));
};

export function buildBankExam(meta: BankExamMeta): BankExam {
  const r = new Rng(meta.seed);
  const pool = generatorsOfGrade(meta.grade);
  const used = new Set<string>();

  const toItem = (
    it: GenItem,
    label: string,
    format: BankItemFormat,
    points: number,
    idx: number,
  ): BankItem => ({
    id: `${meta.id}-${idx}`,
    label,
    format,
    points,
    topicId: it.topicId,
    strand: it.strand,
    skill: it.skill,
    statement: it.prompt,
    ...(format === 'trac-nghiem' ? { choices: it.choices, correctIndex: it.correct } : {}),
    ...(format === 'dung-sai' ? { claims: claimsFrom(it) } : {}),
    answer: it.choices[it.correct],
    solution: it.steps,
  });

  let n = 0;

  if (meta.format === 'ba-phan') {
    /* Ba phần đúng cấu trúc đề tốt nghiệp THPT: 3,0 — 4,0 — 3,0. */
    const p1 = pickItems(pool, 12, r, used).map((it, i) =>
      toItem(it, `Phần I · Câu ${i + 1}`, 'trac-nghiem', 0.25, n++),
    );
    const p2 = pickItems(pool, 4, r, used).map((it, i) =>
      toItem(it, `Phần II · Câu ${i + 1}`, 'dung-sai', 1, n++),
    );
    const p3 = pickItems(pool, 6, r, used).map((it, i) =>
      toItem(it, `Phần III · Câu ${i + 1}`, 'tra-loi-ngan', 0.5, n++),
    );
    return {
      ...meta,
      parts: [
        {
          label: 'Phần I · Trắc nghiệm nhiều lựa chọn',
          points: 3,
          note: '12 câu, mỗi câu 0,25 điểm. Chọn một phương án đúng.',
          items: p1,
        },
        {
          label: 'Phần II · Trắc nghiệm đúng/sai',
          points: 4,
          note: '4 câu, mỗi câu 4 mệnh đề. Điểm luỹ tiến: đúng 1 ý 0,1 — 2 ý 0,25 — 3 ý 0,5 — 4 ý 1,0.',
          items: p2,
        },
        {
          label: 'Phần III · Trả lời ngắn',
          points: 3,
          note: '6 câu, mỗi câu 0,5 điểm. Không có phương án để loại trừ, bắt buộc kiểm tra chéo.',
          items: p3,
        },
      ],
    };
  }

  /* THCS: trắc nghiệm 3,0 điểm và tự luận 7,0 điểm. */
  const p1 = pickItems(pool, 12, r, used).map((it, i) =>
    toItem(it, `Phần I · Câu ${i + 1}`, 'trac-nghiem', 0.25, n++),
  );
  const p2 = pickItems(pool, 7, r, used).map((it, i) =>
    toItem(it, `Phần II · Bài ${i + 1}`, 'tu-luan', 1, n++),
  );
  return {
    ...meta,
    parts: [
      {
        label: 'Phần I · Trắc nghiệm',
        points: 3,
        note: '12 câu, mỗi câu 0,25 điểm.',
        items: p1,
      },
      {
        label: 'Phần II · Tự luận',
        points: 7,
        note: '7 bài, mỗi bài 1,0 điểm. Trình bày lời giải đầy đủ; lời giải mẫu hiện ra sau khi nộp bài.',
        items: p2,
      },
    ],
  };
}

/** Chấm một bài làm: khoá là mã câu, giá trị là lựa chọn hoặc chuỗi trả lời. */
export function gradeBankExam(
  exam: BankExam,
  answers: Record<string, string>,
): { earned: number; total: number; perItem: Record<string, number> } {
  const perItem: Record<string, number> = {};
  let earned = 0;
  for (const part of exam.parts) {
    for (const it of part.items) {
      let got = 0;
      if (it.format === 'trac-nghiem') {
        got = answers[it.id] !== undefined && Number(answers[it.id]) === it.correctIndex ? it.points : 0;
      } else if (it.format === 'dung-sai' && it.claims) {
        /* Barem luỹ tiến của đề tốt nghiệp: 0,1 — 0,25 — 0,5 — 1,0. */
        const raw = answers[it.id] ?? '';
        const marks = raw.split('');
        const right = it.claims.filter((c, i) => (marks[i] === 'd') === c.value && marks[i]).length;
        got = [0, 0.1, 0.25, 0.5, 1][Math.min(4, right)];
      } else {
        const given = (answers[it.id] ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
        const want = it.answer.trim().toLowerCase().replace(/\s+/g, ' ');
        got = given && given === want ? it.points : 0;
      }
      perItem[it.id] = got;
      earned += got;
    }
  }
  return { earned: Math.round(earned * 100) / 100, total: exam.totalPoints, perItem };
}

export const bankStats = () => ({
  total: EXAM_BANK.length,
  perGrade: PER_GRADE,
  grades: BANK_GRADES,
  sets: SETS.length,
});
