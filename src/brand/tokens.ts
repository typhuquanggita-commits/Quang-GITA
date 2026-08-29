import type { GitaPillarId } from '../types';

/**
 * BO NHAN DIEN HSA365 · GITA
 *
 * Tep nay la NGUON SU THAT DUY NHAT cua bo nhan dien. Man hinh sach thuong
 * hieu in ra chinh cac gia tri o day, va cac bien CSS trong styles.css lay
 * dung cac ma mau nay — nen tai lieu nhan dien khong the lech khoi san pham.
 *
 * Nguyen tac goc: mot bo nhan dien khong phai la mot tep logo. No la mot tap
 * QUYET DINH da duoc chot, kem ly do, de lan sau khong ai phai chot lai.
 */

export interface BrandColor {
  token: string;
  hex: string;
  name: string;
  role: string;
  /** Ti le tuong phan voi nen trang #ffffff. */
  onWhite: number;
  /** Ti le tuong phan voi nen toi #0f172a. */
  onDark: number;
}

/**
 * Bang mau lay truc tiep tu logo GITA: hai sac xanh cua hai vet cong, mot sac
 * do cua vet cong cat ngang, va cum sao.
 *
 * Cac ti le tuong phan duoi day duoc tinh theo WCAG 2.1 va co bai test canh
 * giu — doi mot ma mau ma lam tut duoi nguong se lam do test, khong phai doi
 * ai do tinh co nhin ra.
 */
export const BRAND_COLORS: readonly BrandColor[] = [
  {
    token: '--gita-blue-800',
    hex: '#123C6E',
    name: 'Xanh GITA đậm',
    role: 'Chữ tiêu đề trên nền sáng, đường kẻ đậm trong tài liệu in.',
    onWhite: 11.07,
    onDark: 1.61,
  },
  {
    token: '--gita-blue-700',
    hex: '#16457E',
    name: 'Xanh GITA sâu',
    role: 'Trạng thái nhấn của nút, chữ trên nền xanh nhạt.',
    onWhite: 9.6,
    onDark: 1.86,
  },
  {
    token: '--gita-blue-600',
    hex: '#1C5BA8',
    name: 'Xanh GITA chính',
    role: 'Màu thương hiệu chính. Chữ trong logo, nút chính, liên kết.',
    onWhite: 6.75,
    onDark: 2.64,
  },
  {
    token: '--gita-blue-500',
    hex: '#2E6FBF',
    name: 'Xanh vệt ngoài',
    role: 'Vệt cong ngoài cùng của logo. Dùng được cho chữ trên nền sáng, không dùng cho chữ nhỏ trên nền tối.',
    onWhite: 5.07,
    onDark: 3.52,
  },
  {
    token: '--gita-blue-400',
    hex: '#5B9BD8',
    name: 'Xanh vệt trong',
    role: 'Vệt cong trong của logo. Màu thương hiệu ở chế độ tối.',
    onWhite: 2.95,
    onDark: 6.06,
  },
  {
    token: '--gita-red-600',
    hex: '#C42017',
    name: 'Đỏ GITA (chữ)',
    role: 'Biến thể dùng được cho chữ: cảnh báo, dấu nhấn trong tài liệu.',
    onWhite: 5.89,
    onDark: 3.03,
  },
  {
    token: '--gita-red-500',
    hex: '#E02B20',
    name: 'Đỏ GITA (đồ họa)',
    role: 'Đỏ của logo. Chỉ dùng cho đồ họa và mảng lớn, không dùng cho chữ nhỏ.',
    onWhite: 4.63,
    onDark: 3.86,
  },
];

export const BRAND_COLOR_BY_TOKEN = new Map(BRAND_COLORS.map((c) => [c.token, c]));

/**
 * Bon phan tu cua logo anh xa sang bon tru cot GITA.
 *
 * Anh xa nay khong phai gan ghep cho vui: no cho phep moi tai lieu, moi man
 * hinh dung dung mot ngon ngu hinh anh khi noi ve mot tru cot — va nguoi hoc
 * nhin logo la nho duoc mo thuc, thay vi phai hoc thuoc bon chu cai.
 */
