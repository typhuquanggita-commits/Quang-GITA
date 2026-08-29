/**
 * The test delivery surface.
 *
 * Models the Bluebook workflow: a fixed header carrying the module name and
 * clock, a split stimulus/answer pane, a question navigator, mark-for-review,
 * an answer eliminator, highlighting, the calculator and reference sheet, a
 * timed break between sections, and adaptive routing into the second module.
 *
 * The clock is authoritative, not decorative: the module deadline is an
 * absolute timestamp held in persisted state, so closing the tab and coming
 * back does not hand the student extra time.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Attempt, Question, TestForm } from '../../types.ts';
import { QUESTION_BY_ID } from '../../data/bank.ts';
import { SECTION_SPEC } from '../../data/blueprint.ts';
import { routePathway } from '../../engine/adaptive.ts';
import { estimateAbility } from '../../engine/irt.ts';
import { isCorrect, scoreAttempt } from '../../engine/scoring.ts';
import { useStore } from '../../state/store.tsx';
import { useT, useLocale } from '../../i18n/index.ts';
import { cx, formatClock } from '../../lib/util.ts';
import { Button, Modal } from '../../components/ui/primitives.tsx';
import { AnswerArea, StimulusView } from '../../components/ui/QuestionView.tsx';
import {
  IconCalculator,
  IconChevronLeft,
  IconChevronRight,
  IconEye,
  IconEyeOff,
  IconFlag,
  IconFlagFilled,
  IconGrid,
  IconSigma,
  IconX,
} from '../../components/ui/icons.tsx';
import { Calculator } from './Calculator.tsx';
import { ReferenceSheet } from './ReferenceSheet.tsx';
import { useProctor } from './useProctor.ts';

export function ExamPlayer({
  attempt,
  form,
  onExit,
  onFinished,
}: {
  attempt: Attempt;
  form: TestForm;
  onExit(): void;
  onFinished(attemptId: string): void;
}): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch } = useStore();
  const preferences = state.preferences;

  const [showTimer, setShowTimer] = useState(preferences.showTimerByDefault);
  const [navOpen, setNavOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [refOpen, setRefOpen] = useState(false);
  const [reviewPage, setReviewPage] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [integrityNotice, setIntegrityNotice] = useState(false);

  const moduleById = useMemo(
    () => new Map(form.modules.map((m) => [m.id, m])),
    [form.modules],
  );

  const currentModule = moduleById.get(attempt.deliveredModuleIds[attempt.currentModuleIndex]);
  const questionEnteredAt = useRef<number>(Date.now());

  /* ---------------- Integrity ---------------- */

  const proctor = useProctor({
    enabled: attempt.mode === 'full-test' || attempt.mode === 'section-test',
    level: preferences.proctoring,
    onEvent: (event) => {
      dispatch({ type: 'attempt/integrity', attemptId: attempt.id, event });
      if (event.kind === 'blur') setIntegrityNotice(true);
    },
  });

  /* ---------------- Clock ---------------- */

  // Start the module clock the first time this module is shown.
  useEffect(() => {
    if (!currentModule || attempt.moduleDeadline !== null || attempt.onBreak) return;
    const seconds = Math.round(currentModule.durationSeconds * attempt.timeMultiplier);
    dispatch({
      type: 'attempt/patch',
      id: attempt.id,
      patch: { moduleDeadline: Date.now() + seconds * 1000 },
    });
  }, [currentModule, attempt.moduleDeadline, attempt.onBreak, attempt.id, attempt.timeMultiplier, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(timer);
  }, []);

  const remaining = attempt.moduleDeadline ? Math.max(0, Math.round((attempt.moduleDeadline - now) / 1000)) : null;
  const breakRemaining = attempt.breakDeadline ? Math.max(0, Math.round((attempt.breakDeadline - now) / 1000)) : null;

  /* ---------------- Question access ---------------- */

  const questions: Question[] = useMemo(() => {
    if (!currentModule) return [];
    return currentModule.questionIds
      .map((id) => QUESTION_BY_ID.get(id))
      .filter((q): q is Question => Boolean(q));
  }, [currentModule]);

  const index = Math.min(attempt.currentQuestionIndex, Math.max(0, questions.length - 1));
  const question = questions[index];
  const response = question ? attempt.responses[question.id] : undefined;

  /** Persists elapsed time on the question being left. */
  const commitTime = useCallback(() => {
    if (!question) return;
    const spent = Date.now() - questionEnteredAt.current;
    questionEnteredAt.current = Date.now();
    const existing = attempt.responses[question.id];
    dispatch({
      type: 'attempt/respond',
      attemptId: attempt.id,
      questionId: question.id,
      patch: {
        msSpent: (existing?.msSpent ?? 0) + spent,
        visits: (existing?.visits ?? 0) + 1,
      },
    });
  }, [question, attempt.id, attempt.responses, dispatch]);

  const goTo = useCallback(
    (nextIndex: number) => {
      commitTime();
      dispatch({
        type: 'attempt/patch',
        id: attempt.id,
        patch: { currentQuestionIndex: Math.max(0, Math.min(questions.length - 1, nextIndex)) },
      });
      setReviewPage(false);
      setNavOpen(false);
    },
    [commitTime, dispatch, attempt.id, questions.length],
  );

  const setAnswer = useCallback(
    (value: string | null) => {
      if (!question) return;
      const existing = attempt.responses[question.id];
      dispatch({
        type: 'attempt/respond',
        attemptId: attempt.id,
        questionId: question.id,
        patch: {
          value,
          // Scored at submission, but stored now so a resumed attempt is
          // consistent if the bank changes underneath it.
          correct: value === null ? null : isCorrect(question, value),
          lastChangedAt: Date.now(),
          visits: existing?.visits ?? 1,
        },
      });
    },
    [question, attempt.id, attempt.responses, dispatch],
  );

  const toggleFlag = useCallback(() => {
    if (!question) return;
    const existing = attempt.responses[question.id];
    dispatch({
      type: 'attempt/respond',
      attemptId: attempt.id,
      questionId: question.id,
      patch: { flagged: !existing?.flagged },
    });
  }, [question, attempt.id, attempt.responses, dispatch]);

  const toggleEliminate = useCallback(
    (choiceId: string) => {
      if (!question) return;
      const existing = attempt.responses[question.id];
      const current = existing?.eliminated ?? [];
      dispatch({
        type: 'attempt/respond',
        attemptId: attempt.id,
        questionId: question.id,
        patch: {
          eliminated: current.includes(choiceId)
            ? current.filter((id) => id !== choiceId)
            : [...current, choiceId],
        },
      });
    },
    [question, attempt.id, attempt.responses, dispatch],
  );

  /* ---------------- Module transitions ---------------- */

  const finishAttempt = useCallback(
    (finalAttempt: Attempt) => {
      const report = scoreAttempt(finalAttempt, {
        questions: QUESTION_BY_ID,
        modules: moduleById,
      });
      dispatch({ type: 'attempt/score', attemptId: finalAttempt.id, report });

      // Fold every scored response into the running ability estimates now that
      // the attempt is complete; during delivery they are deliberately withheld
      // so nothing about performance leaks back into the running test.
      for (const moduleId of finalAttempt.deliveredModuleIds) {
        const module = moduleById.get(moduleId);
        if (!module) continue;
        for (const id of module.questionIds) {
          const q = QUESTION_BY_ID.get(id);
          const r = finalAttempt.responses[id];
          if (!q || !r || r.value === null) continue;
          dispatch({
            type: 'ability/record',
            section: q.section,
            skill: q.skill,
            question: q,
            correct: Boolean(r.correct),
          });
          if (!r.correct) dispatch({ type: 'srs/review', ref: `q:${q.id}`, grade: 1 });
        }
      }

      dispatch({ type: 'activity/log', seconds: Math.round((Date.now() - finalAttempt.startedAt) / 1000) });
      void proctor.exitFullscreen();
      onFinished(finalAttempt.id);
    },
    [dispatch, moduleById, onFinished, proctor],
  );

  /**
   * Advances past the module just completed: routes into the correct
   * second-stage module, inserts the break between sections, or finishes.
   */
  const advanceModule = useCallback(() => {
    if (!currentModule) return;
    commitTime();

    const isStage1 = currentModule.stage === 1;

    if (isStage1) {
      // Route on the ability shown in the routing module.
      const scored = currentModule.questionIds
        .filter((id) => !currentModule.pretestIds.includes(id))
        .map((id) => {
          const q = QUESTION_BY_ID.get(id);
          const r = attempt.responses[id];
          return q ? { item: q.irt, correct: Boolean(r?.correct) } : null;
        })
        .filter((x): x is { item: Question['irt']; correct: boolean } => Boolean(x));

      const { theta } = estimateAbility(scored);
      const pathway = routePathway(theta);
      const next = form.modules.find(
        (m) => m.section === currentModule.section && m.stage === 2 && m.pathway === pathway,
      );
      if (!next) return;

      dispatch({
        type: 'attempt/patch',
        id: attempt.id,
        patch: {
          deliveredModuleIds: [...attempt.deliveredModuleIds, next.id],
          currentModuleIndex: attempt.currentModuleIndex + 1,
          currentQuestionIndex: 0,
          moduleDeadline: null,
        },
      });
      setReviewPage(false);
      setTimeUp(false);
      questionEnteredAt.current = Date.now();
      return;
    }

    // Stage 2 complete. Either the section is done and another follows, or the
    // whole test is done.
    const remainingSections = (['rw', 'math'] as const).filter(
      (section) =>
        form.modules.some((m) => m.section === section) &&
        !attempt.deliveredModuleIds.some((id) => moduleById.get(id)?.section === section),
    );

    if (remainingSections.length === 0) {
      const finalAttempt: Attempt = { ...attempt, submittedAt: Date.now(), status: 'submitted' };
      finishAttempt(finalAttempt);
      return;
    }

    const nextSection = remainingSections[0];
    const nextStage1 = form.modules.find((m) => m.section === nextSection && m.stage === 1);
    if (!nextStage1) return;

    dispatch({
      type: 'attempt/patch',
      id: attempt.id,
      patch: {
        deliveredModuleIds: [...attempt.deliveredModuleIds, nextStage1.id],
        currentModuleIndex: attempt.currentModuleIndex + 1,
        currentQuestionIndex: 0,
        moduleDeadline: null,
        onBreak: form.breakSeconds > 0,
        breakDeadline: form.breakSeconds > 0 ? Date.now() + form.breakSeconds * 1000 : null,
      },
    });
    setReviewPage(false);
    setTimeUp(false);
    questionEnteredAt.current = Date.now();
  }, [
    currentModule,
    commitTime,
    attempt,
    form.modules,
    form.breakSeconds,
    dispatch,
    moduleById,
    finishAttempt,
  ]);

  // Auto-submit the module the moment its clock expires.
  useEffect(() => {
    if (remaining === null || remaining > 0 || attempt.onBreak || timeUp) return;
    setTimeUp(true);
  }, [remaining, attempt.onBreak, timeUp]);

  // End the break automatically when its clock runs out.
  useEffect(() => {
    if (!attempt.onBreak || breakRemaining === null || breakRemaining > 0) return;
    dispatch({ type: 'attempt/patch', id: attempt.id, patch: { onBreak: false, breakDeadline: null } });
  }, [attempt.onBreak, breakRemaining, attempt.id, dispatch]);

  /* ---------------- Keyboard shortcuts ---------------- */

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === 'ArrowRight') { event.preventDefault(); goTo(index + 1); }
      else if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(index - 1); }
      else if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleFlag(); }
      else if (event.key.toLowerCase() === 'n') { event.preventDefault(); setNavOpen((v) => !v); }
      else if (['a', 'b', 'c', 'd'].includes(event.key.toLowerCase()) && question?.format === 'mcq') {
        event.preventDefault();
        setAnswer(event.key.toUpperCase());
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goTo, index, toggleFlag, setAnswer, question]);

  /* ---------------- Render ---------------- */

  if (!currentModule) {
    return (
      <div className="exam center">
        <p className="muted">{t('common.loading')}</p>
      </div>
    );
  }

  if (attempt.onBreak) {
    return (
      <BreakScreen
        remaining={breakRemaining ?? 0}
        onResume={() =>
          dispatch({ type: 'attempt/patch', id: attempt.id, patch: { onBreak: false, breakDeadline: null } })
        }
      />
    );
  }

  const answeredCount = questions.filter((q) => {
    const r = attempt.responses[q.id];
    return r && r.value !== null && r.value !== '';
  }).length;

  const sectionName = locale === 'vi' ? SECTION_SPEC[currentModule.section].labelVi : SECTION_SPEC[currentModule.section].label;
  const moduleNumber = currentModule.stage;
  const isMath = currentModule.section === 'math';
  const critical = remaining !== null && remaining <= 60;
  const warn = remaining !== null && remaining <= 300 && !critical;

  return (
    <div className="exam">
      {/* ---------- Header ---------- */}
      <header className="exam-head">
        <div>
          <div className="exam-module-name">
            {t('exam.moduleOf', { section: sectionName, n: moduleNumber })}
          </div>
          <button className="exam-directions" type="button" onClick={() => setNavOpen(false)}>
            {t('exam.directions')}
          </button>
        </div>

        <div className="exam-clock">
          {showTimer ? (
            <span
              className="exam-time"
              data-warn={warn || undefined}
              data-critical={critical || undefined}
              role="timer"
              aria-live="off"
              aria-label={t('a11y.timeRemaining', { time: formatClock(remaining ?? 0) })}
            >
              {formatClock(remaining ?? 0)}
            </span>
          ) : (
            <span className="exam-time-hidden" aria-hidden="true" />
          )}
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setShowTimer((v) => !v)}
            aria-pressed={!showTimer}
          >
            {showTimer ? <IconEyeOff size={14} /> : <IconEye size={14} />}
            {showTimer ? t('exam.hide') : t('exam.show')}
          </button>
        </div>

        <div className="exam-tools">
          {isMath && (
            <>
              <button
                type="button"
                className="exam-tool"
                aria-pressed={calcOpen}
                onClick={() => setCalcOpen((v) => !v)}
              >
                <IconCalculator size={18} />
                {t('exam.calculator')}
              </button>
              <button
                type="button"
                className="exam-tool"
                aria-pressed={refOpen}
                onClick={() => setRefOpen((v) => !v)}
              >
                <IconSigma size={18} />
                {t('exam.reference')}
              </button>
            </>
          )}
          <button type="button" className="exam-tool" onClick={() => setConfirmExit(true)}>
            <IconX size={18} />
            {t('exam.exit')}
          </button>
        </div>
      </header>

      {integrityNotice && preferences.proctoring !== 'off' && (
        <div className="integrity-banner" role="status">
          <span>{t('exam.integrityWarn')}</span>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setIntegrityNotice(false)}>
            {t('common.close')}
          </button>
        </div>
      )}

      {/* ---------- Body ---------- */}
      <main className="exam-body">
        {reviewPage ? (
          <ReviewPage
            questions={questions}
            attempt={attempt}
            onGoTo={goTo}
            onSubmit={() => setConfirmSubmit(true)}
          />
        ) : question ? (
          question.stimulus ? (
            <div className="exam-split">
              <div className="exam-pane exam-pane-left">
                <StimulusView
                  stimulus={question.stimulus}
                  questionId={question.id}
                  annotations={attempt.annotations}
                  annotatable
                  onAnnotate={(annotation) =>
                    dispatch({ type: 'attempt/annotate', attemptId: attempt.id, annotation })
                  }
                  onRemoveAnnotation={(id) =>
                    dispatch({ type: 'attempt/unannotate', attemptId: attempt.id, annotationId: id })
                  }
                />
              </div>
              <div className="exam-rule" />
              <div className="exam-pane">
                <QuestionPane
                  question={question}
                  index={index}
                  flagged={Boolean(response?.flagged)}
                  value={response?.value ?? null}
                  eliminated={response?.eliminated ?? []}
                  onToggleFlag={toggleFlag}
                  onChange={setAnswer}
                  onToggleEliminate={toggleEliminate}
                  markLabel={t('exam.markForReview')}
                />
              </div>
            </div>
          ) : (
            <div className="exam-single">
              <div className="exam-pane">
                <QuestionPane
                  question={question}
                  index={index}
                  flagged={Boolean(response?.flagged)}
                  value={response?.value ?? null}
                  eliminated={response?.eliminated ?? []}
                  onToggleFlag={toggleFlag}
                  onChange={setAnswer}
                  onToggleEliminate={toggleEliminate}
                  markLabel={t('exam.markForReview')}
                />
              </div>
            </div>
          )
        ) : null}
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="exam-foot">
        <div className="exam-user">
          {state.profile.name || 'Student'}
          <span className="muted text-sm">
            {' · '}
            {answeredCount}/{questions.length} {t('common.questions')}
          </span>
        </div>

        <div className="nav-anchor">
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={navOpen}
            aria-haspopup="dialog"
            onClick={() => setNavOpen((v) => !v)}
          >
            <IconGrid size={15} />
            {t('exam.questionNav', { current: index + 1, total: questions.length })}
          </button>
          {navOpen && (
            <Navigator
              questions={questions}
              attempt={attempt}
              currentIndex={index}
              onGoTo={goTo}
              onReviewPage={() => {
                setNavOpen(false);
                setReviewPage(true);
              }}
              onClose={() => setNavOpen(false)}
              labels={{
                title: t('a11y.questionNavigator'),
                answered: t('exam.answered'),
                unanswered: t('exam.unanswered'),
                forReview: t('exam.forReview'),
                current: t('exam.current'),
                goToReview: t('exam.goToReview'),
              }}
            />
          )}
        </div>

        <div className="exam-foot-right">
          <Button variant="secondary" size="sm" onClick={() => goTo(index - 1)} disabled={index === 0}>
            <IconChevronLeft size={15} />
            {t('common.previous')}
          </Button>
          {index < questions.length - 1 ? (
            <Button variant="primary" size="sm" onClick={() => goTo(index + 1)}>
              {t('common.next')}
              <IconChevronRight size={15} />
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={() => setReviewPage(true)}>
              {t('exam.goToReview')}
            </Button>
          )}
        </div>
      </footer>

      {calcOpen && <Calculator onClose={() => setCalcOpen(false)} />}
      {refOpen && <ReferenceSheet onClose={() => setRefOpen(false)} />}

      <Modal
        open={confirmSubmit}
        onClose={() => setConfirmSubmit(false)}
        title={t('exam.submitModule')}
        footer={
          <>
            <Button onClick={() => setConfirmSubmit(false)}>{t('common.cancel')}</Button>
            <Button
              variant="primary"
              onClick={() => {
                setConfirmSubmit(false);
                advanceModule();
              }}
            >
              {t('common.confirm')}
            </Button>
          </>
        }
      >
        <p>{t('exam.submitConfirm')}</p>
        {answeredCount < questions.length && (
          <p className="text-sm" style={{ marginTop: 'var(--space-3)', color: 'var(--warning)' }}>
            {questions.length - answeredCount} {t('exam.unanswered').toLowerCase()}.
          </p>
        )}
      </Modal>

      <Modal
        open={timeUp}
        onClose={() => undefined}
        dismissible={false}
        title={t('exam.timeUp')}
        footer={
          <Button variant="primary" onClick={() => { setTimeUp(false); advanceModule(); }}>
            {t('common.continue')}
          </Button>
        }
      >
        <p>{t('exam.timeUpBody')}</p>
      </Modal>

      <Modal
        open={confirmExit}
        onClose={() => setConfirmExit(false)}
        title={t('exam.exit')}
        footer={
          <>
            <Button onClick={() => setConfirmExit(false)}>{t('common.cancel')}</Button>
            <Button
              variant="danger"
              onClick={() => {
                commitTime();
                void proctor.exitFullscreen();
                onExit();
              }}
            >
              {t('exam.exit')}
            </Button>
          </>
        }
      >
        <p>{t('exam.exitConfirm')}</p>
      </Modal>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function QuestionPane({
  question,
  index,
  flagged,
  value,
  eliminated,
  onToggleFlag,
  onChange,
  onToggleEliminate,
  markLabel,
}: {
  question: Question;
  index: number;
  flagged: boolean;
  value: string | null;
  eliminated: readonly string[];
  onToggleFlag(): void;
  onChange(value: string | null): void;
  onToggleEliminate(choiceId: string): void;
  markLabel: string;
}): React.ReactElement {
  return (
    <div className="stack gap-5">
      <div className="q-header">
        <span className="q-number">{index + 1}</span>
        <button type="button" className="q-flag" aria-pressed={flagged} onClick={onToggleFlag}>
          {flagged ? <IconFlagFilled size={15} /> : <IconFlag size={15} />}
          {markLabel}
        </button>
      </div>
      <p className="q-prompt">{question.prompt}</p>
      <AnswerArea
        question={question}
        value={value}
        onChange={onChange}
        eliminated={eliminated}
        onToggleEliminate={onToggleEliminate}
        eliminatorEnabled={question.format === 'mcq'}
      />
    </div>
  );
}

