/**
 * Topic packets: seven sheets per topic, assembled rather than authored.
 *
 * A learner working a topic properly needs more than a lesson and a pile of
 * questions. They need theory, then the recognition to know which question
 * they are looking at, then the method, then practice that escalates, then a
 * revision pass, then a timed sitting under exam conditions — and a solution
 * sheet with a real analysis behind each of the practice sheets, so the point
 * of each question can be seen rather than guessed.
 *
 * Everything here is assembled from assets that already exist and are already
 * tested: the lesson (idea, method, worked example, traps), the topic data
 * (question types with their cues, and the consolidation criteria), and the
 * bank. Nothing is authored twice. That matters because a packet that
 * duplicated its lesson would drift from it within a month.
 *
 * ## The honesty problem, and how it is handled
 *
 * The bank holds between one and thirteen items per skill. A packet that
 * silently padded a thin topic with whatever it could find would tell a
 * learner they had practised Circles when they had practised Geometry. So
 * every practice sheet reports its own provenance: how many items are on-skill,
 * how many were drawn from the same domain to fill it, and how many were asked
 * for but do not exist. A sheet that could not be filled says so; it is never
 * quietly shortened.
 */

import type { DifficultyBand, Question, SectionId, SkillId } from '../types.ts';
import { DOMAINS } from '../data/blueprint.ts';
import { lessonFor, topicFor, type Lesson, type Topic } from '../data/lesson-index.ts';

export type SheetKind =
  /** Phiếu lý thuyết */
  | 'theory'
  /** Phiếu dạng bài + đọc vị */
  | 'recognition'
  /** Phiếu kỹ năng, phương pháp */
  | 'method'
  /** Phiếu luyện nâng cao */
  | 'advanced'
  /** Phiếu ôn thi */
  | 'revision'
  /** Phiếu thi */
  | 'exam'
  /** Phiếu hướng dẫn ôn chắc chuyên đề */
  | 'consolidation';

/** Delivery order. A packet is worked in this sequence, not sampled from. */
export const SHEET_ORDER: SheetKind[] = [
  'theory',
  'recognition',
  'method',
  'advanced',
  'revision',
  'exam',
  'consolidation',
];

/** Which sheets carry questions, and therefore a solution sheet. */
export const PRACTICE_SHEETS: SheetKind[] = ['advanced', 'revision', 'exam'];

export interface SheetProvenance {
  /** Items drawn from the topic's own skill. */
  onSkill: number;
  /** Items drawn from the same domain because the skill ran out. */
  fromDomain: number;
  /** Items the sheet asked for and the bank could not supply. */
  short: number;
}

export interface Sheet {
  kind: SheetKind;
  /** Questions, for a practice sheet; empty for the reading sheets. */
  questions: Question[];
  provenance: SheetProvenance;
  /** Minutes the sheet is designed to take. */
  minutes: number;
  /** Whether the sheet is delivered against a clock. */
  timed: boolean;
}

export interface Packet {
  skill: SkillId;
  section: SectionId;
  lesson: Lesson;
  topic: Topic;
  sheets: Record<SheetKind, Sheet>;
  /** Items in the bank for this skill, by band, so thinness is visible. */
  supply: Record<DifficultyBand, number>;
}

/* ------------------------------------------------------------------ */
/* Sheet specifications                                                */
/*                                                                     */
/* Stated as data so a programme can argue with the design rather than */
/* read it out of a function body.                                     */
/* ------------------------------------------------------------------ */

interface SheetSpec {
  count: number;
  /** Bands to draw from, in preference order. */
  bands: DifficultyBand[];
  minutes: number;
  timed: boolean;
}

const SPECS: Record<SheetKind, SheetSpec | null> = {
  theory: null,
  recognition: null,
  method: null,
  /** Hard first: the advanced sheet exists to find the edge, not to reassure. */
  advanced: { count: 8, bands: ['hard', 'medium'], minutes: 20, timed: false },
  /** Mixed, untimed: revision is for retrieval, and a clock suppresses it. */
  revision: { count: 10, bands: ['medium', 'easy', 'hard'], minutes: 20, timed: false },
  /** Test conditions: the same mix and the same clock as the real thing. */
  exam: { count: 10, bands: ['medium', 'hard', 'easy'], minutes: 13, timed: true },
  consolidation: null,
};

/** Reading time for the sheets that carry no questions. */
const READING_MINUTES: Record<SheetKind, number> = {
  theory: 8,
  recognition: 10,
  method: 10,
  advanced: 0,
  revision: 0,
  exam: 0,
  consolidation: 6,
};

/* ------------------------------------------------------------------ */
/* Assembly                                                            */
/* ------------------------------------------------------------------ */

