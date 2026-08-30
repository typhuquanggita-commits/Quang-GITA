import { MAX_TOTAL_SCORE, SECTIONS } from '../config';
import { MAX_EXAM_ATTEMPTS_PER_YEAR, OFFICIAL_EXAM_FEE } from './pricing';

/**
 * TRUNG TAM NOI DUNG
 *
 * SEO khong phai la chuyen the meta. The meta chi giup Google HIEU mot trang;
 * cai quyet dinh trang do co duoc xep hang khong la no co TRA LOI DUOC cau
 * nguoi ta go vao o tim kiem hay khong.
 *
 * Cac bai duoi day duoc viet cho dung nhung cau ma nguoi thi HSA that su tim:
 * "HSA la gi", "cau truc de thi HSA", "le phi thi HSA bao nhieu", "on thi HSA
 * bao lau", "HSA bao nhieu diem la cao". Do khong phai tu khoa duoc nhoi vao —
 * do la cau hoi, va moi bai o day tra loi tron mot cau hoi.
 *
 * BA RANG BUOC TU DAT RA, deu co test canh giu:
 *
 * 1. MOI CON SO PHAI LAY TU NGUON DUY NHAT trong ma nguon (config, pricing),
 *    khong go tay. Mot bai viet noi "150 cau" trong khi he thong dung 120 se
 *    pha huy long tin nhanh hon bat ky loi ky thuat nao — va no chi xay ra khi
 *    con so duoc go lai o hai noi.
 * 2. MOI BAI PHAI GHI NGUON va ngay cap nhat. Day la tin hieu tin cay ma
 *    Google danh gia, nhung quan trong hon: no cho nguoi doc kiem tra lai.
 * 3. KHONG PHONG DAI, khong hua thu khong do duoc. Mot trang huu ich duoc chia
 *    se va duoc dan link; mot trang qua loi thi khong.
 */

export interface ArticleSection {
  heading: string;
  /** Cac doan van. Moi doan la mot y tron ven. */
  paragraphs: readonly string[];
  /** Bang so lieu tuy chon. */
  table?: {
    caption: string;
    head: readonly string[];
    rows: readonly (readonly string[])[];
  };
  /** Danh sach gach dau dong tuy chon. */
  list?: readonly string[];
}

export interface ArticleSource {
  label: string;
  url: string;
}

export interface Article {
  path: string;
  title: string;
  /** Cau hoi ma bai nay tra loi tron ven. */
  question: string;
  /** Tra loi ngan trong hai cau — phan Google hay trich lam doan noi bat. */
  answer: string;
  updatedAt: string;
  readingMinutes: number;
  sections: readonly ArticleSection[];
  sources: readonly ArticleSource[];
  /** Duong dan cac bai lien quan, de nguoi doc di tiep. */
  related: readonly string[];
}

const TOTAL_QUESTIONS = SECTIONS.reduce((n, s) => n + s.questionCount, 0);
const TOTAL_MINUTES = SECTIONS.reduce((n, s) => n + s.minutes, 0);
const FEE = OFFICIAL_EXAM_FEE.toLocaleString('vi-VN');

const OFFICIAL: ArticleSource = {
  label: 'Viện Đào tạo số và Khảo thí, ĐHQGHN — trang chính thức kỳ thi HSA',
  url: 'https://hsa.edu.vn',
};

