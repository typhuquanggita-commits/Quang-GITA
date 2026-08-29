import type { AppState, MissionAttempt, TrackId } from '@/types';
import type { Mission, Stage, Worksheet } from '@/data/catalog';
import { MISSIONS, stageById, stagesByTrack } from '@/data/catalog';
import { topicById } from '@/data/topics';
import { strandById } from '@/data/schools';
import { todayKey } from './storage';

/* ============================================================
   1. CHẤM KẾT QUẢ
   ============================================================ */

export interface ItemResult {
  partOrder: number;
  itemIndex: number;
  prompt: string;
  chosen: number | null;
  correct: number;
  isCorrect: boolean;
  skill: string;
  topicId: string;
  strand: string;
  steps: string[];
  choices: string[];
}

export interface PartResult {
  order: number;
  name: string;
  correct: number;
  total: number;
  kpi: number;
}

export interface GradeResult {
  correct: number;
  total: number;
  kpi: number;
  seconds: number;
  parts: PartResult[];
  items: ItemResult[];
  wrongSkills: string[];
  wrongTopics: string[];
  passed: boolean;
}

/** answers[partIndex][itemIndex] = chỉ số phương án đã chọn (null nếu bỏ trống). */
export function gradeWorksheet(
  ws: Worksheet,
  answers: (number | null)[][],
  seconds: number,
  kpiTarget: number,
): GradeResult {
  const items: ItemResult[] = [];
  const parts: PartResult[] = [];

  ws.parts.forEach((part, pi) => {
    let ok = 0;
    part.items.forEach((item, ii) => {
      const chosen = answers[pi]?.[ii] ?? null;
      const isCorrect = chosen === item.correct;
      if (isCorrect) ok += 1;
      items.push({
        partOrder: part.order,
        itemIndex: ii,
        prompt: item.prompt,
        chosen,
        correct: item.correct,
        isCorrect,
        skill: item.skill,
        topicId: item.topicId,
        strand: item.strand,
        steps: item.steps,
        choices: item.choices,
      });
    });
    parts.push({
      order: part.order,
      name: part.name,
      correct: ok,
      total: part.items.length,
      kpi: Math.round((ok / part.items.length) * 100),
    });
  });

  const total = items.length;
  const correct = items.filter((i) => i.isCorrect).length;
  const kpi = total ? Math.round((correct / total) * 100) : 0;
  const wrong = items.filter((i) => !i.isCorrect);

  return {
    correct,
    total,
    kpi,
    seconds,
    parts,
    items,
    wrongSkills: [...new Set(wrong.map((w) => w.skill))],
    wrongTopics: [...new Set(wrong.map((w) => w.topicId))],
    passed: kpi >= kpiTarget,
  };
}

/* ============================================================
   2. NHẬN XÉT TÌNH HÌNH + GIẢI PHÁP TỐI ƯU
   ============================================================ */

export interface Diagnosis {
  headline: string;
  tone: 'excellent' | 'good' | 'warn' | 'critical';
  observations: string[];
  solutions: string[];
  focusTopicIds: string[];
}

function paceNote(ws: Worksheet, seconds: number): string | null {
  const budget = ws.minutes * 60;
  if (seconds > budget * 1.4) {
    return `Thời gian làm bài ${Math.round(seconds / 60)} phút, vượt khá xa mức đề xuất ${ws.minutes} phút — cần luyện tốc độ trước khi nâng mức độ.`;
  }
  if (seconds < budget * 0.4) {
    return `Bạn hoàn thành trong ${Math.round(seconds / 60)} phút, nhanh hơn nhiều so với ${ws.minutes} phút đề xuất — nếu điểm chưa cao thì nguyên nhân thường là làm ẩu chứ không phải thiếu kiến thức.`;
  }
  return null;
}

