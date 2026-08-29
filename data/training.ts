/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  MentorBlock,
  MentorStage,
  CoachRung,
  AdvancedCourse,
  ExcellenceShift,
} from '../types';
import {nhipHoc} from './nhip';

/* ==========================================================================
   TẦNG ĐÀO TẠO NÂNG CAO
   Bốn khoá hiện có dừng ở bậc 1–3, tức là làm được việc. Tầng này trả lời câu
   hỏi khác: làm sao để người đã làm được việc trở thành người dạy được người
   khác làm việc đó.
   ========================================================================== */

export const TRAINING_CREED = {
  name: 'ĐÀO TẠO NGƯỜI ĐI DẠY',
  claim:
    'Bốn khoá nhập môn tạo ra người làm được việc. Tầng này tạo ra người nhân bản được năng lực đó sang người khác.',
  why:
    'Một học viện chỉ lớn được bằng tốc độ đào tạo người dạy, không phải bằng tốc độ tuyển học viên. Tuyển nhanh hơn đào tạo là cách chắc chắn nhất để chất lượng tụt.',
  ratio:
    'Nguyên tắc vận hành: mỗi coach bậc 4 phải kèm được hai coach bậc 2 song song với công việc chính. Không đạt tỉ lệ đó thì dừng tuyển học viên mới, không hạ chuẩn coach.',
  hardTruth:
    'Không phải ai làm giỏi cũng dạy được. Đây là hai năng lực khác nhau, và nhiều người xuất sắc ở việc thứ nhất sẽ không bao giờ đạt việc thứ hai. Hệ thống phải nói thẳng điều đó thay vì thăng chức cho người giỏi việc rồi để họ thất bại ở vai mới.',
};

/* ======================= KÈM CẶP MỘT KÈM MỘT ============================ */

export const MENTOR_CREED = {
  name: 'KÈM CẶP 1–1',
  claim:
    'Sáu mươi phút mỗi buổi, học viên nói ba mươi lăm phút. Cố vấn nói ít hơn học viên — luôn luôn.',
  why:
    'Buổi kèm cặp mà cố vấn nói nhiều hơn là buổi giảng bài trá hình. Giảng bài thì đã có video, rẻ hơn và lặp lại được. Một kèm một chỉ đáng giá khi nó làm được thứ video không làm được: nhìn thấy đúng chỗ người này đang mắc.',
  notTherapy:
    'Kèm cặp không phải trị liệu tâm lý. Khi vấn đề của học viên vượt ra ngoài việc học — trầm cảm, khủng hoảng gia đình, kiệt sức — cố vấn phải dừng lại và nói thẳng rằng mình không có chuyên môn đó, thay vì cố giúp bằng thiện chí.',
  endsOnPurpose:
    'Kèm cặp có ngày kết thúc, ghi rõ từ buổi đầu. Mục tiêu là học viên không cần cố vấn nữa. Một chương trình kèm cặp kéo dài vô hạn là chương trình đã thất bại ở mục tiêu chính của nó.',
};

