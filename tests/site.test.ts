/**
 * The crawlable site.
 *
 * These tests are the difference between a site that is technically
 * indexable and one that ranks. Every one of them covers a defect that is
 * invisible in a browser and fatal in a search index: two pages competing for
 * the same query with the same title, a canonical pointing at a relative path,
 * an internal link to a page that was never generated, structured data that
 * fails to parse.
 *
 * One is a policy check rather than a quality check. Emitting Review or
 * AggregateRating markup for reviews a site does not have earns a manual
 * action, which costs more traffic than the stars ever returned — so the test
 * refuses it at the source rather than trusting an author to remember.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { SITE } from '../src/site/model.ts';
import { buildPages } from '../src/site/pages.ts';
import { escapeHtml, renderPage, renderRobots, renderSitemap } from '../src/site/render.ts';

const pages = buildPages();

test('every page has a unique path, and paths are site-absolute', () => {
  const seen = new Set<string>();
  for (const page of pages) {
    assert.ok(page.path.startsWith('/'), `${page.path}: not site-absolute`);
    assert.ok(page.path === '/' || page.path.endsWith('/'), `${page.path}: no trailing slash`);
    assert.ok(!seen.has(page.path), `${page.path}: duplicate`);
    seen.add(page.path);
  }
});

test('no two pages compete for the same query with the same title', () => {
  const titles = new Map<string, string>();
  for (const page of pages) {
    const prior = titles.get(page.title);
    assert.equal(prior, undefined, `"${page.title}" is used by both ${prior} and ${page.path}`);
    titles.set(page.title, page.path);
  }
});

test('descriptions are unique, and none is a duplicate of another page', () => {
  const seen = new Map<string, string>();
  for (const page of pages) {
    const prior = seen.get(page.description);
    assert.equal(prior, undefined, `${page.path} repeats the description of ${prior}`);
    seen.set(page.description, page.path);
  }
});

test('titles and descriptions fit what a search result actually shows', () => {
  for (const page of pages) {
    assert.ok(page.title.length >= 20, `${page.path}: title too short (${page.title.length})`);
    assert.ok(page.title.length <= 70, `${page.path}: title truncated at (${page.title.length})`);
    assert.ok(
      page.description.length >= 110 && page.description.length <= 165,
      `${page.path}: description is ${page.description.length} characters`,
    );
  }
});

test('every page has one h1 and real content beneath it', () => {
  for (const page of pages) {
    assert.ok(page.h1.trim().length > 10, `${page.path}: thin h1`);
    const html = renderPage(page);
    assert.equal(html.match(/<h1[ >]/g)?.length, 1, `${page.path}: not exactly one h1`);

    // Thin pages do not rank, and a generated page is the easiest kind to
    // leave thin without noticing.
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    assert.ok(text.length > 900, `${page.path}: only ${text.length} characters of text`);
  }
});

test('every internal link resolves to a page that is generated', () => {
  const known = new Set(pages.map((p) => p.path));
  const broken: string[] = [];

  for (const page of pages) {
    const html = renderPage(page);
    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      const href = match[1];
      // External, in-page, and links into the hash-routed application.
      if (!href.startsWith('/') || href.startsWith('/app/') || href.startsWith('/#')) continue;
      if (href === '/icon.svg' || href.startsWith('/sitemap') || href.startsWith('/robots')) continue;
      if (!known.has(href)) broken.push(`${page.path} → ${href}`);
    }
  }

  assert.deepEqual(broken, []);
});

test('the canonical is absolute and matches the page it is on', () => {
  for (const page of pages) {
    const html = renderPage(page);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(canonical, `${SITE.origin}${page.path}`, `${page.path}: wrong canonical`);
    assert.ok(canonical!.startsWith('https://'), 'a relative canonical is not a canonical');
  }
});

test('every page carries the head tags a result page reads', () => {
  for (const page of pages) {
    const html = renderPage(page);
    for (const needle of [
      '<meta name="description"',
      '<meta name="robots" content="index,follow',
      '<meta property="og:title"',
      '<meta property="og:url"',
      '<meta name="twitter:card"',
      '<link rel="alternate" hreflang="vi"',
      'hreflang="x-default"',
      '<html lang="vi">',
    ]) {
      assert.ok(html.includes(needle), `${page.path}: missing ${needle}`);
    }
  }
});

test('all structured data parses, and declares a type', () => {
  for (const page of pages) {
    const html = renderPage(page);
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    assert.ok(blocks.length >= 1, `${page.path}: no structured data`);
    for (const [, body] of blocks) {
      const parsed = JSON.parse(body.replace(/\\u003c/g, '<'));
      assert.ok(parsed['@type'], `${page.path}: structured data with no @type`);
      assert.equal(parsed['@context'], 'https://schema.org');
    }
  }
});

test('no page claims reviews or ratings the site does not have', () => {
  // Marking up ratings that do not exist earns a manual action, and
  // self-serving review markup is ignored in any case. The temptation is to
  // add it "temporarily", so it is refused here rather than in review.
  for (const page of pages) {
    const html = renderPage(page);
    for (const banned of ['AggregateRating', '"Review"', 'ratingValue', 'reviewCount']) {
      assert.ok(!html.includes(banned), `${page.path}: emits ${banned} without real reviews`);
    }
  }
});

test('a breadcrumb trail is emitted for every page below the root', () => {
  for (const page of pages) {
    const html = renderPage(page);
    const crumbs = html.match(/"@type": "BreadcrumbList"/g);
    assert.ok(crumbs, `${page.path}: no breadcrumb structured data`);
    if (page.path !== '/') {
      assert.ok(html.includes('class="crumbs"'), `${page.path}: no visible breadcrumb`);
    }
  }
});

test('the site states its limits on every page, not only where convenient', () => {
  // The trust position this whole platform runs on is that limits are stated
  // before they are discovered. A footer that dropped the disclaimer on the
  // sales pages would be the one place it mattered most.
  for (const page of pages) {
    const html = renderPage(page);
    assert.ok(
      html.includes('không phải điểm SAT của College Board'),
      `${page.path}: does not carry the disclaimer`,
    );
  }
});

test('user text cannot break out of an attribute or a script', () => {
  assert.equal(escapeHtml(`a"b'c<d>e&f`), 'a&quot;b&#39;c&lt;d&gt;e&amp;f');

  const html = renderPage({
    ...pages[0],
    title: 'A "quoted" <title>',
    description: "An apostrophe's description that is long enough to pass the length checks in this suite",
    h1: 'Heading with <script>alert(1)</script>',
  });
  assert.ok(!html.includes('<script>alert(1)</script>'));
  assert.ok(html.includes('&lt;script&gt;'));
});

test('the sitemap lists every page exactly once, with absolute locations', () => {
  const xml = renderSitemap(pages);
  assert.ok(xml.startsWith('<?xml'));
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(locs.length, pages.length);
  assert.equal(new Set(locs).size, locs.length, 'the sitemap repeats a URL');
  for (const loc of locs) assert.ok(loc.startsWith(`${SITE.origin}/`), `relative loc: ${loc}`);
});

test('robots allows the content and points at the sitemap', () => {
  const robots = renderRobots();
  assert.ok(robots.includes('User-agent: *'));
  assert.ok(robots.includes('Allow: /'));
  assert.ok(robots.includes(`Sitemap: ${SITE.origin}/sitemap.xml`));
});

test('the site covers the queries it is built to answer', () => {
  const paths = new Set(pages.map((p) => p.path));
  for (const required of [
    '/',
    '/khoa-hoc/',
    '/bai-giang/',
    '/tu-vung-sat/',
    '/de-thi-thu/',
    '/phuong-phap-cham-diem/',
    '/chung-nhan/',
    '/cau-hoi-thuong-gap/',
  ]) {
    assert.ok(paths.has(required), `missing page: ${required}`);
  }
  // A lesson page each, so a search for a specific skill has somewhere to land.
  assert.ok(pages.filter((p) => p.path.startsWith('/bai-giang/')).length >= 25);
});

test('the FAQ page emits question-and-answer structured data that matches the visible text', () => {
  const faq = pages.find((p) => p.path === '/cau-hoi-thuong-gap/')!;
  const html = renderPage(faq);
  const schema = JSON.parse(
    html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)![1].replace(/\\u003c/g, '<'),
  );
  assert.equal(schema['@type'], 'FAQPage');
  assert.ok(schema.mainEntity.length >= 8);

  // Structured data that does not match the page is a violation, not a trick.
  for (const entry of schema.mainEntity) {
    assert.ok(html.includes(escapeHtml(entry.name)), `question not visible on the page: ${entry.name}`);
    assert.ok(
      html.includes(escapeHtml(entry.acceptedAnswer.text)),
      `answer not visible on the page: ${entry.name}`,
    );
  }
});
