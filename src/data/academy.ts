import type { TrackId } from '@/types';
import type { SheetType } from '@/data/sheets';

/**
 * HỌC VIỆN MATH365 — bộ tài liệu vận hành lớp học.
 *
 * Đây là phần “A · Academy” của mô thức GITA được viết thành công cụ dùng được:
 * giáo án theo khung thời gian thật, nước đi sư phạm có tên gọi, kịch bản nhận xét
 * theo từng tình huống, nghi thức mở – đóng buổi, và bảng dự giờ để chuẩn hoá
 * chất lượng giữa các giáo viên.
 */

/* ============================================================
   1. GIÁO ÁN THEO KHUNG BUỔI DẠY
   ============================================================ */

export interface LessonBlock {
  minutes: number;
  name: string;
  purpose: string;
  /** Giáo viên làm gì — viết bằng động từ, kiểm chứng được. */
  teacher: string[];
  /** Học sinh làm gì trong cùng khoảng thời gian đó. */
  student: string[];
  /** Dấu hiệu quan sát được cho biết khối này đã đạt. */
  success: string;
  /** Lỗi giáo viên hay mắc ở khối này. */
  pitfall: string;
}

export interface LessonPlan {
  id: string;
  name: string;
  minutes: number;
  /** Loại phiếu mà buổi này xoay quanh. */
  sheetTypes: SheetType[];
  tracks: TrackId[];
  goal: string;
  /** Chuẩn bị trước buổi — làm xong trước khi bước vào lớp. */
  prepare: string[];
  blocks: LessonBlock[];
  /** Việc giao về nhà, gắn với hệ thống. */
  homework: string[];
  /** Cách đo buổi dạy có hiệu quả hay không. */
  evidence: string[];
}

