/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {Symptom, Solution, SkillId} from '../types';
import {LEVELS} from './levels';

/* ==========================================================================
   KHO GIẢI PHÁP
   Một nghìn đơn kê, sinh ra từ 40 TRIỆU CHỨNG × 25 CẤP ĐỘ.

   Nói thẳng cách kho này được tạo ra: đây KHÔNG phải một nghìn đoạn văn viết
   tay rời rạc. Đó sẽ là một nghìn đoạn na ná nhau, viết vội và không ai kiểm
   được. Thay vào đó, mỗi triệu chứng được viết kỹ MỘT lần — nguyên nhân gốc,
   việc phải làm, bài luyện, cách đo lại — rồi được đặt vào từng cấp độ, nơi
   tầng quyết định HỌC LIỆU và liều lượng, còn cấp quyết định NGƯỠNG phải đạt.

   Vì sao cách này đúng hơn: cùng một triệu chứng "nghe hụt âm cuối" cần một
   đơn khác hẳn ở tầng 1 (đoạn 45 giây có hình minh hoạ) so với tầng 5 (bài
   giảng học thuật 8 phút). Cái không đổi là NGUYÊN NHÂN; cái phải đổi là học
   liệu, liều và ngưỡng. Đó chính xác là những gì hàm sinh bên dưới làm.
   ========================================================================== */

export const SOLUTION_CREED = {
  name: 'KHO 1.000 GIẢI PHÁP',
  claim:
    'Bốn mươi triệu chứng nhân hai mươi lăm cấp độ, mỗi ô là một đơn kê cụ thể cho đúng người ở đúng chỗ.',
  rule:
    'Mỗi lần chỉ kê tối đa ba đơn. Kê nhiều hơn là cách chắc chắn để không đơn nào được làm.',
  limit:
    'Kho này giải quyết vấn đề KỸ THUẬT HỌC. Nó không giải quyết được vấn đề đời sống — mất việc, ốm, con nhỏ, mất động lực. Khi hai đơn liên tiếp không có tác dụng, gần như chắc chắn vấn đề nằm ở nhóm sau, và lúc đó phải là người thật ngồi xuống nói chuyện.',
};

/* --------------------- BỐN MƯƠI TRIỆU CHỨNG ----------------------------- */

interface SymptomSpec extends Symptom {
  /** Việc cốt lõi phải làm — không đổi theo tầng. */
  fix: string;
  /** Bài luyện bảy ngày — không đổi theo tầng. */
  drill: string;
  /** Khi nào phải chuyển cho người thật. */
  escalate: string;
}

const S = (
  id: string,
  skill: SkillId,
  name: string,
  saidAs: string,
  rootCause: string,
  metric: string,
  fix: string,
  drill: string,
  escalate: string,
): SymptomSpec => ({id, skill, name, saidAs, rootCause, metric, fix, drill, escalate});