export function diagnose(result: GradeResult, ws: Worksheet, mission: Mission): Diagnosis {
  const observations: string[] = [];
  const solutions: string[] = [];

  // Phân tích theo phần
  const weakParts = result.parts.filter((p) => p.kpi < 70);
  const p1 = result.parts.find((p) => p.order === 1);
  const p3 = result.parts.find((p) => p.order === 3);

  if (p1 && p1.kpi < 100 && p3 && p3.kpi === 100) {
    observations.push(
      'Bạn sai ở phần Khởi động nhưng lại làm đúng phần Thử thách — dấu hiệu điển hình của mất tập trung / làm ẩu, không phải hổng kiến thức.',
    );
    solutions.push(
      'Áp dụng quy tắc “đọc lại đề 1 lần trước khi chọn đáp án” cho mọi câu dễ. Trong đề thi thật, đây chính là nhóm câu làm mất 0,5–1,0 điểm oan.',
    );
  }

  if (weakParts.length === result.parts.length) {
    observations.push(
      `Cả ba phần đều dưới chuẩn (${result.parts.map((p) => `${p.correct}/${p.total}`).join(', ')}) — vấn đề nằm ở nền tảng của dạng bài, không phải ở một phần riêng lẻ.`,
    );
  } else {
    weakParts.forEach((p) => {
      observations.push(
        `${p.name}: đúng ${p.correct}/${p.total} (${p.kpi}%) — đây là phần cần xử lý trước.`,
      );
    });
  }

  // Phân tích theo kỹ năng sai
  const skillCount = new Map<string, number>();
  result.items
    .filter((i) => !i.isCorrect)
    .forEach((i) => skillCount.set(i.skill, (skillCount.get(i.skill) ?? 0) + 1));
  const topSkills = [...skillCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);

  topSkills.forEach(([skill, n]) => {
    observations.push(`Kỹ năng “${skill}” sai ${n} câu — đây là nguyên nhân trực tiếp làm rớt KPI.`);
  });

  // Gợi ý từ chuyên đề
  const focusTopicIds = [...new Set(result.wrongTopics)].slice(0, 3);
  focusTopicIds.forEach((tid) => {
    const t = topicById(tid);
    if (!t) return;
    if (t.pitfalls.length) {
      solutions.push(`[${t.name}] Rà lại lỗi hay gặp: ${t.pitfalls[0]}`);
    }
    if (t.techniques.length) {
      solutions.push(`[${t.name}] Kỹ thuật cần thuộc: ${t.techniques[0]}`);
    }
  });

  const pace = paceNote(ws, result.seconds);
  if (pace) observations.push(pace);

  // Kết luận theo mức KPI
  let headline: string;
  let tone: Diagnosis['tone'];
  if (result.kpi >= 90) {
    tone = 'excellent';
    headline = `Đạt KPI ${result.kpi}% — vượt chuẩn ${mission.kpiTarget}%. Bạn đã làm chủ mức độ này.`;
    if (!observations.length) {
      observations.push('Không có lỗi đáng kể. Toàn bộ các phần đều đạt hoặc vượt chuẩn.');
    }
    solutions.push(
      'Chuyển sang nhiệm vụ Thử thách hoặc nâng Level để tránh luyện lại vùng đã thành thạo (luyện quá mức ở vùng dễ là lãng phí thời gian ôn thi).',
    );
  } else if (result.kpi >= 75) {
    tone = 'good';
    headline = `KPI ${result.kpi}% — khá, nhưng chưa chạm chuẩn ${mission.kpiTarget}%.`;
    solutions.push(
      'Làm lại phiếu này với bộ đề mới (nội dung sẽ khác) và đặt mục tiêu tuyệt đối không lặp lại đúng lỗi cũ.',
    );
  } else if (result.kpi >= 50) {
    tone = 'warn';
    headline = `KPI ${result.kpi}% — cần củng cố trước khi đi tiếp.`;
    solutions.push(
      'Đọc kỹ lời giải từng câu sai, tự làm lại trên giấy (không nhìn đáp án), sau đó mới làm lại phiếu.',
    );
    solutions.push('Không nên nhận nhiệm vụ mức cao hơn cho đến khi phiếu này đạt ≥ 90%.');
  } else {
    tone = 'critical';
    headline = `KPI ${result.kpi}% — phần kiến thức nền của dạng này chưa vững.`;
    solutions.push(
      'Quay lại trang Chuyên đề tương ứng, học lại phần “Kỹ thuật cốt lõi” trước khi luyện tiếp.',
    );
    solutions.push('Hạ một mức độ và luyện chắc ở đó, tránh làm hỏng nhịp học vì mất tự tin.');
  }

  // Nhận xét theo mạch kiến thức
  const strands = [...new Set(result.items.filter((i) => !i.isCorrect).map((i) => i.strand))];
  if (strands.length === 1 && result.kpi < 90) {
    observations.push(
      `Toàn bộ lỗi tập trung vào mạch ${strandById(strands[0]).name} — tin tốt: chỉ cần xử lý một mạch là KPI sẽ bật lên.`,
    );
  } else if (strands.length >= 3) {
    observations.push(
      'Lỗi rải đều nhiều mạch kiến thức — nên giảm mức độ và luyện lại từng mạch một thay vì luyện phiếu tổng hợp.',
    );
  }

  return { headline, tone, observations, solutions, focusTopicIds };
}

