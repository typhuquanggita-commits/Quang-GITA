/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · ĐỊNH NGHĨA MÀN HÌNH
   Mười tám nhóm · 120 màn. Mỗi màn là một danh sách KHỐI; lớp giao diện biết
   dựng từng loại khối. Thêm màn mới thì thêm ở đây, không đụng vào
   giao-dien.js — trừ khi cần một loại khối chưa từng có.
   Trong khối "van", dấu *…* thành chữ đậm.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var GV = window.GV || {};
window.GV = GV;

GV.NHOM = [
  { id: 'g1', no: '01', t: 'NỀN MÓNG', s: 'Hệ này là gì và dựng trên gì', mau: '#185AB4',
    ds: [
      { v: 'tong-quan', t: 'Tổng quan hệ thống', h: 'Định vị · vì sao cần hệ thứ hai' },
      { v: 'pham-vi', t: 'Phạm vi của tôi', h: 'Vai này mở tới đâu · còn gì chưa mở' },
      { v: 'nguyen-ly', t: 'Bảy nguyên lý bất biến', h: 'Lớp L0 — đổi chậm nhất' },
      { v: 'kien-truc', t: 'Bảy lớp kiến trúc', h: 'Xếp theo tốc độ đổi' },
      { v: 'ho-chieu', t: 'Hộ chiếu nhân tài', h: 'Trục dọc xuyên bảy lớp' },
      { v: 'bac', t: 'Sáu bậc nhân tài', h: 'Dòng chảy người' },
      { v: 'nang-luc', t: 'Khung năng lực', h: '4 trụ × 12 trục × 5 mức' },
      { v: 'pham-chat', t: 'Năm phẩm chất', h: 'Đức · Dũng · Trí · Chủ · Chí' }
    ]},
  { id: 'g2', no: '02', t: 'HUẤN LUYỆN', s: 'Rèn bằng cách nào, theo nhịp nào', mau: '#5140B4',
    ds: [
      { v: 'nhip', t: 'Nhịp 365', h: 'Đồng hồ của hệ thống' },
      { v: 'hinh-thai', t: 'Năm hình thái', h: 'Kèm · lớp · trại · chi hội · dự án' },
      { v: 'lo-trinh-bac', t: 'Lộ trình từng bậc', h: 'Chu kỳ 90 ngày từ B1 tới B6' },
      { v: 'khoa-nen', t: 'Khoá nền 8 buổi', h: 'Bắt buộc với thành viên thử' },
      { v: 'chuyen-de', t: '24 chuyên đề', h: 'Hạt giống tri thức 7 phút' },
      { v: 'trai', t: 'Thiết kế trại', h: 'Gen Alpha · Leader Boom · 21 ngày hậu trại' },
      { v: 'bo-test', t: 'Bộ test nhận diện', h: 'Năm bộ đầu vào và cách đọc' }
    ]},
  { id: 'g3', no: '03', t: 'KHO CHUYÊN MÔN', s: 'Cách đọc một ca và cách chọn giải pháp', mau: '#0B7350',
    ds: [
      { v: 'ma-tran', t: 'Ma trận 8 × 8', h: 'Tám lớp đọc một ca' },
      { v: 'muoi-buoc', t: 'Quy trình 10 bước', h: 'Từ lời kể tới phác đồ' },
      { v: 'nhom-giai-phap', t: 'Mười một nhóm giải pháp', h: '13.1 → 13.11' },
      { v: 'chien-luoc', t: 'Thư viện 100 chiến lược', h: 'Mười nhóm · nguyên tắc 1–2–1' },
      { v: 'ho-tro', t: 'Thang mức hỗ trợ', h: 'Và cơ chế xử lý tự động' }
    ]},
  { id: 'g4', no: '04', t: 'CHI HỘI', s: 'Hạt nhân vận hành hằng tuần', mau: '#0B6675',
    ds: [
      { v: 'chi-hoi', t: 'Mô hình chi hội', h: 'Vì sao mượn khung BNI' },
      { v: 'vong', t: 'Sáu vòng chiều sâu', h: 'V0 khách mời → V5 cố vấn' },
      { v: 'kich-ban', t: 'Kịch bản 90 phút', h: 'Chín mục, không đổi' },
      { v: 'bang-so', t: 'Bảng số bảy cột', h: 'C · Đ · T · G · K · B · P' },
      { v: 'ban-dieu-hanh', t: 'Bảy ghế và nhiệm kỳ', h: 'Luân phiên 6 tháng · sổ ghế' },
      { v: 'to-mui-nhon', t: 'Tổ mũi nhọn', h: 'Nơi mũi nhọn được mài' },
      { v: 'luat-chi-hoi', t: 'Mười điều luật', h: 'Và cách xử vi phạm' },
      { v: 'mo-chi-hoi', t: 'Mở chi hội mới', h: 'Ba tầng tổ chức · năm bước' },
      { v: 'lich-nam', t: 'Lịch năm 52 tuần', h: 'Bốn quý · mốc chung toàn quốc' }
    ]},
  { id: 'g5', no: '05', t: 'THỰC TIỄN', s: 'Nơi năng lực bị kiểm', mau: '#185AB4',
    ds: [
      { v: 'moi-truong', t: 'Bốn môi trường', h: 'Lớp · trường · gia đình · xã hội' },
      { v: 'vong-tuan', t: 'Vòng bảy ngày', h: 'Một tuần của một thành viên' },
      { v: 'so-tay-mt', t: 'Sổ tay môi trường', h: 'M1 · M3 · M4 làm gì cụ thể' },
      { v: 'so-tay-vai', t: 'Sổ tay từng vai', h: 'Sáu vai · tuần · tháng · không làm gì' }
    ]},
  { id: 'g6', no: '06', t: 'NGÔN NGỮ VÀ VĂN HOÁ', s: 'Thứ giữ người ở lại', mau: '#A8801F',
    ds: [
      { v: 'ngon-ngu', t: 'Bảng thay vì', h: 'Mười hai cặp câu · sáu nhịp' },
      { v: 'nghi-le', t: 'Nghi lễ và biểu tượng', h: 'Bảy nghi thức của hệ' },
      { v: 'ghi-nhan', t: 'Hệ ghi nhận', h: 'Mười cấp · bốn luật vinh danh' },
      { v: 'wow', t: 'Chuỗi WOW', h: 'Chín điểm chạm quyết định' }
    ]},
  { id: 'g7', no: '07', t: 'ĐO VÀ NGHIỆM THU', s: 'Không có bằng chứng thì không có điểm', mau: '#BE0E16',
    ds: [
      { v: 'bang-mau', t: 'Bốn băng màu', h: 'Tình trạng ngay lúc này' },
      { v: 'kpi', t: 'Bảy chỉ số hệ thống', h: 'Hệ số tự tái tạo và bạn của nó' },
      { v: 'cong-nghiem-thu', t: 'Cổng 100 điểm', h: 'Sáu cột · ngưỡng 85' },
      { v: 'bao-cao', t: 'Bốn báo cáo', h: 'Tuần · tháng · quý · năm' },
      { v: 'bieu-mau', t: 'Mười bốn biểu mẫu', h: 'Bộ giấy tờ vận hành' }
    ]},
  { id: 'g8', no: '08', t: 'TƯ VẤN VÀ ĐƯỜNG VÀO', s: 'Cách một gia đình bước vào hệ', mau: '#5140B4',
    ds: [
      { v: 'duong-vao', t: 'Đường vào sáu bước', h: 'Giới thiệu → 7 ngày' },
      { v: 'mach-tu-van', t: 'Mạch tư vấn', h: 'Tám dạng nhu cầu → tầng và bậc' },
      { v: 'buoi-dau', t: 'Buổi tư vấn đầu tiên', h: 'Kịch bản 60 phút' },
      { v: 'chan-dung', t: 'Bốn chân dung gia đình', h: 'Và bẫy của từng nhóm' },
      { v: 'dai-su', t: 'Hệ đại sứ', h: 'Bốn cấp · sáu luật giới thiệu' }
    ]},
  { id: 'g9', no: '09', t: 'ĐỘI NGŨ', s: 'Nghề Coach và cách giữ chuẩn nghề', mau: '#0B6675',
    ds: [
      { v: 'nghe-coach', t: 'Lộ trình nghề Coach', h: 'Trợ giảng → Quản lý chuyên môn' },
      { v: 'bay-nang-luc', t: 'Bảy năng lực nghề', h: 'K1 → K7 và cách kiểm' },
      { v: 'tuyen', t: 'Tuyển và thử việc', h: 'Tìm ai · tránh ai · 90 ngày' },
      { v: 'du-gio', t: 'Chuẩn dự giờ', h: 'Bảy cột · ngưỡng 16/20' }
    ]},
  { id: 'g10', no: '10', t: 'DỮ LIỆU', s: 'Xương sống kỹ thuật', mau: '#185AB4',
    ds: [
      { v: 'ma-hoa', t: 'Hệ mã hoá', h: 'Đọc được bằng mắt, không tra bảng' },
      { v: 'ho-so-json', t: 'Mô hình hộ chiếu', h: 'Cấu trúc JSON và năm luật' },
      { v: 'bang-luu', t: 'Bảng lưu và máy chủ', h: '12 bảng · 9 đường · 10 quyền' },
      { v: 'cong-nghe', t: 'Lộ trình công nghệ', h: 'Ba chặng · ba tầng lưu' },
      { v: 'nguyen-tac-kt', t: 'Bảy nguyên tắc dựng', h: 'Cho phần mềm sống ba mươi năm' }
    ]},
  { id: 'g11', no: '11', t: 'VẬN HÀNH', s: 'Người, tiền, và ranh giới', mau: '#0B7350',
    ds: [
      { v: 'vai-tro', t: 'Hai mươi vai', h: '15 vai cũ · 5 vai mới' },
      { v: 'tai-chinh', t: 'Tài chính và quỹ', h: 'Tiền không mua bậc' },
      { v: 'an-toan', t: 'An toàn và đạo đức', h: 'Bảy luật · dấu hiệu chuyển tuyến' },
      { v: 'phan-quyen', t: 'Bảng phân quyền', h: '17 vai · 13 tầng · hai trục' },
      { v: 'rui-ro', t: 'Bảy rủi ro', h: 'Và phanh tương ứng' }
    ]},
  { id: 'g12', no: '12', t: 'TRIỂN KHAI', s: 'Từ hôm nay tới 2056', mau: '#A8801F',
    ds: [
      { v: 'ngay-90', t: 'Chín mươi ngày đầu', h: 'Thứ tự bắt buộc' },
      { v: 'nam-dau', t: 'Năm đầu tiên', h: 'Bốn quý, có số' },
      { v: 'ba-muoi-nam', t: 'Ba mươi năm', h: 'Sáu chặng, sáu cổng' },
      { v: 'nguon', t: 'Nguồn', h: 'Tài liệu đã dùng' }
    ]},
  { id: 'g13', no: '13', t: 'THƯ VIỆN GEN VIỆT', s: 'Bộ sách sáu quyển về người Việt xuất sắc', mau: '#BE0E16',
    ds: [
      { v: 'thu-vien', t: 'Bộ sách Gen Việt', h: 'Sáu quyển · bảy nguyên tắc biên soạn' },
      { v: 'q1-giu-nuoc', t: 'Quyển 1 · Giữ nước', h: 'Tám danh tướng và nghệ thuật của bên yếu hơn' },
      { v: 'q2-dung-nuoc', t: 'Quyển 2 · Dựng nước', h: 'Chín nhà kiến quốc và cải cách' },
      { v: 'q3-hien-tai', t: 'Quyển 3 · Hiền tài', h: 'Bảy kẻ sĩ · người tài không được dùng thì làm gì' },
      { v: 'q4-khoa-hoc', t: 'Quyển 4 · Trí tuệ khoa học', h: 'Chín nhà khoa học và thầy thuốc' },
      { v: 'q5-van-hien', t: 'Quyển 5 · Văn hiến', h: 'Bảy người làm nên phần hồn' },
      { v: 'q6-duong-thoi', t: 'Quyển 6 · Người đương thời', h: 'Chân dung tập thể và trang để trống' },
      { v: 'mo-thuc-viet', t: 'Mười hai mô thức Việt', h: 'Phần dùng được hằng tuần' },
      { v: 'dung-thu-vien', t: 'Cách dùng bộ sách', h: 'Chi hội · trại · gia đình · dự án' }
    ]},
  { id: 'g14', no: '14', t: 'TRẢI NGHIỆM VÀ CAM KẾT', s: 'Hệ này cảm thấy thế nào từ phía gia đình', mau: '#0B6675',
    ds: [
      { v: 'hanh-trinh-365', t: 'Hành trình 365 ngày', h: 'Chín chặng · phụ huynh nghĩ gì, sợ gì' },
      { v: 'khoanh-khac', t: 'Mười hai khoảnh khắc', h: 'Nơi cảm nhận cả năm được quyết định' },
      { v: 'cam-ket-dv', t: 'Mười hai cam kết dịch vụ', h: 'Hứa gì · đo gì · sai thì đền gì' },
      { v: 'cong-phu-huynh', t: 'Cổng phụ huynh', h: 'Thấy gì, ở đâu, khi nào' },
      { v: 'hien-vat', t: 'Mười bốn hiện vật', h: 'Thứ cầm được, và cách trao' },
      { v: 'phuc-hoi', t: 'Khi hỏng việc', h: 'Năm bước phục hồi dịch vụ' },
      { v: 'giu-nguoi', t: 'Khi con muốn nghỉ', h: 'Sáu lý do thật · và cách ra đi tử tế' },
      { v: 'do-cam-nhan', t: 'Đo cảm nhận', h: 'Sáu chỉ số không hỏi “hài lòng chứ ạ”' }
    ]},
  { id: 'g15', no: '15', t: 'GIÁ TRỊ VÀ TĂNG TRƯỞNG', s: 'Gói, giá, bảo đảm, và cách lớn mà không loãng', mau: '#A8801F',
    ds: [
      { v: 'goi-san-pham', t: 'Năm gói', h: 'Gồm gì · và không phù hợp với ai' },
      { v: 'chong-gia-tri', t: 'Chồng giá trị', h: 'Gia đình nhận gì so với thị trường' },
      { v: 'bao-dam', t: 'Ba lớp bảo đảm', h: '7 ngày · 90 ngày · suốt đời' },
      { v: 'kinh-te', t: 'Đơn vị kinh tế', h: 'Chi phí thật · hoà vốn · luật vàng' },
      { v: 'pheu', t: 'Phễu tuyển sinh', h: 'Năm tầng · ngưỡng chuyển' },
      { v: 'thong-diep', t: 'Bộ thông điệp', h: 'Một câu · ba câu · một trang' },
      { v: 'phan-doi', t: 'Mười hai phản đối', h: 'Điều thật đằng sau mỗi câu' },
      { v: 'nha-truong', t: 'Hợp tác nhà trường', h: 'Bốn mô hình · bán đúng thứ họ cần' },
      { v: 'nhan-rong', t: 'Nhân rộng', h: 'Ba đường · và lõi bất biến' }
    ]},
  { id: 'g16', no: '16', t: 'BẰNG CHỨNG VÀ TIN CẬY', s: 'Chứng minh, bảo vệ, và dám ghi lại cái sai', mau: '#BE0E16',
    ds: [
      { v: 'tac-dong', t: 'Đo tác động thật', h: 'Ba tầng bằng chứng · tám chỉ số ngoài hệ' },
      { v: 'theo-doi-doc', t: 'Theo dõi dọc 30 năm', h: 'Tài sản không sao chép được' },
      { v: 'kiem-dinh', t: 'Kiểm định', h: 'Nội kiểm hằng quý · ngoại kiểm hằng năm' },
      { v: 'bao-ve-tre', t: 'Mười luật đỏ', h: 'Bảo vệ trẻ em · không có mức phạt trung gian' },
      { v: 'du-lieu-tre', t: 'Dữ liệu của con', h: 'Thu tối thiểu · quyền của gia đình' },
      { v: 'khung-hoang', t: 'Năm cấp khủng hoảng', h: 'Và hai mươi tư giờ vàng' },
      { v: 'phap-ly', t: 'Giấy tờ phải có', h: 'Mười hồ sơ và nhịp cập nhật' },
      { v: 'cau-hoi', t: 'Câu hỏi thường gặp', h: 'Sáu nhóm người hỏi · trả lời không né' },
      { v: 'so-loi', t: 'Sổ ghi lỗi công khai', h: 'Thứ rất ít nơi dám làm' }
    ]},
  { id: 'g17', no: '17', t: 'NHẬN DIỆN THƯƠNG HIỆU', s: 'Thứ khiến người ta nhận ra mình khi chưa thấy tên', mau: '#5140B4',
    ds: [
      { v: 'nen-thuong-hieu', t: 'Nền tảng thương hiệu', h: 'Định vị · lời hứa · tính cách · khác biệt' },
      { v: 'kien-truc-th', t: 'Kiến trúc thương hiệu', h: 'GITA → Gen Việt 365 → sản phẩm · luật đặt tên' },
      { v: 'an-gen-viet', t: 'Ấn Gen Việt', h: 'Dấu hiệu · ý niệm · năm biến thể · dựng hình' },
      { v: 'an-dung-sai', t: 'Tám cách dùng sai', h: 'Vẽ ra thì hiểu nhanh hơn kể ra' },
      { v: 'mau-th', t: 'Bảng màu', h: 'Chín màu · mã đủ hệ · luật tương phản' },
      { v: 'chu-th', t: 'Bộ chữ', h: 'Ba phông · thang chữ · bộ thay thế' },
      { v: 'hinh-th', t: 'Hình ảnh và hoạ tiết', h: 'Luật đạo đức trước luật thẩm mỹ' },
      { v: 'giong-th', t: 'Giọng thương hiệu', h: 'Năm nguyên tắc · bảng nói và không nói' },
      { v: 'ung-dung-th', t: 'Mười sáu ứng dụng', h: 'Từ con dấu tới phông nền sự kiện' },
      { v: 'giu-th', t: 'Bộ tệp và luật giữ', h: 'Ai gác · bàn giao gì · rà khi nào' }
    ]},
  { id: 'g18', no: '18', t: 'BẢN QUYỀN VÀ TOÀN CẦU', s: 'Xác lập quyền, trình đề án, ra thế giới', mau: '#0E1826',
    ds: [
      { v: 'tai-san-tri-tue', t: 'Danh mục tài sản trí tuệ', h: 'Mười hai tài sản · loại quyền · nơi đăng ký' },
      { v: 'quyen-tac-gia', t: 'Đăng ký quyền tác giả', h: 'Quyền đã có sẵn — đăng ký là để có chứng cứ' },
      { v: 'nhan-hieu', t: 'Đăng ký nhãn hiệu', h: 'Tám bước · năm nhóm Nice' },
      { v: 'de-an-quoc-gia', t: 'Đề án cấp quốc gia', h: 'Bảy bước · cấu trúc mười một phần' },
      { v: 'anh-xa-chuan', t: 'Ánh xạ chuẩn quốc gia', h: 'Cây cầu sang Chương trình 2018' },
      { v: 'ra-quoc-te', t: 'Ra quốc tế', h: 'Berne · Madrid · nguyên tắc nộp trước' },
      { v: 'ban-dia-hoa', t: 'Bản địa hoá ba tầng', h: 'Dịch · thích ứng · tái tạo' },
      { v: 'tuan-thu-vung', t: 'Tuân thủ theo vùng', h: 'GDPR · COPPA · và chuẩn chung' },
      { v: 'lo-trinh-toan-cau', t: 'Lộ trình toàn cầu', h: 'Bốn chặng 2026 → 2056' },
      { v: 'chong-xam-pham', t: 'Chống xâm phạm', h: 'Năm cấp · bằng chứng phải giữ sẵn' }
    ]}
];

