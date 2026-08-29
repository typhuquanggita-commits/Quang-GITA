# -*- coding: utf-8 -*-
"""HỆ PHÂN QUYỀN GITA — 8 vai trò × 16 nhóm tài nguyên × 5 tầng năng lực học viên.

Ký hiệu quyền:
  X   không có quyền
  R   xem
  R!  xem có điều kiện (điều kiện ghi ở cột "Điều kiện")
  R°  xem bản rút gọn, không thấy chi tiết bài làm
  RW  xem và sửa
  RWD xem, sửa, xoá
  A   phê duyệt hoặc cấp quyền (bao hàm RWD)
"""

VAI_TRO = {
    "HS":   {"ten": "Học sinh", "bac": 1,
             "pham_vi": "Chỉ dữ liệu của chính mình",
             "mo_ta": "Người học. Nội dung mở theo tầng năng lực M1–M5."},
    "GV":   {"ten": "Giáo viên", "bac": 3,
             "pham_vi": "Các lớp mình được phân công dạy",
             "mo_ta": "Dạy, chấm, mở đề thi, nhập nhận xét, đề xuất sửa học liệu."},
    "CO":   {"ten": "Coach", "bac": 3,
             "pham_vi": "Các học viên mình kèm cặp",
             "mo_ta": "Kèm sát lộ trình cá nhân, không mở đề thi, không sửa học liệu."},
    "TV":   {"ten": "Tư vấn", "bac": 2,
             "pham_vi": "Ứng viên và phụ huynh do mình phụ trách",
             "mo_ta": "Tổ chức test đầu vào, tư vấn lộ trình. Không xem chi tiết bài làm."},
    "ASP":  {"ten": "Admin sản phẩm", "bac": 4,
             "pham_vi": "Toàn bộ kho học liệu",
             "mo_ta": "Biên soạn, phê duyệt và phát hành học liệu. Không chạm dữ liệu học viên."},
    "AHT":  {"ten": "Admin hệ thống", "bac": 4,
             "pham_vi": "Toàn hệ thống về mặt kỹ thuật",
             "mo_ta": "Tài khoản, phân quyền, nhật ký, cấu hình. Không biên soạn học liệu."},
    "GDDH": {"ten": "Giám đốc điều hành", "bac": 5,
             "pham_vi": "Toàn hệ thống ở mức báo cáo",
             "mo_ta": "Xem mọi báo cáo, phê duyệt chính sách. Không sửa dữ liệu tác nghiệp."},
    "SA":   {"ten": "Super Admin", "bac": 6,
             "pham_vi": "Toàn quyền",
             "mo_ta": "Chỉ dùng khi xử lý sự cố. Mọi thao tác đều bị ghi nhật ký."},
}

TAI_NGUYEN = {
    "phieu_de":    "Đề của phiếu học (LT, DB, KN, NC, OT, TH)",
    "phieu_gp":    "Phiếu Lời giải & Phân tích chuyên sâu",
    "phieu_hd":    "Phiếu Hướng dẫn ôn chắc chuyên đề",
    "ban_do":      "Bản đồ kiến thức theo kỳ",
    "de_moc":      "Đề thi mốc (GK1, CK1, GK2, CK2)",
    "de_nl":       "Đề đánh giá năng lực",
    "test_dv":     "Test đầu vào và kết quả xếp lớp",
    "ho_so_minh":  "Hồ sơ học tập của chính mình",
    "ho_so_hv":    "Hồ sơ học tập của học viên khác",
    "bao_cao_lop": "Báo cáo lớp và khối",
    "bao_cao_ht":  "Báo cáo toàn hệ thống",
    "chi_muc":     "Chỉ mục và danh mục kho học liệu",
    "bien_soan":   "Biên soạn, sửa và phát hành học liệu",
    "tai_khoan":   "Tài khoản và phân quyền",
    "nhat_ky":     "Nhật ký hệ thống",
    "cau_hinh":    "Cấu hình hệ thống",
}

