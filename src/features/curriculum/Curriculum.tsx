/**
 * The syllabus, as a page and as a printable document.
 *
 * Two audiences with different needs, served by one screen.
 *
 * A teacher opening this before a course wants the sequence and the reason
 * for it: why this unit here, what the checkpoint is for, what to do when it
 * is failed. That reasoning is on the page rather than in a handbook, because
 * a rationale kept somewhere else is a rationale nobody reads and therefore
 * nobody can improve.
 *
 * A learner or a guardian wants the commitment: how many sessions, how many
 * hours, what is assumed on entry and what is claimed on exit. Those are at
 * the top, in that order, with the homework hours derived from the sheets the
 * course actually sets rather than asserted — a course that claims two hours a
 * week and sets five is a course learners stop doing the homework for.
 */

import React, { useMemo, useState } from 'react';
import { COURSES, type CourseId } from '../../data/curriculum.ts';
import { skillLabel, sectionLabel } from '../../data/blueprint.ts';
import { PAPERS } from '../../data/papers.ts';
import { buildCoursePlan, type Session } from '../../engine/curriculum.ts';
import { SHEET_ORDER, type SheetKind } from '../../engine/packets.ts';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Button, Card, Segmented } from '../../components/ui/primitives.tsx';
import { DocumentFrame } from '../../brand/DocumentFrame.tsx';
import { IconAlert, IconBook, IconCheck, IconClipboard, IconPrint, IconTarget } from '../../components/ui/icons.tsx';
import { formatDate, isoDate } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';

const SHEET_LABEL: Record<SheetKind, { en: string; vi: string }> = {
  theory: { en: 'Theory', vi: 'Lý thuyết' },
  recognition: { en: 'Recognition', vi: 'Đọc vị' },
  method: { en: 'Method', vi: 'Phương pháp' },
  advanced: { en: 'Advanced', vi: 'Nâng cao' },
  revision: { en: 'Revision', vi: 'Ôn thi' },
  exam: { en: 'Exam', vi: 'Phiếu thi' },
  consolidation: { en: 'Consolidation', vi: 'Ôn chắc' },
};

function SheetChips({ kinds, vi }: { kinds: readonly SheetKind[]; vi: boolean }): React.ReactElement {
  const ordered = SHEET_ORDER.filter((kind) => kinds.includes(kind));
  return (
    <span className="row gap-1 wrap">
      {ordered.map((kind) => (
        <span key={kind} className="sheet-chip">
          {vi ? SHEET_LABEL[kind].vi : SHEET_LABEL[kind].en}
        </span>
      ))}
    </span>
  );
}