/* ============================================================
   3. ĐỊNH HƯỚNG BƯỚC TIẾP THEO
   ============================================================ */

export type NextActionKind = 'lam-lai' | 'cung-co' | 'nhiem-vu-tiep' | 'thu-thach' | 'len-level' | 'len-giai-doan';

export interface NextAction {
  kind: NextActionKind;
  label: string;
  detail: string;
  primary: boolean;
  missionId?: string;
}

/** Số lượt đạt chuẩn cần có ở một mức độ để được nâng Level. */
export const LEVEL_UP_STREAK = 2;
/** Số nhiệm vụ đạt chuẩn tối thiểu trong một giai đoạn để được xét lên giai đoạn mới. */
export const STAGE_UP_PASSED = 15;

export function levelStats(state: AppState, track: TrackId, level: number) {
  const rel = state.attempts.filter((a) => a.level === level && missionTrack(a.missionId) === track);
  const passed = rel.filter((a) => a.passed);
  const last = rel.slice(-5);
  const avg = last.length ? Math.round(last.reduce((s, a) => s + a.kpi, 0) / last.length) : 0;
  return { attempts: rel.length, passed: passed.length, avgKpi: avg };
}

export function stageStats(state: AppState, stageId: string) {
  const rel = state.attempts.filter((a) => a.stageId === stageId);
  const passedMissions = new Set(rel.filter((a) => a.passed).map((a) => a.missionId));
  const last = rel.slice(-5);
  const avg = last.length ? Math.round(last.reduce((s, a) => s + a.kpi, 0) / last.length) : 0;
  return { attempts: rel.length, passedMissions: passedMissions.size, avgKpi: avg };
}

const missionTrackCache = new Map<string, TrackId>();
function missionTrack(missionId: string): TrackId {
  const cached = missionTrackCache.get(missionId);
  if (cached) return cached;
  const m = MISSIONS.find((x) => x.id === missionId);
  const t = (m?.track ?? 'thpt') as TrackId;
  missionTrackCache.set(missionId, t);
  return t;
}

/** Nhiệm vụ kế tiếp trong cùng giai đoạn. */
export function nextMissionAfter(mission: Mission): Mission | undefined {
  const inStage = MISSIONS.filter((m) => m.stageId === mission.stageId).sort((a, b) => a.order - b.order);
  return inStage.find((m) => m.order === mission.order + 1);
}

/** Nhiệm vụ đầu tiên ở mức độ cao hơn trong cùng luồng. */
export function firstMissionAtLevel(track: TrackId, level: number): Mission | undefined {
  return MISSIONS.find((m) => m.track === track && m.level === level);
}

