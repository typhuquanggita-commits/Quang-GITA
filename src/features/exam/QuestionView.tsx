import { useEffect, useRef } from 'react';
import { DIFFICULTY_LABEL } from '../../config';
import { PASSAGE_BY_ID } from '../../data/passages';
import { topicName } from '../../data/topics';
import { cn } from '../../lib/cn';
import { isCorrect } from '../../lib/scoring';
import type { Confidence, Question, Response } from '../../types';
import { Badge } from '../../components/ui/primitives';
import { IconFlag } from '../../components/layout/icons';
import { TutorPanel } from '../ai/TutorPanel';

const CONFIDENCE_OPTIONS: ReadonlyArray<{ value: Confidence; label: string; hint: string }> = [
  { value: 'sure', label: 'Chắc chắn', hint: 'Biết rõ vì sao đúng' },
  { value: 'unsure', label: 'Chưa chắc', hint: 'Loại trừ được nhưng còn phân vân' },
  { value: 'guess', label: 'Đoán', hint: 'Khoanh may rủi' },
];

export interface QuestionViewProps {
  question: Question;
  response: Response | undefined;
  index: number;
  total: number;
  onAnswer: (value: string | null) => void;
  onConfidence: (value: Confidence) => void;
  onToggleFlag: () => void;
  /** Hien dap an va loi giai (che do luyen tap hoac xem lai). */
  reveal: boolean;
  /** Khoa khong cho doi dap an nua. */
  locked: boolean;
  apiKey: string;
  showConfidence?: boolean;
}

