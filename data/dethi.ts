/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {DeThiMau, CauDeThi} from '../types';

/* ==========================================================================
   ĐỀ THI MẪU TRỌN VẸN

   VÌ SAO CẦN TẦNG NÀY
     Hệ thống đã có MA TRẬN đề — bao nhiêu câu mỗi phần, bao nhiêu phút,
     trọng số ra sao. Ma trận dạy được cách phân bổ giờ, nhưng không cho học
     viên cái cảm giác ngồi trước một đề thật từ câu một tới câu cuối. Cái
     đó chỉ có đề trọn vẹn mới cho được.

     Mỗi đề dưới đây có đủ: đề bài từng câu, đáp án, LỜI GIẢI riêng cho từng
     câu, barem chấm từng phần, thứ tự làm bài khuyến nghị, và cách chia giờ.

   CẢNH BÁO PHẢI ĐỌC TRƯỚC KHI DÙNG
     Cấu trúc đề và công thức điểm THAY ĐỔI theo từng năm và từng trường.
     Những đề này dựng theo cấu trúc các năm gần đây. Trước mỗi mùa thi PHẢI
     đối chiếu lại với đề án tuyển sinh chính thức rồi sửa lại. Đề mẫu là để
     luyện cảm giác và luyện phân bổ giờ, KHÔNG phải để đoán đề.

   VỀ SỐ CÂU
     Đề chuyên Sở thật có khoảng 86 câu. Ở đây mỗi đề mẫu có số câu ít hơn
     nhưng PHỦ ĐỦ MỌI DẠNG của phần đó, vì cái học được từ câu thứ hai mươi
     cùng dạng là gần bằng không, còn cái học được từ một dạng chưa gặp thì
     rất lớn. Số câu thật của từng phần được ghi trong `theoCauTruc` để học
     viên biết mình đang luyện trên bản rút gọn.
   ========================================================================== */

export const DETHI_CREED = {
  name: 'ĐỀ THI MẪU TRỌN VẸN',
  claim:
    'Bốn đề mẫu theo đúng cấu trúc bốn kỳ thi có thật, mỗi câu có đáp án và lời giải riêng, mỗi phần có barem chấm.',
  khongDoanDe:
    'Đề mẫu để luyện cảm giác và luyện phân bổ giờ, KHÔNG phải để đoán đề. Cấu trúc thay đổi theo năm và theo trường; trước mỗi mùa thi phải đối chiếu lại với đề án tuyển sinh chính thức.',
  rutGon:
    'Mỗi đề mẫu ít câu hơn đề thật nhưng phủ đủ mọi dạng của phần đó. Câu thứ hai mươi cùng một dạng gần như không dạy thêm gì; một dạng chưa gặp thì dạy rất nhiều.',
  baremThat:
    'Barem nói cả chỗ cho điểm lẫn chỗ trừ điểm. Phần viết có barem theo tiêu chí, không chấm bằng cảm tính.',
};

const C = (
  no: number, deBai: string, dapAn: string, loiGiai: string, diem: number,
  luaChon?: [string, string, string, string], dangId?: string,
): CauDeThi => ({no, deBai, dapAn, loiGiai, diem, ...(luaChon ? {luaChon} : {}), ...(dangId ? {dangId} : {})});

/* ======================================================================== *
 * ĐỀ 1 — CHUYÊN ANH SỞ HÀ NỘI, NĂM PHẦN
 * ======================================================================== */

const HN_NGHE: CauDeThi[] = [
  C(1, 'Bạn nghe: "The library closes at half past six on weekdays, but on Saturdays it shuts an hour earlier." Thư viện đóng cửa lúc mấy giờ vào thứ Bảy?',
    'B', 'Thứ Bảy đóng sớm hơn một tiếng so với 6h30, tức 5h30. Câu hỏi hỏi thứ Bảy chứ không hỏi ngày thường — đây là chỗ mất điểm phổ biến nhất.', 0.25,
    ['6h30', '5h30', '7h30', '6h00'], 'd-l04'),
  C(2, 'Bạn nghe một đoạn độc thoại về tái chế. Người nói CHỦ YẾU muốn nói điều gì?',
    'C', 'Câu hỏi có "chủ yếu" nên đề hỏi Ý CHÍNH. Chọn theo một chi tiết nghe rõ nhất là bẫy: chi tiết rõ nhất thường là ví dụ minh hoạ, không phải luận điểm.', 0.25,
    ['Nhựa nguy hiểm hơn giấy', 'Chính quyền nên phạt nặng hơn',
     'Phân loại rác tại nhà quan trọng hơn số lượng tái chế',
     'Tái chế tốn kém hơn người ta tưởng'], 'd-l06'),
  C(3, 'Bạn nghe: "I would rather you didn\'t mention it to him." Người nói muốn gì?',
    'A', '"would rather + chủ ngữ + quá khứ" diễn đạt mong muốn ở hiện tại, không phải chuyện quá khứ. Dạng quá khứ ở đây là dạng giả định.', 0.25,
    ['Không muốn bạn nói với anh ta', 'Trách bạn đã nói với anh ta',
     'Muốn bạn nói lại lần nữa', 'Không quan tâm bạn có nói hay không'], 'd-l07'),
  C(4, 'Bạn nghe hội thoại tại quầy vé. Điền số còn thiếu: vé người lớn giá ___ bảng.',
    '14', 'Câu hỏi có đơn vị đo nên đề hỏi CHI TIẾT. Bẫy quen thuộc: người nói sửa lại số ngay sau đó ("fourteen, sorry, forty" — hoặc ngược lại). Luôn nghe hết câu trước khi ghi.', 0.25,
    undefined, 'd-l02'),
  C(5, 'Thái độ của người nói về đề xuất này là gì?',
    'D', 'Câu hỏi thái độ thì tìm TỪ MANG SẮC THÁI, không tìm sự kiện. "I suppose it might work, in theory" — chuỗi rào đón đó là dấu hiệu của sự dè dặt, không phải ủng hộ.', 0.25,
    ['Hoàn toàn ủng hộ', 'Phản đối gay gắt', 'Thờ ơ', 'Dè dặt, chưa tin hẳn'], 'd-l08'),
];

