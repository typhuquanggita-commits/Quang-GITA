/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {DeThiMau, CauDeThi, PhanDeThi} from '../types';

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

  /* ---- Nối dài cho đủ mười hai câu Nghe của đề thật ---- */

  C(6, 'Bạn nghe: "The talk will be in room nine, not room five as printed on the leaflet." Buổi nói chuyện ở phòng nào?',
    'C', 'Thông báo đính chính luôn nêu số CŨ ngay sau số mới để người nghe đối chiếu — và đó cũng là bẫy. Số đúng là số đứng trước cụm "not".', 0.25,
    ['Phòng 5', 'Phòng 15', 'Phòng 9', 'Phòng 19'], 'd-l02'),
  C(7, 'Bạn nghe: "She said she would call back once she had checked the file." Khi nào cô ấy gọi lại?',
    'B', '"Once + quá khứ hoàn thành" đặt thứ tự rõ: kiểm tra XONG rồi mới gọi. Nghe được hai việc mà không giữ được thứ tự là chỗ gãy của dạng này.', 0.25,
    ['Ngay lập tức', 'Sau khi kiểm tra xong hồ sơ',
     'Trong lúc đang kiểm tra hồ sơ', 'Trước khi kiểm tra hồ sơ'], 'd-l04'),
  C(8, 'Bạn nghe hội thoại về một chuyến đi. Điền giờ KHỞI HÀNH của nhóm (ghi cả đơn vị).',
    '7 giờ', 'Người nói nêu hai mốc: giờ tập trung và giờ khởi hành. Câu hỏi hỏi giờ KHỞI HÀNH, và mốc kia có mặt chỉ để gây nhiễu.', 0.25,
    undefined, 'd-l02'),
  C(9, 'Bạn nghe một đoạn hướng dẫn. Việc nào KHÔNG được nhắc tới?',
    'D', 'Câu hỏi phủ định đòi loại trừ ba việc CÓ nghe thấy rồi mới chọn. Nghe thấy quen tai một cụm rồi chọn ngay là chỗ mất điểm.', 0.25,
    ['Tắt điện thoại', 'Để túi ở ngoài', 'Đeo thẻ ra ngoài áo', 'Ký vào sổ khách'], 'd-l04'),
  C(10, 'Bạn nghe: "Not that I disagree — it is just the timing I am worried about." Người nói có phản đối nội dung đề xuất không?',
    'A', 'Cấu trúc "Not that... — it is just..." tách rõ hai chuyện: không phản đối nội dung, nhưng lo về thời điểm. Nghe nhầm thành phản đối là bỏ mất vế đầu.', 0.25,
    ['Không, chỉ lo về thời điểm', 'Có, phản đối hoàn toàn',
     'Có, phản đối một phần nội dung', 'Không nói rõ'], 'd-l08'),
  C(11, 'Bạn nghe một bài giảng ngắn có ba phần. Phần nào người nói nói là hay bị đánh giá thấp?',
    'C', 'Người nói gắn cụm đánh giá vào đúng MỘT phần. Bắt được cụm đó thì trả lời ngay; nghe hết ba phần rồi mới nhớ lại thì đã trôi.', 0.25,
    ['Phần thứ nhất', 'Phần thứ hai', 'Phần thứ ba', 'Cả ba phần như nhau'], 'd-l08'),
  C(12, 'Bạn nghe hai người bàn về một cuốn sách. Họ đồng ý với nhau ở điểm nào?',
    'B', 'Câu hỏi tìm ĐIỂM CHUNG giữa hai người, nên phải giữ ý của cả hai rồi mới đối chiếu. Chỉ nhớ ý của người nói sau là chỗ gãy phổ biến.', 0.25,
    ['Cuốn sách quá dài', 'Cuốn sách hợp để tra hơn là để đọc liền',
     'Cuốn sách viết cho người mới bắt đầu', 'Cuốn sách nên được dịch'], 'd-l03'),
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

  /* ---- Nối dài cho đủ mười câu Ngữ âm ---- */

  C(18, 'Chọn từ có phần gạch chân phát âm khác: bear, pear, hear, wear.',
    'C', '"hear" đọc /ɪə/; ba từ kia đọc /eə/. Cùng một chuỗi chữ "-ear" mà ba cách đọc — đây là nhóm đề chuyên hỏi đi hỏi lại.', 0.2,
    ['bear', 'pear', 'hear', 'wear'], 'd-p02'),
  C(19, 'Chọn từ có phần gạch chân phát âm khác: blood, food, mood, pool.',
    'A', '"blood" đọc /ʌ/; ba từ kia đọc /uː/. Chuỗi "-oo-" không có quy tắc chung, nên nhóm ngoại lệ blood, flood phải nhớ riêng.', 0.2,
    ['blood', 'food', 'mood', 'pool'], 'd-p02'),
  C(20, 'Chọn từ có trọng âm khác: advantage, however, difficult, important.',
    'C', '"DIfficult" nhấn âm một; ba từ kia nhấn âm hai. Tính từ ba âm tiết kết thúc bằng "-ult" hay "-ent" thường nhấn âm đầu.', 0.2,
    ['advantage', 'however', 'difficult', 'important'], 'd-p03'),
  C(21, 'Chọn từ có trọng âm khác khi là ĐỘNG TỪ: record, present, object, promise.',
    'D', 'Ba từ đầu là cặp danh–động đổi trọng âm: danh từ nhấn âm một, động từ nhấn âm hai. "Promise" giữ nguyên trọng âm âm một ở cả hai từ loại.', 0.2,
    ['record', 'present', 'object', 'promise'], 'd-p04'),
  C(22, 'Trong câu "I did NOT say she took it", nhấn vào "NOT" thì câu ngụ ý gì?',
    'B', 'Trọng âm câu đổi nghĩa mà không đổi một chữ nào. Nhấn vào từ phủ định là bác bỏ chính lời buộc tội, không phải bác bỏ ai đã lấy.', 0.2,
    ['Người khác đã nói câu đó', 'Tôi phủ nhận hoàn toàn việc mình đã nói thế',
     'Cô ấy lấy thứ khác', 'Ai đó khác đã lấy'], 'd-p09'),
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

  /* ---- Nối dài cho đủ ba mươi câu Từ vựng – Ngữ pháp của đề chuyên ---- */

  C(31, 'Điền: "Little ___ that the decision would be reversed a week later."',
    'A', 'Trạng từ phủ định "Little" mở đầu câu bắt buộc đảo ngữ. Cụm này gần như luôn đi với động từ chỉ nhận thức: know, realise, suspect.', 0.2,
    ['did we know', 'we knew', 'we did know', 'knew we'], 'd-g07'),
  C(32, 'Điền: "The committee, ___ members were appointed last year, meets monthly."',
    'C', '"Whose" chỉ quan hệ sở hữu và đi thẳng với danh từ không mạo từ. "Of which" cũng đúng nghĩa nhưng đòi trật tự khác: "the members of which".', 0.2,
    ['which', 'who', 'whose', 'that'], 'd-g06'),
  C(33, 'Chọn câu gần nghĩa nhất: "But for his help, we would have failed."',
    'B', '"But for + danh từ" nghĩa là "nếu không có". Nó là dạng rút gọn của câu điều kiện loại ba, nên vế chính giữ nguyên "would have".', 0.2,
    ['Because he helped us, we failed.',
     'If he had not helped us, we would have failed.',
     'He helped us but we still failed.',
     'We failed although he helped us.'], 'd-g08'),
  C(34, 'Điền dạng đúng: "The report was ___ (CONCLUDE) but hard to read."',
    'conclusive', 'Cần TÍNH TỪ sau "was". Chú ý phân biệt "conclusive" (mang tính kết luận) với "concluding" (kết thúc) — hai tính từ cùng gốc, nghĩa khác hẳn.', 0.2,
    undefined, 'd-v03'),
  C(35, 'Điền giới từ: "They were accused ___ falsifying the records."',
    'of', '"Accuse somebody of + V-ing". Phân biệt với "blame somebody for" và "charge somebody with" — ba động từ cùng trường nghĩa, ba giới từ khác nhau.', 0.2,
    undefined, 'd-v02'),
  C(36, 'Điền: "___ the weather improve, the match will go ahead."',
    'D', 'Câu điều kiện đảo ngữ dạng trang trọng: "Should + chủ ngữ + động từ nguyên thể" thay cho "If... should...". Động từ giữ nguyên thể, không chia.', 0.2,
    ['If', 'Were', 'Had', 'Should'], 'd-g03'),
  C(37, 'Chọn từ đồng nghĩa với "meticulous" trong: "She kept meticulous records."',
    'A', '"Meticulous" là tỉ mỉ tới từng chi tiết. "Careful" gần nghĩa nhưng nhẹ hơn; đề chuyên hỏi đúng chỗ chênh mức độ này.', 0.2,
    ['scrupulous', 'hasty', 'approximate', 'occasional'], 'd-v06'),
  C(38, 'Tìm lỗi: "The data suggests that students prefers online lessons."',
    'prefers → prefer', 'Chủ ngữ của mệnh đề "that" là "students" số nhiều. Danh từ "data" ở mệnh đề chính không ràng buộc động từ của mệnh đề phụ.', 0.2,
    undefined, 'd-g10'),
  C(39, 'Điền: "It was not until midnight ___ the power came back."',
    'B', 'Câu chẻ nhấn mạnh với "It was not until... that...". Cụm "that" là bắt buộc và không thay bằng "when" được trong cấu trúc này.', 0.2,
    ['when', 'that', 'which', 'then'], 'd-g07'),
  C(40, 'Chọn câu gần nghĩa nhất: "He is said to have left the country."',
    'C', 'Bị động với động từ tường thuật: "It is said that he left". Chú ý "to have left" chỉ việc xảy ra TRƯỚC thời điểm nói, không phải hiện tại.', 0.2,
    ['He said he would leave the country.',
     'People say he will leave the country.',
     'It is said that he has left the country.',
     'He was told to leave the country.'], 'd-g08'),
  C(41, 'Điền dạng đúng: "Her ___ (PERSIST) eventually paid off."',
    'persistence', 'Sau tính từ sở hữu cần DANH TỪ trừu tượng. Chú ý đuôi "-ence" chứ không phải "-ance" — nhóm này phải nhớ theo từ.', 0.2,
    undefined, 'd-v03'),
  C(42, 'Điền: "So ___ was the queue that we gave up and went home."',
    'A', 'Cấu trúc "So + tính từ + trợ động từ + chủ ngữ + that...". Tính từ đứng NGAY sau "So", trước cả động từ — trật tự này là chỗ hay sai.', 0.2,
    ['long', 'longer', 'the longest', 'lengthy'], 'd-g04'),
  C(43, 'Chọn cụm động từ đúng: "The talks broke ___ after three hours without agreement."',
    'B', '"Break down" là đổ vỡ, thất bại — dùng cho đàm phán, máy móc, quan hệ. "Break up" là chia tay hoặc tan học, nghĩa khác hẳn.', 0.2,
    ['up', 'down', 'off', 'out'], 'd-v08'),
  C(44, 'Điền: "I object to ___ like a beginner."',
    'C', '"Object to" ở đây là giới từ "to", nên theo sau là V-ing chứ không phải nguyên thể. Bị động "being treated" vì chủ ngữ là người CHỊU hành động.', 0.2,
    ['treat', 'be treated', 'being treated', 'to be treated'], 'd-g05'),
  C(45, 'Tìm lỗi: "Despite he was exhausted, he kept working."',
    'Despite → Although', '"Despite" đi với danh từ hoặc V-ing, không đi với cả mệnh đề. Muốn giữ mệnh đề thì phải đổi sang "Although" hoặc "Even though".', 0.2,
    undefined, 'd-g10'),
  C(46, 'Chọn từ trái nghĩa với "conspicuous" trong: "The change was conspicuous."',
    'D', '"Conspicuous" là dễ thấy, nổi bật. Trái nghĩa trực tiếp là "inconspicuous" — kín đáo, khó nhận ra. Ba từ kia trái nghĩa với từ khác.', 0.2,
    ['irrelevant', 'inconsistent', 'incomplete', 'inconspicuous'], 'd-v06'),
  C(47, 'Điền: "The plan is worth ___ once more before we commit."',
    'B', '"Be worth + V-ing" là cấu trúc cố định, và dạng V-ing ở đây mang nghĩa BỊ ĐỘNG dù hình thức chủ động — "worth considering" nghĩa là đáng được cân nhắc.', 0.2,
    ['to consider', 'considering', 'considered', 'to be considered'], 'd-g05'),
  C(48, 'Điền giới từ: "There is no substitute ___ regular practice."',
    'for', '"Substitute for" khi là danh từ chỉ vật thay thế. Chú ý động từ "substitute" lại đi với "with" ở một nghĩa khác — cùng từ, hai giới từ.', 0.2,
    undefined, 'd-v02'),
  C(49, 'Chọn câu gần nghĩa nhất: "Rarely have I seen such a well-organised event."',
    'A', 'Đảo ngữ với "Rarely" nhấn mạnh mức độ hiếm. Câu gần nghĩa phải giữ cả ý hiếm gặp lẫn ý khen, không chỉ giữ một trong hai.', 0.2,
    ['This is one of the best-organised events I have ever seen.',
     'I rarely go to events like this.',
     'The event was not well organised.',
     'I have never seen this event before.'], 'd-g08'),
  C(50, 'Điền: "Had it not been for the delay, we ___ the connecting flight."',
    'C', 'Điều kiện loại ba đảo ngữ. Vế chính giữ "would have + phân từ", và ở đây nghĩa phủ định của vế điều kiện làm vế chính thành khẳng định.', 0.2,
    ['would miss', 'will miss', 'would have caught', 'had caught'], 'd-g03'),
  C(51, 'Điền dạng đúng: "The instructions were deliberately ___ (LEAD)."',
    'misleading', 'Cần tính từ mang nghĩa gây hiểu sai. Tiền tố "mis-" cộng đuôi "-ing" — chú ý chủ động vì chính bản hướng dẫn GÂY RA sự hiểu sai.', 0.2,
    undefined, 'd-v03'),
  C(52, 'Chọn thành ngữ đúng: "After weeks of argument, they finally saw ___ ."',
    'B', '"See eye to eye" là nhất trí với nhau. Ba phương án kia đều là biến thể bịa của thành ngữ có thật — dạng bẫy quen thuộc của đề chuyên.', 0.2,
    ['face to face', 'eye to eye', 'hand in hand', 'side by side'], 'd-v09'),
];

