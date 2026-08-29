/**
 * Automated coach tests.
 *
 * Two properties matter more than the rest and most of this file exists to
 * hold them: the system must not prescribe past what it knows, and it must
 * escalate rather than quietly keep issuing homework to a learner in trouble.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildContext,
  buildProgramme,
  forecast,
  type ContextSources,
  type DailyProgramme,
} from '../src/engine/autopilot.ts';
import { RULES, RULE_BY_ID, type RuleContext } from '../src/engine/interventions.ts';
import { BANK } from '../src/data/bank.ts';
import { DOMAINS } from '../src/data/blueprint.ts';
import { makeRng, addDays } from '../src/lib/util.ts';

/** A Wednesday, so no weekend or rest rule fires unless a test asks for it. */
const WED = '2026-06-17';
const SUN = '2026-06-21';
const SAT = '2026-06-20';

function sources(overrides: Partial<ContextSources> = {}): ContextSources {
  return {
    today: WED,
    testDate: '2026-10-03',
    targetTotal: 1500,
    lastTotal: 1250,
    fullTests: 2,
    lastFullTestAt: Date.parse('2026-06-10T10:00:00'),
    responseCount: 300,
    recentAccuracy: 0.7,
    priorAccuracy: 0.68,
    theta: { rw: 0.4, math: 0.3 },
    errors: { concept: 10, careless: 6, timeout: 4, omitted: 2 },
    weakSkills: [
      { skill: 'transitions', section: 'rw', mastery: 0.35, attempted: 9 },
      { skill: 'circles', section: 'math', mastery: 0.4, attempted: 7 },
    ],
    domainCounts: DOMAINS.map((d) => ({ domain: d.id, section: d.section, count: 40 })),
    dueCards: 6,
    overdueCards: 0,
    activeDays7: 5,
    activeDays28: 20,
    streak: 5,
    minutes7: 400,
    minutesTarget7: 480,
    habitAdherence: 0.8,
    habitAdherence7: 0.8,
    tier: 3,
    limitingPillar: 'talent',
    pillarScores: { goal: 70, inspirits: 65, talent: 45, action: 72 },
    gitaConfidence: 0.8,
    assignmentsDue: [],
    lastAttemptBlurs: 0,
    ...overrides,
  };
}

function programme(overrides: Partial<ContextSources> = {}, dailyMinutes = 60): DailyProgramme {
  const context = buildContext(sources(overrides));
  return buildProgramme({
    context,
    theta: context.theta,
    exposure: {},
    dailyMinutes,
    rng: makeRng(7),
    bank: BANK,
  });
}

function ruleFired(p: DailyProgramme, ruleId: string): boolean {
  return p.decisions.some((d) => d.ruleId === ruleId);
}

/* ================= Rule catalogue integrity ================= */

