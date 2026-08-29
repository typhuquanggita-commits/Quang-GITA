/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  RootPrinciple,
  PyramidTier,
  GitaPhase,
  NlpTechnique,
  EnvironmentLayer,
  AdvisorProtocol,
  CycleStep,
} from '../types';

/* ==========================================================================
   HỌC VIỆN ENGWILL — TRIẾT LÝ GỐC RỄ
   ========================================================================== */

export const ACADEMY_CREED = {
  name: 'HỌC VIỆN ENGWILL',
  oneLine: 'Chúng tôi không dạy tiếng Anh. Chúng tôi tạo điều kiện để tiếng Anh tự mọc lên.',
  root:
    'Mọi đứa trẻ trên đời đều thành thạo tiếng mẹ đẻ mà không cần một buổi học ngữ pháp nào. Không có đứa trẻ nào trượt tiếng mẹ đẻ. Điều đó chứng minh: con người không có "năng khiếu ngoại ngữ" — con người có bộ máy tiếp thu ngôn ngữ, và nó chỉ cần đúng ba thứ để chạy: đầu vào hiểu được, nhu cầu diễn đạt có thật, và một môi trường không sợ hãi. Toàn bộ học viện này chỉ làm một việc: tái tạo ba điều kiện đó cho người trưởng thành.',
  whySchoolFails:
    'Trường học truyền thống làm ngược lại cả ba: đầu vào là câu ví dụ rời rạc không ai hiểu để làm gì, nhu cầu diễn đạt là giả (nói để trả bài, không phải để được hiểu), và môi trường thì đầy sợ hãi (sai là bị chê trước lớp). Bảy năm học như vậy không tạo ra người nói tiếng Anh — nó tạo ra người biết luật ngữ pháp và sợ mở miệng.',
  promise:
    'Học viên rời khỏi mỗi buổi với một trải nghiệm "à, mình vừa HIỂU được" hoặc "à, mình vừa NÓI được" — chứ không phải một trang vở đầy công thức.',
  nonNegotiables: [
    'Không có buổi nào mà giáo viên nói nhiều hơn học viên.',
    'Không có bài tập nào mà học viên không biết nó phục vụ điều gì trong đời thật.',
    'Không có lỗi nào bị chê trước tập thể. Lỗi được xử lý như dữ liệu, riêng tư và tôn trọng.',
    'Không có nội dung nào vượt quá vùng hiểu 90–98% của học viên đang ngồi đó.',
    'Không có bài nộp nào không có phản hồi trong 48 giờ.',
  ],
};

export const ROOT_PRINCIPLES: RootPrinciple[] = [
  {
    id: 'rp-1',
    no: 1,
    name: 'NGÔN NGỮ ĐƯỢC HẤP THỤ, KHÔNG ĐƯỢC HỌC THUỘC',
    claim:
      'Năng lực nói trôi chảy đến từ hàng nghìn giờ hiểu thông điệp, không đến từ việc ghi nhớ quy tắc. Quy tắc chỉ giúp bạn kiểm tra lại thứ mình đã cảm thấy đúng.',
    rootQuestion: 'Vì sao trẻ 5 tuổi nói đúng ngữ pháp hơn người lớn học 7 năm?',
    wrongWay: 'Dạy công thức trước, cho ví dụ sau, rồi bắt làm bài tập điền khuyết.',
    rightWay:
      'Cho học viên gặp cấu trúc đó 15 lần trong ngữ cảnh thật, để họ TỰ nhận ra quy luật, rồi mới đặt tên cho nó. Thứ tự này quyết định tất cả.',
    consequence:
      'Học viên dùng đúng cấu trúc theo phản xạ chứ không phải sau khi nhớ lại quy tắc — chênh lệch tốc độ là khoảng 2 giây mỗi câu, và 2 giây đó chính là ranh giới giữa trôi chảy và ấp úng.',
  },
  {
    id: 'rp-2',
    no: 2,
    name: 'HIỂU ĐƯỢC MỚI HẤP THỤ ĐƯỢC',
    claim:
      'Đầu vào không hiểu được là tiếng ồn. Một trăm giờ nghe nội dung quá khó có giá trị bằng không, không phải bằng một phần mười.',
    rootQuestion: 'Nghe tiếng Anh cả ngày mà không hiểu gì thì có tiến bộ không?',
    wrongWay: 'Bật phim Mỹ không phụ đề cho học viên A2 và gọi đó là "tắm ngôn ngữ".',
    rightWay:
      'Mọi tài liệu đều phải nằm trong vùng hiểu 90–98%. Cố vấn có trách nhiệm kiểm tra vùng này cho từng học viên, mỗi tháng một lần, và hạ cấp tài liệu ngay khi thấy học viên phải tra quá 5 từ mỗi trang.',
    consequence:
      'Đây là biến số quan trọng nhất mà học viện kiểm soát được. Chọn sai tài liệu là hỏng toàn bộ công sức phía sau, dù phương pháp có tốt đến đâu.',
  },
  {
    id: 'rp-3',
    no: 3,
    name: 'BỘ LỌC CẢM XÚC CÓ THẬT',
    claim:
      'Lo lắng cao dựng lên một hàng rào chặn ngôn ngữ đi vào, dù học viên vẫn đang ngồi trong lớp và vẫn đang nghe. Người sợ sai học được ít hơn hẳn từ cùng một lượng đầu vào.',
    rootQuestion: 'Vì sao học viên hiểu bài ở nhà nhưng đứng hình khi bị gọi lên bảng?',
    wrongWay: 'Gọi bất ngờ, sửa lỗi giữa câu, so sánh học viên với nhau, xếp hạng công khai.',
    rightWay:
      'Không ai bị gọi bất ngờ. Không ai bị ngắt giữa câu. Lỗi được ghi lại và trả riêng. Buổi học bắt đầu bằng việc mỗi người nói một câu họ chắc chắn nói được — để hệ thần kinh vào trạng thái an toàn trước khi bị đẩy ra vùng khó.',
    consequence:
      'Cùng một giáo trình, cùng một số giờ, lớp có bộ lọc thấp tiến nhanh hơn rõ rệt. Đây là thứ rẻ nhất để cải thiện và bị bỏ qua nhiều nhất.',
  },
  {
    id: 'rp-4',
    no: 4,
    name: 'PHẢI CÓ NHU CẦU DIỄN ĐẠT THẬT',
    claim:
      'Não chỉ dồn nguồn lực cho ngôn ngữ khi việc diễn đạt mang lại kết quả thật. Nói để trả bài không kích hoạt cơ chế đó.',
    rootQuestion: 'Vì sao người sang nước ngoài 6 tháng nói hơn người học 6 năm ở nhà?',
    wrongWay: 'Bài tập "hãy nói về sở thích của bạn" — không ai thật sự muốn biết, kể cả giáo viên.',
    rightWay:
      'Mọi nhiệm vụ đều có người thật ở đầu bên kia và có kết quả thật: thuyết phục nhóm chọn phương án của bạn, giải thích cho bạn học chưa hiểu, viết bài có người ngoài đọc và phản hồi.',
    consequence:
      'Khi có nhu cầu thật, học viên tự đi tìm từ mình thiếu. Đó là lúc việc học chuyển từ bị đẩy sang tự kéo — và tốc độ đổi hoàn toàn.',
  },
  {
    id: 'rp-5',
    no: 5,
    name: 'KHOẢNG HỞ MỚI LÀ NƠI HỌC XẢY RA',
    claim:
      'Học không xảy ra lúc nghe giảng. Nó xảy ra đúng khoảnh khắc học viên muốn nói một điều mà không nói ra được — và nhận ra khoảng hở giữa ý muốn và khả năng.',
    rootQuestion: 'Khoảnh khắc nào trong buổi học tạo ra thay đổi thật?',
    wrongWay: 'Giảng đủ kỹ để học viên không bao giờ phải bí.',
    rightWay:
      'Cố ý đặt học viên vào nhiệm vụ hơi vượt khả năng, để họ CHẠM vào khoảng hở, rồi mới cung cấp đúng thứ họ vừa thiếu. Cung cấp trước khi họ thấy thiếu là lãng phí.',
    consequence:
      'Đây là lý do vai trò giáo viên phải là cố vấn chứ không phải người giảng: người giảng lấp hố trước khi học viên rơi vào, cố vấn để họ chạm đáy rồi đưa tay.',
  },
  {
    id: 'rp-6',
    no: 6,
    name: 'MÔI TRƯỜNG THẮNG Ý CHÍ',
    claim:
      'Không ai duy trì được 1.095 ngày bằng quyết tâm. Người đi hết là người đã thiết kế môi trường khiến việc học xảy ra gần như tự động.',
    rootQuestion: 'Vì sao học viên giỏi nhất lớp vẫn bỏ ở tháng thứ tư?',
    wrongWay: 'Truyền động lực bằng những buổi nói chuyện truyền cảm hứng rồi để học viên tự xoay xở.',
    rightWay:
      'Thiết kế bốn lớp môi trường: vật lý, số, xã hội và thời gian. Học viện chịu trách nhiệm về lớp xã hội và lớp thời gian — hai lớp học viên khó tự dựng nhất.',
    consequence:
      'Tỉ lệ bỏ giữa chừng là chỉ số quan trọng nhất của một học viện, quan trọng hơn cả điểm đầu ra. Học viên bỏ ở tháng thứ tư thì mọi phương pháp hay đều vô nghĩa.',
  },
  {
    id: 'rp-7',
    no: 7,
    name: 'DẠY LẠI LÀ ĐỈNH CỦA THÁP',
    claim:
      'Bạn chỉ thật sự sở hữu thứ bạn dạy được cho người khác. Mọi tầng dưới của tháp học tập chỉ là đường dẫn tới tầng này.',
    rootQuestion: 'Làm sao biết học viên đã thật sự nắm được?',
    wrongWay: 'Cho làm bài kiểm tra trắc nghiệm và chấm điểm.',
    rightWay:
      'Bắt học viên giảng lại cho một người chưa biết gì, trong 90 giây, không dùng thuật ngữ. Chỗ nào ấp úng chính là chỗ chưa nắm — và cả hai bên đều thấy điều đó ngay lập tức.',
    consequence:
      'Mọi cấp độ trong hệ thống đều kết thúc bằng một nhiệm vụ dạy lại. Đây là cơ chế kiểm định trung thực nhất và cũng là thứ tạo ra khoảnh khắc tự hào mạnh nhất cho học viên.',
  },
];

