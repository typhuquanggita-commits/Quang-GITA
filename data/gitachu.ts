/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {ChuGita, CapHanhDong} from '../types';

/* ==========================================================================
   BỐN CHỮ CỦA MÔ THỨC GITA

   Tệp này chép lại định nghĩa gốc của học viện về bốn chữ G · I · T · A, và
   nối từng chữ vào đúng những chỗ trong hệ thống nơi chữ ấy được thực hiện.

   PHÂN BIỆT HAI TRỤC, VÌ RẤT DỄ LẪN
     · Bốn CHỮ — Goal, Inspirits, Talent, Action/Academy — là bốn thành phần
       của mô thức, chạy SONG SONG suốt hành trình. Không có chữ nào xong
       trước chữ nào.
     · Bốn PHA — HIỂU MÌNH, RÈN MÌNH, BỨT PHÁ, TRƯỞNG THÀNH — là bốn chặng
       của mười hai bước, đi TUẦN TỰ theo thời gian.
     Hai trục khác nhau và cắt nhau. Ở pha nào cũng có đủ bốn chữ, chỉ khác
     trọng số. Nhầm hai trục này là nhầm cả cách vận hành.

   THÀNH TỐ GIỮ NGUYÊN THEO TÀI LIỆU GỐC
   Danh sách thành tố của mỗi chữ được giữ đúng như học viện đã định nghĩa,
   không rút gọn và không diễn giải lại. Phần thêm vào là bốn thứ kiểm được:
   khi có thì trông thế nào, khi thiếu thì trông thế nào, đo bằng gì, và nối
   vào chỗ nào trong hệ thống.
   ========================================================================== */

export const CHU_GITA_CREED = {
  name: 'BỐN CHỮ G · I · T · A',
  claim:
    'Goal, Inspirits, Talent, Action — bốn thành phần chạy song song suốt hành trình, không phải bốn giai đoạn nối tiếp nhau.',
  phanBiet:
    'Bốn CHỮ chạy song song; bốn PHA của mười hai bước đi tuần tự. Ở pha nào cũng có đủ bốn chữ, chỉ khác trọng số. Nhầm hai trục này là nhầm cả cách vận hành.',
  thieuMotChu:
    'Thiếu một chữ là hỏng theo đúng một kiểu riêng, và kiểu hỏng ấy đoán trước được. Có mục tiêu mà thiếu nội lực thì bỏ ở tháng thứ tư; có nội lực mà thiếu tài năng đúng chỗ thì cố sai hướng; có cả ba mà thiếu hành động thì chỉ là một bản kế hoạch đẹp.',
  danhThuc:
    'Đích cuối của bốn chữ không phải điểm số mà là một con người tự dựng được hệ thống cho bất kỳ việc gì mình muốn giỏi. Tiếng Anh là thứ đầu tiên họ dùng nó để chứng minh.',
};

