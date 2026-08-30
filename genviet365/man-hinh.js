/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · ĐỊNH NGHĨA MÀN HÌNH
   Hai mươi tám nhóm · 167 màn. Mỗi màn là một danh sách KHỐI; lớp giao diện biết
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
      { v: 'vai-tro', t: 'Mười bảy vai', h: 'Ai làm gì trong hệ' },
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
    ]},
  { id: 'g19', no: '19', t: 'CẦM LÊN DÙNG ĐƯỢC', s: 'Thứ dùng được sáng mai, không phải mô tả', mau: '#0B7350',
    ds: [
      { v: 'bay-cau-hoi', t: 'Bảy câu hỏi bàn ăn', h: 'Thứ gửi gia đình trước khi bán gì' },
      { v: 'ban-doc-ca', t: 'Bản đọc ca một trang', h: 'Gia đình cầm về dù không mua' },
      { v: 'giao-an-buoi-1', t: 'Giáo án buổi 1 · từng phút', h: 'Chín mươi phút, có lời Coach nói' },
      { v: 'kich-ban-goi', t: 'Bốn kịch bản gọi điện', h: 'Mở đầu · ba câu giữa · kết · cấm gì' },
      { v: 'thu-mau', t: 'Năm lá thư mẫu', h: 'Có bản viết sẵn đọc thẳng được' },
      { v: 'ba-cuon-so', t: 'Ba cuốn sổ của học viên', h: 'Bản đồ 11 ô · Goal Map · sổ phục hồi' },
      { v: 'phong-van-coach', t: 'Phỏng vấn Coach', h: 'Mười hai câu · tìm gì · loại khi nào' },
      { v: 'bang-cham', t: 'Bảng chấm cổng chi tiết', h: 'Sáu cột mở ra thành thang mức' }
    ]},
  { id: 'g20', no: '20', t: 'TRA CỨU', s: 'Từ điển, chỉ mục, Sổ Chuẩn, bản đồ toàn hệ', mau: '#7A8CA3',
    ds: [
      { v: 'tu-dien', t: 'Từ điển thuật ngữ', h: 'Có cột tiếng Anh cho hồ sơ quốc tế' },
      { v: 'chi-muc', t: 'Chỉ mục', h: 'Sinh ra lúc chạy, không bao giờ lệch' },
      { v: 'so-chuan', t: 'Sổ Chuẩn', h: 'Mọi lần đổi chuẩn, không xoá dòng nào' },
      { v: 'ban-do-he', t: 'Bản đồ toàn hệ', h: 'Tám phần · mười đường đọc theo vai' },
      { v: 'so-cai-yc', t: 'Sổ cái yêu cầu', h: 'Mỗi yêu cầu một dòng · máy soi từng viện dẫn' },
      { v: 'so-cai-no', t: 'Món nợ số', h: 'Hứa bao nhiêu thì phải viết ra bấy nhiêu' }
    ]},
  { id: 'g21', no: '21', t: 'XƯƠNG SỐNG GEN VIỆT', s: 'Mười lăm giai đoạn và năm tuyến, rút từ tài liệu gốc', mau: '#BE0E16',
    ds: [
      { v: 'gv-dinh-vi', t: 'Định vị Gen Việt', h: 'Nguyên văn từ đề án gốc' },
      { v: 'gv-nam-tuyen', t: 'Năm tuyến vận hành', h: 'CLB · khối lớp · gia đình · xã hội · khởi nghiệp' },
      { v: 'gv-15-giai-doan', t: 'Mười lăm giai đoạn', h: 'Xương sống của cả năm tuyến' },
      { v: 'gv-pipeline', t: 'Pipeline năm cấp', h: 'Từ thành viên nền tới đại sứ' },
      { v: 'gv-anh-xa-bac', t: 'Hai thang và cách hoà giải', h: '15 giai đoạn là nội dung · 6 bậc là quyền' },
      { v: 'gv-nguon', t: 'Nguồn tài liệu gốc', h: 'Mười bốn nguồn trong kho GEN VIỆT' }
    ]},
  { id: 'g22', no: '22', t: 'TUYẾN CLB GEN VIỆT', s: 'Nơi em được trao vai thật và có người trông vào', mau: '#185AB4',
    ds: [
      { v: 'clb-muoi-cap', t: 'Mười cấp độ thành viên', h: 'Làm quen → Đại sứ hệ thống' },
      { v: 'clb-nang-luc', t: 'Chín nhóm năng lực', h: 'A · B · C · D · E · F1 → F4' },
      { v: 'clb-muoi-hai-ban', t: 'Mười hai Ban', h: 'Học sinh giữ ghế, có nhiệm kỳ' },
      { v: 'clb-nhip', t: 'Nhịp tuần và buổi sinh hoạt', h: 'Leadership Lab · Squad Sprint · bốn phần' },
      { v: 'clb-chu-ky', t: 'Bốn chu kỳ của một năm', h: 'Lead Self → Team → Project → Impact' },
      { v: 'clb-52-tuan', t: 'Năm mươi hai tuần chuyên đề', h: 'Đủ 52 tuần · chủ đề · mục tiêu · đầu ra' }
    ]},
  { id: 'g23', no: '23', t: 'TUYẾN MƯỜI HAI KHỐI LỚP', s: 'Nơi việc rèn đi vào đúng lứa tuổi', mau: '#5140B4',
    ds: [
      { v: 'khoi-nam-nhom', t: 'Năm nhóm cố định', h: 'Giữ nguyên suốt mười hai khối' },
      { v: 'khoi-muoi-hai', t: 'Mười hai khối lớp', h: '600 chuyên đề · mã GV<khối>.<nhóm>.<số>' }
    ]},
  { id: 'g24', no: '24', t: 'TUYẾN GIA ĐÌNH', s: 'Nơi thói quen được giữ khi không ai nhìn', mau: '#0B7350',
    ds: [
      { v: 'gd-chin-muoi-ngay', t: 'Chín mươi ngày bứt phá', h: 'Bốn giai đoạn · mười hai tuần' },
      { v: 'gd-nam-s', t: 'Văn hoá 5S và nhật ký', h: 'Sạch · Sắp xếp · Sẵn sàng · Sâu sắc · Sáng tạo' }
    ]},
  { id: 'g25', no: '25', t: 'TUYẾN HOẠT ĐỘNG XÃ HỘI', s: 'Nơi giá trị của em được người ngoài xác nhận', mau: '#BE0E16',
    ds: [
      { v: 'xh-du-an', t: 'Dự án phụng sự', h: 'Không có người thụ hưởng thì không tính' },
      { v: 'xh-su-kien', t: 'Sáu sự kiện trụ cột', h: 'Gen Việt Day · Awards · Camp' }
    ]},
  { id: 'g26', no: '26', t: 'TUYẾN KHỞI NGHIỆP VÀ CHUYÊN GIA', s: 'Nơi tài năng của em bắt đầu có nghề', mau: '#A8801F',
    ds: [
      { v: 'kn-sau-buoc', t: 'Sáu bước vào nghề', h: 'Chạm tài năng → hồ sơ hướng nghiệp' },
      { v: 'kn-de-tai', t: 'Mười đề tài nghiên cứu', h: 'GV-R1 → GV-R10 · đăng ký được cấp Sở' },
      { v: 'kn-thiet-ke', t: 'Thiết kế nghiên cứu', h: 'Có nhóm đối chứng, tối thiểu 6–12 tháng' }
    ]},
  { id: 'g27', no: '27', t: 'NHƯỢNG QUYỀN', s: 'Người khác cầm hệ này đi mở thì cầm gì', mau: '#0B7350',
    ds: [
      { v: 'nq-goi', t: 'Bốn gói nhượng quyền', h: 'Chi hội trường · Trung tâm · Vùng · Quốc gia' },
      { v: 'nq-dieu-kien', t: 'Điều kiện tiên quyết', h: 'Sáu nhóm · thiếu một nhóm là không xét' },
      { v: 'nq-chang', t: 'Hành trình 180 ngày', h: 'Thẩm định → công nhận · năm chặng' },
      { v: 'nq-dao-tao', t: 'Đào tạo và chứng nhận', h: 'Năm học phần · 96 giờ · có thi' },
      { v: 'nq-kiem-dinh', t: 'Kiểm định và chế tài', h: 'Sáu phần · 100 điểm · bốn mức' },
      { v: 'nq-phi', t: 'Cấu trúc phí', h: 'Bảy khoản · nói rõ khoản nào hoàn lại' },
      { v: 'nq-lanh-tho', t: 'Lãnh thổ và độc quyền', h: 'Độc quyền có điều kiện, xét lại mỗi năm' },
      { v: 'nq-hop-dong', t: 'Hợp đồng và bàn giao', h: 'Mười sáu điều khoản · ba lớp hồ sơ' },
      { v: 'nq-luat', t: 'Luật nhượng quyền', h: 'Mười hai luật · bảy điều từ chối' },
      { v: 'nq-faq', t: 'Câu hỏi thường gặp', h: 'Nhà trường · nhà đầu tư · gia đình' }
    ]},
  { id: 'g28', no: '28', t: 'TÌM THẤY ĐƯỢC VÀ ĐÁNG TIN', s: 'Để người cần hệ này tìm ra nó', mau: '#185AB4',
    ds: [
      { v: 'seo-nguyen-tac', t: 'Bảy nguyên tắc', h: 'Xếp hạng là hệ quả, không phải mục tiêu' },
      { v: 'seo-y-dinh', t: 'Bản đồ ý định tìm kiếm', h: 'Tám nhóm người · sáu cụm nội dung' },
      { v: 'seo-eeat', t: 'Bốn tín hiệu uy tín', h: 'E-E-A-T · và chỗ hệ này chứng minh từng cái' },
      { v: 'seo-ky-thuat', t: 'Mười hai hạng mục kỹ thuật', h: 'Thẻ, dữ liệu cấu trúc, tốc độ, tiếp cận' },
      { v: 'seo-phan-hoi', t: 'Hệ phản hồi năm sao', h: 'Sáu bước · không mua, không lọc trước' },
      { v: 'seo-do', t: 'Tám chỉ số phải đo', h: 'Đo theo cụm, không đo theo từ khoá đơn' },
      { v: 'seo-90', t: 'Chín mươi ngày đầu tiên', h: 'Nền → phủ ý định → dựng tin cậy' }
    ]},
  { id: 'g29', no: '29', t: 'HỆ MƯỜI CẤP ĐỘ', s: 'Một trăm chương trình huấn luyện, viết ra đủ', mau: '#5140B4',
    ds: [
      { v: 'cd-muoi-cap', t: 'Mười cấp độ và điều kiện đạt', h: 'Làm quen → Đại sứ hệ thống · 7 cột' },
      { v: 'cd-tram-ct', t: 'Một trăm chương trình', h: '1.1 → 10.10 · đủ, có thật trong nguồn' },
      { v: 'cd-nang-luc', t: 'Nhóm năng lực và Pin', h: 'A–F và F1–F4 · năm mức Pin' },
      { v: 'cd-chuan-ra', t: 'Chuẩn đầu ra bốn góc nhìn', h: 'Gia đình · nhà trường · CLB · chính em' },
      { v: 'cd-sop', t: 'Ba mươi quy trình chuẩn', h: 'SOP theo Ban · có chỉ tiêu và cách chấm' },
      { v: 'cd-quy-chuan', t: 'Bộ quy chuẩn CLB', h: 'Trang phục · giao tiếp · tác phong' }
    ]},
  { id: 'g30', no: '30', t: 'SÁCH MASTER GEN VIỆT', s: 'Hệ tư tưởng nền, lấy nguyên từ bản thảo của tác giả', mau: '#0B7350',
    ds: [
      { v: 'ms-loi-mo', t: 'Vì sao cần một bản đồ', h: 'Tám luận điểm mở đầu' },
      { v: 'ms-luan-diem', t: 'Mười bốn luận điểm nền', h: 'Câu hỏi sống còn của một đời người' },
      { v: 'ms-ba-chang', t: 'Ba chặng ba mươi năm', h: 'Gieo Hạt · Rèn Lửa · Bay Cao' },
      { v: 'ms-mo-thuc', t: 'Mười tám mô thức', h: 'MT-01 → MT-18 · bộ công cụ của sách' },
      { v: 'ms-rui-ro', t: 'Năm rủi ro chiến lược', h: 'Chính tác giả đặt tên cho chúng' },
      { v: 'ms-khung-sach', t: 'Khung sách và câu đáng trích', h: 'Bảy phần · hai mươi sáu câu' }
    ]},
  { id: 'g31', no: '31', t: 'CHUYÊN ĐỀ MƯỜI HAI KHỐI', s: 'Tám trăm năm mươi chuyên đề, viết ra đủ', mau: '#A8801F',
    ds: [
      { v: 'cde-nam-nhom', t: 'Năm nhóm theo tài liệu gốc', h: 'Tên gốc khác cách gọi đang lưu hành' },
      { v: 'cde-ma-hoa', t: 'Hai trăm năm mươi chuyên đề có mã', h: 'GV<khối>.<nhóm>.<số> · khối 1–5' },
      { v: 'cde-tai-nang', t: 'Sáu trăm chuyên đề tài năng', h: 'Lớp 1 → lớp 12 · có minh chứng đo được' },
      { v: 'cde-khung', t: 'Khung chuyên đề đầy đủ', h: 'Bốn mươi hai chuyên đề có khung chi tiết' },
      { v: 'cde-giao-an', t: 'Giáo án hai chuyên đề mẫu', h: 'Đủ hai tiết, từng pha, từng phút' },
      { v: 'cde-luat', t: 'Hai mươi luật biên soạn', h: 'Và bảy tuần giá trị' },
      { v: 'ga-khung', t: 'Khung cứng một buổi và một tiết', h: 'Cùng một khung, chỉ thay ba thứ' },
      { v: 'ga-khau-quyet', t: 'Hai mươi khẩu quyết', h: 'Hạt nhân của mỗi chuyên đề tiểu học' },
      { v: 'ga-buoi', t: 'Bảy mươi ba buổi đã soạn', h: 'Có mục tiêu, hoạt động, đầu ra' },
      { v: 'ga-hoat-dong', t: 'Ngân hàng ba mươi hai hoạt động', h: 'Chơi được ngay · rèn gì thì ghi rõ' },
      { v: 'ga-hoc-ky', t: 'Mười lăm tuần một học kỳ', h: 'Và mười bốn biểu mẫu đi kèm' }
    ]},
  { id: 'g32', no: '32', t: 'CẨM NANG VẬN HÀNH CHI TIẾT', s: 'Chạy được một buổi và một nhiệm kỳ', mau: '#9E470D',
    ds: [
      { v: 'vh-so-do', t: 'Sơ đồ tổ chức và ba bộ tên', h: 'Nguồn mâu thuẫn — đã đối chiếu công khai' },
      { v: 'vh-truoc-trong-sau', t: 'Trước · trong · sau một buổi', h: '57 mốc · từ tối Chủ nhật tới bàn giao' },
      { v: 'vh-ban12', t: 'Nhiệm vụ mười hai Ban', h: 'Hằng tuần · hằng tháng · không được làm' },
      { v: 'vh-raci-kpi', t: 'RACI và bộ chỉ số', h: '15 đầu việc · 16 chỉ số có ngưỡng' },
      { v: 'vh-canh-bao', t: 'Mười lăm cảnh báo sớm', h: 'Cờ Vàng 7 ngày · Cờ Đỏ 24 giờ' },
      { v: 'vh-bieu-mau', t: 'Hai mươi biểu mẫu', h: 'BM-01 → BM-20 · ai giữ, nhịp nào' }
    ]},
  { id: 'g33', no: '33', t: 'TRẠI VÀ HỌC VIỆN VIP', s: 'Leader Boom · chương trình điều hành · tham chiếu Nhật Bản', mau: '#BE0E16',
    ds: [
      { v: 'tr-bay-ngay', t: 'Bảy ngày Leader Boom', h: 'Thức tỉnh → bàn giao · từng ngày một cổng' },
      { v: 'tr-lich-hau', t: 'Lịch ngày một và hậu trại', h: '20 khối giờ · sáu mốc hậu trại 90 ngày' },
      { v: 'tr-an-toan', t: 'Mười ba điều an toàn trại', h: 'Chỗ tài liệu gốc mỏng nhất — nói rõ' },
      { v: 'tr-vip', t: 'Học viện Gen Việt VIP', h: 'Mười bước · chuẩn vào ra · quyền và nghĩa vụ' },
      { v: 'tr-bukatsu', t: 'Tham chiếu Bukatsu', h: 'Tài liệu gốc đã bị thay chữ — đã ghi rõ' }
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
'vai-tro': { q: 'chung', k: 'Lớp L4', t: 'Mười bảy vai của hệ',
  p: 'Mười bảy vai, xếp theo việc chứ không theo cấp. Bảng phân quyền ở nhóm 11 nói cùng mười bảy vai ấy nhưng xếp theo bậc quyền.',
  khoi: [
    { k: 'vai', tu: 'VAI_NHOM' },
    { k: 'van', t: 'Bảng trên *sinh ra từ chính bảng phân quyền* ở nhóm 11 — cùng mười bảy vai ấy, chỉ xếp theo việc thay vì theo bậc quyền. Hai bảng không lệch nhau được, vì chúng là một.' },
    { k: 'van', t: 'Vai *Mentor (bậc 5)* là vai quan trọng nhất trong hệ: nó là cửa duy nhất để sản phẩm của hệ trở thành lực lượng của hệ. Không có vai này, hệ số tự tái tạo vĩnh viễn bằng không.' },
    { k: 'muc', t: 'Ba vai ngoài hệ' },
    { k: 'van', t: 'Ba vai có thật trong tổ chức nhưng *không có tài khoản*, nên không nằm trong bảng phân quyền. Tách hẳn ra để không ai phải đoán vì sao đếm vai lại ra hai con số khác nhau.' },
    { k: 'vai', tu: 'VAI_NGOAI_NHOM' }
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
    { k: 'muc', t: 'Mười luật dùng ấn' },
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
    { k: 'muc', t: 'Bảy luật dùng màu' },
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
,

/* ══════════ NHÓM 19 · CẦM LÊN DÙNG ĐƯỢC ══════════ */
'bay-cau-hoi': { q: 'chung', k: 'Cầm tay', t: 'Bảy câu hỏi bàn ăn',
  p: 'Thứ gửi cho gia đình ở chặng đầu tiên, trước khi bán bất cứ thứ gì. Phải dùng được cả khi họ không bao giờ mua.',
  khoi: [
    { k: 'van', t: 'In hai trang, đưa tận tay. Đây là thứ duy nhất trong cả hệ được phát cho người *chưa* là gia đình của mình — nên nó phải đủ tốt để đứng một mình.' },
    { k: 'baycau', tu: 'CT_BAY_CAU' },
    { k: 'muc', t: 'Bảy luật khi dùng' },
    { k: 'luat', tu: 'CT_BAY_LUAT' },
    { k: 'trich', t: 'Hỏi xong thì im lặng đếm tới bảy. Phần lớn người lớn chịu không nổi bốn giây im lặng — và chính bốn giây ấy là chỗ trẻ bắt đầu nói thật.', n: 'Luật thứ hai, và là luật khó giữ nhất' }
  ]},

'ban-doc-ca': { q: 'tu_van', k: 'Cầm tay', t: 'Bản đọc ca một trang',
  p: 'Thứ gia đình cầm về sau buổi tư vấn đầu tiên, dù họ không mua gì. Bảy mục, đúng một trang.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'CT_DOC_CA' },
    { k: 'muc', t: 'Sáu luật viết bản đọc ca' },
    { k: 'luat', tu: 'CT_DOC_CA_LUAT' },
    { k: 'trich', t: 'Mục 7 — “điều chưa đủ dữ liệu để nói” — là mục bắt buộc. Trang nào không có mục ấy là trang đã kết luận vượt quá thứ mình biết.', n: 'Luật thứ tư' }
  ]},

'giao-an-buoi-1': { q: 'nghe_chung', k: 'Cầm tay', t: 'Giáo án buổi 1 khoá nền · chín mươi phút',
  p: 'Chạy được từng phút. Chỗ nào cần nói đúng lời thì đã ghi nguyên văn, và mỗi khối có một dấu hiệu để biết buổi đang hỏng.',
  khoi: [
    { k: 'van', t: 'Giáo án này là *bản mẫu*, không phải bản duy nhất. Nhưng ba thứ trong nó thì không đổi được: đón từng người ở cửa, trao huy hiệu thành nghi thức, và tiễn ra cửa. Bỏ ba thứ đó thì còn lại là một lớp học bình thường.' },
    { k: 'giaoan', tu: 'CT_GIAO_AN' },
    { k: 'muc', t: 'Dụng cụ phải có sẵn trước giờ' },
    { k: 'ds', tu: 'CT_GIAO_AN_DUNG' },
    { k: 'trich', t: 'Danh sách chi tiết riêng của từng em — Coach học thuộc TRƯỚC buổi, không mang theo đọc.', n: 'Dụng cụ cuối cùng, và là thứ quyết định ba mươi giây đầu tiên' }
  ]},

'kich-ban-goi': { q: 'nghe_chung', k: 'Cầm tay', t: 'Bốn kịch bản gọi điện',
  p: 'Hệ hứa nhiều cuộc gọi trong bảng cam kết dịch vụ. Đây là nội dung của chúng.',
  khoi: [
    { k: 'kichban', tu: 'CT_KICH_BAN' },
    { k: 'muc', t: 'Sáu luật gọi' },
    { k: 'luat', tu: 'CT_GOI_LUAT' },
    { k: 'trich', t: 'Gọi, không nhắn. Việc nào nhắn tin được thì không cần kịch bản.', n: 'Luật thứ nhất' }
  ]},

'thu-mau': { q: 'nghe_chung', k: 'Cầm tay', t: 'Năm lá thư mẫu',
  p: 'Mỗi thư có cấu trúc và một bản viết sẵn — đọc thẳng được, sửa tên là gửi.',
  khoi: [
    { k: 'van', t: 'Bản viết sẵn để làm mẫu *nhịp và độ dài*, không phải để chép. Chép nguyên si thì phụ huynh thứ hai sẽ nhận ra, và lúc ấy mất nhiều hơn được.' },
    { k: 'thumau', tu: 'CT_THU' },
    { k: 'trich', t: 'Thư tay của Coach: tuyệt đối không in. Chữ xấu vẫn hơn chữ máy. Và không viết cùng một nội dung cho hai em.', n: 'Thư T-2' }
  ]},

'ba-cuon-so': { q: 'kh_hanh_trinh', k: 'Cầm tay', t: 'Ba cuốn sổ của học viên',
  p: 'Bản đồ cá nhân mười một ô · Goal Map · sổ phục hồi. Ba cuốn này là nơi bằng chứng của trục G1 và I6 thật sự sinh ra.',
  khoi: [
    { k: 'muc', t: 'Bản đồ cá nhân mười một ô' },
    { k: 'van', t: 'Viết lần đầu ở buổi 3 khoá nền, rồi viết lại mỗi 90 ngày. *Giữ cả bản cũ* — đọc hai bản cạnh nhau là bằng chứng mạnh nhất của cả một chu kỳ.' },
    { k: 'bang', cot: ['Ô', 'Câu hỏi trong ô', 'Vì sao có ô này'], tu: 'CT_BAN_DO_11' },
    { k: 'muc', t: 'Goal Map — sáu ô' },
    { k: 'luoi', c: 2, tu: 'CT_GOAL_MAP' },
    { k: 'muc', t: 'Sổ phục hồi — năm ô' },
    { k: 'luoi', c: 2, tu: 'CT_SO_PHUC_HOI' },
    { k: 'muc', t: 'Sáu luật của ba cuốn sổ' },
    { k: 'luat', tu: 'CT_SO_LUAT' },
    { k: 'trich', t: 'Mục đích không phải là không vấp. Mục đích là quay lại nhanh hơn lần trước — và đó là con số duy nhất Coach hỏi về sổ phục hồi.', n: 'Ô thứ tư của sổ phục hồi' }
  ]},

'phong-van-coach': { q: 'nghe_quan_ly', k: 'Cầm tay', t: 'Mười hai câu phỏng vấn Coach',
  p: 'Mỗi câu ghi rõ đang tìm gì, dấu hiệu nhận, và dấu hiệu loại.',
  khoi: [
    { k: 'bang', cot: ['Câu hỏi', 'Đang tìm gì', 'Dấu hiệu nhận', 'Dấu hiệu loại'], tu: 'CT_PHONG_VAN' },
    { k: 'muc', t: 'Sáu luật phỏng vấn' },
    { k: 'luat', tu: 'CT_PV_LUAT' },
    { k: 'trich', t: 'Câu 11 là câu loại thẳng: trả lời sai câu ấy thì dừng, không xét tiếp, dù mọi câu khác đều tốt.', n: 'Câu về ranh giới an toàn' }
  ]},

'bang-cham': { q: 'nghiem_thu', k: 'Cầm tay', t: 'Bảng chấm cổng nghiệm thu chi tiết',
  p: 'Sáu cột của cổng 100 điểm, mở ra thành thang chấm từng mức. Người chấm không cần biết em ấy là ai.',
  khoi: [
    { k: 'cham', tu: 'CT_CHAM', nguong: 85 },
    { k: 'muc', t: 'Sáu luật chấm' },
    { k: 'luat', tu: 'CT_CHAM_LUAT' },
    { k: 'trich', t: 'Không có bằng chứng cho một mức thì lấy mức thấp hơn. Không “cho thêm vì em ấy cố gắng”.', n: 'Luật thứ hai' }
  ]},

/* ══════════ NHÓM 20 · TRA CỨU ══════════ */
'tu-dien': { q: 'chung', k: 'Tra cứu', t: 'Từ điển thuật ngữ',
  p: 'Cột tiếng Anh không phải bản dịch marketing — nó là bản giải nghĩa để dùng trong hồ sơ quốc tế.',
  khoi: [
    { k: 'tudien', tu: 'TC_TU_DIEN' },
    { k: 'muc', t: 'Năm luật dùng từ' },
    { k: 'luat', tu: 'TC_TU_LUAT' },
    { k: 'trich', t: 'Một khái niệm — một tên. Thấy hai tên cho cùng một thứ thì chọn một và sửa hết, không để song song.', n: 'Luật thứ năm' }
  ]},

'chi-muc': { q: 'chung', k: 'Tra cứu', t: 'Chỉ mục',
  p: 'Toàn bộ màn xếp theo chữ cái. Sinh ra lúc chạy từ chính kho, nên không bao giờ lệch với hệ.',
  khoi: [
    { k: 'chimuc' }
  ]},

'so-chuan': { q: 'qt_noi_dung', k: 'Tra cứu', t: 'Sổ Chuẩn',
  p: 'Sổ ghi mọi lần chuẩn của hệ bị đổi. Không có sổ này thì bảy nguyên lý bất biến chỉ bất biến trên lời nói.',
  khoi: [
    { k: 'van', t: 'Sổ Chuẩn được nhắc tám lần khắp hệ trước khi nó được định nghĩa ở đây. Đó là một món nợ, và màn này trả nợ ấy.' },
    { k: 'luoi', c: 2, tu: 'TC_SO_CHUAN_LA' },
    { k: 'muc', t: 'Tám cột của sổ' },
    { k: 'bang', cot: ['Cột', 'Ghi gì', 'Chỗ hay sai'], tu: 'TC_SO_CHUAN_COT' },
    { k: 'muc', t: 'Năm dòng đầu tiên' },
    { k: 'van', t: 'Năm dòng dưới đây là những quyết định chuẩn đã có trong quá trình dựng hệ. Dòng SC-2026-004 là dòng sinh ra từ một lỗi thật, và đó là loại dòng có giá trị nhất trong cả sổ.' },
    { k: 'bang', cot: ['Số hiệu', 'Lớp', 'Đổi gì', 'Vì sao', 'Đã thử gì trước khi quyết', 'Trỏ về'], tu: 'TC_SO_CHUAN_MAU' },
    { k: 'trich', t: 'Cột “đã thử gì trước khi quyết” là cột bắt buộc. Không có cột ấy thì dòng không được ghi — đó là hàng rào chống việc đổi chuẩn theo cảm giác.', n: 'Điều bắt buộc' }
  ]},

'ban-do-he': { q: 'chung', k: 'Tra cứu', t: 'Bản đồ toàn hệ',
  p: 'Hai mươi nhóm gom thành tám phần, và mười đường đọc — mỗi vai một đường.',
  khoi: [
    { k: 'van', t: 'Không ai đọc hai mươi nhóm theo thứ tự, và cũng không nên. Bảng dưới gom chúng thành tám phần theo *việc*, không theo số thứ tự.' },
    { k: 'luoi', c: 2, tu: 'TC_BAN_DO_L' },
    { k: 'muc', t: 'Mười đường đọc' },
    { k: 'bang', cot: ['Bạn là ai', 'Đọc theo thứ tự', 'Vì sao thứ tự này'], tu: 'TC_DUONG_DOC' },
    { k: 'trich', t: 'Nếu chỉ có mười phút thì đọc nhóm 19. Đó là phần dùng được sáng mai.', n: 'Phần TAY' }
  ]}
,

/* ══════════ NHÓM 21 · XƯƠNG SỐNG GEN VIỆT ══════════ */
'gv-dinh-vi': { q: 'chung', k: 'Xương sống', t: 'Định vị Gen Việt',
  p: 'Tám dòng dưới đây lấy nguyên văn từ đề án gốc trong kho tài liệu của Học viện. Không diễn giải lại, không làm hay hơn.',
  khoi: [
    { k: 'van', t: 'Toàn bộ nhóm 21 tới 26 được rút từ *sáu mươi lăm tệp* trong thư mục GEN VIỆT của Học viện GITA, đọc ngày 30 tháng 8 năm 2026. Nguồn của từng phần ghi ở màn cuối nhóm này.' },
    { k: 'luoi', c: 2, tu: 'TY_DINH_VI' },
    { k: 'trich', t: 'Rèn Luyện — Hun Đúc — Trưởng Thành — Tài Năng Việt. Bốn nhịp, đúng thứ tự: rèn trước, tài năng sau.', n: 'Giá trị cốt lõi' }
  ]},

'gv-nam-tuyen': { q: 'chung', k: 'Xương sống', t: 'Năm tuyến vận hành',
  p: 'Năm tuyến không phải năm chương trình song song. Chúng là năm môi trường mà cùng một học sinh đi qua cùng mười lăm giai đoạn.',
  khoi: [
    { k: 'tuyen', tu: 'TY_TUYEN' },
    { k: 'muc', t: 'Bảy luật của năm tuyến' },
    { k: 'luat', tu: 'TY_LUAT_TUYEN' },
    { k: 'trich', t: 'Tuyến CLB là trục chính — nơi ghi nhận và xét cấp. Bốn tuyến còn lại cung cấp bằng chứng.', n: 'Luật thứ ba' }
  ]},

'gv-15-giai-doan': { q: 'chung', k: 'Xương sống', t: 'Mười lăm giai đoạn Gen Việt',
  p: 'Sáu giai đoạn đầu là nền Thân — Tâm — Trí — Văn — Thể — Mĩ. Ba giai đoạn giữa là cách học. Hai giai đoạn sau là kết quả và giá trị. Bốn giai đoạn cuối là bộ công cụ làm nên người dẫn.',
  khoi: [
    { k: 'van', t: 'Đây là *xương sống thật* của hệ, rút từ “Mô hình 15 giai đoạn Gen Việt trong phát triển toàn diện học sinh THCS”. Mỗi giai đoạn là một chu kỳ 90 ngày có mục tiêu đo được, ba mốc, và công cụ đo.' },
    { k: 'giaidoan', tu: 'TY_GIAI_DOAN' },
    { k: 'trich', t: 'Mỗi ngày chỉ cần tiến lên một phần trăm so với hôm qua. Chín mươi ngày sau, con sẽ là một phiên bản khác.', n: 'Thông điệp chủ đạo của mọi giai đoạn' }
  ]},

'gv-pipeline': { q: 'chung', k: 'Xương sống', t: 'Pipeline năm cấp',
  p: 'Gen Việt không phải câu lạc bộ phong trào. Nó là hệ thống chọn — rèn — nâng — trao vai, chạy trên mười lăm giai đoạn.',
  khoi: [
    { k: 'thap', tu: 'TY_PIPELINE_T' },
    { k: 'van', t: 'Cách kể pipeline này cho nhà trường và cho Sở: *có lộ trình rõ từ học sinh bình thường tới học sinh nòng cốt tới cán bộ gương mẫu.* Đó là điều một hồ sơ đề án cần chứng minh, và là điều một CLB phong trào không chứng minh được.' },
    { k: 'trich', t: 'Tuyến Khởi nghiệp mở từ cấp 3 của pipeline — Động lực nhân tài. Mở sớm hơn là bắt trẻ chạy trước khi đứng vững.', n: 'Ranh giới của pipeline' }
  ]},

'gv-nguon': { q: 'chung', k: 'Xương sống', t: 'Nguồn tài liệu gốc',
  p: 'Mười bốn nguồn trong thư mục GEN VIỆT, và phần nào của hệ được rút từ nguồn nào.',
  khoi: [
    { k: 'bang', cot: ['Tài liệu gốc', 'Rút ra gì', 'Vào tuyến nào'], tu: 'TY_NGUON' },
    { k: 'van', t: 'Kho gốc còn có giáo án chi tiết từng buổi cho khối 2 tới khối 5, bốn bản Master Gen Việt, bộ slide CLB, bộ quy chuẩn, và tệp nén Gita hơn 600 MB chưa mở. Những phần ấy *chưa* được đưa vào hệ này — đây là chỗ còn mở rộng được.' },
    { k: 'trich', t: 'Phần nào của hệ không dẫn được về một nguồn trong bảng trên thì phần ấy là suy diễn, không phải tài liệu.', n: 'Luật của nhóm 21' }
  ]},

/* ══════════ NHÓM 22 · TUYẾN CLB ══════════ */
'clb-muoi-cap': { q: 'chung', k: 'Tuyến CLB', t: 'Mười cấp độ thành viên',
  p: 'Mỗi cấp có mười chương trình huấn luyện riêng — một trăm chương trình cho cả lộ trình. Lên cấp bằng tiêu chí, không bằng thời gian.',
  khoi: [
    { k: 'bang', cot: ['Cấp', 'Tên cấp độ', 'Vào từ đâu', 'Tiêu chí xét lên cấp', 'Chiến lược đào tạo'], tu: 'TY_CLB_CAP' },
    { k: 'van', t: 'Mỗi cấp còn có một *bảng chuẩn đầu ra bốn góc nhìn*: gia đình thấy gì, thầy cô thấy gì, ban điều hành thấy gì, nhà trường thấy gì. Bốn góc nhìn ấy là cách kiểm chéo — một cấp độ chỉ thật khi cả bốn phía đều thấy được thay đổi.' },
    { k: 'trich', t: 'Cấp 10 chọn lọc rất ít, huấn luyện trực tiếp bởi Hội đồng, và có cơ chế thu hồi danh hiệu. Danh hiệu giữ được là danh hiệu có thể mất.', n: 'Cấp cao nhất' }
  ]},

'clb-nang-luc': { q: 'chung', k: 'Tuyến CLB', t: 'Chín nhóm năng lực',
  p: 'Năm nhóm nền A tới E cho cấp 1 tới 6. Bốn nhóm F cho tầng lãnh đạo, cấp 7 tới 10.',
  khoi: [
    { k: 'bang', cot: ['Mã', 'Nhóm năng lực', 'Rèn ở cấp nào', 'Biểu hiện'], tu: 'TY_CLB_NL' },
    { k: 'trich', t: 'Cấp 10 đòi điểm F1–F4 trung bình từ 4.7 trở lên, và không tiêu chí lõi nào dưới 4.5. Trung bình cao mà có một chỗ thủng thì vẫn không đạt.', n: 'Vì sao bốn nhóm F đo riêng' }
  ]},

'clb-muoi-hai-ban': { q: 'chung', k: 'Tuyến CLB', t: 'Mười hai Ban của chi hội',
  p: 'Học sinh giữ ghế, có nhiệm kỳ, có bàn giao. Giáo viên và cố vấn đứng sau, không đứng thay.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'TY_CLB_BAN' },
    { k: 'van', t: 'Trên mười hai Ban là *Hội đồng Tinh Hoa Gen Việt* — chuyên gia GITA, đại diện Ban Giám hiệu, CLB Đoàn Thị Điểm, và doanh nghiệp đồng hành. Hội đồng bảo trợ tầm nhìn và có quyền tạm dừng một chiến dịch nếu thấy rủi ro uy tín.' },
    { k: 'trich', t: 'Ban Bàn Chân Việt là ban ít được nhắc tên nhất và thiếu thì hỏng nhanh nhất.', n: 'Ghi chú về hậu cần' }
  ]},

'clb-nhip': { q: 'chung', k: 'Tuyến CLB', t: 'Nhịp tuần và buổi sinh hoạt',
  p: 'Sinh hoạt hai buổi mỗi tháng theo cấu trúc bốn phần cố định, cộng nhịp tuần năm cấu phần.',
  khoi: [
    { k: 'muc', t: 'Bốn phần của một buổi' },
    { k: 'bang', cot: ['Phần', 'Nội dung', 'Thời lượng', 'Làm gì', 'Ai giữ'], tu: 'TY_CLB_BUOI' },
    { k: 'muc', t: 'Năm cấu phần của một tuần' },
    { k: 'luoi', c: 2, tu: 'TY_CLB_TUAN' },
    { k: 'van', t: 'Nhịp tuần này là chỗ *tuyến CLB nối vào tuyến Gia đình*: phần “rèn luyện tại nhà bảy ngày” do gia đình giữ, và nhật ký tối thiểu năm trên bảy ngày là điều kiện để tính tuần ấy có tham gia.' },
    { k: 'trich', t: 'Đôi bạn cùng tiến là cơ chế rẻ nhất và hiệu quả nhất trong mọi cách giữ nhịp.', n: 'Cấu phần thứ tư' }
  ]},

/* ══════════ NHÓM 23 · TUYẾN MƯỜI HAI KHỐI LỚP ══════════ */
'khoi-nam-nhom': { q: 'chung', k: 'Tuyến khối lớp', t: 'Năm nhóm cố định',
  p: 'Năm nhóm này giữ nguyên suốt mười hai khối. Chỉ đổi độ khó và bối cảnh, không đổi tên nhóm.',
  khoi: [
    { k: 'ly', tu: 'TY_KHOI_NHOM_L' },
    { k: 'van', t: 'Mỗi khối có *năm nhóm × mười chuyên đề = năm mươi chuyên đề*. Toàn tuyến mười hai khối là **sáu trăm chuyên đề**, mã hoá `GV<khối>.<nhóm>.<số>` — ví dụ `GV1.2.07` là khối 1, nhóm 2, chuyên đề 7: “Ngủ đúng giờ — não thông minh cần ngủ”.' },
    { k: 'trich', t: 'Nhóm 4 lấy chất liệu từ Thư viện Gen Việt: mỗi chân dung phải dẫn tới một việc học viên làm được trong tuần.', n: 'Chỗ hai hệ nối vào nhau' }
  ]},

'khoi-muoi-hai': { q: 'chung', k: 'Tuyến khối lớp', t: 'Mười hai khối lớp',
  p: 'Từ nề nếp và kỷ luật vui ở khối 1, tới hội tụ và bàn giao thế hệ ở khối 12.',
  khoi: [
    { k: 'bang', cot: ['Khối', 'Trọng tâm', 'Cấp học', 'Sản phẩm đặc trưng', 'Ghi chú'], tu: 'TY_KHOI_12' },
    { k: 'muc', t: 'Sáu luật của tuyến khối lớp' },
    { k: 'luat', tu: 'TY_KHOI_LUAT' },
    { k: 'trich', t: 'Mỗi chuyên đề là một việc làm được, không phải một bài giảng. Không có chuyên đề nào chỉ để nghe.', n: 'Luật thứ ba' }
  ]},

/* ══════════ NHÓM 24 · TUYẾN GIA ĐÌNH ══════════ */
'gd-chin-muoi-ngay': { q: 'kh_gia_dinh', k: 'Tuyến gia đình', t: 'Chín mươi ngày bứt phá',
  p: 'Bốn giai đoạn, mười hai tuần. Rèn luyện hằng ngày, phản tư mỗi tuần, thử thách theo tháng.',
  khoi: [
    { k: 'nam', tu: 'TY_GD_90_N' },
    { k: 'muc', t: 'Ba danh hiệu cuối chặng' },
    { k: 'bang', cot: ['Danh hiệu', 'Cho ai', 'Bằng chứng'], tu: 'TY_GD_DANH_HIEU' },
    { k: 'trich', t: 'Chỉ số quan trọng nhất không phải số ngày làm được, mà là thời gian quay lại sau khi đứt nhịp.', n: 'Điều gia đình hay đo sai' }
  ]},

'gd-nam-s': { q: 'kh_gia_dinh', k: 'Tuyến gia đình', t: 'Văn hoá 5S và nhật ký',
  p: 'Năm chữ S đo được hằng ngày, và một cuốn nhật ký ba phút.',
  khoi: [
    { k: 'bang', cot: ['Chữ S', 'Hành động cụ thể', 'Cách đo'], tu: 'TY_GD_5S' },
    { k: 'muc', t: 'Bốn nhịp ghi chép' },
    { k: 'luoi', c: 2, tu: 'TY_GD_NHAT_KY' },
    { k: 'muc', t: 'Năm luật của tuyến gia đình' },
    { k: 'luat', tu: 'TY_GD_LUAT' },
    { k: 'trich', t: 'Người lớn không ghi hộ nhật ký, không làm hộ danh mục 5S. Làm hộ là xoá luôn mục đích.', n: 'Luật thứ hai' }
  ]},

/* ══════════ NHÓM 25 · TUYẾN HOẠT ĐỘNG XÃ HỘI ══════════ */
'xh-du-an': { q: 'chung', k: 'Tuyến xã hội', t: 'Dự án phụng sự',
  p: 'Tuyến duy nhất mà bằng chứng do người ngoài hệ ký. Vì thế nó nặng nhất khi xét cấp.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'TY_XH_DU_AN' },
    { k: 'muc', t: 'Sáu luật của tuyến xã hội' },
    { k: 'luat', tu: 'TY_XH_LUAT' },
    { k: 'trich', t: 'Không dự án nào được tính nếu không nêu được người thụ hưởng cụ thể và tác động cụ thể.', n: 'Luật thứ hai' }
  ]},

'xh-su-kien': { q: 'chung', k: 'Tuyến xã hội', t: 'Sáu sự kiện trụ cột',
  p: 'Ba sự kiện lớn mỗi năm, cộng ba dịp mở rộng ra ngoài phạm vi một trường.',
  khoi: [
    { k: 'bang', cot: ['Sự kiện', 'Là gì', 'Khi nào', 'Quy mô', 'Vì sao có'], tu: 'TY_XH_SU_KIEN' },
    { k: 'trich', t: 'Toạ đàm “Người Thắp Sáng Gen Việt” là buổi duy nhất trong năm mà học sinh, phụ huynh và cựu thành viên cùng ngồi một chỗ.', n: 'Sự kiện dễ bỏ nhất và đáng giữ nhất' }
  ]},

/* ══════════ NHÓM 26 · TUYẾN KHỞI NGHIỆP VÀ CHUYÊN GIA ══════════ */
'kn-sau-buoc': { q: 'nghe_chung', k: 'Tuyến khởi nghiệp', t: 'Sáu bước vào nghề',
  p: 'Từ chạm tài năng tới một hồ sơ hướng nghiệp dùng được cho học bổng và tuyển sinh.',
  khoi: [
    { k: 'buocso', tu: 'TY_KN_NGHE' },
    { k: 'muc', t: 'Sáu luật của tuyến khởi nghiệp' },
    { k: 'luat', tu: 'TY_KN_LUAT' },
    { k: 'trich', t: 'Bước Task là bắt buộc: gặp mentor và tham quan mà không nhận việc thật thì mới đi được hai phần ba.', n: 'Về Talk — Tour — Task' }
  ]},

'kn-de-tai': { q: 'nghiem_thu', k: 'Tuyến khởi nghiệp', t: 'Mười đề tài nghiên cứu ứng dụng',
  p: 'Mỗi đề tài có sản phẩm dùng được ngay cho CLB, và đăng ký được cấp trường, cấp Sở hoặc cấp Bộ.',
  khoi: [
    { k: 'bang', cot: ['Mã', 'Tên đề tài', 'Mục tiêu chính', 'Sản phẩm ứng dụng'], tu: 'TY_KN_DE_TAI' },
    { k: 'van', t: 'Ba đề tài chủ lực cầm lên viết đề án được ngay: **GV-R1** kiểm chứng mô hình 15 giai đoạn · **GV-R2** đo bốn yếu tố bứt phá · **GV-R6** năng lực số và AI. Bảng ánh xạ sang Chương trình giáo dục phổ thông 2018 ở nhóm 18 là phần bắt buộc kèm theo mọi hồ sơ.' },
    { k: 'trich', t: 'Mọi đề tài phải có sản phẩm ứng dụng trực tiếp cho CLB — không làm nghiên cứu để lấy giấy.', n: 'Luật thứ hai của tuyến' }
  ]},

'kn-thiet-ke': { q: 'nghiem_thu', k: 'Tuyến khởi nghiệp', t: 'Thiết kế nghiên cứu',
  p: 'Khung dùng chung cho cả mười đề tài. Thay biến là ra một hồ sơ mới.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'TY_KN_THIET_KE' },
    { k: 'van', t: 'Khung này nối thẳng vào nhóm 16 — ba tầng bằng chứng và tám chỉ số đo được ngoài hệ — và vào nhóm 18, phần ánh xạ sang chuẩn quốc gia. Một hồ sơ đề tài đủ mạnh là hồ sơ có cả ba: thiết kế đúng, bằng chứng tầng ba, và ngôn ngữ chuẩn quốc gia.' },
    { k: 'trich', t: 'Không có nhóm đối chứng thì mọi con số chỉ là mô tả, không phải bằng chứng.', n: 'Dòng đầu tiên của khung' }
  ]},

