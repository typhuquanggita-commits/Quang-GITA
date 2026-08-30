/**
 * Programmes and fees.
 *
 * ## Every figure here is a placeholder
 *
 * `PRICING.confirmed` is `false`, and it must stay false until the centre's
 * owner has set real numbers. Nothing in this file is a quote. The amounts are
 * mid-market reference rates for SAT tuition in Hà Nội and Hồ Chí Minh City,
 * put here so the structure can be reviewed with plausible numbers in it
 * rather than with zeroes — a pricing table full of zeroes cannot be argued
 * with, and a pricing table full of invented numbers that nobody flagged is
 * how a wrong price reaches a parent.
 *
 * So the flag is load-bearing. While it is false:
 *
 *   - every surface that shows a fee labels it a reference range, not a price
 *   - the public page says the same thing, in the same words
 *   - a test asserts the two agree, so the label cannot be dropped from one
 *
 * Flip `confirmed` to true only when every `amount` below has been decided by
 * someone with the authority to decide it.
 *
 * ## Fees are derived, not typed
 *
 * A package price is the session rate times the session count from the
 * syllabus, less a stated package discount. Typing a total separately from
 * the course it belongs to is how a fee survives a course being shortened —
 * and a fee that no longer matches the sessions delivered is the complaint
 * that ends a relationship with a family.
 */

import type { CourseId } from './curriculum.ts';

export type DeliveryId = 'self' | 'group' | 'small' | 'private';

export interface Delivery {
  id: DeliveryId;
  name: string;
  nameVi: string;
  /** Learners per class. Null for self-study. */
  size: string | null;
  sizeVi: string | null;
  /**
   * Reference rate per session, in VND. A session is the course's own session
   * length — 120 minutes for most courses, 180 for the sprint — so the rate
   * is per session and not per hour on purpose: an hourly rate quoted against
   * a longer session is the oldest way to make a price look smaller.
   */
  amountPerSession: number;
  /** What the learner actually gets, beyond the sessions themselves. */
  includes: string[];
  includesVi: string[];
  /** Who this suits, stated as a condition rather than as a sales line. */
  suits: string;
  suitsVi: string;
}

export interface PackageDiscount {
  /** Fraction taken off the arithmetic total when the whole course is paid up front. */
  upfront: number;
  note: string;
  noteVi: string;
}

export interface Pricing {
  currency: 'VND';
  /**
   * False while the amounts are market reference rates rather than the
   * centre's own prices. Everything user-facing reads this.
   */
  confirmed: boolean;
  /** When the reference rates were last checked against the market. */
  referenceDate: string;
  deliveries: Delivery[];
  discount: PackageDiscount;
  /** Courses excluded from a delivery mode, with the reason. */
  exclusions: Array<{ course: CourseId; delivery: DeliveryId; reason: string; reasonVi: string }>;
  /** Stated once, and repeated wherever a fee appears. */
  terms: Array<{ en: string; vi: string }>;
}