GV.MAN = {

/* ══════════ NHÓM 1 · NỀN MÓNG ══════════ */
'tong-quan': { q: 'chung', k: 'Mở đầu', t: 'Hệ này là gì, và vì sao phải dựng nó bây giờ',
  p: 'Học viện GITA đã có một hệ giải pháp năm tầng chạy được trên gia đình thật. Cái còn thiếu là hệ chịu trách nhiệm về mười, hai mươi, ba mươi năm tiếp theo của những em giỏi nhất đi qua đó.',
  khoi: [
    { k: 'so', ds: [{ b: '13', t: 'nhóm nội dung' }, { b: '74', t: 'màn' }, { b: '6', t: 'bậc nhân tài' },
                    { b: '12', t: 'trục năng lực' }, { b: '30', t: 'năm · 6 chặng' }] },
    { k: 'van', t: 'GEN VIỆT 365 không phải một chương trình học. Nó là *hệ điều hành phát triển con người* của Học viện: nơi một em bé bảy tuổi bước vào ở bậc Hạt, và ba mươi năm sau có thể ngồi trong Hội đồng Chuẩn quyết định điều gì là đúng cho thế hệ tiếp theo.' },
    { k: 'trich', t: 'GITA không huấn luyện một hành vi đơn lẻ. GITA kiến tạo một hệ điều hành phát triển cá nhân.', n: 'Hệ thống giải pháp GITA · Chương 13' },
    { k: 'muc', t: 'Hai hệ, hai câu hỏi' },
    { k: 'van', t: 'Một hệ giỏi chữa và kiến tạo cho từng nhà vẫn có thể để mất người giỏi sau khi ca đóng — bởi không ai chịu trách nhiệm về mười năm tiếp theo của em ấy. GEN VIỆT 365 là hệ chịu trách nhiệm phần đó.' },
    { k: 'bang', cot: ['Trục so sánh', 'GITA 365 — hệ giải pháp', 'GEN VIỆT 365 — hệ huấn luyện'],
      tu: 'DINH_VI_BANG' },
    { k: 'van', t: 'Hai hệ dùng chung một kho, chung một bảng phân quyền, chung một mô thức. Chúng khác nhau ở *đơn vị công việc*: một bên đóng ca, một bên không bao giờ đóng.' },
    { k: 'muc', t: 'Đọc bản thiết kế này theo thứ tự nào' },
    { k: 'ds', so: true, ds: [
      'Nhóm 01 — nền móng: nếu chỉ đọc được một nhóm thì đọc nhóm này.',
      'Nhóm 03 và 04 — chi hội và bốn môi trường: phần chạm vào đời sống thật hằng tuần, và là phần khởi động được ngay.',
      'Nhóm 05 — đo và nghiệm thu: phần giữ cho hệ không trôi thành phong trào.',
      'Nhóm 08 — triển khai: đọc cuối, nhưng làm đầu tiên.',
      'Nhóm 13 — Thư viện Gen Việt: bộ sách sáu quyển, dùng hằng tuần trong bảy phút Hạt giống tri thức.'
    ]}
  ]},

'nguyen-ly': { q: 'chung', k: 'Lớp L0', t: 'Bảy nguyên lý bất biến',
  p: 'Lớp đổi chậm nhất. Ba mươi năm tới, mọi thứ khác được phép đổi; bảy điều này chỉ đổi bởi Hội đồng Chuẩn, và mỗi lần đổi phải ghi lý do vào Sổ Chuẩn.',
  khoi: [{ k: 'ly', tu: 'NGUYEN_LY' }] },

'kien-truc': { q: 'chung', k: 'Kiến trúc', t: 'Bảy lớp, xếp theo tốc độ đổi',
  p: 'Nguyên tắc duy nhất giữ cho một hệ thống ba mươi năm không rối: lớp đổi nhanh được phép phụ thuộc lớp đổi chậm, không bao giờ ngược lại.',
  khoi: [
    { k: 'thap', tu: 'LOP' },
    { k: 'van', t: '*L2 chỉ lớn lên bằng ca thật đã nghiệm thu.* Không nhận nội dung chưa từng chạy trên một gia đình. Đây là điều phân biệt một kho nghề với một thư viện mẹo.' },
    { k: 'van', t: 'Vi phạm chiều phụ thuộc là cách một hệ thống ba mươi năm chết ở năm thứ tám: khi một quyết định vận hành (L4) buộc phải sửa chuẩn (L1), hoặc khi một tính năng phần mềm quyết định thay cho nguyên lý (L0).' }
  ]},

'ho-chieu': { q: 'kh_hanh_trinh', k: 'Trục dọc', t: 'Hộ chiếu nhân tài',
  p: 'Một người — một hồ sơ — suốt ba mươi năm. Không thuộc về gói dịch vụ, không mất khi ca đóng, không phải làm lại khi đổi Coach hay đổi vùng.',
  khoi: [
    { k: 'bang', cot: ['Trường', 'Nội dung'], tu: 'HO_CHIEU_TRUONG' },
    { k: 'van', t: 'Trường *"người em ấy đã rèn"* là trường khiến hộ chiếu này khác mọi học bạ: nó biến một hồ sơ cá nhân thành một mắt xích đo được của mạng lưới. Cộng tất cả các trường ấy lại chính là hệ số tự tái tạo của toàn hệ.' },
    { k: 'the', t: 'Xem chi tiết kỹ thuật', n: 'Cấu trúc JSON, năm luật ghi dữ liệu, bảng lưu và giao diện máy chủ nằm ở nhóm 06 · Dữ liệu.' }
  ]},

'bac': { q: 'chung', k: 'Dòng chảy người', t: 'Sáu bậc nhân tài',
  p: 'Bậc không lên theo tuổi và không lên theo thời gian ở lại. Bậc lên theo bằng chứng, và bằng chứng ở mỗi bậc là một loại khác nhau.',
  khoi: [
    { k: 'bac', tu: 'BAC' },
    { k: 'van', t: '*Điểm gập của toàn bộ kiến trúc nằm ở bậc 5.* Từ bậc này trở đi, sản phẩm của hệ thống trở thành lực lượng của chính hệ thống. Đó là lý do một tầm nhìn ba mươi năm khả thi: không phải vì tuyển được nhiều hơn, mà vì mỗi người bậc 5 rèn được người tiếp theo.' },
    { k: 'muc', t: 'Cổng định lượng: bậc nào đòi hồ sơ nào' },
    { k: 'bang', cot: ['Bậc', 'Đòi hỏi tối thiểu', 'Điều kiện trục chính'], tu: 'BAC_MUC' }
  ]},

'nang-luc': { q: 'kh_hanh_trinh', k: 'Lớp L1', t: 'Khung năng lực: bốn trụ × mười hai trục × năm mức',
  p: 'Mười hai trục lấy nguyên từ hệ KPI nâng cao Tầng 5 của GITA 365, xếp lại dưới bốn trụ G–I–T–A để nhìn một dòng là biết nó thuộc miền nào.',
  khoi: [
    { k: 'tru', tu: 'TRU' },
    { k: 'muc', t: 'Thang năm mức — dùng chung cho cả mười hai trục' },
    { k: 'thang', tu: 'MUC' },
    { k: 'van', t: 'Bảng này là thứ khiến hệ thống *chấm được bởi người thứ ba*. Một Assessor chưa từng gặp học viên vẫn nghiệm thu được, vì mọi ô đều có đơn vị đo và bằng chứng đi kèm — đó là điều kiện cần để chuẩn không loãng khi mở ra mười vùng.' }
  ]},

'pham-chat': { q: 'chung', k: 'Đích của con người', t: 'Năm phẩm chất Gen Việt',
  p: 'Đức · Dũng · Trí · Chủ · Chí. Mỗi phẩm chất phải có chỗ rèn cụ thể hằng tuần và một cách đo — nếu không thì nó chỉ là khẩu hiệu treo tường.',
  khoi: [
    { k: 'pc', tu: 'PHAM_CHAT' },
    { k: 'van', t: 'Năm phẩm chất *không phải trục thứ mười ba*. Chúng là cách đọc mười hai trục theo chiều đạo đức: một em đạt mức 5 cả mười hai trục mà thiếu Đức thì hệ thống đã tạo ra một người giỏi nguy hiểm, không phải một nhân tài.' }
  ]},

/* ══════════ NHÓM 2 · HUẤN LUYỆN ══════════ */
'nhip': { q: 'chung', k: 'Lớp L3', t: 'Nhịp 365 — đồng hồ của hệ thống',
  p: 'Bảy chu kỳ lồng vào nhau. Mỗi chu kỳ có đúng một đầu ra, và đầu ra của chu kỳ nhỏ là nguyên liệu của chu kỳ lớn.',
  khoi: [
    { k: 'nhip', tu: 'NHIP' },
    { k: 'van', t: 'Năm ngày cuối mỗi năm — *Hội nghị Phát triển Gia đình* — là nghi lễ quan trọng nhất trong năm: học viên bảo vệ hồ sơ, phụ huynh trình bày thay đổi của chính mình, Coach nghiệm thu hệ thống chứ không nghiệm thu điểm số.' }
  ]},

'hinh-thai': { q: 'chung', k: 'Lớp L3', t: 'Năm hình thái huấn luyện',
  p: 'Không thay nhau — chồng lên nhau. Một học viên bậc 3 thường nằm trong bốn hình thái cùng lúc. Gia đình không phải hình thái thứ sáu; nó là môi trường bao trùm cả năm.',
  khoi: [
    { k: 'bang', cot: ['Mã', 'Hình thái', 'Nhịp', 'Mạnh ở', 'Yếu ở', 'Dùng khi', 'Bậc'], tu: 'HINH_THAI' },
    { k: 'van', t: 'Câu lạc bộ Gen Việt là *xương sống*, không phải hoạt động phụ. Trại tạo bước ngoặt, kèm 1-1 gỡ nút thắt, nhưng thứ giữ người qua các chu kỳ và tạo chỗ cho bậc 5 thực tập dẫn dắt là nhịp tuần của câu lạc bộ.' }
  ]},

'lo-trinh-bac': { q: 'kh_hanh_trinh', k: 'Lộ trình', t: 'Từng bậc đi qua những chu kỳ nào',
  p: 'Chu kỳ 90 ngày là đơn vị nhỏ nhất có cổng; bậc là đơn vị có hồ sơ. Không chu kỳ nào được kéo dài quá 90 ngày để chờ em ấy sẵn sàng — chưa đạt thì đóng chu kỳ, ghi nhận thật, mở chu kỳ mới với cùng đích.',
  khoi: [
    { k: 'ck', tu: 'LO_TRINH' },
    { k: 'van', t: 'Kéo dài một chu kỳ vô hạn là cách giấu một thất bại — và là cách chắc chắn nhất để mất niềm tin của gia đình vào lần nghiệm thu tiếp theo.' }
  ]},

'khoa-nen': { q: 'kh_hanh_trinh', k: 'Đào tạo', t: 'Khoá nền — tám buổi trong sáu mươi ngày',
  p: 'Bắt buộc với mọi thành viên thử V1. Không xong khoá nền thì không lên V2, bất kể em ấy dễ thương tới đâu. Mỗi buổi 60 phút, dạy bởi Trưởng ban Đào tạo hoặc một thành viên V3 trở lên.',
  khoi: [
    { k: 'buoi', tu: 'KHOA_NEN' },
    { k: 'van', t: 'Khoá nền là chỗ chi hội tự đào tạo người của mình. *Người dạy khoá nền học được nhiều hơn người học* — nên đây cũng là bài tập đầu tiên của một thành viên V3 muốn tiến tới ghế ban điều hành.' }
  ]},

'chuyen-de': { q: 'kh_hanh_trinh', k: 'Đào tạo', t: 'Hai mươi bốn chuyên đề Hạt giống tri thức',
  p: 'Bảy phút mỗi buổi sinh hoạt. Một năm bốn mươi tám tuần thì chạy hai vòng, vòng sau sâu hơn vòng trước. Mỗi chuyên đề phải kèm một việc làm được ngay trong tuần.',
  khoi: [
    { k: 'cd', tu: 'CHUYEN_DE' },
    { k: 'van', t: 'Bảy phút giảng đạo lý là bảy phút bị mất. Cách kiểm một chuyên đề có đạt hay không rất đơn giản: *tuần sau, hỏi xem có bao nhiêu em đã làm việc được giao.* Dưới một nửa thì chuyên đề ấy phải viết lại, không phải học viên phải cố hơn.' }
  ]},

'trai': { q: 'kh_gia_dinh', k: 'Hình thái H3', t: 'Thiết kế trại',
  p: 'Trại là một nhịp nén: ba tới bảy ngày để tạo một bước ngoặt mà nhịp tuần thường không tạo nổi. Bước ngoặt ấy tan trong khoảng ba tuần nếu không có nhịp giữ ở nhà.',
  khoi: [
    { k: 'ds', ds: null, tu: 'TRAI_LY' },
    { k: 'trai', tu: 'TRAI_DS' },
    { k: 'muc', t: 'Khung một ngày trại' },
    { k: 'lich', tu: 'TRAI_NGAY' },
    { k: 'muc', t: 'Hai mươi mốt ngày hậu trại — phần bắt buộc' },
    { k: 'nhip2', tu: 'TRAI_HAU' },
    { k: 'van', t: 'Nếu 21 ngày hậu trại không chạy, lỗi thuộc về *thiết kế trại*, không thuộc về đứa trẻ. Ghi vào hồ sơ thiết kế và sửa cho kỳ sau.' }
  ]},

'bo-test': { q: 'kh_gia_dinh', k: 'Đầu vào', t: 'Bộ test nhận diện',
  p: 'Năm bộ, mỗi bộ ba mươi câu, thang một tới năm. Không dùng để dán nhãn — dùng để có một baseline trung thực và để chọn đúng câu hỏi cho buổi đầu tiên.',
  khoi: [
    { k: 'ds', tu: 'TEST_LUAT' },
    { k: 'bang', cot: ['Mã', 'Bộ', 'Đo gì', 'Đầu ra'], tu: 'TEST_DS' },
    { k: 'muc', t: 'Đọc kết quả — năm dạng thường gặp' },
    { k: 'bang', cot: ['Dạng', 'Nghĩa là gì và làm gì tiếp'], tu: 'TEST_DOC' }
  ]},

/* ══════════ NHÓM 3 · CHI HỘI ══════════ */
'chi-hoi': { q: 'chung', k: 'Lớp L5 · hạt nhân vận hành', t: 'Chi hội Gen Việt — mô hình chiều sâu',
  p: 'Câu lạc bộ không phải sinh hoạt ngoại khoá. Nó là đơn vị vận hành nhỏ nhất của cả hệ thống, tổ chức theo khung chi hội của BNI, dịch toàn bộ sang mục đích rèn người trẻ.',
  khoi: [
    { k: 'the', tu: 'CLB_GOC' },
    { k: 'bang', cot: ['Điểm chốt', 'Chuẩn'], tu: 'CLB_QUYMO' },
    { k: 'van', t: 'Bốn thứ mượn từ BNI — kịch bản không đổi, bảng số hằng tuần, ghế luân phiên, ban thành viên gác chuẩn — đều nằm ở các màn tiếp theo của nhóm này.' }
  ]},

'vong': { q: 'kh_hanh_trinh', bac: 'B2', k: 'Chi hội', t: 'Sáu vòng chiều sâu',
  p: 'Đường đi của một người trong chi hội, từ khách mời tới cố vấn.',
  khoi: [
    { k: 'buoc', tu: 'CLB_VONG' },
    { k: 'van', t: 'Vòng trong chi hội và bậc nhân tài là *hai thang khác nhau nhưng khớp vào nhau*: vòng đo vị trí của em trong cộng đồng, bậc đo năng lực của em trong hộ chiếu. Không được lấy vòng thay cho bậc — một em rất được yêu quý trong chi hội vẫn có thể chưa đủ bằng chứng để lên bậc.' }
  ]},

'kich-ban': { q: 'kh_hanh_trinh', k: 'Chi hội', t: 'Kịch bản buổi sinh hoạt — 90 phút, không đổi',
  p: 'Chín mục, cố định. Đây là thứ khiến một chi hội ở Hà Nội và một chi hội ở Sơn La chạy giống nhau.',
  khoi: [
    { k: 'lich', tu: 'CLB_KICHBAN' },
    { k: 'van', t: '*Ban điều hành không được phép sửa kịch bản.* Chỉ Hội đồng Gen Việt sửa, và mỗi lần sửa áp cho toàn quốc. Một chi hội thấy mục nào không hợp thì gửi đề nghị lên vùng, không tự bỏ.' },
    { k: 'van', t: 'Kết thúc đúng phút thứ 90 là điều khó nhất và đáng giá nhất trong cả kịch bản. Một buổi kéo dài thêm mười lăm phút mỗi tuần là mười ba giờ bị lấy mất của mỗi thành viên trong một năm.' }
  ]},

'bang-so': { q: 'kh_hanh_trinh', k: 'Chi hội', t: 'Bảng số tuần — bảy cột',
  p: 'Thành viên tự ghi, tự chịu trách nhiệm. Thư ký công bố trong 24 giờ. Số thật, không sửa.',
  khoi: [
    { k: 'bang', cot: ['Cột', 'Đo gì', 'Đơn vị', 'Luật'], tu: 'CLB_BANGSO' },
    { k: 'van', t: 'Bảng số xếp mỗi thành viên vào một trong bốn băng — cùng bốn băng hệ thống đã dùng cho gia đình, nên một Coach nhìn là hiểu ngay.' },
    { k: 'mau', tu: 'BANG_MAU' },
    { k: 'van', t: 'Gọi tên người ở băng ĐỎ giữa buổi họp là *để cả chi hội giúp, không phải để phạt*. Ranh giới này mỏng và rất dễ trượt: một đội trưởng gọi tên bằng giọng trách móc sẽ giết cột trung thực của cả chi hội trong ba tuần.' }
  ]},

'ban-dieu-hanh': { q: 'clb_dieu_hanh', bac: 'B4', k: 'Chi hội', t: 'Bảy ghế và nhiệm kỳ sáu tháng',
  p: 'Mọi thành viên phải qua ít nhất một ghế trước khi được xét bậc 4. Đây là chỗ một người trẻ học lãnh đạo bằng cách chịu trách nhiệm thật, trước những người bạn có quyền bỏ phiếu thay mình.',
  khoi: [
    { k: 'bang', cot: ['Ghế', 'Làm gì', 'KPI của ghế'], tu: 'CLB_BAN' },
    { k: 'muc', t: 'Ba mốc đào tạo bắt buộc mỗi nhiệm kỳ' },
    { k: 'van', tu: 'BDH_N' },
    { k: 'moc', tu: 'BDH_DS' },
    { k: 'the', t: 'Sổ ghế', tu: 'BDH_SO' }
  ]},

'to-mui-nhon': { q: 'kh_hanh_trinh', bac: 'B3', k: 'Chi hội', t: 'Tổ mũi nhọn',
  p: 'Bốn đến sáu thành viên có hướng bổ trợ nhau, gặp riêng hai tuần một lần và cùng nhận một dự án.',
  khoi: [
    { k: 'van', tu: 'TO_N' },
    { k: 'ds', tu: 'TO_DS' },
    { k: 'van', t: 'Luật *một mũi nhọn một người* áp trong chi hội, không áp trong tổ: một tổ Truyền thông có thể có sáu em, nhưng mỗi em giữ một mũi khác nhau — viết, ảnh, dựng phim, dẫn chương trình, thiết kế, phân phối. Đây là cách chi hội có đủ mũi mà không ai phải tranh sân của ai.' }
  ]},

'luat-chi-hoi': { q: 'kh_hanh_trinh', k: 'Chi hội', t: 'Mười điều luật',
  p: 'Đọc trong buổi đầu tiên của mọi thành viên mới, và nhắc lại mỗi khi có người vi phạm — nhắc luật, không nhắc tên.',
  khoi: [
    { k: 'luat', tu: 'CLB_LUAT' },
    { k: 'muc', t: 'Xử vi phạm — ba nấc' },
    { k: 'bang', cot: ['Nấc', 'Khi nào', 'Ai xử', 'Hệ quả'], hang: [
      ['Nhắc riêng', 'Vi phạm lần đầu, không cố ý', 'Đội trưởng hoặc Trưởng ban Thành viên', 'Nói riêng, không nêu trước chi hội. Ghi vào sổ, không ghi vào hồ sơ'],
      ['Nhắc trước ban', 'Lặp lại lần hai, hoặc ảnh hưởng tới người khác', 'Ban Thành viên', 'Gặp có phụ huynh. Đặt một cam kết cụ thể có thời hạn 30 ngày'],
      ['Dừng tư cách', 'Khai gian bảng số · ba lần vắng không phép · vi phạm an toàn', 'Ban Thành viên biểu quyết', 'Ra khỏi chi hội. Được quay lại sau sáu tháng nếu có đơn và có người bảo trợ']
    ]},
    { k: 'van', t: 'Một điều luật không bao giờ được thực thi thì tệ hơn là không có điều luật ấy: nó dạy cả chi hội rằng luật ở đây là thứ nói cho vui.' }
  ]},

'mo-chi-hoi': { q: 'clb_dieu_hanh', bac: 'B4', k: 'Chi hội', t: 'Mở chi hội mới và ba tầng tổ chức',
  p: 'Chi hội mở chi hội — không phải Học viện mở chi hội. Đây là cơ chế nhân bản duy nhất giữ được chuẩn, vì người đi mở đã sống trong chuẩn ấy nhiều năm.',
  khoi: [
    { k: 'ds', so: true, tu: 'CLB_MOMOI_B' },
    { k: 'van', tu: 'CLB_MOMOI_N' },
    { k: 'muc', t: 'Ba tầng tổ chức' },
    { k: 'bang', cot: ['Tầng', 'Quy mô', 'Nhịp', 'Làm gì'], tu: 'CLB_BATANG' },
    { k: 'van', t: 'Liên chi hội vùng tồn tại vì đúng một lý do: *chấm chéo*. Không có ai từ bên ngoài chấm, mọi chi hội đều tin là mình đang chạy đúng chuẩn — và sau ba năm, mười chi hội thành mười chuẩn khác nhau.' }
  ]},

'lich-nam': { q: 'clb_dieu_hanh', bac: 'B4', k: 'Chi hội', t: 'Lịch năm — năm mươi hai tuần',
  p: 'Bốn quý, mỗi quý mười ba tuần. Lịch này là lịch chung toàn quốc: chi hội không tự đổi mốc, để liên chi hội chấm chéo được và để mọi nơi cùng nhịp.',
  khoi: [
    { k: 'quy', tu: 'LICH_NAM' },
    { k: 'van', t: 'Ba mốc không được bỏ trong bất cứ hoàn cảnh nào: *bầu ban điều hành* (T1 và T26), *ngày mở cửa* (mỗi quý một lần), và *đại hội* (T52). Bỏ mốc thứ nhất thì chi hội thành sở hữu của một người; bỏ mốc thứ hai thì chi hội khép kín; bỏ mốc thứ ba thì không ai còn nhìn thấy mình thuộc về cái gì lớn hơn.' }
  ]},

/* ══════════ NHÓM 4 · THỰC TIỄN ══════════ */
'moi-truong': { q: 'chung', k: 'Nơi năng lực bị kiểm', t: 'Bốn môi trường thực tiễn',
  p: 'Chi hội là nơi RÈN. Bốn môi trường này là nơi THI. Chi hội không được tự cấp bằng chứng cho chính mình — mọi cổng bậc đều đòi bằng chứng từ ít nhất hai môi trường.',
  khoi: [
    { k: 'mt', tu: 'MOI_TRUONG' },
    { k: 'van', t: 'Từ bậc 3 trở lên, *không có bằng chứng M4 thì không qua cổng*. Đây là điều phân biệt một học sinh giỏi với một người trẻ có ích, và là điều khiến hệ thống này không trở thành một lò luyện thành tích kiểu mới.' }
  ]},

'vong-tuan': { q: 'kh_hanh_trinh', k: 'Thực tiễn', t: 'Vòng bảy ngày của một thành viên',
  p: 'Nơi bốn môi trường và chi hội khớp vào nhau thành một tuần sống được.',
  khoi: [
    { k: 'nhip2', tu: 'TUAN' },
    { k: 'van', t: 'Bảy ngày ấy là thứ biến toàn bộ kiến trúc thành đời sống thật của một đứa trẻ. *Nếu một tuần không chạy được thì ba mươi năm cũng không chạy được* — nên đây là đơn vị phải thử trước tiên, trước khi bàn tới vùng, tới quy mô, tới quốc gia.' },
    { k: 'van', t: 'Tổng thời gian hệ thống đòi của một em: khoảng *bốn tiếng rưỡi mỗi tuần* — 90 phút chi hội, 30 phút cặp đôi rèn, 30 phút hội đồng gia đình, và phần còn lại nằm trong việc em vốn đã phải làm ở lớp và ở nhà. Nếu con số phình lên quá sáu tiếng, hệ thống đang lấn sang chỗ của việc học và phải cắt bớt.' }
  ]},

'so-tay-mt': { q: 'kh_hanh_trinh', k: 'Thực tiễn', t: 'Sổ tay ba môi trường',
  p: 'M1 lớp học · M3 gia đình · M4 xã hội — làm gì cụ thể, ai xác nhận, và cái bẫy thường gặp của mỗi môi trường.',
  khoi: [{ k: 'stmt', tu: 'SO_TAY_MT' }] },

'so-tay-vai': { q: 'kh_gia_dinh', k: 'Thực tiễn', t: 'Sổ tay từng vai',
  p: 'Sáu vai chạm trực tiếp vào người học. Mỗi vai: việc hằng tuần, việc hằng tháng, những gì không được làm, và đo bằng gì.',
  khoi: [
    { k: 'stv', tu: 'SO_TAY' },
    { k: 'van', t: 'Cột *không được làm* quan trọng ngang cột việc phải làm. Phần lớn hỏng hóc trong một hệ đào tạo không đến từ việc người ta làm thiếu, mà từ việc người ta làm thêm những thứ tưởng là tốt: làm hộ, nhắc thêm, hứa thưởng, giữ ca.' }
  ]},

/* ══════════ NHÓM 5 · ĐO VÀ NGHIỆM THU ══════════ */
'bang-mau': { q: 'kh_hanh_trinh', k: 'Hệ đo', t: 'Bốn băng màu',
  p: 'Đo tình trạng một người hoặc một nhà ngay lúc này. Băng độc lập với bậc: một nhà bậc 4 vẫn có thể ở ĐỎ, một nhà bậc 1 vẫn có thể XANH.',
  khoi: [
    { k: 'mau', tu: 'BANG_MAU' },
    { k: 'van', t: 'Trộn hai trục này là lỗi thường gặp nhất khi đọc bảng số. *Bậc là năng lực tích luỹ; băng là tình trạng hiện thời.* Một người có thể mất băng XANH trong hai tuần, nhưng không mất bậc — bậc chỉ mất khi có gian dối.' },
    { k: 'van', t: 'Chuẩn chạm băng ĐỎ trong 48 giờ áp cho cả chi hội lẫn Coach. Không ai được để một người ở ĐỎ qua một cuối tuần mà không có ai gọi.' }
  ]},

'kpi': { q: 'kpi_toan_he', k: 'Hệ đo', t: 'Bảy chỉ số của hệ thống',
  p: 'Không đo số học viên đăng ký. Đo xem hệ thống có đang tự lớn lên được không.',
  khoi: [
    { k: 'bang', cot: ['Chỉ số', 'Vì sao đo', 'Đơn vị'], tu: 'KPI_HE' },
    { k: 'trich', t: 'Không nâng cấp theo thời gian; nâng theo bằng chứng năng lực.', n: 'GITA Tầng 4 · nguyên tắc gốc, giữ nguyên cho toàn bộ sáu bậc' },
    { k: 'van', t: 'Trong bảy chỉ số, *hệ số tự tái tạo* là chỉ số duy nhất quyết định tầm nhìn ba mươi năm có khả thi hay không. Dưới 1,0 nghĩa là hệ phải tuyển mới để bù hao hụt; trên 2,0 nghĩa là hệ tự lớn dù không quảng cáo thêm một đồng nào.' }
  ]},

'cong-nghiem-thu': { q: 'nghiem_thu', k: 'Hệ đo', t: 'Cổng nghiệm thu — một trăm điểm',
  p: 'Sáu cột, ngưỡng đạt 85. Người chấm không được là người dạy.',
  khoi: [
    { k: 'ds', tu: 'CONG_LUAT' },
    { k: 'diem', tu: 'CONG_BANG' },
    { k: 'muc', t: 'Quyết định sau khi chấm' },
    { k: 'bang', cot: ['Điểm', 'Quyết định'], tu: 'CONG_QUYET' },
    { k: 'van', t: 'Dưới 85 *không phải là trượt em ấy* — là chưa đủ bằng chứng. Cách nói ở buổi công bố quyết định phần lớn kết quả của chu kỳ sau: "em còn thiếu bằng chứng ở cột này" mở ra một chu kỳ; "em chưa đạt" đóng lại một đứa trẻ.' }
  ]},

'bao-cao': { q: 'nghiem_thu', k: 'Hệ đo', t: 'Bốn báo cáo',
  p: 'Tuần · tháng · quý · năm. Mỗi báo cáo có một người làm, một nơi nhận và một hạn — không có báo cáo nào "gửi cho mọi người khi nào xong".',
  khoi: [
    { k: 'bang', cot: ['Chu kỳ', 'Ai làm', 'Gửi ai', 'Hạn', 'Gồm gì'], tu: 'BAO_CAO' },
    { k: 'van', t: 'Báo cáo năm được *công bố công khai*. Một hệ thống dám công bố hệ số tự tái tạo và tỷ lệ giữ 5 năm của chính mình là hệ thống khó nói dối về chất lượng — kể cả nói dối chính mình.' }
  ]},

'bieu-mau': { q: 'kh_gia_dinh', k: 'Hệ đo', t: 'Mười bốn biểu mẫu',
  p: 'Bộ giấy tờ vận hành. Mỗi biểu mẫu có mã, có người lập, có người nhận. Đây là thứ biến chuẩn thành thói quen hằng tuần.',
  khoi: [
    { k: 'bm', tu: 'BIEU_MAU' },
    { k: 'van', t: 'Nguyên tắc thiết kế biểu mẫu ở đây: *ngắn tới mức điền được trong ba phút*. Một biểu mẫu dài mười phút sẽ được điền cho có sau tuần thứ tư, và từ đó mọi số liệu phía sau đều sai.' }
  ]},

/* ══════════ NHÓM 6 · DỮ LIỆU ══════════ */
'ma-hoa': { q: 'nghe_chung', k: 'Lớp L2', t: 'Hệ mã hoá',
  p: 'Một mã phải đọc được bằng mắt, không cần tra bảng. Đây là thứ giữ cho một kho ba mươi năm không biến thành đống tài liệu vô danh.',
  khoi: [
    { k: 'bang', cot: ['Mã mẫu', 'Là gì', 'Đọc thế nào'], tu: 'MA_HOA' },
    { k: 'the', tu: 'GHEP' }
  ]},

'ho-so-json': { q: 'qt_noi_dung', k: 'Lớp L2', t: 'Mô hình hộ chiếu nhân tài',
  p: 'Bản gốc là JSON, vì JSON là thứ đọc được sau ba mươi năm mà không cần phần mềm nào của hôm nay còn tồn tại. Mọi định dạng khác đều là bản sao phục vụ tốc độ.',
  khoi: [
    { k: 'ma', tu: 'HO_CHIEU_JSON' },
    { k: 'muc', t: 'Năm luật ghi dữ liệu' },
    { k: 'luoi', c: 2, tu: 'HO_CHIEU_LUAT' }
  ]},

'bang-luu': { q: 'qt_noi_dung', k: 'Lớp L2', t: 'Bảng lưu, đường máy chủ và quyền',
  p: 'Mười hai bảng, chín đường, mười quyền. Nối thẳng vào bảng phân quyền sẵn có của hệ thống v8 — một nguồn sự thật duy nhất cho cả hai bên.',
  khoi: [
    { k: 'bang', cot: ['Bảng', 'Cột chính', 'Ghi chú'], tu: 'BANG_LUU' },
    { k: 'muc', t: 'Giao diện máy chủ' },
    { k: 'bang', cot: ['Đường', 'Làm gì'], tu: 'API' },
    { k: 'muc', t: 'Quyền mới cần thêm' },
    { k: 'bang', cot: ['Mã quyền', 'Cho phép', 'Ai có'], tu: 'QUYEN' },
    { k: 'van', t: 'Quyền *gv_cong_cham* có một luật riêng: hệ thống phải từ chối khi người chấm trùng với người dạy chính ca đó. Không dựa vào người dùng tự giữ ranh giới — máy chủ chặn.' }
  ]},

'cong-nghe': { q: 'qt_noi_dung', k: 'Lớp L2', t: 'Lộ trình công nghệ và ba tầng lưu',
  p: 'Ba chặng, mỗi chặng có một điều kiện bắt buộc không được bỏ qua để sang chặng sau.',
  khoi: [
    { k: 'bang', cot: ['Chặng', 'Làm gì', 'Được', 'Hạn', 'Điều kiện bắt buộc'], tu: 'CONG_NGHE' },
    { k: 'muc', t: 'Ba tầng lưu trữ' },
    { k: 'luoi', c: 3, tu: 'LUU_BA_TANG' }
  ]},

'nguyen-tac-kt': { q: 'qt_noi_dung', k: 'Lớp L2', t: 'Bảy nguyên tắc dựng phần mềm',
  p: 'Cho một hệ phải chạy ba mươi năm, đổi người viết ít nhất ba lần.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'NGUYEN_TAC_KT' },
    { k: 'van', t: 'Cả bảy nguyên tắc đều đã được kiểm chứng trên chính hệ thống GITA 365 v8 — kể cả nguyên tắc về số bản, vốn ra đời từ một lần chủ Học viện mở nhầm tệp cũ và tưởng phần sửa chưa chạy.' }
  ]},

