import { MAX_TOTAL_SCORE, SECTIONS } from '../config';
import { ARTICLE_BY_PATH, FAQS } from '../data/articles';
import { OFFICIAL_EXAM_FEE, PLANS } from '../data/pricing';
import {
  SEO_BY_PATH,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  canonicalOf,
  fullTitle,
} from '../data/seo';

/**
 * THE MO TA TRANG
 *
 * Mot ung dung mot trang doi noi dung ma khong doi <title> se cho ket qua tim
 * kiem toan la mot dong giong nhau — va nguoi dung mo mot chuc tab thi khong
 * phan biet duoc tab nao la tab nao. Ham nay chay moi lan doi duong dan.
 *
 * Cac the deu duoc CAP NHAT TAI CHO thay vi them moi, nen khong bao gio co hai
 * the description trong mot trang. Trung the la loi ma bo thu thap bao cao va
 * nguoi viet gan nhu khong bao gio nhin thay.
 */

function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  const selector = `meta[${attr}="${key}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setLink(rel: string, href: string): void {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!href) {
    tag?.remove();
    return;
  }
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

export function applyHead(path: string): void {
  if (typeof document === 'undefined') return;

  const seo = SEO_BY_PATH.get(path);
  const title = fullTitle(path);
  const description = seo?.description ?? SITE_TAGLINE;
  const canonical = canonicalOf(path);

  document.title = title;
  setMeta('name', 'description', description);

  // Trang khong co noi dung cho khach la thi khong vao chi muc. Mot trang trong
  // rong nam trong chi muc keo tin hieu chat luong cua ca ten mien xuong.
  setMeta('name', 'robots', seo?.index ? 'index,follow' : 'noindex,follow');

  setLink('canonical', canonical);

  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', SITE_NAME);
  setMeta('property', 'og:locale', 'vi_VN');
  if (canonical) setMeta('property', 'og:url', canonical);
  // Anh chia se: bo thu thap mang xa hoi khong chay JavaScript, nhung trang da
  // duoc ket xuat tinh nen the nay co mat san trong HTML ho nhan duoc.
  setMeta('property', 'og:image', SITE_URL ? `${SITE_URL}/og-hsa365.png` : '/og-hsa365.png');
  setMeta('name', 'twitter:image', SITE_URL ? `${SITE_URL}/og-hsa365.png` : '/og-hsa365.png');

  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description);
}

/* ── Du lieu co cau truc ───────────────────────────────────────────────── */

/**
 * JSON-LD.
 *
 * Chi khai bao nhung gi CO THAT tren trang. Danh dau du lieu khong ton tai
 * trong noi dung — dac biet la danh gia va so sao — la vi pham chinh sach du
 * lieu co cau truc cua Google va dan toi hinh phat thu cong. Cai gia phai tra
 * lon hon nhieu lan so voi vai ngoi sao trong ket qua tim kiem, va no roi vao
 * ca ten mien chu khong rieng mot trang.
 */
export function structuredData(path: string): object[] {
  const blocks: object[] = [];

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    description: SITE_TAGLINE,
    ...(SITE_URL ? { url: SITE_URL, logo: `${SITE_URL}/logo-gita.svg` } : {}),
    areaServed: { '@type': 'Country', name: 'Việt Nam' },
    knowsLanguage: 'vi',
  };
  blocks.push(organization);

  if (path === '/' || path === '/hoc-phi') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Luyện thi Đánh giá năng lực HSA — ĐHQGHN',
      description:
        'Chương trình luyện thi HSA với bài định vị đầu vào, lộ trình cá nhân hóa, 2.000 phiếu luyện, đề mẫu trọn vẹn và kho bí kíp theo dạng bài.',
      inLanguage: 'vi',
      provider: { '@type': 'EducationalOrganization', name: SITE_NAME },
      offers: PLANS.filter((p) => p.perMonth !== null).map((plan) => ({
        '@type': 'Offer',
        name: plan.name,
        price: plan.price,
        priceCurrency: 'VND',
        category: 'Paid',
      })),
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: 'P8M',
      },
    });
  }

  if (path === '/cau-hoi-thuong-gap') {
    // FAQPage duoc Google hien truc tiep trong ket qua tim kiem, noi nguoi doc
    // khong co ngu canh nao khac ngoai chinh doan van do — nen moi cau tra loi
    // o day deu phai dung va tu du.
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: 'vi',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  const article = ARTICLE_BY_PATH.get(path);
  if (article) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: 'vi',
      mainEntity: [
        {
          '@type': 'Question',
          name: article.question,
          acceptedAnswer: { '@type': 'Answer', text: article.answer },
        },
      ],
    });
  }

  if (path === '/hsa-la-gi' || path === '/cau-truc-de-thi-hsa') {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: SEO_BY_PATH.get(path)?.title ?? '',
      description: SEO_BY_PATH.get(path)?.description ?? '',
      inLanguage: 'vi',
      about: {
        '@type': 'Thing',
        name: 'Kỳ thi Đánh giá năng lực HSA — Đại học Quốc gia Hà Nội',
      },
      publisher: { '@type': 'EducationalOrganization', name: SITE_NAME },
    });
  }

  // Duong dan phan cap: Google hien no thay cho dia chi tho trong ket qua tim
  // kiem, va no cung giup bo thu thap hieu cau truc trang.
  const breadcrumbFor = ARTICLE_BY_PATH.get(path);
  if (breadcrumbFor && SITE_URL) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_URL}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Kiến thức về kỳ thi',
          item: `${SITE_URL}/hsa-la-gi`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: breadcrumbFor.title,
          item: `${SITE_URL}${path}`,
        },
      ],
    });
  }

  return blocks;
}

/** Ghi cac khoi JSON-LD vao <head>, thay the khoi cu. */
export function applyStructuredData(path: string): void {
  if (typeof document === 'undefined') return;
  const id = 'hsa365-jsonld';
  document.getElementById(id)?.remove();

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData(path));
  document.head.appendChild(script);
}

/** Du lieu tho de dung o noi khac — vi du sinh trang tinh khi build. */
export const EXAM_FACTS = {
  questions: SECTIONS.reduce((n, s) => n + s.questionCount, 0),
  minutes: SECTIONS.reduce((n, s) => n + s.minutes, 0),
  maxScore: MAX_TOTAL_SCORE,
  fee: OFFICIAL_EXAM_FEE,
} as const;
