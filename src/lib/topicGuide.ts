import { SECTION_BY_ID, SUBJECT_NAME } from '../config';
import { KINDS, KIND_BY_ID, LEVELS } from '../data/curriculum';
import { knowledgeFor, type KnowledgeSheet } from '../data/knowledge';
import { questionsOfTopic } from '../data/questions';
import { TOPIC_BY_ID } from '../data/topics';
import { activeWorksheets, guideCodeOf, worksheetById } from '../data/worksheets';
import type { ErrorType, PersistedState, Worksheet, WorksheetKind, WorksheetProgress } from '../types';
import { buildSolutionSheet, type SolutionEntry } from './solutions';
import { isUnlocked, trackStatus, type TrackStatus } from './progression';
import { dueNow } from '../store/selectors';

/**
 * PHIEU HUONG DAN ON CHAC CHUYEN DE
 *
 * Mot phieu cho moi chuyen de, gom bon phan:
 *   1. Kien thuc phai nam — y loi, cong thuc, dang bai, bay, chien thuat gio.
 *   2. Lo trinh sau loai phieu qua sau cap do, kem trang thai da lam den dau.
 *   3. Danh sach kiem "the nao la da chac" — tam tieu chi do duoc, khong cam tinh.
 *   4. Ke hoach bay ngay, sinh tu chinh cac tieu chi con thieu.
 *
 * Vi sao can phieu nay: nguoi hoc doc loi giai tung cau roi van khong biet
 * "the nao thi coi la da on chac chuyen de nay". Danh sach kiem tra loi cau do
 * bang tieu chi do duoc thay vi cam giac.
 */

export interface GuideSheetRow {
  sheet: Worksheet;
  progress: WorksheetProgress | undefined;
  unlocked: boolean;
}

export interface GuideLevelRow {
  level: number;
  levelName: string;
  motto: string;
  sheets: GuideSheetRow[];
  passed: number;
  mastered: number;
}

export interface Criterion {
  id: string;
  label: string;
  detail: string;
  met: boolean;
  /** 0..1, dung de ve thanh tien do khi chua dat. */
  progress: number;
}

export interface GuideDay {
  day: number;
  title: string;
  detail: string;
  minutes: number;
  href?: string;
}

export interface TopicGuide {
  topicId: string;
  guideCode: string;
  name: string;
  sectionName: string;
  subjectName: string | null;
  /** Ti trong xuat hien uoc luong trong de, trong nhom cua no. */
  weight: number;
  questionCount: number;
  knowledge: KnowledgeSheet | undefined;
  status: TrackStatus;
  mastery: number;
  ladder: GuideLevelRow[];
  /** So lieu ca nhan tren chuyen de nay, gop tu moi luot da lam. */
  attempted: number;
  correct: number;
  errorCounts: Record<ErrorType, number>;
  trapsHit: string[];
  overdueCards: number;
  criteria: Criterion[];
  plan: GuideDay[];
}

const EMPTY_ERRORS: Record<ErrorType, number> = {
  knowledge: 0,
  skill: 0,
  tactic: 0,
  lucky: 0,
  clean: 0,
};

