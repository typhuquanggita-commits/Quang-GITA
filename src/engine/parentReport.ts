/**
 * The guardian's report.
 *
 * For a tutoring centre this is the document that justifies the fee to the
 * person paying it, which is exactly why it is the easiest document in the
 * business to write dishonestly. The temptation is uniform: report a number
 * that went up, attribute it to the teaching, and leave out everything the
 * platform cannot see.
 *
 * This one is built the other way round, and the rules are worth stating
 * because they cost something.
 *
 * **A score change is reported only when it exceeds measurement error.** Two
 * sittings differing by twenty points on a test whose standard error is
 * thirty have not established improvement — they have established that the
 * test has a standard error. A centre that reports that difference as
 * progress is selling noise, and it will be found out on test day. So the
 * report has three states, not two: moved up, moved down, and *not yet
 * distinguishable from measurement error*. The third is the honest answer
 * early on, and it is the one a good report says out loud.
 *
 * **Nothing unmeasured is scored as anything.** A skill the learner has not
 * practised does not appear as weak, strong, or stuck. It appears as
 * untouched, which is a different fact and often the more useful one.
 *
 * **Advice comes from a signal or it does not come.** There is no fallback
 * paragraph telling a guardian to encourage more study. Where the evidence
 * suggests nothing, the report says so — a page of generic encouragement is
 * how a family learns to stop reading these.
 *
 * Everything here is a pure function of stored state, so the same figures
 * appear in the console, in the printed sheet, and in an exported backup.
 */

import type { Attempt, Question, SectionId, SkillId } from '../types.ts';
import { collectResponses, errorMix, type ResponseRecord } from './analytics.ts';
import { addDays, daysBetween, isoDate, mean } from '../lib/util.ts';

/** Responses a skill needs in each half before movement means anything. */
const MOVEMENT_MIN_PER_HALF = 3;

/** Accuracy change below this is not worth a guardian's attention either way. */
const MOVEMENT_MIN_DELTA = 0.12;

/** Days in the reporting window unless the caller says otherwise. */
const DEFAULT_WINDOW_DAYS = 30;

export type ScoreVerdict = 'up' | 'down' | 'within-error' | 'insufficient';

export interface ReportScore {
  first: { total: number; at: number; band: [number, number] } | null;
  latest: { total: number; at: number; band: [number, number] } | null;
  /** Points between the two, or null when there are not two scored sittings. */
  change: number | null;
  /**
   * Whether that change survives the measurement error on both sittings.
   * The combined error is the root of the sum of squares, not the sum: two
   * independent errors do not simply add.
   */
  verdict: ScoreVerdict;
  combinedError: number | null;
  sittings: number;
}

export type Consistency = 'strong' | 'uneven' | 'thin' | 'none';

export interface ReportEffort {
  activeDays: number;
  windowDays: number;
  minutes: number;
  longestRun: number;
  longestGap: number;
  consistency: Consistency;
}

export interface SkillMovement {
  skill: SkillId;
  section: SectionId;
  before: number;
  after: number;
  delta: number;
  attempted: number;
}

export interface ReportMovement {
  improved: SkillMovement[];
  stuck: SkillMovement[];
  /** Practised too little in this window for movement to mean anything. */
  tooEarly: SkillId[];
}

export interface ReportNote {
  en: string;
  vi: string;
}

export interface ParentReport {
  studentName: string;
  from: string;
  to: string;
  windowDays: number;
  score: ReportScore;
  effort: ReportEffort;
  movement: ReportMovement;
  /** What the learner's errors are made of, in this window only. */
  errorMix: { concept: number; careless: number; timeout: number; omitted: number };
  /** Derived from signals. Empty when the evidence suggests nothing. */
  homeActions: ReportNote[];
  /** What this report cannot tell you. Never empty. */
  limits: ReportNote[];
  /** True when there is too little evidence for the report to carry weight. */
  thin: boolean;
  responses: number;
}

