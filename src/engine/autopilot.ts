/**
 * The automated coach.
 *
 * Given everything the platform knows about a learner, this produces the
 * programme for today: concrete blocks, with the questions already selected,
 * in the order they should be worked — plus the reasoning behind every
 * decision and any flag a human needs to see.
 *
 * Three commitments shape the design:
 *
 * 1. **It always explains itself.** Every block traces to a rule, and every
 *    rule firing records the evidence that triggered it. A learner or a coach
 *    can ask why and get a real answer.
 *
 * 2. **It refuses to prescribe past what it knows.** With thin evidence, the
 *    programme stays small and says so, rather than manufacturing a confident
 *    plan out of four data points.
 *
 * 3. **It knows when to stop and call a person.** Disengagement, decline under
 *    sustained effort, and an unreachable target all raise escalations. An
 *    automated system that quietly keeps issuing homework to a learner in
 *    trouble is worse than no system.
 */

import type { DomainId, Question, SectionId, SkillId } from '../types.ts';
import { BANK } from '../data/bank.ts';
import { DOMAINS, SECTION_SPEC } from '../data/blueprint.ts';
import { selectPracticeItems } from './adaptive.ts';
import { addDays, daysBetween, isoDate, uid } from '../lib/util.ts';
import {
  RULES,
  type BlockKind,
  type BlockRequest,
  type Escalation,
  type Evidence,
  type LoadBand,
  type RuleContext,
} from './interventions.ts';

/* ------------------------------------------------------------------ */
/* Output                                                              */
/* ------------------------------------------------------------------ */

export interface SessionBlock {
  id: string;
  kind: BlockKind;
  minutes: number;
  /** The rule that produced this block. */
  ruleId: string;
  section?: SectionId;
  skills?: SkillId[];
  assignmentId?: string;
  /**
   * Items chosen ahead of time for a drill, so the learner taps once and
   * starts. Empty for kinds that do not consume bank items.
   */
  questionIds: string[];
}

export interface Decision {
  id: string;
  ruleId: string;
  summary: string;
  summaryVi: string;
  action: string;
  actionVi: string;
  rationale: string;
  rationaleVi: string;
  evidence: Evidence[];
  /** Blocks this decision contributed, by id. */
  blockIds: string[];
}

export interface DailyProgramme {
  date: string;
  load: LoadBand;
  /** Minutes the programme asks for in total. */
  totalMinutes: number;
  /** The minute budget the load band allowed. */
  budgetMinutes: number;
  blocks: SessionBlock[];
  decisions: Decision[];
  escalations: Escalation[];
  /** True when evidence is too thin for the programme to be more than a guess. */
  provisional: boolean;
}

/* ------------------------------------------------------------------ */
/* Load                                                                */
/* ------------------------------------------------------------------ */

/**
 * Minute budgets per load band, scaled by the learner's own commitment.
 *
 * A budget rather than a target: the programme is trimmed to fit it, because
 * a plan that asks for ninety minutes from someone who has fifteen is not a
 * plan, it is a way of teaching them that plans are ignorable.
 */
const LOAD_FACTOR: Record<LoadBand, number> = {
  recovery: 0.45,
  standard: 1,
  push: 1.35,
  taper: 0.5,
};

/** Order in which blocks are worked, regardless of which rule produced them. */
const BLOCK_ORDER: BlockKind[] = [
  'reflect',
  'diagnostic',
  'full-test',
  'assignment',
  'review',
  'drill',
  'vocab',
  'rest',
];

/* ------------------------------------------------------------------ */
/* Building the programme                                              */
/* ------------------------------------------------------------------ */

export interface AutopilotInput {
  context: RuleContext;
  /** Section ability, used to pick items at the right difficulty. */
  theta: Record<SectionId, number>;
  /** Items already served, so the selector can damp repeats. */
  exposure: Record<string, number>;
  /** Items to keep out of today's programme entirely. */
  exclude?: ReadonlySet<string>;
  /** Daily minutes the learner committed to. */
  dailyMinutes: number;
  /** Injectable for deterministic tests. */
  rng?: () => number;
  bank?: readonly Question[];
}

