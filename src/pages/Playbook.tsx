import { useMemo, useState } from 'react';
import { useApp } from '@/state';
import { TIPS, TIP_CATEGORY, HABITS, METHODS, type TipCategory } from '@/data/playbook';
import { TRAITS } from '@/data/gita';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { todayKey } from '@/lib/storage';
import { Card, SectionTitle, Badge, Progress, MathText } from '@/components/ui';
import type { TrackId } from '@/types';

type Tab = 'bi-kip' | 'thoi-quen' | 'phuong-phap' | 'pham-chat';

export default function Playbook() {
  const { state, update } = useApp();
  const [track, setTrack] = useState<TrackId>(state.profile?.track ?? 'thpt');
  const [tab, setTab] = useState<Tab>('bi-kip');
  const [cat, setCat] = useState<TipCategory | ''>('');

  const tips = useMemo(
    () => TIPS.filter((t) => t.tracks.includes(track)).filter((t) => !cat || t.category === cat),
    [track, cat],
  );
  const habits = HABITS.filter((h) => h.tracks.includes(track));

  const today = todayKey();
  const doneToday = (id: string) => !!state.doneTasks[`habit-${today}-${id}`];
  const toggleHabit = (id: string) =>
    update((s) => ({
      ...s,
      doneTasks: { ...s.doneTasks, [`habit-${today}-${id}`]: !s.doneTasks[`habit-${today}-${id}`] },
    }));
  const dailyHabits = habits.filter((h) => h.cadence === 'hằng ngày');
  const dailyDone = dailyHabits.filter((h) => doneToday(h.id)).length;

  const TABS: { id: Tab; label: string; sub: string }[] = [
    { id: 'bi-kip', label: 'Kho bí kíp', sub: `${TIPS.filter((t) => t.tracks.includes(track)).length} kỹ thuật` },
    { id: 'thoi-quen', label: 'Thói quen luyện', sub: `${habits.length} thói quen` },
    { id: 'phuong-phap', label: 'Phương pháp học', sub: `${METHODS.length} nguyên lý` },
    { id: 'pham-chat', label: 'Phẩm chất rèn được', sub: `${TRAITS.length} phẩm chất` },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Chiều sâu thực chiến"
        title="Bí kíp · Thói quen · Phương pháp"
        desc="Kiến thức quyết định trần điểm, nhưng thói quen và chiến thuật quyết định bạn có chạm được trần đó trong phòng thi hay không."
      />

      <div className="flex flex-wrap gap-2">
        {(['chuyen', 'thpt', 'thpt-qg'] as TrackId[]).map((t) => {
          const st = BRAND_TRACK_STYLE[t];
          return (
            <button
              key={t}
              className="chip"
              style={
                track === t
                  ? { background: st.color, color: '#fff' }
                  : { background: `${st.color}14`, color: st.color }
              }
              onClick={() => setTrack(t)}
            >
              {st.icon} {st.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`card p-4 text-left transition ${
              tab === t.id ? 'ring-2 ring-brand-500' : 'hover:border-slate-300'
            }`}
          >
            <div className="text-[14px] font-extrabold text-slate-900">{t.label}</div>
            <div className="mt-0.5 text-[11.5px] text-slate-500">{t.sub}</div>
          </button>
        ))}
      </div>

      {/* Bí kíp */}
      {tab === 'bi-kip' && (
        <>
          <div className="flex flex-wrap gap-1.5">
            <button
              className={`chip ${!cat ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600'}`}
              onClick={() => setCat('')}
            >
              Tất cả
            </button>
            {Object.entries(TIP_CATEGORY).map(([k, v]) => (
              <button
                key={k}
                className="chip"
                style={
                  cat === k
                    ? { background: v.color, color: '#fff' }
                    : { background: `${v.color}14`, color: v.color }
                }
                onClick={() => setCat(cat === k ? '' : (k as TipCategory))}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {tips.map((t) => {
              const c = TIP_CATEGORY[t.category];
              return (
                <Card key={t.id} className="p-5">
                  <Badge style={{ background: `${c.color}14`, color: c.color }}>{c.label}</Badge>
                  <h3 className="mt-2 text-[15px] font-extrabold leading-snug text-slate-900">
                    {t.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-700">
                    <MathText>{t.body}</MathText>
                  </p>
                  {t.example && (
                    <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 font-serif text-[13px] text-slate-700">
                      <MathText>{t.example}</MathText>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </>
      )}

      {/* Thói quen */}
      {tab === 'thoi-quen' && (
        <>
          <Card className="p-5">
            <h3 className="text-[15px] font-extrabold text-slate-900">Thói quen hôm nay</h3>
            <p className="mt-1 text-[12.5px] text-slate-500">
              Đánh dấu khi hoàn thành. Đây là bảng theo dõi cho riêng hôm nay — mục đích là giữ chuỗi
              ngày liên tục, không phải để chấm điểm.
            </p>
            <div className="mt-3">
              <Progress
                value={(dailyDone / Math.max(1, dailyHabits.length)) * 100}
                label={`${dailyDone}/${dailyHabits.length} thói quen hằng ngày`}
                tone="#0f766e"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {dailyHabits.map((h) => (
                <button
                  key={h.id}
                  onClick={() => toggleHabit(h.id)}
                  className={`chip ${
                    doneToday(h.id) ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {doneToday(h.id) ? '✓ ' : ''}
                  {h.name} · {h.minutes}′
                </button>
              ))}
            </div>
          </Card>

          <div className="space-y-3">
            {habits.map((h) => (
              <Card key={h.id} className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-[15px] font-extrabold text-slate-900">{h.name}</h3>
                  <Badge tone="brand">{h.cadence}</Badge>
                  <Badge>{h.minutes} phút</Badge>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-700">
                  <b className="text-slate-900">Vì sao:</b> {h.why}
                </p>
                <ol className="mt-3 space-y-1.5 border-l-2 border-brand-200 pl-4">
                  {h.how.map((s, i) => (
                    <li key={i} className="text-[13px] leading-relaxed text-slate-700">
                      {s}
                    </li>
                  ))}
                </ol>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Phương pháp */}
      {tab === 'phuong-phap' && (
        <div className="space-y-3">
          {METHODS.map((m) => (
            <Card key={m.id} className="p-5">
              <h3 className="text-[15.5px] font-extrabold text-slate-900">{m.name}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-700">{m.principle}</p>
              <div className="mt-3 rounded-xl bg-slate-50 p-3">
                <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                  Áp dụng trong MATH365
                </div>
                <ul className="mt-1.5 space-y-1">
                  {m.apply.map((a) => (
                    <li key={a} className="text-[12.5px] leading-relaxed text-slate-700">
                      ▸ {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Phẩm chất */}
      {tab === 'pham-chat' && (
        <>
          <Card className="p-5">
            <p className="text-[13.5px] leading-relaxed text-slate-700">
              Kỳ thi rồi sẽ qua. Thứ ở lại là những phẩm chất được rèn trong quá trình ôn luyện — và
              đó mới là phần giá trị nhất của cả hành trình. Mỗi phẩm chất dưới đây gắn với một cơ chế
              cụ thể trong hệ thống, không phải khẩu hiệu.
            </p>
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {TRAITS.map((t) => (
              <Card key={t.name} className="p-5">
                <h3 className="text-[15px] font-extrabold text-slate-900">{t.name}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
                  <b className="text-slate-800">Được rèn bởi:</b> {t.builtBy}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                  <b className="text-slate-800">Bằng chứng:</b> {t.evidence}
                </p>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
