/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useMemo, useState} from 'react';
import {
  DANG_BAI, LOAI_PHIEU, GIAI_BY_DANG,
  luuLuotNganHang, docLuotNganHang, phanTichNganHang, xoaLuotNganHang,
  DU_DE_KET_LUAN,
} from '../../data';
// Nạp thẳng, không qua thùng chung: 451 KB nguồn chỉ thẻ này cần.
// Xem ghi chú cuối data/index.ts.
import {
  NGAN_HANG, NGANHANG_SO, NGANHANG_CREED, CHUYEN_DE_CO_CAU,
  cauCuaChuyenDe, chamCau,
} from '../../data/nganhang';
import {SectionHeader, Card, Chip, Stat, Filters} from './ui';
import type {CauHoi} from '../../types';

const tenChuyenDe = (id: string) => DANG_BAI.find((d) => d.id === id)?.ten ?? id;
const tenLoai = (ma: string) => LOAI_PHIEU.find((l) => l.ma === ma)?.ten ?? ma;

/** Bốn hướng đi tiếp, chọn theo tỉ lệ đúng. Không có ngưỡng nào là tuỳ hứng. */
function huongDiTiep(tiLe: number): {nhan: string; loi: string; tone: 'emerald' | 'amber' | 'rose'} {
  if (tiLe >= 90)
    return {
      nhan: 'Nâng cấp độ',
      loi: 'Đạt KPI 90%. Chuyển sang phiếu nâng cao của chính chuyên đề này, đừng làm lại phần đã chắc.',
      tone: 'emerald',
    };
  if (tiLe >= 70)
    return {
      nhan: 'Thử thách tiếp',
      loi: 'Chắc phần nền nhưng chưa đạt KPI. Đọc lại đúng những câu sai bên dưới rồi làm loại phiếu kế tiếp.',
      tone: 'amber',
    };
  return {
    nhan: 'Làm lại',
    loi: 'Dưới 70% là gãy ở bản chất chứ không phải bất cẩn. Đọc phiếu lý thuyết của chuyên đề rồi làm lại chính loại phiếu này.',
    tone: 'rose',
  };
}

const LuaChon: React.FC<{
  cau: CauHoi;
  daChon?: number;
  hien: boolean;
  onChon: (i: number) => void;
}> = ({cau, daChon, hien, onChon}) => (
  <div className="mt-3 space-y-2">
    {cau.luaChon.map((l, i) => {
      const dung = i === cau.dapAn;
      const chonNo = daChon === i;
      const vien = hien
        ? dung
          ? 'border-emerald-500/60 bg-emerald-500/10'
          : chonNo
            ? 'border-rose-500/60 bg-rose-500/10'
            : 'border-slate-800 bg-slate-900/40'
        : chonNo
          ? 'border-sky-500/60 bg-sky-500/10'
          : 'border-slate-800 bg-slate-900/40 hover:border-slate-700';
      return (
        <div key={i}>
          <button
            type="button"
            onClick={() => !hien && onChon(i)}
            disabled={hien}
            aria-pressed={chonNo}
            className={`flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-[13px] leading-relaxed transition ${vien} ${hien ? 'cursor-default' : ''}`}
          >
            <span className="mt-px shrink-0 font-semibold text-slate-400">
              {hien ? (dung ? '✓' : chonNo ? '✕' : '·') : String.fromCharCode(65 + i)}
            </span>
            <span className="text-slate-100">{l}</span>
          </button>
          {hien && (
            <p
              className={`mt-1 pl-9 pr-2 text-[12px] leading-relaxed ${dung ? 'text-emerald-200' : chonNo ? 'text-rose-200' : 'text-slate-400'}`}
            >
              {cau.nhanXet[i]}
            </p>
          )}
        </div>
      );
    })}
  </div>
);

