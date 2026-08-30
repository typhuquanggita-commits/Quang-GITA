# -*- coding: utf-8 -*-
"""Thư viện mẫu bài — NHÓM D: Toán điển hình & Giải toán có lời văn."""
from __future__ import annotations

from fractions import Fraction

from .khung import (Bai, hoa, HANG_HOA, LOP_HOC, NOI_CHON, TO_DOI, bo_so_tbc,
                    cap_tong_hieu, dang_ky, hai_ten, luan_phien, ps, sv)


def gio_phut(f: Fraction) -> str:
    """Đổi số giờ dạng phân số sang lời “… giờ … phút” cho dễ đọc."""
    g = f.numerator // f.denominator
    phut = (f - g) * 60
    if phut == 0:
        return f"{sv(g)} giờ"
    if phut.denominator == 1:
        return (f"{sv(g)} giờ {sv(phut.numerator)} phút" if g
                else f"{sv(phut.numerator)} phút")
    return f"{ps(f)} giờ"


def ti_so(rng):
    """Cặp tỉ số nhỏ, khác nhau, dùng cho tổng – tỉ và hiệu – tỉ."""
    a = rng.randint(1, 6)
    b = rng.randint(1, 7)
    while b == a:
        b = rng.randint(1, 7)
    return (min(a, b), max(a, b))


# ══════════════════════════════════ MỨC M1 ══════════════════════════════════

@dang_ky("D-M1-01", "D", "M1", tu_khoa=("trung bình cộng",))
def d_m1_01(rng, lop):
    y = []
    for n in luan_phien(rng, [2, 3, 4, 5], rng.randint(4, 7)):
        ds, tb = bo_so_tbc(rng, n, 12, 200 if lop > 3 else 60)
        y.append((f"Tìm trung bình cộng của {sv(n)} số: {', '.join(sv(x) for x in ds)}.",
                  sv(tb)))
    return Bai(
        tieu_de="Tìm trung bình cộng của nhiều số",
        dan="Tính trung bình cộng.",
        y=y,
        huong_giai="Trung bình cộng của nhiều số bằng tổng các số đó chia cho số lượng "
                   "các số. Cộng cho hết rồi mới chia, không chia từng số một.",
        td=["TD1"],
        diem_chot="Chia cho **số lượng số hạng**, không phải chia cho một số bất kì.",
        loi="Đếm sai số lượng số hạng nên chia nhầm.",
        phong="Đánh số thứ tự từng số trước khi cộng.",
        goi_y=("Cộng tất cả các số lại.",
               "Đếm xem có bao nhiêu số.",
               "Lấy tổng chia cho số lượng."),
        pt_dang="Tìm trung bình cộng",
        pt_kien_thuc="Định nghĩa trung bình cộng",
        pt_du_lieu="Từ khoá “trung bình cộng”, “trung bình mỗi …”",
        pt_phuong_phap="Tổng chia số lượng",
        pt_nhanh="Ước lượng: trung bình cộng luôn nằm giữa số bé nhất và số lớn nhất.",
        tuong_tu=("Tìm trung bình cộng của 12, 18 và 30.", "20"),
    )


@dang_ky("D-M1-02", "D", "M1", tu_khoa=("tổng hiệu", "tìm hai số"))
def d_m1_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        tong, hieu, lon, be = cap_tong_hieu(rng, 40, 400 if lop == 3 else 2_000)
        y.append((f"Tổng hai số là {sv(tong)}, hiệu hai số là {sv(hieu)}. "
                  f"Tìm hai số đó.", f"số lớn {sv(lon)}, số bé {sv(be)}"))
    return Bai(
        tieu_de="Tìm hai số khi biết tổng và hiệu",
        dan="Tìm hai số trong mỗi trường hợp.",
        y=y,
        huong_giai="Số lớn = (tổng + hiệu) : 2. Số bé = (tổng − hiệu) : 2. Cách hiểu: "
                   "vẽ hai đoạn thẳng, đoạn dài hơn phần hiệu; bớt phần hiệu đi thì hai "
                   "đoạn bằng nhau, mỗi đoạn là số bé.",
        td=["TD1", "TD3"],
        diem_chot="Cộng hiệu ra **số lớn**, trừ hiệu ra **số bé** — nhớ đúng chiều.",
        loi="Lấy (tổng + hiệu) : 2 rồi gọi đó là số bé.",
        phong="Vẽ sơ đồ đoạn thẳng trước, đoạn dài hơn luôn là số lớn.",
        goi_y=("Vẽ hai đoạn thẳng, đoạn trên dài hơn đoạn dưới đúng phần hiệu.",
               "Nếu bớt phần hiệu ở đoạn trên thì hai đoạn bằng nhau, tổng mới bằng bao nhiêu?",
               "Chia đôi tổng mới để ra số bé."),
        pt_dang="Bài toán tổng – hiệu",
        pt_kien_thuc="Công thức tổng – hiệu, sơ đồ đoạn thẳng",
        pt_du_lieu="Đề cho **tổng** và **hiệu** của hai số",
        pt_phuong_phap="Vẽ sơ đồ, đưa về hai phần bằng nhau",
        pt_nhanh="Số lớn và số bé luôn có trung bình cộng bằng nửa tổng.",
        tuong_tu=("Tổng hai số là 100, hiệu là 20. Tìm hai số.", "60 và 40"),
    )


