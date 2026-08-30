import {
  COMMITMENT,
  MAX_EXAM_ATTEMPTS_PER_YEAR,
  OFFICIAL_EXAM_FEE,
  PLANS,
  SEASON_MONTHS,
  formatVnd,
  totalSeasonCost,
  type Plan,
} from '../../data/pricing';
import { cn } from '../../lib/cn';
import { Badge, Card, CardHeader } from '../../components/ui/primitives';
import { IconCheck } from '../../components/layout/icons';

/**
 * HOC PHI — TRANG CONG KHAI
 *
 * Co y KHONG co bang so sanh doi thu o day. Mot bang so sanh tren trang ban
 * hang doc ra nhu loi cong kich va lam nguoi mua nghi ngo ca hai ben. Bang do
 * nam trong khong gian lam viec, cho nguoi tu van — ho moi la nguoi bi hoi
 * "sao ben kia re hon".
 *
 * Va co mot thu trang nay co ma gan nhu khong trang ban hang nao co: MOI GOI
 * DEU NOI RO AI KHONG NEN MUA NO. Ban goi sai cho mot nguoi la mat nguoi do
 * vinh vien, cong them nhung nguoi ho ke lai. Noi thang la cach re nhat de
 * khong bao gio phai hoan tien.
 */
export function PricingPage() {
  return (
    <div className="space-y-8">
      <header>
        <Badge tone="brand">Học phí</Badge>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Chọn cách đi, không chọn giá</h1>
        <p className="mt-2 max-w-3xl text-sm text-fg-muted">
          Bốn gói khác nhau ở <strong className="text-fg">mức con người tham gia</strong>, không khác
          nhau ở lượng nội dung. Mọi gói đều mở toàn bộ 2.000 phiếu luyện, kho bí kíp và bộ đề mẫu —
          vì cắt bớt nội dung để bán gói cao hơn là bán sự thiếu thốn, không phải bán giá trị.
        </p>
      </header>

      <p className="rounded-xl border border-brand-line bg-brand-soft p-4 text-sm leading-relaxed text-fg-muted">
        <strong className="text-fg">Một mức giá, không giảm giá theo mùa.</strong> Thị trường luyện
        thi hiện niêm yết một mức rồi giảm 50% quanh năm — và khi giá niêm yết luôn được giảm một
        nửa, khách hàng học được rằng nó là giá giả. Chúng tôi không chơi trò đó. Giá dưới đây là giá
        thật, quanh năm, cho mọi người.
      </p>

      <div className="grid gap-5 lg:grid-cols-2">
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <Card>
        <CardHeader
          title={COMMITMENT.title}
          subtitle={COMMITMENT.promise}
          action={<Badge tone="ok">Cam kết</Badge>}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">
              Điều kiện của học viên
            </h3>
            <ul className="mt-2 space-y-1.5">
              {COMMITMENT.conditions.map((condition) => (
                <li key={condition} className="flex gap-2 text-sm text-fg-muted">
                  <IconCheck className="mt-0.5 size-4 shrink-0 text-ok" />
                  {condition}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wide text-fg-subtle">
              Vì sao cam kết mức tăng
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{COMMITMENT.why}</p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Chi phí thật của cả mùa thi"
          subtitle="Học phí không phải toàn bộ chi phí. Lệ phí thi nộp cho đơn vị tổ chức, không phải cho chúng tôi — nhưng bạn vẫn phải trả, nên nó phải có mặt trong bảng này."
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
                <th scope="col" className="px-2 py-2">Gói</th>
                <th scope="col" className="px-2 py-2 text-right">Học phí</th>
                <th scope="col" className="px-2 py-2 text-right">Lệ phí thi ({MAX_EXAM_ATTEMPTS_PER_YEAR} lượt)</th>
                <th scope="col" className="px-2 py-2 text-right">Tổng cả mùa</th>
              </tr>
            </thead>
            <tbody>
              {PLANS.filter((p) => p.perMonth !== null).map((plan) => (
                <tr key={plan.id} className="border-b border-line/60">
                  <th scope="row" className="px-2 py-2 font-normal text-fg">{plan.name}</th>
                  <td className="px-2 py-2 text-right tabular-nums text-fg-muted">
                    {formatVnd(plan.price)}
                  </td>
                  <td className="px-2 py-2 text-right tabular-nums text-fg-muted">
                    {formatVnd(OFFICIAL_EXAM_FEE * MAX_EXAM_ATTEMPTS_PER_YEAR)}
                  </td>
                  <td className="px-2 py-2 text-right font-medium tabular-nums text-fg">
                    {formatVnd(totalSeasonCost(plan.id))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-fg-subtle">
          Lệ phí thi HSA của ĐHQGHN là {formatVnd(OFFICIAL_EXAM_FEE)} mỗi lượt, tối đa{' '}
          {MAX_EXAM_ATTEMPTS_PER_YEAR} lượt mỗi năm và hai lượt liên tiếp phải cách nhau ít nhất 28
          ngày. Khoản này nộp trực tiếp cho đơn vị tổ chức thi.
        </p>
      </Card>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-2xl border p-5',
        plan.featured ? 'border-brand bg-brand-soft/40 shadow-card' : 'border-line bg-surface',
      )}
    >
      <header>
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight text-fg">{plan.name}</h2>
          {plan.featured && <Badge tone="brand">Phù hợp với phần lớn người học</Badge>}
        </div>
        <p className="mt-1 text-sm text-fg-muted">{plan.tagline}</p>
      </header>

      <p className="mt-4 flex flex-wrap items-baseline gap-2">
        <span className="text-2xl font-semibold tabular-nums text-fg">{formatVnd(plan.price)}</span>
        <span className="text-sm text-fg-muted">/ {plan.priceUnit}</span>
      </p>
      {plan.perMonth !== null && (
        <p className="mt-1 text-xs text-fg-subtle">
          Tương đương {formatVnd(plan.perMonth)} mỗi tháng trong {SEASON_MONTHS} tháng
        </p>
      )}

      {plan.upgrade && (
        <p className="mt-4 rounded-lg border border-line bg-surface-2 p-3 text-sm text-fg-muted">
          <strong className="text-fg">So với gói dưới:</strong> {plan.upgrade}
        </p>
      )}

      <ul className="mt-4 flex-1 space-y-2">
        {plan.includes.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-fg-muted">
            <IconCheck className="mt-0.5 size-4 shrink-0 text-ok" />
            {item}
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-fg-subtle">Hợp với ai</dt>
          <dd className="mt-1 text-fg-muted">{plan.bestFor}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-warn">
            Không nên mua nếu
          </dt>
          <dd className="mt-1 text-fg-muted">{plan.notFor}</dd>
        </div>
      </dl>
    </article>
  );
}
