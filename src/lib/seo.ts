import { TOPICS, topicById } from '@/data/topics';
import { EXAM_PAPERS, paperById, paperItems } from '@/data/papers';
import { BLUEPRINTS } from '@/data/blueprints';
import { SCHOOLS, strandById } from '@/data/schools';
import { SCALE } from '@/data/scale';
import { BRAND } from '@/data/brand';
import { faqFor } from '@/data/faq';
import { keywordsFor } from '@/data/keywords';
import {
  href,
  breadcrumb,
  pageById,
  topicIdFromSlug,
  paperIdFromSlug,
  topicSlug,
  paperSlug,
  type PageId,
} from '@/lib/routes';

/**
 * TẦNG SEO
 *
 * Mỗi trang cần bốn thứ, và cả bốn phải nhất quán với nhau:
 *   1. Tiêu đề nói đúng nội dung trang, đặt từ khoá chính lên trước.
 *   2. Mô tả trả lời được câu hỏi ẩn sau từ khoá, đủ hấp dẫn để được bấm vào.
 *   3. Địa chỉ chuẩn duy nhất, để không tự chia nhỏ tín hiệu của chính mình.
 *   4. Dữ liệu có cấu trúc mô tả trung thực nội dung đang hiển thị.
 *
 * Một điều cố ý KHÔNG làm: không gắn dữ liệu đánh giá sao (AggregateRating,
 * Review) khi chưa có đánh giá thật của người dùng thật. Đánh giá bịa vừa vi
 * phạm nguyên tắc của công cụ tìm kiếm, vừa phá đúng thứ mà nó định tạo ra.
 */

export const SITE = {
  /** Đổi thành tên miền thật khi triển khai. Mọi địa chỉ chuẩn dựng từ đây. */
  origin: 'https://gita365.vn',
  name: BRAND.product,
  org: BRAND.org,
  locale: 'vi_VN',
  lang: 'vi',
  /** Ngày cập nhật nội dung gần nhất, dùng cho sitemap và dữ liệu có cấu trúc. */
  updated: '2026-08-30',
};

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  /** Từ khoá chính của trang — dùng để tự kiểm tra, không nhồi vào thẻ meta. */
  focusKeyword?: string;
  /** true nếu trang không nên được lập chỉ mục. */
  noindex: boolean;
  h1: string;
  /** Đoạn dẫn hiển thị ngay dưới H1 và dùng làm mô tả dự phòng. */
  intro: string;
  breadcrumbs: { label: string; path: string }[];
  jsonLd: Record<string, unknown>[];
}

const abs = (path: string) => `${SITE.origin}${path === '/' ? '/' : path.replace(/\/$/, '')}`;

/**
 * Rút tiêu đề về đúng độ dài hiển thị được trên trang kết quả tìm kiếm.
 * Ưu tiên bỏ hẳn mệnh đề phụ sau dấu gạch ngang thay vì cắt giữa chừng —
 * một tiêu đề kết thúc bằng dấu ba chấm trông như lỗi kỹ thuật.
 */
function fitTitle(s: string, max = 70): string {
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const parts = t.split(' — ');
  for (let keep = parts.length - 1; keep >= 1; keep--) {
    const candidate = parts.slice(0, keep).join(' — ');
    if (candidate.length <= max) return candidate;
  }
  const cut = t.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' '));
}

