import { MAX_TOTAL_SCORE, SECTIONS } from '../config';
import type { SectionId } from '../types';

/**
 * KY THI CAP CHUNG CHI HSA365
 *
 * Van de that ma no giai: mot hoc vien on tam thang van khong biet minh dang o
 * dau. Diem cac buoi luyen len xuong that thuong, va cau hoi "minh co on khong"
 * khong co cau tra loi nao ngoai cam giac. Nguoi hoc buoc vao phong thi that
 * lan dau tien voi mot thu duy nhat: hy vong.
 *
 * Ky sat hach nay bien cam giac thanh BANG CHUNG. No khong phai mot bai thi
 * thu nua — no khac o ba diem, va ca ba deu co chu dich:
 *
 * 1. CO QUY CHE. Lam mot lan, khong dung giua chung, khong xem lai giua bai.
 *    Chinh su khong the lam lai moi tao ra ap luc giong phong thi that — va
 *    ap luc do la thu can duoc tap truoc, khong phai thu gap lan dau vao ngay
 *    thi that.
 * 2. CO BAC. Bon bac chung chi thay vi mot con so. Mot con so noi "ban duoc
 *    97 diem"; mot bac noi "ban dang o dau va can gi de len tiep" — va do la
 *    thong tin dung duoc.
 * 3. CO VAN BAN. Mot chung chi in duoc, co ma xac thuc. Nghe co ve hinh thuc,
 *    nhung mot to giay cam duoc lam thay doi cach mot nguoi 17 tuoi noi ve
 *    ban than minh — va su tu tin do di theo ho vao phong thi.
 *
 * KHONG PHONG DAI: chung chi nay la cua HSA365, khong phai cua DHQGHN va
 * khong co gia tri xet tuyen. Dieu do duoc in THANG tren chung chi. Mot to
 * giay noi qua ve chinh no se lam hong niem tin vao moi thu con lai.
 */

export type CertLevelId = 'dong' | 'bac' | 'vang' | 'kim-cuong';

export interface CertLevel {
  id: CertLevelId;
  name: string;
  /** Diem toi thieu tren thang 150. */
  minScore: number;
  /** Diem toi thieu MOI PHAN — chan viec bu tru giua cac phan. */
  minPerSection: number;
  /** Mau dai dien, dung ma mau cua bo nhan dien. */
  colorToken: string;
  meaning: string;
  /** Viec tiep theo de len bac — luon cu the. */
  nextStep: string;
}

/**
 * Bon bac.
 *
 * Diem then chot la `minPerSection`: khong cho bu tru giua cac phan. Mot nguoi
 * duoc 45/50 Toan nhung 18/50 Van co tong 100 diem — con so trong dep nhung
 * ho se that bai o phong thi that, vi de that khong cho phep bo qua mot phan.
 * Yeu cau san moi phan la cach duy nhat de chung chi noi len dieu no hua.
 */
export const CERT_LEVELS: readonly CertLevel[] = [
  {
    id: 'kim-cuong',
    name: 'Kim cương',
    minScore: 120,
    minPerSection: 36,
    colorToken: 'var(--color-gita-blue-600)',
    meaning:
      'Đủ sức cạnh tranh ở các ngành và trường lấy điểm cao nhất. Không phần nào là điểm yếu.',
    nextStep:
      'Giữ phong độ và bảo vệ nền. Ở mức này rủi ro lớn nhất không phải thiếu kiến thức mà là mất nhịp trong những tuần cuối.',
  },
  {
    id: 'vang',
    name: 'Vàng',
    minScore: 100,
    minPerSection: 30,
    colorToken: 'var(--color-gita-red-600)',
    meaning:
      'Vượt ngưỡng xét tuyển của phần lớn trường dùng kết quả HSA, và cả ba phần đều vững.',
    nextStep:
      'Tìm phần đang thấp nhất và kéo riêng nó lên. Ở mức này, 20 điểm tiếp theo gần như luôn nằm ở một phần duy nhất.',
  },
  {
    id: 'bac',
    name: 'Bạc',
    minScore: 85,
    minPerSection: 25,
    colorToken: 'var(--color-gita-blue-500)',
    meaning:
      'Nền đã vững, còn dư địa rõ ràng. Đây là mức mà công sức bỏ ra đổi thành điểm nhanh nhất.',
    nextStep:
      'Chuyển từ phiếu lý thuyết sang phiếu kỹ năng và phiếu nâng cao. Kiến thức đã đủ, thứ còn thiếu là tốc độ và độ chắc.',
  },
  {
    id: 'dong',
    name: 'Đồng',
    minScore: 65,
    minPerSection: 18,
    colorToken: 'var(--color-fg-muted)',
    meaning:
      'Đã đi hết vòng phủ kiến thức và làm được trọn một đề đủ 150 câu — mốc mà phần lớn người bỏ cuộc chưa bao giờ chạm tới.',
    nextStep:
      'Bịt lỗ hổng ở phần yếu nhất trước khi luyện tốc độ. Luyện tốc độ trên một nền chưa chắc chỉ làm sai nhanh hơn.',
  },
];

export const CERT_LEVEL_BY_ID = new Map(CERT_LEVELS.map((l) => [l.id, l]));

export interface SectionScoreInput {
  section: SectionId;
  score: number;
}

export interface CertResult {
  level: CertLevel | null;
  total: number;
  /** Bac ke tiep va dieu con thieu de dat duoc no. */
  next: CertLevel | null;
  /** Phan dang keo bac xuong, `null` neu khong phan nao can tro. */
  blockingSection: SectionId | null;
  /** Con thieu bao nhieu diem tong de len bac ke tiep. */
  pointsToNext: number;
}

