import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Confidence, Response, Worksheet } from '../../types';

/**
 * Trang thai mot luot lam phieu.
 *
 * Ban nhap duoc luu vao sessionStorage sau moi thay doi: lo tay dong tab hay
 * F5 giua chung thi mo lai van con nguyen bai. Khong dung localStorage vi ban
 * nhap la thu tam thoi — chi ket qua da nop moi thuoc ve ho so hoc tap lau dai.
 */

const DRAFT_PREFIX = 'hsa365:draft:';

export interface WorksheetRun {
  partIndex: number;
  questionIndex: number;
  responses: Record<string, Response>;
  startedAt: number;
  /** Mốc thời gian bắt đầu từng chặng (ms). */
  partStartedAt: number;
}

function emptyRun(): WorksheetRun {
  return {
    partIndex: 0,
    questionIndex: 0,
    responses: {},
    startedAt: Date.now(),
    partStartedAt: Date.now(),
  };
}

function readDraft(worksheetId: string): WorksheetRun | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_PREFIX + worksheetId);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WorksheetRun | null;
    // Ban nhap co the do phien ban cu de lai hoac bi sua tay. Kiem tra du de
    // mot ban nhap hong khong lam trang man hinh giua buoi lam bai.
    if (
      !parsed ||
      typeof parsed !== 'object' ||
      typeof parsed.partIndex !== 'number' ||
      typeof parsed.questionIndex !== 'number' ||
      typeof parsed.responses !== 'object' ||
      parsed.responses === null ||
      Array.isArray(parsed.responses)
    ) {
      return null;
    }
    return {
      ...parsed,
      partIndex: Math.max(0, Math.trunc(parsed.partIndex)),
      questionIndex: Math.max(0, Math.trunc(parsed.questionIndex)),
      startedAt: typeof parsed.startedAt === 'number' ? parsed.startedAt : Date.now(),
      partStartedAt: typeof parsed.partStartedAt === 'number' ? parsed.partStartedAt : Date.now(),
    };
  } catch {
    return null;
  }
}

export function clearDraft(worksheetId: string): void {
  try {
    sessionStorage.removeItem(DRAFT_PREFIX + worksheetId);
  } catch {
    /* bộ nhớ phiên bị chặn — bỏ qua, bài vẫn làm được bình thường */
  }
}

export function useWorksheetRun(sheet: Worksheet | undefined) {
  const [run, setRun] = useState<WorksheetRun>(() =>
    sheet ? (readDraft(sheet.id) ?? emptyRun()) : emptyRun(),
  );
  // Thời điểm vào câu hiện tại, dùng để tính thời gian thực trên từng câu.
  const enteredAt = useRef(Date.now());

  useEffect(() => {
    if (!sheet) return;
    setRun(readDraft(sheet.id) ?? emptyRun());
    enteredAt.current = Date.now();
  }, [sheet?.id]);

  useEffect(() => {
    if (!sheet) return;
    try {
      sessionStorage.setItem(DRAFT_PREFIX + sheet.id, JSON.stringify(run));
    } catch {
      /* bỏ qua */
    }
  }, [sheet?.id, run]);

  const questionIds = useMemo(
    () => sheet?.parts[run.partIndex]?.questionIds ?? [],
    [sheet, run.partIndex],
  );

  /** Ghi thời gian đã ở trên câu hiện tại vào bản nháp. */
  const commitTime = useCallback(
    (draft: WorksheetRun): WorksheetRun => {
      const currentId = draft.responses ? questionIds[draft.questionIndex] : undefined;
      if (!currentId) return draft;
      const now = Date.now();
      const delta = now - enteredAt.current;
      enteredAt.current = now;
      const previous = draft.responses[currentId] ?? blank(currentId);
      return {
        ...draft,
        responses: {
          ...draft.responses,
          [currentId]: { ...previous, timeSpentMs: previous.timeSpentMs + delta },
        },
      };
    },
    [questionIds],
  );

  const answer = useCallback((questionId: string, value: string | null) => {
    setRun((draft) => {
      const previous = draft.responses[questionId] ?? blank(questionId);
      return {
        ...draft,
        responses: {
          ...draft.responses,
          [questionId]: {
            ...previous,
            value,
            changes: previous.value !== null && previous.value !== value ? previous.changes + 1 : previous.changes,
            answeredAt: Date.now(),
          },
        },
      };
    });
  }, []);

  const setConfidence = useCallback((questionId: string, confidence: Confidence) => {
    setRun((draft) => {
      const previous = draft.responses[questionId] ?? blank(questionId);
      return { ...draft, responses: { ...draft.responses, [questionId]: { ...previous, confidence } } };
    });
  }, []);

  const toggleFlag = useCallback((questionId: string) => {
    setRun((draft) => {
      const previous = draft.responses[questionId] ?? blank(questionId);
      return {
        ...draft,
        responses: { ...draft.responses, [questionId]: { ...previous, flagged: !previous.flagged } },
      };
    });
  }, []);

  const goToQuestion = useCallback(
    (index: number) => {
      setRun((draft) => {
        const next = commitTime(draft);
        const bounded = Math.max(0, Math.min(questionIds.length - 1, index));
        return {
          ...next,
          questionIndex: bounded,
          responses: {
            ...next.responses,
            ...visit(next.responses, questionIds[bounded]),
          },
        };
      });
    },
    [commitTime, questionIds],
  );

  const goToPart = useCallback(
    (index: number) => {
      setRun((draft) => {
        const next = commitTime(draft);
        return { ...next, partIndex: index, questionIndex: 0, partStartedAt: Date.now() };
      });
    },
    [commitTime],
  );

  /** Chốt thời gian lần cuối rồi trả về bộ trả lời để chấm. */
  const finalize = useCallback((): Record<string, Response> => {
    let snapshot: Record<string, Response> = {};
    setRun((draft) => {
      const next = commitTime(draft);
      snapshot = next.responses;
      return next;
    });
    return snapshot;
  }, [commitTime]);

  return { run, setRun, questionIds, answer, setConfidence, toggleFlag, goToQuestion, goToPart, finalize };
}

function blank(questionId: string): Response {
  return { questionId, value: null, flagged: false, timeSpentMs: 0, visits: 1, changes: 0 };
}

function visit(
  responses: Record<string, Response>,
  questionId: string | undefined,
): Record<string, Response> {
  if (!questionId) return {};
  const previous = responses[questionId] ?? blank(questionId);
  return { [questionId]: { ...previous, visits: previous.visits + 1 } };
}