export function buildTopicGuide(state: PersistedState, topicId: string, now: Date = new Date()): TopicGuide | null {
  const topic = TOPIC_BY_ID.get(topicId);
  if (!topic) return null;

  const sheets = activeWorksheets(state.settings.scienceSubject).filter((s) => s.topicId === topicId);
  const status = trackStatus(state, topicId);
  const mastery = state.mastery[topicId]?.mastery ?? 0.5;

  const ladder: GuideLevelRow[] = LEVELS.map((level) => {
    const rows = sheets
      .filter((s) => s.level === level.level)
      .map<GuideSheetRow>((sheet) => ({
        sheet,
        progress: state.worksheets[sheet.id],
        unlocked: isUnlocked(state, sheet),
      }));
    return {
      level: level.level,
      levelName: level.name,
      motto: level.motto,
      sheets: rows,
      passed: rows.filter((r) => r.progress?.passed).length,
      mastered: rows.filter((r) => r.progress?.mastered).length,
    };
  });

  /* Gom moi cau thuoc chuyen de nay tu tat ca cac luot da lam. */
  const entries: SolutionEntry[] = [];
  for (const run of state.worksheetRuns) {
    const sheet = worksheetById(run.worksheetId);
    const ids = sheet ? sheet.parts.flatMap((p) => p.questionIds) : Object.keys(run.responses);
    entries.push(...buildSolutionSheet(ids, run.responses).filter((e) => e.question.topicId === topicId));
  }
  for (const attempt of state.attempts) {
    if (attempt.status !== 'submitted') continue;
    const ids = attempt.sections.flatMap((s) => s.questionIds);
    entries.push(...buildSolutionSheet(ids, attempt.responses).filter((e) => e.question.topicId === topicId));
  }

  const errorCounts = { ...EMPTY_ERRORS };
  const trapsHit: string[] = [];
  let correct = 0;
  for (const entry of entries) {
    errorCounts[entry.errorType] += 1;
    if (entry.correct) correct += 1;
    if (entry.trapNote && !trapsHit.includes(entry.trapNote)) trapsHit.push(entry.trapNote);
  }

  const topicQuestionIds = new Set(questionsOfTopic(topicId).map((q) => q.id));
  const overdueCards = dueNow(state, now.getTime()).filter((c) => topicQuestionIds.has(c.questionId)).length;

  const criteria = buildCriteria(ladder, status, mastery, overdueCards);

  return {
    topicId,
    guideCode: guideCodeOf(topicId),
    name: topic.name,
    sectionName: SECTION_BY_ID[topic.section].name,
    subjectName: topic.subject ? SUBJECT_NAME[topic.subject] : null,
    weight: topic.weight,
    questionCount: topicQuestionIds.size,
    knowledge: knowledgeFor(topicId),
    status,
    mastery,
    ladder,
    attempted: entries.length,
    correct,
    errorCounts,
    trapsHit,
    overdueCards,
    criteria,
    plan: buildPlan(criteria, ladder, status, topicId),
  };
}

/** Phieu cua mot loai o mot cap do cu the. */
function sheetOf(ladder: readonly GuideLevelRow[], level: number, kind: WorksheetKind): GuideSheetRow | undefined {
  return ladder.find((l) => l.level === level)?.sheets.find((s) => s.sheet.kind === kind);
}

/**
 * Tam tieu chi "the nao la da on chac chuyen de nay".
 * Sau tieu chi dau bam theo dung sau loai phieu; hai tieu chi cuoi kiem tra do
 * ben cua kien thuc va do thanh thao tong the.
 */
function buildCriteria(
  ladder: readonly GuideLevelRow[],
  status: TrackStatus,
  mastery: number,
  overdueCards: number,
): Criterion[] {
  const level = status.level;
  const at = (kind: WorksheetKind) => sheetOf(ladder, level, kind);

  const kindCriterion = (kind: WorksheetKind, label: string, detail: string): Criterion => {
    const row = at(kind);
    const best = row?.progress?.bestRatio ?? 0;
    const need = row?.sheet.masteryRatio ?? 0.85;
    return {
      id: `kind.${kind}`,
      label,
      detail,
      met: Boolean(row?.progress?.mastered),
      progress: need > 0 ? Math.min(1, best / need) : 0,
    };
  };

  const criteria: Criterion[] = [
    kindCriterion('theory', 'Nắm chắc lý thuyết', 'Viết lại được công thức và nêu được điều kiện áp dụng mà không cần nhìn tài liệu.'),
    kindCriterion('patterns', 'Đọc vị được dạng bài', 'Đọc đề trong 10 giây là gọi được tên dạng và hướng giải.'),
    kindCriterion('method', 'Có quy trình giải chuẩn', 'Làm trong thời gian mục tiêu mà không phải nghĩ bước tiếp theo là gì.'),
    kindCriterion('advanced', 'Xử lý được câu phân loại', 'Nhận ra bẫy trước khi mắc, thay vì sau khi xem đáp án.'),
    kindCriterion('revision', 'Trộn dạng vẫn nhận ra', 'Kết quả phiếu ôn thi không thấp hơn phiếu kỹ năng.'),
    kindCriterion('test', 'Qua phiếu thi của cấp', 'Đạt từ 90% trong đúng thời gian quy định.'),
    {
      id: 'retention',
      label: 'Không còn câu quá hạn trong sổ tay',
      detail: 'Kiến thức của chuyên đề này đang được giữ, không phai đi trong im lặng.',
      met: overdueCards === 0,
      progress: overdueCards === 0 ? 1 : Math.max(0, 1 - overdueCards / 10),
    },
    {
      id: 'mastery',
      label: 'Độ thành thạo từ 80%',
      detail: 'Chỉ số tổng hợp từ toàn bộ lịch sử làm bài của chuyên đề, đã trừ yếu tố độ khó.',
      met: mastery >= 0.8,
      progress: Math.min(1, mastery / 0.8),
    },
  ];

  return criteria;
}

