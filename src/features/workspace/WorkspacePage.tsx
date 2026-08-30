import { useMemo, useRef, useState } from 'react';
import { MAX_TOTAL_SCORE } from '../../config';
import { bankCoverage } from '../../data/worksheets';
import {
  attentionOrder,
  buildAssignment,
  buildRow,
  loadSnapshot,
  summarizeCohort,
  type LearnerRow,
  type LearnerSnapshot,
} from '../../lib/cohort';
import { cn } from '../../lib/cn';
import { formatNumber, formatPercent } from '../../lib/format';
import { PermissionGate, useCan } from '../../components/PermissionGate';
import {
  Badge,
  Button,
  Card,
  CardHeader,
  EmptyState,
  Segmented,
  Stat,
  useToast,
} from '../../components/ui/primitives';

/**
 * KHONG GIAN LAM VIEC
 *
 * Truoc man hinh nay, he thong co mot ma tran 30 quyen ma chi 6 quyen thuc su
 * dieu khien duoc thu gi. Mot vai tro "Coach GITA" dang nhap vao se thay dung
 * ung dung cua hoc vien — nghia la vai tro do ton tai tren giay chu khong ton
 * tai trong san pham.
 *
 * Man hinh nay lam cho chung ton tai that. Va no giai bai toan kien truc that:
 * HSA365 khong co may chu, du lieu nam trong trinh duyet cua tung nguoi hoc.
 * Loi giai khong phai dung mot may chu tam bo, ma la dung chinh thu da co —
 * TEP XUAT CUA NGUOI HOC LA DINH DANG TRAO DOI. Nguoi hoc gui tep, giao vien
 * nap vao, va co ngay mot bang lop that voi so lieu that.
 *
 * Danh doi duoc noi thang tren giao dien chu khong giau: day la anh chup tai
 * thoi diem xuat, khong phai truc tuyen.
 */

type Tab = 'lop' | 'duyet' | 'giao' | 'baocao';

