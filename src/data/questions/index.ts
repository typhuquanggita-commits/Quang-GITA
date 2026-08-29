import type { Question, ScienceSubject, SectionId } from '../../types';
import { quantitativeQuestions } from './quantitative';
import { quantitativeQuestions2 } from './quantitative-2';
import { qualitativeQuestions } from './qualitative';
import { qualitativeQuestions2 } from './qualitative-2';
import { englishQuestions } from './english';
import {
  chemistryQuestions,
  geographyQuestions,
  historyQuestions,
  physicsQuestions,
} from './sciences';
import { chemistryQuestions2, physicsQuestions2 } from './sciences-2';
import { geographyQuestions2, historyQuestions2 } from './sciences-3';
import { englishQuestions2 } from './english-2';

export const ALL_QUESTIONS: readonly Question[] = [
  ...quantitativeQuestions,
  ...quantitativeQuestions2,
  ...qualitativeQuestions,
  ...qualitativeQuestions2,
  ...physicsQuestions,
  ...physicsQuestions2,
  ...chemistryQuestions,
  ...chemistryQuestions2,
  ...historyQuestions,
  ...historyQuestions2,
  ...geographyQuestions,
  ...geographyQuestions2,
  ...englishQuestions,
  ...englishQuestions2,
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
