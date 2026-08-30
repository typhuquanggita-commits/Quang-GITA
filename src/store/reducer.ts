import { MASTERED_TO_LEVEL_UP, MAX_LEVEL } from '../data/curriculum';
import { findQuestion } from '../data/questions';
import { activeWorksheets, worksheetById } from '../data/worksheets';
import { gradeWorksheet, type WorksheetOutcome } from '../lib/progression';
import { updateMastery } from '../lib/analytics';
import { dayKey } from '../lib/format';
import { gradeAttempt, isCorrect } from '../lib/scoring';
import { createCard, schedule, type Grade } from '../lib/srs';
import { buildPlacement, type PlacementAnswer } from '../lib/placement';
import { sanitizeProfile, sanitizeSettings } from '../lib/storage';
import type {
  Attempt,
  Confidence,
  PersistedState,
  Profile,
  Response,
  ExecutionError,
  Section3Choice,
  SectionId,
  Settings,
  WorksheetProgress,
  WorksheetRecord,
} from '../types';

export type Action =
  | { type: 'settings/update'; patch: Partial<Settings> }
  | { type: 'profile/update'; patch: Partial<Profile> }
  | { type: 'attempt/start'; attempt: Attempt }
  | {
      type: 'attempt/answer';
      attemptId: string;
      questionId: string;
      value: string | null;
      confidence?: Confidence;
      now?: number;
    }
  | { type: 'attempt/flag'; attemptId: string; questionId: string }
  | {
      type: 'attempt/time';
      attemptId: string;
      sectionIndex: number;
      deltaMs: number;
      questionId?: string;
    }
  | { type: 'attempt/cursor'; attemptId: string; section: number; index: number }
  | { type: 'attempt/submit'; attemptId: string; now?: number }
  | { type: 'attempt/abandon'; attemptId: string }
  | {
      type: 'worksheet/submit';
      worksheetId: string;
      responses: Record<string, Response>;
      now?: number;
    }
  | { type: 'track/levelUp'; topicId: string }
  | { type: 'stage/promote' }
  | { type: 'habit/toggle'; habitId: string; date?: string }
  | {
      type: 'execError/log';
      classId: string;
      section: SectionId;
      note: string;
      questionId?: string;
      now?: number;
    }
  | { type: 'execError/remove'; id: string }
  | { type: 'srs/grade'; questionId: string; grade: Grade; now?: number; maxIntervalDays?: number }
  | { type: 'srs/remove'; questionId: string }
  | {
      type: 'placement/complete';
      answers: readonly PlacementAnswer[];
      section3: Section3Choice;
      durationMs: number;
      now?: number;
    }
  | { type: 'state/replace'; state: PersistedState };

const EMPTY_RESPONSE = (questionId: string): Response => ({
  questionId,
  value: null,
  flagged: false,
  timeSpentMs: 0,
  visits: 0,
  changes: 0,
});

