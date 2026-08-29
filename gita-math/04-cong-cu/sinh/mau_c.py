# -*- coding: utf-8 -*-
"""Thư viện mẫu bài — NHÓM C: Dãy số & Quy luật."""
from __future__ import annotations

from .khung import Bai, dang_ky, luan_phien, sv


def day_cach_deu(rng, lop):
    dau = rng.randint(1, 40)
    d = rng.choice([2, 3, 4, 5, 6, 7, 9, 10, 11, 15, 25])
    n = rng.randint(8, 60 if lop > 3 else 25)
    return dau, d, n


def so_hang(dau, d, i):
    """Số hạng thứ i (i tính từ 1) của dãy cách đều."""
    return dau + (i - 1) * d


# ══════════════════════════════════ MỨC M1 ══════════════════════════════════

@dang_ky("C-M1-01", "C", "M1", tu_khoa=("dãy số", "quy luật", "viết tiếp"))
def c_m1_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        dau, d, _ = day_cach_deu(rng, lop)
        cho = [so_hang(dau, d, i) for i in range(1, 5)]
        tiep = [so_hang(dau, d, i) for i in range(5, 8)]
        y.append((f"{', '.join(sv(x) for x in cho)}, …",
                  ", ".join(sv(x) for x in tiep)))
    return Bai(
        tieu_de="Viết tiếp ba số hạng của dãy",
        dan="Tìm quy luật rồi viết tiếp ba số hạng của mỗi dãy.",
        y=y,
        huong_giai="Lấy số hạng sau trừ số hạng liền trước để tìm khoảng cách. Nếu các "
                   "hiệu bằng nhau thì đó là dãy cách đều; cứ cộng thêm khoảng cách để "
                   "viết tiếp.",
        td=["TD4"],
        diem_chot="Kiểm tra hiệu ở **ít nhất ba cặp** liên tiếp trước khi kết luận quy luật.",
        loi="Chỉ xét hai số đầu rồi vội kết luận.",
        phong="Viết hiệu giữa các số hạng ngay dưới dấu ngoặc giữa chúng.",
        goi_y=("Lấy số thứ hai trừ số thứ nhất.",
               "Lấy số thứ ba trừ số thứ hai — có bằng không?",
               "Bằng nhau thì cộng tiếp khoảng cách đó."),
        pt_dang="Tìm quy luật dãy cách đều",
        pt_kien_thuc="Dãy số cách đều",
        pt_du_lieu="Dãy số kèm dấu … ở cuối",
        pt_phuong_phap="Tính hiệu các cặp liên tiếp rồi cộng tiếp",
        pt_nhanh="Ghi khoảng cách vào giữa các số hạng để nhìn ra quy luật ngay.",
        tuong_tu=("Viết tiếp ba số: 2, 5, 8, 11, …", "14, 17, 20"),
    )


@dang_ky("C-M1-02", "C", "M1", tu_khoa=("dãy số", "điền số còn thiếu"))
def c_m1_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        dau, d, _ = day_cach_deu(rng, lop)
        ds = [so_hang(dau, d, i) for i in range(1, 7)]
        vi = rng.randrange(1, 5)
        hien = [("…" if i == vi else sv(ds[i])) for i in range(6)]
        y.append((", ".join(hien), sv(ds[vi])))
    return Bai(
        tieu_de="Điền số còn thiếu trong dãy",
        dan="Điền số thích hợp vào chỗ chấm.",
        y=y,
        huong_giai="Tìm khoảng cách của dãy từ những cặp số đã biết đứng cạnh nhau, rồi "
                   "lấy số đứng trước chỗ trống cộng thêm khoảng cách đó.",
        td=["TD4", "TD1"],
        diem_chot="Tìm khoảng cách ở **chỗ có hai số liền nhau đã biết**.",
        loi="Lấy hiệu của hai số cách nhau một chỗ trống làm khoảng cách.",
        phong="Đánh số thứ tự vị trí rồi mới tính khoảng cách.",
        goi_y=("Tìm hai số liền nhau đã biết.",
               "Hiệu của chúng chính là khoảng cách.",
               "Cộng khoảng cách vào số đứng ngay trước chỗ trống."),
        pt_dang="Điền số hạng còn thiếu của dãy cách đều",
        pt_kien_thuc="Dãy số cách đều",
        pt_du_lieu="Dãy có ô trống ở giữa",
        pt_phuong_phap="Xác định khoảng cách từ cặp liền nhau đã biết",
        pt_nhanh="Nếu chỗ trống nằm giữa hai số đã biết thì nó bằng trung bình cộng của hai số ấy.",
        tuong_tu=("Điền số: 4, 9, …, 19, 24", "14"),
        bay="Hai số hai bên chỗ trống cách nhau hai khoảng",
    )


