import type {
  AbsorptionTierId,
  ActionLevelId,
  GitaCadence,
  GitaEnvironment,
  GitaPillarId,
  HabitCadence,
  Permission,
  PractitionerLevelId,
  Role,
  WorksheetKind,
} from '../types';

/**
 * MO THUC HUAN LUYEN GITA
 *
 * Bon tru cot, khong phai bon buoc noi tiep. Chung nang do lan nhau, va thieu
 * bat ky tru nao thi ba tru con lai deu sup:
 *
 *   G — GOAL       He thong muc tieu, ket qua xuat sac, dich den cua qua trinh
 *                  hoc tap ren luyen.
 *   I — INSPIRITS  Dong luc, khat khao, dam me, mong muon, noi luc, su khac
 *                  biet, niem tin, ban linh de theo duoi muc tieu den cung.
 *   T — TALENT     Tai nang, diem manh, so truong, tu duy xuat sac, su khac
 *                  biet, toc do, tap trung, kha nang vuot troi, dinh huong
 *                  xuat sac.
 *   A — ACTION / ACADEMY
 *                  Hanh dong quyet doan, kien tri, sang tao, cham chi, can
 *                  than, toi uu. Lo trinh ren luyen theo thoi quen thanh cong,
 *                  cac cap do hanh dong theo quy tac 20/80, moi truong thi dua,
 *                  nhom ban xuat sac lam viec doi nhom, va hoc tap gan lien voi
 *                  phat trien ban than.
 *
 * Ba nhip ap dung: mot buoi hoc (micro), mot tuan (meso), mot giai doan (macro).
 * Hai truc phan tang: H1..H5 tang hap thu cua nguoi hoc, P1..P5 cap chuyen mon
 * cua tu van vien — giao vien — coach. Ba moi truong duoc GITA hoa: gia dinh,
 * truong hoc, xa hoi. Cong them nam cap do hanh dong A1..A5 theo quy tac 20/80.
 *
 * Tep nay la NGUON SU THAT cua mo thuc. Tai lieu trong docs/GITA/ mo ta lai
 * chinh cau truc nay, va man hinh /gita in ra chinh du lieu nay — nen tai lieu,
 * giao dien va hanh vi khong bao gio lech nhau.
 */

/* ── Bốn trụ cột ───────────────────────────────────────────────────────── */

export interface GitaPillar {
  id: GitaPillarId;
  letter: string;
  name: string;
  englishName: string;
  /** Các từ khóa định nghĩa trụ cột, theo đúng mô thức gốc. */
  keywords: readonly string[];
  /** Câu hỏi mà trụ cột này trả lời. */
  question: string;
  purpose: string;
  /** Điều gì xảy ra khi trụ cột này bị bỏ trống. */
  failureMode: string;
  /** Sản phẩm hữu hình — không có nó thì trụ cột mới chỉ là ý định. */
  artifact: string;
  /** Hệ thống đo trụ cột này bằng những chỉ dấu nào. */
  indicators: readonly string[];
  screens: readonly { label: string; href: string }[];
  colorIndex: number;
}

export const GITA_PILLARS: readonly GitaPillar[] = [
  {
    id: 'goal',
    letter: 'G',
    name: 'Mục tiêu',
    englishName: 'Goal',
    keywords: ['hệ thống mục tiêu', 'kết quả xuất sắc', 'đích đến của quá trình rèn luyện'],
    question: 'Đích của tôi là gì, và tôi biết mình đã tới bằng cách nào?',
    purpose:
      'Dựng một hệ thống mục tiêu ba tầng — đích cuối, mốc tuần, việc hôm nay — sao cho ba tầng nối được với nhau. Mục tiêu không nối xuống được việc của hôm nay thì chỉ là mong ước; việc hôm nay không nối lên được đích thì chỉ là bận rộn.',
    failureMode:
      'Đặt mục tiêu kiểu "cố hết sức" nên không bao giờ biết đã đủ chưa; hoặc có đích nhưng không có mốc, nên đến sát ngày thi mới biết mình muộn.',
    artifact: 'Bảng mục tiêu ba tầng: điểm mục tiêu, ngày thi, mốc tuần, và ba việc của hôm nay.',
    indicators: ['Đã đặt điểm mục tiêu', 'Đã đặt ngày thi', 'Đã có bản đồ năng lực', 'Có mốc tuần đang chạy'],
    screens: [
      { label: 'Tổng quan', href: '#/' },
      { label: 'Lộ trình', href: '#/roadmap' },
    ],
    colorIndex: 0,
  },
  {
    id: 'inspirits',
    letter: 'I',
    name: 'Nội lực',
    englishName: 'Inspirits',
    keywords: [
      'động lực',
      'khát khao',
      'đam mê',
      'mong muốn',
      'nội lực',
      'sự khác biệt',
      'niềm tin',
      'bản lĩnh',
    ],
    question: 'Điều gì kéo tôi ngồi vào bàn vào ngày thứ bốn mươi, khi cảm hứng đã hết?',
    purpose:
      'Nội lực không phải cảm hứng. Cảm hứng đến rồi đi; nội lực là thứ còn lại sau khi cảm hứng đi mất, và nó được xây bằng ba thứ đo được: chuỗi ngày giữ được, số lần quay lại sau một ngày tệ, và mức độ trung thực khi tự đánh giá.',
    failureMode:
      'Học theo cảm hứng nên tiến độ nhấp nhô; một lần điểm thấp là nghỉ cả tuần; so mình với người khác thay vì so với chính mình tuần trước.',
    artifact: 'Tuyên ngôn lý do của riêng bạn, cộng bằng chứng bản lĩnh: chuỗi ngày và số lần quay lại sau thất bại.',
    indicators: ['Chuỗi ngày học liên tiếp', 'Tỉ lệ giữ thói quen 28 ngày', 'Tỉ lệ bài làm không bỏ dở', 'Mức tự tin được khai báo trung thực'],
    screens: [
      { label: 'Mô thức GITA', href: '#/gita' },
      { label: 'Tổng quan', href: '#/' },
    ],
    colorIndex: 1,
  },
  {
    id: 'talent',
    letter: 'T',
    name: 'Tài năng',
    englishName: 'Talent',
    keywords: [
      'tài năng',
      'điểm mạnh',
      'sở trường',
      'tư duy xuất sắc',
      'sự khác biệt',
      'tốc độ',
      'tập trung',
      'khả năng vượt trội',
      'định hướng xuất sắc',
    ],
    question: 'Đâu là thế mạnh riêng của tôi, và tôi đang mài nó sắc đến đâu?',
    purpose:
      'Điểm cao không đến từ việc đều đều ở mọi thứ, mà từ vài chỗ vượt trội hẳn cộng với việc không để chỗ nào thủng. Trụ cột này đo phần vượt trội: tuyến chuyên đề mạnh nhất đang ở cấp nào, tốc độ xử lý ra sao, và độ tập trung khi làm bài.',
    failureMode:
      'San đều thời gian cho mọi chuyên đề nên không có gì thật sự vượt trội; hoặc ngược lại, chỉ luyện thứ đã giỏi vì làm thấy sướng — cảm giác trôi chảy là dấu hiệu của việc đã biết, không phải của việc đang học.',
    artifact: 'Hồ sơ thế mạnh: hai tuyến vượt trội, một chỉ số tốc độ, và danh sách chỗ đang thủng.',
    indicators: ['Cấp cao nhất trên tuyến mạnh nhất', 'Số tuyến đạt mức vượt trội', 'Tốc độ so với thời gian chuẩn', 'Số câu sa lầy quá giờ'],
    screens: [
      { label: 'Phân tích năng lực', href: '#/analytics' },
      { label: 'Thư viện phiếu luyện', href: '#/practice' },
    ],
    colorIndex: 2,
  },
  {
    id: 'action',
    letter: 'A',
    name: 'Hành động',
    englishName: 'Action / Academy',
    keywords: [
      'quyết đoán',
      'kiên trì',
      'sáng tạo',
      'chăm chỉ',
      'cẩn thận',
      'tối ưu',
      'thói quen thành công',
      'quy tắc 20/80',
      'môi trường thi đua',
      'nhóm bạn xuất sắc',
      'phát triển bản thân',
    ],
    question: 'Hôm nay tôi đã làm gì, và 20% việc nào đang tạo ra 80% kết quả?',
    purpose:
      'Hành động là nơi ba trụ cột kia biến thành kết quả. Nhưng hành động không đo bằng số giờ ngồi bàn: nó đo bằng việc bạn có dồn sức vào đúng 20% chỗ đang tạo ra 80% chênh lệch điểm hay không, có giữ được lộ trình thói quen hay không, và có một môi trường thi đua lành mạnh để không đi một mình hay không.',
    failureMode:
      'Bận rộn mà không hiệu quả: làm dàn trải mọi chuyên đề, đọc lại thứ đã thuộc, né thứ khó chịu. Hoặc học một mình quá lâu nên không ai chỉ ra điểm mù.',
    artifact: 'Nhật ký hành động, danh sách 20/80 của tuần, và một đội học tập đang hoạt động.',
    indicators: ['Khối lượng luyện 14 ngày', 'Độ tập trung vào vùng 20/80', 'Câu ôn tập xử lý đúng hạn', 'Cấp độ hành động A1–A5'],
    screens: [
      { label: 'Thư viện phiếu luyện', href: '#/practice' },
      { label: 'Sổ tay lỗi sai', href: '#/review' },
    ],
    colorIndex: 0,
  },
];

