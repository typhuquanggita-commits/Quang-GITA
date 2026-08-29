/**
 * Feeds the automated coach from live platform state.
 *
 * Every figure the rules read is derived here from data the learner already
 * produced. Nothing is asked of them twice, and nothing is invented: where a
 * signal cannot be measured yet it arrives as null and the rules that depend
 * on it simply do not fire.
 */

import { useMemo } from 'react';
import type { DomainId, SectionId } from '../types.ts';
import { QUESTION_BY_ID } from '../data/bank.ts';
import { DOMAINS } from '../data/blueprint.ts';
import { useStore, selectExposure, selectScoredAttempts } from '../state/store.tsx';
import { useGitaProfile } from '../gita/useGitaProfile.ts';
import { adherence } from '../gita/habits.ts';
import { collectResponses, currentStreak, errorMix, skillStats } from './analytics.ts';
import { assignmentsForStudent } from '../auth/model.ts';
import { buildContext, buildProgramme, type DailyProgramme } from './autopilot.ts';
import { isoDate } from '../lib/util.ts';

const DAY_MS = 86400000;

export interface AutopilotView {
  programme: DailyProgramme;
  /** Minutes per day the learner committed to, derived from the plan. */
  dailyMinutes: number;
}

export function useAutopilot(): AutopilotView {
  const { state } = useStore();
  const gita = useGitaProfile();

  return useMemo(() => {
    const today = isoDate();
    const now = Date.now();
    const records = collectResponses(state.attempts, QUESTION_BY_ID);
    const answered = records.filter((r) => r.response.value !== null);

    /* ---- Attendance ---- */
    const daysAgo = (date: string) =>
      Math.floor((Date.parse(`${today}T00:00:00`) - Date.parse(`${date}T00:00:00`)) / DAY_MS);

    const activity = Object.entries(state.activity).filter(([, seconds]) => seconds > 0);
    const activeDays7 = activity.filter(([date]) => {
      const age = daysAgo(date);
      return age >= 0 && age < 7;
    }).length;
    const activeDays28 = activity.filter(([date]) => {
      const age = daysAgo(date);
      return age >= 0 && age < 28;
    }).length;
    const minutes7 =
      activity
        .filter(([date]) => {
          const age = daysAgo(date);
          return age >= 0 && age < 7;
        })
        .reduce((acc, [, seconds]) => acc + seconds, 0) / 60;

    /* ---- Accuracy trend: two adjacent windows of fifty ---- */
    const recentWindow = answered.slice(-50);
    const priorWindow = answered.slice(-100, -50);
    const rate = (rows: typeof answered) =>
      rows.length < 20 ? null : rows.filter((r) => r.response.correct).length / rows.length;

    /* ---- Review debt ---- */
    const cards = Object.values(state.srs).filter((c) => c.ref.startsWith('q:'));
    const dueCards = cards.filter((c) => c.dueAt <= now).length;
    const overdueCards = cards.filter((c) => c.dueAt <= now - 3 * DAY_MS).length;

    /* ---- Domain coverage ---- */
    const domainCounts: Array<{ domain: DomainId; section: SectionId; count: number }> = DOMAINS.map(
      (domain) => ({
        domain: domain.id,
        section: domain.section,
        count: answered.filter((r) => r.question.domain === domain.id).length,
      }),
    );

    /* ---- Weak skills with enough evidence to act on ---- */
    const weakSkills = skillStats(records)
      .filter((s) => s.attempted >= 3)
      .slice(0, 5)
      .map((s) => ({ skill: s.skill, section: s.section, mastery: s.mastery, attempted: s.attempted }));

    /* ---- Tests ---- */
    const scored = selectScoredAttempts(state).filter((a) => a.mode !== 'practice');
    const lastFullTest = scored.find((a) => a.mode === 'full-test' || a.mode === 'diagnostic');

    /* ---- Habit adherence, over two windows ---- */
    const adherenceOver = (days: number) =>
      gita.activeHabits.length === 0
        ? 0
        : gita.activeHabits.reduce(
            (acc, habit) => acc + adherence(state.gita.habitLog, habit, days, new Date()),
            0,
          ) / gita.activeHabits.length;

    /* ---- Assignments the learner still owes ---- */
    const me = state.org.currentAccountId;
    const assignmentsDue = assignmentsForStudent(state.org, me)
      .filter((a) => !a.submittedBy.includes(me))
      .map((a) => ({
        id: a.id,
        title: a.title,
        dueDate: a.dueDate,
        kind: a.kind,
        minutes: a.kind === 'full-test' ? 145 : a.kind === 'section-test' ? 70 : 25,
      }));

    /* ---- Commitment ---- */
    const weeklyHours = state.plan?.hoursPerWeek ?? 8;
    const dailyMinutes = Math.max(15, Math.round((weeklyHours * 60) / 7));

    const context = buildContext({
      today,
      testDate: state.profile.testDate,
      targetTotal: state.profile.targetScore,
      lastTotal: scored[0]?.score?.total ?? null,
      fullTests: scored.length,
      lastFullTestAt: lastFullTest?.submittedAt ?? null,
      responseCount: answered.length,
      recentAccuracy: rate(recentWindow),
      priorAccuracy: rate(priorWindow),
      theta: { rw: state.sectionAbility.rw.theta, math: state.sectionAbility.math.theta },
      errors: errorMix(records),
      weakSkills,
      domainCounts,
      dueCards,
      overdueCards,
      activeDays7,
      activeDays28,
      streak: currentStreak(state.activity, today),
      minutes7,
      minutesTarget7: weeklyHours * 60,
      habitAdherence: adherenceOver(28),
      habitAdherence7: adherenceOver(7),
      tier: gita.tier,
      limitingPillar: gita.profile.limitingPillar,
      pillarScores: {
        goal: gita.profile.pillars.goal.score,
        inspirits: gita.profile.pillars.inspirits.score,
        talent: gita.profile.pillars.talent.score,
        action: gita.profile.pillars.action.score,
      },
      gitaConfidence: gita.profile.confidence,
      assignmentsDue,
      lastAttemptBlurs: scored[0]
        ? scored[0].integrity.filter((e) => e.kind === 'blur').length
        : 0,
    });

    const programme = buildProgramme({
      context,
      theta: context.theta,
      exposure: selectExposure(state),
      dailyMinutes,
    });

    return { programme, dailyMinutes };
  }, [state, gita]);
}
