/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useMemo, useState} from 'react';
import {
  PHIEU_CREED, KHUNG, DANG_BAI, phieuLuyen, nhiemVuChiaSe, chamPhieu,
  xetNangCap, LUONG_LAM, PHIEU_SO, NGUONG_DAT, PHIEU_TOI_THIEU, LEVELS,
} from '../../data';
import {SectionHeader, Card, Chip, Stat, Filters} from './ui';

const VIEWS = [
  {id: 'luong', label: 'Luồng 10 bước'},
  {id: 'phieu', label: 'Tra phiếu'},
  {id: 'cham', label: 'Thử chấm & xét nâng cấp'},
];

const KY: {id: string; label: string}[] = [
  {id: 'tat-ca', label: 'Tất cả'},
  {id: 'listening', label: 'Nghe'},
  {id: 'speaking', label: 'Nói'},
  {id: 'reading', label: 'Đọc'},
  {id: 'writing', label: 'Viết'},
  {id: 'vocabulary', label: 'Từ vựng'},
  {id: 'grammar', label: 'Ngữ pháp'},
  {id: 'pronunciation', label: 'Phát âm'},
  {id: 'mindset', label: 'Tư duy'},
];

const TONE: Record<string, 'sky' | 'violet' | 'amber' | 'emerald' | 'rose'> = {
  KHOI: 'slate' as never, MAU: 'sky', DAN: 'violet', TU: 'amber', CHUOI: 'emerald',
};

/* ------------------------------ LUỒNG ----------------------------------- */

const Luong: React.FC = () => (
  <div className="space-y-3">
    <Card className="border-slate-700 bg-slate-900/80">
      <p className="text-sm leading-relaxed text-slate-300">{PHIEU_CREED.claim}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{PHIEU_CREED.kpi}</p>
    </Card>
    {LUONG_LAM.map((b) => (
      <div key={b.ma} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-lg font-black tabular-nums text-slate-400">
            {String(b.no).padStart(2, '0')}
          </span>
          <h3 className="font-semibold text-slate-100">{b.ten}</h3>
          <Chip tone={b.ai === 'học viên' ? 'sky' : b.ai === 'hệ thống' ? 'slate' : b.ai === 'trợ lý AI' ? 'violet' : 'emerald'}>
            {b.ai}
          </Chip>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{b.lam}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p className="rounded-lg bg-emerald-500/5 p-3 text-[12px] leading-relaxed text-emerald-200 ring-1 ring-inset ring-emerald-500/20">
            <span className="font-semibold">Ra cái gì — </span>{b.raGi}
          </p>
          <p className="rounded-lg bg-rose-500/5 p-3 text-[12px] leading-relaxed text-rose-200 ring-1 ring-inset ring-rose-500/20">
            <span className="font-semibold">Chặn khi — </span>{b.chanNeu}
          </p>
        </div>
      </div>
    ))}
    <Card className="border-amber-500/30 bg-amber-500/5">
      <p className="text-[13px] leading-relaxed text-amber-100">
        <span className="font-semibold">Giới hạn — </span>{PHIEU_CREED.limit}
      </p>
    </Card>
  </div>
);

/* ----------------------------- TRA PHIẾU -------------------------------- */

