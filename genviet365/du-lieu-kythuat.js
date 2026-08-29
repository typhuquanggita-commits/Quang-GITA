/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · KHO KỸ THUẬT
   Mô hình dữ liệu hộ chiếu · bảng lưu · giao diện máy chủ · quyền ·
   nguyên tắc dựng phần mềm cho một hệ chạy ba mươi năm.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var GV = window.GV || {};
window.GV = GV;

/* ══════════ HỘ CHIẾU NHÂN TÀI — CẤU TRÚC ══════════
   Viết dưới dạng JSON vì JSON là thứ đọc được sau ba mươi năm mà không
   cần phần mềm nào của hôm nay còn tồn tại. Mọi định dạng khác (bảng
   tính, cơ sở dữ liệu, kho riêng) đều là bản sao phục vụ tốc độ; bản
   JSON là bản gốc.                                                     */
GV.HO_CHIEU_JSON =
'{\n' +
'  "ma": "GV-2026-HN-000123",          // không đổi trọn đời\n' +
'  "ban": 7,                            // số bản, tăng mỗi lần đóng chu kỳ\n' +
'  "nguoi": {\n' +
'    "ten": "...", "namSinh": 2013, "vung": "HN",\n' +
'    "vaoHe": "2026-03-14", "muiNhon": "Truyền thông"\n' +
'  },\n' +
'  "bac": [\n' +
'    { "ma": "B1", "dat": "2026-09-02", "diem": 88,\n' +
'      "assessor": "R10-004", "hoSo": "CG.B1.90.02" },\n' +
'    { "ma": "B2", "dat": null, "chuKyDangChay": 3 }\n' +
'  ],\n' +
'  "truc": [                            // chụp lại mỗi 90 ngày\n' +
'    { "ngay": "2026-09-02",\n' +
'      "muc": { "1":3, "2":3, "3":4, "4":3, "5":2, "6":3,\n' +
'               "7":3, "8":2, "9":2, "10":1, "11":2, "12":1 } }\n' +
'  ],\n' +
'  "hoTro": [                           // đường cong hỗ trợ — cột quan trọng nhất\n' +
'    { "ngay": "2026-03-14", "muc": 5 },\n' +
'    { "ngay": "2026-09-02", "muc": 3 }\n' +
'  ],\n' +
'  "chiHoi": { "ma": "CH-HN-01", "vong": "V2", "ghe": null,\n' +
'              "vaoNgay": "2026-04-01" },\n' +
'  "bangChung": [\n' +
'    { "loai": "duAn", "ma": "DA.2026.B2.004", "moiTruong": "M4",\n' +
'      "nguoiThuHuong": 12, "xacNhan": "UBND phường ..." }\n' +
'  ],\n' +
'  "nguoiDaRen":  ["R07-011", "R07-023"],   // ai đã rèn em ấy\n' +
'  "nguoiEmDaRen": [],                      // em ấy đã rèn ai — đo tự tái tạo\n' +
'  "quyen": { "giaDinhXem": true, "xuatBanSao": true, "yeuCauXoa": true }\n' +
'}';

GV.HO_CHIEU_LUAT = [
  { t: 'Chỉ thêm, không sửa', n: 'Một chu kỳ đã đóng thì không được sửa số. Sai thì ghi bản ghi đính chính mới, kèm lý do và người đính chính. Lịch sử sai vẫn là lịch sử.' },
  { t: 'Mọi bản ghi đều có người chịu trách nhiệm', n: 'Không có trường nào được ghi bởi "hệ thống". Ai chấm, ai xác nhận, ai nhập — đều có mã người.' },
  { t: 'Xuất được là điều kiện sống', n: 'Mỗi quý xuất toàn bộ ra JSON + PDF và mở thử trên máy không có hệ thống. Không mở được thì coi như hỏng, dừng mọi việc khác để sửa.' },
  { t: 'Gia đình là chủ sở hữu', n: 'Xem toàn bộ, xuất bản sao, yêu cầu xoá — thực hiện trong 30 ngày, kể cả khi đang trong hợp đồng.' },
  { t: 'Ẩn danh khi phân tích', n: 'Báo cáo toàn hệ chạy trên dữ liệu đã bỏ tên. Người phân tích dữ liệu không mở được hồ sơ của một nhà cụ thể.' }
];

