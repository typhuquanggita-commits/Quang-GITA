/**
 * The GITA profile.
 *
 * Self-report alone would make this a personality quiz. The platform already
 * holds behavioural evidence — attendance, pacing under time, whether errors
 * get closed, whether practice sits at the edge — so each pillar is scored
 * from that evidence first, and self-report is used only where no behavioural
 * proxy exists.
 *
 * Every score therefore carries its own confidence, and the interface is
 * required to show it: a pillar scored from three data points must not look
 * like one scored from three hundred.
 */

import type { PillarId } from './framework.ts';
import { PILLAR_ORDER, PILLARS, TIERS, TIER_ORDER, type AbsorptionTier } from './framework.ts';
import { adherence, HABIT_BY_ID, type Habit, type HabitEntry } from './habits.ts';
import { clamp, isoDate } from '../lib/util.ts';

/* ------------------------------------------------------------------ */
/* Inputs                                                              */
/* ------------------------------------------------------------------ */

/**
 * Behavioural evidence drawn from the assessment side of the platform.
 * Everything here is already measured; nothing is asked of the learner twice.
 */
/**
 * Several fields are nullable, and that distinction carries weight.
 *
 * `null` means the platform has not observed this yet. It is not zero and it
 * is not a neutral middle value — a driver with no data is dropped from the
 * pillar rather than scored, because a default that happens to land at 100
 * would hand a brand-new learner a pillar they have not earned.
 */
export interface BehaviouralEvidence {
  /** Days studied in the last 28. */
  activeDays: number;
  /** Current consecutive-day study streak. */
  streak: number;
  /** Total responses logged, all time. */
  responseCount: number;
  /** Share of responses answered correctly, 0–1, or null with no responses. */
  accuracy: number | null;
  /** Share of wrong answers later revisited, 0–1, or null with no misses yet. */
  errorClosureRate: number | null;
  /** Share of items near the ability estimate, 0–1, or null with no responses. */
  edgePracticeRate: number | null;
  /** Median seconds per item over the target; 1 is on pace, null if unmeasured. */
  pacingRatio: number | null;
  /** Timed accuracy over untimed accuracy, or null without both conditions. */
  pressureRatio: number | null;
  /** Spread of mastery across skills, 0–1, or null below three measured skills. */
  masterySpread: number | null;
  /** Whether a target score and test date are both set. */
  hasTarget: boolean;
  /** Full-length tests completed. */
  fullTests: number;
}

/** Self-report on the dimensions no behaviour can stand in for. */
export type SelfReport = Partial<Record<string, 1 | 2 | 3 | 4 | 5>>;

export interface ProfileInput {
  evidence: BehaviouralEvidence;
  habitEntries: readonly HabitEntry[];
  activeHabits: readonly Habit[];
  selfReport: SelfReport;
  today?: string;
}

/* ------------------------------------------------------------------ */
/* Output                                                              */
/* ------------------------------------------------------------------ */

export interface PillarScore {
  pillar: PillarId;
  /** 0–100. */
  score: number;
  /**
   * How much to trust the score, 0–1. Low confidence means the platform has
   * not yet seen enough behaviour, and the interface must say so rather than
   * present a number that looks earned.
   */
  confidence: number;
  /** The specific signals that produced this score, for a coach to read. */
  drivers: Array<{ label: string; labelVi: string; value: number; weight: number }>;
}

export interface GitaProfile {
  pillars: Record<PillarId, PillarScore>;
  /** Mean of the four pillar scores, 0–100. */
  overall: number;
  /**
   * How much of the profile rests on observed behaviour, 0–1. The same figure
   * applies to every pillar, since they draw on one pool of evidence, and it
   * lives here so callers do not have to reach into an arbitrary pillar for
   * what is really a property of the whole profile.
   */
  confidence: number;
  /** The weakest pillar — where a coach should start. */
  limitingPillar: PillarId;
  /** The tier the evidence supports right now. */
  tier: AbsorptionTier;
  /** What must be true to open the next tier, or null at the top. */
  nextGate: { tier: AbsorptionTier; gate: string; gateVi: string } | null;
}

/* ------------------------------------------------------------------ */
/* Scoring                                                             */
/* ------------------------------------------------------------------ */