/* ------------------------- THÁP HỌC TẬP 5 TẦNG --------------------------- */

export const PYRAMID: PyramidTier[] = [
  {
    id: 'tier-1',
    no: 1,
    code: 'KHAI NHĨ',
    name: 'MỞ TAI — Tiếp nhận',
    meaning: 'Mở cánh cửa đầu tiên: tai nhận được âm, não nhận được nghĩa.',
    retention: 'Ghi nhớ ~10–20% nếu chỉ dừng ở đây',
    mode: 'Nghe · Đọc · Tiếp nhận đầu vào dễ hiểu',
    color: 'from-rose-500 to-orange-500',
    learnerDoes: [
      'Nghe nội dung ở vùng hiểu 90–98%, mỗi ngày, không gián đoạn',
      'Chép chính tả 45 giây để tìm ra chính xác chỗ nghe hụt',
      'Đọc mở rộng không tra từ điển',
      'Ghi số giờ tích luỹ vào sổ',
    ],
    advisorDoes: [
      'Kiểm tra vùng i+1 của từng học viên mỗi tháng, hạ cấp tài liệu ngay khi cần',
      'Cung cấp đúng nguồn cho đúng người, không phát chung một giáo trình',
      'Theo dõi số giờ tích luỹ như theo dõi mạch bệnh nhân',
    ],
    wowMoment:
      'Buổi thứ ba tuần thứ sáu, học viên nghe lại đúng đoạn audio của tuần đầu và nhận ra mình hiểu gần hết — thứ mà sáu tuần trước là một khối âm thanh không phân biệt được từ nào.',
  },
  {
    id: 'tier-2',
    no: 2,
    code: 'KHAI NHÃN',
    name: 'MỞ MẮT — Nhìn thấy quy luật',
    meaning: 'Từ chỗ nghe được sang chỗ NHÌN RA cấu trúc ẩn bên dưới.',
    retention: 'Ghi nhớ ~30% — nghe kết hợp nhìn và minh hoạ',
    mode: 'Xem demo · Săn cấu trúc · Nhận ra quy luật',
    color: 'from-orange-500 to-amber-500',
    learnerDoes: [
      'Thu thập 15 ví dụ thật của một cấu trúc TRƯỚC khi đọc bất kỳ lời giải thích nào',
      'Tự rút ra quy luật từ 15 ví dụ đó',
      'Xem video quay cận miệng để thấy vị trí lưỡi và môi',
      'Đối chiếu quy luật tự rút với sách ngữ pháp — và chỉ ở bước này mới đọc sách',
    ],
    advisorDoes: [
      'Chọn 15 ví dụ đủ đa dạng để quy luật lộ ra, đủ hẹp để không gây nhiễu',
      'Tuyệt đối không giảng quy luật trước. Chờ học viên tự nói ra.',
      'Khi học viên rút sai quy luật, đưa thêm ví dụ phản chứng thay vì sửa trực tiếp',
    ],
    wowMoment:
      'Học viên tự nói ra một quy luật ngữ pháp mà chưa ai dạy họ, rồi mở sách và thấy đúng y như vậy. Cảm giác "mình tự tìm ra" mạnh hơn mọi bài giảng.',
  },
  {
    id: 'tier-3',
    no: 3,
    code: 'KHAI KHẨU',
    name: 'MỞ MIỆNG — Nói và tranh luận',
    meaning: 'Ngôn ngữ rời khỏi đầu và đi ra ngoài, có người nghe và phản hồi.',
    retention: 'Ghi nhớ ~50% — thảo luận nhóm',
    mode: 'Nói · Thảo luận · Tranh biện',
    color: 'from-amber-500 to-emerald-500',
    learnerDoes: [
      'Nói ít nhất 40% thời lượng của phần mình trong mọi buổi nhóm',
      'Tự nói ba mốc mỗi ngày, có ghi âm mỗi tuần một lần',
      'Tranh biện bốc thăm lập trường — không được chọn phía',
      'Ghi ba cụm hay nhất học được từ bạn học, ngay trong buổi',
    ],
    advisorDoes: [
      'Đo tỉ lệ thời lượng nói. Nếu cố vấn nói nhiều hơn học viên, buổi đó đã hỏng.',
      'Không ngắt giữa câu. Ghi lỗi vào sổ, trả riêng sau buổi.',
      'Tạo bất đồng có kiểm soát để nhu cầu diễn đạt trở nên thật',
    ],
    wowMoment:
      'Lần đầu học viên cãi thắng một cuộc tranh luận bằng tiếng Anh — và nhận ra suốt năm phút vừa rồi họ không hề dịch trong đầu.',
  },
  {
    id: 'tier-4',
    no: 4,
    code: 'KHAI THỦ',
    name: 'MỞ TAY — Làm ra sản phẩm',
    meaning: 'Từ nói được sang tạo ra thứ tồn tại độc lập và có người dùng thật.',
    retention: 'Ghi nhớ ~75% — thực hành bằng việc làm thật',
    mode: 'Viết · Dựng · Trình bày · Tạo tác phẩm',
    color: 'from-emerald-500 to-sky-500',
    learnerDoes: [
      'Viết bài có người thật đọc và phản hồi, không viết cho ngăn kéo',
      'Thuyết trình 10 phút trước người thật, không đọc giấy',
      'Làm một dự án thật bằng tiếng Anh: video, bài blog, hướng dẫn, phỏng vấn',
      'Nhận phản hồi và làm lại bản thứ hai — bản thứ hai mới là nơi học xảy ra',
    ],
    advisorDoes: [
      'Bảo đảm mọi sản phẩm có khán giả thật ở đầu bên kia',
      'Trả phản hồi theo đúng khung 4 phần trong 48 giờ',
      'Yêu cầu bản làm lại. Không có bản hai thì phản hồi vô nghĩa.',
    ],
    wowMoment:
      'Học viên nhận được bình luận từ một người lạ ở nước khác dưới bài viết của mình — và hiểu rằng tiếng Anh của họ vừa chạm tới một người thật.',
  },
  {
    id: 'tier-5',
    no: 5,
    code: 'KHAI ĐẠO',
    name: 'MỞ ĐƯỜNG — Dạy lại người khác',
    meaning: 'Đỉnh tháp. Bạn chỉ sở hữu thứ bạn dạy được cho người chưa biết.',
    retention: 'Ghi nhớ ~90% — dạy lại và ứng dụng ngay',
    mode: 'Giảng lại · Kèm cặp · Dẫn nhóm · Truyền lửa',
    color: 'from-sky-500 to-violet-500',
    learnerDoes: [
      'Giảng một khái niệm trong 90 giây cho người chưa biết gì, không dùng thuật ngữ',
      'Kèm một học viên tầng dưới trong ít nhất một chu kỳ',
      'Dẫn buổi Club và điều phối tranh luận',
      'Viết lại bài học của mình thành hướng dẫn cho người đi sau',
    ],
    advisorDoes: [
      'Chuyển giao dần quyền dẫn buổi cho học viên tầng 5',
      'Cố vấn cho người cố vấn — họp riêng mỗi tháng với nhóm dẫn dắt',
      'Ghi nhận công khai: người dạy lại là người có công với cộng đồng',
    ],
    wowMoment:
      'Học viên nhận ra người mình đang kèm chính là hình ảnh của mình mười hai tháng trước — và lần đầu tiên thấy rõ mình đã đi xa đến đâu.',
  },
];