export function reducer(state: PersistedState, action: Action): PersistedState {
  switch (action.type) {
    case 'settings/update':
      return { ...state, settings: sanitizeSettings({ ...state.settings, ...action.patch }) };

    case 'profile/update':
      // Di qua sanitize de doi vai tro khong bao gio de lai cap bac cao hon so
      // bac ma vai tro moi co — do la mot ke ho leo thang quyen kin dao.
      return { ...state, profile: sanitizeProfile({ ...state.profile, ...action.patch }) };

    case 'attempt/start': {
      // Bai dang lam do dang truoc do duoc danh dau bo, khong xoa —
      // nguoi hoc van xem lai duoc lich su.
      const attempts = state.attempts.map((a) =>
        a.status === 'in_progress' ? { ...a, status: 'abandoned' as const } : a,
      );
      return { ...state, attempts: [...attempts, action.attempt] };
    }

    case 'attempt/answer':
      return patchAttempt(state, action.attemptId, (attempt) => {
        const previous = attempt.responses[action.questionId] ?? EMPTY_RESPONSE(action.questionId);
        const changed = previous.value !== null && previous.value !== action.value;
        const next: Response = {
          ...previous,
          value: action.value,
          changes: previous.changes + (changed ? 1 : 0),
          answeredAt: action.now ?? Date.now(),
        };
        if (action.confidence) next.confidence = action.confidence;
        return { ...attempt, responses: { ...attempt.responses, [action.questionId]: next } };
      });

    case 'attempt/flag':
      return patchAttempt(state, action.attemptId, (attempt) => {
        const previous = attempt.responses[action.questionId] ?? EMPTY_RESPONSE(action.questionId);
        return {
          ...attempt,
          responses: {
            ...attempt.responses,
            [action.questionId]: { ...previous, flagged: !previous.flagged },
          },
        };
      });

    case 'attempt/time':
      return patchAttempt(state, action.attemptId, (attempt) => {
        const sections = attempt.sections.map((run, i) =>
          i === action.sectionIndex ? { ...run, elapsedMs: run.elapsedMs + action.deltaMs } : run,
        );
        if (!action.questionId) return { ...attempt, sections };
        const previous =
          attempt.responses[action.questionId] ?? EMPTY_RESPONSE(action.questionId);
        return {
          ...attempt,
          sections,
          responses: {
            ...attempt.responses,
            [action.questionId]: {
              ...previous,
              timeSpentMs: previous.timeSpentMs + action.deltaMs,
            },
          },
        };
      });

    case 'attempt/cursor':
      return patchAttempt(state, action.attemptId, (attempt) => {
        const questionId = attempt.sections[action.section]?.questionIds[action.index];
        const responses = { ...attempt.responses };
        if (questionId) {
          const previous = responses[questionId] ?? EMPTY_RESPONSE(questionId);
          responses[questionId] = { ...previous, visits: previous.visits + 1 };
        }
        return { ...attempt, cursorSection: action.section, cursorIndex: action.index, responses };
      });

    case 'attempt/submit':
      return submitAttempt(state, action.attemptId, action.now ?? Date.now());

    case 'attempt/abandon':
      return patchAttempt(state, action.attemptId, (attempt) => ({
        ...attempt,
        status: 'abandoned' as const,
      }));

    case 'worksheet/submit':
      return submitWorksheet(state, action.worksheetId, action.responses, action.now ?? Date.now());

    case 'track/levelUp': {
      const track = state.tracks[action.topicId];
      const level = track?.level ?? 1;
      if (level >= MAX_LEVEL) return state;
      return {
        ...state,
        tracks: {
          ...state.tracks,
          [action.topicId]: {
            topicId: action.topicId,
            level: level + 1,
            xp: track?.xp ?? 0,
            // Bo dem thanh thao dat lai tu dau o cap moi.
            masteredAtLevel: 0,
          },
        },
      };
    }

    case 'stage/promote':
      return state.stage >= 3 ? state : { ...state, stage: state.stage + 1 };

    case 'habit/toggle': {
      const key = action.date ?? dayKey();
      const log = state.habits[action.habitId] ?? { habitId: action.habitId, done: [] };
      const done = log.done.includes(key)
        ? log.done.filter((d) => d !== key)
        // Giu toi da 180 ngay gan nhat: du de ve bieu do, du nho de khong phinh
        // localStorage sau nhieu nam su dung.
        : [...log.done, key].sort().slice(-180);
      return { ...state, habits: { ...state.habits, [action.habitId]: { habitId: action.habitId, done } } };
    }

    case 'execError/log': {
      const at = action.now ?? Date.now();
      const entry: ExecutionError = {
        id: `ee_${at.toString(36)}_${state.executionErrors.length.toString(36)}`,
        at,
        classId: action.classId,
        section: action.section,
        note: action.note.trim().slice(0, 400),
        ...(action.questionId ? { questionId: action.questionId } : {}),
      };
      // Giu 500 muc gan nhat: du de tinh ti le tren muoi de, du nho de khong
      // phinh localStorage sau ca mua thi.
      return { ...state, executionErrors: [...state.executionErrors, entry].slice(-500) };
    }

    case 'execError/remove':
      return { ...state, executionErrors: state.executionErrors.filter((e) => e.id !== action.id) };

    case 'srs/grade': {
      const card = state.srs[action.questionId];
      if (!card) return state;
      const options: { now: number; maxIntervalDays?: number } = { now: action.now ?? Date.now() };
      if (action.maxIntervalDays !== undefined) options.maxIntervalDays = action.maxIntervalDays;
      return { ...state, srs: { ...state.srs, [action.questionId]: schedule(card, action.grade, options) } };
    }

    case 'srs/remove': {
      const srs = { ...state.srs };
      delete srs[action.questionId];
      return { ...state, srs };
    }

    case 'placement/complete': {
      const outcome = buildPlacement(
        action.answers,
        action.section3,
        action.durationMs,
        action.now ?? Date.now(),
      );
      // Dinh vi GIEO diem xuat phat, khong ghi de tien do da co. Nguoi hoc lam
      // lai bai dinh vi sau vai tuan van giu nguyen phieu da lam va the on tap
      // dang den han — chi cap do va muc thanh thao duoc dat lai.
      return {
        ...state,
        placement: outcome.record,
        mastery: { ...state.mastery, ...outcome.mastery },
        tracks: { ...state.tracks, ...outcome.tracks },
        srs: { ...outcome.srs, ...state.srs },
        stage: Math.max(state.stage, outcome.stage),
        settings: { ...state.settings, section3: action.section3 },
      };
    }

    case 'state/replace':
      return action.state;

    default:
      return state;
  }
}

