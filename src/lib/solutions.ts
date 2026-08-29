import { DIFFICULTY_LABEL } from '../config';
import { knowledgeFor, type KnowledgeSheet } from '../data/knowledge';
import { ALL_QUESTIONS, findQuestion } from '../data/questions';
import { topicName } from '../data/topics';
import type { ErrorType, Question, Response } from '../types';
import { isCorrect } from './scoring';

/**
 * BO GIAI DE VA BANG PHAN TICH
 *
 * Sau khi lam xong, nguoi hoc doc loi giai tung cau roi van khong biet "vay
 * minh phai on lai cai gi". Tep nay tra loi dung cau hoi do:
 *
 *   1. Cham va PHAN LOAI LOI: kien thuc — ky nang — chien thuat. Ba loai loi
 *      can ba cach chua khac han nhau, va chua nham loai la ly do pho bien
 *      khien viec hoc them khong co tac dung.
 *   2. Noi cau sai do lien quan den KIEN THUC nao, bay nao, cong thuc nao.
 *   3. Goi y cau tuong tu de luyen lai ngay.
 *   4. Tong hop thanh bang phan tich theo chuyen de, ky nang, do kho va thoi gian.
 *
 * Tat ca deu la ham thuan nen moi ket luan deu kiem chung duoc bang test.
 */

/* ── Phân loại lỗi ─────────────────────────────────────────────────────── */

export const ERROR_LABEL: Record<ErrorType, string> = {
  knowledge: 'Lỗi kiến thức',
  skill: 'Lỗi kỹ năng',
  tactic: 'Lỗi chiến thuật',
  lucky: 'Đúng nhờ may',
  clean: 'Đúng vững',
};

export const ERROR_MEANING: Record<ErrorType, string> = {
  knowledge: 'Chưa nắm bản chất hoặc nhớ sai công thức. Phải học lại rồi làm phiếu khởi động, không luyện thêm bài khó.',
  skill: 'Biết hướng nhưng sai bước hoặc quá chậm. Cần luyện lặp có phản hồi trên đúng dạng bài này.',
  tactic: 'Làm được nhưng bỏ trống hoặc hết giờ. Đây là lỗi quy trình làm bài, sửa được ngay mà không cần học thêm kiến thức.',
  lucky: 'Đúng nhưng do đoán. Không lặp lại được trong phòng thi, nên vẫn phải ôn như câu sai.',
  clean: 'Đúng, tự tin và kịp giờ. Không cần làm gì thêm với câu này.',
};

/** He so xac dinh mot cau bi coi la "sa lay": vuot bao nhieu lan thoi gian muc tieu. */
const SLOW_FACTOR = 2;

/**
 * Phan loai mot cau da lam.
 *
 * Thu tu kiem tra co chu dich: bo trong duoc xet TRUOC moi thu khac, vi bo
 * trong luon la loi chien thuat — nguoi hoc co the biet lam nhung khong kip
 * hoac khong danh dau de quay lai.
 */
export function classifyResponse(question: Question, response: Response | undefined): ErrorType {
  const value = response?.value ?? null;
  const blank = value === null || value.trim() === '';
  const ok = isCorrect(question, value);
  const slow = (response?.timeSpentMs ?? 0) > question.estimatedSeconds * 1000 * SLOW_FACTOR;
  const confidence = response?.confidence;

  if (blank) return 'tactic';

  if (ok) {
    if (confidence === 'guess') return 'lucky';
    if (slow) return 'skill';
    return 'clean';
  }

  // Sai nhung ton qua nhieu thoi gian: da biet huong, hong o buoc thuc hien.
  if (slow) return 'skill';
  // Sai ma van tin chac la dung: hieu sai ban chat — nguy hiem nhat.
  if (confidence === 'sure') return 'knowledge';
  // Sai va tu nhan la doan: chua nam kien thuc.
  if (confidence === 'guess') return 'knowledge';
  // Sai va con phan van: thuong la loi ky nang, biet mot phan nhung chua chac.
  if (confidence === 'unsure') return 'skill';
  return 'knowledge';
}

/* ── Một mục trong bộ giải đề ──────────────────────────────────────────── */

export interface SolutionEntry {
  index: number;
  question: Question;
  response: Response | undefined;
  /** Giá trị người học đã chọn hoặc điền. */
  given: string | null;
  correct: boolean;
  blank: boolean;
  errorType: ErrorType;
  /** Nội dung phương án đã chọn, để hiển thị mà không phải tra lại. */
  givenText: string | null;
  answerText: string;
  /** Lý do phương án đã chọn lại sai, nếu có chú thích bẫy. */
  trapNote: string | null;
  timeSeconds: number;
  targetSeconds: number;
  /** > 1 nghĩa là chậm hơn mục tiêu. */
  timeRatio: number;
  difficultyLabel: string;
  topicLabel: string;
  knowledge: KnowledgeSheet | undefined;
  /** Câu cùng dạng để luyện lại ngay. */
  similarIds: string[];
}