export const CHU_GITA: ChuGita[] = [
  {
    chu: 'G',
    tenAnh: 'Goal',
    tenViet: 'HỆ THỐNG MỤC TIÊU',
    thanhTo: [
      'Hệ thống mục tiêu',
      'Kết quả xuất sắc',
      'Đích đến của quá trình học tập rèn luyện',
    ],
    laGi:
      'Không phải một mong muốn mà là một HỆ THỐNG: đích cuối, các mốc trung gian, và bằng chứng cho từng mốc. Mục tiêu không có bằng chứng thì không phải mục tiêu, đó là hy vọng.',
    viSaoCan:
      'Không có đích thì mọi con đường đều trông như nhau, và người học sẽ chọn con đường dễ chịu nhất chứ không phải con đường tới nơi.',
    khiCo:
      'Học viên nói được đích của mình bằng một câu có số và có mốc thời gian, và chỉ ra được việc hôm nay phục vụ đích đó thế nào.',
    khiThieu:
      'Học viên chăm chỉ nhưng không nói được mình đang tiến tới đâu. Họ làm việc được giao, và khi hết việc được giao thì dừng.',
    doBang:
      'Khoảng cách còn lại tới đích, đo bằng bài thi thử đúng điều kiện — không đo bằng cảm giác học chăm.',
    noiVaoHeThong: [
      'Hai tuyến với hai đích khác nhau và hai cách đo khác nhau',
      'Mười hai cột mốc, mỗi cột mốc có cổng thoát bằng số',
      'Hàm tính ngược: cần đúng bao nhiêu câu mỗi phần để đạt điểm mục tiêu',
      'Hai mươi lăm cấp độ với tiêu chí vượt cấp rõ ràng',
    ],
  },
  {
    chu: 'I',
    tenAnh: 'Inspirits',
    tenViet: 'NỘI LỰC VÀ KHÁT KHAO',
    thanhTo: [
      'Động lực',
      'Khát khao',
      'Đam mê',
      'Mong muốn',
      'Nội lực',
      'Sự khác biệt',
      'Niềm tin',
      'Bản lĩnh để thực hiện theo đuổi cho mục tiêu',
    ],
    laGi:
      'Thứ giữ người ta lại vào đúng lúc khó nhất, khi cảm hứng đã đi mất. Nó không phải trạng thái hào hứng mà là nội lực được dựng lên bằng ghi nhận, bằng ý nghĩa, và bằng bằng chứng về chính mình.',
    viSaoCan:
      'Cảm hứng luôn rời đi đúng vào đoạn cao nguyên năng lực ở tháng thứ mười bốn. Ai chỉ có cảm hứng thì bỏ ở đó, và đó là lý do bỏ cuộc số một.',
    khiCo:
      'Học viên vẫn ngồi vào bàn ở ngày tệ nhất, dù chỉ làm được mức sàn. Họ nói được mình học vì cái gì, và lý do ấy là của họ chứ không phải của bố mẹ.',
    khiThieu:
      'Chuỗi ngày đứt ngay tuần đầu tiên có việc bận. Học viên cần được nhắc mới học, và khi hết người nhắc thì hết học.',
    doBang:
      'Chuỗi ngày không đứt, và số lần quay lại trong hai mươi bốn giờ sau một ngày lỡ.',
    noiVaoHeThong: [
      'Lộ trình thành công: Ghi nhận đến trước Cảm hứng, không đảo được',
      'Mười mô-đun tư duy và mười hai thói quen có nghi thức đi kèm',
      'Định danh đi trước hành vi, và mức sàn cho ngày tệ nhất',
      'Câu lạc bộ và cam kết có người cụ thể kiểm',
    ],
  },
  {
    chu: 'T',
    tenAnh: 'Talent',
    tenViet: 'TÀI NĂNG VÀ THẾ MẠNH',
    thanhTo: [
      'Tài năng',
      'Điểm mạnh',
      'Sở trường',
      'Tư duy xuất sắc',
      'Sự khác biệt',
      'Tốc độ',
      'Tập trung',
      'Khả năng vượt trội',
      'Định hướng xuất sắc',
    ],
    laGi:
      'Không phải thứ trời cho mà là thứ tìm ra rồi mài. Việc của học viện là ĐỊNH VỊ đúng thế mạnh của từng em rồi dồn vào đó, thay vì bắt mọi em mạnh đều ở mọi thứ.',
    viSaoCan:
      'Dàn đều công sức lên mọi mặt là cách chắc chắn để không mặt nào đủ ngưỡng. Người vượt trội là người biết mình mạnh ở đâu và dám dồn vào đó.',
    khiCo:
      'Học viên nói được mình mạnh ở kỹ năng nào và đang dùng thế mạnh ấy để kéo những kỹ năng còn lại lên.',
    khiThieu:
      'Học viên học đều mọi thứ, tiến chậm đều, và dần tin rằng mình không có gì đặc biệt.',
    doBang:
      'Chênh lệch giữa kỹ năng mạnh nhất và yếu nhất, cùng tốc độ tiến của kỹ năng mạnh — thế mạnh thật thì tiến nhanh hơn hẳn phần còn lại.',
    noiVaoHeThong: [
      'Bài test định vị đầu vào chia bậc, không xếp hạng',
      'Tám trục kỹ năng đo riêng, thấy được đường mạnh yếu của từng em',
      'Sáu nguyên mẫu người học với siêu năng lực và điểm mù riêng',
      'Kho một nghìn đơn kê theo đúng triệu chứng và đúng cấp độ',
    ],
  },
  {
    chu: 'A',
    tenAnh: 'Action / Academy',
    tenViet: 'HÀNH ĐỘNG VÀ MÔI TRƯỜNG',
    thanhTo: [
      'Hành động quyết đoán',
      'Kiên trì',
      'Sáng tạo',
      'Chăm chỉ',
      'Cẩn thận',
      'Tối ưu',
      'Lộ trình rèn luyện theo thói quen thành công',
      'Các cấp độ hành động theo quy tắc 20/80',
      'Môi trường thi đua rèn luyện',
      'Thiết kế khác biệt, nhóm bạn xuất sắc theo team work',
      'Học tập gắn phát triển bản thân',
    ],
    laGi:
      'Chữ duy nhất tạo ra kết quả. Ba chữ trước đều nằm trong đầu; chữ này nằm trên bàn học và trong lịch tuần. Nó gồm cả hành động của cá nhân lẫn MÔI TRƯỜNG mà học viện dựng lên để hành động ấy dễ xảy ra hơn.',
    viSaoCan:
      'Có mục tiêu, có nội lực, có thế mạnh mà không hành động thì chỉ là một bản kế hoạch đẹp. Và hành động một mình thì cạn; hành động trong môi trường có người cùng làm thì bền.',
    khiCo:
      'Có sản phẩm cụ thể mỗi tuần: phiếu đã làm, bài đã nộp, bản ghi âm đã gửi. Và có ít nhất một người khác biết mình đang làm gì.',
    khiThieu:
      'Học viên hiểu rất rõ phải làm gì và không làm. Đây là kiểu hỏng khó nhìn ra nhất, vì khi hỏi thì em trả lời đúng hết.',
    doBang:
      'Số phiếu hoàn thành mỗi tuần, tỉ lệ nhiệm vụ chia sẻ nộp đúng hạn, và số buổi có mặt ở câu lạc bộ.',
    noiVaoHeThong: [
      'Hai nghìn phiếu luyện và hai nghìn nhiệm vụ chia sẻ, có hạn hai mươi bốn giờ',
      'Bốn cấp hành động theo quy tắc 20/80',
      'Bảy câu lạc bộ và mười hai thói quen với nghi thức cài đặt',
      'Ba sân GITA hoá: gia đình, trường học, xã hội',
    ],
  },
];

