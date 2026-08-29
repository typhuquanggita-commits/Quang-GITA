import { useState } from 'react';
import {
  PILLARS,
  ACTION_LEVELS,
  TEAM_MODEL,
  TIERS,
  PRO_LEVELS,
  ENVIRONMENTS,
  TRAITS,
  STANDARDS,
  GITA_NOTE,
} from '@/data/gita';
import { BRAND } from '@/data/brand';
import { Card, SectionTitle, Badge, Callout } from '@/components/ui';

type Tab = 'tru-cot' | 'hanh-dong' | 'tang' | 'chuyen-mon' | 'moi-truong' | 'chuan';

const TABS: { id: Tab; label: string }[] = [
  { id: 'tru-cot', label: 'Bốn trụ cột G·I·T·A' },
  { id: 'hanh-dong', label: 'Cấp độ hành động 20/80' },
  { id: 'tang', label: 'Năm tầng hấp thu' },
  { id: 'chuyen-mon', label: 'Cấp độ chuyên môn' },
  { id: 'moi-truong', label: 'GITA hoá 3 môi trường' },
  { id: 'chuan', label: 'Khung tham chiếu' },
];

export default function Gita() {
  const [tab, setTab] = useState<Tab>('tru-cot');

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow={`${BRAND.org} · Mô thức huấn luyện`}
        title="GITA — Goal · Inspirits · Talent · Action/Academy"
        desc="Mô thức xuyên suốt mọi tầng của hệ thống: thư mục tài liệu, quy trình, giải pháp, chiến lược và thói quen. Cùng một khung được áp dụng cho học sinh, giáo viên và gia đình."
      />

      <div className="flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`chip ${tab === t.id ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600'}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Bốn trụ cột */}
      {tab === 'tru-cot' && (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <Card key={p.id} className="p-5">
                <div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl font-extrabold text-white"
                  style={{ background: p.color }}
                >
                  {p.letter}
                </div>
                <h3 className="text-[15px] font-extrabold leading-snug text-slate-900">{p.name}</h3>
                <p className="mt-1 text-[12px] font-semibold text-slate-500">{p.question}</p>
              </Card>
            ))}
          </div>

          {PILLARS.map((p) => (
            <Card key={p.id} className="p-6">
              <div className="flex items-start gap-4">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl font-extrabold text-white"
                  style={{ background: p.color }}
                >
                  {p.letter}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[17px] font-extrabold text-slate-900">{p.name}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-700">{p.principle}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                {p.actions.map((a) => (
                  <div key={a.role} className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-[12px] font-extrabold uppercase tracking-wide" style={{ color: p.color }}>
                      {a.role}
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {a.items.map((i) => (
                        <li key={i} className="text-[12.5px] leading-relaxed text-slate-700">
                          ▸ {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                    Tài liệu & công cụ
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {p.artifacts.map((x) => (
                      <Badge key={x}>{x}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                    Đo bằng
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {p.kpi.map((x) => (
                      <Badge key={x} tone="brand">
                        {x}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Cấp độ hành động */}
      {tab === 'hanh-dong' && (
        <div className="space-y-4">
          <Callout tone="brand" title="Quy tắc 20/80 trong học tập">
            Trong mỗi giai đoạn, có khoảng 20% nội dung tạo ra 80% điểm số. Việc của hệ thống là chỉ ra
            đúng 20% đó — thông qua cột “tần suất xuất hiện trong đề” của mỗi chuyên đề và thứ tự ưu tiên
            trong lộ trình. Việc của học sinh là làm 20% đó <b>trước</b>, không phải làm sau cùng.
          </Callout>

          <div className="space-y-3">
            {ACTION_LEVELS.map((l) => (
              <Card key={l.id} className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-extrabold text-white"
                    style={{ background: l.color }}
                  >
                    {l.id}
                  </span>
                  <h3 className="text-[15.5px] font-extrabold text-slate-900">{l.name}</h3>
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slate-700">{l.focus}</p>
                <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2.5 text-[13px] leading-relaxed text-amber-900">
                  <b>20/80 ở cấp này:</b> {l.rule2080}
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                      Hành động hằng ngày
                    </div>
                    <ul className="mt-1.5 space-y-1">
                      {l.daily.map((d) => (
                        <li key={d} className="text-[12.5px] text-slate-700">
                          ▸ {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                      Dấu hiệu đã lên cấp
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-700">{l.signal}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <h3 className="text-[16px] font-extrabold text-slate-900">
              Academy · Nhóm bạn xuất sắc & môi trường thi đua
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-slate-700">
              <b>Quy mô nhóm:</b> {TEAM_MODEL.size}
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{TEAM_MODEL.why}</p>

            <div className="mt-4 space-y-2.5">
              {TEAM_MODEL.rules.map((r) => (
                <div key={r.name} className="rounded-xl border border-slate-200 p-3.5">
                  <div className="text-[13.5px] font-extrabold text-slate-900">{r.name}</div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{r.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-rose-50 p-4">
              <div className="text-[12.5px] font-extrabold text-rose-800">Nhóm học dễ hỏng khi</div>
              <ul className="mt-1.5 space-y-1">
                {TEAM_MODEL.antipatterns.map((a) => (
                  <li key={a} className="text-[12.5px] leading-relaxed text-rose-900">
                    ✕ {a}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      )}

      {/* Tầng hấp thu */}
      {tab === 'tang' && (
        <div className="space-y-3">
          <Callout tone="brand" title="Vì sao phải phân tầng">
            Cùng một chuyên đề, học sinh ở tầng khác nhau cần loại tài liệu khác nhau và cần giáo viên
            can thiệp khác nhau. Học sai tầng là nguyên nhân phổ biến nhất khiến học nhiều mà không tiến bộ.
          </Callout>
          {TIERS.map((t) => (
            <Card key={t.id} className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-extrabold text-white"
                  style={{ background: t.color }}
                >
                  {t.id}
                </span>
                <h3 className="text-[15.5px] font-extrabold text-slate-900">{t.name}</h3>
                <Badge>{t.nameEn}</Badge>
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-700">{t.descriptor}</p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                    Bằng chứng đạt tầng
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {t.evidence.map((e) => (
                      <li key={e} className="text-[12.5px] text-slate-700">
                        ✔ {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                    Tài liệu phù hợp
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {t.materials.map((m) => (
                      <li key={m} className="text-[12.5px] text-slate-700">
                        ❐ {m}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                    Giáo viên nên làm
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-700">{t.teacherMove}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-brand-800">
                    <b>Lên tầng khi:</b> {t.exitCriteria}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Cấp độ chuyên môn */}
      {tab === 'chuyen-mon' && (
        <div className="space-y-3">
          <Callout tone="brand" title="Năm cấp độ chuyên môn P1 → P5">
            Mỗi cấp có phạm vi công việc, năng lực bắt buộc và tiêu chí kiểm định riêng. Cấp chuyên môn
            gắn với vai trò trong hệ thống phân quyền, nhưng là hai thứ khác nhau: cấp chuyên môn nói về
            năng lực, vai trò nói về quyền thao tác.
          </Callout>
          {PRO_LEVELS.map((p) => (
            <Card key={p.id} className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-lg px-2.5 py-1 text-[12px] font-extrabold text-white"
                  style={{ background: p.color }}
                >
                  {p.id}
                </span>
                <h3 className="text-[15.5px] font-extrabold text-slate-900">{p.name}</h3>
              </div>
              <p className="mt-1.5 text-[12.5px] font-semibold text-slate-500">{p.roleHint}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-700">
                <b>Phạm vi:</b> {p.scope}
              </p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                    Năng lực bắt buộc
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {p.competencies.map((c) => (
                      <li key={c} className="text-[12.5px] leading-relaxed text-slate-700">
                        ▸ {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                    Được phép đảm nhận
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {p.canDeliver.map((c) => (
                      <Badge key={c}>{c}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11.5px] font-bold uppercase tracking-wide text-slate-400">
                    Tiêu chí kiểm định
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {p.certification.map((c) => (
                      <li key={c} className="text-[12.5px] leading-relaxed text-slate-700">
                        ✔ {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Môi trường */}
      {tab === 'moi-truong' && (
        <div className="space-y-4">
          {ENVIRONMENTS.map((e) => (
            <Card key={e.id} className="p-6">
              <h3 className="text-[17px] font-extrabold" style={{ color: e.color }}>
                {e.name}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-700">{e.goal}</p>

              <div className="mt-4 space-y-3">
                {e.protocols.map((p) => (
                  <div key={p.name} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-[14px] font-extrabold text-slate-900">{p.name}</h4>
                      <Badge tone="brand">{p.cadence}</Badge>
                    </div>
                    <ol className="mt-2 space-y-1.5 border-l-2 pl-4" style={{ borderColor: `${e.color}44` }}>
                      {p.steps.map((s, i) => (
                        <li key={i} className="text-[12.5px] leading-relaxed text-slate-700">
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl bg-rose-50 p-4">
                <div className="text-[12.5px] font-extrabold text-rose-800">Cần tránh</div>
                <ul className="mt-1.5 space-y-1">
                  {e.antipatterns.map((a) => (
                    <li key={a} className="text-[12.5px] leading-relaxed text-rose-900">
                      ✕ {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}

          <Card className="p-6">
            <h3 className="text-[16px] font-extrabold text-slate-900">
              Tám phẩm chất được rèn qua mô thức
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">
              Kỳ thi rồi sẽ qua. Đây là phần ở lại — và mỗi phẩm chất đều gắn với một cơ chế cụ thể trong
              hệ thống, không phải khẩu hiệu.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {TRAITS.map((t) => (
                <div key={t.name} className="rounded-xl border border-slate-200 p-4">
                  <div className="text-[13.5px] font-extrabold text-slate-900">{t.name}</div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">
                    <b className="text-slate-800">Rèn bởi:</b> {t.builtBy}
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-600">
                    <b className="text-slate-800">Bằng chứng:</b> {t.evidence}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Chuẩn tham chiếu */}
      {tab === 'chuan' && (
        <div className="space-y-3">
          <Callout tone="amber" title="Phạm vi của phần này">
            {GITA_NOTE}
          </Callout>
          {STANDARDS.map((s) => (
            <Card key={s.name} className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[15px] font-extrabold text-slate-900">{s.name}</h3>
                <Badge>{s.origin}</Badge>
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-700">{s.idea}</p>
              <div className="mt-2 rounded-xl bg-brand-50 px-3 py-2.5 text-[13px] leading-relaxed text-brand-900">
                <b>Áp dụng trong MATH365:</b> {s.where}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
