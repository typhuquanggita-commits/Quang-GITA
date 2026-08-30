/**
 * Programmes and fees, as a table a centre can hand over.
 *
 * The banner at the top is not decoration. While `PRICING.confirmed` is false
 * every figure on this page is a market reference rate rather than a price,
 * and a table of plausible numbers with no label on it is exactly how a wrong
 * price reaches a parent. The label is read from one function so this page and
 * the public one cannot drift apart.
 *
 * Fees are derived from the syllabus rather than typed: a package total is the
 * session rate times the session count of the course it belongs to. A total
 * typed separately survives the course being shortened, and a fee that no
 * longer matches the sessions delivered is the complaint that ends a
 * relationship with a family.
 */

import React, { useMemo, useState } from 'react';
import { COURSES } from '../../data/curriculum.ts';
import { PRICING, feeLabel, formatVnd, quote, type DeliveryId } from '../../data/pricing.ts';
import { buildCoursePlan } from '../../engine/curriculum.ts';
import { useLocale } from '../../i18n/index.ts';
import { Badge, Button, Card, Segmented } from '../../components/ui/primitives.tsx';
import { DocumentFrame } from '../../brand/DocumentFrame.tsx';
import { IconAlert, IconCheck, IconPrint } from '../../components/ui/icons.tsx';
import { formatDate, isoDate } from '../../lib/util.ts';

export function Programmes(): React.ReactElement {
  const locale = useLocale();
  const vi = locale === 'vi';
  const [delivery, setDelivery] = useState<DeliveryId>('group');

  const label = feeLabel();
  const mode = PRICING.deliveries.find((d) => d.id === delivery)!;

  const rows = useMemo(
    () =>
      COURSES.map((course) => {
        const plan = buildCoursePlan(course.id)!;
        return {
          course,
          plan,
          q: quote(course.id, delivery, plan.totalSessions, course.sessionMinutes),
        };
      }),
    [delivery],
  );

  const limits = vi
    ? `${label.vi} Số buổi lấy từ đề cương đã công bố; đơn vị phải học lại vì chưa đạt mốc kiểm tra được tính thêm theo đúng đơn giá buổi. Không có cam kết điểm số nào ở đây, và không trung tâm trung thực nào cam kết được điều đó.`
    : `${label.en} Session counts come from the published syllabus; a unit repeated for a failed checkpoint is charged at the same session rate. No score is guaranteed here, and no honest centre guarantees one.`;

  return (
    <div className="page stack gap-5">
      <header className="page-head no-print">
        <h1 className="page-title">{vi ? 'Chương trình và học phí' : 'Programmes and fees'}</h1>
        <p className="page-sub">
          {vi
            ? 'Mỗi gói gắn với một đề cương công khai: bạn biết trước bao nhiêu buổi, học gì theo thứ tự nào, và mốc kiểm tra ở đâu.'
            : 'Every package is tied to a published syllabus: how many sessions, what is taught in what order, and where the checkpoints sit.'}
        </p>
      </header>

      {!PRICING.confirmed && (
        <div className="escalation no-print" data-severity="attention">
          <IconAlert size={18} />
          <div>
            <strong>{vi ? 'Chưa phải bảng giá chính thức' : 'Not a published price list'}</strong>
            <p>{vi ? label.vi : label.en}</p>
          </div>
        </div>
      )}

      <div className="row gap-3 wrap between no-print">
        <Segmented
          value={delivery}
          onChange={(next: DeliveryId) => setDelivery(next)}
          ariaLabel={vi ? 'Hình thức học' : 'Delivery mode'}
          options={PRICING.deliveries.map((d) => ({ value: d.id, label: vi ? d.nameVi : d.name }))}
        />
        <Button onClick={() => window.print()}>
          <IconPrint size={15} /> {vi ? 'In bảng chương trình' : 'Print the programme list'}
        </Button>
      </div>

      <DocumentFrame
        kind={vi ? 'Bảng chương trình và học phí' : 'Programmes and fees'}
        title={vi ? mode.nameVi : mode.name}
        pillar="goal"
        date={formatDate(isoDate(), locale)}
        reference={`fees-${delivery}-${PRICING.referenceDate}`}
        locale={locale}
        limits={limits}
      >
        <div className="stack gap-5">
          <div>
            <p className="lead">{vi ? mode.suitsVi : mode.suits}</p>
            {mode.sizeVi && (
              <Badge tone="info">{vi ? mode.sizeVi : mode.size}</Badge>
            )}
          </div>

          <Card level={2} title={vi ? 'Gói bao gồm' : 'What the package includes'}>
            <ul className="report-actions">
              {(vi ? mode.includesVi : mode.includes).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card
            level={2}
            title={vi ? 'Học phí theo khoá' : 'Fees by course'}
            subtitle={
              vi
                ? 'Tổng = đơn giá buổi × số buổi trong đề cương. Đơn giá theo giờ được tính ra để một mức giá không thể ẩn sau một buổi học dài hơn.'
                : 'Total = session rate × the session count in the syllabus. The hourly rate is derived so a price cannot hide behind a longer session.'
            }
          >
            <div className="scroll-x">
              <table className="table fees-table">
                <thead>
                  <tr>
                    <th scope="col">{vi ? 'Khoá' : 'Course'}</th>
                    <th scope="col">{vi ? 'Buổi' : 'Sessions'}</th>
                    <th scope="col">{vi ? 'Đơn giá buổi' : 'Per session'}</th>
                    <th scope="col">{vi ? 'Quy ra giờ' : 'Per hour'}</th>
                    <th scope="col">{vi ? 'Tổng khoá' : 'Course total'}</th>
                    <th scope="col">{vi ? 'Đóng trọn khoá' : 'Paid up front'}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ course, plan, q }) => (
                    <tr key={course.id}>
                      <th scope="row">
                        {vi ? course.nameVi : course.name}
                        <span className="block text-xs muted">
                          {plan.weeks} {vi ? 'tuần' : 'weeks'} · {plan.classHours}{' '}
                          {vi ? 'giờ tại lớp' : 'class hours'}
                        </span>
                      </th>
                      {q.available ? (
                        <>
                          <td>{q.sessions}</td>
                          <td>{formatVnd(q.perSession)}</td>
                          <td className="muted">{formatVnd(q.perHour)}</td>
                          <td>{formatVnd(q.listTotal)}</td>
                          <td className="semibold">{formatVnd(q.upfrontTotal)}</td>
                        </>
                      ) : (
                        <td colSpan={5} className="secondary">
                          {vi ? 'Không mở ở hình thức này — ' : 'Not offered in this mode — '}
                          {vi ? q.unavailableReason!.vi : q.unavailableReason!.en}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="secondary" style={{ marginTop: 'var(--space-4)' }}>
              <IconCheck size={14} /> {vi ? PRICING.discount.noteVi : PRICING.discount.note}
            </p>
          </Card>

          <Card level={2} title={vi ? 'Điều khoản' : 'Terms'}>
            <ul className="report-limits">
              {PRICING.terms.map((term) => (
                <li key={term.en}>
                  <IconAlert size={15} />
                  <span>{vi ? term.vi : term.en}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </DocumentFrame>
    </div>
  );
}
