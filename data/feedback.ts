/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {FeedbackSection, ErrorRemedy} from '../types';

/* ==========================================================================
   BỘ CHẤM BÀI — quy trình bắt buộc sau MỌI bài nộp
   Cam kết của học viện: mọi bài nộp đều có phản hồi trong 48 giờ, theo đúng
   khung bốn phần dưới đây. Không có ngoại lệ, không có bài nào chỉ nhận điểm số.
   ========================================================================== */

export const FEEDBACK_CREED = {
  sla: 'Phản hồi trong 48 giờ. Không có ngoại lệ.',
  rule80_20:
    'Tám phần trăm công sức chấm bài nằm ở việc chỉ ra lỗi. Chín mươi hai phần trăm giá trị nằm ở phần sau đó: chiến lược, phác đồ khắc phục và bài luyện. Cố vấn nào chỉ gạch đỏ rồi cho điểm là đang làm tám phần trăm công việc.',
  oneTarget:
    'Mỗi bản phản hồi chỉ chốt ĐÚNG MỘT lỗi mục tiêu cho chu kỳ tới. Chỉ ra mười lỗi cùng lúc thì học viên không sửa được lỗi nào.',
  strengthFirst:
    'Luôn nêu điểm mạnh trước, và điểm mạnh phải CỤ THỂ. "Bài tốt" không phải điểm mạnh — "câu chủ đề đoạn hai nêu lập trường rất rõ" mới là.',
  rework:
    'Không có bản làm lại thì phản hồi vô nghĩa. Bản thứ hai mới là nơi việc học thật sự xảy ra.',
};

export const FEEDBACK_SECTIONS: FeedbackSection[] = [
  {
    no: 1,
    name: 'BẢN NHẬN XÉT',
    purpose:
      'Cho học viên thấy chính xác họ đang đứng ở đâu, theo đúng ngôn ngữ tiêu chí chấm — không theo cảm tính của người chấm.',
    template: `━━ NHẬN XÉT ━━
Bài: [tên bài] · Cấp độ: [mã cấp] · Ngày: [ngày]

ĐIỂM MẠNH CỤ THỂ (bắt buộc nêu trước, tối thiểu 2)
• [Trích nguyên văn câu/đoạn làm tốt] → vì sao nó tốt theo tiêu chí nào
• [Trích nguyên văn] → vì sao nó tốt

CHẤM THEO 4 TIÊU CHÍ
1. Trả lời đúng yêu cầu    [x.x] — [1 câu lý do bằng ngôn ngữ tiêu chí]
2. Mạch lạc & liên kết      [x.x] — [1 câu lý do]
3. Vốn từ                   [x.x] — [1 câu lý do]
4. Ngữ pháp                 [x.x] — [1 câu lý do]
                    TỔNG: [x.x]

SO VỚI LẦN TRƯỚC
Lần trước [x.x] → lần này [x.x]. Tiến bộ rõ nhất ở: [tiêu chí].
Lỗi mục tiêu chu kỳ trước: [ĐÃ ĐÓNG / còn tái phạm N lần].`,
    rule:
      'Không dùng tính từ cảm tính ("khá ổn", "tạm được"). Mọi nhận xét phải trích được bằng chứng từ chính bài viết.',
  },
  {
    no: 2,
    name: 'CHIẾN LƯỢC CẢI THIỆN',
    purpose:
      'Chốt đúng một điểm tấn công cho chu kỳ tới, và giải thích vì sao chính điểm đó mang lại nhiều điểm số nhất.',
    template: `━━ CHIẾN LƯỢC CHU KỲ TỚI ━━

LỖI MỤC TIÊU DUY NHẤT: [mã lỗi] — [tên lỗi]

VÌ SAO CHỌN LỖI NÀY
• Xuất hiện [N] lần trong bài này, [M] lần trong 3 bài gần nhất
• Đang kéo tiêu chí [tên tiêu chí] xuống [x.x]
• Sửa được thì tiêu chí này lên khoảng [x.x] — đây là đòn bẩy lớn nhất hiện có

NHỮNG LỖI KHÁC — TẠM GÁC LẠI
[liệt kê 2–4 lỗi khác] — ghi nhận nhưng CHƯA sửa ở chu kỳ này.
Lý do gác: sửa một lỗi tới nơi giá trị hơn sửa năm lỗi nửa vời.

MỤC TIÊU ĐO ĐƯỢC
Ba bài liên tiếp không tái phạm [mã lỗi] → đánh dấu ĐÓNG.`,
    rule:
      'Đúng một lỗi mục tiêu. Các lỗi khác được ghi nhận rõ ràng là "tạm gác", để học viên không hoang mang vì thấy cố vấn bỏ sót.',
  },
  {
    no: 3,
    name: 'HƯỚNG DẪN KHẮC PHỤC CHI TIẾT',
    purpose:
      'Trao phác đồ cụ thể: nguyên nhân gốc và các bước sửa. Lấy từ Thư viện Lỗi, cá nhân hoá bằng chính câu sai của học viên.',
    template: `━━ PHÁC ĐỒ KHẮC PHỤC: [mã lỗi] ━━

CÂU SAI CỦA EM        → CÂU ĐÚNG
[trích nguyên văn]    → [bản sửa]
[trích nguyên văn]    → [bản sửa]

NGUYÊN NHÂN GỐC
[vì sao người Việt hay mắc lỗi này — giải thích cơ chế, không chỉ nói "sai ngữ pháp"]

CÁC BƯỚC SỬA
1. [bước nhận diện]
2. [bước thay thế]
3. [bước kiểm tra]

CÁCH TỰ KIỂM TRƯỚC KHI NỘP
[một câu hỏi học viên tự đặt cho mình khi rà bài]`,
    rule:
      'Luôn dùng chính câu sai của học viên làm ví dụ, không dùng ví dụ chung. Học viên phải thấy lỗi của MÌNH.',
  },
  {
    no: 4,
    name: 'BÀI TẬP THỰC HÀNH NHUẦN NHUYỄN',
    purpose:
      'Biết cách sửa không bằng đã sửa được thành phản xạ. Phần này biến hiểu biết thành tự động hoá.',
    template: `━━ BỘ LUYỆN 14 NGÀY ━━

BÀI LUYỆN A — [tên] · [N] phút/ngày · ngày 1–7
[cách làm cụ thể, từng bước]

BÀI LUYỆN B — [tên] · [N] phút/ngày · ngày 8–14
[cách làm cụ thể]

BẢNG THEO DÕI
Ngày:  1  2  3  4  5  6  7  8  9 10 11 12 13 14
Đánh dấu: ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐

NHUẦN NHUYỄN KHI
[tiêu chí quan sát được, không phải cảm giác]

HẸN GẶP LẠI
Nộp bài làm lại trong [N] ngày. Bản thứ hai mới là nơi học xảy ra.`,
    rule:
      'Tối đa hai bài luyện. Nhiều hơn là học viên không làm bài nào. Mỗi bài dưới 20 phút mỗi ngày.',
  },
];