const HN_DOC_BAI = `Urban rooftop farming has moved from novelty to necessity in several Asian cities. In Singapore, where less than one per cent of land is farmed, a government scheme now funds growers who convert car park roofs into vegetable plots. Supporters point to shorter supply chains: lettuce harvested at nine in the morning can reach a supermarket shelf by noon, cutting both transport emissions and spoilage.

Critics, however, question the arithmetic. Rooftop yields remain modest, and the structures often need reinforcing before soil can be added — an expense rarely counted in the enthusiastic press coverage. One study found that when construction costs were included, rooftop lettuce cost roughly twice as much per kilogram as imported lettuce.

Yet the case for rooftop farms may not rest on price at all. Their defenders increasingly argue that the real yield is educational: children who have watched a plant grow are measurably more willing to eat vegetables, and residents report a stronger sense of connection to their neighbourhood. Whether that justifies the subsidy is a question the cost calculations cannot settle.

═══ BÀI ĐỌC 2 — ĐIỀN TỪ VÀO CHỖ TRỐNG ═══

The idea that a person has one fixed learning style — visual, auditory, or kinaesthetic — is (1)___ popular among teachers and students alike. It feels intuitively right: some of us do seem to remember diagrams better than lectures. The trouble is that when researchers test the claim directly, it (2)___ apart.

The standard experiment is simple. Learners are sorted by their self-reported style, then taught the same material either in their preferred mode or in another one. If the theory held, matching should produce better results. Across dozens of such studies, (3)___ , it does not. Learners taught in their preferred mode remember no more than those taught in any other.

What survives the evidence is a weaker but more useful claim: the best mode depends on the (4)___ , not on the learner. Learning geography is helped by maps for everyone; learning pronunciation is helped by sound for everyone. Teachers who spend effort diagnosing individual styles are spending it on the wrong (5)___ .

None of this means preferences are (6)___ . People do enjoy some formats more than others, and enjoyment affects how long they stay with a task. But enjoying a format and learning better from it are two different things, and the research is only about the (7)___ . Confusing the two has kept a disproved idea alive for (8)___ thirty years.

═══ BÀI ĐỌC 3 ═══

When the Dutch city of Houten redesigned its road network in the 1970s, it did something that still strikes visitors as strange: it made driving deliberately inconvenient. The city was divided into districts, and while cyclists and pedestrians could pass directly between them, cars could not. A driver going from one district to the next had to return to a ring road on the edge of town and come back in.

The result is a place where the shortest route by bicycle is almost always shorter than the shortest route by car. Roughly half of all trips within Houten are made by bike, against a national average that is already high by world standards. Child cycling rates are higher still.

What is often missed in accounts of Houten is that nothing was banned. Car ownership there is close to the Dutch average, and residents drive freely on the ring road and out of town. The design changed the relative cost of two choices rather than removing one of them, and people responded to the new arithmetic.

That distinction matters when other cities try to copy the model. Bans provoke organised opposition; inconvenience rarely does. But inconvenience also works slowly, and it works only where the alternative is genuinely available. Houten was built with cycle paths from the start. A city that adds inconvenience without first adding the alternative has taken the cost and left the benefit behind.`;

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

  /* ---- Bài đọc 1: thêm một câu suy luận ---- */
  C(24, 'Theo bài, vì sao chi phí xây dựng ít khi được nhắc tới?',
    'C', 'Bài nói chi phí gia cố "rarely counted in the enthusiastic press coverage" — tức là bị bỏ qua trong cách đưa tin hào hứng, không phải vì nó nhỏ hay vì không đo được.', 0.25,
    ['Vì chi phí đó rất nhỏ', 'Vì chưa ai đo được nó',
     'Vì cách đưa tin hào hứng thường bỏ qua nó', 'Vì chính quyền trả khoản đó'], 'd-r08'),

  /* ---- Bài đọc 2: điền từ vào chỗ trống ---- */
  C(25, 'Chỗ trống (1): "The idea ... is ___ popular"',
    'B', 'Cần một trạng từ chỉ mức độ đứng trước tính từ. "Widely popular" là kết hợp tự nhiên; "largely" và "greatly" không đi với "popular" theo lối này.', 0.25,
    ['largely', 'widely', 'greatly', 'hardly'], 'd-r07'),
  C(26, 'Chỗ trống (2): "it ___ apart"',
    'A', 'Cụm động từ "fall apart" nghĩa là sụp đổ, không đứng vững. Chủ ngữ "it" chỉ lý thuyết, và thì hiện tại đơn khớp với "when researchers test".', 0.25,
    ['falls', 'breaks', 'takes', 'sets'], 'd-v08'),
  C(27, 'Chỗ trống (3): "Across dozens of such studies, ___ , it does not."',
    'D', 'Câu trước nêu điều lẽ ra phải xảy ra nếu lý thuyết đúng; câu này nói nó không xảy ra. Quan hệ là tương phản, nên cần một từ nối chỉ tương phản.', 0.25,
    ['therefore', 'in addition', 'for example', 'however'], 'd-r07'),
  C(28, 'Chỗ trống (4): "the best mode depends on the ___ , not on the learner"',
    'C', 'Hai ví dụ ngay sau đó — địa lý cần bản đồ, phát âm cần âm thanh — đều nói về NỘI DUNG được học, không về người học.', 0.25,
    ['teacher', 'classroom', 'material', 'timetable'], 'd-r07'),
  C(29, 'Chỗ trống (5): "spending it on the wrong ___"',
    'A', 'Vế trước nói giáo viên dồn công sức vào việc chẩn đoán phong cách cá nhân. Chỗ trống cần một danh từ chỉ ĐỐI TƯỢNG được dồn công sức vào.', 0.25,
    ['variable', 'answer', 'lesson', 'student'], 'd-r07'),
  C(30, 'Chỗ trống (6): "None of this means preferences are ___"',
    'B', 'Câu sau bắt đầu bằng "But", và nó khẳng định người ta CÓ thích format này hơn format kia. Nên chỗ trống phải là điều bị bác bỏ: sở thích không phải là không có thật.', 0.25,
    ['important', 'imaginary', 'measurable', 'harmful'], 'd-r07'),
  C(31, 'Chỗ trống (7): "the research is only about the ___"',
    'D', 'Câu ngay trước tách hai thứ: thích một format, và học tốt hơn từ nó. Nghiên cứu chỉ nói về vế thứ hai.', 0.25,
    ['former', 'preference', 'enjoyment', 'latter'], 'd-r07'),
  C(32, 'Chỗ trống (8): "has kept a disproved idea alive for ___ thirty years"',
    'C', 'Cần một cụm chỉ khoảng ước lượng đứng trước con số. "Close to" và "nearly" đều dùng được, nhưng chỉ một phương án có mặt trong danh sách.', 0.25,
    ['about of', 'along', 'nearly', 'almost of'], 'd-r07'),

  /* ---- Bài đọc 3 ---- */
  C(33, 'Theo bài, Houten đã làm gì với mạng lưới đường?',
    'B', 'Thành phố chia thành các khu; người đi bộ và xe đạp qua lại thẳng, còn ô tô phải vòng ra đường vành đai. Đó là làm cho việc lái xe BẤT TIỆN, không phải cấm.', 0.25,
    ['Cấm ô tô trong nội thành', 'Cố ý làm việc lái xe bất tiện hơn',
     'Xây thêm đường cho ô tô', 'Thu phí vào trung tâm'], 'd-r03'),
  C(34, 'Tỉ lệ chuyến đi bằng xe đạp trong Houten là bao nhiêu?',
    'A', 'Bài ghi "Roughly half of all trips within Houten". Chú ý phạm vi: chuyến đi TRONG thành phố, không phải mọi chuyến đi của cư dân.', 0.25,
    ['Khoảng một nửa', 'Khoảng một phần ba', 'Khoảng ba phần tư', 'Bài không nêu'], 'd-r03'),
  C(35, 'Điều gì "thường bị bỏ sót" trong các bài viết về Houten?',
    'C', 'Bài nói thẳng: "What is often missed... is that nothing was banned". Tỉ lệ sở hữu ô tô ở đó gần bằng mức trung bình của cả nước.', 0.25,
    ['Chi phí xây dựng rất lớn', 'Cư dân phản đối lúc đầu',
     'Không có lệnh cấm nào cả', 'Trẻ em ít đi xe đạp hơn người lớn'], 'd-r04'),
  C(36, 'Cụm "the new arithmetic" trong bài chỉ điều gì?',
    'B', 'Bài vừa nói thiết kế "changed the relative cost of two choices". Phép tính mới chính là tương quan chi phí giữa đi xe đạp và lái xe.', 0.25,
    ['Ngân sách xây dựng của thành phố', 'Tương quan chi phí giữa hai lựa chọn đi lại',
     'Số dân tăng thêm mỗi năm', 'Tỉ lệ sở hữu ô tô'], 'd-r06'),
  C(37, 'Vì sao tác giả nói lệnh cấm gây phản ứng còn sự bất tiện thì ít?',
    'D', 'Đây là nhận định về CÁCH người ta phản ứng: lệnh cấm cho một đối tượng rõ ràng để chống lại, còn sự bất tiện thì không tạo ra đối tượng đó.', 0.25,
    ['Vì lệnh cấm đắt hơn', 'Vì sự bất tiện có hiệu quả nhanh hơn',
     'Vì lệnh cấm không hợp pháp', 'Vì lệnh cấm tạo ra một đối tượng rõ ràng để phản đối'], 'd-r08'),
  C(38, 'Theo đoạn cuối, điều kiện để mô hình Houten hoạt động là gì?',
    'A', 'Câu chốt nói rõ: sự bất tiện chỉ có tác dụng khi lựa chọn thay thế thật sự sẵn có. Houten có đường xe đạp NGAY TỪ ĐẦU.', 0.25,
    ['Lựa chọn thay thế phải có sẵn trước',
     'Thành phố phải nhỏ', 'Phải có sự ủng hộ của đa số', 'Phải cấm ô tô một phần'], 'd-r03'),
  C(39, 'Câu cuối "has taken the cost and left the benefit behind" ngụ ý gì?',
    'C', 'Thành phố nào thêm bất tiện mà chưa có lựa chọn thay thế thì cư dân chịu đủ phần thiệt mà không nhận được phần lợi. Đây là cảnh báo, không phải mô tả Houten.', 0.25,
    ['Houten đã thất bại', 'Chi phí xây dựng vượt dự toán',
     'Sao chép nửa vời thì chỉ nhận phần thiệt', 'Lợi ích đến chậm hơn dự kiến'], 'd-r06'),
  C(40, 'Ba bài đọc trong phần này có chung đặc điểm nào về lập luận?',
    'B', 'Cả ba đều nêu một quan niệm hoặc một mô hình phổ biến rồi chỉ ra chỗ nó không đứng vững, hoặc chỗ nó bị hiểu sai. Nhận ra khuôn này giúp đoán trước chỗ có ý chính.', 0.25,
    ['Đều dựa trên số liệu thống kê chính thức',
     'Đều nêu một cách hiểu phổ biến rồi chỉ ra chỗ nó thiếu',
     'Đều kết luận rõ ràng ủng hộ một bên',
     'Đều kể lại một câu chuyện có thật'], 'd-r08'),
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

  /* ---- Nối dài cho đủ mười hai câu Viết của đề chuyên ---- */

  C(41, 'Viết lại: "Nobody has cleaned this room for weeks." (BEEN)',
    'This room has not been cleaned for weeks.',
    'Bị động hiện tại hoàn thành, và chủ ngữ phủ định "nobody" chuyển thành phủ định của động từ. Giữ nguyên "for weeks" vì mốc thời gian không đổi.', 0.5,
    undefined, 'd-w02'),
  C(42, 'Viết lại: "It is a pity that we did not book earlier." (WISH)',
    'I wish we had booked earlier.',
    '"It is a pity that + quá khứ" đổi sang ước tiếc ở quá khứ, tức "wish + quá khứ hoàn thành". Chủ ngữ đổi sang ngôi thứ nhất vì người ước là người nói.', 0.5,
    undefined, 'd-w02'),
  C(43, 'Nối hai câu: "The bridge was built in 1890. It is still in daily use." (WHICH)',
    'The bridge, which was built in 1890, is still in daily use.',
    'Mệnh đề quan hệ KHÔNG xác định vì cây cầu đã xác định rồi — nên bắt buộc có hai dấu phẩy, và không thay "which" bằng "that" được.', 0.5,
    undefined, 'd-w03'),
  C(44, 'Viết lại: "He started learning the piano ten years ago." (HAS)',
    'He has been learning the piano for ten years.',
    'Đổi từ mốc bắt đầu sang khoảng thời gian kéo dài: "ago" thành "for", quá khứ đơn thành hiện tại hoàn thành tiếp diễn.', 0.5,
    undefined, 'd-w02'),
  C(45, 'Viết lại: "She was so tired that she could not concentrate." (TOO)',
    'She was too tired to concentrate.',
    'Cấu trúc "so... that... not" đổi sang "too... to...". Chú ý bỏ hẳn phủ định vì "too" đã mang nghĩa phủ định, và bỏ luôn chủ ngữ của mệnh đề sau.', 0.5,
    undefined, 'd-w02'),
  C(46, 'Sửa lỗi và viết lại cho đúng: "Being tired, the lesson seemed endless to me."',
    'Being tired, I found the lesson endless.',
    'Bổ ngữ treo: chủ ngữ ngay sau dấu phẩy phải là người MỆT, mà "the lesson" thì không mệt được. Sửa bằng cách đổi chủ ngữ của mệnh đề chính.', 0.5,
    undefined, 'd-w04'),
  C(47, 'Viết một đoạn khoảng 100 từ mô tả xu hướng trong biểu đồ: số học sinh đi xe đạp tới trường tại một quận tăng từ 12% năm 2015 lên 41% năm 2024, tăng chậm tới 2019 rồi tăng nhanh sau đó.',
    'Xem barem phần VIẾT — chấm theo bốn tiêu chí, không có một đáp án đúng duy nhất.',
    'Bài đạt điểm cao có: một câu mở nêu đối tượng và khoảng thời gian, một nhận định về xu hướng CHUNG trước khi vào chi tiết, chỉ ra chỗ đổi nhịp năm 2019, và ba tới bốn con số đỡ cho nhận định. Lỗi mất điểm nặng nhất: đọc lần lượt mọi con số mà không rút ra nhận định nào.', 1.5,
    undefined, 'd-w07'),
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

  /* ---- Câu 13–40: nối dài cho đủ 40 câu như đề thật ---- */

  C(13, 'Chọn từ có phần gạch chân phát âm khác: chaired, watched, stopped, laughed.',
    'A', 'Đuôi "-ed" đọc /d/ sau âm hữu thanh (chaired), /t/ sau âm vô thanh (watched, stopped, laughed). Quy tắc theo âm cuối của gốc, không theo chữ viết.', 0.25,
    ['chaired', 'watched', 'stopped', 'laughed'], 'd-p05'),
  C(14, 'Bạn thấy biển ở cửa hàng: "CLEARANCE — UP TO 70% OFF". Biển này nghĩa là gì?',
    'C', '"Clearance" là xả hàng, và "up to" nghĩa là TỐI ĐA — không phải mọi món đều giảm 70%. Đây là chỗ đề gài người đọc lướt.', 0.25,
    ['Mọi món giảm đúng 70%', 'Cửa hàng sắp đóng cửa vĩnh viễn',
     'Xả hàng, giảm giá tối đa 70%', 'Mua bảy tặng ba'], 'd-r02'),
  C(15, 'A: "Do you fancy going out tonight?" B: "___"',
    'A', '"Do you fancy + V-ing" là lời rủ thân mật. Đáp lại tự nhiên là nhận lời kèm một chi tiết, không phải trả lời máy móc "Yes, I do."', 0.25,
    ['I would love to, but I have an exam tomorrow.', 'Yes, I fancy.',
     'No, I do not fancy.', 'That is a good idea for you.'], 'd-v05'),
  C(16, 'Điền: "If I ___ you, I would take the earlier train."',
    'B', 'Câu điều kiện loại hai dùng "were" cho mọi ngôi trong văn viết chuẩn. "If I was" nghe được trong khẩu ngữ nhưng đề tuyển sinh chấm theo chuẩn viết.', 0.25,
    ['am', 'were', 'will be', 'would be'], 'd-g03'),
  C(17, 'Chọn câu gần nghĩa nhất: "It took her three hours to finish the report."',
    'D', '"It took somebody + thời gian + to V" đổi sang "somebody spent + thời gian + V-ing". Chú ý chủ ngữ đổi chỗ và động từ đổi dạng.', 0.25,
    ['She finished the report in three hours ago.',
     'She has finished the report for three hours.',
     'Three hours were taken her to finish the report.',
     'She spent three hours finishing the report.'], 'd-g08'),
  C(18, 'Tìm lỗi: "Despite of the rain, the match went ahead."',
    'Despite of → Despite', '"Despite" đi thẳng với danh từ, không có "of". Cụm có "of" là "in spite of". Trộn hai cụm là lỗi lặp lại nhiều nhất trong đề chung.', 0.25,
    undefined, 'd-g10'),
  C(19, 'Chọn từ trái nghĩa với "temporary" trong: "This is only a temporary solution."',
    'C', '"Temporary" là tạm thời, trái nghĩa là "permanent" — lâu dài. "Immediate" là ngay lập tức, thuộc trục thời gian khác hẳn.', 0.25,
    ['immediate', 'sudden', 'permanent', 'brief'], 'd-v06'),
  C(20, 'Điền: "The book ___ I borrowed from the library is overdue."',
    'A', 'Mệnh đề quan hệ xác định cho vật: dùng "which" hoặc "that", và cả hai đều lược bỏ được vì nó là tân ngữ. "Who" chỉ dùng cho người.', 0.25,
    ['which', 'who', 'whose', 'where'], 'd-g06'),
  C(21, 'Sắp xếp thành đoạn hợp lý: (1) As a result, the road was closed for two days. (2) Heavy rain fell across the province last week. (3) A section of the hillside collapsed onto the highway.',
    '2 - 3 - 1', 'Chuỗi nhân quả: mưa lớn (2) → sạt lở (3) → đóng đường (1). Cụm "As a result" luôn đứng ở mắt xích CUỐI của chuỗi, không đứng đầu.', 0.25,
    undefined, 'd-w06'),
  C(22, 'Chọn câu chủ đề cho đoạn: "___ In Hanoi, several schools now start at eight instead of seven. Parents report that mornings are calmer, and teachers say the first lesson runs more smoothly."',
    'B', 'Hai ví dụ đều nói về hệ quả TÍCH CỰC của việc lùi giờ vào học. Câu chủ đề phải bao cả hai, và phải nêu được chiều tích cực đó.', 0.25,
    ['School timetables in Vietnam vary widely.',
     'Starting the school day later brings noticeable benefits.',
     'Parents often complain about early school hours.',
     'Teachers prefer to work in the afternoon.'], 'd-r05'),
  C(23, 'Điền: "She is used to ___ up early since she moved to the farm."',
    'C', '"Be used to + V-ing" nghĩa là đã quen với. Phân biệt với "used to + V nguyên thể" nghĩa là trước kia thường — hai cấu trúc gần giống mà nghĩa khác hẳn.', 0.25,
    ['get', 'got', 'getting', 'have got'], 'd-g05'),
  C(24, 'A: "Sorry, I broke your mug." B: "___"',
    'D', 'Lời đáp tự nhiên khi ai đó xin lỗi vì việc nhỏ là gạt đi nhẹ nhàng. "Never mind" làm đúng việc đó; "Not at all" dùng để đáp lời cảm ơn.', 0.25,
    ['You are welcome.', 'Not at all.', 'I am sorry too.', 'Never mind, it was old anyway.'], 'd-v05'),
  C(25, 'Chọn từ có trọng âm khác: develop, remember, integrate, consider.',
    'C', '"INtegrate" nhấn âm một; ba từ kia đều nhấn âm hai. Động từ ba âm tiết kết thúc bằng "-ate" thường nhấn âm một, và đó là quy tắc giải được câu này.', 0.25,
    ['develop', 'remember', 'integrate', 'consider'], 'd-p03'),
  C(26, 'Điền: "Hardly ___ the station when the train pulled in."',
    'A', 'Trạng từ phủ định "Hardly" đứng đầu câu thì phải ĐẢO NGỮ: trợ động từ lên trước chủ ngữ. Cấu trúc đi kèm là "Hardly had... when...".', 0.25,
    ['had we reached', 'we had reached', 'did we reach', 'we reached'], 'd-g07'),
  C(27, 'Bạn thấy biển ở bến xe: "TICKETS MUST BE VALIDATED BEFORE BOARDING". Biển này nghĩa là gì?',
    'B', '"Validate" ở đây là đóng dấu hoặc quẹt xác nhận vé, không phải mua vé. Người có vé rồi vẫn phải làm bước này.', 0.25,
    ['Phải mua vé trước khi lên xe', 'Phải xác nhận vé trước khi lên xe',
     'Vé chỉ có giá trị trong ngày', 'Không được lên xe nếu chưa đặt chỗ'], 'd-r02'),
  C(28, 'Chọn câu gần nghĩa nhất: "He did not arrive until the meeting had ended."',
    'C', '"Not... until" nhấn rằng việc xảy ra MUỘN hơn mong đợi. Câu gần nghĩa phải giữ được quan hệ thời gian đó, không chỉ giữ hai sự việc.', 0.25,
    ['He arrived before the meeting ended.',
     'He arrived while the meeting was going on.',
     'He arrived only after the meeting had ended.',
     'He did not attend the meeting at all.'], 'd-g08'),
  C(29, 'Điền: "The more you practise, ___ you become."',
    'A', 'Cấu trúc so sánh kép: "The + so sánh hơn..., the + so sánh hơn...". Vế hai phải giữ đúng dạng so sánh hơn và đúng trật tự chủ ngữ động từ.', 0.25,
    ['the more confident', 'the most confident', 'more confident', 'the confident more'], 'd-g04'),
  C(30, 'Tìm lỗi: "Each of the students were given a certificate."',
    'were → was', '"Each of + danh từ số nhiều" vẫn là chủ ngữ SỐ ÍT. Danh từ số nhiều đứng gần động từ là chỗ đề gài, và nó không phải chủ ngữ.', 0.25,
    undefined, 'd-g10'),
  C(31, 'Điền câu vào chỗ trống: "Learning a language as an adult has one clear advantage. ___ Children may absorb sounds more easily, but they cannot plan their own study."',
    'D', 'Câu điền phải nêu ĐÚNG lợi thế của người lớn, và câu sau đã chỉ ra lợi thế đó là khả năng tự lập kế hoạch. Ba đáp án kia nói về trẻ em hoặc về khó khăn.', 0.25,
    ['Adults often feel embarrassed when they make mistakes.',
     'Most adults have less free time than children.',
     'Pronunciation is harder to change after adolescence.',
     'Adults can decide what to study and why.'], 'd-r07'),
  C(32, 'Chọn từ đồng nghĩa với "reluctant" trong: "She was reluctant to speak in front of the class."',
    'B', '"Reluctant" là miễn cưỡng, không muốn. "Unwilling" khớp đúng mức độ đó. "Unable" là không có khả năng — nguyên nhân khác hẳn.', 0.25,
    ['unable', 'unwilling', 'unprepared', 'unaware'], 'd-v06'),
  C(33, 'Điền: "This building ___ since 1990 and is still in use."',
    'C', '"Since 1990" kèm "still in use" đòi hiện tại hoàn thành ở thể bị động: việc bắt đầu trong quá khứ và còn liên quan tới hiện tại.', 0.25,
    ['was used', 'is used', 'has been used', 'had been used'], 'd-g02'),
  C(34, 'A: "How was the exam?" B: "___"',
    'A', 'Câu hỏi mở đòi một câu trả lời có nội dung. Ba đáp án kia đều là câu đúng ngữ pháp nhưng không trả lời được câu hỏi được hỏi.', 0.25,
    ['Not as bad as I expected, though I ran out of time.', 'It is at nine on Monday.',
     'Yes, I did.', 'I will take it next week.'], 'd-v05'),
  C(35, 'Chọn từ có phần gạch chân phát âm khác: cheap, chemist, cheese, chair.',
    'B', '"Chemist" đọc /k/ vì gốc Hy Lạp; ba từ kia đọc /tʃ/. Nhóm từ gốc Hy Lạp có "ch" đọc /k/ gồm cả chemistry, character, architect.', 0.25,
    ['cheap', 'chemist', 'cheese', 'chair'], 'd-p02'),
  C(36, 'Điền: "___ hard she tried, she could not open the jar."',
    'D', 'Cấu trúc nhượng bộ "However + tính từ hoặc trạng từ + chủ ngữ + động từ". "Although" đi với cả mệnh đề chứ không chen tính từ vào giữa.', 0.25,
    ['Although', 'Despite', 'Even', 'However'], 'd-g07'),
  C(37, 'Sắp xếp thành đoạn hợp lý: (1) The council then installed lights along the path. (2) Residents complained that the shortcut was unsafe after dark. (3) Since then, evening use has doubled.',
    '2 - 1 - 3', 'Khiếu nại (2) → hành động khắc phục (1) → kết quả (3). Cụm "then" và "since then" đánh dấu thứ tự, và chúng không bao giờ mở đầu chuỗi.', 0.25,
    undefined, 'd-w06'),
  C(38, 'Chọn câu gần nghĩa nhất: "You should have told me earlier."',
    'B', '"Should have + phân từ" là trách móc về việc đã KHÔNG xảy ra. Câu gần nghĩa phải giữ được cả hai: việc đã không làm, và ý chê trách.', 0.25,
    ['You told me earlier, which was right.',
     'You did not tell me earlier, and that was a mistake.',
     'You must tell me earlier next time.',
     'You may have told me earlier.'], 'd-g08'),
  C(39, 'Điền: "She suggested ___ the meeting until Friday."',
    'A', '"Suggest" theo sau bằng V-ing hoặc mệnh đề "that + should", KHÔNG theo sau bằng "to V". Đây là lỗi người Việt mắc nhiều nhất với động từ này.', 0.25,
    ['postponing', 'to postpone', 'postpone', 'postponed'], 'd-g05'),
  C(40, 'Bạn thấy thông báo trong thư viện: "SILENT STUDY AREA — GROUP WORK ON LEVEL 2". Bạn cần thảo luận nhóm thì nên làm gì?',
    'C', 'Thông báo vừa cấm vừa chỉ chỗ thay thế. Đọc trọn cả hai vế mới ra đáp án; dừng ở vế đầu thì chỉ biết là bị cấm.', 0.25,
    ['Thảo luận khẽ tại chỗ', 'Xin phép thủ thư rồi thảo luận',
     'Lên tầng hai để thảo luận', 'Ra khỏi thư viện'], 'd-r02'),
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

  /* ---- Nối dài thành một đề đủ độ dài để luyện đúng nhịp 90 phút ---- */

  C(9, 'Chọn phương án đúng: "Only when the results came in ___ how large the effect was."',
    'B', '"Only when + mệnh đề" ở đầu câu đòi đảo ngữ ở mệnh đề CHÍNH, không đảo ở mệnh đề "when". Đây là chỗ vòng 2 gài nhiều nhất.', 0.25,
    ['we realised', 'did we realise', 'we did realise', 'had we realised'], 'd-g07'),
  C(10, 'Viết lại: "I regret not applying for that scholarship." (WISH)',
    'I wish I had applied for that scholarship.',
    'Tiếc về việc ĐÃ KHÔNG làm trong quá khứ: "wish + quá khứ hoàn thành", và phủ định chuyển thành khẳng định khi đổi từ "regret not" sang "wish had".', 0.5,
    undefined, 'd-w02'),
  C(11, 'Tìm và sửa lỗi: "The number of applications have risen by a third."',
    'have → has', '"The number of" là chủ ngữ số ít; "A number of" mới là số nhiều. Hai cụm chỉ khác mạo từ mà chia động từ ngược nhau.', 0.25,
    undefined, 'd-g10'),
  C(12, 'Chọn từ điền: "The two accounts are mutually ___ — they cannot both be true."',
    'C', 'Vế sau giải nghĩa luôn: không thể cùng đúng. "Exclusive" trong cụm "mutually exclusive" mang đúng nghĩa đó. Ba từ kia không tạo thành cụm với "mutually".', 0.25,
    ['dependent', 'beneficial', 'exclusive', 'intelligible'], 'd-v09'),
  C(13, 'Chọn phương án đúng: "___ more carefully, the experiment might have succeeded."',
    'A', 'Phân từ hoàn thành bị động rút gọn từ mệnh đề điều kiện loại ba. Chủ ngữ ngầm phải là "the experiment" — thứ ĐƯỢC tiến hành, nên dùng dạng bị động.', 0.25,
    ['Had it been conducted', 'Having conducted', 'If conducting', 'Conducting it'], 'd-g03'),
  C(14, 'Viết lại: "They will not finish the building until next March." (BE COMPLETED)',
    'The building will not be completed until next March.',
    'Bị động tương lai, giữ nguyên "not... until". Chú ý đổi chủ ngữ và giữ mốc thời gian nguyên vẹn — vòng 2 trừ điểm nặng ở chỗ mốc.', 0.5,
    undefined, 'd-w02'),
  C(15, 'Chọn phương án đúng: "Such ___ that the hall was full an hour early."',
    'B', 'Cấu trúc "Such + be + danh từ + that...". Trật tự đảo đưa "was" lên trước danh từ, và danh từ ở đây là "the demand".', 0.25,
    ['the demand was', 'was the demand', 'demand was there', 'there was demand'], 'd-g07'),
  C(16, 'Tìm và sửa lỗi: "She is one of the few people who has read the whole report."',
    'has → have', 'Mệnh đề quan hệ bổ nghĩa cho "the few people" số nhiều. Từ "one" ở xa và không phải chủ ngữ của "who".', 0.25,
    undefined, 'd-g10'),
  C(17, 'Chọn từ điền: "His argument was ___ ; every step followed from the last."',
    'D', 'Vế sau mô tả một lập luận chặt chẽ từng bước. "Cogent" nghĩa là chặt chẽ và thuyết phục — đúng nghĩa đó. Ba từ kia mang sắc thái khác hẳn.', 0.25,
    ['tenuous', 'ambiguous', 'redundant', 'cogent'], 'd-v06'),
  C(18, 'Viết lại: "It was a mistake to tell her." (SHOULD)',
    'I should not have told her.',
    '"It was a mistake to V" đổi sang "should not have + phân từ" — trách móc về việc ĐÃ làm. Chú ý phủ định xuất hiện ở dạng mới dù câu gốc không có "not".', 0.5,
    undefined, 'd-w02'),
  C(19, 'Chọn phương án đúng: "No sooner ___ the announcement than the phones started ringing."',
    'C', 'Cặp "No sooner... than..." với đảo ngữ quá khứ hoàn thành. Trợ động từ "had" lên trước chủ ngữ, và động từ chính ở dạng phân từ.', 0.25,
    ['they made', 'did they make', 'had they made', 'they had made'], 'd-g07'),
  C(20, 'Điền dạng đúng: "The results were largely ___ (CONCLUDE)."',
    'inconclusive', 'Ngữ cảnh "largely" cộng với việc kết quả không dứt khoát đòi tiền tố phủ định. Chú ý "inconclusive" chứ không phải "unconclusive".', 0.25,
    undefined, 'd-v03'),
  C(21, 'Chọn câu có nghĩa gần nhất: "She need not have brought her passport."',
    'A', '"Need not have + phân từ" nghĩa là đã làm nhưng KHÔNG cần thiết. Phân biệt với "did not need to" — vốn thường hàm ý không làm.', 0.25,
    ['She brought it, but it was unnecessary.',
     'She did not bring it because it was unnecessary.',
     'She was not allowed to bring it.',
     'She must bring it next time.'], 'd-g08'),
  C(22, 'Tìm và sửa lỗi: "Hardly had we sat down than the lights went out."',
    'than → when', '"Hardly... when..." và "No sooner... than..." là hai cặp riêng biệt. Trộn chúng là lỗi vòng 2 gài đi gài lại.', 0.25,
    undefined, 'd-g10'),
  C(23, 'Chọn từ điền: "The two versions differ only in ___ respects."',
    'B', '"Trivial respects" nghĩa là những điểm không đáng kể — khớp với chữ "only". Ba từ kia làm câu tự mâu thuẫn với "only".', 0.25,
    ['substantial', 'trivial', 'fundamental', 'decisive'], 'd-v06'),
  C(24, 'Viết lại: "Although he was warned, he went ahead." (DESPITE)',
    'Despite having been warned, he went ahead.',
    '"Despite" đi với V-ing hoặc danh từ. Vì chủ ngữ là người ĐƯỢC cảnh báo nên phải dùng dạng bị động hoàn thành, không phải "despite warning".', 0.5,
    undefined, 'd-w02'),
  C(25, 'Chọn phương án đúng: "Were the funding ___ , the project would restart immediately."',
    'A', 'Điều kiện loại hai đảo ngữ: "Were + chủ ngữ + ...". Vì kinh phí là thứ ĐƯỢC khôi phục nên cần dạng bị động, và "were" đã đóng vai trợ động từ.', 0.25,
    ['restored', 'to restore', 'restoring', 'restore'], 'd-g03'),
  C(26, 'Tìm và sửa lỗi: "The committee were unanimous in its decision."',
    'its → their', 'Đã dùng "were" tức coi uỷ ban là tập hợp nhiều người, thì đại từ sở hữu phải là "their". Trộn hai cách nhìn trong một câu là lỗi nhất quán.', 0.25,
    undefined, 'd-g10'),
  C(27, 'Chọn câu có nghĩa gần nhất: "There is little point in arguing with him."',
    'C', '"There is little point in V-ing" nghĩa là gần như vô ích. "Little" là phủ định, khác hẳn "a little" vốn mang nghĩa khẳng định.', 0.25,
    ['You should argue with him.', 'He argues very little.',
     'Arguing with him is almost pointless.', 'He has a point in the argument.'], 'd-g08'),
  C(28, 'Điền dạng đúng: "The proposal met with widespread ___ (APPROVE)."',
    'approval', 'Sau tính từ "widespread" cần DANH TỪ. Chú ý dạng danh từ bỏ chữ "e" cuối của động từ trước khi thêm "-al".', 0.25,
    undefined, 'd-v03'),
  C(29, 'Chọn phương án đúng: "It is high time we ___ this problem seriously."',
    'B', '"It is high time + chủ ngữ + quá khứ đơn" — dạng giả định chỉ việc lẽ ra phải làm rồi. Dùng hiện tại hoặc "to V" đều sai cấu trúc.', 0.25,
    ['take', 'took', 'to take', 'taking'], 'd-g03'),
  C(30, 'Viết lại: "Nobody expected the result." (UNEXPECTED)',
    'The result was completely unexpected.',
    'Đổi từ chủ động có chủ ngữ phủ định sang câu khẳng định dùng tính từ phủ định. Bị động thuần "was not expected by anybody" đúng ngữ pháp nhưng gượng, và vòng 2 chấm cả độ tự nhiên.', 0.5,
    undefined, 'd-w02'),
  C(31, 'Chọn từ điền: "The distinction between the two terms is ___ but important."',
    'A', 'Cặp đối lập "___ but important" đòi một từ mang nghĩa nhỏ hoặc khó thấy. "Subtle" khớp đúng; ba từ kia không tạo được tương phản với "important".', 0.25,
    ['subtle', 'obvious', 'enormous', 'urgent'], 'd-v06'),
  C(32, 'Tìm và sửa lỗi: "Not only she spoke three languages but she also played the violin."',
    'she spoke → did she speak', '"Not only" đầu câu đòi đảo ngữ ở vế đầu. Vế sau có "but she also" nên giữ trật tự thường — chỉ vế đầu đảo.', 0.25,
    undefined, 'd-g10'),
  C(33, 'Chọn phương án đúng: "___ for the delay, the flight would have landed on time."',
    'D', '"But for + danh từ" nghĩa là "nếu không có". Nó thay cho cả mệnh đề điều kiện, nên theo sau là danh từ chứ không phải mệnh đề.', 0.25,
    ['If it was not', 'Had it not', 'Were it not', 'But'], 'd-g03'),
  C(34, 'Viết lại: "He last saw her in 2019." (SINCE)',
    'He has not seen her since 2019.',
    '"Last + quá khứ đơn" đổi sang hiện tại hoàn thành PHỦ ĐỊNH với "since". Đây là phép biến đổi vòng 2 ra gần như mỗi năm.', 0.5,
    undefined, 'd-w02'),
  C(35, 'Điền dạng đúng: "The findings were ___ (CONSIST) with earlier work."',
    'consistent', 'Cần TÍNH TỪ sau "were", và cụm cố định là "consistent with". Chú ý phân biệt với danh từ "consistency".', 0.25,
    undefined, 'd-v03'),
  C(36, 'Chọn câu có nghĩa gần nhất: "I would sooner walk than take that bus."',
    'B', '"Would sooner A than B" nghĩa là thích A hơn B — cùng nghĩa với "would rather". Nó không nói về tốc độ dù có chữ "sooner".', 0.25,
    ['Walking is faster than that bus.',
     'I prefer walking to taking that bus.',
     'I will walk before the bus arrives.',
     'That bus is sooner than walking.'], 'd-g08'),
  C(37, 'Tìm và sửa lỗi: "The more he explained, the less I understood him clearly."',
    'bỏ "clearly"', 'Cấu trúc so sánh kép đã chứa trạng từ so sánh ở vế hai. Thêm "clearly" vào cuối là thừa và làm hỏng cân đối của cặp.', 0.25,
    undefined, 'd-g10'),
  C(38, 'Chọn từ điền: "Her explanation was ___ ; nobody could follow it."',
    'C', 'Vế sau nói không ai theo được, nên cần một từ mang nghĩa khó hiểu. "Convoluted" là rối rắm. "Concise" và "lucid" đều mang nghĩa ngược lại.', 0.25,
    ['concise', 'lucid', 'convoluted', 'candid'], 'd-v06'),
  C(39, 'Chọn phương án đúng: "Scarcely ___ when the alarm sounded."',
    'A', '"Scarcely... when..." cùng nhóm với "Hardly... when...", đòi đảo ngữ quá khứ hoàn thành. Cặp đi với "than" là "No sooner", không phải cặp này.', 0.25,
    ['had they arrived', 'they had arrived', 'did they arrive', 'they arrived'], 'd-g07'),
  C(40, 'Viết lại: "The only reason I stayed was that I had promised." (HAD IT NOT)',
    'Had it not been for my promise, I would not have stayed.',
    'Điều kiện loại ba đảo ngữ, và lý do duy nhất chuyển thành điều kiện cần. Chú ý vế chính phải ở dạng PHỦ ĐỊNH vì bỏ điều kiện đi thì kết quả ngược lại.', 0.5,
    undefined, 'd-w02'),
];