const HN_NGU_AM: CauDeThi[] = [
  C(6, 'Chọn từ có trọng âm khác ba từ còn lại.',
    'C', '"comFORtable" nhấn âm một; ba từ kia nhấn âm hai. Hậu tố "-able" trung tính nên giữ nguyên trọng âm gốc — không cần nhớ từng từ, chỉ cần biết luật.', 0.2,
    ['inFORM', 'reMEMber', 'COMfortable', 'exPLAIN'], 'd-p03'),
  C(7, 'Chọn từ có phần gạch chân phát âm khác: ch__aos, ch__emistry, ch__aracter, ch__ampion.',
    'D', '"champion" đọc /tʃ/; ba từ kia đọc /k/ vì đều gốc Hy Lạp. Gốc từ là dấu hiệu, không phải mặt chữ.', 0.2,
    ['chaos', 'chemistry', 'character', 'champion'], 'd-p01'),
  C(8, 'Trọng âm của "photographic" rơi vào âm tiết thứ mấy?',
    'C', 'Hậu tố "-ic" luôn kéo trọng âm về âm tiết ngay TRƯỚC nó: pho-to-GRA-phic.', 0.2,
    ['Một', 'Hai', 'Ba', 'Bốn'], 'd-p03'),
  C(9, 'Chọn từ có đuôi "-ed" phát âm khác ba từ còn lại.',
    'B', '"needed" đọc /ɪd/ vì gốc kết thúc bằng /d/; ba từ kia đọc /t/ vì gốc kết thúc bằng âm vô thanh. Luật nằm ở ÂM cuối, không ở CHỮ cuối.', 0.2,
    ['watched', 'needed', 'stopped', 'laughed'], 'd-p07'),
  C(10, 'Trong "an apple", hiện tượng ngữ âm nào xảy ra?',
    'A', 'Phụ âm cuối /n/ nối sang nguyên âm đầu của từ sau thành /ə-næpl/. Đây là lý do người học nghe thành một từ lạ dù biết cả hai từ.', 0.2,
    ['Nối phụ âm sang nguyên âm', 'Nuốt âm', 'Đồng hoá', 'Bật hơi'], 'd-p05'),
];

const HN_TU_NGU: CauDeThi[] = [
  C(11, 'She has a real ___ for languages — she picked up Thai in six months.',
    'B', '"a flair for" là cụm cố định nghĩa là có năng khiếu. Ba từ kia đều nghĩa gần nhưng không đi với "for" theo cách này. Đề chuyên hỏi CỤM, nên biết nghĩa từng từ vẫn sai.', 0.2,
    ['talent', 'flair', 'skill', 'ability'], 'd-v04'),
  C(12, 'Not until she had left the room ___ what had really happened.',
    'C', 'Đảo ngữ sau "Not until": mệnh đề chính phải đảo trợ động từ lên trước chủ ngữ. "did she realise", không phải "she realised".', 0.2,
    ['she realised', 'she did realise', 'did she realise', 'realised she'], 'd-g04'),
  C(13, 'The report, ___ was published last week, has caused considerable debate.',
    'A', 'Mệnh đề quan hệ KHÔNG xác định — có dấu phẩy — thì bắt buộc dùng "which", không dùng "that". Đây là luật cứng.', 0.2,
    ['which', 'that', 'what', 'it'], 'd-g02'),
  C(14, 'His argument was ___ convincing that nobody objected.',
    'B', 'Cấu trúc "so + tính từ + that". "such" đi với danh từ ("such a convincing argument"), không đi thẳng với tính từ.', 0.2,
    ['such', 'so', 'too', 'very'], 'd-g08'),
  C(15, 'They are still ___ the possibility of moving abroad.',
    'D', '"consider" đi với danh động từ, và ở đây chỗ trống cần một động từ đi với "the possibility". "considering" là đáp án; ba từ kia đòi giới từ khác hoặc đổi nghĩa.', 0.2,
    ['thinking', 'regarding', 'looking', 'considering'], 'd-g06'),
  C(16, 'Điền dạng đúng của từ trong ngoặc: The government has introduced several ___ (ECONOMY) reforms.',
    'economic', 'Chỗ trống đứng trước danh từ "reforms" nên cần TÍNH TỪ. "economic" (thuộc kinh tế) khác "economical" (tiết kiệm) — chọn sai là đổi nghĩa câu.', 0.2,
    undefined, 'd-v03'),
  C(17, 'Điền giới từ: She is entirely dependent ___ her parents.',
    'on', '"dependent on" là cặp cố định. Người Việt hay viết "dependent of" vì suy từ "independent of" — nhưng hai từ này đi với hai giới từ khác nhau.', 0.2,
    undefined, 'd-v02'),
  C(18, 'Tìm lỗi sai: "Despite of the heavy rain, the match went ahead."',
    'Despite of → Despite (hoặc In spite of)',
    '"despite" không đi với "of"; "in spite of" thì có. Trộn hai cấu trúc là lỗi phổ biến nhất ở phần này.', 0.2,
    undefined, 'd-g10'),
];

