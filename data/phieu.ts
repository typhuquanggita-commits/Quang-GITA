/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {SkillId, Phieu, PhanPhieu, NhiemVu, BuocLam, DiemPhan, KetQuaPhieu, XetNangCap} from '../types';
import {LEVELS} from './levels';

/* ==========================================================================
   HAI NGHÌN PHIẾU LUYỆN VÀ HAI NGHÌN NHIỆM VỤ CHIA SẺ

   Sinh ra từ 80 DẠNG BÀI × 25 CẤP ĐỘ. Nói thẳng cách làm, như kho 1.000 giải
   pháp đã nói: đây KHÔNG phải hai nghìn phiếu viết tay rời rạc — đó sẽ là hai
   nghìn phiếu na ná nhau, viết vội, không ai kiểm được.

   Mỗi dạng bài được viết kỹ MỘT lần: luyện cái gì, năm phần làm gì, bẫy nằm ở
   đâu, nối sang bài luyện nào. Rồi đặt vào từng cấp độ, nơi TẦNG quyết định
   học liệu và liều lượng, còn CẤP quyết định ngưỡng phải đạt.

   NĂM PHẦN NỐI NHAU THÀNH MỘT CHUỖI, KHÔNG ĐẢO ĐƯỢC
     KHỞI  → gọi lại cái đã biết, để não có chỗ móc cái mới vào
     MẪU   → xem một mẫu làm sẵn, chép lại đúng cách làm
     DẪN   → tự làm nhưng còn giàn giáo đỡ
     TỰ    → bỏ giàn giáo, tự làm sạch
     CHUỖI → nối tất cả thành một sản phẩm liền mạch

   Vì sao không cho nhảy phần: làm phần TỰ khi chưa qua phần MẪU thì học viên
   đoán mò, và cái sai đầu tiên được lặp lại suốt phần còn lại. Thứ tự này
   chính là thứ biến phiếu thành bài học chứ không phải bài kiểm tra.

   NGƯỠNG 90%
     Đạt phiếu là đúng 90% trở lên. Con số này không phải để làm khó: ở tầng
     dưới, phiếu chỉ có hai mươi câu, nên 90% nghĩa là sai không quá hai câu.
     Sai ba câu trên hai mươi là còn một lỗ hổng thật, và đi tiếp với lỗ hổng
     đó thì nó theo lên tận cấp cao, nơi sửa đắt gấp nhiều lần.
   ========================================================================== */

export const PHIEU_CREED = {
  name: 'HAI NGHÌN PHIẾU LUYỆN',
  claim:
    'Tám mươi dạng bài nhân hai mươi lăm cấp độ. Mỗi phiếu năm phần nối nhau, hai mươi câu, chấm được ngay, và luôn trả lời được câu hỏi kế tiếp: làm lại, đi tiếp, hay lên cấp.',
  rule:
    'Mỗi buổi làm tối đa một phiếu. Làm hai phiếu một buổi là làm cho xong, không phải làm cho thấm.',
  kpi:
    'Đạt phiếu là đúng 90% trở lên. Đạt 90% trên toàn bộ phiếu của một cấp thì mới được xét nâng giai đoạn.',
  limit:
    'Phiếu đo được KỸ NĂNG. Nó không đo được ĐỘNG LỰC. Học viên làm đúng chín mươi phần trăm mà ba tuần liền không mở phiếu nào thì vấn đề không nằm trong phiếu, và không phiếu nào chữa được.',
};

/* ---------------------------- NĂM PHẦN ---------------------------------- */

interface KhungPhan {
  ma: PhanPhieu['ma'];
  ten: string;
  soCau: number;
  trong: number;
  vaiTro: string;
}

export const KHUNG: KhungPhan[] = [
  {ma: 'KHOI', ten: 'KHỞI', soCau: 2, trong: 10, vaiTro: 'Gọi lại cái đã biết để có chỗ móc cái mới vào.'},
  {ma: 'MAU', ten: 'MẪU', soCau: 3, trong: 15, vaiTro: 'Xem một mẫu làm sẵn, chép lại đúng cách làm.'},
  {ma: 'DAN', ten: 'DẪN', soCau: 5, trong: 25, vaiTro: 'Tự làm nhưng còn giàn giáo đỡ.'},
  {ma: 'TU', ten: 'TỰ', soCau: 8, trong: 35, vaiTro: 'Bỏ giàn giáo, tự làm sạch.'},
  {ma: 'CHUOI', ten: 'CHUỖI', soCau: 2, trong: 15, vaiTro: 'Nối tất cả thành một sản phẩm liền mạch.'},
];

export const SO_CAU_MOI_PHIEU = KHUNG.reduce((s, k) => s + k.soCau, 0);
export const NGUONG_DAT = 90;

/* ------------------------- TÁM MƯƠI DẠNG BÀI ---------------------------- */

interface DangBai {
  id: string;
  skill: SkillId;
  ten: string;
  mucTieu: string;
  /** Năm câu lệnh, đúng thứ tự KHỞI · MẪU · DẪN · TỰ · CHUỖI. */
  lam: [string, string, string, string, string];
  bay: string;
  drillId: string;
  phanLuyen: string;
  chiaSe: string;
}

const B = (
  id: string, skill: SkillId, ten: string, mucTieu: string,
  lam: [string, string, string, string, string],
  bay: string, drillId: string, phanLuyen: string, chiaSe: string,
): DangBai => ({id, skill, ten, mucTieu, lam, bay, drillId, phanLuyen, chiaSe});