/* --------------------------- MÔ THỨC GITA -------------------------------- */

export const GITA_MODEL = {
  name: 'MÔ THỨC HUẤN LUYỆN GITA',
  note:
    'Đây là bản dựng theo nghĩa cố vấn dẫn đường — bốn pha của một chu trình huấn luyện. Nếu học viện đã có mô thức GITA riêng, thay nội dung trong data/academy.ts (hằng GITA_PHASES) là toàn bộ hệ thống cập nhật theo, không phải sửa chỗ nào khác.',
  core:
    'Cố vấn không đi trước để kéo, cũng không đi sau để đẩy. Cố vấn đi bên cạnh, nhìn thấy khúc quanh trước học viên một nhịp, và đặt đúng câu hỏi vào đúng lúc.',
  rhythm: 'Mỗi cấp độ chạy trọn một vòng G → I → T → A. Hai mươi lăm cấp độ là hai mươi lăm vòng.',
};

export const GITA_PHASES: GitaPhase[] = [
  {
    letter: 'G',
    code: 'GIEO',
    name: 'GIEO — Gieo niềm tin và bối cảnh',
    intent:
      'Trước khi dạy bất cứ điều gì, phải cài lại niềm tin. Học viên tin mình không có năng khiếu thì mọi kỹ thuật đều trượt.',
    advisorStance:
      'Người khơi. Không thuyết phục bằng lý lẽ — dẫn học viên tới một bằng chứng tự thân khiến niềm tin cũ tự sụp.',
    moves: [
      'Hỏi về niềm tin hiện tại: "Điều gì khiến bạn nghĩ mình không học được?"',
      'Tìm phản chứng trong chính đời họ: một việc khó họ đã từng làm được.',
      'Cho một chiến thắng nhỏ trong 10 phút đầu — bằng chứng thắng lý lẽ.',
      'Chốt bối cảnh: vì sao học điều này, dùng ở đâu trong đời họ.',
    ],
    nlpTools: ['reframing', 'wellformed', 'anchoring'],
    failureMode:
      'Bỏ qua pha này vì "mất thời gian, vào bài luôn cho kịp". Đó là lý do lớp đông người mà chỉ vài người tiến bộ.',
  },
  {
    letter: 'I',
    code: 'IMMERSE',
    name: 'ĐẮM — Đắm mình trong đầu vào và cảm xúc tích cực',
    intent:
      'Tạo dòng chảy đầu vào dễ hiểu trong trạng thái cảm xúc an toàn. Đây là pha dài nhất và ít can thiệp nhất.',
    advisorStance:
      'Người giữ cửa. Việc chính là canh đúng vùng i+1 và giữ bộ lọc cảm xúc thấp, không phải giảng.',
    moves: [
      'Khởi động bằng một câu ai cũng nói được — đưa hệ thần kinh vào trạng thái an toàn.',
      'Cấp đúng tài liệu cho đúng người, hiểu 90–98%.',
      'Không sửa lỗi trong pha này. Ghi lại, để dành cho pha T.',
      'Neo trạng thái: gắn cảm giác "hiểu được" với một tín hiệu lặp lại.',
    ],
    nlpTools: ['anchoring', 'state', 'pacing'],
    failureMode:
      'Sửa lỗi giữa pha đắm mình. Một lần ngắt lời làm bộ lọc cảm xúc dựng lên và phá hỏng cả buổi.',
  },
  {
    letter: 'T',
    code: 'THỬ THÁCH',
    name: 'THỬ — Đẩy ra khoảng hở và trao phản hồi',
    intent:
      'Đặt học viên vào nhiệm vụ hơi vượt khả năng để họ chạm vào khoảng hở, rồi trao đúng thứ họ vừa phát hiện mình thiếu.',
    advisorStance:
      'Người đặt bài. Chịu được sự khó chịu của học viên khi họ bí — vì chính chỗ bí đó là nơi học xảy ra.',
    moves: [
      'Giao nhiệm vụ thật, có người thật ở đầu bên kia.',
      'Để học viên bí. Không lấp hố trước khi họ rơi vào.',
      'Trả phản hồi theo khung 4 phần trong 48 giờ.',
      'Chốt đúng MỘT lỗi mục tiêu cho chu kỳ tới, không chốt năm lỗi.',
    ],
    nlpTools: ['metamodel', 'modeling', 'chunking'],
    failureMode:
      'Giảng quá kỹ để học viên không phải bí. Buổi học dễ chịu, và không ai học được gì.',
  },
  {
    letter: 'A',
    code: 'ASCEND',
    name: 'THĂNG — Về đích, ghi nhận và mở đường tiếp',
    intent:
      'Đóng vòng bằng một chiến thắng có thể nhìn thấy, gắn nó vào bản sắc, rồi mở cánh cửa cấp độ kế tiếp khi động lực đang ở đỉnh.',
    advisorStance:
      'Người xác nhận. Nói ra thành tựu bằng ngôn ngữ bản sắc, không bằng ngôn ngữ điểm số.',
    moves: [
      'Đối chiếu bằng chứng: bản ghi âm hôm nay so với bản của chu kỳ trước.',
      'Trao huy hiệu cấp độ và ghi nhận công khai trong cộng đồng.',
      'Chuyển từ "bạn làm tốt" sang "bạn đang trở thành người…" — khen bản sắc, không khen kết quả.',
      'Mở cấp độ kế tiếp ngay trong buổi, khi cảm xúc còn cao.',
    ],
    nlpTools: ['anchoring', 'future', 'identity'],
    failureMode:
      'Chấm điểm rồi chuyển bài luôn. Bỏ pha ghi nhận là cắt mất vòng lặp thói quen ở đúng khâu phần thưởng.',
  },
];

