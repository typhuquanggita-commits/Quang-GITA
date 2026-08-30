# -*- coding: utf-8 -*-
"""Thư viện mẫu bài — NHÓM E: Đại lượng – Đo lường – Thời gian."""
from __future__ import annotations

from fractions import Fraction

from .khung import (Bai, CHAT_LONG, HANG_HOA, dang_ky, kg_ra_tan_ta, la_ma,
                    luan_phien, nam as ten_nam, phut_ra_gio, sv, tan_ta_ra_kg)

DAI = [("km", 1000), ("hm", 100), ("dam", 10), ("m", 1), ("dm", Fraction(1, 10)),
       ("cm", Fraction(1, 100)), ("mm", Fraction(1, 1000))]
KHOI = [("tấn", 1000), ("tạ", 100), ("yến", 10), ("kg", 1), ("hg", Fraction(1, 10)),
        ("dag", Fraction(1, 100)), ("g", Fraction(1, 1000))]
DIEN_TICH = [("km²", 1_000_000), ("ha", 10_000), ("m²", 1), ("dm²", Fraction(1, 100)),
             ("cm²", Fraction(1, 10_000))]
THANG_31 = (1, 3, 5, 7, 8, 10, 12)


def doi_don_vi(rng, bang, nguon_lon=True):
    """Sinh một phép đổi đơn vị cho kết quả là số tự nhiên đẹp."""
    for _ in range(200):
        i, j = rng.sample(range(len(bang)), 2)
        if nguon_lon and i > j:
            i, j = j, i
        ti = Fraction(bang[i][1], bang[j][1])
        n = rng.randint(2, 90)
        gt = n * ti
        if gt.denominator == 1 and gt <= 10 ** 7:
            return n, bang[i][0], int(gt), bang[j][0]
    return 5, bang[0][0], int(5 * Fraction(bang[0][1], bang[-1][1])), bang[-1][0]


# ══════════════════════════════════ MỨC M1 ══════════════════════════════════

@dang_ky("E-M1-01", "E", "M1", tu_khoa=("đổi đơn vị", "độ dài"))
def e_m1_01(rng, lop):
    y = []
    for bang in luan_phien(rng, [DAI, KHOI], rng.randint(5, 8)):
        n, dv1, gt, dv2 = doi_don_vi(rng, bang)
        y.append((f"{sv(n)} {dv1} = … {dv2}", sv(gt)))
    return Bai(
        tieu_de="Đổi đơn vị đo độ dài và khối lượng",
        dan="Điền số thích hợp vào chỗ chấm.",
        y=y,
        huong_giai="Mỗi đơn vị liền kề trong bảng hơn kém nhau 10 lần. Đổi từ đơn vị lớn "
                   "sang đơn vị bé thì **nhân**, đổi từ bé sang lớn thì **chia**; mỗi bậc "
                   "trên bảng ứng với một lần nhân hoặc chia 10.",
        td=["TD1"],
        diem_chot="Đếm đúng **số bậc** giữa hai đơn vị trên bảng.",
        loi="Đổi ngược chiều nên nhân thành chia.",
        phong="Viết bảng đơn vị ra lề rồi đếm bậc bằng ngón tay.",
        goi_y=("Viết bảng đơn vị từ lớn đến bé.",
               "Đếm xem hai đơn vị cách nhau mấy bậc.",
               "Từ lớn sang bé thì nhân, mỗi bậc nhân 10."),
        pt_dang="Đổi đơn vị đo",
        pt_kien_thuc="Bảng đơn vị đo độ dài, khối lượng",
        pt_du_lieu="Dấu … giữa hai đơn vị khác nhau",
        pt_phuong_phap="Đếm bậc trên bảng đơn vị rồi nhân hoặc chia 10",
        pt_nhanh="Số bậc chính là số chữ số 0 phải thêm vào (hoặc bớt đi).",
        tuong_tu=("5 km = … m", "5 000"),
        chu_y="Chiều đổi đơn vị",
    )


