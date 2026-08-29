/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  QUYEN_CREED, QUYEN, BAC_QUYEN, quyenCua, co, aiCoQuyen,
  LUAT_QUYEN, QUYEN_SO, QUYEN_BY_ID,
} from '../../data';
import {SectionHeader, Card, Chip, Stat, Filters} from './ui';

const THANG_TONE: Record<string, 'sky' | 'violet' | 'amber' | 'emerald' | 'rose'> = {
  'học viên': 'sky', 'giảng dạy': 'violet', 'gia đình': 'emerald', 'kinh doanh': 'amber', 'vận hành': 'rose',
};

const VIEWS = [
  {id: 'bac', label: 'Các bậc quyền'},
  {id: 'matran', label: 'Ma trận quyền'},
  {id: 'luat', label: 'Luật vận hành'},
];

const Bac: React.FC = () => (
  <div className="space-y-6">
    {(['học viên', 'giảng dạy', 'gia đình', 'kinh doanh', 'vận hành'] as const).map((th) => {
      const ds = BAC_QUYEN.filter((b) => b.thang === th).sort((a, b) => a.no - b.no);
      if (!ds.length) return null;
      return (
        <div key={th}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
            Thang {th} · {ds.length} bậc
          </h3>
          <div className="space-y-2">
            {ds.map((b) => (
              <div key={b.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone={THANG_TONE[th]}>{b.id}</Chip>
                  <h4 className="font-semibold text-slate-100">{b.ten}</h4>
                  <span className="ml-auto text-[12px] tabular-nums text-slate-400">
                    {quyenCua(b.id).length} quyền
                  </span>
                </div>
                <dl className="mt-2.5 space-y-1.5 text-[13px] leading-relaxed">
                  <div><dt className="inline font-semibold text-slate-400">Ai — </dt><dd className="inline text-slate-300">{b.ai}</dd></div>
                  <div><dt className="inline font-semibold text-slate-400">Vào bằng — </dt><dd className="inline text-slate-300">{b.vao}</dd></div>
                  <div><dt className="inline font-semibold text-rose-400">Chưa được — </dt><dd className="inline text-slate-300">{b.chuaDuoc}</dd></div>
                </dl>
                {b.themQuyen.length > 0 && (
                  <div className="mt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Mở thêm ở bậc này
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {b.themQuyen.map((q) => (
                        <Chip key={q} tone="emerald">{QUYEN_BY_ID[q]?.ten ?? q}</Chip>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

const MaTran: React.FC = () => {
  const [nhom, setNhom] = useState('tat-ca');
  const nhomDs = [...new Set(QUYEN.map((q) => q.nhom))];
  const ds = QUYEN.filter((q) => nhom === 'tat-ca' || q.nhom === nhom);
  return (
    <div>
      <Filters
        options={[{id: 'tat-ca', label: 'Tất cả'}, ...nhomDs.map((n) => ({id: n, label: n}))]}
        value={nhom}
        onChange={setNhom}
      />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-[12px]">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] uppercase tracking-[0.12em] text-slate-400">
              <th className="w-64 py-2 pr-3 font-semibold">Quyền</th>
              {BAC_QUYEN.map((b) => (
                <th key={b.id} className="px-1 py-2 text-center font-semibold">{b.id}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {ds.map((q) => (
              <tr key={q.id} className="align-top">
                <td className="py-2 pr-3">
                  <span className="block font-medium text-slate-200">{q.ten}</span>
                  <span className="block text-[11px] text-slate-400">
                    {q.nhom}
                    {q.haiNguoi && ' · hai người ký'}
                    {q.ghiNhatKy && ' · ghi nhật ký'}
                  </span>
                </td>
                {BAC_QUYEN.map((b) => (
                  <td key={b.id} className="px-1 py-2 text-center">
                    <span className={co(b.id, q.id) ? 'text-emerald-400' : 'text-slate-700'}>
                      {co(b.id, q.id) ? '●' : '·'}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 space-y-2">
        {ds.map((q) => (
          <div key={q.id} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-slate-100">{q.ten}</span>
              {q.haiNguoi && <Chip tone="rose">hai người ký</Chip>}
              {q.ghiNhatKy && <Chip tone="amber">ghi nhật ký</Chip>}
              <span className="ml-auto text-[11px] text-slate-400">{aiCoQuyen(q.id).length} bậc có</span>
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-300">{q.lam}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-400">
              <span className="font-semibold">Vì sao chặn — </span>{q.viSaoChan}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Luat: React.FC = () => (
  <div className="space-y-3">
    <Card className="border-rose-500/40 bg-rose-500/5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">
        Nói trước một điều
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-200">{QUYEN_CREED.thatThe}</p>
    </Card>
    {LUAT_QUYEN.map((l) => (
      <div key={l.no} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
        <div className="flex items-baseline gap-3">
          <span className="text-lg font-black tabular-nums text-slate-400">
            {String(l.no).padStart(2, '0')}
          </span>
          <h3 className="font-semibold text-slate-100">{l.ten}</h3>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{l.noiDung}</p>
      </div>
    ))}
    <Card className="border-slate-700">
      <p className="text-[13px] leading-relaxed text-slate-300">{QUYEN_CREED.thuaKe}</p>
      <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{QUYEN_CREED.hoiNguoc}</p>
    </Card>
  </div>
);

export const Quyen: React.FC = () => {
  const [view, setView] = useState('bac');
  return (
    <div>
      <SectionHeader
        eyebrow="Phân quyền"
        title="Hai thang song song: học viên và người dạy"
        lead={QUYEN_CREED.claim}
      />
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(QUYEN_SO.soQuyen)} label="quyền" sub={`${QUYEN_SO.soNhom} nhóm`} />
        <Stat value={String(QUYEN_SO.soBac)} label="bậc quyền" sub={`${QUYEN_SO.soThang} thang`} />
        <Stat value={String(QUYEN_SO.soHaiNguoi)} label="việc cần hai người ký" sub="không đảo ngược được" />
        <Stat value={String(QUYEN_SO.soGhiNhatKy)} label="việc ghi nhật ký" sub="chỉ thêm, không sửa, không xoá" />
      </div>
      <Filters options={VIEWS} value={view} onChange={setView} />
      {view === 'bac' && <Bac />}
      {view === 'matran' && <MaTran />}
      {view === 'luat' && <Luat />}
    </div>
  );
};
