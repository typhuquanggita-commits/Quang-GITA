import {
  MASTERED_TO_LEVEL_UP,
  MAX_LEVEL,
  STAGES,
  STAGE_PROMOTION_KPI,
} from '../data/curriculum';
import { findQuestion } from '../data/questions';
import { topicName } from '../data/topics';
import { activeWorksheets, worksheetById } from '../data/worksheets';
import type {
  PersistedState,
  Question,
  Response,
  Worksheet,
  WorksheetProgress,
} from '../types';
import { isCorrect } from './scoring';

/**
 * DONG CHAY HOC TAP
 *
 * Lam tung chang → het chuoi cau → cham → bao ket qua → nhan xet → giai phap
 * → dinh huong lam lai / thu thach tiep → len cap khi du dieu kien.
 *
 * Tep nay giu toan bo phan "sau khi bam Nop": cham diem, chan doan, ke don va
 * quyet dinh buoc tiep theo. Tach rieng khoi giao dien de moi ket luan deu
 * kiem chung duoc bang bai test thay vi phai bam thu tren man hinh.
 */

export interface PartOutcome {
  order: number;
  name: string;
  correct: number;
  total: number;
  ratio: number;
  timeMs: number;
  /** Thoi gian khuyen nghi cua chang (giay). */
  budgetSeconds: number;
}

export interface WorksheetOutcome {
  worksheetId: string;
  correct: number;
  total: number;
  ratio: number;
  blanks: number;
  timeMs: number;
  budgetSeconds: number;
  parts: PartOutcome[];
  passed: boolean;
  mastered: boolean;
  /** Dung nhung tu nhan la doan. */
  luckyCorrect: number;
  /** Sai nhung tin chac la dung. */
  confidentWrong: number;
  /** Cau vuot qua gap doi thoi gian muc tieu. */
  slowQuestions: number;
  xpEarned: number;
}

export function gradeWorksheet(
  sheet: Worksheet,
  responses: Record<string, Response>,
): WorksheetOutcome {
  const parts: PartOutcome[] = [];
  let correct = 0;
  let total = 0;
  let blanks = 0;
  let timeMs = 0;
  let luckyCorrect = 0;
  let confidentWrong = 0;
  let slowQuestions = 0;

  for (const part of sheet.parts) {
    let partCorrect = 0;
    let partTime = 0;
    for (const questionId of part.questionIds) {
      const question = findQuestion(questionId);
      if (!question) continue;
      const response = responses[questionId];
      const value = response?.value ?? null;
      const ok = isCorrect(question, value);

      total += 1;
      partTime += response?.timeSpentMs ?? 0;
      if (ok) {
        correct += 1;
        partCorrect += 1;
        if (response?.confidence === 'guess') luckyCorrect += 1;
      } else if (response?.confidence === 'sure') {
        confidentWrong += 1;
      }
      if (value === null || value === '') blanks += 1;
      if ((response?.timeSpentMs ?? 0) > question.estimatedSeconds * 2000) slowQuestions += 1;
    }

    timeMs += partTime;
    parts.push({
      order: part.order,
      name: part.name,
      correct: partCorrect,
      total: part.questionIds.length,
      ratio: part.questionIds.length > 0 ? partCorrect / part.questionIds.length : 0,
      timeMs: partTime,
      budgetSeconds: part.seconds,
    });
  }

  const ratio = total > 0 ? correct / total : 0;
  const passed = ratio >= sheet.passRatio;
  const mastered = ratio >= sheet.masteryRatio && timeMs <= sheet.seconds * 1000 * 1.25;

  return {
    worksheetId: sheet.id,
    correct,
    total,
    ratio,
    blanks,
    timeMs,
    budgetSeconds: sheet.seconds,
    parts,
    passed,
    mastered,
    luckyCorrect,
    confidentWrong,
    slowQuestions,
    // Khong dat nguong hoan thanh thi chi duoc mot phan nho kinh nghiem:
    // co gang van duoc ghi nhan, nhung khong bang lam dung.
    xpEarned: mastered ? sheet.xp : passed ? Math.round(sheet.xp * 0.6) : Math.round(sheet.xp * 0.2),
  };
}

