# -*- coding: utf-8 -*-
"""Thư viện mẫu bài theo **trục bối cảnh thực tế Việt Nam**.

Trục thứ ba của chương trình, sau trục nội dung (538 dạng bài) và trục phương
pháp (16 thủ pháp giải). Lý do có nó: đề đánh giá năng lực vào lớp 6 của các
trường chất lượng cao Hà Nội đang chuyển rất nhanh sang bài đặt trong tình
huống thật — hoá đơn tiền điện, lãi suất tiết kiệm, khuyến mãi, tỉ lệ bản đồ,
giá vé, cước vận chuyển. Học sinh làm được bài "tìm x" nhưng đọc một hoá đơn
tiền điện thì tắc, vì chưa từng gặp dạng dữ liệu ấy.

Mẫu ở đây khác mẫu thường ở ba chỗ:

* **Số liệu bám mức giá và mức thuế có thật ở Việt Nam**, làm tròn cho gọn.
  Không lấy con số ngoại quốc, không lấy con số vô lý.
* **Đề luôn có dữ liệu ở dạng bảng**, vì đề thật hay cho bảng chứ không cho
  một câu văn gọn ghẽ.
* **Có bài cài dữ kiện thừa**, vì đề thật luôn có, và biết bỏ qua dữ kiện
  thừa mới là kỹ năng đọc đề.

Như mọi mẫu khác: đáp số do mã tính ra, và mỗi mẫu tự viết lời giải từng bước
có số thật của chính bài vừa sinh.
"""
from __future__ import annotations

from fractions import Fraction

from .khung import Bai, TEN, dang_ky, hoa, luan_phien, ps, sv


# ══════════════════ TIỀN ĐIỆN BẬC THANG — nhóm H, M4 ══════════════════

# Giá điện sinh hoạt Việt Nam có sáu bậc. Rút gọn còn bốn bậc đầu cho vừa tầm
# tiểu học, giữ nguyên tinh thần: dùng càng nhiều thì đơn giá bậc sau càng cao.
BAC_DIEN = [(50, 1800), (50, 1900), (100, 2200), (100, 2800)]


@dang_ky("TT-H-M4-01", "H", "M4", lop=(5,),
         tu_khoa=("tiền điện", "bậc thang", "hoá đơn", "đọc bảng giá", "thực tế"),
         dang_bai=("Bài toán tiền điện bậc thang", "Đọc hiểu bảng giá",
                   "Bài toán hoá đơn thực tế"),
         thuc_te=True, bay="Nhân cả số điện cho đơn giá bậc cuối")
