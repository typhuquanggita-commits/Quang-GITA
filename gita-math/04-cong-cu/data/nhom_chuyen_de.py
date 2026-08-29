# -*- coding: utf-8 -*-
"""Tám nhóm chuyên đề gốc của hệ thống toán GITA (dùng chung lớp 3, 4, 5).

Mã màu của từng nhóm nằm trong bảng màu thương hiệu (00-thuong-hieu/
01-nhan-dien-thuong-hieu.md mục 3): thang xanh từ đậm tới sáng cho các nhóm
nền tảng, hai sắc đỏ cho hai nhóm đòi hỏi suy luận, xám trung tính cho nhóm
số liệu. Không thêm màu ngoài bảng này."""

NHOM = {
    "A": {
        "ten": "Số học & Cấu tạo số",
        "mo_ta": "Số tự nhiên, cấu tạo số, chữ số, chẵn lẻ, chia hết, chia có dư, "
                 "số nguyên tố, ƯCLN – BCNN, chữ số tận cùng.",
        "td": ["TD1", "TD2"],
        "mau": "#10406F",
    },
    "B": {
        "ten": "Phép tính & Tính nhanh",
        "mo_ta": "Bốn phép tính, tính chất phép tính, biểu thức, tìm x, "
                 "kỹ thuật tính nhanh – tính nhẩm – so sánh không cần tính.",
        "td": ["TD1", "TD5"],
        "mau": "#1B5EA8",
    },
    "C": {
        "ten": "Dãy số & Quy luật",
        "mo_ta": "Dãy cách đều, dãy nhân, dãy hình, quy luật bảng số, tổng dãy, "
                 "số hạng thứ n, đánh số trang, đếm chữ số.",
        "td": ["TD4", "TD1"],
        "mau": "#2E7BC4",
    },
    "D": {
        "ten": "Toán điển hình & Giải toán có lời văn",
        "mo_ta": "Tổng – hiệu, tổng – tỉ, hiệu – tỉ, trung bình cộng, rút về đơn vị, "
                 "tỉ lệ thuận – nghịch, tuổi, công việc chung, chuyển động.",
        "td": ["TD1", "TD2"],
        "mau": "#4A93D4",
    },
    "E": {
        "ten": "Đại lượng – Đo lường – Thời gian",
        "mo_ta": "Đơn vị đo độ dài, khối lượng, diện tích, thể tích, dung tích, "
                 "thời gian, tiền tệ; đổi đơn vị và bài toán thực tế.",
        "td": ["TD1", "TD5"],
        "mau": "#5AA0DC",
    },
    "F": {
        "ten": "Hình học",
        "mo_ta": "Nhận dạng hình, chu vi, diện tích, thể tích, cắt – ghép hình, "
                 "đếm hình, tỉ số diện tích, hình không gian.",
        "td": ["TD3", "TD4"],
        "mau": "#A31B20",
    },
    "G": {
        "ten": "Suy luận logic & Toán đếm",
        "mo_ta": "Suy luận loại trừ, giả thiết tạm, nói thật – nói dối, Đi-rích-lê, "
                 "bù trừ, bất biến, quy tắc đếm, trồng cây, tô màu, bàn cờ.",
        "td": ["TD2", "TD4", "TD5", "TD6"],
        "mau": "#E0242A",
    },
    "H": {
        "ten": "Phân số – Số thập phân – Tỉ số phần trăm – Thống kê",
        "mo_ta": "Phân số, hỗn số, số thập phân, tỉ số, tỉ số phần trăm, "
                 "bảng số liệu, biểu đồ tranh – cột – quạt.",
        "td": ["TD1", "TD5"],
        "mau": "#4B5563",
    },
}

# Loại phiếu
LOAI_PHIEU = {
    "CD": "Phiếu chuyên đề",
    "DV": "Phiếu kiểm tra định vị (tổng ôn + đo mức)",
}

TU_DUY = {
    "TD1": "Tư duy cấu trúc",
    "TD2": "Tư duy logic & suy luận",
    "TD3": "Tư duy hình học – không gian",
    "TD4": "Tư duy thuật toán & quy nạp",
    "TD5": "Tư duy ước lượng & tối ưu",
    "TD6": "Tư duy phản biện",
}
