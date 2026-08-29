import {
  BRAND,
  BRAND_COLORS,
  BRAND_SCALE,
  BRAND_TYPO,
  BRAND_VOICE,
  BRAND_LOGO_NOTES,
  BRAND_TRACK_STYLE,
  DOC_CODE_RULE,
  DOC_SHEET_IDENTITY,
  DOC_LAYOUT,
  DOC_COVER,
  DOC_PRINT_RULES,
  DOC_TEMPLATES,
  DOC_TYPE_SCALE,
  DOC_PILLAR_SIGNALS,
} from '@/data/brand';
import { PILLARS } from '@/data/gita';
import { Card, SectionTitle, Badge, Callout } from '@/components/ui';
import { GitaLogo } from '@/components/Logo';

/** Bản mô phỏng đầu trang phiếu chuẩn MATH365 — đúng thứ tự các vùng trong DOC_LAYOUT. */
function SheetPreview({
  code,
  name,
  color,
  glyph,
}: {
  code: string;
  name: string;
  color: string;
  glyph: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b-2 px-3 pb-2 pt-2.5" style={{ borderColor: color }}>
        <div className="flex items-center justify-between gap-2">
          <GitaLogo size={20} variant="mark" />
          <div className="min-w-0 text-center">
            <div className="truncate text-[11px] font-extrabold text-slate-900">{name}</div>
          </div>
          <div className="text-right">
            <div className="text-[8px] font-bold uppercase tracking-[0.16em]" style={{ color }}>
              M365-…-{code}
            </div>
            <div className="text-[8px] font-semibold text-slate-500">KPI 90%</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-px bg-slate-100 text-[8px]">
        {['Chuyên đề', 'Mức 3', '25 phút', '12 câu'].map((t) => (
          <div key={t} className="bg-white px-1.5 py-1 text-center font-semibold text-slate-600">
            {t}
          </div>
        ))}
      </div>
      <div className="px-3 py-2" style={{ background: `${color}0F` }}>
        <div className="text-[9px] font-semibold" style={{ color }}>
          ◎ Sau phiếu này, em … (câu mục tiêu đo được)
        </div>
      </div>
      <div className="space-y-1.5 px-3 py-2.5">
        {['Phần I · Nhận dạng', 'Phần II · Quy trình', 'Phần III · Vận dụng'].map((p) => (
          <div key={p} className="flex items-start gap-2">
            <span className="mt-0.5 block h-6 w-[3px] rounded-full" style={{ background: color }} />
            <span className="text-[9.5px] font-semibold text-slate-700">{p}</span>
          </div>
        ))}
        <div className="mt-2 grid grid-cols-3 gap-px rounded border border-dashed border-slate-300 bg-slate-100 text-[7.5px]">
          {['Câu sai', 'Nguyên nhân', 'Việc sửa'].map((h) => (
            <div key={h} className="bg-white px-1 py-1 text-center font-semibold text-slate-500">
              {h}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 px-3 py-1 text-[7.5px] font-semibold text-slate-400">
        <span>
          {glyph} {code}
        </span>
        <span>gita365.vn</span>
      </div>
    </div>
  );
}

export default function Brand() {
  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Bộ nhận diện"
        title={`${BRAND.product} · ${BRAND.org}`}
        desc="Nhận diện là lời hứa được thể hiện bằng hình ảnh và ngôn ngữ. Trang này là nguồn chân lý duy nhất cho logo, màu, chữ, giọng điệu và quy chuẩn tài liệu của toàn hệ thống."
      />

      {/* ---------- Logo ---------- */}
      <Card className="p-8">
        <div className="flex flex-col items-start gap-8 lg:flex-row">
          <div className="flex flex-col items-center gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5">
              <GitaLogo size={72} />
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-xl border border-slate-200 bg-white p-2.5">
                <GitaLogo size={40} variant="mark" />
              </div>
              <div className="rounded-xl bg-brand-700 p-2.5">
                <GitaLogo size={40} variant="mark" mono="#ffffff" />
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-2.5">
                <GitaLogo size={40} variant="mark" mono="#0F172A" />
              </div>
            </div>
            <div className="text-center text-[11px] font-semibold text-slate-500">
              Bản đầy đủ · dấu hiệu · đảo trắng · một màu để in
            </div>
            <a
              className="btn btn-ghost text-xs"
              href="./gita-logo.svg"
              target="_blank"
              rel="noreferrer"
            >
              Mở tệp logo SVG
            </a>
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-3xl font-extrabold tracking-tight text-slate-900">
              {BRAND.product}
              <span className="ml-2 align-middle text-[13px] font-bold text-brand-600">
                by {BRAND.org}
              </span>
            </div>
            <p className="mt-2 text-[15px] font-semibold text-slate-700">{BRAND.tagline}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-slate-600">{BRAND.promise}</p>
            <ul className="mt-4 space-y-2">
              {BRAND_LOGO_NOTES.map((n, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* ---------- Bốn trụ cột, bốn tín hiệu ---------- */}
      <Card className="p-6">
        <div className="text-sm font-bold text-slate-900">Bốn trụ cột GITA — bốn tín hiệu nhận diện</div>
        <p className="mt-1 text-[13px] text-slate-600">
          Mỗi trụ cột có một ký hiệu và một màu riêng, lặp lại y hệt ở mọi tài liệu, mọi màn hình —
          học sinh nhìn ký hiệu là biết mình đang ở phần nào của mô thức.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DOC_PILLAR_SIGNALS.map((s) => {
            const pillar = PILLARS.find((p) => p.id === s.key);
            return (
              <div
                key={s.key}
                className="rounded-xl border border-slate-200 p-4"
                style={{ borderTopWidth: 3, borderTopColor: s.color }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl" style={{ color: s.color }}>
                    {s.glyph}
                  </span>
                  <span className="text-[15px] font-extrabold text-slate-900">{s.name}</span>
                </div>
                {pillar && (
                  <div className="mt-1 text-[12px] font-semibold text-slate-600">{pillar.name}</div>
                )}
                <div className="mt-2 text-[12px] leading-relaxed text-slate-500">{s.where}</div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ---------- Màu ---------- */}
      <Card className="p-6">
        <div className="text-sm font-bold text-slate-900">Hệ màu rút từ logo</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_COLORS.map((c) => (
            <div key={c.hex} className="overflow-hidden rounded-xl border border-slate-200">
              <div className="h-16" style={{ background: c.hex }} />
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-slate-900">{c.name}</span>
                  <span className="font-mono text-[11px] text-slate-500">{c.hex}</span>
                </div>
                {c.from && (
                  <div className="mt-0.5 text-[11px] font-semibold text-brand-600">{c.from}</div>
                )}
                <div className="mt-1 text-[12px] leading-relaxed text-slate-600">{c.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <div className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
            Thang màu chủ đạo
          </div>
          <div className="mt-2 flex overflow-hidden rounded-lg border border-slate-200">
            {BRAND_SCALE.map((s) => (
              <div key={s.step} className="flex-1" title={`${s.step} · ${s.hex}`}>
                <div className="h-10" style={{ background: s.hex }} />
                <div className="bg-white py-1 text-center text-[10px] font-semibold text-slate-500">
                  {s.step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ---------- Nhận diện tài liệu ---------- */}
      <SectionTitle
        eyebrow="Quy chuẩn tài liệu"
        title="Bộ nhận diện tài liệu MATH365"
        desc="Mọi phiếu, mọi đề, mọi bảng phân tích in ra đều theo cùng một khuôn: cùng vùng bố cục, cùng vị trí mã phiếu, cùng ô ghi lỗi. Học sinh cầm bất kỳ tờ nào cũng biết ngay mình đang ở đâu trong lộ trình."
      />

      <Card className="p-6">
        <div className="text-sm font-bold text-slate-900">Mã tài liệu</div>
        <div className="mt-3 rounded-xl bg-slate-900 px-4 py-3 font-mono text-[13px] text-brand-100">
          {DOC_CODE_RULE.pattern}
          <div className="mt-1 text-[12px] text-accent-300">Ví dụ: {DOC_CODE_RULE.example}</div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_CODE_RULE.parts.map((p) => (
            <div key={p.token} className="rounded-lg border border-slate-200 px-3 py-2">
              <div className="font-mono text-[12px] font-bold text-brand-700">{p.token}</div>
              <div className="mt-0.5 text-[12px] leading-relaxed text-slate-600">{p.mean}</div>
            </div>
          ))}
        </div>
        <ul className="mt-4 space-y-1.5">
          {DOC_CODE_RULE.rules.map((r, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <div className="text-sm font-bold text-slate-900">Chín loại tài liệu — chín tín hiệu</div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500">
                <th className="py-2 pr-3">Mã</th>
                <th className="py-2 pr-3">Tài liệu</th>
                <th className="py-2 pr-3">Ký hiệu</th>
                <th className="py-2 pr-3">Gáy phiếu</th>
                <th className="py-2">Trụ cột</th>
              </tr>
            </thead>
            <tbody>
              {DOC_SHEET_IDENTITY.map((s) => (
                <tr key={s.code} className="border-b border-slate-100 last:border-0">
                  <td className="py-2 pr-3">
                    <span
                      className="chip text-white"
                      style={{ background: s.color }}
                    >
                      {s.code}
                    </span>
                  </td>
                  <td className="py-2 pr-3 font-semibold text-slate-800">{s.name}</td>
                  <td className="py-2 pr-3 text-lg" style={{ color: s.color }}>
                    {s.glyph}
                  </td>
                  <td className="py-2 pr-3 text-slate-600">{s.band}</td>
                  <td className="py-2">
                    <Badge tone="slate">{s.pillar}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOC_SHEET_IDENTITY.slice(0, 6).map((s) => (
            <SheetPreview key={s.code} code={s.code} name={s.name} color={s.color} glyph={s.glyph} />
          ))}
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="text-sm font-bold text-slate-900">Bố cục trang phiếu</div>
          <div className="mt-3 space-y-2.5">
            {DOC_LAYOUT.map((z) => (
              <div key={z.zone} className="rounded-lg border border-slate-200 px-3 py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-bold text-slate-800">{z.zone}</span>
                  <span className="font-mono text-[11px] text-slate-500">{z.height}</span>
                </div>
                <div className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{z.content}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6">
            <div className="text-sm font-bold text-slate-900">Thang chữ cho bản in A4</div>
            <div className="mt-3 space-y-2">
              {DOC_TYPE_SCALE.map((t) => (
                <div key={t.level} className="border-b border-slate-100 pb-2 last:border-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[13px] font-bold text-slate-800">{t.level}</span>
                    <span className="font-mono text-[11px] text-brand-600">{t.size}</span>
                  </div>
                  <div className="text-[12px] text-slate-500">{t.note}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm font-bold text-slate-900">Bìa bộ tài liệu</div>
            <ul className="mt-3 space-y-1.5">
              {DOC_COVER.map((c, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Card className="p-6">
        <div className="text-sm font-bold text-slate-900">Mẫu câu chữ dùng lại</div>
        <p className="mt-1 text-[13px] text-slate-600">
          Năm khuôn dưới đây áp dụng cho mọi phiếu, mọi nhận xét, mọi phần mềm sinh nội dung — để
          giọng của MATH365 luôn giống nhau dù ai viết.
        </p>
        <div className="mt-4 space-y-3">
          {DOC_TEMPLATES.map((t) => (
            <div key={t.name} className="rounded-xl border border-slate-200 p-4">
              <div className="text-[13px] font-bold text-slate-900">{t.name}</div>
              <div className="mt-1.5 rounded-lg bg-brand-50 px-3 py-2 text-[12.5px] font-semibold text-brand-800">
                {t.pattern}
              </div>
              <div className="mt-1.5 text-[12.5px] italic leading-relaxed text-slate-600">
                {t.sample}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-sm font-bold text-slate-900">Quy tắc in ấn</div>
        <ul className="mt-3 space-y-1.5">
          {DOC_PRINT_RULES.map((r, i) => (
            <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-600">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* ---------- Chữ ---------- */}
      <Card className="p-6">
        <div className="text-sm font-bold text-slate-900">Chữ</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {BRAND_TYPO.map((t) => (
            <div key={t.role} className="rounded-xl border border-slate-200 p-4">
              <div className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
                {t.role}
              </div>
              <div
                className={`mt-1 text-2xl font-bold text-slate-900 ${
                  t.font.startsWith('Lora') ? 'font-serif' : ''
                }`}
              >
                {t.font}
              </div>
              <div className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{t.note}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* ---------- Luồng ---------- */}
      <Card className="p-6">
        <div className="text-sm font-bold text-slate-900">Nhận diện ba luồng</div>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {Object.entries(BRAND_TRACK_STYLE).map(([id, s]) => (
            <div
              key={id}
              className="rounded-xl border border-slate-200 p-4"
              style={{ borderLeftWidth: 4, borderLeftColor: s.color }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl" style={{ color: s.color }}>
                  {s.icon}
                </span>
                <span className="text-[14px] font-extrabold text-slate-900">{s.label}</span>
              </div>
              <div className="mt-1 font-mono text-[11px] font-bold" style={{ color: s.color }}>
                Tiền tố mã: {s.docPrefix}
              </div>
              <div className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">{s.goal}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* ---------- Giọng điệu ---------- */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="text-sm font-bold text-teal-700">Nên</div>
          <ul className="mt-3 space-y-2">
            {BRAND_VOICE.do.map((d, i) => (
              <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                <span className="font-bold text-teal-600">✓</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-bold text-rose-700">Không</div>
          <ul className="mt-3 space-y-2">
            {BRAND_VOICE.dont.map((d, i) => (
              <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                <span className="font-bold text-rose-500">✕</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Callout tone="brand" title="Nhận diện chỉ có giá trị khi được dùng nhất quán">
        Một tờ phiếu lệch khuôn làm hỏng niềm tin nhanh hơn mười tờ đúng khuôn xây được. Trước khi
        phát hành bất kỳ tài liệu nào, đối chiếu lại: mã phiếu đúng quy ước, màu đúng loại phiếu, ô
        mục tiêu có câu đo được, ô ghi chú lỗi còn nguyên, chân trang đủ bốn thành phần.
      </Callout>
    </div>
  );
}
