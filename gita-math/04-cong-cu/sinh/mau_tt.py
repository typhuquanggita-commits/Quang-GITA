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


# ═══════════════════════════════════════════════════════════════════════
#  ĐỢT HAI — VÁ BỐN NHÓM CHƯA CÓ BỐI CẢNH THỰC TẾ NÀO
#
#  Đo lại kho sau đợt một cho ra một con số khó chịu: nhóm **A** (số học và
#  cấu tạo số), **B** (phép tính và tính nhanh) và **C** (dãy số và quy luật)
#  có **0 mẫu bối cảnh thực tế ở cả ba lớp**, còn nhóm **F** (hình học) chỉ có
#  đúng một. Nghĩa là ba nhóm chiếm phần lớn thời lượng của chương trình đang
#  được dạy hoàn toàn trừu tượng.
#
#  Đó không phải chuyện thẩm mỹ. Học sinh làm được "45 300 gồm mấy nghìn mấy
#  trăm" nhưng nhìn công tơ điện thì không biết đọc; tính nhanh được
#  "25 × 4 × 7" nhưng ra chợ vẫn bấm máy. Bốn nhóm ấy vốn có bối cảnh thật rất
#  sẵn — công tơ, hoá đơn, số nhà, hàng rào, nền gạch — chỉ là chưa ai viết.
#
#  Bối cảnh chọn theo hai luật:
#  * **Không khẳng định số liệu về nơi có thật.** Không viết "dân số Hà Nội là
#    …" rồi bốc số ngẫu nhiên. Mọi con số ở đây là của một hộ gia đình, một lớp
#    học, một mảnh vườn — thứ vốn khác nhau ở mỗi nhà, nên sinh ngẫu nhiên
#    không tạo ra một điều sai nào.
#  * **Đơn giá bám mặt bằng giá Việt Nam**, làm tròn cho gọn.
# ═══════════════════════════════════════════════════════════════════════


# ─────────────── NHÓM A — SỐ HỌC VÀ CẤU TẠO SỐ ───────────────

@dang_ky("TT-A-M2-01", "A", "M2", lop=(3, 4),
         tu_khoa=("công tơ điện", "chỉ số", "cấu tạo số", "hàng nghìn", "thực tế"),
         dang_bai=("Cấu tạo số có nhiều chữ số", "Đọc viết số có năm chữ số",
                   "So sánh số có nhiều chữ số"),
         thuc_te=True)
def tt_a_m2_01(rng, lop):
    """Đọc chỉ số công tơ điện: cấu tạo số và hiệu hai chỉ số."""
    y, buoc = [], []
    dau = rng.randrange(12000, 60000, 100) + rng.randint(1, 99)
    dung = rng.randrange(80, 320)
    cuoi = dau + dung
    hang = [("chục nghìn", 10000), ("nghìn", 1000), ("trăm", 100),
            ("chục", 10), ("đơn vị", 1)]
    y.append((f"Chỉ số cuối tháng là {sv(cuoi)}. Số ấy gồm mấy chục nghìn, "
              f"mấy nghìn, mấy trăm, mấy chục và mấy đơn vị?",
              ", ".join(f"{cuoi // g % 10} {t}" for t, g in hang)))
    y.append((f"Số điện dùng trong tháng bằng chỉ số cuối trừ chỉ số đầu. "
              f"Nhà bạn ấy dùng bao nhiêu kW·h?",
              f"{sv(cuoi)} − {sv(dau)} = {sv(dung)} kW·h"))
    lam_tron = round(cuoi / 1000) * 1000
    y.append((f"Làm tròn chỉ số cuối {sv(cuoi)} đến hàng nghìn.", sv(lam_tron)))
    khac = cuoi + rng.choice([-1, 1]) * rng.randrange(1000, 9000, 100)
    y.append((f"Nhà bên cạnh có chỉ số cuối là {sv(khac)}. Chỉ số nào lớn hơn?",
              sv(max(cuoi, khac))))
    thang_sau = cuoi + rng.randrange(90, 300)
    y.append((f"Tháng sau chỉ số cuối là {sv(thang_sau)}. Tháng sau nhà bạn ấy "
              f"dùng nhiều hơn hay ít hơn tháng này, và chênh bao nhiêu kW·h?",
              f"nhiều hơn {sv(thang_sau - cuoi - dung)} kW·h"
              if thang_sau - cuoi > dung else
              f"ít hơn {sv(dung - (thang_sau - cuoi))} kW·h"))
    buoc = [
        f"**Chỉ số công tơ không phải là số điện đã dùng.** Nó là tổng số điện "
        f"cả nhà đã dùng từ ngày lắp công tơ tới giờ, nên bao giờ cũng tăng.",
        f"Tách {sv(cuoi)} theo hàng, đọc từ trái sang: "
        + ", ".join(f"{cuoi // g % 10} {t}" for t, g in hang) + ".",
        f"Số điện trong tháng = chỉ số cuối − chỉ số đầu = {sv(cuoi)} − "
        f"{sv(dau)} = **{sv(dung)} kW·h**.",
        f"Làm tròn đến hàng nghìn thì nhìn chữ số hàng trăm: hàng trăm của "
        f"{sv(cuoi)} là {cuoi // 100 % 10}, "
        + ("từ 5 trở lên nên làm tròn lên" if cuoi // 100 % 10 >= 5
           else "bé hơn 5 nên làm tròn xuống") + f", được {sv(lam_tron)}.",
    ]
    return Bai(
        tieu_de="Đọc chỉ số công tơ điện",
        dan=f"Công tơ điện nhà bạn {rng.choice(TEN)} đầu tháng chỉ **{sv(dau)}**, "
            f"cuối tháng chỉ **{sv(cuoi)}**. Dùng hai số này cho cả bài.",
        y=y, giai_mau=buoc,
        huong_giai="Chỉ số công tơ là một số cộng dồn, nên số điện dùng trong "
                   "tháng là **hiệu** hai chỉ số. Các ý còn lại là cấu tạo số, "
                   "làm tròn và so sánh trên chính hai con số ấy.",
        td=["TD1", "TD2"],
        diem_chot="Chỉ số công tơ là số cộng dồn, không phải lượng dùng trong tháng.",
        loi="Lấy thẳng chỉ số cuối làm số điện đã dùng.",
        phong="Hỏi lại: con số này là 'đã dùng bao nhiêu' hay 'đếm tới đâu rồi'?",
        goi_y=("Hai chỉ số đầu và cuối, cái nào lớn hơn? Vì sao?",
               "Muốn biết dùng bao nhiêu trong tháng thì làm phép gì với hai số ấy?",
               "Tách số theo hàng thì đọc từ hàng lớn nhất về hàng đơn vị."),
        pt_dang="Cấu tạo số có nhiều chữ số",
        pt_kien_thuc="Hàng và lớp; trừ số có năm chữ số; làm tròn số",
        pt_du_lieu="Hai chỉ số đầu kỳ và cuối kỳ trên một thiết bị đo cộng dồn",
        pt_phuong_phap="Trừ để ra lượng dùng, rồi tách hàng trên chính số ấy",
        pt_nhanh="Trừ nhẩm theo hàng từ phải sang, không cần đặt tính khi hiệu nhỏ.",
        tuong_tu=("Công tơ đầu tháng chỉ 23 450, cuối tháng chỉ 23 610. "
                  "Nhà ấy dùng bao nhiêu kW·h?", "160 kW·h"),
        mo_rong="Cho thêm đơn giá một bậc và hỏi tiền điện phải trả.",
        chuan_bi="Đọc, viết số có năm chữ số và phép trừ có nhớ.")