const HN_DOC_BAI = `Urban rooftop farming has moved from novelty to necessity in several Asian cities. In Singapore, where less than one per cent of land is farmed, a government scheme now funds growers who convert car park roofs into vegetable plots. Supporters point to shorter supply chains: lettuce harvested at nine in the morning can reach a supermarket shelf by noon, cutting both transport emissions and spoilage.

Critics, however, question the arithmetic. Rooftop yields remain modest, and the structures often need reinforcing before soil can be added — an expense rarely counted in the enthusiastic press coverage. One study found that when construction costs were included, rooftop lettuce cost roughly twice as much per kilogram as imported lettuce.

Yet the case for rooftop farms may not rest on price at all. Their defenders increasingly argue that the real yield is educational: children who have watched a plant grow are measurably more willing to eat vegetables, and residents report a stronger sense of connection to their neighbourhood. Whether that justifies the subsidy is a question the cost calculations cannot settle.`;

const HN_DOC: CauDeThi[] = [
  C(19, 'Ý chính của bài đọc là gì?',
    'C', 'Đoạn cuối chuyển hướng lập luận: giá trị thật có thể không nằm ở giá. Ý chính phải bao được cả ba đoạn, không chỉ đoạn một.', 0.25,
    ['Singapore thiếu đất nông nghiệp',
     'Rau trồng trên mái đắt gấp đôi rau nhập',
     'Giá trị của nông nghiệp trên mái còn đang tranh cãi và có thể không nằm ở giá',
     'Trẻ em nên được xem cây lớn lên'], 'd-r05'),
  C(20, 'Theo bài đọc, chi phí nào thường bị bỏ sót khi ca ngợi nông nghiệp trên mái?',
    'B', 'Đoạn hai nói rõ: "the structures often need reinforcing... an expense rarely counted". Đây là câu hỏi CHI TIẾT, đáp án nằm nguyên văn.', 0.25,
    ['Chi phí vận chuyển', 'Chi phí gia cố công trình', 'Chi phí hạt giống', 'Chi phí nhân công'], 'd-r03'),
  C(21, 'Từ "that" ở câu cuối chỉ điều gì?',
    'D', 'Câu hỏi tham chiếu đại từ: đáp án nằm ngay TRƯỚC nó. "that" chỉ toàn bộ lợi ích giáo dục và gắn kết vừa nêu, không chỉ một danh từ đơn lẻ.', 0.25,
    ['Khoản trợ cấp', 'Phép tính chi phí', 'Rau nhập khẩu',
     'Lợi ích giáo dục và sự gắn kết vừa nêu'], 'd-r06'),
  C(22, 'Điều nào sau đây KHÔNG được nêu trong bài?',
    'C', 'Câu có "KHÔNG" viết hoa: ba đáp án có trong bài, một không. Bài không hề nói tới việc tạo việc làm — đừng suy diễn thêm điều hợp lý nhưng không có trong văn bản.', 0.25,
    ['Rau cắt buổi sáng lên kệ trước trưa',
     'Chưa tới một phần trăm đất Singapore dùng để canh tác',
     'Nông nghiệp trên mái tạo ra nhiều việc làm mới',
     'Trẻ từng xem cây lớn lên thì sẵn sàng ăn rau hơn'], 'd-r04'),
  C(23, 'Thái độ của tác giả với nông nghiệp trên mái là gì?',
    'B', 'Tác giả trình bày cả hai phía và kết bằng một câu hỏi bỏ ngỏ. Đó là thái độ cân bằng, không phải ủng hộ hay phản đối.', 0.25,
    ['Ủng hộ nhiệt thành', 'Cân bằng, nêu cả hai phía', 'Phản đối', 'Mỉa mai'], 'd-r08'),
];

const HN_VIET: CauDeThi[] = [
  C(24, 'Viết lại giữ nguyên nghĩa: "It was such a difficult question that nobody could answer it." (SO)',
    'The question was so difficult that nobody could answer it.',
    'Chuyển "such a + tính từ + danh từ" sang "so + tính từ": danh từ phải lên làm chủ ngữ. Giữ nguyên "that nobody could answer it".', 0.5,
    undefined, 'd-w01'),
  C(25, 'Viết lại: "I last saw her three years ago." (SINCE)',
    'I have not seen her since three years ago. / It is three years since I last saw her.',
    'Cả hai đáp án đều được chấp nhận. Bẫy: viết "I have not seen her for three years" thì đúng nghĩa nhưng KHÔNG dùng từ gợi ý SINCE, nên không tính điểm.', 0.5,
    undefined, 'd-w02'),
  C(26, 'Viết lại: "They think the manager has resigned." (BELIEVED)',
    'The manager is believed to have resigned.',
    'Bị động với động từ tường thuật. "has resigned" ở quá khứ so với "is believed" nên phải dùng "to have resigned", không phải "to resign".', 0.5,
    undefined, 'd-w01'),
  C(27, 'Viết lại: "If you had told me earlier, I could have helped." (WISH)',
    'I wish you had told me earlier.',
    'Ước ở quá khứ dùng "wish + quá khứ hoàn thành". Viết "I wish you told me" là ước ở hiện tại — sai mốc thời gian.', 0.5,
    undefined, 'd-w02'),
  C(28, 'Viết một đoạn khoảng 120 từ trả lời: "Should secondary students be allowed to use smartphones in class?" Nêu quan điểm và ít nhất hai lý do có ví dụ.',
    'Xem barem phần VIẾT — chấm theo bốn tiêu chí, không có một đáp án đúng duy nhất.',
    'Bài đạt điểm cao có: một câu chủ đề nêu rõ lập trường ngay câu đầu, hai lý do TÁCH BẠCH (không phải một lý do nói hai lần), mỗi lý do một ví dụ cụ thể, và một câu kết nhắc lại lập trường mà không lặp nguyên văn câu đầu. Lỗi mất điểm nặng nhất: viết đủ 120 từ nhưng chỉ có một lý do kéo dài.', 1.5,
    undefined, 'd-w05'),
];

