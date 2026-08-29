/**
 * The generated Math bank.
 *
 * These items are not reviewed one by one — there are hundreds — so the checks
 * that stand in for review have to be the ones that catch a broken item without
 * knowing what it says. Three matter most.
 *
 * A generated item's key is computed from the parameters, so it is right when
 * the formula is right. What a test can catch is the *shape* going wrong: two
 * options that are the same value in different clothes, a key absent from its
 * own choices, a band label that no longer matches the difficulty parameter, or
 * a template that quietly stopped emitting.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  generateMathItems,
  validateGenerated,
  GENERATOR_COUNT,
  ALL_GENERATORS,
} from '../src/data/generators.ts';
import { BANK } from '../src/data/bank.ts';
import { DOMAINS } from '../src/data/blueprint.ts';

const generated = generateMathItems();
const mathSkills = DOMAINS.filter((d) => d.section === 'math').flatMap((d) => d.skills.map((s) => s.id));

test('every Math skill is covered at all three difficulty bands', () => {
  // The packet system asks each topic for hard items (advanced sheet), a mix
  // (revision), and a test-like mix (exam). A skill missing a whole band leaves
  // a sheet that can only be filled by borrowing from the domain.
  for (const skill of mathSkills) {
    for (const band of ['easy', 'medium', 'hard'] as const) {
      const n = BANK.filter((q) => q.skill === skill && q.band === band).length;
      assert.ok(n > 0, `${skill} has no ${band} items`);
    }
  }
});

test('every Math skill holds enough items to fill a packet without reuse', () => {
  // advanced 8 + revision 10 + exam 10, and no item may appear on two sheets.
  const NEEDED = 28;
  for (const skill of mathSkills) {
    const n = BANK.filter((q) => q.skill === skill).length;
    assert.ok(n >= NEEDED, `${skill} has ${n} items, needs ${NEEDED}`);
  }
});

test('every generated item passes its own structural validation', () => {
  for (const item of generated) {
    assert.equal(validateGenerated(item), null, `${item.id}: ${validateGenerated(item)}`);
  }
});

test('no two choices are the same value formatted differently', () => {
  // "2.00π" and "2.0π" are one option wearing two costumes, and an item that
  // ships both is a one-in-three guess dressed as a one-in-four.
  const canonical = (text: string) =>
    text
      .trim()
      .replace(/−/g, '-')
      .replace(/-?\d+(?:\.\d+)?/g, (n) => String(Number(n)))
      .replace(/\s+/g, ' ');

  for (const item of generated) {
    if (item.format !== 'mcq') continue;
    const forms = item.choices!.map((c) => canonical(c.text));
    assert.equal(
      new Set(forms).size,
      4,
      `${item.id}: options collapse to ${new Set(forms).size} distinct values — ${forms.join(' | ')}`,
    );
  }
});

test('a generated item never mixes two minus signs on one line', () => {
  // U+2212 in the prompt and an ASCII hyphen in the options read as two
  // different symbols on the page, which is exactly the kind of detail a
  // learner reads as a hint.
  for (const item of generated) {
    const surfaces = [item.prompt, ...(item.choices ?? []).map((c) => c.text)];
    for (const text of surfaces) {
      const mixed = text.includes('−') && /\S-\d|\s-\d/.test(text);
      assert.ok(!mixed, `${item.id}: mixed minus signs in "${text}"`);
    }
  }
});

test('every generated item explains itself and names each distractor’s error', () => {
  for (const item of generated) {
    assert.ok(
      item.explanation.trim().length >= 60,
      `${item.id}: explanation is too thin to teach anything`,
    );
    if (item.format !== 'mcq') continue;
    const notes = item.distractorNotes ?? {};
    assert.equal(
      Object.keys(notes).length,
      3,
      `${item.id}: ${Object.keys(notes).length} distractor notes, expected 3`,
    );
    for (const [id, note] of Object.entries(notes)) {
      assert.notEqual(id, item.answer, `${item.id}: the key carries a distractor note`);
      assert.ok(note.trim().length >= 20, `${item.id}/${id}: note too thin`);
    }
  }
});

test('a band label matches the difficulty parameter it ships with', () => {
  // A "hard" item with b = −0.9 would be delivered as hard and answered like an
  // easy one, which corrupts both the practice sheets and the adaptive form.
  const bounds = { easy: [-2.2, -0.2], medium: [-0.6, 0.9], hard: [0.4, 2.2] } as const;
  for (const item of generated) {
    const [lo, hi] = bounds[item.band];
    assert.ok(
      item.irt.b >= lo && item.irt.b <= hi,
      `${item.id}: band ${item.band} with b = ${item.irt.b.toFixed(2)}`,
    );
  }
});

test('every template emits, and none emits under another’s id', () => {
  assert.equal(ALL_GENERATORS.length, GENERATOR_COUNT);

  const ids = new Set(ALL_GENERATORS.map((g) => g.id));
  assert.equal(ids.size, ALL_GENERATORS.length, 'two templates share an id');

  for (const generator of ALL_GENERATORS) {
    const mine = generated.filter((q) => q.id.startsWith(`${generator.id}_`));
    assert.ok(mine.length > 0, `${generator.id} emitted nothing`);
    for (const item of mine) {
      assert.equal(item.skill, generator.skill);
      assert.equal(item.band, generator.band);
      assert.equal(item.domain, generator.domain);
    }
  }
});

test('generation is deterministic, so two devices hold the same bank', () => {
  const again = generateMathItems();
  assert.equal(again.length, generated.length);
  for (let i = 0; i < again.length; i += 1) {
    assert.equal(again[i].id, generated[i].id);
    assert.equal(again[i].prompt, generated[i].prompt);
    assert.deepEqual(again[i].answer, generated[i].answer);
  }
});

test('a generated id never collides with an authored one', () => {
  const ids = BANK.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate id in the bank');
});