export const PILLAR_BY_ID = new Map(GITA_PILLARS.map((p) => [p.id, p]));

/* ── Ba nhịp ───────────────────────────────────────────────────────────── */

export interface CadenceSpec {
  id: GitaCadence;
  name: string;
  window: string;
  /** Việc cụ thể ở từng trụ cột, theo đúng thứ tự G — I — T — A. */
  steps: Record<GitaPillarId, string>;
  /** Nghi thức chốt nhịp: không làm thì nhịp coi như chưa khép. */
  closing: string;
}

export const GITA_CADENCES: readonly CadenceSpec[] = [
  {
    id: 'micro',
    name: 'Nhịp buổi học',
    window: '30 — 90 phút',
    steps: {
      goal: 'Mở Tổng quan, đọc "Việc của hôm nay", chọn đúng một mục tiêu cho buổi này và nói thành lời.',
      inspirits:
        'Nhắc lại lý do trong 10 giây. Ngày nào cũng chờ có hứng mới học thì sẽ chỉ học được những ngày dễ.',
      talent:
        'Bấm giờ và làm hết sức trong khung giờ đó. Tốc độ và độ tập trung là thứ được rèn ở đây, không phải ở lúc đọc lại.',
      action:
        'Làm trọn một phiếu luyện ba chặng, rồi đọc phần Giải pháp và ghi một câu: lần sau tôi sẽ làm khác điều gì.',
    },
    closing: 'Đóng máy khi đã đọc xong phần Giải pháp, không đóng ngay sau khi thấy điểm.',
  },
  {
    id: 'meso',
    name: 'Nhịp tuần',
    window: '7 ngày',
    steps: {
      goal: 'Đầu tuần: mở Lộ trình, đối chiếu điểm dự báo với mốc của tuần này.',
      inspirits:
        'Nhìn lại chuỗi ngày và bảng thói quen. So với chính mình tuần trước, không so với người khác.',
      talent:
        'Chọn một tuyến để đẩy lên vượt trội và một chỗ đang thủng để vá. Không dàn trải cả tám chuyên đề.',
      action:
        'Chốt danh sách 20/80 của tuần, làm một đề thi thử theo phần, và họp đội học tập 30 phút.',
    },
    closing: 'Buổi rà tuần 20 phút vào một khung giờ cố định, kể cả tuần bận.',
  },
  {
    id: 'macro',
    name: 'Nhịp giai đoạn',
    window: '4 — 10 tuần',
    steps: {
      goal: 'Chốt KPI của giai đoạn và điều kiện được xét lên giai đoạn mới.',
      inspirits:
        'Đánh giá lại lý do: đích này còn là đích của bạn không, hay đang là kỳ vọng của người khác.',
      talent: 'Phủ kín chuyên đề còn trống, đồng thời đẩy hai tuyến mạnh nhất lên cấp cao hơn.',
      action:
        'Đề thi thử full 3 phần, đối chiếu KPI ≥ 90% và độ phủ ≥ 60%, rồi nâng cấp độ hành động nếu đủ điều kiện.',
    },
    closing: 'Buổi tổng kết giai đoạn cùng giáo viên hoặc coach, có biên bản.',
  },
];