export const DANG_BAI: DangBai[] = [
  /* ------------------------------ NGHE -------------------------------- */
  B('d-l01', 'listening', 'Chép chính tả câu ngắn',
    'Tai tách được ranh giới từ trong dòng nói liền mạch.',
    ['Nghe hai câu đã học tuần trước, chép lại không nhìn.',
     'Xem một câu đã chép sẵn kèm chỗ nối âm được gạch chân, chép lại đúng như vậy.',
     'Chép năm câu, được nghe ba lần mỗi câu.',
     'Chép tám câu, chỉ được nghe hai lần mỗi câu.',
     'Chép liền một đoạn hai câu nối nhau, nghe hai lần, chấm theo số từ đúng.'],
    'Nghe đi nghe lại tới khi chép đúng từng chữ. Chép chính tả đo tai ở lần nghe thứ hai, không đo sự kiên nhẫn ở lần thứ mười.',
    'd-dictation', 'Nghe nền hằng ngày',
    'Gửi bản chép của câu khó nhất kèm một dòng nói rõ mình hụt ở âm nào.'),
  B('d-l02', 'listening', 'Bắt số và tên riêng',
    'Không mất điểm ở nhóm câu dễ nhất của mọi đề nghe.',
    ['Nghe lại hai số đã luyện, viết ra dạng chữ số.',
     'Xem cách ghi tắt một số điện thoại và một ngày tháng, làm theo.',
     'Bắt năm mẩu thông tin, có gợi ý trước loại thông tin cần bắt.',
     'Bắt tám mẩu, không có gợi ý loại thông tin.',
     'Nghe một đoạn hội thoại đặt lịch, điền trọn phiếu thông tin.'],
    'Viết đầy đủ chữ khi đang nghe. Phải ghi tắt, vì người nói không chờ.',
    'd-listening-map', 'Nghe có nhiệm vụ',
    'Chia bảng ghi tắt của mình cho nhóm, nêu ký hiệu nào tự nghĩ ra.'),
  B('d-l03', 'listening', 'Bắt ý chính',
    'Nghe ra điều người nói muốn nói, kể cả khi hụt nhiều từ.',
    ['Nghe hai đoạn ngắn, chọn tiêu đề đúng trong ba lựa chọn.',
     'Xem cách một đoạn được tóm về một câu, làm lại với đoạn thứ hai.',
     'Tóm năm đoạn về một câu, có sẵn khung câu.',
     'Tóm tám đoạn về một câu, tự viết.',
     'Nghe một bài ba phút, viết ba câu tóm mở – thân – kết.'],
    'Cố hiểu từng từ rồi mất ý chính. Ý chính nằm ở chỗ nhấn giọng và chỗ lặp lại, không nằm ở từ khó.',
    'd-extensive-listen', 'Nghe nền hằng ngày',
    'Đọc bản tóm ba câu của mình cho một bạn nghe, để bạn đoán bài nói về gì.'),
  B('d-l04', 'listening', 'Bắt chi tiết theo câu hỏi',
    'Đọc trước câu hỏi rồi nghe có đích, không nghe suông.',
    ['Đọc hai câu hỏi, gạch từ khoá, đoán loại thông tin cần bắt.',
     'Xem một ví dụ gạch từ khoá và bắt đúng chỗ, làm lại.',
     'Trả lời năm câu hỏi, được đọc câu hỏi trước 60 giây.',
     'Trả lời tám câu hỏi, chỉ có 30 giây đọc trước.',
     'Làm trọn một phần nghe mười câu đúng điều kiện phòng thi.'],
    'Bật băng rồi mới đọc câu hỏi. Sáu mươi giây đọc trước là kỹ thuật rẻ nhất và cho điểm nhanh nhất trong cả đề.',
    'd-listening-map', 'Luyện dạng đề',
    'Chia sẻ bảng từ khoá đã gạch, chỉ ra từ nào giúp bắt đúng.'),
  B('d-l05', 'listening', 'Đoán thái độ người nói',
    'Nghe ra người nói đồng tình, hoài nghi hay mỉa mai.',
    ['Nghe hai câu, chọn đúng cảm xúc trong bốn lựa chọn.',
     'Xem cách nhận ra một câu nhượng bộ qua ngữ điệu, nghe lại và chỉ ra.',
     'Xác định thái độ ở năm đoạn, có danh sách từ chỉ thái độ kèm theo.',
     'Xác định thái độ ở tám đoạn, không có danh sách.',
     'Nghe một cuộc tranh luận, viết hai câu nêu lập trường mỗi bên.'],
    'Chỉ nghe nội dung mà bỏ ngữ điệu. Cùng một câu chữ, lên giọng cuối là hoài nghi, xuống giọng là khẳng định.',
    'd-news', 'Nghe có nhiệm vụ',
    'Kể lại một chỗ mình nghe nhầm thái độ và vì sao nhầm.'),
  B('d-l06', 'listening', 'Nghe nối âm',
    'Nhận ra chỗ phụ âm cuối dính vào nguyên âm đầu từ sau.',
    ['Nghe hai cụm đã học, đánh dấu chỗ nối.',
     'Xem một câu được chú thích đủ chỗ nối, đọc lại đúng như vậy.',
     'Đánh dấu chỗ nối trong năm câu, có gạch sẵn nửa số chỗ.',
     'Đánh dấu chỗ nối trong tám câu, không gạch sẵn.',
     'Nghe một đoạn nói tự nhiên, chép lại và đánh dấu đủ chỗ nối.'],
    'Tưởng người bản ngữ nói nhanh. Họ nói không nhanh hơn, họ nối và nuốt — hai chuyện khác nhau.',
    'd-shadow', 'Âm nền',
    'Ghi âm mình đọc lại đúng chỗ nối, gửi cho người cùng nhóm nghe chấm.'),
  B('d-l07', 'listening', 'Nghe kèm việc phải làm',
    'Giữ tập trung suốt bài dài bằng cách luôn có việc trong tay.',
    ['Nghe hai phút, ghi ba từ khoá xuất hiện nhiều nhất.',
     'Xem một bản ghi chép mẫu theo cột, làm lại với đoạn kế.',
     'Nghe năm phút, điền bảng có sẵn tiêu đề cột.',
     'Nghe tám phút, tự dựng bảng rồi điền.',
     'Nghe trọn một bài mười phút, nộp bản ghi chép dùng lại được sau một tuần.'],
    'Nghe suông cho quen tai. Không có việc trong tay thì sau ba phút tai còn nghe mà đầu đã đi chỗ khác.',
    'd-listening-map', 'Nghe có nhiệm vụ',
    'Đưa bản ghi chép cho một bạn chưa nghe bài, xem bạn hiểu được bao nhiêu.'),
  B('d-l08', 'listening', 'Dựng bản đồ ý',
    'Thấy được cấu trúc lập luận của cả bài, không chỉ các mẩu rời.',
    ['Nghe hai phút mở bài, chỉ ra câu nêu chủ đề.',
     'Xem một bản đồ ý mẫu ba nhánh, làm lại với bài khác.',
     'Dựng bản đồ năm nhánh, có sẵn nhánh chính.',
     'Dựng bản đồ tám nhánh, tự xác định nhánh chính.',
     'Từ bản đồ, nói lại toàn bài trong 90 giây không nhìn ghi chép.'],
    'Ghi thành một danh sách phẳng. Bài nói có tầng bậc; ghi phẳng là mất chính cái quan trọng nhất.',
    'd-summary', 'Nghe có nhiệm vụ',
    'Dán bản đồ ý lên nhóm, để người khác dùng nó nói lại bài.'),
  B('d-l09', 'listening', 'Nghe tốc độ nhanh',
    'Không sập khi người nói nhanh hơn mức quen.',
    ['Nghe lại một đoạn quen ở tốc độ 1,0 rồi 1,15.',
     'Xem cách bám ý chính khi mất từ, làm lại ở tốc độ 1,15.',
     'Nghe năm đoạn ở 1,15, trả lời câu hỏi ý chính.',
     'Nghe tám đoạn ở 1,25, trả lời cả ý chính lẫn chi tiết.',
     'Nghe một bài ở tốc độ thật của người bản ngữ, tóm ba câu.'],
    'Tăng tốc độ để oai. Tăng khi chưa vững chỉ tạo thói quen đoán bừa, và thói quen đó rất khó bỏ.',
    'd-extensive-listen', 'Nghe nền hằng ngày',
    'Nói ra mốc tốc độ mình đang ở và mốc tuần sau, để nhóm biết mà nhắc.'),
  B('d-l10', 'listening', 'Nghe trong điều kiện nhiễu',
    'Giữ được điểm khi mệt, ồn, hoặc bị áp lực thời gian.',
    ['Nghe hai đoạn quen có tiếng ồn nền nhẹ.',
     'Xem cách bám câu chủ đề khi mất chi tiết, làm lại.',
     'Nghe năm đoạn có nhiễu, trả lời câu hỏi.',
     'Nghe tám đoạn có nhiễu và có đồng hồ đếm ngược.',
     'Làm trọn một phần nghe trong điều kiện gây nhiễu, so điểm với lần làm yên tĩnh.'],
    'Chỉ luyện trong phòng yên tĩnh. Phòng thi có tiếng ghế kéo, tiếng ho, và có cả cái đồng hồ trong đầu mình.',
    'd-mock', 'Luyện dạng đề',
    'Báo chênh lệch điểm giữa hai điều kiện, để cố vấn biết cần luyện thêm gì.'),

  /* ------------------------------ NÓI --------------------------------- */
  B('d-s01', 'speaking', 'Tự thoại 60 giây',
    'Nói liên tục không dừng quá ba giây một lần.',
    ['Nói 20 giây về việc vừa làm sáng nay.',
     'Nghe một bản mẫu 60 giây, chỉ ra ba chỗ người nói câu giờ.',
     'Nói 60 giây về chủ đề quen, được nhìn dàn ý ba gạch đầu dòng.',
     'Nói 60 giây về chủ đề mới, không nhìn gì.',
     'Nói 90 giây nối hai chủ đề, ghi âm và tự đếm số lần dừng quá ba giây.'],
    'Dừng lại sửa câu vừa nói sai. Sửa giữa dòng làm đứt mạch; ghi lại rồi sửa sau khi hết giờ.',
    'd-selftalk', 'Nói hằng ngày',
    'Gửi bản ghi âm 60 giây kèm số lần dừng mình tự đếm được.'),
  B('d-s02', 'speaking', 'Kể lại vừa nghe',
    'Chuyển đầu vào thành đầu ra ngay trong buổi, không để nguội.',
    ['Nghe một câu chuyện 30 giây, kể lại bằng lời mình.',
     'Nghe bản kể lại mẫu, so với bản gốc xem giữ được gì bỏ được gì.',
     'Kể lại một đoạn 1 phút, được xem lại ghi chép.',
     'Kể lại một đoạn 2 phút, không xem gì.',
     'Kể lại rồi thêm một câu nhận xét của riêng mình vào cuối.'],
    'Kể lại bằng đúng từ đã nghe. Đó là chép, không phải kể. Phải đổi cách nói thì mới thành vốn của mình.',
    'd-retell', 'Nói hằng ngày',
    'Kể lại cho một người chưa nghe bài, hỏi lại xem họ nắm được mấy ý.'),
  B('d-s03', 'speaking', 'Mô tả tranh và số liệu',
    'Nói có tổ chức về thứ nhìn thấy, không lan man.',
    ['Nhìn một bức tranh, nói ba câu về nó.',
     'Nghe bản mô tả mẫu theo trình tự tổng – chi tiết – nhận xét, làm lại.',
     'Mô tả năm hình, có sẵn khung ba bước.',
     'Mô tả tám hình, tự dựng trình tự.',
     'Mô tả một biểu đồ rồi nêu xu hướng nổi bật nhất trong hai câu.'],
    'Kể hết mọi thứ nhìn thấy. Người nghe cần một trình tự và một nhận xét, không cần một danh sách.',
    'd-part2', 'Nói hằng ngày',
    'Đọc bản mô tả cho bạn không nhìn hình, xem bạn vẽ lại được bao nhiêu.'),
  B('d-s04', 'speaking', 'Trả lời câu hỏi mở',
    'Trả lời đủ ý trong 30–45 giây, có lý do và ví dụ.',
    ['Trả lời hai câu hỏi quen bằng một câu.',
     'Nghe một câu trả lời mẫu theo lối ý – lý do – ví dụ, làm lại.',
     'Trả lời năm câu, có khung ý – lý do – ví dụ trước mặt.',
     'Trả lời tám câu, không có khung.',
     'Trả lời ba câu nối nhau về cùng chủ đề, không lặp lại lý do.'],
    'Trả lời cụt một câu rồi im. Câu trả lời một dòng làm người hỏi phải gánh cả cuộc nói chuyện.',
    'd-part3', 'Nói hằng ngày',
    'Ghi âm ba câu trả lời, nhờ bạn chấm câu nào thiếu ví dụ.'),
  B('d-s05', 'speaking', 'Bảo vệ một quan điểm',
    'Giữ lập trường và đáp lại phản bác mà không đổi ý giữa chừng.',
    ['Chọn một quan điểm, nói một câu vì sao.',
     'Nghe một mẫu đáp lại phản bác, chỉ ra chỗ người nói nhượng bộ mà vẫn giữ lập trường.',
     'Bảo vệ quan điểm qua năm câu hỏi vặn, có gợi ý cách đáp.',
     'Bảo vệ quan điểm qua tám câu hỏi vặn, tự đáp.',
     'Nói hai phút bảo vệ quan điểm, có nhượng bộ một điểm mà không mất lập trường.'],
    'Cãi thắng bằng cách phủ nhận mọi thứ. Nhượng bộ đúng một điểm làm phần còn lại đáng tin hơn hẳn.',
    'd-debate', 'Câu lạc bộ',
    'Trình bày quan điểm trước nhóm, ghi lại câu vặn khó nhất mình gặp.'),
  B('d-s06', 'speaking', 'Nói đuổi theo bản mẫu',
    'Miệng bắt kịp nhịp và ngữ điệu của người bản ngữ.',
    ['Nói đuổi hai câu quen, nhắm mắt, không nhìn lời.',
     'Nghe mẫu một câu có đánh dấu trọng âm câu, nói đuổi đúng chỗ nhấn.',
     'Nói đuổi năm câu, được nghe trước một lần.',
     'Nói đuổi tám câu, vào thẳng không nghe trước.',
     'Nói đuổi trọn một đoạn 60 giây, ghi âm và so với bản gốc.'],
    'Nhìn lời mà đọc to. Đó là luyện đọc chứ không luyện tai. Phải nhắm mắt nghe rồi mới bật ra.',
    'd-shadow', 'Âm nền',
    'Gửi bản ghi âm nói đuổi kèm chỗ mình biết là chưa bắt kịp.'),
  B('d-s07', 'speaking', 'Đọc to bấm giờ',
    'Giữ tốc độ đều và không nuốt phụ âm cuối khi mệt.',
    ['Đọc to hai câu, tự nghe lại xem có nuốt âm cuối không.',
     'Nghe bản đọc mẫu cùng đoạn, đánh dấu chỗ mình khác.',
     'Đọc năm câu bấm giờ, có đánh dấu chỗ ngắt.',
     'Đọc tám câu bấm giờ, tự quyết chỗ ngắt.',
     'Đọc trọn một đoạn 150 từ trong đúng khung thời gian, không tăng tốc ở cuối.'],
    'Đọc nhanh dần về cuối cho xong. Tăng tốc ở cuối là dấu hiệu hết hơi, và người nghe nhận ra ngay.',
    'd-pronunciation-drill', 'Âm nền',
    'Nộp bản ghi âm kèm thời gian thật, so với khung thời gian chuẩn.'),
  B('d-s08', 'speaking', 'Kỹ thuật 4–3–2',
    'Nói cùng nội dung ba lần với thời gian rút dần, để câu trở nên trôi.',
    ['Nói một chủ đề quen trong bốn phút.',
     'Nghe mẫu cách rút gọn mà không mất ý, làm lại.',
     'Nói lại chủ đề đó trong ba phút, giữ đủ ý.',
     'Nói lại trong hai phút, vẫn đủ ý.',
     'Nói lần cuối trong hai phút cho người khác nghe, để họ đếm số ý.'],
    'Đổi chủ đề mỗi lượt cho đỡ chán. Đúng cái lặp lại mới tạo độ trôi; đổi chủ đề là quay về vạch xuất phát.',
    'd-432', 'Nói hằng ngày',
    'Nói lượt cuối cho một người nghe, nhờ họ đếm xem còn đủ mấy ý.'),
  B('d-s09', 'speaking', 'Thuyết trình hai phút',
    'Trình bày có mở – thân – kết trước người nghe thật.',
    ['Nói một câu mở bài cho chủ đề đã chọn.',
     'Xem một bài mẫu hai phút, chỉ ra ba mốc chuyển ý.',
     'Thuyết trình hai phút, được nhìn dàn ý.',
     'Thuyết trình hai phút, không nhìn gì.',
     'Thuyết trình rồi trả lời hai câu hỏi của người nghe.'],
    'Học thuộc từng chữ. Quên một chữ là sập cả bài; nhớ ba mốc chuyển ý thì không bao giờ sập.',
    'd-club', 'Câu lạc bộ',
    'Trình bày trước câu lạc bộ, xin hai nhận xét cụ thể chứ không xin lời khen.'),
  B('d-s10', 'speaking', 'Trả lời truy vấn liên tiếp',
    'Giữ được mạch khi bị hỏi dồn, như trong phần thi vấn đáp.',
    ['Trả lời hai câu hỏi liên tiếp cùng chủ đề.',
     'Nghe mẫu một chuỗi năm câu hỏi dồn, chỉ ra cách người nói câu giờ hợp lệ.',
     'Trả lời năm câu hỏi dồn, được nghỉ 5 giây giữa các câu.',
     'Trả lời tám câu hỏi dồn, không nghỉ.',
     'Trả lời một chuỗi mười câu, ghi âm, tự chấm câu nào bị hụt.'],
    'Im lặng dài khi bí. Có những cách câu giờ hợp lệ bằng tiếng Anh; im lặng thì không phải là một trong số đó.',
    'd-tutor', 'Câu lạc bộ',
    'Nhờ một người hỏi dồn mình mười câu, ghi lại câu làm mình bí nhất.'),

  /* ------------------------------ ĐỌC --------------------------------- */
  B('d-r01', 'reading', 'Quét theo từ khoá',
    'Tìm đúng chỗ chứa câu trả lời mà không đọc cả bài.',
    ['Đọc hai câu hỏi, gạch từ khoá.',
     'Xem một ví dụ quét đúng chỗ nhờ từ đồng nghĩa, làm lại.',
     'Quét trả lời năm câu, có đánh dấu đoạn chứa đáp án.',
     'Quét trả lời tám câu, không đánh dấu.',
     'Làm trọn một bài mười câu, bấm giờ, ghi thời gian từng câu.'],
    'Đọc tuần tự từ đầu. Bài đọc đề chuyên dài tới tám trang A4 — không quét theo từ khoá thì không kịp.',
    'd-reading-skim', 'Đọc bấm giờ',
    'Chia sẻ danh sách từ đồng nghĩa mình phải tra, để nhóm cùng học.'),
  B('d-r02', 'reading', 'Tìm câu chủ đề',
    'Nhận ra câu mang ý chính của mỗi đoạn.',
    ['Đọc hai đoạn ngắn, khoanh câu chủ đề.',
     'Xem một đoạn có câu chủ đề nằm ở cuối, hiểu vì sao.',
     'Khoanh câu chủ đề trong năm đoạn, có gợi ý vị trí.',
     'Khoanh câu chủ đề trong tám đoạn, không gợi ý.',
     'Đọc một bài bốn đoạn, viết dàn ý bốn dòng từ bốn câu chủ đề.'],
    'Luôn tìm câu chủ đề ở đầu đoạn. Nhiều đoạn học thuật đặt nó ở cuối, sau khi đã dẫn dắt.',
    'd-summary', 'Đọc bấm giờ',
    'So dàn ý bốn dòng của mình với một bạn, chỉ ra chỗ khác nhau.'),
  B('d-r03', 'reading', 'Câu hỏi suy luận',
    'Trả lời điều bài viết ngụ ý mà không viết thẳng ra.',
    ['Đọc hai câu, chọn điều suy ra được trong ba lựa chọn.',
     'Xem một ví dụ suy luận đúng và một suy luận quá đà, phân biệt.',
     'Trả lời năm câu suy luận, có gạch sẵn căn cứ.',
     'Trả lời tám câu suy luận, tự tìm căn cứ.',
     'Với mỗi đáp án chọn, viết một dòng chỉ ra chính xác câu nào trong bài làm căn cứ.'],
    'Suy luận bằng kiến thức nền của mình. Đáp án phải suy ra từ chính bài viết, không phải từ điều mình vốn tin.',
    'd-news', 'Đọc bấm giờ',
    'Nêu một câu mình suy luận sai và câu trong bài đã bác bỏ nó.'),
  B('d-r04', 'reading', 'Thái độ tác giả',
    'Nhận ra tác giả ủng hộ, phản đối hay trung lập.',
    ['Đọc hai câu, chỉ ra từ mang thái độ.',
     'Xem một đoạn xã luận có khoanh sẵn từ hạn định và từ nhượng bộ.',
     'Xác định thái độ ở năm đoạn, có danh sách từ chỉ thái độ.',
     'Xác định thái độ ở tám đoạn, không có danh sách.',
     'Đọc một bài xã luận, viết hai câu nêu lập trường tác giả kèm hai từ làm bằng chứng.'],
    'Đọc nội dung mà bỏ qua từ hạn định. "Có thể", "phần nào", "đáng tiếc là" — chính chúng mang thái độ.',
    'd-news', 'Đọc bấm giờ',
    'Chia sẻ danh sách từ chỉ thái độ mình gom được trong tuần.'),
  B('d-r05', 'reading', 'Tham chiếu đại từ',
    'Biết chính xác "it", "this", "they" đang trỏ vào cái gì.',
    ['Đọc hai câu, chỉ ra "it" trỏ vào đâu.',
     'Xem một ví dụ đại từ trỏ ngược lên hai câu trước, hiểu cách lần.',
     'Xác định năm tham chiếu, có gạch sẵn vùng chứa.',
     'Xác định tám tham chiếu, tự tìm.',
     'Đọc một đoạn dài, vẽ mũi tên nối mọi đại từ với thứ nó trỏ vào.'],
    'Cho rằng đại từ luôn trỏ vào danh từ ngay trước nó. Trong văn học thuật nó thường trỏ vào cả một mệnh đề.',
    'd-grammar-notice', 'Đọc bấm giờ',
    'Đưa đoạn đã vẽ mũi tên cho bạn kiểm, xem có mũi tên nào sai.'),
  B('d-r06', 'reading', 'Sắp xếp đoạn văn',
    'Nhận ra mạch lập luận qua từ nối và tham chiếu.',
    ['Sắp hai câu vào đúng thứ tự.',
     'Xem một ví dụ sắp bốn câu kèm lý do từng bước.',
     'Sắp năm câu, có sẵn câu mở.',
     'Sắp tám câu, không có gợi ý.',
     'Sắp một đoạn trọn vẹn rồi viết một dòng nêu tín hiệu nào quyết định thứ tự.'],
    'Sắp theo nghĩa chung chung. Thứ tự nằm ở tín hiệu ngôn ngữ: từ nối, đại từ, mạo từ xác định.',
    'd-grammar-notice', 'Luyện dạng đề',
    'Nêu tín hiệu nào giúp mình sắp đúng, cho nhóm dùng lại.'),
  B('d-r07', 'reading', 'Điền câu vào chỗ trống',
    'Chọn câu khớp cả về nghĩa lẫn về mạch.',
    ['Điền hai chỗ trống dễ, có hai lựa chọn mỗi chỗ.',
     'Xem một ví dụ loại trừ dựa vào đại từ ở câu sau, làm lại.',
     'Điền năm chỗ trống, có ít hơn hai lựa chọn thừa.',
     'Điền tám chỗ trống, có bốn lựa chọn thừa.',
     'Điền trọn một bài rồi đọc lại toàn đoạn xem có chỗ nào gợn.'],
    'Chỉ xét câu trước chỗ trống. Câu sau thường mới là thứ loại trừ được các lựa chọn.',
    'd-reading-skim', 'Luyện dạng đề',
    'Chỉ cho nhóm một chỗ mình suýt chọn sai và tín hiệu đã cứu mình.'),
  B('d-r08', 'reading', 'Đọc bài dài bấm giờ',
    'Đọc hết bài dài trong khung thời gian mà vẫn giữ độ chính xác.',
    ['Đọc 200 từ, ghi thời gian.',
     'Xem cách bỏ qua ví dụ phụ để giữ tốc độ, làm lại.',
     'Đọc 600 từ trong khung thời gian, trả lời năm câu.',
     'Đọc 1.000 từ trong khung thời gian, trả lời tám câu.',
     'Đọc 1.200 từ trong mười phút, trả lời mười câu, ghi tốc độ và độ chính xác.'],
    'Tra từ giữa chừng. Một lần tra làm mất mạch và tốn nhiều thời gian hơn cả đoạn vừa đọc.',
    'd-reading-skim', 'Đọc bấm giờ',
    'Ghi tốc độ đọc tuần này lên bảng nhóm, kèm độ chính xác đi cùng.'),
  B('d-r09', 'reading', 'Đọc văn bản thực tế',
    'Hiểu nhanh biển báo, thông báo, email — dạng bài đang tăng mạnh trong đề chung.',
    ['Đọc hai biển báo, chọn ý đúng.',
     'Xem một ví dụ phân tích thông báo theo ai – làm gì – khi nào, làm lại.',
     'Đọc năm văn bản ngắn, trả lời câu hỏi, có khung ba cột.',
     'Đọc tám văn bản, tự phân tích.',
     'Đọc một email dài, viết ba dòng tóm ai cần làm gì trước khi nào.'],
    'Đọc như đọc văn xuôi. Văn bản thực tế cần đọc như tra cứu: tìm đúng ba thông tin rồi dừng.',
    'd-graded', 'Đọc bấm giờ',
    'Đưa bản tóm ba dòng cho bạn, xem bạn có làm đúng việc không.'),
  B('d-r10', 'reading', 'Tóm tắt bài đọc',
    'Rút một bài dài về vài câu mà không mất ý chính.',
    ['Tóm hai đoạn ngắn về mỗi đoạn một câu.',
     'Xem một bản tóm mẫu và bản gốc, chỉ ra cái gì bị bỏ.',
     'Tóm một bài 600 từ về năm câu, có khung.',
     'Tóm một bài 1.000 từ về năm câu, không khung.',
     'Tóm về ba câu rồi đưa cho người chưa đọc, xem họ nắm được gì.'],
    'Chép lại câu trong bài. Tóm tắt phải viết bằng lời mình, nếu không thì chưa chứng minh được là đã hiểu.',
    'd-summary', 'Đọc bấm giờ',
    'Đưa bản tóm cho người chưa đọc bài, ghi lại câu hỏi họ đặt ra.'),

  /* ------------------------------ VIẾT -------------------------------- */
  B('d-w01', 'writing', 'Biến đổi câu giữ nguyên nghĩa',
    'Viết lại câu theo cấu trúc khác mà nghĩa không đổi.',
    ['Biến đổi hai câu theo mẫu đã học.',
     'Xem một ví dụ biến đổi kèm lý do chọn cấu trúc, làm lại.',
     'Biến đổi năm câu, có cho sẵn từ đầu tiên.',
     'Biến đổi tám câu, không cho gợi ý.',
     'Biến đổi mười sáu câu trong mười hai phút, đúng điều kiện đề chuyên.'],
    'Đổi từ mà không đổi cấu trúc. Đề hỏi cấu trúc; thay từ đồng nghĩa là chưa làm gì cả.',
    'd-freewrite', 'Viết có chấm',
    'Nộp bảng hai mươi mẫu biến đổi của mình, đánh dấu mẫu nào còn phải nghĩ.'),
  B('d-w02', 'writing', 'Viết lại theo từ gợi ý',
    'Dùng đúng từ cho sẵn mà vẫn giữ trọn nghĩa gốc.',
    ['Viết lại hai câu với từ gợi ý dễ.',
     'Xem một ví dụ dùng từ gợi ý làm trục, làm lại.',
     'Viết lại năm câu, gợi ý là một từ.',
     'Viết lại tám câu, gợi ý là hai từ phải dùng cả hai.',
     'Viết lại mười câu bấm giờ, tự chấm theo bảng đáp án.'],
    'Bỏ một ý của câu gốc cho dễ viết. Mất một ý là mất trọn điểm câu đó, dù câu viết ra rất đẹp.',
    'd-freewrite', 'Viết có chấm',
    'Đổi bài với một bạn, chấm chéo theo bảng tiêu chí.'),
  B('d-w03', 'writing', 'Viết câu chủ đề',
    'Mở đoạn bằng một câu nói rõ đoạn này bàn gì.',
    ['Viết một câu chủ đề cho chủ đề quen.',
     'Xem ba câu chủ đề mẫu, chỉ ra câu nào quá rộng và câu nào quá hẹp.',
     'Viết năm câu chủ đề, có khung cho sẵn.',
     'Viết tám câu chủ đề, tự viết.',
     'Viết câu chủ đề rồi viết luôn hai câu triển khai khớp với nó.'],
    'Viết câu chủ đề quá rộng. Câu quá rộng thì đoạn nào cũng dùng được, tức là không nói gì cả.',
    'd-task2', 'Viết có chấm',
    'Dán năm câu chủ đề lên nhóm, nhờ chấm câu nào rộng quá.'),
  B('d-w04', 'writing', 'Dàn ý bốn dòng',
    'Có xương sống trước khi viết, để không lạc giữa chừng.',
    ['Viết dàn ý hai dòng cho một đề quen.',
     'Xem một dàn ý bốn dòng mẫu và bài viết ra từ nó.',
     'Viết dàn ý bốn dòng cho năm đề, có khung.',
     'Viết dàn ý bốn dòng cho tám đề, không khung.',
     'Chọn một dàn ý, viết trọn đoạn theo đúng nó, không thêm ý mới.'],
    'Bỏ dàn ý cho nhanh. Không có dàn ý thì đoạn văn đi tới đâu hay tới đó, và người chấm nhận ra ngay ở tiêu chí mạch lạc.',
    'd-task2', 'Viết có chấm',
    'Nộp dàn ý kèm bài, để người chấm thấy được mạch nghĩ.'),
  B('d-w05', 'writing', 'Viết đoạn 120 từ',
    'Viết một đoạn đủ xương sống trong khung thời gian.',
    ['Viết ba câu về chủ đề quen.',
     'Xem một đoạn mẫu có đánh dấu câu chủ đề, luận cứ, ví dụ, câu chốt.',
     'Viết đoạn 120 từ có khung bốn thành phần.',
     'Viết đoạn 120 từ không khung, trong 15 phút.',
     'Viết đoạn 150 từ trong 12 phút rồi tự soát theo bốn tiêu chí.'],
    'Viết dài cho đủ chữ. Đủ chữ mà thiếu câu chốt vẫn mất điểm ở tiêu chí mạch lạc.',
    'd-task2', 'Viết có chấm',
    'Nộp bài cho người chấm, ghi lại lỗi lặp lại vào sổ lỗi.'),
  B('d-w06', 'writing', 'Liên kết câu',
    'Nối câu bằng tín hiệu đúng, không rải từ nối bừa.',
    ['Nối hai câu bằng một từ nối phù hợp.',
     'Xem một đoạn dùng đúng bốn loại tín hiệu nối, phân loại chúng.',
     'Nối năm cặp câu, có danh sách từ nối kèm nghĩa.',
     'Nối tám cặp câu, không có danh sách.',
     'Viết một đoạn sáu câu dùng đúng ba loại tín hiệu nối khác nhau.'],
    'Rắc "however", "moreover" vào mọi câu. Từ nối dùng sai chỗ làm mạch nghĩ trông rối hơn là mạch lạc hơn.',
    'd-model-deconstruct', 'Viết có chấm',
    'Khoanh mọi từ nối trong bài mình, giải thích vì sao chọn từ đó.'),
  B('d-w07', 'writing', 'Mô tả số liệu',
    'Nêu xu hướng và so sánh, không đọc lại từng con số.',
    ['Đọc một biểu đồ, viết một câu nêu xu hướng.',
     'Xem một bài mẫu, chỉ ra chỗ chọn lọc số liệu thay vì liệt kê hết.',
     'Mô tả năm biểu đồ, có khung câu.',
     'Mô tả tám biểu đồ, tự viết.',
     'Viết trọn một bài 150 từ có mở, thân chọn lọc, và câu tổng quan.'],
    'Đọc lại mọi con số trên biểu đồ. Người chấm cần xu hướng và so sánh, không cần bảng số viết bằng chữ.',
    'd-task1', 'Viết có chấm',
    'Nộp bài kèm một dòng nói rõ vì sao chọn đúng những số đó.'),
  B('d-w08', 'writing', 'Bài luận có lập luận',
    'Viết bài luận có lập trường rõ và bằng chứng đi kèm.',
    ['Viết một câu nêu lập trường cho đề cho sẵn.',
     'Xem một bài mẫu, tách ra lập trường, hai luận cứ, và phản biện.',
     'Viết bài 200 từ có khung ba phần.',
     'Viết bài 250 từ không khung, trong 40 phút.',
     'Viết bài rồi tự chấm theo bốn tiêu chí, chỉ ra tiêu chí yếu nhất.'],
    'Nêu cả hai phía rồi không chọn phía nào. Bài không có lập trường bị trừ nặng ở tiêu chí trả lời đúng đề.',
    'd-task2', 'Viết có chấm',
    'Nộp bài cho người chấm, hẹn ngày viết lại đúng bài đó sau khi sửa.'),
  B('d-w09', 'writing', 'Tự sửa bài mình',
    'Tìm ra lỗi của chính mình trước khi người khác chỉ.',
    ['Đọc lại một đoạn cũ, tìm hai lỗi.',
     'Xem một bài đã được chữa, phân loại lỗi theo mã.',
     'Tự sửa năm lỗi trong bài mình, có bảng mã lỗi.',
     'Tự sửa tám lỗi, không có bảng.',
     'Viết lại trọn bài cũ, so hai bản, đếm số lỗi đã hết.'],
    'Đọc lại ngay sau khi viết. Mắt còn nhớ ý định nên đọc ra cái mình muốn viết, không đọc ra cái đã viết. Phải để cách một ngày.',
    'd-errorreview', 'Sổ lỗi',
    'Đưa hai bản trước và sau cho người chấm, chỉ ra lỗi nào tự tìm được.'),
  B('d-w10', 'writing', 'Diễn đạt lại ý người khác',
    'Nói lại ý gốc bằng cấu trúc và từ của mình, không đổi nghĩa.',
    ['Diễn đạt lại hai câu ngắn.',
     'Xem một ví dụ diễn đạt lại đúng và một ví dụ sai sắc thái, phân biệt.',
     'Diễn đạt lại năm câu, có gợi ý cấu trúc.',
     'Diễn đạt lại tám câu, không gợi ý.',
     'Diễn đạt lại trọn một đoạn rồi đối chiếu nghĩa từng câu với bản gốc.'],
    'Tra từ điển rồi thay từ đồng nghĩa máy móc. Sai sắc thái làm câu nghe kỳ quặc, và người chấm trừ điểm chỗ đó.',
    'd-model-deconstruct', 'Viết có chấm',
    'Đưa bản diễn đạt lại cho bạn đọc, hỏi có chỗ nào nghe lạ không.'),

  /* ---------------------------- TỪ VỰNG ------------------------------- */
  B('d-v01', 'vocabulary', 'Đãi cụm từ từ ngữ liệu thật',
    'Nhặt cụm đáng học từ chính thứ mình đang đọc và nghe.',
    ['Nhặt hai cụm từ trong bài hôm nay.',
     'Xem một ví dụ nhặt cụm đúng và một ví dụ nhặt từ đơn, phân biệt.',
     'Nhặt năm cụm, có tiêu chí chọn kèm theo.',
     'Nhặt tám cụm, tự quyết theo tiêu chí.',
     'Đưa mười cụm vừa nhặt vào mười câu tự đặt về đời sống của mình.'],
    'Chép danh sách từ vựng trên mạng. Cụm nhặt từ bài mình đọc có ngữ cảnh, nên nhớ được; cụm chép về thì không.',
    'd-mine', 'Sổ từ theo cụm',
    'Chia mười cụm mới cho nhóm, kèm câu gốc nơi mình gặp chúng.'),
  B('d-v02', 'vocabulary', 'Giới từ đi kèm',
    'Dùng đúng giới từ sau động từ và tính từ.',
    ['Điền giới từ vào hai câu quen.',
     'Xem cách nhóm giới từ theo nghĩa thay vì học vẹt, làm lại.',
     'Điền năm chỗ, có ba lựa chọn mỗi chỗ.',
     'Điền tám chỗ, không có lựa chọn.',
     'Viết năm câu tự đặt, mỗi câu dùng một cụm giới từ vừa học.'],
    'Học từng cặp rời rạc. Nhóm theo nghĩa — hướng tới, ra khỏi, gắn với — thì nhớ được gấp nhiều lần.',
    'd-collocation', 'Sổ từ theo cụm',
    'Đóng góp năm cặp giới từ khó vào bảng chung của nhóm.'),
  B('d-v03', 'vocabulary', 'Dạng từ',
    'Chuyển đúng giữa danh, động, tính, trạng từ.',
    ['Chuyển hai từ sang dạng được yêu cầu.',
     'Xem một họ từ đầy đủ với bốn dạng, hiểu quy luật hậu tố.',
     'Chuyển năm từ, có gợi ý hậu tố.',
     'Chuyển tám từ, không gợi ý.',
     'Điền dạng từ đúng vào một đoạn văn mười chỗ trống.'],
    'Nhớ từng từ riêng lẻ. Học theo họ từ thì một lần học được bốn từ, và nhận ra được cả từ chưa gặp.',
    'd-anki', 'Sổ từ theo cụm',
    'Nộp năm họ từ đã dựng đủ bốn dạng, cho nhóm dùng chung.'),
  B('d-v04', 'vocabulary', 'Cụm cố định',
    'Dùng đúng cụm mà người bản ngữ thật sự nói.',
    ['Hoàn thành hai cụm cố định đã học tuần trước, không nhìn sổ.',
     'Xem cách tra từ điển kết hợp từ, làm lại với một từ mới.',
     'Hoàn thành năm cụm, có ba lựa chọn.',
     'Hoàn thành tám cụm, không lựa chọn.',
     'Viết một đoạn ngắn dùng đúng năm cụm cố định vừa học.'],
    'Ghép từ theo lối dịch từ tiếng Việt. "Làm bài tập" không dịch thẳng được; phải tra xem người ta thật sự nói gì.',
    'd-collocation', 'Sổ từ theo cụm',
    'Chia sẻ ba cụm mình từng ghép sai theo lối dịch, và cụm đúng.'),
  B('d-v05', 'vocabulary', 'Sắc thái từ đồng nghĩa',
    'Chọn đúng từ trong nhóm gần nghĩa.',
    ['Phân biệt hai từ gần nghĩa quen thuộc.',
     'Xem một nhóm bốn từ đồng nghĩa với mức độ khác nhau, xếp theo thang.',
     'Chọn từ đúng trong năm câu, có ghi chú sắc thái.',
     'Chọn từ đúng trong tám câu, không ghi chú.',
     'Viết năm câu, mỗi câu dùng một từ trong nhóm sao cho không thay thế nhau được.'],
    'Coi từ đồng nghĩa là thay thế được cho nhau. Chúng khác mức độ, khác trang trọng, khác cả chỗ dùng.',
    'd-mine', 'Sổ từ theo cụm',
    'Vẽ thang sắc thái cho một nhóm từ, dán lên bảng nhóm.'),
  B('d-v06', 'vocabulary', 'Từ học thuật',
    'Dùng được vốn từ của văn bản học thuật, không chỉ nhận ra.',
    ['Nhận nghĩa hai từ học thuật đã gặp.',
     'Xem một từ học thuật trong ba ngữ cảnh khác nhau, rút nghĩa lõi.',
     'Điền năm từ vào chỗ trống, có danh sách.',
     'Điền tám từ, danh sách có từ thừa.',
     'Viết một đoạn 100 từ dùng đúng năm từ học thuật vừa học.'],
    'Đọc danh sách từ học thuật cho thuộc. Đọc list thì nhận ra được nhưng không dùng được — phải qua viết mới thành vốn chủ động.',
    'd-anki', 'Sổ từ theo cụm',
    'Nộp đoạn văn có dùng năm từ, đánh dấu từ nào còn thấy gượng.'),
  B('d-v07', 'vocabulary', 'Thẻ ôn đúng chuẩn',
    'Làm thẻ nhớ được, không làm thẻ để đấy.',
    ['Xem lại hai thẻ cũ, chấm thẻ nào khó nhớ.',
     'Xem một thẻ chuẩn có cụm, câu nguồn, và phiên âm; làm lại một thẻ.',
     'Làm năm thẻ theo đúng mẫu: mặt trước là cụm, mặt sau là nghĩa kèm câu nguồn.',
     'Làm tám thẻ, tự quyết mặt trước mặt sau.',
     'Ôn lại toàn bộ thẻ mới sau 24 giờ, ghi tỉ lệ nhớ.'],
    'Làm thẻ một từ – một nghĩa. Thẻ kiểu đó nhớ được từ nhưng không dùng được; thẻ phải mang cả câu nguồn.',
    'd-anki', 'Ôn giãn cách',
    'Chia bộ thẻ của mình cho nhóm, nhận góp ý về mặt trước.'),
  B('d-v08', 'vocabulary', 'Dùng cụm trong câu của mình',
    'Chuyển vốn bị động thành vốn chủ động.',
    ['Đặt hai câu với hai cụm đã học tuần trước.',
     'Xem một ví dụ đặt câu gắn với đời sống thật, làm lại.',
     'Đặt năm câu, có khung câu.',
     'Đặt tám câu, không khung, phải gắn với việc thật của mình.',
     'Nói một đoạn 60 giây dùng đủ năm cụm mà không nhìn giấy.'],
    'Đặt câu chung chung kiểu sách giáo khoa. Câu gắn với việc thật của mình mới bám lại được trong trí nhớ.',
    'd-selftalk', 'Sổ từ theo cụm',
    'Nói đoạn 60 giây cho nhóm nghe, để nhóm đếm đủ năm cụm.'),
  B('d-v09', 'vocabulary', 'Cặp từ dễ nhầm',
    'Hết nhầm những cặp mình vẫn nhầm.',
    ['Phân biệt hai cặp mình từng sai.',
     'Xem một cặp được phân biệt bằng ngữ cảnh chứ không bằng định nghĩa.',
     'Chọn đúng trong năm câu, có ghi chú phân biệt.',
     'Chọn đúng trong tám câu, không ghi chú.',
     'Tự lập bảng năm cặp mình hay nhầm, kèm một câu mẫu cho mỗi từ.'],
    'Học phân biệt bằng định nghĩa từ điển. Định nghĩa không cứu được lúc viết; một câu mẫu đúng thì cứu được.',
    'd-errorreview', 'Sổ lỗi',
    'Đóng góp bảng cặp dễ nhầm của mình vào bảng chung của lớp.'),
  B('d-v10', 'vocabulary', 'Đoán nghĩa từ ngữ cảnh',
    'Đọc tiếp được mà không dừng lại tra từ.',
    ['Đoán nghĩa hai từ mới trong câu quen.',
     'Xem cách dùng tín hiệu quanh từ để đoán, làm lại.',
     'Đoán năm từ, có gạch sẵn tín hiệu.',
     'Đoán tám từ, tự tìm tín hiệu.',
     'Đọc trọn một bài không tra từ, sau đó tra lại và đếm số lần đoán đúng.'],
    'Tra từ ngay khi gặp. Mỗi lần tra là một lần đứt mạch, và trong phòng thi thì không có từ điển.',
    'd-graded', 'Đọc bấm giờ',
    'Báo tỉ lệ đoán đúng của mình, để nhóm biết mốc hợp lý.'),

  /* ---------------------------- NGỮ PHÁP ------------------------------ */
  B('d-g01', 'grammar', 'Thì của động từ',
    'Chọn đúng thì theo mốc thời gian trong câu.',
    ['Chia động từ ở hai câu có mốc thời gian rõ.',
     'Xem trục thời gian vẽ sẵn cho ba thì, làm lại với thì thứ tư.',
     'Chia năm câu, có gạch sẵn từ chỉ thời gian.',
     'Chia tám câu, tự tìm mốc thời gian.',
     'Viết một đoạn năm câu kể một việc đã xảy ra, dùng đúng ba thì.'],
    'Học bảng công thức. Biết công thức mà nói vẫn sai, vì lúc nói không kịp tra bảng — phải luyện tới mức bật ra.',
    'd-grammar-notice', 'Ngữ pháp phản xạ',
    'Vẽ trục thời gian cho đoạn văn của mình, chia sẻ cho nhóm.'),
  B('d-g02', 'grammar', 'Mệnh đề quan hệ',
    'Nối hai câu thành một mà không rối.',
    ['Nối hai cặp câu bằng đại từ quan hệ.',
     'Xem một ví dụ mệnh đề xác định và không xác định, chỉ ra khác biệt về dấu phẩy.',
     'Nối năm cặp, có gợi ý đại từ.',
     'Nối tám cặp, tự chọn đại từ.',
     'Viết một đoạn có ít nhất ba mệnh đề quan hệ dùng đúng.'],
    'Dùng "which" cho mọi thứ. Chọn sai đại từ quan hệ là lỗi bị nhìn thấy ngay ở tiêu chí ngữ pháp.',
    'd-grammar-notice', 'Ngữ pháp phản xạ',
    'Đưa đoạn văn cho bạn soát dấu phẩy trước mệnh đề không xác định.'),
  B('d-g03', 'grammar', 'Câu điều kiện',
    'Dùng đúng loại điều kiện theo mức độ có thật.',
    ['Hoàn thành hai câu điều kiện loại một.',
     'Xem ba loại điều kiện đặt cạnh nhau cùng một nội dung, thấy nghĩa đổi thế nào.',
     'Hoàn thành năm câu, có nêu loại.',
     'Hoàn thành tám câu, tự xác định loại.',
     'Viết năm câu điều kiện về chính kế hoạch học của mình, đủ ba loại.'],
    'Chọn loại theo thì trong đề bài. Chọn theo mức độ CÓ THẬT của giả định, đó mới là thứ quyết định.',
    'd-grammar-notice', 'Ngữ pháp phản xạ',
    'Chia sẻ năm câu điều kiện về kế hoạch của mình cho nhóm góp ý.'),
  B('d-g04', 'grammar', 'Đảo ngữ',
    'Dùng đảo ngữ đúng chỗ để nhấn mạnh.',
    ['Đảo hai câu theo mẫu đã học.',
     'Xem một ví dụ đảo ngữ trong văn viết trang trọng, hiểu vì sao dùng.',
     'Đảo năm câu, có cho sẵn cụm mở đầu.',
     'Đảo tám câu, tự chọn cụm mở đầu.',
     'Viết một đoạn có đúng hai câu đảo ngữ, không nhiều hơn.'],
    'Nhồi đảo ngữ vào mọi câu cho sang. Dùng quá tay làm bài trông gượng, và điểm ngữ pháp giảm chứ không tăng.',
    'd-model-deconstruct', 'Ngữ pháp phản xạ',
    'Chỉ ra một câu đảo ngữ mình từng dùng sai chỗ, và vì sao sai.'),
  B('d-g05', 'grammar', 'Câu bị động',
    'Chuyển chủ động sang bị động khi cần giấu chủ thể.',
    ['Chuyển hai câu sang bị động.',
     'Xem một ví dụ bị động dùng đúng chỗ trong văn học thuật.',
     'Chuyển năm câu sang bị động, có gợi ý sẵn động từ to be và dạng phân từ.',
     'Chuyển tám câu, không gợi ý.',
     'Viết một đoạn học thuật có ba câu bị động dùng đúng lý do.'],
    'Chuyển bị động chỉ để cho khác. Bị động dùng khi chủ thể không quan trọng; dùng bừa làm câu nặng và mờ nghĩa.',
    'd-grammar-notice', 'Ngữ pháp phản xạ',
    'Giải thích cho nhóm vì sao ba câu của mình cần bị động.'),
  B('d-g06', 'grammar', 'Danh động từ và động từ nguyên mẫu',
    'Chọn đúng dạng sau từng động từ.',
    ['Chọn dạng đúng ở hai câu quen.',
     'Xem cách nhóm động từ theo nghĩa thay vì học vẹt danh sách.',
     'Chọn dạng đúng ở năm câu, có nhóm gợi ý.',
     'Chọn dạng đúng ở tám câu, không gợi ý.',
     'Viết năm câu, mỗi câu dùng một động từ đổi nghĩa theo dạng đi sau.'],
    'Học thuộc hai danh sách dài. Nhóm theo nghĩa — hướng tới tương lai, nhìn lại quá khứ — thì nhớ được và suy ra được.',
    'd-anki', 'Ngữ pháp phản xạ',
    'Nộp bảng nhóm động từ theo nghĩa mà mình tự dựng.'),
  B('d-g07', 'grammar', 'Mạo từ',
    'Hết sai a, an, the — lỗi phổ biến nhất của người Việt.',
    ['Điền mạo từ vào hai câu quen.',
     'Xem cây quyết định ba nhánh cho mạo từ, làm lại một câu.',
     'Điền năm chỗ, có cây quyết định trước mặt.',
     'Điền tám chỗ, không nhìn cây.',
     'Soát lại một đoạn văn cũ của mình, sửa mọi lỗi mạo từ.'],
    'Coi mạo từ là chuyện nhỏ. Tiếng Việt không có mạo từ nên đây là lỗi hoá thạch, và nó xuất hiện ở mọi câu.',
    'd-errorreview', 'Sổ lỗi',
    'Đếm số lỗi mạo từ trong bài cũ, báo con số đó cho cố vấn.'),
  B('d-g08', 'grammar', 'So sánh',
    'Diễn đạt hơn kém và ngang bằng cho chính xác.',
    ['Hoàn thành hai câu so sánh hơn.',
     'Xem một ví dụ so sánh kép và so sánh bội, làm lại.',
     'Hoàn thành năm câu, có gợi ý cấu trúc.',
     'Hoàn thành tám câu, không gợi ý.',
     'Viết một đoạn mô tả số liệu dùng đủ ba kiểu so sánh.'],
    'Chỉ dùng "more than". Bài mô tả số liệu cần cả so sánh bội và so sánh kép, nếu không thì rất đơn điệu.',
    'd-task1', 'Ngữ pháp phản xạ',
    'Đưa đoạn mô tả cho bạn kiểm xem có lặp một kiểu so sánh không.'),
  B('d-g09', 'grammar', 'Câu tường thuật',
    'Thuật lại lời người khác đúng thì và đúng ngôi.',
    ['Thuật lại hai câu nói trực tiếp.',
     'Xem bảng lùi thì kèm ví dụ ngoại lệ, làm lại.',
     'Thuật lại năm câu, có nhắc lùi thì.',
     'Thuật lại tám câu, tự lùi.',
     'Thuật lại một đoạn hội thoại năm lượt, giữ đúng ngôi và mốc thời gian.'],
    'Lùi thì máy móc. Sự thật hiển nhiên và điều còn đúng tới giờ thì không lùi — lùi bừa là sai nghĩa.',
    'd-grammar-notice', 'Ngữ pháp phản xạ',
    'Chỉ ra một câu mình lùi thì sai và giải thích lý do không lùi.'),
  B('d-g10', 'grammar', 'Cấu trúc song song',
    'Giữ các thành phần liệt kê cùng một dạng.',
    ['Sửa hai câu liệt kê lệch dạng.',
     'Xem một ví dụ liệt kê song song đúng, nhận ra quy luật.',
     'Sửa năm câu, có gạch chân chỗ lệch.',
     'Sửa tám câu, tự tìm chỗ lệch.',
     'Soát một đoạn văn cũ của mình, sửa mọi chỗ liệt kê lệch dạng.'],
    'Không để ý vì câu vẫn hiểu được. Người chấm nhận ra ngay, và đây là lỗi rất dễ sửa nếu biết nhìn.',
    'd-errorreview', 'Sổ lỗi',
    'Nộp bản trước và sau khi sửa cấu trúc song song.'),

  /* ---------------------------- PHÁT ÂM ------------------------------- */
  B('d-p01', 'pronunciation', 'Bảng âm IPA',
    'Đọc được phiên âm của bất kỳ từ nào trong từ điển.',
    ['Đọc hai âm đã học hôm trước, nhìn gương kiểm hình miệng.',
     'Xem video cận cảnh miệng cho hai âm mới, lặp mỗi âm hai mươi lần.',
     'Đọc năm từ chứa âm mới, có phiên âm kèm.',
     'Đọc tám từ chỉ nhìn phiên âm, không nghe mẫu.',
     'Đọc một câu chứa đủ năm âm vừa học, ghi âm và tự chấm.'],
    'Bỏ IPA vì tin nghe nhiều tự chuẩn. Phát âm sai hoá thạch mất một năm để sửa ở giai đoạn sau.',
    'd-phonics', 'Âm nền',
    'Gửi bản ghi âm mười từ, nhờ người có tai tốt chấm âm nào chưa đạt.'),
  B('d-p02', 'pronunciation', 'Cặp âm tối thiểu',
    'Nghe và nói phân biệt hai âm dễ lẫn.',
    ['Nghe hai cặp quen, chỉ ra từ nào được đọc.',
     'Xem cách khác biệt hình miệng giữa hai âm, làm lại.',
     'Phân biệt năm cặp khi nghe, có đáp án gợi ý.',
     'Phân biệt tám cặp khi nghe, không gợi ý.',
     'Tự đọc năm cặp cho người khác nghe đoán, đạt khi họ đoán đúng bốn trên năm.'],
    'Chỉ luyện nghe mà không luyện nói. Nói ra được thì tai mới phân biệt bền, hai chiều củng cố lẫn nhau.',
    'd-phonics', 'Âm nền',
    'Đọc năm cặp cho bạn đoán, ghi lại cặp nào bạn đoán sai.'),
  B('d-p03', 'pronunciation', 'Trọng âm từ theo hậu tố',
    'Đặt đúng trọng âm ở từ dài mà không cần tra.',
    ['Đánh trọng âm hai từ quen.',
     'Xem ba nhóm hậu tố quyết định trọng âm, làm lại.',
     'Đánh trọng âm năm từ, có nêu hậu tố.',
     'Đánh trọng âm tám từ, tự nhận hậu tố.',
     'Đọc hai mươi từ dài, vỗ tay vào âm tiết mang trọng âm.'],
    'Học vẹt trọng âm từng từ. Học mười hai nhóm hậu tố thì suy ra được cả từ chưa gặp — đây là phần lên điểm nhanh nhất cả đề.',
    'd-pronunciation-drill', 'Âm nền',
    'Chia bảng mười hai nhóm hậu tố của mình cho nhóm.'),
  B('d-p04', 'pronunciation', 'Trọng âm câu',
    'Nhấn đúng từ mang thông tin, không nhấn đều.',
    ['Đọc hai câu, nhấn đúng một từ mang tin.',
     'Nghe cùng một câu nhấn ở ba chỗ khác nhau, thấy nghĩa đổi.',
     'Đọc năm câu, có đánh dấu chỗ nhấn.',
     'Đọc tám câu, tự chọn chỗ nhấn.',
     'Đọc một đoạn 60 giây, ghi âm, kiểm xem có nhấn đều không.'],
    'Nhấn đều mọi từ. Tiếng Anh có nhịp theo trọng âm; nhấn đều làm người nghe không biết đâu là ý chính.',
    'd-chorus', 'Âm nền',
    'Đọc một câu theo ba cách nhấn cho nhóm nghe, hỏi nghĩa đổi thế nào.'),
  B('d-p05', 'pronunciation', 'Nối âm',
    'Nói liền mạch như người bản ngữ, không đọc rời từng từ.',
    ['Đọc hai cụm có nối âm đã học.',
     'Xem một câu chú thích đủ chỗ nối, đọc theo.',
     'Đọc năm câu, có đánh dấu chỗ nối.',
     'Đọc tám câu, tự đánh dấu rồi đọc.',
     'Đọc một đoạn 60 giây có nối âm tự nhiên, ghi âm và so với mẫu.'],
    'Đọc rời từng từ cho rõ. Rời từng từ nghe rõ với người Việt nhưng lạ tai với người bản ngữ.',
    'd-shadow', 'Âm nền',
    'Gửi bản ghi âm kèm bản chú thích chỗ nối của mình.'),
  B('d-p06', 'pronunciation', 'Âm yếu và nuốt âm',
    'Nói đúng nhịp bằng cách làm yếu từ chức năng.',
    ['Đọc hai câu, làm yếu đúng một từ chức năng.',
     'Nghe một câu có ba âm yếu, chỉ ra chúng.',
     'Đọc năm câu, có đánh dấu âm yếu.',
     'Đọc tám câu, tự xác định âm yếu.',
     'Đọc một đoạn có nhịp đúng, ghi âm, đếm số âm yếu mình làm được.'],
    'Đọc rõ mọi từ kể cả giới từ và mạo từ. Đọc rõ hết làm câu mất nhịp và nghe như đang đọc bảng chữ.',
    'd-shadow', 'Âm nền',
    'So bản ghi âm của mình với bản mẫu, chỉ ra chỗ mình còn đọc quá rõ.'),
  B('d-p07', 'pronunciation', 'Âm cuối',
    'Không nuốt phụ âm cuối — lỗi làm người nghe hiểu sai từ.',
    ['Đọc hai cặp từ chỉ khác nhau ở âm cuối.',
     'Xem cách bật nhẹ phụ âm cuối mà không thêm nguyên âm, làm lại.',
     'Đọc năm câu có nhiều âm cuối, có gạch chân.',
     'Đọc tám câu, không gạch chân.',
     'Đọc một đoạn, nhờ người khác chép lại, đếm số từ họ nghe sai.'],
    'Thêm một nguyên âm sau phụ âm cuối cho dễ đọc. Thói quen từ tiếng Việt; nó biến "like" thành hai âm tiết.',
    'd-pronunciation-drill', 'Âm nền',
    'Nhờ bạn chép lại đoạn mình đọc, ghi lại từ nào bạn nghe sai.'),
  B('d-p08', 'pronunciation', 'Ngữ điệu',
    'Lên xuống giọng đúng để truyền đúng thái độ.',
    ['Đọc hai câu hỏi với ngữ điệu đúng.',
     'Nghe cùng một câu với hai ngữ điệu, thấy thái độ đổi.',
     'Đọc năm câu, có vẽ đường ngữ điệu.',
     'Đọc tám câu, tự quyết ngữ điệu.',
     'Đọc một đoạn hội thoại ngắn hai vai, giữ đúng ngữ điệu từng vai.'],
    'Đọc mọi câu với một đường ngữ điệu. Câu hỏi lựa chọn, câu liệt kê và câu hỏi đuôi có ba đường khác nhau.',
    'd-chorus', 'Âm nền',
    'Diễn đoạn hội thoại hai vai cho nhóm nghe, xin nhận xét về thái độ.'),
  B('d-p09', 'pronunciation', 'Nhịp và tiết tấu',
    'Nói theo nhịp trọng âm của tiếng Anh, không theo nhịp âm tiết của tiếng Việt.',
    ['Vỗ tay theo nhịp hai câu mẫu.',
     'Nghe một câu có bốn nhịp dù dài ngắn khác nhau, hiểu vì sao.',
     'Đọc năm câu theo nhịp, có vỗ tay dẫn.',
     'Đọc tám câu theo nhịp, tự giữ nhịp.',
     'Đọc một đoạn 60 giây giữ nhịp đều, ghi âm và tự nghe lại.'],
    'Đọc mỗi âm tiết một nhịp như tiếng Việt. Tiếng Anh dồn các âm tiết không trọng âm lại; đó là gốc của cảm giác "họ nói nhanh".',
    'd-chorus', 'Âm nền',
    'Ghi âm một đoạn và nhờ nhóm vỗ tay theo, xem có bắt được nhịp không.'),
  B('d-p10', 'pronunciation', 'Đọc phiên âm không cần nghe mẫu',
    'Tự đọc đúng một từ mới chỉ bằng phiên âm trong từ điển.',
    ['Đọc hai phiên âm của từ đã học, không nghe mẫu trước.',
     'Xem cách tách âm tiết và tìm dấu trọng âm trong phiên âm, làm lại.',
     'Đọc năm phiên âm, có gợi ý âm khó.',
     'Đọc tám phiên âm, không gợi ý và không nghe mẫu.',
     'Đọc hai mươi phiên âm ngẫu nhiên từ từ điển, đạt khi đúng ít nhất mười tám.'],
    'Đoán cách đọc theo mặt chữ. Chính tả tiếng Anh không đáng tin; phiên âm mới là thứ đáng tin.',
    'd-phonics', 'Âm nền',
    'Ghi âm hai mươi từ, gửi kèm phiên âm để người khác chấm.'),

  /* ---------------------------- TƯ DUY -------------------------------- */
  B('d-m01', 'mindset', 'Giữ chuỗi ngày',
    'Biến việc học thành mặc định, không phải thành quyết định mỗi ngày.',
    ['Tô đen hai ô lịch của hai ngày gần nhất.',
     'Xem một lịch chuỗi 90 ngày đã hoàn thành, đọc ghi chú ngày khó nhất.',
     'Lập kế hoạch năm ngày tới, mỗi ngày ghi rõ giờ và chỗ ngồi.',
     'Thực hiện tám ngày, tự tô lịch không cần ai nhắc.',
     'Viết ba dòng về ngày mình suýt bỏ và điều đã giữ mình lại.'],
    'Đặt mục tiêu ba giờ mỗi ngày. Tuần một hào hứng, tuần bốn tắt máy — giữ mức thấp cho tới khi thấy nhàm.',
    'd-journal', 'Nhật ký học',
    'Dán lịch chuỗi của mình lên nhóm vào cuối mỗi tuần.'),
  B('d-m02', 'mindset', 'Sổ lỗi lặp',
    'Sửa đúng lỗi làm mình mất điểm nhiều nhất, không sửa lan man.',
    ['Đọc lại sổ lỗi, chọn hai lỗi xuất hiện nhiều nhất.',
     'Xem một trang sổ lỗi mẫu chỉ ghi lỗi lặp, làm lại một trang.',
     'Ghi năm lỗi trong tuần theo mã, có bảng mã.',
     'Ghi tám lỗi và tự phân loại, không dùng bảng.',
     'Chọn ba lỗi lặp nhất, đặt mười câu tự luyện cho mỗi lỗi.'],
    'Ghi cả bài chữa vào sổ. Sổ dày là sổ không ai đọc; chỉ trích lỗi LẶP LẠI mới có tác dụng.',
    'd-errorreview', 'Sổ lỗi',
    'Báo cho cố vấn ba lỗi lặp nhất của mình trong tháng.'),
  B('d-m03', 'mindset', 'Đặt mục tiêu theo WOOP',
    'Biến mong muốn thành kế hoạch có tính đến trở ngại.',
    ['Viết một điều mình muốn đạt trong tuần này.',
     'Xem một WOOP mẫu đủ bốn phần, hiểu vì sao phần trở ngại là quan trọng nhất.',
     'Viết WOOP cho năm mục tiêu nhỏ, có khung.',
     'Viết WOOP cho tám mục tiêu, không khung.',
     'Chọn một WOOP, thực hiện trọn tuần rồi viết ba dòng đối chiếu.'],
    'Chỉ hình dung thành công. Hình dung suông làm não tưởng đã đạt được; phải nêu trở ngại và cách vượt.',
    'd-journal', 'Nhật ký học',
    'Chia WOOP tuần này cho một người, nhờ họ hỏi lại vào cuối tuần.'),
  B('d-m04', 'mindset', 'Định danh người học',
    'Chuyển từ "tôi đang cố học" sang "tôi là người học mỗi ngày".',
    ['Viết hai câu bắt đầu bằng "Tôi là người…".',
     'Xem ví dụ về cách một hành vi nhỏ chứng minh một định danh.',
     'Ghi năm bằng chứng trong tuần cho định danh của mình.',
     'Ghi tám bằng chứng, tự nhận ra không cần nhắc.',
     'Viết một đoạn ngắn kể lại mình của sáu tháng trước và mình bây giờ.'],
    'Chờ có kết quả rồi mới tin. Định danh đi trước, hành vi theo sau — không phải ngược lại.',
    'd-journal', 'Nhật ký học',
    'Đọc đoạn viết về định danh của mình trong buổi câu lạc bộ.'),
  B('d-m05', 'mindset', 'Vượt cao nguyên năng lực',
    'Đi tiếp qua giai đoạn học mãi không thấy tiến.',
    ['Ghi lại cảm giác của tuần này bằng hai câu.',
     'Xem đường cong tiến bộ thật của một người học, thấy đoạn phẳng ở giữa.',
     'Đối chiếu số liệu năm tuần gần nhất, tìm chỗ vẫn đang lên.',
     'Đối chiếu tám tuần, tự vẽ đường xu hướng.',
     'Viết ba dòng nêu bằng chứng cho thấy mình vẫn tiến dù không cảm thấy.'],
    'Đổi tài liệu và phương pháp khi thấy chậm. Cao nguyên là dấu hiệu bình thường; đổi lúc đó là bắt đầu lại từ đầu.',
    'd-journal', 'Nhật ký học',
    'Kể cho nhóm về giai đoạn phẳng của mình và cách mình đi qua.'),
  B('d-m06', 'mindset', 'Quản trị năng lượng',
    'Giữ phong độ bằng cách ngủ và nghỉ đúng, không bằng cố thêm giờ.',
    ['Ghi giờ ngủ hai đêm gần nhất.',
     'Xem một biểu đồ liên hệ giữa giờ ngủ và điểm bài luyện, hiểu quan hệ.',
     'Theo dõi năm ngày, ghi giờ ngủ và điểm phiếu.',
     'Theo dõi tám ngày, tự rút nhận xét.',
     'Viết ba dòng nêu khung giờ học tốt nhất của mình, dựa trên số liệu.'],
    'Học thâu đêm trước ngày quan trọng. Mất ngủ làm mất nhiều điểm hơn số điểm học thêm được đêm đó.',
    'd-journal', 'Nhật ký học',
    'Chia khung giờ học tốt nhất của mình cho nhóm cùng so.'),
  B('d-m07', 'mindset', 'So với chính mình',
    'Đo tiến bộ bằng mốc của mình ba tháng trước, không bằng người khác.',
    ['Xem lại một bài mình viết ba tháng trước.',
     'Xem hai bản của cùng một người cách nhau sáu tháng, chỉ ra khác biệt.',
     'Đối chiếu năm chỉ số của mình giữa hai mốc.',
     'Đối chiếu tám chỉ số, tự chọn chỉ số nào đáng theo dõi.',
     'Viết ba dòng nêu điều mình làm được hôm nay mà ba tháng trước không làm được.'],
    'So mình với người học năm năm. So sai đối tượng làm mất động lực mà không cho thông tin gì hữu ích.',
    'd-journal', 'Nhật ký học',
    'Đưa hai bản bài viết cách nhau ba tháng cho nhóm xem.'),
  B('d-m08', 'mindset', 'Dựng môi trường học',
    'Làm cho việc học dễ bắt đầu hơn việc bỏ.',
    ['Dọn bàn học, để sẵn hai thứ cần dùng.',
     'Xem một bố trí bàn học mẫu, chỉ ra ba thứ được đưa ra tầm tay.',
     'Sửa năm điểm trong môi trường của mình, có danh sách gợi ý.',
     'Sửa tám điểm trong môi trường học, tự nhận ra chứ không dùng danh sách gợi ý.',
     'Ghi lại thời gian từ lúc ngồi xuống tới lúc bắt đầu thật, đo trước và sau khi sửa.'],
    'Dựa vào ý chí. Ý chí cạn theo ngày; môi trường thì không đổi, nên môi trường thắng.',
    'd-journal', 'Nhật ký học',
    'Chụp bàn học trước và sau khi sửa, chia cho nhóm.'),
  B('d-m09', 'mindset', 'Cam kết công khai',
    'Dùng áp lực xã hội đúng cách để giữ nhịp.',
    ['Nói với một người mục tiêu tuần này của mình.',
     'Xem một mẫu cam kết có mốc và có người kiểm, hiểu vì sao cần cả hai.',
     'Viết năm cam kết nhỏ có người kiểm, theo khung.',
     'Viết tám cam kết, tự đặt mốc và người kiểm.',
     'Báo cáo kết quả cam kết tuần cho đúng người đã hẹn.'],
    'Cam kết chung chung với cả nhóm. Cam kết không có người cụ thể kiểm thì không ai kiểm.',
    'd-club', 'Câu lạc bộ',
    'Báo cáo kết quả cam kết trước nhóm vào đúng ngày đã hẹn.'),
  B('d-m10', 'mindset', 'Phục hồi sau khi đứt chuỗi',
    'Quay lại trong 24 giờ thay vì bỏ luôn.',
    ['Ghi ngày gần nhất mình bỏ buổi và lý do thật.',
     'Xem quy tắc không bỏ hai ngày liên tiếp, hiểu vì sao là hai chứ không phải một.',
     'Lập kế hoạch quay lại cho năm tình huống hay gặp.',
     'Lập kế hoạch cho tám tình huống, tự nghĩ ra.',
     'Viết ba dòng cam kết cụ thể cho lần đứt chuỗi tiếp theo.'],
    'Bỏ luôn vì đã lỡ một ngày. Một ngày là tai nạn; hai ngày liên tiếp là thói quen mới đang hình thành.',
    'd-journal', 'Nhật ký học',
    'Chia kế hoạch quay lại của mình cho người kiểm cam kết.'),
];