export function buildProgramme(input: AutopilotInput): DailyProgramme {
  const { context, theta, exposure, dailyMinutes } = input;
  const bank = input.bank ?? BANK;
  const rng = input.rng ?? Math.random;
  const exclude = new Set(input.exclude ?? []);

  const ordered = [...RULES].sort((a, b) => a.priority - b.priority);

  const decisions: Decision[] = [];
  const escalations: Escalation[] = [];
  const requests: Array<{ request: BlockRequest; ruleId: string; decisionIndex: number }> = [];
  let load: LoadBand = 'standard';
  let stopped = false;

  for (const rule of ordered) {
    if (stopped) break;

    let outcome;
    try {
      outcome = rule.evaluate(context);
    } catch {
      // A rule that throws must not take the whole programme down with it.
      // Skipping it degrades the plan; crashing removes it entirely.
      continue;
    }
    if (!outcome) continue;

    const decision: Decision = {
      id: uid('dec'),
      ruleId: rule.id,
      summary: outcome.summary,
      summaryVi: outcome.summaryVi,
      action: outcome.action,
      actionVi: outcome.actionVi,
      rationale: rule.rationale,
      rationaleVi: rule.rationaleVi,
      evidence: outcome.evidence,
      blockIds: [],
    };
    decisions.push(decision);

    if (outcome.escalation) escalations.push(outcome.escalation);
    if (outcome.load) load = outcome.load;

    for (const request of outcome.blocks ?? []) {
      requests.push({ request, ruleId: rule.id, decisionIndex: decisions.length - 1 });
    }

    // An exclusive rule settles the day. Taper, rest, and disengagement all
    // work this way: they are not one input among several.
    if (outcome.exclusive) stopped = true;
  }

  const budget = Math.max(10, Math.round(dailyMinutes * LOAD_FACTOR[load]));

  /* ---- Materialise blocks, trimming to the budget ---- */

  const blocks: SessionBlock[] = [];
  const used = new Set(exclude);
  let spent = 0;

  const sorted = [...requests].sort(
    (a, b) => BLOCK_ORDER.indexOf(a.request.kind) - BLOCK_ORDER.indexOf(b.request.kind),
  );

  for (const { request, ruleId, decisionIndex } of sorted) {
    // A full-length rehearsal and a rest day are all-or-nothing; everything
    // else can be shortened to fit what is left.
    const indivisible = request.kind === 'full-test' || request.kind === 'rest';
    const remaining = budget - spent;

    if (indivisible) {
      if (request.kind === 'full-test' && spent > 0) continue;
    } else if (remaining < 5) {
      continue;
    }

    const minutes = indivisible ? request.minutes : Math.min(request.minutes, remaining);

    const questionIds =
      request.kind === 'drill'
        ? pickItems({ request, theta, exposure, used, bank, rng, minutes })
        : [];

    // A drill with nothing to serve is not a block; dropping it is better than
    // sending the learner into an empty session.
    if (request.kind === 'drill' && questionIds.length === 0) continue;

    for (const id of questionIds) used.add(id);

    const block: SessionBlock = {
      id: uid('blk'),
      kind: request.kind,
      minutes,
      ruleId,
      section: request.section,
      skills: request.skills,
      assignmentId: request.assignmentId,
      questionIds,
    };
    blocks.push(block);
    decisions[decisionIndex].blockIds.push(block.id);
    spent += minutes;
  }

  return {
    date: context.today,
    load,
    totalMinutes: spent,
    budgetMinutes: budget,
    blocks: blocks.sort((a, b) => BLOCK_ORDER.indexOf(a.kind) - BLOCK_ORDER.indexOf(b.kind)),
    decisions,
    escalations,
    // Below roughly forty responses the platform is guessing, and the
    // interface is required to say so.
    provisional: context.responseCount < 40,
  };
}

/** Roughly how many items fit in a number of minutes of drilling. */
function itemsForMinutes(minutes: number): number {
  return Math.max(4, Math.round(minutes / 1.6));
}

function pickItems({
  request,
  theta,
  exposure,
  used,
  bank,
  rng,
  minutes,
}: {
  request: BlockRequest;
  theta: Record<SectionId, number>;
  exposure: Record<string, number>;
  used: ReadonlySet<string>;
  bank: readonly Question[];
  rng: () => number;
  minutes: number;
}): string[] {
  const count = request.questionCount ?? itemsForMinutes(minutes);

  // Difficulty is expressed as an offset from the learner's ability, so
  // "harder" means harder *for them* rather than harder in absolute terms.
  const offset = request.difficulty === 'easier' ? -0.6 : request.difficulty === 'harder' ? 0.7 : 0;

  const section: SectionId | 'both' = request.section ?? 'both';
  const base = section === 'both' ? (theta.rw + theta.math) / 2 : theta[section];

  const items = selectPracticeItems({
    bank,
    theta: base + offset,
    count,
    section,
    skills: request.skills,
    exclude: used,
    exposure,
    rng,
  });

  return items.map((q) => q.id);
}

/* ------------------------------------------------------------------ */
/* Building the rule context from platform state                       */
/* ------------------------------------------------------------------ */

