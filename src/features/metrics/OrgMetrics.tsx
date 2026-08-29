/**
 * Organisation metrics.
 *
 * The executive role exists to see the organisation rather than the people in
 * it, and this is the surface that makes that real. Adding `metrics.aggregate`
 * without building it would have repeated a mistake this codebase has already
 * corrected once: a permission nobody can exercise has never been tested, and
 * a role defined only by what it cannot do is not a role.
 *
 * Two rules shape what is shown.
 *
 * **No individual is identifiable here.** Not one learner is named, and a
 * cohort smaller than the disclosure floor is reported as suppressed rather
 * than as a number — with four students in a class, a "75% met benchmark"
 * figure identifies three of them to anyone who knows the fourth. Aggregation
 * is only privacy-preserving when the group is large enough to hide in.
 *
 * **Every figure says what it is computed from.** There is no server, so these
 * are the records on this device, not the organisation's true totals. A
 * director reading a dashboard needs to know it is a sample of one device
 * before they act on it, not after.
 */

import React, { useMemo } from 'react';
import { studentLevelLabel } from '../../auth/roles.ts';
import { DISCLOSURE_FLOOR, organisationMetrics } from '../../engine/orgMetrics.ts';
import { useStore } from '../../state/store.tsx';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Button, Card, Empty } from '../../components/ui/primitives.tsx';
import { MasteryBars } from '../../components/charts/charts.tsx';
import { IconAlert, IconChart } from '../../components/ui/icons.tsx';
import type { Route } from '../shell/routes.ts';

export function OrgMetrics({ navigate }: { navigate(route: Route): void }): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const { state, allows } = useStore();
  const org = state.org;

  const metrics = useMemo(() => organisationMetrics(org), [org]);

  if (!allows('metrics.aggregate')) {
    return (
      <div className="page">
        <Empty
          icon={<IconAlert size={30} />}
          title={vi ? 'Không có quyền xem chỉ số tổ chức' : 'No access to organisation metrics'}
          body={
            vi
              ? 'Chỉ các vai trò điều hành mới xem được mục này.'
              : 'Only the operating roles can read this view.'
          }
          action={<Button onClick={() => navigate({ name: 'dashboard' })}>{vi ? 'Quay lại' : 'Back'}</Button>}
        />
      </div>
    );
  }

  return (
    <div className="page stack gap-6">
      <header className="page-head">
        <h1 className="page-title">{vi ? 'Chỉ số tổ chức' : 'Organisation metrics'}</h1>
        <p className="page-sub">
          {vi
            ? 'Nhìn tổ chức ở mức tổng hợp. Không có học sinh nào được nêu tên ở đây.'
            : 'The organisation in aggregate. No individual learner is named on this page.'}
        </p>
      </header>

      {/*
        The caveat comes before the numbers, because a reader who meets the
        numbers first will have formed a view before reaching the limits.
      */}
      <div className="escalation" data-severity="attention">
        <IconAlert size={20} />
        <div>
          <strong>{vi ? 'Những con số này tính từ đâu' : 'What these figures are computed from'}</strong>
          <p>
            {vi
              ? `SAT365 không có máy chủ, nên đây là các bản ghi trên đúng thiết bị này — không phải tổng số thật của tổ chức. Ngoài ra, nhóm nhỏ hơn ${DISCLOSURE_FLOOR} học sinh được báo là "chưa đủ để công bố" thay vì hiện tỉ lệ: với bốn học sinh, một con số phần trăm chính là mô tả từng em một.`
              : `SAT365 has no server, so these are the records held on this device rather than the organisation’s true totals. Cohorts smaller than ${DISCLOSURE_FLOOR} are reported as suppressed rather than as a percentage: with four students, a percentage is a description of named individuals wearing a percent sign.`}
          </p>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Học sinh' : 'Students'}</div>
          <div className="kpi-value">{metrics.students}</div>
          <div className="kpi-foot">
            {metrics.scored} {vi ? 'đã có điểm đồng bộ' : 'with a synced score'}
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Lớp đang mở' : 'Active classes'}</div>
          <div className="kpi-value">{metrics.classes}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Nhân sự' : 'Staff'}</div>
          <div className="kpi-value">{metrics.staff}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">{vi ? 'Điểm trung bình' : 'Mean score'}</div>
          <div className="kpi-value">
            {metrics.meanTotal.reportable ? metrics.meanTotal.value : '—'}
          </div>
          <div className="kpi-foot">
            {!metrics.meanTotal.reportable
              ? vi
                ? `Chưa đủ ${DISCLOSURE_FLOOR} điểm để công bố`
                : `Fewer than ${DISCLOSURE_FLOOR} scores — suppressed`
              : vi
                ? `trên ${metrics.scored} học sinh`
                : `across ${metrics.scored} students`}
          </div>
        </div>
      </div>

      <Card
        title={vi ? 'Phân bố theo cấp độ học sinh' : 'Distribution by student level'}
        subtitle={
          vi
            ? 'Cấp độ do điểm đạt được quyết định, không do ai gán.'
            : 'A level is earned by score, never assigned by a person.'
        }
      >
        {!metrics.levelMix.reportable ? (
          <p className="muted">
            {vi
              ? `Chưa đủ ${DISCLOSURE_FLOOR} học sinh có điểm để công bố phân bố. Đây là "được giữ kín", không phải "không có dữ liệu".`
              : `Fewer than ${DISCLOSURE_FLOOR} scored students — suppressed. That is "withheld", not "no data".`}
          </p>
        ) : (
          <MasteryBars
            rows={metrics.levelMix.value.map((row) => ({
              label: studentLevelLabel(row.level, locale),
              value: row.share,
              meta: `${row.count}`,
            }))}
          />
        )}
      </Card>

      <Card
        title={vi ? 'Theo lớp' : 'By class'}
        subtitle={
          vi
            ? 'Không có tên học sinh nào ở đây, theo thiết kế.'
            : 'No learner is named here, by design.'
        }
      >
        {metrics.classRows.length === 0 ? (
          <Empty icon={<IconChart size={28} />} title={vi ? 'Chưa có lớp nào' : 'No classes yet'} />
        ) : (
          <div className="scroll-x">
            <table className="table">
              <thead>
                <tr>
                  <th>{vi ? 'Lớp' : 'Class'}</th>
                  <th>{vi ? 'Sĩ số' : 'Size'}</th>
                  <th>{vi ? 'Mục tiêu' : 'Target'}</th>
                  <th>{vi ? 'Đạt mục tiêu' : 'Meeting target'}</th>
                </tr>
              </thead>
              <tbody>
                {metrics.classRows.map((row) => (
                  <tr key={row.id}>
                    <td className="semibold">{row.name}</td>
                    <td>{row.size}</td>
                    <td>{row.target}</td>
                    <td>
                      {!row.meetingTarget.reportable ? (
                        <Badge>
                          {vi ? `Chưa đủ ${DISCLOSURE_FLOOR} để công bố` : `Under ${DISCLOSURE_FLOOR} — suppressed`}
                        </Badge>
                      ) : (
                        `${Math.round(row.meetingTarget.value * 100)}%`
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title={vi ? 'Hoạt động quản trị' : 'Administrative activity'}>
        <div className="row gap-3 wrap">
          <Badge tone="info">
            {metrics.assignments} {vi ? 'bài đã giao' : 'assignments set'}
          </Badge>
          <Badge tone="info">
            {metrics.auditEntries} {vi ? 'mục nhật ký kiểm toán' : 'audit entries'}
          </Badge>
        </div>
      </Card>
    </div>
  );
}
