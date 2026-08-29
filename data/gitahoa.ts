/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {SanId, GitaHoa, TangHapThu, CapChuyenMon} from '../types';
import {GITA_JOURNEY} from './gita';

/* ==========================================================================
   GITA HOÁ — ĐƯA MÔ THỨC RA KHỎI LỚP HỌC

   Mô thức GITA có mười hai bước, và mười hai bước ấy đang chỉ chạy trong
   phạm vi buổi học. Nhưng một học sinh sống ba nơi: ở nhà, ở trường, và
   ngoài xã hội. Nếu mô thức chỉ chạy ở một nơi thì hai nơi còn lại vẫn theo
   luật cũ, và học sinh phải đổi người mỗi lần bước qua cửa.

   Tệp này đặt từng bước GITA vào từng sân — ba sân, mười hai bước, ba mươi
   sáu ô. Mỗi ô nói rõ bốn thứ: bước ấy TRÔNG NHƯ THẾ NÀO ở sân đó, người lớn
   làm gì, học sinh làm gì, và hai dấu hiệu để biết nó đang chạy hay đang
   hỏng. Không có hai dấu hiệu cuối thì cả bảng chỉ là khẩu hiệu.

   NÓI THẲNG MỘT ĐIỀU
   Học viện không kiểm soát được sân gia đình và sân xã hội. Ba mươi sáu ô
   dưới đây là thứ ĐỀ NGHỊ với phụ huynh và với nhà trường, không phải thứ
   bắt buộc được. Vì vậy mỗi ô đều viết ở dạng việc cụ thể làm được trong một
   tuần, chứ không phải một triết lý cần tin.
   ========================================================================== */

export const GITA_HOA_CREED = {
  name: 'GITA HOÁ BA SÂN',
  claim:
    'Mười hai bước GITA đặt vào ba sân của một học sinh — gia đình, trường học, xã hội — thành ba mươi sáu việc cụ thể làm được trong một tuần.',
  viSao:
    'Một học sinh sống ba nơi. Mô thức chỉ chạy ở lớp học thì hai nơi còn lại vẫn theo luật cũ, và em phải đổi người mỗi lần bước qua cửa. Chính chỗ đổi người đó là nơi phần lớn tiến bộ bị mất.',
  gioiHan:
    'Học viện không kiểm soát được sân gia đình và sân xã hội. Bảng này là thứ đề nghị, không phải thứ bắt buộc. Nên mỗi ô viết ở dạng một việc làm được trong tuần, chứ không phải một triết lý cần tin.',
  danhThuc:
    'Đích cuối không phải điểm số. Đích là một người có thói quen tự dựng được hệ thống cho bất kỳ việc gì mình muốn giỏi — tiếng Anh chỉ là thứ đầu tiên họ dùng nó để chứng minh.',
};

export const SAN = [
  {id: 'gia-dinh' as SanId, ten: 'GIA ĐÌNH', ai: 'Cha mẹ và người thân trong nhà.',
   suc: 'Sân có sức ảnh hưởng lớn nhất và ít được thiết kế nhất.',
   deSai: 'Người lớn dễ chuyển từ đồng hành sang giám sát mà không nhận ra.'},
  {id: 'truong-hoc' as SanId, ten: 'TRƯỜNG HỌC', ai: 'Thầy cô, bạn cùng lớp, ban cán sự.',
   suc: 'Sân chiếm nhiều giờ nhất trong tuần của học sinh.',
   deSai: 'Áp lực điểm số lấn át việc học thật, và học sinh học để qua bài kiểm chứ không để giỏi.'},
  {id: 'xa-hoi' as SanId, ten: 'XÃ HỘI', ai: 'Cộng đồng, câu lạc bộ, người lạ, môi trường mạng.',
   suc: 'Sân duy nhất trả lại phản hồi thật, không nương tay.',
   deSai: 'Học sinh né sân này tới khi buộc phải bước vào, và lúc đó thì không kịp chuẩn bị.'},
];