/* ── Nhận xét tình hình ────────────────────────────────────────────────── */

export type NoteTone = 'good' | 'warn' | 'bad';

export interface Note {
  id: string;
  tone: NoteTone;
  title: string;
  detail: string;
}

/**
 * Chan doan tinh hinh. Moi nhan xet phai chi ra duoc mot NGUYEN NHAN cu the,
 * khong phai chi mo ta lai con so ma nguoi hoc da nhin thay.
 */
export function diagnose(sheet: Worksheet, outcome: WorksheetOutcome): Note[] {
  const notes: Note[] = [];
  const overTime = outcome.timeMs > outcome.budgetSeconds * 1000;

  if (outcome.blanks > 0) {
    notes.push({
      id: 'blank',
      tone: 'bad',
      title: `Bỏ trống ${outcome.blanks} câu`,
      detail:
        'Bài thi HSA không trừ điểm câu sai, nên bỏ trống là mất điểm chắc chắn còn khoanh bừa vẫn còn 25% cơ hội. Đây là lỗi chiến thuật, sửa được ngay trong lượt sau.',
    });
  }

  if (outcome.confidentWrong >= 2) {
    notes.push({
      id: 'confident-wrong',
      tone: 'bad',
      title: `${outcome.confidentWrong} câu sai nhưng bạn tin là đúng`,
      detail:
        'Đây là lỗ hổng nguy hiểm nhất vì bạn không biết là mình không biết. Những câu này cần đọc kỹ lời giải chứ không chỉ xem đáp án.',
    });
  }

  if (outcome.luckyCorrect >= 2) {
    notes.push({
      id: 'lucky',
      tone: 'warn',
      title: `${outcome.luckyCorrect} câu đúng nhờ đoán`,
      detail:
        'Điểm may rủi không lặp lại trong phòng thi. Các câu này đã được đưa vào sổ tay để ôn lại như câu sai.',
    });
  }

  if (overTime) {
    const over = Math.round((outcome.timeMs / 1000 - outcome.budgetSeconds) / 60);
    notes.push({
      id: 'slow',
      tone: 'warn',
      title: `Vượt thời gian khuyến nghị ${Math.max(1, over)} phút`,
      detail:
        'Ở đề thật, quá giờ nghĩa là mất trắng những câu chưa kịp đọc. Vấn đề thường không nằm ở câu khó mà ở vài câu bị sa lầy.',
    });
  } else if (outcome.ratio >= sheet.masteryRatio) {
    notes.push({
      id: 'pace-good',
      tone: 'good',
      title: 'Vừa đúng vừa kịp giờ',
      detail: 'Bạn giữ được độ chính xác trong đúng khung thời gian của cấp độ này. Đủ điều kiện đi tiếp.',
    });
  }

  const weakest = [...outcome.parts].sort((a, b) => a.ratio - b.ratio)[0];
  if (weakest && weakest.ratio < 0.6 && outcome.total > 0) {
    notes.push({
      id: 'weak-part',
      tone: 'warn',
      title: `Yếu nhất ở ${weakest.name.toLowerCase()}`,
      detail:
        weakest.order === 1
          ? 'Sai ở chặng khởi động cho thấy lỗ hổng nằm ở phần nền chứ không phải ở độ khó. Cần quay lại cấp thấp hơn thay vì cố lên cấp.'
          : weakest.order === 3
            ? 'Chỉ hụt ở chặng bứt tốc là dấu hiệu tốt: nền đã chắc, chỉ cần thêm bài khó.'
            : 'Phần lõi của chuyên đề chưa vững — đây mới là nơi quyết định điểm số.',
    });
  }

  if (outcome.slowQuestions >= 3) {
    notes.push({
      id: 'sink',
      tone: 'warn',
      title: `${outcome.slowQuestions} câu tốn gấp đôi thời gian mục tiêu`,
      detail:
        'Những câu này là "hố sa lầy". Trong phòng thi, quy tắc là bỏ qua sau 2 phút rồi quay lại nếu còn giờ.',
    });
  }

  if (notes.length === 0) {
    notes.push({
      id: 'clean',
      tone: 'good',
      title: 'Không phát hiện vấn đề đáng kể',
      detail: 'Kết quả ổn định ở cả ba chặng. Nâng độ khó để tiếp tục tiến bộ.',
    });
  }

  return notes;
}

