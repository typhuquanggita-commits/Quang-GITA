import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { MAX_TOTAL_SCORE, SECTIONS } from '../src/config';
import { ARTICLES, ARTICLE_BY_PATH, FAQS } from '../src/data/articles';
import { MAX_EXAM_ATTEMPTS_PER_YEAR, OFFICIAL_EXAM_FEE } from '../src/data/pricing';
import { ROUTES_SEO, SEO_BY_PATH, canonicalOf, fullTitle, indexableRoutes } from '../src/data/seo';

const TOTAL_QUESTIONS = SECTIONS.reduce((n, s) => n + s.questionCount, 0);
const TOTAL_MINUTES = SECTIONS.reduce((n, s) => n + s.minutes, 0);

describe('nền SEO', () => {
  it('mọi đường dẫn khai báo một lần, bắt đầu bằng gạch chéo', () => {
    const paths = ROUTES_SEO.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const path of paths) expect(path.startsWith('/'), path).toBe(true);
  });

  it('tiêu đề và mô tả nằm trong độ dài Google hiển thị được', () => {
    // Qua dai thi bi cat giua chung; qua ngan thi bo lo cho de noi ro trang
    // nay tra loi cai gi.
    for (const route of ROUTES_SEO) {
      if (!route.index) continue;
      expect(route.title.length, `${route.path} · tiêu đề`).toBeGreaterThan(25);
      expect(route.title.length, `${route.path} · tiêu đề`).toBeLessThanOrEqual(70);
      expect(route.description.length, `${route.path} · mô tả`).toBeGreaterThan(80);
      expect(route.description.length, `${route.path} · mô tả`).toBeLessThanOrEqual(200);
    }
  });

  it('mọi màn hình chứa dữ liệu học tập cá nhân đều bị chặn lập chỉ mục', () => {
    // Khong phai vi bao mat — chung khong truy cap duoc tu ngoai — ma vi mot
    // trang trong rong voi khach la nam trong chi muc keo tin hieu chat luong
    // cua ca ten mien xuong.
    const mustBlock = [
      '/profile',
      '/report',
      '/analytics',
      '/review',
      '/solutions',
      '/workspace',
      '/settings',
      '/roles',
      '/worksheet',
    ];
    for (const path of mustBlock) {
      expect(SEO_BY_PATH.get(path)?.index, path).toBe(false);
    }
  });

  it('mọi trang cho lập chỉ mục đều có nội dung thật cho khách lạ', () => {
    // Mot trang duoc lap chi muc ma khong co gi de doc la mot trang lam hai
    // chinh nhung trang tot cua cung ten mien.
    const contentPaths = new Set([
      '/',
      '/de-cuong',
      '/paper',
      '/chung-chi',
      '/hoc-phi',
      '/gita',
      '/cau-hoi-thuong-gap',
      ...ARTICLES.map((a) => a.path),
    ]);
    for (const route of indexableRoutes()) {
      expect(contentPaths.has(route.path), `${route.path} được lập chỉ mục nhưng chưa có nội dung`).toBe(true);
    }
  });

  it('sitemap chỉ chứa đường dẫn cho lập chỉ mục', () => {
    const xml = readFileSync(resolve(process.cwd(), 'public/sitemap.xml'), 'utf8');
    for (const route of ROUTES_SEO) {
      const loc = `<loc>${route.path === '/' ? '/' : route.path}</loc>`;
      if (route.index) expect(xml, route.path).toContain(loc);
      else expect(xml, `${route.path} không được có trong sitemap`).not.toContain(loc);
    }
  });

  it('robots chặn đúng các đường dẫn không cho lập chỉ mục', () => {
    const robots = readFileSync(resolve(process.cwd(), 'public/robots.txt'), 'utf8');
    for (const route of ROUTES_SEO.filter((r) => !r.index)) {
      expect(robots, route.path).toContain(`Disallow: ${route.path}`);
    }
    expect(robots).toContain('User-agent: *');
  });

  it('canonical rỗng khi chưa khai báo tên miền, thay vì bịa một địa chỉ', () => {
    // Mot canonical sai hai hon la khong co canonical: no gop nham hai trang
    // khac nhau lam mot.
    expect(canonicalOf('/hsa-la-gi')).toMatch(/^($|https?:\/\/)/);
    expect(fullTitle('/')).toContain('HSA365');
    expect(fullTitle('/khong-ton-tai')).toContain('HSA365');
  });
});