/* ------------------------- BA MƯƠI SÁU Ô -------------------------------- */

/** Bốn dòng cho mỗi bước, đúng thứ tự ba sân. */
const O: Record<number, [string, string, string, string, string][]> = {
  1: [
    ['Bữa cơm có mười phút không ai cầm điện thoại, và người lớn hỏi trước khi khuyên.',
     'Hỏi một câu mở rồi im lặng đủ lâu để con nói hết, không cắt ngang để sửa.',
     'Nói ra một khó khăn thật trong tuần, không phải một câu cho xong.',
     'Con chủ động kể chuyện trường mà không cần hỏi.',
     'Mỗi câu con nói đều dẫn tới một lời khuyên của bố mẹ. Con sẽ ngừng kể.'],
    ['Thầy cô hỏi một câu về việc học của em trước khi nhận xét bài.',
     'Dành hai phút đầu buổi hỏi cả lớp hôm nay ai đang mắc ở đâu.',
     'Nói ra chỗ mình chưa hiểu ngay trong buổi, không giấu tới lúc kiểm tra.',
     'Có học sinh giơ tay nói chưa hiểu mà không sợ bị chê.',
     'Cả lớp im lặng khi được hỏi có ai chưa hiểu không. Im lặng đó không phải hiểu.'],
    ['Trong câu lạc bộ, người mới được hỏi trước khi được dạy.',
     'Người dẫn nhóm hỏi mục tiêu của từng người trước khi xếp hoạt động.',
     'Nói được mình đến đây để làm gì, bằng một câu.',
     'Người mới quay lại buổi thứ hai.',
     'Buổi nào cũng chỉ vài người nói, số còn lại ngồi nghe. Nhóm đang mất người.'],
  ],
  2: [
    ['Gia đình biết con đang ở đâu bằng số liệu, không bằng cảm giác.',
     'Xem bảng số liệu tuần của con và hỏi về xu hướng, không hỏi về điểm.',
     'Tự ghi năm chỉ số của mình mỗi cuối tuần.',
     'Con nói được mình mạnh yếu ở đâu mà không cần bố mẹ nhắc.',
     'Bố mẹ chỉ hỏi mỗi câu hôm nay được mấy điểm. Con sẽ học để trả lời câu đó.'],
    ['Bài kiểm tra dùng để chỉ ra lỗ hổng, không chỉ để xếp hạng.',
     'Trả bài kèm một dòng chỉ ra lỗi lặp, không chỉ ghi điểm.',
     'Ghi lỗi lặp của mình vào sổ ngay khi nhận bài.',
     'Học sinh nhớ được lỗi lặp của mình mà không cần mở bài cũ.',
     'Bài trả về chỉ có điểm và chữ ký. Không ai học được gì từ nó.'],
    ['Có chỗ để đo mình với người ngoài lớp, không chỉ với bạn cùng bàn.',
     'Tổ chức một buổi đo chung mỗi quý, ẩn danh kết quả.',
     'Tham gia ít nhất một lần đo ngoài phạm vi lớp mình.',
     'Học sinh biết vị trí thật của mình mà không hoảng.',
     'Chỉ đo trong nội bộ lớp. Ao nhỏ thì con cá nào cũng thấy mình lớn.'],
  ],
  3: [
    ['Cả nhà biết lộ trình của con, và biết mốc nào là mốc phải dừng lại xem lại.',
     'Dán lộ trình lên chỗ ai cũng thấy, đánh dấu các mốc xét lại.',
     'Tự đánh dấu tiến độ lên lộ trình mỗi tuần.',
     'Con chỉ được vào lộ trình đang ở đoạn nào mà không cần tìm.',
     'Lộ trình cất trong ngăn kéo. Cái gì không nhìn thấy thì không tồn tại.'],
    ['Kế hoạch học của em khớp với lịch của trường, không đánh nhau với nó.',
     'Biết lịch kiểm tra của trường và điều chỉnh liều lượng quanh nó.',
     'Báo trước lịch kiểm tra để điều chỉnh nhịp học, không bỏ buổi lặng lẽ.',
     'Tuần có kiểm tra vẫn giữ được chuỗi, dù ở mức sàn.',
     'Tới mùa kiểm tra là chuỗi đứt hẳn. Mỗi kỳ mất ba tuần, một năm mất chín.'],
    ['Có người ngoài gia đình cũng biết mục tiêu của em và hỏi lại đúng hẹn.',
     'Người dẫn nhóm ghi mục tiêu quý của từng thành viên và hỏi lại đúng hạn.',
     'Nói mục tiêu của mình trước nhóm và nhận ngày báo cáo.',
     'Có người hỏi lại đúng ngày đã hẹn.',
     'Mục tiêu nói ra rồi không ai nhắc. Cam kết không có người kiểm thì không phải cam kết.'],
  ],
  4: [
    ['Mỗi tuần có một cuộc nói chuyện riêng, không phải kiểm tra bài.',
     'Ngồi riêng với con mười lăm phút, hỏi về cái khó chứ không hỏi về điểm.',
     'Chuẩn bị trước một câu hỏi thật để mang tới buổi nói chuyện.',
     'Con mang vấn đề tới trước khi nó thành chuyện lớn.',
     'Buổi nói chuyện biến thành buổi kiểm tra bài. Lần sau con sẽ tránh.'],
    ['Có một thầy cô mà em dám hỏi câu ngốc nghếch.',
     'Dành mười phút cuối buổi cho câu hỏi riêng, không chấm điểm câu hỏi.',
     'Hỏi câu mình sợ là ngốc, ít nhất một lần mỗi tuần.',
     'Có học sinh tìm tới hỏi ngoài giờ.',
     'Không ai hỏi gì ngoài giờ. Đó không phải vì lớp đã hiểu hết.'],
    ['Có một người đi trước sẵn sàng ngồi xuống khi em bí.',
     'Ghép mỗi người mới với một người đi trước, có tên cụ thể.',
     'Chủ động nhắn cho người đi trước khi bí, không chờ được hỏi.',
     'Người mới nhắn tin hỏi trước khi bỏ cuộc.',
     'Ghép cặp trên giấy nhưng không ai nhắn ai. Ghép mà không có việc chung thì không thành cặp.'],
  ],
  5: [
    ['Nhà có một khung giờ học cố định mà cả nhà tôn trọng.',
     'Giữ khung giờ đó không bị cắt ngang, kể cả bởi việc nhà.',
     'Ngồi vào đúng khung giờ đó, kể cả ngày chỉ làm được mười phút.',
     'Tới giờ là con tự ngồi vào, không cần gọi.',
     'Khung giờ bị cắt vì việc gấp mỗi tuần vài lần. Cái gì cũng gấp hơn nó thì nó sẽ biến mất.'],
    ['Ba trục toán, tiếng Anh và tư duy được nhìn cùng nhau, không tách rời.',
     'Chỉ ra chỗ một kỹ năng tư duy vừa dạy dùng được sang môn khác.',
     'Ghi lại một lần mình dùng cách học của môn này sang môn khác.',
     'Học sinh tự chuyển được cách làm giữa các môn.',
     'Mỗi môn một thế giới riêng. Học sinh học ba lần cùng một thứ mà không biết.'],
    ['Kỹ năng học được mang ra dùng ở việc ngoài trường.',
     'Giao một việc thật cần dùng đúng kỹ năng vừa học.',
     'Nhận một việc thật và làm xong, không phải bài tập giả định.',
     'Có sản phẩm thật đưa cho người ngoài dùng được.',
     'Chỉ luyện trong bài tập. Bài tập không bao giờ trả lại phản hồi thật.'],
  ],
  6: [
    ['Nhà là nơi nói được chuyện mệt mà không bị coi là lười.',
     'Nghe hết chuyện mệt trước khi đưa giải pháp, và hỏi con muốn nghe giải pháp không.',
     'Nói ra khi thấy quá tải, trước khi bỏ buổi.',
     'Con nói mệt trước khi đứt chuỗi, không phải sau.',
     'Mọi lời than đều bị đáp lại bằng so sánh với người khác. Con sẽ ngừng nói.'],
    ['Có đường đi rõ ràng khi một học sinh gặp chuyện tâm lý.',
     'Biết dấu hiệu cần chuyển tới người chuyên môn, và chuyển sớm.',
     'Biết mình có thể tìm ai, và tìm khi cần.',
     'Có học sinh chủ động tìm hỗ trợ.',
     'Coi mọi vấn đề tâm lý là chuyện lười. Đây là chỗ hỏng đắt nhất trong ba sân.'],
    ['Cộng đồng không biến thất bại của một người thành trò cười.',
     'Đặt luật rõ về cách phản hồi trong nhóm, và giữ luật đó.',
     'Phản hồi cho người khác theo đúng luật đã đặt.',
     'Người vừa thất bại vẫn quay lại buổi sau.',
     'Nhóm cười một người sai. Sau đó sẽ không ai dám sai công khai nữa, và không ai học được gì.'],
  ],
  7: [
    ['Mỗi quý có một đợt tăng tốc mà cả nhà biết trước và dọn đường cho.',
     'Dọn lịch gia đình quanh đợt tăng tốc, không xếp việc lớn vào đó.',
     'Cam kết trước cho đợt tăng tốc và giữ đúng.',
     'Đợt tăng tốc diễn ra đúng kế hoạch, không bị dời.',
     'Đợt nào cũng bị dời vì bận. Dời hai lần thì lần thứ ba không ai còn tin nữa.'],
    ['Trường có hoạt động cho học sinh bứt lên, không chỉ có hoạt động cho học sinh yếu.',
     'Mở nhóm nâng cao có tiêu chí vào rõ ràng và có đường ra.',
     'Đăng ký nhóm nâng cao khi đủ tiêu chí, không chờ được mời.',
     'Có học sinh tự xin vào nhóm nâng cao.',
     'Nhóm nâng cao chỉ dành cho vài em được chọn sẵn. Nó thành đặc quyền chứ không thành động lực.'],
    ['Có trại hoặc kỳ tập trung ngoài trường mỗi năm ít nhất một lần.',
     'Tổ chức hoặc giới thiệu một kỳ tập trung có mục tiêu đo được.',
     'Tham gia và mang về một sản phẩm cụ thể.',
     'Sau trại, học sinh giữ được ít nhất một thói quen mới trong ba tuần.',
     'Trại vui rồi hết. Không có việc mang về thì trại chỉ là một kỳ nghỉ.'],
  ],
  8: [
    ['Gia đình ghi nhận nỗ lực trước, ghi nhận kết quả sau.',
     'Nói ra một điều con làm được trong tuần, cụ thể, không nói chung chung.',
     'Ghi lại một việc mình làm được mà ba tháng trước chưa làm được.',
     'Con kể về tiến bộ của mình mà không cần được hỏi.',
     'Chỉ ghi nhận khi có điểm cao. Không có điểm cao trong giai đoạn cao nguyên, và đó là lúc cần ghi nhận nhất.'],
    ['Có chỗ để một học sinh trung bình bứt lên mà không bị nghi ngờ.',
     'Công nhận tiến bộ theo mức tăng, không chỉ theo thứ hạng.',
     'Nộp bằng chứng tiến bộ của mình, kể cả khi thứ hạng chưa đổi.',
     'Học sinh không đứng đầu lớp vẫn được nêu tên vì tiến bộ.',
     'Chỉ vinh danh top đầu. Phần lớn lớp học không có lý do gì để cố.'],
    ['Có sân để thử sức thật, và thất bại ở đó không để lại sẹo.',
     'Tạo cơ hội thi thử, thuyết trình, thi đấu với mức rủi ro thấp.',
     'Đăng ký ít nhất một lần thử sức mỗi quý.',
     'Học sinh dám đăng ký lần thứ hai sau khi trượt lần đầu.',
     'Chỉ có sân lớn, không có sân tập. Ai cũng chờ tới lúc chắc thắng, và chờ mãi.'],
  ],
  9: [
    ['Nhà biết con thích gì và không cố sửa cái thích đó.',
     'Hỏi về thứ con tự tìm hiểu, và không quy nó về ích lợi thi cử.',
     'Dành mỗi tuần một khoảng cho thứ mình thật sự thích.',
     'Con tự học thêm về thứ không ai giao.',
     'Mọi sở thích đều bị hỏi có ích gì cho việc thi. Sở thích sẽ chuyển vào bí mật.'],
    ['Có môn hoặc hoạt động để học sinh đi sâu hơn chương trình.',
     'Cho phép một dự án đi sâu thay cho một bài tập thường.',
     'Chọn một chủ đề đi sâu và làm tới nơi.',
     'Có học sinh làm quá yêu cầu vì muốn, không vì điểm.',
     'Mọi thứ đều đóng khung trong chương trình. Không ai đi sâu, vì đi sâu không được tính.'],
    ['Có cộng đồng cùng mối quan tâm để đi sâu cùng nhau.',
     'Kết nối học sinh với nhóm cùng quan tâm, kể cả ngoài trường.',
     'Tham gia và đóng góp, không chỉ theo dõi.',
     'Học sinh nói được mình học được gì từ nhóm trong tháng.',
     'Chỉ theo dõi mà không đóng góp. Đó là tiêu thụ, không phải tham gia.'],
  ],
  10: [
    ['Con được giao việc thật trong nhà và việc đó có người phụ thuộc vào.',
     'Giao một việc thật, có hạn, có người khác trông vào — rồi không làm hộ.',
     'Nhận việc và làm xong đúng hạn, kể cả khi không thích.',
     'Con hoàn thành việc mà không cần nhắc.',
     'Giao rồi làm hộ khi con chậm. Lần sau con sẽ chờ được làm hộ.'],
    ['Học sinh khá được giao dạy lại, và việc dạy lại được tính là học.',
     'Tổ chức để học sinh khá kèm bạn, có khung và có kiểm.',
     'Dạy lại một điều cho bạn, và ghi lại câu hỏi bạn đặt ra.',
     'Người dạy lại tiến bộ nhanh hơn cả người được dạy.',
     'Coi kèm bạn là mất thời gian của em giỏi. Dạy lại là mức hiểu cao nhất, và em giỏi cần nó nhất.'],
    ['Có chỗ để học sinh tạo ra giá trị cho người ngoài.',
     'Mở kênh để học sinh đóng góp thật: dạy, dịch, viết, hướng dẫn.',
     'Tạo ra một thứ có người ngoài dùng được.',
     'Có người ngoài cảm ơn vì thứ học sinh làm ra.',
     'Chỉ nhận mà không cho đi. Người chỉ nhận không bao giờ thấy mình đủ.'],
  ],
  11: [
    ['Nhà nhìn con như một người đang trưởng thành, không chỉ một học sinh.',
     'Hỏi ý kiến con về việc của gia đình và thật sự cân nhắc ý đó.',
     'Đưa ra ý kiến có lý lẽ, không chỉ đòi hỏi.',
     'Con tham gia quyết định của gia đình bằng lý lẽ.',
     'Mọi quyết định đều do người lớn, con chỉ được báo. Con sẽ không tập được cách quyết.'],
    ['Trường đo cả thứ không có trong bài kiểm tra.',
     'Ghi nhận trách nhiệm, sự bền bỉ và cách làm việc nhóm bằng bằng chứng cụ thể.',
     'Giữ cam kết với nhóm kể cả khi không ai kiểm.',
     'Học sinh giữ lời với nhóm khi không có ai giám sát.',
     'Chỉ đo điểm số. Những thứ quyết định cuộc đời thì không nằm trong bài kiểm tra nào.'],
    ['Xã hội cho học sinh chỗ đứng thật, có trách nhiệm thật.',
     'Giao vai trò có trách nhiệm trong cộng đồng, không phải vai trò tượng trưng.',
     'Nhận vai trò và chịu trách nhiệm tới cùng.',
     'Học sinh giữ được vai trò qua ít nhất một lần khó khăn.',
     'Vai trò chỉ để chụp ảnh. Không có trách nhiệm thật thì không có trưởng thành thật.'],
  ],
  12: [
    ['Nhà chuẩn bị cho lúc con đi, không chỉ cho lúc con thi.',
     'Tập cho con tự quyết những việc lớn dần, và chịu hậu quả của quyết định đó.',
     'Tự quyết một việc lớn và chịu trách nhiệm về nó.',
     'Con ra quyết định mà không hỏi trước, rồi báo lại và giải thích được.',
     'Quyết hộ tới tận ngày con đi. Ngày đó con sẽ không biết quyết.'],
    ['Trường trả về một người biết tự học, không chỉ một điểm số.',
     'Dạy cách tự dựng kế hoạch học cho một thứ chưa ai dạy.',
     'Tự học xong một thứ ngoài chương trình, có bằng chứng.',
     'Học sinh tự học được một kỹ năng mới mà không cần lớp.',
     'Chỉ dạy nội dung, không dạy cách học. Hết chương trình là hết đường.'],
    ['Xã hội nhận về một người tạo được giá trị và tự dựng được hệ thống.',
     'Mở đường cho học sinh bước vào việc thật với người thật.',
     'Bước vào một việc thật ngoài phạm vi trường, và trụ được.',
     'Người trẻ tự dựng được hệ thống cho việc mình muốn giỏi.',
     'Chỉ giỏi trong khuôn khổ có sẵn. Ra khỏi khuôn khổ thì không biết bắt đầu từ đâu.'],
  ],
};

