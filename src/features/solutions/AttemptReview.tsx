/**
 * The worked solutions for a finished attempt.
 *
 * Every item in the bank has always carried an explanation and a note on each
 * distractor saying what error produces it. After a full-length test none of
 * that was reachable: the platform scored two hours of work and then showed a
 * number. A learner who wanted to know what they had actually got wrong had
 * nowhere to go.
 *
 * Three decisions shape this screen.
 *
 * **Delivery order, not sorted order.** Questions appear as they were faced,
 * so a learner can see where in the module their pacing broke down. Sorting by
 * skill or by correctness destroys exactly that.
 *
 * **The stimulus is shown again.** A solution to a passage question read
 * without the passage is a claim, not an explanation.
 *
 * **Every item links to its lesson.** "You got Transitions wrong" is a
 * diagnosis with no treatment attached. The related knowledge is one click
 * away, which is the whole point of having written the lessons.
 */

import React, { useMemo, useState } from 'react';
import { QUESTION_BY_ID } from '../../data/bank.ts';
import { skillLabel, domainLabel, sectionLabel } from '../../data/blueprint.ts';
import { lessonFor } from '../../data/lesson-index.ts';
import {
  buildReview,
  summariseReview,
  type ReviewRow,
  type Verdict,
} from '../../engine/attemptReview.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale, useT } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty, Segmented } from '../../components/ui/primitives.tsx';
import { AnswerArea, Explanation, StimulusView } from '../../components/ui/QuestionView.tsx';
import { IconAlert, IconBook, IconCheck, IconClock, IconFlagFilled, IconX } from '../../components/ui/icons.tsx';
import { formatClock } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';

type Filter = 'all' | 'wrong' | 'flagged' | 'pace';

