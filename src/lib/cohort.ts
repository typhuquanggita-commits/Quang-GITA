import { MAX_TOTAL_SCORE } from '../config';
import { LEVELS, MAX_LEVEL, STAGES, STAGE_PROMOTION_KPI } from '../data/curriculum';
import { PILLAR_BY_ID } from '../data/gita';
import { TOPICS, topicName } from '../data/topics';
import type { PersistedState } from '../types';
import { currentStreak, estimateProjectedFromMastery } from './analytics';
import { dayKey } from './format';
import { gitaIndex, paretoFocus, tierStatus, weakestPillar } from './gita';
import { highestLevel } from './permissions';
import { recommendedWorksheets, stageKpi, trackStatus } from './progression';
import { dueCards } from './srs';
import { displayNameOf, importState } from './storage';

/**
 * LOP HOC
 *
 * Van de kien truc phai noi thang: HSA365 khong co may chu. Toan bo du lieu
 * hoc tap nam trong trinh duyet cua chinh nguoi hoc. Vay lam sao mot giao vien
 * nhin duoc ca lop?
 *
 * Cau tra loi khong phai la dung mot may chu tam bo, ma la dung chinh thu da
 * co: TEP XUAT CUA NGUOI HOC LA DINH DANG TRAO DOI. No da duoc danh phien ban,
 * da co buoc di tru, va da duoc chuan hoa chat che khi nhap. Nguoi hoc gui tep,
 * giao vien nap vao, va co ngay mot bang lop that voi so lieu that.
 *
 * Danh doi duoc noi ro voi nguoi dung thay vi giau di:
 *   + Khong can may chu, khong can tai khoan, du lieu khong roi khoi may ai
 *     tru khi chinh nguoi hoc gui di.
 *   + Chay duoc offline hoan toan.
 *   − Bang lop la anh chup tai thoi diem xuat, khong phai truc tuyen.
 *   − Giao vien phai chu dong xin tep; khong tu dong dong bo.
 *
 * Khi trien khai co may chu, tang nay khong phai viet lai: chi can doi nguon
 * cua `loadSnapshot` tu tep sang API. Moi phep tinh ben duoi giu nguyen.
 */

export interface LearnerSnapshot {
  /** Khoa cuc bo trong phien lam viec, khong phai danh tinh that. */
  id: string;
  name: string;
  /** Thoi diem tep duoc xuat, neu tep co ghi. */
  exportedAt: number | null;
  state: PersistedState;
}

export interface LearnerRow {
  snapshot: LearnerSnapshot;
  /** Diem du bao tren thang 150. */
  projected: number;
  /** Cap do cao nhat dat duoc tren mot tuyen bat ky. */
  topLevel: number;
  /** Cap do trung binh cua toan bo cac tuyen. */
  averageLevel: number;
  stage: number;
  stageName: string;
  kpi: number;
  coverage: number;
  /** Du dieu kien xet chuyen giai doan. */
  stageEligible: boolean;
  /** Cac tuyen dang du dieu kien len cap. */
  levelUpReady: readonly { topicId: string; topicName: string; level: number }[];
  gita: number;
  weakestPillarName: string;
  streak: number;
  dueCards: number;
  /** So ngay ke tu lan hoat dong gan nhat. `null` = chua hoat dong lan nao. */
  daysSinceActive: number | null;
  /** Ba chuyen de nen don suc vao, theo 20/80. */
  focusTopics: readonly string[];
  /** Cong suc 14 ngay qua co roi dung vung 20/80 khong (0..1). */
  focusRatio: number;
  flags: readonly LearnerFlag[];
}

export type FlagTone = 'bad' | 'warn' | 'ok';

export interface LearnerFlag {
  id: string;
  label: string;
  tone: FlagTone;
  /** Viec cu the nen lam, khong phai mot loi nhan xet. */
  action: string;
}

/**
 * Doc mot tep xuat thanh mot ban ghi hoc vien.
 *
 * Di qua `importState` nen huong tron bo chuan hoa da co: vai tro la bi dua ve
 * `student`, cap bac bi chan trong khung, cai dat bi ep dung mien gia tri. Mot
 * tep hong khong the lam hong bang lop.
 */
