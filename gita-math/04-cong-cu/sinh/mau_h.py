# -*- coding: utf-8 -*-
"""Thư viện mẫu bài — NHÓM H: Phân số – Số thập phân – Tỉ số phần trăm – Thống kê."""
from __future__ import annotations

from fractions import Fraction

from .khung import Bai, hoa, LOP_HOC, TO_DOI, dang_ky, luan_phien, ps, sv

MON_HOC = ["Toán", "Tiếng Việt", "Tiếng Anh", "Khoa học", "Lịch sử"]


def tp(x) -> str:
    """Viết số thập phân theo chuẩn Việt Nam (dấu phẩy), bỏ số 0 thừa."""
    return sv(x)


def phan_so(rng, tu_max=12, mau_max=15) -> Fraction:
    mau = rng.randint(2, mau_max)
    tu = rng.randint(1, min(tu_max, mau * 2))
    return Fraction(tu, mau)


# ══════════════════════════════════ MỨC M1 ══════════════════════════════════

@dang_ky("H-M1-01", "H", "M1", lop=(4, 5), tu_khoa=("rút gọn phân số", "phân số bằng nhau"))
def h_m1_01(rng, lop):
    y = []
    for _ in range(rng.randint(5, 8)):
        f = Fraction(rng.randint(1, 9), rng.randint(2, 12))
        k = rng.randint(2, 9)
        tu, mau = f.numerator * k, f.denominator * k
        y.append((f"Rút gọn phân số {sv(tu)} phần {sv(mau)}.", ps(f)))
    return Bai(
        tieu_de="Rút gọn phân số",
        dan="Rút gọn đến phân số tối giản.",
        y=y,
        huong_giai="Chia cả tử số và mẫu số cho cùng một số tự nhiên lớn hơn 1. Rút gọn "
                   "đến khi tử số và mẫu số không cùng chia hết cho số nào lớn hơn 1 nữa "
                   "thì được phân số tối giản.",
        td=["TD1"],
        diem_chot="Phải chia **cả tử và mẫu** cho cùng một số.",
        loi="Chỉ chia tử số hoặc chỉ chia mẫu số.",
        phong="Viết phép chia cho cả hai dòng, kiểm tra lại bằng cách nhân ngược.",
        goi_y=("Tử số và mẫu số cùng chia hết cho số nào?",
               "Chia cả hai cho số đó.",
               "Kết quả còn rút gọn tiếp được không?"),
        pt_dang="Rút gọn phân số",
        pt_kien_thuc="Tính chất cơ bản của phân số",
        pt_du_lieu="Tử số và mẫu số có ước chung lớn hơn 1",
        pt_phuong_phap="Chia cả tử và mẫu cho ước chung",
        pt_nhanh="Tìm ngay ước chung lớn nhất để rút gọn một lần là xong.",
        tuong_tu=("Rút gọn 18 phần 24.", "3 phần 4"),
    )


@dang_ky("H-M1-02", "H", "M1", lop=(4, 5), tu_khoa=("so sánh phân số", "quy đồng"))
def h_m1_02(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["cung_mau", "cung_tu", "khac"], rng.randint(5, 8)):
        if kieu == "cung_mau":
            mau = rng.randint(3, 15)
            a, b = rng.sample(range(1, mau + 3), 2)
            f1, f2 = Fraction(a, mau), Fraction(b, mau)
        elif kieu == "cung_tu":
            tu = rng.randint(1, 9)
            m1, m2 = rng.sample(range(2, 16), 2)
            f1, f2 = Fraction(tu, m1), Fraction(tu, m2)
        else:
            f1, f2 = phan_so(rng), phan_so(rng)
        y.append((f"{ps(f1)} … {ps(f2)}",
                  "<" if f1 < f2 else (">" if f1 > f2 else "=")))
    return Bai(
        tieu_de="So sánh hai phân số",
        dan="Điền dấu <, >, = thích hợp.",
        y=y,
        huong_giai="Cùng mẫu số: phân số nào có tử số lớn hơn thì lớn hơn. Cùng tử số: "
                   "phân số nào có mẫu số **bé** hơn thì lớn hơn. Khác cả tử lẫn mẫu: "
                   "quy đồng mẫu số rồi so tử số.",
        td=["TD1", "TD5"],
        diem_chot="Cùng tử số thì **mẫu bé hơn là phân số lớn hơn** — ngược với trực giác.",
        loi="Thấy mẫu số lớn thì kết luận phân số lớn.",
        phong="Nghĩ tới chiếc bánh: chia càng nhiều phần thì mỗi phần càng bé.",
        goi_y=("Hai phân số có cùng mẫu số không?",
               "Có cùng tử số không?",
               "Nếu khác cả hai thì quy đồng mẫu số."),
        pt_dang="So sánh phân số",
        pt_kien_thuc="Quy đồng mẫu số, so sánh phân số cùng tử, cùng mẫu",
        pt_du_lieu="Hai phân số nối bởi dấu …",
        pt_phuong_phap="Xét cùng mẫu → cùng tử → quy đồng",
        pt_nhanh="So với 1 hoặc với 1 phần 2 trước — nhiều cặp kết luận được ngay.",
        tuong_tu=("So sánh: 3 phần 5 … 3 phần 7", ">"),
        bay="Cùng tử số thì mẫu bé hơn lại lớn hơn",
    )


