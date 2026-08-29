/**
 * Score production: theta -> section scale (200–800) -> total (400–1600).
 *
 * The Digital SAT reports each section on a 200–800 scale in 10-point
 * increments. SAT365 derives that scale from the IRT ability estimate rather
 * than from a raw-score lookup table, because raw score is not comparable
 * across the adaptive pathways: 20 correct on the upper module and 20 correct
 * on the lower module represent very different proficiencies.
 *
 * The linear transform below is anchored so that:
 *   theta = 0.0  ->  500 (the scale midpoint)
 *   theta = +3.0 ->  800 (ceiling)
 *   theta = -3.0 ->  200 (floor)
 * i.e. scaled = 500 + 100 * theta, clamped and rounded to the nearest 10.
 *
 * Because the ceiling is only reachable through the upper pathway, a student
 * routed to the lower module is capped in the same way the operational test
 * caps them — this is a property of adaptive delivery, not a penalty we add.
 */

import type {
  Attempt,
  DomainId,
  Question,
  ScoreReport,
  SectionId,
  SectionScore,
  SkillPerformance,
  TestModule,
  ModulePathway,
} from '../types.ts';
import { estimateAbility, pCorrect, standardError, type ScoredResponse } from './irt.ts';
import { clamp, mean, median, roundTo } from '../lib/util.ts';

/** Scale anchors. */
const SCALE_MID = 500;
const SCALE_PER_THETA = 100;
export const SECTION_MIN = 200;
export const SECTION_MAX = 800;

/**
 * Ceiling imposed by routing into the lower second-stage module. Mirrors the
 * operational behaviour where the lower module's items cannot demonstrate
 * top-band proficiency.
 */
const LOWER_PATHWAY_CEILING = 620;

export function thetaToScaled(theta: number, pathway: ModulePathway = 'upper'): number {
  const raw = SCALE_MID + SCALE_PER_THETA * theta;
  const ceiling = pathway === 'lower' ? LOWER_PATHWAY_CEILING : SECTION_MAX;
  return roundTo(clamp(raw, SECTION_MIN, ceiling), 10);
}

export function scaledToTheta(scaled: number): number {
  return (scaled - SCALE_MID) / SCALE_PER_THETA;
}

/** Standard error on the theta metric, expressed in scale points. */
export function seToScalePoints(seTheta: number): number {
  return Math.round(seTheta * SCALE_PER_THETA);
}

/* ------------------------------------------------------------------ */
/* Answer checking                                                     */
/* ------------------------------------------------------------------ */

/**
 * Normalises a student-produced response for comparison. The Digital SAT
 * accepts equivalent forms (fraction, decimal, with or without a leading
 * zero), so the comparison happens on numeric value with a tolerance that
 * matches the test's own 5-character entry field.
 */
export function normaliseSpr(input: string): string {
  return input.trim().replace(/\s+/g, '').replace(/^\+/, '');
}

export function sprToNumber(input: string): number | null {
  const text = normaliseSpr(input);
  if (text === '') return null;
  const fraction = /^(-?\d+)\/(\d+)$/.exec(text);
  if (fraction) {
    const denominator = Number(fraction[2]);
    if (denominator === 0) return null;
    return Number(fraction[1]) / denominator;
  }
  if (!/^-?(\d+\.?\d*|\.\d+)$/.test(text)) return null;
  const value = Number(text);
  return Number.isFinite(value) ? value : null;
}

export function isCorrect(question: Question, value: string | null): boolean {
  if (value === null || value.trim() === '') return false;
  if (question.format === 'mcq') {
    return String(question.answer) === value;
  }
  const accepted = Array.isArray(question.answer) ? question.answer : [question.answer];
  const given = sprToNumber(value);
  if (given === null) {
    // Fall back to literal string match for non-numeric accepted forms.
    return accepted.some((a) => normaliseSpr(a) === normaliseSpr(value));
  }
  return accepted.some((a) => {
    const target = sprToNumber(a);
    if (target === null) return normaliseSpr(a) === normaliseSpr(value);
    // Tolerance covers rounding a repeating decimal into 5 characters.
    return Math.abs(target - given) <= Math.max(1e-6, Math.abs(target) * 1e-4);
  });
}