/* ══════════ NHÓM 27 · NHƯỢNG QUYỀN ══════════ */
'nq-goi': { q: 'tu_van', k: 'Nhượng quyền', t: 'Bốn gói nhượng quyền',
  p: 'Bốn gói không khác nhau ở chất lượng, chỉ khác nhau ở phạm vi. Gói nhỏ nhất cũng phải qua đúng năm chặng và đúng ngưỡng kiểm định như gói lớn nhất.',
  khoi: [
    { k: 'goi', tu: 'NQ_GOI' },
    { k: 'muc', t: 'Được trao gì và không được trao gì' },
    { k: 'van', t: 'Phần lớn tranh chấp nhượng quyền trên thị trường bắt đầu ở chỗ hai bên hiểu khác nhau về *cái đã được trao*. Bảng dưới đây viết ra để không còn chỗ hiểu khác.' },
    { k: 'bang', cot: ['Hạng mục', 'Được trao', 'Không được trao', 'Vì sao'], tu: 'NQ_TRAO' },
    { k: 'trich', t: 'Tên là tài sản chung của cả hệ. Một điểm làm hỏng tên thì mọi điểm cùng chịu.', n: 'Dòng đầu bảng trao quyền' }
  ]},

'nq-dieu-kien': { q: 'dh_toan_he', k: 'Nhượng quyền', t: 'Điều kiện tiên quyết',
  p: 'Sáu nhóm điều kiện. Không có nhóm nào được bù bằng nhóm khác — đủ tiền không bù được thiếu người, và đủ người không bù được thiếu giấy tờ pháp lý.',
  khoi: [
    { k: 'moc', tu: 'NQ_DIEU_KIEN' },
    { k: 'van', t: 'Nhóm cuối cùng — *ý định* — là nhóm duy nhất không đo được bằng hồ sơ, và cũng là nhóm loại nhiều hồ sơ nhất. Một đơn vị đủ tiền, đủ người, đủ giấy mà trả lời câu "mở cái này để làm gì trong mười năm" bằng một con số doanh thu thì hồ sơ dừng ở đó.' },
    { k: 'trich', t: 'Quyền trao cho một người, không trao cho một địa chỉ.', n: 'Luật nhượng quyền thứ nhất' }
  ]},

