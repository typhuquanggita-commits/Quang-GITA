import {
  ABSORPTION_TIERS,
  ACTION_LEVELS,
  GITA_PILLARS,
  HABITS,
  PRACTITIONER_LEVELS,
  TIER_BY_ID,
  type AbsorptionTier,
  type ActionLevel,
  type Habit,
  type PractitionerLevel,
} from '../data/gita';
import { MAX_LEVEL } from '../data/curriculum';
import { findQuestion } from '../data/questions';
import { TOPICS, topicName } from '../data/topics';
import { activeWorksheets } from '../data/worksheets';
import type {
  AbsorptionTierId,
  ActionLevelId,
  GitaPillarId,
  PersistedState,
  PractitionerLevelId,
  Role,
} from '../types';
import { clamp01, currentStreak, summarize } from './analytics';
import { addDays, dayKey } from './format';
import { stageKpi } from './progression';
import { dueCards } from './srs';

/**
 * MO THUC GITA — TANG TINH TOAN
 *
 * Tep nay tra loi bon cau hoi:
 *   1. Bon TRU COT dang duoc xay den dau? (G Goal, I Inspirits, T Talent, A Action)
 *   2. Nguoi hoc dang o TANG HAP THU nao, va thieu gi de len tang?
 *   3. Nguoi day dang o CAP CHUYEN MON nao?
 *   4. Theo quy tac 20/80, 20% viec nao dang tao ra 80% ket qua ngay luc nay?
 *
 * Tat ca deu la ham thuan: nhan trang thai, tra ket luan. Nho vay moi ket luan
 * ma he thong dua ra cho nguoi hoc deu kiem chung duoc bang bai test.
 */

/* ── Chỉ số bốn trụ cột ────────────────────────────────────────────────── */

export interface PillarScore {
  pillar: GitaPillarId;
  /** 0..1 — trụ cột này đang được xây đến đâu. */
  value: number;
  /** Các thành phần cấu thành, để người học biết chính xác chỗ nào đang hụt. */
  parts: ReadonlyArray<{ label: string; value: number }>;
  /** Câu giải thích và việc cần làm tiếp. */
  note: string;
}

/**
 * Do bon tru cot.
 *
 * Vi sao can chi so nay: hau het nguoi hoc chi xay tru A (hanh dong) va bo trong
 * ba tru con lai — roi khong hieu vi sao cham chi ma khong tien bo. Chi so bon
 * tru cot lam cho su mat can bang do hien ra thanh mot con so.
 */
