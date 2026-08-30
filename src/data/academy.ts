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
  {
    id: 'lp-60-vao-6',
    name: 'Buổi luyện Toán vào lớp 6 · 60 phút',
    minutes: 60,
    sheetTypes: ['dang-bai', 'ky-nang'],
    tracks: ['lop6'],
    goal:
      'Học sinh lớp 4–5 thành thạo một dạng toán có lời văn và giữ được hứng thú tới cuối buổi. Với lứa tuổi này, giữ hứng thú là mục tiêu ngang hàng với kiến thức, không phải mục tiêu phụ.',
    prepare: [
      'Chọn đúng MỘT dạng cho cả buổi. Trẻ tiểu học không tiếp thu được hai dạng mới trong một buổi 60 phút.',
      'In phiếu DB của dạng đó và chuẩn bị sẵn giấy nháp kẻ ô để vẽ sơ đồ đoạn thẳng.',
      'Chuẩn bị hai đề: một đề chuẩn dạng và một đề đã đổi lớp vỏ tình huống nhưng cùng cấu trúc.',
      'Xem lại sổ tay lỗi của lớp, chọn một lỗi để nhắc lại ngay đầu buổi.',
    ],
    blocks: [
      {
        minutes: 8,
        name: 'Khởi động tính nhẩm',
        purpose: 'Vào nhịp bằng việc dễ, đồng thời giữ kỹ năng tính toán nền không bị mai một.',
        teacher: [
          'Đọc 10 phép tính phân số và phần trăm, mỗi phép 20 giây.',
          'Chữa ngay tại chỗ, chỉ nói đáp số, không giảng.',
          'Ghi lại số phép mỗi em làm đúng để so với tuần trước.',
        ],
        student: ['Làm nhanh vào bảng con hoặc vở nháp.', 'Tự chấm và ghi số câu đúng.'],
        success: 'Cả lớp làm xong 10 phép trong 8 phút và trung bình đúng từ 7 câu trở lên.',
        pitfall: 'Biến khối này thành giờ giảng lại phân số. Nếu nhiều em sai, ghi lại để dạy ở buổi riêng, đừng dừng buổi này.',
      },
      {
        minutes: 10,
        name: 'Đọc đề bằng bút chì',
        purpose: 'Dạy thao tác đọc đề trước khi dạy cách giải — đây là gốc của phần lớn lỗi ở lứa tuổi này.',
        teacher: [
          'Chiếu một đề, yêu cầu cả lớp gạch chân số liệu và khoanh tròn câu hỏi cuối.',
          'Gọi hai em đọc lại đề bằng lời của mình, không nhìn đề.',
          'Hỏi riêng một câu: "phân số này là của số nào" trước khi cho ai đặt bút tính.',
        ],
        student: ['Gạch chân, khoanh tròn trực tiếp trên đề.', 'Kể lại đề bằng lời của mình.'],
        success: 'Trên đề của mọi học sinh đều có ít nhất ba chỗ được gạch chân hoặc khoanh tròn.',
        pitfall: 'Bỏ qua khối này vì "đề dễ mà". Đúng ở những đề dễ thì thao tác mới thành phản xạ khi gặp đề khó.',
      },
      {
        minutes: 15,
        name: 'Làm mẫu một bài — vẽ sơ đồ trước, tính sau',
        purpose: 'Cho học sinh thấy quy trình đầy đủ, trong đó bước vẽ sơ đồ đứng trước mọi phép tính.',
        teacher: [
          'Vẽ sơ đồ đoạn thẳng lên bảng trước, chưa viết một phép tính nào.',
          'Hỏi cả lớp "nhìn sơ đồ, con thấy phải tìm gì trước" rồi mới viết phép tính đầu tiên.',
          'Viết lời giải đầy đủ theo chuẩn tiểu học: mỗi phép tính một câu lời giải.',
        ],
        student: ['Vẽ lại sơ đồ vào vở.', 'Đọc to câu lời giải trước khi chép phép tính.'],
        success: 'Vở của học sinh có sơ đồ nằm trước phép tính, không phải sau.',
        pitfall: 'Giáo viên viết luôn phép tính rồi mới vẽ sơ đồ minh hoạ — làm hỏng đúng thứ tự tư duy cần dạy.',
      },
      {
        minutes: 15,
        name: 'Học sinh tự làm bài đổi vỏ',
        purpose: 'Kiểm chứng học sinh nắm cấu trúc dạng chứ không phải thuộc lòng bài mẫu.',
        teacher: [
          'Phát đề thứ hai: cùng cấu trúc, khác hoàn toàn bối cảnh.',
          'Đi quanh lớp, chỉ hỏi ngược "con đang mắc ở bước nào", không giải hộ.',
          'Ghi lại hai lỗi phổ biến nhất để chữa chung.',
        ],
        student: ['Làm độc lập trong im lặng.', 'Giơ tay khi bí quá 2 phút.'],
        success: 'Ít nhất 60% học sinh vẽ đúng sơ đồ, kể cả khi phép tính còn sai.',
        pitfall: 'Cho đề y hệt bài mẫu chỉ đổi số. Đổi số không kiểm chứng được gì, phải đổi bối cảnh.',
      },
      {
        minutes: 8,
        name: 'Chữa chung hai lỗi',
        purpose: 'Chữa đúng hai lỗi phổ biến nhất, không chữa từng bài.',
        teacher: [
          'Viết hai lỗi lên bảng dưới dạng "đề hỏi gì — bạn đã làm gì — đúng ra phải làm gì".',
          'Không nêu tên học sinh mắc lỗi.',
          'Yêu cầu cả lớp ghi vào sổ tay lỗi bằng lời của chính mình.',
        ],
        student: ['Ghi sổ tay lỗi bằng lời của mình, không chép bảng.'],
        success: 'Mỗi học sinh có ít nhất một dòng mới trong sổ tay lỗi sau buổi học.',
        pitfall: 'Chữa hết mọi lỗi. Hai lỗi được nhớ tốt hơn bảy lỗi được nghe.',
      },
      {
        minutes: 4,
        name: 'Chốt buổi và giao việc',
        purpose: 'Đóng buổi bằng một câu học sinh tự nói ra, và giao việc vừa sức.',
        teacher: [
          'Hỏi "hôm nay con học được cách nhận ra dạng này bằng dấu hiệu gì".',
          'Giao đúng 3 bài về nhà, không nhiều hơn.',
          'Khen quá trình cụ thể ("con đã vẽ sơ đồ trước khi tính"), không khen chung chung.',
        ],
        student: ['Nói ra một dấu hiệu nhận dạng.', 'Ghi việc về nhà vào sổ.'],
        success: 'Ít nhất ba học sinh nêu được dấu hiệu nhận dạng bằng lời của mình.',
        pitfall: 'Giao 10 bài về nhà cho chắc. Ở lứa tuổi này, giao quá tay là cách nhanh nhất làm trẻ chán môn Toán.',
      },
    ],
    homework: [
      'Ba bài cùng dạng trên hệ thống, làm trong hai buổi khác nhau chứ không làm một lượt.',
      'Ghi vào sổ tay lỗi mọi câu sai, viết bằng lời của con.',
      'Mười phút tính nhẩm mỗi ngày, có bấm giờ.',
    ],
    evidence: [
      'Tỉ lệ học sinh vẽ sơ đồ trước khi tính, đếm trực tiếp trên vở.',
      'Số câu đúng trong phần khởi động tính nhẩm so với tuần trước.',
      'KPI của phiếu DB cùng dạng trong tuần kế tiếp.',
    ],
  },
  {
    id: 'lp-90-luyen-de',
    name: 'Buổi luyện đề tính giờ · 90 phút',
    minutes: 90,
    sheetTypes: ['thi', 'on-thi'],
    tracks: ['thpt', 'chuyen', 'thpt-qg', 'lop6'],
    goal:
      'Học sinh làm một đề trong đúng thời gian quy định và tự chấm được theo barem. Mục tiêu của buổi không phải là điểm số mà là dữ liệu: biết chính xác mình mất điểm ở đâu và vì sao.',
    prepare: [
      'Chọn đề đúng cấu trúc kỳ thi mục tiêu, in kèm barem nhưng giữ riêng, chưa phát.',
      'Chuẩn bị đồng hồ đếm ngược hiển thị cho cả lớp thấy.',
      'Xem lại phổ điểm lần luyện đề trước để biết cần dừng lại ở phần nào khi chữa.',
      'Bố trí chỗ ngồi giãn cách như phòng thi thật.',
    ],
    blocks: [
      {
        minutes: 5,
        name: 'Thiết lập điều kiện phòng thi',
        purpose: 'Tạo đúng áp lực của phòng thi thật, vì đây chính là biến số buổi này muốn luyện.',
        teacher: [
          'Nhắc lại kế hoạch phân bổ thời gian của đề, viết lên bảng.',
          'Đặt đồng hồ đếm ngược, tuyên bố không giải đáp thắc mắc sau khi bắt đầu.',
          'Yêu cầu cất toàn bộ tài liệu và điện thoại.',
        ],
        student: ['Ghi kế hoạch thời gian lên đầu tờ đề.', 'Cất tài liệu.'],
        success: 'Mọi học sinh có mốc thời gian ghi trên tờ đề trước khi tính giờ.',
        pitfall: 'Bắt đầu bấm giờ mà chưa thống nhất kế hoạch phân bổ thời gian — mất đi một nửa giá trị của buổi.',
      },
      {
        minutes: 45,
        name: 'Làm đề trong im lặng tuyệt đối',
        purpose: 'Tái tạo điều kiện thi thật, kể cả áp lực khi gặp câu bí.',
        teacher: [
          'Không trả lời bất kỳ câu hỏi nào về nội dung đề.',
          'Đi quanh lớp ghi lại: em nào dừng quá lâu ở câu nào, em nào bỏ trắng, em nào nộp sớm.',
          'Báo mốc thời gian còn lại ở phút thứ 20 và phút thứ 40.',
        ],
        student: ['Làm bài độc lập, tự quản lý thời gian.', 'Khoanh tròn câu bỏ qua để quay lại.'],
        success: 'Ít nhất 80% học sinh làm hết lượt toàn đề, kể cả khi chưa giải xong mọi câu.',
        pitfall:
          'Nhắc bài hoặc gợi ý khi thấy học sinh bí. Việc học sinh tự xoay xở khi bí chính là kỹ năng buổi này cần luyện.',
      },
      {
        minutes: 15,
        name: 'Tự chấm theo barem',
        purpose: 'Chuyển học sinh từ vai người làm bài sang vai người chấm bài — góc nhìn thay đổi hoàn toàn.',
        teacher: [
          'Phát barem, hướng dẫn chấm từng mốc điểm một, không chấm cảm tính.',
          'Yêu cầu ghi rõ mất điểm vì lỗi kiến thức, lỗi tính toán hay lỗi trình bày.',
          'Đi kiểm tra ngẫu nhiên vài bài để chắc học sinh không tự nới tay.',
        ],
        student: ['Chấm bài của chính mình theo barem.', 'Phân loại từng chỗ mất điểm theo ba nhóm nguyên nhân.'],
        success: 'Mỗi bài có bảng phân loại nguyên nhân mất điểm, không chỉ có con số điểm.',
        pitfall: 'Giáo viên chấm hộ. Học sinh tự chấm theo barem học được nhiều hơn nhận lại bài đã chấm.',
      },
      {
        minutes: 20,
        name: 'Chữa theo phổ lỗi, không chữa tuần tự',
        purpose: 'Dành thời gian cho câu nhiều người sai nhất, không chữa lần lượt từ câu 1.',
        teacher: [
          'Thống kê nhanh trên bảng: câu nào bao nhiêu em sai.',
          'Chữa ba câu có nhiều lỗi nhất, mỗi câu nói rõ dấu hiệu đọc vị đã bị bỏ qua.',
          'Các câu còn lại chỉ nêu đáp số và chỉ chỗ tra trong hệ thống.',
        ],
        student: ['Ghi lại dấu hiệu đọc vị bị bỏ sót.', 'Đánh dấu chuyên đề cần ôn lại.'],
        success: 'Ba câu sai nhiều nhất đều được chữa kỹ, và học sinh chỉ ra được dấu hiệu đã bỏ sót.',
        pitfall: 'Chữa tuần tự từ câu 1 rồi hết giờ ở câu 5 — trong khi câu sai nhiều nhất lại nằm ở cuối đề.',
      },
      {
        minutes: 5,
        name: 'Chốt và giao lộ trình cá nhân',
        purpose: 'Biến kết quả đề thành việc cụ thể cho từng em, thay vì một con điểm.',
        teacher: [
          'Đối chiếu điểm từng em với dải điểm trong phần đọc điểm của đề.',
          'Giao đúng một chuyên đề ưu tiên cho mỗi em cho tuần kế tiếp.',
        ],
        student: ['Ghi chuyên đề ưu tiên của mình vào sổ.'],
        success: 'Mỗi học sinh rời lớp với đúng một chuyên đề ưu tiên, không phải một danh sách dài.',
        pitfall: 'Kết thúc buổi bằng việc đọc điểm cả lớp. Điểm là dữ liệu đầu vào, không phải kết quả của buổi.',
      },
    ],
    homework: [
      'Làm lại toàn bộ câu sai trên giấy sạch, không nhìn lời giải.',
      'Làm hai phiếu của chuyên đề ưu tiên được giao.',
      'Cập nhật sổ tay lỗi, ghi rõ nguyên nhân theo ba nhóm đã phân loại.',
    ],
    evidence: [
      'Phổ điểm của lớp so với lần luyện đề trước.',
      'Số học sinh làm hết lượt toàn đề trong thời gian quy định.',
      'Tỉ lệ lỗi trình bày so với lỗi kiến thức — lỗi trình bày phải giảm nhanh nhất.',
    ],
  },
  {
    id: 'lp-60-phu-dao',
    name: 'Buổi phụ đạo chữa lỗi · 60 phút',
    minutes: 60,
    sheetTypes: ['ky-nang', 'dang-bai'],
    tracks: ['thpt', 'chuyen', 'thpt-qg', 'lop6'],
    goal:
      'Nhóm nhỏ học sinh đang tụt lại xoá được đúng một lỗi hệ thống của mình. Buổi này không dạy kiến thức mới, chỉ chữa một chỗ hỏng và chữa cho dứt điểm.',
    prepare: [
      'Lọc sổ tay lỗi của nhóm, chọn đúng MỘT lỗi mà nhiều em cùng mắc.',
      'Chuẩn bị 6 bài chỉ khác nhau ở chính chỗ gây ra lỗi đó.',
      'Nhóm tối đa 6 học sinh — đông hơn thì không còn là phụ đạo.',
      'Chuẩn bị một câu mở đầu không đổ lỗi cho học sinh.',
    ],
    blocks: [
      {
        minutes: 7,
        name: 'Gọi tên lỗi, không gọi tên người',
        purpose: 'Đặt lỗi lên bàn như một đối tượng để cùng xử lý, thay vì như một khuyết điểm cá nhân.',
        teacher: [
          'Viết lỗi lên bảng dưới dạng một câu mô tả hành vi, ví dụ "quên đối chiếu điều kiện sau khi giải".',
          'Nói rõ đây là lỗi phổ biến, không phải dấu hiệu kém.',
          'Hỏi từng em xem em nghĩ vì sao mình mắc lỗi này.',
        ],
        student: ['Nói ra lý do của chính mình.'],
        success: 'Mọi học sinh trong nhóm phát biểu được một lý do, dù ngắn.',
        pitfall: 'Bắt đầu bằng "sao em cứ sai chỗ này mãi". Câu đó đóng buổi phụ đạo lại ngay từ phút đầu.',
      },
      {
        minutes: 13,
        name: 'Xây quy trình chống lỗi',
        purpose: 'Biến việc "nhớ đừng quên" thành một thao tác cụ thể luôn làm được.',
        teacher: [
          'Cùng nhóm viết ra một quy trình 3–4 bước để lỗi đó không thể xảy ra.',
          'Yêu cầu quy trình phải kiểm chứng được bằng mắt trên tờ giấy, không phải "nhớ kỹ hơn".',
          'Cho cả nhóm chép quy trình vào trang đầu vở.',
        ],
        student: ['Góp ý xây quy trình.', 'Chép quy trình vào trang đầu vở.'],
        success: 'Quy trình viết ra chỉ gồm các bước quan sát được, không có bước nào là "cẩn thận hơn".',
        pitfall: 'Giáo viên tự đọc quy trình cho học sinh chép. Quy trình do chính học sinh nói ra mới được dùng thật.',
      },
      {
        minutes: 25,
        name: 'Luyện sáu bài cùng một chỗ hỏng',
        purpose: 'Lặp đúng một thao tác đủ nhiều lần để nó thành phản xạ.',
        teacher: [
          'Cho làm từng bài một, chấm ngay sau mỗi bài.',
          'Chỉ chấm bước có chứa lỗi cần chữa, bỏ qua các lỗi khác trong buổi này.',
          'Sau bài thứ ba, yêu cầu học sinh tự đọc lại quy trình trước khi làm bài thứ tư.',
        ],
        student: ['Làm từng bài, tự soát theo quy trình trước khi nộp.'],
        success: 'Từ bài thứ tư trở đi, không còn em nào mắc đúng lỗi đó.',
        pitfall:
          'Chấm cả những lỗi khác trong buổi này. Chữa nhiều lỗi cùng lúc là lý do phổ biến khiến buổi phụ đạo không đọng lại gì.',
      },
      {
        minutes: 10,
        name: 'Kiểm chứng bằng bài lạ',
        purpose: 'Xác nhận học sinh đã chữa được lỗi chứ không phải quen với bối cảnh quen thuộc.',
        teacher: [
          'Phát một bài khác hẳn bối cảnh nhưng vẫn có đúng cái bẫy cũ.',
          'Không nhắc gì trước khi phát.',
          'Chấm ngay và công bố kết quả cho từng em.',
        ],
        student: ['Làm bài kiểm chứng, tự soát theo quy trình.'],
        success: 'Ít nhất 5 trên 6 học sinh vượt qua bẫy ở bài kiểm chứng.',
        pitfall: 'Nhắc trước "chú ý điều kiện nhé". Nhắc trước thì bài kiểm chứng không còn kiểm chứng được gì.',
      },
      {
        minutes: 5,
        name: 'Chốt cam kết',
        purpose: 'Neo quy trình vào việc học hằng ngày, không để nó chỉ sống trong buổi phụ đạo.',
        teacher: [
          'Yêu cầu mỗi em nói ra khi nào sẽ dùng quy trình này trong tuần tới.',
          'Hẹn kiểm tra lại đúng lỗi này sau một tuần.',
        ],
        student: ['Nói ra thời điểm cụ thể sẽ áp dụng.'],
        success: 'Mỗi học sinh nêu được một thời điểm cụ thể, không nói chung chung "em sẽ cố".',
        pitfall: 'Không hẹn kiểm tra lại. Lỗi hệ thống chỉ mất hẳn khi được kiểm tra lại ít nhất một lần.',
      },
    ],
    homework: [
      'Bốn bài cùng chứa bẫy đã chữa, làm rải trong tuần.',
      'Dán quy trình chống lỗi lên góc bàn học.',
      'Tự đánh dấu vào sổ mỗi lần áp dụng được quy trình.',
    ],
    evidence: [
      'Tỉ lệ mắc lại đúng lỗi đó trong các phiếu tuần kế tiếp.',
      'Kết quả bài kiểm chứng cuối buổi.',
      'Số lần học sinh tự đánh dấu đã áp dụng quy trình.',
    ],
  },
  {
    id: 'lp-45-bam-sat',
    name: 'Buổi bám sát chương trình trên lớp · 45 phút',
    minutes: 45,
    sheetTypes: ['dang-bai', 'ky-nang'],
    tracks: ['chinh-khoa'],
    goal:
      'Học sinh làm chủ đúng bài vừa học trên lớp trong ngày, trước khi kiến thức kịp phai. Đây là buổi ngắn nhất trong hệ thống và cũng là buổi quyết định điểm hệ số 1 — phần chiếm tỉ trọng lớn nhất trong điểm tổng kết mà học sinh hay xem nhẹ nhất.',
    prepare: [
      'Hỏi trước học sinh hôm nay trên lớp học bài nào; buổi này bám đúng bài đó, không dạy trước chương trình.',
      'Chọn đúng 6 bài tập: 2 bài mức nhận biết, 2 bài thông hiểu, 2 bài vận dụng của chính bài học đó.',
      'Xem lại sổ tay lỗi của học sinh, chọn một lỗi cũ để cài lại vào buổi này.',
      'Chuẩn bị một câu hỏi chốt để kiểm tra hiểu bài ở phút thứ 10.',
    ],
    blocks: [
      {
        minutes: 6,
        name: 'Kiểm tra hiểu bài trên lớp',
        purpose: 'Xác định học sinh thực sự hiểu tới đâu, thay vì tin vào câu "con hiểu rồi".',
        teacher: [
          'Yêu cầu học sinh gấp vở và tự nói lại nội dung chính của bài học hôm nay.',
          'Đặt một câu hỏi chốt về điều kiện áp dụng, không hỏi về công thức.',
          'Ghi lại chỗ học sinh ngập ngừng — đó là chỗ cần dừng lâu ở khối sau.',
        ],
        student: ['Nói lại bài bằng lời của mình, không nhìn vở.', 'Trả lời câu hỏi chốt.'],
        success: 'Học sinh nêu được điều kiện áp dụng của công thức vừa học mà không mở vở.',
        pitfall: 'Cho học sinh mở vở đọc lại — khi đó buổi học không đo được gì và chỉ tạo cảm giác đã hiểu.',
      },
      {
        minutes: 8,
        name: 'Chốt lý thuyết bằng một trang sổ tay',
        purpose: 'Biến bài học trên lớp thành một trang có cấu trúc, dùng lại được khi ôn thi.',
        teacher: [
          'Cùng học sinh viết một trang sổ tay: công thức, điều kiện áp dụng, một dòng "dùng khi nào".',
          'Không đọc cho chép — hỏi để học sinh tự nói ra rồi mới viết.',
          'Yêu cầu ghi thêm một bẫy đã gặp trong bài giảng trên lớp.',
        ],
        student: ['Tự viết trang sổ tay bằng lời của mình.'],
        success: 'Trang sổ tay có đủ ba phần và dòng "dùng khi nào" viết bằng ngôn ngữ của chính học sinh.',
        pitfall: 'Phát bản in sẵn. Giá trị nằm ở quá trình tự chọn và tự diễn đạt, không nằm ở tờ giấy.',
      },
      {
        minutes: 18,
        name: 'Sáu bài theo bậc thang',
        purpose: 'Đi từ nhận biết lên vận dụng trong cùng một bài học, để học sinh thấy rõ mình đứng ở bậc nào.',
        teacher: [
          'Giao lần lượt từng cặp bài, chấm ngay sau mỗi cặp.',
          'Chỉ chuyển lên bậc sau khi cặp bài hiện tại đã đúng cả hai.',
          'Nếu sai ở bậc nhận biết thì dừng lại, không cố chạy hết sáu bài.',
        ],
        student: ['Làm từng cặp bài, tự soát trước khi nộp.'],
        success: 'Học sinh làm đúng cả hai bài ở bậc thông hiểu trong thời gian quy định.',
        pitfall: 'Cố chạy hết sáu bài cho đủ giáo án dù học sinh còn sai ở bậc đầu tiên.',
      },
      {
        minutes: 8,
        name: 'Cài lại một lỗi cũ',
        purpose: 'Kiểm tra lỗi đã chữa ở buổi trước có thật sự mất chưa.',
        teacher: [
          'Giao một bài chứa đúng cái bẫy của lỗi cũ, không báo trước.',
          'Chấm ngay và đối chiếu với sổ tay lỗi.',
          'Nếu học sinh vượt qua, gạch lỗi đó khỏi sổ tay và nói rõ ra.',
        ],
        student: ['Làm bài kiểm chứng, tự soát theo quy trình đã học.'],
        success: 'Học sinh vượt qua bẫy cũ mà không cần nhắc.',
        pitfall: 'Nhắc trước "chú ý điều kiện nhé" — nhắc trước thì bài kiểm chứng không kiểm chứng được gì.',
      },
      {
        minutes: 5,
        name: 'Giao việc và chốt buổi',
        purpose: 'Nối buổi học với bài trên lớp ngày mai và với kỳ kiểm tra sắp tới.',
        teacher: [
          'Giao đúng 3 bài về nhà cùng dạng, không nhiều hơn.',
          'Chỉ cho học sinh mục tương ứng trong đề cương ôn tập của kỳ này.',
          'Khen một hành vi cụ thể quan sát được trong buổi.',
        ],
        student: ['Ghi việc về nhà và mục đề cương tương ứng.'],
        success: 'Học sinh nói được bài hôm nay nằm ở phần nào của đề cương kỳ này.',
        pitfall: 'Kết thúc bằng "về nhà ôn lại nhé" — một lời dặn không đo được thì không được thực hiện.',
      },
    ],
    homework: [
      'Ba bài cùng dạng trên hệ thống, làm ngay trong tối hôm đó.',
      'Hoàn thiện trang sổ tay của bài học hôm nay.',
      'Chuẩn bị trước bài của buổi học tiếp theo trên lớp, ghi ra một câu hỏi muốn hỏi.',
    ],
    evidence: [
      'Điểm hệ số 1 trên lớp trong hai tuần kế tiếp.',
      'Tỉ lệ vượt qua bài kiểm chứng lỗi cũ.',
      'Số trang sổ tay hoàn chỉnh so với số bài đã học.',
    ],
  },
  {
    id: 'lp-120-on-kiem-tra',
    name: 'Buổi ôn tập trước kiểm tra định kỳ · 120 phút',
    minutes: 120,
    sheetTypes: ['on-thi', 'thi'],
    tracks: ['chinh-khoa'],
    goal:
      'Học sinh vào phòng kiểm tra với ba thứ: bản đồ kiến thức của kỳ, danh sách dạng bài kèm cách đọc vị, và một lần trải nghiệm làm đề đúng ma trận có tính giờ. Buổi này bám theo đề cương ôn tập của đúng kỳ đó.',
    prepare: [
      'In đề cương ôn tập của kỳ tương ứng; đối chiếu trước với ma trận thật mà trường công bố.',
      'Chuẩn bị một đề tự luyện đúng thời lượng và đúng tỉ trọng bốn mức độ.',
      'Xem bảng phân loại lỗi của lớp từ lần kiểm tra trước để biết cần dừng ở đâu.',
      'Chuẩn bị đồng hồ đếm ngược hiển thị cho cả lớp.',
    ],
    blocks: [
      {
        minutes: 15,
        name: 'Dựng lại bản đồ kiến thức của kỳ',
        purpose: 'Chuyển kiến thức rời rạc của cả kỳ thành một sơ đồ có cấu trúc, thứ học sinh sẽ nhớ lại trong phòng thi.',
        teacher: [
          'Vẽ khung sơ đồ tư duy lên bảng, để trống các nhánh.',
          'Gọi học sinh điền tên nhánh và các nút; không tự điền hộ.',
          'Đối chiếu với sơ đồ tư duy trong đề cương, bổ sung phần lớp bỏ sót.',
        ],
        student: ['Điền sơ đồ và chép lại vào trang đầu vở ôn.'],
        success: 'Sơ đồ trên bảng có đủ số nhánh bằng số chương trong phạm vi kỳ kiểm tra.',
        pitfall: 'Chiếu sẵn sơ đồ hoàn chỉnh. Học sinh nhìn thì hiểu nhưng không nhớ lại được khi cần.',
      },
      {
        minutes: 20,
        name: 'Bảng đọc vị dạng bài',
        purpose: 'Chuyển từ biết công thức sang nhìn đề gọi được tên dạng — kỹ năng quyết định tốc độ làm bài.',
        teacher: [
          'Chiếu lần lượt các đề, mỗi đề 30 giây, chỉ hỏi "dạng gì, dấu hiệu nào, đi hướng nào".',
          'Không cho giải trong khối này.',
          'Ghi bảng hai cột: dấu hiệu trong đề | hướng xử lý.',
        ],
        student: ['Gọi tên dạng và nêu một dấu hiệu.', 'Chép bảng hai cột.'],
        success: 'Bảng hai cột có đủ số dòng bằng số dạng bài trong đề cương của kỳ.',
        pitfall: 'Cho học sinh giải luôn. Giải mất mười phút một bài, đọc vị mất ba mươi giây.',
      },
      {
        minutes: 45,
        name: 'Làm đề tính giờ đúng ma trận',
        purpose: 'Tái tạo điều kiện phòng kiểm tra, gồm cả áp lực thời gian và cảm giác gặp câu bí.',
        teacher: [
          'Thống nhất kế hoạch phân bổ thời gian trước khi bấm giờ.',
          'Không trả lời câu hỏi về nội dung sau khi bắt đầu.',
          'Đi quanh lớp ghi lại ai dừng lâu ở câu nào, ai bỏ trắng.',
        ],
        student: ['Làm bài độc lập, tự quản lý thời gian, khoanh câu bỏ qua để quay lại.'],
        success: 'Ít nhất 80% học sinh đi hết lượt toàn đề trong thời gian quy định.',
        pitfall: 'Gợi ý khi thấy học sinh bí. Việc tự xoay xở khi bí chính là thứ buổi này cần luyện.',
      },
      {
        minutes: 15,
        name: 'Tự chấm theo barem và phân loại lỗi',
        purpose: 'Đưa học sinh sang vai người chấm, và biến điểm số thành dữ liệu thay vì thành cảm xúc.',
        teacher: [
          'Phát barem, hướng dẫn chấm từng mốc điểm.',
          'Yêu cầu phân loại mỗi chỗ mất điểm thành ba nhóm: lỗi kiến thức, lỗi tính toán, lỗi trình bày.',
          'Kiểm tra ngẫu nhiên vài bài để chắc học sinh không tự nới tay.',
        ],
        student: ['Tự chấm bài mình và lập bảng phân loại nguyên nhân mất điểm.'],
        success: 'Mỗi bài có bảng phân loại lỗi, không chỉ có một con điểm.',
        pitfall: 'Giáo viên chấm hộ. Tự chấm theo barem dạy được nhiều hơn nhận lại bài đã chấm.',
      },
      {
        minutes: 20,
        name: 'Chữa theo phổ lỗi của lớp',
        purpose: 'Dồn thời gian vào câu nhiều người sai nhất, thay vì chữa lần lượt từ câu một.',
        teacher: [
          'Thống kê nhanh trên bảng: câu nào bao nhiêu em sai.',
          'Chữa ba câu sai nhiều nhất, mỗi câu nêu rõ dấu hiệu đọc vị đã bị bỏ qua.',
          'Các câu còn lại chỉ nêu đáp số và chỉ chỗ tra trong hệ thống.',
        ],
        student: ['Ghi lại dấu hiệu đã bỏ sót vào sổ tay lỗi.'],
        success: 'Ba câu sai nhiều nhất được chữa kỹ và học sinh chỉ ra được dấu hiệu đã bỏ qua.',
        pitfall: 'Chữa tuần tự từ câu một rồi hết giờ ở giữa đề, trong khi câu sai nhiều nhất nằm ở cuối.',
      },
      {
        minutes: 5,
        name: 'Chốt danh mục tự kiểm',
        purpose: 'Rời buổi học với một danh mục cụ thể để tự soát trước hôm kiểm tra.',
        teacher: [
          'Mở phần danh mục tự kiểm của đề cương kỳ này, đọc từng mục.',
          'Yêu cầu mỗi em đánh dấu những mục mình chưa chắc.',
          'Giao đúng một chuyên đề ưu tiên cho mỗi em cho những ngày còn lại.',
        ],
        student: ['Đánh dấu danh mục tự kiểm và ghi chuyên đề ưu tiên.'],
        success: 'Mỗi học sinh rời lớp với đúng một chuyên đề ưu tiên, không phải một danh sách dài.',
        pitfall: 'Kết thúc bằng việc đọc điểm cả lớp. Điểm là dữ liệu đầu vào, không phải kết quả của buổi.',
      },
    ],
    homework: [
      'Làm lại toàn bộ câu sai trên giấy sạch, không nhìn lời giải.',
      'Hoàn thành danh mục tự kiểm của đề cương, đánh dấu mục đã chắc.',
      'Làm thêm một đề trong bộ đề luyện cùng đợt ôn, tự chấm theo barem.',
    ],
    evidence: [
      'Điểm bài kiểm tra định kỳ so với điểm đề tự luyện ở buổi này.',
      'Tỉ lệ lỗi trình bày so với lỗi kiến thức — lỗi trình bày phải giảm nhanh nhất.',
      'Số mục còn chưa chắc trong danh mục tự kiểm, đếm trước và sau buổi.',
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
  {
    name: 'Chấm mù theo barem',
    when: 'Sau mỗi bài luyện đề, khi muốn học sinh hiểu barem thay vì chỉ nhận điểm.',
    how: [
      'Phát barem và một bài làm ẩn danh (có thể là bài dựng sẵn chứa lỗi điển hình).',
      'Cho học sinh chấm bài đó theo từng mốc điểm, ghi rõ vì sao cho hoặc không cho điểm.',
      'So kết quả chấm giữa các nhóm, tranh luận ở chỗ lệch nhau.',
    ],
    why: 'Học sinh chỉ thực sự hiểu barem khi phải đứng ở vị trí người chấm. Sau một lần chấm mù, lỗi trình bày giảm rất nhanh.',
    avoid: 'Dùng bài của một học sinh trong lớp mà không ẩn danh — biến hoạt động học thành sự kiện xấu hổ.',
  },
  {
    name: 'Ba mươi giây đọc vị trước khi giải',
    when: 'Mọi lúc trước khi cho học sinh bắt tay vào giải một bài mới.',
    how: [
      'Chiếu đề, không cho viết gì trong 30 giây.',
      'Hỏi đúng ba câu: dạng gì, dấu hiệu nào cho biết, đi hướng nào.',
      'Chỉ sau khi có câu trả lời mới cho đặt bút.',
    ],
    why: 'Học sinh yếu thường lao vào tính ngay và đi sai hướng. Ba mươi giây này rẻ hơn nhiều so với năm phút đi lạc.',
    avoid: 'Rút ngắn xuống 5 giây vì sốt ruột. Dưới 20 giây thì chỉ những em nhanh nhất kịp nghĩ.',
  },
  {
    name: 'Hỏi ngược thay vì giải hộ',
    when: 'Khi đi quanh lớp và học sinh giơ tay vì bí.',
    how: [
      'Hỏi "em đang mắc ở bước nào" thay vì nhìn vào bài rồi chỉ luôn.',
      'Nếu em không chỉ ra được bước, yêu cầu em đọc to đề cho mình nghe.',
      'Chỉ gợi ý một bước, rồi đi tiếp, quay lại sau hai phút.',
    ],
    why: 'Giải hộ một bài giúp học sinh qua được bài đó; hỏi ngược giúp em qua được cả những bài sau.',
    avoid: 'Ngồi xuống cạnh một em và giải trọn bài. Vừa mất 10 phút, vừa dạy em ấy rằng cứ giơ tay là có lời giải.',
  },
  {
    name: 'Bảng hai cột: dấu hiệu | hướng đi',
    when: 'Khi dạy phần đọc vị dạng bài của một chuyên đề.',
    how: [
      'Kẻ bảng hai cột trên bảng, cột trái ghi dấu hiệu xuất hiện trong đề, cột phải ghi hướng xử lý.',
      'Mỗi dạng của chuyên đề là một dòng, do học sinh nói ra chứ không do giáo viên đọc.',
      'Cuối buổi chụp lại bảng gửi vào nhóm lớp.',
    ],
    why: 'Kiến thức nằm rời rạc trong đầu học sinh cho tới khi được xếp thành một bảng có cấu trúc. Bảng này chính là thứ các em nhớ lại trong phòng thi.',
    avoid: 'Phát sẵn bảng đã điền đầy. Giá trị nằm ở quá trình học sinh tự điền, không nằm ở tờ giấy.',
  },
  {
    name: 'Đếm ngược thời gian công khai',
    when: 'Mọi hoạt động có tính giờ, đặc biệt ở luồng vào 6 và luồng thi tốt nghiệp.',
    how: [
      'Hiển thị đồng hồ đếm ngược cho cả lớp nhìn thấy.',
      'Báo mốc ở nửa thời gian và ở 5 phút cuối.',
      'Dừng đúng giờ, kể cả khi nhiều em chưa xong.',
    ],
    why: 'Áp lực thời gian là một biến số của kỳ thi và phải được luyện như mọi kỹ năng khác. Học sinh chỉ quen với nó khi được tiếp xúc thường xuyên.',
    avoid: 'Cho thêm giờ vì thương. Cho thêm giờ ở lớp nghĩa là để học sinh bất ngờ ở phòng thi.',
  },
  {
    name: 'Khen quá trình, không khen năng lực',
    when: 'Mọi lần ghi nhận học sinh, đặc biệt với học sinh tiểu học.',
    how: [
      'Nói rõ hành vi được ghi nhận: "con đã vẽ sơ đồ trước khi tính".',
      'Tránh các nhãn cố định như "con giỏi Toán", "em có năng khiếu".',
      'Với học sinh làm sai nhưng làm đúng quy trình, vẫn ghi nhận phần quy trình.',
    ],
    why: 'Khen năng lực khiến học sinh né bài khó để giữ nhãn "giỏi". Khen quá trình khiến các em sẵn sàng thử bài khó hơn.',
    avoid: 'Khen chung chung "giỏi lắm" — không cho học sinh biết cần lặp lại điều gì.',
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
  {
    situation: 'Học sinh lớp 4–5 làm sai nhưng đã vẽ đúng sơ đồ',
    signal: 'Sơ đồ đoạn thẳng đúng, phép tính sai ở bước cuối.',
    say:
      '“Phần khó nhất con đã làm đúng rồi: con nhìn ra được bài này có mấy phần. Chỗ sai nằm ở phép chia thôi, mình sửa lại một chút là xong.”',
    then: 'Chỉ chữa đúng phép tính sai, giữ nguyên phần sơ đồ để học sinh thấy phần mình làm đúng.',
    never: 'Gạch cả bài và bảo làm lại từ đầu — xoá mất phần học sinh đã làm đúng và làm em nghĩ mình sai toàn bộ.',
  },
  {
    situation: 'Học sinh mất điểm vì trình bày, không phải vì kiến thức',
    signal: 'Đáp số đúng nhưng barem trừ điểm do thiếu điều kiện, thiếu câu lời giải hoặc thiếu đơn vị.',
    say:
      '“Về Toán em đã đúng. Nhưng bài thi chấm theo barem, mà barem cho điểm ở những dòng em bỏ qua. Đây là loại điểm dễ lấy lại nhất trong toàn bộ đề.”',
    then: 'Cho làm lại đúng bài đó, chỉ chấm phần trình bày; lặp lại ở hai bài nữa trong tuần.',
    never: 'Nói “lần sau nhớ ghi đơn vị nhé” rồi thôi. Lỗi trình bày chỉ mất khi được luyện, không mất vì được nhắc.',
  },
  {
    situation: 'Học sinh bỏ trắng câu khó dù còn thời gian',
    signal: 'Bài nộp còn 10 phút thừa nhưng câu cuối để trắng hoàn toàn.',
    say:
      '“Barem chấm theo từng bước, nên viết được bước một vẫn có điểm bước một. Bỏ trắng là cách duy nhất chắc chắn được 0 điểm.”',
    then: 'Cho em viết lại bước đầu tiên của chính câu đó ngay tại lớp, rồi chỉ ra em vừa kiếm được bao nhiêu điểm.',
    never: 'Nói “câu đó khó, bỏ cũng được”. Câu nói này khiến học sinh bỏ luôn cả những câu vừa sức ở đề sau.',
  },
  {
    situation: 'Phụ huynh sốt ruột vì con chưa tiến bộ sau một tháng',
    signal: 'Phụ huynh nhắn hỏi về kết quả, so sánh với bạn cùng lớp.',
    say:
      '“Anh/chị xem giúp em ba số này: KPI trung bình, số lỗi lặp lại, và số chuyên đề đã đạt chuẩn. Điểm số dao động theo từng đề, nhưng ba số này cho thấy xu hướng thật, và cả ba đều đang cải thiện.”',
    then: 'Gửi báo cáo tuần trong hệ thống kèm đúng một việc gia đình có thể hỗ trợ trong tuần tới.',
    never: 'Hứa một mốc điểm hoặc hứa đỗ. Không ai kiểm chứng được lời hứa đó, và nó sẽ quay lại làm hỏng niềm tin.',
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
  {
    name: 'Sổ tay lỗi cuối buổi',
    when: 'Năm phút cuối mọi buổi học',
    minutes: 5,
    steps: [
      'Mỗi học sinh chọn đúng một lỗi mình mắc trong buổi.',
      'Ghi ba dòng: đề hỏi gì — mình đã làm gì — đúng ra phải làm gì.',
      'Bắt buộc viết bằng lời của chính mình, không chép bảng.',
    ],
    why: 'Lỗi được viết lại bằng ngôn ngữ của chính người mắc thì được nhớ lâu hơn nhiều so với lỗi được nghe giảng.',
  },
  {
    name: 'Một phút dự đoán điểm',
    when: 'Ngay sau khi nộp bài luyện đề, trước khi biết kết quả',
    minutes: 1,
    steps: [
      'Học sinh viết ra điểm dự đoán của mình lên góc tờ đề.',
      'Sau khi chấm, so điểm thật với điểm dự đoán.',
      'Ghi lại độ lệch và nguyên nhân lệch.',
    ],
    why: 'Khoảng cách giữa điểm dự đoán và điểm thật đo được mức độ học sinh hiểu chính mình. Khoảng cách này thu hẹp dần là dấu hiệu tiến bộ rõ hơn cả điểm số.',
  },
  {
    name: 'Bảng chuyên đề ưu tiên của tuần',
    when: 'Đầu mỗi tuần, trong 4 phút',
    minutes: 4,
    steps: [
      'Mỗi học sinh viết tên đúng một chuyên đề ưu tiên lên bảng lớp.',
      'Giáo viên nhóm các em cùng chuyên đề lại để ghép cặp hỗ trợ.',
      'Cuối tuần xoá tên những em đã đạt chuẩn chuyên đề đó.',
    ],
    why: 'Một chuyên đề ưu tiên tại một thời điểm là nguyên tắc 20/80 áp dụng ở cấp độ tuần. Danh sách dài khiến học sinh làm dàn trải và không dứt điểm được chỗ nào.',
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
