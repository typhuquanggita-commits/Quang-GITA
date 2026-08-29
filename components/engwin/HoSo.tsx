/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useEffect, useState} from 'react';
import {
  HOSO_CREED, HOSO_SO, docHoSo, xoaHoSo, phanTichHoSo, loTrinhCaNhan,
  luuLanLam, phieuLuyen, chamPhieu, DU_DE_KET_LUAN, NGUONG_DAT,
} from '../../data';
import type {LanLam} from '../../types';
import {SectionHeader, Card, Chip, Stat, Bullets} from './ui';

const TEN_KY: Record<string, string> = {
  listening: 'Nghe', speaking: 'Nói', reading: 'Đọc', writing: 'Viết',
  vocabulary: 'Từ vựng', grammar: 'Ngữ pháp', pronunciation: 'Phát âm', mindset: 'Tư duy',
};

const XU_TONE: Record<string, 'emerald' | 'slate' | 'rose' | 'amber'> = {
  'đang lên': 'emerald', 'đi ngang': 'slate', 'đang xuống': 'rose', 'chưa đủ dữ liệu': 'amber',
};

export const HoSo: React.FC = () => {
  const [ds, setDs] = useState<LanLam[]>([]);
  useEffect(() => setDs(docHoSo()), []);

  const pt = phanTichHoSo(ds);
  const lt = loTrinhCaNhan(pt, ds);

  /** Nạp một hồ sơ mẫu để xem hệ thống phân tích ra sao khi đã có dữ liệu. */
  const napMau = () => {
    const P = phieuLuyen();
    const mau = [
      {p: P.find((x) => x.skill === 'listening')!, dung: [2, 3, 4, 5, 1], ngay: 4},
      {p: P.find((x) => x.skill === 'listening')!, dung: [2, 2, 4, 5, 1], ngay: 3},
      {p: P.find((x) => x.skill === 'writing')!, dung: [2, 3, 5, 6, 2], ngay: 2},
      {p: P.find((x) => x.skill === 'listening')!, dung: [2, 3, 5, 7, 2], ngay: 1},
      {p: P.find((x) => x.skill === 'writing')!, dung: [2, 3, 5, 8, 2], ngay: 0},
    ];
    let cuoi: LanLam[] = ds;
    for (const m of mau) {
      const d = new Date();
      d.setDate(d.getDate() - m.ngay);
      cuoi = luuLanLam(m.p, chamPhieu(m.p, m.dung), d.toISOString());
    }
    setDs(cuoi);
  };

  return (
    <div>
      <SectionHeader
        eyebrow="Hồ sơ học viên"
        title="Mỗi lần làm để lại một bản ghi, và hồ sơ sinh ra lộ trình"
        lead={HOSO_CREED.claim}
      />

      <Card className="mb-6 border-amber-500/30 bg-amber-500/5">
        <p className="text-[13px] leading-relaxed text-amber-100">
          <span className="font-semibold">Hồ sơ nằm ở đâu — </span>{HOSO_CREED.oDau}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
          <span className="font-semibold text-slate-400">Khi nào kết luận — </span>{HOSO_CREED.duDuLieu}
        </p>
      </Card>

      {ds.length === 0 ? (
        <Card>
          <p className="text-sm leading-relaxed text-slate-300">
            Hồ sơ đang trống. Làm một phiếu ở mục{' '}
            <span className="font-medium text-slate-100">Phiếu luyện</span> rồi bấm lưu, hoặc nạp
            một hồ sơ mẫu để xem hệ thống phân tích ra sao khi đã có dữ liệu.
          </p>
          <button
            onClick={napMau}
            className="mt-4 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-400">
            Nạp hồ sơ mẫu năm lần làm
          </button>
        </Card>
      ) : (
        <>
          <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat value={String(pt.soLan)} label="lần làm" sub={`${pt.soPhieuKhac} phiếu khác nhau`} />
            <Stat value={`${pt.trungBinh}%`} label="điểm trung bình" sub={`tỉ lệ đạt ${pt.tiLeDat}%`} />
            <Stat value={String(pt.chuoiNgay)} label="chuỗi ngày" sub="tính lùi từ lần làm gần nhất" />
            <Stat value={pt.xuHuong} label="xu hướng" sub={`cần từ ${DU_DE_KET_LUAN} lần mới kết luận`} />
          </div>

          {pt.canhBao.length > 0 && (
            <Card className="mb-6 border-rose-500/30 bg-rose-500/5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-300">Cảnh báo</p>
              <Bullets items={pt.canhBao} />
            </Card>
          )}

          <div className="mb-6 grid gap-4 lg:grid-cols-2">
            <Card>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                Theo kỹ năng
              </h3>
              <div className="mt-3 space-y-2">
                {pt.theoKyNang.map((k) => (
                  <div key={k.skill} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-[12px] text-slate-300">{TEN_KY[k.skill] ?? k.skill}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <span
                        className={`block h-full rounded-full ${k.trungBinh >= NGUONG_DAT ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{width: `${Math.max(2, k.trungBinh)}%`}}
                      />
                    </span>
                    <span className="w-24 shrink-0 text-right text-[12px] tabular-nums text-slate-400">
                      {k.trungBinh}% · {k.soLan} lần
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
                Theo phần của phiếu
              </h3>
              <div className="mt-3 space-y-2">
                {pt.theoPhan.map((f) => (
                  <div key={f.ma} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-[12px] text-slate-300">{f.ma}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <span
                        className={`block h-full rounded-full ${f.trungBinh >= NGUONG_DAT ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{width: `${Math.max(2, f.trungBinh)}%`}}
                      />
                    </span>
                    <span className="w-24 shrink-0 text-right text-[12px] tabular-nums text-slate-400">
                      {f.trungBinh}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
            Lộ trình cá nhân hoá — tối đa {HOSO_SO.soViecToiDa} việc
          </h3>
          {lt.length === 0 ? (
            <Card>
              <p className="text-[13px] text-slate-400">
                Chưa đủ dữ liệu để đề nghị việc nào. Làm thêm vài phiếu rồi quay lại.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {lt.map((v) => (
                <div key={v.uuTien} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-lg font-black tabular-nums text-slate-400">
                      {String(v.uuTien).padStart(2, '0')}
                    </span>
                    <h4 className="font-semibold text-slate-100">{v.viec}</h4>
                    <Chip tone="violet">{v.tuan} tuần</Chip>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
                    <span className="font-semibold text-slate-400">Vì sao — </span>{v.viSao}
                  </p>
                  <p className="mt-2 rounded-lg bg-sky-500/5 p-3 text-[12px] leading-relaxed text-sky-100 ring-1 ring-inset ring-sky-500/20">
                    <span className="font-semibold">Bằng chứng — </span>{v.bangChung}
                  </p>
                  {(v.phieuGoiY || v.baiGiangGoiY) && (
                    <p className="mt-2 text-[12px] text-slate-400">
                      Bắt đầu từ{' '}
                      {v.phieuGoiY && <span className="font-mono text-slate-200">{v.phieuGoiY} </span>}
                      {v.baiGiangGoiY && <span className="font-mono text-slate-200">{v.baiGiangGoiY}</span>}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
            Lịch sử — {ds.length} bản ghi gần nhất
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-[12px]">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] uppercase tracking-[0.12em] text-slate-400">
                  <th className="py-2 pr-3 font-semibold">Lúc</th>
                  <th className="py-2 pr-3 font-semibold">Phiếu</th>
                  <th className="py-2 pr-3 font-semibold">Kỹ năng</th>
                  <th className="py-2 pr-3 font-semibold">Từng phần</th>
                  <th className="py-2 pr-3 font-semibold">Điểm</th>
                  <th className="py-2 font-semibold">KPI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {[...ds].reverse().map((x) => (
                  <tr key={x.id}>
                    <td className="py-2 pr-3 text-slate-400">{x.luc.slice(0, 10)}</td>
                    <td className="py-2 pr-3 font-mono text-slate-300">{x.phieuId}</td>
                    <td className="py-2 pr-3 text-slate-300">{TEN_KY[x.skill] ?? x.skill}</td>
                    <td className="py-2 pr-3 font-mono tabular-nums text-slate-400">{x.dungTungPhan.join('·')}</td>
                    <td className="py-2 pr-3 tabular-nums text-slate-200">{x.tiLe}%</td>
                    <td className="py-2">
                      <span className={x.datKpi ? 'text-emerald-400' : 'text-amber-400'}>
                        {x.datKpi ? 'đạt' : 'chưa'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => {
              xoaHoSo();
              setDs([]);
            }}
            className="mt-6 rounded-lg border border-slate-700 px-4 py-2 text-[12px] font-medium text-slate-400 transition hover:border-rose-500/50 hover:text-rose-300">
            Xoá toàn bộ hồ sơ trên máy này
          </button>
        </>
      )}
    </div>
  );
};
