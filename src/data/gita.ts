/**
 * MÔ THỨC GITA — khung huấn luyện xuyên suốt của MATH365.
 *
 * Bốn trụ cột (G–I–T–A) áp dụng cho mọi tầng của hệ thống: thư mục tài liệu,
 * quy trình, giải pháp, chiến lược và thói quen. Mô thức được thiết kế bám theo
 * các khung tham chiếu quốc tế đã được kiểm chứng (xem STANDARDS bên dưới).
 */

export interface Pillar {
  id: 'G' | 'I' | 'T' | 'A';
  letter: string;
  name: string;
  nameEn: string;
  question: string;
  color: string;
  principle: string;
  /** Việc phải làm ở trụ cột này, theo từng vai. */
  actions: { role: 'Học sinh' | 'Giáo viên / Coach' | 'Gia đình'; items: string[] }[];
  artifacts: string[];
  kpi: string[];
}

export const PILLARS: Pillar[] = [
  {
    id: 'G',
    letter: 'G',
    name: 'GOAL · Hệ thống mục tiêu',
    nameEn: 'Goal',
    question: 'Đích đến xuất sắc của mình là gì, và đo bằng gì?',
    color: '#4338CA',
    principle:
      'Goal là hệ thống mục tiêu — không phải một mong muốn đơn lẻ. Mục tiêu lớn được chẻ thành kết quả từng giai đoạn, từng tuần, từng phiếu luyện, để mỗi buổi học đều biết mình đang tiến về đâu.',
    actions: [
      {
        role: 'Học sinh',
        items: [
          'Viết mục tiêu ba tầng: mục tiêu năm (trường/điểm số) — mục tiêu giai đoạn — mục tiêu tuần.',
          'Mỗi mục tiêu phải có con số và mốc thời gian; “học tốt hơn” không phải mục tiêu.',
          'Dán mục tiêu ở nơi nhìn thấy mỗi ngày và đọc lại trước mỗi buổi học.',
        ],
      },
      {
        role: 'Giáo viên / Coach',
        items: [
          'Chuyển mục tiêu của học sinh thành chuẩn đầu ra đo được cho từng giai đoạn.',
          'Đối chiếu mục tiêu với dữ liệu thực tế: điểm chuẩn, cấu trúc đề, quỹ thời gian còn lại.',
          'Cảnh báo sớm khi mục tiêu và nguồn lực không tương thích — trung thực ngay từ đầu.',
        ],
      },
      {
        role: 'Gia đình',
        items: [
          'Cùng con thống nhất mục tiêu thay vì áp đặt; mục tiêu bị áp đặt không tạo được nội lực.',
          'Bảo vệ quỹ thời gian đã cam kết cho mục tiêu đó.',
        ],
      },
    ],
    artifacts: ['Bản cam kết mục tiêu ba tầng', 'Chuẩn đầu ra từng giai đoạn', 'Lộ trình cá nhân hoá'],
    kpi: ['Có mục tiêu viết ra dạng số', 'Mục tiêu tuần được rà lại mỗi tuần', 'Lộ trình gắn ngày thi'],
  },
  {
    id: 'I',
    letter: 'I',
    name: 'INSPIRITS · Nội lực & Khát khao',
    nameEn: 'Inspirits',
    question: 'Điều gì khiến mình bền bỉ khi việc học trở nên khó?',
    color: '#BE123C',
    principle:
      'Inspirits là phần động lực bên trong: khát khao, đam mê, niềm tin và bản lĩnh. Đây là thứ quyết định học sinh có đi hết lộ trình hay bỏ cuộc giữa chừng — và là thứ không thể thay thế bằng kỷ luật ép buộc từ bên ngoài.',
    actions: [
      {
        role: 'Học sinh',
        items: [
          'Viết ra “lý do gốc”: vì sao mục tiêu này quan trọng với chính mình, không phải với ai khác.',
          'Ghi lại mỗi tuần một chiến thắng nhỏ — nội lực được nuôi bằng bằng chứng tiến bộ, không bằng lời hô hào.',
          'Khi mất động lực: giảm khối lượng nhưng không đứt chuỗi; giữ nhịp quan trọng hơn giữ cường độ.',
          'Nhận diện điểm khác biệt của riêng mình và tin vào nó thay vì so đo với người khác.',
        ],
      },
      {
        role: 'Giáo viên / Coach',
        items: [
          'Phản hồi hướng vào quá trình và nỗ lực, không dán nhãn năng lực.',
          'Chỉ ra tiến bộ bằng dữ liệu cụ thể — đó là nhiên liệu đáng tin cậy nhất cho động lực.',
          'Thiết kế thử thách vừa tầm: quá dễ gây chán, quá khó gây bỏ cuộc.',
          'Kết nối bài học với đích đến của học sinh để việc học có ý nghĩa.',
        ],
      },
      {
        role: 'Gia đình',
        items: [
          'Ghi nhận nỗ lực và tính kỷ luật trước, ghi nhận điểm số sau.',
          'Không so sánh con với người khác — đây là hành vi bào mòn nội lực nhanh nhất.',
          'Là chỗ dựa khi con thất bại, không phải nơi phán xét.',
        ],
      },
    ],
    artifacts: ['Nhật ký “lý do gốc”', 'Sổ chiến thắng nhỏ hằng tuần', 'Bảng chuỗi ngày liên tục'],
    kpi: ['Chuỗi ngày luyện không đứt', 'Tỉ lệ quay lại sau một phiếu điểm thấp', 'Mức độ chủ động đặt câu hỏi'],
  },
  {
    id: 'T',
    letter: 'T',
    name: 'TALENT · Tài năng & Thế mạnh',
    nameEn: 'Talent',
    question: 'Thế mạnh riêng của mình là gì, và làm sao đẩy nó lên mức vượt trội?',
    color: '#B45309',
    principle:
      'Talent không phải thứ trời cho cố định. Đó là điểm mạnh, sở trường, tốc độ, khả năng tập trung và tư duy xuất sắc — tất cả đều được nhận diện bằng dữ liệu rồi khuếch đại bằng luyện tập có chủ đích.',
    actions: [
      {
        role: 'Học sinh',
        items: [
          'Đọc bản đồ năng lực để biết mạch nào là thế mạnh, mạch nào là điểm nghẽn.',
          'Đẩy thế mạnh lên mức vượt trội thay vì chỉ vá điểm yếu — điểm số cao đến từ vùng bạn mạnh nhất.',
          'Rèn tốc độ và độ chính xác ở vùng sở trường cho tới khi thành phản xạ.',
          'Luyện tập trung sâu: làm phiếu liền mạch, bấm giờ, không tra cứu giữa chừng.',
        ],
      },
      {
        role: 'Giáo viên / Coach',
        items: [
          'Phát hiện sớm sở trường của từng học sinh qua dữ liệu KPI theo mạch.',
          'Giao nhiệm vụ ở vùng 70–85% đúng — vùng luyện tạo tiến bộ nhanh nhất.',
          'Thiết kế lộ trình khác biệt cho học sinh có thế mạnh khác biệt, không rập khuôn một giáo án.',
          'Đưa học sinh vượt trội vào vai trò dẫn dắt nhóm để đẩy trần năng lực.',
        ],
      },
      {
        role: 'Gia đình',
        items: [
          'Nhận ra và nói ra thế mạnh của con — nhiều học sinh không biết mình mạnh ở đâu.',
          'Không ép con giống anh chị em hoặc giống bạn bè.',
        ],
      },
    ],
    artifacts: ['Bản đồ năng lực theo mạch & kỹ năng', 'Hồ sơ sở trường', 'Lộ trình khác biệt hoá'],
    kpi: ['KPI mạch sở trường ≥ 95%', 'Tốc độ làm bài so với thời lượng đề xuất', 'Số dạng bài đạt mức phản xạ'],
  },
  {
    id: 'A',
    letter: 'A',
    name: 'ACTION / ACADEMY · Hành động & Môi trường',
    nameEn: 'Action & Academy',
    question: 'Hôm nay mình hành động gì, và mình đang ở trong môi trường nào?',
    color: '#0F766E',
    principle:
      'Mọi mục tiêu, động lực và tài năng đều vô nghĩa nếu không chuyển thành hành động hằng ngày. Action là hành động quyết đoán — kiên trì — sáng tạo — chăm chỉ — cẩn thận — tối ưu, được đặt trong một Academy: môi trường thi đua, nhóm bạn xuất sắc và văn hoá cùng tiến bộ.',
    actions: [
      {
        role: 'Học sinh',
        items: [
          'Áp dụng quy tắc 20/80: mỗi giai đoạn xác định 20% nội dung tạo ra 80% điểm số và làm nó trước.',
          'Hành động quyết đoán: bắt đầu ngay khi tới khung giờ, không chờ “có hứng”.',
          'Hành động cẩn thận: luôn soát bài, luôn đối chiếu điều kiện.',
          'Hành động tối ưu: sau mỗi tuần, bỏ bớt việc không tạo ra tiến bộ.',
          'Học trong nhóm bạn xuất sắc: nhóm 3–5 người cùng mục tiêu, chấm chéo và giảng lại cho nhau.',
        ],
      },
      {
        role: 'Giáo viên / Coach',
        items: [
          'Xây môi trường thi đua lành mạnh: đo tiến bộ cá nhân, không xếp hạng công khai điểm tuyệt đối.',
          'Ghép nhóm học tập theo mục tiêu và mức độ để tạo lực kéo lẫn nhau.',
          'Ưu tiên dạy 20% nội dung trọng yếu trước, thay vì dàn trải đều.',
          'Ghi nhận công khai các mốc quá trình để củng cố văn hoá hành động.',
        ],
      },
      {
        role: 'Gia đình',
        items: [
          'Bảo vệ khung giờ học và không gian yên tĩnh — môi trường quyết định hành vi.',
          'Cả nhà cùng làm việc yên tĩnh trong khung giờ đó: làm gương hiệu quả hơn nhắc nhở.',
          'Ăn mừng mốc quá trình, không chỉ mốc kết quả.',
        ],
      },
    ],
    artifacts: [
      '2000 phiếu luyện & 2000 nhiệm vụ',
      'Bộ thói quen thành công theo nhịp ngày – tuần – tháng',
      'Bảng cấp độ hành động 20/80',
      'Khung vận hành nhóm bạn xuất sắc',
    ],
    kpi: ['Số ngày hành động liên tục', 'Số nhiệm vụ đạt chuẩn/tuần', 'Mức độ tham gia nhóm học tập'],
  },
];