export function planNext(state: AppState, mission: Mission, result: GradeResult): NextAction[] {
  const actions: NextAction[] = [];
  const stage = stageById(mission.stageId);
  const lvl = levelStats(state, mission.track, mission.level);
  const st = stageStats(state, mission.stageId);
  const next = nextMissionAfter(mission);

  if (result.kpi < 75) {
    actions.push({
      kind: 'lam-lai',
      label: 'Làm lại phiếu (đề mới)',
      detail:
        'Hệ thống sinh lại nội dung khác cùng dạng và cùng mức độ. Mục tiêu: sửa đúng những lỗi vừa mắc.',
      primary: true,
    });
    actions.push({
      kind: 'cung-co',
      label: 'Học lại chuyên đề',
      detail: 'Xem phần kỹ thuật cốt lõi và lỗi thường gặp của chuyên đề liên quan trước khi luyện tiếp.',
      primary: false,
    });
    return actions;
  }

  if (result.kpi < mission.kpiTarget) {
    actions.push({
      kind: 'lam-lai',
      label: 'Làm lại để chạm KPI 90%',
      detail: `Bạn đang ở ${result.kpi}%, còn thiếu ${mission.kpiTarget - result.kpi}% để đạt chuẩn nhiệm vụ.`,
      primary: true,
    });
    if (next) {
      actions.push({
        kind: 'nhiem-vu-tiep',
        label: `Sang ${next.id}`,
        detail: 'Đi tiếp và quay lại phiếu này sau — chỉ nên chọn nếu bạn đang bị kẹt tâm lý ở dạng này.',
        primary: false,
        missionId: next.id,
      });
    }
    return actions;
  }

  // Đã đạt KPI
  const canLevelUp =
    mission.level < 5 &&
    lvl.passed + 1 >= LEVEL_UP_STREAK &&
    (state.levelUnlocked[mission.track] ?? 1) <= mission.level;

  const canStageUp =
    stage.order < 5 &&
    st.passedMissions + 1 >= STAGE_UP_PASSED &&
    st.avgKpi >= stage.kpi &&
    (state.stageUnlocked[mission.track] ?? 1) <= stage.order;

  if (canStageUp) {
    const nextStage = stagesByTrack(mission.track).find((s) => s.order === stage.order + 1);
    actions.push({
      kind: 'len-giai-doan',
      label: `Mở khoá ${nextStage?.name ?? 'giai đoạn mới'}`,
      detail: `Bạn đã đạt chuẩn ở ${st.passedMissions + 1} nhiệm vụ của ${stage.name} với KPI trung bình ${st.avgKpi}% — đủ điều kiện lên giai đoạn mới.`,
      primary: true,
    });
  }

  if (canLevelUp) {
    actions.push({
      kind: 'len-level',
      label: `Nâng lên Level ${mission.level + 1}`,
      detail: `Đã đạt ≥ 90% ở ${lvl.passed + 1} phiếu Level ${mission.level}. Mức độ tiếp theo đã được mở khoá.`,
      primary: !canStageUp,
      missionId: firstMissionAtLevel(mission.track, mission.level + 1)?.id,
    });
  }

  if (next) {
    actions.push({
      kind: 'nhiem-vu-tiep',
      label: `Nhiệm vụ tiếp theo · ${next.id}`,
      detail: next.objective,
      primary: !canStageUp && !canLevelUp,
      missionId: next.id,
    });
  }

  actions.push({
    kind: 'thu-thach',
    label: 'Làm lại ở chế độ thử thách',
    detail: 'Cùng dạng bài nhưng đề mới và khó hơn — dùng để kiểm chứng độ vững trước khi lên mức.',
    primary: false,
  });

  return actions;
}

/* ============================================================
   4. CẬP NHẬT TRẠNG THÁI SAU MỖI LƯỢT LÀM
   ============================================================ */

export interface ApplyOutcome {
  state: AppState;
  levelUp: boolean;
  stageUp: boolean;
  newLevel?: number;
  newStage?: Stage;
  xpGained: number;
}

