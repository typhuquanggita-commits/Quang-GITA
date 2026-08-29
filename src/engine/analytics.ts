/**
 * Derived analytics over the learner's response history.
 *
 * Everything here is a pure function of stored attempts, so the same numbers
 * appear on the dashboard, in the score report, and in an exported backup
 * without a separate aggregation pipeline to keep in sync.
 */

import type {
  Attempt,
  DomainId,
  Question,
  Response,
  SectionId,
  SkillId,
} from '../types.ts';
import { estimateAbility, pCorrect, type ScoredResponse } from './irt.ts';
import { isoDate, mean, median } from '../lib/util.ts';

export interface ResponseRecord {
  response: Response;
  question: Question;
  attemptId: string;
  at: number;
}

/** Flattens every scored response across attempts into one chronological log. */
export function collectResponses(
  attempts: readonly Attempt[],
  questions: Map<string, Question>,
): ResponseRecord[] {
  const out: ResponseRecord[] = [];
  for (const attempt of attempts) {
    for (const response of Object.values(attempt.responses)) {
      const question = questions.get(response.questionId);
      if (!question) continue;
      if (response.value === null || response.value === '') continue;
      out.push({
        response,
        question,
        attemptId: attempt.id,
        at: response.lastChangedAt ?? attempt.startedAt,
      });
    }
  }
  return out.sort((a, b) => a.at - b.at);
}

export interface SkillStat {
  skill: SkillId;
  domain: DomainId;
  section: SectionId;
  attempted: number;
  correct: number;
  accuracy: number;
  /** Modelled probability of success on a medium item. */
  mastery: number;
  theta: number;
  meanSeconds: number;
  /** Positive when improving: accuracy in the recent half minus the older half. */
  trend: number;
}

export function skillStats(records: readonly ResponseRecord[]): SkillStat[] {
  const buckets = new Map<SkillId, ResponseRecord[]>();
  for (const record of records) {
    const list = buckets.get(record.question.skill) ?? [];
    list.push(record);
    buckets.set(record.question.skill, list);
  }

  const out: SkillStat[] = [];
  for (const [skill, list] of buckets) {
    const scored: ScoredResponse[] = list.map((r) => ({
      item: r.question.irt,
      correct: Boolean(r.response.correct),
    }));
    const { theta } = estimateAbility(scored);
    const correct = scored.filter((s) => s.correct).length;

    const half = Math.floor(list.length / 2);
    const older = list.slice(0, half);
    const recent = list.slice(half);
    const rate = (items: ResponseRecord[]) =>
      items.length === 0 ? 0 : items.filter((r) => r.response.correct).length / items.length;

    out.push({
      skill,
      domain: list[0].question.domain,
      section: list[0].question.section,
      attempted: list.length,
      correct,
      accuracy: list.length === 0 ? 0 : correct / list.length,
      mastery: pCorrect(theta, { a: 1, b: 0 }),
      theta,
      meanSeconds: mean(list.map((r) => r.response.msSpent / 1000)),
      trend: half >= 2 ? rate(recent) - rate(older) : 0,
    });
  }

  return out.sort((a, b) => a.mastery - b.mastery);
}

/**
 * Skills worth working on next: low mastery, but with enough evidence that the
 * estimate means something. Skills never attempted are surfaced separately so
 * a learner is not told to "improve" something they have not tried.
 */
export function weakestSkills(stats: readonly SkillStat[], limit = 5): SkillStat[] {
  return stats.filter((s) => s.attempted >= 3).slice(0, limit);
}

