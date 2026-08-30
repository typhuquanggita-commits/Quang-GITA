import { buildQuestions, type QuestionDraft } from './helpers';

/**
 * NGAN HANG CAU HOI SINH HOC — PHAN 3
 *
 * Sinh hoc la mot trong nam chu de khoa hoc cua phan 3 theo dang thuc chinh
 * thuc, va la chu de duy nhat truoc day khong co trong he thong. Bo cau nay
 * dung theo dung ba chuyen de: te bao, di truyen, co the va tien hoa.
 *
 * Nguyen tac bien soan giu nguyen nhu cac mon khac:
 *  - Moi cau co loi giai giai thich DUONG DI, khong chi cong bo dap an.
 *  - Phuong an nhieu duoc chu thich bay khi no la mot hieu nham co that,
 *    khong phai nhieu cho du bon phuong an.
 *  - Do kho trai tu nhan biet den phan loai, bam phan bo cua de that.
 */

const cell: QuestionDraft[] = [
  {
    id: 's.bio.01',
    topicId: 'science.biology.cell',
    difficulty: 1,
    stem: 'Bào quan nào là nơi diễn ra giai đoạn chuỗi chuyền electron của hô hấp tế bào?',
    choices: ['Ti thể', 'Lục lạp', 'Ribôxôm', 'Bộ máy Gôngi'],
    answer: 'A',
    explanation:
      'Chuỗi chuyền electron nằm ở màng trong ti thể, nơi có các phức hệ enzim và ATP synthase. Lục lạp cũng có chuỗi chuyền electron nhưng thuộc quang hợp, không phải hô hấp.',
    traps: { B: 'Lục lạp có chuỗi chuyền electron của pha sáng quang hợp — dễ nhầm nếu chỉ nhớ cụm từ mà không nhớ quá trình.' },
    skills: ['hô hấp tế bào'],
  },
  {
    id: 's.bio.02',
    topicId: 'science.biology.cell',
    difficulty: 1,
    stem: 'Thành phần nào quyết định tính bán thấm của màng sinh chất?',
    choices: ['Lớp kép phôtpholipit', 'Prôtêin xuyên màng', 'Colestêrôn', 'Glicôprôtêin'],
    answer: 'A',
    explanation:
      'Phần đuôi kị nước của lớp kép phôtpholipit chặn các phân tử phân cực và ion đi qua tự do, nên chỉ chất tan trong lipit và phân tử nhỏ không phân cực mới khuếch tán trực tiếp được. Đó chính là tính bán thấm.',
    traps: { B: 'Prôtêin xuyên màng tạo kênh cho chất đi qua — tức là làm giảm tính bán thấm chứ không tạo ra nó.' },
    skills: ['màng sinh chất'],
  },
  {
    id: 's.bio.03',
    topicId: 'science.biology.cell',
    difficulty: 2,
    stem: 'Đặt tế bào thực vật vào dung dịch ưu trương thì hiện tượng nào xảy ra?',
    choices: [
      'Co nguyên sinh: chất nguyên sinh tách khỏi thành tế bào',
      'Tế bào trương lên rồi vỡ',
      'Tế bào không đổi vì có thành xenlulôzơ',
      'Thành tế bào tan ra',
    ],
    answer: 'A',
    explanation:
      'Dung dịch ưu trương có thế nước thấp hơn nên nước đi từ trong tế bào ra ngoài. Thành xenlulôzơ giữ nguyên hình dạng, còn màng sinh chất và chất nguyên sinh co lại, tách khỏi thành — đó là co nguyên sinh.',
    traps: {
      B: 'Trương và vỡ là hiện tượng của tế bào động vật trong dung dịch nhược trương, ngược hẳn tình huống này.',
      C: 'Thành tế bào giữ hình dạng ngoài, nhưng không ngăn được nước đi ra.',
    },
    skills: ['vận chuyển qua màng', 'thẩm thấu'],
  },
  {
    id: 's.bio.04',
    topicId: 'science.biology.cell',
    difficulty: 2,
    stem: 'Vận chuyển chủ động khác vận chuyển thụ động ở điểm cốt lõi nào?',
    choices: [
      'Cần năng lượng ATP và đi ngược chiều gradien nồng độ',
      'Cần prôtêin màng',
      'Chỉ xảy ra ở tế bào động vật',
      'Chỉ vận chuyển được nước',
    ],
    answer: 'A',
    explanation:
      'Dấu hiệu bản chất là chiều đi: chủ động đưa chất từ nơi nồng độ thấp đến nơi nồng độ cao, việc này không tự xảy ra nên phải tiêu tốn ATP. Thụ động luôn xuôi chiều gradien và không tốn năng lượng.',
    traps: { B: 'Khuếch tán tăng cường cũng cần prôtêin kênh nhưng vẫn là vận chuyển thụ động — nên "cần prôtêin" không phân biệt được hai loại.' },
    skills: ['vận chuyển qua màng'],
  },
  {
    id: 's.bio.05',
    topicId: 'science.biology.cell',
    difficulty: 2,
    stem: 'Enzim làm tăng tốc độ phản ứng bằng cách nào?',
    choices: [
      'Làm giảm năng lượng hoạt hóa của phản ứng',
      'Cung cấp năng lượng cho phản ứng',
      'Làm thay đổi chiều của phản ứng',
      'Làm tăng nhiệt độ môi trường phản ứng',
    ],
    answer: 'A',
    explanation:
      'Enzim liên kết với cơ chất tạo phức hệ trung gian có năng lượng hoạt hóa thấp hơn, nhờ đó nhiều phân tử vượt được rào năng lượng trong cùng một thời gian. Enzim không cấp năng lượng và không làm phản ứng đổi chiều.',
    traps: {
      B: 'Nguồn năng lượng của tế bào là ATP; enzim chỉ hạ rào cản chứ không cấp năng lượng.',
      C: 'Enzim xúc tác cả hai chiều như nhau, chiều thực do chênh lệch nồng độ quyết định.',
    },
    skills: ['enzim'],
  },
  {
    id: 's.bio.06',
    topicId: 'science.biology.cell',
    difficulty: 3,
    stem: 'Vì sao enzim mất hoạt tính khi nhiệt độ vượt quá ngưỡng tối ưu quá xa?',
    choices: [
      'Cấu trúc không gian của trung tâm hoạt động bị biến tính nên không khớp cơ chất',
      'Enzim bị phân giải thành axit amin',
      'Cơ chất bị bay hơi',
      'Enzim bị hòa tan hoàn toàn trong nước',
    ],
    answer: 'A',
    explanation:
      'Hoạt tính enzim phụ thuộc hình dạng ba chiều của trung tâm hoạt động. Nhiệt độ cao phá vỡ các liên kết hiđrô và tương tác yếu giữ cấu hình đó, trung tâm hoạt động biến dạng nên không còn khớp với cơ chất.',
    traps: { B: 'Biến tính là mất cấu hình không gian, không phải đứt liên kết peptit tạo axit amin.' },
    skills: ['enzim', 'biến tính prôtêin'],
  },
  {
    id: 's.bio.07',
    topicId: 'science.biology.cell',
    difficulty: 2,
    stem: 'Pha sáng của quang hợp tạo ra những sản phẩm nào được pha tối sử dụng?',
    choices: ['ATP và NADPH', 'ATP và O₂', 'Glucôzơ và O₂', 'CO₂ và H₂O'],
    answer: 'A',
    explanation:
      'Pha sáng chuyển năng lượng ánh sáng thành ATP và NADPH, đồng thời thải O₂ từ quang phân li nước. Chu trình Canvin ở pha tối dùng đúng ATP và NADPH đó để khử CO₂ thành đường; O₂ là sản phẩm thải, không được pha tối dùng.',
    traps: { B: 'O₂ đúng là sản phẩm của pha sáng nhưng bị thải ra ngoài, pha tối không dùng đến.' },
    skills: ['quang hợp'],
  },
  {
    id: 's.bio.08',
    topicId: 'science.biology.cell',
    difficulty: 3,
    stem: 'Trong hô hấp hiếu khí, giai đoạn nào tạo ra phần lớn ATP?',
    choices: [
      'Chuỗi chuyền electron và phôtphorin hóa oxi hóa',
      'Đường phân',
      'Chu trình Crep',
      'Giai đoạn oxi hóa piruvat',
    ],
    answer: 'A',
    explanation:
      'Đường phân và chu trình Crep chỉ tạo vài ATP trực tiếp nhưng thu về nhiều NADH, FADH₂. Chính chuỗi chuyền electron mới oxi hóa các chất mang này và tạo ra khoảng 26–28 trong tổng số khoảng 30–32 ATP của cả quá trình.',
    traps: { B: 'Đường phân là bước đầu tiên nhưng chỉ cho 2 ATP thực — dễ nhầm vì đây là giai đoạn được học kỹ nhất.' },
    skills: ['hô hấp tế bào'],
  },
  {
    id: 's.bio.09',
    topicId: 'science.biology.cell',
    difficulty: 1,
    stem: 'Điểm khác biệt cơ bản giữa tế bào nhân sơ và tế bào nhân thực là gì?',
    choices: [
      'Tế bào nhân sơ không có màng nhân và bào quan có màng',
      'Tế bào nhân sơ không có ADN',
      'Tế bào nhân sơ không có ribôxôm',
      'Tế bào nhân sơ không có màng sinh chất',
    ],
    answer: 'A',
    explanation:
      'Tế bào nhân sơ vẫn có ADN, ribôxôm và màng sinh chất, nhưng vật chất di truyền nằm trần trong vùng nhân, không được bọc bởi màng nhân, và tế bào không có các bào quan có màng như ti thể hay lưới nội chất.',
    skills: ['cấu trúc tế bào'],
  },
  {
    id: 's.bio.10',
    topicId: 'science.biology.cell',
    difficulty: 2,
    stem: 'Nguyên phân từ một tế bào mẹ 2n tạo ra kết quả nào?',
    choices: [
      'Hai tế bào con, mỗi tế bào 2n, giống hệt tế bào mẹ',
      'Bốn tế bào con, mỗi tế bào n',
      'Hai tế bào con, mỗi tế bào n',
      'Bốn tế bào con, mỗi tế bào 2n',
    ],
    answer: 'A',
    explanation:
      'Nguyên phân có một lần nhân đôi ADN và một lần phân chia, nên bộ nhiễm sắc thể được giữ nguyên: một tế bào 2n cho hai tế bào 2n giống nhau và giống mẹ. Bốn tế bào n là kết quả của giảm phân.',
    traps: { B: 'Bốn tế bào n là kết quả giảm phân, do có hai lần phân chia nhưng chỉ một lần nhân đôi.' },
    skills: ['nguyên phân'],
  },
  {
    id: 's.bio.11',
    topicId: 'science.biology.cell',
    difficulty: 3,
    stem: 'Sự kiện nào ở giảm phân I tạo ra biến dị tổ hợp nhiều nhất?',
    choices: [
      'Trao đổi chéo giữa các crômatit không chị em và sự phân li độc lập của các cặp nhiễm sắc thể',
      'Nhân đôi ADN ở kì trung gian',
      'Sự co xoắn của nhiễm sắc thể ở kì đầu',
      'Sự phân chia tế bào chất ở kì cuối',
    ],
    answer: 'A',
    explanation:
      'Hai nguồn biến dị nằm cùng ở giảm phân I: trao đổi chéo tạo tổ hợp alen mới ngay trên một nhiễm sắc thể, còn các cặp tương đồng xếp hàng độc lập nên tổ hợp nhiễm sắc thể của giao tử cũng ngẫu nhiên.',
    traps: { B: 'Nhân đôi ADN là quá trình sao chép chính xác, bản thân nó không tạo tổ hợp mới.' },
    skills: ['giảm phân', 'biến dị tổ hợp'],
  },
  {
    id: 's.bio.12',
    topicId: 'science.biology.cell',
    difficulty: 3,
    stem: 'Một loài có bộ nhiễm sắc thể 2n = 24. Một tế bào sinh dục chín của loài này giảm phân bình thường thì mỗi giao tử có bao nhiêu nhiễm sắc thể?',
    choices: ['12', '24', '48', '6'],
    answer: 'A',
    explanation:
      'Giảm phân làm giảm bộ nhiễm sắc thể đi một nửa: từ 2n = 24 xuống n = 12 ở mỗi giao tử. Nhờ vậy khi thụ tinh, hợp tử trở lại đúng 2n = 24 và bộ nhiễm sắc thể của loài được giữ ổn định qua các thế hệ.',
    traps: { B: 'Giữ nguyên 24 là kết quả nguyên phân, không phải giảm phân.' },
    skills: ['giảm phân', 'bộ nhiễm sắc thể'],
  },
  {
    id: 's.bio.13',
    topicId: 'science.biology.cell',
    difficulty: 2,
    stem: 'Bào quan nào chịu trách nhiệm tổng hợp prôtêin trong tế bào?',
    choices: ['Ribôxôm', 'Lizôxôm', 'Không bào', 'Trung thể'],
    answer: 'A',
    explanation:
      'Ribôxôm là nơi diễn ra dịch mã: nó đọc mã trên mARN và nối các axit amin do tARN mang tới thành chuỗi pôlipeptit. Lizôxôm ngược lại làm nhiệm vụ phân giải.',
    traps: { B: 'Lizôxôm chứa enzim thủy phân — phân giải chứ không tổng hợp.' },
    skills: ['cấu trúc tế bào'],
  },
  {
    id: 's.bio.14',
    topicId: 'science.biology.cell',
    difficulty: 4,
    stem: 'Vì sao tế bào hồng cầu người trưởng thành không thể tự tổng hợp prôtêin mới?',
    choices: [
      'Vì đã mất nhân và các bào quan trong quá trình biệt hóa',
      'Vì không có màng sinh chất',
      'Vì không tiếp xúc với oxi',
      'Vì nồng độ enzim quá cao',
    ],
    answer: 'A',
    explanation:
      'Hồng cầu người trưởng thành mất nhân, ti thể và ribôxôm để dành tối đa thể tích cho hêmôglôbin. Không còn ADN và ribôxôm thì không thể phiên mã và dịch mã, nên tế bào không tự sửa chữa được và chỉ sống khoảng 120 ngày.',
    traps: { C: 'Hồng cầu tiếp xúc với oxi nhiều hơn hầu hết tế bào khác — đó chính là chức năng của nó.' },
    skills: ['cấu trúc tế bào', 'biệt hóa'],
  },
  {
    id: 's.bio.15',
    topicId: 'science.biology.cell',
    difficulty: 4,
    stem: 'Điểm kiểm soát G₁ của chu kì tế bào có vai trò gì?',
    choices: [
      'Quyết định tế bào có bước vào pha S để nhân đôi ADN hay không',
      'Kiểm tra các nhiễm sắc thể đã gắn thoi phân bào chưa',
      'Phân chia tế bào chất',
      'Tổng hợp thoi phân bào',
    ],
    answer: 'A',
    explanation:
      'Điểm kiểm soát G₁ đánh giá kích thước tế bào, dinh dưỡng và tình trạng ADN; qua được thì tế bào cam kết nhân đôi ADN, không qua thì chuyển sang trạng thái nghỉ G₀. Kiểm tra gắn thoi phân bào là việc của điểm kiểm soát ở kì giữa.',
    traps: { B: 'Đó là điểm kiểm soát thoi phân bào ở kì giữa nguyên phân, muộn hơn nhiều.' },
    skills: ['chu kì tế bào'],
  },
  {
    id: 's.bio.16',
    topicId: 'science.biology.cell',
    difficulty: 5,
    stem: 'Một tế bào 2n = 8 trải qua 4 lần nguyên phân liên tiếp. Tổng số nhiễm sắc thể đơn mà môi trường nội bào phải cung cấp là bao nhiêu?',
    choices: ['120', '128', '64', '112'],
    answer: 'A',
    explanation:
      'Sau 4 lần nguyên phân có 2⁴ = 16 tế bào. Nguyên liệu môi trường cung cấp tương ứng với số nhiễm sắc thể của các tế bào mới sinh thêm, tức (2⁴ − 1) × 2n = 15 × 8 = 120. Tế bào mẹ ban đầu không do môi trường cung cấp nên phải trừ đi.',
    traps: {
      B: '128 = 16 × 8 là tổng số nhiễm sắc thể trong tất cả tế bào con, chưa trừ bộ ban đầu của tế bào mẹ.',
      D: '112 = 14 × 8 — trừ nhầm hai bộ thay vì một.',
    },
    skills: ['nguyên phân', 'tính toán nguyên liệu'],
  },
  {
    id: 's.bio.17',
    topicId: 'science.biology.cell',
    difficulty: 3,
    stem: 'Vì sao lên men rượu chỉ tạo được 2 ATP từ một phân tử glucôzơ, ít hơn hẳn hô hấp hiếu khí?',
    choices: [
      'Vì không có chất nhận electron cuối cùng là oxi nên chuỗi chuyền electron không hoạt động',
      'Vì glucôzơ không được phân giải',
      'Vì không có enzim đường phân',
      'Vì sản phẩm êtanol phá hủy ti thể',
    ],
    answer: 'A',
    explanation:
      'Lên men chỉ dừng ở đường phân, thu 2 ATP. Thiếu oxi làm chuỗi chuyền electron tắc, NADH không được tái oxi hóa ở ti thể mà phải nhường electron cho axetalđêhit để tạo êtanol, chỉ nhằm tái tạo NAD⁺ cho đường phân chạy tiếp.',
    traps: { B: 'Glucôzơ vẫn được phân giải qua đường phân, chỉ là không phân giải hoàn toàn tới CO₂ và H₂O.' },
    skills: ['lên men', 'hô hấp tế bào'],
  },
  {
    id: 's.bio.18',
    topicId: 'science.biology.cell',
    difficulty: 3,
    stem: 'Nêu tên bào quan có màng kép, chứa ADN riêng và ribôxôm riêng, được xem là bằng chứng của thuyết nội cộng sinh ở tế bào động vật.',
    answer: 'ti thể',
    accepted: ['ti the', 'ty thể', 'ty the', 'mitochondria'],
    explanation:
      'Ti thể có màng kép, ADN vòng và ribôxôm kiểu vi khuẩn, lại tự nhân đôi độc lập với tế bào. Những đặc điểm này là cơ sở của thuyết nội cộng sinh: ti thể có nguồn gốc từ một vi khuẩn hiếu khí bị tế bào nhân thực nguyên thủy thu nhận.',
    skills: ['cấu trúc tế bào', 'nội cộng sinh'],
  },
  {
    id: 's.bio.19',
    topicId: 'science.biology.cell',
    difficulty: 4,
    stem: 'Một tế bào có 2n = 20 đang ở kì giữa của nguyên phân. Hãy cho biết số crômatit có trong tế bào lúc đó.',
    answer: '40',
    accepted: ['40 cromatit', '40 crômatit'],
    explanation:
      'Ở kì giữa nguyên phân, ADN đã nhân đôi nhưng tâm động chưa tách, nên mỗi nhiễm sắc thể kép gồm 2 crômatit. Có 20 nhiễm sắc thể kép nên số crômatit là 20 × 2 = 40.',
    skills: ['nguyên phân', 'nhiễm sắc thể'],
  },
];