function patchAttempt(
  state: PersistedState,
  attemptId: string,
  patch: (attempt: Attempt) => Attempt,
): PersistedState {
  const index = state.attempts.findIndex((a) => a.id === attemptId);
  if (index === -1) return state;
  const current = state.attempts[index];
  if (!current) return state;
  const attempts = state.attempts.slice();
  attempts[index] = patch(current);
  return { ...state, attempts };
}

/**
 * Chot bai lam: cham diem, cap nhat do thanh thao, dua cau can nho vao so tay
 * loi sai va ghi nhat ky ngay.
 *
 * Tat ca duoc lam mot lan tai day (thay vi rai rac o moi lan tra loi) de thao
 * tac la BAT BIEN: nop lai cung mot bai khong lam so lieu bi cong doi.
 */
function submitAttempt(state: PersistedState, attemptId: string, now: number): PersistedState {
  const attempt = state.attempts.find((a) => a.id === attemptId);
  if (!attempt || attempt.status === 'submitted') return state;

  const result = gradeAttempt(attempt, findQuestion, now);

  const mastery = { ...state.mastery };
  const srs = { ...state.srs };
  const seen = { ...state.seen };
  let questionCount = 0;
  let correctCount = 0;
  let totalMs = 0;

  for (const run of attempt.sections) {
    for (const questionId of run.questionIds) {
      const question = findQuestion(questionId);
      if (!question) continue;
      const response = attempt.responses[questionId];
      const ok = isCorrect(question, response?.value ?? null);
      const timeMs = response?.timeSpentMs ?? 0;

      mastery[question.topicId] = updateMastery(mastery[question.topicId], question, ok, timeMs, now);
      seen[questionId] = (seen[questionId] ?? 0) + 1;
      questionCount += 1;
      totalMs += timeMs;
      if (ok) correctCount += 1;

      const reason = cardReason(ok, response, question.estimatedSeconds);
      if (reason) {
        // Cau da co the: giu lich on tap hien tai, chi ha muc do khi sai lai.
        const existing = srs[questionId];
        srs[questionId] = existing
          ? schedule(existing, ok ? 1 : 0, { now })
          : createCard(questionId, reason, now);
      }
    }
  }

  const key = dayKey(new Date(now));
  const today = state.days[key] ?? { date: key, questions: 0, correct: 0, minutes: 0 };

  return {
    ...state,
    attempts: state.attempts.map((a) =>
      a.id === attemptId ? { ...a, status: 'submitted' as const, submittedAt: now } : a,
    ),
    results: [...state.results, result],
    mastery,
    srs,
    seen,
    days: {
      ...state.days,
      [key]: {
        date: key,
        questions: today.questions + questionCount,
        correct: today.correct + correctCount,
        minutes: today.minutes + Math.round(totalMs / 60000),
      },
    },
  };
}

/**
 * Cau nao dang duoc dua vao so tay loi sai?
 *  - Sai: hien nhien.
 *  - Dung nhung tu nhan la doan: diem may man, lan sau chua chac lap lai.
 *  - Dung nhung ton gap doi thoi gian muc tieu: chua thanh thao, se thieu gio.
 */
function cardReason(
  correct: boolean,
  response: Response | undefined,
  estimatedSeconds: number,
): 'wrong' | 'lucky' | 'slow' | null {
  if (!correct) return 'wrong';
  if (response?.confidence === 'guess') return 'lucky';
  if (response && response.timeSpentMs > estimatedSeconds * 2000) return 'slow';
  return null;
}