export const PRICING: Pricing = {
  currency: 'VND',
  confirmed: false,
  referenceDate: '2026-08',

  deliveries: [
    {
      id: 'self',
      name: 'Platform only',
      nameVi: 'Chỉ dùng nền tảng',
      size: null,
      sizeVi: null,
      // Charged per course rather than per session: nobody teaches a session.
      amountPerSession: 92_000,
      includes: [
        'The full item bank, lessons, topic packets and published papers',
        'The automated coach: what to do today, and the evidence behind it',
        'The syllabus for every course, so the order is not left to guesswork',
        'The guardian report, generated on the learner’s own device',
      ],
      includesVi: [
        'Toàn bộ ngân hàng câu hỏi, bài giảng, bộ phiếu chuyên đề và đề đã phát hành',
        'Trợ lý huấn luyện tự động: hôm nay nên làm gì, và bằng chứng nào dẫn tới đề xuất đó',
        'Đề cương của cả bốn khoá, để thứ tự học không phải đoán',
        'Phiếu báo phụ huynh, sinh ngay trên máy của học viên',
      ],
      suits: 'A learner who can hold a schedule without someone checking. Most cannot at first, and the platform will not pretend otherwise.',
      suitsVi: 'Học viên tự giữ được lịch học mà không cần ai nhắc. Phần lớn học sinh ban đầu chưa làm được, và nền tảng không giả vờ ngược lại.',
    },
    {
      id: 'group',
      name: 'Group class',
      nameVi: 'Lớp nhóm',
      size: '8–12 learners',
      sizeVi: '8–12 học viên',
      amountPerSession: 400_000,
      includes: [
        'Everything in the platform tier',
        'Sessions taught to the published syllabus, with the checkpoint at each unit',
        'Homework marked, with the error type named rather than only the count',
      ],
      includesVi: [
        'Toàn bộ quyền lợi của gói nền tảng',
        'Buổi học dạy theo đúng đề cương đã công bố, có mốc kiểm tra ở mỗi đơn vị',
        'Bài về nhà được chấm, có gọi tên LOẠI lỗi chứ không chỉ đếm số câu sai',
      ],
      suits: 'A learner within roughly 150 points of the rest of the class. Wider than that and the class teaches one half at the cost of the other.',
      suitsVi: 'Học viên chênh không quá khoảng 150 điểm so với mặt bằng lớp. Rộng hơn thì lớp dạy được một nửa và đánh đổi bằng nửa còn lại.',
    },
    {
      id: 'small',
      name: 'Small group',
      nameVi: 'Nhóm nhỏ',
      size: '3–5 learners',
      sizeVi: '3–5 học viên',
      amountPerSession: 750_000,
      includes: [
        'Everything in the group tier',
        'The unit sequence reordered to the group’s own diagnostic, within the published syllabus',
        'A monthly guardian report reviewed with the teacher rather than only sent',
      ],
      includesVi: [
        'Toàn bộ quyền lợi của lớp nhóm',
        'Thứ tự đơn vị được sắp lại theo chính bài kiểm tra đầu vào của nhóm, trong khuôn khổ đề cương đã công bố',
        'Phiếu báo phụ huynh hằng tháng được trao đổi trực tiếp với giáo viên chứ không chỉ gửi đi',
      ],
      suits: 'A learner whose weak skills are specific enough to name, where a full class would spend most of its time elsewhere.',
      suitsVi: 'Học viên có điểm yếu đủ cụ thể để gọi tên, mà một lớp đông sẽ dành phần lớn thời gian cho chuyện khác.',
    },
    {
      id: 'private',
      name: 'One to one',
      nameVi: 'Kèm riêng 1–1',
      size: '1 learner',
      sizeVi: '1 học viên',
      amountPerSession: 1_400_000,
      includes: [
        'Everything in the small-group tier',
        'A syllabus rebuilt around the learner’s own dossier rather than adapted to it',
        'Scheduling around a school timetable',
      ],
      includesVi: [
        'Toàn bộ quyền lợi của nhóm nhỏ',
        'Đề cương dựng lại quanh chính hồ sơ của học viên, không phải điều chỉnh cho vừa',
        'Xếp lịch linh hoạt theo thời khoá biểu ở trường',
      ],
      suits: 'A learner on a short deadline, or one whose profile is unusual enough that no group would match it. It is not automatically better than a small group — for most learners it is not.',
      suitsVi: 'Học viên gấp về thời gian, hoặc có hồ sơ đặc biệt tới mức không nhóm nào khớp. Đây KHÔNG mặc nhiên tốt hơn nhóm nhỏ — với phần lớn học viên thì không.',
    },
  ],

  discount: {
    upfront: 0.08,
    note: 'Taken off the arithmetic total when the whole course is paid before it starts. It is a discount for certainty, not a reward — a course paid in instalments costs the list price and is not worse taught.',
    noteVi: 'Trừ vào tổng cộng khi đóng trọn khoá trước ngày khai giảng. Đây là chiết khấu cho sự chắc chắn, không phải phần thưởng — đóng theo đợt thì tính đúng giá niêm yết và không hề bị dạy kém hơn.',
  },

  exclusions: [
    {
      course: 'sprint',
      delivery: 'group',
      reason: 'The sprint is two full rehearsals and a recognition unit. Running it as a large class means nobody’s pacing is watched, which is the only thing it is for.',
      reasonVi: 'Khoá nước rút gồm hai buổi tổng duyệt trọn vẹn và một đơn vị đọc vị. Dạy theo lớp đông thì không ai được theo dõi nhịp làm bài — mà đó là toàn bộ mục đích của khoá.',
    },
  ],

  terms: [
    {
      en: 'A course is quoted for the number of sessions in its published syllabus. A unit repeated because its checkpoint was not passed is taught at the same session rate; it is not free, and it is not a penalty.',
      vi: 'Học phí một khoá tính theo đúng số buổi trong đề cương đã công bố. Đơn vị phải học lại vì chưa đạt mốc kiểm tra được tính theo đúng đơn giá buổi; không miễn phí, và cũng không phải là phạt.',
    },
    {
      en: 'Placement is by the entry diagnostic. A learner placed into a course they turn out not to need moves down or up at no charge for the change.',
      vi: 'Xếp lớp căn cứ bài kiểm tra đầu vào. Học viên bị xếp vào khoá không phù hợp được chuyển lên hoặc xuống mà không tính phí cho việc chuyển.',
    },
    {
      en: 'No score is guaranteed, by this centre or by any other that is being honest. What is guaranteed is the syllabus, the number of sessions, and a report that will not call a change smaller than the measurement error progress.',
      vi: 'Không cam kết điểm số — trung tâm này không, và trung tâm nào trung thực cũng không. Thứ được cam kết là đề cương, số buổi, và một bản báo cáo sẽ không gọi mức chênh nhỏ hơn sai số đo là tiến bộ.',
    },
  ],
};