export function pillarScores(state: PersistedState, now: Date = new Date()): PillarScore[] {
  const subject = state.settings.scienceSubject;
  const relevantTopics = TOPICS.filter((t) => t.section !== 'science' || t.subject === subject);
  const practiced = relevantTopics.filter((t) => (state.mastery[t.id]?.attempts ?? 0) > 0).length;

  /* G — Goal: hệ thống mục tiêu có nối được ba tầng với nhau không. */
  const goalParts = [
    { label: 'Đã đặt điểm mục tiêu', value: state.settings.targetScore > 0 ? 1 : 0 },
    { label: 'Đã đặt ngày thi', value: state.settings.examDate ? 1 : 0 },
    { label: 'Đã có bản đồ năng lực', value: practiced > 0 ? 1 : 0 },
    {
      label: 'Mục tiêu nối được xuống việc hôm nay',
      value: clamp01((state.days[dayKey(now)]?.questions ?? 0) / Math.max(1, state.settings.dailyGoal)),
    },
  ];

  /* I — Inspirits: nội lực đo bằng thứ còn lại sau khi cảm hứng đi mất. */
  const streak = currentStreak(state.days, now);
  const habitRate = averageHabitRate(state, now);
  const finished = state.attempts.filter((a) => a.status === 'submitted').length;
  const started = state.attempts.length;
  const persistence = started === 0 ? 0 : finished / started;
  const inspiritParts = [
    { label: 'Chuỗi ngày liên tiếp', value: clamp01(streak / 14) },
    { label: 'Giữ thói quen 28 ngày', value: habitRate },
    { label: 'Không bỏ dở bài đã bắt đầu', value: persistence },
    { label: 'Khai báo mức tự tin trung thực', value: declaredConfidenceRatio(state) },
  ];

  /* T — Talent: phần vượt trội, tốc độ và độ tập trung. */
  const levels = relevantTopics.map((t) => state.tracks[t.id]?.level ?? 1);
  const peakLevel = levels.length > 0 ? Math.max(...levels) : 1;
  const standout = relevantTopics.filter((t) => (state.mastery[t.id]?.mastery ?? 0) >= 0.8).length;
  const talentParts = [
    { label: 'Cấp cao nhất trên tuyến mạnh nhất', value: clamp01((peakLevel - 1) / (MAX_LEVEL - 1)) },
    { label: 'Số tuyến đạt mức vượt trội', value: clamp01(standout / 3) },
    { label: 'Tốc độ so với thời gian chuẩn', value: speedScore(state) },
    { label: 'Độ tập trung (ít câu sa lầy)', value: focusScore(state) },
  ];

  /* A — Action: khối lượng, kỷ luật 20/80, và xử lý đúng hạn. */
  let questions14 = 0;
  for (let d = 0; d < 14; d += 1) questions14 += state.days[dayKey(addDays(now, -d))]?.questions ?? 0;
  const cards = Object.values(state.srs);
  const overdue = dueCards(cards, now.getTime()).length;
  const onTime = cards.length === 0 ? 0 : clamp01(1 - overdue / cards.length);
  const pareto = paretoFocus(state);
  const actionParts = [
    { label: 'Khối lượng luyện 14 ngày', value: clamp01(questions14 / Math.max(1, state.settings.dailyGoal * 14 * 0.6)) },
    { label: 'Tập trung vào vùng 20/80', value: pareto.focusRatio },
    { label: 'Ôn tập xử lý đúng hạn', value: onTime },
    { label: 'Cấp độ hành động', value: clamp01((actionLevelOf(state, now).order - 1) / 4) },
  ];

  const build = (pillar: GitaPillarId, parts: ReadonlyArray<{ label: string; value: number }>, note: string): PillarScore => ({
    pillar,
    value: parts.reduce((sum, p) => sum + p.value, 0) / parts.length,
    parts,
    note,
  });

  return [
    build(
      'goal',
      goalParts,
      !state.settings.examDate
        ? 'Thiếu ngày thi. Không có ngày thi thì lộ trình không có mốc, và không có mốc thì không biết mình sớm hay muộn.'
        : practiced === 0
          ? 'Hãy làm ít nhất một phiếu luyện để hệ thống dựng được bản đồ năng lực — mục tiêu chỉ có nghĩa khi biết mình đang đứng ở đâu.'
          : 'Hệ thống mục tiêu của bạn đã nối được ba tầng: đích cuối, mốc tuần, và việc của hôm nay.',
    ),
    build(
      'inspirits',
      inspiritParts,
      streak === 0
        ? 'Chuỗi ngày đang bằng 0. Nội lực được xây bằng việc quay lại trong vòng 24 giờ sau mỗi lần đứt, chứ không bằng việc chờ có hứng.'
        : habitRate < 0.4
          ? 'Thói quen chưa bám. Hãy chọn đúng một thói quen hằng ngày và giữ nó hai tuần trước khi thêm thói quen thứ hai.'
          : `Chuỗi ${streak} ngày và tỉ lệ giữ thói quen ${Math.round(habitRate * 100)}% — đây chính là bằng chứng bản lĩnh, thứ không ai lấy đi được.`,
    ),
    build(
      'talent',
      talentParts,
      standout === 0
        ? 'Chưa có tuyến nào đạt mức vượt trội. Điểm cao không đến từ việc đều đều ở mọi thứ, mà từ vài chỗ vượt hẳn cộng với không để chỗ nào thủng.'
        : `Bạn đã có ${standout} tuyến vượt trội và tuyến mạnh nhất ở cấp ${peakLevel}. Tiếp tục mài sở trường thay vì chỉ vá chỗ thủng.`,
    ),
    build(
      'action',
      actionParts,
      overdue > 0
        ? `${overdue} câu trong sổ tay đang quá hạn. Đây là việc rẻ nhất trong vùng 20/80 — làm trước khi nạp thứ mới.`
        : pareto.focusRatio < 0.5
          ? `Công sức đang bị rải mỏng. ${pareto.topics.length} chuyên đề dưới đây chiếm 80% số điểm bạn có thể lấy lại: ${pareto.topics.slice(0, 3).map((t) => t.name).join(', ')}.`
          : `Bạn đang ở cấp hành động ${actionLevelOf(state, now).id} và dồn đúng sức vào vùng 20/80.`,
    ),
  ];
}

