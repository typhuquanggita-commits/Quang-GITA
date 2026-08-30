# -*- coding: utf-8 -*-
"""Thư viện mẫu bài v2 — NHÓM H: Phân số – Thập phân – Phần trăm – Thống kê."""
from __future__ import annotations

from fractions import Fraction

from .khung import Bai, TEN, dang_ky, luan_phien, ps, sv

DO_VAT_TRANH = [("quyển sách", "📕"), ("bông hoa", "🌼"), ("quả táo", "🍎"),
                ("chiếc bút", "✏️"), ("lá cờ", "🚩")]


@dang_ky("H2-M2-31", "H", "M2", lop=(3, 4),
         tu_khoa=("biểu đồ tranh", "đọc biểu đồ", "lập biểu đồ"),
         dang_bai=("Biểu đồ tranh — đọc và lập",))
def h2_m2_31(rng, lop):
    ten = rng.sample(TEN, 4)
    don = rng.choice([2, 5, 10])
    sl = [rng.randint(2, 8) for _ in ten]
    that = [x * don for x in sl]
    vat, _icon = rng.choice(DO_VAT_TRANH)
    bang = " · ".join(f"{t}: {'●' * s}" for t, s in zip(ten, sl))
    tong = sum(that)
    lon = ten[that.index(max(that))]
    be = ten[that.index(min(that))]
    y = [(f"Mỗi hình ● ứng với {sv(don)} {vat}. Bạn {ten[0]} có bao nhiêu {vat}?",
          sv(that[0])),
         (f"Bạn {ten[1]} có bao nhiêu {vat}?", sv(that[1])),
         (f"Cả bốn bạn có tất cả bao nhiêu {vat}?", sv(tong)),
         (f"Bạn nào có nhiều {vat} nhất?", f"{lon} ({sv(max(that))})"),
         (f"Bạn nào có ít {vat} nhất?", f"{be} ({sv(min(that))})"),
         (f"Bạn nhiều nhất hơn bạn ít nhất bao nhiêu {vat}?", sv(max(that) - min(that))),
         (f"Nếu một bạn có {sv(don * 6)} {vat} thì phải vẽ mấy hình ●?", "6 hình")]
    return Bai(
        tieu_de="Đọc và lập biểu đồ tranh",
        dan=f"Biểu đồ tranh số {vat} của bốn bạn — mỗi hình ● ứng với **{sv(don)} {vat}**:"
            f"\n\n{bang}",
        y=y,
        giai_mau=[f"Đọc chú thích trước: mỗi hình ● ứng với {sv(don)} {vat}.",
                  f"Bạn {ten[0]} có {sv(sl[0])} hình ●.",
                  f"Số {vat} của bạn ấy: {sv(sl[0])} × {sv(don)} = {sv(that[0])}.",
                  f"Làm tương tự cho ba bạn còn lại rồi cộng để có tổng {sv(tong)}.",
                  f"Đáp số ý a: **{sv(that[0])} {vat}**."],
        huong_giai="Việc đầu tiên khi đọc biểu đồ tranh là đọc **chú thích**: mỗi hình ứng "
                   "với bao nhiêu đơn vị. Sau đó nhân số hình với số ấy. Muốn lập biểu đồ "
                   "thì làm ngược lại: chia số thật cho số đơn vị mỗi hình.",
        td=["TD1", "TD2"],
        diem_chot="Mỗi hình **không phải một đơn vị** — phải đọc chú thích trước.",
        loi="Đếm số hình rồi trả lời luôn, quên nhân với số đơn vị mỗi hình.",
        phong="Khoanh tròn dòng chú thích trước khi trả lời bất kỳ câu nào.",
        goi_y=("Mỗi hình ● ứng với bao nhiêu đơn vị?",
               "Bạn ấy có bao nhiêu hình ●?",
               "Nhân hai số ấy với nhau."),
        pt_dang="Đọc và lập biểu đồ tranh",
        pt_kien_thuc="Biểu đồ tranh, phép nhân và chia",
        pt_du_lieu="Có hình vẽ lặp lại kèm một dòng chú thích",
        pt_phuong_phap="Đọc chú thích → nhân số hình với đơn vị",
        pt_nhanh="Nếu mọi bạn đều dùng cùng một loại hình thì so số hình là đủ để "
                 "biết ai nhiều nhất.",
        tuong_tu=("Mỗi hình ứng với 5 quyển sách, bạn A có 4 hình. A có mấy quyển?",
                  "20 quyển"),
        mo_rong="Đổi sang biểu đồ cột, hỏi cùng những câu ấy.",
        chuan_bi="Bảng nhân và cách đọc bảng số liệu.",
        bay="Một hình không phải một đơn vị")