/** Cắt mô tả về đúng độ dài hiển thị được trên trang kết quả tìm kiếm. */
const clamp = (s: string, max = 152) => {
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

/* ---------------- Khối dữ liệu có cấu trúc dùng chung ---------------- */

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${SITE.origin}/#organization`,
  name: SITE.org,
  alternateName: SITE.name,
  url: SITE.origin,
  description: BRAND.promise,
  slogan: BRAND.tagline,
  areaServed: { '@type': 'Country', name: 'Việt Nam' },
  knowsLanguage: 'vi',
  knowsAbout: [
    'Toán tuyển sinh lớp 10',
    'Toán chuyên',
    'Toán THPT lớp 10 11 12',
    'Ôn thi tốt nghiệp THPT môn Toán',
  ],
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.origin}/#website`,
  url: SITE.origin,
  name: SITE.name,
  inLanguage: SITE.lang,
  publisher: { '@id': `${SITE.origin}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE.origin}/tim-kiem/{search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
});

const breadcrumbLd = (chain: { label: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: chain.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.label,
    item: abs(c.path),
  })),
});

const faqLd = (page: PageId) => {
  const items = faqFor(page);
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
};

const webPageLd = (meta: Omit<SeoMeta, 'jsonLd'>) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: meta.canonical,
  name: meta.title,
  description: meta.description,
  inLanguage: SITE.lang,
  isPartOf: { '@id': `${SITE.origin}/#website` },
  dateModified: SITE.updated,
  publisher: { '@id': `${SITE.origin}/#organization` },
});

/* ---------------- Metadata từng trang ---------------- */