export function loadSnapshot(fileName: string, json: string): LearnerSnapshot {
  const imported = importState(json);

  // Mot tep duoc nap VOI TU CACH ho so hoc vien thi la ho so hoc vien, du no
  // tu khai vai tro gi. `sanitizeProfile` chi loai vai tro KHONG TON TAI; o
  // day rang buoc chat hon vi ngu canh da xac dinh: khong the co mot "Super
  // Admin" nam trong bang lop. Dieu nay khong phai chan leo thang quyen (bang
  // lop khong bao gio doc quyen tu ho so nap vao) ma la giu cho du lieu dung
  // nghia — mot ban ghi noi doi ve chinh no se lam sai moi thu doc no ve sau.
  const state: PersistedState = {
    ...imported,
    profile: { ...imported.profile, role: 'student', rank: 1 },
  };
  const parsed: unknown = JSON.parse(json);
  const exportedAt =
    typeof parsed === 'object' && parsed !== null && 'exportedAt' in parsed
      ? Date.parse(String((parsed as Record<string, unknown>)['exportedAt']))
      : Number.NaN;

  return {
    id: `${fileName}:${state.profile.createdAt}`,
    name: displayNameOf(state.profile),
    exportedAt: Number.isFinite(exportedAt) ? exportedAt : null,
    state,
  };
}

/** Ngay hoat dong gan nhat, suy tu nhat ky ngay. */
export function lastActiveAt(state: PersistedState): number | null {
  const days = Object.keys(state.days).sort();
  const last = days[days.length - 1];
  if (!last) return null;
  const parsed = Date.parse(last);
  return Number.isFinite(parsed) ? parsed : null;
}

export function buildRow(snapshot: LearnerSnapshot, now: Date = new Date()): LearnerRow {
  const state = snapshot.state;
  const kpi = stageKpi(state, state.stage);
  const pareto = paretoFocus(state, now);
  const weakest = weakestPillar(state, now);

  const levels = Object.values(state.tracks).map((t) => t.level);
  const averageLevel =
    levels.length === 0 ? 1 : levels.reduce((n, x) => n + x, 0) / levels.length;

  const levelUpReady = TOPICS.map((topic) => {
    const status = trackStatus(state, topic.id);
    return status.canLevelUp
      ? { topicId: topic.id, topicName: topic.name, level: status.level }
      : null;
  }).filter((x): x is { topicId: string; topicName: string; level: number } => x !== null);

  const last = lastActiveAt(state);
  const daysSinceActive =
    last === null ? null : Math.max(0, Math.floor((now.getTime() - last) / 86_400_000));

  const row: Omit<LearnerRow, 'flags'> = {
    snapshot,
    projected: estimateProjectedFromMastery(state),
    topLevel: highestLevel(state),
    averageLevel,
    stage: state.stage,
    stageName: STAGES.find((s) => s.stage === state.stage)?.name ?? '',
    kpi: kpi.kpi,
    coverage: kpi.coverage,
    stageEligible: kpi.eligible,
    levelUpReady,
    gita: gitaIndex(state, now),
    weakestPillarName: PILLAR_BY_ID.get(weakest.pillar)?.name ?? '',
    streak: currentStreak(state.days, now),
    dueCards: dueCards(Object.values(state.srs), now.getTime()).length,
    daysSinceActive,
    focusTopics: pareto.topics.slice(0, 3).map((t) => topicName(t.topicId)),
    focusRatio: pareto.focusRatio,
  };

  return { ...row, flags: flagsFor(row) };
}

/**
 * Canh bao cho mot hoc vien.
 *
 * Nguyen tac: MOI CANH BAO PHAI KEM MOT VIEC CU THE. Mot bang lop chi to do
 * cac o "yeu", "cham" thi giao vien doc xong van khong biet lam gi — va se
 * ngung doc no sau vai tuan. Nen o day, canh bao nao cung tra loi duoc cau
 * "vay toi lam gi bay gio".
 */
