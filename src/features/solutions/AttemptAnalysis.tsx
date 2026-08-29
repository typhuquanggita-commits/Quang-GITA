/**
 * The detailed analysis table for one attempt.
 *
 * The solutions screen answers "what happened on this question". This one
 * answers the question a learner cannot see from ninety-eight cards: where the
 * marks actually went. Three roll-ups, each of which points at a different
 * next step.
 *
 * **By skill.** Sorted weakest first, with the error that accounts for most of
 * that skill's mistakes. Mastery rather than percent correct, because getting
 * easy items right is not mastery and percent-correct cannot tell.
 *
 * **By difficulty band.** Missing only hard items is a ceiling; missing easy
 * ones is a leak. They call for opposite responses, and a single accuracy
 * figure hides which one you have.
 *
 * **Question by question.** The full record, exportable, because a coach
 * reading a learner's attempt needs the rows and not a summary of them.
 */

import React, { useMemo, useState } from 'react';
import { QUESTION_BY_ID } from '../../data/bank.ts';
import { domainLabel, sectionLabel, skillLabel } from '../../data/blueprint.ts';
import { lessonFor } from '../../data/lesson-index.ts';
import {
  bandBreakdown,
  buildReview,
  skillBreakdown,
  summariseReview,
  type ReviewRow,
  type SkillBreakdown,
} from '../../engine/attemptReview.ts';
import type { ErrorKind } from '../../engine/analytics.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty, Tabs } from '../../components/ui/primitives.tsx';
import { MasteryBars } from '../../components/charts/charts.tsx';
import { IconBook, IconDownload, IconPrint } from '../../components/ui/icons.tsx';
import { download, formatClock, pct } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';

type Tab = 'skills' | 'bands' | 'questions';

export const ERROR_LABEL: Record<ErrorKind, { vi: string; en: string }> = {
  concept: { vi: 'Kiến thức', en: 'Concept' },
  careless: { vi: 'Ẩu', en: 'Careless' },
  timeout: { vi: 'Hết giờ', en: 'Time' },
  omitted: { vi: 'Bỏ trống', en: 'Omitted' },
};

