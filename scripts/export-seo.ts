/**
 * Sinh sitemap.xml va robots.txt tu bang route.
 *
 * Sinh thay vi go tay vi mot sitemap go tay se lech khoi thuc te ngay lan them
 * trang tiep theo — va mot sitemap lech con hai hon la khong co sitemap: no bao
 * bo thu thap di den nhung dia chi khong ton tai.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROUTES_SEO } from '../src/data/seo';

const SITE = (process.env.VITE_SITE_URL ?? '').replace(/\/$/, '');
const OUT = 'public';
mkdirSync(OUT, { recursive: true });

if (!SITE) {
  console.warn(
    'Chưa đặt VITE_SITE_URL — sitemap sẽ dùng đường dẫn tương đối và Google sẽ bỏ qua.\n' +
      'Đặt biến này khi build cho môi trường thật: VITE_SITE_URL=https://ten-mien.vn npm run build',
  );
}

const today = new Date().toISOString().slice(0, 10);
const indexable = ROUTES_SEO.filter((r) => r.index);

const urls = indexable
  .map(
    (route) => `  <url>
    <loc>${SITE}${route.path === '/' ? '/' : route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n');

writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${urls}
</urlset>
`.replace('www.sitemap.org', 'www.sitemaps.org'),
  'utf8',
);

/**
 * robots.txt.
 *
 * Chan cac duong dan chua du lieu hoc tap ca nhan. Khong phai vi bao mat —
 * chung khong truy cap duoc tu ben ngoai — ma vi mot trang trong rong doi voi
 * khach la nam trong chi muc se keo tin hieu chat luong cua ca ten mien xuong.
 */
const disallow = ROUTES_SEO.filter((r) => !r.index)
  .map((r) => `Disallow: ${r.path}`)
  .join('\n');

writeFileSync(
  join(OUT, 'robots.txt'),
  `User-agent: *
Allow: /
${disallow}

${SITE ? `Sitemap: ${SITE}/sitemap.xml` : '# Đặt VITE_SITE_URL rồi chạy lại để có dòng Sitemap'}
`,
  'utf8',
);

console.log(
  `Đã sinh sitemap.xml (${indexable.length} đường dẫn) và robots.txt vào ${OUT}/`,
);
