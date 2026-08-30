# -*- coding: utf-8 -*-
"""Thư viện mẫu bài v2 — bổ sung riêng cho LỚP 3 ở những ô còn mỏng.

Mỗi ô (nhóm, mức) của lớp 3 cần ít nhất ba mẫu thì một phiếu mới không phải
lặp lại cùng một mẫu hai lần. Tệp này lấp những ô ấy cho nhóm B, C, E, F, H.
"""
from __future__ import annotations

from fractions import Fraction

from .khung import (Bai, TEN, TO_DOI, bo_so_tbc, dang_ky, hoa, luan_phien, ps, sv)

L3 = (3,)


# ═══════════════════════ NHÓM B — Phép tính & Tính nhanh ═══════════════════════

@dang_ky("B3-M2-11", "B", "M2", lop=L3, tu_khoa=("nhân", "chia", "một chữ số", "đặt tính"),
         dang_bai=("Nhân số có hai, ba chữ số với số có một chữ số",
                   "Chia số có hai, ba chữ số cho số có một chữ số"))
def b3_m2_11(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["nhan", "chia", "chia_du"], rng.randint(5, 8))):
        a = rng.randint(102, 999)
        b = rng.randint(2, 9)
        if kieu == "nhan":
            y.append((f"{sv(a)} × {sv(b)}", sv(a * b)))
            if k == 0:
                buoc = [f"Đặt tính: viết {sv(b)} thẳng dưới hàng đơn vị của {sv(a)}.",
                        f"Nhân {sv(b)} lần lượt với từng chữ số của {sv(a)}, từ phải sang trái.",
                        f"Kết quả: {sv(a)} × {sv(b)} = {sv(a * b)}.",
                        f"Ước lượng kiểm tra: khoảng {sv(round(a, -2))} × {sv(b)} = "
                        f"{sv(round(a, -2) * b)} — cùng độ lớn ✓",
                        f"Đáp số: **{sv(a * b)}**."]
        elif kieu == "chia":
            y.append((f"{sv(a * b)} : {sv(b)}", sv(a)))
        else:
            du = rng.randint(1, b - 1)
            y.append((f"{sv(a * b + du)} : {sv(b)}", f"{sv(a)} dư {sv(du)}"))
    return Bai(
        tieu_de="Nhân, chia với số có một chữ số",
        dan="Đặt tính rồi tính.", y=y, giai_mau=buoc,
        huong_giai="Nhân từ hàng đơn vị sang trái, nhớ sang hàng liền trước. Chia thì mỗi "
                   "lần hạ một chữ số phải viết một chữ số ở thương, kể cả chữ số 0. "
                   "Số dư luôn bé hơn số chia.",
        td=["TD1"],
        diem_chot="Mỗi lần hạ một chữ số là bắt buộc viết một chữ số ở thương.",
        loi="Quên chữ số 0 ở giữa thương nên thương thiếu chữ số.",
        phong="Đếm trước xem thương có mấy chữ số rồi mới chia.",
        goi_y=("Đặt tính thẳng hàng đơn vị.", "Nhân hoặc chia từ trái sang phải với phép chia.",
               "Thử lại bằng phép tính ngược."),
        pt_dang="Nhân, chia với số có một chữ số",
        pt_kien_thuc="Kĩ thuật đặt tính nhân, chia",
        pt_du_lieu="Số bị chia có hai hoặc ba chữ số, số chia một chữ số",
        pt_phuong_phap="Đặt tính, tính theo cột",
        pt_nhanh="Ước lượng bằng cách làm tròn để phát hiện sai về độ lớn.",
        tuong_tu=("Đặt tính rồi tính: 246 × 3", "738"),
        mo_rong="Chia mà thương có chữ số 0 ở giữa, ví dụ 618 : 3.",
        chuan_bi="Bảng nhân, bảng chia từ 2 đến 9.",
        bay="Chữ số 0 ở giữa thương")


@dang_ky("B3-M3-11", "B", "M3", lop=L3, tu_khoa=("tính giá trị biểu thức", "thứ tự", "ngoặc"),
         dang_bai=("Tính giá trị biểu thức có dấu ngoặc",))
def b3_m3_11(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["nhan_cong", "ngoac", "chia_tru"],
                                        rng.randint(5, 8))):
        a = rng.randint(12, 90)
        b = rng.randint(2, 9)
        c = rng.randint(2, 9)
        if kieu == "nhan_cong":
            y.append((f"{sv(a)} + {sv(b)} × {sv(c)}", sv(a + b * c)))
            if k == 0:
                buoc = [f"Biểu thức không có dấu ngoặc, nên làm nhân trước.",
                        f"{sv(b)} × {sv(c)} = {sv(b * c)}.",
                        f"Sau đó cộng: {sv(a)} + {sv(b * c)} = {sv(a + b * c)}.",
                        f"Đáp số: **{sv(a + b * c)}**."]
        elif kieu == "ngoac":
            y.append((f"({sv(a)} + {sv(b)}) × {sv(c)}", sv((a + b) * c)))
        else:
            y.append((f"{sv(a * b)} : {sv(b)} − {sv(c)}", sv(a - c)))
    return Bai(
        tieu_de="Tính giá trị biểu thức",
        dan="Tính giá trị của mỗi biểu thức.", y=y, giai_mau=buoc,
        huong_giai="Không có ngoặc: nhân chia trước, cộng trừ sau, cùng mức thì từ trái "
                   "sang phải. Có ngoặc: làm trong ngoặc trước.",
        td=["TD1", "TD3"],
        diem_chot="Dấu ngoặc **đảo ngược** thứ tự ưu tiên.",
        loi="Cộng trước nhân khi biểu thức không có ngoặc.",
        phong="Gạch chân phép nhân, phép chia trước khi tính.",
        goi_y=("Biểu thức có dấu ngoặc không?", "Gạch chân nhân và chia.",
               "Làm nhân chia trước, cộng trừ sau."),
        pt_dang="Tính giá trị biểu thức",
        pt_kien_thuc="Thứ tự thực hiện các phép tính",
        pt_du_lieu="Biểu thức nhiều phép tính, có thể có ngoặc",
        pt_phuong_phap="Ngoặc → nhân chia → cộng trừ",
        pt_nhanh="Nhìn dấu ngoặc trước tiên, mất một giây nhưng tránh sai cả bài.",
        tuong_tu=("Tính: 25 + 8 × 4", "57"),
        mo_rong="Thêm ngoặc vào biểu thức cho sẵn để kết quả thành một số cho trước.",
        chuan_bi="Bốn phép tính trong phạm vi 1 000.",
        bay="Thiếu ngoặc mà vẫn cộng trước")


