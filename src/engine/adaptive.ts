/**
 * Adaptive delivery.
 *
 * Two related mechanisms live here:
 *
 * 1. Form assembly (linear-on-the-fly). A full-length delivery is built at
 *    run time from the calibrated bank, honouring the published Digital SAT
 *    blueprint: module sizes, domain weights, format mix, and the pretest
 *    slots that carry unscored field-test items.
 *
 * 2. Multistage routing and item selection. After the routing module, the
 *    ability estimate decides whether stage two draws from the upper or lower
 *    difficulty pool. Inside adaptive practice, items are chosen to maximise
 *    Fisher information at the current ability, with content balancing and
 *    exposure control so the same items do not resurface every session.
 */

import type {
  DifficultyBand,
  DomainId,
  Question,
  SectionId,
  TestForm,
  TestModule,
  ModulePathway,
} from '../types.ts';
import { information } from './irt.ts';
import { hashString, makeRng, shuffle } from '../lib/util.ts';
import { DOMAINS, SECTION_SPEC } from '../data/blueprint.ts';

/* ------------------------------------------------------------------ */
/* Routing                                                             */
/* ------------------------------------------------------------------ */

/**
 * Routing threshold on the theta metric. A student whose routing-module
 * ability lands at or above this point takes the harder second module. The
 * value sits slightly below the scale midpoint, matching the operational
 * design where somewhat more than half of test takers route upward.
 */
export const ROUTING_THRESHOLD = -0.15;

export function routePathway(routingTheta: number): Exclude<ModulePathway, 'routing'> {
  return routingTheta >= ROUTING_THRESHOLD ? 'upper' : 'lower';
}

/** Difficulty targets for each module, on the theta metric. */
const MODULE_TARGETS: Record<'routing' | 'upper' | 'lower', number> = {
  routing: 0.0,
  upper: 0.85,
  lower: -0.85,
};

/** Difficulty band mix per module, as counts out of 100. */
const BAND_MIX: Record<'routing' | 'upper' | 'lower', Record<DifficultyBand, number>> = {
  routing: { easy: 30, medium: 45, hard: 25 },
  upper: { easy: 10, medium: 35, hard: 55 },
  lower: { easy: 55, medium: 35, hard: 10 },
};

/* ------------------------------------------------------------------ */
/* Blueprint-constrained selection                                     */
/* ------------------------------------------------------------------ */

interface AssembleOptions {
  section: SectionId;
  pathway: 'routing' | 'upper' | 'lower';
  count: number;
  /** Items already placed elsewhere in this form. */
  exclude: Set<string>;
  bank: readonly Question[];
  rng: () => number;
}

/**
 * Chooses `count` items for one module. Domain quotas come from the published
 * blueprint weights; within a domain, items are ranked by how well their
 * difficulty matches the module target, then sampled from the top candidates
 * so successive assemblies differ.
 */
export function assembleModuleItems(options: AssembleOptions): Question[] {
  const { section, pathway, count, exclude, bank, rng } = options;
  const target = MODULE_TARGETS[pathway];
  const bandMix = BAND_MIX[pathway];

  const sectionDomains = DOMAINS.filter((d) => d.section === section);
  const pool = bank.filter((q) => q.section === section && !exclude.has(q.id));

  // Integer domain quotas that sum exactly to `count` (largest remainder).
  const quotas = allocate(
    sectionDomains.map((d) => d.weight),
    count,
  );

  const chosen: Question[] = [];
  const taken = new Set<string>();

  sectionDomains.forEach((domain, index) => {
    const quota = quotas[index];
    if (quota === 0) return;
    const candidates = pool.filter((q) => q.domain === domain.id && !taken.has(q.id));
    const picked = pickByBandMix(candidates, quota, bandMix, target, rng);
    for (const q of picked) {
      taken.add(q.id);
      chosen.push(q);
    }
  });

  // Backfill from anywhere in the section if a domain ran short — a real bank
  // is never perfectly balanced, and a short module is worse than a slightly
  // off-blueprint one.
  if (chosen.length < count) {
    const remaining = pool
      .filter((q) => !taken.has(q.id))
      .sort((a, b) => Math.abs(a.irt.b - target) - Math.abs(b.irt.b - target));
    for (const q of remaining) {
      if (chosen.length >= count) break;
      taken.add(q.id);
      chosen.push(q);
    }
  }

  // Deliver in a stable pseudo-random order so domains interleave the way the
  // operational test presents them.
  return shuffle(chosen, rng).slice(0, count);
}