/* ======================================================================== *
 * ĐỀ 2 — NGOẠI NGỮ CHUNG VÀO 10 HÀ NỘI (40 CÂU, RÚT GỌN CÒN 12)
 * ======================================================================== */

const CHUNG: CauDeThi[] = [
  C(1, 'Bạn thấy biển: "NO ENTRY — AUTHORISED PERSONNEL ONLY". Biển này nghĩa là gì?',
    'B', 'Dạng đọc biển báo tăng mạnh những năm gần đây. "authorised personnel" là người có phận sự, không phải nhân viên nói chung.', 0.25,
    ['Cấm mọi người vào', 'Chỉ người có phận sự được vào', 'Vào cửa miễn phí', 'Lối ra khẩn cấp'], 'd-r02'),
  C(2, 'A: "Would you mind if I opened the window?" B: "___"',
    'C', '"Would you mind if..." hỏi phép; đồng ý phải trả lời PHỦ ĐỊNH ("Not at all"). Trả lời "Yes" là từ chối — bẫy dịch thẳng từ tiếng Việt.', 0.25,
    ['Yes, please do.', 'Yes, of course.', 'Not at all.', 'Never mind.'], 'd-v05'),
  C(3, 'Chọn câu chủ đề cho đoạn: "___ For instance, students who sleep fewer than six hours score noticeably lower on memory tests. Teachers also report more behavioural problems in the first lesson of the day."',
    'A', 'Câu chủ đề phải bao được CẢ HAI ví dụ: trí nhớ và hành vi. Đáp án chỉ nói một trong hai là quá hẹp.', 0.25,
    ['Lack of sleep affects students in several ways.',
     'Students should go to bed before ten.',
     'Memory tests are unreliable.',
     'Teachers are often tired in the morning.'], 'd-r05'),
  C(4, 'Sắp xếp thành đoạn hợp lý: (1) However, it soon became clear this was not enough. (2) The school first tried banning phones during lessons. (3) Now phones are collected at the gate each morning.',
    '2 - 1 - 3', 'Bắt đầu bằng việc đầu tiên (2), "However" nối sang vấn đề (1), "Now" chỉ hiện trạng cuối (3). Từ nối là chìa khoá, không phải nội dung.', 0.25,
    undefined, 'd-w06'),
  C(5, 'By the time we arrived, the film ___.',
    'C', '"By the time" + quá khứ đơn thì mệnh đề kia dùng quá khứ hoàn thành: việc xảy ra TRƯỚC.', 0.25,
    ['started', 'was starting', 'had started', 'has started'], 'd-g01'),
  C(6, 'She asked me where ___.',
    'A', 'Câu tường thuật: trật tự trở về CHỦ NGỮ TRƯỚC ĐỘNG TỪ, không đảo. "where I lived", không phải "where did I live".', 0.25,
    ['I lived', 'did I live', 'do I live', 'was I living'], 'd-g09'),
  C(7, 'Chọn từ đồng nghĩa với "abundant" trong: "The region has abundant rainfall."',
    'B', '"abundant" là dồi dào. "adequate" chỉ là vừa đủ — gần nghĩa nhưng khác mức độ, và đề chuyên hỏi đúng chỗ khác biệt đó.', 0.25,
    ['adequate', 'plentiful', 'scarce', 'occasional'], 'd-v05'),
  C(8, 'Điền: "He apologised ___ being late."',
    'for', '"apologise for + V-ing". Người Việt hay viết "apologise about" vì suy từ "sorry about".', 0.25,
    undefined, 'd-v02'),
  C(9, 'Tìm lỗi: "The number of students have increased sharply."',
    'have → has', '"The number of..." là chủ ngữ số ít. Phân biệt với "A number of..." vốn số nhiều — hai cụm gần giống nhau nhưng chia động từ ngược nhau.', 0.25,
    undefined, 'd-g10'),
  C(10, 'A: "I have never been to Huế." B: "___"',
    'D', '"Neither have I" là cách đáp lại một câu PHỦ ĐỊNH. "So have I" dùng cho câu khẳng định.', 0.25,
    ['So have I.', 'So do I.', 'Neither do I.', 'Neither have I.'], 'd-v05'),
  C(11, 'Điền câu vào chỗ trống: "Recycling is not always the answer. ___ Reducing what we buy in the first place has a far larger effect."',
    'B', 'Câu điền phải nối được ý trước (tái chế không phải câu trả lời) với ý sau (giảm mua có tác dụng lớn hơn). Đáp án B làm đúng cầu nối đó.', 0.25,
    ['Recycling plants are expensive to build.',
     'It deals with waste that already exists, rather than preventing it.',
     'Many countries export their waste.',
     'Plastic takes centuries to decompose.'], 'd-r07'),
  C(12, 'Chọn từ có trọng âm khác: economy, economic, comfortable, necessary.',
    'B', '"ecoNOmic" nhấn âm ba do hậu tố "-ic"; ba từ kia nhấn âm một hoặc hai theo dạng gốc. Nhận ra hậu tố là xong câu, không cần nhớ từng từ.', 0.25,
    ['economy', 'economic', 'comfortable', 'necessary'], 'd-p03'),
];