/* ── Giải pháp tối ưu ──────────────────────────────────────────────────── */

export interface Prescription {
  id: string;
  title: string;
  detail: string;
  href?: string;
}

/**
 * Ke don. Nguyen tac: moi de xuat phai la mot hanh dong cu the, do dem duoc,
 * lam duoc trong hom nay — khong phai loi khuyen chung chung.
 */
export function prescribe(
  sheet: Worksheet,
  outcome: WorksheetOutcome,
  wrongQuestions: readonly Question[],
): Prescription[] {
  const items: Prescription[] = [];
  const topic = topicName(sheet.topicId);

  if (outcome.blanks > 0) {
    items.push({
      id: 'fill-all',
      title: 'Luật bất di bất dịch: không để trống ô nào',
      detail:
        'Đặt mốc: còn 2 phút thì dừng suy nghĩ và điền hết các ô còn trống. Riêng câu trắc nghiệm, chọn sẵn một chữ cái "mặc định" để không mất thời gian phân vân.',
    });
  }

  const trapSkills = new Map<string, number>();
  for (const question of wrongQuestions) {
    for (const skill of question.skills) trapSkills.set(skill, (trapSkills.get(skill) ?? 0) + 1);
  }
  const topSkill = [...trapSkills.entries()].sort((a, b) => b[1] - a[1])[0];
  if (topSkill) {
    items.push({
      id: 'skill-focus',
      title: `Ưu tiên vá kỹ năng: ${topSkill[0]}`,
      detail: `${topSkill[1]} câu sai trong phiếu này đều dính tới kỹ năng đó. Làm 10 câu chỉ về kỹ năng này trước khi quay lại phiếu.`,
      href: `#/practice?topic=${encodeURIComponent(sheet.topicId)}`,
    });
  }

  if (outcome.timeMs > outcome.budgetSeconds * 1000) {
    items.push({
      id: 'time-box',
      title: 'Đặt đồng hồ theo câu, không theo bài',
      detail: `Chuyên đề ${topic} ở cấp ${sheet.level} có ngân sách ${Math.round(
        outcome.budgetSeconds / Math.max(1, outcome.total),
      )} giây/câu. Lần sau đặt chuông mỗi 5 câu để tự kiểm tra nhịp thay vì chỉ nhìn tổng thời gian.`,
    });
  }

  if (outcome.confidentWrong > 0 || outcome.luckyCorrect > 0) {
    items.push({
      id: 'notebook',
      title: 'Đưa vào vòng ôn tập ngắt quãng',
      detail: `${outcome.confidentWrong + outcome.luckyCorrect} câu đã được thêm vào sổ tay lỗi sai. Ôn lại đúng ngày đến hạn cho hiệu quả ghi nhớ cao nhất.`,
      href: '#/review',
    });
  }

  if (outcome.mastered) {
    items.push({
      id: 'raise-bar',
      title: 'Nâng trần thay vì lặp lại',
      detail:
        'Làm lại một phiếu đã thành thạo gần như không tạo thêm tiến bộ. Chuyển sang phiếu thử thách hoặc cấp cao hơn của cùng tuyến.',
    });
  } else if (!outcome.passed) {
    items.push({
      id: 'step-back',
      title: 'Lùi một bước để chắc nền',
      detail: `Chưa đạt ${Math.round(sheet.passRatio * 100)}%. Làm một phiếu khởi động cùng chuyên đề rồi quay lại phiếu này — cách đó nhanh hơn là cố làm lại ngay.`,
    });
  }

  return items;
}