function Navigator({
  questions,
  attempt,
  currentIndex,
  onGoTo,
  onReviewPage,
  onClose,
  labels,
}: {
  questions: Question[];
  attempt: Attempt;
  currentIndex: number;
  onGoTo(index: number): void;
  onReviewPage(): void;
  onClose(): void;
  labels: {
    title: string;
    answered: string;
    unanswered: string;
    forReview: string;
    current: string;
    goToReview: string;
  };
}): React.ReactElement {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="navigator" role="dialog" aria-label={labels.title}>
      <div className="nav-grid">
        {questions.map((question, i) => {
          const response = attempt.responses[question.id];
          const answered = Boolean(response && response.value !== null && response.value !== '');
          return (
            <button
              key={question.id}
              type="button"
              className="nav-cell"
              data-answered={answered || undefined}
              data-current={i === currentIndex || undefined}
              data-flagged={response?.flagged || undefined}
              aria-label={`Question ${i + 1}${answered ? ', answered' : ''}${response?.flagged ? ', marked for review' : ''}`}
              aria-current={i === currentIndex ? 'true' : undefined}
              onClick={() => onGoTo(i)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="nav-legend">
        <span><i style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, background: 'var(--primary)', marginRight: 6 }} />{labels.answered}</span>
        <span><i style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2, border: '1.5px dashed var(--border-strong)', marginRight: 6 }} />{labels.unanswered}</span>
        <span><i style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: 'var(--danger)', marginRight: 6 }} />{labels.forReview}</span>
      </div>

      <Button variant="primary" block onClick={onReviewPage} style={{ marginTop: 'var(--space-4)' }}>
        {labels.goToReview}
      </Button>
    </div>
  );
}

