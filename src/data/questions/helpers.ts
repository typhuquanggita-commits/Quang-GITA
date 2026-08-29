import type { Difficulty, Question, ScienceSubject, SectionId } from '../../types';

/**
 * Dang rut gon de bien soan cau hoi. Muc tieu: nguoi bien soan chi phai viet
 * phan noi dung, con phan lap lai (section, id lua chon, dinh dang) do code lo.
 * Cang it dong lap thi cang it cho de sai — va sai o day la sai kien thuc.
 */
export interface QuestionDraft {
  id: string;
  topicId: string;
  stem: string;
  /** Bon phuong an theo thu tu A, B, C, D. Bo trong = cau dien dap an. */
  choices?: readonly [string, string, string, string];
  /** 'A'|'B'|'C'|'D' voi cau trac nghiem, hoac dap an chuan voi cau dien. */
  answer: string;
  accepted?: readonly string[];
  explanation: string;
  difficulty: Difficulty;
  seconds?: number;
  skills?: readonly string[];
  /** Ly do mot phuong an nhieu la bay — hien khi chua bai. */
  traps?: Record<string, string>;
  passageId?: string;
}

const CHOICE_IDS = ['A', 'B', 'C', 'D'] as const;

/** Thoi gian muc tieu mac dinh theo do kho (giay). */
const DEFAULT_SECONDS: Record<Difficulty, number> = { 1: 45, 2: 60, 3: 90, 4: 120, 5: 150 };

export function buildQuestions(
  section: SectionId,
  subject: ScienceSubject | undefined,
  drafts: readonly QuestionDraft[],
): Question[] {
  return drafts.map((draft) => {
    const question: Question = {
      id: draft.id,
      section,
      topicId: draft.topicId,
      format: draft.choices ? 'mcq' : 'fill',
      stem: draft.stem,
      answer: draft.answer,
      explanation: draft.explanation,
      difficulty: draft.difficulty,
      estimatedSeconds: draft.seconds ?? DEFAULT_SECONDS[draft.difficulty],
      skills: [...(draft.skills ?? [])],
    };
    if (subject) question.subject = subject;
    if (draft.choices) {
      question.choices = draft.choices.map((text, i) => ({ id: CHOICE_IDS[i] as string, text }));
    }
    if (draft.accepted) question.acceptedAnswers = [...draft.accepted];
    if (draft.traps) question.traps = draft.traps;
    if (draft.passageId) question.passageId = draft.passageId;
    return question;
  });
}
