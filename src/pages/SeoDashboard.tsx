import { useMemo, useState } from 'react';
import { go } from '@/state';
import { auditPage, seoFor, SITE, type SeoAudit } from '@/lib/seo';
import { PAGES, allIndexablePaths, topicSlug, paperSlug } from '@/lib/routes';
import { KEYWORDS, INTENT_META, keywordStats, type Intent } from '@/data/keywords';
import { FAQS } from '@/data/faq';
import { TOPICS } from '@/data/topics';
import { EXAM_PAPERS } from '@/data/papers';
import { Card, SectionTitle, Badge, Callout, Progress } from '@/components/ui';

/**
 * Bảng điều khiển SEO nội bộ.
 *
 * Mục đích không phải để khoe điểm mà để đội ngũ tự duy trì được chất lượng sau
 * khi nội dung mới được thêm vào: trang nào thiếu từ khoá chính, tiêu đề nào bị
 * cắt trên trang kết quả, trang nào thiếu dữ liệu có cấu trúc.
 */

type Tab = 'kiem-tra' | 'tu-khoa' | 'ban-do' | 'trien-khai';

const TABS: { id: Tab; label: string }[] = [
  { id: 'kiem-tra', label: 'Tự kiểm tra trang' },
  { id: 'tu-khoa', label: 'Bản đồ từ khoá' },
  { id: 'ban-do', label: 'Sơ đồ trang' },
  { id: 'trien-khai', label: 'Checklist triển khai' },
];

