/**
 * HOC PHI VA GOI DICH VU
 *
 * KHAO SAT THI TRUONG (cong khai, thang 8-2026):
 *
 *   Le phi thi HSA chinh thuc      600.000 d/luot, toi da 2 luot/nam
 *   Khoa tu hoc online dai tra     449.000 – 499.000 d (gia dong gia khuyen mai)
 *   Khoa tong on co giao vien      niem yet 7.200.000 d — ban thuc 2.700.000 d
 *   Khoa TSA tuong duong           niem yet 7.800.000 d — ban thuc 3.900.000 d
 *
 * QUY LUAT LO RA TU SO LIEU, va day la dieu quan trong nhat:
 * Thi truong nay NEO GIA GOC CAO ROI GIAM 50% QUANH NAM. Khi mot khoa niem
 * yet 7,2 trieu luon ban 2,7 trieu, khach hang hoc duoc mot bai hoc: gia niem
 * yet la gia gia. Hau qua khong phai la ban duoc nhieu hon — hau qua la MOI
 * cuoc ban hang bien thanh mot cuoc mac ca, va nguoi mua luon ngo minh vua
 * bi hot gia.
 *
 * DINH GIA CUA HSA365 DI NGUOC LAI: mot muc gia, khong giam gia, khong "uu
 * dai 50%" theo mua. Gia nam cao hon GIA BAN THUC cua thi truong khoang 25%
 * nhung thap hon han GIA NIEM YET — va duoc bao ve bang thu doi thu khong co,
 * chu khong bang chiet khau.
 *
 * Vi sao dam dinh gia cao hon: moi doi thu ban NOI DUNG (bai giang + de).
 * HSA365 ban MOT HE THONG DO LUONG: dinh vi thich ung dau vao, lo trinh ca
 * nhan hoa theo Rasch, 2000 phieu sinh tu dac ta, kho bi kip, bao cao gia
 * dinh, khong gian lam viec cho giao vien. Do la loai gia tri khong so sanh
 * duoc theo so gio video, nen cung khong bi keo vao cuoc dua giam gia.
 *
 * TRANG THAI HIEN TAI: gia dang dat NGANG MUC THI TRUONG, cho chu doanh
 * nghiep chot con so cuoi. Xem `PRICING_STATUS` ben duoi. Toan bo lap luan ve
 * dinh gia o tren van giu nguyen gia tri — no la khung de quyet dinh, khong
 * phai con so da quyet.
 */

export const SURVEYED_AT = '2026-08';

/**
 * Trang thai cua bang gia.
 *
 * Viet ra thanh mot hang so thay vi mot ghi chu trong dau ai do, vi mot bang
 * gia tam thoi ma khong ai nho la tam thoi se tro thanh bang gia chinh thuc
 * sau ba thang.
 */
export const PRICING_STATUS = {
  state: 'tam-thoi' as const,
  note: 'Giá đang đặt ngang mức thị trường, chờ chốt con số cuối.',
  decision:
    'Khung định giá (một mức giá, không giảm giá theo mùa, cao hơn giá bán thực ~25%) đã sẵn sàng trong PRICING_PRINCIPLES. Khi chốt, chỉ cần đổi `price` của từng gói và đặt state thành "da-chot".',
};
export const CURRENCY = 'VNĐ';

/** Le phi thi chinh thuc — khong phai doanh thu cua chung ta, nhung khach can biet. */
export const OFFICIAL_EXAM_FEE = 600_000;
export const MAX_EXAM_ATTEMPTS_PER_YEAR = 2;

export interface MarketReference {
  segment: string;
  /** Gia niem yet cong khai, `null` neu don vi khong niem yet. */
  listed: number | null;
  /** Gia ban thuc te sau khuyen mai thuong truc. */
  actual: number;
  source: string;
  note: string;
}

/**
 * Bang tham chieu thi truong — DUNG NOI BO.
 *
 * Co y khong dua len trang hoc phi cong khai. Mot bang so sanh doi thu tren
 * trang ban hang doc ra nhu loi cong kich va lam nguoi mua nghi ngo ca hai
 * ben. Nhung nguoi tu van thi CAN no: ho bi hoi "sao ben kia re hon" trong
 * gan nhu moi cuoc goi, va tra loi ap ung mot lan la mat ca hop dong.
 */
