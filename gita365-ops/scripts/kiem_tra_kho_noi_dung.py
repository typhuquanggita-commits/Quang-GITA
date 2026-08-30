#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kiểm tra kho nội dung GITA365.

Đọc toàn bộ gita365-ops/kho-noi-dung/, sinh lại data/chi-muc-kho-noi-dung.csv,
in tỉ lệ trụ cột thật của từng nhóm, đếm bài cửa chuyển tầng, và cảnh báo
nếu có bài G2 chạm tầng 3.

Chạy sau mỗi lần soạn xong một tháng nội dung:
    python3 scripts/kiem_tra_kho_noi_dung.py
"""
import csv
import io
import os
import re
import sys
from collections import Counter

GOC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KHO = os.path.join(GOC, "kho-noi-dung")
RA = os.path.join(GOC, "data", "chi-muc-kho-noi-dung.csv")

# Trụ cột suy ra từ NGHI THỨC — chính xác hơn nhãn tự do ghi trong bài.
TRU_COT_THEO_NGHI_THUC = {
    # G2
    "Bài nhẹ": "Kết nối & nghi thức",
    "Bài nhẹ · mời nhận công cụ": "Cửa tầng 1 (công cụ miễn phí)",
    "Nhiệm Vụ Gia Đình Tuần": "Kỹ năng & hoạt động",
    "Bàn Ăn Yêu Thương": "Kỹ năng & hoạt động",
    "Gia Đình Chơi Cùng Nhau": "Kỹ năng & hoạt động",
    "Việc Tử Tế Của Gia Đình": "Giải mã & cơ chế",
    "Cha Mẹ Tỉnh Thức": "Giải mã & cơ chế",
    "Khoe Nhà Mình": "Câu chuyện thật",
    "Bảng Vinh Danh Gia Đình": "Cộng đồng",
    "Bảng Vinh Danh Gia Đình · Khép Mùa": "Cộng đồng",
    "Bảng Vinh Danh · Khép Tháng": "Cộng đồng",
    "Tổng Kết Mùa · Kỷ Yếu": "Cộng đồng",
    # G1
    "Khởi Nguyên": "Kết nối & nghi thức",
    "Cho Là Nhận": "Kết nối & nghi thức",
    "Giải Mã": "Giải mã & cơ chế",
    "Hỏi & Đáp Cùng Cố Vấn": "Cộng đồng",
    "Bằng Chứng": "Câu chuyện thật",
    "Thực Chiến": "Kỹ năng & hoạt động",
    "Tổng Kết & Vinh Danh": "Cộng đồng",
    "Tổng Kết & Vinh Danh · Khép Tháng": "Cộng đồng",
}

# Dấu hiệu một bài đang mời bước sang tầng cao hơn (tầng 3+).
DAU_HIEU_CHUYEN_TANG = [
    "buổi định hướng nhóm nhỏ",
    "khóa nền tảng",
    "LINK_WEBAPP",
    "khóa offline",
    "học phí",
]

# Từ khóa tuyệt đối không được xuất hiện trong nội dung G2 (luật không vượt tầng).
CAM_TRONG_G2 = ["học phí", "ưu đãi", "đăng ký khóa", "khóa trả phí"]

TIEU_DE = re.compile(r"^## (Thứ \S+|Chủ nhật)\s+(\d{1,2}:\d{2})\s*·\s*(.+)$")


def doc_ten_tep(ten):
    """Suy ra nhóm, tháng, chủ đề từ tên tệp G2-thang-04-lan-toa.md."""
    m = re.match(r"^(G[12])-thang-(\d+)-(.+)\.md$", ten)
    if not m:
        return None
    nhom, thang, slug = m.groups()
    return nhom, thang, slug.replace("-", " ")


def quet():
    hang = []
    chua_map = Counter()
    canh_bao = []
    for ten in sorted(os.listdir(KHO)):
        thongtin = doc_ten_tep(ten)
        if not thongtin:
            continue
        nhom, thang, chude = thongtin
        dong = io.open(os.path.join(KHO, ten), encoding="utf-8").read().split("\n")
        tuan = ""
        for i, L in enumerate(dong):
            m = re.match(r"^# Tuần (\d+)", L)
            if m:
                tuan = m.group(1)
                continue
            h = TIEU_DE.match(L)
            if not h:
                continue
            thu, gio, nghi_thuc = h.group(1), h.group(2), h.group(3).strip()
            tieu_de = dong[i + 1][4:].strip() if dong[i + 1].startswith("### ") else ""
            meta = dong[i + 2] if i + 2 < len(dong) else ""
            ma, con_lai = "", meta
            mm = re.match(r"^`([^`]+)`\s*·\s*(.*)$", meta)
            if mm:
                ma, con_lai = mm.group(1), mm.group(2)
            tru_cot_goc = con_lai.split("·")[0].strip().replace("**", "")
            cm = re.search(r"CARE-\d", con_lai)
            care = cm.group(0) if cm else ""
            tru_cot = TRU_COT_THEO_NGHI_THUC.get(nghi_thuc)
            if tru_cot is None:
                chua_map[nghi_thuc] += 1
                tru_cot = tru_cot_goc
            than = "\n".join(dong[i:i + 120]).split("\n## ")[0]
            chuyen_tang = any(k.lower() in than.lower() for k in DAU_HIEU_CHUYEN_TANG)
            if nhom == "G2":
                for k in CAM_TRONG_G2:
                    if k.lower() in than.lower():
                        canh_bao.append("%s · %s %s · %s — chứa '%s'" % (ten, thu, gio, tieu_de, k))
            hang.append([nhom, thang, chude, tuan, thu, gio, nghi_thuc, ma, tieu_de,
                         tru_cot_goc, tru_cot, care,
                         "Có" if "Bình luận ghim" in than else "Không",
                         "Có" if chuyen_tang else "Không", ten])
    return hang, chua_map, canh_bao


def main():
    hang, chua_map, canh_bao = quet()
    if not hang:
        print("Không đọc được bài nào. Kiểm tra đường dẫn:", KHO)
        return 1

    with io.open(RA, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow(["nhom", "thang", "chu_de_thang", "tuan", "thu", "gio", "nghi_thuc",
                    "ma_bai", "tieu_de", "tru_cot_ghi_trong_bai", "tru_cot_chuan", "care",
                    "co_binh_luan_ghim", "cua_chuyen_tang", "tep_nguon"])
        w.writerows(hang)

    print("Đã ghi %s" % os.path.relpath(RA, GOC))
    print("Tổng: %d bài trong kho-noi-dung/" % len(hang))
    print("      (+7 bài tuần 1 của G1 nằm ở khoi-dong-g1/README.md)\n")

    loi = 0
    for nhom in ("G2", "G1"):
        con = [r for r in hang if r[0] == nhom]
        if not con:
            continue
        n = len(con)
        dem = Counter(r[10] for r in con)
        print("%s — %d bài" % (nhom, n))
        for k, v in dem.most_common():
            print("   %-34s %4d  %5.1f%%" % (k, v, 100.0 * v / n))
        ct = sum(1 for r in con if r[13] == "Có")
        ty_le = 100.0 * ct / n
        trang_thai = "ĐẠT" if ty_le <= 5 else "VƯỢT TRẦN"
        if ty_le > 5:
            loi += 1
        print("   → cửa chuyển tầng: %d/%d = %.1f%% (trần 5%%) — %s\n" % (ct, n, ty_le, trang_thai))

    thieu_ghim = [r for r in hang if "LINKHUB" in r[8] and r[12] == "Không"]
    if thieu_ghim:
        print("Bài có liên kết nhưng thiếu bình luận ghim: %d" % len(thieu_ghim))

    if chua_map:
        print("Nghi thức chưa có trong bảng ánh xạ (bổ sung vào script):")
        for k, v in chua_map.most_common():
            print("   %-40s %d bài" % (k, v))
        loi += 1

    if canh_bao:
        print("\nCẢNH BÁO VƯỢT TẦNG TRONG G2 — %d bài:" % len(canh_bao))
        for c in canh_bao:
            print("   " + c)
        loi += 1
    else:
        print("Không có bài G2 nào chạm tầng 3. ĐẠT.")

    return 1 if loi else 0


if __name__ == "__main__":
    sys.exit(main())