export function WorkspacePage() {
  const toast = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [snapshots, setSnapshots] = useState<LearnerSnapshot[]>([]);
  const [tab, setTab] = useState<Tab>('lop');

  const canApproveLevel = useCan('class.approveLevel');
  const canApproveStage = useCan('class.approveStage');
  const canAssign = useCan('class.assign');
  const canReport = useCan('report.org');

  const rows = useMemo(() => attentionOrder(snapshots.map((s) => buildRow(s))), [snapshots]);
  const summary = useMemo(() => summarizeCohort(rows), [rows]);

  async function upload(files: FileList) {
    const added: LearnerSnapshot[] = [];
    const failed: string[] = [];

    for (const file of Array.from(files)) {
      try {
        added.push(loadSnapshot(file.name, await file.text()));
      } catch {
        failed.push(file.name);
      }
    }

    setSnapshots((current) => {
      const byId = new Map(current.map((s) => [s.id, s]));
      // Tep moi cua cung mot hoc vien GHI DE ban cu — giao vien nap lai tep
      // tuan nay khong duoc phep tao ra hai dong cho mot nguoi.
      for (const snapshot of added) byId.set(snapshot.id, snapshot);
      return [...byId.values()];
    });

    if (added.length > 0) toast(`Đã nạp ${added.length} hồ sơ học viên.`, 'ok');
    if (failed.length > 0) toast(`${failed.length} tệp không đọc được: ${failed.join(', ')}`, 'bad');
  }

  const tabs: ReadonlyArray<{ value: Tab; label: string }> = [
    { value: 'lop', label: 'Bảng lớp' },
    ...(canApproveLevel || canApproveStage ? [{ value: 'duyet' as Tab, label: 'Xét duyệt' }] : []),
    ...(canAssign ? [{ value: 'giao' as Tab, label: 'Giao nhiệm vụ' }] : []),
    ...(canReport ? [{ value: 'baocao' as Tab, label: 'Báo cáo' }] : []),
  ];

  return (
    <PermissionGate heading="h1" permission="class.view" title="Không gian làm việc chưa mở">
      <div className="space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge tone="brand">Chuyên môn</Badge>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">Không gian làm việc</h1>
            <p className="mt-1.5 max-w-3xl text-sm text-fg-muted">
              Nạp tệp học viên tự xuất để dựng bảng lớp. Mọi con số ở đây tính bằng đúng bộ quy tắc mà
              học viên nhìn thấy trên màn hình của họ — không có "quy tắc riêng của giáo viên".
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="primary" onClick={() => fileRef.current?.click()}>
              Nạp hồ sơ học viên
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              multiple
              className="hidden"
              onChange={(event) => {
                const files = event.target.files;
                if (files && files.length > 0) void upload(files);
                event.target.value = '';
              }}
            />
            {snapshots.length > 0 && (
              <Button variant="ghost" onClick={() => setSnapshots([])}>
                Xóa danh sách
              </Button>
            )}
          </div>
        </header>

        <p className="rounded-lg border border-warn/40 bg-warn-soft p-3 text-xs leading-relaxed text-warn">
          Bảng lớp là <strong>ảnh chụp tại thời điểm học viên xuất tệp</strong>, không phải dữ liệu
          trực tuyến. Hệ thống không có máy chủ, nên dữ liệu học tập nằm trong trình duyệt của chính
          người học và chỉ rời khỏi máy họ khi họ chủ động gửi đi. Đổi lại, mọi thứ ở đây chạy được
          hoàn toàn khi mất mạng.
        </p>

        {rows.length === 0 ? (
          <EmptyState
            icon="📥"
            title="Chưa có hồ sơ nào"
            description="Yêu cầu học viên vào Cài đặt → Dữ liệu học tập → Xuất ra tệp JSON, rồi gửi tệp cho bạn. Nạp được nhiều tệp cùng lúc."
            action={
              <Button variant="primary" onClick={() => fileRef.current?.click()}>
                Chọn tệp
              </Button>
            }
          />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-4">
              <Stat label="Học viên" value={formatNumber(summary.learners)} tone="brand" />
              <Stat
                label="Điểm dự báo trung bình"
                value={`${Math.round(summary.averageProjected)}/${MAX_TOTAL_SCORE}`}
              />
              <Stat
                label="Đang mất đà"
                value={formatNumber(summary.inactive)}
                tone={summary.inactive > 0 ? 'bad' : 'ok'}
                hint="Nghỉ từ 7 ngày trở lên"
              />
              <Stat
                label="Chờ xét duyệt"
                value={formatNumber(summary.awaitingApproval)}
                tone={summary.awaitingApproval > 0 ? 'warn' : 'neutral'}
              />
            </div>

            <Segmented value={tab} onChange={setTab} options={tabs} label="Khu vực làm việc" />

            {tab === 'lop' && <RosterTab rows={rows} />}
            {tab === 'duyet' && (
              <ApprovalTab rows={rows} canLevel={canApproveLevel} canStage={canApproveStage} />
            )}
            {tab === 'giao' && <AssignmentTab rows={rows} />}
            {tab === 'baocao' && <ReportTab rows={rows} summary={summary} />}
          </>
        )}
      </div>
    </PermissionGate>
  );
}