export const LamBai: React.FC = () => {
  const [cd, setCd] = useState(CHUYEN_DE_CO_CAU[0]);
  const cauHoi = useMemo(() => cauCuaChuyenDe(cd), [cd]);
  const [chon, setChon] = useState<Record<string, number>>({});
  const [hienTat, setHienTat] = useState(false);
  const [hienLe, setHienLe] = useState<Record<string, boolean>>({});
  const [daLuu, setDaLuu] = useState(false);
  const [luot, setLuot] = useState(() => docLuotNganHang());

  const doiChuyenDe = (id: string) => {
    setCd(id);
    setChon({});
    setHienTat(false);
    setHienLe({});
    setDaLuu(false);
  };

  const daLam = cauHoi.filter((c) => chon[c.id] !== undefined).length;
  const kq = chamCau(cauHoi, cauHoi.map((c) => (chon[c.id] === undefined ? -1 : chon[c.id])));
  const huong = huongDiTiep(kq.tiLe);
  const giai = GIAI_BY_DANG[cd];

  const cham = () => {
    setHienTat(true);
    if (!daLuu) {
      setLuot(
        luuLuotNganHang({
          chuyenDeId: cd,
          loaiMa: 'TAT',
          dung: kq.dung,
          tong: kq.tong,
          tiLe: kq.tiLe,
          bayDaMac: kq.sai.map((s) => s.cau.bayNo).filter((b): b is number => !!b),
        }),
      );
      setDaLuu(true);
    }
  };

  const pt = phanTichNganHang(luot);
  const conThieu = Math.max(0, DU_DE_KET_LUAN - pt.soLuot);
  const loiDuLieu = pt.duDeKetLuan
    ? 'đủ dữ liệu để kết luận'
    : `cần thêm ${conThieu} lượt`;

  /* Bẫy hay mắc, đổi số thứ tự thành tên bẫy có thật trong bộ giải đề. */
  const bayCoTen = pt.bayHayMac
    .map((b) => {
      const g = GIAI_BY_DANG[cd];
      return {...b, ten: g?.bay[b.bayNo - 1]?.chon};
    })
    .filter((b) => b.ten);

  return (
    <div>
      <SectionHeader
        eyebrow="Làm bài · xem đáp án"
        title="Chọn đáp án, bấm chấm, rồi đọc đúng lý do của cái sai mình vừa chọn"
        lead={NGANHANG_CREED.claim}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(NGANHANG_SO.soCau)} label="câu có đáp án" sub={`${NGANHANG_SO.soChuyenDe} chuyên đề`} />
        <Stat value={String(NGANHANG_SO.soNhanXet)} label="nhận xét" sub="bốn ô, bốn dòng riêng" />
        <Stat value={String(NGANHANG_SO.soCauTheoBay)} label="câu dựng theo bẫy" sub="biết em rơi vào bẫy số mấy" />
        <Stat value={String(pt.soLuot)} label="lượt đã làm" sub={pt.soLuot ? `trung bình ${pt.trungBinh}%` : 'chưa có lượt nào'} />
      </div>

      <Card className="mb-6 border-amber-500/30 bg-amber-500/5">
        <p className="text-[13px] leading-relaxed text-amber-100">
          <span className="font-semibold">Phạm vi, nói thẳng — </span>
          {NGANHANG_CREED.phamVi}
        </p>
      </Card>

      <div className="mb-4">
        <Filters
          options={CHUYEN_DE_CO_CAU.map((id) => ({id, label: tenChuyenDe(id)}))}
          value={cd}
          onChange={doiChuyenDe}
        />
      </div>

      <Card className="mb-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-slate-100">{tenChuyenDe(cd)}</span>
          <Chip tone="sky">{cauHoi.length} câu</Chip>
          <Chip tone="slate">đã chọn {daLam}/{cauHoi.length}</Chip>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={cham}
              disabled={daLam === 0 || hienTat}
              className="rounded-lg bg-sky-500 px-4 py-2 text-[13px] font-semibold text-slate-950 transition disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
            >
              {hienTat ? 'Đã chấm' : 'Chấm và xem đáp án'}
            </button>
            <button
              type="button"
              onClick={() => doiChuyenDe(cd)}
              className="rounded-lg border border-slate-700 px-4 py-2 text-[13px] font-semibold text-slate-200 transition hover:border-slate-500"
            >
              Làm lại
            </button>
          </div>
        </div>
        {daLam < cauHoi.length && !hienTat && (
          <p className="mt-2 text-[12px] text-slate-400">
            Chấm được ngay cả khi chưa chọn hết. Câu bỏ trống không tính là sai, và cũng không nhận
            xét — không có gì để nhận xét về một ô chưa chọn.
          </p>
        )}
      </Card>

      {hienTat && (
        <Card className="mb-5 border-sky-500/30 bg-sky-500/5">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-3xl font-bold tabular-nums text-slate-50">{kq.tiLe}%</span>
            <span className="text-sm text-slate-300">
              đúng {kq.dung}/{kq.tong} · sai {kq.sai.length} · bỏ trống {kq.tong - kq.dung - kq.sai.length}
            </span>
            <Chip tone={huong.tone}>{huong.nhan}</Chip>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-200">{huong.loi}</p>
          {kq.sai.length > 0 && (
            <p className="mt-2 text-[12px] leading-relaxed text-slate-400">
              <span className="font-semibold text-slate-300">Điểm kiến thức cần đọc lại — </span>
              {[...new Set(kq.sai.map((s) => s.cau.diemKienThuc))].join(' · ')}
            </p>
          )}
          {giai && (
            <p className="mt-2 text-[12px] leading-relaxed text-emerald-200">
              <span className="font-semibold">Tự kiểm — </span>
              {giai.tuKiemDapAn}
            </p>
          )}
        </Card>
      )}

      <div className="space-y-3">
        {cauHoi.map((c, i) => {
          const hien = hienTat || !!hienLe[c.id];
          return (
            <div key={c.id} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="slate">Câu {i + 1}</Chip>
                <Chip tone="violet">{c.loaiMa} · {tenLoai(c.loaiMa)}</Chip>
                {c.bayNo && <Chip tone="rose">Bẫy {c.bayNo}</Chip>}
                {!hien && chon[c.id] !== undefined && (
                  <button
                    type="button"
                    onClick={() => setHienLe((s) => ({...s, [c.id]: true}))}
                    className="ml-auto rounded-lg border border-slate-700 px-3 py-1 text-[12px] font-semibold text-slate-200 transition hover:border-slate-500"
                  >
                    Xem đáp án câu này
                  </button>
                )}
              </div>
              <p className="mt-2.5 text-[14px] font-medium leading-relaxed text-slate-100">{c.deBai}</p>
              <LuaChon
                cau={c}
                daChon={chon[c.id]}
                hien={hien}
                onChon={(v) => setChon((s) => ({...s, [c.id]: v}))}
              />
              {hien && (
                <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                  <p className="text-[12px] leading-relaxed text-slate-200">
                    <span className="font-semibold text-slate-400">Lời giải — </span>
                    {c.giaiThich}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-sky-200">
                    <span className="font-semibold">Điểm kiến thức — </span>
                    {c.diemKienThuc}
                  </p>
                  {c.bayNo && giai?.bay[c.bayNo - 1] && (
                    <p className="mt-1.5 text-[12px] leading-relaxed text-rose-200">
                      <span className="font-semibold">Bẫy {c.bayNo} — </span>
                      {giai.bay[c.bayNo - 1].chon}: {giai.bay[c.bayNo - 1].saiODau}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* --------------------------- LỊCH SỬ --------------------------- */}
      <div className="mt-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-400">
          Lượt đã làm, lưu trên máy này
        </h3>
        {pt.soLuot === 0 ? (
          <Card>
            <p className="text-[13px] text-slate-300">
              Chưa có lượt nào. Chấm một lượt là nó được ghi lại, và sau {DU_DE_KET_LUAN} lượt thì
              phần dưới bắt đầu kết luận được chuyên đề nào yếu.
            </p>
          </Card>
        ) : (
          <Card>
            <div className="flex flex-wrap items-center gap-3">
              <Stat value={String(pt.soLuot)} label="lượt" sub={`${pt.soCauDaLam} câu đã làm`} />
              <Stat value={`${pt.trungBinh}%`} label="trung bình" sub={loiDuLieu} />
              <button
                type="button"
                onClick={() => {
                  xoaLuotNganHang();
                  setLuot([]);
                }}
                className="ml-auto rounded-lg border border-slate-700 px-3 py-1.5 text-[12px] font-semibold text-slate-300 transition hover:border-rose-500 hover:text-rose-200"
              >
                Xoá lịch sử
              </button>
            </div>

            {pt.duDeKetLuan ? (
              <>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Chuyên đề yếu nhất
                </p>
                <div className="mt-1.5 space-y-1">
                  {pt.chuyenDeYeu.slice(0, 3).map((x) => (
                    <p key={x.chuyenDeId} className="text-[13px] text-slate-200">
                      <span className="tabular-nums text-slate-400">{x.trungBinh}%</span>{' '}
                      {tenChuyenDe(x.chuyenDeId)}{' '}
                      <span className="text-slate-500">({x.soLuot} lượt)</span>
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-3 text-[13px] leading-relaxed text-slate-400">
                Chưa đủ {DU_DE_KET_LUAN} lượt nên chưa kết luận chuyên đề nào yếu. Kết luận từ một
                hai lượt là đoán, và đoán sai thì em học lệch.
              </p>
            )}

            {bayCoTen.length > 0 && (
              <>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Bẫy hay mắc ở chuyên đề đang mở
                </p>
                <div className="mt-1.5 space-y-1">
                  {bayCoTen.slice(0, 3).map((b) => (
                    <p key={b.bayNo} className="text-[13px] text-rose-200">
                      <span className="tabular-nums text-slate-400">{b.soLan} lần</span> — {b.ten}
                    </p>
                  ))}
                </div>
              </>
            )}

            <p className="mt-4 text-[12px] leading-relaxed text-slate-500">
              Lượt ngân hàng lưu riêng với hồ sơ phiếu luyện, vì phiếu luyện có năm phần và có cấp
              độ còn ngân hàng thì không. Gộp chung sẽ làm trung bình theo phần sai mà không ai
              thấy. Cả hai đều nằm trên máy này, không gửi đi đâu — đổi máy là mất.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
