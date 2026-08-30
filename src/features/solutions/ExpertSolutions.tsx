/**
 * The expert solution library.
 *
 * Laid out in the order an expert actually works: the read before the steps,
 * the steps before the answer is confirmed, and the wrong turn given its own
 * block at the end rather than a footnote.
 *
 * The wrong turn is deliberately the most prominent thing on the page after
 * the item itself. A learner shown only the right path learns a route; a
 * learner shown the attractive wrong path and where it breaks learns to
 * recognise the fork — and on hard items the fork is the item. Most published
 * solutions omit it entirely, which is why most published solutions produce
 * learners who can follow a worked example and not answer a new one.
 *
 * The answer is behind a reveal. A solution read with the answer already
 * visible is a solution read backwards, and the reasoning stops being
 * reasoning and becomes justification.
 */

import React, { useMemo, useState } from 'react';
import { SOLUTIONS, solutionsForSkill, solutionStats, type ExpertSolution } from '../../data/solution-index.ts';
import { skillLabel, sectionLabel } from '../../data/blueprint.ts';
import type { SectionId, SkillId } from '../../types.ts';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty, Segmented } from '../../components/ui/primitives.tsx';
import { IconAlert, IconCheck, IconClock, IconSparkle, IconTarget } from '../../components/ui/icons.tsx';
import type { Route } from '../shell/routes.ts';

type Scope = SectionId | 'both';