const genetics: QuestionDraft[] = [
  {
    id: 's.bio.20',
    topicId: 'science.biology.genetics',
    difficulty: 1,
    stem: 'Đơn phân cấu tạo nên phân tử ADN là gì?',
    choices: ['Nuclêôtit', 'Axit amin', 'Glucôzơ', 'Ribônuclêôtit'],
    answer: 'A',
    explanation:
      'ADN là chuỗi các nuclêôtit, mỗi nuclêôtit gồm đường đêôxiribôzơ, nhóm phôtphat và một trong bốn bazơ A, T, G, X. Ribônuclêôtit là đơn phân của ARN, còn axit amin là đơn phân của prôtêin.',
    traps: { D: 'Ribônuclêôtit là đơn phân của ARN — khác ở loại đường và ở bazơ U thay cho T.' },
    skills: ['cấu trúc ADN'],
  },
  {
    id: 's.bio.21',
    topicId: 'science.biology.genetics',
    difficulty: 2,
    stem: 'Nguyên tắc bổ sung trong phân tử ADN được thể hiện như thế nào?',
    choices: ['A liên kết với T bằng 2 liên kết hiđrô, G liên kết với X bằng 3 liên kết hiđrô', 'A với G, T với X', 'A với X, T với G', 'A với A, T với T'],
    answer: 'A',
    explanation:
      'Bazơ lớn luôn bắt cặp với bazơ bé để đường kính chuỗi xoắn kép không đổi: A với T qua 2 liên kết hiđrô, G với X qua 3 liên kết hiđrô. Vì vậy đoạn ADN giàu G–X bền nhiệt hơn đoạn giàu A–T.',
    skills: ['cấu trúc ADN', 'nguyên tắc bổ sung'],
  },
  {
    id: 's.bio.22',
    topicId: 'science.biology.genetics',
    difficulty: 3,
    stem: 'Một gen có 3000 nuclêôtit, trong đó A chiếm 20%. Số nuclêôtit loại G của gen là bao nhiêu?',
    choices: ['900', '600', '1200', '450'],
    answer: 'A',
    explanation:
      'Theo nguyên tắc bổ sung, A = T và G = X, đồng thời %A + %G = 50%. A chiếm 20% nên G chiếm 30%, tức G = 30% × 3000 = 900 nuclêôtit.',
    traps: {
      B: '600 = 20% × 3000 là số nuclêôtit loại A, không phải G.',
      D: '450 là kết quả khi chia đôi thêm một lần không cần thiết.',
    },
    skills: ['tính toán ADN'],
  },
  {
    id: 's.bio.23',
    topicId: 'science.biology.genetics',
    difficulty: 2,
    stem: 'Quá trình phiên mã tạo ra sản phẩm nào?',
    choices: ['ARN', 'ADN', 'Prôtêin', 'Nuclêôtit tự do'],
    answer: 'A',
    explanation:
      'Phiên mã dùng một mạch ADN làm khuôn để tổng hợp ARN nhờ enzim ARN pôlimeraza. Tổng hợp ADN từ ADN là nhân đôi, còn tổng hợp prôtêin từ mARN là dịch mã.',
    traps: { C: 'Prôtêin là sản phẩm của dịch mã, bước sau phiên mã.' },
    skills: ['phiên mã'],
  },
  {
    id: 's.bio.24',
    topicId: 'science.biology.genetics',
    difficulty: 2,
    stem: 'Mã di truyền có tính thoái hóa nghĩa là gì?',
    choices: [
      'Nhiều bộ ba khác nhau cùng mã hóa một loại axit amin',
      'Một bộ ba mã hóa nhiều axit amin',
      'Mã di truyền bị mất dần qua các thế hệ',
      'Bộ ba mở đầu có thể thay đổi',
    ],
    answer: 'A',
    explanation:
      'Có 64 bộ ba nhưng chỉ 20 loại axit amin, nên hầu hết axit amin được mã hóa bởi vài bộ ba khác nhau, thường chỉ khác nhau ở nuclêôtit thứ ba. Nhờ tính thoái hóa mà nhiều đột biến thay thế không làm đổi axit amin.',
    traps: { B: 'Một bộ ba mã hóa nhiều axit amin sẽ làm mã di truyền không đọc được — đó là điều trái với tính đặc hiệu.' },
    skills: ['mã di truyền'],
  },
  {
    id: 's.bio.25',
    topicId: 'science.biology.genetics',
    difficulty: 3,
    stem: 'Ở đậu Hà Lan, alen A quy định hoa đỏ trội hoàn toàn so với alen a quy định hoa trắng. Phép lai Aa × Aa cho tỉ lệ kiểu hình đời con như thế nào?',
    choices: ['3 hoa đỏ : 1 hoa trắng', '1 hoa đỏ : 1 hoa trắng', '100% hoa đỏ', '1 hoa đỏ : 2 hoa trắng'],
    answer: 'A',
    explanation:
      'Aa × Aa cho tỉ lệ kiểu gen 1AA : 2Aa : 1aa. Vì A trội hoàn toàn nên AA và Aa đều biểu hiện hoa đỏ, chỉ aa cho hoa trắng, tức tỉ lệ kiểu hình 3 đỏ : 1 trắng.',
    traps: { B: '1 : 1 là kết quả của phép lai phân tích Aa × aa.' },
    skills: ['quy luật Mendel'],
  },
  {
    id: 's.bio.26',
    topicId: 'science.biology.genetics',
    difficulty: 3,
    stem: 'Phép lai phân tích được dùng để làm gì?',
    choices: [
      'Xác định kiểu gen của cá thể mang kiểu hình trội',
      'Xác định kiểu hình của đời con',
      'Tạo dòng thuần chủng',
      'Xác định số lượng nhiễm sắc thể',
    ],
    answer: 'A',
    explanation:
      'Lai cá thể trội chưa rõ kiểu gen với cá thể lặn thuần chủng: nếu đời con đồng loạt trội thì cá thể đó thuần chủng, còn nếu xuất hiện cả kiểu hình lặn thì nó là dị hợp. Cá thể lặn chỉ cho một loại giao tử nên không che giấu được gì.',
    skills: ['lai phân tích'],
  },
  {
    id: 's.bio.27',
    topicId: 'science.biology.genetics',
    difficulty: 4,
    stem: 'Phép lai AaBb × AaBb với hai cặp gen phân li độc lập, trội hoàn toàn, cho tỉ lệ kiểu hình đời con là bao nhiêu?',
    choices: ['9 : 3 : 3 : 1', '3 : 1', '1 : 1 : 1 : 1', '9 : 7'],
    answer: 'A',
    explanation:
      'Hai cặp phân li độc lập nên nhân riêng từng cặp: mỗi cặp cho 3 trội : 1 lặn, nhân lại được (3 : 1)(3 : 1) = 9 A-B- : 3 A-bb : 3 aaB- : 1 aabb.',
    traps: { D: '9 : 7 là tỉ lệ của tương tác gen bổ sung, không phải phân li độc lập thuần túy.' },
    skills: ['quy luật Mendel', 'phân li độc lập'],
  },
  {
    id: 's.bio.28',
    topicId: 'science.biology.genetics',
    difficulty: 4,
    stem: 'Hiện tượng liên kết gen hoàn toàn làm thay đổi điều gì so với phân li độc lập?',
    choices: [
      'Làm giảm số loại giao tử và hạn chế biến dị tổ hợp',
      'Làm tăng số loại giao tử',
      'Làm mất hoàn toàn tính trạng lặn',
      'Làm số nhiễm sắc thể thay đổi',
    ],
    answer: 'A',
    explanation:
      'Các gen trên cùng một nhiễm sắc thể di truyền cùng nhau thành nhóm liên kết, nên cơ thể AB/ab chỉ cho 2 loại giao tử thay vì 4. Số tổ hợp giảm nên biến dị tổ hợp cũng ít đi — bù lại nhóm tính trạng tốt được giữ nguyên.',
    traps: { B: 'Hoán vị gen mới làm tăng số loại giao tử; liên kết hoàn toàn thì ngược lại.' },
    skills: ['liên kết gen'],
  },
  {
    id: 's.bio.29',
    topicId: 'science.biology.genetics',
    difficulty: 4,
    stem: 'Ở người, bệnh mù màu do gen lặn nằm trên nhiễm sắc thể X không có alen tương ứng trên Y. Vì sao nam giới mắc bệnh nhiều hơn nữ giới?',
    choices: [
      'Vì nam chỉ có một X nên chỉ cần một alen lặn đã biểu hiện bệnh',
      'Vì gen gây bệnh nằm trên nhiễm sắc thể Y',
      'Vì nam có nhiều X hơn nữ',
      'Vì alen gây bệnh là alen trội ở nam',
    ],
    answer: 'A',
    explanation:
      'Nam có kiểu gen XY nên chỉ cần alen lặn duy nhất trên X là biểu hiện bệnh. Nữ có XX nên phải nhận alen lặn từ cả bố lẫn mẹ mới mắc — xác suất đó thấp hơn hẳn.',
    traps: { B: 'Nếu gen nằm trên Y thì bệnh chỉ truyền cho con trai theo dòng bố, mô hình di truyền sẽ khác hẳn.' },
    skills: ['di truyền liên kết giới tính'],
  },
  {
    id: 's.bio.30',
    topicId: 'science.biology.genetics',
    difficulty: 3,
    stem: 'Đột biến thay thế một cặp nuclêôtit có thể không làm thay đổi chuỗi pôlipeptit. Nguyên nhân là gì?',
    choices: [
      'Do tính thoái hóa của mã di truyền, bộ ba mới vẫn mã hóa cùng một axit amin',
      'Do ADN tự sửa lỗi ngay lập tức',
      'Do đột biến chỉ xảy ra ở vùng không phiên mã',
      'Do prôtêin có khả năng tự phục hồi',
    ],
    answer: 'A',
    explanation:
      'Nhiều axit amin được mã hóa bởi vài bộ ba chỉ khác nhau ở nuclêôtit thứ ba. Nếu thay thế rơi đúng vị trí đó, bộ ba mới vẫn mã hóa axit amin cũ — gọi là đột biến đồng nghĩa.',
    skills: ['đột biến gen', 'mã di truyền'],
  },
  {
    id: 's.bio.31',
    topicId: 'science.biology.genetics',
    difficulty: 4,
    stem: 'Vì sao đột biến mất một cặp nuclêôtit thường gây hậu quả nghiêm trọng hơn đột biến thay thế một cặp?',
    choices: [
      'Vì làm dịch khung đọc, thay đổi toàn bộ các bộ ba từ điểm đột biến trở đi',
      'Vì làm mất hẳn một nhiễm sắc thể',
      'Vì làm gen không nhân đôi được',
      'Vì luôn làm xuất hiện bộ ba mở đầu mới',
    ],
    answer: 'A',
    explanation:
      'Mã di truyền được đọc liên tục theo từng bộ ba từ mã mở đầu. Mất một cặp làm mọi bộ ba phía sau bị dịch đi một vị trí, nên toàn bộ trình tự axit amin từ đó trở đi thay đổi và chuỗi thường mất chức năng.',
    traps: { B: 'Mất một nhiễm sắc thể là đột biến số lượng nhiễm sắc thể, ở cấp độ hoàn toàn khác.' },
    skills: ['đột biến gen', 'dịch khung'],
  },
  {
    id: 's.bio.32',
    topicId: 'science.biology.genetics',
    difficulty: 3,
    stem: 'Hội chứng Đao ở người là hậu quả của dạng đột biến nào?',
    choices: ['Thể ba ở cặp nhiễm sắc thể số 21', 'Đột biến gen lặn trên X', 'Mất đoạn nhiễm sắc thể số 5', 'Thể một ở cặp nhiễm sắc thể giới tính'],
    answer: 'A',
    explanation:
      'Người mắc hội chứng Đao có ba nhiễm sắc thể số 21 thay vì hai, tổng cộng 47 nhiễm sắc thể. Nguyên nhân thường gặp là cặp số 21 không phân li trong giảm phân tạo giao tử.',
    traps: {
      C: 'Mất đoạn nhiễm sắc thể số 5 gây hội chứng tiếng mèo kêu, không phải Đao.',
      D: 'Thể một ở cặp giới tính là hội chứng Tơcnơ (XO).',
    },
    skills: ['đột biến nhiễm sắc thể'],
  },
  {
    id: 's.bio.33',
    topicId: 'science.biology.genetics',
    difficulty: 5,
    stem: 'Một quần thể cân bằng di truyền có tần số alen a bằng 0,4. Tỉ lệ cá thể dị hợp Aa trong quần thể là bao nhiêu?',
    choices: ['48%', '16%', '36%', '24%'],
    answer: 'A',
    explanation:
      'Quần thể cân bằng tuân theo Hacđi – Vanbec: p + q = 1 nên p = 0,6. Tỉ lệ dị hợp là 2pq = 2 × 0,6 × 0,4 = 0,48, tức 48%.',
    traps: {
      B: '16% = q² là tỉ lệ kiểu gen aa, không phải Aa.',
      C: '36% = p² là tỉ lệ kiểu gen AA.',
      D: '24% là pq — quên nhân đôi vì dị hợp có hai cách tổ hợp giao tử.',
    },
    skills: ['di truyền quần thể', 'Hacđi – Vanbec'],
  },
  {
    id: 's.bio.34',
    topicId: 'science.biology.genetics',
    difficulty: 4,
    stem: 'Bố mẹ đều có nhóm máu AB. Nhóm máu nào chắc chắn không xuất hiện ở đời con?',
    choices: ['Nhóm O', 'Nhóm A', 'Nhóm B', 'Nhóm AB'],
    answer: 'A',
    explanation:
      'Bố mẹ đều là I^A I^B nên mỗi người chỉ cho giao tử I^A hoặc I^B, không ai cho được alen I^O. Đời con vì thế chỉ có thể là I^A I^A, I^A I^B hoặc I^B I^B, tức nhóm A, AB hoặc B với tỉ lệ 1 : 2 : 1.',
    skills: ['di truyền nhóm máu', 'đa alen'],
  },
  {
    id: 's.bio.35',
    topicId: 'science.biology.genetics',
    difficulty: 3,
    stem: 'Thường biến khác đột biến ở đặc điểm nào?',
    choices: [
      'Thường biến không làm thay đổi kiểu gen và không di truyền được',
      'Thường biến xảy ra ngẫu nhiên và di truyền được',
      'Thường biến chỉ xảy ra ở thực vật',
      'Thường biến luôn có hại',
    ],
    answer: 'A',
    explanation:
      'Thường biến là những biến đổi kiểu hình do môi trường trong giới hạn mức phản ứng của cùng một kiểu gen, nên không truyền cho đời sau. Đột biến ngược lại là biến đổi vật chất di truyền nên di truyền được.',
    traps: { D: 'Thường biến thường có lợi vì giúp cơ thể thích nghi với thay đổi của môi trường.' },
    skills: ['thường biến', 'mức phản ứng'],
  },
  {
    id: 's.bio.36',
    topicId: 'science.biology.genetics',
    difficulty: 2,
    stem: 'Trong kĩ thuật chuyển gen, thể truyền phổ biến nhất là gì?',
    choices: ['Plasmit của vi khuẩn', 'Ribôxôm', 'Ti thể', 'Màng sinh chất'],
    answer: 'A',
    explanation:
      'Plasmit là ADN vòng nhỏ, nằm ngoài nhiễm sắc thể của vi khuẩn và tự nhân đôi độc lập. Nhờ vậy có thể cắt, ghép gen cần chuyển vào plasmit rồi đưa trở lại tế bào nhận để gen được nhân lên cùng plasmit.',
    skills: ['công nghệ gen'],
  },
  {
    id: 's.bio.37',
    topicId: 'science.biology.genetics',
    difficulty: 5,
    stem: 'Ở một loài, cơ thể có kiểu gen AB/ab xảy ra hoán vị gen với tần số 20%. Tỉ lệ giao tử Ab được tạo ra là bao nhiêu?',
    choices: ['10%', '20%', '40%', '5%'],
    answer: 'A',
    explanation:
      'Tần số hoán vị 20% nghĩa là tổng hai loại giao tử hoán vị chiếm 20%, chia đều cho Ab và aB nên mỗi loại 10%. Hai giao tử liên kết AB và ab mỗi loại chiếm (100% − 20%)/2 = 40%.',
    traps: {
      B: '20% là tổng của cả hai loại giao tử hoán vị, chưa chia đôi.',
      C: '40% là tỉ lệ của giao tử liên kết AB hoặc ab.',
    },
    skills: ['hoán vị gen', 'tính tần số giao tử'],
  },
  {
    id: 's.bio.38',
    topicId: 'science.biology.genetics',
    difficulty: 3,
    stem: 'Một phân tử ADN có 900 nuclêôtit loại A và 600 nuclêôtit loại G. Hãy tính tổng số liên kết hiđrô của phân tử này.',
    answer: '3600',
    accepted: ['3600 liên kết hiđrô', '3 600'],
    explanation:
      'Mỗi cặp A–T có 2 liên kết hiđrô và mỗi cặp G–X có 3 liên kết. Tổng số liên kết hiđrô = 2A + 3G = 2 × 900 + 3 × 600 = 1800 + 1800 = 3600.',
    skills: ['tính toán ADN', 'liên kết hiđrô'],
  },
  {
    id: 's.bio.39',
    topicId: 'science.biology.genetics',
    difficulty: 4,
    stem: 'Một quần thể cân bằng di truyền có 9% cá thể mang kiểu hình lặn. Hãy cho biết tần số alen lặn của quần thể (viết dưới dạng số thập phân).',
    answer: '0,3',
    accepted: ['0.3', '0,30', '30%'],
    explanation:
      'Kiểu hình lặn ứng với kiểu gen aa nên q² = 0,09, suy ra q = √0,09 = 0,3. Đây là bước mở đầu bắt buộc của mọi bài Hacđi – Vanbec: từ kiểu hình lặn tính ngược ra tần số alen.',
    skills: ['di truyền quần thể', 'Hacđi – Vanbec'],
  },
];

