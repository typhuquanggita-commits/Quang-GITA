# -*- coding: utf-8 -*-
"""Thư viện mẫu bài dành riêng cho LỚP 3 — mức M3, M4, M5 của tám nhóm.

Chương trình lớp 3 chỉ tới số 100 000, nhân chia với số có một chữ số, phân số
dạng “một phần mấy”, hình chữ nhật – hình vuông – hình tròn, bảng số liệu đơn
giản. Vì vậy các mức nâng cao của lớp 3 phải nâng bằng **độ sâu suy luận**
chứ không bằng độ lớn của số.
"""
from __future__ import annotations

from fractions import Fraction

from .khung import (Bai, hoa, TEN, TO_DOI, bo_so_tbc, cap_tong_hieu, dang_ky,
                    luan_phien, ps, sv)

L3 = (3,)


# ═══════════════════════════ NHÓM A — Số học ═══════════════════════════

@dang_ky("A3-M3-01", "A", "M3", lop=L3, tu_khoa=("cấu tạo số", "lập số", "lớp 3"))
def a3_m3_01(rng, lop):
    bo = sorted(rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3))
    ds = sorted({bo[i] * 100 + bo[j] * 10 + bo[k]
                 for i in range(3) for j in range(3) for k in range(3)
                 if len({i, j, k}) == 3})
    return Bai(
        tieu_de="Lập số có ba chữ số khác nhau",
        dan=f"Cho ba chữ số **{', '.join(str(d) for d in bo)}**.",
        y=[("Viết tất cả các số có ba chữ số khác nhau lập được, từ bé đến lớn.",
            " · ".join(sv(x) for x in ds)),
           ("Lập được bao nhiêu số?", sv(len(ds))),
           ("Số lớn nhất là số nào?", sv(max(ds))),
           ("Số bé nhất là số nào?", sv(min(ds))),
           ("Hiệu của số lớn nhất và số bé nhất bằng bao nhiêu?", sv(max(ds) - min(ds))),
           ("Trong các số đó, có bao nhiêu số chẵn?",
            sv(sum(1 for x in ds if x % 2 == 0)))],
        huong_giai="Chọn chữ số hàng trăm trước, rồi hàng chục, rồi hàng đơn vị; mỗi chữ "
                   "số dùng đúng một lần. Viết theo nhóm cùng chữ số hàng trăm để không "
                   "sót và không trùng.",
        td=["TD4", "TD3"],
        diem_chot="Viết **có thứ tự** thì mới chắc chắn đủ và không lặp.",
        loi="Viết lộn xộn nên vừa sót vừa trùng.",
        phong="Cố định chữ số hàng trăm rồi mới đổi chỗ hai chữ số còn lại.",
        goi_y=("Chữ số hàng trăm có mấy cách chọn?",
               "Với mỗi hàng trăm, hai chữ số còn lại xếp mấy cách?",
               "Viết theo nhóm để kiểm soát."),
        pt_dang="Lập số từ bộ chữ số",
        pt_kien_thuc="Cấu tạo số có ba chữ số",
        pt_du_lieu="Cho ba chữ số, yêu cầu lập số",
        pt_phuong_phap="Cố định hàng trăm rồi hoán vị hai hàng còn lại",
        pt_nhanh="Ba chữ số khác 0 luôn lập được đúng 6 số.",
        tuong_tu=("Từ 1, 2, 3 lập được mấy số có ba chữ số khác nhau?", "6"),
    )


@dang_ky("A3-M4-01", "A", "M4", lop=L3, tu_khoa=("cấu tạo số", "tìm số", "lớp 3"))
def a3_m4_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(1, 9)
        b = rng.randint(0, 9)
        so = a * 10 + b
        doi = b * 10 + a
        if b == 0:
            b = rng.randint(1, 9)
            so, doi = a * 10 + b, b * 10 + a
        y.append((f"Số có hai chữ số {sv(so)}; viết hai chữ số theo thứ tự ngược lại "
                  f"được số nào? Hai số đó hơn kém nhau bao nhiêu đơn vị?",
                  f"{sv(doi)}, hơn kém {sv(abs(so - doi))} đơn vị"))
    return Bai(
        tieu_de="Đổi chỗ hai chữ số của một số",
        dan="Viết số mới rồi so sánh với số cũ.",
        y=y,
        huong_giai="Số có hai chữ số viết được thành chục nhân 10 cộng đơn vị. Khi đổi chỗ "
                   "hai chữ số, phần chục và phần đơn vị hoán đổi vai trò, nên hiệu hai số "
                   "luôn bằng **9 lần hiệu hai chữ số**.",
        td=["TD3", "TD4"],
        diem_chot="Hiệu hai số luôn là **bội của 9**.",
        loi="Coi hiệu hai số bằng hiệu hai chữ số.",
        phong="Tính thử vài trường hợp nhỏ để thấy quy luật nhân 9.",
        goi_y=("Viết số cũ thành chục × 10 + đơn vị.",
               "Viết số mới cũng như vậy.",
               "Trừ hai biểu thức xem còn lại gì."),
        pt_dang="Đổi chỗ chữ số",
        pt_kien_thuc="Cấu tạo số có hai chữ số",
        pt_du_lieu="“Viết theo thứ tự ngược lại”, “đổi chỗ hai chữ số”",
        pt_phuong_phap="Viết cả hai số theo cấu tạo rồi lấy hiệu",
        pt_nhanh="Hiệu = 9 × (chữ số hàng chục − chữ số hàng đơn vị).",
        tuong_tu=("Số 52 đổi chỗ hai chữ số được 25. Hai số hơn kém nhau bao nhiêu?", "27"),
        bay="Hiệu là 9 lần hiệu hai chữ số",
    )


@dang_ky("A3-M5-01", "A", "M5", lop=L3, tu_khoa=("đếm chữ số", "đánh số trang", "lớp 3"))
def a3_m5_01(rng, lop):
    y = []
    for n in luan_phien(rng, [20, 30, 50, 80, 99, 120, 150], rng.randint(4, 6)):
        tong = sum(len(str(i)) for i in range(1, n + 1))
        y.append((f"Một quyển vở có {sv(n)} trang, đánh số từ 1. Phải viết tất cả bao "
                  f"nhiêu chữ số?", sv(tong)))
    return Bai(
        tieu_de="Đếm chữ số dùng để đánh số trang",
        dan="Đếm theo nhóm số có một, hai, ba chữ số.",
        y=y,
        huong_giai="Từ trang 1 đến trang 9 có 9 trang, mỗi trang 1 chữ số. Từ trang 10 "
                   "đến trang 99 có 90 trang, mỗi trang 2 chữ số. Từ trang 100 trở đi mỗi "
                   "trang 3 chữ số. Nhân rồi cộng; nhóm cuối thường không đầy đủ.",
        td=["TD4", "TD6"],
        diem_chot="Nhóm cuối cùng **không đầy đủ** — phải đếm đúng số trang còn lại.",
        loi="Lấy số trang nhân với 2 hoặc 3 cho toàn bộ.",
        phong="Kẻ bảng: khoảng trang – số trang – số chữ số.",
        goi_y=("Từ 1 đến 9 dùng mấy chữ số?",
               "Từ 10 đến 99 có bao nhiêu trang?",
               "Nhóm cuối có bao nhiêu trang?"),
        pt_dang="Đếm chữ số theo nhóm",
        pt_kien_thuc="Đếm số hạng, cấu tạo số",
        pt_du_lieu="Bài toán đánh số trang",
        pt_phuong_phap="Chia nhóm theo độ dài số rồi nhân, cộng",
        pt_nhanh="Sách 99 trang dùng đúng 189 chữ số — nhớ mốc này.",
        tuong_tu=("Vở 20 trang dùng hết bao nhiêu chữ số?", "31"),
        bay="Nhóm cuối không đầy đủ",
    )


# ═══════════════════════════ NHÓM B — Phép tính ═══════════════════════════

