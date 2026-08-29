/**
 * The habit library.
 *
 * A model that lives only in a workshop changes nothing. What changes an
 * outcome is a small number of behaviours that run reliably — so every habit
 * here carries a leverage rating under the 20/80 rule, and the platform is
 * deliberately reluctant to hand a learner more than a few at once.
 *
 * The leverage rating is not decoration. `selectHabitsFor` uses it to keep a
 * learner's active set small and weighted toward what actually moves a score,
 * because a person running eleven habits is running none of them.
 */

import { isoDate } from '../lib/util.ts';
import type { PillarId } from './framework.ts';

export type Cadence = 'daily' | 'weekday' | 'weekly' | 'monthly';

/** Where the habit is practised. */
export type Arena = 'study' | 'family' | 'school' | 'society';

export interface Habit {
  id: string;
  pillar: PillarId;
  arena: Arena;
  cadence: Cadence;
  label: string;
  labelVi: string;
  /** The behaviour, stated so specifically it can be answered yes or no. */
  action: string;
  actionVi: string;
  /** The existing event this habit is anchored to. */
  cue: string;
  cueVi: string;
  /**
   * Leverage on a 1–5 scale under the 20/80 rule. A 5 is one of the few
   * behaviours carrying most of the result; a 1 is worth doing only once the
   * fives are running.
   */
  leverage: 1 | 2 | 3 | 4 | 5;
  /** Minutes per occurrence. */
  minutes: number;
  /** Why this works, in one line a student will accept. */
  rationale: string;
  rationaleVi: string;
}

