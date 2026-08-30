/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {DeCuong, TuanDeCuong} from '../types';
import {PYRAMID} from './academy';
import {LEVELS} from './levels';
import {TUYEN} from './tuyen';

/* ==========================================================================
   HỆ THỐNG ĐỀ CƯƠNG

   Đề cương khác lộ trình ở chỗ nào
     Lộ trình nói ĐI ĐÂU. Đề cương nói TUẦN NÀY DẠY GÌ, học viên phải LÀM
     ĐƯỢC gì ở cuối, và đo bằng con số nào. Người dạy cầm đề cương là biết
     phải đứng lớp thế nào; phụ huynh cầm đề cương là biết tiền mình trả đổi
     lấy cái gì.

   Bốn thứ mọi đề cương ở đây bắt buộc phải có
     1. ĐẦU RA viết bằng động từ quan sát được. "Hiểu được thì quá khứ" không
        phải đầu ra vì không ai kiểm được; "chia đúng 18/20 câu thì quá khứ
        trong bốn phút" thì kiểm được.
     2. ĐO BẰNG con số, không đo bằng cảm giác. Mỗi tuần một phép đo.
     3. KHÔNG DẠY GÌ — ranh giới thật. Đề cương không ghi ranh giới thì người
        học kỳ vọng nó dạy mọi thứ, và thất vọng là chuyện chắc chắn.
     4. BỐN CHỮ GITA đặt vào việc cụ thể, không đặt vào khẩu hiệu.

   Vì sao chia theo TẦNG chứ không theo từng cấp
     Hai mươi lăm cấp chia thành năm tầng, mỗi tầng năm cấp. Chia đề cương
     theo từng cấp thì ra 25 bản cho mỗi tuyến, và 25 bản ấy khác nhau rất ít
     — vì năm cấp trong một tầng dùng chung cách học. Chia theo tầng cho ra
     mười bản đọc hết được, mỗi bản thật sự khác nhau.

   Giọng của bộ nhận diện, giữ nguyên trong từng dòng
     Nói thẳng. Dùng số thay tính từ. Khó thì gọi là khó.
   ========================================================================== */

export const DECUONG_CREED = {
  name: 'HỆ THỐNG ĐỀ CƯƠNG',
  claim:
    'Mười đề cương — năm tầng × hai tuyến. Mỗi bản có đầu ra viết bằng động từ quan sát được, phép đo bằng số cho từng tuần, và ranh giới KHÔNG dạy gì.',
  dauRaQuanSatDuoc:
    'Đầu ra phải là việc nhìn thấy được. "Hiểu được thì quá khứ" không kiểm được nên không phải đầu ra; "chia đúng 18/20 câu trong bốn phút" thì kiểm được.',
  ranhGioi:
    'Mỗi đề cương ghi rõ nó KHÔNG dạy gì. Không ghi thì người học kỳ vọng nó dạy mọi thứ, và thất vọng là chuyện chắc chắn.',
  vaiTro:
    'Người dạy cầm đề cương là biết đứng lớp thế nào. Phụ huynh cầm đề cương là biết tiền mình trả đổi lấy cái gì.',
};

/* ----------------------- NĂM TẦNG, HAI TUYẾN ---------------------------- */
/*
 * Mỗi tầng có một việc riêng, và việc đó quyết định cả cách dạy lẫn cách đo.
 * Hai tuyến chia nhau cùng năm tầng nhưng khác nhau ở NGÂN SÁCH THỜI GIAN và
 * ở ĐÍCH: tuyến IELTS có ba năm, tuyến chuyên có hai mươi hai tháng và một
 * ngày thi cố định. Ngân sách khác thì thứ tự ưu tiên khác.
 */