export function flagsFor(row: Omit<LearnerRow, 'flags'>): LearnerFlag[] {
  const flags: LearnerFlag[] = [];

  if (row.daysSinceActive === null) {
    flags.push({
      id: 'never',
      label: 'Chưa bắt đầu',
      tone: 'bad',
      action: 'Gọi trực tiếp và ngồi cùng buổi đầu tiên. Người chưa vào lần nào hiếm khi tự vào.',
    });
  } else if (row.daysSinceActive >= 7) {
    flags.push({
      id: 'inactive',
      label: `Nghỉ ${row.daysSinceActive} ngày`,
      tone: 'bad',
      action: 'Nhắn hỏi trước khi giao thêm bài. Giao bài cho người đang mất đà chỉ làm họ tránh xa thêm.',
    });
  } else if (row.daysSinceActive >= 3) {
    flags.push({
      id: 'slipping',
      label: `Ngắt nhịp ${row.daysSinceActive} ngày`,
      tone: 'warn',
      action: 'Giao một phiếu ngắn cấp thấp hơn hiện tại để lấy lại đà, đừng giao phiếu khó.',
    });
  }

  if (row.dueCards >= 20) {
    flags.push({
      id: 'srs',
      label: `${row.dueCards} thẻ quá hạn`,
      tone: 'warn',
      action: 'Yêu cầu dọn sổ tay lỗi sai trước khi làm phiếu mới. Nợ ôn tập càng để càng đắt.',
    });
  }

  if (row.focusRatio < 0.4 && row.streak > 0) {
    flags.push({
      id: 'misfocus',
      label: 'Học chăm nhưng lệch trọng tâm',
      tone: 'warn',
      action: `Chuyển công sức sang: ${row.focusTopics.join(', ')}. Đây là dạng học viên dễ nản nhất vì cố gắng thật mà điểm không lên.`,
    });
  }

  if (row.levelUpReady.length > 0) {
    flags.push({
      id: 'levelup',
      label: `${row.levelUpReady.length} tuyến chờ duyệt lên cấp`,
      tone: 'ok',
      action: 'Duyệt sớm. Để một tuyến đã đủ điều kiện nằm chờ là lấy mất phần thưởng đúng lúc nó có giá trị nhất.',
    });
  }

  if (row.stageEligible) {
    flags.push({
      id: 'stage',
      label: 'Đủ điều kiện chuyển giai đoạn',
      tone: 'ok',
      action: 'Xét chuyển giai đoạn và báo cho gia đình — đây là cột mốc đáng ăn mừng.',
    });
  }

  return flags;
}

/**
 * Xep thu tu uu tien cho giao vien.
 *
 * Khong xep theo diem cao thap. Xep theo AI CAN DUOC CHU Y TRUOC — vi mot bang
 * lop xep theo diem se khien nguoi o giua bang khong bao gio duoc nhin toi, va
 * do chinh la nhom co the cuu duoc nhieu nhat.
 */
export function attentionOrder(rows: readonly LearnerRow[]): LearnerRow[] {
  const weight = (row: LearnerRow) =>
    row.flags.reduce((n, f) => n + (f.tone === 'bad' ? 100 : f.tone === 'warn' ? 40 : 5), 0);
  return [...rows].sort((a, b) => weight(b) - weight(a) || a.projected - b.projected);
}

export interface CohortSummary {
  learners: number;
  averageProjected: number;
  averageGita: number;
  /** So nguoi khong hoat dong tu 7 ngay tro len. */
  inactive: number;
  /** So nguoi dang cho duyet len cap hoac len giai doan. */
  awaitingApproval: number;
  /** So nguoi da dat nguong KPI chuyen giai doan. */
  stageReady: number;
  /** Chuyen de yeu nhat cua ca lop, theo so nguoi co no trong vung 20/80. */
  commonGaps: readonly { topicName: string; learners: number }[];
}

export function summarizeCohort(rows: readonly LearnerRow[]): CohortSummary {
  const gaps = new Map<string, number>();
  for (const row of rows) {
    for (const topic of row.focusTopics) gaps.set(topic, (gaps.get(topic) ?? 0) + 1);
  }

  const avg = (pick: (row: LearnerRow) => number) =>
    rows.length === 0 ? 0 : rows.reduce((n, r) => n + pick(r), 0) / rows.length;

  return {
    learners: rows.length,
    averageProjected: avg((r) => r.projected),
    averageGita: avg((r) => r.gita),
    inactive: rows.filter((r) => r.daysSinceActive === null || r.daysSinceActive >= 7).length,
    awaitingApproval: rows.filter((r) => r.levelUpReady.length > 0 || r.stageEligible).length,
    stageReady: rows.filter((r) => r.stageEligible).length,
    commonGaps: [...gaps.entries()]
      .map(([topicName, learners]) => ({ topicName, learners }))
      .sort((a, b) => b.learners - a.learners)
      .slice(0, 5),
  };
}