export const MENTOR_SESSION: MentorBlock[] = [
  {
    slot: 'SỐ LIỆU',
    minutes: 5,
    who: 'cố vấn nói',
    what:
      'Cố vấn mở bảng chỉ số hai tuần qua và đọc ra ba con số, không bình luận: chuỗi ngày, độ trễ phản xạ, kết quả bài tuần.',
    why:
      'Bắt đầu bằng dữ liệu thay vì bằng cảm nhận. Nếu bắt đầu bằng "em thấy tuần này thế nào", buổi kèm sẽ trôi theo tâm trạng hôm đó.',
  },
  {
    slot: 'HỌC VIÊN KỂ',
    minutes: 15,
    who: 'học viên nói',
    what:
      'Học viên kể lại hai tuần: làm được gì, chỗ nào tắc, đã thử cách nào. Cố vấn KHÔNG ngắt lời, chỉ ghi.',
    why:
      'Mười lăm phút không bị ngắt là điều kiện để người ta nói ra chỗ tắc thật. Ngắt sớm thì chỉ nghe được chỗ tắc dễ nói.',
  },
  {
    slot: 'ĐÀO SÂU',
    minutes: 10,
    who: 'cả hai',
    what:
      'Cố vấn hỏi tiếp năm lần liên tiếp từ chỗ tắc lớn nhất, không đưa giải pháp. Câu hỏi bắt đầu bằng "khi nào", "ở đâu", "lần gần nhất".',
    why:
      'Chỗ tắc học viên tự nêu thường là triệu chứng, không phải nguyên nhân. Năm câu hỏi là khoảng đủ để chạm nguyên nhân mà chưa thành thẩm vấn.',
  },
  {
    slot: 'LÀM THỬ',
    minutes: 15,
    who: 'học viên nói',
    what:
      'Học viên làm ngay tại chỗ đúng việc đang tắc — nói, đọc, viết. Cố vấn quan sát và ghi lỗi, không sửa giữa chừng.',
    why:
      'Đây là khối duy nhất video không thay được. Cố vấn phải NHÌN THẤY học viên làm, vì phần lớn lỗi không hiện ra trong lời kể.',
  },
  {
    slot: 'MỘT ĐIỀU',
    minutes: 10,
    who: 'cố vấn nói',
    what:
      'Cố vấn chọn ĐÚNG MỘT điều để sửa trong hai tuần tới, giải thích vì sao chọn điều đó, và cùng học viên viết ra cách đo.',
    why:
      'Chỉ một. Cố vấn nào cũng nhìn thấy năm điều cần sửa, và nói ra cả năm là cách chắc chắn để không điều nào được sửa.',
  },
  {
    slot: 'CHỐT',
    minutes: 5,
    who: 'học viên nói',
    what:
      'Học viên nói lại bằng lời của mình: điều cần sửa là gì, làm thế nào, đo bằng gì, và ngày nào báo lại.',
    why:
      'Người nghe hiểu khác người nói tưởng. Bắt học viên nói lại là cách rẻ nhất để bắt lỗi hiểu sai ngay trong buổi.',
  },
];

export const MENTOR_STAGES: MentorStage[] = [
  {
    no: 1,
    name: 'DỰNG NỀN',
    when: 'Tháng 1–3',
    frequency: 'Mỗi tuần một buổi',
    focus:
      'Cài thói quen và chuỗi ngày. Chưa bàn tới kỹ thuật — người chưa giữ được chuỗi thì kỹ thuật nào cũng vô nghĩa.',
    handover: 'Học viên tự giữ được chuỗi 21 ngày không cần ai nhắc.',
  },
  {
    no: 2,
    name: 'CHỈNH KỸ THUẬT',
    when: 'Tháng 4–9',
    frequency: 'Hai tuần một buổi',
    focus:
      'Sửa lỗi kỹ thuật lặp lại. Đây là chặng cố vấn tạo ra nhiều giá trị nhất, vì lỗi đã đủ ổn định để nhìn ra quy luật.',
    handover: 'Học viên tự đọc được sổ lỗi của mình và tự chọn được đơn kê.',
  },
  {
    no: 3,
    name: 'GIÃN DẦN',
    when: 'Tháng 10–18',
    frequency: 'Bốn tuần một buổi',
    focus:
      'Chuyển quyền quyết định sang học viên. Cố vấn chỉ phản biện lựa chọn, không đưa lựa chọn.',
    handover: 'Học viên tự lập kế hoạch quý và bảo vệ được kế hoạch đó.',
  },
  {
    no: 4,
    name: 'ĐỒNG NGHIỆP',
    when: 'Tháng 19 trở đi',
    frequency: 'Theo yêu cầu, tối đa mỗi quý một buổi',
    focus:
      'Không còn kèm. Hai người bàn chuyện ngang hàng về những ca khó mà học viên đang tự xử lý.',
    handover:
      'Kết thúc chương trình kèm cặp. Học viên chuyển sang vai người kèm cho người mới.',
  },
];