/** Maps a raw signal onto 0–100 with an explicit floor and ceiling. */
function band(value: number, floor: number, ceiling: number): number {
  if (ceiling === floor) return 0;
  return clamp(((value - floor) / (ceiling - floor)) * 100, 0, 100);
}

/** Scores a ratio that is best at 1 and worse in either direction. */
function centred(ratio: number, tolerance: number): number {
  const deviation = Math.abs(ratio - 1);
  return clamp((1 - deviation / tolerance) * 100, 0, 100);
}

type Driver = { label: string; labelVi: string; value: number; weight: number };

/**
 * Builds a driver, or nothing at all when the underlying signal is unobserved.
 * Returning an empty array lets a caller spread it into a driver list without
 * a conditional at every site.
 */
function driver(
  value: number | null,
  label: string,
  labelVi: string,
  weight: number,
): Driver[] {
  return value === null ? [] : [{ label, labelVi, value, weight }];
}

function weightedMean(parts: Array<{ value: number; weight: number }>): number {
  const totalWeight = parts.reduce((acc, p) => acc + p.weight, 0);
  if (totalWeight === 0) return 0;
  return parts.reduce((acc, p) => acc + p.value * p.weight, 0) / totalWeight;
}

function selfScore(report: SelfReport, dimensionId: string): number | null {
  const value = report[dimensionId];
  return value === undefined ? null : ((value - 1) / 4) * 100;
}

export function buildProfile(input: ProfileInput): GitaProfile {
  const { evidence, habitEntries, activeHabits, selfReport } = input;
  const today = input.today ?? isoDate();

  /** Mean adherence across the learner's active habits, 0–100. */
  const habitAdherence =
    activeHabits.length === 0
      ? 0
      : (activeHabits.reduce(
          (acc, habit) => acc + adherence(habitEntries, habit, 28, new Date(`${today}T12:00:00`)),
          0,
        ) /
          activeHabits.length) *
        100;

  /* ---- Goal ---- */
  const goalDrivers: Driver[] = [
    ...driver(evidence.hasTarget ? 100 : 0, 'Target and date set', 'Đã đặt mục tiêu và ngày thi', 1.5),
    ...driver(
      evidence.edgePracticeRate === null ? null : band(evidence.edgePracticeRate, 0.2, 0.8),
      'Practice aimed at named weaknesses',
      'Luyện đúng vào điểm yếu đã chỉ ra',
      1.5,
    ),
    ...driver(band(evidence.fullTests, 0, 4), 'Full-length rehearsals completed', 'Số bài thi thử full-length đã làm', 1),
    ...selfDriver(selfReport, 'goal-standard', 'Standard of excellence', 'Chuẩn mực xuất sắc', 1),
    ...selfDriver(selfReport, 'goal-commitment', 'Commitment', 'Cam kết', 1),
  ];

  /* ---- Inspirits ---- */
  const inspiritsDrivers: Driver[] = [
    ...driver(
      evidence.pressureRatio === null ? null : centred(evidence.pressureRatio, 0.5),
      'Accuracy holds under time pressure',
      'Độ chính xác giữ được dưới áp lực thời gian',
      2,
    ),
    ...driver(band(evidence.streak, 0, 21), 'Study streak', 'Chuỗi ngày học', 1.5),
    ...selfDriver(selfReport, 'inspirits-desire', 'Desire and drive', 'Khát khao và động lực', 1.5),
    ...selfDriver(selfReport, 'inspirits-belief', 'Belief', 'Niềm tin', 1.5),
  ];

  /* ---- Talent ---- */
  const talentDrivers: Driver[] = [
    ...driver(
      evidence.accuracy === null ? null : band(evidence.accuracy, 0.35, 0.9),
      'Overall accuracy',
      'Độ chính xác tổng thể',
      2,
    ),
    ...driver(
      evidence.pacingRatio === null ? null : centred(evidence.pacingRatio, 0.6),
      'Pacing against target',
      'Nhịp độ so với mốc mục tiêu',
      1.5,
    ),
    ...driver(
      evidence.edgePracticeRate === null ? null : band(evidence.edgePracticeRate, 0.2, 0.8),
      'Practice sits at the edge of ability',
      'Luyện tập nằm ở ngưỡng năng lực',
      1.5,
    ),
    // An even mastery profile means strengths were built, not just averaged.
    ...driver(
      evidence.masterySpread === null ? null : band(1 - evidence.masterySpread, 0.3, 0.9),
      'Evenness across skills',
      'Độ đồng đều giữa các kỹ năng',
      1,
    ),
  ];

  /* ---- Action ---- */
  const actionDrivers: Driver[] = [
    ...driver(
      activeHabits.length === 0 ? null : habitAdherence,
      'Habit adherence over 28 days',
      'Mức duy trì thói quen trong 28 ngày',
      2.5,
    ),
    ...driver(band(evidence.activeDays, 0, 20), 'Days studied in the last month', 'Số ngày đã học trong tháng qua', 2),
    ...driver(
      evidence.errorClosureRate === null ? null : band(evidence.errorClosureRate, 0.1, 0.85),
      'Errors closed rather than left',
      'Lỗi sai được đóng lại thay vì bỏ đó',
      2,
    ),
  ];

  const byPillar: Record<PillarId, Driver[]> = {
    goal: goalDrivers,
    inspirits: inspiritsDrivers,
    talent: talentDrivers,
    action: actionDrivers,
  };

  /**
   * Confidence rises with logged behaviour and saturates around a month of
   * real use. Below that the platform has an opinion, not a measurement.
   */
  const dataConfidence = clamp(
    0.25 * band(evidence.responseCount, 0, 120) / 100 +
      0.35 * band(evidence.activeDays, 0, 20) / 100 +
      0.2 * band(habitEntries.length, 0, 60) / 100 +
      0.2 * band(evidence.fullTests, 0, 2) / 100,
    0,
    1,
  );

  const pillars = {} as Record<PillarId, PillarScore>;
  for (const pillar of PILLAR_ORDER) {
    const drivers = byPillar[pillar];
    pillars[pillar] = {
      pillar,
      score: Math.round(weightedMean(drivers)),
      confidence: Number(dataConfidence.toFixed(2)),
      drivers,
    };
  }

  const overall = Math.round(
    PILLAR_ORDER.reduce((acc, id) => acc + pillars[id].score, 0) / PILLAR_ORDER.length,
  );

  const limitingPillar = PILLAR_ORDER.reduce((weakest, id) =>
    pillars[id].score < pillars[weakest].score ? id : weakest,
  );

  const tier = tierFor(evidence, habitAdherence);
  const nextTier = TIER_ORDER[TIER_ORDER.indexOf(tier) + 1];

  return {
    pillars,
    overall,
    confidence: Number(dataConfidence.toFixed(2)),
    limitingPillar,
    tier,
    nextGate: nextTier
      ? { tier: nextTier, gate: TIERS[nextTier].gate, gateVi: TIERS[nextTier].gateVi }
      : null,
  };
}