/* ======================================================================== *
 * ĐỀ 3 — CHUYÊN KHTN VÒNG 2 (KHÓ HƠN, THIÊN VỀ SUY LUẬN)
 * ======================================================================== */

const KHTN: CauDeThi[] = [
  C(1, 'Chọn phương án đúng: "Hardly ___ the door when the phone rang."',
    'C', 'Đảo ngữ với "Hardly" đòi quá khứ hoàn thành và trợ động từ lên trước chủ ngữ: "had I closed". Cặp đi kèm là "Hardly ... when", không phải "than".', 0.25,
    ['I closed', 'I had closed', 'had I closed', 'did I close'], 'd-g04'),
  C(2, 'Viết lại dùng đúng năm từ: "It is not necessary for you to finish it today." → "You ___ it today."',
    "don't have to finish", '"not necessary" chuyển thành "don\'t have to", KHÔNG phải "mustn\'t". "mustn\'t" là cấm, đổi hẳn nghĩa — đây là bẫy được ra đi ra lại.', 0.5,
    undefined, 'd-w02'),
  C(3, 'Điền dạng đúng: "Her ___ (PERSIST) eventually paid off."',
    'persistence', 'Chỗ trống sau tính từ sở hữu "Her" nên cần DANH TỪ. "persistence" là danh từ chỉ phẩm chất; "persistency" hiếm dùng và không phải lựa chọn chuẩn ở đây.', 0.25,
    undefined, 'd-v03'),
  C(4, 'Chọn câu có nghĩa gần nhất: "But for your help, I would have failed."',
    'A', '"But for" = "nếu không có". Câu gốc là điều kiện loại 3, nên phải giữ nguyên mốc quá khứ. Đáp án B đổi sang hiện tại là sai mốc.', 0.25,
    ['If you had not helped me, I would have failed.',
     'If you do not help me, I will fail.',
     'Because you helped me, I failed.',
     'Unless you helped me, I failed.'], 'd-g03'),
  C(5, 'Tìm và sửa lỗi: "Neither of the two proposals were accepted by the committee."',
    'were → was', '"Neither of + danh từ số nhiều" vẫn chia động từ SỐ ÍT trong văn viết trang trọng. Danh từ số nhiều đứng gần động từ là thứ đánh lừa.', 0.25,
    undefined, 'd-g10'),
  C(6, 'Chọn từ điền: "The evidence was ___ to convict him, so the case collapsed."',
    'D', 'Câu có "so the case collapsed" nên chỗ trống phải mang nghĩa PHỦ ĐỊNH. "insufficient" là từ duy nhất làm được điều đó — đọc vế sau trước khi chọn.', 0.25,
    ['compelling', 'conclusive', 'substantial', 'insufficient'], 'd-v06'),
  C(7, 'Viết lại: "People say that he was a brilliant mathematician." (SAID)',
    'He is said to have been a brilliant mathematician.',
    'Bị động tường thuật, và "was" ở quá khứ so với "is said" nên bắt buộc "to have been". Viết "to be" là mất mốc thời gian.', 0.5,
    undefined, 'd-w01'),
  C(8, 'Điền cụm: "The two theories are, in essence, ___ ."',
    'B', '"one and the same" là cụm cố định nghĩa là hoàn toàn giống nhau. Ba phương án kia đều là cụm không tồn tại hoặc sai dạng.', 0.25,
    ['same one', 'one and the same', 'the one same', 'a same one'], 'd-v04'),
];

/* ======================================================================== *
 * ĐỀ 4 — TỐT NGHIỆP THPT, BA PHẦN
 * ======================================================================== */

const TN_NGU_AM: CauDeThi[] = [
  C(1, 'Chọn từ có phần gạch chân phát âm khác: needed, wanted, decided, played.',
    'D', '"played" đọc /d/ vì gốc kết thúc bằng âm hữu thanh; ba từ kia đọc /ɪd/ vì gốc kết thúc bằng /t/ hoặc /d/.', 0.2,
    ['needed', 'wanted', 'decided', 'played'], 'd-p07'),
  C(2, 'Chọn từ có trọng âm khác: develop, determine, demonstrate, deliver.',
    'C', '"DEmonstrate" nhấn âm một — động từ ba âm tiết đuôi "-ate" thường nhấn âm đầu. Ba từ kia nhấn âm hai.', 0.2,
    ['develop', 'determine', 'demonstrate', 'deliver'], 'd-p03'),
];

const TN_TU_NGU: CauDeThi[] = [
  C(3, 'If I ___ you, I would take the job.',
    'B', 'Điều kiện loại 2 với "I": dùng "were" trong văn chuẩn. "was" gặp trong nói thường nhưng không phải đáp án của đề.', 0.2,
    ['am', 'were', 'will be', 'had been'], 'd-g03'),
  C(4, 'The house ___ we used to live has been demolished.',
    'C', 'Sau danh từ chỉ NƠI CHỐN và trước một mệnh đề đủ thành phần thì dùng "where". Dùng "which" thì phải có giới từ đi kèm ("in which").', 0.2,
    ['which', 'that', 'where', 'when'], 'd-g02'),
  C(5, 'She denied ___ the money.',
    'A', '"deny" đi với danh động từ. Bốn phương án đều là dạng của "take", nên đề đang hỏi DẠNG chứ không hỏi nghĩa.', 0.2,
    ['taking', 'to take', 'take', 'taken'], 'd-g06'),
  C(6, 'Điền giới từ: "She is responsible ___ the whole department."',
    'for', '"responsible for" là cặp cố định. "responsible to" tồn tại nhưng nghĩa là chịu trách nhiệm TRƯỚC ai đó, không phải phụ trách cái gì.', 0.2,
    undefined, 'd-v02'),
  C(7, 'Điền dạng đúng: "The film was ___ (DISAPPOINT) — we left halfway through."',
    'disappointing', 'Chủ ngữ là "the film" — vật gây ra cảm giác, nên dùng đuôi "-ing". "disappointed" dành cho người CẢM THẤY. Đây là cặp sai nhiều nhất của cả phần.', 0.2,
    undefined, 'd-v03'),
];