@dang_ky("B3-M4-11", "B", "M4", lop=L3, tu_khoa=("tính nhanh", "tách số", "nhân nhẩm"),
         dang_bai=("Tính nhanh bằng cách tách số",))
def b3_m4_11(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["nhan_9", "nhan_11", "tach_tron"],
                                        rng.randint(4, 7))):
        a = rng.randint(12, 99)
        if kieu == "nhan_9":
            y.append((f"{sv(a)} × 9", sv(a * 9)))
            if k == 0:
                buoc = [f"9 = 10 − 1, nên {sv(a)} × 9 = {sv(a)} × 10 − {sv(a)}.",
                        f"{sv(a)} × 10 = {sv(a * 10)}.",
                        f"{sv(a * 10)} − {sv(a)} = {sv(a * 9)}.",
                        f"Đáp số: **{sv(a * 9)}**."]
        elif kieu == "nhan_11":
            y.append((f"{sv(a)} × 11", sv(a * 11)))
        else:
            b = rng.randint(11, 89)
            y.append((f"{sv(a)} + {sv(100 - a % 100 if a % 100 else 100)} + {sv(b)}",
                      sv(a + (100 - a % 100 if a % 100 else 100) + b)))
    return Bai(
        tieu_de="Tính nhanh bằng cách tách số",
        dan="Nêu rõ cách tách trước khi tính.", y=y, giai_mau=buoc,
        huong_giai="Đưa thừa số về số tròn chục rồi bù trừ: × 9 = × 10 rồi bớt một lần; "
                   "× 11 = × 10 rồi thêm một lần. Với phép cộng thì tìm cặp cộng lại tròn trăm.",
        td=["TD5", "TD3"],
        diem_chot="Tách về **số tròn** rồi bù — nhân với số tròn bao giờ cũng dễ hơn.",
        loi="Nhân với 10 rồi quên bù trừ phần chênh.",
        phong="Viết luôn dấu cộng hoặc trừ và số bù ra bên cạnh trước khi nhân.",
        goi_y=("Thừa số kia gần số tròn nào?", "Viết nó thành số tròn cộng hoặc trừ mấy đơn vị.",
               "Nhân với số tròn trước rồi bù lại."),
        pt_dang="Nhân nhẩm nhờ tách thừa số",
        pt_kien_thuc="Nhân một số với một tổng, một hiệu",
        pt_du_lieu="Thừa số là 9, 11, 19, 21…",
        pt_phuong_phap="Tách về số tròn rồi bù trừ",
        pt_nhanh="× 9 là × 10 rồi bớt chính số đó.",
        tuong_tu=("Tính nhanh: 46 × 9", "414"),
        mo_rong="× 99 và × 101 với số có hai chữ số.",
        chuan_bi="Nhân nhẩm với 10 và phép trừ có nhớ.")


@dang_ky("B3-M5-11", "B", "M5", lop=L3, tu_khoa=("tính nhanh", "dãy", "quy luật", "cặp"),
         dang_bai=("Tính nhanh tổng dãy số có quy luật",))
def b3_m5_11(rng, lop):
    y, buoc = [], []
    for k, n in enumerate(luan_phien(rng, [10, 20, 25, 50], rng.randint(4, 6))):
        d = rng.choice([1, 2, 5])
        cuoi = d * n
        tong = (d + cuoi) * n // 2
        y.append((f"{sv(d)} + {sv(2 * d)} + {sv(3 * d)} + … + {sv(cuoi)}", sv(tong)))
        if k == 0:
            buoc = [f"Dãy có {sv(n)} số hạng, số đầu {sv(d)}, số cuối {sv(cuoi)}.",
                    f"Ghép số đầu với số cuối: {sv(d)} + {sv(cuoi)} = {sv(d + cuoi)}.",
                    f"Ghép số thứ hai với số áp chót cũng được {sv(d + cuoi)}.",
                    f"Có {sv(n)} : 2 = {sv(n // 2)} cặp như thế.",
                    f"Tổng: {sv(d + cuoi)} × {sv(n // 2)} = {sv(tong)}.",
                    f"Đáp số: **{sv(tong)}**."]
    return Bai(
        tieu_de="Tính nhanh tổng dãy số cách đều",
        dan="Ghép cặp rồi tính.", y=y, giai_mau=buoc,
        huong_giai="Ghép số đầu với số cuối, số thứ hai với số áp chót… mỗi cặp có cùng "
                   "một tổng. Đếm số cặp rồi nhân. Số số hạng lẻ thì còn dư số ở giữa.",
        td=["TD4", "TD5"],
        diem_chot="Mọi cặp đầu – cuối đều có **cùng một tổng**.",
        loi="Cộng dồn từ đầu đến cuối, rất lâu và dễ sai.",
        phong="Viết ba cặp đầu để thấy rõ chúng bằng nhau.",
        goi_y=("Số đầu cộng số cuối bằng bao nhiêu?", "Có bao nhiêu cặp như thế?",
               "Nhân tổng một cặp với số cặp."),
        pt_dang="Tổng dãy số cách đều",
        pt_kien_thuc="Ghép cặp, tổng dãy cách đều",
        pt_du_lieu="Dãy cộng dài có dấu …",
        pt_phuong_phap="Ghép cặp đầu – cuối rồi nhân",
        pt_nhanh="1 + 2 + … + 100 = 5 050 — nhớ mốc này để kiểm tra.",
        tuong_tu=("Tính: 2 + 4 + 6 + … + 20", "110"),
        mo_rong="Dãy có số số hạng lẻ — còn một số ở giữa không ghép cặp được.",
        chuan_bi="Đếm số hạng của dãy cách đều.",
        bay="Số số hạng lẻ")


# ═══════════════════════ NHÓM C — Dãy số & Quy luật ═══════════════════════

@dang_ky("C3-M2-11", "C", "M2", lop=L3, tu_khoa=("dãy số", "điền số", "quy luật"),
         dang_bai=("Điền số còn thiếu trong dãy",))
