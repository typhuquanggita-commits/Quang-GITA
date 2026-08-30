/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {CAMNANG_CREED, camNang, CAMNANG_SO} from '../../data/camnang';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters, Field} from './ui';

export const CamNang: React.FC = () => {
  const cs = camNang();
  const [chon, setChon] = useState(cs[0].id);
  const c = cs.find((x) => x.id === chon)!;

  return (
    <div>
      <SectionHeader
        eyebrow="Cẩm nang ôn luyện điểm 10"
        title={CAMNANG_CREED.name + ' — chặn chỗ mất điểm, không hứa điểm 10'}
        lead={CAMNANG_CREED.claim}
      />

      <Card className="mb-6 border-amber-500/25 bg-amber-500/5">
        <Field label="Nói thẳng">{CAMNANG_CREED.khongHuaLieu}</Field>
      </Card>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(CAMNANG_SO.soPhan)} label="phần thi" sub="một cẩm nang mỗi phần" />
        <Stat value={String(CAMNANG_SO.soMuc)} label="mục kỹ thuật" sub="chỗ tách 9 điểm khỏi 10 điểm" />
        <Stat value={String(CAMNANG_SO.soCachChan)} label="cách chặn mất điểm" sub="việc làm được, không phải lời khuyên" />
        <Stat value={String(CAMNANG_SO.tongCau)} label="câu toàn đề" sub={`${CAMNANG_SO.tongPhut} phút`} />
      </div>

      <Filters
        options={cs.map((x) => ({id: x.id, label: `${x.phanTen} · ${x.trongSo}đ`}))}
        value={chon}
        onChange={setChon}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Stat value={String(c.soCau)} label="câu" sub={`phần ${c.phanTen}`} />
        <Stat value={`${c.trongSo}đ`} label="trọng số trên thang 10" sub={`mỗi câu ${(c.trongSo / c.soCau).toFixed(3)}đ`} />
        <Stat value={`${c.phut}′`} label="thời gian" sub={`${(c.phut / c.soCau).toFixed(1)}′ mỗi câu`} />
      </div>

      <Card className="mb-6 border-rose-500/25 bg-rose-500/5">
        <Field label="Điều kiện cần cho điểm 10">{c.dieuKienCan}</Field>
      </Card>

      <div className="mb-6">
        <h2 className="mb-3 text-lg font-bold text-slate-100">Chia giờ trong phòng thi</h2>
        <Bullets items={c.chiaGio} marker="▸" />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-100">
          {c.muc.length} mục — chỗ tách 9 điểm khỏi 10 điểm
        </h2>
        {c.muc.map((m) => (
          <Card key={m.ten}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-sm text-sky-400">{String(m.no).padStart(2, '0')}</span>
              <h3 className="font-semibold text-slate-100">{m.ten}</h3>
            </div>
            <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-300">
              <p className="rounded-md border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-emerald-200">
                <span className="font-semibold">Chín và mười khác nhau ở chỗ này: </span>
                {m.chinLaChoNay}
              </p>
              <Field label="Mất điểm vì">{m.matDiemVi}</Field>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Cách chặn</p>
                <Bullets items={m.cachChan} marker="✓" />
              </div>
              <Field label="Tự kiểm">{m.tuKiem}</Field>
              <p className="text-xs text-slate-400">
                <span className="font-semibold text-rose-300">Giá của lỗi này: </span>{m.giaCuaLoi}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-lg font-bold text-slate-100">Bảy ngày cuối</h2>
        <Bullets items={c.bayNgayCuoi} marker="▸" />
      </div>
    </div>
  );
};
