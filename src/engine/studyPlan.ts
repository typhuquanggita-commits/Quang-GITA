/**
 * Study plan generation.
 *
 * A plan is a schedule, not a wish: it starts from the days actually available
 * before the test date and the hours the learner says they can give, then
 * allocates that budget across practice, review, vocabulary, and full-length
 * rehearsals — weighted toward whichever skills the evidence says are weakest.
 */

import type { SectionId, SkillId, StudyPlan, StudyPlanTask } from '../types.ts';
import type { SkillStat } from './analytics.ts';
import { addDays, daysBetween, isoDate, uid } from '../lib/util.ts';
import { skillLabel } from '../data/blueprint.ts';

export interface PlanInput {
  testDate: string;
  targetScore: number;
  baselineScore: number | null;
  hoursPerWeek: number;
  weakSkills: readonly SkillStat[];
  locale: 'vi' | 'en';
  today?: string;
}

/** Minutes of full-length rehearsal, including the break. */
const FULL_TEST_MINUTES = 145;

/**
 * Points of score growth a well-spent hour typically buys. Deliberately
 * conservative: gains compress as the score rises, so the model applies a
 * diminishing factor above 1300.
 */
function expectedGain(hours: number, baseline: number): number {
  const compression = baseline >= 1400 ? 0.35 : baseline >= 1300 ? 0.55 : baseline >= 1150 ? 0.8 : 1;
  return Math.round(hours * 5.5 * compression);
}

export interface PlanFeasibility {
  feasible: boolean;
  requiredHours: number;
  availableHours: number;
  projectedScore: number;
}

export function assessFeasibility(input: PlanInput): PlanFeasibility {
  const today = input.today ?? isoDate();
  const days = Math.max(0, daysBetween(today, input.testDate));
  const availableHours = (days / 7) * input.hoursPerWeek;
  const baseline = input.baselineScore ?? 1000;
  const needed = Math.max(0, input.targetScore - baseline);
  const projectedScore = Math.min(1600, baseline + expectedGain(availableHours, baseline));

  // Invert the gain model to find the hours the target would need.
  const compression = baseline >= 1400 ? 0.35 : baseline >= 1300 ? 0.55 : baseline >= 1150 ? 0.8 : 1;
  const requiredHours = Math.ceil(needed / (5.5 * compression));

  return {
    feasible: projectedScore >= input.targetScore,
    requiredHours,
    availableHours: Math.round(availableHours),
    projectedScore,
  };
}