export const MARKET_REFERENCE: readonly MarketReference[] = [
  {
    segment: 'Khóa tự học online đại trà',
    listed: null,
    actual: 499_000,
    source: 'Tuyensinh247 — chương trình đồng giá 449–499K',
    note: 'Bài giảng quay sẵn và bộ đề. Không có định vị đầu vào, không có lộ trình riêng cho từng người.',
  },
  {
    segment: 'Khóa tổng ôn có giáo viên',
    listed: 7_200_000,
    actual: 2_700_000,
    source: 'HSA Education — khóa VIP01, ưu đãi 50% thường trực',
    note: 'Giá niêm yết gấp 2,7 lần giá bán thực. Đây là mức neo, không phải mức giao dịch.',
  },
  {
    segment: 'Khóa luyện thi tư duy tương đương',
    listed: 7_800_000,
    actual: 3_900_000,
    source: 'HSA Education — khóa TSA Bách Khoa, ưu đãi 50%',
    note: 'Cùng một khuôn giảm giá 50%. Cho thấy đây là chính sách giá, không phải đợt khuyến mãi.',
  },
];

export type PlanId = 'tu-hoc' | 'co-kem' | 'coach' | 'to-chuc';

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  /** Gia tron mua thi, don vi VND. Voi goi to chuc: gia moi hoc vien moi nam. */
  price: number;
  priceUnit: string;
  /** Quy doi theo thang de nguoi mua de hinh dung, `null` neu khong ap dung. */
  perMonth: number | null;
  /** Ai nen mua goi nay — va ai KHONG nen. */
  bestFor: string;
  notFor: string;
  includes: readonly string[];
  /** Diem khac biet chinh so voi goi thap hon lien ke. */
  upgrade: string | null;
  featured: boolean;
}

/** Mot mua thi tinh 8 thang, tu thang 9 den ky thi thang 4 nam sau. */
export const SEASON_MONTHS = 8;

