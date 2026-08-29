# -*- coding: utf-8 -*-
"""Đặc tả BỘ ĐỀ THI của Học viện GITA.

Ba họ tài liệu, tách khỏi 100 phiếu học của mỗi khối:
  ON  — Phiếu ôn tập mốc      : 4 phiếu / lớp (GK1, CK1, GK2, CK2)
  MOC — Đề thi mốc            : 10 đề / mốc / lớp  → 40 đề / lớp
  NL  — Đề đánh giá năng lực  : 10 đề / lớp
Tổng: 3 lớp × (4 + 40 + 10) = 162 đề.
"""

MOC = [
    ("GK1", "Giữa kỳ I", "Cụm C01 – C04", "tuần 9"),
    ("CK1", "Cuối kỳ I", "Cụm C01 – C08", "tuần 17"),
    ("GK2", "Giữa kỳ II", "Cụm C09 – C12", "tuần 25"),
    ("CK2", "Cuối kỳ II", "Cụm C01 – C16 (cả năm)", "tuần 34"),
]

HO_DE = {
    "ON": {
        "ten": "Phiếu ôn tập mốc",
        "thoi_luong": 90,
        "thang_diem": 100,
        "so_luong_moi_lop": 4,
        "muc_dich": "Hệ thống lại toàn bộ các cụm thuộc phạm vi mốc trước khi thi.",
        "cau_truc": [
            ("A", "BẢN ĐỒ CÁC CỤM TRONG PHẠM VI MỐC", 10, 10,
             "Điền tên cụm, nhóm chuyên đề và một dấu hiệu nhận biết cho mỗi cụm."),
            ("B", "CÔNG THỨC VÀ QUY TẮC PHẢI THUỘC", 10, 10,
             "Điền khuyết toàn bộ công thức của các cụm trong phạm vi."),
            ("C", "LUYỆN LẠI THEO TỪNG CỤM", 30, 35,
             "Mỗi bài ứng với một cụm, lấy đúng dạng bài hay ra trong đề."),
            ("D", "BÀI TỔNG HỢP LIÊN CỤM", 25, 30,
             "Mỗi bài ghép kỹ thuật của hai cụm khác nhau."),
            ("E", "BÀI PHÂN HOÁ", 15, 15,
             "Mức M4 – M5, dành cho học viên nhắm điểm 9 – 10."),
        ],
    },
    "MOC": {
        "ten": "Đề thi mốc",
        "thoi_luong": 60,
        "thang_diem": 10,
        "so_luong_moi_mo": 10,
        "muc_dich": "Đo kết quả tại bốn mốc trong năm, theo đúng format đề kiểm tra định kỳ.",
        "cau_truc": [
            ("1", "Tính và điền kết quả", 10, 2.0, "Mức nhận biết. 4–8 ý."),
            ("2", "Tìm thành phần chưa biết, đổi đơn vị", 10, 2.0, "Mức nhận biết – thông hiểu. 4–6 ý."),
            ("3", "Toán điển hình có lời văn", 15, 2.0, "Mức thông hiểu. Trình bày đủ lời giải."),
            ("4", "Hình học hoặc đại lượng", 15, 2.0, "Mức vận dụng."),
            ("5", "Bài phân hoá", 10, 2.0, "Mức vận dụng cao. Học viên nhắm 9 – 10 mới làm."),
        ],
        "ma_tran": [("Nhận biết", 40), ("Thông hiểu", 30), ("Vận dụng", 20), ("Vận dụng cao", 10)],
    },
    "NL": {
        "ten": "Đề đánh giá năng lực",
        "thoi_luong": 60,
        "thang_diem": 100,
        "so_luong_moi_lop": 10,
        "muc_dich": "Bám format đề đánh giá năng lực vào lớp 6 của các trường CLC Hà Nội: "
                    "phủ rộng dạng, tốc độ cao, nhiều bài bối cảnh thực tế.",
        "cau_truc": [
            ("I", "TRẮC NGHIỆM NHANH — 20 câu", 20, 40,
             "Mỗi câu 2 điểm, 4 lựa chọn. Chuẩn: 20 câu trong 20 phút."),
            ("II", "TRẢ LỜI NGẮN — 10 câu", 12, 20,
             "Mỗi câu 2 điểm. Chỉ ghi đáp số, không cần trình bày."),
            ("III", "ĐỌC HIỂU SỐ LIỆU", 8, 10,
             "Một bảng hoặc biểu đồ, 5 câu hỏi khai thác số liệu."),
            ("IV", "TỰ LUẬN", 15, 20,
             "3 bài toán điển hình, trình bày đủ lời giải."),
            ("V", "BÀI PHÂN HOÁ", 5, 10,
             "1 bài suy luận hoặc hình học mức đề chuyên."),
        ],
    },
}

# Trọng số dạng bài của từng mốc (dùng để ra 10 đề khác nhau nhưng cùng ma trận)
BIEN_THE = [
    ("D01", "Bản chuẩn — dùng cho lần thi chính thức"),
    ("D02", "Đổi số liệu, giữ nguyên dạng"),
    ("D03", "Đổi bối cảnh sang mua bán"),
    ("D04", "Đổi bối cảnh sang trường lớp"),
    ("D05", "Tăng một bậc độ khó ở bài 4 và bài 5"),
    ("D06", "Giảm một bậc độ khó — dùng cho lớp bù nền"),
    ("D07", "Thêm một bẫy đơn vị đo"),
    ("D08", "Thêm một bẫy dữ kiện thừa"),
    ("D09", "Thiên về hình học và đại lượng"),
    ("D10", "Thiên về suy luận và toán đếm"),
]
