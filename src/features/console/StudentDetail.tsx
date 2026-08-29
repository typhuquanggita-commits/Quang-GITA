/**
 * One student's record, as a teacher may see it.
 *
 * Two permissions existed for months with no surface behind them —
 * `student.analytics.view` and `student.responses.view` — which is its own
 * kind of dishonesty: a policy nobody can exercise has never been tested.
 *
 * Three things this screen insists on.
 *
 * It is scoped. A teacher sees a student they share a class with, not every
 * student in the organisation. `canViewLearner` decides, and a refusal is
 * shown as a refusal rather than an empty page — a blank screen teaches the
 * viewer nothing about why.
 *
 * It is logged. Opening someone else's record writes a `student.record.viewed`
 * entry naming who looked and when. Without a record, a policy is only a
 * claim about the past.
 *
 * It says what it cannot see. There is no server: response-level data lives
 * in the learner's own browser and never reaches this device. A console that
 * quietly showed empty charts would read as "this student has done nothing",
 * which is a different and much worse claim than "this device cannot see it".
 */

import React, { useEffect, useMemo, useRef } from 'react';
import {
  accountById,
  assignmentsForStudent,
  classesForStudent,
  type Assignment,
} from '../../auth/model.ts';
import {
  canViewLearner,
  levelForScore,
  pointsToNextLevel,
  STUDENT_LEVEL_SPECS,
  studentLevelLabel,
  can,
} from '../../auth/roles.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty } from '../../components/ui/primitives.tsx';
import { IconAlert, IconCheck, IconClipboard } from '../../components/ui/icons.tsx';
import { daysBetween, formatDate, isoDate } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';