/** Dạng phiếu luyện phục vụ trụ cột nào. */
export const PILLAR_OF_KIND: Record<WorksheetKind, GitaPillarId> = {
  theory: 'talent',
  patterns: 'talent',
  method: 'talent',
  advanced: 'inspirits',
  revision: 'action',
  test: 'inspirits',
};

/* ── Năm cấp độ hành động theo quy tắc 20/80 ───────────────────────────── */

export interface ActionLevel {
  id: ActionLevelId;
  order: number;
  name: string;
  /** Việc chiếm khoảng 20% công sức nhưng tạo ra khoảng 80% kết quả ở cấp này. */
  vitalFew: string;
  /** Thứ chiếm nhiều thời gian nhưng đóng góp ít — cần cắt ở cấp này. */
  trivialMany: string;
  /** Dấu hiệu bạn đang ở cấp này. */
  signal: string;
  /** Điều kiện lên cấp hành động tiếp theo. */
  unlock: string;
}

/**
 * Cap do hanh dong.
 *
 * Quy tac 20/80 khong phai mot cau noi truyen cam hung — no la mot cau hoi cu
 * the phai tra loi lai o TUNG CAP: viec nao dang chiem 20% cong suc va tao ra
 * 80% ket qua NGAY LUC NAY. Cau tra loi doi theo cap, va do la ly do mot nguoi
 * dung mai mot chien luoc se chung lai.
 */
export const ACTION_LEVELS: readonly ActionLevel[] = [
  {
    id: 'A1',
    order: 1,
    name: 'Khởi động',
    vitalFew: 'Ngồi vào bàn đúng giờ mỗi ngày, dù chỉ 15 phút. Ở cấp này, việc bắt đầu quan trọng hơn mọi kỹ thuật.',
    trivialMany: 'Chọn sách, so sánh khóa học, lập kế hoạch chi tiết. Kế hoạch đẹp là hình thức trì hoãn tinh vi nhất.',
    signal: 'Bạn học được vào ngày có hứng, và bỏ vào ngày không có hứng.',
    unlock: 'Giữ chuỗi 7 ngày liên tiếp.',
  },
  {
    id: 'A2',
    order: 2,
    name: 'Đều đặn',
    vitalFew: 'Giữ chuỗi ngày và xử lý hết câu đến hạn trong sổ tay trước khi học thứ mới.',
    trivialMany: 'Học thêm chuyên đề mới trong khi chuyên đề cũ đang phai. Nạp mới rẻ hơn giữ cũ, nhưng vô ích hơn nhiều.',
    signal: 'Bạn học đều nhưng điểm chưa nhích, vì kiến thức cũ rơi rụng đúng bằng tốc độ nạp mới.',
    unlock: 'KPI giai đoạn 1 đạt 80% và tỉ lệ giữ thói quen 28 ngày trên 60%.',
  },
  {
    id: 'A3',
    order: 3,
    name: 'Trọng điểm',
    vitalFew: 'Dồn 80% thời gian luyện vào ba chuyên đề đang làm mất nhiều điểm nhất — vùng 20/80 của bạn.',
    trivialMany: 'Luyện dàn trải cả tám chuyên đề mỗi tuần, hoặc luyện thứ mình đã giỏi vì làm thấy sướng.',
    signal: 'Bạn chăm chỉ và đều đặn, nhưng điểm tăng chậm vì công sức bị rải mỏng.',
    unlock: 'Ba chuyên đề trọng điểm đều lên ít nhất một cấp.',
  },
  {
    id: 'A4',
    order: 4,
    name: 'Tối ưu',
    vitalFew: 'Cắt thời gian sa lầy: đặt trần 2 phút cho mỗi câu, chuẩn hóa quy trình đọc đề và quy tắc bỏ qua.',
    trivialMany: 'Làm thêm bài trong khi vấn đề thật nằm ở phân bổ thời gian chứ không ở lượng bài.',
    signal: 'Bạn làm đúng khi có đủ giờ, nhưng luôn thiếu thời gian ở cuối mỗi phần thi.',
    unlock: 'Hoàn thành đề thi thử trong đúng thời gian quy định, không quá giờ ở phần nào.',
  },
  {
    id: 'A5',
    order: 5,
    name: 'Vượt trội',
    vitalFew: 'Đề full định kỳ, giảng lại cho người khác, và tinh chỉnh chiến thuật phòng thi theo số liệu của chính mình.',
    trivialMany: 'Cày thêm câu dễ để giữ cảm giác an toàn. Ở cấp này, câu dễ không còn dạy được bạn điều gì.',
    signal: 'Điểm dự báo đã chạm mục tiêu và bạn đang tìm cách giữ phong độ đến ngày thi.',
    unlock: 'Đây là cấp mở: tiếp tục bằng cách kèm người khác đi hết vòng lặp.',
  },
];

export const ACTION_LEVEL_BY_ID = new Map(ACTION_LEVELS.map((a) => [a.id, a]));

/* ── Nhóm bạn xuất sắc & môi trường thi đua ────────────────────────────── */

export interface TeamRole {
  name: string;
  duty: string;
  rotates: boolean;
}

export interface TeamPlaybook {
  premise: string;
  size: string;
  roles: readonly TeamRole[];
  rituals: readonly { name: string; cadence: string; detail: string }[];
  /** Nguyên tắc thi đua — thứ quyết định nhóm nâng nhau lên hay dìm nhau xuống. */
  competitionRules: readonly string[];
  antiPatterns: readonly string[];
  metrics: readonly string[];
}

/**
 * Nhom ban xuat sac.
 *
 * Vi sao can nhom: hoc mot minh qua lau thi khong ai chi ra diem mu, va dong
 * luc phu thuoc hoan toan vao mot nguoi. Nhung nhom sai cach con te hon hoc mot
 * minh — nen phan "nguyen tac thi dua" o day quan trong hon phan "nghi thuc".
 */
