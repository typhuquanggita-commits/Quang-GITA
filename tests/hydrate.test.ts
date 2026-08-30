/**
 * Restoring state from an untrusted payload.
 *
 * Everything here is reachable from two ordinary acts: opening the app with a
 * local-storage payload written by an older build, and importing a backup file
 * — one the learner may have been sent rather than written themselves.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { hydrateState, initialState } from '../src/state/hydrate.ts';

test('an empty payload restores a complete default state', () => {
  const state = hydrateState({});
  const base = initialState();
  assert.deepEqual(Object.keys(state).sort(), Object.keys(base).sort());
  assert.equal(state.org.accounts.length, 1);
  assert.equal(state.attempts.length, 0);
});

test('a payload that is not an object at all still yields usable state', () => {
  for (const junk of [null, undefined, 4, 'state', [1, 2, 3]]) {
    const state = hydrateState(junk);
    assert.equal(Array.isArray(state.attempts), true);
    assert.equal(Array.isArray(state.org.accounts), true);
  }
});

test('section ability survives an import — the bug that lost it', () => {
  // The import path had drifted from the load path and no longer merged
  // `sectionAbility`, so a restored backup came back with both section
  // estimates reset to theta = 0 while every other estimate returned.
  const state = hydrateState({
    sectionAbility: {
      rw: { theta: 1.2, se: 0.3, n: 40, updatedAt: 1 },
      math: { theta: -0.4, se: 0.4, n: 30, updatedAt: 1 },
    },
  });
  assert.equal(state.sectionAbility.rw.theta, 1.2);
  assert.equal(state.sectionAbility.math.n, 30);
});

test('a truncated org does not lose the collections the auth layer reads unguarded', () => {
  // `currentAccount` runs `org.accounts.find` before anything renders, so an
  // org missing that key used to be a blank page rather than a bad restore.
  const state = hydrateState({ org: { currentAccountId: 'acc_self' } });
  assert.equal(Array.isArray(state.org.accounts), true);
  assert.equal(Array.isArray(state.org.classes), true);
  assert.equal(Array.isArray(state.org.assignments), true);
  assert.equal(Array.isArray(state.org.audit), true);
});

test('a slice of the wrong kind is discarded, not adopted', () => {
  const state = hydrateState({
    attempts: 4,
    forms: 'none',
    bookmarks: { a: 1 },
    ability: [1, 2],
    profile: 'me',
    org: 7,
  });
  assert.deepEqual(state.attempts, []);
  assert.deepEqual(state.forms, []);
  assert.deepEqual(state.bookmarks, []);
  assert.deepEqual(Object.keys(state.ability), []);
  assert.equal(state.profile.targetScore, 1500);
  assert.equal(state.org.accounts.length, 1);
});

test('records restored from a payload inherit nothing', () => {
  // `#/lesson/constructor` reads the lessons record by a key taken from the
  // URL. A restored record must not be able to answer for a key it does not own.
  const state = hydrateState(JSON.parse('{"lessons":{"__proto__":{"reads":99}},"packets":{}}'));
  assert.equal(Object.getPrototypeOf(state.lessons), null);
  assert.equal(Object.getPrototypeOf(state.packets), null);
  assert.equal(({} as Record<string, unknown>).reads, undefined);
  assert.equal(state.packets['constructor'], undefined);
});

test('keys the schema does not name are not carried forward', () => {
  const state = hydrateState({ someRemovedSlice: { big: true }, attempts: [] });
  assert.equal('someRemovedSlice' in state, false);
});

test('the version is the running one, never the file’s', () => {
  const base = initialState();
  const state = hydrateState({ version: 1 });
  assert.equal(state.version, base.version);
});

test('a plan is restored only when it is an object', () => {
  assert.equal(hydrateState({ plan: 'weekly' }).plan, null);
  assert.notEqual(hydrateState({ plan: { targetScore: 1500 } }).plan, null);
});

test('good data passes through untouched', () => {
  const attempt = { id: 'att_1' };
  const state = hydrateState({
    attempts: [attempt],
    bookmarks: ['q1', 'q2'],
    activity: { '2026-08-30': 1800 },
    profile: { name: 'Quang', targetScore: 1600 },
  });
  assert.equal(state.attempts[0], attempt);
  assert.deepEqual(state.bookmarks, ['q1', 'q2']);
  assert.equal(state.activity['2026-08-30'], 1800);
  assert.equal(state.profile.name, 'Quang');
  assert.equal(state.profile.targetScore, 1600);
  // Fields the payload did not mention keep their defaults.
  assert.equal(state.profile.onboarded, false);
});