export const ARTICLES: readonly Article[] = [
  {
    path: '/hsa-la-gi',
    title: 'Kỳ thi HSA là gì?',
    question: 'Kỳ thi Đánh giá năng lực HSA của ĐHQGHN là kỳ thi gì?',
    answer: `HSA là kỳ thi Đánh giá năng lực do Đại học Quốc gia Hà Nội tổ chức, gồm ${TOTAL_QUESTIONS} câu làm trong ${TOTAL_MINUTES} phút trên thang ${MAX_TOTAL_SCORE} điểm. Kết quả được nhiều trường đại học dùng để xét tuyển, độc lập với kỳ thi tốt nghiệp THPT.`,
    updatedAt: '2026-08',
    readingMinutes: 6,
    sections: [
      {
        heading: 'HSA đo cái gì, khác gì thi tốt nghiệp',
        paragraphs: [
          'Kỳ thi tốt nghiệp THPT đo xem bạn đã học xong chương trình phổ thông chưa. HSA đo một thứ khác: khả năng suy luận, xử lý thông tin và vận dụng kiến thức vào tình huống mới — tức là những năng lực mà bậc đại học sẽ đòi hỏi.',
          'Sự khác biệt này quyết định cách ôn. Học thuộc nhiều hơn không làm điểm HSA tăng tương ứng, vì phần lớn câu hỏi không hỏi bạn nhớ gì mà hỏi bạn làm gì với thứ mình nhớ. Đây cũng là lý do nhiều học sinh giỏi ở lớp lại bất ngờ với điểm HSA lần đầu.',
        ],
      },
      {
        heading: `Cấu trúc: ${TOTAL_QUESTIONS} câu, ${TOTAL_MINUTES} phút, thang ${MAX_TOTAL_SCORE} điểm`,
        paragraphs: [
          'Đề gồm ba phần, mỗi phần 50 câu và tính giờ riêng. Làm nhanh phần trước không cho thêm phút nào cho phần sau — điều này ảnh hưởng trực tiếp tới chiến thuật làm bài.',
        ],
        table: {
          caption: 'Ba phần của đề HSA',
          head: ['Phần', 'Nội dung', 'Số câu', 'Thời gian'],
          rows: SECTIONS.map((s) => [
            s.officialName,
            s.name,
            `${s.questionCount} câu`,
            `${s.minutes} phút`,
          ]),
        },
      },
      {
        heading: 'Lệ phí và số lượt thi',
        paragraphs: [
          `Lệ phí dự thi là ${FEE} đồng mỗi lượt và không hoàn lại với bất kỳ lý do gì. Mỗi thí sinh được đăng ký tối đa ${MAX_EXAM_ATTEMPTS_PER_YEAR} lượt trong một năm, và hai lượt liên tiếp phải cách nhau ít nhất 28 ngày.`,
          'Khoảng cách 28 ngày là một ràng buộc đáng lưu ý khi lập kế hoạch: nếu định thi hai lượt để lấy điểm cao hơn, bạn cần tính lùi ít nhất một tháng cho lượt đầu, và cần đủ thời gian giữa hai lượt để thật sự sửa được điều gì đó.',
        ],
      },
      {
        heading: 'Một điều nhiều người hiểu nhầm',
        paragraphs: [
          'Đại học Quốc gia Hà Nội và các đơn vị thuộc ĐHQGHN không tổ chức ôn hay luyện thi HSA dưới bất kỳ hình thức nào. Mọi khóa luyện thi trên thị trường đều là của các đơn vị ngoài công lập.',
          'Điều này có nghĩa: không có khóa nào là "khóa chính thức", và không đơn vị nào có đề thi thật. Một trung tâm quảng cáo "đề độc quyền từ ban ra đề" là dấu hiệu nên tránh xa.',
        ],
      },
    ],
    sources: [OFFICIAL],
    related: ['/cau-truc-de-thi-hsa', '/lo-trinh-on-thi-hsa', '/cau-hoi-thuong-gap'],
  },
  {
    path: '/cau-truc-de-thi-hsa',
    title: 'Cấu trúc đề thi HSA chi tiết từng phần',
    question: 'Đề thi HSA gồm những phần nào, mỗi phần bao nhiêu câu và bao nhiêu phút?',
    answer: `Đề HSA gồm ba phần, mỗi phần 50 câu: Tư duy định lượng (75 phút), Tư duy định tính (60 phút) và phần tự chọn Khoa học hoặc Tiếng Anh (60 phút). Riêng phần Toán có ${SECTIONS[0]?.mcqCount ?? 35} câu trắc nghiệm và ${SECTIONS[0]?.fillCount ?? 15} câu điền đáp án.`,
    updatedAt: '2026-08',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Phần 1 — Tư duy định lượng',
        paragraphs: [
          `50 câu trong 75 phút, tức trung bình 90 giây mỗi câu. Đây là phần dài nhất về thời gian nhưng cũng là phần dễ mất giờ nhất, vì có ${SECTIONS[0]?.fillCount ?? 15} câu điền đáp án — dạng không thể loại trừ phương án để đoán.`,
          'Với câu điền, sai một dấu phẩy hay sai đơn vị là mất trọn điểm, trong khi ở câu trắc nghiệm bạn vẫn còn cơ hội. Vì vậy nhóm câu điền xứng đáng được luyện riêng chứ không luyện chung.',
        ],
      },
      {
        heading: 'Phần 2 — Tư duy định tính',
        paragraphs: [
          '50 câu trong 60 phút, tức trung bình 72 giây mỗi câu. Phần này gồm các câu đơn lẻ về từ vựng, ngữ pháp, biện pháp tu từ, và các chùm câu hỏi đọc hiểu dùng chung một ngữ liệu.',
          'Chùm đọc hiểu là nơi phân bổ thời gian quyết định nhiều nhất: đọc kỹ ngữ liệu một lần rồi trả lời cả chùm sẽ nhanh hơn hẳn so với đọc lại cho từng câu.',
        ],
      },
      {
        heading: 'Phần 3 — Tự chọn',
        paragraphs: [
          '50 câu trong 60 phút. Thí sinh chọn một trong các môn Vật lý, Hóa học, Lịch sử, Địa lý hoặc Tiếng Anh. Toàn bộ 50 câu đều là trắc nghiệm.',
          'Chọn môn nào là một quyết định nên đưa ra sớm, vì nó quyết định toàn bộ nội dung ôn của một phần ba đề. Đổi môn giữa chừng nghĩa là phần này phải ôn lại gần như từ đầu.',
        ],
      },
      {
        heading: 'Cách chấm và hệ quả với chiến thuật làm bài',
        paragraphs: [
          `Mỗi câu đúng được 1 điểm, tổng ${TOTAL_QUESTIONS} câu tương ứng thang ${MAX_TOTAL_SCORE} điểm. Câu sai và câu bỏ trống đều 0 điểm, không bị trừ điểm.`,
        ],
        list: [
          'Không trừ điểm nghĩa là bỏ trống không bao giờ lợi hơn đoán. Nguyên tắc: không để trống bất kỳ câu nào khi hết giờ.',
          'Mọi câu đều 1 điểm, kể cả câu khó nhất. Quỳ ở một câu khó để mất thời gian của ba câu dễ là lỗ nặng.',
          'Ba phần tính giờ riêng, không cộng dồn. Phải phân bổ thời gian trong nội bộ từng phần chứ không phân bổ cho cả bài.',
        ],
      },
    ],
    sources: [OFFICIAL],
    related: ['/hsa-la-gi', '/lo-trinh-on-thi-hsa', '/paper'],
  },
  {
    path: '/lo-trinh-on-thi-hsa',
    title: 'Lộ trình ôn thi HSA từ đâu đến đâu',
    question: 'Nên ôn thi HSA trong bao lâu và bắt đầu từ đâu?',
    answer:
      'Một mùa ôn đầy đủ kéo dài khoảng 32 tuần, chia ba giai đoạn: phủ kiến thức (12 tuần), tăng tốc (12 tuần) và mô phỏng phòng thi (8 tuần). Việc đầu tiên nên làm không phải luyện đề mà là định vị — biết mình đang yếu ở đâu trước khi quyết định học gì.',
    updatedAt: '2026-08',
    readingMinutes: 8,
    sections: [
      {
        heading: 'Sai lầm phổ biến nhất: luyện đề quá sớm',
        paragraphs: [
          'Rất nhiều người bắt đầu ôn HSA bằng cách làm đề. Điều đó cho cảm giác đang tiến bộ, nhưng làm đề khi nền chưa đủ cho ra một chuỗi điểm thấp lặp lại — và chuỗi điểm thấp bào mòn động lực nhanh hơn bất cứ thứ gì.',
          'Đề chỉ hữu ích khi bạn đã có gì đó để đo. Trước đó, nó chỉ nói cho bạn một điều bạn đã biết: rằng bạn chưa giỏi.',
        ],
      },
      {
        heading: 'Ba giai đoạn',
        paragraphs: [
          'Mỗi giai đoạn có một mục tiêu khác nhau, và quan trọng hơn, mỗi giai đoạn có một cái bẫy đặc trưng.',
        ],
        table: {
          caption: 'Ba giai đoạn của một mùa ôn',
          head: ['Giai đoạn', 'Thời lượng', 'Mục tiêu', 'Cái bẫy'],
          rows: [
            [
              'Nền tảng',
              '12 tuần',
              'Không còn chuyên đề nào hoàn toàn xa lạ',
              'Nôn nóng luyện đề khi nền chưa đủ',
            ],
            [
              'Tăng tốc',
              '12 tuần',
              'Từ "biết cách làm" sang "làm được trong thời gian cho phép"',
              'Chỉ luyện phần mình mạnh vì nó dễ chịu',
            ],
            [
              'Bứt phá',
              '8 tuần',
              'Giữ phong độ dưới áp lực phòng thi',
              'Nạp kiến thức mới vào tuần cuối',
            ],
          ],
        },
      },
      {
        heading: 'Bắt đầu bằng định vị, không bằng đề',
        paragraphs: [
          'Một bài định vị tốt không cho bạn một con số mà cho bạn một bản đồ: chuyên đề nào đang ở mức nào. Không có bản đồ đó, kế hoạch ôn chỉ là phỏng đoán, và phần lớn phỏng đoán đều sai về chỗ yếu thật.',
          'Lý do rất người: chúng ta nhớ rõ những lần làm sai gần đây và quên những lỗ hổng cũ đã lâu không chạm tới. Cảm giác về điểm yếu của bản thân gần như luôn lệch khỏi thực tế.',
        ],
      },
      {
        heading: 'Nếu chỉ còn 3 tháng',
        paragraphs: [
          'Rút gọn giai đoạn Nền tảng xuống còn phần bắt buộc: chỉ phủ những chuyên đề có tỉ trọng cao trong đề, bỏ qua chuyên đề nhỏ. Giữ nguyên giai đoạn mô phỏng phòng thi — đây là phần không nên cắt, vì nó biến kiến thức thành điểm số.',
          'Điều không nên làm là rút ngắn đều cả ba giai đoạn. Cắt đều nghĩa là không giai đoạn nào đủ dài để hoàn thành mục tiêu của nó.',
        ],
      },
    ],
    sources: [OFFICIAL],
    related: ['/de-cuong', '/cau-truc-de-thi-hsa', '/bao-nhieu-diem-la-cao'],
  },
  {
    path: '/bao-nhieu-diem-la-cao',
    title: 'Thi HSA bao nhiêu điểm là cao?',
    question: 'Điểm HSA bao nhiêu thì được coi là cao và đủ để xét tuyển?',
    answer: `Trên thang ${MAX_TOTAL_SCORE} điểm, mốc 100 điểm vượt ngưỡng xét tuyển của phần lớn trường dùng kết quả HSA, và từ 120 điểm trở lên là mức cạnh tranh được ở các ngành lấy điểm cao nhất. Nhưng điểm thành phần quan trọng hơn điểm tổng.`,
    updatedAt: '2026-08',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Các mốc điểm và ý nghĩa',
        paragraphs: [
          'Điểm chuẩn cụ thể thay đổi theo từng trường, từng ngành và từng năm — nên hãy tra cứu đề án tuyển sinh của trường bạn nhắm tới thay vì tin vào một con số chung. Các mốc dưới đây là cách đọc thang điểm, không phải điểm chuẩn.',
        ],
        table: {
          caption: `Cách đọc điểm trên thang ${MAX_TOTAL_SCORE}`,
          head: ['Mốc điểm', 'Ý nghĩa'],
          rows: [
            ['Từ 120', 'Cạnh tranh được ở các ngành và trường lấy điểm cao nhất'],
            ['Từ 100', 'Vượt ngưỡng xét tuyển của phần lớn trường dùng kết quả HSA'],
            ['Từ 85', 'Nền đã vững, còn dư địa rõ ràng để cải thiện'],
            ['Từ 70', 'Cần củng cố nền ở ít nhất một phần trước khi luyện tốc độ'],
            ['Dưới 70', 'Ưu tiên phủ kiến thức, chưa vội luyện đề'],
          ],
        },
      },
      {
        heading: 'Vì sao điểm thành phần quan trọng hơn điểm tổng',
        paragraphs: [
          'Hai thí sinh cùng 100 điểm có thể cần hai lộ trình hoàn toàn khác nhau. Một người 40/40/20 và một người 34/33/33 có cùng tổng, nhưng người thứ nhất có một lỗ hổng nghiêm trọng ở một phần, còn người thứ hai chỉ cần nâng đều.',
          'Và người thứ nhất rủi ro hơn nhiều: một phần yếu hẳn có xu hướng kéo tụt kết quả ở đề thật, nơi không có phần nào được bỏ qua. Khi đọc điểm, hãy nhìn phần thấp nhất trước khi nhìn tổng.',
        ],
      },
      {
        heading: 'Một con số không nói lên xu hướng',
        paragraphs: [
          'Điểm một lần thi thử dao động vì nhiều lý do không liên quan tới năng lực: mệt, đề lệch may, một câu đọc nhầm ở đầu làm mất nhịp. Ba lần liên tiếp mới bắt đầu nói lên điều gì đó.',
          'Chỉ số đáng theo dõi không phải điểm cao nhất từng đạt, mà là độ dao động giữa các lần. Dao động dưới 8 điểm qua ba đề liên tiếp là dấu hiệu phong độ đã ổn định — và ổn định mới là thứ đi vào phòng thi cùng bạn.',
        ],
      },
    ],
    sources: [OFFICIAL],
    related: ['/cau-truc-de-thi-hsa', '/chung-chi', '/lo-trinh-on-thi-hsa'],
  },
];