/* ------------------------------- NLP ------------------------------------- */

export const NLP_TECHNIQUES: NlpTechnique[] = [
  {
    id: 'reframing',
    name: 'Reframing',
    vnName: 'Dựng lại khung',
    origin: 'Bandler & Grinder',
    useWhen: 'Học viên nói câu tự phán xét: "Em dốt", "Em không có năng khiếu", "Em học mãi không vào".',
    script: [
      'Không phản bác. Thừa nhận trải nghiệm trước: "Anh hiểu, bảy năm mà vẫn không nói được thì bực thật."',
      'Đổi khung từ NĂNG LỰC sang PHƯƠNG PHÁP: "Em không nói được vì bảy năm đó em học ngữ pháp để thi, chưa từng nghe đủ 200 giờ. Đó là vấn đề đầu vào, không phải vấn đề đầu óc."',
      'Đưa bằng chứng phản chứng ngay: cho nghe một đoạn A1 mà họ hiểu được.',
      'Chốt bằng chữ CHƯA: "Em CHƯA nói được. Đó là mốc thời gian, không phải bản án."',
    ],
    appliedTo: 'Pha GIEO của mọi cấp độ, và bất cứ lúc nào nghe thấy câu tự phán xét.',
    caution:
      'Đổi khung khi học viên chưa cảm thấy được thấu hiểu sẽ bị coi là an ủi rẻ tiền. Luôn thừa nhận trước, đổi khung sau.',
  },
  {
    id: 'anchoring',
    name: 'Anchoring',
    vnName: 'Neo trạng thái',
    origin: 'NLP cổ điển, dựa trên phản xạ có điều kiện',
    useWhen: 'Cần gọi lại trạng thái tự tin đúng lúc học viên sắp nói trước đám đông hoặc bước vào phòng thi.',
    script: [
      'Đưa học viên về một ký ức họ đã từng làm rất tốt việc gì đó — bất kỳ lĩnh vực nào.',
      'Khuếch đại: hỏi chi tiết hình ảnh, âm thanh, cảm giác trong cơ thể lúc đó.',
      'Đúng đỉnh trạng thái, tạo neo vật lý nhất quán: bấm ngón cái và ngón giữa, hoặc một câu nói ngắn.',
      'Lặp lại 5–7 lần trong các buổi khác nhau để neo đủ chắc.',
      'Kích hoạt neo ngay trước khi học viên bắt đầu nói.',
    ],
    appliedTo: 'Trước mọi bài thuyết trình, buổi tranh biện, và buổi thi thử Speaking.',
    caution:
      'Neo đặt lúc trạng thái yếu sẽ neo luôn cả sự lo lắng. Chỉ neo đúng đỉnh, và kiểm tra lại neo trước khi dùng thật.',
  },
  {
    id: 'wellformed',
    name: 'Well-Formed Outcome',
    vnName: 'Mục tiêu đúng dạng',
    origin: 'NLP — bộ điều kiện cho một mục tiêu khả thi',
    useWhen: 'Buổi định hướng đầu tiên, và mỗi lần bắt đầu một cấp độ mới.',
    script: [
      'Phát biểu dương tính: mô tả điều MUỐN CÓ, không mô tả điều muốn tránh.',
      'Do mình khởi xướng: nằm trong tầm kiểm soát của học viên, không phụ thuộc người khác.',
      'Cụ thể theo giác quan: "Tôi sẽ nghe thấy gì, nhìn thấy gì, cảm thấy gì khi đạt được?"',
      'Có bằng chứng đo được: con số hoặc hành vi quan sát được.',
      'Kiểm tra hệ quả sinh thái: "Đạt được điều này thì tôi mất gì? Gia đình và công việc bị ảnh hưởng thế nào?"',
    ],
    appliedTo: 'Pha GIEO, buổi mở cấp độ, và mục 01 của La Bàn cá nhân.',
    caution:
      'Bước kiểm tra hệ quả hay bị bỏ. Đó lại là bước phát hiện ra mâu thuẫn ngầm khiến học viên tự phá kế hoạch của chính mình.',
  },
  {
    id: 'metamodel',
    name: 'Meta Model',
    vnName: 'Bộ câu hỏi truy nguyên',
    origin: 'Bandler & Grinder — bộ câu hỏi phá vỡ khái quát hoá mơ hồ',
    useWhen: 'Học viên nói câu chung chung, khái quát, hoặc lược bỏ thông tin quan trọng.',
    script: [
      'Gặp lượng từ tuyệt đối ("luôn luôn", "không bao giờ"): hỏi "Có lần nào không như vậy không?"',
      'Gặp danh hoá mơ hồ ("em thiếu động lực"): biến lại thành động từ — "Cụ thể em đang không làm việc gì?"',
      'Gặp so sánh treo ("em kém hơn"): hỏi "Kém hơn ai? Ở việc cụ thể nào?"',
      'Gặp đọc suy nghĩ ("mọi người sẽ cười em"): hỏi "Làm sao em biết điều đó?"',
      'Gặp nguyên nhân giả ("vì em bận nên em không học được"): hỏi "Có ai bận hơn em mà vẫn học được không? Họ làm khác gì?"',
    ],
    appliedTo: 'Pha THỬ, và mọi buổi cố vấn 1-1 khi học viên đang mắc kẹt.',
    caution:
      'Dùng liên tiếp nhiều câu sẽ giống thẩm vấn. Tối đa hai câu mỗi lượt, xen giữa là sự công nhận.',
  },
  {
    id: 'modeling',
    name: 'Modeling',
    vnName: 'Mô phỏng người giỏi',
    origin: 'Nguyên lý gốc của NLP — sao chép cấu trúc thành công',
    useWhen: 'Học viên đã đủ nền nhưng chưa biết cách làm cho hay.',
    script: [
      'Chọn một hình mẫu cụ thể và một mẫu sản phẩm cụ thể của họ.',
      'Bóc tách cấu trúc: họ mở đầu thế nào, chuyển ý ra sao, dùng bằng chứng gì.',
      'Học viên tái tạo lại theo cấu trúc đó bằng nội dung của riêng mình.',
      'So sánh câu-với-câu để đo khoảng cách, rồi rút một bài học duy nhất.',
    ],
    appliedTo: 'Tầng 4 và 5 — mổ xẻ bài mẫu, học shadowing theo một giọng cố định.',
    caution:
      'Sao chép nội dung thay vì sao chép cấu trúc sẽ ra bài học thuộc lòng, và người chấm nhận ra ngay.',
  },
  {
    id: 'state',
    name: 'State Management',
    vnName: 'Quản trị trạng thái',
    origin: 'NLP — sinh lý học điều khiển tâm lý',
    useWhen: 'Đầu buổi học, và bất cứ lúc nào năng lượng nhóm tụt.',
    script: [
      'Đổi sinh lý trước, đổi cảm xúc sau: đứng dậy, đổi chỗ ngồi, thở sâu bốn nhịp.',
      'Ba mươi giây vận động trước khi vào phần khó.',
      'Đổi tông giọng và nhịp nói của cố vấn — nhóm sẽ tự đồng bộ theo.',
      'Bắt đầu bằng một câu ai cũng nói được, để cả nhóm có một chiến thắng chung.',
    ],
    appliedTo: 'Mở đầu mọi buổi, và giữa buổi khi thấy nhóm chùng xuống.',
    caution:
      'Không dùng để che đi việc tài liệu quá khó. Nếu nhóm tụt năng lượng liên tục, vấn đề là vùng i+1 chứ không phải trạng thái.',
  },
  {
    id: 'pacing',
    name: 'Pacing & Leading',
    vnName: 'Bắt nhịp rồi dẫn dắt',
    origin: 'NLP — tạo đồng điệu trước khi tạo thay đổi',
    useWhen: 'Học viên đang kháng cự, chán nản, hoặc muốn bỏ.',
    script: [
      'Bắt nhịp: nói lại đúng trải nghiệm của họ bằng lời của họ, không thêm bớt.',
      'Bắt nhịp lần hai: thừa nhận cảm xúc là hợp lý trong hoàn cảnh đó.',
      'Chỉ khi thấy họ gật đầu và giãn vai mới bắt đầu dẫn.',
      'Dẫn bằng một bước nhỏ nhất có thể, không bằng một bài diễn thuyết.',
    ],
    appliedTo: 'Buổi cứu học viên có nguy cơ bỏ — thường rơi vào tháng 4, 14 và 20.',
    caution:
      'Dẫn quá sớm khi chưa bắt nhịp đủ sẽ làm học viên thấy không được lắng nghe và kháng cự mạnh hơn.',
  },
  {
    id: 'chunking',
    name: 'Chunking Down',
    vnName: 'Bẻ nhỏ',
    origin: 'NLP — điều chỉnh kích cỡ khối thông tin',
    useWhen: 'Học viên tê liệt trước một nhiệm vụ quá lớn.',
    script: [
      'Hỏi "Phần nhỏ nhất của việc này mà em làm được ngay bây giờ là gì?"',
      'Bẻ tiếp cho tới khi ra một hành động dưới hai phút.',
      'Cho làm ngay phần đó trong buổi, không để về nhà.',
      'Sau khi làm xong, hỏi "Bước tiếp theo nhỏ nhất là gì?"',
    ],
    appliedTo: 'Mọi lúc học viên nói "em không biết bắt đầu từ đâu".',
    caution: 'Bẻ nhỏ mãi mà không bao giờ ghép lại sẽ khiến học viên mất cảm giác về bức tranh lớn.',
  },
  {
    id: 'future',
    name: 'Future Pacing',
    vnName: 'Diễn tập tương lai',
    origin: 'NLP — chạy thử hành vi mới trong tưởng tượng trước khi gặp thật',
    useWhen: 'Cuối mỗi cấp độ, và trước ngày thi hoặc buổi thuyết trình quan trọng.',
    script: [
      'Cho học viên nhắm mắt và chạy qua toàn bộ tình huống sắp tới, theo trình tự.',
      'Đưa vào cả tình huống xấu: "Nếu em bí giữa chừng thì em sẽ làm gì?"',
      'Diễn tập luôn phương án xử lý tình huống xấu đó.',
      'Kích hoạt neo tự tin ở cuối lần diễn tập.',
    ],
    appliedTo: 'Pha THĂNG, và tuần cuối trước kỳ thi.',
    caution:
      'Chỉ tưởng tượng thành công mà bỏ tình huống xấu thì làm giảm nỗ lực. Bắt buộc phải có nhánh xử lý sự cố.',
  },
  {
    id: 'identity',
    name: 'Logical Levels',
    vnName: 'Các tầng bản sắc',
    origin: 'Robert Dilts',
    useWhen: 'Khi ghi nhận thành tựu, và khi học viên mắc kẹt lâu ngày.',
    script: [
      'Thay đổi ở tầng cao hơn kéo theo tầng thấp hơn: Bản sắc → Giá trị → Năng lực → Hành vi → Môi trường.',
      'Khen ở tầng bản sắc: "Em đang trở thành người giữ lời hứa với chính mình", không khen "Em làm bài tốt".',
      'Khi học viên kẹt ở hành vi, kiểm tra xem tầng niềm tin có đang mâu thuẫn không.',
      'Câu hỏi chẩn đoán: "Em nghĩ người như em thì có làm được việc này không?"',
    ],
    appliedTo: 'Pha THĂNG của mọi cấp độ, và buổi cố vấn khi học viên chững lâu.',
    caution:
      'Khen bản sắc khi chưa có bằng chứng hành vi sẽ thành sáo rỗng. Phải chỉ ra bằng chứng trước, gắn bản sắc sau.',
  },
];

