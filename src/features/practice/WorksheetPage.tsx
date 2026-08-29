import { useEffect, useMemo, useState } from 'react';
import { KIND_BY_ID, LEVEL_BY_ID, MAX_LEVEL } from '../../data/curriculum';
import { missionForWorksheet } from '../../data/missions';
import { findQuestion } from '../../data/questions';
import { topicName } from '../../data/topics';
import { worksheetById } from '../../data/worksheets';
import { cn } from '../../lib/cn';
import { formatClock, formatPercent } from '../../lib/format';
import { useHotkeys } from '../../lib/hotkeys';
import {
  diagnose,
  gradeWorksheet,
  nextStep,
  prescribe,
  trackStatus,
  type WorksheetOutcome,
} from '../../lib/progression';
import { isCorrect } from '../../lib/scoring';
import { navigate, useRoute } from '../../lib/router';
import { useAppState, useDispatch } from '../../store/AppStore';
import type { Question, Response } from '../../types';
import { Badge, Button, Card, EmptyState, Modal, Progress } from '../../components/ui/primitives';
import { IconCheck, IconClock, IconClose, IconSpark } from '../../components/layout/icons';
import { QuestionView } from '../exam/QuestionView';
import { clearDraft, useWorksheetRun } from './useWorksheetRun';

type Phase = 'brief' | 'running' | 'report';

/**
 * MAN HINH LAM PHIEU LUYEN
 *
 * Day la noi toan bo dong chay hoc tap dien ra:
 *   giao nhiem vu → lam chang 1 → chang 2 → chang 3 → cham → bao ket qua
 *   → nhan xet → giai phap → dinh huong → xet len cap.
 *
 * Man hinh chiem toan bo khung nhin: trong luc lam bai, moi thu khong phai
 * cau hoi deu la nhieu.
 */