'nq-chang': { q: 'dh_toan_he', k: 'Nhượng quyền', t: 'Hành trình 180 ngày mở một điểm',
  p: 'Năm chặng, sáu tháng, không rút gọn cho ai. Mỗi chặng có một cổng, và cổng chỉ có hai trạng thái: qua hoặc chưa qua.',
  khoi: [
    { k: 'chang', tu: 'NQ_CHANG' },
    { k: 'van', t: 'Điểm dễ hỏng nhất của mọi hệ nhượng quyền nằm ở chặng năm: *cấp phép có điều kiện* để giữ quan hệ. Trong lịch sử vận hành, điều kiện kèm theo một giấy phép đã cấp gần như chưa bao giờ được hoàn thành. Nên hệ này không có trạng thái ở giữa.' },
    { k: 'trich', t: 'Đạt thì cấp, chưa đạt thì quay lại chặng trước.', n: 'Luật nhượng quyền thứ ba' }
  ]},

'nq-dao-tao': { q: 'nghe_quan_ly', k: 'Nhượng quyền', t: 'Đào tạo và cấp chứng nhận',
  p: 'Chất lượng đi theo người, không đi theo giấy phép. Nên phần này là phần dài nhất của toàn bộ hành trình: 96 giờ, năm học phần, có thi và có ngưỡng đạt.',
  khoi: [
    { k: 'bang', cot: ['Mã', 'Học phần', 'Thời lượng', 'Nội dung', 'Đạt khi nào'], tu: 'NQ_HOC_PHAN' },
    { k: 'van', t: 'Chứng nhận có thời hạn hai năm và gắn với *người*, không gắn với cơ sở. Người chuyển nơi làm thì mang chứng nhận đi; cơ sở phải đưa người thay thế qua đào tạo trong sáu tháng. Đây là lý do một điểm không thể mua chuẩn một lần rồi giữ mãi.' },
    { k: 'trich', t: 'Người chưa có chứng nhận không đứng lớp, kể cả buổi khai giảng.', n: 'Luật nhượng quyền thứ tư' }
  ]},