@dang_ky("H-M1-03", "H", "M1", lop=(5,), tu_khoa=("số thập phân", "đọc viết"))
def h_m1_03(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["hang", "so_sanh", "doi_ps"], rng.randint(5, 8)):
        nguyen = rng.randint(0, 999)
        le = rng.randint(1, 999)
        x = float(f"{nguyen}.{le:03d}")
        if kieu == "hang":
            y.append((f"Trong số {tp(x)}, chữ số ở hàng phần mười là chữ số nào?",
                      str(le // 100)))
        elif kieu == "so_sanh":
            z = round(x + rng.choice([-1, 1]) * rng.random() * 5, 3)
            y.append((f"{tp(x)} … {tp(z)}", "<" if x < z else (">" if x > z else "=")))
        else:
            m = rng.choice([10, 100, 1000])
            n = rng.randint(1, m - 1)
            y.append((f"Viết phân số {sv(n)} phần {sv(m)} dưới dạng số thập phân.",
                      tp(round(n / m, 4))))
    return Bai(
        tieu_de="Số thập phân: hàng, so sánh, đổi từ phân số",
        dan="Chú ý dấu phẩy và các hàng sau dấu phẩy.",
        y=y,
        huong_giai="Sau dấu phẩy lần lượt là hàng phần mười, phần trăm, phần nghìn. "
                   "So sánh số thập phân: so phần nguyên trước; phần nguyên bằng nhau thì "
                   "so lần lượt hàng phần mười, phần trăm, phần nghìn. Phân số có mẫu là "
                   "10, 100, 1 000 đổi được thẳng sang số thập phân.",
        td=["TD1", "TD2"],
        diem_chot="So sánh theo **hàng**, không so theo số chữ số sau dấu phẩy.",
        loi="Cho rằng số có nhiều chữ số sau dấu phẩy hơn thì lớn hơn.",
        phong="Viết thêm chữ số 0 vào cuối để hai số có cùng số chữ số thập phân rồi mới so.",
        goi_y=("Phần nguyên của hai số có bằng nhau không?",
               "So tiếp hàng phần mười.",
               "Thêm chữ số 0 vào cuối cho hai số bằng độ dài."),
        pt_dang="Số thập phân — hàng, so sánh, chuyển đổi",
        pt_kien_thuc="Cấu tạo số thập phân, quan hệ phân số – số thập phân",
        pt_du_lieu="Số có dấu phẩy; phân số mẫu 10, 100, 1 000",
        pt_phuong_phap="Xét theo hàng từ trái sang phải",
        pt_nhanh="Thêm 0 vào cuối phần thập phân không làm thay đổi giá trị.",
        tuong_tu=("So sánh: 0,5 … 0,45", ">"),
        bay="Nhiều chữ số sau dấu phẩy không có nghĩa là lớn hơn",
    )


# ══════════════════════════════════ MỨC M2 ══════════════════════════════════

@dang_ky("H-M2-01", "H", "M2", lop=(4, 5), tu_khoa=("cộng trừ phân số", "quy đồng"))
def h_m2_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["cong", "tru", "nhan", "chia"], rng.randint(5, 8)):
        f1, f2 = phan_so(rng), phan_so(rng)
        if kieu == "cong":
            y.append((f"{ps(f1)} + {ps(f2)}", ps(f1 + f2)))
        elif kieu == "tru":
            a, b = (f1, f2) if f1 >= f2 else (f2, f1)
            y.append((f"{ps(a)} − {ps(b)}", ps(a - b)))
        elif kieu == "nhan":
            y.append((f"{ps(f1)} × {ps(f2)}", ps(f1 * f2)))
        else:
            y.append((f"{ps(f1)} : {ps(f2)}", ps(f1 / f2)))
    return Bai(
        tieu_de="Bốn phép tính với phân số",
        dan="Tính rồi rút gọn kết quả.",
        y=y,
        huong_giai="Cộng, trừ phân số phải **quy đồng mẫu số** trước. Nhân phân số thì "
                   "nhân tử với tử, mẫu với mẫu. Chia phân số thì nhân với phân số đảo "
                   "ngược của số chia. Cuối cùng luôn rút gọn.",
        td=["TD1", "TD3"],
        diem_chot="Cộng trừ **cần** quy đồng, nhân chia **không cần** quy đồng.",
        loi="Quy đồng cả khi nhân, hoặc cộng thẳng tử với tử và mẫu với mẫu.",
        phong="Trước khi tính, khoanh dấu phép tính và tự nhắc “có phải quy đồng không”.",
        goi_y=("Phép tính là cộng, trừ hay nhân, chia?",
               "Cộng trừ thì quy đồng mẫu số trước.",
               "Chia thì đổi thành nhân với phân số đảo ngược."),
        pt_dang="Bốn phép tính với phân số",
        pt_kien_thuc="Quy đồng, nhân chia phân số",
        pt_du_lieu="Biểu thức chỉ gồm phân số",
        pt_phuong_phap="Chọn quy tắc theo phép tính, rút gọn cuối cùng",
        pt_nhanh="Rút gọn chéo trước khi nhân để số nhỏ, tính nhanh và ít sai.",
        tuong_tu=("Tính: 2 phần 3 + 1 phần 6", "5 phần 6"),
        bay="Nhân chia không cần quy đồng",
    )


@dang_ky("H-M2-02", "H", "M2", lop=(5,), tu_khoa=("số thập phân", "bốn phép tính"))
def h_m2_02(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["cong", "tru", "nhan", "chia"], rng.randint(5, 8)):
        a = round(rng.randint(10, 9999) / 100, 2)
        b = round(rng.randint(10, 999) / 10, 1)
        if kieu == "cong":
            y.append((f"{tp(a)} + {tp(b)}", tp(round(a + b, 2))))
        elif kieu == "tru":
            x, z = max(a, b), min(a, b)
            y.append((f"{tp(x)} − {tp(z)}", tp(round(x - z, 2))))
        elif kieu == "nhan":
            k = rng.randint(2, 9)
            y.append((f"{tp(a)} × {sv(k)}", tp(round(a * k, 2))))
        else:
            k = rng.randint(2, 9)
            y.append((f"{tp(round(a * k, 2))} : {sv(k)}", tp(round(a, 2))))
    return Bai(
        tieu_de="Bốn phép tính với số thập phân",
        dan="Đặt tính rồi tính.",
        y=y,
        huong_giai="Cộng, trừ số thập phân: viết các dấu phẩy **thẳng cột** rồi tính như "
                   "số tự nhiên, đặt dấu phẩy ở kết quả thẳng cột với các dấu phẩy trên. "
                   "Nhân số thập phân với số tự nhiên: nhân như số tự nhiên rồi đếm số chữ "
                   "số thập phân của thừa số để đặt dấu phẩy.",
        td=["TD1", "TD3"],
        diem_chot="Cộng trừ thì **thẳng dấu phẩy**; nhân thì **đếm chữ số thập phân**.",
        loi="Nhân xong đặt dấu phẩy thẳng cột như phép cộng.",
        phong="Đếm số chữ số sau dấu phẩy ngay khi viết đề bài.",
        goi_y=("Phép tính này là cộng trừ hay nhân chia?",
               "Cộng trừ thì viết thẳng dấu phẩy.",
               "Nhân thì đếm tổng số chữ số thập phân của các thừa số."),
        pt_dang="Bốn phép tính với số thập phân",
        pt_kien_thuc="Kĩ thuật tính với số thập phân",
        pt_du_lieu="Các số có dấu phẩy",
        pt_phuong_phap="Chọn quy tắc đặt dấu phẩy theo phép tính",
        pt_nhanh="Ước lượng bằng cách làm tròn để kiểm tra vị trí dấu phẩy.",
        tuong_tu=("Tính: 3,25 × 4", "13"),
        bay="Vị trí dấu phẩy ở tích",
    )


@dang_ky("H-M2-03", "H", "M2", lop=(5,), tu_khoa=("tỉ số phần trăm", "cơ bản"))
def h_m2_03(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["tim_ti_le", "tim_gia_tri", "tim_tong"], rng.randint(4, 7)):
        pc = rng.choice([5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80])
        tong = rng.choice([20, 40, 50, 60, 80, 100, 120, 200, 300, 400])
        phan = tong * pc // 100
        if phan * 100 != tong * pc:
            tong, pc, phan = 200, 25, 50
        if kieu == "tim_ti_le":
            y.append((f"Tìm tỉ số phần trăm của {sv(phan)} và {sv(tong)}.", f"{sv(pc)}%"))
        elif kieu == "tim_gia_tri":
            y.append((f"Tìm {sv(pc)}% của {sv(tong)}.", sv(phan)))
        else:
            y.append((f"Biết {sv(pc)}% của một số là {sv(phan)}. Tìm số đó.", sv(tong)))
    return Bai(
        tieu_de="Ba dạng cơ bản của tỉ số phần trăm",
        dan="Xác định rõ đề cho gì, hỏi gì.",
        y=y,
        huong_giai="Dạng 1 — tìm tỉ số phần trăm của a và b: lấy a chia b rồi nhân 100 và "
                   "viết kí hiệu %. Dạng 2 — tìm p% của b: lấy b chia 100 rồi nhân p. "
                   "Dạng 3 — biết p% của một số là a, tìm số đó: lấy a chia p rồi nhân 100.",
        td=["TD2", "TD3"],
        diem_chot="Nhận đúng **dạng nào trong ba dạng** là xong một nửa bài.",
        loi="Nhầm dạng 2 với dạng 3 nên nhân thay vì chia.",
        phong="Gạch chân: cái gì là “toàn bộ” (ứng với 100%), cái gì là “một phần”.",
        goi_y=("Trong bài, số nào ứng với 100%?",
               "Đề hỏi tỉ số, hỏi giá trị của phần, hay hỏi toàn bộ?",
               "Chọn công thức của đúng dạng đó."),
        pt_dang="Ba dạng toán tỉ số phần trăm",
        pt_kien_thuc="Tỉ số phần trăm",
        pt_du_lieu="Kí hiệu %, cụm “… % của …”",
        pt_phuong_phap="Xác định đại lượng ứng với 100% rồi chọn dạng",
        pt_nhanh="Coi 100% là “cả phần”, 1% là “cả phần chia 100” — mọi dạng đều quy về 1%.",
        tuong_tu=("Tìm 25% của 200.", "50"),
        bay="Ba dạng dễ lẫn nhau",
    )


# ══════════════════════════════════ MỨC M3 ══════════════════════════════════

@dang_ky("H-M3-01", "H", "M3", lop=(4, 5), tu_khoa=("tìm phân số của một số", "lời văn"), thuc_te=True)
def h_m3_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        mau = rng.choice([2, 3, 4, 5, 6, 8])
        tu = rng.randint(1, mau - 1)
        tong = mau * rng.randint(4, 40)
        t1, t2 = rng.sample(TO_DOI, 2)
        y.append((f"{hoa(t1)} trồng được {sv(tong)} cây. Số cây của {t2} bằng "
                  f"{ps(Fraction(tu, mau))} số cây của {t1}. Hỏi {t2} trồng được bao "
                  f"nhiêu cây?", sv(tong * tu // mau) + " cây"))
    return Bai(
        tieu_de="Tìm phân số của một số",
        dan="Trình bày lời giải có câu trả lời.",
        y=y,
        huong_giai="Muốn tìm phân số của một số, ta lấy số đó nhân với phân số. Cách hiểu: "
                   "chia số đó thành số phần bằng mẫu số, rồi lấy số phần bằng tử số.",
        td=["TD2", "TD3"],
        diem_chot="Phân số tính trên **số nào** — đọc kĩ cụm “… của …”.",
        loi="Nhân phân số với đại lượng khác, không phải đại lượng đề chỉ định.",
        phong="Gạch chân cụm “bằng … số cây của …” để xác định số bị nhân.",
        goi_y=("Phân số đó tính trên số nào?",
               "Chia số đó thành mấy phần bằng nhau?",
               "Lấy mấy phần trong số đó?"),
        pt_dang="Tìm phân số của một số",
        pt_kien_thuc="Nhân số tự nhiên với phân số",
        pt_du_lieu="Cụm “bằng … của …”",
        pt_phuong_phap="Chia theo mẫu số rồi nhân theo tử số",
        pt_nhanh="Chia trước, nhân sau — số nhỏ hơn nên tính nhẩm được.",
        tuong_tu=("Tổ Một trồng 60 cây, tổ Hai bằng 2 phần 3 tổ Một. Tổ Hai trồng mấy cây?",
                  "40 cây"),
    )


@dang_ky("H-M3-02", "H", "M3", lop=(5,), tu_khoa=("tỉ số phần trăm", "lời văn"), thuc_te=True)
def h_m3_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        si_so = rng.choice([20, 25, 40, 50])
        pc = rng.choice([20, 25, 40, 50, 60, 75, 80])
        gioi = si_so * pc // 100
        lop_ten = rng.choice(LOP_HOC)
        kieu = rng.choice(["tim_pc", "tim_so"])
        if kieu == "tim_pc":
            y.append((f"Lớp {lop_ten} có {sv(si_so)} học sinh, trong đó có {sv(gioi)} học "
                      f"sinh giỏi. Hỏi số học sinh giỏi chiếm bao nhiêu phần trăm số học "
                      f"sinh cả lớp?", f"{sv(pc)}%"))
        else:
            y.append((f"Lớp {lop_ten} có {sv(si_so)} học sinh, số học sinh giỏi chiếm "
                      f"{sv(pc)}%. Hỏi lớp đó có bao nhiêu học sinh giỏi?",
                      sv(gioi) + " học sinh"))
    return Bai(
        tieu_de="Tỉ số phần trăm trong tình huống thực tế",
        dan="Ghi rõ đại lượng nào ứng với 100%.",
        y=y,
        huong_giai="Đại lượng đứng sau chữ “của” hoặc “so với” là đại lượng ứng với 100%. "
                   "Tìm tỉ số phần trăm thì lấy phần chia cho toàn bộ rồi nhân 100. Tìm giá "
                   "trị của phần thì lấy toàn bộ chia 100 rồi nhân số phần trăm.",
        td=["TD2", "TD3"],
        diem_chot="Xác định **đại lượng ứng với 100%** trước mọi phép tính.",
        loi="Lấy số học sinh giỏi làm mẫu số khi tính tỉ số phần trăm.",
        phong="Viết rõ một dòng: “Cả lớp = 100%” trước khi tính.",
        goi_y=("Số nào ứng với 100%?",
               "Số nào là phần cần tính tỉ lệ?",
               "Lấy phần chia toàn bộ rồi nhân 100."),
        pt_dang="Tỉ số phần trăm có lời văn",
        pt_kien_thuc="Tỉ số phần trăm",
        pt_du_lieu="Cụm “chiếm bao nhiêu phần trăm”, “so với cả lớp”",
        pt_phuong_phap="Chốt đại lượng 100% rồi chọn dạng",
        pt_nhanh="Nếu tỉ số là 1 phần 4 thì bằng 25%; nhớ vài mốc quen để nhẩm.",
        tuong_tu=("Lớp có 40 học sinh, 10 em giỏi. Học sinh giỏi chiếm bao nhiêu phần trăm?",
                  "25%"),
    )


@dang_ky("H-M3-03", "H", "M3", lop=(4, 5), tu_khoa=("bảng số liệu", "thống kê", "biểu đồ"))
def h_m3_03(rng, lop):
    mon = MON_HOC[:rng.randint(4, 5)]
    sl = [rng.randint(4, 30) for _ in mon]
    tong = sum(sl)
    bang = " · ".join(f"{m}: {sv(v)}" for m, v in zip(mon, sl))
    lon = mon[sl.index(max(sl))]
    be = mon[sl.index(min(sl))]
    tb = Fraction(tong, len(sl))
    return Bai(
        tieu_de="Đọc và phân tích bảng số liệu",
        dan=f"Bảng thống kê số học sinh đăng kí câu lạc bộ theo môn: **{bang}**.",
        y=[("Tổng số học sinh đăng kí là bao nhiêu?", sv(tong)),
           ("Môn nào có nhiều học sinh đăng kí nhất?", f"{lon} ({sv(max(sl))} bạn)"),
           ("Môn nào có ít học sinh đăng kí nhất?", f"{be} ({sv(min(sl))} bạn)"),
           ("Môn nhiều nhất hơn môn ít nhất bao nhiêu bạn?", sv(max(sl) - min(sl))),
           ("Trung bình mỗi môn có bao nhiêu học sinh đăng kí?",
            sv(tb.numerator // tb.denominator) if tb.denominator == 1
            else sv(round(float(tb), 2))),
           (f"Số học sinh đăng kí môn {mon[0]} chiếm bao nhiêu phần trăm tổng số "
            f"(làm tròn đến hàng đơn vị)?", f"{sv(round(sl[0] / tong * 100))}%")],
        huong_giai="Đọc bảng theo cột, ghi lại từng số liệu. Tổng là cộng tất cả; nhiều "
                   "nhất, ít nhất là so sánh; trung bình là tổng chia số môn; tỉ số phần "
                   "trăm là phần chia tổng rồi nhân 100.",
        td=["TD1", "TD2"],
        diem_chot="Mọi câu hỏi đều quy về **tổng, so sánh, trung bình cộng, tỉ số phần trăm**.",
        loi="Đọc nhầm cột, hoặc quên một môn khi cộng tổng.",
        phong="Đánh dấu từng số đã cộng để không sót và không cộng lặp.",
        goi_y=("Ghi lại các số liệu ra một hàng.",
               "Cộng tất cả để có tổng.",
               "So sánh để tìm lớn nhất và bé nhất."),
        pt_dang="Đọc bảng số liệu thống kê",
        pt_kien_thuc="Thống kê mô tả sơ cấp, trung bình cộng, tỉ số phần trăm",
        pt_du_lieu="Đề cho bảng hoặc biểu đồ kèm nhiều câu hỏi",
        pt_phuong_phap="Ghi lại số liệu, trả lời từng câu bằng công cụ tương ứng",
        pt_nhanh="Tính tổng một lần rồi dùng lại cho mọi câu hỏi phần trăm.",
        tuong_tu=("Bảng: Toán 10, Văn 6, Anh 4. Trung bình mỗi môn bao nhiêu bạn?",
                  "6,67 bạn"),
    )


# ══════════════════════════════════ MỨC M4 ══════════════════════════════════

@dang_ky("H-M4-01", "H", "M4", lop=(5,), tu_khoa=("tỉ số phần trăm", "tăng giảm", "lãi lỗ"), thuc_te=True)
def h_m4_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["tang", "giam", "lai"], rng.randint(4, 6)):
        goc = rng.choice([100, 200, 250, 400, 500, 800, 1000]) * 1000
        pc = rng.choice([5, 10, 15, 20, 25, 30])
        if kieu == "tang":
            y.append((f"Một món hàng giá {sv(goc)} đồng, sau đó tăng giá {sv(pc)}%. "
                      f"Giá mới là bao nhiêu?", sv(goc + goc * pc // 100) + " đồng"))
        elif kieu == "giam":
            y.append((f"Một món hàng giá {sv(goc)} đồng, được giảm giá {sv(pc)}%. "
                      f"Giá sau khi giảm là bao nhiêu?", sv(goc - goc * pc // 100) + " đồng"))
        else:
            ban = goc + goc * pc // 100
            y.append((f"Mua một món hàng giá {sv(goc)} đồng rồi bán lại với giá "
                      f"{sv(ban)} đồng. Hỏi người bán lãi bao nhiêu phần trăm so với "
                      f"giá mua?", f"{sv(pc)}%"))
    return Bai(
        tieu_de="Tăng giá, giảm giá, lãi và lỗ",
        dan="Ghi rõ đại lượng nào ứng với 100%.",
        y=y,
        huong_giai="Giá gốc luôn ứng với 100%. Tăng p% thì giá mới ứng với (100 + p)%; "
                   "giảm p% thì giá mới ứng với (100 − p)%. Tính lãi theo phần trăm thì "
                   "lấy tiền lãi chia **giá mua** rồi nhân 100.",
        td=["TD2", "TD6"],
        diem_chot="Phần trăm lãi tính theo **giá mua**, không tính theo giá bán.",
        loi="Chia tiền lãi cho giá bán nên ra tỉ lệ nhỏ hơn thực tế.",
        phong="Viết rõ “Giá mua = 100%” ở dòng đầu tiên.",
        goi_y=("Giá nào ứng với 100%?",
               "Tiền lãi bằng bao nhiêu?",
               "Lấy tiền lãi chia giá mua rồi nhân 100."),
        pt_dang="Tỉ số phần trăm trong mua bán",
        pt_kien_thuc="Tỉ số phần trăm, tăng giảm theo phần trăm",
        pt_du_lieu="Từ khoá “tăng giá”, “giảm giá”, “lãi”, “lỗ”",
        pt_phuong_phap="Chốt mốc 100% rồi cộng trừ phần trăm",
        pt_nhanh="Giảm 20% nghĩa là còn 80% — nhân thẳng một lần thay vì trừ hai bước.",
        tuong_tu=("Hàng giá 500 000 đồng giảm 20%. Giá còn lại bao nhiêu?", "400 000 đồng"),
        bay="Lãi tính theo giá mua",
    )


@dang_ky("H-M4-02", "H", "M4", lop=(4, 5), tu_khoa=("phân số", "hỗn số", "biểu thức"))
def h_m4_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        f1, f2, f3 = phan_so(rng), phan_so(rng), phan_so(rng)
        kieu = rng.choice(["ngoac", "nhan_cong", "chia_cong"])
        if kieu == "ngoac":
            y.append((f"({ps(f1)} + {ps(f2)}) × {ps(f3)}", ps((f1 + f2) * f3)))
        elif kieu == "nhan_cong":
            y.append((f"{ps(f1)} × {ps(f2)} + {ps(f1)} × {ps(f3)}", ps(f1 * (f2 + f3))))
        else:
            y.append((f"{ps(f1)} : {ps(f2)} + {ps(f3)}", ps(f1 / f2 + f3)))
    return Bai(
        tieu_de="Biểu thức nhiều phép tính với phân số",
        dan="Tính giá trị biểu thức, rút gọn kết quả.",
        y=y,
        huong_giai="Thứ tự thực hiện với phân số giống hệt với số tự nhiên: trong ngoặc "
                   "trước, rồi nhân chia, cuối cùng cộng trừ. Nhận ra thừa số chung thì "
                   "đặt ra ngoài để tính nhanh.",
        td=["TD3", "TD5"],
        diem_chot="Thấy dạng a × b + a × c thì đưa ngay về a × (b + c) — rút ngắn rất nhiều.",
        loi="Quy đồng ngay từ đầu dù biểu thức có thể rút gọn trước.",
        phong="Đọc hết biểu thức, tìm thừa số chung trước khi đặt bút.",
        goi_y=("Biểu thức có dấu ngoặc không?",
               "Có thừa số chung ở hai tích không?",
               "Làm nhân chia trước, cộng trừ sau."),
        pt_dang="Biểu thức phân số nhiều phép tính",
        pt_kien_thuc="Thứ tự thực hiện phép tính, tính chất phân phối",
        pt_du_lieu="Biểu thức gồm nhiều phân số và nhiều phép tính",
        pt_phuong_phap="Quan sát rút gọn trước, sau đó theo thứ tự thực hiện",
        pt_nhanh="Rút gọn chéo tử với mẫu trước khi nhân.",
        tuong_tu=("Tính: (1 phần 2 + 1 phần 3) × 6 phần 5", "1"),
    )


# ══════════════════════════════════ MỨC M5 ══════════════════════════════════

@dang_ky("H-M5-01", "H", "M5", lop=(4, 5), tu_khoa=("so sánh phân số", "phần bù", "trung gian"))
def h_m5_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["phan_bu", "trung_gian"], rng.randint(4, 6)):
        if kieu == "phan_bu":
            n = rng.randint(5, 60)
            k = rng.randint(1, 6)
            f1 = Fraction(n, n + 1)
            f2 = Fraction(n + k, n + k + 1)
            y.append((f"{ps(f1)} … {ps(f2)}", "<"))
        else:
            a = rng.randint(3, 9)
            b = rng.randint(a * 2 + 1, a * 3)
            c = rng.randint(3, 9)
            d = rng.randint(c * 3 + 1, c * 4)
            f1, f2 = Fraction(a, b), Fraction(c, d)
            y.append((f"{ps(f1)} … {ps(f2)}",
                      "<" if f1 < f2 else (">" if f1 > f2 else "=")))
    return Bai(
        tieu_de="So sánh phân số bằng phần bù và phân số trung gian",
        dan="So sánh mà không quy đồng.",
        y=y,
        huong_giai="**Phần bù tới 1:** hai phân số đều thiếu một chút nữa thì bằng 1; "
                   "phân số nào có phần bù **bé hơn** thì lớn hơn. **Phân số trung gian:** "
                   "chọn một phân số dễ so (thường là 1 phần 2 hoặc 1 phần 3) rồi so mỗi "
                   "phân số với nó.",
        td=["TD6", "TD5"],
        diem_chot="Phần bù **bé hơn** nghĩa là phân số **lớn hơn** — dễ nhớ nhầm chiều.",
        loi="So phần bù rồi kết luận cùng chiều với phần bù.",
        phong="Nghĩ tới chiếc bánh: thiếu ít hơn thì phần đang có nhiều hơn.",
        goi_y=("Mỗi phân số còn thiếu bao nhiêu nữa thì bằng 1?",
               "Phân số nào thiếu ít hơn?",
               "Thiếu ít hơn thì lớn hơn."),
        pt_dang="So sánh phân số bằng kĩ thuật đặc biệt",
        pt_kien_thuc="Phần bù tới 1, phân số trung gian",
        pt_du_lieu="Tử và mẫu hơn kém nhau đúng 1 đơn vị; hoặc hai phân số nằm hai bên 1 phần 2",
        pt_phuong_phap="So phần bù; hoặc chèn phân số trung gian",
        pt_nhanh="Phân số dạng n phần (n + 1) càng có n lớn thì càng gần 1, tức càng lớn.",
        tuong_tu=("So sánh: 5 phần 6 … 7 phần 8", "<"),
        bay="Chiều của phần bù",
    )


@dang_ky("H-M5-02", "H", "M5", lop=(5,), tu_khoa=("tỉ số phần trăm", "hai lần thay đổi", "nâng cao"), thuc_te=True)
def h_m5_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        goc = rng.choice([100, 200, 400, 500, 1000]) * 1000
        p1 = rng.choice([10, 20, 25, 50])
        p2 = rng.choice([10, 20, 25, 50])
        sau1 = goc + goc * p1 // 100
        sau2 = sau1 - sau1 * p2 // 100
        y.append((f"Một món hàng giá {sv(goc)} đồng. Lần đầu tăng giá {sv(p1)}%, sau đó "
                  f"lần hai giảm giá {sv(p2)}% (so với giá vừa tăng). Hỏi giá cuối cùng "
                  f"là bao nhiêu và so với giá ban đầu thì tăng hay giảm?",
                  f"{sv(sau2)} đồng, " +
                  ("tăng" if sau2 > goc else ("giảm" if sau2 < goc else "không đổi")) +
                  f" {sv(abs(sau2 - goc))} đồng"))
    return Bai(
        tieu_de="Hai lần thay đổi phần trăm liên tiếp",
        dan="Chú ý mỗi lần tính phần trăm trên giá nào.",
        y=y,
        huong_giai="Lần thứ hai tính phần trăm trên **giá mới** chứ không phải giá ban đầu. "
                   "Vì vậy tăng p% rồi giảm p% **không** đưa về giá cũ. Phải tính lần lượt "
                   "từng bước, ghi rõ giá sau mỗi lần.",
        td=["TD6", "TD2"],
        diem_chot="Mốc 100% **thay đổi** sau mỗi lần — đây là bẫy kinh điển.",
        loi="Cộng trừ hai số phần trăm rồi áp một lần vào giá ban đầu.",
        phong="Viết ba dòng: giá ban đầu, giá sau lần 1, giá sau lần 2.",
        goi_y=("Giá sau lần tăng thứ nhất là bao nhiêu?",
               "Lần giảm thứ hai tính phần trăm trên giá nào?",
               "So sánh giá cuối với giá ban đầu."),
        pt_dang="Phần trăm thay đổi nhiều lần",
        pt_kien_thuc="Tỉ số phần trăm, mốc quy chiếu",
        pt_du_lieu="Hai lần tăng giảm liên tiếp",
        pt_phuong_phap="Tính tuần tự, xác định lại mốc 100% sau mỗi bước",
        pt_nhanh="Tăng 20% rồi giảm 20% thì còn 96% giá ban đầu — luôn thấp hơn giá cũ.",
        tuong_tu=("Giá 100 000 đồng tăng 10% rồi giảm 10%. Giá cuối là bao nhiêu?",
                  "99 000 đồng"),
        bay="Mốc 100% thay đổi sau mỗi lần",
    )
