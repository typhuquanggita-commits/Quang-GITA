/**
 * Turning a finished attempt into something a learner can learn from.
 *
 * A score report says how well it went. It does not say what happened, and
 * "what happened" is the only part a student can act on. Until now the
 * platform delivered a test, scored it, and then had nothing to show for the
 * two hours except a number and a mastery bar — the questions themselves,
 * along with every explanation and distractor note already written for them,
 * were unreachable once the attempt was submitted.
 *
 * This module produces the record: one row per delivered question, carrying
 * what the learner did, what was correct, how long it took against the item's
 * own target, which error the mistake was, and which lesson explains the skill
 * it tested. It is deliberately a pure function of the attempt, so the same
 * rows drive the question-by-question review, the analysis table, and the
 * learner's dossier — three views of one truth rather than three calculations
 * that can disagree.
 */

import type { Attempt, DifficultyBand, Question, Response, SectionId, SkillId, TestModule } from '../types.ts';
import { classifyError, type ErrorKind } from './analytics.ts';
import { masteryFromResponses } from './scoring.ts';
import { median } from '../lib/util.ts';

export type Verdict = 'correct' | 'incorrect' | 'omitted';

/** How the time spent compares with what the item was written to need. */
export type Pace = 'rushed' | 'on-pace' | 'slow';

export interface ReviewRow {
  /** Position in the delivered order, 1-based, so it matches the exam. */
  number: number;
  question: Question;
  response: Response | null;
  moduleId: string;
  /** Which stage-2 pathway this item was delivered on, when it was stage 2. */
  stage: 1 | 2;
  /** Field-test items are delivered but not scored; the learner deserves to know. */
  pretest: boolean;
  verdict: Verdict;
  /** The learner's answer as they gave it, or null when omitted. */
  given: string | null;
  /** The key, rendered for display — a choice id, or the accepted forms. */
  key: string;
  seconds: number;
  targetSeconds: number;
  pace: Pace;
  /** Null when the item was answered correctly. */
  error: ErrorKind | null;
  flagged: boolean;
  /** Times the learner came back to it, a signal of hesitation. */
  visits: number;
  eliminated: string[];
}

/** Below this share of the target the answer was not really read. */
const RUSHED_AT = 0.4;
/** Above this it cost time the section did not have. */
const SLOW_AT = 1.6;

function paceOf(seconds: number, target: number): Pace {
  if (target <= 0) return 'on-pace';
  if (seconds < target * RUSHED_AT) return 'rushed';
  if (seconds > target * SLOW_AT) return 'slow';
  return 'on-pace';
}

function keyText(question: Question): string {
  return Array.isArray(question.answer) ? question.answer.join(' / ') : String(question.answer);
}

/**
 * Builds the review in delivery order.
 *
 * Order matters more than it looks: reviewing questions in the order they were
 * faced lets a learner see where in the module their pacing broke down, which
 * a set sorted by skill or by correctness destroys.
 */
export function buildReview(
  attempt: Attempt,
  modules: Map<string, TestModule>,
  questions: Map<string, Question>,
): ReviewRow[] {
  const rows: ReviewRow[] = [];
  let number = 0;

  for (const moduleId of attempt.deliveredModuleIds) {
    const module = modules.get(moduleId);
    if (!module) continue;
    const pretest = new Set(module.pretestIds);

    for (const questionId of module.questionIds) {
      const question = questions.get(questionId);
      if (!question) continue;

      number += 1;
      const response = attempt.responses[questionId] ?? null;
      const answered = Boolean(response && response.value !== null && response.value !== '');
      const seconds = response ? response.msSpent / 1000 : 0;

      const verdict: Verdict = !answered ? 'omitted' : response!.correct ? 'correct' : 'incorrect';

      rows.push({
        number,
        question,
        response,
        moduleId,
        stage: module.stage,
        pretest: pretest.has(questionId),
        verdict,
        given: answered ? response!.value : null,
        key: keyText(question),
        seconds,
        targetSeconds: question.targetSeconds,
        pace: paceOf(seconds, question.targetSeconds),
        error: response ? classifyError({ response, question, attemptId: attempt.id, at: 0 }) : 'omitted',
        flagged: Boolean(response?.flagged),
        visits: response?.visits ?? 0,
        eliminated: response?.eliminated ?? [],
      });
    }
  }

  return rows;
}

