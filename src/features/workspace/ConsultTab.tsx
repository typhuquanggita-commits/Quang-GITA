import { useMemo, useState } from 'react';
import { MAX_TOTAL_SCORE } from '../../config';
import {
  MARKET_REFERENCE,
  PLANS,
  PRICING_PRINCIPLES,
  SURVEYED_AT,
  formatVnd,
  type PlanId,
} from '../../data/pricing';
import { formatPercent } from '../../lib/format';
import type { LearnerRow } from '../../lib/cohort';
import { useCan } from '../../components/PermissionGate';
import { Badge, Card, CardHeader, Select } from '../../components/ui/primitives';

/**
 * TU VAN
 *
 * Hai thu nguoi tu van can ma trang hoc phi cong khai co y khong co:
 *
 * 1. BANG THAM CHIEU THI TRUONG. Ho bi hoi "sao ben kia re hon" trong gan nhu
 *    moi cuoc goi. Tra loi ap ung mot lan la mat ca hop dong. Bang nay dat
 *    thang gia niem yet canh gia ban thuc de nguoi tu van noi duoc dieu quan
 *    trong nhat: ben kia khong re hon, ben kia neo gia cao roi giam.
 *
 * 2. DE XUAT GOI DUA TREN DU LIEU, khong dua tren cam giac. He thong da biet
 *    diem du bao, do on dinh cua thoi quen va vung 20/80 cua tung nguoi — nen
 *    goi y goi nao la mot ket luan, khong phai mot cu ban hang.
 *
 * Nguyen tac xuyen suot: KHONG BAO GIO GOI Y GOI CAO HON MUC NGUOI DO CAN.
 * Ban goi sai la mat nguoi do vinh vien, cong them nhung nguoi ho ke lai.
 */
