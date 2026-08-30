import type { ExamKind, ExamSpec, Grade, Level, Question, Template, Term, Track } from '@/types';
import { hashSeed, makeRng } from '@/lib/rng';
import { ALL_TEMPLATES, buildQuestion, templatesOfGrade } from '@/bank';
import { topicsOfGrade } from '@/content';

/* =====================================================================
   MATHGITA — SINH ĐỀ THEO MA TRẬN CHUẨN BỘ GD&ĐT
   Mỗi mã đề gắn với một hạt giống cố định: cùng mã đề luôn ra cùng bộ
   câu hỏi, nhưng 100 mã đề khác nhau cho 100 bộ câu hỏi khác nhau.
   ===================================================================== */

export const EXAM_KIND_LABEL: Record<ExamKind, string> = {
  LUYEN_DE: 'Đề luyện thi',
  GIUA_KY: 'Đề cương giữa kỳ',
  CUOI_KY: 'Đề cương cuối kỳ',
  CA_NAM: 'Đề cương cả năm',
  ON_HE: 'Đề cương ôn hè',
  HSG: 'Đề thi học sinh giỏi',
  CHUYEN_DE: 'Luyện theo chuyên đề',
};

export const TRACK_LABEL: Record<Track, string> = {
  CO_BAN: 'Cơ bản',
  NANG_CAO: 'Nâng cao',
  CHUYEN_CLC: 'Chuyên · CLC',
  HSG: 'Học sinh giỏi',
};

/** Ma trận đề chuẩn: 4 mức độ NB–TH–VD–VDC theo tỉ lệ 40–30–20–10. */
const BLUEPRINT_STANDARD = [
  { kind: 'MC' as const, level: 'NB' as Level, count: 6, pointsEach: 1 },
  { kind: 'MC' as const, level: 'TH' as Level, count: 4, pointsEach: 1 },
  { kind: 'TF' as const, level: 'TH' as Level, count: 1, pointsEach: 2 },
  { kind: 'SHORT' as const, level: 'TH' as Level, count: 3, pointsEach: 1.5 },
  { kind: 'SHORT' as const, level: 'VD' as Level, count: 3, pointsEach: 1.5 },
  { kind: 'ESSAY' as const, level: 'VD' as Level, count: 1, pointsEach: 4 },
];

const BLUEPRINT_NANGCAO = [
  { kind: 'MC' as const, level: 'NB' as Level, count: 4, pointsEach: 1 },
  { kind: 'MC' as const, level: 'TH' as Level, count: 4, pointsEach: 1 },
  { kind: 'TF' as const, level: 'TH' as Level, count: 1, pointsEach: 2 },
  { kind: 'SHORT' as const, level: 'TH' as Level, count: 3, pointsEach: 1.5 },
  { kind: 'SHORT' as const, level: 'VD' as Level, count: 4, pointsEach: 1.5 },
  { kind: 'SHORT' as const, level: 'VDC' as Level, count: 2, pointsEach: 2 },
  { kind: 'ESSAY' as const, level: 'VD' as Level, count: 1, pointsEach: 4 },
];

const BLUEPRINT_HSG = [
  { kind: 'SHORT' as const, level: 'VD' as Level, count: 4, pointsEach: 2 },
  { kind: 'SHORT' as const, level: 'VDC' as Level, count: 4, pointsEach: 2.5 },
  { kind: 'ESSAY' as const, level: 'VDC' as Level, count: 2, pointsEach: 5 },
];

const BLUEPRINT_ONHE = [
  { kind: 'MC' as const, level: 'NB' as Level, count: 8, pointsEach: 1 },
  { kind: 'MC' as const, level: 'TH' as Level, count: 4, pointsEach: 1 },
  { kind: 'SHORT' as const, level: 'TH' as Level, count: 4, pointsEach: 1.5 },
  { kind: 'SHORT' as const, level: 'VD' as Level, count: 2, pointsEach: 1.5 },
];

function totalOf(bp: typeof BLUEPRINT_STANDARD): number {
  return bp.reduce((s, r) => s + r.count * r.pointsEach, 0);
}

const pad3 = (n: number) => String(n).padStart(3, '0');

/* ------------------------- BỘ 100 ĐỀ LUYỆN THI ------------------------- */