export const PLANS: readonly Plan[] = [
  {
    id: 'tu-hoc',
    name: 'Tự học',
    tagline: 'Toàn bộ hệ thống, bạn tự đi.',
    price: 499_000,
    priceUnit: 'trọn mùa thi',
    perMonth: Math.round(499_000 / SEASON_MONTHS),
    bestFor:
      'Người đã có kỷ luật tự học và chỉ thiếu một lộ trình đúng. Nếu bạn từng tự ôn được một môn tới nơi tới chốn, gói này đủ.',
    notFor:
      'Người hay bỏ dở giữa chừng. Hệ thống nhắc được nhưng không kéo bạn dậy — đó là việc của con người, và nó nằm ở gói Có kèm.',
    includes: [
      'Bài định vị đầu vào 36 câu chọn thích ứng, ra cấp độ khởi điểm cho cả 30 chuyên đề',
      '2.000 phiếu luyện và 2.000 nhiệm vụ theo lộ trình cá nhân hóa',
      'Bộ giải đề đầy đủ kèm bảng phân tích chuyên sâu cho từng câu',
      'Kho bí kíp: 90 dạng bài với đọc vị, phương pháp, bước giải, mẹo xử lý',
      '5 đề mẫu trọn vẹn 150 câu kèm đáp án và barem',
      'Sổ tay lỗi sai ôn tập ngắt quãng, phân tích năng lực theo mô hình Rasch',
      'Mô thức GITA: bốn trụ cột, thói quen, quy tắc 20/80',
      'Chạy được hoàn toàn khi mất mạng, dữ liệu nằm trên máy của bạn',
    ],
    upgrade: null,
    featured: false,
  },
  {
    id: 'co-kem',
    name: 'Có kèm',
    tagline: 'Có người nhìn bài của bạn mỗi tuần.',
    price: 2_900_000,
    priceUnit: 'trọn mùa thi',
    perMonth: Math.round(2_900_000 / SEASON_MONTHS),
    bestFor:
      'Phần lớn người học. Đây là gói được thiết kế làm mặc định, không phải gói bán thêm.',
    notFor:
      'Người cần xử lý vấn đề động lực hoặc đang mất phương hướng nghiêm trọng — cái đó cần coach, không cần thêm bài.',
    includes: [
      'Toàn bộ gói Tự học',
      'Giáo viên nhận hồ sơ và giao gói nhiệm vụ riêng mỗi tuần',
      'Nhận xét bài làm và duyệt lên cấp theo tiêu chí hệ thống, không theo cảm tính',
      'Báo cáo gửi gia đình hằng tháng, kèm ba việc gia đình làm được',
      'Hai buổi chữa đề trực tiếp trước mỗi đợt thi',
    ],
    upgrade: 'Thêm một con người đọc bài của bạn — thứ mà không phần mềm nào thay được.',
    featured: true,
  },
  {
    id: 'coach',
    name: 'Coach GITA 1:1',
    tagline: 'Làm việc với người, không chỉ với đề.',
    price: 7_900_000,
    priceUnit: 'trọn mùa thi',
    perMonth: Math.round(7_900_000 / SEASON_MONTHS),
    bestFor:
      'Người có mục tiêu cao và ít thời gian, hoặc người đã từng ôn mà không lên được điểm dù rất cố gắng.',
    notFor:
      'Người mới bắt đầu và chưa biết mình yếu ở đâu. Hãy làm bài định vị và học một tháng ở gói Có kèm trước — coach sẽ hiệu quả hơn nhiều khi đã có dữ liệu.',
    includes: [
      'Toàn bộ gói Có kèm',
      'Coach GITA riêng, hai buổi huấn luyện mỗi tháng',
      'Thiết kế thói quen theo bốn trụ GITA và theo dõi hằng tuần',
      'Lộ trình cá nhân được coach hiệu chỉnh, không chỉ do hệ thống sinh',
      'Đường dây riêng cho gia đình khi cần trao đổi',
    ],
    upgrade:
      'Chuyển từ "học đúng thứ" sang "trở thành người học được" — phần con người của việc học, thứ quyết định kết quả nhiều hơn số giờ ngồi bàn.',
    featured: false,
  },
  {
    id: 'to-chuc',
    name: 'Trường & Trung tâm',
    tagline: 'Cả hệ thống, cho cả tổ chức.',
    price: 390_000,
    priceUnit: 'mỗi học viên mỗi năm',
    perMonth: null,
    bestFor:
      'Trường, trung tâm và nhóm giáo viên có từ 50 học viên. Càng đông càng rẻ theo đầu người.',
    notFor: 'Nhóm dưới 50 học viên — chi phí vận hành làm mức giá này không bền.',
    includes: [
      'Toàn bộ gói Tự học cho mỗi học viên',
      'Không gian làm việc cho giáo viên, coach và tư vấn với phân quyền 10 vai trò',
      'Bảng lớp, xét duyệt lên cấp, giao nhiệm vụ hàng loạt',
      'Báo cáo tổ chức và báo cáo chất lượng ngân hàng câu hỏi',
      'Bộ nhận diện tài liệu in theo thương hiệu của tổ chức',
      'Đào tạo đội ngũ theo năm bậc chuyên môn P1–P5 của mô thức GITA',
    ],
    upgrade: null,
    featured: false,
  },
];

export const PLAN_BY_ID = new Map(PLANS.map((p) => [p.id, p]));

/* ── Cam ket ket qua ───────────────────────────────────────────────────── */

export interface Commitment {
  title: string;
  promise: string;
  /** Dieu kien nguoi hoc phai giu — viet ro de khong ai hieu nham ve sau. */
  conditions: readonly string[];
  /** Vi sao chung ta dam cam ket dieu nay. */
  why: string;
}

/**
 * CAM KET KET QUA
 *
 * Day la thu tao ra khac biet lon nhat, va cung la thu rui ro nhat neu lam au.
 *
 * Hau het trung tam khong dam cam ket diem vi ho khong DO duoc tien do. Ho chi
 * biet hoc vien co di hoc hay khong. HSA365 co diem du bao theo mo hinh Rasch
 * cap nhat lien tuc, nen do duoc muc tang that — va do duoc thi cam ket duoc.
 *
 * Dieu kien phai viet RO va CONG BANG cho ca hai phia. Mot cam ket co dieu
 * kien mo ho la mot cam ket se bi tranh cai, va mot tranh cai voi phu huynh
 * dat hon nhieu lan so voi so tien hoan lai.
 */