export const TEAM_PLAYBOOK: TeamPlaybook = {
  premise:
    'Một nhóm bốn người đúng cách đi xa hơn bốn người giỏi đi riêng lẻ. Điều kiện: thi đua với chính mình của tuần trước, và chỉ so sánh với người khác ở phần quá trình chứ không ở phần điểm số.',
  size: '3 — 5 người. Dưới 3 thì mất nhóm khi một người bận; trên 5 thì có người ẩn mình.',
  roles: [
    {
      name: 'Người giữ nhịp',
      duty: 'Mở và đóng buổi họp đúng giờ, nhắc lịch, bảo đảm buổi rà tuần diễn ra kể cả khi cả nhóm bận.',
      rotates: true,
    },
    {
      name: 'Người ra đề',
      duty: 'Chuẩn bị 5 câu khó của tuần từ chuyên đề trọng điểm chung, kèm lời giải.',
      rotates: true,
    },
    {
      name: 'Người phản biện',
      duty: 'Hỏi "vì sao chọn phương án đó" thay vì đưa đáp án. Nhiệm vụ là làm lộ ra lỗ hổng, không phải giảng bài.',
      rotates: true,
    },
    {
      name: 'Người ghi biên bản',
      duty: 'Ghi lại điều chỉnh mà mỗi người cam kết cho tuần sau, và đọc lại vào đầu buổi kế tiếp.',
      rotates: true,
    },
  ],
  rituals: [
    {
      name: 'Họp đội 30 phút',
      cadence: 'Hằng tuần, khung giờ cố định',
      detail:
        '5 phút đọc lại cam kết tuần trước, 15 phút chữa 5 câu khó, 10 phút mỗi người nói một điều chỉnh cho tuần tới.',
    },
    {
      name: 'Thách đấu bốn ngày',
      cadence: 'Hai tuần một lần',
      detail:
        'Cả nhóm cùng một chuyên đề, cùng số phiếu, trong bốn ngày. So kết quả theo mức cải thiện so với chính mình, không theo điểm tuyệt đối.',
    },
    {
      name: 'Giảng chéo',
      cadence: 'Hằng tuần, 10 phút',
      detail: 'Mỗi người giảng lại một dạng bài cho người khác. Người giảng học được nhiều nhất.',
    },
  ],
  competitionRules: [
    'So với chính mình tuần trước là thước đo chính. Bảng xếp hạng tuyệt đối chỉ tạo ra người bỏ cuộc.',
    'Chia sẻ cách làm, không chia sẻ đáp án. Đưa đáp án là cướp mất phần học của bạn mình.',
    'Người đang tụt lại được hỏi trước, không bị nhắc sau lưng.',
    'Mỗi buổi kết thúc bằng cam kết cụ thể của từng người, có ghi lại và có kiểm lại.',
  ],
  antiPatterns: [
    'Nhóm trở thành nơi than thở. Than thở dễ chịu hơn luyện tập, nên nó sẽ chiếm chỗ nếu không có nghi thức.',
    'Một người giỏi giảng suốt buổi, ba người còn lại nghe thụ động — đó là lớp học nhỏ chứ không phải đội.',
    'So sánh điểm tuyệt đối. Nó tối ưu cho việc tránh thua chứ không cho việc học.',
  ],
  metrics: [
    'Số buổi họp đội diễn ra đúng lịch trong tháng.',
    'Số cam kết được thực hiện trên tổng số cam kết đã ghi.',
    'Mức cải thiện trung bình của cả nhóm, không phải điểm của người cao nhất.',
  ],
};

/* ── Năm tầng hấp thu của người học ────────────────────────────────────── */

export interface AbsorptionTier {
  id: AbsorptionTierId;
  order: number;
  name: string;
  englishName: string;
  /** Người ở tầng này tự mô tả mình như thế nào. */
  selfDescription: string;
  /** Trụ cột cần được ưu tiên nhất ở tầng này. */
  keyPillar: GitaPillarId;
  /** Thứ họ thật sự cần — không phải thứ họ nghĩ mình cần. */
  realNeed: string;
  /** Hệ thống phục vụ họ bằng cách nào. */
  systemResponse: string;
  /** Sai lầm phổ biến nhất khiến họ mắc kẹt ở tầng này. */
  trap: string;
  /** Điều kiện định lượng để lên tầng tiếp theo. */
  exitCriteria: string;
  documents: readonly string[];
  /** Cấp chuyên môn tối thiểu của người kèm cặp phù hợp. */
  minPractitioner: PractitionerLevelId;
}

