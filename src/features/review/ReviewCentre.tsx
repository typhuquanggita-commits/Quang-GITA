/**
 * Review centre.
 *
 * Missed questions become scheduled cards. Reviewing one means answering it
 * again and then grading your own recall, which is what drives the interval —
 * simply re-reading an explanation does not tell the scheduler anything.
 */

import React, { useMemo, useState } from 'react';
import { own } from '../../lib/record.ts';
import type { Question } from '../../types.ts';
import { QUESTION_BY_ID } from '../../data/bank.ts';
import { sectionLabel, skillLabel } from '../../data/blueprint.ts';
import { dueCards, isMastered, reviewForecast, upcomingCards, GRADE_AGAIN, GRADE_EASY, GRADE_GOOD, GRADE_HARD, type Grade } from '../../engine/srs.ts';
import { isCorrect } from '../../engine/scoring.ts';
import { selectMissedQuestions, useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty, Tabs } from '../../components/ui/primitives.tsx';
import { AnswerArea, Explanation, StimulusView } from '../../components/ui/QuestionView.tsx';
import { BarChart } from '../../components/charts/charts.tsx';
import { IconCheck, IconSparkle, IconX } from '../../components/ui/icons.tsx';
import { formatDate, isoDate } from '../../lib/util.ts';
import { recallProgress } from '../../engine/recall.ts';
import { RecallDeck } from './RecallDeck.tsx';
import type { Route } from '../shell/routes.ts';

type Tab = 'due' | 'upcoming' | 'mastered' | 'all' | 'recall';

