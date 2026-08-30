import { MAX_TOTAL_SCORE } from '../config';
import { STAGES } from '../data/curriculum';
import { GITA_PILLARS } from '../data/gita';
import { worksheetById } from '../data/worksheets';
import { missionForWorksheet } from '../data/missions';
import type { ErrorType, PersistedState } from '../types';
import { summarize } from './analytics';
import { daysUntil } from './format';
import {
  actionLevelOf,
  paretoFocus,
  practitionerLevelOf,
  tierStatus,
  weakestPillar,
} from './gita';
import { buildMilestones, rankWeakTopics, type WeeklyMilestone } from './plan';
import { recommendedWorksheets } from './progression';
import {
  ERROR_LABEL,
  analyze,
  buildSolutionSheet,
  knowledgeGaps,
  type KnowledgeGap,
  type SolutionEntry,
} from './solutions';
import { dueNow, streakOf } from '../store/selectors';

/**
 * HO SO HOC VIEN
 *
 * Gop toan bo dau vet hoc tap — tung luot lam phieu, tung bai thi thu, tung
 * cau sai, tung thoi quen — thanh MOT ho so, roi tu ho so do sinh ra lo trinh
 * ca nhan hoa.
 *
 * Nguyen tac: lo trinh khong duoc dua tren cam nhan. Moi buoc trong lo trinh
 * deu phai truy nguoc duoc ve mot con so cu the trong ho so, va man hinh luon
 * hien ly do ben canh viec can lam.
 */

export interface DossierEntry {
  kind: 'worksheet' | 'exam';
  id: string;
  title: string;
  subtitle: string;
  at: number;
  correct: number;
  total: number;
  ratio: number;
  /** Duong dan toi bo giai de va bang phan tich cua luot nay. */
  href: string;
}

export interface RoadmapStep {
  id: string;
  order: number;
  title: string;
  /** Vi sao buoc nay o day — luon truy nguoc ve mot con so trong ho so. */
  reason: string;
  action: string;
  href?: string;
  /** Ước lượng thời gian, phút. */
  minutes: number;
}

export interface Dossier {
  /** Vi tri hien tai tren moi truc. */
  tierId: string;
  tierName: string;
  actionLevelId: string;
  actionLevelName: string;
  stageName: string;
  practitionerId: string | null;
  xp: number;
  projected: number;
  target: number;
  daysLeft: number | null;
  streak: number;

  /** Khoi luong da tich luy. */
  totalQuestions: number;
  totalMinutes: number;
  sessions: number;
  firstActivity: number | null;
  lastActivity: number | null;

  /** Chan dung loi tren toan ho so. */
  errorCounts: Record<ErrorType, number>;
  dominantError: ErrorType | null;

  gaps: KnowledgeGap[];
  history: DossierEntry[];
  milestones: WeeklyMilestone[];
  roadmap: RoadmapStep[];
}

