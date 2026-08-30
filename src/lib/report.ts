import type { AppState, MissionAttempt, TrackId } from '@/types';
import { missionById } from '@/data/catalog';
import { topicById } from '@/data/topics';
import { strandById } from '@/data/schools';
import { buildOptimizedPlan, progressOverview } from '@/lib/engine';
import { buildReviewQueue, studyStreak, examCountdown, dayKey } from '@/lib/review';

/**
 * Báo cáo tuần cho gia đình.
 *
 * Nguyên tắc biên soạn: viết cho người không dạy Toán đọc. Không dùng thuật ngữ
 * chuyên môn nếu chưa giải thích; mọi nhận định đều gắn với một con số quan sát
 * được; và luôn nói rõ chỉ số nào hệ thống KHÔNG đo được, để gia đình không suy
 * diễn quá đà từ một bảng số.
 */

const DAY = 24 * 3600 * 1000;

const addDays = (day: string, n: number) => dayKey(new Date(day + 'T00:00:00').getTime() + n * DAY);

export const vnDate = (day: string) => {
  const [y, m, d] = day.split('-');
  return `${d}/${m}/${y}`;
};

export interface WeekSlice {
  from: string;
  to: string;
  attempts: MissionAttempt[];
  sheets: number;
  minutes: number;
  avgKpi: number;
  passed: number;
  activeDays: number;
}

function sliceWeek(state: AppState, track: TrackId, from: string, to: string): WeekSlice {
  const attempts = state.attempts.filter((a) => {
    const d = dayKey(a.at);
    return d >= from && d <= to && missionById(a.missionId)?.track === track;
  });
  const minutes = Object.entries(state.studyLog)
    .filter(([d]) => d >= from && d <= to)
    .reduce((s, [, m]) => s + m, 0);
  const activeDays = Object.entries(state.studyLog).filter(([d, m]) => d >= from && d <= to && m > 0).length;
  const avgKpi = attempts.length
    ? Math.round(attempts.reduce((s, a) => s + a.kpi, 0) / attempts.length)
    : 0;
  return {
    from,
    to,
    attempts,
    sheets: attempts.length,
    minutes,
    avgKpi,
    passed: attempts.filter((a) => a.passed).length,
    activeDays,
  };
}

export interface TopicSignal {
  topicId: string;
  topicName: string;
  strandName: string;
  count: number;
  avgKpi: number;
}

export interface FamilyAction {
  title: string;
  detail: string;
  cadence: string;
}

export interface WeeklyReport {
  studentName: string;
  track: TrackId;
  trackLabel: string;
  goal: string;
  generatedAt: string;
  week: WeekSlice;
  prev: WeekSlice;
  delta: { sheets: number; minutes: number; avgKpi: number; activeDays: number };
  streakCurrent: number;
  streakBest: number;
  overdueReviews: number;
  unresolvedMistakes: number;
  level: number;
  stage: number;
  countdownDays: number | null;
  countdownPhase: string | null;
  /** Ba điểm đang vững nhất trong tuần. */
  strengths: TopicSignal[];
  /** Ba điểm cần chú ý nhất. */
  watchlist: TopicSignal[];
  /** Ba việc cụ thể của tuần tới, lấy từ lộ trình tối ưu. */
  nextWeek: { title: string; why: string; minutes: number }[];
  /** Việc gia đình làm được ngay, không cần biết Toán. */
  familyActions: FamilyAction[];
  /** Nhận xét tổng quan, viết thành câu hoàn chỉnh. */
  summary: string[];
  /** Điều hệ thống không đo được — nói rõ để không suy diễn sai. */
  limits: string[];
}

const TRACK_LABEL: Record<TrackId, string> = {
  thpt: 'Toán vào lớp 10 · mục tiêu 9–10 điểm',
  chuyen: 'Toán chuyên · thi vào lớp chuyên Toán',
  'thpt-qg': 'Toán THPT lớp 10–12 · mục tiêu 9+ thi đại học',
  lop6: 'Toán vào lớp 6 · trường THCS chất lượng cao',
};

const TRACK_GOAL: Record<TrackId, string> = {
  thpt: 'Đạt 9 đến 10 điểm môn Toán trong kỳ thi tuyển sinh lớp 10.',
  chuyen: 'Đỗ lớp chuyên Toán của trường đã đăng ký.',
  'thpt-qg': 'Trên 9 điểm Toán thi đại học và giữ vị trí đầu lớp ở môn Toán.',
  lop6: 'Làm trọn phần Toán của bài đánh giá năng lực vào lớp 6 trong thời gian quy định.',
};