export function ConsultTab({ rows }: { rows: readonly LearnerRow[] }) {
  const canRoadmap = useCan('consult.roadmap');
  const [selected, setSelected] = useState(rows[0]?.snapshot.id ?? '');

  const row = useMemo(
    () => rows.find((r) => r.snapshot.id === selected) ?? rows[0],
    [rows, selected],
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Tham chiếu thị trường"
          subtitle={`Khảo sát công khai tháng ${SURVEYED_AT}. Giá thay đổi theo mùa — khảo sát lại trước mỗi mùa tuyển sinh.`}
          action={<Badge tone="warn">Dùng nội bộ</Badge>}
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
                <th scope="col" className="px-2 py-2">Phân khúc</th>
                <th scope="col" className="px-2 py-2 text-right">Giá niêm yết</th>
                <th scope="col" className="px-2 py-2 text-right">Giá bán thực</th>
                <th scope="col" className="px-2 py-2">Điều cần nói với khách</th>
              </tr>
            </thead>
            <tbody>
              {MARKET_REFERENCE.map((ref) => (
                <tr key={ref.segment} className="border-b border-line/60">
                  <th scope="row" className="px-2 py-2 font-normal">
                    <span className="block text-fg">{ref.segment}</span>
                    <span className="block text-xs text-fg-subtle">{ref.source}</span>
                  </th>
                  <td className="px-2 py-2 text-right tabular-nums text-fg-subtle">
                    {ref.listed === null ? '—' : <s>{formatVnd(ref.listed)}</s>}
                  </td>
                  <td className="px-2 py-2 text-right font-medium tabular-nums text-fg">
                    {formatVnd(ref.actual)}
                  </td>
                  <td className="px-2 py-2 text-fg-muted">{ref.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 rounded-lg border border-brand-line bg-brand-soft p-3 text-sm leading-relaxed text-fg-muted">
          <strong className="text-fg">Câu trả lời cho "sao bên kia rẻ hơn":</strong> họ không rẻ hơn
          — họ niêm yết 7,2 triệu rồi bán 2,7 triệu quanh năm. Chúng ta bán đúng một mức, quanh năm,
          cho mọi người. Điều khách hàng thật sự mua ở đây không phải số giờ video, mà là một hệ
          thống <em>đo được</em> con họ đang tiến tới đâu — và vì đo được nên chúng ta dám cam kết
          mức tăng.
        </p>
      </Card>

      <Card>
        <CardHeader title="Nguyên tắc định giá" subtitle="Đọc trước khi vào cuộc gọi đầu tiên." />
        <ol className="space-y-4">
          {PRICING_PRINCIPLES.map((p, i) => (
            <li key={p.rule} className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-brand-soft text-xs font-semibold text-brand">
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-fg">{p.rule}</p>
                <p className="mt-1 text-sm text-fg-muted">{p.why}</p>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      {canRoadmap && row && (
        <Card>
          <CardHeader
            title="Đề xuất gói theo dữ liệu"
            subtitle="Gợi ý dựa trên điểm dự báo, độ ổn định thói quen và mức lệch trọng tâm — không dựa trên cảm giác về khả năng chi trả."
            action={
              rows.length > 1 ? (
                <Select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                  aria-label="Chọn học viên"
                >
                  {rows.map((r) => (
                    <option key={r.snapshot.id} value={r.snapshot.id}>
                      {r.snapshot.name}
                    </option>
                  ))}
                </Select>
              ) : undefined
            }
          />
          <Proposal row={row} />
        </Card>
      )}
    </div>
  );
}

/**
 * Chon goi tu du lieu.
 *
 * Ba tin hieu, va thu tu xet co chu y:
 *  1. Chuoi ngay hoc = 0 → van de la BAT DAU, khong phai noi dung. Goi tu hoc
 *     se that bai, va that bai o day dat hon la ban duoc mot goi re.
 *  2. Hoc cham ma lech trong tam → van de la DINH HUONG, can nguoi doc bai.
 *  3. Da co ky luat va da dung trong tam → tu hoc la du. Ban them la ban thua.
 */
function recommend(row: LearnerRow): { planId: PlanId; because: string } {
  if (row.daysSinceActive === null || row.streak === 0) {
    return {
      planId: 'co-kem',
      because:
        'Chưa hình thành được nhịp học đều. Vấn đề ở đây là bắt đầu và duy trì, không phải thiếu nội dung — nên gói Tự học gần như chắc chắn sẽ bỏ dở, và một người bỏ dở đắt hơn nhiều so với một hợp đồng nhỏ hơn.',
    };
  }

  if (row.focusRatio < 0.4) {
    return {
      planId: 'co-kem',
      because: `Đang học đều (chuỗi ${row.streak} ngày) nhưng công sức chỉ rơi ${formatPercent(
        row.focusRatio,
        0,
      )} vào vùng 20/80. Đây là nhóm cố gắng thật mà điểm không lên — họ cần người đọc bài và chỉnh thứ tự ưu tiên, không cần thêm bài.`,
    };
  }

  if (row.projected < 70 && row.streak >= 7) {
    return {
      planId: 'coach',
      because:
        'Có kỷ luật rõ ràng nhưng nền còn thấp và thời gian còn lại không nhiều. Đây là trường hợp coach 1:1 tạo ra chênh lệch lớn nhất, vì phần thiếu nằm ở chiến lược chứ không ở chăm chỉ.',
    };
  }

  return {
    planId: 'tu-hoc',
    because: `Đã có kỷ luật (chuỗi ${row.streak} ngày) và công sức đang rơi đúng trọng tâm (${formatPercent(
      row.focusRatio,
      0,
    )}). Người này tự đi được — bán gói cao hơn ở đây là bán thứ họ không cần.`,
  };
}

function Proposal({ row }: { row: LearnerRow }) {
  const { planId, because } = recommend(row);
  const plan = PLANS.find((p) => p.id === planId);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-4">
        <Figure label="Điểm dự báo" value={`${Math.round(row.projected)}/${MAX_TOTAL_SCORE}`} />
        <Figure label="Chuỗi ngày" value={`${row.streak}`} />
        <Figure label="Đúng trọng tâm" value={formatPercent(row.focusRatio, 0)} />
        <Figure
          label="Hoạt động gần nhất"
          value={row.daysSinceActive === null ? 'chưa có' : `${row.daysSinceActive} ngày`}
        />
      </div>

      <div className="rounded-xl border border-brand-line bg-brand-soft p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-sm font-semibold text-fg">
            Đề xuất: gói {plan?.name} — {formatVnd(plan?.price ?? 0)}
          </h3>
          <span className="text-xs text-fg-subtle">{plan?.priceUnit}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{because}</p>
      </div>

      {plan && (
        <p className="rounded-lg border border-warn/40 bg-warn-soft p-3 text-xs leading-relaxed text-warn">
          <strong>Nói thẳng điều này với gia đình:</strong> {plan.notFor} Nói ra trước là cách rẻ nhất
          để không bao giờ phải hoàn tiền — và là lý do người ta giới thiệu bạn cho người khác.
        </p>
      )}
    </div>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface-2 p-3">
      <p className="text-xs text-fg-subtle">{label}</p>
      <p className="mt-0.5 text-lg font-semibold tabular-nums text-fg">{value}</p>
    </div>
  );
}