export function ReviewCentre({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state } = useStore();
  const [tab, setTab] = useState<Tab>('due');
  const [reviewing, setReviewing] = useState<string[] | null>(null);

  const questionCards = useMemo(
    () =>
      Object.values(state.srs)
        .filter((card) => card.ref.startsWith('q:'))
        .map((card) => ({ card, question: QUESTION_BY_ID.get(card.ref.slice(2)) }))
        .filter((entry): entry is { card: typeof entry.card; question: Question } => Boolean(entry.question)),
    [state.srs],
  );

  const due = useMemo(
    () => dueCards(state.srs).filter((c) => c.ref.startsWith('q:')),
    [state.srs],
  );
  const upcoming = useMemo(
    () => upcomingCards(state.srs, 14).filter((c) => c.ref.startsWith('q:')),
    [state.srs],
  );
  const mastered = useMemo(() => questionCards.filter((e) => isMastered(e.card)), [questionCards]);
  const missed = useMemo(() => selectMissedQuestions(state), [state]);
  const forecast = useMemo(() => reviewForecast(state.srs, 14), [state.srs]);
  const recall = useMemo(() => recallProgress(state.srs), [state.srs]);

  if (reviewing) {
    return (
      <ReviewRunner
        refs={reviewing}
        onDone={() => setReviewing(null)}
      />
    );
  }

  const rows =
    tab === 'due'
      ? due.map((c) => ({ card: c, question: QUESTION_BY_ID.get(c.ref.slice(2)) }))
      : tab === 'upcoming'
        ? upcoming.map((c) => ({ card: c, question: QUESTION_BY_ID.get(c.ref.slice(2)) }))
        : tab === 'mastered'
          ? mastered
          : tab === 'all'
            ? missed.map((q) => ({ card: own(state.srs, `q:${q.id}`), question: q }))
            : /* recall: facts, not questions — the deck below builds its own rows */ [];

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{t('review.title')}</h1>
            <p className="page-sub">{t('review.subtitle')}</p>
          </div>
          {due.length > 0 && (
            <Button variant="primary" size="lg" onClick={() => setReviewing(due.map((c) => c.ref))}>
              {t('review.startReview')} ({due.length})
            </Button>
          )}
        </div>
      </header>

      <div className="kpi-grid">
        <Kpi label={t('review.due')} value={due.length} />
        <Kpi label={t('review.upcoming')} value={upcoming.length} />
        <Kpi label={t('review.mastered')} value={mastered.length} />
        <Kpi label={t('review.all')} value={missed.length} />
        <Kpi label={locale === 'vi' ? 'Kiến thức đến hạn' : 'Facts due'} value={recall.due} />
      </div>

      <Card title={locale === 'vi' ? 'Dự báo 14 ngày tới' : 'Next 14 days'}>
        <BarChart
          description={locale === 'vi' ? 'Số thẻ đến hạn mỗi ngày' : 'Cards due per day'}
          data={forecast.map((count, index) => ({
            label: index === 0 ? t('common.today') : `+${index}`,
            value: count,
          }))}
        />
      </Card>

      <Tabs<Tab>
        value={tab}
        onChange={setTab}
        ariaLabel="Review filters"
        tabs={[
          { id: 'due', label: `${t('review.due')} (${due.length})` },
          { id: 'upcoming', label: t('review.upcoming') },
          { id: 'mastered', label: t('review.mastered') },
          { id: 'all', label: t('review.all') },
          {
            id: 'recall',
            label: `${locale === 'vi' ? 'Kiến thức phải nhớ' : 'Must-know recall'}${recall.due > 0 ? ` (${recall.due})` : ''}`,
          },
        ]}
      />

      {tab === 'recall' ? (
        <RecallDeck navigate={navigate} />
      ) : rows.length === 0 ? (
        <Empty
          icon={<IconSparkle size={30} />}
          title={tab === 'due' ? t('review.nothingDue') : t('common.none')}
        />
      ) : (
        <div className="stack gap-3">
          {rows.map((row) =>
            row.question ? (
              <Card key={row.question.id}>
                <div className="between wrap gap-3">
                  <div style={{ minWidth: 0 }}>
                    <div className="row gap-2 wrap" style={{ marginBottom: 'var(--space-2)' }}>
                      <Badge tone={row.question.section === 'rw' ? 'rw' : 'math'}>
                        {sectionLabel(row.question.section, locale)}
                      </Badge>
                      <Badge>{skillLabel(row.question.skill, locale)}</Badge>
                      {row.card && (
                        <Badge tone={row.card.dueAt <= Date.now() ? 'danger' : 'info'}>
                          {formatDate(isoDate(new Date(row.card.dueAt)), locale)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm secondary" style={{ maxWidth: '70ch' }}>
                      {row.question.prompt}
                    </p>
                  </div>
                  <Button size="sm" onClick={() => setReviewing([`q:${row.question!.id}`])}>
                    {t('review.startReview')}
                  </Button>
                </div>
              </Card>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: number }): React.ReactElement {
  return (
    <div className="kpi">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
    </div>
  );
}

/**
 * The review runner holds its own position in the queue, so it must be a
 * module-scope component. Defined inside `ReviewCentre` it would be a new
 * component type on every render, and the `srs/review` dispatch that grading
 * performs would remount it and throw the learner back to the first card.
 */
function ReviewRunner({
  refs,
  onDone,
}: {
  refs: string[];
  onDone(): void;
}): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { dispatch } = useStore();
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const ref = refs[index];
  const question = ref ? QUESTION_BY_ID.get(ref.slice(2)) : undefined;

  if (!question) {
    return (
      <div className="page">
        <Empty
          icon={<IconCheck size={30} />}
          title={t('vocab.deckComplete')}
          action={<Button variant="primary" onClick={onDone}>{t('common.finish')}</Button>}
        />
      </div>
    );
  }

  const correct = value !== null && isCorrect(question, value);

  function grade(g: Grade) {
    dispatch({ type: 'srs/review', ref, grade: g });
    dispatch({ type: 'activity/log', seconds: 30 });
    if (index + 1 >= refs.length) {
      onDone();
      return;
    }
    setIndex(index + 1);
    setValue(null);
    setRevealed(false);
  }

  return (
    <div className="page stack gap-5">
      <div className="between wrap gap-3">
        <div className="row gap-2 wrap">
          <Badge tone={question.section === 'rw' ? 'rw' : 'math'}>{sectionLabel(question.section, locale)}</Badge>
          <Badge>{skillLabel(question.skill, locale)}</Badge>
        </div>
        <div className="row gap-3">
          <span className="text-sm semibold">{index + 1}/{refs.length}</span>
          <Button variant="ghost" size="sm" onClick={onDone}><IconX size={15} /></Button>
        </div>
      </div>

      <div className="bar">
        <i style={{ width: `${(index / refs.length) * 100}%` }} />
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: question.stimulus ? 'minmax(0,1fr) minmax(0,1fr)' : 'minmax(0, 760px)',
          gap: 'var(--space-8)',
        }}
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
            value={value}
            onChange={(next) => !revealed && setValue(next)}
            revealed={revealed}
            disabled={revealed}
          />

          {!revealed ? (
            <Button
              variant="primary"
              onClick={() => setRevealed(true)}
              disabled={value === null}
              style={{ alignSelf: 'flex-start' }}
            >
              {t('practice.checkAnswer')}
            </Button>
          ) : (
            <>
              <div className="row gap-2 semibold" style={{ color: correct ? 'var(--success)' : 'var(--danger)' }}>
                {correct ? <IconCheck size={18} /> : <IconX size={18} />}
                {correct ? t('common.correct') : t('common.incorrect')}
              </div>

              <div className="review-item">
                <Explanation
                  question={question}
                  chosen={value}
                  labels={{ explanation: t('practice.explanation'), whyWrong: t('practice.whyWrong') }}
                />
              </div>

              <div className="grade-row">
                <Button variant="danger" onClick={() => grade(GRADE_AGAIN)}>{t('review.grade.again')}</Button>
                <Button onClick={() => grade(GRADE_HARD)}>{t('review.grade.hard')}</Button>
                <Button onClick={() => grade(GRADE_GOOD)}>{t('review.grade.good')}</Button>
                <Button variant="primary" onClick={() => grade(GRADE_EASY)}>{t('review.grade.easy')}</Button>
              </div>
              <p className="hint">
                {locale === 'vi'
                  ? 'Tự đánh giá mức nhớ quyết định khi nào thẻ này quay lại.'
                  : 'Your own recall rating decides when this card returns.'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