/* ══════════ NHÓM 7 · VẬN HÀNH ══════════ */
'vai-tro': { q: 'chung', k: 'Lớp L4', t: 'Hai mươi vai',
  p: 'Mười lăm vai của hệ thống hiện tại giữ nguyên. Năm vai mới thuộc phần mà một hệ huấn luyện nhân tài cần mà hệ xử lý ca không cần.',
  khoi: [
    { k: 'vai', tu: 'VAI' },
    { k: 'van', t: 'Vai *Mentor học viên (bậc 5)* là vai quan trọng nhất trong năm vai mới: nó là cửa duy nhất để sản phẩm của hệ trở thành lực lượng của hệ. Không có vai này, hệ số tự tái tạo vĩnh viễn bằng không.' }
  ]},

'tai-chinh': { q: 'tai_chinh', k: 'Lớp L4', t: 'Tài chính và Quỹ Nhân tài',
  p: 'Một luật không thương lượng, bốn dòng tiền, và năm phần trăm trích cố định.',
  khoi: [
    { k: 'luat1', tu: 'TC_LUAT' },
    { k: 'bang', cot: ['Dòng tiền', 'Vai trò trong hệ', 'Tỷ trọng mục tiêu'], tu: 'TC_DONG' },
    { k: 'the', tu: 'TC_QUY' },
    { k: 'van', t: 'Ngưỡng cảnh báo: không dòng nào vượt *70% doanh thu*. Vượt hai quý liên tiếp thì kế hoạch năm sau bắt buộc phải có dòng thứ hai — chi tiết ở màn Bảy rủi ro.' }
  ]},

