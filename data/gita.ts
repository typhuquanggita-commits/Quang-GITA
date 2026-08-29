/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {GitaStep, ThinkingLane, Filter, StrategicThread} from '../types';

/* ==========================================================================
   MÔ THỨC GITA — BẢN GỐC CỦA HỌC VIỆN
   Toàn bộ nội dung tệp này lấy từ tài liệu do học viện cung cấp: sơ đồ hành
   trình 12 bước, sơ đồ tư duy viết tay, và hai sơ đồ BNI.

   Một đính chính cần ghi lại: bản trước của hệ thống có bốn pha G–I–T–A
   (GIEO · IN · THẤM · ÁP) do tôi tự dựng khi chưa có tài liệu gốc, và đã ghi
   rõ đó là bản tạm. Tài liệu gốc cho thấy GITA là TÊN HỌC VIỆN, không phải
   viết tắt của bốn pha. Hành trình thật là HIỂU MÌNH → RÈN MÌNH → BỨT PHÁ →
   TRƯỞNG THÀNH. Bốn pha bịa đã được thay.
   ========================================================================== */

export const GITA_CREED = {
  name: 'HIỂU MÌNH · RÈN MÌNH · BỨT PHÁ · TRƯỞNG THÀNH',
  promise:
    'GITA đồng hành cùng học viên trên hành trình kiến tạo phiên bản tốt nhất của chính mình.',
  fourPhases: [
    'HIỂU MÌNH — để biết điểm mạnh và tiềm năng.',
    'RÈN MÌNH — để xây thói quen và bản lĩnh.',
    'BỨT PHÁ — để vượt qua giới hạn và chinh phục mục tiêu.',
    'TRƯỞNG THÀNH — để sống hạnh phúc và tạo giá trị cho cuộc đời.',
  ],
  moreThanASchool:
    'GITA hơn cả một nơi học: đó là nơi kiến tạo ước mơ, đồng hành và nâng tầm thế hệ trẻ Việt Nam.',
  howEnglishFits:
    'Tiếng Anh không phải một môn tách rời trong mô thức này. Nó là một trong ba trục của bước 05 — Toán, Tiếng Anh, Tư duy — và là nơi mười một bước còn lại được kiểm chứng. Một học viên hiểu mình mà không rèn mình thì tiếng Anh dừng ở tháng thứ tư; rèn mình mà không bứt phá thì dừng ở B1.',
};

/* --------------------- HÀNH TRÌNH 12 BƯỚC CỦA HỌC VIÊN ------------------- */

