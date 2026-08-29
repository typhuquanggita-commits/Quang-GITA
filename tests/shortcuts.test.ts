/**
 * The keyboard shortcuts sheet.
 *
 * A shortcuts sheet is a promise, and a wrong promise is worse than none: a
 * learner who presses the documented key, gets nothing, and concludes the
 * keyboard does not work has been misled by the help page itself. These tests
 * hold the sheet to the bindings the application actually installs.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  EXAM_BINDING,
  HELP_KEY,
  SHORTCUT_GROUPS,
  SHORTCUT_LIMITS,
  documentedExamKeys,
} from '../src/features/shortcuts/shortcuts.ts';

test('the sheet documents every key the exam player binds, and no others', () => {
  const bound = [
    EXAM_BINDING.next,
    EXAM_BINDING.previous,
    EXAM_BINDING.flag,
    EXAM_BINDING.navigator,
    EXAM_BINDING.choices.join(''),
  ].sort();

  assert.deepEqual(documentedExamKeys().sort(), bound);
});

test('no two exam bindings collide', () => {
  const single = [EXAM_BINDING.next, EXAM_BINDING.previous, EXAM_BINDING.flag, EXAM_BINDING.navigator];
  const all = [...single, ...EXAM_BINDING.choices];
  assert.equal(new Set(all).size, all.length, `colliding bindings: ${all.join(', ')}`);
});

test('single-character bindings are lower case', () => {
  // The handler lower-cases the pressed key before comparing, so an upper-case
  // binding here would be a shortcut that can never fire.
  for (const key of [EXAM_BINDING.flag, EXAM_BINDING.navigator, ...EXAM_BINDING.choices]) {
    assert.equal(key, key.toLowerCase(), `${key} would never match`);
  }
});

test('every row is bilingual and names both its keys and its effect', () => {
  for (const group of SHORTCUT_GROUPS) {
    assert.ok(group.title.trim() && group.titleVi.trim(), `${group.id}: missing title`);
    assert.ok(group.where.trim() && group.whereVi.trim(), `${group.id}: does not say where it applies`);
    assert.ok(group.shortcuts.length > 0, `${group.id}: no shortcuts`);

    for (const shortcut of group.shortcuts) {
      assert.ok(shortcut.keys.length > 0, `${group.id}: a row with no keys`);
      assert.ok(shortcut.label.trim().length > 3, `${group.id}: thin label`);
      assert.ok(shortcut.labelVi.trim().length > 3, `${group.id}: ${shortcut.label} has no Vietnamese`);
    }
  }
});

test('the help key is documented on the sheet it opens', () => {
  const listed = SHORTCUT_GROUPS.flatMap((g) => g.shortcuts).some((s) => s.keys.includes(HELP_KEY));
  assert.ok(listed, 'the key that opens the sheet is not on the sheet');
});

test('the limits are stated bilingually, because each one is a silent no-op', () => {
  assert.ok(SHORTCUT_LIMITS.length >= 3);
  for (const limit of SHORTCUT_LIMITS) {
    assert.ok(limit.en.trim().length > 40, `thin limit: ${limit.en}`);
    assert.ok(limit.vi.trim().length > 30, `no Vietnamese for: ${limit.en}`);
  }
});