export function QuestionView({
  question,
  response,
  index,
  total,
  onAnswer,
  onConfidence,
  onToggleFlag,
  reveal,
  locked,
  apiKey,
  showConfidence = true,
}: QuestionViewProps) {
  const passage = question.passageId ? PASSAGE_BY_ID.get(question.passageId) : undefined;
  const value = response?.value ?? null;
  const correct = isCorrect(question, value);
  const fillRef = useRef<HTMLInputElement>(null);

  // Cau dien: dua con tro vao o nhap ngay de nguoi hoc go duoc lien —
  // moi giay dem duoc trong phong thi.
  useEffect(() => {
    if (question.format === 'fill' && !locked) fillRef.current?.focus();
  }, [question.id, question.format, locked]);

  return (
    <article className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
      {passage && (
        <aside className="card order-1 max-h-[70vh] overflow-y-auto p-5 lg:sticky lg:top-24">
          <h3 className="text-sm font-semibold text-fg">{passage.title}</h3>
          {passage.source && <p className="mt-0.5 text-xs text-fg-subtle">{passage.source}</p>}
          <div className="mt-3 space-y-3 text-[0.9375rem] leading-relaxed text-fg-muted">
            {passage.body.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </aside>
      )}

      <div className={cn('order-2 min-w-0 space-y-5', !passage && 'lg:col-span-2')}>
        <header className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral">
            Câu {index + 1}/{total}
          </Badge>
          <Badge tone="neutral">{topicName(question.topicId)}</Badge>
          <Badge tone={question.difficulty >= 4 ? 'warn' : 'neutral'}>
            {DIFFICULTY_LABEL[question.difficulty]}
          </Badge>
          <button
            type="button"
            onClick={onToggleFlag}
            aria-pressed={response?.flagged ?? false}
            className={cn(
              'ml-auto inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition',
              response?.flagged
                ? 'border-transparent bg-warn-soft text-warn'
                : 'border-line text-fg-subtle hover:text-fg',
            )}
          >
            <IconFlag className="size-3.5" />
            {response?.flagged ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}
          </button>
        </header>

        <p className="text-lg leading-relaxed text-fg" dangerouslySetInnerHTML={renderStem(question.stem)} />

        {question.format === 'mcq' ? (
          <ul className="space-y-2.5" role="radiogroup" aria-label={`Phương án cho câu ${index + 1}`}>
            {question.choices?.map((choice, choiceIndex) => {
              const selected = value === choice.id;
              const isAnswer = choice.id === question.answer;
              const state = reveal
                ? isAnswer
                  ? 'correct'
                  : selected
                    ? 'wrong'
                    : 'idle'
                : selected
                  ? 'selected'
                  : 'idle';

              return (
                <li key={choice.id}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={locked}
                    onClick={() => onAnswer(selected && !locked ? null : choice.id)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition',
                      'disabled:cursor-default',
                      state === 'idle' && 'border-line bg-surface hover:border-line-strong hover:bg-surface-2',
                      state === 'selected' && 'border-brand bg-brand-soft',
                      state === 'correct' && 'border-ok bg-ok-soft',
                      state === 'wrong' && 'border-bad bg-bad-soft',
                    )}
                  >
                    <span
                      className={cn(
                        'grid size-7 shrink-0 place-items-center rounded-lg border text-sm font-semibold',
                        state === 'idle' && 'border-line text-fg-muted',
                        state === 'selected' && 'border-brand bg-brand text-white',
                        state === 'correct' && 'border-ok bg-ok text-white',
                        state === 'wrong' && 'border-bad bg-bad text-white',
                      )}
                    >
                      {choice.id}
                    </span>
                    <span className="min-w-0 flex-1 pt-0.5 text-[0.9375rem] leading-relaxed text-fg">
                      {choice.text}
                    </span>
                    <span className="shrink-0 pt-0.5 text-sm">
                      {reveal && isAnswer ? '✓' : reveal && selected ? '✕' : ''}
                    </span>
                  </button>

                  {reveal && selected && !isAnswer && question.traps?.[choice.id] && (
                    <p className="mt-1.5 pl-10 text-sm text-bad">
                      Vì sao sai: {question.traps[choice.id]}
                    </p>
                  )}
                  {choiceIndex === 0 && null}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="max-w-sm">
            <label htmlFor={`fill-${question.id}`} className="mb-1.5 block text-sm font-medium text-fg">
              Điền đáp án
            </label>
            <input
              id={`fill-${question.id}`}
              ref={fillRef}
              inputMode="text"
              autoComplete="off"
              disabled={locked}
              value={value ?? ''}
              onChange={(event) => onAnswer(event.target.value)}
              placeholder="Ví dụ: 4  hoặc  0,5"
              className={cn(
                'h-12 w-full rounded-xl border bg-surface px-4 text-lg tabular-nums text-fg transition',
                reveal
                  ? correct
                    ? 'border-ok bg-ok-soft'
                    : 'border-bad bg-bad-soft'
                  : 'border-line focus:border-brand',
              )}
            />
            <p className="mt-1.5 text-xs text-fg-subtle">
              Chấp nhận cả dấu phẩy và dấu chấm thập phân. Không cần ghi đơn vị.
            </p>
            {reveal && !correct && (
              <p className="mt-2 text-sm text-ok">Đáp án đúng: {question.answer}</p>
            )}
          </div>
        )}

        {showConfidence && !reveal && (
          <fieldset className="rounded-xl border border-line bg-surface-2 p-3">
            <legend className="px-1 text-xs font-medium text-fg-muted">
              Bạn chắc chắn đến đâu? (giúp phát hiện điểm may rủi)
            </legend>
            <div className="flex flex-wrap gap-2">
              {CONFIDENCE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  title={option.hint}
                  aria-pressed={response?.confidence === option.value}
                  onClick={() => onConfidence(option.value)}
                  className={cn(
                    'rounded-lg border px-3 py-1.5 text-sm transition',
                    response?.confidence === option.value
                      ? 'border-brand bg-brand-soft text-brand'
                      : 'border-line text-fg-muted hover:text-fg',
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {reveal && (
          <div className="space-y-4">
            <div
              className={cn(
                'rounded-xl border p-4',
                correct ? 'border-ok/40 bg-ok-soft' : 'border-bad/40 bg-bad-soft',
              )}
            >
              <p className={cn('text-sm font-semibold', correct ? 'text-ok' : 'text-bad')}>
                {correct ? 'Chính xác' : value ? 'Chưa đúng' : 'Bỏ trống — mất điểm chắc chắn'}
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg">{question.explanation}</p>
              {question.skills.length > 0 && (
                <p className="mt-3 flex flex-wrap gap-1.5">
                  {question.skills.map((skill) => (
                    <Badge key={skill} tone="neutral">
                      {skill}
                    </Badge>
                  ))}
                </p>
              )}
            </div>

            <TutorPanel apiKey={apiKey} question={question} userAnswer={value} />
          </div>
        )}
      </div>
    </article>
  );
}

/**
 * Cho phep mot vai the dinh dang toi thieu trong de bai (<u>, <b>, <i>, <sup>,
 * <sub>) — can cho cac cau gach chan tu trong tieng Anh va chi so tren/duoi.
 * Moi the khac deu bi loai bo, nen noi dung khong the chen HTML tuy y.
 */
function renderStem(stem: string): { __html: string } {
  const escaped = stem
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const allowed = escaped.replace(
    /&lt;(\/?)(u|b|i|em|strong|sup|sub)&gt;/g,
    (_match, slash: string, tag: string) => `<${slash}${tag}>`,
  );
  return { __html: allowed };
}
