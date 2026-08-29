/**
 * The intervention rule catalogue.
 *
 * This is the part of the automated coach that can be argued with. Each rule
 * states a condition, the evidence it read, and the action it takes — so a
 * decision the system made can be inspected, disputed, and corrected, rather
 * than emerging from a model nobody can question.
 *
 * That constraint is not decoration. An automated coach that cannot say why
 * it told a student to do something is not a coach; it is a slot machine that
 * happens to dispense homework. Every rule here therefore carries a `rationale`
 * written for a human reader, and every firing records the values that
 * triggered it.
 *
 * Rules are evaluated in priority order and the first few that fire shape the
 * day. They do not all fire at once: a learner handed six interventions has
 * received none.
 */

import type { SectionId, SkillId } from '../types.ts';
import type { PillarId } from '../gita/framework.ts';
import type { PractitionerLevel } from '../gita/framework.ts';

/* ------------------------------------------------------------------ */
/* What a rule sees                                                    */
/* ------------------------------------------------------------------ */

export interface RuleContext {
  /* ---- Calendar ---- */
  today: string;
  /** Days until the test, or null when no date is set. */
  daysToTest: number | null;
  /** 0 = Sunday. */
  dayOfWeek: number;

  /* ---- Attendance and habit ---- */
  /** Study days in the last 28. */
  activeDays28: number;
  /** Study days in the last 7. */
  activeDays7: number;
  /** Consecutive study days ending today. */
  streak: number;
  /** Mean habit adherence over 28 days, 0–1. */
  habitAdherence: number;
  /** Adherence over the last 7 days, 0–1, for detecting a fresh slide. */
  habitAdherence7: number;
  /** Minutes studied in the last 7 days. */
  minutes7: number;
  /** Minutes per week the learner committed to. */
  minutesTarget7: number;

  /* ---- Performance ---- */
  /** Total responses on record. */
  responseCount: number;
  /** Accuracy over the last 50 responses, or null with too few. */
  recentAccuracy: number | null;
  /** Accuracy over the 50 before those, or null. */
  priorAccuracy: number | null;
  /** Section ability estimates on the theta metric. */
  theta: Record<SectionId, number>;
  /** Most recent scored total, or null. */
  lastTotal: number | null;
  /** Target total. */
  targetTotal: number;
  /** Full-length tests submitted. */
  fullTests: number;
  /** Days since the last full-length test, or null if never. */
  daysSinceFullTest: number | null;

  /* ---- Error profile ---- */
  errors: { concept: number; careless: number; timeout: number; omitted: number };
  /** Skills with the least demonstrated mastery, weakest first. */
  weakSkills: Array<{ skill: SkillId; section: SectionId; mastery: number; attempted: number }>;
  /**
   * Skills whose lesson the learner has read. Carried as a fact rather than a
   * judgement so a rule can tell "drilled this badly forty times" apart from
   * "was never taught this", which call for opposite prescriptions.
   */
  lessonsRead: SkillId[];
  /** Domains with fewer than a healthy number of responses. */
  underCoveredDomains: Array<{ domain: string; section: SectionId; count: number }>;

  /* ---- Review debt ---- */
  /** Review cards due today. */
  dueCards: number;
  /** Cards that have been due for more than three days. */
  overdueCards: number;

  /* ---- GITA ---- */
  tier: 1 | 2 | 3 | 4 | 5;
  limitingPillar: PillarId;
  pillarScores: Record<PillarId, number>;
  gitaConfidence: number;

  /* ---- Assignments ---- */
  assignmentsDue: Array<{ id: string; title: string; dueDate: string; kind: string; minutes: number }>;

  /* ---- Integrity ---- */
  /** Window blurs recorded in the most recent proctored delivery. */
  lastAttemptBlurs: number;
}

/* ------------------------------------------------------------------ */
/* What a rule produces                                                */
/* ------------------------------------------------------------------ */

export type BlockKind =
  | 'diagnostic'
  | 'lesson'
  | 'drill'
  | 'review'
  | 'vocab'
  | 'full-test'
  | 'assignment'
  | 'rest'
  | 'reflect';

export interface BlockRequest {
  kind: BlockKind;
  minutes: number;
  section?: SectionId;
  skills?: SkillId[];
  questionCount?: number;
  assignmentId?: string;
  /** Bias item selection: 'edge' targets the ability threshold. */
  difficulty?: 'easier' | 'edge' | 'harder';
}

export type Severity = 'info' | 'attention' | 'urgent';

export interface Escalation {
  code: string;
  severity: Severity;
  message: string;
  messageVi: string;
  /** The lowest practitioner level equipped to handle this. */
  forLevel: PractitionerLevel;
}

export interface Evidence {
  label: string;
  labelVi: string;
  value: string;
}

export interface RuleOutcome {
  /** Blocks to add to today's programme. */
  blocks?: BlockRequest[];
  /** A note explaining the decision, shown in the decision log. */
  summary: string;
  summaryVi: string;
  action: string;
  actionVi: string;
  evidence: Evidence[];
  escalation?: Escalation;
  /** Overrides the day's load band. */
  load?: LoadBand;
  /** Stops later rules of the same family from also firing. */
  exclusive?: boolean;
}