export const COMMITMENT: Commitment = {
  title: 'Cam kết mức tăng, không cam kết điểm tuyệt đối',
  promise:
    'Nếu sau trọn mùa thi mà điểm dự báo không tăng ít nhất 15 điểm so với kết quả bài định vị đầu vào, học viên được học lại trọn mùa sau miễn phí.',
  conditions: [
    'Hoàn thành ít nhất 80% số phiếu được giao trong mùa',
    'Duy trì KPI giai đoạn từ 70% trở lên',
    'Không nghỉ quá 14 ngày liên tiếp mà không báo trước',
    'Làm đủ các đợt thi thử được lên lịch',
  ],
  why:
    'Cam kết mức TĂNG chứ không cam kết điểm tuyệt đối, vì điểm tuyệt đối phụ thuộc điểm xuất phát — cam kết 100 điểm cho người xuất phát từ 50 và người xuất phát từ 95 là hai lời hứa hoàn toàn khác nhau về độ khó. Mức tăng thì công bằng với mọi điểm xuất phát, và nó là thứ nhà trường thật sự tạo ra.',
};

/* ── Nguyen tac dinh gia ───────────────────────────────────────────────── */

export interface PricingPrinciple {
  rule: string;
  why: string;
}

export const PRICING_PRINCIPLES: readonly PricingPrinciple[] = [
  {
    rule: 'Một mức giá. Không giảm giá theo mùa, không "ưu đãi 50%".',
    why: 'Thị trường này niêm yết 7,2 triệu rồi bán 2,7 triệu quanh năm. Khách hàng học được rằng giá niêm yết là giá giả — và từ đó mọi cuộc bán hàng thành một cuộc mặc cả, người mua luôn ngờ mình vừa bị hớ. Một mức giá thật thì không có gì để mặc cả.',
  },
  {
    rule: 'Giá nằm cao hơn giá bán thực của thị trường khoảng 25%, thấp hơn hẳn giá niêm yết.',
    why: 'Cao hơn để không bị xếp cùng nhóm với khóa video; thấp hơn giá niêm yết để người so sánh thấy ngay rằng chúng ta không chơi trò neo giá.',
  },
  {
    rule: 'Mỗi gói nói rõ ai KHÔNG nên mua nó.',
    why: 'Bán gói sai cho một người là mất người đó vĩnh viễn, cộng thêm những người họ kể lại. Nói thẳng "gói này không hợp với bạn" là cách rẻ nhất để không bao giờ phải hoàn tiền.',
  },
  {
    rule: 'Gói mặc định là gói giữa, không phải gói rẻ nhất.',
    why: 'Gói rẻ nhất chỉ hợp với người đã có kỷ luật tự học — một thiểu số. Đẩy đa số vào gói đó là tạo ra một đám đông học viên bỏ dở, và họ sẽ kể rằng sản phẩm không hiệu quả.',
  },
  {
    rule: 'Cam kết mức tăng, và cam kết đó có điều kiện viết rõ.',
    why: 'Cam kết được vì đo được. Nhưng điều kiện mơ hồ sẽ dẫn tới tranh cãi, và một tranh cãi với phụ huynh đắt hơn nhiều lần số tiền hoàn lại.',
  },
];

/** Dinh dang tien Viet, khong lam tron ao. */
export function formatVnd(amount: number): string {
  return `${amount.toLocaleString('vi-VN')} ${CURRENCY}`;
}

/** Chi phi thuc te ca mua, gom hoc phi va le phi thi. */
export function totalSeasonCost(planId: PlanId, attempts = 2): number {
  const plan = PLAN_BY_ID.get(planId);
  if (!plan) return 0;
  const fees = OFFICIAL_EXAM_FEE * Math.min(Math.max(0, attempts), MAX_EXAM_ATTEMPTS_PER_YEAR);
  return plan.price + fees;
}
