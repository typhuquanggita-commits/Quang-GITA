/**
 * Derives the GITA profile from what the platform already knows.
 *
 * The point of this file is that a learner is never asked to describe their
 * own consistency: the response log, the review record, and the habit log
 * already say it. Only the dimensions with no behavioural proxy — belief,
 * desire, standards — come from self-report.
 */

import { useMemo } from 'react';
import { useStore } from '../state/store.tsx';
import { QUESTION_BY_ID } from '../data/bank.ts';
import { collectResponses, currentStreak, skillStats } from '../engine/analytics.ts';
import { inProductiveZone } from '../engine/adaptive.ts';
import { isMastered } from '../engine/srs.ts';
import { isoDate, mean, median } from '../lib/util.ts';
import { buildProfile, type BehaviouralEvidence, type GitaProfile } from './assessment.ts';
import { HABIT_BY_ID, selectHabitsFor, type Habit } from './habits.ts';
import { TIERS, type AbsorptionTier } from './framework.ts';

export interface GitaView {
  profile: GitaProfile;
  evidence: BehaviouralEvidence;
  activeHabits: Habit[];
  /** The tier actually in force, after any coach override. */
  tier: AbsorptionTier;
  /** True when a coach has pinned the tier rather than letting evidence place it. */
  tierIsOverridden: boolean;
  /** Habits the current tier recommends but the learner has not taken on. */
  suggestedHabits: Habit[];
}

export function useGitaProfile(): GitaView {
  const { state } = useStore();

  return useMemo(() => {
    const records = collectResponses(state.attempts, QUESTION_BY_ID);
    const today = isoDate();

    /* ---- Attendance ---- */
    const activeDays = Object.entries(state.activity).filter(([date, seconds]) => {
      if (seconds <= 0) return false;
      const age = Math.floor((Date.parse(`${today}T00:00:00`) - Date.parse(`${date}T00:00:00`)) / 86400000);
      return age >= 0 && age < 28;
    }).length;

    /* ---- Accuracy and pacing ---- */
    const answered = records.filter((r) => r.response.value !== null);
    // Null rather than zero: no responses means unmeasured, not incorrect.
    const accuracy =
      answered.length === 0 ? null : answered.filter((r) => r.response.correct).length / answered.length;

    const pacingRatios = answered
      .map((r) => r.response.msSpent / 1000 / Math.max(1, r.question.targetSeconds))
      .filter((ratio) => ratio > 0 && ratio < 12);
    // Five timings is the fewest that makes a median mean anything.
    const pacingRatio = pacingRatios.length < 5 ? null : median(pacingRatios);

    /* ---- Performance under time pressure ---- */
    const timedAttemptIds = new Set(
      state.attempts.filter((a) => a.mode !== 'practice').map((a) => a.id),
    );
    const timed = answered.filter((r) => timedAttemptIds.has(r.attemptId));
    const untimed = answered.filter((r) => !timedAttemptIds.has(r.attemptId));
    const rate = (rows: typeof answered) =>
      rows.length === 0 ? null : rows.filter((r) => r.response.correct).length / rows.length;

    const timedRate = timed.length >= 10 ? rate(timed) : null;
    const untimedRate = untimed.length >= 10 ? rate(untimed) : null;
    // Without both conditions there is nothing to compare, so the driver is
    // dropped rather than defaulted — a default of 1 would score as perfect
    // composure for someone who has never sat a timed module.
    const pressureRatio =
      timedRate === null || untimedRate === null || untimedRate === 0 ? null : timedRate / untimedRate;

    /* ---- Whether errors get closed ---- */
    const missedRefs = Object.values(state.srs).filter((card) => card.ref.startsWith('q:'));
    const closed = missedRefs.filter((card) => card.repetitions >= 1 || isMastered(card)).length;
    // A learner with no misses yet has nothing to close, which is not the same
    // as having failed to close anything.
    const errorClosureRate = missedRefs.length === 0 ? null : closed / missedRefs.length;

    /* ---- Whether practice sits at the edge ---- */
    const sectionTheta = {
      rw: state.sectionAbility.rw.theta,
      math: state.sectionAbility.math.theta,
    };
    const edgeCount = answered.filter((r) =>
      inProductiveZone(sectionTheta[r.question.section], r.question),
    ).length;
    const edgePracticeRate = answered.length < 10 ? null : edgeCount / answered.length;

    /* ---- Evenness across skills ---- */
    const stats = skillStats(records).filter((s) => s.attempted >= 3);
    const masteryValues = stats.map((s) => s.mastery);
    // Spread across fewer than three measured skills describes nothing.
    const masterySpread =
      masteryValues.length < 3
        ? null
        : Math.min(
            1,
            Math.sqrt(mean(masteryValues.map((v) => (v - mean(masteryValues)) ** 2))) * 2,
          );

    const evidence: BehaviouralEvidence = {
      activeDays,
      streak: currentStreak(state.activity, today),
      responseCount: answered.length,
      accuracy,
      errorClosureRate,
      edgePracticeRate,
      pacingRatio,
      pressureRatio,
      masterySpread,
      hasTarget: Boolean(state.profile.testDate) && state.profile.targetScore > 0,
      fullTests: state.attempts.filter((a) => a.mode !== 'practice' && a.status === 'submitted').length,
    };

    const activeHabits = state.gita.activeHabitIds
      .map((id) => HABIT_BY_ID.get(id))
      .filter((h): h is Habit => Boolean(h));

    const profile = buildProfile({
      evidence,
      habitEntries: state.gita.habitLog,
      activeHabits,
      selfReport: state.gita.selfReport,
      today,
    });

    const tier = state.gita.tierOverride ?? profile.tier;
    const suggestedHabits = selectHabitsFor(TIERS[tier].habitIds).filter(
      (habit) => !state.gita.activeHabitIds.includes(habit.id),
    );

    return {
      profile,
      evidence,
      activeHabits,
      tier,
      tierIsOverridden: state.gita.tierOverride !== null,
      suggestedHabits,
    };
  }, [state]);
}
