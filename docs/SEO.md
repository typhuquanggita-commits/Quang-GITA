# Search

## The blocker that had to be removed first

SAT365 is a hash-routed single-page application. Everything after the `#` in a
URL is **never sent to a server**. To a crawler, thirty lessons, four courses,
four hundred vocabulary entries and five papers were one page with one title.

No amount of keyword work changes that. A site cannot rank for content a
crawler has never seen, and this was the entire ceiling on the platform's
search performance.

## What was built

The public content is emitted a **second time**, at build, as ordinary static
HTML at real paths.

```
dist/
  index.html                    ← the root is a document, not an app shell
  khoa-hoc/…                    4 course pages + index
  bai-giang/…                   30 lesson pages + index
  tu-vung-sat/                  the second-meaning vocabulary page
  de-thi-thu/                   papers and mark schemes
  phuong-phap-cham-diem/        how a score is produced, and its error
  chung-nhan/                   the certification standard
  cau-hoi-thuong-gap/           FAQ
  sitemap.xml  robots.txt
  app/                          the application bundle
```

**42 pages, 424 KB of HTML.** The application moved to `/app/` so the root URL
— the single most valuable one a site has — is crawlable content. `base: './'`
keeps the bundle's asset paths relative, so it works from `/app/` without
knowing it is there.

The pages are plain documents: no framework, no client router, critical CSS
inline, no render-blocking request. A content page that waits on a 700 KB
bundle before it paints loses on Core Web Vitals to a competitor with worse
content.

## Generated, never written twice

Every page is built from the same authored data the application uses —
`lessons.ts`, `curriculum.ts`, `vocabulary.ts`, `certification.ts`, `papers.ts`.

A marketing site maintained separately from the product drifts from it, and the
drift always runs one way: the site keeps claiming what the product used to do.
Generating from the source means the page describing a course cannot outlive
the course.

## What is on every page

| | |
| --- | --- |
| Absolute `canonical` | tested to match the page it sits on |
| `hreflang` vi + x-default | no alternates are declared that do not exist |
| Open Graph + Twitter | title, description, url, image |
| JSON-LD | `EducationalOrganization`, `WebPage`, `BreadcrumbList`, plus `Course`, `LearningResource`, `FAQPage`, `EducationalOccupationalCredential` per page type |
| Visible breadcrumb | matching the structured trail |
| The disclaimer | that this is not a College Board score |

## The tests, and what each prevents

Every one covers a defect that is invisible in a browser and fatal in an index.

- **Unique titles and descriptions.** Two pages with the same title compete for
  the same query and split their own signal.
- **Title 20–70, description 115–165 characters.** A truncated subject reads as
  a broken page. `fitTitle` drops the brand suffix before it trims the subject.
- **One `h1`, and over 900 characters of text.** Thin pages do not rank, and a
  generated page is the easiest kind to leave thin without noticing. This test
  caught `/bai-giang/suy-luan/` shipping with the h1 "Suy luận" — technically
  correct and useless to a searcher, now "Suy luận trong SAT: phương pháp và
  bẫy".
- **Every internal link resolves to a generated page.** A broken internal link
  wastes crawl budget and drops the page it pointed at.
- **All structured data parses and declares a type.** Malformed JSON-LD is
  silently ignored, so nothing tells you it broke.
- **FAQ structured data matches the visible text.** Marking up an answer the
  page does not show is a violation, not a shortcut.
- **The disclaimer appears on every page**, including the sales pages — which
  is the one place it would be tempting to drop.
- **Escaping.** An apostrophe in a Vietnamese sentence breaking out of an
  attribute is the failure that actually happens.

## What this deliberately does not do

**There is no `Review` or `AggregateRating` markup anywhere**, and a test fails
the build if any appears.

Marking up ratings a site does not have earns a manual action, which costs far
more traffic than the stars ever return. Self-serving review markup on one's
own organisation is ignored by Google in any case. `reviewSchemaWhenReviewsExist`
in `src/site/model.ts` records exactly what must be true before a single
`Review` object may be emitted: reviews collected from every learner asked
rather than a chosen subset, the text and rating visible on the same page as
the markup, a named reviewer and a date, and no incentive offered for a rating.

The honest version of the same signal is **outcome evidence** — scores before
and after, with the measurement error stated — which this platform already
produces and publishes.

## Honest expectations

Ranking first is not something code delivers. What code delivers is the removal
of every technical reason a page cannot rank, and that is now done: the content
is crawlable, fast, structured, internally linked, and free of the errors that
get a site ignored or penalised.

The rest is not in this repository:

- **A domain and a deployment.** `SITE_ORIGIN` must be set at build time. The
  default in `model.ts` is a placeholder, and a wrong origin points every
  canonical at somebody else's domain.
- **Search Console.** Submit `sitemap.xml`, then read what Google actually
  indexes rather than assuming.
- **Time.** A new domain does not rank for a competitive query in weeks,
  whatever is done to it.
- **Links from places that already have authority.** This is the single largest
  factor left, and it is earned by the content being worth citing rather than
  by anything in the build.
- **Content depth against whoever currently ranks.** 42 pages is a foundation,
  not a moat. The pages that will win are the ones answering a question better
  than the current first result, and the platform's honest treatment of
  measurement error is the strongest thing it has to say that competitors do
  not.

## Known limits

- The site is Vietnamese only. The application is bilingual, but generating
  English pages would need the marketing copy translated, and declaring
  `hreflang` alternates that do not exist is worse than declaring none.
- No image assets beyond the icon, so `og:image` is a logo rather than a
  designed social card.
- `lastmod` in the sitemap is a single site-wide date rather than per-page.
- No pagination or archive structure; 30 lesson pages sit flat under one index.