export const GITA_JOURNEY: GitaStep[] = [
  {
    no: 1,
    phase: 'HIỂU MÌNH',
    name: 'Lắng nghe, kết nối, thấu hiểu',
    shortName: 'LẮNG NGHE',
    points: [
      'Lắng nghe câu chuyện của học viên',
      'Kết nối và xây dựng niềm tin',
      'Thấu hiểu mong muốn của học viên và phụ huynh',
    ],
    months: 'Tháng 0 — trước khi học buổi nào',
    englishRole:
      'Chưa dạy chữ nào. Buổi này chỉ để biết vì sao người này cần tiếng Anh, và ai đang thật sự muốn điều đó — em hay bố mẹ em.',
  },
  {
    no: 2,
    phase: 'HIỂU MÌNH',
    name: 'Test định hướng năng lực, thấu hiểu vấn đề',
    shortName: 'ĐỊNH VỊ',
    points: [
      'Đánh giá năng lực hiện tại',
      'Phân tích điểm mạnh, điểm cần cải thiện',
      'Thấu hiểu nguyên nhân gốc rễ vấn đề',
    ],
    months: 'Tháng 1',
    englishRole:
      'Bài đo bốn kỹ năng cộng bài chép chính tả 45 giây. Kết quả không để xếp lớp mà để tìm nguyên nhân: nghe hụt vì thiếu từ, hay vì tai chưa tách được âm.',
  },
  {
    no: 3,
    phase: 'HIỂU MÌNH',
    name: 'Định hướng lộ trình cá nhân hoá 90 ngày, 365 ngày nâng cấp',
    shortName: 'LỘ TRÌNH',
    points: [
      'Lộ trình 90 ngày đột phá',
      'Lộ trình 365 ngày toàn diện',
      'Mục tiêu rõ ràng — đo lường được',
    ],
    months: 'Tháng 1–3',
    englishRole:
      'Nối thẳng vào hồ sơ 365 ngày và chu kỳ 21·90 đã có trong hệ thống. Đây là chỗ mô thức GITA và lộ trình tiếng Anh khớp làm một.',
  },
  {
    no: 4,
    phase: 'HIỂU MÌNH',
    name: 'Coaching giải pháp 1–1',
    shortName: 'COACHING 1–1',
    points: [
      'Coach chuyên gia đồng hành',
      'Đưa ra giải pháp phù hợp',
      'Theo dõi — điều chỉnh — đồng hành liên tục',
      'Truyền cảm hứng và tạo động lực',
    ],
    months: 'Tháng 1–36, nhịp giãn dần',
    englishRole:
      'Chạy theo đúng khung buổi kèm 60 phút đã có: học viên nói 35 phút, chốt đúng một điều cần sửa.',
  },
  {
    no: 5,
    phase: 'RÈN MÌNH',
    name: 'Lộ trình giỏi Toán – Tiếng Anh – Tư duy, kỹ năng học giỏi',
    shortName: 'BA TRỤC',
    points: [
      'Toán: Tư duy – Logic – Ứng dụng',
      'Tiếng Anh: Giao tiếp – Học thuật – Thi chứng chỉ',
      'Tư duy: Phân tích – Sáng tạo – Giải quyết vấn đề',
      'Kỹ năng học giỏi: Phương pháp – Kỷ luật – Tối ưu hiệu quả',
    ],
    months: 'Tháng 4–36',
    englishRole:
      'Trục chính của ENGWIN365. Ba nhánh giao tiếp, học thuật, thi chứng chỉ tương ứng ba chặng của lộ trình 36 tháng.',
  },
  {
    no: 6,
    phase: 'RÈN MÌNH',
    name: 'Tư vấn tâm lý học đường',
    shortName: 'TÂM LÝ',
    points: [
      'Thấu hiểu tâm lý',
      'Hỗ trợ cảm xúc',
      'Giải toả áp lực',
      'Xây dựng sự tự tin và cân bằng',
    ],
    months: 'Khi cần, không theo lịch',
    englishRole:
      'Đây là bước trợ lý AI TUYỆT ĐỐI không được làm thay. Gặp dấu hiệu vượt phạm vi học tập thì dừng giao bài và chuyển người có chuyên môn.',
  },
  {
    no: 7,
    phase: 'RÈN MÌNH',
    name: 'Nâng cấp năng lực qua các khoá trại huấn luyện',
    shortName: 'TRẠI',
    points: [
      'Trại Gen Alpha',
      'Trại Leader Boom',
      'Trại kỹ năng sống',
      'Trại năng lực lãnh đạo',
      'Trải nghiệm thực tế — Bứt phá giới hạn',
    ],
    months: 'Mỗi quý một đợt',
    englishRole:
      'Trại là nơi tiếng Anh rời khỏi bàn học. Mỗi trại có ít nhất một khối bắt buộc dùng tiếng Anh với người thật, có hệ quả thật.',
  },
  {
    no: 8,
    phase: 'BỨT PHÁ',
    name: 'Đồng hành tạo kỳ tích học tập',
    shortName: 'KỲ TÍCH',
    points: [
      'Theo sát tiến độ',
      'Hỗ trợ kịp thời',
      'Vượt qua thử thách',
      'Đạt kết quả vượt trội và bền vững',
    ],
    months: 'Tháng 13–30',
    englishRole:
      'Chặng này khớp với lộ trình xuất sắc: luyện ở rìa khả năng, phản hồi trong vài phút, đầu ra công khai.',
  },
  {
    no: 9,
    phase: 'BỨT PHÁ',
    name: 'Nuôi dưỡng đam mê',
    shortName: 'ĐAM MÊ',
    points: [
      'Khám phá sở thích',
      'Phát triển thế mạnh',
      'Truyền cảm hứng',
      'Biến đam mê thành động lực học tập',
    ],
    months: 'Tháng 13–36',
    englishRole:
      'Chuyển nguồn học liệu sang đúng lĩnh vực học viên mê. Đây là đòn bẩy mạnh nhất và cũng rẻ nhất — không tốn thêm giờ nào.',
  },
  {
    no: 10,
    phase: 'BỨT PHÁ',
    name: 'Học viên tạo giá trị',
    shortName: 'CHO ĐI',
    points: [
      'Sống có trách nhiệm',
      'Chia sẻ và giúp đỡ cộng đồng',
      'Tạo ra giá trị tích cực cho xã hội',
    ],
    months: 'Tháng 19–36',
    englishRole:
      'Học viên bắt đầu kèm người mới. Đây vừa là cho đi vừa là bài kiểm tra khắt khe nhất: dạy lại được nghĩa là đã thật sự hiểu.',
  },
  {
    no: 11,
    phase: 'TRƯỞNG THÀNH',
    name: 'Học viên phát triển toàn diện',
    shortName: 'TOÀN DIỆN',
    points: [
      'Trí tuệ — Thể chất',
      'Cảm xúc — Xã hội',
      'Nhân cách — Kỹ năng',
      'Tự tin — Bản lĩnh — Hạnh phúc',
    ],
    months: 'Tháng 25–36',
    englishRole:
      'Tiếng Anh lúc này chỉ còn là công cụ. Thước đo chuyển từ điểm số sang việc làm được bằng tiếng Anh.',
  },
  {
    no: 12,
    phase: 'TRƯỞNG THÀNH',
    name: 'Sẵn sàng cho tương lai',
    shortName: 'SẴN SÀNG',
    points: [
      'Tự tin bước vào tương lai',
      'Sẵn sàng chinh phục mọi mục tiêu',
      'Trở thành phiên bản tốt nhất của chính mình',
    ],
    months: 'Tháng 31–36',
    englishRole:
      'Về đích IELTS, và quan trọng hơn: bàn giao lại cho người đi sau những gì mình đã học được về CÁCH HỌC.',
  },
];

