import { MAX_TOTAL_SCORE, SECTIONS } from '../config';
import { LEVELS, STAGES } from '../data/curriculum';
import { questionsOf } from '../data/questions';
import { TOPICS } from '../data/topics';
import type {
  PlacementRecord,
  PlacementSectionResult,
  Question,
  ScienceSubject,
  SectionId,
  SrsCard,
  TopicMastery,
  TrackState,
} from '../types';
import {
  abilityStandardError,
  difficultyToLogit,
  estimateAbility,
  expectedAccuracy,
  NEUTRAL_ABILITY,
  type AbilityObservation,
} from './ability';
import { hashSeed } from './rng';
import { createCard } from './srs';

/**
 * BAI KIEM TRA DINH VI DAU VAO
 *
 * Truoc khi co man hinh nay, moi nguoi hoc deu bat dau tu cung mot diem: nang
 * luc mac dinh 0, moi tuyen o cap 1, lo trinh "ca nhan hoa" chi that su ca
 * nhan hoa sau khi ho da lam rat nhieu phieu. Nghia la nguoi can giup nhat —
 * nguoi moi — lai la nguoi nhan duoc it huong dan nhat.
 *
 * Bai dinh vi dao nguoc dieu do: 36 cau, 12 moi phan, chon THICH UNG.
 *
 * Ba quyet dinh thiet ke, va ly do:
 *
 * 1. CHON THICH UNG (adaptive), khong phai de co dinh. Sau moi cau, he thong
 *    uoc luong lai nang luc roi chon cau tiep theo co do kho GAN nang luc do
 *    nhat. Mot cau qua de hay qua kho gan nhu khong mang thong tin gi: ai cung
 *    dung, hoac ai cung sai. Nho vay 12 cau cho ra sai so tuong duong mot de
 *    co dinh dai gap doi.
 *
 * 2. PHU CHUYEN DE TRUOC, do kho sau. Cau dau tien cua moi chuyen de trong
 *    phan duoc uu tien, roi moi den chon theo do kho. Mot bai dinh vi bo qua
 *    han mot chuyen de se de lai mot lo hong ma khong ai biet la co.
 *
 * 3. KHONG QUAY LAI CAU TRUOC. Day khong phai su khac nghiet: cau tiep theo
 *    duoc chon DUA TREN cau vua roi, nen sua lai cau cu se lam hong chinh
 *    logic chon cau. Man hinh noi ro dieu nay truoc khi bat dau.
 *
 * Va mot gioi han duoc tuyen bo thang: bai nay uoc luong o muc PHAN THI, khong
 * phai tung chuyen de. 12 cau du de dinh vi mot phan, khong du de dinh vi 10
 * chuyen de. Muc chuyen de sac dan khi nguoi hoc lam phieu that.
 */

export const ITEMS_PER_SECTION = 12;
export const PLACEMENT_TOTAL = ITEMS_PER_SECTION * SECTIONS.length;

/**
 * Cap do cao nhat ma bai dinh vi duoc phep gan.
 *
 * 12 cau khong the chung minh nang luc cap 5–6. Cap do do phai kiem duoc bang
 * phieu that. Neu de bai dinh vi day nguoi hoc len cap 6, ho se gap ngay de
 * phan loai voi nen chua chac — va bo cuoc.
 */
export const MAX_PLACEMENT_LEVEL = 4;

export interface PlacementAnswer {
  questionId: string;
  /** null = bo qua. */
  value: string | null;
  correct: boolean;
  timeSpentMs: number;
  confidence: 'sure' | 'unsure' | 'guess';
}

/** Thu tu lam bai: het phan 1 roi den phan 2, phan 3. */
export function sectionOrder(): readonly SectionId[] {
  return SECTIONS.map((s) => s.id);
}

/** Phan thi cua cau thu `index` (0-based) trong ca bai. */
export function sectionAt(index: number): SectionId {
  const order = sectionOrder();
  const i = Math.min(order.length - 1, Math.floor(index / ITEMS_PER_SECTION));
  return order[i] as SectionId;
}

