/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useMemo, useState} from 'react';
import {DANG_BAI, LEVELS} from '../../data';
// Nạp thẳng, không qua thùng chung. Xem ghi chú cuối data/index.ts.
import {boDe, BODE_SO, BODE_CREED, KHO_BI_KIP, deTheoDang} from '../../data/bode';
import {SectionHeader, Card, Chip, Stat, Filters} from './ui';

const KY = [
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

const CHIEU: {ten: string; tone: 'sky' | 'violet' | 'emerald' | 'amber' | 'rose' | 'slate'}[] = [
  {ten: 'Kiến thức', tone: 'sky'},
  {ten: 'Dạng bài', tone: 'violet'},
  {ten: 'Đọc vị', tone: 'emerald'},
  {ten: 'Phương pháp', tone: 'amber'},
  {ten: 'Bước giải', tone: 'rose'},
  {ten: 'Mẹo xử lý', tone: 'slate'},
  {ten: 'Bí kíp', tone: 'sky'},
];

const Muc: React.FC<{ten: string; children: React.ReactNode}> = ({ten, children}) => (
  <div className="mt-3">
    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">{ten}</p>
    <div className="mt-1">{children}</div>
  </div>
);

export const BoDe: React.FC = () => {
  const [ky, setKy] = useState('tat-ca');
  const dsDang = DANG_BAI.filter((d) => ky === 'tat-ca' || d.skill === ky);
  const [dangId, setDangId] = useState(DANG_BAI[0].id);
  const dang = dsDang.some((d) => d.id === dangId) ? dangId : dsDang[0]?.id;
  const [capNo, setCapNo] = useState(0);

  const ds = useMemo(() => (dang ? deTheoDang(dang) : []), [dang]);
  const de = ds[Math.min(capNo, ds.length - 1)];
  const biKip = KHO_BI_KIP.find((k) => k.dangId === dang);

  return (
    <div>
      <SectionHeader
        eyebrow="Bộ 2.000 đề · bảy chiều phân tích"
        title="Mỗi phiếu luyện một bảng: kiến thức, dạng bài, đọc vị, phương pháp, bước giải, mẹo, bí kíp"
        lead={BODE_CREED.claim}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(BODE_SO.soDe)} label="bảng phân tích" sub={`${BODE_SO.soDangBai} dạng × ${BODE_SO.soCap} cấp`} />
        <Stat value={String(BODE_SO.soChieuPhanTich)} label="chiều mỗi bảng" sub="mỗi chiều một việc khác nhau" />
        <Stat value={String(BODE_SO.soBaremPhan)} label="dòng barem" sub="nói cả chỗ trừ điểm" />
        <Stat value={String(BODE_SO.soBiKip)} label="bí kíp" sub="gom theo dạng để đọc hết được" />
      </div>

      <Card className="mb-6 border-amber-500/30 bg-amber-500/5">
        <p className="text-[13px] leading-relaxed text-amber-100">
          <span className="font-semibold">Đây là gì và KHÔNG là gì — </span>
          {BODE_CREED.khongPhai}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
          <span className="font-semibold text-slate-400">Đếm cho đúng — </span>
          {BODE_CREED.demChoDung}
        </p>
      </Card>

      <div className="mb-3">
        <Filters options={KY} value={ky} onChange={setKy} />
      </div>
      <div className="mb-4">
        <Filters
          options={dsDang.map((d) => ({id: d.id, label: d.ten}))}
          value={dang ?? ''}
          onChange={(v) => {
            setDangId(v);
            setCapNo(0);
          }}
        />
      </div>

      {de && (
        <>
          <Card className="mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-slate-100">{de.dangTen}</span>
              <Chip tone="sky">cấp {de.tenCap}</Chip>
              <Chip tone="slate">tầng {de.tier}</Chip>
              <Chip tone="emerald">đạt từ {de.nguongDat}%</Chip>
            </div>
            <label className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
              Cấp độ ({capNo + 1}/{ds.length})
            </label>
            <input
              type="range"
              min={0}
              max={ds.length - 1}
              value={Math.min(capNo, ds.length - 1)}
              onChange={(e) => setCapNo(Number(e.currentTarget.value))}
              aria-label="Chọn cấp độ"
              className="mt-1 w-full accent-sky-500"
            />
            <p className="mt-1 text-[12px] text-slate-400">
              Kéo để xem cùng dạng bài này được dạy khác đi thế nào qua {LEVELS.length} cấp độ.
            </p>
          </Card>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {CHIEU.map((c, i) => (
              <Chip key={c.ten} tone={c.tone}>
                {i + 1}. {c.ten}
              </Chip>
            ))}
          </div>

          <Card>
            <Muc ten="1 · Kiến thức — đề này thật sự kiểm cái gì">
              {de.kienThuc.map((k, i) => (
                <p key={i} className="text-[13px] leading-relaxed text-slate-200">
                  · {k}
                </p>
              ))}
            </Muc>
            <Muc ten="2 · Dạng bài">
              <p className="text-[13px] leading-relaxed text-slate-200">{de.dangBai}</p>
            </Muc>
            <Muc ten="3 · Đọc vị — dấu hiệu nhận ra dạng này trong đề lạ">
              {de.docVi.map((k, i) => (
                <p key={i} className="text-[13px] leading-relaxed text-emerald-200">
                  · {k}
                </p>
              ))}
            </Muc>
            <Muc ten="4 · Phương pháp làm">
              <p className="text-[13px] leading-relaxed text-amber-100">{de.phuongPhap}</p>
            </Muc>
            <Muc ten="5 · Bước giải">
              <ol className="space-y-1">
                {de.buocGiai.map((b, i) => (
                  <li key={i} className="text-[13px] leading-relaxed text-slate-200">
                    <span className="font-semibold text-slate-400">{i + 1}. </span>
                    {b}
                  </li>
                ))}
              </ol>
            </Muc>
            <Muc ten="6 · Mẹo xử lý và nhận diện bẫy">
              {de.meoXuLy.map((k, i) => (
                <p key={i} className="text-[13px] leading-relaxed text-rose-200">
                  · {k}
                </p>
              ))}
            </Muc>
            <Muc ten="7 · Bí kíp mang đi được">
              <p className="text-[13px] leading-relaxed text-sky-200">{de.biKip}</p>
            </Muc>
          </Card>

          <div className="mt-5">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
              Barem chấm — {de.barem.length} phần
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-800">
                    {['Phần', 'Câu', 'Trọng số', 'Cách chấm', 'Trừ điểm'].map((h) => (
                      <th key={h} className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {de.barem.map((b) => (
                    <tr key={b.ma} className="border-b border-slate-800/60 align-top">
                      <td className="px-2 py-2 text-[12px] font-semibold text-slate-100">{b.ten}</td>
                      <td className="px-2 py-2 text-[12px] tabular-nums text-slate-300">{b.soCau}</td>
                      <td className="px-2 py-2 text-[12px] tabular-nums text-slate-300">{b.trong}%</td>
                      <td className="px-2 py-2 text-[12px] leading-relaxed text-slate-300">{b.barem}</td>
                      <td className="px-2 py-2 text-[12px] leading-relaxed text-rose-200">{b.truDiem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {biKip && (
            <Card className="mt-5 border-sky-500/30 bg-sky-500/5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                Kho bí kíp — {biKip.dangTen}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-sky-100">
                <span className="font-semibold">Chuẩn tự kiểm — </span>
                {biKip.chuanTuKiem}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-emerald-200">
                <span className="font-semibold">Nếu sai — </span>
                {biKip.khiSai}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-rose-200">
                <span className="font-semibold">Ba bẫy — </span>
                {biKip.baBay.join(' · ')}
              </p>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
