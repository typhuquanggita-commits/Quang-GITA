import { useMemo, useState } from 'react';
import { go, useApp } from '@/state';
import {
  FORMULA_GROUPS,
  formulaStats,
  searchFormulas,
  normalize,
  type FormulaGroup,
  type FormulaItem,
} from '@/data/formulas';
import { STRANDS, strandById } from '@/data/schools';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { topicById } from '@/data/topics';
import { Card, SectionTitle, Badge, Callout, MathText } from '@/components/ui';
import { Faq } from '@/components/Faq';
import { Feedback } from '@/components/Feedback';
import { faqFor } from '@/data/faq';
import { href } from '@/lib/routes';
import type { TrackId } from '@/types';

const GRADE_LABEL: Record<string, string> = {
  thcs: 'THCS · vào 10 & chuyên',
  '10': 'Lớp 10',
  '11': 'Lớp 11',
  '12': 'Lớp 12',
};

export default function Formulas() {
  const { state } = useApp();
  const track: TrackId = state.profile?.track ?? 'thpt';
  const [scope, setScope] = useState<TrackId | 'all'>(track);
  const [q, setQ] = useState('');
  const [onlyStar, setOnlyStar] = useState(false);
  const [strand, setStrand] = useState<string>('all');
  const stats = formulaStats();
  const style = BRAND_TRACK_STYLE[track];

  const groups = useMemo(() => {
    let list: FormulaGroup[] = FORMULA_GROUPS;
    if (scope !== 'all') list = list.filter((g) => g.tracks.includes(scope));
    if (strand !== 'all') list = list.filter((g) => g.strand === strand);
    const needle = normalize(q.trim());
    if (!needle) {
      return onlyStar
        ? list.map((g) => ({ ...g, items: g.items.filter((i) => i.star) })).filter((g) => g.items.length)
        : list;
    }
    return list
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (i) =>
            (!onlyStar || i.star) &&
            normalize(`${i.name} ${i.expr} ${i.use} ${i.trap ?? ''} ${g.name}`).includes(needle),
        ),
      }))
      .filter((g) => g.items.length);
  }, [scope, q, onlyStar, strand]);

  const shown = groups.reduce((s, g) => s + g.items.length, 0);
  const hits = q.trim() ? searchFormulas(q).length : 0;
  const strandsAvailable = [...new Set(FORMULA_GROUPS.filter((g) => scope === 'all' || g.tracks.includes(scope)).map((g) => g.strand))];

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Tra cứu nhanh"
        title="Sổ tay công thức MATH365"
        desc="Mỗi công thức trả lời ba câu: viết thế nào, dùng khi nào, và sai ở đâu. Mục có dấu ★ là công thức bắt buộc thuộc lòng — viết được ra giấy trong 5 giây, không cần nghĩ."
        right={
          <button className="btn btn-ghost text-sm no-print" onClick={() => window.print()}>
            In sổ tay
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: 'Công thức', v: String(stats.items), s: `trong ${stats.groups} nhóm` },
          { k: 'Bắt buộc thuộc', v: String(stats.starred), s: 'đánh dấu ★' },
          { k: 'Có cảnh báo bẫy', v: String(stats.withTrap), s: 'lỗi điển hình đi kèm' },
          { k: 'Đang hiển thị', v: String(shown), s: q.trim() ? `khớp “${q.trim()}”` : 'theo bộ lọc hiện tại' },
        ].map((c) => (
          <Card key={c.k} className="p-4">
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{c.k}</div>
            <div className="mt-0.5 text-2xl font-extrabold tabular-nums" style={{ color: style.color }}>
              {c.v}
            </div>
            <div className="text-[12px] text-slate-500">{c.s}</div>
          </Card>
        ))}
      </div>

      <Card className="p-4 no-print">
        <input
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-[14px] outline-none focus:border-brand-400"
          placeholder="Tìm công thức — gõ có dấu hoặc không dấu: “viete”, “tiep tuyen”, “tich phan”, “dinh li cosin”…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {(['all', 'thpt', 'chuyen', 'thpt-qg'] as const).map((t) => {
            const st = t === 'all' ? null : BRAND_TRACK_STYLE[t];
            const on = scope === t;
            return (
              <button
                key={t}
                className="chip"
                style={on ? { background: st?.color ?? '#0F172A', color: '#fff' } : { background: '#eef1f6', color: '#334155' }}
                onClick={() => {
                  setScope(t);
                  setStrand('all');
                }}
              >
                {st ? `${st.icon} ${st.label.split('·')[1]?.trim() ?? st.label}` : 'Tất cả luồng'}
              </button>
            );
          })}
          <span className="mx-1 h-5 w-px bg-slate-200" />
          <button
            className="chip"
            style={onlyStar ? { background: '#F0A21B', color: '#fff' } : { background: '#eef1f6', color: '#334155' }}
            onClick={() => setOnlyStar((v) => !v)}
          >
            ★ Chỉ công thức phải thuộc
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <button
            className="chip"
            style={strand === 'all' ? { background: '#334155', color: '#fff' } : { background: '#f1f5f9', color: '#475569' }}
            onClick={() => setStrand('all')}
          >
            Mọi mạch
          </button>
          {STRANDS.filter((s) => strandsAvailable.includes(s.id)).map((s) => (
            <button
              key={s.id}
              className="chip"
              style={strand === s.id ? { background: s.color, color: '#fff' } : { background: '#f1f5f9', color: '#475569' }}
              onClick={() => setStrand(s.id)}
            >
              {s.short}
            </button>
          ))}
        </div>
        {q.trim() && (
          <div className="mt-2 text-[12.5px] text-slate-500">
            {hits} công thức khớp trong toàn bộ sổ tay · {shown} công thức hiện trong bộ lọc đang chọn.
          </div>
        )}
      </Card>

      <Callout tone="brand" title="Cách dùng sổ tay này cho đúng">
        Đừng đọc từ đầu tới cuối. Hãy dùng nó theo hai cách: (1) trước mỗi buổi luyện, mở đúng nhóm
        của chuyên đề hôm nay và đọc lại phần “dùng khi nào”; (2) sau mỗi phiếu làm sai, tra đúng
        công thức đã sai và đọc kỹ dòng cảnh báo bẫy. Ba ngày trước kỳ thi, chỉ đọc các mục ★.
      </Callout>

      {groups.length === 0 ? (
        <Card className="p-10 text-center">
          <div className="text-sm font-bold text-slate-900">Không tìm thấy công thức nào trong bộ lọc hiện tại</div>
          {hits > 0 ? (
            <>
              <div className="mt-1 text-[13px] text-slate-600">
                Nhưng có <b>{hits}</b> công thức khớp ở luồng khác — thường là công thức của khối THPT 10–12.
              </div>
              <button
                className="btn btn-primary mt-4 text-sm"
                onClick={() => {
                  setScope('all');
                  setStrand('all');
                }}
              >
                Tìm trong toàn bộ sổ tay
              </button>
            </>
          ) : (
            <div className="mt-1 text-[13px] text-slate-600">
              Thử từ khoá ngắn hơn, hoặc bỏ bớt bộ lọc mạch kiến thức và luồng.
            </div>
          )}
        </Card>
      ) : (
        groups.map((g) => <GroupCard key={g.id} group={g} />)
      )}

      <Faq items={faqFor('cong-thuc')} />
      <Feedback path={href('cong-thuc')} label="Sổ tay công thức Toán" />
    </div>
  );
}