export const ARTICLE_BY_PATH = new Map(ARTICLES.map((a) => [a.path, a]));

/* ── Cau hoi thuong gap ────────────────────────────────────────────────── */

export interface Faq {
  question: string;
  answer: string;
}

/**
 * FAQ.
 *
 * Duoc danh dau bang FAQPage trong du lieu co cau truc, nen moi cau tra loi
 * phai DUNG va TU DU — Google co the hien no truc tiep trong ket qua tim kiem,
 * noi nguoi doc khong co ngu canh nao khac ngoai chinh doan van do.
 */
export const FAQS: readonly Faq[] = [
  {
    question: 'Một năm được thi HSA mấy lượt?',
    answer: `Mỗi thí sinh được đăng ký tối đa ${MAX_EXAM_ATTEMPTS_PER_YEAR} lượt thi trong một năm. Hai lượt thi liên tiếp phải cách nhau ít nhất 28 ngày.`,
  },
  {
    question: 'Lệ phí thi HSA là bao nhiêu?',
    answer: `Lệ phí dự thi là ${FEE} đồng mỗi lượt. Lệ phí đã nộp không được hoàn lại với bất kỳ lý do gì, kể cả khi thí sinh không dự thi.`,
  },
  {
    question: 'Đề thi HSA có bao nhiêu câu và làm trong bao lâu?',
    answer: `Đề gồm ${TOTAL_QUESTIONS} câu làm trong ${TOTAL_MINUTES} phút, chia ba phần mỗi phần 50 câu và tính giờ riêng: Tư duy định lượng 75 phút, Tư duy định tính 60 phút, phần tự chọn 60 phút.`,
  },
  {
    question: 'Thi HSA có bị trừ điểm khi làm sai không?',
    answer:
      'Không. Câu sai và câu bỏ trống đều được 0 điểm, không bị trừ điểm. Vì vậy bỏ trống không bao giờ lợi hơn đoán, và nguyên tắc trong phòng thi là không để trống bất kỳ câu nào khi hết giờ.',
  },
  {
    question: 'ĐHQGHN có tổ chức lớp luyện thi HSA không?',
    answer:
      'Không. Đại học Quốc gia Hà Nội và các đơn vị thuộc ĐHQGHN không tổ chức ôn hay luyện thi HSA dưới bất kỳ hình thức nào. Mọi khóa luyện thi trên thị trường đều do các đơn vị ngoài công lập tổ chức, và không đơn vị nào có đề thi thật.',
  },
  {
    question: 'Nên bắt đầu ôn thi HSA từ đâu?',
    answer:
      'Bắt đầu bằng một bài định vị để biết mình đang yếu ở chuyên đề nào, trước khi quyết định học gì. Làm đề ngay từ đầu khi nền chưa đủ chỉ cho ra một chuỗi điểm thấp lặp lại, và điều đó bào mòn động lực nhanh hơn bất cứ thứ gì.',
  },
  {
    question: 'Ôn thi HSA trong bao lâu là đủ?',
    answer:
      'Một mùa ôn đầy đủ kéo dài khoảng 32 tuần, chia ba giai đoạn: phủ kiến thức 12 tuần, tăng tốc 12 tuần, mô phỏng phòng thi 8 tuần. Nếu chỉ còn ba tháng, hãy rút gọn giai đoạn phủ kiến thức nhưng giữ nguyên giai đoạn mô phỏng phòng thi.',
  },
  {
    question: 'Thi HSA bao nhiêu điểm là cao?',
    answer: `Trên thang ${MAX_TOTAL_SCORE} điểm, từ 100 điểm là vượt ngưỡng xét tuyển của phần lớn trường dùng kết quả HSA, và từ 120 điểm là mức cạnh tranh ở các ngành lấy điểm cao nhất. Tuy nhiên điểm chuẩn thay đổi theo từng trường, từng ngành và từng năm.`,
  },
];
