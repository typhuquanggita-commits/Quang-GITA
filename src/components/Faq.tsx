import { useState } from 'react';
import type { FaqItem } from '@/data/faq';
import { Card } from '@/components/ui';

/**
 * Khối câu hỏi thường gặp.
 *
 * Nội dung ở đây khớp một–một với dữ liệu có cấu trúc FAQPage gửi cho công cụ
 * tìm kiếm. Nếu hai bên lệch nhau thì dữ liệu có cấu trúc trở thành khai báo
 * sai sự thật — vì vậy cả hai cùng đọc từ một nguồn duy nhất.
 */
export function Faq({ items, title = 'Câu hỏi thường gặp' }: { items: FaqItem[]; title?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items.length) return null;
  return (
    <section>
      <h2 className="mb-3 text-[17px] font-extrabold text-slate-900">{title}</h2>
      <Card className="divide-y divide-slate-100 overflow-hidden">
        {items.map((f, i) => (
          <div key={f.q}>
            <button
              className="flex w-full items-start justify-between gap-3 px-5 py-3.5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <h3 className="text-[14px] font-bold text-slate-900">{f.q}</h3>
              <span className="mt-0.5 shrink-0 text-[13px] font-bold text-slate-400">
                {open === i ? '−' : '+'}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-[13px] leading-relaxed text-slate-600">{f.a}</div>
            )}
          </div>
        ))}
      </Card>
    </section>
  );
}