function averageHabitRate(state: PersistedState, now: Date): number {
  const daily = HABITS.filter((h) => h.cadence === 'daily');
  if (daily.length === 0) return 0;
  let sum = 0;
  for (const habit of daily) {
    const done = new Set(state.habits[habit.id]?.done ?? []);
    let hits = 0;
    for (let d = 0; d < 28; d += 1) if (done.has(dayKey(addDays(now, -d)))) hits += 1;
    sum += hits / 28;
  }
  return clamp01(sum / daily.length);
}

function declaredConfidenceRatio(state: PersistedState): number {
  let total = 0;
  let declared = 0;
  for (const attempt of state.attempts) {
    for (const response of Object.values(attempt.responses)) {
      if (response.value === null || response.value === '') continue;
      total += 1;
      if (response.confidence) declared += 1;
    }
  }
  return total === 0 ? 0 : declared / total;
}

/** Toc do: thoi gian thuc te so voi thoi gian muc tieu cua tung cau. */
function speedScore(state: PersistedState): number {
  let actual = 0;
  let target = 0;
  for (const attempt of state.attempts) {
    for (const [id, response] of Object.entries(attempt.responses)) {
      const question = findQuestion(id);
      if (!question || response.timeSpentMs === 0) continue;
      actual += response.timeSpentMs / 1000;
      target += question.estimatedSeconds;
    }
  }
  if (target === 0) return 0;
  // Bang hoac nhanh hon chuan = 1; cham gap doi = 0.
  return clamp01(2 - actual / target);
}

/** Tap trung: ti le cau KHONG bi sa lay qua gap doi thoi gian muc tieu. */
function focusScore(state: PersistedState): number {
  let total = 0;
  let sunk = 0;
  for (const attempt of state.attempts) {
    for (const [id, response] of Object.entries(attempt.responses)) {
      const question = findQuestion(id);
      if (!question || response.timeSpentMs === 0) continue;
      total += 1;
      if (response.timeSpentMs > question.estimatedSeconds * 2000) sunk += 1;
    }
  }
  return total === 0 ? 0 : clamp01(1 - sunk / total);
}

/** Chi so GITA tong hop, 0..100. Trung binh bon tru cot, khong uu ai tru nao. */
export function gitaIndex(state: PersistedState, now: Date = new Date()): number {
  const scores = pillarScores(state, now);
  return Math.round((scores.reduce((sum, s) => sum + s.value, 0) / scores.length) * 100);
}

/** Tru cot dang yeu nhat — noi mot gio bo ra tao ra khac biet lon nhat. */
export function weakestPillar(state: PersistedState, now: Date = new Date()): PillarScore {
  const scores = pillarScores(state, now);
  return scores.reduce((min, s) => (s.value < min.value ? s : min), scores[0] as PillarScore);
}

/* ── Quy tắc 20/80 ─────────────────────────────────────────────────────── */

export interface ParetoTopic {
  topicId: string;
  name: string;
  /** Số điểm có thể lấy lại = trọng số trong đề × khoảng còn thiếu. */
  potential: number;
  /** Tỉ lệ đóng góp trong tổng số điểm có thể lấy lại. */
  share: number;
  mastery: number;
}

export interface ParetoFocus {
  /** Tập tối thiểu các chuyên đề chiếm ~80% số điểm có thể lấy lại. */
  topics: ParetoTopic[];
  /** Tỉ lệ tổng số chuyên đề mà tập trên chiếm — càng nhỏ càng đúng tinh thần 20/80. */
  concentration: number;
  /** 0..1 — công sức 14 ngày qua có rơi đúng vào tập đó không. */
  focusRatio: number;
}