def c3_m2_11(rng, lop):
    y, buoc = [], []
    for k in range(rng.randint(5, 8)):
        d = rng.choice([2, 3, 4, 5, 6, 10])
        dau = rng.randint(1, 30)
        ds = [dau + i * d for i in range(6)]
        vi = rng.randrange(1, 5)
        hien = [("…" if i == vi else sv(ds[i])) for i in range(6)]
        y.append((", ".join(hien), sv(ds[vi])))
        if k == 0:
            buoc = [f"Tìm hai số liền nhau đã biết: {sv(ds[0])} và {sv(ds[1])}"
                    if vi > 1 else f"Tìm hai số liền nhau đã biết ở cuối dãy.",
                    f"Khoảng cách của dãy là {sv(d)}.",
                    f"Số cần điền = số đứng trước nó cộng {sv(d)} = {sv(ds[vi])}.",
                    f"Kiểm tra: số sau nó bằng {sv(ds[vi])} + {sv(d)} = {sv(ds[vi] + d)} ✓",
                    f"Đáp số: **{sv(ds[vi])}**."]
    return Bai(
        tieu_de="Điền số còn thiếu trong dãy",
        dan="Điền số thích hợp vào chỗ chấm.", y=y, giai_mau=buoc,
        huong_giai="Tìm khoảng cách từ hai số liền nhau đã biết, rồi cộng khoảng cách ấy "
                   "vào số đứng trước chỗ trống. Kiểm tra lại bằng số đứng sau.",
        td=["TD4", "TD1"],
        diem_chot="Tìm khoảng cách ở chỗ có **hai số liền nhau** đã biết.",
        loi="Lấy hiệu hai số cách nhau một chỗ trống làm khoảng cách.",
        phong="Đánh số thứ tự vị trí rồi mới tính khoảng cách.",
        goi_y=("Tìm hai số liền nhau đã biết.", "Hiệu của chúng là khoảng cách.",
               "Cộng khoảng cách vào số đứng ngay trước chỗ trống."),
        pt_dang="Điền số hạng còn thiếu",
        pt_kien_thuc="Dãy số cách đều",
        pt_du_lieu="Dãy có ô trống ở giữa",
        pt_phuong_phap="Xác định khoảng cách từ cặp liền nhau",
        pt_nhanh="Chỗ trống nằm giữa hai số đã biết thì bằng trung bình cộng của chúng.",
        tuong_tu=("Điền số: 4, 9, …, 19, 24", "14"),
        mo_rong="Dãy có hai chỗ trống liền nhau.",
        chuan_bi="Cộng, trừ trong phạm vi 1 000.",
        bay="Hai số hai bên chỗ trống cách nhau hai khoảng")


@dang_ky("C3-M3-11", "C", "M3", lop=L3, tu_khoa=("dãy hình", "que diêm", "quy luật hình"),
         dang_bai=("Dãy hình xếp theo quy luật",))
def c3_m3_11(rng, lop):
    a = rng.randint(3, 6)
    d = rng.randint(2, 4)
    n = rng.randint(8, 20)
    y = [(f"Hình thứ 1 có {sv(a)} que diêm, mỗi hình sau hơn hình trước {sv(d)} que. "
          f"Hình thứ 2 có bao nhiêu que?", sv(a + d)),
         ("Hình thứ 3 có bao nhiêu que?", sv(a + 2 * d)),
         (f"Hình thứ {sv(n)} có bao nhiêu que?", sv(a + (n - 1) * d)),
         (f"Hình nào có đúng {sv(a + 5 * d)} que?", "hình thứ 6"),
         (f"Xếp {sv(n)} hình đầu tiên cần tất cả bao nhiêu que?",
          sv(sum(a + i * d for i in range(n))))]
    return Bai(
        tieu_de="Dãy hình xếp theo quy luật",
        dan="Vẽ ba hình đầu ra nháp rồi tìm quy luật.",
        y=y,
        giai_mau=[f"Hình 1 có {sv(a)} que; mỗi hình sau thêm {sv(d)} que.",
                  f"Từ hình 1 đến hình {sv(n)} phải thêm {sv(n)} − 1 = {sv(n - 1)} lần.",
                  f"Số que hình thứ {sv(n)}: {sv(a)} + {sv(n - 1)} × {sv(d)} = "
                  f"{sv(a + (n - 1) * d)} (que).",
                  f"Kiểm tra với hình 2: {sv(a)} + 1 × {sv(d)} = {sv(a + d)} ✓",
                  f"Đáp số: **{sv(a + (n - 1) * d)} que**."],
        huong_giai="Số que các hình lập thành dãy cách đều. Số hạng thứ n = số đầu + "
                   "(n − 1) × khoảng cách. Nhân với **(n − 1)** vì đếm khoảng, không đếm hình.",
        td=["TD4", "TD3"],
        diem_chot="Nhân với **(n − 1)** chứ không phải n.",
        loi="Nhân khoảng cách với n nên thừa đúng một khoảng.",
        phong="Kiểm chứng công thức với hình thứ 2 trước khi dùng cho hình thứ n.",
        goi_y=("Từ hình 1 đến hình thứ n phải thêm mấy lần?",
               "Mỗi lần thêm bao nhiêu que?", "Cộng vào số que hình đầu."),
        pt_dang="Quy luật hình đưa về dãy số",
        pt_kien_thuc="Dãy cách đều, số hạng thứ n",
        pt_du_lieu="Hình xếp thêm đều đặn theo thứ tự",
        pt_phuong_phap="Lập bảng ba hình đầu rồi áp công thức",
        pt_nhanh="Ba hình đầu là đủ để khẳng định quy luật cách đều.",
        tuong_tu=("Hình 1 có 3 que, mỗi hình sau hơn 2 que. Hình thứ 10 có mấy que?", "21"),
        mo_rong="Hỏi hình thứ mấy có đúng 100 que — phép chia ngược.",
        chuan_bi="Nhân, cộng trong phạm vi 1 000.",
        bay="Nhân với n thay vì (n − 1)")


@dang_ky("C3-M4-11", "C", "M4", lop=L3, tu_khoa=("đếm số", "chia hết", "khoảng"),
         dang_bai=("Đếm số thoả điều kiện trong một khoảng",))