/* ============================================================
   CẤP ĐỘ HÀNH ĐỘNG THEO QUY TẮC 20/80
   ============================================================ */

export interface ActionLevel {
  id: number;
  name: string;
  focus: string;
  rule2080: string;
  daily: string[];
  signal: string;
  color: string;
}

export const ACTION_LEVELS: ActionLevel[] = [
  {
    id: 1,
    name: 'Cấp 1 · Khởi động',
    focus: 'Có mặt đều đặn — trước khi nói tới hiệu quả, phải nói tới sự có mặt.',
    rule2080:
      '20% việc tạo 80% kết quả ở cấp này: giữ đúng khung giờ học mỗi ngày, dù chỉ 30 phút.',
    daily: ['Ngồi vào bàn đúng giờ', 'Làm ít nhất một phiếu Khởi động', 'Đánh dấu chuỗi ngày'],
    signal: 'Chuỗi 14 ngày liên tục không đứt.',
    color: '#94A3B8',
  },
  {
    id: 2,
    name: 'Cấp 2 · Đều đặn',
    focus: 'Biến việc học thành mặc định, không cần đấu tranh nội tâm mỗi ngày.',
    rule2080:
      'Tập trung vào các chuyên đề tần suất ≥ 90% trong đề — đây là 20% nội dung tạo phần lớn điểm số.',
    daily: ['Một phiếu luyện', 'Ghi sổ lỗi sai', 'Năm phút công thức'],
    signal: 'KPI trung bình tuần ≥ 80% và không bỏ buổi nào.',
    color: '#0891B2',
  },
  {
    id: 3,
    name: 'Cấp 3 · Có chủ đích',
    focus: 'Luyện đúng vùng yếu đã chẩn đoán, không luyện theo cảm hứng.',
    rule2080:
      'Mỗi tuần chọn đúng một nút thắt để xử lý dứt điểm, thay vì sửa mười thứ cùng lúc.',
    daily: ['Một phiếu đúng vùng yếu', 'Làm lại dạng đã sai sau 3 ngày', 'Giảng lại một dạng cho bạn'],
    signal: 'Lỗi lặp lại giảm rõ rệt qua từng tuần.',
    color: '#4338CA',
  },
  {
    id: 4,
    name: 'Cấp 4 · Tối ưu',
    focus: 'Cắt bỏ việc không tạo tiến bộ; dồn nguồn lực vào việc tạo chênh lệch điểm số.',
    rule2080:
      'Rà soát hằng tuần: việc nào chiếm nhiều thời gian mà không làm KPI tăng thì loại bỏ.',
    daily: ['Một phiếu tính giờ', 'Rà soát 20/80 cuối tuần', 'Đẩy mạch sở trường lên mức vượt trội'],
    signal: 'KPI trung bình ≥ 90% với thời gian làm bài giảm dần.',
    color: '#B45309',
  },
  {
    id: 5,
    name: 'Cấp 5 · Dẫn dắt',
    focus: 'Vượt khỏi việc học cho mình: kèm bạn, dẫn nhóm, tự thiết kế lộ trình.',
    rule2080:
      '20% hành động giá trị nhất lúc này là giảng lại và tự ra đề — hai việc củng cố sâu nhất.',
    daily: ['Dẫn một buổi ôn nhóm', 'Tự soạn một đề kèm barem', 'Kèm một bạn ở tầng thấp hơn'],
    signal: 'Nhóm được kèm có tiến bộ đo được, và bản thân giữ KPI ≥ 90%.',
    color: '#0F766E',
  },
];

