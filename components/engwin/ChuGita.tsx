/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  CHU_GITA, CHU_GITA_CREED, CHU_GITA_SO, CAP_HANH_DONG, QUY_TAC_2080, MOI_TRUONG,
  GITA_HOA, SAN, GITA_HOA_CREED, GITA_HOA_SO, GITA_JOURNEY,
} from '../../data';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters} from './ui';

const CHU_TONE: Record<string, 'sky' | 'violet' | 'amber' | 'emerald'> = {
  G: 'sky', I: 'violet', T: 'amber', A: 'emerald',
};
const CHU_NEN: Record<string, string> = {
  G: 'from-sky-500 to-cyan-500',
  I: 'from-violet-500 to-fuchsia-500',
  T: 'from-amber-500 to-orange-500',
  A: 'from-emerald-500 to-teal-500',
};

const VIEWS = [
  {id: 'chu', label: 'Bốn chữ'},
  {id: 'hanhdong', label: 'Cấp hành động 20/80'},
  {id: 'moitruong', label: 'Môi trường rèn luyện'},
  {id: 'basan', label: 'GITA hoá ba sân'},
];

const BonChu: React.FC = () => (
  <div className="space-y-4">
    <Card className="border-slate-700 bg-slate-900/80">
      <p className="text-sm leading-relaxed text-slate-200">{CHU_GITA_CREED.phanBiet}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{CHU_GITA_CREED.thieuMotChu}</p>
    </Card>
    {CHU_GITA.map((c) => (
      <div key={c.chu} className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
        <div className={`flex items-baseline gap-4 bg-gradient-to-r ${CHU_NEN[c.chu]} px-5 py-4`}>
          <span className="text-4xl font-black leading-none text-slate-950">{c.chu}</span>
          <span>
            <span className="block text-sm font-bold text-slate-950">{c.tenAnh}</span>
            <span className="block text-lg font-black tracking-tight text-slate-950">{c.tenViet}</span>
          </span>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-1.5">
            {c.thanhTo.map((t) => (
              <Chip key={t} tone={CHU_TONE[c.chu]}>{t}</Chip>
            ))}
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-200">{c.laGi}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-400">
            <span className="font-semibold">Vì sao cần — </span>{c.viSaoCan}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <p className="rounded-lg bg-emerald-500/5 p-3 text-[12px] leading-relaxed text-emerald-200 ring-1 ring-inset ring-emerald-500/20">
              <span className="font-semibold">Khi có — </span>{c.khiCo}
            </p>
            <p className="rounded-lg bg-rose-500/5 p-3 text-[12px] leading-relaxed text-rose-200 ring-1 ring-inset ring-rose-500/20">
              <span className="font-semibold">Khi thiếu — </span>{c.khiThieu}
            </p>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-slate-300">
            <span className="font-semibold text-slate-400">Đo bằng — </span>{c.doBang}
          </p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            Nối vào hệ thống
          </p>
          <Bullets items={c.noiVaoHeThong} />
        </div>
      </div>
    ))}
  </div>
);

const HanhDong: React.FC = () => (
  <div className="space-y-4">
    <Card className="border-amber-500/30 bg-amber-500/5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
        {QUY_TAC_2080.ten}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-200">{QUY_TAC_2080.noiDung}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-amber-100">{QUY_TAC_2080.canhBao}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{QUY_TAC_2080.lamSaoBiet}</p>
    </Card>
    {CAP_HANH_DONG.map((a) => (
      <div key={a.no} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-lg font-black tabular-nums text-slate-400">
            {String(a.no).padStart(2, '0')}
          </span>
          <h3 className="font-semibold text-slate-100">{a.ten}</h3>
          <span className="ml-auto flex gap-2">
            <Chip tone="slate">{a.phanTramCongSuc}% công sức</Chip>
            <Chip tone="emerald">{a.phanTramKetQua}% kết quả</Chip>
          </span>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{a.moTa}</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-emerald-500" style={{width: `${a.phanTramKetQua}%`}} />
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-slate-300">
          <span className="font-semibold text-slate-400">Ví dụ — </span>{a.viDu}
        </p>
        <p className="mt-1.5 text-[12px] leading-relaxed text-rose-200">
          <span className="font-semibold">Dấu hiệu làm sai — </span>{a.dauHieuSai}
        </p>
      </div>
    ))}
  </div>
);