const NEN_TANG = [
  {
    tierId: 'tier-1',
    danhCho: 'Người nghe một câu tiếng Anh chỉ ra được đây là tiếng Anh, nhưng không tách được ra thành từ.',
    vaoDuocKhi: 'Không yêu cầu gì. Đây là cửa vào.',
    dauRa: [
      'Chép lại đúng 40 trên 50 từ trong một đoạn nghe 90 giây, nghe hai lần',
      'Đọc đúng phiên âm của 12 nguyên âm đơn và 8 nguyên âm đôi, không nhìn mẫu',
      'Chỉ ra được ranh giới từ trong một câu nói liền mạch dài 10 từ',
      'Giữ chuỗi 21 ngày không đứt',
    ],
    khongDay: [
      'Ngữ pháp có hệ thống — tầng này chỉ nhận diện âm, chưa phân tích cấu trúc.',
      'Viết đoạn — chưa đủ vốn từ để viết cái gì đáng đọc.',
      'Nói tự do — nói trước khi tai nghe ra là cách tạo lỗi hoá thạch.',
    ],
    trongTam: 'tai',
  },
  {
    tierId: 'tier-2',
    danhCho: 'Người nghe ra được từ nhưng chưa thấy được quy luật nào lặp lại giữa các câu.',
    vaoDuocKhi: 'Đã đạt đầu ra của tầng 1, có bằng chứng bằng bài chép chính tả.',
    dauRa: [
      'Nhận ra và gọi tên đúng 8 trên 10 cấu trúc ngữ pháp lõi khi gặp trong câu lạ',
      'Đãi được 5 cụm từ có nghĩa riêng từ một bài đọc 300 từ, tự làm',
      'Chia đúng 18 trên 20 câu về thì trong 4 phút',
      'Đọc một đoạn 150 từ và trả lời đúng 4 trên 5 câu hỏi chi tiết',
    ],
    khongDay: [
      'Ngữ pháp nâng cao như đảo ngữ hay câu chẻ — chưa vững nền thì học chỉ để quên.',
      'Bài đọc học thuật dài — tầng này đọc đoạn, chưa đọc bài.',
      'Nói trôi chảy — mục tiêu tầng này là nói ĐÚNG, chưa phải nói nhanh.',
    ],
    trongTam: 'mắt',
  },
  {
    tierId: 'tier-3',
    danhCho: 'Người viết đúng nhưng mở miệng thì đứng hình, hoặc nói được nhưng sai cấu trúc cơ bản.',
    vaoDuocKhi: 'Đã đạt đầu ra của tầng 2, và chuỗi ngày còn nguyên ít nhất 45 ngày.',
    dauRa: [
      'Trả lời 40 tình huống liên tiếp với độ trễ trung bình dưới 1,5 giây',
      'Nói 2 phút về một chủ đề chưa chuẩn bị, không quá 3 lần ngập ngừng trên 2 giây',
      'Bảo vệ một quan điểm trong 90 giây với ít nhất 2 lý do tách bạch và 2 ví dụ',
      'Tự phát hiện và sửa được 3 trên 5 lỗi trong chính bản ghi âm của mình',
    ],
    khongDay: [
      'Phát âm chuẩn bản ngữ — mục tiêu là dễ nghe, không phải giống người bản ngữ.',
      'Từ vựng học thuật chuyên ngành — tầng này dùng vốn từ đời sống và học đường.',
      'Viết luận có lập luận nhiều tầng — thuộc tầng 4.',
    ],
    trongTam: 'miệng',
  },
  {
    tierId: 'tier-4',
    danhCho: 'Người nói và viết được, nhưng sản phẩm còn rời rạc và chưa chịu được chuẩn chấm thi.',
    vaoDuocKhi: 'Đã đạt đầu ra của tầng 3, và có ít nhất 20 bài viết đã được chấm trong hồ sơ.',
    dauRa: [
      'Viết một bài luận 250 từ có lập trường rõ, 2 lý do tách bạch, mỗi lý do 1 ví dụ, trong 30 phút',
      'Mô tả một biểu đồ trong 20 phút, chọn đúng 3 xu hướng nổi bật, không suy đoán nguyên nhân',
      'Đọc bài học thuật 800 từ và trả lời đúng 8 trên 10 câu, trong 18 phút',
      'Tự chấm bài của mình lệch không quá 10% so với người chấm',
    ],
    khongDay: [
      'Kỹ thuật thi cụ thể của một trường — thuộc tuyến chuyên, không thuộc tầng này.',
      'Dạy lại người khác — thuộc tầng 5.',
    ],
    trongTam: 'tay',
  },
  {
    tierId: 'tier-5',
    danhCho: 'Người làm ra sản phẩm đạt chuẩn nhưng chưa giải thích được vì sao nó đạt.',
    vaoDuocKhi: 'Đã đạt đầu ra của tầng 4, và có ít nhất 3 bài đạt ngưỡng cao nhất của thang chấm.',
    dauRa: [
      'Giải thích được cho một người tầng dưới hiểu một điểm ngữ pháp, chỉ bằng lời, dưới 3 phút',
      'Chấm bài của một học viên tầng 3 lệch không quá 15% so với người chấm chính',
      'Chỉ ra được ít nhất 2 chỗ gãy trong lập luận của một bài viết 250 từ, mỗi chỗ kèm một cách sửa cụ thể',
      'Làm trọn 1 đề thi thật trong đúng số phút quy định, không bỏ trống câu nào vì hết giờ',
    ],
    khongDay: [
      'Phương pháp sư phạm đầy đủ — dạy lại ở đây là công cụ học, không phải nghề dạy học.',
      'Nội dung ngoài phạm vi kỳ thi đích.',
    ],
    trongTam: 'đường',
  },
];

