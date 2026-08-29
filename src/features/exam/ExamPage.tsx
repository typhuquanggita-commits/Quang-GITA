import { useEffect, useMemo, useState } from 'react';
import { MAX_TOTAL_SCORE, SECTIONS, SECTION_BY_ID, SUBJECT_NAME, TOTAL_MINUTES } from '../../config';
import { findQuestion } from '../../data/questions';
import { cn } from '../../lib/cn';
import { buildAttempt } from '../../lib/exam';
import { formatClock, formatDateTime, formatScore } from '../../lib/format';
import { useHotkeys } from '../../lib/hotkeys';
import { gradeAttempt, scoreBand } from '../../lib/scoring';
import { buildSolutionSheet } from '../../lib/solutions';
import { SolutionSheet } from '../solutions/SolutionSheet';
import { navigate, useRoute } from '../../lib/router';
import { useAppState, useDispatch } from '../../store/AppStore';
import { activeAttempt } from '../../store/selectors';
import type { Attempt, SectionId } from '../../types';
import { Badge, Button, Card, CardHeader, Modal, Progress, Stat } from '../../components/ui/primitives';
import { PermissionGate, useCan } from '../../components/PermissionGate';
import { IconClock } from '../../components/layout/icons';
import { QuestionView } from './QuestionView';

/**
 * THI THU
 *
 * Diem chi dang tin khi duoc do trong dung dieu kien: dung so cau, dung thoi
 * gian, khong duoc xem dap an giua chung. Man hinh nay giu nguyen ba rang buoc
 * do; phan "hoc" thi da co thu vien phieu luyen lo.
 */
export function ExamPage() {
  const state = useAppState();
  const attempt = activeAttempt(state);
  return attempt ? <ExamRunner attempt={attempt} /> : <ExamLobby />;
}

/* ── Sảnh chọn đề ──────────────────────────────────────────────────────── */

