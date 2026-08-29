/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  WHY_LAYERS,
  WHY_ELICITATION,
  EXCELLENCE_TIERS,
  IDENTITY_STATEMENT,
  IDENTITY_TRAITS,
  STRATEGY_BETS,
  RESOURCE_ALLOCATION,
  PLAN_TEMPLATES,
  DAILY_TEN,
  WEEKLY_TEN,
  MONTHLY_TEN,
  KPIS,
  ANTI_KPI,
  PARETO_MOVES,
  PARETO_NOTE,
  SUCCESS_RULES,
  DIFFERENTIATORS,
  STRENGTH_AUDIT,
  ARCHETYPES,
  MANIFESTO,
} from '../../data';
import {Card, Chip, Field, Bullets, NumberedSteps, Filters} from './ui';
import {KeyAction} from '../../types';

const YoursBadge = () => (
  <span className="ml-2 inline-flex items-center rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] font-semibold text-amber-300 ring-1 ring-inset ring-amber-400/40">
    ◆ Bạn phải tự viết
  </span>
);

const Block: React.FC<{
  no: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}> = ({no, title, lead, children}) => (
  <section className="mb-14">
    <div className="mb-6 border-b border-slate-800 pb-5">
      <div className="flex items-baseline gap-3">
        <span className="bg-gradient-to-br from-sky-400 to-violet-500 bg-clip-text text-3xl font-black text-transparent">
          {no}
        </span>
        <h2 className="text-xl font-bold text-slate-100 md:text-2xl">{title}</h2>
      </div>
      <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-slate-400">
        {lead}
      </p>
    </div>
    {children}
  </section>
);

const TenList: React.FC<{items: KeyAction[]}> = ({items}) => (
  <div className="space-y-2">
    {items.map((a) => (
      <div
        key={a.no}
        className={`flex gap-3.5 rounded-lg border p-3.5 ${
          a.nonNegotiable
            ? 'border-slate-800 bg-slate-900/60'
            : 'border-slate-800/50 bg-slate-900/30'
        }`}>
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-800 text-xs font-bold text-slate-400">
          {a.no}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-snug text-slate-100">
            {a.action}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-400">{a.why}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className="text-[11px] font-semibold text-sky-400">
            {a.minutes}
          </span>
          {a.nonNegotiable && <Chip tone="rose">Bắt buộc</Chip>}
        </div>
      </div>
    ))}
  </div>
);