const TN_DOC_BAI = `For decades, the standard advice to language learners was to study grammar rules first and speak later. Recent classroom research complicates that picture. In a three-year study of secondary students in four countries, learners who began speaking within the first month made faster progress in fluency — but, crucially, only when their errors were corrected consistently. Where correction was absent, early speaking produced confident learners who had fossilised their mistakes.

The finding suggests the debate has been framed wrongly. The question is not whether to speak early, but whether the feedback loop is tight enough to catch errors before they harden. Teachers, the authors note, are the expensive part of that loop.

There is a further complication the study does not resolve. The four countries differed sharply in class size, and the schools where correction was most consistent were also the schools with the fewest students per teacher. It is therefore difficult to separate the effect of feedback from the effect of attention. A teacher with eighteen students may simply notice more than a teacher with forty-five, regardless of method.

For schools without the budget to reduce class sizes, the practical question becomes narrower: which errors are worth correcting? The authors suggest prioritising errors that block understanding over those that merely sound unusual — a distinction most teachers make instinctively, but few make consistently.`;

const TN_DOC: CauDeThi[] = [
  C(8, 'Theo bài đọc, nói sớm chỉ có lợi khi nào?',
    'B', 'Từ "crucially" đánh dấu điều kiện quyết định: chỉ khi lỗi được sửa nhất quán. Đây là câu hỏi CHI TIẾT có dấu hiệu từ vựng chỉ đường.', 0.25,
    ['Khi học viên tự tin', 'Khi lỗi được sửa nhất quán',
     'Khi học đủ ba năm', 'Khi có bạn cùng học'], 'd-r03'),
  C(9, 'Từ "fossilised" trong bài gần nghĩa nhất với từ nào?',
    'C', 'Đoán nghĩa theo ngữ cảnh: "before they harden" ở đoạn sau chính là chỗ giải nghĩa. Đề luôn để lại một dấu như vậy.', 0.25,
    ['forgotten', 'discovered', 'become permanent', 'reduced'], 'd-r06'),
  C(10, 'Tác giả ngụ ý điều gì ở câu cuối?',
    'A', '"Teachers are the expensive part of that loop" — nêu ra chi phí ngay sau khi chứng minh vòng phản hồi là điều kiện quyết định. Đó là gợi ý về khó khăn khi nhân rộng, không phải chê giáo viên.', 0.25,
    ['Áp dụng rộng sẽ tốn kém vì cần nhiều giáo viên',
     'Nên bỏ giáo viên và dùng phần mềm',
     'Giáo viên dạy chưa tốt',
     'Nghiên cứu này không đáng tin'], 'd-r08'),
];

/* --------------------------- BỐN ĐỀ HOÀN CHỈNH -------------------------- */

const tong = (cs: CauDeThi[]) => Number(cs.reduce((s, c) => s + c.diem, 0).toFixed(2));

