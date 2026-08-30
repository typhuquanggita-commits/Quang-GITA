# -*- coding: utf-8 -*-
"""Thư viện mẫu bài v2 — NHÓM D: Toán điển hình & Giải toán có lời văn.

Thế hệ mẫu thứ hai: ngoài mọi trường của thế hệ đầu, mỗi mẫu còn tự viết
**lời giải từng bước có số thật** của chính bài vừa sinh (`giai_mau`), nêu
hướng mở rộng (`mo_rong`) và kiến thức phải có trước (`chuan_bi`).
"""
from __future__ import annotations

from fractions import Fraction

from .khung import (Bai, HANG_HOA, NOI_CHON, TEN, TO_DOI, bo_so_tbc,
                    cap_tong_hieu, dang_ky, hoa, luan_phien, ps, sv)


def ti(rng, tran=6):
    a = rng.randint(1, tran)
    b = rng.randint(1, tran + 1)
    while b == a:
        b = rng.randint(1, tran + 1)
    return min(a, b), max(a, b)


def gio_phut(f: Fraction) -> str:
    g = f.numerator // f.denominator
    ph = (f - g) * 60
    if ph == 0:
        return f"{sv(g)} giờ"
    if ph.denominator == 1:
        return f"{sv(g)} giờ {sv(ph.numerator)} phút" if g else f"{sv(ph.numerator)} phút"
    return f"{ps(f)} giờ"


# ══════════════════════════════ LỚP 3 ══════════════════════════════

@dang_ky("D2-M1-31", "D", "M1", lop=(3,),
         tu_khoa=("hai phép tính", "giải bằng hai phép tính", "ôn tập toán điển hình"),
         dang_bai=("Bài toán giải bằng hai phép tính — dạng cơ bản",
                   "Ôn tập toán điển hình"), thuc_te=True)
def d2_m1_31(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["them", "bot", "gap"], rng.randint(4, 6))):
        a = rng.randint(8, 60)
        b = rng.randint(3, 30)
        t1, t2 = rng.sample(TO_DOI, 2)
        if kieu == "them":
            de = (f"{hoa(t1)} có {sv(a)} lá cờ. {hoa(t2)} có nhiều hơn {t1} {sv(b)} lá cờ. "
                  f"Hỏi cả hai tổ có bao nhiêu lá cờ?")
            dap = sv(a + a + b) + " lá cờ"
            if k == 0:
                buoc = [f"Bước 1 — tìm số lá cờ của {t2}: {sv(a)} + {sv(b)} = {sv(a + b)} (lá cờ).",
                        f"Bước 2 — tìm số lá cờ của cả hai tổ: "
                        f"{sv(a)} + {sv(a + b)} = {sv(2 * a + b)} (lá cờ).",
                        f"Đáp số: **{sv(2 * a + b)} lá cờ**."]
        elif kieu == "bot":
            de = (f"{hoa(t1)} có {sv(a + b)} lá cờ. {hoa(t2)} có ít hơn {t1} {sv(b)} lá cờ. "
                  f"Hỏi cả hai tổ có bao nhiêu lá cờ?")
            dap = sv(2 * a + b) + " lá cờ"
        else:
            m = rng.randint(2, 4)
            de = (f"{hoa(t1)} có {sv(a)} lá cờ. {hoa(t2)} có gấp {sv(m)} lần {t1}. "
                  f"Hỏi cả hai tổ có bao nhiêu lá cờ?")
            dap = sv(a + a * m) + " lá cờ"
        y.append((de, dap))
    return Bai(
        tieu_de="Bài toán giải bằng hai phép tính",
        dan="Mỗi bài trình bày đủ hai bước, mỗi bước một câu lời giải.",
        y=y, giai_mau=buoc,
        huong_giai="Bước 1 tìm đại lượng còn thiếu bằng quan hệ nhiều hơn – ít hơn – gấp. "
                   "Bước 2 mới trả lời câu hỏi của đề. Không được gộp hai bước làm một.",
        td=["TD2", "TD3"],
        diem_chot="Câu hỏi cuối hỏi **cả hai tổ**, nên bước hai bắt buộc phải cộng.",
        loi="Dừng ở bước một, trả lời số lá cờ của một tổ.",
        phong="Đọc lại câu hỏi sau khi tính xong bước một, gạch chân chữ “cả hai”.",
        goi_y=("Tổ thứ hai có bao nhiêu lá cờ?",
               "Đề hỏi một tổ hay cả hai tổ?",
               "Cộng hai kết quả lại rồi mới ghi đáp số."),
        pt_dang="Bài toán giải bằng hai phép tính",
        pt_kien_thuc="Quan hệ nhiều hơn – ít hơn – gấp; phép cộng",
        pt_du_lieu="Đề cho một đại lượng và một quan hệ, câu hỏi hỏi tổng",
        pt_phuong_phap="Tìm đại lượng còn thiếu rồi cộng",
        pt_nhanh="Nếu là quan hệ gấp k lần thì cả hai tổ bằng (k + 1) lần tổ thứ nhất.",
        tuong_tu=("Tổ Một có 12 lá cờ, tổ Hai nhiều hơn 5 lá. Cả hai tổ có mấy lá cờ?",
                  "29 lá cờ"),
        mo_rong="Đổi câu hỏi thành “tổ nào nhiều hơn và nhiều hơn bao nhiêu” để "
                "học sinh phải chọn phép trừ ở bước hai.",
        chuan_bi="Cộng, trừ, nhân trong phạm vi 1 000 và cách viết câu lời giải.",
        chu_y="Đọc kĩ câu hỏi cuối")


@dang_ky("D2-M2-31", "D", "M2", lop=(3,),
         tu_khoa=("tổng hiệu", "sơ đồ đoạn thẳng", "làm quen"),
         dang_bai=("Bài toán tổng – hiệu làm quen bằng sơ đồ đoạn thẳng",
                   "Bài toán tổng – hiệu bằng sơ đồ đoạn thẳng"), thuc_te=True)
def d2_m2_31(rng, lop):
    y, buoc = [], []
    for k in range(rng.randint(4, 6)):
        tong, hieu, lon, be = cap_tong_hieu(rng, 20, 200)
        a, b = rng.sample(TEN, 2)
        y.append((f"{a} và {b} có tất cả {sv(tong)} viên bi. {a} có nhiều hơn {b} "
                  f"{sv(hieu)} viên. Hỏi mỗi bạn có bao nhiêu viên bi?",
                  f"{a}: {sv(lon)} viên, {b}: {sv(be)} viên"))
        if k == 0:
            buoc = [f"Vẽ hai đoạn thẳng: đoạn của {a} dài hơn đoạn của {b} đúng "
                    f"{sv(hieu)} viên.",
                    f"Bước 1 — nếu bớt {sv(hieu)} viên của {a} thì hai đoạn bằng nhau, "
                    f"tổng mới là {sv(tong)} − {sv(hieu)} = {sv(tong - hieu)} (viên).",
                    f"Bước 2 — chia đôi tổng mới được số bi của {b}: "
                    f"{sv(tong - hieu)} : 2 = {sv(be)} (viên).",
                    f"Bước 3 — số bi của {a}: {sv(be)} + {sv(hieu)} = {sv(lon)} (viên).",
                    f"Thử lại: {sv(lon)} + {sv(be)} = {sv(tong)} ✓ và "
                    f"{sv(lon)} − {sv(be)} = {sv(hieu)} ✓",
                    f"Đáp số: **{a} {sv(lon)} viên, {b} {sv(be)} viên**."]
    return Bai(
        tieu_de="Tổng – hiệu bằng sơ đồ đoạn thẳng",
        dan="Vẽ sơ đồ trước, tính sau. Không vẽ thì không được tính.",
        y=y, giai_mau=buoc,
        huong_giai="Vẽ hai đoạn thẳng, đoạn dài hơn đúng phần hiệu. Bớt phần hiệu đi thì "
                   "hai đoạn bằng nhau; chia đôi tổng mới ra số bé, cộng hiệu ra số lớn.",
        td=["TD3", "TD2"],
        diem_chot="**Bớt hiệu rồi mới chia đôi** — đảo thứ tự là sai.",
        loi="Chia đôi tổng ngay rồi cộng hiệu vào cả hai số.",
        phong="Tô phần hiệu bằng bút khác màu trên sơ đồ.",
        goi_y=("Vẽ hai đoạn, đoạn nào dài hơn?",
               "Bớt phần hơn đi thì tổng còn lại bao nhiêu?",
               "Chia đôi tổng mới để ra số bé."),
        pt_dang="Bài toán tổng – hiệu",
        pt_kien_thuc="Sơ đồ đoạn thẳng; số bé = (tổng − hiệu) : 2",
        pt_du_lieu="“Có tất cả …” cho tổng; “nhiều hơn …” cho hiệu",
        pt_phuong_phap="Sơ đồ đoạn thẳng đưa về hai phần bằng nhau",
        pt_nhanh="Tìm số bé trước rồi cộng hiệu, chỉ phải chia một lần.",
        tuong_tu=("Hai bạn có 30 viên bi, bạn thứ nhất nhiều hơn 4 viên. Mỗi bạn mấy viên?",
                  "17 và 13"),
        mo_rong="Giấu tổng: cho biết “nếu bạn thứ nhất cho bạn kia 3 viên thì hai bạn "
                "bằng nhau” để học sinh tự suy ra hiệu.",
        chuan_bi="Cộng, trừ trong phạm vi 1 000 và phép chia cho 2.")


