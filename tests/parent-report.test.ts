/**
 * The guardian's report.
 *
 * The tests that matter here are the ones that stop the report from
 * flattering. A tutoring centre has every commercial reason to call a
 * twenty-point swing progress; these hold the line that it is not progress
 * until it clears the measurement error on both sittings.
 *
 * The second group holds the platform's standing rule: nothing unmeasured is
 * scored as anything. A skill practised three times is not weak and not
 * strong — it is too early, and the report has to say that rather than
 * quietly rounding it into one of the other two buckets.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { buildParentReport, summariseForRoster, type ParentReportInput } from '../src/engine/parentReport.ts';
import type {
  Attempt,
  Question,
  Response,
  ScoreReport,
  SectionId,
  SectionScore,
} from '../src/types.ts';
import { addDays, isoDate } from '../src/lib/util.ts';

const TODAY = '2026-03-31';

function question(id: string, skill: string, band: 'easy' | 'medium' | 'hard' = 'medium'): Question {
  return {
    id,
    section: 'rw',
    domain: 'craft-structure',
    skill: skill as Question['skill'],
    format: 'mcq',
    band,
    irt: { a: 1, b: 0 },
    targetSeconds: 60,
    prompt: 'p',
    choices: [
      { id: 'A', text: 'a' },
      { id: 'B', text: 'b' },
      { id: 'C', text: 'c' },
      { id: 'D', text: 'd' },
    ],
    answer: 'A',
    explanation: 'because it is the only one supported by the text.',
  };
}

function response(questionId: string, correct: boolean, at: number, seconds = 60): Response {
  return {
    questionId,
    value: correct ? 'A' : 'B',
    correct,
    msSpent: seconds * 1000,
    flagged: false,
    eliminated: [],
    visits: 1,
    lastChangedAt: at,
  };
}

function section(id: SectionId, scaled: number, sem: number): SectionScore {
  return {
    section: id,
    scaled,
    sem,
    reliability: 0.8,
    theta: 0,
    rawCorrect: 20,
    rawAttempted: 27,
    operationalCount: 27,
    pathway: 'upper',
    domains: [],
    skills: [],
  };
}

function scoreOf(total: number, sem: number, at: number): ScoreReport {
  return {
    attemptId: 'x',
    scoredAt: at,
    total,
    totalBand: [total - sem, total + sem],
    sections: [
      section('rw', total / 2, sem / 2),
      section('math', total / 2, sem / 2),
    ],
    percentile: 50,
    benchmarks: [],
    pacing: [],
  };
}

function attempt(id: string, at: number, score: ScoreReport | undefined, responses: Response[]): Attempt {
  return {
    id,
    mode: 'full-test',
    formId: 'f1',
    label: id,
    startedAt: at,
    submittedAt: at,
    status: 'submitted',
    deliveredModuleIds: [],
    currentModuleIndex: 0,
    currentQuestionIndex: 0,
    moduleDeadline: null,
    responses: Object.fromEntries(responses.map((r) => [r.questionId, r])),
    annotations: [],
    integrity: [],
    timeMultiplier: 1,
    score: score ? { ...score, attemptId: id } : undefined,
  };
}

const ms = (iso: string) => new Date(`${iso}T12:00:00`).getTime();

function base(overrides: Partial<ParentReportInput> = {}): ParentReportInput {
  return {
    studentName: 'Nguyễn Minh',
    attempts: [],
    questions: new Map(),
    activity: {},
    today: TODAY,
    ...overrides,
  };
}

/* ---------------- Score honesty ---------------- */

test('a change inside measurement error is not reported as progress', () => {
  const report = buildParentReport(
    base({
      attempts: [
        attempt('a1', ms('2026-02-01'), scoreOf(1100, 30, ms('2026-02-01')), []),
        attempt('a2', ms('2026-03-20'), scoreOf(1120, 30, ms('2026-03-20')), []),
      ],
    }),
  );

  assert.equal(report.score.change, 20);
  assert.equal(report.score.verdict, 'within-error');
  assert.ok(report.score.combinedError! >= 20, 'combined error should swallow a 20-point move');
});

test('a change that clears measurement error is reported as movement', () => {
  const report = buildParentReport(
    base({
      attempts: [
        attempt('a1', ms('2026-02-01'), scoreOf(1100, 20, ms('2026-02-01')), []),
        attempt('a2', ms('2026-03-20'), scoreOf(1260, 20, ms('2026-03-20')), []),
      ],
    }),
  );

  assert.equal(report.score.verdict, 'up');
  assert.equal(report.score.change, 160);
});