export function buildExamBank(grade: Grade): ExamSpec[] {
  const topics = topicsOfGrade(grade).map((t) => t.id);
  const out: ExamSpec[] = [];
  for (let i = 1; i <= 100; i++) {
    // 60 đề cơ bản – 30 đề nâng cao – 10 đề chuyên/CLC
    const track: Track = i <= 60 ? 'CO_BAN' : i <= 90 ? 'NANG_CAO' : 'CHUYEN_CLC';
    const bp = track === 'CO_BAN' ? BLUEPRINT_STANDARD : BLUEPRINT_NANGCAO;
    const code = `MG${grade}-LD-${pad3(i)}`;
    out.push({
      id: `ex-${grade}-ld-${i}`,
      code,
      title: `Đề luyện thi số ${i} — Toán ${grade}`,
      grade,
      kind: 'LUYEN_DE',
      track,
      minutes: track === 'CO_BAN' ? 60 : 90,
      totalPoints: totalOf(bp),
      seed: hashSeed(code),
      topicIds: topics,
      blueprint: bp,
      note: `Mức độ ${TRACK_LABEL[track]}. Đề tổng hợp toàn bộ chương trình Toán ${grade}.`,
      premium: i > 3, // 3 đề đầu mở miễn phí cho học sinh ngoài
    });
  }
  return out;
}

/* ------------------- ĐỀ CƯƠNG GIỮA KỲ / CUỐI KỲ / CẢ NĂM / ÔN HÈ ------------------- */

export function buildOutlineExams(grade: Grade): ExamSpec[] {
  const all = topicsOfGrade(grade);
  const byTerm = (t: Term) => all.filter((x) => x.term === t).map((x) => x.id);
  const half = (t: Term) => {
    const list = all.filter((x) => x.term === t);
    return list.slice(0, Math.max(1, Math.ceil(list.length / 2))).map((x) => x.id);
  };
  const mk = (
    idx: number, kind: ExamKind, title: string, topicIds: string[],
    bp: typeof BLUEPRINT_STANDARD, minutes: number, term?: Term, track: Track = 'NANG_CAO'
  ): ExamSpec => {
    const code = `MG${grade}-${kind.slice(0, 2)}-${pad3(idx)}`;
    return {
      id: `ex-${grade}-${kind.toLowerCase()}-${idx}`,
      code, title, grade, kind, term, track, minutes,
      totalPoints: totalOf(bp),
      seed: hashSeed(code),
      topicIds,
      blueprint: bp,
      note: `${EXAM_KIND_LABEL[kind]} — biên soạn theo chuẩn ma trận đề của Bộ GD&ĐT.`,
      premium: true,
    };
  };

  return [
    mk(1, 'GIUA_KY', `Đề cương giữa Học kỳ I — Toán ${grade}`, half('HK1'), BLUEPRINT_STANDARD, 60, 'HK1'),
    mk(2, 'CUOI_KY', `Đề cương cuối Học kỳ I — Toán ${grade}`, byTerm('HK1'), BLUEPRINT_NANGCAO, 90, 'HK1'),
    mk(3, 'GIUA_KY', `Đề cương giữa Học kỳ II — Toán ${grade}`, half('HK2'), BLUEPRINT_STANDARD, 60, 'HK2'),
    mk(4, 'CUOI_KY', `Đề cương cuối Học kỳ II — Toán ${grade}`, byTerm('HK2'), BLUEPRINT_NANGCAO, 90, 'HK2'),
    mk(5, 'CA_NAM', `Đề cương ôn tập cả năm — Toán ${grade}`, all.map((x) => x.id), BLUEPRINT_NANGCAO, 90, undefined, 'CHUYEN_CLC'),
    mk(6, 'ON_HE', `Đề cương ôn hè — chuẩn bị lên lớp ${grade + 1}`, all.map((x) => x.id), BLUEPRINT_ONHE, 60, undefined, 'CO_BAN'),
    mk(7, 'HSG', `Đề thi học sinh giỏi Toán ${grade} — vòng trường`, all.map((x) => x.id), BLUEPRINT_HSG, 120, undefined, 'HSG'),
    mk(8, 'HSG', `Đề thi học sinh giỏi Toán ${grade} — vòng huyện/quận`, all.map((x) => x.id), BLUEPRINT_HSG, 150, undefined, 'HSG'),
  ];
}

/* ------------------------- ĐỀ LUYỆN THEO CHUYÊN ĐỀ ------------------------- */

