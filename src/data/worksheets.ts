import type {
  Difficulty,
  Question,
  ScienceSubject,
  SectionId,
  Worksheet,
  WorksheetKind,
  WorksheetPart,
} from '../types';
import { KINDS, LEVELS, LEVEL_SHARE, PART_TEMPLATE, MASTERY_RATIO, PASS_RATIO } from './curriculum';
import { questionsOf, questionsOfTopic } from './questions';
import { TOPICS } from './topics';

/**
 * SINH BO 2000 PHIEU LUYEN
 *
 * Bo phieu khong duoc go tay thanh 2000 tep roi rac — cach do khong the kiem
 * tra tinh nhat quan va se lech ngay khi khung chuong trinh thay doi. Thay vao
 * do, moi phieu duoc SINH RA tu mot dac ta: (chu de x cap do x dang phieu).
 *
 * Ba tinh chat duoc bao dam bang xay dung:
 *  1. DUNG 2000 phieu — phan bo bang phuong phap so du lon nhat (Hare), co
 *     kiem chung bang bai test.
 *  2. TI TRONG DUNG DE THAT — so phieu cua mot chu de ti le thuan voi ti trong
 *     xuat hien cua chu de do trong de thi, nen thoi gian hoc di dung cho.
 *  3. TAI LAP DUOC — khong dung Math.random o bat ky dau; cung mot ma phieu
 *     luon cho ra dung mot bo cau hoi, tren moi may va moi lan mo.
 */

export const TOTAL_WORKSHEETS = 2000;

const SECTION_SHARE: Record<SectionId, number> = {
  quantitative: 1 / 3,
  qualitative: 1 / 3,
  science: 1 / 3,
};

const SCIENCE_SUBJECT_COUNT = 5;

const SECTION_CODE: Record<SectionId, string> = {
  quantitative: 'TOA',
  qualitative: 'VAN',
  science: 'KHO',
};

const SUBJECT_CODE: Record<ScienceSubject, string> = {
  physics: 'LY',
  chemistry: 'HOA',
  history: 'SU',
  geography: 'DIA',
  english: 'ANH',
};

interface Slot {
  topicId: string;
  topicName: string;
  section: SectionId;
  subject: ScienceSubject | undefined;
  level: number;
  weight: number;
  code: string;
}

function buildSlots(): Slot[] {
  const slots: Slot[] = [];
  for (const topic of TOPICS) {
    const groupShare =
      topic.section === 'science'
        ? SECTION_SHARE.science / SCIENCE_SUBJECT_COUNT
        : SECTION_SHARE[topic.section];
    const prefix = topic.subject ? SUBJECT_CODE[topic.subject] : SECTION_CODE[topic.section];
    const slug = (topic.id.split('.').pop() ?? 'gen').slice(0, 3).toUpperCase();

    for (const level of LEVELS) {
      slots.push({
        topicId: topic.id,
        topicName: topic.name,
        section: topic.section,
        subject: topic.subject,
        level: level.level,
        weight: groupShare * topic.weight * (LEVEL_SHARE[level.level] ?? 0),
        code: `${prefix}-${slug}`,
      });
    }
  }
  return slots;
}

/**
 * Phan bo so phieu cho tung o theo phuong phap so du lon nhat.
 * Bao dam tong dung bang `total` va khong o nao bi bo trong.
 */