export const LESSON_PLANS: LessonPlan[] = [
  {
    id: 'lp-90-kien-thuc-moi',
    name: 'Buổi kiến thức mới · 90 phút',
    minutes: 90,
    sheetTypes: ['ly-thuyet', 'dang-bai'],
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
    goal:
      'Học sinh nắm được lý thuyết nền của một chuyên đề và đọc vị được các dạng bài chính của chuyên đề đó — chưa cần giải nhanh, nhưng phải nhìn đề là gọi được tên dạng.',
    prepare: [
      'Mở bảng tiến độ lớp, ghi ra ba học sinh có KPI thấp nhất ở chuyên đề tiền đề — sẽ gọi các em này trước ở phần khởi động.',
      'In sẵn phiếu LT và phiếu DB của chuyên đề, kèm phiếu HD hướng dẫn ôn chắc.',
      'Chuẩn bị đúng hai ví dụ mẫu: một ví dụ chuẩn và một ví dụ chứa bẫy điển hình.',
      'Viết sẵn câu mục tiêu của buổi lên góc bảng, để nguyên suốt buổi.',
    ],
    blocks: [
      {
        minutes: 8,
        name: 'Mở buổi — nối lại mạch',
        purpose: 'Kích hoạt kiến thức tiền đề và cho học sinh biết hôm nay đi đâu.',
        teacher: [
          'Viết câu mục tiêu của buổi lên bảng và đọc to một lần.',
          'Đặt 3 câu hỏi nhanh về chuyên đề tiền đề, gọi đúng ba em đã ghi ra từ trước.',
          'Không giảng lại phần cũ — chỉ kiểm tra và ghi nhận chỗ hổng.',
        ],
        student: ['Trả lời nhanh, được sai.', 'Ghi câu mục tiêu vào đầu trang vở.'],
        success: 'Mọi học sinh viết được câu mục tiêu của buổi vào vở trong 8 phút đầu.',
        pitfall: 'Sa vào giảng lại bài cũ và mất 25 phút — khối này tối đa 8 phút, hết giờ là chuyển.',
      },
      {
        minutes: 22,
        name: 'Lý thuyết nền — dạy tối thiểu',
        purpose: 'Trao đúng lượng lý thuyết tối thiểu đủ để làm bài, không nhiều hơn.',
        teacher: [
          'Trình bày công thức và điều kiện áp dụng, mỗi công thức kèm một câu “dùng khi nào”.',
          'Dừng lại sau mỗi công thức, hỏi cả lớp “điều kiện là gì” trước khi đi tiếp.',
          'Chỉ dùng phiếu LT làm khung — không thêm nội dung ngoài phiếu.',
        ],
        student: ['Chép công thức kèm điều kiện.', 'Trả lời câu hỏi chốt sau mỗi công thức.'],
        success: 'Học sinh nêu lại được điều kiện áp dụng của từng công thức mà không nhìn vở.',
        pitfall: 'Dạy hết mọi biến thể ngay từ buổi đầu. Biến thể để dành cho buổi Nâng cao.',
      },
      {
        minutes: 25,
        name: 'Đọc vị dạng bài — nhìn đề gọi tên',
        purpose: 'Chuyển từ biết công thức sang biết khi nào dùng công thức nào.',
        teacher: [
          'Chiếu lần lượt 6 đề, mỗi đề cho 30 giây, chỉ hỏi “dạng gì, đi hướng nào” — không cho giải.',
          'Sau mỗi đề, gọi một học sinh nêu dấu hiệu nhận dạng bằng lời của chính em.',
          'Ghi bảng thành hai cột: dấu hiệu trong đề | hướng đi.',
        ],
        student: ['Nói tên dạng và một dấu hiệu.', 'Chép bảng hai cột vào vở.'],
        success: 'Bảng hai cột trên bảng có đủ số dòng bằng số dạng của chuyên đề.',
        pitfall:
          'Cho học sinh giải luôn thay vì chỉ đọc vị. Giải mất 10 phút một bài, đọc vị mất 30 giây — mục tiêu của khối này là đọc vị.',
      },
      {
        minutes: 20,
        name: 'Luyện có kiểm soát',
        purpose: 'Học sinh tự làm, giáo viên đi quan sát và can thiệp đúng chỗ.',
        teacher: [
          'Giao phần I và phần II của phiếu DB, tính giờ.',
          'Đi quanh lớp, không giải hộ; chỉ hỏi ngược “em đang mắc ở bước nào”.',
          'Ghi lại 3 lỗi phổ biến nhất quan sát được để chữa chung.',
        ],
        student: ['Làm bài độc lập trong im lặng.', 'Giơ tay khi bí quá 2 phút.'],
        success: 'Ít nhất 70% học sinh làm xong phần I trong thời gian quy định.',
        pitfall: 'Đứng một chỗ hoặc ngồi bàn giáo viên. Giá trị của khối này nằm ở việc đi quan sát.',
      },
      {
        minutes: 12,
        name: 'Chữa lỗi chung',
        purpose: 'Chữa đúng ba lỗi phổ biến nhất, không chữa từng bài.',
        teacher: [
          'Trình bày ba lỗi đã ghi lại, mỗi lỗi kèm nguyên nhân và cách phòng.',
          'Với mỗi lỗi, hỏi cả lớp “dấu hiệu nào cho biết em sắp mắc lỗi này”.',
        ],
        student: ['Ghi ba lỗi vào ô ghi chú lỗi ở cuối phiếu.'],
        success: 'Ô ghi chú lỗi trong phiếu của học sinh có đủ ba dòng.',
        pitfall: 'Chữa lần lượt từng câu của phiếu — hết giờ mà không ai nhớ được gì.',
      },
      {
        minutes: 3,
        name: 'Đóng buổi — chốt và giao',
        purpose: 'Chốt lại mục tiêu và giao việc gắn với hệ thống.',
        teacher: [
          'Chỉ vào câu mục tiêu đầu buổi, hỏi “ai làm được rồi”.',
          'Giao nhiệm vụ trên hệ thống kèm hạn nộp cụ thể.',
        ],
        student: ['Ghi việc về nhà kèm hạn.'],
        success: 'Mọi học sinh nói được nhiệm vụ về nhà và hạn nộp mà không cần hỏi lại.',
        pitfall: 'Hết giờ mới nhớ ra giao bài, nói vội trong tiếng dọn cặp.',
      },
    ],
    homework: [
      'Hoàn thành phiếu KN (Kỹ năng & Phương pháp) của chuyên đề trên hệ thống, hạn 2 ngày.',
      'Đọc phiếu HD (Hướng dẫn ôn chắc) của chuyên đề, đánh dấu ba mục chưa chắc.',
      'Ghi ba lỗi đã chữa trên lớp vào sổ lỗi cá nhân kèm mã phiếu.',
    ],
    evidence: [
      'KPI trung bình phiếu DB của lớp ≥ 75% ngay trong buổi.',
      'Tỉ lệ nộp bài về nhà đúng hạn ≥ 90%.',
      'Ba lỗi đã chữa không xuất hiện lại ở phiếu KN — kiểm tra qua ngân hàng lỗi của lớp.',
    ],
  },
  {
    id: 'lp-120-luyen-nang-cao',
    name: 'Buổi luyện nâng cao · 120 phút',
    minutes: 120,
    sheetTypes: ['ky-nang', 'nang-cao'],
    tracks: ['chuyen', 'thpt-qg'],
    goal:
      'Nâng học sinh lên một bậc độ khó: từ làm được dạng chuẩn sang xử lí được biến thể lạ, và trình bày chặt theo barem.',
    prepare: [
      'Chấm trước phiếu KN của cả lớp, xếp học sinh thành ba nhóm theo KPI: dưới 70, 70–89, từ 90.',
      'Chuẩn bị ba bộ bài khác nhau cho ba nhóm — cùng chuyên đề, khác mức độ.',
      'Chọn sẵn một bài “bổ đề” sẽ dạy riêng, là chìa khoá của cả nhóm bài hôm nay.',
      'In barem chấm của một bài tự luận để làm mẫu trình bày.',
    ],
    blocks: [
      {
        minutes: 10,
        name: 'Trả bài và công bố nhóm',
        purpose: 'Cho học sinh biết mình đang ở đâu và hôm nay làm gì.',
        teacher: [
          'Công bố phổ điểm của lớp, không đọc tên từng em.',
          'Chia nhóm theo mức độ, giải thích rằng nhóm sẽ đổi theo từng buổi.',
        ],
        student: ['Nhận phiếu đã chấm, đọc lời phê.'],
        success: 'Học sinh về đúng nhóm trong 2 phút, không thắc mắc về việc chia nhóm.',
        pitfall: 'Đọc tên và điểm từng em trước lớp — làm hỏng động lực của nhóm dưới.',
      },
      {
        minutes: 20,
        name: 'Dạy một bổ đề',
        purpose: 'Trao đúng một công cụ mới, đủ mạnh để mở khoá cả nhóm bài hôm nay.',
        teacher: [
          'Phát biểu bổ đề, chứng minh đầy đủ một lần.',
          'Chỉ ra hai dấu hiệu trong đề cho biết phải dùng bổ đề này.',
          'Làm một ví dụ áp dụng ngắn.',
        ],
        student: ['Chép bổ đề vào sổ bổ đề riêng.', 'Nêu lại hai dấu hiệu bằng lời.'],
        success: 'Học sinh nêu lại được bổ đề và hai dấu hiệu mà không nhìn vở.',
        pitfall:
          'Dạy ba bổ đề trong một buổi. Một buổi một bổ đề, nhưng phải chắc tới mức thành phản xạ.',
      },
      {
        minutes: 40,
        name: 'Luyện phân nhóm',
        purpose: 'Mỗi học sinh làm bài ở đúng mức khó của mình.',
        teacher: [
          'Giao ba bộ bài cho ba nhóm, tính giờ chung.',
          'Ưu tiên ngồi cùng nhóm dưới 70 trong 20 phút đầu.',
          'Với nhóm từ 90, chỉ can thiệp khi được hỏi; giao thêm bài mở rộng nếu xong sớm.',
        ],
        student: ['Làm bài độc lập.', 'Ghi lại bước bị tắc thay vì bỏ trắng.'],
        success: 'Không có học sinh nào ngồi không quá 3 phút liên tiếp.',
        pitfall:
          'Giao cùng một bộ bài cho cả lớp: nhóm trên chán, nhóm dưới nản. Phân nhóm là điểm khác biệt của buổi này.',
      },
      {
        minutes: 25,
        name: 'Chữa theo tầng',
        purpose: 'Chữa sao cho cả ba nhóm đều học được điều mới.',
        teacher: [
          'Chữa bài của nhóm giữa trước — đó là bài mà cả ba nhóm đều theo được.',
          'Với nhóm trên: hỏi cách giải thứ hai, hoặc hỏi “bài này tổng quát hoá thế nào”.',
          'Với nhóm dưới: chỉ chốt lại quy trình ba bước, không mở rộng.',
        ],
        student: ['Đối chiếu bài mình với lời giải chuẩn.', 'Đánh dấu bước đầu tiên mình không tự nghĩ ra.'],
        success: 'Mỗi học sinh chỉ ra được bước đầu tiên mình không tự nghĩ ra được.',
        pitfall: 'Chữa bài khó nhất trước — nhóm dưới mất kết nối ngay từ phút đầu.',
      },
      {
        minutes: 20,
        name: 'Trình bày theo barem',
        purpose: 'Biến lời giải đúng thành bài làm được điểm tối đa.',
        teacher: [
          'Chiếu một bài làm thật (ẩn tên), chấm trực tiếp theo barem trước lớp.',
          'Chỉ rõ từng mốc 0,25đ gắn với hành động nào trên bài làm.',
          'Cho học sinh tự chấm chéo một bài theo barem đó.',
        ],
        student: ['Chấm chéo bài của bạn theo barem.', 'Ghi lại hai mốc điểm mình hay bị mất.'],
        success: 'Điểm học sinh tự chấm lệch không quá 0,5đ so với giáo viên chấm.',
        pitfall: 'Nói chung chung “phải trình bày cẩn thận” mà không chỉ ra mốc điểm cụ thể.',
      },
      {
        minutes: 5,
        name: 'Đóng buổi',
        purpose: 'Chốt bổ đề và giao việc.',
        teacher: ['Hỏi lại bổ đề đã dạy đầu buổi.', 'Giao phiếu NC trên hệ thống kèm hạn.'],
        student: ['Nhắc lại bổ đề.', 'Ghi việc về nhà.'],
        success: 'Ít nhất năm học sinh phát biểu lại đúng bổ đề.',
        pitfall: 'Bỏ qua bước hỏi lại — bổ đề học buổi này sẽ bay mất trước buổi sau.',
      },
    ],
    homework: [
      'Hoàn thành phiếu NC (Luyện nâng cao) trên hệ thống, hạn 3 ngày.',
      'Chép bổ đề vào sổ bổ đề, kèm hai dấu hiệu nhận biết và một bài áp dụng tự tìm.',
      'Làm lại đúng bài đã tắc trên lớp, trình bày đầy đủ theo barem.',
    ],
    evidence: [
      'KPI phiếu NC của nhóm giữa tăng ít nhất 10 điểm phần trăm so với phiếu KN.',
      'Số học sinh chấm chéo lệch quá 0,5đ giảm dần qua các buổi.',
      'Bổ đề được ít nhất một học sinh chủ động dùng lại ở buổi kế tiếp.',
    ],
  },
  {
    id: 'lp-150-thi-thu',
    name: 'Buổi thi thử và chữa đề · 150 phút',
    minutes: 150,
    sheetTypes: ['on-thi', 'thi'],
    tracks: ['thpt', 'chuyen', 'thpt-qg'],
    goal:
      'Mô phỏng đúng áp lực phòng thi, rồi biến kết quả thành một danh sách việc cụ thể cho hai tuần tới.',
    prepare: [
      'Chọn một đề mẫu trọn vẹn đúng cấu trúc kỳ thi mục tiêu của lớp.',
      'In đủ đề và giấy làm bài; chuẩn bị đồng hồ đếm ngược chiếu lên bảng.',
      'In sẵn barem để phát ngay sau khi thu bài.',
      'Chuẩn bị bảng theo dõi thời gian từng bài để hướng dẫn chiến thuật phân bổ.',
    ],
    blocks: [
      {
        minutes: 5,
        name: 'Phổ biến quy chế',
        purpose: 'Tạo đúng điều kiện của phòng thi thật.',
        teacher: [
          'Nêu thời gian, quy định về máy tính và giấy nháp.',
          'Nhắc chiến thuật phân bổ thời gian đã học, không nhắc nội dung.',
        ],
        student: ['Cất tài liệu, chuẩn bị dụng cụ.'],
        success: 'Lớp im lặng và bắt đầu đúng giờ.',
        pitfall: 'Gợi ý nội dung đề — làm hỏng toàn bộ giá trị chẩn đoán của buổi thi thử.',
      },
      {
        minutes: 90,
        name: 'Làm bài',
        purpose: 'Đo năng lực thật trong điều kiện thật.',
        teacher: [
          'Không giải thích đề, không gợi ý.',
          'Ghi lại thời điểm từng học sinh chuyển sang bài hình — dữ liệu này rất giá trị khi chữa.',
          'Nhắc mốc thời gian ở phút 30, 60 và 80.',
        ],
        student: ['Làm bài như thi thật.', 'Ghi giờ bắt đầu mỗi bài ra lề giấy nháp.'],
        success: 'Không có học sinh nào nộp bài sớm hơn 15 phút trước giờ.',
        pitfall: 'Đi lại nhiều và nhìn bài học sinh — làm tăng áp lực không cần thiết.',
      },
      {
        minutes: 10,
        name: 'Tự chấm nóng',
        purpose: 'Học sinh nhìn thấy kết quả khi trí nhớ về bài làm còn nguyên vẹn.',
        teacher: ['Phát barem, hướng dẫn tự chấm từng mốc 0,25đ.'],
        student: ['Tự chấm bài của mình.', 'Khoanh tròn mốc điểm bị mất.'],
        success: 'Mọi học sinh có một con số điểm và một danh sách mốc điểm đã mất.',
        pitfall: 'Thu bài rồi chấm về nhà, trả sau ba ngày — mất phần lớn giá trị học tập.',
      },
      {
        minutes: 35,
        name: 'Chữa theo mốc mất điểm',
        purpose: 'Chữa đúng chỗ cả lớp mất điểm nhiều nhất, không chữa tuần tự từ bài 1.',
        teacher: [
          'Thống kê nhanh trên bảng: mốc điểm nào nhiều người mất nhất.',
          'Chữa theo thứ tự đó, bắt đầu từ mốc mất nhiều nhất.',
          'Với mỗi mốc, phân loại nguyên nhân: không biết hướng, sai tính toán, thiếu trường hợp, trình bày, hết giờ.',
        ],
        student: ['Ghi nguyên nhân mất điểm của mình vào đúng năm nhóm.'],
        success: 'Mỗi học sinh phân loại được mọi điểm mất của mình vào năm nhóm nguyên nhân.',
        pitfall:
          'Chữa lần lượt từ Bài I đến Bài V. Bài I thường ít người sai — chữa nó là lãng phí thời gian quý nhất của buổi.',
      },
      {
        minutes: 10,
        name: 'Chiến thuật phòng thi',
        purpose: 'Sửa lỗi phân bổ thời gian, thứ nguyên nhân mất điểm nhiều nhất ở học sinh khá.',
        teacher: [
          'Đối chiếu bảng thời gian thực tế với kế hoạch chuẩn của đề.',
          'Chỉ ra học sinh nào sa lầy ở đâu, đề xuất mốc bỏ qua.',
        ],
        student: ['So thời gian thực tế của mình với kế hoạch chuẩn.'],
        success: 'Mỗi học sinh có một mốc cụ thể để cải thiện ở đề sau.',
        pitfall: 'Bỏ hẳn khối này vì hết giờ — đây thường là khối tạo ra nhiều điểm nhất.',
      },
    ],
    homework: [
      'Làm lại toàn bộ những bài đã mất điểm, trình bày đầy đủ theo barem, nộp sau 2 ngày.',
      'Ghi mọi câu sai vào ngân hàng lỗi trên hệ thống, kèm nguyên nhân theo năm nhóm.',
      'Làm phiếu OT của chuyên đề mất điểm nhiều nhất.',
    ],
    evidence: [
      'Điểm học sinh tự chấm lệch không quá 0,5đ so với giáo viên chấm lại.',
      'Ở đề thi thử kế tiếp, số mốc điểm mất vì lí do trình bày giảm ít nhất một nửa.',
      'Thời gian dành cho bài hình tiệm cận kế hoạch chuẩn của đề.',
    ],
  },
];