export const MENTOR_RULES = [
  'Cố vấn nói ít hơn học viên trong mọi buổi. Có đo bằng ghi âm, không tin cảm nhận.',
  'Mỗi buổi chốt đúng MỘT điều cần sửa. Không bao giờ hai.',
  'Không đổi điều cần sửa khi chưa đo xong điều cũ — dù đã nhìn thấy chỗ khác đáng sửa hơn.',
  'Không nhận kèm quá sáu học viên cùng lúc. Vượt số đó thì chất lượng buổi tụt, đã thấy trên dữ liệu.',
  'Buổi bị huỷ phải dời trong vòng bảy ngày, không bỏ. Huỷ hai buổi liên tiếp là tín hiệu cần cấp trên vào.',
  'Không kèm người thân hoặc bạn thân của mình. Quan hệ cá nhân làm hỏng khả năng nói thẳng.',
  'Khi vấn đề vượt ra ngoài việc học, nói thẳng là mình không có chuyên môn đó và chuyển tiếp.',
];

/* =========================== THANG NGHỀ COACH ============================ */

export const COACH_LADDER: CoachRung[] = [
  {
    no: 1,
    name: 'TRỢ GIẢNG',
    epithet: 'Người ngồi cùng phòng và học bằng cách nhìn',
    entry: 'Đã qua khoá nhập môn coach và đạt bậc 2 kiểm định.',
    caseLoad: 'Không có ca riêng.',
    supervisedHours: 40,
    soloHours: 0,
    mustShow: [
      'Ghi biên bản 20 buổi kèm của coach chính, mỗi biên bản nêu được điều cần sửa mà coach đã chọn và vì sao',
      'Dự đoán trước điều coach sẽ chọn, đúng ít nhất 12/20 lần',
      'Chấm được 30 bài theo khung 4 phần, lệch dưới một bậc so với coach chính',
    ],
    gate: 'Coach chính ký xác nhận đủ 40 giờ và bảng dự đoán đạt.',
    canDo: 'Chấm bài có người soát lại. Trả lời câu hỏi kỹ thuật đơn giản.',
    cannotYet: 'Không được dẫn buổi kèm. Không được kê lộ trình.',
  },
  {
    no: 2,
    name: 'COACH TẬP SỰ',
    epithet: 'Người dẫn buổi đầu tiên với người ngồi sau lưng',
    entry: 'Đã qua bậc TRỢ GIẢNG.',
    caseLoad: 'Hai học viên, cả hai đều ở chặng DỰNG NỀN.',
    supervisedHours: 60,
    soloHours: 0,
    mustShow: [
      'Dẫn 24 buổi có coach chính dự, giữ được tỉ lệ học viên nói trên 55%',
      'Chốt đúng một điều mỗi buổi, không lần nào chốt hai',
      'Hai học viên đều giữ được chuỗi 21 ngày',
    ],
    gate: 'Ba buổi liên tiếp coach chính không phải can thiệp lần nào.',
    canDo: 'Dẫn buổi kèm cho học viên chặng 1. Chấm bài độc lập.',
    cannotYet:
      'Không được nhận ca chặng 2 trở lên. Không được xử lý ca có nguy cơ bỏ cuộc.',
  },
  {
    no: 3,
    name: 'COACH',
    epithet: 'Người tự đứng được với ca thường',
    entry: 'Đã qua bậc COACH TẬP SỰ và đạt bậc 3 kiểm định.',
    caseLoad: 'Sáu học viên, tối đa hai ca ở chặng CHỈNH KỸ THUẬT.',
    supervisedHours: 20,
    soloHours: 120,
    mustShow: [
      'Sáu học viên, ít nhất bốn người tiến bộ đo được sau 90 ngày',
      'Sổ ca ghi đủ: mỗi buổi một điều cần sửa, kết quả đo lại, và điều đã thử mà không hiệu quả',
      'Xử lý được ít nhất ba ca đứt chuỗi và kéo về được hai',
    ],
    gate: 'Hội đồng đọc sổ ca và phỏng vấn về ba ca khó nhất.',
    canDo: 'Toàn bộ chặng 1 và 2. Kê đơn từ kho giải pháp.',
    cannotYet: 'Không được kèm coach khác. Không được đổi lộ trình dài hạn.',
  },
  {
    no: 4,
    name: 'COACH DẪN DẮT',
    epithet: 'Người kèm được coach, không chỉ kèm được học viên',
    entry: 'Đã qua bậc COACH, tối thiểu 12 tháng và 300 giờ ca thật.',
    caseLoad: 'Bốn học viên và hai coach tập sự.',
    supervisedHours: 0,
    soloHours: 300,
    mustShow: [
      'Hai coach tập sự do mình kèm đều lên được bậc COACH',
      'Viết được ba bài phân tích ca đưa vào thư viện học viện',
      'Nhận và xử lý được ca mà coach bậc 3 đã trả lại',
    ],
    gate:
      'Đo bằng kết quả của NGƯỜI KHÁC: hai coach mình kèm phải lên bậc. Không có đường tắt nào cho tiêu chí này.',
    canDo: 'Mọi chặng kèm cặp. Kèm coach. Duyệt đơn kê của coach bậc dưới.',
    cannotYet: 'Không được một mình quyết định thay đổi chuẩn chuyên môn.',
  },
  {
    no: 5,
    name: 'CHỦ NHIỆM CHUYÊN MÔN',
    epithet: 'Người giữ chuẩn cho cả hệ thống',
    entry: 'Đã qua bậc COACH DẪN DẮT và được hội đồng mời.',
    caseLoad: 'Hai học viên để không mất nghề, và toàn bộ đội coach.',
    supervisedHours: 0,
    soloHours: 800,
    mustShow: [
      'Bốn coach dẫn dắt trưởng thành dưới tay mình',
      'Chuẩn chuyên môn được sửa ít nhất một lần dựa trên dữ liệu, có ghi rõ vì sao đổi',
      'Hai học viên riêng vẫn tiến bộ — người bỏ hẳn ca thật sẽ mất cảm giác nghề trong vòng một năm',
    ],
    gate: 'Hội đồng học viện bỏ phiếu, có mặt đại diện học viên.',
    canDo: 'Đề xuất sửa chuẩn chuyên môn. Chủ trì hội đồng thi tầng.',
    cannotYet:
      'Không được tự sửa chuẩn mà không qua hội đồng. Không được miễn thi cho bất kỳ ai.',
  },
];

