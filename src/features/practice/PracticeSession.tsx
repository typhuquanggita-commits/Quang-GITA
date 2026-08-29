/**
 * Adaptive practice.
 *
 * Different from the exam surface on purpose: feedback is immediate, the
 * explanation is available the moment an answer is checked, and the engine
 * re-selects after every response so the next item sits at the learner's
 * updated ability. That loop — answer, see why, get a slightly harder item —
 * is what practice is for; a test deliberately withholds all of it.
 */

import React, { useCallback, useMemo, useState } from 'react';
import type { DomainId, Question, SectionId } from '../../types.ts';
import { BANK } from '../../data/bank.ts';
import { DOMAINS, domainLabel, sectionLabel, skillLabel } from '../../data/blueprint.ts';
import { selectPracticeItems } from '../../engine/adaptive.ts';
import { estimateAbility } from '../../engine/irt.ts';
import { useStore, selectExposure, makeAttempt } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Button, Card, Field, Ring, Segmented } from '../../components/ui/primitives.tsx';
import { AnswerArea, Explanation, StimulusView } from '../../components/ui/QuestionView.tsx';
import { IconCheck, IconLightning, IconX, IconBookmark } from '../../components/ui/icons.tsx';
import { MasteryBars } from '../../components/charts/charts.tsx';
import { formatClock, uid } from '../../lib/util.ts';

type Scope = 'both' | SectionId;
type Mode = 'adaptive' | 'weakness';

interface SessionState {
  id: string;
  questions: Question[];
  index: number;
  /** Responses recorded in this session, in order. */
  log: Array<{ question: Question; value: string | null; correct: boolean; seconds: number }>;
  startedAt: number;
  questionStartedAt: number;
  checked: boolean;
  value: string | null;
  eliminated: string[];
}

const LENGTHS = [10, 20, 30] as const;

