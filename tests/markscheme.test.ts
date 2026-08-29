/**
 * Mark schemes for published papers.
 *
 * The property that matters is agreement: a raw score converted by hand from
 * the printed table must land where the engine would have put the same
 * performance. A scheme that disagreed with the platform's own scoring would
 * produce two different scores for one sitting, and the candidate would have
 * no way to tell which was right.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { characteristicCurve, rawToTheta, markScheme, formComposition } from '../src/engine/markScheme.ts';
import { thetaToScaled } from '../src/engine/scoring.ts';
import { assembleLinearForm } from '../src/engine/adaptive.ts';
import { BANK, QUESTION_BY_ID } from '../src/data/bank.ts';
import { PAPERS, paperById } from '../src/data/papers.ts';
import type { Question } from '../src/types.ts';

/** The scored items of one section of a published paper. */
function operationalFor(paperId: string, section: 'rw' | 'math'): Question[] {
  const paper = paperById(paperId)!;
  const form = assembleLinearForm({ scope: paper.scope, bank: BANK, label: paper.name, seed: paper.seed });
  const modules = form.modules.filter((m) => m.section === section);
  const pretest = new Set(modules.flatMap((m) => m.pretestIds));
  return modules
    .flatMap((m) => m.questionIds.map((id) => QUESTION_BY_ID.get(id)))
    .filter((q): q is Question => Boolean(q) && !pretest.has(q!.id));
}

test('the characteristic curve rises with ability and is bounded by the item count', () => {
  const items = operationalFor('sat365-p1', 'rw').map((q) => q.irt);
  let previous = -Infinity;
  for (let theta = -4; theta <= 4; theta += 0.25) {
    const expected = characteristicCurve(theta, items);
    assert.ok(expected > previous, `the curve fell between ${theta - 0.25} and ${theta}`);
    assert.ok(expected >= 0 && expected <= items.length);
    previous = expected;
  }
});

test('a raw score converts to the ability at which it is expected', () => {
  // The inversion is the whole scheme, so it is checked against the forward
  // direction rather than trusted.
  const items = operationalFor('sat365-p1', 'math').map((q) => q.irt);
  const lowest = characteristicCurve(-4, items);
  const highest = characteristicCurve(4, items);

  for (let raw = Math.ceil(lowest) + 1; raw < Math.floor(highest); raw += 3) {
    const theta = rawToTheta(raw, items);
    const back = characteristicCurve(theta, items);
    assert.ok(
      Math.abs(back - raw) < 0.01,
      `raw ${raw} inverted to θ ${theta.toFixed(3)}, which predicts ${back.toFixed(3)}`,
    );
  }
});

test('a scheme is monotonic: more correct never scores lower', () => {
  for (const paper of PAPERS) {
    for (const section of ['rw', 'math'] as const) {
      const operational = operationalFor(paper.id, section);
      if (operational.length === 0) continue;
      const scheme = markScheme('form_x', section, operational);
      for (let i = 1; i < scheme.rows.length; i += 1) {
        assert.ok(
          scheme.rows[i].scaled >= scheme.rows[i - 1].scaled,
          `${paper.id}/${section}: raw ${scheme.rows[i].raw} scores below raw ${scheme.rows[i - 1].raw}`,
        );
      }
    }
  }
});

test('a scheme covers every attainable raw score and stays on the reported scale', () => {
  const operational = operationalFor('sat365-p1', 'rw');
  const scheme = markScheme('form_x', 'rw', operational);

  assert.equal(scheme.rows.length, operational.length + 1, 'every raw score from 0 to n must have a row');
  assert.equal(scheme.rows[0].raw, 0);
  assert.equal(scheme.rows[scheme.rows.length - 1].raw, operational.length);
  for (const row of scheme.rows) {
    assert.ok(row.scaled >= 200 && row.scaled <= 800, `${row.raw} → ${row.scaled} is off the section scale`);
    assert.equal(row.scaled % 10, 0, 'section scores are reported to the nearest ten');
  }
});

test('the flat ends are reported as bounds rather than as points', () => {
  // A perfect raw score is consistent with any ability above the point where
  // the curve flattens. Reporting it as a point claims precision that the
  // measurement does not have.
  const operational = operationalFor('sat365-p1', 'math');
  const scheme = markScheme('form_x', 'math', operational);

  assert.equal(scheme.rows[0].bounded, true, 'a zero raw score cannot identify an ability');
  assert.equal(
    scheme.rows[scheme.rows.length - 1].bounded,
    true,
    'a perfect raw score cannot identify an ability',
  );
  // And the middle of the table is not bounded, or the scheme would say nothing.
  const middle = scheme.rows[Math.floor(scheme.rows.length / 2)];
  assert.equal(middle.bounded, false);
});

test('a scheme agrees with the engine’s own scale transform', () => {
  // The scheme must not become a second, drifting source of truth about what a
  // theta is worth.
  const operational = operationalFor('sat365-p1', 'rw');
  const scheme = markScheme('form_x', 'rw', operational);
  for (const row of scheme.rows) {
    assert.equal(row.scaled, thetaToScaled(row.theta), `raw ${row.raw} disagrees with thetaToScaled`);
  }
});

test('every published paper assembles, and does so identically every time', () => {
  // "Published" means the same paper on every device and every build. If the
  // seed stopped reproducing the form, printed papers and on-screen sittings
  // would silently diverge.
  for (const paper of PAPERS) {
    const first = assembleLinearForm({ scope: paper.scope, bank: BANK, label: paper.name, seed: paper.seed });
    const again = assembleLinearForm({ scope: paper.scope, bank: BANK, label: paper.name, seed: paper.seed });

    assert.ok(first.modules.length > 0, `${paper.id} produced no modules`);
    assert.deepEqual(
      first.modules.map((m) => m.questionIds),
      again.modules.map((m) => m.questionIds),
      `${paper.id} is not reproducible from its seed`,
    );
  }
});

test('a paper never repeats an item within itself', () => {
  for (const paper of PAPERS) {
    const form = assembleLinearForm({ scope: paper.scope, bank: BANK, label: paper.name, seed: paper.seed });
    const ids = form.modules.flatMap((m) => m.questionIds);
    assert.equal(new Set(ids).size, ids.length, `${paper.id} asks the same item twice`);
  }
});

test('paper ids are unique and every scope is one the assembler accepts', () => {
  const ids = PAPERS.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length, 'two papers share an id');
  for (const paper of PAPERS) {
    assert.ok(['full', 'rw', 'math'].includes(paper.scope), `${paper.id}: bad scope`);
    assert.ok(paper.name.trim().length > 0 && paper.nameVi.trim().length > 0);
    assert.ok(paper.purpose.trim().length > 40, `${paper.id}: purpose too thin to guide use`);
    assert.ok(paper.purposeVi.trim().length > 20, `${paper.id}: no Vietnamese purpose`);
  }
});

test('the specification reports the paper it was given', () => {
  const operational = operationalFor('sat365-p1', 'math');
  const composition = formComposition(operational);
  const counted = composition.byBand.easy + composition.byBand.medium + composition.byBand.hard;
  assert.equal(counted, operational.length, 'the band counts do not account for every item');
  assert.equal(
    composition.byDomain.reduce((n, d) => n + d.count, 0),
    operational.length,
    'the domain counts do not account for every item',
  );
});
