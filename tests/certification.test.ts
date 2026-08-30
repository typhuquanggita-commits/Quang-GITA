/**
 * Internal certification.
 *
 * The tests below exist to keep the certificate hard to get, because a
 * certificate that is easy to get certifies nothing and both the holder and
 * the centre issuing it find that out later.
 *
 * The rule under most pressure is the interval rule: a candidate scoring 1198
 * with a standard error of 30 has not demonstrated a 1200 standard, and the
 * commercial incentive to award it anyway is obvious. So it is pinned from
 * both sides — an award refused when the interval straddles the boundary, and
 * an award granted when it clears it.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SAT365_SCHEME,
  awaySeconds,
  certify,
  describeVerification,
  isCurrent,
  serialFor,
  type CertificationScheme,
} from '../src/engine/certification.ts';
import type { Attempt, IntegrityEvent, ScoreReport, SectionId, SectionScore } from '../src/types.ts';

const TODAY = '2026-06-01';

function section(id: SectionId, scaled: number, sem: number, reliability: number): SectionScore {
  return {
    section: id,
    scaled,
    sem,
    reliability,
    theta: 0,
    rawCorrect: 22,
    rawAttempted: 27,
    operationalCount: 27,
    pathway: 'upper',
    domains: [],
    skills: [],
  };
}

function report(total: number, sem: number, reliability = 0.88, sections = 2): ScoreReport {
  const list = [section('rw', total / 2, sem / 2, reliability)];
  if (sections === 2) list.push(section('math', total / 2, sem / 2, reliability));
  return {
    attemptId: 'a1',
    scoredAt: Date.parse(`${TODAY}T09:00:00Z`),
    total,
    totalBand: [total - sem, total + sem],
    sections: list,
    percentile: 60,
    benchmarks: [],
    pacing: [],
  };
}

function attempt(
  id: string,
  score: ScoreReport | undefined,
  integrity: IntegrityEvent[] = [],
): Attempt {
  return {
    id,
    mode: 'full-test',
    formId: 'f1',
    label: id,
    startedAt: Date.parse(`${TODAY}T07:00:00Z`),
    submittedAt: Date.parse(`${TODAY}T09:00:00Z`),
    status: 'submitted',
    deliveredModuleIds: [],
    currentModuleIndex: 0,
    currentQuestionIndex: 0,
    moduleDeadline: null,
    responses: {},
    annotations: [],
    integrity,
    timeMultiplier: 1,
    score: score ? { ...score, attemptId: id } : undefined,
  };
}

const run = (attempts: Attempt[], scheme: CertificationScheme = SAT365_SCHEME) =>
  certify({ scheme, attempts, today: TODAY });

/* ---------------- The interval rule ---------------- */

test('a score whose interval straddles the boundary is held at the lower band', () => {
  // 1215 ± 30 reaches Proficient on the point estimate and runs down to 1185.
  const result = run([attempt('a1', report(1215, 30))]);

  assert.equal(result.status, 'held-at-lower-band');
  assert.equal(result.provisionalBand?.id, 'proficient');
  assert.equal(result.band?.id, 'foundation');
  assert.ok(result.reasons[0].en.includes('range, not of a point'));
  assert.ok(result.reasons[0].vi.includes('KHOẢNG'));
});

test('a score whose interval clears the boundary is awarded', () => {
  const result = run([attempt('a1', report(1240, 30))]);

  assert.equal(result.status, 'awarded');
  assert.equal(result.band?.id, 'proficient');
  assert.equal(result.interval?.[0], 1210);
  assert.ok(result.serial);
});

test('the boundary is the lower end of the interval, exactly', () => {
  // 1230 ± 30 lands the lower end on 1200 itself, which clears it.
  assert.equal(run([attempt('a1', report(1230, 30))]).status, 'awarded');
  // One point lower does not.
  assert.equal(run([attempt('a1', report(1229, 30))]).status, 'held-at-lower-band');
});

