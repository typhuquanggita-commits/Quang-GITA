import { MAX_TOTAL_SCORE } from '../config';
import { TOPICS, topicName } from '../data/topics';
import type { PersistedState, TopicMastery } from '../types';
import { addDays, dayKey, daysUntil } from './format';

/**
 * Sinh lo trinh on tap. Muc tieu thiet ke: nguoi hoc mo app len la biet
 * "hom nay lam gi", va nhin xa hon la biet "tuan nay o dau tren duong den dich".
 */

export type PhaseId = 'foundation' | 'acceleration' | 'finishing';

export interface Phase {
  id: PhaseId;
  name: string;
  focus: string;
  /** Ti le thoi gian danh cho tung viec trong giai doan nay. */
  mix: { learn: number; drill: number; mock: number; review: number };
}

export const PHASES: Record<PhaseId, Phase> = {
  foundation: {
    id: 'foundation',
    name: 'Nền tảng',
    focus: 'Phủ kín kiến thức và bịt các lỗ hổng cơ bản trước khi luyện tốc độ.',
    mix: { learn: 0.45, drill: 0.35, mock: 0.05, review: 0.15 },
  },
  acceleration: {
    id: 'acceleration',
    name: 'Tăng tốc',
    focus: 'Luyện chuyên đề cường độ cao và làm quen áp lực thời gian.',
    mix: { learn: 0.2, drill: 0.4, mock: 0.2, review: 0.2 },
  },
  finishing: {
    id: 'finishing',
    name: 'Về đích',
    focus: 'Thi thử đều đặn, giữ phong độ và rà lại sổ tay lỗi sai. Không học kiến thức mới.',
    mix: { learn: 0.05, drill: 0.25, mock: 0.4, review: 0.3 },
  },
};

export function phaseFor(daysLeft: number | null): Phase {
  if (daysLeft === null) return PHASES.acceleration;
  if (daysLeft <= 21) return PHASES.finishing;
  if (daysLeft <= 70) return PHASES.acceleration;
  return PHASES.foundation;
}

export type TaskKind = 'review' | 'drill' | 'mock' | 'learn';

export interface PlanTask {
  id: string;
  kind: TaskKind;
  title: string;
  detail: string;
  /** So phut uoc tinh. */
  minutes: number;
  href: string;
  /** Xong chua — suy ra tu du lieu, khong phai o tick thu cong. */
  done: boolean;
  priority: number;
}

export interface DailyPlan {
  date: string;
  phase: Phase;
  daysLeft: number | null;
  tasks: PlanTask[];
  totalMinutes: number;
}

export interface WeeklyMilestone {
  weekIndex: number;
  startDate: string;
  label: string;
  /** Diem du bao can dat vao cuoi tuan nay de bam sat muc tieu. */
  targetScore: number;
  focusTopics: string[];
}

/** Xep hang chu de yeu theo "so diem co the lay lai", khong phai theo ti le sai. */
export function rankWeakTopics(
  mastery: Record<string, TopicMastery>,
  limit = 5,
): Array<{ topicId: string; name: string; mastery: number; potential: number }> {
  return TOPICS.map((topic) => {
    const record = mastery[topic.id];
    const value = record?.mastery ?? 0.5;
    // Chu de trong so cao + thanh thao thap = mat nhieu diem nhat.
    return {
      topicId: topic.id,
      name: topic.name,
      mastery: value,
      potential: (1 - value) * topic.weight,
    };
  })
    .sort((a, b) => b.potential - a.potential)
    .slice(0, limit);
}

export interface DailyPlanInput {
  state: PersistedState;
  dueCardCount: number;
  now?: Date;
}