export interface MarkMeaning {
  element: string;
  pillar: GitaPillarId;
  colorToken: string;
  meaning: string;
}

export const MARK_MEANING: readonly MarkMeaning[] = [
  {
    element: 'Vệt cong ngoài',
    pillar: 'goal',
    colorToken: '--gita-blue-500',
    meaning:
      'Vệt rộng nhất, ôm trọn cả dấu hiệu. Mục tiêu là thứ bao lấy mọi việc còn lại — không có nó thì ba trụ kia không biết đi đâu.',
  },
  {
    element: 'Vệt cong đỏ cắt ngang',
    pillar: 'inspirits',
    colorToken: '--gita-red-500',
    meaning:
      'Vệt duy nhất đổi màu và cắt lên trên. Nội lực là thứ làm quỹ đạo đi lên thay vì đi vòng — nó phá thế cân bằng theo hướng tốt.',
  },
  {
    element: 'Vệt cong trong',
    pillar: 'talent',
    colorToken: '--gita-blue-400',
    meaning:
      'Vệt mảnh nhất, nằm sát tâm. Tài năng là đường đi ngắn nhất tới đích, nhưng chỉ thấy được khi đã ở gần tâm.',
  },
  {
    element: 'Cụm sao',
    pillar: 'action',
    colorToken: '--gita-blue-600',
    meaning:
      'Nhiều ngôi rời rạc, xếp thành một đường đi lên. Hành động không phải một cú bứt phá mà là những điểm nhỏ lặp lại đủ lâu để thành một hướng.',
  },
];

/* ── He chu ────────────────────────────────────────────────────────────── */

export interface TypeStep {
  name: string;
  usage: string;
  size: string;
  lineHeight: string;
  weight: number;
}

/**
 * Thang chu cho TAI LIEU IN, don vi pt.
 *
 * Vi sao khong nap phong chu ngoai: chinh sach bao mat cua trang chi cho phep
 * `font-src 'self'`, va toan bo ung dung phai chay duoc khi mat mang. Mot bo
 * nhan dien phu thuoc vao mot phong chu tai tu Internet se vo hieu dung luc
 * nguoi hoc can no nhat — trong phong thi thu offline, hoac khi in ra giay o
 * mot may khong co mang.
 *
 * Doi lai, he chu dua tren phong chu he thong duoc chon theo thu tu bao dam
 * DAY DU DAU TIENG VIET tren ca ba he dieu hanh.
 */
export const PRINT_TYPE_SCALE: readonly TypeStep[] = [
  { name: 'Tên tài liệu', usage: 'Dòng đầu trang bìa và đầu mỗi phiếu.', size: '20pt', lineHeight: '1.25', weight: 700 },
  { name: 'Tiêu đề mục', usage: 'Chặng, phần, mục lớn trong phiếu.', size: '13pt', lineHeight: '1.3', weight: 600 },
  { name: 'Tiêu đề phụ', usage: 'Dạng bài, bước giải, tên bảng.', size: '11pt', lineHeight: '1.35', weight: 600 },
  { name: 'Nội dung', usage: 'Đề bài, lời giải, phân tích.', size: '10.5pt', lineHeight: '1.55', weight: 400 },
  { name: 'Chú thích', usage: 'Nguồn ngữ liệu, ghi chú chân trang, mã tài liệu.', size: '8.5pt', lineHeight: '1.4', weight: 400 },
];

export const FONT_STACKS = {
  sans: "'Inter var', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
  serif: "Georgia, 'Times New Roman', 'Noto Serif', 'Liberation Serif', serif",
  mono: "ui-monospace, 'SF Mono', 'JetBrains Mono', 'Cascadia Code', Menlo, monospace",
} as const;

/* ── Quy tac dung ──────────────────────────────────────────────────────── */

export interface BrandRule {
  rule: string;
  why: string;
}