function observationsOf(
  answers: readonly PlacementAnswer[],
  byId: ReadonlyMap<string, Question>,
): AbilityObservation[] {
  const out: AbilityObservation[] = [];
  for (const answer of answers) {
    const question = byId.get(answer.questionId);
    if (question) out.push({ difficulty: question.difficulty, correct: answer.correct });
  }
  return out;
}

/**
 * Chon cau tiep theo cho mot phan.
 *
 * Uu tien 1: chuyen de trong phan chua duoc cham toi.
 * Uu tien 2: do kho gan nang luc hien tai nhat (cau mang nhieu thong tin nhat).
 * Pha the: bam theo ma cau — cung mot chuoi tra loi luon cho cung mot de bai,
 * tren moi may va moi lan mo.
 */
export function pickNext(
  section: SectionId,
  subject: ScienceSubject,
  answered: readonly PlacementAnswer[],
): Question | null {
  const pool = questionsOf(section, subject);
  if (pool.length === 0) return null;

  const byId = new Map(pool.map((q) => [q.id, q]));
  const inSection = answered.filter((a) => byId.has(a.questionId));
  const used = new Set(inSection.map((a) => a.questionId));

  const available = pool.filter((q) => !used.has(q.id));
  if (available.length === 0) return null;

  const theta =
    inSection.length === 0 ? NEUTRAL_ABILITY : estimateAbility(observationsOf(inSection, byId));

  const touched = new Set(
    inSection.map((a) => byId.get(a.questionId)?.topicId).filter((t): t is string => Boolean(t)),
  );
  const fresh = available.filter((q) => !touched.has(q.topicId));
  const candidates = fresh.length > 0 ? fresh : available;

  let best = candidates[0] as Question;
  let bestScore = Number.POSITIVE_INFINITY;
  for (const question of candidates) {
    const distance = Math.abs(difficultyToLogit(question.difficulty) - theta);
    // Pha the on dinh: khong dung Math.random o bat ky dau trong he thong.
    const jitter = (hashSeed(question.id) % 1000) / 1e6;
    const score = distance + jitter;
    if (score < bestScore) {
      best = question;
      bestScore = score;
    }
  }
  return best;
}

/** Cau tiep theo cua ca bai, hoac null khi da du 36 cau. */
export function nextQuestion(
  answers: readonly PlacementAnswer[],
  subject: ScienceSubject,
): Question | null {
  if (answers.length >= PLACEMENT_TOTAL) return null;
  return pickNext(sectionAt(answers.length), subject, answers);
}

export interface PlacementOutcome {
  record: PlacementRecord;
  mastery: Record<string, TopicMastery>;
  tracks: Record<string, TrackState>;
  srs: Record<string, SrsCard>;
  stage: number;
}

/**
 * Cap do khoi diem suy tu muc thanh thao uoc luong.
 *
 * Thang nay co chu dich THAN TRONG. Xep thap hon thuc luc mot cap thi nguoi hoc
 * mat vai buoi de vuot qua — kho chiu nhung khong hong. Xep cao hon thuc luc
 * mot cap thi ho gap de chua du nen de lam, ket luan "minh khong hop mon nay",
 * va bo. Hai sai lam nay khong he doi xung.
 */
export function levelForMastery(mastery: number): number {
  const level =
    mastery >= 0.86 ? 4 : mastery >= 0.74 ? 3 : mastery >= 0.58 ? 2 : 1;
  return Math.min(MAX_PLACEMENT_LEVEL, Math.max(1, level));
}

/**
 * Tron uoc luong cua PHAN THI voi ket qua rieng cua CHUYEN DE.
 *
 * So cau moi chuyen de trong bai dinh vi rat it (1–4), nen neu tin hoan toan
 * vao no thi mot cau sai may rui se day ca tuyen ve cap 1. Cong them mot
 * "so cau tuong duong" tu muc phan thi de keo uoc luong ve trung binh khi mau
 * con mong — mau cang day thi anh huong cua no cang nho.
 */