@dang_ky("D-M1-03", "D", "M1", tu_khoa=("gấp", "kém", "nhiều hơn", "ít hơn"), thuc_te=True)
def d_m1_03(rng, lop):
    a, b = hai_ten(rng)
    y = []
    for kieu in luan_phien(rng, ["gap", "kem", "nhieu_hon", "it_hon"], rng.randint(4, 6)):
        x = rng.randint(6, 60)
        k = rng.randint(2, 6)
        d = rng.randint(3, 30)
        if kieu == "gap":
            y.append((f"{a} có {sv(x)} quyển vở, {b} có số vở gấp {sv(k)} lần {a}. "
                      f"{b} có bao nhiêu quyển vở?", sv(x * k)))
        elif kieu == "kem":
            y.append((f"{a} có {sv(x * k)} quyển vở, số vở của {b} kém {sv(k)} lần "
                      f"số vở của {a}. {b} có bao nhiêu quyển vở?", sv(x)))
        elif kieu == "nhieu_hon":
            y.append((f"{a} có {sv(x)} quyển vở, {b} có nhiều hơn {a} {sv(d)} quyển. "
                      f"{b} có bao nhiêu quyển vở?", sv(x + d)))
        else:
            y.append((f"{a} có {sv(x + d)} quyển vở, {b} có ít hơn {a} {sv(d)} quyển. "
                      f"{b} có bao nhiêu quyển vở?", sv(x)))
    return Bai(
        tieu_de="Nhiều hơn – ít hơn, gấp – kém",
        dan="Đọc kĩ rồi trả lời từng câu.",
        y=y,
        huong_giai="“Nhiều hơn, ít hơn” là quan hệ **cộng, trừ**; “gấp … lần, kém … lần” "
                   "là quan hệ **nhân, chia**. Gạch chân cụm từ khoá trước khi chọn phép tính.",
        td=["TD1", "TD2"],
        diem_chot="Bốn từ khoá — bốn phép tính khác nhau. Đọc sai một chữ là sai cả bài.",
        loi="Thấy chữ “lần” là nhân, không phân biệt “gấp” với “kém”.",
        phong="Gạch chân từ khoá và viết ngay dấu phép tính bên cạnh.",
        goi_y=("Gạch chân cụm từ chỉ quan hệ.",
               "“Nhiều hơn, ít hơn” dùng cộng, trừ.",
               "“Gấp … lần” dùng nhân; “kém … lần” dùng chia."),
        pt_dang="Quan hệ nhiều hơn – ít hơn, gấp – kém",
        pt_kien_thuc="Bốn phép tính, từ khoá chỉ quan hệ",
        pt_du_lieu="Các cụm “nhiều hơn”, “ít hơn”, “gấp … lần”, “kém … lần”",
        pt_phuong_phap="Đọc vị từ khoá → chọn phép tính",
        pt_nhanh="Kết quả lớn hơn hay bé hơn số đã cho? Trả lời được là biết ngay phép tính.",
        tuong_tu=("An có 12 quyển vở, Bình có gấp 3 lần An. Bình có mấy quyển?", "36"),
        chu_y="Gấp và kém dùng hai phép tính ngược nhau",
    )