export function buildSolutionEntry(
  question: Question,
  response: Response | undefined,
  index: number,
): SolutionEntry {
  const given = response?.value ?? null;
  const blank = given === null || given.trim() === '';
  const correct = isCorrect(question, given);
  const timeSeconds = (response?.timeSpentMs ?? 0) / 1000;

  const choiceText = (id: string | null): string | null => {
    if (id === null) return null;
    if (question.format === 'fill') return id;
    return question.choices?.find((c) => c.id === id)?.text ?? id;
  };

  return {
    index,
    question,
    response,
    given,
    correct,
    blank,
    errorType: classifyResponse(question, response),
    givenText: blank ? null : choiceText(given),
    answerText: choiceText(question.answer) ?? question.answer,
    trapNote: !correct && given ? (question.traps?.[given] ?? null) : null,
    timeSeconds,
    targetSeconds: question.estimatedSeconds,
    timeRatio: question.estimatedSeconds > 0 ? timeSeconds / question.estimatedSeconds : 0,
    difficultyLabel: DIFFICULTY_LABEL[question.difficulty] ?? String(question.difficulty),
    topicLabel: topicName(question.topicId),
    knowledge: knowledgeFor(question.topicId),
    similarIds: findSimilarQuestions(question, 3).map((q) => q.id),
  };
}

/**
 * Tim cau tuong tu de luyen lai ngay sau khi vua hieu bai.
 * Uu tien: cung chu de, gan do kho nhat, va chia se nhieu ky nang nhat.
 */