export function buildDossier(state: PersistedState, now: Date = new Date()): Dossier {
  const summary = summarize(state);
  const tier = tierStatus(state, now);
  const action = actionLevelOf(state, now);
  const due = dueNow(state, now.getTime());
  const pareto = paretoFocus(state, now);
  const pillar = weakestPillar(state, now);

  /* Gom tat ca luot lam — phieu luyen va thi thu — thanh mot dong thoi gian. */
  const sheets: SolutionEntry[][] = [];
  const history: DossierEntry[] = [];

  for (const run of state.worksheetRuns) {
    const sheet = worksheetById(run.worksheetId);
    const questionIds = sheet
      ? sheet.parts.flatMap((p) => p.questionIds)
      : Object.keys(run.responses);
    const entries = buildSolutionSheet(questionIds, run.responses);
    sheets.push(entries);
    history.push({
      kind: 'worksheet',
      id: run.id,
      title: sheet?.title ?? run.worksheetId,
      subtitle: [sheet?.code, missionForWorksheet(run.worksheetId)?.code].filter(Boolean).join(' · '),
      at: run.submittedAt,
      correct: run.correct,
      total: run.total,
      ratio: run.ratio,
      href: `#/solutions?run=${encodeURIComponent(run.id)}`,
    });
  }

  for (const result of state.results) {
    const attempt = state.attempts.find((a) => a.id === result.attemptId);
    if (!attempt) continue;
    const questionIds = attempt.sections.flatMap((s) => s.questionIds);
    const entries = buildSolutionSheet(questionIds, attempt.responses);
    sheets.push(entries);
    const correct = entries.filter((e) => e.correct).length;
    history.push({
      kind: 'exam',
      id: attempt.id,
      title: attempt.label,
      subtitle: `${result.total.toFixed(1)}/${MAX_TOTAL_SCORE} điểm`,
      at: result.submittedAt,
      correct,
      total: entries.length,
      ratio: entries.length > 0 ? correct / entries.length : 0,
      href: `#/solutions?attempt=${encodeURIComponent(attempt.id)}`,
    });
  }

  history.sort((a, b) => b.at - a.at);

  const overall = analyze(sheets.flat());
  const gaps = knowledgeGaps(sheets);

  const days = Object.values(state.days);
  const totalQuestions = days.reduce((n, d) => n + d.questions, 0);
  const totalMinutes = days.reduce((n, d) => n + d.minutes, 0);
  const times = history.map((h) => h.at);

  const dossier: Omit<Dossier, 'roadmap'> = {
    tierId: tier.tier.id,
    tierName: tier.tier.name,
    actionLevelId: action.id,
    actionLevelName: action.name,
    stageName: STAGES.find((s) => s.stage === state.stage)?.name ?? `Giai đoạn ${state.stage}`,
    practitionerId: practitionerLevelOf(state.profile.role, state.profile.rank),
    xp: state.xp,
    projected: summary.projected,
    target: state.settings.targetScore,
    daysLeft: state.settings.examDate ? daysUntil(state.settings.examDate, now) : null,
    streak: streakOf(state),
    totalQuestions,
    totalMinutes,
    sessions: history.length,
    firstActivity: times.length > 0 ? Math.min(...times) : null,
    lastActivity: times.length > 0 ? Math.max(...times) : null,
    errorCounts: overall.errorCounts,
    dominantError: overall.dominantError,
    gaps,
    history,
    milestones: buildMilestones(summary.projected, state.settings.targetScore, state.settings.examDate, state.mastery, now),
  };

  return {
    ...dossier,
    roadmap: buildRoadmap(state, dossier, {
      dueCount: due.length,
      paretoTopics: pareto.topics.map((t) => ({ id: t.topicId, name: t.name })),
      focusRatio: pareto.focusRatio,
      weakPillar: pillar.pillar,
      weakPillarNote: pillar.note,
      now,
    }),
  };
}

interface RoadmapInput {
  dueCount: number;
  paretoTopics: Array<{ id: string; name: string }>;
  focusRatio: number;
  weakPillar: string;
  weakPillarNote: string;
  now: Date;
}

/**
 * Sinh lo trinh ca nhan hoa.
 *
 * Thu tu cac buoc khong ngau nhien — no theo dung logic chua benh:
 *   1. Cam mau truoc  → cau qua han, cau bo trong
 *   2. Chua dung loai loi → kien thuc / ky nang / chien thuat can ba cach khac nhau
 *   3. Don suc dung cho → vung 20/80
 *   4. Vun tru cot dang trong → mo thuc GITA
 *   5. Mai so truong    → thu dua len nhom dan dau
 */
