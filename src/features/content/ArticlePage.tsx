import { useMemo } from 'react';
import { ARTICLE_BY_PATH, FAQS, type Article } from '../../data/articles';
import { SEO_BY_PATH } from '../../data/seo';
import { Link, useRoute } from '../../lib/router';
import { Badge, Card, CardHeader, EmptyState } from '../../components/ui/primitives';

/**
 * TRANG NOI DUNG
 *
 * SEO khong phai chuyen the meta. The meta giup Google HIEU mot trang; cai
 * quyet dinh trang do co duoc xep hang khong la no co TRA LOI DUOC cau nguoi
 * ta go vao o tim kiem hay khong.
 *
 * Nen bo cuc o day dat cau tra loi NGAN len ngay dau — truoc moi thu khac.
 * Nguoi tim "le phi thi HSA bao nhieu" can con so trong ba giay, khong can doc
 * mot bai gioi thieu. Phuc vu ho dung y do la thu Google do bang thoi gian o
 * lai va ti le quay lai ket qua tim kiem.
 */
export function ArticlePage() {
  const route = useRoute();
  const article = ARTICLE_BY_PATH.get(route.path);

  if (!article) {
    return (
      <EmptyState
        heading="h1"
        icon="📄"
        title="Không tìm thấy bài viết"
        description="Đường dẫn không trỏ tới bài nào. Xem các bài đang có ở trung tâm nội dung."
      />
    );
  }

  return <ArticleView article={article} />;
}

function ArticleView({ article }: { article: Article }) {
  const related = useMemo(
    () =>
      article.related
        .map((path) => ({ path, seo: SEO_BY_PATH.get(path) }))
        .filter((r): r is { path: string; seo: NonNullable<typeof r.seo> } => Boolean(r.seo)),
    [article.related],
  );

  const isFaqPage = article.path === '/cau-hoi-thuong-gap';

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <nav aria-label="Đường dẫn phân cấp" className="text-xs text-fg-subtle">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link to="/" className="underline-offset-2 hover:underline">
              Trang chủ
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            <Link to="/hsa-la-gi" className="underline-offset-2 hover:underline">
              Kiến thức về kỳ thi
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="text-fg-muted">
            {article.title}
          </li>
        </ol>
      </nav>

      <header>
        <Badge tone="brand">Kiến thức về kỳ thi</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{article.title}</h1>
        <p className="mt-2 text-sm text-fg-subtle">
          Cập nhật {article.updatedAt} · đọc khoảng {article.readingMinutes} phút
        </p>
      </header>

      {/* Cau tra loi ngan dat truoc moi thu khac: nguoi tim mot con so can no
          trong ba giay, khong can doc mot bai gioi thieu. */}
      <p className="rounded-xl border-l-4 border-l-brand bg-brand-soft p-4 text-base leading-relaxed text-fg">
        {article.answer}
      </p>

      {article.sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight text-fg">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-[0.9375rem] leading-relaxed text-fg-muted">
              {paragraph}
            </p>
          ))}

          {section.list && (
            <ul className="space-y-2">
              {section.list.map((item) => (
                <li key={item} className="flex gap-2 text-[0.9375rem] text-fg-muted">
                  <span aria-hidden="true" className="text-brand">
                    ▸
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {section.table && (
            <figure className="overflow-x-auto">
              <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
                <caption className="mb-2 text-left text-xs text-fg-subtle">
                  {section.table.caption}
                </caption>
                <thead>
                  <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-subtle">
                    {section.table.head.map((cell) => (
                      <th key={cell} scope="col" className="px-2 py-2">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row) => (
                    <tr key={row.join('|')} className="border-b border-line/60">
                      {row.map((cell, i) =>
                        i === 0 ? (
                          <th key={cell} scope="row" className="px-2 py-2 font-medium text-fg">
                            {cell}
                          </th>
                        ) : (
                          <td key={cell} className="px-2 py-2 text-fg-muted">
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          )}
        </section>
      ))}

      {isFaqPage && (
        <section className="space-y-4">
          {FAQS.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-line bg-surface-2 p-4">
              <h2 className="text-base font-semibold text-fg">{faq.question}</h2>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-fg-muted">{faq.answer}</p>
            </div>
          ))}
        </section>
      )}

      <Card>
        <CardHeader
          title="Nguồn"
          subtitle="Mọi con số trong bài lấy từ nguồn chính thức. Hãy kiểm tra lại trước mỗi mùa tuyển sinh — quy chế có thể thay đổi."
        />
        <ul className="space-y-1.5">
          {article.sources.map((source) => (
            <li key={source.url} className="text-sm">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand underline underline-offset-2"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </Card>

      {related.length > 0 && (
        <nav aria-label="Bài liên quan">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-subtle">
            Đọc tiếp
          </h2>
          <ul className="mt-3 space-y-2">
            {related.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="block rounded-xl border border-line bg-surface-2 p-3 hover:border-line-strong"
                >
                  <span className="text-sm font-medium text-fg">{item.seo.title}</span>
                  <span className="mt-0.5 block text-xs text-fg-muted">{item.seo.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </article>
  );
}

/** Trang cau hoi thuong gap — dung chung bo cuc nhung khong co phan than bai. */
export function FaqPage() {
  return (
    <ArticleView
      article={{
        path: '/cau-hoi-thuong-gap',
        title: 'Câu hỏi thường gặp về kỳ thi HSA',
        question: 'Những câu hỏi hay gặp nhất về kỳ thi HSA và cách ôn luyện.',
        answer:
          'Tám câu hỏi được hỏi nhiều nhất về kỳ thi Đánh giá năng lực HSA của ĐHQGHN: số lượt thi, lệ phí, cấu trúc đề, cách chấm, và cách bắt đầu ôn.',
        updatedAt: '2026-08',
        readingMinutes: 4,
        sections: [],
        sources: [
          {
            label: 'Viện Đào tạo số và Khảo thí, ĐHQGHN — trang chính thức kỳ thi HSA',
            url: 'https://hsa.edu.vn',
          },
        ],
        related: ['/hsa-la-gi', '/cau-truc-de-thi-hsa', '/lo-trinh-on-thi-hsa'],
      }}
    />
  );
}