/* ======================================================================== *
 * ĐỀ 4 — TỐT NGHIỆP THPT, BA PHẦN
 * ======================================================================== */

const TN_NGU_AM: CauDeThi[] = [
  C(1, 'Chọn từ có phần gạch chân phát âm khác: needed, wanted, decided, played.',
    'D', '"played" đọc /d/ vì gốc kết thúc bằng âm hữu thanh; ba từ kia đọc /ɪd/ vì gốc kết thúc bằng /t/ hoặc /d/.', 0.25,
    ['needed', 'wanted', 'decided', 'played'], 'd-p07'),
  C(2, 'Chọn từ có trọng âm khác: develop, determine, demonstrate, deliver.',
    'C', '"DEmonstrate" nhấn âm một — động từ ba âm tiết đuôi "-ate" thường nhấn âm đầu. Ba từ kia nhấn âm hai.', 0.25,
    ['develop', 'determine', 'demonstrate', 'deliver'], 'd-p03'),
  C(3, 'Chọn từ có phần gạch chân phát âm khác: books, maps, dogs, cakes.',
    'C', '"dogs" đọc /z/ vì /g/ là âm hữu thanh; ba từ kia đọc /s/ sau âm vô thanh. Quy tắc đuôi "-s" song song hoàn toàn với quy tắc đuôi "-ed".', 0.25,
    ['books', 'maps', 'dogs', 'cakes'], 'd-p07'),
  C(4, 'Chọn từ có phần gạch chân phát âm khác: thank, there, think, thirsty.',
    'B', '"there" đọc /ð/ hữu thanh; ba từ kia đọc /θ/ vô thanh. Từ chức năng như there, this, that, they gần như luôn lấy /ð/.', 0.25,
    ['thank', 'there', 'think', 'thirsty'], 'd-p02'),
  C(5, 'Chọn từ có trọng âm khác: photograph, photographer, photographic, photogenic.',
    'A', '"PHOtograph" nhấn âm một; ba từ kia dịch trọng âm theo hậu tố. Cùng một gốc mà trọng âm chạy — đây là chỗ đề thích hỏi nhất.', 0.25,
    ['photograph', 'photographer', 'photographic', 'photogenic'], 'd-p03'),
  C(6, 'Chọn từ có trọng âm khác: comfortable, technology, environment, community.',
    'A', '"COMfortable" nhấn âm một; ba từ kia nhấn âm hai. Từ bốn âm tiết không có quy tắc chung, nên phải nhớ theo nhóm — và nhóm "-able" thường nhấn gốc.', 0.25,
    ['comfortable', 'technology', 'environment', 'community'], 'd-p03'),
];

