import { useState } from 'react';
import { go, useApp } from '@/state';
import {
  LESSON_PLANS,
  TEACHING_MOVES,
  FEEDBACK_SCRIPTS,
  CLASS_RITUALS,
  OBSERVATION_RUBRIC,
  academyStats,
  type LessonPlan,
} from '@/data/academy';
import { PRO_LEVELS } from '@/data/gita';
import { sheetSpec } from '@/data/sheets';
import { BRAND_TRACK_STYLE } from '@/data/brand';
import { currentRole, isTeacher } from '@/lib/auth';
import { Card, SectionTitle, Badge, Callout, Progress } from '@/components/ui';

type Tab = 'giao-an' | 'nuoc-di' | 'nhan-xet' | 'nghi-thuc' | 'du-gio';

const TABS: { id: Tab; label: string; hint: string }[] = [
  { id: 'giao-an', label: 'Giáo án buổi dạy', hint: 'Ba khung buổi chuẩn, chia tới từng khối thời gian.' },
  { id: 'nuoc-di', label: 'Nước đi sư phạm', hint: 'Mười hai thao tác có tên gọi, dùng lại được ở mọi buổi.' },
  { id: 'nhan-xet', label: 'Kịch bản nhận xét', hint: 'Nói gì trong tám tình huống hay gặp nhất.' },
  { id: 'nghi-thuc', label: 'Nghi thức lớp', hint: 'Năm thói quen làm nên bản sắc lớp MATH365.' },
  { id: 'du-gio', label: 'Bảng dự giờ', hint: 'Chuẩn hoá chất lượng giữa các giáo viên.' },
];

