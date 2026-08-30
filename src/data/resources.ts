/**
 * Where the official material is, and what SAT365 does not replace.
 *
 * A preparation platform that never names the official material is hiding
 * something, and a learner finds out which one it was on test day. Bluebook is
 * the application the exam is actually delivered in; the practice tests inside
 * it are the only ones written by the people who write the exam. Nothing here
 * substitutes for either, and this file says so on the record.
 *
 * These are links, not copies. The content on the other end belongs to the
 * organisations that made it, and reproducing it here would be both unlawful
 * and pointless — a stale copy of somebody else's practice test is worse than
 * a link to the current one.
 *
 * The `complements` and `doesNotReplace` fields are the useful part. A list of
 * links is a bookmark bar; a list that says what each resource is for, and
 * where this platform stops, is a study plan.
 */

export type ResourceKind = 'official' | 'free-practice' | 'reference';

export interface Resource {
  id: string;
  name: string;
  publisher: string;
  url: string;
  kind: ResourceKind;
  /** Cost, stated plainly. Free is worth saying out loud. */
  cost: { en: string; vi: string };
  what: { en: string; vi: string };
  /** What SAT365 adds on top of this. */
  complements: { en: string; vi: string };
  /** What this does that SAT365 does not. Never left empty for official items. */
  doesNotReplace: { en: string; vi: string } | null;
}

