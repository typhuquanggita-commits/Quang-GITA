/**
 * The SAT calendar.
 *
 * The screen is built around one asymmetry: a learner who registers a week
 * early loses nothing, and a learner who misses a deadline loses a whole
 * sitting. So the advised registration date is given more prominence than the
 * deadline, and the deadline is shown with the time-zone trap attached rather
 * than as a bare date — 23:59 US Eastern is late morning the next day in Việt
 * Nam, and treating local midnight as the cut-off is the ordinary way a place
 * is lost.
 *
 * Every derived field is labelled on the row it appears in, not in a footnote.
 * A learner acting on a date needs to know how that date was arrived at at the
 * moment they read it.
 */

import React, { useMemo } from 'react';
import {
  ADMINISTRATIONS,
  VERIFY_NOTE,
  VIETNAM_DEADLINE_NOTE,
  checkTestDate,
  countdown,
  nextAdministration,
  nextOpenAdministration,
  registerBy,
  statusOf,
  type Administration,
  type RegistrationStatus,
} from '../../data/testDates.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Button, Card } from '../../components/ui/primitives.tsx';
import { IconAlert, IconCalendar, IconCheck, IconClock } from '../../components/ui/icons.tsx';
import { formatDate, isoDate } from '../../lib/util.ts';
import type { Route } from '../shell/routes.ts';

const STATUS: Record<RegistrationStatus, { en: string; vi: string; tone: 'success' | 'warning' | 'danger' | 'default' }> = {
  open: { en: 'Registration open', vi: 'Đang mở đăng ký', tone: 'success' },
  'late-only': { en: 'Late registration only', vi: 'Chỉ còn đăng ký muộn', tone: 'warning' },
  closed: { en: 'Registration closed', vi: 'Đã đóng đăng ký', tone: 'danger' },
  sat: { en: 'Sat — awaiting scores', vi: 'Đã thi — chờ điểm', tone: 'default' },
  'scores-out': { en: 'Scores released', vi: 'Đã trả điểm', tone: 'default' },
};

function Provenance({ derived, vi }: { derived: boolean; vi: boolean }): React.ReactElement | null {
  if (!derived) return null;
  return (
    <span className="date-derived" title={vi ? 'Suy ra từ quy luật đã công bố' : 'Derived from the published pattern'}>
      {vi ? 'suy ra' : 'derived'}
    </span>
  );
}

function AdminRow({
  admin,
  today,
  vi,
  locale,
  isMine,
}: {
  admin: Administration;
  today: string;
  vi: boolean;
  locale: 'vi' | 'en';
  isMine: boolean;
}): React.ReactElement {
  const status = statusOf(admin, today);
  const label = STATUS[status];

  return (
    <tr data-mine={isMine || undefined}>
      <th scope="row">
        {formatDate(admin.testDate, locale)}
        <Provenance derived={admin.provenance.testDate === 'derived'} vi={vi} />
        {isMine && <Badge tone="primary">{vi ? 'Ngày của bạn' : 'Your date'}</Badge>}
      </th>
      <td>
        {formatDate(registerBy(admin), locale)}
        <span className="block text-xs muted">{vi ? 'nên đăng ký trước' : 'register by'}</span>
      </td>
      <td>
        {formatDate(admin.registrationDeadline, locale)}
        <Provenance derived={admin.provenance.registrationDeadline === 'derived'} vi={vi} />
      </td>
      <td>
        {formatDate(admin.lateRegistrationDeadline, locale)}
        <Provenance derived={admin.provenance.lateRegistrationDeadline === 'derived'} vi={vi} />
      </td>
      <td>
        {formatDate(admin.scoreRelease, locale)}
        <Provenance derived={admin.provenance.scoreRelease === 'derived'} vi={vi} />
      </td>
      <td>
        <Badge tone={label.tone}>{vi ? label.vi : label.en}</Badge>
      </td>
    </tr>
  );
}