/* --------------- BỐN CHỮ GITA ĐẶT VÀO VIỆC, KHÔNG VÀO KHẨU HIỆU --------- */
const GITA_THEO_TANG: Record<string, {chu: string; viec: string}[]> = {
  'tier-1': [
    {chu: 'G — Goal', viec: 'Viết ra một câu đích cho 21 ngày, dán ở chỗ ngồi học.'},
    {chu: 'I — Inspirits', viec: 'Ghi lại ngày đầu tiên nghe ra được một từ mình chưa từng nhận ra.'},
    {chu: 'T — Talent', viec: 'Đo tốc độ chép chính tả tuần 1 và tuần 4, so hai con số.'},
    {chu: 'A — Action', viec: 'Đặt giờ học cố định trong ngày và không đổi trong suốt tầng.'},
  ],
  'tier-2': [
    {chu: 'G — Goal', viec: 'Đặt đích theo số cấu trúc nhận ra được, không theo số giờ học.'},
    {chu: 'I — Inspirits', viec: 'Mỗi tuần ghi một quy luật tự mình phát hiện ra, không phải thầy chỉ.'},
    {chu: 'T — Talent', viec: 'Nhận ra mình mạnh ở nhận diện hay ở suy luận, rồi dồn giờ vào chỗ yếu.'},
    {chu: 'A — Action', viec: 'Sổ lỗi lặp bắt đầu từ tầng này, đọc lại trước mỗi buổi.'},
  ],
  'tier-3': [
    {chu: 'G — Goal', viec: 'Đích là độ trễ tính bằng giây, không phải cảm giác tự tin.'},
    {chu: 'I — Inspirits', viec: 'Ghi âm buổi đầu tầng và buổi cuối tầng, nghe lại cả hai.'},
    {chu: 'T — Talent', viec: 'Tìm ra chủ đề mình nói tốt nhất và dùng nó làm bàn đạp.'},
    {chu: 'A — Action', viec: 'Nói to mỗi ngày, kể cả ngày chỉ có mười phút.'},
  ],
  'tier-4': [
    {chu: 'G — Goal', viec: 'Đích là điểm theo thang chấm thật, không phải số bài đã viết.'},
    {chu: 'I — Inspirits', viec: 'Giữ lại bài viết đầu tiên của tầng 2 để so với bài hiện tại.'},
    {chu: 'T — Talent', viec: 'Chọn một dạng bài làm thế mạnh và luyện tới mức chắc chắn.'},
    {chu: 'A — Action', viec: 'Mỗi bài viết đều tự chấm trước khi nộp cho người chấm.'},
  ],
  'tier-5': [
    {chu: 'G — Goal', viec: 'Đích là ngày thi và con số cần đạt, đếm ngược từ đó.'},
    {chu: 'I — Inspirits', viec: 'Dạy lại một người và ghi lại chỗ mình giải thích chưa được.'},
    {chu: 'T — Talent', viec: 'Nhận ra mình dạy được phần nào, và phần nào mình chỉ làm được.'},
    {chu: 'A — Action', viec: 'Làm đề thật đúng giờ quy định, mỗi tuần một lần, không bỏ.'},
  ],
};