function GroupCard({ group }: { group: FormulaGroup }) {
  const s = strandById(group.strand);
  const [open, setOpen] = useState(true);
  return (
    <Card className="overflow-hidden">
      <button
        className="flex w-full flex-wrap items-start justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-3.5 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[15px] font-extrabold text-slate-900">{group.name}</span>
            <Badge tone="slate" style={{ background: `${s?.color ?? '#64748b'}18`, color: s?.color }}>
              {s?.short ?? group.strand}
            </Badge>
            <Badge tone="slate">{GRADE_LABEL[String(group.grade)]}</Badge>
            <Badge tone="brand">{group.items.length} công thức</Badge>
          </div>
          <div className="mt-1 max-w-3xl text-[12.5px] leading-relaxed text-slate-600">{group.intro}</div>
        </div>
        <span className="shrink-0 text-[12px] font-semibold text-slate-400 no-print">
          {open ? 'Thu gọn' : 'Mở'}
        </span>
      </button>

      {open && (
        <>
          <div className="divide-y divide-slate-100">
            {group.items.map((it) => (
              <FormulaRow key={it.name + it.expr} item={it} />
            ))}
          </div>
          {group.topicIds.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-2.5 no-print">
              <span className="text-[11.5px] font-semibold text-slate-500">Bộ phiếu liên quan:</span>
              {group.topicIds.map((tid) => {
                const t = topicById(tid);
                if (!t) return null;
                return (
                  <button
                    key={tid}
                    className="chip bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                    onClick={() => go(`/topics/${tid}`)}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </Card>
  );
}

function FormulaRow({ item }: { item: FormulaItem }) {
  return (
    <div className="grid gap-3 px-5 py-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5">
          {item.star && <span className="text-[13px] text-accent-500">★</span>}
          <span className="text-[13.5px] font-bold text-slate-900">{item.name}</span>
        </div>
        <div className="mt-1.5 rounded-lg bg-slate-900 px-3 py-2 font-serif text-[13.5px] leading-relaxed text-brand-100">
          <MathText>{item.expr}</MathText>
        </div>
        {item.condition && (
          <div className="mt-1.5 text-[12px] font-semibold text-brand-700">
            Điều kiện: <MathText>{item.condition}</MathText>
          </div>
        )}
      </div>
      <div className="min-w-0 space-y-1.5">
        <div className="text-[12.5px] leading-relaxed text-slate-600">
          <span className="font-bold text-slate-500">Dùng khi: </span>
          <MathText>{item.use}</MathText>
        </div>
        {item.trap && (
          <div className="rounded-lg bg-rose-50 px-2.5 py-1.5 text-[12.5px] leading-relaxed text-rose-800">
            <span className="font-bold">Bẫy: </span>
            <MathText>{item.trap}</MathText>
          </div>
        )}
      </div>
    </div>
  );
}