@dang_ky("E-M1-02", "E", "M1", tu_khoa=("đơn vị phức hợp", "khối lượng"))
def e_m1_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        tan = rng.randint(0, 6)
        ta = rng.randint(0, 9)
        kg = rng.randint(1, 99)
        tong = tan_ta_ra_kg(tan=tan, ta=ta, kg=kg)
        if rng.random() < 0.5:
            y.append((f"{kg_ra_tan_ta(tong)} = … kg", sv(tong)))
        else:
            y.append((f"{sv(tong)} kg = … tấn … tạ … kg", kg_ra_tan_ta(tong)))
    return Bai(
        tieu_de="Đổi số đo khối lượng có nhiều đơn vị",
        dan="Điền vào chỗ chấm.",
        y=y,
        huong_giai="1 tấn = 10 tạ = 1 000 kg; 1 tạ = 100 kg; 1 yến = 10 kg. Đổi tất cả "
                   "về ki-lô-gam rồi cộng lại; hoặc ngược lại, chia dần từ đơn vị lớn "
                   "xuống đơn vị bé và lấy phần dư.",
        td=["TD1", "TD3"],
        diem_chot="Đổi hết về **một đơn vị chung** trước khi cộng.",
        loi="Cộng thẳng các số đứng trước những đơn vị khác nhau.",
        phong="Viết mỗi thành phần thành số ki-lô-gam ngay bên dưới rồi mới cộng.",
        goi_y=("1 tấn bằng bao nhiêu ki-lô-gam?",
               "Đổi từng phần về ki-lô-gam.",
               "Cộng tất cả lại."),
        pt_dang="Số đo có nhiều đơn vị",
        pt_kien_thuc="Bảng đơn vị khối lượng",
        pt_du_lieu="Số đo viết dưới dạng “… tấn … tạ … kg”",
        pt_phuong_phap="Quy về một đơn vị rồi cộng; hoặc chia dần lấy dư",
        pt_nhanh="Chia số ki-lô-gam cho 1 000 lấy thương là tấn, phần dư chia tiếp cho 100 là tạ.",
        tuong_tu=("3 450 kg = … tấn … tạ … kg", "3 tấn 4 tạ 50 kg"),
    )


@dang_ky("E-M1-03", "E", "M1", tu_khoa=("thời gian", "giờ phút"))
def e_m1_03(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["p_ra_g", "g_ra_p", "cong", "tru"], rng.randint(4, 7)):
        p = rng.randint(65, 600)
        g = rng.randint(1, 9)
        m = rng.randint(1, 59)
        if kieu == "p_ra_g":
            y.append((f"{sv(p)} phút = … giờ … phút", phut_ra_gio(p)))
        elif kieu == "g_ra_p":
            y.append((f"{sv(g)} giờ {sv(m)} phút = … phút", sv(g * 60 + m)))
        elif kieu == "cong":
            p2 = rng.randint(20, 200)
            y.append((f"{phut_ra_gio(p)} + {sv(p2)} phút = … (viết dạng giờ và phút)",
                      phut_ra_gio(p + p2)))
        else:
            p2 = rng.randint(10, p - 10)
            y.append((f"{phut_ra_gio(p)} − {sv(p2)} phút = … (viết dạng giờ và phút)",
                      phut_ra_gio(p - p2)))
    return Bai(
        tieu_de="Đơn vị đo thời gian: giờ và phút",
        dan="Điền kết quả, viết dạng giờ và phút.",
        y=y,
        huong_giai="1 giờ = 60 phút. Đổi phút sang giờ thì chia cho 60, thương là số giờ, "
                   "số dư là số phút. Cộng trừ thời gian thì cộng trừ riêng phần giờ và "
                   "phần phút, nếu phút vượt quá 60 thì đổi 60 phút thành 1 giờ.",
        td=["TD1", "TD3"],
        diem_chot="Thời gian đếm theo **60**, không theo 10 — đây là điểm khác mọi đơn vị khác.",
        loi="Nhớ 1 khi phút vượt quá 100 thay vì khi vượt quá 60.",
        phong="Sau mỗi phép cộng, kiểm tra phần phút có nhỏ hơn 60 không.",
        goi_y=("1 giờ bằng bao nhiêu phút?",
               "Chia số phút cho 60, lấy thương và số dư.",
               "Phần phút của kết quả phải bé hơn 60."),
        pt_dang="Đổi và tính toán với đơn vị thời gian",
        pt_kien_thuc="Quan hệ giờ – phút – giây",
        pt_du_lieu="Số đo có chữ “giờ”, “phút”, “giây”",
        pt_phuong_phap="Quy về phút rồi tính, cuối cùng đổi lại giờ và phút",
        pt_nhanh="Đổi hết về phút, tính xong mới đổi ngược lại — tránh nhớ nhầm.",
        tuong_tu=("155 phút = … giờ … phút", "2 giờ 35 phút"),
        chu_y="Cơ số 60 chứ không phải 10",
    )