/* ------------------------------------------------------------------ */
/* Roll-ups                                                            */
/* ------------------------------------------------------------------ */

export interface SkillBreakdown {
  skill: SkillId;
  section: SectionId;
  attempted: number;
  correct: number;
  omitted: number;
  /** Modelled probability of a medium item, from these responses alone. */
  mastery: number;
  medianSeconds: number;
  medianTargetSeconds: number;
  /** The error that accounts for most of this skill's mistakes, if any. */
  dominantError: ErrorKind | null;
}

/**
 * Per-skill summary of one attempt.
 *
 * Reports mastery from responses rather than percent correct, for the reason
 * stated in `docs/PSYCHOMETRICS.md`: getting easy items right is not mastery,
 * and percent-correct cannot tell the difference.
 */
export function skillBreakdown(rows: readonly ReviewRow[]): SkillBreakdown[] {
  const buckets = new Map<SkillId, ReviewRow[]>();
  for (const row of rows) {
    if (row.pretest) continue; // unscored: including it would misstate the result
    const list = buckets.get(row.question.skill) ?? [];
    list.push(row);
    buckets.set(row.question.skill, list);
  }

  const out: SkillBreakdown[] = [];
  for (const [skill, list] of buckets) {
    const errors = new Map<ErrorKind, number>();
    for (const row of list) {
      if (!row.error) continue;
      errors.set(row.error, (errors.get(row.error) ?? 0) + 1);
    }
    let dominantError: ErrorKind | null = null;
    let most = 0;
    for (const [kind, count] of errors) {
      if (count > most) {
        most = count;
        dominantError = kind;
      }
    }

    out.push({
      skill,
      section: list[0].question.section,
      attempted: list.filter((r) => r.verdict !== 'omitted').length,
      correct: list.filter((r) => r.verdict === 'correct').length,
      omitted: list.filter((r) => r.verdict === 'omitted').length,
      mastery: masteryFromResponses(
        list.map((r) => ({ item: r.question.irt, correct: r.verdict === 'correct' })),
      ),
      medianSeconds: Math.round(median(list.map((r) => r.seconds))),
      medianTargetSeconds: Math.round(median(list.map((r) => r.targetSeconds))),
      dominantError,
    });
  }

  return out.sort((a, b) => a.mastery - b.mastery);
}

export interface BandBreakdown {
  band: DifficultyBand;
  attempted: number;
  correct: number;
}

/**
 * Accuracy by difficulty band.
 *
 * The shape of this tells a learner something a single score cannot: falling
 * off only on hard items is a ceiling, while missing easy items is a leak, and
 * the two call for opposite next steps.
 */
export function bandBreakdown(rows: readonly ReviewRow[]): BandBreakdown[] {
  const bands: DifficultyBand[] = ['easy', 'medium', 'hard'];
  return bands.map((band) => {
    const list = rows.filter((r) => !r.pretest && r.question.band === band);
    return {
      band,
      attempted: list.filter((r) => r.verdict !== 'omitted').length,
      correct: list.filter((r) => r.verdict === 'correct').length,
    };
  });
}

export interface ReviewSummary {
  total: number;
  scored: number;
  correct: number;
  incorrect: number;
  omitted: number;
  flagged: number;
  rushed: number;
  slow: number;
  /** Total seconds of recorded time on task. */
  seconds: number;
}

export function summariseReview(rows: readonly ReviewRow[]): ReviewSummary {
  const scored = rows.filter((r) => !r.pretest);
  return {
    total: rows.length,
    scored: scored.length,
    correct: scored.filter((r) => r.verdict === 'correct').length,
    incorrect: scored.filter((r) => r.verdict === 'incorrect').length,
    omitted: scored.filter((r) => r.verdict === 'omitted').length,
    flagged: rows.filter((r) => r.flagged).length,
    rushed: rows.filter((r) => r.pace === 'rushed').length,
    slow: rows.filter((r) => r.pace === 'slow').length,
    seconds: Math.round(rows.reduce((acc, r) => acc + r.seconds, 0)),
  };
}