/* ------------------------- TẦNG VÀ CẤP ---------------------------------- */

/** Học liệu và liều lượng theo tầng. Cấp quyết định ngưỡng, tầng quyết định chất liệu. */
const TANG = [
  {no: 1, ten: 'KHAI NHĨ', hocLieu: 'Ngữ liệu A1–A2, có hình minh hoạ, câu dưới 10 từ, tốc độ chậm.', phutHeSo: 0.8},
  {no: 2, ten: 'DỰNG NỀN', hocLieu: 'Ngữ liệu A2–B1, đời sống hằng ngày, câu 10–15 từ, tốc độ gần tự nhiên.', phutHeSo: 1.0},
  {no: 3, ten: 'BẬT TIẾNG', hocLieu: 'Ngữ liệu B1–B2, chủ đề xã hội, câu 15–20 từ, tốc độ tự nhiên.', phutHeSo: 1.15},
  {no: 4, ten: 'HỌC THUẬT', hocLieu: 'Ngữ liệu B2–C1, văn học thuật và xã luận, câu dài nhiều mệnh đề.', phutHeSo: 1.3},
  {no: 5, ten: 'TINH LUYỆN', hocLieu: 'Ngữ liệu C1 trở lên, giọng vùng miền khác nhau, có nhiễu và áp lực giờ.', phutHeSo: 1.5},
];

