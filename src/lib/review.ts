import type { AppState, MissionAttempt, TrackId } from '@/types';
import { MISSIONS, WORKSHEETS, missionById } from '@/data/catalog';
import { topicById } from '@/data/topics';
import { HABITS } from '@/data/playbook';
import { sheetSpec } from '@/data/sheets';
import { buildOptimizedPlan, isMissionUnlocked } from '@/lib/engine';

/**
 * Động cơ nhịp học hằng ngày của MATH365.
 *
 * Ba nguồn việc hợp thành “Hôm nay”:
 *   1. Lịch ôn lại theo mốc 1 – 3 – 7 – 21 ngày (đường cong quên Ebbinghaus).
 *   2. Ngân hàng lỗi sai chưa xử lí, gom theo chuyên đề.
 *   3. Lộ trình tối ưu (tần suất × mật độ lỗi × độ mới × độ phù hợp mức độ).
 *
 * Toàn bộ tính từ dữ liệu đã có trong hồ sơ học viên, không cần trường lưu thêm.
 */

const DAY = 24 * 3600 * 1000;

/** Bốn mốc ôn lại. Sau mốc thứ tư coi như đã chuyển vào trí nhớ dài hạn. */
export const REVIEW_STEPS = [1, 3, 7, 21] as const;

export const REVIEW_STEP_MEANING: { step: number; label: string; why: string }[] = [
  { step: 1, label: 'Ôn sau 1 ngày', why: 'Chặn đúng lúc đường cong quên dốc nhất: sau 24 giờ, phần lớn chi tiết đã mờ.' },
  { step: 3, label: 'Ôn sau 3 ngày', why: 'Lần nhắc thứ hai kéo dài thời gian lưu giữ lên gấp vài lần so với chỉ học một lần.' },
  { step: 7, label: 'Ôn sau 7 ngày', why: 'Mốc chuyển từ “nhớ được” sang “làm được mà không cần nghĩ lại quy trình”.' },
  { step: 21, label: 'Ôn sau 21 ngày', why: 'Mốc chốt: qua được mốc này thì dạng bài đã thành phản xạ, chỉ cần gặp lại trong đề tổng hợp.' },
];

export type ReviewKind = 'phieu' | 'loi-sai';

export interface ReviewCard {
  id: string;
  kind: ReviewKind;
  /** Ngày đến hạn, dạng YYYY-MM-DD. */
  dueDay: string;
  /** Số ngày đã quá hạn; 0 nghĩa là đúng hạn hôm nay, số âm là chưa tới hạn. */
  overdueDays: number;
  /** Mốc ôn lại đang ở (1, 3, 7 hoặc 21). Với thẻ lỗi sai luôn là 1. */
  step: number;
  title: string;
  detail: string;
  topicId: string;
  topicName: string;
  minutes: number;
  /** Đường dẫn nội bộ để bắt tay vào làm ngay. */
  route: string;
  actionLabel: string;
  /** Số câu sai liên quan (chỉ dùng cho thẻ lỗi sai). */
  count?: number;
}

export interface ReviewQueue {
  /** Đã tới hạn hoặc quá hạn — phải làm hôm nay. */
  due: ReviewCard[];
  /** Sẽ tới hạn trong 7 ngày tới. */
  upcoming: ReviewCard[];
  /** Số phiếu đã đi hết cả bốn mốc. */
  mastered: number;
  /** Tổng số phút ước tính cho phần đến hạn. */
  dueMinutes: number;
}