export function buildTopicExam(topicId: string, grade: Grade, variant = 1): ExamSpec {
  const code = `MG${grade}-CD-${topicId}-${variant}`;
  const bp = [
    { kind: 'MC' as const, level: 'NB' as Level, count: 4, pointsEach: 1 },
    { kind: 'MC' as const, level: 'TH' as Level, count: 3, pointsEach: 1 },
    { kind: 'SHORT' as const, level: 'TH' as Level, count: 3, pointsEach: 1.5 },
    { kind: 'SHORT' as const, level: 'VD' as Level, count: 2, pointsEach: 1.5 },
  ];
  return {
    id: `ex-topic-${topicId}-${variant}`,
    code,
    title: `Luyện tập chuyên đề — bộ ${variant}`,
    grade,
    kind: 'CHUYEN_DE',
    track: 'CO_BAN',
    minutes: 30,
    totalPoints: totalOf(bp),
    seed: hashSeed(code),
    topicIds: [topicId],
    blueprint: bp,
    premium: false,
  };
}

/* ------------------------------- SINH ĐỀ ------------------------------- */

/** Chọn khuôn phù hợp cho một dòng ma trận; nếu thiếu thì nới lỏng điều kiện. */
function pickTemplates(pool: Template[], kind: Question['kind'], level: Level, count: number, r: ReturnType<typeof makeRng>): Template[] {
  const exact = pool.filter((t) => t.kind === kind && t.level === level);
  const sameKind = pool.filter((t) => t.kind === kind);
  const sameLevel = pool.filter((t) => t.level === level);
  const chain = [exact, sameKind, sameLevel, pool].filter((a) => a.length > 0);
  const out: Template[] = [];
  let ci = 0;
  while (out.length < count && ci < chain.length) {
    const shuffled = r.shuffle(chain[ci]);
    for (const t of shuffled) {
      if (out.length >= count) break;
      if (!out.includes(t)) out.push(t);
    }
    ci++;
  }
  // Nếu vẫn thiếu, cho phép lặp lại khuôn (mỗi lần sinh ra một biến thể khác)
  while (out.length < count && chain.length) out.push(r.pick(chain[0]));
  return out.slice(0, count);
}

/** Sinh toàn bộ câu hỏi của một đề. */
export function generateExam(spec: ExamSpec): Question[] {
  const r = makeRng(spec.seed);
  const inTopics = ALL_TEMPLATES.filter((t) => spec.topicIds.includes(t.topicId));
  const pool = inTopics.length ? inTopics : templatesOfGrade(spec.grade);
  const questions: Question[] = [];
  let idx = 0;
  for (const row of spec.blueprint) {
    const tpls = pickTemplates(pool, row.kind, row.level, row.count, r);
    for (const tpl of tpls) {
      const q = buildQuestion(tpl, spec.seed, idx++);
      questions.push({ ...q, points: row.pointsEach });
    }
  }
  return questions;
}

/** Sinh nhanh một bộ câu hỏi luyện tập theo chuyên đề & mức độ. */
export function generateDrill(topicId: string, levels: Level[], count: number, seed = Date.now()): Question[] {
  const r = makeRng(seed);
  const pool = ALL_TEMPLATES.filter((t) => t.topicId === topicId && levels.includes(t.level));
  const fallback = ALL_TEMPLATES.filter((t) => t.topicId === topicId);
  const use = pool.length ? pool : fallback;
  if (!use.length) return [];
  const out: Question[] = [];
  for (let i = 0; i < count; i++) out.push(buildQuestion(r.pick(use), seed, i));
  return out;
}

/* ------------------------------ TRA CỨU ------------------------------ */

const cache = new Map<Grade, ExamSpec[]>();

export function examsOfGrade(grade: Grade): ExamSpec[] {
  if (!cache.has(grade)) cache.set(grade, [...buildOutlineExams(grade), ...buildExamBank(grade)]);
  return cache.get(grade)!;
}

export function findExam(id: string): ExamSpec | undefined {
  for (const g of [6, 7, 8, 9] as Grade[]) {
    const f = examsOfGrade(g).find((e) => e.id === id);
    if (f) return f;
  }
  if (id.startsWith('ex-topic-')) {
    const m = id.match(/^ex-topic-(g(\d)-t\d+)-(\d+)$/);
    if (m) return buildTopicExam(m[1], Number(m[2]) as Grade, Number(m[3]));
  }
  return undefined;
}