/* ── Định hướng bước tiếp theo ─────────────────────────────────────────── */

export type NextKind = 'retry' | 'reinforce' | 'next' | 'test' | 'levelup';

export interface NextStep {
  kind: NextKind;
  title: string;
  detail: string;
  worksheetId?: string;
}

export function nextStep(
  state: PersistedState,
  sheet: Worksheet,
  outcome: WorksheetOutcome,
): NextStep {
  const track = state.tracks[sheet.topicId];
  const level = track?.level ?? 1;
  const chain = activeWorksheets(state.settings.section3).filter(
    (s) => s.topicId === sheet.topicId && s.level === sheet.level,
  );
  const position = chain.findIndex((s) => s.id === sheet.id);
  const following = position >= 0 ? chain[position + 1] : undefined;

  if (!outcome.passed) {
    return {
      kind: 'retry',
      title: 'Làm lại phiếu này',
      detail: `Chưa đạt ngưỡng hoàn thành ${Math.round(sheet.passRatio * 100)}%. Đọc kỹ lời giải các câu sai rồi làm lại — bộ câu sẽ được xoay để bạn không học thuộc đáp án.`,
      worksheetId: sheet.id,
    };
  }

  if (sheet.kind === 'test' && outcome.mastered && level < MAX_LEVEL) {
    return {
      kind: 'levelup',
      title: `Đủ điều kiện lên cấp ${level + 1}`,
      detail:
        'Bạn đã qua phiếu thi của cấp hiện tại. Cấp tiếp theo có câu khó hơn và thời gian siết lại — đúng thứ bạn cần lúc này.',
    };
  }

  if (!outcome.mastered) {
    return {
      kind: 'reinforce',
      title: 'Củng cố thêm một phiếu cùng cấp',
      detail: `Đã hoàn thành nhưng chưa đạt mức thành thạo ${Math.round(
        sheet.masteryRatio * 100,
      )}%. Một phiếu nữa cùng cấp sẽ đưa bạn qua ngưỡng.`,
      ...(following ? { worksheetId: following.id } : {}),
    };
  }

  if (following) {
    return {
      kind: following.kind === 'test' ? 'test' : 'next',
      title:
        following.kind === 'test'
          ? 'Vào phiếu thi chốt cấp độ này'
          : `Sang phiếu tiếp theo: ${following.title}`,
      detail: following.objective,
      worksheetId: following.id,
    };
  }

  return {
    kind: 'next',
    title: 'Chuyển sang chuyên đề khác',
    detail: 'Bạn đã đi hết chuỗi phiếu của cấp này trong tuyến hiện tại. Chọn tuyến yếu tiếp theo để cân bằng điểm số.',
  };
}

/* ── Cấp độ & KPI ──────────────────────────────────────────────────────── */

export interface TrackStatus {
  topicId: string;
  level: number;
  masteredAtLevel: number;
  required: number;
  bossMastered: boolean;
  canLevelUp: boolean;
  /** Ti le hoan thanh cua cap hien tai (0..1). */
  progress: number;
}

export function trackStatus(state: PersistedState, topicId: string): TrackStatus {
  const level = state.tracks[topicId]?.level ?? 1;
  const chain = activeWorksheets(state.settings.section3).filter(
    (s) => s.topicId === topicId && s.level === level,
  );
  const mastered = chain.filter((s) => state.worksheets[s.id]?.mastered).length;
  const finalTest = chain.find((s) => s.kind === 'test');
  const bossMastered = finalTest ? Boolean(state.worksheets[finalTest.id]?.mastered) : false;
  const passed = chain.filter((s) => state.worksheets[s.id]?.passed).length;

  return {
    topicId,
    level,
    masteredAtLevel: mastered,
    required: MASTERED_TO_LEVEL_UP,
    bossMastered,
    canLevelUp: level < MAX_LEVEL && mastered >= MASTERED_TO_LEVEL_UP && bossMastered,
    progress: chain.length > 0 ? passed / chain.length : 0,
  };
}