test('a smaller measurement error awards the band a larger one would refuse', () => {
  // The same score, on a more precise form. This is the whole point of
  // requiring precision rather than only a number.
  assert.equal(run([attempt('a1', report(1210, 30))]).status, 'held-at-lower-band');
  assert.equal(run([attempt('a1', report(1210, 8))]).status, 'awarded');
});

/* ---------------- Evidence requirements ---------------- */

test('a section paper never certifies', () => {
  const result = run([attempt('a1', report(1500, 20, 0.9, 1))]);
  assert.equal(result.status, 'insufficient-evidence');
  assert.ok(result.reasons[0].en.includes('section paper'));
});

test('an unreliable form blocks the award however high the score', () => {
  const result = run([attempt('a1', report(1550, 20, 0.62))]);
  assert.equal(result.status, 'unreliable-form');
  assert.equal(result.band, null);
  // And it says the fault is the form's, not the candidate's.
  assert.ok(result.reasons[0].en.includes('property of the items'));
});

test('time away from the exam window holds the certificate for a human', () => {
  const start = Date.parse(`${TODAY}T07:00:00Z`);
  const integrity: IntegrityEvent[] = [
    { at: start + 60_000, kind: 'blur' },
    { at: start + 400_000, kind: 'focus' },
  ];
  const result = run([attempt('a1', report(1500, 20), integrity)]);

  assert.equal(result.status, 'integrity-hold');
  assert.equal(result.band, null);
  // The result is not thrown away — only the certificate is held.
  assert.equal(result.score, 1500);
});

test('walking away and never returning is not cheaper than returning', () => {
  const start = Date.parse(`${TODAY}T07:00:00Z`);
  const submitted = Date.parse(`${TODAY}T09:00:00Z`);
  // A blur with no matching focus. Counting it as zero would make this the
  // easiest way to defeat the check.
  const away = awaySeconds([{ at: start + 60_000, kind: 'blur' }], submitted);
  assert.ok(away > 6000, `unmatched blur counted as ${away} seconds`);
  assert.equal(run([attempt('a1', report(1500, 20), [{ at: start + 60_000, kind: 'blur' }])]).status, 'integrity-hold');
});

test('brief, matched absence does not hold the award', () => {
  const start = Date.parse(`${TODAY}T07:00:00Z`);
  const result = run([
    attempt('a1', report(1420, 20), [
      { at: start + 60_000, kind: 'blur' },
      { at: start + 90_000, kind: 'focus' },
    ]),
  ]);
  assert.equal(result.status, 'awarded');
});

test('no scored sitting produces a refusal with a reason, not an empty object', () => {
  const result = run([attempt('a1', undefined)]);
  assert.equal(result.status, 'insufficient-evidence');
  assert.ok(result.reasons.length > 0);
  assert.equal(result.serial, null);
});

test('below the lowest band is stated as such', () => {
  const result = run([attempt('a1', report(900, 20))]);
  assert.equal(result.status, 'below-lowest-band');
  assert.equal(result.band, null);
});

test('a score reaching the lowest band on the point estimate but not on the interval is refused', () => {
  // 1010 ± 30 reaches Foundation at 1000 and runs down to 980.
  const result = run([attempt('a1', report(1010, 30))]);
  assert.equal(result.status, 'below-lowest-band');
  assert.equal(result.provisionalBand?.id, 'foundation');
  assert.equal(result.band, null);
});

/* ---------------- Which sitting counts ---------------- */

test('the best eligible sitting is used, so one bad morning does not erase evidence', () => {
  const result = run([
    attempt('a1', report(1450, 20)),
    attempt('a2', report(1120, 20)),
  ]);
  assert.equal(result.attemptId, 'a1');
  assert.equal(result.band?.id, 'advanced');
});

test('repeated sittings cannot creep a candidate over a boundary on noise', () => {
  // Five sittings, each nudging just over the boundary on the point estimate
  // with an interval far too wide to support it. The interval rule, not the
  // choice of attempt, is what stops this.
  const attempts = [1202, 1205, 1201, 1204, 1203].map((total, i) =>
    attempt(`a${i}`, report(total, 30)),
  );
  const result = run(attempts);
  assert.equal(result.status, 'held-at-lower-band');
  assert.equal(result.band?.id, 'foundation');
});

