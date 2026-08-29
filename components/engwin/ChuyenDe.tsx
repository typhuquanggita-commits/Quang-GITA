/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  CHUYENDE_CREED, LOAI_PHIEU, CHUYENDE_SO, DANG_BAI,
  boCuaChuyenDe, giaiCuaPhieu,
} from '../../data';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters} from './ui';

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

const LOAI_TONE: Record<string, 'sky' | 'violet' | 'amber' | 'emerald' | 'rose' | 'slate'> = {
  LT: 'sky', DB: 'violet', KN: 'emerald', NC: 'amber', OT: 'rose', TH: 'rose', OC: 'slate',
};

export const ChuyenDe: React.FC = () => {
  const [ky, setKy] = useState('tat-ca');
  const ds = DANG_BAI.filter((d) => ky === 'tat-ca' || d.skill === ky);
  const [cd, setCd] = useState(DANG_BAI[0].id);
  const chon = ds.some((d) => d.id === cd) ? cd : ds[0]?.id;
  const bo = chon ? boCuaChuyenDe(chon) : [];
  const [moGiai, setMoGiai] = useState<string | null>(null);

  return (
    <div>
      <SectionHeader
        eyebrow="Bộ phiếu theo chuyên đề"
        title="Bảy phiếu mỗi chuyên đề, mỗi phiếu một phiếu giải riêng"
        lead={CHUYENDE_CREED.claim}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(CHUYENDE_SO.soChuyenDe)} label="chuyên đề" sub={`${CHUYENDE_SO.soLoai} loại phiếu mỗi chuyên đề`} />
        <Stat value={String(CHUYENDE_SO.soPhieu)} label="phiếu chuyên đề" sub="theo đúng thứ tự học" />
        <Stat value={String(CHUYENDE_SO.soPhieuGiai)} label="phiếu giải" sub="kèm bảng phân tích chuyên sâu" />
        <Stat value={String(CHUYENDE_SO.tongPhieu)} label="tổng phiếu" sub={`${Math.round(CHUYENDE_SO.tongPhut / 60)} giờ`} />
      </div>

      <Card className="mb-6 border-amber-500/30 bg-amber-500/5">
        <p className="text-[13px] leading-relaxed text-amber-100">
          <span className="font-semibold">Thứ tự không đảo được — </span>{CHUYENDE_CREED.thuTu}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
          <span className="font-semibold text-slate-400">Phiếu giải — </span>{CHUYENDE_CREED.giaiKhongChiLaDapAn}
        </p>
      </Card>

      <div className="mb-4">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
          Bảy loại phiếu
        </h3>
        <div className="grid gap-2 md:grid-cols-2">
          {LOAI_PHIEU.map((l) => (
            <div key={l.ma} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone={LOAI_TONE[l.ma]}>{l.no}. {l.ma}</Chip>
                <span className="font-semibold text-slate-100">{l.ten}</span>
                <span className="ml-auto text-[11px] text-slate-400">{l.phut} phút</span>
              </div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300">{l.mucDich}</p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-400">
                <span className="font-semibold">Ra cái gì — </span>{l.raGi}
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-rose-200">
                <span className="font-semibold">Chặn khi — </span>{l.chanNeu}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Filters options={KY} value={ky} onChange={setKy} />
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <label htmlFor="cd-pick" className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
          Chuyên đề
        </label>
        <select
          id="cd-pick"
          value={chon}
          onChange={(e) => {setCd(e.target.value); setMoGiai(null);}}
          className="max-w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-sky-500 focus:outline-none">
          {ds.map((d) => (
            <option key={d.id} value={d.id}>{d.id} · {d.ten}</option>
          ))}
        </select>
        <span className="text-[12px] text-slate-400">{ds.length} chuyên đề</span>
      </div>

      <div className="space-y-3">
        {bo.map((p) => {
          const g = giaiCuaPhieu(p.id);
          const mo = moGiai === p.id;
          return (
            <div key={p.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone={LOAI_TONE[p.loaiMa]}>{p.loaiNo}. {p.loaiTen.replace('PHIẾU ', '')}</Chip>
                <span className="font-mono text-[11px] text-slate-400">{p.id}</span>
                <span className="ml-auto text-[11px] text-slate-400">{p.phut} phút</span>
              </div>
              <h4 className="mt-2 font-semibold text-slate-100">{p.ten}</h4>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300">{p.mucDich}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                Trong phiếu có
              </p>
              <Bullets items={p.cauTruc} />
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <p className="text-[12px] leading-relaxed text-slate-400">
                  <span className="font-semibold">Khi nào làm — </span>{p.khiNaoLam}
                </p>
                <p className="text-[12px] leading-relaxed text-emerald-200">
                  <span className="font-semibold">Ra cái gì — </span>{p.raGi}
                </p>
              </div>

              <button
                onClick={() => setMoGiai(mo ? null : p.id)}
                className={`mt-3 rounded-lg px-3 py-1.5 text-[12px] font-medium transition ${
                  mo ? 'bg-slate-700 text-slate-100' : 'bg-sky-500 text-slate-950 hover:bg-sky-400'
                }`}>
                {mo ? 'Đóng phiếu giải' : 'Xem đáp án và bảng phân tích'}
              </button>

              {mo && g && (
                <div className="mt-3 rounded-xl border border-sky-500/30 bg-sky-500/5 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sky-300">
                    {g.ten}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-amber-200">
                    <span className="font-semibold">Mở khi nào — </span>{g.moKhiNao}
                  </p>

                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Bảng phân tích chuyên sâu
                  </p>
                  <div className="mt-1.5 overflow-x-auto">
                    <table className="w-full min-w-[560px] border-collapse text-left text-[12px]">
                      <thead>
                        <tr className="border-b border-slate-700 text-[10px] uppercase tracking-[0.12em] text-slate-400">
                          <th className="py-1.5 pr-3 font-semibold">Điểm kiến thức</th>
                          <th className="py-1.5 pr-3 font-semibold">Bản chất</th>
                          <th className="py-1.5 font-semibold">Hay nhầm với</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {g.bangPhanTich.map((r, i) => (
                          <tr key={i} className="align-top">
                            <td className="py-2 pr-3 font-medium text-slate-200">{r.diem}</td>
                            <td className="py-2 pr-3 leading-relaxed text-slate-300">{r.banChat}</td>
                            <td className="py-2 leading-relaxed text-rose-200">{r.hayNhamVoi}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Ba bẫy và chỗ lập luận gãy
                  </p>
                  <div className="mt-1.5 space-y-1.5">
                    {g.bay.map((b, i) => (
                      <p key={i} className="text-[12px] leading-relaxed text-slate-300">
                        <span className="text-rose-300">✕ {b.chon}</span> — {b.saiODau}
                      </p>
                    ))}
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <p className="text-[12px] leading-relaxed text-sky-100">
                      <span className="font-semibold">Tự kiểm — </span>{g.tuKiem}
                    </p>
                    <p className="text-[12px] leading-relaxed text-emerald-200">
                      <span className="font-semibold">Nếu sai — </span>{g.neuSai}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