test('the combined error is the root sum of squares, not the sum', () => {
  // Two sittings each with SEM 30. Adding gives 60; combining correctly gives
  // about 42. Using the sum would hide a real 50-point gain.
  const report = buildParentReport(
    base({
      attempts: [
        attempt('a1', ms('2026-02-01'), scoreOf(1100, 30, ms('2026-02-01')), []),
        attempt('a2', ms('2026-03-20'), scoreOf(1150, 30, ms('2026-03-20')), []),
      ],
    }),
  );
  assert.equal(report.score.combinedError, 42);
  assert.equal(report.score.verdict, 'up');
});

test('one sitting is a position, not a direction', () => {
  const report = buildParentReport(
    base({ attempts: [attempt('a1', ms('2026-03-01'), scoreOf(1200, 30, ms('2026-03-01')), [])] }),
  );
  assert.equal(report.score.verdict, 'insufficient');
  assert.equal(report.score.change, null);
  assert.ok(report.limits.some((l) => l.en.includes('no score trend')));
});

test('a single-section run never counts as a sitting', () => {
  const half = scoreOf(1200, 30, ms('2026-03-01'));
  half.sections = [half.sections[0]];
  const report = buildParentReport(base({ attempts: [attempt('a1', ms('2026-03-01'), half, [])] }));
  assert.equal(report.score.sittings, 0);
  assert.equal(report.score.latest, null);
});

/* ---------------- Movement honesty ---------------- */

test('a thinly practised skill is reported as too early, never as weak', () => {
  const q = question('q1', 'transitions');
  const responses = [
    response('q1', false, ms('2026-03-10')),
    response('q1b', false, ms('2026-03-11')),
    response('q1c', false, ms('2026-03-12')),
  ];
  const questions = new Map<string, Question>([
    ['q1', q],
    ['q1b', question('q1b', 'transitions')],
    ['q1c', question('q1c', 'transitions')],
  ]);

  const report = buildParentReport(
    base({ attempts: [attempt('a1', ms('2026-03-10'), undefined, responses)], questions }),
  );

  assert.deepEqual(report.movement.improved, []);
  assert.deepEqual(report.movement.stuck, []);
  assert.deepEqual(report.movement.tooEarly, ['transitions']);
});

test('a skill with evidence on both sides is reported as moving', () => {
  const questions = new Map<string, Question>();
  const responses: Response[] = [];
  for (let i = 0; i < 8; i += 1) {
    const id = `q${i}`;
    questions.set(id, question(id, 'boundaries'));
    // Wrong for the first half, right for the second.
    responses.push(response(id, i >= 4, ms(addDays('2026-03-10', i))));
  }

  const report = buildParentReport(
    base({ attempts: [attempt('a1', ms('2026-03-10'), undefined, responses)], questions }),
  );

  assert.equal(report.movement.improved.length, 1);
  assert.equal(report.movement.improved[0].skill, 'boundaries');
  assert.ok(report.movement.improved[0].delta > 0.5);
  assert.deepEqual(report.movement.stuck, []);
});

/* ---------------- Effort ---------------- */

test('consistency describes the shape of the effort, not its total', () => {
  const burst: Record<string, number> = {};
  const spread: Record<string, number> = {};
  // Same total minutes inside the window: four long days, versus fifteen
  // short ones spread across it.
  for (let i = 0; i < 4; i += 1) burst[addDays('2026-03-02', i)] = 3600;
  for (let i = 0; i < 15; i += 1) spread[addDays('2026-03-02', i * 2)] = 960;

  const burstReport = buildParentReport(base({ activity: burst }));
  const spreadReport = buildParentReport(base({ activity: spread }));

  assert.equal(burstReport.effort.minutes, spreadReport.effort.minutes);
  assert.equal(burstReport.effort.consistency, 'thin');
  assert.equal(spreadReport.effort.consistency, 'strong');
});

test('the longest gap is measured inside the window', () => {
  const activity: Record<string, number> = {
    [addDays(TODAY, -29)]: 1800,
    [TODAY]: 1800,
  };
  const report = buildParentReport(base({ activity }));
  assert.equal(report.effort.activeDays, 2);
  assert.equal(report.effort.longestGap, 28);
});

/* ---------------- Advice and limits ---------------- */