/* ------------------------- NỘI DUNG TỪNG TUẦN --------------------------- */
/*
 * Mỗi tầng có bốn tuần mẫu, và bốn tuần ấy lặp lại theo chu kỳ cho tới hết
 * tầng. Đây là chủ ý, không phải cắt bớt: một tầng kéo dài nhiều tháng, và
 * cái đổi qua từng chu kỳ là ĐỘ KHÓ CỦA HỌC LIỆU, không phải cấu trúc tuần.
 * Đổi cấu trúc mỗi tuần thì người học không bao giờ thành thạo cấu trúc nào.
 */
const TUAN_THEO_TANG: Record<string, TuanDeCuong[]> = {
  'tier-1': [
    {tuan: 1, ten: 'Tách âm khỏi khối tiếng', day: ['12 nguyên âm đơn trên bảng IPA', 'Ranh giới từ trong dòng nói'], lam: ['Chép chính tả 3 đoạn 45 giây mỗi ngày', 'Đọc to bảng nguyên âm, ghi âm lại'], doBang: 'Số từ chép đúng trên 50 từ, ghi lại mỗi ngày.', chuaDung: 'Chưa đụng tới ngữ pháp. Tuần này chỉ có âm.'},
    {tuan: 2, ten: 'Cặp âm dễ nhầm', day: ['8 cặp âm tối thiểu người Việt hay lẫn', 'Phụ âm cuối và vì sao nó mang nghĩa'], lam: ['Luyện 1 cặp âm mỗi ngày tới khi phân biệt được khi nghe', 'Đọc cặp câu chỉ khác nhau ở âm cuối'], doBang: 'Người thứ hai đọc ngẫu nhiên 20 từ, đoán đúng bao nhiêu.', chuaDung: 'Chưa luyện nói thành câu. Mới ở mức từ.'},
    {tuan: 3, ten: 'Nối âm và nuốt âm', day: ['Ba loại nối âm', 'Dạng yếu của 5 từ chức năng hay gặp nhất'], lam: ['Chép chính tả rồi khoanh mọi chỗ nghe hụt', 'Kiểm xem chỗ hụt có phải chỗ nối âm không'], doBang: 'Số chỗ nghe hụt trong một đoạn 90 giây, tuần này so tuần trước.', chuaDung: 'Chưa đụng ngữ điệu — đó là tầng câu, chưa tới.'},
    {tuan: 4, ten: 'Nối lại và đo', day: ['Ôn lại ba tuần bằng học liệu mới hoàn toàn'], lam: ['Làm lại đúng bài chép chính tả của tuần 1'], doBang: 'So số từ chép đúng của tuần 4 với tuần 1 trên CÙNG một đoạn.', chuaDung: 'Không dạy gì mới. Tuần này để thấy mình đã đi được bao xa.'},
  ],
  'tier-2': [
    {tuan: 1, ten: 'Thì và mốc thời gian', day: ['Bốn thì lõi và dấu hiệu nhận ra từng thì'], lam: ['20 câu chia thì mỗi ngày, bấm giờ'], doBang: 'Số câu đúng trên 20 và số phút dùng hết.', chuaDung: 'Chưa đụng thì hoàn thành tiếp diễn — hiếm gặp, để sau.'},
    {tuan: 2, ten: 'Mệnh đề và câu điều kiện', day: ['Mệnh đề quan hệ xác định và không xác định', 'Ba loại câu điều kiện'], lam: ['Nối câu bằng mệnh đề quan hệ, 10 câu mỗi ngày'], doBang: 'Số câu nối đúng trên 10, và số câu dùng sai dấu phẩy. Đạt khi từ 8/10 và không quá 1 lỗi dấu phẩy.', chuaDung: 'Chưa đụng đảo ngữ trong câu điều kiện.'},
    {tuan: 3, ten: 'Đãi cụm từ ngữ liệu thật', day: ['Phân biệt từ đơn với cụm mang nghĩa riêng'], lam: ['Đọc 1 bài 300 từ mỗi ngày, đãi 5 cụm, đặt câu của mình'], doBang: 'Số cụm đãi được trong tuần và số cụm đã dùng lại. Đạt khi từ 25 cụm và từ 15 cụm được dùng lại.', chuaDung: 'Chưa học từ học thuật — vốn đời sống trước đã.'},
    {tuan: 4, ten: 'Nối lại và đo', day: ['Ôn ba tuần bằng bài đọc chưa gặp'], lam: ['Làm lại bài chia thì của tuần 1'], doBang: 'So số câu đúng và số phút của tuần 4 với tuần 1.', chuaDung: 'Không dạy gì mới. Tuần này chỉ để đo lại bằng chính phép đo của tuần 1, nên không thêm học liệu và không thêm dạng bài.'},
  ],
  'tier-3': [
    {tuan: 1, ten: 'Phản xạ tình huống', day: ['20 mẫu câu bật ra không cần nghĩ'], lam: ['App bắn 40 tình huống mỗi ngày, đo độ trễ từng câu'], doBang: 'Độ trễ trung bình trên 40 câu, tính bằng giây. Đạt khi dưới 1,5 giây và không câu nào quá 3 giây.', chuaDung: 'Chưa đòi hỏi câu dài hay từ hay. Đòi NHANH và ĐÚNG.'},
    {tuan: 2, ten: 'Nói có cấu trúc', day: ['Khung bốn dòng cho một ý kiến'], lam: ['Nói 90 giây mỗi ngày theo khung, ghi âm'], doBang: 'Số lý do tách bạch nêu được, và số lần ngập ngừng trên 2 giây.', chuaDung: 'Chưa chấm phát âm ở tuần này. Chấm cấu trúc trước.'},
    {tuan: 3, ten: 'Nghe lại chính mình', day: ['Ba nhóm lỗi hay gặp khi nói'], lam: ['Nghe lại bản ghi hôm trước, khoanh 3 lỗi, sửa và ghi lại'], doBang: 'Số lỗi tự phát hiện trên tổng số lỗi người chấm tìm ra. Đạt khi từ 3 trên 5.', chuaDung: 'Chưa nhờ người khác sửa. Tự nghe ra trước đã.'},
    {tuan: 4, ten: 'Nối lại và đo', day: ['Ôn ba tuần với chủ đề chưa chuẩn bị'], lam: ['Nói 2 phút về một chủ đề bốc ngẫu nhiên'], doBang: 'So độ trễ và số lần ngập ngừng với tuần 1.', chuaDung: 'Không dạy gì mới. Tuần này chỉ để đo lại bằng chính phép đo của tuần 1, nên không thêm học liệu và không thêm dạng bài.'},
  ],
  'tier-4': [
    {tuan: 1, ten: 'Dàn ý và câu chủ đề', day: ['Dàn ý bốn dòng', 'Câu chủ đề đủ hẹp để chứng minh'], lam: ['Viết 1 đoạn 120 từ mỗi ngày, dàn ý trước'], doBang: 'Số đoạn có câu chủ đề bao được cả đoạn, trên 7 đoạn viết trong tuần. Đạt khi từ 5 trên 7.', chuaDung: 'Chưa viết bài dài. Đoạn trước, bài sau.'},
    {tuan: 2, ten: 'Bài luận có lập luận', day: ['Hai lý do tách bạch và cách kiểm chúng không trùng nhau'], lam: ['Viết 1 bài 250 từ, 3 lần một tuần, bấm giờ 30 phút'], doBang: 'Điểm theo 4 tiêu chí trên thang 10, và số phút thật đã dùng. Đạt khi từ 7 điểm trong 30 phút.', chuaDung: 'Chưa chấm từ vựng học thuật ở tuần này.'},
    {tuan: 3, ten: 'Tự chấm và tự sửa', day: ['Ba lượt soát, mỗi lượt một loại lỗi'], lam: ['Tự chấm bài của mình trước khi nộp, ghi điểm dự đoán'], doBang: 'Chênh lệch giữa điểm tự chấm và điểm người chấm, tính theo phần trăm. Đạt khi dưới 10%.', chuaDung: 'Chưa chấm bài của người khác — thuộc tầng 5.'},
    {tuan: 4, ten: 'Nối lại và đo', day: ['Ôn ba tuần bằng đề chưa gặp'], lam: ['Viết lại đúng đề của tuần 1'], doBang: 'So điểm bài tuần 4 với bài tuần 1 trên CÙNG một đề.', chuaDung: 'Không dạy gì mới. Tuần này chỉ để đo lại bằng chính phép đo của tuần 1, nên không thêm học liệu và không thêm dạng bài.'},
  ],
  'tier-5': [
    {tuan: 1, ten: 'Giải thích được mới là hiểu', day: ['Cách giải thích một điểm ngữ pháp cho người tầng dưới'], lam: ['Mỗi ngày giải thích 1 điểm, ghi âm dưới 3 phút'], doBang: 'Người nghe tầng 2 làm đúng bao nhiêu câu sau khi nghe.', chuaDung: 'Chưa dạy phương pháp sư phạm. Đây là công cụ học.'},
    {tuan: 2, ten: 'Chấm bài người khác', day: ['Đọc bảng chấm và áp cho một bài thật'], lam: ['Chấm 2 bài của học viên tầng 3 mỗi tuần'], doBang: 'Chênh lệch giữa điểm mình chấm và điểm người chấm chính, trên 2 bài mỗi tuần. Đạt khi dưới 15%.', chuaDung: 'Không chấm điểm chính thức — điểm chính thức cần kiểm định.'},
    {tuan: 3, ten: 'Đề thật, giờ thật', day: ['Chiến thuật phân bổ giờ cho đề đích'], lam: ['Làm 1 đề đầy đủ mỗi tuần, đúng giờ quy định'], doBang: 'Điểm từng phần trên thang 10, và số câu bỏ trống vì hết giờ. Đạt khi 0 câu bỏ trống.', chuaDung: 'Không đoán đề. Luyện cảm giác và phân bổ giờ.'},
    {tuan: 4, ten: 'Nối lại và đo', day: ['Soát toàn bộ sổ lỗi từ đầu lộ trình'], lam: ['Làm lại đề của tuần 3 với bản đề khác'], doBang: 'So điểm tuần 4 với tuần 3, và đếm số nhóm lỗi còn lặp trong sổ. Đạt khi số nhóm giảm ít nhất 1.', chuaDung: 'Không dạy gì mới. Tuần này chỉ để đo lại bằng chính phép đo của tuần 1, nên không thêm học liệu và không thêm dạng bài.'},
  ],
};