const TN_TU_NGU: CauDeThi[] = [
  C(7, 'If I ___ you, I would take the job.',
    'B', 'Điều kiện loại 2 với "I": dùng "were" trong văn chuẩn. "was" gặp trong nói thường nhưng không phải đáp án của đề.', 0.25,
    ['am', 'were', 'will be', 'had been'], 'd-g03'),
  C(8, 'The house ___ we used to live has been demolished.',
    'C', 'Sau danh từ chỉ NƠI CHỐN và trước một mệnh đề đủ thành phần thì dùng "where". Dùng "which" thì phải có giới từ đi kèm ("in which").', 0.25,
    ['which', 'that', 'where', 'when'], 'd-g02'),
  C(9, 'She denied ___ the money.',
    'A', '"deny" đi với danh động từ. Bốn phương án đều là dạng của "take", nên đề đang hỏi DẠNG chứ không hỏi nghĩa.', 0.25,
    ['taking', 'to take', 'take', 'taken'], 'd-g06'),
  C(10, 'Điền giới từ: "She is responsible ___ the whole department."',
    'for', '"responsible for" là cặp cố định. "responsible to" tồn tại nhưng nghĩa là chịu trách nhiệm TRƯỚC ai đó, không phải phụ trách cái gì.', 0.25,
    undefined, 'd-v02'),
  C(11, 'Điền dạng đúng: "The film was ___ (DISAPPOINT) — we left halfway through."',
    'disappointing', 'Chủ ngữ là "the film" — vật gây ra cảm giác, nên dùng đuôi "-ing". "disappointed" dành cho người CẢM THẤY. Đây là cặp sai nhiều nhất của cả phần.', 0.25,
    undefined, 'd-v03'),

  /* ---- Câu 12–28: nối dài cho đủ khối Từ vựng – Ngữ pháp của đề thật ---- */

  C(12, 'By this time next year, she ___ her degree.',
    'C', '"By + mốc tương lai" đòi tương lai hoàn thành: việc HOÀN TẤT trước mốc đó. Tương lai đơn chỉ nói việc xảy ra, không nói xong trước mốc.', 0.25,
    ['will finish', 'finishes', 'will have finished', 'is finishing'], 'd-g01'),
  C(13, 'Neither the manager nor the staff ___ aware of the change.',
    'B', '"Neither... nor..." chia động từ theo chủ ngữ GẦN NHẤT. "The staff" hiểu là tập thể nhiều người nên dùng "were".', 0.25,
    ['was', 'were', 'is', 'has been'], 'd-g10'),
  C(14, 'Chọn câu gần nghĩa nhất: "It is essential that every student attend the briefing."',
    'A', 'Sau "It is essential that" dùng thức giả định: động từ ở dạng nguyên thể không "to", không chia. Câu gần nghĩa phải giữ tính bắt buộc đó.', 0.25,
    ['Every student must attend the briefing.',
     'Every student attends the briefing.',
     'Every student may attend the briefing.',
     'Every student attended the briefing.'], 'd-g08'),
  C(15, 'Điền: "___ finishing the report, she went straight to bed."',
    'D', '"On/After + V-ing" chỉ việc xảy ra ngay sau. "Since" đòi mốc thời gian; "During" đòi danh từ; "While" đòi hành động cùng lúc.', 0.25,
    ['Since', 'During', 'While', 'After'], 'd-g05'),
  C(16, 'Điền giới từ: "The result depends ___ how many people take part."',
    'on', '"Depend on" là cặp cố định. Người Việt hay viết "depend in" hoặc "depend of" do suy từ tiếng Việt hoặc từ tiếng Pháp.', 0.25,
    undefined, 'd-v02'),
  C(17, 'Điền dạng đúng: "His ___ (EXPLAIN) did not convince anyone."',
    'explanation', 'Sau tính từ sở hữu "his" cần một DANH TỪ. Chú ý dạng danh từ của "explain" đổi cả nguyên âm gốc, không chỉ thêm đuôi.', 0.25,
    undefined, 'd-v03'),
  C(18, 'Chọn từ đồng nghĩa với "crucial" trong: "Timing is crucial in this experiment."',
    'B', '"Crucial" là mang tính quyết định — mạnh hơn "useful" và "helpful". Đề hỏi đúng chỗ chênh lệch mức độ giữa các từ gần nghĩa.', 0.25,
    ['useful', 'vital', 'helpful', 'possible'], 'd-v06'),
  C(19, 'Tìm lỗi: "She is one of the students who has won a scholarship."',
    'has → have', 'Mệnh đề quan hệ bổ nghĩa cho "the students" số nhiều, không cho "one". Đây là bẫy kinh điển: danh từ gần "who" mới là chủ ngữ thật.', 0.25,
    undefined, 'd-g10'),
  C(20, 'Điền: "I would rather you ___ that to anyone."',
    'A', '"Would rather + chủ ngữ + quá khứ đơn" diễn tả mong muốn ở hiện tại. Dạng quá khứ ở đây KHÔNG chỉ thời gian quá khứ.', 0.25,
    ['did not mention', 'do not mention', 'will not mention', 'not mention'], 'd-g03'),
  C(21, 'Điền: "The more carefully you plan, ___ problems you will face."',
    'C', 'So sánh kép với danh từ đếm được số nhiều: "the fewer + danh từ". "Less" dành cho danh từ không đếm được.', 0.25,
    ['the less', 'the least', 'the fewer', 'the fewest'], 'd-g04'),
  C(22, 'Chọn câu gần nghĩa nhất: "He cannot have left already — his coat is still here."',
    'D', '"Cannot have + phân từ" là suy đoán PHỦ ĐỊNH về quá khứ với mức chắc chắn cao. Nó khác hẳn "must not have" và khác hẳn khả năng.', 0.25,
    ['He was not allowed to leave.', 'He might not have left.',
     'He did not want to leave.', 'I am sure he has not left yet.'], 'd-g08'),
  C(23, 'Điền: "No sooner had the bell rung ___ the students rushed out."',
    'B', 'Cặp cố định "No sooner... than...". Nhầm sang "when" là lỗi phổ biến vì "Hardly... when..." dùng "when" — hai cặp gần nhau nhưng không trộn được.', 0.25,
    ['when', 'than', 'that', 'as'], 'd-g07'),
  C(24, 'Điền giới từ: "She succeeded ___ persuading the committee."',
    'in', '"Succeed in + V-ing" là cặp cố định. Danh từ "success" cũng đi với "in", nên nhớ một lần dùng được cả hai dạng.', 0.25,
    undefined, 'd-v02'),
  C(25, 'Điền dạng đúng: "The scheme proved surprisingly ___ (COST) to run."',
    'costly', 'Cần một TÍNH TỪ sau "proved". Chú ý "costly" là tính từ dù kết thúc bằng "-ly" — đuôi này không phải lúc nào cũng báo trạng từ.', 0.25,
    undefined, 'd-v03'),
  C(26, 'Chọn từ trái nghĩa với "reliable" trong: "He is a reliable colleague."',
    'A', '"Reliable" là đáng tin cậy; trái nghĩa trực tiếp là "unreliable". "Unfriendly" và "unwilling" trái nghĩa với từ khác, không phải với từ này.', 0.25,
    ['unreliable', 'unfriendly', 'unwilling', 'unaware'], 'd-v06'),
  C(27, 'Điền: "Only after the deadline ___ that a mistake had been made."',
    'C', '"Only after + mệnh đề" ở đầu câu đòi ĐẢO NGỮ ở mệnh đề chính. Cụm "did we realise" đưa trợ động từ lên trước chủ ngữ.', 0.25,
    ['we realised', 'we did realise', 'did we realise', 'had we realised'], 'd-g07'),
  C(28, 'Tìm lỗi: "Although he was tired, but he finished the work."',
    'bỏ "but"', 'Tiếng Anh không dùng hai liên từ cho một quan hệ. Có "Although" rồi thì không có "but" — lỗi này đến thẳng từ cấu trúc "Tuy... nhưng..." của tiếng Việt.', 0.25,
    undefined, 'd-g10'),
];