/* ============================================================
   ACADEMY: MÔI TRƯỜNG THI ĐUA & NHÓM BẠN XUẤT SẮC
   ============================================================ */

export interface TeamRule {
  name: string;
  detail: string;
}

export const TEAM_MODEL = {
  size: 'Nhóm 3 – 5 người cùng luồng, chênh lệch năng lực không quá một Level.',
  why: 'Nhóm quá đông thì có người ẩn mình; chênh lệch quá lớn thì người mạnh phải chờ, người yếu bị bỏ lại.',
  rules: [
    {
      name: 'Cùng mục tiêu, khác thế mạnh',
      detail:
        'Ghép nhóm theo cùng đích đến nhưng khác mạch sở trường, để mỗi người đều có lúc là người giảng.',
    },
    {
      name: 'Chấm chéo hằng tuần',
      detail:
        'Mỗi tuần đổi bài chấm cho nhau theo barem. Chấm bài người khác là cách nhanh nhất để thấy lỗi của chính mình.',
    },
    {
      name: 'Mỗi tuần một người giảng',
      detail:
        'Luân phiên: mỗi tuần một thành viên giảng lại một chuyên đề trong 15 phút cho cả nhóm.',
    },
    {
      name: 'Thi đua theo tiến bộ, không theo điểm tuyệt đối',
      detail:
        'Bảng thi đua đo mức tăng KPI và chuỗi ngày liên tục — để người xuất phát thấp vẫn có cửa dẫn đầu.',
    },
    {
      name: 'Không ai bị bỏ lại',
      detail:
        'Thành viên tụt nhịp hai tuần liên tiếp thì cả nhóm cùng hỗ trợ; kết quả nhóm tính theo mức tiến bộ chung.',
    },
  ] as TeamRule[],
  antipatterns: [
    'Nhóm chỉ để chép bài của nhau.',
    'Xếp hạng công khai điểm tuyệt đối — gây nản cho phần lớn thành viên.',
    'Ghép nhóm chênh lệch quá lớn khiến việc kèm trở thành gánh nặng một chiều.',
  ],
};