/**
 * Ke hoach bay ngay de on chac chuyen de.
 * Sinh tu chinh cac tieu chi CHUA DAT, theo dung thu tu su pham — khong phai
 * mot lich hoc chung chung.
 */
function buildPlan(
  criteria: readonly Criterion[],
  ladder: readonly GuideLevelRow[],
  status: TrackStatus,
  topicId: string,
): GuideDay[] {
  const plan: GuideDay[] = [];
  const push = (title: string, detail: string, minutes: number, href?: string): void => {
    if (plan.length >= 7) return;
    plan.push({ day: plan.length + 1, title, detail, minutes, ...(href ? { href } : {}) });
  };

  const order: Array<{ kind: WorksheetKind; verb: string }> = [
    { kind: 'theory', verb: 'Chốt lý thuyết' },
    { kind: 'patterns', verb: 'Rèn đọc vị dạng bài' },
    { kind: 'method', verb: 'Chuẩn hóa quy trình giải' },
    { kind: 'advanced', verb: 'Luyện câu phân loại' },
    { kind: 'revision', verb: 'Ôn trộn dạng' },
    { kind: 'test', verb: 'Làm phiếu thi chốt cấp' },
  ];

  for (const step of order) {
    const criterion = criteria.find((c) => c.id === `kind.${step.kind}`);
    if (criterion?.met) continue;
    const row = sheetOf(ladder, status.level, step.kind);
    const spec = KIND_BY_ID.get(step.kind);
    push(
      `${step.verb} — ${spec?.name ?? step.kind}`,
      spec?.goal ?? '',
      row ? Math.max(5, Math.round(row.sheet.seconds / 60)) : 20,
      row ? `#/worksheet?id=${encodeURIComponent(row.sheet.id)}` : undefined,
    );
  }

  const retention = criteria.find((c) => c.id === 'retention');
  if (retention && !retention.met) {
    push(
      'Dọn sạch sổ tay lỗi sai của chuyên đề',
      'Xử lý hết các câu đến hạn trước khi làm thêm bài mới — ôn đúng hạn rẻ hơn học lại từ đầu.',
      15,
      '#/review',
    );
  }

  if (plan.length === 0) {
    push(
      'Chuyên đề đã chắc — chuyển sang mài sở trường',
      'Tất cả tiêu chí đều đạt ở cấp hiện tại. Lên cấp tuyến này hoặc chuyển sang chuyên đề yếu hơn.',
      0,
      '#/practice',
    );
  }

  // Ngay cuoi cung luon danh cho viec kiem chung lai.
  push(
    'Tự kiểm bằng phiếu ôn thi',
    'Làm lại phiếu ôn thi của chuyên đề, không xem lý thuyết trong lúc làm. Đây là phép thử trung thực nhất.',
    20,
    `#/practice?topic=${encodeURIComponent(topicId)}`,
  );

  return plan;
}

export { KINDS };
