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
import { chemistryQuestions3, geographyQuestions3, historyQuestions3 } from './sciences-4';
import {
  chemistryQuestions4,
  geographyQuestions4,
  historyQuestions4,
  physicsQuestions3,
} from './sciences-5';
import { englishQuestions2 } from './english-2';
import { englishQuestions3 } from './english-3';
import { BIOLOGY_QUESTIONS } from './biology';

export const ALL_QUESTIONS: readonly Question[] = [
  ...quantitativeQuestions,
  ...quantitativeQuestions2,
  ...qualitativeQuestions,
  ...qualitativeQuestions2,
  ...physicsQuestions,
  ...physicsQuestions2,
  ...physicsQuestions3,
  ...chemistryQuestions,
  ...chemistryQuestions2,
  ...chemistryQuestions3,
  ...chemistryQuestions4,
  ...historyQuestions,
  ...historyQuestions2,
  ...historyQuestions3,
  ...historyQuestions4,
  ...geographyQuestions,
  ...geographyQuestions2,
  ...geographyQuestions3,
  ...geographyQuestions4,
  ...BIOLOGY_QUESTIONS,
  ...englishQuestions,
  ...englishQuestions2,
  ...englishQuestions3,
];

const BY_ID = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));

/** Tra cuu O(1) — duoc dung trong vong lap cham diem nen phai re. */
export function findQuestion(id: string): Question | undefined {
  return BY_ID.get(id);
}

/**
 * Cau hoi cua mot phan.
 *
 * Phan 3 nhan mot HOAC NHIEU chu de: tu 2026 thi sinh chon ba chu de khoa hoc,
 * nen ngan hang cau cho phan 3 la hop cua ba chu de do.
 */
export function questionsOf(
  section: SectionId,
  subject?: ScienceSubject | readonly ScienceSubject[],
): Question[] {
  if (section !== 'science') return ALL_QUESTIONS.filter((q) => q.section === section);
  const wanted = subject === undefined ? [] : typeof subject === 'string' ? [subject] : subject;
  return ALL_QUESTIONS.filter(
    (q) => q.section === section && q.subject !== undefined && wanted.includes(q.subject),
  );
}

export function questionsOfTopic(topicId: string): Question[] {
  return ALL_QUESTIONS.filter((q) => q.topicId === topicId);
}