def tt_h_m4_01(rng, lop):
    """Tính tiền điện theo bậc thang từ một bảng giá."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        so_dien = rng.randrange(80, 300, 10)
        con, tien, chi = so_dien, 0, []
        for muc, gia in BAC_DIEN:
            d = min(con, muc)
            if d <= 0:
                break
            tien += d * gia
            chi.append((d, gia, d * gia))
            con -= d
        if con > 0:                       # vượt bậc cuối thì tính tiếp theo bậc ấy
            tien += con * BAC_DIEN[-1][1]
            chi.append((con, BAC_DIEN[-1][1], con * BAC_DIEN[-1][1]))
        ten = rng.choice(TEN)
        de = (f"Tháng vừa rồi nhà bạn {ten} dùng hết {sv(so_dien)} kW·h điện. "
              f"Dựa vào bảng giá bậc thang ở đầu bài, tính số tiền điện nhà bạn "
              f"ấy phải trả (chưa tính thuế).")
        dap = f"{sv(tien)} đồng"
        if k == 0:
            buoc = ["Đây là bài **bậc thang**: mỗi bậc có đơn giá riêng, không "
                    "phải nhân cả số điện cho một đơn giá."]
            buoc += [f"Bậc {i + 1}: {sv(d)} kW·h × {sv(g)} đồng = {sv(t)} đồng."
                     for i, (d, g, t) in enumerate(chi)]
            buoc += [f"Cộng các bậc: {' + '.join(sv(t) for _, _, t in chi)} = "
                     f"**{sv(tien)} đồng**."]
        y.append((de, dap))
    bang = ("| Bậc | Lượng điện | Đơn giá (đồng/kW·h) |\n|:--:|---|---:|\n"
            + "\n".join(f"| {i + 1} | {'từ ' + sv(sum(x[0] for x in BAC_DIEN[:i]) + 1) if i else 'tới'} "
                        f"{'đến ' + sv(sum(x[0] for x in BAC_DIEN[:i + 1])) if i else sv(m) + ' kW·h đầu'} "
                        f"| {sv(g)} |"
                        for i, (m, g) in enumerate(BAC_DIEN)))
    return Bai(
        tieu_de="Tiền điện tính theo bậc thang",
        dan="Bảng giá điện sinh hoạt (rút gọn bốn bậc):\n\n" + bang +
            "\n\nDùng chung bảng này cho mọi ý.",
        y=y, giai_mau=buoc,
        huong_giai="Chia số điện đã dùng vào từng bậc theo thứ tự từ bậc một trở "
                   "lên. Mỗi bậc chỉ chứa tối đa lượng điện của bậc ấy; phần dư "
                   "mới tràn sang bậc sau. Nhân từng bậc rồi cộng lại.",
        td=["TD2", "TD5"],
        diem_chot="Không được nhân cả số điện cho một đơn giá duy nhất. Đó chính "
                  "là lỗi mà cách tính bậc thang sinh ra để chống.",
        loi="Lấy tổng số điện nhân với đơn giá của bậc cuối cùng dùng tới.",
        phong="Kẻ bảng ba cột — bậc, số điện của bậc, thành tiền — rồi mới cộng.",
        goi_y=("Bậc một chứa được nhiều nhất bao nhiêu kW·h?",
               "Phần dư sau bậc một tràn sang bậc mấy?",
               "Nhân từng bậc riêng rồi mới cộng lại."),
        pt_dang="Bài toán tiền điện bậc thang",
        pt_kien_thuc="Nhân, cộng số lớn; đọc bảng giá nhiều bậc",
        pt_du_lieu="Đề cho **bảng giá nhiều bậc** và một lượng tiêu thụ",
        pt_phuong_phap="Chia lượng tiêu thụ vào từng bậc theo thứ tự rồi cộng thành tiền",
        pt_nhanh="Nếu lượng dùng vượt hết các bậc thấp thì ba bậc đầu luôn cho "
                 "cùng một số tiền — tính sẵn một lần rồi dùng lại.",
        tuong_tu=("Nhà dùng 120 kW·h. Tính tiền điện theo bảng giá trên.",
                  "50 × 1 800 + 50 × 1 900 + 20 × 2 200 = 229 000 đồng"),
        mo_rong="Cộng thêm thuế giá trị gia tăng 8% để thành đúng một hoá đơn thật.",
        chuan_bi="Nhân số có nhiều chữ số và cách đọc bảng nhiều cột.")


# ══════════════════ TỈ SỐ PHẦN TRĂM THỰC TẾ — nhóm H, M4/M5 ══════════════════

@dang_ky("TT-H-M4-02", "H", "M4", lop=(5,),
         tu_khoa=("khuyến mãi", "giảm giá", "tỉ số phần trăm", "thực tế", "mua bán"),
         dang_bai=("Bài toán giảm giá và khuyến mãi", "Tỉ số phần trăm thực tế",
                   "Bài toán tính tiền hàng"),
         thuc_te=True, bay="Cộng hai lần giảm giá thành một")
def tt_h_m4_02(rng, lop):
    """Giảm giá liên tiếp: hai lần giảm không cộng lại được."""
    y, buoc = [], []
    HANG = [("chiếc cặp", 450), ("bộ sách tham khảo", 320), ("đôi giày", 680),
            ("chiếc áo đồng phục", 250), ("hộp bút", 120), ("chiếc balo", 540)]
    for k, kieu in enumerate(luan_phien(rng, ["mot_lan", "hai_lan"],
                                        rng.randint(4, 5))):
        ten_h, gia_ng = rng.choice(HANG)
        gia = gia_ng * 1000
        g1 = rng.choice([10, 20, 25, 30])
        if kieu == "mot_lan":
            sau = gia * (100 - g1) // 100
            de = (f"Một {ten_h} giá niêm yết {sv(gia)} đồng, cửa hàng giảm "
                  f"{sv(g1)}%. Hỏi giá sau khi giảm là bao nhiêu?")
            dap = f"{sv(sau)} đồng"
        else:
            g2 = rng.choice([10, 20, 25])
            s1 = gia * (100 - g1) // 100
            sau = s1 * (100 - g2) // 100
            gop = gia * (100 - g1 - g2) // 100
            de = (f"Một {ten_h} giá niêm yết {sv(gia)} đồng. Cửa hàng giảm "
                  f"{sv(g1)}%, sau đó giảm tiếp {sv(g2)}% trên giá đã giảm. "
                  f"Hỏi giá cuối cùng là bao nhiêu?")
            dap = f"{sv(sau)} đồng"
            if k <= 1 and not buoc:
                buoc = [
                    f"Cẩn thận: giảm {sv(g1)}% rồi giảm tiếp {sv(g2)}% **không** "
                    f"bằng giảm {sv(g1 + g2)}%, vì lần giảm sau tính trên giá đã "
                    f"giảm chứ không trên giá gốc.",
                    f"Sau lần giảm thứ nhất, giá còn {sv(100 - g1)}% giá niêm yết: "
                    f"{sv(gia)} : 100 × {sv(100 - g1)} = {sv(s1)} (đồng).",
                    f"Lần giảm thứ hai tính trên {sv(s1)} đồng, còn lại "
                    f"{sv(100 - g2)}%: {sv(s1)} : 100 × {sv(100 - g2)} = "
                    f"{sv(sau)} (đồng).",
                    f"Giá cuối cùng là **{sv(sau)} đồng**. Nếu cộng gộp hai lần "
                    f"giảm thành {sv(g1 + g2)}% thì ra {sv(gop)} đồng — sai "
                    f"{sv(abs(sau - gop))} đồng.",
                ]
        y.append((de, dap))
    return Bai(
        tieu_de="Giá sau khuyến mãi",
        dan="Ghi rõ mỗi lần giảm được tính trên giá nào.",
        y=y, giai_mau=buoc,
        huong_giai="Giảm a% thì còn (100 − a)% của giá đang xét. Giảm hai lần liên "
                   "tiếp thì lần sau tính trên giá đã giảm, nên phải làm hai bước "
                   "chứ không cộng hai phần trăm lại.",
        td=["TD2", "TD5"],
        diem_chot="Giảm 20% rồi giảm tiếp 10% **không** bằng giảm 30%.",
        loi="Cộng hai lần giảm giá thành một lần rồi tính một phép.",
        phong="Viết ra giá sau lần giảm thứ nhất trước khi làm lần thứ hai.",
        goi_y=("Sau lần giảm thứ nhất còn bao nhiêu phần trăm giá niêm yết?",
               "Lần giảm thứ hai tính trên giá nào?",
               "Làm hai bước, đừng cộng gộp hai phần trăm."),
        pt_dang="Bài toán giảm giá và khuyến mãi",
        pt_kien_thuc="Tỉ số phần trăm; tìm giá trị phần trăm của một số",
        pt_du_lieu="Đề nhắc **giảm giá**, **khuyến mãi**, và có thể giảm nhiều lần",
        pt_phuong_phap="Mỗi lần giảm nhân với (100 − a) rồi chia 100, làm lần lượt",
        pt_nhanh="Giảm 20% rồi 10% tương đương còn 80% × 90% = 72% giá gốc.",
        tuong_tu=("Áo giá 300 000 đồng, giảm 20% rồi giảm tiếp 10%. Giá cuối là bao nhiêu?",
                  "216 000 đồng"),
        mo_rong="Hỏi ngược: biết giá cuối và hai mức giảm, tìm giá niêm yết.",
        chuan_bi="Tìm a% của một số và phép nhân chia với số tròn nghìn.")


@dang_ky("TT-H-M5-01", "H", "M5", lop=(5,),
         tu_khoa=("lãi suất", "tiết kiệm", "gửi ngân hàng", "thực tế", "phần trăm"),
         dang_bai=("Bài toán lãi suất tiết kiệm", "Tỉ số phần trăm nhiều kỳ",
                   "Bài toán tài chính thực tế"),
         thuc_te=True, bay="Nhân lãi một kỳ cho số kỳ")
def tt_h_m5_01(rng, lop):
    """Lãi kép hai kỳ: lãi kỳ sau tính trên cả gốc lẫn lãi kỳ trước."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        goc = rng.randrange(10, 60) * 1_000_000
        ls = rng.choice([5, 6, 8, 10])
        l1 = goc * ls // 100
        s1 = goc + l1
        l2 = s1 * ls // 100
        s2 = s1 + l2
        don = goc + l1 * 2
        ten = rng.choice(TEN)
        de = (f"Bố bạn {ten} gửi tiết kiệm {sv(goc)} đồng với lãi suất {sv(ls)}% "
              f"một năm. Nếu sau một năm không rút mà gửi tiếp cả gốc lẫn lãi "
              f"thêm một năm nữa, thì sau hai năm bố bạn ấy có tất cả bao nhiêu tiền?")
        dap = f"{sv(s2)} đồng"
        if k == 0:
            buoc = [
                f"Năm thứ nhất, lãi tính trên tiền gốc: {sv(goc)} : 100 × {sv(ls)} "
                f"= {sv(l1)} (đồng).",
                f"Cuối năm thứ nhất có cả gốc lẫn lãi: {sv(goc)} + {sv(l1)} = "
                f"{sv(s1)} (đồng).",
                f"Năm thứ hai lãi tính trên **cả số tiền ấy**, không phải trên gốc "
                f"cũ: {sv(s1)} : 100 × {sv(ls)} = {sv(l2)} (đồng).",
                f"Sau hai năm có: {sv(s1)} + {sv(l2)} = **{sv(s2)} đồng**.",
                f"Nếu nhân lãi một năm cho hai thì ra {sv(don)} đồng — thiếu "
                f"{sv(s2 - don)} đồng, đúng bằng phần lãi sinh ra từ lãi năm đầu.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Lãi suất tiết kiệm hai năm",
        dan="Tính riêng từng năm. Ghi rõ mỗi năm lãi được tính trên số tiền nào.",
        y=y, giai_mau=buoc,
        huong_giai="Lãi năm sau tính trên **cả gốc lẫn lãi** của năm trước, nên "
                   "phải tính lần lượt từng năm. Nhân lãi một năm cho số năm là "
                   "cách tính của lãi đơn, không đúng với gửi tiếp cả gốc lẫn lãi.",
        td=["TD2", "TD6"],
        diem_chot="Số tiền sinh lãi ở năm thứ hai lớn hơn số tiền gốc ban đầu.",
        loi="Lấy lãi một năm nhân với hai.",
        phong="So đáp số với cách nhân đôi lãi — kết quả đúng phải **lớn hơn**.",
        goi_y=("Cuối năm thứ nhất có tất cả bao nhiêu tiền?",
               "Năm thứ hai, lãi tính trên số tiền nào?",
               "Cộng lãi năm hai vào số tiền cuối năm một."),
        pt_dang="Bài toán lãi suất tiết kiệm",
        pt_kien_thuc="Tỉ số phần trăm; tìm giá trị phần trăm của một số",
        pt_du_lieu="Đề nhắc **gửi tiếp cả gốc lẫn lãi**, hoặc hỏi sau nhiều năm",
        pt_phuong_phap="Tính lần lượt từng kỳ, mỗi kỳ lãi tính trên số tiền cuối kỳ trước",
        pt_nhanh="Sau hai năm với lãi suất a% thì số tiền bằng gốc nhân "
                 "(100 + a) × (100 + a) rồi chia 10 000.",
        tuong_tu=("Gửi 20 000 000 đồng, lãi 5% một năm, gửi tiếp cả gốc lẫn lãi. "
                  "Sau hai năm có bao nhiêu tiền?",
                  "22 050 000 đồng"),
        mo_rong="Hỏi sau ba năm, hoặc hỏi ngược: gửi bao nhiêu để sau hai năm có "
                "đủ một số tiền cho trước.",
        chuan_bi="Tìm a% của một số và phép nhân với số hàng triệu.")