@dang_ky("TT-A-M3-01", "A", "M3", lop=(4, 5),
         tu_khoa=("đồng hồ km", "số lớn", "làm tròn", "ước lượng", "thực tế"),
         dang_bai=("Làm tròn số", "So sánh số có nhiều chữ số",
                   "Bài toán về số lớn"),
         thuc_te=True, bay="Làm tròn rồi mới trừ")
def tt_a_m3_01(rng, lop):
    """Số ki-lô-mét trên đồng hồ xe: làm tròn và bẫy làm tròn trước khi trừ."""
    y, buoc = [], []
    dau = rng.randrange(20000, 90000, 10) + rng.randint(0, 9)
    di = rng.randrange(400, 2600)
    cuoi = dau + di
    lam_dau = round(dau / 1000) * 1000
    lam_cuoi = round(cuoi / 1000) * 1000
    y.append((f"Làm tròn số ki-lô-mét đầu năm {sv(dau)} đến hàng nghìn.",
              sv(lam_dau)))
    y.append((f"Làm tròn số ki-lô-mét cuối năm {sv(cuoi)} đến hàng nghìn.",
              sv(lam_cuoi)))
    y.append(("Cả năm chiếc xe đã đi bao nhiêu ki-lô-mét? Tính bằng số chính xác.",
              f"{sv(cuoi)} − {sv(dau)} = {sv(di)} km"))
    y.append((f"Bạn Nam lấy hai số đã làm tròn trừ cho nhau và được "
              f"{sv(lam_cuoi - lam_dau)} km. Kết quả ấy lệch bao nhiêu so với "
              f"số đúng?", f"lệch {sv(abs(lam_cuoi - lam_dau - di))} km"))
    thang = rng.choice([10, 12])
    y.append((f"Nếu mỗi tháng xe đi được số ki-lô-mét như nhau thì trung bình "
              f"mỗi tháng đi bao nhiêu? Làm tròn đến hàng đơn vị.",
              f"{sv(di)} : {sv(thang)} ≈ {sv(round(di / thang))} km"
              if thang == 12 else
              f"{sv(di)} : {sv(thang)} ≈ {sv(round(di / thang))} km"))
    buoc = [
        f"Làm tròn {sv(dau)} đến hàng nghìn: nhìn chữ số hàng trăm là "
        f"{dau // 100 % 10} → được {sv(lam_dau)}.",
        f"Làm tròn {sv(cuoi)} tương tự → {sv(lam_cuoi)}.",
        f"Quãng đường đúng: {sv(cuoi)} − {sv(dau)} = **{sv(di)} km**.",
        f"Nếu trừ hai số đã làm tròn thì được {sv(lam_cuoi)} − {sv(lam_dau)} = "
        f"{sv(lam_cuoi - lam_dau)} km, lệch {sv(abs(lam_cuoi - lam_dau - di))} km "
        f"so với số đúng. **Làm tròn xong mới trừ thì sai số cộng dồn** — hai "
        f"lần làm tròn có thể cùng đẩy lệch về một phía.",
    ]
    return Bai(
        tieu_de="Số ki-lô-mét trên đồng hồ xe",
        dan=f"Đồng hồ xe máy nhà bạn {rng.choice(TEN)} đầu năm chỉ **{sv(dau)} km**, "
            f"cuối năm chỉ **{sv(cuoi)} km**.",
        y=y, giai_mau=buoc, bay="Làm tròn rồi mới trừ",
        huong_giai="Làm tròn để **nói cho gọn**, không phải để tính. Muốn có số "
                   "đúng thì trừ trước, làm tròn sau — nếu cần làm tròn.",
        td=["TD2", "TD4"],
        diem_chot="Làm tròn trước khi tính thì sai số của hai lần làm tròn cộng lại.",
        loi="Trừ hai số đã làm tròn rồi coi đó là kết quả đúng.",
        phong="Hỏi: đề cần số gọn để nói, hay số đúng để tính?",
        goi_y=("Làm tròn đến hàng nghìn thì nhìn chữ số ở hàng nào?",
               "Muốn biết đi được bao nhiêu km, con dùng số đã làm tròn hay số gốc?",
               "Tính cả hai cách rồi so hai kết quả xem lệch bao nhiêu."),
        pt_dang="Làm tròn số",
        pt_kien_thuc="Làm tròn đến hàng nghìn; trừ số có năm chữ số; chia có dư",
        pt_du_lieu="Hai số đo cộng dồn của cùng một thiết bị, cách nhau một năm",
        pt_phuong_phap="Trừ trên số gốc, chỉ làm tròn ở bước cuối",
        pt_nhanh="Hiệu hai số gần nhau tính nhẩm nhanh hơn hẳn đặt tính.",
        tuong_tu=("Đầu năm 41 280 km, cuối năm 43 050 km. Cả năm xe đi bao nhiêu "
                  "ki-lô-mét?", "1 770 km"),
        mo_rong="Hỏi thêm: mỗi lít xăng đi được 45 km thì cả năm tốn bao nhiêu lít.",
        chuan_bi="Quy tắc làm tròn và phép trừ số có năm chữ số.")


# ─────────────── NHÓM B — PHÉP TÍNH VÀ TÍNH NHANH ───────────────

@dang_ky("TT-B-M2-01", "B", "M2", lop=(3, 4),
         tu_khoa=("đi chợ", "nhẩm tiền", "làm tròn bù trừ", "tính nhanh", "thực tế"),
         dang_bai=("Tính nhanh tổng", "Cộng trừ nhẩm số tròn trăm",
                   "Bài toán mua bán"),
         thuc_te=True)