/* ============================================================
   TẦNG HẤP THU CỦA NGƯỜI HỌC
   ============================================================ */

export interface AbsorptionTier {
  id: number;
  name: string;
  nameEn: string;
  descriptor: string;
  evidence: string[];
  materials: string[];
  teacherMove: string;
  exitCriteria: string;
  color: string;
}

export const TIERS: AbsorptionTier[] = [
  {
    id: 1,
    name: 'Tầng 1 · Nhận biết',
    nameEn: 'Remember',
    descriptor:
      'Nhận ra khái niệm, gọi đúng tên, nhớ được công thức khi có gợi ý. Chưa tự dùng được.',
    evidence: ['Điền đúng công thức vào chỗ trống', 'Nhận dạng được loại bài khi được nhắc'],
    materials: ['Sơ đồ khái niệm 1 trang', 'Thẻ công thức', 'Bảng thuật ngữ'],
    teacherMove: 'Trình bày mạch lạc, cho ví dụ mẫu, chưa vội yêu cầu tự làm.',
    exitCriteria: 'Viết lại được toàn bộ công thức cốt lõi của chuyên đề mà không nhìn tài liệu.',
    color: '#94A3B8',
  },
  {
    id: 2,
    name: 'Tầng 2 · Thông hiểu',
    nameEn: 'Understand',
    descriptor:
      'Giải thích được vì sao công thức đúng, biết công thức dùng trong tình huống nào.',
    evidence: ['Giải thích được từng bước của lời giải mẫu', 'Chỉ ra được điều kiện áp dụng'],
    materials: ['Bài giảng mẫu có chú giải từng bước', 'Ví dụ minh hoạ có phản ví dụ'],
    teacherMove: 'Hỏi “vì sao” sau mỗi bước; yêu cầu học sinh nói lại bằng lời của mình.',
    exitCriteria: 'Giải thích được lời giải mẫu cho một bạn chưa học chuyên đề đó.',
    color: '#0891B2',
  },
  {
    id: 3,
    name: 'Tầng 3 · Vận dụng',
    nameEn: 'Apply',
    descriptor:
      'Tự làm được bài cùng dạng với số liệu khác. Đây là tầng phần lớn học sinh dừng lại.',
    evidence: ['Đạt KPI ≥ 90% ở phiếu Level tương ứng', 'Làm đúng khi đề đổi số'],
    materials: ['Phiếu luyện theo mức', 'Bộ bài tập tăng dần độ khó', 'Bảng lỗi thường gặp'],
    teacherMove: 'Giao lượng vừa đủ, phản hồi nhanh, sửa theo nguyên nhân lỗi.',
    exitCriteria: 'Đạt KPI 90% ở hai phiếu liên tiếp cùng mức.',
    color: '#4338CA',
  },
  {
    id: 4,
    name: 'Tầng 4 · Thành thạo',
    nameEn: 'Master',
    descriptor:
      'Nhận dạng nhanh trong đề trộn, làm đúng dưới áp lực thời gian, xử lý được biến thể lạ.',
    evidence: ['Làm đúng trong đề trộn nhiều dạng', 'Đạt chuẩn khi tính giờ', 'Tự phát hiện lỗi của mình'],
    materials: ['Phiếu tổng duyệt trộn dạng', 'Đề tính giờ', 'Ngân hàng biến thể khó'],
    teacherMove: 'Tăng độ nhiễu: trộn dạng, rút ngắn thời gian, thêm bẫy quen thuộc.',
    exitCriteria: 'Đạt KPI ≥ 90% ở phiếu Tổng duyệt trong thời gian quy định.',
    color: '#B45309',
  },
  {
    id: 5,
    name: 'Tầng 5 · Chuyển giao',
    nameEn: 'Transfer & Teach',
    descriptor:
      'Giảng lại được cho người khác, tự ra được đề, và mang tư duy sang bối cảnh ngoài môn học.',
    evidence: ['Giảng lại rõ ràng cho bạn', 'Tự soạn được đề kèm barem', 'Áp dụng vào tình huống thực tế'],
    materials: ['Bộ hướng dẫn tự soạn đề', 'Dự án ứng dụng thực tế', 'Vai trò trợ giảng nhóm'],
    teacherMove: 'Trao vai trò: để học sinh dạy lại, chấm chéo, hoặc dẫn một buổi ôn nhóm.',
    exitCriteria: 'Giảng trọn một chuyên đề cho nhóm và trả lời được câu hỏi phát sinh.',
    color: '#0F766E',
  },
];