const TN_DIEN_BAI = `Community libraries in rural districts have taken on a role their founders did not (29)___. Beyond lending books, many now run after-school sessions where older students help younger ones with homework. The arrangement costs almost (30)___, since the helpers are volunteers and the space already exists.

Head teachers report two effects. The obvious one is that younger children finish their homework. The (31)___ one, which surprised the organisers, is that the older helpers improve as well: explaining a method to someone else exposes the gaps in your own understanding. (32)___ , several districts now count volunteer hours towards the helpers' own school records.

The model is not without difficulty. Libraries depend (33)___ a small number of committed adults, and when one of them moves away the sessions often stop within a term.`;

const TN_DIEN: CauDeThi[] = [
  C(29, 'Chỗ trống (29): "a role their founders did not ___"',
    'B', 'Cần một động từ nguyên thể sau "did not". "Anticipate" nghĩa là lường trước — khớp với ý cả đoạn rằng vai trò này nằm ngoài dự tính ban đầu.', 0.25,
    ['anticipating', 'anticipate', 'anticipated', 'to anticipate'], 'd-r07'),
  C(30, 'Chỗ trống (30): "The arrangement costs almost ___"',
    'A', 'Câu sau giải thích lý do: người giúp là tình nguyện và không gian đã có sẵn. Chỉ "nothing" khớp được với hai lý do đó.', 0.25,
    ['nothing', 'everything', 'something', 'anything'], 'd-r07'),
  C(31, 'Chỗ trống (31): "The ___ one, which surprised the organisers"',
    'C', 'Câu trước mở bằng "The obvious one", nên chỗ này phải là vế đối lập. "Less obvious" khớp cả cặp đối lập lẫn mệnh đề "which surprised".', 0.25,
    ['more obvious', 'most obvious', 'less obvious', 'least obvious'], 'd-r07'),
  C(32, 'Chỗ trống (32): "___ , several districts now count volunteer hours"',
    'D', 'Vế trước nêu một lợi ích vừa phát hiện; vế sau là hành động rút ra từ đó. Quan hệ là kết quả, nên cần một từ nối chỉ hệ quả.', 0.25,
    ['However', 'Nevertheless', 'In contrast', 'As a result'], 'd-r07'),
  C(33, 'Chỗ trống (33): "Libraries depend ___ a small number of committed adults"',
    'B', '"Depend on" là cặp cố định, và ngữ cảnh nói tới sự phụ thuộc vào con người. Đây là câu kiểm giới từ trá hình trong bài điền từ.', 0.25,
    ['in', 'on', 'of', 'to'], 'd-v02'),
];