/* ══════════ BẢNG LƯU ══════════ */
GV.BANG_LUU = [
  { b: 'NGUOI', k: 'ma · ten · namSinh · vung · vai · trangThai', n: 'Một dòng một người, cả học viên lẫn đội ngũ. Mã là khoá duy nhất của toàn hệ' },
  { b: 'HOSO_BAC', k: 'maNguoi · bac · ngayDat · diem · assessor · maHoSo', n: 'Một dòng mỗi lần qua cổng. Không ghi đè' },
  { b: 'DIEM_TRUC', k: 'maNguoi · ngayChup · truc1..truc12', n: 'Chụp mỗi 90 ngày. Đây là bảng vẽ ra đường đi của một người' },
  { b: 'MUC_HOTRO', k: 'maNguoi · ngay · muc · nguoiCham', n: 'Bảng nhỏ nhất nhưng quan trọng nhất — đường cong hỗ trợ' },
  { b: 'CHIHOI', k: 'ma · ten · vung · ngayLap · coVan · trangThai', n: 'Gồm cả chi hội đang chạy thử' },
  { b: 'THANHVIEN', k: 'maNguoi · maChiHoi · vong · ghe · muiNhon · ngayVao · ngayRa', n: 'Lịch sử vòng và ghế, không ghi đè khi lên vòng' },
  { b: 'BANGSO_TUAN', k: 'maNguoi · tuan · C · D · T · G · K · B · P · bang', n: 'Bảng lớn nhất về số dòng. 30 thành viên × 52 tuần × số chi hội' },
  { b: 'CAPDOI', k: 'tuan · nguoiA · nguoiB · daLam · maPhieu', n: 'Dùng để ghép cặp không trùng và để đo mạng lưới quan hệ trong chi hội' },
  { b: 'MINHCHUNG', k: 'maNguoi · loai · moiTruong · moTa · nguoiXacNhan · tep', n: 'Mọi bằng chứng đổ về đây rồi mới vào hộ chiếu' },
  { b: 'PHUNGSU', k: 'maNguoi · duAn · gio · nguoiThuHuong · noiXacNhan', n: 'Tách riêng khỏi MINHCHUNG vì cần tổng hợp theo chi hội và theo năm' },
  { b: 'CA', k: 'maHoc · maCoach · tang · trangThai · ngayMo · ngayDong', n: 'Nối sang hệ GITA 365 — một người có thể vừa là học viên Gen Việt vừa có ca GITA' },
  { b: 'NHATKY_HE', k: 'thoiGian · nguoi · viec · doiTuong · truocSau', n: 'Ghi mọi thay đổi dữ liệu. Bảng này không ai được xoá, kể cả Super Admin' }
];

/* ══════════ GIAO DIỆN MÁY CHỦ ══════════ */
GV.API = [
  { d: 'GET  /hoso/{ma}', v: 'Trả hộ chiếu đầy đủ. Gia đình lấy được hộ chiếu của con mình; đội ngũ lấy được theo phạm vi vai' },
  { d: 'GET  /hoso/{ma}/xuat?dang=json|pdf', v: 'Xuất bản sao. Không giới hạn số lần — quyền của người sở hữu' },
  { d: 'POST /bangso', v: 'Thành viên nộp bảng số tuần. Sau hạn thì vẫn nhận nhưng đánh dấu nộp muộn' },
  { d: 'POST /minhchung', v: 'Nộp bằng chứng kèm tệp. Trạng thái mặc định là CHỜ XÁC NHẬN' },
  { d: 'POST /minhchung/{id}/xacnhan', v: 'Người có quyền xác nhận. Ghi mã người xác nhận, không ghi "hệ thống"' },
  { d: 'POST /cong', v: 'Mở một phiên nghiệm thu. Assessor chấm sáu cột, hệ tính tổng, không ai sửa tổng' },
  { d: 'GET  /chihoi/{ma}/tuan/{n}', v: 'Bảng số cả chi hội một tuần — dữ liệu để chiếu trong buổi họp' },
  { d: 'GET  /chiso?vung=&nam=', v: 'Bảy chỉ số hệ thống. Chạy trên dữ liệu đã ẩn danh' },
  { d: 'POST /chuyentuyen', v: 'Phiếu BM-14. Gửi thẳng Quản lý chuyên môn, không đi qua ai khác, và không xoá được' }
];