export function seoFor(page: PageId, params: Record<string, string> = {}): SeoMeta {
  const def = pageById(page);
  const st = SCALE;
  const fs = { items: SCALE.formulas, groups: SCALE.formulaGroups, starred: SCALE.formulasStarred };
  let focus = keywordsFor(page)[0]?.keyword;

  let title = `${def.label} — ${SITE.name}`;
  let description = BRAND.promise;
  let h1 = def.label;
  let intro = BRAND.promise;
  let leafLabel: string | undefined;
  let canonicalPath = href(page, params);
  const extraLd: Record<string, unknown>[] = [];

  switch (page) {
    case 'home': {
      title = `Luyện thi Toán vào 10 và Toán chuyên — ${SITE.name} · ${SITE.org}`;
      description = `Nền tảng luyện Toán ba luồng: ${st.chuyen} phiếu Toán chuyên, ${st.thpt} phiếu vào 10 và ${st.quocGia} phiếu THPT 10–12. Có đề thi thử kèm lời giải và barem, ${fs.items} công thức tra cứu, lộ trình cá nhân hoá theo KPI.`;
      h1 = 'Luyện thi Toán vào 10 và Toán chuyên theo lộ trình cá nhân hoá';
      intro =
        'MATH365 là hệ sinh thái luyện Toán của GITA365 cho ba đích đến: đỗ lớp chuyên Toán, đạt 9–10 điểm Toán vào lớp 10, và trên 9 điểm Toán thi đại học. Mỗi phiếu luyện được chấm ngay, chỉ ra nguyên nhân sai, xếp lịch ôn lại và cập nhật lại lộ trình.';
      extraLd.push(websiteLd());
      break;
    }

    case 'chuyen-de': {
      title = `Chuyên đề Toán ôn thi vào 10 và Toán chuyên — ${TOPICS.length} chuyên đề`;
      description = `Danh sách ${TOPICS.length} chuyên đề Toán phân theo 10 mạch kiến thức và 5 mức độ. Mỗi chuyên đề có bộ 6 phiếu: lý thuyết, đọc vị dạng bài, kỹ năng, nâng cao, ôn thi, phiếu thi — kèm lời giải và bảng phân tích.`;
      h1 = `Chuyên đề Toán — ${TOPICS.length} chuyên đề có bộ phiếu đầy đủ`;
      intro =
        'Mỗi chuyên đề là một bộ phiếu hoàn chỉnh đi theo đúng thứ tự sư phạm, không phải một danh sách bài tập rời rạc. Chọn chuyên đề để xem lý thuyết nền, các dạng bài kèm dấu hiệu đọc vị, kỹ thuật xử lý và những bẫy hay mắc.';
      extraLd.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Chuyên đề Toán MATH365',
        numberOfItems: TOPICS.length,
        itemListElement: TOPICS.slice(0, 50).map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.name,
          url: abs(href('chuyen-de-detail', { slug: topicSlug(t.id) })),
        })),
      });
      break;
    }

    case 'chuyen-de-detail': {
      const topic = topicById(topicIdFromSlug(params.slug ?? ''));
      if (!topic) break;
      const strand = strandById(topic.strand)?.name ?? '';
      leafLabel = topic.name;
      /* Với trang chi tiết, từ khoá chính chính là tên chuyên đề — đó mới là thứ người học gõ. */
      focus = topic.name.toLowerCase();
      title = `${topic.name} — lý thuyết và bài tập có lời giải`;
      description = clamp(
        `${topic.summary} Gồm ${topic.techniques.length} kỹ thuật xử lý, ${topic.pitfalls.length} lỗi hay mắc và bộ 6 phiếu luyện có lời giải chi tiết.`,
      );
      h1 = topic.name;
      intro = topic.summary;
      extraLd.push({
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: topic.name,
        description: topic.summary,
        url: abs(canonicalPath),
        inLanguage: SITE.lang,
        learningResourceType: 'Chuyên đề luyện tập',
        educationalLevel: `Mức ${topic.level}/5`,
        about: { '@type': 'Thing', name: strand },
        timeRequired: `PT${topic.hours}H`,
        teaches: topic.outcomes,
        provider: { '@id': `${SITE.origin}/#organization` },
        isAccessibleForFree: true,
      });
      break;
    }

    case 'cau-truc-de-thi': {
      title = 'Cấu trúc đề thi Toán vào 10, chuyên KHTN và tốt nghiệp THPT';
      description = `Ma trận chi tiết ${BLUEPRINTS.length} kỳ thi: số bài, điểm từng phần, thời gian, yêu cầu từng ý và chiến thuật phân bổ thời gian trong phòng thi. Kèm đường dẫn nguồn công bố chính thức.`;
      h1 = 'Cấu trúc và ma trận đề thi Toán';
      intro =
        'Biết chính xác đề hỏi gì, chấm thế nào và ngưỡng điểm ra sao là điều kiện tiên quyết trước khi bắt đầu ôn. Dưới đây là ma trận từng kỳ thi, tổng hợp từ đề chính thức và đề tham khảo các năm gần đây.';
      extraLd.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Ma trận đề thi Toán',
        numberOfItems: BLUEPRINTS.length,
        itemListElement: BLUEPRINTS.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.title,
        })),
      });
      break;
    }

    case 'de-thi': {
      title = `Đề thi thử Toán có lời giải chi tiết và barem — ${EXAM_PAPERS.length} đề`;
      description = `${EXAM_PAPERS.length} đề thi thử trọn vẹn dựng đúng ma trận từng kỳ thi: vào 10 Hà Nội, chuyên KHTN vòng 1 và 2, chuyên Sở, Nguyễn Tất Thành, Sư phạm và tốt nghiệp THPT. Mỗi câu có lời giải từng bước, barem tới 0,25 điểm và bảng phân tích dạng bài.`;
      h1 = 'Đề thi thử Toán có lời giải và barem chấm';
      intro =
        'Mỗi đề dưới đây là một đề hoàn chỉnh dựng đúng theo ma trận của kỳ thi tương ứng — đủ số bài, đúng thang điểm, đúng thời gian. Đây là đề do MATH365 biên soạn để luyện tập và tự chẩn đoán, không phải đề thi thật.';
      extraLd.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Đề thi thử Toán MATH365',
        numberOfItems: EXAM_PAPERS.length,
        itemListElement: EXAM_PAPERS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: p.title,
          url: abs(href('de-thi-detail', { slug: paperSlug(p.id) })),
        })),
      });
      break;
    }

    case 'de-thi-detail': {
      const paper = paperById(paperIdFromSlug(params.slug ?? ''));
      if (!paper) break;
      const items = paperItems(paper);
      const school = SCHOOLS.find((s) => s.id === paper.schoolId);
      leafLabel = paper.title;
      focus = paper.title.toLowerCase();
      title = `${paper.title} — lời giải và barem`;
      description = clamp(
        `Đề thi thử ${school?.shortName ?? ''} chuẩn cấu trúc: ${paper.minutes} phút, thang ${paper.totalPoints}, ${items.length} câu. Mỗi câu có lời giải từng bước, barem chấm tới 0,25 điểm và bảng phân tích dạng bài, đọc vị đề, bẫy hay mắc.`,
      );
      h1 = paper.title;
      intro = `${paper.subtitle}. Đề gồm ${paper.parts.length} phần và ${items.length} câu, làm trong ${paper.minutes} phút.`;
      extraLd.push({
        '@context': 'https://schema.org',
        '@type': 'Quiz',
        name: paper.title,
        description: paper.subtitle,
        url: abs(canonicalPath),
        inLanguage: SITE.lang,
        educationalLevel: school?.shortName ?? 'Trung học',
        timeRequired: `PT${paper.minutes}M`,
        isAccessibleForFree: true,
        provider: { '@id': `${SITE.origin}/#organization` },
        hasPart: items.slice(0, 20).map((it) => ({
          '@type': 'Question',
          name: `${it.label} (${it.points} điểm)`,
          text: it.statement.split('\n').slice(-1)[0],
          acceptedAnswer: { '@type': 'Answer', text: it.answer },
          ...(it.choices
            ? {
                suggestedAnswer: it.choices
                  .map((c, i) => (i === it.correctIndex ? null : { '@type': 'Answer', text: c }))
                  .filter(Boolean),
              }
            : {}),
        })),
      });
      break;
    }

    case 'cong-thuc': {
      title = `Công thức Toán THCS và THPT — ${fs.items} công thức tra cứu`;
      description = `Sổ tay ${fs.items} công thức Toán trong ${fs.groups} nhóm, từ hằng đẳng thức, căn thức, Viète, đường tròn tới đạo hàm, tích phân, Oxyz và xác suất có điều kiện. Mỗi công thức nói rõ dùng khi nào và sai ở đâu. ${fs.starred} công thức bắt buộc thuộc.`;
      h1 = 'Sổ tay công thức Toán';
      intro =
        'Mỗi công thức trả lời ba câu: viết thế nào kèm điều kiện áp dụng, dùng khi nào theo dấu hiệu trong đề, và sai ở đâu. Gõ tìm kiếm có dấu hay không dấu đều ra kết quả.';
      break;
    }

    case 'bi-kip': {
      title = 'Bí kíp học Toán và thói quen luyện thi hiệu quả';
      description =
        'Bộ bí kíp phòng thi, thói quen luyện tập và phương pháp học có cơ sở: cách chống quên bằng lịch ôn 1–3–7–21, cách phân bổ thời gian làm bài, cách sửa lỗi sai để không lặp lại.';
      h1 = 'Bí kíp, thói quen và phương pháp học Toán';
      intro =
        'Kỹ thuật giải toán chỉ là một nửa. Nửa còn lại là cách học: gặp lại kiến thức đúng lúc, sửa đúng lỗi, và giữ được nhịp đều đặn qua nhiều tháng.';
      break;
    }

    case 'lo-trinh': {
      title = 'Lộ trình ôn thi Toán cá nhân hoá theo mục tiêu và ngày thi';
      description =
        'Lộ trình chia theo giai đoạn nền tảng, tăng tốc, tổng duyệt và nước rút, xếp thứ tự chuyên đề theo tần suất ra đề nhân mật độ lỗi nhân độ mới của lỗi. Có mốc KPI 90% để xét thăng cấp.';
      h1 = 'Lộ trình ôn thi Toán của bạn';
      intro =
        'Lộ trình không cố định sẵn mà sinh ra từ dữ liệu làm bài thật: bạn sai ở đâu, sai bao lâu rồi, và chuyên đề đó nặng bao nhiêu trong đề thi.';
      break;
    }

    case 'kho-tai-lieu': {
      title = 'Kho tài liệu Toán ôn thi theo tầng năng lực người học';
      description =
        'Cấu trúc kho tài liệu 408 thư mục và 1.097 đầu tài liệu bổ trợ, phân theo ba luồng, năm tầng hấp thu và ba môi trường gia đình – nhà trường – xã hội.';
      h1 = 'Kiến trúc kho tài liệu MATH365';
      intro =
        'Tài liệu nhiều không giúp gì nếu không biết lấy cái nào lúc nào. Kho được tổ chức theo tầng năng lực của người học, mỗi thư mục ghi rõ ai chịu trách nhiệm và dùng vào lúc nào.';
      break;
    }

    case 'mo-thuc-gita': {
      title = 'Mô thức huấn luyện GITA — Goal, Inspirits, Talent, Action';
      description =
        'GITA là mô thức huấn luyện bốn trụ cột: hệ thống mục tiêu, nội lực và khát khao, tài năng và điểm mạnh, hành động theo quy tắc 20/80. Triển khai vào ba môi trường gia đình, nhà trường và xã hội.';
      h1 = 'Mô thức huấn luyện GITA';
      intro =
        'GITA không phải khẩu hiệu mà là bốn trụ cột có tín hiệu nhận diện riêng, xuất hiện xuyên suốt từ thư mục tài liệu tới quy trình, giải pháp, chiến lược và thói quen hằng ngày.';
      break;
    }

    case 'nguon-phuong-phap': {
      title = 'Nguồn tài liệu và phương pháp biên soạn MATH365';
      description =
        'Nội dung MATH365 được biên soạn từ đâu, kiểm chứng thế nào, cập nhật khi nào và ai chịu trách nhiệm. Kèm chính sách đính chính và những điều hệ thống không cam kết.';
      h1 = 'Nguồn, phương pháp biên soạn và chính sách nội dung';
      intro =
        'Trang này tồn tại để bạn kiểm chứng được chúng tôi, không phải để thuyết phục bạn. Nó nói rõ nội dung lấy từ đâu, được kiểm tra bằng cách nào, phần nào có thể sai và chúng tôi sửa ra sao.';
      break;
    }

    case 'hoc-vien': {
      title = 'Giáo án dạy Toán và bộ vận hành lớp học cho giáo viên';
      description =
        'Ba giáo án chuẩn chia tới từng khối thời gian, 12 nước đi sư phạm, 8 kịch bản nhận xét theo tình huống, 5 nghi thức lớp và bảng dự giờ 6 tiêu chí.';
      h1 = 'Học viện MATH365 — bộ vận hành lớp học';
      intro =
        'Tài liệu dành cho giáo viên và coach: khung buổi dạy chia tới từng khối thời gian, có dấu hiệu quan sát được cho biết khối đó đã đạt, và lỗi giáo viên hay mắc.';
      break;
    }

    case 'huong-dan-on': {
      const topic = topicById(topicIdFromSlug(params.slug ?? ''));
      if (!topic) break;
      leafLabel = `Hướng dẫn ôn chắc ${topic.name}`;
      focus = `cách ôn chắc chuyên đề ${topic.name}`.toLowerCase();
      title = `Cách ôn chắc chuyên đề ${topic.name} — lộ trình và checklist`;
      description = clamp(
        `Hướng dẫn ôn chắc chuyên đề ${topic.name}: thứ tự học sáu phiếu, lộ trình năm tầng, checklist trước khi coi là đã chắc, công thức và lỗi hay mắc, cùng lịch ôn lại 1–3–7–21.`,
      );
      h1 = `Hướng dẫn ôn chắc: ${topic.name}`;
      intro = `Trang này trả lời câu hỏi: học chuyên đề ${topic.name} theo thứ tự nào, và làm sao biết mình đã chắc.`;
      break;
    }

    case 'nhan-dien': {
      title = 'Bộ nhận diện GITA365 và quy chuẩn tài liệu MATH365';
      description =
        'Logo, hệ màu, thang chữ, giọng điệu và quy chuẩn tài liệu MATH365: quy ước mã tài liệu, bố cục trang phiếu, thang chữ bản in A4 và quy tắc in ấn.';
      h1 = 'Bộ nhận diện GITA365 · MATH365';
      intro = 'Nguồn chân lý duy nhất cho logo, màu, chữ, giọng điệu và quy chuẩn tài liệu của toàn hệ thống.';
      break;
    }

    case 'phan-quyen': {
      title = 'Phân quyền học viên và giáo viên trong hệ thống MATH365';
      description =
        'Tám vai trò trong ba nhóm học viên, giáo viên và quản trị, gắn với năm cấp độ chuyên môn P1 đến P5 và mười sáu nhóm quyền.';
      h1 = 'Phân quyền theo cấp độ';
      intro = 'Mỗi vai trò có phạm vi rõ ràng, điều kiện thăng cấp cụ thể và giới hạn định lượng đi kèm.';
      break;
    }

    default:
      break;
  }

  const canonical = abs(canonicalPath);
  const chain = breadcrumb(page, params, leafLabel);
  const base: Omit<SeoMeta, 'jsonLd'> = {
    title: fitTitle(title),
    description: clamp(description),
    canonical,
    focusKeyword: focus,
    noindex: !def.indexable,
    h1,
    intro,
    breadcrumbs: chain,
  };

  const jsonLd: Record<string, unknown>[] = [];
  if (!base.noindex) {
    jsonLd.push(organizationLd(), webPageLd(base), breadcrumbLd(chain), ...extraLd);
    const faq = faqLd(page);
    if (faq) jsonLd.push(faq);
  }

  return { ...base, jsonLd };
}