# ══════════════════ TỈ LỆ BẢN ĐỒ — nhóm E, M4 ══════════════════

@dang_ky("TT-E-M4-01", "E", "M4", lop=(5,),
         tu_khoa=("tỉ lệ bản đồ", "tỉ lệ xích", "khoảng cách thực tế", "thực tế"),
         dang_bai=("Bài toán tỉ lệ bản đồ", "Bài toán về tỉ lệ xích",
                   "Đổi khoảng cách trên bản đồ ra thực tế"),
         thuc_te=True, bay="Quên đổi đơn vị sau khi nhân")
def tt_e_m4_01(rng, lop):
    """Tỉ lệ bản đồ: đo trên giấy ra khoảng cách thật, và ngược lại."""
    y, buoc = [], []
    # Cố ý **không dùng tên thành phố có thật**. Bài tỉ lệ bản đồ sinh số ngẫu
    # nhiên, nên gắn tên thật vào sẽ tạo ra những câu như "Hà Nội cách Hải Phòng
    # 59 km" — sai sự thật, và phụ huynh Hà Nội nhận ra ngay. Địa danh chung
    # chung giữ nguyên giá trị luyện tập mà không khẳng định điều gì sai.
    DIA = [("trường", "nhà văn hoá xã"), ("bến xe", "chợ huyện"),
           ("thị trấn A", "thị trấn B"), ("cầu Trắng", "trạm y tế"),
           ("xã Đông", "xã Đoài"), ("ga tàu", "khu du lịch")]
    for k, kieu in enumerate(luan_phien(rng, ["ra_that", "ve_ban_do"],
                                        rng.randint(4, 5))):
        ti_le = rng.choice([100_000, 200_000, 500_000, 1_000_000])
        cm = rng.randint(2, 15)
        that_cm = cm * ti_le
        that_km = Fraction(that_cm, 100_000)
        a, b = rng.choice(DIA)
        if kieu == "ra_that":
            de = (f"Trên bản đồ tỉ lệ 1 : {sv(ti_le)}, khoảng cách từ {a} đến {b} "
                  f"đo được {sv(cm)} cm. Hỏi khoảng cách thật là bao nhiêu ki-lô-mét?")
            dap = (f"{sv(that_km.numerator)} km" if that_km.denominator == 1
                   else f"{ps(that_km)} km")
            if k == 0:
                buoc = [
                    f"Tỉ lệ 1 : {sv(ti_le)} nghĩa là 1 cm trên bản đồ ứng với "
                    f"{sv(ti_le)} cm ngoài thực tế.",
                    f"Khoảng cách thật tính bằng xăng-ti-mét: {sv(cm)} × "
                    f"{sv(ti_le)} = {sv(that_cm)} (cm).",
                    "Đây là bước hay bị quên: đề hỏi ki-lô-mét chứ không hỏi "
                    "xăng-ti-mét. 1 km = 100 000 cm.",
                    f"Đổi ra ki-lô-mét: {sv(that_cm)} : 100 000 = **{dap}**.",
                ]
        else:
            # Chọn số ki-lô-mét sao cho đo trên bản đồ ra **số xăng-ti-mét tròn**.
            # Không ai đo được "59 phần 2 cm" trên một tờ bản đồ, và một đáp số
            # như vậy dạy học sinh chấp nhận kết quả vô lý.
            buoc_km = max(1, ti_le // 100_000)
            km = rng.randint(1, 60 // buoc_km) * buoc_km
            cm2 = Fraction(km * 100_000, ti_le)
            de = (f"Khoảng cách thật từ {a} đến {b} là {sv(km)} km. Hỏi trên bản "
                  f"đồ tỉ lệ 1 : {sv(ti_le)} thì khoảng cách ấy dài bao nhiêu "
                  f"xăng-ti-mét?")
            dap = (f"{sv(cm2.numerator)} cm" if cm2.denominator == 1
                   else f"{ps(cm2)} cm")
        y.append((de, dap))
    return Bai(
        tieu_de="Tỉ lệ bản đồ",
        dan="Câu nào cũng ghi rõ đang đổi từ đơn vị nào sang đơn vị nào.",
        y=y, giai_mau=buoc,
        huong_giai="Tỉ lệ 1 : n nghĩa là 1 cm trên bản đồ ứng với n cm thật. Đi từ "
                   "bản đồ ra thực tế thì **nhân** với n; đi ngược lại thì **chia**. "
                   "Cả hai chiều đều phải đổi đơn vị ở bước cuối.",
        td=["TD2", "TD5"],
        diem_chot="Nhân xong ra xăng-ti-mét, mà đề hỏi ki-lô-mét. 1 km = 100 000 cm.",
        loi="Trả lời con số xăng-ti-mét nhưng ghi đơn vị là ki-lô-mét.",
        phong="Viết đơn vị bên cạnh mọi con số trong bài giải, kể cả bước trung gian.",
        goi_y=("Tỉ lệ 1 : n nghĩa là 1 cm trên bản đồ bằng bao nhiêu cm thật?",
               "Nhân xong thì con số ấy đang là đơn vị gì?",
               "Đề hỏi đơn vị gì? Đổi về đúng đơn vị ấy."),
        pt_dang="Bài toán tỉ lệ bản đồ",
        pt_kien_thuc="Tỉ lệ; bảng đơn vị đo độ dài",
        pt_du_lieu="Đề cho **tỉ lệ dạng 1 : n** cùng một khoảng cách đo trên giấy "
                   "hoặc ngoài thực tế",
        pt_phuong_phap="Nhân hoặc chia cho mẫu tỉ lệ, rồi đổi đơn vị theo câu hỏi",
        pt_nhanh="Tỉ lệ 1 : 100 000 thì 1 cm trên bản đồ đúng bằng 1 km thật.",
        tuong_tu=("Bản đồ tỉ lệ 1 : 500 000, hai điểm cách nhau 4 cm. Khoảng cách "
                  "thật là bao nhiêu km?",
                  "20 km"),
        mo_rong="Cho tỉ lệ bản đồ và diện tích trên bản đồ, hỏi diện tích thật — "
                "lúc ấy phải nhân bình phương tỉ lệ.",
        chuan_bi="Bảng đơn vị đo độ dài và phép nhân chia với số tròn.")


# ══════════════════ CƯỚC VÀ GIÁ VÉ — nhóm D, M4 ══════════════════

@dang_ky("TT-D-M4-01", "D", "M4", lop=(4, 5),
         tu_khoa=("giá vé", "cước", "phí ship", "thực tế", "dữ kiện thừa"),
         dang_bai=("Bài toán giá vé và cước phí", "Bài toán có dữ kiện thừa",
                   "Bài toán thực tế nhiều bước"),
         thuc_te=True, bay="Dùng cả dữ kiện thừa")
def tt_d_m4_01(rng, lop):
    """Bài thực tế nhiều bước, cố ý cài một dữ kiện thừa."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        nl = rng.randint(2, 5)          # người lớn
        te = rng.randint(2, 6)          # trẻ em
        gia_nl = rng.randrange(60, 200, 10) * 1000
        gia_te = gia_nl // 2
        km = rng.randint(20, 180)       # dữ kiện thừa: quãng đường
        tong = nl * gia_nl + te * gia_te
        de = (f"Một gia đình gồm {sv(nl)} người lớn và {sv(te)} trẻ em đi tham "
              f"quan cách nhà {sv(km)} km. Vé người lớn {sv(gia_nl)} đồng, vé trẻ "
              f"em bằng nửa vé người lớn. Hỏi cả gia đình mua vé hết bao nhiêu tiền?")
        dap = f"{sv(tong)} đồng"
        if k == 0:
            buoc = [
                f"Đọc kỹ câu hỏi: đề hỏi **tiền vé**, không hỏi gì về quãng đường. "
                f"Con số {sv(km)} km là **dữ kiện thừa** — đề thật luôn có, và "
                f"biết bỏ qua nó mới là đọc đề đúng.",
                f"Giá vé trẻ em: {sv(gia_nl)} : 2 = {sv(gia_te)} (đồng).",
                f"Tiền vé người lớn: {sv(nl)} × {sv(gia_nl)} = {sv(nl * gia_nl)} (đồng).",
                f"Tiền vé trẻ em: {sv(te)} × {sv(gia_te)} = {sv(te * gia_te)} (đồng).",
                f"Cả gia đình: {sv(nl * gia_nl)} + {sv(te * gia_te)} = "
                f"**{sv(tong)} đồng**.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Tính tiền vé cho cả gia đình",
        dan="Trước khi tính, gạch chân câu hỏi và khoanh tròn dữ kiện **không** "
            "dùng tới.",
        y=y, giai_mau=buoc,
        huong_giai="Tìm giá vé trẻ em trước, rồi tính riêng từng loại vé, cuối cùng "
                   "mới cộng. Mỗi câu đều có một dữ kiện không dùng tới — nhận ra "
                   "nó là một phần của bài.",
        td=["TD2", "TD3"],
        diem_chot="Đề thật luôn có dữ kiện thừa. Dùng nhầm nó là mất trọn bài.",
        loi="Đem quãng đường vào phép tính tiền vé.",
        phong="Gạch chân câu hỏi cuối trước khi nhìn các con số.",
        goi_y=("Đề hỏi cái gì? Gạch chân câu hỏi.",
               "Trong các con số đề cho, con số nào không liên quan tới câu hỏi?",
               "Tính giá vé trẻ em trước rồi mới cộng hai loại vé."),
        pt_dang="Bài toán giá vé và cước phí",
        pt_kien_thuc="Nhân, chia, cộng số lớn; đọc đề có dữ kiện thừa",
        pt_du_lieu="Đề kể một tình huống đời thường và cho **nhiều số hơn mức cần**",
        pt_phuong_phap="Gạch chân câu hỏi, loại dữ kiện thừa, rồi tính từng phần",
        pt_nhanh="Vé trẻ em bằng nửa vé người lớn thì cả nhà tương đương "
                 "(số người lớn + nửa số trẻ em) vé người lớn.",
        tuong_tu=("2 người lớn và 3 trẻ em, vé người lớn 80 000 đồng, vé trẻ em "
                  "bằng nửa. Tổng tiền vé là bao nhiêu?",
                  "280 000 đồng"),
        mo_rong="Thêm mức giảm giá cho đoàn từ năm người trở lên.",
        chuan_bi="Nhân chia số tròn nghìn và kỹ năng gạch chân câu hỏi.")