@dang_ky("D2-M3-31", "D", "M3", lop=(3,),
         tu_khoa=("tổng tỉ", "hiệu tỉ", "sơ đồ", "làm quen", "một phần mấy"),
         dang_bai=("Bài toán tổng – tỉ làm quen bằng sơ đồ",
                   "Bài toán hiệu – tỉ làm quen bằng sơ đồ",
                   "So sánh số bé bằng một phần mấy số lớn"), thuc_te=True)
def d2_m3_31(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["tong", "hieu", "mot_phan"],
                                        rng.randint(4, 6))):
        m = rng.randint(2, 5)
        be = rng.randint(4, 30)
        lon = be * m
        t1, t2 = rng.sample(TO_DOI, 2)
        if kieu == "tong":
            de = (f"{hoa(t1)} và {t2} trồng được tất cả {sv(be + lon)} cây. Số cây của "
                  f"{t2} gấp {sv(m)} lần số cây của {t1}. Mỗi tổ trồng bao nhiêu cây?")
            dap = f"{t1}: {sv(be)} cây, {t2}: {sv(lon)} cây"
            if k == 0:
                buoc = [f"Vẽ sơ đồ: {t1} 1 phần, {t2} {sv(m)} phần bằng nhau.",
                        f"Bước 1 — tổng số phần: 1 + {sv(m)} = {sv(m + 1)} (phần).",
                        f"Bước 2 — một phần: {sv(be + lon)} : {sv(m + 1)} = {sv(be)} (cây).",
                        f"Bước 3 — số cây của {t2}: {sv(be)} × {sv(m)} = {sv(lon)} (cây).",
                        f"Thử lại: {sv(be)} + {sv(lon)} = {sv(be + lon)} ✓",
                        f"Đáp số: **{t1} {sv(be)} cây, {t2} {sv(lon)} cây**."]
        elif kieu == "hieu":
            de = (f"{hoa(t2)} trồng nhiều hơn {t1} {sv(lon - be)} cây, và số cây của {t2} "
                  f"gấp {sv(m)} lần số cây của {t1}. Mỗi tổ trồng bao nhiêu cây?")
            dap = f"{t1}: {sv(be)} cây, {t2}: {sv(lon)} cây"
        else:
            de = (f"{hoa(t1)} trồng {sv(be)} cây, {t2} trồng {sv(lon)} cây. Số cây của "
                  f"{t1} bằng một phần mấy số cây của {t2}?")
            dap = ps(Fraction(1, m))
        y.append((de, dap))
    return Bai(
        tieu_de="Tổng – tỉ, hiệu – tỉ và so sánh một phần mấy",
        dan="Vẽ sơ đồ đoạn thẳng cho mọi bài trước khi tính.",
        y=y, giai_mau=buoc,
        huong_giai="Tỉ số cho biết số phần bằng nhau. Bài cho tổng thì chia tổng cho "
                   "**tổng số phần**; bài cho hiệu thì chia hiệu cho **hiệu số phần**. "
                   "So sánh một phần mấy là lấy số bé chia số lớn.",
        td=["TD3", "TD2"],
        diem_chot="Cho tổng thì chia cho tổng số phần, cho hiệu thì chia cho hiệu số phần.",
        loi="Dùng nhầm công thức tổng – tỉ cho bài hiệu – tỉ.",
        phong="Gạch chân “có tất cả” hay “nhiều hơn” trước khi vẽ sơ đồ.",
        goi_y=("Vẽ mỗi tổ mấy phần bằng nhau?",
               "Đề cho tổng hay cho hiệu?",
               "Một phần bằng bao nhiêu?"),
        pt_dang="Tổng – tỉ, hiệu – tỉ mức làm quen",
        pt_kien_thuc="Tỉ số, sơ đồ đoạn thẳng, chia theo tỉ lệ",
        pt_du_lieu="“Gấp … lần” đi cùng “có tất cả” hoặc “nhiều hơn”",
        pt_phuong_phap="Sơ đồ phần bằng nhau → giá trị một phần → nhân",
        pt_nhanh="Tổng chia hết cho tổng số phần; không chia hết là đã đọc sai tỉ số.",
        tuong_tu=("Hai tổ trồng 24 cây, tổ Hai gấp 3 lần tổ Một. Mỗi tổ mấy cây?",
                  "6 và 18"),
        mo_rong="Giấu tỉ số: cho biết “nếu tổ Một trồng thêm 6 cây nữa thì bằng tổ Hai”.",
        chuan_bi="Phép nhân, phép chia trong bảng và cách vẽ sơ đồ đoạn thẳng.",
        bay="Tổng số phần hay hiệu số phần")


@dang_ky("D2-M4-31", "D", "M4", lop=(3,),
         tu_khoa=("tuổi", "mua bán", "tiền hàng", "hai đại lượng tỉ lệ"),
         dang_bai=("Bài toán về tuổi — dạng đơn giản",
                   "Bài toán về mua bán và tiền hàng",
                   "Bài toán về hai đại lượng tỉ lệ"), thuc_te=True)