/* ------------- SƠ ĐỒ TƯ DUY GỐC: BÀN ĐẠP DẪN TỚI KỶ LUẬT ----------------- */

export const THINKING_CREED = {
  name: 'BÀN ĐẠP PHÁT TRIỂN CÁ NHÂN',
  from:
    'Sứ giả mang trải cảm và giải pháp tới người học đang đứng giữa mưa và nắng — tức là giữa hoàn cảnh thật, không phải trong điều kiện lý tưởng.',
  start: 'Mọi thứ bắt đầu từ ĐỊNH VỊ HIỆN TẠI. Không định vị đúng thì mọi lộ trình đều là lộ trình của người khác.',
  end:
    'Ba luồng chạy song song và cùng đổ về KỶ LUẬT. Kỷ luật không phải điểm xuất phát mà là kết quả — đó là chỗ hầu hết chương trình hiểu ngược.',
  destination:
    'Đích là TIÊU CHUẨN và CHÂN DUNG: một hình mẫu kiệt xuất cụ thể, không phải một điểm số.',
};

export const THINKING_LANES: ThinkingLane[] = [
  {
    id: 'l-habit',
    from: 'THÓI QUEN',
    chain: ['Tiêu chí lựa chọn', 'Nguồn lực hệ thống', 'Giải pháp', 'TÀI NĂNG'],
    meaning:
      'Thói quen quyết định bạn chọn gì mỗi ngày; lựa chọn lặp lại đủ lâu thì hệ thống nguồn lực tự hình thành, và cái người ngoài gọi là tài năng chính là kết quả cuối của chuỗi đó.',
  },
  {
    id: 'l-action',
    from: 'HÀNH ĐỘNG',
    chain: ['Đòn bẩy', 'Công cụ – Dụng cụ', 'NGHỊ LỰC'],
    meaning:
      'Hành động không có đòn bẩy thì cạn sức nhanh. Đòn bẩy đúng và công cụ đúng biến sức lực thành nghị lực bền — thứ đi được đường dài.',
  },
  {
    id: 'l-exp',
    from: 'TRẢI NGHIỆM',
    chain: ['Tốc độ', 'Niềm tin', 'HÀNH VI'],
    meaning:
      'Trải nghiệm đủ nhanh và đủ dày mới sinh niềm tin; niềm tin mới đổi được hành vi. Giảng lý lẽ mà bỏ qua trải nghiệm là bỏ qua đúng mắt xích đầu tiên.',
  },
];

