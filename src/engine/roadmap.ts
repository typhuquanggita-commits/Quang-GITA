/**
 * The long roadmap — six months to a year, from the entry diagnostic.
 *
 * The platform had four courses of seven to thirteen weeks each and nothing
 * that chained them. A learner starting at 1050 in September with a June test
 * date could see which course they belonged in today and had no answer at all
 * to the question they were actually asking: *what happens between now and
 * June, and does it get me there?*
 *
 * This file answers that, and the answer is allowed to be no.
 *
 * ## What a roadmap is made of
 *
 * Phases, chained. Each phase is one of the existing courses, placed in a
 * window, with the score band it is expected to move the learner into. The
 * sequence is decided by the entry diagnostic, not by preference — a learner
 * at 1050 begins at Foundation whatever they would rather do, and one at 1400
 * does not sit through it.
 *
 * Between phases sit **sittings**: which actual administrations to register
 * for, and why that one. This is where most preparation goes wrong in a way
 * nobody notices. A learner who sits once, at the end, has no way to recover
 * from a bad morning; a learner who sits three times in three consecutive
 * months has not changed between them and is measuring the same ability three
 * times. Two sittings, separated by a phase of work, is the shape that
 * actually produces top scores.
 *
 * ## On 1600 specifically
 *
 * 1600 is a perfect score. It requires very close to zero error across
 * roughly ninety-eight items in two hours and fourteen minutes, and it is
 * reached by something under one percent of candidates.
 *
 * A platform that promises it is lying, and this one refuses to. What it does
 * instead is state the arithmetic: above about 1550 the remaining gain is two
 * or three items per sitting, which is within the noise of a single morning —
 * so at that level the strategy that works is not more study but **more
 * sittings**, because a perfect score is partly a matter of catching a good
 * morning. `feasibilityFor` says so in as many words when the target is 1550
 * or above.
 *
 * The honest target for almost everyone is the highest band they can reach
 * reliably, sat twice. That is what this roadmap is built to produce.
 */

import type { SkillId } from '../types.ts';
import { COURSES, type Course, type CourseId } from '../data/curriculum.ts';
import { buildCoursePlan } from './curriculum.ts';
import { ADMINISTRATIONS, registerBy, type Administration } from '../data/testDates.ts';
import { addDays, daysBetween, isoDate } from '../lib/util.ts';

/** Weeks of rest a learner needs between a full sitting and the next phase. */
const RECOVERY_WEEKS = 1;

/** Below this gap, two sittings measure the same ability twice. */
const MIN_WEEKS_BETWEEN_SITTINGS = 8;

/**
 * Points a well-spent hour buys, and how that compresses as the score rises.
 *
 * Shared with `studyPlan.ts` rather than restated: two models of the same
 * thing drift, and then the plan and the roadmap promise different scores for
 * the same work. Deliberately conservative at every band.
 */
export function compressionAt(score: number): number {
  if (score >= 1500) return 0.2;
  if (score >= 1400) return 0.35;
  if (score >= 1300) return 0.55;
  if (score >= 1150) return 0.8;
  return 1;
}

export function expectedGain(hours: number, from: number): number {
  return Math.round(hours * 5.5 * compressionAt(from));
}

/** Hours needed to move from one score to another, integrating the compression. */
export function hoursToReach(from: number, to: number): number {
  let score = from;
  let hours = 0;
  // Ten-point steps, so the compression is applied as the score climbs rather
  // than once at the start. Integrating matters: doing it once at the starting
  // band understates a long climb by a third or more.
  while (score < to && hours < 2000) {
    hours += 10 / (5.5 * compressionAt(score));
    score += 10;
  }
  return Math.ceil(hours);
}

export type Feasibility =
  | 'comfortable'
  | 'demanding'
  | 'unlikely'
  | 'out-of-reach'
  /** The target is at or above the point where sittings matter more than study. */
  | 'noise-limited';

export interface FeasibilityVerdict {
  verdict: Feasibility;
  requiredHours: number;
  availableHours: number;
  projectedScore: number;
  reason: { en: string; vi: string };
}

