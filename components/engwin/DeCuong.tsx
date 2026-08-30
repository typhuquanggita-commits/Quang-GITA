/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {DECUONG_CREED, deCuong, DECUONG_SO} from '../../data/decuong';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters, Accordion, Field} from './ui';

export const DeCuong: React.FC = () => {
  const ds = deCuong();
  const tuyens = [...new Set(ds.map((d) => d.tuyenTen))];
  const [tuyen, setTuyen] = useState('tat-ca');
  const hien = tuyen === 'tat-ca' ? ds : ds.filter((d) => d.tuyenTen === tuyen);

  return (
    <div>
      <SectionHeader
        eyebrow="Hệ thống đề cương"
        title={DECUONG_CREED.name + ' — 10 đề cương, 146 tuần, mỗi tuần một phép đo'}
        lead={DECUONG_CREED.claim}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(DECUONG_SO.soDeCuong)} label="đề cương" sub={`${DECUONG_SO.soTuyen} tuyến × ${DECUONG_SO.soTang} tầng`} />
        <Stat value={String(DECUONG_SO.tongTuanHoc)} label="tuần học" sub={`${DECUONG_SO.soTuan} tuần có giáo án chi tiết`} />
        <Stat value={String(DECUONG_SO.soDauRa)} label="đầu ra quan sát được" sub="mỗi đầu ra một con số" />
        <Stat value={String(DECUONG_SO.soRanhGioi)} label="ranh giới KHÔNG dạy" sub="chỗ cắt phạm vi, nói thẳng" />
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-2">
        <Card className="border-emerald-500/25 bg-emerald-500/5">
          <Field label="Đầu ra phải quan sát được">{DECUONG_CREED.dauRaQuanSatDuoc}</Field>
        </Card>
        <Card className="border-amber-500/25 bg-amber-500/5">
          <Field label="Vì sao phải ghi cả cái KHÔNG dạy">{DECUONG_CREED.ranhGioi}</Field>
        </Card>
      </div>

      <Filters
        options={[{id: 'tat-ca', label: `Cả hai tuyến (${ds.length})`}, ...tuyens.map((t) => ({id: t, label: t}))]}
        value={tuyen}
        onChange={setTuyen}
      />

      <div className="space-y-4">
        {hien.map((d) => (
          <Accordion
            key={d.id}
            title={d.ten}
            subtitle={d.danhCho}
            right={
              <span className="flex flex-col items-end gap-1">
                <Chip tone={d.tuyenTen.includes('IELTS') ? 'sky' : 'amber'}>
                  {d.soTuan} tuần · {d.phutMoiNgay}′/ngày
                </Chip>
                <span className="text-[11px] text-slate-400">{d.dauRa.length} đầu ra</span>
              </span>
            }>
            <div className="space-y-5">
              <Card><Field label="Vào được khi nào">{d.vaoDuocKhi}</Field></Card>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-emerald-300">
                  Đầu ra — đo được, không phải mô tả
                </h3>
                <Bullets items={d.dauRa} marker="✓" />
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Giáo án từng tuần
                </h3>
                <div className="space-y-3">
                  {d.tuan.map((t) => (
                    <div key={t.tuan} className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-xs text-sky-400">Tuần {t.tuan}</span>
                        <h4 className="font-semibold text-slate-100">{t.ten}</h4>
                      </div>
                      <div className="mt-3 grid gap-3 md:grid-cols-2">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Dạy</p>
                          <Bullets items={t.day} />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Học viên làm</p>
                          <Bullets items={t.lam} />
                        </div>
                      </div>
                      <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
                        <Field label="Đo bằng">{t.doBang}</Field>
                        <p className="rounded-md border border-amber-500/25 bg-amber-500/5 px-3 py-2 text-amber-200">
                          <span className="font-semibold">Chưa đụng tới: </span>{t.chuaDung}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Đánh giá và trọng số
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[460px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                        <th className="py-2 pr-4">Cách</th>
                        <th className="py-2 pr-4">Trọng số</th>
                        <th className="py-2">Ngưỡng đạt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.danhGia.map((g) => (
                        <tr key={g.cach} className="border-b border-slate-800/60 align-top">
                          <td className="py-2 pr-4 text-slate-200">{g.cach}</td>
                          <td className="py-2 pr-4 tabular-nums text-sky-300">{g.trongSo}%</td>
                          <td className="py-2 text-slate-300">{g.nguong}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Card className="mt-3 border-emerald-500/25">
                  <Field label="Qua tầng khi nào">{d.quaKhi}</Field>
                </Card>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-rose-300">
                  KHÔNG dạy gì ở tầng này
                </h3>
                <Bullets items={d.khongDay} marker="✕" />
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Việc GITA đi kèm
                </h3>
                <div className="grid gap-2 md:grid-cols-2">
                  {d.gita.map((g) => (
                    <div key={g.chu} className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
                      <p className="text-xs font-semibold text-emerald-300">{g.chu}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-300">{g.viec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