/**
 * Tim vung 20/80.
 *
 * Quy tac 20/80 chi huu ich khi tra loi duoc cau hoi CU THE: 20% nao. Ham nay
 * xep chu de theo "so diem co the lay lai" — trong so trong de nhan voi khoang
 * con thieu — roi cat o nguong 80% tich luy. Do la danh sach nen dồn suc vao.
 *
 * `focusRatio` doi chieu voi hanh vi that: cong suc 14 ngay qua co roi dung vao
 * danh sach do khong, hay dang bi rai deu.
 */
export function paretoFocus(state: PersistedState, now: Date = new Date()): ParetoFocus {
  const subject = state.settings.scienceSubject;
  const relevant = TOPICS.filter((t) => t.section !== 'science' || t.subject === subject);

  const ranked = relevant
    .map((topic) => {
      const mastery = state.mastery[topic.id]?.mastery ?? 0.5;
      return { topicId: topic.id, name: topic.name, mastery, potential: (1 - mastery) * topic.weight };
    })
    .sort((a, b) => b.potential - a.potential);

  const totalPotential = ranked.reduce((sum, t) => sum + t.potential, 0);
  const topics: ParetoTopic[] = [];
  let cumulative = 0;
  for (const entry of ranked) {
    const share = totalPotential > 0 ? entry.potential / totalPotential : 0;
    topics.push({ ...entry, share });
    cumulative += share;
    if (cumulative >= 0.8) break;
  }

  const focusSet = new Set(topics.map((t) => t.topicId));
  const since = addDays(now, -14).getTime();
  let inFocus = 0;
  let outFocus = 0;
  for (const record of Object.values(state.mastery)) {
    if ((record.lastPracticed ?? 0) < since) continue;
    if (focusSet.has(record.topicId)) inFocus += record.attempts;
    else outFocus += record.attempts;
  }

  return {
    topics,
    concentration: relevant.length > 0 ? topics.length / relevant.length : 0,
    focusRatio: inFocus + outFocus === 0 ? 0 : inFocus / (inFocus + outFocus),
  };
}

/* ── Cấp độ hành động A1..A5 ───────────────────────────────────────────── */

/**
 * Xac dinh cap do hanh dong.
 *
 * Cap duoc SUY RA tu hanh vi, khong phai tu tu khai — giong nhu tang hap thu.
 * Duyet tu cap cao xuong: dat du dieu kien mo khoa cua cap nao thi thuoc cap
 * ke tiep cap do.
 */
export function actionLevelOf(state: PersistedState, now: Date = new Date()): ActionLevel {
  const streak = currentStreak(state.days, now);
  const kpi1 = stageKpi(state, 1).kpi;
  const habitRate = averageHabitRate(state, now);
  const pareto = paretoFocus(state, now);
  const focusTopicsLevelled = pareto.topics.filter((t) => (state.tracks[t.topicId]?.level ?? 1) >= 2).length;
  const lastResult = state.results[state.results.length - 1];
  const lastAttempt = lastResult ? state.attempts.find((a) => a.id === lastResult.attemptId) : undefined;
  const onTimeMock = lastAttempt
    ? lastAttempt.sections.every((s) => s.elapsedMs / 1000 <= s.allowedSeconds)
    : false;
  const summary = summarize(state);
  const reachedTarget = summary.projected >= state.settings.targetScore;

  const unlocked: Record<ActionLevelId, boolean> = {
    A1: true,
    A2: streak >= 7,
    A3: kpi1 >= 0.8 && habitRate >= 0.6,
    A4: focusTopicsLevelled >= 3,
    A5: onTimeMock && reachedTarget,
  };

  let current: ActionLevel = ACTION_LEVELS[0] as ActionLevel;
  for (const level of ACTION_LEVELS) {
    if (unlocked[level.id]) current = level;
  }
  return current;
}

/* ── Tầng hấp thu ──────────────────────────────────────────────────────── */

export interface TierCriterion {
  label: string;
  current: number;
  required: number;
  met: boolean;
}

