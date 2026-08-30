import { TOPIC_INDEX, PAPER_INDEX, SYLLABUS_INDEX } from '@/data/catalog-index';
import { uniqueSlugs } from '@/lib/slug';

/**
 * BẢN ĐỒ ĐƯỜNG DẪN
 *
 * Trước đây toàn bộ ứng dụng chạy trên router dạng hash (#/topics/...). Mọi thứ
 * sau dấu # đều bị công cụ tìm kiếm cắt bỏ, nên cả kho nội dung chỉ được nhìn
 * thấy như đúng một trang duy nhất. Đây là lí do đường dẫn được chuyển sang
 * History API với slug tiếng Việt không dấu, mô tả đúng nội dung bên trong.
 *
 * Nguyên tắc đặt đường dẫn:
 *   — Dùng từ khoá người học thật sự gõ vào ô tìm kiếm, không dùng thuật ngữ nội bộ.
 *   — Mỗi nội dung có đúng một địa chỉ chuẩn; mọi đường dẫn cũ chuyển hướng về đó.
 *   — Đường dẫn ngắn, không dấu, không tham số truy vấn, phân cấp phản ánh cấu trúc thật.
 */

/* ---------------- Slug ---------------- */

const topicSlugs = uniqueSlugs(TOPIC_INDEX, (t) => t.name, (t) => t.id);
const paperSlugs = uniqueSlugs(PAPER_INDEX, (p) => p.title, (p) => p.id);
const syllabusSlugs = uniqueSlugs(SYLLABUS_INDEX, (x) => x.title, (x) => x.id);

export const topicSlug = (id: string) => topicSlugs.toSlug.get(id) ?? id;
export const topicIdFromSlug = (slug: string) => topicSlugs.toId.get(slug) ?? slug;
export const paperSlug = (id: string) => paperSlugs.toSlug.get(id) ?? id;
export const paperIdFromSlug = (slug: string) => paperSlugs.toId.get(slug) ?? slug;
export const syllabusSlug = (id: string) => syllabusSlugs.toSlug.get(id) ?? id;
export const syllabusIdFromSlug = (slug: string) => syllabusSlugs.toId.get(slug) ?? slug;

/* ---------------- Khai báo trang ---------------- */

export type PageId =
  | 'home'
  | 'chuyen-de'
  | 'chuyen-de-detail'
  | 'cau-truc-de-thi'
  | 'de-thi'
  | 'de-thi-detail'
  | 'cong-thuc'
  | 'bi-kip'
  | 'lo-trinh'
  | 'kho-tai-lieu'
  | 'mo-thuc-gita'
  | 'nguon-phuong-phap'
  | 'nhan-dien'
  | 'hoc-vien'
  | 'phan-quyen'
  | 'de-cuong'
  | 'de-cuong-detail'
  | 'huong-dan-on'
  | 'hom-nay'
  | 'tien-do'
  | 'nhiem-vu'
  | 'lam-phieu'
  | 'loi-giai'
  | 'ho-so'
  | 'bao-cao'
  | 'lop-hoc'
  | 'bat-dau'
  | 'tim-kiem'
  | 'seo';

export interface PageDef {
  id: PageId;
  /** Mẫu đường dẫn; :param là tham số động. */
  path: string;
  /** Trang có nên được lập chỉ mục không. Trang phụ thuộc dữ liệu cá nhân thì không. */
  indexable: boolean;
  /** Độ ưu tiên trong sitemap (0–1). */
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** Nhãn hiển thị trên đường dẫn phân cấp. */
  label: string;
  /** Trang cha trong cây phân cấp, dùng cho breadcrumb. */
  parent?: PageId;
}