'an-toan': { q: 'chung', k: 'Lớp L6', t: 'An toàn và đạo đức',
  p: 'Phần này không được rút gọn cho vừa trang. Một hệ thống làm việc với trẻ em mà phần này mỏng thì mọi phần khác đều không có giá trị.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'AT_LUAT' },
    { k: 'muc', t: 'Dấu hiệu phải chuyển tuyến trong 24 giờ' },
    { k: 'canh', tu: 'AT_DAU' },
    { k: 'muc', t: 'Quy trình khi gặp dấu hiệu' },
    { k: 'ds', so: true, tu: 'AT_QUY' },
    { k: 'van', t: 'Gen Việt là hệ huấn luyện phát triển, *không phải nơi trị liệu tâm lý*. Giữ một ca vượt ranh giới chuyên môn vì tiếc doanh thu hoặc vì tin mình xử lý được là sai lầm nghiêm trọng nhất mà một Coach có thể mắc.' }
  ]},

'rui-ro': { q: 'dh_toan_he', k: 'Lớp L6', t: 'Bảy rủi ro và phanh',
  p: 'Một tầm nhìn ba mươi năm không chết vì thiếu ý tưởng. Nó chết vì bảy thứ dưới đây, và mỗi thứ chỉ dừng được bằng một cái phanh cụ thể, đặt sẵn từ trước.',
  khoi: [{ k: 'rui', tu: 'RUI_RO' }] },

/* ══════════ NHÓM 8 · TRIỂN KHAI ══════════ */
'ngay-90': { q: 'dh_toan_he', k: 'Làm ngay', t: 'Chín mươi ngày đầu tiên',
  p: 'Không phần nào cần thêm người, thêm tiền hay thêm phần mềm. Toàn bộ chạy được bằng đội ngũ và hệ thống hiện có.',
  khoi: [
    { k: 'bang', cot: ['Mốc', 'Việc', 'Ai', 'Đầu ra'], tu: 'NGAY_90' },
    { k: 'van', t: 'Thứ tự là *bắt buộc*. Đánh mã kho trước khi khoá bảng chuẩn thì phải đánh lại lần hai; xếp bậc trước khi có cổng mẫu thì mỗi Coach xếp một kiểu, và bản đồ bậc đầu tiên của cả hệ sẽ sai ngay từ ngày lập ra.' }
  ]},

'nam-dau': { q: 'dh_toan_he', k: 'Triển khai', t: 'Năm đầu tiên — bốn quý',
  p: 'Mỗi quý một đích, có số. Cuối năm phải có hai chi hội, không phải hai mươi — nhân bản đúng quan trọng hơn nhân bản nhanh.',
  khoi: [
    { k: 'nam', tu: 'NAM_DAU' },
    { k: 'van', t: 'Quý 2 là quý quyết định: một chi hội chạy đúng kịch bản mười hai tuần liền và được quay lại toàn bộ. *Mười hai buổi ấy trở thành tài liệu đào tạo tốt hơn bất cứ thứ gì viết ra trên giấy* — và là thứ chi hội thứ hai sẽ học theo.' }
  ]},

'ba-muoi-nam': { q: 'chung', k: 'Tầm nhìn', t: 'Ba mươi năm, sáu chặng',
  p: 'Mỗi chặng có một câu hỏi trung tâm và một cổng. Không qua cổng thì không sang chặng sau — kể cả khi lịch đã tới.',
  khoi: [
    { k: 'chang', tu: 'CHANG' },
    { k: 'van', t: 'Ba lần chuyển giao thế hệ người dẫn nằm ở chặng 2, chặng 4 và chặng 6. *Lần đầu phải bắt đầu ở chặng 2, không phải chặng 6.* Một tổ chức bắt đầu nghĩ về kế thừa khi người sáng lập sắp nghỉ là một tổ chức đã muộn mười lăm năm.' }
  ]},

/* ══════════ NHÓM 3 · KHO CHUYÊN MÔN ══════════ */
'ma-tran': { q: 'nghe_chung', k: 'Lớp L2', t: 'Ma trận 8 × 8 — đọc một ca',
  p: 'Mỗi ca phải được đọc qua đủ tám lớp, và mỗi lớp phải đi qua đủ bốn cửa G–I–T–A. Ma trận này buộc mọi người vận hành nhìn một ca theo cùng một trình tự.',
  khoi: [
    { k: 'bang', cot: ['Lớp', 'G — Mục tiêu', 'I — Nội lực', 'T — Năng lực', 'A — Hành động và môi trường', 'Dữ liệu cần đọc', 'Vai Coach', 'Đầu ra'], tu: 'MA_TRAN' },
    { k: 'van', t: 'Ma trận tránh ba sai lầm thường gặp: *thấy biểu hiện rồi kết luận nguyên nhân* · *thấy vấn đề rồi lập tức chọn giải pháp* · *chỉ nhìn học viên mà bỏ qua mục tiêu, nội lực, năng lực và môi trường đang tương tác với nhau*.' },
    { k: 'van', t: 'Không ca nào cũng phải đi tới lớp thứ tám. Bậc càng cao thì càng được đọc sâu và càng bị đòi bằng chứng cao hơn — nhưng *logic đọc thì giữ nguyên ở mọi bậc*, chỉ đổi độ sâu dữ liệu và quyền ra quyết định chuyên môn.' }
  ]},

'muoi-buoc': { q: 'nghe_chung', k: 'Lớp L2', t: 'Quy trình mười bước xử lý một ca',
  p: 'Cố định, không đảo thứ tự. Mỗi lần một Coach bỏ qua một bước là một lần hệ thống mất khả năng truy lại vì sao ca ấy thành hay bại.',
  khoi: [
    { k: 'buocso', tu: 'MUOI_BUOC' },
    { k: 'van', t: 'Bước 1 là bước bị bỏ qua nhiều nhất và tốn kém nhất khi bỏ qua. Cả một phác đồ dựng trên chữ *"lười"* sẽ sai từ gốc, vì "lười" không phải một hành vi — nó là một kết luận về con người.' }
  ]},

'nhom-giai-phap': { q: 'nghe_chung', k: 'Lớp L2', t: 'Mười một nhóm giải pháp',
  p: 'Kế thừa nguyên vẹn từ Hệ thống giải pháp GITA 365. Mỗi nhóm được nối vào trục năng lực Gen Việt tương ứng, và mỗi nhóm có một sai lầm đặc trưng đáng ghi ra.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'NHOM_GP' },
    { k: 'van', t: 'Một ca không dùng cả mười một nhóm. Nhóm *13.7 — giải pháp dành cho phụ huynh* là nhóm bị bỏ qua nhiều nhất và có đòn bẩy lớn nhất: rất nhiều ca không đổi được vì đang chữa một đứa trẻ bên trong một vòng lặp gia đình không đổi.' }
  ]},

'chien-luoc': { q: 'nghe_chung', k: 'Lớp L2', t: 'Thư viện một trăm chiến lược',
  p: 'Mười nhóm × mười chiến lược. Bản đầy đủ trong kho nghề có tám trường mỗi chiến lược; bảng dưới đây rút gọn còn bốn để nhìn được toàn cảnh.',
  khoi: [
    { k: 'the', tu: 'CHON_CL' },
    { k: 'cl', tu: 'CHIEN_LUOC' }
  ]},

'ho-tro': { q: 'nghe_chung', k: 'Lớp L2', t: 'Thang mức hỗ trợ và cơ chế xử lý tự động',
  p: 'Mức hỗ trợ là chỉ số quan trọng nhất của cả hệ — nó đo đúng thứ mà nguyên lý số 2 đòi hỏi: mọi can thiệp đều nhắm tới việc tự xoá mình.',
  khoi: [
    { k: 'bang', cot: ['Mức', 'Trạng thái', 'Trông như thế nào'], tu: 'THANG_HT' },
    { k: 'van', tu: 'THANG_HT_LUAT' },
    { k: 'muc', t: 'Cơ chế xử lý tự động theo KPI' },
    { k: 'van', t: 'Một hệ quy mô lớn không thể phụ thuộc vào trí nhớ từng Coach. Tám tín hiệu dưới đây *tự kích hoạt* một hành động, không chờ ai nhớ ra.' },
    { k: 'bang', cot: ['Tín hiệu', 'Mức', 'Hệ thống làm gì', 'Học viên', 'Phụ huynh', 'Coach'], tu: 'TU_DONG' },
    { k: 'van', t: 'Dòng cuối cùng — *vượt phạm vi chuyên môn* — là dòng duy nhất trong toàn bộ hệ thống không có chỗ cho phán đoán cá nhân. Gặp là chuyển, trong 24 giờ.' }
  ]},

/* ══════════ NHÓM 6 · NGÔN NGỮ VÀ VĂN HOÁ ══════════ */
'ngon-ngu': { q: 'kh_gia_dinh', k: 'Lớp L5', t: 'Bảng thay vì',
  p: 'Ngôn ngữ là công cụ can thiệp rẻ nhất và mạnh nhất của hệ. Bảng này dán ở phòng Coach và gửi cho mọi phụ huynh trong tuần đầu tiên.',
  khoi: [
    { k: 'bang', cot: ['Thay vì', 'Hãy nói', 'Vì sao'], tu: 'NGON_NGU' },
    { k: 'van', tu: 'NGON_NGU_LUAT' },
    { k: 'van', t: 'Đổi được bảng này trong một gia đình thường tạo ra chuyển động lớn hơn bất cứ kỹ thuật học tập nào — và nó *không tốn một đồng nào*.' }
  ]},

'nghi-le': { q: 'kh_hanh_trinh', k: 'Lớp L5', t: 'Nghi lễ và biểu tượng',
  p: 'Bảy nghi thức. Chúng trông như hình thức cho tới khi bị bỏ đi — lúc ấy mới thấy chúng đang giữ thứ gì.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'NGHI_LE' },
    { k: 'van', t: 'Một cộng đồng không có nghi lễ là một danh sách người quen. *Nghi lễ là thứ biến một nhóm thành một nơi để thuộc về* — và "thuộc về" là lý do người ta ở lại mười năm, không phải chất lượng bài giảng.' }
  ]},

'ghi-nhan': { q: 'kh_hanh_trinh', k: 'Lớp L5', t: 'Hệ ghi nhận',
  p: 'Mười cấp, gắn với việc làm được chứ không gắn với tiền hay quà. Bốn luật dưới đây quan trọng hơn cả mười cấp.',
  khoi: [
    { k: 'ds', so: true, tu: 'GHI_NHAN_LUAT' },
    { k: 'muc', t: 'Mười cấp ghi nhận' },
    { k: 'bang', cot: ['Cấp', 'Tên', 'Điều kiện', 'Biểu tượng'], tu: 'GHI_NHAN_CAP' },
    { k: 'van', t: 'Cấp 10 — *Người rèn người* — là cấp cao nhất, và nó không đo thành tích của em ấy mà đo *thành tích của người em ấy kèm*. Toàn bộ hệ ghi nhận được thiết kế để chỉ về đúng chỗ này.' }
  ]},

'wow': { q: 'nghe_chung', k: 'Lớp L5', t: 'Chuỗi WOW — chín điểm chạm',
  p: 'Chín khoảnh khắc quyết định một gia đình ở lại hay rời đi. Mỗi điểm chạm có một người chịu trách nhiệm — không có điểm chạm nào "của cả đội", vì thứ của cả đội là thứ không ai làm.',
  khoi: [
    { k: 'buocso', tu: 'WOW' },
    { k: 'van', t: 'Điểm chạm số 4 — *ngày thứ bảy* — là điểm rẻ nhất và quyết định nhất. Một thay đổi nhỏ nhưng thật, đo được, trong bảy ngày là thứ kéo được cả một gia đình đã mất niềm tin quay lại.' }
  ]},

/* ══════════ NHÓM 8 · TƯ VẤN VÀ ĐƯỜNG VÀO ══════════ */
'duong-vao': { q: 'tu_van', k: 'Lớp L4', t: 'Đường vào — sáu bước',
  p: 'Không bước nào được bỏ, không bước nào được đảo. Bán gói trước khi có dữ liệu là cách chắc chắn nhất để ba tháng sau cả hai bên cùng thất vọng.',
  khoi: [
    { k: 'buocso', tu: 'DUONG_VAO' },
    { k: 'van', t: 'Bước 6 kết thúc bằng *quyết định của gia đình*, không phải quyết định của tư vấn. Một gia đình dừng lại sau bảy ngày trong sự tôn trọng sẽ quay lại sau một năm; một gia đình bị ép ký sẽ không bao giờ quay lại và sẽ kể lại chuyện ấy cho mười nhà khác.' }
  ]},

'mach-tu-van': { q: 'tu_van', k: 'Lớp L4', t: 'Mạch tư vấn theo nhu cầu',
  p: 'Tư vấn không bắt đầu bằng câu hỏi "anh chị muốn đăng ký gói nào". Nó bắt đầu bằng mức độ rõ của vấn đề, mức độ ảnh hưởng, mức độ sẵn sàng và kỳ vọng phát triển.',
  khoi: [
    { k: 'bang', cot: ['Nhu cầu', 'Dấu hiệu', 'Câu hỏi tư vấn', 'Tầng và bậc', 'Giá trị chính'], tu: 'MACH_TU_VAN' },
    { k: 'van', t: 'Bảng này cũng là bảng *chống bán vượt*: một nhà thuộc dòng đầu tiên mà được bán T4 thì ba tháng sau sẽ không thấy gì đổi, vì họ đang trả tiền cho một tầng giải quyết câu hỏi mà họ chưa đặt ra.' }
  ]},

'buoi-dau': { q: 'tu_van', k: 'Lớp L4', t: 'Buổi tư vấn đầu tiên — 60 phút',
  p: 'Sáu mục. Mục quan trọng nhất là mục thứ tư: khoảnh khắc mọi tính từ được dịch thành hành vi quan sát được, ngay trước mặt gia đình.',
  khoi: [
    { k: 'lich', tu: 'BUOI_DAU' },
    { k: 'van', t: 'Câu mở đầu *"hôm nay mình chưa bàn tới gói nào cả"* hạ toàn bộ hàng phòng thủ của một gia đình đã đi qua vài trung tâm. Nói câu ấy thì phải giữ đúng — nói rồi vẫn chốt hợp đồng trong buổi là mất uy tín vĩnh viễn.' }
  ]},

'chan-dung': { q: 'tu_van', k: 'Lớp L4', t: 'Bốn chân dung gia đình',
  p: 'Bốn nhóm đến với Học viện vì bốn lý do khác nhau, cần bốn cách đi khác nhau, và có bốn cái bẫy khác nhau.',
  khoi: [
    { k: 'cd4', tu: 'CHAN_DUNG' },
    { k: 'van', t: 'Nhận sai chân dung là nguồn gốc của phần lớn ca hỏng trong sáu tháng đầu — không phải vì Coach kém, mà vì cả hệ đang chữa một thứ mà gia đình ấy không đến để chữa.' }
  ]},

'dai-su': { q: 'chung', k: 'Lớp L5', t: 'Hệ đại sứ',
  p: 'Cửa vào chính của Gen Việt là người thật kể chuyện thật. Bốn cấp, và sáu luật giữ cho cửa ấy không biến thành một kênh bán hàng.',
  khoi: [
    { k: 'bang', cot: ['Cấp', 'Điều kiện', 'Được gì'], tu: 'DAI_SU_DS' },
    { k: 'muc', t: 'Sáu luật giới thiệu' },
    { k: 'luat', tu: 'DAI_SU_LUAT' },
    { k: 'van', t: 'Trần hoa hồng *10%, không ngoại lệ* là thứ giữ cho hệ đại sứ còn là một cộng đồng chứ không thành một mạng lưới bán hàng. Ngày nào một người giới thiệu vì tiền nhiều hơn vì tin, ngày ấy chất lượng đầu vào bắt đầu rơi.' }
  ]},

/* ══════════ NHÓM 9 · ĐỘI NGŨ ══════════ */
'nghe-coach': { q: 'nghe_quan_ly', k: 'Lớp L4', t: 'Lộ trình nghề Coach',
  p: 'Sáu bậc nghề. Lên bậc theo bằng chứng — cùng một nguyên lý áp cho học viên thì cũng áp cho người dạy.',
  khoi: [
    { k: 'bang', cot: ['Bậc nghề', 'Thời gian', 'Làm gì', 'Điều kiện lên', 'Bằng chứng'], tu: 'NGHE_COACH' },
    { k: 'van', t: 'Từ *Trưởng nhóm Coach* trở lên, thước đo đổi hẳn: không còn đo chất lượng ca của riêng mình nữa mà đo *chất lượng của những Coach mình tạo ra*. Đây đúng là điểm gập ở bậc 5 của học viên, lặp lại một lần nữa trong đội ngũ.' }
  ]},

'bay-nang-luc': { q: 'nghe_chung', k: 'Lớp L1', t: 'Bảy năng lực nghề',
  p: 'K1 tới K7. Mỗi năng lực có một cách kiểm cụ thể — không có năng lực nào được xác nhận bằng cảm nhận của người quản lý.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'BAY_NL' },
    { k: 'van', t: '*K7 — chuyển giao và giảm hỗ trợ* — là năng lực khó nhất và là năng lực phân biệt một Coach giỏi với một người dạy giỏi. Nó cũng là năng lực duy nhất chỉ đo được sau mười hai tháng, nên rất dễ bị bỏ qua trong đánh giá hằng quý.' }
  ]},

'tuyen': { q: 'dh_toan_he', k: 'Lớp L4', t: 'Tuyển và thử việc',
  p: 'Chín mươi ngày thử việc, ba mốc, và một cổng. Tuyển sai một Coach tốn nhiều hơn để trống một vị trí.',
  khoi: [
    { k: 'muc', t: 'Tìm người thế nào' },
    { k: 'ds', tu: 'TUYEN_TIM' },
    { k: 'muc', t: 'Tránh người thế nào' },
    { k: 'ds', tu: 'TUYEN_TRANH' },
    { k: 'muc', t: 'Chín mươi ngày thử việc' },
    { k: 'nhip2', tu: 'TUYEN_THU' },
    { k: 'van', t: 'Dấu hiệu đáng lo nhất trong một buổi phỏng vấn: *có sẵn một giải pháp cho mọi ca ngay khi vừa nghe mô tả*. Người ấy sẽ không bao giờ đi qua lớp thứ ba của ma trận 8 × 8.' }
  ]},