@dang_ky("C-M1-03", "C", "M1", lop=(4, 5), tu_khoa=("dãy nhân", "quy luật nhân"))
def c_m1_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        dau = rng.randint(1, 6)
        q = rng.choice([2, 3, 4, 5, 10])
        ds = [dau * q ** i for i in range(5)]
        y.append((f"{', '.join(sv(x) for x in ds[:4])}, …", sv(ds[4])))
    return Bai(
        tieu_de="Dãy số theo quy luật nhân",
        dan="Tìm quy luật rồi viết số hạng tiếp theo.",
        y=y,
        huong_giai="Nếu các hiệu không bằng nhau, hãy thử phép chia: lấy số hạng sau chia "
                   "số hạng liền trước. Nếu các thương bằng nhau thì đó là dãy nhân, viết "
                   "tiếp bằng cách nhân với thương đó.",
        td=["TD4"],
        diem_chot="Hiệu không đều thì **thử thương** — đó là bước tiếp theo bắt buộc.",
        loi="Cố ép dãy nhân thành dãy cộng nên tìm ra quy luật sai.",
        phong="Thử cả hai: hiệu trước, thương sau.",
        goi_y=("Các hiệu có bằng nhau không?",
               "Nếu không, hãy chia số sau cho số trước.",
               "Các thương có bằng nhau không?"),
        pt_dang="Dãy số theo quy luật nhân",
        pt_kien_thuc="Dãy nhân, phép nhân liên tiếp",
        pt_du_lieu="Các số tăng rất nhanh, hiệu không đều",
        pt_phuong_phap="Thử hiệu, rồi thử thương",
        pt_nhanh="Số sau gấp đôi số trước là dấu hiệu quen nhất của dãy nhân.",
        tuong_tu=("Viết tiếp: 3, 6, 12, 24, …", "48"),
    )


@dang_ky("C-M1-04", "C", "M1", lop=(4, 5), tu_khoa=("số hạng thứ n", "dãy cách đều"))
def c_m1_04(rng, lop):
    dau, d, n = day_cach_deu(rng, lop)
    n = max(n, 12)                       # đủ chỗ để hỏi 4–6 vị trí khác nhau
    vi = sorted(rng.sample(range(5, n + 1), min(rng.randint(4, 6), n - 4)))
    y = [(f"Số hạng thứ {sv(i)} của dãy là số nào?", sv(so_hang(dau, d, i))) for i in vi]
    return Bai(
        tieu_de="Tìm số hạng thứ n của dãy cách đều",
        dan=f"Cho dãy số: {sv(dau)}, {sv(dau + d)}, {sv(dau + 2 * d)}, "
            f"{sv(dau + 3 * d)}, … (mỗi số hơn số liền trước {sv(d)} đơn vị).",
        y=y,
        huong_giai="Số hạng thứ n = số hạng đầu + (n − 1) × khoảng cách. Chữ **(n − 1)** "
                   "vì từ số hạng đầu đến số hạng thứ n phải đi qua n − 1 khoảng.",
        td=["TD4", "TD3"],
        diem_chot="Nhân với **(n − 1)** chứ không phải n — đếm khoảng chứ không đếm số hạng.",
        loi="Nhân khoảng cách với n nên kết quả thừa đúng một khoảng.",
        phong="Kiểm chứng công thức với n = 1: phải ra đúng số hạng đầu.",
        goi_y=("Từ số hạng đầu tới số hạng thứ n đi qua mấy khoảng?",
               "Mỗi khoảng dài bao nhiêu?",
               "Số hạng thứ n = đầu + số khoảng × khoảng cách."),
        pt_dang="Tìm số hạng thứ n của dãy cách đều",
        pt_kien_thuc="Công thức số hạng tổng quát của dãy cách đều",
        pt_du_lieu="Đề hỏi “số hạng thứ …”",
        pt_phuong_phap="Đếm số khoảng rồi nhân với khoảng cách",
        pt_nhanh="Thử công thức với n = 1 và n = 2 để chắc chắn không lệch một khoảng.",
        tuong_tu=("Dãy 5, 9, 13, … số hạng thứ 20 là số nào?", "81"),
        bay="Nhân với n thay vì (n − 1)",
    )


# ══════════════════════════════════ MỨC M2 ══════════════════════════════════

@dang_ky("C-M2-01", "C", "M2", lop=(4, 5), tu_khoa=("đếm số hạng", "dãy cách đều"))
def c_m2_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        d = rng.choice([2, 3, 4, 5, 6, 7, 10])
        dau = rng.randint(1, 30)
        n = rng.randint(10, 200)
        cuoi = so_hang(dau, d, n)
        y.append((f"Dãy {sv(dau)}, {sv(dau + d)}, {sv(dau + 2 * d)}, …, {sv(cuoi)} "
                  f"có bao nhiêu số hạng?", sv(n)))
    return Bai(
        tieu_de="Đếm số hạng của dãy cách đều",
        dan="Tính số số hạng của mỗi dãy.",
        y=y,
        huong_giai="Số số hạng = (số hạng cuối − số hạng đầu) : khoảng cách + 1. "
                   "Phần chia cho biết số khoảng, cộng 1 để đổi từ số khoảng sang số số hạng.",
        td=["TD4", "TD3"],
        diem_chot="Số khoảng luôn **ít hơn số số hạng đúng 1**.",
        loi="Quên cộng 1 nên thiếu một số hạng.",
        phong="Thử với dãy ngắn (3 số hạng) để kiểm chứng công thức.",
        goi_y=("Từ số đầu tới số cuối có bao nhiêu khoảng?",
               "Mỗi khoảng bằng bao nhiêu đơn vị?",
               "Số số hạng nhiều hơn số khoảng 1 đơn vị."),
        pt_dang="Đếm số hạng dãy cách đều",
        pt_kien_thuc="Công thức đếm số hạng",
        pt_du_lieu="Dãy có số đầu, số cuối và khoảng cách đều",
        pt_phuong_phap="(cuối − đầu) : khoảng cách + 1",
        pt_nhanh="Dãy số tự nhiên liên tiếp từ a đến b có b − a + 1 số hạng.",
        tuong_tu=("Dãy 3, 6, 9, …, 99 có bao nhiêu số hạng?", "33"),
        bay="Quên cộng 1",
    )