/* -------------------------- MÔI TRƯỜNG TỐI ƯU ---------------------------- */

export const ENVIRONMENT_LAYERS: EnvironmentLayer[] = [
  {
    id: 'env-physical',
    layer: 'LỚP VẬT LÝ — không gian học',
    goal: 'Giảm ma sát khởi động xuống gần bằng không, và cắt mọi đường dẫn tới xao nhãng.',
    setup: [
      'Một chỗ ngồi cố định chỉ dùng để học — não gắn địa điểm với hành vi.',
      'Tai nghe, sách và sổ bày sẵn từ tối hôm trước, mở ra là bắt đầu được ngay.',
      'Điện thoại ở phòng khác trong khối sâu. Không phải úp xuống bàn — ở phòng khác.',
      'Lịch 90 ngày treo ở nơi nhìn thấy hằng ngày, có bút tô sẵn bên cạnh.',
      'Một tấm bảng nhỏ ghi câu bản sắc, dán ngang tầm mắt.',
    ],
    antiPattern: 'Học trên giường, học ở nơi cũng dùng để giải trí, và để điện thoại trong tầm với.',
    check: 'Từ lúc muốn học tới lúc bắt đầu học mất bao nhiêu giây? Trên 30 giây là môi trường chưa đạt.',
  },
  {
    id: 'env-digital',
    layer: 'LỚP SỐ — thiết bị và nội dung',
    goal: 'Biến thiết bị từ nguồn xao nhãng thành nguồn đầu vào.',
    setup: [
      'Chuyển toàn bộ giao diện điện thoại và máy tính sang tiếng Anh từ tháng thứ mười.',
      'Bỏ theo dõi mọi tài khoản khoe điểm số; theo dõi các kênh tiếng Anh đúng vùng i+1.',
      'Tải sẵn nội dung nghe từ tối hôm trước — không để phải chọn lúc lên đường.',
      'Một thư mục duy nhất chứa tài liệu đang dùng. Tài liệu chưa tới lượt thì cất đi.',
      'Cài chế độ chặn web trong khối sâu, đặt lịch tự động chứ không bật thủ công.',
    ],
    antiPattern: 'Tải về ba trăm tài liệu rồi tê liệt không biết bắt đầu từ đâu.',
    check: 'Mở máy lên, sau 10 giây thứ đầu tiên đập vào mắt là gì? Nếu không phải nội dung tiếng Anh thì chưa đạt.',
  },
  {
    id: 'env-social',
    layer: 'LỚP XÃ HỘI — người xung quanh',
    goal: 'Thay ý chí bằng trách nhiệm với người khác. Đây là lớp học viện phải dựng hộ học viên.',
    setup: [
      'Mỗi học viên thuộc đúng một nhóm bốn đến sáu người, có tên nhóm và có người dẫn.',
      'Điểm danh mỗi sáng bằng một dòng tin nhắn. Ai đứt hai ngày thì có người gọi điện.',
      'Mỗi học viên có một người kèm ở tầng trên và một người mình kèm ở tầng dưới.',
      'Gia đình được thông báo về cam kết và khung giờ học, để không bị cắt ngang.',
      'Bảng vinh danh chuỗi ngày, không phải bảng xếp hạng điểm số.',
    ],
    antiPattern:
      'Để học viên tự học một mình và động viên bằng những bài đăng truyền cảm hứng. Đây là lý do số một khiến họ bỏ ở tháng thứ tư.',
    check: 'Nếu học viên vắng ba ngày, có ai nhận ra không? Không có ai thì lớp xã hội đang trống.',
  },
  {
    id: 'env-time',
    layer: 'LỚP THỜI GIAN — nhịp và khung giờ',
    goal: 'Đưa việc học vào chỗ nó không phải cạnh tranh với thứ gì khác.',
    setup: [
      'Khối khó nhất đặt vào đúng khung giờ đỉnh sinh học của từng người.',
      'Ba khung giờ mỗi tuần được chốt cứng, ghi vào lịch như một cuộc hẹn với bác sĩ.',
      'Định nghĩa sẵn ba phiên bản ngày: Đủ, Bận, Tệ — viết ra trước khi cần đến.',
      'Buổi học nhóm cố định thứ và giờ, không đổi theo tuần.',
      'Chuông tắt màn hình cố định mỗi tối, bảo vệ bảy giờ ngủ.',
    ],
    antiPattern: 'Học "khi nào rảnh". Không bao giờ rảnh, và đó là toàn bộ vấn đề.',
    check: 'Mở lịch tuần tới ra: có ba ô đã ghi sẵn giờ học không? Không có thì tuần đó sẽ trôi.',
  },
];

