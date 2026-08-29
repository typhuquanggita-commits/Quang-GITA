/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useMemo, useState} from 'react';
import {
  GIANG_SAU_CREED, TRU, TRUONG_KHO, CHU_DE, baiGiangSau, thuTuHoc,
  GIANG_SAU_SO, LEVELS,
} from '../../data';
import {SectionHeader, Card, Chip, Stat, Filters, Bullets} from './ui';

const TRU_TONE: Record<string, 'sky' | 'violet' | 'amber' | 'emerald'> = {
  'tu-duy': 'violet', 'kien-thuc': 'sky', 'ky-nang': 'amber', 'phuong-phap': 'emerald',
};

export const GiangSau: React.FC = () => {
  const [tuyen, setTuyen] = useState<'ielts' | 'chuyen'>('ielts');
  const [tru, setTru] = useState('tat-ca');
  const [cap, setCap] = useState('L1-1');
  const [mo, setMo] = useState<string | null>(null);

  const ds = useMemo(
    () => thuTuHoc(tuyen, cap).filter((b) => tru === 'tat-ca' || b.truId === tru),
    [tuyen, cap, tru],
  );
  const bai = ds.find((b) => b.id === mo) ?? ds[0];

  return (
    <div>
      <SectionHeader
        eyebrow="Hai nghìn bài giảng chuyên sâu"
        title="Tư duy · Kiến thức · Kỹ năng · Phương pháp"
        lead={GIANG_SAU_CREED.claim}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={GIANG_SAU_SO.soBai.toLocaleString('vi-VN')} label="bài giảng" sub={`${GIANG_SAU_SO.soChuDe} chủ đề × ${GIANG_SAU_SO.soCapDo} cấp`} />
        <Stat value={String(GIANG_SAU_SO.soTru)} label="trụ" sub={`mỗi trụ ${GIANG_SAU_SO.soChuDeMoiTru} chủ đề`} />
        <Stat value={GIANG_SAU_SO.soBaiUuTien2.toLocaleString('vi-VN')} label="bài trọng yếu" sub="cho hai trường khó nhất" />
        <Stat value={Math.round(GIANG_SAU_SO.tongPhut / 60).toLocaleString('vi-VN')} label="giờ nội dung" sub="cộng từ thời lượng từng bài" />
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {TRU.map((t) => (
          <div key={t.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <Chip tone={TRU_TONE[t.id]}>{t.ten}</Chip>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{t.vaiTro}</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-rose-200/80">{t.thieuThiSao}</p>
          </div>
        ))}
      </div>

      <Card className="mb-6 border-amber-500/30 bg-amber-500/5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          {TRUONG_KHO.ten}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-200">{TRUONG_KHO.vi}</p>
        <Bullets items={TRUONG_KHO.khacOChoNao} />
        <p className="mt-2 text-[13px] leading-relaxed text-amber-100">{TRUONG_KHO.langNghe}</p>
        <p className="mt-2 text-[12px] leading-relaxed text-slate-400">{TRUONG_KHO.kiemLai}</p>
      </Card>

      <Filters
        options={[{id: 'ielts', label: '🎯 Tuyến IELTS 8.0'}, {id: 'chuyen', label: '🏛️ Tuyến chuyên Anh'}]}
        value={tuyen}
        onChange={(v) => {setTuyen(v as 'ielts' | 'chuyen'); setMo(null);}}
      />
      <p className="-mt-3 mb-4 text-[12px] leading-relaxed text-slate-400">
        {tuyen === 'ielts'
          ? 'Tuyến IELTS đi theo cấp độ từ thấp lên cao — ba năm, không có ngày thi cố định.'
          : 'Tuyến chuyên đi theo ƯU TIÊN trong phạm vi cấp của mình: làm hết bài trọng yếu rồi mới tới bài còn lại. Hai mươi hai tháng, một ngày thi duy nhất.'}
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Filters
          options={[{id: 'tat-ca', label: 'Cả bốn trụ'}, ...TRU.map((t) => ({id: t.id, label: t.ten}))]}
          value={tru}
          onChange={(v) => {setTru(v); setMo(null);}}
        />
      </div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <label htmlFor="gs-cap" className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
          Cấp độ
        </label>
        <select
          id="gs-cap"
          value={cap}
          onChange={(e) => {setCap(e.currentTarget.value); setMo(null);}}
          className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-sky-500 focus:outline-none">
          {LEVELS.map((l) => (
            <option key={l.id} value={l.id}>{l.id} · {l.name}</option>
          ))}
        </select>
        <span className="text-[12px] text-slate-400">{ds.length} bài</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        <div className="max-h-[34rem] space-y-1.5 overflow-y-auto pr-1">
          {ds.map((b) => (
            <button
              key={b.id}
              onClick={() => setMo(b.id)}
              className={`flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left transition ${
                bai?.id === b.id ? 'bg-slate-800 ring-1 ring-inset ring-slate-600' : 'hover:bg-slate-800/50'
              }`}>
              {b.uuTien === 2 && <span className="mt-0.5 shrink-0 text-[10px] text-amber-400">★★</span>}
              {b.uuTien === 1 && <span className="mt-0.5 shrink-0 text-[10px] text-amber-400/70">★</span>}
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium text-slate-200">{b.ten}</span>
                <span className="block text-[11px] text-slate-400">{b.truTen} · {b.phut} phút</span>
              </span>
            </button>
          ))}
        </div>

        {bai && (
          <div className="space-y-4">
            <Card>
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone={TRU_TONE[bai.truId]}>{bai.truTen}</Chip>
                <Chip tone="slate">{bai.id}</Chip>
                <Chip tone="violet">{bai.phut} phút</Chip>
                {bai.uuTien === 2 && <Chip tone="amber">★★ trọng yếu cho hai trường khó</Chip>}
                {bai.uuTien === 1 && <Chip tone="amber">★ trọng yếu cho chuyên</Chip>}
              </div>
              <h3 className="mt-2 text-lg font-bold text-slate-100">{bai.ten}</h3>
              <p className="mt-2 text-[13px] font-medium leading-relaxed text-sky-200">
                {bai.cauHoiLoi}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-200">{bai.loi}</p>
              <p className="mt-3 rounded-lg bg-slate-800/60 p-3 text-[13px] leading-relaxed text-slate-300">
                <span className="font-semibold text-slate-400">Ví dụ — </span>{bai.viDu}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
                <span className="font-semibold">Học liệu — </span>{bai.hocLieu}
              </p>
            </Card>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-emerald-500/5 p-4 ring-1 ring-inset ring-emerald-500/20">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-emerald-300">Việc sau bài</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-emerald-100">{bai.viecSauBai}</p>
              </div>
              <div className="rounded-xl bg-sky-500/5 p-4 ring-1 ring-inset ring-sky-500/20">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sky-300">Tự kiểm</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-sky-100">{bai.tuKiem}</p>
              </div>
            </div>

            <div className="rounded-xl bg-rose-500/5 p-4 ring-1 ring-inset ring-rose-500/20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-rose-300">Bẫy hay mắc</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-rose-100">{bai.bay}</p>
            </div>

            <Card className="border-slate-700">
              <p className="text-[12px] leading-relaxed text-slate-300">
                <span className="font-semibold text-slate-400">Nối tiếp — </span>
                bài luyện <span className="font-mono text-slate-200">{bai.drillId}</span>, phiếu dạng{' '}
                <span className="font-mono text-slate-200">{bai.phieuDangId}</span>.{' '}
                {GIANG_SAU_CREED.rule}
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