# quyền[tài nguyên][vai trò] = (quyền, điều kiện)
QUYEN = {
    "phieu_de": {"HS": ("R!", "Chỉ phiếu đã mở theo tầng năng lực và lộ trình"),
                 "GV": ("R", ""), "CO": ("R", ""), "TV": ("R!", "Chỉ phiếu mẫu để tư vấn"),
                 "ASP": ("A", ""), "AHT": ("R", ""), "GDDH": ("R", ""), "SA": ("A", "")},
    "phieu_gp": {"HS": ("R!", "Chỉ mở sau khi đã nộp bài phiếu tương ứng"),
                 "GV": ("R", ""), "CO": ("R", ""), "TV": ("X", ""),
                 "ASP": ("A", ""), "AHT": ("R", ""), "GDDH": ("R", ""), "SA": ("A", "")},
    "phieu_hd": {"HS": ("R", ""), "GV": ("R", ""), "CO": ("R", ""), "TV": ("R", ""),
                 "ASP": ("A", ""), "AHT": ("R", ""), "GDDH": ("R", ""), "SA": ("A", "")},
    "ban_do":   {"HS": ("R", ""), "GV": ("R", ""), "CO": ("R", ""), "TV": ("R", ""),
                 "ASP": ("A", ""), "AHT": ("R", ""), "GDDH": ("R", ""), "SA": ("A", "")},
    "de_moc":   {"HS": ("R!", "Chỉ khi giáo viên mở đề và chỉ biến thể hợp tầng năng lực"),
                 "GV": ("RW", "Mở, đóng và giao đề cho lớp mình"),
                 "CO": ("R", ""), "TV": ("X", ""),
                 "ASP": ("A", ""), "AHT": ("R", ""), "GDDH": ("R", ""), "SA": ("A", "")},
    "de_nl":    {"HS": ("R!", "Từ tầng M5, hoặc khi giáo viên mở"),
                 "GV": ("RW", ""), "CO": ("R", ""), "TV": ("R!", "Chỉ đề mẫu"),
                 "ASP": ("A", ""), "AHT": ("R", ""), "GDDH": ("R", ""), "SA": ("A", "")},
    "test_dv":  {"HS": ("R!", "Chỉ kết quả của chính mình"),
                 "GV": ("RW", ""), "CO": ("RW", ""), "TV": ("RW", "Tổ chức và chấm test đầu vào"),
                 "ASP": ("R", ""), "AHT": ("R", ""), "GDDH": ("R", ""), "SA": ("A", "")},
    "ho_so_minh": {"HS": ("RW", "Sửa được thông tin cá nhân, KHÔNG sửa được điểm đã chấm"),
                   "GV": ("X", ""), "CO": ("X", ""), "TV": ("X", ""),
                   "ASP": ("X", ""), "AHT": ("X", ""), "GDDH": ("X", ""), "SA": ("R", "")},
    "ho_so_hv": {"HS": ("X", ""), "GV": ("RW", "Chỉ học viên lớp mình dạy"),
                 "CO": ("RW", "Chỉ học viên mình kèm"),
                 "TV": ("R°", "Chỉ thông tin tuyển sinh và kết quả test, không xem bài làm"),
                 "ASP": ("X", ""), "AHT": ("R!", "Chỉ khi xử lý sự cố, có ghi nhật ký"),
                 "GDDH": ("R°", ""), "SA": ("A", "")},
    "bao_cao_lop": {"HS": ("X", ""), "GV": ("R", ""), "CO": ("R", ""), "TV": ("R°", ""),
                    "ASP": ("X", ""), "AHT": ("R", ""), "GDDH": ("R", ""), "SA": ("A", "")},
    "bao_cao_ht": {"HS": ("X", ""), "GV": ("X", ""), "CO": ("X", ""), "TV": ("X", ""),
                   "ASP": ("R", ""), "AHT": ("R", ""),
                   "GDDH": ("RW", "Phê duyệt chính sách học vụ"), "SA": ("A", "")},
    "chi_muc":  {"HS": ("R", ""), "GV": ("R", ""), "CO": ("R", ""), "TV": ("R", ""),
                 "ASP": ("A", ""), "AHT": ("R", ""), "GDDH": ("R", ""), "SA": ("A", "")},
    "bien_soan": {"HS": ("X", ""), "GV": ("R!", "Chỉ đề xuất sửa, không tự phát hành"),
                  "CO": ("X", ""), "TV": ("X", ""),
                  "ASP": ("A", "Phê duyệt và phát hành"), "AHT": ("X", ""),
                  "GDDH": ("R", ""), "SA": ("A", "")},
    "tai_khoan": {"HS": ("R!", "Chỉ tài khoản của mình"), "GV": ("X", ""), "CO": ("X", ""),
                  "TV": ("X", ""), "ASP": ("X", ""), "AHT": ("A", ""),
                  "GDDH": ("R", ""), "SA": ("A", "")},
    "nhat_ky":  {"HS": ("X", ""), "GV": ("X", ""), "CO": ("X", ""), "TV": ("X", ""),
                 "ASP": ("R!", "Chỉ nhật ký thay đổi học liệu"), "AHT": ("RWD", ""),
                 "GDDH": ("R", ""), "SA": ("A", "")},
    "cau_hinh": {"HS": ("X", ""), "GV": ("X", ""), "CO": ("X", ""), "TV": ("X", ""),
                 "ASP": ("R", ""), "AHT": ("RWD", ""), "GDDH": ("R", ""), "SA": ("A", "")},
}