/* ============================================================
   CẤP ĐỘ CHUYÊN MÔN CỦA TƯ VẤN – GIÁO VIÊN – COACH
   ============================================================ */

export interface ProLevel {
  id: string;
  name: string;
  roleHint: string;
  scope: string;
  competencies: string[];
  canDeliver: string[];
  certification: string[];
  color: string;
}

export const PRO_LEVELS: ProLevel[] = [
  {
    id: 'P1',
    name: 'P1 · Tư vấn viên lộ trình',
    roleHint: 'Thường gắn với vai trò Trợ giảng trong hệ thống phân quyền.',
    scope: 'Tiếp nhận, khảo sát và giới thiệu lộ trình phù hợp.',
    competencies: [
      'Nắm rõ ba luồng và mục tiêu của từng luồng.',
      'Đọc được kết quả bài test xếp lộ trình và nhóm năng lực.',
      'Giải thích được cơ chế KPI và thăng cấp bằng ngôn ngữ đơn giản.',
    ],
    canDeliver: ['Buổi tư vấn đầu vào', 'Giải thích lộ trình cho phụ huynh'],
    certification: [
      'Hoàn thành module “Bản đồ kỳ thi” của cả ba luồng.',
      'Tư vấn thử 5 hồ sơ, được P3 trở lên duyệt.',
    ],
    color: '#64748B',
  },
  {
    id: 'P2',
    name: 'P2 · Trợ giảng',
    roleHint: 'Vai trò Trợ giảng — hỗ trợ chấm chữa và theo dõi.',
    scope: 'Đồng hành theo nhóm nhỏ, chấm chữa, nhắc nhịp.',
    competencies: [
      'Chấm được theo barem và chỉ ra lỗi theo năm nhóm nguyên nhân.',
      'Nhận diện học sinh đang tụt nhịp qua dữ liệu KPI.',
      'Viết nhận xét hành động được, không khen chung chung.',
    ],
    canDeliver: ['Buổi chữa bài nhóm nhỏ', 'Báo cáo tuần cho giáo viên chính'],
    certification: [
      'Đạt ≥ 90% ở bài kiểm tra chuyên môn của luồng phụ trách.',
      'Chấm chéo 30 bài, sai lệch so với đáp án chuẩn dưới 5%.',
    ],
    color: '#0891B2',
  },
  {
    id: 'P3',
    name: 'P3 · Giáo viên',
    roleHint: 'Vai trò Giáo viên — phụ trách lớp, giao nhiệm vụ, mở khoá cấp độ.',
    scope: 'Phụ trách trọn vẹn một lớp theo lộ trình.',
    competencies: [
      'Thiết kế buổi dạy theo tầng hấp thu của học sinh.',
      'Điều chỉnh lộ trình dựa trên dữ liệu, không dựa trên cảm tính.',
      'Xử lý được toàn bộ nội dung chuyên môn của luồng phụ trách.',
    ],
    canDeliver: ['Lớp học theo lộ trình', 'Buổi chữa đề', 'Báo cáo tiến độ cho phụ huynh'],
    certification: [
      'Làm được ≥ 8/10 đề chuẩn của luồng phụ trách.',
      'Dạy thử 3 buổi được P4 dự giờ và duyệt.',
      'Ít nhất một lớp có KPI trung bình ≥ 85% sau một giai đoạn.',
    ],
    color: '#4338CA',
  },
  {
    id: 'P4',
    name: 'P4 · Coach',
    roleHint: 'Vai trò Chủ nhiệm chuyên môn — dẫn dắt chuyên môn và huấn luyện đồng nghiệp.',
    scope: 'Huấn luyện học sinh mục tiêu cao và huấn luyện giáo viên.',
    competencies: [
      'Xây dựng lộ trình cá nhân hoá cho học sinh mục tiêu top đầu.',
      'Dự giờ và phản hồi cho giáo viên theo khung mô thức GITA.',
      'Biên soạn được ngân hàng phiếu và barem.',
    ],
    canDeliver: ['Kèm cặp 1–1 cho nhóm đội tuyển', 'Đào tạo nội bộ P2–P3', 'Biên soạn nội dung'],
    certification: [
      'Làm trọn đề chuyên/đề 9+ trong thời gian quy định.',
      'Đào tạo thành công ít nhất 2 giáo viên đạt P3.',
      'Có sản phẩm nội dung được đưa vào hệ thống.',
    ],
    color: '#B45309',
  },
  {
    id: 'P5',
    name: 'P5 · Master Coach / Kiến trúc chương trình',
    roleHint: 'Vai trò Quản trị — sở hữu chuẩn mực và cấu hình hệ thống.',
    scope: 'Sở hữu chuẩn mực chuyên môn của toàn hệ thống.',
    competencies: [
      'Thiết kế và hiệu chỉnh mô thức, ngưỡng KPI, quy tắc thăng cấp.',
      'Kiểm định chất lượng nội dung và tính đúng đắn học thuật.',
      'Đối chiếu chương trình với các khung tham chiếu quốc tế.',
    ],
    canDeliver: ['Chuẩn chương trình', 'Kiểm định nội dung', 'Chiến lược sản phẩm'],
    certification: ['Do tổ chức bổ nhiệm', 'Chịu trách nhiệm cuối cùng về chất lượng học thuật'],
    color: '#0F172A',
  },
];