export function applyResult(
  state: AppState,
  mission: Mission,
  ws: Worksheet,
  result: GradeResult,
  variant: number,
): ApplyOutcome {
  const attempt: MissionAttempt = {
    id: `${mission.id}-${Date.now()}`,
    missionId: mission.id,
    worksheetId: ws.id,
    variant,
    correct: result.correct,
    total: result.total,
    kpi: result.kpi,
    seconds: result.seconds,
    at: new Date().toISOString(),
    level: mission.level,
    stageId: mission.stageId,
    wrongSkills: result.wrongSkills,
    wrongTopics: result.wrongTopics,
    passed: result.passed,
  };

  const prev = state.missionStatus[mission.id];
  const missionStatus = {
    ...state.missionStatus,
    [mission.id]: {
      tries: (prev?.tries ?? 0) + 1,
      bestKpi: Math.max(prev?.bestKpi ?? 0, result.kpi),
      passed: (prev?.passed ?? false) || result.passed,
      lastAt: attempt.at,
    },
  };

  const attempts = [...state.attempts, attempt];
  const interim: AppState = { ...state, attempts, missionStatus };

  // Thăng Level
  const lvl = levelStats(interim, mission.track, mission.level);
  const currentUnlocked = state.levelUnlocked[mission.track] ?? 1;
  let levelUp = false;
  let newLevel = currentUnlocked;
  if (
    result.passed &&
    mission.level < 5 &&
    lvl.passed >= LEVEL_UP_STREAK &&
    currentUnlocked <= mission.level
  ) {
    levelUp = true;
    newLevel = mission.level + 1;
  }

  // Thăng Giai đoạn
  const stage = stageById(mission.stageId);
  const st = stageStats(interim, mission.stageId);
  const currentStage = state.stageUnlocked[mission.track] ?? 1;
  let stageUp = false;
  let newStage: Stage | undefined;
  if (
    result.passed &&
    stage.order < 5 &&
    st.passedMissions >= STAGE_UP_PASSED &&
    st.avgKpi >= stage.kpi &&
    currentStage <= stage.order
  ) {
    stageUp = true;
    newStage = stagesByTrack(mission.track).find((s) => s.order === stage.order + 1);
  }

  const xpGained = result.passed ? mission.xp : Math.round(mission.xp * (result.kpi / 100) * 0.4);
  const day = todayKey();

  return {
    state: {
      ...interim,
      xp: state.xp + xpGained,
      levelUnlocked: { ...state.levelUnlocked, [mission.track]: Math.max(currentUnlocked, newLevel) },
      stageUnlocked: {
        ...state.stageUnlocked,
        [mission.track]: stageUp ? stage.order + 1 : currentStage,
      },
      studyLog: {
        ...state.studyLog,
        [day]: (state.studyLog[day] ?? 0) + Math.round(result.seconds / 60),
      },
    },
    levelUp,
    stageUp,
    newLevel: levelUp ? newLevel : undefined,
    newStage,
    xpGained,
  };
}

/* ============================================================
   5. TRẠNG THÁI MỞ KHOÁ CỦA NHIỆM VỤ
   ============================================================ */

export function isMissionUnlocked(state: AppState, mission: Mission): boolean {
  const stage = stageById(mission.stageId);
  const stageOk = stage.order <= (state.stageUnlocked[mission.track] ?? 1);
  const levelOk = mission.level <= (state.levelUnlocked[mission.track] ?? 1) + 1;
  return stageOk && levelOk;
}

export function missionLockReason(state: AppState, mission: Mission): string | null {
  const stage = stageById(mission.stageId);
  if (stage.order > (state.stageUnlocked[mission.track] ?? 1)) {
    return `Cần hoàn thành ${STAGE_UP_PASSED} nhiệm vụ đạt KPI ≥ 90% ở giai đoạn trước để mở khoá ${stage.name}.`;
  }
  if (mission.level > (state.levelUnlocked[mission.track] ?? 1) + 1) {
    return `Cần đạt KPI ≥ 90% ở ${LEVEL_UP_STREAK} phiếu Level ${mission.level - 1} để mở Level ${mission.level}.`;
  }
  return null;
}

/** Tổng quan tiến độ để hiển thị ở Dashboard. */
export function progressOverview(state: AppState, track: TrackId) {
  const rel = state.attempts.filter((a) => missionTrack(a.missionId) === track);
  const passedMissions = new Set(rel.filter((a) => a.passed).map((a) => a.missionId)).size;
  const last10 = rel.slice(-10);
  const avgKpi = last10.length ? Math.round(last10.reduce((s, a) => s + a.kpi, 0) / last10.length) : 0;
  const minutes = rel.reduce((s, a) => s + a.seconds, 0) / 60;
  const strandErrors = new Map<string, number>();
  rel.forEach((a) => a.wrongTopics.forEach((t) => {
    const topic = topicById(t);
    if (topic) strandErrors.set(topic.strand, (strandErrors.get(topic.strand) ?? 0) + 1);
  }));
  return {
    attempts: rel.length,
    passedMissions,
    avgKpi,
    minutes: Math.round(minutes),
    level: state.levelUnlocked[track] ?? 1,
    stage: state.stageUnlocked[track] ?? 1,
    strandErrors: [...strandErrors.entries()].sort((a, b) => b[1] - a[1]),
  };
}
