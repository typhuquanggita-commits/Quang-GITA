import { MAX_SECTION_SCORE, SECTIONS } from '../config';
import type {
  Attempt,
  AttemptResult,
  Question,
  Response,
  SectionId,
  SectionScore,
} from '../types';
import { estimateAbility, expectedAccuracy, abilityStandardError } from './ability';
import { normalizeFillAnswer } from './format';

export type QuestionLookup = (id: string) => Question | undefined;

/**
 * Cham mot cau. Cau dien chap nhan nhieu bien the (dau phay/dau cham thap phan,
 * don vi viet lien, so 0 thua) thong qua `normalizeFillAnswer`.
 */
export function isCorrect(question: Question, value: string | null): boolean {
  if (value === null || value === '') return false;
  if (question.format === 'fill') {
    const given = normalizeFillAnswer(value);
    if (given === '') return false;
    const accepted = [question.answer, ...(question.acceptedAnswers ?? [])];
    return accepted.some((a) => normalizeFillAnswer(a) === given);
  }
  return value === question.answer;
}

/**
 * HSA cham 1 diem moi cau dung, khong tru diem cau sai.
 * Vi vay chien luoc dung la KHONG BAO GIO bo trong — app se canh bao dieu nay.
 */
export function scoreSection(
  questionIds: readonly string[],
  responses: Record<string, Response>,
  lookup: QuestionLookup,
  section: SectionId,
  elapsedMs: number,
): SectionScore {
  let correct = 0;
  let answered = 0;
  let luckyCorrect = 0;
  let confidentWrong = 0;
  const observations: Array<{ difficulty: number; correct: boolean }> = [];

  for (const id of questionIds) {
    const question = lookup(id);
    if (!question) continue;
    const response = responses[id];
    const value = response?.value ?? null;
    const ok = isCorrect(question, value);

    if (value !== null && value !== '') answered += 1;
    if (ok) correct += 1;
    if (ok && response?.confidence === 'guess') luckyCorrect += 1;
    if (!ok && response?.confidence === 'sure') confidentWrong += 1;

    observations.push({ difficulty: question.difficulty, correct: ok });
  }

  const total = questionIds.length;
  const ability = estimateAbility(observations);

  return {
    section,
    correct,
    total,
    answered,
    // Diem quy doi ve thang 50 cua tung phan.
    score: total > 0 ? (correct / total) * MAX_SECTION_SCORE : 0,
    ability,
    secondsPerQuestion: total > 0 ? elapsedMs / 1000 / total : 0,
    luckyCorrect,
    confidentWrong,
  };
}

export function gradeAttempt(
  attempt: Attempt,
  lookup: QuestionLookup,
  submittedAt: number = Date.now(),
): AttemptResult {
  const sections = attempt.sections.map((run) =>
    scoreSection(run.questionIds, attempt.responses, lookup, run.section, run.elapsedMs),
  );

  const total = sections.reduce((sum, s) => sum + s.score, 0);
  const durationMs = attempt.sections.reduce((sum, s) => sum + s.elapsedMs, 0);

  return {
    attemptId: attempt.id,
    submittedAt,
    sections,
    total,
    projected: projectFullExamScore(sections),
    durationMs,
  };
}

/**
 * Du bao diem tren de day du 150 cau tu nang luc uoc luong o tung phan.
 *
 * Diem thuc te cua mot bai luyen ngan (vi du 10 cau) khong the ngoai suy tuyen
 * tinh; du bao nay chieu nang luc len phan bo do kho cua de chuan, nen mot bai
 * 10 cau kho van cho du bao hop ly.
 */
export function projectFullExamScore(sections: readonly SectionScore[]): number {
  const byId = new Map(sections.map((s) => [s.section, s]));
  let projected = 0;
  for (const spec of SECTIONS) {
    const observed = byId.get(spec.id);
    // Phan chua lam bao gio duoc coi la trung tinh (nang luc 0 logit).
    const ability = observed?.ability ?? 0;
    const hasData = (observed?.total ?? 0) > 0;
    projected += (hasData ? expectedAccuracy(ability) : 0.5) * MAX_SECTION_SCORE;
  }
  return projected;
}

/** Khoang tin cay ~68% cua diem du bao mot phan, tren thang 50. */
export function sectionScoreInterval(
  ability: number,
  observations: ReadonlyArray<{ difficulty: number; correct: boolean }>,
): { low: number; high: number } {
  const se = abilityStandardError(ability, observations);
  return {
    low: expectedAccuracy(ability - se) * MAX_SECTION_SCORE,
    high: expectedAccuracy(ability + se) * MAX_SECTION_SCORE,
  };
}

/** Xep hang dinh tinh theo pho diem HSA thuc te. */
export function scoreBand(total: number): { label: string; tone: 'low' | 'mid' | 'good' | 'high' | 'elite' } {
  if (total >= 130) return { label: 'Nhóm dẫn đầu', tone: 'elite' };
  if (total >= 110) return { label: 'Rất tốt', tone: 'high' };
  if (total >= 90) return { label: 'Khá', tone: 'good' };
  if (total >= 75) return { label: 'Trung bình khá', tone: 'mid' };
  return { label: 'Cần tăng tốc', tone: 'low' };
}