/* ==================== BỐN KHOÁ NÂNG CAO — BẬC 4–5 ======================= */

/**
 * Quy ước: totalHours là GIỜ CÓ HƯỚNG DẪN, tức đúng tổng thời lượng các mô-đun
 * làm tròn tới giờ. Bài tốt nghiệp nằm ngoài con số này vì thời gian làm nó
 * phụ thuộc vào kết quả của người khác, không định trước được. Có bài kiểm tra
 * tự động canh đúng quy ước này.
 */
export const ADVANCED_COURSES: AdvancedCourse[] = [
  {
    id: 'a-ctv-2',
    role: 'CỘNG TÁC VIÊN',
    level: 'Bậc 4–5 · Dẫn nhóm tới Xây đội',
    name: 'Xây đội cộng tác viên',
    entry: 'Đã qua khoá nhập môn và giới thiệu thành công tối thiểu 20 ca.',
    totalHours: 10,
    weeks: 6,
    cadence: nhipHoc(10, 6),
    promise:
      'Từ người tự làm tốt thành người làm cho năm người khác cùng làm tốt.',
    modules: [
      {no: 1, name: 'Vì sao người giỏi việc thường dạy dở', minutes: 90, format: 'Video + tự soi', outcome: 'Nhận ra lời nguyền kiến thức của chính mình', gate: 'Viết ba điều mình tưởng ai cũng biết'},
      {no: 2, name: 'Dạy bằng cách cho làm, không bằng cách nói', minutes: 120, format: 'Thực hành có ghi hình', outcome: 'Người mới làm được trong buổi đầu', gate: 'Ba người mới đều làm được'},
      {no: 3, name: 'Bốn lỗi phổ biến của cộng tác viên mới', minutes: 90, format: 'Phân tích ca thật', outcome: 'Bắt được lỗi trước khi nó thành thói quen', gate: 'Nhận diện đúng 8/10 ca'},
      {no: 4, name: 'Đặt chỉ tiêu mà không tạo áp lực hứa hão', minutes: 120, format: 'Tình huống + tranh luận', outcome: 'Chỉ tiêu theo đầu vào, không theo đầu ra', gate: 'Bảo vệ được bộ chỉ tiêu trước hội đồng'},
      {no: 5, name: 'Khi một người trong đội nói sai về hệ thống', minutes: 90, format: 'Mô phỏng ca khó', outcome: 'Sửa mà không làm mất mặt', gate: 'Mô phỏng đạt, hai người chấm'},
      {no: 6, name: 'Bàn giao đội cho người kế nhiệm', minutes: 60, format: 'Hướng dẫn + checklist', outcome: 'Đội chạy được khi mình vắng hai tuần', gate: 'Thực hiện thật, có kiểm chứng'},
    ],
    capstone:
      'Xây một nhóm ba người mới từ đầu, cả ba giới thiệu thành công ít nhất hai ca trong 60 ngày. Đo bằng kết quả của họ, không đo bằng kết quả của mình.',
    certification: 'Chứng nhận CỘNG TÁC VIÊN DẪN NHÓM, xét lại mỗi 12 tháng.',
  },
  {
    id: 'a-consult-2',
    role: 'TƯ VẤN',
    level: 'Bậc 4–5 · Ca khó tới Chuẩn hoá',
    name: 'Ca khó và chuẩn tư vấn',
    entry: 'Đã qua khoá nhập môn và xử lý tối thiểu 80 ca có hồ sơ.',
    totalHours: 20,
    weeks: 9,
    cadence: nhipHoc(20, 9),
    promise:
      'Xử lý được ca mà tư vấn bậc 3 phải trả lại, và viết được chuẩn cho người sau.',
    modules: [
      {no: 1, name: 'Ba loại ca luôn bị trả lại', minutes: 150, format: 'Phân tích 30 ca thật', outcome: 'Nhận ra dạng ca trong năm phút đầu', gate: 'Phân loại đúng 25/30'},
      {no: 2, name: 'Khách đã thất bại ở ba nơi khác', minutes: 180, format: 'Mô phỏng ca khó nhất', outcome: 'Không hứa hơn nơi trước, mà hứa khác nơi trước', gate: 'Mô phỏng đạt, ba người chấm'},
      {no: 3, name: 'Phụ huynh và học viên muốn hai thứ khác nhau', minutes: 180, format: 'Mô phỏng ba bên', outcome: 'Làm rõ mâu thuẫn thay vì né nó', gate: 'Mô phỏng đạt'},
      {no: 4, name: 'Khi phải nói lộ trình cần gấp đôi thời gian khách nghĩ', minutes: 150, format: 'Mô phỏng + phân tích', outcome: 'Nói thẳng mà khách vẫn ở lại', gate: 'Tỉ lệ ở lại trên 60% trong ca thật'},
      {no: 5, name: 'Viết chuẩn tư vấn cho một dạng ca', minutes: 210, format: 'Bài viết + phản biện', outcome: 'Chuẩn dùng được bởi người chưa gặp dạng ca đó', gate: 'Hai tư vấn bậc 2 dùng thử và đạt'},
      {no: 6, name: 'Kèm tư vấn tập sự', minutes: 180, format: 'Ca thật có giám sát', outcome: 'Tư vấn tập sự tự đứng được', gate: 'Người mình kèm lên được bậc 3'},
      {no: 7, name: 'Đọc dữ liệu để sửa chuẩn', minutes: 150, format: 'Thực hành trên số liệu thật', outcome: 'Đề xuất sửa chuẩn có bằng chứng', gate: 'Đề xuất được hội đồng chấp nhận'},
    ],
    capstone:
      'Nhận năm ca đã bị trả lại, xử lý trọn, và viết lại chuẩn cho dạng ca đó. Ba trong năm ca phải chuyển thành học viên đang học sau 90 ngày.',
    certification: 'Chứng nhận TƯ VẤN CHUẨN HOÁ, xét lại mỗi 12 tháng.',
  },
  {
    id: 'a-coach-2',
    role: 'COACH',
    level: 'Bậc 4–5 · Dẫn dắt tới Chủ nhiệm',
    name: 'Kèm coach và giữ chuẩn',
    entry: 'Đã qua bậc COACH, tối thiểu 12 tháng và 300 giờ ca thật.',
    totalHours: 24,
    weeks: 12,
    cadence: nhipHoc(24, 12),
    promise:
      'Từ người kèm được học viên thành người kèm được coach — đo bằng việc coach mình kèm lên bậc.',
    modules: [
      {no: 1, name: 'Vì sao kèm coach khác hẳn kèm học viên', minutes: 150, format: 'Video + phân tích ca', outcome: 'Chuyển từ sửa kỹ thuật sang sửa cách nhìn', gate: 'Phân tích ba ca đạt'},
      {no: 2, name: 'Nhìn ra điều coach đang bỏ sót', minutes: 210, format: 'Dự buổi + biên bản', outcome: 'Chỉ ra chỗ sót mà coach không tự thấy', gate: 'Đúng 8/12 buổi dự'},
      {no: 3, name: 'Phản hồi cho người đã có kinh nghiệm', minutes: 180, format: 'Mô phỏng + ghi hình', outcome: 'Nói thẳng mà không làm mất tự tin nghề', gate: 'Mô phỏng đạt, ba người chấm'},
      {no: 4, name: 'Ca coach trả lại — khi nào nhận, khi nào không', minutes: 180, format: 'Phân tích 20 ca', outcome: 'Biết ca nào vượt khả năng của cả mình', gate: 'Quyết định đúng 16/20'},
      {no: 5, name: 'Đọc sổ ca của coach khác', minutes: 150, format: 'Thực hành trên sổ thật', outcome: 'Phát hiện lệch chuẩn từ chữ viết', gate: 'Phát hiện đúng 7/10 sổ có vấn đề'},
      {no: 6, name: 'Coach kiệt sức — nhận ra và xử lý', minutes: 150, format: 'Tình huống + quy trình', outcome: 'Can thiệp trước khi mất người', gate: 'Nhận diện đúng 5/6 ca'},
      {no: 7, name: 'Viết bài phân tích ca cho thư viện', minutes: 210, format: 'Bài viết + phản biện', outcome: 'Bài dùng được bởi coach chưa gặp ca đó', gate: 'Hai coach bậc 3 dùng thử và đạt'},
      {no: 8, name: 'Đề xuất sửa chuẩn chuyên môn', minutes: 180, format: 'Phân tích dữ liệu + bảo vệ', outcome: 'Đề xuất có bằng chứng, không có cảm tính', gate: 'Bảo vệ trước hội đồng'},
    ],
    capstone:
      'Kèm hai coach tập sự trọn một chu kỳ. Cả hai phải lên được bậc COACH. Đây là tiêu chí đo bằng kết quả của người khác, không có đường tắt.',
    certification: 'Chứng nhận COACH DẪN DẮT, xét lại mỗi 12 tháng.',
  },
  {
    id: 'a-teacher-2',
    role: 'GIÁO VIÊN',
    level: 'Bậc 4–5 · Thiết kế tới Chủ biên',
    name: 'Thiết kế học liệu và chủ biên',
    entry: 'Đã qua khoá nhập môn và dạy tối thiểu 400 giờ có đánh giá.',
    totalHours: 20,
    weeks: 10,
    cadence: nhipHoc(20, 10),
    promise:
      'Từ người dạy giỏi một lớp thành người thiết kế được thứ hàng trăm lớp dùng.',
    modules: [
      {no: 1, name: 'Từ bài giảng hay tới học liệu dùng được', minutes: 150, format: 'Video + phân tích', outcome: 'Phân biệt được hai thứ đó', gate: 'Phân tích năm bộ học liệu'},
      {no: 2, name: 'Thiết kế ngược từ bài kiểm tra', minutes: 180, format: 'Thực hành thiết kế', outcome: 'Bài kiểm tra viết trước, nội dung viết sau', gate: 'Một mô-đun hoàn chỉnh đạt'},
      {no: 3, name: 'Viết cho giáo viên chưa từng gặp mình', minutes: 180, format: 'Bài viết + thử nghiệm', outcome: 'Giáo viên lạ dạy được không cần hỏi', gate: 'Hai giáo viên dạy thử và đạt'},
      {no: 4, name: 'Đo học liệu bằng dữ liệu lớp học', minutes: 180, format: 'Phân tích số liệu thật', outcome: 'Biết mô-đun nào không hiệu quả', gate: 'Chỉ ra đúng ba mô-đun yếu'},
      {no: 5, name: 'Sửa học liệu mà không phá tính nhất quán', minutes: 150, format: 'Thực hành sửa', outcome: 'Sửa một chỗ không làm hỏng chỗ khác', gate: 'Bản sửa qua kiểm tra tham chiếu'},
      {no: 6, name: 'Chủ biên một chuỗi bài giảng', minutes: 210, format: 'Dự án + phản biện', outcome: 'Chuỗi có mạch, không phải tập hợp bài rời', gate: 'Hội đồng chuyên môn duyệt'},
      {no: 7, name: 'Kèm giáo viên mới', minutes: 150, format: 'Ca thật có giám sát', outcome: 'Giáo viên mới đứng lớp được', gate: 'Người mình kèm đạt bậc 3'},
    ],
    capstone:
      'Thiết kế trọn một chuỗi 12 bài, giao cho hai giáo viên chưa từng gặp mình dạy thử. Đo bằng kết quả học viên của họ, không đo bằng ý kiến của họ về tài liệu.',
    certification: 'Chứng nhận GIÁO VIÊN CHỦ BIÊN, xét lại mỗi 12 tháng.',
  },
];