/* -------------------- KHÁC NHAU GIỮA HAI TUYẾN -------------------------- */
/*
 * Cùng năm tầng nhưng hai ngân sách thời gian khác nhau, nên số tuần và số
 * phút mỗi ngày khác nhau. Tuyến chuyên có 22 tháng và một ngày thi cố định
 * nên phải nhanh hơn và phải hy sinh chiều rộng để giữ chiều sâu ở đúng
 * những dạng bài đề hỏi.
 */
const THEO_TUYEN: Record<string, {soTuan: number[]; phut: number; themDauRa: string; themKhongDay: string}> = {
  ielts: {
    soTuan: [12, 16, 20, 20, 16],
    phut: 60,
    themDauRa: 'Giữ được nhịp học trong cả tầng mà không cần ai nhắc.',
    themKhongDay: 'Không luyện riêng cho một trường chuyên nào — tuyến này nhắm chuẩn quốc tế.',
  },
  chuyen: {
    soTuan: [8, 12, 14, 16, 12],
    phut: 90,
    themDauRa: 'Làm được đúng những dạng bài mà đề chuyên hỏi, trong đúng số phút đề cho.',
    themKhongDay: 'Không phủ hết mọi kỹ năng như tuyến IELTS — 22 tháng không đủ, và đề chuyên không hỏi hết.',
  },
};