export const SUCCESS_PATH = {
  name: 'LỘ TRÌNH THÀNH CÔNG',
  chain: ['Ghi nhận', 'Cảm hứng', 'Động lực', 'Sáng tạo'],
  order:
    'Thứ tự này không đảo được. Ghi nhận đến trước cảm hứng — người chưa được ghi nhận thì không có cảm hứng nào bám lại được. Và sáng tạo là cuối cùng, không phải điều kiện đầu vào.',
  sixRoles: [
    'Định hướng',
    'Đồng hành',
    'Đội nhóm',
    'Đòn bẩy',
    'Đánh giá',
    'Động viên',
  ],
  threeOutcomes: [
    'THỰC TẠI RỘNG — nhìn thấy nhiều lựa chọn hơn trước',
    'NIỀM TIN — tin mình làm được, dựa trên bằng chứng tự thân',
    'CÁ NHÂN ĐẶC NHẤT — không giống ai, và biết chỗ khác biệt của mình ở đâu',
  ],
};

/* ----------------------------- BỐN PHỄU LỌC ----------------------------- */

export const FILTER_NOTE = {
  heading: 'BỐN PHỄU LỌC',
  fromSource: 'Ngôn Ngữ – Trải Nghiệm – Ký Ức – Niềm Tin – Thấu Cảm',
  ambiguity:
    'Tài liệu gốc ghi tiêu đề "4 Phễu Lọc" nhưng liệt kê NĂM tên trong ngoặc. Cách đọc tôi chọn: bốn phễu đầu là bốn lớp thông điệp phải đi qua, còn THẤU CẢM là công cụ cố vấn dùng để đi xuyên qua chúng — nó xuất hiện ở đầu sơ đồ, gắn với Sứ Giả, chứ không nằm cùng nhóm. Nếu cách đọc này sai, sửa hằng FILTERS trong data/gita.ts là toàn hệ thống đổi theo.',
  alsoUnclear:
    'Dòng "3 an + Độ" ở cuối sơ đồ tôi chưa đọc ra được nghĩa chắc chắn nên không đưa vào hệ thống. Không đoán là an toàn hơn đoán sai — cho tôi biết nghĩa và tôi bổ sung.',
};

export const FILTERS: Filter[] = [
  {
    no: 1,
    name: 'NGÔN NGỮ',
    distorts:
      'Cùng một câu, mỗi người hiểu một nghĩa. "Cố gắng hơn" với cố vấn nghĩa là thêm 15 phút đúng chỗ; với học viên nghĩa là ngồi lâu hơn mà vẫn làm sai.',
    coachMove:
      'Bắt học viên nói lại bằng lời của mình trước khi kết thúc buổi. Đây là lý do khối CHỐT tồn tại trong buổi kèm 60 phút.',
  },
  {
    no: 2,
    name: 'TRẢI NGHIỆM',
    distorts:
      'Học viên đã học tiếng Anh mười năm và thất bại sẽ nghe lời khuyên mới qua lớp kính của mười năm đó. Lời khuyên đúng vẫn bị lọc thành "lại như cũ thôi".',
    coachMove:
      'Cho một trải nghiệm khác trước, nói sau. Một chiến thắng nhỏ trong 10 phút đầu phá được lớp lọc này nhanh hơn mọi lý lẽ.',
  },
  {
    no: 3,
    name: 'KÝ ỨC',
    distorts:
      'Ký ức về một cô giáo từng chê phát âm sẽ khiến học viên im lặng trong mọi lớp sau đó, kể cả khi không ai chê nữa.',
    coachMove:
      'Hỏi về lần thất bại cũ trước khi giao bài nói. Gọi tên được ký ức đó thì nó thôi điều khiển ngầm.',
  },
  {
    no: 4,
    name: 'NIỀM TIN',
    distorts:
      'Niềm tin "mình không có năng khiếu ngoại ngữ" lọc bỏ mọi bằng chứng ngược lại. Học viên tiến bộ vẫn tự giải thích là gặp may.',
    coachMove:
      'Dựng bằng chứng tự thân và đặt cạnh nhau: bản ghi hôm nay cạnh bản ghi 90 ngày trước. Bằng chứng của chính họ là thứ duy nhất đi qua được lớp này.',
  },
];