/* ====================== LỘ TRÌNH HỌC XUẤT SẮC =========================== */

export const EXCELLENCE_CREED = {
  name: 'LỘ TRÌNH XUẤT SẮC',
  claim:
    'Không phải lộ trình chuẩn với nhiều giờ hơn. Là một cách luyện khác, cho người đã chứng minh được nền tảng.',
  whyNotForEveryone:
    'Lộ trình này rút 36 tháng xuống khoảng 24, nhưng nó không nhanh hơn với tất cả mọi người — nó chỉ nhanh hơn với người đã đạt đủ bốn điều kiện vào. Mở nó cho người chưa đủ điều kiện là cách chắc chắn để họ gãy ở tháng thứ tư.',
  theTrap:
    'Cạm bẫy lớn nhất của mọi lộ trình xuất sắc là nhầm cường độ với chất lượng. Tăng từ 45 lên 90 phút mỗi ngày mà vẫn luyện trong vùng thoải mái thì chỉ tạo ra mệt mỏi, không tạo ra năng lực. Sáu khác biệt dưới đây không có khác biệt nào là "học nhiều hơn".',
  honestCost:
    'Lộ trình này đắt về mặt cảm xúc. Nó đặt người học vào trạng thái sai nhiều hơn đúng trong phần lớn thời gian, và không phải ai cũng chịu được điều đó trong hai năm — kể cả người rất giỏi.',
};