@dang_ky("H2-M4-51", "H", "M4", lop=(5,),
         tu_khoa=("phần trăm nhiều bước", "tỉ số phần trăm ẩn", "tỉ lệ phần trăm"),
         dang_bai=("Bài toán phần trăm nhiều bước",
                   "Bài toán về tỉ số và tỉ lệ phần trăm ẩn"), thuc_te=True)
def h2_m4_51(rng, lop):
    si = rng.choice([40, 50, 60, 80, 100, 120])
    p1 = rng.choice([20, 25, 40, 50])
    nam = si * p1 // 100
    nu = si - nam
    p2 = rng.choice([20, 25, 50])
    gioi_nam = nam * p2 // 100
    y = [(f"Lớp có {sv(si)} học sinh, trong đó nam chiếm {sv(p1)}%. Lớp có bao nhiêu "
          f"học sinh nam?", sv(nam)),
         ("Lớp có bao nhiêu học sinh nữ?", sv(nu)),
         ("Số học sinh nữ chiếm bao nhiêu phần trăm cả lớp?", f"{sv(100 - p1)}%"),
         (f"Trong số học sinh nam, có {sv(p2)}% đạt loại giỏi. Có bao nhiêu bạn nam giỏi?",
          sv(gioi_nam)),
         ("Số bạn nam giỏi chiếm bao nhiêu phần trăm cả lớp?",
          sv(round(gioi_nam / si * 100, 2)) + "%"),
         ("Vì sao con số vừa tìm khác với " + sv(p2) + "%?",
          "vì " + sv(p2) + "% tính trên số nam, còn câu này tính trên cả lớp")]
    return Bai(
        tieu_de="Phần trăm nhiều bước — mốc 100% thay đổi",
        dan="Trước mỗi ý, viết rõ: đại lượng nào đang ứng với 100%.",
        y=y,
        giai_mau=[f"Cả lớp ứng với 100%, tức {sv(si)} học sinh.",
                  f"Bước 1 — số nam: {sv(si)} : 100 × {sv(p1)} = {sv(nam)} (bạn).",
                  f"Bước 2 — số nữ: {sv(si)} − {sv(nam)} = {sv(nu)} (bạn).",
                  f"Bước 3 — nam giỏi tính trên **số nam**, không phải trên cả lớp: "
                  f"{sv(nam)} : 100 × {sv(p2)} = {sv(gioi_nam)} (bạn).",
                  f"Bước 4 — tỉ lệ nam giỏi so với cả lớp: {sv(gioi_nam)} : {sv(si)} × 100 "
                  f"= {sv(round(gioi_nam / si * 100, 2))}%.",
                  f"Đáp số ý d: **{sv(gioi_nam)} bạn**."],
        huong_giai="Mỗi lần gặp một tỉ lệ phần trăm mới, phải hỏi: phần trăm này tính "
                   "**trên cái gì**. Trong bài này, tỉ lệ nam giỏi tính trên số nam, không "
                   "phải trên sĩ số cả lớp.",
        td=["TD6", "TD2"],
        diem_chot="Cùng một con số phần trăm nhưng **mốc khác nhau** thì kết quả khác nhau.",
        loi="Lấy tỉ lệ nam giỏi nhân thẳng với sĩ số cả lớp.",
        phong="Viết trước mỗi phép tính: “100% ở đây là …”.",
        goi_y=("Đại lượng nào ứng với 100% ở ý này?",
               "Tỉ lệ này tính trên cả lớp hay chỉ trên số nam?",
               "Muốn quy về cả lớp thì chia cho sĩ số rồi nhân 100."),
        pt_dang="Tỉ số phần trăm nhiều bước",
        pt_kien_thuc="Ba dạng tỉ số phần trăm; mốc quy chiếu",
        pt_du_lieu="Hai tỉ lệ phần trăm nối tiếp nhau trong cùng một bài",
        pt_phuong_phap="Xác định lại mốc 100% trước mỗi bước",
        pt_nhanh="Nhân hai tỉ lệ rồi chia 100 là ra tỉ lệ so với mốc gốc.",
        tuong_tu=("Lớp 40 bạn, nam chiếm 50%, trong đó 20% giỏi. Mấy bạn nam giỏi?",
                  "4 bạn"),
        mo_rong="Hỏi ngược: biết số nam giỏi và các tỉ lệ, tìm sĩ số cả lớp.",
        chuan_bi="Ba dạng cơ bản của tỉ số phần trăm.",
        bay="Mốc 100% khác nhau ở mỗi bước")