function buildRoadmap(
  state: PersistedState,
  dossier: Omit<Dossier, 'roadmap'>,
  input: RoadmapInput,
): RoadmapStep[] {
  const steps: RoadmapStep[] = [];
  const push = (step: Omit<RoadmapStep, 'order'>): void => {
    steps.push({ ...step, order: steps.length + 1 });
  };

  if (input.dueCount > 0) {
    push({
      id: 'srs',
      title: `Ôn ${input.dueCount} câu đang đến hạn`,
      reason: `Sổ tay lỗi sai có ${input.dueCount} câu quá hạn. Kiến thức đã học phai đi trong im lặng, và ôn đúng ngày đến hạn rẻ hơn học lại từ đầu rất nhiều.`,
      action: 'Mở sổ tay lỗi sai và xử lý hết phần đến hạn trước khi học thứ mới.',
      href: '#/review',
      minutes: Math.max(5, Math.round(input.dueCount * 1.2)),
    });
  }

  if (dossier.errorCounts.tactic >= 3) {
    push({
      id: 'tactic',
      title: 'Sửa quy trình làm bài trước khi học thêm',
      reason: `Hồ sơ ghi nhận ${dossier.errorCounts.tactic} câu bỏ trống hoặc hết giờ. Đây là điểm mất nhiều nhất mà không cần học thêm kiến thức nào.`,
      action:
        'Đặt hai quy tắc cứng: trần 2 phút cho mỗi câu, và còn 2 phút cuối thì điền hết ô trống. Áp dụng ngay trong phiếu tiếp theo.',
      href: '#/practice',
      minutes: 5,
    });
  }

  const topGap = dossier.gaps[0];
  if (topGap) {
    const knowledgeHeavy = dossier.dominantError === 'knowledge';
    push({
      id: 'gap',
      title: `${knowledgeHeavy ? 'Học lại lý thuyết' : 'Luyện lặp'}: ${topGap.label}`,
      reason: `Chuyên đề này sai ${topGap.wrong}/${topGap.total} câu trên toàn hồ sơ — sai lặp lại nhiều lần nên đây là lỗ hổng, không phải tai nạn.${
        topGap.trapsHit.length > 0 ? ` Bẫy đã mắc: ${topGap.trapsHit[0]}` : ''
      }`,
      action: knowledgeHeavy
        ? 'Đọc phiếu kiến thức của chuyên đề trong bộ giải đề, rồi làm một phiếu khởi động cùng chuyên đề — đừng làm bài khó ngay.'
        : 'Làm hai phiếu rèn kỹ năng liên tiếp ở đúng chuyên đề này, có bấm giờ.',
      href: `#/practice?topic=${encodeURIComponent(topGap.topicId)}`,
      minutes: 30,
    });
  }

  if (input.focusRatio < 0.6 && input.paretoTopics.length > 0) {
    push({
      id: 'pareto',
      title: 'Dồn sức vào vùng 20/80',
      reason: `Chỉ ${Math.round(input.focusRatio * 100)}% công sức 14 ngày qua rơi vào nhóm chuyên đề đang chiếm 80% số điểm bạn có thể lấy lại. Phần còn lại đang bị rải mỏng.`,
      action: `Tuần tới dành ít nhất 7/10 phiếu cho: ${input.paretoTopics.slice(0, 3).map((t) => t.name).join(', ')}.`,
      href: '#/gita',
      minutes: 0,
    });
  }

  const pillar = GITA_PILLARS.find((p) => p.id === input.weakPillar);
  if (pillar) {
    push({
      id: 'pillar',
      title: `Vun trụ cột đang trống: ${pillar.letter} — ${pillar.name}`,
      reason: input.weakPillarNote,
      action: `Sản phẩm hữu hình cần có: ${pillar.artifact}`,
      href: '#/gita',
      minutes: 15,
    });
  }

  const strengths = rankWeakTopics(state.mastery, 30)
    .filter((t) => t.mastery >= 0.75)
    .slice(0, 1);
  const strongest = strengths[0];
  if (strongest) {
    push({
      id: 'strength',
      title: `Mài sở trường: ${strongest.name}`,
      reason: `Thành thạo ${Math.round(strongest.mastery * 100)}% — đây là tuyến mạnh nhất của bạn. Vá chỗ thủng giữ cho bạn không mất điểm, nhưng mài sở trường mới là thứ đưa bạn lên nhóm dẫn đầu.`,
      action: 'Làm một phiếu thử thách hoặc vượt ải ở tuyến này mỗi tuần.',
      href: `#/practice?topic=${encodeURIComponent(strongest.topicId)}`,
      minutes: 20,
    });
  }

  const next = recommendedWorksheets(state, 1)[0];
  if (next) {
    push({
      id: 'next',
      title: `Phiếu tiếp theo: ${next.title}`,
      reason: 'Đúng cấp độ hiện tại của tuyến này và nằm trong nhóm chuyên đề ưu tiên.',
      action: next.objective,
      href: `#/worksheet?id=${encodeURIComponent(next.id)}`,
      minutes: Math.max(1, Math.round(next.seconds / 60)),
    });
  }

  if (steps.length === 0) {
    push({
      id: 'start',
      title: 'Làm phiếu luyện đầu tiên',
      reason: 'Hồ sơ chưa có dữ liệu nào, nên chưa thể cá nhân hóa. Một phiếu là đủ để hệ thống dựng bản đồ năng lực.',
      action: 'Mở thư viện phiếu luyện và bắt đầu ở cấp 1.',
      href: '#/practice',
      minutes: 10,
    });
  }

  return steps;
}

export { ERROR_LABEL };