/* ------------------ BỐN CẤP HÀNH ĐỘNG THEO 20/80 ------------------------ */

export const QUY_TAC_2080 = {
  ten: 'QUY TẮC 20/80 TRONG HÀNH ĐỘNG',
  noiDung:
    'Một phần nhỏ việc làm ra phần lớn kết quả. Việc của bốn cấp dưới đây là chỉ ra ĐÚNG phần nhỏ ấy ở từng giai đoạn, để học viên dồn vào đó thay vì dàn đều.',
  canhBao:
    'Con số hai mươi và tám mươi là cách nói, không phải kết quả đo. Tỉ lệ thật khác nhau theo từng kỹ năng và từng người. Cái đúng là NGUYÊN TẮC — có việc đáng làm hơn hẳn việc khác — chứ không phải con số.',
  lamSaoBiet:
    'Không đoán. Nhìn số liệu của chính mình: phần nào đang kéo điểm xuống nhiều nhất, và phác đồ nào có thời gian tới khi có hiệu lực ngắn nhất. Hai câu hỏi đó chỉ ra phần hai mươi.',
};

export const CAP_HANH_DONG: CapHanhDong[] = [
  {
    no: 1,
    ten: 'LÀM ĐỦ',
    moTa: 'Làm hết những gì được giao, đúng hạn, không thiếu buổi nào.',
    phanTramCongSuc: 100,
    phanTramKetQua: 40,
    viDu: 'Làm đủ năm phiếu trong tuần và nộp đúng hạn cả năm nhiệm vụ chia sẻ.',
    dauHieuSai: 'Làm đủ nhưng không nhớ tuần trước làm gì. Đủ mà không đọng lại thì chỉ là chạy cho hết.',
  },
  {
    no: 2,
    ten: 'LÀM ĐÚNG CHỖ',
    moTa: 'Dồn công sức vào đúng phần đang kéo điểm xuống, xác định bằng số liệu chứ không bằng cảm giác.',
    phanTramCongSuc: 60,
    phanTramKetQua: 70,
    viDu: 'Thấy phần CHUỖI luôn thấp nhất qua ba phiếu, dành hai tuần chỉ luyện phần đó.',
    dauHieuSai: 'Chọn phần để dồn theo phần mình thích làm. Phần mình thích thường là phần mình đã khá.',
  },
  {
    no: 3,
    ten: 'LÀM SỚM',
    moTa: 'Làm việc khó nhất khi sự tập trung còn đầy, và làm việc có hiệu lực chậm ngay từ đầu chứ không để tới cuối.',
    phanTramCongSuc: 60,
    phanTramKetQua: 85,
    viDu: 'Chuyển sổ từ sang ghi theo cụm ngay tháng đầu, vì phác đồ này cần tám tuần mới có hiệu lực.',
    dauHieuSai: 'Để việc khó xuống cuối buổi, cuối tuần, cuối lộ trình. Việc bị đẩy một lần sẽ bị đẩy tiếp.',
  },
  {
    no: 4,
    ten: 'LÀM CÙNG NGƯỜI KHÁC',
    moTa: 'Đưa việc ra môi trường có người cùng làm và có người kiểm — thi đua, nhóm bạn, dạy lại.',
    phanTramCongSuc: 70,
    phanTramKetQua: 100,
    viDu: 'Dạy lại cho một bạn điều vừa học, và nhận lại đúng câu hỏi chỉ ra chỗ mình còn hổng.',
    dauHieuSai: 'Vào nhóm nhưng chỉ ngồi nghe. Tham gia mà không đóng góp là tiêu thụ, không phải hành động.',
  },
];