@dang_ky("H2-M5-51", "H", "M5", lop=(5,),
         tu_khoa=("dung dịch", "hỗn hợp", "phần trăm", "nồng độ", "pha"),
         dang_bai=("Bài toán phần trăm trong bài toán dung dịch và hỗn hợp",), thuc_te=True)
def h2_m5_51(rng, lop):
    m = rng.choice([200, 250, 400, 500])
    p = rng.choice([10, 20, 25, 40])
    muoi = m * p // 100
    them_nuoc = rng.choice([100, 200, 300])
    p_moi = Fraction(muoi * 100, m + them_nuoc)
    them_muoi = rng.choice([10, 20, 25, 50])
    p_muoi = Fraction((muoi + them_muoi) * 100, m + them_muoi)
    y = [(f"Có {sv(m)} g nước muối chứa {sv(p)}% muối. Trong đó có bao nhiêu gam muối?",
          sv(muoi) + " g"),
         ("Trong đó có bao nhiêu gam nước?", sv(m - muoi) + " g"),
         (f"Đổ thêm {sv(them_nuoc)} g nước vào. Khối lượng dung dịch mới là bao nhiêu?",
          sv(m + them_nuoc) + " g"),
         ("Lượng muối có thay đổi không?", "không đổi, vẫn là " + sv(muoi) + " g"),
         ("Nồng độ muối của dung dịch mới bằng bao nhiêu phần trăm?",
          sv(round(float(p_moi), 2)) + "%"),
         (f"Nếu thay vì đổ nước, ta bỏ thêm {sv(them_muoi)} g muối vào dung dịch ban đầu "
          f"thì nồng độ mới bằng bao nhiêu phần trăm?",
          sv(round(float(p_muoi), 2)) + "%")]
    return Bai(
        tieu_de="Dung dịch và nồng độ phần trăm",
        dan="Luôn tách rõ hai đại lượng: lượng chất tan và khối lượng dung dịch.",
        y=y,
        giai_mau=[f"Bước 1 — lượng muối: {sv(m)} : 100 × {sv(p)} = {sv(muoi)} (g).",
                  f"Bước 2 — lượng nước: {sv(m)} − {sv(muoi)} = {sv(m - muoi)} (g).",
                  f"Bước 3 — đổ thêm nước thì **lượng muối không đổi**, chỉ khối lượng "
                  f"dung dịch tăng: {sv(m)} + {sv(them_nuoc)} = {sv(m + them_nuoc)} (g).",
                  f"Bước 4 — nồng độ mới: {sv(muoi)} : {sv(m + them_nuoc)} × 100 = "
                  f"{sv(round(float(p_moi), 2))}%.",
                  f"Nhận xét: đổ thêm nước thì nồng độ **giảm**, đúng như trực giác.",
                  f"Đáp số ý e: **{sv(round(float(p_moi), 2))}%**."],
        huong_giai="Nồng độ phần trăm bằng lượng chất tan chia khối lượng dung dịch rồi "
                   "nhân 100. Đổ thêm nước thì tử số giữ nguyên, mẫu số tăng, nên nồng độ "
                   "giảm. Bỏ thêm muối thì **cả tử và mẫu cùng tăng**.",
        td=["TD6", "TD3"],
        diem_chot="Đổ thêm nước: **lượng muối không đổi**. Bỏ thêm muối: cả hai cùng đổi.",
        loi="Khi bỏ thêm muối thì chỉ cộng vào tử số mà quên cộng vào mẫu số.",
        phong="Kẻ bảng hai dòng: lượng muối và khối lượng dung dịch, cập nhật sau mỗi thao tác.",
        goi_y=("Lượng muối ban đầu bằng bao nhiêu?",
               "Đổ thêm nước thì lượng muối có đổi không?",
               "Nồng độ = lượng muối chia khối lượng dung dịch rồi nhân 100."),
        pt_dang="Nồng độ phần trăm của dung dịch",
        pt_kien_thuc="Tỉ số phần trăm; phân biệt chất tan và dung dịch",
        pt_du_lieu="“Dung dịch … %”, “đổ thêm nước”, “bỏ thêm muối”",
        pt_phuong_phap="Kẻ bảng theo dõi tử số và mẫu số qua từng thao tác",
        pt_nhanh="Thêm nước thì nồng độ giảm, thêm muối thì nồng độ tăng — dùng để "
                 "loại đáp số sai ngay.",
        tuong_tu=("200 g nước muối 10%, đổ thêm 200 g nước. Nồng độ mới bằng bao nhiêu?",
                  "5%"),
        mo_rong="Trộn hai dung dịch nồng độ khác nhau — cộng riêng tử số, cộng riêng mẫu số.",
        chuan_bi="Ba dạng cơ bản của tỉ số phần trăm.",
        bay="Thêm muối thì cả tử và mẫu cùng tăng")


