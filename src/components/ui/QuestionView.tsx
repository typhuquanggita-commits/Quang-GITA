/**
 * Question rendering, shared by the exam player, practice, and review.
 *
 * Three behaviours matter here and all three exist in the operational test:
 * text highlighting over the stimulus, an answer eliminator that strikes
 * options through, and — in review only — colour-coding of the key against
 * what the student chose.
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { Annotation, Question, Stimulus } from '../../types.ts';
import { Figure } from './Figure.tsx';
import { cx, uid } from '../../lib/util.ts';
import { IconX } from './icons.tsx';

/* ------------------------------------------------------------------ */
/* Stimulus with highlighting                                          */
/* ------------------------------------------------------------------ */

const HIGHLIGHT_COLORS: Array<Annotation['color']> = ['yellow', 'blue', 'pink', 'green'];

/**
 * Splits the plain-text stimulus into highlighted and unhighlighted runs.
 * Working from character offsets keeps annotations valid across re-renders
 * and across a reload, which a DOM-range approach would not survive.
 */
function segment(text: string, annotations: readonly Annotation[]) {
  const sorted = [...annotations].sort((a, b) => a.start - b.start);
  const runs: Array<{ text: string; annotation: Annotation | null }> = [];
  let cursor = 0;

  for (const annotation of sorted) {
    const start = Math.max(cursor, Math.min(annotation.start, text.length));
    const end = Math.max(start, Math.min(annotation.end, text.length));
    if (start > cursor) runs.push({ text: text.slice(cursor, start), annotation: null });
    if (end > start) runs.push({ text: text.slice(start, end), annotation });
    cursor = Math.max(cursor, end);
  }
  if (cursor < text.length) runs.push({ text: text.slice(cursor), annotation: null });
  return runs;
}

