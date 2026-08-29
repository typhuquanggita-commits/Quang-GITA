/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useMemo, useState} from 'react';
import {
  CHUYEN_CREED, EXAM_SPEC, EXAM_PARTS, ENTRY_TEST, BANDS,
  CHUYEN_PHASES, CHUYEN_LEVELS, UPGRADE_PLANS, FINISH_LINE,
  tinhNguoc, diemXetTuyen,
} from '../../data';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters, Accordion} from './ui';

const VIEWS = [
  {id: 'tinh', label: 'Tính ngược từ đích'},
  {id: 'de', label: 'Cấu trúc đề'},
  {id: 'bac', label: 'Test đầu vào & phân bậc'},
  {id: 'lotrinh', label: '22 tháng'},
  {id: 'cap', label: '7 cấp phải vượt'},
  {id: 'nangcap', label: 'Hệ giải pháp'},
];

/* ---------------------- MÁY TÍNH NGƯỢC TỪ ĐÍCH -------------------------- */

const TinhNguoc: React.FC = () => {
  const [chuan, setChuan] = useState(38);
  const [bien, setBien] = useState(1);
  const [toan, setToan] = useState(8);
  const [van, setVan] = useState(7);
  const [ng, setNg] = useState(9);

  const dich = chuan + bien;
  // Bài chuyên nhân hệ số hai, nên phần còn thiếu chia đôi.
  const chuyenCan = Math.max(0, Math.min(10, (dich - toan - van - ng) / 2));
  const datDuoc = diemXetTuyen(toan, van, ng, chuyenCan);
  const phan = useMemo(() => tinhNguoc(chuyenCan), [chuyenCan]);
  const duoiBay = chuyenCan < 7;

  const O: React.FC<{id: string; label: string; v: number; set: (n: number) => void; max: number; step?: number}> =
    ({id, label, v, set, max, step = 0.25}) => (
      <div>
        <label htmlFor={id} className="text-[11px] font-medium text-slate-400">
          {label}
        </label>
        <input
          id={id}
          type="number"
          min={0}
          max={max}
          step={step}
          value={v}
          onChange={(e) => set(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs tabular-nums text-slate-200 focus:border-sky-500 focus:outline-none"
        />
      </div>
    );

  return (
    <div>
      <Card className="mb-6">
        <h3 className="text-sm font-bold text-slate-100">
          Đặt đích rồi tính ngược ra số câu phải đúng
        </h3>
        <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
          {EXAM_SPEC.formula.text}. {EXAM_SPEC.formula.note}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          <O id="c-chuan" label="Điểm chuẩn dự kiến" v={chuan} set={setChuan} max={50} step={0.25} />
          <O id="c-bien" label="Biên an toàn muốn có" v={bien} set={setBien} max={5} step={0.5} />
          <O id="c-toan" label="Toán dự kiến" v={toan} set={setToan} max={10} />
          <O id="c-van" label="Văn dự kiến" v={van} set={setVan} max={10} />
          <O id="c-ng" label="Ngoại ngữ chung" v={ng} set={setNg} max={10} />
        </div>
      </Card>

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat value={dich.toFixed(2)} label="Tổng điểm phải đạt" sub={`chuẩn ${chuan} + biên ${bien}`} />
        <Stat value={chuyenCan.toFixed(2)} label="Bài chuyên phải đạt" sub="hệ số hai" />
        <Stat value={datDuoc.toFixed(2)} label="Tổng khi đạt đúng vậy" sub={`tối đa ${EXAM_SPEC.formula.max}`} />
      </div>

      <Card className={duoiBay ? 'mb-6 border-emerald-500/30' : 'mb-6 border-amber-500/30'}>
        {chuyenCan >= 10 ? (
          <p className="text-xs leading-relaxed text-rose-200">
            Ba môn chung ở mức này thì bài chuyên phải đạt trên 10 điểm — bất khả
            thi. Phải kéo ít nhất một môn chung lên trước khi bàn tới bài chuyên.
          </p>
        ) : duoiBay ? (
          <p className="text-xs leading-relaxed text-emerald-200">
            Bài chuyên chỉ cần {chuyenCan.toFixed(2)}, thấp hơn mốc 7,0 của lộ
            trình. Vẫn nên nhắm 7,0: điểm chuẩn đổi theo từng năm, và ba môn
            chung có thể không đạt đúng như dự kiến hôm nay.
          </p>
        ) : (
          <p className="text-xs leading-relaxed text-amber-200">
            Bài chuyên phải đạt {chuyenCan.toFixed(2)} — trên mốc 7,0. Mỗi điểm ở
            đây đáng gấp đôi một điểm ở môn chung, nên đây là chỗ đáng dồn sức
            nhất.
          </p>
        )}
      </Card>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-[11px]">
          <thead>
            <tr className="border-b border-slate-800 text-left text-slate-400">
              <th className="py-2 pr-3 font-medium">Phần</th>
              <th className="py-2 pr-3 font-medium">Số câu</th>
              <th className="py-2 pr-3 font-medium">Cần đúng</th>
              <th className="py-2 pr-3 font-medium">Tỉ lệ</th>
              <th className="py-2 font-medium">Đóng góp điểm</th>
            </tr>
          </thead>
          <tbody>
            {phan.map((p) => (
              <tr key={p.part} className="border-b border-slate-900">
                <td className="py-2 pr-3 font-semibold text-slate-200">{p.part}</td>
                <td className="py-2 pr-3 tabular-nums text-slate-400">{p.items}</td>
                <td className="py-2 pr-3 tabular-nums font-bold text-sky-300">
                  {p.needCorrect}
                </td>
                <td className="py-2 pr-3 tabular-nums text-slate-400">
                  {Math.round((p.needCorrect / p.items) * 100)}%
                </td>
                <td className="py-2 tabular-nums text-emerald-300/85">
                  {p.pointsFromPart.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
        Phần ngắn phải đúng tỉ lệ cao hơn: mất một câu trong năm câu ngữ âm đau
        hơn nhiều so với mất một câu trong hai mươi lăm câu ngữ pháp.
      </p>
    </div>
  );
};

/* ------------------------------ CẤU TRÚC ĐỀ ------------------------------ */

const CauTrucDe: React.FC = () => (
  <div className="space-y-4">
    <Card className="border-rose-500/40 bg-rose-500/[0.04]">
      <h3 className="text-sm font-bold text-rose-200">Đọc trước khi dùng</h3>
      <p className="mt-2 text-xs leading-relaxed text-slate-300">
        {EXAM_SPEC.verifyFirst}
      </p>
    </Card>

    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <h4 className="text-sm font-bold text-slate-100">{EXAM_SPEC.chuyen.name}</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Chip tone="sky">{EXAM_SPEC.chuyen.minutes} phút</Chip>
          <Chip>tối đa {EXAM_SPEC.chuyen.maxScore} điểm</Chip>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
          {EXAM_SPEC.chuyen.note}
        </p>
      </Card>
      <Card>
        <h4 className="text-sm font-bold text-slate-100">{EXAM_SPEC.common.name}</h4>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <Chip tone="violet">{EXAM_SPEC.common.minutes} phút</Chip>
          <Chip>{EXAM_SPEC.common.items} câu × {EXAM_SPEC.common.perItem}</Chip>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
          {EXAM_SPEC.common.note}
        </p>
      </Card>
    </div>

    {EXAM_PARTS.map((p) => (
      <Card key={p.no}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg font-black text-slate-400">
            {String(p.no).padStart(2, '0')}
          </span>
          <h4 className="text-sm font-bold text-slate-100">{p.name}</h4>
          <Chip>{p.items} câu</Chip>
          <Chip tone="violet">{p.minutes}′</Chip>
          <Chip tone="emerald">{p.weight} điểm</Chip>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
          {p.whatItTests}
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-rose-300/85">
          Hay mất điểm vì: {p.commonLoss}
        </p>
      </Card>
    ))}
  </div>
);

/* ------------------------- TEST ĐẦU VÀO & BẬC ---------------------------- */

const PhanBac: React.FC = () => (
  <div className="space-y-5">
    <Card>
      <h3 className="text-sm font-bold text-slate-100">{ENTRY_TEST.name}</h3>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Chip tone="sky">{ENTRY_TEST.minutes} phút</Chip>
        <Chip>{ENTRY_TEST.when}</Chip>
      </div>
      <div className="mt-3">
        <Bullets items={ENTRY_TEST.shape} />
      </div>
      <p className="mt-3 rounded-lg border border-violet-500/20 bg-violet-500/[0.04] p-2.5 text-[11px] leading-relaxed text-violet-100/90">
        {ENTRY_TEST.whyParentSeparate}
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
        {ENTRY_TEST.notForRanking}
      </p>
    </Card>

    <div className="grid gap-4 lg:grid-cols-2">
      {BANDS.map((b) => (
        <Card
          key={b.id}
          className={
            b.id === 'b-d'
              ? 'flex h-full flex-col border-rose-500/30'
              : 'flex h-full flex-col'
          }>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-bold text-slate-100">{b.name}</h4>
            <Chip tone={b.id === 'b-d' ? 'rose' : 'sky'}>{b.dailyMinutes}′/ngày</Chip>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">{b.entryScore}</p>
          <p className="mt-2 text-[11px] font-medium leading-relaxed text-slate-300">
            {b.feasible}
          </p>
          <div className="mt-2">
            <Bullets items={b.focus} />
          </div>
          <p className="mt-auto pt-3 text-[11px] leading-relaxed text-amber-300/85">
            {b.honestNote}
          </p>
        </Card>
      ))}
    </div>
  </div>
);

/* ------------------------------ 22 THÁNG --------------------------------- */

const LoTrinh: React.FC = () => (
  <div className="space-y-3">
    {CHUYEN_PHASES.map((p) => (
      <Accordion
        key={p.no}
        title={`Giai đoạn ${p.no} — ${p.name}`}
        subtitle={`${p.grade} · ${p.months}`}
        right={
          <Chip tone="sky">
            {(p.weekly.reduce((s, w) => s + w.sessions * w.minutes, 0) / 60).toFixed(1)}h/tuần
          </Chip>
        }
        defaultOpen={p.no === 1}>
        <p className="text-xs leading-relaxed text-slate-300">{p.goal}</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[520px] text-[11px]">
            <thead>
              <tr className="border-b border-slate-800 text-left text-slate-400">
                <th className="py-1.5 pr-3 font-medium">Khối</th>
                <th className="py-1.5 pr-3 font-medium">Buổi/tuần</th>
                <th className="py-1.5 pr-3 font-medium">Phút</th>
                <th className="py-1.5 font-medium">Nội dung</th>
              </tr>
            </thead>
            <tbody>
              {p.weekly.map((w) => (
                <tr key={w.block} className="border-b border-slate-900 align-top">
                  <td className="py-2 pr-3 font-semibold text-slate-300">{w.block}</td>
                  <td className="py-2 pr-3 tabular-nums text-slate-400">{w.sessions}</td>
                  <td className="py-2 pr-3 tabular-nums text-slate-400">{w.minutes}</td>
                  <td className="py-2 text-slate-400">{w.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <p className="rounded bg-emerald-500/10 px-2.5 py-2 text-[11px] leading-relaxed text-emerald-200">
            <span className="font-semibold">Cổng ra: </span>
            {p.exitGate}
          </p>
          <p className="rounded bg-violet-500/10 px-2.5 py-2 text-[11px] leading-relaxed text-violet-200">
            <span className="font-semibold">Thi thử: </span>
            {p.mock}
          </p>
        </div>
      </Accordion>
    ))}
  </div>
);

/* ------------------------------ BẢY CẤP ---------------------------------- */

const BayCap: React.FC = () => (
  <div className="space-y-3">
    {CHUYEN_LEVELS.map((l) => (
      <Card key={l.no} className="flex flex-col gap-3 md:flex-row">
        <div className="shrink-0 md:w-36">
          <span className="text-2xl font-black text-sky-500/80">
            {String(l.no).padStart(2, '0')}
          </span>
          <p className="text-sm font-bold text-slate-100">{l.name}</p>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium leading-relaxed text-emerald-300">
            {l.target}
          </p>
          <div className="mt-2">
            <Bullets items={l.criteria} />
          </div>
          <p className="mt-2 rounded bg-amber-500/10 px-2.5 py-2 text-[11px] leading-relaxed text-amber-200">
            <span className="font-semibold">Tắc ở đây thì: </span>
            {l.ifStuck}
          </p>
        </div>
      </Card>
    ))}
  </div>
);

/* --------------------------- HỆ GIẢI PHÁP -------------------------------- */

const NangCap: React.FC = () => {
  const [phan, setPhan] = useState('all');
  const shown = UPGRADE_PLANS.filter((u) => phan === 'all' || u.part === phan);

  return (
    <div>
      <Filters
        options={[
          {id: 'all', label: `Tất cả · ${UPGRADE_PLANS.length}`},
          ...EXAM_PARTS.map((p) => ({
            id: p.name,
            label: `${p.name} · ${UPGRADE_PLANS.filter((u) => u.part === p.name).length}`,
          })),
        ]}
        value={phan}
        onChange={setPhan}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {shown.map((u) => (
          <Card key={u.part + u.symptom} className="flex h-full flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <Chip tone="sky">{u.part}</Chip>
              <Chip>{u.weeks} tuần</Chip>
            </div>
            <p className="mt-2 text-sm font-bold leading-snug text-slate-100">
              {u.symptom}
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-rose-300/85">
              Nguyên nhân gốc: {u.rootCause}
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-300">
              {u.drill}
            </p>
            <p className="mt-auto pt-3 text-[11px] leading-relaxed text-emerald-300/85">
              Mức lên dự kiến: {u.gain}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

/* --------------------------------- TAB ----------------------------------- */

export const Chuyen: React.FC = () => {
  const [view, setView] = useState('tinh');

  return (
    <div>
      <SectionHeader
        eyebrow="Luyện thi chuyên"
        title={CHUYEN_CREED.name}
        lead={CHUYEN_CREED.claim}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value="22" label="Tháng" sub="Từ lớp 8 tới thi tháng 6 lớp 9" />
        <Stat value="7,0+" label="Đích bài chuyên" sub="Hệ số hai" />
        <Stat value={String(CHUYEN_LEVELS.length)} label="Cấp phải vượt" sub="Mở tai → giữ biên" />
        <Stat value={String(UPGRADE_PLANS.length)} label="Phác đồ nâng cấp" sub="Theo từng phần của đề" />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Card className="border-sky-500/25 bg-sky-500/[0.03]">
          <h3 className="text-sm font-bold text-sky-200">Vì sao nhắm trên điểm chuẩn</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">
            {CHUYEN_CREED.whyMargin}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {CHUYEN_CREED.whySeven}
          </p>
        </Card>
        <Card className="border-amber-500/25 bg-amber-500/[0.03]">
          <h3 className="text-sm font-bold text-amber-200">Nói thẳng</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {CHUYEN_CREED.hardTruth}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {CHUYEN_CREED.clcNote}
          </p>
        </Card>
      </div>

      <Filters options={VIEWS} value={view} onChange={setView} />

      {view === 'tinh' && <TinhNguoc />}
      {view === 'de' && <CauTrucDe />}
      {view === 'bac' && <PhanBac />}
      {view === 'lotrinh' && <LoTrinh />}
      {view === 'cap' && <BayCap />}
      {view === 'nangcap' && <NangCap />}

      <Card className="mt-8 border-emerald-500/25">
        <h3 className="text-sm font-bold text-emerald-200">{FINISH_LINE.name}</h3>
        <p className="mt-2 text-xs font-medium leading-relaxed text-slate-200">
          {FINISH_LINE.target}
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
          {FINISH_LINE.why}
        </p>
        <div className="mt-3">
          <Bullets items={FINISH_LINE.checklist} />
        </div>
        <p className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 text-[11px] leading-relaxed text-amber-200/90">
          {FINISH_LINE.ifShort}
        </p>
      </Card>
    </div>
  );
};
