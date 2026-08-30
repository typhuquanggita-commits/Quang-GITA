/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {DE_THI_MAU, DETHI_SO} from '../../data/dethi';
import {
  chamDeThi, docKetQua, giayConLai, luuLanThi, docLichSuThi,
  docBaiDangLam, luuBaiDangLam, xoaBaiDangLam, CHAMTHI_CREED,
  type KetQuaDeThi,
} from '../../data/chamthi';
import {GIAI_BY_DANG} from '../../data';
import {SectionHeader, Card, Chip, Stat, Field} from './ui';
import type {DeThiMau, CauDeThi} from '../../types';

/* ==========================================================================
   THI THỬ BẤM GIỜ

   VÌ SAO TÁCH KHỎI THẺ ĐỀ THI MẪU
     Hai việc khác hẳn nhau. Thẻ đề thi mẫu là để ĐỌC: xem cấu trúc, đọc
     lời giải, hiểu barem — và ở đó đáp án bày sẵn là đúng. Thẻ này là để
     LÀM: đáp án phải giấu, đồng hồ phải chạy, và nộp rồi mới được xem.
     Trộn hai việc vào một màn hình thì học viên nhìn thấy đáp án trước khi
     kịp nghĩ, và bài thi thử mất sạch giá trị.

   ĐỒNG HỒ CHẠY THEO THỜI GIAN THẬT
     Mốc bắt đầu được ghi lại, không phải số giây còn lại. Đóng trang rồi mở
     lại thì đồng hồ đã chạy tiếp đúng bằng thời gian trôi qua ngoài đời.
     Ghi số giây còn lại thì đóng trang là đồng hồ dừng, và bài thi thử
     không còn đo được gì về giờ giấc nữa.
   ========================================================================== */