function selfDriver(
  report: SelfReport,
  dimensionId: string,
  label: string,
  labelVi: string,
  weight: number,
): Driver[] {
  // A dimension the learner has not rated contributes nothing, rather than
  // contributing a zero that would read as a failing score.
  return driver(selfScore(report, dimensionId), label, labelVi, weight);
}

/* ------------------------------------------------------------------ */
/* Tier placement                                                      */
/* ------------------------------------------------------------------ */

/**
 * Places a learner at the highest tier whose gate the evidence clears.
 *
 * Gates are evaluated from the bottom up and stop at the first unmet one, so a
 * learner cannot skip tier 2 by having tier-4 evidence in one narrow area.
 * Placement is a floor on what to deliver, never a verdict on the person.
 */
export function tierFor(evidence: BehaviouralEvidence, habitAdherencePercent: number): AbsorptionTier {
  // Tier 2 opens once attendance is real.
  if (evidence.activeDays < 4) return 1;

  // Tier 3 opens once a rhythm holds and a baseline exists.
  if (evidence.activeDays < 12 || evidence.fullTests < 1) return 2;

  // Tier 4 opens once effort is aimed by evidence rather than by feel. An
  // unmeasured signal blocks the gate: absence of evidence never opens a tier.
  if (habitAdherencePercent < 60 || (evidence.edgePracticeRate ?? 0) < 0.45) return 3;

  // Tier 5 opens once the method survives without scaffolding.
  if (habitAdherencePercent < 80 || (evidence.errorClosureRate ?? 0) < 0.7 || evidence.fullTests < 3) {
    return 4;
  }

  return 5;
}

