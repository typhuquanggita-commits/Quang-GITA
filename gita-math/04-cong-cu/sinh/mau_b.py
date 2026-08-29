# -*- coding: utf-8 -*-
"""Thư viện mẫu bài — NHÓM B: Phép tính & Tính nhanh."""
from __future__ import annotations

from fractions import Fraction

from .khung import Bai, dang_ky, luan_phien, ps, sv

# ─────────────────────── tiện ích riêng của nhóm B ───────────────────────

TRAN = {3: 1_000, 4: 100_000, 5: 1_000_000}


def bieu_thuc_2_phep(rng, lop):
    """Sinh biểu thức hai phép tính có ngoặc hoặc không, kèm giá trị đúng."""
    a = rng.randint(12, 60 if lop == 3 else 300)
    b = rng.randint(2, 9 if lop == 3 else 25)
    c = rng.randint(2, 9)
    kieu = rng.choice(["a+b*c", "a-b*c", "(a+b)*c", "a*b+a*c", "a*(b+c)"])
    if kieu == "a+b*c":
        return f"{sv(a)} + {sv(b)} × {sv(c)}", a + b * c
    if kieu == "a-b*c":
        a = max(a, b * c + rng.randint(1, 40))
        return f"{sv(a)} − {sv(b)} × {sv(c)}", a - b * c
    if kieu == "(a+b)*c":
        return f"({sv(a)} + {sv(b)}) × {sv(c)}", (a + b) * c
    if kieu == "a*b+a*c":
        return f"{sv(a)} × {sv(b)} + {sv(a)} × {sv(c)}", a * b + a * c
    return f"{sv(a)} × ({sv(b)} + {sv(c)})", a * (b + c)


# ══════════════════════════════════ MỨC M1 ══════════════════════════════════

