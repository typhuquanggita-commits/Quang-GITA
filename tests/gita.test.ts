/**
 * GITA engine tests.
 *
 * The property that matters most here is the one that is easiest to get
 * wrong: a learner the platform has not observed must not be scored as
 * excellent. Several tests below exist purely to hold that line.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  PILLARS,
  PILLAR_ORDER,
  TIERS,
  TIER_ORDER,
  PRACTITIONERS,
  PRACTITIONER_ORDER,
  canDeliverTier,
  canWorkArena,
  ALL_DIMENSIONS,
  DIMENSION_BY_ID,
} from '../src/gita/framework.ts';
import {
  HABITS,
  HABIT_BY_ID,
  MAX_ACTIVE_HABITS,
  adherence,
  expectedOccurrences,
  habitStreak,
  selectHabitsFor,
  type HabitEntry,
} from '../src/gita/habits.ts';
import { ARENAS, ARENA_ORDER, arenaTransfer, ALL_INDICATORS } from '../src/gita/arenas.ts';
import {
  buildProfile,
  tierFor,
  nextMove,
  type BehaviouralEvidence,
} from '../src/gita/assessment.ts';
import { addDays } from '../src/lib/util.ts';

const TODAY = '2026-06-15';

/** Evidence for a learner the platform has never observed. */
function blankEvidence(): BehaviouralEvidence {
  return {
    activeDays: 0,
    streak: 0,
    responseCount: 0,
    accuracy: null,
    errorClosureRate: null,
    edgePracticeRate: null,
    pacingRatio: null,
    pressureRatio: null,
    masterySpread: null,
    hasTarget: false,
    fullTests: 0,
  };
}

/** Evidence for a learner running the model well. */
function strongEvidence(): BehaviouralEvidence {
  return {
    activeDays: 22,
    streak: 18,
    responseCount: 400,
    accuracy: 0.82,
    errorClosureRate: 0.88,
    edgePracticeRate: 0.72,
    pacingRatio: 1.02,
    pressureRatio: 0.98,
    masterySpread: 0.2,
    hasTarget: true,
    fullTests: 5,
  };
}

/* ================= Framework shape ================= */

test('every pillar carries four named dimensions with probes and evidence', () => {
  for (const id of PILLAR_ORDER) {
    const pillar = PILLARS[id];
    assert.equal(pillar.dimensions.length, 4, `${id} dimension count`);
    for (const dimension of pillar.dimensions) {
      assert.equal(dimension.pillar, id, `${dimension.id} points at the wrong pillar`);
      for (const field of ['label', 'labelVi', 'evidence', 'evidenceVi', 'probe', 'probeVi'] as const) {
        assert.ok(dimension[field].trim().length > 0, `${dimension.id}.${field} is empty`);
      }
    }
  }
});

