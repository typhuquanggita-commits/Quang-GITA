import { useState } from 'react';
import { go, useApp } from '@/state';
import { buildWeeklyReport, vnDate } from '@/lib/report';
import { dayKey } from '@/lib/review';
import { BRAND, BRAND_TRACK_STYLE } from '@/data/brand';
import { GitaLogo } from '@/components/Logo';
import { Card, SectionTitle, Badge, Callout } from '@/components/ui';
import type { TrackId } from '@/types';

export default function Report() {
  const { state } = useApp();
  const track: TrackId = state.profile?.track ?? 'thpt';
  const today = dayKey(new Date());
  const [offset, setOffset] = useState(0);
  const r = buildWeeklyReport(state, track, today, offset);
  const style = BRAND_TRACK_STYLE[track];

  const D = ({ v, unit }: { v: number; unit: string }) => (
    <span
      className={`text-[12px] font-bold ${v > 0 ? 'text-emerald-600' : v < 0 ? 'text-rose-600' : 'text-slate-400'}`}
    >
      {v > 0 ? '▲' : v < 0 ? '▼' : '—'} {Math.abs(v)} {unit}
    </span>
  );

  return (
    <div className="space-y-6">
      <div className="no-print">
        <SectionTitle
          eyebrow="Dành cho gia đình"
          title="Báo cáo tuần"
          desc="Một trang A4 in ra được, viết cho người không dạy Toán đọc: tuần qua con đã làm gì, đang vững ở đâu, cần chú ý chỗ nào, và gia đình làm gì được ngay mà không cần biết Toán."
          right={
            <div className="flex gap-2">
              <button className="btn btn-ghost text-sm" onClick={() => setOffset((o) => o - 1)}>
                ← Tuần trước
              </button>
              <button
                className="btn btn-ghost text-sm"
                onClick={() => setOffset((o) => Math.min(0, o + 1))}
                disabled={offset >= 0}
              >
                Tuần sau →
              </button>
              <button className="btn btn-primary text-sm" onClick={() => window.print()}>
                In báo cáo
              </button>
            </div>
          }
        />
        <Callout tone="brand" title="Ba nguyên tắc khi đọc báo cáo này">
          Một là nhìn xu hướng nhiều tuần chứ đừng phán xét một tuần. Hai là hỏi về quá trình
          (con học đều không, con thấy chỗ nào khó) trước khi hỏi về con số. Ba là tuyệt đối không
          dùng báo cáo để so sánh con với bạn khác — mỗi lộ trình xuất phát từ một điểm khác nhau.
        </Callout>
      </div>

      {/* ---------- Trang báo cáo ---------- */}
      <Card className="overflow-hidden">
        {/* Đầu trang theo quy chuẩn nhận diện tài liệu */}
        <div
          className="flex flex-wrap items-start justify-between gap-4 border-b-2 px-6 py-4"
          style={{ borderColor: style.color }}
        >
          <div className="flex items-center gap-3">
            <GitaLogo size={34} variant="mark" />
            <div className="leading-tight">
              <div className="text-[15px] font-extrabold tracking-tight text-brand-800">
                {BRAND.product}
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {BRAND.org}
              </div>
            </div>
          </div>
          <div className="min-w-0 flex-1 text-center">
            <div className="text-[18px] font-extrabold leading-tight text-slate-900">
              Báo cáo tuần gửi gia đình
            </div>
            <div className="mt-0.5 text-[12.5px] text-slate-600">
              {vnDate(r.week.from)} – {vnDate(r.week.to)}
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: style.color }}>
              M365-BC-{r.week.from.replace(/-/g, '')}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">
              Lập ngày {vnDate(r.generatedAt)}
            </div>
          </div>
        </div>

        {/* Khối định vị */}
        <div className="grid grid-cols-2 gap-px bg-slate-100 text-center lg:grid-cols-4">
          {[
            { k: 'Học viên', v: r.studentName },
            { k: 'Chương trình', v: r.trackLabel.split('·')[0].trim() },
            { k: 'Mức độ · Giai đoạn', v: `${r.level}/5 · ${r.stage}/5` },
            { k: 'Còn tới kỳ thi', v: r.countdownDays !== null ? `${r.countdownDays} ngày` : 'chưa đặt' },
          ].map((c) => (
            <div key={c.k} className="bg-white px-3 py-2.5">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{c.k}</div>
              <div className="text-[13.5px] font-extrabold text-slate-900">{c.v}</div>
            </div>
          ))}
        </div>

        <div className="px-6 py-3" style={{ background: `${style.color}0D` }}>
          <div className="text-[12.5px] font-semibold" style={{ color: style.color }}>
            ◎ Đích đến của chương trình: {r.goal}
          </div>
        </div>

        <div className="space-y-6 px-6 py-5">
          {/* 1. Tuần này bằng số */}
          <section>
            <SectionHeading n="1" title="Tuần này bằng số" color={style.color} />
            <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { k: 'Phiếu đã làm', v: r.week.sheets, d: r.delta.sheets, u: 'phiếu' },
                { k: 'Phút học', v: r.week.minutes, d: r.delta.minutes, u: 'phút' },
                { k: 'Tỉ lệ làm đúng', v: `${r.week.avgKpi}%`, d: r.delta.avgKpi, u: 'điểm %' },
                { k: 'Ngày có học', v: `${r.week.activeDays}/7`, d: r.delta.activeDays, u: 'ngày' },
              ].map((c) => (
                <div key={c.k} className="rounded-xl border border-slate-200 p-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{c.k}</div>
                  <div className="mt-0.5 text-2xl font-extrabold tabular-nums text-slate-900">{c.v}</div>
                  <div className="mt-0.5">
                    <D v={c.d} unit={c.u} />
                    <span className="ml-1 text-[11px] text-slate-400">so với tuần trước</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {[
                { k: 'Chuỗi ngày học liên tiếp', v: `${r.streakCurrent} ngày`, s: `kỷ lục ${r.streakBest} ngày` },
                { k: 'Phiếu đạt chuẩn 90%', v: `${r.week.passed}`, s: 'trong tuần này' },
                {
                  k: 'Việc ôn lại quá hạn',
                  v: `${r.overdueReviews}`,
                  s: r.overdueReviews ? 'cần trả nợ sớm' : 'không còn nợ ôn tập',
                },
              ].map((c) => (
                <div key={c.k} className="rounded-lg bg-slate-50 px-3 py-2">
                  <div className="text-[11px] font-semibold text-slate-500">{c.k}</div>
                  <div className="text-[15px] font-extrabold text-slate-900">{c.v}</div>
                  <div className="text-[11px] text-slate-500">{c.s}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Nhận xét */}
          <section>
            <SectionHeading n="2" title="Nhận xét của hệ thống" color={style.color} />
            <ul className="mt-2.5 space-y-2">
              {r.summary.map((line, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: style.color }} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 3. Mạnh - yếu */}
          <section className="grid gap-4 lg:grid-cols-2">
            <div>
              <SectionHeading n="3" title="Đang vững" color="#0F766E" />
              {r.strengths.length ? (
                <div className="mt-2.5 space-y-2">
                  {r.strengths.map((s) => (
                    <div key={s.topicId} className="rounded-lg border border-emerald-200 bg-emerald-50/60 px-3 py-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[13px] font-bold text-slate-800">{s.topicName}</span>
                        <span className="text-[13px] font-extrabold tabular-nums text-emerald-700">
                          {s.avgKpi}%
                        </span>
                      </div>
                      <div className="text-[11.5px] text-slate-500">
                        {s.strandName} · {s.count} phiếu trong tuần
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-2.5 rounded-lg bg-slate-50 px-3 py-3 text-[12.5px] text-slate-500">
                  Tuần này chưa có chuyên đề nào đạt từ 80% trở lên. Điều này bình thường khi con vừa
                  bước sang mức khó hơn.
                </div>
              )}
            </div>
            <div>
              <SectionHeading n="4" title="Cần chú ý" color="#E01B24" />
              {r.watchlist.length ? (
                <div className="mt-2.5 space-y-2">
                  {r.watchlist.map((s) => (
                    <div key={s.topicId} className="rounded-lg border border-rose-200 bg-rose-50/60 px-3 py-2">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[13px] font-bold text-slate-800">{s.topicName}</span>
                        <span className="text-[13px] font-extrabold tabular-nums text-rose-700">
                          {s.avgKpi}%
                        </span>
                      </div>
                      <div className="text-[11.5px] text-slate-500">
                        {s.strandName} · {s.count} phiếu trong tuần
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-2.5 rounded-lg bg-slate-50 px-3 py-3 text-[12.5px] text-slate-500">
                  Không có chuyên đề nào dưới ngưỡng chú ý trong tuần này.
                </div>
              )}
              {r.unresolvedMistakes > 0 && (
                <div className="mt-2 text-[12px] text-slate-600">
                  Ngân hàng lỗi đang có <b>{r.unresolvedMistakes}</b> câu chưa được xem lại. Hệ thống
                  đã tự xếp việc sửa vào lộ trình, gia đình không cần dạy lại phần này.
                </div>
              )}
            </div>
          </section>

          {/* 5. Tuần tới */}
          <section>
            <SectionHeading n="5" title="Hệ thống sẽ tập trung vào đâu trong tuần tới" color={style.color} />
            {r.nextWeek.length ? (
              <ol className="mt-2.5 space-y-2">
                {r.nextWeek.map((t, i) => (
                  <li key={t.title} className="flex gap-3 rounded-lg border border-slate-200 px-3 py-2.5">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[12px] font-bold text-white"
                      style={{ background: style.color }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-[13px] font-bold text-slate-900">
                        {t.title}
                        <span className="ml-2 text-[11.5px] font-semibold text-slate-400">
                          ~{t.minutes} phút
                        </span>
                      </div>
                      <div className="text-[12px] leading-relaxed text-slate-600">{t.why}</div>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="mt-2.5 text-[12.5px] text-slate-500">
                Chưa đủ dữ liệu để xếp thứ tự ưu tiên. Con cần làm thêm vài phiếu để hệ thống hiểu
                được điểm mạnh và điểm yếu.
              </div>
            )}
          </section>

          {/* 6. Việc của gia đình */}
          <section>
            <SectionHeading n="6" title="Gia đình làm gì được ngay (không cần biết Toán)" color="#0F766E" />
            <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
              {r.familyActions.map((a) => (
                <div key={a.title} className="rounded-xl border border-slate-200 p-3.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-bold text-slate-900">{a.title}</span>
                    <Badge tone="teal">{a.cadence}</Badge>
                  </div>
                  <div className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{a.detail}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50/50 p-3.5">
              <div className="text-[12.5px] font-bold text-rose-800">Bốn điều nên tránh</div>
              <ul className="mt-1.5 space-y-1">
                {[
                  'So sánh con với “con nhà người ta” — làm giảm động lực nội tại rõ rệt.',
                  'Chỉ hỏi điểm, không hỏi quá trình.',
                  'Thưởng tiền theo điểm số — thay động lực bên trong bằng động lực bên ngoài.',
                  'Giải hộ bài thay vì để con tự vật lộn với nó.',
                ].map((x) => (
                  <li key={x} className="flex gap-2 text-[12px] leading-relaxed text-rose-900">
                    <span className="font-bold">✕</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 7. Giới hạn */}
          <section>
            <SectionHeading n="7" title="Báo cáo này không đo được điều gì" color="#475569" />
            <ul className="mt-2.5 space-y-1.5">
              {r.limits.map((l) => (
                <li key={l} className="flex gap-2 text-[12.5px] leading-relaxed text-slate-600">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-2.5 text-[10.5px] font-semibold text-slate-400">
          <span>
            M365-BC-{r.week.from.replace(/-/g, '')} · {r.studentName} · {vnDate(r.week.from)}–{vnDate(r.week.to)}
          </span>
          <span>{BRAND.docSignature}</span>
        </div>
      </Card>

      <div className="no-print flex flex-wrap gap-2">
        <button className="btn btn-ghost text-sm" onClick={() => go('/today')}>
          Xem việc hôm nay của con
        </button>
        <button className="btn btn-ghost text-sm" onClick={() => go('/portfolio')}>
          Mở hồ sơ học viên đầy đủ
        </button>
        <button className="btn btn-ghost text-sm" onClick={() => go('/gita')}>
          GITA trong gia đình
        </button>
      </div>
    </div>
  );
}

function SectionHeading({ n, title, color }: { n: string; title: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="block h-4 w-1 rounded-full" style={{ background: color }} />
      <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color }}>
        {n}. {title}
      </span>
    </div>
  );
}