export default function SeoDashboard() {
  const [tab, setTab] = useState<Tab>('kiem-tra');

  const audits = useMemo<SeoAudit[]>(() => {
    const out: SeoAudit[] = [];
    for (const p of PAGES) {
      if (p.id === 'chuyen-de-detail' || p.id === 'huong-dan-on') {
        out.push(auditPage(p.id, { slug: topicSlug(TOPICS[0].id) }));
      } else if (p.id === 'de-thi-detail') {
        out.push(auditPage(p.id, { slug: paperSlug(EXAM_PAPERS[0].id) }));
      } else {
        out.push(auditPage(p.id));
      }
    }
    return out;
  }, []);

  const indexable = audits.filter((a) => !a.noindex);
  const withIssues = indexable.filter((a) => a.issues.length);
  const health = Math.round(((indexable.length - withIssues.length) / Math.max(1, indexable.length)) * 100);
  const paths = allIndexablePaths();
  const ks = keywordStats();

  return (
    <div className="space-y-6">
      <SectionTitle
        eyebrow="Công cụ nội bộ"
        title="Bảng điều khiển SEO"
        desc="Trang này không được lập chỉ mục. Nó tồn tại để đội ngũ tự kiểm tra chất lượng SEO mỗi khi thêm nội dung mới, thay vì phải nhớ hết quy tắc trong đầu."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { k: 'Trang được lập chỉ mục', v: String(paths.length), s: `${indexable.length} mẫu trang khác nhau` },
          { k: 'Trang không có lỗi', v: `${health}%`, s: `${withIssues.length} mẫu trang còn cảnh báo` },
          { k: 'Từ khoá đã gán', v: String(ks.total), s: `${ks.pages} trang phụ trách · trùng ${ks.duplicates}` },
          { k: 'Câu hỏi thường gặp', v: String(FAQS.length), s: 'khớp với dữ liệu có cấu trúc' },
        ].map((c) => (
          <Card key={c.k} className="p-4">
            <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{c.k}</div>
            <div className="mt-0.5 text-2xl font-extrabold tabular-nums text-brand-700">{c.v}</div>
            <div className="text-[12px] text-slate-500">{c.s}</div>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            className="chip"
            style={tab === t.id ? { background: '#1B4F9C', color: '#fff' } : { background: '#eef1f6', color: '#334155' }}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'kiem-tra' && (
        <>
          <Callout tone="brand" title="Quy tắc đang được kiểm tra">
            Tiêu đề 25–70 ký tự, mô tả 90–160 ký tự, từ khoá chính có mặt trong tiêu đề, có tiêu đề
            cấp một, và có đủ ba khối dữ liệu có cấu trúc nền (tổ chức, trang, đường dẫn phân cấp).
          </Callout>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-2.5">Trang</th>
                    <th className="px-3 py-2.5">Tiêu đề</th>
                    <th className="px-3 py-2.5">Dài</th>
                    <th className="px-3 py-2.5">Mô tả</th>
                    <th className="px-3 py-2.5">Từ khoá chính</th>
                    <th className="px-3 py-2.5">Dữ liệu cấu trúc</th>
                    <th className="px-3 py-2.5">Cảnh báo</th>
                  </tr>
                </thead>
                <tbody>
                  {audits.map((a) => (
                    <tr key={a.page} className="border-b border-slate-100 align-top last:border-0">
                      <td className="px-4 py-2.5">
                        <button className="font-semibold text-brand-700 hover:underline" onClick={() => go(a.path)}>
                          {a.path}
                        </button>
                        {a.noindex && (
                          <div className="mt-0.5">
                            <Badge tone="slate">không lập chỉ mục</Badge>
                          </div>
                        )}
                      </td>
                      <td className="max-w-[280px] px-3 py-2.5 text-slate-700">{a.title}</td>
                      <td className="px-3 py-2.5 tabular-nums">
                        <span className={a.titleLen > 70 || a.titleLen < 25 ? 'font-bold text-rose-600' : 'text-slate-600'}>
                          {a.titleLen}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 tabular-nums">
                        <span className={a.descLen > 160 || a.descLen < 90 ? 'font-bold text-rose-600' : 'text-slate-600'}>
                          {a.descLen}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        {a.focusKeyword ? (
                          <span className={a.keywordInTitle ? 'text-emerald-700' : 'text-amber-700'}>
                            {a.keywordInTitle ? '✓' : '△'} {a.focusKeyword}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2.5">
                        <div className="flex flex-wrap gap-1">
                          {a.jsonLdTypes.length ? (
                            a.jsonLdTypes.map((t, i) => (
                              <span key={`${t}-${i}`} className="chip bg-slate-100 text-[10px] text-slate-600">
                                {t}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        {a.issues.length ? (
                          <ul className="space-y-0.5">
                            {a.issues.map((x) => (
                              <li key={x} className="text-[11.5px] leading-snug text-rose-700">
                                • {x}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="font-semibold text-emerald-600">Không có</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {tab === 'tu-khoa' && (
        <>
          <Callout tone="brand" title="Một từ khoá, một trang">
            Hai trang cùng nhắm một từ khoá sẽ tự cạnh tranh nhau và cả hai cùng tụt hạng. Bảng dưới
            đây kiểm tra điều đó: cột trùng lặp phải luôn bằng 0.
          </Callout>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ks.byIntent.map(([intent, count]) => {
              const m = INTENT_META[intent as Intent];
              return (
                <Card key={intent} className="p-4">
                  <div className="mb-2 h-1 w-10 rounded-full" style={{ background: m.color }} />
                  <div className="text-[13px] font-extrabold" style={{ color: m.color }}>
                    {m.label}
                  </div>
                  <div className="text-2xl font-extrabold tabular-nums text-slate-900">{count}</div>
                  <div className="mt-1 text-[11.5px] leading-relaxed text-slate-500">{m.note}</div>
                </Card>
              );
            })}
          </div>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-[12.5px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-2.5">Từ khoá</th>
                    <th className="px-3 py-2.5">Ý định</th>
                    <th className="px-3 py-2.5">Trang phụ trách</th>
                    <th className="px-3 py-2.5">Câu hỏi ẩn sau từ khoá</th>
                    <th className="px-3 py-2.5">Mức đáp ứng</th>
                  </tr>
                </thead>
                <tbody>
                  {KEYWORDS.map((k) => {
                    const m = INTENT_META[k.intent];
                    const a = seoFor(k.page);
                    return (
                      <tr key={k.keyword} className="border-b border-slate-100 align-top last:border-0">
                        <td className="px-4 py-2.5 font-semibold text-slate-800">{k.keyword}</td>
                        <td className="px-3 py-2.5">
                          <span className="chip" style={{ background: `${m.color}18`, color: m.color }}>
                            {m.label}
                          </span>
                        </td>
                        <td className="px-3 py-2.5">
                          <button className="text-brand-700 hover:underline" onClick={() => go(a.canonical.replace(SITE.origin, ''))}>
                            {a.canonical.replace(SITE.origin, '')}
                          </button>
                        </td>
                        <td className="max-w-[300px] px-3 py-2.5 text-slate-600">{k.behind}</td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-1.5">
                            <span className="tabular-nums font-bold text-slate-800">{k.fit}/5</span>
                            <span className="inline-block h-1.5 w-12 overflow-hidden rounded-full bg-slate-200">
                              <span
                                className="block h-full rounded-full"
                                style={{ width: `${(k.fit / 5) * 100}%`, background: m.color }}
                              />
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {tab === 'ban-do' && (
        <>
          <Callout tone="brand" title="Sơ đồ trang được sinh tự động">
            Tệp sitemap.xml và robots.txt được dựng lại mỗi lần build từ chính bản đồ đường dẫn, nên
            không bao giờ lệch với nội dung thật. Thêm một chuyên đề mới là sơ đồ trang tự có thêm
            hai địa chỉ.
          </Callout>
          <Card className="p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-[14px] font-extrabold text-slate-900">
                {paths.length} địa chỉ được lập chỉ mục
              </span>
              <span className="font-mono text-[12px] text-slate-500">{SITE.origin}/sitemap.xml</span>
            </div>
            <div className="mt-3">
              <Progress
                value={(paths.length / Math.max(paths.length, 1)) * 100}
                label={`Cập nhật gần nhất ${SITE.updated.split('-').reverse().join('/')}`}
                tone="#1B4F9C"
              />
            </div>
            <div className="mt-4 max-h-[420px] space-y-1 overflow-y-auto rounded-xl border border-slate-200 p-3">
              {paths.map((p) => (
                <div key={p.path} className="flex items-baseline justify-between gap-3 border-b border-slate-100 py-1 last:border-0">
                  <button className="truncate font-mono text-[12px] text-brand-700 hover:underline" onClick={() => go(p.path)}>
                    {p.path}
                  </button>
                  <span className="shrink-0 text-[11px] text-slate-400">
                    ưu tiên {p.page.priority} · {p.page.changefreq}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {tab === 'trien-khai' && <DeployChecklist />}
    </div>
  );
}

function DeployChecklist() {
  const groups: { name: string; note: string; items: { t: string; d: string; done: boolean }[] }[] = [
    {
      name: 'Đã xong trong mã nguồn',
      note: 'Những việc này đã nằm trong bản dựng, không cần làm thêm.',
      items: [
        { t: 'Đường dẫn thật thay cho router dạng hash', d: 'Mọi trang nội dung có địa chỉ riêng, lập chỉ mục được. Liên kết hash cũ tự chuyển hướng.', done: true },
        { t: 'Dựng sẵn nội dung tĩnh cho từng trang', d: 'Mỗi địa chỉ có sẵn tiêu đề, mô tả, tiêu đề cấp một và nội dung đọc được ngay cả khi trình duyệt không chạy JavaScript.', done: true },
        { t: 'Dữ liệu có cấu trúc', d: 'Tổ chức giáo dục, trang web kèm hành động tìm kiếm, đường dẫn phân cấp, tài nguyên học tập, bộ đề và câu hỏi thường gặp.', done: true },
        { t: 'Sơ đồ trang và tệp robots', d: 'Sinh tự động khi build từ bản đồ đường dẫn.', done: true },
        { t: 'Địa chỉ chuẩn cho mọi trang', d: 'Mỗi nội dung có đúng một địa chỉ, tránh tự chia nhỏ tín hiệu.', done: true },
        { t: 'Thẻ chia sẻ mạng xã hội', d: 'Open Graph và Twitter Card cho mọi trang, có ảnh chia sẻ.', done: true },
        { t: 'Chia nhỏ mã nguồn theo trang', d: 'Trang chủ chỉ tải phần cần thiết, giúp chỉ số tải trang tốt hơn.', done: true },
      ],
    },
    {
      name: 'Phải làm khi triển khai lên tên miền thật',
      note: 'Không thể làm sẵn trong mã nguồn vì phụ thuộc hạ tầng của bạn.',
      items: [
        { t: 'Đổi tên miền trong cấu hình', d: 'Sửa SITE.origin trong src/lib/seo.ts thành tên miền thật trước khi build. Toàn bộ địa chỉ chuẩn và sơ đồ trang lấy từ đó.', done: false },
        { t: 'Bật HTTPS và chuyển hướng về một tên miền duy nhất', d: 'Chọn có hoặc không có www rồi chuyển hướng vĩnh viễn phần còn lại về đó.', done: false },
        { t: 'Cấu hình máy chủ trả về trang chủ cho mọi đường dẫn chưa khớp', d: 'Bản dựng đã có sẵn tệp HTML riêng cho từng địa chỉ, nhưng vẫn cần quy tắc dự phòng cho đường dẫn lạ.', done: false },
        { t: 'Khai báo trong Google Search Console', d: 'Xác minh quyền sở hữu, gửi sơ đồ trang, theo dõi báo cáo lập chỉ mục và trải nghiệm trang.', done: false },
        { t: 'Bật nén và bộ nhớ đệm', d: 'Nén Brotli hoặc Gzip cho HTML, CSS, JS; đặt thời gian lưu đệm dài cho tệp có mã băm trong tên.', done: false },
        { t: 'Đo chỉ số trải nghiệm trang trên thiết bị thật', d: 'Đo LCP, INP và CLS bằng dữ liệu người dùng thật, không chỉ bằng công cụ mô phỏng.', done: false },
      ],
    },
    {
      name: 'Việc duy trì hằng tháng',
      note: 'Thứ hạng không giữ được bằng một lần tối ưu.',
      items: [
        { t: 'Đối chiếu ma trận đề với công bố chính thức', d: 'Trước mỗi mùa thi. Nội dung lỗi thời là rủi ro uy tín lớn nhất của lĩnh vực này.', done: false },
        { t: 'Cập nhật ngày sửa nội dung', d: 'Sửa SITE.updated khi có thay đổi nội dung đáng kể, để dữ liệu có cấu trúc phản ánh đúng.', done: false },
        { t: 'Rà bảng tự kiểm tra sau mỗi lần thêm nội dung', d: 'Cột cảnh báo phải trống. Thêm chuyên đề mới thì gán luôn từ khoá chính cho nó.', done: false },
        { t: 'Bổ sung câu hỏi thường gặp từ câu hỏi thật', d: 'Lấy từ câu học sinh và phụ huynh hỏi nhiều nhất, không tự nghĩ ra.', done: false },
        { t: 'Chỉ gắn đánh giá sao khi có đánh giá thật', d: 'Dữ liệu đánh giá bịa vi phạm nguyên tắc của công cụ tìm kiếm và phá đúng thứ nó định tạo ra.', done: false },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <Card key={g.name} className="p-5">
          <div className="text-[15px] font-extrabold text-slate-900">{g.name}</div>
          <div className="mt-0.5 text-[12.5px] text-slate-500">{g.note}</div>
          <div className="mt-3 space-y-2">
            {g.items.map((it) => (
              <div key={it.t} className="flex gap-3 rounded-lg border border-slate-200 px-3.5 py-2.5">
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                    it.done ? 'bg-emerald-600' : 'bg-slate-300'
                  }`}
                >
                  {it.done ? '✓' : '·'}
                </span>
                <div className="min-w-0">
                  <div className="text-[13px] font-bold text-slate-800">{it.t}</div>
                  <div className="mt-0.5 text-[12.5px] leading-relaxed text-slate-600">{it.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