/* ----------------------- VAI TRÒ CỐ VẤN ---------------------------------- */

export const ADVISOR_CREED = {
  title: 'GIÁO VIÊN LÀ CỐ VẤN, KHÔNG PHẢI NGƯỜI GIẢNG',
  core:
    'Người giảng đứng trước lớp và truyền kiến thức. Cố vấn đi bên cạnh một con người và giúp họ tự đi hết hành trình của chính mình. Hai vai trò này đòi hỏi hai bộ kỹ năng gần như trái ngược.',
  ratio: 'Trong mọi buổi học, học viên phải nói nhiều hơn cố vấn. Không có ngoại lệ.',
  shifts: [
    {from: 'Truyền đạt kiến thức', to: 'Đặt câu hỏi để học viên tự tìm ra'},
    {from: 'Sửa lỗi ngay khi nghe thấy', to: 'Ghi lại, trả riêng, chốt một lỗi mục tiêu'},
    {from: 'Giảng cho hết giáo án', to: 'Điều chỉnh theo vùng i+1 của người đang ngồi đó'},
    {from: 'Đánh giá bằng điểm số', to: 'Đối chiếu bằng chứng với chính học viên ba tháng trước'},
    {from: 'Chịu trách nhiệm về kết quả', to: 'Chịu trách nhiệm về môi trường và phản hồi'},
    {from: 'Là nguồn kiến thức duy nhất', to: 'Là người chỉ đường tới nguồn phù hợp'},
  ],
};