export function TestDates({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state, dispatch } = useStore();
  const today = isoDate();

  const mine = state.profile.testDate;
  const check = useMemo(() => checkTestDate(mine, today), [mine, today]);
  const next = nextAdministration(today);
  const nextOpen = nextOpenAdministration(today);
  const mineCountdown = check.administration ? countdown(check.administration, today) : null;

  return (
    <div className="page stack gap-5">
      <header className="page-head">
        <h1 className="page-title">{vi ? 'Lịch thi SAT' : 'SAT test dates'}</h1>
        <p className="page-sub">
          {vi
            ? 'Kỳ thi, hạn đăng ký và ngày trả điểm — kèm nguồn gốc của từng mốc. Thí sinh quốc tế thi cùng ngày với Mỹ, có thêm phụ phí khu vực.'
            : 'Administrations, deadlines and score releases, each labelled with where it came from. International candidates sit the same dates as the US, at an added regional fee.'}
        </p>
      </header>

      {/* The date the learner has set, checked against reality. */}
      {check.message && (
        <div className="escalation" data-severity="urgent">
          <IconAlert size={18} />
          <div>
            <strong>{vi ? 'Ngày thi bạn đặt không có kỳ thi nào' : 'No SAT runs on the date you set'}</strong>
            <p>{vi ? check.message.vi : check.message.en}</p>
            <div className="row gap-2 wrap" style={{ marginTop: 'var(--space-3)' }}>
              {check.nearest.map((admin) => (
                <Button
                  key={admin.id}
                  size="sm"
                  onClick={() =>
                    dispatch({ type: 'profile/update', patch: { testDate: admin.testDate } })
                  }
                >
                  {vi ? 'Đổi sang ' : 'Move to '}
                  {formatDate(admin.testDate, locale)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {mineCountdown && (
        <Card title={vi ? 'Kỳ thi của bạn' : 'Your sitting'}>
          <div className="report-scores">
            <div className="report-score">
              <span className="report-score-label">{vi ? 'Ngày thi' : 'Test date'}</span>
              <strong>{formatDate(mineCountdown.administration.testDate, locale)}</strong>
              <span className="muted text-xs">
                {mineCountdown.daysToTest} {vi ? 'ngày nữa' : 'days away'}
              </span>
            </div>
            <div className="report-score">
              <span className="report-score-label">{vi ? 'Nên đăng ký trước' : 'Register by'}</span>
              <strong>{formatDate(registerBy(mineCountdown.administration), locale)}</strong>
              <span className="muted text-xs">
                {mineCountdown.daysToAdvisedRegistration >= 0
                  ? vi
                    ? `còn ${mineCountdown.daysToAdvisedRegistration} ngày`
                    : `${mineCountdown.daysToAdvisedRegistration} days left`
                  : vi
                    ? 'đã qua mốc khuyến nghị'
                    : 'past the advised date'}
              </span>
            </div>
            <div className="report-score">
              <span className="report-score-label">{vi ? 'Hạn đăng ký' : 'Deadline'}</span>
              <strong>{formatDate(mineCountdown.administration.registrationDeadline, locale)}</strong>
              <span className="muted text-xs">23:59 ET</span>
            </div>
            <div className="report-score">
              <span className="report-score-label">{vi ? 'Trả điểm' : 'Scores'}</span>
              <strong>{formatDate(mineCountdown.administration.scoreRelease, locale)}</strong>
            </div>
          </div>

          {mineCountdown.daysToTest <= 28 && (
            <div className="escalation" data-severity="attention" style={{ marginTop: 'var(--space-4)' }}>
              <IconClock size={18} />
              <div>
                <strong>{vi ? 'Dưới bốn tuần — chuyển sang khoá Nước rút' : 'Inside four weeks — switch to the sprint'}</strong>
                <p>
                  {vi
                    ? 'Nội dung mới gặp lúc này sẽ được mang vào phòng thi khi chưa kịp thành phản xạ. Khoá Nước rút cố ý không dạy gì mới: đọc vị dưới áp lực thời gian, rồi tổng duyệt.'
                    : 'A method met now is carried into the hall unrehearsed. The sprint course teaches nothing new on purpose: recognition under time, then rehearsal.'}
                </p>
                <Button size="sm" onClick={() => navigate({ name: 'curriculum' })} style={{ marginTop: 'var(--space-2)' }}>
                  {vi ? 'Mở đề cương Nước rút' : 'Open the sprint syllabus'}
                </Button>
              </div>
            </div>
          )}
        </Card>
      )}

      {!mine && next && (
        <Card title={vi ? 'Bạn chưa đặt ngày thi' : 'You have not set a test date'}>
          <p className="secondary">
            {vi
              ? 'Kế hoạch học, việc xếp khoá và phiếu báo phụ huynh đều dựng từ ngày thi. Chưa có ngày thì hệ thống không lập lịch ngược lại được.'
              : 'The study plan, the course placement and the guardian report are all built backwards from the test date. Without one, nothing can be scheduled.'}
          </p>
          <div className="row gap-2 wrap" style={{ marginTop: 'var(--space-3)' }}>
            {ADMINISTRATIONS.filter((a) => statusOf(a, today) === 'open')
              .slice(0, 3)
              .map((admin) => (
                <Button
                  key={admin.id}
                  variant={admin.id === nextOpen?.id ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => dispatch({ type: 'profile/update', patch: { testDate: admin.testDate } })}
                >
                  {formatDate(admin.testDate, locale)}
                </Button>
              ))}
          </div>
        </Card>
      )}

      <Card
        title={vi ? 'Toàn bộ lịch thi' : 'The full calendar'}
        subtitle={vi ? VIETNAM_DEADLINE_NOTE.vi : VIETNAM_DEADLINE_NOTE.en}
      >
        <div className="scroll-x">
          <table className="table dates-table">
            <thead>
              <tr>
                <th scope="col">{vi ? 'Ngày thi' : 'Test date'}</th>
                <th scope="col">{vi ? 'Nên đăng ký trước' : 'Register by'}</th>
                <th scope="col">{vi ? 'Hạn thường' : 'Deadline'}</th>
                <th scope="col">{vi ? 'Hạn muộn' : 'Late deadline'}</th>
                <th scope="col">{vi ? 'Trả điểm' : 'Scores'}</th>
                <th scope="col">{vi ? 'Trạng thái' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {ADMINISTRATIONS.map((admin) => (
                <AdminRow
                  key={admin.id}
                  admin={admin}
                  today={today}
                  vi={vi}
                  locale={locale}
                  isMine={admin.testDate === mine}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="escalation" data-severity="info" style={{ marginTop: 'var(--space-4)' }}>
          <IconCheck size={18} />
          <div>
            <strong>{vi ? 'Về những mốc ghi "suy ra"' : 'About the fields marked derived'}</strong>
            <p>{vi ? VERIFY_NOTE.vi : VERIFY_NOTE.en}</p>
          </div>
        </div>

        {ADMINISTRATIONS.some((a) => a.noteVi) && (
          <ul className="report-limits" style={{ marginTop: 'var(--space-4)' }}>
            {ADMINISTRATIONS.filter((a) => a.noteVi).map((admin) => (
              <li key={admin.id}>
                <IconCalendar size={15} />
                <span>
                  <strong>{formatDate(admin.testDate, locale)}</strong> —{' '}
                  {vi ? admin.noteVi : admin.note}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