export function findSimilarQuestions(question: Question, limit = 3): Question[] {
  const skills = new Set(question.skills);
  return ALL_QUESTIONS.filter((q) => q.id !== question.id && q.topicId === question.topicId)
    .map((q) => {
      const shared = q.skills.filter((s) => skills.has(s)).length;
      return { q, score: shared * 2 - Math.abs(q.difficulty - question.difficulty) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((e) => e.q);
}

export function buildSolutionSheet(
  questionIds: readonly string[],
  responses: Record<string, Response>,
): SolutionEntry[] {
  const entries: SolutionEntry[] = [];
  questionIds.forEach((id, i) => {
    const question = findQuestion(id);
    if (!question) return;
    entries.push(buildSolutionEntry(question, responses[id], i));
  });
  return entries;
}

/* ── Bảng phân tích chi tiết ───────────────────────────────────────────── */

export interface GroupStat {
  key: string;
  label: string;
  correct: number;
  total: number;
  ratio: number;
  /** Tổng thời gian (giây) đã dùng cho nhóm này. */
  seconds: number;
  /** Tổng thời gian mục tiêu (giây). */
  targetSeconds: number;
}

export interface Analysis {
  total: number;
  correct: number;
  ratio: number;
  seconds: number;
  targetSeconds: number;
  /** Số câu vượt gấp đôi thời gian mục tiêu. */
  sunkQuestions: number;
  errorCounts: Record<ErrorType, number>;
  /** Loại lỗi chiếm ưu thế trong các câu chưa đạt — quyết định việc cần làm tiếp. */
  dominantError: ErrorType | null;
  byTopic: GroupStat[];
  bySkill: GroupStat[];
  byDifficulty: GroupStat[];
  /** Nhận xét gắn với loại lỗi chiếm ưu thế. */
  verdict: string;
}

const EMPTY_ERRORS: Record<ErrorType, number> = {
  knowledge: 0,
  skill: 0,
  tactic: 0,
  lucky: 0,
  clean: 0,
};

/**
 * Tong hop bang phan tich.
 *
 * Ba lat cat — chuyen de, ky nang, do kho — tra loi ba cau hoi khac nhau:
 *   chuyen de → on lai chuong nao
 *   ky nang   → luyen dung ky thuat nao
 *   do kho    → tran nang luc dang o dau
 */
export function analyze(entries: readonly SolutionEntry[]): Analysis {
  const errorCounts: Record<ErrorType, number> = { ...EMPTY_ERRORS };
  const topics = new Map<string, GroupStat>();
  const skills = new Map<string, GroupStat>();
  const difficulty = new Map<string, GroupStat>();

  let correct = 0;
  let seconds = 0;
  let targetSeconds = 0;
  let sunkQuestions = 0;

  const bump = (
    map: Map<string, GroupStat>,
    key: string,
    label: string,
    entry: SolutionEntry,
  ): void => {
    const stat = map.get(key) ?? { key, label, correct: 0, total: 0, ratio: 0, seconds: 0, targetSeconds: 0 };
    stat.total += 1;
    if (entry.correct) stat.correct += 1;
    stat.seconds += entry.timeSeconds;
    stat.targetSeconds += entry.targetSeconds;
    stat.ratio = stat.total > 0 ? stat.correct / stat.total : 0;
    map.set(key, stat);
  };

  for (const entry of entries) {
    errorCounts[entry.errorType] += 1;
    if (entry.correct) correct += 1;
    seconds += entry.timeSeconds;
    targetSeconds += entry.targetSeconds;
    if (entry.timeRatio > SLOW_FACTOR) sunkQuestions += 1;

    bump(topics, entry.question.topicId, entry.topicLabel, entry);
    bump(difficulty, String(entry.question.difficulty), entry.difficultyLabel, entry);
    for (const skill of entry.question.skills) bump(skills, skill, skill, entry);
  }

  const problems: ErrorType[] = ['knowledge', 'skill', 'tactic'];
  const dominantError =
    problems.reduce<ErrorType | null>(
      (best, type) => (errorCounts[type] > (best ? errorCounts[best] : 0) ? type : best),
      null,
    ) ?? null;

  const total = entries.length;
  const ratio = total > 0 ? correct / total : 0;

  return {
    total,
    correct,
    ratio,
    seconds,
    targetSeconds,
    sunkQuestions,
    errorCounts,
    dominantError: dominantError && errorCounts[dominantError] > 0 ? dominantError : null,
    byTopic: [...topics.values()].sort((a, b) => a.ratio - b.ratio),
    bySkill: [...skills.values()].sort((a, b) => a.ratio - b.ratio || b.total - a.total),
    byDifficulty: [...difficulty.values()].sort((a, b) => Number(a.key) - Number(b.key)),
    verdict: verdictFor(errorCounts, ratio, seconds, targetSeconds),
  };
}

function verdictFor(
  errors: Record<ErrorType, number>,
  ratio: number,
  seconds: number,
  targetSeconds: number,
): string {
  const problems = errors.knowledge + errors.skill + errors.tactic;
  if (problems === 0) {
    return errors.lucky > 0
      ? `Không có câu nào sai, nhưng ${errors.lucky} câu đúng nhờ đoán. Những câu đó vẫn phải ôn lại như câu sai.`
      : 'Không có lỗi đáng kể. Nâng độ khó để tiếp tục tiến bộ — làm lại ở mức này gần như không tạo thêm gì.';
  }

  const overTime = targetSeconds > 0 && seconds > targetSeconds * 1.15;
  const parts: string[] = [];

  if (errors.knowledge >= errors.skill && errors.knowledge >= errors.tactic) {
    parts.push(
      `Chủ yếu là lỗi kiến thức (${errors.knowledge} câu). Làm thêm bài ở mức này sẽ không giúp gì — phải quay lại phần lý thuyết và làm phiếu khởi động cùng chuyên đề trước.`,
    );
  } else if (errors.skill >= errors.tactic) {
    parts.push(
      `Chủ yếu là lỗi kỹ năng (${errors.skill} câu): bạn biết hướng nhưng sai bước hoặc quá chậm. Cách chữa là luyện lặp trên đúng dạng bài này, không phải học lại lý thuyết.`,
    );
  } else {
    parts.push(
      `Chủ yếu là lỗi chiến thuật (${errors.tactic} câu): bỏ trống hoặc hết giờ. Đây là loại lỗi sửa được ngay trong lượt sau mà không cần học thêm gì.`,
    );
  }

  if (overTime) {
    parts.push('Tổng thời gian vượt ngân sách — hãy đặt trần thời gian cho từng câu thay vì chỉ nhìn tổng.');
  }
  if (ratio >= 0.85) {
    parts.push('Tỉ lệ đúng đã cao; phần còn lại là tinh chỉnh chứ không phải làm lại từ đầu.');
  }

  return parts.join(' ');
}

/* ── Tổng hợp toàn hồ sơ ───────────────────────────────────────────────── */

export interface KnowledgeGap {
  topicId: string;
  label: string;
  wrong: number;
  total: number;
  ratio: number;
  /** Các bẫy đã thực sự mắc phải, lấy từ chú thích của câu hỏi. */
  trapsHit: string[];
  knowledge: KnowledgeSheet | undefined;
}

/**
 * Tim lo hong kien thuc tren TOAN BO ho so, khong chi mot bai.
 *
 * Khac biet quan trong: mot cau sai la tai nan, mot chu de sai lap lai nhieu
 * lan qua nhieu bai moi la lo hong. Ham nay chi tra ve loai thu hai.
 */
export function knowledgeGaps(entriesList: ReadonlyArray<readonly SolutionEntry[]>): KnowledgeGap[] {
  const map = new Map<string, KnowledgeGap>();

  for (const entries of entriesList) {
    for (const entry of entries) {
      const gap =
        map.get(entry.question.topicId) ??
        ({
          topicId: entry.question.topicId,
          label: entry.topicLabel,
          wrong: 0,
          total: 0,
          ratio: 0,
          trapsHit: [],
          knowledge: entry.knowledge,
        } satisfies KnowledgeGap);

      gap.total += 1;
      if (!entry.correct) {
        gap.wrong += 1;
        if (entry.trapNote && !gap.trapsHit.includes(entry.trapNote)) gap.trapsHit.push(entry.trapNote);
      }
      gap.ratio = gap.total > 0 ? gap.wrong / gap.total : 0;
      map.set(entry.question.topicId, gap);
    }
  }

  return [...map.values()]
    .filter((gap) => gap.wrong >= 2)
    .sort((a, b) => b.wrong - a.wrong || b.ratio - a.ratio);
}