export const ADVISOR_PROTOCOLS: AdvisorProtocol[] = [
  {
    id: 'ap-stuck',
    situation: 'Học viên bí giữa chừng khi đang nói',
    doNot: 'Nhắc từ, nói hộ, hoặc dịch sang tiếng Việt để cứu.',
    instead:
      'Đợi bảy giây trong im lặng. Bảy giây dài hơn bạn tưởng nhưng đó là khoảng thời gian não đang tìm. Nếu vẫn bí, gợi ý cách nói vòng chứ không cấp từ.',
    questions: [
      'Em thử diễn đạt ý đó bằng cách khác xem?',
      'Nếu không có từ đó thì em nói thế nào cho người ta hiểu?',
      'Từ đó giống cái gì? Dùng để làm gì?',
    ],
  },
  {
    id: 'ap-error',
    situation: 'Học viên vừa nói một câu sai ngữ pháp rõ ràng',
    doNot: 'Ngắt lời để sửa. Một lần ngắt làm bộ lọc cảm xúc dựng lên cả buổi.',
    instead:
      'Ghi vào sổ, để họ nói hết. Cuối buổi trả riêng ba lỗi lớn nhất. Trong buổi, nếu muốn can thiệp thì nhắc lại câu đúng một cách tự nhiên như đang xác nhận ý họ.',
    questions: [
      'Ý em là… đúng không? (nhắc lại bằng câu đúng, không nhấn mạnh việc sửa)',
      'Trong ba lỗi này, em thấy lỗi nào hay lặp lại nhất?',
      'Em muốn tuần này tấn công lỗi nào?',
    ],
  },
  {
    id: 'ap-quit',
    situation: 'Học viên nhắn tin muốn nghỉ hoặc đã vắng nhiều buổi',
    doNot: 'Thuyết phục bằng lý lẽ, nhắc học phí, hoặc gửi bài truyền cảm hứng.',
    instead:
      'Gọi điện, không nhắn tin. Bắt nhịp trước: nói lại đúng trải nghiệm của họ bằng lời của họ. Chỉ khi họ thấy được lắng nghe mới bắt đầu dẫn, và dẫn bằng bước nhỏ nhất có thể.',
    questions: [
      'Điều gì khiến em thấy nặng nhất lúc này?',
      'Nếu tuần này chỉ làm được một việc nhỏ nhất thôi thì việc đó là gì?',
      'Em có muốn tạm hạ xuống phiên bản hai phút một thời gian không? Giữ chuỗi quan trọng hơn giữ khối lượng.',
    ],
  },
  {
    id: 'ap-plateau',
    situation: 'Học viên nói "học mãi không tiến bộ"',
    doNot: 'Trấn an bằng "em đang tiến bộ đấy" mà không có bằng chứng.',
    instead:
      'Mở dữ liệu ra: bản ghi âm sáu tháng trước, bảng năm con số, số lỗi đã đóng. Cho họ tự nghe, tự thấy. Bằng chứng thắng lời trấn an.',
    questions: [
      'Em nghe lại bản này của em sáu tháng trước xem, em thấy khác gì không?',
      'Ba tháng trước em chưa làm được việc gì mà giờ làm được?',
      'Cao nguyên luôn đến ở tháng mười bốn. Em có muốn đổi cách luyện thay vì đổi mục tiêu không?',
    ],
  },
  {
    id: 'ap-fast',
    situation: 'Học viên đòi đốt cháy giai đoạn, muốn luyện đề sớm',
    doNot: 'Chiều theo để giữ chân học viên.',
    instead:
      'Cho một bằng chứng tự thân: đưa một đề thật đúng trình độ đích, để họ tự trải nghiệm khoảng cách. Rồi giải thích ràng buộc giờ tiếp xúc bằng số liệu, không bằng lời khuyên.',
    questions: [
      'Em thử làm đề này trong đúng điều kiện thi xem cảm giác thế nào?',
      'Theo em, thiếu ở đây là thiếu chiến thuật làm bài hay thiếu vốn ngôn ngữ?',
      'Em muốn đạt điểm thật hay đạt điểm một lần rồi mất luôn khả năng dùng?',
    ],
  },
  {
    id: 'ap-silent',
    situation: 'Học viên im lặng suốt buổi nhóm',
    doNot: 'Gọi bất ngờ trước tập thể. Đây là cách nhanh nhất đẩy bộ lọc cảm xúc lên trần.',
    instead:
      'Báo trước riêng: "Buổi sau anh sẽ mời em nói phần này, em chuẩn bị trước nhé." Cho họ quyền chuẩn bị. Bắt đầu bằng câu ngắn ai cũng nói được, rồi mở rộng dần qua các buổi.',
    questions: [
      'Em thấy thoải mái hơn khi nói theo cặp hay nói trước cả nhóm?',
      'Buổi sau em muốn nói về chủ đề nào?',
      'Có điều gì khiến em ngại nói không? Nói riêng với anh cũng được.',
    ],
  },
];

/* --------------------- VÒNG 11 BƯỚC CHUẨN -------------------------------- */