export function apportion(weights: readonly number[], total: number): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  if (sum <= 0 || weights.length === 0) return weights.map(() => 0);

  const exact = weights.map((w) => (w / sum) * total);
  // San toi thieu 1 phieu cho moi o — nhung chi khi con du phieu de san.
  // Neu it hon so o, quay ve chia thuan tuy theo phan nguyen.
  const floor = total >= weights.length ? 1 : 0;
  const counts = exact.map((value) => Math.max(floor, Math.floor(value)));
  let assigned = counts.reduce((a, b) => a + b, 0);

  // Neu san toi thieu 1 phieu/o da vuot han muc, cat bot tu o co so du nho nhat.
  while (assigned > total) {
    let victim = -1;
    let smallest = Infinity;
    for (let i = 0; i < counts.length; i += 1) {
      const count = counts[i] ?? 0;
      const value = exact[i] ?? 0;
      if (count > floor && value < smallest) {
        smallest = value;
        victim = i;
      }
    }
    if (victim === -1) break;
    counts[victim] = (counts[victim] ?? 1) - 1;
    assigned -= 1;
  }

  // Chia phan con lai cho cac o co phan du lon nhat.
  const order = exact
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((a, b) => b.fraction - a.fraction || a.index - b.index);

  let cursor = 0;
  while (assigned < total && order.length > 0) {
    const entry = order[cursor % order.length];
    if (!entry) break;
    counts[entry.index] = (counts[entry.index] ?? 0) + 1;
    assigned += 1;
    cursor += 1;
  }

  return counts;
}

/** Chon dang phieu theo vi tri trong chuoi cua mot o. */
function kindFor(index: number, count: number): WorksheetKind {
  if (index === count - 1) return 'boss';
  if (count > 2 && index === count - 2) return 'challenge';
  const rotation: WorksheetKind[] = ['warmup', 'skill', 'speed', 'accuracy', 'mixed', 'review'];
  return rotation[index % rotation.length] as WorksheetKind;
}

function clampDifficulty(value: number): Difficulty {
  return Math.min(5, Math.max(1, Math.round(value))) as Difficulty;
}

/**
 * Chon cau cho ca phieu, bao dam KHONG TRUNG LAP trong cung mot phieu.
 *
 * Vi sao phai lam o muc ca phieu thay vi tung chang: neu moi chang tu chon
 * doc lap tu kho cau cua chu de, hai chang rat de rut trung mot cau — va gap
 * lai cau vua lam o vai phut truoc thi khong con la luyen tap nua.
 *
 * Khi kho cau cua chu de chua du, phieu duoc bu them cau CUNG PHAN THI (cung
 * mon tu chon neu la phan 3) thay vi lap lai cau cu. Neu ca phan thi cung
 * khong du, so cau cua phieu duoc rut ngan mot cach trung thuc.
 */
function selectSheetQuestions(
  topicPool: readonly Question[],
  sectionPool: readonly Question[],
  targets: readonly Difficulty[],
  partCounts: readonly number[],
  offset: number,
): string[][] {
  const seen = new Set<string>();
  const candidates: Question[] = [];
  for (const question of [...topicPool, ...sectionPool]) {
    if (seen.has(question.id)) continue;
    seen.add(question.id);
    candidates.push(question);
  }

  const wanted = partCounts.reduce((a, b) => a + b, 0);
  const counts = rebalance(partCounts, Math.min(wanted, candidates.length));

  const remaining = new Set(candidates.map((q) => q.id));
  const byId = new Map(candidates.map((q) => [q.id, q]));

  return counts.map((count, partIndex) => {
    const target = targets[partIndex] ?? 3;
    const ranked = [...remaining]
      .map((id, index) => ({ id, distance: Math.abs((byId.get(id)?.difficulty ?? 3) - target), index }))
      .sort((a, b) => a.distance - b.distance || a.index - b.index);

    const picked: string[] = [];
    for (let i = 0; i < count && ranked.length > 0; i += 1) {
      // Xoay vong theo so thu tu phieu de hai phieu lien tiep khong giong nhau.
      const entry = ranked[(offset + partIndex * 2 + i) % ranked.length];
      if (!entry || !remaining.has(entry.id)) {
        const fallback = ranked.find((r) => remaining.has(r.id));
        if (!fallback) break;
        remaining.delete(fallback.id);
        picked.push(fallback.id);
        continue;
      }
      remaining.delete(entry.id);
      picked.push(entry.id);
    }
    return picked;
  });
}