/* ---------------- Tự kiểm tra chất lượng SEO ---------------- */

export interface SeoAudit {
  page: PageId;
  path: string;
  title: string;
  titleLen: number;
  descLen: number;
  focusKeyword?: string;
  /** Từ khoá chính có nằm trong tiêu đề không. */
  keywordInTitle: boolean;
  keywordInDescription: boolean;
  jsonLdTypes: string[];
  faqCount: number;
  noindex: boolean;
  issues: string[];
}

export function auditPage(page: PageId, params: Record<string, string> = {}): SeoAudit {
  const m = seoFor(page, params);
  const issues: string[] = [];
  const titleLen = m.title.length;
  const descLen = m.description.length;
  const kw = m.focusKeyword;
  const norm = (s: string) =>
    s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const keywordInTitle = !!kw && norm(m.title).includes(norm(kw).split(' ').slice(0, 3).join(' '));
  const keywordInDescription = !!kw && norm(m.description).includes(norm(kw).split(' ').slice(0, 3).join(' '));

  if (titleLen < 25) issues.push('Tiêu đề quá ngắn, chưa đủ chỗ cho từ khoá chính.');
  if (titleLen > 70) issues.push('Tiêu đề dài quá 70 ký tự, sẽ bị cắt trên trang kết quả.');
  if (descLen < 90) issues.push('Mô tả quá ngắn, chưa đủ sức thuyết phục người tìm bấm vào.');
  if (descLen > 160) issues.push('Mô tả dài quá 160 ký tự, sẽ bị cắt.');
  if (!m.noindex && !kw) issues.push('Trang được lập chỉ mục nhưng chưa gán từ khoá chính trong bản đồ từ khoá.');
  if (!m.noindex && kw && !keywordInTitle) issues.push('Từ khoá chính chưa xuất hiện trong tiêu đề.');
  if (!m.noindex && !m.h1.trim()) issues.push('Thiếu tiêu đề cấp một trên trang.');
  if (!m.noindex && m.jsonLd.length < 3) issues.push('Thiếu dữ liệu có cấu trúc nền (tổ chức, trang, đường dẫn phân cấp).');

  return {
    page,
    path: href(page, params),
    title: m.title,
    titleLen,
    descLen,
    focusKeyword: kw,
    keywordInTitle,
    keywordInDescription,
    jsonLdTypes: m.jsonLd.map((j) => String(j['@type'])),
    faqCount: faqFor(page).length,
    noindex: m.noindex,
    issues,
  };
}