@dang_ky("D-M1-04", "D", "M1", tu_khoa=("rút về đơn vị",), thuc_te=True)
def d_m1_04(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        n1 = rng.randint(2, 12)
        don = rng.randint(3, 60)
        n2 = rng.randint(2, 20)
        hang, dv = rng.choice(HANG_HOA)
        y.append((f"{sv(n1)} bao {hang} nặng {sv(n1 * don)} {dv}. "
                  f"Hỏi {sv(n2)} bao như thế nặng bao nhiêu {dv}?", sv(n2 * don)))
    return Bai(
        tieu_de="Bài toán rút về đơn vị",
        dan="Giải bằng phương pháp rút về đơn vị.",
        y=y,
        huong_giai="Bước 1 — rút về đơn vị: tìm giá trị của **một** đơn vị bằng phép chia. "
                   "Bước 2: nhân giá trị một đơn vị với số đơn vị cần tìm.",
        td=["TD1", "TD3"],
        diem_chot="Bước rút về đơn vị luôn là phép **chia**, và phải làm trước.",
        loi="Nhân ngay hai số đã cho mà bỏ qua bước chia.",
        phong="Viết rõ câu “Một bao nặng … kg” trước khi làm bước hai.",
        goi_y=("Một bao nặng bao nhiêu?",
               "Lấy tổng khối lượng chia cho số bao.",
               "Nhân kết quả với số bao cần tìm."),
        pt_dang="Rút về đơn vị",
        pt_kien_thuc="Đại lượng tỉ lệ thuận, phép chia và phép nhân",
        pt_du_lieu="Cho giá trị của một nhóm, hỏi giá trị của nhóm khác cùng loại",
        pt_phuong_phap="Chia để rút về một đơn vị rồi nhân",
        pt_nhanh="Nếu số bao mới gấp đôi số bao cũ thì khối lượng cũng gấp đôi — dùng "
                 "tỉ số để bỏ qua bước chia.",
        tuong_tu=("5 bao gạo nặng 250 kg. Hỏi 8 bao nặng bao nhiêu kg?", "400 kg"),
    )


# ══════════════════════════════════ MỨC M2 ══════════════════════════════════

@dang_ky("D-M2-01", "D", "M2", tu_khoa=("tổng hiệu", "lời văn"), thuc_te=True)
def d_m2_01(rng, lop):
    y = []
    for boi in luan_phien(rng, ["lop", "kho", "to"], rng.randint(4, 6)):
        tong, hieu, lon, be = cap_tong_hieu(rng, 60, 900)
        if boi == "lop":
            l1, l2 = rng.sample(LOP_HOC, 2)
            y.append((f"Hai lớp {l1} và {l2} có tất cả {sv(tong)} quyển sách. Lớp {l1} "
                      f"có nhiều hơn lớp {l2} {sv(hieu)} quyển. Mỗi lớp có bao nhiêu quyển?",
                      f"{l1}: {sv(lon)} quyển, {l2}: {sv(be)} quyển"))
        elif boi == "kho":
            k1, k2 = rng.sample(NOI_CHON, 2)
            hang, dv = rng.choice(HANG_HOA)
            y.append((f"{hoa(k1)} và {k2} chứa tất cả {sv(tong)} {dv} {hang}. "
                      f"{hoa(k1)} chứa nhiều hơn {k2} {sv(hieu)} {dv}. "
                      f"Mỗi nơi chứa bao nhiêu {dv}?",
                      f"{k1}: {sv(lon)} {dv}, {k2}: {sv(be)} {dv}"))
        else:
            t1, t2 = rng.sample(TO_DOI, 2)
            y.append((f"{hoa(t1)} và {t2} trồng được {sv(tong)} cây. {hoa(t1)} "
                      f"trồng nhiều hơn {t2} {sv(hieu)} cây. Mỗi tổ trồng bao nhiêu cây?",
                      f"{t1}: {sv(lon)} cây, {t2}: {sv(be)} cây"))
    return Bai(
        tieu_de="Bài toán tổng – hiệu có lời văn",
        dan="Tóm tắt bằng sơ đồ đoạn thẳng rồi giải.",
        y=y,
        huong_giai="Đọc đề, xác định đâu là **tổng**, đâu là **hiệu**. Vẽ sơ đồ hai đoạn "
                   "thẳng. Số lớn = (tổng + hiệu) : 2; số bé = tổng − số lớn.",
        td=["TD2", "TD3"],
        diem_chot="Cụm “có tất cả” cho **tổng**; cụm “nhiều hơn” cho **hiệu**.",
        loi="Nhầm hiệu thành tổng khi đề diễn đạt vòng vo.",
        phong="Ghi riêng ra hai dòng: Tổng = … ; Hiệu = … trước khi tính.",
        goi_y=("Câu nào cho biết tổng của hai đại lượng?",
               "Câu nào cho biết chúng hơn kém nhau bao nhiêu?",
               "Vẽ sơ đồ rồi áp công thức."),
        pt_dang="Tổng – hiệu có lời văn",
        pt_kien_thuc="Công thức tổng – hiệu, sơ đồ đoạn thẳng",
        pt_du_lieu="“Có tất cả …” và “… nhiều hơn … là …”",
        pt_phuong_phap="Đọc vị tổng và hiệu → sơ đồ → công thức",
        pt_nhanh="Tìm số lớn trước rồi lấy tổng trừ đi, khỏi phải chia hai lần.",
        tuong_tu=("Hai lớp có 90 quyển sách, lớp A nhiều hơn lớp B 10 quyển. "
                  "Mỗi lớp có mấy quyển?", "50 và 40"),
    )


@dang_ky("D-M2-02", "D", "M2", tu_khoa=("trung bình cộng", "lời văn"), thuc_te=True)
def d_m2_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        n = rng.randint(3, 6)
        ds, tb = bo_so_tbc(rng, n, 20, 300)
        kieu = rng.choice(["tim_tb", "tim_thieu", "tim_tong"])
        if kieu == "tim_tb":
            y.append((f"{sv(n)} ngày đầu tuần một cửa hàng bán được lần lượt "
                      f"{', '.join(sv(x) for x in ds)} kg gạo. Trung bình mỗi ngày cửa "
                      f"hàng bán được bao nhiêu ki-lô-gam gạo?", sv(tb) + " kg"))
        elif kieu == "tim_thieu":
            y.append((f"Trung bình mỗi ngày cửa hàng bán được {sv(tb)} kg gạo. "
                      f"{sv(n - 1)} ngày đầu bán được {', '.join(sv(x) for x in ds[:-1])} kg. "
                      f"Ngày cuối bán được bao nhiêu ki-lô-gam?", sv(ds[-1]) + " kg"))
        else:
            y.append((f"Trung bình mỗi ngày bán được {sv(tb)} kg gạo. Hỏi {sv(n)} ngày "
                      f"bán được tất cả bao nhiêu ki-lô-gam?", sv(tb * n) + " kg"))
    return Bai(
        tieu_de="Trung bình cộng trong tình huống thực tế",
        dan="Giải từng bài toán nhỏ.",
        y=y,
        huong_giai="Ba dạng ngược nhau: biết các số tìm trung bình cộng (cộng rồi chia); "
                   "biết trung bình cộng tìm tổng (nhân); biết trung bình cộng và một số "
                   "số hạng, tìm số hạng còn thiếu (lấy tổng trừ đi các số đã biết).",
        td=["TD2", "TD3"],
        diem_chot="Từ trung bình cộng luôn tìm được **tổng** trước, rồi mới tính tiếp.",
        loi="Đi tìm ngay số còn thiếu mà chưa tính tổng.",
        phong="Bước đầu tiên luôn viết: “Tổng = trung bình cộng × số ngày”.",
        goi_y=("Đề cho gì và hỏi gì?",
               "Tính tổng trước bằng cách nhân trung bình cộng với số lượng.",
               "Lấy tổng trừ các số đã biết để ra số còn thiếu."),
        pt_dang="Ba dạng bài trung bình cộng",
        pt_kien_thuc="Quan hệ tổng – số lượng – trung bình cộng",
        pt_du_lieu="Cụm “trung bình mỗi …”",
        pt_phuong_phap="Đi qua tổng làm trung gian",
        pt_nhanh="Tổng = trung bình cộng × số lượng — công thức cầu nối của mọi dạng.",
        tuong_tu=("Trung bình mỗi ngày bán 40 kg, hỏi 5 ngày bán bao nhiêu?", "200 kg"),
    )


@dang_ky("D-M2-03", "D", "M2", lop=(4, 5), tu_khoa=("tỉ lệ thuận", "rút về đơn vị"), thuc_te=True)
def d_m2_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        don = rng.randint(4, 90)
        n1 = rng.randint(3, 15)
        n2 = rng.randint(3, 30)
        kieu = rng.choice(["tim_tong", "tim_so_luong"])
        if kieu == "tim_tong":
            y.append((f"Mua {sv(n1)} quyển vở hết {sv(n1 * don)} nghìn đồng. "
                      f"Mua {sv(n2)} quyển vở như thế hết bao nhiêu nghìn đồng?",
                      sv(n2 * don) + " nghìn đồng"))
        else:
            y.append((f"Mua {sv(n1)} quyển vở hết {sv(n1 * don)} nghìn đồng. "
                      f"Với {sv(n2 * don)} nghìn đồng thì mua được bao nhiêu quyển vở "
                      f"như thế?", sv(n2) + " quyển"))
    return Bai(
        tieu_de="Đại lượng tỉ lệ thuận",
        dan="Giải bằng cách rút về đơn vị hoặc dùng tỉ số.",
        y=y,
        huong_giai="Số vở tăng bao nhiêu lần thì số tiền tăng bấy nhiêu lần. Có hai cách: "
                   "rút về đơn vị (tìm giá một quyển rồi nhân) hoặc dùng tỉ số (số vở mới "
                   "gấp mấy lần số vở cũ thì tiền cũng gấp bấy nhiêu lần).",
        td=["TD2", "TD3"],
        diem_chot="Hai đại lượng **cùng tăng, cùng giảm** thì tỉ lệ thuận.",
        loi="Nhân chia ngược chiều vì tưởng là tỉ lệ nghịch.",
        phong="Tự hỏi: mua nhiều hơn thì trả nhiều hơn hay ít hơn?",
        goi_y=("Mua nhiều vở hơn thì tiền nhiều hơn hay ít hơn?",
               "Tìm giá của một quyển vở.",
               "Nhân giá một quyển với số quyển cần mua."),
        pt_dang="Tỉ lệ thuận, rút về đơn vị",
        pt_kien_thuc="Đại lượng tỉ lệ thuận",
        pt_du_lieu="Hai đại lượng cùng tăng cùng giảm",
        pt_phuong_phap="Rút về đơn vị hoặc dùng tỉ số",
        pt_nhanh="Nếu số lượng mới gấp số lượng cũ một số nguyên lần thì nhân thẳng, "
                 "không cần rút về đơn vị.",
        tuong_tu=("Mua 4 quyển vở hết 24 nghìn. Mua 10 quyển hết bao nhiêu?", "60 nghìn"),
    )


@dang_ky("D-M2-04", "D", "M2", lop=(4, 5), tu_khoa=("tỉ lệ nghịch",), thuc_te=True)
def d_m2_04(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        cong = rng.choice([24, 36, 48, 60, 72, 120])
        n1 = rng.choice([d for d in (2, 3, 4, 6, 8) if cong % d == 0])
        n2 = rng.choice([d for d in (2, 3, 4, 5, 6, 10, 12) if cong % d == 0 and d != n1])
        y.append((f"{sv(n1)} người làm xong một công việc trong {sv(cong // n1)} ngày. "
                  f"Hỏi {sv(n2)} người (làm khoẻ như nhau) làm xong công việc đó trong "
                  f"bao nhiêu ngày?", sv(cong // n2) + " ngày"))
    return Bai(
        tieu_de="Đại lượng tỉ lệ nghịch",
        dan="Giải bằng cách quy về tổng số ngày công.",
        y=y,
        huong_giai="Tổng số ngày công là không đổi: số người × số ngày = hằng số. "
                   "Tính tổng số ngày công trước, rồi chia cho số người mới để ra số ngày mới.",
        td=["TD2", "TD3"],
        diem_chot="Càng nhiều người thì càng **ít** ngày — đại lượng biến đổi **ngược chiều**.",
        loi="Nhân chia như tỉ lệ thuận nên càng nhiều người lại càng lâu.",
        phong="Ước lượng trước: kết quả phải lớn hơn hay bé hơn số ngày ban đầu?",
        goi_y=("Nhiều người hơn thì làm nhanh hơn hay chậm hơn?",
               "Tính tổng số ngày công: số người × số ngày.",
               "Chia tổng số ngày công cho số người mới."),
        pt_dang="Tỉ lệ nghịch",
        pt_kien_thuc="Đại lượng tỉ lệ nghịch, tổng số ngày công",
        pt_du_lieu="Số người tăng thì thời gian giảm",
        pt_phuong_phap="Quy về tổng số ngày công rồi chia",
        pt_nhanh="Số người gấp đôi thì số ngày giảm một nửa — nhẩm được ngay khi tỉ số đẹp.",
        tuong_tu=("6 người làm xong trong 8 ngày. 12 người làm xong trong mấy ngày?",
                  "4 ngày"),
        bay="Ngược chiều chứ không cùng chiều",
    )


# ══════════════════════════════════ MỨC M3 ══════════════════════════════════

@dang_ky("D-M3-01", "D", "M3", lop=(4, 5), tu_khoa=("tổng tỉ", "tìm hai số"), thuc_te=True)
def d_m3_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a, b = ti_so(rng)
        phan = rng.randint(6, 120)
        be, lon = a * phan, b * phan
        tong = be + lon
        t1, t2 = rng.sample(TO_DOI, 2)
        y.append((f"{hoa(t1)} và {t2} trồng được tất cả {sv(tong)} cây. "
                  f"Số cây của {t1} bằng {ps(Fraction(a, b))} số cây của {t2}. "
                  f"Mỗi tổ trồng được bao nhiêu cây?",
                  f"{t1}: {sv(be)} cây, {t2}: {sv(lon)} cây"))
    return Bai(
        tieu_de="Tìm hai số khi biết tổng và tỉ số",
        dan="Vẽ sơ đồ đoạn thẳng rồi giải.",
        y=y,
        huong_giai="Tỉ số cho biết số phần bằng nhau của mỗi đại lượng. Tổng số phần = "
                   "số phần thứ nhất + số phần thứ hai. Giá trị một phần = tổng : tổng số "
                   "phần. Nhân giá trị một phần với số phần của từng đại lượng.",
        td=["TD3", "TD2"],
        diem_chot="Phải tính **tổng số phần** trước khi chia.",
        loi="Chia tổng cho một trong hai số của tỉ số thay vì cho tổng số phần.",
        phong="Vẽ sơ đồ, đếm tổng số đoạn nhỏ trên cả hai đoạn thẳng.",
        goi_y=("Vẽ đại lượng thứ nhất mấy phần, thứ hai mấy phần?",
               "Tổng cộng có bao nhiêu phần bằng nhau?",
               "Một phần bằng bao nhiêu?"),
        pt_dang="Bài toán tổng – tỉ",
        pt_kien_thuc="Tỉ số, sơ đồ đoạn thẳng, chia theo tỉ lệ",
        pt_du_lieu="Đề cho **tổng** và **tỉ số** (phân số hoặc “gấp … lần”)",
        pt_phuong_phap="Sơ đồ phần bằng nhau → giá trị một phần → nhân",
        pt_nhanh="Tổng luôn chia hết cho tổng số phần — nếu không chia hết là đọc sai tỉ số.",
        tuong_tu=("Hai tổ trồng 120 cây, số cây tổ Một bằng 1 phần 2 tổ Hai. "
                  "Mỗi tổ trồng mấy cây?", "40 và 80"),
    )


@dang_ky("D-M3-02", "D", "M3", lop=(4, 5), tu_khoa=("hiệu tỉ", "tìm hai số"), thuc_te=True)
def d_m3_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a, b = ti_so(rng)
        phan = rng.randint(6, 120)
        be, lon = a * phan, b * phan
        hieu = lon - be
        n1, n2 = rng.sample(NOI_CHON, 2)
        hang, dv = rng.choice(HANG_HOA)
        y.append((f"{hoa(n2)} chứa nhiều hơn {n1} {sv(hieu)} {dv} {hang}. "
                  f"Số {hang} ở {n1} bằng {ps(Fraction(a, b))} số {hang} ở {n2}. "
                  f"Mỗi nơi chứa bao nhiêu {dv}?",
                  f"{n1}: {sv(be)} {dv}, {n2}: {sv(lon)} {dv}"))
    return Bai(
        tieu_de="Tìm hai số khi biết hiệu và tỉ số",
        dan="Vẽ sơ đồ đoạn thẳng rồi giải.",
        y=y,
        huong_giai="Hiệu số phần = số phần lớn − số phần bé. Giá trị một phần = hiệu : "
                   "hiệu số phần. Sau đó nhân với số phần của từng đại lượng.",
        td=["TD3", "TD2"],
        diem_chot="Chia cho **hiệu số phần**, không phải tổng số phần.",
        loi="Dùng nhầm công thức của tổng – tỉ cho bài hiệu – tỉ.",
        phong="Đọc kĩ: đề cho “tổng” hay cho “nhiều hơn”? Ghi rõ ra trước khi vẽ.",
        goi_y=("Đề cho tổng hay cho hiệu?",
               "Vẽ sơ đồ, phần dôi ra ứng với hiệu.",
               "Hiệu chia cho hiệu số phần ra giá trị một phần."),
        pt_dang="Bài toán hiệu – tỉ",
        pt_kien_thuc="Tỉ số, sơ đồ đoạn thẳng",
        pt_du_lieu="Đề cho **hiệu** và **tỉ số**",
        pt_phuong_phap="Sơ đồ → hiệu số phần → giá trị một phần",
        pt_nhanh="Hiệu luôn chia hết cho hiệu số phần — dùng để kiểm tra đã đọc đúng tỉ số chưa.",
        tuong_tu=("Số lớn hơn số bé 24, số bé bằng 1 phần 3 số lớn. Tìm hai số.",
                  "12 và 36"),
        bay="Hiệu số phần chứ không phải tổng số phần",
    )


@dang_ky("D-M3-03", "D", "M3", lop=(4, 5), tu_khoa=("tuổi", "tổng hiệu tỉ"), thuc_te=True)
def d_m3_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        k = rng.randint(2, 5)
        tuoi_con = rng.randint(6, 14)
        tuoi_bo = tuoi_con * k
        nam = rng.randint(2, 8)
        kieu = rng.choice(["hien_tai", "tuong_lai", "qua_khu"])
        if kieu == "hien_tai":
            y.append((f"Tuổi bố gấp {sv(k)} lần tuổi con. Tổng số tuổi của hai bố con là "
                      f"{sv(tuoi_bo + tuoi_con)} tuổi. Tính tuổi mỗi người.",
                      f"bố {sv(tuoi_bo)} tuổi, con {sv(tuoi_con)} tuổi"))
        elif kieu == "tuong_lai":
            y.append((f"Hiện nay bố {sv(tuoi_bo)} tuổi, con {sv(tuoi_con)} tuổi. "
                      f"Sau {sv(nam)} năm nữa, tổng số tuổi hai bố con là bao nhiêu?",
                      sv(tuoi_bo + tuoi_con + 2 * nam) + " tuổi"))
        else:
            y.append((f"Hiện nay bố {sv(tuoi_bo)} tuổi, con {sv(tuoi_con)} tuổi. "
                      f"Cách đây {sv(min(nam, tuoi_con - 1))} năm, bố hơn con bao nhiêu tuổi?",
                      sv(tuoi_bo - tuoi_con) + " tuổi"))
    return Bai(
        tieu_de="Bài toán về tuổi",
        dan="Chú ý điều gì thay đổi và điều gì không đổi theo thời gian.",
        y=y,
        huong_giai="**Hiệu số tuổi của hai người không bao giờ thay đổi.** Còn tổng số "
                   "tuổi thì mỗi năm tăng thêm đúng bằng số người. Tỉ số tuổi thì thay đổi "
                   "theo từng năm.",
        td=["TD2", "TD6"],
        diem_chot="Hiệu tuổi là đại lượng **bất biến** — chìa khoá của mọi bài toán tuổi.",
        loi="Cộng thêm số năm vào cả hiệu số tuổi.",
        phong="Kẻ bảng ba dòng: trước kia – hiện nay – sau này, ghi rõ tuổi từng người.",
        goi_y=("Sau mỗi năm, mỗi người tăng thêm mấy tuổi?",
               "Hiệu số tuổi có thay đổi không?",
               "Tổng số tuổi hai người tăng thêm bao nhiêu sau mỗi năm?"),
        pt_dang="Bài toán tuổi",
        pt_kien_thuc="Bất biến hiệu số tuổi, tổng – hiệu, tổng – tỉ",
        pt_du_lieu="Xuất hiện mốc thời gian: hiện nay, sau … năm, cách đây … năm",
        pt_phuong_phap="Kẻ bảng thời gian, bám vào hiệu tuổi không đổi",
        pt_nhanh="Tổng tuổi của n người sau k năm tăng thêm đúng n × k.",
        tuong_tu=("Bố hơn con 30 tuổi. Sau 5 năm nữa bố hơn con bao nhiêu tuổi?", "30 tuổi"),
        bay="Hiệu số tuổi không đổi",
    )


@dang_ky("D-M3-04", "D", "M3", lop=(4, 5), tu_khoa=("hai bước", "lời văn", "phân số"), thuc_te=True)
def d_m3_04(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        m = rng.choice([2, 3, 4, 5])
        n = rng.choice([2, 3, 4, 5])
        tong = m * n * rng.randint(3, 40)
        p1 = tong // m
        con = tong - p1
        p2 = con // n
        y.append((f"Một cửa hàng có {sv(tong)} kg gạo. Ngày đầu bán {ps(Fraction(1, m))} "
                  f"số gạo, ngày thứ hai bán {ps(Fraction(1, n))} số gạo còn lại. "
                  f"Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?",
                  sv(con - p2) + " kg"))
    return Bai(
        tieu_de="Tìm phân số của một số qua hai bước",
        dan="Đọc kĩ “của số nào” trước khi tính.",
        y=y,
        huong_giai="Bước 1: tính số gạo bán ngày đầu bằng cách lấy tổng nhân với phân số. "
                   "Bước 2: tính số gạo **còn lại** sau ngày đầu. Bước 3: phân số của ngày "
                   "thứ hai tính trên **số còn lại**, không phải trên tổng ban đầu.",
        td=["TD2", "TD3"],
        diem_chot="Cụm “số gạo **còn lại**” đổi hẳn số bị nhân ở bước hai.",
        loi="Lấy cả hai phân số nhân với tổng ban đầu.",
        phong="Sau mỗi bước, viết rõ “còn lại … kg” rồi mới sang bước sau.",
        goi_y=("Ngày đầu bán bao nhiêu ki-lô-gam?",
               "Sau ngày đầu còn lại bao nhiêu?",
               "Phân số của ngày thứ hai tính trên số nào?"),
        pt_dang="Tìm phân số của một số, nhiều bước",
        pt_kien_thuc="Tìm phân số của một số",
        pt_du_lieu="Cụm “… số còn lại”, “… số đó”",
        pt_phuong_phap="Tính tuần tự, sau mỗi bước ghi lại số còn lại",
        pt_nhanh="Còn lại sau ngày đầu là (1 − phân số) của tổng; nhân trực tiếp cho nhanh.",
        tuong_tu=("Có 60 kg gạo, bán 1 phần 3 rồi bán tiếp 1 phần 2 số còn lại. "
                  "Còn bao nhiêu?", "20 kg"),
        bay="Phân số của số còn lại, không phải của tổng",
    )


# ══════════════════════════════════ MỨC M4 ══════════════════════════════════

@dang_ky("D-M4-01", "D", "M4", lop=(5,), tu_khoa=("chuyển động", "ngược chiều"), thuc_te=True)
def d_m4_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["nguoc", "cung"], rng.randint(4, 6)):
        v1 = rng.choice([30, 35, 40, 45, 48, 50, 54, 60])
        v2 = rng.choice([10, 12, 15, 20, 24, 25])
        if kieu == "nguoc":
            v = v1 + v2
            gio = rng.choice([1, 2, 3, 4])
            s = v * gio
            y.append((f"Hai xe khởi hành cùng lúc từ hai địa điểm cách nhau {sv(s)} km "
                      f"và đi ngược chiều để gặp nhau. Xe thứ nhất đi {sv(v1)} km/giờ, "
                      f"xe thứ hai đi {sv(v2)} km/giờ. Sau bao lâu hai xe gặp nhau?",
                      sv(gio) + " giờ"))
        else:
            v = v1 - v2
            if v <= 0:
                v1, v2 = v2 + 10, v2
                v = 10
            gio = rng.choice([1, 2, 3, 4])
            s = v * gio
            y.append((f"Một xe máy đi {sv(v2)} km/giờ khởi hành trước. Cùng lúc đó một "
                      f"ô tô đi {sv(v1)} km/giờ đuổi theo từ điểm cách xe máy {sv(s)} km. "
                      f"Sau bao lâu ô tô đuổi kịp xe máy?", sv(gio) + " giờ"))
    return Bai(
        tieu_de="Hai chuyển động ngược chiều và cùng chiều",
        dan="Xác định rõ hai xe lại gần nhau hay đuổi nhau.",
        y=y,
        huong_giai="Ngược chiều gặp nhau: mỗi giờ hai xe lại gần nhau một quãng bằng "
                   "**tổng** hai vận tốc; thời gian gặp = quãng cách : tổng vận tốc. "
                   "Cùng chiều đuổi nhau: mỗi giờ khoảng cách rút ngắn một quãng bằng "
                   "**hiệu** hai vận tốc; thời gian đuổi kịp = quãng cách : hiệu vận tốc.",
        td=["TD3", "TD2"],
        diem_chot="Ngược chiều dùng **tổng** vận tốc, cùng chiều dùng **hiệu** vận tốc.",
        loi="Dùng tổng vận tốc cho bài đuổi nhau.",
        phong="Vẽ mũi tên chỉ hướng hai xe trước khi chọn công thức.",
        goi_y=("Hai xe đi lại gần nhau hay đuổi theo nhau?",
               "Mỗi giờ khoảng cách giữa hai xe thay đổi bao nhiêu ki-lô-mét?",
               "Lấy khoảng cách ban đầu chia cho lượng thay đổi mỗi giờ."),
        pt_dang="Chuyển động ngược chiều, cùng chiều",
        pt_kien_thuc="Quan hệ quãng đường – vận tốc – thời gian",
        pt_du_lieu="“Đi ngược chiều để gặp nhau”, “đuổi theo”",
        pt_phuong_phap="Xác định chiều → tổng hay hiệu vận tốc → chia",
        pt_nhanh="Vẽ hai mũi tên: chụm vào nhau thì cộng, cùng hướng thì trừ.",
        tuong_tu=("Hai xe cách nhau 100 km đi ngược chiều, vận tốc 30 và 20 km/giờ. "
                  "Sau mấy giờ gặp nhau?", "2 giờ"),
        bay="Tổng hay hiệu vận tốc",
    )


@dang_ky("D-M4-02", "D", "M4", lop=(5,), tu_khoa=("công việc chung", "làm chung"), thuc_te=True)
def d_m4_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.choice([2, 3, 4, 5, 6, 8, 10, 12])
        b = rng.choice([d for d in (2, 3, 4, 6, 8, 12, 15, 20) if d != a])
        chung = Fraction(1, Fraction(1, a) + Fraction(1, b))
        y.append((f"Người thứ nhất làm một mình xong công việc trong {sv(a)} giờ, "
                  f"người thứ hai làm một mình xong trong {sv(b)} giờ. Nếu hai người "
                  f"cùng làm thì sau bao lâu xong công việc?", gio_phut(chung)))
    return Bai(
        tieu_de="Bài toán làm chung một công việc",
        dan="Coi cả công việc là 1 đơn vị.",
        y=y,
        huong_giai="Coi cả công việc là 1. Người làm xong trong a giờ thì mỗi giờ làm "
                   "được 1 phần a công việc. Cùng làm thì mỗi giờ cả hai làm được tổng hai "
                   "phân số đó. Thời gian làm chung = 1 chia cho năng suất chung.",
        td=["TD3", "TD6"],
        diem_chot="Cộng **năng suất mỗi giờ**, tuyệt đối không cộng thời gian.",
        loi="Cộng hai khoảng thời gian rồi chia đôi.",
        phong="Luôn viết dòng “Mỗi giờ người thứ nhất làm được … công việc” trước.",
        goi_y=("Mỗi giờ người thứ nhất làm được mấy phần công việc?",
               "Mỗi giờ cả hai làm được mấy phần?",
               "Lấy 1 chia cho phần làm được trong một giờ."),
        pt_dang="Công việc chung",
        pt_kien_thuc="Năng suất, phân số, phép chia phân số",
        pt_du_lieu="“Làm một mình trong … giờ”, “cùng làm”",
        pt_phuong_phap="Quy công việc về 1, cộng năng suất",
        pt_nhanh="Thời gian làm chung luôn **bé hơn** thời gian của người làm nhanh nhất — "
                 "dùng để loại đáp số sai ngay.",
        tuong_tu=("Người thứ nhất xong trong 4 giờ, người thứ hai trong 6 giờ. "
                  "Cùng làm thì mấy giờ xong?", "2 giờ 24 phút"),
        bay="Cộng thời gian thay vì cộng năng suất",
    )


@dang_ky("D-M4-03", "D", "M4", lop=(4, 5), tu_khoa=("tổng tỉ", "thay đổi", "nâng cao"), thuc_te=True)
def d_m4_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a, b = ti_so(rng)
        phan = rng.randint(5, 60)
        if (b - a) * phan % 2:             # hiệu phải chẵn thì mới chuyển được
            phan += 1
        x, z = a * phan, b * phan          # x bé, z lớn
        t1, t2 = rng.sample(TO_DOI, 2)
        y.append((f"{hoa(t1)} có {sv(z)} quyển sách, {t2} có {sv(x)} quyển. "
                  f"Hỏi phải chuyển bao nhiêu quyển từ {t1} sang {t2} để số sách hai "
                  f"tổ bằng nhau?", sv((z - x) // 2) + " quyển"))
    return Bai(
        tieu_de="Chuyển bớt để hai phần bằng nhau",
        dan="Chú ý: chuyển đi thì bên này giảm, bên kia tăng.",
        y=y,
        huong_giai="Khi chuyển k đơn vị từ bên nhiều sang bên ít, bên nhiều giảm k còn "
                   "bên ít tăng k, nên hiệu giảm đi **2k**. Muốn hai bên bằng nhau thì "
                   "hiệu phải về 0, vậy k = hiệu : 2.",
        td=["TD3", "TD6"],
        diem_chot="Một lần chuyển làm hiệu thay đổi **gấp đôi** số được chuyển.",
        loi="Chuyển đúng bằng hiệu hai bên nên bên ít lại thành bên nhiều.",
        phong="Thử lại: sau khi chuyển, cộng trừ ra hai số rồi so xem có bằng nhau không.",
        goi_y=("Hiện tại hai bên hơn kém nhau bao nhiêu?",
               "Chuyển 1 quyển thì hiệu giảm mấy quyển?",
               "Muốn hiệu về 0 thì phải chuyển bao nhiêu?"),
        pt_dang="Chuyển đổi giữa hai đại lượng, tổng không đổi",
        pt_kien_thuc="Bất biến tổng, biến thiên hiệu",
        pt_du_lieu="“Chuyển … từ bên này sang bên kia”",
        pt_phuong_phap="Xét đại lượng không đổi (tổng) và đại lượng đổi gấp đôi (hiệu)",
        pt_nhanh="Sau khi chuyển, mỗi bên bằng nửa tổng — tính nửa tổng rồi trừ là ra ngay.",
        tuong_tu=("Tổ Một có 30 quyển, tổ Hai có 20 quyển. Chuyển mấy quyển để bằng nhau?",
                  "5 quyển"),
        bay="Hiệu thay đổi gấp đôi số chuyển",
    )


# ══════════════════════════════════ MỨC M5 ══════════════════════════════════

@dang_ky("D-M5-01", "D", "M5", lop=(4, 5), tu_khoa=("tổng tỉ", "thay đổi tỉ số", "nâng cao"))
def d_m5_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        k1 = rng.randint(2, 5)
        k2 = rng.randint(k1 + 1, 9)
        be = rng.randint(4, 60)
        lon = be * k1
        them = be * k2 - lon                       # thêm vào số lớn để tỉ số thành k2
        y.append((f"Số lớn gấp {sv(k1)} lần số bé và tổng hai số là {sv(be + lon)}. "
                  f"Phải thêm vào số lớn bao nhiêu đơn vị để số lớn gấp {sv(k2)} lần "
                  f"số bé?", sv(them) + " đơn vị"))
    return Bai(
        tieu_de="Tỉ số thay đổi khi một đại lượng thay đổi",
        dan="Xác định đại lượng nào giữ nguyên.",
        y=y,
        huong_giai="Số bé không thay đổi, nên hãy tìm số bé trước bằng bài toán tổng – tỉ. "
                   "Sau đó tính số lớn mới theo tỉ số mới, rồi lấy số lớn mới trừ số lớn cũ.",
        td=["TD6", "TD3"],
        diem_chot="Tìm cho ra **đại lượng không đổi** rồi lấy nó làm gốc quy chiếu.",
        loi="Lấy hiệu hai tỉ số nhân với tổng ban đầu.",
        phong="Viết rõ ba dòng: số bé, số lớn cũ, số lớn mới.",
        goi_y=("Đại lượng nào không thay đổi trong bài?",
               "Tìm số bé trước bằng tổng – tỉ.",
               "Số lớn mới bằng số bé nhân tỉ số mới."),
        pt_dang="Tổng – tỉ có tỉ số thay đổi",
        pt_kien_thuc="Tổng – tỉ, đại lượng không đổi",
        pt_du_lieu="“Phải thêm (bớt) bao nhiêu để tỉ số trở thành …”",
        pt_phuong_phap="Xác định đại lượng bất biến → tính lại đại lượng kia",
        pt_nhanh="Số cần thêm = số bé × (tỉ số mới − tỉ số cũ).",
        tuong_tu=("Số lớn gấp 2 lần số bé, tổng là 30. Thêm bao nhiêu vào số lớn để nó "
                  "gấp 4 lần số bé?", "20"),
        bay="Đại lượng nào giữ nguyên",
    )


@dang_ky("D-M5-02", "D", "M5", lop=(5,), tu_khoa=("chuyển động", "hai lần gặp", "nâng cao"), thuc_te=True)
def d_m5_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        v1 = rng.choice([36, 40, 45, 48, 50, 54, 60])
        v2 = rng.choice([12, 15, 18, 20, 24, 30])
        gio = rng.choice([2, 3, 4, 5])
        s = (v1 + v2) * gio
        y.append((f"Hai xe đi ngược chiều từ hai địa điểm cách nhau {sv(s)} km, vận tốc "
                  f"{sv(v1)} km/giờ và {sv(v2)} km/giờ. Khi gặp nhau, xe thứ nhất đã đi "
                  f"được bao nhiêu ki-lô-mét?", sv(v1 * gio) + " km"))
    return Bai(
        tieu_de="Quãng đường mỗi xe đi được đến lúc gặp nhau",
        dan="Tính thời gian gặp nhau trước.",
        y=y,
        huong_giai="Tính thời gian gặp nhau bằng quãng cách chia tổng vận tốc. Sau đó "
                   "quãng đường mỗi xe đi được bằng vận tốc của xe đó nhân thời gian ấy. "
                   "Hai quãng đường cộng lại đúng bằng quãng cách ban đầu.",
        td=["TD3", "TD6"],
        diem_chot="Hai xe đi trong **cùng một khoảng thời gian** — đó là mấu chốt.",
        loi="Chia quãng đường theo tỉ lệ sai, hoặc lấy quãng đường chia đôi.",
        phong="Cộng hai quãng đường vừa tính lại, phải đúng bằng quãng cách ban đầu.",
        goi_y=("Mỗi giờ hai xe lại gần nhau bao nhiêu ki-lô-mét?",
               "Sau bao lâu thì gặp nhau?",
               "Quãng đường mỗi xe = vận tốc × thời gian đó."),
        pt_dang="Chuyển động ngược chiều, tính quãng đường từng xe",
        pt_kien_thuc="Quãng đường – vận tốc – thời gian, tỉ lệ thuận",
        pt_du_lieu="Hỏi quãng đường **của một xe** tính đến lúc gặp nhau",
        pt_phuong_phap="Thời gian gặp → quãng đường từng xe",
        pt_nhanh="Quãng đường hai xe đi tỉ lệ thuận với vận tốc — chia quãng cách theo "
                 "tỉ số vận tốc là ra ngay.",
        tuong_tu=("Hai xe cách nhau 150 km, vận tốc 40 và 35 km/giờ, đi ngược chiều. "
                  "Xe nhanh đi được bao nhiêu km đến lúc gặp?", "80 km"),
    )


@dang_ky("D-M5-03", "D", "M5", lop=(4, 5), tu_khoa=("giả thiết tạm", "toán điển hình", "nâng cao"), thuc_te=True)
def d_m5_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        ga = rng.randint(4, 40)
        cho = rng.randint(4, 40)
        con = ga + cho
        chan = ga * 2 + cho * 4
        y.append((f"Vừa gà vừa chó có {sv(con)} con, đếm được tất cả {sv(chan)} chân. "
                  f"Hỏi có bao nhiêu con gà, bao nhiêu con chó?",
                  f"{sv(ga)} con gà, {sv(cho)} con chó"))
    return Bai(
        tieu_de="Bài toán giả thiết tạm — gà và chó",
        dan="Dùng phương pháp giả thiết tạm.",
        y=y,
        huong_giai="Giả sử tất cả đều là gà thì số chân là số con nhân 2. Số chân thiếu "
                   "so với thực tế chính là do mỗi con chó bị tính thiếu 2 chân. Lấy số "
                   "chân thiếu chia cho 2 được số chó, rồi suy ra số gà.",
        td=["TD6", "TD3"],
        diem_chot="Chênh lệch chân của **một** con là 4 − 2 = 2 — đó là số chia.",
        loi="Chia số chân thiếu cho 4 thay vì cho hiệu số chân của hai loài.",
        phong="Thử lại: nhân ngược ra tổng số chân xem có khớp không.",
        goi_y=("Giả sử tất cả đều là gà thì có bao nhiêu chân?",
               "Số chân đó thiếu so với thực tế bao nhiêu?",
               "Mỗi con chó nhiều hơn một con gà mấy chân?"),
        pt_dang="Giả thiết tạm",
        pt_kien_thuc="Phương pháp giả thiết tạm",
        pt_du_lieu="Hai loại đối tượng, biết tổng số và tổng của một đại lượng khác",
        pt_phuong_phap="Giả sử đồng nhất một loại → tính phần chênh → chia cho hiệu đơn vị",
        pt_nhanh="Số chó = (số chân − 2 × số con) : 2 — thuộc công thức rút gọn để nhẩm.",
        tuong_tu=("Có 10 con gà và chó, 28 chân. Có mấy con chó?", "4 con chó"),
        bay="Chia cho hiệu số chân, không phải cho 4",
    )