/** Chia lai han ngach cac chang khi tong so cau bi rut ngan. */
function rebalance(partCounts: readonly number[], total: number): number[] {
  const original = partCounts.reduce((a, b) => a + b, 0);
  if (total >= original || original === 0) return [...partCounts];

  const counts = partCounts.map((count) => Math.max(1, Math.floor((count * total) / original)));
  let assigned = counts.reduce((a, b) => a + b, 0);
  let cursor = 1;
  while (assigned < total) {
    counts[cursor % counts.length] = (counts[cursor % counts.length] ?? 0) + 1;
    assigned += 1;
    cursor += 1;
  }
  while (assigned > total) {
    const index = counts.findIndex((c) => c > 1);
    if (index === -1) {
      const last = counts.findIndex((c) => c > 0);
      if (last === -1) break;
      counts[last] = (counts[last] ?? 1) - 1;
    } else {
      counts[index] = (counts[index] ?? 1) - 1;
    }
    assigned -= 1;
  }
  return counts;
}

/** Chia so cau cua phieu cho ba chang theo ti le trong PART_TEMPLATE. */
function splitCount(total: number): number[] {
  const raw = PART_TEMPLATE.map((part) => part.share * total);
  const counts = raw.map((value) => Math.max(1, Math.floor(value)));
  let assigned = counts.reduce((a, b) => a + b, 0);
  let cursor = 1; // don phan du vao chang 2 — phan loi cua phieu
  while (assigned < total) {
    counts[cursor % counts.length] = (counts[cursor % counts.length] ?? 0) + 1;
    assigned += 1;
    cursor += 1;
  }
  while (assigned > total) {
    const index = counts.findIndex((c) => c > 1);
    if (index === -1) break;
    counts[index] = (counts[index] ?? 1) - 1;
    assigned -= 1;
  }
  return counts;
}

function buildWorksheets(): Worksheet[] {
  const slots = buildSlots();
  const counts = apportion(
    slots.map((s) => s.weight),
    TOTAL_WORKSHEETS,
  );

  const poolCache = new Map<string, Question[]>();
  const poolOf = (topicId: string): Question[] => {
    const cached = poolCache.get(topicId);
    if (cached) return cached;
    const pool = questionsOfTopic(topicId);
    poolCache.set(topicId, pool);
    return pool;
  };

  const sectionCache = new Map<string, Question[]>();
  const sectionPoolOf = (slot: Slot): Question[] => {
    const key = `${slot.section}:${slot.subject ?? ''}`;
    const cached = sectionCache.get(key);
    if (cached) return cached;
    const pool = questionsOf(slot.section, slot.subject);
    sectionCache.set(key, pool);
    return pool;
  };

  const sheets: Worksheet[] = [];
  // Ma cuoi cua tung o, dung de noi chuoi mo khoa giua cac cap do.
  const lastOfSlot = new Map<string, string>();

  slots.forEach((slot, slotIndex) => {
    const total = counts[slotIndex] ?? 0;
    const levelSpec = LEVELS.find((l) => l.level === slot.level);
    if (!levelSpec || total === 0) return;

    const pool = poolOf(slot.topicId);
    const sectionPool = sectionPoolOf(slot);
    const [minDifficulty, maxDifficulty] = levelSpec.difficultyRange;
    const midDifficulty = (minDifficulty + maxDifficulty) / 2;

    for (let i = 0; i < total; i += 1) {
      const kind = kindFor(i, total);
      const kindSpec = KINDS.find((k) => k.kind === kind);
      if (!kindSpec) continue;

      const seq = String(i + 1).padStart(3, '0');
      const code = `PL-${slot.code}-L${slot.level}-${seq}`;
      const partCounts = splitCount(levelSpec.questionCount);

      const targets = PART_TEMPLATE.map((template) =>
        clampDifficulty(midDifficulty + kindSpec.difficultyShift + template.shift),
      );
      const selection = selectSheetQuestions(pool, sectionPool, targets, partCounts, i * 3);

      const parts: WorksheetPart[] = PART_TEMPLATE.map((template, partIndex) => {
        const questionIds = selection[partIndex] ?? [];
        return {
          order: partIndex + 1,
          name: template.name,
          goal: template.goal,
          questionIds,
          seconds: Math.round(questionIds.length * levelSpec.secondsPerQuestion * kindSpec.timeFactor),
        };
      });

      const previous = i === 0 ? previousLevelBoss(lastOfSlot, slot) : sheets[sheets.length - 1]?.id;

      const sheet: Worksheet = {
        id: code,
        code,
        title: `${kindSpec.name} · ${slot.topicName} · Cấp ${slot.level}`,
        objective: `${kindSpec.goal} ${levelSpec.motto}`,
        section: slot.section,
        topicId: slot.topicId,
        level: slot.level,
        stage: levelSpec.stage,
        kind,
        parts,
        questionCount: parts.reduce((n, p) => n + p.questionIds.length, 0),
        seconds: parts.reduce((n, p) => n + p.seconds, 0),
        passRatio: PASS_RATIO,
        masteryRatio: kind === 'boss' ? 0.9 : kind === 'challenge' ? 0.85 : MASTERY_RATIO,
        xp: Math.round(levelSpec.xp * kindSpec.xpFactor),
        ...(slot.subject ? { subject: slot.subject } : {}),
        ...(previous ? { requires: previous } : {}),
      };

      sheets.push(sheet);
      lastOfSlot.set(`${slot.topicId}:${slot.level}`, sheet.id);
    }
  });

  return sheets;
}