const PRIOR_ITEMS = 2;

export function blendMastery(sectionAccuracy: number, correct: number, answered: number): number {
  const total = answered + PRIOR_ITEMS;
  return (sectionAccuracy * PRIOR_ITEMS + correct) / total;
}

export function buildPlacement(
  answers: readonly PlacementAnswer[],
  subject: ScienceSubject,
  durationMs: number,
  now: number = Date.now(),
): PlacementOutcome {
  const byId = new Map<string, Question>();
  for (const spec of SECTIONS) {
    for (const question of questionsOf(spec.id, subject)) byId.set(question.id, question);
  }

  const sections: PlacementSectionResult[] = [];
  const mastery: Record<string, TopicMastery> = {};
  const tracks: Record<string, TrackState> = {};
  const srs: Record<string, SrsCard> = {};

  for (const spec of SECTIONS) {
    const mine = answers.filter((a) => byId.get(a.questionId)?.section === spec.id);
    const observations = observationsOf(mine, byId);
    const ability = estimateAbility(observations);
    const accuracy = expectedAccuracy(ability);

    sections.push({
      section: spec.id,
      answered: mine.length,
      correct: mine.filter((a) => a.correct).length,
      ability,
      standardError: abilityStandardError(ability, observations),
      projected: accuracy * spec.questionCount,
    });

    const topics = TOPICS.filter(
      (t) => t.section === spec.id && (spec.id !== 'science' || t.subject === subject),
    );
    for (const topic of topics) {
      const own = mine.filter((a) => byId.get(a.questionId)?.topicId === topic.id);
      const correct = own.filter((a) => a.correct).length;
      const value = blendMastery(accuracy, correct, own.length);
      const timeMs = own.reduce((n, a) => n + a.timeSpentMs, 0);

      mastery[topic.id] = {
        topicId: topic.id,
        mastery: value,
        attempts: own.length,
        correct,
        timeMs,
        ...(own.length > 0 ? { lastPracticed: now } : {}),
      };
      tracks[topic.id] = {
        topicId: topic.id,
        level: levelForMastery(value),
        xp: 0,
        masteredAtLevel: 0,
      };
    }
  }

  // Cau sai vao ngay so tay loi sai: bai dinh vi da chi ra lo hong thi khong co
  // ly do gi bat nguoi hoc phai gap lai no mot cach tinh co.
  for (const answer of answers) {
    if (!answer.correct && byId.has(answer.questionId)) {
      srs[answer.questionId] = createCard(answer.questionId, 'wrong', now);
    } else if (answer.correct && answer.confidence === 'guess' && byId.has(answer.questionId)) {
      srs[answer.questionId] = createCard(answer.questionId, 'lucky', now);
    }
  }

  const projected = sections.reduce((n, s) => n + s.projected, 0);
  const startingLevels: Record<string, number> = {};
  for (const [topicId, track] of Object.entries(tracks)) startingLevels[topicId] = track.level;

  return {
    record: {
      completedAt: now,
      scienceSubject: subject,
      sections,
      projected: Math.min(MAX_TOTAL_SCORE, projected),
      startingLevels,
      durationMs,
    },
    mastery,
    tracks,
    srs,
    stage: stageForLevels(Object.values(startingLevels)),
  };
}

/**
 * Giai doan khoi diem: lay cap do TRUNG VI cua cac tuyen, khong lay cao nhat.
 * Mot tuyen manh khong keo ca chuong trinh len giai doan sau duoc — giai doan
 * la nhip chung, va nhip chung phai khop voi phan lon cac tuyen.
 */
export function stageForLevels(levels: readonly number[]): number {
  if (levels.length === 0) return 1;
  const sorted = [...levels].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)] as number;
  const spec = LEVELS.find((l) => l.level === median);
  return Math.min(STAGES.length, Math.max(1, spec?.stage ?? 1));
}