'du-gio': { q: 'nghe_quan_ly', k: 'Lớp L4', t: 'Chuẩn dự giờ',
  p: 'Bảy cột, hai mươi điểm, ngưỡng đạt 16. Dự giờ chấm buổi kèm, không chấm con người.',
  khoi: [
    { k: 'diem', tu: 'DU_GIO', nguong: '16/20' },
    { k: 'van', tu: 'DU_GIO_LUAT' },
    { k: 'van', t: 'Cột nặng nhất là *chuyển quyền*: học viên phải là người nói ra bước tiếp theo. Một buổi kèm hay tới đâu mà Coach nói ra bước tiếp theo thì buổi ấy đã dạy sai điều quan trọng nhất.' }
  ]},


'pham-vi': { q: 'chung', k: 'Tài khoản', t: 'Phạm vi của tôi',
  p: 'Vai đang chọn mở được những gì, còn gì chưa mở, và vì sao chưa mở. Đổi vai ở góc trên bên phải để xem hệ thống nhìn từ chỗ người khác.',
  khoi: [
    { k: 'phamvi' },
    { k: 'van', t: 'Bảng này là bản đối chiếu, không phải hàng rào. *Ẩn hiện ở trình duyệt chỉ để giao diện đúng vai.* Hàng rào thật nằm ở máy chủ và ở chỗ bản phát hành cho vai thấp không được đóng gói phần nội dung vai ấy không có quyền.' }
  ]},

'phan-quyen': { q: 'qt_trang', k: 'Lớp L4 · quản trị', t: 'Bảng phân quyền',
  p: 'Mười bảy vai, mười ba tầng hiển thị, và hai trục quyết định: bậc của vai, và bậc năng lực của học viên. Kế thừa nguyên tắc phân quyền của GITA 365 v8.',
  khoi: [
    { k: 'muc', t: 'Mười bảy vai — bậc càng nhỏ càng nhiều quyền' },
    { k: 'bang', cot: ['Mã', 'Bậc', 'Vai', 'Làm gì'], tu: 'VAI_BANG' },
    { k: 'muc', t: 'Mười ba tầng hiển thị' },
    { k: 'van', t: 'Mỗi màn thuộc đúng *một* tầng. Muốn đổi phạm vi một màn thì đổi tầng của nó ở một chỗ, không sửa rải rác từng nơi.' },
    { k: 'bang', cot: ['Tầng', 'Mở tới bậc', 'Nghĩa là gì'], tu: 'QUYEN_BANG' },
    { k: 'muc', t: 'Trục thứ hai — bậc năng lực của học viên' },
    { k: 'van', t: 'Đây là chỗ kiến trúc sáu bậc gặp bảng phân quyền. Học viên lên bậc thì mở thêm tầng nội dung, và tới *bậc 5 — khi em trở thành Mentor — kho nghề mở ra*. Quyền đi theo trách nhiệm, không đi theo tuổi.' },
    { k: 'bang', cot: ['Bậc', 'Tên', 'Bậc quyền · % số màn', 'Mở thêm gì'], tu: 'BAC_MO_BANG' },
    { k: 'muc', t: 'Ghi đè — chỗ bậc không nói được' },
    { k: 'bang', cot: ['Vai', 'Cấp thêm', 'Thu lại'], tu: 'GHI_DE_BANG' },
    { k: 'van', t: 'Thứ tự quyết định cố ý đặt *cấm sau cho*, để cấm luôn thắng. Admin sản phẩm đứng ở bậc 5 để giữ kho, nhưng bị thu lại quyền nhìn tiền, quyền điều hành toàn hệ và quyền nghiệm thu — bậc không nói được điều đó, nên phải ghi đè.' },
    { k: 'muc', t: 'Tỉ lệ hiển thị mong muốn' },
    { k: 'van', t: 'Bộ kiểm phát hành đối chiếu bảng này với số đếm thật. *Lệch quá ba điểm là dừng phát hành* — vì lệch nghĩa là có màn bị gắn nhầm tầng.' },
    { k: 'bang', cot: ['Vai', '% số màn mở được', 'Ghi chú'], tu: 'TY_LE_BANG' },
    { k: 'muc', t: 'Sáu luật phân quyền' },
    { k: 'luat', tu: 'LUAT_QUYEN' }
  ]},



/* ══════════ NHÓM 13 · THƯ VIỆN GEN VIỆT ══════════ */
'thu-vien': { q: 'chung', k: 'Lớp L2 · kho', t: 'Bộ sách Gen Việt',
  p: 'Sáu quyển về những người mang bộ gen Việt xuất sắc nhất — danh tướng, nhà kiến quốc, hiền tài, nhà khoa học, người làm nên văn hiến. Bốn mươi lăm chân dung, mười hai mô thức tư duy rút ra từ họ.',
  khoi: [
    { k: 'so', ds: [{ b: '6', t: 'quyển' }, { b: '45', t: 'chân dung' }, { b: '12', t: 'mô thức tư duy' },
                    { b: '7', t: 'nguyên tắc biên soạn' }] },
    { k: 'van', t: 'Đây *không phải* một danh sách tấm gương. Mỗi chân dung phải trả lời được bốn câu: người ấy đứng trước quyết định gì · chọn thế nào · mô thức rút ra là gì · và tuần này học viên làm được việc gì từ đó. Chân dung nào không trả lời được cả bốn thì chưa vào sách.' },
    { k: 'muc', t: 'Bảy nguyên tắc biên soạn' },
    { k: 'luoi', c: 2, tu: 'TV_NGUYEN_TAC' },
    { k: 'muc', t: 'Sáu quyển' },
    { k: 'quyen', tu: 'TV_QUYEN' },
    { k: 'muc', t: 'Bảng phẩm chất — chân dung nào nuôi phẩm chất nào' },
    { k: 'bang', cot: ['Phẩm chất', 'Chân dung', 'Câu hỏi để cả chi hội cùng nghĩ'], tu: 'TV_PC_BANG' },
    { k: 'muc', t: 'Nguồn và cách tra' },
    { k: 'bang', cot: ['Loại nguồn', 'Cụ thể'], tu: 'TV_NGUON' }
  ]},

'q1-giu-nuoc': { q: 'chung', k: 'Quyển 1', t: 'Giữ nước',
  p: 'Nghệ thuật quân sự Việt Nam gần như luôn là bài toán của bên yếu hơn. Chính vì thế nó là kho tàng về cách chọn nơi, chọn lúc, chọn đòn bẩy — thứ dùng được cho mọi bài toán mà nguồn lực không đủ.',
  khoi: [{ k: 'nhanvat', tu: 'TV_Q1' }] },

'q2-dung-nuoc': { q: 'chung', k: 'Quyển 2', t: 'Dựng nước',
  p: 'Từ Chiếu dời đô tới bộ luật Hồng Đức: những người hiểu rằng một quyết định đúng chưa đủ, phải dựng được thể chế để cái đúng ấy tự chạy khi mình không còn.',
  khoi: [{ k: 'nhanvat', tu: 'TV_Q2' }] },

'q3-hien-tai': { q: 'chung', k: 'Quyển 3', t: 'Hiền tài',
  p: 'Người từ quan đi dạy học, người dâng điều trần không được nghe, người mù vẫn mở trường. Quyển khó nhất và cần nhất, vì phần lớn đời người ta ở trong hoàn cảnh ấy.',
  khoi: [{ k: 'nhanvat', tu: 'TV_Q3' }] },

'q4-khoa-hoc': { q: 'chung', k: 'Quyển 4', t: 'Trí tuệ khoa học',
  p: 'Từ "Nam dược trị Nam nhân" tới bổ đề cơ bản. Điểm chung: không chờ điều kiện đủ mới bắt đầu, và không sao chép nguyên xi lời giải của nơi khác.',
  khoi: [{ k: 'nhanvat', tu: 'TV_Q4' }] },

'q5-van-hien': { q: 'chung', k: 'Quyển 5', t: 'Văn hiến',
  p: 'Chữ nghĩa, âm nhạc, tiếng nói. Thứ mềm nhất lại là thứ sống lâu nhất — và là thứ làm nên phần "Việt" trong bộ gen Việt.',
  khoi: [{ k: 'nhanvat', tu: 'TV_Q5' }] },

'q6-duong-thoi': { q: 'chung', k: 'Quyển 6', t: 'Người đương thời',
  p: 'Quyển viết theo luật riêng: không dựng tượng người đang sống. Ghi việc, ghi chân dung tập thể, và để ngỏ chỗ cho chính học viên viết tiếp.',
  khoi: [
    { k: 'nhanvat', tu: 'TV_Q6' },
    { k: 'van', t: 'Chân dung cuối cùng là *một trang để trống*. Một bộ sách chỉ sống nếu người đọc trở thành người viết — và đây là chỗ Thư viện Gen Việt nối vào bậc 5, khi em bắt đầu tạo ra thứ người khác dùng được.' }
  ]},

'mo-thuc-viet': { q: 'kh_hanh_trinh', k: 'Rút ra', t: 'Mười hai mô thức tư duy Việt',
  p: 'Phần dùng được hằng tuần. Bốn mươi lăm chân dung phía trước là bằng chứng cho mười hai dòng này.',
  khoi: [
    { k: 'mothuc', tu: 'TV_MO_THUC' },
    { k: 'van', t: 'Mười hai mô thức này *không thay thế* 100 chiến lược trong kho nghề — chúng đứng ở tầng cao hơn. Chiến lược trả lời "làm thế nào"; mô thức trả lời "nghĩ theo hướng nào". Một Coach giỏi dùng cả hai: mô thức để chọn hướng, chiến lược để đi.' }
  ]},

'dung-thu-vien': { q: 'kh_gia_dinh', k: 'Cách dùng', t: 'Đưa bộ sách vào nhịp tuần',
  p: 'Một bộ sách để trên giá là một bộ sách chết. Sáu chỗ dưới đây là nơi nó chạm vào đời sống thật của chi hội, của trại và của gia đình.',
  khoi: [
    { k: 'bang', cot: ['Ở đâu', 'Nhịp', 'Làm thế nào', 'Kiểm bằng gì'], tu: 'TV_CACH_DUNG' },
    { k: 'van', t: 'Cách kể quyết định phần lớn kết quả. *Ba phút kể quyết định then chốt, hai phút rút mô thức, hai phút giao việc* — không kể tiểu sử. Một chân dung kể thành mười phút tiểu sử là một chân dung bị lãng phí.' },
    { k: 'van', t: 'Và một điều phải giữ: đọc xong mỗi chân dung, *câu hỏi phản biện là bắt buộc*. Bộ sách này nuôi lòng tự trọng, không nuôi lòng tự tôn — mà lòng tự trọng thì phải chịu được câu hỏi.' }
  ]},

'nguon': { q: 'chung', k: 'Nguồn', t: 'Tài liệu đã dùng',
  p: 'Phần chuyên môn rút trọn vẹn từ kho tài liệu sẵn có của Học viện. Thứ duy nhất mượn từ bên ngoài là khung tổ chức chi hội của BNI — mượn cấu trúc vận hành, không mượn động cơ kinh tế.',
  khoi: [
    { k: 'bang', cot: ['Tài liệu', 'Phần được dùng'], tu: 'NGUON' },
    { k: 'the', t: 'Phần chưa đọc được',
      n: 'Thư mục Drive 1m9VQM4bWzS67kRdUehUernmw49wFsWkU (đường dẫn /u/2/) không mở được bằng tài khoản đang kết nối. Nếu thư mục ấy chứa tài liệu khác với danh sách trên, cần chia sẻ lại để bổ sung vào bản thiết kế.' }
  ]}
,

/* ══════════ NHÓM 14 · TRẢI NGHIỆM VÀ CAM KẾT ══════════ */
'hanh-trinh-365': { q: 'nghe_chung', k: 'Trải nghiệm', t: 'Hành trình 365 ngày của một gia đình',
  p: 'Không phải phễu bán hàng. Đây là bản đồ cảm xúc: ở mỗi chặng phụ huynh đang nghĩ gì, sợ gì, và hệ đặt cái gì vào tay họ.',
  khoi: [
    { k: 'van', t: 'Kiến trúc trả lời câu hỏi *hệ này là gì*. Màn này trả lời một câu khác, khó hơn: đứng từ phía gia đình nhìn vào, hệ này *cảm thấy* như thế nào.' },
    { k: 'trich', t: 'Người ta quên điều mình nói, quên điều mình làm, nhưng không quên cảm giác mình gây ra cho họ.', n: 'Nguyên tắc nền của chương này' },
    { k: 'van', t: 'Mỗi chặng có một mục *dấu hiệu đang rơi* và một *việc cứu*. Đó là phần giá trị nhất: biết trước chỗ người ta hay rời đi thì mới giữ được, và giữ bằng việc đúng chứ không bằng lời hay.' },
    { k: 'hanhtrinh', tu: 'TN_HANH_TRINH' },
    { k: 'muc', t: 'Ba điều xuyên suốt chín chặng' },
    { k: 'luat', tu: 'TN_XUYEN_SUOT' }
  ]},

'khoanh-khac': { q: 'nghe_chung', k: 'Trải nghiệm', t: 'Mười hai khoảnh khắc quyết định',
  p: 'Cảm nhận của cả một năm được quyết định ở khoảng mười hai điểm. Làm đúng mười hai điểm này thì phần còn lại được tha thứ; làm sai thì phần còn lại không cứu nổi.',
  khoi: [
    { k: 'van', t: 'Không phải mọi phút đều nặng như nhau. Một cuộc gọi lại trong bốn giờ đáng giá hơn ba buổi dạy hay. Cột *thường thấy* không phải để chê ai — nó là mặc định mà mọi tổ chức trôi về nếu không ai giữ.' },
    { k: 'doichieu', tu: 'TN_KHOANH_KHAC' },
    { k: 'trich', t: 'Chuẩn không nằm ở điều mình viết ra. Chuẩn nằm ở điều mình làm lúc mệt, lúc vội, lúc không ai nhìn.', n: 'Luật của mười hai khoảnh khắc' }
  ]},

'cam-ket-dv': { q: 'kh_hanh_trinh', k: 'Cam kết', t: 'Mười hai cam kết dịch vụ',
  p: 'Hứa ít mà giữ được. Và điều làm nên khác biệt không phải lời hứa — mà là thứ đền khi không giữ được, đền tự động, không đợi gia đình đòi.',
  khoi: [
    { k: 'van', t: 'Một lời hứa không có thứ để đền thì chỉ là một câu quảng cáo. Bảng dưới đây là hợp đồng thật: mỗi dòng có *ngưỡng đo được* và *thứ phải đền*. Không có dòng nào ghi “sẽ cố gắng”.' },
    { k: 'hua', tu: 'TN_CAM_KET' },
    { k: 'trich', t: 'Người ta không nhớ mình đúng bao nhiêu lần. Người ta nhớ cách mình xử lúc mình sai.', n: 'Vì sao cột cuối cùng là cột quan trọng nhất' }
  ]},

'cong-phu-huynh': { q: 'kh_gia_dinh', k: 'Cam kết', t: 'Cổng phụ huynh — thấy gì, ở đâu, khi nào',
  p: 'Phụ huynh không cần biết mọi thứ. Họ cần biết bảy thứ, đúng lúc, và không phải đi hỏi.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'TN_CONG_PH' },
    { k: 'muc', t: 'Sáu luật của cổng' },
    { k: 'luat', tu: 'TN_LUAT_PH' },
    { k: 'trich', t: 'Thứ gì Coach không dám cho phụ huynh đọc thì không được ghi vào hồ sơ.', n: 'Luật thứ sáu — và là luật khó giữ nhất' }
  ]},

'hien-vat': { q: 'nghe_chung', k: 'Trải nghiệm', t: 'Mười bốn hiện vật, và cách trao',
  p: 'Giá vốn mỗi thứ vài chục nghìn. Giá trị cảm xúc gấp trăm lần — nhưng chỉ khi trao đúng cách.',
  khoi: [
    { k: 'van', t: 'Phát hàng loạt cuối buổi là cách chắc chắn nhất để giết một hiện vật. Cột *cách trao* quan trọng hơn cột *là gì*: cùng một tấm huy hiệu, gài lên áo trước mặt cả tổ và đưa vào tay ở bàn lễ tân là hai vật khác nhau.' },
    { k: 'bang', cot: ['Hiện vật', 'Trao khi nào', 'Ai trao', 'Trao thế nào', 'Vì sao quan trọng'], tu: 'TN_HIEN_VAT_BANG' },
    { k: 'trich', t: 'Thứ mình tự làm thì mình giữ. Thứ được phát thì để đâu quên đó.', n: 'Vì sao cờ tổ mũi nhọn do tổ tự làm' }
  ]},

'phuc-hoi': { q: 'nghe_chung', k: 'Trải nghiệm', t: 'Khi hỏng việc — năm bước phục hồi',
  p: 'Gia đình từng phàn nàn và được xử tử tế trung thành hơn gia đình chưa bao giờ phàn nàn. Phàn nàn là quà, với điều kiện mình xử nó như quà.',
  khoi: [
    { k: 'buocso', tu: 'TN_PHUC_HOI' },
    { k: 'muc', t: 'Tám loại phàn nàn thường gặp' },
    { k: 'bang', cot: ['Phàn nàn', 'Ai xử lý', 'Trong bao lâu', 'Bù gì'], tu: 'TN_PHAN_NAN' },
    { k: 'muc', t: 'Sáu luật xử phàn nàn' },
    { k: 'luat', tu: 'TN_LUAT_PN' },
    { k: 'trich', t: 'Tháng nào không có phàn nàn nào là tháng đáng nghi, không phải tháng tốt.', n: 'Luật thứ ba' }
  ]},

