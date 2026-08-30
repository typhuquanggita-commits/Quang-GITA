/**
 * The must-know facts a learner has actually put into their review schedule.
 *
 * The forty-six facts in `src/data/mustKnow.ts` were a library: readable,
 * well argued, and inert. Reading that the discriminant tells you the number
 * of real roots is not the same as having it, and the platform had no way to
 * tell the two apart — so it could not schedule anything, could not report
 * anything, and could not notice a fact slipping.
 *
 * A fact arrives here one way only: the learner sat its drill after a test,
 * on the recall-check panel, and said what happened. Nothing is added on the
 * learner's behalf, and a fact nobody has sat simply is not in the deck. That
 * is why the empty state points at the last attempt rather than offering to
 * fill the deck with everything.
 */

import React, { useMemo, useState } from 'react';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { MUST_KNOW } from '../../data/mustKnow.ts';
import { dueCards } from '../../engine/srs.ts';
import {
  factIdFromRef,
  gradeForOutcome,
  recallProgress,
  type RecallOutcome,
} from '../../engine/recall.ts';
import { Badge, Button, Card, Empty } from '../../components/ui/primitives.tsx';
import { IconCheck, IconClock, IconSparkle } from '../../components/ui/icons.tsx';
import { formatDate, isoDate } from '../../lib/util.ts';
import type { Locale } from '../../types.ts';
import type { Route } from '../shell/routes.ts';

const FACT_BY_ID = new Map(MUST_KNOW.map((f) => [f.id, f]));

export function RecallDeck({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state } = useStore();

  const progress = useMemo(() => recallProgress(state.srs), [state.srs]);
  const due = useMemo(
    () =>
      dueCards(state.srs)
        .map((card) => ({ card, fact: FACT_BY_ID.get(factIdFromRef(card.ref) ?? '') }))
        .filter((row): row is { card: (typeof row)['card']; fact: NonNullable<(typeof row)['fact']> } =>
          Boolean(row.fact),
        ),
    [state.srs],
  );

  const scheduled = useMemo(
    () =>
      Object.values(state.srs)
        .map((card) => ({ card, fact: FACT_BY_ID.get(factIdFromRef(card.ref) ?? '') }))
        .filter((row): row is { card: (typeof row)['card']; fact: NonNullable<(typeof row)['fact']> } =>
          Boolean(row.fact),
        )
        .sort((a, b) => a.card.dueAt - b.card.dueAt),
    [state.srs],
  );

  if (scheduled.length === 0) {
    return (
      <Empty
        level={2}
        icon={<IconSparkle size={30} />}
        title={vi ? 'Chưa có kiến thức nào trong lịch ôn' : 'Nothing scheduled yet'}
        body={
          vi
            ? `${MUST_KNOW.length} kiến thức phải nhớ sẵn nằm trong thư viện, nhưng chưa có mục nào vào lịch ôn — vì nền tảng không tự quyết định thay bạn. Sau mỗi bài thi, bảng "những câu bạn sai cần đến điều gì" sẽ hỏi từng mục, và câu trả lời của bạn là thứ duy nhất đi vào lịch này.`
            : `${MUST_KNOW.length} must-know facts sit in the library, and none of them are scheduled — because the platform will not decide on your behalf which ones you hold. After a test, the recall check asks you about the facts your missed items needed, and your own answer is the only thing that reaches this schedule.`
        }
        action={
          <Button variant="primary" onClick={() => navigate({ name: 'must-know' })}>
            {vi ? 'Xem thư viện kiến thức' : 'Open the must-know library'}
          </Button>
        }
      />
    );
  }

  return (
    <div className="stack gap-4">
      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Đến hạn' : 'Due'}</div>
          <div className="kpi-value">{progress.due}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Đang giữ được' : 'Holding'}</div>
          <div className="kpi-value">{progress.holding}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Đã tự kiểm tra' : 'Self-tested'}</div>
          <div className="kpi-value">
            {progress.tested}
            <span className="muted text-sm">/{progress.total}</span>
          </div>
          <div className="kpi-foot">
            {vi
              ? 'Phần còn lại chưa được kiểm tra — không phải là đã thuộc'
              : 'The rest are untested, which is not the same as known'}
          </div>
        </div>
      </div>

      <div className="stack gap-3">
        {(due.length > 0 ? due : scheduled).map((row) => (
          <RecallCard
            key={row.fact.id}
            fact={row.fact}
            dueAt={row.card.dueAt}
            locale={locale}
            isDue={row.card.dueAt <= Date.now()}
          />
        ))}
      </div>
    </div>
  );
}

/*
 * Module scope: grading dispatches into the store, and a card defined inside
 * the deck would be remounted by its own dispatch, closing itself mid-answer.
 */
function RecallCard({
  fact,
  dueAt,
  locale,
  isDue,
}: {
  fact: (typeof MUST_KNOW)[number];
  dueAt: number;
  locale: Locale;
  isDue: boolean;
}): React.ReactElement {
  const vi = locale === 'vi';
  const { dispatch } = useStore();
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const answer = (outcome: RecallOutcome) => {
    dispatch({ type: 'srs/review', ref: `mk:${fact.id}`, grade: gradeForOutcome(outcome) });
    dispatch({ type: 'activity/log', seconds: 20 });
    setDone(true);
  };

  return (
    <Card level={3}>
      <div className="stack gap-3">
        <div className="between wrap gap-3">
          <div className="row gap-2 wrap">
            <Badge tone={isDue ? 'danger' : 'info'}>
              {formatDate(isoDate(new Date(dueAt)), locale)}
            </Badge>
            <Badge tone="info">
              <IconClock size={12} /> {vi ? `${fact.cost}s mỗi lần` : `${fact.cost}s each time`}
            </Badge>
          </div>
        </div>

        <p className="semibold">{vi ? fact.drill.promptVi : fact.drill.prompt}</p>

        {done ? (
          <p className="text-sm" style={{ color: 'var(--success)' }}>
            <IconCheck size={14} /> {vi ? 'Đã ghi nhận.' : 'Recorded.'}
          </p>
        ) : !revealed ? (
          <Button variant="secondary" size="sm" onClick={() => setRevealed(true)} style={{ alignSelf: 'flex-start' }}>
            {vi ? 'Hiện đáp án' : 'Show the answer'}
          </Button>
        ) : (
          <div className="stack gap-3">
            <p className="text-sm"><strong>{fact.drill.answer}</strong></p>
            <p className="text-sm secondary">{vi ? fact.factVi : fact.fact}</p>
            <div className="row gap-2 wrap">
              <Button size="sm" variant="danger" onClick={() => answer('missed')}>
                {vi ? 'Không nhớ ra' : 'Could not recall it'}
              </Button>
              <Button size="sm" onClick={() => answer('slow')}>
                {vi ? 'Nhớ nhưng phải nghĩ' : 'Recalled, but had to think'}
              </Button>
              <Button size="sm" variant="primary" onClick={() => answer('instant')}>
                {vi ? 'Nhớ ngay lập tức' : 'Instant'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