test('dimension ids are unique and resolvable', () => {
  const ids = ALL_DIMENSIONS.map((d) => d.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate dimension id');
  for (const id of ids) assert.ok(DIMENSION_BY_ID.get(id), `${id} not indexed`);
});

test('tiers form a ladder with rising demands', () => {
  let previousMinutes = -1;
  for (const tier of TIER_ORDER) {
    const spec = TIERS[tier];
    assert.equal(spec.tier, tier);
    assert.ok(spec.dailyMinutes > previousMinutes, `tier ${tier} does not ask for more time`);
    assert.ok(spec.practices.length >= 3, `tier ${tier} has too few practices`);
    assert.equal(spec.practices.length, spec.practicesVi.length, `tier ${tier} translation mismatch`);
    assert.ok(spec.habitIds.length > 0, `tier ${tier} names no habits`);
    previousMinutes = spec.dailyMinutes;
  }
});

test('every habit a tier names actually exists', () => {
  for (const tier of TIER_ORDER) {
    for (const habitId of TIERS[tier].habitIds) {
      assert.ok(HABIT_BY_ID.get(habitId), `tier ${tier} names unknown habit ${habitId}`);
    }
  }
});

test('practitioner levels widen strictly as they rise', () => {
  let previousTiers = 0;
  let previousArenas = 0;
  for (const level of PRACTITIONER_ORDER) {
    const spec = PRACTITIONERS[level];
    assert.ok(spec.deliversTiers.length >= previousTiers, `${level} delivers fewer tiers`);
    assert.ok(spec.arenas.length >= previousArenas, `${level} covers fewer arenas`);
    previousTiers = spec.deliversTiers.length;
    previousArenas = spec.arenas.length;
  }
});

test('an advisor cannot deliver the transfer tier or work inside a family', () => {
  assert.ok(canDeliverTier('advisor', 1));
  assert.ok(canDeliverTier('advisor', 2));
  assert.ok(!canDeliverTier('advisor', 4), 'an advisor must not run transfer work');
  assert.ok(!canWorkArena('advisor', 'family'));
  assert.ok(canWorkArena('coach', 'family'));
  assert.ok(canWorkArena('master-coach', 'society'));
  assert.ok(!canWorkArena('coach', 'society'), 'the society arena is reserved for a master coach');
});

test('only a master coach delivers the top tier', () => {
  for (const level of PRACTITIONER_ORDER) {
    assert.equal(
      canDeliverTier(level, 5),
      level === 'master-coach',
      `${level} tier-5 clearance`,
    );
  }
});

/* ================= Habits ================= */

test('every habit is fully specified in both languages', () => {
  const ids = HABITS.map((h) => h.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate habit id');

  for (const habit of HABITS) {
    for (const field of ['label', 'labelVi', 'action', 'actionVi', 'cue', 'cueVi', 'rationale', 'rationaleVi'] as const) {
      assert.ok(habit[field].trim().length > 0, `${habit.id}.${field} is empty`);
    }
    assert.ok(habit.leverage >= 1 && habit.leverage <= 5, `${habit.id} leverage`);
    assert.ok(habit.minutes > 0, `${habit.id} minutes`);
    assert.ok(PILLAR_ORDER.includes(habit.pillar), `${habit.id} unknown pillar`);
  }
});

test('the active habit set is capped and ordered by leverage', () => {
  const all = HABITS.map((h) => h.id);
  const selected = selectHabitsFor(all);

  assert.equal(selected.length, MAX_ACTIVE_HABITS, 'the cap must hold');
  for (let i = 1; i < selected.length; i += 1) {
    assert.ok(
      selected[i - 1].leverage >= selected[i].leverage,
      'habits must be ordered by leverage, highest first',
    );
  }
  assert.equal(selected[0].leverage, 5, 'the highest-leverage habit must survive the cap');
});

test('selectHabitsFor ignores unknown ids rather than throwing', () => {
  const selected = selectHabitsFor(['h-fixed-slot', 'no-such-habit']);
  assert.equal(selected.length, 1);
  assert.equal(selected[0].id, 'h-fixed-slot');
});

test('cadence determines how many occurrences a window expects', () => {
  assert.equal(expectedOccurrences('daily', 28), 28);
  assert.equal(expectedOccurrences('weekday', 28), 20);
  assert.equal(expectedOccurrences('weekly', 28), 4);
  assert.equal(expectedOccurrences('monthly', 28), 1);
});

test('adherence is measured against the cadence, not against a raw count', () => {
  const weekly = HABIT_BY_ID.get('h-weekly-review')!;
  const daily = HABIT_BY_ID.get('h-family-table')!;
  const today = new Date(`${TODAY}T12:00:00`);

  // Four occurrences in 28 days is full adherence for a weekly habit and poor
  // adherence for a daily one — the same log, two different verdicts.
  const entries: HabitEntry[] = [0, 7, 14, 21].map((offset) => ({
    habitId: 'shared',
    date: addDays(TODAY, -offset),
    done: true,
  }));

  const weeklyEntries = entries.map((e) => ({ ...e, habitId: weekly.id }));
  const dailyEntries = entries.map((e) => ({ ...e, habitId: daily.id }));

  assert.equal(adherence(weeklyEntries, weekly, 28, today), 1);
  assert.ok(adherence(dailyEntries, daily, 28, today) < 0.2);
});

test('adherence is capped at one, so an enthusiastic week cannot hide a bad month', () => {
  const weekly = HABIT_BY_ID.get('h-weekly-review')!;
  const today = new Date(`${TODAY}T12:00:00`);
  const entries: HabitEntry[] = [0, 1, 2, 3, 4, 5, 6, 7].map((offset) => ({
    habitId: weekly.id,
    date: addDays(TODAY, -offset),
    done: true,
  }));
  assert.equal(adherence(entries, weekly, 28, today), 1);
});

test('adherence ignores entries marked not done', () => {
  const daily = HABIT_BY_ID.get('h-family-table')!;
  const today = new Date(`${TODAY}T12:00:00`);
  const entries: HabitEntry[] = Array.from({ length: 14 }, (_, i) => ({
    habitId: daily.id,
    date: addDays(TODAY, -i),
    done: false,
  }));
  assert.equal(adherence(entries, daily, 28, today), 0);
});

test('a habit streak counts back from today and stops at the first gap', () => {
  const entries: HabitEntry[] = [0, 1, 2, 4, 5].map((offset) => ({
    habitId: 'h-fixed-slot',
    date: addDays(TODAY, -offset),
    done: true,
  }));
  assert.equal(habitStreak(entries, 'h-fixed-slot', TODAY), 3);
});

test('a streak survives a day not yet logged', () => {
  const entries: HabitEntry[] = [1, 2, 3].map((offset) => ({
    habitId: 'h-fixed-slot',
    date: addDays(TODAY, -offset),
    done: true,
  }));
  assert.equal(habitStreak(entries, 'h-fixed-slot', TODAY), 3);
});

/* ================= Arenas ================= */

test('every arena is fully specified and opens at a sensible tier', () => {
  let previousTier = 0;
  for (const id of ARENA_ORDER) {
    const arena = ARENAS[id];
    assert.ok(arena.rituals.length > 0, `${id} has no rituals`);
    assert.ok(arena.indicators.length > 0, `${id} has no indicators`);
    assert.ok(arena.opensAtTier >= previousTier, `${id} opens before the arena before it`);
    previousTier = arena.opensAtTier;

    for (const ritual of arena.rituals) {
      assert.equal(ritual.steps.length, ritual.stepsVi.length, `${ritual.id} translation mismatch`);
      assert.ok(ritual.steps.length >= 3, `${ritual.id} has too few steps to be a ritual`);
      assert.ok(ritual.pitfall.trim().length > 0, `${ritual.id} names no pitfall`);
    }
  }
});

test('indicator ids are unique across all arenas', () => {
  const ids = ALL_INDICATORS.map((i) => i.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('arena transfer is the fraction of its own indicators observed', () => {
  const family = ARENAS.family.indicators.map((i) => i.id);
  assert.equal(arenaTransfer('family', new Set()), 0);
  assert.equal(arenaTransfer('family', new Set(family)), 1);
  assert.ok(Math.abs(arenaTransfer('family', new Set([family[0]])) - 1 / family.length) < 1e-9);
});

test('indicators from one arena do not count toward another', () => {
  const familyIds = new Set(ARENAS.family.indicators.map((i) => i.id));
  assert.equal(arenaTransfer('school', familyIds), 0);
});

/* ================= Profile ================= */

test('an unobserved learner is not scored as excellent', () => {
  const profile = buildProfile({
    evidence: blankEvidence(),
    habitEntries: [],
    activeHabits: [],
    selfReport: {},
    today: TODAY,
  });

  assert.ok(profile.overall <= 20, `a blank profile scored ${profile.overall}`);
  for (const id of PILLAR_ORDER) {
    assert.ok(
      profile.pillars[id].score <= 25,
      `${id} scored ${profile.pillars[id].score} with no evidence at all`,
    );
  }
});

test('unmeasured signals are dropped rather than defaulted', () => {
  const profile = buildProfile({
    evidence: blankEvidence(),
    habitEntries: [],
    activeHabits: [],
    selfReport: {},
    today: TODAY,
  });

  // Pacing, composure under pressure, and evenness across skills are all
  // unmeasurable for a new learner. None may appear as a driver, because each
  // of them would otherwise land near 100 and inflate the pillar.
  const allDrivers = PILLAR_ORDER.flatMap((id) => profile.pillars[id].drivers.map((d) => d.label));
  for (const label of [
    'Pacing against target',
    'Accuracy holds under time pressure',
    'Evenness across skills',
    'Overall accuracy',
  ]) {
    assert.ok(!allDrivers.includes(label), `${label} was scored with no data behind it`);
  }
});

test('confidence is near zero with no evidence and high with plenty', () => {
  const blank = buildProfile({
    evidence: blankEvidence(),
    habitEntries: [],
    activeHabits: [],
    selfReport: {},
    today: TODAY,
  });
  assert.ok(blank.confidence < 0.1, `blank confidence ${blank.confidence}`);
  // The same figure applies to every pillar, since they share one evidence pool.
  for (const id of PILLAR_ORDER) {
    assert.equal(blank.pillars[id].confidence, blank.confidence, `${id} confidence`);
  }

  const habits = selectHabitsFor(TIERS[3].habitIds);
  const entries: HabitEntry[] = habits.flatMap((habit) =>
    Array.from({ length: 20 }, (_, i) => ({ habitId: habit.id, date: addDays(TODAY, -i), done: true })),
  );

  const rich = buildProfile({
    evidence: strongEvidence(),
    habitEntries: entries,
    activeHabits: habits,
    selfReport: {},
    today: TODAY,
  });
  assert.ok(rich.confidence > 0.8, `rich confidence ${rich.confidence}`);
});

test('a learner running the model well scores well', () => {
  const habits = selectHabitsFor(TIERS[3].habitIds);
  const entries: HabitEntry[] = habits.flatMap((habit) =>
    Array.from({ length: 24 }, (_, i) => ({ habitId: habit.id, date: addDays(TODAY, -i), done: true })),
  );

  const profile = buildProfile({
    evidence: strongEvidence(),
    habitEntries: entries,
    activeHabits: habits,
    selfReport: { 'goal-standard': 5, 'goal-commitment': 5, 'inspirits-desire': 5, 'inspirits-belief': 5 },
    today: TODAY,
  });

  assert.ok(profile.overall >= 75, `a strong learner scored only ${profile.overall}`);
});

test('the limiting pillar is the lowest-scoring one', () => {
  const profile = buildProfile({
    evidence: { ...strongEvidence(), activeDays: 1, errorClosureRate: 0.05 },
    habitEntries: [],
    activeHabits: [],
    selfReport: { 'goal-standard': 5, 'inspirits-desire': 5, 'inspirits-belief': 5 },
    today: TODAY,
  });

  const scores = PILLAR_ORDER.map((id) => profile.pillars[id].score);
  assert.equal(profile.pillars[profile.limitingPillar].score, Math.min(...scores));
  assert.equal(profile.limitingPillar, 'action', 'starving Action should make it limiting');
});

test('self-report raises a pillar but cannot carry it alone', () => {
  const base = {
    evidence: blankEvidence(),
    habitEntries: [],
    activeHabits: [],
    today: TODAY,
  };
  const without = buildProfile({ ...base, selfReport: {} });
  const with5 = buildProfile({
    ...base,
    selfReport: { 'inspirits-desire': 5, 'inspirits-belief': 5 },
  });

  assert.ok(with5.pillars.inspirits.score > without.pillars.inspirits.score, 'self-report should count');
  assert.ok(
    with5.pillars.inspirits.score < 90,
    `self-report alone reached ${with5.pillars.inspirits.score}; behaviour must still matter`,
  );
});

test('the next move names the limiting pillar and a single habit', () => {
  const profile = buildProfile({
    evidence: blankEvidence(),
    habitEntries: [],
    activeHabits: [],
    selfReport: {},
    today: TODAY,
  });
  const move = nextMove(profile);

  assert.equal(move.pillar, profile.limitingPillar);
  assert.ok(move.move.trim().length > 0);
  assert.ok(move.moveVi.trim().length > 0);
  if (move.habitId) assert.ok(HABIT_BY_ID.get(move.habitId), `unknown habit ${move.habitId}`);
});

/* ================= Tier placement ================= */

test('tier placement walks the gates from the bottom up', () => {
  assert.equal(tierFor(blankEvidence(), 0), 1);

  const attending = { ...blankEvidence(), activeDays: 6 };
  assert.equal(tierFor(attending, 0), 2);

  const rhythmic = { ...attending, activeDays: 15, fullTests: 1 };
  assert.equal(tierFor(rhythmic, 20), 3);

  const aimed = { ...rhythmic, edgePracticeRate: 0.6 };
  assert.equal(tierFor(aimed, 70), 4);

  const autonomous = { ...aimed, errorClosureRate: 0.85, fullTests: 4 };
  assert.equal(tierFor(autonomous, 90), 5);
});

test('strong evidence in one area cannot skip an earlier gate', () => {
  // Everything a tier-5 learner has, except attendance.
  const narrow: BehaviouralEvidence = {
    ...strongEvidence(),
    activeDays: 2,
  };
  assert.equal(tierFor(narrow, 100), 1, 'attendance gate must hold regardless of other strengths');
});

test('an unmeasured signal never opens a tier', () => {
  const unmeasured: BehaviouralEvidence = {
    ...strongEvidence(),
    edgePracticeRate: null,
  };
  assert.equal(tierFor(unmeasured, 100), 3, 'a null signal must block, not pass, the tier-4 gate');
});