/* ------------------------------------------------------------------ */
/* Section and total scoring                                           */
/* ------------------------------------------------------------------ */

export interface ScoringContext {
  questions: Map<string, Question>;
  modules: Map<string, TestModule>;
}

/**
 * Mastery blends accuracy with the difficulty of what was attempted, so
 * answering easy items correctly does not read as mastery. Expressed as the
 * modelled probability of success on a medium-difficulty item of the skill.
 */
function masteryFromResponses(responses: ScoredResponse[]): number {
  if (responses.length === 0) return 0;
  const { theta } = estimateAbility(responses);
  return pCorrect(theta, { a: 1.0, b: 0.0 });
}

export function scoreSection(
  section: SectionId,
  attempt: Attempt,
  context: ScoringContext,
): SectionScore | null {
  const sectionModules = attempt.deliveredModuleIds
    .map((id) => context.modules.get(id))
    .filter((m): m is TestModule => Boolean(m) && m!.section === section);

  if (sectionModules.length === 0) return null;

  const operational: ScoredResponse[] = [];
  const skillBuckets = new Map<string, { domain: DomainId; responses: ScoredResponse[]; seconds: number[] }>();
  const domainTally = new Map<DomainId, { attempted: number; correct: number; responses: ScoredResponse[] }>();

  let rawCorrect = 0;
  let rawAttempted = 0;
  let operationalCount = 0;

  for (const module of sectionModules) {
    const pretest = new Set(module.pretestIds);
    for (const questionId of module.questionIds) {
      const question = context.questions.get(questionId);
      if (!question) continue;
      const response = attempt.responses[questionId];
      const answered = Boolean(response && response.value !== null && response.value !== '');
      const correct = Boolean(response?.correct);

      if (answered) rawAttempted += 1;

      if (pretest.has(questionId)) continue; // unscored field-test item

      operationalCount += 1;
      if (correct) rawCorrect += 1;
      operational.push({ item: question.irt, correct });

      const bucket = skillBuckets.get(question.skill) ?? {
        domain: question.domain,
        responses: [],
        seconds: [],
      };
      bucket.responses.push({ item: question.irt, correct });
      if (response) bucket.seconds.push(response.msSpent / 1000);
      skillBuckets.set(question.skill, bucket);

      const domain = domainTally.get(question.domain) ?? { attempted: 0, correct: 0, responses: [] };
      domain.attempted += 1;
      if (correct) domain.correct += 1;
      domain.responses.push({ item: question.irt, correct });
      domainTally.set(question.domain, domain);
    }
  }

  const { theta } = estimateAbility(operational);
  const items = operational.map((r) => r.item);
  const seTheta = Math.min(standardError(theta, items), 0.6);
  const stage2 = sectionModules.find((m) => m.stage === 2);
  const pathway: ModulePathway = stage2?.pathway ?? 'routing';

  const skills: SkillPerformance[] = [...skillBuckets.entries()].map(([skill, bucket]) => ({
    skill,
    domain: bucket.domain,
    attempted: bucket.responses.length,
    correct: bucket.responses.filter((r) => r.correct).length,
    meanSeconds: mean(bucket.seconds),
    mastery: masteryFromResponses(bucket.responses),
  }));

  const domains = [...domainTally.entries()].map(([domain, tally]) => ({
    domain,
    attempted: tally.attempted,
    correct: tally.correct,
    mastery: masteryFromResponses(tally.responses),
  }));

  return {
    section,
    scaled: thetaToScaled(theta, pathway),
    sem: seToScalePoints(seTheta),
    theta,
    rawCorrect,
    rawAttempted,
    operationalCount,
    pathway,
    domains,
    skills,
  };
}

