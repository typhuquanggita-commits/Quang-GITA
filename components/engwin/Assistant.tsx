/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useMemo, useState} from 'react';
import {
  ASSISTANT_CREED,
  PACKAGES,
  KNOWLEDGE_SOURCES,
  DIALOGUE_ACTS,
  HABIT_SIGNALS,
  PERSIST_LADDER,
  BRIEF_RULES,
  AI_PROTOCOL,
  dossierYear,
  LEVELS,
  SYMPTOMS,
  solutions,
} from '../../data';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters, Accordion} from './ui';

const VIEWS = [
  {id: 'homnay', label: 'Bản giao việc hôm nay'},
  {id: 'quytrinh', label: 'Quy trình 6 bước'},
  {id: 'goi', label: 'Phạm vi theo gói'},
  {id: 'viec', label: 'Việc trợ lý làm được'},
  {id: 'thoiquen', label: 'Đo thói quen'},
  {id: 'giuchan', label: 'Thang giữ chân'},
  {id: 'kho', label: 'Kho tri thức'},
];

/* -------------------- BẢN GIAO VIỆC HÔM NAY (chạy thật) ------------------ */

const HomNay: React.FC = () => {
  const year = useMemo(() => dossierYear(), []);
  const kho = useMemo(() => solutions(), []);
  const [day, setDay] = useState(23);
  const [pkg, setPkg] = useState(PACKAGES[1].id);
  const [levelId, setLevelId] = useState('L1-2');
  const [budget, setBudget] = useState(45);
  const [symptomId, setSymptomId] = useState(SYMPTOMS[0].id);

  const d = year[Math.min(364, Math.max(0, day - 1))];
  const goi = PACKAGES.find((p) => p.id === pkg)!;
  const level = LEVELS.find((l) => l.id === levelId)!;
  const don = kho.find((x) => x.symptomId === symptomId && x.levelId === levelId);
  const symptom = SYMPTOMS.find((s) => s.id === symptomId)!;

  /*
   * Cắt cho vừa quỹ thời gian THẬT, và không bao giờ vượt quá nó.
   *
   * Bản đầu co đều cả sáu khối với sàn 2 phút mỗi khối. Sáu khối × 2 phút đã
   * là 12, nên khi người học chỉ có 10 phút thì trợ lý trả về 14 — hứa vừa
   * quỹ rồi phá lời hứa ngay trên cùng một màn hình.
   *
   * Cách đúng đã nằm sẵn trong đặc tả RÚT GỌN NGÀY XẤU: BỎ BỚT KHỐI, không co
   * đều. Giữ MỒI và GIEO ĐÊM trước tiên vì hai khối đó là thứ giữ chuỗi, rồi
   * thêm dần theo thứ tự ưu tiên chừng nào còn chỗ.
   */
  const UU_TIEN = ['MỒI', 'GIEO ĐÊM', 'PHẢN XẠ', 'NHIỆM VỤ', 'ĐẦU RA', 'NẠP'];
  const SAN = 2;

  const goc = d.blocks.reduce((s, b) => s + b.minutes, 0);
  let khoi: typeof d.blocks = [];

  if (goc === 0) {
    khoi = [];
  } else if (budget >= d.blocks.length * SAN) {
    // Đủ chỗ cho cả sáu khối: co theo tỉ lệ rồi bù phần lẻ vào khối dài nhất.
    const heSo = budget / goc;
    khoi = d.blocks.map((b) => ({
      ...b,
      minutes: Math.max(SAN, Math.round(b.minutes * heSo)),
    }));
    let lech = khoi.reduce((s, b) => s + b.minutes, 0) - budget;
    while (lech !== 0) {
      const i = khoi.reduce(
        (best, b, j) =>
          (lech > 0 ? b.minutes > khoi[best].minutes : b.minutes < khoi[best].minutes)
            ? j
            : best,
        0,
      );
      if (lech > 0 && khoi[i].minutes <= SAN) break;
      khoi[i] = {...khoi[i], minutes: khoi[i].minutes + (lech > 0 ? -1 : 1)};
      lech += lech > 0 ? -1 : 1;
    }
  } else {
    // Không đủ chỗ: bỏ bớt khối theo thứ tự ưu tiên, giữ đúng thứ tự trong ngày.
    const giu = new Set<string>();
    let conLai = budget;
    for (const slot of UU_TIEN) {
      if (conLai < SAN) break;
      if (d.blocks.some((b) => b.slot === slot)) {
        giu.add(slot);
        conLai -= SAN;
      }
    }
    khoi = d.blocks
      .filter((b) => giu.has(b.slot))
      .map((b) => ({...b, minutes: SAN}));
    // Phần dư dồn vào khối đầu tiên còn giữ.
    if (khoi.length && conLai > 0) {
      khoi[0] = {...khoi[0], minutes: khoi[0].minutes + conLai};
    }
  }

  const tong = khoi.reduce((s, b) => s + b.minutes, 0);
  const daBo = d.blocks.filter((b) => !khoi.some((k) => k.slot === b.slot));
  // Đơn kê không được chồng lên một ngày đã phải rút gọn.
  const donChay = budget >= 30;

  const chamDuocBangMay =
    /độ trễ|chép chính tả|đọc/i.test(d.measure) || d.kind !== 'luyện';

  return (
    <div>
      <Card className="mb-6">
        <h3 className="text-sm font-bold text-slate-100">
          Thử bản giao việc — đổi bốn thông số, xem trợ lý trả về gì
        </h3>
        <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
          Đây không phải ảnh minh hoạ. Nội dung dưới đây được dựng thật từ hồ sơ
          365 ngày, 25 cấp độ và kho 1.000 đơn kê — đúng những gì trợ lý đọc.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="a-day" className="text-[11px] font-medium text-slate-400">
              Ngày thứ (1–365)
            </label>
            <input
              id="a-day"
              type="number"
              min={1}
              max={365}
              value={day}
              onChange={(e) => setDay(Number(e.currentTarget.value) || 1)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-sky-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="a-budget" className="text-[11px] font-medium text-slate-400">
              Quỹ thời gian hôm nay
            </label>
            <select
              id="a-budget"
              value={budget}
              onChange={(e) => setBudget(Number(e.currentTarget.value))}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-sky-500 focus:outline-none">
              {[10, 20, 30, 45, 60, 90].map((m) => (
                <option key={m} value={m}>
                  {m} phút
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="a-level" className="text-[11px] font-medium text-slate-400">
              Cấp độ
            </label>
            <select
              id="a-level"
              value={levelId}
              onChange={(e) => setLevelId(e.currentTarget.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-sky-500 focus:outline-none">
              {LEVELS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.id} — {l.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="a-pkg" className="text-[11px] font-medium text-slate-400">
              Gói khoá học
            </label>
            <select
              id="a-pkg"
              value={pkg}
              onChange={(e) => setPkg(e.currentTarget.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-sky-500 focus:outline-none">
              {PACKAGES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="a-sym" className="text-[11px] font-medium text-slate-400">
            Triệu chứng trợ lý đã chẩn ra tuần này
          </label>
          <select
            id="a-sym"
            value={symptomId}
            onChange={(e) => setSymptomId(e.currentTarget.value)}
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-sky-500 focus:outline-none">
            {SYMPTOMS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* ---------- Bản giao việc ---------- */}
      <Card className="border-sky-500/30 bg-slate-950/60">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">
              Trợ lý học viện
            </p>
            <h3 className="mt-0.5 text-base font-bold text-slate-100">
              Ngày {d.day} · {d.weekday} · {d.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Chip tone="sky">{d.kind}</Chip>
            <Chip>{tong}′ hôm nay</Chip>
            <Chip tone="violet">{goi.name}</Chip>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-300">{d.focus}</p>

        {budget < 20 && (
          <p className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-2.5 text-[11px] leading-relaxed text-amber-200">
            Hôm nay là ngày xấu. Trợ lý rút xuống bản tối thiểu và ngày này VẪN
            tính vào chuỗi. Nhưng không được rút gọn hai ngày liên tiếp — ngày
            mai trợ lý sẽ hỏi có chuyện gì đang xảy ra.
          </p>
        )}

        {d.kind !== 'trắng' && (
          <ol className="mt-4 space-y-1.5">
            {khoi.map((b) => (
              <li
                key={b.slot}
                className="flex gap-3 rounded-lg border border-slate-800 bg-slate-900/40 px-3 py-2">
                <span className="w-20 shrink-0 text-[11px] font-bold text-slate-300">
                  {b.slot}
                </span>
                <span className="w-10 shrink-0 text-[11px] tabular-nums text-sky-400">
                  {b.minutes}′
                </span>
                <span className="min-w-0 text-[11px] leading-relaxed text-slate-400">
                  {b.what}
                </span>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-amber-500/25 bg-amber-500/[0.04] p-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
              Nhiệm vụ đời thật
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
              {d.mission}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
              Bằng chứng phải nộp: {d.evidence}
            </p>
          </div>
          <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/[0.04] p-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              Con số duy nhất được chấm hôm nay
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
              {d.measure}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
              {chamDuocBangMay
                ? 'Máy chấm ngay khi bạn nộp.'
                : 'Phần này cần coach chấm — trợ lý xếp hàng và báo khi có kết quả.'}
            </p>
          </div>
        </div>

        {daBo.length > 0 && (
          <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
            Đã bỏ hôm nay: {daBo.map((b) => b.slot).join(', ')}. Bỏ khối không
            phải bỏ ngày — chuỗi vẫn liền.
          </p>
        )}

        {d.reviewDays.length > 0 && (
          <p className="mt-3 text-[11px] text-slate-400">
            Ôn lại nội dung của ngày {d.reviewDays.join(', ')} — theo lịch giãn
            cách, không phải ôn tất cả.
          </p>
        )}

        {don && donChay && (
          <div className="mt-4 rounded-lg border border-violet-500/25 bg-violet-500/[0.04] p-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-violet-300">
              Đơn kê đang chạy · {symptom.name} · {level.id}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
              {don.today}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
              Đo lại: {don.remeasure}
            </p>
          </div>
        )}

        {don && !donChay && (
          <p className="mt-4 rounded-lg border border-slate-700 bg-slate-900/50 p-3 text-[11px] leading-relaxed text-slate-400">
            Đơn kê <span className="text-slate-300">{symptom.name}</span> tạm
            dừng hôm nay. Chồng thêm 12 phút lên một ngày {tong} phút là cách
            chắc chắn để không việc nào được làm xong.
          </p>
        )}

        <div className="mt-4 rounded-lg border border-rose-500/20 bg-rose-500/[0.03] p-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-rose-300">
            Ở gói {goi.name}, trợ lý KHÔNG làm
          </p>
          <ul className="mt-1.5 space-y-0.5">
            {goi.aiCannot.map((x) => (
              <li key={x} className="text-[11px] leading-relaxed text-slate-400">
                · {x}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <h4 className="text-sm font-bold text-slate-100">
            Bản giao việc gồm đúng sáu phần
          </h4>
          <div className="mt-2">
            <Bullets items={BRIEF_RULES.shape} />
          </div>
        </Card>
        <Card className="border-rose-500/25">
          <h4 className="text-sm font-bold text-rose-200">Bốn điều không có</h4>
          <div className="mt-2">
            <Bullets items={BRIEF_RULES.limits} />
          </div>
        </Card>
      </div>
    </div>
  );
};

/* ------------------------------ CÁC KHUNG KHÁC --------------------------- */

const QuyTrinh: React.FC = () => (
  <div className="space-y-3">
    {AI_PROTOCOL.map((s) => (
      <Card key={s.no} className="flex flex-col gap-3 md:flex-row">
        <div className="shrink-0 md:w-28">
          <span className="text-2xl font-black text-sky-500/60">
            {String(s.no).padStart(2, '0')}
          </span>
          <p className="text-sm font-bold text-slate-100">{s.name}</p>
        </div>
        <div className="min-w-0 flex-1 space-y-2 text-[11px] leading-relaxed">
          <p className="text-slate-400">
            <span className="font-semibold text-slate-300">Nhận vào: </span>
            {s.input}
          </p>
          <p className="text-slate-400">
            <span className="font-semibold text-slate-300">Làm gì: </span>
            {s.does}
          </p>
          <p className="text-slate-400">
            <span className="font-semibold text-slate-300">Đưa ra: </span>
            {s.output}
          </p>
          <p className="rounded bg-violet-500/10 px-2 py-1.5 text-violet-200">
            <span className="font-semibold">Người phải quyết: </span>
            {s.humanGate}
          </p>
          <p className="rounded bg-rose-500/10 px-2 py-1.5 text-rose-200">
            <span className="font-semibold">Không được: </span>
            {s.limit}
          </p>
        </div>
      </Card>
    ))}
  </div>
);

const Goi: React.FC = () => (
  <div className="grid gap-4 lg:grid-cols-3">
    {PACKAGES.map((p) => (
      <Card key={p.id} className="flex h-full flex-col">
        <h4 className="text-sm font-bold text-slate-100">{p.name}</h4>
        <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">{p.who}</p>
        <p className="mt-2 rounded bg-violet-500/10 px-2 py-1.5 text-[11px] leading-relaxed text-violet-200">
          {p.humanContact}
        </p>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-emerald-300">
          Trợ lý được làm
        </p>
        <ul className="mt-1 space-y-0.5">
          {p.aiScope.map((x) => (
            <li key={x} className="text-[11px] leading-relaxed text-slate-400">
              · {x}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-rose-300">
          Trợ lý không được làm
        </p>
        <ul className="mt-1 space-y-0.5">
          {p.aiCannot.map((x) => (
            <li key={x} className="text-[11px] leading-relaxed text-slate-400">
              · {x}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-3 text-[11px] leading-relaxed text-amber-300/80">
          Nâng gói khi: {p.upgradeWhen}
        </p>
      </Card>
    ))}
  </div>
);

const Viec: React.FC = () => (
  <div className="space-y-3">
    {DIALOGUE_ACTS.map((a) => (
      <Accordion
        key={a.id}
        title={a.name}
        subtitle={a.trigger}
        defaultOpen={a.id === 'd-today'}>
        <p className="text-xs leading-relaxed text-slate-300">{a.does}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {a.needs.map((n) => (
            <Chip key={n}>{n}</Chip>
          ))}
        </div>
        <p className="mt-3 rounded bg-amber-500/10 px-2.5 py-2 text-[11px] leading-relaxed text-amber-200">
          <span className="font-semibold">Rào chắn: </span>
          {a.guardrail}
        </p>
        <p className="mt-1.5 rounded bg-violet-500/10 px-2.5 py-2 text-[11px] leading-relaxed text-violet-200">
          <span className="font-semibold">Chuyển người khi: </span>
          {a.handoff}
        </p>
      </Accordion>
    ))}
  </div>
);

const ThoiQuen: React.FC = () => (
  <div className="grid gap-4 lg:grid-cols-2">
    {HABIT_SIGNALS.map((h) => (
      <Card key={h.id} className="flex h-full flex-col">
        <h4 className="text-sm font-bold text-slate-100">{h.name}</h4>
        <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
          {h.measures}
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
          Lấy từ: {h.source}
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded border border-emerald-500/25 bg-emerald-500/[0.05] p-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              Khoẻ
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-300">
              {h.healthy}
            </p>
          </div>
          <div className="rounded border border-rose-500/25 bg-rose-500/[0.05] p-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-rose-300">
              Báo động
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-slate-300">
              {h.warning}
            </p>
          </div>
        </div>
        <p className="mt-auto pt-3 text-[11px] leading-relaxed text-sky-300/90">
          Trợ lý làm gì: {h.action}
        </p>
      </Card>
    ))}
  </div>
);

const GiuChan: React.FC = () => (
  <div className="space-y-3">
    {PERSIST_LADDER.map((r) => (
      <Card key={r.no} className="flex flex-col gap-3 md:flex-row">
        <div className="shrink-0 md:w-40">
          <span className="text-2xl font-black text-rose-500/80">
            {String(r.no).padStart(2, '0')}
          </span>
          <p className="text-sm font-bold text-slate-100">{r.name}</p>
          <p className="mt-0.5 text-[11px] leading-snug text-slate-400">
            {r.trigger}
          </p>
        </div>
        <div className="min-w-0 flex-1 space-y-2 text-[11px] leading-relaxed">
          <p className="text-slate-300">{r.aiDoes}</p>
          <p className="text-slate-400">Giọng: {r.tone}</p>
          <p className="rounded bg-violet-500/10 px-2 py-1.5 text-violet-200">
            Người vào cuộc: {r.humanAt}
          </p>
        </div>
      </Card>
    ))}
  </div>
);

const Kho: React.FC = () => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[760px] text-[11px]">
      <thead>
        <tr className="border-b border-slate-800 text-left text-slate-400">
          <th className="py-2 pr-3 font-medium">Kho</th>
          <th className="py-2 pr-3 font-medium">Chứa gì</th>
          <th className="py-2 pr-3 font-medium">Dùng để</th>
          <th className="py-2 font-medium">Không được dùng để</th>
        </tr>
      </thead>
      <tbody>
        {KNOWLEDGE_SOURCES.map((k) => (
          <tr key={k.id} className="border-b border-slate-900 align-top">
            <td className="py-2.5 pr-3 font-semibold text-slate-200">{k.store}</td>
            <td className="py-2.5 pr-3 text-slate-400">{k.holds}</td>
            <td className="py-2.5 pr-3 text-emerald-300/80">{k.usedFor}</td>
            <td className="py-2.5 text-rose-300/80">{k.mustNot}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* --------------------------------- TAB ----------------------------------- */

export const Assistant: React.FC = () => {
  const [view, setView] = useState('homnay');

  return (
    <div>
      <SectionHeader
        eyebrow="Trợ lý AI"
        title={ASSISTANT_CREED.name}
        lead={ASSISTANT_CREED.claim}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(KNOWLEDGE_SOURCES.length)} label="Kho tri thức đọc được" sub="Mỗi kho có giới hạn riêng" />
        <Stat value={String(DIALOGUE_ACTS.length)} label="Việc làm được" sub="Mỗi việc có rào chắn" />
        <Stat value={String(HABIT_SIGNALS.length)} label="Tín hiệu thói quen" sub="Đo bằng dữ liệu, không hỏi cảm nhận" />
        <Stat value={String(PACKAGES.length)} label="Gói khoá học" sub="Phạm vi trợ lý khác nhau" />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-sm font-bold text-slate-100">Đúng một việc</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">
            {ASSISTANT_CREED.oneJob}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {ASSISTANT_CREED.why}
          </p>
        </Card>
        <Card className="border-amber-500/25 bg-amber-500/[0.03]">
          <h3 className="text-sm font-bold text-amber-200">Hai điều nói trước</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {ASSISTANT_CREED.notAChatbot}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {ASSISTANT_CREED.neverPretends}
          </p>
        </Card>
      </div>

      <Filters options={VIEWS} value={view} onChange={setView} />

      {view === 'homnay' && <HomNay />}
      {view === 'quytrinh' && <QuyTrinh />}
      {view === 'goi' && <Goi />}
      {view === 'viec' && <Viec />}
      {view === 'thoiquen' && <ThoiQuen />}
      {view === 'giuchan' && <GiuChan />}
      {view === 'kho' && <Kho />}
    </div>
  );
};