export const PAGES: PageDef[] = [
  { id: 'home', path: '/', indexable: true, priority: 1.0, changefreq: 'weekly', label: 'Trang chủ' },

  { id: 'chuyen-de', path: '/chuyen-de-toan', indexable: true, priority: 0.9, changefreq: 'weekly', label: 'Chuyên đề Toán', parent: 'home' },
  { id: 'chuyen-de-detail', path: '/chuyen-de-toan/:slug', indexable: true, priority: 0.8, changefreq: 'monthly', label: 'Chuyên đề', parent: 'chuyen-de' },

  { id: 'cau-truc-de-thi', path: '/cau-truc-de-thi', indexable: true, priority: 0.9, changefreq: 'monthly', label: 'Cấu trúc đề thi', parent: 'home' },
  { id: 'de-thi', path: '/de-thi-thu-co-loi-giai', indexable: true, priority: 0.95, changefreq: 'weekly', label: 'Đề thi thử có lời giải', parent: 'home' },
  { id: 'de-thi-detail', path: '/de-thi-thu-co-loi-giai/:slug', indexable: true, priority: 0.85, changefreq: 'monthly', label: 'Đề thi thử', parent: 'de-thi' },

  { id: 'de-cuong', path: '/de-cuong-on-tap', indexable: true, priority: 0.9, changefreq: 'monthly', label: 'Đề cương ôn tập', parent: 'home' },
  { id: 'de-cuong-detail', path: '/de-cuong-on-tap/:slug', indexable: true, priority: 0.85, changefreq: 'monthly', label: 'Đề cương', parent: 'de-cuong' },
  { id: 'cong-thuc', path: '/cong-thuc-toan', indexable: true, priority: 0.9, changefreq: 'monthly', label: 'Công thức Toán', parent: 'home' },
  { id: 'bi-kip', path: '/bi-kip-hoc-toan', indexable: true, priority: 0.8, changefreq: 'monthly', label: 'Bí kíp học Toán', parent: 'home' },
  { id: 'lo-trinh', path: '/lo-trinh-hoc-toan', indexable: true, priority: 0.8, changefreq: 'monthly', label: 'Lộ trình học Toán', parent: 'home' },
  { id: 'kho-tai-lieu', path: '/kho-tai-lieu-toan', indexable: true, priority: 0.7, changefreq: 'monthly', label: 'Kho tài liệu', parent: 'home' },
  { id: 'mo-thuc-gita', path: '/mo-thuc-gita', indexable: true, priority: 0.7, changefreq: 'monthly', label: 'Mô thức GITA', parent: 'home' },
  { id: 'nguon-phuong-phap', path: '/nguon-va-phuong-phap', indexable: true, priority: 0.85, changefreq: 'monthly', label: 'Nguồn & Phương pháp biên soạn', parent: 'home' },
  { id: 'nhan-dien', path: '/nhan-dien-thuong-hieu', indexable: true, priority: 0.5, changefreq: 'yearly', label: 'Nhận diện thương hiệu', parent: 'home' },
  { id: 'hoc-vien', path: '/hoc-vien-giao-vien', indexable: true, priority: 0.7, changefreq: 'monthly', label: 'Học viện giáo viên', parent: 'home' },
  { id: 'phan-quyen', path: '/phan-quyen', indexable: true, priority: 0.4, changefreq: 'yearly', label: 'Phân quyền', parent: 'home' },
  { id: 'huong-dan-on', path: '/huong-dan-on-chac/:slug', indexable: true, priority: 0.7, changefreq: 'monthly', label: 'Hướng dẫn ôn chắc', parent: 'chuyen-de' },

  /* Trang phụ thuộc dữ liệu cá nhân — không lập chỉ mục. */
  { id: 'hom-nay', path: '/hom-nay', indexable: false, priority: 0, changefreq: 'daily', label: 'Hôm nay', parent: 'home' },
  { id: 'tien-do', path: '/tien-do', indexable: false, priority: 0, changefreq: 'daily', label: 'Bảng tiến độ', parent: 'home' },
  { id: 'nhiem-vu', path: '/nhiem-vu', indexable: false, priority: 0, changefreq: 'weekly', label: 'Nhiệm vụ & Phiếu luyện', parent: 'home' },
  { id: 'lam-phieu', path: '/lam-phieu/:id', indexable: false, priority: 0, changefreq: 'weekly', label: 'Làm phiếu', parent: 'nhiem-vu' },
  { id: 'loi-giai', path: '/loi-giai/:id/:variant', indexable: false, priority: 0, changefreq: 'weekly', label: 'Lời giải & phân tích', parent: 'nhiem-vu' },
  { id: 'ho-so', path: '/ho-so-hoc-vien', indexable: false, priority: 0, changefreq: 'daily', label: 'Hồ sơ học viên', parent: 'home' },
  { id: 'bao-cao', path: '/bao-cao-gia-dinh', indexable: false, priority: 0, changefreq: 'weekly', label: 'Báo cáo gia đình', parent: 'home' },
  { id: 'lop-hoc', path: '/quan-ly-lop', indexable: false, priority: 0, changefreq: 'weekly', label: 'Quản lý lớp', parent: 'home' },
  { id: 'bat-dau', path: '/bat-dau', indexable: false, priority: 0, changefreq: 'monthly', label: 'Bắt đầu', parent: 'home' },
  { id: 'tim-kiem', path: '/tim-kiem/:q?', indexable: false, priority: 0, changefreq: 'weekly', label: 'Tìm kiếm', parent: 'home' },
  { id: 'seo', path: '/seo', indexable: false, priority: 0, changefreq: 'monthly', label: 'Bảng điều khiển SEO', parent: 'home' },
];

