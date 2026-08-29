/**
 * The learner's dossier.
 *
 * Everything the platform knows about one person, assembled into a single
 * record — and, from that record, the pathway it recommends with the evidence
 * for each step attached.
 *
 * The reason this is one module rather than a screen that reaches into six
 * others: a personalised route is only as trustworthy as the reader's ability
 * to check it. A dossier that showed a recommendation without the observation
 * behind it would be asking to be believed, which is the opposite of what a
 * study record is for. Every step here therefore carries its own evidence, in
 * both languages, and any step whose evidence is missing is not generated at
 * all.
 *
 * That last rule is the one that matters. A brand-new learner produces a
 * short, honest dossier that says what has not been measured yet. Filling it
 * with plausible defaults would produce a confident, complete-looking document
 * about somebody who does not exist.
 */

import type { Attempt, SectionId, SkillId } from '../types.ts';
import { collectResponses, currentStreak, errorMix, skillStats, thetaTrend, type ErrorKind, type ResponseRecord } from './analytics.ts';
import type { Question } from '../types.ts';
import { thetaToScaled } from './scoring.ts';
import { daysBetween, isoDate } from '../lib/util.ts';

/* ------------------------------------------------------------------ */
/* What a dossier holds                                                */
/* ------------------------------------------------------------------ */

export interface ScorePoint {
  attemptId: string;
  label: string;
  /** Local calendar date of submission. */
  date: string;
  total: number;
  band: [number, number];
}

export interface SkillLine {
  skill: SkillId;
  section: SectionId;
  attempted: number;
  mastery: number;
  /** Change in mastery across the response history, or null with too little. */
  trend: number | null;
  /** Whether the lesson for this skill has been read. */
  taught: boolean;
}

export type StepKind = 'measure' | 'learn' | 'drill' | 'pace' | 'habit' | 'review' | 'consolidate';

export interface PathwayStep {
  kind: StepKind;
  /** Lower runs first. Stable across rebuilds so a route does not reshuffle. */
  order: number;
  title: string;
  titleVi: string;
  /** What was observed. Never a recommendation dressed as a fact. */
  because: string;
  becauseVi: string;
  /** The skill this step is about, when it is about one. */
  skill?: SkillId;
}

export interface Dossier {
  generatedAt: string;
  /* ---- Measurement ---- */
  scores: ScorePoint[];
  latestTotal: number | null;
  targetTotal: number;
  testDate: string | null;
  daysToTest: number | null;
  /* ---- Learning ---- */
  responsesRecorded: number;
  skills: SkillLine[];
  errors: Record<ErrorKind, number>;
  /** Theta trajectory per section, for the trend chart. */
  trajectory: Record<SectionId, Array<{ at: number; theta: number }>>;
  /* ---- Practice behaviour ---- */
  streak: number;
  activeDays28: number;
  lessonsRead: number;
  lessonsTotal: number;
  /* ---- The route ---- */
  pathway: PathwayStep[];
  /** Signals with no evidence behind them yet, named so the reader knows. */
  unmeasured: string[];
  unmeasuredVi: string[];
}

/* ------------------------------------------------------------------ */
/* Thresholds                                                          */
/* ------------------------------------------------------------------ */

/** Below this a skill's mastery is noise, and it is not put in a route. */
const MIN_FOR_SKILL = 4;
/** Below this the whole response history says nothing yet. */
const MIN_RESPONSES = 20;
/** Mastery under this counts as weak enough to act on. */
const WEAK_AT = 0.55;
/** Share of errors that makes one kind dominant rather than merely present. */
const DOMINANT_SHARE = 0.4;

export interface DossierInput {
  attempts: readonly Attempt[];
  questions: Map<string, Question>;
  targetTotal: number;
  testDate: string | null;
  activity: Record<string, number>;
  activeDays28: number;
  /** Skill ids whose lesson has been read. */
  lessonsRead: readonly SkillId[];
  lessonsTotal: number;
  /** Skills the lesson library covers, so a route only names ones it can teach. */
  teachableSkills: ReadonlySet<SkillId>;
  today?: string;
}