'nq-kiem-dinh': { q: 'nghiem_thu', k: 'Nhượng quyền', t: 'Kiểm định và bốn mức chế tài',
  p: 'Sáu phần, 100 điểm, ngưỡng đạt 85. Phần an toàn trẻ em có một luật riêng: bằng không thì cả kỳ không đạt, bất kể tổng điểm là bao nhiêu.',
  khoi: [
    { k: 'cham', nguong: 85, tu: 'NQ_KIEM_DINH' },
    { k: 'muc', t: 'Bốn mức chế tài' },
    { k: 'van', t: 'Chế tài đi theo trình tự, và trình tự ghi trong hợp đồng chứ không quyết định tuỳ nghi từng trường hợp. Ngoại lệ duy nhất là vi phạm an toàn trẻ em — vào thẳng mức bốn ngay lần đầu.' },
    { k: 'thang', tu: 'NQ_CHE_TAI' },
    { k: 'trich', t: 'Người chấm và người được chấm không được là một.', n: 'Bảng trao quyền · dòng kiểm định' }
  ]},

'nq-phi': { q: 'tai_chinh', k: 'Nhượng quyền', t: 'Cấu trúc phí',
  p: 'Bảy khoản. Kho này ghi cấu trúc và nguyên tắc, không ghi con số — con số nằm trong biểu phí có hiệu lực theo năm, ký kèm hợp đồng.',
  khoi: [
    { k: 'bang', cot: ['Khoản', 'Nộp khi nào', 'Hoàn lại hay không', 'Đổi lấy gì'], tu: 'NQ_PHI' },
    { k: 'van', t: 'Hai khoản đáng chú ý. *Phí bản quyền theo doanh thu* gắn lợi ích hai bên vào cùng một chiều — bên nhận quyền tốt lên thì cả hai cùng tốt lên; đây là lý do nó tồn tại, không phải để thu thêm. *Quỹ phát triển chung* công khai thu chi mỗi sáu tháng cho toàn bộ bên nhận quyền: không công khai được thì không thu.' },
    { k: 'canh', ds: [
      'Học viện không cam kết bất kỳ con số doanh thu hay số học sinh nào cho bên nhận quyền.',
      'Không nhận đặt cọc giữ chỗ lãnh thổ khi hồ sơ chưa qua thẩm định.',
      'Phí thẩm định trả lại toàn bộ nếu Hội đồng Chuẩn không duyệt hồ sơ.'
    ]}
  ]},

'nq-lanh-tho': { q: 'dh_toan_he', k: 'Nhượng quyền', t: 'Lãnh thổ và độc quyền',
  p: 'Độc quyền là phần thưởng cho việc giữ chuẩn, không phải quyền tự nhiên có được nhờ đã nộp phí.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'NQ_LANH_THO' },
    { k: 'van', t: 'Luật thứ tư trong sáu luật trên là luật khó chịu nhất với bên nhận quyền và cũng là luật không thương lượng được: *ranh giới không chặn được người học*. Lãnh thổ ràng buộc bên nhận quyền, không ràng buộc gia đình. Ràng buộc người học vào một điểm là đặt lợi ích kinh doanh lên trên lợi ích đứa trẻ — và đó là chỗ hệ này không đi qua.' },
    { k: 'trich', t: 'Quyền vùng là nghĩa vụ mở, không phải quyền chặn.', n: 'Gói NQ-3 · phần không phù hợp với ai' }
  ]},

'nq-hop-dong': { q: 'dh_toan_he', k: 'Nhượng quyền', t: 'Hợp đồng và bộ hồ sơ bàn giao',
  p: 'Mười sáu điều khoản bắt buộc. Không điều nào chỉ để ràng buộc — mỗi điều bảo vệ một thứ cụ thể, và cột cuối bảng nói rõ thứ đó là gì.',
  khoi: [
    { k: 'bang', cot: ['Điều', 'Nội dung bắt buộc', 'Bảo vệ điều gì'], tu: 'NQ_HOP_DONG' },
    { k: 'muc', t: 'Bộ hồ sơ bàn giao · ba lớp' },
    { k: 'van', t: 'Bàn giao bằng lời rồi bổ sung giấy sau là cách nhanh nhất để về sau không ai chứng minh được đã trao gì. Ba lớp dưới đây bàn giao một lần, có biên bản, có chữ ký hai bên.' },
    { k: 'moc', tu: 'NQ_BAN_GIAO' }
  ]},

'nq-luat': { q: 'dh_toan_he', k: 'Nhượng quyền', t: 'Mười hai luật và bảy điều từ chối',
  p: 'Luật là thứ không thương lượng trong phòng họp. Viết ra trước để không phải quyết định lúc đang có áp lực.',
  khoi: [
    { k: 'luat', tu: 'NQ_LUAT' },
    { k: 'muc', t: 'Bảy điều Học viện từ chối làm' },
    { k: 'van', t: 'Danh sách này quan trọng ngang danh sách những điều Học viện làm được. Một hệ nhượng quyền nói rõ chỗ mình từ chối thì bên nhận quyền biết mình đang bước vào cái gì — và bên nào thấy các điều dưới đây là trở ngại thì nên dừng ở đây, sớm và không mất gì.' },
    { k: 'canh', tu: 'NQ_TU_CHOI' },
    { k: 'trich', t: 'Không bán quyền độc quyền vĩnh viễn cho bất kỳ ai, ở bất kỳ mức phí nào.', n: 'Điều từ chối thứ nhất' }
  ]},

'nq-faq': { q: 'tu_van', k: 'Nhượng quyền', t: 'Câu hỏi thường gặp về nhượng quyền',
  p: 'Chín câu, chia theo người hỏi. Bao gồm cả những câu mà trả lời thẳng sẽ làm mất một số hồ sơ.',
  khoi: [
    { k: 'faq', tu: 'NQ_FAQ' },
    { k: 'van', t: 'Câu khó nhất là câu *bao lâu thì hoàn vốn*. Học viện không trả lời bằng một con số, vì trả lời được nghĩa là đang cam kết một kết quả phụ thuộc vào cách bên khác vận hành. Điều nói rõ được là điều kiện tài chính bắt buộc — và ai không đáp ứng thì hồ sơ dừng ở vòng thẩm định, kể cả khi rất muốn.' }
  ]},

/* ══════════ NHÓM 28 · TÌM THẤY ĐƯỢC VÀ ĐÁNG TIN ══════════ */
'seo-nguyen-tac': { q: 'chung', k: 'Hiện diện số', t: 'Bảy nguyên tắc để được tìm thấy',
  p: 'Không ai — kể cả Google — bảo đảm được vị trí số một. Thứ làm được là làm cho trang này thành câu trả lời tốt nhất hiện có cho một câu hỏi cụ thể, rồi để máy tìm kiếm không còn lựa chọn nào tốt hơn.',
  khoi: [
    { k: 'ly', tu: 'SE_NGUYEN_TAC' },
    { k: 'van', t: 'Bảy nguyên tắc này không phải bảy thủ thuật. Chúng là *cùng một hệ giá trị* mà nhóm 16 đã dùng cho bằng chứng và nhóm 12 đã dùng cho cam kết dịch vụ, chỉ đem áp vào một chỗ khác. Đó cũng là lý do phần này đặt được: một hệ đã quen nói rõ giới hạn của mình thì không phải học lại điều gì để làm E-E-A-T.' },
    { k: 'muc', t: 'Bảy việc không làm' },
    { k: 'canh', tu: 'SE_KHONG' },
    { k: 'trich', t: 'Mọi thủ thuật xếp hạng đều có tuổi thọ ngắn hơn một thuật toán. Chất lượng thì không.', n: 'Nguyên tắc thứ nhất' }
  ]},

'seo-y-dinh': { q: 'tu_van', k: 'Hiện diện số', t: 'Bản đồ ý định tìm kiếm',
  p: 'Tám nhóm người gõ tám kiểu câu khác nhau về cùng một thứ. Ai gõ câu nào thì đang ở đâu trong quyết định của họ — và trang phải trả lời đúng chỗ đó.',
  khoi: [
    { k: 'bang', cot: ['Người tìm', 'Câu họ gõ', 'Ý định thật', 'Trang phải trả lời', 'Bằng chứng đi kèm'], tu: 'SE_Y_DINH' },
    { k: 'van', t: 'Bảng này *cố ý không ghi lượng tìm kiếm*. Lượng tìm kiếm phải đo bằng số thật từ báo cáo truy vấn sau khi trang đã chạy, không đoán trước bằng công cụ ước lượng. Ghi một con số đoán vào đây rồi nhiều tháng sau vẫn dùng nó để quyết định là cách một bản kế hoạch tự lừa mình.' },
    { k: 'muc', t: 'Sáu cụm nội dung' },
    { k: 'van', t: 'Mỗi cụm có một màn *trụ* trả lời câu hỏi lớn, và các màn *vệ tinh* trả lời từng phần nhỏ. Mỗi màn vệ tinh dẫn về trụ, và trụ dẫn ra hết vệ tinh. Cấu trúc này hệ đã có sẵn qua khối liên quan tự tính — phần thêm ở đây chỉ là đặt tên cho sáu cụm để biết chỗ nào còn thiếu.' },
    { k: 'moc', tu: 'SE_CUM' }
  ]},

'seo-eeat': { q: 'chung', k: 'Hiện diện số', t: 'Bốn tín hiệu uy tín',
  p: 'E-E-A-T không phải một chỉ số Google công bố. Nó là cách người chấm chất lượng của Google đọc một trang — và bốn thứ họ tìm thì hệ này chứng minh được bằng vật liệu đã có.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'SE_EEAT' },
    { k: 'van', t: 'Tín hiệu thứ tư — *đáng tin* — có trọng số cao nhất, và cũng là tín hiệu khó làm giả nhất, vì nó đo bằng những chỗ một trang tự nói điều bất lợi cho mình. Hệ này có sẵn ba chỗ như thế: mục *không phù hợp với ai* trong mọi gói, bảy điều Học viện từ chối, và khoản đền kèm mọi cam kết dịch vụ.' },
    { k: 'trich', t: 'Một trang toàn năm sao không có lấy một lời chê là dấu hiệu đầu tiên người đọc nhận ra là giả.', n: 'Nguyên tắc thứ tư' }
  ]},

'seo-ky-thuat': { q: 'qt_noi_dung', k: 'Hiện diện số', t: 'Mười hai hạng mục kỹ thuật',
  p: 'Cột cuối bảng không ghi việc phải làm — nó ghi chỗ việc ấy đã được làm trong chính bản dựng này.',
  khoi: [
    { k: 'bang', cot: ['Hạng mục', 'Chuẩn phải đạt', 'Làm ở đâu trong bản này'], tu: 'SE_KY_THUAT' },
    { k: 'van', t: 'Ba hạng mục cuối — tốc độ, đọc được trên điện thoại, tiếp cận được — vốn đã là điều kiện phát hành của hệ này từ trước khi có phần SEO. Bộ kiểm chặn mọi bản dựng tràn ngang ở 390 điểm ảnh hoặc có mã màu chữ dưới ngưỡng WCAG AA. Đó là lý do phần kỹ thuật ở đây ngắn: phần lớn đã xong trước khi được gọi tên.' },
    { k: 'muc', t: 'Dữ liệu có cấu trúc · mẫu khai báo' },
    { k: 'ma', tu: 'SE_SCHEMA' },
    { k: 'van', t: 'Khai báo này sinh tự động từ kho vào thẻ *script* kiểu ld+json ở đầu trang, nên nó không bao giờ lệch với nội dung thật — sửa kho là khai báo đổi theo.' }
  ]},

