/**
 * The lesson index.
 *
 * Separate from the lesson files themselves so that `lessons-math.ts` can
 * import the `Lesson` type from `lessons.ts` without the two forming a
 * cycle: everything that wants the whole library comes here instead.
 *
 * `check:bank` asserts that every skill in the blueprint has exactly one
 * lesson. A skill that can be measured and drilled but not taught is the
 * gap this library exists to close, so a new skill must not open one.
 */

import type { SectionId, SkillId } from '../types.ts';
import { RW_LESSONS, type Lesson } from './lessons.ts';
import { MATH_LESSONS } from './lessons-math.ts';
import { RW_TOPICS, type Topic } from './topics.ts';
import { MATH_TOPICS } from './topics-math.ts';

export type { Lesson, Trap, WorkedExample } from './lessons.ts';

export const LESSONS: Lesson[] = [...RW_LESSONS, ...MATH_LESSONS];

export const LESSON_BY_SKILL: Record<SkillId, Lesson> = Object.fromEntries(
  LESSONS.map((lesson) => [lesson.skill, lesson]),
);

export function lessonFor(skill: SkillId | undefined): Lesson | undefined {
  return skill ? LESSON_BY_SKILL[skill] : undefined;
}

export function lessonsForSection(section: SectionId): Lesson[] {
  return LESSONS.filter((lesson) => lesson.section === section);
}

/** Total reading time, used to set expectations before a learner commits. */
export function totalMinutes(lessons: Lesson[] = LESSONS): number {
  return lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
}

/* ------------------------------------------------------------------ */
/* Topics                                                              */
/* ------------------------------------------------------------------ */

export type { Topic, QuestionType } from './topics.ts';

export const TOPICS: Topic[] = [...RW_TOPICS, ...MATH_TOPICS];

export const TOPIC_BY_SKILL: Record<SkillId, Topic> = Object.fromEntries(
  TOPICS.map((topic) => [topic.skill, topic]),
);

export function topicFor(skill: SkillId | undefined): Topic | undefined {
  return skill ? TOPIC_BY_SKILL[skill] : undefined;
}
