/**
 * Rendering a page to HTML.
 *
 * Plain documents: no framework, no client router, critical CSS inline. A
 * content page that waits on a 700 KB application bundle before it paints is a
 * content page that loses on Core Web Vitals to a competitor with worse
 * content, and the application is one link away for anyone who wants it.
 *
 * Everything interpolated is escaped. These pages are generated from authored
 * data rather than from user input, so this is not defending against an
 * attacker — it is defending against an apostrophe in a Vietnamese sentence
 * silently breaking an attribute, which is the failure that actually happens.
 */

import { SITE, webPageSchema, type Block, type SiteConfig, type SitePage } from './model.ts';

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * JSON-LD goes inside a script element, so the one sequence that can break out
 * of it must not survive. Escaping the whole thing as HTML would corrupt the
 * JSON instead.
 */
function jsonLdScript(data: unknown): string {
  const json = JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

const CSS = `
:root{--ink:#111827;--muted:#4b5563;--line:#e5e7eb;--bg:#ffffff;--soft:#f6f7fb;--brand:#1f5fac;--accent:#e1252b}
@media(prefers-color-scheme:dark){:root{--ink:#e8eaf2;--muted:#a6adc0;--line:#242b3d;--bg:#0c0f1a;--soft:#151a2b;--brand:#7fb0ea}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
.wrap{max-width:44rem;margin:0 auto;padding:1.5rem 1.25rem 4rem}
header.top{border-bottom:1px solid var(--line)}
header.top .wrap{padding:1rem 1.25rem;display:flex;gap:1rem;align-items:center;justify-content:space-between}
.brand{font-weight:700;color:var(--brand);text-decoration:none;font-size:1.05rem}
.brand span{color:var(--accent)}
nav.top a{color:var(--muted);text-decoration:none;margin-left:1rem;font-size:.9rem}
nav.top a:hover{color:var(--ink)}
h1{font-size:1.9rem;line-height:1.25;letter-spacing:-.02em;margin:.75rem 0 1rem}
h2{font-size:1.3rem;line-height:1.3;margin:2.25rem 0 .75rem}
h3{font-size:1.05rem;margin:1.5rem 0 .5rem}
p{margin:0 0 1rem}
.lead{font-size:1.12rem;color:var(--ink)}
ul,ol{margin:0 0 1rem;padding-left:1.35rem}
li{margin:.4rem 0}
a{color:var(--brand)}
table{border-collapse:collapse;width:100%;margin:0 0 1.25rem;font-size:.94rem}
caption{caption-side:bottom;color:var(--muted);font-size:.85rem;padding-top:.5rem;text-align:left}
th,td{border-bottom:1px solid var(--line);padding:.55rem .6rem;text-align:left;vertical-align:top}
th{font-size:.8rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}
.scroll{overflow-x:auto}
.note{background:var(--soft);border-left:3px solid var(--brand);border-radius:6px;padding:.9rem 1rem;margin:0 0 1.25rem}
.note strong{display:block;margin-bottom:.25rem}
.note p{margin:0}
.qa{border-bottom:1px solid var(--line);padding:1rem 0}
.qa h3{margin:0 0 .4rem;font-size:1.02rem}
.qa p{margin:0;color:var(--muted)}
.links{list-style:none;padding:0;margin:0 0 1.25rem}
.links li{margin:0;border-bottom:1px solid var(--line)}
.links a{display:block;padding:.7rem 0;text-decoration:none}
.links a:hover{color:var(--accent)}
.links .note-line{display:block;color:var(--muted);font-size:.88rem;margin-top:.15rem}
.cta{display:block;background:var(--brand);color:#fff;padding:.9rem 1.1rem;border-radius:8px;text-decoration:none;margin:2rem 0 .5rem;font-weight:600}
.cta small{display:block;font-weight:400;opacity:.9;margin-top:.25rem}
.crumbs{font-size:.85rem;color:var(--muted);margin:0}
.crumbs a{color:var(--muted)}
footer{border-top:1px solid var(--line);margin-top:3rem}
footer .wrap{padding:1.5rem 1.25rem;color:var(--muted);font-size:.85rem}
footer a{color:var(--muted)}
`.trim();

function renderBlock(block: Block): string {
  const e = escapeHtml;
  switch (block.kind) {
    case 'lead':
      return `<p class="lead">${e(block.text)}</p>`;
    case 'p':
      return `<p>${e(block.text)}</p>`;
    case 'h2':
      return `<h2${block.id ? ` id="${e(block.id)}"` : ''}>${e(block.text)}</h2>`;
    case 'h3':
      return `<h3>${e(block.text)}</h3>`;
    case 'ul':
      return `<ul>${block.items.map((i) => `<li>${e(i)}</li>`).join('')}</ul>`;
    case 'ol':
      return `<ol>${block.items.map((i) => `<li>${e(i)}</li>`).join('')}</ol>`;
    case 'table':
      return `<div class="scroll"><table>${
        block.caption ? `<caption>${e(block.caption)}</caption>` : ''
      }<thead><tr>${block.head.map((h) => `<th scope="col">${e(h)}</th>`).join('')}</tr></thead><tbody>${block.rows
        .map((row) => `<tr>${row.map((cell) => `<td>${e(cell)}</td>`).join('')}</tr>`)
        .join('')}</tbody></table></div>`;
    case 'note':
      return `<div class="note"><strong>${e(block.title)}</strong><p>${e(block.text)}</p></div>`;
    case 'qa':
      return `<div class="qa"><h3>${e(block.question)}</h3><p>${e(block.answer)}</p></div>`;
    case 'links':
      return `<h2>${e(block.title)}</h2><ul class="links">${block.items
        .map(
          (item) =>
            `<li><a href="${e(item.href)}">${e(item.label)}${
              item.note ? `<span class="note-line">${e(item.note)}</span>` : ''
            }</a></li>`,
        )
        .join('')}</ul>`;
    case 'cta':
      return `<a class="cta" href="${e(block.href)}">${e(block.label)}<small>${e(block.note)}</small></a>`;
  }
}

export function renderPage(page: SitePage, site: SiteConfig = SITE): string {
  const e = escapeHtml;
  const url = `${site.origin}${page.path}`;
  const schemas = [...page.jsonLd, webPageSchema(site, page)];

  const crumbs =
    page.trail.length > 0
      ? `<p class="crumbs">${page.trail
          .map((c) => `<a href="${e(c.href)}">${e(c.label)}</a>`)
          .join(' › ')} › ${e(page.h1)}</p>`
      : '';

  return `<!doctype html>
<html lang="${site.locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${e(page.title)}</title>
<meta name="description" content="${e(page.description)}">
<link rel="canonical" href="${e(url)}">
<link rel="alternate" hreflang="${site.locale}" href="${e(url)}">
<link rel="alternate" hreflang="x-default" href="${e(url)}">
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${e(site.name)}">
<meta property="og:locale" content="vi_VN">
<meta property="og:title" content="${e(page.title)}">
<meta property="og:description" content="${e(page.description)}">
<meta property="og:url" content="${e(url)}">
<meta property="og:image" content="${e(site.origin + site.logoPath)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${e(page.title)}">
<meta name="twitter:description" content="${e(page.description)}">
<link rel="icon" href="/icon.svg">
<style>${CSS}</style>
${schemas.map(jsonLdScript).join('\n')}
</head>
<body>
<header class="top"><div class="wrap">
<a class="brand" href="/">SAT<span>365</span></a>
<nav class="top" aria-label="Điều hướng chính">
<a href="/khoa-hoc/">Khoá học</a>
<a href="/bai-giang/">Bài giảng</a>
<a href="/tu-vung-sat/">Từ vựng</a>
<a href="/cau-hoi-thuong-gap/">Hỏi đáp</a>
</nav>
</div></header>
<main class="wrap">
${crumbs}
<h1>${e(page.h1)}</h1>
${page.blocks.map(renderBlock).join('\n')}
</main>
<footer><div class="wrap">
<p>${e(site.legalName)} — nền tảng luyện thi Digital SAT. Cập nhật ${e(site.updated)}.</p>
<p><a href="/phuong-phap-cham-diem/">Cách chấm điểm và sai số</a> · <a href="/chung-nhan/">Chứng nhận</a> · <a href="/de-thi-thu/">Đề thi thử</a></p>
<p>Điểm và chứng nhận trên nền tảng này là chuẩn nội bộ, không phải điểm SAT của College Board.</p>
</div></footer>
</body>
</html>`;
}

export function renderSitemap(pages: readonly SitePage[], site: SiteConfig = SITE): string {
  const entries = pages
    .map(
      (page) =>
        `  <url>\n    <loc>${escapeHtml(site.origin + page.path)}</loc>\n    <lastmod>${site.updated}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority.toFixed(1)}</priority>\n  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

export function renderRobots(site: SiteConfig = SITE): string {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    '# The application itself is a hash-routed single page. Its routes are not',
    '# separate URLs and carry no crawlable content; the static pages above',
    '# are where the content lives.',
    'Disallow: /assets/',
    '',
    `Sitemap: ${site.origin}/sitemap.xml`,
    '',
  ].join('\n');
}
