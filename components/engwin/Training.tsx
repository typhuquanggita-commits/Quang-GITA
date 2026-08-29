/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  TRAINING_CREED,
  MENTOR_CREED,
  MENTOR_SESSION,
  MENTOR_STAGES,
  MENTOR_RULES,
  COACH_LADDER,
  ADVANCED_COURSES,
  EXCELLENCE_CREED,
  EXCELLENCE_GATES,
  EXCELLENCE_SHIFTS,
  EXCELLENCE_EXITS,
} from '../../data';
import {SectionHeader, Card, Chip, Stat, Bullets, Filters, Accordion} from './ui';

const WHO_TONE: Record<string, 'sky' | 'violet' | 'amber'> = {
  'học viên nói': 'sky',
  'cố vấn nói': 'violet',
  'cả hai': 'amber',
};

const VIEWS = [
  {id: 'kem', label: 'Kèm cặp 1–1'},
  {id: 'coach', label: 'Thang nghề coach'},
  {id: 'khoa', label: 'Khoá nâng cao'},
  {id: 'xuatsac', label: 'Lộ trình xuất sắc'},
];

/* ----------------------------- KÈM CẶP 1–1 ------------------------------ */

const KemCap: React.FC = () => {
  const hv = MENTOR_SESSION.filter((b) => b.who === 'học viên nói')
    .reduce((s, b) => s + b.minutes, 0);
  const cv = MENTOR_SESSION.filter((b) => b.who === 'cố vấn nói')
    .reduce((s, b) => s + b.minutes, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-sky-500/25 bg-sky-500/[0.03]">
          <h3 className="text-sm font-bold text-sky-200">{MENTOR_CREED.name}</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">
            {MENTOR_CREED.claim}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {MENTOR_CREED.why}
          </p>
        </Card>
        <Card className="border-amber-500/25 bg-amber-500/[0.03]">
          <h3 className="text-sm font-bold text-amber-200">Hai giới hạn</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {MENTOR_CREED.notTherapy}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {MENTOR_CREED.endsOnPurpose}
          </p>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat value={`${hv}′`} label="Học viên nói" sub="hơn một nửa buổi" />
        <Stat value={`${cv}′`} label="Cố vấn nói" sub="ít hơn học viên, luôn luôn" />
        <Stat value="1" label="Điều cần sửa mỗi buổi" sub="Không bao giờ hai" />
      </div>

      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Sáu mươi phút, sáu khối
        </h3>
        <div className="space-y-3">
          {MENTOR_SESSION.map((b) => (
            <Card key={b.slot} className="flex flex-col gap-3 md:flex-row">
              <div className="shrink-0 md:w-32">
                <p className="text-sm font-bold text-slate-100">{b.slot}</p>
                <p className="text-[11px] text-slate-400">{b.minutes} phút</p>
                <div className="mt-1.5">
                  <Chip tone={WHO_TONE[b.who]}>{b.who}</Chip>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs leading-relaxed text-slate-300">{b.what}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
                  {b.why}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Nhịp kèm giãn dần — mục tiêu là học viên không cần cố vấn nữa
        </h3>
        <div className="grid gap-3 lg:grid-cols-4">
          {MENTOR_STAGES.map((s) => (
            <Card key={s.no} className="flex h-full flex-col">
              <p className="text-2xl font-black text-sky-500/80">
                {String(s.no).padStart(2, '0')}
              </p>
              <p className="text-sm font-bold text-slate-100">{s.name}</p>
              <p className="mt-0.5 text-[11px] text-slate-400">{s.when}</p>
              <div className="mt-2">
                <Chip tone="violet">{s.frequency}</Chip>
              </div>
              <p className="mt-2.5 text-[11px] leading-relaxed text-slate-400">
                {s.focus}
              </p>
              <p className="mt-auto pt-3 text-[11px] leading-relaxed text-emerald-300/80">
                Chuyển chặng khi: {s.handover}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-rose-500/25">
        <h3 className="text-sm font-bold text-rose-200">Luật cứng của cố vấn</h3>
        <div className="mt-2">
          <Bullets items={MENTOR_RULES} />
        </div>
      </Card>
    </div>
  );
};

/* --------------------------- THANG NGHỀ COACH ---------------------------- */

const ThangCoach: React.FC = () => (
  <div className="space-y-3">
    {COACH_LADDER.map((r) => (
      <Accordion
        key={r.no}
        title={`Bậc ${r.no} — ${r.name}`}
        subtitle={r.epithet}
        right={
          <Chip tone={r.supervisedHours > 0 ? 'amber' : 'emerald'}>
            {r.supervisedHours > 0
              ? `${r.supervisedHours}h có giám sát`
              : 'tự đứng'}
          </Chip>
        }
        defaultOpen={r.no === 1}>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2 text-[11px] leading-relaxed">
            <p className="text-slate-400">
              <span className="font-semibold text-slate-300">Vào bậc khi: </span>
              {r.entry}
            </p>
            <p className="text-slate-400">
              <span className="font-semibold text-slate-300">Số ca cùng lúc: </span>
              {r.caseLoad}
            </p>
            <p className="text-slate-400">
              <span className="font-semibold text-slate-300">Giờ tích luỹ: </span>
              {r.supervisedHours}h có giám sát · {r.soloHours}h tự đứng
            </p>
          </div>
          <div className="space-y-2 text-[11px] leading-relaxed">
            <p className="rounded bg-emerald-500/10 px-2 py-1.5 text-emerald-200">
              <span className="font-semibold">Được làm: </span>
              {r.canDo}
            </p>
            <p className="rounded bg-rose-500/10 px-2 py-1.5 text-rose-200">
              <span className="font-semibold">Chưa được làm: </span>
              {r.cannotYet}
            </p>
          </div>
        </div>
        <h4 className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          Phải chứng minh được
        </h4>
        <div className="mt-1.5">
          <Bullets items={r.mustShow} />
        </div>
        <p className="mt-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 text-[11px] leading-relaxed text-amber-200/90">
          Cổng lên bậc: {r.gate}
        </p>
      </Accordion>
    ))}
  </div>
);

/* --------------------------- KHOÁ NÂNG CAO ------------------------------- */

const KhoaNangCao: React.FC = () => (
  <div className="space-y-4">
    {ADVANCED_COURSES.map((c) => (
      <Accordion
        key={c.id}
        title={c.name}
        subtitle={`${c.role} · ${c.level}`}
        right={<Chip tone="sky">{c.totalHours}h</Chip>}>
        <p className="text-xs leading-relaxed text-slate-300">{c.promise}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Chip tone="violet">{c.cadence}</Chip>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-amber-300/90">
          Điều kiện vào: {c.entry}
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] text-[11px]">
            <thead>
              <tr className="border-b border-slate-800 text-left text-slate-400">
                <th className="py-1.5 pr-2 font-medium">#</th>
                <th className="py-1.5 pr-3 font-medium">Mô-đun</th>
                <th className="py-1.5 pr-3 font-medium">Phút</th>
                <th className="py-1.5 pr-3 font-medium">Kết quả</th>
                <th className="py-1.5 font-medium">Cổng</th>
              </tr>
            </thead>
            <tbody>
              {c.modules.map((m) => (
                <tr key={m.no} className="border-b border-slate-900 align-top">
                  <td className="py-2 pr-2 font-semibold text-slate-400">{m.no}</td>
                  <td className="py-2 pr-3 font-medium text-slate-300">{m.name}</td>
                  <td className="py-2 pr-3 tabular-nums text-slate-400">{m.minutes}</td>
                  <td className="py-2 pr-3 text-slate-400">{m.outcome}</td>
                  <td className="py-2 text-emerald-300/80">{m.gate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.04] p-3">
          <p className="text-[11px] font-bold text-emerald-200">Bài tốt nghiệp</p>
          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-300">
            {c.capstone}
          </p>
          <p className="mt-2 text-[11px] text-slate-400">{c.certification}</p>
        </div>
      </Accordion>
    ))}
  </div>
);

/* ------------------------- LỘ TRÌNH XUẤT SẮC ----------------------------- */

const XuatSac: React.FC = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-violet-500/25 bg-violet-500/[0.03]">
        <h3 className="text-sm font-bold text-violet-200">
          {EXCELLENCE_CREED.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          {EXCELLENCE_CREED.claim}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          {EXCELLENCE_CREED.whyNotForEveryone}
        </p>
      </Card>
      <Card className="border-amber-500/25 bg-amber-500/[0.03]">
        <h3 className="text-sm font-bold text-amber-200">Hai điều nói trước</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          {EXCELLENCE_CREED.theTrap}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-400">
          {EXCELLENCE_CREED.honestCost}
        </p>
      </Card>
    </div>

    <Card className="border-rose-500/25">
      <h3 className="text-sm font-bold text-rose-200">
        Bốn điều kiện vào — không có ngoại lệ
      </h3>
      <div className="mt-2">
        <Bullets items={EXCELLENCE_GATES} />
      </div>
    </Card>

    <div>
      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        Sáu khác biệt — không khác biệt nào là “học nhiều giờ hơn”
      </h3>
      <div className="space-y-3">
        {EXCELLENCE_SHIFTS.map((s) => (
          <Card key={s.no}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg font-black text-violet-500/80">
                {String(s.no).padStart(2, '0')}
              </span>
              <h4 className="text-sm font-bold text-slate-100">{s.dimension}</h4>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  Lộ trình chuẩn
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                  {s.standard}
                </p>
              </div>
              <div className="rounded-lg border border-violet-500/25 bg-violet-500/[0.05] p-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-violet-400">
                  Lộ trình xuất sắc
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
                  {s.excellence}
                </p>
              </div>
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-slate-400">
              {s.why}
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-amber-300/80">
              Cái giá: {s.cost}
            </p>
          </Card>
        ))}
      </div>
    </div>

    <Card className="border-emerald-500/25">
      <h3 className="text-sm font-bold text-emerald-200">
        Bốn lối ra — quay về lộ trình chuẩn không phải thất bại
      </h3>
      <div className="mt-3 space-y-2">
        {EXCELLENCE_EXITS.map((e) => (
          <div
            key={e.when}
            className="rounded-lg border border-slate-800 bg-slate-950/40 p-2.5">
            <p className="text-[11px] font-semibold text-slate-300">{e.when}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
              → {e.then}
            </p>
          </div>
        ))}
      </div>
    </Card>
  </div>
);

/* --------------------------------- TAB ----------------------------------- */

export const Training: React.FC = () => {
  const [view, setView] = useState('kem');

  return (
    <div>
      <SectionHeader
        eyebrow="Đào tạo nâng cao"
        title={TRAINING_CREED.name}
        lead={TRAINING_CREED.claim}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value="60′" label="Buổi kèm 1–1" sub="Học viên nói 35 phút" />
        <Stat value={String(COACH_LADDER.length)} label="Bậc nghề coach" sub="Trợ giảng → Chủ nhiệm" />
        <Stat value={String(ADVANCED_COURSES.length)} label="Khoá nâng cao" sub="Bậc 4–5 cho bốn vai" />
        <Stat value={String(EXCELLENCE_SHIFTS.length)} label="Khác biệt xuất sắc" sub="Không cái nào là học nhiều hơn" />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-sm font-bold text-slate-100">Vì sao có tầng này</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {TRAINING_CREED.why}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-300">
            {TRAINING_CREED.ratio}
          </p>
        </Card>
        <Card className="border-amber-500/25 bg-amber-500/[0.03]">
          <h3 className="text-sm font-bold text-amber-200">Nói thẳng</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            {TRAINING_CREED.hardTruth}
          </p>
        </Card>
      </div>

      <Filters options={VIEWS} value={view} onChange={setView} />

      {view === 'kem' && <KemCap />}
      {view === 'coach' && <ThangCoach />}
      {view === 'khoa' && <KhoaNangCao />}
      {view === 'xuatsac' && <XuatSac />}
    </div>
  );
};