export function WorksheetPage() {
  const route = useRoute();
  const state = useAppState();
  const dispatch = useDispatch();
  const worksheetId = route.params.get('id') ?? '';
  const sheet = worksheetById(worksheetId);

  const [phase, setPhase] = useState<Phase>('brief');
  const [outcome, setOutcome] = useState<WorksheetOutcome | null>(null);
  const [submitted, setSubmitted] = useState<Record<string, Response>>({});
  const [confirmExit, setConfirmExit] = useState(false);
  const [levelUpOpen, setLevelUpOpen] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const { run, questionIds, answer, setConfidence, toggleFlag, goToQuestion, goToPart, finalize } =
    useWorksheetRun(sheet);

  const part = sheet?.parts[run.partIndex];
  const currentId = questionIds[run.questionIndex];
  const question = currentId ? findQuestion(currentId) : undefined;

  // Đồng hồ của chặng. Chạy 1 Hz — đủ mượt mà không gây dựng lại thừa.
  useEffect(() => {
    if (phase !== 'running') return undefined;
    const timer = window.setInterval(() => setElapsed(Date.now() - run.partStartedAt), 1000);
    setElapsed(Date.now() - run.partStartedAt);
    return () => window.clearInterval(timer);
  }, [phase, run.partStartedAt]);

  useHotkeys(
    useMemo(
      () => ({
        ArrowLeft: () => goToQuestion(run.questionIndex - 1),
        ArrowRight: () => goToQuestion(run.questionIndex + 1),
        f: () => currentId && toggleFlag(currentId),
        '1': () => currentId && question?.format === 'mcq' && answer(currentId, 'A'),
        '2': () => currentId && question?.format === 'mcq' && answer(currentId, 'B'),
        '3': () => currentId && question?.format === 'mcq' && answer(currentId, 'C'),
        '4': () => currentId && question?.format === 'mcq' && answer(currentId, 'D'),
      }),
      [answer, currentId, goToQuestion, question?.format, run.questionIndex, toggleFlag],
    ),
    phase === 'running',
  );

  if (!sheet) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20">
        <EmptyState
          title="Không tìm thấy phiếu luyện"
          description="Mã phiếu không tồn tại hoặc đường dẫn đã cũ. Hãy quay lại thư viện phiếu để chọn lại."
          action={
            <Button variant="primary" onClick={() => navigate('/practice')}>
              Về thư viện phiếu
            </Button>
          }
        />
      </main>
    );
  }

  const mission = missionForWorksheet(sheet.id);
  const kind = KIND_BY_ID.get(sheet.kind);
  const level = LEVEL_BY_ID.get(sheet.level);
  const status = trackStatus(state, sheet.topicId);

  const answeredInPart = questionIds.filter((id) => {
    const value = run.responses[id]?.value;
    return value !== null && value !== undefined && value !== '';
  }).length;

  const submit = () => {
    const responses = finalize();
    // finalize cập nhật state bất đồng bộ; hợp nhất để không mất giây cuối cùng.
    const merged = { ...run.responses, ...responses };
    const result = gradeWorksheet(sheet, merged);
    dispatch({ type: 'worksheet/submit', worksheetId: sheet.id, responses: merged });
    setSubmitted(merged);
    setOutcome(result);
    setPhase('report');
    clearDraft(sheet.id);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="min-h-dvh bg-canvas">
      <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-3 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => (phase === 'running' ? setConfirmExit(true) : navigate('/practice'))}
            aria-label="Thoát phiếu luyện"
          >
            <IconClose className="size-4" />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-fg">{sheet.title}</p>
            <p className="truncate text-xs text-fg-subtle">
              {sheet.code} · {topicName(sheet.topicId)} · Cấp {sheet.level} — {level?.name}
            </p>
          </div>
          {phase === 'running' && (
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-sm font-medium tabular-nums',
                  part && elapsed > part.seconds * 1000
                    ? 'border-transparent bg-bad-soft text-bad'
                    : 'border-line text-fg-muted',
                )}
                aria-live="off"
              >
                <IconClock className="size-4" />
                {formatClock(elapsed / 1000)}
                <span className="text-fg-subtle">/ {formatClock(part?.seconds ?? 0)}</span>
              </span>
            </div>
          )}
        </div>
        {phase === 'running' && (
          <Progress
            value={run.partIndex * 100 + (questionIds.length > 0 ? ((run.questionIndex + 1) / questionIds.length) * 100 : 0)}
            max={sheet.parts.length * 100}
            className="h-1 rounded-none"
            label="Tiến độ phiếu luyện"
          />
        )}
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {phase === 'brief' && (
          <BriefView
            sheetTitle={sheet.title}
            objective={sheet.objective}
            missionBrief={mission?.brief ?? ''}
            missionCode={mission?.code ?? ''}
            constraint={mission?.constraint ?? kind?.constraint ?? ''}
            parts={sheet.parts.map((p) => ({
              name: p.name,
              goal: p.goal,
              count: p.questionIds.length,
              seconds: p.seconds,
            }))}
            passRatio={sheet.passRatio}
            masteryRatio={sheet.masteryRatio}
            xp={sheet.xp}
            questionCount={sheet.questionCount}
            resumable={Object.keys(run.responses).length > 0}
            onStart={() => {
              setPhase('running');
              goToPart(run.partIndex);
            }}
          />
        )}

        {phase === 'running' && question && part && (
          <div className="space-y-6">
            <PartHeader
              parts={sheet.parts.map((p) => p.name)}
              activeIndex={run.partIndex}
              goal={part.goal}
              answered={answeredInPart}
              total={questionIds.length}
            />

            <QuestionView
              question={question}
              response={run.responses[question.id]}
              index={run.questionIndex}
              total={questionIds.length}
              onAnswer={(value) => answer(question.id, value)}
              onConfidence={(value) => setConfidence(question.id, value)}
              onToggleFlag={() => toggleFlag(question.id)}
              reveal={false}
              locked={false}
              apiKey={state.settings.aiApiKey}
            />

            <nav className="flex flex-wrap items-center gap-2 border-t border-line pt-4" aria-label="Điều hướng câu hỏi">
              {questionIds.map((id, index) => {
                const response = run.responses[id];
                const done = response?.value !== null && response?.value !== undefined && response?.value !== '';
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goToQuestion(index)}
                    aria-label={`Câu ${index + 1}${done ? ' (đã trả lời)' : ''}`}
                    aria-current={index === run.questionIndex}
                    className={cn(
                      'size-9 rounded-lg border text-sm font-medium tabular-nums transition',
                      index === run.questionIndex
                        ? 'border-brand bg-brand text-white'
                        : done
                          ? 'border-transparent bg-ok-soft text-ok'
                          : 'border-line text-fg-subtle hover:border-line-strong',
                      response?.flagged && 'ring-2 ring-warn ring-offset-1 ring-offset-[var(--c-canvas)]',
                    )}
                  >
                    {index + 1}
                  </button>
                );
              })}

              <div className="ml-auto flex gap-2">
                <Button onClick={() => goToQuestion(run.questionIndex - 1)} disabled={run.questionIndex === 0}>
                  Câu trước
                </Button>
                {run.questionIndex < questionIds.length - 1 ? (
                  <Button variant="primary" onClick={() => goToQuestion(run.questionIndex + 1)}>
                    Câu tiếp theo
                  </Button>
                ) : run.partIndex < sheet.parts.length - 1 ? (
                  <Button variant="primary" onClick={() => goToPart(run.partIndex + 1)}>
                    Sang {sheet.parts[run.partIndex + 1]?.name.toLowerCase()}
                  </Button>
                ) : (
                  <Button variant="success" onClick={submit}>
                    Nộp bài & chấm điểm
                  </Button>
                )}
              </div>
            </nav>

            {answeredInPart < questionIds.length && run.questionIndex === questionIds.length - 1 && (
              <p className="rounded-lg border border-warn/40 bg-warn-soft px-4 py-3 text-sm text-warn">
                Còn {questionIds.length - answeredInPart} câu chưa trả lời trong chặng này. HSA không trừ điểm câu
                sai — đừng để trống ô nào.
              </p>
            )}
          </div>
        )}

        {phase === 'report' && outcome && (
          <ReportView
            outcome={outcome}
            responses={submitted}
            sheetId={sheet.id}
            onRetry={() => {
              clearDraft(sheet.id);
              window.location.reload();
            }}
            onLevelUp={() => setLevelUpOpen(true)}
            canLevelUp={trackStatus(state, sheet.topicId).canLevelUp}
          />
        )}
      </main>

      <Modal
        open={confirmExit}
        onClose={() => setConfirmExit(false)}
        title="Thoát phiếu luyện?"
        size="sm"
        footer={
          <>
            <Button onClick={() => setConfirmExit(false)}>Ở lại làm tiếp</Button>
            <Button variant="danger" onClick={() => navigate('/practice')}>
              Thoát
            </Button>
          </>
        }
      >
        <p className="text-sm text-fg-muted">
          Bài làm dở dang được lưu tạm trong phiên này, nên bạn quay lại vẫn tiếp tục được. Tuy nhiên phiếu chỉ
          được chấm và tính vào tiến độ khi bạn nộp bài.
        </p>
      </Modal>

      <Modal
        open={levelUpOpen}
        onClose={() => setLevelUpOpen(false)}
        title={`Lên cấp ${Math.min(MAX_LEVEL, status.level + 1)} — ${topicName(sheet.topicId)}`}
        size="sm"
        footer={
          <>
            <Button onClick={() => setLevelUpOpen(false)}>Để sau</Button>
            <Button
              variant="primary"
              onClick={() => {
                dispatch({ type: 'track/levelUp', topicId: sheet.topicId });
                setLevelUpOpen(false);
                navigate('/practice');
              }}
            >
              Lên cấp ngay
            </Button>
          </>
        }
      >
        <p className="text-sm text-fg-muted">
          Bạn đã thành thạo {status.masteredAtLevel}/{status.required} phiếu bắt buộc và vượt ải của cấp{' '}
          {status.level}. Cấp tiếp theo có câu khó hơn và thời gian siết lại.
        </p>
      </Modal>
    </div>
  );
}