/* ============================================================
   2. NƯỚC ĐI SƯ PHẠM
   ============================================================ */

export interface TeachingMove {
  name: string;
  when: string;
  how: string[];
  why: string;
  avoid: string;
}

export const TEACHING_MOVES: TeachingMove[] = [
  {
    name: 'Gọi ngẫu nhiên có chuẩn bị',
    when: 'Kiểm tra hiểu bài giữa buổi, khi lớp im lặng và không ai giơ tay.',
    how: [
      'Đặt câu hỏi trước, chờ đủ 5 giây, rồi mới gọi tên.',
      'Gọi cả học sinh chưa giơ tay, nhưng đã báo trước từ đầu buổi rằng “ai cũng có thể được gọi”.',
      'Nếu em không trả lời được, hỏi tiếp một câu dễ hơn thay vì chuyển sang em khác ngay.',
    ],
    why: 'Chờ 5 giây trước khi gọi làm tăng đáng kể số học sinh thực sự suy nghĩ, thay vì chỉ vài em nhanh miệng.',
    avoid: 'Gọi tên trước rồi mới đọc câu hỏi — cả lớp còn lại lập tức ngừng suy nghĩ.',
  },
  {
    name: 'Nghĩ – bắt cặp – chia sẻ',
    when: 'Câu hỏi mở, cần nhiều học sinh cùng tham gia.',
    how: [
      'Cho 1 phút suy nghĩ cá nhân, im lặng tuyệt đối.',
      'Cho 2 phút trao đổi theo cặp.',
      'Gọi 2–3 cặp trình bày, ưu tiên cặp có ý khác nhau.',
    ],
    why: 'Học sinh yếu dám nói sau khi đã thử với bạn; học sinh khá phải diễn đạt lại nên hiểu sâu hơn.',
    avoid: 'Bỏ bước suy nghĩ cá nhân — khi đó chỉ em khá trong cặp nói, em yếu ngồi nghe.',
  },
  {
    name: 'Chấm nóng tại chỗ',
    when: 'Ngay sau khi học sinh làm xong một phần bài.',
    how: [
      'Phát barem, để học sinh tự chấm trước.',
      'Chấm mẫu một bài trước lớp theo đúng từng mốc 0,25đ.',
      'Cho chấm chéo rồi đối chiếu.',
    ],
    why: 'Học sinh chỉ hiểu barem khi tự cầm bút chấm. Đây là cách nhanh nhất để giảm lỗi trình bày.',
    avoid: 'Chấm hộ toàn bộ rồi trả bài sau vài ngày.',
  },
  {
    name: 'Hỏi ngược khi học sinh bí',
    when: 'Học sinh giơ tay xin gợi ý.',
    how: [
      'Hỏi “em đang mắc ở bước nào” thay vì xem bài rồi giải thích.',
      'Hỏi tiếp “dạng bài này em đã gặp ở đâu chưa”.',
      'Chỉ trao đúng một manh mối nhỏ nhất đủ để em đi tiếp.',
    ],
    why: 'Giải hộ tạo cảm giác hiểu bài giả. Học sinh chỉ nhớ được bước mà tự mình nghĩ ra.',
    avoid: 'Cầm bút viết vào vở của học sinh.',
  },
  {
    name: 'Dùng lỗi làm tài liệu dạy',
    when: 'Sau khi quan sát thấy ba lỗi lặp lại trong lớp.',
    how: [
      'Chép nguyên lời giải sai lên bảng, không nêu tên ai.',
      'Hỏi cả lớp “dòng nào sai đầu tiên”.',
      'Truy nguyên nhân, rồi hỏi “dấu hiệu nào cho biết sắp mắc lỗi này”.',
    ],
    why: 'Học sinh nhớ lỗi đã tự phát hiện lâu hơn nhiều so với lời cảnh báo của giáo viên.',
    avoid: 'Nêu tên người mắc lỗi — lần sau không ai dám nộp bài chưa hoàn hảo.',
  },
  {
    name: 'Đọc vị không giải',
    when: 'Đầu chuỗi bài mới, hoặc trước buổi thi thử.',
    how: [
      'Chiếu liên tiếp 6–8 đề, mỗi đề 30 giây.',
      'Chỉ hỏi hai câu: dạng gì, hướng đi nào.',
      'Cấm tuyệt đối việc bấm máy hay giải.',
    ],
    why: 'Trong phòng thi, việc chọn đúng hướng trong 30 giây đầu quyết định phần lớn kết quả.',
    avoid: 'Cho học sinh giải hết một bài rồi mới sang bài sau — chỉ kịp làm 2 bài trong 25 phút.',
  },
  {
    name: 'Bảng hai cột dấu hiệu – hướng đi',
    when: 'Bất cứ khi nào dạy nhận dạng.',
    how: [
      'Chia bảng làm hai cột: “thấy gì trong đề” và “thì làm gì”.',
      'Mỗi dạng bài là một dòng, do học sinh phát biểu.',
      'Chụp lại bảng và gửi vào nhóm lớp cuối buổi.',
    ],
    why: 'Bảng này chính là bản đồ tư duy để tra cứu khi làm đề — có giá trị hơn nhiều so với vở ghi tuyến tính.',
    avoid: 'Giáo viên tự viết cả bảng. Giá trị nằm ở việc học sinh tự diễn đạt dấu hiệu.',
  },
  {
    name: 'Phân nhóm động theo KPI',
    when: 'Buổi luyện tập, khi phổ điểm lớp giãn rộng.',
    how: [
      'Chia ba nhóm theo KPI phiếu gần nhất, công bố tiêu chí rõ ràng.',
      'Giao ba bộ bài khác mức độ, cùng chuyên đề.',
      'Nói rõ nhóm sẽ đổi mỗi buổi theo dữ liệu mới.',
    ],
    why: 'Cùng một bộ bài cho cả lớp thì nhóm trên chán và nhóm dưới nản; cả hai đều không tiến.',
    avoid: 'Cố định nhóm cả khoá — biến việc phân nhóm thành cái nhãn dán lên học sinh.',
  },
  {
    name: 'Chốt bằng câu mục tiêu',
    when: 'Ba phút cuối mỗi buổi.',
    how: [
      'Chỉ vào câu mục tiêu viết ở đầu buổi.',
      'Hỏi “ai làm được rồi”, đếm số tay giơ.',
      'Nếu dưới hai phần ba lớp, ghi lại để dạy bù đầu buổi sau.',
    ],
    why: 'Đây là phép đo rẻ nhất và trung thực nhất về hiệu quả một buổi dạy.',
    avoid: 'Kết buổi bằng “các em về xem lại bài” — không đo được gì.',
  },
  {
    name: 'Giao việc gắn hệ thống',
    when: 'Cuối mọi buổi.',
    how: [
      'Giao đúng mã phiếu trên hệ thống, kèm hạn nộp cụ thể theo ngày.',
      'Nói rõ KPI mục tiêu của phiếu đó.',
      'Kiểm tra tỉ lệ nộp vào sáng hôm sau, nhắc riêng em chưa làm.',
    ],
    why: 'Việc giao mơ hồ thì tỉ lệ hoàn thành thấp và không đo được. Mã phiếu và hạn cụ thể thay đổi hẳn con số này.',
    avoid: 'Giao “làm bài trong sách” mà không có cách theo dõi.',
  },
  {
    name: 'Bổ đề mỗi buổi',
    when: 'Lớp chuyên và lớp mục tiêu 9+.',
    how: [
      'Mỗi buổi dạy đúng một bổ đề, chứng minh đầy đủ.',
      'Chỉ ra hai dấu hiệu trong đề cho biết phải dùng.',
      'Đầu buổi sau hỏi lại bổ đề của buổi trước.',
    ],
    why: 'Đề chuyên thưởng cho người thuộc mô hình. Một bổ đề mỗi buổi, sau 20 buổi là một kho công cụ thật.',
    avoid: 'Dạy ba bổ đề trong một buổi — không cái nào thành phản xạ.',
  },
  {
    name: 'Im lặng có chủ đích',
    when: 'Sau khi đặt một câu hỏi khó.',
    how: [
      'Đếm thầm đủ 5 giây trước khi nói tiếp.',
      'Chịu đựng sự im lặng, không tự trả lời.',
      'Nếu vẫn không ai trả lời, hỏi lại bằng một câu hẹp hơn.',
    ],
    why: 'Giáo viên trung bình chờ chưa tới 1 giây. Kéo lên 5 giây làm tăng rõ rệt độ dài và chất lượng câu trả lời.',
    avoid: 'Tự trả lời câu hỏi của mình — lớp sẽ học được rằng không cần suy nghĩ, chờ là có đáp án.',
  },
];

