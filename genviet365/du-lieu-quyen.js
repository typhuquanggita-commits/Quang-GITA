/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · BẢNG VAI VÀ QUYỀN
   Kế thừa nguyên tắc phân quyền của GITA 365 v8: BẬC (lv) càng nhỏ
   càng nhiều quyền; mỗi quyền ghi BẬC TỐI ĐA được dùng nó; bảng ghi
   đè xử những chỗ bậc không nói được.

   Ở Gen Việt có thêm một trục thứ hai mà GITA 365 không có:
   BẬC NĂNG LỰC CỦA HỌC VIÊN. Học viên lên bậc thì mở thêm tầng nội
   dung, và tới bậc 5 — khi em trở thành Mentor — kho nghề mở ra.
   Đây là chỗ kiến trúc sáu bậc gặp bảng phân quyền.

   ⚠ TỆP NÀY LÀ DỮ LIỆU, KHÔNG PHẢI HÀNG RÀO.
   Ẩn hiện ở trình duyệt chỉ để giao diện gọn và đúng vai. Hàng rào
   thật nằm ở hai chỗ: máy chủ kiểm lại trước mọi lần đọc-ghi, và
   bản phát hành cho vai thấp KHÔNG ĐƯỢC ĐÓNG GÓI phần nội dung mà
   vai ấy không có quyền (xem dong-goi-artifact.cjs --vai=).
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var GV = window.GV || {};
window.GV = GV;

/* ══════════ VAI — lv càng nhỏ càng nhiều quyền ══════════ */
GV.VAI = [
  { ma: 'R01', lv: 1,  t: 'Super Admin',            cong: 'quantri', mau: '#185AB4',
    ln: 'Người giữ chìa khoá gốc của hệ sinh thái.' },
  { ma: 'R02', lv: 2,  t: 'Admin hệ thống',         cong: 'quantri', mau: '#185AB4',
    ln: 'Kiến trúc sư vận hành — dựng chuẩn, mở đường, giữ nhật ký.' },
  { ma: 'R03', lv: 3,  t: 'Giám đốc điều hành',     cong: 'quantri', mau: '#BE0E16',
    ln: 'Người cầm tầm nhìn, chịu trách nhiệm tăng trưởng và cầm tài chính.' },
  { ma: 'R04', lv: 4,  t: 'Quản lý chuyên môn',     cong: 'nghe',    mau: '#BE0E16',
    ln: 'Người giữ chuẩn nghề của toàn bộ đội ngũ dẫn dắt.' },
  { ma: 'R05', lv: 5,  t: 'Admin sản phẩm',         cong: 'quantri', mau: '#5140B4',
    ln: 'Người giữ kho nội dung và phát hành bản — không chạm hồ sơ của một nhà nào.' },
  { ma: 'R06', lv: 6,  t: 'Trưởng nhóm Coach',      cong: 'nghe',    mau: '#5140B4',
    ln: 'Người tạo ra Coach giỏi, không chỉ làm Coach giỏi.' },
  { ma: 'R07', lv: 7,  t: 'Senior Coach',           cong: 'nghe',    mau: '#5140B4',
    ln: 'Người gỡ được những nút thắt mà người khác chưa gỡ nổi.' },
  { ma: 'R08', lv: 8,  t: 'Coach',                  cong: 'nghe',    mau: '#5140B4',
    ln: 'Người thắp lửa chuyển hoá cho từng gia đình.' },
  { ma: 'R09', lv: 9,  t: 'Giáo viên',              cong: 'nghe',    mau: '#0B6675',
    ln: 'Người dạy đúng thứ học viên đang cần để đi tiếp.' },
  { ma: 'R10', lv: 10, t: 'Mentor (bậc 5)',         cong: 'nghe',    mau: '#0B6675',
    ln: 'Người của chính hệ, quay lại kèm bậc dưới — cửa tự tái tạo.' },
  { ma: 'R11', lv: 11, t: 'Chuyên gia đánh giá',    cong: 'nghe',    mau: '#0B6675',
    ln: 'Người trả lại sự thật bằng dữ liệu, độc lập với người dạy.' },
  { ma: 'R12', lv: 12, t: 'Chuyên gia tư vấn',      cong: 'tuvan',   mau: '#BE0E16',
    ln: 'Người mở cánh cửa cho gia đình đang tìm đường.' },
  { ma: 'R13', lv: 13, t: 'Phân tích dữ liệu',      cong: 'quantri', mau: '#185AB4',
    ln: 'Người đọc ra mô thức trước khi nó thành vấn đề — trên dữ liệu đã ẩn danh.' },
  { ma: 'R14', lv: 14, t: 'Đội trưởng CLB',         cong: 'clb',     mau: '#0B7350',
    ln: 'Người giữ nhịp tuần và bộ quy chuẩn của chi hội.' },
  { ma: 'R15', lv: 15, t: 'Phụ huynh',              cong: 'nha',     mau: '#0B7350',
    ln: 'Đối tác phát triển, và chủ sở hữu hồ sơ của con mình.' },
  { ma: 'R16', lv: 16, t: 'Học viên',               cong: 'hoc',     mau: '#185AB4', theoBac: true,
    ln: 'Chủ thể phát triển — người duy nhất không được ai làm thay.' },
  { ma: 'R17', lv: 17, t: 'Đại sứ',                 cong: 'daisu',   mau: '#A8801F',
    ln: 'Người mang câu chuyện thật tới nhà tiếp theo.' }
];