export const ABSORPTION_TIERS: readonly AbsorptionTier[] = [
  {
    id: 'H1',
    order: 1,
    name: 'Tiếp cận',
    englishName: 'Aware',
    selfDescription: '"Em muốn thi HSA nhưng chưa biết bắt đầu từ đâu."',
    keyPillar: 'goal',
    realNeed:
      'Một bức tranh trung thực về vị trí hiện tại, và một việc duy nhất để làm ngay hôm nay. Càng nhiều lựa chọn càng dễ bỏ cuộc.',
    systemResponse:
      'Một bài kiểm tra định vị ngắn, một điểm mục tiêu, và mục "Việc của hôm nay" chỉ hiện tối đa ba việc.',
    trap: 'Lập kế hoạch quá chi tiết rồi không bắt đầu. Kế hoạch đẹp là hình thức trì hoãn tinh vi nhất.',
    exitCriteria: 'Hoàn thành 10 phiếu luyện và duy trì chuỗi 7 ngày liên tiếp.',
    documents: ['Sổ tay khởi động 7 ngày', 'Bản cam kết học tập với gia đình'],
    minPractitioner: 'P1',
  },
  {
    id: 'H2',
    order: 2,
    name: 'Làm theo',
    englishName: 'Guided',
    selfDescription: '"Em làm được khi có người chỉ, nhưng tự làm thì hay bỏ dở."',
    keyPillar: 'inspirits',
    realNeed:
      'Cấu trúc bên ngoài: lịch cố định, nhiệm vụ được giao sẵn, người kiểm tra. Ý chí chưa đủ để thay thế thói quen.',
    systemResponse:
      'Nhiệm vụ hằng ngày được giao tự động, ràng buộc rõ ràng cho từng phiếu, và bảng thói quen để tích mỗi ngày.',
    trap: 'Làm cho xong nhiệm vụ mà bỏ qua phần Nhận xét — phần duy nhất tạo ra tiến bộ.',
    exitCriteria: 'KPI giai đoạn 1 đạt từ 80% và tự chạy trọn nhịp tuần hai tuần liên tiếp.',
    documents: ['Lịch tuần mẫu theo nhịp GITA', 'Phiếu rà tuần 20 phút'],
    minPractitioner: 'P1',
  },
  {
    id: 'H3',
    order: 3,
    name: 'Tự vận hành',
    englishName: 'Independent',
    selfDescription: '"Em tự học được đều, nhưng điểm hay chững lại."',
    keyPillar: 'talent',
    realNeed:
      'Biết cách đọc số liệu của chính mình để chọn việc, thay vì chỉ làm theo danh sách được giao. Và biết đâu là sở trường để mài cho sắc.',
    systemResponse:
      'Mở đầy đủ phân tích năng lực, hiệu chuẩn mức tự tin và thi thử theo phần. Nhiệm vụ chuyển từ "được giao" sang "được đề xuất".',
    trap:
      'Luyện thứ mình thích vì làm thấy sướng. Cảm giác trôi chảy là dấu hiệu của việc đã biết, không phải của việc đang học.',
    exitCriteria: 'Đạt cấp 4 ở ít nhất 5 tuyến chuyên đề và KPI giai đoạn 2 từ 85%.',
    documents: ['Cẩm nang đọc biểu đồ năng lực', 'Nhật ký điều chỉnh chiến lược'],
    minPractitioner: 'P2',
  },
  {
    id: 'H4',
    order: 4,
    name: 'Tự điều chỉnh',
    englishName: 'Adaptive',
    selfDescription: '"Em tự chẩn đoán được vì sao sai và tự đổi cách làm."',
    keyPillar: 'action',
    realNeed:
      'Bài toán khó thật và phản hồi ở mức tinh vi hơn: chiến thuật phòng thi, phân bổ thời gian, xử lý câu bẫy, và kỷ luật 20/80.',
    systemResponse:
      'Mở đề mô phỏng full 3 phần, phiếu thử thách và vượt ải, phân tích sa lầy thời gian theo từng câu.',
    trap: 'Tối ưu quá sớm những thứ nhỏ trong khi vẫn còn một chuyên đề lớn bị bỏ trống.',
    exitCriteria: 'Điểm dự báo chạm mục tiêu và KPI giai đoạn 3 từ 90%.',
    documents: ['Chiến thuật phòng thi 195 phút', 'Bảng phân bổ thời gian theo phần'],
    minPractitioner: 'P3',
  },
  {
    id: 'H5',
    order: 5,
    name: 'Lan tỏa',
    englishName: 'Multiplier',
    selfDescription: '"Em giảng lại được cho bạn và cho em mình."',
    keyPillar: 'action',
    realNeed:
      'Cơ hội dạy lại. Dạy là hình thức học sâu nhất, và cũng là nơi lộ ra những chỗ mình tưởng đã hiểu.',
    systemResponse:
      'Vai trò trợ giảng trong hệ thống, quyền nhận xét bài làm, và bộ tài liệu để dẫn một nhóm nhỏ.',
    trap: 'Dạy lại đúng cách mình đã học mà không hỏi người kia đang mắc ở đâu.',
    exitCriteria: 'Đây là tầng mở: tiếp tục đi sâu bằng cách nhận vai trò chuyên môn P1 trở lên.',
    documents: ['Sổ tay dẫn nhóm nhỏ', 'Khung phản hồi 3 lớp'],
    minPractitioner: 'P3',
  },
];

export const TIER_BY_ID = new Map(ABSORPTION_TIERS.map((t) => [t.id, t]));

/* ── Năm cấp chuyên môn ────────────────────────────────────────────────── */

export interface PractitionerLevel {
  id: PractitionerLevelId;
  order: number;
  name: string;
  englishName: string;
  roles: readonly Role[];
  /** Trụ cột mà cấp này chịu trách nhiệm chính. */
  ownsPillar: GitaPillarId;
  competencies: readonly string[];
  authority: readonly Permission[];
  evidence: readonly string[];
  toolkit: readonly string[];
  serves: readonly AbsorptionTierId[];
}