/**
 * Xep bac.
 *
 * Duyet tu bac cao xuong. Mot bac chi dat khi CA HAI dieu kien thoa: tong diem
 * va diem san moi phan. Khi tong du ma mot phan chua du, ham nay chi ra dung
 * phan do — vi "ban thieu 5 diem" la thong tin vo dung, con "phan Van cua ban
 * dang keo ca ket qua xuong" thi dung duoc ngay.
 */
export function gradeCertification(
  sections: readonly SectionScoreInput[],
): CertResult {
  const total = sections.reduce((n, s) => n + s.score, 0);
  const lowest = sections.reduce<SectionScoreInput | null>(
    (min, s) => (min === null || s.score < min.score ? s : min),
    null,
  );

  let earned: CertLevel | null = null;
  for (const level of CERT_LEVELS) {
    const meetsTotal = total >= level.minScore;
    const meetsFloor = sections.every((s) => s.score >= level.minPerSection);
    if (meetsTotal && meetsFloor) {
      earned = level;
      break;
    }
  }

  const earnedIndex = earned ? CERT_LEVELS.indexOf(earned) : CERT_LEVELS.length;
  const next = earnedIndex > 0 ? (CERT_LEVELS[earnedIndex - 1] as CertLevel) : null;

  // Phan can tro: phan dang duoi diem san cua bac ke tiep.
  const blocking =
    next && lowest && lowest.score < next.minPerSection ? lowest.section : null;

  return {
    level: earned,
    total,
    next,
    blockingSection: blocking,
    pointsToNext: next ? Math.max(0, next.minScore - total) : 0,
  };
}

/* ── Quy che ───────────────────────────────────────────────────────────── */

export interface ExamRule {
  rule: string;
  why: string;
}

/**
 * Quy che ky sat hach.
 *
 * Moi dieu deu kem ly do, vi mot quy che khong giai thich duoc ly do se bi coi
 * la lam kho de va bi tim cach lach — trong khi day la nhung dieu duoc dat ra
 * de bao ve chinh gia tri cua ket qua.
 */
export const EXAM_RULES: readonly ExamRule[] = [
  {
    rule: 'Làm một lần duy nhất trong mỗi đợt. Không tạm dừng, không quay lại phần đã nộp.',
    why: 'Chính sự không thể làm lại tạo ra áp lực giống phòng thi thật. Áp lực đó cần được tập trước, chứ không phải gặp lần đầu vào đúng ngày thi.',
  },
  {
    rule: 'Ba phần tính giờ riêng: 75 — 60 — 60 phút, không cộng dồn.',
    why: 'Đúng như quy chế thi thật. Làm nhanh phần trước không cho thêm phút nào cho phần sau, nên phải tập phân bổ thời gian trong nội bộ từng phần.',
  },
  {
    rule: 'Không mở tài liệu, không dùng Gia sư AI trong lúc làm.',
    why: 'Một kết quả đạt được nhờ mở tài liệu không nói lên điều gì về năng lực trong phòng thi — và tệ hơn, nó tạo ra một sự tự tin sai chỗ.',
  },
  {
    rule: 'Mỗi bậc yêu cầu cả tổng điểm lẫn điểm sàn từng phần.',
    why: 'Không cho bù trừ giữa các phần. Một người 45/50 Toán nhưng 18/50 Văn có tổng 100 điểm trông đẹp, nhưng sẽ thất bại ở đề thật vì đề thật không cho phép bỏ qua một phần.',
  },
  {
    rule: 'Được thi lại ở đợt sau, và bậc cao nhất từng đạt được giữ nguyên.',
    why: 'Một kỳ sát hạch chỉ được thi một lần sẽ khiến người học né tránh nó. Mục đích ở đây là đo và tạo động lực, không phải loại người.',
  },
];

/* ── Chung chi ─────────────────────────────────────────────────────────── */

/**
 * Ma xac thuc chung chi.
 *
 * Dung dinh dang doc duoc va go lai duoc: HSA365-<nam><thang>-<6 ky tu>.
 * Sinh tu ket qua nen cung mot ket qua luon cho cung mot ma — khong luu tru
 * tap trung, phu hop voi kien truc khong may chu, va van kiem tra lai duoc
 * bang cach nhap lai diem thanh phan.
 *
 * KHONG dung chu so gay nham lan (0/O, 1/I) de nguoi ta doc qua dien thoai
 * ma khong sai.
 */
const CODE_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

export function certificateCode(
  learnerName: string,
  total: number,
  issuedAt: number,
): string {
  const date = new Date(issuedAt);
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`;

  let hash = 2166136261;
  for (const char of `${learnerName}|${total}|${stamp}`) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619) >>> 0;
  }

  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += CODE_ALPHABET[hash % CODE_ALPHABET.length];
    hash = Math.floor(hash / CODE_ALPHABET.length) + i * 7919;
  }
  return `HSA365-${stamp}-${code}`;
}

/** Dong tuyen bo gioi han, in tren moi chung chi. Khong duoc bo. */
export const CERT_DISCLAIMER =
  'Chứng chỉ này do HSA365 cấp dựa trên kết quả sát hạch nội bộ. Đây không phải chứng chỉ của Đại học Quốc gia Hà Nội và không có giá trị xét tuyển. Giá trị của nó nằm ở chỗ khác: nó là bằng chứng đo được về năng lực hiện tại của người học.';

/** Tong diem toi da, lay tu cau truc de that. */
export const CERT_MAX_SCORE = MAX_TOTAL_SCORE;

/** Diem toi da moi phan, dung de ve thanh tien do. */
export function sectionMax(section: SectionId): number {
  return SECTIONS.find((s) => s.id === section)?.questionCount ?? 50;
}
