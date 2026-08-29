/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {DossierQuarter, DossierDay, DossierBlock} from '../types';

/* ==========================================================================
   HỒ SƠ ENGWIN 365 NGÀY — NĂM THỨ NHẤT
   Lộ trình 36 tháng trả lời "đi đâu". Chu kỳ 21 ngày trả lời "ba tuần tới
   làm gì". Hồ sơ này trả lời câu hỏi khó nhất: "SÁNG MAI TÔI LÀM GÌ".
   Ba trăm sáu mươi lăm ngày, không ngày nào để trống, không ngày nào phải
   tự nghĩ ra việc.
   ========================================================================== */

export const DOSSIER_CREED = {
  name: 'HỒ SƠ 365 NGÀY',
  claim:
    'Ba trăm sáu mươi lăm ngày đã được viết sẵn: mỗi ngày một tiêu điểm, một nhiệm vụ đời thật, một thước đo, một bằng chứng phải nộp.',
  why:
    'Lý do phổ biến nhất khiến người học bỏ cuộc không phải thiếu động lực mà là thiếu câu trả lời cho câu hỏi "hôm nay học gì". Mỗi lần phải tự quyết định là một lần có cơ hội trì hoãn. Hồ sơ này xoá bỏ quyết định đó.',
  structure:
    'Bốn quý × 90 ngày = 360, cộng 5 ngày trắng. Mỗi quý gồm bốn vòng 21 ngày và sáu ngày hợp nhất. Mỗi vòng chỉ tấn công MỘT kỹ năng hẹp.',
  honesty:
    'Hồ sơ không hứa 365 ngày liên tục không nghỉ — điều đó không ai làm được. Chủ nhật mỗi tuần là ngày đối chiếu nhẹ, và năm ngày trắng cuối năm là ngày nghỉ thật. Bỏ lỡ một ngày thì làm tiếp ngày kế, không quay lại làm bù: chuỗi ngày quan trọng hơn từng ngày.',
  measure:
    'Mỗi ngày sinh ra đúng một bằng chứng kiểm chứng được. Ba trăm sáu mươi lăm bằng chứng cuối năm chính là hồ sơ năng lực, không cần ai xác nhận hộ.',
};

/* --------------------- MẪU MỘT NGÀY: SÁU KHỐI THỜI GIAN ------------------ */

const BLOCK_TEMPLATE: DossierBlock[] = [
  {slot: 'MỒI', minutes: 3, what: 'Nghe ba câu mục tiêu ngay khi mở mắt. Chưa cần hiểu.'},
  {slot: 'NẠP', minutes: 20, what: 'Nghe khối lượng lớn lúc đi lại. Không tua, không ghi.'},
  {slot: 'PHẢN XẠ', minutes: 7, what: 'Hai mươi tình huống bắn nhanh. App đo độ trễ.'},
  {slot: 'NHIỆM VỤ', minutes: 5, what: 'Việc thật bằng tiếng Anh ngoài đời, có bằng chứng.'},
  {slot: 'ĐẦU RA', minutes: 10, what: 'Kể lại ngày 3 phút, viết 5 câu dùng câu mục tiêu.'},
  {slot: 'GIEO ĐÊM', minutes: 4, what: 'Nghe lại ba câu mục tiêu rồi tắt máy. Không nghe khi ngủ.'},
];

const WEEKDAYS = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];

/* ============================== BỐN QUÝ ================================== */