/* --------------------- MÔI TRƯỜNG THI ĐUA VÀ NHÓM ----------------------- */

export const MOI_TRUONG = [
  {
    no: 1,
    ten: 'THI ĐUA SO VỚI CHÍNH MÌNH TRƯỚC',
    lam: 'Mọi bảng thi đua đều hiện mức tăng của từng người trước, thứ hạng sau.',
    viSao:
      'Bảng chỉ hiện thứ hạng thì phần lớn lớp không có lý do gì để cố, vì họ biết mình không lên được top. Bảng hiện mức tăng thì ai cũng có một cuộc đua của riêng mình.',
    hong: 'Chỉ vinh danh top đầu. Đó là cách chắc chắn để mất phần lớn lớp học.',
  },
  {
    no: 2,
    ten: 'NHÓM BỐN NGƯỜI, KHÔNG NHÓM MƯỜI',
    lam: 'Nhóm rèn luyện đúng bốn người, có tên từng người và có việc chung mỗi tuần.',
    viSao:
      'Nhóm mười người thì ai cũng nghĩ người khác sẽ làm. Nhóm bốn người thì vắng một người là thấy ngay.',
    hong: 'Ghép nhóm trên giấy mà không có việc chung. Ghép mà không có việc thì không thành nhóm.',
  },
  {
    no: 3,
    ten: 'GHÉP LỆCH MỘT BẬC, KHÔNG GHÉP NGANG',
    lam: 'Ghép người ở cấp trên với người ở cấp ngay dưới, không ghép hai người cùng cấp và không ghép lệch ba bậc.',
    viSao:
      'Lệch một bậc thì người trên dạy lại được và củng cố chính mình, người dưới với tới được. Lệch ba bậc thì người trên chán và người dưới nản.',
    hong: 'Ghép em giỏi nhất kèm em yếu nhất cho công bằng. Cả hai đều mất thời gian.',
  },
  {
    no: 4,
    ten: 'SAI CÔNG KHAI ĐƯỢC PHÉP',
    lam: 'Đặt luật phản hồi rõ ràng trong nhóm, và người dẫn nhóm là người sai công khai đầu tiên.',
    viSao:
      'Nhóm cười một người sai thì sau đó không ai dám sai công khai nữa, và không ai học được gì. Người dẫn phải sai trước để mở đường.',
    hong: 'Chỉ khen, không góp ý. Nhóm dễ chịu mà không ai tiến lên.',
  },
  {
    no: 5,
    ten: 'MỖI TUẦN MỘT SẢN PHẨM RA NGOÀI',
    lam: 'Mỗi thành viên đưa ra ngoài nhóm một thứ có người khác dùng được: bản ghi âm, đoạn viết, bảng tổng hợp.',
    viSao:
      'Sản phẩm ra ngoài nhóm nhận phản hồi thật, không nương tay. Đó là thứ nhóm nội bộ không tạo ra được.',
    hong: 'Mọi sản phẩm chỉ lưu hành trong nhóm. Nhóm thành một cái kén ấm áp.',
  },
];

export const CHU_GITA_SO = {
  soChu: CHU_GITA.length,
  soThanhTo: CHU_GITA.reduce((s, c) => s + c.thanhTo.length, 0),
  soCapHanhDong: CAP_HANH_DONG.length,
  soLuatMoiTruong: MOI_TRUONG.length,
};