test('an empty month is reported as an empty month, not as a study-habit problem', () => {
  /*
   * The first version of this said "the longest gap this month was 30 days",
   * which is true and reads as a complaint about discipline. What actually
   * happened is that nobody opened the platform, and a guardian needs to know
   * that plainly — it may be a lost password rather than a lost month.
   */
  const report = buildParentReport(base());
  assert.equal(report.effort.consistency, 'none');
  assert.equal(report.homeActions.length, 1);
  assert.ok(report.homeActions[0].en.includes('no recorded activity'));
  assert.ok(!report.homeActions[0].en.includes('gap'));
});

test('a steady month with nothing wrong produces no advice at all', () => {
  // Every signal quiet: work is regular, answers are unremarkable. A report
  // that manufactures a suggestion here is the reason families stop reading
  // these.
  // Every other day across the whole window: half the days, never a gap
  // longer than one.
  const start = addDays(TODAY, -29);
  const activity: Record<string, number> = {};
  for (let i = 0; i < 15; i += 1) activity[addDays(start, i * 2)] = 1500;

  const questions = new Map<string, Question>();
  const responses: Response[] = [];
  for (let i = 0; i < 12; i += 1) {
    const id = `s${i}`;
    questions.set(id, question(id, 'central-ideas'));
    // Correct, at a sensible pace, and steady across the window.
    responses.push(response(id, true, ms(addDays(start, i * 2)), 55));
  }

  const report = buildParentReport(
    base({ activity, questions, attempts: [attempt('a1', ms(start), undefined, responses)] }),
  );

  assert.equal(report.effort.consistency, 'strong');
  assert.deepEqual(report.homeActions, []);
});

test('the limits section is never empty, however good the month was', () => {
  const report = buildParentReport(
    base({
      attempts: [
        attempt('a1', ms('2026-02-01'), scoreOf(1100, 20, ms('2026-02-01')), []),
        attempt('a2', ms('2026-03-20'), scoreOf(1400, 20, ms('2026-03-20')), []),
      ],
    }),
  );
  assert.equal(report.score.verdict, 'up');
  assert.ok(report.limits.length >= 2);
  assert.ok(report.limits.every((l) => l.en.trim() && l.vi.trim()));
});

test('every note the report can produce is bilingual', () => {
  const questions = new Map<string, Question>();
  const responses: Response[] = [];
  for (let i = 0; i < 10; i += 1) {
    const id = `q${i}`;
    questions.set(id, question(id, 'boundaries'));
    // Fast and wrong: the careless signal.
    responses.push(response(id, false, ms(addDays('2026-03-05', i)), 20));
  }
  const activity: Record<string, number> = { [addDays(TODAY, -20)]: 600, [TODAY]: 600 };

  const report = buildParentReport(
    base({ attempts: [attempt('a1', ms('2026-03-05'), undefined, responses)], questions, activity }),
  );

  assert.ok(report.homeActions.length > 0);
  for (const note of [...report.homeActions, ...report.limits]) {
    assert.ok(note.en.trim().length > 20, `thin English: ${note.en}`);
    assert.ok(note.vi.trim().length > 15, `thin Vietnamese: ${note.en}`);
  }
});

test('the roster line refuses to summarise a change inside measurement error', () => {
  const report = buildParentReport(
    base({
      attempts: [
        attempt('a1', ms('2026-02-01'), scoreOf(1100, 30, ms('2026-02-01')), []),
        attempt('a2', ms('2026-03-20'), scoreOf(1120, 30, ms('2026-03-20')), []),
      ],
    }),
  );
  const line = summariseForRoster(report);
  assert.ok(!line.en.includes('20 points'), `roster line leaked a noise figure: ${line.en}`);
  assert.ok(line.en.includes('within measurement error'));
  assert.ok(line.vi.includes('sai số đo'));
});

test('a report on almost nothing says so rather than looking complete', () => {
  const report = buildParentReport(base({ activity: { [TODAY]: 300 } }));
  assert.equal(report.thin, true);
  assert.ok(report.limits.some((l) => l.en.includes('not yet enough activity')));
});

test('the window is the last thirty days by default, ending today', () => {
  const report = buildParentReport(base());
  assert.equal(report.to, TODAY);
  assert.equal(report.from, addDays(TODAY, -29));
  assert.equal(report.windowDays, 30);
  assert.ok(isoDate(new Date(`${report.from}T00:00:00`)) === report.from);
});
