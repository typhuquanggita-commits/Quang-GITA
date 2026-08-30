/**
 * SEO
 *
 * VAN DE GOC DA DUOC SUA O TANG DINH TUYEN, va can noi ro vi no quyet dinh moi
 * thu con lai: truoc day toan bo ung dung chay bang hash (`#/hoc-phi`). Doan
 * sau dau `#` KHONG BAO GIO duoc gui len may chu — nen voi Google, ca hai muoi
 * man hinh chi la MOT dia chi. Khong the xep hang mot trang khong ton tai nhu
 * mot dia chi rieng, va khong ky thuat SEO nao sua duoc dieu do tu ben ngoai.
 *
 * Tep nay la nguon su that cho phan con lai: moi duong dan co tieu de, mo ta,
 * va mot quyet dinh RO RANG ve viec co cho Google lap chi muc hay khong.
 *
 * NGUYEN TAC CHAN LOC CHI MUC:
 * Chi cho lap chi muc nhung trang co NOI DUNG THAT cho nguoi la doc duoc. Man
 * hinh chua du lieu hoc tap ca nhan (ho so, bao cao, so tay loi sai) deu bi
 * chan — khong phai vi bao mat (chung khong the truy cap tu ngoai) ma vi mot
 * trang trong rong doi voi khach la se keo tin hieu chat luong cua ca ten mien
 * xuong. Mot trang khong co gi de doc ma nam trong chi muc la mot trang lam
 * hai chinh nhung trang tot.
 */

export interface RouteSeo {
  path: string;
  /** Tieu de trang. Dat truoc ten thuong hieu, vi phan dau quan trong nhat. */
  title: string;
  /** Mo ta ngan hien duoi tieu de trong ket qua tim kiem. */
  description: string;
  /** Cho Google lap chi muc khong. */
  index: boolean;
  /** Do uu tien trong sitemap, 0..1. */
  priority: number;
  /** Tan suat noi dung thay doi — goi y cho bo thu thap. */
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export const SITE_NAME = 'HSA365';
export const SITE_TAGLINE = 'Luyện thi Đánh giá năng lực HSA — ĐHQGHN';

/**
 * Ten mien that phai duoc dat khi trien khai.
 *
 * De rong thi canonical va sitemap deu sai, va sai canonical con hai hon la
 * khong co canonical. Doc tu bien moi truong de moi moi truong trien khai
 * (thu nghiem, chinh thuc) khai bao dung ten mien cua no.
 */
export const SITE_URL = readSiteUrl();

/**
 * Doc ten mien tu bien moi truong.
 *
 * Tep nay duoc dung o CA HAI phia: trong trinh duyet (qua Vite, co
 * `import.meta.env`) va trong kich ban sinh sitemap chay bang Node (chi co
 * `process.env`). Doc ca hai nen mot noi khai bao dung cho ca hai — thay vi
 * duy tri hai bang route roi de chung lech nhau.
 */
function readSiteUrl(): string {
  const fromVite =
    typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env.VITE_SITE_URL as string | undefined)
      : undefined;
  const fromNode =
    typeof process !== 'undefined' && process.env ? process.env['VITE_SITE_URL'] : undefined;
  return (fromVite ?? fromNode ?? '').replace(/\/$/, '');
}