/* ------------------------------------------------------------------ */
/* Coaching                                                            */
/* ------------------------------------------------------------------ */

export interface CoachingCue {
  pillar: PillarId;
  /** The observation, stated as fact. */
  observation: string;
  observationVi: string;
  /** The single next move. */
  move: string;
  moveVi: string;
  /** The habit to start, if one applies. */
  habitId?: string;
}

/**
 * The next move for a learner, derived from the limiting pillar.
 *
 * Deliberately returns one cue, not a list. A coach handed five priorities
 * has none, and the whole point of naming a limiting pillar is that the other
 * three can wait.
 */
export function nextMove(profile: GitaProfile): CoachingCue {
  const pillar = profile.limitingPillar;
  const score = profile.pillars[pillar].score;

  const cues: Record<PillarId, CoachingCue> = {
    goal: {
      pillar: 'goal',
      observation: 'Effort is going in, but it is not aimed at anything specific enough to compound.',
      observationVi: 'Có nỗ lực, nhưng chưa nhắm vào điều gì đủ cụ thể để tích luỹ.',
      move: 'Set the target score and date, then name the one skill this week is for.',
      moveVi: 'Chốt điểm mục tiêu và ngày thi, rồi gọi tên một kỹ năng duy nhất cho tuần này.',
      habitId: 'h-weekly-review',
    },
    inspirits: {
      pillar: 'inspirits',
      observation: 'The plan is sound; what is missing is the fuel to run it on an ordinary day.',
      observationVi: 'Kế hoạch ổn; thiếu là nguồn lực để chạy nó vào một ngày bình thường.',
      move: 'Work on why this matters before touching method again. Start the family table habit.',
      moveVi: 'Làm rõ vì sao điều này quan trọng, trước khi động lại vào phương pháp. Bắt đầu thói quen bàn ăn gia đình.',
      habitId: 'h-family-table',
    },
    talent: {
      pillar: 'talent',
      observation: 'Time is spread evenly, so nothing is becoming excellent.',
      observationVi: 'Thời gian chia đều, nên chưa có gì trở nên xuất sắc.',
      move: 'Read the skill map first, then drill only at the edge of ability.',
      moveVi: 'Đọc bản đồ kỹ năng trước, rồi chỉ luyện ở ngưỡng khó.',
      habitId: 'h-edge-practice',
    },
    action: {
      pillar: 'action',
      observation: 'Understanding is ahead of accumulation. Sessions are not reliably happening.',
      observationVi: 'Hiểu đi trước tích luỹ. Các buổi học chưa diễn ra đều đặn.',
      move: 'Fix one time and one place, and log every session for two weeks before changing anything else.',
      moveVi: 'Cố định một giờ và một chỗ, ghi lại mọi buổi trong hai tuần trước khi đổi bất cứ điều gì khác.',
      habitId: 'h-fixed-slot',
    },
  };

  const cue = cues[pillar];

  // When every pillar is already strong, the move is to widen the arena rather
  // than to keep polishing what is working.
  if (score >= 75) {
    return {
      pillar,
      observation: 'All four pillars are holding. The method now needs somewhere harder to prove itself.',
      observationVi: 'Cả bốn trụ đều vững. Giờ mô thức cần một nơi khó hơn để tự chứng minh.',
      move: 'Take one habit into a domain outside study and sustain it for a month.',
      moveVi: 'Mang một thói quen sang lĩnh vực ngoài việc học và duy trì trọn một tháng.',
      habitId: 'h-transfer-habit',
    };
  }

  return cue;
}

/** Pillar names, for the profile view. */
export function pillarSummary(profile: GitaProfile, locale: 'vi' | 'en') {
  return PILLAR_ORDER.map((id) => ({
    id,
    label: locale === 'vi' ? PILLARS[id].labelVi : PILLARS[id].label,
    letter: PILLARS[id].letter,
    color: PILLARS[id].color,
    score: profile.pillars[id].score,
    confidence: profile.pillars[id].confidence,
    essence: locale === 'vi' ? PILLARS[id].essenceVi : PILLARS[id].essence,
    failureMode: locale === 'vi' ? PILLARS[id].failureModeVi : PILLARS[id].failureMode,
  }));
}

export { HABIT_BY_ID };
