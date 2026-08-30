/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · CỔNG ĐĂNG NHẬP VÀ KHO TỔNG TRA SOÁT

   MỘT ĐIỀU PHẢI NÓI THẲNG NGAY DÒNG ĐẦU, vì nói muộn thì thành
   lừa dối: cổng đăng nhập trong một trang tĩnh KHÔNG PHẢI một
   hàng rào an ninh. Mã chạy trên máy người dùng; ai mở công cụ
   phát triển của trình duyệt cũng đổi được vai của mình, và toàn
   bộ nội dung nằm sẵn trong tệp dù có đăng nhập hay không.

   Vậy cổng này để làm gì? Ba việc thật:
   · Nhận diện — biết ai đang đọc, để ghi nhật ký và để màn hình
     nói đúng ngôn ngữ của vai ấy.
   · Đặt mặc định đúng — mở ra là thấy phần của mình, không phải
     lạc giữa hai trăm màn.
   · Nhắc trách nhiệm — người bấm "tôi là Coach" đã tự nhận một
     ràng buộc, và điều đó có giá trị dù không cưỡng chế được.

   HÀNG RÀO THẬT nằm ở chỗ khác, và hệ này đã có sẵn: BẢN CẮT.
   Mỗi vai nhận một tệp riêng, và nội dung ngoài quyền KHÔNG CÓ
   TRONG TỆP — không phải bị ẩn, mà là không tồn tại. Bộ kiểm dựng
   thử năm bản cắt ở mỗi lần phát hành và soi rò rỉ. Đó là ranh
   giới cưỡng chế được; cổng đăng nhập thì không.

   Muốn có đăng nhập thật thì phải có máy chủ. Hợp đồng máy chủ tối
   thiểu ghi ở G.DN_MAY_CHU.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
