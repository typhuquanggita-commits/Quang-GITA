/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {BAITEST_CREED, testChuyenSau, chanDoan, BAITEST_SO} from '../../data/baitest';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters, Field} from './ui';

export const BaiTest: React.FC = () => {
  const bais = testChuyenSau();
  const [chon, setChon] = useState(bais[0].truId);
  const bai = bais.find((b) => b.truId === chon)!;
  // Bậc học viên tự khai là đã đạt. Không lưu ở đâu cả: đây là công cụ
  // soi chiếu tại chỗ, không phải hồ sơ.
  const [bac, setBac] = useState<number | null>(null);
  const kq = bac === null ? null : chanDoan(bai.truId, bac);

  return (
    <div>
      <SectionHeader
        eyebrow="Hệ thống bài test chuyên sâu"
        title={BAITEST_CREED.name + ' — tìm chỗ gãy, không chấm điểm'}
        lead={BAITEST_CREED.claim}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(BAITEST_SO.soBai)} label="bài test" sub="một bài cho mỗi trụ" />
        <Stat value={String(BAITEST_SO.soBac)} label="bậc mỗi bài" sub="thang Bloom, từ nhận biết tới sáng tạo" />
        <Stat value={String(BAITEST_SO.soDonThuoc)} label="đơn kê" sub="mỗi bậc gãy một đơn riêng" />
        <Stat value={`${BAITEST_SO.tongPhut}′`} label="tổng thời gian" sub="cả bốn bài" />
      </div>

      <Filters
        options={bais.map((b) => ({id: b.truId, label: b.truTen}))}
        value={chon}
        onChange={(v) => {
          setChon(v);
          setBac(null);
        }}
      />

      <Card className="mb-6">
        <Field label="Bài này tìm ra cái gì">{bai.timRa}</Field>
        <p className="mt-3 rounded-md border border-rose-500/25 bg-rose-500/5 px-3 py-2 text-sm leading-relaxed text-rose-200">
          <span className="font-semibold">Dùng sai cách: </span>{bai.dungSaiCach}
        </p>
      </Card>

      <div className="mb-6 space-y-3">
        {bai.bac.map((b) => (
          <div key={b.bac} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-sky-400">Bậc {b.bac}</span>
                <h2 className="font-semibold text-slate-100">{b.ten}</h2>
              </div>
              <Chip tone="slate">{b.phut}′</Chip>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.ngiaLa}</p>
            <p className="mt-3 rounded-md border border-slate-700 bg-slate-950/50 px-3 py-2.5 text-sm leading-relaxed text-slate-100">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Câu hỏi · </span>
              {b.hoi}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-amber-200">
              <span className="font-semibold">Nếu gãy ở đây: </span>{b.neuGay}
            </p>
          </div>
        ))}
      </div>

      <Card className="border-sky-500/30 bg-sky-500/5">
        <h2 className="text-lg font-bold text-slate-100">Bạn trả lời trọn vẹn được tới bậc nào?</h2>
        <p className="mt-1 text-sm leading-relaxed text-slate-400">
          Chọn bậc CAO NHẤT bạn trả lời được đầy đủ. Hệ thống chỉ ra bậc gãy
          — tức bậc ngay trên đó — và đơn kê cho đúng chỗ gãy ấy.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[0, ...bai.bac.map((b) => b.bac)].map((n) => (
            <button
              key={n}
              onClick={() => setBac(n)}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                bac === n
                  ? 'bg-sky-500 text-slate-950'
                  : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70'
              }`}>
              {n === 0 ? 'Chưa qua bậc nào' : `Tới bậc ${n}`}
            </button>
          ))}
        </div>

        {kq && (
          <div className="mt-5 rounded-lg border border-slate-700 bg-slate-950/50 p-4">
            {kq.daHet ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  Không còn bậc nào gãy
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{kq.ngiaLa}</p>
                <p className="mt-3 rounded-md border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-sm leading-relaxed text-emerald-200">
                  {kq.chuaBang}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-300">
                  Chỗ gãy — bậc {kq.bacDung}: {kq.ten}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{kq.ngiaLa}</p>
                <p className="mt-3 rounded-md border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-sm leading-relaxed text-emerald-200">
                  <span className="font-semibold">Chữa bằng: </span>{kq.chuaBang}
                </p>
              </>
            )}
          </div>
        )}
      </Card>

      <div className="mt-6">
        <h2 className="mb-3 text-lg font-bold text-slate-100">Đọc kết quả thế nào</h2>
        <Bullets items={bai.docKetQua} />
      </div>
    </div>
  );
};