@dang_ky("B3-M3-01", "B", "M3", lop=L3, tu_khoa=("tính nhanh", "ghép số tròn", "lớp 3"))
def b3_m3_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["cap_tron", "nhan_tron", "tru_bang"], rng.randint(4, 7)):
        a = rng.randint(11, 89)
        b = 100 - a
        c = rng.randint(20, 400)
        if kieu == "cap_tron":
            y.append((f"{sv(a)} + {sv(c)} + {sv(b)}", sv(a + b + c)))
        elif kieu == "nhan_tron":
            k = rng.randint(2, 9)
            y.append((f"{sv(k)} × {sv(c)} × 0", "0"))
        else:
            y.append((f"{sv(c)} + {sv(a)} − {sv(a)}", sv(c)))
    return Bai(
        tieu_de="Tính nhanh bằng cách quan sát",
        dan="Tính bằng cách thuận tiện nhất.",
        y=y,
        huong_giai="Trước khi tính, hãy nhìn cả biểu thức: có cặp nào cộng lại tròn trăm "
                   "không, có thừa số 0 không, có hai số giống nhau cộng rồi trừ không. "
                   "Nhận ra được thì viết đáp số gần như ngay lập tức.",
        td=["TD5", "TD6"],
        diem_chot="**Nhìn trước, tính sau** — đó là toàn bộ bí quyết tính nhanh.",
        loi="Lao vào tính từ trái sang phải, bỏ lỡ mọi lối tắt.",
        phong="Đọc hết biểu thức một lượt trước khi đặt bút.",
        goi_y=("Có cặp nào cộng lại tròn trăm không?",
               "Có thừa số nào bằng 0 không?",
               "Có hai số giống nhau cộng rồi trừ không?"),
        pt_dang="Tính nhanh biểu thức đơn giản",
        pt_kien_thuc="Tính chất giao hoán, kết hợp; nhân với 0",
        pt_du_lieu="Biểu thức có cặp tròn trăm, có số 0, có cặp cộng rồi trừ",
        pt_phuong_phap="Quan sát toàn biểu thức trước khi tính",
        pt_nhanh="Tích có một thừa số bằng 0 thì bằng 0, dù các số khác lớn đến đâu.",
        tuong_tu=("Tính nhanh: 25 + 137 + 75", "237"),
        bay="Thừa số 0",
    )


@dang_ky("B3-M4-01", "B", "M4", lop=L3, tu_khoa=("tìm x", "hai bước", "lớp 3"))
def b3_m4_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["ax+b", "ax-b", "b-x", "x:a+b"], rng.randint(4, 6)):
        a = rng.randint(2, 9)
        x = rng.randint(3, 60)
        b = rng.randint(5, 90)
        if kieu == "ax+b":
            y.append((f"x × {sv(a)} + {sv(b)} = {sv(a * x + b)}", f"x = {sv(x)}"))
        elif kieu == "ax-b":
            y.append((f"x × {sv(a)} − {sv(b)} = {sv(a * x)}",
                      f"x = {sv(a * x + b)} : {sv(a)}" if (a * x + b) % a
                      else f"x = {sv((a * x + b) // a)}"))
        elif kieu == "b-x":
            t = x + b
            y.append((f"{sv(t)} − x = {sv(b)}", f"x = {sv(x)}"))
        else:
            y.append((f"x : {sv(a)} + {sv(b)} = {sv(x + b)}", f"x = {sv(x * a)}"))
    return Bai(
        tieu_de="Tìm x qua hai bước",
        dan="Tìm x, trình bày từng bước.",
        y=y,
        huong_giai="Coi cụm chứa x là một thành phần của phép tính ngoài cùng. Tìm giá trị "
                   "của cụm đó trước, rồi mới tìm x bên trong. Cuối cùng thay x vào đề để thử lại.",
        td=["TD3"],
        diem_chot="Gỡ **phép tính ngoài cùng trước**, phép trong sau.",
        loi="Gỡ phép nhân trước khi gỡ phép cộng ở ngoài.",
        phong="Khoanh tròn cụm chứa x rồi coi cả cụm là một số.",
        goi_y=("Khoanh cụm chứa x, coi là một số.",
               "Cụm đó là số hạng, số bị trừ hay thừa số?",
               "Tìm giá trị của cụm rồi tìm x."),
        pt_dang="Tìm x hai bước",
        pt_kien_thuc="Quan hệ các thành phần của phép tính",
        pt_du_lieu="x nằm trong một cụm có hai phép tính",
        pt_phuong_phap="Gỡ dần từ ngoài vào trong",
        pt_nhanh="Thay x vừa tìm vào đề để thử — nhanh hơn dò lại từng bước.",
        tuong_tu=("Tìm x: x × 4 + 8 = 36", "x = 7"),
    )