function RosterTab({ rows }: { rows: readonly LearnerRow[] }) {
  return (
    <Card>
      <CardHeader
        title="Bảng lớp"
        subtitle="Xếp theo AI CẦN ĐƯỢC CHÚ Ý TRƯỚC, không xếp theo điểm. Bảng xếp theo điểm khiến người ở giữa bảng không bao giờ được nhìn tới — mà đó chính là nhóm cứu được nhiều nhất."
      />
      <div className="space-y-3">
        {rows.map((row) => (
          <article key={row.snapshot.id} className="rounded-xl border border-line bg-surface-2 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold text-fg">{row.snapshot.name}</h3>
              <p className="text-xs text-fg-muted">
                {Math.round(row.projected)}/{MAX_TOTAL_SCORE} điểm · cấp {row.topLevel} ·{' '}
                {row.stageName} · GITA {Math.round(row.gita)}
              </p>
            </div>

            <dl className="mt-3 grid gap-3 text-xs sm:grid-cols-4">
              <Metric label="KPI giai đoạn" value={formatPercent(row.kpi, 0)} />
              <Metric label="Chuỗi ngày" value={`${row.streak} ngày`} />
              <Metric label="Thẻ quá hạn" value={formatNumber(row.dueCards)} />
              <Metric
                label="Hoạt động gần nhất"
                value={row.daysSinceActive === null ? 'chưa có' : `${row.daysSinceActive} ngày trước`}
              />
            </dl>

            {row.focusTopics.length > 0 && (
              <p className="mt-3 text-xs text-fg-muted">
                <strong className="text-fg">Vùng 20/80:</strong> {row.focusTopics.join(' · ')} — công
                sức 14 ngày qua rơi đúng vùng này {formatPercent(row.focusRatio, 0)}
              </p>
            )}

            {row.flags.length > 0 && (
              <ul className="mt-3 space-y-2">
                {row.flags.map((flag) => (
                  <li key={flag.id} className="flex flex-wrap items-start gap-2 text-xs">
                    <Badge tone={flag.tone}>{flag.label}</Badge>
                    <span className="min-w-0 flex-1 text-fg-muted">{flag.action}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-fg-subtle">{label}</dt>
      <dd className="mt-0.5 font-medium tabular-nums text-fg">{value}</dd>
    </div>
  );
}

function ApprovalTab({
  rows,
  canLevel,
  canStage,
}: {
  rows: readonly LearnerRow[];
  canLevel: boolean;
  canStage: boolean;
}) {
  const levelUps = rows.filter((r) => r.levelUpReady.length > 0);
  const stageUps = rows.filter((r) => r.stageEligible);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Chờ duyệt lên cấp"
          subtitle="Điều kiện do hệ thống tính, không do cảm tính: thành thạo đủ số phiếu ở cấp hiện tại và vượt được phiếu vượt ải."
          action={<Badge tone={levelUps.length > 0 ? 'ok' : 'neutral'}>{levelUps.length} học viên</Badge>}
        />
        {!canLevel ? (
          <p className="text-sm text-fg-muted">
            Vai trò của bạn xem được danh sách nhưng chưa có quyền duyệt lên cấp.
          </p>
        ) : levelUps.length === 0 ? (
          <p className="text-sm text-fg-muted">Chưa có tuyến nào đủ điều kiện.</p>
        ) : (
          <ul className="space-y-3">
            {levelUps.map((row) => (
              <li key={row.snapshot.id} className="rounded-xl border border-ok/40 bg-ok-soft p-3">
                <p className="text-sm font-medium text-fg">{row.snapshot.name}</p>
                <ul className="mt-1.5 space-y-1 text-xs text-fg-muted">
                  {row.levelUpReady.map((t) => (
                    <li key={t.topicId}>
                      {t.topicName} — đủ điều kiện lên cấp {t.level + 1}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-fg-subtle">
                  Duyệt sớm. Để một tuyến đã đủ điều kiện nằm chờ là lấy mất phần thưởng đúng lúc nó
                  có giá trị nhất.
                </p>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card>
        <CardHeader
          title="Chờ xét chuyển giai đoạn"
          subtitle="Ngưỡng KPI 90% và phủ ít nhất 60% số phiếu của giai đoạn — điều kiện phủ ngăn việc làm vài phiếu dễ rồi đòi lên giai đoạn."
          action={<Badge tone={stageUps.length > 0 ? 'ok' : 'neutral'}>{stageUps.length} học viên</Badge>}
        />
        {!canStage ? (
          <p className="text-sm text-fg-muted">
            Chuyển giai đoạn là quyết định của giáo viên bậc cao trở lên. Bạn xem được nhưng chưa
            duyệt được.
          </p>
        ) : stageUps.length === 0 ? (
          <p className="text-sm text-fg-muted">Chưa có học viên nào đạt ngưỡng.</p>
        ) : (
          <ul className="space-y-2">
            {stageUps.map((row) => (
              <li
                key={row.snapshot.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ok/40 bg-ok-soft p-3 text-sm"
              >
                <span className="font-medium text-fg">{row.snapshot.name}</span>
                <span className="text-xs text-fg-muted">
                  KPI {formatPercent(row.kpi, 0)} · phủ {formatPercent(row.coverage, 0)} ·{' '}
                  {row.stageName}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function AssignmentTab({ rows }: { rows: readonly LearnerRow[] }) {
  const toast = useToast();
  const [size, setSize] = useState(5);
  const packets = useMemo(() => rows.map((row) => buildAssignment(row, size)), [rows, size]);

  function download() {
    const lines = ['Học viên,Hạn,Mã phiếu,Chuyên đề,Cấp,Lý do giao'];
    for (const packet of packets) {
      for (const item of packet.items) {
        lines.push(
          [packet.learnerName, packet.dueDate, item.code, item.topicName, item.level, item.reason]
            .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
            .join(','),
        );
      }
    }
    const blob = new Blob([`﻿${lines.join('\n')}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `goi-nhiem-vu-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast('Đã xuất gói nhiệm vụ.', 'ok');
  }

  return (
    <Card>
      <CardHeader
        title="Gói nhiệm vụ tuần"
        subtitle="Sinh bằng đúng bộ quy tắc mà học viên nhìn thấy. Nếu hai bên nhìn hai bộ quy tắc khác nhau thì học viên học theo hệ thống còn giáo viên chấm theo cảm tính — và cái giá phải trả là niềm tin."
        action={
          <div className="flex items-center gap-2">
            <Segmented
              value={String(size)}
              onChange={(v) => setSize(Number(v))}
              options={[
                { value: '3', label: '3 phiếu' },
                { value: '5', label: '5 phiếu' },
                { value: '8', label: '8 phiếu' },
              ]}
              label="Số phiếu mỗi học viên"
            />
            <Button onClick={download}>Xuất CSV</Button>
          </div>
        }
      />
      <div className="space-y-3">
        {packets.map((packet) => (
          <article key={packet.learnerName} className="rounded-xl border border-line bg-surface-2 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold text-fg">{packet.learnerName}</h3>
              <p className="text-xs text-fg-muted">Hạn {packet.dueDate}</p>
            </div>
            {packet.items.length === 0 ? (
              <p className="mt-2 text-xs text-fg-muted">
                Không còn phiếu phù hợp ở cấp hiện tại — học viên này cần được duyệt lên cấp trước.
              </p>
            ) : (
              <ol className="mt-2 space-y-1 text-xs">
                {packet.items.map((item) => (
                  <li key={item.worksheetId} className="text-fg-muted">
                    <span className="doc-code text-fg">{item.code}</span> · {item.topicName} · cấp{' '}
                    {item.level} — {item.reason}
                  </li>
                ))}
              </ol>
            )}
            <p className="mt-2 rounded-lg bg-surface p-2 text-xs text-fg-muted">
              <strong className="text-fg">Lời dặn:</strong> {packet.note}
            </p>
          </article>
        ))}
      </div>
    </Card>
  );
}

function ReportTab({
  rows,
  summary,
}: {
  rows: readonly LearnerRow[];
  summary: ReturnType<typeof summarizeCohort>;
}) {
  const canQuality = useCan('report.quality');
  const coverage = useMemo(() => bankCoverage(), []);
  const thin = coverage.filter((c) => c.ratio < 1);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Báo cáo lớp"
          subtitle="Số liệu tổng hợp từ các hồ sơ đang nạp."
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Chỉ số GITA trung bình" value={Math.round(summary.averageGita)} tone="brand" />
          <Stat label="Đạt ngưỡng chuyển giai đoạn" value={formatNumber(summary.stageReady)} tone="ok" />
          <Stat
            label="Đang mất đà"
            value={formatNumber(summary.inactive)}
            tone={summary.inactive > 0 ? 'bad' : 'neutral'}
          />
        </div>

        {summary.commonGaps.length > 0 && (
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-fg">Lỗ hổng chung của lớp</h3>
            <p className="mt-1 text-xs text-fg-muted">
              Chuyên đề xuất hiện trong vùng 20/80 của nhiều học viên nhất. Đây là danh sách nên dạy
              lại cho cả lớp thay vì kèm từng người.
            </p>
            <ul className="mt-2 space-y-1.5">
              {summary.commonGaps.map((gap) => (
                <li key={gap.topicName} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn('h-2 rounded-full bg-brand')}
                    style={{ width: `${(gap.learners / Math.max(1, rows.length)) * 120}px` }}
                  />
                  <span className="text-fg">{gap.topicName}</span>
                  <span className="text-xs text-fg-muted">{gap.learners}/{rows.length} học viên</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {canQuality && (
        <Card>
          <CardHeader
            title="Chất lượng ngân hàng câu hỏi"
            subtitle="Chuyên đề nào chưa đủ câu cho phiếu dài nhất. Hiển thị trung thực thay vì âm thầm lặp câu."
            action={<Badge tone={thin.length === 0 ? 'ok' : 'warn'}>{thin.length} chuyên đề thiếu</Badge>}
          />
          {thin.length === 0 ? (
            <p className="text-sm text-fg-muted">
              Cả {coverage.length} chuyên đề đều đủ câu cho phiếu cấp 6. Không phiếu nào phải lặp câu.
            </p>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {thin.map((c) => (
                <li key={c.topicId} className="text-fg-muted">
                  {c.topicId} — có {c.available}/{c.needed} câu
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
}