/* --------- NĂM LỐI CHIẾN LƯỢC — CHUYỂN TỪ BNI SANG HỌC VIỆN -------------- */

export const BNI_CREED = {
  source: 'Hai sơ đồ hành trình BNI của Trương Nhật Quang.',
  core: 'Givers Gain — cho đi là nhận lại.',
  whyItTransfers:
    'BNI dựng một hệ thống để một lời giới thiệu sinh ra lời giới thiệu tiếp theo. Học viện cần đúng cấu trúc đó cho một thứ khác: làm sao một học viên thành công sinh ra học viên thành công tiếp theo. Cùng bài toán nhân tầng, khác đối tượng.',
  theKeyIdea:
    'Câu chốt của BNI là "Thiết kế đúng hành trình — Ref sẽ sinh Ref". Bản học viện: thiết kế đúng hành trình, học viên sẽ sinh học viên. Cả hai đều nói rằng kết quả là hệ quả của hành trình được thiết kế có chủ đích, không phải của nỗ lực rời rạc.',
};

export const STRATEGIC_THREADS: StrategicThread[] = [
  {
    no: 1,
    bni: 'Đúng người — nhận diện đúng chân dung',
    gita: 'ĐỊNH VỊ ĐÚNG',
    what:
      'Biết chính xác học viên này đang ở đâu, cần gì, và có bao nhiêu thời gian thật. Bước 1 và 2 của hành trình 12 bước làm việc này.',
    fails:
      'Nhận mọi học viên rồi cho chung một lộ trình. Người chưa đủ nền sẽ gãy ở tháng thứ tư, và học viện mất cả người lẫn uy tín.',
  },
  {
    no: 2,
    bni: 'Đúng thông điệp — truyền thông đủ rõ, đủ nhớ, đủ tin',
    gita: 'TRUYỀN THÔNG ĐÚNG',
    what:
      'Bộ ba 30 giây – 60 giây – 8 phút của BNI chuyển thành ba mức nói về lộ trình: một câu cho học viên, một đoạn cho phụ huynh, một buổi cho hội đồng.',
    fails:
      'Hứa nhiều hơn hệ thống làm được. Đây là cách nhanh nhất phá niềm tin, và niềm tin là phễu lọc thứ tư — hỏng nó thì hỏng hết.',
  },
  {
    no: 3,
    bni: 'Đúng quy trình — chuẩn hoá tiếp nhận, chăm sóc, chuyển đổi',
    gita: 'QUY TRÌNH ĐÚNG',
    what:
      'Mười hai bước hành trình, bốn bộ đề định kỳ, kho 1.000 đơn kê. Không coach nào phải tự nghĩ ra quy trình cho ca của mình.',
    fails:
      'Mỗi coach một kiểu. Chất lượng phụ thuộc vào việc học viên gặp ai, và học viện không nhân bản được.',
  },
  {
    no: 4,
    bni: 'WOW trải nghiệm — tạo cảm xúc và niềm tin vượt kỳ vọng',
    gita: 'TRẢI NGHIỆM VƯỢT KỲ VỌNG',
    what:
      'Chuỗi điểm chạm WOW của BNI chuyển thành các mốc kỳ tích: lần đầu nghe ra trọn câu, lần đầu nói 2 phút không sập, lần đầu người lạ hiểu mình.',
    fails:
      'Chỉ đo bằng điểm số. Điểm tăng mà không có khoảnh khắc nào đáng nhớ thì học viên vẫn bỏ, vì không có gì để kể lại.',
  },
  {
    no: 5,
    bni: 'Nhân tầng giới thiệu — từ 1 Ref tạo ra hệ sinh thái',
    gita: 'NHÂN TẦNG HỌC VIÊN',
    what:
      'Bước 10 của hành trình: học viên tạo giá trị, kèm người mới. Một học viên về đích mà không kèm ai là một học viên chưa khép vòng.',
    fails:
      'Coi học viên tốt nghiệp là điểm kết thúc. Học viện khi đó phải tuyển mới liên tục và không bao giờ có ngỗng vàng.',
  },
];
