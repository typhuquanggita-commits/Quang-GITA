/**
 * The long roadmap.
 *
 * The tests that matter here are the ones that let the roadmap say no.
 *
 * A preparation platform has every commercial reason to tell a learner their
 * target is reachable. These assert that it does not: that an impossible
 * schedule is called impossible in August rather than discovered in June, that
 * a 1600 target is answered with the arithmetic of a perfect score rather than
 * with encouragement, and that a roadmap with no diagnostic behind it refuses
 * to invent one.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  TOP_SCORE_CONDITIONS,
  TOP_SCORE_DISCLAIMER,
  buildRoadmap,
  compressionAt,
  feasibilityFor,
  hoursToReach,
} from '../src/engine/roadmap.ts';
import { ADMINISTRATIONS } from '../src/data/testDates.ts';
import { daysBetween } from '../src/lib/util.ts';

const TODAY = '2026-09-01';

/* ---------------- The gain model ---------------- */

test('gains compress as the score rises', () => {
  const bands = [1000, 1200, 1350, 1450, 1550];
  const values = bands.map(compressionAt);
  assert.deepEqual(values, [...values].sort((a, b) => b - a), 'compression must be monotonic');
  assert.ok(compressionAt(1550) < compressionAt(1000) / 3, 'the top band must be much harder');
});

test('hours to reach a target integrate the compression rather than applying it once', () => {
  // A long climb passes through several bands. Applying the starting band's
  // compression once would understate it badly, which is the mistake that
  // makes a plan look feasible when it is not.
  const naive = Math.ceil((1450 - 1000) / (5.5 * compressionAt(1000)));
  const integrated = hoursToReach(1000, 1450);
  assert.ok(
    integrated > naive * 1.4,
    `integrating gives ${integrated} hours against a naive ${naive} — the understatement is too small to matter`,
  );
});

test('a hundred points costs more the higher you start', () => {
  assert.ok(hoursToReach(1400, 1500) > hoursToReach(1000, 1100) * 2);
});

test('reaching a score already held costs nothing', () => {
  assert.equal(hoursToReach(1300, 1300), 0);
  assert.equal(hoursToReach(1300, 1200), 0);
});

/* ---------------- Feasibility ---------------- */

test('an impossible schedule is called impossible, not encouraged', () => {
  // 1000 to 1500 in eight weeks at four hours a week.
  const verdict = feasibilityFor(1000, 1500, 8, 4);
  assert.equal(verdict.verdict, 'out-of-reach');
  assert.ok(verdict.projectedScore < 1500);
  assert.ok(verdict.reason.vi.includes('không hề nhỏ'));
  // And it points somewhere useful rather than just refusing.
  assert.ok(verdict.reason.en.includes('second sitting'));
});

test('a schedule that only just fits is called demanding, not comfortable', () => {
  const comfortable = feasibilityFor(1100, 1250, 40, 8);
  assert.equal(comfortable.verdict, 'comfortable');

  // 1100 to 1350 crosses two compression bands and needs about 60 hours;
  // twelve weeks at six is 72, which fits with almost nothing spare.
  const tight = feasibilityFor(1100, 1350, 12, 6);
  assert.equal(tight.verdict, 'demanding', tight.reason.en);
  assert.ok(tight.reason.en.includes('nothing to spare'));
});

test('a 1600 target is answered with arithmetic, never with a promise', () => {
  const verdict = feasibilityFor(1500, 1600, 52, 10);
  assert.equal(verdict.verdict, 'noise-limited');
  assert.ok(verdict.reason.en.includes('luck'), 'the honest word is missing');
  assert.ok(verdict.reason.vi.includes('may mắn'));
  assert.ok(verdict.reason.en.includes('sit twice'));
});

test('the noise-limited verdict applies from 1550 up, whatever the time available', () => {
  for (const weeks of [8, 26, 52, 104]) {
    assert.equal(feasibilityFor(1400, 1550, weeks, 10).verdict, 'noise-limited');
  }
});

test('a projected score never exceeds the scale', () => {
  const verdict = feasibilityFor(1520, 1600, 104, 20);
  assert.ok(verdict.projectedScore <= 1600);
});

/* ---------------- The roadmap ---------------- */

test('no diagnostic means no roadmap, and it says why', () => {
  const roadmap = buildRoadmap({
    baselineScore: null,
    targetScore: 1500,
    targetDate: null,
    hoursPerWeek: 8,
    today: TODAY,
  });
  assert.deepEqual(roadmap.phases, []);
  assert.equal(roadmap.feasibility, null);
  assert.ok(roadmap.blocked);
  assert.ok(roadmap.blocked!.vi.includes('điểm xuất phát'));
});

test('the course chain starts where the learner is, not at the beginning', () => {
  const low = buildRoadmap({ baselineScore: 950, targetScore: 1400, targetDate: null, hoursPerWeek: 8, today: TODAY });
  const high = buildRoadmap({ baselineScore: 1420, targetScore: 1520, targetDate: null, hoursPerWeek: 8, today: TODAY });

  assert.equal(low.phases[0].course.id, 'foundation');
  assert.notEqual(high.phases[0].course.id, 'foundation');
  assert.ok(
    !high.phases.some((p) => p.course.id === 'core'),
    'a 1420 learner must not be sent through the Core course',
  );
});