export const pageById = (id: PageId) => PAGES.find((p) => p.id === id)!;

/** Dựng đường dẫn thật từ mẫu. */
export function href(id: PageId, params: Record<string, string> = {}) {
  let p = pageById(id).path;
  for (const [k, v] of Object.entries(params)) p = p.replace(`:${k}?`, v).replace(`:${k}`, v);
  p = p.replace(/\/:[^/]+\??/g, '');
  return p || '/';
}

/** Đường dẫn phân cấp từ gốc tới trang hiện tại. */
export function breadcrumb(id: PageId, params: Record<string, string> = {}, leafLabel?: string) {
  const chain: { label: string; path: string }[] = [];
  let cur: PageDef | undefined = pageById(id);
  while (cur) {
    chain.unshift({
      label: cur.id === id && leafLabel ? leafLabel : cur.label,
      path: href(cur.id, params),
    });
    cur = cur.parent ? pageById(cur.parent) : undefined;
  }
  return chain;
}

/* ---------------- Khớp đường dẫn ---------------- */

export interface RouteMatch {
  id: PageId;
  params: Record<string, string>;
}

export function matchRoute(pathname: string): RouteMatch {
  const segs = pathname.split('/').filter(Boolean);
  for (const page of PAGES) {
    const pat = page.path.split('/').filter(Boolean);
    const optional = pat.filter((s) => s.endsWith('?')).length;
    if (segs.length < pat.length - optional || segs.length > pat.length) continue;
    const params: Record<string, string> = {};
    let ok = true;
    for (let i = 0; i < pat.length; i++) {
      const p = pat[i];
      const s = segs[i];
      if (p.startsWith(':')) {
        const name = p.replace(/^:/, '').replace(/\?$/, '');
        if (s === undefined) {
          if (!p.endsWith('?')) { ok = false; break; }
        } else params[name] = s;
      } else if (p !== s) {
        ok = false;
        break;
      }
    }
    if (ok) return { id: page.id, params };
  }
  return { id: 'home', params: {} };
}

/* ---------------- Chuyển hướng đường dẫn cũ ---------------- */

/**
 * Bản đồ từ đường dẫn hash cũ sang đường dẫn chuẩn mới.
 * Giữ lại để mọi liên kết đã chia sẻ trước đây không bị hỏng — liên kết hỏng
 * vừa làm mất người dùng vừa làm mất tín hiệu uy tín trong mắt công cụ tìm kiếm.
 */