test('every rule is fully specified and has a unique id and priority slot', () => {
  const ids = RULES.map((r) => r.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate rule id');

  for (const rule of RULES) {
    assert.ok(rule.rationale.trim().length > 20, `${rule.id} has no usable rationale`);
    assert.ok(rule.rationaleVi.trim().length > 20, `${rule.id} has no Vietnamese rationale`);
    assert.ok(Number.isFinite(rule.priority), `${rule.id} priority`);
    assert.ok(RULE_BY_ID.get(rule.id), `${rule.id} not indexed`);
  }
});

test('no rule throws on a context with every optional signal missing', () => {
  const bare: RuleContext = buildContext(
    sources({
      testDate: null,
      lastTotal: null,
      lastFullTestAt: null,
      recentAccuracy: null,
      priorAccuracy: null,
      responseCount: 0,
      fullTests: 0,
      weakSkills: [],
      assignmentsDue: [],
      domainCounts: [],
    }),
  );

  for (const rule of RULES) {
    assert.doesNotThrow(() => rule.evaluate(bare), `${rule.id} threw on a bare context`);
  }
});

test('every decision carries evidence and a bilingual action', () => {
  const p = programme();
  assert.ok(p.decisions.length > 0, 'no rules fired on a typical context');

  for (const decision of p.decisions) {
    assert.ok(decision.evidence.length > 0, `${decision.ruleId} recorded no evidence`);
    assert.ok(decision.action.trim().length > 0, `${decision.ruleId} has no action`);
    assert.ok(decision.actionVi.trim().length > 0, `${decision.ruleId} has no Vietnamese action`);
    assert.ok(decision.rationale.trim().length > 0, `${decision.ruleId} has no rationale`);
  }
});

test('every block traces back to the rule that produced it', () => {
  const p = programme();
  const ruleIds = new Set(p.decisions.map((d) => d.ruleId));
  for (const block of p.blocks) {
    assert.ok(ruleIds.has(block.ruleId), `block ${block.id} cites unknown rule ${block.ruleId}`);
  }

  // And every block id a decision claims actually exists.
  const blockIds = new Set(p.blocks.map((b) => b.id));
  for (const decision of p.decisions) {
    for (const id of decision.blockIds) {
      assert.ok(blockIds.has(id), `decision ${decision.ruleId} cites a dropped block`);
    }
  }
});

/* ================= Safety ================= */

test('a disengaged learner gets an urgent escalation and no homework', () => {
  const p = programme({ activeDays7: 0, activeDays28: 1, responseCount: 200 });

  assert.ok(ruleFired(p, 'r-disengaged'), 'the disengagement rule did not fire');
  const escalation = p.escalations.find((e) => e.code === 'disengaged');
  assert.ok(escalation, 'no escalation raised');
  assert.equal(escalation!.severity, 'urgent');
  assert.equal(escalation!.forLevel, 'coach');

  assert.ok(!p.blocks.some((b) => b.kind === 'drill'), 'drills were prescribed to a disengaged learner');
  assert.equal(p.load, 'recovery');
});

test('a learner declining under sustained effort is not told to work harder', () => {
  const p = programme({
    recentAccuracy: 0.52,
    priorAccuracy: 0.7,
    habitAdherence: 0.85,
  });

  assert.ok(ruleFired(p, 'r-declining-under-effort'));
  assert.equal(p.load, 'recovery');
  assert.ok(p.escalations.some((e) => e.code === 'declining-under-effort'));

  // Whatever is prescribed must be easier, never harder.
  const drills = p.blocks.filter((b) => b.kind === 'drill');
  assert.ok(drills.length <= 1, 'a declining learner received multiple drills');
  assert.ok(p.totalMinutes < 60, `recovery load did not reduce volume: ${p.totalMinutes}`);
});

test('an unreachable target is raised with a human rather than absorbed', () => {
  const p = programme({
    lastTotal: 1000,
    targetTotal: 1580,
    testDate: addDays(WED, 21),
    minutesTarget7: 120,
  });

  assert.ok(ruleFired(p, 'r-target-out-of-reach'));
  const escalation = p.escalations.find((e) => e.code === 'target-unreachable');
  assert.ok(escalation);
  assert.equal(escalation!.forLevel, 'instructor');
});

test('a reachable target raises nothing', () => {
  const p = programme({
    lastTotal: 1400,
    targetTotal: 1450,
    testDate: addDays(WED, 90),
    minutesTarget7: 600,
  });
  assert.ok(!ruleFired(p, 'r-target-out-of-reach'));
});

test('repeated window departures are reported as an observation, not a finding', () => {
  const p = programme({ lastAttemptBlurs: 14 });
  const escalation = p.escalations.find((e) => e.code === 'integrity-anomaly');
  assert.ok(escalation);
  assert.equal(escalation!.severity, 'info', 'an integrity observation must not be raised as urgent');
  assert.match(escalation!.message, /observation, not a finding/);
});

/* ================= Calendar ================= */

test('the three days before a test are a taper with no new material', () => {
  for (const days of [1, 2, 3]) {
    const p = programme({ testDate: addDays(WED, days) });
    assert.equal(p.load, 'taper', `day ${days}`);
    assert.ok(!p.blocks.some((b) => b.kind === 'drill'), `new drilling ${days} days before the test`);
    assert.ok(!p.blocks.some((b) => b.kind === 'full-test'), `a rehearsal ${days} days before the test`);
  }
});

test('test day itself prescribes rest', () => {
  const p = programme({ testDate: WED });
  assert.equal(p.load, 'taper');
  assert.ok(p.blocks.every((b) => b.kind === 'rest' || b.kind === 'reflect'));
});

test('the day of a full-length test prescribes review and nothing else', () => {
  const p = programme({ lastFullTestAt: Date.parse(`${WED}T09:00:00`) });
  assert.ok(ruleFired(p, 'r-post-test-recovery'));
  assert.equal(p.load, 'recovery');
  assert.ok(!p.blocks.some((b) => b.kind === 'drill'));
});

test('a rehearsal is scheduled at the weekend once it is overdue', () => {
  const p = programme({
    today: SAT,
    lastFullTestAt: Date.parse('2026-05-20T09:00:00'),
    tier: 4,
  });
  assert.ok(ruleFired(p, 'r-schedule-rehearsal'));
  assert.ok(p.blocks.some((b) => b.kind === 'full-test'));
});

test('a rehearsal is never scheduled on a weekday', () => {
  const p = programme({ lastFullTestAt: Date.parse('2026-05-20T09:00:00'), tier: 4 });
  assert.ok(!p.blocks.some((b) => b.kind === 'full-test'));
});

test('a rehearsal is never scheduled in the final days before the test', () => {
  const p = programme({
    today: SAT,
    testDate: addDays(SAT, 3),
    lastFullTestAt: Date.parse('2026-05-20T09:00:00'),
    tier: 4,
  });
  assert.ok(!p.blocks.some((b) => b.kind === 'full-test'));
});

test('Sunday is a rest day after a week of real work', () => {
  const p = programme({ today: SUN, activeDays7: 5 });
  assert.ok(ruleFired(p, 'r-weekly-rest'));
  assert.equal(p.load, 'recovery');
  assert.ok(!p.blocks.some((b) => b.kind === 'drill'));
});

test('there is nothing to rest from after an empty week', () => {
  const p = programme({ today: SUN, activeDays7: 1 });
  assert.ok(!ruleFired(p, 'r-weekly-rest'));
});

/* ================= Getting started ================= */

test('a learner with no baseline is sent to the diagnostic first', () => {
  const p = programme({ fullTests: 0, responseCount: 0, lastTotal: null, lastFullTestAt: null });
  assert.ok(ruleFired(p, 'r-need-baseline'));
  assert.ok(p.blocks.some((b) => b.kind === 'diagnostic'));
  assert.ok(p.provisional, 'a programme built on no evidence must be marked provisional');
});

test('tier 1 gets one short session and no method lecture', () => {
  const p = programme({
    tier: 1,
    fullTests: 1,
    responseCount: 60,
    activeDays7: 1,
    activeDays28: 3,
  });
  assert.ok(ruleFired(p, 'r-tier-one-contact'));
  assert.ok(p.totalMinutes <= 20, `tier 1 was given ${p.totalMinutes} minutes`);
  assert.equal(p.blocks.filter((b) => b.kind === 'drill').length, 1);
});

/* ================= Prescription ================= */

test('review debt is cleared before new material is added', () => {
  const p = programme({ overdueCards: 40, dueCards: 45 });
  assert.ok(ruleFired(p, 'r-review-debt'));

  const review = p.blocks.findIndex((b) => b.kind === 'review');
  const drill = p.blocks.findIndex((b) => b.kind === 'drill');
  assert.ok(review >= 0, 'no review block');
  if (drill >= 0) assert.ok(review < drill, 'drilling was scheduled before the review backlog');
});

test('careless-dominated errors produce easier work, not harder', () => {
  const p = programme({ errors: { concept: 4, careless: 20, timeout: 2, omitted: 1 } });
  assert.ok(ruleFired(p, 'r-careless-dominant'));
  assert.ok(!ruleFired(p, 'r-pacing-dominant'));
});

test('rushed and omitted answers produce timed practice', () => {
  const p = programme({ errors: { concept: 5, careless: 2, timeout: 14, omitted: 8 } });
  assert.ok(ruleFired(p, 'r-pacing-dominant'));
});

test('an error profile too small to read produces neither', () => {
  const p = programme({ errors: { concept: 2, careless: 1, timeout: 1, omitted: 0 } });
  assert.ok(!ruleFired(p, 'r-careless-dominant'));
  assert.ok(!ruleFired(p, 'r-pacing-dominant'));
});

test('weak skills are drilled and the block carries those skills', () => {
  const p = programme();
  assert.ok(ruleFired(p, 'r-weak-skill-drill'));
  const drill = p.blocks.find((b) => b.skills && b.skills.length > 0);
  assert.ok(drill, 'no skill-targeted drill');
  assert.ok(drill!.skills!.includes('transitions'));
});

test('an under-covered domain is sampled', () => {
  const counts = DOMAINS.map((d) => ({
    domain: d.id,
    section: d.section,
    // Geometry has barely been touched; everything else is well covered.
    count: d.id === 'geometry-trigonometry' ? 1 : 40,
  }));
  const p = programme({ domainCounts: counts });
  assert.ok(ruleFired(p, 'r-coverage-gap'));

  const decision = p.decisions.find((d) => d.ruleId === 'r-coverage-gap')!;
  assert.match(decision.summary, /geometry-trigonometry/);
});

test('assignments due within two days come before the platform’s own work', () => {
  const p = programme({
    assignmentsDue: [
      { id: 'a1', title: 'Algebra set', dueDate: addDays(WED, 1), kind: 'practice', minutes: 25 },
    ],
  });
  assert.ok(ruleFired(p, 'r-assignment-due'));

  const assignment = p.blocks.findIndex((b) => b.kind === 'assignment');
  const drill = p.blocks.findIndex((b) => b.kind === 'drill');
  assert.ok(assignment >= 0);
  if (drill >= 0) assert.ok(assignment < drill, 'own work was scheduled ahead of set work');
});

test('an assignment due next month does not crowd out today', () => {
  const p = programme({
    assignmentsDue: [
      { id: 'a1', title: 'Later', dueDate: addDays(WED, 30), kind: 'practice', minutes: 25 },
    ],
  });
  assert.ok(!ruleFired(p, 'r-assignment-due'));
});

/* ================= Load and budget ================= */

test('the programme never exceeds the budget its load band allows', () => {
  for (const minutes of [15, 30, 60, 120]) {
    for (const override of [
      {},
      { overdueCards: 60, dueCards: 60 },
      { errors: { concept: 30, careless: 25, timeout: 20, omitted: 10 } },
      { assignmentsDue: [{ id: 'a', title: 'x', dueDate: WED, kind: 'practice', minutes: 60 }] },
    ]) {
      const p = programme(override, minutes);
      // A full-length rehearsal is indivisible and legitimately overruns.
      if (p.blocks.some((b) => b.kind === 'full-test')) continue;
      assert.ok(
        p.totalMinutes <= p.budgetMinutes,
        `budget ${p.budgetMinutes} exceeded by ${p.totalMinutes} at ${minutes} min/day`,
      );
    }
  }
});

test('recovery load prescribes less than standard load', () => {
  const standard = programme();
  const recovery = programme({ recentAccuracy: 0.5, priorAccuracy: 0.72, habitAdherence: 0.9 });
  assert.ok(recovery.budgetMinutes < standard.budgetMinutes);
});

test('a sliding habit reduces the load rather than holding it', () => {
  const p = programme({ habitAdherence: 0.8, habitAdherence7: 0.2 });
  assert.ok(ruleFired(p, 'r-adherence-slide'));
  assert.equal(p.load, 'recovery');
});

test('a learner who was never adherent is not treated as sliding', () => {
  const p = programme({ habitAdherence: 0.2, habitAdherence7: 0.2 });
  assert.ok(!ruleFired(p, 'r-adherence-slide'));
});

test('falling behind the weekly commitment late in the week adds work', () => {
  const p = programme({ today: SAT, minutes7: 60, minutesTarget7: 480, activeDays7: 1 });
  assert.ok(ruleFired(p, 'r-behind-volume'));
});

/* ================= Item selection ================= */

test('drill blocks arrive with their questions already chosen', () => {
  const p = programme();
  for (const block of p.blocks.filter((b) => b.kind === 'drill')) {
    assert.ok(block.questionIds.length > 0, 'a drill block was produced with no items');
    for (const id of block.questionIds) {
      assert.ok(BANK.some((q) => q.id === id), `unknown item ${id}`);
    }
  }
});

test('no item appears in two blocks on the same day', () => {
  const p = programme({ overdueCards: 0, dueCards: 0 });
  const seen = new Set<string>();
  for (const block of p.blocks) {
    for (const id of block.questionIds) {
      assert.ok(!seen.has(id), `item ${id} served twice in one day`);
      seen.add(id);
    }
  }
});

test('an easier block draws easier items than a harder one', () => {
  const difficulty = (p: DailyProgramme) => {
    const ids = p.blocks.flatMap((b) => b.questionIds);
    const items = ids.map((id) => BANK.find((q) => q.id === id)!).filter(Boolean);
    return items.reduce((acc, q) => acc + q.irt.b, 0) / Math.max(1, items.length);
  };

  const careless = programme({ errors: { concept: 3, careless: 25, timeout: 1, omitted: 1 } });
  const standard = programme();

  assert.ok(
    difficulty(careless) < difficulty(standard),
    `careless remediation drew harder items (${difficulty(careless).toFixed(2)} vs ${difficulty(standard).toFixed(2)})`,
  );
});

test('the programme is reproducible from its seed', () => {
  const build = () => {
    const context = buildContext(sources());
    return buildProgramme({
      context,
      theta: context.theta,
      exposure: {},
      dailyMinutes: 60,
      rng: makeRng(99),
      bank: BANK,
    });
  };
  const a = build();
  const b = build();
  assert.deepEqual(
    a.blocks.map((x) => [x.kind, x.minutes, x.questionIds]),
    b.blocks.map((x) => [x.kind, x.minutes, x.questionIds]),
  );
});

test('excluded items are never served', () => {
  const context = buildContext(sources());
  const first = buildProgramme({
    context,
    theta: context.theta,
    exposure: {},
    dailyMinutes: 60,
    rng: makeRng(3),
    bank: BANK,
  });
  const served = new Set(first.blocks.flatMap((b) => b.questionIds));

  const second = buildProgramme({
    context,
    theta: context.theta,
    exposure: {},
    dailyMinutes: 60,
    rng: makeRng(3),
    bank: BANK,
    exclude: served,
  });

  for (const id of second.blocks.flatMap((b) => b.questionIds)) {
    assert.ok(!served.has(id), `excluded item ${id} was served anyway`);
  }
});

/* ================= Forecast ================= */

test('the forecast rises, is capped, and starts where the learner is', () => {
  const points = forecast({
    from: 1100,
    targetTotal: 1500,
    testDate: addDays(WED, 120),
    weeklyHours: 10,
    today: WED,
  });

  assert.ok(points.length > 2);
  assert.equal(points[0].projected, 1100);
  for (let i = 1; i < points.length; i += 1) {
    assert.ok(points[i].projected >= points[i - 1].projected, 'the forecast fell');
    assert.ok(points[i].projected <= 1600, 'the forecast exceeded the scale');
  }
});

test('gains compress at higher scores', () => {
  const low = forecast({ from: 1000, targetTotal: 1600, testDate: addDays(WED, 60), weeklyHours: 10, today: WED });
  const high = forecast({ from: 1450, targetTotal: 1600, testDate: addDays(WED, 60), weeklyHours: 10, today: WED });

  const gain = (points: typeof low) => points[points.length - 1].projected - points[0].projected;
  assert.ok(gain(high) < gain(low), 'a high scorer was projected the same gain as a low scorer');
});

test('no forecast without a baseline or a date', () => {
  assert.equal(forecast({ from: null, targetTotal: 1500, testDate: '2026-10-03', weeklyHours: 8, today: WED }).length, 0);
  assert.equal(forecast({ from: 1200, targetTotal: 1500, testDate: null, weeklyHours: 8, today: WED }).length, 0);
  assert.equal(forecast({ from: 1200, targetTotal: 1500, testDate: WED, weeklyHours: 8, today: WED }).length, 0);
});
