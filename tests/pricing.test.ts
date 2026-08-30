/**
 * Programmes and fees.
 *
 * A price list is the document with the shortest path from a mistake to a
 * complaint, and two mistakes in particular are worth code to prevent.
 *
 * The first is publishing placeholder numbers as if they were prices. Every
 * amount in `pricing.ts` is a market reference rate, `confirmed` is false, and
 * these tests assert that every surface says so — in the same words, from one
 * function, so the label cannot be dropped from one page and kept on another.
 *
 * The second is a fee that no longer matches the course it belongs to. Totals
 * are derived from the syllabus rather than typed, and that is checked here,
 * because a total typed separately survives a course being shortened and the
 * family is the one who discovers it.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { PRICING, feeLabel, formatVnd, quote } from '../src/data/pricing.ts';
import { COURSES } from '../src/data/curriculum.ts';
import { buildCoursePlan } from '../src/engine/curriculum.ts';
import { buildPages } from '../src/site/pages.ts';
import { renderPage } from '../src/site/render.ts';

test('placeholder amounts are labelled as such wherever they appear', () => {
  assert.equal(PRICING.confirmed, false, 'if this is now true, every amount must have been decided');

  const label = feeLabel();
  assert.ok(label.vi.includes('KHÔNG phải báo giá'));
  assert.ok(label.en.includes('not a quote'));

  // And the public page carries the same sentence, from the same source.
  const fees = buildPages().find((p) => p.path === '/hoc-phi/');
  assert.ok(fees, 'no public fees page');
  const html = renderPage(fees!);
  assert.ok(html.includes('KHÔNG phải báo giá'), 'the public page drops the placeholder label');
});

test('a course total is the session rate times the syllabus session count', () => {
  for (const course of COURSES) {
    const plan = buildCoursePlan(course.id)!;
    for (const delivery of PRICING.deliveries) {
      const q = quote(course.id, delivery.id, plan.totalSessions, course.sessionMinutes);
      assert.equal(q.sessions, plan.totalSessions, `${course.id}/${delivery.id}: session count drifted`);
      assert.equal(
        q.listTotal,
        delivery.amountPerSession * plan.totalSessions,
        `${course.id}/${delivery.id}: total is not derived`,
      );
    }
  }
});

test('the hourly rate is derived, so a longer session cannot hide a price', () => {
  const sprint = COURSES.find((c) => c.id === 'sprint')!;
  const core = COURSES.find((c) => c.id === 'core')!;
  assert.ok(sprint.sessionMinutes > core.sessionMinutes, 'fixture assumes a longer sprint session');

  const a = quote('sprint', 'private', 4, sprint.sessionMinutes);
  const b = quote('core', 'private', 4, core.sessionMinutes);
  assert.equal(a.perSession, b.perSession, 'same session rate');
  assert.ok(a.perHour < b.perHour, 'a longer session must show a lower hourly rate, not the same one');
});

test('the up-front discount reduces the total and is stated', () => {
  const q = quote('core', 'group', 12, 120);
  assert.ok(q.upfrontTotal < q.listTotal);
  assert.ok(q.upfrontTotal > q.listTotal * 0.85, 'a discount this large is a different business model');
  assert.ok(PRICING.discount.note.trim().length > 60);
  assert.ok(PRICING.discount.noteVi.trim().length > 40);
});

test('an excluded delivery mode refuses with a reason rather than a price', () => {
  const q = quote('sprint', 'group', 4, 180);
  assert.equal(q.available, false);
  assert.ok(q.unavailableReason);
  assert.ok(q.unavailableReason!.vi.length > 40);
});

test('every delivery mode says who it suits and what it includes, bilingually', () => {
  for (const delivery of PRICING.deliveries) {
    assert.ok(delivery.includes.length >= 3, `${delivery.id}: too few inclusions`);
    assert.equal(
      delivery.includes.length,
      delivery.includesVi.length,
      `${delivery.id}: the two languages list different things`,
    );
    assert.ok(delivery.suits.trim().length > 50, `${delivery.id}: thin`);
    assert.ok(delivery.suitsVi.trim().length > 35, `${delivery.id}: not bilingual`);
    assert.ok(delivery.amountPerSession > 0);
  }
});

test('rates ascend with attention received', () => {
  // Not a business rule so much as a sanity check: a smaller class costing
  // less than a larger one is a data-entry error, not a strategy.
  const order = ['self', 'group', 'small', 'private'] as const;
  const amounts = order.map((id) => PRICING.deliveries.find((d) => d.id === id)!.amountPerSession);
  assert.deepEqual(amounts, [...amounts].sort((a, b) => a - b));
});

test('no term promises a score', () => {
  const all = PRICING.terms.map((t) => `${t.en} ${t.vi}`).join(' ').toLowerCase();
  assert.ok(all.includes('no score is guaranteed') || all.includes('không cam kết điểm'));
  for (const banned of ['guarantee a score', 'cam kết đạt', 'đảm bảo điểm']) {
    assert.ok(!all.includes(banned), `a term promises a score: "${banned}"`);
  }
});

test('amounts format the way a Vietnamese price list is read', () => {
  assert.equal(formatVnd(400_000), '400.000₫');
  assert.equal(formatVnd(8_500_000), '8.500.000₫');
});