const TN_DOC_BAI = `For decades, the standard advice to language learners was to study grammar rules first and speak later. Recent classroom research complicates that picture. In a three-year study of secondary students in four countries, learners who began speaking within the first month made faster progress in fluency — but, crucially, only when their errors were corrected consistently. Where correction was absent, early speaking produced confident learners who had fossilised their mistakes.

The finding suggests the debate has been framed wrongly. The question is not whether to speak early, but whether the feedback loop is tight enough to catch errors before they harden. Teachers, the authors note, are the expensive part of that loop.

There is a further complication the study does not resolve. The four countries differed sharply in class size, and the schools where correction was most consistent were also the schools with the fewest students per teacher. It is therefore difficult to separate the effect of feedback from the effect of attention. A teacher with eighteen students may simply notice more than a teacher with forty-five, regardless of method.

For schools without the budget to reduce class sizes, the practical question becomes narrower: which errors are worth correcting? The authors suggest prioritising errors that block understanding over those that merely sound unusual — a distinction most teachers make instinctively, but few make consistently.`;

const TN_DOC: CauDeThi[] = [
  C(34, 'Theo bài đọc, nói sớm chỉ có lợi khi nào?',
    'B', 'Từ "crucially" đánh dấu điều kiện quyết định: chỉ khi lỗi được sửa nhất quán. Đây là câu hỏi CHI TIẾT có dấu hiệu từ vựng chỉ đường.', 0.25,
    ['Khi học viên tự tin', 'Khi lỗi được sửa nhất quán',
     'Khi học đủ ba năm', 'Khi có bạn cùng học'], 'd-r03'),
  C(35, 'Từ "fossilised" trong bài gần nghĩa nhất với từ nào?',
    'C', 'Đoán nghĩa theo ngữ cảnh: "before they harden" ở đoạn sau chính là chỗ giải nghĩa. Đề luôn để lại một dấu như vậy.', 0.25,
    ['forgotten', 'discovered', 'become permanent', 'reduced'], 'd-r06'),
  C(36, 'Tác giả ngụ ý điều gì ở câu cuối?',
    'A', '"Teachers are the expensive part of that loop" — nêu ra chi phí ngay sau khi chứng minh vòng phản hồi là điều kiện quyết định. Đó là gợi ý về khó khăn khi nhân rộng, không phải chê giáo viên.', 0.25,
    ['Áp dụng rộng sẽ tốn kém vì cần nhiều giáo viên',
     'Nên bỏ giáo viên và dùng phần mềm',
     'Giáo viên dạy chưa tốt',
     'Nghiên cứu này không đáng tin'], 'd-r08'),
  C(37, 'Theo bài, vì sao khó tách tác dụng của việc sửa lỗi khỏi tác dụng của sự chú ý?',
    'A', 'Đoạn ba nói rõ: trường sửa lỗi nhất quán nhất cũng là trường có ít học sinh trên một giáo viên nhất. Hai biến đi cùng nhau nên không tách được.', 0.25,
    ['Vì hai yếu tố đó luôn xuất hiện cùng nhau trong các trường được khảo sát',
     'Vì nghiên cứu chỉ kéo dài ba năm',
     'Vì bốn quốc gia dùng giáo trình khác nhau',
     'Vì giáo viên không ghi lại số lỗi đã sửa'], 'd-r03'),
  C(38, 'Cụm "the feedback loop is tight enough" trong bài gần nghĩa nhất với điều gì?',
    'C', 'Câu ngay sau đó giải nghĩa: bắt được lỗi TRƯỚC KHI nó cứng lại. Vòng phản hồi chặt nghĩa là khoảng cách giữa lỗi và lời sửa đủ ngắn.', 0.25,
    ['Học viên nhận được nhiều lời khen',
     'Lớp học có nhiều bài kiểm tra',
     'Lỗi được sửa đủ sớm để chưa kịp thành thói quen',
     'Giáo viên nói tiếng Anh suốt buổi'], 'd-r06'),
  C(39, 'Theo tác giả, trường thiếu ngân sách nên tập trung vào điều gì?',
    'B', 'Đoạn cuối thu hẹp câu hỏi lại: không phải sửa mọi lỗi, mà chọn lỗi nào đáng sửa — ưu tiên lỗi CHẶN việc hiểu.', 0.25,
    ['Giảm sĩ số bằng mọi giá',
     'Ưu tiên sửa những lỗi làm người nghe không hiểu',
     'Cho học sinh nói càng nhiều càng tốt',
     'Dạy ngữ pháp trước rồi mới cho nói'], 'd-r03'),
  C(40, 'Câu nào KHÔNG được nêu trong bài?',
    'D', 'Bài nói giáo viên là phần TỐN KÉM của vòng phản hồi, và nói rằng phần lớn giáo viên phân biệt hai loại lỗi theo bản năng. Nó không hề nói phần mềm thay được giáo viên.',
    0.25,
    ['Nói sớm giúp tiến bộ nhanh hơn về độ trôi chảy khi lỗi được sửa nhất quán',
     'Sĩ số lớp khác nhau rõ rệt giữa bốn quốc gia',
     'Phần lớn giáo viên phân biệt hai loại lỗi theo bản năng nhưng ít ai làm nhất quán',
     'Phần mềm có thể thay giáo viên trong vòng phản hồi'], 'd-r08'),
];