export function AttemptReview({
  attemptId,
  navigate,
}: {
  attemptId: string;
  navigate(route: Route): void;
}): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state } = useStore();
  const [filter, setFilter] = useState<Filter>('all');

  const attempt = state.attempts.find((a) => a.id === attemptId);
  const form = attempt ? state.forms.find((f) => f.id === attempt.formId) : undefined;

  const rows = useMemo(() => {
    if (!attempt || !form) return [];
    return buildReview(attempt, new Map(form.modules.map((m) => [m.id, m])), QUESTION_BY_ID);
  }, [attempt, form]);

  if (!attempt || !form || rows.length === 0) {
    return (
      <div className="page">
        <Empty
          title={vi ? 'Không tìm thấy bài làm' : 'No such attempt'}
          action={<Button onClick={() => navigate({ name: 'tests' })}>{t('nav.tests')}</Button>}
        />
      </div>
    );
  }

  const summary = summariseReview(rows);
  const shown = rows.filter((row) => {
    switch (filter) {
      case 'wrong':
        return row.verdict !== 'correct';
      case 'flagged':
        return row.flagged;
      case 'pace':
        return row.pace !== 'on-pace';
      default:
        return true;
    }
  });

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <Button variant="ghost" onClick={() => navigate({ name: 'result', attemptId })}>
          ← {vi ? 'Bảng điểm' : 'Score report'}
        </Button>
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{vi ? 'Đáp án và phân tích' : 'Answers and analysis'}</h1>
            <p className="page-sub">{attempt.label}</p>
          </div>
          <Button onClick={() => navigate({ name: 'attempt-analysis', attemptId })}>
            {vi ? 'Bảng phân tích chi tiết' : 'Detailed analysis'}
          </Button>
        </div>
      </header>

      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Đúng' : 'Correct'}</div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>
            {summary.correct}/{summary.scored}
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Sai' : 'Incorrect'}</div>
          <div className="kpi-value" style={{ color: 'var(--danger)' }}>{summary.incorrect}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Bỏ trống' : 'Omitted'}</div>
          <div className="kpi-value">{summary.omitted}</div>
          <div className="kpi-foot">
            {vi ? 'Bỏ trống luôn tính là sai' : 'An omission always scores as wrong'}
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Nhịp độ lệch' : 'Off pace'}</div>
          <div className="kpi-value">{summary.rushed + summary.slow}</div>
          <div className="kpi-foot">
            {vi
              ? `${summary.rushed} vội · ${summary.slow} quá lâu`
              : `${summary.rushed} rushed · ${summary.slow} slow`}
          </div>
        </div>
      </div>

      <div className="between wrap gap-4">
        <Segmented<Filter>
          ariaLabel={vi ? 'Lọc câu hỏi' : 'Filter questions'}
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: `${vi ? 'Tất cả' : 'All'} (${rows.length})` },
            { value: 'wrong', label: `${vi ? 'Sai' : 'Wrong'} (${summary.incorrect + summary.omitted})` },
            { value: 'flagged', label: `${vi ? 'Đã đánh dấu' : 'Flagged'} (${summary.flagged})` },
            { value: 'pace', label: `${vi ? 'Lệch nhịp' : 'Off pace'} (${summary.rushed + summary.slow})` },
          ]}
        />
        <span className="muted text-sm">
          {vi ? 'Theo đúng thứ tự đã làm bài' : 'In the order they were delivered'}
        </span>
      </div>

      {shown.length === 0 ? (
        <Empty
          icon={<IconCheck size={30} />}
          title={vi ? 'Không có câu nào trong nhóm này' : 'Nothing in this group'}
        />
      ) : (
        <div className="stack gap-5">
          {shown.map((row) => (
            <SolutionCard key={row.question.id} row={row} navigate={navigate} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* One solution                                                        */
/*                                                                     */
/* Module scope. Nested, every filter change would remount all ninety-  */
/* eight of these and scroll the learner back to the top.               */
/* ------------------------------------------------------------------ */

const VERDICT_TONE: Record<Verdict, 'success' | 'danger' | 'warning'> = {
  correct: 'success',
  incorrect: 'danger',
  omitted: 'warning',
};

function SolutionCard({
  row,
  navigate,
  locale,
}: {
  row: ReviewRow;
  navigate(route: Route): void;
  locale: 'vi' | 'en';
}): React.ReactElement {
  const t = useT();
  const vi = locale === 'vi';
  const { question } = row;
  const lesson = lessonFor(question.skill);

  const verdictText =
    row.verdict === 'correct'
      ? vi
        ? 'Đúng'
        : 'Correct'
      : row.verdict === 'omitted'
        ? vi
          ? 'Bỏ trống'
          : 'Omitted'
        : vi
          ? 'Sai'
          : 'Incorrect';

  const paceText =
    row.pace === 'rushed'
      ? vi
        ? 'Quá vội'
        : 'Rushed'
      : row.pace === 'slow'
        ? vi
          ? 'Quá lâu'
          : 'Slow'
        : vi
          ? 'Đúng nhịp'
          : 'On pace';

  return (
    <Card
      className="solution-card"
      title={
        <span className="row gap-3 wrap">
          <span className="solution-number">{row.number}</span>
          <span>{skillLabel(question.skill, locale)}</span>
        </span>
      }
      subtitle={`${sectionLabel(question.section, locale)} · ${domainLabel(question.domain, locale)} · ${question.band}`}
      action={
        <span className="row gap-2 wrap">
          {row.flagged && (
            <Badge tone="warning">
              <IconFlagFilled size={12} /> {vi ? 'Đã đánh dấu' : 'Flagged'}
            </Badge>
          )}
          {row.pretest && <Badge>{vi ? 'Câu thử nghiệm, không tính điểm' : 'Field-test, unscored'}</Badge>}
          <Badge tone={VERDICT_TONE[row.verdict]}>
            {row.verdict === 'correct' ? <IconCheck size={12} /> : <IconX size={12} />} {verdictText}
          </Badge>
        </span>
      }
    >
      <div className="stack gap-4">
        {question.stimulus && <StimulusView stimulus={question.stimulus} questionId={question.id} />}

        <p className="solution-prompt">{question.prompt}</p>

        {/*
          Revealed, disabled: the key is marked and the learner's wrong pick is
          marked beside it. Showing only the key would leave them to remember
          what they chose, which after two hours nobody does.
        */}
        <AnswerArea
          question={question}
          value={row.given}
          onChange={() => undefined}
          revealed
          disabled
        />

        <div className="solution-facts">
          <span>
            <IconClock size={14} /> {formatClock(row.seconds)}{' '}
            <span className="muted">
              {vi ? `(mốc ${formatClock(row.targetSeconds)})` : `(target ${formatClock(row.targetSeconds)})`}
            </span>
          </span>
          <span className={row.pace === 'on-pace' ? 'muted' : undefined}>{paceText}</span>
          {row.visits > 1 && (
            <span className="muted">
              {vi ? `Quay lại ${row.visits} lần` : `Revisited ${row.visits} times`}
            </span>
          )}
          {row.error && <ErrorNote error={row.error} locale={locale} />}
        </div>

        <Explanation
          question={question}
          chosen={row.given}
          labels={{ explanation: t('practice.explanation'), whyWrong: t('practice.whyWrong') }}
        />

        {lesson && (
          <div className="solution-lesson">
            <div>
              <strong>{vi ? 'Kiến thức liên quan' : 'The related knowledge'}</strong>
              <p className="text-sm">{vi ? lesson.ideaVi : lesson.idea}</p>
            </div>
            <Button
              variant="secondary"
              onClick={() => navigate({ name: 'lesson', skill: question.skill })}
            >
              <IconBook size={16} /> {vi ? lesson.titleVi : lesson.title}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

/**
 * What kind of mistake this was.
 *
 * Named because the four kinds call for genuinely different responses, and a
 * learner told only "wrong" will default to assuming they did not know the
 * material — which for a careless slip is both false and demoralising.
 */
function ErrorNote({
  error,
  locale,
}: {
  error: 'concept' | 'careless' | 'timeout' | 'omitted';
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';
  const text: Record<typeof error, { vi: string; en: string }> = {
    concept: { vi: 'Lỗi kiến thức', en: 'Concept error' },
    careless: { vi: 'Lỗi ẩu — em biết dạng này', en: 'Careless — you know this type' },
    timeout: { vi: 'Không đủ thời gian', en: 'Ran out of time' },
    omitted: { vi: 'Bỏ trống', en: 'Left blank' },
  };
  return (
    <span style={{ color: error === 'careless' ? 'var(--warning)' : 'var(--danger)' }}>
      <IconAlert size={14} /> {vi ? text[error].vi : text[error].en}
    </span>
  );
}