export interface TierStatus {
  tier: AbsorptionTier;
  next: AbsorptionTier | null;
  /** 0..1 — mức hoàn thành các điều kiện lên tầng. */
  progress: number;
  criteria: TierCriterion[];
}

/**
 * Xac dinh tang hap thu.
 *
 * Nguyen tac: tang duoc SUY RA tu hanh vi thuc, khong phai do nguoi hoc tu
 * khai. Mot nguoi tu nhan la "tu hoc duoc" nhung chuoi ngay hoc bang 0 thi van
 * o tang H1 — va he thong noi ro dieu do thay vi chieu long.
 */
export function tierStatus(state: PersistedState, now: Date = new Date()): TierStatus {
  const measures = measureLearner(state, now);

  let currentId: AbsorptionTierId = 'H1';
  for (const tier of [...ABSORPTION_TIERS].reverse()) {
    if (tier.id === 'H1') break;
    if (criteriaFor(previousTier(tier.id), measures).every((c) => c.met)) {
      currentId = tier.id;
      break;
    }
  }

  const tier = TIER_BY_ID.get(currentId) as AbsorptionTier;
  const nextIndex = ABSORPTION_TIERS.findIndex((t) => t.id === currentId) + 1;
  const next = ABSORPTION_TIERS[nextIndex] ?? null;
  const criteria = next ? criteriaFor(currentId, measures) : [];
  const met = criteria.filter((c) => c.met).length;

  return { tier, next, progress: criteria.length === 0 ? 1 : met / criteria.length, criteria };
}

function previousTier(id: AbsorptionTierId): AbsorptionTierId {
  const index = ABSORPTION_TIERS.findIndex((t) => t.id === id);
  return (ABSORPTION_TIERS[Math.max(0, index - 1)]?.id ?? 'H1') as AbsorptionTierId;
}

interface LearnerMeasures {
  worksheetsPassed: number;
  streak: number;
  kpiStage1: number;
  kpiStage2: number;
  kpiStage3: number;
  weeksSelfRun: number;
  tracksAtLevel4: number;
  projectedRatio: number;
}

function measureLearner(state: PersistedState, now: Date): LearnerMeasures {
  const summary = summarize(state);
  const subject = state.settings.scienceSubject;
  const sheets = activeWorksheets(subject);

  const tracksAtLevel4 = TOPICS.filter((t) => t.section !== 'science' || t.subject === subject).filter(
    (t) => (state.tracks[t.id]?.level ?? 1) >= 4,
  ).length;

  return {
    worksheetsPassed: sheets.filter((s) => state.worksheets[s.id]?.passed).length,
    streak: currentStreak(state.days, now),
    kpiStage1: stageKpi(state, 1).kpi,
    kpiStage2: stageKpi(state, 2).kpi,
    kpiStage3: stageKpi(state, 3).kpi,
    weeksSelfRun: countSelfRunWeeks(state, now),
    tracksAtLevel4,
    projectedRatio: state.settings.targetScore > 0 ? summary.projected / state.settings.targetScore : 0,
  };
}

/** So tuan lien tiep gan nhat co it nhat 4 ngay hoc — dau hieu tu chay duoc nhip tuan. */
function countSelfRunWeeks(state: PersistedState, now: Date): number {
  let weeks = 0;
  for (let w = 0; w < 12; w += 1) {
    let active = 0;
    for (let d = 0; d < 7; d += 1) {
      if ((state.days[dayKey(addDays(now, -(w * 7 + d)))]?.questions ?? 0) > 0) active += 1;
    }
    if (active >= 4) weeks += 1;
    else break;
  }
  return weeks;
}