export function buildDossier(input: DossierInput): Dossier {
  const today = input.today ?? isoDate();
  const records = collectResponses(input.attempts, input.questions);

  const scores = scorePoints(input.attempts);
  const latestTotal = scores.length > 0 ? scores[scores.length - 1].total : null;

  const stats = skillStats(records);
  const readSet = new Set(input.lessonsRead);
  const skills: SkillLine[] = stats
    .filter((s) => s.attempted >= MIN_FOR_SKILL)
    .map((s) => ({
      skill: s.skill,
      section: s.section,
      attempted: s.attempted,
      mastery: s.mastery,
      trend: s.attempted >= MIN_FOR_SKILL * 2 ? s.trend : null,
      taught: readSet.has(s.skill),
    }))
    .sort((a, b) => a.mastery - b.mastery);

  const errors = errorMix(records);

  const { unmeasured, unmeasuredVi } = namedGaps({
    records,
    scores,
    skills,
    testDate: input.testDate,
  });

  return {
    generatedAt: today,
    scores,
    latestTotal,
    targetTotal: input.targetTotal,
    testDate: input.testDate,
    daysToTest: input.testDate ? daysBetween(today, input.testDate) : null,
    responsesRecorded: records.length,
    skills,
    errors,
    trajectory: {
      rw: thetaTrend(records, 'rw'),
      math: thetaTrend(records, 'math'),
    },
    streak: currentStreak(input.activity, today),
    activeDays28: input.activeDays28,
    lessonsRead: input.lessonsRead.length,
    lessonsTotal: input.lessonsTotal,
    pathway: buildPathway({
      records,
      scores,
      skills,
      errors,
      teachableSkills: input.teachableSkills,
      daysToTest: input.testDate ? daysBetween(today, input.testDate) : null,
      activeDays28: input.activeDays28,
    }),
    unmeasured,
    unmeasuredVi,
  };
}

/* ------------------------------------------------------------------ */
/* Score history                                                       */
/* ------------------------------------------------------------------ */

function scorePoints(attempts: readonly Attempt[]): ScorePoint[] {
  return attempts
    .filter((a) => a.status === 'submitted' && a.score && a.score.sections.length === 2)
    .sort((a, b) => (a.submittedAt ?? 0) - (b.submittedAt ?? 0))
    .map((a) => ({
      attemptId: a.id,
      label: a.label,
      date: isoDate(new Date(a.submittedAt ?? Date.now())),
      total: a.score!.total,
      band: a.score!.totalBand,
    }));
}

/* ------------------------------------------------------------------ */
/* What has not been measured                                          */
/* ------------------------------------------------------------------ */

function namedGaps(input: {
  records: ResponseRecord[];
  scores: ScorePoint[];
  skills: SkillLine[];
  testDate: string | null;
}): { unmeasured: string[]; unmeasuredVi: string[] } {
  const unmeasured: string[] = [];
  const unmeasuredVi: string[] = [];

  const add = (en: string, vi: string) => {
    unmeasured.push(en);
    unmeasuredVi.push(vi);
  };

  if (input.scores.length === 0) {
    add(
      'No full-length test has been scored, so there is no score on record and no baseline to project from.',
      'Chưa có bài thi thử full-length nào được chấm, nên chưa có điểm trong hồ sơ và chưa có mốc xuất phát để dự báo.',
    );
  }
  if (input.records.length < MIN_RESPONSES) {
    add(
      `Only ${input.records.length} responses are recorded; skill estimates need more before they mean anything.`,
      `Mới có ${input.records.length} lượt trả lời; ước lượng theo kỹ năng cần nhiều hơn thì mới có nghĩa.`,
    );
  }
  if (input.skills.length === 0) {
    add(
      `No skill has reached ${MIN_FOR_SKILL} responses, so none is ranked. A skill with two responses is noise, not a weakness.`,
      `Chưa kỹ năng nào đạt ${MIN_FOR_SKILL} lượt trả lời nên chưa xếp hạng được. Một kỹ năng mới hai câu là nhiễu, không phải điểm yếu.`,
    );
  }
  if (!input.testDate) {
    add(
      'No test date is set, so the route cannot be paced and no taper is scheduled.',
      'Chưa đặt ngày thi, nên lộ trình chưa định được nhịp và chưa xếp được giai đoạn giảm tải.',
    );
  }

  return { unmeasured, unmeasuredVi };
}

