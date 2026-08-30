import { SECTION_BY_ID, SECTIONS } from '../config';
import { findQuestion, questionsOf } from '../data/questions';
import { TOPIC_BY_ID } from '../data/topics';
import type {
  Attempt,
  AttemptMode,
  Question,
  Section3Choice,
  SectionId,
  SectionRun,
} from '../types';
import { difficultyToLogit, probabilityCorrect } from './ability';
import { hashSeed, mulberry32, shuffle } from './rng';
import { subjectsOf } from './section3';

export interface BuildAttemptOptions {
  mode: AttemptMode;
  label: string;
  section3: Section3Choice;
  /** Cac phan can lam. Mac dinh: ca ba. */
  sections?: readonly SectionId[];
  /** Gioi han so cau moi phan (che do luyen tap). */
  questionsPerSection?: number;
  /** Chi lay cac chu de nay. */
  topicIds?: readonly string[];
  /** Chi lay cac cau trong danh sach nay (che do on tap so tay loi sai). */
  questionIds?: readonly string[];
  /** Do thanh thao hien tai, dung cho che do thich ung. */
  masteryByTopic?: Record<string, number>;
  /** Uu tien cau chua tung gap. */
  seen?: Record<string, number>;
  strictMode?: boolean;
  seed?: string;
}

/**
 * Dung mot bai lam.
 *
 * Nguyen tac chon cau: bam sat ti trong chu de trong de that, tra deu do kho
 * theo phan bo cua de chuan, va uu tien cau chua gap. Nho vay mot de mo phong
 * 30 cau van "giong de that" ve mat cau truc chu khong chi ve so luong.
 */
export function buildAttempt(options: BuildAttemptOptions): Attempt {
  const seedText = options.seed ?? `${Date.now()}:${options.label}`;
  const rand = mulberry32(hashSeed(seedText));
  const sectionIds = options.sections ?? SECTIONS.map((s) => s.id);

  const runs: SectionRun[] = [];
  for (const sectionId of sectionIds) {
    const spec = SECTION_BY_ID[sectionId];
    const pool = poolFor(sectionId, options);
    if (pool.length === 0) continue;

    const target = Math.min(options.questionsPerSection ?? spec.questionCount, pool.length);
    const picked = pickQuestions(pool, target, options, rand);

    runs.push({
      section: sectionId,
      questionIds: picked.map((q) => q.id),
      // Giu nguyen ap luc thoi gian: thoi luong duoc chia ti le theo so cau.
      allowedSeconds: Math.round((spec.minutes * 60 * picked.length) / spec.questionCount),
      elapsedMs: 0,
    });
  }

  return {
    id: `att_${Date.now().toString(36)}_${Math.floor(rand() * 1e6).toString(36)}`,
    mode: options.mode,
    label: options.label,
    section3: options.section3,
    status: 'in_progress',
    createdAt: Date.now(),
    cursorSection: 0,
    cursorIndex: 0,
    sections: runs,
    responses: {},
    strictMode: options.strictMode ?? options.mode === 'full',
  };
}

function poolFor(sectionId: SectionId, options: BuildAttemptOptions): Question[] {
  if (options.questionIds) {
    return options.questionIds
      .map(findQuestion)
      .filter((q): q is Question => Boolean(q) && q!.section === sectionId);
  }
  let pool = questionsOf(sectionId, subjectsOf(options.section3));
  if (options.topicIds && options.topicIds.length > 0) {
    const allowed = new Set(options.topicIds);
    pool = pool.filter((q) => allowed.has(q.topicId));
  }
  return pool;
}

/**
 * Chon cau theo han ngach chu de (trong so trong de that), trong moi chu de
 * uu tien: cau chua gap > cau it gap; che do thich ung uu tien cau co do kho
 * gan voi nang luc hien tai nhat (thong tin thu duoc nhieu nhat).
 */
