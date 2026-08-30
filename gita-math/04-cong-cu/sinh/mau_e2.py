# -*- coding: utf-8 -*-
"""Thư viện mẫu bài v2 — NHÓM E: Đại lượng – Đo lường – Thời gian."""
from __future__ import annotations

from fractions import Fraction

from .khung import Bai, dang_ky, hoa, luan_phien, nam as ten_nam, sv

TIEN = [1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000]
THANG_31 = (1, 3, 5, 7, 8, 10, 12)


def so_cach_tra(so_tien: int, menh: list[int]) -> int:
    """Đếm số cách trả đúng số tiền bằng các mệnh giá cho trước (không giới hạn tờ)."""
    dp = [0] * (so_tien + 1)
    dp[0] = 1
    for m in menh:
        for v in range(m, so_tien + 1):
            dp[v] += dp[v - m]
    return dp[so_tien]


# ══════════════════════════════ LỚP 3 ══════════════════════════════

@dang_ky("E2-M1-31", "E", "M1", lop=(3,),
         tu_khoa=("mi-li-lít", "lít", "dung tích", "đơn vị đo dung tích"),
         dang_bai=("Đơn vị đo dung tích: mi-li-lít và lít",))
def e2_m1_31(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["l_ml", "ml_l", "cong", "so_sanh"],
                                        rng.randint(5, 8))):
        n = rng.randint(2, 40)
        if kieu == "l_ml":
            y.append((f"{sv(n)} l = … ml", sv(n * 1000)))
            if k == 0:
                buoc = [f"1 lít bằng 1 000 mi-li-lít.",
                        f"Đổi từ lít sang mi-li-lít thì **nhân** với 1 000.",
                        f"{sv(n)} × 1 000 = {sv(n * 1000)} (ml).",
                        f"Đáp số: **{sv(n * 1000)} ml**."]
        elif kieu == "ml_l":
            y.append((f"{sv(n * 1000)} ml = … l", sv(n)))
        elif kieu == "cong":
            m = rng.randint(100, 900)
            y.append((f"{sv(n)} l {sv(m)} ml = … ml", sv(n * 1000 + m)))
        else:
            m = rng.randint(500, 4000)
            y.append((f"{sv(n)} l … {sv(m)} ml",
                      "<" if n * 1000 < m else (">" if n * 1000 > m else "=")))
    return Bai(
        tieu_de="Mi-li-lít và lít",
        dan="Điền số hoặc dấu thích hợp.",
        y=y, giai_mau=buoc,
        huong_giai="1 lít = 1 000 mi-li-lít. Đổi từ đơn vị lớn sang đơn vị bé thì nhân, "
                   "ngược lại thì chia. Muốn so sánh thì phải đưa về cùng một đơn vị trước.",
        td=["TD1"],
        diem_chot="So sánh **chỉ sau khi** đã đưa về cùng đơn vị.",
        loi="So thẳng hai con số mà bỏ qua đơn vị.",
        phong="Viết lại cả hai vế theo mi-li-lít rồi mới so.",
        goi_y=("1 lít bằng bao nhiêu mi-li-lít?",
               "Đơn vị nào lớn hơn?",
               "Từ lớn sang bé thì nhân."),
        pt_dang="Đổi và so sánh đơn vị dung tích",
        pt_kien_thuc="Quan hệ lít – mi-li-lít",
        pt_du_lieu="Có chữ l, ml trong đề",
        pt_phuong_phap="Đưa về cùng đơn vị rồi tính hoặc so sánh",
        pt_nhanh="Nhân 1 000 là thêm ba chữ số 0 vào bên phải.",
        tuong_tu=("3 l = … ml", "3 000"),
        mo_rong="Bài rót nước: một can 5 lít rót đầy mấy chai 500 ml.",
        chuan_bi="Nhân, chia với 1 000 và so sánh số tự nhiên.",
        chu_y="Đơn vị khác nhau")


@dang_ky("E2-M2-31", "E", "M2", lop=(3,),
         tu_khoa=("tiền Việt Nam", "mua bán", "trả lại tiền", "đổi tiền"),
         dang_bai=("Tiền Việt Nam — mua bán và trả lại tiền",
                   "Bài toán về tiền: đổi tiền và đếm số cách trả tiền"), thuc_te=True)
