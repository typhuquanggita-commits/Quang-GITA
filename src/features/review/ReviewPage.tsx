import { useMemo, useState } from 'react';
import { findQuestion } from '../../data/questions';
import { topicName } from '../../data/topics';
import { cn } from '../../lib/cn';
import { formatDate, formatNumber } from '../../lib/format';
import { daysUntil } from '../../lib/format';
import { GRADE_LABEL, forecast, type Grade } from '../../lib/srs';
import { useAppState, useDispatch } from '../../store/AppStore';
import { dueNow, mistakeNotebook } from '../../store/selectors';
import { Badge, Button, Card, CardHeader, EmptyState, Progress, Stat } from '../../components/ui/primitives';
import { PermissionGate } from '../../components/PermissionGate';
import { BarList } from '../../components/charts';
import { QuestionView } from '../exam/QuestionView';

const REASON_LABEL: Record<string, string> = {
  wrong: 'Làm sai',
  lucky: 'Đúng nhờ đoán',
  slow: 'Đúng nhưng quá chậm',
};

/**
 * SO TAY LOI SAI + ON TAP NGAT QUANG
 *
 * Cau tra loi cho cau hoi "hoc roi van quen thi lam sao": on lai dung vao luc
 * sap quen. Moi cau tung sai deu quay lai theo lich, va lich do gian ra dan
 * moi lan ban nho duoc.
 */
export function ReviewPage() {
  return (
    <PermissionGate permission="learn.review" title="Chưa mở quyền ôn tập">
      <ReviewContent />
    </PermissionGate>
  );
}

function ReviewContent() {
  const state = useAppState();
  const dispatch = useDispatch();
  const [revealed, setRevealed] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [done, setDone] = useState(0);

  const due = dueNow(state);
  const notebook = mistakeNotebook(state);
  const card = due[0];
  const question = card ? findQuestion(card.questionId) : undefined;

  const maxInterval = state.settings.examDate
    ? Math.max(1, daysUntil(state.settings.examDate))
    : 120;

  const upcoming = useMemo(() => forecast(Object.values(state.srs), 14), [state.srs]);

  const grade = (value: Grade) => {
    if (!card) return;
    dispatch({ type: 'srs/grade', questionId: card.questionId, grade: value, maxIntervalDays: maxInterval });
    setRevealed(false);
    setAnswer(null);
    setDone((n) => n + 1);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Sổ tay lỗi sai</h1>
        <p className="mt-1.5 max-w-3xl text-sm text-fg-muted">
          Mọi câu bạn làm sai, đoán trúng hoặc mất quá nhiều thời gian đều tự động vào đây và quay lại đúng lúc
          sắp quên. Khoảng cách giữa các lần ôn giãn dần khi bạn nhớ tốt, và co lại khi bạn quên.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Đến hạn hôm nay" value={formatNumber(due.length)} tone={due.length > 0 ? 'warn' : 'ok'} />
        <Stat label="Tổng số câu trong sổ" value={formatNumber(notebook.length)} />
        <Stat label="Đã ôn phiên này" value={formatNumber(done)} tone="ok" />
        <Stat
          label="Trần khoảng cách ôn"
          value={`${maxInterval} ngày`}
          hint={state.settings.examDate ? 'không vượt quá ngày thi' : 'chưa đặt ngày thi'}
        />
      </div>

      {card && question ? (
        <Card>
          <CardHeader
            title={`Ôn tập — còn ${due.length} câu`}
            subtitle={`${topicName(question.topicId)} · vào sổ vì: ${REASON_LABEL[card.reason] ?? card.reason}`}
            action={
              <Badge tone="neutral">
                Lần ôn thứ {card.reps + 1} · {card.lapses} lần quên
              </Badge>
            }
          />
          <Progress
            value={done}
            max={done + due.length}
            className="mb-5"
            label="Tiến độ phiên ôn tập"
          />

          <QuestionView
            question={question}
            response={{
              questionId: question.id,
              value: answer,
              flagged: false,
              timeSpentMs: 0,
              visits: 1,
              changes: 0,
            }}
            index={0}
            total={1}
            onAnswer={setAnswer}
            onConfidence={() => undefined}
            onToggleFlag={() => undefined}
            reveal={revealed}
            locked={revealed}
            showConfidence={false}
            apiKey={state.settings.aiApiKey}
          />

          {!revealed ? (
            <Button variant="primary" className="mt-6 w-full" onClick={() => setRevealed(true)}>
              Kiểm tra đáp án
            </Button>
          ) : (
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-fg">Bạn nhớ câu này đến đâu?</p>
              <div className="grid gap-2 sm:grid-cols-4">
                {([0, 1, 2, 3] as Grade[]).map((value) => (
                  <Button
                    key={value}
                    variant={value === 0 ? 'danger' : value === 3 ? 'success' : 'secondary'}
                    onClick={() => grade(value)}
                  >
                    {GRADE_LABEL[value]}
                  </Button>
                ))}
              </div>
              <p className="mt-2 text-xs text-fg-subtle">
                Trả lời trung thực quan trọng hơn trả lời đẹp: chọn "Quên hẳn" khi thật sự quên sẽ giúp câu đó
                quay lại sớm và bạn nhớ được lâu hơn.
              </p>
            </div>
          )}
        </Card>
      ) : (
        <EmptyState
          icon="✓"
          title={notebook.length === 0 ? 'Sổ tay còn trống' : 'Không còn câu nào đến hạn hôm nay'}
          description={
            notebook.length === 0
              ? 'Sổ tay sẽ tự đầy lên khi bạn làm phiếu luyện và thi thử. Không cần thêm tay câu nào.'
              : 'Bạn đã ôn hết phần đến hạn. Quay lại vào ngày mai, hoặc làm một phiếu luyện mới để tiếp tục tiến bộ.'
          }
          action={
            <Button variant="primary" onClick={() => (window.location.hash = '#/practice')}>
              Tới thư viện phiếu luyện
            </Button>
          }
        />
      )}

      {notebook.length > 0 && (
        <>
          <Card>
            <CardHeader
              title="Dự báo tải ôn tập 14 ngày tới"
              subtitle="Nhìn trước để không bị dồn quá nhiều câu vào một ngày."
            />
            <BarList
              max={Math.max(1, ...upcoming)}
              format={(v) => `${Math.round(v)} câu`}
              data={upcoming.map((value, index) => ({
                label: index === 0 ? 'Hôm nay' : `Sau ${index} ngày`,
                value,
              }))}
            />
          </Card>

          <Card>
            <CardHeader title={`Toàn bộ sổ tay (${notebook.length} câu)`} />
            <ul className="divide-y divide-line">
              {notebook.slice(0, 40).map(({ card: item, question: q }) => {
                const days = Math.ceil((item.due - Date.now()) / 86400000);
                return (
                  <li key={item.questionId} className="flex items-start justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm text-fg">{q.stem}</p>
                      <p className="mt-0.5 text-xs text-fg-subtle">
                        {topicName(q.topicId)} · {REASON_LABEL[item.reason] ?? item.reason}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium tabular-nums',
                        days <= 0 ? 'bg-warn-soft text-warn' : 'bg-surface-2 text-fg-muted',
                      )}
                    >
                      {days <= 0 ? 'Đến hạn' : `${formatDate(new Date(item.due).toISOString().slice(0, 10))}`}
                    </span>
                  </li>
                );
              })}
            </ul>
            {notebook.length > 40 && (
              <p className="mt-3 text-xs text-fg-subtle">Đang hiển thị 40 câu gần hạn nhất.</p>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
