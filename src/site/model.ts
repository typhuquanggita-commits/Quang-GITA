/**
 * The public site — the part a search engine can actually read.
 *
 * ## The problem this exists to solve
 *
 * SAT365 is a hash-routed single-page application. Everything after the `#`
 * in a URL is never sent to a server, so to a crawler the entire platform —
 * thirty lessons, four courses, four hundred vocabulary entries, five papers —
 * is one page with one title. No amount of keyword work changes that. A site
 * cannot rank for content a crawler has never seen.
 *
 * So the public content is emitted a second time, at build, as ordinary
 * static HTML at real paths. `scripts/build-site.ts` writes it beside the
 * application bundle. The pages are plain documents: no framework, no client
 * routing, inline critical CSS, and a link into the app for anyone who wants
 * to use it. That is deliberate — a content page that waits on a 700 KB bundle
 * before painting is a content page that loses on Core Web Vitals to a
 * competitor with worse content.
 *
 * ## Why the content is generated rather than written twice
 *
 * Every page here is built from the same authored data the application uses.
 * A marketing site maintained separately from the product drifts from it, and
 * the drift always runs one way: the site keeps claiming what the product used
 * to do. Generating from `lessons.ts`, `curriculum.ts`, `vocabulary.ts` and
 * `certification.ts` means the page describing a course cannot outlive the
 * course.
 *
 * ## What ranks, and what this refuses to do
 *
 * The honest lever is the one this codebase already pulls everywhere: state
 * the method, state the limits, name what is estimated rather than measured.
 * That is what search guidance asks for under experience, expertise,
 * authoritativeness and trust, and it is the same discipline as the rest of
 * the platform rather than a separate marketing exercise.
 *
 * What is deliberately absent: there is no `Review` or `AggregateRating`
 * structured data anywhere in this file. Marking up ratings a site does not
 * have is a policy violation that earns a manual action, and self-serving
 * review markup on one's own organisation is ignored in any case. When real,
 * verifiable reviews exist, `reviewSchemaWhenReviewsExist` in this file
 * documents exactly what may then be emitted.
 */

export interface SiteConfig {
  /** Absolute origin. Canonicals and the sitemap are meaningless without it. */
  origin: string;
  name: string;
  legalName: string;
  /** Default locale of the emitted pages. */
  locale: 'vi' | 'en';
  otherLocale: 'vi' | 'en';
  logoPath: string;
  /** ISO date the content was last authored, used for sitemap lastmod. */
  updated: string;
}

export const SITE: SiteConfig = {
  // Override at build time with SITE_ORIGIN. A wrong origin is worse than a
  // missing one — it points every canonical at somebody else's domain.
  origin: 'https://sat365.gita.edu.vn',
  name: 'SAT365',
  legalName: 'GITA — SAT365',
  locale: 'vi',
  otherLocale: 'en',
  logoPath: '/icon.svg',
  updated: '2026-08-30',
};

/* ------------------------------------------------------------------ */
/* Content blocks                                                      */
/* ------------------------------------------------------------------ */

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'lead'; text: string }
  | { kind: 'h2'; text: string; id?: string }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][]; caption?: string }
  | { kind: 'note'; title: string; text: string }
  | { kind: 'qa'; question: string; answer: string }
  | { kind: 'links'; title: string; items: Array<{ href: string; label: string; note?: string }> }
  | { kind: 'cta'; href: string; label: string; note: string };

export interface SitePage {
  /** Site-absolute path, always with a trailing slash except the root. */
  path: string;
  /** Under 60 characters where possible: the whole title shows in a result. */
  title: string;
  /** 140–160 characters. Written as a reason to click, not as a keyword list. */
  description: string;
  /** Breadcrumb trail, root first. */
  trail: Array<{ href: string; label: string }>;
  h1: string;
  blocks: Block[];
  /** Schema.org objects. Never Review or AggregateRating — see the header. */
  jsonLd: Array<Record<string, unknown>>;
  /** Sitemap priority, 0–1. */
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

/* ------------------------------------------------------------------ */
/* Structured data helpers                                             */
/* ------------------------------------------------------------------ */

export function organisationSchema(site: SiteConfig): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${site.origin}/#organisation`,
    name: site.name,
    legalName: site.legalName,
    url: site.origin,
    logo: `${site.origin}${site.logoPath}`,
    description:
      'Nền tảng luyện thi Digital SAT với đề thích ứng hai giai đoạn, chấm điểm theo lý thuyết đáp ứng câu hỏi (IRT) trên thang 400–1600, và bộ đề cương bốn khoá.',
    areaServed: 'VN',
    knowsLanguage: ['vi', 'en'],
  };
}

export function webPageSchema(site: SiteConfig, page: SitePage): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site.origin}${page.path}#webpage`,
    url: `${site.origin}${page.path}`,
    name: page.title,
    description: page.description,
    inLanguage: site.locale,
    isPartOf: { '@id': `${site.origin}/#organisation` },
    dateModified: site.updated,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [...page.trail, { href: page.path, label: page.h1 }].map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.label,
        item: `${site.origin}${crumb.href}`,
      })),
    },
  };
}

/**
 * What may be emitted once real reviews exist, and not before.
 *
 * Kept as documentation rather than as code because the temptation to ship it
 * early is the whole point. Structured review data must describe reviews a
 * user actually left, collected somewhere they could also have left a bad one,
 * and displayed on the same page as the markup. Marking up ratings that do not
 * exist, or that the site collected only from people it selected, earns a
 * manual action — and a manual action costs more traffic than the stars ever
 * returned.
 */
export const reviewSchemaWhenReviewsExist = `
Requires, before a single Review object is emitted:
  1. Reviews collected from every learner asked, not from a chosen subset.
  2. The review text and rating visible on the same page as the markup.
  3. A named reviewer or a stable pseudonym, and a date.
  4. No incentive offered in exchange for a rating.
Self-serving AggregateRating on one's own organisation is ignored by Google in
any case, so the honest version of this is outcome evidence — scores before and
after, with the measurement error stated — which is what this site publishes.
`.trim();
