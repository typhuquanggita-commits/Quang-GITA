import { useEffect } from 'react';
import type { PageId } from '@/lib/routes';

/**
 * Cập nhật phần đầu tài liệu khi điều hướng trong ứng dụng.
 *
 * Bản dựng tĩnh đã ghi sẵn đầy đủ thẻ cho lần tải đầu tiên — đó mới là thứ công
 * cụ tìm kiếm đọc. Thành phần này lo phần còn lại: giữ cho tiêu đề, mô tả, địa
 * chỉ chuẩn và dữ liệu có cấu trúc luôn khớp với trang đang xem khi người dùng
 * bấm chuyển trang mà không tải lại.
 *
 * Mô-đun sinh dữ liệu SEO được nạp theo nhu cầu chứ không nhập tĩnh: nó cần tới
 * toàn bộ nội dung chuyên đề và đề mẫu, mà lần tải đầu tiên đã có sẵn phần đầu
 * đúng rồi nên không việc gì phải trả giá bằng gói mã khởi động nặng thêm.
 */

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

export function SeoHead({ page, params }: { page: PageId; params: Record<string, string> }) {
  useEffect(() => {
    let cancelled = false;
    void import('@/lib/seo').then(({ seoFor, SITE }) => {
      if (cancelled) return;
      const m = seoFor(page, params);

      document.title = m.title;
      document.documentElement.lang = SITE.lang;

      setMeta('name', 'description', m.description);
      setMeta('name', 'robots', m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1');
      setLink('canonical', m.canonical);

      setMeta('property', 'og:type', page === 'home' ? 'website' : 'article');
      setMeta('property', 'og:site_name', SITE.name);
      setMeta('property', 'og:locale', SITE.locale);
      setMeta('property', 'og:title', m.title);
      setMeta('property', 'og:description', m.description);
      setMeta('property', 'og:url', m.canonical);
      setMeta('property', 'og:image', `${SITE.origin}/og-image.svg`);

      setMeta('name', 'twitter:card', 'summary_large_image');
      setMeta('name', 'twitter:title', m.title);
      setMeta('name', 'twitter:description', m.description);
      setMeta('name', 'twitter:image', `${SITE.origin}/og-image.svg`);

      /* Dữ liệu có cấu trúc: xoá khối cũ rồi ghi khối mới, tránh chồng lấn giữa các trang. */
      document.head.querySelectorAll('script[data-seo-ld]').forEach((n) => n.remove());
      for (const block of m.jsonLd) {
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.setAttribute('data-seo-ld', '');
        s.textContent = JSON.stringify(block);
        document.head.appendChild(s);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [page, params]);

  return null;
}