const PHUT_GOC: Record<PhanPhieu['ma'], number> = {KHOI: 2, MAU: 3, DAN: 5, TU: 8, CHUOI: 4};

/* -------------------------- SINH HAI NGHÌN ------------------------------ */

let cachePhieu: Phieu[] | null = null;
let cacheNhiemVu: NhiemVu[] | null = null;

function sinh(): {phieu: Phieu[]; nhiemVu: NhiemVu[]} {
  const phieu: Phieu[] = [];
  const nhiemVu: NhiemVu[] = [];
  let stt = 0;

  for (const d of DANG_BAI) {
    for (const lv of LEVELS) {
      const tangNo = Number(lv.tierId.split('-')[1]);
      const tang = TANG[tangNo - 1];
      stt += 1;

      const phan: PhanPhieu[] = KHUNG.map((k, i) => ({
        no: i + 1,
        ma: k.ma,
        ten: k.ten,
        soCau: k.soCau,
        phut: Math.max(2, Math.round(PHUT_GOC[k.ma] * tang.phutHeSo)),
        lam: d.lam[i],
        chuan:
          k.ma === 'CHUOI'
            ? `Nối trọn chuỗi, không bỏ câu nào. Đúng từ ${Math.ceil(k.soCau * 0.9)}/${k.soCau} câu trở lên.`
            : `Đúng từ ${Math.ceil(k.soCau * 0.9)}/${k.soCau} câu trở lên mới được sang phần sau.`,
        trong: k.trong,
      }));

      const pid = `pl-${d.id.slice(2)}-${lv.id}`;
      const nid = `nv-${d.id.slice(2)}-${lv.id}`;

      phieu.push({
        id: pid,
        no: stt,
        skill: d.skill,
        dangId: d.id,
        dangTen: d.ten,
        levelId: lv.id,
        tier: tangNo,
        capTrongTang: lv.no,
        ten: `${d.ten} — cấp ${lv.name}`,
        mucTieu: d.mucTieu,
        hocLieu: tang.hocLieu,
        phan,
        tongCau: SO_CAU_MOI_PHIEU,
        tongPhut: phan.reduce((s, p) => s + p.phut, 0),
        nguongDat: NGUONG_DAT,
        drillId: d.drillId,
        nhiemVuId: nid,
        bayHayMac: d.bay,
      });

      nhiemVu.push({
        id: nid,
        no: stt,
        phieuId: pid,
        phanLuyen: d.phanLuyen,
        ten: `Chia sẻ sau phiếu ${d.ten.toLowerCase()} — cấp ${lv.name}`,
        viec: `Làm xong phiếu rồi mang kết quả sang phần luyện “${d.phanLuyen}” trong cùng ngày.`,
        chiaSe: d.chiaSe,
        bangChung:
          tangNo <= 2
            ? 'Ảnh chụp phiếu đã làm, hoặc bản ghi âm dưới 90 giây.'
            : 'Bản ghi âm hoặc bản viết kèm nhận xét của ít nhất một người khác.',
        phut: 10 + (tangNo - 1) * 2,
        hanGio: 'Trong 24 giờ kể từ khi chấm xong phiếu.',
        diem: 5 + tangNo,
      });
    }
  }
  return {phieu, nhiemVu};
}

