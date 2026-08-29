# -*- coding: utf-8 -*-
"""CỤM CHUYÊN ĐỀ (CHƯƠNG) — 16 cụm cho mỗi khối (lớp × tuyến).

Mỗi cụm là một CHƯƠNG theo khung giáo án GITA, được dạy trọn trong 6 buổi:
    LT → DB → KN → NC → OT → TH
Danh sách dạng bài của cụm được lấy tuần tự từ ngân hàng chuyên đề
(04-cong-cu/data/lop{3,4,5}.py) theo đúng nhóm chuyên đề của cụm.

Định dạng mỗi cụm: (tên cụm, mã nhóm chuyên đề, số dạng bài)
Thứ tự trong danh sách chính là thứ tự dạy trong năm học:
    cụm 1–4 → Giữa kỳ I → cụm 5–8 → Cuối kỳ I
    → cụm 9–12 → Giữa kỳ II → cụm 13–16 → Cuối kỳ II
"""

CUM = {}

CUM[(3, "T1")] = [
    ("Bảng nhân, bảng chia và bốn phép tính nền tảng", "B", 6),
    ("Số trong phạm vi 1 000 và tìm thành phần chưa biết", "A", 4),
    ("Hình phẳng, góc và chu vi", "F", 7),
    ("Giải toán một bước, gấp và giảm số lần", "D", 6),
    ("Đo độ dài, khối lượng, thời gian và tiền Việt Nam", "E", 5),
    ("Biểu thức và phép tính với số có bốn chữ số", "B", 5),
    ("Bài toán hai bước và rút về đơn vị", "D", 6),
    ("Một phần mấy, tỉ số và thống kê", "H", 7),
    ("Số có bốn chữ số và số có năm chữ số", "A", 5),
    ("Diện tích, ghép hình và đếm hình", "F", 6),
    ("Dãy số và quy luật", "C", 7),
    ("Trung bình cộng, mua bán và giải toán tổng hợp", "D", 6),
    ("Dung tích, thời gian và đổi đơn vị tổng hợp", "E", 4),
    ("Suy luận logic và toán đếm", "G", 7),
    ("Nhân chia số có năm chữ số và kỹ thuật tính nhanh", "B", 5),
    ("Tính chất phép nhân, chữ số tận cùng và tổng ôn số học", "A", 4),
]

CUM[(3, "T2")] = [
    ("Cấu tạo số và tính chẵn lẻ", "A", 6),
    ("Kỹ thuật tính nhanh và tìm x", "B", 6),
    ("Suy luận loại trừ, cân đĩa và Đi-rích-lê", "G", 6),
    ("Sơ đồ đoạn thẳng: tổng – hiệu, tổng – tỉ, hiệu – tỉ", "D", 6),
    ("Dãy số cách đều và quy luật", "C", 6),
    ("Đếm hình và chu vi hình ghép", "F", 6),
    ("Bài toán ẩn dữ kiện và hai đại lượng tỉ lệ", "D", 6),
    ("Đại lượng, thời gian và toán thực tế", "E", 6),
    ("Chia hết, đếm chữ số và số thoả điều kiện", "A", 6),
    ("Toán đếm, nguyên lý bù trừ và chia phần", "G", 5),
    ("Tổng dãy số và quy luật nâng cao", "C", 5),
    ("Diện tích hình ghép và hình học tổng hợp", "F", 6),
    ("So sánh biểu thức và tính nhanh nâng cao", "B", 5),
    ("Bất biến, cực trị và suy luận tổng hợp", "G", 5),
    ("Phân số, tỉ số và thống kê nâng cao", "H", 5),
    ("Toán điển hình dạng đề thi CLC", "D", 5),
]

CUM[(4, "T1")] = [
    ("Số tự nhiên: hàng, lớp và cấu tạo số", "A", 5),
    ("Bốn phép tính, biểu thức chữ và tính chất phép cộng", "B", 5),
    ("Trung bình cộng, tổng – hiệu và bài toán đại lượng", "D", 6),
    ("Góc, đường thẳng vuông góc – song song và hình bình hành", "F", 6),
    ("Đơn vị đo khối lượng, thời gian và diện tích", "E", 4),
    ("Nhân và chia số có nhiều chữ số", "B", 5),
    ("Dấu hiệu chia hết và bài toán chia hết", "A", 7),
    ("Dãy số và quy luật", "C", 6),
    ("Phân số: khái niệm đến bốn phép tính", "H", 7),
    ("Tổng – tỉ, hiệu – tỉ, tỉ lệ bản đồ và toán tuổi", "D", 6),
    ("Hình thoi, diện tích và bài toán hình học tổng hợp", "F", 6),
    ("Suy luận logic, đếm hình và toán đếm", "G", 6),
    ("Phép chia phân số, tìm phân số của một số và biểu đồ cột", "H", 6),
    ("Đổi đơn vị tổng hợp, thời gian và toán thực tế", "E", 4),
    ("Năng suất, chuyển động và tổng ôn giải toán", "D", 6),
    ("Biểu thức nhiều bước, tìm x và tính nhanh tổng hợp", "B", 5),
]