function previousLevelBoss(lastOfSlot: Map<string, string>, slot: Slot): string | undefined {
  if (slot.level <= 1) return undefined;
  return lastOfSlot.get(`${slot.topicId}:${slot.level - 1}`);
}

let cache: Worksheet[] | null = null;

/** Toan bo bo phieu. Sinh mot lan roi dung lai (lazy singleton). */
export function getWorksheets(): Worksheet[] {
  if (!cache) cache = buildWorksheets();
  return cache;
}

let byId: Map<string, Worksheet> | null = null;

export function worksheetById(id: string): Worksheet | undefined {
  if (!byId) byId = new Map(getWorksheets().map((w) => [w.id, w]));
  return byId.get(id);
}

export interface WorksheetFilter {
  section?: SectionId;
  subject?: ScienceSubject;
  topicId?: string;
  level?: number;
  stage?: number;
  kind?: WorksheetKind;
}

export function filterWorksheets(filter: WorksheetFilter): Worksheet[] {
  return getWorksheets().filter((sheet) => {
    if (filter.section && sheet.section !== filter.section) return false;
    if (filter.subject && sheet.subject !== filter.subject) return false;
    if (filter.topicId && sheet.topicId !== filter.topicId) return false;
    if (filter.level && sheet.level !== filter.level) return false;
    if (filter.stage && sheet.stage !== filter.stage) return false;
    if (filter.kind && sheet.kind !== filter.kind) return false;
    return true;
  });
}

/**
 * Cac phieu cua mon tu chon khac mon dang thi thi khong lien quan den nguoi hoc.
 * Ham nay tra ve bo phieu thuc su nam trong chuong trinh cua ho.
 */
export function activeWorksheets(subject: ScienceSubject): Worksheet[] {
  return getWorksheets().filter((sheet) => sheet.section !== 'science' || sheet.subject === subject);
}

export interface BankCoverage {
  topicId: string;
  needed: number;
  available: number;
  ratio: number;
}

/**
 * Do phu ngan hang cau hoi cho tung chu de.
 *
 * Bo phieu la khung chuong trinh hoan chinh, con ngan hang cau hoi thi lon dan
 * theo thoi gian. Chi so nay noi that voi nguoi dung: chu de nao dang phai
 * dung lai cau cu, va them bao nhieu cau nua thi het lap.
 */
export function bankCoverage(): BankCoverage[] {
  const needed = new Map<string, number>();
  for (const sheet of getWorksheets()) {
    const unique = new Set(sheet.parts.flatMap((p) => p.questionIds));
    needed.set(sheet.topicId, Math.max(needed.get(sheet.topicId) ?? 0, unique.size));
  }
  return TOPICS.map((topic) => {
    const available = questionsOfTopic(topic.id).length;
    const need = needed.get(topic.id) ?? 0;
    return {
      topicId: topic.id,
      needed: need,
      available,
      ratio: need === 0 ? 1 : Math.min(1, available / need),
    };
  });
}
