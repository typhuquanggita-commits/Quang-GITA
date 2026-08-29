/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* ==========================================================================
   ENGWILL365 — HỆ THỐNG NHẬN DIỆN
   Đây là nguồn duy nhất cho mọi giá trị thiết kế. Công cụ tools/make-brand.mjs
   đọc chính các hằng này để dựng logo, huy hiệu và sơ đồ, nên đổi một mã màu ở
   đây là toàn bộ ấn phẩm đổi theo.
   ========================================================================== */

export const BRAND_IDEA = {
  name: 'ENGWILL365',
  meaning: 'ENGlish + WILL + 365',
  positioning:
    'Không phải trung tâm dạy tiếng Anh. Là hệ thống giúp một người trưởng thành đi hết 1.095 ngày mà không bỏ cuộc.',
  bigIdea:
    'Toàn bộ nhận diện xoay quanh một hình ảnh duy nhất: VÒNG TRÒN CÒN HỞ. Ba trăm sáu mươi lăm ngày vẽ thành một vòng, nhưng vòng đó không bao giờ khép kín — luôn còn một khoảng hở, chính là ngày hôm nay bạn chưa học. Người xem hiểu ngay mà không cần giải thích, và nó nhắc đúng thứ hệ thống này đặt cược: chuỗi ngày.',
  insideTheRing:
    'Bên trong vòng là năm vạch đi lên, ứng với năm tầng của tháp học tập. Chúng chuyển màu dần từ hồng sang tím — đúng dải màu dùng cho năm tầng trong toàn hệ thống. Logo vì thế không phải hình trang trí: nó là bản đồ thu nhỏ của lộ trình.',
  voice: [
    'Nói thẳng, không hoa mỹ. Nếu một điều là khó thì gọi nó là khó.',
    'Dùng con số thay cho tính từ. Không nói "tiến bộ vượt bậc", nói "từ 6.0 lên 7.0 trong 9 tháng".',
    'Không hứa nhanh, không hứa dễ. Lời hứa duy nhất là: có hệ thống và có người đồng hành.',
    'Xưng hô như người đi trước nói với người đi sau, không như trung tâm nói với khách hàng.',
    'Không bao giờ dùng ảnh người mẫu cười giả tạo cầm sách. Dùng ảnh học viên thật, khoảnh khắc thật.',
  ],
};

/* ------------------------------- MÀU ------------------------------------- */

export const COLORS = {
  /** Màu nền — nhận diện của hệ thống là nền tối. */
  ink: {hex: '#020617', name: 'Mực', use: 'Nền chính của mọi giao diện và ấn phẩm số'},
  surface: {hex: '#0F172A', name: 'Nền nổi', use: 'Thẻ, khối nội dung nổi trên nền mực'},
  line: {hex: '#1E293B', name: 'Đường kẻ', use: 'Viền, đường phân cách'},
  muted: {hex: '#64748B', name: 'Chữ phụ', use: 'Chú thích, nhãn, thông tin thứ cấp'},
  body: {hex: '#CBD5E1', name: 'Chữ nội dung', use: 'Toàn bộ văn bản đọc'},
  bright: {hex: '#F1F5F9', name: 'Chữ nổi', use: 'Tiêu đề, con số lớn'},
  paper: {hex: '#FAFAF9', name: 'Giấy', use: 'Nền cho ấn phẩm in — sổ tay, poster'},

  /** Màu chức năng. */
  primary: {hex: '#38BDF8', name: 'Lam học viên', use: 'Mọi thứ hướng tới người học'},
  academy: {hex: '#10B981', name: 'Lục vận hành', use: 'Mọi thứ dành cho cố vấn và học viện'},
  accent: {hex: '#8B5CF6', name: 'Tím đỉnh', use: 'Cấp độ cao, thành tựu, vinh danh'},
  warn: {hex: '#F59E0B', name: 'Hổ phách', use: 'Cảnh báo, bẫy, điều cần chú ý'},
  danger: {hex: '#F43F5E', name: 'Hồng cảnh', use: 'Lỗi nặng, rủi ro cao, phản mẫu'},
};

/** Dải màu năm tầng — dùng cho logo, huy hiệu và mọi ấn phẩm phân tầng. */
export const TIER_COLORS = [
  {tier: 1, code: 'KHAI NHĨ', from: '#F43F5E', to: '#F97316'},
  {tier: 2, code: 'KHAI NHÃN', from: '#F97316', to: '#F59E0B'},
  {tier: 3, code: 'KHAI KHẨU', from: '#F59E0B', to: '#10B981'},
  {tier: 4, code: 'KHAI THỦ', from: '#10B981', to: '#0EA5E9'},
  {tier: 5, code: 'KHAI ĐẠO', from: '#0EA5E9', to: '#8B5CF6'},
];