export const DE_THI_MAU: DeThiMau[] = [
  {
    id: 'dt-hanoi-5',
    ten: 'Đề chuyên Anh — Sở Hà Nội (năm phần)',
    kyThi: 'Tuyển sinh vào 10 chuyên Anh, Sở GD-ĐT Hà Nội',
    theoCauTruc:
      'Đề thật: 120 phút, khoảng 86 câu, thang 10, năm phần Nghe · Ngữ âm · Từ vựng–Ngữ pháp · Đọc · Viết. Đề mẫu này rút còn 28 câu nhưng phủ đủ mọi dạng của cả năm phần. PHẢI đối chiếu lại cấu trúc với đề án tuyển sinh của Sở trước mỗi mùa thi.',
    phut: 120,
    tongDiem: 10,
    soCau: 28,
    phan: [
      {no: 1, ten: 'NGHE', huongDan: 'Nghe hai lần. Đọc câu hỏi trước khi băng chạy.', phut: 25, diem: tong(HN_NGHE), cau: HN_NGHE,
       barem: 'Mỗi câu 0,25 điểm, đúng trọn mới tính. Câu điền số sai chính tả số vẫn tính đúng nếu con số đúng.'},
      {no: 2, ten: 'NGỮ ÂM', huongDan: 'Chọn một phương án đúng.', phut: 5, diem: tong(HN_NGU_AM), cau: HN_NGU_AM,
       barem: 'Mỗi câu 0,2 điểm. Đây là phần ngắn nhất và phải đúng cả năm — mất một câu ở đây đắt hơn mất một câu ở phần 25 câu.'},
      {no: 3, ten: 'TỪ VỰNG – NGỮ PHÁP', huongDan: 'Chọn phương án đúng hoặc điền từ theo yêu cầu.', phut: 25, diem: tong(HN_TU_NGU), cau: HN_TU_NGU,
       barem: 'Mỗi câu 0,2 điểm. Câu điền dạng từ: sai chính tả là không tính, kể cả khi đúng dạng.'},
      {no: 4, ten: 'ĐỌC', huongDan: 'Đọc bài rồi trả lời. Quét theo từ khoá của câu hỏi, đừng đọc tuần tự.', phut: 35, diem: tong(HN_DOC), nguLieu: HN_DOC_BAI, cau: HN_DOC,
       barem:
         'Mỗi câu 0,25 điểm, không có điểm một phần. Câu hỏi tham chiếu đại từ và câu hỏi thái độ chấm theo lựa chọn, không chấm theo lời giải thích của thí sinh. TRỪ ĐIỂM: không trừ điểm câu sai, nên không bao giờ bỏ trắng.'},
      {no: 5, ten: 'VIẾT', huongDan: 'Viết lại câu dùng từ gợi ý, rồi viết đoạn theo yêu cầu.', phut: 30, diem: tong(HN_VIET), cau: HN_VIET,
       barem:
         'Câu viết lại 0,5 điểm mỗi câu: đúng cấu trúc 0,3 · đúng từ gợi ý 0,1 · không lỗi chính tả và chia động từ 0,1. KHÔNG dùng từ gợi ý thì 0 điểm dù câu đúng.\n' +
         'Đoạn 120 từ 1,5 điểm theo bốn tiêu chí, mỗi tiêu chí 0,375: (a) nêu rõ lập trường ngay câu đầu · (b) hai lý do TÁCH BẠCH, không phải một lý do nói hai lần · (c) mỗi lý do có ví dụ cụ thể · (d) ngữ pháp và từ vựng không lỗi cản nghĩa.\n' +
         'TRỪ ĐIỂM: viết dưới 100 từ hoặc trên 150 từ trừ 0,25. Lạc đề trừ toàn bộ tiêu chí (a) và (b).',
      },
    ],
    thuTuLam:
      'Ngữ âm (5 phút) → Từ vựng–Ngữ pháp (25) → Viết phần biến đổi câu (15) → Đọc (35) → Nghe theo lịch phát (25) → Đoạn luận (15). Làm phần biến đổi câu TRƯỚC đoạn luận: đó là phần cho điểm chắc nhất nếu thuộc mẫu, và là phần hay bị bỏ vì hết giờ nhất.',
    chiaThoiGian: [
      'Nghe 25 phút — theo lịch phát băng, không tự điều chỉnh được.',
      'Ngữ âm 5 phút — nhiều hơn là đang phân vân, mà phân vân ở phần này thường chọn sai.',
      'Từ vựng–Ngữ pháp 25 phút — trung bình một phút một câu.',
      'Đọc 35 phút — chia 8 phút đọc lướt cả bài, 27 phút trả lời.',
      'Viết 30 phút — 15 phút cho biến đổi câu, 15 phút cho đoạn luận.',
    ],
    baremChung: 'Thang 10. Không làm tròn lên ở từng phần; chỉ làm tròn tổng tới 0,25.',
    canhBao:
      'Điểm xét tuyển chuyên = Toán + Văn + Ngoại ngữ + (Chuyên × 2). Một điểm ở bài chuyên đáng gấp đôi một điểm ở môn chung — đó là lý do dồn giờ ôn vào bài này.',
  },
  {
    id: 'dt-chung-hanoi',
    ten: 'Đề Ngoại ngữ chung — vào 10 Hà Nội',
    kyThi: 'Tuyển sinh vào 10 công lập, Sở GD-ĐT Hà Nội',
    theoCauTruc:
      'Đề thật: 60 phút, 40 câu trắc nghiệm, mỗi câu 0,25 điểm, trộn 24 mã đề. Những năm gần đây tăng mạnh dạng bài thực tế: đọc biển báo, hội thoại đời thường, tìm câu chủ đề, sắp xếp đoạn, điền câu vào chỗ trống. Đề mẫu này rút còn 12 câu nhưng phủ đủ các dạng, trong đó có cả năm dạng thực tế mới. PHẢI đối chiếu lại cấu trúc và số câu với đề án tuyển sinh của Sở trước mỗi mùa thi.',
    phut: 60,
    tongDiem: 10,
    soCau: 12,
    phan: [
      {no: 1, ten: 'TRẮC NGHIỆM TỔNG HỢP', huongDan: 'Chọn một phương án đúng cho mỗi câu.', phut: 60, diem: tong(CHUNG), cau: CHUNG,
       barem: 'Mỗi câu 0,25 điểm, không có điểm một phần. Đề thật có 40 câu nên mỗi câu đáng 1/40 tổng điểm — bỏ trắng một câu và đoán một câu có kỳ vọng khác nhau, luôn đoán.'},
    ],
    thuTuLam:
      'Làm tuần tự nhưng đánh dấu câu ngờ và đi tiếp ngay. Vòng hai quay lại câu đánh dấu. Không câu nào đáng quá 90 giây ở vòng một.',
    chiaThoiGian: [
      'Vòng một 40 phút — làm hết một lượt, đánh dấu câu ngờ.',
      'Vòng hai 15 phút — chỉ quay lại câu đã đánh dấu.',
      'Năm phút cuối — soát phiếu trả lời, kiểm không lệch dòng.',
    ],
    baremChung: 'Thang 10, mỗi câu 0,25. Không trừ điểm câu sai, nên KHÔNG bao giờ bỏ trắng.',
    canhBao:
      'Trộn 24 mã đề nên thứ tự câu khác nhau giữa các thí sinh. Học thuộc vị trí đáp án là vô nghĩa.',
  },
  {
    id: 'dt-khtn-v2',
    ten: 'Đề chuyên KHTN — vòng 2',
    kyThi: 'Tuyển sinh THPT chuyên Khoa học Tự nhiên, vòng 2',
    theoCauTruc:
      'Vòng 2 nặng về suy luận ngữ pháp và biến đổi câu, ít câu nhận biết thuần tuý hơn đề Sở. Đây là bản RÚT GỌN còn 8 câu, tập trung đúng vào những cấu trúc mà vòng 2 ra đi ra lại: đảo ngữ, bị động tường thuật, "but for", và các cặp dễ nhầm. PHẢI đối chiếu cấu trúc với thông báo tuyển sinh của trường trước mỗi mùa.',
    phut: 90,
    tongDiem: 10,
    soCau: 8,
    phan: [
      {no: 1, ten: 'NGỮ PHÁP VÀ BIẾN ĐỔI CÂU NÂNG CAO', huongDan: 'Chọn phương án đúng, điền từ, hoặc viết lại câu theo yêu cầu.', phut: 90, diem: tong(KHTN), cau: KHTN,
       barem:
         'Câu trắc nghiệm 0,25 điểm. Câu viết lại 0,5 điểm: đúng cấu trúc 0,3 · đúng thì và mốc thời gian 0,1 · chính tả 0,1.\n' +
         'TRỪ ĐIỂM: đúng cấu trúc nhưng sai mốc thời gian chỉ được 0,3 — vòng 2 chấm chặt đúng ở chỗ này.',
      },
    ],
    thuTuLam:
      'Làm hết câu trắc nghiệm trước, rồi mới tới câu viết lại. Câu viết lại tốn giờ gấp ba nhưng chỉ đáng gấp đôi điểm.',
    chiaThoiGian: [
      'Trắc nghiệm 30 phút — trung bình 5 phút một câu, vì câu vòng 2 dài hơn.',
      'Viết lại 45 phút — 15 phút một câu, viết nháp trước.',
      'Soát 15 phút — soát riêng mốc thời gian của mọi câu viết lại.',
    ],
    baremChung: 'Thang 10. Vòng 2 không làm tròn lên.',
    canhBao:
      'Cấu trúc vòng 2 thay đổi theo năm nhiều hơn đề Sở. Dùng đề này để luyện DẠNG, không dùng để đoán số câu.',
  },
  {
    id: 'dt-tot-nghiep',
    ten: 'Đề tốt nghiệp THPT — ba phần',
    kyThi: 'Thi tốt nghiệp THPT, môn Tiếng Anh',
    theoCauTruc:
      'Đề thật: 50 phút, 40 câu trắc nghiệm, ba khối chính là Ngữ âm · Từ vựng–Ngữ pháp · Đọc hiểu. Đây là bản RÚT GỌN còn 10 câu nhưng phủ đủ ba khối. PHẢI đối chiếu với đề minh hoạ chính thức của Bộ trước mỗi mùa thi.',
    phut: 50,
    tongDiem: 10,
    soCau: 10,
    phan: [
      {no: 1, ten: 'NGỮ ÂM', huongDan: 'Chọn từ có phần gạch chân hoặc trọng âm khác ba từ còn lại.', phut: 5, diem: tong(TN_NGU_AM), cau: TN_NGU_AM,
       barem: 'Mỗi câu 0,2 điểm. Phần này thuần luật, phải đúng cả hai.'},
      {no: 2, ten: 'TỪ VỰNG – NGỮ PHÁP', huongDan: 'Chọn phương án đúng hoặc điền từ.', phut: 20, diem: tong(TN_TU_NGU), cau: TN_TU_NGU,
       barem: 'Mỗi câu 0,2 điểm. Câu điền dạng từ sai chính tả không tính.'},
      {no: 3, ten: 'ĐỌC HIỂU', huongDan: 'Đọc bài rồi trả lời.', phut: 25, diem: tong(TN_DOC), nguLieu: TN_DOC_BAI, cau: TN_DOC,
       barem: 'Mỗi câu 0,25 điểm. Câu đoán nghĩa từ theo ngữ cảnh chấm theo lựa chọn, không chấm theo định nghĩa từ điển.'},
    ],
    thuTuLam:
      'Ngữ âm → Từ vựng–Ngữ pháp → Đọc hiểu. Đọc hiểu để cuối vì nó ăn giờ nhất và ít bị ảnh hưởng bởi việc làm vội.',
    chiaThoiGian: [
      'Ngữ âm 5 phút.',
      'Từ vựng–Ngữ pháp 20 phút.',
      'Đọc hiểu 25 phút — 5 phút đọc lướt, 20 phút trả lời.',
    ],
    baremChung: 'Thang 10, chia đều theo số câu của đề thật.',
    canhBao:
      'Không trừ điểm câu sai. Còn một phút mà chưa xong thì tô hết, đừng bỏ trắng câu nào.',
  },
];

export const deTheoMa = (id: string): DeThiMau | undefined =>
  DE_THI_MAU.find((d) => d.id === id);

export const moiCauCuaDe = (id: string): CauDeThi[] =>
  deTheoMa(id)?.phan.flatMap((p) => p.cau) ?? [];

export const DETHI_SO = {
  soDe: DE_THI_MAU.length,
  soCau: DE_THI_MAU.reduce((s, d) => s + d.phan.reduce((t, p) => t + p.cau.length, 0), 0),
  soPhan: DE_THI_MAU.reduce((s, d) => s + d.phan.length, 0),
  soLoiGiai: DE_THI_MAU.reduce(
    (s, d) => s + d.phan.reduce((t, p) => t + p.cau.filter((c) => c.loiGiai.length > 0).length, 0),
    0,
  ),
  soNguLieu: DE_THI_MAU.reduce((s, d) => s + d.phan.filter((p) => p.nguLieu).length, 0),
  tongPhut: DE_THI_MAU.reduce((s, d) => s + d.phut, 0),
};