export const ROUTES_SEO: readonly RouteSeo[] = [
  {
    path: '/',
    title: 'Luyện thi Đánh giá năng lực HSA 2026 — lộ trình cá nhân hóa',
    description:
      'Hệ thống luyện thi HSA của ĐHQGHN: bài định vị đầu vào, 2.000 phiếu luyện theo lộ trình riêng, đề mẫu 150 câu kèm barem và kho bí kíp 90 dạng bài.',
    index: true,
    priority: 1,
    changefreq: 'weekly',
  },
  {
    path: '/hsa-la-gi',
    title: 'Kỳ thi HSA là gì? Cấu trúc đề, lệ phí và lịch thi 2026',
    description:
      'Giải thích đầy đủ kỳ thi Đánh giá năng lực HSA của ĐHQGHN: 150 câu / 195 phút / thang 150 điểm, ba phần thi, lệ phí 600.000đ mỗi lượt và số lượt được đăng ký.',
    index: true,
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/cau-truc-de-thi-hsa',
    title: 'Cấu trúc đề thi HSA chi tiết từng phần — 150 câu, 195 phút',
    description:
      'Phân tích từng phần của đề HSA: Tư duy định lượng 50 câu/75 phút, Tư duy định tính 50 câu/60 phút, phần tự chọn 50 câu/60 phút. Kèm số câu trắc nghiệm và câu điền.',
    index: true,
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/lo-trinh-on-thi-hsa',
    title: 'Lộ trình ôn thi HSA 32 tuần — đi từ đâu đến đâu',
    description:
      'Đề cương ôn thi HSA chia ba giai đoạn trong 32 tuần, mỗi tuần có mục tiêu và cách tự kiểm cụ thể, kèm bảy cột mốc và cái bẫy đặc trưng của từng giai đoạn.',
    index: true,
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/bao-nhieu-diem-la-cao',
    title: 'Thi HSA bao nhiêu điểm là cao? Thang điểm và mức xét tuyển',
    description:
      'Cách đọc điểm HSA trên thang 150: mức nào là khá, mức nào vượt ngưỡng xét tuyển của phần lớn trường, và vì sao điểm thành phần quan trọng hơn điểm tổng.',
    index: true,
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/cau-hoi-thuong-gap',
    title: 'Câu hỏi thường gặp về kỳ thi HSA và cách ôn luyện',
    description:
      'Giải đáp các câu hỏi thường gặp: thi mấy lượt một năm, hai lượt cách nhau bao lâu, ôn trong bao lâu là đủ, nên bắt đầu từ đâu, và trung tâm có được tổ chức luyện thi không.',
    index: true,
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/de-cuong',
    title: 'Đề cương ôn thi HSA 32 tuần — ba giai đoạn, bảy cột mốc',
    description:
      'Đề cương trọn mùa thi: mỗi tuần có mục tiêu viết ở dạng kết quả quan sát được và một cách tự kiểm là việc làm được, không phải cảm giác.',
    index: true,
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/paper',
    title: 'Đề mẫu HSA trọn vẹn 150 câu kèm đáp án và barem',
    description:
      'Năm đề mẫu đầy đủ cấu trúc HSA, mỗi môn tự chọn một đề, kèm ma trận đề, đáp án, barem chấm và lời giải chi tiết từng câu.',
    index: true,
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/chung-chi',
    title: 'Chứng chỉ năng lực HSA365 — bốn bậc sát hạch',
    description:
      'Kỳ sát hạch nội bộ có quy chế, xếp bốn bậc Đồng · Bạc · Vàng · Kim cương theo cả tổng điểm lẫn điểm sàn từng phần, kèm chứng chỉ in được có mã tra cứu.',
    index: true,
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/hoc-phi',
    title: 'Học phí luyện thi HSA365 — bốn gói, một mức giá',
    description:
      'Bảng học phí minh bạch: một mức giá quanh năm, không giảm giá theo mùa. Mỗi gói nói rõ hợp với ai và ai không nên mua.',
    index: true,
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/gita',
    title: 'Mô thức huấn luyện GITA — bốn trụ cột của người học giỏi',
    description:
      'Goal, Inspirits, Talent, Action: khung huấn luyện gắn việc ôn thi với phát triển bản thân, kèm thói quen, tầng hấp thu và quy tắc 20/80.',
    index: true,
    priority: 0.7,
    changefreq: 'monthly',
  },

  /* Man hinh chua du lieu ca nhan hoac cong cu noi bo — khong lap chi muc. */
  { path: '/placement', title: 'Bài kiểm tra định vị đầu vào', description: 'Bài định vị 36 câu chọn thích ứng.', index: false, priority: 0.4, changefreq: 'monthly' },
  { path: '/exam', title: 'Thi thử', description: 'Đề thi thử theo phần và đề full.', index: false, priority: 0.4, changefreq: 'monthly' },
  { path: '/practice', title: 'Thư viện phiếu luyện', description: '2.000 phiếu luyện theo lộ trình.', index: false, priority: 0.4, changefreq: 'monthly' },
  { path: '/topic', title: 'Ôn chắc chuyên đề', description: 'Phiếu hướng dẫn ôn chắc từng chuyên đề.', index: false, priority: 0.3, changefreq: 'monthly' },
  { path: '/review', title: 'Sổ tay lỗi sai', description: 'Ôn tập ngắt quãng các câu từng sai.', index: false, priority: 0.3, changefreq: 'monthly' },
  { path: '/analytics', title: 'Phân tích năng lực', description: 'Biểu đồ năng lực theo mô hình Rasch.', index: false, priority: 0.3, changefreq: 'monthly' },
  { path: '/profile', title: 'Hồ sơ học viên', description: 'Lịch sử làm bài của người học.', index: false, priority: 0.2, changefreq: 'weekly' },
  { path: '/roadmap', title: 'Lộ trình', description: 'Kế hoạch theo ngày tới ngày thi.', index: false, priority: 0.3, changefreq: 'weekly' },
  { path: '/solutions', title: 'Lời giải', description: 'Bộ giải đề của một lượt làm.', index: false, priority: 0.2, changefreq: 'weekly' },
  { path: '/report', title: 'Báo cáo gia đình', description: 'Báo cáo gửi phụ huynh.', index: false, priority: 0.2, changefreq: 'monthly' },
  { path: '/workspace', title: 'Không gian làm việc', description: 'Bảng lớp cho giáo viên và coach.', index: false, priority: 0.2, changefreq: 'monthly' },
  { path: '/brand', title: 'Bộ nhận diện', description: 'Sách thương hiệu nội bộ.', index: false, priority: 0.1, changefreq: 'yearly' },
  { path: '/roles', title: 'Phân quyền hệ thống', description: 'Ma trận quyền của mười vai trò.', index: false, priority: 0.1, changefreq: 'yearly' },
  { path: '/settings', title: 'Cài đặt', description: 'Tùy chỉnh và dữ liệu học tập.', index: false, priority: 0.1, changefreq: 'yearly' },
  { path: '/worksheet', title: 'Phiếu luyện', description: 'Mặt làm bài.', index: false, priority: 0.1, changefreq: 'weekly' },
];

export const SEO_BY_PATH = new Map(ROUTES_SEO.map((r) => [r.path, r]));

/** Cac duong dan cho phep lap chi muc — dung de sinh sitemap. */
export function indexableRoutes(): RouteSeo[] {
  return ROUTES_SEO.filter((r) => r.index).sort((a, b) => b.priority - a.priority);
}

/** Tieu de day du cho the <title>. Trang chu khong lap lai ten thuong hieu. */
export function fullTitle(path: string): string {
  const seo = SEO_BY_PATH.get(path);
  if (!seo) return `${SITE_NAME} — ${SITE_TAGLINE}`;
  return path === '/' ? `${seo.title} | ${SITE_NAME}` : `${seo.title} | ${SITE_NAME}`;
}

/** Dia chi chuan cua mot trang. Rong khi chua khai bao ten mien. */
export function canonicalOf(path: string): string {
  return SITE_URL ? `${SITE_URL}${path === '/' ? '/' : path}` : '';
}
