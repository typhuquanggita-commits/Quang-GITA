/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  CERTIFY_CREED,
  AXES,
  EXAM_TIERS,
  ROLE_TRACKS,
  SCORING_RULES,
  TRAINING_ENGINE,
  TRAINING_COURSES,
} from '../../data';
import {Card, Chip, Field, Bullets, SectionHeader, Filters, Accordion} from './ui';

export const Certify: React.FC = () => {
  const [role, setRole] = useState(ROLE_TRACKS[0].id);
  const r = ROLE_TRACKS.find((x) => x.id === role)!;
  const course = TRAINING_COURSES.find((c) =>
    r.name.includes(c.role.split(' ')[0]),
  );

  return (
    <div>
      <SectionHeader
        eyebrow="Kiểm định & đào tạo nhân sự"
        title={CERTIFY_CREED.title}
        lead={CERTIFY_CREED.principle}
      />

      <div className="mb-10 grid gap-3 md:grid-cols-3">
        <Card className="border-sky-500/25">
          <Field label="Vì sao năm tầng">
            <p className="text-slate-300">{CERTIFY_CREED.millerNote}</p>
          </Field>
        </Card>
        <Card className="border-rose-500/25">
          <Field label="Chống học tủ">
            <p className="text-slate-300">{CERTIFY_CREED.antiCheat}</p>
          </Field>
        </Card>
        <Card className="border-emerald-500/25">
          <Field label="Công bằng khi trượt">
            <p className="text-slate-300">{CERTIFY_CREED.fairness}</p>
          </Field>
        </Card>
      </div>

      {/* 8 trục */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Tám trục đánh giá
      </h3>
      <div className="mb-10 grid gap-2.5 md:grid-cols-2">
        {AXES.map((a) => (
          <Card key={a.id}>
            <div className="mb-2 flex items-baseline gap-2.5">
              <span className="text-lg font-black text-slate-400">
                {String(a.no).padStart(2, '0')}
              </span>
              <h4 className="text-sm font-bold text-slate-100">{a.name}</h4>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">{a.what}</p>
            <Field label="Đo bằng">
              <p className="text-slate-400">{a.measuredBy}</p>
            </Field>
            <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">
                Dấu hiệu chưa đạt
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-300">
                {a.failLooks}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* 5 tầng */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Năm tầng bài kiểm tra — theo tháp Miller
      </h3>
      <div className="mb-10 space-y-2.5">
        {EXAM_TIERS.map((t) => (
          <Card key={t.no} className="border-l-2 border-l-violet-500/50">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="shrink-0 md:w-40">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl font-black text-violet-400">
                    {t.no}
                  </span>
                  <div>
                    <p className="text-sm font-black tracking-wide text-slate-100">
                      {t.name}
                    </p>
                    <p className="font-mono text-[11px] text-slate-400">
                      {t.millerLevel}
                    </p>
                  </div>
                </div>
                <Chip tone="slate">{t.duration}</Chip>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed text-slate-300">
                  {t.format}
                </p>
                <p className="mt-2 text-xs text-sky-300">
                  <span className="font-semibold">Chấm trục: </span>
                  {t.scores}
                </p>
                <p className="mt-2 rounded-lg bg-slate-800/40 p-2.5 text-xs leading-relaxed text-amber-200/90">
                  <span className="font-semibold">Diễn được không: </span>
                  {t.cannotFake}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 6 vai */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Sáu vai · mỗi vai năm bậc
      </h3>
      <Filters
        options={ROLE_TRACKS.map((t) => ({id: t.id, label: t.name}))}
        value={role}
        onChange={setRole}
      />

      <Card className={`mb-4 border-0 bg-gradient-to-r ${r.color} p-[1px]`}>
        <div className="rounded-[11px] bg-slate-950 p-5">
          <h4 className="text-lg font-black tracking-wide text-slate-100">
            {r.name}
          </h4>
          <p className="mt-1 text-xs text-slate-400">{r.who}</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {r.purpose}
          </p>
          <div className="mt-4 border-t border-slate-800 pt-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Trọng số trục cho vai này
            </p>
            <div className="space-y-1.5">
              {r.weights.map((w) => (
                <div key={w.axis}>
                  <div className="mb-0.5 flex justify-between text-[11px]">
                    <span className="text-slate-400">{w.axis}</span>
                    <span className="font-semibold text-sky-400">{w.pct}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-sky-500"
                      style={{width: `${w.pct * 2.5}%`}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-800 pt-4">
            <Chip tone="violet">Nhịp: {r.cadence}</Chip>
            <Chip tone="amber">Tái kiểm: {r.recertify}</Chip>
          </div>
        </div>
      </Card>

      <div className="mb-10 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
        {r.levels.map((l) => (
          <Card key={l.no}>
            <p className="text-[11px] font-medium text-slate-400">BẬC {l.no}</p>
            <p className="mt-0.5 text-sm font-black tracking-wide text-slate-100">
              {l.name}
            </p>
            <p className="mt-1 text-[11px] italic text-sky-300/80">
              {l.epithet}
            </p>
            <Field label="Làm được">
              <p className="text-[11px] text-slate-300">{l.canDo}</p>
            </Field>
            {l.cannotYet !== '—' && (
              <p className="mb-3 text-[11px] leading-relaxed text-rose-300/70">
                Chưa: {l.cannotYet}
              </p>
            )}
            <div className="flex flex-wrap gap-1 border-t border-slate-800 pt-2.5">
              <Chip tone="emerald">Ngưỡng {l.passMark}</Chip>
              <Chip tone="slate">Tầng {l.tiersRequired.join(', ')}</Chip>
            </div>
          </Card>
        ))}
      </div>

      {/* Quy tắc chấm */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Sáu quy tắc chấm
      </h3>
      <div className="mb-10 space-y-2">
        {SCORING_RULES.map((s) => (
          <Card key={s.no} className="border-l-2 border-l-amber-500/50">
            <div className="flex gap-3.5">
              <span className="text-sm font-bold text-amber-400">
                {String(s.no).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-100">{s.rule}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {s.why}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Đào tạo tự động */}
      <SectionHeader
        eyebrow="Đào tạo tự động trên app"
        title={`${TRAINING_COURSES.length} khoá nghề — CTV · Tư vấn · Coach · Giáo viên`}
        lead={TRAINING_ENGINE.proof}
        bac={2}
      />
      <Card className="mb-4 border-emerald-500/25">
        <Field label="Bộ máy chạy thế nào">
          <Bullets items={TRAINING_ENGINE.howItRuns} marker="→" />
        </Field>
        <div className="rounded-lg bg-slate-800/40 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
            Tự chỉ định mô-đun bù
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-300">
            {TRAINING_ENGINE.autoAssign}
          </p>
        </div>
      </Card>

      <div className="space-y-2.5">
        {TRAINING_COURSES.map((c) => (
          <Accordion
            key={c.id}
            title={`${c.role} — ${c.name}`}
            subtitle={c.promise}
            defaultOpen={course?.id === c.id}
            right={
              <span className="flex flex-wrap justify-end gap-1.5">
                <Chip tone="sky">{c.level}</Chip>
                <Chip tone="slate">{c.totalHours}h</Chip>
              </span>
            }>
            <p className="mb-4 text-xs text-slate-400">{c.cadence}</p>
            <Field label={`${c.modules.length} mô-đun — mỗi mô-đun có cổng`}>
              <div className="space-y-1.5">
                {c.modules.map((m) => (
                  <div
                    key={m.no}
                    className="flex flex-col gap-2 rounded-lg bg-slate-800/30 p-3 md:flex-row">
                    <span className="shrink-0 text-xs font-bold text-slate-400 md:w-8">
                      {String(m.no).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-200">
                        {m.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {m.format} · {m.minutes} phút
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">
                        {m.outcome}
                      </p>
                    </div>
                    <span className="shrink-0 md:w-52">
                      <span className="block rounded bg-emerald-500/10 px-2 py-1 text-[11px] leading-snug text-emerald-300">
                        Cổng: {m.gate}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </Field>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-400">
                  Chứng nhận
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {c.certification}
                </p>
              </div>
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                  Tự chỉ định bù khi trượt
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {c.autoRemediation}
                </p>
              </div>
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