/* ══════════ QUYỀN — NỐI VÀO BẢNG PERM SẴN CÓ ══════════ */
GV.QUYEN = [
  { q: 'gv_hoso_minh', v: 'Xem hộ chiếu của mình hoặc của con mình', ai: 'Học viên · Phụ huynh' },
  { q: 'gv_bangso_ghi', v: 'Nộp bảng số tuần', ai: 'Thành viên chi hội' },
  { q: 'gv_bangso_congbo', v: 'Công bố bảng số cả chi hội', ai: 'Thư ký · Đội trưởng CLB' },
  { q: 'gv_minhchung_xacnhan', v: 'Xác nhận bằng chứng', ai: 'Coach · Giáo viên · Trưởng ban Phụng sự' },
  { q: 'gv_cong_cham', v: 'Chấm cổng nghiệm thu', ai: 'Chuyên gia đánh giá — KHÔNG mở cho người dạy chính ca đó' },
  { q: 'gv_bac_congnhan', v: 'Công nhận bậc 5–6', ai: 'Hội đồng Chuẩn' },
  { q: 'gv_chihoi_quantri', v: 'Lập, đổi, đóng chi hội', ai: 'Liên chi hội vùng · Admin' },
  { q: 'gv_chiso_toanhe', v: 'Xem bảy chỉ số toàn hệ', ai: 'R01–R04 · Phân tích dữ liệu (dữ liệu ẩn danh)' },
  { q: 'gv_chuyentuyen', v: 'Gửi và đọc phiếu chuyển tuyến', ai: 'Coach gửi · Quản lý chuyên môn đọc. Không ai khác' },
  { q: 'gv_xoa_theo_yeucau', v: 'Thực hiện yêu cầu xoá của gia đình', ai: 'Super Admin, có ghi nhật ký không xoá được' }
];

/* ══════════ NGUYÊN TẮC DỰNG PHẦN MỀM CHO BA MƯƠI NĂM ══════════ */
GV.NGUYEN_TAC_KT = [
  { t: 'Ghép chứ không lưu',
    n: 'Mọi ma trận đều lưu theo lớp rồi ghép lúc hiển thị. 220 vấn đề × 5 tầng × 4 băng = 4.400 phiếu, lưu bốn lớp thay vì 4.400 bản ghi. Sửa một chuẩn thì tất cả cùng đúng.' },
  { t: 'Dữ liệu tách hoàn toàn khỏi giao diện',
    n: 'Đổi nội dung chỉ sửa tệp dữ liệu. Người sửa nội dung trong hai mươi năm tới có thể không phải lập trình viên — và không cần phải là.' },
  { t: 'Một nguồn sự thật cho mỗi con số',
    n: 'Bảng phân quyền, danh sách bậc, thang mức chỉ tồn tại đúng một chỗ. Chép ra chỗ thứ hai là mở đường cho hai chỗ lệch nhau.' },
  { t: 'Máy chủ luôn kiểm lại',
    n: 'Giao diện ẩn hiện nút cho gọn mắt. Quyền thật kiểm ở máy chủ trước mọi lần ghi, không có ngoại lệ.' },
  { t: 'Không khoá vào nền tảng',
    n: 'Bản gốc là JSON. Apps Script, cơ sở dữ liệu, kho mã hoá đều là bản sao phục vụ tốc độ, thay được mà không mất dữ liệu.' },
  { t: 'Số bản phải nhích mỗi lần phát hành',
    n: 'Số bản đứng yên trong khi nội dung đổi là một cách nói dối không cố ý — người dùng mở nhầm tệp cũ và tưởng phần sửa chưa chạy.' },
  { t: 'Bộ kiểm chạy trước mỗi lần phát hành',
    n: 'Kiểm toàn vẹn liên kết, phân quyền từng vai × từng màn, chống tiêm mã, và rà chỗ trống: màn có khung mà không có ruột vẫn chạy tốt và vẫn xanh mọi bài kiểm cũ.' }
];