export function PracticeSession(): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch, answerQuestion } = useStore();

  const [scope, setScope] = useState<Scope>('both');
  const [mode, setMode] = useState<Mode>('adaptive');
  const [length, setLength] = useState<number>(20);
  const [domains, setDomains] = useState<DomainId[]>([]);
  const [session, setSession] = useState<SessionState | null>(null);

  const exposure = useMemo(() => selectExposure(state), [state]);

  /** Ability the selector should target right now. */
  const currentTheta = useCallback(
    (activeScope: Scope): number => {
      if (activeScope === 'both') {
        return (state.sectionAbility.rw.theta + state.sectionAbility.math.theta) / 2;
      }
      return state.sectionAbility[activeScope].theta;
    },
    [state.sectionAbility],
  );

  const start = useCallback(() => {
    // In weakness mode, restrict to the skills with the least demonstrated
    // mastery, so the session is spent where it buys the most.
    let skills: string[] | undefined;
    if (mode === 'weakness') {
      const entries = Object.entries(state.ability)
        .filter(([, estimate]) => estimate.n >= 2)
        .sort((a, b) => a[1].theta - b[1].theta)
        .slice(0, 6)
        .map(([skill]) => skill);
      if (entries.length > 0) skills = entries;
    }

    const questions = selectPracticeItems({
      bank: BANK,
      theta: currentTheta(scope),
      count: length,
      section: scope,
      domains: domains.length > 0 ? domains : undefined,
      skills,
      exposure,
    });

    if (questions.length === 0) return;

    setSession({
      id: uid('ps'),
      questions,
      index: 0,
      log: [],
      startedAt: Date.now(),
      questionStartedAt: Date.now(),
      checked: false,
      value: null,
      eliminated: [],
    });
  }, [mode, scope, length, domains, exposure, currentTheta, state.ability]);

  /* ---------------- Setup screen ---------------- */

  if (!session) {
    const availableDomains = DOMAINS.filter((d) => scope === 'both' || d.section === scope);

    return (
      <div className="page stack gap-6">
        <header className="page-head">
          <h1 className="page-title">{t('practice.title')}</h1>
          <p className="page-sub">{t('practice.subtitle')}</p>
        </header>

        <Card>
          <div className="stack gap-6">
            <Field label={t('practice.scope')}>
              {() => (
                <Segmented
                  ariaLabel={t('practice.scope')}
                  value={scope}
                  onChange={(next) => {
                    setScope(next);
                    setDomains([]);
                  }}
                  options={[
                    { value: 'both', label: t('common.all') },
                    { value: 'rw', label: sectionLabel('rw', locale) },
                    { value: 'math', label: sectionLabel('math', locale) },
                  ]}
                />
              )}
            </Field>

            <Field label={t('practice.mode')}>
              {() => (
                <Segmented<Mode>
                  ariaLabel={t('practice.mode')}
                  value={mode}
                  onChange={setMode}
                  options={[
                    { value: 'adaptive', label: t('practice.mode.adaptive') },
                    { value: 'weakness', label: t('practice.mode.weakness') },
                  ]}
                />
              )}
            </Field>

            <Field label={t('practice.length')}>
              {() => (
                <Segmented
                  ariaLabel={t('practice.length')}
                  value={String(length)}
                  onChange={(next) => setLength(Number(next))}
                  options={LENGTHS.map((n) => ({ value: String(n), label: `${n}` }))}
                />
              )}
            </Field>

            <div className="field">
              <span className="label">{locale === 'vi' ? 'Lĩnh vực (tuỳ chọn)' : 'Domains (optional)'}</span>
              <div className="row gap-2 wrap">
                {availableDomains.map((domain) => {
                  const on = domains.includes(domain.id);
                  return (
                    <button
                      key={domain.id}
                      type="button"
                      className={on ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                      aria-pressed={on}
                      onClick={() =>
                        setDomains((current) =>
                          on ? current.filter((id) => id !== domain.id) : [...current, domain.id],
                        )
                      }
                    >
                      {domainLabel(domain.id, locale)}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button variant="primary" size="lg" onClick={start} style={{ alignSelf: 'flex-start' }}>
              <IconLightning size={17} />
              {t('practice.startSession')}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  /* ---------------- Summary ---------------- */

  if (session.index >= session.questions.length) {
    return <SessionSummary session={session} onRestart={() => setSession(null)} />;
  }

  /* ---------------- Active question ---------------- */

  const question = session.questions[session.index];
  const elapsed = Math.round((Date.now() - session.startedAt) / 1000);
  const correctSoFar = session.log.filter((entry) => entry.correct).length;

  const check = () => {
    const seconds = (Date.now() - session.questionStartedAt) / 1000;

    // Practice sessions live outside the attempt log, so a lightweight attempt
    // record carries the response into the same store the analytics read.
    let attemptId = session.id;
    if (session.log.length === 0) {
      const attempt = makeAttempt({
        mode: 'practice',
        form: { id: `practice_${session.id}`, label: 'Practice', createdAt: Date.now(), modules: [], breakSeconds: 0 },
        label: locale === 'vi' ? 'Phiên luyện tập' : 'Practice session',
        moduleIds: [],
        timeMultiplier: 1,
      });
      attempt.id = session.id;
      attempt.status = 'submitted';
      attempt.submittedAt = Date.now();
      dispatch({ type: 'attempt/start', attempt });
      attemptId = attempt.id;
    }

    const correct = answerQuestion({
      attemptId,
      question,
      value: session.value,
      msSpent: Math.round(seconds * 1000),
      updateAbility: true,
    });

    setSession({
      ...session,
      checked: true,
      log: [...session.log, { question, value: session.value, correct, seconds }],
    });
  };

  const next = () => {
    dispatch({ type: 'activity/log', seconds: Math.round((Date.now() - session.questionStartedAt) / 1000) });
    setSession({
      ...session,
      index: session.index + 1,
      checked: false,
      value: null,
      eliminated: [],
      questionStartedAt: Date.now(),
    });
  };

  const bookmarked = state.bookmarks.includes(question.id);

  return (
    <div className="page stack gap-5">
      <div className="between wrap gap-4">
        <div className="row gap-3 wrap">
          <Badge tone={question.section === 'rw' ? 'rw' : 'math'}>
            {sectionLabel(question.section, locale)}
          </Badge>
          <Badge>{skillLabel(question.skill, locale)}</Badge>
          <Badge tone={question.band === 'hard' ? 'danger' : question.band === 'medium' ? 'warning' : 'success'}>
            {question.band}
          </Badge>
        </div>
        <div className="row gap-4">
          <span className="text-sm muted mono">{formatClock(elapsed)}</span>
          <span className="text-sm semibold">
            {session.index + 1}/{session.questions.length} · {correctSoFar} {t('common.correct').toLowerCase()}
          </span>
          <Button variant="ghost" size="sm" onClick={() => setSession(null)}>
            <IconX size={15} />
          </Button>
        </div>
      </div>

      <div className="bar">
        <i style={{ width: `${(session.index / session.questions.length) * 100}%` }} />
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: question.stimulus ? 'minmax(0, 1fr) minmax(0, 1fr)' : 'minmax(0, 760px)', gap: 'var(--space-8)' }}
      >
        {question.stimulus && (
          <Card>
            <StimulusView stimulus={question.stimulus} questionId={question.id} />
          </Card>
        )}

        <div className="stack gap-5">
          <p className="q-prompt">{question.prompt}</p>

          <AnswerArea
            question={question}
            value={session.value}
            onChange={(value) => !session.checked && setSession({ ...session, value })}
            eliminated={session.eliminated}
            eliminatorEnabled={!session.checked && question.format === 'mcq'}
            onToggleEliminate={(choiceId) =>
              setSession({
                ...session,
                eliminated: session.eliminated.includes(choiceId)
                  ? session.eliminated.filter((id) => id !== choiceId)
                  : [...session.eliminated, choiceId],
              })
            }
            revealed={session.checked}
            disabled={session.checked}
          />

          <div className="row gap-3 wrap">
            {!session.checked ? (
              <Button variant="primary" onClick={check} disabled={session.value === null}>
                {t('practice.checkAnswer')}
              </Button>
            ) : (
              <Button variant="primary" onClick={next}>
                {session.index === session.questions.length - 1 ? t('common.finish') : t('practice.nextQuestion')}
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => dispatch({ type: 'bookmark/toggle', questionId: question.id })}
              aria-pressed={bookmarked}
            >
              <IconBookmark size={15} />
              {bookmarked ? (locale === 'vi' ? 'Đã lưu' : 'Saved') : t('practice.addToReview')}
            </Button>
          </div>

          {session.checked && (
            <div className="review-item">
              <div
                className="row gap-3"
                style={{
                  padding: 'var(--space-4)',
                  color: session.log[session.log.length - 1]?.correct ? 'var(--success)' : 'var(--danger)',
                  fontWeight: 'var(--weight-semibold)',
                }}
              >
                {session.log[session.log.length - 1]?.correct ? <IconCheck size={18} /> : <IconX size={18} />}
                {session.log[session.log.length - 1]?.correct ? t('common.correct') : t('common.incorrect')}
              </div>
              <Explanation
                question={question}
                chosen={session.value}
                labels={{ explanation: t('practice.explanation'), whyWrong: t('practice.whyWrong') }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Session summary, at module scope so it is not re-created on every render of
 * the page that shows it.
 */
function SessionSummary({
  session,
  onRestart,
}: {
  session: SessionState;
  onRestart(): void;
}): React.ReactElement {
  const t = useT();
  const locale = useLocale();

  const correct = session.log.filter((entry) => entry.correct).length;
  const accuracy = session.log.length === 0 ? 0 : correct / session.log.length;
  const seconds = Math.round((Date.now() - session.startedAt) / 1000);

  const bySkill = new Map<string, { correct: number; total: number }>();
  for (const entry of session.log) {
    const bucket = bySkill.get(entry.question.skill) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    if (entry.correct) bucket.correct += 1;
    bySkill.set(entry.question.skill, bucket);
  }

  const { theta } = estimateAbility(
    session.log.map((entry) => ({ item: entry.question.irt, correct: entry.correct })),
  );

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">{t('practice.sessionComplete')}</h1>
      </header>

      <Card>
        <div className="ring-wrap wrap">
          <Ring
            value={accuracy}
            size={140}
            label={`${Math.round(accuracy * 100)}%`}
            sublabel={t('common.accuracy')}
            color={accuracy >= 0.75 ? 'var(--success)' : accuracy >= 0.5 ? 'var(--primary)' : 'var(--warning)'}
          />
          <div className="stack gap-3 grow">
            <div className="between">
              <span className="muted">{t('common.correct')}</span>
              <span className="semibold">{correct}/{session.log.length}</span>
            </div>
            <div className="between">
              <span className="muted">{locale === 'vi' ? 'Thời gian' : 'Time'}</span>
              <span className="semibold">{formatClock(seconds)}</span>
            </div>
            <div className="between">
              <span className="muted">{locale === 'vi' ? 'Trung bình mỗi câu' : 'Per question'}</span>
              <span className="semibold">
                {formatClock(session.log.length === 0 ? 0 : seconds / session.log.length)}
              </span>
            </div>
            <div className="between">
              <span className="muted">{locale === 'vi' ? 'Năng lực phiên này (θ)' : 'Session ability (θ)'}</span>
              <span className="semibold mono">{theta.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card>

      <Card title={locale === 'vi' ? 'Theo kỹ năng' : 'By skill'}>
        <MasteryBars
          rows={[...bySkill.entries()].map(([skill, bucket]) => ({
            label: skillLabel(skill, locale),
            value: bucket.correct / bucket.total,
            meta: `${bucket.correct}/${bucket.total}`,
          }))}
        />
      </Card>

      <div className="row gap-3">
        <Button variant="primary" onClick={onRestart}>
          {t('common.retry')}
        </Button>
      </div>
    </div>
  );
}