export const SYMPTOMS: SymptomSpec[] = [
  /* ------------------------------- NGHE -------------------------------- */
  S('sy-l1', 'listening', 'Nghe hụt âm cuối',
    'Em biết hết từ mà vẫn không nghe ra câu.',
    'Tiếng Việt không có phụ âm cuối bật hơi, nên tai chưa được huấn luyện để bắt /t/, /d/, /s/, /z/ ở cuối từ. Não bỏ qua chúng như bỏ qua tiếng ồn.',
    'Tỉ lệ chép đúng âm cuối trong bài chép chính tả',
    'Chép chính tả rồi khoanh riêng những chỗ hụt âm cuối, không khoanh chung với lỗi không biết từ.',
    'Mỗi ngày một đoạn, chép hai lần: lần một nghe bình thường, lần hai chỉ nghe âm cuối và đánh dấu.',
    'Sau 14 ngày mà tỉ lệ không nhích thì có thể là vấn đề thính lực, cần kiểm tra tai.'),
  S('sy-l2', 'listening', 'Không tách được ranh giới từ',
    'Người ta nói nhanh quá, em nghe thành một khối.',
    'Người bản ngữ nối âm cuối của từ trước vào âm đầu của từ sau, nên ranh giới từ trong âm thanh không trùng với ranh giới từ trên giấy.',
    'Số từ nhận ra được trong một đoạn hai phút',
    'Nghe cùng một đoạn ba lần: lần một không nhìn gì, lần hai nhìn transcript, lần ba lại không nhìn.',
    'Bảy ngày, mỗi ngày một đoạn mới, luôn theo đúng ba lượt đó.',
    'Nếu lượt ba vẫn không hơn lượt một sau 7 ngày, đoạn đang chọn quá khó — cần cố vấn chọn lại mức.'),
  S('sy-l3', 'listening', 'Dịch ngầm trong đầu khi nghe',
    'Em phải dịch sang tiếng Việt mới hiểu, mà dịch xong thì họ nói tới câu khác rồi.',
    'Đường truy xuất đang đi vòng qua tiếng Việt. Đây là thói quen được củng cố bởi cách học từ vựng kiểu từ-nghĩa.',
    'Độ trễ trung bình ở khối bắn phản xạ',
    'Nghe với tốc độ cao hơn bình thường 15% để não không kịp dịch, rồi mới trả về tốc độ thường.',
    'Bảy ngày, mỗi ngày 10 phút nghe ở tốc độ 1,15 lần rồi 5 phút ở tốc độ thường.',
    'Nếu độ trễ không giảm sau hai vòng 7 ngày, cần đổi sang phương pháp ánh xạ tình huống, có cố vấn kèm.'),
  S('sy-l4', 'listening', 'Nghe được người quen, không nghe được người lạ',
    'Em nghe cô giáo thì hiểu, nghe phim thì chịu.',
    'Não đã quen đúng một giọng và một tốc độ. Kỹ năng chưa chuyển giao được sang bối cảnh khác.',
    'Chênh lệch điểm giữa bài quen và bài chuyển giao bối cảnh lạ',
    'Mỗi ngày đổi một giọng khác nhau: khác vùng miền, khác giới, khác tốc độ.',
    'Bảy ngày, bảy người nói khác nhau, cùng một chủ đề.',
    'Nếu chênh lệch vẫn quá một bậc sau 14 ngày, cần rà lại toàn bộ nguồn học liệu đang dùng.'),
  S('sy-l5', 'listening', 'Mất tập trung sau vài phút nghe',
    'Nghe được hai phút là đầu em trôi đi đâu mất.',
    'Nghe thụ động không có nhiệm vụ đi kèm thì não không có lý do để giữ chú ý.',
    'Thời gian nghe liên tục mà vẫn trả lời đúng câu hỏi kiểm tra',
    'Luôn gắn một nhiệm vụ cụ thể vào mỗi lần nghe: đếm số lần xuất hiện một từ, bắt ba con số, ghi năm bước.',
    'Bảy ngày, mỗi ngày một nhiệm vụ khác nhau trên đoạn nghe của ngày.',
    'Nếu vẫn trôi sau 7 ngày dù có nhiệm vụ, xem lại giờ nghe — có thể đang nghe lúc quá mệt.'),

  /* -------------------------------- NÓI -------------------------------- */
  S('sy-s1', 'speaking', 'Sợ nói sai nên không nói',
    'Em biết mà không dám nói, sợ sai.',
    'Nỗi sợ đánh giá lớn hơn động lực luyện tập. Đây là vấn đề bản sắc, không phải vấn đề ngôn ngữ.',
    'Số phút nói ra tiếng mỗi ngày',
    'Nói một mình, có ghi âm, không có người nghe. Tách việc luyện khỏi việc bị đánh giá.',
    'Bảy ngày, mỗi ngày ghi âm 3 phút, KHÔNG nghe lại trong 7 ngày đó. Ngày thứ tám mới nghe.',
    'Nếu sau 7 ngày vẫn không ghi âm nổi, đây là vấn đề tâm lý cần cố vấn, không phải bài tập.'),
  S('sy-s2', 'speaking', 'Nói được câu ngắn, sập ở câu dài',
    'Em nói ba, bốn từ là hết, không nối dài được.',
    'Chưa có sẵn khung câu trong trí nhớ làm việc, nên mỗi từ phải xây lại từ đầu.',
    'Độ dài trung bình của một lượt nói, tính bằng giây',
    'Học khung câu, không học từ rời: "The reason I ... is that ...", "What I mean is ...".',
    'Bảy ngày, mỗi ngày ba khung câu, mỗi khung đặt năm câu của chính mình.',
    'Nếu độ dài không tăng sau hai vòng, có thể vốn từ đang là nút thắt thật sự.'),
  S('sy-s3', 'speaking', 'Nhiều từ đệm',
    'Em cứ "ờ", "à" suốt, nghe rất thiếu tự tin.',
    'Từ đệm là chỗ trám cho khoảng thời gian não đang truy xuất. Cấm từ đệm mà không tăng tốc truy xuất thì chỉ đổi thành im lặng lúng túng.',
    'Số từ đệm mỗi phút',
    'Thay từ đệm bằng khoảng lặng có chủ ý. Im lặng một giây nghe chững chạc hơn "ờ" một giây.',
    'Bảy ngày, mỗi ngày nói 2 phút, nghe lại và đếm chính xác số từ đệm, ghi vào bảng.',
    'Nếu số từ đệm giảm nhưng khoảng dừng dài ra quá 4 giây, cần quay lại luyện tốc độ truy xuất trước.'),
  S('sy-s4', 'speaking', 'Nói đúng ngữ pháp nhưng nghe không tự nhiên',
    'Em nói không sai gì mà người ta bảo nghe cứng.',
    'Đang ghép từ theo quy tắc thay vì dùng cụm có sẵn. Người bản ngữ nói bằng cụm, không bằng từ.',
    'Tỉ lệ cụm tự nhiên trong một bài nói 2 phút',
    'Thu thập cụm từ nghe được trong ngày rồi ép mình dùng lại trong ngày đó.',
    'Bảy ngày, mỗi ngày bắt 10 cụm và dùng 7 trong số đó.',
    'Nếu vẫn cứng sau 14 ngày, cần người bản ngữ hoặc cố vấn nghe và chỉ ra chỗ cứng cụ thể.'),
  S('sy-s5', 'speaking', 'Trả lời được, không hỏi lại được',
    'Em trả lời thì được, nhưng không biết hỏi tiếp nên hội thoại chết.',
    'Chỉ luyện vai người trả lời. Vai người dẫn chưa từng được luyện.',
    'Số câu hỏi mở đặt được trong một cuộc thoại 5 phút',
    'Luyện riêng bộ câu hỏi tiếp nối: hỏi thêm chi tiết, hỏi lý do, hỏi ví dụ, hỏi cảm nhận.',
    'Bảy ngày, mỗi ngày hỏi tiếp năm lần liên tiếp từ một câu trả lời bất kỳ.',
    'Nếu vẫn bí, cần luyện cặp đôi với người thật, không luyện một mình được.'),

  /* -------------------------------- ĐỌC -------------------------------- */
  S('sy-r1', 'reading', 'Dừng lại tra mọi từ chưa biết',
    'Cứ gặp từ lạ là em phải tra, đọc một trang mất cả tiếng.',
    'Chưa chịu được sự mơ hồ. Nhưng đọc hiểu vốn không đòi hỏi biết hết từ.',
    'Số từ đọc được mỗi phút',
    'Đọc một mạch tới hết, gạch chân từ lạ nhưng KHÔNG tra cho tới khi đọc xong.',
    'Bảy ngày, mỗi ngày một bài, luôn theo đúng luật đó.',
    'Nếu tỉ lệ hiểu tụt dưới 60% khi không tra, bài đang quá khó — cần hạ mức học liệu.'),
  S('sy-r2', 'reading', 'Đọc xong không nhớ gì',
    'Em đọc hết bài mà hỏi lại thì không nói được gì.',
    'Mắt lướt qua chữ nhưng não không xử lý ý. Thiếu bước truy hồi chủ động.',
    'Số ý chính kể lại được sau khi gấp bài',
    'Sau mỗi đoạn, gấp bài lại và nói ra một câu tóm ý đoạn đó.',
    'Bảy ngày, mỗi ngày một bài, tóm từng đoạn trước khi đọc tiếp.',
    'Nếu vẫn không nhớ, thử đọc to thành tiếng — có người xử lý bằng tai tốt hơn bằng mắt.'),
  S('sy-r3', 'reading', 'Đọc chậm vì đọc thầm từng chữ',
    'Em đọc trong đầu từng chữ một nên chậm lắm.',
    'Đang đọc bằng đường âm thanh, tốc độ bị chặn ở tốc độ nói.',
    'Số từ đọc được mỗi phút',
    'Dùng ngón tay hoặc con trỏ kéo nhanh hơn tốc độ đọc thầm, ép mắt chạy theo.',
    'Bảy ngày, mỗi ngày 10 phút đọc có dẫn tốc, tăng dần 10% mỗi ngày.',
    'Nếu tốc độ tăng mà hiểu tụt quá 20%, đang đẩy quá nhanh — lùi lại một nấc.'),
  S('sy-r4', 'reading', 'Không tìm ra thông tin trong đề thi',
    'Em hiểu bài nhưng không tìm được chỗ chứa đáp án.',
    'Đang đọc tuần tự từ đầu, chưa có kỹ thuật quét theo từ khoá.',
    'Thời gian tìm ra đáp án cho một câu hỏi',
    'Đọc câu hỏi trước, gạch từ khoá, rồi mới quét bài tìm chính từ khoá đó hoặc từ đồng nghĩa.',
    'Bảy ngày, mỗi ngày 15 câu hỏi, luôn theo đúng thứ tự đó.',
    'Nếu vẫn chậm, vấn đề có thể là vốn từ đồng nghĩa — cần luyện riêng.'),
  S('sy-r5', 'reading', 'Không nhận ra quan điểm của tác giả',
    'Em hiểu từng câu nhưng không biết tác giả đang nghiêng về bên nào.',
    'Chưa bắt được các tín hiệu thái độ: từ hạn định, từ nhượng bộ, từ chỉ mức độ chắc chắn.',
    'Tỉ lệ đúng ở nhóm câu hỏi về quan điểm và thái độ',
    'Đọc và khoanh riêng mọi từ chỉ thái độ, bỏ qua nội dung sự kiện.',
    'Bảy ngày, mỗi ngày một bài xã luận, chỉ khoanh từ thái độ và đoán quan điểm.',
    'Nếu đoán sai quá nửa sau 7 ngày, cần cố vấn giảng trực tiếp về nhóm tín hiệu này.'),

  /* ------------------------------- VIẾT -------------------------------- */
  S('sy-w1', 'writing', 'Viết ra là dịch từ tiếng Việt',
    'Em nghĩ bằng tiếng Việt rồi dịch, nên câu nghe rất lạ.',
    'Đang xây câu từ cấu trúc tiếng Việt. Trật tự thông tin của hai ngôn ngữ khác nhau.',
    'Số câu bị người chấm đánh dấu là không tự nhiên trên 100 từ',
    'Bắt đầu từ khung câu tiếng Anh có sẵn rồi điền nội dung, thay vì dịch câu tiếng Việt đã nghĩ ra.',
    'Bảy ngày, mỗi ngày viết 5 câu bằng 5 khung câu cho trước, không được nghĩ tiếng Việt trước.',
    'Nếu vẫn dịch, thử viết bằng cách nói ra trước rồi chép lại — nói ít đi vòng qua tiếng Việt hơn viết.'),
  S('sy-w2', 'writing', 'Đoạn văn không có xương sống',
    'Em viết đủ ý mà người chấm bảo đoạn lủng củng.',
    'Thiếu cấu trúc đoạn: câu chủ đề, luận cứ, ví dụ, câu chốt.',
    'Điểm tiêu chí mạch lạc và liên kết',
    'Viết dàn ý bốn dòng trước, rồi mới viết đoạn. Không viết thẳng.',
    'Bảy ngày, mỗi ngày một đoạn 120 từ, luôn có dàn ý bốn dòng nộp kèm.',
    'Nếu đoạn vẫn rối dù có dàn ý, vấn đề nằm ở tư duy lập luận, cần cố vấn kèm riêng.'),
  S('sy-w3', 'writing', 'Lặp lại một nhóm từ',
    'Em cứ dùng đi dùng lại mấy từ đó, không biết thay bằng gì.',
    'Vốn từ chủ động hẹp hơn vốn từ bị động rất nhiều. Biết nhiều nhưng dùng được ít.',
    'Số từ khác nhau trên tổng số từ trong một bài 250 từ',
    'Lấy bài cũ của mình, thay 10 từ lặp bằng từ khác, mỗi từ đặt lại một câu.',
    'Bảy ngày, mỗi ngày một bài cũ, thay 10 từ.',
    'Nếu không tìm được từ thay, đây là vấn đề vốn từ chứ không phải kỹ năng viết.'),
  S('sy-w4', 'writing', 'Viết không kịp giờ',
    'Em viết được nhưng không bao giờ xong trong thời gian thi.',
    'Đang sửa trong lúc viết. Viết và sửa là hai chế độ khác nhau, làm cùng lúc thì cả hai đều chậm.',
    'Số từ viết được trong 20 phút',
    'Tách hẳn hai giai đoạn: viết một mạch không sửa, hết giờ mới đọc lại.',
    'Bảy ngày, mỗi ngày viết bấm giờ, cấm tuyệt đối sửa giữa chừng.',
    'Nếu vẫn không kịp, cần rút gọn dàn ý — có thể đang định viết quá nhiều ý.'),
  S('sy-w5', 'writing', 'Lỗi ngữ pháp lặp lại mãi',
    'Cùng một lỗi em bị nhắc bao nhiêu lần vẫn sai.',
    'Đang sửa từng bài chứ không sửa cái quy tắc. Lỗi được chỉ ra nhưng không được luyện lại.',
    'Số lần một mã lỗi xuất hiện lại sau khi đã được sửa',
    'Mỗi lỗi được chỉ ra phải kèm 10 câu tự đặt dùng đúng quy tắc đó, làm ngay trong ngày.',
    'Bảy ngày, mỗi ngày lấy một lỗi cũ trong sổ và đặt 10 câu.',
    'Nếu một lỗi tái phát quá ba lần dù đã luyện, cần cố vấn giảng lại quy tắc từ đầu.'),

  /* ------------------------------ TỪ VỰNG ------------------------------ */
  S('sy-v1', 'vocabulary', 'Học từ xong quên ngay',
    'Em học 50 từ một tối, hôm sau quên sạch.',
    'Nhồi một lần rồi không gặp lại. Trí nhớ cần gặp lại đúng lúc sắp quên, không cần gặp nhiều lần liền nhau.',
    'Tỉ lệ nhớ lại sau 7 ngày',
    'Chia nhỏ: 10 từ mỗi ngày, và gặp lại theo lịch 1, 3, 7, 14, 30 ngày.',
    'Bảy ngày, mỗi ngày 10 từ mới cộng toàn bộ từ đến hạn ôn.',
    'Nếu tỉ lệ nhớ vẫn dưới 60% sau hai vòng, số lượng đang quá nhiều — giảm còn 5 từ mỗi ngày.'),
  S('sy-v2', 'vocabulary', 'Biết nghĩa nhưng không dùng được',
    'Em hiểu khi đọc thấy, nhưng lúc cần thì không nghĩ ra.',
    'Chỉ có vốn từ bị động. Từ được lưu theo hướng từ-nghĩa, không lưu theo hướng ý-từ.',
    'Số từ mục tiêu dùng được trong bài nói 2 phút',
    'Với mỗi từ mới, đặt một câu về chính đời mình, không lấy câu mẫu.',
    'Bảy ngày, mỗi ngày lấy 7 từ cũ và ép dùng trong một đoạn nói 2 phút.',
    'Nếu vẫn không bật ra, cần luyện dưới áp lực thời gian, có người bấm giờ.'),
  S('sy-v3', 'vocabulary', 'Học từ đơn lẻ, ghép lại thành câu sai',
    'Em biết từng từ nhưng ghép vào là sai.',
    'Từ trong tiếng Anh đi theo cụm cố định. Học từ rời thì không biết nó đi với từ nào.',
    'Số lỗi kết hợp từ trên 100 từ viết ra',
    'Không bao giờ ghi từ một mình. Luôn ghi cả cụm đi kèm.',
    'Bảy ngày, mỗi ngày chuyển 10 từ trong sổ cũ thành cụm.',
    'Nếu không biết cụm nào đúng, cần từ điển kết hợp từ, không tra từ điển thường.'),
  S('sy-v4', 'vocabulary', 'Vốn từ hẹp trong chủ đề học thuật',
    'Từ đời thường thì em ổn, vào bài học thuật là bí.',
    'Đầu vào toàn nội dung giải trí. Vốn từ phản ánh đúng những gì được tiếp xúc.',
    'Tỉ lệ hiểu một bài học thuật chưa từng đọc',
    'Đổi một nửa lượng đầu vào hằng ngày sang nội dung học thuật cùng chủ đề mình thích.',
    'Bảy ngày, mỗi ngày một bài học thuật ngắn về đúng lĩnh vực mình quan tâm.',
    'Nếu quá khó tới mức nản, hạ xuống bài phổ thông khoa học trước, đừng nhảy thẳng.'),
  S('sy-v5', 'vocabulary', 'Nhớ từ nhưng phát âm sai nên không nghe ra',
    'Em thuộc từ này mà nghe trong bài lại không nhận ra.',
    'Từ được lưu với hình dạng âm thanh SAI. Não tìm một thứ không tồn tại trong dòng âm.',
    'Số từ đã học nhưng không nhận ra khi nghe',
    'Mỗi từ mới phải nghe phát âm chuẩn và đọc to ba lần ngay lúc ghi.',
    'Bảy ngày, mỗi ngày rà 15 từ cũ, nghe lại và sửa những từ đã lưu sai âm.',
    'Nếu số từ lưu sai quá nhiều, cần rà toàn bộ sổ từ với cố vấn, không tự làm nổi.'),

  /* ----------------------------- NGỮ PHÁP ------------------------------ */
  S('sy-g1', 'grammar', 'Thuộc quy tắc nhưng nói vẫn sai',
    'Em học thuộc hết công thức mà nói ra vẫn sai.',
    'Kiến thức tường minh chưa chuyển thành phản xạ. Biết quy tắc và dùng đúng quy tắc là hai năng lực khác nhau.',
    'Số lỗi ngữ pháp mỗi phút nói',
    'Luyện đúng MỘT cấu trúc mỗi tuần cho tới khi bật ra không cần nghĩ.',
    'Bảy ngày, một cấu trúc, mỗi ngày 20 câu nói to có bấm giờ.',
    'Nếu sau hai tuần vẫn sai cấu trúc đó khi nói, cần bỏ qua tạm và quay lại sau — ép quá sẽ chặn cả những chỗ đang đúng.'),
  S('sy-g2', 'grammar', 'Sai thì quá khứ',
    'Em cứ kể chuyện là quên chia thì.',
    'Tiếng Việt không đánh dấu thì trên động từ, nên bước này không tồn tại trong phản xạ gốc.',
    'Số lỗi thì trên 100 từ',
    'Kể lại chuyện đã xảy ra, ghi âm, nghe lại và tự khoanh mọi động từ.',
    'Bảy ngày, mỗi ngày kể một chuyện 2 phút bằng thì quá khứ, tự khoanh lỗi.',
    'Nếu tỉ lệ lỗi không giảm sau 14 ngày, cần luyện chậm có người sửa ngay tại chỗ.'),
  S('sy-g3', 'grammar', 'Sai mạo từ',
    'Em không biết khi nào dùng "a", khi nào "the", khi nào không cần.',
    'Tiếng Việt không có mạo từ. Đây là lỗi tồn tại lâu nhất, kể cả ở người trình độ cao.',
    'Số lỗi mạo từ trên 100 từ',
    'Đọc một đoạn và xoá hết mạo từ, rồi tự điền lại, sau đó đối chiếu.',
    'Bảy ngày, mỗi ngày một đoạn 150 từ theo cách đó.',
    'Chấp nhận đây là lỗi lâu dài. Nếu dưới 3 lỗi trên 100 từ thì đã tốt hơn phần lớn người học.'),
  S('sy-g4', 'grammar', 'Câu quá dài, mất kiểm soát',
    'Em muốn viết câu hay nên viết dài, rồi rối.',
    'Nhầm câu phức với câu hay. Câu dài chỉ hay khi kiểm soát được.',
    'Số từ trung bình mỗi câu, và số câu bị đánh dấu là rối',
    'Cắt mọi câu trên 25 từ thành hai câu, đọc lại xem có mất ý không.',
    'Bảy ngày, mỗi ngày lấy một bài cũ và cắt hết câu dài.',
    'Nếu cắt xong thấy hay hơn, giữ luôn thói quen đó — câu ngắn không phải câu kém.'),
  S('sy-g5', 'grammar', 'Không dùng được câu bị động và mệnh đề quan hệ',
    'Em biết công thức nhưng không bao giờ nghĩ ra để dùng.',
    'Chưa hiểu hai cấu trúc này dùng ĐỂ LÀM GÌ, chỉ học chúng LÀ GÌ.',
    'Số lần dùng đúng và tự nhiên trong một bài viết 250 từ',
    'Học theo chức năng: bị động dùng khi người làm không quan trọng; mệnh đề quan hệ dùng để gộp hai câu về cùng một thứ.',
    'Bảy ngày, mỗi ngày viết 5 cặp câu rồi gộp lại bằng mệnh đề quan hệ.',
    'Nếu vẫn không tự bật ra, đây là cấu trúc nâng cao — có thể tạm để sau và ưu tiên chỗ khác.'),

  /* ----------------------------- PHÁT ÂM ------------------------------- */
  S('sy-p1', 'pronunciation', 'Rụng âm cuối khi nói',
    'Em nói "want" thành "won", người nghe không hiểu.',
    'Tiếng Việt kết thúc âm tiết bằng phụ âm đóng không bật hơi. Cơ miệng chưa có thói quen bật âm cuối.',
    'Tỉ lệ âm cuối phát ra được, đo trên bản ghi 20 câu',
    'Nói chậm và cố ý bật mạnh âm cuối tới mức nghe hơi quá — rồi mới về tốc độ thường.',
    'Bảy ngày, mỗi ngày 20 câu có âm cuối khó, ghi âm và tự nghe lại.',
    'Nếu tự nghe không phân biệt được có bật hay không, cần người khác nghe giúp.'),
  S('sy-p2', 'pronunciation', 'Sai trọng âm từ',
    'Em phát âm đúng từng âm mà người ta vẫn không hiểu.',
    'Tiếng Anh nhận diện từ chủ yếu qua trọng âm. Sai trọng âm làm hỏng từ nhiều hơn sai một âm.',
    'Tỉ lệ từ đặt đúng trọng âm trong bài đọc 100 từ',
    'Với mỗi từ ba âm tiết trở lên, vỗ tay vào âm tiết mang trọng âm khi đọc.',
    'Bảy ngày, mỗi ngày 20 từ dài, luôn vỗ tay.',
    'Nếu sai nhiều ở nhóm từ có hậu tố, cần học riêng quy tắc dịch chuyển trọng âm.'),
  S('sy-p3', 'pronunciation', 'Không phân biệt cặp âm gần nhau',
    'Với em thì "ship" và "sheep" nghe y hệt.',
    'Hai âm này thuộc cùng một ô trong hệ âm tiếng Việt, nên tai chưa từng cần tách chúng.',
    'Tỉ lệ đúng trong bài kiểm tra cặp âm tối thiểu',
    'Luyện phân biệt bằng tai TRƯỚC khi luyện phát ra. Nghe không ra thì nói không đúng được.',
    'Bảy ngày, mỗi ngày 30 cặp âm, nghe và chọn, chỉ sang bước nói khi đạt trên 85%.',
    'Nếu không vượt 70% sau 14 ngày, cần cố vấn hướng dẫn trực tiếp vị trí lưỡi.'),
  S('sy-p4', 'pronunciation', 'Nói đều đều, không có nhạc điệu',
    'Em nói đúng từ mà nghe như máy đọc.',
    'Tiếng Việt là ngôn ngữ thanh điệu theo từng âm tiết; tiếng Anh có nhịp theo trọng âm câu. Hai hệ nhịp khác hẳn nhau.',
    'Biến thiên cao độ đo trên bản ghi 2 phút',
    'Mỗi câu chọn TRƯỚC một từ để nhấn, rồi mới đọc. Một từ, không phải ba.',
    'Bảy ngày, mỗi ngày 10 câu, đánh dấu từ nhấn trước khi đọc.',
    'Nếu nhấn nghe gượng, đang nhấn quá nhiều từ — quay lại đúng một từ mỗi câu.'),
  S('sy-p5', 'pronunciation', 'Không nối âm nên nghe rời rạc',
    'Em nói từng từ tách bạch, nghe rất khác người bản ngữ.',
    'Đang phát âm theo mặt chữ. Người bản ngữ nối phụ âm cuối vào nguyên âm đầu của từ sau.',
    'Số chỗ nối âm thực hiện được trong một đoạn đọc 1 phút',
    'Chép lại câu theo cách nó ĐƯỢC NÓI, không theo cách nó được viết, rồi đọc theo bản chép đó.',
    'Bảy ngày, mỗi ngày 10 câu, chép theo âm rồi đọc.',
    'Nếu nối âm làm mất âm cuối, quay lại triệu chứng rụng âm cuối trước — thứ tự này quan trọng.'),

  /* --------------------------- TƯ DUY · ĐỘNG LỰC ----------------------- */
  S('sy-m1', 'mindset', 'Đứt chuỗi rồi bỏ luôn',
    'Em nghỉ hai hôm rồi thấy nản, bỏ luôn cả tháng.',
    'Đang theo tư duy được-mất: đứt một ngày thì coi như hỏng cả. Đây là nguyên nhân bỏ cuộc số một.',
    'Số ngày từ lúc đứt chuỗi đến lúc quay lại',
    'Đặt luật hai ngày: được phép nghỉ một ngày, không bao giờ nghỉ hai ngày liên tiếp.',
    'Bảy ngày, mỗi ngày làm bản tối thiểu 10 phút, kể cả ngày tệ nhất.',
    'Nếu đứt quá 7 ngày liên tiếp hai lần trong một quý, cần ngồi lại với cố vấn về lịch sinh hoạt.'),
  S('sy-m2', 'mindset', 'So sánh với người khác rồi tự ti',
    'Bạn em học sau mà giỏi hơn, em thấy mình vô dụng.',
    'Đang so điểm hiện tại với điểm hiện tại của người khác, thay vì so mình hôm nay với mình ba tháng trước.',
    'Chênh lệch giữa chính mình hôm nay và chính mình 90 ngày trước',
    'Chỉ nhìn một bảng duy nhất: bảng của chính mình theo thời gian. Hệ thống không có bảng xếp hạng.',
    'Bảy ngày, mỗi ngày xem lại một bản ghi cũ của chính mình cách đây trên 60 ngày.',
    'Nếu vẫn tự ti dù thấy tiến bộ rõ, đây là vấn đề ngoài phạm vi học tập.'),
  S('sy-m3', 'mindset', 'Học vì thi, thi xong bỏ',
    'Em chỉ cần đủ điểm là dừng.',
    'Mục tiêu neo vào một con số bên ngoài, không neo vào con người muốn trở thành.',
    'Số ngày duy trì học sau khi đạt mốc điểm',
    'Viết lại mục tiêu ở dạng năng lực dùng được, không ở dạng điểm số.',
    'Bảy ngày, mỗi ngày một nhiệm vụ đời thật có người thật ở đầu kia.',
    'Nếu mục tiêu thật sự chỉ là tấm bằng, hãy nói thẳng điều đó — lộ trình sẽ ngắn lại và trung thực hơn.'),
  S('sy-m4', 'mindset', 'Cầu toàn nên không bắt đầu',
    'Em muốn chuẩn bị đầy đủ rồi mới bắt đầu, mà chưa bao giờ thấy đủ.',
    'Chuẩn bị là hình thức trì hoãn dễ được chấp nhận nhất, vì nó trông giống làm việc.',
    'Số ngày từ lúc lập kế hoạch tới lúc làm buổi đầu tiên',
    'Bắt đầu bằng bản tệ nhất có thể chấp nhận: 10 phút, một bản ghi âm, không sửa.',
    'Bảy ngày, mỗi ngày làm bản 10 phút, cấm sửa, cấm làm lại.',
    'Nếu vẫn không bắt đầu nổi, cần cố vấn ngồi cùng buổi đầu tiên.'),
  S('sy-m5', 'mindset', 'Cày nhiều giờ mà không tiến bộ',
    'Em học 3 tiếng mỗi ngày suốt hai tháng mà không khá hơn.',
    'Đang luyện trong vùng đã thoải mái. Số giờ chỉ tạo tiến bộ khi rơi vào vùng vừa quá sức.',
    'Độ dốc tiến bộ trên mỗi giờ bỏ ra',
    'Giảm một nửa thời lượng, dồn toàn bộ vào phần khó nhất mà mình vẫn tránh.',
    'Bảy ngày, mỗi ngày 45 phút nhưng chỉ làm đúng thứ mình ngại nhất.',
    'Nếu vẫn phẳng sau 14 ngày, cần cố vấn xem trực tiếp buổi học — thường có lỗi cách làm mà tự mình không thấy.'),
];

