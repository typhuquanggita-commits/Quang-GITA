/**
 * The expert solution library.
 *
 * One field carries the value of this library and one field is the easiest to
 * write thinly under pressure, and they are the same field. "A careless error"
 * is not a wrong turn; it is a shrug. So most of what follows is about
 * `wrongTurn` having substance, being a path rather than a verdict, and
 * saying where the path breaks.
 *
 * The other line held here is coverage. A skill with no expert solution is a
 * skill where the platform can say what to do and cannot say how an expert
 * decides — which is precisely the gap between 1400 and 1550.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { SOLUTIONS, solutionStats, solutionById, solutionsForSkill } from '../src/data/solution-index.ts';
import { DOMAINS } from '../src/data/blueprint.ts';

const skillIds = DOMAINS.flatMap((d) => d.skills.map((s) => s.id));

test('every measurable skill has at least one expert solution', () => {
  const covered = new Set(SOLUTIONS.map((s) => s.skill));
  const missing = skillIds.filter((skill) => !covered.has(skill));
  assert.deepEqual(missing, [], `no expert solution for: ${missing.join(', ')}`);
});

test('ids are unique and every solution is reachable by id', () => {
  const ids = SOLUTIONS.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const solution of SOLUTIONS) {
    assert.equal(solutionById(solution.id)?.skill, solution.skill);
  }
});

test('a skill id from a URL cannot reach the prototype chain', () => {
  // The lookup is keyed by a value that arrives from a hash route.
  for (const hostile of ['constructor', '__proto__', 'toString', 'valueOf']) {
    assert.deepEqual(solutionsForSkill(hostile as never), []);
  }
  assert.deepEqual(solutionsForSkill(undefined), []);
});

test('every solution leads with a read, not with a step', () => {
  for (const solution of SOLUTIONS) {
    assert.ok(
      solution.read.trim().length > 80,
      `${solution.id}: the read is too thin to be what an expert notices first`,
    );
    assert.ok(solution.readVi.trim().length > 50, `${solution.id}: the read is not bilingual`);
  }
});

test('every step is justified, not asserted', () => {
  for (const solution of SOLUTIONS) {
    assert.ok(solution.steps.length >= 2, `${solution.id}: a single step is not a solution`);
    for (const step of solution.steps) {
      assert.ok(step.act.trim().length > 25, `${solution.id}: a step with no action`);
      assert.ok(
        step.why.trim().length > 40,
        `${solution.id}: "${step.act.slice(0, 40)}…" is asserted rather than justified`,
      );
      assert.ok(step.actVi.trim() && step.whyVi.trim(), `${solution.id}: a step is not bilingual`);
    }
  }
});

/* ---------------- The field that matters ---------------- */

test('every wrong turn is a path a reasonable student would take', () => {
  for (const solution of SOLUTIONS) {
    assert.ok(
      solution.wrongTurn.path.trim().length > 80,
      `${solution.id}: the wrong turn is stated too briefly to be a path`,
    );
    assert.ok(
      solution.wrongTurn.pathVi.trim().length > 50,
      `${solution.id}: the wrong turn is not bilingual`,
    );
  }
});

test('every wrong turn says precisely where it breaks', () => {
  for (const solution of SOLUTIONS) {
    assert.ok(
      solution.wrongTurn.breaks.trim().length > 100,
      `${solution.id}: does not say where the wrong path breaks`,
    );
    assert.ok(solution.wrongTurn.breaksVi.trim().length > 60, `${solution.id}: not bilingual`);
  }
});

test('no wrong turn is dismissed as carelessness', () => {
  // "They were careless" explains nothing and teaches nothing. If a solution
  // reaches for it, the analysis has not been done.
  const shrugs = ['careless', 'not paying attention', 'rushed', 'silly mistake', 'bất cẩn', 'cẩu thả'];
  for (const solution of SOLUTIONS) {
    const text = `${solution.wrongTurn.path} ${solution.wrongTurn.pathVi}`.toLowerCase();
    for (const shrug of shrugs) {
      assert.ok(
        !text.includes(shrug),
        `${solution.id}: the wrong turn is dismissed as "${shrug}" rather than explained`,
      );
    }
  }
});

test('every solution says what generalises beyond the item', () => {
  for (const solution of SOLUTIONS) {
    assert.ok(solution.transfer.trim().length > 60, `${solution.id}: nothing transfers`);
    assert.ok(solution.transferVi.trim().length > 40, `${solution.id}: transfer is not bilingual`);
  }
});

/* ---------------- The item itself ---------------- */

test('every multiple-choice solution keys an option that exists', () => {
  for (const solution of SOLUTIONS) {
    if (!solution.choices) continue;
    const ids = solution.choices.map((c) => c.id);
    assert.ok(ids.includes(solution.answer), `${solution.id}: key ${solution.answer} is not a choice`);
    assert.equal(new Set(ids).size, ids.length, `${solution.id}: duplicate choice id`);
    assert.ok(ids.length >= 4, `${solution.id}: fewer than four options`);
  }
});

test('expert timings are plausible and stated', () => {
  for (const solution of SOLUTIONS) {
    assert.ok(
      solution.seconds >= 20 && solution.seconds <= 180,
      `${solution.id}: ${solution.seconds}s is not a plausible expert time`,
    );
  }
  // And the mean has to be under the per-item budget the test actually gives,
  // or the library is teaching a pace nobody can hold.
  assert.ok(solutionStats().meanSeconds <= 90, 'the library models a pace slower than the exam allows');
});

test('the library concentrates where the last two hundred points are', () => {
  const stats = solutionStats();
  assert.ok(
    stats.hard / stats.total >= 0.8,
    `only ${stats.hard} of ${stats.total} solutions are at the hard band`,
  );
});

test('both sections are covered, not just the one easier to author', () => {
  const rw = SOLUTIONS.filter((s) => s.section === 'rw').length;
  const math = SOLUTIONS.filter((s) => s.section === 'math').length;
  assert.ok(rw >= 10, `only ${rw} Reading and Writing solutions`);
  assert.ok(math >= 10, `only ${math} Maths solutions`);
});
