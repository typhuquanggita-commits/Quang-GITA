/**
 * The SAT administration calendar.
 *
 * Two things are being protected.
 *
 * The first is the derivation rule. Most deadlines here were computed rather
 * than read, and the justification for computing them is that the rule matched
 * exactly on the two administrations where every field was independently
 * reported. If the constants ever drift from those anchors, the justification
 * is gone and the derived dates become guesses — so the anchors are asserted
 * against the constants rather than merely stored beside them.
 *
 * The second is that a derived date is never presented as a confirmed one. A
 * candidate misses a registration deadline once.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ADMINISTRATIONS,
  OFFSETS,
  VERIFY_NOTE,
  VIETNAM_DEADLINE_NOTE,
  administrationOn,
  checkTestDate,
  countdown,
  hasDerivedFields,
  nextAdministration,
  nextOpenAdministration,
  registerBy,
  statusOf,
  upcoming,
} from '../src/data/testDates.ts';
import { addDays, daysBetween } from '../src/lib/util.ts';

test('the derivation rule matches the administrations it was derived from', () => {
  // August 22 2026 had every field independently reported. If this fails, the
  // offsets have drifted and every derived date in the file is now a guess.
  const august = administrationOn('2026-08-22')!;
  assert.equal(august.registrationDeadline, addDays(august.testDate, OFFSETS.registration));
  assert.equal(august.lateRegistrationDeadline, addDays(august.testDate, OFFSETS.lateRegistration));
  assert.equal(august.scoreRelease, addDays(august.testDate, OFFSETS.scoreRelease));

  const september = administrationOn('2026-09-12')!;
  assert.equal(september.registrationDeadline, addDays(september.testDate, OFFSETS.registration));
  assert.equal(september.scoreRelease, addDays(september.testDate, OFFSETS.scoreRelease));
});

test('every administration carries per-field provenance', () => {
  for (const admin of ADMINISTRATIONS) {
    for (const [field, value] of Object.entries(admin.provenance)) {
      assert.ok(
        value === 'confirmed' || value === 'derived',
        `${admin.id}: ${field} has no provenance`,
      );
    }
  }
});

test('the two anchor administrations are the only ones with confirmed deadlines', () => {
  // Everything else is derived, and must say so. Marking a computed date as
  // confirmed is the failure this whole design exists to prevent.
  const confirmed = ADMINISTRATIONS.filter((a) => a.provenance.registrationDeadline === 'confirmed');
  assert.deepEqual(
    confirmed.map((a) => a.id),
    ['2026-08-22', '2026-09-12'],
  );
  for (const admin of ADMINISTRATIONS) {
    if (!confirmed.includes(admin)) {
      assert.ok(hasDerivedFields(admin), `${admin.id}: claims to be fully confirmed`);
    }
  }
});

test('every administration is internally ordered', () => {
  for (const admin of ADMINISTRATIONS) {
    assert.ok(admin.registrationDeadline < admin.lateRegistrationDeadline, `${admin.id}: deadlines inverted`);
    assert.ok(admin.lateRegistrationDeadline < admin.testDate, `${admin.id}: late deadline after the test`);
    assert.ok(admin.scoreRelease > admin.testDate, `${admin.id}: scores before the test`);
  }
});

test('administrations are in date order and none repeats', () => {
  const dates = ADMINISTRATIONS.map((a) => a.testDate);
  assert.deepEqual(dates, [...dates].sort());
  assert.equal(new Set(dates).size, dates.length);
});

test('every administration falls on a Saturday', () => {
  // The SAT is a Saturday test. A weekday in this list is a typo that would
  // otherwise reach a learner's countdown.
  for (const admin of ADMINISTRATIONS) {
    const day = new Date(`${admin.testDate}T12:00:00Z`).getUTCDay();
    assert.equal(day, 6, `${admin.id} is not a Saturday`);
  }
});

/* ---------------- Status ---------------- */