export function generatePlan(input: PlanInput): StudyPlan {
  const today = input.today ?? isoDate();
  const totalDays = Math.max(1, daysBetween(today, input.testDate));
  const minutesPerWeek = input.hoursPerWeek * 60;
  const minutesPerDay = Math.round(minutesPerWeek / 7);

  const tasks: StudyPlanTask[] = [];
  const weakSkills = input.weakSkills.slice(0, 8);

  // Full-length rehearsals: one every ~14 days, and always one 7 days out so
  // there is time to act on the result.
  const testDays = new Set<number>();
  for (let d = totalDays - 7; d >= 10; d -= 14) testDays.add(d);
  if (totalDays >= 12) testDays.add(Math.max(3, totalDays - 7));

  for (let offset = 0; offset < totalDays; offset += 1) {
    const date = addDays(today, offset);
    const dayOfWeek = new Date(`${date}T00:00:00`).getDay();

    // One rest day a week protects retention and keeps the plan followable.
    if (dayOfWeek === 0 && !testDays.has(offset)) {
      tasks.push({
        id: uid('t'),
        date,
        kind: 'rest',
        minutes: 0,
        title: input.locale === 'vi' ? 'Nghỉ ngơi' : 'Rest day',
        done: false,
      });
      continue;
    }

    if (testDays.has(offset)) {
      tasks.push({
        id: uid('t'),
        date,
        kind: 'full-test',
        minutes: FULL_TEST_MINUTES,
        title: input.locale === 'vi' ? 'Thi thử full-length' : 'Full-length practice test',
        done: false,
      });
      continue;
    }

    // The last three days taper: review only, no new material.
    const isTaper = totalDays - offset <= 3;
    if (isTaper) {
      tasks.push({
        id: uid('t'),
        date,
        kind: 'review',
        minutes: Math.min(45, minutesPerDay),
        title: input.locale === 'vi' ? 'Ôn lại lỗi sai đã đánh dấu' : 'Review flagged mistakes',
        done: false,
      });
      continue;
    }

    // Ordinary day: split the budget across a weak skill, review, and vocab.
    let budget = minutesPerDay;

    const vocabMinutes = Math.min(15, Math.round(budget * 0.2));
    budget -= vocabMinutes;
    const reviewMinutes = Math.min(20, Math.round(budget * 0.3));
    budget -= reviewMinutes;

    const skill = weakSkills.length > 0 ? weakSkills[offset % weakSkills.length] : null;
    const section: SectionId = skill ? skill.section : offset % 2 === 0 ? 'rw' : 'math';
    const skillId: SkillId | undefined = skill?.skill;

    tasks.push({
      id: uid('t'),
      date,
      kind: 'practice',
      section,
      skill: skillId,
      minutes: Math.max(15, budget),
      title: skillId
        ? input.locale === 'vi'
          ? `Luyện: ${skillLabel(skillId, 'vi')}`
          : `Drill: ${skillLabel(skillId, 'en')}`
        : input.locale === 'vi'
          ? 'Luyện tập thích ứng'
          : 'Adaptive practice',
      done: false,
    });

    if (reviewMinutes >= 10) {
      tasks.push({
        id: uid('t'),
        date,
        kind: 'review',
        minutes: reviewMinutes,
        title: input.locale === 'vi' ? 'Ôn thẻ đến hạn' : 'Clear due review cards',
        done: false,
      });
    }
    if (vocabMinutes >= 8) {
      tasks.push({
        id: uid('t'),
        date,
        kind: 'vocab',
        minutes: vocabMinutes,
        title: input.locale === 'vi' ? 'Từ vựng học thuật' : 'Academic vocabulary',
        done: false,
      });
    }
  }

  return {
    createdAt: Date.now(),
    testDate: input.testDate,
    targetScore: input.targetScore,
    baselineScore: input.baselineScore,
    hoursPerWeek: input.hoursPerWeek,
    tasks,
  };
}

export function tasksForDate(plan: StudyPlan | null, date: string): StudyPlanTask[] {
  if (!plan) return [];
  return plan.tasks.filter((task) => task.date === date);
}

export function planProgress(plan: StudyPlan | null, today = isoDate()): {
  done: number;
  total: number;
  overdue: number;
} {
  if (!plan) return { done: 0, total: 0, overdue: 0 };
  const scheduled = plan.tasks.filter((t) => t.kind !== 'rest');
  const done = scheduled.filter((t) => t.done).length;
  const overdue = scheduled.filter((t) => !t.done && t.date < today).length;
  return { done, total: scheduled.length, overdue };
}

/**
 * The label to show for a task.
 *
 * A task's `title` is written in whatever language was active when the plan
 * was generated, so rendering it directly leaves a Vietnamese plan showing
 * through an English interface. Deriving the label from the task's `kind` and
 * `skill` keeps the plan localised, and the stored title stays only as a
 * fallback for a task shape this function does not know.
 */
export function taskLabel(task: StudyPlanTask, locale: 'vi' | 'en'): string {
  switch (task.kind) {
    case 'rest':
      return locale === 'vi' ? 'Nghỉ ngơi' : 'Rest day';
    case 'full-test':
      return locale === 'vi' ? 'Thi thử full-length' : 'Full-length practice test';
    case 'vocab':
      return locale === 'vi' ? 'Từ vựng học thuật' : 'Academic vocabulary';
    case 'review':
      return locale === 'vi' ? 'Ôn thẻ đến hạn' : 'Clear due review cards';
    case 'practice':
      if (task.skill) {
        const name = skillLabel(task.skill, locale);
        return locale === 'vi' ? `Luyện: ${name}` : `Drill: ${name}`;
      }
      return locale === 'vi' ? 'Luyện tập thích ứng' : 'Adaptive practice';
    default:
      return task.title;
  }
}