@dang_ky("B3-M5-01", "B", "M5", lop=L3, tu_khoa=("tính nhanh", "dãy tổng", "lớp 3"))
def b3_m5_01(rng, lop):
    y = []
    for n in luan_phien(rng, [10, 20, 25, 50, 100], rng.randint(4, 6)):
        y.append((f"1 + 2 + 3 + … + {sv(n)}", sv(n * (n + 1) // 2)))
    return Bai(
        tieu_de="Tính nhanh tổng các số tự nhiên liên tiếp",
        dan="Tính tổng mỗi dãy bằng cách ghép cặp.",
        y=y,
        huong_giai="Ghép số đầu với số cuối, số thứ hai với số áp chót… mỗi cặp có cùng "
                   "một tổng. Đếm số cặp rồi nhân. Nếu số số hạng lẻ thì còn dư số ở giữa, "
                   "phải cộng thêm.",
        td=["TD4", "TD5"],
        diem_chot="Ghép cặp đầu – cuối, mọi cặp có **tổng bằng nhau**.",
        loi="Cộng dồn từ đầu đến cuối, rất lâu và dễ sai.",
        phong="Viết ra ba cặp đầu để thấy rõ các cặp có cùng tổng.",
        goi_y=("Ghép số đầu với số cuối, tổng bằng bao nhiêu?",
               "Ghép số thứ hai với số áp chót, tổng bằng bao nhiêu?",
               "Có bao nhiêu cặp như thế?"),
        pt_dang="Tổng dãy số tự nhiên liên tiếp",
        pt_kien_thuc="Ghép cặp, tổng dãy cách đều",
        pt_du_lieu="Dãy cộng dài có dấu …",
        pt_phuong_phap="Ghép cặp đầu – cuối rồi nhân",
        pt_nhanh="1 + 2 + … + 100 = 5 050 — nhớ mốc này để kiểm tra.",
        tuong_tu=("Tính: 1 + 2 + 3 + … + 10", "55"),
        bay="Số số hạng lẻ thì còn số ở giữa",
    )


# ═══════════════════════════ NHÓM C — Dãy số ═══════════════════════════

@dang_ky("C3-M2-01", "C", "M2", lop=L3, tu_khoa=("dãy số", "đếm số hạng", "lớp 3"))
def c3_m2_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        d = rng.choice([2, 3, 4, 5, 10])
        dau = rng.randint(1, 20)
        n = rng.randint(6, 40)
        cuoi = dau + (n - 1) * d
        y.append((f"Dãy {sv(dau)}, {sv(dau + d)}, {sv(dau + 2 * d)}, …, {sv(cuoi)} "
                  f"có bao nhiêu số hạng?", sv(n)))
    return Bai(
        tieu_de="Đếm số hạng của dãy cách đều",
        dan="Đếm số số hạng của mỗi dãy.",
        y=y,
        huong_giai="Số số hạng = (số cuối − số đầu) : khoảng cách + 1. Phần chia cho biết "
                   "số khoảng; số số hạng nhiều hơn số khoảng đúng 1.",
        td=["TD4", "TD3"],
        diem_chot="Số khoảng ít hơn số số hạng đúng **1**.",
        loi="Quên cộng 1.",
        phong="Thử với dãy ngắn ba số để kiểm tra công thức.",
        goi_y=("Khoảng cách của dãy bằng bao nhiêu?",
               "Từ số đầu tới số cuối có mấy khoảng?",
               "Số số hạng nhiều hơn số khoảng 1."),
        pt_dang="Đếm số hạng dãy cách đều",
        pt_kien_thuc="Dãy cách đều",
        pt_du_lieu="Dãy có số đầu, số cuối, khoảng cách đều",
        pt_phuong_phap="(cuối − đầu) : khoảng cách + 1",
        pt_nhanh="Dãy số liên tiếp từ a đến b có b − a + 1 số hạng.",
        tuong_tu=("Dãy 2, 4, 6, …, 20 có bao nhiêu số hạng?", "10"),
        bay="Quên cộng 1",
    )


@dang_ky("C3-M3-01", "C", "M3", lop=L3, tu_khoa=("dãy số", "quy luật", "lớp 3"))
def c3_m3_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["cach_deu", "nhan", "cong_dan"], rng.randint(4, 6)):
        a = rng.randint(1, 9)
        if kieu == "cach_deu":
            d = rng.randint(2, 9)
            ds = [a + i * d for i in range(6)]
        elif kieu == "nhan":
            q = rng.choice([2, 3])
            ds = [a * q ** i for i in range(6)]
        else:
            ds = [a]
            for i in range(1, 6):
                ds.append(ds[-1] + i)
        y.append((f"{', '.join(sv(x) for x in ds[:5])}, …", sv(ds[5])))
    return Bai(
        tieu_de="Tìm quy luật của dãy số",
        dan="Tìm quy luật rồi viết số hạng tiếp theo.",
        y=y,
        huong_giai="Thử theo thứ tự: (1) lấy hiệu hai số liên tiếp — bằng nhau thì là dãy "
                   "cách đều; (2) lấy thương — bằng nhau thì là dãy nhân; (3) xem dãy hiệu "
                   "có tăng đều không.",
        td=["TD4", "TD6"],
        diem_chot="Thử đủ **ba hướng**, đừng dừng ở hướng thứ nhất.",
        loi="Không tìm ra hiệu đều thì bỏ cuộc.",
        phong="Viết dãy hiệu xuống ngay dưới dãy gốc.",
        goi_y=("Lấy hiệu các số liên tiếp — có bằng nhau không?",
               "Lấy thương — có bằng nhau không?",
               "Dãy hiệu có tăng đều không?"),
        pt_dang="Tìm quy luật dãy số",
        pt_kien_thuc="Dãy cách đều, dãy nhân, dãy hiệu tăng đều",
        pt_du_lieu="Dãy số kết thúc bằng dấu …",
        pt_phuong_phap="Thử hiệu → thử thương → thử dãy hiệu",
        pt_nhanh="Số sau gấp đôi số trước là dấu hiệu quen nhất của dãy nhân.",
        tuong_tu=("Viết tiếp: 1, 3, 6, 10, …", "15"),
    )


@dang_ky("C3-M4-01", "C", "M4", lop=L3, tu_khoa=("trồng cây", "khoảng cách", "lớp 3"))
def c3_m4_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["hai_dau", "mot_dau", "khong_dau", "khep_kin"],
                           rng.randint(4, 6)):
        d = rng.choice([2, 3, 4, 5])
        n = rng.randint(5, 25)
        dai = d * n
        if kieu == "hai_dau":
            y.append((f"Đoạn đường dài {sv(dai)} m, trồng cây cách nhau {sv(d)} m, "
                      f"trồng cả hai đầu. Cần bao nhiêu cây?", sv(n + 1)))
        elif kieu == "mot_dau":
            y.append((f"Đoạn đường dài {sv(dai)} m, trồng cây cách nhau {sv(d)} m, "
                      f"chỉ trồng ở một đầu. Cần bao nhiêu cây?", sv(n)))
        elif kieu == "khong_dau":
            y.append((f"Đoạn đường dài {sv(dai)} m, trồng cây cách nhau {sv(d)} m, "
                      f"không trồng ở hai đầu. Cần bao nhiêu cây?", sv(n - 1)))
        else:
            y.append((f"Quanh một cái ao có chu vi {sv(dai)} m, trồng cây cách nhau "
                      f"{sv(d)} m. Cần bao nhiêu cây?", sv(n)))
    return Bai(
        tieu_de="Bài toán trồng cây",
        dan="Vẽ hình minh hoạ trước khi tính.",
        y=y,
        huong_giai="Tính số khoảng trước: độ dài chia khoảng cách. Trồng cả hai đầu thì số "
                   "cây hơn số khoảng 1; trồng một đầu thì bằng số khoảng; không trồng đầu "
                   "nào thì kém 1; trồng khép kín thì bằng đúng số khoảng.",
        td=["TD3", "TD6"],
        diem_chot="Bốn trường hợp cho **bốn đáp số khác nhau** — đọc kĩ đề.",
        loi="Máy móc cộng 1 cho mọi trường hợp.",
        phong="Vẽ một hình nhỏ với ba khoảng để đếm thử.",
        goi_y=("Tính số khoảng trước.",
               "Đề nói trồng ở hai đầu, một đầu, hay khép kín?",
               "Vẽ thử một hình nhỏ."),
        pt_dang="Bài toán trồng cây",
        pt_kien_thuc="Quan hệ số cây – số khoảng",
        pt_du_lieu="“Trồng cây”, “cột điện”, “quanh ao”",
        pt_phuong_phap="Số khoảng rồi chọn công thức theo trường hợp",
        pt_nhanh="Khép kín thì số cây bằng đúng số khoảng.",
        tuong_tu=("Đường dài 20 m, cây cách nhau 4 m, trồng cả hai đầu. Mấy cây?", "6"),
        bay="Bốn trường hợp trồng cây",
    )


@dang_ky("C3-M5-01", "C", "M5", lop=L3, tu_khoa=("dãy số", "chu kì", "lớp 3"))
def c3_m5_01(rng, lop):
    k = rng.randint(3, 5)
    mau = [rng.randint(1, 9) for _ in range(k)]
    y = []
    for _ in range(rng.randint(3, 5)):
        vi = rng.randint(15, 120)
        y.append((f"Số hạng thứ {sv(vi)} của dãy là số nào?", sv(mau[(vi - 1) % k])))
    n = rng.choice([30, 60, 90])
    y.append((f"Tổng {sv(n)} số hạng đầu tiên bằng bao nhiêu?",
              sv(sum(mau) * (n // k) + sum(mau[:n % k]))))
    return Bai(
        tieu_de="Dãy số lặp lại theo chu kì",
        dan=f"Dãy lặp lại mãi nhóm {', '.join(sv(x) for x in mau)}: "
            f"{', '.join(sv(x) for x in mau)}, {', '.join(sv(x) for x in mau)}, …",
        y=y,
        huong_giai="Chia vị trí cần tìm cho độ dài chu kì. Số dư cho biết vị trí trong chu "
                   "kì; nếu chia hết (dư 0) thì đó là phần tử **cuối** chu kì.",
        td=["TD4", "TD6"],
        diem_chot="Dư 0 ứng với phần tử **cuối** chu kì, không phải phần tử đầu.",
        loi="Dư 0 mà lấy phần tử đầu tiên.",
        phong="Kiểm chứng với một vị trí nhỏ đã biết trước khi làm vị trí lớn.",
        goi_y=("Chu kì dài mấy số hạng?",
               "Chia vị trí cho độ dài chu kì.",
               "Số dư cho biết vị trí trong chu kì."),
        pt_dang="Dãy tuần hoàn",
        pt_kien_thuc="Phép chia có dư, tính tuần hoàn",
        pt_du_lieu="Dãy lặp lại một nhóm số cố định",
        pt_phuong_phap="Chia lấy dư để định vị",
        pt_nhanh="Tổng n số hạng = tổng một chu kì × số chu kì đầy đủ + phần dư.",
        tuong_tu=("Dãy 1, 2, 3, 1, 2, 3, … số hạng thứ 20 là số nào?", "2"),
        bay="Số dư 0",
    )


# ═══════════════════════════ NHÓM D — Toán điển hình ═══════════════════════════

@dang_ky("D3-M3-01", "D", "M3", lop=L3, tu_khoa=("gấp kém", "hai bước", "lớp 3"), thuc_te=True)
def d3_m3_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(6, 60)
        k = rng.randint(2, 6)
        t1, t2 = rng.sample(TO_DOI, 2)
        y.append((f"{hoa(t1)} trồng được {sv(a)} cây. {hoa(t2)} trồng "
                  f"được gấp {sv(k)} lần {t1}. Hỏi cả hai tổ trồng được bao nhiêu cây?",
                  sv(a + a * k) + " cây"))
    return Bai(
        tieu_de="Bài toán giải bằng hai phép tính",
        dan="Trình bày lời giải có câu trả lời cho từng bước.",
        y=y,
        huong_giai="Bước 1: tìm đại lượng chưa biết bằng quan hệ gấp – kém. Bước 2: cộng "
                   "hai đại lượng lại theo yêu cầu của đề. Mỗi bước phải có một câu lời "
                   "giải riêng.",
        td=["TD2", "TD3"],
        diem_chot="Câu hỏi cuối hỏi **cả hai tổ**, nên phải cộng ở bước hai.",
        loi="Dừng lại ở bước một, trả lời số cây của một tổ.",
        phong="Đọc lại câu hỏi sau khi tính xong bước một.",
        goi_y=("Tổ thứ hai trồng được bao nhiêu cây?",
               "Đề hỏi số cây của một tổ hay cả hai tổ?",
               "Cộng hai kết quả lại."),
        pt_dang="Bài toán giải bằng hai phép tính",
        pt_kien_thuc="Quan hệ gấp – kém, phép cộng",
        pt_du_lieu="Đề cho một đại lượng và quan hệ, hỏi tổng",
        pt_phuong_phap="Tìm đại lượng còn thiếu rồi cộng",
        pt_nhanh="Cả hai tổ bằng (1 + k) lần tổ thứ nhất — nhẩm được ngay.",
        tuong_tu=("Tổ Một trồng 12 cây, tổ Hai gấp 3 lần. Cả hai tổ trồng mấy cây?",
                  "48 cây"),
        bay="Đọc kĩ câu hỏi cuối",
    )


@dang_ky("D3-M4-01", "D", "M4", lop=L3, tu_khoa=("tổng hiệu", "lớp 3"), thuc_te=True)
def d3_m4_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        tong, hieu, lon, be = cap_tong_hieu(rng, 20, 200)
        a, b = rng.sample(TEN, 2)
        y.append((f"{a} và {b} có tất cả {sv(tong)} quyển vở. {a} có nhiều hơn {b} "
                  f"{sv(hieu)} quyển. Hỏi mỗi bạn có bao nhiêu quyển vở?",
                  f"{a}: {sv(lon)} quyển, {b}: {sv(be)} quyển"))
    return Bai(
        tieu_de="Tìm hai số khi biết tổng và hiệu",
        dan="Vẽ sơ đồ đoạn thẳng rồi giải.",
        y=y,
        huong_giai="Vẽ hai đoạn thẳng, đoạn trên dài hơn đoạn dưới đúng phần hiệu. Nếu bớt "
                   "phần hiệu ở đoạn trên thì hai đoạn bằng nhau; chia đôi tổng mới được "
                   "số bé, rồi cộng hiệu được số lớn.",
        td=["TD3", "TD2"],
        diem_chot="Bớt hiệu rồi mới chia đôi — thứ tự không được đảo.",
        loi="Chia đôi tổng ngay rồi cộng hiệu vào cả hai số.",
        phong="Vẽ sơ đồ và tô phần hiệu bằng bút khác màu.",
        goi_y=("Vẽ hai đoạn thẳng, đoạn nào dài hơn?",
               "Bớt phần hơn đi thì tổng còn lại bao nhiêu?",
               "Chia đôi tổng mới để ra số bé."),
        pt_dang="Bài toán tổng – hiệu",
        pt_kien_thuc="Sơ đồ đoạn thẳng, công thức tổng – hiệu",
        pt_du_lieu="“Có tất cả …” và “nhiều hơn … là …”",
        pt_phuong_phap="Sơ đồ đoạn thẳng đưa về hai phần bằng nhau",
        pt_nhanh="Số bé = (tổng − hiệu) : 2; số lớn = số bé + hiệu.",
        tuong_tu=("Hai bạn có 30 quyển vở, bạn thứ nhất nhiều hơn 4 quyển. Mỗi bạn mấy quyển?",
                  "17 và 13"),
    )


@dang_ky("D3-M5-01", "D", "M5", lop=L3, tu_khoa=("giả thiết tạm", "lớp 3"), thuc_te=True)
def d3_m5_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        ga = rng.randint(3, 25)
        cho = rng.randint(3, 25)
        y.append((f"Vừa gà vừa chó có {sv(ga + cho)} con, đếm được {sv(ga * 2 + cho * 4)} "
                  f"chân. Hỏi có bao nhiêu con gà, bao nhiêu con chó?",
                  f"{sv(ga)} con gà, {sv(cho)} con chó"))
    return Bai(
        tieu_de="Bài toán gà và chó",
        dan="Giả sử tất cả đều là gà rồi lập luận.",
        y=y,
        huong_giai="Giả sử tất cả đều là gà thì số chân bằng số con nhân 2. Số chân đó "
                   "thiếu so với thực tế; mỗi con chó bị tính thiếu 2 chân, nên lấy số "
                   "chân thiếu chia 2 được số chó.",
        td=["TD6", "TD3"],
        diem_chot="Chia số chân thiếu cho **2** (là 4 − 2), không chia cho 4.",
        loi="Chia số chân thiếu cho 4.",
        phong="Thử lại: nhân ngược ra tổng số chân xem có khớp đề không.",
        goi_y=("Nếu tất cả đều là gà thì có bao nhiêu chân?",
               "Số chân đó thiếu bao nhiêu so với thực tế?",
               "Một con chó nhiều hơn một con gà mấy chân?"),
        pt_dang="Giả thiết tạm",
        pt_kien_thuc="Phương pháp giả thiết tạm",
        pt_du_lieu="Hai loại con vật, biết tổng số con và tổng số chân",
        pt_phuong_phap="Giả sử đồng nhất → tính chênh → chia cho hiệu số chân",
        pt_nhanh="Số chó = (số chân − 2 × số con) : 2.",
        tuong_tu=("Có 10 con gà và chó, 26 chân. Mấy con chó?", "3 con chó"),
        bay="Chia cho hiệu số chân",
    )


# ═══════════════════════════ NHÓM E — Đại lượng ═══════════════════════════

@dang_ky("E3-M2-01", "E", "M2", lop=L3, tu_khoa=("đổi đơn vị", "lớp 3"))
def e3_m2_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["km_m", "m_cm", "cm_mm", "kg_g", "l_ml"],
                           rng.randint(5, 8)):
        n = rng.randint(2, 90)
        bang = {"km_m": ("km", "m", 1000), "m_cm": ("m", "cm", 100),
                "cm_mm": ("cm", "mm", 10), "kg_g": ("kg", "g", 1000),
                "l_ml": ("l", "ml", 1000)}[kieu]
        y.append((f"{sv(n)} {bang[0]} = … {bang[1]}", sv(n * bang[2])))
    return Bai(
        tieu_de="Đổi đơn vị đo ở lớp 3",
        dan="Điền số thích hợp.",
        y=y,
        huong_giai="1 km = 1 000 m; 1 m = 100 cm; 1 cm = 10 mm; 1 kg = 1 000 g; "
                   "1 l = 1 000 ml. Đổi từ đơn vị lớn sang đơn vị bé thì nhân.",
        td=["TD1"],
        diem_chot="Nhớ đúng **số lần** giữa hai đơn vị.",
        loi="Nhầm 1 m = 10 cm.",
        phong="Học thuộc bảng năm quan hệ trên và đọc lại trước khi làm.",
        goi_y=("Đơn vị nào lớn hơn?",
               "Một đơn vị lớn bằng bao nhiêu đơn vị bé?",
               "Nhân số đã cho với số lần đó."),
        pt_dang="Đổi đơn vị đo",
        pt_kien_thuc="Bảng đơn vị đo lớp 3",
        pt_du_lieu="Hai đơn vị khác nhau nối bởi dấu …",
        pt_phuong_phap="Nhớ quan hệ rồi nhân",
        pt_nhanh="Thêm đúng số chữ số 0 tương ứng: 3 số 0 cho km→m, 2 số 0 cho m→cm.",
        tuong_tu=("5 m = … cm", "500"),
    )


@dang_ky("E3-M3-01", "E", "M3", lop=L3, tu_khoa=("xem đồng hồ", "thời gian", "lớp 3"))
def e3_m3_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["cong", "tru", "doi"], rng.randint(4, 7)):
        g = rng.randint(1, 11)
        m = rng.choice([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55])
        them = rng.choice([10, 15, 20, 25, 30, 40, 45, 60, 90])
        tong = g * 60 + m
        if kieu == "cong":
            t = tong + them
            y.append((f"Bây giờ là {sv(g)} giờ {sv(m)} phút. Sau {sv(them)} phút nữa là "
                      f"mấy giờ?", f"{sv(t // 60 % 24)} giờ {sv(t % 60)} phút"))
        elif kieu == "tru":
            t = max(tong - them, 5)
            y.append((f"Bây giờ là {sv(g)} giờ {sv(m)} phút. Cách đây {sv(tong - t)} phút "
                      f"là mấy giờ?", f"{sv(t // 60)} giờ {sv(t % 60)} phút"))
        else:
            y.append((f"{sv(g)} giờ {sv(m)} phút = … phút", sv(tong)))
    return Bai(
        tieu_de="Xem đồng hồ và tính thời gian",
        dan="Ghi kết quả theo giờ và phút.",
        y=y,
        huong_giai="1 giờ = 60 phút. Đổi cả hai về phút rồi cộng hoặc trừ, sau đó đổi kết "
                   "quả trở lại thành giờ và phút bằng phép chia cho 60 lấy thương và dư.",
        td=["TD1", "TD3"],
        diem_chot="Thời gian đếm theo **60**, không theo 10.",
        loi="Cộng phần phút thành hơn 60 mà quên đổi thành giờ.",
        phong="Kiểm tra: phần phút của đáp số phải bé hơn 60.",
        goi_y=("Đổi giờ hiện tại ra phút.",
               "Cộng hoặc trừ số phút đề cho.",
               "Chia kết quả cho 60 lấy thương và số dư."),
        pt_dang="Tính thời gian trong ngày",
        pt_kien_thuc="Quan hệ giờ – phút",
        pt_du_lieu="Có chữ “giờ”, “phút”, “sau … phút nữa”",
        pt_phuong_phap="Quy về phút, tính, đổi lại",
        pt_nhanh="Cộng tròn giờ trước, cộng phút lẻ sau.",
        tuong_tu=("7 giờ 40 phút, sau 30 phút nữa là mấy giờ?", "8 giờ 10 phút"),
        bay="Phần phút vượt quá 60",
    )


@dang_ky("E3-M4-01", "E", "M4", lop=L3, tu_khoa=("đại lượng", "lời văn", "lớp 3"), thuc_te=True)
def e3_m4_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        n = rng.randint(3, 9)
        moi = rng.choice([50, 100, 125, 200, 250, 500])
        lay = rng.randint(1, n - 1)
        y.append((f"Có {sv(n)} gói kẹo, mỗi gói {sv(moi)} g. Lấy ra {sv(lay)} gói. "
                  f"Hỏi số kẹo còn lại nặng bao nhiêu gam?",
                  sv((n - lay) * moi) + " g"))
    return Bai(
        tieu_de="Bài toán đại lượng hai bước",
        dan="Trình bày lời giải cho từng bước.",
        y=y,
        huong_giai="Có hai đường: tính tổng rồi trừ phần lấy ra; hoặc tính số gói còn lại "
                   "rồi nhân. Đường thứ hai ngắn hơn.",
        td=["TD3", "TD5"],
        diem_chot="Trừ **số gói** trước khi nhân thì ít phép tính hơn.",
        loi="Trừ số gói cho số gam, hai đại lượng khác loại.",
        phong="Ghi đơn vị sau mỗi số để không trừ nhầm.",
        goi_y=("Còn lại bao nhiêu gói?",
               "Mỗi gói nặng bao nhiêu gam?",
               "Nhân hai kết quả."),
        pt_dang="Bài toán đại lượng hai bước",
        pt_kien_thuc="Nhân, trừ; đơn vị khối lượng",
        pt_du_lieu="Cho số nhóm, khối lượng mỗi nhóm, số nhóm đã lấy",
        pt_phuong_phap="Trừ trước, nhân sau",
        pt_nhanh="So hai đường giải, chọn đường ít phép tính.",
        tuong_tu=("Có 5 gói kẹo, mỗi gói 200 g, lấy ra 2 gói. Còn lại bao nhiêu gam?",
                  "600 g"),
    )


@dang_ky("E3-M5-01", "E", "M5", lop=L3, tu_khoa=("đại lượng", "suy luận", "lớp 3"), thuc_te=True)
def e3_m5_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        can = rng.choice([100, 200, 500])
        vat = rng.randint(2, 8) * can
        y.append((f"Một chiếc cân đĩa chỉ có các quả cân loại {sv(can)} g. Muốn cân một "
                  f"vật nặng {sv(vat)} g thì cần bao nhiêu quả cân như thế?",
                  sv(vat // can) + " quả"))
    return Bai(
        tieu_de="Cân đĩa và quả cân",
        dan="Suy nghĩ theo số lần chứa.",
        y=y,
        huong_giai="Số quả cân cần dùng bằng khối lượng của vật chia cho khối lượng một "
                   "quả cân. Nếu chia không hết thì không thể cân chính xác bằng loại quả "
                   "cân đó.",
        td=["TD2", "TD6"],
        diem_chot="Chia không hết nghĩa là **không cân được** bằng loại quả cân ấy.",
        loi="Làm tròn lên rồi coi như cân được.",
        phong="Kiểm tra phép chia có dư hay không trước khi kết luận.",
        goi_y=("Một quả cân nặng bao nhiêu?",
               "Vật nặng gấp mấy lần một quả cân?",
               "Phép chia có dư không?"),
        pt_dang="Bài toán cân, chia hết",
        pt_kien_thuc="Phép chia hết và chia có dư; đơn vị khối lượng",
        pt_du_lieu="Cân đĩa với một loại quả cân",
        pt_phuong_phap="Chia và xét số dư",
        pt_nhanh="Đổi cả hai về cùng đơn vị rồi chia.",
        tuong_tu=("Quả cân 200 g, vật nặng 1 000 g. Cần mấy quả?", "5 quả"),
        bay="Phép chia có dư",
    )


# ═══════════════════════════ NHÓM F — Hình học ═══════════════════════════

@dang_ky("F3-M2-01", "F", "M2", lop=L3, tu_khoa=("chu vi", "diện tích", "lớp 3"))
def f3_m2_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["cv_cn", "dt_cn", "cv_v", "dt_v"], rng.randint(5, 8)):
        a = rng.randint(4, 40)
        b = rng.randint(2, max(3, a - 1))
        if kieu == "cv_cn":
            y.append((f"Hình chữ nhật dài {sv(a)} cm, rộng {sv(b)} cm. Tính chu vi.",
                      sv((a + b) * 2) + " cm"))
        elif kieu == "dt_cn":
            y.append((f"Hình chữ nhật dài {sv(a)} cm, rộng {sv(b)} cm. Tính diện tích.",
                      sv(a * b) + " cm²"))
        elif kieu == "cv_v":
            y.append((f"Hình vuông cạnh {sv(a)} cm. Tính chu vi.", sv(a * 4) + " cm"))
        else:
            y.append((f"Hình vuông cạnh {sv(a)} cm. Tính diện tích.", sv(a * a) + " cm²"))
    return Bai(
        tieu_de="Chu vi và diện tích hình chữ nhật, hình vuông",
        dan="Tính và ghi rõ đơn vị.",
        y=y,
        huong_giai="Chu vi hình chữ nhật = (dài + rộng) × 2. Diện tích = dài × rộng. "
                   "Chu vi hình vuông = cạnh × 4. Diện tích hình vuông = cạnh × cạnh.",
        td=["TD1", "TD3"],
        diem_chot="Chu vi ghi **cm**, diện tích ghi **cm²**.",
        loi="Nhầm công thức chu vi với diện tích.",
        phong="Vẽ hình và ghi số đo lên hình trước khi tính.",
        goi_y=("Đề hỏi chu vi hay diện tích?",
               "Viết công thức ra trước.",
               "Ghi đúng đơn vị."),
        pt_dang="Chu vi, diện tích hình cơ bản",
        pt_kien_thuc="Công thức chu vi, diện tích",
        pt_du_lieu="Cho chiều dài, chiều rộng hoặc cạnh",
        pt_phuong_phap="Chọn công thức, ghi đúng đơn vị",
        pt_nhanh="Hình vuông là hình chữ nhật có dài bằng rộng.",
        tuong_tu=("Hình vuông cạnh 6 cm. Tính diện tích.", "36 cm²"),
        bay="Đơn vị diện tích",
    )


@dang_ky("F3-M3-01", "F", "M3", lop=L3, tu_khoa=("đếm hình", "lớp 3"))
def f3_m3_01(rng, lop):
    m = rng.randint(2, 4)
    n = rng.randint(2, 4)
    hcn = m * (m + 1) // 2 * (n * (n + 1) // 2)
    vuong = sum((m - k) * (n - k) for k in range(min(m, n)))
    return Bai(
        tieu_de="Đếm hình trong lưới ô vuông",
        dan=f"Cho lưới gồm {sv(m)} hàng và {sv(n)} cột ô vuông nhỏ bằng nhau.",
        y=[("Lưới có bao nhiêu ô vuông nhỏ?", sv(m * n)),
           ("Lưới có bao nhiêu đường kẻ ngang, bao nhiêu đường kẻ dọc?",
            f"{sv(m + 1)} đường ngang, {sv(n + 1)} đường dọc"),
           ("Có tất cả bao nhiêu hình chữ nhật (kể cả hình vuông)?", sv(hcn)),
           ("Có bao nhiêu hình vuông?", sv(vuong)),
           ("Có bao nhiêu hình chữ nhật không phải hình vuông?", sv(hcn - vuong))],
        huong_giai="Chọn hai đường kẻ ngang và hai đường kẻ dọc thì được đúng một hình chữ "
                   "nhật. Số cách chọn 2 trong k đường là k × (k − 1) : 2. Đếm hình vuông "
                   "thì đếm theo từng cỡ cạnh 1, 2, 3…",
        td=["TD4", "TD3"],
        diem_chot="Đếm **theo cỡ** hoặc **theo đường kẻ** — không đếm mò.",
        loi="Chỉ đếm ô nhỏ, quên hình ghép từ nhiều ô.",
        phong="Kẻ bảng theo cỡ hình rồi cộng.",
        goi_y=("Lưới có bao nhiêu đường kẻ mỗi chiều?",
               "Chọn hai đường ngang và hai đường dọc được gì?",
               "Đếm hình vuông theo từng cỡ cạnh."),
        pt_dang="Đếm hình trong lưới",
        pt_kien_thuc="Quy tắc đếm",
        pt_du_lieu="Lưới ô vuông đều",
        pt_phuong_phap="Đếm theo đường kẻ hoặc theo cỡ",
        pt_nhanh="Số cách chọn 2 trong k là k × (k − 1) : 2.",
        tuong_tu=("Lưới 2 × 2 có mấy hình vuông?", "5"),
        bay="Bỏ sót hình ghép",
    )


@dang_ky("F3-M4-01", "F", "M4", lop=L3, tu_khoa=("ghép hình", "chu vi", "lớp 3"))
def f3_m4_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(3, 15)
        n = rng.randint(2, 5)
        y.append((f"Ghép {sv(n)} hình vuông cạnh {sv(a)} cm thành một hàng ngang. "
                  f"Tính chu vi và diện tích hình chữ nhật thu được.",
                  f"chu vi {sv((n * a + a) * 2)} cm, diện tích {sv(n * a * a)} cm²"))
    return Bai(
        tieu_de="Ghép hình vuông thành hình chữ nhật",
        dan="Vẽ hình rồi tính.",
        y=y,
        huong_giai="Ghép n hình vuông cạnh a thành một hàng thì được hình chữ nhật có "
                   "chiều dài n × a và chiều rộng a. Diện tích cộng lại đúng bằng tổng "
                   "diện tích các hình vuông, nhưng **chu vi thì không** cộng lại như vậy "
                   "vì các cạnh dán vào trong không còn nằm trên đường bao.",
        td=["TD3", "TD6"],
        diem_chot="Diện tích cộng được, **chu vi thì không**.",
        loi="Nhân chu vi một hình vuông với số hình.",
        phong="Vẽ hình ghép và tô đậm đường bao trước khi tính.",
        goi_y=("Chiều dài hình mới bằng bao nhiêu?",
               "Chiều rộng hình mới bằng bao nhiêu?",
               "Áp công thức chu vi và diện tích hình chữ nhật."),
        pt_dang="Ghép hình, chu vi và diện tích",
        pt_kien_thuc="Chu vi, diện tích hình chữ nhật",
        pt_du_lieu="“Ghép … hình vuông thành …”",
        pt_phuong_phap="Xác định kích thước hình mới rồi áp công thức",
        pt_nhanh="Ghép thành hàng ngang thì chiều rộng vẫn bằng cạnh hình vuông.",
        tuong_tu=("Ghép 3 hình vuông cạnh 4 cm thành hàng. Chu vi bằng bao nhiêu?", "32 cm"),
        bay="Chu vi không cộng như diện tích",
    )


@dang_ky("F3-M5-01", "F", "M5", lop=L3, tu_khoa=("hình học", "suy luận", "lớp 3"))
def f3_m5_01(rng, lop):
    a = rng.randint(4, 20)
    b = rng.randint(2, a - 1)
    them = rng.randint(1, 8)
    return Bai(
        tieu_de="Diện tích thay đổi khi kích thước thay đổi",
        dan=f"Một hình chữ nhật có chiều dài {sv(a)} cm, chiều rộng {sv(b)} cm.",
        y=[("Tính chu vi hình chữ nhật đó.", sv((a + b) * 2) + " cm"),
           ("Tính diện tích hình chữ nhật đó.", sv(a * b) + " cm²"),
           (f"Nếu tăng chiều dài thêm {sv(them)} cm, giữ nguyên chiều rộng thì diện tích "
            f"tăng thêm bao nhiêu?", sv(them * b) + " cm²"),
           (f"Khi đó chu vi tăng thêm bao nhiêu?", sv(them * 2) + " cm"),
           (f"Nếu thay vào đó tăng chiều rộng thêm {sv(them)} cm thì diện tích tăng thêm "
            f"bao nhiêu?", sv(them * a) + " cm²"),
           ("Tăng chiều nào thì diện tích tăng nhiều hơn? Vì sao?",
            "tăng chiều rộng, vì phần tăng thêm nhân với chiều dài (là chiều lớn hơn)")],
        huong_giai="Tăng một chiều thêm k đơn vị thì diện tích tăng thêm đúng một hình chữ "
                   "nhật kích thước k × chiều còn lại, còn chu vi chỉ tăng thêm 2 × k. "
                   "Vì vậy tăng chiều nào thì diện tích tăng theo **chiều kia**.",
        td=["TD6", "TD3"],
        diem_chot="Tăng chiều dài thì diện tích tăng theo **chiều rộng**, và ngược lại.",
        loi="Cho rằng tăng chiều dài thì diện tích tăng nhiều hơn vì chiều dài lớn hơn.",
        phong="Vẽ hình cũ nằm trong hình mới và tô phần dôi ra.",
        goi_y=("Vẽ hình cũ và hình mới chồng lên nhau.",
               "Phần dôi ra là hình gì, kích thước bao nhiêu?",
               "So sánh hai trường hợp tăng."),
        pt_dang="Biến thiên chu vi và diện tích",
        pt_kien_thuc="Chu vi, diện tích hình chữ nhật",
        pt_du_lieu="“Tăng chiều … thêm … cm”",
        pt_phuong_phap="Vẽ hình chồng, xác định phần dôi ra",
        pt_nhanh="Chu vi tăng 2 × k dù tăng chiều nào; diện tích thì phụ thuộc chiều còn lại.",
        tuong_tu=("Hình chữ nhật 10 cm × 4 cm, tăng chiều dài 2 cm. Diện tích tăng bao nhiêu?",
                  "8 cm²"),
        bay="Diện tích tăng theo chiều còn lại",
    )


# ═══════════════════════════ NHÓM G — Suy luận ═══════════════════════════

@dang_ky("G3-M2-01", "G", "M2", lop=L3, tu_khoa=("quy tắc đếm", "lớp 3"))
def g3_m2_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        a = rng.randint(2, 6)
        b = rng.randint(2, 6)
        y.append((f"Có {sv(a)} loại bánh và {sv(b)} loại nước. Chọn một loại bánh và một "
                  f"loại nước thì có bao nhiêu cách chọn?", sv(a * b) + " cách"))
    return Bai(
        tieu_de="Đếm số cách chọn bằng quy tắc nhân",
        dan="Vẽ sơ đồ cây rồi đếm.",
        y=y,
        huong_giai="Với mỗi loại bánh có đủ số cách chọn nước, nên tổng số cách bằng số "
                   "loại bánh nhân số loại nước. Vẽ sơ đồ cây để nhìn thấy điều đó.",
        td=["TD2", "TD4"],
        diem_chot="Hai việc **nối tiếp nhau** thì nhân, không cộng.",
        loi="Cộng số loại bánh với số loại nước.",
        phong="Vẽ sơ đồ cây với hai nhánh đầu để thấy rõ.",
        goi_y=("Chọn xong bánh đã đủ một bộ chưa?",
               "Với mỗi loại bánh có mấy cách chọn nước?",
               "Nhân hai số lại."),
        pt_dang="Quy tắc nhân",
        pt_kien_thuc="Quy tắc nhân trong phép đếm",
        pt_du_lieu="Chọn một phần tử từ mỗi nhóm",
        pt_phuong_phap="Nhân số cách của các bước",
        pt_nhanh="Vẽ sơ đồ cây hai tầng là thấy ngay phép nhân.",
        tuong_tu=("3 loại bánh, 2 loại nước. Có mấy cách chọn một bộ?", "6 cách"),
        bay="Cộng hay nhân",
    )


@dang_ky("G3-M3-01", "G", "M3", lop=L3, tu_khoa=("suy luận", "loại trừ", "lớp 3"))
def g3_m3_01(rng, lop):
    a, b, c = rng.sample(TEN, 3)
    qua = rng.sample(["táo", "cam", "lê", "xoài"], 3)
    thich = dict(zip([a, b, c], qua))
    return Bai(
        tieu_de="Suy luận bằng bảng loại trừ",
        dan=f"Ba bạn {a}, {b}, {c} mỗi bạn thích đúng một loại quả khác nhau trong ba loại "
            f"{', '.join(qua)}. Biết **{a} thích {thich[a]}** và **{b} không thích "
            f"{thich[c]}**.",
        y=[(f"Kẻ bảng ba hàng, ba cột. Dấu ✔ đầu tiên đặt vào ô nào?",
            f"ô ({a}; {thich[a]})"),
           (f"Sau dấu ✔ đó, cột {thich[a]} còn ô nào có thể đúng không?", "không"),
           (f"Dữ kiện thứ hai cho đánh ✘ vào ô nào?", f"ô ({b}; {thich[c]})"),
           (f"Vậy {b} thích quả gì?", thich[b]),
           (f"Vậy {c} thích quả gì?", thich[c])],
        huong_giai="Kẻ bảng tên người × loại quả. Mỗi dữ kiện cho một dấu ✔ hoặc ✘. Sau "
                   "mỗi dấu ✔, gạch bỏ toàn bộ hàng và toàn bộ cột chứa nó. Khi một hàng "
                   "chỉ còn một ô trống thì ô đó là ✔.",
        td=["TD2", "TD6"],
        diem_chot="Mỗi dấu ✔ **lan toả** ra cả hàng và cả cột.",
        loi="Suy luận nhẩm trong đầu nên bỏ sót khả năng.",
        phong="Luôn kẻ bảng, dù bài trông dễ.",
        goi_y=("Kẻ bảng tên người × loại quả.",
               "Dữ kiện nào cho dấu chắc chắn?",
               "Gạch bỏ cả hàng và cả cột sau mỗi dấu ✔."),
        pt_dang="Suy luận loại trừ có bảng",
        pt_kien_thuc="Phương pháp lập bảng",
        pt_du_lieu="Mỗi người ứng với đúng một đối tượng",
        pt_phuong_phap="Kẻ bảng, đánh dấu, lan toả",
        pt_nhanh="Bắt đầu từ dữ kiện khẳng định trước dữ kiện phủ định.",
        tuong_tu=("Ba bạn thích ba quả khác nhau, An thích táo, Bình không thích cam. "
                  "Bình thích quả gì?", "lê"),
    )


@dang_ky("G3-M4-01", "G", "M4", lop=L3, tu_khoa=("Đi-rích-lê", "lớp 3"))
def g3_m4_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        loai = rng.randint(2, 5)
        can = rng.randint(2, 4)
        y.append((f"Trong hộp có bút thuộc {sv(loai)} màu khác nhau, mỗi màu rất nhiều "
                  f"chiếc. Phải lấy ít nhất bao nhiêu chiếc (không nhìn) để chắc chắn có "
                  f"{sv(can)} chiếc cùng màu?", sv(loai * (can - 1) + 1) + " chiếc"))
    return Bai(
        tieu_de="Lấy ít nhất bao nhiêu để chắc chắn",
        dan="Xét trường hợp xấu nhất.",
        y=y,
        huong_giai="Xấu nhất là mỗi màu lấy được đúng (số cần − 1) chiếc mà vẫn chưa đủ. "
                   "Lấy thêm một chiếc nữa thì chắc chắn có đủ số chiếc cùng màu.",
        td=["TD6", "TD2"],
        diem_chot="Luôn xuất phát từ **trường hợp xấu nhất** rồi cộng thêm 1.",
        loi="Nhân số màu với số chiếc cần rồi lấy luôn kết quả.",
        phong="Viết rõ câu “Xấu nhất là mỗi màu lấy được … chiếc mà vẫn chưa đủ”.",
        goi_y=("Xấu nhất mỗi màu lấy được mấy chiếc mà vẫn chưa đủ?",
               "Tổng cộng lấy được bao nhiêu chiếc?",
               "Lấy thêm một chiếc nữa thì sao?"),
        pt_dang="Nguyên lí ngăn kéo",
        pt_kien_thuc="Lập luận trường hợp xấu nhất",
        pt_du_lieu="“Ít nhất … để chắc chắn …”",
        pt_phuong_phap="Dựng trường hợp xấu nhất rồi cộng 1",
        pt_nhanh="Số loại × (số cần − 1) + 1.",
        tuong_tu=("Hộp có bút 3 màu. Lấy ít nhất mấy chiếc để chắc chắn có 2 chiếc cùng màu?",
                  "4 chiếc"),
        bay="Trường hợp xấu nhất",
    )


@dang_ky("G3-M5-01", "G", "M5", lop=L3, tu_khoa=("bắt tay", "đếm cặp", "lớp 3"))
def g3_m5_01(rng, lop):
    y = []
    for n in luan_phien(rng, [4, 5, 6, 7, 8, 10], rng.randint(4, 6)):
        y.append((f"Có {sv(n)} bạn, mỗi bạn bắt tay với tất cả các bạn còn lại đúng một "
                  f"lần. Có tất cả bao nhiêu cái bắt tay?", sv(n * (n - 1) // 2) + " cái"))
    return Bai(
        tieu_de="Bài toán bắt tay",
        dan="Đếm số cái bắt tay, không đếm số lượt.",
        y=y,
        huong_giai="Mỗi bạn bắt tay với (n − 1) bạn còn lại nên có n × (n − 1) lượt. "
                   "Nhưng mỗi cái bắt tay có hai người tham gia nên bị đếm **hai lần**; "
                   "vì vậy phải chia cho 2.",
        td=["TD4", "TD6"],
        diem_chot="Chia 2 vì mỗi cái bắt tay bị đếm **hai lần**.",
        loi="Quên chia 2 nên đáp số gấp đôi.",
        phong="Thử với 3 bạn: phải ra 3 cái bắt tay, không phải 6.",
        goi_y=("Mỗi bạn bắt tay với mấy bạn?",
               "Nhân với số bạn thì mỗi cái bắt tay bị đếm mấy lần?",
               "Chia cho 2."),
        pt_dang="Đếm số cặp",
        pt_kien_thuc="Đếm cặp, nguyên tắc đếm lặp",
        pt_du_lieu="“Mỗi người với tất cả những người còn lại”",
        pt_phuong_phap="n × (n − 1) : 2",
        pt_nhanh="5 bạn có 10 cái bắt tay; 10 bạn có 45 cái.",
        tuong_tu=("6 bạn bắt tay nhau. Có bao nhiêu cái bắt tay?", "15 cái"),
        bay="Mỗi cặp bị đếm hai lần",
    )


# ═══════════════════════════ NHÓM H — Phân số & thống kê ═══════════════════════════

@dang_ky("H3-M1-01", "H", "M1", lop=L3, tu_khoa=("một phần mấy", "phân số", "lớp 3"))
def h3_m1_01(rng, lop):
    y = []
    for _ in range(rng.randint(5, 8)):
        mau = rng.choice([2, 3, 4, 5, 6, 8, 10])
        tong = mau * rng.randint(2, 20)
        y.append((f"Tìm {ps(Fraction(1, mau))} của {sv(tong)}.", sv(tong // mau)))
    return Bai(
        tieu_de="Tìm một phần mấy của một số",
        dan="Tính rồi ghi kết quả.",
        y=y,
        huong_giai="Muốn tìm một phần mấy của một số, ta chia số đó cho mẫu số. Ví dụ tìm "
                   "một phần tư của 20 thì lấy 20 chia 4.",
        td=["TD1"],
        diem_chot="Một phần mấy thì **chia** cho số đó.",
        loi="Nhân thay vì chia.",
        phong="Kiểm tra: kết quả phải **bé hơn** số ban đầu.",
        goi_y=("Chia số đó thành mấy phần bằng nhau?",
               "Lấy mấy phần?",
               "Vậy phải làm phép tính gì?"),
        pt_dang="Tìm một phần mấy của một số",
        pt_kien_thuc="Phân số dạng một phần mấy",
        pt_du_lieu="Cụm “một phần mấy của …”",
        pt_phuong_phap="Chia số đó cho mẫu số",
        pt_nhanh="Kết quả luôn nhỏ hơn số ban đầu — dùng để kiểm tra ngay.",
        tuong_tu=("Tìm 1 phần 4 của 20.", "5"),
        bay="Chia chứ không nhân",
    )


@dang_ky("H3-M2-01", "H", "M2", lop=L3, tu_khoa=("bảng số liệu", "thống kê", "lớp 3"))
def h3_m2_01(rng, lop):
    ten = rng.sample(TEN, 4)
    sl = [rng.randint(3, 25) for _ in ten]
    tong = sum(sl)
    lon = ten[sl.index(max(sl))]
    be = ten[sl.index(min(sl))]
    ds, tb = bo_so_tbc(rng, 4, 5, 20)
    return Bai(
        tieu_de="Đọc bảng số liệu",
        dan="Bảng ghi số bông hoa mỗi bạn gấp được: " +
            " · ".join(f"{t}: {sv(v)}" for t, v in zip(ten, sl)) + ".",
        y=[("Cả bốn bạn gấp được bao nhiêu bông hoa?", sv(tong)),
           ("Bạn nào gấp được nhiều nhất?", f"{lon} ({sv(max(sl))} bông)"),
           ("Bạn nào gấp được ít nhất?", f"{be} ({sv(min(sl))} bông)"),
           ("Bạn nhiều nhất hơn bạn ít nhất bao nhiêu bông?", sv(max(sl) - min(sl))),
           (f"Nếu bốn bạn khác gấp được {', '.join(sv(x) for x in ds)} bông thì trung bình "
            f"mỗi bạn gấp được bao nhiêu bông?", sv(tb))],
        huong_giai="Đọc bảng theo từng cột, ghi lại các số. Tổng là cộng tất cả; nhiều "
                   "nhất, ít nhất là so sánh; trung bình cộng là tổng chia số bạn.",
        td=["TD1", "TD2"],
        diem_chot="Đọc **đúng cột** — mỗi số gắn với đúng một tên.",
        loi="Đọc lệch cột nên gán nhầm số cho bạn khác.",
        phong="Dùng ngón tay dò theo cột khi đọc bảng.",
        goi_y=("Ghi lại các số liệu ra một hàng.",
               "Cộng tất cả để có tổng.",
               "So sánh để tìm lớn nhất, bé nhất."),
        pt_dang="Đọc bảng số liệu",
        pt_kien_thuc="Thống kê đơn giản, trung bình cộng",
        pt_du_lieu="Đề cho bảng số liệu kèm nhiều câu hỏi",
        pt_phuong_phap="Ghi lại số liệu rồi trả lời từng câu",
        pt_nhanh="Tính tổng một lần rồi dùng lại cho các câu sau.",
        tuong_tu=("Ba bạn gấp 5, 8, 11 bông. Trung bình mỗi bạn mấy bông?", "8 bông"),
    )


@dang_ky("H3-M3-01", "H", "M3", lop=L3, tu_khoa=("một phần mấy", "lời văn", "lớp 3"), thuc_te=True)
def h3_m3_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        mau = rng.choice([2, 3, 4, 5])
        tong = mau * rng.randint(3, 25)
        y.append((f"Một cửa hàng có {sv(tong)} kg gạo, đã bán {ps(Fraction(1, mau))} "
                  f"số gạo đó. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?",
                  sv(tong - tong // mau) + " kg"))
    return Bai(
        tieu_de="Một phần mấy của một số — bài toán có lời văn",
        dan="Trình bày lời giải hai bước.",
        y=y,
        huong_giai="Bước 1: tìm số gạo đã bán bằng cách chia tổng cho mẫu số. Bước 2: lấy "
                   "tổng trừ đi số đã bán để ra số còn lại.",
        td=["TD2", "TD3"],
        diem_chot="Đề hỏi số **còn lại**, nên phải trừ ở bước hai.",
        loi="Dừng ở bước một, trả lời số gạo đã bán.",
        phong="Đọc lại câu hỏi sau khi tính xong bước một.",
        goi_y=("Đã bán bao nhiêu ki-lô-gam?",
               "Đề hỏi số đã bán hay số còn lại?",
               "Lấy tổng trừ đi số đã bán."),
        pt_dang="Tìm một phần mấy rồi tính phần còn lại",
        pt_kien_thuc="Phân số một phần mấy, phép trừ",
        pt_du_lieu="“Đã bán một phần mấy”, hỏi “còn lại”",
        pt_phuong_phap="Chia để tìm phần đã dùng rồi trừ",
        pt_nhanh="Bán 1 phần 4 thì còn 3 phần 4 — chia rồi nhân 3, một bước là xong.",
        tuong_tu=("Có 20 kg gạo, bán 1 phần 4. Còn bao nhiêu kg?", "15 kg"),
        bay="Câu hỏi hỏi phần còn lại",
    )


@dang_ky("H3-M4-01", "H", "M4", lop=L3, tu_khoa=("một phần mấy", "tìm số", "lớp 3"))
def h3_m4_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        mau = rng.choice([2, 3, 4, 5, 6])
        phan = rng.randint(3, 40)
        y.append((f"Biết {ps(Fraction(1, mau))} của một số là {sv(phan)}. Tìm số đó.",
                  sv(phan * mau)))
    return Bai(
        tieu_de="Tìm một số khi biết một phần mấy của nó",
        dan="Làm ngược lại phép chia.",
        y=y,
        huong_giai="Nếu một phần mấy của một số bằng a thì số đó bằng a nhân với mẫu số. "
                   "Vì số đó được chia thành mấy phần bằng nhau, mỗi phần bằng a.",
        td=["TD3", "TD2"],
        diem_chot="Biết một phần thì **nhân** để ra cả số; biết cả số thì **chia** để ra một phần.",
        loi="Chia thay vì nhân.",
        phong="Kiểm tra: số tìm được phải **lớn hơn** số đã cho.",
        goi_y=("Số đó được chia thành mấy phần bằng nhau?",
               "Mỗi phần bằng bao nhiêu?",
               "Cả số gồm mấy phần như thế?"),
        pt_dang="Tìm số khi biết một phần mấy của nó",
        pt_kien_thuc="Quan hệ ngược của phép chia",
        pt_du_lieu="“Một phần mấy của một số là …, tìm số đó”",
        pt_phuong_phap="Nhân giá trị một phần với mẫu số",
        pt_nhanh="Kết quả phải lớn hơn số đã cho — dùng để loại đáp số sai ngay.",
        tuong_tu=("1 phần 3 của một số là 7. Tìm số đó.", "21"),
        bay="Nhân chứ không chia",
    )


@dang_ky("H3-M5-01", "H", "M5", lop=L3, tu_khoa=("một phần mấy", "hai bước", "lớp 3"), thuc_te=True)
def h3_m5_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        m = rng.choice([2, 3, 4])
        n = rng.choice([2, 3, 4])
        tong = m * n * rng.randint(2, 20)
        con1 = tong - tong // m
        con2 = con1 - con1 // n
        y.append((f"Có {sv(tong)} quyển vở. Ngày đầu phát {ps(Fraction(1, m))} số vở, "
                  f"ngày thứ hai phát {ps(Fraction(1, n))} **số vở còn lại**. "
                  f"Hỏi còn lại bao nhiêu quyển vở?", sv(con2) + " quyển"))
    return Bai(
        tieu_de="Hai lần lấy một phần mấy",
        dan="Chú ý cụm “số còn lại”.",
        y=y,
        huong_giai="Bước 1: tính số vở phát ngày đầu và số vở còn lại sau ngày đầu. "
                   "Bước 2: phân số của ngày thứ hai tính trên **số còn lại**, không phải "
                   "trên tổng ban đầu. Bước 3: trừ tiếp để ra số cuối cùng.",
        td=["TD6", "TD2"],
        diem_chot="Cụm “số còn lại” đổi hẳn số bị chia ở bước hai.",
        loi="Lấy cả hai phân số tính trên tổng ban đầu.",
        phong="Sau mỗi bước, viết rõ “còn lại … quyển” rồi mới sang bước sau.",
        goi_y=("Ngày đầu phát bao nhiêu quyển?",
               "Sau ngày đầu còn lại bao nhiêu?",
               "Ngày thứ hai lấy một phần mấy của số nào?"),
        pt_dang="Tìm phân số của một số qua nhiều bước",
        pt_kien_thuc="Phân số một phần mấy, phép trừ liên tiếp",
        pt_du_lieu="Cụm “… số còn lại”",
        pt_phuong_phap="Tính tuần tự, ghi lại số còn lại sau mỗi bước",
        pt_nhanh="Lấy đi 1 phần m thì còn (m − 1) phần m — nhân trực tiếp cho nhanh.",
        tuong_tu=("Có 24 quyển vở, phát 1 phần 2, rồi phát 1 phần 3 số còn lại. Còn mấy quyển?",
                  "8 quyển"),
        bay="Phân số của số còn lại",
    )