'seo-phan-hoi': { q: 'tu_van', k: 'Hiện diện số', t: 'Hệ phản hồi năm sao',
  p: 'Sáu bước, theo đúng thứ tự. Bước khó nhất là bước thứ tư: gửi lời mời cho tất cả, kể cả những gia đình biết chắc sẽ chê.',
  khoi: [
    { k: 'buoc', tu: 'SE_PHAN_HOI' },
    { k: 'muc', t: 'Sáu luật phản hồi' },
    { k: 'luat', tu: 'SE_PH_LUAT' },
    { k: 'van', t: 'Luật cuối cùng đáng nói riêng: *không gộp điểm trung bình của nhiều điểm nhượng quyền thành một con số chung*. Gộp lại thì điểm tốt che điểm kém, gia đình không biết mình đang chọn cái gì, và điểm kém không có áp lực phải sửa. Mỗi điểm chịu trách nhiệm về điểm của mình — điều này ăn khớp với danh bạ công khai kỳ kiểm định gần nhất ở nhóm 27.' },
    { k: 'trich', t: 'Im lặng trước một lời chê có sức nặng hơn chính lời chê ấy.', n: 'Bước thứ năm' }
  ]},

'seo-do': { q: 'kpi_toan_he', k: 'Hiện diện số', t: 'Tám chỉ số phải đo',
  p: 'Đo theo cụm, không đo theo từ khoá đơn lẻ. Vị trí của một từ khoá đơn dao động hằng ngày và không nói lên điều gì.',
  khoi: [
    { k: 'bang', cot: ['Chỉ số', 'Đo bằng gì', 'Nhịp đọc', 'Đọc ra điều gì'], tu: 'SE_DO' },
    { k: 'van', t: 'Chỉ số thứ tư — *câu người ta thật sự gõ* — là chỉ số duy nhất phải đọc bằng mắt chứ không chỉ nhìn số. Nó là nguồn tốt nhất để biết nên viết màn tiếp theo về gì, và nó thường chỉ ra những câu hỏi mà cả hệ chưa từng nghĩ tới.' },
    { k: 'trich', t: 'Một lần được dẫn từ nguồn ngành giá trị hơn trăm lần tự đăng.', n: 'Chỉ số thứ tám' }
  ]},

'seo-90': { q: 'dh_toan_he', k: 'Hiện diện số', t: 'Chín mươi ngày đầu tiên',
  p: 'Ba đợt ba mươi ngày: dựng nền, phủ ý định, dựng tin cậy. Đúng thứ tự — phủ nội dung trước khi có nền kỹ thuật là viết cho không ai đọc.',
  khoi: [
    { k: 'quy', tu: 'SE_90' },
    { k: 'van', t: 'Đợt ba là đợt chậm thấy kết quả nhất và cũng là đợt quyết định. Hai đợt đầu đưa trang vào chỉ mục và đưa nội dung tới đúng người; đợt ba là thứ khiến người ấy tin. Sau chín mươi ngày, việc lặp lại là đọc báo cáo truy vấn và chọn ba câu hỏi mới cho chu kỳ sau — không có đợt thứ tư, chỉ có vòng lặp.' },
    { k: 'trich', t: 'Người tìm kiếm không bao giờ vào từ trang chủ. Chỗ nào cũng phải là cửa vào tử tế.', n: 'Nguyên tắc thứ bảy' }
  ]},

/* ══════════ BỔ SUNG NHÓM 22 · 52 TUẦN ══════════ */
'clb-chu-ky': { q: 'clb_dieu_hanh', k: 'Tuyến CLB', t: 'Bốn chu kỳ của một năm sinh hoạt',
  p: 'Năm mươi hai tuần không phải năm mươi hai chủ đề rời. Chúng là bốn chu kỳ nối nhau, và thứ tự bốn chu kỳ ấy là thứ không đảo được.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'T52_CHU_KY_L' },
    { k: 'van', t: 'Thứ tự này do chính tài liệu gốc đặt ra ở tuần 1, và nó có lý do: *một em chưa giữ nổi lời hứa với chính mình thì không nên được trao một đội*. Mọi CLB rút gọn bằng cách nhảy thẳng vào dự án đều hỏng ở cùng một chỗ — dự án chạy được vài tuần rồi tan, vì nền kỷ luật cá nhân chưa có.' },
    { k: 'bang', cot: ['Chu kỳ', 'Tuần', 'Câu hỏi chu kỳ trả lời'], tu: 'T52_CHU_KY_B' },
    { k: 'trich', t: 'Người Gen Việt không khoe miệng. Người Gen Việt để kết quả, tác động và phong thái trả lời.', n: 'Thông điệp tuần 11 · tài liệu gốc' }
  ]},

'clb-52-tuan': { q: 'clb_dieu_hanh', k: 'Tuyến CLB', t: 'Năm mươi hai tuần chuyên đề',
  p: 'Đủ cả năm mươi hai tuần, lấy đúng chữ trong tài liệu gốc của Học viện: chủ đề tuần, mục tiêu chung, và đầu ra bắt buộc.',
  khoi: [
    { k: 'van', t: 'Trước bản này, cả hệ thống *nói* “52 tuần chuyên đề” ở tám chỗ khác nhau mà chưa chỗ nào *viết ra* chúng. Đó là món nợ lớn nhất còn lại của kho, và đây là chỗ trả nó.' },
    { k: 'muc', t: 'Chu kỳ một · Lead Self · tuần 1–12' },
    { k: 'bang', cot: ['Tuần', 'Chủ đề tuần', 'Mục tiêu chung', 'Đầu ra bắt buộc'], tu: 'T52_C1' },
    { k: 'muc', t: 'Chu kỳ hai · Lead Team · tuần 13–24' },
    { k: 'bang', cot: ['Tuần', 'Chủ đề tuần', 'Mục tiêu chung', 'Đầu ra bắt buộc'], tu: 'T52_C2' },
    { k: 'muc', t: 'Chu kỳ ba · Lead Project · tuần 25–36' },
    { k: 'bang', cot: ['Tuần', 'Chủ đề tuần', 'Mục tiêu chung', 'Đầu ra bắt buộc'], tu: 'T52_C3' },
    { k: 'muc', t: 'Chu kỳ bốn · Lead Impact · tuần 37–52' },
    { k: 'bang', cot: ['Tuần', 'Chủ đề tuần', 'Mục tiêu chung', 'Đầu ra bắt buộc'], tu: 'T52_C4' },
    { k: 'van', t: 'Cột *đầu ra bắt buộc* là cột quan trọng nhất. Một tuần không nộp đủ đầu ra thì tuần ấy chưa xong, dù buổi sinh hoạt đã diễn ra đông vui. Đây cũng là cột mà kỳ kiểm định nhượng quyền soi đầu tiên.' }
  ]},

/* ══════════ BỔ SUNG NHÓM 20 · SỔ CÁI ══════════ */
'so-cai-yc': { q: 'chung', k: 'Tra cứu', t: 'Sổ cái yêu cầu',
  p: 'Câu hỏi "đã làm đủ mọi thứ được yêu cầu chưa" trước đây chỉ trả lời được bằng lời. Đây là chỗ nó được trả lời bằng máy.',
  khoi: [
    { k: 'van', t: 'Mỗi yêu cầu của Học viện là một *dòng sổ*, và mỗi dòng phải viện dẫn màn và kho cụ thể. Bộ kiểm phát hành đọc sổ này ở mỗi lần dựng và soi từng viện dẫn một: màn được viện dẫn có thật không, kho được viện dẫn có dữ liệu không. Dòng nào trỏ vào chỗ không tồn tại thì bản dựng bị chặn.' },
    { k: 'bang', cot: ['Mã', 'Yêu cầu', 'Đáp ứng ở màn', 'Dựa trên kho'], tu: 'SC_YC_BANG' },
    { k: 'van', t: 'Lần đầu chạy lớp kiểm này, nó bắt được *mười một* viện dẫn sai do chính tôi viết — tên kho nhớ nhầm, màn chưa dựng. Đó là bằng chứng tốt nhất cho việc vì sao sổ này không thể là một trang tự khai.' },
    { k: 'muc', t: 'Sáu luật giữ sổ' },
    { k: 'luat', tu: 'SC_LUAT' },
    { k: 'trich', t: 'Không dòng sổ nào được đóng bằng cách sửa lại yêu cầu cho vừa với thứ đã làm.', n: 'Luật giữ sổ thứ sáu' }
  ]},

'so-cai-no': { q: 'chung', k: 'Tra cứu', t: 'Món nợ số',
  p: 'Một hệ nói "600 chuyên đề" ở hàng chục chỗ mà chưa nơi nào viết ra chúng thì con số ấy là một món nợ, không phải một thành tựu.',
  khoi: [
    { k: 'van', t: 'Lỗi này đã thật sự xảy ra và sống nhiều tháng trong chính hệ này. Kho khai *52 tuần chuyên đề*, *100 chương trình huấn luyện*, *600 chuyên đề mười hai khối* — nhưng đếm ra thì không có. Không ai phát hiện, vì không ai đếm.' },
    { k: 'bang', cot: ['Con số đã hứa', 'Hứa bao nhiêu', 'Viết ra ở kho nào', 'Đếm được'], tu: 'SC_NO_BANG' },
    { k: 'van', t: 'Từ nay mỗi con số hứa trong văn xuôi phải có một dòng ở bảng trên, trỏ tới một kho chứa đúng ngần ấy phần tử. Lệch một đơn vị là bản dựng bị chặn. Hứa mà không trỏ được thì *bỏ con số ấy đi* — đó là lựa chọn trung thực duy nhất còn lại.' },
    { k: 'trich', t: 'Hứa mà không trỏ được thì bỏ con số ấy đi.', n: 'Luật giữ sổ thứ tư' }
  ]},

/* ══════════ BỔ SUNG NHÓM 21 · HOÀ GIẢI HAI THANG ══════════ */
'gv-anh-xa-bac': { q: 'chung', k: 'Xương sống', t: 'Hai thang tiến bộ, và cách hoà giải chúng',
  p: 'Hệ này từng mang hai thang song song mà không nói rõ quan hệ giữa chúng. Hai thang song song trong một hệ là lỗi, không phải sự phong phú — người dùng không biết mình đang ở đâu.',
  khoi: [
    { k: 'van', t: 'Bản dựng đầu tiên tự nghĩ ra *sáu bậc B1–B6*. Về sau, khi đọc được kho tài liệu gốc của Học viện, mới thấy hệ thật có *mười lăm giai đoạn*. Hai thang cùng tồn tại nhiều tháng mà không ai nói chúng liên quan thế nào. Đây là chỗ sửa.' },
    { k: 'muc', t: 'Cách xử: không bỏ thang nào, mà tách vai trò' },
    { k: 'luoi', c: 2, tu: 'HAI_THANG' },
    { k: 'van', t: 'Sáu bậc không bị bỏ vì phân quyền *cần* một thang thô. Mười lăm nấc thì quá mịn để gắn quyền — sẽ thành mười lăm cấu hình phải bảo trì, và bộ kiểm phải thử mười lăm lần thay vì sáu.' },
    { k: 'muc', t: 'Ánh xạ chính thức giữa hai thang' },
    { k: 'bang', cot: ['Bậc quyền', 'Tên bậc', 'Giai đoạn tương ứng', 'Em đang rèn gì', 'Bậc này mở thêm gì'],
      tu: 'TY_ANH_XA_BAC' },
    { k: 'muc', t: 'Sáu luật giữ cho hai thang không lệch nhau' },
    { k: 'luat', tu: 'TY_ANH_XA_LUAT' },
    { k: 'trich', t: 'Khi hai thang mâu thuẫn trong một hồ sơ, giai đoạn là thứ đúng và bậc là thứ phải sửa.', n: 'Luật ánh xạ thứ năm' }
  ]},

/* ══════════ NHÓM 29 · HỆ MƯỜI CẤP ĐỘ ══════════ */
'cd-muoi-cap': { q: 'clb_dieu_hanh', k: 'Hệ mười cấp độ', t: 'Mười cấp độ và điều kiện đạt từng cấp',
  p: 'Bảy cột cho mỗi cấp: ai, bao lâu, đạt khi nào, rèn cái gì, và trọng tâm năng lực. Lấy nguyên từ tài liệu gốc của Học viện.',
  khoi: [
    { k: 'bang', cot: ['Cấp', 'Tên gọi', 'Đối tượng', 'Thời gian', 'Điều kiện đạt', 'Trọng tâm huấn luyện', 'Năng lực chính'],
      tu: 'CD10_CAP' },
    { k: 'van', t: 'Điều đáng chú ý nhất khi đọc kỹ nguồn: hệ này chấm đạo đức như một *tiêu chí loại*, không phải điểm trừ. Tham gia bắt nạt thì không đạt Cấp 2. Làm xấu hình ảnh CLB thì không đạt Cấp 5. Vi phạm ở Cấp 8 thì xét hạ cấp. Và danh hiệu Cấp 10 có cơ chế thu hồi ghi thành văn.' },
    { k: 'trich', t: 'Nhân cách được lọc trước khi trao quyền dẫn người, không phải sau.', n: 'Đọc từ vị trí bộ lọc F3 · F4 ở Cấp 5' }
  ]},

'cd-tram-ct': { q: 'clb_dieu_hanh', k: 'Hệ mười cấp độ', t: 'Một trăm chương trình huấn luyện',
  p: 'Mười cấp × mười chương trình. Mỗi chương trình có mã, mục tiêu, nội dung, thời lượng, phương thức, biểu mẫu và cách đánh giá.',
  khoi: [
    { k: 'van', t: 'Trước bản này, hệ thống *nói* “mỗi cấp mười chương trình huấn luyện” mà chưa chỗ nào viết ra chúng. Cả một trăm chương trình dưới đây đều có thật trong tài liệu gốc — không dòng nào suy ra.' },
    { k: 'bang', cot: ['Mã', 'Cấp', 'Tên chương trình', 'Mục tiêu', 'Nội dung chính', 'Thời lượng và cách làm', 'Biểu mẫu', 'Đánh giá'],
      tu: 'CD10_CT' },
    { k: 'van', t: 'Cột *biểu mẫu* là thứ phân biệt bộ này với một danh mục khoá học: mỗi chương trình đã có sẵn phiếu đi kèm, nên một CLB mới mở không phải tự nghĩ ra cách ghi nhận.' }
  ]},

'cd-nang-luc': { q: 'clb_dieu_hanh', k: 'Hệ mười cấp độ', t: 'Nhóm năng lực và thang Pin',
  p: 'Mười nhóm năng lực A–F cộng F1–F4, và năm mức Pin dùng để nói với học sinh về chính tiến bộ của em.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'CD10_NANG_LUC' },
    { k: 'muc', t: 'Năm mức Pin' },
    { k: 'van', t: 'Thang Pin là cách hệ này nói chuyện với học sinh nhỏ tuổi về tiến bộ mà không dùng chữ “cấp độ”. Cùng một sự thật, hai ngôn ngữ: người lớn đọc cấp, em đọc màu pin.' },
    { k: 'luoi', c: 2, tu: 'CD10_PIN' },
    { k: 'trich', t: 'F3 và F4 — ảnh hưởng tích cực và tư duy phục vụ — đặt ở Cấp 5, tức trước Cấp 6–7 nơi bắt đầu dẫn người.', n: 'Vị trí bộ lọc trong nguồn' }
  ]},