'giu-nguoi': { q: 'nghe_chung', k: 'Trải nghiệm', t: 'Khi con muốn nghỉ',
  p: 'Lý do được nói gần như không bao giờ là lý do thật. Chữa lý do được nói thì mất người; tìm ra lý do thật thì giữ được.',
  khoi: [
    { k: 'cd4', tu: 'TN_NGHI',
      nhan: ['Lý do thật đằng sau', 'Cách kiểm', 'Việc phải làm', 'Không được làm'] },
    { k: 'muc', t: 'Luật không được phá' },
    { k: 'trich', t: 'Không bao giờ giữ người bằng giảm giá. Giảm giá để giữ là tự thừa nhận giá trị không đủ — và người ở lại vì giá rẻ sẽ đi khi có chỗ rẻ hơn.', n: 'Luật giữ người' },
    { k: 'muc', t: 'Ra đi tử tế' },
    { k: 'van', t: 'Cách một tổ chức tiễn người quyết định người ấy kể lại về nó thế nào trong mười năm sau. Đây là khoản đầu tư rẻ nhất và bị bỏ qua nhiều nhất.' },
    { k: 'luat', tu: 'TN_RA_DI' }
  ]},

'do-cam-nhan': { q: 'nghe_quan_ly', k: 'Đo', t: 'Đo cảm nhận',
  p: 'Không đo bằng câu “anh chị hài lòng chứ ạ”. Câu ấy chỉ đo được mức lịch sự của người được hỏi.',
  khoi: [
    { k: 'van', t: 'Sáu chỉ số dưới đây có một điểm chung: chúng đo *hành vi*, không đo lời khen. Và ba trong sáu chỉ số hỏi trẻ hoặc quan sát trẻ, không hỏi người trả tiền.' },
    { k: 'mau', tu: 'TN_DO_CAM' },
    { k: 'trich', t: 'Trên 60% gia đình dừng mà chưa từng phàn nàn câu nào — đó không phải là dấu hiệu tốt. Đó là dấu hiệu không ai tin phàn nàn có tác dụng.', n: 'Chỉ số thứ sáu' }
  ]},

/* ══════════ NHÓM 15 · GIÁ TRỊ VÀ TĂNG TRƯỞNG ══════════ */
'goi-san-pham': { q: 'tu_van', k: 'Gói', t: 'Năm gói',
  p: 'Mỗi gói có một mục “không phù hợp với ai”. Mục ấy quan trọng hơn mục “gồm gì”.',
  khoi: [
    { k: 'van', t: 'Bán đúng người thì giữ được người. Bán sai người thì mất cả tiền lẫn danh dự — và mất chậm, qua nhiều tháng, theo cách khó sửa nhất.' },
    { k: 'goi', tu: 'GT_GOI' },
    { k: 'muc', t: 'Bảy luật về giá' },
    { k: 'luat', tu: 'GT_LUAT_GIA' },
    { k: 'trich', t: 'Tiền không mua bậc. Tiền mua chỗ ngồi, mua thời gian của người kèm, mua công cụ. Bậc chỉ đổi bằng bằng chứng.', n: 'Luật trùm lên toàn bộ chương này' }
  ]},

'chong-gia-tri': { q: 'tu_van', k: 'Gói', t: 'Chồng giá trị',
  p: 'Bảng này chỉ có tác dụng nếu từng dòng đều thật và kiểm được. Thổi phồng một dòng thì cả bảng mất giá trị.',
  khoi: [
    { k: 'van', t: 'Khi phụ huynh nói “đắt quá”, phần lớn không phải đắt — mà là *chưa thấy đáng*. Bảng này để đi từng dòng cùng họ, chậm rãi, và dừng lại ở ba dòng không có tương đương trên thị trường.' },
    { k: 'bang', cot: ['Hạng mục', 'Gia đình nhận gì', 'Tương đương thị trường', 'Ghi chú trung thực'], tu: 'GT_CHONG' },
    { k: 'trich', t: 'Đừng bao giờ dùng bảng này để so mình với một nơi cụ thể. So với thị trường thì được; chê một cái tên thì mình thành cùng loại với người mình chê.', n: 'Cách dùng bảng' }
  ]},

'bao-dam': { q: 'kh_hanh_trinh', k: 'Cam kết', t: 'Ba lớp bảo đảm',
  p: 'Điều kiện phải rõ tới mức không cãi nhau được. Bảo đảm mập mờ còn tệ hơn không có bảo đảm.',
  khoi: [
    { k: 'van', t: 'Một bảo đảm mập mờ tạo kỳ vọng rồi phản bội kỳ vọng ấy đúng lúc gia đình cần mình nhất. Nên mỗi lớp dưới đây đều ghi rõ cả *giới hạn* — thứ mà bảo đảm này **không** bao gồm.' },
    { k: 'baodam', tu: 'GT_BAO_DAM' },
    { k: 'trich', t: 'Hội đồng phán quyết bảo đảm 90 ngày bắt buộc có một người ngoài đội tuyển sinh và ngoài đội đang kèm con. Không có điều này thì bảo đảm chỉ là một câu quảng cáo.', n: 'Điều làm nên sự khác biệt' }
  ]},

'kinh-te': { q: 'tai_chinh', k: 'Tiền', t: 'Đơn vị kinh tế',
  p: 'Không có bảng này thì mọi lý tưởng ở các tập trước đều là lý tưởng của người khác trả tiền.',
  khoi: [
    { k: 'van', t: 'Một hệ huấn luyện không tự nuôi được mình thì không sống nổi ba mươi năm, dù kiến trúc có đẹp tới đâu. Các tỉ lệ dưới đây là khoảng tham chiếu để dựng mô hình, không phải con số tuyệt đối cho mọi địa phương.' },
    { k: 'bang', cot: ['Khoản', 'Gồm gì', 'Tỉ trọng tham chiếu', 'Ghi chú'], tu: 'GT_KINH_TE' },
    { k: 'muc', t: 'Bốn ngưỡng phải nhớ' },
    { k: 'moc', tu: 'GT_LUAT_KT' },
    { k: 'trich', t: 'Mở sớm một chi hội hỏng hai chi hội.', n: 'Luật vàng' }
  ]},

'pheu': { q: 'dh_toan_he', k: 'Tăng trưởng', t: 'Phễu tuyển sinh năm tầng',
  p: 'Tầng cuối cùng là tầng duy nhất mà đầu tư vào nó không bao giờ lỗ.',
  khoi: [
    { k: 'buocso', tu: 'GT_PHEU' },
    { k: 'trich', t: 'Dưới 40% người mới đến từ tiến cử thì không được tăng ngân sách quảng cáo — phải sửa chất lượng trước. Người ta chỉ đem tên mình ra bảo lãnh cho thứ họ thật sự tin.', n: 'Chỉ số trung thực nhất về chất lượng' }
  ]},

'thong-diep': { q: 'tu_van', k: 'Tăng trưởng', t: 'Bộ thông điệp',
  p: 'Một câu, ba câu, một trang. Ai cũng phải nói được cả ba, và nói giống nhau.',
  khoi: [
    { k: 'van', t: 'Thông điệp không phải khẩu hiệu. Nó là *thứ mình dám bị kiểm chứng*. Mỗi câu dưới đây đều có một màn trong hệ này chứng minh cho nó — nếu không có, câu ấy phải bị bỏ.' },
    { k: 'luoi', c: 2, tu: 'GT_THONG_DIEP_L' },
    { k: 'trich', t: 'Chúng tôi làm loại thứ hai — và chúng tôi nói trước điều đó với mọi gia đình, ngay ở buổi tư vấn đầu tiên.', n: 'Câu mở đầu bản một trang' }
  ]},

'phan-doi': { q: 'tu_van', k: 'Tăng trưởng', t: 'Mười hai phản đối thường gặp',
  p: 'Nguyên tắc chung: không phản bác. Hỏi lại một câu sâu hơn, rồi im lặng chờ.',
  khoi: [
    { k: 'van', t: 'Phản đối gần như không bao giờ là điều được nói ra. Cột *điều thật đằng sau* là cột phải đọc trước; ba cột còn lại vô dụng nếu đọc sai cột ấy.' },
    { k: 'phandoi', tu: 'GT_PHAN_DOI' },
    { k: 'trich', t: 'Nếu gia đình chọn nơi khác, chúc họ thật lòng. Nửa số người quay lại sau một năm.', n: 'Phản đối thứ mười một' }
  ]},

'nha-truong': { q: 'dh_toan_he', k: 'Tăng trưởng', t: 'Hợp tác nhà trường',
  p: 'Thứ nhà trường cần không phải “kỹ năng sống”. Họ cần lớp dễ quản hơn, phong trào có sản phẩm, và phụ huynh bớt phàn nàn.',
  khoi: [
    { k: 'van', t: 'Bán khái niệm thì cửa đóng. Bán đúng thứ người ngồi đối diện đang phải chịu trách nhiệm thì cửa mở — và mỗi ghế trong trường chịu trách nhiệm một thứ khác nhau.' },
    { k: 'cd4', tu: 'GT_NHA_TRUONG',
      nhan: ['Bán cho ai', 'Họ thật sự cần gì', 'Mình đưa gì', 'Bẫy'] },
    { k: 'trich', t: 'Gói dự án cộng đồng là gói mở cửa, không phải gói kiếm tiền. Làm thật tốt một lần thì ba gói kia tự vào.', n: 'Thứ tự vào trường' }
  ]},

'nhan-rong': { q: 'dh_toan_he', k: 'Tăng trưởng', t: 'Nhân rộng mà không loãng chất',
  p: 'Ba đường, ba tốc độ, ba mức rủi ro. Đường lành nhất là đường chậm nhất — và chậm là tính năng, không phải lỗi.',
  khoi: [
    { k: 'cd4', tu: 'GT_NHAN_RONG',
      nhan: ['Là gì', 'Điều kiện', 'Được cầm gì · không được cầm gì', 'Rủi ro chính'] },
    { k: 'muc', t: 'Bảy thứ không bên nào được sửa' },
    { k: 'van', t: 'Nhân rộng hỏng không phải vì đối tác kém. Nó hỏng vì lõi không được ghi rõ, nên mỗi nơi tự hiểu một kiểu, và ba năm sau không còn nhận ra nhau nữa. Bảy điều dưới đây là lõi ấy.' },
    { k: 'luat', tu: 'GT_LOI_BAT_BIEN' },
    { k: 'trich', t: 'Không mở quá hai nhượng quyền một năm trong năm năm đầu.', n: 'Phanh của đường nhanh nhất' }
  ]},

/* ══════════ NHÓM 16 · BẰNG CHỨNG VÀ TIN CẬY ══════════ */
'tac-dong': { q: 'nghiem_thu', k: 'Bằng chứng', t: 'Đo tác động thật',
  p: 'Một hệ nói về nhân tài mà không chứng minh được mình có tác dụng thì cũng chỉ là một niềm tin dễ chịu.',
  khoi: [
    { k: 'muc', t: 'Ba tầng bằng chứng' },
    { k: 'van', t: 'Phần lớn tổ chức giáo dục dừng ở tầng một rồi gọi đó là kết quả. Tầng một gần như vô giá trị khi người trả lời biết mình đang được hỏi để đánh giá chính nơi mình đã trả tiền.' },
    { k: 'ly', tu: 'TC_TANG_BC' },
    { k: 'muc', t: 'Tám chỉ số ngoài hệ' },
    { k: 'van', t: 'Điểm chung của tám chỉ số này: chúng xảy ra ở nơi hệ *không có mặt*. Đó là lý do chúng đáng tin.' },
    { k: 'bang', cot: ['Chỉ số', 'Đo gì', 'Lấy ở đâu', 'Trụ'], tu: 'TC_CHI_SO' },
    { k: 'muc', t: 'Năm bước thiết kế phép đo' },
    { k: 'buocso', tu: 'TC_THIET_KE' },
    { k: 'muc', t: 'Sáu luật trung thực' },
    { k: 'luat', tu: 'TC_LUAT_DO' },
    { k: 'trich', t: '“95% phụ huynh hài lòng” trên hai mươi người là một câu vô nghĩa.', n: 'Luật thứ hai' }
  ]},

'theo-doi-doc': { q: 'dh_toan_he', k: 'Bằng chứng', t: 'Theo dõi dọc ba mươi năm',
  p: 'Tài sản mà không đối thủ nào sao chép được trong ngắn hạn, vì thứ duy nhất tạo ra nó là thời gian.',
  khoi: [
    { k: 'van', t: 'Bắt đầu từ khoá đầu tiên, năm 2026. Mỗi khoá được theo dõi ở sáu mốc, và mốc cuối cùng rơi đúng vào 2056 — năm khép vòng của cả tầm nhìn ba mươi năm.' },
    { k: 'moc', tu: 'TC_THEO_DOI' },
    { k: 'muc', t: 'Năm luật của dữ liệu theo dõi dọc' },
    { k: 'luat', tu: 'TC_LUAT_TD' },
    { k: 'trich', t: 'Con có cho con của mình vào hệ không — chỉ số trung thực nhất trong tất cả các chỉ số.', n: 'Mốc năm 20' }
  ]},

'kiem-dinh': { q: 'nghe_quan_ly', k: 'Tin cậy', t: 'Kiểm định',
  p: 'Nội kiểm hằng quý giữ cho hệ không trôi. Ngoại kiểm hằng năm giữ cho hệ không tự huyễn hoặc.',
  khoi: [
    { k: 'bang', cot: ['Hạng mục', 'Ai kiểm', 'Nhịp', 'Ngưỡng', 'Không đạt thì sao'], tu: 'TC_KIEM_DINH' },
    { k: 'trich', t: 'Hội đồng ngoại kiểm có hai phụ huynh đại diện, và báo cáo được công bố nội bộ nguyên văn — kể cả phần khó nghe.', n: 'Điều làm ngoại kiểm khác một buổi họp' }
  ]},

'bao-ve-tre': { q: 'chung', k: 'An toàn', t: 'Mười luật đỏ bảo vệ trẻ em',
  p: 'Không có mức phạt trung gian cho luật đỏ. Vi phạm là chấm dứt, và điều tra sau khi đã đình chỉ.',
  khoi: [
    { k: 'van', t: 'Mười điều dưới đây không phải khuyến nghị, không phải văn hoá, không phải mong muốn. Chúng là ranh giới. Mọi người trong hệ — Coach, giáo viên, tình nguyện viên, phụ huynh hỗ trợ — ký nhận từng điều trước buổi đầu tiên tiếp xúc với trẻ.' },
    { k: 'luat', tu: 'TC_BAO_VE' },
    { k: 'trich', t: 'Đình chỉ trước, điều tra sau. Không có ngoại lệ vì thâm niên, vì chức vụ, vì sắp tới kỳ nghiệm thu.', n: 'Luật thứ mười' }
  ]},

'du-lieu-tre': { q: 'chung', k: 'An toàn', t: 'Dữ liệu của con',
  p: 'Thu tối thiểu, giữ có hạn, và trả lại quyền cho chính người ấy khi đủ tuổi.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'TC_DU_LIEU' },
    { k: 'trich', t: 'Câu hỏi kiểm cho mọi trường dữ liệu: trường này phục vụ quyết định nào? Không trả lời được thì bỏ trường đó.', n: 'Nguyên tắc thu tối thiểu' }
  ]},

'khung-hoang': { q: 'nghe_quan_ly', k: 'An toàn', t: 'Năm cấp khủng hoảng và hai mươi tư giờ vàng',
  p: 'Phân cấp trước, để lúc xảy ra không phải bàn xem việc này to hay nhỏ.',
  khoi: [
    { k: 'rui', tu: 'TC_KHUNG_HOANG' },
    { k: 'muc', t: 'Hai mươi tư giờ vàng' },
    { k: 'van', t: 'Trình tự này không đổi theo mức độ nghiêm trọng. Sự thật trước, xin lỗi trước, giải thích sau — kể cả khi mình tin là mình không sai.' },
    { k: 'buocso', tu: 'TC_24H' },
    { k: 'trich', t: '“Chúng tôi chưa biết” là một câu mạnh. “Không có bình luận” là một câu chết.', n: 'Bước một' }
  ]},

'phap-ly': { q: 'dh_toan_he', k: 'Tin cậy', t: 'Mười hồ sơ phải có',
  p: 'Giấy tờ không tạo ra chất lượng. Nhưng thiếu giấy tờ thì một sự cố nhỏ đủ để xoá sạch mười năm gây dựng.',
  khoi: [
    { k: 'bang', cot: ['Hồ sơ', 'Vì sao cần · gồm gì', 'Ai giữ', 'Nhịp cập nhật'], tu: 'TC_PHAP_LY' },
    { k: 'trich', t: 'Lý lịch tư pháp phải có trước buổi đầu tiên tiếp xúc với trẻ. Không có ngoại lệ, kể cả với người quen, kể cả khi thiếu người.', n: 'Hồ sơ số sáu' }
  ]},

'cau-hoi': { q: 'chung', k: 'Tin cậy', t: 'Câu hỏi thường gặp',
  p: 'Sáu nhóm người hỏi. Trả lời ngắn, thật, và không né câu khó.',
  khoi: [
    { k: 'van', t: 'Bộ câu trả lời này là *một nguồn duy nhất*. Ai trong hệ cũng trả lời giống nhau — khác nhau ở giọng, không khác ở nội dung. Câu nào chưa có ở đây thì đưa lên quản lý chuyên môn để bổ sung, không tự chế.' },
    { k: 'faq', tu: 'TC_FAQ' }
  ]},

'so-loi': { q: 'nghe_chung', k: 'Tin cậy', t: 'Sổ ghi lỗi công khai',
  p: 'Rất ít tổ chức dám làm việc này. Đó chính là lý do nên làm: thứ ai cũng làm được thì không tạo ra niềm tin.',
  khoi: [
    { k: 'van', t: 'Một hệ nói với trẻ rằng *sai thì nhận và làm lại* mà bản thân nó không dám ghi lại cái sai của mình thì đang dạy điều ngược với điều nó nói. Trẻ học điều mình làm, không học điều mình dặn.' },
    { k: 'luoi', c: 2, tu: 'TC_SO_LOI' },
    { k: 'muc', t: 'Sáu lỗi đã lường trước' },
    { k: 'van', t: 'Sáu dòng dưới đây được viết *trước khi* chúng xảy ra — đây là những lỗi mà mọi hệ đào tạo đều mắc ở năm đầu. Ghi sẵn để khi mắc thì nhận ra ngay, và để luật ở cột cuối có hiệu lực từ ngày đầu tiên.' },
    { k: 'bang', cot: ['Lỗi', 'Ai bị ảnh hưởng', 'Đã sửa gì', 'Luật sinh ra từ lỗi này'], tu: 'TC_LOI_MAU' },
    { k: 'trich', t: 'Cột cuối cùng là cột quan trọng nhất. Lỗi không sinh ra luật mới thì sẽ lặp lại.', n: 'Cách đọc sổ' }
  ]}