export interface ParentReportInput {
  studentName: string;
  attempts: readonly Attempt[];
  questions: Map<string, Question>;
  /** isoDate → seconds studied, as the store records it. */
  activity: Record<string, number>;
  windowDays?: number;
  today?: string;
}

/* ------------------------------------------------------------------ */
/* Score                                                               */
/* ------------------------------------------------------------------ */

function buildScore(attempts: readonly Attempt[]): ReportScore {
  /*
   * Only full, scored, two-section sittings count. A single-section practice
   * run produces a number on the same scale and would look like a collapse
   * next to a full test — the most misleading thing a report of this kind can
   * put in front of a family.
   */
  const scored = attempts
    .filter((a) => a.score && a.score.sections.length === 2)
    .sort((a, b) => (a.score!.scoredAt ?? 0) - (b.score!.scoredAt ?? 0));

  if (scored.length === 0) {
    return { first: null, latest: null, change: null, verdict: 'insufficient', combinedError: null, sittings: 0 };
  }

  const point = (attempt: Attempt) => ({
    total: attempt.score!.total,
    at: attempt.score!.scoredAt,
    band: attempt.score!.totalBand,
  });

  const first = point(scored[0]);
  const latest = point(scored[scored.length - 1]);

  if (scored.length === 1) {
    return { first, latest: first, change: null, verdict: 'insufficient', combinedError: null, sittings: 1 };
  }

  const sem = (band: [number, number]) => Math.max(1, (band[1] - band[0]) / 2);
  const combined = Math.round(
    Math.sqrt(sem(first.band) ** 2 + sem(latest.band) ** 2),
  );
  const change = latest.total - first.total;

  return {
    first,
    latest,
    change,
    combinedError: combined,
    verdict: Math.abs(change) <= combined ? 'within-error' : change > 0 ? 'up' : 'down',
    sittings: scored.length,
  };
}

/* ------------------------------------------------------------------ */
/* Effort                                                              */
/* ------------------------------------------------------------------ */

function buildEffort(
  activity: Record<string, number>,
  from: string,
  windowDays: number,
): ReportEffort {
  const days: number[] = [];
  for (let i = 0; i < windowDays; i += 1) {
    days.push(activity[addDays(from, i)] ?? 0);
  }

  const activeDays = days.filter((s) => s > 0).length;
  const minutes = Math.round(days.reduce((acc, s) => acc + s, 0) / 60);

  let longestRun = 0;
  let run = 0;
  let longestGap = 0;
  let gap = 0;
  for (const seconds of days) {
    if (seconds > 0) {
      run += 1;
      gap = 0;
      longestRun = Math.max(longestRun, run);
    } else {
      gap += 1;
      run = 0;
      longestGap = Math.max(longestGap, gap);
    }
  }

  /*
   * Consistency is about the shape of the effort, not its total. Ten hours in
   * two weekends and ten hours across twenty evenings produce very different
   * learning, and the second is what a guardian can actually help protect.
   */
  const share = windowDays === 0 ? 0 : activeDays / windowDays;
  const consistency: Consistency =
    activeDays === 0 ? 'none'
      : share >= 0.5 && longestGap <= 4 ? 'strong'
        : share >= 0.25 ? 'uneven'
          : 'thin';

  return { activeDays, windowDays, minutes, longestRun, longestGap, consistency };
}

/* ------------------------------------------------------------------ */
/* Movement                                                            */
/* ------------------------------------------------------------------ */