/** Largest-remainder apportionment of `total` across fractional weights. */
export function allocate(weights: readonly number[], total: number): number[] {
  const sumWeights = weights.reduce((a, b) => a + b, 0) || 1;
  const exact = weights.map((w) => (w / sumWeights) * total);
  const floors = exact.map(Math.floor);
  let assigned = floors.reduce((a, b) => a + b, 0);
  const remainders = exact
    .map((value, index) => ({ index, frac: value - Math.floor(value) }))
    .sort((a, b) => b.frac - a.frac);
  let cursor = 0;
  while (assigned < total && remainders.length > 0) {
    floors[remainders[cursor % remainders.length].index] += 1;
    assigned += 1;
    cursor += 1;
  }
  return floors;
}

function pickByBandMix(
  candidates: readonly Question[],
  quota: number,
  bandMix: Record<DifficultyBand, number>,
  target: number,
  rng: () => number,
): Question[] {
  const bands: DifficultyBand[] = ['easy', 'medium', 'hard'];
  const bandQuotas = allocate(bands.map((b) => bandMix[b]), quota);
  const out: Question[] = [];
  const used = new Set<string>();

  bands.forEach((band, index) => {
    const want = bandQuotas[index];
    if (want === 0) return;
    const inBand = candidates
      .filter((q) => q.band === band && !used.has(q.id))
      .sort((a, b) => Math.abs(a.irt.b - target) - Math.abs(b.irt.b - target));
    // Randomesque: sample from the best 2x candidates to vary forms.
    const window = inBand.slice(0, Math.max(want, Math.min(inBand.length, want * 2)));
    for (const q of shuffle(window, rng).slice(0, want)) {
      used.add(q.id);
      out.push(q);
    }
  });

  if (out.length < quota) {
    const rest = candidates
      .filter((q) => !used.has(q.id))
      .sort((a, b) => Math.abs(a.irt.b - target) - Math.abs(b.irt.b - target));
    for (const q of rest) {
      if (out.length >= quota) break;
      used.add(q.id);
      out.push(q);
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Form assembly                                                       */
/* ------------------------------------------------------------------ */

export interface AssembleFormOptions {
  /** 'full' delivers both sections; a section id delivers only that one. */
  scope: 'full' | SectionId;
  bank: readonly Question[];
  label: string;
  seed?: number;
  /** Short diagnostic form: halves each module and its clock. */
  diagnostic?: boolean;
}

/**
 * Builds every module a delivery might need — the routing module plus both
 * candidate second-stage modules — so routing at run time is instantaneous
 * and the unchosen pathway is simply never delivered.
 */
export function assembleForm(options: AssembleFormOptions): TestForm {
  const { scope, bank, label, diagnostic = false } = options;
  const seed = options.seed ?? hashString(`${label}:${Date.now()}`);
  const rng = makeRng(seed);
  const formId = `form_${seed.toString(36)}`;

  const sections: SectionId[] = scope === 'full' ? ['rw', 'math'] : [scope];
  const modules: TestModule[] = [];
  const used = new Set<string>();

  for (const section of sections) {
    const spec = SECTION_SPEC[section];
    const perModule = diagnostic ? Math.round(spec.questionsPerModule / 2) : spec.questionsPerModule;
    const duration = diagnostic
      ? Math.round(spec.moduleSeconds / 2)
      : spec.moduleSeconds;
    const pretestPerModule = diagnostic ? 0 : spec.pretestPerModule;

    const stage1Items = assembleModuleItems({
      section,
      pathway: 'routing',
      count: perModule,
      exclude: used,
      bank,
      rng,
    });
    stage1Items.forEach((q) => used.add(q.id));

    modules.push({
      id: `${formId}_${section}_m1`,
      section,
      stage: 1,
      pathway: 'routing',
      durationSeconds: duration,
      questionIds: stage1Items.map((q) => q.id),
      pretestIds: pickPretest(stage1Items, pretestPerModule, rng),
    });

    for (const pathway of ['upper', 'lower'] as const) {
      // The two pathways may share items with each other (only one is ever
      // delivered) but never with the routing module.
      const exclude = new Set(used);
      const items = assembleModuleItems({
        section,
        pathway,
        count: perModule,
        exclude,
        bank,
        rng,
      });
      modules.push({
        id: `${formId}_${section}_m2_${pathway}`,
        section,
        stage: 2,
        pathway,
        durationSeconds: duration,
        questionIds: items.map((q) => q.id),
        pretestIds: pickPretest(items, pretestPerModule, rng),
      });
    }
  }

  return {
    id: formId,
    label,
    createdAt: Date.now(),
    modules,
    breakSeconds: scope === 'full' && !diagnostic ? 600 : 0,
  };
}

/** Field-test slots are spread through the module, never all at the end. */
function pickPretest(items: readonly Question[], count: number, rng: () => number): string[] {
  if (count <= 0 || items.length === 0) return [];
  const stride = Math.floor(items.length / (count + 1));
  const picks: string[] = [];
  for (let i = 1; i <= count; i += 1) {
    const jitter = Math.floor(rng() * Math.max(1, Math.floor(stride / 2)));
    const index = Math.min(items.length - 1, i * stride + jitter);
    const id = items[index].id;
    if (!picks.includes(id)) picks.push(id);
  }
  return picks;
}

/* ------------------------------------------------------------------ */
/* Adaptive practice item selection                                    */
/* ------------------------------------------------------------------ */

export interface SelectOptions {
  bank: readonly Question[];
  theta: number;
  count: number;
  /** Restrict to a section, or draw across both. */
  section?: SectionId | 'both';
  /** Restrict to these domains. */
  domains?: DomainId[];
  /** Restrict to these skills. */
  skills?: string[];
  /** Items to avoid — recently seen, or already in the session. */
  exclude?: ReadonlySet<string>;
  /** Per-item exposure counts, used to damp over-served items. */
  exposure?: Record<string, number>;
  rng?: () => number;
}

/**
 * Maximum-information selection with content balancing and exposure control.
 *
 * Pure max-information would serve the same handful of items to every learner
 * at a given ability, so each pick samples from the top candidates rather than
 * taking the argmax, and an item's score is damped by how often it has already
 * been served. Domain balance is enforced across the session, not per item.
 */
export function selectPracticeItems(options: SelectOptions): Question[] {
  const {
    bank,
    theta,
    count,
    section = 'both',
    domains,
    skills,
    exclude = new Set<string>(),
    exposure = {},
    rng = Math.random,
  } = options;

  let pool = bank.filter((q) => !exclude.has(q.id));
  if (section !== 'both') pool = pool.filter((q) => q.section === section);
  if (domains && domains.length > 0) pool = pool.filter((q) => domains.includes(q.domain));
  if (skills && skills.length > 0) pool = pool.filter((q) => skills.includes(q.skill));
  if (pool.length === 0) return [];

  const chosen: Question[] = [];
  const taken = new Set<string>();
  const domainCount = new Map<DomainId, number>();

  for (let i = 0; i < count; i += 1) {
    const remaining = pool.filter((q) => !taken.has(q.id));
    if (remaining.length === 0) break;

    // Soft cap: no domain may exceed its fair share by more than one item
    // while other domains are still available.
    const distinctDomains = new Set(remaining.map((q) => q.domain)).size;
    const fairShare = Math.ceil(count / Math.max(1, distinctDomains));

    let eligible = remaining.filter((q) => (domainCount.get(q.domain) ?? 0) < fairShare);
    if (eligible.length === 0) eligible = remaining;

    const scored = eligible
      .map((q) => {
        const info = information(theta, q.irt);
        const seen = exposure[q.id] ?? 0;
        // Diminishing return on repeat exposure, never fully excluding an item.
        const damping = 1 / (1 + 0.6 * seen);
        return { q, score: info * damping };
      })
      .sort((a, b) => b.score - a.score);

    const window = scored.slice(0, Math.max(1, Math.min(5, scored.length)));
    const pick = window[Math.floor(rng() * window.length)].q;
    taken.add(pick.id);
    chosen.push(pick);
    domainCount.set(pick.domain, (domainCount.get(pick.domain) ?? 0) + 1);
  }

  return chosen;
}

/**
 * Items whose difficulty sits in the learner's productive zone: hard enough
 * to be informative, not so hard that the session becomes discouraging. The
 * band corresponds to roughly a 60–80% success probability.
 */
export function inProductiveZone(theta: number, question: Question): boolean {
  const offset = question.irt.b - theta;
  return offset >= -0.6 && offset <= 1.1;
}