/* ============================================================
   3. KỊCH BẢN NHẬN XÉT THEO TÌNH HUỐNG
   ============================================================ */

export interface FeedbackScript {
  situation: string;
  signal: string;
  say: string;
  then: string;
  never: string;
}

export const FEEDBACK_SCRIPTS: FeedbackScript[] = [
  {
    situation: 'Học sinh đạt KPI rất cao (từ 95%)',
    signal: 'KPI ≥ 95% ở hai phiếu liên tiếp cùng mức độ.',
    say:
      '“Em đã chắc ở mức này rồi. Điều đáng nói không phải là 95% mà là em làm đúng cả những câu có bẫy. Từ buổi sau em lên mức khó hơn — sẽ có lúc tụt xuống 70%, và đó là dấu hiệu tốt chứ không phải xấu.”',
    then: 'Mở khoá mức độ kế tiếp và giải thích trước rằng KPI sẽ tạm giảm.',
    never: 'Chỉ khen “giỏi lắm” rồi để em ở nguyên mức cũ — cách chắc chắn nhất để một học sinh giỏi chán học.',
  },
  {
    situation: 'Học sinh đạt chuẩn nhưng đang chững lại',
    signal: 'KPI dao động quanh 90% suốt ba tuần, không tăng cũng không giảm.',
    say:
      '“Em đang ở vùng an toàn: làm đúng nhưng không còn học được gì mới. Tuần này thầy sẽ giao dạng lạ hơn. Mục tiêu không phải giữ 90%, mà là tìm ra chỗ em còn chưa biết.”',
    then: 'Giao phiếu NC hoặc bài mở rộng, đổi tiêu chí đánh giá từ KPI sang số dạng mới xử lí được.',
    never: 'Để nguyên vì “em vẫn đạt chuẩn” — ba tuần chững lại là ba tuần mất.',
  },
  {
    situation: 'Học sinh tụt KPI đột ngột',
    signal: 'KPI giảm trên 20 điểm phần trăm so với trung bình ba phiếu trước.',
    say:
      '“Thầy thấy phiếu này khác hẳn mấy phiếu trước của em. Trước khi nói về bài, thầy muốn hỏi: tuần vừa rồi có gì thay đổi không?”',
    then:
      'Hỏi về nhịp sinh hoạt trước khi hỏi về kiến thức. Nếu là vấn đề kiến thức, quay lại phiếu KN của chuyên đề đó.',
    never: 'Kết luận ngay “em lười đi rồi”. Tụt đột ngột thường là dấu hiệu của việc ngoài bài vở.',
  },
  {
    situation: 'Học sinh làm nhiều nhưng KPI không lên',
    signal: 'Số phiếu tăng, KPI đứng yên, ngân hàng lỗi có nhiều câu chưa xử lí.',
    say:
      '“Em đang làm rất chăm nhưng chưa đúng cách. Làm thêm phiếu không giúp bằng việc sửa xong những câu đã sai. Tuần này em dừng nhận phiếu mới, chỉ xử lí ngân hàng lỗi.”',
    then: 'Khoá tạm nhiệm vụ mới, giao mục tiêu: đưa số lỗi chưa xử lí về 0.',
    never: 'Khen “em chăm lắm” rồi giao thêm bài — củng cố đúng cái thói quen đang làm em mắc kẹt.',
  },
  {
    situation: 'Học sinh mất điểm vì trình bày, không vì kiến thức',
    signal: 'Ý tưởng đúng nhưng thiếu điều kiện, thiếu kết luận, thiếu trường hợp.',
    say:
      '“Toán của em đúng. Điểm của em sai. Ba mốc em mất hôm nay đều không liên quan tới việc nghĩ ra lời giải — đều là những dòng phải viết ra. Đây là loại điểm dễ lấy lại nhất.”',
    then: 'Cho chấm chéo theo barem trong hai buổi liên tiếp; đếm số mốc mất vì trình bày.',
    never:
      'Nói chung chung “phải trình bày cẩn thận hơn”. Phải chỉ ra đúng ba dòng cụ thể em đã không viết.',
  },
  {
    situation: 'Học sinh mất động lực rõ rệt',
    signal: 'Chuỗi ngày học đứt trên 5 ngày, không nộp bài, ít phát biểu.',
    say:
      '“Thầy không hỏi vì sao em chưa làm bài. Thầy hỏi: điều gì đang khiến việc học nặng hơn bình thường?”',
    then:
      'Giảm khối lượng xuống mức chắc chắn hoàn thành được trong ba ngày, để em nối lại chuỗi. Ưu tiên nối chuỗi trước, nâng khối lượng sau.',
    never: 'Tăng bài để “bù lại phần đã mất” — cách nhanh nhất để em bỏ hẳn.',
  },
  {
    situation: 'Phụ huynh hỏi “con tôi có đỗ được không”',
    signal: 'Câu hỏi thường gặp nhất trong buổi trao đổi với gia đình.',
    say:
      '“Không ai trả lời chắc chắn được câu đó, và ai trả lời chắc chắn thì anh chị nên cẩn thận. Điều em nói được là: hiện con đang ở mức mấy, so với yêu cầu của trường thì còn cách bao nhiêu, và trong tám tuần tới con cần đạt những mốc nào.”',
    then: 'Mở báo cáo tuần, chỉ vào xu hướng ba tuần gần nhất và ba việc cụ thể của tuần tới.',
    never: 'Cam kết đỗ. Không hệ thống nào cam kết được điều đó, và lời hứa ấy sẽ quay lại phá hỏng niềm tin.',
  },
  {
    situation: 'Học sinh muốn nhảy cóc lên mức cao hơn',
    signal: 'Em xin làm đề chuyên khi chưa đạt chuẩn ở phiếu KN.',
    say:
      '“Thầy đồng ý cho em thử một đề, nhưng có điều kiện: làm xong em phải chấm theo barem và đếm số mốc mất. Nếu mất quá một nửa vì chưa vững nền, ta quay lại phiếu KN đủ hai tuần rồi thử lại.”',
    then: 'Cho thử thật, dùng kết quả làm dữ liệu thay vì tranh luận.',
    never: 'Từ chối thẳng — làm mất động lực và mất luôn cơ hội để em tự nhận ra khoảng cách.',
  },
];

