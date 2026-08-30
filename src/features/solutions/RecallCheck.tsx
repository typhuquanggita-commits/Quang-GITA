/**
 * The recall check that follows a test.
 *
 * A learner finishing a full-length sitting used to be handed a number, a
 * table of wrong answers, and a link to a lesson per skill. What they were not
 * given was the smallest and most actionable thing in the whole platform:
 * *which of the forty-six facts the exam expects you to have in your head were
 * standing behind the items you lost.*
 *
 * The engine behind this panel (`src/engine/recall.ts`) is careful about what
 * it will and will not claim, and this screen has to be equally careful in how
 * it says it. Three rules govern the wording:
 *
 * **It asks, it does not diagnose.** The heading is a question. Nothing here
 * says "you did not know this", because nothing in a response record can tell
 * a missing formula apart from a misread diagram.
 *
 * **The evidence is on the card.** Each fact names the item numbers that
 * raised it, so a learner who disagrees can go and look. A recommendation
 * whose basis is hidden is a recommendation nobody can argue with, and one
 * nobody can argue with is one nobody trusts.
 *
 * **The learner's own answer is what counts.** The three outcome buttons are
 * self-report, and they are the only thing that reaches the review schedule.
 * The platform never grades this on the learner's behalf.
 */

import React, { useMemo, useState } from 'react';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { skillLabel } from '../../data/blueprint.ts';
import type { ReviewRow } from '../../engine/attemptReview.ts';
import {
  gradeForOutcome,
  recallCheck,
  recallRef,
  type RecallCandidate,
  type RecallOutcome,
} from '../../engine/recall.ts';
import { Badge, Button, Card } from '../../components/ui/primitives.tsx';
import { IconAlert, IconCheck, IconClock } from '../../components/ui/icons.tsx';
import type { Locale } from '../../types.ts';

/** How many to put in front of a learner at once. */
const SHOWN = 6;

export function RecallCheck({ rows }: { rows: readonly ReviewRow[] }): React.ReactElement | null {
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state, dispatch } = useStore();
  const [expanded, setExpanded] = useState(false);

  const candidates = useMemo(() => recallCheck(rows), [rows]);

  // No qualifying evidence means no list. Not a short list, not a default set
  // of "commonly missed" facts — nothing. A learner whose section was clean is
  // told their section was clean.
  if (candidates.length === 0) return null;

  const shown = expanded ? candidates : candidates.slice(0, SHOWN);
  const seconds = candidates.reduce((n, c) => n + c.payback, 0);

  const record = (candidate: RecallCandidate, outcome: RecallOutcome) => {
    dispatch({
      type: 'srs/review',
      ref: recallRef(candidate.fact.id),
      grade: gradeForOutcome(outcome),
    });
  };

  return (
    <Card
      className="recall-check"
      title={vi ? 'Những câu bạn sai cần đến điều gì?' : 'What did the items you missed need?'}
      subtitle={
        vi
          ? `${candidates.length} kiến thức phải nhớ sẵn đã đứng phía sau các câu bạn mất điểm. Nếu cả ${candidates.length} đều tự động, một buổi thi trả lại cho bạn khoảng ${seconds} giây — đủ cho ${Math.max(1, Math.round(seconds / 75))} câu khó.`
          : `${candidates.length} facts the exam expects you to recall were standing behind the marks you lost. If all of them were automatic, a sitting would give you back about ${seconds} seconds — enough for ${Math.max(1, Math.round(seconds / 75))} hard ${seconds / 75 < 2 ? 'item' : 'items'}.`
      }
    >
      <div className="stack gap-4">
        <p className="text-sm secondary">
          {vi
            ? 'Đây là câu hỏi, không phải kết luận. Phần mềm không thể biết bạn sai vì không nhớ công thức hay vì đọc nhầm đề — chỉ bạn biết. Hãy tự kiểm tra từng mục: nhớ ngay thì bỏ qua.'
            : 'This is a question, not a verdict. Nothing in your answers can tell a formula you could not recall apart from a question you misread — only you know which it was. Sit each drill: if it comes back instantly, skip it.'}
        </p>

        <div className="stack gap-3">
          {shown.map((candidate) => (
            <RecallRow
              key={candidate.fact.id}
              candidate={candidate}
              locale={locale}
              tested={Boolean(state.srs[recallRef(candidate.fact.id)])}
              onRecord={record}
            />
          ))}
        </div>

        {candidates.length > SHOWN && (
          <Button variant="ghost" onClick={() => setExpanded((x) => !x)}>
            {expanded
              ? vi
                ? 'Thu gọn'
                : 'Show fewer'
              : vi
                ? `Xem tất cả ${candidates.length} mục`
                : `Show all ${candidates.length}`}
          </Button>
        )}
      </div>
    </Card>
  );
}