export function StimulusView({
  stimulus,
  questionId,
  annotations = [],
  onAnnotate,
  onRemoveAnnotation,
  annotatable = false,
}: {
  stimulus: Stimulus;
  questionId: string;
  annotations?: readonly Annotation[];
  onAnnotate?(annotation: Annotation): void;
  onRemoveAnnotation?(id: string): void;
  annotatable?: boolean;
}): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [bubble, setBubble] = useState<{ x: number; y: number; start: number; end: number } | null>(null);

  const mine = useMemo(
    () => annotations.filter((a) => a.questionId === questionId),
    [annotations, questionId],
  );

  /**
   * Converts the browser selection into character offsets in the source
   * string. Walking the text nodes ourselves is what makes the offsets
   * independent of how the runs happen to be split at that moment.
   */
  const onMouseUp = useCallback(() => {
    if (!annotatable || !onAnnotate || !ref.current) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      setBubble(null);
      return;
    }
    const range = selection.getRangeAt(0);
    if (!ref.current.contains(range.commonAncestorContainer)) {
      setBubble(null);
      return;
    }

    const before = range.cloneRange();
    before.selectNodeContents(ref.current);
    before.setEnd(range.startContainer, range.startOffset);
    const start = before.toString().length;
    const end = start + range.toString().length;
    if (end <= start) {
      setBubble(null);
      return;
    }

    const rect = range.getBoundingClientRect();
    setBubble({ x: rect.left + rect.width / 2, y: rect.top - 8, start, end });
  }, [annotatable, onAnnotate]);

  const applyColor = useCallback(
    (color: Annotation['color']) => {
      if (!bubble || !onAnnotate) return;
      onAnnotate({
        id: uid('ann'),
        questionId,
        start: bubble.start,
        end: bubble.end,
        color,
      });
      window.getSelection()?.removeAllRanges();
      setBubble(null);
    },
    [bubble, onAnnotate, questionId],
  );

  const paragraphs = stimulus.text.split('\n\n');
  let consumed = 0;

  return (
    <>
      <div className="stimulus" ref={ref} onMouseUp={onMouseUp}>
        {paragraphs.map((paragraph, index) => {
          const offset = consumed;
          consumed += paragraph.length + 2;
          const local = mine
            .filter((a) => a.end > offset && a.start < offset + paragraph.length)
            .map((a) => ({ ...a, start: a.start - offset, end: a.end - offset }));
          return (
            <p key={index}>
              {segment(paragraph, local).map((run, i) =>
                run.annotation ? (
                  <mark
                    key={i}
                    className="hl"
                    data-color={run.annotation.color}
                    data-note={run.annotation.note ? 'true' : undefined}
                    title={run.annotation.note}
                    onDoubleClick={() => onRemoveAnnotation?.(run.annotation!.id)}
                  >
                    {run.text}
                  </mark>
                ) : (
                  <React.Fragment key={i}>{run.text}</React.Fragment>
                ),
              )}
            </p>
          );
        })}
        {stimulus.source && <p className="stimulus-source">{stimulus.source}</p>}
      </div>

      {stimulus.table && (
        <div className="fig scroll-x">
          <table className="data-table">
            {stimulus.table.caption && (
              <caption style={{ captionSide: 'top', textAlign: 'left', paddingBottom: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                {stimulus.table.caption}
              </caption>
            )}
            <thead>
              <tr>
                {stimulus.table.headers.map((header, i) => (
                  <th key={i} scope="col">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stimulus.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row">{cell}</th>
                    ) : (
                      <td key={j}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {stimulus.figure && <Figure spec={stimulus.figure} />}

      {bubble && (
        <div
          className="hl-bubble"
          style={{ left: bubble.x, top: bubble.y, transform: 'translate(-50%, -100%)' }}
          role="toolbar"
          aria-label="Highlight colour"
        >
          {HIGHLIGHT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className="hl-swatch"
              data-color={color}
              aria-label={`Highlight ${color}`}
              onClick={() => applyColor(color)}
            />
          ))}
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-icon"
            aria-label="Cancel"
            onClick={() => setBubble(null)}
          >
            <IconX size={14} />
          </button>
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Answer area                                                         */
/* ------------------------------------------------------------------ */

export interface AnswerAreaProps {
  question: Question;
  value: string | null;
  onChange(value: string | null): void;
  /** Choice ids the student struck through. */
  eliminated?: readonly string[];
  onToggleEliminate?(choiceId: string): void;
  /** Enables the strike-through control (exam and practice, not review). */
  eliminatorEnabled?: boolean;
  /** Review mode marks the key and the student's wrong pick. */
  revealed?: boolean;
  disabled?: boolean;
}

export function AnswerArea({
  question,
  value,
  onChange,
  eliminated = [],
  onToggleEliminate,
  eliminatorEnabled = false,
  revealed = false,
  disabled = false,
}: AnswerAreaProps): React.ReactElement {
  if (question.format === 'spr') {
    return <SprInput question={question} value={value} onChange={onChange} revealed={revealed} disabled={disabled} />;
  }

  const key = String(question.answer);

  return (
    <ul className="choices" role="radiogroup" aria-label="Answer choices">
      {question.choices?.map((choice) => {
        const selected = value === choice.id;
        const struck = eliminated.includes(choice.id);
        const state = !revealed
          ? undefined
          : choice.id === key
            ? 'correct'
            : selected
              ? 'chosen-wrong'
              : undefined;

        return (
          <li key={choice.id}>
            <div className="row gap-2">
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                data-eliminated={struck || undefined}
                data-state={state}
                className="choice grow"
                disabled={disabled}
                onClick={() => onChange(selected ? null : choice.id)}
              >
                <span className="choice-key" aria-hidden="true">{choice.id}</span>
                <span className="choice-text">{choice.text}</span>
              </button>

              {eliminatorEnabled && onToggleEliminate && (
                <button
                  type="button"
                  className="eliminator"
                  aria-pressed={struck}
                  aria-label={`Eliminate option ${choice.id}`}
                  onClick={() => onToggleEliminate(choice.id)}
                  disabled={disabled}
                >
                  {choice.id}
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function SprInput({
  question,
  value,
  onChange,
  revealed,
  disabled,
}: {
  question: Question;
  value: string | null;
  onChange(value: string | null): void;
  revealed: boolean;
  disabled: boolean;
}) {
  const accepted = Array.isArray(question.answer) ? question.answer : [question.answer];
  return (
    <div className="stack gap-3">
      <label className="label" htmlFor={`spr-${question.id}`}>
        Answer
      </label>
      <input
        id={`spr-${question.id}`}
        className="input spr-input"
        inputMode="text"
        autoComplete="off"
        spellCheck={false}
        // The operational entry field accepts at most five characters.
        maxLength={6}
        value={value ?? ''}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value === '' ? null : event.target.value)}
      />
      <p className="hint">Nhập số nguyên, phân số (vd 3/4) hoặc số thập phân. Tối đa 5 ký tự.</p>
      {revealed && (
        <p className="text-sm">
          <span className="muted">Đáp án đúng: </span>
          <span className="semibold mono">{accepted.join(' hoặc ')}</span>
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Explanation                                                         */
/* ------------------------------------------------------------------ */

export function Explanation({
  question,
  chosen,
  labels,
}: {
  question: Question;
  chosen: string | null;
  labels: { explanation: string; whyWrong: string };
}): React.ReactElement {
  const notes = question.distractorNotes ?? {};
  const wrongKeys = Object.keys(notes);

  return (
    <div className="explain">
      <h4>{labels.explanation}</h4>
      <p style={{ marginBottom: wrongKeys.length ? 'var(--space-4)' : 0 }}>{question.explanation}</p>

      {wrongKeys.length > 0 && (
        <>
          <h4>{labels.whyWrong}</h4>
          {wrongKeys.map((id) => (
            <div className={cx('distractor')} key={id}>
              <span className={cx('choice-key')} style={chosen === id ? { borderColor: 'var(--danger)', color: 'var(--danger)' } : undefined}>
                {id}
              </span>
              <span className="secondary">{notes[id]}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