function SessionRow({
  session,
  vi,
  locale,
  navigate,
}: {
  session: Session;
  vi: boolean;
  locale: 'vi' | 'en';
  navigate(route: Route): void;
}): React.ReactElement {
  const paper = session.checkpoint?.paperId
    ? PAPERS.find((p) => p.id === session.checkpoint!.paperId)
    : undefined;

  return (
    <li className="syllabus-session">
      <div className="syllabus-session-head">
        <span className="syllabus-index">{session.index}</span>
        <div className="stack gap-1 grow">
          <span className="semibold">
            {session.materials.map((m) => skillLabel(m.skill, locale)).join(' · ')}
          </span>
          <span className="text-xs muted">
            {session.minutes} {vi ? 'phút tại lớp' : 'min in class'} ·{' '}
            {session.homeworkMinutes} {vi ? 'phút về nhà' : 'min homework'}
          </span>
        </div>
      </div>

      <ul className="syllabus-objectives">
        {session.objectives.map((objective) => (
          <li key={objective.skill}>{vi ? objective.textVi : objective.text}</li>
        ))}
      </ul>

      <div className="syllabus-materials">
        {session.materials.map((material) => (
          <div key={material.skill} className="syllabus-material">
            <span className="text-sm semibold">{skillLabel(material.skill, locale)}</span>
            <span className="row gap-2 wrap text-xs">
              {material.lesson && (
                <button
                  type="button"
                  className="syllabus-link no-print"
                  onClick={() => navigate({ name: 'lesson', skill: material.skill })}
                >
                  <IconBook size={12} /> {vi ? 'Bài giảng' : 'Lesson'}
                </button>
              )}
              <span className="muted">{vi ? 'Tại lớp:' : 'In class:'}</span>
              <SheetChips kinds={material.classSheets} vi={vi} />
              <span className="muted">{vi ? 'Về nhà:' : 'Homework:'}</span>
              <SheetChips kinds={material.homeworkSheets} vi={vi} />
              <button
                type="button"
                className="syllabus-link no-print"
                onClick={() => navigate({ name: 'packet', skill: material.skill })}
              >
                <IconClipboard size={12} /> {vi ? 'Mở bộ phiếu' : 'Open packet'}
              </button>
            </span>
          </div>
        ))}
      </div>

      {session.checkpoint && (
        <div className="syllabus-checkpoint">
          <IconTarget size={15} />
          <div>
            <strong>
              {vi ? 'Mốc kiểm tra' : 'Checkpoint'}
              {' — '}
              {session.checkpoint.kind === 'paper'
                ? vi
                  ? `đề ${paper?.nameVi ?? session.checkpoint.paperId}`
                  : `paper ${paper?.name ?? session.checkpoint.paperId}`
                : session.checkpoint.kind === 'certification'
                  ? vi ? 'kỳ thi cấp chứng chỉ' : 'the certification sitting'
                  : vi ? 'phiếu thi của từng chuyên đề' : 'the exam sheet for each topic'}
              {' · '}
              {Math.round(session.checkpoint.passAccuracy * 100)}%
            </strong>
            <p>{vi ? session.checkpoint.noteVi : session.checkpoint.note}</p>
          </div>
        </div>
      )}
    </li>
  );
}