/** Ngày thứ Hai của tuần chứa ngày đã cho. */
export function startOfWeek(day: string) {
  const d = new Date(day + 'T00:00:00');
  const wd = (d.getDay() + 6) % 7; // 0 = thứ Hai
  return addDays(day, -wd);
}

export function buildWeeklyReport(
  state: AppState,
  track: TrackId,
  today = dayKey(new Date()),
  weekOffset = 0,
): WeeklyReport {
  const from = addDays(startOfWeek(today), weekOffset * 7);
  const to = addDays(from, 6);
  const week = sliceWeek(state, track, from, to);
  const prev = sliceWeek(state, track, addDays(from, -7), addDays(from, -1));

  const streak = studyStreak(state, today);
  const queue = buildReviewQueue(state, track, today);
  const cd = examCountdown(state, today);
  const overview = progressOverview(state, track);

  /* --- Mạnh và yếu trong tuần --- */
  const byTopic = new Map<string, { kpis: number[]; wrong: number }>();
  for (const a of week.attempts) {
    const m = missionById(a.missionId);
    if (!m) continue;
    const cur = byTopic.get(m.topicId) ?? { kpis: [], wrong: 0 };
    cur.kpis.push(a.kpi);
    cur.wrong += a.wrongTopics.length;
    byTopic.set(m.topicId, cur);
  }
  const signals: TopicSignal[] = [...byTopic.entries()].map(([topicId, v]) => {
    const t = topicById(topicId);
    return {
      topicId,
      topicName: t?.name ?? topicId,
      strandName: strandById(t?.strand ?? 'dai-so')?.name ?? '',
      count: v.kpis.length,
      avgKpi: Math.round(v.kpis.reduce((s, k) => s + k, 0) / v.kpis.length),
    };
  });
  const strengths = signals.filter((s) => s.avgKpi >= 80).sort((a, b) => b.avgKpi - a.avgKpi).slice(0, 3);
  const watchlist = signals.filter((s) => s.avgKpi < 80).sort((a, b) => a.avgKpi - b.avgKpi).slice(0, 3);

  /* --- Ba việc của tuần tới --- */
  const plan = buildOptimizedPlan(state, track);
  const nextWeek = plan.items
    .filter((i) => i.missionIds.length)
    .slice(0, 3)
    .map((i) => ({
      title: i.topicName,
      why: i.reasons[0] ?? 'Chuyên đề đang đứng đầu lộ trình tối ưu theo dữ liệu làm bài.',
      minutes: i.estimatedMinutes,
    }));

  /* --- Việc gia đình --- */
  const familyActions: FamilyAction[] = [
    {
      title: 'Bàn tròn 10 phút mỗi tối',
      cadence: 'Hằng ngày',
      detail:
        'Hỏi đúng ba câu: hôm nay con học được gì mới, chỗ nào con thấy khó, ngày mai con định làm gì. Nghe hết, không ngắt lời, không bình luận về điểm số.',
    },
    {
      title: 'Giữ khung giờ bất khả xâm phạm',
      cadence: 'Hằng ngày',
      detail:
        `Một khung 45–90 phút cố định cho môn Toán. Trong khung đó không sai vặt, điện thoại để ngoài phòng. Tuần này con học ${week.activeDays}/7 ngày — mục tiêu tuần tới là ${Math.min(7, week.activeDays + 1)} ngày.`,
    },
    {
      title: 'Chủ nhật nhìn lại',
      cadence: 'Hằng tuần',
      detail:
        'Cùng con mở trang Hôm nay và xem chuỗi ngày học. Ăn mừng mốc quá trình (số ngày học đều, số nhiệm vụ đạt chuẩn) chứ không chỉ ăn mừng điểm số.',
    },
  ];
  if (queue.due.filter((c) => c.overdueDays > 0).length >= 3) {
    familyActions.push({
      title: 'Nhắc con trả nợ ôn tập',
      cadence: 'Trong 3 ngày tới',
      detail:
        `Đang có ${queue.due.filter((c) => c.overdueDays > 0).length} việc ôn lại quá hạn. Ôn muộn tốn nhiều thời gian hơn ôn đúng hạn, nên hãy ưu tiên trả nợ trước khi nhận thêm bài mới.`,
    });
  }

  /* --- Nhận xét tổng quan --- */
  const summary: string[] = [];
  if (week.sheets === 0) {
    summary.push(
      `Trong tuần từ ${vnDate(from)} đến ${vnDate(to)}, hệ thống chưa ghi nhận phiếu luyện nào. Đây là dấu hiệu cần trao đổi với con trước khi nói tới kết quả học.`,
    );
  } else {
    summary.push(
      `Trong tuần từ ${vnDate(from)} đến ${vnDate(to)}, con đã làm ${week.sheets} phiếu luyện trong ${week.minutes} phút, học vào ${week.activeDays}/7 ngày.`,
    );
    summary.push(
      `Tỉ lệ làm đúng trung bình là ${week.avgKpi}%. Ngưỡng để hệ thống xét cho lên mức khó hơn là 90%. Tuần này có ${week.passed} phiếu đạt ngưỡng đó.`,
    );
  }
  const dSheets = week.sheets - prev.sheets;
  const dKpi = week.avgKpi - prev.avgKpi;
  if (prev.sheets > 0) {
    summary.push(
      `So với tuần trước: số phiếu ${dSheets >= 0 ? 'tăng' : 'giảm'} ${Math.abs(dSheets)}, tỉ lệ làm đúng ${dKpi >= 0 ? 'tăng' : 'giảm'} ${Math.abs(dKpi)} điểm phần trăm.` +
        (dSheets < 0 && dKpi > 0
          ? ' Làm ít hơn nhưng chắc hơn — đây thường là dấu hiệu tốt, không phải dấu hiệu xấu.'
          : ''),
    );
  }
  if (streak.current >= 5) {
    summary.push(
      `Con đang có chuỗi ${streak.current} ngày học liên tiếp (kỷ lục ${streak.best} ngày). Nhịp đều đặn là chỉ số dự báo kết quả tốt hơn nhiều so với số giờ học dồn trong một buổi.`,
    );
  } else if (streak.current === 0) {
    summary.push(
      'Chuỗi ngày học đang bị đứt. Việc cần làm không phải là học bù thật nhiều, mà là nối lại chuỗi bằng một buổi ngắn ngay hôm nay.',
    );
  }
  if (watchlist.length) {
    summary.push(
      `Chuyên đề cần chú ý nhất tuần này là “${watchlist[0].topicName}” (tỉ lệ đúng ${watchlist[0].avgKpi}%). Hệ thống đã tự xếp việc sửa vào lộ trình tuần tới, gia đình không cần dạy lại phần này.`,
    );
  }
  if (cd) {
    summary.push(
      `Còn ${cd.daysLeft} ngày tới kỳ thi, hiện đang ở giai đoạn “${cd.phaseLabel.toLowerCase()}”. ${cd.message}`,
    );
  }

  const limits = [
    'Báo cáo chỉ đo được những gì con làm trên hệ thống. Bài làm trên lớp, bài về nhà của trường và việc học nhóm không nằm trong các con số này.',
    'Tỉ lệ làm đúng phản ánh mức độ thành thạo ở đúng mức khó hiện tại, không phải điểm dự đoán trong kỳ thi thật.',
    'Một tuần có kết quả thấp chưa nói lên điều gì. Hãy nhìn xu hướng của ba đến bốn tuần liên tiếp.',
    'Không nên dùng báo cáo này để so sánh con với bạn khác. Mỗi lộ trình xuất phát từ một điểm khác nhau.',
  ];

  return {
    studentName: state.profile?.name || state.account.displayName || 'Học viên',
    track,
    trackLabel: TRACK_LABEL[track],
    goal: TRACK_GOAL[track],
    generatedAt: today,
    week,
    prev,
    delta: {
      sheets: dSheets,
      minutes: week.minutes - prev.minutes,
      avgKpi: dKpi,
      activeDays: week.activeDays - prev.activeDays,
    },
    streakCurrent: streak.current,
    streakBest: streak.best,
    overdueReviews: queue.due.filter((c) => c.overdueDays > 0).length,
    unresolvedMistakes: state.mistakes.filter((m) => !m.resolved).length,
    level: overview.level,
    stage: overview.stage,
    countdownDays: cd?.daysLeft ?? null,
    countdownPhase: cd?.phaseLabel ?? null,
    strengths,
    watchlist,
    nextWeek,
    familyActions,
    summary,
    limits,
  };
}