,

/* ══════════ NHÓM 17 · NHẬN DIỆN THƯƠNG HIỆU ══════════ */
'nen-thuong-hieu': { q: 'qt_noi_dung', k: 'Thương hiệu', t: 'Nền tảng thương hiệu',
  p: 'Nhận diện không phải cái logo. Nhận diện là thứ khiến người ta nhận ra mình khi chưa nhìn thấy tên.',
  khoi: [
    { k: 'van', t: 'Sáu điều dưới đây là phần *không được đổi khi thấy chán*. Chúng chỉ đổi khi có bằng chứng rằng chúng sai — và bằng chứng ấy phải mạnh hơn cảm giác của bất kỳ ai.' },
    { k: 'luoi', c: 2, tu: 'TH_NEN' },
    { k: 'muc', t: 'Bốn khác biệt không sao chép được' },
    { k: 'van', t: 'Khác biệt thật không nằm ở thứ mình *nói hay hơn*, mà ở thứ đối thủ **chép được hình thức nhưng phải trả giá thật để chép nội dung**.' },
    { k: 'luoi', c: 2, tu: 'TH_KHAC_BIET' },
    { k: 'trich', t: 'Mọi thứ chúng tôi nói về con anh chị đều có bằng chứng, và bằng chứng ấy có chữ ký của một người ngoài.', n: 'Lời hứa thương hiệu — lời hứa duy nhất' }
  ]},

'kien-truc-th': { q: 'qt_noi_dung', k: 'Thương hiệu', t: 'Kiến trúc thương hiệu',
  p: 'Mô hình thương hiệu mẹ bảo chứng: GITA đứng sau, Gen Việt 365 đứng trước, sản phẩm mang tên riêng.',
  khoi: [
    { k: 'thap', tu: 'TH_KT_THAP' },
    { k: 'muc', t: 'Bảy luật đặt tên' },
    { k: 'van', t: 'Tên là thứ rò ra ngoài nhanh nhất và khó thu về nhất. Một tên nội bộ dùng sáu tháng thì đã thành tên chính thức, dù chưa ai duyệt.' },
    { k: 'luat', tu: 'TH_LUAT_TEN' },
    { k: 'trich', t: 'Tên GEN VIỆT chỉ gắn vào thứ đi qua cổng nghiệm thu của hệ.', n: 'Luật thứ nhất' }
  ]},

'an-gen-viet': { q: 'chung', k: 'Dấu hiệu', t: 'Ấn Gen Việt',
  p: 'Ấn triện là vật chứng nhận của người Việt suốt nghìn năm: đóng dấu nghĩa là tôi chịu trách nhiệm về điều này.',
  khoi: [
    { k: 'an' },
    { k: 'muc', t: 'Sáu ý niệm trong một dấu hiệu' },
    { k: 'luoi', c: 2, tu: 'TH_AN_Y_NIEM' },
    { k: 'muc', t: 'Năm biến thể và nơi dùng' },
    { k: 'bang', cot: ['Mã', 'Biến thể', 'Là gì', 'Dùng ở đâu', 'Cỡ nhỏ nhất'], tu: 'TH_AN_BT_BANG' },
    { k: 'muc', t: 'Tám luật dùng ấn' },
    { k: 'luat', tu: 'TH_AN_LUAT' },
    { k: 'trich', t: 'Nét trái luôn liền — bảy nguyên lý bất biến. Sáu chấm luôn có quãng — lên bậc phải có quãng, không liên tục, không tự động.', n: 'Hai điều không bao giờ được vẽ sai' }
  ]},

'an-dung-sai': { q: 'chung', k: 'Dấu hiệu', t: 'Tám cách dùng sai',
  p: 'Vẽ ra thì hiểu nhanh hơn kể ra. Tám hình dưới đây đều sai, và mỗi hình sai theo một kiểu hay gặp.',
  khoi: [
    { k: 'ansai', tu: 'TH_AN_SAI' },
    { k: 'trich', t: 'Hai cách sai nữa không vẽ được, vì chúng sai về đạo đức chứ không sai về hình: đóng dấu lên mặt người, và dùng bản đỏ son cho quảng cáo.', n: 'Xem tiếp tám luật dùng ấn ở màn trước' }
  ]},

'mau-th': { q: 'chung', k: 'Nhận diện', t: 'Bảng màu',
  p: 'Kế thừa nguyên vẹn nhận diện Học viện GITA. Mọi mã màu chữ đều đã qua bộ kiểm tương phản, ở cả chế độ sáng và tối.',
  khoi: [
    { k: 'swatch', tu: 'TH_MAU' },
    { k: 'muc', t: 'Sáu luật dùng màu' },
    { k: 'luat', tu: 'TH_MAU_LUAT' },
    { k: 'trich', t: 'Màu không bao giờ là thông tin duy nhất. Khoảng tám phần trăm nam giới không phân biệt được đỏ và lục.', n: 'Luật thứ ba' }
  ]},

'chu-th': { q: 'chung', k: 'Nhận diện', t: 'Bộ chữ',
  p: 'Ba phông, mỗi phông một việc. Và một bộ thay thế bắt buộc phải chạy được khi phông ngoài bị chặn.',
  khoi: [
    { k: 'chuviet', tu: 'TH_CHU' },
    { k: 'muc', t: 'Thang chữ' },
    { k: 'bang', cot: ['Dùng ở đâu', 'Phông và độ đậm', 'Cỡ', 'Ghi chú'], tu: 'TH_THANG_CHU' },
    { k: 'trich', t: 'Be Vietnam Pro do người Việt thiết kế, dấu tiếng Việt được vẽ riêng chứ không chắp vá. Đó là lý do chọn nó thay vì một phông quốc tế.', n: 'Vì sao là phông này' }
  ]},

'hinh-th': { q: 'qt_noi_dung', k: 'Nhận diện', t: 'Hình ảnh và hoạ tiết',
  p: 'Luật đạo đức đứng trước luật thẩm mỹ. Một tấm ảnh đẹp mà vi phạm luật đầu thì không dùng.',
  khoi: [
    { k: 'muc', t: 'Sáu luật đạo đức khi chụp trẻ' },
    { k: 'luat', tu: 'TH_HINH_DAO_DUC' },
    { k: 'muc', t: 'Bốn nguyên tắc thẩm mỹ' },
    { k: 'luoi', c: 2, tu: 'TH_HINH_THAM_MY' },
    { k: 'muc', t: 'Ba hoạ tiết' },
    { k: 'luoi', c: 3, tu: 'TH_HOA_TIET' },
    { k: 'trich', t: 'Ảnh xếp hàng cười vào ống kính là ảnh của mọi trung tâm. Ảnh việc đang làm là ảnh của mình.', n: 'Nguyên tắc thứ nhất' }
  ]},

'giong-th': { q: 'chung', k: 'Nhận diện', t: 'Giọng thương hiệu',
  p: 'Năm nguyên tắc, và một bảng đối chiếu để ai cũng nói giống nhau — khác ở giọng, không khác ở nội dung.',
  khoi: [
    { k: 'ly', tu: 'TH_GIONG' },
    { k: 'muc', t: 'Bảng nói và không nói' },
    { k: 'bang', cot: ['Không nói thế này', 'Nói thế này'], tu: 'TH_GIONG_BANG' },
    { k: 'van', t: 'Bảng này nối tiếp *bảng thay vì* trong nhóm 06 — bảng kia dành cho lời nói với trẻ, bảng này dành cho lời nói của thương hiệu ra bên ngoài. Cùng một nguyên tắc: nói bằng việc, không bằng tính từ.' },
    { k: 'trich', t: 'Bị động cách là chỗ trú của người không muốn chịu trách nhiệm.', n: 'Nguyên tắc thứ tư' }
  ]},

'ung-dung-th': { q: 'qt_noi_dung', k: 'Nhận diện', t: 'Mười sáu ứng dụng',
  p: 'Từ con dấu chi hội tới phông nền sự kiện. Mỗi hạng mục ghi rõ dùng biến thể nào, cỡ nào, và điều gì không được quên.',
  khoi: [
    { k: 'bang', cot: ['Hạng mục', 'Biến thể và màu', 'Kích thước', 'Điều không được quên'], tu: 'TH_UNG_DUNG' },
    { k: 'trich', t: 'Huy hiệu bằng kim loại, không phải nhựa. Thứ nặng tay thì được giữ lại.', n: 'Ghi chú của hạng mục thứ tư' }
  ]},

'giu-th': { q: 'qt_noi_dung', k: 'Nhận diện', t: 'Bộ tệp bàn giao và luật giữ nhận diện',
  p: 'Một bộ nhận diện không có người gác thì sáu tháng sau không còn là bộ nhận diện.',
  khoi: [
    { k: 'muc', t: 'Tám hạng mục trong bộ bàn giao' },
    { k: 'bang', cot: ['Hạng mục', 'Định dạng', 'Gồm gì'], tu: 'TH_TEP' },
    { k: 'muc', t: 'Bảy luật giữ nhận diện' },
    { k: 'luat', tu: 'TH_LUAT_GIU' },
    { k: 'trich', t: 'Đề nghị đổi nhận diện phải nêu vấn đề trước, không nêu phương án trước. Chán không phải là một vấn đề.', n: 'Luật thứ năm' }
  ]},

/* ══════════ NHÓM 18 · BẢN QUYỀN VÀ TOÀN CẦU ══════════ */
'tai-san-tri-tue': { q: 'dh_toan_he', k: 'Bản quyền', t: 'Danh mục tài sản trí tuệ',
  p: 'Không đếm được thì không giữ được. Mười hai tài sản, mỗi thứ một loại quyền và một nơi đăng ký khác nhau.',
  khoi: [
    { k: 'muc', t: 'Đọc điều này trước' },
    { k: 'luat', tu: 'BQ_RANH_GIOI' },
    { k: 'muc', t: 'Mười hai tài sản' },
    { k: 'bang', cot: ['Tài sản', 'Loại quyền', 'Nơi đăng ký', 'Ghi chú', 'Thứ tự ưu tiên'], tu: 'BQ_TAI_SAN' },
    { k: 'trich', t: 'Tên miền rẻ hơn kiện tụng vài trăm lần. Mua trước, không mua sau.', n: 'Tài sản thứ mười hai' }
  ]},

'quyen-tac-gia': { q: 'dh_toan_he', k: 'Bản quyền', t: 'Đăng ký quyền tác giả',
  p: 'Quyền đã phát sinh từ lúc tác phẩm được định hình. Đăng ký không tạo ra quyền — đăng ký tạo ra chứng cứ.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'BQ_QUYEN_TG' },
    { k: 'muc', t: 'Tám thứ trong hồ sơ' },
    { k: 'bang', cot: ['Giấy tờ', 'Là gì', 'Chỗ hay sai'], tu: 'BQ_HO_SO_TG' },
    { k: 'muc', t: 'Sáu cách đóng dấu thời gian — làm ngay, trước khi nộp' },
    { k: 'van', t: 'Đăng ký mất thời gian. Sáu việc dưới đây làm được *ngay hôm nay*, chi phí gần bằng không, và chúng tạo ra chứng cứ về thời điểm ngay cả khi hồ sơ chưa nộp.' },
    { k: 'luat', tu: 'BQ_DONG_DAU_TG' },
    { k: 'trich', t: 'Khi có tranh chấp, bên đã có Giấy chứng nhận không phải chứng minh quyền của mình; bên kia phải chứng minh ngược lại. Đó là toàn bộ giá trị của việc đăng ký.', n: 'Vì sao vẫn nên đăng ký' }
  ]},

'nhan-hieu': { q: 'dh_toan_he', k: 'Bản quyền', t: 'Đăng ký nhãn hiệu',
  p: 'Ngày nộp đơn là ngày xác lập quyền ưu tiên. Phần lớn các nước theo nguyên tắc ai nộp trước người đó được — không phải ai dùng trước.',
  khoi: [
    { k: 'buocso', tu: 'BQ_NHAN_HIEU' },
    { k: 'muc', t: 'Năm nhóm phải nộp' },
    { k: 'bang', cot: ['Nhóm', 'Phạm vi', 'Vì sao cần', 'Bảo hộ được gì'], tu: 'BQ_NHOM_NICE' },
    { k: 'trich', t: 'Đổi tên ở bước tra cứu rẻ hơn đổi tên ở mọi bước sau.', n: 'Bước một' }
  ]},

'de-an-quoc-gia': { q: 'dh_toan_he', k: 'Đề án', t: 'Đề án cấp quốc gia',
  p: 'Một đề án được xét dễ hơn nhiều khi nó phục vụ một chủ trương đã có, thay vì đề xuất một chủ trương mới.',
  khoi: [
    { k: 'buocso', tu: 'BQ_DE_AN' },
    { k: 'muc', t: 'Cấu trúc hồ sơ mười một phần' },
    { k: 'bang', cot: ['Phần', 'Gồm gì', 'Chỗ quyết định'], tu: 'BQ_CAU_TRUC_DA' },
    { k: 'trich', t: 'Một chi hội chạy thật ba quý liên tiếp trên ngưỡng, có số liệu, có phụ huynh xác nhận — mạnh hơn một trăm trang lý luận.', n: 'Bước sáu' }
  ]},

'anh-xa-chuan': { q: 'nghiem_thu', k: 'Đề án', t: 'Ánh xạ sang chuẩn quốc gia',
  p: 'Hội đồng thẩm định không đọc hệ của mình bằng ngôn ngữ của mình. Họ đọc bằng ngôn ngữ chuẩn quốc gia. Bảng này là cây cầu.',
  khoi: [
    { k: 'van', t: 'Đây là phần được đọc kỹ nhất trong cả hồ sơ đề án, và cũng là phần hay bị làm qua loa nhất. Làm đúng thì mọi phần khác được đọc với thiện cảm; làm ẩu thì mọi phần khác bị nghi ngờ.' },
    { k: 'muc', t: 'Năm phẩm chất Gen Việt ↔ năm phẩm chất Chương trình 2018' },
    { k: 'bang', cot: ['Phẩm chất Gen Việt', 'Nghĩa là gì', 'Phẩm chất Chương trình 2018', 'Bằng chứng thu được'], tu: 'BQ_ANH_XA_PC' },
    { k: 'muc', t: 'Mười hai trục ↔ ba năng lực chung và bảy năng lực đặc thù' },
    { k: 'bang', cot: ['Trục', 'Đo gì', 'Năng lực Chương trình 2018', 'Bằng chứng thu được'], tu: 'BQ_ANH_XA_NL' },
    { k: 'muc', t: 'Năm luật của bảng ánh xạ' },
    { k: 'luat', tu: 'BQ_ANH_XA_LUAT' },
    { k: 'trich', t: 'Không tuyên bố hệ này thay thế nội dung giáo dục trong nhà trường. Nó bổ trợ — và nói rõ điều đó ở mọi hồ sơ.', n: 'Luật thứ hai' }
  ]},

'ra-quoc-te': { q: 'dh_toan_he', k: 'Toàn cầu', t: 'Ra quốc tế',
  p: 'Quyền tác giả đã có sẵn ở phần lớn thế giới. Nhãn hiệu thì không — và nhãn hiệu là thứ bị chiếm mất.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'BQ_QUOC_TE' },
    { k: 'trich', t: 'Phải nộp ở một thị trường TRƯỚC KHI truyền thông về việc sẽ vào thị trường đó.', n: 'Hệ quả của nguyên tắc nộp trước' }
  ]},

'ban-dia-hoa': { q: 'dh_toan_he', k: 'Toàn cầu', t: 'Bản địa hoá ba tầng',
  p: 'Dịch nguyên · thích ứng · tái tạo. Nhầm tầng là cách nhanh nhất để vừa mất chất vừa mất người.',
  khoi: [
    { k: 'cd4', tu: 'BQ_BAN_DIA',
      nhan: ['Phần nào thuộc tầng này', 'Nguyên tắc', 'Làm thế nào', 'Bẫy'] },
    { k: 'trich', t: 'Với nước sở tại: mời họ tự biên soạn bộ chân dung của họ theo đúng bảy nguyên tắc biên soạn của mình. Đây là cách xuất khẩu phương pháp, không xuất khẩu nội dung.', n: 'Tầng ba — và là chỗ khác biệt lớn nhất' }
  ]},

'tuan-thu-vung': { q: 'dh_toan_he', k: 'Toàn cầu', t: 'Tuân thủ theo vùng',
  p: 'Luật bảo vệ trẻ em và dữ liệu khác nhau đáng kể giữa các vùng. Không suy diễn từ luật Việt Nam sang nước khác.',
  khoi: [
    { k: 'bang', cot: ['Vùng', 'Khung pháp lý chính', 'Điểm phải đáp ứng', 'Việc phải làm trước khi vào'], tu: 'BQ_TUAN_THU' },
    { k: 'trich', t: 'Lý lịch tư pháp cho người tiếp xúc trẻ là bắt buộc ở mọi thị trường. Không có ngoại lệ vì thiếu người hay vì khác biệt pháp lý.', n: 'Dòng cuối bảng — dòng duy nhất giống nhau ở mọi nơi' }
  ]},

'lo-trinh-toan-cau': { q: 'dh_toan_he', k: 'Toàn cầu', t: 'Lộ trình toàn cầu',
  p: 'Bốn chặng, ba mươi năm, và một cổng phải qua trước khi sang chặng sau.',
  khoi: [
    { k: 'van', t: 'Lộ trình này chạy *song song* với sáu chặng phát triển hệ ở nhóm 12, không thay thế. Sáu chặng kia nói hệ lớn lên thế nào; bốn chặng này nói hệ đi xa tới đâu.' },
    { k: 'chang', tu: 'BQ_LO_TRINH' },
    { k: 'trich', t: 'Ra quốc tế trước khi vững trong nước — lỗi phổ biến nhất và đắt nhất.', n: 'Rủi ro của chặng một' }
  ]},

'chong-xam-pham': { q: 'dh_toan_he', k: 'Bản quyền', t: 'Chống xâm phạm',
  p: 'Năm cấp, và một nguyên tắc: bằng chứng phải có sẵn trước khi cần, không đi thu thập sau khi phát hiện.',
  khoi: [
    { k: 'rui', tu: 'BQ_CHONG' },
    { k: 'muc', t: 'Bảy việc giữ bằng chứng — làm sẵn, không đợi' },
    { k: 'luat', tu: 'BQ_BANG_CHUNG' },
    { k: 'trich', t: 'Cấp năm là cấp duy nhất mà lợi ích thương mại không được cân nhắc: thông báo cho cơ quan chức năng trước, xử lý pháp lý sau.', n: 'Khi tên mình bị dùng để làm hại trẻ' }
  ]}

};