# Tầng năng lực học viên — quyết định học liệu được mở
TANG = [
    {"ma": "M1", "ten": "Vững nền", "nguong": 0,
     "mo": ["LT", "DB", "KN", "HD"], "tuyen": ["T1"], "de_moc": [], "de_nl": False,
     "mo_ta": "Mặc định khi mới vào học hoặc điểm trung bình dưới 40%."},
    {"ma": "M2", "ten": "Thành thạo", "nguong": 40,
     "mo": ["LT", "DB", "KN", "HD", "NC"], "tuyen": ["T1"], "de_moc": ["D06"], "de_nl": False,
     "mo_ta": "Trung bình ba phiếu gần nhất từ 40% trở lên."},
    {"ma": "M3", "ten": "Vận dụng", "nguong": 60,
     "mo": ["LT", "DB", "KN", "HD", "NC", "OT"], "tuyen": ["T1"],
     "de_moc": ["D02", "D06"], "de_nl": False,
     "mo_ta": "Trung bình ba phiếu gần nhất từ 60% trở lên."},
    {"ma": "M4", "ten": "Vượt ngưỡng", "nguong": 75,
     "mo": ["LT", "DB", "KN", "HD", "NC", "OT", "TH"], "tuyen": ["T1", "T2*"],
     "de_moc": ["D01", "D02", "D03", "D04", "D06", "D07", "D08"], "de_nl": False,
     "mo_ta": "Từ 75% trở lên. Mở Tuyến 2 ở đúng nhóm chuyên đề đã đạt M4."},
    {"ma": "M5", "ten": "Điểm 10 GITA", "nguong": 90,
     "mo": ["LT", "DB", "KN", "HD", "NC", "OT", "TH"], "tuyen": ["T1", "T2"],
     "de_moc": ["D01", "D02", "D03", "D04", "D05", "D06", "D07", "D08", "D09", "D10"],
     "de_nl": True,
     "mo_ta": "Từ 90% trở lên. Mở toàn bộ Tuyến 2 và bộ đề đánh giá năng lực."},
]

# Quy tắc bất biến — không vai trò nào được phá
BAT_BIEN = [
    "Học sinh không bao giờ mở được phiếu GP của một phiếu mình chưa nộp bài.",
    "Không vai trò nào ngoài chính học sinh được sửa thông tin cá nhân của học sinh đó.",
    "Không vai trò nào được sửa điểm đã chấm; muốn đổi phải tạo bản chấm lại có ghi nhật ký.",
    "Admin sản phẩm không có quyền đọc hồ sơ học tập của học viên.",
    "Admin hệ thống chỉ đọc hồ sơ học viên khi xử lý sự cố và luôn để lại nhật ký.",
    "Tư vấn không bao giờ thấy chi tiết bài làm, chỉ thấy mức và khuyến nghị lộ trình.",
    "Giám đốc điều hành xem báo cáo tổng hợp, không xem dữ liệu định danh từng học viên.",
    "Mọi thao tác của Super Admin đều được ghi nhật ký và phải có lý do kèm theo.",
    "Tài khoản không hoạt động 90 ngày bị khoá tự động; vai trò quản trị phải xác thực hai lớp.",
]