export function phieuLuyen(): Phieu[] {
  if (!cachePhieu) {
    const r = sinh();
    cachePhieu = r.phieu;
    cacheNhiemVu = r.nhiemVu;
  }
  return cachePhieu;
}

export function nhiemVuChiaSe(): NhiemVu[] {
  if (!cacheNhiemVu) phieuLuyen();
  return cacheNhiemVu!;
}

/* ---------------------------- LUỒNG LÀM --------------------------------- */

export const LUONG_LAM: BuocLam[] = [
  {no: 1, ma: 'nhan', ten: 'NHẬN PHIẾU', ai: 'hệ thống',
   lam: 'Hệ thống chọn phiếu theo kỹ năng đang yếu nhất và đúng cấp độ hiện tại của học viên.',
   raGi: 'Một phiếu, năm phần, hai mươi câu, kèm mục tiêu và bẫy hay mắc.',
   chanNeu: 'Học viên chưa hoàn thành phiếu trước đó — không phát phiếu mới khi phiếu cũ còn dở.'},
  {no: 2, ma: 'lam-phan', ten: 'LÀM TỪNG PHẦN', ai: 'học viên',
   lam: 'Làm phần KHỞI, chấm ngay, rồi mới mở phần MẪU. Cứ thế tới phần TỰ.',
   raGi: 'Điểm từng phần, biết ngay đúng sai chứ không chờ tới cuối.',
   chanNeu: 'Phần đang làm chưa đạt 90% — phải làm lại phần đó trước khi sang phần sau.'},
  {no: 3, ma: 'noi-chuoi', ten: 'HOÀN THÀNH CHUỖI CÂU', ai: 'học viên',
   lam: 'Phần CHUỖI nối tất cả những gì vừa làm thành một sản phẩm liền mạch: một đoạn nói, một đoạn viết, một bản chép trọn vẹn.',
   raGi: 'Một sản phẩm hoàn chỉnh, không phải hai mươi câu rời.',
   chanNeu: 'Bốn phần trước chưa xong. Chuỗi là phần cuối, không làm trước được.'},
  {no: 4, ma: 'cham', ten: 'CHẤM KẾT QUẢ', ai: 'hệ thống',
   lam: 'Chấm theo trọng số từng phần, ra tỉ lệ chung và tỉ lệ từng phần.',
   raGi: 'Một con số cho cả phiếu, và năm con số cho năm phần.',
   chanNeu: 'Không chặn. Luôn chấm, kể cả khi làm dở — điểm dở cũng là thông tin.'},
  {no: 5, ma: 'bao', ten: 'BÁO KẾT QUẢ', ai: 'hệ thống',
   lam: 'Hiện điểm từng phần cạnh ngưỡng của phần đó, chỉ rõ phần nào kéo điểm xuống.',
   raGi: 'Học viên thấy đúng chỗ hổng, không phải chỉ thấy một điểm số chung.',
   chanNeu: 'Không chặn.'},
  {no: 6, ma: 'nhan-xet', ten: 'NHẬN XÉT TÌNH HÌNH', ai: 'trợ lý AI',
   lam: 'Đối chiếu phiếu này với ba phiếu gần nhất cùng kỹ năng, nói rõ đang lên, đang đứng, hay đang xuống.',
   raGi: 'Nhận xét về XU HƯỚNG, không phải lời khen chê một lần.',
   chanNeu: 'Chưa đủ ba phiếu cùng kỹ năng thì nói thẳng là chưa đủ dữ liệu, không đoán.'},
  {no: 7, ma: 'giai-phap', ten: 'ĐƯA GIẢI PHÁP TỐI ƯU', ai: 'trợ lý AI',
   lam: 'Từ phần yếu nhất, tra kho 1.000 giải pháp lấy đúng đơn kê cho triệu chứng đó ở đúng cấp độ này.',
   raGi: 'Tối đa ba đơn kê. Kê nhiều hơn là cách chắc chắn để không đơn nào được làm.',
   chanNeu: 'Hai đơn liên tiếp không có tác dụng thì dừng kê, chuyển cho cố vấn là người thật.'},
  {no: 8, ma: 'dinh-huong', ten: 'ĐỊNH HƯỚNG BƯỚC KẾ', ai: 'hệ thống',
   lam: 'Dưới 70% thì làm lại chính phiếu này. Từ 70% đến dưới 90% thì làm phiếu cùng dạng ở cấp hiện tại. Từ 90% trở lên thì sang dạng bài tiếp theo.',
   raGi: 'Đúng một việc kế tiếp, không phải một danh sách lựa chọn.',
   chanNeu: 'Không chặn.'},
  {no: 9, ma: 'chia-se', ten: 'LÀM NHIỆM VỤ CHIA SẺ', ai: 'học viên',
   lam: 'Mang kết quả sang phần luyện tương ứng và chia sẻ cho ít nhất một người khác trong 24 giờ.',
   raGi: 'Bằng chứng có người thứ hai nghe hoặc đọc, chứ không tự chấm một mình.',
   chanNeu: 'Chưa chấm xong phiếu thì chưa có gì để chia sẻ.'},
  {no: 10, ma: 'nang-cap', ten: 'XÉT NÂNG GIAI ĐOẠN', ai: 'cố vấn',
   lam: 'Khi học viên đạt 90% trên toàn bộ phiếu của cấp hiện tại, cố vấn xét nâng cấp bằng một bài thi cấp độ, không nâng tự động.',
   raGi: 'Quyết định nâng hay chưa, kèm lý do bằng số liệu.',
   chanNeu: 'Chưa làm đủ số phiếu tối thiểu của cấp, hoặc tỉ lệ đạt dưới 90%.'},
];