/**
 * Quy tac dung. Moi quy tac deu co ly do — mot quy tac khong giai thich duoc
 * ly do se bi pha ngay lan dau co nguoi voi, va dung ra la nen bi pha.
 */
export const BRAND_RULES: readonly BrandRule[] = [
  {
    rule: 'Màu thương hiệu không bao giờ xuất hiện bên trong biểu đồ, và màu biểu đồ không bao giờ dùng cho nút bấm hay liên kết.',
    why: 'Hai bảng màu trả lời hai câu hỏi khác nhau: "bấm được không" và "đây là nhóm nào". Trộn chúng lại thì người đọc sẽ thử bấm vào một cột biểu đồ, hoặc bỏ qua một nút vì tưởng nó là chú giải.',
  },
  {
    rule: 'Đỏ GITA chỉ dùng cho đồ họa và mảng lớn. Chữ màu đỏ phải dùng biến thể đậm hơn.',
    why: 'Đỏ của logo đạt 4,63:1 trên nền trắng — vừa đủ cho chữ thường nhưng không còn biên an toàn nào khi in mờ hoặc xem trên màn hình kém.',
  },
  {
    rule: 'Dấu hiệu GITA luôn có khoảng thở tối thiểu bằng chiều cao chữ G ở cả bốn phía.',
    why: 'Vệt cong của dấu hiệu vươn ra ngoài khung chữ nhật của nó. Đặt sát mép hoặc sát chữ khác thì hai đường cong sẽ đọc thành một hình rối.',
  },
  {
    rule: 'Không đổi tỉ lệ, không xoay, không đổ bóng, không đổi màu dấu hiệu ngoài hai biến thể đã có (đủ màu và một màu).',
    why: 'Dấu hiệu được nhận ra bằng hình bóng tổng thể chứ không phải chi tiết. Mọi biến dạng đều làm hỏng chính thứ tạo ra sự nhận ra đó.',
  },
  {
    rule: 'Mọi tài liệu phát ra ngoài đều mang mã tài liệu ở đầu trang và chân trang.',
    why: 'Một phiếu rời khỏi hệ thống là một phiếu không còn ngữ cảnh. Mã tài liệu cho phép bất kỳ ai — học viên, phụ huynh, giáo viên khác — tìm lại đúng lời giải và đúng phiếu hướng dẫn của nó.',
  },
  {
    rule: 'Tài liệu in luôn phải đọc được khi in đen trắng.',
    why: 'Phần lớn phiếu được in ở nhà hoặc ở tiệm photo. Nếu thông tin chỉ được mã hóa bằng màu thì bản in đen trắng sẽ mất sạch thông tin đó — nên mọi mã màu đều đi kèm chữ hoặc ký hiệu.',
  },
];

/* ── He tai lieu ───────────────────────────────────────────────────────── */

export interface DocumentKind {
  code: string;
  name: string;
  purpose: string;
  accent: 'blue' | 'red' | 'slate';
}

/**
 * Nam loai tai lieu cua he thong. Ma tien to cua tai lieu vua la ma tra cuu,
 * vua la thu nhan dien: nhin ba chu cai dau la biet minh dang cam thu gi.
 */
export const DOCUMENT_KINDS: readonly DocumentKind[] = [
  { code: 'PL', name: 'Phiếu luyện', purpose: 'Bài để làm. Không có đáp án.', accent: 'blue' },
  { code: 'LG', name: 'Phiếu lời giải', purpose: 'Lời giải đầy đủ kèm bảng phân tích chuyên sâu.', accent: 'red' },
  { code: 'HD', name: 'Phiếu hướng dẫn ôn chắc', purpose: 'Một phiếu cho cả chuyên đề: tiêu chí đạt và kế hoạch ôn.', accent: 'slate' },
  { code: 'DV', name: 'Phiếu định vị', purpose: 'Kết quả bài kiểm tra định vị đầu vào.', accent: 'blue' },
  { code: 'BC', name: 'Báo cáo', purpose: 'Báo cáo tiến độ cho học viên, gia đình hoặc tổ chức.', accent: 'slate' },
];