@dang_ky("C-M2-02", "C", "M2", lop=(4, 5), tu_khoa=("tổng dãy", "dãy cách đều"))
def c_m2_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        d = rng.choice([1, 2, 3, 5, 10])
        dau = rng.randint(1, 20)
        n = rng.choice([10, 20, 25, 30, 50])
        cuoi = so_hang(dau, d, n)
        tong = (dau + cuoi) * n // 2
        y.append((f"Tính tổng: {sv(dau)} + {sv(dau + d)} + {sv(dau + 2 * d)} + … + {sv(cuoi)}",
                  sv(tong)))
    return Bai(
        tieu_de="Tính tổng dãy số cách đều",
        dan="Tính tổng mỗi dãy.",
        y=y,
        huong_giai="Đếm số số hạng trước. Sau đó ghép số đầu với số cuối, số thứ hai với "
                   "số áp chót…, mỗi cặp có tổng bằng nhau. Tổng = (đầu + cuối) × số số "
                   "hạng : 2.",
        td=["TD4", "TD5"],
        diem_chot="Chia cho 2 ở cuối vì mỗi số hạng đã được **đếm hai lần** khi ghép cặp.",
        loi="Quên chia 2, kết quả gấp đôi đáp số đúng.",
        phong="Kiểm tra bằng dãy ngắn: 1 + 2 + 3 = 6, công thức phải cho đúng 6.",
        goi_y=("Dãy có bao nhiêu số hạng?",
               "Ghép số đầu với số cuối — tổng mỗi cặp bằng bao nhiêu?",
               "Có bao nhiêu cặp như thế?"),
        pt_dang="Tổng dãy số cách đều",
        pt_kien_thuc="Công thức tổng dãy cách đều",
        pt_du_lieu="Dãy cộng dài, các số cách đều",
        pt_phuong_phap="Đếm số hạng → (đầu + cuối) × số hạng : 2",
        pt_nhanh="Tổng = trung bình cộng của số đầu và số cuối, nhân với số số hạng.",
        tuong_tu=("Tính: 2 + 4 + 6 + … + 20", "110"),
        bay="Quên chia 2",
    )


@dang_ky("C-M2-03", "C", "M2", lop=(4, 5), tu_khoa=("dãy hình", "quy luật hình"))
def c_m2_03(rng, lop):
    a = rng.randint(1, 4)
    d = rng.randint(2, 5)
    n = rng.randint(8, 30)
    y = [(f"Hình thứ 1 có {sv(a)} que diêm, mỗi hình sau hơn hình liền trước "
          f"{sv(d)} que. Hình thứ {sv(k)} có bao nhiêu que diêm?", sv(a + (k - 1) * d))
         for k in sorted(rng.sample(range(3, n + 1), rng.randint(4, 6)))]
    tong_que = sum(a + (i - 1) * d for i in range(1, n + 1))
    y.append((f"Xếp liên tiếp {sv(n)} hình đầu tiên thì cần tất cả bao nhiêu que diêm?",
              sv(tong_que)))
    return Bai(
        tieu_de="Dãy hình xếp theo quy luật",
        dan="Quan sát quy luật số que diêm rồi trả lời.",
        y=y[:min(7, len(y))],
        huong_giai="Số que của các hình lập thành dãy cách đều. Dùng công thức số hạng "
                   "thứ n để tính cho một hình bất kì, dùng công thức tổng dãy cách đều "
                   "khi hỏi tổng số que của nhiều hình.",
        td=["TD4", "TD3"],
        diem_chot="Bài toán hình nhưng lời giải là **dãy số** — đổi ngôn ngữ trước khi tính.",
        loi="Vẽ tay từng hình để đếm, không kịp thời gian với hình thứ hai, ba chục.",
        phong="Lập bảng ba hình đầu để tìm khoảng cách rồi mới dùng công thức.",
        goi_y=("Hình thứ hai hơn hình thứ nhất mấy que?",
               "Hình thứ ba hơn hình thứ hai mấy que?",
               "Đưa về dãy cách đều rồi dùng công thức."),
        pt_dang="Quy luật hình đưa về dãy số",
        pt_kien_thuc="Dãy cách đều, số hạng thứ n, tổng dãy",
        pt_du_lieu="Đề mô tả hình xếp thêm đều đặn theo thứ tự",
        pt_phuong_phap="Lập bảng vài hình đầu, tìm khoảng cách, áp công thức",
        pt_nhanh="Chỉ cần ba hình đầu là đủ để khẳng định quy luật cách đều.",
        tuong_tu=("Hình 1 có 3 que, mỗi hình sau hơn 2 que. Hình thứ 10 có mấy que?", "21"),
    )