/** College-readiness benchmarks published by the College Board. */
export const BENCHMARKS: Record<SectionId, number> = { rw: 480, math: 530 };

/**
 * Percentile lookup against the SAT nationally representative sample.
 * Interpolated linearly between published anchor points.
 */
const PERCENTILE_ANCHORS: Array<[score: number, percentile: number]> = [
  [400, 1], [600, 4], [700, 10], [800, 18], [900, 29], [1000, 41],
  [1050, 48], [1100, 57], [1150, 65], [1200, 74], [1250, 81],
  [1300, 86], [1350, 91], [1400, 94], [1450, 96], [1500, 98],
  [1550, 99], [1600, 99],
];

export function percentileForTotal(total: number): number {
  if (total <= PERCENTILE_ANCHORS[0][0]) return PERCENTILE_ANCHORS[0][1];
  const last = PERCENTILE_ANCHORS[PERCENTILE_ANCHORS.length - 1];
  if (total >= last[0]) return last[1];
  for (let i = 1; i < PERCENTILE_ANCHORS.length; i += 1) {
    const [hiScore, hiPct] = PERCENTILE_ANCHORS[i];
    const [loScore, loPct] = PERCENTILE_ANCHORS[i - 1];
    if (total <= hiScore) {
      const t = (total - loScore) / (hiScore - loScore);
      return Math.round(loPct + t * (hiPct - loPct));
    }
  }
  return 50;
}

export function scoreAttempt(attempt: Attempt, context: ScoringContext): ScoreReport {
  const sections: SectionScore[] = [];
  for (const section of ['rw', 'math'] as SectionId[]) {
    const result = scoreSection(section, attempt, context);
    if (result) sections.push(result);
  }

  // A single-section delivery is reported on its own scale; the total is only
  // meaningful when both sections were administered.
  const total = sections.reduce((acc, s) => acc + s.scaled, 0);
  const totalSem = Math.round(
    Math.sqrt(sections.reduce((acc, s) => acc + s.sem * s.sem, 0)),
  );

  const pacing = sections.map((section) => {
    const seconds: number[] = [];
    const targets: number[] = [];
    let rushedCount = 0;
    let overrunCount = 0;

    for (const moduleId of attempt.deliveredModuleIds) {
      const module = context.modules.get(moduleId);
      if (!module || module.section !== section.section) continue;
      for (const questionId of module.questionIds) {
        const question = context.questions.get(questionId);
        const response = attempt.responses[questionId];
        if (!question || !response || response.value === null) continue;
        const spent = response.msSpent / 1000;
        seconds.push(spent);
        targets.push(question.targetSeconds);
        if (spent < question.targetSeconds * 0.4) rushedCount += 1;
        if (spent > question.targetSeconds * 1.8) overrunCount += 1;
      }
    }

    return {
      section: section.section,
      medianSeconds: Math.round(median(seconds)),
      targetSeconds: Math.round(mean(targets)),
      rushedCount,
      overrunCount,
    };
  });

  return {
    attemptId: attempt.id,
    scoredAt: Date.now(),
    total,
    totalBand: [
      Math.max(400, roundTo(total - totalSem, 10)),
      Math.min(1600, roundTo(total + totalSem, 10)),
    ],
    sections,
    percentile: sections.length === 2 ? percentileForTotal(total) : 0,
    benchmarks: sections.map((s) => ({
      section: s.section,
      benchmark: BENCHMARKS[s.section],
      met: s.scaled >= BENCHMARKS[s.section],
    })),
    pacing,
  };
}

/**
 * Predicted total from the learner's running per-section ability estimates,
 * used on the dashboard between full-length tests. Reported with a wider band
 * than a real test because practice responses are less controlled.
 */
export function predictTotal(rwTheta: number, mathTheta: number): number {
  return thetaToScaled(rwTheta) + thetaToScaled(mathTheta);
}