/* ============================================================
   4. NGHI THỨC LỚP HỌC
   ============================================================ */

export interface Ritual {
  name: string;
  when: string;
  minutes: number;
  steps: string[];
  why: string;
}

export const CLASS_RITUALS: Ritual[] = [
  {
    name: 'Câu mục tiêu đầu buổi',
    when: 'Ba phút đầu mọi buổi',
    minutes: 3,
    steps: [
      'Viết một câu mục tiêu đo được lên góc bảng, để nguyên suốt buổi.',
      'Đọc to một lần, yêu cầu cả lớp chép vào đầu trang vở.',
      'Câu phải bắt đầu bằng động từ năng lực: “Sau buổi này, em đọc được…”, “em trình bày được…”.',
    ],
    why: 'Đây là chữ G của GITA ở cấp độ một buổi học. Không có nó, buổi dạy trở thành chuỗi việc rời rạc.',
  },
  {
    name: 'Ba mươi giây đọc vị',
    when: 'Trước mỗi bài mẫu',
    minutes: 1,
    steps: [
      'Chiếu đề, đếm ngược 30 giây.',
      'Hỏi đúng hai câu: dạng gì, hướng nào.',
      'Chỉ sau đó mới cho bắt tay vào giải.',
    ],
    why: 'Tạo phản xạ đọc vị. Trong phòng thi, 30 giây đầu quyết định nhiều hơn 10 phút sau đó.',
  },
  {
    name: 'Ô ghi chú lỗi',
    when: 'Cuối mỗi phiếu luyện',
    minutes: 5,
    steps: [
      'Yêu cầu điền đủ ba cột: câu sai | nguyên nhân | việc sửa.',
      'Nguyên nhân phải thuộc năm nhóm: không biết hướng, sai tính toán, thiếu trường hợp, trình bày, hết giờ.',
      'Kiểm tra ngẫu nhiên ba quyển mỗi buổi.',
    ],
    why: 'Lỗi được đặt tên là lỗi bắt đầu được sửa. Ô này biến việc chấm bài thành dữ liệu dùng được.',
  },
  {
    name: 'Đếm tay cuối buổi',
    when: 'Hai phút cuối',
    minutes: 2,
    steps: [
      'Chỉ vào câu mục tiêu đầu buổi.',
      'Hỏi “ai làm được rồi”, đếm số tay.',
      'Ghi con số vào sổ giáo viên.',
    ],
    why: 'Phép đo rẻ nhất về hiệu quả buổi dạy, và là dữ liệu để điều chỉnh buổi sau.',
  },
  {
    name: 'Bàn giao tuần',
    when: 'Cuối tuần',
    minutes: 15,
    steps: [
      'Xuất báo cáo tuần của lớp, xem ba học sinh tụt nhịp nhất.',
      'Nhắn riêng cho ba em đó và gia đình.',
      'Ghi lại một điều chỉnh cho tuần sau.',
    ],
    why: 'Học sinh rơi rụng không phải trong một buổi, mà qua ba tuần không ai để ý.',
  },
];