@dang_ky("C-M2-04", "C", "M2", lop=(4, 5), tu_khoa=("dãy số", "quy luật kép"))
def c_m2_04(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(1, 9)
        b = rng.randint(1, 9)
        kieu = rng.choice(["xen_ke", "cong_dan", "binh_phuong"])
        if kieu == "xen_ke":
            ds = []
            for i in range(6):
                ds.append(a + (i // 2) * 3 if i % 2 == 0 else b + (i // 2) * 5)
            y.append((f"{', '.join(sv(x) for x in ds[:5])}, …", sv(ds[5])))
        elif kieu == "cong_dan":
            ds = [a]
            for i in range(1, 6):
                ds.append(ds[-1] + i * b)
            y.append((f"{', '.join(sv(x) for x in ds[:5])}, …", sv(ds[5])))
        else:
            ds = [i * i for i in range(a, a + 6)]
            y.append((f"{', '.join(sv(x) for x in ds[:5])}, …", sv(ds[5])))
    return Bai(
        tieu_de="Dãy số có quy luật phức tạp",
        dan="Tìm quy luật rồi viết số hạng tiếp theo.",
        y=y,
        huong_giai="Khi hiệu không đều, hãy tính hiệu của các hiệu. Nếu dãy hiệu lại là "
                   "dãy cách đều thì quy luật là “cộng thêm một lượng tăng đều”. Cũng có "
                   "dãy gồm hai dãy con xen kẽ nhau — tách riêng các số ở vị trí lẻ và "
                   "vị trí chẵn ra xét.",
        td=["TD4", "TD6"],
        diem_chot="Hai hướng thử: **hiệu của hiệu** và **tách dãy con xen kẽ**.",
        loi="Chỉ thử một hướng rồi bỏ cuộc.",
        phong="Luôn viết dãy hiệu xuống dưới dãy gốc trước khi kết luận.",
        goi_y=("Viết dãy các hiệu xuống dưới.",
               "Dãy hiệu có đều không? Nếu không, tính hiệu của dãy hiệu.",
               "Thử tách các số ở vị trí lẻ và vị trí chẵn thành hai dãy riêng."),
        pt_dang="Dãy số quy luật bậc hai hoặc xen kẽ",
        pt_kien_thuc="Dãy hiệu, dãy con xen kẽ",
        pt_du_lieu="Hiệu giữa các số hạng không bằng nhau",
        pt_phuong_phap="Lập dãy hiệu; tách dãy con theo vị trí",
        pt_nhanh="Dãy 1, 4, 9, 16, 25 là các số chính phương — nhớ để nhận ra ngay.",
        tuong_tu=("Viết tiếp: 1, 2, 4, 7, 11, …", "16"),
    )


# ══════════════════════════════════ MỨC M3 ══════════════════════════════════

@dang_ky("C-M3-01", "C", "M3", lop=(4, 5), tu_khoa=("số hạng thứ n", "vị trí", "dãy"))
def c_m3_01(rng, lop):
    dau = rng.randint(2, 15)
    d = rng.choice([3, 4, 5, 6, 7, 8])
    n = rng.randint(40, 300)
    cuoi = so_hang(dau, d, n)
    thu = [so_hang(dau, d, i) for i in sorted(rng.sample(range(3, max(n, 8)), 3))]
    y = [(f"Dãy có bao nhiêu số hạng?", sv(n)),
         (f"Số hạng thứ {sv(n // 2)} là số nào?", sv(so_hang(dau, d, n // 2))),
         (f"Số {sv(thu[0])} là số hạng thứ mấy?", sv((thu[0] - dau) // d + 1)),
         (f"Số {sv(thu[1])} là số hạng thứ mấy?", sv((thu[1] - dau) // d + 1)),
         (f"Số {sv(thu[2] + 1)} có thuộc dãy không? Vì sao?",
          "không" if (thu[2] + 1 - dau) % d else "có"),
         (f"Tổng của cả dãy bằng bao nhiêu?", sv((dau + cuoi) * n // 2))]
    return Bai(
        tieu_de="Định vị số hạng trong dãy cách đều",
        dan=f"Cho dãy: {sv(dau)}, {sv(dau + d)}, {sv(dau + 2 * d)}, …, {sv(cuoi)}.",
        y=y,
        huong_giai="Muốn biết một số là số hạng thứ mấy: lấy số đó trừ số hạng đầu, chia "
                   "cho khoảng cách rồi cộng 1. Nếu phép chia còn dư thì số đó **không "
                   "thuộc** dãy.",
        td=["TD4", "TD2"],
        diem_chot="Phép chia **có dư** là bằng chứng số đó không thuộc dãy.",
        loi="Chia được số nguyên rồi quên cộng 1, hoặc bỏ qua phần dư.",
        phong="Luôn ghi rõ thương và số dư khi chia.",
        goi_y=("Lấy số đó trừ số hạng đầu.",
               "Chia hiệu cho khoảng cách — có chia hết không?",
               "Chia hết thì cộng 1 để ra thứ tự; không chia hết thì số đó không thuộc dãy."),
        pt_dang="Định vị số hạng, kiểm tra một số có thuộc dãy",
        pt_kien_thuc="Dãy cách đều, phép chia có dư",
        pt_du_lieu="Câu hỏi “là số hạng thứ mấy”, “có thuộc dãy không”",
        pt_phuong_phap="(số − đầu) : khoảng cách, xét dư rồi cộng 1",
        pt_nhanh="Mọi số hạng của dãy đều có cùng số dư khi chia cho khoảng cách.",
        tuong_tu=("Dãy 2, 7, 12, … Số 47 là số hạng thứ mấy?", "10"),
        bay="Số không thuộc dãy",
    )


@dang_ky("C-M3-02", "C", "M3", lop=(4, 5), tu_khoa=("đánh số trang", "đếm chữ số", "dãy"))
def c_m3_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        cs = rng.choice([0, 1, 2, 3, 5, 7, 9])
        n = rng.choice([100, 150, 200, 300, 500])
        dem = sum(str(i).count(str(cs)) for i in range(1, n + 1))
        y.append((f"Từ 1 đến {sv(n)}, chữ số {sv(cs)} xuất hiện bao nhiêu lần?", sv(dem)))
    return Bai(
        tieu_de="Đếm số lần xuất hiện của một chữ số",
        dan="Đếm số lần xuất hiện, tính cả khi chữ số đó xuất hiện nhiều lần trong một số.",
        y=y,
        huong_giai="Đếm theo từng hàng: đếm số lần chữ số đó đứng ở hàng đơn vị, rồi hàng "
                   "chục, rồi hàng trăm. Ở mỗi hàng, các số thoả mãn lập thành dãy cách "
                   "đều, dùng công thức đếm số hạng.",
        td=["TD4", "TD6"],
        diem_chot="Một số có thể chứa chữ số đó **nhiều lần**; đếm theo hàng thì không sót.",
        loi="Đếm số lượng **số** chứa chữ số đó thay vì số **lần** xuất hiện.",
        phong="Kẻ bảng: hàng đơn vị – hàng chục – hàng trăm, đếm riêng rồi cộng.",
        goi_y=("Đếm riêng theo từng hàng.",
               "Ở hàng đơn vị, các số đó cách nhau bao nhiêu đơn vị?",
               "Cộng kết quả của cả ba hàng."),
        pt_dang="Đếm số lần xuất hiện của một chữ số",
        pt_kien_thuc="Dãy cách đều, cấu tạo số",
        pt_du_lieu="Câu hỏi “chữ số … xuất hiện bao nhiêu lần”",
        pt_phuong_phap="Đếm theo từng hàng rồi cộng",
        pt_nhanh="Từ 1 đến 100, mỗi chữ số từ 1 đến 9 xuất hiện đúng 20 lần (riêng chữ số "
                 "1 là 21 lần vì có số 100).",
        tuong_tu=("Từ 1 đến 50, chữ số 3 xuất hiện bao nhiêu lần?", "15"),
        bay="Số 33, 44… chứa hai lần cùng một chữ số",
    )


@dang_ky("C-M3-03", "C", "M3", lop=(4, 5), tu_khoa=("dãy số", "tìm quy luật", "số hạng"))
def c_m3_03(rng, lop):
    a = rng.randint(1, 5)
    b = rng.randint(2, 6)
    ds = [a]
    for i in range(1, 12):
        ds.append(ds[-1] * 2 + b if i % 2 else ds[-1] + b * i)
    y = [(f"Viết ba số hạng đầu tiên của dãy.", ", ".join(sv(x) for x in ds[:3])),
         (f"Số hạng thứ 5 của dãy là số nào?", sv(ds[4])),
         (f"Số hạng thứ 7 của dãy là số nào?", sv(ds[6])),
         (f"Số hạng thứ 9 của dãy là số nào?", sv(ds[8])),
         (f"Từ số hạng thứ 4 đến số hạng thứ 6, dãy tăng thêm bao nhiêu đơn vị?",
          sv(ds[5] - ds[3]))]
    return Bai(
        tieu_de="Dãy số cho bởi quy tắc truy hồi",
        dan=f"Dãy số được lập như sau: số hạng đầu bằng {sv(a)}; kể từ số hạng thứ hai, "
            f"số hạng ở **vị trí chẵn** bằng số hạng liền trước nhân 2 rồi cộng {sv(b)}, "
            f"số hạng ở **vị trí lẻ** bằng số hạng liền trước cộng {sv(b)} nhân với số "
            f"thứ tự của số hạng liền trước.",
        y=y,
        huong_giai="Lập bảng và tính lần lượt từng số hạng theo đúng quy tắc, không nhảy "
                   "cóc. Ghi rõ số thứ tự của mỗi số hạng để chọn đúng nhánh quy tắc.",
        td=["TD3", "TD6"],
        diem_chot="Quy tắc phụ thuộc **vị trí chẵn hay lẻ** — phải đánh số thứ tự trước.",
        loi="Áp dụng nhầm nhánh quy tắc vì không để ý vị trí.",
        phong="Kẻ bảng hai dòng: dòng trên ghi vị trí, dòng dưới ghi số hạng.",
        goi_y=("Kẻ bảng vị trí và số hạng.",
               "Xác định vị trí đang xét là chẵn hay lẻ.",
               "Áp dụng đúng nhánh quy tắc cho vị trí đó."),
        pt_dang="Dãy số truy hồi có quy tắc rẽ nhánh",
        pt_kien_thuc="Dãy số cho bởi quy tắc, tính lần lượt",
        pt_du_lieu="Đề mô tả cách lập số hạng từ số hạng liền trước",
        pt_phuong_phap="Lập bảng, tính lần lượt, bám sát vị trí",
        pt_nhanh="Chỉ cần tính tới số hạng được hỏi, không cần tính cả dãy.",
        tuong_tu=("Dãy: số đầu là 2, mỗi số sau bằng số trước nhân 2. Số thứ 5 là số nào?",
                  "32"),
        bay="Quy tắc khác nhau ở vị trí chẵn và lẻ",
    )


# ══════════════════════════════════ MỨC M4 ══════════════════════════════════

@dang_ky("C-M4-01", "C", "M4", lop=(4, 5), tu_khoa=("dãy số", "tổng", "trung bình cộng"))
def c_m4_01(rng, lop):
    d = rng.choice([2, 3, 4, 5])
    n = rng.choice([10, 20, 30, 40])
    tb = rng.randint(20, 200)
    # dãy cách đều n số hạng, số lẻ hoặc chẵn, trung bình cộng = tb
    if n % 2 == 0:
        dau = tb - (n - 1) * d // 2
        if (n - 1) * d % 2:
            tb += 1
            dau = tb - (n - 1) * d // 2
    else:
        dau = tb - (n // 2) * d
    cuoi = so_hang(dau, d, n)
    tong = (dau + cuoi) * n // 2
    y = [("Số hạng đầu của dãy là số nào?", sv(dau)),
         ("Số hạng cuối của dãy là số nào?", sv(cuoi)),
         ("Tổng của dãy bằng bao nhiêu?", sv(tong)),
         ("Trung bình cộng của dãy bằng bao nhiêu?", sv(tong // n) if tong % n == 0
          else sv(round(tong / n, 2))),
         ("Tổng của số hạng đầu và số hạng cuối bằng bao nhiêu?", sv(dau + cuoi)),
         ("Tổng của số hạng thứ hai và số hạng áp chót bằng bao nhiêu?",
          sv(so_hang(dau, d, 2) + so_hang(dau, d, n - 1)))]
    return Bai(
        tieu_de="Tổng, trung bình cộng của dãy cách đều",
        dan=f"Một dãy cách đều có {sv(n)} số hạng, khoảng cách {sv(d)} đơn vị, "
            f"số hạng cuối là {sv(cuoi)}.",
        y=y,
        huong_giai="Đi ngược từ số hạng cuối về số hạng đầu: đầu = cuối − (n − 1) × khoảng "
                   "cách. Tổng = (đầu + cuối) × n : 2. Trung bình cộng của một dãy cách "
                   "đều bằng trung bình cộng của số hạng đầu và số hạng cuối.",
        td=["TD4", "TD3"],
        diem_chot="Trung bình cộng dãy cách đều = **(đầu + cuối) : 2**, không cần tính tổng.",
        loi="Tính tổng rồi chia — dài hơn và dễ sai khi số hạng nhiều.",
        phong="Nhớ tính chất trung bình cộng để kiểm tra chéo kết quả tổng.",
        goi_y=("Từ số hạng cuối lùi về số hạng đầu qua mấy khoảng?",
               "Trung bình cộng bằng nửa tổng của hai số hạng ở hai đầu.",
               "Tổng bằng trung bình cộng nhân số số hạng."),
        pt_dang="Tổng và trung bình cộng của dãy cách đều",
        pt_kien_thuc="Dãy cách đều, trung bình cộng",
        pt_du_lieu="Đề cho số số hạng, khoảng cách và một đầu của dãy",
        pt_phuong_phap="Tìm hai đầu dãy → tổng → trung bình cộng",
        pt_nhanh="Mọi cặp số hạng cách đều hai đầu đều có tổng bằng nhau.",
        tuong_tu=("Dãy cách đều 10 số hạng, đầu 5, cuối 50. Tổng bằng bao nhiêu?", "275"),
    )


@dang_ky("C-M4-02", "C", "M4", lop=(4, 5), tu_khoa=("trồng cây", "khoảng cách", "dãy"))
def c_m4_02(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["hai_dau", "mot_dau", "khong_dau", "khep_kin"],
                           rng.randint(4, 6)):
        d = rng.choice([2, 3, 4, 5, 6])
        n = rng.randint(8, 60)
        dai = d * n
        if kieu == "hai_dau":
            y.append((f"Trồng cây suốt một đoạn đường dài {sv(dai)} m, hai cây liền nhau "
                      f"cách nhau {sv(d)} m, trồng cả ở hai đầu đường. Cần bao nhiêu cây?",
                      sv(n + 1)))
        elif kieu == "mot_dau":
            y.append((f"Trồng cây trên đoạn đường dài {sv(dai)} m, hai cây liền nhau cách "
                      f"nhau {sv(d)} m, chỉ trồng ở một đầu đường. Cần bao nhiêu cây?",
                      sv(n)))
        elif kieu == "khong_dau":
            y.append((f"Trồng cây trên đoạn đường dài {sv(dai)} m, hai cây liền nhau cách "
                      f"nhau {sv(d)} m, không trồng ở cả hai đầu. Cần bao nhiêu cây?",
                      sv(n - 1)))
        else:
            y.append((f"Trồng cây quanh một cái ao hình tròn có chu vi {sv(dai)} m, "
                      f"hai cây liền nhau cách nhau {sv(d)} m. Cần bao nhiêu cây?", sv(n)))
    return Bai(
        tieu_de="Bài toán trồng cây — bốn trường hợp",
        dan="Tính số cây cần trồng trong mỗi trường hợp.",
        y=y,
        huong_giai="Số khoảng = độ dài : khoảng cách. Từ số khoảng suy ra số cây: trồng "
                   "cả hai đầu thì số cây hơn số khoảng 1; trồng một đầu thì bằng số "
                   "khoảng; không trồng đầu nào thì kém số khoảng 1; trồng khép kín "
                   "(quanh ao, quanh sân) thì bằng đúng số khoảng.",
        td=["TD3", "TD6"],
        diem_chot="Đọc kĩ **có trồng ở hai đầu hay không** — bốn trường hợp cho bốn đáp số khác nhau.",
        loi="Máy móc cộng 1 cho mọi trường hợp.",
        phong="Vẽ một đoạn ngắn với 3 khoảng để đếm thử trước khi áp dụng.",
        goi_y=("Tính số khoảng trước.",
               "Đề có nói trồng ở hai đầu, một đầu, hay khép kín?",
               "Vẽ thử một hình nhỏ để kiểm tra."),
        pt_dang="Bài toán trồng cây",
        pt_kien_thuc="Quan hệ số cây – số khoảng",
        pt_du_lieu="Từ khoá “trồng cây”, “cột điện”, “quanh ao”, “hai đầu”",
        pt_phuong_phap="Tính số khoảng rồi chọn đúng công thức theo trường hợp",
        pt_nhanh="Khép kín thì số cây bằng đúng số khoảng — không cộng, không trừ.",
        tuong_tu=("Trồng cây hai bên một đoạn đường dài 20 m, cách nhau 4 m, trồng cả hai "
                  "đầu, mỗi bên cần mấy cây?", "6 cây"),
        bay="Bốn trường hợp trồng cây khác nhau",
    )


@dang_ky("C-M4-03", "C", "M4", lop=(4, 5), tu_khoa=("dãy số", "chia hết", "quy luật"))
def c_m4_03(rng, lop):
    dau = rng.randint(1, 12)
    d = rng.choice([3, 4, 6, 7])
    n = rng.randint(60, 400)
    cuoi = so_hang(dau, d, n)
    m = rng.choice([2, 5, 10])
    dem = sum(1 for i in range(1, n + 1) if so_hang(dau, d, i) % m == 0)
    tong_chan = sum(so_hang(dau, d, i) for i in range(1, n + 1) if so_hang(dau, d, i) % 2 == 0)
    y = [("Dãy có bao nhiêu số hạng?", sv(n)),
         ("Số hạng cuối là số nào?", sv(cuoi)),
         (f"Trong dãy có bao nhiêu số chia hết cho {sv(m)}?", sv(dem)),
         ("Trong dãy có bao nhiêu số chẵn?",
          sv(sum(1 for i in range(1, n + 1) if so_hang(dau, d, i) % 2 == 0))),
         ("Tổng các số chẵn trong dãy bằng bao nhiêu?", sv(tong_chan)),
         ("Tổng cả dãy bằng bao nhiêu?", sv((dau + cuoi) * n // 2))]
    return Bai(
        tieu_de="Lọc số hạng theo điều kiện chia hết",
        dan=f"Cho dãy {sv(dau)}, {sv(dau + d)}, {sv(dau + 2 * d)}, …, {sv(cuoi)}.",
        y=y,
        huong_giai="Các số hạng thoả thêm một điều kiện chia hết cũng lập thành một dãy "
                   "cách đều mới, có khoảng cách là bội chung nhỏ nhất của khoảng cách cũ "
                   "và số chia. Tìm số hạng đầu tiên thoả điều kiện rồi đếm trên dãy mới.",
        td=["TD4", "TD2"],
        diem_chot="Dãy con cũng **cách đều**, chỉ khác khoảng cách.",
        loi="Duyệt từng số hạng để đếm — không kịp khi dãy dài hàng trăm số.",
        phong="Tìm số hạng đầu tiên thoả điều kiện rồi xác định khoảng cách mới.",
        goi_y=("Số hạng nào đầu tiên thoả điều kiện?",
               "Số hạng tiếp theo thoả điều kiện cách nó bao nhiêu?",
               "Dãy con cũng cách đều — dùng công thức đếm."),
        pt_dang="Đếm và tính tổng dãy con thoả điều kiện chia hết",
        pt_kien_thuc="Dãy cách đều, bội chung nhỏ nhất",
        pt_du_lieu="Đề hỏi riêng các số chẵn, số chia hết cho … trong một dãy",
        pt_phuong_phap="Xác định dãy con cách đều rồi đếm, tính tổng",
        pt_nhanh="Nếu khoảng cách của dãy gốc đã chia hết cho số chia thì hoặc tất cả, "
                 "hoặc không số hạng nào thoả điều kiện.",
        tuong_tu=("Dãy 1, 4, 7, …, 100 có bao nhiêu số chẵn?", "17"),
    )


# ══════════════════════════════════ MỨC M5 ══════════════════════════════════

@dang_ky("C-M5-01", "C", "M5", lop=(4, 5), tu_khoa=("dãy số", "chu kì", "tuần hoàn"))
def c_m5_01(rng, lop):
    chu_ki = rng.randint(3, 7)
    mau = [rng.randint(1, 9) for _ in range(chu_ki)]
    y = []
    for _ in range(rng.randint(4, 6)):
        vi = rng.randint(20, 500)
        y.append((f"Số hạng thứ {sv(vi)} của dãy là số nào?",
                  sv(mau[(vi - 1) % chu_ki])))
    n = rng.choice([100, 200, 300])
    tong = sum(mau) * (n // chu_ki) + sum(mau[:n % chu_ki])
    y.append((f"Tổng {sv(n)} số hạng đầu tiên bằng bao nhiêu?", sv(tong)))
    return Bai(
        tieu_de="Dãy số lặp lại theo chu kì",
        dan=f"Cho dãy lặp lại vô hạn theo nhóm: {', '.join(sv(x) for x in mau)}, "
            f"{', '.join(sv(x) for x in mau)}, {sv(mau[0])}, …",
        y=y[:min(7, len(y))],
        huong_giai="Dãy lặp lại theo chu kì độ dài k. Muốn tìm số hạng thứ n, lấy n chia "
                   "cho k: số dư cho biết vị trí trong chu kì (dư 0 ứng với phần tử cuối "
                   "chu kì). Muốn tính tổng n số hạng đầu, lấy tổng một chu kì nhân số chu "
                   "kì đầy đủ rồi cộng phần dư.",
        td=["TD4", "TD6"],
        diem_chot="Số dư **0** ứng với phần tử **cuối** chu kì, không phải phần tử đầu.",
        loi="Lấy số dư 0 rồi lấy phần tử đầu tiên của chu kì.",
        phong="Kiểm chứng bằng một vị trí nhỏ đã biết trước khi làm vị trí lớn.",
        goi_y=("Chu kì của dãy dài bao nhiêu số hạng?",
               "Chia vị trí cần tìm cho độ dài chu kì.",
               "Số dư cho biết vị trí trong chu kì; dư 0 là phần tử cuối."),
        pt_dang="Dãy tuần hoàn",
        pt_kien_thuc="Phép chia có dư, tính tuần hoàn",
        pt_du_lieu="Dãy lặp lại một nhóm số cố định",
        pt_phuong_phap="Chia vị trí cho chu kì, dùng số dư định vị",
        pt_nhanh="Tổng n số hạng = tổng một chu kì × số chu kì đầy đủ + tổng phần dư.",
        tuong_tu=("Dãy 1, 2, 3, 1, 2, 3, … số hạng thứ 100 là số nào?", "1"),
        bay="Số dư 0 ứng với phần tử cuối chu kì",
    )


@dang_ky("C-M5-02", "C", "M5", lop=(4, 5), tu_khoa=("dãy số", "tổng có quy luật", "nâng cao"))
def c_m5_02(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["le", "chan", "binh_phuong_tong"], rng.randint(4, 6)):
        n = rng.choice([10, 20, 25, 50, 100])
        if kieu == "le":
            y.append((f"1 + 3 + 5 + … + {sv(2 * n - 1)} (tổng {sv(n)} số lẻ đầu tiên)",
                      sv(n * n)))
        elif kieu == "chan":
            y.append((f"2 + 4 + 6 + … + {sv(2 * n)} (tổng {sv(n)} số chẵn đầu tiên)",
                      sv(n * (n + 1))))
        else:
            y.append((f"1 + 2 + 3 + … + {sv(n)}", sv(n * (n + 1) // 2)))
    return Bai(
        tieu_de="Ba công thức tổng phải thuộc",
        dan="Tính nhanh mỗi tổng, nêu công thức đã dùng.",
        y=y,
        huong_giai="Tổng n số tự nhiên đầu tiên bằng n × (n + 1) : 2. Tổng n số lẻ đầu "
                   "tiên bằng n × n. Tổng n số chẵn đầu tiên bằng n × (n + 1). Cả ba đều "
                   "suy ra từ công thức tổng dãy cách đều.",
        td=["TD4", "TD5"],
        diem_chot="Phải xác định đúng **n là số lượng số hạng**, không phải số hạng cuối.",
        loi="Nhầm số hạng cuối với số lượng số hạng khi áp công thức.",
        phong="Đếm số số hạng trước rồi mới thay vào công thức.",
        goi_y=("Dãy này có bao nhiêu số hạng?",
               "Đây là dãy số lẻ, số chẵn, hay số tự nhiên liên tiếp?",
               "Chọn đúng công thức tương ứng."),
        pt_dang="Tổng dãy đặc biệt",
        pt_kien_thuc="Ba công thức tổng cơ bản",
        pt_du_lieu="Dãy toàn số lẻ, toàn số chẵn, hoặc số tự nhiên liên tiếp",
        pt_phuong_phap="Đếm số số hạng rồi áp công thức",
        pt_nhanh="Tổng n số lẻ đầu tiên luôn là một số chính phương — dùng để kiểm tra nhanh.",
        tuong_tu=("Tính: 1 + 3 + 5 + … + 19", "100"),
        bay="Nhầm số hạng cuối với số lượng số hạng",
    )


@dang_ky("C-M5-03", "C", "M5", lop=(5,), tu_khoa=("dãy số", "hiệu bậc hai", "tam giác"))
def c_m5_03(rng, lop):
    a = rng.randint(1, 4)
    b = rng.randint(1, 4)
    ds = [a + b * i * (i + 1) // 2 for i in range(12)]
    y = [("Viết bốn số hạng đầu của dãy.", ", ".join(sv(x) for x in ds[:4])),
         ("Số hạng thứ 6 là số nào?", sv(ds[5])),
         ("Số hạng thứ 10 là số nào?", sv(ds[9])),
         ("Hiệu giữa số hạng thứ 10 và số hạng thứ 9 bằng bao nhiêu?", sv(ds[9] - ds[8])),
         ("Dãy các hiệu của dãy trên có phải dãy cách đều không? Khoảng cách bằng bao nhiêu?",
          f"có, khoảng cách {sv(b)}"),
         ("Tổng của bốn số hạng đầu bằng bao nhiêu?", sv(sum(ds[:4])))]
    return Bai(
        tieu_de="Dãy có hiệu tăng đều",
        dan=f"Dãy số bắt đầu bằng {sv(a)}; hiệu giữa hai số hạng liên tiếp lần lượt là "
            f"{sv(b)}, {sv(2 * b)}, {sv(3 * b)}, {sv(4 * b)}, … (mỗi hiệu hơn hiệu trước "
            f"{sv(b)} đơn vị).",
        y=y,
        huong_giai="Đây là dãy có **hiệu bậc hai đều**. Số hạng thứ n bằng số hạng đầu "
                   "cộng với tổng của (n − 1) hiệu đầu tiên; các hiệu ấy lập thành dãy "
                   "cách đều nên tổng của chúng tính được bằng công thức tổng dãy cách đều.",
        td=["TD4", "TD6"],
        diem_chot="Số hạng thứ n = số đầu + **tổng (n − 1) hiệu đầu tiên**.",
        loi="Cộng n hiệu thay vì (n − 1) hiệu.",
        phong="Kiểm chứng với n = 2: chỉ cộng đúng một hiệu.",
        goi_y=("Từ số hạng đầu tới số hạng thứ n phải cộng bao nhiêu hiệu?",
               "Các hiệu đó lập thành dãy gì?",
               "Tính tổng các hiệu bằng công thức tổng dãy cách đều."),
        pt_dang="Dãy có hiệu tăng đều (hiệu bậc hai)",
        pt_kien_thuc="Dãy hiệu, tổng dãy cách đều",
        pt_du_lieu="Hiệu giữa các số hạng tăng đều đặn",
        pt_phuong_phap="Lập dãy hiệu, tính tổng hiệu, cộng vào số hạng đầu",
        pt_nhanh="Với hiệu 1, 2, 3, … thì số hạng thứ n = số đầu + (n − 1) × n : 2.",
        tuong_tu=("Dãy 1, 2, 4, 7, 11, … số hạng thứ 8 là số nào?", "29"),
        bay="Cộng thừa một hiệu",
    )