export const RESOURCES: Resource[] = [
  {
    id: 'bluebook',
    name: 'Bluebook',
    publisher: 'College Board',
    url: 'https://bluebook.collegeboard.org/',
    kind: 'official',
    cost: { en: 'Free', vi: 'Miễn phí' },
    what: {
      en: 'The application the Digital SAT is actually delivered in, containing full-length practice tests written by the organisation that writes the exam.',
      vi: 'Chính là phần mềm mà Digital SAT được tổ chức trên đó, kèm các đề thi thử full-length do chính đơn vị ra đề soạn.',
    },
    complements: {
      en: 'SAT365 teaches the skills and drills them at volume; Bluebook is where you rehearse under the real interface.',
      vi: 'SAT365 dạy kỹ năng và cho luyện với số lượng lớn; Bluebook là nơi bạn tổng duyệt trên đúng giao diện thật.',
    },
    doesNotReplace: {
      en: 'Sit every Bluebook practice test before test day. Its items are the only ones calibrated on a live population, and its interface is the one you will meet in the hall. No third-party platform, this one included, can offer either.',
      vi: 'Hãy làm hết các đề thi thử trong Bluebook trước ngày thi. Câu hỏi ở đó là loại duy nhất được hiệu chuẩn trên quần thể thi thật, và giao diện đó chính là giao diện bạn gặp trong phòng thi. Không nền tảng bên thứ ba nào — kể cả cái này — có được hai thứ đó.',
    },
  },
  {
    id: 'cb-practice',
    name: 'Official Digital SAT Practice',
    publisher: 'College Board',
    url: 'https://satsuite.collegeboard.org/sat/practice-preparation',
    kind: 'official',
    cost: { en: 'Free', vi: 'Miễn phí' },
    what: {
      en: 'The official practice hub: full-length tests, the question bank, and the specification the exam is built to.',
      vi: 'Trang luyện tập chính thức: đề full-length, ngân hàng câu hỏi mẫu, và bản đặc tả mà đề thi được dựng theo.',
    },
    complements: {
      en: 'SAT365’s blueprint follows this specification. Reading the source is the fastest way to check that any platform, including this one, is teaching the right thing.',
      vi: 'Bản đặc tả kỹ năng của SAT365 bám theo tài liệu này. Đọc bản gốc là cách nhanh nhất để kiểm chứng xem một nền tảng bất kỳ — kể cả nền tảng này — có dạy đúng thứ cần dạy hay không.',
    },
    doesNotReplace: {
      en: 'The specification is authoritative and this platform’s reading of it is not. Where they disagree, College Board is right.',
      vi: 'Bản đặc tả mới là căn cứ chính thức, cách hiểu của nền tảng này thì không. Chỗ nào hai bên khác nhau, College Board đúng.',
    },
  },
  {
    id: 'dates',
    name: 'Dates and Deadlines',
    publisher: 'College Board',
    url: 'https://satsuite.collegeboard.org/sat/dates-deadlines',
    kind: 'official',
    cost: { en: 'Free', vi: 'Miễn phí' },
    what: {
      en: 'The authoritative calendar of administrations, registration deadlines and score releases.',
      vi: 'Lịch chính thức các kỳ thi, hạn đăng ký và ngày trả điểm.',
    },
    complements: {
      en: 'SAT365 keeps a calendar so a study plan can be built backwards from a real date, and labels every field it derived rather than read.',
      vi: 'SAT365 giữ một bản lịch để kế hoạch học có thể dựng ngược từ một ngày có thật, và ghi rõ mốc nào là suy ra chứ không phải đọc trực tiếp.',
    },
    doesNotReplace: {
      en: 'Confirm here before you register. Any date in SAT365 marked as derived was computed, not read.',
      vi: 'Hãy đối chiếu tại đây trước khi đăng ký. Mốc nào trong SAT365 ghi "suy ra" là được tính ra, không phải đọc từ nguồn.',
    },
  },
  {
    id: 'khan',
    name: 'Official Digital SAT Prep',
    publisher: 'Khan Academy',
    url: 'https://www.khanacademy.org/digital-sat',
    kind: 'free-practice',
    cost: { en: 'Free', vi: 'Miễn phí' },
    what: {
      en: 'College Board’s official free partner, with video instruction across the whole specification.',
      vi: 'Đối tác miễn phí chính thức của College Board, có bài giảng video phủ toàn bộ đặc tả kỹ năng.',
    },
    complements: {
      en: 'Video suits a first encounter with an idea. SAT365’s lessons are written to be usable at the moment of need, under a clock — a different job, and both are worth having.',
      vi: 'Video hợp cho lần đầu tiếp xúc một ý tưởng. Bài giảng của SAT365 viết để dùng được ngay lúc cần, khi đang bị đồng hồ ép — hai việc khác nhau, và nên có cả hai.',
    },
    doesNotReplace: null,
  },
  {
    id: 'accommodations',
    name: 'Services for Students with Disabilities',
    publisher: 'College Board',
    url: 'https://accommodations.collegeboard.org/',
    kind: 'official',
    cost: { en: 'Free to apply', vi: 'Nộp hồ sơ miễn phí' },
    what: {
      en: 'Where extended time and other accommodations are applied for. Approval takes weeks, and must be in place before registration.',
      vi: 'Nơi nộp hồ sơ xin thêm giờ và các điều kiện hỗ trợ khác. Xét duyệt mất vài tuần và phải xong TRƯỚC khi đăng ký thi.',
    },
    complements: {
      en: 'SAT365 supports the same extended-time tiers in practice, so a learner rehearses under the conditions they will actually sit in.',
      vi: 'SAT365 hỗ trợ đúng các mức thêm giờ đó khi luyện, để học viên tổng duyệt trong đúng điều kiện mình sẽ thi.',
    },
    doesNotReplace: {
      en: 'Practising with extended time in this platform grants nothing. The application is made through College Board, months ahead.',
      vi: 'Luyện có thêm giờ trong nền tảng này KHÔNG cấp cho bạn quyền gì cả. Hồ sơ phải nộp qua College Board, từ nhiều tháng trước.',
    },
  },
];

export const RESOURCE_PREAMBLE = {
  en: 'Every link below points at material this platform did not write and does not host. The official items are not optional extras — a learner who has never opened Bluebook is rehearsing on an interface they will not meet.',
  vi: 'Mọi liên kết dưới đây trỏ tới tài liệu mà nền tảng này không viết và không lưu trữ. Các mục chính chủ không phải phần "có thì tốt" — học viên chưa từng mở Bluebook là đang tổng duyệt trên một giao diện mình sẽ không gặp.',
};