export const EXCELLENCE_GATES = [
  'Đã đi hết 180 ngày liên tục với tối thiểu 150 ngày có bằng chứng. Không có ngoại lệ cho người mới, kể cả người có nền sẵn.',
  'Đạt bài 90 ngày ở cả bốn kỹ năng, không kỹ năng nào hụt quá một bậc.',
  'Đã tự kéo mình về sau ít nhất một lần đứt chuỗi. Người chưa từng gãy thì chưa biết mình gãy kiểu gì.',
  'Có ít nhất 60 phút mỗi ngày ổn định trong 18 tháng tới, và điều đó đã được kiểm chứng bằng lịch thật, không bằng dự định.',
];

export const EXCELLENCE_SHIFTS: ExcellenceShift[] = [
  {
    no: 1,
    dimension: 'Vùng luyện',
    standard: 'Luyện ở mức vừa sức, đúng khoảng làm được 80%.',
    excellence:
      'Luyện ở mức đúng khoảng 60% — tức là sai nhiều hơn quen. Mỗi khi tỉ lệ đúng vượt 75% thì nâng mức ngay.',
    why:
      'Tiến bộ sinh ra ở rìa khả năng. Ở mức 80% đúng, phần lớn thời gian là củng cố thứ đã biết.',
    cost:
      'Cảm giác kém đi trong vài tuần đầu, và cảm giác đó không hết. Người cần cảm giác thành công hằng ngày sẽ không chịu được.',
  },
  {
    no: 2,
    dimension: 'Độ trễ phản hồi',
    standard: 'Nộp bài, nhận nhận xét sau 24–48 giờ.',
    excellence:
      'Phản hồi trong vòng vài giây tới vài phút, ngay trong lúc luyện. Ưu tiên bài tự chấm được bằng máy hơn bài phải chờ người.',
    why:
      'Phản hồi càng gần lúc mắc lỗi thì càng gắn được vào đúng chỗ. Sau 48 giờ, người học đã quên mình nghĩ gì lúc làm sai.',
    cost:
      'Phải chọn bài tập theo tiêu chí đo được ngay, nên bỏ mất một số dạng bài hay mà chỉ người mới chấm được.',
  },
  {
    no: 3,
    dimension: 'Nguồn nội dung',
    standard: 'Học liệu biên soạn theo cấp độ.',
    excellence:
      'Nội dung thật chưa qua biên tập, đúng lĩnh vực người học sẽ dùng tiếng Anh để làm việc.',
    why:
      'Học liệu biên soạn đã lọc bỏ đúng những thứ khó nhất của đời thật: tốc độ, tạp âm, cấu trúc lộn xộn, từ chuyên ngành.',
    cost:
      'Mất khoảng hai tháng đầu rất nản. Nội dung thật không có đường dốc, nó dựng đứng.',
  },
  {
    no: 4,
    dimension: 'Đầu ra',
    standard: 'Bài tập nộp cho coach chấm.',
    excellence:
      'Đầu ra công khai có người thật đọc và phản hồi: viết bình luận công khai, dẫn buổi, dạy lại, trả lời trong cộng đồng chuyên môn.',
    why:
      'Có người thật ở đầu kia làm thay đổi cách não chuẩn bị. Đây là khác biệt lớn nhất và cũng khó chấp nhận nhất.',
    cost: 'Sai công khai. Không có cách nào làm nhẹ điều này đi.',
  },
  {
    no: 5,
    dimension: 'Nhịp ôn',
    standard: 'Ôn theo lịch giãn cách cố định 1, 3, 7, 14, 30, 60 ngày.',
    excellence:
      'Nhịp ôn điều chỉnh theo độ trễ đo được của từng mục: mục nào truy xuất chậm thì kéo gần lại, mục nào đã tự động thì đẩy xa ra tới 120 ngày.',
    why:
      'Lịch cố định lãng phí lượt ôn cho thứ đã thuộc và ôn thiếu thứ chưa vững. Điều chỉnh theo dữ liệu tiết kiệm khoảng một phần ba số lượt.',
    cost:
      'Phải ghi số đo mỗi lượt ôn. Người ngại ghi chép sẽ không chạy được cách này.',
  },
  {
    no: 6,
    dimension: 'Người đồng hành',
    standard: 'Cố vấn kèm theo lịch, câu lạc bộ mỗi tuần.',
    excellence:
      'Một người đồng cấp cam kết đối chiếu hai chiều mỗi tuần, cộng một người giỏi hơn hẳn để soi mỗi tháng.',
    why:
      'Người đồng cấp giữ nhịp; người giỏi hơn hẳn chỉ ra trần mà mình không tự thấy. Thiếu vế thứ hai thì tiến bộ dừng ở mức nhóm.',
    cost:
      'Phải tự tìm và giữ được hai quan hệ đó. Hệ thống hỗ trợ ghép cặp nhưng không thay được việc duy trì.',
  },
];

export const EXCELLENCE_EXITS = [
  {
    when: 'Đạt mục tiêu sớm hơn dự kiến',
    then: 'Chuyển sang vai người kèm và giữ một nhiệm vụ đời thật mỗi tuần để không rơi lại.',
  },
  {
    when: 'Đuối trong hai tháng liên tiếp, chỉ số phẳng',
    then: 'Quay về lộ trình chuẩn trong 90 ngày. Không tính là thất bại — lộ trình xuất sắc là một lựa chọn, không phải một bậc.',
  },
  {
    when: 'Đời sống thay đổi, không còn 60 phút mỗi ngày',
    then: 'Quay về lộ trình chuẩn ngay, đừng cố duy trì bản rút gọn. Bản rút gọn của lộ trình này không hoạt động.',
  },
  {
    when: 'Chịu được cường độ nhưng ghét cảm giác sai nhiều',
    then: 'Quay về lộ trình chuẩn. Đây là lựa chọn hợp lý, không phải thiếu bản lĩnh — đi được hết 36 tháng vẫn hơn bỏ ở tháng 8.',
  },
];