/* ============================================================
   GITA HOÁ: GIA ĐÌNH – NHÀ TRƯỜNG – XÃ HỘI
   ============================================================ */

export interface Environment {
  id: 'gia-dinh' | 'nha-truong' | 'xa-hoi';
  name: string;
  goal: string;
  color: string;
  protocols: { name: string; cadence: string; steps: string[] }[];
  antipatterns: string[];
}

export const ENVIRONMENTS: Environment[] = [
  {
    id: 'gia-dinh',
    name: 'GITA trong gia đình',
    goal: 'Biến nhà thành nơi bảo vệ nhịp học, không phải nơi gây áp lực điểm số.',
    color: '#0F766E',
    protocols: [
      {
        name: 'Bàn tròn 10 phút mỗi tối',
        cadence: 'hằng ngày',
        steps: [
          'Hỏi ba câu: Hôm nay con học được gì mới? Chỗ nào con thấy khó? Ngày mai con định làm gì?',
          'Nghe hết, không ngắt lời, không bình luận về điểm số.',
          'Kết thúc bằng một ghi nhận cụ thể về nỗ lực.',
        ],
      },
      {
        name: 'Khung giờ bất khả xâm phạm',
        cadence: 'hằng ngày',
        steps: [
          'Thống nhất một khung 45–90 phút cố định cho môn Toán.',
          'Trong khung đó: không sai vặt, không tivi, điện thoại để ngoài phòng.',
          'Cả nhà cùng làm việc yên tĩnh — làm gương quan trọng hơn nhắc nhở.',
        ],
      },
      {
        name: 'Chủ nhật nhìn lại',
        cadence: 'hằng tuần',
        steps: [
          'Cùng xem bảng KPI tuần trên hệ thống.',
          'Ăn mừng mốc quá trình: chuỗi ngày học đều, số nhiệm vụ đạt chuẩn.',
          'Hỏi con cần gia đình hỗ trợ gì trong tuần tới.',
        ],
      },
    ],
    antipatterns: [
      'So sánh con với “con nhà người ta” — làm giảm động lực nội tại rõ rệt.',
      'Chỉ hỏi điểm, không hỏi quá trình.',
      'Thưởng tiền theo điểm số — thay động lực bên trong bằng động lực bên ngoài.',
      'Học thay con: giải hộ bài thay vì để con vật lộn với nó.',
    ],
  },
  {
    id: 'nha-truong',
    name: 'GITA trong nhà trường',
    goal: 'Đưa mô thức vào nhịp dạy – học chính khoá để tạo hiệu quả cộng hưởng.',
    color: '#4338CA',
    protocols: [
      {
        name: 'Vào lớp 5 phút gợi nhớ',
        cadence: 'mỗi buổi',
        steps: [
          'Năm phút đầu giờ: học sinh gấp vở, viết lại kiến thức buổi trước từ trí nhớ.',
          'Đối chiếu nhanh, đánh dấu chỗ cả lớp cùng quên.',
          'Đó chính là nội dung cần nhắc lại trong buổi.',
        ],
      },
      {
        name: 'Chấm theo nguyên nhân',
        cadence: 'mỗi bài kiểm tra',
        steps: [
          'Không chỉ ghi điểm — ghi thêm mã nguyên nhân lỗi.',
          'Tổng hợp nguyên nhân toàn lớp để chọn nội dung chữa bài.',
          'Chữa đúng nút thắt chung, không chữa lại toàn bộ đề.',
        ],
      },
      {
        name: 'Phân tầng nhiệm vụ trong cùng một lớp',
        cadence: 'hằng tuần',
        steps: [
          'Giao ba mức nhiệm vụ theo tầng hấp thu, cùng một chuyên đề.',
          'Học sinh Tầng 5 hỗ trợ nhóm Tầng 2–3 — vừa củng cố vừa lan toả.',
          'Đánh giá theo tiến bộ cá nhân, không xếp hạng công khai.',
        ],
      },
    ],
    antipatterns: [
      'Giao cùng một lượng bài cho mọi trình độ trong lớp.',
      'Chữa lại toàn bộ đề thay vì chữa đúng nút thắt.',
      'Xếp hạng công khai điểm số — gây hại cho nhóm giữa và nhóm dưới.',
    ],
  },
  {
    id: 'xa-hoi',
    name: 'GITA trong đời sống & phát triển bản thân',
    goal: 'Chuyển kỷ luật học Toán thành năng lực sống dùng được lâu dài.',
    color: '#B45309',
    protocols: [
      {
        name: 'Tư duy định lượng hằng ngày',
        cadence: 'hằng tuần',
        steps: [
          'Chọn một quyết định trong đời sống và ước lượng bằng số: chi tiêu, thời gian, quãng đường.',
          'Viết giả thiết ra giấy, tính, rồi kiểm chứng với thực tế.',
          'Ghi lại sai lệch — đây chính là “sổ lỗi sai” của đời sống.',
        ],
      },
      {
        name: 'Dự án ứng dụng mỗi tháng',
        cadence: 'hằng tháng',
        steps: [
          'Chọn một vấn đề thật: lập ngân sách, tối ưu lịch học, phân tích số liệu một câu lạc bộ.',
          'Dùng công cụ toán đã học (thống kê, hàm số, xác suất) để phân tích.',
          'Trình bày kết quả cho gia đình hoặc lớp trong 5 phút.',
        ],
      },
      {
        name: 'Truyền lại',
        cadence: 'hằng tháng',
        steps: [
          'Kèm một bạn yếu hơn trong một chuyên đề bạn đã ở Tầng 5.',
          'Ghi lại câu hỏi mà bạn ấy hỏi — đó là chỗ chính bạn hiểu chưa sâu.',
          'Học lại đúng chỗ đó.',
        ],
      },
    ],
    antipatterns: [
      'Coi Toán chỉ là môn để thi, học xong là bỏ.',
      'Học kỹ năng mềm tách rời khỏi việc học thật.',
    ],
  },
];