test('registration status moves through its windows in order', () => {
  const admin = administrationOn('2026-10-03')!;
  assert.equal(statusOf(admin, '2026-09-01'), 'open');
  assert.equal(statusOf(admin, addDays(admin.registrationDeadline, 1)), 'late-only');
  assert.equal(statusOf(admin, addDays(admin.lateRegistrationDeadline, 1)), 'closed');
  assert.equal(statusOf(admin, addDays(admin.testDate, 1)), 'sat');
  assert.equal(statusOf(admin, addDays(admin.scoreRelease, 1)), 'scores-out');
});

test('the deadline day itself is still open', () => {
  const admin = administrationOn('2026-10-03')!;
  assert.equal(statusOf(admin, admin.registrationDeadline), 'open');
  assert.equal(statusOf(admin, admin.lateRegistrationDeadline), 'late-only');
});

test('the next administration and the next open one can differ', () => {
  // Two days before a test, the next administration is that one and the next
  // one you can still register for normally is a later one. Conflating them is
  // how a learner is told to register for a test that closed a fortnight ago.
  const soon = addDays('2026-10-03', -2);
  assert.equal(nextAdministration(soon)?.id, '2026-10-03');
  assert.equal(nextOpenAdministration(soon)?.id, '2026-11-07');
});

test('upcoming excludes what has already been sat', () => {
  const list = upcoming('2026-11-01');
  assert.ok(list.every((a) => a.testDate >= '2026-11-01'));
  assert.equal(list[0].id, '2026-11-07');
});

/* ---------------- Entered dates ---------------- */

test('a date with no SAT on it is refused, with the nearest real dates offered', () => {
  const check = checkTestDate('2026-10-15', '2026-08-30');
  assert.equal(check.ok, false);
  assert.equal(check.administration, null);
  assert.equal(check.nearest.length, 2);
  assert.deepEqual(check.nearest.map((a) => a.id), ['2026-10-03', '2026-11-07']);
  assert.ok(check.message!.vi.includes('không có kỳ thi'));
});

test('a real administration date passes', () => {
  const check = checkTestDate('2026-12-05', '2026-08-30');
  assert.equal(check.ok, true);
  assert.equal(check.administration?.id, '2026-12-05');
  assert.equal(check.message, null);
});

test('no date entered is not an error, it is a prompt', () => {
  const check = checkTestDate(null, '2026-08-30');
  assert.equal(check.ok, false);
  assert.equal(check.message, null, 'a missing date must not be scolded');
  assert.ok(check.nearest.length > 0, 'it should offer dates to pick from');
});

/* ---------------- Advice ---------------- */

test('the advised registration date is well before the deadline, not on it', () => {
  for (const admin of ADMINISTRATIONS) {
    const advised = registerBy(admin);
    assert.ok(advised < admin.registrationDeadline, `${admin.id}: advice is not earlier than the deadline`);
    assert.ok(daysBetween(advised, admin.testDate) >= 30, `${admin.id}: advice is not early enough to matter`);
  }
});

test('the countdown reports the test, the deadline and the advice separately', () => {
  const admin = administrationOn('2026-12-05')!;
  const c = countdown(admin, '2026-10-01');
  assert.equal(c.daysToTest, daysBetween('2026-10-01', '2026-12-05'));
  assert.ok(c.daysToRegistrationDeadline < c.daysToTest);
  assert.ok(c.daysToAdvisedRegistration < c.daysToRegistrationDeadline);
  assert.equal(c.status, 'open');
});

/* ---------------- The warnings ---------------- */

test('the time-zone trap is stated in both languages', () => {
  assert.ok(VIETNAM_DEADLINE_NOTE.en.includes('Eastern'));
  assert.ok(VIETNAM_DEADLINE_NOTE.vi.includes('Miền Đông'));
  assert.ok(VIETNAM_DEADLINE_NOTE.vi.includes('nửa đêm'));
});

test('the verification instruction names where to check and why it matters', () => {
  assert.ok(VERIFY_NOTE.en.includes('collegeboard.org'));
  assert.ok(VERIFY_NOTE.vi.includes('collegeboard.org'));
  assert.ok(VERIFY_NOTE.en.includes('not recoverable'));
});