export const COLOR_RULES = [
  'Nền tối là mặc định. Bản nền sáng chỉ dùng khi in trên giấy.',
  'Không bao giờ dùng quá hai màu chức năng trong một khung hình.',
  'Màu tầng chỉ dùng để chỉ tầng. Không dùng làm màu trang trí.',
  'Chữ trên nền mực phải đạt tỉ lệ tương phản tối thiểu 4,5:1 — dùng Chữ nội dung trở lên, không dùng Chữ phụ cho đoạn văn.',
  'Chuyển sắc chỉ đi theo một chiều: từ hồng sang tím, không bao giờ ngược lại. Đó là chiều đi lên của lộ trình.',
];

/* ----------------------------- CHỮ --------------------------------------- */

export const TYPE = {
  display: {
    family: 'Inter Display',
    weights: 'ExtraBold 800 · Black 900',
    tracking: '-0.03em',
    use: 'Tên thương hiệu, tiêu đề lớn, tên cấp độ, con số thành tựu',
  },
  text: {
    family: 'Inter',
    weights: 'Regular 400 · Medium 500 · SemiBold 600',
    tracking: '0',
    use: 'Toàn bộ nội dung đọc, nhãn, chú thích',
  },
  mono: {
    family: 'DejaVu Sans Mono',
    weights: 'Regular 400',
    tracking: '0',
    use: 'Mã lỗi (PA-01), mốc thời gian, lệnh, mã cấp độ',
  },
};

export const TYPE_SCALE = [
  {name: 'Đại tự', size: '64/1.0', weight: 900, use: 'Con số thành tựu, tên cấp độ trên huy hiệu'},
  {name: 'Tiêu đề 1', size: '36/1.15', weight: 800, use: 'Tên trang, tên tập podcast'},
  {name: 'Tiêu đề 2', size: '24/1.25', weight: 700, use: 'Tiêu đề mục'},
  {name: 'Tiêu đề 3', size: '17/1.4', weight: 600, use: 'Tiêu đề khối'},
  {name: 'Nội dung', size: '15/1.65', weight: 400, use: 'Đoạn văn — dòng không quá 75 ký tự'},
  {name: 'Chú thích', size: '12/1.5', weight: 400, use: 'Nhãn, ghi chú dưới hình'},
  {name: 'Nhãn nhỏ', size: '10/1.4', weight: 600, use: 'Chữ hoa có giãn cách, nhãn phân loại'},
];

export const TYPE_RULES = [
  'Tiêu đề luôn dùng Inter Display với tracking âm. Nội dung luôn dùng Inter thường.',
  'Không dùng quá ba cỡ chữ trong một khung hình.',
  'Chữ hoa toàn bộ chỉ dùng cho nhãn dưới 20 ký tự, và bắt buộc giãn cách 0,15em.',
  'Dòng văn bản không quá 75 ký tự. Quá dài thì mắt mất dòng khi xuống hàng.',
  'Chữ trên video tối thiểu 28pt để đọc được trên điện thoại.',
];

/* ---------------------------- KHÔNG GIAN --------------------------------- */

export const SPACING = {
  base: 4,
  scale: [4, 8, 12, 16, 24, 32, 48, 64, 96],
  radius: {sm: 8, md: 12, lg: 16, pill: 999},
  rule: 'Mọi khoảng cách là bội của 4. Không có ngoại lệ — số lẻ làm bố cục trông cẩu thả mà không ai chỉ ra được vì sao.',
};

/* ------------------------------ LOGO ------------------------------------- */

export const LOGO_RULES = {
  variants: [
    {id: 'monogram', name: 'Dấu hiệu', use: 'Avatar, favicon, đóng dấu góc video, huy hiệu'},
    {id: 'horizontal', name: 'Nằm ngang', use: 'Đầu trang web, chữ ký email, băng-rôn'},
    {id: 'stacked', name: 'Xếp dọc', use: 'Bìa sổ tay, poster, ảnh bìa podcast'},
    {id: 'wordmark', name: 'Chữ đơn', use: 'Khi đã có dấu hiệu ở chỗ khác trong cùng khung'},
  ],
  clearSpace:
    'Khoảng trống quanh logo tối thiểu bằng chiều cao chữ E trong ENGWILL. Không đặt bất kỳ thứ gì vào vùng đó.',
  minSize: 'Dấu hiệu tối thiểu 24px. Bản nằm ngang tối thiểu 120px chiều rộng.',
  donts: [
    'Không xoay, không nghiêng, không bóp méo tỉ lệ.',
    'Không đổi màu năm vạch — chúng ứng với năm tầng, đổi màu là đổi nghĩa.',
    'Không thêm đổ bóng, viền ngoài, hay hiệu ứng nổi.',
    'Không khép kín vòng tròn. Khoảng hở là toàn bộ ý nghĩa của dấu hiệu này.',
    'Không đặt logo lên ảnh có chi tiết rối — luôn cần một nền phẳng.',
  ],
};