export function legacyRedirect(oldPath: string): string | null {
  const segs = oldPath.split('/').filter(Boolean);
  const [root, a, b] = segs;
  switch (root) {
    case undefined:
      return '/';
    case 'today':
      return href('hom-nay');
    case 'dashboard':
      return href('tien-do');
    case 'roadmap':
      return href('lo-trinh');
    case 'missions':
      return href('nhiem-vu');
    case 'mission':
      return a ? href('lam-phieu', { id: a }) : href('nhiem-vu');
    case 'solution':
      return a ? href('loi-giai', { id: a, variant: b ?? '0' }) : href('nhiem-vu');
    case 'portfolio':
      return href('ho-so');
    case 'report':
      return href('bao-cao');
    case 'guide':
      return a ? href('huong-dan-on', { slug: topicSlug(a) }) : href('chuyen-de');
    case 'topics':
      return a ? href('chuyen-de-detail', { slug: topicSlug(a) }) : href('chuyen-de');
    case 'exams':
      return href('cau-truc-de-thi');
    case 'papers':
      return href('de-thi');
    case 'paper':
      return a ? href('de-thi-detail', { slug: paperSlug(a) }) : href('de-thi');
    case 'syllabus':
      return a ? href('de-cuong-detail', { slug: syllabusSlug(a) }) : href('de-cuong');
    case 'formulas':
      return href('cong-thuc');
    case 'playbook':
      return href('bi-kip');
    case 'library':
      return href('kho-tai-lieu');
    case 'gita':
      return href('mo-thuc-gita');
    case 'brand':
      return href('nhan-dien');
    case 'roles':
      return href('phan-quyen');
    case 'classes':
      return href('lop-hoc');
    case 'academy':
      return href('hoc-vien');
    case 'onboarding':
      return href('bat-dau');
    case 'search':
      return a ? href('tim-kiem', { q: a }) : href('tim-kiem');
    default:
      return null;
  }
}

/**
 * Đường dẫn của các trang không lập chỉ mục nhưng vẫn cần một tệp HTML riêng.
 *
 * Những trang này phụ thuộc dữ liệu cá nhân nên không có nội dung để lập chỉ
 * mục, nhưng nếu không có tệp thì việc mở thẳng đường dẫn sẽ phụ thuộc hoàn
 * toàn vào quy tắc dự phòng của máy chủ. Dựng sẵn một khung tối thiểu có thẻ
 * “không lập chỉ mục” khiến ứng dụng mở được ngay cả trên máy chủ tĩnh trần.
 */
export function appShellPaths(): { path: string; page: PageDef }[] {
  return PAGES.filter((p) => !p.indexable && !p.path.includes(':')).map((p) => ({ path: p.path, page: p }));
}

/** Mọi đường dẫn tĩnh cần dựng sẵn khi build. */
export function allIndexablePaths(): { path: string; page: PageDef; label: string }[] {
  const out: { path: string; page: PageDef; label: string }[] = [];
  for (const page of PAGES) {
    if (!page.indexable) continue;
    if (page.id === 'chuyen-de-detail' || page.id === 'huong-dan-on') {
      for (const t of TOPIC_INDEX) out.push({ path: href(page.id, { slug: topicSlug(t.id) }), page, label: t.name });
    } else if (page.id === 'de-thi-detail') {
      for (const p of PAPER_INDEX) out.push({ path: href(page.id, { slug: paperSlug(p.id) }), page, label: p.title });
    } else if (page.id === 'de-cuong-detail') {
      for (const x of SYLLABUS_INDEX) out.push({ path: href(page.id, { slug: syllabusSlug(x.id) }), page, label: x.title });
    } else if (!page.path.includes(':')) {
      out.push({ path: page.path, page, label: page.label });
    }
  }
  return out;
}