describe('nội dung trả lời ý định tìm kiếm', () => {
  it('mỗi bài trả lời trọn một câu hỏi, có câu trả lời ngắn đặt trước', () => {
    for (const article of ARTICLES) {
      expect(article.question.endsWith('?'), article.path).toBe(true);
      // Doan tra loi ngan la thu Google hay trich lam doan noi bat — no phai
      // tu du nghia khi doc mot minh.
      expect(article.answer.length, article.path).toBeGreaterThan(120);
      expect(article.answer.length, article.path).toBeLessThan(400);
    }
  });

  it('mỗi bài đều ghi nguồn và ngày cập nhật', () => {
    for (const article of ARTICLES) {
      expect(article.sources.length, article.path).toBeGreaterThan(0);
      for (const source of article.sources) {
        expect(source.url).toMatch(/^https:\/\//);
        expect(source.label.length).toBeGreaterThan(10);
      }
      expect(article.updatedAt).toMatch(/^\d{4}-\d{2}$/);
    }
  });

  it('mọi con số trong bài lấy từ nguồn duy nhất trong mã nguồn', () => {
    // Mot bai noi "150 cau" trong khi he thong dung 120 se pha huy long tin
    // nhanh hon bat ky loi ky thuat nao — va no chi xay ra khi con so duoc go
    // lai o hai noi.
    const hsa = ARTICLE_BY_PATH.get('/hsa-la-gi');
    expect(hsa?.answer).toContain(String(TOTAL_QUESTIONS));
    expect(hsa?.answer).toContain(String(TOTAL_MINUTES));
    expect(hsa?.answer).toContain(String(MAX_TOTAL_SCORE));

    const fee = OFFICIAL_EXAM_FEE.toLocaleString('vi-VN');
    expect(FAQS.some((f) => f.answer.includes(fee))).toBe(true);
    expect(FAQS.some((f) => f.answer.includes(String(MAX_EXAM_ATTEMPTS_PER_YEAR)))).toBe(true);
  });

  it('mỗi bài đều dẫn sang bài khác, không có bài cụt', () => {
    for (const article of ARTICLES) {
      expect(article.related.length, article.path).toBeGreaterThan(0);
      for (const path of article.related) {
        expect(SEO_BY_PATH.has(path), `${article.path} dẫn tới ${path} không tồn tại`).toBe(true);
      }
    }
  });

  it('câu hỏi thường gặp đủ tự đứng một mình khi Google trích ra', () => {
    expect(FAQS.length).toBeGreaterThanOrEqual(6);
    for (const faq of FAQS) {
      expect(faq.question.endsWith('?'), faq.question).toBe(true);
      expect(faq.answer.length, faq.question).toBeGreaterThan(80);
      // Khong duoc phu thuoc ngu canh cua trang: "nhu da noi o tren" la vo
      // nghia khi doan van bi trich ra ngoai ket qua tim kiem.
      expect(faq.answer).not.toMatch(/như (đã nói|trên)|ở trên|bên dưới/i);
    }
  });

  it('không bịa đánh giá hay số sao trong dữ liệu có cấu trúc', () => {
    // Danh dau du lieu khong ton tai tren trang — dac biet la review va rating
    // — vi pham chinh sach cua Google va dan toi hinh phat thu cong cho ca ten
    // mien. Bai test nay ton tai de dieu do khong bao gio duoc them vao.
    const head = readFileSync(resolve(process.cwd(), 'src/lib/head.ts'), 'utf8');
    expect(head).not.toContain('AggregateRating');
    expect(head).not.toContain('reviewCount');
    expect(head).not.toContain('ratingValue');
  });
});