def tt_b_m2_01(rng, lop):
    """Nhẩm tiền đi chợ bằng cách làm tròn rồi bù trừ."""
    y, buoc = [], []
    MON = ["rau muống", "cá", "thịt lợn", "trứng gà", "đậu phụ", "cà chua",
           "gạo", "chuối"]
    mon = rng.sample(MON, 3)
    gia = [rng.randrange(12, 96) * 1000 + rng.choice([0, 500]) for _ in mon]
    tong = sum(gia)
    tron = [round(g / 10000) * 10000 for g in gia]
    y.append(("Làm tròn giá từng món đến hàng chục nghìn để nhẩm cho nhanh.",
              " · ".join(f"{m}: {sv(t)}" for m, t in zip(mon, tron))))
    y.append(("Cộng các giá đã làm tròn, được tổng ước lượng là bao nhiêu?",
              sv(sum(tron))))
    y.append(("Tính tổng đúng bằng cách cộng các giá gốc.", sv(tong)))
    y.append((f"Tổng ước lượng lệch bao nhiêu so với tổng đúng?",
              f"{sv(abs(sum(tron) - tong))} đồng"))
    dua = (tong // 50000 + 1) * 50000
    y.append((f"Người mua đưa tờ {sv(dua)} đồng. Người bán phải trả lại bao nhiêu?",
              f"{sv(dua - tong)} đồng"))
    buoc = [
        "Đi chợ thì cần **biết nhanh khoảng bao nhiêu** trước, biết chính xác sau. "
        "Vì vậy nhẩm bằng số tròn trước rồi mới cộng số lẻ để bù.",
        " · ".join(f"{m} {sv(g)} → {sv(t)}" for m, g, t in zip(mon, gia, tron)),
        f"Cộng số tròn: {' + '.join(sv(t) for t in tron)} = {sv(sum(tron))} đồng — "
        f"đây là con số nhẩm trong đầu khi đứng ở chợ.",
        f"Tổng đúng: {' + '.join(sv(g) for g in gia)} = **{sv(tong)} đồng**, "
        f"lệch {sv(abs(sum(tron) - tong))} đồng so với số nhẩm.",
        f"Tiền trả lại: {sv(dua)} − {sv(tong)} = **{sv(dua - tong)} đồng**.",
    ]
    return Bai(
        tieu_de="Nhẩm tiền khi đi chợ",
        dan="Ba món trong giỏ: " + " · ".join(
            f"**{m}** {sv(g)} đồng" for m, g in zip(mon, gia)) + ".",
        y=y, giai_mau=buoc,
        huong_giai="Làm tròn từng giá đến hàng chục nghìn để cộng nhẩm, rồi cộng "
                   "lại số gốc để có tổng đúng. Hai con số ấy dùng vào hai việc "
                   "khác nhau: một để biết đủ tiền không, một để trả tiền.",
        td=["TD1", "TD3"],
        diem_chot="Ước lượng và tính đúng là hai việc khác nhau, đừng lẫn.",
        loi="Lấy tổng đã làm tròn ra trả tiền.",
        phong="Nhẩm xong luôn hỏi: con số này để ước chừng hay để trả tiền?",
        goi_y=("Làm tròn từng giá đến hàng chục nghìn trước.",
               "Cộng các số tròn — phép này nhẩm được trong đầu.",
               "Rồi cộng lại giá gốc để lấy số đúng, và so hai kết quả."),
        pt_dang="Tính nhanh tổng",
        pt_kien_thuc="Làm tròn; cộng trừ trong phạm vi trăm nghìn",
        pt_du_lieu="Vài món hàng có giá lẻ, cần biết nhanh tổng khoảng bao nhiêu",
        pt_phuong_phap="Làm tròn để nhẩm, cộng số gốc để lấy kết quả đúng",
        pt_nhanh="Cộng phần nghìn trước rồi cộng phần lẻ sau, không đặt tính.",
        tuong_tu=("Ba món giá 28 000, 41 500 và 19 000 đồng. Đưa 100 000 đồng "
                  "thì được trả lại bao nhiêu?", "11 500 đồng"),
        mo_rong="Thêm một món được giảm giá và hỏi lại tiền trả lại.",
        chuan_bi="Làm tròn số và cộng trừ số có sáu chữ số.")


@dang_ky("TT-B-M3-01", "B", "M3", lop=(4, 5),
         tu_khoa=("hoá đơn", "nhân nhẩm", "một số nhân một tổng", "tính nhanh",
                  "thực tế"),
         dang_bai=("Nhân một số với một tổng", "Tính nhanh biểu thức",
                   "Bài toán mua bán nhiều mặt hàng"),
         thuc_te=True)
def tt_b_m3_01(rng, lop):
    """Tính tiền hoá đơn bằng tính chất phân phối."""
    y, buoc = [], []
    don_gia = rng.choice([12000, 15000, 18000, 25000])
    a = rng.randint(6, 19)
    b = rng.randint(4, 17)
    y.append((f"Buổi sáng bán {sv(a)} hộp, buổi chiều bán {sv(b)} hộp. "
              f"Tính tiền buổi sáng.", f"{sv(a * don_gia)} đồng"))
    y.append(("Tính tiền buổi chiều.", f"{sv(b * don_gia)} đồng"))
    y.append(("Cộng tiền hai buổi.", f"{sv((a + b) * don_gia)} đồng"))
    y.append((f"Cách khác: cộng số hộp cả ngày trước rồi mới nhân với đơn giá. "
              f"Viết phép tính và kết quả.",
              f"({sv(a)} + {sv(b)}) × {sv(don_gia)} = {sv(a + b)} × "
              f"{sv(don_gia)} = {sv((a + b) * don_gia)} đồng"))
    them = rng.randint(3, 9)
    y.append((f"Hôm sau bán được nhiều hơn hôm nay {sv(them)} hộp. "
              f"Tiền hôm sau nhiều hơn hôm nay bao nhiêu?",
              f"{sv(them)} × {sv(don_gia)} = {sv(them * don_gia)} đồng"))
    buoc = [
        f"Cách dài: tính riêng từng buổi rồi cộng. "
        f"{sv(a)} × {sv(don_gia)} = {sv(a * don_gia)}; "
        f"{sv(b)} × {sv(don_gia)} = {sv(b * don_gia)}; cộng lại được "
        f"{sv((a + b) * don_gia)} đồng.",
        f"Cách ngắn: cộng số hộp trước — {sv(a)} + {sv(b)} = {sv(a + b)} hộp — "
        f"rồi nhân một lần: {sv(a + b)} × {sv(don_gia)} = "
        f"**{sv((a + b) * don_gia)} đồng**.",
        f"Hai cách cho cùng kết quả vì `a × c + b × c = (a + b) × c`. Cách ngắn "
        f"chỉ phải nhân **một lần** thay vì hai, nên vừa nhanh vừa ít sai.",
        f"Câu cuối dùng chính tính chất ấy theo chiều ngược: chênh {sv(them)} hộp "
        f"thì chênh {sv(them)} × {sv(don_gia)} = {sv(them * don_gia)} đồng, "
        f"không cần tính tiền cả hai ngày.",
    ]
    return Bai(
        tieu_de="Tính tiền hoá đơn theo hai cách",
        dan=f"Một quầy bán bánh, mỗi hộp **{sv(don_gia)} đồng**.",
        y=y, giai_mau=buoc,
        huong_giai="Khi nhiều món có **cùng đơn giá**, cộng số lượng trước rồi "
                   "nhân một lần. Đó là tính chất một số nhân một tổng, và ở "
                   "hoá đơn thật nó tiết kiệm gần hết công việc.",
        td=["TD3", "TD5"],
        diem_chot="Cùng đơn giá thì cộng số lượng trước, nhân sau — nhân một lần thôi.",
        loi="Nhân từng dòng rồi cộng, dài và dễ sai ở một dòng nào đó.",
        phong="Nhìn cột đơn giá trước: có dòng nào trùng đơn giá không?",
        goi_y=("Hai buổi có cùng một đơn giá không?",
               "Nếu cùng đơn giá, con cộng cái gì trước cho gọn?",
               "Viết lại thành (a + b) × đơn giá rồi nhân một lần."),
        pt_dang="Nhân một số với một tổng",
        pt_kien_thuc="Tính chất phân phối của phép nhân với phép cộng",
        pt_du_lieu="Nhiều dòng hoá đơn dùng chung một đơn giá",
        pt_phuong_phap="Gom số lượng rồi nhân một lần",
        pt_nhanh="Chênh lệch tiền = chênh lệch số lượng × đơn giá, không cần "
                 "tính tổng hai bên.",
        tuong_tu=("Mỗi hộp 15 000 đồng, sáng bán 12 hộp, chiều bán 8 hộp. "
                  "Cả ngày thu bao nhiêu tiền?", "300 000 đồng"),
        mo_rong="Thêm một loại bánh khác giá khác và hỏi tổng cả hai loại.",
        chuan_bi="Nhân số có hai chữ số với số tròn nghìn.")


# ─────────────── NHÓM C — DÃY SỐ VÀ QUY LUẬT ───────────────

@dang_ky("TT-C-M2-01", "C", "M2", lop=(3, 4),
         tu_khoa=("số nhà", "dãy phố", "dãy cách đều", "số lẻ", "thực tế"),
         dang_bai=("Dãy số cách đều", "Tìm số hạng thứ n",
                   "Đếm số hạng của dãy"),
         thuc_te=True, bay="Đếm số nhà bằng cách lấy hiệu chia khoảng cách")
def tt_c_m2_01(rng, lop):
    """Số nhà trên một dãy phố: dãy cách đều và bẫy đếm thiếu một."""
    y, buoc = [], []
    dau = rng.choice([1, 3, 5, 7])
    n = rng.randint(8, 20)
    cuoi = dau + 2 * (n - 1)
    y.append((f"Số nhà đầu dãy là {sv(dau)}, các nhà tiếp theo là "
              f"{sv(dau + 2)}, {sv(dau + 4)}, … Số nhà thứ tư là số nào?",
              sv(dau + 6)))
    y.append((f"Số nhà cuối dãy là {sv(cuoi)}. Dãy phố này có bao nhiêu nhà?",
              f"({sv(cuoi)} − {sv(dau)}) : 2 + 1 = {sv(n)} nhà"))
    k = rng.randint(3, n - 2)
    y.append((f"Nhà thứ {sv(k)} tính từ đầu dãy mang số nào?",
              f"{sv(dau)} + ({sv(k)} − 1) × 2 = {sv(dau + 2 * (k - 1))}"))
    so_hoi = dau + 2 * rng.randint(2, n - 2)
    y.append((f"Nhà mang số {sv(so_hoi)} là nhà thứ mấy tính từ đầu dãy?",
              f"({sv(so_hoi)} − {sv(dau)}) : 2 + 1 = "
              f"{sv((so_hoi - dau) // 2 + 1)}"))
    y.append(("Các số nhà trong dãy này là số chẵn hay số lẻ? Vì sao?",
              "số lẻ — bắt đầu từ một số lẻ rồi cứ cộng thêm 2, "
              "cộng 2 không làm đổi tính chẵn lẻ"))
    buoc = [
        f"Dãy số nhà một bên phố là **dãy cách đều 2 đơn vị**: {sv(dau)}, "
        f"{sv(dau + 2)}, {sv(dau + 4)}, …",
        f"Số nhà thứ {sv(k)}: đi từ nhà đầu tiên thì phải bước "
        f"{sv(k)} − 1 = {sv(k - 1)} lần, mỗi lần 2 đơn vị, nên số nhà là "
        f"{sv(dau)} + {sv(k - 1)} × 2 = **{sv(dau + 2 * (k - 1))}**.",
        f"Đếm số nhà cả dãy: ({sv(cuoi)} − {sv(dau)}) : 2 = {sv(n - 1)} — "
        f"đó mới là **số khoảng cách**, chưa phải số nhà. Cộng thêm 1 mới ra "
        f"**{sv(n)} nhà**.",
        "Đây là bẫy quen thuộc nhất của dãy cách đều: giữa n vật thì chỉ có "
        "n − 1 khoảng, như trồng cây hai đầu một đoạn đường.",
    ]
    return Bai(
        tieu_de="Số nhà trên một dãy phố",
        dan=f"Một bên phố có các nhà mang số lẻ, bắt đầu từ số **{sv(dau)}** và "
            f"kết thúc ở số **{sv(cuoi)}**, hai nhà liền nhau hơn kém nhau 2.",
        y=y, giai_mau=buoc, bay="Đếm số nhà bằng cách lấy hiệu chia khoảng cách",
        huong_giai="Dãy số nhà là dãy cách đều. Số hạng thứ k bằng số đầu cộng "
                   "(k − 1) lần khoảng cách; còn **số lượng số hạng** bằng số "
                   "khoảng cách cộng 1.",
        td=["TD2", "TD4"],
        diem_chot="Số khoảng cách luôn ít hơn số vật đúng 1 — quên cộng 1 là mất bài.",
        loi="Lấy (số cuối − số đầu) : 2 rồi trả lời luôn.",
        phong="Thử với dãy ngắn: 1, 3, 5 có 3 số nhưng chỉ 2 khoảng.",
        goi_y=("Hai nhà liền nhau hơn kém nhau mấy đơn vị?",
               "Từ nhà đầu tới nhà thứ k phải bước bao nhiêu lần?",
               "Đếm số nhà thì cộng thêm 1 vào số khoảng cách."),
        pt_dang="Dãy số cách đều",
        pt_kien_thuc="Số hạng thứ n của dãy cách đều; đếm số hạng",
        pt_du_lieu="Một dãy số thật ngoài đời, các số cách nhau đều nhau",
        pt_phuong_phap="Số hạng thứ k = số đầu + (k − 1) × khoảng cách",
        pt_nhanh="Nhớ một câu: **số vật = số khoảng + 1** khi đếm cả hai đầu.",
        tuong_tu=("Một dãy phố có các nhà số lẻ từ 1 đến 39. Dãy ấy có bao nhiêu "
                  "nhà?", "20 nhà"),
        mo_rong="Hỏi tổng tất cả các số nhà trong dãy.",
        chuan_bi="Dãy số cách đều và phép chia hết.")


@dang_ky("TT-C-M3-01", "C", "M3", lop=(4, 5),
         tu_khoa=("xe buýt", "chuyến", "chu kỳ", "dãy cách đều", "thực tế"),
         dang_bai=("Bài toán chu kỳ", "Dãy số cách đều",
                   "Bài toán về thời gian"),
         thuc_te=True)
def tt_c_m3_01(rng, lop):
    """Giờ chạy xe buýt: dãy cách đều trên trục thời gian."""
    y, buoc = [], []
    gio_dau = rng.randint(5, 7)
    cach = rng.choice([12, 15, 20])
    def gio(p):
        t = gio_dau * 60 + p
        return f"{t // 60} giờ {t % 60:02d} phút"
    y.append((f"Chuyến thứ hai và chuyến thứ ba chạy lúc mấy giờ?",
              f"{gio(cach)} và {gio(2 * cach)}"))
    k = rng.randint(6, 14)
    y.append((f"Chuyến thứ {sv(k)} chạy lúc mấy giờ?",
              f"{gio_dau} giờ + ({sv(k)} − 1) × {sv(cach)} phút = {gio((k - 1) * cach)}"))
    den = rng.randint(gio_dau + 2, gio_dau + 4)
    het = (den - gio_dau) * 60
    so_chuyen = het // cach + 1
    y.append((f"Từ chuyến đầu tiên đến đúng {sv(den)} giờ có bao nhiêu chuyến "
              f"xuất bến?",
              f"({sv(den)} giờ − {sv(gio_dau)} giờ) = {sv(het)} phút; "
              f"{sv(het)} : {sv(cach)} + 1 = {sv(so_chuyen)} chuyến"))
    tre = rng.randint(1, cach - 1)
    cho = cach - tre
    y.append((f"Một người ra bến muộn {sv(tre)} phút so với một chuyến vừa chạy. "
              f"Người ấy phải chờ bao lâu nữa mới có chuyến sau?",
              f"{sv(cach)} − {sv(tre)} = {sv(cho)} phút"))
    y.append((f"Hai chuyến liền nhau cách nhau {sv(cach)} phút thì trong một giờ "
              f"có bao nhiêu chuyến xuất bến?",
              f"60 : {sv(cach)} = {sv(60 // cach)} chuyến"))
    buoc = [
        f"Giờ xuất bến là một **dãy cách đều {sv(cach)} phút**, bắt đầu từ "
        f"{sv(gio_dau)} giờ.",
        f"Chuyến thứ {sv(k)}: từ chuyến đầu phải qua {sv(k)} − 1 = {sv(k - 1)} "
        f"khoảng, mỗi khoảng {sv(cach)} phút, tức {sv((k - 1) * cach)} phút, "
        f"nên chạy lúc **{gio((k - 1) * cach)}**.",
        f"Đếm chuyến tới {sv(den)} giờ: khoảng thời gian là {sv(het)} phút, "
        f"chia được {sv(het // cach)} khoảng, cộng thêm chuyến đầu tiên nữa là "
        f"**{sv(so_chuyen)} chuyến**.",
        f"Người ra bến muộn {sv(tre)} phút thì phần còn lại của khoảng ấy là "
        f"{sv(cach)} − {sv(tre)} = **{sv(cho)} phút** chờ.",
    ]
    return Bai(
        tieu_de="Giờ chạy của xe buýt",
        dan=f"Một tuyến xe buýt có chuyến đầu tiên lúc **{sv(gio_dau)} giờ**, "
            f"sau đó cứ **{sv(cach)} phút** lại có một chuyến.",
        y=y, giai_mau=buoc,
        huong_giai="Giờ xuất bến là dãy cách đều trên trục thời gian. Đổi hết về "
                   "phút rồi làm như dãy số thường, cuối cùng đổi ngược lại giờ.",
        td=["TD2", "TD3"],
        diem_chot="Đổi về cùng một đơn vị (phút) trước khi tính, đừng tính lẫn giờ và phút.",
        loi="Quên cộng 1 khi đếm số chuyến, hoặc cộng phút vào giờ mà không đổi.",
        phong="Viết mọi mốc thời gian ra phút kể từ chuyến đầu.",
        goi_y=("Hai chuyến liền nhau cách nhau bao nhiêu phút?",
               "Từ chuyến đầu tới chuyến thứ k phải qua bao nhiêu khoảng?",
               "Đếm số chuyến thì nhớ cộng thêm chuyến đầu tiên."),
        pt_dang="Bài toán chu kỳ",
        pt_kien_thuc="Dãy cách đều; đổi đơn vị giờ – phút",
        pt_du_lieu="Một sự việc lặp lại đều đặn theo thời gian",
        pt_phuong_phap="Quy về phút, dùng công thức dãy cách đều, đổi ngược lại giờ",
        pt_nhanh="Số chuyến trong một giờ = 60 chia khoảng cách, nhẩm ngay được.",
        tuong_tu=("Chuyến đầu lúc 6 giờ, cứ 15 phút một chuyến. Chuyến thứ 9 chạy "
                  "lúc mấy giờ?", "8 giờ 00 phút"),
        mo_rong="Cho hai tuyến khoảng cách khác nhau, hỏi khi nào hai tuyến cùng "
                "xuất bến một lúc.",
        chuan_bi="Dãy cách đều và phép đổi giờ ra phút.")


# ─────────────── NHÓM F — HÌNH HỌC ───────────────

@dang_ky("TT-F-M2-01", "F", "M2", lop=(3, 4),
         tu_khoa=("hàng rào", "chu vi", "mảnh vườn", "cọc rào", "thực tế"),
         dang_bai=("Chu vi hình chữ nhật", "Bài toán trồng cây",
                   "Bài toán về hàng rào"),
         thuc_te=True, bay="Quên rằng quanh vườn khép kín thì số cọc bằng số khoảng")
def tt_f_m2_01(rng, lop):
    """Rào quanh mảnh vườn: chu vi và số cọc trên đường khép kín."""
    y, buoc = [], []
    d = rng.randrange(12, 40, 2)
    r = rng.randrange(6, d - 2, 2)
    cv = (d + r) * 2
    cach = rng.choice([2, 4])
    while cv % cach:
        cach = 2
    so_coc = cv // cach
    y.append(("Tính chu vi mảnh vườn.",
              f"({sv(d)} + {sv(r)}) × 2 = {sv(cv)} m"))
    y.append((f"Rào quanh vườn hết bao nhiêu mét lưới, biết chừa một cửa rộng 2 m?",
              f"{sv(cv)} − 2 = {sv(cv - 2)} m"))
    y.append((f"Cắm cọc quanh vườn, hai cọc liền nhau cách nhau {sv(cach)} m. "
              f"Cần bao nhiêu cọc?",
              f"{sv(cv)} : {sv(cach)} = {sv(so_coc)} cọc"))
    gia = rng.choice([25000, 30000, 45000])
    y.append((f"Mỗi mét lưới giá {sv(gia)} đồng. Mua lưới rào hết bao nhiêu tiền?",
              f"{sv(cv - 2)} × {sv(gia)} = {sv((cv - 2) * gia)} đồng"))
    y.append(("Diện tích mảnh vườn là bao nhiêu?",
              f"{sv(d)} × {sv(r)} = {sv(d * r)} m²"))
    buoc = [
        f"Chu vi hình chữ nhật = (dài + rộng) × 2 = ({sv(d)} + {sv(r)}) × 2 = "
        f"**{sv(cv)} m**.",
        f"Chừa cửa 2 m thì lưới chỉ cần {sv(cv)} − 2 = {sv(cv - 2)} m.",
        f"Số cọc: đường rào là một **đường khép kín**, nên cọc đầu tiên cũng "
        f"chính là cọc cuối cùng — **số cọc bằng đúng số khoảng**, không cộng "
        f"thêm 1. Vậy {sv(cv)} : {sv(cach)} = **{sv(so_coc)} cọc**.",
        f"Tiền lưới: {sv(cv - 2)} × {sv(gia)} = **{sv((cv - 2) * gia)} đồng**.",
        f"Diện tích: {sv(d)} × {sv(r)} = **{sv(d * r)} m²** — chú ý đơn vị là "
        f"mét vuông, khác với chu vi tính bằng mét.",
    ]
    return Bai(
        tieu_de="Rào quanh mảnh vườn",
        dan=f"Một mảnh vườn hình chữ nhật dài **{sv(d)} m**, rộng **{sv(r)} m**.",
        y=y, giai_mau=buoc,
        bay="Quên rằng quanh vườn khép kín thì số cọc bằng số khoảng",
        huong_giai="Tính chu vi trước, mọi câu về rào và cọc đều dựa vào nó. "
                   "Riêng số cọc phải nhớ đường rào khép kín nên không cộng thêm 1.",
        td=["TD2", "TD4"],
        diem_chot="Đường khép kín: số cọc = số khoảng. Đường thẳng có hai đầu: "
                  "số cọc = số khoảng + 1.",
        loi="Cộng thêm 1 vào số cọc như bài trồng cây trên đoạn thẳng.",
        phong="Vẽ nhanh hình vuông 4 cạnh, cắm cọc thử rồi đếm.",
        goi_y=("Muốn biết rào hết bao nhiêu mét thì phải tính cái gì trước?",
               "Đường rào có điểm đầu và điểm cuối tách rời nhau không?",
               "Với đường khép kín thì số cọc bằng đúng số khoảng."),
        pt_dang="Chu vi hình chữ nhật",
        pt_kien_thuc="Chu vi, diện tích hình chữ nhật; bài toán trồng cây",
        pt_du_lieu="Một mảnh đất có kích thước, cần rào hoặc cắm cọc quanh",
        pt_phuong_phap="Tính chu vi rồi chia cho khoảng cách giữa hai cọc",
        pt_nhanh="Chu vi chia khoảng cách ra ngay số cọc, không phải cộng trừ gì thêm.",
        tuong_tu=("Vườn dài 20 m, rộng 10 m, cắm cọc quanh vườn cách nhau 2 m. "
                  "Cần bao nhiêu cọc?", "30 cọc"),
        mo_rong="Chừa hai cửa ở hai cạnh khác nhau rồi hỏi lại số cọc.",
        chuan_bi="Công thức chu vi, diện tích hình chữ nhật.")


@dang_ky("TT-F-M3-01", "F", "M3", lop=(4, 5),
         tu_khoa=("lát gạch", "nền nhà", "diện tích", "số viên gạch", "thực tế"),
         dang_bai=("Bài toán lát gạch nền nhà", "Diện tích hình chữ nhật",
                   "Đổi đơn vị đo diện tích"),
         thuc_te=True, bay="Không đổi về cùng đơn vị trước khi chia")
def tt_f_m3_01(rng, lop):
    """Lát gạch nền nhà: diện tích, đổi đơn vị và số viên gạch."""
    y, buoc = [], []
    canh = rng.choice([20, 40, 50])            # cạnh viên gạch, cm
    d = rng.randrange(4, 11)                    # m
    r = rng.randrange(3, d + 1)                 # m
    s_nha = d * r * 10000                       # cm²
    s_gach = canh * canh
    so_vien = s_nha // s_gach
    gia = rng.choice([12000, 18000, 25000, 40000])
    y.append(("Tính diện tích nền nhà theo mét vuông.",
              f"{sv(d)} × {sv(r)} = {sv(d * r)} m²"))
    y.append(("Đổi diện tích nền nhà ra xăng-ti-mét vuông.",
              f"{sv(d * r)} m² = {sv(s_nha)} cm²"))
    y.append(("Diện tích một viên gạch là bao nhiêu xăng-ti-mét vuông?",
              f"{sv(canh)} × {sv(canh)} = {sv(s_gach)} cm²"))
    y.append(("Cần bao nhiêu viên gạch để lát kín nền nhà?",
              f"{sv(s_nha)} : {sv(s_gach)} = {sv(so_vien)} viên"))
    y.append((f"Mỗi viên gạch giá {sv(gia)} đồng. Mua gạch lát hết bao nhiêu tiền?",
              f"{sv(so_vien)} × {sv(gia)} = {sv(so_vien * gia)} đồng"))
    buoc = [
        f"Diện tích nền: {sv(d)} × {sv(r)} = **{sv(d * r)} m²**.",
        f"Muốn chia cho diện tích viên gạch thì hai diện tích phải **cùng đơn "
        f"vị**. Viên gạch đo bằng xăng-ti-mét nên đổi nền nhà ra cm²: "
        f"1 m² = 10 000 cm², nên {sv(d * r)} m² = {sv(s_nha)} cm².",
        f"Diện tích một viên: {sv(canh)} × {sv(canh)} = {sv(s_gach)} cm².",
        f"Số viên: {sv(s_nha)} : {sv(s_gach)} = **{sv(so_vien)} viên**.",
        f"Tiền gạch: {sv(so_vien)} × {sv(gia)} = **{sv(so_vien * gia)} đồng**.",
    ]
    return Bai(
        tieu_de="Lát gạch nền nhà",
        dan=f"Một căn phòng hình chữ nhật dài **{sv(d)} m**, rộng **{sv(r)} m**, "
            f"lát bằng gạch vuông cạnh **{sv(canh)} cm**.",
        y=y, giai_mau=buoc, bay="Không đổi về cùng đơn vị trước khi chia",
        huong_giai="Số viên gạch = diện tích nền chia diện tích một viên, nhưng "
                   "**chỉ chia được khi hai diện tích cùng đơn vị**. Nền đo bằng "
                   "mét, gạch đo bằng xăng-ti-mét, nên phải đổi trước.",
        td=["TD2", "TD4"],
        diem_chot="1 m² = 10 000 cm², không phải 100 cm² — đây là chỗ sai nhiều nhất.",
        loi="Chia thẳng m² cho cm², hoặc đổi 1 m² thành 100 cm².",
        phong="Viết đơn vị vào cạnh mỗi con số trước khi bấm phép chia.",
        goi_y=("Diện tích nền nhà tính theo đơn vị gì? Còn viên gạch?",
               "1 m² bằng bao nhiêu cm²? Vẽ hình vuông cạnh 1 m rồi đếm.",
               "Đổi xong mới chia diện tích nền cho diện tích một viên."),
        pt_dang="Bài toán lát gạch nền nhà",
        pt_kien_thuc="Diện tích hình chữ nhật, hình vuông; đổi đơn vị đo diện tích",
        pt_du_lieu="Kích thước một mặt phẳng và kích thước vật dùng để phủ kín nó",
        pt_phuong_phap="Đổi về cùng đơn vị rồi chia hai diện tích",
        pt_nhanh="Đổi cạnh viên gạch ra mét trước cũng được, khi ấy chia m² cho m².",
        tuong_tu=("Phòng dài 6 m, rộng 4 m, lát gạch vuông cạnh 40 cm. "
                  "Cần bao nhiêu viên gạch?", "150 viên"),
        mo_rong="Cho gạch bán theo hộp 6 viên và hỏi phải mua mấy hộp.",
        chuan_bi="Diện tích hình chữ nhật và bảng đơn vị đo diện tích.")


@dang_ky("TT-F-M4-01", "F", "M4", lop=(5,),
         tu_khoa=("sơn tường", "diện tích xung quanh", "quét vôi", "trừ cửa",
                  "thực tế"),
         dang_bai=("Diện tích xung quanh hình hộp chữ nhật",
                   "Bài toán quét vôi, sơn tường",
                   "Bài toán diện tích có phần phải trừ"),
         thuc_te=True, bay="Quên trừ diện tích cửa")
def tt_f_m4_01(rng, lop):
    """Sơn tường một căn phòng: diện tích xung quanh trừ phần cửa."""
    y, buoc = [], []
    d = rng.randrange(5, 10)
    r = rng.randrange(4, d + 1)
    c = rng.choice([3, 4])
    sxq = (d + r) * 2 * c
    tran = d * r
    cua_chinh = 2 * 1                     # 2 m × 1 m
    so_so = rng.randint(2, 3)
    cua_so = so_so * (1 * 1)              # mỗi cửa sổ 1 m × 1 m
    phai_son = sxq - cua_chinh - cua_so
    m2_lit = rng.choice([4, 5])
    y.append(("Tính diện tích xung quanh của căn phòng.",
              f"({sv(d)} + {sv(r)}) × 2 × {sv(c)} = {sv(sxq)} m²"))
    y.append((f"Tổng diện tích một cửa ra vào 2 m × 1 m và {sv(so_so)} cửa sổ "
              f"1 m × 1 m là bao nhiêu?",
              f"{sv(cua_chinh)} + {sv(cua_so)} = {sv(cua_chinh + cua_so)} m²"))
    y.append(("Diện tích thật sự phải sơn là bao nhiêu?",
              f"{sv(sxq)} − {sv(cua_chinh + cua_so)} = {sv(phai_son)} m²"))
    y.append((f"Mỗi lít sơn phủ được {sv(m2_lit)} m². Cần ít nhất bao nhiêu lít sơn?",
              f"{sv(phai_son)} : {sv(m2_lit)} = "
              f"{sv(-(-phai_son // m2_lit))} lít (làm tròn lên)"))
    y.append(("Diện tích trần nhà là bao nhiêu?", f"{sv(d)} × {sv(r)} = {sv(tran)} m²"))
    buoc = [
        f"Bốn bức tường ghép lại chính là **mặt xung quanh của hình hộp chữ "
        f"nhật**: S = (dài + rộng) × 2 × cao = ({sv(d)} + {sv(r)}) × 2 × "
        f"{sv(c)} = **{sv(sxq)} m²**.",
        f"Cửa không sơn, nên phải trừ: cửa ra vào {sv(cua_chinh)} m², "
        f"{sv(so_so)} cửa sổ {sv(cua_so)} m², tổng {sv(cua_chinh + cua_so)} m².",
        f"Diện tích phải sơn: {sv(sxq)} − {sv(cua_chinh + cua_so)} = "
        f"**{sv(phai_son)} m²**.",
        f"Lượng sơn: {sv(phai_son)} : {sv(m2_lit)} = "
        f"{sv(phai_son / m2_lit)} lít. Sơn bán theo lít nên phải **làm tròn "
        f"lên** thành {sv(-(-phai_son // m2_lit))} lít — thiếu sơn thì tường "
        f"dở dang, thừa một ít thì không sao.",
    ]
    return Bai(
        tieu_de="Sơn tường một căn phòng",
        dan=f"Căn phòng hình hộp chữ nhật dài **{sv(d)} m**, rộng **{sv(r)} m**, "
            f"cao **{sv(c)} m**. Phòng có một cửa ra vào 2 m × 1 m và "
            f"**{sv(so_so)} cửa sổ** 1 m × 1 m.",
        y=y, giai_mau=buoc, bay="Quên trừ diện tích cửa",
        huong_giai="Bốn bức tường là mặt xung quanh của hình hộp chữ nhật. "
                   "Tính diện tích xung quanh trước, rồi **trừ phần cửa** vì cửa "
                   "không sơn. Bài toán lượng sơn phải làm tròn lên.",
        td=["TD2", "TD4", "TD5"],
        diem_chot="Đề thật luôn có phần không sơn. Tính xong diện tích xung quanh "
                  "phải hỏi ngay: có chỗ nào không sơn không?",
        loi="Lấy luôn diện tích xung quanh làm diện tích phải sơn.",
        phong="Đọc lại đề, khoanh tròn mọi thứ 'khoét vào tường': cửa, ô thoáng.",
        goi_y=("Bốn bức tường ghép lại là mặt nào của hình hộp chữ nhật?",
               "Cửa có được sơn không? Vậy phải làm gì với diện tích cửa?",
               "Sơn bán theo lít nguyên nên số lít phải làm tròn về phía nào?"),
        pt_dang="Diện tích xung quanh hình hộp chữ nhật",
        pt_kien_thuc="Diện tích xung quanh, diện tích toàn phần; làm tròn lên",
        pt_du_lieu="Kích thước một căn phòng kèm kích thước các cửa",
        pt_phuong_phap="Diện tích xung quanh trừ diện tích các cửa",
        pt_nhanh="Chu vi đáy nhân chiều cao ra ngay diện tích xung quanh.",
        tuong_tu=("Phòng dài 6 m, rộng 4 m, cao 3 m, có một cửa 2 m². "
                  "Diện tích phải sơn là bao nhiêu?", "58 m²"),
        mo_rong="Sơn thêm cả trần nhà và hỏi lại lượng sơn.",
        chuan_bi="Công thức diện tích xung quanh hình hộp chữ nhật.")


# ─────────────── NHÓM H — THỐNG KÊ, LỚP 3 VÀ 4 ───────────────

@dang_ky("TT-H-M2-01", "H", "M2", lop=(3, 4),
         tu_khoa=("bảng thống kê", "đọc bảng", "số liệu", "lớp học", "thực tế"),
         dang_bai=("Đọc bảng số liệu thống kê", "Bài toán nhiều hơn ít hơn",
                   "Tính tổng từ bảng"),
         thuc_te=True)
def tt_h_m2_01(rng, lop):
    """Đọc một bảng thống kê thật của lớp học."""
    to = ["Tổ 1", "Tổ 2", "Tổ 3", "Tổ 4"]
    nam = [rng.randint(4, 9) for _ in to]
    nu = [rng.randint(4, 9) for _ in to]
    tong = [a + b for a, b in zip(nam, nu)]
    i_max = tong.index(max(tong))
    i_min = tong.index(min(tong))
    bang = ("| Tổ | Số bạn nam | Số bạn nữ |\n|:--:|---:|---:|\n"
            + "\n".join(f"| {t} | {sv(a)} | {sv(b)} |"
                        for t, a, b in zip(to, nam, nu)))
    y = [
        ("Tổ nào có nhiều bạn nhất, và tổ ấy có bao nhiêu bạn?",
         f"{to[i_max]} — {sv(max(tong))} bạn"),
        ("Tổ nào có ít bạn nhất?", f"{to[i_min]} — {sv(min(tong))} bạn"),
        ("Cả lớp có bao nhiêu bạn nam, bao nhiêu bạn nữ?",
         f"{sv(sum(nam))} bạn nam và {sv(sum(nu))} bạn nữ"),
        ("Cả lớp có tất cả bao nhiêu bạn?", f"{sv(sum(tong))} bạn"),
        (f"{to[i_max]} nhiều hơn {to[i_min]} bao nhiêu bạn?",
         f"{sv(max(tong))} − {sv(min(tong))} = {sv(max(tong) - min(tong))} bạn"),
        ("Cả lớp nam nhiều hơn nữ hay nữ nhiều hơn nam, và chênh mấy bạn?",
         (f"nam nhiều hơn {sv(sum(nam) - sum(nu))} bạn" if sum(nam) > sum(nu)
          else f"nữ nhiều hơn {sv(sum(nu) - sum(nam))} bạn" if sum(nu) > sum(nam)
          else "bằng nhau")),
    ]
    buoc = [
        "Đọc bảng thì đọc **tên cột trước, số sau**. Cột thứ hai là số bạn nam, "
        "cột thứ ba là số bạn nữ — mỗi tổ nằm trên một hàng.",
        "Muốn biết mỗi tổ có bao nhiêu bạn thì cộng hai cột của hàng ấy: "
        + " · ".join(f"{t} {sv(a)} + {sv(b)} = {sv(c)}"
                     for t, a, b, c in zip(to, nam, nu, tong)) + ".",
        f"So bốn số vừa tính: nhiều nhất là {to[i_max]} với {sv(max(tong))} bạn, "
        f"ít nhất là {to[i_min]} với {sv(min(tong))} bạn.",
        f"Cả lớp: cộng theo **cột** — nam {sv(sum(nam))} bạn, nữ {sv(sum(nu))} "
        f"bạn, tất cả **{sv(sum(tong))} bạn**. Cộng theo hàng rồi cộng lại cũng "
        f"ra đúng con số ấy, đó là cách tự kiểm tra.",
    ]
    return Bai(
        tieu_de="Đọc bảng thống kê của lớp",
        dan="Bảng ghi số bạn nam và số bạn nữ của bốn tổ trong một lớp:\n\n"
            + bang + "\n\nDùng chung bảng này cho mọi ý.",
        y=y, giai_mau=buoc,
        huong_giai="Cộng theo hàng để biết từng tổ, cộng theo cột để biết cả lớp. "
                   "Hai cách phải cho cùng một tổng — đó là cách tự kiểm tra "
                   "không cần ai chấm.",
        td=["TD1", "TD2"],
        diem_chot="Cộng theo hàng và cộng theo cột phải ra cùng một tổng.",
        loi="Đọc nhầm cột, lấy số bạn nữ trả lời câu hỏi về bạn nam.",
        phong="Lấy ngón tay dò theo hàng, đọc tên cột trước khi lấy số.",
        goi_y=("Mỗi hàng của bảng nói về cái gì? Mỗi cột nói về cái gì?",
               "Muốn biết một tổ có bao nhiêu bạn thì cộng những số nào?",
               "Cộng theo cột rồi so với tổng cộng theo hàng để kiểm tra."),
        pt_dang="Đọc bảng số liệu thống kê",
        pt_kien_thuc="Đọc bảng; cộng trừ trong phạm vi 100",
        pt_du_lieu="Một bảng hai chiều: hàng là nhóm, cột là loại số liệu",
        pt_phuong_phap="Cộng theo hàng cho từng nhóm, cộng theo cột cho toàn bộ",
        pt_nhanh="Tổng theo hàng và tổng theo cột luôn bằng nhau, dùng để soát lại.",
        tuong_tu=("Tổ 1 có 5 nam 4 nữ, tổ 2 có 6 nam 6 nữ. Hai tổ có tất cả bao "
                  "nhiêu bạn?", "21 bạn"),
        mo_rong="Vẽ biểu đồ cột cho bảng này rồi trả lời lại các câu hỏi.",
        chuan_bi="Kỹ năng đọc bảng và cộng trừ trong phạm vi 100.")


@dang_ky("TT-H-M3-01", "H", "M3", lop=(4, 5),
         tu_khoa=("biểu đồ cột", "số ngày mưa", "đọc biểu đồ", "trung bình cộng",
                  "thực tế"),
         dang_bai=("Đọc biểu đồ cột", "Trung bình cộng",
                   "Bài toán từ biểu đồ"),
         thuc_te=True, bay="Đọc nhầm vạch của trục dọc")
def tt_h_m3_01(rng, lop):
    """Đọc biểu đồ cột số ngày mưa và tính trung bình cộng."""
    thang = [f"Tháng {i}" for i in range(rng.choice([1, 5, 7]),
                                         rng.choice([1, 5, 7]) + 5)]
    thang = [f"Tháng {i}" for i in range(5, 10)]
    ngay = [rng.randrange(2, 26, 2) for _ in thang]
    i_max, i_min = ngay.index(max(ngay)), ngay.index(min(ngay))
    tong = sum(ngay)
    tb = tong / len(ngay)
    cot = "\n".join(f"| {t} | {'█' * (n // 2)} | {sv(n)} |"
                    for t, n in zip(thang, ngay))
    bang = ("| Tháng | Biểu đồ (mỗi ô = 2 ngày) | Số ngày mưa |\n"
            "|:--:|---|---:|\n" + cot)
    y = [
        ("Tháng nào có nhiều ngày mưa nhất, và bao nhiêu ngày?",
         f"{thang[i_max]} — {sv(max(ngay))} ngày"),
        ("Tháng nào có ít ngày mưa nhất?",
         f"{thang[i_min]} — {sv(min(ngay))} ngày"),
        ("Cả năm tháng có tất cả bao nhiêu ngày mưa?", f"{sv(tong)} ngày"),
        ("Trung bình mỗi tháng có bao nhiêu ngày mưa?",
         f"{sv(tong)} : {sv(len(ngay))} = {sv(tb)} ngày"),
        (f"{thang[i_max]} nhiều hơn {thang[i_min]} bao nhiêu ngày mưa?",
         f"{sv(max(ngay) - min(ngay))} ngày"),
        ("Có mấy tháng có số ngày mưa nhiều hơn mức trung bình?",
         f"{sv(sum(1 for n in ngay if n > tb))} tháng"),
    ]
    buoc = [
        "Đọc biểu đồ cột thì **đọc chú thích trước**: ở đây mỗi ô của cột thay "
        "cho 2 ngày, nên cột dài 6 ô nghĩa là 12 ngày, không phải 6 ngày.",
        f"Đọc từng cột ra số: " + " · ".join(
            f"{t} {sv(n)}" for t, n in zip(thang, ngay)) + ".",
        f"So các số vừa đọc: cao nhất {thang[i_max]} ({sv(max(ngay))} ngày), "
        f"thấp nhất {thang[i_min]} ({sv(min(ngay))} ngày).",
        f"Tổng: {' + '.join(sv(n) for n in ngay)} = {sv(tong)} ngày. "
        f"Trung bình mỗi tháng: {sv(tong)} : {sv(len(ngay))} = **{sv(tb)} ngày**.",
        f"Đếm số tháng vượt mức trung bình {sv(tb)}: có "
        f"**{sv(sum(1 for n in ngay if n > tb))} tháng**. Trung bình cộng không "
        f"phải là số ở giữa — có thể nhiều tháng cùng nằm dưới hoặc trên nó.",
    ]
    return Bai(
        tieu_de="Đọc biểu đồ số ngày mưa",
        dan="Biểu đồ ghi số ngày mưa của năm tháng liên tiếp tại một trạm đo:"
            "\n\n" + bang + "\n\nDùng chung biểu đồ này cho mọi ý.",
        y=y, giai_mau=buoc, bay="Đọc nhầm vạch của trục dọc",
        huong_giai="Đọc chú thích của biểu đồ trước để biết một ô ứng với mấy "
                   "đơn vị, rồi mới đổi từng cột ra số. Có số rồi thì mọi câu "
                   "hỏi trở thành bài cộng trừ và trung bình cộng bình thường.",
        td=["TD1", "TD2", "TD4"],
        diem_chot="Một ô của biểu đồ hiếm khi bằng 1 đơn vị — đọc chú thích trước.",
        loi="Đếm số ô rồi trả lời luôn, quên nhân với giá trị mỗi ô.",
        phong="Khoanh tròn dòng chú thích trước khi nhìn vào cột nào.",
        goi_y=("Mỗi ô trên biểu đồ thay cho mấy ngày?",
               "Đổi từng cột ra số ngày rồi ghi ra nháp thành một dãy.",
               "Trung bình cộng = tổng chia cho số tháng."),
        pt_dang="Đọc biểu đồ cột",
        pt_kien_thuc="Đọc biểu đồ; trung bình cộng; so sánh số",
        pt_du_lieu="Biểu đồ có chú thích tỉ lệ, mỗi ô thay cho nhiều đơn vị",
        pt_phuong_phap="Đổi biểu đồ về dãy số rồi làm như bài số liệu thường",
        pt_nhanh="Ghi cả dãy số ra nháp một lần, mọi câu sau đều dùng lại dãy ấy.",
        tuong_tu=("Bốn tháng có số ngày mưa 8, 12, 10, 14. Trung bình mỗi tháng "
                  "bao nhiêu ngày mưa?", "11 ngày"),
        mo_rong="Thêm một tháng nữa và hỏi trung bình thay đổi thế nào.",
        chuan_bi="Đọc biểu đồ cột và công thức trung bình cộng.")