CUM[(4, "T2")] = [
    ("Cấu tạo số, chẵn lẻ và dấu hiệu chia hết", "A", 5),
    ("Dãy số cách đều và quy luật bảng số", "C", 5),
    ("Suy luận loại trừ, Đi-rích-lê và quy tắc đếm", "G", 5),
    ("Tổng – hiệu, tổng – tỉ, hiệu – tỉ và đại lượng tỉ lệ", "D", 7),
    ("Đếm hình, diện tích hình ghép và bài toán ngược", "F", 7),
    ("Kỹ thuật tính nhanh, so sánh biểu thức và tìm x", "B", 8),
    ("Chia có dư, số nguyên tố và chữ số tận cùng", "A", 5),
    ("Phân số nâng cao: so sánh, tính nhanh và bài toán ẩn", "H", 7),
    ("Công việc chung, tỉ lệ bản đồ và chuyển động làm quen", "D", 7),
    ("Nói thật – nói dối, bù trừ, bất biến và chia phần", "G", 5),
    ("Dãy số hình, đánh số trang và dãy số dạng đề thi", "C", 5),
    ("Hình chữ nhật biến đổi, ghép cắt hình và hình học dạng đề thi", "F", 6),
    ("Đại lượng, đo lường và toán thực tế", "E", 4),
    ("Số chia hết, số dư và số học dạng đề thi vào lớp 6", "A", 4),
    ("Suy luận tổng hợp và mô phỏng đề CLC", "G", 4),
    ("Toán điển hình dạng đề thi vào lớp 6 và tổng ôn", "D", 6),
]

CUM[(5, "T1")] = [
    ("Phân số, hỗn số và số thập phân: khái niệm đến phép nhân", "H", 6),
    ("Đơn vị đo độ dài, khối lượng, diện tích, thể tích và thời gian", "E", 5),
    ("Tỉ lệ thuận – nghịch, trung bình cộng và bài toán số thập phân", "D", 6),
    ("Bốn phép tính, tính nhanh và tìm x với phân số, số thập phân", "B", 7),
    ("Phép chia số thập phân và ba dạng toán tỉ số phần trăm", "H", 6),
    ("Tam giác, hình thang, hình tròn và diện tích", "F", 7),
    ("Số tự nhiên, chia hết và ôn tập số học", "A", 5),
    ("Dãy số và quy luật với số thập phân", "C", 5),
    ("Hình hộp chữ nhật, hình lập phương: diện tích và thể tích", "F", 7),
    ("Vận tốc, quãng đường, thời gian và chuyển động cùng – ngược chiều", "D", 5),
    ("Nhân chia số đo thời gian và đổi đơn vị tổng hợp", "E", 5),
    ("Biểu đồ hình quạt, phần trăm nhiều bước và ôn tập", "H", 5),
    ("Chuyển động trên dòng nước, tỉ lệ xích, công việc chung và toán tuổi", "D", 5),
    ("Suy luận logic và toán đếm", "G", 5),
    ("Bài toán hình học tổng hợp phẳng và không gian", "F", 6),
    ("Tổng ôn giải toán và cuối cấp tiểu học", "D", 5),
]

CUM[(5, "T2")] = [
    ("Cấu tạo số, chia hết, số nguyên tố và ước – bội", "A", 6),
    ("So sánh phân số, số thập phân và bài toán phần trăm ẩn", "H", 5),
    ("Dãy số cách đều, dãy phân số và dãy số đặc biệt", "C", 5),
    ("Đi-rích-lê, bù trừ, bất biến và quy tắc đếm", "G", 7),
    ("Tỉ số diện tích tam giác, hình thang và hình tròn", "F", 6),
    ("Các dạng ẩn của toán điển hình và bài toán phần trăm nâng cao", "D", 7),
    ("Tính nhanh dãy phân số, khử liên tiếp và so sánh biểu thức", "B", 6),
    ("Đánh số trang, ma trận số và dãy số dạng đề chuyên", "C", 5),
    ("Thể tích, diện tích toàn phần và bài toán khối lập phương", "F", 5),
    ("Chuyển động nâng cao: dòng nước, kim đồng hồ, trộn – pha", "D", 7),
    ("Số chính phương, số học dạng đề chuyên và tổng ôn", "A", 5),
    ("Tô màu, bàn cờ, chia phần và suy luận dạng đề chuyên", "G", 7),
    ("Phân số ẩn, phần trăm trong biểu đồ và dạng đề chuyên", "H", 4),
    ("Số đo thời gian, mua bán, thuế và toán thực tế", "E", 4),
    ("Hình học dạng đề Chuyên và mô phỏng đề thi", "F", 5),
    ("Mô phỏng đề thi vào lớp 6 và tổng duyệt", "D", 6),
]