/* ---------------------------- CHẤM PHIẾU -------------------------------- */

export const NGUONG_LAM_LAI = 70;

/**
 * Chấm một phiếu. Hàm thuần, không đọc gì bên ngoài ngoài chính phiếu.
 *
 * `dung` là số câu đúng của từng phần, đúng thứ tự năm phần.
 */
export function chamPhieu(p: Phieu, dung: number[]): KetQuaPhieu {
  if (dung.length !== p.phan.length)
    throw new Error(`Cần ${p.phan.length} số câu đúng, nhận ${dung.length}`);

  const tungPhan: DiemPhan[] = p.phan.map((ph, i) => {
    const d = Math.max(0, Math.min(ph.soCau, Math.round(dung[i])));
    const tiLe = (d / ph.soCau) * 100;
    return {ma: ph.ma, ten: ph.ten, dung: d, soCau: ph.soCau, tiLe: Number(tiLe.toFixed(1)), dat: tiLe >= NGUONG_DAT};
  });

  const tiLe = Number(
    p.phan.reduce((s, ph, i) => s + (tungPhan[i].tiLe * ph.trong) / 100, 0).toFixed(1),
  );
  const yeu = [...tungPhan].sort((a, b) => a.tiLe - b.tiLe)[0];
  const datKpi = tiLe >= NGUONG_DAT;

  const dinhHuong: KetQuaPhieu['dinhHuong'] =
    tiLe < NGUONG_LAM_LAI ? 'làm lại' : tiLe < NGUONG_DAT ? 'thử thách tiếp' : 'nâng cấp độ';

  // Khi mọi phần đều trọn vẹn thì không có "phần yếu nhất" — nói là có thì
  // vừa sai vừa làm học viên đi tìm một lỗ hổng không tồn tại.
  const conHo = yeu.tiLe < 100;
  const nhanXet = datKpi
    ? conHo
      ? `Đạt ${tiLe}% — qua ngưỡng ${NGUONG_DAT}%. Phần mỏng nhất là ${yeu.ten} ở ${yeu.tiLe}%, giữ mắt vào đó ở phiếu sau.`
      : `Đạt ${tiLe}% — trọn vẹn cả năm phần. Phiếu này không còn gì để sửa; phiếu sau nên khó hơn một bậc.`
    : tiLe < NGUONG_LAM_LAI
      ? `Được ${tiLe}%, dưới ${NGUONG_LAM_LAI}%. Phần ${yeu.ten} chỉ ${yeu.tiLe}% — đây không phải chuyện cẩu thả mà là một lỗ hổng thật.`
      : `Được ${tiLe}%, còn thiếu ${(NGUONG_DAT - tiLe).toFixed(1)} điểm phần trăm nữa là đạt. Phần ${yeu.ten} ở ${yeu.tiLe}% là chỗ mất điểm chính.`;

  const giaiPhap = datKpi
    ? `Không kê đơn. Sang dạng bài kế tiếp cùng cấp, và làm nhiệm vụ chia sẻ ${p.nhiemVuId} trong 24 giờ.`
    : `Tra kho giải pháp theo kỹ năng ${p.skill} ở cấp ${p.levelId}, lấy tối đa ba đơn. Bài luyện gốc của dạng này là ${p.drillId}. Bẫy đã được báo trước: ${p.bayHayMac}`;

  const buocKe =
    dinhHuong === 'làm lại'
      ? `Làm lại đúng phiếu ${p.id} sau khi chạy bài luyện ${p.drillId} ít nhất ba ngày.`
      : dinhHuong === 'thử thách tiếp'
        ? `Làm một phiếu khác cùng cấp ${p.levelId}, ưu tiên dạng có phần ${yeu.ten} nặng.`
        : `Đủ điều kiện sang dạng bài kế tiếp. Đạt 90% trên toàn bộ phiếu của cấp ${p.levelId} thì xin xét nâng cấp.`;

  return {phieuId: p.id, tungPhan, tiLe, datKpi, phanYeuNhat: yeu.ten, nhanXet, giaiPhap, dinhHuong, buocKe};
}