export const PRACTITIONER_LEVELS: readonly PractitionerLevel[] = [
  {
    id: 'P1',
    order: 1,
    name: 'Trợ giảng GITA',
    englishName: 'Facilitator',
    roles: ['mentor'],
    ownsPillar: 'action',
    competencies: [
      'Giải thích được bốn trụ cột GITA bằng ngôn ngữ của học viên.',
      'Đọc được bảng tiến độ và chỉ ra ai đang tụt lại.',
      'Nhận xét bài làm theo khung ba lớp: hiện tượng — nguyên nhân — việc cần làm.',
    ],
    authority: ['class.view', 'class.comment'],
    evidence: ['Bản thân đạt tầng hấp thu H3 trở lên.', 'Nhận xét 20 bài làm được cấp trên thẩm định.'],
    toolkit: ['Sổ tay dẫn nhóm nhỏ', 'Khung phản hồi 3 lớp', 'Kịch bản buổi rà tuần'],
    serves: ['H1', 'H2'],
  },
  {
    id: 'P2',
    order: 2,
    name: 'Giáo viên GITA',
    englishName: 'Instructor',
    roles: ['teacher'],
    ownsPillar: 'talent',
    competencies: [
      'Thiết kế được một tuần học theo nhịp meso cho một lớp.',
      'Chọn đúng phiếu luyện theo tầng hấp thu chứ không theo cảm tính.',
      'Phân biệt được lỗi kiến thức, lỗi kỹ năng và lỗi chiến thuật.',
    ],
    authority: ['class.assign', 'class.approveLevel', 'content.author'],
    evidence: [
      'Dẫn trọn một giai đoạn cho một lớp, KPI lớp đạt từ 80%.',
      'Biên soạn 30 câu hỏi được thẩm định đạt.',
    ],
    toolkit: ['Giáo án tuần theo nhịp GITA', 'Bảng chẩn đoán ba loại lỗi', 'Ngân hàng câu hỏi lớp'],
    serves: ['H2', 'H3'],
  },
  {
    id: 'P3',
    order: 3,
    name: 'Huấn luyện viên GITA',
    englishName: 'Coach',
    roles: ['coach', 'teacher'],
    ownsPillar: 'inspirits',
    competencies: [
      'Dẫn một cuộc trò chuyện huấn luyện: hỏi trước khi giảng.',
      'Xử lý được vấn đề động lực và thói quen, không chỉ vấn đề kiến thức.',
      'Đọc được hiệu chuẩn mức tự tin và làm việc với lỗ hổng "không biết là mình không biết".',
    ],
    authority: ['coach.session', 'coach.habit', 'coach.plan'],
    evidence: [
      'Dẫn 10 học viên qua ít nhất một lần chuyển tầng hấp thu.',
      'Hồ sơ 5 ca huấn luyện có biên bản trước — trong — sau.',
    ],
    toolkit: [
      'Bộ câu hỏi huấn luyện GITA',
      'Quy trình can thiệp khi học viên chững lại',
      'Biên bản buổi tổng kết giai đoạn',
    ],
    serves: ['H3', 'H4', 'H5'],
  },
  {
    id: 'P4',
    order: 4,
    name: 'Cố vấn lộ trình',
    englishName: 'Mentor / Consultant',
    roles: ['headTeacher', 'consultant'],
    ownsPillar: 'goal',
    competencies: [
      'Thiết kế lộ trình cá nhân từ ngày bắt đầu tới ngày thi cho hồ sơ phức tạp.',
      'Làm việc được với gia đình: chuyển kỳ vọng của cha mẹ thành hỗ trợ cụ thể.',
      'Đánh giá và cải thiện chất lượng của cả một đội ngũ chuyên môn.',
    ],
    authority: ['consult.profile', 'consult.roadmap', 'coach.plan', 'class.viewAll'],
    evidence: [
      'Cố vấn thành công 3 hồ sơ có ràng buộc đặc biệt: thời gian ngắn, nền yếu, hoặc mục tiêu rất cao.',
      'Kèm cặp ít nhất 2 người lên cấp P2 hoặc P3.',
    ],
    toolkit: [
      'Khung phỏng vấn định vị 45 phút',
      'Bộ kịch bản làm việc với phụ huynh',
      'Bảng đánh giá chất lượng buổi dạy',
    ],
    serves: ['H1', 'H4', 'H5'],
  },
  {
    id: 'P5',
    order: 5,
    name: 'Kiến trúc sư chương trình',
    englishName: 'Program Architect',
    roles: ['headTeacher', 'productAdmin', 'superAdmin'],
    ownsPillar: 'goal',
    competencies: [
      'Thiết kế và hiệu chỉnh khung chương trình: cấp độ, ngưỡng KPI, phân bổ phiếu.',
      'Đọc được số liệu toàn hệ thống để phát hiện chỗ chương trình đang hỏng.',
      'Bảo đảm chuẩn đầu ra không trôi theo thời gian.',
    ],
    authority: ['content.curriculum', 'content.publish', 'system.audit'],
    evidence: [
      'Chủ trì ít nhất một chu kỳ hiệu chỉnh chương trình có số liệu trước — sau.',
      'Duy trì bộ tiêu chuẩn chất lượng và quy trình thẩm định nội dung.',
    ],
    toolkit: [
      'Bộ tiêu chuẩn chất lượng HSA365',
      'Quy trình thẩm định nội dung ba vòng',
      'Báo cáo hiệu chỉnh chương trình',
    ],
    serves: ['H4', 'H5'],
  },
];

export const PRACTITIONER_BY_ID = new Map(PRACTITIONER_LEVELS.map((p) => [p.id, p]));

/* ── Ba môi trường GITA hóa ────────────────────────────────────────────── */

export interface EnvironmentPlaybook {
  id: GitaEnvironment;
  name: string;
  premise: string;
  practices: Record<GitaPillarId, string>;
  rituals: readonly { name: string; cadence: string; detail: string }[];
  antiPatterns: readonly string[];
  metrics: readonly string[];
}