'cd-chuan-ra': { q: 'nghiem_thu', k: 'Hệ mười cấp độ', t: 'Chuẩn đầu ra bốn góc nhìn',
  p: 'Cùng một cấp độ, nhìn từ bốn phía sẽ thấy bốn thứ khác nhau. Cả bốn phải cùng thấy thì mới tính là đạt.',
  khoi: [
    { k: 'bang', cot: ['Cấp', 'Góc nhìn', 'Nhìn thấy gì'], tu: 'CD10_CHUAN_RA' },
    { k: 'van', t: 'Bảng này là công cụ chống *lạm phát danh hiệu* mạnh nhất trong cả hệ. Một em được công nhận Cấp 6 mà gia đình không thấy gì khác ở nhà thì hồ sơ ấy có vấn đề — dù CLB chấm đủ điểm.' },
    { k: 'trich', t: 'Cấp độ nào cũng phải nhìn thấy được từ ngoài hệ, không chỉ từ trong hệ.', n: 'Nguyên tắc đọc bảng bốn góc nhìn' }
  ]},

'cd-sop': { q: 'clb_dieu_hanh', k: 'Hệ mười cấp độ', t: 'Ba mươi quy trình chuẩn',
  p: 'SOP theo Ban, mỗi quy trình có mã, chỉ tiêu, và cách chấm xem đã làm đúng chưa.',
  khoi: [
    { k: 'bang', cot: ['Ban', 'Mã SOP', 'Quy trình', 'Chỉ tiêu', 'Chấm đạt khi nào'], tu: 'CD10_SOP' },
    { k: 'van', t: 'Ba mươi quy trình này là thứ khiến một CLB chạy được khi người sáng lập vắng mặt. Không có chúng, mọi thứ phụ thuộc trí nhớ của một người — và đó là cách mọi CLB học đường tan sau một nhiệm kỳ.' }
  ]},

'cd-quy-chuan': { q: 'kh_hanh_trinh', k: 'Hệ mười cấp độ', t: 'Bộ quy chuẩn CLB',
  p: 'Trang phục, tác phong, giao tiếp. Những thứ nhỏ mà người ngoài nhìn vào là biết ngay CLB này có chuẩn hay không.',
  khoi: [
    { k: 'bang', cot: ['Hạng mục', 'Chi tiết', 'Chuẩn phải giữ'], tu: 'CD10_QUY_CHUAN' },
    { k: 'muc', t: 'Chuẩn giao tiếp' },
    { k: 'bang', cot: ['Kênh', 'Hạng mục', 'Chuẩn', 'Không được dùng'], tu: 'CD10_GIAO_TIEP' },
    { k: 'muc', t: 'Mười hai luật của hệ cấp độ' },
    { k: 'luat', tu: 'CD10_LUAT' }
  ]},

/* ══════════ NHÓM 30 · SÁCH MASTER GEN VIỆT ══════════ */
'ms-loi-mo': { q: 'chung', k: 'Sách Master', t: 'Vì sao một thế hệ cần một bản đồ',
  p: 'Tám luận điểm mở đầu, lấy nguyên chữ của tác giả. Đây là phần hệ vận hành trước nay chưa hề khai thác — và nó là phần giải thích vì sao mọi thứ còn lại tồn tại.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'MS_LOI_MO' },
    { k: 'van', t: 'Mệnh đề trung tâm của cả cuốn sách nằm ở đây: *bản lĩnh và giá trị không được tải xuống qua bài giảng — chúng được rèn qua quyết định và nén qua trải nghiệm*. Toàn bộ kiến trúc ba lớp và bốn vòng của Gen Việt dựng ra để làm đúng việc rèn ấy mà không phụ thuộc vào cảm hứng của từng thầy cô.' },
    { k: 'trich', t: 'Khi không có bản đồ, hai khả năng rất dễ xảy ra: hoặc là đi vòng mãi mà không ra được đường lớn, hoặc là chạy rất nhanh… nhưng đi nhầm hướng.', n: 'Lời dẫn · Master Gen Việt' }
  ]},

'ms-luan-diem': { q: 'chung', k: 'Sách Master', t: 'Mười bốn luận điểm nền',
  p: 'Mỗi luận điểm là một câu hỏi sống còn mà sách buộc người đọc phải trả lời trước khi đi tiếp.',
  khoi: [
    { k: 'ly', tu: 'MS_LUAN_DIEM' },
    { k: 'van', t: 'Luận điểm thứ nhất đặt lại trọng tâm của toàn bộ việc nuôi dạy: *trở thành người như thế nào*, chứ không chỉ *làm nghề gì*. Nghề đổi, xu hướng đổi — phẩm chất và hệ giá trị thì đi theo suốt đời. Đây cũng là lý do năm phẩm chất ở nhóm 01 đứng trước khung năng lực chứ không sau.' }
  ]},

'ms-ba-chang': { q: 'chung', k: 'Sách Master', t: 'Ba chặng của ba mươi năm',
  p: 'Gieo Hạt · Rèn Lửa · Bay Cao — chia theo tuổi, không chia theo lớp. Mỗi chặng có ba nút gia tốc.',
  khoi: [
    { k: 'chang', tu: 'MS_CHANG' },
    { k: 'van', t: 'Chín nút gia tốc là thứ phân biệt bản đồ này với một lời khuyên chung chung: mỗi nút nói rõ *thứ gì phải xảy ra trong khoảng tuổi nào*, và bỏ lỡ thì về sau đắt hơn nhiều để bù.' },
    { k: 'trich', t: 'Tầm nhìn là ba mươi năm, nhưng đơn vị hành động là một năm — chín mươi ngày — ba mươi ngày — bảy ngày.', n: 'Luật thứ nhất của sách Master' }
  ]},

'ms-mo-thuc': { q: 'nghe_chung', k: 'Sách Master', t: 'Mười tám mô thức',
  p: 'Bộ công cụ tư duy của sách. Mỗi mô thức có mã tra được, dùng lại được trong giáo án và trong buổi tư vấn.',
  khoi: [
    { k: 'mt', tu: 'MS_MO_THUC' },
    { k: 'van', t: 'Mười tám mô thức này nối thẳng vào kho chuyên môn ở nhóm 03 và vào mười hai mô thức Việt ở nhóm 13. Ba bộ ấy không cạnh tranh nhau: nhóm 03 đọc một ca, nhóm 13 lấy tinh thần từ lịch sử, còn đây là khung tư duy dài hạn của người dẫn đường.' }
  ]},

'ms-rui-ro': { q: 'dh_toan_he', k: 'Sách Master', t: 'Năm rủi ro chiến lược',
  p: 'Điều hiếm gặp: chính tác giả đặt tên cho năm cách mà mô hình của mình có thể hỏng.',
  khoi: [
    { k: 'rui', tu: 'MS_RUI' },
    { k: 'van', t: 'Một mô hình tự nêu được năm cách nó có thể hỏng thì đáng tin hơn một mô hình chỉ nêu ưu điểm. Năm rủi ro này cũng là năm thứ mà kỳ kiểm định nhượng quyền ở nhóm 27 soi gián tiếp: *phong trào hoá* lộ ra ở phần bằng chứng, *phụ thuộc cá nhân ngôi sao* lộ ra ở phần nhân sự còn chuẩn.' },
    { k: 'trich', t: 'Hoạt động gắn logo tăng nhanh, nhưng tài liệu hoá, PDCA và đo lường thì ít — đó là dấu hiệu đầu tiên của phong trào hoá.', n: 'Rủi ro thứ nhất' }
  ]},

'ms-khung-sach': { q: 'qt_noi_dung', k: 'Sách Master', t: 'Khung sách và những câu đáng trích',
  p: 'Bảy phần của bản dàn ý, và hai mươi sáu câu giữ nguyên chữ tác giả để dùng lại trong tài liệu và truyền thông.',
  khoi: [
    { k: 'moc', tu: 'MS_KHUNG_SACH' },
    { k: 'van', t: 'Một điều phải nói rõ thay vì lấp liếm: bản *Khung sách* và ba bản thảo đã viết mô tả **hai cuốn sách khác nhau** — dàn ý là năm phần mười tám chương, bản đã viết là mười bốn chương theo ba chặng. Kho này giữ cả hai và không tự hoà làm một. Bản dàn ý cũng khuyết tiêu đề PHẦN II; các chương 5–8 nằm ở khoảng trống ấy nên được giữ đúng vị trí nguồn, không đặt tên thay tác giả.' },
    { k: 'muc', t: 'Hai mươi sáu câu đáng trích' },
    { k: 'bang', cot: ['Câu', 'Ở đâu trong sách'], tu: 'MS_TRICH' },
    { k: 'muc', t: 'Mười lăm luật rút ra' },
    { k: 'luat', tu: 'MS_LUAT' }
  ]},

/* ══════════ NHÓM 31 · CHUYÊN ĐỀ MƯỜI HAI KHỐI ══════════ */
'cde-nam-nhom': { q: 'chung', k: 'Chuyên đề', t: 'Năm nhóm cố định, theo đúng tên trong tài liệu gốc',
  p: 'Một phát hiện phải nói ngay: tên năm nhóm trong tài liệu gốc khác hẳn cách gọi vẫn lưu hành trong hệ này.',
  khoi: [
    { k: 'van', t: 'Bản dựng trước ghi năm nhóm là *Văn hoá — Phẩm chất · Tư duy — Trí tuệ · Kỹ năng — Bản lĩnh · Thể chất — Sức bền · Tài năng — Sáng tạo*. Đọc tài liệu gốc thì không có *Thể chất — Sức bền*, cũng không có *Tài năng — Sáng tạo*. Dưới đây là tên gốc. Khi hai bên lệch nhau, tài liệu của Học viện đúng.' },
    { k: 'luoi', c: 2, tu: 'CD_NHOM' },
    { k: 'muc', t: 'Khung chương trình năm khối tiểu học' },
    { k: 'bang', cot: ['Khối', 'Trọng tâm khối', 'Số chuyên đề', 'Nhịp dự án', 'Dải mã'], tu: 'CD_KHUNG_B' },
    { k: 'trich', t: 'Khi cách gọi trong hệ lệch với tài liệu của Học viện, tài liệu đúng và hệ phải sửa.', n: 'Nguyên tắc đọc kho gốc' }
  ]},

'cde-ma-hoa': { q: 'nghe_chung', k: 'Chuyên đề', t: 'Hai trăm năm mươi chuyên đề có mã',
  p: 'Bộ duy nhất trong toàn kho gốc có hệ mã GV<khối>.<nhóm>.<số> thật. Khối 1 đến khối 5, mỗi khối năm mươi chuyên đề.',
  khoi: [
    { k: 'bang', cot: ['Mã', 'Khối', 'Nhóm', 'Tên chuyên đề', 'Nội dung cốt lõi'], tu: 'CD_DE_TAI_B' },
    { k: 'van', t: 'Hai chỗ cần biết trước khi dùng: bản gốc khối 2 *thiếu hẳn* mã GV2.1.03 — nhảy từ .02 sang .04; và bản triển khai chi tiết của khối 4, khối 5 chưa tồn tại, mới chỉ có tên chuyên đề. Đây là khoảng trống thật trong kho của Học viện, không phải chỗ bản dựng bỏ sót.' }
  ]},

'cde-tai-nang': { q: 'nghe_chung', k: 'Chuyên đề', t: 'Sáu trăm chuyên đề phát triển tài năng',
  p: 'Trọn mười hai khối, lớp 1 tới lớp 12. Mỗi dòng viết theo đúng ba phần của bản gốc: tên gần gũi, ý tưởng lõi, và minh chứng nhỏ đo được.',
  khoi: [
    { k: 'van', t: 'Con số *600 chuyên đề* mà hệ vẫn nói không nằm ở tài liệu Cấp 1 — tài liệu ấy chỉ có 250. Đúng 600 nằm ở một tài liệu khác hẳn, và tài liệu ấy *không đánh mã nào cả*. Hai trục được giữ riêng, không gán mã GV cho sáu trăm dòng này.' },
    { k: 'bang', cot: ['Khối', 'Nhóm', 'Tên chuyên đề', 'Ý tưởng lõi', 'Minh chứng đầu ra'], tu: 'CD_TAI_NANG_B' },
    { k: 'trich', t: 'Cột minh chứng đầu ra là thứ phân biệt một chuyên đề với một bài nói chuyện.', n: 'Cách đọc bảng sáu trăm dòng' }
  ]},

'cde-khung': { q: 'nghe_chung', k: 'Chuyên đề', t: 'Khung chuyên đề đầy đủ',
  p: 'Bốn mươi hai chuyên đề đã có khung chi tiết: thời lượng, cụm năng lực, giá trị gắn kết, mục tiêu.',
  khoi: [
    { k: 'bang', cot: ['Mã', 'Thời lượng', 'Cụm năng lực', 'Giá trị Gen Việt gắn kết', 'Mục tiêu tổng quát'], tu: 'CD_KHUNG_CD_B' },
    { k: 'muc', t: 'Sáu mươi nhóm năng lực trên mười hai khối' },
    { k: 'bang', cot: ['Khối', 'Nhóm', 'Tên nhóm năng lực', 'Số chuyên đề'], tu: 'CD_TRUC_B' }
  ]},

'cde-giao-an': { q: 'nghe_quan_ly', k: 'Chuyên đề', t: 'Giáo án hai chuyên đề mẫu',
  p: 'Đủ hai tiết, từng pha, từng phút. Đây là thứ một giáo viên mới cầm lên dạy được mà không cần hỏi ai.',
  khoi: [
    { k: 'giaoan', tu: 'CD_GIAO_AN' },
    { k: 'van', t: 'Mốc phút trong giáo án này là tổng dồn từ cột *thời lượng* của bản gốc, không phải con số bản gốc ghi sẵn — nói rõ để ai dùng biết mình đang đọc gì.' }
  ]},

'cde-luat': { q: 'nghe_quan_ly', k: 'Chuyên đề', t: 'Hai mươi luật biên soạn và bảy tuần giá trị',
  p: 'Luật rút từ chính cách tài liệu gốc được viết, không phải luật áp từ ngoài vào.',
  khoi: [
    { k: 'luat', tu: 'CD_LUAT' },
    { k: 'muc', t: 'Bảy tuần giá trị' },
    { k: 'bang', cot: ['Tuần', 'Giá trị', 'Hành động trong tuần', 'Minh chứng bắt buộc', 'Minh chứng nâng', 'Đạt tuần khi nào'],
      tu: 'CD_GIA_TRI_B' }
  ]},

