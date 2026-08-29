# -*- coding: utf-8 -*-
"""TÁM LOẠI PHIẾU của Học viện GITA — bám khung giáo án giảng dạy tại GITA.

Sáu loại đầu (LT, DB, KN, NC, OT, TH) là sáu buổi học 90 phút của một cụm chuyên đề.
Hai loại còn lại đi kèm, không chiếm buổi học:
  GP — phiếu Lời giải & Phân tích chuyên sâu, phát sau khi học viên đã làm bài;
  HD — phiếu Hướng dẫn ôn chắc chuyên đề, phát khi mở đầu và khi kết thúc cụm.
Ngoài ra mỗi khối có 4 phiếu MỐC (Giữa kỳ I, Cuối kỳ I, Giữa kỳ II, Cuối kỳ II).
"""

LOAI = {
    "LT": {
        "ten": "Phiếu Lý thuyết",
        "giao_an": "Mẫu giáo án LÝ THUYẾT",
        "muc_tieu": "Học viên nắm key lý thuyết của chương và vẽ được sơ đồ tư duy chương.",
        "thoi_luong": 90,
        "thang_diem": 100,
        "cau_truc": [
            ("A", "VÍ DỤ DẪN VÀO CHỦ ĐỀ", 5, 5,
             "Một câu đố hoặc tình huống thực tế mở chương. 5 câu hỏi gợi mở."),
            ("B", "WHY – WHAT: vì sao học và học cái gì", 10, 5,
             "Lý do dẫn tới chương; tên chương; 5 câu chốt phạm vi kiến thức."),
            ("C", "SƠ ĐỒ TƯ DUY CHƯƠNG (điền khuyết)", 20, 20,
             "Bảy ô bắt buộc: tên chương · nội dung chính · công thức và định nghĩa · "
             "hình vẽ minh hoạ · bài tập minh hoạ · dạng bài và dấu hiệu nhận biết · "
             "phương pháp ghi điểm 10."),
            ("D", "HỆ THỐNG LÝ THUYẾT THEO KEY", 25, 30,
             "Mỗi key gồm: phát biểu ngắn · ví dụ mẫu có lời giải · một bài tự làm."),
            ("E", "LUYỆN NHẬN BIẾT – THÔNG HIỂU", 30, 40,
             "5 bài mức M1–M2, mỗi bài 4–10 ý, làm ngay tại lớp."),
        ],
    },
    "DB": {
        "ten": "Phiếu Dạng bài & Đọc vị",
        "giao_an": "Mẫu giáo án DẠNG BÀI – PHƯƠNG PHÁP HỌC GIỎI",
        "muc_tieu": "Học viên nhận diện chắc chắn từng dạng bài và đọc vị được đề lạ.",
        "thoi_luong": 90,
        "thang_diem": 100,
        "cau_truc": [
            ("A", "SƠ ĐỒ TƯ DUY DẠNG BÀI", 10, 10,
             "Bảng tổng quát mọi dạng bài của chương, học viên tự điền dấu hiệu nhận biết."),
            ("B", "DẠNG 1 – DẠNG 2", 25, 25,
             "Mỗi dạng trình bày đủ 5 mục: dấu hiệu nhận biết · điều kiện cần có · "
             "phương pháp giải và kỹ năng · các bước trình bày · dò soát kết quả. "
             "Kèm bài mẫu và 4–10 ý tự làm."),
            ("C", "DẠNG 3 – DẠNG 4", 25, 25,
             "Trình bày như Phần B, độ khó tăng."),
            ("D", "DẠNG 5 – DẠNG 6 VÀ DẠNG PHỐI HỢP", 20, 20,
             "Dạng khó của chương và dạng ghép hai kỹ thuật."),
            ("E", "ĐỌC VỊ ĐỀ BÀI", 10, 20,
             "5 bài chỉ yêu cầu bốn bước, KHÔNG bắt tính ra đáp số: "
             "khai thác dữ liệu đề cho · xác định dạng bài · nêu hướng giải · "
             "dự đoán bẫy. Đây là phần rèn tốc độ nhận dạng."),
        ],
    },
    "KN": {
        "ten": "Phiếu Kỹ năng & Phương pháp",
        "giao_an": "Mẫu giáo án PHẦN KỸ NĂNG HỌC TOÁN",
        "muc_tieu": "Củng cố chắc nền, hệ thống hoá bằng sơ đồ tư duy và thuyết trình lại.",
        "thoi_luong": 90,
        "thang_diem": 100,
        "cau_truc": [
            ("A", "CỦNG CỐ NỀN — 30 CÂU TỐC ĐỘ", 20, 25,
             "5 bài × 6 ý, mỗi ý là một phép tính hoặc một câu hỏi nền. Chuẩn: 30 câu ≤ 18 phút."),
            ("B", "KỸ NĂNG TRÌNH BÀY", 15, 15,
             "5 bài rèn viết lời giải, đặt lời giải, ghi đơn vị, đáp số."),
            ("C", "KỸ NĂNG DÒ SOÁT BA TẦNG", 15, 15,
             "5 bài đã có lời giải sẵn nhưng cài lỗi; học viên tìm lỗi: đơn vị → phép tính → đề hỏi gì."),
            ("D", "SƠ ĐỒ TƯ DUY TỔNG HỢP CHƯƠNG", 25, 25,
             "Học viên tự hoàn thiện sơ đồ 7 ô, không nhìn phiếu Lý thuyết."),
            ("E", "KỊCH BẢN THUYẾT TRÌNH THEO TEAM", 15, 20,
             "5 nhiệm vụ thuyết trình theo khung phản biện: dạng bài · kiến thức liên quan · "
             "dữ liệu nhận biết · phương pháp áp dụng · cách xử lý nhanh nhất · kết quả."),
        ],
    },
    "NC": {
        "ten": "Phiếu Luyện nâng cao",
        "giao_an": "Mẫu giáo án PHẦN LUYỆN TẬP",
        "muc_tieu": "Đưa học viên từ mức thông hiểu lên mức vận dụng cao và vượt ngưỡng.",
        "thoi_luong": 90,
        "thang_diem": 100,
        "cau_truc": [
            ("I", "KHỞI ĐỘNG · NỀN CHẮC", 12, 15, "Mức M1. 5 bài × 6–10 ý. Không có bẫy."),
            ("II", "LUYỆN CHUẨN · THÀNH THẠO", 15, 20, "Mức M2. 5 bài × 5–8 ý."),
            ("III", "VẬN DỤNG", 20, 25, "Mức M3. 5 bài × 4–6 ý."),
            ("IV", "VẬN DỤNG CAO", 25, 25, "Mức M4. 5 bài × 4–5 ý, có bẫy có chủ đích."),
            ("V", "VƯỢT NGƯỠNG · ĐIỂM 10", 18, 15, "Mức M5. 5 bài × 4–5 ý."),
        ],
    },
    "OT": {
        "ten": "Phiếu Ôn thi",
        "giao_an": "Mẫu giáo án PHẦN LUYỆN TẬP (thi đua cá nhân và cặp đôi)",
        "muc_tieu": "Rèn tốc độ và độ chính xác theo đúng ma trận đề thi của chương.",
        "thoi_luong": 90,
        "thang_diem": 100,
        "cau_truc": [
            ("I", "THỬ THÁCH CÁ NHÂN — TĂNG TỐC", 20, 20, "5 bài nhanh, chấm chéo tại lớp."),
            ("II", "THI ĐẤU CẶP ĐÔI", 20, 20, "5 bài giải trên bảng theo cặp."),
            ("III", "ÔN THEO MA TRẬN ĐỀ", 20, 25, "5 bài phủ đúng tỉ lệ dạng bài của đề thi chương."),
            ("IV", "BÀI PHÂN HOÁ", 20, 25, "5 bài mức M4, có bẫy."),
            ("V", "THI ĐẤU PHẢN BIỆN", 10, 10,
             "5 chủ đề: mỗi đội trình bày dạng bài · kiến thức liên quan · dữ liệu nhận biết · "
             "phương pháp áp dụng · cách xử lý nhanh nhất · kết quả."),
        ],
    },
    "TH": {
        "ten": "Phiếu Thi chương",
        "giao_an": "Bài kiểm tra kết thúc chương",
        "muc_tieu": "Đo mức đạt được của học viên sau trọn một cụm chuyên đề.",
        "thoi_luong": 90,
        "thang_diem": 100,
        "cau_truc": [
            ("I", "NHẬN BIẾT", 12, 15, "Mức M1."),
            ("II", "THÔNG HIỂU", 15, 20, "Mức M2."),
            ("III", "VẬN DỤNG", 20, 25, "Mức M3."),
            ("IV", "VẬN DỤNG CAO", 25, 25, "Mức M4, có bẫy."),
            ("V", "PHÂN HOÁ ĐIỂM 10", 18, 15, "Mức M5."),
        ],
    },
    "MOC": {
        "ten": "Phiếu kiểm tra mốc",
        "giao_an": "Mẫu giáo án KIỂM TRA MỐC",
        "muc_tieu": "Đo mức đạt được của học viên sau một chặng nhiều cụm chuyên đề, "
                    "trước khi bước vào chặng tiếp theo.",
        "cau_truc": [
            ("I", "NHẬN BIẾT — TRẢI KHẮP CÁC CỤM ĐÃ HỌC", 12, 15,
             "5 bài mức M1, mỗi bài lấy từ một nhóm chuyên đề khác nhau."),
            ("II", "THÔNG HIỂU", 15, 20,
             "5 bài mức M2, tiếp tục trải đều các nhóm chuyên đề của chặng."),
            ("III", "VẬN DỤNG", 20, 25,
             "5 bài mức M3, có bài liên kết giữa hai nhóm chuyên đề."),
            ("IV", "VẬN DỤNG CAO", 25, 25,
             "5 bài mức M4, có gợi ý ba tầng cho huấn luyện viên."),
            ("V", "PHÂN HOÁ ĐIỂM 10", 18, 15,
             "5 bài mức M5, dành cho học viên hướng tới điểm tuyệt đối."),
        ],
    },
    "GP": {
        "ten": "Phiếu Lời giải & Phân tích chuyên sâu",
        "giao_an": "Phát sau khi học viên đã nộp bài",
        "muc_tieu": "Học viên hiểu bản chất, không chỉ biết đáp số.",
        "thoi_luong": 0,
        "thang_diem": 0,
        "cau_truc": [
            ("1", "ĐÁP SỐ TỪNG Ý", 0, 0, "Bảng đáp số gọn để tự chấm."),
            ("2", "LỜI GIẢI ĐẦY ĐỦ", 0, 0, "Trình bày đúng chuẩn học sinh tiểu học."),
            ("3", "BẢNG PHÂN TÍCH CHUYÊN SÂU", 0, 0,
             "Sáu cột theo khung phản biện GITA: Dạng bài · Kiến thức liên quan · "
             "Dữ liệu nhận biết · Phương pháp áp dụng · Cách xử lý nhanh nhất · Kết quả."),
            ("4", "NHÃN TƯ DUY VÀ ĐIỂM CHỐT", 0, 0, "TD1–TD6 và bước quyết định của lời giải."),
            ("5", "LỖI THƯỜNG GẶP VÀ CÁCH PHÒNG", 0, 0, "Ít nhất một lỗi cho mỗi bài."),
            ("6", "GỢI Ý BA TẦNG", 0, 0, "Gợi ý nhẹ → vừa → mạnh, dành cho bài mức M4, M5."),
            ("7", "BÀI TƯƠNG TỰ TỰ LUYỆN", 0, 0, "Mỗi bài sai kèm một bài cùng dạng để làm lại sau 48 giờ."),
        ],
    },
    "HD": {
        "ten": "Phiếu Hướng dẫn ôn chắc chuyên đề",
        "giao_an": "Phát đầu chương và dùng lại trước kỳ thi",
        "muc_tieu": "Học viên tự ôn chắc cả chương mà không cần giáo viên nhắc.",
        "thoi_luong": 0,
        "thang_diem": 0,
        "cau_truc": [
            ("1", "BẢN ĐỒ CHƯƠNG", 0, 0, "Sơ đồ tư duy 7 ô đã điền đầy đủ, dùng để tra cứu."),
            ("2", "BẢNG CÔNG THỨC VÀ QUY TẮC PHẢI THUỘC", 0, 0, "Học thuộc trước khi luyện."),
            ("3", "BẢNG DẠNG BÀI VÀ DẤU HIỆU NHẬN BIẾT", 0, 0, "Mỗi dạng một dòng."),
            ("4", "LỘ TRÌNH ÔN BỐN BUỔI", 0, 0,
             "Buổi 1 đọc bản đồ và tự chấm checklist · Buổi 2 làm lại phiếu của mạch còn yếu · "
             "Buổi 3 học thuộc công thức và kiểm tra chéo trong team · Buổi 4 làm một đề mốc."),
            ("5", "CHECKLIST TỰ KIỂM", 0, 0, "Trả lời trong 10 giây thì đánh dấu đạt."),
            ("6", "SỔ LỖI MẪU", 0, 0,
             "Một trang cho một lỗi: đề · chỗ sai · nguyên nhân · cách tránh · một bài tương tự tự tìm."),
            ("7", "TIÊU CHÍ ÔN CHẮC", 0, 0,
             "Đạt ≥ 80/100 ở phiếu Thi chương và ≥ 90% checklist mới coi là ôn chắc chương."),
        ],
    },
}

# Sáu buổi học của một cụm, đúng thứ tự
CHUOI_BUOI = ["LT", "DB", "KN", "NC", "OT", "TH"]

# Bốn phiếu mốc của mỗi khối
MOC = [
    ("GK1", "Kiểm tra Giữa kỳ I", "Tổng ôn cụm 1 – 4"),
    ("CK1", "Kiểm tra Cuối kỳ I", "Tổng ôn cụm 1 – 8"),
    ("GK2", "Kiểm tra Giữa kỳ II", "Tổng ôn cụm 9 – 12"),
    ("CK2", "Kiểm tra Cuối kỳ II", "Tổng ôn cụm 1 – 16, chuẩn đầu ra cả năm"),
]