(function (G) {

  /* ── 1 · Ba lớp kiểm soát, và lớp nào cưỡng chế được ─────── */
  G.DN_BA_LOP = [
    { t: 'Lớp 1 · Cổng đăng nhập', n: 'Chạy trên máy người dùng. Nhận diện người đọc, đặt vai mặc định, nhắc trách nhiệm.',
      vi: 'KHÔNG cưỡng chế được. Ai mở công cụ phát triển cũng vượt qua. Đừng bao giờ coi đây là hàng rào.' },
    { t: 'Lớp 2 · Cổng dựng màn', n: 'Trước mỗi lần dựng, hệ hỏi lại bảng quyền. Vai không đủ thì ra thẻ khoá, không ra nội dung.',
      vi: 'Cũng chạy trên máy người dùng nên cũng không cưỡng chế được — nhưng nó chặn được việc vô tình lọt, và bộ kiểm thử tám trăm chín mươi chín lượt vào thẳng ở mỗi lần phát hành.' },
    { t: 'Lớp 3 · Bản cắt', n: 'Mỗi vai nhận một tệp riêng. Nội dung ngoài quyền KHÔNG CÓ TRONG TỆP.',
      vi: 'ĐÂY là hàng rào thật. Không ẩn — không tồn tại. Mở công cụ phát triển cũng không tìm thấy thứ không được đóng gói vào.' },
    { t: 'Lớp 4 · Máy chủ có xác thực', n: 'Chưa có. Cần khi hệ mang dữ liệu thật của người học.',
      vi: 'Chừng nào còn là trang tĩnh thì lớp 3 là hàng rào cao nhất. Hợp đồng máy chủ tối thiểu ghi ở phần cuối kho này.' }
  ];

  /* ── 2 · Tài khoản mẫu để thử vai ─────────────────────────
        KHÔNG phải tài khoản thật. Không có mật khẩu, vì mật khẩu
        trong trang tĩnh chỉ tạo ảo giác an toàn: nó nằm ngay
        trong tệp mà ai cũng đọc được.                          */
  G.DN_TAI_KHOAN = [
    ['R01', 'Super Admin', 'Toàn hệ, gồm kho tổng tra soát', 'Người giữ chuẩn của Học viện'],
    ['R02', 'Admin hệ thống', 'Toàn hệ trừ phần tài chính', 'Người vận hành hệ thống hằng ngày'],
    ['R03', 'Giám đốc điều hành', 'Điều hành, tài chính, rủi ro, triển khai', 'Người quyết định nguồn lực'],
    ['R06', 'Trưởng nhóm Coach', 'Chuẩn nghề, dự giờ, lộ trình Coach', 'Người giữ chất lượng nghề'],
    ['R08', 'Coach', 'Kho nghề, nghiệm thu, hồ sơ học viên', 'Người trực tiếp huấn luyện'],
    ['R09', 'Giáo viên', 'Giáo án, chuyên đề, khung buổi', 'Người đứng lớp'],
    ['R14', 'Đội trưởng CLB', 'Điều hành chi hội, lịch năm, ghế và nhiệm kỳ', 'Học sinh giữ ghế'],
    ['R15', 'Phụ huynh', 'Hành trình của con, sổ tay vai, biểu mẫu gia đình', 'Người đồng hành ở nhà'],
    ['R16', 'Học viên', 'Hành trình của em, theo bậc B1 tới B6', 'Người học'],
    ['R17', 'Đại sứ', 'Phần chung và phần lan toả', 'Người đã ra khỏi hệ nhưng còn gắn bó']
  ];

  /* ── 3 · Luật cổng ────────────────────────────────────────── */
  G.DN_LUAT = [
    'Không bao giờ gọi cổng này là *bảo mật*. Gọi đúng tên: cổng nhận diện. Gọi sai tên là bước đầu tiên để ai đó tin nhầm rồi đưa dữ liệu thật vào.',
    'Không đặt mật khẩu trong trang tĩnh. Mật khẩu nằm ngay trong tệp mà ai cũng đọc được; nó chỉ tạo ảo giác an toàn và làm người dùng chủ quan hơn.',
    'Dữ liệu thật của người học KHÔNG được đưa vào bản dựng tĩnh, ở bất kỳ vai nào. Trang này chứa chuẩn và phương pháp, không chứa hồ sơ trẻ em.',
    'Người phát hành phải phát ĐÚNG bản cắt cho đúng vai. Phát bản đầy đủ cho một học viên là vô hiệu hoá cả ba lớp cùng lúc.',
    'Đổi vai trong phiên chỉ mở cho Super Admin và Admin hệ thống, và chỉ để thử nghiệm — vì họ vốn đã thấy mọi thứ, nên không có gì để lộ thêm.',
    'Khi lên máy chủ thật, cổng này phải bị thay hẳn chứ không phải bọc thêm. Giữ lại một cổng giả bên cạnh một cổng thật là cách chắc chắn để về sau có người đi nhầm cửa.'
  ];

  /* ── 4 · Hợp đồng máy chủ tối thiểu ───────────────────────
        Khi Học viện dựng bản có máy chủ, đây là mức thấp nhất
        chấp nhận được. Ghi ra để lần sau không phải nghĩ lại.   */
  G.DN_MAY_CHU = [
    ['Xác thực', 'Đăng nhập trên máy chủ, phiên có hạn, thoát được từ mọi thiết bị', 'Không dùng mã cứng trong mã nguồn'],
    ['Phân quyền', 'Máy chủ quyết định trả về gì, dựa trên vai của phiên — không tin bất cứ giá trị nào do trình duyệt gửi lên', 'Bảng quyền hiện có dùng lại nguyên vẹn'],
    ['Đầu đề HTTP', 'frame-ancestors, HSTS, X-Content-Type-Options, Referrer-Policy do máy chủ gửi', 'Thẻ meta không thay được đầu đề HTTP'],
    ['Nhật ký', 'Ghi ai xem gì, lúc nào; giữ theo thời hạn đã công bố; không ghi nội dung nhạy cảm vào nhật ký', 'Bắt buộc khi có dữ liệu người học'],
    ['Dữ liệu trẻ em', 'Mã hoá khi lưu và khi truyền; hạn chế theo nguyên tắc tối thiểu cần thiết; có quy trình xoá theo yêu cầu gia đình', 'Ràng buộc pháp lý riêng, nặng hơn dữ liệu thường'],
    ['Sao lưu và phục hồi', 'Sao lưu tự động, thử phục hồi định kỳ có biên bản', 'Sao lưu chưa thử phục hồi thì chưa tính là có sao lưu'],
    ['Tách môi trường', 'Môi trường thử và môi trường thật tách hẳn; không bao giờ dùng dữ liệu thật để thử', 'Kể cả khi thuận tiện hơn nhiều']
  ];

  /* ── 5 · Kho tổng tra soát — chỉ Super Admin và Admin ─────
        Đây là bảng chỉ số sức khoẻ của chính hệ thống: nội dung
        đã đủ chưa, nguồn đã đọc hết chưa, món nào còn treo, và
        lần dựng gần nhất có sạch không.                        */
  G.TS_MUC = [
    { t: 'Sổ yêu cầu', n: 'Mỗi yêu cầu của Học viện là một dòng, viện dẫn màn và kho cụ thể.',
      vi: 'Bộ kiểm soi từng viện dẫn ở mỗi lần dựng. Trỏ vào chỗ không tồn tại thì chặn phát hành.' },
    { t: 'Món nợ số', n: 'Mọi con số hứa trong văn xuôi phải khớp số phần tử thật của kho.',
      vi: 'Sinh ra sau khi phát hiện hệ khai 52 tuần, 100 chương trình, 600 chuyên đề mà chưa nơi nào viết ra.' },
    { t: 'Sổ nguồn', n: 'Từng tệp trong kho tài liệu gốc, kèm trạng thái đã rút hay còn nợ.',
      vi: 'Mỗi món nợ phải kèm cách gỡ cụ thể; bộ kiểm chặn dòng nêu vấn đề mà không nêu cách gỡ.' },
    { t: 'Sổ xuất xứ', n: 'Mỗi tệp kho khai rõ nó từ đâu ra: rút, dựng, biên soạn mới, hay tham chiếu.',
      vi: 'Ranh giới có ý nghĩa pháp lý khi nộp hồ sơ quyền tác giả. Bộ kiểm đối chiếu với tệp thật trên đĩa.' },
    { t: 'Chờ Hội đồng duyệt', n: 'Các kho biên soạn mới chưa có văn bản duyệt của Hội đồng Chuyên môn.',
      vi: 'Không được đưa vào dạy hay nộp hồ sơ khi còn ở trạng thái này.' },
    { t: 'Mã bản và ngày dựng', n: 'Mã băm của toàn bộ nội dung tại thời điểm dựng.',
      vi: 'Vừa là số hiệu bản, vừa là bằng chứng thời điểm cho hồ sơ quyền tác giả.' }
  ];

  G.TS_LUAT = [
    'Kho tổng tra soát chỉ mở cho Super Admin và Admin hệ thống. Không phải vì nội dung nhạy cảm, mà vì nó là bảng chỉ số dành cho người chịu trách nhiệm về chuẩn — người khác đọc sẽ hiểu nhầm một món nợ đã ghi công khai thành một lỗi bị giấu.',
    'Mọi con số trong kho này do MÁY đếm tại lúc dựng, không do người điền. Một bảng tra soát mà người tự điền thì không tra soát được gì.',
    'Món nợ không được đóng bằng cách xoá dòng. Chỉ đóng được bằng cách làm xong việc rồi đổi trạng thái.',
    'Bản dựng không sạch thì không phát hành, kể cả khi đã hứa ngày giao. Ngày giao lùi được; một bản sai đã phát ra thì không thu về được.',
    'Mỗi lần đổi chuẩn phải ghi vào Sổ Chuẩn kèm lý do, không xoá dòng cũ. Lịch sử đổi chuẩn là thứ bảo vệ hệ khỏi việc quay vòng.',
    'Người đọc kho này có nghĩa vụ báo lại khi thấy một con số vô lý. Bảng tra soát chỉ có giá trị khi có người thật sự đọc nó.'
  ];

})(window.GV = window.GV || {});