/* ══════════ QUYỀN → BẬC TỐI ĐA ĐƯỢC DÙNG ══════════
   Đọc một dòng: "vai có lv nhỏ hơn hoặc bằng số này thì mở được".  */
GV.QUYEN_MAX = {
  qt_trang:     2,   /* quản trị trang: bảng phân quyền, tài khoản */
  tai_chinh:    3,   /* chỉ R01–R03 nhìn thấy tiền */
  dh_toan_he:   4,   /* điều hành toàn hệ, rủi ro, triển khai, tuyển người */
  kpi_toan_he:  4,   /* bảy chỉ số của hệ thống */
  qt_noi_dung:  5,   /* kho kỹ thuật: mô hình dữ liệu, bảng lưu, lộ trình công nghệ */
  nghe_quan_ly: 6,   /* chuẩn nghề: lộ trình Coach, dự giờ */
  nghiem_thu:  11,   /* cổng nghiệm thu và báo cáo — Assessor phải mở được */
  tu_van:      12,   /* đường vào, mạch tư vấn, chân dung khách hàng */
  nghe_chung:  13,   /* kho nghề: ma trận, phác đồ, chiến lược, điểm chạm */
  clb_dieu_hanh: 14, /* điều hành chi hội: ghế, lịch năm, mở chi hội */
  kh_gia_dinh: 15,   /* phần gia đình: sổ tay vai, biểu mẫu, ngôn ngữ, trại */
  kh_hanh_trinh: 16, /* hành trình của học viên */
  chung:       17    /* mọi tài khoản đăng nhập đều thấy */
};