/* ============================================================
   PHẨM CHẤT ĐƯỢC RÈN QUA MÔ THỨC
   ============================================================ */

export interface Trait {
  name: string;
  builtBy: string;
  evidence: string;
}

export const TRAITS: Trait[] = [
  {
    name: 'Kỷ luật nhịp điệu',
    builtBy: 'Thói quen một phiếu mỗi ngày và khung giờ cố định.',
    evidence: 'Chuỗi ngày luyện liên tục không đứt.',
  },
  {
    name: 'Tập trung sâu',
    builtBy: 'Làm phiếu liền mạch có bấm giờ, không tra cứu giữa chừng.',
    evidence: 'Hoàn thành phiếu trong thời lượng đề xuất mà vẫn đạt KPI.',
  },
  {
    name: 'Trung thực học thuật',
    builtBy: 'Làm bài trước, xem lời giải sau — không bao giờ ngược lại.',
    evidence: 'Sổ lỗi sai ghi đúng lỗi thật, không tô hồng.',
  },
  {
    name: 'Tư duy phản biện',
    builtBy: 'Luôn hỏi “vì sao bước này đúng” và kiểm chứng bằng cách thứ hai.',
    evidence: 'Tự phát hiện lỗi của mình trước khi được chấm.',
  },
  {
    name: 'Khả năng phục hồi',
    builtBy: 'Cơ chế làm lại với đề mới khi chưa đạt KPI, không bị phạt.',
    evidence: 'Sau một phiếu điểm thấp vẫn quay lại làm ngay hôm sau.',
  },
  {
    name: 'Quản trị bản thân',
    builtBy: 'Tự theo dõi KPI và điều chỉnh kế hoạch tuần.',
    evidence: 'Chủ động đổi trọng tâm khi thấy một mạch kiến thức tụt.',
  },
  {
    name: 'Tinh thần phụng sự',
    builtBy: 'Vai trò kèm bạn ở Tầng 5.',
    evidence: 'Giảng lại được và nhóm được kèm có tiến bộ.',
  },
  {
    name: 'Tư duy dài hạn',
    builtBy: 'Lộ trình nhiều giai đoạn với mốc thăng cấp rõ ràng.',
    evidence: 'Kiên trì qua trọn một giai đoạn mà không bỏ giữa chừng.',
  },
];