test('every roadmap ends with the sprint', () => {
  for (const baseline of [900, 1150, 1300, 1450]) {
    const roadmap = buildRoadmap({
      baselineScore: baseline,
      targetScore: 1500,
      targetDate: null,
      hoursPerWeek: 8,
      today: TODAY,
    });
    assert.equal(
      roadmap.phases[roadmap.phases.length - 1].course.id,
      'sprint',
      `baseline ${baseline}: does not finish with rehearsal`,
    );
  }
});

test('phases run back to back with no gap and no overlap', () => {
  const roadmap = buildRoadmap({ baselineScore: 1000, targetScore: 1450, targetDate: null, hoursPerWeek: 8, today: TODAY });
  for (let i = 1; i < roadmap.phases.length; i += 1) {
    assert.equal(
      roadmap.phases[i].startDate,
      roadmap.phases[i - 1].endDate,
      `phase ${i + 1} does not start where phase ${i} ends`,
    );
  }
  assert.equal(roadmap.phases[0].startDate, TODAY);
});

test('a phase enters at the score the one before it exits', () => {
  const roadmap = buildRoadmap({ baselineScore: 1000, targetScore: 1450, targetDate: null, hoursPerWeek: 8, today: TODAY });
  assert.equal(roadmap.phases[0].entryScore, 1000);
  for (let i = 1; i < roadmap.phases.length; i += 1) {
    assert.equal(roadmap.phases[i].entryScore, roadmap.phases[i - 1].exitScore);
  }
});

test('projected scores rise through the phases and stay on the scale', () => {
  const roadmap = buildRoadmap({ baselineScore: 1050, targetScore: 1500, targetDate: null, hoursPerWeek: 10, today: TODAY });
  for (const phase of roadmap.phases) {
    assert.ok(phase.exitScore >= phase.entryScore, `${phase.course.id} projects a loss`);
    assert.ok(phase.exitScore <= 1600);
  }
});

/* ---------------- Sittings ---------------- */

test('two sittings are separated far enough to measure different abilities', () => {
  const roadmap = buildRoadmap({
    baselineScore: 1000,
    targetScore: 1450,
    targetDate: '2027-06-05',
    hoursPerWeek: 8,
    today: TODAY,
  });
  assert.equal(roadmap.sittings.length, 2);
  const gap = daysBetween(roadmap.sittings[0].administration.testDate, roadmap.sittings[1].administration.testDate);
  assert.ok(gap >= 56, `only ${gap} days apart — the two would measure the same ability twice`);
});

test('the first sitting exists to make the second one ordinary', () => {
  const roadmap = buildRoadmap({
    baselineScore: 1000,
    targetScore: 1450,
    targetDate: '2027-06-05',
    hoursPerWeek: 8,
    today: TODAY,
  });
  assert.ok(roadmap.sittings[0].purpose.en.includes('not the score'));
  assert.ok(roadmap.sittings[0].purpose.vi.includes('bình thường'));
});

test('every sitting is advised well before its deadline', () => {
  const roadmap = buildRoadmap({
    baselineScore: 1100,
    targetScore: 1400,
    targetDate: '2027-06-05',
    hoursPerWeek: 8,
    today: TODAY,
  });
  for (const sitting of roadmap.sittings) {
    assert.ok(
      sitting.registerBy < sitting.administration.registrationDeadline,
      `${sitting.administration.id}: advice is not earlier than the deadline`,
    );
  }
});

test('sittings are real administrations, never invented dates', () => {
  const known = new Set(ADMINISTRATIONS.map((a) => a.testDate));
  const roadmap = buildRoadmap({ baselineScore: 1000, targetScore: 1450, targetDate: null, hoursPerWeek: 8, today: TODAY });
  for (const sitting of roadmap.sittings) {
    assert.ok(known.has(sitting.administration.testDate), `${sitting.administration.testDate} is not an administration`);
  }
  assert.ok(known.has(roadmap.targetDate));
});

test('a roadmap picks a target date far enough out for its own chain to fit', () => {
  const roadmap = buildRoadmap({ baselineScore: 900, targetScore: 1450, targetDate: null, hoursPerWeek: 8, today: TODAY });
  const chainWeeks = roadmap.phases.reduce((n, p) => n + p.weeks, 0);
  assert.ok(
    roadmap.weeks >= chainWeeks,
    `${roadmap.weeks} weeks available against a ${chainWeeks}-week chain`,
  );
});

/* ---------------- The 1600 statement ---------------- */

test('the conditions for a top score are stated as conditions, not encouragement', () => {
  assert.ok(TOP_SCORE_CONDITIONS.length >= 4);
  for (const condition of TOP_SCORE_CONDITIONS) {
    assert.ok(condition.en.trim().length > 60, `thin: ${condition.en}`);
    assert.ok(condition.vi.trim().length > 40, `not bilingual: ${condition.en}`);
  }
  const all = TOP_SCORE_CONDITIONS.map((c) => c.en).join(' ');
  assert.ok(all.includes('98 items'), 'the arithmetic of a perfect score is missing');
  assert.ok(all.includes('Bluebook'), 'the official material is not named');
});

test('nothing anywhere promises 1600', () => {
  assert.ok(TOP_SCORE_DISCLAIMER.en.includes('can promise 1600'));
  assert.ok(TOP_SCORE_DISCLAIMER.en.includes('No preparation programme'));
  assert.ok(TOP_SCORE_DISCLAIMER.vi.includes('Không chương trình luyện thi nào hứa được'));
});