/* ------------------------------------------------------------------ */

export interface Quote {
  course: CourseId;
  delivery: DeliveryId;
  sessions: number;
  perSession: number;
  /** Sessions times the rate, before any discount. */
  listTotal: number;
  /** With the up-front discount applied. */
  upfrontTotal: number;
  /** Derived, so a rate quoted against a longer session cannot hide. */
  perHour: number;
  available: boolean;
  unavailableReason: { en: string; vi: string } | null;
}

export function quote(
  course: CourseId,
  delivery: DeliveryId,
  sessions: number,
  sessionMinutes: number,
  pricing: Pricing = PRICING,
): Quote {
  const mode = pricing.deliveries.find((d) => d.id === delivery)!;
  const exclusion = pricing.exclusions.find((e) => e.course === course && e.delivery === delivery);

  const listTotal = mode.amountPerSession * sessions;

  return {
    course,
    delivery,
    sessions,
    perSession: mode.amountPerSession,
    listTotal,
    upfrontTotal: Math.round((listTotal * (1 - pricing.discount.upfront)) / 1000) * 1000,
    perHour: Math.round((mode.amountPerSession / (sessionMinutes / 60)) / 1000) * 1000,
    available: !exclusion,
    unavailableReason: exclusion ? { en: exclusion.reason, vi: exclusion.reasonVi } : null,
  };
}

/** Formats an amount the way a Vietnamese price list is read. */
export function formatVnd(amount: number): string {
  return `${amount.toLocaleString('vi-VN')}₫`;
}

/**
 * The label every fee must carry while the amounts are unconfirmed.
 *
 * Returned from one place so the in-app table and the public page cannot
 * disagree, and so flipping `confirmed` changes both at once.
 */
export function feeLabel(pricing: Pricing = PRICING): { en: string; vi: string } {
  if (pricing.confirmed) {
    return {
      en: 'Fees below are the published rates.',
      vi: 'Mức phí dưới đây là biểu phí chính thức.',
    };
  }
  return {
    en: `Reference rates only, not a quote. These are mid-market SAT tuition rates as of ${pricing.referenceDate}, placed here so the structure can be reviewed with plausible figures. The centre has not set its prices.`,
    vi: `Đây là mức tham khảo, KHÔNG phải báo giá. Các con số lấy theo mặt bằng học phí luyện SAT thời điểm ${pricing.referenceDate}, đặt ở đây để xem cấu trúc gói với những con số có thật. Trung tâm chưa ấn định giá.`,
  };
}