/* ══════════ NHÓM 32 · CẨM NANG VẬN HÀNH CHI TIẾT ══════════ */
'vh-so-do': { q: 'clb_dieu_hanh', k: 'Vận hành', t: 'Sơ đồ tổ chức, và ba bộ tên trong cùng một kho',
  p: 'Bốn tài liệu gốc dùng ba bộ tên tổ chức khác nhau cho cùng một CLB. Đây là mâu thuẫn thật, và cách xử là nói ra chứ không lặng lẽ chọn một bộ.',
  khoi: [
    { k: 'van', t: 'Bộ thứ nhất — trong *Quy trình họp* và *Lịch trình sinh hoạt* — gọi mười hai Ban là Khơi Dậy · Trái Tim · Phẩm Chất · Phong Cách · Văn Hoá · Lan Tỏa · Trí Tuệ · Bản Lĩnh · Kết Nối · Tinh Thần · Bàn Chân · Tài Năng. Bộ thứ hai — trong *Chương trình điều hành* — là một danh sách mười hai Ban khác hẳn. Bộ thứ ba — trong *Cẩm nang vận hành* — không dùng tên Ban mà dùng chức danh quản trị: Chủ tịch, Phó chủ tịch Đối nội, Phó chủ tịch Tài chính và Đối ngoại.' },
    { k: 'van', t: 'Bộ thứ nhất được lấy làm chuẩn, vì chỉ bộ ấy có mô tả nhiệm vụ hằng tuần chi tiết và kịch bản dẫn chương trình đi kèm. Cột cuối bảng dưới nối sang hệ chức danh của Cẩm nang — phép nối ấy *là suy ra từ nhiệm vụ trùng khớp*, không phải câu chữ có sẵn trong nguồn.' },
    { k: 'bang', cot: ['Tầng', 'Vị trí hoặc Ban', 'Trực thuộc', 'Nhiệm vụ lõi theo tài liệu gốc', 'Chức danh tương ứng trong Cẩm nang'],
      tu: 'VH2_SO_DO_B' },
    { k: 'trich', t: 'Ba bộ tên cho một tổ chức là dấu hiệu tài liệu đã lớn nhanh hơn người giữ nó. Hợp nhất được, nhưng phải do Học viện quyết, không do bản dựng tự chọn.', n: 'Ghi chú khi đối chiếu bốn nguồn' }
  ]},

'vh-truoc-trong-sau': { q: 'clb_dieu_hanh', k: 'Vận hành', t: 'Trước, trong và sau một buổi sinh hoạt',
  p: 'Năm mươi bảy mốc, từ tối Chủ nhật tuần trước tới lúc bàn giao nhiệm kỳ.',
  khoi: [
    { k: 'muc', t: 'Trước buổi · hai mươi bảy mốc' },
    { k: 'lich', tu: 'VH2_TRUOC' },
    { k: 'muc', t: 'Trong buổi · mười bốn mốc' },
    { k: 'lich', tu: 'VH2_TRONG' },
    { k: 'muc', t: 'Sau buổi · mười sáu mốc' },
    { k: 'lich', tu: 'VH2_SAU' },
    { k: 'van', t: 'Hai con số cứng nhất rút được từ nguồn: nhiệm kỳ ban điều hành *sáu tháng*, và lịch chuyển giao có kèm cặp — làm phó ban từ tháng ba, làm trưởng ban từ tháng năm, người tiền nhiệm rút xuống phó ban. Chính cơ chế ấy là thứ giữ cho một CLB không tan sau một nhiệm kỳ.' }
  ]},

'vh-ban12': { q: 'clb_dieu_hanh', k: 'Vận hành', t: 'Nhiệm vụ mười hai Ban',
  p: 'Mỗi Ban có việc hằng tuần, việc hằng tháng, và — quan trọng nhất — danh sách việc không được làm.',
  khoi: [
    { k: 'stv', tu: 'VH2_BAN12' },
    { k: 'van', t: 'Cột *không được làm* là cột thường bị bỏ khi người ta chép lại một bảng phân công. Nó cũng là cột duy nhất ngăn được việc một Ban lấn sang việc của Ban khác — thứ làm hỏng nhiều CLB hơn là lười.' },
    { k: 'muc', t: 'Vòng cải tiến PDCA' },
    { k: 'moc', tu: 'VH2_PDCA' }
  ]},

'vh-raci-kpi': { q: 'kpi_toan_he', k: 'Vận hành', t: 'RACI và bộ chỉ số vận hành',
  p: 'Mười lăm đầu việc có người chịu trách nhiệm cuối, và mười sáu chỉ số có ngưỡng cùng hành động khi rơi ngưỡng.',
  khoi: [
    { k: 'bang', cot: ['Đầu việc', 'R — người làm', 'A — chịu trách nhiệm cuối', 'C — phải hỏi ý', 'I — phải được báo'],
      tu: 'VH2_RACI_B' },
    { k: 'muc', t: 'Mười sáu chỉ số' },
    { k: 'bang', cot: ['Chỉ số', 'Ngưỡng chuẩn', 'Mốc đo', 'Ai đo', 'Rơi ngưỡng thì làm gì'], tu: 'VH2_KPI_B' },
    { k: 'van', t: 'Cột cuối là cột làm cho bảng này khác một bảng KPI thông thường: mỗi chỉ số rơi ngưỡng đều có sẵn *việc phải làm*, nên không ai phải họp để quyết định xem nên làm gì.' }
  ]},

'vh-canh-bao': { q: 'clb_dieu_hanh', k: 'Vận hành', t: 'Mười lăm cảnh báo sớm',
  p: 'Cờ Vàng xử trong bảy ngày. Cờ Đỏ xử trong hai mươi tư giờ. Bốn vùng chạm vào là Đỏ ngay, không qua Vàng.',
  khoi: [
    { k: 'rui', tu: 'VH2_CANH_BAO' },
    { k: 'van', t: 'Mỗi cảnh báo có *dấu hiệu* quan sát được và *phanh* cụ thể. Một hệ cảnh báo mà chỉ nêu rủi ro chung chung thì không ai dùng — vì không biết lúc nào là lúc phải hành động.' }
  ]},

'vh-bieu-mau': { q: 'clb_dieu_hanh', k: 'Vận hành', t: 'Hai mươi biểu mẫu vận hành',
  p: 'BM-01 tới BM-20. Mỗi mẫu có người giữ, có nhịp nộp, và có trường bắt buộc không được để trống.',
  khoi: [
    { k: 'bang', cot: ['Mã', 'Biểu mẫu', 'Ai giữ', 'Nhịp', 'Trường bắt buộc'], tu: 'VH2_BIEU_MAU_B' },
    { k: 'muc', t: 'Ba mươi hai luật vận hành' },
    { k: 'luat', tu: 'VH2_LUAT' }
  ]},

/* ══════════ NHÓM 33 · TRẠI VÀ HỌC VIỆN VIP ══════════ */
'tr-bay-ngay': { q: 'kh_gia_dinh', k: 'Trại và VIP', t: 'Bảy ngày trại Leader Boom',
  p: 'Từ thức tỉnh bản thân tới bàn giao. Mỗi ngày có một cổng, và không ngày nào là ngày chơi.',
  khoi: [
    { k: 'chang', tu: 'TV2_TRAI_KHUNG' },
    { k: 'van', t: 'Tài liệu gốc có *hai phương án bảy ngày mâu thuẫn nhau* — Ngày 2 vừa được ghi là “Soi gương”, vừa được ghi là “Kỷ luật và thói quen”. Bản trên lấy phương án trong bảng huấn luyện viên vì phương án ấy đủ sáu cột. Đây là chỗ Học viện nên chốt lại một bản.' }
  ]},

'tr-lich-hau': { q: 'kh_gia_dinh', k: 'Trại và VIP', t: 'Lịch ngày một và chương trình hậu trại',
  p: 'Hai mươi khối giờ từ 06:00 tới 22:00, và sáu mốc hậu trại kéo tới ngày thứ chín mươi.',
  khoi: [
    { k: 'lich', tu: 'TV2_TRAI_LICH' },
    { k: 'van', t: 'Chỉ Ngày 1 được trích trọn vẹn vì chỉ Ngày 1 có lịch chi tiết trong nguồn. Cột *ai phụ trách* là suy ra từ cột “gợi ý phong cách” của bản gốc — nói rõ để không ai tưởng đó là phân công chính thức.' },
    { k: 'muc', t: 'Sáu mốc hậu trại' },
    { k: 'moc', tu: 'TV2_TRAI_HAU' },
    { k: 'trich', t: 'Trại tạo bước ngoặt; chín mươi ngày sau trại quyết định bước ngoặt ấy có ở lại hay không.', n: 'Nguyên lý thứ năm · nhóm 01' }
  ]},

'tr-an-toan': { q: 'kh_gia_dinh', k: 'Trại và VIP', t: 'Mười ba điều an toàn trại',
  p: 'Đây là chỗ tài liệu gốc mỏng nhất trong toàn bộ kho, và nói thẳng ra thì tốt hơn là lấp đầy bằng chữ.',
  khoi: [
    { k: 'van', t: 'Tài liệu trại *không có chương an toàn riêng*: không quy định y tế, không sơ cứu, không bảo hiểm, không quy trình sự cố. Mười ba điều dưới đây gom từ “Luật chơi Leader Boom”, phiếu cam kết và các ô rủi ro rải rác — không bịa thêm điều nào.' },
    { k: 'luat', tu: 'TV2_TRAI_AN_TOAN' },
    { k: 'canh', ds: [
      'Trước khi tổ chức trại thật, Học viện phải bổ sung: phương án y tế và sơ cứu tại chỗ, danh sách bệnh nền và dị ứng của từng học viên, bảo hiểm, quy trình sự cố và số điện thoại khẩn cấp.',
      'Bốn thứ trên là điều kiện bắt buộc theo phần bảo vệ trẻ em ở nhóm 16 — trại không được chạy khi còn thiếu.',
      'Kỳ kiểm định nhượng quyền chấm phần an toàn trẻ em bằng không nếu có một vi phạm chưa xử; trại thiếu phương án y tế thuộc nhóm ấy.'
    ]}
  ]},

'tr-vip': { q: 'tu_van', k: 'Trại và VIP', t: 'Học viện Gen Việt VIP',
  p: 'Chương trình điều hành mười bước, có chuẩn đầu vào bảy bước và chuẩn đầu ra bốn mức.',
  khoi: [
    { k: 'bang', cot: ['Bước và khối phút', 'Nội dung', 'Ban phụ trách', 'Mục tiêu của bước'], tu: 'TV2_VIP_CT_B' },
    { k: 'muc', t: 'Chuẩn đầu vào và đầu ra' },
    { k: 'luoi', c: 2, tu: 'TV2_VIP_CHUAN' },
    { k: 'muc', t: 'Quyền và nghĩa vụ đi kèm' },
    { k: 'bang', cot: ['Trục', 'Quyền của thành viên', 'Nghĩa vụ đi kèm', 'Điều khoản gốc'], tu: 'TV2_VIP_QL_B' },
    { k: 'van', t: 'Mỗi quyền trong bảng đều có nghĩa vụ nằm ngay cạnh. Đó là cách duy nhất để một chương trình gọi là VIP không biến thành một chương trình bán chỗ ngồi.' }
  ]},

'tr-bukatsu': { q: 'chung', k: 'Trại và VIP', t: 'Tham chiếu mô hình câu lạc bộ Nhật Bản',
  p: 'Phần này kèm một cảnh báo về chính tài liệu nguồn, và cảnh báo ấy quan trọng hơn nội dung.',
  khoi: [
    { k: 'van', t: 'Tệp *Mô hình Bukatsu* trong kho đã bị **tìm và thay thế toàn văn**: chữ “Bukatsu” bị đổi thành “Gen Việt”, cặp “senpai — kōhai” bị đổi thành “Gen A — Gen V”. Dấu vết còn nguyên trong bản gốc: tiêu đề đọc thành “Mô hình Gen Việt–Gen Việt”, và nhiều câu hụt chữ như *“Chuẩn thành viên và kỷ luật (kiểu … nhưng nhân văn)”*. Nghĩa là tài liệu tham chiếu ấy hiện không còn từ khoá nào để tra cứu ngược — chữ “Bukatsu” chỉ còn sót ở tên tệp.' },
    { k: 'van', t: 'Phần dưới vì vậy chỉ khẳng định đúng những gì tài liệu *thật sự viết*. Việc gọi tên mô hình Nhật Bản là khôi phục từ tên tệp, không phải từ nội dung. Học viện nên tìm lại bản gốc chưa bị thay chữ trước khi dùng phần này trong hồ sơ chính thức.' },
    { k: 'cd4', nhan: ['Điều tài liệu lấy', 'Vì sao lấy được', 'Gen Việt làm gì', 'Chỗ không bê nguyên'], tu: 'TV2_BUKATSU' },
    { k: 'muc', t: 'Đối chiếu chín trục' },
    { k: 'bang', cot: ['Trục so sánh', 'Mô hình tham chiếu', 'CLB Gen Việt', 'Vì sao khác'], tu: 'TV2_BUKATSU_B' }
  ]},

/* ══════════ BỔ SUNG NHÓM 31 · GIÁO ÁN ══════════ */
'ga-khung': { q: 'nghe_quan_ly', k: 'Giáo án', t: 'Khung cứng một buổi và một tiết',
  p: 'Phát hiện quan trọng nhất khi đọc kho giáo án: các chuyên đề tiểu học không phải giáo án rời. Chúng dùng chung một khung cứng, và chỉ thay ba thứ.',
  khoi: [
    { k: 'van', t: 'Mười ba chuyên đề lớp 2 đọc được đều chạy đúng một khung: *hai tiết × 45 phút, năm pha mỗi tiết, cùng mốc 8 – 10 – 12 – 12 – 3*. Mỗi chuyên đề chỉ thay ba thứ: một câu chuyện, một khẩu quyết ba tới năm chữ, và một bộ hai mươi tới bốn mươi thẻ tình huống. Hiểu điều này thì soạn chuyên đề mới không còn là việc sáng tạo từ đầu — nó là việc điền vào ba ô.' },
    { k: 'muc', t: 'Khung một buổi câu lạc bộ · chín mươi phút' },
    { k: 'giaoan', tu: 'GA_KHUNG_BUOI' },
    { k: 'muc', t: 'Khung hai tiết tiểu học · mười một pha' },
    { k: 'giaoan', tu: 'GA_KHUNG_TIET' },
    { k: 'muc', t: 'Mười tám luật dạy một buổi Gen Việt' },
    { k: 'luat', tu: 'GA_LUAT' },
    { k: 'muc', t: 'Mười lăm dấu hiệu buổi đang hỏng' },
    { k: 'canh', tu: 'GA_HONG' }
  ]},

'ga-khau-quyet': { q: 'chung', k: 'Giáo án', t: 'Hai mươi khẩu quyết',
  p: 'Khẩu quyết là hạt nhân của một chuyên đề tiểu học. Em quên hết mọi thứ khác vẫn còn nhớ ba tới năm chữ này.',
  khoi: [
    { k: 'luoi', c: 2, tu: 'GA_KHAU_QUYET' },
    { k: 'van', t: 'Đây là chỗ chương trình này khác một bài giảng kỹ năng sống thông thường. *Sớm 5 – Đủ 3 – Sẵn 1* là thứ một em lớp hai đọc được trong ba giây trước khi ra khỏi nhà. Một đoạn giảng về tầm quan trọng của sự đúng giờ thì không.' },
    { k: 'trich', t: 'Thứ còn lại sau khi quên hết mới là thứ đã dạy được.', n: 'Cách đọc bảng khẩu quyết' }
  ]},

'ga-buoi': { q: 'nghe_quan_ly', k: 'Giáo án', t: 'Bảy mươi ba buổi đã soạn',
  p: 'Mỗi buổi có mã, khối, tên, mục tiêu, hoạt động chính và đầu ra.',
  khoi: [
    { k: 'bang', cot: ['Mã', 'Khối', 'Tên buổi', 'Mục tiêu', 'Hoạt động chính', 'Đầu ra'], tu: 'GA_BUOI' },
    { k: 'van', t: 'Một sạn thật của nguồn đã được giữ nguyên thay vì âm thầm sửa: mã **GV2.02** bị gán cho hai chuyên đề khác nhau ở hai tệp, và bảy chuyên đề trong Cẩm nang mang mã không khớp nhóm mô-đun của chính danh mục ở đầu tệp. Mã giữ đúng như nguồn ghi, chỗ trùng được đánh dấu. Học viện nên chốt lại bảng mã trước khi in.' }
  ]},

