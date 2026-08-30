/**
 * The must-know reference.
 *
 * The value of this document is one distinction: what the exam supplies
 * against what the candidate must carry. Get the `given` flag wrong and a
 * learner walks into the hall expecting a formula that never arrives, which is
 * a worse failure than any amount of thin prose.
 *
 * `cost` is the other field doing work. It is the reason a fact is on the list
 * — not its difficulty — so a fact with no cost has no business being here.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  MUST_KNOW,
  byPayback,
  mustKnowFor,
  mustKnowStats,
  type KnowledgeArea,
} from '../src/data/mustKnow.ts';

test('the reference sheet is not over-claimed', () => {
  // The official sheet carries six formulas and three facts. Anything much
  // beyond that means an entry is mislabelled, and the direction of that
  // error puts a candidate in the hall expecting help that is not coming.
  const given = MUST_KNOW.filter((f) => f.given);
  assert.ok(given.length <= 9, `${given.length} entries claim to be on a sheet that carries nine`);
  for (const fact of given) {
    assert.ok(
      fact.area === 'geometry' || fact.area === 'trigonometry',
      `${fact.id}: the sheet carries geometry only, not ${fact.area}`,
    );
  }
});

test('the overwhelming majority is what the candidate must carry', () => {
  const stats = mustKnowStats();
  assert.ok(
    stats.mustCarry > stats.given * 4,
    'the asymmetry this document exists to show is not present',
  );
  assert.equal(stats.given + stats.mustCarry, stats.total);
});

test('every fact costs something to derive, and not a lesson’s worth', () => {
  for (const fact of MUST_KNOW) {
    assert.ok(fact.cost >= 5, `${fact.id}: no cost means no reason to memorise it`);
    assert.ok(fact.cost <= 60, `${fact.id}: a minute of derivation is a lesson, not a fact`);
  }
});

test('every fact says why recall beats derivation, and never says "it is on the test"', () => {
  for (const fact of MUST_KNOW) {
    assert.ok(fact.why.trim().length > 50, `${fact.id}: no reason given`);
    assert.ok(fact.whyVi.trim().length > 35, `${fact.id}: the reason is not bilingual`);
    assert.ok(
      !fact.why.toLowerCase().includes('because it is on the test'),
      `${fact.id}: "it is on the test" explains nothing`,
    );
  }
});

test('every fact can be self-tested', () => {
  // A fact a learner has read is not a fact a learner has.
  for (const fact of MUST_KNOW) {
    assert.ok(fact.drill.prompt.trim().length > 8, `${fact.id}: no drill prompt`);
    assert.ok(fact.drill.answer.trim().length > 0, `${fact.id}: no drill answer`);
    assert.ok(fact.drill.promptVi.trim().length > 5, `${fact.id}: the drill is not bilingual`);
  }
});

test('ids are unique', () => {
  const ids = MUST_KNOW.map((f) => f.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('payback order puts the highest cost-times-frequency first', () => {
  const ordered = byPayback();
  const weight = { 'every-module': 3, 'most-modules': 2, occasional: 1 } as const;
  const score = (f: (typeof ordered)[number]) => f.cost * weight[f.frequency];

  for (let i = 1; i < ordered.length; i += 1) {
    assert.ok(
      score(ordered[i - 1]) >= score(ordered[i]),
      `${ordered[i - 1].id} ranked above ${ordered[i].id} but pays back less`,
    );
  }
  assert.equal(ordered.length, MUST_KNOW.length, 'the ordering drops or duplicates facts');
});

test('both sections are covered, not only the one with formulas', () => {
  const math = MUST_KNOW.filter((f) => f.section === 'math').length;
  const rw = MUST_KNOW.filter((f) => f.section === 'rw').length;
  assert.ok(math >= 25, `only ${math} Maths facts`);
  assert.ok(rw >= 8, `only ${rw} Reading and Writing facts — conventions must be automatic too`);
});

test('every area holds something', () => {
  const areas: KnowledgeArea[] = [
    'algebra', 'functions', 'geometry', 'trigonometry', 'data', 'punctuation', 'grammar',
  ];
  for (const area of areas) {
    assert.ok(mustKnowFor(area).length >= 3, `${area}: only ${mustKnowFor(area).length} facts`);
  }
});

test('the per-module cost is real enough to be worth acting on', () => {
  // Counting only what recurs every module. If this were small, the whole
  // document would be advice without a reason behind it.
  const stats = mustKnowStats();
  assert.ok(
    stats.costIfDerived >= 90,
    `${stats.costIfDerived}s is not enough lost time to justify the memorisation`,
  );
});
