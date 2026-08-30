import { MAX_SECTION_SCORE, SECTIONS } from '../config';
import { TOPICS } from '../data/topics';
import type {
  AttemptResult,
  DayLog,
  PersistedState,
  Question,
  Response,
  SectionId,
  TopicMastery,
} from '../types';
import { difficultyToLogit, expectedAccuracy, probabilityCorrect } from './ability';
import { dayKey, daysUntil } from './format';
import { topicsInScope } from './section3';

/**
 * Cap nhat do thanh thao cua mot chu de bang trung binh truot co trong so.
 *
 * Diem moi khong phai 0/1 ma la "do bat ngo": tra loi dung mot cau kho day
 * mastery len nhieu hon, sai mot cau de keo xuong manh hon. Nho do chi so
 * phan anh nang luc chu khong phai do de cua bai luyen.
 */
export function updateMastery(
  current: TopicMastery | undefined,
  question: Question,
  correct: boolean,
  timeMs: number,
  now: number = Date.now(),
): TopicMastery {
  const base: TopicMastery = current ?? {
    topicId: question.topicId,
    mastery: 0.5,
    attempts: 0,
    correct: 0,
    timeMs: 0,
  };

  const expected = probabilityCorrect(
    masteryToAbility(base.mastery),
    difficultyToLogit(question.difficulty),
  );
  const surprise = (correct ? 1 : 0) - expected;

  // Toc do hoc giam dan khi da co nhieu du lieu — on dinh nhung van bat kip tien bo.
  const rate = Math.max(0.08, 0.35 / Math.sqrt(base.attempts + 1));
  const mastery = clamp01(base.mastery + rate * surprise);

  return {
    topicId: base.topicId,
    mastery,
    attempts: base.attempts + 1,
    correct: base.correct + (correct ? 1 : 0),
    timeMs: base.timeMs + timeMs,
    lastPracticed: now,
  };
}