/* --------------------------- BỐN ĐỀ HOÀN CHỈNH -------------------------- */

const tong = (cs: CauDeThi[]) => Number(cs.reduce((s, c) => s + c.diem, 0).toFixed(2));

/* ==========================================================================
   ĐIỂM VÀ SỐ THỨ TỰ ĐỀU TÍNH RA, KHÔNG GÕ TAY

   VÌ SAO
     Một đề 86 câu trên thang 10 thì mỗi câu đáng 0,116 điểm — không có
     cách chia nào ra số đẹp. Gõ tay từng con số thì hoặc tổng lệch, hoặc
     phải bịa cho tròn. Cả hai đều đã xảy ra: bản trước khai tổng 10 điểm
     trong khi năm phần chỉ cộng được 8,6, và không ai phát hiện ra vì bài
     kiểm chưa có mục đối chiếu.

     Nay: mỗi PHẦN khai trọng số của nó, và điểm từng câu chia ra từ đó.
     Câu cuối của phần nhận phần dư, nên tổng phần luôn khớp tuyệt đối.

     Số thứ tự cũng vậy: đánh lại 1..N theo đúng thứ tự phần lúc dựng đề,
     nên thêm hay bớt câu ở giữa không làm gãy dãy số.
   ========================================================================== */

const chiaDiem = (cs: CauDeThi[], diemPhan: number): CauDeThi[] => {
  const n = cs.length;
  if (n === 0) return cs;
  const moiCau = Math.floor((diemPhan / n) * 1000) / 1000;
  return cs.map((c, i) => ({
    ...c,
    diem: i < n - 1 ? moiCau : Number((diemPhan - moiCau * (n - 1)).toFixed(3)),
  }));
};

/*
 * RẢI ĐÁP ÁN CHO ĐỀU BỐN Ô.
 *
 * Người soạn đề luôn có thói quen đặt đáp án đúng vào cùng vài ô. Bản đầu
 * của bốn đề này ra A37 B44 C42 D24 — ô D chỉ bằng nửa ô B, nghĩa là đoán
 * bừa ô B ăn 30% trong khi đoán ô D chỉ ăn 16%. Đó là một tín hiệu rò rỉ:
 * thí sinh tinh ý khai thác được mà không cần hiểu gì.
 *
 * Phép xoay ở đây là TẤT ĐỊNH theo thứ tự câu trắc nghiệm, không ngẫu
 * nhiên — cùng dữ liệu luôn ra cùng đề, nên bản in hôm nay và hôm sau vẫn
 * khớp nhau. Chỉ xoay câu trắc nghiệm; câu tự luận không có ô để xoay.
 *
 * An toàn vì không lời giải nào trong bốn đề nhắc tới chữ cái của ô — mọi
 * lời giải đều nói về NỘI DUNG của phương án. Bài kiểm có một mục soát
 * đúng điều đó, nên nếu ai viết "đáp án B" vào lời giải thì sẽ đỏ ngay.
 */
const raiDapAn = (phan: PhanDeThi[]): PhanDeThi[] => {
  let i = 0;
  return phan.map((p) => ({
    ...p,
    cau: p.cau.map((c) => {
      if (!c.luaChon) return c;
      const cu = 'ABCD'.indexOf(c.dapAn);
      if (cu < 0) return c;
      const dich = ((i++ % 4) - cu + 4) % 4;
      if (dich === 0) return c;
      const lay = <T,>(a: readonly T[]): [T, T, T, T] =>
        [a[(0 - dich + 4) % 4], a[(1 - dich + 4) % 4], a[(2 - dich + 4) % 4], a[(3 - dich + 4) % 4]];
      return {...c, luaChon: lay(c.luaChon), dapAn: 'ABCD'[(cu + dich) % 4]};
    }),
  }));
};

/** Đánh số lại toàn bộ câu của một đề thành dãy liên tục 1..N. */
const danhSoLai = (phan: PhanDeThi[]): PhanDeThi[] => {
  let no = 0;
  return phan.map((p) => ({...p, cau: p.cau.map((c) => ({...c, no: ++no}))}));
};