/* ------------------------- XÉT NÂNG GIAI ĐOẠN --------------------------- */

/** Số phiếu tối thiểu phải làm ở một cấp trước khi được xét nâng. */
export const PHIEU_TOI_THIEU = 8;

/**
 * Xét nâng giai đoạn theo KPI 90%.
 *
 * Hai điều kiện phải đạt cùng lúc, và đây là chỗ dễ gian nhất nếu chỉ xét một:
 *   · làm đủ số phiếu tối thiểu — chống việc làm đúng một phiếu dễ rồi xin lên;
 *   · từ 90% số phiếu đạt ngưỡng — chống việc lấy trung bình để che vài phiếu tệ.
 */
export function xetNangCap(diemCacPhieu: number[]): XetNangCap {
  const n = diemCacPhieu.length;
  const trungBinh = n ? Number((diemCacPhieu.reduce((s, x) => s + x, 0) / n).toFixed(1)) : 0;
  const soPhieuDat = diemCacPhieu.filter((d) => d >= NGUONG_DAT).length;
  const tiLeDat = n ? Number(((soPhieuDat / n) * 100).toFixed(1)) : 0;
  const duPhieu = n >= PHIEU_TOI_THIEU;
  const duTiLe = tiLeDat >= NGUONG_DAT;

  const vuongO = !duPhieu
    ? `Mới làm ${n} phiếu, cần tối thiểu ${PHIEU_TOI_THIEU}.`
    : !duTiLe
      ? `Tỉ lệ phiếu đạt là ${tiLeDat}%, cần từ ${NGUONG_DAT}%.`
      : '';

  return {
    soPhieu: n,
    trungBinh,
    soPhieuDat,
    tiLeDat,
    duDieuKien: duPhieu && duTiLe,
    vuongO,
    ketLuan:
      duPhieu && duTiLe
        ? `Đủ điều kiện xét nâng giai đoạn: ${soPhieuDat}/${n} phiếu đạt, tỉ lệ ${tiLeDat}%. Bước kế là bài thi cấp độ với cố vấn — hệ thống không tự nâng.`
        : `Chưa đủ điều kiện. ${vuongO} Trung bình hiện tại ${trungBinh}%.`,
  };
}

/* ---------------------------- SỐ ĐỐI CHIẾU ------------------------------ */

export const PHIEU_SO = {
  soDangBai: DANG_BAI.length,
  soCapDo: LEVELS.length,
  soPhieu: DANG_BAI.length * LEVELS.length,
  soNhiemVu: DANG_BAI.length * LEVELS.length,
  soCauMoiPhieu: SO_CAU_MOI_PHIEU,
  tongCau: DANG_BAI.length * LEVELS.length * SO_CAU_MOI_PHIEU,
  soPhan: KHUNG.length,
  soBuoc: LUONG_LAM.length,
  nguongDat: NGUONG_DAT,
};