export const GITA_HOA: GitaHoa[] = GITA_JOURNEY.flatMap((b) =>
  SAN.map((s, i) => {
    const o = O[b.no][i];
    return {
      buocNo: b.no,
      buocTen: b.shortName,
      phase: b.phase,
      san: s.id,
      sanTen: s.ten,
      bieuHien: o[0],
      viecNguoiLon: o[1],
      viecHocSinh: o[2],
      dangChay: o[3],
      dangHong: o[4],
    };
  }),
);

/* ---------------------- NĂM TẦNG HẤP THU -------------------------------- */

export const TANG_HAP_THU: TangHapThu[] = [
  {
    no: 1, id: 'ht-1', ten: 'TẦNG NGHE THẤY',
    ai: 'Người mới biết tới học viện, chưa cam kết gì.',
    nhanGi: 'Bản đồ hệ thống, một trang tóm tắt hai tuyến, và bài test định vị miễn phí.',
    chieuSau: 'Chỉ bề mặt: biết hệ thống có gì, chưa vào bên trong mục nào.',
    doDuoc: 'Trả lời được hệ thống này giải quyết vấn đề gì cho ai.',
    chuaHop: 'Chưa hợp để giao lộ trình cá nhân hoá — chưa có dữ liệu về người học.',
  },
  {
    no: 2, id: 'ht-2', ten: 'TẦNG LÀM THỬ',
    ai: 'Người đã test đầu vào và đang làm những phiếu đầu tiên.',
    nhanGi: 'Kết quả test có phân bậc, lộ trình 90 ngày, phiếu luyện của tầng 1, bài giảng trụ tư duy.',
    chieuSau: 'Một tầng: đủ để chạy được nhịp ngày, chưa mở kho giải pháp.',
    doDuoc: 'Chuỗi 21 ngày không đứt và làm xong tám phiếu đầu tiên.',
    chuaHop: 'Chưa hợp để tự tra kho giải pháp — dễ tự kê ba bốn đơn rồi không làm đơn nào.',
  },
  {
    no: 3, id: 'ht-3', ten: 'TẦNG ĐI ĐƯỜNG DÀI',
    ai: 'Người đã qua 90 ngày và đang trong lộ trình chính.',
    nhanGi: 'Toàn bộ phiếu và bài giảng của tầng mình, kho 1.000 giải pháp, chấm bài định kỳ, câu lạc bộ.',
    chieuSau: 'Hai tầng: nội dung của tầng hiện tại cộng toàn bộ tầng dưới, có cố vấn theo nhịp.',
    doDuoc: 'Đạt KPI 90% ở ít nhất một cấp độ và qua được một bài thi cấp độ.',
    chuaHop: 'Chưa hợp để soạn phiếu riêng hay đổi tuyến một mình.',
  },
  {
    no: 4, id: 'ht-4', ten: 'TẦNG TỰ DẪN',
    ai: 'Người đã qua nửa lộ trình và tự vận hành được nhịp của mình.',
    nhanGi: 'Xem trước nội dung tầng trên, tự đổi tuyến, tự tra kho, kèm cặp 1–1 theo nhịp giãn.',
    chieuSau: 'Ba tầng: thấy được cả đường phía trước, không chỉ chỗ đang đứng.',
    doDuoc: 'Tự lập kế hoạch quý và số liệu cho thấy kế hoạch đó chạy được.',
    chuaHop: 'Chưa hợp để dạy người khác lấy phí — dạy được cho bạn không đồng nghĩa với hành nghề.',
  },
  {
    no: 5, id: 'ht-5', ten: 'TẦNG CHO ĐI',
    ai: 'Người đã về đích hoặc gần đích, và bắt đầu tạo giá trị cho người khác.',
    nhanGi: 'Soạn phiếu riêng, dẫn nhóm, kèm người mới, và đường vào thang nghề nếu muốn.',
    chieuSau: 'Bốn tầng: hiểu được cả cách hệ thống được thiết kế, không chỉ cách dùng nó.',
    doDuoc: 'Có người thứ hai tiến bộ được nhờ việc mình làm, đo bằng số liệu của họ.',
    chuaHop: 'Chưa hợp để tự nhận là coach nếu chưa qua kiểm định của thang nghề.',
  },
];