/* ============================================================
   5. BẢNG DỰ GIỜ
   ============================================================ */

export interface ObservationRow {
  area: string;
  weight: number;
  levels: { score: 1 | 2 | 3 | 4; desc: string }[];
}

export const OBSERVATION_RUBRIC: ObservationRow[] = [
  {
    area: 'Mục tiêu buổi học',
    weight: 15,
    levels: [
      { score: 1, desc: 'Không có mục tiêu, buổi dạy là chuỗi bài rời rạc.' },
      { score: 2, desc: 'Có mục tiêu nhưng chung chung, không đo được.' },
      { score: 3, desc: 'Mục tiêu đo được, viết lên bảng, học sinh chép lại.' },
      { score: 4, desc: 'Mục tiêu đo được và được kiểm tra lại cuối buổi bằng số liệu.' },
    ],
  },
  {
    area: 'Tỉ lệ thời gian học sinh làm việc',
    weight: 20,
    levels: [
      { score: 1, desc: 'Dưới 25% thời lượng — giáo viên nói gần như cả buổi.' },
      { score: 2, desc: '25–40% — có luyện tập nhưng ngắn và bị cắt ngang.' },
      { score: 3, desc: '40–55% — học sinh làm việc thực chất trong phần lớn buổi.' },
      { score: 4, desc: 'Trên 55% và thời gian đó được giáo viên quan sát, can thiệp đúng chỗ.' },
    ],
  },
  {
    area: 'Kiểm tra hiểu bài',
    weight: 15,
    levels: [
      { score: 1, desc: 'Chỉ hỏi “các em hiểu chưa”.' },
      { score: 2, desc: 'Có hỏi cụ thể nhưng chỉ vài em xung phong trả lời.' },
      { score: 3, desc: 'Gọi ngẫu nhiên có chuẩn bị, phủ được nhiều mức năng lực.' },
      { score: 4, desc: 'Có công cụ đo cả lớp cùng lúc và điều chỉnh ngay theo kết quả.' },
    ],
  },
  {
    area: 'Xử lí lỗi sai',
    weight: 20,
    levels: [
      { score: 1, desc: 'Bỏ qua lỗi, hoặc chỉ nói “sai rồi” rồi gọi em khác.' },
      { score: 2, desc: 'Chữa lỗi nhưng chữa hộ, học sinh chỉ chép lại.' },
      { score: 3, desc: 'Dùng lỗi làm tài liệu dạy, truy được nguyên nhân.' },
      { score: 4, desc: 'Học sinh tự phát hiện lỗi và nêu được dấu hiệu phòng lỗi cho lần sau.' },
    ],
  },
  {
    area: 'Phân hoá theo năng lực',
    weight: 15,
    levels: [
      { score: 1, desc: 'Một bộ bài cho cả lớp, không quan tâm phổ điểm.' },
      { score: 2, desc: 'Có bài thêm cho học sinh xong sớm.' },
      { score: 3, desc: 'Chia nhóm theo dữ liệu KPI, giao bài khác mức độ.' },
      { score: 4, desc: 'Phân nhóm động theo tuần và có lộ trình riêng cho nhóm dưới.' },
    ],
  },
  {
    area: 'Giao việc và theo dõi',
    weight: 15,
    levels: [
      { score: 1, desc: 'Giao miệng, không có mã phiếu, không có hạn.' },
      { score: 2, desc: 'Có giao cụ thể nhưng không kiểm tra lại.' },
      { score: 3, desc: 'Giao đúng mã phiếu kèm hạn, kiểm tra tỉ lệ nộp.' },
      { score: 4, desc: 'Kiểm tra tỉ lệ nộp, nhắc riêng em chưa làm, và dùng dữ liệu để điều chỉnh buổi sau.' },
    ],
  },
];

export const academyStats = () => ({
  plans: LESSON_PLANS.length,
  blocks: LESSON_PLANS.reduce((s, p) => s + p.blocks.length, 0),
  moves: TEACHING_MOVES.length,
  scripts: FEEDBACK_SCRIPTS.length,
  rituals: CLASS_RITUALS.length,
  rubricRows: OBSERVATION_RUBRIC.length,
});