def d2_m4_31(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["tuoi", "mua_ban", "ti_le"],
                                        rng.randint(4, 6))):
        if kieu == "tuoi":
            con = rng.randint(6, 12)
            m = rng.randint(3, 5)
            me = con * m
            y.append((f"Tuổi mẹ gấp {sv(m)} lần tuổi con. Mẹ hơn con {sv(me - con)} tuổi. "
                      f"Tính tuổi mỗi người.", f"mẹ {sv(me)} tuổi, con {sv(con)} tuổi"))
            if k == 0:
                buoc = [f"Vẽ sơ đồ: tuổi con 1 phần, tuổi mẹ {sv(m)} phần.",
                        f"Bước 1 — hiệu số phần: {sv(m)} − 1 = {sv(m - 1)} (phần).",
                        f"Bước 2 — tuổi con: {sv(me - con)} : {sv(m - 1)} = {sv(con)} (tuổi).",
                        f"Bước 3 — tuổi mẹ: {sv(con)} × {sv(m)} = {sv(me)} (tuổi).",
                        f"Thử lại: {sv(me)} − {sv(con)} = {sv(me - con)} ✓",
                        f"Đáp số: **mẹ {sv(me)} tuổi, con {sv(con)} tuổi**."]
        elif kieu == "mua_ban":
            gia = rng.choice([3, 4, 5, 6, 8, 10]) * 1000
            n = rng.randint(3, 9)
            tra = rng.choice([50, 100]) * 1000
            while tra <= gia * n:
                tra += 50000
            y.append((f"Mua {sv(n)} quyển vở, mỗi quyển {sv(gia)} đồng. Đưa người bán "
                      f"{sv(tra)} đồng. Hỏi được trả lại bao nhiêu tiền?",
                      sv(tra - gia * n) + " đồng"))
        else:
            don = rng.randint(3, 12)
            n1 = rng.randint(2, 8)
            n2 = rng.randint(2, 12)
            y.append((f"{sv(n1)} hộp bút có {sv(n1 * don)} chiếc. Hỏi {sv(n2)} hộp như thế "
                      f"có bao nhiêu chiếc bút?", sv(n2 * don) + " chiếc"))
    return Bai(
        tieu_de="Tuổi, mua bán và hai đại lượng tỉ lệ",
        dan="Trình bày lời giải đủ bước, ghi rõ đơn vị.",
        y=y, giai_mau=buoc,
        huong_giai="Bài tuổi có tỉ số thì làm như hiệu – tỉ. Bài mua bán thì tính tiền "
                   "hàng trước rồi mới trừ. Bài tỉ lệ thì rút về một đơn vị rồi nhân.",
        td=["TD2", "TD3"],
        diem_chot="Ba dạng khác nhau nhưng cùng một thói quen: **tính đại lượng trung gian trước**.",
        loi="Trừ ngay số tiền đưa cho giá một quyển vở.",
        phong="Viết rõ dòng “Tiền hàng là …” trước khi trừ.",
        goi_y=("Đại lượng trung gian cần tìm trước là gì?",
               "Tính nó bằng phép tính nào?",
               "Sau đó mới trả lời câu hỏi của đề."),
        pt_dang="Toán điển hình lớp 3: tuổi, mua bán, tỉ lệ",
        pt_kien_thuc="Hiệu – tỉ; nhân chia rút về đơn vị; phép trừ tiền",
        pt_du_lieu="“Gấp … lần” + “hơn … tuổi”; “đưa … đồng”; “… hộp có … chiếc”",
        pt_phuong_phap="Tìm đại lượng trung gian rồi trả lời câu hỏi",
        pt_nhanh="Bài tỉ lệ có số hộp mới chia hết cho số hộp cũ thì nhân thẳng tỉ số.",
        tuong_tu=("Tuổi mẹ gấp 4 lần tuổi con, mẹ hơn con 27 tuổi. Tính tuổi mỗi người.",
                  "mẹ 36, con 9"),
        mo_rong="Hỏi thêm “sau mấy năm nữa tuổi mẹ gấp 3 lần tuổi con” để chạm tới "
                "tính bất biến của hiệu số tuổi.",
        chuan_bi="Bảng nhân chia, phép trừ có nhớ, và cách viết đơn vị tiền.")


@dang_ky("D2-M5-31", "D", "M5", lop=(3,),
         tu_khoa=("tổng hiệu", "ẩn tổng", "ẩn hiệu", "công việc chung", "tổng ôn"),
         dang_bai=("Bài toán tổng – hiệu nâng cao: ẩn tổng hoặc ẩn hiệu",
                   "Bài toán về công việc chung — làm quen",
                   "Tổng ôn cuối năm — bài toán tổng hợp",
                   "Tổng ôn toán điển hình nâng cao",
                   "Bài toán tổng – tỉ nâng cao với tỉ số ẩn",
                   "Bài toán hiệu – tỉ nâng cao"))