/* ══════════ TẦNG HIỂN THỊ — "ai thấy gì" nói bằng lời ══════════ */
GV.TANG_HT_UI = [
  { q: 'chung',        t: 'Chung cho mọi tài khoản', mo: 'Kiến trúc, nguyên lý, sáu bậc, bốn môi trường, an toàn trẻ em.' },
  { q: 'kh_hanh_trinh',t: 'Hành trình của học viên', mo: 'Hộ chiếu, khung năng lực, lộ trình bậc, nhịp chi hội. Đại sứ không thấy.' },
  { q: 'kh_gia_dinh',  t: 'Phần gia đình',           mo: 'Sổ tay vai, biểu mẫu, bảng ngôn ngữ, thiết kế trại. Học viên và đại sứ không thấy.' },
  { q: 'clb_dieu_hanh',t: 'Điều hành chi hội',       mo: 'Bảy ghế, lịch năm, mở chi hội mới.' },
  { q: 'nghe_chung',   t: 'Kho nghề',                mo: 'Ma trận 8×8, phác đồ, 100 chiến lược, chuỗi điểm chạm. Mở cho học viên từ bậc 5.' },
  { q: 'tu_van',       t: 'Khoang mở cửa',           mo: 'Đường vào, mạch tư vấn, chân dung gia đình.' },
  { q: 'nghiem_thu',   t: 'Nghiệm thu và báo cáo',   mo: 'Cổng 100 điểm và bốn báo cáo.' },
  { q: 'nghe_quan_ly', t: 'Chuẩn nghề',              mo: 'Lộ trình nghề Coach và chuẩn dự giờ.' },
  { q: 'qt_noi_dung',  t: 'Kho kỹ thuật',            mo: 'Mô hình dữ liệu, bảng lưu, đường máy chủ, lộ trình công nghệ.' },
  { q: 'kpi_toan_he',  t: 'Chỉ số toàn hệ',          mo: 'Bảy chỉ số. Phân tích dữ liệu xem trên dữ liệu đã ẩn danh.' },
  { q: 'dh_toan_he',   t: 'Điều hành toàn hệ',       mo: 'Vai trò, rủi ro, tuyển người, kế hoạch triển khai.' },
  { q: 'tai_chinh',    t: 'Tài chính',               mo: 'CHỈ R01–R03, để đo lường và giám sát.' },
  { q: 'qt_trang',     t: 'Quản trị trang',          mo: 'CHỈ R01–R02. Bảng phân quyền và tài khoản.' }
];

/* ══════════ GHI ĐÈ — chỗ bậc không nói được ══════════
   cho = cấp thêm quyền mà bậc chưa cho · cam = thu lại quyền bậc đã cho.
   Đây là bảng Super Admin và Admin hệ thống sửa được lúc vận hành;
   giá trị dưới đây là điểm khởi đầu, không phải thứ bất biến.       */
GV.GHI_DE = {
  /* Admin sản phẩm đứng ở bậc 5 để giữ kho, nhưng KHÔNG được nhìn
     tiền và KHÔNG được nhìn hồ sơ của một nhà cụ thể. Bậc không nói
     được điều này, nên phải ghi đè. */
  R05: { cho: [], cam: ['tai_chinh', 'dh_toan_he', 'nghiem_thu'] },
  /* Phân tích dữ liệu đọc được kho nghề và mọi bảng số tổng hợp,
     nhưng không mở phần thao tác với từng gia đình. */
  R13: { cho: ['kpi_toan_he'], cam: ['tu_van'] },
  /* Đại sứ chỉ ở phần cộng đồng: không có hành trình học viên,
     không có phần gia đình. */
  R17: { cho: [], cam: ['kh_hanh_trinh', 'kh_gia_dinh'] }
};

/* ══════════ BẬC NĂNG LỰC HỌC VIÊN → BẬC QUYỀN HIỆU LỰC ══════════
   Trục thứ hai, chỉ áp cho vai có theoBac. Học viên lên bậc thì mở
   thêm tầng nội dung. Bậc 5 mở kho nghề vì đúng lúc ấy em trở thành
   Mentor — quyền đi theo trách nhiệm, không đi theo tuổi.           */
GV.BAC_MO = [
  { bac: 'B1', lv: 16, t: 'HẠT',           mo: 'Hành trình của em, chi hội, nhịp tuần, bốn môi trường.' },
  { bac: 'B2', lv: 16, t: 'MẦM',           mo: 'Thêm sáu vòng chiều sâu và toàn bộ khoá nền.' },
  { bac: 'B3', lv: 15, t: 'THÂN',          mo: 'Thêm tổ mũi nhọn, sổ tay vai, biểu mẫu, bảng ngôn ngữ, cách dùng Thư viện.' },
  { bac: 'B4', lv: 14, t: 'TRỤ',           mo: 'Thêm phần điều hành chi hội: bảy ghế, lịch năm, mở chi hội.' },
  { bac: 'B5', lv: 13, t: 'NGƯỜI DẪN',     mo: 'MỞ KHO NGHỀ: ma trận 8×8, phác đồ, 100 chiến lược. Em đã là Mentor.' },
  { bac: 'B6', lv: 11, t: 'KIẾN TRÚC SƯ',  mo: 'Thêm cổng nghiệm thu và báo cáo. Em đang giữ chuẩn.' }
];