export const Charter: React.FC = () => {
  const [tenScope, setTenScope] = useState('day');
  const [planScope, setPlanScope] = useState('day');
  const plan = PLAN_TEMPLATES.find((p) => p.scope === planScope)!;

  return (
    <div>
      <header className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
          La Bàn — Hiến chương cá nhân
        </p>
        <h1 className="mt-2 text-3xl font-black leading-tight text-slate-100 md:text-4xl">
          Vì sao tôi làm điều này, và tôi trở thành ai khi làm xong
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-400">
          Tầng <span className="font-medium text-slate-300">Lộ trình</span> trả
          lời câu hỏi “làm gì và làm thế nào”. Tầng này trả lời “vì ai và vì
          sao”. Thiếu La Bàn, Lộ trình chỉ là một thời khoá biểu — và thời khoá
          biểu nào cũng bị bỏ ở tháng thứ tư. Toàn bộ nội dung dưới đây viết ở
          ngôi thứ nhất, để bạn đọc như đọc lời của chính mình.
        </p>
        <div className="mt-5 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
          <p className="text-sm leading-relaxed text-amber-200/90">
            <span className="font-semibold">Hai mục không ai viết hộ được:</span>{' '}
            mục 01 (Tại sao) và mục 11 (Điểm mạnh của tôi). Ở đó bạn sẽ thấy
            nhãn <span className="font-semibold">◆ Bạn phải tự viết</span> — kèm
            bản nháp mạnh nhất tôi dựng sẵn và quy trình khai vấn để bạn thay
            bằng câu trả lời thật của mình. Phần còn lại đã triển khai đầy đủ.
          </p>
        </div>
      </header>

      {/* 01 — TẠI SAO */}
      <Block
        no="01"
        title="TẠI SAO"
        lead="Ba tầng, đào từ nông xuống sâu. Tầng 1 đủ để bắt đầu; chỉ tầng 3 mới đủ để đi hết 1.095 ngày. Tháng thứ 20 là lúc bạn sẽ cần đúng tầng 3 này.">
        <div className="mb-5 space-y-3">
          {WHY_LAYERS.map((w) => (
            <Card key={w.level} className="border-l-2 border-l-sky-500/50">
              <div className="mb-1 flex flex-wrap items-center">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                  {w.level}
                </span>
                {w.yours && <YoursBadge />}
              </div>
              <p className="text-base font-semibold text-slate-100">
                {w.question}
              </p>
              <div className="mt-3 rounded-lg bg-slate-800/40 p-3">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Bản nháp — thay bằng câu của bạn
                </p>
                <p className="text-sm italic leading-relaxed text-slate-300">
                  “{w.draft}”
                </p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-amber-300/70">
                {w.test}
              </p>
            </Card>
          ))}
        </div>
        <Card className="border-amber-500/25">
          <Field label={WHY_ELICITATION.title}>
            <NumberedSteps items={WHY_ELICITATION.steps} />
          </Field>
          <p className="mt-3 rounded-lg border border-rose-500/20 bg-rose-500/5 p-3 text-xs leading-relaxed text-rose-200/80">
            <span className="font-semibold">⚠ </span>
            {WHY_ELICITATION.warning}
          </p>
        </Card>
      </Block>

      {/* 02 — KẾT QUẢ XUẤT SẮC */}
      <Block
        no="02"
        title="KẾT QUẢ XUẤT SẮC TÔI MUỐN ĐẠT"
        lead="Band 8.0 chỉ là bậc thấp nhất trong năm bậc. Nếu chỉ đặt mục tiêu ở bậc 1, động lực sẽ sụp đổ đúng ngày có kết quả thi. Năm bậc dưới đây xếp từ thứ dễ đo nhất tới thứ có ý nghĩa nhất.">
        <div className="space-y-4">
          {EXCELLENCE_TIERS.map((t, i) => (
            <Card key={t.id}>
              <div className="mb-2 flex flex-wrap items-center gap-2.5">
                <Chip tone={i === 0 ? 'slate' : i < 3 ? 'sky' : 'violet'}>
                  {t.tier}
                </Chip>
                <h3 className="font-bold text-slate-100">{t.name}</h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-slate-400">
                {t.why}
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {t.targets.map((g) => (
                  <div
                    key={g.label}
                    className="rounded-lg border border-slate-800 bg-slate-800/30 px-3 py-2">
                    <p className="text-[11px] text-slate-400">{g.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-emerald-300">
                      {g.value}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Block>

      {/* 03 — BẢN SẮC */}
      <Block
        no="03"
        title="CON NGƯỜI TÔI MUỐN TRỞ THÀNH"
        lead="Mục tiêu có ngày kết thúc; đến ngày đó động lực sụp đổ. Bản sắc thì không có vạch đích. Mỗi buổi học hoàn thành là một lá phiếu bầu cho con người dưới đây.">
        <Card className="mb-5 border-0 bg-gradient-to-br from-violet-500 to-sky-500 p-[1px]">
          <div className="rounded-[11px] bg-slate-950 p-6">
            <p className="text-2xl font-black leading-snug text-slate-100 md:text-3xl">
              “{IDENTITY_STATEMENT.core}”
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {IDENTITY_STATEMENT.expanded}
            </p>
            <p className="mt-4 border-t border-slate-800 pt-4 text-xs leading-relaxed text-slate-400">
              {IDENTITY_STATEMENT.notAGoal}
            </p>
          </div>
        </Card>
        <div className="grid gap-3 lg:grid-cols-2">
          {IDENTITY_TRAITS.map((t) => (
            <Card key={t.id}>
              <h4 className="text-sm font-bold leading-snug text-slate-100">
                {t.trait}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-rose-300/70">
                {t.notThis}
              </p>
              <Field label="Bằng chứng sau 3 năm">
                <p className="text-emerald-300/90">{t.proof}</p>
              </Field>
              <Field label="Con người này làm gì dưới áp lực">
                <p className="text-slate-400">{t.underPressure}</p>
              </Field>
            </Card>
          ))}
        </div>
      </Block>

      {/* 04 — CHIẾN LƯỢC */}
      <Block
        no="04"
        title="CHIẾN LƯỢC & LỘ TRÌNH CÁ NHÂN HOÁ"
        lead="Chiến lược là những thứ tôi chọn LÀM KHÁC số đông, kèm cái giá tôi chấp nhận trả. Mỗi cược đều có điều kiện chứng minh nó SAI — vì một chiến lược không thể bị bác bỏ thì không phải chiến lược, đó là niềm tin.">
        <div className="mb-6 space-y-3">
          {STRATEGY_BETS.map((b) => (
            <Card key={b.id} className="border-l-2 border-l-violet-500/50">
              <div className="flex gap-3.5">
                <span className="text-sm font-bold text-violet-400">
                  {String(b.no).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-snug text-slate-100">
                    {b.bet}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{b.instead}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {b.rationale}
                  </p>
                  <div className="mt-3 grid gap-2.5 md:grid-cols-2">
                    <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                        Đánh đổi tôi chấp nhận
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-300">
                        {b.tradeoff}
                      </p>
                    </div>
                    <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-2.5">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                        Cược này sai nếu
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-300">
                        {b.provesWrongIf}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Card>
          <Field label="Phân bổ nguồn lực">
            <div className="grid gap-2 md:grid-cols-2">
              {RESOURCE_ALLOCATION.map((r) => (
                <div
                  key={r.resource}
                  className="rounded-lg bg-slate-800/40 p-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold text-slate-200">
                      {r.resource}
                    </span>
                    <span className="text-xs font-medium text-sky-400">
                      {r.amount}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{r.split}</p>
                </div>
              ))}
            </div>
          </Field>
        </Card>
      </Block>

      {/* 05 — KẾ HOẠCH */}
      <Block
        no="05"
        title="KẾ HOẠCH RÈN LUYỆN — THÁNG · TUẦN · NGÀY"
        lead="Kế hoạch ngày có BA phiên bản, được viết ra trước khi cần đến. Nhờ vậy tôi không bao giờ phải quyết định “hôm nay có học không” — tôi chỉ chọn phiên bản nào. Đây là lý do chuỗi ngày không đứt.">
        <Filters
          options={[
            {id: 'day', label: 'Ngày'},
            {id: 'week', label: 'Tuần'},
            {id: 'month', label: 'Tháng'},
          ]}
          value={planScope}
          onChange={setPlanScope}
        />
        <h3 className="mb-4 text-sm font-semibold text-slate-300">{plan.name}</h3>
        <div className="grid gap-3 lg:grid-cols-3">
          {plan.variants.map((v) => (
            <Card
              key={v.label}
              className={plan.variants.length === 1 ? 'lg:col-span-3' : ''}>
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <h4 className="font-bold text-slate-100">{v.label}</h4>
                {v.minutes > 0 && (
                  <Chip tone="sky">{v.minutes} phút</Chip>
                )}
              </div>
              <p className="mb-4 text-xs text-slate-400">{v.when}</p>
              <div className="space-y-1.5">
                {v.blocks.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg bg-slate-800/30 px-3 py-2">
                    <span className="w-20 shrink-0 text-[11px] font-medium text-sky-400">
                      {b.time}
                    </span>
                    <span className="min-w-0 flex-1 text-xs leading-relaxed text-slate-300">
                      {b.task}
                    </span>
                    {b.minutes > 0 && (
                      <span className="shrink-0 text-[11px] text-slate-400">
                        {b.minutes}′
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Block>

      {/* 06 — 10 VIỆC */}
      <Block
        no="06"
        title="10 VIỆC QUAN TRỌNG NHẤT"
        lead="Ba danh sách, mỗi danh sách đúng 10 việc, xếp theo thứ tự ưu tiên. Việc gắn nhãn “Bắt buộc” là việc không được thương lượng kể cả ngày tệ nhất. Nếu một ngày chỉ làm được 3 việc, hãy làm 3 việc đầu tiên.">
        <Filters
          options={[
            {id: 'day', label: '10 việc / NGÀY'},
            {id: 'week', label: '10 việc / TUẦN'},
            {id: 'month', label: '10 việc / THÁNG'},
          ]}
          value={tenScope}
          onChange={setTenScope}
        />
        <TenList
          items={
            tenScope === 'day'
              ? DAILY_TEN
              : tenScope === 'week'
                ? WEEKLY_TEN
                : MONTHLY_TEN
          }
        />
      </Block>

      {/* 07 — KPI */}
      <Block
        no="07"
        title="KPI TÔI CẦN HOÀN THÀNH"
        lead="Chỉ số DẪN đo hành vi hôm nay và tôi kiểm soát được 100%. Chỉ số TRỄ đo kết quả và luôn đến chậm vài tháng. Nguyên tắc: quản trị bằng chỉ số dẫn, xác nhận bằng chỉ số trễ. Mỗi chỉ số đều có LẰN ĐỎ — chạm vào là phải can thiệp ngay.">
        <div className="mb-5 overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-900 text-xs text-slate-400">
              <tr>
                <th className="px-4 py-2.5 font-medium">Chỉ số</th>
                <th className="px-4 py-2.5 font-medium">Loại</th>
                <th className="px-4 py-2.5 font-medium">Nhịp</th>
                <th className="px-4 py-2.5 font-medium">Mục tiêu</th>
                <th className="px-4 py-2.5 font-medium">Lằn đỏ</th>
                <th className="px-4 py-2.5 font-medium">Đo bằng</th>
              </tr>
            </thead>
            <tbody>
              {KPIS.map((k) => (
                <tr
                  key={k.id}
                  className="border-t border-slate-800/70 transition hover:bg-slate-800/30">
                  <td className="px-4 py-2.5 font-medium text-slate-200">
                    {k.name}
                  </td>
                  <td className="px-4 py-2.5">
                    <Chip tone={k.type === 'dẫn' ? 'emerald' : 'violet'}>
                      {k.type}
                    </Chip>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-400">
                    {k.cadence}
                  </td>
                  <td className="px-4 py-2.5 text-xs font-medium text-emerald-300">
                    {k.target}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-rose-300/80">
                    {k.redline}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-slate-400">{k.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Card className="border-rose-500/20">
          <Field label={ANTI_KPI.title}>
            <Bullets items={ANTI_KPI.items} marker="✕" />
          </Field>
        </Card>
      </Block>

      {/* 08 — 20/80 */}
      <Block
        no="08"
        title="TƯ DUY TÍCH CỰC CHUẨN 20/80"
        lead={PARETO_NOTE}>
        <div className="space-y-3">
          {PARETO_MOVES.map((p) => (
            <Card key={p.id}>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-bold text-emerald-400">
                    {String(p.no).padStart(2, '0')}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100">{p.move}</h4>
                </div>
                <Chip tone="emerald">{p.share}</Chip>
              </div>
              <div className="grid gap-2.5 md:grid-cols-2">
                <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                    ✕ Từ
                  </p>
                  <p className="mt-1 text-sm italic leading-relaxed text-slate-300">
                    {p.from}
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    ✓ Sang
                  </p>
                  <p className="mt-1 text-sm italic leading-relaxed text-slate-300">
                    {p.to}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-1.5 border-t border-slate-800 pt-3 text-xs">
                <p className="text-slate-400">
                  <span className="font-semibold text-sky-400">
                    Kích hoạt khi:{' '}
                  </span>
                  {p.trigger}
                </p>
                <p className="text-slate-400">
                  <span className="font-semibold text-violet-400">
                    Câu tự nhủ:{' '}
                  </span>
                  {p.script}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Block>

      {/* 09 — QUY TẮC */}
      <Block
        no="09"
        title="BỘ QUY TẮC THÀNH CÔNG"
        lead="Mười hai quy tắc, không thương lượng. Mỗi quy tắc kèm điều khoản vi phạm — vì quy tắc không có quy trình xử lý khi lỡ thì sẽ bị bỏ ngay lần lỡ đầu tiên.">
        <div className="space-y-2.5">
          {SUCCESS_RULES.map((r) => (
            <Card key={r.no} className="border-l-2 border-l-rose-500/50">
              <div className="flex gap-3.5">
                <span className="text-sm font-bold text-rose-400">
                  {String(r.no).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-100">{r.rule}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                    {r.meaning}
                  </p>
                  <p className="mt-2 rounded-lg bg-slate-800/40 px-3 py-2 text-xs leading-relaxed text-amber-200/80">
                    <span className="font-semibold">Khi lỡ: </span>
                    {r.breach}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Block>

      {/* 10 — KHÁC BIỆT */}
      <Block
        no="10"
        title="PHƯƠNG PHÁP KHÁC BIỆT TÔI THỰC HIỆN"
        lead="Tám điều tôi làm mà phần lớn người học không làm. Đây không phải mẹo lạ để cho khác người — đây là những chỗ mà một thay đổi nhỏ trong cách làm tạo ra khác biệt lớn trong kết quả.">
        <div className="space-y-3">
          {DIFFERENTIATORS.map((d) => (
            <Card key={d.id}>
              <h4 className="mb-3 text-sm font-bold text-slate-100">{d.what}</h4>
              <div className="grid gap-2.5 md:grid-cols-2">
                <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Phần lớn người học
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {d.mostPeople}
                  </p>
                </div>
                <div className="rounded-lg border border-sky-500/25 bg-sky-500/5 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
                    Tôi làm
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    {d.iDo}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-emerald-300/80">
                <span className="font-semibold">Lợi thế: </span>
                {d.edge}
              </p>
            </Card>
          ))}
        </div>
      </Block>

      {/* 11 — ĐIỂM MẠNH */}
      <Block
        no="11"
        title="TÀI NĂNG · ĐIỂM MẠNH · KHÁC BIỆT CỦA TÔI"
        lead="Đây là mục duy nhất không ai viết hộ được. Điểm mạnh quyết định bạn nên nghiêng lộ trình về hướng nào — và quan trọng hơn, nó cho bạn một chỗ để bám vào khi mọi thứ khác đều khó.">
        <Card className="mb-6 border-amber-500/25">
          <div className="mb-1 flex flex-wrap items-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              {STRENGTH_AUDIT.title}
            </span>
            <YoursBadge />
          </div>
          <p className="mb-4 text-sm leading-relaxed text-slate-400">
            {STRENGTH_AUDIT.note}
          </p>
          <NumberedSteps items={STRENGTH_AUDIT.questions} />
        </Card>

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Sáu nguyên mẫu người học — tự định vị mình đang ở đâu
        </h3>
        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-slate-400">
          Không có nguyên mẫu nào tốt hơn nguyên mẫu nào. Mỗi loại đều có một
          siêu năng lực và một điểm mù riêng. Việc của bạn là nhận ra mình thuộc
          loại nào, khai thác tối đa siêu năng lực, và canh chừng đúng điểm mù
          đó suốt 36 tháng. Bạn có thể là tổ hợp của hai nguyên mẫu.
        </p>
        <div className="grid gap-3 lg:grid-cols-2">
          {ARCHETYPES.map((a) => (
            <Card key={a.id}>
              <h4 className="text-sm font-bold text-slate-100">{a.name}</h4>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {a.signs.map((s) => (
                  <Chip key={s} tone="slate">
                    {s}
                  </Chip>
                ))}
              </div>
              <div className="mt-4 space-y-2.5">
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                    ⚡ Siêu năng lực
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    {a.superpower}
                  </p>
                </div>
                <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                    ⚠ Điểm mù
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    {a.blindSpot}
                  </p>
                </div>
              </div>
              <Field label="Lộ trình nên chỉnh thế nào">
                <Bullets items={a.strategy} marker="→" />
              </Field>
            </Card>
          ))}
        </div>
      </Block>

      {/* TUYÊN NGÔN */}
      <section className="mb-8">
        <Card className="border-0 bg-gradient-to-br from-sky-500 via-violet-500 to-fuchsia-500 p-[1px]">
          <div className="rounded-[11px] bg-slate-950 p-7 md:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-400">
              {MANIFESTO.title}
            </p>
            <div className="mt-5 space-y-2.5">
              {MANIFESTO.lines.map((l, i) => (
                <p
                  key={i}
                  className="text-base font-semibold leading-snug text-slate-100 md:text-lg">
                  {l}
                </p>
              ))}
            </div>
            <p className="mt-6 border-t border-slate-800 pt-5 text-sm leading-relaxed text-slate-400">
              {MANIFESTO.closing}
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
};