/* ------------------------------ SINH RA --------------------------------- */

let cache: DeCuong[] | null = null;

export function deCuong(): DeCuong[] {
  if (cache) return cache;
  const ra: DeCuong[] = [];
  for (const t of TUYEN) {
    const cauHinh = THEO_TUYEN[t.id];
    if (!cauHinh) throw new Error(`Đề cương thiếu cấu hình cho tuyến ${t.id}`);
    NEN_TANG.forEach((n, i) => {
      const tang = PYRAMID.find((p) => p.id === n.tierId);
      const gita = GITA_THEO_TANG[n.tierId];
      const tuan = TUAN_THEO_TANG[n.tierId];
      if (!tang || !gita || !tuan) throw new Error(`Đề cương thiếu neo cho tầng ${n.tierId}`);
      const capTrongTang = LEVELS.filter((l) => l.tierId === n.tierId);
      ra.push({
        id: `dc-${t.id}-${n.tierId}`,
        tuyenId: t.id,
        tuyenTen: t.ten,
        tierId: n.tierId,
        tangTen: tang.name,
        no: ra.length + 1,
        ten: `${tang.name} — ${t.ten}`,
        danhCho: n.danhCho,
        vaoDuocKhi: n.vaoDuocKhi,
        soTuan: cauHinh.soTuan[i],
        phutMoiNgay: cauHinh.phut,
        dauRa: [...n.dauRa, cauHinh.themDauRa],
        tuan,
        danhGia: [
          {cach: 'Phép đo hằng tuần ghi trong đề cương', trongSo: 30, nguong: 'Bốn tuần liên tiếp có số liệu, không tuần nào bỏ trống.'},
          {cach: 'Phiếu luyện của các cấp trong tầng', trongSo: 40, nguong: `Từ 90% số phiếu đạt, tối thiểu 8 phiếu, trên ${capTrongTang.length} cấp của tầng.`},
          {cach: 'Bài thi cuối tầng', trongSo: 30, nguong: 'Đạt đủ mọi đầu ra ghi ở trên, không bù trừ giữa các đầu ra.'},
        ],
        quaKhi:
          'Đạt cả ba phần đánh giá. KHÔNG bù trừ: điểm phiếu cao không bù được cho một đầu ra chưa đạt, vì đầu ra là thứ tầng sau xây lên trên.',
        khongDay: [...n.khongDay, cauHinh.themKhongDay],
        gita,
      });
    });
  }
  cache = ra;
  return ra;
}

export const deCuongCuaTuyen = (tuyenId: string): DeCuong[] =>
  deCuong().filter((d) => d.tuyenId === tuyenId);

export const DECUONG_SO = {
  soDeCuong: deCuong().length,
  soTuyen: TUYEN.length,
  soTang: NEN_TANG.length,
  soDauRa: deCuong().reduce((s, d) => s + d.dauRa.length, 0),
  soTuan: deCuong().reduce((s, d) => s + d.tuan.length, 0),
  soRanhGioi: deCuong().reduce((s, d) => s + d.khongDay.length, 0),
  soViecGita: deCuong().reduce((s, d) => s + d.gita.length, 0),
  tongTuanHoc: deCuong().reduce((s, d) => s + d.soTuan, 0),
};