export const DOSSIER_QUARTERS: DossierQuarter[] = [
  {
    no: 1,
    name: 'QUÝ 1 — MỞ TAI, MỞ MIỆNG',
    dayFrom: 1,
    dayTo: 90,
    cefrFrom: 'Pre-A1',
    cefrTo: 'A2',
    bigPromise:
      'Từ chỗ nghe tiếng Anh như một dòng âm liền, tách được ranh giới từ và trả lời được 40 tình huống đời thường dưới 1,5 giây.',
    identityShift:
      'Từ "người sợ nói sai" thành "người nói trước, sửa sau".',
    graduation: {
      examId: 'g-t1',
      note:
        'Bài thi tầng được mở khi học viên qua đủ 5 cấp của tầng, không mở theo ngày. Mốc ngày ở đây là ngày SỚM NHẤT có thể thi, không phải ngày chắc chắn thi.',
    },
    consolidation: {
      name: 'HỢP NHẤT QUÝ 1',
      dayFrom: 85,
      dayTo: 90,
      plan: [
        'Ngày 85–86: nghe lại toàn bộ bản ghi âm của chính mình từ ngày 1.',
        'Ngày 87: làm lại đúng bài kiểm tra ngày 1, so số liệu hai cột.',
        'Ngày 88: dạy lại một người chưa biết gì trong 90 giây, không thuật ngữ.',
        'Ngày 89: viết một trang cho người sẽ bắt đầu quý này sau bạn.',
        'Ngày 90: chọn kỹ năng hẹp cho quý tiếp theo và ký cam kết.',
      ],
    },
    cycles: [
      {
        no: 1,
        name: 'VÒNG 1 — MỞ TAI',
        dayFrom: 1,
        dayTo: 21,
        narrowSkill: 'Nhận diện âm: nối âm, nuốt âm, âm yếu, âm cuối.',
        promise: 'Tai tách được ranh giới từ trong dòng nói tự nhiên.',
        mechanism:
          'Học ngầm theo thống kê — não rút quy luật từ khối lượng tiếp xúc, không từ lời giảng.',
        exitTest: 'Chép chính tả đoạn 45 giây chưa từng nghe, đạt trên 85%.',
        dailyMinutes: 35,
        examId: 'g-c1',
        missions: [
          'Nghe một thông báo tiếng Anh nơi công cộng hoặc trong video, chép lại đúng ba từ cuối cùng nghe được.',
          'Bật phụ đề tiếng Anh một đoạn 60 giây, che phụ đề, nghe lại, rồi đối chiếu xem hụt chỗ nào.',
          'Ghi âm chính mình đọc năm câu, nghe lại và khoanh những âm cuối bị rụng.',
          'Hỏi một người bạn đọc to ba câu tiếng Anh, bạn chép lại, rồi so.',
          'Chọn một bài hát tiếng Anh, chép lại một câu chỉ bằng tai, sau đó tra lời.',
          'Nghe một đoạn tin ngắn hai lần, lần hai đếm xem có bao nhiêu chỗ nối âm.',
          'Nhắn tin thoại 30 giây bằng tiếng Anh cho một người, nói chậm và rõ âm cuối.',
        ],
      },
      {
        no: 2,
        name: 'VÒNG 2 — BẬT PHẢN XẠ',
        dayFrom: 22,
        dayTo: 42,
        narrowSkill: 'Phản xạ có chủ đích: tình huống → phản hồi, không qua dịch.',
        promise: 'Trả lời 40 tình huống thường gặp dưới 1,5 giây.',
        mechanism:
          'Tự động hoá truy xuất — lặp cặp kích thích–phản hồi cho tới khi độ trễ giảm.',
        exitTest: 'Bốn mươi tình huống bốc thăm, độ trễ trung bình dưới 1,5 giây.',
        dailyMinutes: 40,
        examId: 'g-c2',
        missions: [
          'Chào và hỏi thăm một người bằng tiếng Anh, không chuẩn bị trước câu.',
          'Gọi một món đồ uống hoặc đồ ăn hoàn toàn bằng tiếng Anh.',
          'Trả lời ba câu hỏi bất kỳ về bản thân trong 10 giây mỗi câu, ghi âm.',
          'Hỏi đường hoặc hỏi giờ bằng tiếng Anh với người thật hoặc qua tin nhắn thoại.',
          'Từ chối một lời mời một cách lịch sự bằng tiếng Anh, ghi âm.',
          'Xin lỗi và giải thích một sự cố nhỏ bằng tiếng Anh trong 20 giây.',
          'Giới thiệu bản thân trong 30 giây, không đọc giấy, quay video.',
        ],
      },
      {
        no: 3,
        name: 'VÒNG 3 — DÀI HƠI',
        dayFrom: 43,
        dayTo: 63,
        narrowSkill: 'Kéo dài đoạn nói, nối ý, nói vòng khi thiếu từ.',
        promise: 'Nói liên tục 2 phút về chủ đề bất kỳ, không sập câu.',
        mechanism:
          'Kỹ thuật 4/3/2 — cùng nội dung nói ngắn dần, buộc não nén và tăng tốc.',
        exitTest: 'Nói 2 phút về cue card bốc thăm, dưới 3 từ đệm mỗi phút.',
        dailyMinutes: 45,
        examId: 'g-c3',
        missions: [
          'Kể lại một ngày của bạn trong 2 phút, không dừng quá 3 giây.',
          'Mô tả căn phòng bạn đang ngồi trong 90 giây, không lặp từ.',
          'Kể một kỷ niệm trong 2 phút bằng thì quá khứ, ghi âm và đếm lỗi thì.',
          'Giải thích công việc của bạn cho người ngoài ngành trong 2 phút.',
          'Nói vòng: chọn năm từ khó, diễn đạt lại mà không dùng chính từ đó.',
          'Tranh luận một mình hai phía của một câu hỏi, mỗi phía 60 giây.',
          'Kể lại một tin tức bạn đọc hôm nay trong 2 phút.',
        ],
      },
      {
        no: 4,
        name: 'VÒNG 4 — RA THẾ GIỚI',
        dayFrom: 64,
        dayTo: 84,
        narrowSkill: 'Chuyển giao: dùng được ngoài đời, không chỉ trong bài tập.',
        promise: 'Hoàn thành 21 nhiệm vụ thật với người thật.',
        mechanism:
          'Chuyển giao theo bối cảnh — kỹ năng chỉ bền khi luyện trong nhiều bối cảnh.',
        exitTest: 'Hai mươi mốt nhiệm vụ có bằng chứng, ít nhất 7 với người lạ.',
        dailyMinutes: 45,
        examId: 'g-c4',
        missions: [
          'Nói chuyện 3 phút với một người lạ bằng tiếng Anh, trực tuyến hoặc ngoài đời.',
          'Viết một bình luận tiếng Anh dưới một bài đăng công khai và trả lời phản hồi.',
          'Tham gia một phòng nói tiếng Anh và phát biểu ít nhất hai lần.',
          'Hỏi một câu hỏi thật cho một người nước ngoài và ghi lại câu trả lời.',
          'Đặt một cuộc hẹn hoặc một dịch vụ hoàn toàn bằng tiếng Anh.',
          'Dạy lại một mẹo phát âm cho một người khác trong 2 phút.',
          'Ghi hình 90 giây kể về bản thân và gửi cho một người để xin nhận xét.',
        ],
      },
    ],
  },
  {
    no: 2,
    name: 'QUÝ 2 — DỰNG KHUNG',
    dayFrom: 91,
    dayTo: 180,
    cefrFrom: 'A2',
    cefrTo: 'B1',
    bigPromise:
      'Đọc hiểu một bài báo phổ thông không cần từ điển liên tục, và viết được một đoạn 150 từ có luận điểm rõ ràng.',
    identityShift:
      'Từ "người học tiếng Anh" thành "người dùng tiếng Anh để làm việc khác".',
    graduation: {
      examId: 'g-t2',
      note:
        'Bài thi tầng được mở khi học viên qua đủ 5 cấp của tầng, không mở theo ngày. Mốc ngày ở đây là ngày SỚM NHẤT có thể thi, không phải ngày chắc chắn thi.',
    },
    consolidation: {
      name: 'HỢP NHẤT QUÝ 2',
      dayFrom: 175,
      dayTo: 180,
      plan: [
        'Ngày 175–176: đọc lại toàn bộ bài viết của mình từ ngày 91, tự chấm.',
        'Ngày 177: làm lại đề của ngày 91, so hai cột điểm.',
        'Ngày 178: giảng lại một điểm ngữ pháp khó cho người khác trong 3 phút.',
        'Ngày 179: viết bản tổng kết 500 từ về những gì đã đổi trong 90 ngày.',
        'Ngày 180: chọn kỹ năng hẹp cho quý ba và ký cam kết mới.',
      ],
    },
    cycles: [
      {
        no: 1,
        name: 'VÒNG 5 — ĐỌC KHÔNG DỪNG',
        dayFrom: 91,
        dayTo: 111,
        narrowSkill: 'Đọc lướt và đọc quét, chịu được từ chưa biết mà không dừng.',
        promise: 'Đọc một bài 800 từ trong 6 phút và tóm được ý chính.',
        mechanism:
          'Đọc mở rộng — khối lượng ở mức dễ hiểu tạo ra vốn từ bền hơn học danh sách.',
        exitTest: 'Đọc bài 800 từ lạ trong 6 phút, trả lời đúng 8/10 câu hỏi ý.',
        dailyMinutes: 45,
        missions: [
          'Đọc một bài báo tiếng Anh 600 từ, không tra từ, tóm ba câu.',
          'Đọc một trang truyện, gạch mười từ chưa biết nhưng vẫn đọc tiếp đến hết.',
          'Đọc phần mô tả một sản phẩm bằng tiếng Anh và tóm hai lợi ích chính.',
          'Đọc một bài đánh giá phim, đoán quan điểm người viết trước khi đọc câu cuối.',
          'Quét một trang tin trong 60 giây, kể lại năm tiêu đề bằng tiếng Anh.',
          'Đọc hướng dẫn sử dụng bằng tiếng Anh và làm theo đúng ba bước.',
          'Đọc to một đoạn 200 từ, ghi âm, nghe lại và đếm chỗ vấp.',
        ],
      },
      {
        no: 2,
        name: 'VÒNG 6 — VIẾT CÓ XƯƠNG',
        dayFrom: 112,
        dayTo: 132,
        narrowSkill: 'Cấu trúc đoạn: câu chủ đề, luận cứ, ví dụ, câu chốt.',
        promise: 'Viết một đoạn 150 từ có xương sống rõ ràng trong 15 phút.',
        mechanism:
          'Phản hồi có cấu trúc — mỗi bài nộp nhận đúng bốn phần: nhận xét, chiến lược, khắc phục, bài tập.',
        exitTest: 'Viết 150 từ trong 15 phút, đạt tối thiểu 3/4 tiêu chí chấm.',
        dailyMinutes: 45,
        missions: [
          'Viết một đoạn 120 từ trả lời một câu hỏi ý kiến, nộp lấy nhận xét.',
          'Viết lại đoạn hôm qua sau khi đọc nhận xét, chỉ sửa lỗi đã được chỉ ra.',
          'Viết một email xin thông tin bằng tiếng Anh và thật sự gửi đi.',
          'Tóm tắt một bài báo 800 từ xuống còn 80 từ.',
          'Viết năm câu ghép dùng năm liên từ khác nhau, không lặp.',
          'Viết một bình luận 60 từ phản biện một ý kiến bạn không đồng tình.',
          'Viết lại một đoạn cũ của mình cho ngắn đi 30% mà không mất ý.',
        ],
      },
      {
        no: 3,
        name: 'VÒNG 7 — TỪ THEO CỤM',
        dayFrom: 133,
        dayTo: 153,
        narrowSkill: 'Học từ theo cụm đi liền, không học từ đơn lẻ.',
        promise: 'Nắm chắc 300 cụm từ dùng được ngay, không phải 300 từ rời.',
        mechanism:
          'Ôn ngắt quãng — mỗi cụm được gặp lại đúng lúc sắp quên, không sớm hơn.',
        exitTest: 'Dùng đúng 30 cụm bốc thăm trong câu tự đặt, không quá 10 giây mỗi cụm.',
        dailyMinutes: 45,
        missions: [
          'Ghi lại mười cụm từ gặp trong ngày, đặt mỗi cụm vào một câu của chính bạn.',
          'Thay năm từ đơn trong bài viết cũ bằng cụm tự nhiên hơn.',
          'Nói 90 giây và cố ý dùng đúng bảy cụm đã học tuần này.',
          'Tra một động từ thường dùng và ghi năm cụm đi kèm với nó.',
          'Nhắn tin bằng tiếng Anh cho một người, dùng ít nhất ba cụm mới.',
          'Nghe một đoạn 3 phút, bắt và ghi lại mọi cụm động từ nghe được.',
          'Dạy lại năm cụm cho một người khác kèm ví dụ tự nghĩ.',
        ],
      },
      {
        no: 4,
        name: 'VÒNG 8 — NGHE ĐỂ LÀM',
        dayFrom: 154,
        dayTo: 174,
        narrowSkill: 'Nghe lấy thông tin để hành động, không nghe để hiểu chung chung.',
        promise: 'Nghe một lần và làm đúng nhiệm vụ được giao trong đoạn nghe.',
        mechanism:
          'Chuyển giao theo bối cảnh — nghe gắn với một việc phải làm ngay sau đó.',
        exitTest: 'Nghe một hướng dẫn 2 phút, thực hiện đúng 9/10 bước.',
        dailyMinutes: 45,
        missions: [
          'Nghe một công thức nấu ăn bằng tiếng Anh và làm theo đúng thứ tự.',
          'Nghe một đoạn hướng dẫn kỹ thuật và ghi lại năm bước.',
          'Nghe một cuộc phỏng vấn và ghi ba con số được nhắc tới.',
          'Nghe một bản tin thời tiết và lập kế hoạch một ngày dựa vào đó.',
          'Nghe một bài giảng ngắn và đặt hai câu hỏi cho người giảng.',
          'Nghe một đoạn thoại và đoán quan hệ giữa hai người nói.',
          'Nghe lại bản ghi âm của chính bạn từ ngày 1 và viết ba điều đã khác.',
        ],
      },
    ],
  },
  {
    no: 3,
    name: 'QUÝ 3 — VÀO CHIỀU SÂU',
    dayFrom: 181,
    dayTo: 270,
    cefrFrom: 'B1',
    cefrTo: 'B1+',
    bigPromise:
      'Bảo vệ được một quan điểm bằng tiếng Anh trong 5 phút trước phản biện, và viết bài luận 250 từ có lập luận hai chiều.',
    identityShift:
      'Từ "người trả lời câu hỏi" thành "người dẫn được cuộc trò chuyện".',
    graduation: {
      examId: 'g-t3',
      note:
        'Bài thi tầng được mở khi học viên qua đủ 5 cấp của tầng, không mở theo ngày. Mốc ngày ở đây là ngày SỚM NHẤT có thể thi, không phải ngày chắc chắn thi.',
    },
    consolidation: {
      name: 'HỢP NHẤT QUÝ 3',
      dayFrom: 265,
      dayTo: 270,
      plan: [
        'Ngày 265–266: xem lại toàn bộ video tranh luận của mình từ ngày 181.',
        'Ngày 267: làm lại đề của ngày 181 trong đúng điều kiện thi.',
        'Ngày 268: phản biện chính bài luận cũ của mình, tìm ba lỗ hổng.',
        'Ngày 269: dựng một buổi nói 10 phút cho câu lạc bộ và trình bày.',
        'Ngày 270: chọn kỹ năng hẹp cho quý bốn — quý chuẩn thi.',
      ],
    },
    cycles: [
      {
        no: 1,
        name: 'VÒNG 9 — LẬP LUẬN',
        dayFrom: 181,
        dayTo: 201,
        narrowSkill: 'Dựng luận điểm, đưa bằng chứng, chốt lại — nói và viết.',
        promise: 'Bảo vệ một quan điểm 3 phút với ít nhất hai bằng chứng.',
        mechanism:
          'Truy hồi chủ động — buộc lôi lập luận ra khỏi trí nhớ dưới áp lực thời gian.',
        exitTest: 'Bảo vệ một quan điểm bốc thăm 3 phút, có 2 bằng chứng cụ thể.',
        dailyMinutes: 50,
        missions: [
          'Chọn một tin thời sự và viết 100 từ nêu quan điểm kèm hai bằng chứng.',
          'Tranh luận với một người về một chủ đề nhẹ, ghi âm 5 phút.',
          'Viết ba câu phản biện cho chính quan điểm bạn vừa bảo vệ.',
          'Nói 3 phút bảo vệ quan điểm bạn KHÔNG đồng tình, để rèn tính khách quan.',
          'Đọc một bài xã luận và tìm ba chỗ tác giả lập luận yếu.',
          'Trình bày một đề xuất công việc bằng tiếng Anh trong 3 phút.',
          'Ghi hình 4 phút trả lời một câu hỏi khó và tự chấm theo tiêu chí.',
        ],
      },
      {
        no: 2,
        name: 'VÒNG 10 — SẮC THÁI',
        dayFrom: 202,
        dayTo: 222,
        narrowSkill: 'Nói giảm nói tránh, mức độ chắc chắn, lịch sự theo ngữ cảnh.',
        promise: 'Điều chỉnh được giọng điệu theo người nghe và tình huống.',
        mechanism:
          'Mồi ngữ cảnh — gặp cùng nội dung ở ba mức trang trọng khác nhau.',
        exitTest: 'Diễn đạt cùng một thông điệp ở ba mức trang trọng, đúng cả ba.',
        dailyMinutes: 50,
        missions: [
          'Viết cùng một yêu cầu ở ba mức: bạn bè, đồng nghiệp, khách hàng.',
          'Từ chối một đề nghị theo cách giữ được quan hệ, ghi âm.',
          'Đưa một nhận xét tiêu cực theo cách người nghe chấp nhận được.',
          'Diễn đạt lại năm câu quá thẳng thành năm câu mềm hơn.',
          'Nói một dự đoán ở ba mức chắc chắn khác nhau trong cùng chủ đề.',
          'Viết một email xin lỗi khách hàng dài 120 từ.',
          'Nghe một cuộc thoại và đánh dấu mọi chỗ người nói giảm nhẹ ý.',
        ],
      },
      {
        no: 3,
        name: 'VÒNG 11 — TỐC ĐỘ ĐỌC VIẾT',
        dayFrom: 223,
        dayTo: 243,
        narrowSkill: 'Làm việc dưới áp lực đồng hồ, không mất chất lượng.',
        promise: 'Đọc 1.000 từ trong 7 phút và viết 250 từ trong 25 phút.',
        mechanism:
          'Luyện có ngắt quãng dưới áp lực — rút ngắn dần thời gian trên cùng loại việc.',
        exitTest: 'Bài đọc 1.000 từ trong 7 phút đúng 80%, bài viết 250 từ trong 25 phút.',
        dailyMinutes: 55,
        missions: [
          'Đọc một bài 1.000 từ bấm giờ, ghi lại thời gian và số câu đúng.',
          'Viết 250 từ trong 25 phút về một đề bốc thăm, không sửa giữa chừng.',
          'Đọc lướt ba bài trong 9 phút, tóm mỗi bài một câu.',
          'Viết mở bài và kết bài cho ba đề khác nhau, mỗi cặp trong 6 phút.',
          'Làm một đề đọc đầy đủ đúng giờ thi, tự chấm và ghi lỗi vào sổ.',
          'Viết lại bài hôm qua sau nhận xét, vẫn trong 25 phút.',
          'Đọc và tóm tắt một báo cáo dài 1.500 từ trong 12 phút.',
        ],
      },
      {
        no: 4,
        name: 'VÒNG 12 — DẪN DẮT',
        dayFrom: 244,
        dayTo: 264,
        narrowSkill: 'Dẫn một cuộc trò chuyện: hỏi tiếp, chuyển ý, tổng kết.',
        promise: 'Dẫn một cuộc thoại 10 phút mà không để rơi vào im lặng.',
        mechanism:
          'Chuyển giao theo bối cảnh với vai trò mới — từ người trả lời thành người hỏi.',
        exitTest: 'Dẫn một buổi nói 10 phút với người lạ, dưới 2 khoảng lặng quá 5 giây.',
        dailyMinutes: 55,
        missions: [
          'Phỏng vấn một người 10 phút bằng tiếng Anh, chuẩn bị bảy câu hỏi mở.',
          'Dẫn một phần trong buổi câu lạc bộ, giới thiệu và tổng kết.',
          'Hỏi tiếp năm lần liên tiếp từ một câu trả lời của người khác.',
          'Chuyển chủ đề ba lần trong một cuộc thoại mà không gượng.',
          'Tóm tắt lại điều người khác vừa nói trước khi đưa ý của mình.',
          'Dẫn một buổi luyện cho người mới trong 15 phút.',
          'Ghi hình 10 phút dẫn một cuộc thoại và tự chấm theo tiêu chí dẫn dắt.',
        ],
      },
    ],
  },
  {
    no: 4,
    name: 'QUÝ 4 — CHUẨN THI',
    dayFrom: 271,
    dayTo: 360,
    cefrFrom: 'B1+',
    cefrTo: 'B2',
    bigPromise:
      'Đạt mức B2 vững — tương đương IELTS 5.5–6.0 trong điều kiện thi thật, và có hồ sơ 365 bằng chứng.',
    identityShift:
      'Từ "người luyện thi" thành "người có năng lực mà kỳ thi chỉ đo lại".',
    graduation: {
      examId: 'g-t4',
      note:
        'Bài thi tầng được mở khi học viên qua đủ 5 cấp của tầng, không mở theo ngày. Mốc ngày ở đây là ngày SỚM NHẤT có thể thi, không phải ngày chắc chắn thi.',
    },
    consolidation: {
      name: 'HỢP NHẤT QUÝ 4 — TỔNG KẾT NĂM',
      dayFrom: 355,
      dayTo: 360,
      plan: [
        'Ngày 355–356: xem lại toàn bộ 360 bằng chứng, chọn ra 20 cái tiêu biểu.',
        'Ngày 357: làm đề thi thử đầy đủ trong đúng điều kiện phòng thi.',
        'Ngày 358: đối chiếu điểm ngày 1 với điểm hôm nay trên cả bốn kỹ năng.',
        'Ngày 359: viết bản tổng kết năm 1.000 từ và ghi hình 5 phút kể lại.',
        'Ngày 360: viết cam kết năm hai, đặt mục tiêu cụ thể có số.',
      ],
    },
    cycles: [
      {
        no: 1,
        name: 'VÒNG 13 — ĐỌC CHUẨN THI',
        dayFrom: 271,
        dayTo: 291,
        narrowSkill: 'Ba mươi bảy dạng câu hỏi đọc, chiến thuật riêng cho từng dạng.',
        promise: 'Làm đúng 30/40 câu đọc trong 60 phút.',
        mechanism: 'Luyện phân biệt dạng — nhận ra dạng câu trước khi tìm đáp án.',
        exitTest: 'Một đề đọc đầy đủ, 60 phút, tối thiểu 30/40.',
        dailyMinutes: 60,
        missions: [
          'Làm một passage đọc bấm giờ 20 phút, ghi lỗi theo dạng câu.',
          'Phân loại mười câu sai gần nhất theo dạng và tìm quy luật.',
          'Làm riêng 15 câu True/False/Not Given và giải thích từng lựa chọn.',
          'Làm riêng một bài matching headings và ghi lại cách bạn loại trừ.',
          'Đọc một passage và tự đặt năm câu hỏi kiểu đề thi.',
          'Làm một đề đọc đầy đủ 60 phút và chấm thẳng tay.',
          'Rà sổ lỗi đọc, làm lại năm câu từng sai, không nhìn đáp án cũ.',
        ],
      },
      {
        no: 2,
        name: 'VÒNG 14 — NGHE CHUẨN THI',
        dayFrom: 292,
        dayTo: 312,
        narrowSkill: 'Nghe một lần duy nhất, bắt tín hiệu chuyển hướng và bẫy thay đổi.',
        promise: 'Làm đúng 30/40 câu nghe.',
        mechanism: 'Dự đoán trước khi nghe — đọc câu hỏi và đoán loại thông tin cần bắt.',
        exitTest: 'Một đề nghe đầy đủ, tối thiểu 30/40.',
        dailyMinutes: 60,
        missions: [
          'Làm một section nghe bấm giờ, ghi lại mọi chỗ bị bẫy đổi đáp án.',
          'Nghe lại đúng đoạn đã sai, chép chính tả trọn câu chứa đáp án.',
          'Luyện riêng số, ngày tháng, tên riêng đánh vần trong 15 phút.',
          'Đọc trước bộ câu hỏi và viết dự đoán loại từ cần điền cho từng chỗ.',
          'Nghe một bài giảng học thuật 8 phút và ghi dàn ý.',
          'Làm một đề nghe đầy đủ trong đúng điều kiện thi.',
          'Rà sổ lỗi nghe, tìm ba âm bạn hay nghe nhầm và luyện riêng.',
        ],
      },
      {
        no: 3,
        name: 'VÒNG 15 — VIẾT CHUẨN THI',
        dayFrom: 313,
        dayTo: 333,
        narrowSkill: 'Task 1 mô tả số liệu, Task 2 luận hai chiều — đúng giờ, đúng tiêu chí.',
        promise: 'Task 1 trong 20 phút, Task 2 trong 40 phút, đạt tiêu chí ở mức 6.0.',
        mechanism:
          'Phản hồi có cấu trúc theo bốn tiêu chí chấm, sửa đúng một tiêu chí mỗi lần.',
        exitTest: 'Một bộ Writing đầy đủ 60 phút, đạt mức 6.0 theo bảng chấm.',
        dailyMinutes: 60,
        missions: [
          'Viết Task 1 trong 20 phút, nộp và nhận nhận xét theo bốn tiêu chí.',
          'Viết Task 2 trong 40 phút về đề bốc thăm, không dùng mẫu học thuộc.',
          'Sửa lại bài hôm qua, chỉ tập trung vào một tiêu chí bị điểm thấp nhất.',
          'Luyện riêng phần mô tả xu hướng: mười câu, mười cách diễn đạt khác nhau.',
          'Viết ba mở bài Task 2 cho ba đề khác nhau trong 12 phút.',
          'Làm một bộ Writing đầy đủ 60 phút trong điều kiện thi.',
          'Đọc lại năm bài cũ, lập danh sách năm lỗi lặp lại nhiều nhất.',
        ],
      },
      {
        no: 4,
        name: 'VÒNG 16 — NÓI CHUẨN THI',
        dayFrom: 334,
        dayTo: 354,
        narrowSkill: 'Ba phần thi nói — trả lời ngắn, cue card 2 phút, thảo luận trừu tượng.',
        promise: 'Đạt mức 6.0 nói trong bài thi thử có giám khảo.',
        mechanism:
          'Tự động hoá truy xuất dưới áp lực — thi thử lặp lại nhiều lần với người lạ.',
        exitTest: 'Một bài thi nói đầy đủ với người chấm, đạt tối thiểu 6.0.',
        dailyMinutes: 60,
        missions: [
          'Làm Part 1 với mười hai câu hỏi bốc thăm, ghi âm và tự chấm.',
          'Làm Part 2 với cue card lạ: 1 phút chuẩn bị, 2 phút nói, không dừng.',
          'Làm Part 3 với năm câu trừu tượng, mỗi câu trả lời ít nhất 40 giây.',
          'Thi thử nói đầy đủ với một người khác đóng vai giám khảo.',
          'Nghe lại bản ghi và đếm từ đệm, đặt mục tiêu giảm một nửa hôm sau.',
          'Luyện riêng phần bạn yếu nhất trong ba phần, 30 phút liên tục.',
          'Thi thử đầy đủ lần cuối và so điểm với lần đầu của vòng.',
        ],
      },
    ],
  },
];