def e2_m2_31(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["tra_lai", "doi_tien", "tong_tien"],
                                        rng.randint(4, 6))):
        gia = rng.choice([3, 5, 7, 8, 12, 15, 18, 25]) * 1000
        n = rng.randint(2, 6)
        tien = gia * n
        dua = next(t for t in TIEN if t > tien)
        if kieu == "tra_lai":
            y.append((f"Mua {sv(n)} quyển vở, mỗi quyển {sv(gia)} đồng. Đưa cô bán hàng "
                      f"một tờ {sv(dua)} đồng. Cô phải trả lại bao nhiêu tiền?",
                      sv(dua - tien) + " đồng"))
            if k == 0:
                buoc = [f"Bước 1 — tiền hàng: {sv(gia)} × {sv(n)} = {sv(tien)} (đồng).",
                        f"Bước 2 — tiền trả lại: {sv(dua)} − {sv(tien)} = "
                        f"{sv(dua - tien)} (đồng).",
                        f"Thử lại: {sv(tien)} + {sv(dua - tien)} = {sv(dua)} ✓",
                        f"Đáp số: **{sv(dua - tien)} đồng**."]
        elif kieu == "doi_tien":
            to = rng.choice([10000, 20000, 50000])
            nho = rng.choice([1000, 2000, 5000])
            while nho >= to:
                nho = 1000
            y.append((f"Đổi một tờ {sv(to)} đồng ra các tờ {sv(nho)} đồng thì được mấy tờ?",
                      sv(to // nho) + " tờ"))
        else:
            y.append((f"Mua {sv(n)} quyển vở, mỗi quyển {sv(gia)} đồng. Hết bao nhiêu tiền?",
                      sv(tien) + " đồng"))
    return Bai(
        tieu_de="Tiền Việt Nam: mua bán, đổi tiền, trả lại",
        dan="Ghi rõ đơn vị đồng ở mọi kết quả.",
        y=y, giai_mau=buoc,
        huong_giai="Tính tiền hàng trước bằng phép nhân, rồi mới lấy tiền đưa trừ đi tiền "
                   "hàng. Đổi tiền là phép chia: tờ lớn chia cho tờ nhỏ.",
        td=["TD2", "TD3"],
        diem_chot="Phải tính **tiền hàng** trước khi trừ.",
        loi="Lấy tiền đưa trừ ngay giá một quyển vở.",
        phong="Viết rõ dòng “Tiền hàng là …” rồi mới sang bước hai.",
        goi_y=("Mua tất cả hết bao nhiêu tiền?",
               "Đưa cho cô bán hàng bao nhiêu?",
               "Lấy tiền đưa trừ tiền hàng."),
        pt_dang="Bài toán tiền tệ hai bước",
        pt_kien_thuc="Nhân, trừ với số tròn nghìn; mệnh giá tiền Việt Nam",
        pt_du_lieu="“Đưa … đồng”, “trả lại”, “đổi ra tờ …”",
        pt_phuong_phap="Tính tiền hàng rồi trừ; đổi tiền thì chia",
        pt_nhanh="Thử lại bằng cách cộng tiền hàng với tiền trả lại, phải đúng bằng tiền đưa.",
        tuong_tu=("Mua 3 quyển vở 5 000 đồng một quyển, đưa 20 000 đồng. Trả lại bao nhiêu?",
                  "5 000 đồng"),
        mo_rong="Hỏi có bao nhiêu cách trả đúng số tiền bằng các tờ 1 000, 2 000, 5 000.",
        chuan_bi="Nhân, trừ với số tròn nghìn.")


@dang_ky("E2-M3-31", "E", "M3", lop=(3,),
         tu_khoa=("tháng", "năm", "xem lịch", "lịch"),
         dang_bai=("Tháng – năm và cách xem lịch",))
def e2_m3_31(rng, lop):
    thang = rng.randint(1, 12)
    nam_ = rng.randint(2020, 2035)
    nhuan = (nam_ % 4 == 0 and nam_ % 100 != 0) or nam_ % 400 == 0
    ngay = 31 if thang in THANG_31 else (30 if thang != 2 else (29 if nhuan else 28))
    thu_dau = rng.randint(0, 6)
    TEN_THU = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ nhật"]
    ngay_hoi = rng.randint(8, ngay)
    y = [(f"Tháng {sv(thang)} năm {ten_nam(nam_)} có bao nhiêu ngày?", sv(ngay)),
         (f"Năm {ten_nam(nam_)} có phải năm nhuận không?", "có" if nhuan else "không"),
         (f"Ngày 1 tháng {sv(thang)} là {TEN_THU[thu_dau]}. Hỏi ngày {sv(ngay_hoi)} "
          f"tháng ấy là thứ mấy?", TEN_THU[(thu_dau + ngay_hoi - 1) % 7]),
         (f"Tháng ấy có bao nhiêu ngày Chủ nhật?",
          sv(sum(1 for d in range(1, ngay + 1) if (thu_dau + d - 1) % 7 == 6))),
         (f"Ngày cuối cùng của tháng là thứ mấy?", TEN_THU[(thu_dau + ngay - 1) % 7]),
         ("Một năm thường có bao nhiêu ngày, năm nhuận có bao nhiêu ngày?",
          "365 ngày và 366 ngày")]
    return Bai(
        tieu_de="Tháng, năm và cách xem lịch",
        dan="Kẻ một bảng lịch nhỏ ra nháp rồi trả lời.",
        y=y,
        giai_mau=[f"Tháng {sv(thang)} " +
                  ("thuộc nhóm tháng 31 ngày" if thang in THANG_31 else
                   ("là tháng 2" if thang == 2 else "thuộc nhóm tháng 30 ngày")) +
                  f", nên có {sv(ngay)} ngày.",
                  f"Ngày 1 là {TEN_THU[thu_dau]}. Cứ sau 7 ngày thì lặp lại đúng thứ ấy.",
                  f"Từ ngày 1 đến ngày {sv(ngay_hoi)} cách nhau {sv(ngay_hoi - 1)} ngày.",
                  f"{sv(ngay_hoi - 1)} : 7 dư {sv((ngay_hoi - 1) % 7)}, nên lùi "
                  f"{sv((ngay_hoi - 1) % 7)} bước từ {TEN_THU[thu_dau]}.",
                  f"Vậy ngày {sv(ngay_hoi)} là **{TEN_THU[(thu_dau + ngay_hoi - 1) % 7]}**."],
        huong_giai="Các tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày; tháng 4, 6, 9, 11 có 30 "
                   "ngày; tháng 2 có 28 ngày, năm nhuận 29 ngày. Thứ trong tuần lặp lại "
                   "sau mỗi 7 ngày, nên chia cho 7 lấy số dư.",
        td=["TD4", "TD1"],
        diem_chot="Thứ trong tuần **tuần hoàn chu kì 7** — chia lấy dư là ra.",
        loi="Đếm tay từng ngày nên vừa lâu vừa sai.",
        phong="Đếm số ngày cách nhau rồi chia 7 lấy dư.",
        goi_y=("Tháng này có bao nhiêu ngày?",
               "Từ ngày 1 đến ngày cần tìm cách nhau bao nhiêu ngày?",
               "Chia số đó cho 7 và lấy số dư."),
        pt_dang="Lịch, tháng, năm nhuận",
        pt_kien_thuc="Số ngày các tháng, năm nhuận, chu kì 7 ngày",
        pt_du_lieu="Đề nhắc tới ngày, tháng, thứ trong tuần",
        pt_phuong_phap="Tra quy tắc tháng; chia cho 7 lấy dư để tìm thứ",
        pt_nhanh="Cùng một thứ lặp lại ở các ngày cách nhau 7, 14, 21, 28.",
        tuong_tu=("Ngày 1 tháng 5 là Thứ Ba, ngày 15 tháng 5 là thứ mấy?", "Thứ Ba"),
        mo_rong="Hỏi ngày này sang năm rơi vào thứ mấy — phải xét năm nhuận.",
        chuan_bi="Phép chia có dư và bảng số ngày các tháng.",
        bay="Tháng 2 và năm nhuận")


@dang_ky("E2-M4-31", "E", "M4", lop=(3, 4),
         tu_khoa=("thực tế", "đo lường", "mua bán", "tiền tệ"),
         dang_bai=("Bài toán thực tế về đo lường và mua bán",
                   "Bài toán thực tế về đo lường và tiền tệ"), thuc_te=True)
def e2_m4_31(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["gao", "vai", "nuoc"], rng.randint(4, 6))):
        if kieu == "gao":
            bao = rng.randint(4, 20)
            moi = rng.choice([25, 30, 40, 50])
            gia = rng.choice([12, 15, 18, 20]) * 1000
            y.append((f"Một cửa hàng có {sv(bao)} bao gạo, mỗi bao {sv(moi)} kg. "
                      f"Giá mỗi ki-lô-gam là {sv(gia)} đồng. Bán hết số gạo ấy được "
                      f"bao nhiêu tiền?", sv(bao * moi * gia) + " đồng"))
            if k == 0:
                buoc = [f"Bước 1 — tổng số gạo: {sv(moi)} × {sv(bao)} = "
                        f"{sv(bao * moi)} (kg).",
                        f"Bước 2 — số tiền: {sv(gia)} × {sv(bao * moi)} = "
                        f"{sv(bao * moi * gia)} (đồng).",
                        f"Đáp số: **{sv(bao * moi * gia)} đồng**."]
        elif kieu == "vai":
            tam = rng.randint(3, 12)
            dai = rng.randint(2, 8)
            cat = rng.randint(1, dai - 1) if dai > 1 else 1
            y.append((f"Có {sv(tam)} tấm vải, mỗi tấm dài {sv(dai)} m. Cắt mỗi tấm đi "
                      f"{sv(cat)} m. Hỏi còn lại tất cả bao nhiêu mét vải?",
                      sv(tam * (dai - cat)) + " m"))
        else:
            can = rng.randint(3, 15)
            lit = rng.choice([2, 5, 10])
            y.append((f"Có {sv(can)} can dầu, mỗi can {sv(lit)} lít. Đổ đều vào các chai "
                      f"1 lít thì được bao nhiêu chai?", sv(can * lit) + " chai"))
    return Bai(
        tieu_de="Bài toán thực tế về đo lường và mua bán",
        dan="Trình bày lời giải có câu trả lời cho từng bước.",
        y=y, giai_mau=buoc,
        huong_giai="Tìm đại lượng trung gian trước (tổng khối lượng, tổng chiều dài), "
                   "rồi mới trả lời câu hỏi. Chọn đường ít phép tính hơn khi có hai cách.",
        td=["TD2", "TD3"],
        bay="Cộng trừ hai đại lượng khác loại — số bao và số ki-lô-gam",
        diem_chot="Không cộng trừ hai đại lượng **khác loại** — số bao và số ki-lô-gam.",
        loi="Nhân số bao với giá tiền một ki-lô-gam.",
        phong="Ghi đơn vị sau mỗi số, hai số khác đơn vị thì không được cộng trừ.",
        goi_y=("Đại lượng trung gian cần tính trước là gì?",
               "Tính nó bằng phép tính nào?",
               "Kiểm tra đơn vị của kết quả cuối."),
        pt_dang="Bài toán đại lượng nhiều bước",
        pt_kien_thuc="Nhân, trừ; đơn vị khối lượng, độ dài, dung tích",
        pt_du_lieu="Cho số nhóm, giá trị mỗi nhóm và một thao tác thêm bớt",
        pt_phuong_phap="Tính đại lượng trung gian rồi trả lời",
        pt_nhanh="Trừ trước rồi nhân thường ít phép tính hơn nhân trước rồi trừ.",
        tuong_tu=("5 bao gạo mỗi bao 50 kg, giá 15 000 đồng một kg. Bán hết được bao nhiêu?",
                  "3 750 000 đồng"),
        mo_rong="Thêm chi phí vận chuyển cố định để có thêm một bước cộng.",
        chuan_bi="Nhân số có nhiều chữ số và bảng đơn vị đo.")


# ══════════════════════════════ LỚP 4 – 5 ══════════════════════════════

@dang_ky("E2-M2-41", "E", "M2", lop=(4, 5),
         tu_khoa=("đề-xi-mét vuông", "mét vuông", "đề-ca-mét vuông", "héc-tô-mét vuông",
                  "héc-ta"),
         dang_bai=("Đề-xi-mét vuông, mét vuông",
                   "Đề-ca-mét vuông, héc-tô-mét vuông, héc-ta"))
def e2_m2_41(rng, lop):
    y, buoc = [], []
    bang = ([("m²", "dm²", 100), ("dm²", "cm²", 100), ("m²", "cm²", 10000)] if lop == 4
            else [("ha", "m²", 10000), ("km²", "ha", 100), ("dam²", "m²", 100),
                  ("hm²", "dam²", 100), ("hm²", "m²", 10000)])
    for k, (lon, be, he) in enumerate(luan_phien(rng, bang, rng.randint(5, 8))):
        n = rng.randint(2, 90)
        if rng.random() < 0.6:
            y.append((f"{sv(n)} {lon} = … {be}", sv(n * he)))
            if k == 0:
                buoc = [f"1 {lon} = {sv(he)} {be}.",
                        f"Đổi từ đơn vị lớn sang đơn vị bé thì **nhân**.",
                        f"{sv(n)} × {sv(he)} = {sv(n * he)} ({be}).",
                        f"Đáp số: **{sv(n * he)} {be}**."]
        else:
            y.append((f"{sv(n * he)} {be} = … {lon}", sv(n)))
    return Bai(
        tieu_de="Đơn vị đo diện tích",
        dan="Điền số thích hợp vào chỗ chấm.",
        y=y, giai_mau=buoc,
        huong_giai="Hai đơn vị diện tích liền kề hơn kém nhau **100 lần**, vì diện tích là "
                   "tích của hai chiều dài. Riêng 1 ha = 10 000 m² và 1 km² = 100 ha.",
        td=["TD1", "TD2"],
        diem_chot="Đơn vị diện tích nhảy **100 lần** mỗi bậc, không phải 10 lần.",
        loi="Đổi như đơn vị độ dài, chỉ nhân 10 mỗi bậc.",
        phong="Viết riêng bảng đơn vị diện tích, ghi rõ “× 100” giữa hai bậc liền nhau.",
        goi_y=("Hai đơn vị này cách nhau mấy bậc?",
               "Mỗi bậc hơn kém nhau bao nhiêu lần?",
               "Từ lớn sang bé thì nhân."),
        pt_dang="Đổi đơn vị diện tích",
        pt_kien_thuc="Bảng đơn vị đo diện tích",
        pt_du_lieu="Đơn vị có mũ hai, hoặc ha, km²",
        pt_phuong_phap="Đếm bậc rồi nhân, chia 100",
        pt_nhanh="Mỗi bậc thêm hai chữ số 0 — nhớ “diện tích thì gấp đôi số 0”.",
        tuong_tu=("3 m² = … dm²", "300"),
        mo_rong="Đổi hỗn hợp: 2 ha 350 m² = … m².",
        chuan_bi="Bảng đơn vị đo độ dài và phép nhân, chia với 100.",
        chu_y="100 lần chứ không phải 10 lần")


@dang_ky("E2-M5-51", "E", "M5", lop=(5,),
         tu_khoa=("thuế", "chiết khấu", "đánh giá năng lực", "thực tế", "mua bán"),
         dang_bai=("Bài toán thực tế: mua bán, thuế, chiết khấu",
                   "Bài toán thực tế dạng đề đánh giá năng lực",
                   "Bài toán thực tế: đo lường, mua bán, giảm giá"), thuc_te=True)
def e2_m5_51(rng, lop):
    goc = rng.choice([200, 300, 400, 500, 600]) * 1000
    ck = rng.choice([5, 10, 15, 20])
    thue = rng.choice([5, 8, 10])
    sau_ck = goc - goc * ck // 100
    cuoi = sau_ck + sau_ck * thue // 100
    n = rng.randint(2, 6)
    y = [(f"Một món hàng niêm yết {sv(goc)} đồng, được chiết khấu {sv(ck)}%. "
          f"Giá sau chiết khấu là bao nhiêu?", sv(sau_ck) + " đồng"),
         (f"Sau đó cộng thêm thuế {sv(thue)}% tính trên giá đã chiết khấu. "
          f"Giá phải trả là bao nhiêu?", sv(cuoi) + " đồng"),
         (f"So với giá niêm yết, người mua trả nhiều hơn hay ít hơn, chênh bao nhiêu đồng?",
          ("ít hơn " if cuoi < goc else "nhiều hơn ") + sv(abs(goc - cuoi)) + " đồng"),
         (f"Mua {sv(n)} món như thế thì phải trả bao nhiêu tiền?", sv(cuoi * n) + " đồng"),
         (f"Nếu cửa hàng cộng thuế trước rồi mới chiết khấu thì giá cuối có đổi không?",
          "không đổi, vì nhân hai lần theo cùng hai tỉ lệ"),
         (f"Chiết khấu {sv(ck)}% nghĩa là còn lại bao nhiêu phần trăm giá niêm yết?",
          f"{sv(100 - ck)}%")]
    return Bai(
        tieu_de="Mua bán có chiết khấu và thuế",
        dan="Bài mô phỏng câu hỏi thực tế của đề đánh giá năng lực.",
        y=y,
        giai_mau=[f"Giá niêm yết ứng với 100%.",
                  f"Bước 1 — chiết khấu {sv(ck)}% nghĩa là còn {sv(100 - ck)}%: "
                  f"{sv(goc)} : 100 × {sv(100 - ck)} = {sv(sau_ck)} (đồng).",
                  f"Bước 2 — thuế tính trên giá **đã chiết khấu**: "
                  f"{sv(sau_ck)} : 100 × {sv(thue)} = {sv(sau_ck * thue // 100)} (đồng).",
                  f"Bước 3 — giá phải trả: {sv(sau_ck)} + {sv(sau_ck * thue // 100)} = "
                  f"{sv(cuoi)} (đồng).",
                  f"So với giá niêm yết: "
                  + ("ít hơn " if cuoi < goc else "nhiều hơn ")
                  + f"{sv(abs(goc - cuoi))} đồng.",
                  f"Đáp số: **{sv(cuoi)} đồng**."],
        huong_giai="Mỗi lần tính phần trăm phải xác định lại **mốc 100%**. Chiết khấu tính "
                   "trên giá niêm yết; thuế tính trên giá đã chiết khấu. Vì cả hai đều là "
                   "phép nhân với một tỉ lệ nên đổi thứ tự không làm đổi kết quả.",
        td=["TD6", "TD2"],
        diem_chot="Mốc 100% **đổi sau mỗi bước** — đây là bẫy hay gặp nhất.",
        loi="Tính thuế trên giá niêm yết thay vì trên giá đã chiết khấu.",
        phong="Viết ba dòng: giá niêm yết, giá sau chiết khấu, giá phải trả.",
        goi_y=("Chiết khấu tính trên giá nào?",
               "Sau chiết khấu còn bao nhiêu phần trăm?",
               "Thuế tính trên giá nào?"),
        pt_dang="Phần trăm nhiều bước trong mua bán",
        pt_kien_thuc="Tỉ số phần trăm, mốc quy chiếu",
        pt_du_lieu="Có cả “chiết khấu” và “thuế” trong một bài",
        pt_phuong_phap="Tính tuần tự, xác định lại mốc 100% sau mỗi bước",
        pt_nhanh="Giảm p% là nhân với (100 − p) rồi chia 100 — một bước thay vì hai.",
        tuong_tu=("Giá 500 000 đồng, chiết khấu 10%, thuế 10% trên giá đã giảm. "
                  "Phải trả bao nhiêu?", "495 000 đồng"),
        mo_rong="Hỏi phải chiết khấu bao nhiêu phần trăm để giá cuối đúng bằng giá niêm yết.",
        chuan_bi="Ba dạng cơ bản của tỉ số phần trăm.",
        bay="Mốc 100% đổi sau mỗi bước")
