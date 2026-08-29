/**
 * The vocabulary deck.
 *
 * A word list is easy to grow and hard to keep honest. These tests hold the
 * three promises the deck makes to a learner: that a word appears once, that
 * every entry is usable in Vietnamese, and that the second-meaning entries —
 * the part that answers what the Digital SAT actually asks — really do carry
 * a meaning different from the one already given.
 *
 * The last of those is the one worth having. It is entirely possible to write
 * a `satSense` that restates the everyday gloss in other words, and the entry
 * then looks complete while teaching nothing.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  VOCABULARY,
  VOCAB_BY_ID,
  vocabByRegister,
  vocabByTier,
  vocabStats,
  vocabWithSecondSense,
  vocabWithTraps,
} from '../src/data/vocabulary.ts';

test('every word appears exactly once across the six sets', () => {
  const seen = new Map<string, string>();
  const clashes: string[] = [];
  for (const entry of VOCABULARY) {
    const key = entry.word.toLowerCase();
    const prior = seen.get(key);
    if (prior) clashes.push(`${entry.word}: ${prior} and ${entry.id}`);
    else seen.set(key, entry.id);
  }
  assert.deepEqual(clashes, []);
});

test('ids are unique and the lookup reaches every entry', () => {
  assert.equal(VOCAB_BY_ID.size, VOCABULARY.length);
  for (const entry of VOCABULARY) {
    assert.equal(VOCAB_BY_ID.get(entry.id)?.word, entry.word);
  }
});

test('every entry is usable by a learner reading Vietnamese', () => {
  for (const entry of VOCABULARY) {
    assert.ok(entry.definitionVi.trim().length >= 4, `${entry.word}: no Vietnamese gloss`);
    assert.ok(entry.example.trim().length > 20, `${entry.word}: example too thin`);
    assert.ok(entry.synonyms.length > 0, `${entry.word}: no synonyms`);
  }
});

test('a second sense is genuinely a second sense, not the first restated', () => {
  const withSense = vocabWithSecondSense();
  assert.ok(withSense.length >= 40, `only ${withSense.length} entries carry a second meaning`);

  for (const entry of withSense) {
    const everyday = entry.definition.trim().toLowerCase();
    const tested = entry.satSense!.gloss.trim().toLowerCase();
    assert.notEqual(tested, everyday, `${entry.word}: the second sense repeats the first`);

    // A restatement usually shares most of its content words with the first
    // gloss. Two genuinely different senses rarely overlap by more than half.
    const words = (text: string) =>
      new Set(text.split(/[^a-z]+/).filter((w) => w.length > 3));
    const a = words(everyday);
    const b = words(tested);
    const shared = [...b].filter((w) => a.has(w)).length;
    assert.ok(
      shared / Math.max(b.size, 1) < 0.6,
      `${entry.word}: the second sense reuses most of the first gloss`,
    );

    assert.ok(entry.satSense!.glossVi.trim().length >= 4, `${entry.word}: second sense has no Vietnamese`);
  }
});

test('a trap is stated in both languages or not at all', () => {
  for (const entry of VOCABULARY) {
    assert.equal(
      Boolean(entry.trap),
      Boolean(entry.trapVi),
      `${entry.word}: the trap exists in only one language`,
    );
  }
  assert.ok(vocabWithTraps().length >= 60, 'too few entries name the confusion they cause');
});

test('no entry lists itself as its own synonym', () => {
  for (const entry of VOCABULARY) {
    for (const synonym of entry.synonyms) {
      assert.notEqual(
        synonym.trim().toLowerCase(),
        entry.word.trim().toLowerCase(),
        `${entry.word}: lists itself as a synonym`,
      );
    }
  }
});

test('the deck is weighted towards the words that actually recur', () => {
  // Tier 1 is what a learner meets in almost every passage, and it should not
  // be the smallest group — a deck that is mostly rare words is a word list
  // for its own sake.
  const stats = vocabStats();
  assert.ok(stats.byTier[1] >= stats.byTier[3], 'more tier-3 rarities than tier-1 workhorses');
  assert.equal(stats.byTier[1] + stats.byTier[2] + stats.byTier[3], VOCABULARY.length);
});

test('both passage registers are covered, not just the science half', () => {
  const science = vocabByRegister('science').length;
  const humanities = vocabByRegister('history').length + vocabByRegister('social-science').length;
  assert.ok(science >= 30, `only ${science} science-register words`);
  assert.ok(humanities >= 30, `only ${humanities} history and social-science words`);
});

test('tier filtering returns what it claims', () => {
  for (const tier of [1, 2, 3] as const) {
    for (const entry of vocabByTier(tier)) assert.equal(entry.tier, tier);
  }
});