/* ------------------------------ NĂM NGÀY TRẮNG --------------------------- */

export const WHITE_DAYS = {
  name: 'NGÀY 361–365 — NĂM NGÀY TRẮNG',
  why:
    'Năm ngày này không có bài. Chúng có mặt trong hồ sơ vì một lý do: một hệ thống không chừa chỗ để nghỉ là một hệ thống sẽ bị bỏ. Nghỉ có kế hoạch khác hoàn toàn với bỏ cuộc.',
  plan: [
    'Ngày 361: không học. Xem một bộ phim tiếng Anh vì thích, không phân tích gì.',
    'Ngày 362: gặp người đã đồng hành cùng bạn năm nay và cảm ơn họ.',
    'Ngày 363: đọc lại nhật ký ngày 1 của chính mình.',
    'Ngày 364: chọn phần thưởng đã hứa với bản thân từ đầu năm và nhận nó.',
    'Ngày 365: viết một trang cho người sẽ bắt đầu ngày 1 sau bạn.',
  ],
};

/* ====================== DỰNG 365 NGÀY TỪ CẤU TRÚC TRÊN =================== */

/** Các ngày cần ôn lại theo lịch giãn cách: 1, 3, 7, 14, 30, 60 ngày trước. */
const SPACING = [1, 3, 7, 14, 30, 60];

