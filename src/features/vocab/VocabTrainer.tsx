/**
 * Vocabulary trainer — SM-2 flashcards over the academic deck.
 *
 * The back of a card carries more than a gloss, because a gloss is not what
 * the section tests. Where an entry has a second, academic meaning it is
 * shown *above* the everyday one and marked, since that is the sense the
 * passage will use and the sense the learner does not have. Where an entry
 * names a confusion it is shown last, in its own box, because being told what
 * a word is not is often what makes it stick.
 *
 * The deck browser is filtered rather than listed. Four hundred rows is a
 * reference table nobody reads; the filters turn it into the four study lists
 * a learner actually wants — the second meanings, the named traps, and the
 * register of whichever passage type is going worst.
 */

import React, { useMemo, useState } from 'react';
import { own } from '../../lib/record.ts';
import { VOCABULARY, VOCAB_BY_ID, vocabStats } from '../../data/vocabulary.ts';
import type { VocabWord } from '../../types.ts';
import { dueCards, newCard, GRADE_AGAIN, GRADE_EASY, GRADE_GOOD, GRADE_HARD, type Grade } from '../../engine/srs.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty, Ring, Segmented } from '../../components/ui/primitives.tsx';
import { IconAlert, IconSparkle, IconTarget, IconX } from '../../components/ui/icons.tsx';

const NEW_PER_DAY = 8;

type DeckFilter = 'all' | 'sense' | 'trap' | 'science' | 'history';

const FILTER_LABEL: Record<DeckFilter, { en: string; vi: string }> = {
  all: { en: 'All', vi: 'Tất cả' },
  sense: { en: 'Second meaning', vi: 'Nghĩa thứ hai' },
  trap: { en: 'Named traps', vi: 'Bẫy đã chỉ tên' },
  science: { en: 'Science register', vi: 'Mảng khoa học' },
  history: { en: 'History & society', vi: 'Mảng lịch sử – xã hội' },
};

function matchesFilter(word: VocabWord, filter: DeckFilter): boolean {
  switch (filter) {
    case 'sense': return Boolean(word.satSense);
    case 'trap': return Boolean(word.trap);
    case 'science': return word.register === 'science';
    case 'history': return word.register === 'history' || word.register === 'social-science';
    default: return true;
  }
}