/* ------------------- CẤP CHUYÊN MÔN CỦA NGƯỜI PHỤC VỤ ------------------- */

export const CAP_CHUYEN_MON: CapChuyenMon[] = [
  {
    no: 1, id: 'cm-tv1', vaiTro: 'tư vấn', ten: 'TƯ VẤN NHẬP MÔN',
    giaoDuocToiTang: 2,
    lamDuoc: ['Giải thích được bản đồ hệ thống và hai tuyến', 'Chạy bài test định vị và đọc kết quả theo bảng', 'Chốt gói học phù hợp với bậc đã xếp'],
    chuaLamDuoc: 'Chưa giải thích được vì sao một học viên nên đổi tuyến, và chưa được tự ý hứa kết quả.',
    nangCapBang: 'Tư vấn đúng ba mươi ca có ghi lại, và không ca nào bị xếp sai bậc.',
  },
  {
    no: 2, id: 'cm-tv2', vaiTro: 'tư vấn', ten: 'TƯ VẤN LỘ TRÌNH',
    giaoDuocToiTang: 3,
    lamDuoc: ['Dựng được lộ trình 90 ngày từ kết quả test', 'Giải thích được cái giá của việc đổi tuyến', 'Nói thẳng được khi một mục tiêu không khả thi trong thời gian còn lại'],
    chuaLamDuoc: 'Chưa chấm bài lấy điểm, chưa quyết định nâng cấp độ.',
    nangCapBang: 'Ba mươi ca có theo dõi tới tháng thứ sáu, và tỉ lệ bỏ cuộc dưới ngưỡng của học viện.',
  },
  {
    no: 3, id: 'cm-gv1', vaiTro: 'giáo viên', ten: 'GIÁO VIÊN ĐỨNG LỚP',
    giaoDuocToiTang: 3,
    lamDuoc: ['Dạy được bài giảng chuyên sâu của tầng 1 tới 3', 'Chấm phiếu và chữa bài theo bảng mã lỗi', 'Nhận ra học viên đang ở cao nguyên năng lực và xử lý đúng'],
    chuaLamDuoc: 'Chưa soạn phiếu ngoài bộ chuẩn, chưa chấm bài thi cấp độ.',
    nangCapBang: 'Hai trăm giờ đứng lớp có giám sát, và chấm chéo khớp với người kiểm định.',
  },
  {
    no: 4, id: 'cm-gv2', vaiTro: 'giáo viên', ten: 'GIÁO VIÊN CHUYÊN SÂU',
    giaoDuocToiTang: 5,
    lamDuoc: ['Dạy được cả năm tầng, gồm bài trọng yếu cho hai trường khó nhất', 'Soạn phiếu riêng cho ca đặc biệt', 'Chấm bài thi cấp độ và đề xuất nâng cấp'],
    chuaLamDuoc: 'Chưa duyệt nội dung của người khác, chưa kiểm định người dạy.',
    nangCapBang: 'Có học viên đỗ chuyên hoặc đạt band mục tiêu, và hồ sơ ca được chủ nhiệm chuyên môn soi.',
  },
  {
    no: 5, id: 'cm-co1', vaiTro: 'coach', ten: 'COACH ĐỒNG HÀNH',
    giaoDuocToiTang: 4,
    lamDuoc: ['Chạy được mười hai bước GITA với một ca', 'Làm việc với gia đình, không chỉ với học viên', 'Nhận ra khi vấn đề không nằm ở kỹ thuật học và chuyển đúng chỗ'],
    chuaLamDuoc: 'Chưa kèm được coach khác, chưa xử lý ca có yếu tố tâm lý nặng một mình.',
    nangCapBang: 'Mười ca đi hết ít nhất một năm, có ghi chép đủ mười hai bước.',
  },
  {
    no: 6, id: 'cm-co2', vaiTro: 'coach', ten: 'COACH DẪN DẮT',
    giaoDuocToiTang: 5,
    lamDuoc: ['Kèm được coach mới', 'GITA hoá được cả ba sân: gia đình, trường học, cộng đồng', 'Thiết kế lại lộ trình cho ca đặc biệt mà vẫn giữ chuẩn'],
    chuaLamDuoc: 'Chưa giữ chuẩn cho cả học viện — đó là việc của chủ nhiệm chuyên môn.',
    nangCapBang: 'Kèm được ba coach qua kiểm định, và không ca nào của họ bị xếp sai bậc.',
  },
];

/* --------------------------- SỐ ĐỐI CHIẾU ------------------------------- */

export const GITA_HOA_SO = {
  soSan: SAN.length,
  soBuoc: GITA_JOURNEY.length,
  soO: GITA_HOA.length,
  soTangHapThu: TANG_HAP_THU.length,
  soCapChuyenMon: CAP_CHUYEN_MON.length,
};

/** Cấp chuyên môn nào giao được tới tầng hấp thu nào. */
export const giaoDuoc = (capId: string, tangNo: number): boolean => {
  const c = CAP_CHUYEN_MON.find((x) => x.id === capId);
  return !!c && tangNo <= c.giaoDuocToiTang;
};