export const ENVIRONMENTS: readonly EnvironmentPlaybook[] = [
  {
    id: 'family',
    name: 'GITA trong gia đình',
    premise:
      'Gia đình không dạy kiến thức. Gia đình giữ hai trụ cột mà nhà trường và trung tâm không làm thay được: nội lực và môi trường hành động.',
    practices: {
      goal: 'Mỗi đầu tháng, 15 phút cả nhà cùng xem mục tiêu và ngày thi. Cha mẹ hỏi, không phán xét.',
      inspirits:
        'Khen quá trình cụ thể — "con giữ được chuỗi 7 ngày" — thay vì khen năng lực. Khen năng lực làm trẻ sợ thất bại; khen nỗ lực làm trẻ dám thử.',
      talent:
        'Nhận ra và gọi tên sở trường của con, kể cả khi nó không nằm trong môn thi. Đứa trẻ biết mình giỏi một thứ sẽ tự tin học thứ mình chưa giỏi.',
      action:
        'Chuẩn bị môi trường: một góc học cố định, giờ vàng không màn hình, và tôn trọng khung giờ luyện tập như một cuộc hẹn.',
    },
    rituals: [
      {
        name: 'Bàn tròn chủ nhật',
        cadence: 'Hằng tuần, 20 phút',
        detail: 'Xem lại tuần qua theo bốn trụ cột. Nguyên tắc: hỏi về quá trình, không hỏi về điểm số.',
      },
      {
        name: 'Giờ vàng không màn hình',
        cadence: 'Hằng ngày, 60–90 phút',
        detail:
          'Cả nhà cùng tắt màn hình giải trí. Cha mẹ cũng đọc sách hoặc làm việc — làm gương quan trọng hơn nhắc nhở.',
      },
      {
        name: 'Ghi nhận nỗ lực',
        cadence: 'Hằng tuần',
        detail: 'Nêu tên một nỗ lực cụ thể của con trong tuần, trước cả nhà.',
      },
    ],
    antiPatterns: [
      'Hỏi "hôm nay được mấy điểm" như câu chào — biến việc học thành việc trình diễn.',
      'So sánh với con nhà người khác. Nó phá nội lực nhanh hơn mọi thứ khác.',
      'Thưởng tiền theo điểm số. Phần thưởng bên ngoài lấn át động lực bên trong về lâu dài.',
    ],
    metrics: [
      'Số buổi Bàn tròn chủ nhật diễn ra trong tháng.',
      'Số ngày giữ được Giờ vàng không màn hình.',
      'Chuỗi ngày học liên tiếp của con — chỉ số phản ánh môi trường rõ hơn là ý chí.',
    ],
  },
  {
    id: 'school',
    name: 'GITA trong trường học',
    premise:
      'Lớp học có 40 người ở 5 tầng hấp thu khác nhau. GITA hóa nghĩa là dạy chung nhưng luyện riêng, và đo bằng cùng một hệ quy chiếu.',
    practices: {
      goal: 'Đầu học kỳ, mỗi học sinh có một điểm mục tiêu riêng và một bản đồ năng lực riêng.',
      inspirits:
        'Thi đua theo mức cải thiện của từng người, không theo điểm tuyệt đối. Bảng xếp hạng tuyệt đối chỉ tạo ra người bỏ cuộc.',
      talent:
        'Nhóm học sinh theo tuyến chuyên đề chứ không theo học lực chung: một bạn mạnh Toán yếu Văn cần hai chỗ đứng khác nhau.',
      action:
        'Mỗi tuần một buổi luyện có bấm giờ, và 15 phút cuối tuần để cả lớp đọc số liệu của chính mình rồi viết một điều chỉnh.',
    },
    rituals: [
      {
        name: 'Bảng tuyến chuyên đề của lớp',
        cadence: 'Cập nhật hằng tuần',
        detail: 'Hiển thị cấp độ trung bình từng chuyên đề của lớp, không hiển thị thứ hạng cá nhân.',
      },
      {
        name: 'Cặp đôi giảng lại',
        cadence: 'Hằng tuần, 10 phút',
        detail: 'Học sinh H4–H5 giảng lại một câu cho bạn H2–H3. Người giảng học được nhiều nhất.',
      },
      {
        name: 'Buổi rà giai đoạn',
        cadence: 'Mỗi 4–6 tuần',
        detail: 'Đối chiếu KPI lớp, điều chỉnh phân bổ thời gian giữa các chuyên đề.',
      },
    ],
    antiPatterns: [
      'Xếp hạng công khai. Nó tối ưu cho việc tránh thua chứ không cho việc học.',
      'Giao cùng một bộ bài cho cả lớp bất kể tầng hấp thu — nhóm yếu nản, nhóm mạnh chán.',
      'Chấm bài mà không trả kèm chẩn đoán. Điểm số không nói cho ai biết phải làm gì tiếp.',
    ],
    metrics: [
      'Tỉ lệ học sinh lên được ít nhất một tầng hấp thu trong học kỳ.',
      'Độ phủ chuyên đề của cả lớp.',
      'Khoảng cách giữa nhóm trên và nhóm dưới — GITA hóa tốt thì khoảng cách này thu hẹp.',
    ],
  },
  {
    id: 'society',
    name: 'GITA ngoài xã hội',
    premise:
      'Bốn trụ cột không dừng ở kỳ thi. Chúng là cách xử lý bất kỳ việc gì đáng làm tốt: một dự án, một kỹ năng, một thay đổi trong đời sống.',
    practices: {
      goal: 'Trước khi bắt đầu bất cứ việc gì đáng kể: viết ra đích đến và cách biết mình đã tới.',
      inspirits:
        'Viết ra lý do bằng ngôn ngữ của chính mình, không mượn lý do của người khác. Lý do mượn không sống qua được tháng thứ ba.',
      talent:
        'Xác định sở trường thật bằng bằng chứng, không bằng cảm giác: việc gì bạn làm nhanh hơn, sâu hơn, và người khác tìm đến bạn để hỏi.',
      action:
        'Làm thật, có giới hạn thời gian, tìm phản hồi sớm, và mỗi quý rà lại theo quy tắc 20/80.',
    },
    rituals: [
      {
        name: 'Rà soát hằng quý',
        cadence: 'Mỗi 3 tháng, 60 phút',
        detail: 'Bốn câu hỏi theo bốn trụ cột: đích còn đúng không, lý do còn sống không, thế mạnh đang sắc lên hay cùn đi, và 20% việc nào đang tạo ra 80% kết quả.',
      },
      {
        name: 'Học công khai',
        cadence: 'Hằng tháng',
        detail: 'Chia sẻ một thứ vừa học được. Buộc phải diễn đạt rõ ràng là cách kiểm tra mình đã hiểu thật chưa.',
      },
      {
        name: 'Sổ điều chỉnh',
        cadence: 'Liên tục',
        detail: 'Một trang duy nhất ghi các điều chỉnh đã thực hiện và kết quả của chúng.',
      },
    ],
    antiPatterns: [
      'Nạp vô hạn mà không bao giờ làm — sưu tầm khóa học thay vì hành động.',
      'Làm mãi mà không rà soát, nên lặp lại cùng một sai lầm trong nhiều năm.',
      'Đổi mục tiêu mỗi khi gặp khó, rồi kết luận rằng mình không có năng khiếu.',
    ],
    metrics: [
      'Số vòng GITA khép kín đã hoàn thành trong năm.',
      'Số điều chỉnh được ghi lại và thực sự áp dụng.',
      'Số người khác được mình hướng dẫn qua vòng lặp này.',
    ],
  },
];

export const ENVIRONMENT_BY_ID = new Map(ENVIRONMENTS.map((e) => [e.id, e]));

/* ── Thói quen nền tảng ────────────────────────────────────────────────── */

export interface Habit {
  id: string;
  name: string;
  pillar: GitaPillarId;
  cadence: HabitCadence;
  environment: GitaEnvironment;
  /** Mỏ neo khởi động — thói quen cần một mỏ neo, không cần ý chí. */
  cue: string;
  routine: string;
  why: string;
  /** Tầng hấp thu bắt đầu áp dụng thói quen này. */
  fromTier: AbsorptionTierId;
}

/**
 * Muoi hai thoi quen nen tang — "lo trinh ren luyen theo thoi quen thanh cong".
 * Chon it va giu lau con hon chon nhieu roi bo. Moi thoi quen deu co mo neo
 * cu the: y chi la nguon luc can kiet, con mo neo thi khong.
 */