export const DE_THI_MAU: DeThiMau[] = [
  {
    id: 'dt-hanoi-5',
    ten: 'Đề chuyên Anh — Sở Hà Nội (năm phần)',
    kyThi: 'Tuyển sinh lớp 10 chuyên Anh, Sở GD-ĐT Hà Nội',
    theoCauTruc:
      'Đề thật: 120 phút, khoảng 86 câu, thang 10, năm phần Nghe · Ngữ âm · Từ vựng–Ngữ pháp · Đọc · Viết. Đề mẫu này dựng ĐỦ 86 câu và đúng thang 10 điểm. Điểm từng câu KHÔNG gõ tay: mỗi phần khai trọng số của nó và điểm chia ra từ đó, vì 10 chia cho 86 không ra số đẹp. PHẢI đối chiếu lại cấu trúc với đề án tuyển sinh của Sở trước mỗi mùa thi.',
    phut: 120,
    tongDiem: 10,
    soCau: 86,
    phan: danhSoLai(raiDapAn([
      {no: 1, ten: 'NGHE', huongDan: 'Nghe hai lần rồi chọn hoặc điền.', phut: 25,
       diem: 1.5, cau: chiaDiem(HN_NGHE, 1.5),
       barem: 'Phần Nghe chiếm 1,5 điểm chia đều cho 12 câu. Câu điền sai chính tả KHÔNG được tính, kể cả khi nghe đúng — đây là chỗ mất điểm oan nhất của cả đề.'},
      {no: 2, ten: 'NGỮ ÂM', huongDan: 'Chọn từ khác ba từ còn lại.', phut: 10,
       diem: 1.0, cau: chiaDiem(HN_NGU_AM, 1.0),
       barem: 'Phần Ngữ âm chiếm 1,0 điểm chia đều cho 10 câu. Phần này thuần luật nên mất điểm ở đây là mất oan; không có điểm một phần.'},
      {no: 3, ten: 'TỪ VỰNG – NGỮ PHÁP', huongDan: 'Chọn phương án đúng, điền từ, hoặc sửa lỗi.', phut: 30,
       diem: 3.0, cau: chiaDiem(HN_TU_NGU, 3.0),
       barem: 'Phần này chiếm 3,0 điểm chia đều cho 30 câu — nặng nhất trong các phần trắc nghiệm. Câu điền dạng từ phải đúng CẢ loại từ lẫn chính tả; đúng loại mà sai chính tả vẫn không có điểm.'},
      {no: 4, ten: 'ĐỌC', huongDan: 'Đọc ba ngữ liệu rồi trả lời.', phut: 35,
       diem: 2.5, cau: chiaDiem(HN_DOC, 2.5), nguLieu: HN_DOC_BAI,
       barem: 'Phần Đọc chiếm 2,5 điểm chia đều cho 22 câu. Câu suy luận chấm theo lựa chọn, không chấm theo lời giải thích — nhưng lựa chọn phải có chỗ tựa trong bài, và bài kiểm nội bộ đã soát điều đó.'},
      {no: 5, ten: 'VIẾT', huongDan: 'Viết lại câu theo từ gợi ý, nối câu, sửa lỗi, và viết đoạn.', phut: 20,
       diem: 2.0, cau: chiaDiem(HN_VIET, 2.0),
       barem: 'Phần Viết chiếm 2,0 điểm chia đều cho 12 câu. Câu viết lại: TRỪ HẾT điểm nếu sai cấu trúc bắt buộc, trừ nửa nếu đúng cấu trúc mà sai thì hoặc sai dạng từ. Hai câu viết đoạn chấm theo bốn tiêu chí, mỗi tiêu chí một phần tư điểm của câu đó: nội dung · tổ chức · ngữ pháp · từ vựng. TRỪ ĐIỂM ở: thiếu lập trường rõ, hai lý do thực chất là một, thiếu ví dụ cụ thể, và câu kết chép lại nguyên văn câu mở.'},
    ])),
    thuTuLam:
      'Nghe trước vì băng chỉ phát một lần theo lịch chung. Sau đó Ngữ âm và Từ vựng–Ngữ pháp vì chúng nhanh và chắc điểm. Đọc rồi Viết sau cùng — Viết để cuối thì hết giờ vẫn còn phần đã chấm được, còn Đọc để cuối thì bỏ trắng nguyên phần.',
    chiaThoiGian: [
      'Nghe 25 phút — đọc trước câu hỏi trong lúc chờ băng.',
      'Ngữ âm 10 phút — quá 45 giây một câu thì đánh dấu và đi tiếp.',
      'Từ vựng – Ngữ pháp 30 phút — một phút một câu, không hơn.',
      'Đọc 35 phút — 8 phút cho bài điền từ, 27 phút cho hai bài đọc hiểu.',
      'Viết 20 phút — 8 phút cho mười câu viết lại, 12 phút cho hai đoạn.',
    ],
    baremChung:
      'Thang 10. Trọng số năm phần: Nghe 1,5 · Ngữ âm 1,0 · Từ vựng–Ngữ pháp 3,0 · Đọc 2,5 · Viết 2,0. Điểm mỗi câu tính ra từ trọng số phần chứ không gõ tay, nên tổng luôn khớp tuyệt đối.',
    canhBao:
      'Điểm bài chuyên nhân hệ số hai trong công thức xét tuyển, nên một điểm ở đây đáng gấp đôi một điểm ở môn chung. Phần Viết chiếm 2,0 điểm — bỏ trắng phần này là mất 20% tổng điểm của bài nhân đôi.',
  },
  {
    id: 'dt-chung-hanoi',
    ten: 'Đề Ngoại ngữ chung — vào 10 Hà Nội',
    kyThi: 'Tuyển sinh vào 10 công lập, Sở GD-ĐT Hà Nội',
    theoCauTruc:
      'Đề thật: 60 phút, 40 câu trắc nghiệm, mỗi câu 0,25 điểm, trộn 24 mã đề. Những năm gần đây tăng mạnh dạng bài thực tế: đọc biển báo, hội thoại đời thường, tìm câu chủ đề, sắp xếp đoạn, điền câu vào chỗ trống. Đề mẫu này dựng ĐỦ 40 câu, đúng số câu và đúng thang điểm của đề thật, phủ cả năm dạng thực tế mới. PHẢI đối chiếu lại cấu trúc và số câu với đề án tuyển sinh của Sở trước mỗi mùa thi.',
    phut: 60,
    tongDiem: 10,
    soCau: 40,
    phan: danhSoLai(raiDapAn([
      {no: 1, ten: 'TRẮC NGHIỆM TỔNG HỢP', huongDan: 'Chọn một phương án đúng cho mỗi câu.', phut: 60, diem: tong(CHUNG), cau: CHUNG,
       barem: 'Mỗi câu 0,25 điểm, không có điểm một phần. Đề thật có 40 câu nên mỗi câu đáng 1/40 tổng điểm — bỏ trắng một câu và đoán một câu có kỳ vọng khác nhau, luôn đoán.'},
    ])),
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
      'NÓI RÕ MỘT ĐIỀU TRƯỚC: số câu chính xác của vòng 2 KHÔNG được công bố nhất quán theo năm, khác với đề Sở và đề tốt nghiệp vốn có cấu trúc ổn định. Đề mẫu này dựng ĐỦ 40 câu trong 90 phút để luyện đúng nhịp làm bài, nhưng độ dài đó là một GIẢ ĐỊNH, không phải bản sao cấu trúc thật. Phần trọng tâm thì chắc chắn: vòng 2 nặng về suy luận ngữ pháp và biến đổi câu — đảo ngữ, bị động tường thuật, điều kiện đảo, và các cặp cấu trúc dễ nhầm. Dùng đề này để luyện DẠNG; PHẢI đối chiếu số câu với thông báo tuyển sinh của trường trước mỗi mùa.',
    phut: 90,
    tongDiem: 10,
    soCau: 40,
    phan: danhSoLai(raiDapAn([
      {no: 1, ten: 'NGỮ PHÁP VÀ BIẾN ĐỔI CÂU NÂNG CAO', huongDan: 'Chọn phương án đúng, điền từ, sửa lỗi, hoặc viết lại câu theo từ gợi ý.', phut: 90,
       diem: 10, cau: chiaDiem(KHTN, 10),
       barem:
         'Phần này chiếm trọn 10 điểm chia đều cho 40 câu, vì vòng 2 chỉ có một khối duy nhất. Câu viết lại chấm theo ba tiêu chí: đúng cấu trúc bắt buộc · đúng thì và mốc thời gian · đúng chính tả và dạng từ.\n' +
         'TRỪ ĐIỂM: đúng cấu trúc nhưng sai mốc thời gian mất một phần ba điểm câu — vòng 2 chấm chặt đúng ở chỗ này. Sai cấu trúc bắt buộc thì TRỪ HẾT, kể cả khi câu vẫn đúng ngữ pháp và cùng nghĩa.',
      },
    ])),
    thuTuLam:
      'Làm hết câu trắc nghiệm trước, rồi mới tới câu viết lại. Câu viết lại tốn giờ gấp ba nhưng chỉ đáng gấp đôi điểm, nên để sau là đúng thứ tự kinh tế.',
    chiaThoiGian: [
      'Trắc nghiệm 45 phút — trung bình 1,5 phút một câu, quá thì đánh dấu và đi tiếp.',
      'Viết lại 30 phút — 3 phút một câu, viết nháp trước khi chép vào bài.',
      'Soát 15 phút — soát riêng mốc thời gian của mọi câu viết lại, đó là chỗ mất điểm tập trung nhất.',
    ],
    baremChung: 'Thang 10, chia đều cho 40 câu. Vòng 2 không làm tròn lên.',
    canhBao:
      'Cấu trúc vòng 2 thay đổi theo năm nhiều hơn đề Sở, và số câu không được công bố nhất quán. Dùng đề này để luyện DẠNG và luyện nhịp 90 phút, KHÔNG dùng để đoán số câu.',
  },
  {
    id: 'dt-tot-nghiep',
    ten: 'Đề tốt nghiệp THPT — ba phần',
    kyThi: 'Thi tốt nghiệp THPT, môn Tiếng Anh',
    theoCauTruc:
      'Đề thật: 50 phút, 40 câu trắc nghiệm, các khối Ngữ âm · Từ vựng–Ngữ pháp · Điền từ vào đoạn · Đọc hiểu. Đề mẫu này dựng ĐỦ 40 câu, đúng số câu và đúng thang điểm của đề thật. PHẢI đối chiếu với đề minh hoạ chính thức của Bộ trước mỗi mùa thi.',
    phut: 50,
    tongDiem: 10,
    soCau: 40,
    phan: danhSoLai(raiDapAn([
      {no: 1, ten: 'NGỮ ÂM', huongDan: 'Chọn từ có phần gạch chân hoặc trọng âm khác ba từ còn lại.', phut: 5, diem: tong(TN_NGU_AM), cau: TN_NGU_AM,
       barem: 'Mỗi câu 0,25 điểm. Phần này thuần luật nên mất điểm ở đây là mất oan.'},
      {no: 2, ten: 'TỪ VỰNG – NGỮ PHÁP', huongDan: 'Chọn phương án đúng hoặc điền từ.', phut: 20, diem: tong(TN_TU_NGU), cau: TN_TU_NGU,
       barem: 'Mỗi câu 0,25 điểm. Câu điền dạng từ sai chính tả không tính, kể cả khi đúng loại từ.'},
      {no: 3, ten: 'ĐIỀN TỪ VÀO ĐOẠN', huongDan: 'Đọc đoạn và chọn phương án đúng cho mỗi chỗ trống.', phut: 10, diem: tong(TN_DIEN), nguLieu: TN_DIEN_BAI, cau: TN_DIEN,
       barem: 'Mỗi câu 0,25 điểm. Chỗ trống kiểm cả từ vựng lẫn liên kết ý, nên đọc trọn câu trước và câu sau rồi mới chọn.'},
      {no: 4, ten: 'ĐỌC HIỂU', huongDan: 'Đọc bài rồi trả lời.', phut: 15, diem: tong(TN_DOC), nguLieu: TN_DOC_BAI, cau: TN_DOC,
       barem: 'Mỗi câu 0,25 điểm. Câu đoán nghĩa từ theo ngữ cảnh chấm theo lựa chọn, không chấm theo định nghĩa từ điển.'},
    ])),
    thuTuLam:
      'Ngữ âm → Từ vựng–Ngữ pháp → Đọc hiểu. Đọc hiểu để cuối vì nó ăn giờ nhất và ít bị ảnh hưởng bởi việc làm vội.',
    chiaThoiGian: [
      'Ngữ âm 5 phút.',
      'Từ vựng–Ngữ pháp 20 phút.',
      'Điền từ vào đoạn 10 phút — đọc trọn đoạn một lượt trước khi điền chỗ nào.',
      'Đọc hiểu 15 phút — 3 phút đọc lướt, 12 phút trả lời.',
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
