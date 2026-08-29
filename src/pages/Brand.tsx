import {
  BRAND,
  BRAND_COLORS,
  BRAND_TYPO,
  BRAND_VOICE,
  BRAND_LOGO_NOTES,
  BRAND_TRACK_STYLE,
} from '@/data/brand';
import { PILLARS } from '@/data/gita';
import { Card, SectionTitle, Badge, Callout } from '@/components/ui';

export default function Brand() {
  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Bộ nhận diện"
        title={`${BRAND.product} · ${BRAND.org}`}
        desc="Nhận diện thương hiệu là lời hứa được thể hiện bằng hình ảnh và ngôn ngữ. Trang này là nguồn chân lý duy nhất cho màu, chữ, logo và giọng điệu của toàn hệ thống."
      />

      {/* Logo */}
      <Card className="p-8">
        <div className="flex flex-col items-center gap-8 sm:flex-row">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-28 w-28 items-center justify-center rounded-[26px] bg-brand-700 text-6xl font-bold text-white shadow-lg">
              ∑
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-[18px] border-2 border-brand-700 text-4xl font-bold text-brand-700">
              ∑
            </div>
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
            <ul className="mt-4 space-y-1.5">
              {BRAND_LOGO_NOTES.map((n) => (
                <li key={n} className="text-[12.5px] leading-relaxed text-slate-600">
                  ▸ {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Màu */}
      <Card className="p-6">
        <h2 className="text-[16px] font-extrabold text-slate-900">Bảng màu</h2>
        <p className="mt-1 text-[12.5px] text-slate-500">
          Indigo là màu chủ đạo cho tri thức và sự tin cậy; vàng 365 dành riêng cho thành tích và mốc
          thăng cấp — dùng tiết chế để giữ giá trị của nó.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BRAND_COLORS.map((c) => (
            <div key={c.hex} className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="h-20" style={{ background: c.hex }} />
              <div className="p-3">
                <div className="text-[13px] font-extrabold text-slate-900">{c.name}</div>
                <div className="font-mono text-[11.5px] text-slate-500">{c.hex}</div>
                <div className="mt-1 text-[11.5px] leading-relaxed text-slate-600">{c.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Ba luồng */}
      <Card className="p-6">
        <h2 className="text-[16px] font-extrabold text-slate-900">Màu định danh ba luồng</h2>
        <p className="mt-1 text-[12.5px] text-slate-500">
          Mỗi luồng có một màu và một ký hiệu hình học riêng, dùng nhất quán trên toàn bộ giao diện và
          tài liệu in.
        </p>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {Object.entries(BRAND_TRACK_STYLE).map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-slate-200 p-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl text-white"
                style={{ background: v.color }}
              >
                {v.icon}
              </div>
              <div className="mt-3 text-[14px] font-extrabold text-slate-900">{v.label}</div>
              <div className="font-mono text-[11.5px] text-slate-500">{v.color}</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-600">{v.goal}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Chữ */}
      <Card className="p-6">
        <h2 className="text-[16px] font-extrabold text-slate-900">Hệ thống chữ</h2>
        <div className="mt-4 space-y-3">
          {BRAND_TYPO.map((t) => (
            <div key={t.role} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">{t.role}</Badge>
                <span className="text-[14px] font-extrabold text-slate-900">{t.font}</span>
              </div>
              <p className="mt-1.5 text-[12.5px] text-slate-600">{t.note}</p>
              <p
                className={`mt-2 text-[22px] leading-snug text-slate-800 ${
                  t.font === 'Lora' ? 'font-serif' : 'font-sans'
                }`}
              >
                Chinh phục Toán bằng lộ trình, không bằng may rủi.
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Giọng điệu */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-[16px] font-extrabold text-emerald-700">Giọng điệu — Nên</h2>
          <ul className="mt-3 space-y-2">
            {BRAND_VOICE.do.map((d) => (
              <li key={d} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                <span className="mt-0.5 text-emerald-600">✔</span>
                {d}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6">
          <h2 className="text-[16px] font-extrabold text-rose-700">Giọng điệu — Không</h2>
          <ul className="mt-3 space-y-2">
            {BRAND_VOICE.dont.map((d) => (
              <li key={d} className="flex gap-2 text-[13px] leading-relaxed text-slate-700">
                <span className="mt-0.5 text-rose-500">✕</span>
                {d}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Callout tone="amber" title="Nguyên tắc trung thực trong truyền thông">
        Không dùng các cụm như “cam kết đỗ”, “đảm bảo 10 điểm”, “bí quyết độc quyền”. Hệ thống trình bày
        phương pháp và dữ liệu; kết quả phụ thuộc vào nỗ lực của học sinh. Mọi thông tin về kỳ thi phải
        kèm nguồn chính thức và ghi rõ thời điểm cập nhật.
      </Callout>

      {/* GITA trong nhận diện */}
      <Card className="p-6">
        <h2 className="text-[16px] font-extrabold text-slate-900">Bốn màu của mô thức GITA</h2>
        <p className="mt-1 text-[12.5px] text-slate-500">
          Mỗi trụ cột có một màu cố định, dùng nhất quán trong biểu đồ, biểu mẫu và tài liệu đào tạo.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-2xl border border-slate-200">
              <div
                className="flex h-16 items-center justify-center text-3xl font-extrabold text-white"
                style={{ background: p.color }}
              >
                {p.letter}
              </div>
              <div className="p-3">
                <div className="text-[13px] font-extrabold text-slate-900">{p.name}</div>
                <div className="font-mono text-[11px] text-slate-500">{p.color}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
