/**
 * Emits the crawlable site.
 *
 * Runs after `vite build`, which puts the application in `dist/app/`. This
 * writes the static pages, the sitemap and robots.txt into `dist/` itself, so
 * the root URL — the most valuable one a site has — is a document a crawler
 * can read rather than an empty div waiting on JavaScript.
 */

import { mkdirSync, copyFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { SITE } from '../src/site/model.ts';
import { buildPages } from '../src/site/pages.ts';
import { renderPage, renderRobots, renderSitemap } from '../src/site/render.ts';

const OUT = path.resolve(process.cwd(), 'dist');
const PUBLIC = path.resolve(process.cwd(), 'public');

// An origin baked into a canonical is a claim about where this site lives. A
// wrong one points every canonical at somebody else's domain, so it is
// overridable at build time and reported below.
if (process.env.SITE_ORIGIN) SITE.origin = process.env.SITE_ORIGIN.replace(/\/$/, '');

const pages = buildPages();

for (const page of pages) {
  const dir = page.path === '/' ? OUT : path.join(OUT, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), renderPage(page, SITE), 'utf8');
}

writeFileSync(path.join(OUT, 'sitemap.xml'), renderSitemap(pages, SITE), 'utf8');
writeFileSync(path.join(OUT, 'robots.txt'), renderRobots(SITE), 'utf8');

// The static pages reference /icon.svg, which vite copied into dist/app/.
for (const entry of readdirSync(PUBLIC)) {
  const source = path.join(PUBLIC, entry);
  if (statSync(source).isFile()) copyFileSync(source, path.join(OUT, entry));
}

const bytes = pages.reduce((n, page) => n + renderPage(page, SITE).length, 0);
console.log(
  `Site: ${pages.length} static pages, ${(bytes / 1024).toFixed(0)} KB of HTML, origin ${SITE.origin}`,
);
console.log(`      sitemap.xml, robots.txt, application at ${SITE.origin}/app/`);