/* ==========================================================================
   THƯ VIỆN LỖI — phác đồ khắc phục cho 20 lỗi phổ biến nhất của người Việt
   Dùng trực tiếp khi chấm: tra mã lỗi, dán phác đồ, cá nhân hoá bằng câu sai.
   ========================================================================== */

export const ERROR_REMEDIES: ErrorRemedy[] = [
  {
    id: 'e-final',
    code: 'PA-01',
    skill: 'pronunciation',
    error: 'Rụng âm cuối',
    example: {wrong: '/wɜː/ (work), /laɪ/ (like), /bʊ/ (book)', right: '/wɜːk/, /laɪk/, /bʊk/'},
    rootCause:
      'Tiếng Việt không có phụ âm bật ở cuối âm tiết. Bộ máy phát âm của người Việt chưa từng học động tác kết thúc âm tiết bằng một phụ âm, nên não tự động lược bỏ. Đây là lỗi tốn kém nhất vì nó phá cả điểm Phát âm lẫn khả năng người nghe đoán ra từ.',
    severity: 'nặng',
    strategy:
      'Không sửa bằng cách nhắc "nhớ đọc âm cuối" — nhắc không tạo ra động tác cơ. Phải luyện động tác vật lý cho tới khi thành phản xạ, dùng phản hồi xúc giác thay cho phản hồi thính giác.',
    fixSteps: [
      'Đặt lòng bàn tay trước miệng. Đọc từ có âm cuối /k/, /t/, /p/ — phải cảm nhận được luồng hơi bật vào tay. Không thấy hơi nghĩa là chưa phát âm.',
      'Luyện 20 cặp từ tối thiểu chỉ khác nhau ở âm cuối: sea/seat, my/mine, bee/beat, low/load.',
      'Nói chậm 50% và cố tình kéo dài âm cuối tới mức nghe hơi lố, trong hai tuần đầu. Lố rồi tự chỉnh về vừa dễ hơn thiếu rồi cố thêm vào.',
      'Ghi âm và nghe lại với tốc độ 0,5× — ở tốc độ này âm cuối bị rụng lộ ra rất rõ.',
    ],
    drills: [
      {name: 'Bàn tay trước miệng', minutes: 10, how: '30 từ có âm cuối bật, mỗi từ 5 lần, phải cảm nhận hơi vào lòng bàn tay'},
      {name: 'Cặp tối thiểu có người kiểm', minutes: 10, how: 'Bạn học đọc ngẫu nhiên một từ trong cặp, mình đoán. Sai là do âm cuối chưa rõ'},
    ],
    masteredWhen:
      'Người nghe phân biệt đúng ≥ 18/20 cặp từ tối thiểu khi bạn đọc, và ELSA chấm ≥ 85% ở nhóm từ có âm cuối.',
  },
  {
    id: 'e-th',
    code: 'PA-02',
    skill: 'pronunciation',
    error: 'Âm /θ/ và /ð/ đọc thành /t/, /d/ hoặc /s/',
    example: {wrong: 'tink (think), dis (this), sank you (thank you)', right: '/θɪŋk/, /ðɪs/, /θæŋk juː/'},
    rootCause:
      'Tiếng Việt không có âm răng-lưỡi. Người học thay bằng âm gần nhất trong tiếng mẹ đẻ. Đây là lỗi cơ học thuần tuý — vấn đề nằm ở vị trí lưỡi, không nằm ở tai.',
    severity: 'vừa',
    strategy:
      'Sửa bằng thị giác và xúc giác, không sửa bằng thính giác. Học viên phải NHÌN thấy đầu lưỡi và CẢM thấy nó chạm răng.',
    fixSteps: [
      'Soi gương. Đặt đầu lưỡi chạm nhẹ mặt dưới răng cửa trên, thò ra một chút — phải NHÌN THẤY đầu lưỡi.',
      'Thổi hơi qua khe giữa lưỡi và răng. Đó là /θ/. Thêm rung thanh quản thành /ð/.',
      'Luyện 15 cặp: think/sink, thin/tin, they/day, breathe/breed.',
      'Ghép vào cụm hay dùng: "I think that…", "this and that", "thank you so much".',
    ],
    drills: [
      {name: 'Soi gương thấy lưỡi', minutes: 8, how: '20 từ chứa /θ/ và /ð/, mỗi từ 5 lần, bắt buộc nhìn thấy đầu lưỡi trong gương'},
      {name: 'Câu dày đặc âm', minutes: 7, how: '"Thirty-three thousand thoughtful thinkers" × 20 lần, tăng dần tốc độ'},
    ],
    masteredWhen: 'Đọc trôi câu dày đặc /θ/ ở tốc độ tự nhiên mà không chuyển thành /t/ hay /s/.',
  },
  {
    id: 'e-article',
    code: 'GR-01',
    skill: 'grammar',
    error: 'Sai hoặc thiếu mạo từ a / an / the',
    example: {
      wrong: 'I am student. She is best doctor in hospital.',
      right: 'I am a student. She is the best doctor in the hospital.',
    },
    rootCause:
      'Tiếng Việt không có mạo từ. Người Việt không có "khe" tư duy nào để cắm mạo từ vào, nên bộ máy ngôn ngữ đơn giản là bỏ qua nó. Đây là lỗi phổ biến nhất và cũng là lỗi bị đánh giá thấp nhất — nó rải đều khắp bài và kéo tiêu chí Ngữ pháp xuống đáng kể.',
    severity: 'nặng',
    strategy:
      'Không học 20 quy tắc mạo từ. Học đúng MỘT chuỗi ba câu hỏi và chạy nó cho mọi danh từ, cho tới khi thành phản xạ.',
    fixSteps: [
      'Câu hỏi 1: Danh từ này đếm được không? Không đếm được thì thường không cần mạo từ (water, information, advice).',
      'Câu hỏi 2: Người nghe đã biết chính xác cái nào chưa? Đã biết → the. Chưa biết → a/an.',
      'Câu hỏi 3: Có phải cái duy nhất trong ngữ cảnh này không? Duy nhất → the (the sun, the manager of my team).',
      'Rà bài: khoanh tròn MỌI danh từ trong bài, chạy ba câu hỏi cho từng cái. Ban đầu chậm, sau ba tuần thành tự động.',
    ],
    drills: [
      {name: 'Khoanh danh từ', minutes: 15, how: 'Lấy một đoạn 150 từ đã viết, khoanh mọi danh từ, chạy ba câu hỏi cho từng cái, ghi lại số lỗi tìm ra'},
      {name: 'Xoá và điền lại', minutes: 10, how: 'Lấy đoạn văn bản ngữ, xoá hết mạo từ, tự điền lại rồi đối chiếu bản gốc'},
    ],
    masteredWhen: 'Dưới 2 lỗi mạo từ trên mỗi bài 250 từ, ba bài liên tiếp.',
  },
  {
    id: 'e-plural',
    code: 'GR-02',
    skill: 'grammar',
    error: 'Quên -s số nhiều và -s ngôi thứ ba',
    example: {
      wrong: 'She work in three company. He like coffee.',
      right: 'She works in three companies. He likes coffee.',
    },
    rootCause:
      'Tiếng Việt không biến đổi hình thái từ — số nhiều được thể hiện bằng từ riêng ("những", "các"), không bằng đuôi từ. Não người Việt coi thông tin số nhiều là đã đủ khi có số từ đứng trước, nên đuôi -s trở thành thừa và bị lược.',
    severity: 'nặng',
    strategy:
      'Đây là lỗi của TAI trước khi là lỗi của tay. Học viên không nghe thấy -s trong lời người bản ngữ nên không tái tạo được. Phải chữa tai song song với chữa tay.',
    fixSteps: [
      'Chép chính tả tập trung: chọn đoạn có nhiều -s, chép lại và đếm số -s bị bỏ sót. Đây là bước chẩn đoán.',
      'Đọc to bài viết của mình, cố tình kéo dài mọi âm /s/ và /z/ cuối từ.',
      'Rà bài theo lượt riêng: một lượt rà chỉ nhìn danh từ, một lượt chỉ nhìn động từ chia ngôi thứ ba.',
      'Quy tắc chốt: mỗi câu, hỏi "chủ ngữ là he/she/it/một người/một vật?" — nếu đúng thì động từ phải có -s.',
    ],
    drills: [
      {name: 'Chép chính tả săn -s', minutes: 15, how: 'Đoạn 45 giây, chép lại, khoanh mọi -s, đếm số bỏ sót'},
      {name: 'Rà một lượt một loại', minutes: 10, how: 'Bài viết của mình: lượt 1 chỉ soát danh từ số nhiều, lượt 2 chỉ soát động từ'},
    ],
    masteredWhen: 'Dưới 2 lỗi -s trên mỗi bài 250 từ, và chép chính tả không bỏ sót -s nào.',
  },
  {
    id: 'e-tense',
    code: 'GR-03',
    skill: 'grammar',
    error: 'Lẫn quá khứ đơn với hiện tại hoàn thành',
    example: {
      wrong: 'I have been to Da Nang last year. I lived here for five years (và vẫn đang sống).',
      right: 'I went to Da Nang last year. I have lived here for five years.',
    },
    rootCause:
      'Tiếng Việt không chia thì bằng động từ; thời gian được đánh dấu bằng trạng từ ("đã", "rồi", "từng"). Khi chuyển sang tiếng Anh, người học dịch trạng từ mà không đổi dạng động từ, hoặc chọn thì theo cảm giác.',
    severity: 'vừa',
    strategy:
      'Bỏ hẳn cách học theo bảng công thức. Học theo MỘT câu hỏi phân biệt duy nhất: khoảng thời gian đó đã đóng lại chưa?',
    fixSteps: [
      'Câu hỏi phân biệt: khoảng thời gian đang nói đã KẾT THÚC hẳn chưa? Đã kết thúc (last year, in 2019, yesterday) → quá khứ đơn.',
      'Còn kéo dài tới hiện tại hoặc chưa xác định thời điểm (for five years, since 2019, ever, never) → hiện tại hoàn thành.',
      'Cảnh báo cứng: có "last / ago / in + năm" thì TUYỆT ĐỐI không dùng have/has.',
      'Săn cấu trúc: một tuần đánh dấu mọi hiện tại hoàn thành gặp trong bài đọc, ghi lại dấu hiệu thời gian đi kèm.',
    ],
    drills: [
      {name: 'Săn dấu hiệu thời gian', minutes: 15, how: 'Đọc bài báo, khoanh mọi cụm chỉ thời gian, ghi thì đi kèm — thu 30 ví dụ thật'},
      {name: 'Viết cặp câu', minutes: 10, how: 'Mỗi ngày viết 5 cặp câu cùng nội dung, một câu quá khứ đơn một câu hiện tại hoàn thành, nêu rõ khác biệt nghĩa'},
    ],
    masteredWhen: 'Chọn đúng thì trong 18/20 tình huống kiểm tra, và không mắc lỗi này trong ba bài liên tiếp.',
  },
  {
    id: 'e-wordorder',
    code: 'GR-04',
    skill: 'grammar',
    error: 'Trật tự từ theo lối tiếng Việt',
    example: {
      wrong: 'I very like it. She is a girl beautiful. I know how old are you.',
      right: 'I really like it. She is a beautiful girl. I know how old you are.',
    },
    rootCause:
      'Dịch từng chữ từ tiếng Việt. Ba khác biệt lớn nhất: tiếng Việt đặt tính từ SAU danh từ, dùng "rất" trước động từ, và giữ nguyên trật tự câu hỏi khi câu hỏi nằm trong câu lớn hơn.',
    severity: 'vừa',
    strategy:
      'Chữa bằng cách nạp cả CỤM ĐÚC SẴN thay vì ghép từ. Người nói cụm không bao giờ sai trật tự vì họ không ghép — họ lấy nguyên khối ra dùng.',
    fixSteps: [
      'Nhận diện ba mẫu lỗi: tính từ sau danh từ, "very + động từ", và mệnh đề hỏi gián tiếp.',
      'Với "very": nhớ very chỉ đứng trước tính từ và trạng từ. Trước động từ dùng really hoặc very much.',
      'Với mệnh đề hỏi gián tiếp: khi câu hỏi nằm trong câu khác, nó trở về trật tự câu kể — chủ ngữ trước động từ.',
      'Đãi câu: mỗi ngày thu 5 câu thật chứa các cấu trúc này, đưa vào Anki dưới dạng cả cụm.',
    ],
    drills: [
      {name: 'Đãi cụm đúc sẵn', minutes: 15, how: '5 câu i+1 mỗi ngày từ nội dung đang đọc, lưu nguyên cụm chứ không lưu từ lẻ'},
      {name: 'Dịch ngược', minutes: 10, how: 'Lấy 10 câu tiếng Anh chuẩn, dịch sang Việt, hôm sau dịch ngược lại rồi đối chiếu bản gốc'},
    ],
    masteredWhen: 'Không mắc ba mẫu lỗi này trong ba bài liên tiếp và trong hai buổi nói được ghi âm.',
  },
  {
    id: 'e-transition',
    code: 'WR-01',
    skill: 'writing',
    error: 'Lạm dụng từ nối máy móc',
    example: {
      wrong: 'Firstly… Secondly… Thirdly… Moreover… Furthermore… In addition… Last but not least…',
      right: 'Mạch ý nối bằng đại từ, lặp từ khoá và logic nội tại; từ nối chỉ dùng khi thật sự cần đổi hướng.',
    },
    rootCause:
      'Học viên được dạy rằng "nhiều từ nối = mạch lạc cao". Thực tế tiêu chí Mạch lạc chấm dòng chảy ý tưởng, không đếm số từ nối. Nhồi từ nối làm bài đọc như danh sách gạch đầu dòng và thường bị hạ điểm.',
    severity: 'vừa',
    strategy:
      'Học cách nối ý mà KHÔNG dùng từ nối — bằng đại từ tham chiếu, lặp từ khoá, và trật tự thông tin cũ trước mới sau.',
    fixSteps: [
      'Lấy một bài mẫu Band 9, đếm số từ nối. Thường ít hơn học viên tưởng rất nhiều.',
      'Viết lại một đoạn của mình, cấm dùng bất kỳ từ nối nào. Bắt buộc nối bằng đại từ và lặp từ khoá.',
      'Quy tắc thông tin: mỗi câu bắt đầu bằng thông tin đã có ở câu trước, kết thúc bằng thông tin mới.',
      'Chỉ giữ lại từ nối ở đúng chỗ đổi hướng lập luận (however, yet) hoặc rút kết luận (therefore).',
    ],
    drills: [
      {name: 'Đoạn không từ nối', minutes: 20, how: 'Viết đoạn 120 từ, cấm hoàn toàn từ nối, chỉ nối bằng đại từ và lặp từ khoá'},
      {name: 'Đếm trên bài mẫu', minutes: 10, how: 'Đếm từ nối trong 5 bài Band 9, so với bài của mình, ghi lại chênh lệch'},
    ],
    masteredWhen: 'Dưới 5 từ nối trên mỗi bài 250 từ mà mạch ý vẫn rõ, được người chấm xác nhận.',
  },
  {
    id: 'e-vague',
    code: 'WR-02',
    skill: 'writing',
    error: 'Ví dụ chung chung, không có bằng chứng cụ thể',
    example: {
      wrong: 'For example, many people in society today are affected by this problem.',
      right: 'For example, Singapore cut car ownership by 40% between 2018 and 2023 by raising the certificate-of-entitlement fee above S$100,000.',
    },
    rootCause:
      'Học viên nghĩ ví dụ chỉ là một câu bắt buộc phải có sau luận điểm, nên viết cho đủ hình thức. Đây là chỗ tách Band 7 khỏi Band 8 rõ nhất ở tiêu chí Trả lời đúng yêu cầu.',
    severity: 'nặng',
    strategy:
      'Xây trước một ngân hàng 12 ví dụ đa dụng, mỗi ví dụ có tên riêng, con số và mốc thời gian. Không đi tìm ví dụ trong phòng thi.',
    fixSteps: [
      'Kiểm tra ba yếu tố: ví dụ này có TÊN RIÊNG không? có SỐ không? có MỐC THỜI GIAN không? Thiếu hai trong ba là ví dụ rỗng.',
      'Chọn 12 ví dụ có sức nặng, mỗi ví dụ khai thác được từ ba góc khác nhau.',
      'Luyện xoay: cùng một ví dụ dùng cho chủ đề Giáo dục, Kinh tế và Công nghệ.',
      'Rà bài: gạch chân mọi câu bắt đầu bằng "For example", kiểm tra ba yếu tố trên.',
    ],
    drills: [
      {name: 'Xây ngân hàng ví dụ', minutes: 20, how: 'Mỗi ngày một ví dụ: tên, số, mốc thời gian, ba góc khai thác — trong 12 ngày'},
      {name: 'Xoay ví dụ', minutes: 15, how: 'Lấy một ví dụ, viết ba đoạn dùng nó cho ba chủ đề khác nhau'},
    ],
    masteredWhen: 'Mọi ví dụ trong bài đều có tên riêng và con số, ba bài liên tiếp.',
  },
  {
    id: 'e-position',
    code: 'WR-03',
    skill: 'writing',
    error: 'Lập trường mơ hồ hoặc đổi giữa chừng',
    example: {
      wrong: 'Mở bài nghiêng về đồng ý, thân bài viết đều cả hai phía, kết bài nói "cả hai đều có lý".',
      right: 'Lập trường nêu rõ ở mở bài, giữ nguyên qua cả hai đoạn thân, khẳng định lại ở kết bài.',
    },
    rootCause:
      'Học viên sợ "phiến diện" nên cố tỏ ra cân bằng. Nhưng tiêu chí Trả lời đúng yêu cầu ở Band 8 đòi hỏi lập trường RÕ và NHẤT QUÁN — cân bằng không phải là trung lập.',
    severity: 'nặng',
    strategy:
      'Chốt lập trường bằng một câu viết ra giấy TRƯỚC khi viết chữ đầu tiên, và rà lại nó sau khi viết xong.',
    fixSteps: [
      'Trước khi viết: viết một câu duy nhất "Tôi cho rằng ___ vì ___". Đây là kim chỉ nam của cả bài.',
      'Mỗi đoạn thân phải phục vụ câu đó. Đoạn nào không phục vụ thì bỏ, dù viết hay tới đâu.',
      'Thừa nhận phía kia được phép — nhưng phải kết thúc bằng việc bác lại, không kết thúc bằng "cả hai đều đúng".',
      'Rà cuối: đọc riêng mở bài và kết bài liền nhau. Hai câu đó phải nói cùng một điều.',
    ],
    drills: [
      {name: 'Một câu lập trường', minutes: 5, how: 'Mỗi đề bài, viết một câu lập trường trong 60 giây trước khi viết bài'},
      {name: 'Kiểm tra đầu-cuối', minutes: 5, how: 'Sau khi viết xong, đọc liền mở bài và kết bài, kiểm tra có mâu thuẫn không'},
    ],
    masteredWhen: 'Người chấm xác nhận lập trường rõ và nhất quán trong ba bài liên tiếp.',
  },
  {
    id: 'e-overview',
    code: 'WR-04',
    skill: 'writing',
    error: 'Thiếu câu tổng quan trong bài mô tả biểu đồ',
    example: {
      wrong: 'Liệt kê lần lượt mọi con số trên biểu đồ, không nêu xu hướng chung.',
      right: 'Overall, sales rose steadily across all three regions, with Asia showing by far the sharpest growth.',
    },
    rootCause:
      'Học viên nghĩ nhiệm vụ là mô tả đầy đủ số liệu. Thực tế nhiệm vụ là chỉ ra XU HƯỚNG. Thiếu câu tổng quan là lỗi đơn lẻ làm mất nhiều điểm nhất ở phần này.',
    severity: 'nặng',
    strategy:
      'Viết câu tổng quan NGAY sau mở bài, trước cả thân bài. Không để xuống cuối, vì hết giờ là mất luôn.',
    fixSteps: [
      'Nhìn biểu đồ 60 giây, chỉ tìm 2–3 xu hướng lớn nhất. Không nhìn con số cụ thể ở bước này.',
      'Viết: "Overall, [xu hướng 1], while [xu hướng 2]." Tuyệt đối không có con số trong câu này.',
      'Kiểm tra: che phần thân bài đi, người đọc vẫn nắm được bức tranh chung không?',
      'Chỉ sau khi có câu tổng quan mới bắt đầu chọn số liệu tiêu biểu cho thân bài.',
    ],
    drills: [
      {name: 'Chỉ viết tổng quan', minutes: 10, how: 'Mỗi ngày một biểu đồ, chỉ viết đúng câu tổng quan trong 3 phút, không viết gì thêm'},
      {name: 'Kiểm tra che bài', minutes: 5, how: 'Đưa câu tổng quan cho người khác, họ mô tả lại biểu đồ mà không nhìn biểu đồ'},
    ],
    masteredWhen: 'Có câu tổng quan rõ ràng, không chứa số liệu, trong 5 bài liên tiếp.',
  },
  {
    id: 'e-memorized',
    code: 'SP-01',
    skill: 'speaking',
    error: 'Đọc thuộc bài mẫu',
    example: {
      wrong: 'Nói trôi chảy bất thường ở một đoạn, rồi ấp úng hẳn khi bị hỏi câu phụ ngoài kịch bản.',
      right: 'Nhịp nói tự nhiên và đều, có ngập ngừng hợp lý, trả lời được câu phụ bất kỳ.',
    },
    rootCause:
      'Học viên học thuộc để giảm lo lắng. Nhưng người chấm nhận ra ngay qua ba dấu hiệu: nhịp nói đột ngột đều bất thường, ánh mắt nhìn lên trên bên trái khi truy hồi, và sập hoàn toàn khi bị hỏi lệch kịch bản.',
    severity: 'nặng',
    strategy:
      'Thay bài thuộc lòng bằng KHUNG linh hoạt. Thuộc cấu trúc, không thuộc câu chữ.',
    fixSteps: [
      'Bỏ mọi câu học thuộc. Thay bằng khung bốn ô: Cái gì → Khi nào → Vì sao đặc biệt → Cảm xúc.',
      'Luyện với đề bốc thăm ngẫu nhiên, không bao giờ luyện lại đề đã chuẩn bị.',
      'Cố ý tự ngắt giữa chừng và nói lại theo hướng khác, để rèn khả năng ứng biến.',
      'Nhờ người khác hỏi câu phụ bất ngờ sau mỗi lần nói.',
    ],
    drills: [
      {name: 'Bốc thăm mù', minutes: 15, how: 'Bốc đề chưa từng gặp, chuẩn bị 1 phút, nói 2 phút, ghi âm'},
      {name: 'Câu phụ tấn công', minutes: 10, how: 'Bạn học hỏi 3 câu phụ bất ngờ ngay sau khi mình nói xong'},
    ],
    masteredWhen: 'Nói trôi ở đề chưa từng gặp và trả lời được mọi câu phụ, hai buổi liên tiếp.',
  },
  {
    id: 'e-short',
    code: 'SP-02',
    skill: 'speaking',
    error: 'Trả lời quá ngắn, không phát triển ý',
    example: {
      wrong: '"Do you like reading?" — "Yes, I like reading. It is interesting."',
      right: 'Nêu ý → giải thích vì sao → một ví dụ cụ thể → nối lại câu hỏi. Khoảng 30–45 giây.',
    },
    rootCause:
      'Học viên trả lời như trả lời câu hỏi đóng trong đời thường. Nhưng người chấm cần đủ ngôn ngữ để đánh giá — trả lời 8 giây thì không có gì để chấm ngoài mức thấp.',
    severity: 'nặng',
    strategy:
      'Cài khung PEEL thành phản xạ: Point, Explain, Example, Link. Luyện tới khi khung tự chạy mà không phải nghĩ.',
    fixSteps: [
      'Point: nêu lập trường trong một câu.',
      'Explain: giải thích vì sao, hai câu.',
      'Example: một ví dụ CỤ THỂ từ đời mình, có chi tiết.',
      'Link: nối lại về câu hỏi ban đầu.',
      'Bấm giờ: mục tiêu 30–45 giây cho câu hỏi Phần 1, 45–60 giây cho Phần 3.',
    ],
    drills: [
      {name: 'PEEL bấm giờ', minutes: 15, how: '10 câu hỏi liên tiếp, mỗi câu trả lời đủ 4 bước PEEL, bấm giờ từng câu'},
      {name: 'Kéo dài dần', minutes: 10, how: 'Cùng một câu hỏi: trả lời 15 giây, rồi 30, rồi 45 — mỗi lần thêm một tầng ý'},
    ],
    masteredWhen: 'Mọi câu trả lời đạt 30–60 giây có đủ bốn bước PEEL, trong một buổi ghi âm đầy đủ.',
  },
  {
    id: 'e-filler',
    code: 'SP-03',
    skill: 'speaking',
    error: 'Từ đệm tiếng Việt và lặp "you know"',
    example: {
      wrong: 'I think… ờ… you know… like… ừm… it is very… you know… important.',
      right: 'I think — well, let me put it this way — it plays a crucial role in…',
    },
    rootCause:
      'Não cần thời gian truy xuất từ, và lấp khoảng trống bằng âm quen thuộc nhất, thường là âm tiếng mẹ đẻ. Đây là vấn đề tốc độ truy xuất, không phải vấn đề thói quen xấu.',
    severity: 'vừa',
    strategy:
      'Không cấm ngập ngừng — điều đó bất khả thi. Thay âm đệm bằng cụm câu giờ tự nhiên trong tiếng Anh, đồng thời tăng tốc độ truy xuất bằng kỹ thuật 4/3/2.',
    fixSteps: [
      'Học thuộc 10 cụm câu giờ tự nhiên: "That is a good question", "Let me think for a second", "Well, it depends on…".',
      'Ghi âm 2 phút, đếm chính xác số từ đệm mỗi phút. Đây là con số nền.',
      'Chạy 4/3/2 mỗi ngày: cùng nội dung nói 4 phút, rồi 3, rồi 2 — tốc độ truy xuất tăng thì từ đệm tự giảm.',
      'Chấp nhận im lặng một giây. Im lặng ngắn nghe chuyên nghiệp hơn "ờ" kéo dài.',
    ],
    drills: [
      {name: 'Đếm từ đệm', minutes: 10, how: 'Ghi âm 2 phút mỗi ngày, đếm từ đệm, vẽ đường giảm theo tuần'},
      {name: 'Kỹ thuật 4/3/2', minutes: 20, how: 'Cùng một chủ đề: 4 phút, nghỉ 1 phút, 3 phút, nghỉ 1 phút, 2 phút'},
    ],
    masteredWhen: 'Dưới 3 từ đệm mỗi phút, không còn âm đệm tiếng Việt, trong ba bản ghi âm liên tiếp.',
  },
  {
    id: 'e-translate',
    code: 'SP-04',
    skill: 'speaking',
    error: 'Dịch trong đầu trước khi nói',
    example: {
      wrong: 'Nghĩ câu tiếng Việt → dịch từng chữ → nói ra. Độ trễ 3–5 giây mỗi câu.',
      right: 'Nghĩ trực tiếp bằng tiếng Anh, kể cả khi câu đơn giản hơn ý muốn nói.',
    },
    rootCause:
      'Vốn từ được lưu dưới dạng cặp Anh–Việt thay vì gắn trực tiếp với khái niệm. Gốc rễ nằm ở cách tạo thẻ từ vựng: thẻ có nghĩa tiếng Việt sẽ buộc não đi qua tiếng Việt mỗi lần truy xuất.',
    severity: 'nặng',
    strategy:
      'Cắt đường dẫn qua tiếng Việt ở tầng gốc: đổi cách lưu từ vựng, và chấp nhận nói đơn giản hơn ý muốn trong giai đoạn chuyển tiếp.',
    fixSteps: [
      'Chuyển toàn bộ sang từ điển Anh–Anh. Thẻ Anki bỏ nghĩa tiếng Việt, thay bằng câu ví dụ khoét lỗ và hình ảnh.',
      'Chấp nhận nói câu đơn giản hơn ý mình muốn. Nói đơn giản mà trực tiếp hơn nói phức tạp mà qua dịch.',
      'Chạy nghi thức tự nói ba mốc mỗi ngày — tự nói không có áp lực nên dễ bỏ thói quen dịch hơn.',
      'Đo độ trễ: ghi âm và đo khoảng cách giữa câu hỏi và chữ đầu tiên. Mục tiêu dưới 1,5 giây.',
    ],
    drills: [
      {name: 'Mô tả tức thì', minutes: 10, how: 'Nhìn quanh phòng, mô tả 20 vật trong 60 giây, không được dừng để nghĩ'},
      {name: 'Làm lại thẻ Anki', minutes: 15, how: 'Mỗi ngày chuyển 20 thẻ từ dạng Anh–Việt sang dạng câu khoét lỗ có hình'},
    ],
    masteredWhen: 'Độ trễ trước chữ đầu tiên dưới 1,5 giây, và tự báo cáo không còn dịch trong đầu.',
  },
  {
    id: 'e-skim',
    code: 'RD-01',
    skill: 'reading',
    error: 'Đọc kỹ từ đầu đến cuối rồi hết giờ',
    example: {
      wrong: 'Đọc kỹ đoạn 1 trong 25 phút, còn 35 phút cho hai đoạn còn lại.',
      right: 'Lướt 2 phút lấy bố cục, quét tìm vị trí đáp án, chỉ đọc kỹ 2–3 câu quanh vị trí đó.',
    },
    rootCause:
      'Học viên áp dụng thói quen đọc sách giáo khoa vào bài thi. Nhưng bài thi không đo độ hiểu toàn văn — nó đo khả năng định vị thông tin dưới áp lực thời gian.',
    severity: 'nặng',
    strategy:
      'Tách rõ ba tốc độ đọc và luyện riêng từng tốc độ trước khi ghép lại.',
    fixSteps: [
      'Tốc độ 1 — Lướt, 2 phút: chỉ đọc câu đầu mỗi đoạn, dựng bản đồ bài trong đầu.',
      'Tốc độ 2 — Quét: với mỗi câu hỏi, tìm từ khoá và định vị đoạn chứa đáp án.',
      'Tốc độ 3 — Đọc kỹ: chỉ đọc 2–3 câu quanh vị trí đã định vị.',
      'Kỷ luật thời gian: 20 phút mỗi đoạn. Hết giờ là chuyển, quay lại sau nếu còn dư.',
    ],
    drills: [
      {name: 'Chỉ lướt', minutes: 10, how: 'Mỗi ngày 3 bài: chỉ lướt 2 phút rồi viết bản đồ bài, không đọc kỹ'},
      {name: 'Quét bấm giờ', minutes: 15, how: '20 câu hỏi, mỗi câu chỉ có 30 giây để định vị đúng đoạn chứa đáp án'},
    ],
    masteredWhen: 'Hoàn thành 3 đoạn trong 60 phút với ít nhất 30/40 câu đúng.',
  },
  {
    id: 'e-tfng',
    code: 'RD-02',
    skill: 'reading',
    error: 'Lẫn False với Not Given',
    example: {
      wrong: 'Chọn False vì "theo mình biết thì không phải vậy".',
      right: 'False = bài viết nói NGƯỢC LẠI. Not Given = bài viết KHÔNG NHẮC TỚI.',
    },
    rootCause:
      'Học viên dùng kiến thức đời thực để suy luận thay vì bám vào văn bản. Bài thi chỉ chấm theo những gì có trong bài, không chấm theo sự thật ngoài đời.',
    severity: 'vừa',
    strategy:
      'Ép kỷ luật bằng chứng: mọi câu trả lời phải chỉ ra được dòng cụ thể trong bài. Không chỉ ra được thì đáp án là Not Given.',
    fixSteps: [
      'Tìm chính xác đoạn chứa thông tin. Không đoán mò.',
      'Không thấy thông tin ở đâu cả → NOT GIVEN, dù bạn "biết" nó đúng ngoài đời.',
      'Thấy thông tin trái ngược → FALSE.',
      'Cảnh giác từ chỉ mức độ: all/some, always/often, must/may — đó thường là chỗ đánh bẫy.',
    ],
    drills: [
      {name: 'Chỉ ra dòng', minutes: 15, how: '20 câu T/F/NG, mỗi câu phải viết ra số dòng làm bằng chứng, không viết được thì chọn NG'},
      {name: 'Săn từ chỉ mức độ', minutes: 10, how: 'Khoanh mọi từ chỉ mức độ trong đề, kiểm tra chúng có khớp với bài không'},
    ],
    masteredWhen: 'Đúng ít nhất 8/10 câu T/F/NG trong ba đề liên tiếp.',
  },
  {
    id: 'e-predict',
    code: 'LS-01',
    skill: 'listening',
    error: 'Không đọc câu hỏi trước khi băng chạy',
    example: {
      wrong: 'Ngồi chờ băng chạy rồi mới nhìn câu hỏi — luôn chậm một nhịp và mất câu.',
      right: 'Đọc câu hỏi, đoán loại đáp án, nghĩ sẵn hai cách diễn đạt lại có thể xuất hiện.',
    },
    rootCause:
      'Học viên coi phần nghe là bị động. Thực tế trận đấu thắng thua ở 30 giây TRƯỚC khi băng chạy — đề gần như không bao giờ dùng lại nguyên văn từ khoá trong câu hỏi.',
    severity: 'nặng',
    strategy:
      'Biến 30 giây chuẩn bị thành một quy trình cố định gồm bốn bước, luyện tới khi tự động.',
    fixSteps: [
      'Đọc câu hỏi, đoán LOẠI đáp án: số, tên riêng, danh từ, hay động từ.',
      'Gạch chân từ khoá và nghĩ sẵn hai cách diễn đạt lại khả dĩ.',
      'Đoán trước bối cảnh: ai nói với ai, ở đâu, để làm gì.',
      'Trong lúc nghe, bám các dấu hiệu chuyển ý: however, actually, on second thought.',
    ],
    drills: [
      {name: 'Chỉ dự đoán', minutes: 10, how: 'Đọc 10 câu hỏi, viết loại đáp án và hai cách diễn đạt lại, chưa bật băng'},
      {name: 'Săn diễn đạt lại', minutes: 15, how: 'Nghe xong, đối chiếu transcript, ghi lại mọi chỗ đề diễn đạt khác câu hỏi'},
    ],
    masteredWhen: 'Đoán đúng loại đáp án cho ít nhất 8/10 câu trước khi nghe.',
  },
  {
    id: 'e-numbers',
    code: 'LS-02',
    skill: 'listening',
    error: 'Sai chính tả, số và ngày tháng',
    example: {
      wrong: 'thirteen ghi thành thirty; 15/4 ghi thành 4/15; Smyth ghi thành Smith.',
      right: 'Nghe đúng trọng âm phân biệt -teen và -ty, nắm quy ước ngày tháng, đánh vần theo băng.',
    },
    rootCause:
      'Đây là điểm mất oan nhiều nhất: học viên nghe đúng ý nhưng ghi sai hình thức. Nguyên nhân là trọng âm của -teen rơi vào cuối còn -ty rơi vào đầu, và tên riêng thường được đánh vần rất nhanh.',
    severity: 'vừa',
    strategy:
      'Luyện riêng ba nhóm gây lỗi — số, ngày tháng, tên riêng — thay vì luyện nghe chung chung.',
    fixSteps: [
      'Số: thirteen có trọng âm cuối và âm /n/ rõ; thirty trọng âm đầu, kết thúc bằng /i/.',
      'Ngày tháng: nghe cả ngày lẫn tháng rồi mới ghi, đừng ghi ngay phần đầu.',
      'Tên riêng: khi có đánh vần, ghi từng chữ cái ngay, đừng cố nhớ cả từ rồi ghi sau.',
      'Rà cuối giờ: kiểm tra riêng mọi ô có số và tên riêng.',
    ],
    drills: [
      {name: 'Chép số', minutes: 10, how: '50 số nghe ngẫu nhiên mỗi ngày, tập trung cặp -teen và -ty'},
      {name: 'Chép tên riêng', minutes: 10, how: '20 tên riêng được đánh vần nhanh, chép lại và đối chiếu'},
    ],
    masteredWhen: 'Không sai ô nào thuộc nhóm số và tên riêng trong ba đề liên tiếp.',
  },
  {
    id: 'e-bigword',
    code: 'VO-01',
    skill: 'vocabulary',
    error: 'Dùng từ khó sai ngữ cảnh',
    example: {
      wrong: 'A plethora of my friends utilize the ubiquitous smartphone.',
      right: 'Most of my friends use their smartphones for almost everything.',
    },
    rootCause:
      'Học viên tin rằng từ khó sẽ gây ấn tượng với người chấm. Thực tế tiêu chí Vốn từ chấm độ CHÍNH XÁC và TỰ NHIÊN, không chấm độ hiếm. Dùng sai một từ khó mất điểm nhiều hơn dùng đúng năm từ thường.',
    severity: 'nặng',
    strategy:
      'Chuyển tiêu chuẩn từ "hiếm" sang "chính xác trong ngữ cảnh". Mọi từ phải qua kiểm tra tính tự nhiên trước khi được dùng.',
    fixSteps: [
      'Kiểm tra bằng YouGlish: dưới 20 kết quả người thật dùng thì bỏ, không dùng trong bài thi.',
      'Tra collocation trên ozdic: từ này thường đi với những từ nào? Ghép sai cụm là mất điểm.',
      'Quy tắc: chỉ dùng từ bạn đã gặp ít nhất 5 lần trong ngữ cảnh thật.',
      'Rà bài: khoanh mọi từ "khủng", tự hỏi "mình đã thật sự thấy người bản ngữ dùng từ này trong văn cảnh này chưa?"',
    ],
    drills: [
      {name: 'Kiểm tra tự nhiên', minutes: 10, how: 'Lấy 10 từ khó trong bài của mình, kiểm tra YouGlish và ozdic từng từ'},
      {name: 'Viết lại đơn giản', minutes: 15, how: 'Viết lại một đoạn của mình bằng từ đơn giản nhất có thể, so sánh xem bản nào rõ hơn'},
    ],
    masteredWhen: 'Không có từ nào bị người chấm đánh dấu là dùng sai ngữ cảnh, ba bài liên tiếp.',
  },
  {
    id: 'e-collocation',
    code: 'VO-02',
    skill: 'vocabulary',
    error: 'Sai cụm đi liền',
    example: {
      wrong: 'do a mistake, make homework, take a decision, heavy traffic jam',
      right: 'make a mistake, do homework, make a decision, heavy traffic',
    },
    rootCause:
      'Học viên học từ lẻ rồi tự ghép theo logic tiếng Việt. Nhưng cụm đi liền không theo logic — chúng theo thói quen của cộng đồng người nói. Không có quy tắc nào suy ra được, chỉ có việc gặp nhiều lần.',
    severity: 'vừa',
    strategy:
      'Đổi đơn vị học từ TỪ sang CỤM. Không bao giờ lưu một từ trần vào sổ hay vào Anki.',
    fixSteps: [
      'Mỗi từ mới quan trọng: tra ozdic, lấy 2–3 cụm thông dụng nhất.',
      'Thẻ Anki luôn chứa cả cụm trong câu, không bao giờ chứa từ đơn.',
      'Xây ngân hàng cụm theo chủ đề: 15 cụm cho mỗi chủ đề thi.',
      'Rà bài: khoanh mọi cặp động từ + danh từ, kiểm tra từng cặp trên ozdic.',
    ],
    drills: [
      {name: 'Săn cụm', minutes: 15, how: '5 từ trọng tâm mỗi ngày, mỗi từ 3 cụm từ ozdic, viết một câu của mình cho mỗi cụm'},
      {name: 'Sửa cụm sai', minutes: 10, how: 'Lấy bài cũ, khoanh mọi cặp động từ + danh từ, kiểm tra và sửa'},
    ],
    masteredWhen: 'Dưới 2 lỗi cụm trên mỗi bài 250 từ, và ngân hàng cụm đạt ít nhất 400 mục.',
  },
];

export const REMEDY_BY_CODE = Object.fromEntries(
  ERROR_REMEDIES.map((e) => [e.code, e]),
);
