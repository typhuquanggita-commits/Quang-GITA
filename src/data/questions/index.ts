import type { Question, ScienceSubject, SectionId } from '../../types';
import { quantitativeQuestions } from './quantitative';
import { qualitativeQuestions } from './qualitative';
import { englishQuestions } from './english';
import {
  chemistryQuestions,
  geographyQuestions,
  historyQuestions,
  physicsQuestions,
} from './sciences';

export const ALL_QUESTIONS: readonly Question[] = [
  ...quantitativeQuestions,
  ...qualitativeQuestions,
  ...physicsQuestions,
  ...chemistryQuestions,
  ...historyQuestions,
  ...geographyQuestions,
  ...englishQuestions,
];

const BY_ID = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));

/** Tra cuu O(1) — duoc dung trong vong lap cham diem nen phai re. */
export function findQuestion(id: string): Question | undefined {
  return BY_ID.get(id);
}

export function questionsOf(section: SectionId, subject?: ScienceSubject): Question[] {
  return ALL_QUESTIONS.filter(
    (q) => q.section === section && (section !== 'science' || q.subject === subject),
  );
}

export function questionsOfTopic(topicId: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.topicId === topicId);
}