def d2_m5_31(rng, lop):
    tong, hieu, lon, be = cap_tong_hieu(rng, 40, 300)
    chuyen = hieu // 2
    a, b = rng.sample(TEN, 2)
    n = rng.randint(2, 6)
    moi = rng.randint(4, 12)
    y = [(f"{a} và {b} có tất cả {sv(tong)} quyển vở. Nếu {a} cho {b} {sv(chuyen)} quyển "
          f"thì hai bạn có số vở bằng nhau. Hỏi lúc đầu {a} có bao nhiêu quyển?",
          sv(lon if hieu == 2 * chuyen else (tong + 2 * chuyen) // 2) + " quyển"),
         (f"Sau khi cho, mỗi bạn có bao nhiêu quyển vở?", sv(tong // 2) + " quyển"),
         (f"Lúc đầu {b} có bao nhiêu quyển vở?",
          sv(tong - (tong + 2 * chuyen) // 2) + " quyển"),
         (f"Lúc đầu {a} hơn {b} bao nhiêu quyển?", sv(2 * chuyen) + " quyển"),
         (f"Một tổ có {sv(n)} bạn, mỗi bạn gấp được {sv(moi)} bông hoa trong một giờ. "
          f"Hỏi cả tổ gấp được bao nhiêu bông hoa trong một giờ?",
          sv(n * moi) + " bông"),
         (f"Cả tổ phải gấp {sv(n * moi * 3)} bông hoa thì làm trong mấy giờ?", "3 giờ")]
    return Bai(
        tieu_de="Tổng – hiệu khi hiệu bị giấu sau một lần chuyển",
        dan="Chú ý: chuyển đi thì bên này giảm, bên kia tăng.",
        y=y,
        giai_mau=[f"Sau khi cho, hai bạn bằng nhau, nên mỗi bạn có "
                  f"{sv(tong)} : 2 = {sv(tong // 2)} (quyển).",
                  f"{a} đã cho đi {sv(chuyen)} quyển, nên lúc đầu {a} có "
                  f"{sv(tong // 2)} + {sv(chuyen)} = {sv(tong // 2 + chuyen)} (quyển).",
                  f"Lúc đầu {b} có {sv(tong)} − {sv(tong // 2 + chuyen)} = "
                  f"{sv(tong - tong // 2 - chuyen)} (quyển).",
                  f"Hiệu lúc đầu: {sv(tong // 2 + chuyen)} − "
                  f"{sv(tong - tong // 2 - chuyen)} = {sv(2 * chuyen)} (quyển) — "
                  f"đúng bằng hai lần số vở đã chuyển.",
                  f"Đáp số: **lúc đầu {a} có {sv(tong // 2 + chuyen)} quyển**."],
        huong_giai="Tổng không đổi khi chuyển qua lại, nên sau khi cho, mỗi bạn có nửa "
                   "tổng. Từ đó đi ngược lại: cộng phần đã cho để ra số lúc đầu. "
                   "Một lần chuyển làm hiệu thay đổi **gấp đôi** số được chuyển.",
        td=["TD6", "TD3"],
        diem_chot="Tổng là đại lượng **bất biến**; hiệu đổi gấp đôi số chuyển.",
        loi="Cho rằng hiệu lúc đầu bằng đúng số vở đã chuyển.",
        phong="Thử lại: cộng trừ ra hai số lúc đầu rồi kiểm tra cả tổng và hiệu.",
        goi_y=("Khi chuyển vở qua lại, tổng số vở có đổi không?",
               "Sau khi cho, mỗi bạn có bao nhiêu quyển?",
               "Đi ngược lại: lúc đầu bạn cho có nhiều hơn bấy nhiêu quyển."),
        pt_dang="Tổng – hiệu có hiệu ẩn sau một lần chuyển",
        pt_kien_thuc="Bất biến tổng; biến thiên hiệu gấp đôi",
        pt_du_lieu="“Nếu … cho … thì hai bên bằng nhau”",
        pt_phuong_phap="Dùng trạng thái sau khi chuyển làm mốc rồi đi ngược",
        pt_nhanh="Số lúc đầu của bên cho = nửa tổng + số đã chuyển.",
        tuong_tu=("Hai bạn có 40 quyển vở, nếu bạn A cho bạn B 5 quyển thì bằng nhau. "
                  "Lúc đầu A có mấy quyển?", "25 quyển"),
        mo_rong="Đổi thành ba bạn: A cho B, B cho C, cuối cùng ba bạn bằng nhau.",
        chuan_bi="Bài toán tổng – hiệu cơ bản và thói quen thử lại.",
        bay="Hiệu thay đổi gấp đôi số chuyển")


# ══════════════════════════════ LỚP 4 ══════════════════════════════

@dang_ky("D2-M1-41", "D", "M1", lop=(4, 5),
         tu_khoa=("chuyển động", "quãng đường", "thời gian", "làm quen"),
         dang_bai=("Bài toán chuyển động làm quen: quãng đường – thời gian",
                   "Bài toán chuyển động làm quen: quãng đường, vận tốc, thời gian",
                   "Quãng đường — cách tính", "Thời gian — cách tính",
                   "Vận tốc — khái niệm và cách tính"), thuc_te=True)
def d2_m1_41(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["s", "v", "t"], rng.randint(4, 7))):
        v = rng.choice([4, 5, 12, 15, 20, 30, 36, 40, 45, 50, 60])
        t = rng.choice([2, 3, 4, 5, 6])
        s = v * t
        if kieu == "s":
            y.append((f"Một người đi xe đạp với vận tốc {sv(v)} km/giờ trong {sv(t)} giờ. "
                      f"Tính quãng đường đi được.", sv(s) + " km"))
            if k == 0:
                buoc = [f"Mỗi giờ đi được {sv(v)} km, đi trong {sv(t)} giờ.",
                        f"Quãng đường = vận tốc × thời gian = {sv(v)} × {sv(t)} = {sv(s)} (km).",
                        f"Đáp số: **{sv(s)} km**."]
        elif kieu == "v":
            y.append((f"Một người đi {sv(s)} km hết {sv(t)} giờ. Tính vận tốc.",
                      sv(v) + " km/giờ"))
        else:
            y.append((f"Một người đi quãng đường {sv(s)} km với vận tốc {sv(v)} km/giờ. "
                      f"Tính thời gian đi.", sv(t) + " giờ"))
    return Bai(
        tieu_de="Quãng đường – vận tốc – thời gian",
        dan="Ghi rõ đơn vị của từng đại lượng.",
        y=y, giai_mau=buoc,
        huong_giai="Ba công thức từ một quan hệ: s = v × t, v = s : t, t = s : v. "
                   "Đơn vị phải khớp: km/giờ đi với km và giờ.",
        td=["TD1", "TD3"],
        diem_chot="Đơn vị của vận tốc quy định đơn vị của hai đại lượng kia.",
        loi="Vận tốc km/giờ nhưng thời gian lại để bằng phút.",
        phong="Ghi đơn vị bên cạnh mọi số trước khi thay vào công thức.",
        goi_y=("Đề cho hai đại lượng nào?",
               "Đại lượng cần tìm là gì?",
               "Chọn công thức và kiểm tra đơn vị."),
        pt_dang="Ba dạng cơ bản của chuyển động đều",
        pt_kien_thuc="s = v × t",
        pt_du_lieu="Có hai trong ba đại lượng quãng đường, vận tốc, thời gian",
        pt_phuong_phap="Chọn công thức theo đại lượng cần tìm, đồng bộ đơn vị",
        pt_nhanh="Vẽ tam giác: s ở trên, v và t ở dưới; che đại lượng cần tìm là ra công thức.",
        tuong_tu=("Đi 4 giờ với vận tốc 12 km/giờ. Quãng đường bằng bao nhiêu?", "48 km"),
        mo_rong="Đổi thời gian sang phút hoặc quãng đường sang mét để buộc phải đổi đơn vị.",
        chuan_bi="Nhân, chia số tự nhiên và bảng đơn vị đo độ dài, thời gian.",
        chu_y="Đơn vị thời gian")


@dang_ky("D2-M2-41", "D", "M2", lop=(4, 5),
         tu_khoa=("tỉ lệ bản đồ", "tỉ lệ xích"),
         dang_bai=("Bài toán về tỉ lệ bản đồ", "Bài toán về tỉ lệ bản đồ và tỉ lệ thực tế",
                   "Bài toán về tỉ lệ bản đồ và tỉ lệ xích"), thuc_te=True)
def d2_m2_41(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["ra_that", "ve_ban_do"], rng.randint(4, 6))):
        ti_le = rng.choice([100, 500, 1000, 2000, 5000, 10000])
        do_ban_do = rng.randint(2, 30)
        that_cm = do_ban_do * ti_le
        if kieu == "ra_that":
            y.append((f"Trên bản đồ tỉ lệ 1 : {sv(ti_le)}, một đoạn đường đo được "
                      f"{sv(do_ban_do)} cm. Hỏi đoạn đường đó dài bao nhiêu mét trên thực tế?",
                      sv(that_cm // 100) + " m"))
            if k == 0:
                buoc = [f"Tỉ lệ 1 : {sv(ti_le)} nghĩa là 1 cm trên bản đồ ứng với "
                        f"{sv(ti_le)} cm thật.",
                        f"Bước 1 — độ dài thật tính bằng xăng-ti-mét: "
                        f"{sv(do_ban_do)} × {sv(ti_le)} = {sv(that_cm)} (cm).",
                        f"Bước 2 — đổi ra mét: {sv(that_cm)} : 100 = {sv(that_cm // 100)} (m).",
                        f"Đáp số: **{sv(that_cm // 100)} m**."]
        else:
            y.append((f"Một đoạn đường dài {sv(that_cm // 100)} m được vẽ trên bản đồ tỉ lệ "
                      f"1 : {sv(ti_le)}. Trên bản đồ đoạn ấy dài bao nhiêu xăng-ti-mét?",
                      sv(do_ban_do) + " cm"))
    return Bai(
        tieu_de="Tỉ lệ bản đồ",
        dan="Chú ý đổi đơn vị ở bước cuối.",
        y=y, giai_mau=buoc,
        huong_giai="Tỉ lệ 1 : n nghĩa là 1 đơn vị trên bản đồ ứng với n đơn vị thật, "
                   "**cùng một loại đơn vị**. Từ bản đồ ra thật thì nhân với n; từ thật về "
                   "bản đồ thì chia cho n. Đổi đơn vị chỉ làm ở bước cuối.",
        td=["TD2", "TD3"],
        diem_chot="Nhân hay chia với n trước, **đổi đơn vị sau** — làm ngược là rối.",
        loi="Đổi mét sang xăng-ti-mét ngay từ đầu rồi lại nhân tỉ lệ một lần nữa.",
        phong="Viết rõ một dòng: “1 cm bản đồ = … cm thật” trước khi tính.",
        goi_y=("Tỉ lệ 1 : n nghĩa là gì?",
               "Đi từ bản đồ ra thật thì nhân hay chia?",
               "Đổi đơn vị ở bước cuối cùng."),
        pt_dang="Tỉ lệ bản đồ, tỉ lệ xích",
        pt_kien_thuc="Tỉ lệ, đổi đơn vị đo độ dài",
        pt_du_lieu="Có kí hiệu tỉ lệ dạng 1 : n",
        pt_phuong_phap="Nhân hoặc chia theo tỉ lệ rồi đổi đơn vị",
        pt_nhanh="Tỉ lệ 1 : 1 000 thì 1 cm bản đồ đúng bằng 10 m thật.",
        tuong_tu=("Bản đồ tỉ lệ 1 : 1 000, đoạn đo được 5 cm dài bao nhiêu mét thật?",
                  "50 m"),
        mo_rong="Hỏi diện tích: tỉ lệ dài 1 : n thì diện tích gấp n × n lần.",
        chuan_bi="Bảng đơn vị đo độ dài và phép nhân, chia với số tròn nghìn.",
        bay="Đổi đơn vị đúng lúc")


@dang_ky("D2-M3-41", "D", "M3", lop=(4, 5),
         tu_khoa=("tổng tỉ", "hiệu tỉ", "tỉ số ẩn", "hiệu ẩn", "ẩn tổng"),
         dang_bai=("Bài toán tổng – tỉ với tỉ số ẩn", "Bài toán hiệu – tỉ với hiệu ẩn",
                   "Tổng – tỉ: sơ đồ đoạn thẳng và tỉ số ẩn",
                   "Hiệu – tỉ: sơ đồ đoạn thẳng và hiệu ẩn",
                   "Tổng – hiệu: dạng ẩn tổng, ẩn hiệu",
                   "Tổng – hiệu, tổng – tỉ, hiệu – tỉ: các dạng ẩn",
                   "Ôn tập giải toán tổng – tỉ, hiệu – tỉ"), thuc_te=True)
def d2_m3_41(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["ti_an", "hieu_an", "tong_an"],
                                        rng.randint(4, 6))):
        a, b = ti(rng, 5)
        phan = rng.randint(5, 40)
        be, lon = a * phan, b * phan
        n1, n2 = rng.sample(NOI_CHON, 2)
        hang, dv = rng.choice(HANG_HOA)
        if kieu == "ti_an":
            de = (f"{hoa(n1)} và {n2} chứa tất cả {sv(be + lon)} {dv} {hang}. Nếu chia số "
                  f"{hang} ở {n1} thành {sv(a)} phần bằng nhau thì số {hang} ở {n2} bằng "
                  f"{sv(b)} phần như thế. Mỗi nơi chứa bao nhiêu {dv}?")
            dap = f"{n1}: {sv(be)} {dv}, {n2}: {sv(lon)} {dv}"
            if k == 0:
                buoc = [f"Tỉ số bị giấu trong câu “chia thành {sv(a)} phần … bằng {sv(b)} "
                        f"phần như thế”: đó chính là tỉ số {sv(a)} trên {sv(b)}.",
                        f"Bước 1 — tổng số phần: {sv(a)} + {sv(b)} = {sv(a + b)} (phần).",
                        f"Bước 2 — một phần: {sv(be + lon)} : {sv(a + b)} = {sv(phan)} ({dv}).",
                        f"Bước 3 — {n1}: {sv(phan)} × {sv(a)} = {sv(be)} ({dv}); "
                        f"{n2}: {sv(phan)} × {sv(b)} = {sv(lon)} ({dv}).",
                        f"Thử lại: {sv(be)} + {sv(lon)} = {sv(be + lon)} ✓",
                        f"Đáp số: **{n1} {sv(be)} {dv}, {n2} {sv(lon)} {dv}**."]
        elif kieu == "hieu_an":
            de = (f"Số {hang} ở {n2} bằng {ps(Fraction(b, a))} số {hang} ở {n1}. Nếu "
                  f"chuyển {sv((lon - be) // 2 if (lon - be) % 2 == 0 else lon - be)} {dv} "
                  f"từ {n2} sang {n1} thì {n2} vẫn còn nhiều hơn. Biết {n2} hơn {n1} "
                  f"{sv(lon - be)} {dv}, tìm số {hang} mỗi nơi.")
            dap = f"{n1}: {sv(be)} {dv}, {n2}: {sv(lon)} {dv}"
        else:
            de = (f"{hoa(n1)} chứa {sv(be)} {dv} {hang}. Nếu {n1} nhận thêm {sv(lon - be)} "
                  f"{dv} thì bằng số {hang} ở {n2}. Hỏi cả hai nơi chứa bao nhiêu {dv}?")
            dap = sv(be + lon) + f" {dv}"
        y.append((de, dap))
    return Bai(
        tieu_de="Tổng – tỉ, hiệu – tỉ khi một dữ kiện bị giấu",
        dan="Việc đầu tiên là gọi tên dữ kiện bị giấu.",
        y=y, giai_mau=buoc,
        huong_giai="Đề không cho thẳng tổng, hiệu hay tỉ số mà mô tả vòng. Bước bắt buộc "
                   "đầu tiên: **dịch câu mô tả thành một con số** rồi mới vẽ sơ đồ và giải "
                   "như bài chuẩn.",
        td=["TD2", "TD6"],
        diem_chot="Dịch xong dữ kiện ẩn thì bài trở lại **đúng dạng chuẩn**.",
        loi="Lao vào tính khi chưa xác định được tổng, hiệu hay tỉ số.",
        phong="Viết ba dòng trước khi tính: Tổng = … ; Hiệu = … ; Tỉ số = … ; dòng nào "
              "chưa biết thì để trống và đi tìm.",
        goi_y=("Đề đã cho tổng chưa? Cho hiệu chưa? Cho tỉ số chưa?",
               "Câu nào trong đề đang mô tả cái còn thiếu?",
               "Dịch câu đó thành một con số rồi giải như bài chuẩn."),
        pt_dang="Tổng – tỉ, hiệu – tỉ dạng ẩn",
        pt_kien_thuc="Tỉ số, sơ đồ đoạn thẳng, dịch lời văn thành số",
        pt_du_lieu="Đề mô tả vòng thay vì cho số: “nếu … thì …”, “chia thành … phần”",
        pt_phuong_phap="Dịch dữ kiện ẩn thành số rồi áp dạng chuẩn",
        pt_nhanh="Kẻ sẵn ba dòng Tổng – Hiệu – Tỉ số, điền được hai dòng là giải được.",
        tuong_tu=("Hai kho có 120 tấn, kho A bằng 1 phần 3 kho B. Mỗi kho bao nhiêu tấn?",
                  "30 và 90"),
        mo_rong="Giấu hai dữ kiện cùng lúc, buộc học sinh lập luận bắc cầu.",
        chuan_bi="Thành thạo bài tổng – tỉ và hiệu – tỉ ở dạng cho thẳng.",
        bay="Dữ kiện bị giấu sau một câu mô tả")


@dang_ky("D2-M4-41", "D", "M4", lop=(4, 5),
         tu_khoa=("công việc chung", "năng suất", "hai vòi nước"),
         dang_bai=("Bài toán về công việc chung", "Bài toán hai vòi nước, hai người làm chung",
                   "Bài toán về công việc và năng suất — làm quen"), thuc_te=True)
def d2_m4_41(rng, lop):
    y, buoc = [], []
    for k in range(rng.randint(4, 6)):
        a = rng.choice([2, 3, 4, 5, 6, 8, 10, 12])
        b = rng.choice([d for d in (2, 3, 4, 6, 8, 12, 15, 20) if d != a])
        chung = Fraction(a * b, a + b)
        y.append((f"Vòi thứ nhất chảy một mình đầy bể trong {sv(a)} giờ, vòi thứ hai chảy "
                  f"một mình đầy bể trong {sv(b)} giờ. Mở cả hai vòi thì sau bao lâu đầy bể?",
                  gio_phut(chung)))
        if k == 0:
            buoc = [f"Coi cả bể là 1 đơn vị công việc.",
                    f"Bước 1 — mỗi giờ vòi thứ nhất chảy được {ps(Fraction(1, a))} bể, "
                    f"vòi thứ hai chảy được {ps(Fraction(1, b))} bể.",
                    f"Bước 2 — mỗi giờ cả hai vòi chảy được "
                    f"{ps(Fraction(1, a))} + {ps(Fraction(1, b))} = "
                    f"{ps(Fraction(1, a) + Fraction(1, b))} bể.",
                    f"Bước 3 — thời gian đầy bể: 1 : {ps(Fraction(1, a) + Fraction(1, b))} "
                    f"= {ps(chung)} giờ = {gio_phut(chung)}.",
                    f"Kiểm tra nhanh: kết quả phải bé hơn {sv(min(a, b))} giờ ✓",
                    f"Đáp số: **{gio_phut(chung)}**."]
    return Bai(
        tieu_de="Hai vòi nước, hai người cùng làm",
        dan="Coi cả công việc là 1 đơn vị.",
        y=y, giai_mau=buoc,
        huong_giai="Không cộng thời gian, mà cộng **năng suất một giờ**. Người xong trong "
                   "a giờ thì mỗi giờ làm được 1 phần a công việc. Thời gian làm chung bằng "
                   "1 chia cho tổng năng suất.",
        td=["TD3", "TD6"],
        diem_chot="Cộng **năng suất**, tuyệt đối không cộng thời gian.",
        loi="Cộng hai khoảng thời gian rồi chia đôi.",
        phong="Luôn viết dòng “Mỗi giờ vòi thứ nhất chảy được … bể” trước.",
        goi_y=("Mỗi giờ vòi thứ nhất chảy được mấy phần bể?",
               "Mỗi giờ cả hai vòi chảy được mấy phần bể?",
               "Lấy 1 chia cho phần chảy được trong một giờ."),
        pt_dang="Công việc chung",
        pt_kien_thuc="Năng suất, cộng và chia phân số",
        pt_du_lieu="“Làm một mình trong … giờ” đi cùng “cùng làm”",
        pt_phuong_phap="Quy công việc về 1, cộng năng suất, lấy nghịch đảo",
        pt_nhanh="Thời gian làm chung luôn **bé hơn** thời gian của người nhanh nhất — "
                 "dùng để loại đáp số sai ngay lập tức.",
        tuong_tu=("Vòi một đầy bể trong 4 giờ, vòi hai trong 6 giờ. Cả hai vòi mấy giờ đầy?",
                  "2 giờ 24 phút"),
        mo_rong="Thêm vòi thứ ba tháo nước ra, năng suất mang dấu trừ.",
        chuan_bi="Cộng phân số khác mẫu và chia một số cho một phân số.",
        bay="Cộng thời gian thay vì cộng năng suất")


@dang_ky("D2-M5-41", "D", "M5", lop=(4, 5),
         tu_khoa=("tổng nhiều số", "ràng buộc", "đề thi CLC", "tổng ôn", "vào lớp 6"),
         dang_bai=("Bài toán về tổng nhiều số với điều kiện ràng buộc",
                   "Mô phỏng đề thi CLC lớp 4 — phần tự luận",
                   "Tổng ôn cuối năm lớp 4",
                   "Tổng ôn cuối năm — mô phỏng đề thi vào lớp 6",
                   "Bài toán giải bằng hai, ba phép tính",
                   "Bài toán tổng – tỉ và hiệu – tỉ kết hợp"))
def d2_m5_41(rng, lop):
    d = rng.randint(3, 12)
    tb = rng.randint(20, 120)
    ds = [tb - d, tb, tb + d]
    tong = sum(ds)
    a, b = ti(rng, 4)
    phan = rng.randint(5, 30)
    x, z = a * phan, b * phan
    y = [(f"Ba số có tổng {sv(tong)}. Số thứ hai hơn số thứ nhất {sv(d)}, số thứ ba hơn "
          f"số thứ hai {sv(d)}. Tìm số thứ hai.", sv(tb)),
         ("Tìm số thứ nhất.", sv(ds[0])),
         ("Tìm số thứ ba.", sv(ds[2])),
         ("Vì sao số thứ hai bằng tổng ba số chia cho 3?",
          "vì ba số cách đều nên số ở giữa là trung bình cộng"),
         (f"Hai số khác có tổng {sv(x + z)} và số bé bằng {ps(Fraction(a, b))} số lớn. "
          f"Tìm số bé.", sv(x)),
         (f"Tìm số lớn.", sv(z)),
         (f"Hiệu hai số đó bằng bao nhiêu?", sv(z - x))]
    return Bai(
        tieu_de="Tổng nhiều số có ràng buộc — dạng đề thi",
        dan="Bài mô phỏng phần tự luận của đề thi chất lượng cao.",
        y=y,
        giai_mau=[f"Ba số cách đều nhau {sv(d)} đơn vị nên số ở giữa là trung bình cộng.",
                  f"Bước 1 — số thứ hai: {sv(tong)} : 3 = {sv(tb)}.",
                  f"Bước 2 — số thứ nhất: {sv(tb)} − {sv(d)} = {sv(ds[0])}.",
                  f"Bước 3 — số thứ ba: {sv(tb)} + {sv(d)} = {sv(ds[2])}.",
                  f"Thử lại: {sv(ds[0])} + {sv(tb)} + {sv(ds[2])} = {sv(tong)} ✓",
                  f"Đáp số: **{sv(ds[0])}, {sv(tb)}, {sv(ds[2])}**."],
        huong_giai="Với một số lẻ các số cách đều, số ở giữa chính là trung bình cộng — "
                   "tìm nó trước rồi suy ra hai số kia. Phần sau là bài tổng – tỉ chuẩn: "
                   "tổng số phần rồi giá trị một phần.",
        td=["TD4", "TD3", "TD5"],
        diem_chot="Ba số cách đều thì **số giữa = tổng : 3**, không cần đặt ẩn.",
        loi="Đặt ba ẩn rồi giải vòng vo, mất thời gian trong phòng thi.",
        phong="Nhìn ra “cách đều” trước khi đặt bút.",
        goi_y=("Ba số này có cách đều nhau không?",
               "Với ba số cách đều, số nào bằng trung bình cộng?",
               "Tìm số giữa trước rồi lùi và tiến ra hai số kia."),
        pt_dang="Tổng nhiều số có ràng buộc; tổng – tỉ",
        pt_kien_thuc="Trung bình cộng của dãy cách đều; tổng – tỉ",
        pt_du_lieu="Ba số hơn kém nhau cùng một lượng; hoặc tổng đi cùng tỉ số",
        pt_phuong_phap="Tìm số giữa trước; sau đó chia theo tỉ lệ",
        pt_nhanh="Tổng ba số cách đều luôn chia hết cho 3.",
        tuong_tu=("Ba số cách đều có tổng 60, hơn kém nhau 4. Tìm ba số.", "16, 20, 24"),
        mo_rong="Đổi thành bốn số cách đều — khi đó không còn số giữa, phải ghép cặp.",
        chuan_bi="Trung bình cộng, dãy cách đều và bài toán tổng – tỉ.",
        bay="Số lượng chẵn thì không có số giữa")


# ══════════════════════════════ LỚP 5 ══════════════════════════════

@dang_ky("D2-M2-51", "D", "M2", lop=(5,),
         tu_khoa=("phần trăm", "lãi", "lỗ", "giảm giá", "thực tế"),
         dang_bai=("Bài toán phần trăm thực tế: lãi, lỗ, giảm giá",), thuc_te=True)
def d2_m2_51(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["giam", "lai", "tang"], rng.randint(4, 6))):
        goc = rng.choice([80, 120, 150, 200, 240, 300, 400, 500]) * 1000
        pc = rng.choice([5, 10, 15, 20, 25, 30, 40])
        phan = goc * pc // 100
        if kieu == "giam":
            y.append((f"Một chiếc cặp giá {sv(goc)} đồng được giảm {sv(pc)}%. "
                      f"Hỏi giá sau khi giảm là bao nhiêu?", sv(goc - phan) + " đồng"))
            if k == 0:
                buoc = [f"Giá gốc ứng với 100%.",
                        f"Bước 1 — số tiền giảm: {sv(goc)} : 100 × {sv(pc)} = {sv(phan)} (đồng).",
                        f"Bước 2 — giá sau khi giảm: {sv(goc)} − {sv(phan)} = "
                        f"{sv(goc - phan)} (đồng).",
                        f"Cách nhanh: giảm {sv(pc)}% nghĩa là còn {sv(100 - pc)}%, "
                        f"tức {sv(goc)} : 100 × {sv(100 - pc)} = {sv(goc - phan)} (đồng).",
                        f"Đáp số: **{sv(goc - phan)} đồng**."]
        elif kieu == "lai":
            y.append((f"Mua một món hàng {sv(goc)} đồng rồi bán {sv(goc + phan)} đồng. "
                      f"Người bán lãi bao nhiêu phần trăm so với giá mua?", f"{sv(pc)}%"))
        else:
            y.append((f"Một món hàng giá {sv(goc)} đồng, tăng giá {sv(pc)}%. "
                      f"Giá mới là bao nhiêu?", sv(goc + phan) + " đồng"))
    return Bai(
        tieu_de="Phần trăm trong mua bán: lãi, lỗ, giảm giá",
        dan="Ghi rõ đại lượng nào ứng với 100%.",
        y=y, giai_mau=buoc,
        huong_giai="Giá gốc luôn ứng với 100%. Giảm p% thì giá mới ứng với (100 − p)%; "
                   "tăng p% thì ứng với (100 + p)%. Lãi tính theo **giá mua**.",
        td=["TD2", "TD6"],
        diem_chot="Phần trăm lãi tính theo **giá mua**, không theo giá bán.",
        loi="Chia tiền lãi cho giá bán nên ra tỉ lệ nhỏ hơn thực tế.",
        phong="Viết dòng đầu tiên: “Giá mua = 100%”.",
        goi_y=("Số nào ứng với 100%?",
               "Số tiền chênh lệch là bao nhiêu?",
               "Chia số chênh lệch cho giá mua rồi nhân 100."),
        pt_dang="Tỉ số phần trăm trong mua bán",
        pt_kien_thuc="Tỉ số phần trăm, mốc quy chiếu 100%",
        pt_du_lieu="Từ khoá “giảm giá”, “tăng giá”, “lãi”, “lỗ”",
        pt_phuong_phap="Chốt mốc 100% rồi cộng trừ phần trăm",
        pt_nhanh="Giảm 20% nghĩa là còn 80% — nhân thẳng một lần thay vì trừ hai bước.",
        tuong_tu=("Hàng giá 500 000 đồng giảm 20%. Giá còn lại bao nhiêu?", "400 000 đồng"),
        mo_rong="Giảm hai lần liên tiếp 10% rồi 10% — không bằng giảm 20%.",
        chuan_bi="Tìm tỉ số phần trăm của hai số và tìm p% của một số.",
        bay="Lãi tính theo giá mua")


@dang_ky("D2-M3-51", "D", "M3", lop=(5,),
         tu_khoa=("ba đại lượng", "tổng hiệu tỉ", "trộn", "pha", "đổi tỉ lệ"),
         dang_bai=("Bài toán tổng, hiệu, tỉ với ba đại lượng",
                   "Bài toán về trộn, pha và đổi tỉ lệ"), thuc_te=True)
def d2_m3_51(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["ba_phan", "pha"], rng.randint(4, 6))):
        p1, p2, p3 = rng.randint(1, 4), rng.randint(1, 5), rng.randint(1, 6)
        don = rng.randint(4, 40)
        tong = (p1 + p2 + p3) * don
        if kieu == "ba_phan":
            y.append((f"Ba tổ trồng được {sv(tong)} cây. Số cây tổ Một, tổ Hai, tổ Ba tỉ lệ "
                      f"với {sv(p1)}, {sv(p2)}, {sv(p3)}. Mỗi tổ trồng bao nhiêu cây?",
                      f"{sv(p1 * don)} · {sv(p2 * don)} · {sv(p3 * don)} cây"))
            if k == 0:
                buoc = [f"Vẽ ba đoạn thẳng: {sv(p1)} phần, {sv(p2)} phần, {sv(p3)} phần.",
                        f"Bước 1 — tổng số phần: {sv(p1)} + {sv(p2)} + {sv(p3)} = "
                        f"{sv(p1 + p2 + p3)} (phần).",
                        f"Bước 2 — một phần: {sv(tong)} : {sv(p1 + p2 + p3)} = {sv(don)} (cây).",
                        f"Bước 3 — nhân ra từng tổ: {sv(don)} × {sv(p1)} = {sv(p1 * don)}; "
                        f"{sv(don)} × {sv(p2)} = {sv(p2 * don)}; "
                        f"{sv(don)} × {sv(p3)} = {sv(p3 * don)} (cây).",
                        f"Thử lại: {sv(p1 * don)} + {sv(p2 * don)} + {sv(p3 * don)} = "
                        f"{sv(tong)} ✓",
                        f"Đáp số: **{sv(p1 * don)}, {sv(p2 * don)}, {sv(p3 * don)} cây**."]
        else:
            m1 = rng.randint(2, 12)
            m2 = rng.randint(2, 12)
            gia1 = rng.choice([10, 12, 15, 20]) * 1000
            gia2 = rng.choice([25, 30, 40, 50]) * 1000
            tien = m1 * gia1 + m2 * gia2
            y.append((f"Trộn {sv(m1)} kg gạo giá {sv(gia1)} đồng một ki-lô-gam với {sv(m2)} kg "
                      f"gạo giá {sv(gia2)} đồng một ki-lô-gam. Hỏi tổng số tiền là bao nhiêu?",
                      sv(tien) + " đồng"))
    return Bai(
        tieu_de="Chia theo tỉ lệ ba phần và bài toán trộn",
        dan="Vẽ sơ đồ ba đoạn thẳng cho bài chia tỉ lệ.",
        y=y, giai_mau=buoc,
        huong_giai="Chia một tổng theo tỉ lệ ba số: cộng ba số phần lại, chia tổng cho "
                   "tổng số phần được giá trị một phần, rồi nhân ra từng đại lượng. "
                   "Bài trộn thì tính riêng từng loại rồi cộng.",
        td=["TD3", "TD2"],
        diem_chot="Chia cho **tổng số phần**, không chia cho số đại lượng.",
        loi="Chia tổng cho 3 vì thấy có ba tổ.",
        phong="Đếm số phần trên sơ đồ trước khi chia.",
        goi_y=("Vẽ ba đoạn thẳng theo đúng số phần.",
               "Tổng cộng có bao nhiêu phần bằng nhau?",
               "Một phần bằng bao nhiêu?"),
        pt_dang="Chia tỉ lệ nhiều phần; bài toán trộn",
        pt_kien_thuc="Tỉ số, chia theo tỉ lệ, nhân với đơn giá",
        pt_du_lieu="“Tỉ lệ với … , … , …” hoặc “trộn … với …”",
        pt_phuong_phap="Tổng số phần → giá trị một phần → nhân",
        pt_nhanh="Tổng luôn chia hết cho tổng số phần; không chia hết là đọc sai tỉ lệ.",
        tuong_tu=("Chia 120 cây theo tỉ lệ 1 : 2 : 3. Mỗi phần bao nhiêu cây?", "20, 40, 60"),
        mo_rong="Hỏi giá trung bình một ki-lô-gam gạo sau khi trộn.",
        chuan_bi="Bài toán tổng – tỉ hai đại lượng và phép nhân với số lớn.",
        bay="Chia cho tổng số phần, không phải cho số đại lượng")


@dang_ky("D2-M4-51", "D", "M4", lop=(5,),
         tu_khoa=("thể tích", "thực tế", "bể nước"),
         dang_bai=("Bài toán về thể tích trong thực tế",), thuc_te=True)
def d2_m4_51(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["day_be", "muc_nuoc", "do_them"],
                                        rng.randint(4, 6))):
        a = rng.randint(2, 10)
        b = rng.randint(2, 8)
        c = rng.randint(2, 6)
        v = a * b * c
        if kieu == "day_be":
            y.append((f"Một bể nước dạng hình hộp chữ nhật có chiều dài {sv(a)} m, chiều "
                      f"rộng {sv(b)} m, chiều cao {sv(c)} m. Hỏi bể chứa đầy được bao nhiêu "
                      f"lít nước?", sv(v * 1000) + " lít"))
            if k == 0:
                buoc = [f"Bước 1 — thể tích bể: {sv(a)} × {sv(b)} × {sv(c)} = {sv(v)} (m³).",
                        f"Bước 2 — đổi ra lít: 1 m³ = 1 000 lít, nên "
                        f"{sv(v)} × 1 000 = {sv(v * 1000)} (lít).",
                        f"Đáp số: **{sv(v * 1000)} lít**."]
        elif kieu == "muc_nuoc":
            h = rng.randint(1, c)
            y.append((f"Bể hình hộp chữ nhật đáy {sv(a)} m × {sv(b)} m đang chứa nước cao "
                      f"{sv(h)} m. Hỏi trong bể có bao nhiêu mét khối nước?",
                      sv(a * b * h) + " m³"))
        else:
            h1 = rng.randint(1, c - 1) if c > 1 else 1
            y.append((f"Bể đáy {sv(a)} m × {sv(b)} m, cao {sv(c)} m, đang có nước cao "
                      f"{sv(h1)} m. Phải đổ thêm bao nhiêu mét khối nước nữa thì đầy bể?",
                      sv(a * b * (c - h1)) + " m³"))
    return Bai(
        tieu_de="Thể tích bể nước trong thực tế",
        dan="Ghi rõ đơn vị: mét khối hay lít.",
        y=y, giai_mau=buoc,
        huong_giai="Thể tích hình hộp chữ nhật bằng dài × rộng × cao. Khi bể chưa đầy, "
                   "chiều cao dùng để tính là **mực nước**, không phải chiều cao bể. "
                   "1 m³ = 1 000 lít.",
        td=["TD3", "TD2"],
        diem_chot="Chiều cao trong công thức là **mực nước thực tế**.",
        loi="Lấy chiều cao bể để tính lượng nước đang có.",
        phong="Vẽ mặt cắt của bể và tô phần nước trước khi tính.",
        goi_y=("Diện tích đáy bể bằng bao nhiêu?",
               "Chiều cao cần dùng là chiều cao bể hay mực nước?",
               "Nhân diện tích đáy với chiều cao ấy."),
        pt_dang="Thể tích hình hộp chữ nhật trong thực tế",
        pt_kien_thuc="V = dài × rộng × cao; 1 m³ = 1 000 lít",
        pt_du_lieu="Bể nước, thùng, hộp có ba kích thước",
        pt_phuong_phap="Diện tích đáy × chiều cao tương ứng",
        pt_nhanh="Tính diện tích đáy một lần rồi dùng lại cho mọi câu hỏi về bể đó.",
        tuong_tu=("Bể 2 m × 3 m × 1 m chứa đầy được bao nhiêu lít?", "6 000 lít"),
        mo_rong="Thả một khối đá vào bể, mực nước dâng lên — tìm thể tích khối đá.",
        chuan_bi="Công thức thể tích hình hộp chữ nhật và đổi đơn vị thể tích.",
        bay="Mực nước, không phải chiều cao bể")


@dang_ky("D2-M5-51", "D", "M5", lop=(5,),
         tu_khoa=("mô phỏng đề thi", "vào lớp 6", "tổng duyệt", "tổng ôn cuối cấp"),
         dang_bai=("Mô phỏng đề thi vào lớp 6 — phần tự luận (đề 1)",
                   "Mô phỏng đề thi vào lớp 6 — phần tự luận (đề 2)",
                   "Tổng duyệt — mô phỏng đề thi chuyên trọn vẹn",
                   "Tổng ôn cuối cấp tiểu học"))
def d2_m5_51(rng, lop):
    v1 = rng.choice([36, 40, 45, 48, 50, 54, 60])
    v2 = rng.choice([12, 15, 18, 20, 24, 30])
    gio = rng.choice([2, 3, 4])
    s = (v1 + v2) * gio
    pc = rng.choice([10, 20, 25])
    goc = rng.choice([200, 300, 400]) * 1000
    sau = goc + goc * pc // 100
    a, b = ti(rng, 5)
    phan = rng.randint(6, 30)
    y = [(f"Hai xe khởi hành cùng lúc từ hai địa điểm cách nhau {sv(s)} km và đi ngược "
          f"chiều. Vận tốc lần lượt là {sv(v1)} km/giờ và {sv(v2)} km/giờ. "
          f"Sau bao lâu hai xe gặp nhau?", sv(gio) + " giờ"),
         ("Khi gặp nhau, xe thứ nhất đã đi được bao nhiêu ki-lô-mét?", sv(v1 * gio) + " km"),
         ("Chỗ gặp nhau cách điểm khởi hành của xe thứ hai bao nhiêu ki-lô-mét?",
          sv(v2 * gio) + " km"),
         (f"Một món hàng giá {sv(goc)} đồng, tăng giá {sv(pc)}%. Giá mới là bao nhiêu?",
          sv(sau) + " đồng"),
         (f"Sau đó giảm giá {sv(pc)}% so với giá mới. Giá cuối cùng là bao nhiêu?",
          sv(sau - sau * pc // 100) + " đồng"),
         (f"Giá cuối cùng so với giá ban đầu là tăng hay giảm, và chênh bao nhiêu đồng?",
          ("giảm " if sau - sau * pc // 100 < goc else "tăng ")
          + sv(abs(sau - sau * pc // 100 - goc)) + " đồng"),
         (f"Hai số có tổng {sv((a + b) * phan)} và số bé bằng {ps(Fraction(a, b))} số lớn. "
          f"Tìm hiệu hai số.", sv((b - a) * phan))]
    return Bai(
        tieu_de="Mô phỏng đề thi vào lớp 6 — phần tự luận",
        dan="Làm trong 25 phút. Trình bày như bài thi thật: có câu lời giải, có đáp số.",
        y=y,
        giai_mau=[f"Bước 1 — mỗi giờ hai xe lại gần nhau: {sv(v1)} + {sv(v2)} = "
                  f"{sv(v1 + v2)} (km).",
                  f"Bước 2 — thời gian gặp nhau: {sv(s)} : {sv(v1 + v2)} = {sv(gio)} (giờ).",
                  f"Bước 3 — quãng đường xe thứ nhất: {sv(v1)} × {sv(gio)} = "
                  f"{sv(v1 * gio)} (km).",
                  f"Bước 4 — quãng đường xe thứ hai: {sv(v2)} × {sv(gio)} = "
                  f"{sv(v2 * gio)} (km).",
                  f"Thử lại: {sv(v1 * gio)} + {sv(v2 * gio)} = {sv(s)} ✓",
                  f"Đáp số: **gặp nhau sau {sv(gio)} giờ**."],
        huong_giai="Đề thi thật hay ghép ba mạch trong một bài: chuyển động, phần trăm, "
                   "tổng – tỉ. Làm tuần tự từng ý, mỗi ý một kết quả, và dùng kết quả ý "
                   "trước cho ý sau.",
        td=["TD3", "TD6"],
        diem_chot="Ý sau dùng lại kết quả ý trước — **sai một ý là sai dây chuyền**.",
        loi="Ý thứ năm tính phần trăm trên giá ban đầu thay vì trên giá vừa tăng.",
        phong="Sau mỗi ý, khoanh tròn kết quả để ý sau lấy đúng số ấy.",
        goi_y=("Mỗi giờ hai xe lại gần nhau bao nhiêu ki-lô-mét?",
               "Lần giảm giá tính phần trăm trên giá nào?",
               "Với tổng – tỉ, hiệu bằng hiệu số phần nhân giá trị một phần."),
        pt_dang="Đề tổng hợp nhiều mạch",
        pt_kien_thuc="Chuyển động ngược chiều; tỉ số phần trăm; tổng – tỉ",
        pt_du_lieu="Một đề dài gồm nhiều ý nối tiếp nhau",
        pt_phuong_phap="Giải tuần tự, giữ lại kết quả trung gian",
        pt_nhanh="Tăng p% rồi giảm p% luôn cho kết quả **thấp hơn** giá ban đầu.",
        tuong_tu=("Hai xe cách nhau 150 km đi ngược chiều, 40 và 35 km/giờ. Mấy giờ gặp?",
                  "2 giờ"),
        mo_rong="Đổi thành hai xe cùng chiều đuổi nhau để phải dùng hiệu vận tốc.",
        chuan_bi="Chuyển động đều, tỉ số phần trăm, tổng – tỉ.",
        bay="Mốc 100% đổi sau mỗi lần")