export function StudentDetail({
  accountId,
  navigate,
}: {
  accountId: string;
  navigate(route: Route): void;
}): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state, principal, audit } = useStore();
  const org = state.org;

  const student = accountById(org, accountId);
  const rooms = useMemo(() => classesForStudent(org, accountId), [org, accountId]);
  const allowed =
    student !== undefined &&
    canViewLearner(principal, {
      selfId: org.currentAccountId,
      targetId: accountId,
      targetClassIds: rooms.map((r) => r.id),
    });

  /*
   * One entry per record opened, not one per render. The ref is keyed by the
   * account so navigating between two students logs both, while a re-render
   * caused by any other dispatch logs neither — an audit log that inflates
   * with renders is worse than none, because it looks precise.
   */
  const loggedFor = useRef<string | null>(null);
  useEffect(() => {
    if (loggedFor.current === accountId) return;
    loggedFor.current = accountId;
    if (accountId === org.currentAccountId) return; // reading your own record is not surveillance
    audit({
      action: allowed ? 'student.record.viewed' : 'permission.denied',
      targetId: accountId,
      detail: allowed ? student?.name : 'student.analytics.view',
    });
  }, [accountId, allowed, audit, org.currentAccountId, student?.name]);

  if (!student) {
    return (
      <div className="page">
        <Empty
          title={vi ? 'Không tìm thấy tài khoản' : 'No such account'}
          action={<Button onClick={() => navigate({ name: 'console' })}>{vi ? 'Quay lại' : 'Back'}</Button>}
        />
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="page">
        <Empty
          icon={<IconAlert size={32} />}
          title={vi ? 'Bạn không có quyền xem hồ sơ này' : 'You may not view this record'}
          body={
            vi
              ? 'Giáo viên chỉ xem được học sinh trong lớp mình dạy. Lần truy cập này đã được ghi vào nhật ký kiểm toán.'
              : 'A teacher sees students in the classes they teach. This attempt has been written to the audit log.'
          }
          action={<Button onClick={() => navigate({ name: 'console' })}>{vi ? 'Quay lại' : 'Back'}</Button>}
        />
      </div>
    );
  }

  const total = student.lastTotal ?? null;
  const level = total === null ? null : levelForScore(total);
  const nextLevel = total === null ? null : pointsToNextLevel(total);
  const assignments = assignmentsForStudent(org, accountId);
  const today = isoDate();

  const submitted = assignments.filter((a) => a.submittedBy.includes(accountId));
  const overdue = assignments.filter(
    (a) => !a.submittedBy.includes(accountId) && daysBetween(a.dueDate, today) > 0,
  );

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <Button variant="ghost" onClick={() => navigate({ name: 'console' })}>
          ← {vi ? 'Giảng dạy' : 'Teaching'}
        </Button>
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{student.name}</h1>
            <p className="page-sub">{student.email || '—'}</p>
          </div>
          <div className="row gap-2 wrap">
            {level && <Badge tone="primary">{studentLevelLabel(level, locale)}</Badge>}
            {student.suspendedAt && <Badge tone="danger">{vi ? 'Đã khoá' : 'Suspended'}</Badge>}
            {rooms.map((room) => (
              <Badge key={room.id}>{room.name}</Badge>
            ))}
          </div>
        </div>
      </header>

      {/*
        The single most important thing on this page. A teacher acting on a
        roster figure needs to know it is a cached summary, not a live read of
        the student's work, before they act on it — not after.
      */}
      <div className="escalation" data-severity="info">
        <IconAlert size={20} />
        <div>
          <strong>{vi ? 'Thiết bị này thấy được những gì' : 'What this device can see'}</strong>
          <p>
            {vi
              ? 'SAT365 không có máy chủ. Bài làm chi tiết của học sinh nằm trong trình duyệt của chính em và không bao giờ tới thiết bị này. Những gì hiển thị dưới đây là bản tóm tắt trong hồ sơ lớp: điểm gần nhất đã đồng bộ, cấp độ, và tình trạng nộp bài. Một mục trống nghĩa là "chưa đồng bộ", không phải "học sinh chưa làm".'
              : 'SAT365 has no server. A learner’s responses live in their own browser and never reach this device. What follows is the summary carried in the class record: the last synced score, the level it earns, and assignment status. A blank figure means “not synced here”, not “the student has done nothing”.'}
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Điểm gần nhất' : 'Last synced score'}</div>
          <div className="kpi-value">{total ?? '—'}</div>
          <div className="kpi-foot">
            {total === null
              ? vi
                ? 'Chưa có điểm nào được đồng bộ'
                : 'No score has been synced'
              : nextLevel
                ? vi
                  ? `Còn ${nextLevel.points} điểm tới ${studentLevelLabel(nextLevel.next, locale)}`
                  : `${nextLevel.points} points to ${studentLevelLabel(nextLevel.next, locale)}`
                : vi
                  ? 'Đã ở cấp độ cao nhất'
                  : 'At the highest level'}
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Bài đã nộp' : 'Assignments submitted'}</div>
          <div className="kpi-value">
            {submitted.length}/{assignments.length}
          </div>
          <div className="kpi-foot">
            {vi ? 'Ghi nhận trên thiết bị này' : 'As recorded on this device'}
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Quá hạn' : 'Overdue'}</div>
          <div className="kpi-value" style={overdue.length > 0 ? { color: 'var(--danger)' } : undefined}>
            {overdue.length}
          </div>
          <div className="kpi-foot">
            {vi ? 'Đây là việc cần xử lý trước' : 'This is what to act on first'}
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Tham gia từ' : 'Member since'}</div>
          <div className="kpi-value" style={{ fontSize: 'var(--text-lg)' }}>
            {formatDate(isoDate(new Date(student.createdAt)), locale)}
          </div>
          <div className="kpi-foot">
            {rooms.length} {vi ? 'lớp' : rooms.length === 1 ? 'class' : 'classes'}
          </div>
        </div>
      </div>

      {level && (
        <Card
          title={vi ? 'Cấp độ này mở ra điều gì' : 'What this level opens'}
          subtitle={
            vi
              ? 'Cấp độ do điểm đạt được quyết định, không do ai gán.'
              : 'A level is earned by score, never assigned by a person.'
          }
        >
          <ul className="lesson-method">
            {(vi ? STUDENT_LEVEL_SPECS[level].unlocksVi : STUDENT_LEVEL_SPECS[level].unlocks).map(
              (unlock) => (
                <li key={unlock}>{unlock}</li>
              ),
            )}
          </ul>
        </Card>
      )}

      <Card
        title={vi ? 'Bài được giao' : 'Set work'}
        subtitle={
          vi
            ? 'Trạng thái nộp được ghi ở nơi bài được giao, nên phần này là thật.'
            : 'Submission is recorded where the work was set, so this part is real.'
        }
      >
        {assignments.length === 0 ? (
          <Empty
            icon={<IconClipboard size={28} />}
            title={vi ? 'Chưa giao bài nào' : 'Nothing set yet'}
          />
        ) : (
          <div className="scroll-x">
            <table className="table">
              <thead>
                <tr>
                  <th>{vi ? 'Bài' : 'Assignment'}</th>
                  <th>{vi ? 'Hạn' : 'Due'}</th>
                  <th>{vi ? 'Trạng thái' : 'Status'}</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <AssignmentRow
                    key={assignment.id}
                    assignment={assignment}
                    accountId={accountId}
                    today={today}
                    locale={locale}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/*
        Named rather than hidden. A teacher who holds the response-inspection
        permission should learn here that the permission has no data behind it
        on this device, instead of hunting for a screen that cannot exist.
      */}
      {can(principal, 'student.responses.view') && (
        <Card title={vi ? 'Xem chi tiết bài làm' : 'Response-level inspection'}>
          <p className="muted">
            {vi
              ? 'Bạn có quyền xem chi tiết từng câu trả lời. Quyền này sẽ có tác dụng khi hệ thống có máy chủ đồng bộ; hiện tại dữ liệu đó không rời khỏi máy của học sinh, nên không có gì để hiển thị ở đây.'
              : 'You hold the permission to inspect individual responses. It will take effect when there is a server to sync them; today that data never leaves the learner’s own device, so there is nothing here to show.'}
          </p>
        </Card>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Row                                                                 */
/*                                                                     */
/* Module scope, not nested: a component defined inside the view above  */
/* would be a new type on every dispatch and remount the whole table.   */
/* ------------------------------------------------------------------ */

function AssignmentRow({
  assignment,
  accountId,
  today,
  locale,
}: {
  assignment: Assignment;
  accountId: string;
  today: string;
  locale: 'vi' | 'en';
}): React.ReactElement {
  const vi = locale === 'vi';
  const done = assignment.submittedBy.includes(accountId);
  const daysLate = daysBetween(assignment.dueDate, today);

  return (
    <tr>
      <td>
        <div className="semibold">{assignment.title}</div>
        <div className="text-xs muted">{assignment.kind}</div>
      </td>
      <td>{formatDate(assignment.dueDate, locale)}</td>
      <td>
        {done ? (
          <span style={{ color: 'var(--success)' }}>
            <IconCheck size={14} /> {vi ? 'Đã nộp' : 'Submitted'}
          </span>
        ) : daysLate > 0 ? (
          <span style={{ color: 'var(--danger)' }}>
            {vi ? `Quá hạn ${daysLate} ngày` : `${daysLate} day${daysLate === 1 ? '' : 's'} overdue`}
          </span>
        ) : (
          <span className="muted">{vi ? 'Chưa tới hạn' : 'Not yet due'}</span>
        )}
      </td>
    </tr>
  );
}