/* --------------------------- BỘ ẤN PHẨM ---------------------------------- */

export const ASSET_KINDS = [
  {
    id: 'logo',
    name: 'Logo',
    count: '4 biến thể × 2 nền = 8 file',
    format: 'SVG + PNG@2x',
    note: 'Dấu hiệu, nằm ngang, xếp dọc, chữ đơn — bản nền tối và bản nền sáng.',
  },
  {
    id: 'tier',
    name: 'Huy hiệu tầng',
    count: '5 file',
    format: 'SVG + PNG@2x 512px',
    note: 'Một huy hiệu cho mỗi tầng của tháp học tập, dùng màu riêng của tầng.',
  },
  {
    id: 'level',
    name: 'Huy hiệu cấp độ',
    count: '25 file',
    format: 'SVG + PNG@2x 512px',
    note: 'Dựng tự động từ dữ liệu 25 cấp độ. Thêm một cấp trong data/levels.ts là có thêm huy hiệu.',
  },
  {
    id: 'podcast',
    name: 'Ảnh bìa podcast',
    count: '1 bìa series + 5 bìa định dạng',
    format: 'PNG 3000×3000 (chuẩn Apple Podcasts)',
    note: 'Bìa chương trình và bìa riêng cho từng định dạng.',
  },
  {
    id: 'diagram',
    name: 'Sơ đồ dạy học',
    count: '4 sơ đồ',
    format: 'SVG + PNG@2x',
    note: 'Tháp học tập, quỹ đạo 36 tháng, sơ đồ nối âm, bảng nguyên âm IPA.',
  },
  {
    id: 'card',
    name: 'Thẻ trích dẫn',
    count: 'Sinh theo yêu cầu',
    format: 'PNG 1080×1080 và 1080×1920',
    note: 'Dùng cho mạng xã hội và cho ấn phẩm dán tường.',
  },
];

export const PHOTO_DIRECTION = {
  title: 'Chỉ dẫn nhiếp ảnh — phần duy nhất phải thuê người chụp',
  note:
    'Sơ đồ, huy hiệu, bảng âm và bìa đều dựng được bằng máy. Riêng ảnh người thật thì không. Đây là bản brief đưa cho nhiếp ảnh gia.',
  rules: [
    'Chụp học viên thật của học viện. Không thuê người mẫu, không mua ảnh kho.',
    'Chụp khoảnh khắc đang làm, không chụp tư thế dàn dựng. Người đang đeo tai nghe chép chính tả, người đang nói trước nhóm, người đang bí và cau mày.',
    'Ánh sáng tự nhiên, một nguồn. Không đèn studio phẳng lì.',
    'Bối cảnh thật: bàn học ở nhà, quán cà phê, phòng club. Không phông nền trắng.',
    'Bao gồm cả khoảnh khắc khó: mệt, chán, làm lại lần thứ ba. Bộ ảnh chỉ toàn nụ cười sẽ không ai tin.',
    'Chừa chỗ trống trong khung để đặt chữ — chụp rộng hơn bố cục cuối một chút.',
    'Xin phép sử dụng hình ảnh bằng văn bản trước khi bấm máy.',
  ],
  shotList: [
    {scene: 'Khối sáng', shots: 'Bàn học lúc 5h45 · tay bật đèn · tai nghe đeo vào · lịch tô đen trên tường'},
    {scene: 'Chép chính tả', shots: 'Cận tay viết · màn hình có transcript · trang giấy tô đỏ chi chít lỗi'},
    {scene: 'Buổi 1-1', shots: 'Cận mặt đang nói · màn hình có gia sư · khoảnh khắc bí giữa câu'},
    {scene: 'Club', shots: 'Toàn cảnh nhóm · hai người tranh luận · một người ghi cụm hay vào sổ'},
    {scene: 'Bí và làm lại', shots: 'Cau mày trước trang giấy · xoá đi viết lại · bản nháp thứ ba'},
    {scene: 'Về đích', shots: 'Đánh dấu ô lịch cuối cùng · nhận huy hiệu · nghe lại bản ghi âm sáu tháng trước'},
  ],
};