/* ============================================================
   ĐỐI CHIẾU KHUNG THAM CHIẾU QUỐC TẾ
   ============================================================ */

export interface StandardRef {
  name: string;
  origin: string;
  idea: string;
  where: string;
}

export const STANDARDS: StandardRef[] = [
  {
    name: 'Thang nhận thức Bloom (bản chỉnh sửa)',
    origin: 'Anderson & Krathwohl, Hoa Kỳ',
    idea: 'Phân tầng mục tiêu học tập từ nhớ → hiểu → vận dụng → phân tích → đánh giá → sáng tạo.',
    where: 'Năm tầng hấp thu của MATH365 được xây trên thang này, rút gọn cho phù hợp môn Toán phổ thông.',
  },
  {
    name: 'Mastery Learning',
    origin: 'Benjamin Bloom, Hoa Kỳ',
    idea: 'Chỉ cho học sinh đi tiếp khi đã đạt ngưỡng thành thạo, thay vì đi theo lịch cố định.',
    where: 'Quy tắc KPI 90% và cơ chế làm lại với đề mới trước khi mở nhiệm vụ tiếp theo.',
  },
  {
    name: 'Deliberate Practice',
    origin: 'K. Anders Ericsson',
    idea: 'Luyện có mục tiêu cụ thể, ở mức vừa quá sức, kèm phản hồi tức thì.',
    where: 'Cơ chế chọn mức độ theo KPI và phần nhận xét – giải pháp ngay sau mỗi phiếu.',
  },
  {
    name: 'Spaced Repetition & Retrieval Practice',
    origin: 'Ebbinghaus; Roediger & Karpicke',
    idea: 'Ôn ngắt quãng và gợi nhớ chủ động tạo trí nhớ bền hơn nhiều so với đọc lại.',
    where: 'Lịch ôn 1–3–7–21 và thói quen “gấp sách viết lại”.',
  },
  {
    name: 'Formative Assessment',
    origin: 'Black & Wiliam',
    idea: 'Đánh giá để điều chỉnh việc dạy và học, không phải để xếp hạng.',
    where: 'Mỗi phiếu đều trả về chẩn đoán và định hướng bước kế tiếp, không chỉ trả về điểm.',
  },
  {
    name: 'Interleaved Practice',
    origin: 'Rohrer & Taylor',
    idea: 'Trộn dạng bài giúp hình thành kỹ năng nhận dạng — thứ quyết định điểm số trong đề thi thật.',
    where: 'Các phiếu Tổng duyệt ở giai đoạn 5 của cả ba luồng.',
  },
  {
    name: 'Growth Mindset',
    origin: 'Carol Dweck',
    idea: 'Năng lực phát triển được qua nỗ lực có phương pháp; phản hồi nên hướng vào quá trình.',
    where: 'Nguyên tắc giọng điệu: ghi nhận quá trình, không dán nhãn năng lực.',
  },
];

export const GITA_NOTE =
  'MATH365 tham chiếu các khung lý thuyết trên trong thiết kế chương trình. Đây là sự đối chiếu về phương pháp luận, không phải một chứng nhận kiểm định của bất kỳ tổ chức nào.';