function SolutionCard({
  solution,
  vi,
  locale,
  navigate,
}: {
  solution: ExpertSolution;
  vi: boolean;
  locale: 'vi' | 'en';
  navigate(route: Route): void;
}): React.ReactElement {
  const [revealed, setRevealed] = useState(false);

  return (
    <Card
      level={2}
      className="solution-card"
      title={skillLabel(solution.skill, locale)}
      subtitle={`${sectionLabel(solution.section, locale)} · ${vi ? 'band khó' : solution.band} · ${solution.seconds}${vi ? ' giây cho chuyên gia' : 's for an expert'}`}
      action={
        <Badge tone="warning">
          <IconClock size={12} /> {solution.seconds}s
        </Badge>
      }
    >
      <div className="stack gap-4">
        {solution.stimulus && <p className="solution-stimulus">{solution.stimulus}</p>}
        <p className="semibold">{solution.prompt}</p>

        {solution.choices && (
          <ol className="solution-choices">
            {solution.choices.map((choice) => (
              <li key={choice.id} data-key={revealed && choice.id === solution.answer ? 'true' : undefined}>
                <span className="solution-choice-id">{choice.id}</span>
                <span>{choice.text}</span>
              </li>
            ))}
          </ol>
        )}

        {!revealed ? (
          <Button variant="primary" onClick={() => setRevealed(true)} style={{ alignSelf: 'flex-start' }}>
            {vi ? 'Xem cách một chuyên gia làm' : 'See how an expert works it'}
          </Button>
        ) : (
          <div className="stack gap-4">
            <div className="solution-read">
              <span className="report-heading">
                <IconSparkle size={13} /> {vi ? 'Đọc gì trước khi nhìn phương án' : 'The read, before the options'}
              </span>
              <p>{vi ? solution.readVi : solution.read}</p>
            </div>

            <div className="stack gap-2">
              <span className="report-heading">{vi ? 'Các bước, kèm lý do' : 'The steps, with reasons'}</span>
              <ol className="solution-steps">
                {solution.steps.map((step) => (
                  <li key={step.act}>
                    <strong>{vi ? step.actVi : step.act}</strong>
                    <p>{vi ? step.whyVi : step.why}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/*
              Given the most weight of anything after the item. This is the
              field that separates a learner who can follow a solution from one
              who can answer a new question.
            */}
            <div className="solution-wrong">
              <IconAlert size={16} />
              <div>
                <strong>{vi ? 'Nước đi sai mà học sinh giỏi vẫn chọn' : 'The wrong turn an able student takes'}</strong>
                <p>{vi ? solution.wrongTurn.pathVi : solution.wrongTurn.path}</p>
                <p className="solution-breaks">
                  <strong>{vi ? 'Hỏng ở đâu: ' : 'Where it breaks: '}</strong>
                  {vi ? solution.wrongTurn.breaksVi : solution.wrongTurn.breaks}
                </p>
              </div>
            </div>

            <div className="solution-transfer">
              <IconTarget size={16} />
              <div>
                <strong>{vi ? 'Điều mang đi được sang câu khác' : 'What transfers'}</strong>
                <p>{vi ? solution.transferVi : solution.transfer}</p>
              </div>
            </div>

            <div className="row gap-2 wrap">
              <Badge tone="success">
                <IconCheck size={12} /> {vi ? 'Đáp án ' : 'Answer '}
                {solution.answer}
              </Badge>
              <button
                type="button"
                className="syllabus-link"
                onClick={() => navigate({ name: 'lesson', skill: solution.skill })}
              >
                {vi ? 'Mở bài giảng kỹ năng này' : 'Open this skill’s lesson'}
              </button>
              <button
                type="button"
                className="syllabus-link"
                onClick={() => navigate({ name: 'packet', skill: solution.skill })}
              >
                {vi ? 'Luyện bộ phiếu' : 'Work the packet'}
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export function ExpertSolutions({
  navigate,
  skill,
}: {
  navigate(route: Route): void;
  /**
   * Narrows the library to one skill.
   *
   * Set when a learner arrives from an item they got wrong, which is the
   * journey the library was written for and the one it could not previously
   * serve: the front page opens on thirty-one solutions and leaves the learner
   * to find the one that answers the item in front of them.
   */
  skill?: string;
}): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const [scope, setScope] = useState<Scope>('both');

  const stats = useMemo(() => solutionStats(), []);
  const focused = useMemo(() => (skill ? solutionsForSkill(skill as SkillId) : []), [skill]);
  const narrowed = skill !== undefined && focused.length > 0;
  const shown = useMemo(
    () => (narrowed ? focused : SOLUTIONS.filter((s) => scope === 'both' || s.section === scope)),
    [narrowed, focused, scope],
  );

  return (
    <div className="page stack gap-5">
      <header className="page-head">
        <h1 className="page-title">{vi ? 'Lời giải chuyên gia' : 'Expert solutions'}</h1>
        <p className="page-sub">
          {vi
            ? 'Ở band khó, phương pháp thì ai cũng biết — thứ phân định là QUYẾT ĐỊNH mà phương pháp không làm thay được. Mỗi lời giải ở đây nói rõ chuyên gia đọc gì trước khi nhìn phương án, và nước đi sai mà một học sinh giỏi vẫn chọn.'
            : 'At the hard band the method is already known, and what separates candidates is the decision the method does not make. Each solution here gives the read that comes before the options, and the wrong turn an able student takes.'}
        </p>
      </header>

      <Card>
        <div className="row gap-4 wrap vocab-stats">
          <div className="vocab-stat">
            <strong>{stats.total}</strong>
            <span>{vi ? `lời giải, phủ ${stats.skills} kỹ năng` : `solutions across ${stats.skills} skills`}</span>
          </div>
          <div className="vocab-stat">
            <strong>{stats.wrongTurns}</strong>
            <span>
              {vi
                ? 'nước đi sai được mô tả tới chỗ nó gãy — phần mà hầu hết lời giải xuất bản bỏ qua'
                : 'wrong turns followed to the point they break — the part most published solutions omit'}
            </span>
          </div>
          <div className="vocab-stat">
            <strong>{stats.meanSeconds}s</strong>
            <span>
              {vi
                ? 'thời gian trung bình của chuyên gia. Một lời giải đúng mà mất ba phút là một câu sai ở chỗ khác trên đề.'
                : 'mean expert time. A correct solution that takes three minutes is a wrong answer elsewhere on the paper.'}
            </span>
          </div>
        </div>
      </Card>

      {narrowed ? (
        <Card className="no-print">
          <div className="between wrap gap-3">
            <p className="text-sm">
              {vi
                ? `Đang xem lời giải cho kỹ năng ${skillLabel(skill as SkillId, locale)} — kỹ năng của câu bạn vừa làm sai.`
                : `Showing the solutions for ${skillLabel(skill as SkillId, locale)} — the skill of the item you missed.`}
            </p>
            <Button variant="secondary" onClick={() => navigate({ name: 'expert-solutions' })}>
              {vi ? `Xem cả ${SOLUTIONS.length} lời giải` : `See all ${SOLUTIONS.length} solutions`}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="no-print">
          <Segmented
            value={scope}
            onChange={(next: Scope) => setScope(next)}
            ariaLabel={vi ? 'Lọc theo phần thi' : 'Filter by section'}
            options={[
              { value: 'both', label: vi ? 'Cả hai phần' : 'Both sections' },
              { value: 'rw', label: sectionLabel('rw', locale) },
              { value: 'math', label: sectionLabel('math', locale) },
            ]}
          />
        </div>
      )}

      {shown.length === 0 ? (
        <Empty level={2} icon={<IconSparkle size={28} />} title={vi ? 'Không có lời giải nào' : 'No solutions'} />
      ) : (
        <div className="stack gap-4">
          {shown.map((solution) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
              vi={vi}
              locale={locale}
              navigate={navigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