export function feasibilityFor(
  baseline: number,
  target: number,
  weeks: number,
  hoursPerWeek: number,
): FeasibilityVerdict {
  const availableHours = Math.round(weeks * hoursPerWeek);
  const requiredHours = hoursToReach(baseline, target);
  const projectedScore = Math.min(1600, baseline + expectedGain(availableHours, baseline));
  const ratio = requiredHours === 0 ? Infinity : availableHours / requiredHours;

  if (target >= 1550) {
    return {
      verdict: 'noise-limited',
      requiredHours,
      availableHours,
      projectedScore: Math.min(1600, projectedScore),
      reason: {
        en: `Above about 1550 the remaining gain is two or three items per sitting, which is inside the variation of a single morning. More study stops being the lever and more sittings becomes it: prepare to the highest band you can reach reliably, then sit twice. A platform that promises ${target} is not describing preparation, it is describing luck.`,
        vi: `Trên khoảng 1550, phần điểm còn lại chỉ tương đương hai ba câu mỗi lượt thi — nằm gọn trong dao động của một buổi sáng. Lúc này học thêm không còn là đòn bẩy nữa, THI THÊM LƯỢT mới là: luyện tới bậc cao nhất mà bạn đạt được ổn định, rồi thi hai lần. Nền tảng nào hứa chắc ${target} thì không phải đang nói về việc luyện thi, mà đang nói về sự may mắn.`,
      },
    };
  }

  if (ratio >= 1.5) {
    return {
      verdict: 'comfortable',
      requiredHours,
      availableHours,
      projectedScore,
      reason: {
        en: `About ${requiredHours} hours of well-spent work would cover this gap, and the schedule holds roughly ${availableHours}. There is room for a unit to be repeated, which most learners need at least once.`,
        vi: `Cần khoảng ${requiredHours} giờ học có chất lượng để lấp khoảng cách này, trong khi lịch có khoảng ${availableHours} giờ. Còn dư chỗ để học lại một đơn vị — điều mà phần lớn học viên cần ít nhất một lần.`,
      },
    };
  }

  if (ratio >= 1.0) {
    return {
      verdict: 'demanding',
      requiredHours,
      availableHours,
      projectedScore,
      reason: {
        en: `The gap needs about ${requiredHours} hours and the schedule holds about ${availableHours}. It fits with nothing to spare, which means a missed month or a repeated unit costs the target. Either start earlier, add an hour a week, or aim lower and sit twice.`,
        vi: `Khoảng cách này cần khoảng ${requiredHours} giờ, lịch có khoảng ${availableHours} giờ. Vừa khít, không dư — nghĩa là nghỉ mất một tháng hoặc phải học lại một đơn vị là mất mục tiêu. Hoặc bắt đầu sớm hơn, hoặc thêm một giờ mỗi tuần, hoặc hạ mục tiêu và thi hai lần.`,
      },
    };
  }

  if (ratio >= 0.6) {
    return {
      verdict: 'unlikely',
      requiredHours,
      availableHours,
      projectedScore,
      reason: {
        en: `About ${requiredHours} hours are needed and about ${availableHours} are available. On the evidence this platform has, ${projectedScore} is the realistic outcome of this schedule. That is not a reason to stop — it is a reason to book a later sitting as well.`,
        vi: `Cần khoảng ${requiredHours} giờ mà chỉ có khoảng ${availableHours} giờ. Theo dữ liệu hệ thống có, kết quả thực tế của lịch này là khoảng ${projectedScore}. Đây không phải lý do để dừng — đây là lý do để đăng ký thêm một kỳ thi muộn hơn.`,
      },
    };
  }

  return {
    verdict: 'out-of-reach',
    requiredHours,
    availableHours,
    projectedScore,
    reason: {
      en: `This target needs roughly ${requiredHours} hours against about ${availableHours} available — it is not close. Saying so now is worth more than saying it in June. A target of about ${projectedScore} is what this schedule supports, and a second sitting three months later is what would move it further.`,
      vi: `Mục tiêu này cần khoảng ${requiredHours} giờ trong khi chỉ có khoảng ${availableHours} giờ — chênh lệch không hề nhỏ. Nói ra bây giờ có giá hơn nhiều so với nói vào tháng Sáu. Mức mà lịch này chống đỡ được là khoảng ${projectedScore}, và một kỳ thi thứ hai sau ba tháng mới là thứ đẩy nó đi xa hơn.`,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Phases and sittings                                                 */
/* ------------------------------------------------------------------ */

export interface Phase {
  index: number;
  course: Course;
  startDate: string;
  endDate: string;
  weeks: number;
  sessions: number;
  classHours: number;
  skills: SkillId[];
  /** Score band this phase is expected to move the learner into. */
  entryScore: number;
  exitScore: number;
}

export interface Sitting {
  administration: Administration;
  /** 1 for the first sitting, 2 for the second. */
  ordinal: number;
  registerBy: string;
  purpose: { en: string; vi: string };
}

export interface Roadmap {
  from: string;
  targetDate: string;
  weeks: number;
  hoursPerWeek: number;
  baselineScore: number | null;
  targetScore: number;
  phases: Phase[];
  sittings: Sitting[];
  totalClassHours: number;
  feasibility: FeasibilityVerdict | null;
  /** Present when there is no diagnostic: the roadmap is a shape, not a plan. */
  blocked: { en: string; vi: string } | null;
}

export interface RoadmapInput {
  baselineScore: number | null;
  targetScore: number;
  /** The learner's intended final sitting, or null to let the roadmap pick. */
  targetDate: string | null;
  hoursPerWeek: number;
  today?: string;
}

/** The chain of courses that leads from a baseline towards a target. */
function courseChain(baseline: number, target: number): CourseId[] {
  const chain: CourseId[] = [];
  if (baseline < 1100) chain.push('foundation');
  if (baseline < 1350 && target >= 1200) chain.push('core');
  if (target >= 1400) chain.push('advance');
  chain.push('sprint');

  // A learner already above a course's ceiling does not sit through it.
  return chain.filter((id) => {
    const course = COURSES.find((c) => c.id === id)!;
    return course.id === 'sprint' || course.entry.maxScore === null || baseline <= course.entry.maxScore;
  });
}

export function buildRoadmap(input: RoadmapInput): Roadmap {
  const today = input.today ?? isoDate();
  const hoursPerWeek = Math.max(1, input.hoursPerWeek);

  if (input.baselineScore === null) {
    return {
      from: today,
      targetDate: input.targetDate ?? '',
      weeks: 0,
      hoursPerWeek,
      baselineScore: null,
      targetScore: input.targetScore,
      phases: [],
      sittings: [],
      totalClassHours: 0,
      feasibility: null,
      blocked: {
        en: 'A roadmap needs a starting point. Until a full-length diagnostic has been sat and scored, every phase length and every projected score below would be invented — and a plan built on an invented baseline is wrong in every figure it contains.',
        vi: 'Một lộ trình cần có điểm xuất phát. Chừng nào chưa làm và chấm một đề full-length đầu vào thì mọi độ dài giai đoạn và mọi mức điểm dự kiến đều là bịa — và kế hoạch dựng trên một điểm xuất phát bịa thì sai ở mọi con số nó chứa.',
      },
    };
  }

  const baseline = input.baselineScore;
  const chain = courseChain(baseline, input.targetScore);

  /*
   * The final sitting anchors everything. If the learner has not chosen one,
   * take the first administration far enough away for the chain to fit.
   */
  const chainWeeks = chain.reduce((n, id) => n + (buildCoursePlan(id)?.weeks ?? 0), 0);
  const targetDate =
    input.targetDate ??
    ADMINISTRATIONS.find((a) => daysBetween(today, a.testDate) >= (chainWeeks + RECOVERY_WEEKS) * 7)
      ?.testDate ??
    ADMINISTRATIONS[ADMINISTRATIONS.length - 1].testDate;

  const weeks = Math.max(1, Math.round(daysBetween(today, targetDate) / 7));

  // Phases run back to back from today, each at its own designed length.
  const phases: Phase[] = [];
  let cursor = today;
  let score = baseline;

  chain.forEach((id, i) => {
    const plan = buildCoursePlan(id);
    if (!plan) return;
    const course = plan.course;
    const start = cursor;
    const end = addDays(start, plan.weeks * 7);
    const gain = expectedGain(plan.classHours + plan.homeworkHours, score);
    const exit = Math.min(1600, score + gain);

    phases.push({
      index: i + 1,
      course,
      startDate: start,
      endDate: end,
      weeks: plan.weeks,
      sessions: plan.totalSessions,
      classHours: plan.classHours,
      skills: plan.skills,
      entryScore: score,
      exitScore: exit,
    });

    cursor = end;
    score = exit;
  });

  /*
   * Sittings. The last is the target date; the first is an earlier
   * administration at least MIN_WEEKS_BETWEEN_SITTINGS before it, so the two
   * measure different abilities rather than the same one twice.
   */
  const sittings: Sitting[] = [];
  const final = ADMINISTRATIONS.find((a) => a.testDate === targetDate);

  const firstCandidate = ADMINISTRATIONS.filter(
    (a) =>
      a.testDate > today &&
      a.testDate < targetDate &&
      daysBetween(a.testDate, targetDate) >= MIN_WEEKS_BETWEEN_SITTINGS * 7,
  ).pop();

  if (firstCandidate) {
    sittings.push({
      administration: firstCandidate,
      ordinal: 1,
      registerBy: registerBy(firstCandidate),
      purpose: {
        en: 'The first real sitting. Its job is not the score — it is to make the second one ordinary. A candidate whose first exam hall is the one that counts loses points to the room rather than to the questions.',
        vi: 'Lượt thi thật đầu tiên. Việc của nó không phải là điểm số — mà là làm cho lượt thứ hai trở nên bình thường. Thí sinh mà phòng thi đầu tiên trong đời lại đúng là buổi tính điểm thì mất điểm vì cái phòng thi chứ không phải vì đề.',
      },
    });
  }

  if (final) {
    sittings.push({
      administration: final,
      ordinal: sittings.length + 1,
      registerBy: registerBy(final),
      purpose: {
        en: 'The sitting the score comes from. Register at least five weeks ahead: centres in Hà Nội and Hồ Chí Minh City fill long before the deadline, and a seat in another city is a different exam morning.',
        vi: 'Lượt thi lấy điểm. Đăng ký trước ít nhất năm tuần: điểm thi ở Hà Nội và TP.HCM kín chỗ từ rất lâu trước hạn, và một chỗ ngồi ở tỉnh khác là một buổi sáng thi hoàn toàn khác.',
      },
    });
  }

  return {
    from: today,
    targetDate,
    weeks,
    hoursPerWeek,
    baselineScore: baseline,
    targetScore: input.targetScore,
    phases,
    sittings,
    totalClassHours: phases.reduce((n, p) => n + p.classHours, 0),
    feasibility: feasibilityFor(baseline, input.targetScore, weeks, hoursPerWeek),
    blocked: null,
  };
}

/**
 * What a top score actually requires, stated once so every surface agrees.
 *
 * Written as conditions rather than as encouragement, because a learner
 * deciding whether to aim at 1550+ needs to know what they are signing up to
 * and not to be cheered at.
 */
export const TOP_SCORE_CONDITIONS: Array<{ en: string; vi: string }> = [
  {
    en: 'Roughly 98 items in 2 hours 14 minutes, with something close to zero error. At 1550 a candidate is losing two or three items in total; at 1600, none.',
    vi: 'Khoảng 98 câu trong 2 giờ 14 phút, với sai sót gần như bằng không. Ở mức 1550, thí sinh mất tổng cộng hai ba câu; ở 1600 thì không mất câu nào.',
  },
  {
    en: 'Every hard-band item in every domain, not most of them. At this level there is no domain left to be weak in.',
    vi: 'Làm được mọi câu band khó ở mọi lĩnh vực, không phải "phần lớn". Ở mức này không còn lĩnh vực nào được phép yếu.',
  },
  {
    en: 'Accuracy that survives the fourth hour. Most loss above 1500 is concentration, not knowledge.',
    vi: 'Độ chính xác giữ được đến giờ thứ tư. Phần lớn điểm mất ở trên 1500 là do sự tập trung, không phải do kiến thức.',
  },
  {
    en: 'More than one sitting. Above 1550 the remaining margin is inside the variation of a single morning, so a top score is partly a matter of catching a good one.',
    vi: 'Nhiều hơn một lượt thi. Trên 1550, phần chênh còn lại nằm trong dao động của một buổi sáng — nên điểm đỉnh có một phần là chuyện gặp được buổi sáng tốt.',
  },
  {
    en: 'Bluebook, sat in full. This platform’s items are author-estimated; the official practice tests are the only ones calibrated on a live population.',
    vi: 'Làm hết đề trong Bluebook. Câu hỏi của nền tảng này là ước lượng của người soạn; chỉ đề luyện chính thức mới được hiệu chuẩn trên quần thể thi thật.',
  },
];

export const TOP_SCORE_DISCLAIMER = {
  en: 'No preparation programme can promise 1600, and one that does is selling something other than preparation. Fewer than one candidate in a hundred reaches it. What a programme can do is take a learner to the highest band they hold reliably, and put them in the hall twice.',
  vi: 'Không chương trình luyện thi nào hứa được 1600, và chương trình nào hứa thì đang bán một thứ khác chứ không phải việc luyện thi. Chưa tới một phần trăm thí sinh đạt được mức đó. Thứ một chương trình làm được là đưa học viên tới bậc cao nhất mà em ấy giữ được ổn định, và cho em ấy vào phòng thi hai lần.',
};
