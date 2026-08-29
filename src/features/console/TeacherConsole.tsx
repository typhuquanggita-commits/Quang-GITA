/**
 * Teacher console.
 *
 * Every panel is gated by a permission and scoped to the classes the signed-in
 * teacher actually teaches. Rendering is not the gate — the checks run on the
 * data before it reaches the view, so a component that leaked would have
 * nothing to leak.
 *
 * Each panel is a module-scope component that calls the hooks it needs. Nested
 * function components would be re-created on every parent render, and React
 * would remount them on each store dispatch — closing an open dialog and
 * clearing a half-typed form every time something was saved.
 */

import React, { useMemo, useState } from 'react';
import { useStore } from '../../state/store.tsx';
import type { Route } from '../shell/routes.ts';
import { useLocale, useT } from '../../i18n/index.ts';
import {
  canForClass,
  levelForScore,
  permissionsFor,
  permissionLabel,
  rankAtLeast,
  rankLabel,
  roleLabel,
  studentLevelLabel,
  STUDENT_LEVELS,
  STUDENT_LEVEL_SPECS,
  TEACHER_RANK_ORDER,
  type Permission,
  type RoleId,
  type TeacherRank,
} from '../../auth/roles.ts';
import {
  accountById,
  assignmentsForClass,
  classesForTeacher,
  studentsInClass,
  type Account,
  type Assignment,
  type ClassRoom,
} from '../../auth/model.ts';
import { Badge, Button, Card, Empty, Field, Modal, Tabs } from '../../components/ui/primitives.tsx';
import { MasteryBars } from '../../components/charts/charts.tsx';
import { IconAlert, IconCheck, IconClipboard, IconTrash } from '../../components/ui/icons.tsx';
import { addDays, formatDate, isoDate, uid } from '../../lib/util.ts';

type ConsoleTab = 'classes' | 'students' | 'assignments' | 'people' | 'audit';