export function buildDailyPlan({ state, dueCardCount, now = new Date() }: DailyPlanInput): DailyPlan {
  const daysLeft = state.settings.examDate ? daysUntil(state.settings.examDate, now) : null;
  const phase = phaseFor(daysLeft);
  const today = state.days[dayKey(now)];
  const doneToday = today?.questions ?? 0;
  const goal = state.settings.dailyGoal;

  const tasks: PlanTask[] = [];

  if (dueCardCount > 0) {
    tasks.push({
      id: 'task.review',
      kind: 'review',
      title: `Ôn tập ${dueCardCount} câu đến hạn`,
      detail:
        'Đây là những câu bạn từng sai hoặc đoán trúng. Ôn đúng ngày đến hạn cho hiệu quả ghi nhớ cao nhất.',
      minutes: Math.max(5, Math.round(dueCardCount * 1.2)),
      href: '#/review',
      done: false,
      priority: 0,
    });
  }

  const weak = rankWeakTopics(state.mastery, 2);
  const primary = weak[0];
  if (primary) {
    tasks.push({
      id: 'task.drill',
      kind: 'drill',
      title: `Luyện ${Math.round(goal * phase.mix.drill * 2)} câu: ${primary.name}`,
      detail: 'Chuyên đề đang khiến bạn mất nhiều điểm nhất theo trọng số xuất hiện trong đề.',
      minutes: Math.round(goal * phase.mix.drill * 2.5),
      href: `#/practice?topic=${encodeURIComponent(primary.topicId)}`,
      done: doneToday >= goal,
      priority: 1,
    });
  }

  const lastMock = [...state.attempts].reverse().find((a) => a.mode === 'full' || a.mode === 'section');
  const daysSinceMock = lastMock ? Math.floor((now.getTime() - lastMock.createdAt) / 86400000) : 99;
  const mockEvery = phase.id === 'finishing' ? 3 : phase.id === 'acceleration' ? 7 : 14;
  if (daysSinceMock >= mockEvery) {
    tasks.push({
      id: 'task.mock',
      kind: 'mock',
      title: phase.id === 'finishing' ? 'Thi thử full 3 phần' : 'Thi thử một phần theo thời gian thật',
      detail:
        'Điểm số chỉ đáng tin khi được đo trong đúng điều kiện áp lực thời gian. Đã ' +
        (daysSinceMock >= 99 ? 'chưa có lần thi thử nào' : `${daysSinceMock} ngày kể từ lần gần nhất`) +
        '.',
      minutes: phase.id === 'finishing' ? 195 : 75,
      href: '#/exam',
      done: false,
      priority: 2,
    });
  }

  const secondary = weak[1];
  if (secondary && phase.mix.learn >= 0.2) {
    tasks.push({
      id: 'task.learn',
      kind: 'learn',
      title: `Học lại lý thuyết: ${secondary.name}`,
      detail: 'Làm 5 câu mức nhận biết — thông hiểu để kiểm tra xem lỗ hổng nằm ở đâu.',
      minutes: Math.round(goal * phase.mix.learn * 2),
      href: `#/practice?topic=${encodeURIComponent(secondary.topicId)}&difficulty=easy`,
      done: false,
      priority: 3,
    });
  }

  return {
    date: dayKey(now),
    phase,
    daysLeft,
    tasks: tasks.sort((a, b) => a.priority - b.priority),
    totalMinutes: tasks.reduce((n, t) => n + t.minutes, 0),
  };
}

/**
 * Cac moc theo tuan tu nay den ngay thi. Duong tien do dung ham noi suy hoi
 * lom: tien bo dau lo trinh nhanh hon, ve cuoi cham lai — sat voi thuc te hon
 * la chia deu tuyen tinh, va nho vay nguoi hoc khong bi "hut" o giai doan cuoi.
 */
export function buildMilestones(
  currentProjected: number,
  targetScore: number,
  examDate: string | null,
  mastery: Record<string, TopicMastery>,
  now: Date = new Date(),
): WeeklyMilestone[] {
  const daysLeft = examDate ? daysUntil(examDate, now) : 56;
  if (daysLeft <= 0) return [];

  const weeks = Math.max(1, Math.min(26, Math.ceil(daysLeft / 7)));
  const weak = rankWeakTopics(mastery, weeks * 2);
  const gap = Math.max(0, Math.min(MAX_TOTAL_SCORE, targetScore) - currentProjected);

  const milestones: WeeklyMilestone[] = [];
  for (let i = 0; i < weeks; i += 1) {
    const progress = Math.pow((i + 1) / weeks, 0.7);
    const start = addDays(now, i * 7);
    const phase = phaseFor(daysLeft - i * 7);
    milestones.push({
      weekIndex: i + 1,
      startDate: dayKey(start),
      label: `Tuần ${i + 1} — ${phase.name}`,
      targetScore: Math.round((currentProjected + gap * progress) * 10) / 10,
      focusTopics: [weak[i * 2], weak[i * 2 + 1]]
        .filter((t): t is NonNullable<typeof t> => Boolean(t))
        .map((t) => topicName(t.topicId)),
    });
  }
  return milestones;
}