export const CYCLE_STEPS: CycleStep[] = [
  {
    no: 1,
    phase: 'GIEO',
    name: 'NIỀM TIN',
    purpose:
      'Gỡ niềm tin cũ đang chặn đường và cài niềm tin mới có bằng chứng. Bỏ bước này thì mọi bước sau đều trượt.',
    advisorScript:
      '"Trước khi vào bài, anh hỏi thật: điều gì khiến em nghĩ mình khó làm được việc này?" — nghe hết, thừa nhận, rồi đổi khung từ năng lực sang phương pháp, và cho một chiến thắng nhỏ ngay trong mười phút.',
    learnerAction: 'Viết ra niềm tin cũ và niềm tin mới thay thế, bằng chữ của chính mình.',
    artifact: 'Thẻ Niềm Tin của cấp độ — dán vào sổ học',
    minutes: 15,
  },
  {
    no: 2,
    phase: 'GIEO',
    name: 'TƯ DUY TÍCH CỰC',
    purpose:
      'Cài các nước đi tư duy sẽ được dùng trong suốt cấp độ này, kèm tình huống kích hoạt cụ thể.',
    advisorScript:
      '"Trong ba mươi ngày tới em sẽ gặp đúng ba tình huống làm em muốn bỏ. Mình chuẩn bị sẵn câu trả lời cho từng tình huống ngay bây giờ."',
    learnerAction: 'Chọn hai nước đi tư duy trong bộ 20/80, viết ra tình huống kích hoạt và câu tự nhủ.',
    artifact: 'Thẻ Tư Duy — hai nước đi có tình huống kích hoạt',
    minutes: 10,
  },
  {
    no: 3,
    phase: 'GIEO',
    name: 'CẢM XÚC TÍCH CỰC',
    purpose:
      'Đưa hệ thần kinh vào trạng thái an toàn và hứng khởi, rồi neo trạng thái đó lại để gọi về sau.',
    advisorScript:
      'Dẫn về một ký ức thành công bất kỳ, khuếch đại chi tiết giác quan, và đặt neo vật lý đúng đỉnh trạng thái. Lặp lại năm đến bảy lần qua các buổi.',
    learnerAction: 'Dựng neo cá nhân và tập kích hoạt trước mỗi buổi học.',
    artifact: 'Neo trạng thái đã kiểm chứng',
    minutes: 10,
  },
  {
    no: 4,
    phase: 'ĐẮM',
    name: 'HÀNH VI TÍCH CỰC',
    purpose: 'Chuyển từ ý định sang hành động cụ thể, có khung giờ và địa điểm rõ ràng.',
    advisorScript:
      '"Viết chính xác: khi nào, ở đâu, làm gì, trong bao lâu. Và nếu hôm đó hỏng thì phương án dự phòng là gì."',
    learnerAction: 'Viết ba câu ý định thực thi kèm ba phương án dự phòng.',
    artifact: 'Bản cam kết hành vi có phương án B',
    minutes: 10,
  },
  {
    no: 5,
    phase: 'ĐẮM',
    name: 'THÓI QUEN TÍCH CỰC',
    purpose: 'Biến hành vi thành tự động bằng tín hiệu, phần thưởng và phiên bản hai phút.',
    advisorScript:
      '"Cấp độ này mình chỉ cài đúng một thói quen mới. Tham hơn là hỏng cả. Em chọn thói quen nào?"',
    learnerAction: 'Chọn một thói quen, xác định tín hiệu neo vào việc đã có sẵn, và viết phiên bản hai phút.',
    artifact: 'Thẻ Thói Quen + lịch tô đen',
    minutes: 10,
  },
  {
    no: 6,
    phase: 'THỬ',
    name: 'CHUỖI THỬ THÁCH CẢI THIỆN',
    purpose:
      'Phần thân của cấp độ. Chuỗi nhiệm vụ tăng dần độ khó, mỗi nhiệm vụ đẩy học viên chạm vào khoảng hở.',
    advisorScript:
      'Giao nhiệm vụ thật có người thật ở đầu bên kia. Để học viên bí. Không lấp hố trước khi họ rơi vào.',
    learnerAction: 'Hoàn thành bảy thử thách của cấp độ, nộp bài sau mỗi thử thách.',
    artifact: 'Bảy bài nộp có dấu thời gian',
    minutes: 420,
  },
  {
    no: 7,
    phase: 'THỬ',
    name: 'BÀI HỌC QUÝ',
    purpose:
      'Rút ra bài học từ chính lỗi của mình. Đây là bước biến trải nghiệm thành hiểu biết.',
    advisorScript:
      '"Trong bảy bài vừa rồi, lỗi nào lặp lại nhiều nhất? Em nghĩ gốc rễ của nó nằm ở đâu?"',
    learnerAction: 'Viết ba bài học quý vào Sổ Lỗi, mỗi bài học kèm bằng chứng từ bài nộp.',
    artifact: 'Ba mục Bài Học Quý trong Sổ Lỗi',
    minutes: 20,
  },
  {
    no: 8,
    phase: 'THỬ',
    name: 'GIẢI PHÁP THÁO GỠ',
    purpose:
      'Với mỗi lỗi lặp lại, có một phác đồ khắc phục cụ thể lấy từ Thư viện Lỗi của học viện.',
    advisorScript:
      '"Anh gửi em phác đồ cho đúng lỗi này: nguyên nhân gốc, ba bước sửa, và hai bài luyện. Tuần này em chỉ tấn công đúng lỗi này thôi."',
    learnerAction: 'Nhận phác đồ, chạy các bước sửa, đánh dấu tiến độ đóng lỗi.',
    artifact: 'Phác đồ khắc phục đã cá nhân hoá',
    minutes: 15,
  },
  {
    no: 9,
    phase: 'THỬ',
    name: 'CÁC BƯỚC RÈN LUYỆN',
    purpose:
      'Luyện tới nhuần nhuyễn. Biết cách sửa không bằng đã sửa được thành phản xạ.',
    advisorScript:
      '"Mỗi ngày mười lăm phút cho đúng bài luyện này, trong mười bốn ngày. Ba bài liên tiếp không tái phạm thì lỗi được đánh dấu ĐÓNG."',
    learnerAction: 'Chạy bộ bài luyện mỗi ngày, ghi lại tiến độ.',
    artifact: 'Bảng theo dõi mười bốn ngày',
    minutes: 210,
  },
  {
    no: 10,
    phase: 'THĂNG',
    name: 'VỀ ĐÍCH',
    purpose:
      'Bài kiểm định cuối cấp độ, làm trong điều kiện thật. Đạt thì lên cấp, chưa đạt thì lặp lại bốn tuần.',
    advisorScript:
      '"Đây là bài về đích. Không có bài mẫu, không chuẩn bị trước. Em làm đúng như ngoài đời thật."',
    learnerAction: 'Hoàn thành bài về đích và tự chấm theo tiêu chí trước khi nộp.',
    artifact: 'Bài về đích + bản tự chấm',
    minutes: 60,
  },
  {
    no: 11,
    phase: 'THĂNG',
    name: 'CHÚC MỪNG · NHẬN THƯỞNG · MỞ ĐƯỜNG',
    purpose:
      'Đóng vòng lặp thói quen ở khâu phần thưởng, gắn thành tựu vào bản sắc, và mở cấp độ kế tiếp khi cảm xúc còn cao.',
    advisorScript:
      'Đối chiếu bằng chứng đầu và cuối cấp độ cho học viên tự nghe. Trao huy hiệu, ghi nhận công khai. Nói bằng ngôn ngữ bản sắc: "Em đang trở thành người…". Rồi mở cấp độ kế tiếp ngay trong buổi.',
    learnerAction: 'Nhận huy hiệu, viết một dòng cho người sẽ đi sau mình, và mở cấp độ tiếp theo.',
    artifact: 'Huy hiệu cấp độ + một dòng để lại cho người đi sau',
    minutes: 30,
  },
];