export function Curriculum({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const [courseId, setCourseId] = useState<CourseId>('core');

  const plan = useMemo(() => buildCoursePlan(courseId), [courseId]);
  if (!plan) return <div className="page" />;

  const { course } = plan;
  const unitsWithSessions = course.units.map((unit) => ({
    unit,
    sessions: plan.sessions.filter((s) => s.unitId === unit.id),
  }));

  const limits = vi
    ? 'Đề cương này là khung dạy, không phải cam kết điểm số. Số buổi và số giờ là mức thiết kế; tốc độ thực tế phụ thuộc vào việc học viên có đạt mốc kiểm tra hay không — đơn vị chưa đạt thì học lại, và khoá sẽ dài hơn con số ghi ở đây. Tham số độ khó trong hệ thống là ước lượng của người soạn, chưa hiệu chuẩn.'
    : 'This syllabus is a teaching frame, not a promise of a score. The session and hour counts are the design; the real pace depends on whether checkpoints are passed — a unit not passed is repeated, and the course runs longer than the figure printed here. Difficulty parameters in this platform are author estimates rather than calibrations.';

  return (
    <div className="page stack gap-5">
      <header className="page-head no-print">
        <h1 className="page-title">{vi ? 'Bộ đề cương' : 'Course syllabus'}</h1>
        <p className="page-sub">
          {vi
            ? 'Thứ nối 30 bài giảng, 30 bộ phiếu và 5 đề thành một khoá dạy được. Mỗi đơn vị nói rõ vì sao nó đứng ở vị trí đó trong trình tự.'
            : 'What turns thirty lessons, thirty packets and five papers into a course that can be taught. Every unit says why it sits where it does in the sequence.'}
        </p>
      </header>

      <div className="row gap-3 wrap between no-print">
        <Segmented
          value={courseId}
          onChange={(next: CourseId) => setCourseId(next)}
          ariaLabel={vi ? 'Chọn khoá' : 'Choose a course'}
          options={COURSES.map((c) => ({ value: c.id, label: vi ? c.nameVi : c.name }))}
        />
        <Button onClick={() => window.print()}>
          <IconPrint size={15} /> {vi ? 'In đề cương' : 'Print the syllabus'}
        </Button>
      </div>

      <DocumentFrame
        kind={vi ? 'Đề cương khoá học' : 'Course syllabus'}
        title={vi ? course.nameVi : course.name}
        pillar="goal"
        date={formatDate(isoDate(), locale)}
        reference={`syl-${course.id}`}
        locale={locale}
        limits={limits}
      >
        <p className="lead">{vi ? course.summaryVi : course.summary}</p>

        <div className="syllabus-figures">
          <div className="syllabus-figure">
            <strong>{plan.totalSessions}</strong>
            <span>{vi ? 'buổi' : 'sessions'}</span>
          </div>
          <div className="syllabus-figure">
            <strong>{plan.weeks}</strong>
            <span>{vi ? 'tuần, học ' + course.sessionsPerWeek + ' buổi/tuần' : `weeks at ${course.sessionsPerWeek}/week`}</span>
          </div>
          <div className="syllabus-figure">
            <strong>{plan.classHours}</strong>
            <span>{vi ? 'giờ tại lớp' : 'class hours'}</span>
          </div>
          <div className="syllabus-figure">
            <strong>{plan.homeworkHours}</strong>
            <span>{vi ? 'giờ bài về nhà (ước từ phiếu được giao)' : 'homework hours, derived from the sheets set'}</span>
          </div>
          <div className="syllabus-figure">
            <strong>{plan.skills.length}</strong>
            <span>{vi ? 'kỹ năng được dạy' : 'skills taught'}</span>
          </div>
        </div>

        <Card level={2} title={vi ? 'Điều kiện vào và ra' : 'Entry and exit'}>
          <div className="syllabus-gates">
            <div>
              <span className="report-score-label">{vi ? 'Vào' : 'Entry'}</span>
              <p>{vi ? course.entry.noteVi : course.entry.note}</p>
            </div>
            <div>
              <span className="report-score-label">{vi ? 'Ra' : 'Exit'}</span>
              <p>{vi ? course.exit.noteVi : course.exit.note}</p>
              {course.exit.targetScore > 0 && (
                <Badge tone="primary">
                  {vi ? 'Mục tiêu ' : 'Target '}
                  {course.exit.targetScore}
                </Badge>
              )}
            </div>
          </div>
        </Card>

        {unitsWithSessions.map(({ unit, sessions }, i) => (
          <Card
            level={2}
            key={unit.id}
            title={`${vi ? 'Đơn vị' : 'Unit'} ${i + 1} — ${vi ? unit.titleVi : unit.title}`}
            subtitle={
              unit.section === 'both'
                ? vi ? 'Cả hai phần thi' : 'Both sections'
                : sectionLabel(unit.section, locale)
            }
          >
            <div className="stack gap-4">
              <p>{vi ? unit.purposeVi : unit.purpose}</p>

              <div className="syllabus-rationale">
                <IconAlert size={15} />
                <div>
                  <strong>{vi ? 'Vì sao đặt ở đây' : 'Why it sits here'}</strong>
                  <p>{vi ? unit.rationaleVi : unit.rationale}</p>
                </div>
              </div>

              <ol className="syllabus-sessions">
                {sessions.map((session) => (
                  <SessionRow
                    key={session.index}
                    session={session}
                    vi={vi}
                    locale={locale}
                    navigate={navigate}
                  />
                ))}
              </ol>
            </div>
          </Card>
        ))}

        <Card level={2} title={vi ? 'Kỹ năng khoá này dạy' : 'What this course teaches'}>
          <div className="row gap-2 wrap">
            {plan.skills.map((skill) => (
              <Badge key={skill}>
                <IconCheck size={12} /> {skillLabel(skill, locale)}
              </Badge>
            ))}
          </div>
        </Card>
      </DocumentFrame>
    </div>
  );
}