export function TeacherConsole({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const locale = useLocale();
  const { state, allows } = useStore();
  const org = state.org;
  const me = accountById(org, org.currentAccountId);
  const [tab, setTab] = useState<ConsoleTab>('classes');

  const myClasses = useMemo(() => (me ? classesForTeacher(org, me.id) : []), [org, me]);

  if (!me || !allows('roster.view')) {
    return (
      <div className="page">
        <Empty
          icon={<IconAlert size={30} />}
          title={locale === 'vi' ? 'Không có quyền truy cập' : 'No access'}
          body={
            locale === 'vi'
              ? 'Bảng điều khiển giảng dạy chỉ dành cho tài khoản giáo viên. Bạn có thể đổi vai trò trong Cài đặt nếu bạn quản lý thiết bị này.'
              : 'The teaching console is available to teacher accounts. You can change the role in Settings if you administer this device.'
          }
        />
      </div>
    );
  }

  const tabs: Array<{ id: ConsoleTab; label: string; visible: boolean }> = [
    { id: 'classes', label: locale === 'vi' ? 'Lớp học' : 'Classes', visible: true },
    { id: 'students', label: locale === 'vi' ? 'Học sinh' : 'Students', visible: allows('student.analytics.view') },
    { id: 'assignments', label: locale === 'vi' ? 'Bài giao' : 'Assignments', visible: allows('assignment.grade') },
    { id: 'people', label: locale === 'vi' ? 'Nhân sự' : 'People', visible: allows('teacher.invite') },
    { id: 'audit', label: locale === 'vi' ? 'Nhật ký' : 'Audit', visible: allows('audit.view') },
  ];
  const visibleTabs = tabs.filter((x) => x.visible);
  const activeTab = visibleTabs.some((x) => x.id === tab) ? tab : 'classes';

  return (
    <div className="page">
      <header className="page-head">
        <div className="between wrap gap-4">
          <div>
            <h1 className="page-title">{locale === 'vi' ? 'Bảng điều khiển giảng dạy' : 'Teaching console'}</h1>
            <p className="page-sub">
              {locale === 'vi'
                ? 'Theo dõi lớp, giao bài và xem tiến độ — trong phạm vi các lớp bạn phụ trách.'
                : 'Track classes, set work, and follow progress — scoped to the classes you teach.'}
            </p>
          </div>
          <div className="row gap-2">
            <Badge tone="primary">{roleLabel(me.role, locale)}</Badge>
            {me.rank && <Badge tone="info">{rankLabel(me.rank, locale)}</Badge>}
          </div>
        </div>
      </header>

      <Tabs<ConsoleTab>
        value={activeTab}
        onChange={setTab}
        ariaLabel="Console sections"
        tabs={visibleTabs.map((x) => ({ id: x.id, label: x.label }))}
      />

      <div style={{ marginTop: 'var(--space-6)' }}>
        {activeTab === 'classes' && <ClassesPanel classes={myClasses} me={me} />}
        {activeTab === 'students' && <StudentsPanel classes={myClasses} navigate={navigate} />}
        {activeTab === 'assignments' && <AssignmentsPanel classes={myClasses} me={me} />}
        {activeTab === 'people' && <PeoplePanel me={me} />}
        {activeTab === 'audit' && <AuditPanel />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Classes                                                             */
/* ------------------------------------------------------------------ */

function ClassesPanel({ classes, me }: { classes: ClassRoom[]; me: Account }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch, principal, allows, audit } = useStore();
  const org = state.org;

  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');
  const [term, setTerm] = useState('');
  const [target, setTarget] = useState(1500);

  return (
    <div className="stack gap-5">
      {allows('class.create') && (
        <div className="row">
          <Button variant="primary" onClick={() => setCreating(true)}>
            {locale === 'vi' ? 'Tạo lớp mới' : 'New class'}
          </Button>
        </div>
      )}

      {classes.length === 0 ? (
        <Empty
          icon={<IconClipboard size={30} />}
          title={locale === 'vi' ? 'Chưa có lớp nào' : 'No classes yet'}
          body={
            allows('class.create')
              ? locale === 'vi'
                ? 'Tạo lớp đầu tiên, sau đó thêm học sinh vào lớp.'
                : 'Create your first class, then enrol students into it.'
              : locale === 'vi'
                ? 'Bạn chưa được phân công lớp nào. Trưởng bộ môn có thể phân công cho bạn.'
                : 'You are not assigned to any class yet. A head of programme can assign you.'
          }
        />
      ) : (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {classes.map((room) => {
            const students = studentsInClass(org, room.id);
            const tested = students.filter((s) => typeof s.lastTotal === 'number');
            const meanTotal =
              tested.length === 0
                ? null
                : Math.round(tested.reduce((acc, s) => acc + (s.lastTotal ?? 0), 0) / tested.length);

            return (
              <Card
                key={room.id}
                title={room.name}
                subtitle={room.term}
                action={
                  canForClass(principal, 'class.archive', room.id) ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconOnly
                      aria-label={locale === 'vi' ? 'Lưu trữ lớp' : 'Archive class'}
                      onClick={() => {
                        dispatch({ type: 'org/archiveClass', classId: room.id });
                        audit({ action: 'class.archived', targetId: room.id, detail: room.name });
                      }}
                    >
                      <IconTrash size={15} />
                    </Button>
                  ) : undefined
                }
              >
                <div className="stack gap-3">
                  <div className="between">
                    <span className="muted text-sm">{locale === 'vi' ? 'Sĩ số' : 'Enrolled'}</span>
                    <span className="semibold">{students.length}</span>
                  </div>
                  <div className="between">
                    <span className="muted text-sm">{locale === 'vi' ? 'Điểm TB gần nhất' : 'Mean recent score'}</span>
                    <span className="semibold">{meanTotal ?? '—'}</span>
                  </div>
                  <div className="between">
                    <span className="muted text-sm">{locale === 'vi' ? 'Mục tiêu lớp' : 'Class target'}</span>
                    <span className="semibold">{room.targetScore}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title={locale === 'vi' ? 'Tạo lớp mới' : 'New class'}
        footer={
          <>
            <Button onClick={() => setCreating(false)}>{t('common.cancel')}</Button>
            <Button
              variant="primary"
              disabled={!name.trim()}
              onClick={() => {
                const room: ClassRoom = {
                  id: uid('cls'),
                  name: name.trim(),
                  term: term.trim() || isoDate(),
                  teacherIds: [me.id],
                  studentIds: [],
                  createdAt: Date.now(),
                  archivedAt: null,
                  targetScore: target,
                };
                dispatch({ type: 'org/upsertClass', room });
                audit({ action: 'class.created', targetId: room.id, detail: room.name });
                setName('');
                setTerm('');
                setCreating(false);
              }}
            >
              {t('common.save')}
            </Button>
          </>
        }
      >
        <div className="stack gap-4">
          <Field label={locale === 'vi' ? 'Tên lớp' : 'Class name'}>
            {(id) => <input id={id} className="input" value={name} onChange={(e) => setName(e.target.value)} />}
          </Field>
          <Field label={locale === 'vi' ? 'Khoá / kỳ' : 'Term'} hint="SAT Aug 2026">
            {(id) => <input id={id} className="input" value={term} onChange={(e) => setTerm(e.target.value)} />}
          </Field>
          <Field label={locale === 'vi' ? 'Điểm mục tiêu của lớp' : 'Class target score'}>
            {(id) => (
              <input
                id={id}
                className="input"
                type="number"
                min={400}
                max={1600}
                step={10}
                value={target}
                onChange={(e) => setTarget(Number(e.target.value))}
              />
            )}
          </Field>
        </div>
      </Modal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Students                                                            */
/* ------------------------------------------------------------------ */

function StudentsPanel({
  classes,
  navigate,
}: {
  classes: ClassRoom[];
  navigate(route: Route): void;
}): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch, principal, audit } = useStore();
  const org = state.org;

  const [selectedClass, setSelectedClass] = useState<string>(classes[0]?.id ?? '');
  const [enrolling, setEnrolling] = useState(false);

  const room = classes.find((c) => c.id === selectedClass) ?? classes[0];
  const students = room ? studentsInClass(org, room.id) : [];
  const unenrolled = org.accounts.filter(
    (a) => a.role === 'student' && room && !room.studentIds.includes(a.id),
  );

  if (classes.length === 0) {
    return (
      <Empty
        title={locale === 'vi' ? 'Chưa có lớp để hiển thị học sinh' : 'No classes to show students for'}
        body={locale === 'vi' ? 'Tạo một lớp trước.' : 'Create a class first.'}
      />
    );
  }

  return (
    <div className="stack gap-5">
      <div className="row gap-3 wrap">
        <select
          className="select"
          style={{ maxWidth: 260 }}
          value={room?.id ?? ''}
          onChange={(e) => setSelectedClass(e.target.value)}
          aria-label={locale === 'vi' ? 'Chọn lớp' : 'Select class'}
        >
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        {room && canForClass(principal, 'class.edit', room.id) && (
          <Button onClick={() => setEnrolling(true)}>
            {locale === 'vi' ? 'Thêm học sinh' : 'Enrol student'}
          </Button>
        )}
      </div>

      {students.length === 0 ? (
        <Empty title={locale === 'vi' ? 'Lớp chưa có học sinh' : 'No students enrolled'} />
      ) : (
        <Card>
          <div className="scroll-x">
            <table className="table">
              <thead>
                <tr>
                  <th>{locale === 'vi' ? 'Học sinh' : 'Student'}</th>
                  <th>{locale === 'vi' ? 'Cấp độ' : 'Level'}</th>
                  <th>{locale === 'vi' ? 'Điểm gần nhất' : 'Recent score'}</th>
                  <th>{locale === 'vi' ? 'Cách mục tiêu lớp' : 'Gap to target'}</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const total = student.lastTotal ?? null;
                  const level = levelForScore(total ?? 400);
                  const gap = total === null ? null : (room?.targetScore ?? 1500) - total;
                  return (
                    <tr key={student.id}>
                      <td>
                        <div className="semibold">{student.name}</div>
                        <div className="text-xs muted">{student.email || '—'}</div>
                      </td>
                      <td>
                        <Badge tone={level === 'elite' || level === 'advanced' ? 'success' : 'primary'}>
                          {studentLevelLabel(level, locale)}
                        </Badge>
                      </td>
                      <td className="semibold">{total ?? '—'}</td>
                      <td>
                        {gap === null ? (
                          <span className="muted">—</span>
                        ) : gap <= 0 ? (
                          <span style={{ color: 'var(--success)' }}>
                            <IconCheck size={14} /> {locale === 'vi' ? 'Đạt' : 'Met'}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--warning)' }}>+{gap}</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate({ name: 'student', accountId: student.id })}
                        >
                          {locale === 'vi' ? 'Xem hồ sơ' : 'Open record'}
                        </Button>
                        {room && canForClass(principal, 'class.edit', room.id) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              dispatch({ type: 'org/unenroll', classId: room.id, studentId: student.id });
                              audit({ action: 'student.removed', targetId: student.id, detail: room.name });
                            }}
                          >
                            {locale === 'vi' ? 'Gỡ khỏi lớp' : 'Remove'}
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Card
        title={locale === 'vi' ? 'Phân bố cấp độ trong lớp' : 'Level distribution'}
        subtitle={
          locale === 'vi'
            ? 'Cấp độ được tính từ điểm đo được, không do giáo viên gán.'
            : 'Levels are earned from measured scores, not assigned by a teacher.'
        }
      >
        <MasteryBars
          rows={STUDENT_LEVELS.map((level) => {
            const count = students.filter((s) => levelForScore(s.lastTotal ?? 400) === level).length;
            return {
              label: studentLevelLabel(level, locale),
              value: students.length === 0 ? 0 : count / students.length,
              meta: `${count} ${locale === 'vi' ? 'học sinh' : 'students'} · ≥ ${STUDENT_LEVEL_SPECS[level].minTotal}`,
            };
          })}
        />
      </Card>

      <Modal
        open={enrolling}
        onClose={() => setEnrolling(false)}
        title={locale === 'vi' ? 'Thêm học sinh vào lớp' : 'Enrol a student'}
      >
        {unenrolled.length === 0 ? (
          <p className="muted">
            {locale === 'vi'
              ? 'Không còn tài khoản học sinh nào ngoài lớp này. Tạo tài khoản ở tab Nhân sự.'
              : 'No student accounts remain outside this class. Create one under People.'}
          </p>
        ) : (
          <ul className="stack gap-2" style={{ listStyle: 'none', paddingBottom: 'var(--space-4)' }}>
            {unenrolled.map((student) => (
              <li key={student.id} className="between">
                <span>{student.name}</span>
                <Button
                  size="sm"
                  onClick={() => {
                    if (!room) return;
                    dispatch({ type: 'org/enroll', classId: room.id, studentId: student.id });
                    audit({ action: 'student.enrolled', targetId: student.id, detail: room.name });
                  }}
                >
                  {locale === 'vi' ? 'Thêm' : 'Enrol'}
                </Button>
              </li>
            ))}
          </ul>
        )}
        <div style={{ paddingBottom: 'var(--space-4)' }}>
          <Button onClick={() => setEnrolling(false)}>{t('common.close')}</Button>
        </div>
      </Modal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Assignments                                                         */
/* ------------------------------------------------------------------ */

function AssignmentsPanel({ classes, me }: { classes: ClassRoom[]; me: Account }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch, allows, audit } = useStore();
  const org = state.org;

  const [creating, setCreating] = useState(false);
  const [classId, setClassId] = useState(classes[0]?.id ?? '');
  const [title, setTitle] = useState('');
  const [kind, setKind] = useState<Assignment['kind']>('practice');
  const [dueDate, setDueDate] = useState(addDays(isoDate(), 7));
  const [count, setCount] = useState(20);

  const rows = classes.flatMap((room) =>
    assignmentsForClass(org, room.id).map((assignment) => ({ assignment, room })),
  );

  return (
    <div className="stack gap-5">
      {allows('assignment.create') && classes.length > 0 && (
        <div className="row">
          <Button variant="primary" onClick={() => setCreating(true)}>
            {locale === 'vi' ? 'Giao bài mới' : 'New assignment'}
          </Button>
        </div>
      )}

      {rows.length === 0 ? (
        <Empty
          icon={<IconClipboard size={30} />}
          title={locale === 'vi' ? 'Chưa giao bài nào' : 'No assignments yet'}
          body={
            allows('assignment.create')
              ? locale === 'vi'
                ? 'Giao bài để học sinh thấy trong kế hoạch học của họ.'
                : 'Set work and it appears in each student’s plan.'
              : locale === 'vi'
                ? 'Cấp trợ giảng có thể chấm bài nhưng chưa được giao bài mới.'
                : 'A teaching assistant can grade work but not create it.'
          }
        />
      ) : (
        <Card>
          <div className="scroll-x">
            <table className="table">
              <thead>
                <tr>
                  <th>{locale === 'vi' ? 'Bài giao' : 'Assignment'}</th>
                  <th>{locale === 'vi' ? 'Lớp' : 'Class'}</th>
                  <th>{locale === 'vi' ? 'Hạn nộp' : 'Due'}</th>
                  <th>{locale === 'vi' ? 'Đã nộp' : 'Submitted'}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ assignment, room }) => {
                  const overdue = assignment.dueDate < isoDate();
                  return (
                    <tr key={assignment.id}>
                      <td>
                        <div className="semibold">{assignment.title}</div>
                        <div className="text-xs muted">
                          {assignment.kind}
                          {assignment.questionCount ? ` · ${assignment.questionCount} ${t('common.questions')}` : ''}
                        </div>
                      </td>
                      <td>{room.name}</td>
                      <td>
                        <span style={overdue ? { color: 'var(--danger)' } : undefined}>
                          {formatDate(assignment.dueDate, locale)}
                        </span>
                      </td>
                      <td className="semibold">
                        {assignment.submittedBy.length}/{room.studentIds.length}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title={locale === 'vi' ? 'Giao bài mới' : 'New assignment'}
        footer={
          <>
            <Button onClick={() => setCreating(false)}>{t('common.cancel')}</Button>
            <Button
              variant="primary"
              disabled={!title.trim() || !classId}
              onClick={() => {
                const assignment: Assignment = {
                  id: uid('asg'),
                  classId,
                  createdBy: me.id,
                  createdAt: Date.now(),
                  title: title.trim(),
                  kind,
                  dueDate,
                  questionCount: kind === 'practice' ? count : undefined,
                  submittedBy: [],
                };
                dispatch({ type: 'org/upsertAssignment', assignment });
                audit({ action: 'assignment.created', targetId: assignment.id, detail: assignment.title });
                setTitle('');
                setCreating(false);
              }}
            >
              {t('common.save')}
            </Button>
          </>
        }
      >
        <div className="stack gap-4">
          <Field label={locale === 'vi' ? 'Tiêu đề' : 'Title'}>
            {(id) => <input id={id} className="input" value={title} onChange={(e) => setTitle(e.target.value)} />}
          </Field>
          <Field label={locale === 'vi' ? 'Lớp' : 'Class'}>
            {(id) => (
              <select id={id} className="select" value={classId} onChange={(e) => setClassId(e.target.value)}>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
          </Field>
          <Field label={locale === 'vi' ? 'Loại' : 'Kind'}>
            {(id) => (
              <select
                id={id}
                className="select"
                value={kind}
                onChange={(e) => setKind(e.target.value as Assignment['kind'])}
              >
                <option value="practice">{locale === 'vi' ? 'Luyện tập' : 'Practice'}</option>
                <option value="section-test">{t('exam.sectionTest')}</option>
                <option value="full-test">{t('exam.fullTest')}</option>
                <option value="vocab">{t('nav.vocab')}</option>
                <option value="review">{t('nav.review')}</option>
              </select>
            )}
          </Field>
          {kind === 'practice' && (
            <Field label={t('practice.length')}>
              {(id) => (
                <input
                  id={id}
                  className="input"
                  type="number"
                  min={5}
                  max={60}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                />
              )}
            </Field>
          )}
          <Field label={locale === 'vi' ? 'Hạn nộp' : 'Due date'}>
            {(id) => (
              <input id={id} className="input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            )}
          </Field>
        </div>
      </Modal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */

function PeoplePanel({ me }: { me: Account }): React.ReactElement {
  const t = useT();
  const locale = useLocale();
  const { state, dispatch, allows, audit } = useStore();
  const org = state.org;

  const [inviting, setInviting] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<RoleId>('student');
  const [rank, setRank] = useState<TeacherRank>('assistant');

  const myRank = me.rank ?? 'assistant';

  return (
    <div className="stack gap-5">
      <div className="row">
        <Button variant="primary" onClick={() => setInviting(true)}>
          {locale === 'vi' ? 'Thêm tài khoản' : 'Add account'}
        </Button>
      </div>

      <Card
        title={locale === 'vi' ? 'Tài khoản trong tổ chức' : 'Accounts'}
        subtitle={
          locale === 'vi'
            ? 'Chỉ trưởng bộ môn mới đổi được cấp của giáo viên khác, và không thể nâng ai cao hơn chính mình.'
            : 'Only a head of programme can change another teacher’s rank, and never above their own.'
        }
      >
        <div className="scroll-x">
          <table className="table">
            <thead>
              <tr>
                <th>{locale === 'vi' ? 'Tên' : 'Name'}</th>
                <th>{locale === 'vi' ? 'Vai trò' : 'Role'}</th>
                <th>{locale === 'vi' ? 'Cấp' : 'Rank'}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {org.accounts.map((account) => (
                <tr key={account.id}>
                  <td>
                    <div className="semibold">
                      {account.name}
                      {account.id === me.id && (
                        <span className="muted text-xs"> · {locale === 'vi' ? 'bạn' : 'you'}</span>
                      )}
                    </div>
                    <div className="text-xs muted">{account.email || '—'}</div>
                  </td>
                  <td>{roleLabel(account.role, locale)}</td>
                  <td>
                    {account.role === 'teacher' && account.rank ? (
                      allows('teacher.promote') && account.id !== me.id ? (
                        <select
                          className="select"
                          style={{ minHeight: 30, padding: '2px 8px' }}
                          value={account.rank}
                          aria-label={`${account.name} rank`}
                          onChange={(e) => {
                            const next = e.target.value as TeacherRank;
                            // A teacher may never grant a rank above their own.
                            if (!rankAtLeast(myRank, next)) return;
                            dispatch({ type: 'org/setRank', accountId: account.id, rank: next });
                            audit({
                              action: 'teacher.rank.changed',
                              targetId: account.id,
                              detail: `${account.rank} → ${next}`,
                            });
                          }}
                        >
                          {TEACHER_RANK_ORDER.filter((r) => rankAtLeast(myRank, r)).map((r) => (
                            <option key={r} value={r}>{rankLabel(r, locale)}</option>
                          ))}
                        </select>
                      ) : (
                        rankLabel(account.rank, locale)
                      )
                    ) : (
                      <span className="muted">—</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {account.id !== me.id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dispatch({ type: 'org/removeAccount', accountId: account.id })}
                      >
                        {t('common.delete')}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <PermissionMatrix me={me} />

      <Modal
        open={inviting}
        onClose={() => setInviting(false)}
        title={locale === 'vi' ? 'Thêm tài khoản' : 'Add account'}
        footer={
          <>
            <Button onClick={() => setInviting(false)}>{t('common.cancel')}</Button>
            <Button
              variant="primary"
              disabled={!name.trim()}
              onClick={() => {
                const account: Account = {
                  id: uid('acc'),
                  name: name.trim(),
                  email: email.trim(),
                  role,
                  rank: role === 'teacher' ? rank : undefined,
                  createdAt: Date.now(),
                  suspendedAt: null,
                  level: 'foundation',
                  lastTotal: null,
                };
                dispatch({ type: 'org/upsertAccount', account });
                audit({
                  action: role === 'teacher' ? 'teacher.invited' : 'student.enrolled',
                  targetId: account.id,
                  detail: `${account.name} (${role})`,
                });
                setName('');
                setEmail('');
                setInviting(false);
              }}
            >
              {t('common.save')}
            </Button>
          </>
        }
      >
        <div className="stack gap-4">
          <Field label={locale === 'vi' ? 'Họ tên' : 'Name'}>
            {(id) => <input id={id} className="input" value={name} onChange={(e) => setName(e.target.value)} />}
          </Field>
          <Field label="Email">
            {(id) => (
              <input id={id} className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            )}
          </Field>
          <Field label={locale === 'vi' ? 'Vai trò' : 'Role'}>
            {(id) => (
              <select id={id} className="select" value={role} onChange={(e) => setRole(e.target.value as RoleId)}>
                <option value="student">{roleLabel('student', locale)}</option>
                <option value="teacher">{roleLabel('teacher', locale)}</option>
              </select>
            )}
          </Field>
          {role === 'teacher' && (
            <Field
              label={locale === 'vi' ? 'Cấp giáo viên' : 'Teacher rank'}
              hint={
                locale === 'vi'
                  ? 'Bạn chỉ có thể cấp bằng hoặc thấp hơn cấp của mình.'
                  : 'You can only grant a rank at or below your own.'
              }
            >
              {(id) => (
                <select id={id} className="select" value={rank} onChange={(e) => setRank(e.target.value as TeacherRank)}>
                  {TEACHER_RANK_ORDER.filter((r) => rankAtLeast(myRank, r)).map((r) => (
                    <option key={r} value={r}>{rankLabel(r, locale)}</option>
                  ))}
                </select>
              )}
            </Field>
          )}
        </div>
      </Modal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Audit                                                               */
/* ------------------------------------------------------------------ */

function AuditPanel(): React.ReactElement {
  const locale = useLocale();
  const { state } = useStore();
  const org = state.org;

  if (org.audit.length === 0) {
    return <Empty title={locale === 'vi' ? 'Nhật ký trống' : 'Audit log is empty'} />;
  }

  return (
    <Card
      title={locale === 'vi' ? 'Nhật ký hành động có đặc quyền' : 'Privileged action log'}
      subtitle={
        locale === 'vi'
          ? 'Mọi thao tác chạm vào dữ liệu người khác hoặc thay đổi quyền đều được ghi lại.'
          : 'Every action touching another person’s data or changing permissions is recorded.'
      }
    >
      <div className="scroll-x">
        <table className="table">
          <thead>
            <tr>
              <th>{locale === 'vi' ? 'Thời điểm' : 'When'}</th>
              <th>{locale === 'vi' ? 'Người thực hiện' : 'Actor'}</th>
              <th>{locale === 'vi' ? 'Hành động' : 'Action'}</th>
              <th>{locale === 'vi' ? 'Chi tiết' : 'Detail'}</th>
            </tr>
          </thead>
          <tbody>
            {org.audit.slice(0, 100).map((entry) => (
              <tr key={entry.id}>
                <td className="mono text-xs">
                  {new Date(entry.at).toLocaleString(locale === 'vi' ? 'vi-VN' : 'en-US')}
                </td>
                <td>{accountById(org, entry.actorId)?.name ?? entry.actorId}</td>
                <td><Badge>{entry.action}</Badge></td>
                <td className="muted">{entry.detail ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Permission matrix                                                   */
/* ------------------------------------------------------------------ */

const MATRIX_PERMISSIONS: Permission[] = [
  'roster.view',
  'student.analytics.view',
  'student.responses.view',
  'assignment.create',
  'assignment.grade',
  'class.create',
  'class.edit',
  'class.archive',
  'bank.author',
  'bank.publish',
  'teacher.invite',
  'teacher.promote',
  'report.export',
  'audit.view',
];

function PermissionMatrix({ me }: { me: Account }): React.ReactElement {
  const locale = useLocale();
  const { principal } = useStore();
  const held = permissionsFor(principal);
  const standing = me.rank ? rankLabel(me.rank, locale).toLowerCase() : roleLabel(me.role, locale).toLowerCase();

  return (
    <Card
      title={locale === 'vi' ? 'Quyền của bạn' : 'Your permissions'}
      subtitle={
        locale === 'vi' ? `Được suy ra từ cấp ${standing}.` : `Derived from your ${standing} standing.`
      }
    >
      <ul
        className="grid"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', listStyle: 'none' }}
      >
        {MATRIX_PERMISSIONS.map((permission) => {
          const has = held.has(permission);
          return (
            <li key={permission} className="row gap-2 text-sm">
              <span style={{ color: has ? 'var(--success)' : 'var(--text-muted)', flex: 'none' }}>
                {has ? <IconCheck size={15} /> : <IconAlert size={15} />}
              </span>
              <span className={has ? undefined : 'muted'}>{permissionLabel(permission, locale)}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