export default function Academy() {
  const { state } = useApp();
  const role = currentRole(state);
  const teacher = isTeacher(state);
  const [tab, setTab] = useState<Tab>('giao-an');
  const st = academyStats();

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="A · Academy"
        title="Học viện MATH365 — bộ vận hành lớp học"
        desc="Chữ A của mô thức GITA viết thành công cụ dùng được: giáo án chia tới từng khối thời gian, nước đi sư phạm có tên gọi, kịch bản nhận xét theo tình huống, nghi thức lớp và bảng dự giờ để chuẩn hoá chất lượng giữa các giáo viên."
        right={
          <button className="btn btn-ghost text-sm no-print" onClick={() => window.print()}>
            In tài liệu
          </button>
        }
      />

      {!teacher && (
        <Callout tone="amber" title="Bạn đang xem với vai trò học viên">
          Trang này viết cho giáo viên và coach. Học viên vẫn xem được để hiểu buổi học được thiết kế
          thế nào — nhưng phần đáng dùng với em là{' '}
          <button className="font-semibold underline" onClick={() => go('/playbook')}>
            Bí kíp &amp; Thói quen
          </button>{' '}
          và{' '}
          <button className="font-semibold underline" onClick={() => go('/today')}>
            Hôm nay
          </button>
          . Vai trò hiện tại: {role.name}.
        </Callout>
      )}

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { k: 'Giáo án', v: st.plans },
          { k: 'Khối thời gian', v: st.blocks },
          { k: 'Nước đi', v: st.moves },
          { k: 'Kịch bản nhận xét', v: st.scripts },
          { k: 'Nghi thức', v: st.rituals },
          { k: 'Tiêu chí dự giờ', v: st.rubricRows },
        ].map((c) => (
          <Card key={c.k} className="p-4">
            <div className="text-2xl font-extrabold tabular-nums text-brand-700">{c.v}</div>
            <div className="text-[11.5px] font-semibold text-slate-500">{c.k}</div>
          </Card>
        ))}
      </div>

      <div className="no-print flex flex-wrap items-center gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            className="chip"
            style={
              tab === t.id ? { background: '#1B4F9C', color: '#fff' } : { background: '#eef1f6', color: '#334155' }
            }
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
        <span className="ml-auto text-[12px] text-slate-500">{TABS.find((t) => t.id === tab)?.hint}</span>
      </div>

      {tab === 'giao-an' && (
        <>
          <Callout tone="brand" title="Cách dùng giáo án này">
            Ba khung dưới đây là bộ xương, không phải kịch bản đọc thuộc. Giữ nguyên thứ tự khối và
            thời lượng — đó là phần đã được tính toán. Nội dung bên trong mỗi khối thì thay theo
            chuyên đề đang dạy. Nếu một khối bị vỡ giờ, cắt bớt phần luyện chứ đừng cắt phần chốt
            cuối buổi.
          </Callout>
          {LESSON_PLANS.map((p) => (
            <LessonCard key={p.id} plan={p} />
          ))}
        </>
      )}

      {tab === 'nuoc-di' && (
        <>
          <Callout tone="brand" title="Nước đi là gì">
            Là một thao tác nhỏ, có tên gọi, dùng lại được ở mọi buổi và mọi chuyên đề. Đặt tên cho
            thao tác giúp tổ chuyên môn nói cùng một ngôn ngữ khi dự giờ và góp ý cho nhau.
          </Callout>
          <div className="grid gap-4 lg:grid-cols-2">
            {TEACHING_MOVES.map((m) => (
              <Card key={m.name} className="p-5">
                <div className="text-[15px] font-extrabold text-slate-900">{m.name}</div>
                <div className="mt-1 text-[12px] font-semibold text-brand-700">Dùng khi: {m.when}</div>
                <ol className="mt-2.5 space-y-1.5">
                  {m.how.map((h, i) => (
                    <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-slate-700">
                      <span className="font-bold text-slate-400">{i + 1}.</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-2.5 rounded-lg bg-brand-50 px-3 py-2 text-[12.5px] leading-relaxed text-brand-800">
                  <b>Vì sao hiệu quả: </b>
                  {m.why}
                </div>
                <div className="mt-1.5 rounded-lg bg-rose-50 px-3 py-2 text-[12.5px] leading-relaxed text-rose-800">
                  <b>Tránh: </b>
                  {m.avoid}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {tab === 'nhan-xet' && (
        <>
          <Callout tone="brand" title="Nguyên tắc chung của mọi lời nhận xét">
            Bắt đầu bằng một dữ kiện quan sát được, không bắt đầu bằng đánh giá. Kết thúc bằng một
            việc cụ thể làm được ngay, không kết thúc bằng lời động viên chung chung. Và không bao
            giờ so sánh học sinh này với học sinh khác trong nhận xét cá nhân.
          </Callout>
          <div className="space-y-4">
            {FEEDBACK_SCRIPTS.map((f) => (
              <Card key={f.situation} className="overflow-hidden">
                <div className="border-b border-slate-200 bg-slate-50/70 px-5 py-3">
                  <div className="text-[15px] font-extrabold text-slate-900">{f.situation}</div>
                  <div className="mt-0.5 text-[12px] font-semibold text-slate-500">
                    Dấu hiệu nhận biết: {f.signal}
                  </div>
                </div>
                <div className="space-y-3 p-5">
                  <div className="rounded-xl border-l-4 border-brand-500 bg-brand-50/60 px-4 py-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-700">Nói</div>
                    <div className="mt-1 font-serif text-[13.5px] leading-relaxed text-slate-800">{f.say}</div>
                  </div>
                  <div className="rounded-xl bg-teal-50 px-4 py-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">Rồi làm</span>
                    <div className="mt-0.5 text-[12.5px] leading-relaxed text-slate-700">{f.then}</div>
                  </div>
                  <div className="rounded-xl bg-rose-50 px-4 py-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">Không bao giờ</span>
                    <div className="mt-0.5 text-[12.5px] leading-relaxed text-slate-700">{f.never}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {tab === 'nghi-thuc' && (
        <>
          <Callout tone="brand" title="Nghi thức tạo ra bản sắc">
            Học sinh nhận ra một lớp MATH365 không phải qua logo trên phiếu, mà qua năm việc lặp lại
            ở mọi buổi. Nghi thức chỉ có giá trị khi không bao giờ bị bỏ — bỏ một lần là mất hiệu lực.
          </Callout>
          <div className="grid gap-4 lg:grid-cols-2">
            {CLASS_RITUALS.map((r) => (
              <Card key={r.name} className="p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[15px] font-extrabold text-slate-900">{r.name}</span>
                  <Badge tone="brand">{r.minutes} phút</Badge>
                </div>
                <div className="mt-0.5 text-[12px] font-semibold text-slate-500">{r.when}</div>
                <ol className="mt-2.5 space-y-1.5">
                  {r.steps.map((s, i) => (
                    <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-slate-700">
                      <span className="font-bold text-slate-400">{i + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-2.5 rounded-lg bg-teal-50 px-3 py-2 text-[12.5px] leading-relaxed text-teal-900">
                  <b>Vì sao: </b>
                  {r.why}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {tab === 'du-gio' && (
        <>
          <Callout tone="brand" title="Bảng dự giờ dùng để phát triển, không để xếp loại">
            Người dự giờ chấm từng ô, ghi lại một bằng chứng quan sát được cho mỗi ô, rồi chọn đúng
            một tiêu chí để cùng người dạy cải thiện trong bốn tuần tới. Chấm nhiều tiêu chí cùng lúc
            thì không tiêu chí nào tiến.
          </Callout>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-2.5">Tiêu chí</th>
                    <th className="px-3 py-2.5">Trọng số</th>
                    <th className="px-3 py-2.5">1 · Chưa đạt</th>
                    <th className="px-3 py-2.5">2 · Cơ bản</th>
                    <th className="px-3 py-2.5">3 · Vững</th>
                    <th className="px-3 py-2.5">4 · Xuất sắc</th>
                  </tr>
                </thead>
                <tbody>
                  {OBSERVATION_RUBRIC.map((r) => (
                    <tr key={r.area} className="border-b border-slate-100 align-top last:border-0">
                      <td className="px-4 py-3 font-bold text-slate-800">{r.area}</td>
                      <td className="px-3 py-3 tabular-nums font-bold text-brand-700">{r.weight}%</td>
                      {r.levels.map((l) => (
                        <td
                          key={l.score}
                          className="px-3 py-3 leading-relaxed text-slate-600"
                          style={l.score === 4 ? { background: '#f0fdf4' } : undefined}
                        >
                          {l.desc}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm font-bold text-slate-900">Gắn với năm cấp độ chuyên môn</div>
            <p className="mt-1 text-[13px] text-slate-600">
              Điểm dự giờ là một trong các căn cứ để xét lên cấp độ chuyên môn. Không phải căn cứ duy
              nhất — dữ liệu tiến bộ của học sinh mới là căn cứ nặng nhất.
            </p>
            <div className="mt-4 space-y-2">
              {PRO_LEVELS.map((p, i) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-slate-200 p-4"
                  style={{ borderLeftWidth: 4, borderLeftColor: p.color }}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[14px] font-extrabold text-slate-900">{p.name}</span>
                    <Badge tone="slate">{p.roleHint}</Badge>
                  </div>
                  <div className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{p.scope}</div>
                  <div className="mt-2">
                    <Progress
                      value={((i + 1) / PRO_LEVELS.length) * 100}
                      tone={p.color}
                      label={`Ngưỡng dự giờ tối thiểu: ${2 + Math.min(2, Math.floor(i / 2))}/4 ở mọi tiêu chí`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

function LessonCard({ plan }: { plan: LessonPlan }) {
  const [open, setOpen] = useState(false);
  const total = plan.blocks.reduce((s, b) => s + b.minutes, 0);
  return (
    <Card className="overflow-hidden">
      <button
        className="flex w-full flex-wrap items-start justify-between gap-3 border-b border-slate-200 bg-slate-50/70 px-5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[16px] font-extrabold text-slate-900">{plan.name}</span>
            {plan.sheetTypes.map((s) => {
              const spec = sheetSpec(s);
              return (
                <Badge key={s} tone="slate" style={{ background: `${spec.color}18`, color: spec.color }}>
                  {spec.code} · {spec.short}
                </Badge>
              );
            })}
            {plan.tracks.map((t) => (
              <Badge key={t} tone="slate" style={{ color: BRAND_TRACK_STYLE[t].color }}>
                {BRAND_TRACK_STYLE[t].icon}
              </Badge>
            ))}
          </div>
          <div className="mt-1.5 max-w-3xl text-[12.5px] leading-relaxed text-slate-600">{plan.goal}</div>
        </div>
        <span className="shrink-0 text-[12px] font-semibold text-slate-400 no-print">
          {open ? 'Thu gọn' : 'Mở giáo án'}
        </span>
      </button>

      {/* Thanh thời lượng */}
      <div className="flex h-2.5 w-full overflow-hidden">
        {plan.blocks.map((b, i) => (
          <div
            key={b.name}
            title={`${b.name} · ${b.minutes} phút`}
            style={{
              width: `${(b.minutes / total) * 100}%`,
              background: ['#1B4F9C', '#2E6FBF', '#0F766E', '#F0A21B', '#7C3AED', '#E01B24'][i % 6],
            }}
          />
        ))}
      </div>

      {open && (
        <div className="space-y-5 p-5">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Chuẩn bị trước buổi
            </div>
            <ul className="mt-1.5 space-y-1">
              {plan.prepare.map((x, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-slate-700">
                  <span className="text-slate-400">☐</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            {plan.blocks.map((b, i) => (
              <div key={b.name} className="rounded-xl border border-slate-200">
                <div className="flex flex-wrap items-baseline gap-2 border-b border-slate-100 px-4 py-2.5">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                    style={{ background: ['#1B4F9C', '#2E6FBF', '#0F766E', '#F0A21B', '#7C3AED', '#E01B24'][i % 6] }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[14px] font-extrabold text-slate-900">{b.name}</span>
                  <Badge tone="brand">{b.minutes} phút</Badge>
                  <span className="w-full text-[12px] text-slate-600 sm:w-auto sm:flex-1">{b.purpose}</span>
                </div>
                <div className="grid gap-px bg-slate-100 sm:grid-cols-2">
                  <div className="bg-white p-3.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-700">
                      Giáo viên làm
                    </div>
                    <ul className="mt-1.5 space-y-1">
                      {b.teacher.map((x, k) => (
                        <li key={k} className="flex gap-2 text-[12.5px] leading-relaxed text-slate-700">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white p-3.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                      Học sinh làm
                    </div>
                    <ul className="mt-1.5 space-y-1">
                      {b.student.map((x, k) => (
                        <li key={k} className="flex gap-2 text-[12.5px] leading-relaxed text-slate-700">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-teal-600" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="grid gap-px bg-slate-100 sm:grid-cols-2">
                  <div className="bg-emerald-50/60 px-3.5 py-2.5 text-[12px] leading-relaxed text-emerald-900">
                    <b>Dấu hiệu đạt: </b>
                    {b.success}
                  </div>
                  <div className="bg-rose-50/60 px-3.5 py-2.5 text-[12px] leading-relaxed text-rose-900">
                    <b>Lỗi hay mắc: </b>
                    {b.pitfall}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Giao về nhà
              </div>
              <ul className="mt-1.5 space-y-1">
                {plan.homework.map((x, i) => (
                  <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-slate-700">
                    <span className="text-slate-400">☐</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Đo buổi dạy có hiệu quả không
              </div>
              <ul className="mt-1.5 space-y-1">
                {plan.evidence.map((x, i) => (
                  <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-slate-700">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-500" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