const MoiTruong: React.FC = () => (
  <div className="space-y-3">
    {MOI_TRUONG.map((m) => (
      <div key={m.no} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex items-baseline gap-3">
          <span className="text-lg font-black tabular-nums text-slate-400">
            {String(m.no).padStart(2, '0')}
          </span>
          <h3 className="font-semibold text-slate-100">{m.ten}</h3>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-200">
          <span className="font-semibold text-slate-400">Làm — </span>{m.lam}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
          <span className="font-semibold">Vì sao — </span>{m.viSao}
        </p>
        <p className="mt-2 rounded-lg bg-rose-500/5 p-3 text-[12px] leading-relaxed text-rose-200 ring-1 ring-inset ring-rose-500/20">
          <span className="font-semibold">Hỏng khi — </span>{m.hong}
        </p>
      </div>
    ))}
  </div>
);

const BaSan: React.FC = () => {
  const [buoc, setBuoc] = useState(1);
  const o = GITA_HOA.filter((x) => x.buocNo === buoc);
  const b = GITA_JOURNEY.find((x) => x.no === buoc);
  return (
    <div className="space-y-5">
      <Card className="border-slate-700 bg-slate-900/80">
        <p className="text-sm leading-relaxed text-slate-200">{GITA_HOA_CREED.viSao}</p>
        <p className="mt-2 text-sm leading-relaxed text-amber-100">{GITA_HOA_CREED.gioiHan}</p>
      </Card>

      <div className="grid gap-3 md:grid-cols-3">
        {SAN.map((s) => (
          <div key={s.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="font-semibold text-slate-100">{s.ten}</p>
            <p className="mt-1 text-[12px] text-slate-400">{s.ai}</p>
            <p className="mt-2 text-[12px] leading-relaxed text-emerald-200">{s.suc}</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-rose-200">{s.deSai}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {GITA_JOURNEY.map((x) => (
          <button
            key={x.no}
            onClick={() => setBuoc(x.no)}
            className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
              buoc === x.no ? 'bg-sky-500 text-slate-950' : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
            }`}>
            {x.no}. {x.shortName}
          </button>
        ))}
      </div>

      {b && (
        <p className="text-[13px] text-slate-400">
          Bước {b.no} · <span className="text-slate-200">{b.name}</span> · {b.phase} · {b.months}
        </p>
      )}

      <div className="grid gap-3 lg:grid-cols-3">
        {o.map((x) => (
          <div key={x.san} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <Chip tone={x.san === 'gia-dinh' ? 'emerald' : x.san === 'truong-hoc' ? 'sky' : 'violet'}>
              {x.sanTen}
            </Chip>
            <p className="mt-2 text-[13px] font-medium leading-relaxed text-slate-100">{x.bieuHien}</p>
            <dl className="mt-3 space-y-2 text-[12px] leading-relaxed">
              <div><dt className="inline font-semibold text-slate-400">Người lớn — </dt><dd className="inline text-slate-300">{x.viecNguoiLon}</dd></div>
              <div><dt className="inline font-semibold text-slate-400">Học sinh — </dt><dd className="inline text-slate-300">{x.viecHocSinh}</dd></div>
            </dl>
            <p className="mt-3 rounded-lg bg-emerald-500/5 p-2.5 text-[12px] leading-relaxed text-emerald-200 ring-1 ring-inset ring-emerald-500/20">
              <span className="font-semibold">Đang chạy — </span>{x.dangChay}
            </p>
            <p className="mt-2 rounded-lg bg-rose-500/5 p-2.5 text-[12px] leading-relaxed text-rose-200 ring-1 ring-inset ring-rose-500/20">
              <span className="font-semibold">Đang hỏng — </span>{x.dangHong}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ChuGita: React.FC = () => {
  const [view, setView] = useState('chu');
  return (
    <div>
      <SectionHeader
        eyebrow="Bốn chữ của mô thức"
        title="G · I · T · A — bốn thành phần chạy song song"
        lead={CHU_GITA_CREED.claim}
      />
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(CHU_GITA_SO.soChu)} label="chữ" sub="chạy song song, không nối tiếp" />
        <Stat value={String(CHU_GITA_SO.soThanhTo)} label="thành tố" sub="giữ nguyên theo tài liệu gốc" />
        <Stat value={String(CHU_GITA_SO.soCapHanhDong)} label="cấp hành động" sub="theo quy tắc 20/80" />
        <Stat value={String(GITA_HOA_SO.soO)} label="ô ba sân" sub={`${GITA_HOA_SO.soBuoc} bước × ${GITA_HOA_SO.soSan} sân`} />
      </div>
      <Filters options={VIEWS} value={view} onChange={setView} />
      {view === 'chu' && <BonChu />}
      {view === 'hanhdong' && <HanhDong />}
      {view === 'moitruong' && <MoiTruong />}
      {view === 'basan' && <BaSan />}
    </div>
  );
};