/* ── Goi nhiem vu ──────────────────────────────────────────────────────── */

export interface AssignmentItem {
  worksheetId: string;
  code: string;
  title: string;
  topicName: string;
  level: number;
  reason: string;
}

export interface Assignment {
  learnerName: string;
  createdAt: number;
  /** Han hoan thanh, dang YYYY-MM-DD. */
  dueDate: string;
  items: readonly AssignmentItem[];
  note: string;
}

/**
 * Sinh goi nhiem vu cho mot hoc vien.
 *
 * Dua tren dung bo quy tac ma hoc vien nhin thay tren man hinh cua ho — khong
 * co "quy tac rieng cua giao vien". Neu hai ben nhin hai bo quy tac khac nhau
 * thi hoc vien se hoc theo he thong con giao vien cham theo cam tinh, va cai
 * gia phai tra la niem tin.
 */
export function buildAssignment(
  row: LearnerRow,
  size = 5,
  now: Date = new Date(),
): Assignment {
  const sheets = recommendedWorksheets(row.snapshot.state, size);
  const due = new Date(now.getTime() + 7 * 86_400_000);

  return {
    learnerName: row.snapshot.name,
    createdAt: now.getTime(),
    dueDate: dayKey(due),
    items: sheets.map((sheet) => ({
      worksheetId: sheet.id,
      code: sheet.code,
      title: sheet.title,
      topicName: topicName(sheet.topicId),
      level: sheet.level,
      reason: row.focusTopics.includes(topicName(sheet.topicId))
        ? 'Nằm trong vùng 20/80 — lấy lại được nhiều điểm nhất'
        : 'Tuyến kế tiếp theo lộ trình',
    })),
    note:
      row.flags.find((f) => f.tone === 'bad')?.action ??
      row.flags.find((f) => f.tone === 'warn')?.action ??
      'Giữ nhịp hiện tại. Đúng lộ trình.',
  };
}

/* ── Bao cao cho gia dinh ──────────────────────────────────────────────── */

export interface ReportSection {
  title: string;
  body: string;
}

export interface FamilyReport {
  learnerName: string;
  createdAt: number;
  projected: number;
  target: number;
  gapToTarget: number;
  band: string;
  stageName: string;
  topLevel: number;
  streak: number;
  sections: readonly ReportSection[];
  /** Ba viec gia dinh lam duoc, cu the va khong doi hoi chuyen mon. */
  familyActions: readonly string[];
}

/**
 * Bao cao gia dinh.
 *
 * Nguoi tra tien cho mot chuong trinh luyen thi thuong khong phai nguoi hoc.
 * Ho khong doc duoc bang phan tich nang luc, va khong nen bat ho doc. Cai ho
 * can la ba cau tra loi:
 *   1. Con toi dang o dau so voi muc tieu?
 *   2. Co dang tien len khong?
 *   3. Toi giup duoc gi ma khong phai gioi Toan?
 *
 * Cau thu ba la cau quan trong nhat va gan nhu luon bi bo qua. Bao cao nao chi
 * tra loi hai cau dau se bien phu huynh thanh nguoi giam sat diem so — vai tro
 * lam hong dong luc nhanh hon bat ky dieu gi khac.
 */