function buildMovement(records: readonly ResponseRecord[]): ReportMovement {
  const bySkill = new Map<SkillId, ResponseRecord[]>();
  for (const record of records) {
    const list = bySkill.get(record.question.skill) ?? [];
    list.push(record);
    bySkill.set(record.question.skill, list);
  }

  const improved: SkillMovement[] = [];
  const stuck: SkillMovement[] = [];
  const tooEarly: SkillId[] = [];

  for (const [skill, list] of bySkill) {
    // Records arrive in time order from collectResponses.
    const half = Math.floor(list.length / 2);
    if (half < MOVEMENT_MIN_PER_HALF) {
      tooEarly.push(skill);
      continue;
    }

    const rate = (items: ResponseRecord[]) =>
      items.filter((r) => r.response.correct).length / items.length;
    const before = rate(list.slice(0, half));
    const after = rate(list.slice(half));
    const delta = after - before;

    const movement: SkillMovement = {
      skill,
      section: list[0].question.section,
      before,
      after,
      delta,
      attempted: list.length,
    };

    if (delta >= MOVEMENT_MIN_DELTA) improved.push(movement);
    else if (delta <= -MOVEMENT_MIN_DELTA || after < 0.5) stuck.push(movement);
    // A skill that moved less than the threshold and is already accurate is
    // neither improving nor stuck. It is fine, and it is not news.
  }

  improved.sort((a, b) => b.delta - a.delta);
  stuck.sort((a, b) => a.after - b.after);
  tooEarly.sort();

  return { improved, stuck, tooEarly };
}

/* ------------------------------------------------------------------ */
/* What a guardian can actually do                                     */
/* ------------------------------------------------------------------ */

/**
 * Actions are derived from a signal in this window or they are not produced.
 *
 * Each one is something a guardian can do without knowing any SAT content,
 * because that is the only kind of advice most guardians can act on. "Ask
 * them to explain one wrong answer to you" works whether or not you can read
 * the question; "review the transitions chapter" does not.
 */
function buildHomeActions(
  effort: ReportEffort,
  movement: ReportMovement,
  mix: ParentReport['errorMix'],
  score: ReportScore,
): ReportNote[] {
  const actions: ReportNote[] = [];

  if (effort.consistency === 'none') {
    /*
     * No work at all is a fact, not a gap. Reporting it as "the longest gap
     * was 30 days" would be technically true and would read as a complaint
     * about study habits, when what happened is that the platform was not
     * opened. The distinction matters to the person reading it.
     */
    return [
      {
        en: 'There is no recorded activity on the platform in this period. That is worth checking before reading anything else here: it may mean the work moved elsewhere, or that access was lost.',
        vi: 'Kỳ này hệ thống không ghi nhận hoạt động nào. Nên kiểm tra điều này trước khi đọc phần còn lại: có thể việc học đã chuyển sang nơi khác, hoặc con đang gặp trục trặc khi đăng nhập.',
      },
    ];
  }

  if (effort.consistency === 'uneven' || effort.longestGap >= 5) {
    actions.push({
      en: `The work is landing in bursts — the longest gap this month was ${effort.longestGap} days. A short fixed slot on most days beats a long weekend session, and protecting that slot is something a household can do that a tutor cannot.`,
      vi: `Việc học đang dồn cục — quãng nghỉ dài nhất tháng này là ${effort.longestGap} ngày. Học ngắn nhưng đều đặn hơn hẳn dồn vào cuối tuần, và giữ được khung giờ cố định là việc gia đình làm được còn giáo viên thì không.`,
    });
  }

  if (mix.careless >= 3 && mix.careless >= mix.concept) {
    actions.push({
      en: 'Most of the wrong answers this month were fast rather than confused: the material was known and the question was misread. Asking them to talk you through one wrong answer — what the question asked, not what the topic was — usually surfaces the habit in a minute.',
      vi: 'Phần lớn câu sai tháng này là do làm nhanh chứ không phải không hiểu: kiến thức có, chỉ là đọc lướt đề. Hãy bảo con giải thích cho phụ huynh nghe MỘT câu sai — đề hỏi gì, chứ không phải bài thuộc chương nào — thường chỉ một phút là lộ ra thói quen đó.',
    });
  }

  if (mix.timeout >= 3) {
    actions.push({
      en: 'A number of items were answered too quickly to have been read properly, which is usually a sign of running out of clock rather than of impatience. Timed practice at home, with the clock visible, is what makes that improvable.',
      vi: 'Có một số câu trả lời quá nhanh, không kịp đọc kỹ — thường là do hết giờ chứ không phải sốt ruột. Luyện có bấm giờ ở nhà, để đồng hồ nhìn thấy được, mới sửa được điều này.',
    });
  }

  if (mix.omitted >= 4) {
    actions.push({
      en: 'Several questions were left blank. Nothing is deducted for a wrong answer on this test, so a blank is always worth less than a guess — worth checking they know that.',
      vi: 'Có mấy câu bị bỏ trống. Bài thi này không trừ điểm câu sai, nên bỏ trống luôn thiệt hơn đoán — nên hỏi lại xem con đã biết điều đó chưa.',
    });
  }

  if (movement.improved.length > 0) {
    actions.push({
      en: `${movement.improved.length} skill${movement.improved.length > 1 ? 's' : ''} moved measurably this month. Naming the specific one at home is worth more than praising the score, which the learner does not control.`,
      vi: `Tháng này có ${movement.improved.length} kỹ năng tiến bộ đo được. Gọi tên đúng kỹ năng đó ở nhà có giá trị hơn nhiều so với khen điểm số — thứ mà con không tự quyết định được.`,
    });
  }

  if (score.verdict === 'within-error' && score.sittings >= 2) {
    actions.push({
      en: 'The total has not moved beyond measurement error yet, and at this stage that is normal rather than worrying. Skill-level movement below shows up weeks before the headline score does.',
      vi: 'Tổng điểm chưa nhích ra khỏi sai số đo — ở giai đoạn này đó là bình thường, không phải dấu hiệu xấu. Chuyển động ở từng kỹ năng bên dưới luôn xuất hiện trước tổng điểm vài tuần.',
    });
  }

  return actions;
}