export const HABITS: Habit[] = [
  /* ---------------- Study arena ---------------- */
  {
    id: 'h-fixed-slot',
    pillar: 'action',
    arena: 'study',
    cadence: 'weekday',
    label: 'Same time, same place',
    labelVi: 'Đúng giờ, đúng chỗ',
    action: 'Sit down to study at the same time and desk every weekday.',
    actionVi: 'Ngồi vào học đúng khung giờ và đúng bàn mỗi ngày trong tuần.',
    cue: 'Immediately after a fixed daily event — a meal, arriving home.',
    cueVi: 'Ngay sau một mốc cố định trong ngày — bữa ăn, lúc về đến nhà.',
    leverage: 5,
    minutes: 30,
    rationale: 'Removing the daily decision to start removes the most common point of failure.',
    rationaleVi: 'Bỏ đi quyết định "hôm nay có học không" là bỏ đi điểm gãy phổ biến nhất.',
  },
  {
    id: 'h-log-session',
    pillar: 'goal',
    arena: 'study',
    cadence: 'weekday',
    label: 'Log every session',
    labelVi: 'Ghi lại mỗi buổi học',
    action: 'Record the session — including a short or bad one — before closing the app.',
    actionVi: 'Ghi nhận buổi học — kể cả buổi ngắn hoặc buổi tệ — trước khi đóng ứng dụng.',
    cue: 'The moment you stop studying.',
    cueVi: 'Ngay khi bạn dừng học.',
    leverage: 3,
    minutes: 1,
    rationale: 'An unlogged week is indistinguishable from a week that never happened.',
    rationaleVi: 'Một tuần không ghi lại thì không khác gì một tuần chưa từng diễn ra.',
  },
  {
    id: 'h-same-day-review',
    pillar: 'action',
    arena: 'study',
    cadence: 'weekday',
    label: 'Same-day error review',
    labelVi: 'Ôn lỗi ngay trong ngày',
    action: 'Before finishing, understand every question you got wrong today.',
    actionVi: 'Trước khi kết thúc, hiểu cho được mọi câu hôm nay làm sai.',
    cue: 'The end of every practice session.',
    cueVi: 'Cuối mỗi buổi luyện tập.',
    leverage: 5,
    minutes: 10,
    rationale: 'An error you did not understand today is an error you will repeat on test day.',
    rationaleVi: 'Lỗi hôm nay không hiểu là lỗi sẽ lặp lại đúng ngày thi.',
  },
  {
    id: 'h-weekly-volume',
    pillar: 'goal',
    arena: 'study',
    cadence: 'weekly',
    label: 'Hold the weekly volume',
    labelVi: 'Giữ đủ khối lượng tuần',
    action: 'Hit the planned number of study hours for the week, moving days if needed.',
    actionVi: 'Đạt đủ số giờ học đã định trong tuần, có thể dời ngày nhưng không giảm tổng.',
    cue: 'Sunday evening review of the week.',
    cueVi: 'Tối chủ nhật, nhìn lại tuần.',
    leverage: 4,
    minutes: 10,
    rationale: 'Committing to a weekly total survives a disrupted day; a daily streak does not.',
    rationaleVi: 'Cam kết theo tổng tuần sống sót qua một ngày hỏng; chuỗi ngày liên tục thì không.',
  },
  {
    id: 'h-weekly-review',
    pillar: 'talent',
    arena: 'study',
    cadence: 'weekly',
    label: 'Read the skill map first',
    labelVi: 'Đọc bản đồ kỹ năng trước',
    action: 'Open the analytics before choosing what to practise this week.',
    actionVi: 'Mở phần phân tích trước khi chọn tuần này luyện gì.',
    cue: 'The start of each study week.',
    cueVi: 'Đầu mỗi tuần học.',
    leverage: 5,
    minutes: 15,
    rationale: 'Practising what feels weak and practising what is weak are rarely the same thing.',
    rationaleVi: 'Luyện cái mình thấy yếu và luyện cái thật sự yếu hiếm khi trùng nhau.',
  },
  {
    id: 'h-edge-practice',
    pillar: 'talent',
    arena: 'study',
    cadence: 'weekday',
    label: 'Practise at the edge',
    labelVi: 'Luyện ở ngưỡng khó',
    action: 'Choose the difficulty where you are getting roughly seven in ten right.',
    actionVi: 'Chọn mức khó mà bạn đúng khoảng bảy trên mười câu.',
    cue: 'When selecting a practice set.',
    cueVi: 'Khi chọn bộ câu để luyện.',
    leverage: 5,
    minutes: 25,
    rationale: 'Comfortable practice maintains ability. Only uncomfortable practice builds it.',
    rationaleVi: 'Luyện dễ chịu chỉ giữ nguyên năng lực. Chỉ luyện khó chịu mới nâng nó lên.',
  },
  {
    id: 'h-error-triage',
    pillar: 'talent',
    arena: 'study',
    cadence: 'weekly',
    label: 'Triage your errors',
    labelVi: 'Phân loại lỗi sai',
    action: 'Sort the week’s mistakes into careless, concept, and pacing, then treat each differently.',
    actionVi: 'Xếp lỗi trong tuần thành bất cẩn, hổng kiến thức, và nhịp độ — rồi xử lý khác nhau.',
    cue: 'The weekly review session.',
    cueVi: 'Buổi nhìn lại hằng tuần.',
    leverage: 4,
    minutes: 15,
    rationale: 'A careless error and a knowledge gap need opposite remedies; one label hides both.',
    rationaleVi: 'Lỗi bất cẩn và lỗ hổng kiến thức cần cách chữa trái ngược; gộp một nhãn là giấu cả hai.',
  },
  {
    id: 'h-full-rehearsal',
    pillar: 'inspirits',
    arena: 'study',
    cadence: 'monthly',
    label: 'Rehearse under real conditions',
    labelVi: 'Diễn tập trong điều kiện thật',
    action: 'Sit a full-length test at test-day hour, with no pauses and no phone.',
    actionVi: 'Làm trọn một bài full-length vào đúng khung giờ thi, không tạm dừng, không điện thoại.',
    cue: 'A scheduled weekend morning, once a fortnight.',
    cueVi: 'Sáng cuối tuần đã hẹn trước, hai tuần một lần.',
    leverage: 5,
    minutes: 145,
    rationale: 'Stamina and nerve are trained separately from knowledge, and only under real conditions.',
    rationaleVi: 'Sức bền và bản lĩnh được rèn tách khỏi kiến thức, và chỉ rèn được trong điều kiện thật.',
  },
  {
    id: 'h-self-plan',
    pillar: 'goal',
    arena: 'study',
    cadence: 'weekly',
    label: 'Write your own week',
    labelVi: 'Tự viết kế hoạch tuần',
    action: 'Plan the coming week yourself from your own data, then defend it to your coach.',
    actionVi: 'Tự lập kế hoạch tuần tới từ dữ liệu của mình, rồi bảo vệ nó trước coach.',
    cue: 'Before the weekly session with a coach.',
    cueVi: 'Trước buổi làm việc hằng tuần với coach.',
    leverage: 4,
    minutes: 20,
    rationale: 'A plan you wrote is one you will follow; a plan handed to you is one you will negotiate.',
    rationaleVi: 'Kế hoạch bạn tự viết là kế hoạch bạn sẽ theo; kế hoạch được đưa là kế hoạch bạn sẽ mặc cả.',
  },

  /* ---------------- Family arena ---------------- */
  {
    id: 'h-family-table',
    pillar: 'inspirits',
    arena: 'family',
    cadence: 'daily',
    label: 'One honest sentence at the table',
    labelVi: 'Một câu thật ở bàn ăn',
    action: 'Tell the family one specific thing that went well and one that did not today.',
    actionVi: 'Nói với gia đình một điều cụ thể hôm nay làm tốt và một điều chưa tốt.',
    cue: 'The evening meal.',
    cueVi: 'Bữa cơm tối.',
    leverage: 4,
    minutes: 3,
    rationale: 'A student who can name a bad day out loud stops hiding bad weeks.',
    rationaleVi: 'Học sinh dám nói ra một ngày tệ sẽ thôi giấu đi cả một tuần tệ.',
  },
  {
    id: 'h-family-quiet-hour',
    pillar: 'action',
    arena: 'family',
    cadence: 'weekday',
    label: 'A household quiet hour',
    labelVi: 'Giờ yên tĩnh của cả nhà',
    action: 'The whole household works quietly in the same hour — no screens for anyone.',
    actionVi: 'Cả nhà cùng làm việc yên lặng trong một giờ — không ai dùng màn hình giải trí.',
    cue: 'A fixed evening hour agreed by the family.',
    cueVi: 'Một khung giờ tối cố định cả nhà đã thống nhất.',
    leverage: 5,
    minutes: 60,
    rationale: 'A child studying alone while the house relaxes is fighting the room, not the material.',
    rationaleVi: 'Con học một mình trong khi cả nhà thư giãn là đang chống lại căn phòng, không phải bài vở.',
  },
  {
    id: 'h-family-weekly-review',
    pillar: 'goal',
    arena: 'family',
    cadence: 'weekly',
    label: 'Fifteen minutes on the numbers',
    labelVi: 'Mười lăm phút với các con số',
    action: 'Sit with a parent and look at the week’s data together — hours, accuracy, trend.',
    actionVi: 'Ngồi cùng phụ huynh xem dữ liệu tuần — số giờ, độ chính xác, xu hướng.',
    cue: 'A fixed weekend time.',
    cueVi: 'Một khung giờ cuối tuần cố định.',
    leverage: 4,
    minutes: 15,
    rationale: 'Data turns "are you studying?" into a conversation instead of an interrogation.',
    rationaleVi: 'Có dữ liệu, "con học chưa?" trở thành một cuộc trò chuyện thay vì một cuộc thẩm vấn.',
  },

  /* ---------------- School arena ---------------- */
  {
    id: 'h-teach-back',
    pillar: 'talent',
    arena: 'school',
    cadence: 'weekly',
    label: 'Teach it to someone',
    labelVi: 'Dạy lại cho người khác',
    action: 'Explain one concept you learned this week to a classmate, out loud, without notes.',
    actionVi: 'Giảng lại một khái niệm học được trong tuần cho bạn cùng lớp, nói miệng, không nhìn ghi chép.',
    cue: 'Any break at school.',
    cueVi: 'Giờ ra chơi bất kỳ.',
    leverage: 5,
    minutes: 10,
    rationale: 'You discover what you do not understand at the exact moment you try to say it.',
    rationaleVi: 'Bạn phát hiện mình chưa hiểu gì đúng vào lúc cố nói nó ra.',
  },
  {
    id: 'h-school-front-row',
    pillar: 'inspirits',
    arena: 'school',
    cadence: 'daily',
    label: 'Ask one question in class',
    labelVi: 'Hỏi một câu trong lớp',
    action: 'Ask one real question in a lesson each day, even a small one.',
    actionVi: 'Mỗi ngày hỏi một câu thật trong giờ học, dù là câu nhỏ.',
    cue: 'Any lesson where something is unclear.',
    cueVi: 'Bất kỳ tiết học nào có chỗ chưa rõ.',
    leverage: 3,
    minutes: 2,
    rationale: 'Asking in public is the cheapest available training in nerve.',
    rationaleVi: 'Hỏi trước đám đông là cách rèn bản lĩnh rẻ nhất đang có.',
  },
  {
    id: 'h-mentor-peer',
    pillar: 'action',
    arena: 'school',
    cadence: 'weekly',
    label: 'Mentor someone behind you',
    labelVi: 'Kèm một bạn phía sau',
    action: 'Spend one session helping a peer at a lower tier, on their material, not yours.',
    actionVi: 'Dành một buổi giúp một bạn ở tầng thấp hơn, học theo bài của bạn ấy, không phải của mình.',
    cue: 'A fixed weekly slot.',
    cueVi: 'Một khung giờ cố định hằng tuần.',
    leverage: 4,
    minutes: 45,
    rationale: 'Teaching is the last stage of learning, and it is where fluency is proved.',
    rationaleVi: 'Dạy là chặng cuối của việc học, và là nơi sự thành thục được chứng minh.',
  },

  /* ---------------- Society arena ---------------- */
  {
    id: 'h-transfer-habit',
    pillar: 'action',
    arena: 'society',
    cadence: 'weekly',
    label: 'Run the method somewhere else',
    labelVi: 'Chạy phương pháp ở nơi khác',
    action: 'Apply one GITA habit to a commitment that has nothing to do with the SAT, and track it.',
    actionVi: 'Áp dụng một thói quen GITA vào một cam kết không liên quan gì tới SAT, và theo dõi nó.',
    cue: 'When setting up any new commitment.',
    cueVi: 'Mỗi khi bắt đầu một cam kết mới.',
    leverage: 5,
    minutes: 20,
    rationale: 'A method that only works on one test was never a method; it was a trick.',
    rationaleVi: 'Phương pháp chỉ dùng được cho một kỳ thi thì chưa từng là phương pháp — đó là mẹo.',
  },
  {
    id: 'h-society-contribute',
    pillar: 'inspirits',
    arena: 'society',
    cadence: 'monthly',
    label: 'Give the method away',
    labelVi: 'Trao lại phương pháp',
    action: 'Once a month, help someone outside your circle with something you are good at.',
    actionVi: 'Mỗi tháng một lần, dùng thế mạnh của mình giúp một người ngoài vòng quen biết.',
    cue: 'A fixed date each month.',
    cueVi: 'Một ngày cố định trong tháng.',
    leverage: 3,
    minutes: 90,
    rationale: 'Ability that serves no one outside yourself tends not to survive its first setback.',
    rationaleVi: 'Năng lực không phục vụ ai ngoài bản thân thường không sống nổi qua thất bại đầu tiên.',
  },
];