@dang_ky("B2-M1-41", "B", "M1", lop=(4, 5),
         tu_khoa=("ôn tập bốn phép tính", "số tự nhiên", "ôn tập"),
         dang_bai=("Ôn tập bốn phép tính với số tự nhiên",))
def b2_m1_41(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["cong", "tru", "nhan", "chia"],
                                        rng.randint(5, 8))):
        a = rng.randint(1_000, 999_999)
        b = rng.randint(11, 999)
        if kieu == "cong":
            c = rng.randint(1_000, 999_999)
            y.append((f"{sv(a)} + {sv(c)}", sv(a + c)))
        elif kieu == "tru":
            c = rng.randint(100, a - 1)
            y.append((f"{sv(a)} − {sv(c)}", sv(a - c)))
        elif kieu == "nhan":
            y.append((f"{sv(a)} × {sv(b)}", sv(a * b)))
            if k == 0:
                buoc = [f"Đặt tính, nhân lần lượt từng chữ số của {sv(b)} với {sv(a)}.",
                        f"Mỗi tích riêng viết lùi sang trái một cột.",
                        f"Cộng các tích riêng lại: {sv(a)} × {sv(b)} = {sv(a * b)}.",
                        f"Ước lượng kiểm tra: khoảng {sv(round(a, -3))} × {sv(round(b, -2))} "
                        f"≈ {sv(round(a, -3) * round(b, -2))} — cùng độ lớn ✓",
                        f"Đáp số: **{sv(a * b)}**."]
        else:
            y.append((f"{sv(a * b)} : {sv(b)}", sv(a)))
    return Bai(
        tieu_de="Ôn tập bốn phép tính với số tự nhiên",
        dan="Đặt tính rồi tính. Ước lượng trước để tự kiểm tra.",
        y=y, giai_mau=buoc,
        huong_giai="Cộng, trừ thì viết thẳng hàng đơn vị. Nhân thì viết các tích riêng lùi "
                   "đúng cột rồi cộng. Chia thì mỗi lần hạ một chữ số phải viết một chữ số "
                   "ở thương, kể cả chữ số 0.",
        td=["TD1"],
        diem_chot="Mỗi lần hạ một chữ số là **bắt buộc** viết một chữ số ở thương.",
        loi="Quên viết chữ số 0 ở giữa thương nên thương thiếu chữ số.",
        phong="Đếm trước xem thương có mấy chữ số rồi mới chia.",
        goi_y=("Viết các số thẳng hàng đơn vị.",
               "Với phép nhân, tích riêng lùi sang trái một cột.",
               "Với phép chia, hạ một chữ số thì viết một chữ số ở thương."),
        pt_dang="Bốn phép tính với số tự nhiên",
        pt_kien_thuc="Kĩ thuật đặt tính cộng, trừ, nhân, chia",
        pt_du_lieu="Yêu cầu “đặt tính rồi tính”",
        pt_phuong_phap="Đặt tính thẳng cột, tính từ hàng đơn vị",
        pt_nhanh="Ước lượng bằng cách làm tròn để phát hiện sai sót về độ lớn.",
        tuong_tu=("Đặt tính rồi tính: 3 045 × 24", "73 080"),
        mo_rong="Thêm phép tính có dấu ngoặc để ôn thứ tự thực hiện.",
        chuan_bi="Bảng nhân chia và kĩ thuật đặt tính.",
        chu_y="Chữ số 0 ở giữa thương")