export interface StageKpi {
  stage: number;
  name: string;
  /** KPI = trung binh ti le dung tot nhat tren cac phieu da lam cua giai doan. */
  kpi: number;
  attempted: number;
  total: number;
  /** Ti le phieu cua giai doan da hoan thanh. */
  coverage: number;
  eligible: boolean;
}

/**
 * KPI cua mot giai doan.
 *
 * Chi tinh tren cac phieu DA LAM — de mot nguoi moi bat dau khong bi hien
 * KPI 0%. Nhung de duoc xet nang giai doan thi ngoai KPI >= 90% con phai phu
 * du it nhat 60% so phieu cua giai doan: khong the lam 3 phieu de roi doi len.
 */
export function stageKpi(state: PersistedState, stage: number): StageKpi {
  const sheets = activeWorksheets(state.settings.section3).filter((s) => s.stage === stage);
  const done = sheets
    .map((s) => state.worksheets[s.id])
    .filter((p): p is WorksheetProgress => Boolean(p && p.attempts > 0));

  const kpi = done.length > 0 ? done.reduce((sum, p) => sum + p.bestRatio, 0) / done.length : 0;
  const coverage = sheets.length > 0 ? done.filter((p) => p.passed).length / sheets.length : 0;
  const stageSpec = STAGES.find((s) => s.stage === stage);

  return {
    stage,
    name: stageSpec?.name ?? `Giai đoạn ${stage}`,
    kpi,
    attempted: done.length,
    total: sheets.length,
    coverage,
    eligible: kpi >= STAGE_PROMOTION_KPI && coverage >= 0.6,
  };
}

/** Phieu tiep theo nen lam trong toan chuong trinh, uu tien tuyen yeu nhat. */
export function recommendedWorksheets(state: PersistedState, limit = 6): Worksheet[] {
  const sheets = activeWorksheets(state.settings.section3);
  const scored = sheets
    .map((sheet) => {
      const progress = state.worksheets[sheet.id];
      const track = state.tracks[sheet.topicId];
      const level = track?.level ?? 1;

      // Chi goi y phieu dung cap hien tai cua tuyen — khong nhay coc.
      if (sheet.level !== level) return null;
      if (progress?.mastered) return null;
      if (sheet.requires && !state.worksheets[sheet.requires]?.passed) return null;

      const mastery = state.mastery[sheet.topicId]?.mastery ?? 0.5;
      // Tuyen cang yeu, phieu cang dung dau danh sach.
      let score = (1 - mastery) * 2;
      if (progress?.attempts) score += 0.5; // dang do dang thi uu tien lam not
      return { sheet, score };
    })
    .filter((entry): entry is { sheet: Worksheet; score: number } => entry !== null)
    .sort((a, b) => b.score - a.score);

  const seen = new Set<string>();
  const out: Worksheet[] = [];
  for (const entry of scored) {
    // Moi lan goi y chi lay mot phieu tren moi tuyen — tranh don het vao mot cho.
    if (seen.has(entry.sheet.topicId)) continue;
    seen.add(entry.sheet.topicId);
    out.push(entry.sheet);
    if (out.length >= limit) break;
  }
  return out;
}

/** Phieu ke tiep trong chuoi cua mot tuyen, dung cho nut "Tiep tuc". */
export function nextWorksheetInTrack(state: PersistedState, topicId: string): Worksheet | undefined {
  const level = state.tracks[topicId]?.level ?? 1;
  return activeWorksheets(state.settings.section3)
    .filter((s) => s.topicId === topicId && s.level === level)
    .find((s) => !state.worksheets[s.id]?.passed);
}

export function isUnlocked(state: PersistedState, sheet: Worksheet): boolean {
  if (!sheet.requires) return true;
  return Boolean(state.worksheets[sheet.requires]?.passed);
}

export function worksheetRequirementLabel(sheet: Worksheet): string | null {
  if (!sheet.requires) return null;
  const required = worksheetById(sheet.requires);
  return required ? `Cần hoàn thành ${required.code} trước` : null;
}