def c3_m4_11(rng, lop):
    y, buoc = [], []
    for k, loai in enumerate(luan_phien(rng, ["chan", "le", "chia3", "chia5"],
                                        rng.randint(4, 7))):
        a = rng.randint(10, 200)
        b = a + rng.randint(30, 400)
        if loai == "chan":
            dau = a + (a % 2)
            n = (b - dau) // 2 + 1
            y.append((f"Có bao nhiêu số chẵn từ {sv(a)} đến {sv(b)}?", sv(n)))
            if k == 0:
                buoc = [f"Số chẵn đầu tiên không nhỏ hơn {sv(a)} là {sv(dau)}.",
                        f"Số chẵn cuối cùng không lớn hơn {sv(b)} là "
                        f"{sv(b - (b % 2))}.",
                        f"Các số chẵn cách nhau 2 đơn vị.",
                        f"Số lượng: ({sv(b - (b % 2))} − {sv(dau)}) : 2 + 1 = {sv(n)}.",
                        f"Đáp số: **{sv(n)} số**."]
        elif loai == "le":
            dau = a if a % 2 else a + 1
            y.append((f"Có bao nhiêu số lẻ từ {sv(a)} đến {sv(b)}?",
                      sv((b - dau) // 2 + 1 if dau <= b else 0)))
        else:
            d = 3 if loai == "chia3" else 5
            y.append((f"Có bao nhiêu số chia hết cho {sv(d)} từ {sv(a)} đến {sv(b)}?",
                      sv(b // d - (a - 1) // d)))
    return Bai(
        tieu_de="Đếm số thoả điều kiện trong một khoảng",
        dan="Đếm số lượng, không cần liệt kê.", y=y, giai_mau=buoc,
        huong_giai="Các số cần đếm lập thành dãy cách đều. Tìm đúng số đầu và số cuối "
                   "**nằm trong khoảng**, rồi dùng công thức (cuối − đầu) : khoảng cách + 1.",
        td=["TD4", "TD1"],
        diem_chot="Hai đầu khoảng **chưa chắc** thoả điều kiện.",
        loi="Lấy luôn hai đầu khoảng làm số đầu và số cuối của dãy.",
        phong="Viết ba số đầu và ba số cuối của dãy trước khi áp công thức.",
        goi_y=("Số đầu tiên trong khoảng thoả điều kiện là số nào?",
               "Số cuối cùng thoả điều kiện là số nào?",
               "Số lượng = (cuối − đầu) : khoảng cách + 1."),
        pt_dang="Đếm số hạng dãy cách đều theo điều kiện",
        pt_kien_thuc="Dãy cách đều, dấu hiệu chia hết",
        pt_du_lieu="“Có bao nhiêu số … từ … đến …”",
        pt_phuong_phap="Tìm hai đầu hợp lệ rồi đếm",
        pt_nhanh="Số các số chia hết cho d từ 1 đến n bằng phần nguyên của n : d.",
        tuong_tu=("Có bao nhiêu số chẵn từ 10 đến 40?", "16"),
        mo_rong="Đếm số vừa chẵn vừa chia hết cho 3.",
        chuan_bi="Dấu hiệu chia hết và phép chia có dư.",
        bay="Hai đầu khoảng chưa chắc thoả điều kiện")


@dang_ky("C3-M5-11", "C", "M5", lop=L3, tu_khoa=("dãy số", "tổng dãy", "quy luật nâng cao"),
         dang_bai=("Tổng dãy số có quy luật — nâng cao",))
def c3_m5_11(rng, lop):
    a = rng.randint(1, 4)
    ds = [a]
    for i in range(1, 10):
        ds.append(ds[-1] + i)
    y = [("Viết năm số hạng đầu của dãy.", " · ".join(sv(x) for x in ds[:5])),
         ("Hiệu giữa hai số hạng liên tiếp là những số nào?", "1, 2, 3, 4, 5, …"),
         ("Số hạng thứ 6 là số nào?", sv(ds[5])),
         ("Số hạng thứ 8 là số nào?", sv(ds[7])),
         ("Số hạng thứ 10 là số nào?", sv(ds[9])),
         ("Tổng năm số hạng đầu bằng bao nhiêu?", sv(sum(ds[:5])))]
    return Bai(
        tieu_de="Dãy số có hiệu tăng đều",
        dan=f"Dãy bắt đầu bằng {sv(a)}; hiệu giữa hai số hạng liên tiếp lần lượt là "
            f"1, 2, 3, 4, …",
        y=y,
        giai_mau=[f"Số hạng đầu là {sv(a)}.",
                  f"Số hạng thứ 2 = {sv(a)} + 1 = {sv(ds[1])}.",
                  f"Số hạng thứ 3 = {sv(ds[1])} + 2 = {sv(ds[2])}.",
                  f"Cứ thế, số hạng thứ 6 = {sv(ds[4])} + 5 = {sv(ds[5])}.",
                  f"Nhận xét: số hạng thứ n = {sv(a)} + (1 + 2 + … + (n − 1)).",
                  f"Đáp số ý c: **{sv(ds[5])}**."],
        huong_giai="Khi hiệu không đều, hãy viết dãy các hiệu xuống dưới. Nếu dãy hiệu lại "
                   "cách đều thì cộng dần từng hiệu là ra số hạng cần tìm.",
        td=["TD4", "TD6"],
        diem_chot="Viết **dãy hiệu** xuống dưới dãy gốc là bước bắt buộc.",
        loi="Không tìm ra hiệu đều thì bỏ cuộc, không thử dãy hiệu.",
        phong="Luôn viết dãy hiệu trước khi kết luận không có quy luật.",
        goi_y=("Lấy số sau trừ số trước, viết thành một dãy mới.",
               "Dãy hiệu ấy có quy luật gì?",
               "Cộng dần các hiệu vào số hạng đầu."),
        pt_dang="Dãy có hiệu tăng đều",
        pt_kien_thuc="Dãy hiệu, tổng dãy cách đều",
        pt_du_lieu="Hiệu giữa các số hạng tăng đều đặn",
        pt_phuong_phap="Lập dãy hiệu rồi cộng dần",
        pt_nhanh="Số hạng thứ n = số đầu + (n − 1) × n : 2 khi hiệu là 1, 2, 3…",
        tuong_tu=("Dãy 1, 2, 4, 7, 11, … số hạng thứ 7 là số nào?", "22"),
        mo_rong="Hiệu là dãy 2, 4, 6, 8 — số hạng thứ n bằng bao nhiêu?",
        chuan_bi="Dãy cách đều và tổng dãy số tự nhiên liên tiếp.")


# ═══════════════════════ NHÓM E, F, H — lớp 3 ═══════════════════════

@dang_ky("E3-M5-11", "E", "M5", lop=L3, tu_khoa=("thời gian", "lịch trình", "thực tế"),
         dang_bai=("Bài toán thời gian trong sinh hoạt hằng ngày",), thuc_te=True)
def e3_m5_11(rng, lop):
    g = rng.randint(6, 10)
    m = rng.choice([0, 10, 15, 20, 30, 45])
    hoc = rng.choice([35, 40, 45])
    nghi = rng.choice([5, 10, 15])
    n = rng.randint(2, 5)
    bd = g * 60 + m
    kt = bd + n * hoc + (n - 1) * nghi
    y = [(f"Buổi học bắt đầu lúc {sv(g)} giờ {sv(m)} phút. Mỗi tiết {sv(hoc)} phút, "
          f"nghỉ giữa hai tiết {sv(nghi)} phút. Học {sv(n)} tiết thì tan lúc mấy giờ?",
          f"{sv(kt // 60)} giờ {sv(kt % 60)} phút"),
         (f"Tổng thời gian học {sv(n)} tiết là bao nhiêu phút?", sv(n * hoc) + " phút"),
         (f"Tổng thời gian nghỉ giữa các tiết là bao nhiêu phút?",
          sv((n - 1) * nghi) + " phút"),
         (f"Cả buổi kéo dài bao nhiêu phút?", sv(n * hoc + (n - 1) * nghi) + " phút"),
         (f"Cả buổi kéo dài mấy giờ mấy phút?",
          f"{sv((n * hoc + (n - 1) * nghi) // 60)} giờ "
          f"{sv((n * hoc + (n - 1) * nghi) % 60)} phút"),
         (f"Có {sv(n)} tiết thì có mấy lần nghỉ giữa tiết?", sv(n - 1) + " lần")]
    return Bai(
        tieu_de="Thời gian biểu một buổi học",
        dan="Đổi hết về phút rồi tính, cuối cùng mới đổi lại giờ và phút.",
        y=y,
        giai_mau=[f"Bước 1 — thời gian học: {sv(hoc)} × {sv(n)} = {sv(n * hoc)} (phút).",
                  f"Bước 2 — số lần nghỉ ít hơn số tiết 1: {sv(n)} − 1 = {sv(n - 1)} (lần).",
                  f"Bước 3 — thời gian nghỉ: {sv(nghi)} × {sv(n - 1)} = "
                  f"{sv((n - 1) * nghi)} (phút).",
                  f"Bước 4 — cả buổi: {sv(n * hoc)} + {sv((n - 1) * nghi)} = "
                  f"{sv(n * hoc + (n - 1) * nghi)} (phút).",
                  f"Bước 5 — giờ tan học: {sv(g)} giờ {sv(m)} phút cộng "
                  f"{sv(n * hoc + (n - 1) * nghi)} phút = {sv(kt // 60)} giờ "
                  f"{sv(kt % 60)} phút.",
                  f"Đáp số: **{sv(kt // 60)} giờ {sv(kt % 60)} phút**."],
        huong_giai="Số lần nghỉ **ít hơn số tiết đúng 1** — giống hệt bài trồng cây. "
                   "Đổi hết về phút, cộng lại, rồi chia 60 lấy thương và số dư.",
        td=["TD3", "TD6"],
        diem_chot="Số lần nghỉ = số tiết − 1, không phải bằng số tiết.",
        loi="Nhân số lần nghỉ bằng số tiết nên thừa một lần nghỉ.",
        phong="Vẽ một hàng: tiết – nghỉ – tiết – nghỉ – tiết, rồi đếm.",
        goi_y=("Học mấy tiết thì có mấy lần nghỉ giữa tiết?",
               "Đổi tất cả về phút rồi cộng.",
               "Chia tổng số phút cho 60 để đổi lại giờ và phút."),
        pt_dang="Thời gian biểu, cộng thời gian",
        pt_kien_thuc="Quan hệ giờ – phút; quan hệ số khoảng – số điểm",
        pt_du_lieu="Có nhiều tiết học và thời gian nghỉ giữa các tiết",
        pt_phuong_phap="Quy về phút, đếm số lần nghỉ, cộng rồi đổi lại",
        pt_nhanh="Bài này chính là bài trồng cây đội lốt thời gian.",
        tuong_tu=("Học 3 tiết, mỗi tiết 40 phút, nghỉ 10 phút. Cả buổi mấy phút?",
                  "140 phút"),
        mo_rong="Thêm giờ ra chơi dài giữa buổi.",
        chuan_bi="Quan hệ giờ – phút và bài toán trồng cây.",
        bay="Số lần nghỉ ít hơn số tiết")


@dang_ky("F3-M4-11", "F", "M4", lop=L3, tu_khoa=("chu vi", "diện tích", "tìm cạnh", "lời văn"),
         dang_bai=("Tìm kích thước khi biết chu vi hoặc diện tích",), thuc_te=True)
def f3_m4_11(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["tim_rong", "tim_canh", "so_sanh"],
                                        rng.randint(4, 7))):
        a = rng.randint(6, 40)
        b = rng.randint(2, a - 1)
        if kieu == "tim_rong":
            y.append((f"Hình chữ nhật có chu vi {sv((a + b) * 2)} cm, chiều dài {sv(a)} cm. "
                      f"Tính chiều rộng.", sv(b) + " cm"))
            if k == 0:
                buoc = [f"Bước 1 — nửa chu vi: {sv((a + b) * 2)} : 2 = {sv(a + b)} (cm).",
                        f"Nửa chu vi chính là tổng chiều dài và chiều rộng.",
                        f"Bước 2 — chiều rộng: {sv(a + b)} − {sv(a)} = {sv(b)} (cm).",
                        f"Thử lại: ({sv(a)} + {sv(b)}) × 2 = {sv((a + b) * 2)} ✓",
                        f"Đáp số: **{sv(b)} cm**."]
        elif kieu == "tim_canh":
            y.append((f"Hình vuông có chu vi {sv(a * 4)} cm. Tính cạnh và diện tích.",
                      f"cạnh {sv(a)} cm, diện tích {sv(a * a)} cm²"))
        else:
            y.append((f"Hình vuông cạnh {sv(b)} cm và hình chữ nhật {sv(a)} cm × "
                      f"{sv(b)} cm. Hình nào có diện tích lớn hơn?",
                      "hình chữ nhật" if a > b else ("hình vuông" if b > a else "bằng nhau")))
    return Bai(
        tieu_de="Tìm kích thước từ chu vi, diện tích",
        dan="Làm ngược lại công thức.", y=y, giai_mau=buoc,
        huong_giai="Từ chu vi hình chữ nhật, chia đôi được **nửa chu vi** — chính là tổng "
                   "chiều dài và chiều rộng — rồi trừ chiều đã biết. Từ chu vi hình vuông, "
                   "chia 4 được cạnh.",
        td=["TD3", "TD2"],
        diem_chot="Chia chu vi cho **2** ra nửa chu vi — bước trung gian không được bỏ.",
        loi="Trừ thẳng chiều dài khỏi chu vi mà chưa chia đôi.",
        phong="Viết dòng “Nửa chu vi = …” trước khi trừ.",
        goi_y=("Nửa chu vi bằng bao nhiêu?", "Nửa chu vi là tổng của hai chiều nào?",
               "Trừ đi chiều đã biết."),
        pt_dang="Tìm kích thước từ chu vi, diện tích",
        pt_kien_thuc="Công thức chu vi, diện tích; phép tính ngược",
        pt_du_lieu="Cho chu vi hoặc diện tích và một kích thước",
        pt_phuong_phap="Đi ngược công thức qua bước nửa chu vi",
        pt_nhanh="Nửa chu vi = chu vi : 2 — luôn tính bước này đầu tiên.",
        tuong_tu=("Hình chữ nhật chu vi 30 cm, dài 10 cm. Chiều rộng bằng bao nhiêu?",
                  "5 cm"),
        mo_rong="Cho chu vi và biết chiều dài gấp đôi chiều rộng.",
        chuan_bi="Công thức chu vi, diện tích hình chữ nhật và hình vuông.",
        bay="Quên chia đôi chu vi")


@dang_ky("F3-M5-11", "F", "M5", lop=L3, tu_khoa=("đếm hình", "tam giác", "đoạn thẳng"),
         dang_bai=("Đếm hình tam giác và đoạn thẳng",))
def f3_m5_11(rng, lop):
    m = rng.randint(3, 6)
    n = rng.randint(2, 5)
    y = [(f"Trên một đường thẳng lấy {sv(m)} điểm. Có bao nhiêu đoạn thẳng?",
          sv(m * (m - 1) // 2)),
         (f"Nếu lấy thêm một điểm nữa thì có thêm bao nhiêu đoạn thẳng?", sv(m)),
         (f"Với {sv(m + 1)} điểm thì có tất cả bao nhiêu đoạn thẳng?",
          sv((m + 1) * m // 2)),
         (f"Từ một đỉnh của tam giác lớn kẻ {sv(n)} đoạn thẳng tới cạnh đối diện. "
          f"Cạnh đối diện bị chia thành mấy phần?", sv(n + 1)),
         (f"Có tất cả bao nhiêu tam giác trong hình đó?",
          sv((n + 2) * (n + 1) // 2)),
         (f"Trong đó có bao nhiêu tam giác nhỏ nhất?", sv(n + 1))]
    return Bai(
        tieu_de="Đếm đoạn thẳng và tam giác",
        dan="Đếm có hệ thống, nêu rõ cách đếm.",
        y=y,
        giai_mau=[f"Mỗi đoạn thẳng được xác định bởi **hai điểm**.",
                  f"Mỗi điểm nối được với {sv(m - 1)} điểm còn lại, tổng {sv(m)} × "
                  f"{sv(m - 1)} = {sv(m * (m - 1))} lượt.",
                  f"Mỗi đoạn bị đếm hai lần (một lần từ mỗi đầu), nên chia 2.",
                  f"Số đoạn thẳng: {sv(m * (m - 1))} : 2 = {sv(m * (m - 1) // 2)}.",
                  f"Kiểm tra với 3 điểm: 3 × 2 : 2 = 3 đoạn ✓",
                  f"Đáp số: **{sv(m * (m - 1) // 2)} đoạn thẳng**."],
        huong_giai="Mọi bài đếm ở đây quy về **chọn hai điểm**. Số cách chọn 2 trong k "
                   "điểm là k × (k − 1) : 2. Chia 2 vì mỗi cặp bị đếm hai lần.",
        td=["TD4", "TD3"],
        diem_chot="Chia 2 vì mỗi cặp được đếm **hai lần**.",
        loi="Chỉ đếm các đoạn nhỏ nhất, quên các đoạn ghép.",
        phong="Đặt tên các điểm rồi liệt kê từng cặp theo thứ tự.",
        goi_y=("Một đoạn thẳng được xác định bởi mấy điểm?",
               "Mỗi điểm nối được với bao nhiêu điểm còn lại?",
               "Nhân rồi chia 2."),
        pt_dang="Đếm hình bằng quy tắc chọn hai điểm",
        pt_kien_thuc="Đếm cặp",
        pt_du_lieu="Nhiều điểm trên một đường, hoặc nhiều đoạn kẻ từ một đỉnh",
        pt_phuong_phap="Quy về số cách chọn hai điểm",
        pt_nhanh="Số cách chọn 2 trong k là k × (k − 1) : 2 — thuộc là xong.",
        tuong_tu=("Trên một đường thẳng có 5 điểm. Có bao nhiêu đoạn thẳng?", "10"),
        mo_rong="Điểm không thẳng hàng — đếm số tam giác tạo thành.",
        chuan_bi="Nhân, chia và thói quen liệt kê có thứ tự.",
        bay="Bỏ sót đoạn ghép")


@dang_ky("H3-M1-11", "H", "M1", lop=L3, tu_khoa=("một phần mấy", "nhận biết phân số"),
         dang_bai=("Nhận biết một phần mấy của một hình",))
def h3_m1_11(rng, lop):
    y = []
    for mau in luan_phien(rng, [2, 3, 4, 5, 6, 8], rng.randint(5, 8)):
        n = mau * rng.randint(2, 15)
        y.append((f"Tìm {ps(Fraction(1, mau))} của {sv(n)}.", sv(n // mau)))
    return Bai(
        tieu_de="Tìm một phần mấy của một số",
        dan="Tính rồi ghi kết quả.",
        y=y,
        giai_mau=[f"Muốn tìm một phần mấy của một số, ta **chia** số đó cho mẫu số.",
                  f"Ví dụ tìm một phần tư của 20: 20 : 4 = 5.",
                  f"Kết quả luôn **bé hơn** số ban đầu — dùng để tự kiểm tra.",
                  f"Đáp số ý a: xem phép chia tương ứng."],
        huong_giai="Chia số đã cho cho mẫu số. Chia hình thành mấy phần bằng nhau thì "
                   "lấy một phần trong số đó.",
        td=["TD1"],
        diem_chot="Một phần mấy thì **chia**, không nhân.",
        loi="Nhân thay vì chia.",
        phong="Kiểm tra: kết quả phải bé hơn số ban đầu.",
        goi_y=("Chia số đó thành mấy phần bằng nhau?", "Lấy mấy phần?",
               "Vậy phải làm phép tính gì?"),
        pt_dang="Tìm một phần mấy của một số",
        pt_kien_thuc="Phân số dạng một phần mấy",
        pt_du_lieu="Cụm “một phần mấy của …”",
        pt_phuong_phap="Chia số đó cho mẫu số",
        pt_nhanh="Kết quả luôn nhỏ hơn số ban đầu.",
        tuong_tu=("Tìm 1 phần 4 của 20.", "5"),
        mo_rong="Tìm hai phần ba của một số — chia rồi nhân.",
        chuan_bi="Bảng chia từ 2 đến 9.",
        bay="Chia chứ không nhân")


@dang_ky("H3-M3-11", "H", "M3", lop=L3, tu_khoa=("bảng số liệu", "thống kê", "đọc bảng"),
         dang_bai=("Đọc bảng số liệu đơn giản",))
def h3_m3_11(rng, lop):
    ngay = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"]
    sl = [rng.randint(5, 40) for _ in ngay]
    tong = sum(sl)
    lon = ngay[sl.index(max(sl))]
    be = ngay[sl.index(min(sl))]
    ds, tb = bo_so_tbc(rng, 5, 8, 30)
    bang = " · ".join(f"{n}: {sv(v)}" for n, v in zip(ngay, sl))
    y = [("Cả tuần cửa hàng bán được bao nhiêu quyển vở?", sv(tong)),
         ("Ngày nào bán được nhiều nhất?", f"{lon} ({sv(max(sl))} quyển)"),
         ("Ngày nào bán được ít nhất?", f"{be} ({sv(min(sl))} quyển)"),
         ("Ngày nhiều nhất hơn ngày ít nhất bao nhiêu quyển?", sv(max(sl) - min(sl))),
         ("Hai ngày đầu tuần bán được bao nhiêu quyển?", sv(sl[0] + sl[1])),
         (f"Tuần sau bán được {', '.join(sv(x) for x in ds)} quyển. Trung bình mỗi ngày "
          f"bán được bao nhiêu quyển?", sv(tb))]
    return Bai(
        tieu_de="Đọc bảng số liệu",
        dan=f"Bảng số vở bán được trong tuần: **{bang}**.",
        y=y,
        giai_mau=[f"Ghi lại các số liệu ra một hàng: {', '.join(sv(x) for x in sl)}.",
                  f"Cộng tất cả: {' + '.join(sv(x) for x in sl)} = {sv(tong)}.",
                  f"So sánh để tìm số lớn nhất {sv(max(sl))} và số bé nhất {sv(min(sl))}.",
                  f"Hiệu: {sv(max(sl))} − {sv(min(sl))} = {sv(max(sl) - min(sl))}.",
                  f"Đáp số ý a: **{sv(tong)} quyển**."],
        huong_giai="Đọc bảng theo cột, ghi lại từng số liệu. Tổng là cộng tất cả; nhiều "
                   "nhất, ít nhất là so sánh; trung bình cộng là tổng chia số ngày.",
        td=["TD1", "TD2"],
        diem_chot="Đọc **đúng cột** — mỗi số gắn với đúng một ngày.",
        loi="Đọc lệch cột nên gán nhầm số cho ngày khác.",
        phong="Dùng ngón tay dò theo cột khi đọc bảng.",
        goi_y=("Ghi lại các số liệu ra một hàng.", "Cộng tất cả để có tổng.",
               "So sánh để tìm lớn nhất và bé nhất."),
        pt_dang="Đọc bảng số liệu",
        pt_kien_thuc="Thống kê đơn giản, trung bình cộng",
        pt_du_lieu="Đề cho bảng số liệu kèm nhiều câu hỏi",
        pt_phuong_phap="Ghi lại số liệu rồi trả lời từng câu",
        pt_nhanh="Tính tổng một lần rồi dùng lại cho các câu sau.",
        tuong_tu=("Ba ngày bán 5, 8, 11 quyển. Trung bình mỗi ngày mấy quyển?", "8 quyển"),
        mo_rong="Vẽ biểu đồ cột từ bảng số liệu ấy.",
        chuan_bi="Cộng nhiều số và so sánh số tự nhiên.")


@dang_ky("H3-M4-11", "H", "M4", lop=L3, tu_khoa=("một phần mấy", "so sánh", "tìm số"),
         dang_bai=("So sánh và tìm số qua quan hệ một phần mấy",))
def h3_m4_11(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["tim_so", "so_sanh", "phan_con_lai"],
                                        rng.randint(4, 7))):
        mau = rng.choice([2, 3, 4, 5])
        phan = rng.randint(4, 30)
        so = phan * mau
        if kieu == "tim_so":
            y.append((f"Biết {ps(Fraction(1, mau))} của một số là {sv(phan)}. Tìm số đó.",
                      sv(so)))
            if k == 0:
                buoc = [f"Số đó được chia thành {sv(mau)} phần bằng nhau.",
                        f"Mỗi phần bằng {sv(phan)}.",
                        f"Cả số gồm {sv(mau)} phần: {sv(phan)} × {sv(mau)} = {sv(so)}.",
                        f"Thử lại: {sv(so)} : {sv(mau)} = {sv(phan)} ✓",
                        f"Đáp số: **{sv(so)}**."]
        elif kieu == "so_sanh":
            y.append((f"Số {sv(phan)} bằng một phần mấy số {sv(so)}?", ps(Fraction(1, mau))))
        else:
            y.append((f"Có {sv(so)} quyển vở, đã dùng {ps(Fraction(1, mau))} số vở. "
                      f"Còn lại bao nhiêu quyển?", sv(so - phan) + " quyển"))
    return Bai(
        tieu_de="Tìm số khi biết một phần mấy của nó",
        dan="Làm ngược lại phép chia.", y=y, giai_mau=buoc,
        huong_giai="Biết một phần thì **nhân** với mẫu số để ra cả số; biết cả số thì "
                   "**chia** để ra một phần. Bài hỏi phần còn lại thì phải trừ ở bước cuối.",
        td=["TD3", "TD2"],
        diem_chot="Biết một phần thì nhân; biết cả số thì chia.",
        loi="Chia thay vì nhân khi đã biết giá trị một phần.",
        phong="Kiểm tra: số tìm được phải **lớn hơn** số đã cho.",
        goi_y=("Số đó chia thành mấy phần bằng nhau?", "Mỗi phần bằng bao nhiêu?",
               "Cả số gồm mấy phần như thế?"),
        pt_dang="Tìm số khi biết một phần mấy",
        pt_kien_thuc="Quan hệ ngược của phép chia",
        pt_du_lieu="“Một phần mấy của một số là …”",
        pt_phuong_phap="Nhân giá trị một phần với mẫu số",
        pt_nhanh="Kết quả phải lớn hơn số đã cho — loại đáp số sai ngay.",
        tuong_tu=("1 phần 3 của một số là 7. Tìm số đó.", "21"),
        mo_rong="Biết hai phần ba của một số là 18 — tìm số đó.",
        chuan_bi="Bảng nhân, bảng chia và khái niệm một phần mấy.",
        bay="Nhân chứ không chia")


@dang_ky("H3-M5-11", "H", "M5", lop=L3, tu_khoa=("một phần mấy", "nhiều bước", "tổng hợp"),
         dang_bai=("Bài toán một phần mấy qua nhiều bước",), thuc_te=True)
def h3_m5_11(rng, lop):
    m = rng.choice([2, 3, 4])
    n = rng.choice([2, 3])
    tong = m * n * rng.randint(3, 20)
    b1 = tong // m
    con1 = tong - b1
    b2 = con1 // n
    con2 = con1 - b2
    y = [(f"Có {sv(tong)} quyển vở. Ngày đầu phát {ps(Fraction(1, m))} số vở. "
          f"Ngày đầu phát bao nhiêu quyển?", sv(b1) + " quyển"),
         ("Sau ngày đầu còn lại bao nhiêu quyển?", sv(con1) + " quyển"),
         (f"Ngày thứ hai phát {ps(Fraction(1, n))} **số vở còn lại**. "
          f"Ngày thứ hai phát bao nhiêu quyển?", sv(b2) + " quyển"),
         ("Sau hai ngày còn lại bao nhiêu quyển?", sv(con2) + " quyển"),
         ("Cả hai ngày phát tất cả bao nhiêu quyển?", sv(b1 + b2) + " quyển"),
         (f"Nếu ngày thứ hai cũng phát {ps(Fraction(1, n))} của **tổng ban đầu** thì phát "
          f"bao nhiêu quyển?", sv(tong // n) + " quyển")]
    return Bai(
        tieu_de="Một phần mấy qua hai bước — chú ý “số còn lại”",
        dan="Đọc kĩ: phân số ở bước hai tính trên số nào?",
        y=y,
        giai_mau=[f"Bước 1 — ngày đầu phát: {sv(tong)} : {sv(m)} = {sv(b1)} (quyển).",
                  f"Bước 2 — còn lại: {sv(tong)} − {sv(b1)} = {sv(con1)} (quyển).",
                  f"Bước 3 — ngày thứ hai tính trên **số còn lại**: "
                  f"{sv(con1)} : {sv(n)} = {sv(b2)} (quyển).",
                  f"Bước 4 — sau hai ngày còn: {sv(con1)} − {sv(b2)} = {sv(con2)} (quyển).",
                  f"So sánh: nếu tính trên tổng ban đầu thì được {sv(tong // n)} quyển — "
                  f"khác hẳn.",
                  f"Đáp số ý c: **{sv(b2)} quyển**."],
        huong_giai="Cụm “số còn lại” đổi hẳn số bị chia ở bước hai. Sau mỗi bước phải ghi "
                   "rõ “còn lại … quyển” rồi mới sang bước sau.",
        td=["TD6", "TD2"],
        diem_chot="Phân số của bước hai tính trên **số còn lại**, không phải tổng ban đầu.",
        loi="Lấy cả hai phân số tính trên tổng ban đầu.",
        phong="Viết một dòng “còn lại … quyển” sau mỗi bước.",
        goi_y=("Ngày đầu phát bao nhiêu quyển?", "Sau ngày đầu còn lại bao nhiêu?",
               "Ngày thứ hai lấy một phần mấy của số nào?"),
        pt_dang="Tìm phân số của một số qua nhiều bước",
        pt_kien_thuc="Phân số một phần mấy, phép trừ liên tiếp",
        pt_du_lieu="Cụm “… số còn lại”",
        pt_phuong_phap="Tính tuần tự, ghi lại số còn lại sau mỗi bước",
        pt_nhanh="Lấy đi 1 phần m thì còn (m − 1) phần m — nhân trực tiếp cho nhanh.",
        tuong_tu=("Có 24 quyển vở, phát 1 phần 2, rồi phát 1 phần 3 số còn lại. Còn mấy quyển?",
                  "8 quyển"),
        mo_rong="Thêm ngày thứ ba, cũng tính trên số còn lại.",
        chuan_bi="Tìm một phần mấy của một số và phép trừ.",
        bay="Phân số của số còn lại")