/*
 * Module scope, like every other card in this directory: nested inside the
 * panel, the `srs/review` dispatch that grading fires would remount the whole
 * list and close the drill the learner was halfway through.
 */
function RecallRow({
  candidate,
  locale,
  tested,
  onRecord,
}: {
  candidate: RecallCandidate;
  locale: Locale;
  tested: boolean;
  onRecord(candidate: RecallCandidate, outcome: RecallOutcome): void;
}): React.ReactElement {
  const vi = locale === 'vi';
  const [revealed, setRevealed] = useState(false);
  const [answered, setAnswered] = useState<RecallOutcome | null>(null);
  const { fact } = candidate;

  const answer = (outcome: RecallOutcome) => {
    setAnswered(outcome);
    onRecord(candidate, outcome);
  };

  return (
    <div className="recall-row">
      <div className="between wrap gap-3">
        <div className="row gap-2 wrap">
          <Badge tone="info">
            <IconClock size={12} /> {vi ? `${fact.cost}s mỗi lần` : `${fact.cost}s each time`}
          </Badge>
          <Badge>{skillLabel(candidate.evidence[0]!.skill, locale)}</Badge>
          {fact.given && (
            <Badge tone="warning">
              {vi ? 'Có trên tờ công thức' : 'On the reference sheet'}
            </Badge>
          )}
          {tested && !answered && (
            <Badge tone="success">
              <IconCheck size={12} /> {vi ? 'Đã trong lịch ôn' : 'In your review schedule'}
            </Badge>
          )}
        </div>
        <span className="muted text-xs">
          {vi ? `Trả lại ~${candidate.payback}s` : `~${candidate.payback}s back`}
        </span>
      </div>

      <p className="recall-rationale text-sm">
        <IconAlert size={13} /> {vi ? candidate.rationaleVi : candidate.rationale}
      </p>

      <div className="recall-drill">
        <p className="semibold text-sm">{vi ? fact.drill.promptVi : fact.drill.prompt}</p>

        {!revealed ? (
          <Button variant="secondary" size="sm" onClick={() => setRevealed(true)}>
            {vi ? 'Hiện đáp án' : 'Show the answer'}
          </Button>
        ) : (
          <div className="stack gap-3">
            <p className="text-sm">
              <strong>{fact.drill.answer}</strong>
            </p>
            <p className="text-sm secondary">{vi ? fact.factVi : fact.fact}</p>
            <p className="text-xs secondary">{vi ? fact.whyVi : fact.why}</p>

            {answered ? (
              <p className="text-sm" style={{ color: 'var(--success)' }}>
                <IconCheck size={14} />{' '}
                {answered === 'instant'
                  ? vi
                    ? 'Đã ghi nhận — sẽ quay lại sau một khoảng dài.'
                    : 'Recorded — it will come back after a long gap.'
                  : answered === 'slow'
                    ? vi
                      ? 'Đã ghi nhận — nhớ được nhưng chưa tự động, nên sẽ quay lại sớm.'
                      : 'Recorded — recalled but not automatic, so it comes back soon.'
                    : vi
                      ? 'Đã ghi nhận — vào lịch ôn từ hôm nay.'
                      : 'Recorded — it enters your review schedule today.'}
              </p>
            ) : (
              <div className="row gap-2 wrap no-print">
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}