export const dayKey = (d: Date | string | number) => {
  const date = typeof d === 'string' || typeof d === 'number' ? new Date(d) : d;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

const addDays = (day: string, n: number) => dayKey(new Date(day + 'T00:00:00').getTime() + n * DAY);

const diffDays = (from: string, to: string) =>
  Math.round((new Date(to + 'T00:00:00').getTime() - new Date(from + 'T00:00:00').getTime()) / DAY);

const vnDate = (day: string) => {
  const [y, m, d] = day.split('-');
  return `${d}/${m}/${y}`;
};

/** Nhóm các lượt làm theo nhiệm vụ, sắp theo thời gian tăng dần. */
function attemptsByMission(state: AppState) {
  const map = new Map<string, MissionAttempt[]>();
  for (const a of state.attempts) {
    const list = map.get(a.missionId) ?? [];
    list.push(a);
    map.set(a.missionId, list);
  }
  for (const list of map.values()) list.sort((x, y) => x.at.localeCompare(y.at));
  return map;
}

/**
 * Xếp lịch ôn lại cho một nhiệm vụ.
 * Mốc đang chờ được suy ra từ số ngày khác nhau mà học viên đã làm nhiệm vụ đó:
 * làm lần đầu → chờ mốc 1 ngày; đã ôn 1 lần → chờ mốc 3 ngày; và tiếp tục như vậy.
 */
function scheduleForMission(attempts: MissionAttempt[]) {
  const days = [...new Set(attempts.map((a) => dayKey(a.at)))].sort();
  const firstDay = days[0];
  const reviewsDone = days.length - 1;
  if (reviewsDone >= REVIEW_STEPS.length) return null;
  const step = REVIEW_STEPS[reviewsDone];
  return { firstDay, lastDay: days[days.length - 1], step, dueDay: addDays(firstDay, step) };
}

/**
 * Dựng hàng đợi ôn lại cho một luồng.
 * @param today ngày tham chiếu, mặc định là hôm nay. Truyền vào để kiểm thử được.
 */
export function buildReviewQueue(state: AppState, track: TrackId, today = dayKey(new Date())): ReviewQueue {
  const due: ReviewCard[] = [];
  const upcoming: ReviewCard[] = [];
  let mastered = 0;

  /* --- 1. Ôn lại phiếu đã làm theo mốc 1 – 3 – 7 – 21 --- */
  for (const [missionId, attempts] of attemptsByMission(state)) {
    const mission = missionById(missionId);
    if (!mission || mission.track !== track) continue;
    const plan = scheduleForMission(attempts);
    if (!plan) {
      mastered++;
      continue;
    }
    const topic = topicById(mission.topicId);
    const best = Math.max(...attempts.map((a) => a.kpi));
    const overdueDays = diffDays(plan.dueDay, today);
    const card: ReviewCard = {
      id: `rv-${missionId}`,
      kind: 'phieu',
      dueDay: plan.dueDay,
      overdueDays,
      step: plan.step,
      title: mission.title,
      detail:
        `Mốc ${plan.step} ngày · lần làm gần nhất ${vnDate(plan.lastDay)} · KPI cao nhất ${best}%. ` +
        (best >= 90
          ? 'Đã đạt chuẩn — lần này làm lại để chốt vào trí nhớ dài hạn, đề sẽ khác.'
          : 'Chưa đạt chuẩn 90% — lần này là cơ hội gỡ, không phải làm lại cho có.'),
      topicId: mission.topicId,
      topicName: topic?.name ?? mission.topicId,
      minutes: sheetSpec(mission.kind).minutes,
      route: `/mission/${missionId}`,
      actionLabel: 'Ôn lại phiếu này',
    };
    if (overdueDays >= 0) due.push(card);
    else if (overdueDays >= -7) upcoming.push(card);
  }

  /* --- 2. Lỗi sai chưa xử lí, gom theo chuyên đề --- */
  const byTopic = new Map<string, { count: number; last: string; strand: string }>();
  for (const m of state.mistakes) {
    if (m.resolved) continue;
    const topic = topicById(m.topicId);
    if (!topic || !topic.tracks.includes(track)) continue;
    const cur = byTopic.get(m.topicId) ?? { count: 0, last: m.at, strand: m.strand };
    cur.count++;
    if (m.at > cur.last) cur.last = m.at;
    byTopic.set(m.topicId, cur);
  }
  for (const [topicId, info] of byTopic) {
    const topic = topicById(topicId);
    if (!topic) continue;
    const dueDay = addDays(dayKey(info.last), 1);
    const overdueDays = diffDays(dueDay, today);
    const card: ReviewCard = {
      id: `mk-${topicId}`,
      kind: 'loi-sai',
      dueDay,
      overdueDays,
      step: 1,
      title: `Xử lí ${info.count} câu sai · ${topic.name}`,
      detail:
        `Câu sai gần nhất ngày ${vnDate(dayKey(info.last))}. Mở hồ sơ, đọc lại lời giải và bảng phân tích ` +
        'từng câu, rồi bấm “Đã xử lí” cho những câu em đã tự làm lại đúng.',
      topicId,
      topicName: topic.name,
      minutes: Math.min(30, 5 + info.count * 3),
      route: '/portfolio',
      actionLabel: 'Mở ngân hàng lỗi',
      count: info.count,
    };
    if (overdueDays >= 0) due.push(card);
    else upcoming.push(card);
  }

  const order = (a: ReviewCard, b: ReviewCard) =>
    b.overdueDays - a.overdueDays || a.dueDay.localeCompare(b.dueDay);
  due.sort(order);
  upcoming.sort((a, b) => a.dueDay.localeCompare(b.dueDay));

  return { due, upcoming, mastered, dueMinutes: due.reduce((s, c) => s + c.minutes, 0) };
}

/* ============================================================
   Chuỗi ngày học và nhịp tuần
   ============================================================ */

export interface StreakInfo {
  /** Số ngày học liên tiếp tính đến hôm nay (hoặc hôm qua nếu hôm nay chưa học). */
  current: number;
  /** Chuỗi dài nhất từng đạt. */
  best: number;
  /** Hôm nay đã học chưa. */
  studiedToday: boolean;
  /** Số phút học trong 7 ngày gần nhất, theo thứ tự cũ → mới. */
  week: { day: string; minutes: number; label: string }[];
  weekMinutes: number;
  /** Số ngày có học trong 30 ngày gần nhất. */
  activeDays30: number;
}

const WD = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

export function studyStreak(state: AppState, today = dayKey(new Date())): StreakInfo {
  const log = state.studyLog;
  const studiedToday = (log[today] ?? 0) > 0;

  let current = 0;
  let cursor = studiedToday ? today : addDays(today, -1);
  while ((log[cursor] ?? 0) > 0) {
    current++;
    cursor = addDays(cursor, -1);
  }

  const days = Object.keys(log).filter((d) => (log[d] ?? 0) > 0).sort();
  let best = 0;
  let run = 0;
  let prev = '';
  for (const d of days) {
    run = prev && diffDays(prev, d) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }

  const week: StreakInfo['week'] = [];
  for (let i = 6; i >= 0; i--) {
    const d = addDays(today, -i);
    week.push({ day: d, minutes: log[d] ?? 0, label: WD[new Date(d + 'T00:00:00').getDay()] });
  }

  const activeDays30 = days.filter((d) => diffDays(d, today) < 30 && diffDays(d, today) >= 0).length;

  return {
    current,
    best: Math.max(best, current),
    studiedToday,
    week,
    weekMinutes: week.reduce((s, w) => s + w.minutes, 0),
    activeDays30,
  };
}

/* ============================================================
   Đếm ngược kỳ thi
   ============================================================ */

export interface ExamCountdown {
  examDate: string;
  daysLeft: number;
  weeksLeft: number;
  /** Số giờ luyện còn lại theo cam kết mỗi tuần. */
  hoursLeft: number;
  phase: 'nen-tang' | 'tang-toc' | 'tong-duyet' | 'nuoc-rut' | 'da-qua';
  phaseLabel: string;
  message: string;
}

export function examCountdown(state: AppState, today = dayKey(new Date())): ExamCountdown | null {
  const p = state.profile;
  if (!p?.examDate) return null;
  const daysLeft = diffDays(today, p.examDate);
  const weeksLeft = Math.max(0, Math.ceil(daysLeft / 7));
  const hoursLeft = Math.round(weeksLeft * (p.hoursPerWeek || 0));

  let phase: ExamCountdown['phase'] = 'nen-tang';
  let phaseLabel = 'Giai đoạn nền tảng';
  let message = '';
  if (daysLeft < 0) {
    phase = 'da-qua';
    phaseLabel = 'Đã qua ngày thi';
    message = 'Ngày thi trong hồ sơ đã qua. Hãy cập nhật mốc mới để hệ thống tính lại lộ trình.';
  } else if (daysLeft <= 14) {
    phase = 'nuoc-rut';
    phaseLabel = 'Nước rút';
    message =
      'Không học kiến thức mới nữa. Mỗi ngày một đề tính giờ, chấm ngay, và chỉ sửa những lỗi lặp lại. Ngủ đủ quan trọng hơn học thêm một dạng.';
  } else if (daysLeft <= 45) {
    phase = 'tong-duyet';
    phaseLabel = 'Tổng duyệt';
    message =
      'Chuyển trọng tâm sang phiếu Ôn thi và Phiếu thi. Mỗi tuần ít nhất một đề mẫu trọn vẹn, làm đúng giờ như thi thật.';
  } else if (daysLeft <= 120) {
    phase = 'tang-toc';
    phaseLabel = 'Tăng tốc';
    message =
      'Đây là quãng tạo ra phần lớn điểm số. Bám nhóm 20/80 trong lộ trình tối ưu và giữ nhịp phiếu Nâng cao.';
  } else {
    message =
      'Còn nhiều thời gian — hãy dùng nó để xây nền thật chắc. Đừng vội nhảy vào đề thi khi phiếu Lý thuyết và Đọc vị chưa đạt KPI 90%.';
  }

  return { examDate: p.examDate, daysLeft: Math.max(0, daysLeft), weeksLeft, hoursLeft, phase, phaseLabel, message };
}

/* ============================================================
   Kế hoạch “Hôm nay”
   ============================================================ */

export type TodayKind = 'on-lai' | 'loi-sai' | 'nhiem-vu' | 'thoi-quen' | 'de-mau';

export interface TodayTask {
  id: string;
  kind: TodayKind;
  title: string;
  why: string;
  minutes: number;
  route?: string;
  actionLabel?: string;
  /** Việc thuộc nhóm 20% tạo ra 80% kết quả. */
  pareto?: boolean;
  /** Đã hoàn thành trong hôm nay (chỉ áp dụng cho thói quen). */
  done?: boolean;
  /** Khoá doneTasks để bật/tắt, chỉ có ở việc kiểu thói quen. */
  toggleKey?: string;
}

export interface TodayPlan {
  day: string;
  tasks: TodayTask[];
  totalMinutes: number;
  /** Việc quan trọng nhất hôm nay — nếu chỉ làm được một việc thì làm việc này. */
  keystone?: TodayTask;
  streak: StreakInfo;
  countdown: ExamCountdown | null;
  queue: ReviewQueue;
  /** Câu dẫn ngắn theo trạng thái hiện tại của học viên. */
  headline: string;
}

/** Số phút mục tiêu mỗi ngày, suy ra từ cam kết giờ mỗi tuần trong hồ sơ. */
export function dailyTargetMinutes(state: AppState) {
  const h = state.profile?.hoursPerWeek ?? 7;
  return Math.max(20, Math.round((h * 60) / 7 / 5) * 5);
}

export function buildTodayPlan(state: AppState, track: TrackId, today = dayKey(new Date())): TodayPlan {
  const queue = buildReviewQueue(state, track, today);
  const streak = studyStreak(state, today);
  const countdown = examCountdown(state, today);
  const target = dailyTargetMinutes(state);
  const tasks: TodayTask[] = [];

  // 1. Ôn lại đến hạn — ưu tiên cao nhất, tối đa 2 việc.
  for (const c of queue.due.filter((c) => c.kind === 'phieu').slice(0, 2)) {
    tasks.push({
      id: c.id,
      kind: 'on-lai',
      title: c.title,
      why:
        c.overdueDays > 0
          ? `Quá hạn ôn lại ${c.overdueDays} ngày (mốc ${c.step} ngày). Càng để lâu càng phải học lại từ đầu.`
          : `Đến hạn ôn lại mốc ${c.step} ngày. Ôn đúng hạn tốn ít thời gian hơn nhiều so với ôn muộn.`,
      minutes: c.minutes,
      route: c.route,
      actionLabel: c.actionLabel,
      pareto: true,
    });
  }

  // 2. Lỗi sai chưa xử lí — gom một việc duy nhất cho chuyên đề nặng nhất.
  const worstMistake = queue.due
    .filter((c) => c.kind === 'loi-sai')
    .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))[0];
  if (worstMistake) {
    tasks.push({
      id: worstMistake.id,
      kind: 'loi-sai',
      title: worstMistake.title,
      why: `Lỗi chưa xử lí là lỗi sẽ lặp lại trong phòng thi. Đọc lời giải và bảng phân tích của ${worstMistake.count} câu này rồi tự làm lại.`,
      minutes: worstMistake.minutes,
      route: worstMistake.route,
      actionLabel: worstMistake.actionLabel,
      pareto: true,
    });
  }

  // 3. Nhiệm vụ tiếp theo từ lộ trình tối ưu, lấp cho đủ quỹ thời gian trong ngày.
  const plan = buildOptimizedPlan(state, track);
  // Không giao lại phiếu đang nằm trong danh sách ôn lại — sẽ thành hai việc trùng nhau.
  const alreadyQueued = new Set(queue.due.concat(queue.upcoming).map((c) => c.id.replace(/^rv-/, '')));
  const usedTopics = new Set(tasks.map((t) => t.id));
  for (const item of plan.items) {
    if (tasks.reduce((s, t) => s + t.minutes, 0) >= target) break;
    const missionId = item.missionIds.find((id) => {
      const m = missionById(id);
      return m && isMissionUnlocked(state, m) && !state.missionStatus[id]?.passed && !alreadyQueued.has(id);
    });
    if (!missionId || usedTopics.has(`nv-${missionId}`)) continue;
    const mission = missionById(missionId);
    if (!mission) continue;
    usedTopics.add(`nv-${missionId}`);
    tasks.push({
      id: `nv-${missionId}`,
      kind: 'nhiem-vu',
      title: mission.title,
      why: item.reasons[0] ?? `Chuyên đề ${item.topicName} đang đứng đầu lộ trình tối ưu của em.`,
      minutes: sheetSpec(mission.kind).minutes,
      route: `/mission/${missionId}`,
      actionLabel: 'Bắt đầu làm',
      pareto: item.inPareto,
    });
  }

  // 4. Nếu chưa có gì (học viên mới), mời vào nhiệm vụ đầu tiên của luồng.
  if (!tasks.length) {
    const first = MISSIONS.find((m) => m.track === track && isMissionUnlocked(state, m));
    if (first) {
      tasks.push({
        id: `nv-${first.id}`,
        kind: 'nhiem-vu',
        title: first.title,
        why: 'Đây là phiếu đầu tiên của lộ trình. Làm xong một phiếu là hệ thống có đủ dữ liệu để cá nhân hoá mọi thứ còn lại.',
        minutes: sheetSpec(first.kind).minutes,
        route: `/mission/${first.id}`,
        actionLabel: 'Bắt đầu làm',
        pareto: true,
      });
    }
  }

  // 5. Một thói quen của ngày — xoay vòng theo ngày để không nhàm.
  const pool = HABITS.filter((h) => h.tracks.includes(track));
  if (pool.length) {
    const idx = Math.abs(diffDays('2024-01-01', today)) % pool.length;
    const habit = pool[idx];
    const key = `habit-${today}-${habit.id}`;
    tasks.push({
      id: key,
      kind: 'thoi-quen',
      title: `Thói quen hôm nay: ${habit.name}`,
      why: habit.why,
      minutes: habit.minutes,
      done: !!state.doneTasks[key],
      toggleKey: key,
      actionLabel: 'Xem cách làm',
      route: '/playbook',
    });
  }

  // 6. Sát ngày thi thì thêm một đề mẫu tính giờ.
  if (countdown && countdown.daysLeft <= 45 && countdown.daysLeft > 0) {
    tasks.push({
      id: 'de-mau-tuan',
      kind: 'de-mau',
      title: 'Một đề mẫu trọn vẹn, tính giờ như thi thật',
      why: `Còn ${countdown.daysLeft} ngày. Từ đây trở đi, mỗi tuần ít nhất một đề đủ thời gian là điều kiện bắt buộc để quen nhịp phòng thi.`,
      minutes: 90,
      route: '/papers',
      actionLabel: 'Chọn đề mẫu',
      pareto: true,
    });
  }

  const keystone = tasks.find((t) => t.pareto && t.kind !== 'thoi-quen') ?? tasks[0];

  let headline: string;
  if (!state.attempts.length) {
    headline = 'Bắt đầu từ một phiếu. Hệ thống cần dữ liệu thật của em mới cá nhân hoá được lộ trình.';
  } else if (queue.due.length >= 3) {
    headline = `Có ${queue.due.length} việc đến hạn ôn lại. Ưu tiên trả nợ ôn tập trước khi nhận thêm phiếu mới.`;
  } else if (streak.current >= 7) {
    headline = `Chuỗi ${streak.current} ngày liên tiếp. Nhịp đều đặn này chính là thứ tạo ra khác biệt vào ngày thi.`;
  } else if (!streak.studiedToday) {
    headline = 'Hôm nay chưa có phút học nào. Bắt đầu bằng việc đầu tiên trong danh sách dưới đây.';
  } else {
    headline = `Đã học ${state.studyLog[today]} phút hôm nay. Mục tiêu ${target} phút — còn ${Math.max(0, target - (state.studyLog[today] ?? 0))} phút nữa.`;
  }

  return {
    day: today,
    tasks,
    totalMinutes: tasks.reduce((s, t) => s + t.minutes, 0),
    keystone,
    streak,
    countdown,
    queue,
    headline,
  };
}

/** Thống kê nhanh dùng cho báo cáo và bảng điều khiển. */
export function reviewStats(state: AppState, track: TrackId, today = dayKey(new Date())) {
  const q = buildReviewQueue(state, track, today);
  const totalSheets = WORKSHEETS.filter((w) => w.track === track).length;
  const touched = new Set(
    state.attempts.filter((a) => missionById(a.missionId)?.track === track).map((a) => a.worksheetId),
  ).size;
  return {
    due: q.due.length,
    overdue: q.due.filter((c) => c.overdueDays > 0).length,
    upcoming: q.upcoming.length,
    mastered: q.mastered,
    dueMinutes: q.dueMinutes,
    touched,
    totalSheets,
  };
}