function reviewFor(day: number): number[] {
  return SPACING.map((d) => day - d).filter((d) => d >= 1);
}

/**
 * Việc phải làm ở khối ĐẦU RA co giãn theo đúng số phút được cấp. Khối này
 * dài 4 phút ở vòng nhẹ và 14 phút ở vòng nặng — nếu để nguyên một câu mô tả
 * cho cả hai thì người học sẽ được giao việc không thể làm xong trong thời
 * gian có.
 */
function outputTask(minutes: number): string {
  const talk = Math.max(1, Math.round((minutes - 1) * 0.35));
  const sentences = Math.max(3, Math.min(6, minutes - 2));
  return `Kể lại ngày ${talk} phút, viết ${sentences} câu dùng câu mục tiêu.`;
}

function scaleBlocks(total: number): DossierBlock[] {
  const base = BLOCK_TEMPLATE.reduce((s, b) => s + b.minutes, 0);
  const grow = total - base;
  const napShare = Math.round(grow * 0.6);
  return BLOCK_TEMPLATE.map((b, i) => {
    // Chênh lệch so với mẫu dồn vào khối NẠP và ĐẦU RA — hai khối sinh ra
    // nhiều tự động hoá nhất trên mỗi phút bỏ ra, và cũng là hai khối co giãn
    // được mà không mất ý nghĩa. Bốn khối còn lại giữ nguyên độ dài.
    const share = i === 1 ? napShare : i === 4 ? grow - napShare : 0;
    const minutes = b.minutes + share;
    return {...b, minutes, what: i === 4 ? outputTask(minutes) : b.what};
  });
}