/* ---------------- The certificate itself ---------------- */

test('a serial is reproducible from the award and carries no personal data', () => {
  const a = serialFor(SAT365_SCHEME, 'attempt-1', 1400, TODAY);
  const b = serialFor(SAT365_SCHEME, 'attempt-1', 1400, TODAY);
  assert.equal(a, b);
  assert.notEqual(a, serialFor(SAT365_SCHEME, 'attempt-1', 1410, TODAY));
  assert.notEqual(a, serialFor(SAT365_SCHEME, 'attempt-2', 1400, TODAY));
  assert.match(a, /^SAT365-\d{2}-[0-9A-Z]{4}-[0-9A-Z]{3}$/);
});

test('validity is bounded, and expiry is checkable', () => {
  const result = run([attempt('a1', report(1420, 20))]);
  assert.ok(result.expiresOn && result.expiresOn > result.issuedOn!);
  assert.equal(isCurrent(result, TODAY), true);
  assert.equal(isCurrent(result, '2028-01-01'), false);
});

test('the scheme states what the certificate is not, in both languages', () => {
  assert.ok(SAT365_SCHEME.disclaimer.includes('not a College Board score'));
  assert.ok(SAT365_SCHEME.disclaimerVi.includes('KHÔNG phải điểm SAT'));
  assert.ok(SAT365_SCHEME.disclaimer.length > 150);
});

test('verification does not claim an authority it does not have', () => {
  const note = describeVerification(SAT365_SCHEME);
  assert.ok(note.en.includes('cannot, on its own, prove'));
  assert.ok(note.vi.includes('không chứng minh được'));
});

test('every band is described by what the holder can do, never by a rank', () => {
  for (const band of SAT365_SCHEME.bands) {
    assert.ok(band.descriptors.length >= 3, `${band.id}: too few descriptors`);
    for (const d of band.descriptors) {
      assert.ok(d.en.trim().length > 40, `${band.id}: thin descriptor`);
      assert.ok(d.vi.trim().length > 25, `${band.id}: descriptor not bilingual`);
      for (const word of ['percentile', 'top ', 'better than', 'rank']) {
        assert.ok(!d.en.toLowerCase().includes(word), `${band.id}: descriptor compares candidates ("${word}")`);
      }
    }
  }
});

test('bands ascend and do not overlap', () => {
  const mins = SAT365_SCHEME.bands.map((b) => b.minScore);
  assert.deepEqual(mins, [...mins].sort((a, b) => a - b));
  assert.equal(new Set(mins).size, mins.length);
  assert.ok(mins[0] >= SAT365_SCHEME.scaleMin);
  assert.ok(mins[mins.length - 1] <= SAT365_SCHEME.scaleMax);
});

test('a scheme with different bands works without the engine knowing the exam', () => {
  // The apparatus is exam-agnostic: a sibling platform on another test defines
  // its own scale and reuses all of it.
  const other: CertificationScheme = {
    ...SAT365_SCHEME,
    id: 'hsa365',
    name: 'HSA365 Certificate',
    nameVi: 'Chứng nhận HSA365',
    scaleMin: 0,
    scaleMax: 150,
    bands: [
      { id: 'pass', name: 'Pass', nameVi: 'Đạt', minScore: 75, descriptors: SAT365_SCHEME.bands[0].descriptors },
      { id: 'merit', name: 'Merit', nameVi: 'Khá', minScore: 100, descriptors: SAT365_SCHEME.bands[1].descriptors },
    ],
  };

  const result = certify({
    scheme: other,
    attempts: [attempt('a1', report(110, 4))],
    today: TODAY,
  });
  assert.equal(result.status, 'awarded');
  assert.equal(result.band?.id, 'merit');
  assert.match(result.serial!, /^HSA365-/);
});