function domainOf(skill: SkillId): { domain: string; section: SectionId } | null {
  for (const domain of DOMAINS) {
    if (domain.skills.some((s) => s.id === skill)) {
      return { domain: domain.id, section: domain.section };
    }
  }
  return null;
}

/**
 * Draws a sheet's questions.
 *
 * On-skill items come first and are never reused across the packet's sheets:
 * a learner who meets the same question on the advanced sheet and again on the
 * exam sheet has been given a memory test, and their score on the second one
 * means nothing.
 */
function draw(
  spec: SheetSpec,
  skill: SkillId,
  bank: readonly Question[],
  used: Set<string>,
): { questions: Question[]; provenance: SheetProvenance } {
  const home = domainOf(skill);
  const picked: Question[] = [];
  let onSkill = 0;
  let fromDomain = 0;

  const take = (pool: readonly Question[]) => {
    for (const band of spec.bands) {
      for (const question of pool) {
        if (picked.length >= spec.count) return;
        if (used.has(question.id)) continue;
        if (question.band !== band) continue;
        picked.push(question);
        used.add(question.id);
      }
    }
  };

  const onSkillPool = bank.filter((q) => q.skill === skill);
  take(onSkillPool);
  onSkill = picked.length;

  // Only then widen to the domain, and only to fill — never to replace.
  if (picked.length < spec.count && home) {
    take(bank.filter((q) => q.domain === home.domain && q.skill !== skill));
    fromDomain = picked.length - onSkill;
  }

  return {
    questions: picked,
    provenance: { onSkill, fromDomain, short: Math.max(0, spec.count - picked.length) },
  };
}

export function buildPacket(skill: SkillId, bank: readonly Question[]): Packet | null {
  const lesson = lessonFor(skill);
  const topic = topicFor(skill);
  if (!lesson || !topic) return null;

  const used = new Set<string>();
  const sheets = {} as Record<SheetKind, Sheet>;

  for (const kind of SHEET_ORDER) {
    const spec = SPECS[kind];
    if (!spec) {
      sheets[kind] = {
        kind,
        questions: [],
        provenance: { onSkill: 0, fromDomain: 0, short: 0 },
        minutes: READING_MINUTES[kind],
        timed: false,
      };
      continue;
    }
    const { questions, provenance } = draw(spec, skill, bank, used);
    sheets[kind] = { kind, questions, provenance, minutes: spec.minutes, timed: spec.timed };
  }

  const onSkillItems = bank.filter((q) => q.skill === skill);
  const supply: Record<DifficultyBand, number> = {
    easy: onSkillItems.filter((q) => q.band === 'easy').length,
    medium: onSkillItems.filter((q) => q.band === 'medium').length,
    hard: onSkillItems.filter((q) => q.band === 'hard').length,
  };

  return { skill, section: lesson.section, lesson, topic, sheets, supply };
}

/* ------------------------------------------------------------------ */
/* Progress                                                            */
/* ------------------------------------------------------------------ */

export interface PacketProgress {
  /** Sheets marked complete, in delivery order. */
  done: SheetKind[];
  /** The next sheet to work, or null when the packet is finished. */
  next: SheetKind | null;
  /** Completed share, 0–1. */
  share: number;
}

/**
 * Progress through a packet.
 *
 * The next sheet is the first *unfinished* one in delivery order, not the one
 * after the last one finished. A learner who skipped the recognition sheet is
 * sent back to it rather than carried past it, because the sheets are a
 * sequence and skipping one is what produces a student who knows a method and
 * cannot tell when it applies.
 */
export function packetProgress(done: readonly SheetKind[]): PacketProgress {
  const set = new Set(done);
  const ordered = SHEET_ORDER.filter((kind) => set.has(kind));
  const next = SHEET_ORDER.find((kind) => !set.has(kind)) ?? null;
  return { done: ordered, next, share: ordered.length / SHEET_ORDER.length };
}

/** Total designed minutes for a packet, so a learner can plan the sitting. */
export function packetMinutes(packet: Packet): number {
  return SHEET_ORDER.reduce((sum, kind) => sum + packet.sheets[kind].minutes, 0);
}

/**
 * Whether a packet's practice sheets rest on enough on-skill material to mean
 * what they claim. Reported rather than hidden: a learner should know when
 * they are practising a domain rather than a topic.
 */
export function packetIsThin(packet: Packet): boolean {
  return PRACTICE_SHEETS.some((kind) => {
    const sheet = packet.sheets[kind];
    return sheet.provenance.onSkill < sheet.questions.length / 2 || sheet.provenance.short > 0;
  });
}