export type LoadBand = 'recovery' | 'standard' | 'push' | 'taper';

export interface Rule {
  id: string;
  /** Lower runs first. */
  priority: number;
  /** Human-readable statement of what this rule is for. */
  rationale: string;
  rationaleVi: string;
  /** Which pillar this rule serves, for grouping in the log. */
  pillar: PillarId;
  evaluate(context: RuleContext): RuleOutcome | null;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function evidence(label: string, labelVi: string, value: string | number): Evidence {
  return { label, labelVi, value: String(value) };
}

function pctText(value: number): string {
  return `${Math.round(value * 100)}%`;
}

/* ------------------------------------------------------------------ */
/* The catalogue                                                       */
/* ------------------------------------------------------------------ */

export const RULES: Rule[] = [
  /* ================= Safety and escalation (priority 0–9) ================= */

  {
    id: 'r-disengaged',
    priority: 0,
    pillar: 'inspirits',
    rationale:
      'A learner who has stopped entirely does not need a better study plan. Something changed, and no amount of prescribed work will find out what.',
    rationaleVi:
      'Người học đã dừng hẳn thì không cần một kế hoạch tốt hơn. Có điều gì đó đã thay đổi, và không lượng bài tập nào tìm ra được điều đó.',
    evaluate(ctx) {
      // Fourteen days of silence from someone who was previously active.
      if (ctx.activeDays7 > 0 || ctx.activeDays28 > 2 || ctx.responseCount < 20) return null;
      return {
        summary: 'No study activity for at least a week from a learner who was previously active.',
        summaryVi: 'Không có hoạt động học nào ít nhất một tuần, ở một người trước đó vẫn học đều.',
        action: 'Hold the programme. A person should make contact before more work is prescribed.',
        actionVi: 'Tạm dừng chương trình. Cần một người liên hệ trước khi giao thêm bài.',
        evidence: [
          evidence('Study days in the last 7', 'Số ngày học trong 7 ngày qua', ctx.activeDays7),
          evidence('Study days in the last 28', 'Số ngày học trong 28 ngày qua', ctx.activeDays28),
          evidence('Responses on record', 'Số câu đã làm', ctx.responseCount),
        ],
        blocks: [{ kind: 'reflect', minutes: 5 }],
        load: 'recovery',
        escalation: {
          code: 'disengaged',
          severity: 'urgent',
          message:
            'This learner has stopped studying entirely after a period of activity. Make personal contact before the platform prescribes anything further. If withdrawal extends beyond study, refer to a qualified professional.',
          messageVi:
            'Người học đã dừng học hoàn toàn sau một giai đoạn có hoạt động. Hãy liên hệ trực tiếp trước khi nền tảng giao thêm bất cứ việc gì. Nếu sự thu mình vượt ra ngoài phạm vi việc học, hãy chuyển tới chuyên gia phù hợp.',
          forLevel: 'coach',
        },
        exclusive: true,
      };
    },
  },

  {
    id: 'r-declining-under-effort',
    priority: 1,
    pillar: 'inspirits',
    rationale:
      'Working hard and getting worse is the most demoralising pattern there is, and it is almost never fixed by working harder. It signals a method problem or something outside study.',
    rationaleVi:
      'Học chăm mà kết quả đi xuống là mô thức làm nản lòng nhất, và gần như không bao giờ chữa được bằng cách học chăm hơn. Đó là dấu hiệu của vấn đề phương pháp, hoặc của điều gì đó ngoài việc học.',
    evaluate(ctx) {
      if (ctx.recentAccuracy === null || ctx.priorAccuracy === null) return null;
      const decline = ctx.priorAccuracy - ctx.recentAccuracy;
      if (decline < 0.1 || ctx.habitAdherence < 0.6) return null;
      return {
        summary: 'Accuracy is falling despite sustained effort.',
        summaryVi: 'Độ chính xác đang giảm dù vẫn duy trì nỗ lực.',
        action: 'Reduce volume, return to material at the edge rather than above it, and review method with a coach.',
        actionVi: 'Giảm khối lượng, quay lại mức khó vừa ngưỡng thay vì trên ngưỡng, và rà soát phương pháp với coach.',
        evidence: [
          evidence('Recent accuracy', 'Độ chính xác gần đây', pctText(ctx.recentAccuracy)),
          evidence('Earlier accuracy', 'Độ chính xác trước đó', pctText(ctx.priorAccuracy)),
          evidence('Habit adherence', 'Mức duy trì thói quen', pctText(ctx.habitAdherence)),
        ],
        blocks: [
          { kind: 'review', minutes: 20 },
          { kind: 'drill', minutes: 20, difficulty: 'easier', questionCount: 10 },
        ],
        load: 'recovery',
        escalation: {
          code: 'declining-under-effort',
          severity: 'attention',
          message:
            'Accuracy is declining while effort holds. This is a method or wellbeing signal, not a motivation one. Review approach in the next session and ask what has changed outside study.',
          messageVi:
            'Độ chính xác giảm trong khi nỗ lực vẫn giữ. Đây là tín hiệu về phương pháp hoặc tình trạng sức khoẻ tinh thần, không phải về động lực. Hãy rà soát cách làm ở buổi tới và hỏi xem ngoài việc học có gì thay đổi.',
          forLevel: 'coach',
        },
        exclusive: true,
      };
    },
  },

  {
    id: 'r-integrity-anomaly',
    priority: 2,
    pillar: 'action',
    rationale:
      'Repeated departures from the test window during a proctored delivery are worth a human look. The platform records; it does not accuse.',
    rationaleVi:
      'Việc rời khỏi cửa sổ thi nhiều lần trong một buổi có giám sát đáng để một người xem qua. Nền tảng ghi nhận, không kết tội.',
    evaluate(ctx) {
      if (ctx.lastAttemptBlurs < 8) return null;
      return {
        summary: 'The most recent proctored delivery recorded repeated departures from the test window.',
        summaryVi: 'Buổi thi có giám sát gần nhất ghi nhận nhiều lần rời khỏi cửa sổ thi.',
        action: 'Ask about test conditions before drawing any conclusion.',
        actionVi: 'Hỏi về điều kiện làm bài trước khi kết luận bất cứ điều gì.',
        evidence: [evidence('Window departures', 'Số lần rời cửa sổ', ctx.lastAttemptBlurs)],
        escalation: {
          code: 'integrity-anomaly',
          severity: 'info',
          message:
            'Several window departures were recorded during the last proctored test. This is an observation, not a finding — interruptions at home produce the same record as anything else. Ask about conditions.',
          messageVi:
            'Ghi nhận nhiều lần rời cửa sổ trong bài thi có giám sát gần nhất. Đây là quan sát, không phải kết luận — bị ngắt quãng ở nhà cũng tạo ra đúng dấu vết như vậy. Hãy hỏi về điều kiện làm bài.',
          forLevel: 'instructor',
        },
      };
    },
  },

  /* ================= Calendar (priority 10–19) ================= */

  {
    id: 'r-taper',
    priority: 10,
    pillar: 'inspirits',
    rationale:
      'The last days before a test are for arriving rested and confident, not for new material. Nothing learned in the final 72 hours reaches the test; fatigue does.',
    rationaleVi:
      'Những ngày cuối trước kỳ thi là để đến phòng thi trong trạng thái nghỉ ngơi và tự tin, không phải để học cái mới. Không gì học trong 72 giờ cuối kịp vào bài thi; nhưng sự mệt mỏi thì kịp.',
    evaluate(ctx) {
      if (ctx.daysToTest === null || ctx.daysToTest > 3 || ctx.daysToTest < 0) return null;
      return {
        summary: `Test day is ${ctx.daysToTest === 0 ? 'today' : `in ${ctx.daysToTest} day(s)`}.`,
        summaryVi: `Ngày thi ${ctx.daysToTest === 0 ? 'là hôm nay' : `còn ${ctx.daysToTest} ngày`}.`,
        action: 'Taper. Light review of already-flagged material only, and no new content.',
        actionVi: 'Giảm tải. Chỉ ôn nhẹ những gì đã đánh dấu, không học nội dung mới.',
        evidence: [evidence('Days to test', 'Số ngày tới kỳ thi', ctx.daysToTest)],
        blocks:
          ctx.daysToTest === 0
            ? [{ kind: 'rest', minutes: 0 }]
            : [
                { kind: 'review', minutes: 25 },
                { kind: 'reflect', minutes: 5 },
              ],
        load: 'taper',
        exclusive: true,
      };
    },
  },

  {
    id: 'r-post-test-recovery',
    priority: 11,
    pillar: 'action',
    rationale:
      'A full-length test costs more than its two and a half hours. Prescribing a heavy day immediately afterwards is how a learner comes to dread rehearsals.',
    rationaleVi:
      'Một bài thi full-length tốn nhiều hơn hai tiếng rưỡi của nó. Giao một ngày nặng ngay sau đó là cách khiến người học sợ các buổi diễn tập.',
    evaluate(ctx) {
      if (ctx.daysSinceFullTest === null || ctx.daysSinceFullTest > 0) return null;
      return {
        summary: 'A full-length test was completed today.',
        summaryVi: 'Vừa hoàn thành một bài thi full-length hôm nay.',
        action: 'Review the score report and the mistakes it surfaced. Nothing else today.',
        actionVi: 'Xem báo cáo điểm và những câu sai nó chỉ ra. Hôm nay không làm gì thêm.',
        evidence: [evidence('Full-length tests completed', 'Số bài full-length đã làm', ctx.fullTests)],
        blocks: [{ kind: 'review', minutes: 25 }],
        load: 'recovery',
        exclusive: true,
      };
    },
  },

  {
    id: 'r-schedule-rehearsal',
    priority: 12,
    pillar: 'goal',
    rationale:
      'Stamina and nerve are trained separately from knowledge and only under real conditions. A learner who has never sat the full length discovers that on test day.',
    rationaleVi:
      'Sức bền và bản lĩnh được rèn tách khỏi kiến thức và chỉ rèn được trong điều kiện thật. Người chưa từng ngồi trọn thời lượng sẽ phát hiện điều đó đúng ngày thi.',
    evaluate(ctx) {
      // Weekends only, and only once a fortnight.
      const isWeekend = ctx.dayOfWeek === 0 || ctx.dayOfWeek === 6;
      if (!isWeekend) return null;
      if (ctx.tier < 3) return null;
      if (ctx.daysToTest !== null && ctx.daysToTest <= 4) return null;
      const overdue = ctx.daysSinceFullTest === null ? ctx.responseCount >= 60 : ctx.daysSinceFullTest >= 14;
      if (!overdue) return null;

      return {
        summary:
          ctx.daysSinceFullTest === null
            ? 'Enough practice is on record to make a first full-length rehearsal meaningful.'
            : `${ctx.daysSinceFullTest} days since the last full-length rehearsal.`,
        summaryVi:
          ctx.daysSinceFullTest === null
            ? 'Đã có đủ dữ liệu luyện tập để một buổi diễn tập full-length đầu tiên có ý nghĩa.'
            : `Đã ${ctx.daysSinceFullTest} ngày kể từ buổi diễn tập full-length gần nhất.`,
        action: 'Sit a full-length test today, under test-day conditions.',
        actionVi: 'Làm một bài full-length hôm nay, trong điều kiện như ngày thi.',
        evidence: [
          evidence('Days since last rehearsal', 'Số ngày từ buổi diễn tập gần nhất', ctx.daysSinceFullTest ?? '—'),
          evidence('Responses on record', 'Số câu đã làm', ctx.responseCount),
        ],
        blocks: [{ kind: 'full-test', minutes: 145 }],
        load: 'push',
        exclusive: true,
      };
    },
  },

  {
    id: 'r-weekly-rest',
    priority: 13,
    pillar: 'action',
    rationale:
      'A rest day protects retention and keeps the plan followable. A programme with no scheduled rest gets rested from anyway, just without permission and with guilt attached.',
    rationaleVi:
      'Một ngày nghỉ bảo vệ khả năng ghi nhớ và giữ cho kế hoạch theo được. Chương trình không có ngày nghỉ thì vẫn bị nghỉ, chỉ là nghỉ không phép và kèm cảm giác có lỗi.',
    evaluate(ctx) {
      if (ctx.dayOfWeek !== 0) return null;
      if (ctx.daysToTest !== null && ctx.daysToTest <= 7) return null;
      if (ctx.activeDays7 < 3) return null; // nothing to rest from
      return {
        summary: 'Scheduled rest day, after a week with study on most days.',
        summaryVi: 'Ngày nghỉ theo lịch, sau một tuần đã học phần lớn các ngày.',
        action: 'Rest. Optionally clear due review cards if you want to keep the streak.',
        actionVi: 'Nghỉ. Nếu muốn giữ chuỗi ngày thì có thể ôn nốt thẻ đến hạn.',
        evidence: [evidence('Study days this week', 'Số ngày học trong tuần', ctx.activeDays7)],
        blocks: ctx.dueCards > 0 ? [{ kind: 'review', minutes: 10 }] : [{ kind: 'rest', minutes: 0 }],
        load: 'recovery',
        exclusive: true,
      };
    },
  },

  /* ================= Onboarding the measurement (priority 20–29) ================= */

  {
    id: 'r-need-baseline',
    priority: 20,
    pillar: 'goal',
    rationale:
      'Without a baseline, every recommendation the system makes is a guess dressed as a plan. The diagnostic is what turns opinion into data.',
    rationaleVi:
      'Không có điểm nền thì mọi khuyến nghị hệ thống đưa ra chỉ là phỏng đoán khoác áo kế hoạch. Bài chẩn đoán là thứ biến cảm tính thành dữ liệu.',
    evaluate(ctx) {
      if (ctx.fullTests > 0 || ctx.responseCount > 40) return null;
      return {
        summary: 'No baseline on record.',
        summaryVi: 'Chưa có điểm nền.',
        action: 'Take the short diagnostic. Everything after this is aimed by it.',
        actionVi: 'Làm bài chẩn đoán rút gọn. Mọi việc sau đó đều được nhắm dựa trên nó.',
        evidence: [
          evidence('Full-length tests', 'Số bài thi thử', ctx.fullTests),
          evidence('Responses on record', 'Số câu đã làm', ctx.responseCount),
        ],
        blocks: [{ kind: 'diagnostic', minutes: 34 }],
        load: 'standard',
        exclusive: true,
      };
    },
  },

  {
    id: 'r-tier-one-contact',
    priority: 21,
    pillar: 'action',
    rationale:
      'At tier 1 the only job is that the learner sits down. A student handed a study-technique lecture at this stage hears that this is complicated, and complicated things get postponed.',
    rationaleVi:
      'Ở tầng 1, việc duy nhất cần làm là người học ngồi vào bàn. Học sinh nhận một bài giảng về kỹ thuật học ở giai đoạn này sẽ hiểu rằng việc này phức tạp, mà việc phức tạp thì bị hoãn.',
    evaluate(ctx) {
      if (ctx.tier !== 1) return null;
      return {
        summary: 'Tier 1: attendance is the only thing being installed.',
        summaryVi: 'Tầng 1: điều duy nhất đang được xây là thói quen có mặt.',
        action: 'One short session, at the same time and place. Log it either way.',
        actionVi: 'Một buổi ngắn, đúng giờ và đúng chỗ. Xong hay không cũng ghi lại.',
        evidence: [
          evidence('Absorption tier', 'Tầng hấp thu', ctx.tier),
          evidence('Study days in the last 28', 'Số ngày học trong 28 ngày', ctx.activeDays28),
        ],
        blocks: [{ kind: 'drill', minutes: 15, difficulty: 'edge', questionCount: 8 }],
        load: 'standard',
        exclusive: true,
      };
    },
  },

  /* ================= Review debt (priority 30–39) ================= */

  {
    id: 'r-review-debt',
    priority: 30,
    pillar: 'action',
    rationale:
      'Review cards that go unanswered are the material the learner has already proved they do not know. Adding new content on top of that debt is how a plateau begins.',
    rationaleVi:
      'Thẻ ôn tập bị bỏ quên chính là phần kiến thức người học đã chứng minh là chưa nắm. Chồng nội dung mới lên khoản nợ đó là cách một giai đoạn chững lại bắt đầu.',
    evaluate(ctx) {
      if (ctx.overdueCards < 15) return null;
      return {
        summary: `${ctx.overdueCards} review cards are more than three days overdue.`,
        summaryVi: `${ctx.overdueCards} thẻ ôn tập đã quá hạn hơn ba ngày.`,
        action: 'Clear the review backlog before new material is added.',
        actionVi: 'Trả hết nợ ôn tập trước khi thêm nội dung mới.',
        evidence: [
          evidence('Overdue cards', 'Thẻ quá hạn', ctx.overdueCards),
          evidence('Cards due today', 'Thẻ đến hạn hôm nay', ctx.dueCards),
        ],
        blocks: [{ kind: 'review', minutes: 25 }],
        load: 'standard',
      };
    },
  },

  {
    id: 'r-review-daily',
    priority: 31,
    pillar: 'action',
    rationale:
      'Spaced review is the cheapest score available. Ten minutes on cards that are due beats thirty on new questions, and it is the habit most learners drop first.',
    rationaleVi:
      'Ôn tập giãn cách là số điểm rẻ nhất có thể lấy. Mười phút cho thẻ đến hạn hơn ba mươi phút cho câu mới, và đây là thói quen phần lớn người học bỏ đầu tiên.',
    evaluate(ctx) {
      if (ctx.dueCards === 0) return null;
      const minutes = Math.min(25, Math.max(8, Math.round(ctx.dueCards * 0.75)));
      return {
        summary: `${ctx.dueCards} review cards are due.`,
        summaryVi: `${ctx.dueCards} thẻ ôn tập đến hạn.`,
        action: 'Clear them before anything new.',
        actionVi: 'Ôn hết trước khi làm gì mới.',
        evidence: [evidence('Cards due today', 'Thẻ đến hạn hôm nay', ctx.dueCards)],
        blocks: [{ kind: 'review', minutes }],
      };
    },
  },

  /* ================= Assignments (priority 40–49) ================= */

  {
    id: 'r-assignment-due',
    priority: 40,
    pillar: 'goal',
    rationale:
      'Work a teacher set has a deadline the platform did not choose. It goes ahead of the platform’s own recommendations, not behind them.',
    rationaleVi:
      'Bài giáo viên giao có hạn nộp mà nền tảng không tự đặt ra. Nó đứng trước khuyến nghị của nền tảng, không phải sau.',
    evaluate(ctx) {
      const soon = ctx.assignmentsDue.filter((a) => a.dueDate <= addDaysIso(ctx.today, 2));
      if (soon.length === 0) return null;
      const next = soon[0];
      return {
        summary: `Assignment "${next.title}" is due ${next.dueDate === ctx.today ? 'today' : `on ${next.dueDate}`}.`,
        summaryVi: `Bài giao "${next.title}" đến hạn ${next.dueDate === ctx.today ? 'hôm nay' : `ngày ${next.dueDate}`}.`,
        action: 'Complete the assignment first.',
        actionVi: 'Hoàn thành bài giao trước.',
        evidence: [
          evidence('Assignments due within 2 days', 'Bài giao đến hạn trong 2 ngày', soon.length),
          evidence('Nearest due date', 'Hạn gần nhất', next.dueDate),
        ],
        blocks: soon.slice(0, 2).map((a) => ({
          kind: 'assignment' as const,
          minutes: a.minutes,
          assignmentId: a.id,
        })),
      };
    },
  },

  /* ================= Error-driven prescription (priority 50–59) ================= */

  {
    id: 'r-careless-dominant',
    priority: 50,
    pillar: 'talent',
    rationale:
      'Careless errors are points lost on material already known, and they respond to a process change rather than to more content. Drilling harder questions makes them worse.',
    rationaleVi:
      'Lỗi bất cẩn là điểm mất trên phần kiến thức đã biết, và nó chữa được bằng thay đổi quy trình chứ không phải bằng học thêm. Luyện câu khó hơn chỉ làm nó nặng thêm.',
    evaluate(ctx) {
      const total = ctx.errors.concept + ctx.errors.careless + ctx.errors.timeout + ctx.errors.omitted;
      if (total < 12) return null;
      if (ctx.errors.careless / total < 0.3) return null;
      return {
        summary: 'Careless errors are the largest share of what is being lost.',
        summaryVi: 'Lỗi bất cẩn đang chiếm phần lớn số điểm bị mất.',
        action:
          'Drill at a comfortable difficulty with the answer eliminator, re-reading the prompt before every selection.',
        actionVi:
          'Luyện ở mức khó dễ chịu, dùng công cụ loại phương án, và đọc lại đề trước mỗi lần chọn.',
        evidence: [
          evidence('Careless errors', 'Lỗi bất cẩn', ctx.errors.careless),
          evidence('Share of all errors', 'Tỉ lệ trên tổng lỗi', pctText(ctx.errors.careless / total)),
        ],
        blocks: [{ kind: 'drill', minutes: 25, difficulty: 'easier', questionCount: 14 }],
      };
    },
  },

  {
    id: 'r-pacing-dominant',
    priority: 51,
    pillar: 'talent',
    rationale:
      'Running out of time is a strategy problem, not a knowledge one. A learner who answers slowly and correctly needs practice at moving on, not more material.',
    rationaleVi:
      'Hết giờ là vấn đề chiến lược, không phải kiến thức. Người làm chậm mà đúng cần luyện việc bỏ qua và đi tiếp, không cần thêm nội dung.',
    evaluate(ctx) {
      const total = ctx.errors.concept + ctx.errors.careless + ctx.errors.timeout + ctx.errors.omitted;
      if (total < 12) return null;
      const rushed = (ctx.errors.timeout + ctx.errors.omitted) / total;
      if (rushed < 0.3) return null;
      return {
        summary: 'Rushed and omitted answers are the largest share of what is being lost.',
        summaryVi: 'Câu làm vội và câu bỏ trống đang chiếm phần lớn số điểm bị mất.',
        action: 'Practise timed, and practise abandoning an item early rather than fighting it.',
        actionVi: 'Luyện có bấm giờ, và luyện việc bỏ qua sớm một câu thay vì cố đấu với nó.',
        evidence: [
          evidence('Rushed answers', 'Câu làm vội', ctx.errors.timeout),
          evidence('Omitted answers', 'Câu bỏ trống', ctx.errors.omitted),
          evidence('Share of all errors', 'Tỉ lệ trên tổng lỗi', pctText(rushed)),
        ],
        blocks: [{ kind: 'drill', minutes: 25, difficulty: 'edge', questionCount: 18 }],
      };
    },
  },

  {
    id: 'r-untaught-weak-skill',
    priority: 51.5,
    pillar: 'talent',
    rationale:
      'A skill the learner has never been taught should not be drilled harder. Repetition without instruction rehearses the misconception; the lesson is cheap and comes first.',
    rationaleVi:
      'Kỹ năng chưa từng được dạy thì không nên luyện thêm cho nặng. Lặp lại mà không có hướng dẫn chỉ củng cố cách hiểu sai; đọc bài giảng tốn ít thời gian và phải đi trước.',
    evaluate(ctx) {
      const untaught = ctx.weakSkills.filter((s) => !ctx.lessonsRead.includes(s.skill));
      if (untaught.length === 0) return null;
      const target = untaught[0];
      return {
        summary: `${target.skill} is the weakest skill with enough evidence, and its lesson has never been read.`,
        summaryVi: `${target.skill} là kỹ năng yếu nhất có đủ bằng chứng, và bài giảng của nó chưa từng được đọc.`,
        action: 'Read the lesson, then drill the same skill.',
        actionVi: 'Đọc bài giảng, rồi luyện đúng kỹ năng đó.',
        evidence: [
          evidence(
            `Mastery: ${target.skill}`,
            `Mức thành thạo: ${target.skill}`,
            pctText(target.mastery),
          ),
          evidence('Questions attempted', 'Số câu đã làm', target.attempted),
          evidence('Lesson read', 'Đã đọc bài giảng', 'no / chưa'),
        ],
        blocks: [
          { kind: 'lesson', minutes: 8, section: target.section, skills: [target.skill] },
          {
            kind: 'drill',
            minutes: 15,
            section: target.section,
            skills: [target.skill],
            difficulty: 'edge',
            questionCount: 8,
          },
        ],
      };
    },
  },

  {
    id: 'r-weak-skill-drill',
    priority: 52,
    pillar: 'talent',
    rationale:
      'The default productive move: work the skills the evidence names as weakest, at the difficulty where roughly seven in ten come back correct.',
    rationaleVi:
      'Việc mặc định có hiệu quả nhất: luyện đúng những kỹ năng dữ liệu chỉ ra là yếu nhất, ở mức khó mà khoảng bảy trên mười câu làm đúng.',
    evaluate(ctx) {
      if (ctx.weakSkills.length === 0) return null;
      const targets = ctx.weakSkills.slice(0, 3);
      return {
        summary: `Weakest skills with enough evidence: ${targets.map((s) => s.skill).join(', ')}.`,
        summaryVi: `Kỹ năng yếu nhất có đủ bằng chứng: ${targets.map((s) => s.skill).join(', ')}.`,
        action: 'Drill these at the ability threshold.',
        actionVi: 'Luyện những kỹ năng này ngay ở ngưỡng năng lực.',
        evidence: targets.map((s) =>
          evidence(`Mastery: ${s.skill}`, `Mức thành thạo: ${s.skill}`, pctText(s.mastery)),
        ),
        blocks: [
          {
            kind: 'drill',
            minutes: 25,
            skills: targets.map((s) => s.skill),
            difficulty: 'edge',
            questionCount: 12,
          },
        ],
      };
    },
  },

  {
    id: 'r-coverage-gap',
    priority: 53,
    pillar: 'goal',
    rationale:
      'A domain with almost no responses is not a strength or a weakness — it is an unknown, and an unknown on test day is a risk the platform can retire cheaply.',
    rationaleVi:
      'Một lĩnh vực gần như chưa có câu trả lời nào thì không phải điểm mạnh cũng chẳng phải điểm yếu — nó là ẩn số, và một ẩn số trong ngày thi là rủi ro mà nền tảng có thể loại bỏ với chi phí rất thấp.',
    evaluate(ctx) {
      if (ctx.underCoveredDomains.length === 0 || ctx.responseCount < 40) return null;
      const gap = ctx.underCoveredDomains[0];
      return {
        summary: `Domain "${gap.domain}" has only ${gap.count} responses on record.`,
        summaryVi: `Lĩnh vực "${gap.domain}" mới chỉ có ${gap.count} câu trả lời.`,
        action: 'Sample this domain so it stops being an unknown.',
        actionVi: 'Lấy mẫu lĩnh vực này để nó thôi là ẩn số.',
        evidence: ctx.underCoveredDomains
          .slice(0, 3)
          .map((d) => evidence(`Responses: ${d.domain}`, `Số câu: ${d.domain}`, d.count)),
        blocks: [{ kind: 'drill', minutes: 15, section: gap.section, difficulty: 'edge', questionCount: 8 }],
      };
    },
  },

  /* ================= Habit and load (priority 60–69) ================= */

  {
    id: 'r-adherence-slide',
    priority: 60,
    pillar: 'action',
    rationale:
      'A habit sliding is easier to catch than to rebuild. Cutting the load early keeps the habit alive; holding the load loses both the habit and the volume.',
    rationaleVi:
      'Thói quen đang tuột thì bắt lại dễ hơn là dựng lại. Giảm tải sớm giữ được thói quen; giữ nguyên tải thì mất cả thói quen lẫn khối lượng.',
    evaluate(ctx) {
      // Fires only on a fresh slide: the 28-day figure still looks healthy
      // while the last week has fallen away. A learner who was never adherent
      // is not sliding, and belongs to the tier-1 rule instead.
      if (ctx.habitAdherence7 >= 0.5 || ctx.habitAdherence < 0.5) return null;
      return {
        summary: 'Habit adherence has dropped sharply in the last week.',
        summaryVi: 'Mức duy trì thói quen tụt mạnh trong tuần qua.',
        action: 'Cut today’s load and protect the habit rather than the volume.',
        actionVi: 'Giảm tải hôm nay, ưu tiên giữ thói quen thay vì giữ khối lượng.',
        evidence: [
          evidence('Adherence, last 7 days', 'Mức duy trì 7 ngày qua', pctText(ctx.habitAdherence7)),
          evidence('Adherence, last 28 days', 'Mức duy trì 28 ngày qua', pctText(ctx.habitAdherence)),
        ],
        load: 'recovery',
      };
    },
  },

  {
    id: 'r-behind-volume',
    priority: 61,
    pillar: 'goal',
    rationale:
      'A weekly commitment absorbs a bad day; it does not absorb a bad week. Naming the shortfall while there are still days left is what makes it recoverable.',
    rationaleVi:
      'Cam kết theo tuần hấp thụ được một ngày tệ; nó không hấp thụ nổi một tuần tệ. Gọi tên phần thiếu khi còn ngày để bù chính là điều làm nó cứu được.',
    evaluate(ctx) {
      if (ctx.minutesTarget7 <= 0 || ctx.dayOfWeek < 4) return null;
      const ratio = ctx.minutes7 / ctx.minutesTarget7;
      if (ratio >= 0.7) return null;
      const shortfall = Math.round(ctx.minutesTarget7 - ctx.minutes7);
      return {
        summary: `Behind the weekly commitment by about ${shortfall} minutes with the week nearly over.`,
        summaryVi: `Còn thiếu khoảng ${shortfall} phút so với cam kết tuần, trong khi tuần sắp hết.`,
        action: 'Add a block today rather than writing the week off.',
        actionVi: 'Thêm một khối học hôm nay thay vì bỏ luôn cả tuần.',
        evidence: [
          evidence('Minutes this week', 'Số phút trong tuần', Math.round(ctx.minutes7)),
          evidence('Weekly commitment', 'Cam kết mỗi tuần', Math.round(ctx.minutesTarget7)),
        ],
        blocks: [{ kind: 'drill', minutes: 20, difficulty: 'edge', questionCount: 10 }],
        load: 'push',
      };
    },
  },

  {
    id: 'r-target-out-of-reach',
    priority: 62,
    pillar: 'goal',
    rationale:
      'A target that the remaining time cannot support is not motivating, it is corrosive. Saying so early leaves room to change the target, the hours, or the date.',
    rationaleVi:
      'Một mục tiêu mà quỹ thời gian còn lại không gánh nổi thì không tạo động lực, nó bào mòn. Nói ra sớm còn chỗ để đổi mục tiêu, đổi số giờ, hoặc đổi ngày thi.',
    evaluate(ctx) {
      if (ctx.daysToTest === null || ctx.lastTotal === null) return null;
      if (ctx.daysToTest < 14 || ctx.daysToTest > 120) return null;
      const gap = ctx.targetTotal - ctx.lastTotal;
      const weeks = ctx.daysToTest / 7;
      // Roughly 5.5 points per committed hour, compressed at higher scores.
      const compression = ctx.lastTotal >= 1400 ? 0.35 : ctx.lastTotal >= 1300 ? 0.55 : ctx.lastTotal >= 1150 ? 0.8 : 1;
      const reachable = (ctx.minutesTarget7 / 60) * weeks * 5.5 * compression;
      if (gap <= reachable) return null;

      return {
        summary: `The target is about ${Math.round(gap - reachable)} points beyond what the remaining hours support.`,
        summaryVi: `Mục tiêu đang vượt khoảng ${Math.round(gap - reachable)} điểm so với những gì quỹ giờ còn lại gánh được.`,
        action: 'Revisit the target, the weekly hours, or the test date with a coach. Do not simply try harder.',
        actionVi: 'Xem lại mục tiêu, số giờ mỗi tuần, hoặc ngày thi cùng coach. Đừng chỉ đơn giản là cố hơn.',
        evidence: [
          evidence('Gap to target', 'Khoảng cách tới mục tiêu', gap),
          evidence('Reachable in remaining time', 'Có thể đạt trong thời gian còn lại', Math.round(reachable)),
          evidence('Weekly hours committed', 'Số giờ cam kết mỗi tuần', Math.round(ctx.minutesTarget7 / 60)),
        ],
        escalation: {
          code: 'target-unreachable',
          severity: 'attention',
          message:
            'The stated target exceeds what the remaining time and committed hours can support. Raise it with the learner before the gap becomes a failure they blame themselves for.',
          messageVi:
            'Mục tiêu đã đặt vượt quá những gì thời gian còn lại và số giờ cam kết có thể gánh. Hãy nêu với người học trước khi khoảng cách đó trở thành một thất bại mà họ tự trách mình.',
          forLevel: 'instructor',
        },
      };
    },
  },

  /* ================= GITA (priority 70–79) ================= */

  {
    id: 'r-inspirits-limiting',
    priority: 70,
    pillar: 'inspirits',
    rationale:
      'When fuel is the constraint, more method is experienced as more weight. The productive move is meaning, not volume.',
    rationaleVi:
      'Khi nội lực là điểm nghẽn, thêm phương pháp bị cảm nhận như thêm gánh nặng. Việc nên làm là làm rõ ý nghĩa, không phải tăng khối lượng.',
    evaluate(ctx) {
      if (ctx.limitingPillar !== 'inspirits') return null;
      if (ctx.gitaConfidence < 0.3) return null;
      return {
        summary: 'Inspirits is the limiting pillar with enough evidence to act on.',
        summaryVi: 'Nội lực là trụ giới hạn, và đã đủ bằng chứng để hành động.',
        action: 'Spend five minutes writing why this matters before studying. Keep the session short.',
        actionVi: 'Dành năm phút viết ra vì sao điều này quan trọng, trước khi học. Giữ buổi học ngắn.',
        evidence: [
          evidence('Inspirits score', 'Điểm Nội lực', ctx.pillarScores.inspirits),
          evidence('Profile confidence', 'Độ tin cậy hồ sơ', pctText(ctx.gitaConfidence)),
        ],
        blocks: [{ kind: 'reflect', minutes: 5 }],
      };
    },
  },

  {
    id: 'r-vocab-maintenance',
    priority: 71,
    pillar: 'talent',
    rationale:
      'Vocabulary is the cheapest compounding asset in Reading and Writing, and it is the one thing that works in the small gaps a day leaves.',
    rationaleVi:
      'Từ vựng là tài sản tích luỹ rẻ nhất trong phần Đọc–Viết, và là thứ duy nhất làm được trong những khoảng trống nhỏ của một ngày.',
    evaluate(ctx) {
      if (ctx.tier < 2) return null;
      if (ctx.daysToTest !== null && ctx.daysToTest <= 3) return null;
      return {
        summary: 'Vocabulary maintenance.',
        summaryVi: 'Duy trì từ vựng.',
        action: 'Ten minutes on the deck.',
        actionVi: 'Mười phút với bộ thẻ từ.',
        evidence: [evidence('Absorption tier', 'Tầng hấp thu', ctx.tier)],
        blocks: [{ kind: 'vocab', minutes: 10 }],
      };
    },
  },
];

/* ------------------------------------------------------------------ */
/* Small helpers used by rules                                         */
/* ------------------------------------------------------------------ */

/** Local calendar arithmetic, so a rule never crosses a UTC day boundary. */
function addDaysIso(iso: string, days: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const yy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

export const RULE_BY_ID = new Map<string, Rule>(RULES.map((r) => [r.id, r]));
