/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import {
  NORTH_STAR,
  LAWS,
  PILLARS,
  TRAJECTORY,
  TIME_BUDGET,
  METHODS,
  MILESTONES,
  DRILLS,
  RESOURCES,
  PLAYBOOKS,
  HABITS,
  MINDSET_MODULES,
  CLUBS,
  TOTAL_LESSONS,
  LECTURE_SERIES,
} from '../../data';
import {Card, Chip, SectionHeader, Stat, Field, Bullets} from './ui';

const Trajectory: React.FC = () => {
  const W = 760;
  const H = 220;
  const pad = {l: 38, r: 16, t: 16, b: 28};
  const maxBand = 9;
  const x = (m: number) => pad.l + (m / 36) * (W - pad.l - pad.r);
  const y = (b: number) => H - pad.b - (b / maxBand) * (H - pad.t - pad.b);
  const line = TRAJECTORY.map((p) => `${x(p.month)},${y(p.band)}`).join(' ');
  const area = `${x(0)},${y(0)} ${line} ${x(36)},${y(0)}`;

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[640px] w-full">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="35%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 2, 4, 6, 8].map((b) => (
          <g key={b}>
            <line
              x1={pad.l}
              y1={y(b)}
              x2={W - pad.r}
              y2={y(b)}
              stroke="#1e293b"
              strokeWidth="1"
            />
            <text x={8} y={y(b) + 4} fill="#475569" fontSize="10">
              {b.toFixed(1)}
            </text>
          </g>
        ))}
        {[12, 24, 36].map((m) => (
          <g key={m}>
            <line
              x1={x(m)}
              y1={pad.t}
              x2={x(m)}
              y2={H - pad.b}
              stroke="#1e293b"
              strokeDasharray="3 4"
            />
            <text
              x={x(m)}
              y={H - 8}
              fill="#64748b"
              fontSize="10"
              textAnchor="middle">
              Tháng {m}
            </text>
          </g>
        ))}
        <polygon points={area} fill="url(#fill)" />
        <polyline
          points={line}
          fill="none"
          stroke="url(#grad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {TRAJECTORY.map((p) => (
          <g key={p.q}>
            <circle cx={x(p.month)} cy={y(p.band)} r="3.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.8" />
            {p.month % 6 === 0 && p.month > 0 && (
              <text
                x={x(p.month)}
                y={y(p.band) - 10}
                fill="#94a3b8"
                fontSize="10"
                textAnchor="middle">
                {p.band.toFixed(1)}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export const Overview: React.FC = () => (
  <div>
    <SectionHeader
      eyebrow="Hiến chương hệ thống"
      title={`${NORTH_STAR.name} — ${NORTH_STAR.promise}`}
      lead={NORTH_STAR.meaning}
    />

    <Card className="mb-8 border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-transparent">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-400">
        Đặt cược lớn
      </p>
      <p className="mt-2 text-lg font-semibold leading-snug text-slate-100 md:text-xl">
        {NORTH_STAR.bigBet}
      </p>
      <p className="mt-3 font-mono text-sm text-sky-300">{NORTH_STAR.equation}</p>
    </Card>

    <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
      <Stat value="1.095" label="Ngày" sub="36 tháng · 156 tuần" />
      <Stat value="8.0" label="IELTS mục tiêu" sub="CEFR C1+" />
      <Stat value="1.800h" label="Input dễ hiểu" sub="~1,6 giờ/ngày" />
      <Stat value="10.000" label="Từ vựng chủ động" sub="Học theo cụm" />
      <Stat value="300h" label="Giờ nói" sub="Có phản hồi sửa lỗi" />
      <Stat value="150.000" label="Từ đã viết" sub="~137 từ/ngày" />
      <Stat value={String(TOTAL_LESSONS)} label="Bài giảng" sub={`${LECTURE_SERIES.length} chuỗi`} />
      <Stat value={String(METHODS.length)} label="Phương pháp" sub="Đã kiểm chứng" />
    </div>

    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      Quỹ đạo 36 tháng
    </h3>
    <Card className="mb-4">
      <Trajectory />
    </Card>
    <div className="mb-10 overflow-x-auto">
      <table className="w-full min-w-[680px] text-left text-xs">
        <thead className="text-slate-500">
          <tr className="border-b border-slate-800">
            <th className="py-2 pr-3 font-medium">Mốc</th>
            <th className="py-2 pr-3 font-medium">Tháng</th>
            <th className="py-2 pr-3 font-medium">CEFR</th>
            <th className="py-2 pr-3 font-medium">Band</th>
            <th className="py-2 pr-3 font-medium">Từ vựng</th>
            <th className="py-2 font-medium">Giờ input</th>
          </tr>
        </thead>
        <tbody className="text-slate-300">
          {TRAJECTORY.map((t) => (
            <tr key={t.q} className="border-b border-slate-900">
              <td className="py-1.5 pr-3 font-medium text-slate-200">{t.q}</td>
              <td className="py-1.5 pr-3 text-slate-500">{t.month}</td>
              <td className="py-1.5 pr-3">{t.cefr}</td>
              <td className="py-1.5 pr-3 font-semibold text-sky-300">
                {t.band.toFixed(1)}
              </td>
              <td className="py-1.5 pr-3">{t.vocab.toLocaleString('vi-VN')}</td>
              <td className="py-1.5">{t.inputHours.toLocaleString('vi-VN')}h</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      5 luật bất biến
    </h3>
    <div className="mb-10 space-y-3">
      {LAWS.map((l) => (
        <Card key={l.no} className="border-l-2 border-l-rose-500/50">
          <div className="flex items-baseline gap-3">
            <span className="text-sm font-bold text-rose-400">
              {String(l.no).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-slate-100">{l.name}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                {l.statement}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-rose-300/70">
                <span className="font-semibold">Vi phạm: </span>
                {l.violation}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>

    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      7 trụ cột
    </h3>
    <div className="mb-10 grid gap-3 md:grid-cols-2">
      {PILLARS.map((p) => (
        <Card key={p.id}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="font-semibold text-slate-100">
              <span className="mr-2">{p.icon}</span>
              {p.name}
            </p>
            <Chip tone="sky">{p.dailyShare}</Chip>
          </div>
          <p className="mb-3 text-sm italic text-sky-300/80">“{p.motto}”</p>
          <p className="text-sm leading-relaxed text-slate-400">{p.why}</p>
          <p className="mt-3 border-t border-slate-800 pt-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-400">Luật: </span>
            {p.law}
          </p>
        </Card>
      ))}
    </div>

    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      Ngân sách thời gian mỗi ngày
    </h3>
    <div className="mb-10 grid gap-3 md:grid-cols-3">
      {TIME_BUDGET.map((b) => {
        const total = b.split.reduce((s, x) => s + x.minutes, 0);
        return (
          <Card key={b.year}>
            <p className="font-semibold text-slate-100">{b.label}</p>
            <p className="mt-1 text-sm text-sky-300">{b.daily}</p>
            <div className="mt-4 space-y-2">
              {b.split.map((s) => (
                <div key={s.pillar}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-400">{s.pillar}</span>
                    <span className="font-medium text-slate-300">
                      {s.minutes}'
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-sky-500"
                      style={{width: `${(s.minutes / total) * 100}%`}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>

    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
      Hệ thống gồm những gì
    </h3>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <Stat value={String(MILESTONES.length)} label="Cột mốc" sub="Mỗi mốc 13 tuần" />
      <Stat value={String(DRILLS.length)} label="Bài luyện" sub="Có bước cụ thể" />
      <Stat value={String(PLAYBOOKS.length)} label="Bí kíp" sub="Áp dụng trong ngày" />
      <Stat value={String(RESOURCES.length)} label="Tài liệu" sub="Đã sàng lọc" />
      <Stat value={String(HABITS.length)} label="Thói quen" sub="Cài theo thứ tự" />
      <Stat value={String(MINDSET_MODULES.length)} label="Mô-đun tư duy" sub="Lập trình lại niềm tin" />
      <Stat value={String(CLUBS.length)} label="Câu lạc bộ" sub="Mở dần theo trình độ" />
      <Stat value="12" label="Cổng kiểm định" sub="Không đạt thì lặp lại" />
    </div>
  </div>
);