/* ── Giao nhiệm vụ ─────────────────────────────────────────────────────── */

function BriefView({
  sheetTitle,
  objective,
  missionBrief,
  missionCode,
  constraint,
  parts,
  passRatio,
  masteryRatio,
  xp,
  questionCount,
  resumable,
  onStart,
}: {
  sheetTitle: string;
  objective: string;
  missionBrief: string;
  missionCode: string;
  constraint: string;
  parts: ReadonlyArray<{ name: string; goal: string; count: number; seconds: number }>;
  passRatio: number;
  masteryRatio: number;
  xp: number;
  questionCount: number;
  resumable: boolean;
  onStart: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <Badge tone="brand">
          <IconSpark className="size-3.5" />
          Nhiệm vụ {missionCode}
        </Badge>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">{sheetTitle}</h1>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{objective}</p>
        <p className="mt-4 rounded-lg bg-surface-2 p-3 text-sm leading-relaxed text-fg">{missionBrief}</p>
        <p className="mt-3 text-sm text-warn">Ràng buộc: {constraint}</p>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold text-fg">Bạn sẽ đi qua {parts.length} chặng</h2>
        <ol className="mt-3 space-y-3">
          {parts.map((p, i) => (
            <li key={p.name} className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-soft text-sm font-semibold text-brand">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-fg">{p.name}</p>
                <p className="text-xs text-fg-muted">{p.goal}</p>
                <p className="mt-0.5 text-xs text-fg-subtle">
                  {p.count} câu · khoảng {Math.max(1, Math.round(p.seconds / 60))} phút
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold text-fg">Mức đạt</h2>
        <dl className="mt-3 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg bg-surface-2 p-3">
            <dt className="text-xs text-fg-subtle">Hoàn thành</dt>
            <dd className="text-lg font-semibold tabular-nums text-fg">
              {Math.ceil(questionCount * passRatio)}/{questionCount}
            </dd>
          </div>
          <div className="rounded-lg bg-surface-2 p-3">
            <dt className="text-xs text-fg-subtle">Thành thạo</dt>
            <dd className="text-lg font-semibold tabular-nums text-ok">
              {Math.ceil(questionCount * masteryRatio)}/{questionCount}
            </dd>
          </div>
          <div className="rounded-lg bg-surface-2 p-3">
            <dt className="text-xs text-fg-subtle">Kinh nghiệm</dt>
            <dd className="text-lg font-semibold tabular-nums text-brand">+{xp}</dd>
          </div>
        </dl>
      </Card>

      <Button variant="primary" size="lg" className="w-full" onClick={onStart}>
        {resumable ? 'Tiếp tục bài đang làm dở' : 'Bắt đầu chặng 1'}
      </Button>
    </div>
  );
}

/* ── Thanh chặng ───────────────────────────────────────────────────────── */

function PartHeader({
  parts,
  activeIndex,
  goal,
  answered,
  total,
}: {
  parts: readonly string[];
  activeIndex: number;
  goal: string;
  answered: number;
  total: number;
}) {
  return (
    <div className="card p-4">
      <ol className="flex flex-wrap items-center gap-2" aria-label="Các chặng của phiếu luyện">
        {parts.map((name, i) => (
          <li key={name} className="flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
                i < activeIndex && 'bg-ok-soft text-ok',
                i === activeIndex && 'bg-brand text-white',
                i > activeIndex && 'bg-surface-2 text-fg-subtle',
              )}
              aria-current={i === activeIndex ? 'step' : undefined}
            >
              {i < activeIndex && <IconCheck className="size-3.5" />}
              {name}
            </span>
            {i < parts.length - 1 && <span className="text-fg-subtle">→</span>}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm text-fg-muted">{goal}</p>
      <p className="mt-1 text-xs text-fg-subtle tabular-nums">
        Đã trả lời {answered}/{total} câu trong chặng này
      </p>
    </div>
  );
}

/* ── Báo kết quả → nhận xét → giải pháp → định hướng ───────────────────── */

function ReportView({
  outcome,
  responses,
  sheetId,
  onRetry,
  onLevelUp,
  canLevelUp,
}: {
  outcome: WorksheetOutcome;
  responses: Record<string, Response>;
  sheetId: string;
  onRetry: () => void;
  onLevelUp: () => void;
  canLevelUp: boolean;
}) {
  const state = useAppState();
  const sheet = worksheetById(sheetId);
  if (!sheet) return null;

  const wrongQuestions = sheet.parts
    .flatMap((p) => p.questionIds)
    .map(findQuestion)
    .filter((q): q is Question => Boolean(q))
    .filter((q) => !isCorrect(q, responses[q.id]?.value ?? null));

  const notes = diagnose(sheet, outcome);
  const plan = prescribe(sheet, outcome, wrongQuestions);
  const step = nextStep(state, sheet, outcome);

  const tone = outcome.mastered ? 'ok' : outcome.passed ? 'brand' : 'bad';

  return (
    <div className="space-y-6">
      {/* 1. Báo kết quả */}
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge tone={tone}>
              {outcome.mastered ? 'Thành thạo' : outcome.passed ? 'Hoàn thành' : 'Chưa đạt'}
            </Badge>
            <p className="mt-3 text-4xl font-semibold tabular-nums tracking-tight">
              {outcome.correct}
              <span className="text-fg-subtle">/{outcome.total}</span>
            </p>
            <p className="text-sm text-fg-muted">
              Chính xác {formatPercent(outcome.ratio, 1)} · thời gian {formatClock(outcome.timeMs / 1000)} / ngân
              sách {formatClock(outcome.budgetSeconds)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-fg-subtle">Kinh nghiệm</p>
            <p className="text-2xl font-semibold tabular-nums text-brand">+{outcome.xpEarned}</p>
          </div>
        </div>

        <ul className="mt-5 space-y-3">
          {outcome.parts.map((p) => (
            <li key={p.order}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="text-fg">{p.name}</span>
                <span className="tabular-nums text-fg-muted">
                  {p.correct}/{p.total} · {formatClock(p.timeMs / 1000)}
                </span>
              </div>
              <Progress
                value={p.ratio * 100}
                tone={p.ratio >= 0.85 ? 'ok' : p.ratio >= 0.7 ? 'brand' : 'bad'}
                className="mt-1.5"
                label={`Kết quả ${p.name}`}
              />
            </li>
          ))}
        </ul>
      </Card>

      {/* 2. Nhận xét tình hình */}
      <Card>
        <h2 className="text-base font-semibold tracking-tight">Nhận xét tình hình</h2>
        <ul className="mt-3 space-y-3">
          {notes.map((note) => (
            <li
              key={note.id}
              className={cn(
                'rounded-xl border-l-4 bg-surface-2 p-3.5',
                note.tone === 'good' && 'border-l-ok',
                note.tone === 'warn' && 'border-l-warn',
                note.tone === 'bad' && 'border-l-bad',
              )}
            >
              <p className="text-sm font-medium text-fg">{note.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-fg-muted">{note.detail}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* 3. Giải pháp tối ưu */}
      <Card>
        <h2 className="text-base font-semibold tracking-tight">Giải pháp tối ưu</h2>
        <ol className="mt-3 space-y-3">
          {plan.map((item, i) => (
            <li key={item.id} className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-semibold text-brand">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-fg">{item.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{item.detail}</p>
                {item.href && (
                  <a href={item.href} className="mt-1 inline-block text-sm font-medium text-brand underline underline-offset-2">
                    Đi tới ngay
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Card>

      {/* 4. Định hướng bước tiếp theo */}
      <Card className="border-brand-line bg-brand-soft">
        <h2 className="text-base font-semibold tracking-tight">Bước tiếp theo</h2>
        <p className="mt-2 text-sm font-medium text-fg">{step.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-fg-muted">{step.detail}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {step.kind === 'levelup' || canLevelUp ? (
            <Button variant="primary" onClick={onLevelUp}>
              Xét lên cấp
            </Button>
          ) : null}
          {step.worksheetId && step.worksheetId !== sheet.id && (
            <Button
              variant="primary"
              onClick={() => navigate(`/worksheet?id=${encodeURIComponent(step.worksheetId as string)}`)}
            >
              {step.kind === 'challenge' ? 'Nhận thử thách' : 'Làm phiếu tiếp theo'}
            </Button>
          )}
          <Button onClick={onRetry}>Làm lại phiếu này</Button>
          <Button variant="ghost" onClick={() => navigate('/practice')}>
            Về thư viện phiếu
          </Button>
        </div>
      </Card>

      {/* 5. Xem lại từng câu */}
      <Card>
        <h2 className="text-base font-semibold tracking-tight">Xem lại lời giải</h2>
        <p className="mt-1 text-sm text-fg-muted">
          Đọc kỹ phần này quan trọng hơn con số điểm. Mỗi câu sai được giải thích kèm lý do vì sao phương án bạn
          chọn lại sai.
        </p>
        <div className="mt-5 space-y-10">
          {sheet.parts.flatMap((p) => p.questionIds).map((id, index, all) => {
            const q = findQuestion(id);
            if (!q) return null;
            return (
              <div key={`${id}-${index}`} className="border-t border-line pt-6 first:border-0 first:pt-0">
                <QuestionView
                  question={q}
                  response={responses[id]}
                  index={index}
                  total={all.length}
                  onAnswer={() => undefined}
                  onConfidence={() => undefined}
                  onToggleFlag={() => undefined}
                  reveal
                  locked
                  showConfidence={false}
                  apiKey={state.settings.aiApiKey}
                />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