const organism: QuestionDraft[] = [
  {
    id: 's.bio.40',
    topicId: 'science.biology.organism',
    difficulty: 2,
    stem: 'Động lực chủ yếu đẩy dòng nước đi lên trong mạch gỗ của cây thân cao là gì?',
    choices: [
      'Lực hút do thoát hơi nước ở lá',
      'Áp suất rễ',
      'Trọng lực',
      'Sự co bóp của mạch gỗ',
    ],
    answer: 'A',
    explanation:
      'Thoát hơi nước ở lá tạo sức hút kéo cả cột nước liên tục nhờ lực liên kết giữa các phân tử nước và lực bám vào thành mạch. Áp suất rễ chỉ đủ đẩy nước lên vài chục xentimét nên không giải thích được cây cao hàng chục mét.',
    traps: { B: 'Áp suất rễ có thật, nhưng chỉ là động lực phụ và thể hiện rõ ở hiện tượng ứ giọt ở cây thấp.' },
    skills: ['trao đổi nước ở thực vật'],
  },
  {
    id: 's.bio.41',
    topicId: 'science.biology.organism',
    difficulty: 3,
    stem: 'Vì sao thực vật C₄ có năng suất quang hợp cao hơn thực vật C₃ trong điều kiện nóng và khô?',
    choices: [
      'Vì C₄ tách không gian cố định CO₂ nên gần như không xảy ra hô hấp sáng',
      'Vì C₄ không cần ánh sáng',
      'Vì C₄ không cần nước',
      'Vì C₄ có nhiều lục lạp hơn gấp mười lần',
    ],
    answer: 'A',
    explanation:
      'Thực vật C₄ cố định CO₂ lần đầu ở tế bào mô giậu rồi chuyển vào tế bào bao bó mạch để chạy chu trình Canvin. Nồng độ CO₂ tại đó rất cao nên enzim rubisco không gắn O₂, hô hấp sáng gần như bị loại bỏ và năng suất giữ được khi trời nóng.',
    traps: { C: 'Mọi thực vật đều cần nước; C₄ chỉ dùng nước hiệu quả hơn chứ không phải không cần.' },
    skills: ['quang hợp', 'thực vật C3 C4'],
  },
  {
    id: 's.bio.42',
    topicId: 'science.biology.organism',
    difficulty: 2,
    stem: 'Hệ tuần hoàn kép có ở nhóm động vật nào?',
    choices: ['Lưỡng cư, bò sát, chim và thú', 'Cá', 'Giun đốt', 'Côn trùng'],
    answer: 'A',
    explanation:
      'Tuần hoàn kép có hai vòng: vòng phổi đưa máu đi trao đổi khí và vòng cơ thể đưa máu đi nuôi các mô, xuất hiện từ lưỡng cư trở lên. Cá chỉ có một vòng tuần hoàn đơn, còn côn trùng có hệ tuần hoàn hở.',
    traps: { B: 'Cá có tuần hoàn đơn: máu qua mang rồi đi thẳng nuôi cơ thể, không quay lại tim.' },
    skills: ['tuần hoàn'],
  },
  {
    id: 's.bio.43',
    topicId: 'science.biology.organism',
    difficulty: 3,
    stem: 'Vì sao phổi chim trao đổi khí hiệu quả hơn phổi thú?',
    choices: [
      'Vì có hệ thống túi khí giúp dòng khí đi một chiều liên tục qua ống khí, kể cả khi thở ra',
      'Vì phổi chim lớn hơn phổi thú',
      'Vì chim không cần nhiều oxi',
      'Vì phổi chim có phế nang lớn hơn',
    ],
    answer: 'A',
    explanation:
      'Các túi khí trước và sau hoạt động như bơm, đẩy không khí giàu oxi đi qua các ống khí theo một chiều ở cả thì hít vào lẫn thở ra. Nhờ đó không có khí cặn đọng lại như trong phế nang của thú, hiệu suất lấy oxi cao hơn hẳn.',
    traps: { C: 'Chim bay cần rất nhiều oxi — đó chính là lý do tiến hóa của cấu trúc này.' },
    skills: ['hô hấp ở động vật'],
  },
  {
    id: 's.bio.44',
    topicId: 'science.biology.organism',
    difficulty: 2,
    stem: 'Hoocmôn insulin do tuyến tụy tiết ra có tác dụng gì?',
    choices: [
      'Làm giảm đường huyết bằng cách tăng đưa glucôzơ vào tế bào và tăng tổng hợp glicôgen',
      'Làm tăng đường huyết',
      'Điều hòa lượng canxi trong máu',
      'Kích thích tăng trưởng chiều cao',
    ],
    answer: 'A',
    explanation:
      'Khi đường huyết cao, tế bào beta của đảo tụy tiết insulin để đưa glucôzơ vào tế bào và chuyển thành glicôgen dự trữ ở gan, nhờ đó đường huyết giảm về mức ổn định. Glucagôn là hoocmôn có tác dụng ngược lại.',
    traps: { B: 'Làm tăng đường huyết là vai trò của glucagôn — cặp đối lập kinh điển hay bị đảo.' },
    skills: ['cân bằng nội môi', 'hoocmôn'],
  },
  {
    id: 's.bio.45',
    topicId: 'science.biology.organism',
    difficulty: 3,
    stem: 'Cơ chế nào giúp duy trì cân bằng nội môi khi nồng độ chất tan trong máu tăng cao?',
    choices: [
      'Tăng tiết ADH làm thận tái hấp thu nước nhiều hơn',
      'Tăng bài tiết nước tiểu loãng',
      'Giảm cảm giác khát',
      'Tăng tiết insulin',
    ],
    answer: 'A',
    explanation:
      'Vùng dưới đồi nhận biết áp suất thẩm thấu máu tăng và kích thích tuyến yên tiết ADH. ADH làm ống góp của thận tăng tái hấp thu nước, nước tiểu cô đặc lại và nồng độ chất tan trong máu giảm về mức bình thường — một vòng điều hòa ngược âm tính.',
    traps: { B: 'Bài tiết nước tiểu loãng sẽ mất thêm nước và làm máu càng cô đặc, tức đi ngược mục tiêu điều hòa.' },
    skills: ['cân bằng nội môi', 'điều hòa ngược'],
  },
  {
    id: 's.bio.46',
    topicId: 'science.biology.organism',
    difficulty: 2,
    stem: 'Hướng động ở thực vật là hình thức phản ứng có đặc điểm gì?',
    choices: [
      'Vận động sinh trưởng định hướng theo hướng của tác nhân kích thích',
      'Vận động nhanh không phụ thuộc hướng kích thích',
      'Phản ứng có sự tham gia của hệ thần kinh',
      'Chỉ xảy ra ở rễ',
    ],
    answer: 'A',
    explanation:
      'Hướng động là sinh trưởng không đều của hai phía cơ quan do auxin phân bố lệch, và hướng cong luôn liên quan tới hướng của kích thích. Ứng động ngược lại không phụ thuộc hướng kích thích, ví dụ lá cây trinh nữ cụp lại khi bị chạm.',
    traps: { B: 'Đó là mô tả của ứng động, không phải hướng động.' },
    skills: ['cảm ứng ở thực vật'],
  },
  {
    id: 's.bio.47',
    topicId: 'science.biology.organism',
    difficulty: 3,
    stem: 'Theo Đacuyn và học thuyết tiến hóa hiện đại, nhân tố nào là nhân tố định hướng của quá trình tiến hóa?',
    choices: ['Chọn lọc tự nhiên', 'Đột biến', 'Di – nhập gen', 'Các yếu tố ngẫu nhiên'],
    answer: 'A',
    explanation:
      'Đột biến và biến dị tổ hợp tạo ra nguyên liệu nhưng theo hướng vô định. Chọn lọc tự nhiên giữ lại các kiểu gen thích nghi và loại bỏ kiểu gen kém thích nghi, nên nó quy định chiều và nhịp độ thay đổi tần số alen — đó là vai trò định hướng.',
    traps: { B: 'Đột biến là nguồn nguyên liệu sơ cấp nhưng xảy ra vô hướng, nên không định hướng được tiến hóa.' },
    skills: ['tiến hóa', 'chọn lọc tự nhiên'],
  },
  {
    id: 's.bio.48',
    topicId: 'science.biology.organism',
    difficulty: 4,
    stem: 'Vì sao chọn lọc tự nhiên chống lại alen lặn diễn ra chậm hơn nhiều so với chống alen trội?',
    choices: [
      'Vì alen lặn còn ẩn trong các thể dị hợp nên không bị chọn lọc tác động',
      'Vì alen lặn đột biến nhanh hơn',
      'Vì alen lặn luôn có lợi',
      'Vì alen lặn không di truyền được',
    ],
    answer: 'A',
    explanation:
      'Chọn lọc tác động lên kiểu hình. Alen lặn chỉ biểu hiện ở thể đồng hợp lặn, còn ở thể dị hợp nó được alen trội che khuất và vẫn được truyền cho đời sau. Vì vậy tần số alen lặn giảm rất chậm và gần như không bị loại bỏ hết.',
    traps: { C: 'Có lợi hay có hại là tùy môi trường; điều quyết định ở đây là khả năng ẩn trong thể dị hợp.' },
    skills: ['tiến hóa', 'chọn lọc tự nhiên'],
  },
  {
    id: 's.bio.49',
    topicId: 'science.biology.organism',
    difficulty: 4,
    stem: 'Cách li sinh sản có vai trò gì trong quá trình hình thành loài mới?',
    choices: [
      'Ngăn trao đổi vốn gen giữa hai nhóm, giúp khác biệt di truyền tích lũy và củng cố',
      'Làm tăng tốc độ đột biến',
      'Làm hai quần thể trở nên giống nhau',
      'Làm giảm số lượng cá thể của quần thể',
    ],
    answer: 'A',
    explanation:
      'Nếu hai nhóm còn giao phối được thì dòng gen sẽ liên tục pha loãng các khác biệt vừa hình thành. Cách li sinh sản cắt dòng gen đó, cho phép sai khác di truyền tích lũy đến mức trở thành hai loài riêng — đây là dấu hiệu để xác nhận loài mới đã hình thành.',
    skills: ['hình thành loài', 'cách li sinh sản'],
  },
  {
    id: 's.bio.50',
    topicId: 'science.biology.organism',
    difficulty: 2,
    stem: 'Trong một chuỗi thức ăn, sinh vật sản xuất là nhóm nào?',
    choices: ['Thực vật và các sinh vật tự dưỡng khác', 'Động vật ăn cỏ', 'Động vật ăn thịt', 'Vi khuẩn phân giải'],
    answer: 'A',
    explanation:
      'Sinh vật sản xuất tự tổng hợp chất hữu cơ từ chất vô cơ nhờ quang hợp hoặc hóa tổng hợp, nên chúng mở đầu mọi chuỗi thức ăn. Vi khuẩn phân giải đứng ở khâu trả chất vô cơ về môi trường, thuộc nhóm phân giải.',
    traps: { D: 'Vi khuẩn phân giải là sinh vật phân giải — khép vòng tuần hoàn vật chất chứ không mở đầu chuỗi.' },
    skills: ['hệ sinh thái', 'chuỗi thức ăn'],
  },
  {
    id: 's.bio.51',
    topicId: 'science.biology.organism',
    difficulty: 3,
    stem: 'Vì sao chuỗi thức ăn trong tự nhiên thường chỉ có 4 đến 5 bậc dinh dưỡng?',
    choices: [
      'Vì qua mỗi bậc chỉ khoảng 10% năng lượng được truyền lên, phần lớn mất đi do hô hấp và thải',
      'Vì số loài trong tự nhiên rất ít',
      'Vì động vật ăn thịt không thể ăn nhau',
      'Vì bậc dinh dưỡng cao có kích thước quá nhỏ',
    ],
    answer: 'A',
    explanation:
      'Hiệu suất sinh thái giữa hai bậc liên tiếp chỉ khoảng 10%: phần lớn năng lượng bị tiêu hao qua hô hấp, bài tiết và phần không được đồng hóa. Sau 4–5 bậc, năng lượng còn lại quá nhỏ để nuôi được một quần thể ổn định.',
    skills: ['hệ sinh thái', 'hiệu suất sinh thái'],
  },
  {
    id: 's.bio.52',
    topicId: 'science.biology.organism',
    difficulty: 3,
    stem: 'Quan hệ giữa cây phong lan sống bám trên thân cây gỗ thuộc kiểu quan hệ nào?',
    choices: ['Hội sinh', 'Kí sinh', 'Cộng sinh', 'Cạnh tranh'],
    answer: 'A',
    explanation:
      'Phong lan có rễ khí sinh tự quang hợp, chỉ mượn thân cây gỗ làm giá thể để lấy ánh sáng chứ không hút chất dinh dưỡng của cây chủ. Một bên có lợi, một bên không lợi cũng không hại — đó là hội sinh.',
    traps: {
      B: 'Kí sinh đòi hỏi bên kia bị hại; phong lan không lấy chất từ cây gỗ.',
      C: 'Cộng sinh cần cả hai bên đều có lợi và thường phụ thuộc nhau chặt chẽ.',
    },
    skills: ['quan hệ sinh thái'],
  },
  {
    id: 's.bio.53',
    topicId: 'science.biology.organism',
    difficulty: 4,
    stem: 'Khi mật độ quần thể vượt quá sức chứa của môi trường, hiện tượng nào thường xảy ra?',
    choices: [
      'Cạnh tranh cùng loài tăng, tỉ lệ tử vong tăng và mức sinh sản giảm',
      'Tốc độ tăng trưởng tiếp tục tăng theo hàm mũ',
      'Quần thể tách thành loài mới ngay lập tức',
      'Nguồn sống của môi trường tự tăng theo',
    ],
    answer: 'A',
    explanation:
      'Vượt sức chứa nghĩa là nguồn sống không đủ chia, nên các cá thể cùng loài cạnh tranh gay gắt về thức ăn và nơi ở. Tử vong tăng, sinh sản giảm, kích thước quần thể được kéo trở lại quanh mức cân bằng — đây là cơ chế tự điều chỉnh.',
    traps: { B: 'Tăng trưởng theo hàm mũ chỉ xảy ra khi nguồn sống còn dư dả, tức trước khi chạm sức chứa.' },
    skills: ['quần thể', 'sức chứa môi trường'],
  },
  {
    id: 's.bio.54',
    topicId: 'science.biology.organism',
    difficulty: 2,
    stem: 'Sinh trưởng qua biến thái hoàn toàn ở côn trùng có đặc điểm nào?',
    choices: [
      'Ấu trùng khác hẳn con trưởng thành và phải trải qua giai đoạn nhộng',
      'Ấu trùng giống hệt con trưởng thành',
      'Không có giai đoạn lột xác',
      'Chỉ gặp ở động vật có xương sống',
    ],
    answer: 'A',
    explanation:
      'Biến thái hoàn toàn có bốn giai đoạn trứng — ấu trùng — nhộng — trưởng thành, ví dụ bướm. Ấu trùng khác con trưởng thành cả về hình thái lẫn thức ăn nên hai giai đoạn không cạnh tranh nguồn sống của nhau.',
    traps: { B: 'Ấu trùng giống con trưởng thành là biến thái không hoàn toàn, ví dụ châu chấu.' },
    skills: ['sinh trưởng và phát triển'],
  },
  {
    id: 's.bio.55',
    topicId: 'science.biology.organism',
    difficulty: 5,
    stem: 'Một hệ sinh thái có sinh vật sản xuất tích lũy 10⁶ kcal. Nếu hiệu suất sinh thái giữa các bậc đều là 10%, năng lượng tích lũy ở bậc dinh dưỡng thứ ba là bao nhiêu kcal?',
    choices: ['10⁴', '10⁵', '10³', '10⁶'],
    answer: 'A',
    explanation:
      'Bậc 1 là sinh vật sản xuất với 10⁶ kcal. Bậc 2 nhận 10% của bậc 1, tức 10⁵ kcal. Bậc 3 nhận 10% của bậc 2, tức 10⁴ kcal. Điểm dễ sai là đếm bậc: sinh vật sản xuất đã là bậc 1 nên chỉ nhân 10% hai lần, không phải ba lần.',
    traps: {
      B: '10⁵ là năng lượng của bậc 2 — đếm nhầm sinh vật sản xuất thành bậc 0.',
      C: '10³ là bậc 4 — nhân 10% thừa một lần.',
    },
    skills: ['hệ sinh thái', 'hiệu suất sinh thái'],
  },
  {
    id: 's.bio.56',
    topicId: 'science.biology.organism',
    difficulty: 3,
    stem: 'Hãy cho biết tên quá trình mà cây xanh thoát hơi nước ra ngoài chủ yếu qua khí khổng ở lá.',
    answer: 'thoát hơi nước',
    accepted: ['thoat hoi nuoc', 'sự thoát hơi nước', 'transpiration'],
    explanation:
      'Khoảng 90% lượng nước cây hút vào bị mất qua thoát hơi nước ở khí khổng. Quá trình này vừa tạo lực kéo dòng nước lên cao, vừa hạ nhiệt cho lá và mở đường cho CO₂ khuếch tán vào để quang hợp.',
    skills: ['trao đổi nước ở thực vật'],
  },
  {
    id: 's.bio.57',
    topicId: 'science.biology.organism',
    difficulty: 4,
    stem: 'Một quần thể có 500 cá thể. Trong một năm có 60 cá thể sinh ra và 20 cá thể chết đi, không có nhập cư và xuất cư. Hãy tính kích thước quần thể ở cuối năm đó.',
    answer: '540',
    accepted: ['540 cá thể', '540 ca the'],
    explanation:
      'Kích thước cuối kì = kích thước đầu kì + số sinh ra − số chết đi + nhập cư − xuất cư. Thay số: 500 + 60 − 20 + 0 − 0 = 540 cá thể.',
    skills: ['quần thể', 'kích thước quần thể'],
  },
  {
    id: 's.bio.58',
    topicId: 'science.biology.organism',
    difficulty: 3,
    stem: 'Hãy cho biết tên nhân tố tiến hóa làm thay đổi tần số alen của quần thể một cách đột ngột và vô hướng, tác động mạnh nhất ở quần thể có kích thước nhỏ.',
    answer: 'các yếu tố ngẫu nhiên',
    accepted: [
      'cac yeu to ngau nhien',
      'yếu tố ngẫu nhiên',
      'biến động di truyền',
      'phiêu bạt di truyền',
      'phiêu bạt gen',
    ],
    explanation:
      'Ở quần thể nhỏ, một biến cố như bão hay dịch bệnh có thể loại bỏ ngẫu nhiên nhiều cá thể, làm một alen biến mất hoặc trở nên phổ biến mà không liên quan gì tới giá trị thích nghi. Quần thể càng nhỏ thì sai lệch ngẫu nhiên càng lớn.',
    skills: ['tiến hóa', 'yếu tố ngẫu nhiên'],
  },
];

export const BIOLOGY_QUESTIONS = buildQuestions('science', 'biology', [
  ...cell,
  ...genetics,
  ...organism,
]);