const TraPhieu: React.FC = () => {
  const [ky, setKy] = useState('tat-ca');
  const [cap, setCap] = useState('L1-1');
  const P = phieuLuyen();
  const NV = nhiemVuChiaSe();
  const loc = useMemo(
    () => P.filter((p) => p.levelId === cap && (ky === 'tat-ca' || p.skill === ky)),
    [P, cap, ky],
  );
  const [mo, setMo] = useState(0);
  const p = loc[Math.min(mo, loc.length - 1)];
  const nv = p ? NV.find((n) => n.id === p.nhiemVuId) : undefined;

  return (
    <div className="space-y-5">
      <Filters options={KY} value={ky} onChange={(v) => {setKy(v); setMo(0);}} />
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="ph-cap" className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
          Cấp độ
        </label>
        <select
          id="ph-cap"
          value={cap}
          onChange={(e) => {setCap(e.target.value); setMo(0);}}
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-sky-500 focus:outline-none">
          {LEVELS.map((l) => (
            <option key={l.id} value={l.id}>{l.id} · {l.name}</option>
          ))}
        </select>
        <span className="text-[12px] text-slate-400">{loc.length} phiếu</span>
      </div>

      {p && (
        <>
          <div className="flex flex-wrap gap-1.5">
            {loc.map((x, i) => (
              <button
                key={x.id}
                onClick={() => setMo(i)}
                className={`rounded-md px-2 py-1 text-[11px] font-medium transition ${
                  i === Math.min(mo, loc.length - 1)
                    ? 'bg-sky-500 text-slate-950'
                    : 'bg-slate-800/70 text-slate-400 hover:text-slate-200'
                }`}>
                {x.dangTen.length > 26 ? x.dangTen.slice(0, 26) + '…' : x.dangTen}
              </button>
            ))}
          </div>

          <Card>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-100">{p.ten}</h3>
              <div className="flex gap-1.5">
                <Chip tone="sky">{p.id}</Chip>
                <Chip tone="violet">{p.tongPhut} phút</Chip>
                <Chip tone="emerald">{p.tongCau} câu</Chip>
              </div>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
              <span className="font-semibold text-slate-400">Mục tiêu — </span>{p.mucTieu}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">
              <span className="font-semibold">Học liệu — </span>{p.hocLieu}
            </p>
            <p className="mt-3 rounded-lg bg-rose-500/5 p-3 text-[12px] leading-relaxed text-rose-200 ring-1 ring-inset ring-rose-500/20">
              <span className="font-semibold">Bẫy hay mắc — </span>{p.bayHayMac}
            </p>
          </Card>

          <div className="space-y-2">
            {p.phan.map((f) => (
              <div key={f.ma} className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="w-16 shrink-0 text-right">
                  <span className="block text-lg font-black tabular-nums text-slate-300">{f.soCau}</span>
                  <span className="block text-[11px] text-slate-400">{f.phut} phút</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-100">{f.no}. {f.ten}</span>
                    <Chip tone={TONE[f.ma] ?? 'slate'}>trọng số {f.trong}%</Chip>
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-slate-300">{f.lam}</span>
                  <span className="mt-1 block text-[12px] text-slate-400">{f.chuan}</span>
                </span>
              </div>
            ))}
          </div>

          {nv && (
            <Card className="border-emerald-500/30 bg-emerald-500/5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                Nhiệm vụ chia sẻ · {nv.id}
              </p>
              <p className="mt-2 font-medium text-slate-100">{nv.ten}</p>
              <dl className="mt-2 space-y-1.5 text-[13px] leading-relaxed">
                <div><dt className="inline font-semibold text-slate-400">Việc — </dt><dd className="inline text-slate-300">{nv.viec}</dd></div>
                <div><dt className="inline font-semibold text-slate-400">Chia sẻ — </dt><dd className="inline text-slate-300">{nv.chiaSe}</dd></div>
                <div><dt className="inline font-semibold text-slate-400">Bằng chứng — </dt><dd className="inline text-slate-300">{nv.bangChung}</dd></div>
                <div><dt className="inline font-semibold text-slate-400">Hạn — </dt><dd className="inline text-slate-300">{nv.hanGio} · {nv.phut} phút · {nv.diem} điểm</dd></div>
              </dl>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

/* ----------------------------- THỬ CHẤM --------------------------------- */

const ThuCham: React.FC = () => {
  const P = phieuLuyen();
  const p = P[0];
  const [dung, setDung] = useState<number[]>(KHUNG.map((k) => k.soCau));
  const kq = chamPhieu(p, dung);
  const [lichSu, setLichSu] = useState('95, 92, 90, 91, 88, 94, 96, 93');
  const diem = lichSu.split(',').map((x) => Number(x.trim())).filter((x) => !Number.isNaN(x));
  const xet = xetNangCap(diem);

  // Tách khỏi JSX: bộ kiểm chính tả đọc phần văn xuôi trong JSX, và toán tử ba
  // ngôi viết trong đó bị nó đọc thành dấu hai chấm có khoảng trắng đứng trước.
  const phuKpi = kq.datKpi
    ? 'qua ngưỡng, đủ điều kiện đi tiếp'
    : `phần mỏng nhất là ${kq.phanYeuNhat}`;

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-semibold text-slate-100">Chấm thử một phiếu</h3>
        <p className="mt-1 text-[13px] text-slate-400">
          Kéo số câu đúng của từng phần để xem hệ thống chấm, nhận xét và định hướng ra sao.
        </p>
        <div className="mt-4 space-y-3">
          {p.phan.map((f, i) => (
            <div key={f.ma} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-[12px] font-medium text-slate-300">{f.ten}</span>
              <input
                id={`ph-${f.ma}`}
                type="range"
                min={0}
                max={f.soCau}
                value={dung[i]}
                aria-label={`Số câu đúng phần ${f.ten}`}
                onChange={(e) => {
                  const v = [...dung];
                  v[i] = Number(e.target.value);
                  setDung(v);
                }}
                className="h-1 flex-1 accent-sky-500"
              />
              <span className="w-14 shrink-0 text-right text-[12px] tabular-nums text-slate-300">
                {dung[i]}/{f.soCau}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat value={`${kq.tiLe}%`} label="điểm phiếu" sub={`ngưỡng đạt ${NGUONG_DAT}%`} />
        <Stat value={kq.datKpi ? 'ĐẠT' : 'CHƯA'} label="KPI" sub={phuKpi} />
        <Stat value={kq.dinhHuong} label="định hướng" sub="hệ thống tự quyết theo ngưỡng" />
      </div>

      <Card>
        <p className="text-[13px] leading-relaxed text-slate-200">
          <span className="font-semibold text-slate-400">Nhận xét — </span>{kq.nhanXet}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
          <span className="font-semibold text-slate-400">Giải pháp — </span>{kq.giaiPhap}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-emerald-200">
          <span className="font-semibold">Bước kế — </span>{kq.buocKe}
        </p>
      </Card>

      <Card>
        <h3 className="font-semibold text-slate-100">Xét nâng giai đoạn theo KPI {NGUONG_DAT}%</h3>
        <p className="mt-1 text-[13px] text-slate-400">
          Nhập điểm các phiếu đã làm ở cấp hiện tại, cách nhau bằng dấu phẩy. Cần tối thiểu{' '}
          {PHIEU_TOI_THIEU} phiếu.
        </p>
        <input
          id="ph-lichsu"
          value={lichSu}
          onChange={(e) => setLichSu(e.target.value)}
          aria-label="Điểm các phiếu đã làm"
          className="mt-3 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <Stat value={String(xet.soPhieu)} label="phiếu đã làm" />
          <Stat value={`${xet.trungBinh}%`} label="trung bình" />
          <Stat value={`${xet.tiLeDat}%`} label="tỉ lệ phiếu đạt" sub={`${xet.soPhieuDat} phiếu`} />
          <Stat value={xet.duDieuKien ? 'ĐỦ' : 'CHƯA'} label="điều kiện xét nâng" />
        </div>
        <p className={`mt-3 rounded-lg p-3 text-[13px] leading-relaxed ring-1 ring-inset ${
          xet.duDieuKien
            ? 'bg-emerald-500/5 text-emerald-200 ring-emerald-500/20'
            : 'bg-amber-500/5 text-amber-100 ring-amber-500/20'
        }`}>
          {xet.ketLuan}
        </p>
      </Card>
    </div>
  );
};

/* -------------------------------- TAB ----------------------------------- */

export const Phieu: React.FC = () => {
  const [view, setView] = useState('luong');
  return (
    <div>
      <SectionHeader
        eyebrow="Hai nghìn phiếu luyện"
        title="Làm từng phần · nối chuỗi · chấm · nhận xét · nâng cấp"
        lead={PHIEU_CREED.claim}
      />
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={PHIEU_SO.soPhieu.toLocaleString('vi-VN')} label="phiếu luyện" sub={`${PHIEU_SO.soDangBai} dạng × ${PHIEU_SO.soCapDo} cấp`} />
        <Stat value={PHIEU_SO.soNhiemVu.toLocaleString('vi-VN')} label="nhiệm vụ chia sẻ" sub="mỗi phiếu đúng một" />
        <Stat value={PHIEU_SO.tongCau.toLocaleString('vi-VN')} label="câu luyện" sub={`${PHIEU_SO.soCauMoiPhieu} câu mỗi phiếu`} />
        <Stat value={`${PHIEU_SO.nguongDat}%`} label="ngưỡng đạt" sub={`${PHIEU_SO.soBuoc} bước trong luồng`} />
      </div>
      <Filters options={VIEWS} value={view} onChange={setView} />
      {view === 'luong' && <Luong />}
      {view === 'phieu' && <TraPhieu />}
      {view === 'cham' && <ThuCham />}
    </div>
  );
};