/* ══════════ BẢNG TRA — nối khối "tu" tới dữ liệu thật ══════════
   Khối trong GV.MAN không ôm dữ liệu; nó trỏ tới một khoá ở đây. Nhờ vậy
   một bộ dữ liệu dùng được ở nhiều màn mà không phải chép lần thứ hai. */
GV.TU = {
  /* nhóm 1 */
  DINH_VI_BANG: GV.DINH_VI.bang.map(function (r) { return [r.truc, r.gita, r.gv]; }),
  NGUYEN_LY: GV.NGUYEN_LY,
  LOP: GV.LOP,
  HO_CHIEU_TRUONG: GV.TRUC_DOC.truong.map(function (r) { return [r.k, r.v]; }),
  BAC: GV.BAC,
  BAC_MUC: GV.BAC_MUC.map(function (r) { return [r.bac, r.doi, r.chinh]; }),
  TRU: GV.TRU,
  MUC: GV.MUC,
  PHAM_CHAT: GV.PHAM_CHAT,

  /* nhóm 2 */
  NHIP: GV.NHIP,
  HINH_THAI: GV.HINH_THAI.map(function (r) { return [r.ma, r.t, r.nhip, r.manh, r.yeu, r.dung, r.bac]; }),
  LO_TRINH: GV.LO_TRINH,
  KHOA_NEN: GV.KHOA_NEN,
  CHUYEN_DE: GV.CHUYEN_DE,
  TRAI_LY: GV.TRAI.ly,
  TRAI_DS: GV.TRAI.ds,
  TRAI_NGAY: GV.TRAI.ngay,
  TRAI_HAU: GV.TRAI.hau.map(function (r) { return { a: r.n, b: r.v }; }),
  TEST_LUAT: GV.BO_TEST.luat,
  TEST_DS: GV.BO_TEST.ds.map(function (r) { return [r.m, r.t, r.do, r.ra]; }),
  TEST_DOC: GV.BO_TEST.doc.map(function (r) { return [r.d, r.y]; }),

  /* nhóm 3 */
  CLB_GOC: { t: GV.CLB.goc.t, n: GV.CLB.goc.n, vi: GV.CLB.goc.khac },
  CLB_QUYMO: GV.CLB.quyMo.map(function (r) { return [r.c, r.v]; }),
  CLB_VONG: GV.CLB.vong,
  CLB_KICHBAN: GV.CLB.kichBan,
  CLB_BANGSO: GV.CLB.bangSo.map(function (r) { return [r.c, r.t, r.d, r.n]; }),
  CLB_BAN: GV.CLB.ban.map(function (r) { return [r.g, r.l, r.kpi]; }),
  BDH_N: GV.DAO_TAO_BDH.n,
  BDH_DS: GV.DAO_TAO_BDH.ds,
  BDH_SO: GV.DAO_TAO_BDH.soGhe,
  TO_N: GV.CLB.to.n,
  TO_DS: GV.CLB.to.ds,
  CLB_LUAT: GV.CLB.luat,
  CLB_MOMOI_B: GV.CLB.moMoi.b,
  CLB_MOMOI_N: GV.CLB.moMoi.n,
  CLB_BATANG: GV.CLB.baTang.map(function (r) { return [r.t, r.qm, r.nhip, r.lam]; }),
  LICH_NAM: GV.LICH_NAM,

  /* nhóm 4 */
  MOI_TRUONG: GV.MOI_TRUONG,
  TUAN: GV.TUAN.map(function (r) { return { a: r.ng, b: r.v }; }),
  SO_TAY_MT: GV.SO_TAY_MT,
  SO_TAY: GV.SO_TAY,

  /* nhóm 5 */
  BANG_MAU: GV.BANG_MAU,
  KPI_HE: GV.KPI_HE.map(function (r) { return [r.t, r.vi, r.dv]; }),
  CONG_LUAT: GV.CONG.luat,
  CONG_BANG: GV.CONG.bang,
  CONG_QUYET: GV.CONG.quyet.map(function (r) { return [r.d, r.q]; }),
  BAO_CAO: GV.BAO_CAO.map(function (r) { return [r.c, r.ai, r.gui, r.han, r.gom]; }),
  BIEU_MAU: GV.BIEU_MAU,

  /* nhóm 6 */
  MA_HOA: GV.MA_HOA.map(function (r) { return [r.ma, r.la, r.gt]; }),
  GHEP: { t: GV.GHEP_KHONG_LUU.t, n: GV.GHEP_KHONG_LUU.n, vi: GV.GHEP_KHONG_LUU.vi },
  HO_CHIEU_JSON: GV.HO_CHIEU_JSON,
  HO_CHIEU_LUAT: GV.HO_CHIEU_LUAT,
  BANG_LUU: GV.BANG_LUU.map(function (r) { return [r.b, r.k, r.n]; }),
  API: GV.API.map(function (r) { return [r.d, r.v]; }),
  QUYEN: GV.QUYEN.map(function (r) { return [r.q, r.v, r.ai]; }),
  CONG_NGHE: GV.CONG_NGHE.map(function (r) { return [r.ten + ' — ' + r.chang, r.lam, r.duoc, r.han, r.phai]; }),
  LUU_BA_TANG: GV.LUU_BA_TANG.map(function (r) { return { t: r.t, n: r.gi, vi: r.mat }; }),
  NGUYEN_TAC_KT: GV.NGUYEN_TAC_KT,

  /* nhóm 7 */
  VAI: GV.VAI,
  TC_LUAT: { t: GV.TAI_CHINH.luat, n: GV.TAI_CHINH.vi },
  TC_DONG: GV.TAI_CHINH.dong.map(function (r) { return [r.t, r.vai, r.ty]; }),
  TC_QUY: { t: GV.TAI_CHINH.quy.t, n: GV.TAI_CHINH.quy.n + ' ' + GV.TAI_CHINH.quy.dung, vi: GV.TAI_CHINH.quy.vi },
  AT_LUAT: GV.AN_TOAN.luat,
  AT_DAU: GV.AN_TOAN.dau,
  AT_QUY: GV.AN_TOAN.quy.map(function (r) { return r.v; }),
  RUI_RO: GV.RUI_RO,

  /* nhóm 3 · kho chuyên môn */
  MA_TRAN: GV.MA_TRAN.map(function (r) { return [r.l, r.g, r.i, r.t, r.a, r.dl, r.vai, r.ra]; }),
  MUOI_BUOC: GV.MUOI_BUOC,
  NHOM_GP: GV.NHOM_GP.map(function (r) {
    return { t: r.m + ' · ' + r.t, n: r.n, vi: 'Trục Gen Việt: ' + r.truc + ' — ' + r.vi };
  }),
  CHON_CL: GV.CHON_CL,
  CHIEN_LUOC: GV.CHIEN_LUOC,
  THANG_HT: GV.THANG_HT.map(function (r) { return ['Mức ' + r.m, r.t, r.vd]; }),
  THANG_HT_LUAT: GV.THANG_HT_LUAT,
  TU_DONG: GV.TU_DONG.map(function (r) { return [r.th, r.muc, r.he, r.hs, r.ph, r.co]; }),

  /* nhóm 6 · ngôn ngữ và văn hoá */
  NGON_NGU: GV.NGON_NGU.map(function (r) { return [r.x, r.o, r.vi]; }),
  NGON_NGU_LUAT: GV.NGON_NGU_LUAT,
  NGHI_LE: GV.NGHI_LE.map(function (r) {
    return { t: r.t, n: 'Khi nào: ' + r.khi + '. ' + r.n, vi: r.vi };
  }),
  GHI_NHAN_LUAT: GV.GHI_NHAN.luat,
  GHI_NHAN_CAP: GV.GHI_NHAN.cap.map(function (r) { return ['Cấp ' + r.c, r.t, r.dk, r.bieu]; }),
  WOW: GV.WOW.map(function (r) { return { b: r.n, t: r.t, ai: r.ai, n: r.y }; }),

  /* nhóm 8 · tư vấn và đường vào */
  DUONG_VAO: GV.DUONG_VAO,
  MACH_TU_VAN: GV.MACH_TU_VAN.map(function (r) { return [r.nc, r.dh, r.ch, r.tang, r.gt]; }),
  BUOI_DAU: GV.BUOI_DAU,
  CHAN_DUNG: GV.CHAN_DUNG,
  DAI_SU_DS: GV.DAI_SU.ds.map(function (r) { return [r.c, r.dk, r.duoc]; }),
  DAI_SU_LUAT: GV.DAI_SU.luat,

  /* nhóm 9 · đội ngũ */
  NGHE_COACH: GV.NGHE_COACH.map(function (r) { return [r.c, r.tg, r.lam, r.dk, r.ra]; }),
  BAY_NL: GV.BAY_NL.map(function (r) {
    return { t: r.k + ' · ' + r.t, n: r.n, vi: 'Kiểm bằng: ' + r.kiem };
  }),
  TUYEN_TIM: GV.TUYEN.tim,
  TUYEN_TRANH: GV.TUYEN.tranh,
  TUYEN_THU: GV.TUYEN.thu.map(function (r) { return { a: r.m, b: r.v }; }),
  DU_GIO: GV.DU_GIO,
  DU_GIO_LUAT: GV.DU_GIO_LUAT,


  /* phân quyền */
  VAI_BANG: GV.VAI.map(function (r) { return [r.ma, 'lv ' + r.lv, r.t, r.ln]; }),
  QUYEN_BANG: GV.TANG_HT_UI.map(function (r) {
    return [r.t, 'lv ≤ ' + GV.QUYEN_MAX[r.q] + '  (' + r.q + ')', r.mo];
  }),
  BAC_MO_BANG: GV.BAC_MO.map(function (r) {
    var mo = GV.demMan ? GV.demMan('R16', r.bac) : 0;
    var tong = Object.keys(GV.MAN).length;
    return [r.bac, r.t, 'lv ' + r.lv + ' · ' + Math.round(mo / tong * 100) + '%', r.mo];
  }),
  GHI_DE_BANG: Object.keys(GV.GHI_DE).map(function (k) {
    var v = GV.GHI_DE[k], ten = k;
    GV.VAI.forEach(function (r) { if (r.ma === k) ten = k + ' · ' + r.t; });
    return [ten, (v.cho || []).join(' · ') || '—', (v.cam || []).join(' · ') || '—'];
  }),
  TY_LE_BANG: GV.TY_LE.map(function (r) { return [r.vai.join(' · '), r.pt + '%', r.ghi]; }),
  LUAT_QUYEN: GV.LUAT_QUYEN,


  /* nhóm 13 · thư viện Gen Việt */
  TV_NGUYEN_TAC: GV.TV_NGUYEN_TAC,
  TV_QUYEN: GV.TV_QUYEN,
  TV_Q1: GV.TV_Q1, TV_Q2: GV.TV_Q2, TV_Q3: GV.TV_Q3,
  TV_Q4: GV.TV_Q4, TV_Q5: GV.TV_Q5, TV_Q6: GV.TV_Q6,
  TV_MO_THUC: GV.TV_MO_THUC,
  TV_PC_BANG: GV.TV_PHAM_CHAT.map(function (r) { return [r.pc, r.ai, r.hoi]; }),
  TV_CACH_DUNG: GV.TV_CACH_DUNG.map(function (r) { return [r.noi, r.nhip, r.lam, r.kiem]; }),
  TV_NGUON: GV.TV_NGUON.map(function (r) { return [r.t, r.l]; }),

  /* nhóm 12 · triển khai */
  NGAY_90: GV.NGAY_90.map(function (r) { return [r.tuan, r.viec, r.ai, r.ra]; }),
  NAM_DAU: GV.NAM_DAU,
  CHANG: GV.CHANG,
  NGUON: GV.NGUON.map(function (r) { return [r.t, r.l]; }),

  /* nhóm 14 · trải nghiệm và cam kết */
  TN_HANH_TRINH: GV.TN_HANH_TRINH,
  TN_XUYEN_SUOT: [
    'Mỗi chặng phải để lại *một vật cầm được*. Chặng nào không có vật thì chặng ấy không được nhớ.',
    'Mỗi chặng có một *dấu hiệu đang rơi* được định nghĩa trước — không đợi tới lúc gia đình nói mới biết.',
    'Việc cứu luôn là một *việc*, không phải một lời. Gọi điện thuyết phục không phải việc cứu.'
  ],
  TN_KHOANH_KHAC: GV.TN_KHOANH_KHAC,
  TN_CAM_KET: GV.TN_CAM_KET,
  TN_CONG_PH: GV.TN_CONG_PH,
  TN_LUAT_PH: GV.TN_LUAT_PH,
  TN_HIEN_VAT_BANG: GV.TN_HIEN_VAT.map(function (r) { return [r.t, r.khi, r.ai, r.cach, r.vi]; }),
  TN_PHUC_HOI: GV.TN_PHUC_HOI,
  TN_PHAN_NAN: GV.TN_PHAN_NAN,
  TN_LUAT_PN: GV.TN_LUAT_PN,
  TN_NGHI: GV.TN_NGHI,
  TN_RA_DI: GV.TN_RA_DI,
  TN_DO_CAM: GV.TN_DO_CAM,

  /* nhóm 15 · giá trị và tăng trưởng */
  GT_GOI: GV.GT_GOI,
  GT_LUAT_GIA: GV.GT_LUAT_GIA,
  GT_CHONG: GV.GT_CHONG,
  GT_BAO_DAM: GV.GT_BAO_DAM,
  GT_KINH_TE: GV.GT_KINH_TE,
  GT_LUAT_KT: GV.GT_LUAT_KT,
  GT_PHEU: GV.GT_PHEU,
  GT_THONG_DIEP_L: GV.GT_THONG_DIEP.map(function (r) { return { t: r.t, n: r.n }; }),
  GT_PHAN_DOI: GV.GT_PHAN_DOI,
  GT_NHA_TRUONG: GV.GT_NHA_TRUONG,
  GT_NHAN_RONG: GV.GT_NHAN_RONG,
  GT_LOI_BAT_BIEN: GV.GT_LOI_BAT_BIEN,

  /* nhóm 16 · bằng chứng và tin cậy */
  TC_TANG_BC: GV.TC_TANG_BC.map(function (r) { return { so: r.so, t: r.t, n: r.n, v: r.v }; }),
  TC_CHI_SO: GV.TC_CHI_SO,
  TC_THIET_KE: GV.TC_THIET_KE,
  TC_LUAT_DO: GV.TC_LUAT_DO,
  TC_THEO_DOI: GV.TC_THEO_DOI,
  TC_LUAT_TD: GV.TC_LUAT_TD,
  TC_KIEM_DINH: GV.TC_KIEM_DINH,
  TC_BAO_VE: GV.TC_BAO_VE,
  TC_DU_LIEU: GV.TC_DU_LIEU,
  TC_KHUNG_HOANG: GV.TC_KHUNG_HOANG,
  TC_24H: GV.TC_24H,
  TC_PHAP_LY: GV.TC_PHAP_LY,
  TC_FAQ: GV.TC_FAQ,
  TC_SO_LOI: GV.TC_SO_LOI,
  TC_LOI_MAU: GV.TC_LOI_MAU,

  /* nhóm 17 · nhận diện thương hiệu */
  TH_NEN: GV.TH_NEN,
  TH_KHAC_BIET: GV.TH_KHAC_BIET,
  TH_KT_THAP: GV.TH_KIEN_TRUC.map(function (r) {
    return { ma: r.ma, t: r.t, toc: r.tang, giu: r.n, ai: 'Admin sản phẩm (R05) gác', chi: r.vd };
  }),
  TH_LUAT_TEN: GV.TH_LUAT_TEN,
  TH_AN_Y_NIEM: GV.TH_AN_Y_NIEM,
  TH_AN_BT_BANG: GV.TH_AN_BIEN_THE.map(function (r) { return [r.ma, r.t, r.n, r.dung, r.toi]; }),
  TH_AN_LUAT: GV.TH_AN_LUAT,
  TH_AN_SAI: GV.TH_AN_SAI,
  TH_MAU: GV.TH_MAU,
  TH_MAU_LUAT: GV.TH_MAU_LUAT,
  TH_CHU: GV.TH_CHU,
  TH_THANG_CHU: GV.TH_THANG_CHU,
  TH_HINH_DAO_DUC: GV.TH_HINH_DAO_DUC,
  TH_HINH_THAM_MY: GV.TH_HINH_THAM_MY,
  TH_HOA_TIET: GV.TH_HOA_TIET,
  TH_GIONG: GV.TH_GIONG,
  TH_GIONG_BANG: GV.TH_GIONG_BANG,
  TH_UNG_DUNG: GV.TH_UNG_DUNG,
  TH_TEP: GV.TH_TEP,
  TH_LUAT_GIU: GV.TH_LUAT_GIU,

  /* nhóm 18 · bản quyền và toàn cầu */
  BQ_RANH_GIOI: GV.BQ_RANH_GIOI,
  BQ_TAI_SAN: GV.BQ_TAI_SAN,
  BQ_QUYEN_TG: GV.BQ_QUYEN_TG,
  BQ_HO_SO_TG: GV.BQ_HO_SO_TG,
  BQ_DONG_DAU_TG: GV.BQ_DONG_DAU_TG,
  BQ_NHAN_HIEU: GV.BQ_NHAN_HIEU,
  BQ_NHOM_NICE: GV.BQ_NHOM_NICE,
  BQ_DE_AN: GV.BQ_DE_AN,
  BQ_CAU_TRUC_DA: GV.BQ_CAU_TRUC_DA,
  BQ_ANH_XA_PC: GV.BQ_ANH_XA_PC,
  BQ_ANH_XA_NL: GV.BQ_ANH_XA_NL,
  BQ_ANH_XA_LUAT: GV.BQ_ANH_XA_LUAT,
  BQ_QUOC_TE: GV.BQ_QUOC_TE,
  BQ_BAN_DIA: GV.BQ_BAN_DIA,
  BQ_TUAN_THU: GV.BQ_TUAN_THU,
  BQ_LO_TRINH: GV.BQ_LO_TRINH,
  BQ_CHONG: GV.BQ_CHONG,
  BQ_BANG_CHUNG: GV.BQ_BANG_CHUNG,

};