/* ------------------------------------------------------------------ */
/* The route                                                           */
/* ------------------------------------------------------------------ */

function buildPathway(input: {
  records: ResponseRecord[];
  scores: ScorePoint[];
  skills: SkillLine[];
  errors: Record<ErrorKind, number>;
  teachableSkills: ReadonlySet<SkillId>;
  daysToTest: number | null;
  activeDays28: number;
}): PathwayStep[] {
  const steps: PathwayStep[] = [];

  /* ---- Measure before prescribing ---- */
  if (input.scores.length === 0) {
    steps.push({
      kind: 'measure',
      order: 0,
      title: 'Sit a full-length test',
      titleVi: 'Làm một bài thi thử full-length',
      because:
        'Nothing has been scored yet. Every step after this one is aimed by a measurement, and there is nothing to aim with.',
      becauseVi:
        'Chưa có gì được chấm. Mọi bước sau đều được nhắm bằng một phép đo, mà hiện chưa có phép đo nào.',
    });
    // Deliberately the only step. A route built on no evidence would be a
    // guess wearing the costume of a plan.
    return steps;
  }

  /* ---- Attendance before content ---- */
  if (input.activeDays28 < 8) {
    steps.push({
      kind: 'habit',
      order: 1,
      title: 'Build the study rhythm first',
      titleVi: 'Dựng nhịp học trước đã',
      because: `Only ${input.activeDays28} study days in the last 28. No content plan survives a schedule that is not kept.`,
      becauseVi: `Chỉ ${input.activeDays28} ngày học trong 28 ngày qua. Không kế hoạch nội dung nào sống nổi với một lịch không được giữ.`,
    });
  }

  /* ---- Errors that are not about knowledge ---- */
  const totalErrors = Object.values(input.errors).reduce((a, b) => a + b, 0);
  if (totalErrors >= 10) {
    const careless = input.errors.careless / totalErrors;
    const timing = (input.errors.timeout + input.errors.omitted) / totalErrors;

    if (careless >= DOMINANT_SHARE) {
      steps.push({
        kind: 'pace',
        order: 2,
        title: 'Fix the slips before adding difficulty',
        titleVi: 'Sửa lỗi ẩu trước khi tăng độ khó',
        because: `${Math.round(careless * 100)}% of mistakes are careless — answered fast on material already known. Harder practice does not recover these marks; a checking routine does.`,
        becauseVi: `${Math.round(careless * 100)}% lỗi là do ẩu — trả lời nhanh trên phần đã biết. Luyện khó hơn không lấy lại được số điểm này; một quy trình kiểm tra lại thì có.`,
      });
    }
    if (timing >= DOMINANT_SHARE) {
      steps.push({
        kind: 'pace',
        order: 3,
        title: 'Work on pacing and triage',
        titleVi: 'Xử lý nhịp độ và cách bỏ câu',
        because: `${Math.round(timing * 100)}% of mistakes are questions that ran out of time or were left blank. That is a clock problem, not a knowledge problem.`,
        becauseVi: `${Math.round(timing * 100)}% lỗi là câu hết giờ hoặc bỏ trống. Đó là vấn đề đồng hồ, không phải vấn đề kiến thức.`,
      });
    }
  }

  /* ---- Teach, then drill ---- */
  const weak = input.skills.filter((s) => s.mastery < WEAK_AT);
  const untaught = weak.filter((s) => !s.taught && input.teachableSkills.has(s.skill));

  for (const [index, skill] of untaught.slice(0, 3).entries()) {
    steps.push({
      kind: 'learn',
      order: 10 + index,
      skill: skill.skill,
      title: `Read the lesson for ${skill.skill}`,
      titleVi: `Đọc bài giảng cho ${skill.skill}`,
      because: `Mastery ${Math.round(skill.mastery * 100)}% across ${skill.attempted} responses, and this lesson has never been read. Drilling a skill nobody explained rehearses the misconception.`,
      becauseVi: `Thành thạo ${Math.round(skill.mastery * 100)}% trên ${skill.attempted} câu, và bài giảng này chưa từng được đọc. Luyện một kỹ năng chưa ai giảng chỉ là lặp lại cách hiểu sai.`,
    });
  }

  const taughtButWeak = weak.filter((s) => s.taught);
  for (const [index, skill] of taughtButWeak.slice(0, 3).entries()) {
    steps.push({
      kind: 'drill',
      order: 20 + index,
      skill: skill.skill,
      title: `Drill ${skill.skill} at the edge of what you can do`,
      titleVi: `Luyện ${skill.skill} ngay ở ngưỡng năng lực`,
      because: `Mastery ${Math.round(skill.mastery * 100)}% and the lesson has been read, so the gap is practice rather than instruction.`,
      becauseVi: `Thành thạo ${Math.round(skill.mastery * 100)}% và bài giảng đã đọc, nên chỗ thiếu là luyện tập chứ không phải hướng dẫn.`,
    });
  }

  /* ---- Consolidate what is already strong ---- */
  const strong = input.skills.filter((s) => s.mastery >= 0.8);
  if (strong.length >= 3 && weak.length === 0) {
    steps.push({
      kind: 'consolidate',
      order: 30,
      title: 'Hold the gains under time pressure',
      titleVi: 'Giữ vững thành quả dưới áp lực thời gian',
      because: `${strong.length} skills are at 80% or better and none is weak. What is left is proving it holds on a full-length clock.`,
      becauseVi: `${strong.length} kỹ năng đạt từ 80% trở lên và không kỹ năng nào yếu. Việc còn lại là chứng minh nó đứng vững trong một bài thi đủ thời lượng.`,
    });
  }

  /* ---- Rehearsal cadence ---- */
  if (input.daysToTest !== null && input.daysToTest > 10 && input.scores.length < 3) {
    steps.push({
      kind: 'review',
      order: 40,
      title: 'Schedule the next full-length rehearsal',
      titleVi: 'Xếp lịch bài thi thử tiếp theo',
      because: `${input.scores.length} full-length test${input.scores.length === 1 ? '' : 's'} on record with ${input.daysToTest} days to go. A score from one sitting is a single observation, not a trend.`,
      becauseVi: `Mới ${input.scores.length} bài thi thử trong hồ sơ, còn ${input.daysToTest} ngày. Điểm từ một lần thi là một quan sát đơn lẻ, chưa phải xu hướng.`,
    });
  }

  return steps.sort((a, b) => a.order - b.order);
}

/** Points still to close between the latest score and the target, or null. */
export function gapToTarget(dossier: Dossier): number | null {
  if (dossier.latestTotal === null) return null;
  return dossier.targetTotal - dossier.latestTotal;
}

/** Change between the first and latest scored total, or null with one score. */
export function scoreMovement(dossier: Dossier): number | null {
  if (dossier.scores.length < 2) return null;
  return dossier.scores[dossier.scores.length - 1].total - dossier.scores[0].total;
}

export function thetaToTotal(rw: number, math: number): number {
  return thetaToScaled(rw) + thetaToScaled(math);
}