/* ------------------------------------------------------------------ */
/* What this report cannot tell you                                    */
/* ------------------------------------------------------------------ */

function buildLimits(report: Omit<ParentReport, 'limits' | 'homeActions'>): ReportNote[] {
  const limits: ReportNote[] = [
    {
      en: 'Difficulty parameters in this platform are author estimates rather than calibrations against a live population. Scores here are a good guide to direction and a rough guide to level; they are not an official SAT score.',
      vi: 'Tham số độ khó trong hệ thống là ước lượng của người soạn, chưa hiệu chuẩn trên quần thể thật. Điểm ở đây phản ánh tốt CHIỀU tiến bộ và chỉ áng chừng MỨC; đây không phải điểm SAT chính thức.',
    },
    {
      en: 'The platform sees work done inside it. Reading, tutoring, and school study leave no trace here, so a quiet month on this page is not necessarily a quiet month.',
      vi: 'Hệ thống chỉ thấy phần việc làm trong hệ thống. Đọc sách, học thêm, học ở trường đều không để lại dấu vết ở đây — nên một tháng "vắng" trên trang này chưa chắc là một tháng không học.',
    },
  ];

  if (report.score.sittings < 2) {
    limits.push({
      en: 'With fewer than two full sittings there is no score trend to report. One score is a position, not a direction.',
      vi: 'Chưa đủ hai lần thi trọn vẹn thì chưa có xu hướng điểm để báo cáo. Một lần thi cho biết vị trí, không cho biết chiều đi.',
    });
  }

  if (report.movement.tooEarly.length > 0) {
    limits.push({
      en: `${report.movement.tooEarly.length} skill${report.movement.tooEarly.length > 1 ? 's were' : ' was'} practised too little this month for any movement to be meaningful. They are listed as too early rather than as weak — the platform does not know either way.`,
      vi: `Có ${report.movement.tooEarly.length} kỹ năng luyện quá ít trong tháng nên chưa thể nói là tiến hay lùi. Chúng được ghi là "chưa đủ dữ liệu" chứ không phải "yếu" — hệ thống thực sự chưa biết.`,
    });
  }

  if (report.thin) {
    limits.push({
      en: 'There is not yet enough activity in this window for the figures above to carry much weight. Read this report as a starting point rather than as an assessment.',
      vi: 'Hoạt động trong kỳ này chưa đủ để các con số phía trên có nhiều trọng lượng. Hãy đọc báo cáo này như một điểm khởi đầu, chưa phải một bản đánh giá.',
    });
  }

  return limits;
}