function ExamLobby() {
  const state = useAppState();
  const dispatch = useDispatch();
  const route = useRoute();
  const canFull = useCan('learn.mockFull');
  const canSection = useCan('learn.mock');

  const start = (sections: SectionId[] | null) => {
    const label =
      sections === null
        ? 'Đề mô phỏng full 3 phần'
        : `Thi thử phần ${SECTION_BY_ID[sections[0] as SectionId].shortName}`;
    const attempt = buildAttempt({
      mode: sections === null ? 'full' : 'section',
      label,
      scienceSubject: state.settings.scienceSubject,
      ...(sections ? { sections } : {}),
      seen: state.seen,
      strictMode: true,
    });
    dispatch({ type: 'attempt/start', attempt });
  };

  // Cho phép mở thẳng một đề từ bảng lệnh: #/exam?start=full
  useEffect(() => {
    const target = route.params.get('start');
    if (!target) return;
    if (target === 'full' && canFull) start(null);
    else if (SECTIONS.some((s) => s.id === target) && canSection) start([target as SectionId]);
    // Chỉ chạy một lần cho mỗi lần đổi tham số.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.hash]);

  const history = [...state.results].reverse().slice(0, 6);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Thi thử</h1>
        <p className="mt-1.5 max-w-3xl text-sm text-fg-muted">
          Đề mô phỏng bám đúng cấu trúc HSA: {SECTIONS.map((s) => `${s.questionCount} câu / ${s.minutes} phút`).join(' · ')} —
          tổng {TOTAL_MINUTES} phút, thang {MAX_TOTAL_SCORE} điểm. Môn tự chọn hiện tại:{' '}
          <strong className="text-fg">{SUBJECT_NAME[state.settings.scienceSubject]}</strong>.
        </p>
      </header>

      <PermissionGate
        permission="learn.mockFull"
        title="Đề full 3 phần chưa mở"
        fallback={
          <Card className="border-dashed">
            <h2 className="text-base font-semibold">Đề full 3 phần chưa mở</h2>
            <p className="mt-2 text-sm text-fg-muted">
              Đề 195 phút chỉ mở khi bạn đã lên cấp 5 ở ít nhất một tuyến chuyên đề. Làm đề full quá sớm thường
              cho ra một con số gây nản mà không nói thêm được điều gì hữu ích.
            </p>
          </Card>
        }
      >
        <Card className="border-brand-line bg-brand-soft">
          <CardHeader
            title="Đề mô phỏng full 3 phần"
            subtitle="Điều kiện sát phòng thi nhất: làm liền mạch, không xem đáp án giữa chừng."
            action={
              <Button variant="primary" onClick={() => start(null)}>
                Bắt đầu
              </Button>
            }
          />
          <p className="text-sm text-fg-muted">
            Chỉ nên làm khi bạn có đủ {TOTAL_MINUTES} phút liên tục. Kết quả sẽ được dùng để cập nhật điểm dự báo và
            chỉ số sẵn sàng.
          </p>
        </Card>
      </PermissionGate>

      <PermissionGate permission="learn.mock" title="Thi thử theo phần chưa mở">
        <Card>
          <CardHeader title="Thi thử theo phần" subtitle="Ngắn hơn, dễ sắp xếp vào lịch hằng ngày." />
          <div className="grid gap-3 sm:grid-cols-3">
            {SECTIONS.map((spec) => (
              <div key={spec.id} className="rounded-xl border border-line bg-surface-2 p-4">
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: `var(--c-${spec.accent})` }}
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-semibold text-fg">{spec.officialName}</h3>
                </div>
                <p className="mt-1 text-sm text-fg">{spec.name}</p>
                <p className="mt-1 text-xs text-fg-muted">{spec.description}</p>
                <p className="mt-2 text-xs text-fg-subtle tabular-nums">
                  {spec.questionCount} câu · {spec.minutes} phút
                </p>
                <Button className="mt-3 w-full" onClick={() => start([spec.id])}>
                  Làm phần này
                </Button>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-fg-subtle">
            Ngân hàng hiện có ít câu hơn 50 câu/phần của đề thật. Đề mô phỏng lấy tối đa số câu đang có, rút ngắn
            thời gian theo đúng tỉ lệ và quy đổi điểm về thang 50 — nên áp lực thời gian vẫn giữ nguyên.
          </p>
        </Card>
      </PermissionGate>

      {history.length > 0 && (
        <Card>
          <CardHeader title="Lịch sử thi thử" subtitle="Điểm quy đổi trên thang 150." />
          <ul className="divide-y divide-line">
            {history.map((result) => {
              const attempt = state.attempts.find((a) => a.id === result.attemptId);
              const band = scoreBand(result.total);
              return (
                <li key={result.attemptId} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-fg">{attempt?.label ?? 'Bài thi'}</p>
                    <p className="text-xs text-fg-subtle">{formatDateTime(result.submittedAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge tone={band.tone === 'elite' || band.tone === 'high' ? 'ok' : band.tone === 'low' ? 'bad' : 'brand'}>
                      {band.label}
                    </Badge>
                    <span className="text-lg font-semibold tabular-nums">{formatScore(result.total)}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      )}
    </div>
  );
}

/* ── Phòng thi ─────────────────────────────────────────────────────────── */

function ExamRunner({ attempt }: { attempt: Attempt }) {
  const state = useAppState();
  const dispatch = useDispatch();
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const run = attempt.sections[attempt.cursorSection];
  const questionIds = run?.questionIds ?? [];
  const questionId = questionIds[attempt.cursorIndex];
  const question = questionId ? findQuestion(questionId) : undefined;
  const spec = run ? SECTION_BY_ID[run.section] : undefined;

  // Đồng hồ: cộng dồn 1 giây một lần vào đúng phần đang làm.
  useEffect(() => {
    if (attempt.status !== 'in_progress') return undefined;
    const timer = window.setInterval(() => {
      dispatch({
        type: 'attempt/time',
        attemptId: attempt.id,
        sectionIndex: attempt.cursorSection,
        deltaMs: 1000,
        ...(questionId ? { questionId } : {}),
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [attempt.id, attempt.cursorSection, attempt.status, dispatch, questionId]);

  const remaining = run ? Math.max(0, run.allowedSeconds - run.elapsedMs / 1000) : 0;
  const timeUp = run ? remaining <= 0 : false;

  // Hết giờ một phần: tự chuyển sang phần sau, hoặc nộp bài nếu là phần cuối.
  useEffect(() => {
    if (!timeUp || attempt.status !== 'in_progress') return;
    if (attempt.cursorSection < attempt.sections.length - 1) {
      dispatch({ type: 'attempt/cursor', attemptId: attempt.id, section: attempt.cursorSection + 1, index: 0 });
    } else {
      dispatch({ type: 'attempt/submit', attemptId: attempt.id });
      setShowResult(true);
    }
  }, [timeUp, attempt.status, attempt.cursorSection, attempt.sections.length, attempt.id, dispatch]);

  useHotkeys(
    useMemo(
      () => ({
        ArrowLeft: () =>
          dispatch({
            type: 'attempt/cursor',
            attemptId: attempt.id,
            section: attempt.cursorSection,
            index: Math.max(0, attempt.cursorIndex - 1),
          }),
        ArrowRight: () =>
          dispatch({
            type: 'attempt/cursor',
            attemptId: attempt.id,
            section: attempt.cursorSection,
            index: Math.min(questionIds.length - 1, attempt.cursorIndex + 1),
          }),
        f: () =>
          questionId && dispatch({ type: 'attempt/flag', attemptId: attempt.id, questionId }),
      }),
      [attempt.cursorIndex, attempt.cursorSection, attempt.id, dispatch, questionId, questionIds.length],
    ),
    attempt.status === 'in_progress',
  );

  const result = state.results.find((r) => r.attemptId === attempt.id);
  if (showResult && result) return <ExamResult attemptId={attempt.id} />;

  if (!run || !question || !spec) {
    return (
      <Card>
        <p className="text-sm text-fg-muted">Bài thi này không có câu hỏi nào. Hãy quay lại và tạo đề mới.</p>
        <Button className="mt-4" onClick={() => dispatch({ type: 'attempt/abandon', attemptId: attempt.id })}>
          Hủy bài thi
        </Button>
      </Card>
    );
  }

  const answered = questionIds.filter((id) => {
    const value = attempt.responses[id]?.value;
    return value !== null && value !== undefined && value !== '';
  }).length;

  return (
    <div className="space-y-6">
      <Card className="sticky top-20 z-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-fg">{spec.officialName}</p>
            <p className="text-xs text-fg-subtle">
              {spec.name} · phần {attempt.cursorSection + 1}/{attempt.sections.length}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-fg-muted tabular-nums">
              Đã trả lời {answered}/{questionIds.length}
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-base font-semibold tabular-nums',
                remaining < 300
                  ? 'border-transparent bg-bad-soft text-bad'
                  : 'border-line text-fg',
                remaining < 60 && 'pulse-danger',
              )}
              role="timer"
              aria-live={remaining < 60 ? 'assertive' : 'off'}
            >
              <IconClock className="size-4" />
              {formatClock(remaining)}
            </span>
          </div>
        </div>
        <Progress
          value={run.elapsedMs / 1000}
          max={run.allowedSeconds}
          tone={remaining < 300 ? 'bad' : 'brand'}
          className="mt-3"
          label="Thời gian đã dùng"
        />
      </Card>

      <QuestionView
        question={question}
        response={attempt.responses[question.id]}
        index={attempt.cursorIndex}
        total={questionIds.length}
        onAnswer={(value) =>
          dispatch({ type: 'attempt/answer', attemptId: attempt.id, questionId: question.id, value })
        }
        onConfidence={(confidence) =>
          dispatch({
            type: 'attempt/answer',
            attemptId: attempt.id,
            questionId: question.id,
            value: attempt.responses[question.id]?.value ?? null,
            confidence,
          })
        }
        onToggleFlag={() => dispatch({ type: 'attempt/flag', attemptId: attempt.id, questionId: question.id })}
        reveal={false}
        locked={false}
        apiKey={state.settings.aiApiKey}
      />

      <Card>
        <nav className="flex flex-wrap gap-2" aria-label="Danh sách câu hỏi">
          {questionIds.map((id, index) => {
            const response = attempt.responses[id];
            const done = response?.value !== null && response?.value !== undefined && response?.value !== '';
            return (
              <button
                key={id}
                type="button"
                onClick={() =>
                  dispatch({ type: 'attempt/cursor', attemptId: attempt.id, section: attempt.cursorSection, index })
                }
                aria-label={`Câu ${index + 1}${done ? ' (đã trả lời)' : ' (chưa trả lời)'}`}
                aria-current={index === attempt.cursorIndex}
                className={cn(
                  'size-9 rounded-lg border text-sm font-medium tabular-nums transition',
                  index === attempt.cursorIndex
                    ? 'border-brand bg-brand text-white'
                    : done
                      ? 'border-transparent bg-ok-soft text-ok'
                      : 'border-line text-fg-subtle hover:border-line-strong',
                  response?.flagged && 'ring-2 ring-warn ring-offset-1 ring-offset-[var(--c-surface)]',
                )}
              >
                {index + 1}
              </button>
            );
          })}
        </nav>

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          {attempt.cursorSection < attempt.sections.length - 1 ? (
            <Button
              variant="primary"
              onClick={() =>
                dispatch({
                  type: 'attempt/cursor',
                  attemptId: attempt.id,
                  section: attempt.cursorSection + 1,
                  index: 0,
                })
              }
            >
              Nộp phần này & sang phần sau
            </Button>
          ) : (
            <Button variant="success" onClick={() => setConfirmSubmit(true)}>
              Nộp bài
            </Button>
          )}
        </div>
      </Card>

      <Modal
        open={confirmSubmit}
        onClose={() => setConfirmSubmit(false)}
        title="Nộp bài thi?"
        size="sm"
        footer={
          <>
            <Button onClick={() => setConfirmSubmit(false)}>Xem lại</Button>
            <Button
              variant="success"
              onClick={() => {
                dispatch({ type: 'attempt/submit', attemptId: attempt.id });
                setConfirmSubmit(false);
                setShowResult(true);
                window.scrollTo({ top: 0 });
              }}
            >
              Nộp bài
            </Button>
          </>
        }
      >
        <p className="text-sm text-fg-muted">
          {answered < questionIds.length
            ? `Còn ${questionIds.length - answered} câu chưa trả lời. HSA không trừ điểm câu sai — bỏ trống là mất điểm chắc chắn, khoanh bừa vẫn còn 25% cơ hội.`
            : 'Bạn đã trả lời hết các câu. Sau khi nộp, kết quả sẽ được dùng để cập nhật điểm dự báo.'}
        </p>
      </Modal>
    </div>
  );
}

/* ── Kết quả bài thi ───────────────────────────────────────────────────── */

export function ExamResult({ attemptId }: { attemptId: string }) {
  const state = useAppState();
  const attempt = state.attempts.find((a) => a.id === attemptId);
  const stored = state.results.find((r) => r.attemptId === attemptId);
  if (!attempt) return null;

  const result = stored ?? gradeAttempt(attempt, findQuestion);
  const band = scoreBand(result.total);
  const gap = state.settings.targetScore - result.total;

  const allQuestions = attempt.sections.flatMap((s) => s.questionIds);
  const entries = buildSolutionSheet(allQuestions, attempt.responses);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader title={attempt.label} subtitle={formatDateTime(result.submittedAt)} />
        <div className="grid gap-4 sm:grid-cols-4">
          <Stat label="Tổng điểm" value={formatScore(result.total)} hint={`trên ${MAX_TOTAL_SCORE}`} tone="brand" />
          <Stat label="Xếp loại" value={band.label} />
          <Stat
            label="Điểm dự báo đề đầy đủ"
            value={formatScore(result.projected)}
            hint="chiếu năng lực lên đề chuẩn"
          />
          <Stat
            label="So với mục tiêu"
            value={`${gap > 0 ? '−' : '+'}${formatScore(Math.abs(gap))}`}
            tone={gap > 0 ? 'warn' : 'ok'}
            hint={`mục tiêu ${state.settings.targetScore}`}
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Kết quả từng phần" />
        <ul className="space-y-4">
          {result.sections.map((section) => {
            const spec = SECTION_BY_ID[section.section];
            return (
              <li key={section.section}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium text-fg">{spec.name}</span>
                  <span className="tabular-nums text-fg">
                    {formatScore(section.score)}/50 · {section.correct}/{section.total} câu
                  </span>
                </div>
                <Progress
                  value={section.score}
                  max={50}
                  tone={section.score >= 40 ? 'ok' : section.score >= 30 ? 'brand' : 'bad'}
                  className="mt-1.5"
                  label={`Điểm ${spec.name}`}
                />
                <p className="mt-1.5 text-xs text-fg-subtle tabular-nums">
                  {Math.round(section.secondsPerQuestion)} giây/câu
                  {section.confidentWrong > 0 && ` · ${section.confidentWrong} câu sai dù tự tin`}
                  {section.luckyCorrect > 0 && ` · ${section.luckyCorrect} câu đúng nhờ đoán`}
                </p>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card className="border-brand-line bg-brand-soft">
        <CardHeader
          title="Xem đáp án và phân tích chi tiết"
          subtitle="Bài thi này đã được lưu vào hồ sơ học viên. Bảng phân tích tách lỗi thành ba loại — kiến thức, kỹ năng, chiến thuật — vì ba loại này cần ba cách chữa khác hẳn nhau."
        />
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            onClick={() => navigate(`/solutions?attempt=${encodeURIComponent(attempt.id)}`)}
          >
            Mở bảng phân tích chi tiết
          </Button>
          <Button onClick={() => navigate('/profile')}>Hồ sơ học viên</Button>
        </div>
      </Card>

      <SolutionSheet entries={entries} apiKey={state.settings.aiApiKey} title="Đáp án & lời giải" />
    </div>
  );
}