/* --------------------- NĂM TẦNG: HỌC LIỆU VÀ LIỀU ----------------------- */

const TIER_FRAME = [
  {
    tier: 1,
    name: 'KHAI NHĨ',
    material: 'đoạn 45–90 giây, có hình ảnh minh hoạ, mức A1',
    dose: 'Mỗi buổi một đơn vị, không hơn.',
    strictness: 'Ngưỡng dễ thở — mục tiêu lúc này là giữ chuỗi ngày, không phải đạt chuẩn.',
  },
  {
    tier: 2,
    name: 'KHAI NHÃN',
    material: 'đoạn 2–3 phút có transcript, mức A2',
    dose: 'Mỗi buổi hai đơn vị, có đối chiếu transcript sau khi làm.',
    strictness: 'Ngưỡng vừa — bắt đầu tính điểm nhưng chưa tính vào quyết định lên cấp.',
  },
  {
    tier: 3,
    name: 'KHAI KHẨU',
    material: 'nội dung 4–5 phút không transcript, mức B1',
    dose: 'Mỗi buổi ba đơn vị, bắt buộc có phần tạo ra đầu ra bằng miệng.',
    strictness: 'Ngưỡng chuẩn — kết quả tính vào quyết định lên cấp.',
  },
  {
    tier: 4,
    name: 'KHAI THỦ',
    material: 'nội dung thật 6–8 phút, giọng và tốc độ tự nhiên, mức B2',
    dose: 'Mỗi buổi ba đơn vị, và một nhiệm vụ đời thật có người thật.',
    strictness: 'Ngưỡng cao — phải đạt cả trong bối cảnh lạ, không chỉ bối cảnh quen.',
  },
  {
    tier: 5,
    name: 'KHAI ĐẠO',
    material: 'nội dung học thuật hoặc chuyên ngành trên 8 phút, mức C1',
    dose: 'Mỗi buổi ba đơn vị, và một buổi giảng lại cho người khác.',
    strictness:
      'Ngưỡng cao nhất — đạt nghĩa là dạy lại được cho người chưa biết và họ làm theo được.',
  },
];

