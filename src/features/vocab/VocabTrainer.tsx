/**
 * Vocabulary trainer — SM-2 flashcards over the academic deck.
 */

import React, { useMemo, useState } from 'react';
import { own } from '../../lib/record.ts';
import { VOCABULARY, VOCAB_BY_ID } from '../../data/vocabulary.ts';
import { dueCards, newCard, GRADE_AGAIN, GRADE_EASY, GRADE_GOOD, GRADE_HARD, type Grade } from '../../engine/srs.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty, Ring } from '../../components/ui/primitives.tsx';
import { IconSparkle, IconX } from '../../components/ui/icons.tsx';

const NEW_PER_DAY = 8;

export function VocabTrainer(): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch } = useStore();
  const [queue, setQueue] = useState<string[] | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const due = useMemo(
    () => dueCards(state.srs).filter((card) => card.ref.startsWith('v:')),
    [state.srs],
  );

  const unseen = useMemo(
    () => VOCABULARY.filter((word) => !own(state.srs, `v:${word.id}`)).sort((a, b) => a.tier - b.tier),
    [state.srs],
  );

  const startDeck = () => {
    const refs = [
      ...due.map((card) => card.ref),
      ...unseen.slice(0, NEW_PER_DAY).map((word) => `v:${word.id}`),
    ];
    if (refs.length === 0) return;
    setQueue(refs);
    setIndex(0);
    setFlipped(false);
  };

  if (queue && index < queue.length) {
    const ref = queue[index];
    const word = VOCAB_BY_ID.get(ref.slice(2));
    if (!word) {
      setIndex(index + 1);
      return <div className="page" />;
    }

    const grade = (g: Grade) => {
      if (!own(state.srs, ref)) dispatch({ type: 'srs/upsert', card: newCard(ref) });
      dispatch({ type: 'srs/review', ref, grade: g });
      dispatch({ type: 'activity/log', seconds: 12 });
      setIndex(index + 1);
      setFlipped(false);
    };

    return (
      <div className="page stack gap-5" style={{ maxWidth: 720 }}>
        <div className="between">
          <span className="text-sm semibold">{index + 1}/{queue.length}</span>
          <Button variant="ghost" size="sm" onClick={() => setQueue(null)}><IconX size={15} /></Button>
        </div>

        <div className="bar">
          <i style={{ width: `${(index / queue.length) * 100}%` }} />
        </div>

        <div className="flashcard">
          <div className="stack gap-4 center" style={{ flexDirection: 'column' }}>
            <Badge tone={word.tier === 1 ? 'primary' : word.tier === 2 ? 'info' : 'default'}>
              Tier {word.tier}
            </Badge>
            <div className="word">{word.word}</div>
            <div className="text-sm muted">{word.pos}</div>

            {flipped ? (
              <div className="stack gap-4" style={{ marginTop: 'var(--space-4)' }}>
                <p className="text-lg">{word.definition}</p>
                <p className="secondary">{word.definitionVi}</p>
                <p className="text-sm muted" style={{ fontStyle: 'italic' }}>“{word.example}”</p>
                <div className="row gap-2 wrap center">
                  {word.synonyms.map((synonym) => (
                    <Badge key={synonym}>{synonym}</Badge>
                  ))}
                </div>
              </div>
            ) : (
              <Button variant="primary" onClick={() => setFlipped(true)} style={{ marginTop: 'var(--space-4)' }}>
                {t('vocab.showAnswer')}
              </Button>
            )}
          </div>
        </div>

        {flipped && (
          <div className="grade-row">
            <Button variant="danger" onClick={() => grade(GRADE_AGAIN)}>{t('review.grade.again')}</Button>
            <Button onClick={() => grade(GRADE_HARD)}>{t('review.grade.hard')}</Button>
            <Button onClick={() => grade(GRADE_GOOD)}>{t('review.grade.good')}</Button>
            <Button variant="primary" onClick={() => grade(GRADE_EASY)}>{t('review.grade.easy')}</Button>
          </div>
        )}
      </div>
    );
  }

  if (queue) {
    return (
      <div className="page">
        <Empty
          icon={<IconSparkle size={32} />}
          title={t('vocab.deckComplete')}
          action={<Button variant="primary" onClick={() => setQueue(null)}>{t('common.finish')}</Button>}
        />
      </div>
    );
  }

  const learned = VOCABULARY.length - unseen.length;

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">{t('vocab.title')}</h1>
        <p className="page-sub">{t('vocab.subtitle')}</p>
      </header>

      <Card>
        <div className="ring-wrap wrap">
          <Ring
            value={learned / VOCABULARY.length}
            size={140}
            label={`${learned}`}
            sublabel={`/ ${VOCABULARY.length}`}
          />
          <div className="stack gap-3 grow">
            <div className="between">
              <span className="muted">{t('vocab.reviewToday')}</span>
              <span className="semibold">{due.length}</span>
            </div>
            <div className="between">
              <span className="muted">{t('vocab.newToday')}</span>
              <span className="semibold">{Math.min(NEW_PER_DAY, unseen.length)}</span>
            </div>
            <Button
              variant="primary"
              onClick={startDeck}
              disabled={due.length === 0 && unseen.length === 0}
              style={{ alignSelf: 'flex-start' }}
            >
              {t('review.startReview')}
            </Button>
          </div>
        </div>
      </Card>

      <Card title={locale === 'vi' ? 'Toàn bộ bộ từ' : 'Full deck'}>
        <div className="scroll-x">
          <table className="table">
            <thead>
              <tr>
                <th>{locale === 'vi' ? 'Từ' : 'Word'}</th>
                <th>{locale === 'vi' ? 'Nghĩa' : 'Meaning'}</th>
                <th>Tier</th>
                <th>{locale === 'vi' ? 'Trạng thái' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {VOCABULARY.map((word) => {
                const card = own(state.srs, `v:${word.id}`);
                return (
                  <tr key={word.id}>
                    <td className="semibold">{word.word}</td>
                    <td className="secondary">{locale === 'vi' ? word.definitionVi : word.definition}</td>
                    <td>{word.tier}</td>
                    <td>
                      {!card ? (
                        <Badge>{locale === 'vi' ? 'Chưa học' : 'New'}</Badge>
                      ) : card.repetitions >= 3 ? (
                        <Badge tone="success">{t('review.mastered')}</Badge>
                      ) : (
                        <Badge tone="info">{locale === 'vi' ? 'Đang học' : 'Learning'}</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