export function AttemptAnalysis({
  attemptId,
  navigate,
}: {
  attemptId: string;
  navigate(route: Route): void;
}): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state } = useStore();
  const [tab, setTab] = useState<Tab>('skills');

  const attempt = state.attempts.find((a) => a.id === attemptId);
  const form = attempt ? state.forms.find((f) => f.id === attempt.formId) : undefined;

  const rows = useMemo(() => {
    if (!attempt || !form) return [];
    return buildReview(attempt, new Map(form.modules.map((m) => [m.id, m])), QUESTION_BY_ID);
  }, [attempt, form]);

  const skills = useMemo(() => skillBreakdown(rows), [rows]);
  const bands = useMemo(() => bandBreakdown(rows), [rows]);

  if (!attempt || rows.length === 0) {
    return (
      <div className="page">
        <Empty
          title={vi ? 'Không tìm thấy bài làm' : 'No such attempt'}
          action={<Button onClick={() => navigate({ name: 'tests' })}>{vi ? 'Bài thi thử' : 'Tests'}</Button>}
        />
      </div>
    );
  }

  const summary = summariseReview(rows);

  const exportCsv = () => {
    const header = [
      'number', 'questionId', 'section', 'domain', 'skill', 'band',
      'given', 'key', 'verdict', 'seconds', 'targetSeconds', 'pace', 'error', 'flagged',
    ];
    // Quote every field: a prompt or a key can contain a comma, and a CSV that
    // shifts a column silently is worse than no export at all.
    const quote = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const lines = [
      header.join(','),
      ...rows.map((r) =>
        [
          r.number, r.question.id, r.question.section, r.question.domain, r.question.skill,
          r.question.band, r.given ?? '', r.key, r.verdict, Math.round(r.seconds),
          r.targetSeconds, r.pace, r.error ?? '', r.flagged,
        ].map(quote).join(','),
      ),
    ];
    download(`sat365-analysis-${attemptId}.csv`, lines.join('\n'));
  };

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'skills', label: vi ? 'Theo kỹ năng' : 'By skill' },
    { id: 'bands', label: vi ? 'Theo độ khó' : 'By difficulty' },
    { id: 'questions', label: vi ? 'Từng câu' : 'Question by question' },
  ];

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <Button variant="ghost" onClick={() => navigate({ name: 'attempt-review', attemptId })}>
          ← {vi ? 'Đáp án và phân tích' : 'Answers and analysis'}
        </Button>
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{vi ? 'Bảng phân tích chi tiết' : 'Detailed analysis'}</h1>
            <p className="page-sub">
              {attempt.label} · {summary.correct}/{summary.scored} ·{' '}
              {formatClock(summary.seconds)} {vi ? 'thời gian làm bài' : 'on task'}
            </p>
          </div>
          <div className="row gap-2">
            <Button onClick={() => window.print()}>
              <IconPrint size={16} /> {vi ? 'In' : 'Print'}
            </Button>
            <Button onClick={exportCsv}>
              <IconDownload size={16} /> CSV
            </Button>
          </div>
        </div>
      </header>

      <Tabs<Tab> tabs={tabs} value={tab} onChange={setTab} ariaLabel={vi ? 'Cách xem' : 'View'} />

      {tab === 'skills' && <SkillsTable skills={skills} navigate={navigate} locale={locale} />}
      {tab === 'bands' && <BandsPanel bands={bands} locale={locale} />}
      {tab === 'questions' && <QuestionsTable rows={rows} locale={locale} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Panels — module scope, per the standing rule                        */
/* ------------------------------------------------------------------ */

function SkillsTable({
  skills,
  navigate,
  locale,
}: {
  skills: SkillBreakdown[];
  navigate(route: Route): void;
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';

  if (skills.length === 0) {
    return <Empty title={vi ? 'Không có câu tính điểm nào' : 'No scored questions'} />;
  }

  return (
    <div className="stack gap-5">
      <Card
        title={vi ? 'Mức thành thạo trong bài này' : 'Mastery on this attempt'}
        subtitle={
          vi
            ? 'Xác suất làm đúng một câu độ khó trung bình, ước lượng từ chính những câu của kỹ năng đó trong bài. Không phải phần trăm đúng: làm đúng câu dễ không phải là thành thạo.'
            : 'The modelled probability of a medium item, from this attempt’s responses for that skill alone. Not percent correct: answering easy items right is not mastery.'
        }
      >
        <MasteryBars
          rows={skills.map((s) => ({
            label: skillLabel(s.skill, locale),
            value: s.mastery,
            meta: `${s.correct}/${s.attempted + s.omitted} · ${formatClock(s.medianSeconds)} ${
              vi ? 'trung vị' : 'median'
            }${s.dominantError ? ` · ${vi ? ERROR_LABEL[s.dominantError].vi : ERROR_LABEL[s.dominantError].en}` : ''}`,
          }))}
        />
      </Card>

      <Card title={vi ? 'Chi tiết theo kỹ năng' : 'Skill detail'}>
        <div className="scroll-x">
          <table className="table">
            <thead>
              <tr>
                <th>{vi ? 'Kỹ năng' : 'Skill'}</th>
                <th>{vi ? 'Đúng' : 'Correct'}</th>
                <th>{vi ? 'Bỏ trống' : 'Omitted'}</th>
                <th>{vi ? 'Thành thạo' : 'Mastery'}</th>
                <th>{vi ? 'Thời gian / mốc' : 'Time / target'}</th>
                <th>{vi ? 'Lỗi chủ đạo' : 'Dominant error'}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {skills.map((s) => (
                <SkillRow key={s.skill} skill={s} navigate={navigate} locale={locale} />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function SkillRow({
  skill,
  navigate,
  locale,
}: {
  skill: SkillBreakdown;
  navigate(route: Route): void;
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';
  const lesson = lessonFor(skill.skill);
  const slow = skill.medianSeconds > skill.medianTargetSeconds * 1.25;

  return (
    <tr>
      <td>
        <div className="semibold">{skillLabel(skill.skill, locale)}</div>
        <div className="text-xs muted">{sectionLabel(skill.section, locale)}</div>
      </td>
      <td className="semibold">
        {skill.correct}/{skill.attempted + skill.omitted}
      </td>
      <td style={skill.omitted > 0 ? { color: 'var(--warning)' } : undefined}>{skill.omitted}</td>
      <td>
        <Badge tone={skill.mastery >= 0.7 ? 'success' : skill.mastery >= 0.45 ? 'warning' : 'danger'}>
          {pct(skill.mastery)}
        </Badge>
      </td>
      <td style={slow ? { color: 'var(--warning)' } : undefined}>
        {formatClock(skill.medianSeconds)} / {formatClock(skill.medianTargetSeconds)}
      </td>
      <td>
        {skill.dominantError ? (
          <Badge tone={skill.dominantError === 'careless' ? 'warning' : 'danger'}>
            {vi ? ERROR_LABEL[skill.dominantError].vi : ERROR_LABEL[skill.dominantError].en}
          </Badge>
        ) : (
          <span className="muted">—</span>
        )}
      </td>
      <td style={{ textAlign: 'right' }}>
        {lesson && (
          <Button variant="ghost" size="sm" onClick={() => navigate({ name: 'lesson', skill: skill.skill })}>
            <IconBook size={14} /> {vi ? 'Bài giảng' : 'Lesson'}
          </Button>
        )}
      </td>
    </tr>
  );
}

function BandsPanel({
  bands,
  locale,
}: {
  bands: Array<{ band: 'easy' | 'medium' | 'hard'; attempted: number; correct: number }>;
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';
  const label = { easy: { vi: 'Dễ', en: 'Easy' }, medium: { vi: 'Trung bình', en: 'Medium' }, hard: { vi: 'Khó', en: 'Hard' } };

  const easy = bands.find((b) => b.band === 'easy');
  const hard = bands.find((b) => b.band === 'hard');
  const leaking = easy && easy.attempted >= 5 && easy.correct / easy.attempted < 0.85;
  const ceiling = hard && hard.attempted >= 5 && hard.correct / hard.attempted < 0.5 && !leaking;

  return (
    <div className="stack gap-5">
      <Card title={vi ? 'Chính xác theo độ khó' : 'Accuracy by difficulty'}>
        <MasteryBars
          rows={bands.map((b) => ({
            label: vi ? label[b.band].vi : label[b.band].en,
            value: b.attempted === 0 ? 0 : b.correct / b.attempted,
            meta: `${b.correct}/${b.attempted}`,
          }))}
        />
      </Card>

      {/*
        The interpretation, not just the numbers. A learner looking at three
        bars has to be told which shape they are looking at, because the two
        failure modes call for opposite next steps and look similar on a chart.
      */}
      {leaking && (
        <div className="escalation" data-severity="attention">
          <div>
            <strong>{vi ? 'Đây là rò rỉ, không phải trần' : 'This is a leak, not a ceiling'}</strong>
            <p>
              {vi
                ? 'Em đang mất điểm ở câu dễ. Luyện câu khó hơn sẽ không lấy lại số điểm này — phải xử lý ẩu và nhịp độ trước.'
                : 'Marks are going on easy items. Harder practice will not recover them: carelessness and pacing come first.'}
            </p>
          </div>
        </div>
      )}
      {ceiling && (
        <div className="escalation" data-severity="info">
          <div>
            <strong>{vi ? 'Đây là trần, không phải rò rỉ' : 'This is a ceiling, not a leak'}</strong>
            <p>
              {vi
                ? 'Câu dễ và trung bình đã vững; điểm nằm ở nhóm khó. Đây là lúc học kiến thức mới chứ không phải luyện thêm cùng một mức.'
                : 'Easy and medium are holding; the marks are in the hard band. This is where new instruction pays, not more practice at the same level.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionsTable({ rows, locale }: { rows: ReviewRow[]; locale: 'vi' | 'en' }): React.ReactElement {
  const vi = locale === 'vi';

  return (
    <Card title={vi ? 'Toàn bộ câu hỏi' : 'Every question'}>
      <div className="scroll-x">
        <table className="table analysis-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{vi ? 'Kỹ năng' : 'Skill'}</th>
              <th>{vi ? 'Miền' : 'Domain'}</th>
              <th>{vi ? 'Độ khó' : 'Band'}</th>
              <th>{vi ? 'Chọn' : 'Given'}</th>
              <th>{vi ? 'Đáp án' : 'Key'}</th>
              <th>{vi ? 'Thời gian' : 'Time'}</th>
              <th>{vi ? 'Lỗi' : 'Error'}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.question.id} data-verdict={row.verdict}>
                <td className="semibold">{row.number}</td>
                <td>{skillLabel(row.question.skill, locale)}</td>
                <td className="text-xs muted">{domainLabel(row.question.domain, locale)}</td>
                <td>{row.question.band}</td>
                <td className={row.verdict === 'incorrect' ? 'semibold' : undefined}>
                  {row.given ?? <span className="muted">—</span>}
                </td>
                <td className="semibold">{row.key}</td>
                <td className={row.pace !== 'on-pace' ? 'semibold' : undefined}>
                  {formatClock(row.seconds)}
                  <span className="muted"> / {formatClock(row.targetSeconds)}</span>
                </td>
                <td>
                  {row.error ? (
                    <span className="text-xs">{vi ? ERROR_LABEL[row.error].vi : ERROR_LABEL[row.error].en}</span>
                  ) : (
                    <span className="muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