/* ------------------------------------------------------------------ */
/* Assembly                                                            */
/* ------------------------------------------------------------------ */

export function buildParentReport(input: ParentReportInput): ParentReport {
  const windowDays = input.windowDays ?? DEFAULT_WINDOW_DAYS;
  const to = input.today ?? isoDate();
  const from = addDays(to, -(windowDays - 1));
  const fromMs = new Date(`${from}T00:00:00`).getTime();

  const all = collectResponses(input.attempts, input.questions);
  const inWindow = all.filter((record) => record.at >= fromMs);

  const score = buildScore(input.attempts);
  const effort = buildEffort(input.activity, from, windowDays);
  const movement = buildMovement(inWindow);
  const mix = errorMix(inWindow);

  const partial: Omit<ParentReport, 'limits' | 'homeActions'> = {
    studentName: input.studentName,
    from,
    to,
    windowDays,
    score,
    effort,
    movement,
    errorMix: mix,
    thin: inWindow.length < 20 || effort.activeDays < 3,
    responses: inWindow.length,
  };

  return {
    ...partial,
    homeActions: buildHomeActions(effort, movement, mix, score),
    limits: buildLimits(partial),
  };
}

/**
 * A one-line summary for a roster row, in both languages.
 *
 * Deliberately refuses to summarise a score change that has not cleared
 * measurement error: the roster is where a teacher scans twenty students in
 * ten seconds, and it is exactly where a misleading number does the most
 * damage.
 */
export function summariseForRoster(report: ParentReport): ReportNote {
  const { score, effort } = report;

  if (score.verdict === 'up') {
    return {
      en: `Up ${score.change} points beyond measurement error; active ${effort.activeDays} of ${effort.windowDays} days.`,
      vi: `Tăng ${score.change} điểm, đã vượt sai số đo; học ${effort.activeDays}/${effort.windowDays} ngày.`,
    };
  }
  if (score.verdict === 'down') {
    return {
      en: `Down ${Math.abs(score.change ?? 0)} points beyond measurement error; active ${effort.activeDays} of ${effort.windowDays} days.`,
      vi: `Giảm ${Math.abs(score.change ?? 0)} điểm, đã vượt sai số đo; học ${effort.activeDays}/${effort.windowDays} ngày.`,
    };
  }
  if (score.verdict === 'within-error') {
    return {
      en: `Score change is within measurement error; ${report.movement.improved.length} skill(s) moved; active ${effort.activeDays} of ${effort.windowDays} days.`,
      vi: `Thay đổi điểm còn nằm trong sai số đo; ${report.movement.improved.length} kỹ năng có chuyển động; học ${effort.activeDays}/${effort.windowDays} ngày.`,
    };
  }
  return {
    en: `No score trend yet (${score.sittings} full sitting${score.sittings === 1 ? '' : 's'}); active ${effort.activeDays} of ${effort.windowDays} days.`,
    vi: `Chưa có xu hướng điểm (${score.sittings} lần thi trọn vẹn); học ${effort.activeDays}/${effort.windowDays} ngày.`,
  };
}

/** Mean seconds per response in the window — used only to sanity-check effort. */
export function meanSecondsPerResponse(records: readonly ResponseRecord[]): number {
  return records.length === 0 ? 0 : Math.round(mean(records.map((r) => r.response.msSpent / 1000)));
}

/** Days from the report date to a test date, or null when none is set. */
export function daysToTest(report: ParentReport, testDate: string | null | undefined): number | null {
  if (!testDate) return null;
  return daysBetween(report.to, testDate);
}