/**
 * Dựng đủ 365 ngày. Hàm thuần: cùng đầu vào luôn cho cùng kết quả, không
 * đọc đồng hồ, không đọc bộ nhớ ngoài — nhờ vậy hồ sơ in ra hôm nay và hồ sơ
 * in ra sang năm là một.
 */
export function buildYear(): DossierDay[] {
  const days: DossierDay[] = [];

  for (let day = 1; day <= 365; day++) {
    const week = Math.ceil(day / 7);
    const weekday = WEEKDAYS[(day - 1) % 7];
    const isSunday = (day - 1) % 7 === 6;

    // Năm ngày trắng
    if (day >= 361) {
      days.push({
        day,
        quarter: 0,
        cycle: 0,
        dayInCycle: day - 360,
        week,
        weekday,
        kind: 'trắng',
        title: `Ngày trắng ${day - 360}/5`,
        focus: 'Không có bài. Nghỉ có kế hoạch.',
        targets: '—',
        blocks: [],
        mission: WHITE_DAYS.plan[day - 361].replace(/^Ngày \d+: /, ''),
        measure: 'Không đo. Đây là ngày duy nhất trong năm không đo gì.',
        evidence: 'Một dòng ghi lại bạn đã làm gì hôm nay.',
        reviewDays: [],
        minutes: 0,
      });
      continue;
    }

    const q = DOSSIER_QUARTERS.find((x) => day >= x.dayFrom && day <= x.dayTo)!;
    const cyc = q.cycles.find((c) => day >= c.dayFrom && day <= c.dayTo);

    // Sáu ngày hợp nhất cuối mỗi quý
    if (!cyc) {
      const idx = day - q.consolidation.dayFrom;
      const line = q.consolidation.plan[Math.min(idx, q.consolidation.plan.length - 1)];
      const isExam = /kiểm tra|đề của ngày|thi thử/.test(line);
      days.push({
        day,
        quarter: q.no,
        cycle: 0,
        dayInCycle: idx + 1,
        week,
        weekday,
        kind: isExam ? 'kiểm tra' : 'hợp nhất',
        title: `${q.consolidation.name} — ngày ${idx + 1}/6`,
        focus: 'Không nạp gì mới. Củng cố những gì đã có.',
        targets: 'Không có câu mục tiêu mới. Ôn lại câu mục tiêu của cả quý.',
        blocks: [
          {slot: 'HỢP NHẤT', minutes: 45, what: line.replace(/^Ngày [\d–-]+: /, '')},
          {slot: 'GIEO ĐÊM', minutes: 4, what: 'Nghe lại ba câu bạn thấy khó nhất quý này.'},
        ],
        mission: line.replace(/^Ngày [\d–-]+: /, ''),
        measure:
          idx === 2
            ? 'So sánh trực tiếp với số liệu ngày đầu quý — hai cột, cùng một đề.'
            : 'Hoàn thành đủ việc của ngày, không đo tốc độ.',
        evidence: 'Bản ghi hoặc bản viết của ngày hợp nhất, nộp vào hồ sơ quý.',
        reviewDays: reviewFor(day),
        minutes: 49,
      });
      continue;
    }

    const dayInCycle = day - cyc.dayFrom + 1;
    const round = Math.floor((dayInCycle - 1) / 7) + 1; // 1, 2, 3 — ba lượt
    const mission = cyc.missions[(dayInCycle - 1) % 7];
    const hardness = ['lượt 1 · làm quen', 'lượt 2 · nâng mức', 'lượt 3 · khó nhất'][
      Math.min(round - 1, 2)
    ];

    // Bài ra vòng luôn thắng ngày Chủ Nhật đối chiếu. Vòng 21 ngày trùng đúng
    // ba tuần, nên ngày 21 của mọi vòng trong quý 1 rơi vào Chủ Nhật — nếu
    // không ưu tiên ở đây thì bốn bài ra vòng của quý 1 sẽ biến mất.
    const isExitTest = dayInCycle === 21;

    if (isSunday && !isExitTest) {
      days.push({
        day,
        quarter: q.no,
        cycle: cyc.no,
        dayInCycle,
        week,
        weekday,
        kind: 'đối chiếu',
        title: `Chủ Nhật đối chiếu — tuần ${week}`,
        focus: 'Nghe lại chính mình đầu tuần, đo xem đã đổi gì.',
        targets: 'Ôn lại toàn bộ câu mục tiêu của tuần, không thêm câu mới.',
        blocks: [
          {slot: 'ĐỐI CHIẾU', minutes: 15, what: 'Nghe bản ghi thứ Hai và bản ghi thứ Bảy cạnh nhau.'},
          {slot: 'SỔ LỖI', minutes: 10, what: 'Ghi ba lỗi lặp lại nhiều nhất tuần này vào sổ.'},
          {slot: 'GIEO ĐÊM', minutes: 4, what: 'Nghe lại ba câu khó nhất tuần rồi tắt máy.'},
        ],
        mission: 'Kể lại tuần vừa rồi bằng tiếng Anh trong 2 phút, ghi âm.',
        measure: 'Số lỗi lặp lại tuần này so với tuần trước — phải giảm.',
        evidence: 'Bản ghi 2 phút và ba dòng sổ lỗi.',
        reviewDays: reviewFor(day),
        minutes: 29,
      });
      continue;
    }

    days.push({
      day,
      quarter: q.no,
      cycle: cyc.no,
      dayInCycle,
      week,
      weekday,
      kind: isExitTest ? 'kiểm tra' : 'luyện',
      title: isExitTest
        ? `${cyc.name} — BÀI RA VÒNG`
        : `${cyc.name} — ngày ${dayInCycle}/21`,
      focus: isExitTest ? cyc.exitTest : cyc.narrowSkill,
      targets: `Ba câu mục tiêu của ngày ${day}, rút từ kỹ năng hẹp của vòng, gặp lại 5 lần trong ngày.`,
      blocks: isExitTest
        ? [
            {slot: 'KHỞI ĐỘNG', minutes: 10, what: 'Ôn nhanh ba câu khó nhất vòng này.'},
            {slot: 'BÀI RA VÒNG', minutes: 40, what: cyc.exitTest},
            {slot: 'ĐỐI CHIẾU', minutes: 15, what: 'So kết quả với ngày 1 của vòng, ghi vào hồ sơ.'},
          ]
        : scaleBlocks(cyc.dailyMinutes),
      mission: isExitTest
        ? 'Nộp kết quả bài ra vòng và viết ba dòng về điều khó nhất bạn vượt qua.'
        : `${mission} (${hardness})`,
      measure: isExitTest
        ? cyc.exitTest
        : 'Độ trễ trung bình ở khối PHẢN XẠ — đây là số duy nhất được chấm trong ngày.',
      evidence: isExitTest
        ? 'Kết quả bài ra vòng có số liệu, lưu vào hồ sơ quý.'
        : 'Bằng chứng của khối NHIỆM VỤ: ảnh, bản ghi âm hoặc ảnh chụp màn hình.',
      reviewDays: reviewFor(day),
      minutes: isExitTest ? 65 : cyc.dailyMinutes,
    });
  }

  return days;
}

/**
 * Dựng 365 ngày ở lần gọi đầu tiên rồi giữ lại, thay vì dựng ngay lúc nạp
 * module. Ai không mở tab Hồ sơ thì không phải trả giá cho việc dựng nó.
 */
let _nam: DossierDay[] | null = null;

export function dossierYear(): DossierDay[] {
  if (_nam === null) _nam = buildYear();
  return _nam;
}
