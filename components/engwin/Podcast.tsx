/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, {useState} from 'react';
import {
  PODCAST_SERIES,
  PODCAST_FORMATS,
  PODCAST_EPISODES,
  estimateSeconds,
  PRODUCTION_PIPELINE,
  VOICE_ROLES,
  MIX_NOTES,
} from '../../data';
import {Card, Chip, Field, SectionHeader, Filters, Accordion} from './ui';

const mmss = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

const SPEAKER_STYLE: Record<string, string> = {
  DẪN: 'text-sky-300',
  'CỐ VẤN': 'text-violet-300',
  ANH: 'text-emerald-300',
  LẶNG: 'text-slate-400',
};

export const Podcast: React.FC = () => {
  const [active, setActive] = useState(PODCAST_EPISODES[0].id);
  const [fmt, setFmt] = useState('all');
  const ep = PODCAST_EPISODES.find((e) => e.id === active)!;
  const format = PODCAST_FORMATS.find((f) => f.id === ep.formatId);
  const shown =
    fmt === 'all'
      ? PODCAST_EPISODES
      : PODCAST_EPISODES.filter((e) => e.formatId === fmt);
  const totalSec = PODCAST_EPISODES.reduce((s, e) => s + estimateSeconds(e), 0);

  return (
    <div>
      <SectionHeader
        eyebrow="Podcast đồng hành"
        title={`${PODCAST_SERIES.name} — ${PODCAST_SERIES.tagline}`}
        lead={PODCAST_SERIES.why}
      />

      <div className="mb-8 grid gap-3 md:grid-cols-3">
        <Card>
          <p className="text-2xl font-bold text-slate-100">
            {PODCAST_EPISODES.length}
          </p>
          <p className="mt-1 text-xs text-slate-400">Tập đã có kịch bản đầy đủ</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold text-slate-100">{mmss(totalSec)}</p>
          <p className="mt-1 text-xs text-slate-400">Tổng thời lượng ước tính</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold text-slate-100">
            {PODCAST_FORMATS.length}
          </p>
          <p className="mt-1 text-xs text-slate-400">Định dạng chương trình</p>
        </Card>
      </div>

      {/* Pipeline */}
      <Card className="mb-10 border-emerald-500/25">
        <Field label={PRODUCTION_PIPELINE.title}>
          <p className="mb-4 text-slate-300">{PRODUCTION_PIPELINE.oneLine}</p>
          <div className="mb-5 space-y-1.5">
            {PRODUCTION_PIPELINE.commands.map((c) => (
              <div
                key={c.cmd}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg bg-slate-950 px-3 py-2">
                <code className="font-mono text-[11px] text-emerald-300">
                  {c.cmd}
                </code>
                <span className="text-[11px] text-slate-400">{c.desc}</span>
              </div>
            ))}
          </div>
          <div className="grid gap-2.5 md:grid-cols-3">
            {PRODUCTION_PIPELINE.backends.map((b) => (
              <div
                key={b.id}
                className="rounded-lg border border-slate-800 bg-slate-800/30 p-3">
                <p className="text-sm font-semibold text-slate-200">{b.name}</p>
                <p className="mt-1 text-[11px] text-amber-300/80">{b.cost}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                  {b.quality}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                  <span className="font-semibold text-slate-400">Dùng khi: </span>
                  {b.useFor}
                </p>
                <code className="mt-2 block font-mono text-[11px] text-sky-400">
                  {b.setup}
                </code>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-xs leading-relaxed text-amber-200/90">
            {PRODUCTION_PIPELINE.humanNote}
          </p>
        </Field>
      </Card>

      {/* Giọng */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Sáu vai giọng
      </h3>
      <div className="mb-6 grid gap-2.5 md:grid-cols-2 lg:grid-cols-3">
        {VOICE_ROLES.map((v) => (
          <Card key={v.role}>
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span
                className={`text-xs font-bold uppercase tracking-wider ${SPEAKER_STYLE[v.role] ?? (v.role.startsWith('ANH') ? 'text-emerald-300' : 'text-slate-300')}`}>
                {v.role}
              </span>
              <Chip tone="slate">{v.lang}</Chip>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">{v.desc}</p>
          </Card>
        ))}
      </div>

      {/* Chuỗi xử lý */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Bốn việc làm cho bản dựng liền mạch và dễ nghe
      </h3>
      <div className="mb-10 grid gap-2.5 md:grid-cols-2">
        {MIX_NOTES.map((m, i) => (
          <Card key={m.name} className="border-l-2 border-l-emerald-500/50">
            <div className="flex gap-3">
              <span className="text-sm font-bold text-emerald-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-100">{m.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {m.what}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Định dạng */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Năm định dạng chương trình
      </h3>
      <div className="mb-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {PODCAST_FORMATS.map((f) => (
          <Card key={f.id}>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h4 className="text-sm font-bold text-slate-100">{f.name}</h4>
              <Chip tone="sky">{f.duration}</Chip>
            </div>
            <p className="text-[11px] text-slate-400">{f.cadence}</p>
            <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
              {f.purpose}
            </p>
            <p className="mt-3 border-t border-slate-800 pt-2.5 font-mono text-[11px] leading-relaxed text-sky-400/80">
              {f.structure}
            </p>
          </Card>
        ))}
      </div>

      {/* Tập */}
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Kịch bản đầy đủ — từng câu, từng khoảng lặng
      </h3>
      <Filters
        options={[
          {id: 'all', label: `Tất cả (${PODCAST_EPISODES.length})`},
          ...PODCAST_FORMATS.filter((f) =>
            PODCAST_EPISODES.some((e) => e.formatId === f.id),
          ).map((f) => ({id: f.id, label: f.name})),
        ]}
        value={fmt}
        onChange={setFmt}
      />

      <div className="mb-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((e) => (
          <button
            key={e.id}
            onClick={() => setActive(e.id)}
            className={`rounded-xl border p-3.5 text-left transition ${
              active === e.id
                ? 'border-sky-500/60 bg-sky-500/10'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
            }`}>
            <p className="text-[11px] font-medium text-slate-400">
              Tập {e.no} · {PODCAST_FORMATS.find((f) => f.id === e.formatId)?.name}
            </p>
            <p className="mt-1 text-sm font-bold leading-snug text-slate-100">
              {e.title}
            </p>
            <p className="mt-2 text-[11px] text-sky-400">
              ≈ {mmss(estimateSeconds(e))} · {e.lines.length} câu
            </p>
          </button>
        ))}
      </div>

      <Card className="mb-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Chip tone="violet">{format?.name}</Chip>
          <Chip tone="sky">≈ {mmss(estimateSeconds(ep))}</Chip>
          <Chip tone="slate">{ep.forLevel}</Chip>
        </div>
        <h3 className="text-lg font-bold text-slate-100">
          Tập {ep.no}. {ep.title}
        </h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
              Điều đọng lại
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">
              {ep.takeaway}
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              Việc phải làm sau khi nghe
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">{ep.task}</p>
          </div>
        </div>
      </Card>

      <Accordion
        title={`Kịch bản đầy đủ — ${ep.lines.length} câu`}
        subtitle="Đây chính là dữ liệu mà công cụ dựng audio đọc vào. Sửa ở đây là bản audio đổi theo."
        defaultOpen>
        <div className="space-y-1">
          {ep.lines.map((l, i) => (
            <div key={i}>
              {l.s === 'LẶNG' ? (
                <div className="my-1 flex items-center gap-3 py-1">
                  <span className="h-px flex-1 bg-slate-800" />
                  <span className="font-mono text-[11px] text-slate-400">
                    khoảng lặng {l.p} giây
                  </span>
                  <span className="h-px flex-1 bg-slate-800" />
                </div>
              ) : (
                <div className="flex gap-3 rounded-lg px-2 py-1.5 hover:bg-slate-800/30">
                  <span
                    className={`w-16 shrink-0 pt-0.5 text-[11px] font-bold uppercase tracking-wider ${SPEAKER_STYLE[l.s] ?? 'text-slate-400'}`}>
                    {l.s}
                  </span>
                  <span
                    className={`min-w-0 flex-1 text-sm leading-relaxed ${
                      l.l === 'en'
                        ? 'font-medium italic text-emerald-200'
                        : 'text-slate-300'
                    }`}>
                    {l.t}
                  </span>
                  <span className="w-10 shrink-0 pt-0.5 text-right font-mono text-[11px] text-slate-400">
                    {l.p ? `${l.p}s` : ''}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Accordion>

      <Card className="mt-6">
        <Field label="Ba vai trong mọi kịch bản">
          <div className="space-y-2">
            {Object.entries(PODCAST_SERIES.voices).map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <span
                  className={`w-16 shrink-0 text-[11px] font-bold uppercase tracking-wider ${SPEAKER_STYLE[k] ?? 'text-slate-400'}`}>
                  {k}
                </span>
                <span className="min-w-0 flex-1 text-xs leading-relaxed text-slate-400">
                  {v}
                </span>
              </div>
            ))}
          </div>
        </Field>
      </Card>
    </div>
  );
};
