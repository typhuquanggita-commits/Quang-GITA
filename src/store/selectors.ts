import { SECTIONS } from '../config';
import { findQuestion } from '../data/questions';
import { TOPICS } from '../data/topics';
import {
  countBlanks,
  currentStreak,
  readiness,
  summarize,
  type ReadinessBreakdown,
} from '../lib/analytics';
import { daysUntil } from '../lib/format';
import { topicsInScope } from '../lib/section3';
import { dueCards } from '../lib/srs';
import type { Attempt, PersistedState, SrsCard } from '../types';

export function activeAttempt(state: PersistedState): Attempt | undefined {
  return [...state.attempts].reverse().find((a) => a.status === 'in_progress');
}

export function attemptById(state: PersistedState, id: string): Attempt | undefined {
  return state.attempts.find((a) => a.id === id);
}

export function srsCards(state: PersistedState): SrsCard[] {
  return Object.values(state.srs);
}

export function dueNow(state: PersistedState, now: number = Date.now()): SrsCard[] {
  return dueCards(srsCards(state), now);
}

/**
 * Chi so san sang. Gop tu nhieu nguon nen tinh mot lan o day thay vi rai rac
 * trong tung man hinh — bao dam moi cho hien thi cung mot con so.
 */
export function readinessOf(state: PersistedState, now: Date = new Date()): ReadinessBreakdown {
  const summary = summarize(state);
  const cards = srsCards(state);
  const overdue = dueNow(state, now.getTime()).length;

  const practicedTopics = new Set(
    Object.values(state.mastery)
      .filter((m) => m.attempts > 0)
      .map((m) => m.topicId),
  );

  const last14 = new Set<string>();
  for (const [key, log] of Object.entries(state.days)) {
    const diff = daysUntil(key, now);
    if (diff <= 0 && diff > -14 && log.questions > 0) last14.add(key);
  }

  const lastResult = state.results[state.results.length - 1];
  const lastAttempt = lastResult ? attemptById(state, lastResult.attemptId) : undefined;
  const paceRatio = lastAttempt
    ? lastAttempt.sections.reduce((sum, run) => sum + run.elapsedMs / 1000, 0) /
      Math.max(1, lastAttempt.sections.reduce((sum, run) => sum + run.allowedSeconds, 0))
    : 0.9;

  return readiness({
    projectedScore: summary.projected,
    targetScore: state.settings.targetScore,
    topicsPracticed: practicedTopics.size,
    topicsTotal: relevantTopicCount(state),
    activeDaysLast14: last14.size,
    paceRatio,
    overdueCards: overdue,
    totalCards: cards.length,
  });
}

/** Chi dem cac chu de thuoc mon tu chon ma nguoi hoc thuc su thi. */
export function relevantTopicCount(state: PersistedState): number {
  return topicsInScope(state.settings.section3, TOPICS).length;
}

export function blanksInLatest(state: PersistedState): number {
  const lastResult = state.results[state.results.length - 1];
  if (!lastResult) return 0;
  const attempt = attemptById(state, lastResult.attemptId);
  if (!attempt) return 0;
  return countBlanks(attempt.responses, attempt.sections.flatMap((s) => s.questionIds));
}

export function streakOf(state: PersistedState): number {
  return currentStreak(state.days);
}

/** Chuoi diem cac lan thi thu, dung cho bieu do xu huong. */
export function scoreHistory(state: PersistedState): Array<{ at: number; total: number; label: string }> {
  return state.results.map((result) => {
    const attempt = attemptById(state, result.attemptId);
    return { at: result.submittedAt, total: result.total, label: attempt?.label ?? 'Bài thi' };
  });
}

/** Cac cau trong so tay loi sai, kem du lieu cau hoi. */
export function mistakeNotebook(state: PersistedState) {
  return Object.values(state.srs)
    .map((card) => ({ card, question: findQuestion(card.questionId) }))
    .filter((entry): entry is { card: SrsCard; question: NonNullable<typeof entry.question> } =>
      Boolean(entry.question),
    )
    .sort((a, b) => a.card.due - b.card.due);
}

export function sectionProgress(state: PersistedState) {
  return SECTIONS.map((spec) => {
    const topics = topicsInScope(state.settings.section3, TOPICS).filter((t) => t.section === spec.id);
    const values = topics.map((t) => state.mastery[t.id]?.mastery ?? 0.5);
    const practiced = topics.filter((t) => (state.mastery[t.id]?.attempts ?? 0) > 0).length;
    const average = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0.5;
    return { spec, mastery: average, practiced, topics: topics.length };
  });
}