const dinhDangGiay = (g: number): string => {
  const p = Math.floor(g / 60);
  const s = g % 60;
  return `${String(p).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

/* --------------------------- MỘT CÂU KHI LÀM ---------------------------- */

const CauLam: React.FC<{
  c: CauDeThi;
  traLoi: string;
  onTraLoi: (v: string) => void;
}> = ({c, traLoi, onTraLoi}) => (
  <div
    id={`cau-${c.no}`}
    className={`rounded-xl border p-3.5 transition ${
      traLoi.trim() ? 'border-sky-500/40 bg-sky-500/5' : 'border-slate-800 bg-slate-900/40'
    }`}>
    <div className="flex flex-wrap items-center gap-2">
      <Chip tone={traLoi.trim() ? 'sky' : 'slate'}>Câu {c.no}</Chip>
      {!traLoi.trim() && <span className="text-[11px] text-slate-500">chưa làm</span>}
    </div>
    <p className="mt-2.5 text-[14px] leading-relaxed text-slate-100">{c.deBai}</p>

    {c.luaChon ? (
      <div className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
        {c.luaChon.map((l, i) => {
          const chu = String.fromCharCode(65 + i);
          const chon = traLoi === chu;
          return (
            <button
              key={i}
              type="button"
              aria-pressed={chon}
              onClick={() => onTraLoi(chon ? '' : chu)}
              className={`rounded-lg border px-2.5 py-2 text-left text-[13px] leading-relaxed transition ${
                chon
                  ? 'border-sky-400 bg-sky-500/15 text-sky-100'
                  : 'border-slate-800 text-slate-300 hover:border-slate-600 hover:text-slate-100'
              }`}>
              <span className="font-semibold text-slate-400">{chu}. </span>
              {l}
            </button>
          );
        })}
      </div>
    ) : (
      <input
        type="text"
        value={traLoi}
        onChange={(e) => onTraLoi(e.currentTarget.value)}
        placeholder="Gõ câu trả lời của bạn"
        aria-label={`Câu trả lời cho câu ${c.no}`}
        className="mt-2.5 w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-[13px] text-slate-100 outline-none transition focus:border-sky-500"
      />
    )}
  </div>
);

/* ----------------------------- MÀN HÌNH LÀM ----------------------------- */

const ManLam: React.FC<{
  de: DeThiMau;
  batDauLuc: number;
  baiLam: Record<number, string>;
  onTraLoi: (no: number, v: string) => void;
  onNop: (giayDaDung: number) => void;
  onBo: () => void;
}> = ({de, batDauLuc, baiLam, onTraLoi, onNop, onBo}) => {
  const [conLai, setConLai] = useState(() => giayConLai(de, batDauLuc));
  const daNop = useRef(false);

  /*
   * Đồng hồ tính lại từ MỐC BẮT ĐẦU mỗi giây, không trừ dần một biến đếm.
   * Trừ dần thì tab chạy nền bị trình duyệt bóp nhịp và đồng hồ chạy chậm
   * hơn đời thật — bài thi thử khi đó cho thêm giờ mà không ai biết.
   */
  useEffect(() => {
    const nhip = setInterval(() => {
      const g = giayConLai(de, batDauLuc);
      setConLai(g);
      if (g === 0 && !daNop.current) {
        daNop.current = true;
        onNop(de.phut * 60);
      }
    }, 1000);
    return () => clearInterval(nhip);
  }, [de, batDauLuc, onNop]);

  const tongCau = de.phan.reduce((s, p) => s + p.cau.length, 0);
  const daLam = Object.values(baiLam).filter((v) => v.trim()).length;
  const sapHet = conLai <= 300;

  return (
    <div>
      {/* Thanh đồng hồ dính trên đầu — luôn nhìn thấy giờ còn lại. */}
      <div className="sticky top-0 z-10 -mx-4 mb-4 border-b border-slate-800 bg-slate-950/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`font-mono text-2xl font-bold tabular-nums ${
              sapHet ? 'text-rose-300' : 'text-slate-100'
            }`}
            aria-live="polite"
            aria-label={`Còn ${Math.floor(conLai / 60)} phút ${conLai % 60} giây`}>
            {dinhDangGiay(conLai)}
          </span>
          <span className="text-[12px] text-slate-400">
            đã làm <span className="font-semibold text-slate-200">{daLam}</span>/{tongCau} câu
          </span>
          {sapHet && (
            <Chip tone="rose">còn dưới 5 phút — điền hết những câu còn trống</Chip>
          )}
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={onBo}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-[12px] font-medium text-slate-300 transition hover:border-slate-500">
              Bỏ bài
            </button>
            <button
              type="button"
              onClick={() => {
                daNop.current = true;
                onNop(de.phut * 60 - conLai);
              }}
              className="rounded-lg bg-emerald-500 px-4 py-1.5 text-[13px] font-semibold text-slate-950 transition hover:bg-emerald-400">
              Nộp bài
            </button>
          </div>
        </div>
        {/* Thanh tiến độ: tỉ lệ câu đã làm, không phải tỉ lệ đúng. */}
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-sky-500 transition-all"
            style={{width: `${Math.round((daLam / tongCau) * 100)}%`}}
          />
        </div>
      </div>

      <div className="space-y-6">
        {de.phan.map((p) => (
          <div key={p.no}>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-200">
                Phần {p.no} · {p.ten}
              </h2>
              <Chip tone="slate">{p.phut} phút</Chip>
              <Chip tone="sky">{p.diem} điểm</Chip>
              <Chip tone="violet">{p.cau.length} câu</Chip>
            </div>
            <p className="mb-2.5 text-[12px] leading-relaxed text-slate-400">{p.huongDan}</p>
            {p.nguLieu && (
              <details open className="mb-3 rounded-xl border border-violet-500/25 bg-violet-500/5">
                <summary className="cursor-pointer list-none p-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-violet-300">
                  Ngữ liệu — bấm để gập lại
                </summary>
                <div className="max-h-80 overflow-y-auto border-t border-violet-500/20 px-4 py-3">
                  {p.nguLieu.split('\n\n').map((d, i) => (
                    <p key={i} className="mb-2 text-[13px] leading-relaxed text-slate-200 last:mb-0">
                      {d}
                    </p>
                  ))}
                </div>
              </details>
            )}
            <div className="space-y-2.5">
              {p.cau.map((c) => (
                <CauLam
                  key={c.no}
                  c={c}
                  traLoi={baiLam[c.no] ?? ''}
                  onTraLoi={(v) => onTraLoi(c.no, v)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Card className="mt-6 border-emerald-500/30 bg-emerald-500/5">
        <p className="text-[13px] leading-relaxed text-slate-300">
          Nộp bài rồi mới xem được đáp án. Còn{' '}
          <span className="font-semibold text-slate-100">{tongCau - daLam}</span> câu chưa làm —
          đề này không trừ điểm câu sai, nên bỏ trống luôn tệ hơn đoán.
        </p>
        <button
          type="button"
          onClick={() => {
            daNop.current = true;
            onNop(de.phut * 60 - conLai);
          }}
          className="mt-3 rounded-lg bg-emerald-500 px-5 py-2 text-[13px] font-semibold text-slate-950 transition hover:bg-emerald-400">
          Nộp bài và xem kết quả
        </button>
      </Card>
    </div>
  );
};

/* ---------------------------- MÀN HÌNH KẾT QUẢ -------------------------- */

const ManKetQua: React.FC<{de: DeThiMau; kq: KetQuaDeThi; onLamLai: () => void; onVe: () => void}> = ({
  de, kq, onLamLai, onVe,
}) => {
  const theoNo = useMemo(() => {
    const m = new Map<number, CauDeThi>();
    for (const p of de.phan) for (const c of p.cau) m.set(c.no, c);
    return m;
  }, [de]);
  const canXem = kq.cau.filter((c) => c.trangThai !== 'dung');

  return (
    <div>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          value={`${kq.diemDat}/${kq.tongDiem}`}
          label="điểm đã chấm được"
          sub="phần máy chứng minh được"
        />
        <Stat
          value={kq.diemChoTuCham > 0 ? `+${kq.diemChoTuCham}` : '0'}
          label="điểm chờ tự chấm"
          sub={`${kq.soTuCham} câu cần bạn đối chiếu`}
        />
        <Stat value={`${kq.soDung}`} label="câu đúng" sub={`${kq.soSai} sai · ${kq.soChuaLam} bỏ trống`} />
        <Stat value={dinhDangGiay(kq.giayDaDung)} label="thời gian đã dùng" sub={`giới hạn ${de.phut} phút`} />
      </div>

      {kq.soTuCham > 0 && (
        <Card className="mb-5 border-amber-500/30 bg-amber-500/5">
          <Field label="Vì sao có hai con số">{CHAMTHI_CREED.khongGopDiem}</Field>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
            {CHAMTHI_CREED.khongBaoSaiOan}
          </p>
        </Card>
      )}

      <div className="mb-5">
        <h2 className="mb-2 text-lg font-bold text-slate-100">Đọc kết quả</h2>
        <ul className="space-y-1.5">
          {docKetQua(kq).map((x, i) => (
            <li key={i} className="text-[13px] leading-relaxed text-slate-300">
              · {x}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-5 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
              <th className="py-2 pr-4">Phần</th>
              <th className="py-2 pr-4">Điểm</th>
              <th className="py-2 pr-4">Chờ tự chấm</th>
              <th className="py-2 pr-4">Đúng</th>
              <th className="py-2 pr-4">Sai</th>
              <th className="py-2">Bỏ trống</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {kq.phan.map((p) => (
              <tr key={p.no} className="border-b border-slate-800/60">
                <td className="py-2 pr-4 text-slate-200">{p.ten}</td>
                <td className="py-2 pr-4 text-sky-300">{p.diemDat}/{p.diemToiDa}</td>
                <td className="py-2 pr-4 text-amber-300">{p.diemChoTuCham || '—'}</td>
                <td className="py-2 pr-4 text-emerald-300">{p.soDung}</td>
                <td className="py-2 pr-4 text-rose-300">{p.soSai}</td>
                <td className="py-2 text-slate-400">{p.soChuaLam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onLamLai}
          className="rounded-lg bg-sky-500 px-4 py-2 text-[13px] font-semibold text-slate-950 transition hover:bg-sky-400">
          Làm lại đề này
        </button>
        <button
          type="button"
          onClick={onVe}
          className="rounded-lg border border-slate-700 px-4 py-2 text-[13px] font-medium text-slate-300 transition hover:border-slate-500">
          Chọn đề khác
        </button>
      </div>

      <h2 className="mb-2 text-lg font-bold text-slate-100">
        {canXem.length} câu cần xem lại
      </h2>
      <p className="mb-3 max-w-3xl text-[13px] leading-relaxed text-slate-400">
        Chỉ hiện những câu chưa đúng. Câu đã đúng không cần đọc lại — thời gian
        soi bài nên dồn hết vào chỗ hỏng.
      </p>
      <div className="space-y-2.5">
        {canXem.map((r) => {
          const c = theoNo.get(r.no)!;
          const tone =
            r.trangThai === 'sai' ? 'rose' : r.trangThai === 'chua-lam' ? 'slate' : 'amber';
          const nhan =
            r.trangThai === 'sai' ? 'sai' : r.trangThai === 'chua-lam' ? 'bỏ trống' : 'tự chấm';
          return (
            <div key={r.no} className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone="slate">Câu {r.no}</Chip>
                <Chip tone={tone as 'rose' | 'slate' | 'amber'}>{nhan}</Chip>
                <Chip tone="sky">{r.diemToiDa} điểm</Chip>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-100">{c.deBai}</p>
              {c.luaChon && (
                <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {c.luaChon.map((l, i) => {
                    const chu = String.fromCharCode(65 + i);
                    const laDung = chu === c.dapAn;
                    const daChon = chu === r.daTraLoi;
                    return (
                      <p
                        key={i}
                        className={`rounded-lg border px-2.5 py-1.5 text-[13px] leading-relaxed ${
                          laDung
                            ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-100'
                            : daChon
                              ? 'border-rose-500/50 bg-rose-500/10 text-rose-100'
                              : 'border-slate-800 text-slate-400'
                        }`}>
                        <span className="font-semibold">{chu}. </span>
                        {l}
                        {daChon && !laDung && <span className="ml-2 text-[11px]">← bạn chọn</span>}
                      </p>
                    );
                  })}
                </div>
              )}
              <div className="mt-2.5 rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                {!c.luaChon && (
                  <p className="mb-1.5 text-[12px] leading-relaxed text-slate-300">
                    <span className="font-semibold text-slate-400">Bạn viết — </span>
                    {r.daTraLoi || <span className="text-slate-500">(bỏ trống)</span>}
                  </p>
                )}
                <p className="text-[13px] leading-relaxed text-emerald-200">
                  <span className="font-semibold">Đáp án — </span>
                  {c.dapAn}
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-200">
                  <span className="font-semibold text-slate-400">Lời giải — </span>
                  {c.loiGiai}
                </p>
                {c.dangId && GIAI_BY_DANG[c.dangId] && (
                  <p className="mt-1.5 text-[12px] leading-relaxed text-sky-200">
                    <span className="font-semibold">Bí kíp của dạng này — </span>
                    {GIAI_BY_DANG[c.dangId].tuKiemDapAn}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------ THẺ CHÍNH ------------------------------- */

export const ThiThu: React.FC = () => {
  const [deId, setDeId] = useState<string | null>(null);
  const [batDauLuc, setBatDauLuc] = useState<number | null>(null);
  const [baiLam, setBaiLam] = useState<Record<number, string>>({});
  const [kq, setKq] = useState<KetQuaDeThi | null>(null);
  const [lichSu, setLichSu] = useState(() => docLichSuThi());

  const de = deId ? DE_THI_MAU.find((d) => d.id === deId) ?? null : null;

  /* Khôi phục bài đang làm dở khi mở lại trang. */
  useEffect(() => {
    const b = docBaiDangLam();
    if (!b) return;
    const d = DE_THI_MAU.find((x) => x.id === b.deId);
    if (!d) return;
    setDeId(b.deId);
    setBatDauLuc(b.batDauLuc);
    setBaiLam(b.baiLam);
  }, []);

  const batDau = (id: string) => {
    const luc = Date.now();
    setDeId(id);
    setBatDauLuc(luc);
    setBaiLam({});
    setKq(null);
    luuBaiDangLam({deId: id, batDauLuc: luc, baiLam: {}});
  };

  const traLoi = (no: number, v: string) => {
    setBaiLam((s) => {
      const moi = {...s, [no]: v};
      if (deId && batDauLuc) luuBaiDangLam({deId, batDauLuc, baiLam: moi});
      return moi;
    });
  };

  const nop = (giayDaDung: number) => {
    if (!de) return;
    const r = chamDeThi(de, baiLam, giayDaDung);
    setKq(r);
    setLichSu(luuLanThi(r));
    xoaBaiDangLam();
  };

  const ve = () => {
    setDeId(null);
    setBatDauLuc(null);
    setBaiLam({});
    setKq(null);
    xoaBaiDangLam();
  };

  /* ---- Đang có kết quả ---- */
  if (de && kq) {
    return (
      <div>
        <SectionHeader
          eyebrow="Kết quả bài thi thử"
          title={de.ten}
          lead="Hai con số, không phải một: điểm máy chấm được, và điểm còn chờ bạn tự đối chiếu."
        />
        <ManKetQua de={de} kq={kq} onLamLai={() => batDau(de.id)} onVe={ve} />
      </div>
    );
  }

  /* ---- Đang làm bài ---- */
  if (de && batDauLuc !== null) {
    return (
      <div>
        <SectionHeader
          eyebrow="Đang làm bài"
          title={de.ten}
          lead={`${de.soCau} câu · ${de.phut} phút · thang ${de.tongDiem}. Đồng hồ chạy theo thời gian thật, đóng trang rồi mở lại vẫn tính tiếp.`}
        />
        <ManLam
          de={de}
          batDauLuc={batDauLuc}
          baiLam={baiLam}
          onTraLoi={traLoi}
          onNop={nop}
          onBo={ve}
        />
      </div>
    );
  }

  /* ---- Màn chọn đề ---- */
  return (
    <div>
      <SectionHeader
        eyebrow="Thi thử bấm giờ"
        title="Làm trọn một đề đúng số câu và đúng giờ của kỳ thi thật"
        lead={`${DETHI_SO.soDe} đề, ${DETHI_SO.soCau} câu. Đáp án giấu tới khi nộp bài; đồng hồ chạy theo thời gian thật; nộp xong chấm ngay và chỉ hiện những câu chưa đúng.`}
      />

      <Card className="mb-6 border-amber-500/25 bg-amber-500/5">
        <Field label="Máy chấm được tới đâu">{CHAMTHI_CREED.claim}</Field>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        {DE_THI_MAU.map((d) => {
          const lan = lichSu.filter((l) => l.deId === d.id);
          const gan = lan[lan.length - 1];
          return (
            <Card key={d.id}>
              <h2 className="text-[15px] font-bold text-slate-100">{d.ten}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <Chip tone="sky">{d.soCau} câu</Chip>
                <Chip tone="violet">{d.phut} phút</Chip>
                <Chip tone="emerald">thang {d.tongDiem}</Chip>
                <Chip tone="slate">{d.phan.length} phần</Chip>
              </div>
              <p className="mt-2.5 text-[12px] leading-relaxed text-slate-400">{d.kyThi}</p>
              {gan && (
                <p className="mt-2 text-[12px] text-slate-300">
                  Lần gần nhất:{' '}
                  <span className="font-semibold text-sky-300">
                    {gan.diemDat}/{gan.tongDiem}
                  </span>
                  {gan.diemChoTuCham > 0 && (
                    <span className="text-amber-300"> (+{gan.diemChoTuCham} chờ tự chấm)</span>
                  )}
                  <span className="text-slate-500"> · đã làm {lan.length} lần</span>
                </p>
              )}
              <button
                type="button"
                onClick={() => batDau(d.id)}
                className="mt-3 w-full rounded-lg bg-sky-500 px-4 py-2 text-[13px] font-semibold text-slate-950 transition hover:bg-sky-400">
                Bắt đầu làm — {d.phut} phút
              </button>
            </Card>
          );
        })}
      </div>

      {lichSu.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 text-lg font-bold text-slate-100">
            Lịch sử {lichSu.length} lần thi thử
          </h2>
          <p className="mb-3 max-w-3xl text-[13px] leading-relaxed text-slate-400">
            Lưu trong trình duyệt này, không gửi đi đâu. So với chính mình ở lần
            trước là phép đo đáng tin nhất — so với người khác thì không, vì điểm
            xuất phát khác nhau.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                  <th className="py-2 pr-4">Lúc</th>
                  <th className="py-2 pr-4">Đề</th>
                  <th className="py-2 pr-4">Điểm</th>
                  <th className="py-2">Thời gian</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {[...lichSu].reverse().slice(0, 12).map((l) => (
                  <tr key={l.id} className="border-b border-slate-800/60">
                    <td className="py-2 pr-4 text-slate-400">{l.luc.slice(0, 16).replace('T', ' ')}</td>
                    <td className="py-2 pr-4 text-slate-300">
                      {DE_THI_MAU.find((d) => d.id === l.deId)?.ten ?? l.deId}
                    </td>
                    <td className="py-2 pr-4 text-sky-300">
                      {l.diemDat}/{l.tongDiem}
                      {l.diemChoTuCham > 0 && (
                        <span className="text-amber-300"> +{l.diemChoTuCham}</span>
                      )}
                    </td>
                    <td className="py-2 text-slate-400">{dinhDangGiay(l.giayDaDung)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