function ReviewPage({
  questions,
  attempt,
  onGoTo,
  onSubmit,
}: {
  questions: Question[];
  attempt: Attempt;
  onGoTo(index: number): void;
  onSubmit(): void;
}): React.ReactElement {
  const t = useT();
  const unanswered = questions.filter((q) => {
    const r = attempt.responses[q.id];
    return !r || r.value === null || r.value === '';
  }).length;
  const flagged = questions.filter((q) => attempt.responses[q.id]?.flagged).length;

  return (
    <div className="exam-single">
      <div className="exam-pane stack gap-6">
        <div>
          <h2 style={{ fontSize: 'var(--text-2xl)' }}>{t('exam.reviewTitle')}</h2>
          <p className="muted" style={{ marginTop: 'var(--space-2)' }}>{t('exam.reviewBody')}</p>
        </div>

        <div className="row gap-4 wrap text-sm">
          <span className="badge badge-warning">{unanswered} {t('exam.unanswered')}</span>
          <span className="badge badge-danger">{flagged} {t('exam.forReview')}</span>
        </div>

        <div className="nav-grid" style={{ maxHeight: 'none' }}>
          {questions.map((question, i) => {
            const response = attempt.responses[question.id];
            const answered = Boolean(response && response.value !== null && response.value !== '');
            return (
              <button
                key={question.id}
                type="button"
                className="nav-cell"
                data-answered={answered || undefined}
                data-flagged={response?.flagged || undefined}
                aria-label={`Question ${i + 1}${answered ? ', answered' : ', unanswered'}`}
                onClick={() => onGoTo(i)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <Button variant="primary" size="lg" onClick={onSubmit} style={{ alignSelf: 'flex-start' }}>
          {t('exam.submitModule')}
        </Button>
      </div>
    </div>
  );
}

function BreakScreen({ remaining, onResume }: { remaining: number; onResume(): void }): React.ReactElement {
  const t = useT();
  return (
    <div className="break-screen">
      <div className="stack gap-6 center" style={{ flexDirection: 'column' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)' }}>{t('exam.break')}</h1>
        <div className="break-clock">{formatClock(remaining)}</div>
        <p className="muted" style={{ maxWidth: '46ch' }}>{t('exam.breakBody')}</p>
        <Button variant="primary" size="lg" onClick={onResume}>
          {t('exam.resumeNow')}
        </Button>
      </div>
    </div>
  );
}

export { cx };