@dang_ky("B-M1-01", "B", "M1", tu_khoa=("cộng", "trừ", "đặt tính"))
def b_m1_01(rng, lop):
    tr = TRAN[lop]
    y = []
    for _ in range(rng.randint(5, 8)):
        a = rng.randint(tr // 10, tr)
        b = rng.randint(tr // 20, tr)
        if rng.random() < 0.5:
            y.append((f"{sv(a)} + {sv(b)}", sv(a + b)))
        else:
            x, z = max(a, b), min(a, b)
            y.append((f"{sv(x)} − {sv(z)}", sv(x - z)))
    return Bai(
        tieu_de="Đặt tính rồi tính (cộng, trừ)",
        dan="Đặt tính rồi tính.",
        y=y,
        huong_giai="Viết các số thẳng hàng theo đúng hàng đơn vị, cộng hoặc trừ từ phải "
                   "sang trái, nhớ sang hàng liền trước khi tổng vượt quá 9 hoặc khi "
                   "phải mượn.",
        td=["TD1"],
        diem_chot="Thẳng hàng **đơn vị**, không thẳng theo chữ số đầu.",
        loi="Viết lệch hàng khi hai số có số chữ số khác nhau.",
        phong="Kẻ cột dọc cho từng hàng trước khi viết số.",
        goi_y=("Viết số dưới sao cho hàng đơn vị thẳng hàng đơn vị.",
               "Tính từ phải sang trái.",
               "Nhớ 1 sang hàng liền trước khi cần."),
        pt_dang="Cộng, trừ số tự nhiên",
        pt_kien_thuc="Kĩ thuật đặt tính, nhớ và mượn",
        pt_du_lieu="Yêu cầu “đặt tính rồi tính”",
        pt_phuong_phap="Đặt tính thẳng hàng, tính từ hàng đơn vị",
        pt_nhanh="Làm tròn một số hạng để ước lượng trước, dùng kết quả ước lượng để "
                 "phát hiện sai sót.",
        tuong_tu=("Đặt tính rồi tính: 4 328 + 1 795", "6 123"),
    )


@dang_ky("B-M1-02", "B", "M1", tu_khoa=("nhân", "chia", "đặt tính"))
def b_m1_02(rng, lop):
    y = []
    for _ in range(rng.randint(5, 8)):
        if lop == 3:
            a, b = rng.randint(102, 999), rng.randint(2, 9)
        elif lop == 4:
            a, b = rng.randint(1_000, 9_999), rng.randint(11, 99)
        else:
            a, b = rng.randint(10_000, 99_999), rng.randint(11, 999)
        if rng.random() < 0.55:
            y.append((f"{sv(a)} × {sv(b)}", sv(a * b)))
        else:
            tich = a * b
            y.append((f"{sv(tich)} : {sv(b)}", sv(a)))
    return Bai(
        tieu_de="Đặt tính rồi tính (nhân, chia)",
        dan="Đặt tính rồi tính.",
        y=y,
        huong_giai="Nhân lần lượt từng chữ số của thừa số thứ hai với số thứ nhất, mỗi "
                   "tích riêng viết lùi sang trái một cột rồi cộng lại. Chia thì lấy từng "
                   "phần của số bị chia, mỗi lần hạ một chữ số phải viết một chữ số ở thương.",
        td=["TD1"],
        diem_chot="Mỗi lần hạ một chữ số là **bắt buộc** viết một chữ số ở thương, kể cả chữ số 0.",
        loi="Quên viết chữ số 0 ở thương nên thương thiếu chữ số.",
        phong="Đếm số chữ số của thương trước khi chia để biết mình cần viết mấy chữ số.",
        goi_y=("Viết các tích riêng lùi đúng cột.",
               "Khi chia, mỗi lần hạ một chữ số thì viết một chữ số ở thương.",
               "Thử lại bằng phép tính ngược."),
        pt_dang="Nhân, chia số tự nhiên",
        pt_kien_thuc="Kĩ thuật đặt tính nhân, chia",
        pt_du_lieu="Yêu cầu “đặt tính rồi tính” với phép nhân, chia",
        pt_phuong_phap="Nhân từng chữ số, cộng tích riêng; chia theo lượt hạ chữ số",
        pt_nhanh="Kiểm tra kết quả bằng phép tính ngược: thương × số chia = số bị chia.",
        tuong_tu=("Đặt tính rồi tính: 3 045 × 24", "73 080"),
        bay="Chữ số 0 ở giữa thương",
    )


@dang_ky("B-M1-03", "B", "M1", tu_khoa=("thứ tự thực hiện", "biểu thức"))
def b_m1_03(rng, lop):
    y = []
    for _ in range(rng.randint(5, 8)):
        bt, gt = bieu_thuc_2_phep(rng, lop)
        y.append((bt, sv(gt)))
    return Bai(
        tieu_de="Tính giá trị biểu thức",
        dan="Tính giá trị của mỗi biểu thức.",
        y=y,
        huong_giai="Trong biểu thức không có dấu ngoặc: nhân và chia làm trước, cộng và "
                   "trừ làm sau; cùng mức thì làm từ trái sang phải. Có dấu ngoặc thì "
                   "làm trong ngoặc trước.",
        td=["TD1", "TD3"],
        diem_chot="Dấu ngoặc **đảo ngược** thứ tự ưu tiên — nhìn ngoặc trước khi tính.",
        loi="Cộng trước nhân khi biểu thức không có ngoặc.",
        phong="Gạch chân phép nhân, phép chia trước khi bắt đầu tính.",
        goi_y=("Biểu thức có dấu ngoặc không?",
               "Gạch chân các phép nhân và chia.",
               "Làm nhân chia trước, cộng trừ sau."),
        pt_dang="Tính giá trị biểu thức số",
        pt_kien_thuc="Thứ tự thực hiện các phép tính",
        pt_du_lieu="Biểu thức có nhiều phép tính, có thể có ngoặc",
        pt_phuong_phap="Xét ngoặc → nhân chia → cộng trừ, trái sang phải",
        pt_nhanh="Nếu thấy dạng a × b + a × c thì đưa ngay về a × (b + c).",
        tuong_tu=("Tính: 25 + 8 × 4", "57"),
        bay="Thiếu ngoặc mà vẫn cộng trước",
    )


@dang_ky("B-M1-04", "B", "M1", tu_khoa=("tìm x", "thành phần chưa biết"))
def b_m1_04(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        x = rng.randint(12, 90 if lop == 3 else 900)
        b = rng.randint(3, 9 if lop == 3 else 40)
        k = rng.choice(["+", "-", "*", ":"])
        if k == "+":
            y.append((f"x + {sv(b)} = {sv(x + b)}", f"x = {sv(x)}"))
        elif k == "-":
            y.append((f"x − {sv(b)} = {sv(x)}", f"x = {sv(x + b)}"))
        elif k == "*":
            y.append((f"x × {sv(b)} = {sv(x * b)}", f"x = {sv(x)}"))
        else:
            y.append((f"x : {sv(b)} = {sv(x)}", f"x = {sv(x * b)}"))
    return Bai(
        tieu_de="Tìm thành phần chưa biết của phép tính",
        dan="Tìm x.",
        y=y,
        huong_giai="Nhớ quy tắc: số hạng chưa biết = tổng − số hạng đã biết; số bị trừ = "
                   "hiệu + số trừ; thừa số chưa biết = tích : thừa số đã biết; số bị chia "
                   "= thương × số chia.",
        td=["TD1", "TD3"],
        diem_chot="x đứng ở **vị trí nào** trong phép tính quyết định quy tắc dùng.",
        loi="Áp dụng nhầm quy tắc của số trừ cho số bị trừ.",
        phong="Gọi tên x trước (x là số hạng? số bị trừ? thừa số?) rồi mới viết quy tắc.",
        goi_y=("x đóng vai trò gì trong phép tính?",
               "Viết ra quy tắc tương ứng với vai trò đó.",
               "Thay x tìm được vào đề để thử lại."),
        pt_dang="Tìm x trong phép tính một bước",
        pt_kien_thuc="Quan hệ giữa các thành phần của phép tính",
        pt_du_lieu="Có chữ x đứng trong một phép tính",
        pt_phuong_phap="Gọi tên vai trò của x rồi dùng quy tắc tương ứng",
        pt_nhanh="Thử lại bằng cách thay x vào đề — mất 3 giây nhưng chắc chắn.",
        tuong_tu=("Tìm x: x × 7 = 91", "x = 13"),
    )


@dang_ky("B-M1-05", "B", "M1", lop=(4, 5), tu_khoa=("tính nhẩm", "nhân với 10"))
def b_m1_05(rng, lop):
    y = []
    for _ in range(rng.randint(5, 8)):
        a = rng.randint(12, 9_999)
        b = rng.choice([10, 100, 1000])
        if rng.random() < 0.55:
            y.append((f"{sv(a)} × {sv(b)}", sv(a * b)))
        else:
            y.append((f"{sv(a * b)} : {sv(b)}", sv(a)))
    return Bai(
        tieu_de="Nhân, chia nhẩm với 10, 100, 1 000",
        dan="Tính nhẩm, ghi ngay kết quả.",
        y=y,
        huong_giai="Nhân một số với 10, 100, 1 000 thì viết thêm 1, 2, 3 chữ số 0 vào bên "
                   "phải số đó. Chia cho 10, 100, 1 000 thì bớt đi 1, 2, 3 chữ số 0 ở bên phải.",
        td=["TD5"],
        diem_chot="Đếm đúng **số chữ số 0** của số nhân hay số chia.",
        loi="Thêm hoặc bớt thiếu một chữ số 0.",
        phong="Đếm số chữ số 0 rồi viết chấm tương ứng trước khi ghi kết quả.",
        goi_y=("Số nhân có mấy chữ số 0?",
               "Thêm đúng bấy nhiêu chữ số 0 vào bên phải.",
               "Với phép chia thì làm ngược lại."),
        pt_dang="Nhân, chia nhẩm với số tròn chục, trăm, nghìn",
        pt_kien_thuc="Cấu tạo thập phân",
        pt_du_lieu="Thừa số hoặc số chia là 10, 100, 1 000",
        pt_phuong_phap="Thêm hoặc bớt chữ số 0",
        pt_nhanh="Nhân với 20 = nhân 2 rồi thêm một chữ số 0.",
        tuong_tu=("Tính nhẩm: 358 × 100", "35 800"),
    )


# ══════════════════════════════════ MỨC M2 ══════════════════════════════════

@dang_ky("B-M2-01", "B", "M2", tu_khoa=("tính nhanh", "giao hoán", "kết hợp"))
def b_m2_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        a = rng.randint(11, 89)
        b = 100 - a
        c = rng.randint(20, 400)
        kieu = rng.choice(["ghep_tron", "ghep_ba", "tru_don"])
        if kieu == "ghep_tron":
            y.append((f"{sv(a)} + {sv(c)} + {sv(b)}", sv(a + b + c)))
        elif kieu == "ghep_ba":
            d = rng.randint(11, 89)
            e = 100 - d
            y.append((f"{sv(a)} + {sv(d)} + {sv(b)} + {sv(e)}", sv(a + b + d + e)))
        else:
            y.append((f"{sv(c)} + {sv(a)} − {sv(a)}", sv(c)))
    return Bai(
        tieu_de="Tính nhanh bằng cách ghép số tròn",
        dan="Tính bằng cách thuận tiện nhất.",
        y=y,
        huong_giai="Dùng tính chất giao hoán và kết hợp của phép cộng để đổi chỗ, nhóm "
                   "những số cộng lại thành số tròn chục, tròn trăm rồi mới cộng phần còn lại.",
        td=["TD5", "TD3"],
        diem_chot="Tìm **cặp cộng tròn 100** trước khi cộng theo thứ tự.",
        loi="Cộng lần lượt từ trái sang phải nên bỏ lỡ cặp số tròn.",
        phong="Đọc lướt cả dãy, khoanh tròn cặp số cộng lại tròn chục, tròn trăm.",
        goi_y=("Có cặp nào cộng lại tròn 100 không?",
               "Đổi chỗ để hai số đó đứng cạnh nhau.",
               "Cộng cặp tròn trước, phần còn lại sau."),
        pt_dang="Tính nhanh tổng nhiều số hạng",
        pt_kien_thuc="Tính chất giao hoán, kết hợp của phép cộng",
        pt_du_lieu="Dãy cộng nhiều số, có cặp cộng lại tròn chục hoặc tròn trăm",
        pt_phuong_phap="Ghép cặp tròn rồi cộng",
        pt_nhanh="Quét cả dãy tìm chữ số hàng đơn vị cộng lại bằng 10.",
        tuong_tu=("Tính nhanh: 37 + 145 + 63", "245"),
    )


@dang_ky("B-M2-02", "B", "M2", lop=(4, 5), tu_khoa=("nhân một số với một tổng", "phân phối"))
def b_m2_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        a = rng.randint(12, 99)
        b = rng.randint(11, 60)
        c = rng.randint(11, 60)
        if rng.random() < 0.5:
            y.append((f"{sv(a)} × {sv(b)} + {sv(a)} × {sv(c)}", sv(a * (b + c))))
        else:
            x, z = max(b, c), min(b, c)
            y.append((f"{sv(a)} × {sv(x)} − {sv(a)} × {sv(z)}", sv(a * (x - z))))
    return Bai(
        tieu_de="Nhân một số với một tổng, một hiệu",
        dan="Tính bằng cách thuận tiện nhất.",
        y=y,
        huong_giai="Nhận ra thừa số chung rồi đặt nó ra ngoài: a × b + a × c = a × (b + c) "
                   "và a × b − a × c = a × (b − c). Sau khi đặt thừa số chung, phép tính "
                   "trong ngoặc thường ra số tròn.",
        td=["TD3", "TD5"],
        diem_chot="Thừa số chung phải xuất hiện ở **cả hai** tích thì mới đặt ra ngoài được.",
        loi="Đặt ra ngoài một số chỉ có ở một tích.",
        phong="Khoanh thừa số giống nhau ở hai tích trước khi viết dấu ngoặc.",
        goi_y=("Hai tích có thừa số nào giống nhau?",
               "Đặt thừa số đó ra ngoài dấu ngoặc.",
               "Tính trong ngoặc trước rồi nhân."),
        pt_dang="Tính nhanh nhờ thừa số chung",
        pt_kien_thuc="Nhân một số với một tổng, một hiệu",
        pt_du_lieu="Hai tích cộng hoặc trừ nhau, có chung một thừa số",
        pt_phuong_phap="Đặt thừa số chung ra ngoài rồi tính trong ngoặc",
        pt_nhanh="Sau khi đặt thừa số chung, tổng trong ngoặc thường tròn 10 hoặc 100.",
        tuong_tu=("Tính nhanh: 47 × 25 + 47 × 75", "4 700"),
    )


@dang_ky("B-M2-03", "B", "M2", lop=(4, 5), tu_khoa=("tìm x", "hai bước"))
def b_m2_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        x = rng.randint(8, 200)
        a = rng.randint(2, 12)
        b = rng.randint(10, 300)
        k = rng.choice(["ax+b", "ax-b", "(x+b)a", "(x-b)a", "b-ax"])
        if k == "ax+b":
            y.append((f"x × {sv(a)} + {sv(b)} = {sv(a * x + b)}", f"x = {sv(x)}"))
        elif k == "ax-b":
            y.append((f"x × {sv(a)} − {sv(b)} = {sv(a * x - b)}", f"x = {sv(x)}"))
        elif k == "(x+b)a":
            y.append((f"(x + {sv(b)}) × {sv(a)} = {sv((x + b) * a)}", f"x = {sv(x)}"))
        elif k == "(x-b)a":
            y.append((f"(x − {sv(b)}) × {sv(a)} = {sv((x - b) * a)}", f"x = {sv(x)}"))
        else:
            t = a * x + b
            y.append((f"{sv(t)} − x × {sv(a)} = {sv(b)}", f"x = {sv(x)}"))
    return Bai(
        tieu_de="Tìm x qua hai bước",
        dan="Tìm x, trình bày từng bước.",
        y=y,
        huong_giai="Coi cụm chứa x là một thành phần của phép tính ngoài cùng. Tìm giá "
                   "trị của cụm đó trước, sau đó mới tìm x bên trong cụm. Làm ngược lại "
                   "thứ tự thực hiện phép tính.",
        td=["TD3"],
        diem_chot="Đi **ngược** thứ tự thực hiện: phép ngoài cùng gỡ trước.",
        loi="Gỡ phép nhân trước khi gỡ phép cộng ở ngoài.",
        phong="Khoanh tròn cụm chứa x rồi coi cả cụm là một số.",
        goi_y=("Khoanh cụm chứa x lại, coi là một số.",
               "Cụm đó đóng vai trò gì trong phép tính ngoài cùng?",
               "Tìm giá trị của cụm rồi mới tìm x."),
        pt_dang="Tìm x qua hai bước",
        pt_kien_thuc="Quan hệ các thành phần phép tính, thứ tự thực hiện",
        pt_du_lieu="x nằm trong một cụm có hai phép tính",
        pt_phuong_phap="Gỡ dần từ phép ngoài cùng vào trong",
        pt_nhanh="Thay x tìm được vào đề để thử — nhanh hơn dò lại từng bước.",
        tuong_tu=("Tìm x: x × 6 + 14 = 92", "x = 13"),
    )


@dang_ky("B-M2-04", "B", "M2", lop=(4, 5), tu_khoa=("tính nhẩm", "nhân 11", "nhân 9"))
def b_m2_04(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        a = rng.randint(13, 99)
        k = rng.choice([9, 11, 19, 21, 99, 101])
        y.append((f"{sv(a)} × {sv(k)}", sv(a * k)))
    return Bai(
        tieu_de="Nhân nhẩm với số gần tròn chục, tròn trăm",
        dan="Tính nhẩm, nêu cách nhẩm.",
        y=y,
        huong_giai="Đưa thừa số về dạng tròn chục, tròn trăm cộng hoặc trừ một ít: "
                   "× 9 = × 10 − 1 lần; × 11 = × 10 + 1 lần; × 99 = × 100 − 1 lần; "
                   "× 101 = × 100 + 1 lần.",
        td=["TD5", "TD3"],
        diem_chot="Tách thừa số thành **tròn chục ± 1 đơn vị** rồi dùng nhân với một tổng, một hiệu.",
        loi="Nhân với 10 rồi quên cộng hoặc trừ phần bù.",
        phong="Viết luôn dấu ± và số bù ra bên cạnh trước khi nhân.",
        goi_y=("Thừa số kia gần số tròn nào?",
               "Viết nó thành số tròn cộng hoặc trừ mấy đơn vị.",
               "Nhân với số tròn trước rồi bù lại."),
        pt_dang="Nhân nhẩm nhờ tách thừa số",
        pt_kien_thuc="Nhân một số với một tổng, một hiệu",
        pt_du_lieu="Thừa số là 9, 11, 19, 21, 99, 101…",
        pt_phuong_phap="Tách về số tròn rồi bù trừ",
        pt_nhanh="× 11 với số có hai chữ số: viết hai chữ số ra hai đầu, tổng của chúng "
                 "đặt vào giữa (nhớ sang trái nếu tổng vượt 9).",
        tuong_tu=("Tính nhẩm: 46 × 11", "506"),
    )


@dang_ky("B-M2-05", "B", "M2", lop=(4, 5), tu_khoa=("tính nhanh", "nhân chia", "kết hợp"))
def b_m2_05(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        kieu = rng.choice(["25x4", "125x8", "50x2", "chia_lien"])
        c = rng.randint(11, 99)
        if kieu == "25x4":
            y.append((f"{sv(c)} × 25 × 4", sv(c * 100)))
        elif kieu == "125x8":
            y.append((f"{sv(c)} × 125 × 8", sv(c * 1000)))
        elif kieu == "50x2":
            y.append((f"50 × {sv(c)} × 2", sv(c * 100)))
        else:
            b = rng.choice([4, 5, 8])
            y.append((f"{sv(c * b * 10)} : {sv(b)} : 10", sv(c)))
    return Bai(
        tieu_de="Tính nhanh nhờ ghép cặp thừa số tròn",
        dan="Tính bằng cách thuận tiện nhất.",
        y=y,
        huong_giai="Trong một tích, được phép đổi chỗ và nhóm các thừa số. Ghép các cặp "
                   "cho tích tròn: 25 × 4 = 100, 125 × 8 = 1 000, 50 × 2 = 100, 20 × 5 = 100. "
                   "Chia liên tiếp cho hai số bằng chia cho tích hai số đó.",
        td=["TD5", "TD3"],
        diem_chot="Thuộc lòng bốn cặp tròn: **25 × 4**, **125 × 8**, **50 × 2**, **20 × 5**.",
        loi="Nhân lần lượt từ trái sang phải nên số trung gian rất lớn.",
        phong="Quét cả tích tìm cặp tròn trước khi đặt bút tính.",
        goi_y=("Trong tích có 25, 125, 50 hay 20 không?",
               "Tìm thừa số ghép với nó cho tích tròn.",
               "Nhân cặp tròn trước, phần còn lại sau."),
        pt_dang="Tính nhanh tích, thương nhiều bước",
        pt_kien_thuc="Tính chất giao hoán, kết hợp của phép nhân",
        pt_du_lieu="Tích có thừa số 25, 125, 50, 20; hoặc chia liên tiếp",
        pt_phuong_phap="Ghép cặp cho tích tròn rồi nhân",
        pt_nhanh="Chia liên tiếp cho 4 rồi 25 bằng chia cho 100.",
        tuong_tu=("Tính nhanh: 37 × 25 × 4", "3 700"),
    )


# ══════════════════════════════════ MỨC M3 ══════════════════════════════════

@dang_ky("B-M3-01", "B", "M3", lop=(4, 5), tu_khoa=("tính nhanh", "dãy tổng", "cách đều"))
def b_m3_01(rng, lop):
    y = []
    so_y = rng.randint(4, 6)
    for d, n in zip(luan_phien(rng, [1, 2, 3, 5], so_y),
                    luan_phien(rng, [10, 20, 25, 50, 100], so_y)):
        dau = rng.choice([1, 2, d])
        cuoi = dau + (n - 1) * d
        tong = (dau + cuoi) * n // 2
        y.append((f"{sv(dau)} + {sv(dau + d)} + {sv(dau + 2 * d)} + … + {sv(cuoi)}",
                  sv(tong)))
    return Bai(
        tieu_de="Tính nhanh tổng dãy số cách đều",
        dan="Tính tổng mỗi dãy.",
        y=y,
        huong_giai="Đếm số số hạng: (số cuối − số đầu) : khoảng cách + 1. Tổng bằng "
                   "(số đầu + số cuối) × số số hạng : 2. Cách hiểu: ghép số đầu với số "
                   "cuối, số thứ hai với số áp chót… mỗi cặp có tổng bằng nhau.",
        td=["TD4", "TD5"],
        diem_chot="Phải đếm **số số hạng** trước; đây là chỗ sai nhiều nhất.",
        loi="Lấy số cuối chia khoảng cách làm số số hạng, quên cộng 1.",
        phong="Viết ra ba số đầu và ba số cuối để kiểm tra khoảng cách rồi mới đếm.",
        goi_y=("Khoảng cách giữa hai số liên tiếp là bao nhiêu?",
               "Dãy có bao nhiêu số hạng?",
               "Tổng = (đầu + cuối) × số số hạng : 2."),
        pt_dang="Tổng dãy số cách đều",
        pt_kien_thuc="Công thức tổng dãy cách đều",
        pt_du_lieu="Dãy cộng có dấu … và các số cách đều nhau",
        pt_phuong_phap="Đếm số số hạng rồi áp công thức tổng",
        pt_nhanh="Ghép cặp đầu – cuối: mọi cặp đều có cùng tổng, chỉ cần nhân với số cặp.",
        tuong_tu=("Tính nhanh: 1 + 2 + 3 + … + 100", "5 050"),
        bay="Quên cộng 1 khi đếm số số hạng",
    )


@dang_ky("B-M3-02", "B", "M3", lop=(4, 5), tu_khoa=("so sánh", "không cần tính"))
def b_m3_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        a = rng.randint(120, 900)
        b = rng.randint(120, 900)
        k = rng.randint(2, 30)
        kieu = rng.choice(["cong_cung", "nhan_cung", "tich_gan"])
        if kieu == "cong_cung":
            A, B = a + k, b + k
            y.append((f"{sv(a)} + {sv(k)} … {sv(b)} + {sv(k)}",
                      "&lt;" if A < B else ("&gt;" if A > B else "=")))
        elif kieu == "nhan_cung":
            A, B = a * k, b * k
            y.append((f"{sv(a)} × {sv(k)} … {sv(b)} × {sv(k)}",
                      "&lt;" if A < B else ("&gt;" if A > B else "=")))
        else:
            m = rng.randint(2, 20)
            A, B = a * m, a * (m + 1)
            y.append((f"{sv(a)} × {sv(m)} … {sv(a)} × {sv(m + 1)}", "&lt;"))
    return Bai(
        tieu_de="So sánh hai biểu thức mà không cần tính",
        dan="Điền dấu &lt;, &gt;, = và giải thích ngắn.",
        y=y,
        huong_giai="Khi hai biểu thức có phần giống nhau, chỉ cần so sánh phần khác nhau: "
                   "cùng cộng thêm một số thì số nào lớn hơn vẫn lớn hơn; cùng nhân với "
                   "một số khác 0 cũng vậy.",
        td=["TD5", "TD2"],
        diem_chot="Che phần **giống nhau** đi, chỉ so phần khác nhau.",
        loi="Tính hết cả hai vế, vừa lâu vừa dễ sai.",
        phong="Dùng bút gạch bỏ phần giống nhau ở hai vế trước khi so sánh.",
        goi_y=("Hai vế có phần nào giống hệt nhau?",
               "Gạch bỏ phần giống nhau đi.",
               "So sánh phần còn lại."),
        pt_dang="So sánh biểu thức không tính giá trị",
        pt_kien_thuc="Tính chất bất đẳng thức trong phép cộng, phép nhân",
        pt_du_lieu="Hai vế có chung một số hạng hoặc một thừa số",
        pt_phuong_phap="Triệt tiêu phần chung rồi so phần riêng",
        pt_nhanh="Cùng một thừa số dương thì thừa số kia lớn hơn cho tích lớn hơn.",
        tuong_tu=("So sánh: 234 × 7 … 234 × 8", "&lt;"),
    )


@dang_ky("B-M3-03", "B", "M3", lop=(4, 5), tu_khoa=("tìm x", "nhiều bước", "ngoặc"))
def b_m3_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        x = rng.randint(6, 120)
        a = rng.randint(2, 9)
        b = rng.randint(5, 60)
        c = rng.randint(2, 9)
        kieu = rng.choice(["((x+b)a)-c", "(x*a-b)*c", "(b+x)*a+c"])
        if kieu == "((x+b)a)-c":
            y.append((f"(x + {sv(b)}) × {sv(a)} − {sv(c)} = {sv((x + b) * a - c)}",
                      f"x = {sv(x)}"))
        elif kieu == "(x*a-b)*c":
            v = x * a
            if v <= b:
                x = b // a + rng.randint(2, 20)
                v = x * a
            y.append((f"(x × {sv(a)} − {sv(b)}) × {sv(c)} = {sv((v - b) * c)}",
                      f"x = {sv(x)}"))
        else:
            y.append((f"({sv(b)} + x) × {sv(a)} + {sv(c)} = {sv((b + x) * a + c)}",
                      f"x = {sv(x)}"))
    return Bai(
        tieu_de="Tìm x qua ba bước, có dấu ngoặc",
        dan="Tìm x, trình bày đủ các bước.",
        y=y,
        huong_giai="Gỡ dần từ ngoài vào trong: xác định phép tính ngoài cùng, coi phần "
                   "còn lại là một số, tìm giá trị của nó, rồi lặp lại cho tới khi x đứng riêng.",
        td=["TD3", "TD2"],
        diem_chot="Mỗi bước chỉ gỡ **một** phép tính, đừng gỡ hai phép cùng lúc.",
        loi="Nhân phá ngoặc sai dấu, hoặc gỡ phép trong ngoặc trước.",
        phong="Ghi rõ từng bước trên một dòng riêng, mỗi dòng chỉ khác dòng trên một phép.",
        goi_y=("Phép tính ngoài cùng là phép nào?",
               "Coi cả cụm còn lại là một số và tìm giá trị của nó.",
               "Lặp lại cho tới khi chỉ còn x."),
        pt_dang="Tìm x nhiều bước có ngoặc",
        pt_kien_thuc="Thứ tự thực hiện phép tính, quan hệ thành phần",
        pt_du_lieu="x nằm trong ngoặc, ngoài ngoặc còn phép tính khác",
        pt_phuong_phap="Bóc lớp từ ngoài vào trong",
        pt_nhanh="Thay x tìm được vào đề, tính một lượt để thử lại.",
        tuong_tu=("Tìm x: (x + 12) × 5 − 8 = 132", "x = 16"),
    )


@dang_ky("B-M3-04", "B", "M3", lop=(5,), tu_khoa=("phân số", "tính nhanh"))
def b_m3_04(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        m = rng.randint(2, 9)
        n = rng.randint(2, 12)
        f1 = Fraction(m, m + n)
        f2 = Fraction(n, m + n)
        kieu = rng.choice(["bu_1", "nhan_nghich", "cong_3"])
        if kieu == "bu_1":
            y.append((f"{ps(f1)} + {ps(f2)}", "1"))
        elif kieu == "nhan_nghich":
            y.append((f"{ps(Fraction(m, n))} × {ps(Fraction(n, m))}", "1"))
        else:
            f3 = Fraction(1, m + n)
            y.append((f"{ps(f1)} + {ps(f2 - f3)} + {ps(f3)}", "1"))
    return Bai(
        tieu_de="Tính nhanh với phân số",
        dan="Tính bằng cách thuận tiện nhất.",
        y=y,
        huong_giai="Quan sát trước khi tính: các phân số cùng mẫu số cộng lại có thể "
                   "bằng đúng 1; một phân số nhân với phân số đảo ngược của nó bằng 1. "
                   "Nhận ra được thì không phải quy đồng.",
        td=["TD5", "TD3"],
        diem_chot="Nhìn xem **tổng các tử số** có bằng mẫu số chung không.",
        loi="Quy đồng ngay lập tức mà không quan sát, làm dài dòng.",
        phong="Cộng nhẩm các tử số trước rồi so với mẫu số.",
        goi_y=("Các phân số có cùng mẫu số không?",
               "Cộng thử các tử số lại.",
               "Tổng tử số có bằng mẫu số không?"),
        pt_dang="Tính nhanh biểu thức phân số",
        pt_kien_thuc="Cộng phân số cùng mẫu, phân số đảo ngược",
        pt_du_lieu="Các phân số cùng mẫu, tử số cộng lại tròn mẫu",
        pt_phuong_phap="Quan sát tổng tử số; nhận diện cặp phân số đảo ngược",
        pt_nhanh="Nếu tổng các tử số bằng mẫu số thì kết quả bằng 1, không cần tính gì thêm.",
        tuong_tu=("Tính nhanh: 3 phần 7 + 4 phần 7", "1"),
    )


# ══════════════════════════════════ MỨC M4 ══════════════════════════════════

@dang_ky("B-M4-01", "B", "M4", lop=(4, 5), tu_khoa=("tính nhanh", "thừa số 0", "tích"))
def b_m4_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(11, 99)
        b = rng.randint(11, 99)
        c = rng.randint(11, 99)
        kieu = rng.choice(["co_0", "hieu_0", "tong_tich"])
        if kieu == "co_0":
            y.append((f"{sv(a)} × {sv(b)} × ({sv(c)} − {sv(c)})", "0"))
        elif kieu == "hieu_0":
            y.append((f"({sv(a)} × {sv(b)} − {sv(b)} × {sv(a)}) × {sv(c)}", "0"))
        else:
            y.append((f"{sv(a)} × {sv(b)} + {sv(a)} × {sv(c)} − {sv(a)} × ({sv(b)} + {sv(c)})",
                      "0"))
    return Bai(
        tieu_de="Nhận ra thừa số 0 để tính tức thì",
        dan="Tính bằng cách nhanh nhất.",
        y=y,
        huong_giai="Một tích có thừa số bằng 0 thì bằng 0, dù các thừa số khác lớn đến "
                   "đâu. Vì vậy phải quan sát toàn bộ biểu thức trước khi tính, tìm cụm "
                   "nào có giá trị bằng 0.",
        td=["TD5", "TD6"],
        diem_chot="Quét tìm **cụm bằng 0** trước; thấy rồi thì viết đáp số ngay.",
        loi="Lao vào nhân từng cặp số lớn rồi mới phát hiện kết quả bằng 0.",
        phong="Đọc hết biểu thức một lượt, khoanh các cụm giống nhau bị trừ cho nhau.",
        goi_y=("Có cụm nào trong ngoặc bằng 0 không?",
               "Có hai cụm giống hệt nhau bị trừ cho nhau không?",
               "Tích có một thừa số bằng 0 thì bằng bao nhiêu?"),
        pt_dang="Tính nhanh nhờ thừa số 0",
        pt_kien_thuc="Tính chất nhân với 0, phép trừ hai số bằng nhau",
        pt_du_lieu="Trong biểu thức có ngoặc chứa hai số giống nhau trừ nhau",
        pt_phuong_phap="Quét tìm cụm bằng 0 trước khi tính",
        pt_nhanh="Nhìn dấu ngoặc trước tiên — bẫy thường nằm ở đó.",
        tuong_tu=("Tính nhanh: 1 234 × 567 × (89 − 89)", "0"),
        bay="Biểu thức lớn nhưng kết quả bằng 0",
    )


@dang_ky("B-M4-02", "B", "M4", lop=(4, 5), tu_khoa=("tính nhanh", "dãy tích", "quy luật"))
def b_m4_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        n = rng.choice([10, 20, 25, 50])
        a = rng.randint(2, 9)
        tong = sum(a * i for i in range(1, n + 1))
        y.append((f"{sv(a)} × 1 + {sv(a)} × 2 + {sv(a)} × 3 + … + {sv(a)} × {sv(n)}",
                  sv(tong)))
    return Bai(
        tieu_de="Tính nhanh tổng nhiều tích có thừa số chung",
        dan="Tính tổng mỗi biểu thức.",
        y=y,
        huong_giai="Tất cả các tích đều có chung một thừa số. Đặt thừa số chung ra ngoài, "
                   "trong ngoặc còn tổng của dãy số tự nhiên liên tiếp — dùng công thức "
                   "tổng dãy cách đều để tính.",
        td=["TD3", "TD4"],
        diem_chot="Hai kĩ thuật nối tiếp nhau: **đặt thừa số chung** rồi **tổng dãy cách đều**.",
        loi="Nhân từng tích rồi cộng dồn, rất dài và dễ sai.",
        phong="Viết lại biểu thức dưới dạng a × (1 + 2 + … + n) trước khi tính.",
        goi_y=("Các tích có thừa số nào giống nhau?",
               "Đặt thừa số đó ra ngoài dấu ngoặc.",
               "Tổng trong ngoặc là dãy số cách đều — tính bằng công thức."),
        pt_dang="Tổng các tích có thừa số chung",
        pt_kien_thuc="Nhân một số với một tổng, tổng dãy cách đều",
        pt_du_lieu="Dãy cộng gồm nhiều tích cùng một thừa số",
        pt_phuong_phap="Đặt thừa số chung → tính tổng trong ngoặc bằng công thức",
        pt_nhanh="1 + 2 + … + 100 = 5 050; nhớ vài mốc để nhân ngay.",
        tuong_tu=("Tính nhanh: 5 × 1 + 5 × 2 + … + 5 × 10", "275"),
    )


@dang_ky("B-M4-03", "B", "M4", lop=(4, 5), tu_khoa=("tìm x", "hai vế", "biểu thức"))
def b_m4_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        x = rng.randint(5, 90)
        a = rng.randint(2, 9)
        b = rng.randint(2, 9)
        while a == b:
            b = rng.randint(2, 9)
        # x × be + c = x × lon  ⇒ c = (lon − be) × x
        lon, be = max(a, b), min(a, b)
        c = (lon - be) * x
        y.append((f"x × {sv(be)} + {sv(c)} = x × {sv(lon)}", f"x = {sv(x)}"))
    return Bai(
        tieu_de="Tìm x khi x xuất hiện ở cả hai vế",
        dan="Tìm x. Gợi ý: so sánh số lần x ở hai vế.",
        y=y,
        huong_giai="Vế phải có nhiều x hơn vế trái. Bớt đi ở cả hai vế số lần x của vế "
                   "ít hơn, phần chênh lệch số lần x ở vế phải chính bằng số hạng còn lại "
                   "ở vế trái. Từ đó tìm x bằng một phép chia.",
        td=["TD3", "TD6"],
        diem_chot="Lấy **hiệu số lần x** giữa hai vế, rồi chia số đã biết cho hiệu đó.",
        loi="Chuyển vế nhưng quên đổi dấu, hoặc trừ nhầm số lần x.",
        phong="Vẽ sơ đồ đoạn thẳng: vế trái mấy đoạn x, vế phải mấy đoạn x.",
        goi_y=("Vế trái có mấy lần x? Vế phải có mấy lần x?",
               "Vế phải hơn vế trái mấy lần x?",
               "Phần hơn đó ứng với số nào đã biết?"),
        pt_dang="Tìm x xuất hiện hai vế",
        pt_kien_thuc="So sánh hai biểu thức, sơ đồ đoạn thẳng",
        pt_du_lieu="Chữ x xuất hiện ở cả hai vế của dấu bằng",
        pt_phuong_phap="Trừ bớt số lần x chung rồi đưa về phép chia",
        pt_nhanh="Vẽ sơ đồ đoạn thẳng cho mỗi vế — nhìn ra ngay phần chênh.",
        tuong_tu=("Tìm x: x × 3 + 24 = x × 5", "x = 12"),
    )


@dang_ky("B-M4-04", "B", "M4", lop=(5,), tu_khoa=("số thập phân", "tính nhanh"))
def b_m4_04(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(11, 99) / 10
        b = round(10 - a, 1)
        c = rng.randint(2, 50)
        kieu = rng.choice(["bu_10", "nhan_tron", "phan_phoi"])
        if kieu == "bu_10":
            y.append((f"{sv(a)} + {sv(c)} + {sv(b)}", sv(round(a + b + c, 2))))
        elif kieu == "nhan_tron":
            y.append((f"{sv(a)} × 4 × 25", sv(round(a * 100, 2))))
        else:
            d = rng.randint(2, 9)
            e = 10 - d
            y.append((f"{sv(a)} × {sv(d)} + {sv(a)} × {sv(e)}", sv(round(a * 10, 2))))
    return Bai(
        tieu_de="Tính nhanh với số thập phân",
        dan="Tính bằng cách thuận tiện nhất.",
        y=y,
        huong_giai="Các tính chất giao hoán, kết hợp, nhân với một tổng đúng cả với số "
                   "thập phân. Ghép cặp cộng lại tròn chục, ghép cặp nhân lại tròn trăm, "
                   "đặt thừa số chung ra ngoài.",
        td=["TD5", "TD3"],
        diem_chot="Dấu phẩy không làm thay đổi các tính chất — cách làm giống hệt số tự nhiên.",
        loi="Đặt dấu phẩy sai vị trí ở kết quả cuối.",
        phong="Ước lượng độ lớn kết quả trước, dùng nó kiểm tra vị trí dấu phẩy.",
        goi_y=("Có cặp nào cộng lại tròn chục không?",
               "Có thừa số chung ở hai tích không?",
               "Ước lượng kết quả trước để đặt đúng dấu phẩy."),
        pt_dang="Tính nhanh biểu thức số thập phân",
        pt_kien_thuc="Tính chất phép tính với số thập phân",
        pt_du_lieu="Các số thập phân cộng lại tròn chục hoặc có thừa số chung",
        pt_phuong_phap="Ghép cặp tròn, đặt thừa số chung",
        pt_nhanh="× 4 rồi × 25 là × 100 — chỉ việc dịch dấu phẩy sang phải hai chữ số.",
        tuong_tu=("Tính nhanh: 2,5 × 4 × 25", "250"),
        bay="Vị trí dấu phẩy ở kết quả",
    )


# ══════════════════════════════════ MỨC M5 ══════════════════════════════════

@dang_ky("B-M5-01", "B", "M5", lop=(5,), tu_khoa=("dãy phân số", "khử liên tiếp", "tính nhanh"))
def b_m5_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        n = rng.choice([5, 6, 8, 9, 10, 12])
        tong = Fraction(0)
        for i in range(1, n + 1):
            tong += Fraction(1, i * (i + 1))
        y.append((f"1 phần 2 + 1 phần 6 + 1 phần 12 + … + 1 phần {sv(n * (n + 1))}",
                  ps(tong)))
    return Bai(
        tieu_de="Tổng dãy phân số khử liên tiếp",
        dan="Tính tổng mỗi dãy.",
        y=y,
        huong_giai="Mỗi mẫu số là tích của hai số tự nhiên liên tiếp: 2 = 1 × 2, "
                   "6 = 2 × 3, 12 = 3 × 4… Mỗi phân số dạng 1 phần (n × (n + 1)) tách được "
                   "thành 1 phần n trừ 1 phần (n + 1). Khi cộng cả dãy, các phần giữa khử "
                   "hết nhau, chỉ còn số hạng đầu và số hạng cuối.",
        td=["TD4", "TD6"],
        diem_chot="Tách mỗi phân số thành **hiệu hai phân số** rồi để chúng khử nhau.",
        loi="Quy đồng cả dãy — mẫu số chung khổng lồ, không làm nổi.",
        phong="Viết ba số hạng đầu dưới dạng hiệu để thấy quy luật khử trước khi viết cả dãy.",
        goi_y=("Phân tích các mẫu số thành tích hai số liên tiếp.",
               "Tách 1 phần (n × (n + 1)) thành hiệu hai phân số.",
               "Viết cả dãy thành hiệu rồi xem phần nào khử nhau."),
        pt_dang="Tổng dãy phân số có mẫu là tích hai số liên tiếp",
        pt_kien_thuc="Tách phân số thành hiệu, phép trừ phân số",
        pt_du_lieu="Mẫu số là 2, 6, 12, 20, 30… (tích hai số liên tiếp)",
        pt_phuong_phap="Tách thành hiệu, khử liên tiếp, giữ lại hai đầu",
        pt_nhanh="Kết quả luôn là 1 trừ 1 phần (n + 1), tức là n phần (n + 1).",
        tuong_tu=("Tính nhanh: 1 phần 2 + 1 phần 6 + 1 phần 12", "3 phần 4"),
    )


@dang_ky("B-M5-02", "B", "M5", lop=(4, 5), tu_khoa=("tính nhanh", "so sánh", "khéo léo"))
def b_m5_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(101, 999)
        k = rng.randint(2, 40)
        kieu = rng.choice(["tich_gan", "chuyen_phan", "tach_bu"])
        if kieu == "tich_gan":
            # a × (a + 2) = a² + 2a luôn bé hơn (a + 1)² = a² + 2a + 1
            y.append((f"{sv(a)} × {sv(a + 2)} … {sv(a + 1)} × {sv(a + 1)}", "&lt;"))
        elif kieu == "chuyen_phan":
            y.append((f"({sv(a)} + {sv(k)}) × {sv(k)} − {sv(a)} × {sv(k)}", sv(k * k)))
        else:
            y.append((f"{sv(a)} × {sv(k)} − {sv(a - 1)} × {sv(k)}", sv(k)))
    return Bai(
        tieu_de="Kĩ thuật tách – bù để tính và so sánh",
        dan="Tính hoặc so sánh bằng cách khéo nhất, không tính hết.",
        y=y,
        huong_giai="Khi hai tích có các thừa số gần nhau, viết chúng theo cùng một số gốc "
                   "rồi so phần chênh lệch. Khi hai tích cùng một thừa số, hiệu của chúng "
                   "bằng thừa số chung nhân với hiệu hai thừa số kia.",
        td=["TD5", "TD6"],
        diem_chot="Đưa mọi số về **cùng một số gốc** rồi mới so hoặc trừ.",
        loi="Nhân hết ra rồi mới so sánh — số lớn, dễ sai và mất thời gian.",
        phong="Viết mỗi thừa số dưới dạng “số gốc cộng hoặc trừ mấy đơn vị”.",
        goi_y=("Hai tích có thừa số nào giống nhau không?",
               "Viết các thừa số theo cùng một số gốc.",
               "Hiệu hai tích cùng thừa số chung bằng thừa số chung nhân hiệu hai thừa số kia."),
        pt_dang="Tính, so sánh tích bằng kĩ thuật tách – bù",
        pt_kien_thuc="Nhân một số với một tổng, một hiệu",
        pt_du_lieu="Các thừa số hơn kém nhau rất ít",
        pt_phuong_phap="Quy về số gốc chung, so phần chênh",
        pt_nhanh="Với hai tích có tổng hai thừa số bằng nhau, tích nào có hai thừa số "
                 "gần nhau hơn thì lớn hơn.",
        tuong_tu=("So sánh: 99 × 101 … 100 × 100", "&lt;"),
        bay="Hai tích trông bằng nhau nhưng không bằng",
    )


@dang_ky("B-M5-03", "B", "M5", lop=(4, 5), tu_khoa=("tính nhanh", "dãy xen kẽ", "cộng trừ"))
def b_m5_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        n = rng.choice([10, 20, 50, 100])
        # 1 - 2 + 3 - 4 + ... ± n
        tong = 0
        for i in range(1, n + 1):
            tong += i if i % 2 else -i
        y.append((f"1 − 2 + 3 − 4 + 5 − 6 + … {'+' if n % 2 else '−'} {sv(n)}", sv(tong)))
    return Bai(
        tieu_de="Tổng dãy cộng trừ xen kẽ",
        dan="Tính giá trị mỗi biểu thức.",
        y=y,
        huong_giai="Ghép hai số hạng liền nhau thành từng cặp: 1 − 2 = −1, 3 − 4 = −1… "
                   "Mỗi cặp có giá trị như nhau. Đếm số cặp rồi nhân; nếu số số hạng lẻ "
                   "thì còn dư một số hạng cuối cùng phải cộng thêm.",
        td=["TD4", "TD6"],
        diem_chot="Ghép cặp từ **đầu dãy**; số số hạng lẻ thì luôn dư đúng một số hạng cuối.",
        loi="Ghép cặp nhưng quên số hạng lẻ còn thừa ở cuối.",
        phong="Đếm số số hạng trước, xác định chẵn hay lẻ rồi mới ghép cặp.",
        goi_y=("Dãy có bao nhiêu số hạng?",
               "Ghép hai số hạng liền nhau, mỗi cặp bằng bao nhiêu?",
               "Số số hạng là chẵn hay lẻ? Có số hạng nào lẻ ra không?"),
        pt_dang="Tổng dãy cộng trừ xen kẽ",
        pt_kien_thuc="Ghép cặp, tính chất kết hợp",
        pt_du_lieu="Dấu cộng và trừ xen kẽ đều đặn",
        pt_phuong_phap="Ghép cặp, đếm số cặp, xử lí phần dư",
        pt_nhanh="Dãy 1 − 2 + 3 − … với n chẵn bằng −n : 2; với n lẻ bằng (n + 1) : 2.",
        tuong_tu=("Tính nhanh: 1 − 2 + 3 − 4 + … + 9 − 10", "−5"),
        bay="Số hạng lẻ còn thừa ở cuối dãy",
    )