@dang_ky("E-M1-04", "E", "M1", lop=(4, 5), tu_khoa=("diện tích", "đổi đơn vị"))
def e_m1_04(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        n, dv1, gt, dv2 = doi_don_vi(rng, DIEN_TICH)
        y.append((f"{sv(n)} {dv1} = … {dv2}", sv(gt)))
    return Bai(
        tieu_de="Đổi đơn vị đo diện tích",
        dan="Điền số thích hợp.",
        y=y,
        huong_giai="Hai đơn vị diện tích liền kề hơn kém nhau **100 lần** (chứ không phải "
                   "10 lần như đơn vị độ dài), vì diện tích là tích của hai chiều dài. "
                   "Riêng 1 ha = 10 000 m² và 1 km² = 100 ha.",
        td=["TD1", "TD2"],
        diem_chot="Đơn vị diện tích nhảy **100 lần** mỗi bậc.",
        loi="Đổi như đơn vị độ dài, chỉ nhân 10 mỗi bậc.",
        phong="Viết bảng đơn vị diện tích riêng, ghi rõ “×100” giữa hai bậc.",
        goi_y=("Đơn vị diện tích liền kề hơn kém nhau mấy lần?",
               "Đếm số bậc giữa hai đơn vị.",
               "Mỗi bậc nhân hoặc chia 100."),
        pt_dang="Đổi đơn vị diện tích",
        pt_kien_thuc="Bảng đơn vị đo diện tích",
        pt_du_lieu="Đơn vị có mũ hai: m², cm², km², ha",
        pt_phuong_phap="Đếm bậc rồi nhân, chia 100",
        pt_nhanh="Mỗi bậc thêm hai chữ số 0 — nhớ “diện tích thì gấp đôi số 0”.",
        tuong_tu=("3 m² = … cm²", "30 000"),
        chu_y="100 lần chứ không phải 10 lần",
    )


# ══════════════════════════════════ MỨC M2 ══════════════════════════════════

@dang_ky("E-M2-01", "E", "M2", lop=(4, 5), tu_khoa=("so sánh số đo", "đổi đơn vị"))
def e_m2_01(rng, lop):
    y = []
    for bang in luan_phien(rng, [DAI, KHOI, DIEN_TICH], rng.randint(4, 7)):
        i, j = rng.sample(range(len(bang)), 2)
        a = rng.randint(2, 90)
        b = rng.randint(2, 9000)
        ga = a * Fraction(bang[i][1])
        gb = b * Fraction(bang[j][1])
        y.append((f"{sv(a)} {bang[i][0]} … {sv(b)} {bang[j][0]}",
                  "<" if ga < gb else (">" if ga > gb else "=")))
    return Bai(
        tieu_de="So sánh hai số đo khác đơn vị",
        dan="Điền dấu <, >, = thích hợp.",
        y=y,
        huong_giai="Không so sánh trực tiếp hai số đứng trước hai đơn vị khác nhau. "
                   "Phải đổi cả hai về **cùng một đơn vị** rồi mới so sánh các số.",
        td=["TD2", "TD1"],
        diem_chot="Đổi về cùng đơn vị **trước**, so sánh **sau**.",
        loi="So thẳng hai con số, bỏ qua đơn vị.",
        phong="Viết cả hai vế theo đơn vị bé nhất trong hai đơn vị.",
        goi_y=("Hai vế đang dùng đơn vị nào?",
               "Chọn một đơn vị chung, nên chọn đơn vị bé hơn.",
               "Đổi cả hai vế rồi so sánh."),
        pt_dang="So sánh số đo đại lượng",
        pt_kien_thuc="Bảng đơn vị đo, so sánh số tự nhiên",
        pt_du_lieu="Hai vế có đơn vị khác nhau",
        pt_phuong_phap="Đổi về cùng đơn vị rồi so sánh",
        pt_nhanh="Đổi về đơn vị **bé hơn** để cả hai vế đều là số tự nhiên, khỏi phải "
                 "làm việc với phân số.",
        tuong_tu=("So sánh: 3 kg … 2 500 g", ">"),
        chu_y="Đơn vị khác nhau",
    )


@dang_ky("E-M2-02", "E", "M2", lop=(4, 5), tu_khoa=("tính với số đo", "cộng trừ đại lượng"))
def e_m2_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        a = rng.randint(2, 40)
        b = rng.randint(100, 900)
        k = rng.randint(2, 9)
        kieu = rng.choice(["cong", "tru", "nhan", "chia"])
        if kieu == "cong":
            y.append((f"{sv(a)} m {sv(b % 100)} cm + {sv(b)} cm = … cm",
                      sv(a * 100 + b % 100 + b)))
        elif kieu == "tru":
            t = a * 1000 + b
            y.append((f"{sv(a)} kg {sv(b)} g − {sv(b // 2)} g = … g", sv(t - b // 2)))
        elif kieu == "nhan":
            y.append((f"{sv(a)} m {sv(b % 100)} cm × {sv(k)} = … cm",
                      sv((a * 100 + b % 100) * k)))
        else:
            t = (a * 100 + b % 100) * k
            y.append((f"{sv(t)} cm : {sv(k)} = … cm", sv(t // k)))
    return Bai(
        tieu_de="Tính toán với số đo đại lượng",
        dan="Đổi về cùng đơn vị rồi tính.",
        y=y,
        huong_giai="Chỉ cộng, trừ được các số đo **cùng đơn vị**. Bước đầu tiên luôn là "
                   "đổi tất cả về đơn vị mà đề yêu cầu ở kết quả, sau đó tính như với số "
                   "tự nhiên rồi ghi kèm đơn vị.",
        td=["TD1", "TD3"],
        diem_chot="Đơn vị của **kết quả** quyết định ta đổi về đơn vị nào.",
        loi="Cộng số mét với số xăng-ti-mét mà chưa đổi.",
        phong="Gạch chân đơn vị ở chỗ chấm rồi đổi mọi số hạng về đơn vị đó.",
        goi_y=("Kết quả cần ghi theo đơn vị nào?",
               "Đổi mọi số hạng về đơn vị ấy.",
               "Tính như số tự nhiên rồi ghi đơn vị."),
        pt_dang="Bốn phép tính với số đo",
        pt_kien_thuc="Đổi đơn vị, bốn phép tính",
        pt_du_lieu="Các số hạng có đơn vị khác nhau trong cùng một phép tính",
        pt_phuong_phap="Đổi về đơn vị của kết quả rồi tính",
        pt_nhanh="Đọc chỗ chấm trước, biết ngay đơn vị đích.",
        tuong_tu=("2 m 30 cm + 150 cm = … cm", "380"),
    )


@dang_ky("E-M2-03", "E", "M2", lop=(4, 5), tu_khoa=("lịch", "ngày tháng", "thế kỉ"))
def e_m2_03(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["thang", "the_ki", "nam_nhuan", "ngay_tuan"],
                           rng.randint(4, 7)):
        thang = rng.randint(1, 12)
        nam = rng.randint(1890, 2100)
        if kieu == "thang":
            ngay = 31 if thang in THANG_31 else (30 if thang != 2 else
                                                 (29 if (nam % 4 == 0 and nam % 100 != 0)
                                                  or nam % 400 == 0 else 28))
            y.append((f"Tháng {sv(thang)} năm {ten_nam(nam)} có bao nhiêu ngày?", sv(ngay)))
        elif kieu == "the_ki":
            y.append((f"Năm {ten_nam(nam)} thuộc thế kỉ thứ mấy?",
                      la_ma((nam - 1) // 100 + 1)))
        elif kieu == "nam_nhuan":
            nhuan = (nam % 4 == 0 and nam % 100 != 0) or nam % 400 == 0
            y.append((f"Năm {ten_nam(nam)} có phải năm nhuận không?",
                      "có" if nhuan else "không"))
        else:
            n = rng.randint(8, 60)
            y.append((f"{sv(n)} ngày bằng bao nhiêu tuần lễ và mấy ngày?",
                      f"{sv(n // 7)} tuần {sv(n % 7)} ngày"))
    return Bai(
        tieu_de="Lịch, thế kỉ, năm nhuận",
        dan="Trả lời ngắn gọn.",
        y=y,
        huong_giai="Các tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày; các tháng 4, 6, 9, 11 có "
                   "30 ngày; tháng 2 có 28 ngày, năm nhuận có 29 ngày. Năm nhuận là năm "
                   "chia hết cho 4, riêng năm tròn trăm thì phải chia hết cho 400. "
                   "Thế kỉ thứ n gồm các năm từ (n − 1) × 100 + 1 đến n × 100.",
        td=["TD1", "TD2"],
        diem_chot="Năm tròn trăm chỉ nhuận khi chia hết cho **400** (1900 không nhuận, "
                  "2000 có nhuận).",
        loi="Coi mọi năm chia hết cho 4 đều là năm nhuận.",
        phong="Gặp năm tròn trăm thì kiểm tra thêm điều kiện chia hết cho 400.",
        goi_y=("Tháng đó nằm trong nhóm 31 ngày hay 30 ngày?",
               "Năm đó có chia hết cho 4 không?",
               "Nếu là năm tròn trăm, có chia hết cho 400 không?"),
        pt_dang="Lịch và đơn vị thời gian lớn",
        pt_kien_thuc="Số ngày các tháng, năm nhuận, thế kỉ",
        pt_du_lieu="Đề hỏi về tháng, năm, thế kỉ",
        pt_phuong_phap="Tra quy tắc tháng; kiểm tra chia hết cho 4 và 400",
        pt_nhanh="Năm 2000 nhuận, năm 1900 và 2100 không nhuận — nhớ ba mốc này là đủ.",
        tuong_tu=("Năm 1975 thuộc thế kỉ thứ mấy?", "XX"),
        chu_y="Năm tròn trăm",
    )


# ══════════════════════════════════ MỨC M3 ══════════════════════════════════

@dang_ky("E-M3-01", "E", "M3", lop=(4, 5), tu_khoa=("đại lượng", "lời văn", "khối lượng"), thuc_te=True)
def e_m3_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        bao = rng.randint(6, 40)
        moi = rng.choice([25, 30, 40, 50, 60])
        tong = bao * moi
        hang, dv = rng.choice(HANG_HOA)
        y.append((f"Một xe chở {sv(bao)} bao {hang}, mỗi bao {sv(moi)} kg. "
                  f"Hỏi xe chở bao nhiêu tạ {hang}?", sv(tong // 100) +
                  (f" tạ {sv(tong % 100)} kg" if tong % 100 else " tạ")))
    return Bai(
        tieu_de="Bài toán thực tế về khối lượng",
        dan="Chú ý đơn vị mà đề hỏi.",
        y=y,
        huong_giai="Tính tổng khối lượng theo ki-lô-gam trước, sau đó mới đổi sang đơn vị "
                   "mà đề hỏi. Đừng đổi đơn vị ngay từ đầu vì dễ nhầm.",
        td=["TD2", "TD3"],
        diem_chot="Câu hỏi đòi đơn vị nào thì bước **cuối cùng** mới đổi sang đơn vị đó.",
        loi="Ghi kết quả bằng ki-lô-gam trong khi đề hỏi tạ.",
        phong="Khoanh tròn đơn vị trong câu hỏi trước khi đặt bút.",
        goi_y=("Tính tổng khối lượng theo ki-lô-gam.",
               "Đề hỏi kết quả theo đơn vị nào?",
               "Đổi kết quả sang đơn vị đó."),
        pt_dang="Bài toán đại lượng có lời văn",
        pt_kien_thuc="Nhân, chia số tự nhiên; đổi đơn vị khối lượng",
        pt_du_lieu="Đơn vị trong câu hỏi khác đơn vị trong dữ kiện",
        pt_phuong_phap="Tính theo đơn vị dữ kiện rồi đổi ở bước cuối",
        pt_nhanh="1 tạ = 100 kg, nên chia số ki-lô-gam cho 100 là ra số tạ.",
        tuong_tu=("Xe chở 20 bao gạo, mỗi bao 50 kg. Xe chở mấy tạ?", "10 tạ"),
        bay="Đơn vị của câu trả lời",
    )


@dang_ky("E-M3-02", "E", "M3", lop=(4, 5), tu_khoa=("thời gian", "lời văn", "lịch trình"), thuc_te=True)
def e_m3_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        gio_di = rng.randint(5, 15)
        phut_di = rng.choice([0, 10, 15, 20, 25, 30, 40, 45, 50])
        keo = rng.randint(35, 400)
        tong = gio_di * 60 + phut_di + keo
        y.append((f"Một chuyến tàu khởi hành lúc {sv(gio_di)} giờ {sv(phut_di)} phút và "
                  f"đi hết {phut_ra_gio(keo)}. Tàu đến nơi lúc mấy giờ?",
                  f"{sv(tong // 60 % 24)} giờ {sv(tong % 60)} phút"))
    return Bai(
        tieu_de="Tính thời điểm đến, thời gian đi",
        dan="Ghi kết quả theo giờ và phút.",
        y=y,
        huong_giai="Đổi cả giờ khởi hành lẫn thời gian đi về **phút**, cộng lại, rồi đổi "
                   "kết quả ngược lại thành giờ và phút. Cách này tránh được lỗi nhớ khi "
                   "phần phút vượt 60.",
        td=["TD3", "TD2"],
        diem_chot="Đổi hết về phút rồi mới cộng — an toàn hơn cộng trực tiếp.",
        loi="Cộng phần phút thành hơn 60 mà quên đổi thành giờ.",
        phong="Kiểm tra phần phút của đáp số phải bé hơn 60.",
        goi_y=("Đổi giờ khởi hành ra phút tính từ 0 giờ.",
               "Cộng thêm thời gian đi (tính bằng phút).",
               "Đổi tổng số phút trở lại thành giờ và phút."),
        pt_dang="Tính thời điểm trong ngày",
        pt_kien_thuc="Quan hệ giờ – phút, phép chia có dư",
        pt_du_lieu="Cho thời điểm bắt đầu và khoảng thời gian",
        pt_phuong_phap="Quy về phút, cộng trừ, đổi lại",
        pt_nhanh="Cộng tròn giờ trước rồi cộng phần phút lẻ sau.",
        tuong_tu=("Tàu chạy lúc 7 giờ 40 phút, đi hết 2 giờ 35 phút. Đến lúc mấy giờ?",
                  "10 giờ 15 phút"),
        bay="Phần phút vượt quá 60",
    )


@dang_ky("E-M3-03", "E", "M3", lop=(5,), tu_khoa=("thể tích", "dung tích", "đổi đơn vị"))
def e_m3_03(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["m3_dm3", "dm3_lit", "lit_ml", "cm3_dm3"],
                           rng.randint(4, 7)):
        n = rng.randint(2, 90)
        if kieu == "m3_dm3":
            y.append((f"{sv(n)} m³ = … dm³", sv(n * 1000)))
        elif kieu == "dm3_lit":
            y.append((f"{sv(n)} dm³ = … lít", sv(n)))
        elif kieu == "lit_ml":
            y.append((f"{sv(n)} lít = … ml", sv(n * 1000)))
        else:
            y.append((f"{sv(n * 1000)} cm³ = … dm³", sv(n)))
    return Bai(
        tieu_de="Đơn vị đo thể tích và dung tích",
        dan="Điền số thích hợp.",
        y=y,
        huong_giai="Hai đơn vị thể tích liền kề hơn kém nhau **1 000 lần**. "
                   "1 dm³ = 1 lít; 1 lít = 1 000 ml; 1 m³ = 1 000 dm³ = 1 000 lít.",
        td=["TD1", "TD2"],
        diem_chot="Thể tích nhảy **1 000 lần** mỗi bậc (độ dài 10, diện tích 100, thể tích 1 000).",
        loi="Đổi như đơn vị diện tích, chỉ nhân 100.",
        phong="Nhớ dãy 10 – 100 – 1 000 ứng với độ dài – diện tích – thể tích.",
        goi_y=("Đơn vị thể tích liền kề hơn kém nhau mấy lần?",
               "Đếm số bậc giữa hai đơn vị.",
               "1 dm³ bằng đúng 1 lít."),
        pt_dang="Đổi đơn vị thể tích, dung tích",
        pt_kien_thuc="Bảng đơn vị thể tích; quan hệ dm³ – lít",
        pt_du_lieu="Đơn vị có mũ ba, hoặc lít, mi-li-lít",
        pt_phuong_phap="Đếm bậc rồi nhân, chia 1 000",
        pt_nhanh="Mỗi bậc thêm ba chữ số 0.",
        tuong_tu=("2 m³ = … lít", "2 000"),
        bay="1 000 lần mỗi bậc",
    )


# ══════════════════════════════════ MỨC M4 ══════════════════════════════════

@dang_ky("E-M4-01", "E", "M4", lop=(5,), tu_khoa=("vận tốc", "quãng đường", "thời gian"), thuc_te=True)
def e_m4_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["v", "s", "t"], rng.randint(4, 7)):
        v = rng.choice([4, 5, 12, 15, 20, 30, 36, 40, 45, 50, 60])
        t = rng.choice([2, 3, 4, 5, 6])
        s = v * t
        if kieu == "v":
            y.append((f"Một người đi {sv(s)} km hết {sv(t)} giờ. Tính vận tốc.",
                      sv(v) + " km/giờ"))
        elif kieu == "s":
            y.append((f"Một người đi với vận tốc {sv(v)} km/giờ trong {sv(t)} giờ. "
                      f"Tính quãng đường đi được.", sv(s) + " km"))
        else:
            y.append((f"Một người đi quãng đường {sv(s)} km với vận tốc {sv(v)} km/giờ. "
                      f"Tính thời gian đi.", sv(t) + " giờ"))
    return Bai(
        tieu_de="Quãng đường – vận tốc – thời gian",
        dan="Áp dụng đúng công thức cho từng câu.",
        y=y,
        huong_giai="s = v × t; v = s : t; t = s : v. Đơn vị phải khớp: vận tốc km/giờ đi "
                   "với quãng đường km và thời gian giờ.",
        td=["TD1", "TD3"],
        diem_chot="Đơn vị của vận tốc quy định đơn vị của hai đại lượng còn lại.",
        loi="Vận tốc tính bằng km/giờ nhưng thời gian lại để bằng phút.",
        phong="Ghi đơn vị bên cạnh mọi số trước khi thay vào công thức.",
        goi_y=("Đề cho hai đại lượng nào và hỏi đại lượng nào?",
               "Viết công thức tương ứng.",
               "Kiểm tra đơn vị có khớp nhau không."),
        pt_dang="Ba dạng cơ bản của chuyển động đều",
        pt_kien_thuc="Công thức s = v × t",
        pt_du_lieu="Có hai trong ba đại lượng quãng đường, vận tốc, thời gian",
        pt_phuong_phap="Chọn công thức theo đại lượng cần tìm; đồng bộ đơn vị",
        pt_nhanh="Vẽ tam giác s ở trên, v và t ở dưới: che đại lượng cần tìm là ra công thức.",
        tuong_tu=("Đi 120 km hết 3 giờ. Vận tốc là bao nhiêu?", "40 km/giờ"),
        bay="Đơn vị thời gian",
    )


@dang_ky("E-M4-02", "E", "M4", lop=(4, 5), tu_khoa=("đại lượng", "nhiều bước", "nâng cao"), thuc_te=True)
def e_m4_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        thung = rng.randint(4, 20)
        moi = rng.choice([12, 15, 18, 20, 24, 25])
        ban = rng.randint(2, thung - 1)
        chat, dv = rng.choice(CHAT_LONG)
        y.append((f"Một cửa hàng có {sv(thung)} thùng {chat}, mỗi thùng {sv(moi)} {dv}. "
                  f"Cửa hàng đã bán {sv(ban)} thùng. Hỏi cửa hàng còn lại bao nhiêu {dv} "
                  f"{chat}?", sv((thung - ban) * moi) + f" {dv}"))
    return Bai(
        tieu_de="Bài toán đại lượng nhiều bước",
        dan="Trình bày lời giải có câu trả lời.",
        y=y,
        huong_giai="Có thể tính theo hai đường: tính tổng rồi trừ phần đã bán; hoặc tính "
                   "số thùng còn lại rồi nhân. Đường thứ hai ngắn hơn — chọn đường ít phép "
                   "tính hơn.",
        td=["TD3", "TD5"],
        bay="Trừ số thùng cho số lít — hai đại lượng khác loại",
        diem_chot="Trừ **số thùng** trước khi nhân thì ít phép tính hơn.",
        loi="Trừ số thùng cho số lít, cộng trừ hai đại lượng khác loại.",
        phong="Ghi rõ đơn vị sau mỗi số để không trừ nhầm hai loại đại lượng.",
        goi_y=("Còn lại bao nhiêu thùng?",
               "Mỗi thùng bao nhiêu lít?",
               "Nhân hai kết quả đó."),
        pt_dang="Bài toán đại lượng nhiều bước",
        pt_kien_thuc="Nhân, trừ; đại lượng cùng loại",
        pt_du_lieu="Cho số nhóm, giá trị mỗi nhóm và số nhóm đã dùng",
        pt_phuong_phap="Rút gọn số bước bằng cách trừ trước, nhân sau",
        pt_nhanh="So sánh hai đường giải, chọn đường ít phép tính hơn.",
        tuong_tu=("Có 10 thùng dầu, mỗi thùng 20 lít, đã bán 3 thùng. Còn bao nhiêu lít?",
                  "140 lít"),
    )


# ══════════════════════════════════ MỨC M5 ══════════════════════════════════

@dang_ky("E-M5-01", "E", "M5", lop=(5,), tu_khoa=("vận tốc trung bình", "nâng cao"), thuc_te=True)
def e_m5_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        v1 = rng.choice([10, 12, 15, 20, 30])
        v2 = rng.choice([20, 24, 30, 40, 60])
        t1 = rng.choice([1, 2, 3])
        t2 = rng.choice([1, 2, 3])
        s = v1 * t1 + v2 * t2
        t = t1 + t2
        vtb = Fraction(s, t)
        y.append((f"Một người đi {sv(t1)} giờ đầu với vận tốc {sv(v1)} km/giờ, "
                  f"{sv(t2)} giờ sau với vận tốc {sv(v2)} km/giờ. "
                  f"Tính vận tốc trung bình trên cả quãng đường.",
                  (sv(vtb.numerator // vtb.denominator) if vtb.denominator == 1
                   else sv(round(float(vtb), 2))) + " km/giờ"))
    return Bai(
        tieu_de="Vận tốc trung bình trên cả quãng đường",
        dan="Chú ý: vận tốc trung bình không phải trung bình cộng hai vận tốc.",
        y=y,
        huong_giai="Vận tốc trung bình = **tổng quãng đường : tổng thời gian**. Phải tính "
                   "riêng quãng đường của từng chặng rồi cộng lại, sau đó chia cho tổng "
                   "thời gian.",
        td=["TD6", "TD2"],
        diem_chot="Chỉ khi hai chặng **cùng thời gian** thì vận tốc trung bình mới bằng "
                  "trung bình cộng hai vận tốc.",
        loi="Cộng hai vận tốc rồi chia đôi trong mọi trường hợp.",
        phong="Luôn viết hai dòng: tổng quãng đường = … ; tổng thời gian = … rồi mới chia.",
        goi_y=("Chặng thứ nhất đi được bao nhiêu ki-lô-mét?",
               "Chặng thứ hai đi được bao nhiêu?",
               "Lấy tổng quãng đường chia tổng thời gian."),
        pt_dang="Vận tốc trung bình",
        pt_kien_thuc="Công thức vận tốc; trung bình cộng có trọng số",
        pt_du_lieu="Hai chặng có vận tốc khác nhau",
        pt_phuong_phap="Tính tổng quãng đường, tổng thời gian rồi chia",
        pt_nhanh="Kiểm tra: vận tốc trung bình luôn nằm giữa hai vận tốc đã cho.",
        tuong_tu=("Đi 2 giờ với 30 km/giờ rồi 2 giờ với 50 km/giờ. Vận tốc trung bình?",
                  "40 km/giờ"),
        bay="Không phải trung bình cộng hai vận tốc",
    )


@dang_ky("E-M5-02", "E", "M5", lop=(4, 5), tu_khoa=("đại lượng", "tỉ lệ", "nâng cao"), thuc_te=True)
def e_m5_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        nguoi1 = rng.randint(3, 12)
        ngay1 = rng.randint(4, 20)
        cong = nguoi1 * ngay1
        them = rng.randint(1, 8)
        ngay_moi = Fraction(cong, nguoi1 + them)
        y.append((f"{sv(nguoi1)} người làm xong một công việc trong {sv(ngay1)} ngày. "
                  f"Nếu có thêm {sv(them)} người nữa (làm khoẻ như nhau) thì công việc "
                  f"đó hoàn thành sớm hơn bao nhiêu ngày?",
                  (sv(ngay1 - ngay_moi.numerator // ngay_moi.denominator)
                   if ngay_moi.denominator == 1
                   else sv(round(ngay1 - float(ngay_moi), 2))) + " ngày"))
    return Bai(
        tieu_de="Tỉ lệ nghịch — so sánh hai phương án",
        dan="Tính rồi so sánh hai phương án.",
        y=y,
        huong_giai="Tổng số ngày công không đổi: số người × số ngày. Tính tổng số ngày "
                   "công, chia cho số người mới ra số ngày mới, rồi lấy số ngày cũ trừ số "
                   "ngày mới để biết sớm hơn bao nhiêu.",
        td=["TD6", "TD3"],
        bay="Trừ thẳng số người rồi lấy hiệu làm số ngày rút ngắn",
        diem_chot="Đại lượng bất biến ở đây là **tổng số ngày công**.",
        loi="Trừ thẳng số người rồi lấy hiệu làm số ngày rút ngắn.",
        phong="Viết rõ: tổng ngày công = … ; số ngày mới = … ; sớm hơn = … .",
        goi_y=("Tổng số ngày công là bao nhiêu?",
               "Với số người mới thì cần bao nhiêu ngày?",
               "Lấy số ngày cũ trừ số ngày mới."),
        pt_dang="Tỉ lệ nghịch, so sánh hai phương án",
        pt_kien_thuc="Đại lượng tỉ lệ nghịch, tổng số ngày công",
        pt_du_lieu="Thay đổi số người, hỏi thay đổi thời gian",
        pt_phuong_phap="Bám vào tổng số ngày công không đổi",
        pt_nhanh="Số người tăng gấp k lần thì số ngày giảm còn 1 phần k.",
        tuong_tu=("6 người làm xong trong 10 ngày. Thêm 4 người thì sớm hơn mấy ngày?",
                  "4 ngày"),
    )