/* --------------------------- SINH KHO ĐƠN KÊ ---------------------------- */

/**
 * Sinh đủ 1.000 đơn kê từ 40 triệu chứng × 25 cấp độ.
 *
 * Hàm thuần: cùng đầu vào luôn cho cùng kết quả. Tầng quyết định học liệu và
 * liều; cấp trong tầng quyết định liều lượng cụ thể và độ chặt của ngưỡng.
 */
export function buildSolutions(): Solution[] {
  const out: Solution[] = [];
  for (const s of SYMPTOMS) {
    for (const lv of LEVELS) {
      const tier = Number(lv.tierId.replace('tier-', ''));
      const f = TIER_FRAME[tier - 1];
      // LevelBadge.no đánh số 1..5 TRONG TỪNG TẦNG, không phải 1..25 toàn
      // cục — nên dùng thẳng, không trừ gì cả.
      const cap = lv.no;
      const phutHomNay = 8 + cap * 2; // 10 → 18 phút
      const phutTuan = phutHomNay * 7;

      out.push({
        id: `${s.id}__${lv.id}`,
        symptomId: s.id,
        levelId: lv.id,
        tier,
        diagnose:
          `${s.rootCause} Ở tầng ${f.name}, cấp ${cap}/5 (${lv.name}), ` +
          `${f.strictness.charAt(0).toLowerCase()}${f.strictness.slice(1)}`,
        today:
          `${s.fix} Dùng ${f.material}. Hôm nay làm ${phutHomNay} phút, ` +
          `không làm thêm dù thấy còn sức.`,
        sevenDay:
          `${s.drill} ${f.dose} Bảy ngày, tổng ${phutTuan} phút — ` +
          `chia đều mỗi ngày, không dồn.`,
        remeasure:
          `Đo lại bằng: ${s.metric}. So với chính con số của bạn trước khi ` +
          `nhận đơn này, không so với ai khác.`,
        escalate: s.escalate,
      });
    }
  }
  return out;
}

let _kho: Solution[] | null = null;

/** Dựng kho ở lần gọi đầu tiên rồi giữ lại. */
export function solutions(): Solution[] {
  if (_kho === null) _kho = buildSolutions();
  return _kho;
}

/** Tra đơn kê cho một triệu chứng ở một cấp độ. */
export function prescribe(symptomId: string, levelId: string): Solution | undefined {
  return solutions().find(
    (x) => x.symptomId === symptomId && x.levelId === levelId,
  );
}