/**
 * Domains carrying fewer than this many responses are treated as unknown
 * rather than as measured, and the coverage rule will sample them.
 */
const COVERAGE_FLOOR = 6;

export interface ContextSources {
  today?: string;
  testDate: string | null;
  targetTotal: number;
  lastTotal: number | null;
  fullTests: number;
  lastFullTestAt: number | null;
  responseCount: number;
  recentAccuracy: number | null;
  priorAccuracy: number | null;
  theta: Record<SectionId, number>;
  errors: RuleContext['errors'];
  weakSkills: RuleContext['weakSkills'];
  domainCounts: Array<{ domain: DomainId; section: SectionId; count: number }>;
  dueCards: number;
  overdueCards: number;
  activeDays7: number;
  activeDays28: number;
  streak: number;
  minutes7: number;
  minutesTarget7: number;
  habitAdherence: number;
  habitAdherence7: number;
  tier: RuleContext['tier'];
  limitingPillar: RuleContext['limitingPillar'];
  pillarScores: RuleContext['pillarScores'];
  gitaConfidence: number;
  assignmentsDue: RuleContext['assignmentsDue'];
  lastAttemptBlurs: number;
}

export function buildContext(sources: ContextSources): RuleContext {
  const today = sources.today ?? isoDate();

  const underCovered = sources.domainCounts
    .filter((d) => d.count < COVERAGE_FLOOR)
    .sort((a, b) => a.count - b.count)
    .map((d) => ({ domain: d.domain as string, section: d.section, count: d.count }));

  return {
    today,
    daysToTest: sources.testDate ? daysBetween(today, sources.testDate) : null,
    dayOfWeek: new Date(`${today}T00:00:00`).getDay(),

    activeDays28: sources.activeDays28,
    activeDays7: sources.activeDays7,
    streak: sources.streak,
    habitAdherence: sources.habitAdherence,
    habitAdherence7: sources.habitAdherence7,
    minutes7: sources.minutes7,
    minutesTarget7: sources.minutesTarget7,

    responseCount: sources.responseCount,
    recentAccuracy: sources.recentAccuracy,
    priorAccuracy: sources.priorAccuracy,
    theta: sources.theta,
    lastTotal: sources.lastTotal,
    targetTotal: sources.targetTotal,
    fullTests: sources.fullTests,
    daysSinceFullTest:
      sources.lastFullTestAt === null
        ? null
        : Math.max(0, daysBetween(isoDate(new Date(sources.lastFullTestAt)), today)),

    errors: sources.errors,
    weakSkills: sources.weakSkills,
    underCoveredDomains: underCovered,

    dueCards: sources.dueCards,
    overdueCards: sources.overdueCards,

    tier: sources.tier,
    limitingPillar: sources.limitingPillar,
    pillarScores: sources.pillarScores,
    gitaConfidence: sources.gitaConfidence,

    assignmentsDue: sources.assignmentsDue,
    lastAttemptBlurs: sources.lastAttemptBlurs,
  };
}

/* ------------------------------------------------------------------ */
/* Forecasting                                                         */
/* ------------------------------------------------------------------ */

export interface ForecastPoint {
  date: string;
  /** Projected total on the 400–1600 scale. */
  projected: number;
}

/**
 * Projects the score forward from the current total and committed hours.
 *
 * Deliberately conservative and explicitly compressed above 1300: gains do not
 * continue linearly, and a forecast that says otherwise sets a learner up to
 * feel they failed when they merely met a realistic curve.
 */
export function forecast(input: {
  from: number | null;
  targetTotal: number;
  testDate: string | null;
  weeklyHours: number;
  today?: string;
}): ForecastPoint[] {
  const today = input.today ?? isoDate();
  if (input.from === null || !input.testDate) return [];

  const days = daysBetween(today, input.testDate);
  if (days <= 0) return [];

  const points: ForecastPoint[] = [];
  let score = input.from;
  const step = Math.max(1, Math.round(days / 12));

  for (let offset = 0; offset <= days; offset += step) {
    points.push({ date: addDays(today, offset), projected: Math.round(Math.min(1600, score)) });
    const compression = score >= 1400 ? 0.35 : score >= 1300 ? 0.55 : score >= 1150 ? 0.8 : 1;
    score += (input.weeklyHours * (step / 7)) * 5.5 * compression;
  }

  return points;
}

/** Section names, for describing a block in the interface. */
export function blockSectionLabel(section: SectionId | undefined, locale: 'vi' | 'en'): string | null {
  if (!section) return null;
  return locale === 'vi' ? SECTION_SPEC[section].labelVi : SECTION_SPEC[section].label;
}

export { DOMAINS };