/* Bậc tối thiểu để mở một màn có gắn `bac` — dùng cho vai theo bậc */
GV.BAC_SO = { B1: 1, B2: 2, B3: 3, B4: 4, B5: 5, B6: 6 };

/* ══════════ TỈ LỆ HIỂN THỊ MONG MUỐN ══════════
   Bộ kiểm phát hành đối chiếu với số đếm thật. Lệch quá 3 điểm là
   dừng phát hành — vì lệch nghĩa là có màn bị gắn nhầm quyền.       */
GV.TY_LE = [
  { vai: ['R01', 'R02'], pt: 100, ghi: 'Toàn bộ, không khoá gì.' },
  { vai: ['R03'],        pt: 99,  ghi: 'Khoá bảng phân quyền.' },
  { vai: ['R04'],        pt: 98,  ghi: 'Khoá quản trị trang và tài chính.' },
  { vai: ['R05'],        pt: 78,  ghi: 'Giữ kho nội dung và gác nhận diện thương hiệu. Khoá tiền, điều hành toàn hệ, nghiệm thu, bản quyền.' },
  { vai: ['R06'],        pt: 74,  ghi: 'Thêm chuẩn nghề, kiểm định, khủng hoảng và đo cảm nhận.' },
  { vai: ['R07', 'R08', 'R09', 'R10', 'R11'], pt: 70,
    ghi: 'Kho nghề, tư vấn, nghiệm thu, chi hội, gia đình, hành trình, thư viện, trải nghiệm, ánh xạ chuẩn.' },
  { vai: ['R12'],        pt: 67,  ghi: 'Như trên, trừ nghiệm thu và ánh xạ chuẩn quốc gia.' },
  { vai: ['R13'],        pt: 61,  ghi: 'Kho nghề và chỉ số tổng hợp; không mở khoang tư vấn.' },
  { vai: ['R14'],        pt: 48,  ghi: 'Chi hội, gia đình, hành trình học viên, thư viện, cam kết, dấu hiệu và bảng màu.' },
  { vai: ['R15'],        pt: 46,  ghi: 'Phần gia đình, cổng phụ huynh, cam kết và bảo đảm, thư viện, nhận diện phần công khai.' },
  { vai: ['R16'],        pt: 38,  ghi: 'Học viên bậc 1. Lên bậc mở thêm: B3 → 45%, B4 → 48%, B5 → 59%, B6 → 68%.' },
  { vai: ['R17'],        pt: 25,  ghi: 'Phần chung, phần cộng đồng, luật bảo vệ trẻ, dấu hiệu và giọng thương hiệu.' }
];

/* ══════════ SÁU LUẬT PHÂN QUYỀN ══════════ */
GV.LUAT_QUYEN = [
  'Ẩn hiện ở trình duyệt KHÔNG PHẢI là hàng rào. Máy chủ kiểm lại quyền trước mọi lần đọc và mọi lần ghi, không có ngoại lệ.',
  'Bản phát hành cho một vai chỉ được đóng gói phần nội dung vai ấy có quyền. Thứ không gửi đi là thứ không lộ được.',
  'Một màn thuộc đúng MỘT tầng hiển thị. Muốn đổi phạm vi thì đổi tầng của màn, không sửa rải rác từng chỗ.',
  'Người chấm không được là người dạy: máy chủ từ chối khi người chấm cổng trùng với người dẫn ca đó.',
  'Mọi lần đổi quyền đều vào nhật ký hệ thống, và nhật ký ấy không ai xoá được — kể cả Super Admin.',
  'Gia đình luôn xem được toàn bộ hồ sơ của con mình, xuất được bản sao, và yêu cầu xoá được trong 30 ngày.'
];