export const HABITS: readonly Habit[] = [
  {
    id: 'h.goal.daily',
    name: 'Chọn một việc trước khi mở máy',
    pillar: 'goal',
    cadence: 'daily',
    environment: 'school',
    cue: 'Ngay khi ngồi vào bàn học.',
    routine: 'Đọc "Việc của hôm nay" và chọn đúng một mục tiêu cho buổi này. Nói thành lời.',
    why: 'Ngồi vào bàn mà chưa biết làm gì là cách nhanh nhất để 20 phút đầu trôi qua vô ích.',
    fromTier: 'H1',
  },
  {
    id: 'h.goal.weekly',
    name: 'Buổi rà tuần 20 phút',
    pillar: 'goal',
    cadence: 'weekly',
    environment: 'school',
    cue: 'Một khung giờ cố định cuối tuần.',
    routine: 'Mở Lộ trình, đối chiếu với mốc tuần, chọn hai chuyên đề ưu tiên cho tuần sau.',
    why: 'Không rà thì lộ trình biến thành danh sách việc, và danh sách việc thì không tự điều chỉnh.',
    fromTier: 'H2',
  },
  {
    id: 'h.ins.reason',
    name: 'Nhắc lại lý do trong 10 giây',
    pillar: 'inspirits',
    cadence: 'daily',
    environment: 'school',
    cue: 'Trước khi mở phiếu luyện đầu tiên trong ngày.',
    routine: 'Đọc thầm một câu: vì sao mình theo đuổi đích này. Đúng một câu, đúng mười giây.',
    why: 'Ngày nào cũng chờ có hứng mới học thì sẽ chỉ học được những ngày dễ. Lý do là thứ thay thế cảm hứng.',
    fromTier: 'H1',
  },
  {
    id: 'h.ins.comeback',
    name: 'Quay lại trong 24 giờ',
    pillar: 'inspirits',
    cadence: 'daily',
    environment: 'school',
    cue: 'Ngay sau một buổi làm bài tệ hoặc một ngày bỏ lỡ.',
    routine: 'Làm một phiếu ngắn trong vòng 24 giờ, dù chỉ 8 câu. Không đợi "tuần sau bắt đầu lại".',
    why: 'Bản lĩnh không phải là không bao giờ ngã. Nó là khoảng thời gian giữa lúc ngã và lúc đứng dậy.',
    fromTier: 'H2',
  },
  {
    id: 'h.ins.honest',
    name: 'Khai báo mức tự tin trung thực',
    pillar: 'inspirits',
    cadence: 'daily',
    environment: 'school',
    cue: 'Mỗi khi chọn xong một đáp án.',
    routine: 'Chọn Chắc chắn / Chưa chắc / Đoán đúng như mình cảm thấy, không tô hồng.',
    why: 'Trung thực với chính mình là gốc của nội lực, và là cách duy nhất phát hiện lỗ hổng "không biết là mình không biết".',
    fromTier: 'H3',
  },
  {
    id: 'h.tal.timer',
    name: 'Luôn bấm giờ khi luyện',
    pillar: 'talent',
    cadence: 'daily',
    environment: 'school',
    cue: 'Trước khi mở phiếu luyện.',
    routine: 'Bật đồng hồ của phiếu và không tạm dừng giữa chừng.',
    why: 'Tốc độ là một phần của tài năng, và nó chỉ được rèn khi có áp lực thời gian thật.',
    fromTier: 'H1',
  },
  {
    id: 'h.tal.deep',
    name: 'Một khối tập trung 25 phút',
    pillar: 'talent',
    cadence: 'daily',
    environment: 'school',
    cue: 'Sau khi đã chọn mục tiêu của buổi.',
    routine: 'Điện thoại ra khỏi tầm tay, làm liền 25 phút không chuyển tab, rồi mới nghỉ.',
    why: 'Tư duy xuất sắc cần thời gian liền mạch. Cứ 5 phút bị ngắt một lần thì không có ý tưởng nào kịp hình thành.',
    fromTier: 'H2',
  },
  {
    id: 'h.tal.strength',
    name: 'Mài sở trường mỗi tuần',
    pillar: 'talent',
    cadence: 'weekly',
    environment: 'school',
    cue: 'Trong buổi rà tuần.',
    routine: 'Chọn tuyến mạnh nhất và làm một phiếu thử thách hoặc vượt ải ở đó.',
    why: 'Vá chỗ thủng giữ cho bạn không mất điểm; mài sở trường mới là thứ đưa bạn lên nhóm dẫn đầu.',
    fromTier: 'H3',
  },
  {
    id: 'h.act.srs',
    name: 'Ôn sổ tay lỗi sai trước khi học mới',
    pillar: 'action',
    cadence: 'daily',
    environment: 'school',
    cue: 'Trước khi mở phiếu luyện mới.',
    routine: 'Xử lý hết các câu đến hạn trong sổ tay, dù chỉ 5 câu.',
    why: 'Kiến thức cũ phai đi trong im lặng. Ôn đúng ngày đến hạn rẻ hơn học lại từ đầu rất nhiều.',
    fromTier: 'H2',
  },
  {
    id: 'h.act.onething',
    name: 'Một điều chỉnh sau mỗi buổi',
    pillar: 'action',
    cadence: 'daily',
    environment: 'school',
    cue: 'Ngay sau khi đọc phần Giải pháp tối ưu.',
    routine: 'Viết một câu: lần sau tôi sẽ làm khác điều gì. Một câu là đủ.',
    why: 'Không có bước này, làm 100 phiếu cũng chỉ là lặp lại 100 lần cùng một cách học.',
    fromTier: 'H1',
  },
  {
    id: 'h.act.team',
    name: 'Họp đội học tập 30 phút',
    pillar: 'action',
    cadence: 'weekly',
    environment: 'society',
    cue: 'Khung giờ cố định hằng tuần.',
    routine: 'Đọc lại cam kết tuần trước, chữa 5 câu khó, mỗi người nói một điều chỉnh cho tuần tới.',
    why: 'Học một mình quá lâu thì không ai chỉ ra điểm mù, và động lực phụ thuộc hoàn toàn vào một người.',
    fromTier: 'H3',
  },
  {
    id: 'h.act.family',
    name: 'Bàn tròn chủ nhật cùng gia đình',
    pillar: 'action',
    cadence: 'weekly',
    environment: 'family',
    cue: 'Sau bữa tối chủ nhật.',
    routine: 'Kể một điều đã học được và một điều sẽ làm khác đi. Người nghe chỉ lắng nghe.',
    why: 'Diễn đạt cho người khác nghe là cách kiểm tra mình đã hiểu thật hay chưa, và là cách gia đình tham gia mà không gây áp lực.',
    fromTier: 'H1',
  },
];

export const HABIT_BY_ID = new Map(HABITS.map((h) => [h.id, h]));
