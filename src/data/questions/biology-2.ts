import { buildQuestions, type QuestionDraft } from './helpers';

/**
 * SINH HOC — BO LAM DAY
 *
 * To hop Ly — Hoa — Sinh la to hop co ngan hang mong nhat sau khi do lai, va
 * Sinh hoc chinh la chu de keo no xuong. Bo nay lam day de bo 10 de cua to
 * hop do dat duoc chuan "hai de bat ky khong dung chung qua 40% so cau".
 */

const drafts: QuestionDraft[] = [
  {
    id: 's.bio.81',
    topicId: 'science.biology.cell',
    difficulty: 2,
    stem: 'Nước được vận chuyển qua màng sinh chất chủ yếu nhờ loại prôtêin nào?',
    choices: ['Aquaporin', 'Bơm natri kali', 'Enzim ATPaza', 'Kháng thể'],
    answer: 'A',
    explanation:
      'Aquaporin là kênh prôtêin chuyên cho nước đi qua với tốc độ rất cao mà không tốn năng lượng. Nước cũng khuếch tán trực tiếp qua lớp kép phôtpholipit nhưng chậm hơn nhiều.',
    traps: { B: 'Bơm natri kali vận chuyển ion và tiêu tốn ATP, không phải kênh nước.' },
    skills: ['vận chuyển qua màng'],
  },
  {
    id: 's.bio.82',
    topicId: 'science.biology.cell',
    difficulty: 2,
    stem: 'Đơn phân cấu tạo nên prôtêin là gì?',
    choices: ['Axit amin', 'Nuclêôtit', 'Glucôzơ', 'Axit béo'],
    answer: 'A',
    explanation:
      'Prôtêin là chuỗi các axit amin nối với nhau bằng liên kết peptit. Nuclêôtit là đơn phân của axit nuclêic, còn glucôzơ là đơn phân của nhiều loại cacbohiđrat.',
    skills: ['cấu trúc prôtêin'],
  },
  {
    id: 's.bio.83',
    topicId: 'science.biology.cell',
    difficulty: 3,
    stem: 'Bào quan nào chịu trách nhiệm đóng gói và phân phối sản phẩm của tế bào?',
    choices: ['Bộ máy Gôngi', 'Lizôxôm', 'Không bào', 'Trung thể'],
    answer: 'A',
    explanation:
      'Bộ máy Gôngi nhận sản phẩm từ lưới nội chất, hoàn thiện, đóng gói vào túi tiết rồi gửi tới đích. Lizôxôm phân giải, còn trung thể tham gia hình thành thoi phân bào.',
    skills: ['cấu trúc tế bào', 'chức năng bào quan'],
  },
  {
    id: 's.bio.84',
    topicId: 'science.biology.cell',
    difficulty: 3,
    stem: 'Đặt tế bào hồng cầu vào dung dịch nhược trương thì hiện tượng gì xảy ra?',
    choices: [
      'Tế bào trương lên và có thể vỡ vì không có thành tế bào',
      'Tế bào co nguyên sinh',
      'Tế bào không thay đổi',
      'Tế bào phân chia nhanh hơn',
    ],
    answer: 'A',
    explanation:
      'Dung dịch nhược trương có thế nước cao hơn nên nước đi vào tế bào. Hồng cầu là tế bào động vật, không có thành xenlulôzơ giữ hình dạng, nên trương lên và có thể vỡ.',
    traps: { B: 'Co nguyên sinh xảy ra ở dung dịch ưu trương và ở tế bào thực vật.' },
    skills: ['thẩm thấu', 'so sánh tế bào động vật và thực vật'],
  },
  {
    id: 's.bio.85',
    topicId: 'science.biology.cell',
    difficulty: 4,
    stem: 'Vì sao tế bào có kích thước nhỏ lại trao đổi chất hiệu quả hơn tế bào lớn?',
    choices: [
      'Vì tỉ lệ diện tích bề mặt trên thể tích lớn hơn',
      'Vì có nhiều ti thể hơn',
      'Vì màng sinh chất dày hơn',
      'Vì nhân điều khiển nhanh hơn',
    ],
    answer: 'A',
    explanation:
      'Vật chất ra vào tế bào qua bề mặt, còn nhu cầu trao đổi tỉ lệ với thể tích. Khi kích thước tăng, thể tích tăng theo lũy thừa ba còn diện tích chỉ tăng theo lũy thừa hai, nên tế bào lớn có ít bề mặt trên mỗi đơn vị thể tích và trao đổi kém hiệu quả hơn.',
    skills: ['tỉ lệ diện tích thể tích'],
  },
  {
    id: 's.bio.86',
    topicId: 'science.biology.genetics',
    difficulty: 2,
    stem: 'Quá trình dịch mã diễn ra ở đâu trong tế bào?',
    choices: ['Ribôxôm', 'Nhân tế bào', 'Ti thể', 'Bộ máy Gôngi'],
    answer: 'A',
    explanation:
      'Ribôxôm đọc trình tự bộ ba trên mARN và nối các axit amin thành chuỗi pôlipeptit. Phiên mã mới là quá trình diễn ra trong nhân.',
    traps: { B: 'Trong nhân diễn ra nhân đôi ADN và phiên mã, không phải dịch mã.' },
    skills: ['dịch mã'],
  },
  {
    id: 's.bio.87',
    topicId: 'science.biology.genetics',
    difficulty: 3,
    stem: 'Một đoạn mạch gốc của gen có trình tự 3′-TAX-GGX-ATA-5′. Trình tự mARN tương ứng là gì?',
    choices: ['5′-AUG-XXG-UAU-3′', '5′-ATG-XXG-TAT-3′', '5′-UAX-GGX-AUA-3′', '5′-AUG-GGX-AUA-3′'],
    answer: 'A',
    explanation:
      'mARN được tổng hợp bổ sung với mạch gốc, trong đó A của mạch gốc ghép với U (không phải T). Bổ sung từng bộ ba: TAX cho AUG, GGX cho XXG, ATA cho UAU.',
    traps: {
      B: 'Dùng T thay cho U — mARN không có bazơ T.',
      C: 'Sao chép nguyên mạch gốc thay vì lấy bổ sung.',
    },
    skills: ['phiên mã', 'nguyên tắc bổ sung'],
  },
  {
    id: 's.bio.88',
    topicId: 'science.biology.genetics',
    difficulty: 3,
    stem: 'Thể đột biến nào có bộ nhiễm sắc thể là 2n + 1?',
    choices: ['Thể ba', 'Thể một', 'Thể tam bội', 'Thể tứ bội'],
    answer: 'A',
    explanation:
      'Thể ba có thêm một nhiễm sắc thể ở một cặp nào đó, ký hiệu 2n + 1. Thể một là 2n − 1, còn thể tam bội và tứ bội là đột biến đa bội với bộ 3n và 4n.',
    skills: ['đột biến số lượng nhiễm sắc thể'],
  },
  {
    id: 's.bio.89',
    topicId: 'science.biology.genetics',
    difficulty: 4,
    stem: 'Ở một loài thực vật, cho cây hoa đỏ thuần chủng lai với cây hoa trắng thuần chủng được F₁ toàn hoa hồng. Cho F₁ tự thụ phấn thì F₂ có tỉ lệ kiểu hình như thế nào?',
    choices: ['1 đỏ : 2 hồng : 1 trắng', '3 đỏ : 1 trắng', '1 đỏ : 1 trắng', '100% hồng'],
    answer: 'A',
    explanation:
      'F₁ mang kiểu hình trung gian nên đây là trội không hoàn toàn: kiểu gen dị hợp cho màu hồng. F₁ Aa tự thụ cho 1AA : 2Aa : 1aa, và vì mỗi kiểu gen cho một kiểu hình riêng nên tỉ lệ kiểu hình cũng là 1 : 2 : 1.',
    traps: { B: 'Tỉ lệ 3 : 1 chỉ đúng khi trội hoàn toàn, khi đó F₁ đã phải toàn hoa đỏ.' },
    skills: ['trội không hoàn toàn'],
  },
  {
    id: 's.bio.90',
    topicId: 'science.biology.genetics',
    difficulty: 4,
    stem: 'Vì sao đột biến gen lặn thường khó bị phát hiện ngay trong quần thể?',
    choices: [
      'Vì ở trạng thái dị hợp nó bị alen trội át đi nên không biểu hiện ra kiểu hình',
      'Vì nó không di truyền được cho đời sau',
      'Vì nó tự sửa chữa sau vài thế hệ',
      'Vì nó chỉ xảy ra ở tế bào sinh dưỡng',
    ],
    answer: 'A',
    explanation:
      'Alen lặn chỉ biểu hiện khi ở trạng thái đồng hợp. Trong quần thể lớn, xác suất hai thể dị hợp gặp nhau ban đầu rất thấp, nên alen lặn có thể tồn tại ẩn qua nhiều thế hệ trước khi lộ ra.',
    traps: { B: 'Đột biến gen ở tế bào sinh dục hoàn toàn di truyền được.' },
    skills: ['đột biến gen', 'biểu hiện kiểu hình'],
  },
  {
    id: 's.bio.91',
    topicId: 'science.biology.organism',
    difficulty: 2,
    stem: 'Ở thực vật, mạch rây có chức năng gì?',
    choices: [
      'Vận chuyển chất hữu cơ từ lá tới các cơ quan khác',
      'Vận chuyển nước từ rễ lên lá',
      'Hấp thụ khoáng từ đất',
      'Thực hiện quang hợp',
    ],
    answer: 'A',
    explanation:
      'Mạch rây vận chuyển sản phẩm quang hợp theo cả hai chiều tới nơi sử dụng hoặc dự trữ. Mạch gỗ mới là mạch dẫn nước và khoáng đi lên theo một chiều.',
    traps: { B: 'Đó là chức năng của mạch gỗ.' },
    skills: ['mạch dẫn ở thực vật'],
  },
  {
    id: 's.bio.92',
    topicId: 'science.biology.organism',
    difficulty: 3,
    stem: 'Hệ tuần hoàn hở có đặc điểm nào sau đây?',
    choices: [
      'Máu có đoạn đi ra khỏi mạch, trộn với dịch mô rồi mới về tim',
      'Máu luôn chảy trong hệ mạch kín',
      'Máu chảy với áp lực rất cao',
      'Chỉ có ở động vật có xương sống',
    ],
    answer: 'A',
    explanation:
      'Trong hệ tuần hoàn hở, máu được bơm vào xoang cơ thể và tiếp xúc trực tiếp với tế bào, nên áp lực thấp và tốc độ chậm. Hệ này gặp ở đa số thân mềm và chân khớp.',
    traps: { D: 'Động vật có xương sống đều có hệ tuần hoàn kín.' },
    skills: ['hệ tuần hoàn'],
  },
  {
    id: 's.bio.93',
    topicId: 'science.biology.organism',
    difficulty: 3,
    stem: 'Hình thức sinh sản nào tạo ra đời con giống hệt cơ thể mẹ về mặt di truyền?',
    choices: ['Sinh sản vô tính', 'Sinh sản hữu tính', 'Thụ tinh chéo', 'Giao phấn'],
    answer: 'A',
    explanation:
      'Sinh sản vô tính dựa trên nguyên phân nên không có sự tổ hợp lại vật chất di truyền, đời con là bản sao di truyền của mẹ. Sinh sản hữu tính có giảm phân và thụ tinh nên tạo biến dị tổ hợp.',
    skills: ['sinh sản'],
  },
  {
    id: 's.bio.94',
    topicId: 'science.biology.organism',
    difficulty: 4,
    stem: 'Vì sao trong một quần xã, loài ưu thế lại có vai trò quan trọng đặc biệt?',
    choices: [
      'Vì số lượng và sinh khối lớn nên nó chi phối mạnh các loài khác và điều kiện môi trường',
      'Vì nó có kích thước cơ thể lớn nhất',
      'Vì nó xuất hiện sớm nhất trong quần xã',
      'Vì nó không có kẻ thù tự nhiên',
    ],
    answer: 'A',
    explanation:
      'Loài ưu thế có số lượng cá thể đông và sinh khối lớn, nên nó quyết định cấu trúc và điều kiện sống của cả quần xã. Ví dụ rõ nhất là cây gỗ ưu thế trong rừng, chi phối ánh sáng và độ ẩm cho mọi loài bên dưới.',
    traps: { B: 'Kích thước cơ thể không quyết định; loài ưu thế có thể rất nhỏ nhưng đông.' },
    skills: ['quần xã', 'loài ưu thế'],
  },
  {
    id: 's.bio.95',
    topicId: 'science.biology.organism',
    difficulty: 4,
    stem: 'Diễn thế sinh thái nguyên sinh khác diễn thế thứ sinh ở điểm nào?',
    choices: [
      'Nguyên sinh khởi đầu từ môi trường chưa từng có sinh vật, thứ sinh khởi đầu từ nơi đã từng có quần xã',
      'Nguyên sinh diễn ra nhanh hơn thứ sinh',
      'Thứ sinh luôn kết thúc bằng quần xã đỉnh cực',
      'Nguyên sinh chỉ xảy ra dưới nước',
    ],
    answer: 'A',
    explanation:
      'Điểm phân biệt duy nhất là điểm xuất phát. Diễn thế nguyên sinh bắt đầu trên nền chưa có sự sống như đảo núi lửa mới hình thành, nên rất chậm; diễn thế thứ sinh bắt đầu ở nơi quần xã cũ bị hủy nhưng nền đất và mầm sống vẫn còn, nên nhanh hơn.',
    traps: { B: 'Ngược lại, nguyên sinh chậm hơn vì phải hình thành đất từ đầu.' },
    skills: ['diễn thế sinh thái'],
  },
  {
    id: 's.bio.96',
    topicId: 'science.biology.organism',
    difficulty: 3,
    stem: 'Nhân tố sinh thái nào sau đây là nhân tố hữu sinh?',
    choices: ['Sinh vật cạnh tranh cùng nguồn thức ăn', 'Nhiệt độ không khí', 'Độ ẩm đất', 'Cường độ ánh sáng'],
    answer: 'A',
    explanation:
      'Nhân tố hữu sinh là các sinh vật và mối quan hệ giữa chúng. Nhiệt độ, độ ẩm và ánh sáng đều là nhân tố vô sinh thuộc về môi trường vật lý.',
    skills: ['nhân tố sinh thái'],
  },
];

export const BIOLOGY_QUESTIONS_2 = buildQuestions('science', 'biology', drafts);