/**
 * Chot mot phieu luyen.
 *
 * Cung mot duong ong voi `submitAttempt`: cham → cap nhat do thanh thao →
 * dua cau can nho vao so tay → ghi nhat ky ngay. Khac biet la ket qua con
 * ghi lai tien do cua phieu va cong diem kinh nghiem cho tuyen chu de.
 *
 * Diem tot nhat duoc GIU LAI, khong bi ghi de boi lan lam kem hon — nguoi hoc
 * khong bao gio bi phat vi lam lai de on tap.
 */
function submitWorksheet(
  state: PersistedState,
  worksheetId: string,
  responses: Record<string, Response>,
  now: number,
): PersistedState {
  const sheet = worksheetById(worksheetId);
  if (!sheet) return state;

  const outcome: WorksheetOutcome = gradeWorksheet(sheet, responses);

  const mastery = { ...state.mastery };
  const srs = { ...state.srs };
  const seen = { ...state.seen };
  let correctCount = 0;
  let questionCount = 0;

  for (const part of sheet.parts) {
    for (const questionId of part.questionIds) {
      const question = findQuestion(questionId);
      if (!question) continue;
      const response = responses[questionId];
      const ok = isCorrect(question, response?.value ?? null);
      const timeMs = response?.timeSpentMs ?? 0;

      mastery[question.topicId] = updateMastery(mastery[question.topicId], question, ok, timeMs, now);
      seen[questionId] = (seen[questionId] ?? 0) + 1;
      questionCount += 1;
      if (ok) correctCount += 1;

      const reason = cardReason(ok, response, question.estimatedSeconds);
      if (reason) {
        const existing = srs[questionId];
        srs[questionId] = existing ? schedule(existing, ok ? 1 : 0, { now }) : createCard(questionId, reason, now);
      }
    }
  }

  const previous = state.worksheets[worksheetId];
  const progress: WorksheetProgress = {
    worksheetId,
    attempts: (previous?.attempts ?? 0) + 1,
    bestRatio: Math.max(previous?.bestRatio ?? 0, outcome.ratio),
    lastRatio: outcome.ratio,
    passed: (previous?.passed ?? false) || outcome.passed,
    mastered: (previous?.mastered ?? false) || outcome.mastered,
    totalTimeMs: (previous?.totalTimeMs ?? 0) + outcome.timeMs,
    lastAttemptAt: now,
  };

  const key = dayKey(new Date(now));
  const today = state.days[key] ?? { date: key, questions: 0, correct: 0, minutes: 0 };

  const worksheets = { ...state.worksheets, [worksheetId]: progress };

  // Luu lai nguyen ven luot lam nay de nguoi hoc mo lai bo giai de va bang
  // phan tich bat cu luc nao — day la vien gach cua ho so hoc vien.
  const record: WorksheetRecord = {
    id: `run_${now.toString(36)}_${worksheetId}`,
    worksheetId,
    submittedAt: now,
    responses,
    correct: outcome.correct,
    total: outcome.total,
    ratio: outcome.ratio,
    timeMs: outcome.timeMs,
    passed: outcome.passed,
    mastered: outcome.mastered,
    xpEarned: outcome.xpEarned,
  };

  // Diem kinh nghiem chi duoc cong cho LAN CAI THIEN, khong cong lai moi luot —
  // nguoc lai nguoi hoc se cay lai mot phieu de de leo cap ma khong tien bo.
  const improved = outcome.ratio > (previous?.bestRatio ?? 0);
  const gained = improved || !previous ? outcome.xpEarned : 0;

  const track = state.tracks[sheet.topicId];
  const level = track?.level ?? 1;
  const masteredAtLevel = activeWorksheets(state.settings.section3).filter(
    (s) => s.topicId === sheet.topicId && s.level === level && worksheets[s.id]?.mastered,
  ).length;

  return {
    ...state,
    worksheets,
    worksheetRuns: [...state.worksheetRuns, record].slice(-300),
    mastery,
    srs,
    seen,
    xp: state.xp + gained,
    tracks: {
      ...state.tracks,
      [sheet.topicId]: {
        topicId: sheet.topicId,
        level,
        xp: (track?.xp ?? 0) + gained,
        masteredAtLevel: Math.min(masteredAtLevel, MASTERED_TO_LEVEL_UP * 10),
      },
    },
    days: {
      ...state.days,
      [key]: {
        date: key,
        questions: today.questions + questionCount,
        correct: today.correct + correctCount,
        minutes: today.minutes + Math.round(outcome.timeMs / 60000),
      },
    },
  };
}
