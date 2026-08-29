import { useEffect, useMemo, useState } from 'react';
import { go, useApp } from '@/state';
import { searchAll, indexStats, KIND_META, type SearchKind } from '@/lib/search';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { Card, SectionTitle, Badge, Callout } from '@/components/ui';
import type { TrackId } from '@/types';

const SUGGESTIONS = [
  'Viète',
  'tiếp tuyến',
  'trục đẳng phương',
  'Dirichlet',
  'tích phân từng phần',
  'đọc vị đề',
  'xác suất có điều kiện',
  'thống kê ghép nhóm',
  'lãi kép',
  'bất đẳng thức',
];

export default function Search({ initial }: { initial?: string }) {
  const { state } = useApp();
  const track: TrackId = state.profile?.track ?? 'thpt';
  const [q, setQ] = useState(initial ? decodeURIComponent(initial) : '');
  const [scope, setScope] = useState<TrackId | 'all'>('all');
  const [kind, setKind] = useState<SearchKind | 'all'>('all');
  const st = indexStats();

  useEffect(() => {
    if (initial) setQ(decodeURIComponent(initial));
  }, [initial]);

  const res = useMemo(
    () =>
      searchAll(q, {
        track: scope === 'all' ? undefined : scope,
        kind: kind === 'all' ? undefined : kind,
        limit: 80,
      }),
    [q, scope, kind],
  );

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Tìm kiếm"
        title="Tìm trong toàn hệ thống"
        desc={`Một ô tìm kiếm cho tất cả: ${st.total.toLocaleString('vi-VN')} mục gồm chuyên đề, nhiệm vụ, công thức, đề mẫu, bài mẫu, bí kíp, thói quen, kỳ thi, thư mục tài liệu, mô thức GITA và tài liệu học viện. Gõ có dấu hay không dấu đều được.`}
      />

      <Card className="p-4">
        <input
          autoFocus
          className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-[15px] outline-none focus:border-brand-400"
          placeholder="Gõ từ khoá — ví dụ: viete, tiep tuyen, truc dang phuong, tich phan, doc vi de…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setKind('all');
          }}
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {(['all', 'thpt', 'chuyen', 'thpt-qg'] as const).map((t) => {
            const s = t === 'all' ? null : BRAND_TRACK_STYLE[t];
            const on = scope === t;
            return (
              <button
                key={t}
                className="chip"
                style={on ? { background: s?.color ?? '#0F172A', color: '#fff' } : { background: '#eef1f6', color: '#334155' }}
                onClick={() => setScope(t)}
              >
                {s ? `${s.icon} ${s.label.split('·')[1]?.trim() ?? s.label}` : 'Mọi luồng'}
              </button>
            );
          })}
          {scope === 'all' && (
            <button className="chip bg-brand-50 text-brand-800" onClick={() => setScope(track)}>
              Chỉ luồng của tôi
            </button>
          )}
        </div>
        {!q.trim() && (
          <div className="mt-3">
            <div className="text-[12px] font-semibold text-slate-500">Thử tìm:</div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="chip bg-slate-100 text-slate-700 hover:bg-slate-200"
                  onClick={() => setQ(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {q.trim().length >= 2 && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <button
              className="chip"
              style={kind === 'all' ? { background: '#0F172A', color: '#fff' } : { background: '#eef1f6', color: '#334155' }}
              onClick={() => setKind('all')}
            >
              Tất cả · {res.total}
            </button>
            {res.byKind.map(({ kind: k, count }) => {
              const meta = KIND_META[k];
              const on = kind === k;
              return (
                <button
                  key={k}
                  className="chip"
                  style={on ? { background: meta.color, color: '#fff' } : { background: `${meta.color}14`, color: meta.color }}
                  onClick={() => setKind(k)}
                >
                  {meta.label} · {count}
                </button>
              );
            })}
          </div>

          {res.total === 0 ? (
            <Card className="p-10 text-center">
              <div className="text-sm font-bold text-slate-900">Không tìm thấy kết quả nào</div>
              <div className="mt-1 text-[13px] text-slate-600">
                Hệ thống yêu cầu khớp mọi từ khoá. Thử rút ngắn cụm tìm kiếm, hoặc bỏ bộ lọc luồng.
              </div>
            </Card>
          ) : (
            <>
              <div className="text-[12.5px] text-slate-500">
                Hiển thị {res.hits.length} trong {res.total} kết quả, xếp theo mức liên quan.
              </div>
              <div className="space-y-2">
                {res.hits.map((h) => {
                  const meta = KIND_META[h.kind];
                  return (
                    <button
                      key={h.id}
                      className="card flex w-full flex-wrap items-start gap-3 p-4 text-left transition hover:border-brand-300"
                      onClick={() => go(h.route)}
                    >
                      <span
                        className="mt-0.5 shrink-0 rounded-lg px-2 py-1 text-[10.5px] font-bold"
                        style={{ background: `${meta.color}18`, color: meta.color }}
                      >
                        {meta.label}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-bold leading-snug text-slate-900">{h.title}</div>
                        <div className="mt-0.5 text-[12px] font-semibold text-slate-500">{h.subtitle}</div>
                        <div className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-slate-600">
                          {h.body.slice(0, 220)}
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-[11px] font-semibold text-slate-400">{meta.page}</div>
                        {h.tracks && h.tracks.length === 1 && (
                          <Badge tone="slate" style={{ color: BRAND_TRACK_STYLE[h.tracks[0]].color }}>
                            {BRAND_TRACK_STYLE[h.tracks[0]].icon}
                          </Badge>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}

      {!q.trim() && (
        <>
          <Callout tone="brand" title="Cách tìm cho ra kết quả tốt nhất">
            Gõ từ khoá của khái niệm, không gõ cả câu hỏi. Hệ thống yêu cầu khớp mọi từ khoá, nên
            càng nhiều từ thì kết quả càng hẹp. Không cần gõ dấu tiếng Việt.
          </Callout>
          <Card className="p-6">
            <div className="text-sm font-bold text-slate-900">Chỉ số tìm kiếm gồm những gì</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {st.byKind.map(([k, c]) => {
                const meta = KIND_META[k];
                return (
                  <div key={k} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-1 rounded-full" style={{ background: meta.color }} />
                      <span className="text-[13px] font-semibold text-slate-700">{meta.label}</span>
                    </span>
                    <span className="tabular-nums text-[13px] font-bold text-slate-900">
                      {c.toLocaleString('vi-VN')}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