export const HABIT_BY_ID = new Map<string, Habit>(HABITS.map((h) => [h.id, h]));

export function habitLabel(id: string, locale: 'vi' | 'en'): string {
  const habit = HABIT_BY_ID.get(id);
  if (!habit) return id;
  return locale === 'vi' ? habit.labelVi : habit.label;
}

export function habitsForArena(arena: Arena): Habit[] {
  return HABITS.filter((h) => h.arena === arena);
}

export function habitsForPillar(pillar: PillarId): Habit[] {
  return HABITS.filter((h) => h.pillar === pillar);
}

/**
 * The active set for a learner at a given tier.
 *
 * Capped deliberately. A learner handed nine habits runs none of them, so the
 * tier's own habits come first, highest leverage first, and the cap holds even
 * when the tier nominally lists more.
 */
export const MAX_ACTIVE_HABITS = 5;

export function selectHabitsFor(habitIds: readonly string[], cap = MAX_ACTIVE_HABITS): Habit[] {
  return habitIds
    .map((id) => HABIT_BY_ID.get(id))
    .filter((h): h is Habit => Boolean(h))
    .sort((a, b) => b.leverage - a.leverage)
    .slice(0, cap);
}

/* ------------------------------------------------------------------ */
/* Adherence                                                           */
/* ------------------------------------------------------------------ */

