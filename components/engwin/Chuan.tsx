/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  CHUAN, CHUAN_SO, CHUAN_CREED, TANG_HAP_THU, CAP_CHUYEN_MON, giaoDuoc,
} from '../../data';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters} from './ui';

const KL_TONE: Record<string, 'emerald' | 'amber' | 'rose'> = {
  'đạt': 'emerald', 'đạt một phần': 'amber', 'chưa đạt': 'rose',
};

const VIEWS = [
  {id: 'chuan', label: '16 chuẩn quốc tế'},
  {id: 'tang', label: 'Tầng hấp thu của khách hàng'},
  {id: 'capcm', label: 'Cấp chuyên môn của người phục vụ'},
];

const BangChuan: React.FC = () => {
  const [loc, setLoc] = useState('tat-ca');
  const ds = CHUAN.filter((c) => loc === 'tat-ca' || c.datToiDau === loc);
  return (
    <div className="space-y-4">
      <Card className="border-slate-700 bg-slate-900/80">
        <p className="text-sm leading-relaxed text-slate-200">{CHUAN_CREED.luat}</p>
        <p className="mt-2 text-sm leading-relaxed text-amber-100">{CHUAN_CREED.vaBang}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{CHUAN_CREED.khongHua}</p>
      </Card>
      <Filters
        options={[
          {id: 'tat-ca', label: `Tất cả (${CHUAN.length})`},
          {id: 'đạt', label: `Đạt (${CHUAN_SO.dat})`},
          {id: 'đạt một phần', label: `Đạt một phần (${CHUAN_SO.motPhan})`},
          {id: 'chưa đạt', label: `Chưa đạt (${CHUAN_SO.chuaDat})`},
        ]}
        value={loc}
        onChange={setLoc}
      />
      {ds.map((c) => (
        <div key={c.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-semibold text-slate-100">{c.ten}</h3>
            <Chip tone={KL_TONE[c.datToiDau]}>{c.datToiDau}</Chip>
          </div>
          <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-slate-400">{c.nguon}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{c.noiLaGi}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-200">
            <span className="font-semibold text-slate-400">Hệ thống làm gì — </span>{c.hethongLamGi}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <p className="rounded-lg bg-emerald-500/5 p-3 text-[12px] leading-relaxed text-emerald-200 ring-1 ring-inset ring-emerald-500/20">
              <span className="font-semibold">Bằng chứng — </span>{c.bangChung}
            </p>
            <p className="rounded-lg bg-rose-500/5 p-3 text-[12px] leading-relaxed text-rose-200 ring-1 ring-inset ring-rose-500/20">
              <span className="font-semibold">Còn thiếu — </span>{c.conThieu}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Tang: React.FC = () => (
  <div className="space-y-3">
    {TANG_HAP_THU.map((t) => (
      <div key={t.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-lg font-black tabular-nums text-slate-400">
            {String(t.no).padStart(2, '0')}
          </span>
          <h3 className="font-semibold text-slate-100">{t.ten}</h3>
          <span className="ml-auto text-[11px] text-slate-400">
            {CAP_CHUYEN_MON.filter((c) => giaoDuoc(c.id, t.no)).length} cấp chuyên môn phục vụ được
          </span>
        </div>
        <dl className="mt-2.5 space-y-1.5 text-[13px] leading-relaxed">
          <div><dt className="inline font-semibold text-slate-400">Ai — </dt><dd className="inline text-slate-300">{t.ai}</dd></div>
          <div><dt className="inline font-semibold text-slate-400">Nhận gì — </dt><dd className="inline text-slate-200">{t.nhanGi}</dd></div>
          <div><dt className="inline font-semibold text-slate-400">Chiều sâu — </dt><dd className="inline text-slate-300">{t.chieuSau}</dd></div>
          <div><dt className="inline font-semibold text-emerald-400">Đo được — </dt><dd className="inline text-slate-300">{t.doDuoc}</dd></div>
          <div><dt className="inline font-semibold text-rose-400">Chưa hợp — </dt><dd className="inline text-slate-300">{t.chuaHop}</dd></div>
        </dl>
      </div>
    ))}
  </div>
);

const CapCM: React.FC = () => (
  <div className="space-y-5">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left text-[12px]">
        <thead>
          <tr className="border-b border-slate-800 text-[10px] uppercase tracking-[0.12em] text-slate-400">
            <th className="w-64 py-2 pr-3 font-semibold">Cấp chuyên môn</th>
            {TANG_HAP_THU.map((t) => (
              <th key={t.id} className="px-2 py-2 text-center font-semibold">Tầng {t.no}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/70">
          {CAP_CHUYEN_MON.map((c) => (
            <tr key={c.id}>
              <td className="py-2 pr-3">
                <span className="block font-medium text-slate-200">{c.ten}</span>
                <span className="block text-[11px] text-slate-400">{c.vaiTro}</span>
              </td>
              {TANG_HAP_THU.map((t) => (
                <td key={t.id} className="px-2 py-2 text-center">
                  <span className={giaoDuoc(c.id, t.no) ? 'text-emerald-400' : 'text-slate-700'}>
                    {giaoDuoc(c.id, t.no) ? '●' : '·'}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {CAP_CHUYEN_MON.map((c) => (
      <div key={c.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone={c.vaiTro === 'tư vấn' ? 'amber' : c.vaiTro === 'giáo viên' ? 'sky' : 'violet'}>
            {c.vaiTro}
          </Chip>
          <h3 className="font-semibold text-slate-100">{c.ten}</h3>
          <span className="ml-auto text-[11px] text-slate-400">giao được tới tầng {c.giaoDuocToiTang}</span>
        </div>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">Làm được</p>
        <Bullets items={c.lamDuoc} />
        <p className="mt-2 text-[13px] leading-relaxed text-rose-200">
          <span className="font-semibold">Chưa làm được — </span>{c.chuaLamDuoc}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-emerald-200">
          <span className="font-semibold">Nâng cấp bằng — </span>{c.nangCapBang}
        </p>
      </div>
    ))}
  </div>
);

export const Chuan: React.FC = () => {
  const [view, setView] = useState('chuan');
  return (
    <div>
      <SectionHeader
        eyebrow="Đối chiếu chuẩn quốc tế"
        title="Mười sáu chuẩn có tên, có nguồn, có kết luận thẳng"
        lead={CHUAN_CREED.claim}
      />
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(CHUAN_SO.soChuan)} label="chuẩn đối chiếu" sub="đều có nguồn cụ thể" />
        <Stat value={String(CHUAN_SO.dat)} label="đạt" sub="có bài kiểm hoặc con số làm bằng chứng" />
        <Stat value={String(CHUAN_SO.motPhan)} label="đạt một phần" sub="còn thiếu, và ghi rõ thiếu gì" />
        <Stat value={String(CHUAN_SO.chuaDat)} label="chưa đạt" sub="để nguyên trong bảng, không giấu" />
      </div>
      <Filters options={VIEWS} value={view} onChange={setView} />
      {view === 'chuan' && <BangChuan />}
      {view === 'tang' && <Tang />}
      {view === 'capcm' && <CapCM />}
    </div>
  );
};