export function strongestSkills(stats: readonly SkillStat[], limit = 5): SkillStat[] {
  return [...stats].filter((s) => s.attempted >= 3).sort((a, b) => b.mastery - a.mastery).slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Error taxonomy                                                      */
/* ------------------------------------------------------------------ */

export type ErrorKind = 'concept' | 'careless' | 'timeout' | 'omitted';

/**
 * Classifies a wrong answer so remediation can be targeted. A concept gap and
 * a careless slip need completely different responses, and lumping them into
 * one "wrong" count hides that.
 */
export function classifyError(record: ResponseRecord): ErrorKind | null {
  const { response, question } = record;
  if (response.value === null || response.value === '') return 'omitted';
  if (response.correct) return null;

  const seconds = response.msSpent / 1000;
  if (seconds < question.targetSeconds * 0.35) return 'timeout';

  // A slip: the learner clearly knows the material for this skill's difficulty
  // but answered quickly relative to what the item demands.
  if (seconds < question.targetSeconds * 0.7 && question.band !== 'hard') return 'careless';

  return 'concept';
}

export function errorMix(records: readonly ResponseRecord[]): Record<ErrorKind, number> {
  const mix: Record<ErrorKind, number> = { concept: 0, careless: 0, timeout: 0, omitted: 0 };
  for (const record of records) {
    const kind = classifyError(record);
    if (kind) mix[kind] += 1;
  }
  return mix;
}

/* ------------------------------------------------------------------ */
/* Pacing                                                              */
/* ------------------------------------------------------------------ */

export interface PacingStat {
  band: 'easy' | 'medium' | 'hard';
  medianSeconds: number;
  targetSeconds: number;
  accuracy: number;
  count: number;
}

export function pacingByBand(records: readonly ResponseRecord[]): PacingStat[] {
  const bands: Array<'easy' | 'medium' | 'hard'> = ['easy', 'medium', 'hard'];
  return bands.map((band) => {
    const list = records.filter((r) => r.question.band === band);
    return {
      band,
      medianSeconds: Math.round(median(list.map((r) => r.response.msSpent / 1000))),
      targetSeconds: Math.round(mean(list.map((r) => r.question.targetSeconds))),
      accuracy: list.length === 0 ? 0 : list.filter((r) => r.response.correct).length / list.length,
      count: list.length,
    };
  });
}

/* ------------------------------------------------------------------ */
/* Activity                                                            */
/* ------------------------------------------------------------------ */

/** Consecutive days ending today (or yesterday) with recorded study time. */
export function currentStreak(activity: Record<string, number>, today = isoDate()): number {
  let streak = 0;
  const cursor = new Date(`${today}T00:00:00`);

  // Allow the streak to survive until the end of the following day.
  if (!activity[today]) cursor.setDate(cursor.getDate() - 1);

  for (;;) {
    const key = isoDate(cursor);
    if (!activity[key] || activity[key] <= 0) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function activityHeatmap(
  activity: Record<string, number>,
  days = 91,
  today = isoDate(),
): Array<{ date: string; seconds: number; level: 0 | 1 | 2 | 3 | 4 }> {
  const out: Array<{ date: string; seconds: number; level: 0 | 1 | 2 | 3 | 4 }> = [];
  const cursor = new Date(`${today}T00:00:00`);
  cursor.setDate(cursor.getDate() - (days - 1));
  for (let i = 0; i < days; i += 1) {
    const date = isoDate(cursor);
    const seconds = activity[date] ?? 0;
    const minutes = seconds / 60;
    const level: 0 | 1 | 2 | 3 | 4 =
      minutes === 0 ? 0 : minutes < 15 ? 1 : minutes < 35 ? 2 : minutes < 60 ? 3 : 4;
    out.push({ date, seconds, level });
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Trend                                                               */
/* ------------------------------------------------------------------ */

export interface ThetaPoint {
  at: number;
  theta: number;
  n: number;
}

/**
 * Rolling ability estimate over the response log, so improvement is visible
 * between full-length tests rather than only at them.
 */
export function thetaTrend(
  records: readonly ResponseRecord[],
  section: SectionId,
  window = 25,
): ThetaPoint[] {
  const filtered = records.filter((r) => r.question.section === section);
  if (filtered.length < 5) return [];

  const out: ThetaPoint[] = [];
  const step = Math.max(1, Math.floor(window / 3));
  for (let end = Math.min(window, filtered.length); end <= filtered.length; end += step) {
    const slice = filtered.slice(Math.max(0, end - window), end);
    const { theta } = estimateAbility(
      slice.map((r) => ({ item: r.question.irt, correct: Boolean(r.response.correct) })),
    );
    out.push({ at: slice[slice.length - 1].at, theta, n: slice.length });
  }
  return out;
}

/** Domain coverage: how much evidence exists per domain, versus a healthy floor. */
export function domainCoverage(
  records: readonly ResponseRecord[],
  section: SectionId,
): Array<{ domain: DomainId; count: number; accuracy: number }> {
  const buckets = new Map<DomainId, ResponseRecord[]>();
  for (const record of records) {
    if (record.question.section !== section) continue;
    const list = buckets.get(record.question.domain) ?? [];
    list.push(record);
    buckets.set(record.question.domain, list);
  }
  return [...buckets.entries()].map(([domain, list]) => ({
    domain,
    count: list.length,
    accuracy: list.filter((r) => r.response.correct).length / list.length,
  }));
}