/** One recorded occurrence of a habit. */
export interface HabitEntry {
  habitId: string;
  /** Local ISO date. */
  date: string;
  done: boolean;
  note?: string;
}

/** How many occurrences a cadence expects across a window of days. */
export function expectedOccurrences(cadence: Cadence, days: number): number {
  switch (cadence) {
    case 'daily':
      return days;
    case 'weekday':
      return Math.round((days * 5) / 7);
    case 'weekly':
      return Math.max(1, Math.round(days / 7));
    case 'monthly':
      return Math.max(1, Math.round(days / 30));
    default:
      return days;
  }
}

/**
 * Adherence over a window, as a 0–1 fraction of what the cadence expected.
 *
 * Capped at 1: doing a weekly habit four times in a week is not 400%
 * adherence, and letting it read that way would let one enthusiastic week
 * disguise a month of misses.
 */
export function adherence(
  entries: readonly HabitEntry[],
  habit: Habit,
  days = 28,
  today = new Date(),
): number {
  const cutoff = new Date(today);
  cutoff.setDate(cutoff.getDate() - days);
  // Local calendar date, not UTC: `toISOString` would shift the boundary by a
  // day for every learner east of Greenwich, silently dropping entries.
  const cutoffIso = isoDate(cutoff);

  const done = entries.filter(
    (entry) => entry.habitId === habit.id && entry.done && entry.date > cutoffIso,
  ).length;

  const expected = expectedOccurrences(habit.cadence, days);
  return expected === 0 ? 0 : Math.min(1, done / expected);
}

/** Consecutive days on which a daily or weekday habit was completed. */
export function habitStreak(entries: readonly HabitEntry[], habitId: string, today: string): number {
  const done = new Set(
    entries.filter((entry) => entry.habitId === habitId && entry.done).map((entry) => entry.date),
  );

  let streak = 0;
  const cursor = new Date(`${today}T00:00:00`);
  // The streak survives until the end of the following day, so a habit checked
  // yesterday but not yet today still reads as live.
  if (!done.has(today)) cursor.setDate(cursor.getDate() - 1);

  for (;;) {
    const key = isoDate(cursor);
    if (!done.has(key)) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
