import { useMemo } from 'react';
import { MAX_TOTAL_SCORE } from '../../config';
import { buildFamilyReport } from '../../lib/cohort';
import { formatNumber } from '../../lib/format';
import { useAppState } from '../../store/AppStore';
import { DocumentShell } from '../../components/DocumentShell';
import { Badge, Button, Card, CardHeader, Progress, Stat } from '../../components/ui/primitives';

/**
 * BAO CAO CHO GIA DINH
 *
 * Nguoi tra tien cho mot chuong trinh luyen thi thuong khong phai nguoi hoc.
 * Truoc man hinh nay, ho khong co cach nao nhin thay bat cu dieu gi — va mot
 * dich vu ma nguoi tra tien khong thay duoc gia tri la mot dich vu se bi cat
 * dau tien khi gia dinh phai that lung.
 *
 * Nhung bao cao nay co y KHONG phai mot ban phan tich rut gon. Phu huynh khong
 * doc bang nang luc Rasch, va khong nen bat ho doc. Ho can ba cau tra loi:
 *
 *   1. Con toi dang o dau so voi muc tieu?
 *   2. Co dang tien len khong?
 *   3. Toi giup duoc gi ma khong phai gioi Toan?
 *
 * Cau thu ba quan trong nhat va gan nhu luon bi bo qua. Mot bao cao chi tra loi
 * hai cau dau se bien phu huynh thanh nguoi giam sat diem so — vai tro lam hong
 * dong luc cua nguoi hoc nhanh hon bat ky dieu gi khac. Nen o day, ba viec cuoi
 * bao cao deu la viec KHONG doi hoi kien thuc chuyen mon.
 */
export function ReportPage() {
  const state = useAppState();
  const report = useMemo(() => buildFamilyReport(state), [state]);
  const ratio = Math.min(1, report.projected / Math.max(1, report.target));

  return (
    <div className="space-y-6">
      <Card className="no-print">
        <CardHeader
          title="Báo cáo gửi gia đình"
          subtitle="In ra hoặc lưu PDF để gửi phụ huynh. Bản in dùng bảng màu sáng và đọc được khi in đen trắng."
          action={<Button variant="primary" onClick={() => window.print()}>In báo cáo</Button>}
        />
        <p className="text-sm text-fg-muted">
          Báo cáo này cố ý <strong className="text-fg">không phải một bản phân tích rút gọn</strong>.
          Nó trả lời ba câu hỏi mà một phụ huynh thật sự hỏi — và câu thứ ba, "tôi giúp được gì mà
          không phải giỏi Toán", là câu quan trọng nhất, cũng là câu gần như luôn bị bỏ qua.
        </p>
      </Card>

      <DocumentShell
        kind="BC"
        code={`BC-${new Date(report.createdAt).toISOString().slice(0, 10)}`}
        title={`Báo cáo học tập — ${report.learnerName}`}
        subtitle="Chương trình luyện thi Đánh giá năng lực HSA · Mô thức huấn luyện GITA"
        meta={
          <>
            {new Date(report.createdAt).toLocaleDateString('vi-VN')}
            <br />
            {report.stageName}
          </>
        }
      >
        <section className="doc-block">
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat
              label="Điểm dự báo"
              value={`${formatNumber(Math.round(report.projected))}/${MAX_TOTAL_SCORE}`}
              tone="brand"
              hint={report.band}
            />
            <Stat label="Mục tiêu gia đình đặt ra" value={formatNumber(report.target)} />
            <Stat
              label="Còn cách mục tiêu"
              value={report.gapToTarget === 0 ? 'Đã đạt' : `${formatNumber(Math.round(report.gapToTarget))} điểm`}
              tone={report.gapToTarget === 0 ? 'ok' : 'warn'}
            />
          </div>
          <div className="mt-4">
            <Progress value={ratio * 100} label="Tiến độ tới mục tiêu" tone="brand" />
            <p className="mt-1.5 text-xs text-fg-subtle">
              Thanh này so con với chính con của tháng trước, không so với bạn cùng lớp. Đó là phép so
              duy nhất có ích ở giai đoạn này.
            </p>
          </div>
        </section>

        {report.sections.map((section) => (
          <section key={section.title} className="doc-block">
            <h2 className="text-base font-semibold text-fg">{section.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{section.body}</p>
          </section>
        ))}

        <section className="doc-block rounded-xl border border-brand-line bg-brand-soft/40 p-4">
          <h2 className="text-base font-semibold text-fg">Ba việc gia đình làm được tuần này</h2>
          <p className="mt-1 text-xs text-fg-muted">
            Không việc nào đòi hỏi kiến thức chuyên môn. Một phụ huynh không giỏi Toán vẫn tạo được
            điều kiện, vẫn hỏi được đúng câu, và vẫn giữ được nhịp — ba thứ ảnh hưởng tới kết quả
            nhiều hơn việc giảng bài hộ con.
          </p>
          <ol className="mt-3 space-y-3">
            {report.familyActions.map((action, i) => (
              <li key={action} className="flex gap-3 text-sm">
                <span className="grid size-6 shrink-0 place-items-center rounded-md bg-brand text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <span className="text-fg-muted">{action}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="doc-block">
          <h2 className="text-base font-semibold text-fg">Đọc con số trong báo cáo này thế nào</h2>
          <ul className="mt-2 space-y-2 text-sm text-fg-muted">
            <li>
              <Badge tone="brand">Điểm dự báo</Badge>{' '}
              <span className="ml-1">
                là ước lượng nếu thi hôm nay với một đề chuẩn, tính từ toàn bộ bài đã làm chứ không
                phải từ bài gần nhất. Nó dao động là bình thường; xu hướng nhiều tuần mới đáng đọc.
              </span>
            </li>
            <li>
              <Badge tone="neutral">Chuỗi ngày</Badge>{' '}
              <span className="ml-1">
                đếm số ngày liên tục có học, dù chỉ 15 phút. Với người luyện thi, đều đặn tạo ra kết
                quả tốt hơn hẳn học dồn — nên đây là con số đáng khen hơn cả điểm số.
              </span>
            </li>
            <li>
              <Badge tone="warn">Vùng 20/80</Badge>{' '}
              <span className="ml-1">
                là nhóm chuyên đề lấy lại được nhiều điểm nhất với cùng một lượng công sức. Học đúng
                nhóm này quan trọng hơn học nhiều.
              </span>
            </li>
          </ul>
        </section>
      </DocumentShell>
    </div>
  );
}