/** mastery (0..1) ↔ nang luc logit, de dung chung thang do voi mo hinh Rasch. */
export function masteryToAbility(mastery: number): number {
  const m = Math.min(0.995, Math.max(0.005, mastery));
  return Math.log(m / (1 - m));
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Chuoi ngay hoc lien tiep tinh den hom nay (hom nay chua hoc van khong lam dut chuoi). */
export function currentStreak(days: Record<string, DayLog>, today: Date = new Date()): number {
  let streak = 0;
  const cursor = new Date(today);
  // Neu hom nay chua hoc, bat dau dem tu hom qua.
  if (!days[dayKey(cursor)]?.questions) cursor.setDate(cursor.getDate() - 1);
  for (;;) {
    const log = days[dayKey(cursor)];
    if (!log || log.questions === 0) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export interface ReadinessBreakdown {
  /** 0..100 — chi so san sang tong hop. */
  score: number;
  /** Bam sat diem du bao so voi muc tieu. */
  performance: number;
  /** Do phu chu de da luyen. */
  coverage: number;
  /** Do deu dan cua viec hoc trong 14 ngay gan nhat. */
  consistency: number;
  /** Kha nang lam kip gio. */
  pace: number;
  /** Do ben cua kien thuc (the SRS den han bi bo quen). */
  retention: number;
}

export interface ReadinessInput {
  projectedScore: number;
  targetScore: number;
  topicsPracticed: number;
  topicsTotal: number;
  activeDaysLast14: number;
  paceRatio: number;
  overdueCards: number;
  totalCards: number;
}

/**
 * Chi so san sang: khong phai mot con so ma la 5 tru cot.
 * Nguoi hoc thay ngay tru cot nao dang keo minh xuong thay vi doan mo.
 */
export function readiness(input: ReadinessInput): ReadinessBreakdown {
  const performance = clamp01(input.projectedScore / Math.max(1, input.targetScore));
  const coverage = input.topicsTotal > 0 ? clamp01(input.topicsPracticed / input.topicsTotal) : 0;
  const consistency = clamp01(input.activeDaysLast14 / 12);
  // paceRatio = thoi gian da dung / thoi gian cho phep. <= 1 la dat.
  const pace = clamp01(input.paceRatio <= 0 ? 0 : Math.min(1, 1.15 - Math.max(0, input.paceRatio - 0.85)));
  const retention =
    input.totalCards === 0 ? 1 : clamp01(1 - input.overdueCards / Math.max(1, input.totalCards));

  const score =
    100 *
    (0.4 * performance + 0.2 * coverage + 0.15 * consistency + 0.15 * pace + 0.1 * retention);

  return {
    score: Math.round(score),
    performance: Math.round(performance * 100),
    coverage: Math.round(coverage * 100),
    consistency: Math.round(consistency * 100),
    pace: Math.round(pace * 100),
    retention: Math.round(retention * 100),
  };
}

export type InsightTone = 'critical' | 'warning' | 'info' | 'positive';

export interface Insight {
  id: string;
  tone: InsightTone;
  title: string;
  detail: string;
  /** Duong dan hanh dong ngay (hash route). */
  action?: { label: string; href: string };
}

export interface InsightInput {
  latest: AttemptResult | undefined;
  history: readonly AttemptResult[];
  overdueCards: number;
  streak: number;
  targetScore: number;
  examDate: string | null;
  weakTopics: ReadonlyArray<{ name: string; mastery: number }>;
  blankAnswers: number;
}

/**
 * Sinh nhan xet co the hanh dong ngay. Moi nhan xet phai tra loi duoc
 * "lam gi tiep theo", khong chi mo ta so lieu.
 */
export function buildInsights(input: InsightInput): Insight[] {
  const out: Insight[] = [];

  if (input.blankAnswers > 0) {
    out.push({
      id: 'blank',
      tone: 'critical',
      title: `${input.blankAnswers} câu bỏ trống ở bài gần nhất`,
      detail:
        'HSA không trừ điểm câu sai. Bỏ trống là mất điểm chắc chắn, còn khoanh bừa vẫn còn 25% cơ hội. Quy tắc: còn 2 phút thì điền hết các ô trống.',
      action: { label: 'Xem lại bài', href: '#/review' },
    });
  }

  const luckyOrShaky = input.latest?.sections.reduce((n, s) => n + s.confidentWrong, 0) ?? 0;
  if (luckyOrShaky >= 3) {
    out.push({
      id: 'confident-wrong',
      tone: 'critical',
      title: `${luckyOrShaky} câu sai nhưng bạn tưởng mình đúng`,
      detail:
        'Đây là lỗ hổng nguy hiểm nhất vì bạn không biết là mình không biết. Những câu này đã được đưa lên đầu sổ tay lỗi sai.',
      action: { label: 'Mở sổ tay lỗi sai', href: '#/review' },
    });
  }

  if (input.overdueCards >= 10) {
    out.push({
      id: 'srs-overdue',
      tone: 'warning',
      title: `${input.overdueCards} thẻ ôn tập quá hạn`,
      detail:
        'Kiến thức đã học đang phai nhạt. Ôn tập quá hạn lâu làm giảm hiệu quả của cả thời gian bạn đã đầu tư trước đó.',
      action: { label: 'Ôn tập ngay', href: '#/review' },
    });
  }

  if (input.history.length >= 2) {
    const last = input.history[input.history.length - 1];
    const prev = input.history[input.history.length - 2];
    if (last && prev) {
      const delta = last.total - prev.total;
      if (delta >= 4) {
        out.push({
          id: 'trend-up',
          tone: 'positive',
          title: `Tăng ${delta.toFixed(1)} điểm so với lần trước`,
          detail: 'Đã có đà. Giữ nhịp làm đề thử đều đặn để biến tiến bộ thành ổn định.',
        });
      } else if (delta <= -4) {
        out.push({
          id: 'trend-down',
          tone: 'warning',
          title: `Giảm ${Math.abs(delta).toFixed(1)} điểm so với lần trước`,
          detail:
            'Một lần giảm chưa phải xu hướng. Kiểm tra lại điều kiện làm bài: đủ ngủ, đủ thời gian, có bị ngắt quãng không.',
        });
      }
    }
  }

  const weakest = input.weakTopics[0];
  if (weakest && weakest.mastery < 0.5) {
    out.push({
      id: 'weak-topic',
      tone: 'warning',
      title: `Điểm yếu rõ nhất: ${weakest.name}`,
      detail:
        'Chuyên đề này đang kéo điểm tổng xuống nhiều nhất theo trọng số xuất hiện trong đề. Luyện tập trung 20 câu sẽ cho mức cải thiện lớn nhất trên mỗi phút bỏ ra.',
      action: { label: 'Luyện chuyên đề này', href: '#/practice' },
    });
  }

  if (input.examDate) {
    const remaining = daysUntil(input.examDate);
    if (remaining >= 0 && remaining <= 14) {
      out.push({
        id: 'exam-near',
        tone: 'info',
        title: remaining === 0 ? 'Hôm nay là ngày thi' : `Còn ${remaining} ngày đến ngày thi`,
        detail:
          remaining <= 3
            ? 'Giai đoạn này không học kiến thức mới nữa. Chỉ đọc lại sổ tay lỗi sai và ngủ đủ giấc.'
            : 'Ưu tiên đề thi thử full và sổ tay lỗi sai. Kiến thức mới ở giai đoạn này hiếm khi kịp chín.',
      });
    }
  }

  if (input.streak >= 7) {
    out.push({
      id: 'streak',
      tone: 'positive',
      title: `Chuỗi ${input.streak} ngày liên tiếp`,
      detail: 'Đều đặn quan trọng hơn bùng nổ. Giữ chuỗi bằng mức tối thiểu 10 câu vào những ngày bận.',
    });
  }

  const order: Record<InsightTone, number> = { critical: 0, warning: 1, info: 2, positive: 3 };
  return out.sort((a, b) => order[a.tone] - order[b.tone]);
}

/** Tinh so cau bo trong o bai lam gan nhat. */
export function countBlanks(responses: Record<string, Response>, questionIds: readonly string[]): number {
  let blanks = 0;
  for (const id of questionIds) {
    const value = responses[id]?.value;
    if (value === null || value === undefined || value === '') blanks += 1;
  }
  return blanks;
}

/** Tong hop nhanh cho man hinh chinh. */
export interface DashboardSummary {
  projected: number;
  latestTotal: number | null;
  bestTotal: number | null;
  attempts: number;
  streak: number;
  todayQuestions: number;
  gapToTarget: number;
}

export function summarize(state: PersistedState): DashboardSummary {
  const results = state.results;
  const latest = results[results.length - 1];
  const projected = latest?.projected ?? estimateProjectedFromMastery(state);
  const best = results.reduce<number | null>((m, r) => (m === null || r.total > m ? r.total : m), null);
  const today = state.days[dayKey()];

  return {
    projected,
    latestTotal: latest?.total ?? null,
    bestTotal: best,
    attempts: results.length,
    streak: currentStreak(state.days),
    todayQuestions: today?.questions ?? 0,
    gapToTarget: state.settings.targetScore - projected,
  };
}

/**
 * Khi chua co bai thi thu nao, du bao diem tu do thanh thao cac chu de.
 *
 * Chuoi quy doi phai GIONG HET chuoi ma bai dinh vi va lo trinh dung: do
 * thanh thao → nang luc theta → ti le dung ky vong tren phan bo do kho chuan
 * → diem tren thang 50 moi phan. Truoc day ham nay nhan thang do thanh thao
 * voi 50, nen cung mot nguoi hoc nhin thay hai con so khac nhau o hai man
 * hinh — va khong cach nao biet con so nao dung.
 *
 * Chi tinh cac chuyen de NAM TRONG chuong trinh cua nguoi hoc: chuyen de cua
 * to hop khong chon khong xuat hien trong de cua ho nen khong duoc keo diem
 * du bao xuong.
 */
export function estimateProjectedFromMastery(state: PersistedState): number {
  const relevant = topicsInScope(state.settings.section3, TOPICS);

  let total = 0;
  for (const spec of SECTIONS) {
    const topics = relevant.filter((t) => t.section === spec.id);
    const weight = topics.reduce((n, t) => n + t.weight, 0);
    if (weight <= 0) {
      total += expectedAccuracy(masteryToAbility(0.5)) * MAX_SECTION_SCORE;
      continue;
    }
    const weighted =
      topics.reduce((n, t) => n + (state.mastery[t.id]?.mastery ?? 0.5) * t.weight, 0) / weight;
    total += expectedAccuracy(masteryToAbility(weighted)) * MAX_SECTION_SCORE;
  }
  return total;
}

/** Quy uoc: topicId co dang `<section>.<slug>`. */
export function sectionOfTopic(topicId: string): SectionId | null {
  const prefix = topicId.split('.')[0];
  const match = SECTIONS.find((s) => s.id === prefix);
  return match ? match.id : null;
}