function pickQuestions(
  pool: readonly Question[],
  target: number,
  options: BuildAttemptOptions,
  rand: () => number,
): Question[] {
  if (options.questionIds) {
    // Giu dung thu tu nguoi dung yeu cau (vi du danh sach on tap den han).
    return pool.slice(0, target);
  }

  const byTopic = new Map<string, Question[]>();
  for (const q of pool) {
    const list = byTopic.get(q.topicId) ?? [];
    list.push(q);
    byTopic.set(q.topicId, list);
  }

  // Han ngach theo trong so chu de, chuan hoa tren cac chu de thuc su co cau hoi.
  const topics = [...byTopic.keys()];
  const weights = topics.map((id) => TOPIC_BY_ID.get(id)?.weight ?? 0.05);
  const weightSum = weights.reduce((a, b) => a + b, 0) || 1;

  const quotas = new Map<string, number>();
  let assigned = 0;
  topics.forEach((id, i) => {
    const quota = Math.floor((target * (weights[i] ?? 0)) / weightSum);
    quotas.set(id, quota);
    assigned += quota;
  });

  // Phan bo phan du cho cac chu de trong so cao nhat con cho trong.
  const remainderOrder = topics
    .map((id, i) => ({ id, weight: weights[i] ?? 0 }))
    .sort((a, b) => b.weight - a.weight);
  let cursor = 0;
  while (assigned < target && remainderOrder.length > 0) {
    const entry = remainderOrder[cursor % remainderOrder.length];
    if (!entry) break;
    const available = byTopic.get(entry.id)?.length ?? 0;
    const current = quotas.get(entry.id) ?? 0;
    if (current < available) {
      quotas.set(entry.id, current + 1);
      assigned += 1;
    }
    cursor += 1;
    if (cursor > topics.length * 20) break;
  }

  const chosen: Question[] = [];
  for (const topicId of topics) {
    const quota = quotas.get(topicId) ?? 0;
    if (quota === 0) continue;
    const candidates = rankCandidates(byTopic.get(topicId) ?? [], options, rand);
    chosen.push(...candidates.slice(0, quota));
  }

  // Bu cho du so cau neu mot vai chu de khong du bai.
  if (chosen.length < target) {
    const takenIds = new Set(chosen.map((q) => q.id));
    const rest = rankCandidates(pool.filter((q) => !takenIds.has(q.id)), options, rand);
    chosen.push(...rest.slice(0, target - chosen.length));
  }

  // Trong de that cac chu de dan xen, khong nhom lai theo tung cum.
  return shuffle(chosen, rand).slice(0, target);
}

function rankCandidates(
  candidates: readonly Question[],
  options: BuildAttemptOptions,
  rand: () => number,
): Question[] {
  const seen = options.seen ?? {};
  const mastery = options.masteryByTopic ?? {};

  return candidates
    .map((q) => {
      let score = rand() * 0.15; // nhieu nho de hai lan tao de khong giong het nhau
      score -= Math.min(3, seen[q.id] ?? 0) * 0.4; // cau chua gap duoc uu tien

      if (options.mode === 'adaptive') {
        const m = mastery[q.topicId] ?? 0.5;
        const ability = Math.log(Math.min(0.99, Math.max(0.01, m)) / (1 - Math.min(0.99, Math.max(0.01, m))));
        const p = probabilityCorrect(ability, difficultyToLogit(q.difficulty));
        // Cau co xac suat dung ~0,6 mang lai nhieu thong tin va cam giac vua suc nhat.
        score += 1 - Math.abs(p - 0.6) * 2;
      }
      return { q, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.q);
}

/** Tong so cau cua mot bai lam. */
export function attemptQuestionCount(attempt: Attempt): number {
  return attempt.sections.reduce((n, s) => n + s.questionIds.length, 0);
}

/** Danh sach phang cac cau theo dung thu tu lam bai. */
export function flattenQuestionIds(attempt: Attempt): string[] {
  return attempt.sections.flatMap((s) => s.questionIds);
}
