/**
 * Closing the loop between a wrong answer and the recall it required.
 *
 * The platform could already tell a learner *which skill* they missed, and it
 * held, separately, a list of 46 things the exam expects to be in your head
 * rather than on your page. Nothing joined the two. A learner who lost four
 * marks reconstructing the discriminant was told "advanced maths: 2 of 5" and
 * left to work out for themselves that the two minutes went on a formula.
 *
 * This module joins them, under a rule worth stating outright:
 *
 *   **It reports what the items you missed needed. It never reports what you
 *   do not know.**
 *
 * The difference is not pedantry. Nothing in a response record distinguishes a
 * learner who could not recall `sin²θ + cos²θ = 1` from one who recalled it
 * instantly and misread the diagram. Software that claims the first has
 * invented evidence it does not have, and a learner who is drilled on a fact
 * they already hold learns to distrust everything else the platform says. So
 * what comes out of here is a *question* — these items called on these facts,
 * check whether you had them — and the answer comes from the learner sitting
 * the drill. Only that answer reaches the review schedule.
 *
 * ## What counts as evidence
 *
 * Only a wrong or omitted item, and not every one of those:
 *
 *   - a **careless** error is excluded outright. `classifyError` has already
 *     judged that the learner holds the material for this skill at this band
 *     and slipped; proposing a formula on top of that contradicts the
 *     platform's own reading of the same response.
 *   - a **slow** wrong answer is the strongest signal in the file, and one is
 *     enough to raise a fact. Deriving instead of recalling costs seconds —
 *     that is the entire premise of `mustKnow.ts` — so a miss that also ran
 *     long is the exact shape the cost model predicts.
 *   - anything else needs to happen **twice** in the same skill before it is
 *     raised. One ordinary miss is noise, and a list built from noise is a
 *     list nobody reads twice.
 *
 * No evidence produces no candidates. Not a short list, not a default set of
 * "common" facts — nothing. A learner with a clean section is told their
 * section was clean.
 *
 * ## Ranking
 *
 * By payback: the seconds a sitting would give back if the fact were
 * automatic, which is `cost` × the misses that raised it. That deliberately
 * ranks a cheap fact met constantly above an expensive one met once, because
 * the learner is choosing what to spend an evening on and seconds recovered is
 * the honest unit for that choice.
 */

import type { SkillId, SrsCard } from '../types.ts';
import { MUST_KNOW, type MustKnowFact } from '../data/mustKnow.ts';
import { own } from '../lib/record.ts';
import type { ReviewRow } from './attemptReview.ts';

/** Misses in one skill needed before an ordinary miss raises its facts. */
export const MIN_ORDINARY_MISSES = 2;

/** The SRS namespace for a must-know fact. Questions use `q:`, vocabulary `v:`. */
export function recallRef(factId: string): string {
  return `mk:${factId}`;
}

export function factIdFromRef(ref: string): string | null {
  return ref.startsWith('mk:') ? ref.slice(3) : null;
}

/** One item that called on a fact, kept so the learner can check the claim. */
export interface RecallEvidence {
  /** Position in the delivered order, matching the exam and the review table. */
  number: number;
  skill: SkillId;
  /** True when the answer also ran long — the shape the cost model predicts. */
  slow: boolean;
}

export interface RecallCandidate {
  fact: MustKnowFact;
  evidence: RecallEvidence[];
  /** Seconds a sitting would give back if this were automatic. */
  payback: number;
  /** Why this fact was raised, written for the learner who has to act on it. */
  rationale: string;
  rationaleVi: string;
}

interface SkillMisses {
  /** Every qualifying miss in this skill. */
  rows: RecallEvidence[];
  /** True when at least one of them also ran long. */
  anySlow: boolean;
}

/**
 * Groups the qualifying misses by skill.
 *
 * Exported because the threshold rule is the part most likely to be argued
 * with, and an argument about it should be able to look at its inputs.
 */
export function missesBySkill(rows: readonly ReviewRow[]): Map<SkillId, SkillMisses> {
  const out = new Map<SkillId, SkillMisses>();
  for (const row of rows) {
    if (row.verdict === 'correct') continue;
    // The platform's own classifier says this one was a slip, not a gap.
    if (row.error === 'careless') continue;
    // A field-test item is not scored, so it is not evidence about the learner.
    if (row.pretest) continue;

    const skill = row.question.skill;
    const slow = row.pace === 'slow';
    const entry = out.get(skill) ?? { rows: [], anySlow: false };
    entry.rows.push({ number: row.number, skill, slow });
    entry.anySlow = entry.anySlow || slow;
    out.set(skill, entry);
  }
  return out;
}

