/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {DE_THI_MAU, DETHI_SO, DETHI_CREED, GIAI_BY_DANG, DANG_BAI} from '../../data';
import {SectionHeader, Card, Chip, Stat, Filters} from './ui';
import type {CauDeThi} from '../../types';

const tenDang = (id?: string) => DANG_BAI.find((d) => d.id === id)?.ten;

const Cau: React.FC<{c: CauDeThi; hien: boolean; onMo: () => void}> = ({c, hien, onMo}) => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3.5">
    <div className="flex flex-wrap items-center gap-2">
      <Chip tone="slate">Câu {c.no}</Chip>
      <Chip tone="sky">{c.diem} điểm</Chip>
      {c.dangId && <Chip tone="violet">{tenDang(c.dangId)}</Chip>}
      {!hien && (
        <button
          type="button"
          onClick={onMo}
          className="ml-auto rounded-lg border border-slate-700 px-3 py-1 text-[12px] font-semibold text-slate-200 transition hover:border-sky-500 hover:text-sky-200">
          Xem đáp án
        </button>
      )}
    </div>
    <p className="mt-2.5 text-[14px] leading-relaxed text-slate-100">{c.deBai}</p>
    {c.luaChon && (
      <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {c.luaChon.map((l, i) => {
          const chu = String.fromCharCode(65 + i);
          const dung = hien && chu === c.dapAn;
          return (
            <p
              key={i}
              className={`rounded-lg border px-2.5 py-1.5 text-[13px] leading-relaxed ${
                dung
                  ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-100'
                  : 'border-slate-800 text-slate-300'
              }`}>
              <span className="font-semibold text-slate-400">{chu}. </span>
              {l}
            </p>
          );
        })}
      </div>
    )}
    {hien && (
      <div className="mt-2.5 rounded-lg border border-slate-800 bg-slate-950/50 p-3">
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
    )}
  </div>
);

export const DeThi: React.FC = () => {
  const [ma, setMa] = useState(DE_THI_MAU[0].id);
  const de = DE_THI_MAU.find((d) => d.id === ma)!;
  const [mo, setMo] = useState<Record<string, boolean>>({});
  const [hetCa, setHetCa] = useState(false);

  const doiDe = (id: string) => {
    setMa(id);
    setMo({});
    setHetCa(false);
  };

  return (
    <div>
      <SectionHeader
        eyebrow="Đề thi mẫu trọn vẹn"
        title="Bốn đề theo đúng cấu trúc bốn kỳ thi có thật, kèm lời giải và barem"
        lead={DETHI_CREED.claim}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value={String(DETHI_SO.soDe)} label="đề trọn vẹn" sub="bốn kỳ thi khác nhau" />
        <Stat value={String(DETHI_SO.soCau)} label="câu" sub={`${DETHI_SO.soLoiGiai} lời giải riêng`} />
        <Stat value={String(DETHI_SO.soPhan)} label="phần" sub="mỗi phần một barem" />
        <Stat value={`${DETHI_SO.tongPhut}`} label="phút" sub="tổng thời gian bốn đề" />
      </div>

      <Card className="mb-6 border-amber-500/30 bg-amber-500/5">
        <p className="text-[13px] leading-relaxed text-amber-100">
          <span className="font-semibold">Không dùng để đoán đề — </span>
          {DETHI_CREED.khongDoanDe}
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
          <span className="font-semibold text-slate-400">Vì sao rút gọn — </span>
          {DETHI_CREED.rutGon}
        </p>
      </Card>

      <div className="mb-4">
        <Filters
          options={DE_THI_MAU.map((d) => ({id: d.id, label: d.ten}))}
          value={ma}
          onChange={doiDe}
        />
      </div>

      <Card className="mb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-slate-100">{de.ten}</span>
          <Chip tone="sky">{de.phut} phút</Chip>
          <Chip tone="slate">{de.soCau} câu</Chip>
          <Chip tone="emerald">thang {de.tongDiem}</Chip>
          <button
            type="button"
            onClick={() => setHetCa(!hetCa)}
            className="ml-auto rounded-lg bg-sky-500 px-4 py-1.5 text-[13px] font-semibold text-slate-950 transition hover:bg-sky-400">
            {hetCa ? 'Ẩn hết đáp án' : 'Mở hết đáp án'}
          </button>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-slate-300">
          <span className="font-semibold text-slate-400">Theo cấu trúc — </span>
          {de.theoCauTruc}
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-amber-200">
          <span className="font-semibold">Cảnh báo — </span>
          {de.canhBao}
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-emerald-200">
          <span className="font-semibold">Thứ tự làm bài — </span>
          {de.thuTuLam}
        </p>
        <div className="mt-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            Chia thời gian
          </p>
          <ul className="mt-1 space-y-0.5">
            {de.chiaThoiGian.map((x, i) => (
              <li key={i} className="text-[12px] leading-relaxed text-slate-300">
                · {x}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed text-slate-400">
          <span className="font-semibold">Barem chung — </span>
          {de.baremChung}
        </p>
      </Card>

      <div className="space-y-6">
        {de.phan.map((p) => (
          <div key={p.no}>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-200">
                Phần {p.no} · {p.ten}
              </h3>
              <Chip tone="slate">{p.phut} phút</Chip>
              <Chip tone="sky">{p.diem} điểm</Chip>
              <Chip tone="violet">{p.cau.length} câu</Chip>
            </div>
            <p className="mb-2.5 text-[12px] leading-relaxed text-slate-400">{p.huongDan}</p>
            {p.nguLieu && (
              <div className="mb-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Ngữ liệu
                </p>
                {p.nguLieu.split('\n\n').map((d, i) => (
                  <p key={i} className="mb-2 text-[13px] leading-relaxed text-slate-200 last:mb-0">
                    {d}
                  </p>
                ))}
              </div>
            )}
            <div className="space-y-2.5">
              {p.cau.map((c) => (
                <Cau
                  key={c.no}
                  c={c}
                  hien={hetCa || !!mo[`${p.no}-${c.no}`]}
                  onMo={() => setMo((s) => ({...s, [`${p.no}-${c.no}`]: true}))}
                />
              ))}
            </div>
            <div className="mt-2.5 rounded-xl border border-slate-800 bg-slate-900/40 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                Barem phần {p.no}
              </p>
              {p.barem.split('\n').map((d, i) => (
                <p key={i} className="mt-1 text-[12px] leading-relaxed text-slate-200">
                  {d}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