'ga-hoat-dong': { q: 'nghe_quan_ly', k: 'Giáo án', t: 'Ngân hàng ba mươi hai hoạt động',
  p: 'Cầm lên chơi được ngay. Cột cuối nói rõ hoạt động ấy rèn cái gì — nếu không trả lời được thì bỏ hoạt động đó ra.',
  khoi: [
    { k: 'bang', cot: ['Tên hoạt động', 'Khối phù hợp', 'Thời lượng', 'Cách chơi', 'Rèn điều gì'], tu: 'GA_HOAT_DONG' },
    { k: 'van', t: 'Ngân hàng này giải quyết vấn đề thực tế nhất của một giáo viên mới: buổi còn mười phút và không biết làm gì. Có ba mươi hai lựa chọn ghi sẵn thời lượng thì không còn phải ứng biến.' }
  ]},

'ga-hoc-ky': { q: 'nghe_quan_ly', k: 'Giáo án', t: 'Mười lăm tuần một học kỳ',
  p: 'Từ tuần khảo sát xuất phát tới tuần tổng kết, kèm mười bốn biểu mẫu đi theo từng tuần.',
  khoi: [
    { k: 'bang', cot: ['Tuần', 'Nội dung', 'Trọng tâm', 'Sản phẩm tuần'], tu: 'GA_HOC_KY' },
    { k: 'muc', t: 'Mười bốn biểu mẫu học kỳ' },
    { k: 'bang', cot: ['Mã', 'Biểu mẫu', 'Dùng ở tuần', 'Để làm gì'], tu: 'GA_BIEU_MAU' },
    { k: 'muc', t: 'Chín phần của Phần 0' },
    { k: 'moc', tu: 'GA_PHAN_0' },
    { k: 'van', t: 'Tuần 1 là *phiếu khảo sát xuất phát điểm*, và tuần cuối đối chiếu lại chính phiếu ấy. Không có phiếu tuần 1 thì mọi con số cuối kỳ chỉ là mô tả, không phải bằng chứng — đúng như khung nghiên cứu ở nhóm 26 đã đặt ra.' }
  ]}

};

/* ══════════ BẢNG TRA — nối khối "tu" tới dữ liệu thật ══════════
   Khối trong GV.MAN không ôm dữ liệu; nó trỏ tới một khoá ở đây. Nhờ vậy
   một bộ dữ liệu dùng được ở nhiều màn mà không phải chép lần thứ hai. */
/* ══════════ BẢNG KHOÁ TRA ══════════
   Chỉ còn những khoá CÓ BIẾN ĐỔI. Khoá chuyển thẳng từ kho ra
   (X: GV.X) đã bỏ hết — nen/dan-xuat.js để mọi kho tự đăng ký,
   nên thêm một kho mới không phải chạm vào tệp này nữa. */
GV.TU = {
  /* Hai khoá này thuộc BỘ MÁY nhưng cũng là nội dung của hai màn,
     nên tầng dẫn xuất cố ý không đụng tới — phải khai ở đây. */
  LUAT_QUYEN: GV.LUAT_QUYEN,

  /* nhóm 22 · 52 tuần — cùng một kho, chiếu ra bốn bảng theo chu kỳ
     và hai bảng chu kỳ. Chia nhỏ vì một bảng 52 dòng thì không ai đọc. */
  /* nhóm 31–33 · kho do sáu luồng khai thác nguồn viết ra.
     Vài bảng mang sẵn dòng tiêu đề trong dữ liệu; khối "bang" đã
     có cột riêng nên phải cắt dòng ấy đi, nếu không nó hiện hai lần. */
  CD_KHUNG_B: GV.CD_KHUNG.slice(1),
  CD_DE_TAI_B: GV.CD_DE_TAI.slice(1),
  CD_TAI_NANG_B: GV.CD_TAI_NANG.slice(1),
  CD_TRUC_B: GV.CD_TRUC.slice(1),
  CD_KHUNG_CD_B: GV.CD_KHUNG_CD.slice(1),
  CD_GIA_TRI_B: GV.CD_GIA_TRI_7_TUAN.slice(1),
  VH2_SO_DO_B: GV.VH2_SO_DO.slice(1),
  VH2_RACI_B: GV.VH2_RACI.slice(1),
  VH2_KPI_B: GV.VH2_KPI.slice(1),
  VH2_BIEU_MAU_B: GV.VH2_BIEU_MAU.slice(1),
  TV2_VIP_CT_B: GV.TV2_VIP_CHUONG_TRINH.slice(1),
  TV2_VIP_QL_B: GV.TV2_VIP_QUYEN_LOI.slice(1),
  TV2_BUKATSU_B: GV.TV2_BUKATSU_DOI_CHIEU.slice(1),

  /* nhóm 21 · hai thang — viết ra để không ai phải đoán */
  HAI_THANG: [
    { t: 'MƯỜI LĂM GIAI ĐOẠN — thang nội dung',
      n: 'Trả lời câu: em đang rèn cái gì. Bốn cụm: Nền (1–6) · Cách học (7–9) · Kết quả (10–11) · Bộ công cụ (12–15).',
      vi: 'Đây là thang CHUẨN, rút từ tài liệu gốc của Học viện. Mọi giáo án, kỳ nghiệm thu và hồ sơ chuyên môn đều nói bằng thang này.' },
    { t: 'SÁU BẬC B1–B6 — thang quyền',
      n: 'Trả lời câu khác hẳn: tài khoản của em mở được tới đâu trong hệ.',
      vi: 'Thang thô, sáu nấc, chỉ phục vụ phân quyền. Không dùng nó để mô tả năng lực của một em — đó là việc của thang giai đoạn.' }
  ],

  /* nhóm 20 · sổ cái — cột cuối do MÁY đếm, không do người điền */
  SC_YC_BANG: GV.SC_YEU_CAU.map(function (d) {
    return [d.ma, d.y, (d.man || []).join(' · '), (d.kho || []).map(function (k) { return 'GV.' + k; }).join(' · ')];
  }),
  SC_NO_BANG: GV.SC_MON_NO.map(function (d) {
    var v = GV[d.kho];
    var n = Array.isArray(v) ? v.length : (v ? Object.keys(v).length : 0);
    return [d.t, String(d.so), 'GV.' + d.kho, String(n)];
  }),

  T52_CHU_KY_L: GV.T52_CHU_KY.map(function (c) {
    return { t: c.ma + ' · ' + c.t + '  (' + c.tuan + ')', n: c.hoi, vi: c.n };
  }),
  T52_CHU_KY_B: GV.T52_CHU_KY.map(function (c) { return [c.ma + ' · ' + c.t, c.tuan, c.hoi]; }),
  T52_C1: GV.T52_TUAN.filter(function (w) { return w.ky === 'C1'; })
    .map(function (w) { return ['Tuần ' + w.s, w.t, w.m, w.r]; }),
  T52_C2: GV.T52_TUAN.filter(function (w) { return w.ky === 'C2'; })
    .map(function (w) { return ['Tuần ' + w.s, w.t, w.m, w.r]; }),
  T52_C3: GV.T52_TUAN.filter(function (w) { return w.ky === 'C3'; })
    .map(function (w) { return ['Tuần ' + w.s, w.t, w.m, w.r]; }),
  T52_C4: GV.T52_TUAN.filter(function (w) { return w.ky === 'C4'; })
    .map(function (w) { return ['Tuần ' + w.s, w.t, w.m, w.r]; }),

  /* nhóm 1 */
  DINH_VI_BANG: GV.DINH_VI.bang.map(function (r) { return [r.truc, r.gita, r.gv]; }),
  HO_CHIEU_TRUONG: GV.TRUC_DOC.truong.map(function (r) { return [r.k, r.v]; }),
  BAC_MUC: GV.BAC_MUC.map(function (r) { return [r.bac, r.doi, r.chinh]; }),

  /* nhóm 2 */
  HINH_THAI: GV.HINH_THAI.map(function (r) { return [r.ma, r.t, r.nhip, r.manh, r.yeu, r.dung, r.bac]; }),
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

  /* nhóm 4 */
  TUAN: GV.TUAN.map(function (r) { return { a: r.ng, b: r.v }; }),

  /* nhóm 5 */
  KPI_HE: GV.KPI_HE.map(function (r) { return [r.t, r.vi, r.dv]; }),
  CONG_LUAT: GV.CONG.luat,
  CONG_BANG: GV.CONG.bang,
  CONG_QUYET: GV.CONG.quyet.map(function (r) { return [r.d, r.q]; }),
  BAO_CAO: GV.BAO_CAO.map(function (r) { return [r.c, r.ai, r.gui, r.han, r.gom]; }),

  /* nhóm 6 */
  MA_HOA: GV.MA_HOA.map(function (r) { return [r.ma, r.la, r.gt]; }),
  GHEP: { t: GV.GHEP_KHONG_LUU.t, n: GV.GHEP_KHONG_LUU.n, vi: GV.GHEP_KHONG_LUU.vi },
  BANG_LUU: GV.BANG_LUU.map(function (r) { return [r.b, r.k, r.n]; }),
  API: GV.API.map(function (r) { return [r.d, r.v]; }),
  QUYEN: GV.QUYEN.map(function (r) { return [r.q, r.v, r.ai]; }),
  CONG_NGHE: GV.CONG_NGHE.map(function (r) { return [r.ten + ' — ' + r.chang, r.lam, r.duoc, r.han, r.phai]; }),
  LUU_BA_TANG: GV.LUU_BA_TANG.map(function (r) { return { t: r.t, n: r.gi, vi: r.mat }; }),

  /* nhóm 7 */
  TC_LUAT: { t: GV.TAI_CHINH.luat, n: GV.TAI_CHINH.vi },
  TC_DONG: GV.TAI_CHINH.dong.map(function (r) { return [r.t, r.vai, r.ty]; }),
  TC_QUY: { t: GV.TAI_CHINH.quy.t, n: GV.TAI_CHINH.quy.n + ' ' + GV.TAI_CHINH.quy.dung, vi: GV.TAI_CHINH.quy.vi },
  AT_LUAT: GV.AN_TOAN.luat,
  AT_DAU: GV.AN_TOAN.dau,
  AT_QUY: GV.AN_TOAN.quy.map(function (r) { return r.v; }),

  /* nhóm 3 · kho chuyên môn */
  MA_TRAN: GV.MA_TRAN.map(function (r) { return [r.l, r.g, r.i, r.t, r.a, r.dl, r.vai, r.ra]; }),
  NHOM_GP: GV.NHOM_GP.map(function (r) {
    return { t: r.m + ' · ' + r.t, n: r.n, vi: 'Trục Gen Việt: ' + r.truc + ' — ' + r.vi };
  }),
  THANG_HT: GV.THANG_HT.map(function (r) { return ['Mức ' + r.m, r.t, r.vd]; }),
  TU_DONG: GV.TU_DONG.map(function (r) { return [r.th, r.muc, r.he, r.hs, r.ph, r.co]; }),

  /* nhóm 6 · ngôn ngữ và văn hoá */
  NGON_NGU: GV.NGON_NGU.map(function (r) { return [r.x, r.o, r.vi]; }),
  NGHI_LE: GV.NGHI_LE.map(function (r) {
    return { t: r.t, n: 'Khi nào: ' + r.khi + '. ' + r.n, vi: r.vi };
  }),
  GHI_NHAN_LUAT: GV.GHI_NHAN.luat,
  GHI_NHAN_CAP: GV.GHI_NHAN.cap.map(function (r) { return ['Cấp ' + r.c, r.t, r.dk, r.bieu]; }),
  WOW: GV.WOW.map(function (r) { return { b: r.n, t: r.t, ai: r.ai, n: r.y }; }),

  /* nhóm 8 · tư vấn và đường vào */
  MACH_TU_VAN: GV.MACH_TU_VAN.map(function (r) { return [r.nc, r.dh, r.ch, r.tang, r.gt]; }),
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

  /* nhóm 13 · thư viện Gen Việt */
  TV_Q1: GV.TV_Q1, TV_Q2: GV.TV_Q2, TV_Q3: GV.TV_Q3,
  TV_Q4: GV.TV_Q4, TV_Q5: GV.TV_Q5, TV_Q6: GV.TV_Q6,
  TV_PC_BANG: GV.TV_PHAM_CHAT.map(function (r) { return [r.pc, r.ai, r.hoi]; }),
  TV_CACH_DUNG: GV.TV_CACH_DUNG.map(function (r) { return [r.noi, r.nhip, r.lam, r.kiem]; }),
  TV_NGUON: GV.TV_NGUON.map(function (r) { return [r.t, r.l]; }),

  /* nhóm 12 · triển khai */
  NGAY_90: GV.NGAY_90.map(function (r) { return [r.tuan, r.viec, r.ai, r.ra]; }),
  NGUON: GV.NGUON.map(function (r) { return [r.t, r.l]; }),

  /* nhóm 14 · trải nghiệm và cam kết */
  TN_XUYEN_SUOT: [
    'Mỗi chặng phải để lại *một vật cầm được*. Chặng nào không có vật thì chặng ấy không được nhớ.',
    'Mỗi chặng có một *dấu hiệu đang rơi* được định nghĩa trước — không đợi tới lúc gia đình nói mới biết.',
    'Việc cứu luôn là một *việc*, không phải một lời. Gọi điện thuyết phục không phải việc cứu.'
  ],
  TN_HIEN_VAT_BANG: GV.TN_HIEN_VAT.map(function (r) { return [r.t, r.khi, r.ai, r.cach, r.vi]; }),

  /* nhóm 15 · giá trị và tăng trưởng */
  GT_THONG_DIEP_L: GV.GT_THONG_DIEP.map(function (r) { return { t: r.t, n: r.n }; }),

  /* nhóm 16 · bằng chứng và tin cậy */
  TC_TANG_BC: GV.TC_TANG_BC.map(function (r) { return { so: r.so, t: r.t, n: r.n, v: r.v }; }),

  /* nhóm 17 · nhận diện thương hiệu */
  TH_KT_THAP: GV.TH_KIEN_TRUC.map(function (r) {
    return { ma: r.ma, t: r.t, toc: r.tang, giu: r.n, ai: 'Admin sản phẩm (R05) gác', chi: r.vd };
  }),
  TH_AN_BT_BANG: GV.TH_AN_BIEN_THE.map(function (r) { return [r.ma, r.t, r.n, r.dung, r.toi]; }),

  /* nhóm 20 · tra cứu */
  TC_BAN_DO_L: GV.TC_BAN_DO.map(function (r) {
    return { t: r.t + '  ·  ' + r.nhom, n: r.n, vi: r.vi };
  }),
  /* nhóm 21–26 · năm tuyến Gen Việt */
  TY_PIPELINE_T: GV.TY_PIPELINE.map(function (r) {
    return { ma: r.ma, t: r.t, toc: r.gd, giu: r.n, ai: 'Ban Điều hành CLB xét', chi: r.vi };
  }),
  TY_KHOI_NHOM_L: GV.TY_KHOI_NHOM.map(function (r) {
    return { so: r.so, t: r.t, n: r.n, v: r.v };
  }),
  TY_GD_90_N: GV.TY_GD_90.map(function (r) {
    return { q: r.ma, chu: r.t + '  ·  ' + r.tuan, mau: r.mau, viec: r.lam,
             so: [r.dich, 'Đầu ra: ' + r.ra] };
  }),

};