/** Skills whose misses clear the bar for raising their facts. */
function qualifyingSkills(misses: Map<SkillId, SkillMisses>): Map<SkillId, SkillMisses> {
  const out = new Map<SkillId, SkillMisses>();
  for (const [skill, entry] of misses) {
    if (entry.anySlow || entry.rows.length >= MIN_ORDINARY_MISSES) out.set(skill, entry);
  }
  return out;
}

const BY_SKILL: Record<string, MustKnowFact[]> = (() => {
  const map: Record<string, MustKnowFact[]> = Object.create(null);
  for (const fact of MUST_KNOW) {
    for (const skill of fact.invokedBy) {
      (map[skill] ??= []).push(fact);
    }
  }
  return map;
})();

/** The facts a skill's items call on. Prototype-safe: skill ids reach here from a URL. */
export function factsForSkill(skill: SkillId | undefined): MustKnowFact[] {
  return own(BY_SKILL, skill) ?? [];
}

function rationaleFor(evidence: RecallEvidence[], locale: 'en' | 'vi'): string {
  const n = evidence.length;
  const numbers = evidence.map((e) => `#${e.number}`).join(', ');
  const slow = evidence.filter((e) => e.slow).length;

  if (locale === 'vi') {
    const head = `${n} câu bạn sai (${numbers}) đều cần đến kiến thức này.`;
    const tail = slow > 0
      ? ` ${slow} trong số đó còn vượt thời gian dự kiến — đúng dấu hiệu của việc dựng lại công thức thay vì nhớ sẵn.`
      : '';
    return `${head}${tail} Hãy tự kiểm tra: nếu bạn nhớ ngay thì bỏ qua, nguyên nhân sai nằm ở chỗ khác.`;
  }
  const head = `${n} ${n === 1 ? 'item you missed' : 'items you missed'} (${numbers}) called on this.`;
  const tail = slow > 0
    ? ` ${slow} of them also ran long — the signature of reconstructing a formula rather than recalling it.`
    : '';
  return `${head}${tail} Self-check: if it comes back instantly, skip it — the error was somewhere else.`;
}

/**
 * The facts worth checking after an attempt, ranked by seconds recoverable.
 *
 * Returns an empty list when nothing qualifies, which is the common case for a
 * clean section and is reported as such rather than padded.
 */
export function recallCheck(rows: readonly ReviewRow[]): RecallCandidate[] {
  const qualifying = qualifyingSkills(missesBySkill(rows));
  if (qualifying.size === 0) return [];

  const byFact = new Map<string, RecallEvidence[]>();
  for (const [skill, entry] of qualifying) {
    for (const fact of factsForSkill(skill)) {
      const list = byFact.get(fact.id) ?? [];
      list.push(...entry.rows);
      byFact.set(fact.id, list);
    }
  }

  const candidates: RecallCandidate[] = [];
  for (const fact of MUST_KNOW) {
    const evidence = byFact.get(fact.id);
    if (!evidence || evidence.length === 0) continue;
    const ordered = [...evidence].sort((a, b) => a.number - b.number);
    candidates.push({
      fact,
      evidence: ordered,
      payback: fact.cost * ordered.length,
      rationale: rationaleFor(ordered, 'en'),
      rationaleVi: rationaleFor(ordered, 'vi'),
    });
  }

  return candidates.sort((a, b) => b.payback - a.payback || b.fact.cost - a.fact.cost);
}

/**
 * How the learner's own answer to a drill enters the review schedule.
 *
 * Three buttons, not five. The scale in `srs.ts` runs 0–5, but a fact is
 * binary in the way that matters — it was there or it was not — and the middle
 * of a five-point scale invites a learner to record "sort of", which schedules
 * nothing useful and feels like progress.
 */
export type RecallOutcome = 'missed' | 'slow' | 'instant';

export function gradeForOutcome(outcome: RecallOutcome): 1 | 3 | 5 {
  switch (outcome) {
    case 'missed':
      return 1;
    case 'slow':
      // Recalled, but not yet automatic — which for this file is the whole
      // point, so it comes back sooner than a clean hit.
      return 3;
    case 'instant':
      return 5;
  }
}

export interface RecallProgress {
  /** Facts the learner has sat at least once. */
  tested: number;
  /** Facts whose schedule says they are holding. */
  holding: number;
  /** Facts due today. */
  due: number;
  total: number;
}

export function recallProgress(
  cards: Record<string, SrsCard>,
  now = Date.now(),
): RecallProgress {
  const mine = Object.values(cards).filter((c) => c.ref.startsWith('mk:'));
  return {
    tested: mine.length,
    // Two clean passes and a live interval. One pass is a fact recalled once,
    // which is the thing this whole file exists to distinguish from holding it.
    holding: mine.filter((c) => c.repetitions >= 2 && c.dueAt > now).length,
    due: mine.filter((c) => c.dueAt <= now).length,
    total: MUST_KNOW.length,
  };
}