export function buildFamilyReport(
  state: PersistedState,
  now: Date = new Date(),
): FamilyReport {
  const projected = estimateProjectedFromMastery(state);
  const target = state.settings.targetScore;
  const tier = tierStatus(state, now);
  const pareto = paretoFocus(state, now);
  const weakest = weakestPillar(state, now);
  const streak = currentStreak(state.days, now);
  const level = highestLevel(state);
  const kpi = stageKpi(state, state.stage);

  const band =
    projected >= target ? 'Đã đạt mục tiêu' : projected >= target * 0.9 ? 'Rất gần mục tiêu' : projected >= target * 0.75 ? 'Đang tiến đúng hướng' : 'Cần thêm thời gian';

  const sections: ReportSection[] = [
    {
      title: 'Đang ở đâu',
      body: `Điểm dự báo hiện tại ${Math.round(projected)}/${MAX_TOTAL_SCORE}, mục tiêu đặt ra là ${target}. ${
        projected >= target
          ? 'Con đã vượt mục tiêu — việc còn lại là giữ phong độ và không để mất nền.'
          : `Còn cách mục tiêu ${Math.round(target - projected)} điểm. Đây là con số ước lượng từ bài đã làm, sẽ chính xác dần theo thời gian.`
      }`,
    },
    {
      title: 'Đang tiến thế nào',
      body: `Đã lên tới ${LEVELS[level - 1]?.name ?? `cấp ${level}`} (cấp ${level}/${MAX_LEVEL}) ở ít nhất một chuyên đề, hiện ở ${
        STAGES.find((s) => s.stage === state.stage)?.name ?? ''
      }. Tỉ lệ làm đúng của giai đoạn này là ${Math.round(kpi.kpi * 100)}% — ngưỡng để xét chuyển giai đoạn là ${Math.round(
        STAGE_PROMOTION_KPI * 100,
      )}%. Chuỗi ngày học liên tục hiện tại: ${streak} ngày.`,
    },
    {
      title: 'Chỗ cần dồn sức',
      body:
        pareto.topics.length > 0
          ? `Ba chuyên đề lấy lại được nhiều điểm nhất lúc này: ${pareto.topics
              .slice(0, 3)
              .map((t) => topicName(t.topicId))
              .join(', ')}. ${
              pareto.focusRatio < 0.4
                ? 'Hai tuần qua công sức đang rơi lệch khỏi nhóm này — con học chăm nhưng chưa đúng chỗ, và đây là lý do phổ biến nhất khiến điểm không lên dù rất cố gắng.'
                : 'Hai tuần qua công sức đang rơi đúng vào nhóm này.'
            }`
          : 'Chưa đủ dữ liệu để xác định trọng tâm. Cần thêm vài buổi làm bài.',
    },
    {
      title: 'Điều cần chú ý về thói quen',
      body: `Trụ cột đang yếu nhất trong bốn trụ GITA là ${
        PILLAR_BY_ID.get(weakest.pillar)?.name ?? ''
      }. ${weakest.note} Tầng hấp thu hiện tại: ${tier.tier.name} — ${tier.tier.realNeed}`,
    },
  ];

  return {
    learnerName: displayNameOf(state.profile),
    createdAt: now.getTime(),
    projected,
    target,
    gapToTarget: Math.max(0, target - projected),
    band,
    stageName: STAGES.find((s) => s.stage === state.stage)?.name ?? '',
    topLevel: level,
    streak,
    sections,
    familyActions: familyActionsFor(streak, tier.tier.id, pareto.focusRatio),
  };
}

/**
 * Ba viec gia dinh lam duoc.
 *
 * Deu la viec KHONG doi hoi kien thuc chuyen mon. Mot phu huynh khong gioi Toan
 * van tao duoc dieu kien, van hoi duoc dung cau, va van giu duoc nhip — ba thu
 * anh huong toi ket qua nhieu hon viec giang bai ho con.
 */
export function familyActionsFor(
  streak: number,
  tier: string,
  focusRatio: number,
): string[] {
  const actions: string[] = [];

  actions.push(
    streak >= 7
      ? `Ghi nhận chuỗi ${streak} ngày học liên tục. Nói ra thành lời — thứ được công nhận thì được lặp lại.`
      : 'Giữ một khung giờ học cố định mỗi ngày, kể cả buổi chỉ 20 phút. Đều đặn quan trọng hơn dài.',
  );

  actions.push(
    tier === 'H1' || tier === 'H2'
      ? 'Ngồi cùng bàn trong lúc con học, làm việc của mình. Không giám sát, không hỏi điểm — chỉ có mặt.'
      : 'Mỗi tuần hỏi một câu duy nhất: "Tuần này con thấy phần nào khó nhất?" Rồi nghe hết, không góp ý ngay.',
  );

  actions.push(
    focusRatio < 0.4
      ? 'Con đang học chăm nhưng lệch trọng tâm. Đừng thúc học nhiều hơn — hãy nhờ giáo viên xem lại thứ tự ưu tiên.'
      : 'Tránh so sánh với bạn cùng lớp. Điểm dự báo trong báo cáo này so con với chính con của tháng trước, và đó là phép so duy nhất có ích.',
  );

  return actions;
}