function criteriaFor(from: AbsorptionTierId, m: LearnerMeasures): TierCriterion[] {
  const c = (label: string, current: number, required: number): TierCriterion => ({
    label,
    current,
    required,
    met: current >= required,
  });

  switch (from) {
    case 'H1':
      return [c('Phiếu luyện đã hoàn thành', m.worksheetsPassed, 10), c('Chuỗi ngày học liên tiếp', m.streak, 7)];
    case 'H2':
      return [
        c('KPI giai đoạn 1 (%)', Math.round(m.kpiStage1 * 100), 80),
        c('Tuần tự chạy trọn nhịp', m.weeksSelfRun, 2),
      ];
    case 'H3':
      return [
        c('Tuyến chuyên đề đạt cấp 4', m.tracksAtLevel4, 5),
        c('KPI giai đoạn 2 (%)', Math.round(m.kpiStage2 * 100), 85),
      ];
    case 'H4':
      return [
        c('Điểm dự báo so với mục tiêu (%)', Math.round(m.projectedRatio * 100), 100),
        c('KPI giai đoạn 3 (%)', Math.round(m.kpiStage3 * 100), 90),
      ];
    default:
      return [];
  }
}

/* ── Cấp chuyên môn ────────────────────────────────────────────────────── */

/**
 * Anh xa vai tro + bac trong he phan quyen sang cap chuyen mon GITA.
 * Hoc vien khong co cap chuyen mon — ho o truc tang hap thu.
 */
export function practitionerLevelOf(role: Role, rank: number): PractitionerLevelId | null {
  switch (role) {
    case 'student':
      return null;
    case 'mentor':
      return 'P1';
    case 'teacher':
      return rank >= 3 ? 'P3' : 'P2';
    case 'headTeacher':
      return rank >= 2 ? 'P5' : 'P4';
    case 'admin':
      return 'P5';
    default:
      return null;
  }
}

export function practitionerLevel(id: PractitionerLevelId | null): PractitionerLevel | null {
  return id ? (PRACTITIONER_LEVELS.find((p) => p.id === id) ?? null) : null;
}

export function practitionersFor(tier: AbsorptionTierId): PractitionerLevel[] {
  return PRACTITIONER_LEVELS.filter((p) => p.serves.includes(tier));
}

/* ── Thói quen ─────────────────────────────────────────────────────────── */

export interface HabitStatus {
  habit: Habit;
  doneToday: boolean;
  streak: number;
  rate28: number;
  unlocked: boolean;
}

export function habitsForTier(tier: AbsorptionTierId): Habit[] {
  const order = ABSORPTION_TIERS.findIndex((t) => t.id === tier);
  return HABITS.filter((h) => ABSORPTION_TIERS.findIndex((t) => t.id === h.fromTier) <= order);
}

export function habitStatus(
  state: PersistedState,
  habit: Habit,
  tier: AbsorptionTierId,
  now: Date = new Date(),
): HabitStatus {
  const done = new Set(state.habits[habit.id]?.done ?? []);

  let streak = 0;
  if (habit.cadence === 'daily') {
    const cursor = new Date(now);
    if (!done.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    while (done.has(dayKey(cursor))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
  } else {
    for (let w = 0; w < 26; w += 1) {
      let hit = false;
      for (let d = 0; d < 7; d += 1) {
        if (done.has(dayKey(addDays(now, -(w * 7 + d))))) {
          hit = true;
          break;
        }
      }
      if (!hit) break;
      streak += 1;
    }
  }

  let hits = 0;
  for (let d = 0; d < 28; d += 1) if (done.has(dayKey(addDays(now, -d)))) hits += 1;
  const window = habit.cadence === 'daily' ? 28 : 4;

  return {
    habit,
    doneToday: done.has(dayKey(now)),
    streak,
    rate28: Math.min(1, hits / window),
    unlocked: habitsForTier(tier).some((h) => h.id === habit.id),
  };
}

export function habitCompletionToday(
  state: PersistedState,
  tier: AbsorptionTierId,
  now: Date = new Date(),
): { done: number; total: number } {
  const daily = habitsForTier(tier).filter((h) => h.cadence === 'daily');
  const key = dayKey(now);
  const done = daily.filter((h) => (state.habits[h.id]?.done ?? []).includes(key)).length;
  return { done, total: daily.length };
}

/** Cap do cao nhat dat duoc tren mot tuyen bat ky. */
export function topTrackLevel(state: PersistedState): number {
  const levels = Object.values(state.tracks).map((t) => t.level);
  return levels.length === 0 ? 1 : Math.min(MAX_LEVEL, Math.max(...levels));
}

export { GITA_PILLARS, topicName };