/** The back of a flashcard, and the deck browser's expanded row. */
function WordDetail({ word, vi }: { word: VocabWord; vi: boolean }): React.ReactElement {
  return (
    <div className="stack gap-4">
      {/*
        The tested sense goes first when there is one. A learner who reads the
        everyday gloss and stops has learned the meaning that will mislead them.
      */}
      {word.satSense && (
        <div className="vocab-sense">
          <span className="vocab-sense-tag">
            <IconTarget size={13} /> {vi ? 'Nghĩa dùng trong đề' : 'The sense the test uses'}
          </span>
          <p className="text-lg">{word.satSense.gloss}</p>
          <p className="secondary">{word.satSense.glossVi}</p>
          <p className="text-sm muted vocab-example">“{word.satSense.example}”</p>
        </div>
      )}

      <div className="stack gap-2">
        {word.satSense && (
          <span className="vocab-heading">{vi ? 'Nghĩa thường ngày' : 'The everyday sense'}</span>
        )}
        <p className="text-lg">{word.definition}</p>
        <p className="secondary">{word.definitionVi}</p>
        <p className="text-sm muted vocab-example">“{word.example}”</p>
      </div>

      {word.collocations && word.collocations.length > 0 && (
        <div className="stack gap-2">
          <span className="vocab-heading">{vi ? 'Từ hay đi cùng' : 'The company it keeps'}</span>
          <div className="row gap-2 wrap">
            {word.collocations.map((phrase) => (
              <code key={phrase} className="vocab-collocation">{phrase}</code>
            ))}
          </div>
        </div>
      )}

      <div className="row gap-2 wrap">
        {word.synonyms.map((synonym) => (
          <Badge key={synonym}>{synonym}</Badge>
        ))}
      </div>

      {word.trap && word.trapVi && (
        <div className="vocab-trap">
          <IconAlert size={16} />
          <div>
            <strong>{vi ? 'Chỗ dễ nhầm' : 'Where this goes wrong'}</strong>
            <p>{vi ? word.trapVi : word.trap}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function VocabTrainer(): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch } = useStore();
  const [queue, setQueue] = useState<string[] | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState<DeckFilter>('all');
  const [openWord, setOpenWord] = useState<string | null>(null);

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
            {word.satSense && !flipped && (
              <span className="vocab-sense-hint">
                {locale === 'vi'
                  ? 'Từ này có một nghĩa thứ hai — nghĩ ra nghĩa đó trước khi lật'
                  : 'This word has a second meaning — reach for it before you flip'}
              </span>
            )}

            {flipped ? (
              <div className="vocab-back" style={{ marginTop: 'var(--space-4)' }}>
                <WordDetail word={word} vi={locale === 'vi'} />
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
  const stats = useMemo(() => vocabStats(), []);
  const shown = useMemo(() => VOCABULARY.filter((word) => matchesFilter(word, filter)), [filter]);

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

      <Card
        title={locale === 'vi' ? 'Bộ từ gồm những gì' : 'What the deck holds'}
        subtitle={
          locale === 'vi'
            ? 'Một danh sách từ dịch nghĩa không dạy được phần mà đề thật sự hỏi. Ba con số dưới đây là phần làm nên khác biệt.'
            : 'A translated word list does not teach what the section actually asks. The three figures below are the part that does.'
        }
      >
        <div className="row gap-4 wrap vocab-stats">
          <div className="vocab-stat">
            <strong>{stats.total}</strong>
            <span>{locale === 'vi' ? 'từ trong bộ' : 'words in the deck'}</span>
          </div>
          <div className="vocab-stat">
            <strong>{stats.withSecondSense}</strong>
            <span>
              {locale === 'vi'
                ? 'từ quen nhưng mang nghĩa thứ hai — bẫy thật của Digital SAT'
                : 'familiar words carrying a second meaning — the real Digital SAT trap'}
            </span>
          </div>
          <div className="vocab-stat">
            <strong>{stats.withTrap}</strong>
            <span>
              {locale === 'vi'
                ? 'từ có ghi rõ chỗ dễ nhầm với từ gần nghĩa'
                : 'entries naming the near-synonym they get confused with'}
            </span>
          </div>
        </div>
      </Card>

      <Card
        title={locale === 'vi' ? 'Tra bộ từ' : 'Browse the deck'}
        subtitle={
          locale === 'vi'
            ? `${shown.length} từ đang hiện. Bấm vào một từ để xem đầy đủ.`
            : `${shown.length} words shown. Select one to open it in full.`
        }
        action={
          <Segmented
            value={filter}
            onChange={(next: DeckFilter) => setFilter(next)}
            ariaLabel={locale === 'vi' ? 'Lọc bộ từ' : 'Filter the deck'}
            options={(['all', 'sense', 'trap', 'science', 'history'] as DeckFilter[]).map((key) => ({
              value: key,
              label: locale === 'vi' ? FILTER_LABEL[key].vi : FILTER_LABEL[key].en,
            }))}
          />
        }
      >
        {shown.length === 0 ? (
          <Empty
            icon={<IconSparkle size={28} />}
            title={locale === 'vi' ? 'Không có từ nào trong nhóm này' : 'No words in this group'}
          />
        ) : (
          <ul className="vocab-list">
            {shown.map((word) => {
              const card = own(state.srs, `v:${word.id}`);
              const open = openWord === word.id;
              return (
                <li key={word.id} className="vocab-row" data-open={open || undefined}>
                  <button
                    type="button"
                    className="vocab-row-head"
                    aria-expanded={open}
                    onClick={() => setOpenWord(open ? null : word.id)}
                  >
                    <span className="vocab-row-word">{word.word}</span>
                    <span className="text-xs muted">{word.pos}</span>
                    <span className="vocab-row-gloss secondary">
                      {locale === 'vi' ? word.definitionVi : word.definition}
                    </span>
                    <span className="row gap-2 wrap">
                      {word.satSense && (
                        <Badge tone="warning">{locale === 'vi' ? 'Nghĩa 2' : '2nd sense'}</Badge>
                      )}
                      <Badge tone={word.tier === 1 ? 'primary' : word.tier === 2 ? 'info' : 'default'}>
                        Tier {word.tier}
                      </Badge>
                      {!card ? (
                        <Badge>{locale === 'vi' ? 'Chưa học' : 'New'}</Badge>
                      ) : card.repetitions >= 3 ? (
                        <Badge tone="success">{t('review.mastered')}</Badge>
                      ) : (
                        <Badge tone="info">{locale === 'vi' ? 'Đang học' : 'Learning'}</Badge>
                      )}
                    </span>
                  </button>
                  {open && (
                    <div className="vocab-row-body">
                      <WordDetail word={word} vi={locale === 'vi'} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
