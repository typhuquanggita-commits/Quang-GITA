# -*- coding: utf-8 -*-
"""Thư viện mẫu bài v2 — NHÓM F: Hình học."""
from __future__ import annotations

from fractions import Fraction

from .khung import Bai, dang_ky, hoa, luan_phien, sv

PI = Fraction(314, 100)


def gon(f: Fraction) -> str:
    return sv(f.numerator) if f.denominator == 1 else sv(round(float(f), 4))


# ══════════════════════════════ LỚP 3 ══════════════════════════════

@dang_ky("F2-M1-31", "F", "M1", lop=(3,),
         tu_khoa=("góc vuông", "góc không vuông", "ê ke", "điểm ở giữa", "trung điểm"),
         dang_bai=("Góc vuông, góc không vuông — sử dụng ê ke",
                   "Điểm ở giữa, trung điểm của đoạn thẳng"))
def f2_m1_31(rng, lop):
    d = rng.randrange(6, 40, 2)
    y = [("Dùng ê ke để kiểm tra một góc, ta áp cạnh nào của ê ke vào góc?",
          "áp đúng đỉnh góc và một cạnh của góc vào ê ke"),
         ("Một hình chữ nhật có mấy góc vuông?", "4 góc vuông"),
         ("Một hình tam giác có thể có mấy góc vuông nhiều nhất?", "1 góc vuông"),
         (f"Đoạn thẳng AB dài {sv(d)} cm, M là trung điểm của AB. Hỏi AM dài bao nhiêu?",
          sv(d // 2) + " cm"),
         (f"Với M là trung điểm AB, hãy so sánh AM và MB.", "AM = MB"),
         ("Điểm M nằm giữa A và B thì có chắc M là trung điểm của AB không?",
          "không chắc, còn phải có AM = MB"),
         (f"Nếu AM = {sv(d // 2 + 2)} cm và AB = {sv(d)} cm thì M có là trung điểm không?",
          "không, vì AM khác nửa AB")]
    return Bai(
        tieu_de="Góc vuông và trung điểm của đoạn thẳng",
        dan="Vẽ hình ra nháp trước khi trả lời.",
        y=y,
        giai_mau=[f"Trung điểm là điểm vừa **nằm giữa**, vừa **chia đôi** đoạn thẳng.",
                  f"AB dài {sv(d)} cm, M là trung điểm nên AM = MB.",
                  f"AM = {sv(d)} : 2 = {sv(d // 2)} (cm).",
                  f"Đáp số: **AM = {sv(d // 2)} cm**."],
        huong_giai="Trung điểm phải thoả **hai điều kiện**: nằm giữa hai đầu và chia đoạn "
                   "thẳng thành hai phần bằng nhau. Thiếu một điều kiện thì chỉ là điểm "
                   "nằm giữa, không phải trung điểm.",
        td=["TD1", "TD2"],
        diem_chot="Nằm giữa **chưa đủ** để là trung điểm.",
        loi="Thấy điểm nằm giữa là kết luận ngay đó là trung điểm.",
        phong="Đo cả hai đoạn AM và MB rồi mới kết luận.",
        goi_y=("Trung điểm phải thoả mấy điều kiện?",
               "AM và MB có bằng nhau không?",
               "AM bằng nửa AB thì mới là trung điểm."),
        pt_dang="Góc vuông; điểm ở giữa và trung điểm",
        pt_kien_thuc="Định nghĩa trung điểm; cách dùng ê ke",
        pt_du_lieu="Đề nhắc tới “trung điểm”, “nằm giữa”, “góc vuông”",
        pt_phuong_phap="Kiểm tra đủ hai điều kiện của trung điểm",
        pt_nhanh="AM = AB : 2 là điều kiện gọn nhất để nhận ra trung điểm.",
        tuong_tu=("AB dài 12 cm, M là trung điểm. AM dài bao nhiêu?", "6 cm"),
        mo_rong="Cho ba điểm thẳng hàng, hỏi điểm nào là trung điểm của đoạn nào.",
        chuan_bi="Đo độ dài đoạn thẳng và phép chia cho 2.",
        bay="Nằm giữa nhưng không chia đôi")


@dang_ky("F2-M2-31", "F", "M2", lop=(3, 4, 5),
         tu_khoa=("hình tròn", "tâm", "bán kính", "đường kính"),
         dang_bai=("Hình tròn: tâm, bán kính, đường kính",))
def f2_m2_31(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["r_ra_d", "d_ra_r", "so_sanh"],
                                        rng.randint(4, 7))):
        r = rng.randint(2, 40)
        if kieu == "r_ra_d":
            y.append((f"Hình tròn có bán kính {sv(r)} cm. Đường kính dài bao nhiêu?",
                      sv(2 * r) + " cm"))
            if k == 0:
                buoc = [f"Đường kính đi qua tâm và bằng hai lần bán kính.",
                        f"Đường kính = {sv(r)} × 2 = {sv(2 * r)} (cm).",
                        f"Đáp số: **{sv(2 * r)} cm**."]
        elif kieu == "d_ra_r":
            y.append((f"Hình tròn có đường kính {sv(2 * r)} cm. Bán kính dài bao nhiêu?",
                      sv(r) + " cm"))
        else:
            r2 = rng.randint(2, 40)
            y.append((f"Hình tròn A có bán kính {sv(r)} cm, hình tròn B có đường kính "
                      f"{sv(2 * r2)} cm. Hình nào lớn hơn?",
                      "A" if r > r2 else ("B" if r2 > r else "hai hình bằng nhau")))
    return Bai(
        tieu_de="Hình tròn: tâm, bán kính, đường kính",
        dan="Vẽ hình tròn và ghi kí hiệu lên hình.",
        y=y, giai_mau=buoc,
        huong_giai="Mọi bán kính của một hình tròn đều bằng nhau. Đường kính đi qua tâm và "
                   "bằng **hai lần** bán kính. Muốn so sánh hai hình tròn thì đưa về cùng "
                   "một đại lượng: cùng bán kính hoặc cùng đường kính.",
        td=["TD1", "TD2"],
        diem_chot="So sánh phải **cùng loại đại lượng** — bán kính với bán kính.",
        loi="So bán kính của hình này với đường kính của hình kia.",
        phong="Đổi hết về bán kính trước khi so sánh.",
        goi_y=("Đường kính gấp mấy lần bán kính?",
               "Đưa cả hai hình về cùng bán kính.",
               "So hai bán kính vừa tính."),
        pt_dang="Nhận biết hình tròn và các yếu tố",
        pt_kien_thuc="Quan hệ đường kính – bán kính",
        pt_du_lieu="Đề nhắc tâm, bán kính, đường kính",
        pt_phuong_phap="Quy về bán kính rồi so sánh hoặc tính",
        pt_nhanh="Nhìn đơn vị và tên đại lượng trước khi so sánh.",
        tuong_tu=("Hình tròn đường kính 10 cm có bán kính bao nhiêu?", "5 cm"),
        mo_rong="Ba hình tròn cùng tâm — tính khoảng cách giữa hai đường tròn liên tiếp.",
        chuan_bi="Nhân, chia với 2 và cách dùng com-pa.",
        bay="Bán kính hay đường kính")


@dang_ky("F2-M3-31", "F", "M3", lop=(3, 4),
         tu_khoa=("xếp hình", "phủ hình", "mảnh", "ghép hình"),
         dang_bai=("Xếp hình và phủ hình bằng các mảnh cho trước",
                   "Bài toán chia hình thành các phần bằng nhau"))
def f2_m3_31(rng, lop):
    a = rng.randrange(4, 20, 2)
    b = rng.randrange(2, a, 2)
    o = rng.choice([1, 2])
    y = [(f"Một hình chữ nhật {sv(a)} cm × {sv(b)} cm được phủ kín bằng các hình vuông "
          f"cạnh {sv(o)} cm. Cần bao nhiêu hình vuông?", sv(a * b // (o * o))),
         (f"Diện tích hình chữ nhật ấy bằng bao nhiêu?", sv(a * b) + " cm²"),
         (f"Diện tích mỗi hình vuông nhỏ bằng bao nhiêu?", sv(o * o) + " cm²"),
         (f"Chia hình chữ nhật ấy thành 2 phần bằng nhau thì mỗi phần có diện tích bao nhiêu?",
          sv(a * b // 2) + " cm²"),
         (f"Chia thành 4 phần bằng nhau thì mỗi phần bao nhiêu?", sv(a * b // 4) + " cm²"
          if a * b % 4 == 0 else sv(round(a * b / 4, 2)) + " cm²"),
         (f"Nếu ghép hai hình chữ nhật ấy theo chiều dài thì hình mới có chu vi bao nhiêu?",
          sv((a + 2 * b) * 2) + " cm")]
    return Bai(
        tieu_de="Phủ hình và chia hình thành phần bằng nhau",
        dan="Vẽ hình và kẻ lưới ra nháp.",
        y=y,
        giai_mau=[f"Bước 1 — diện tích hình chữ nhật: {sv(a)} × {sv(b)} = {sv(a * b)} (cm²).",
                  f"Bước 2 — diện tích một hình vuông nhỏ: {sv(o)} × {sv(o)} = "
                  f"{sv(o * o)} (cm²).",
                  f"Bước 3 — số hình vuông cần dùng: {sv(a * b)} : {sv(o * o)} = "
                  f"{sv(a * b // (o * o))} (hình).",
                  f"Kiểm tra: xếp được {sv(a // o)} hàng, mỗi hàng {sv(b // o)} hình — "
                  f"đúng {sv(a * b // (o * o))} hình ✓",
                  f"Đáp số: **{sv(a * b // (o * o))} hình vuông**."],
        huong_giai="Số mảnh phủ kín bằng diện tích hình lớn chia diện tích một mảnh — "
                   "nhưng chỉ đúng khi các mảnh **xếp khít không thừa**. Kiểm tra lại bằng "
                   "cách đếm số hàng và số cột.",
        td=["TD3", "TD4"],
        diem_chot="Phép chia diện tích chỉ đúng khi mảnh **xếp khít**.",
        loi="Chia chu vi cho cạnh mảnh thay vì chia diện tích cho diện tích.",
        phong="Kẻ lưới lên hình và đếm thử một hàng.",
        goi_y=("Diện tích hình lớn bằng bao nhiêu?",
               "Diện tích một mảnh bằng bao nhiêu?",
               "Chia hai diện tích cho nhau rồi đếm lại theo hàng."),
        pt_dang="Phủ hình, chia hình",
        pt_kien_thuc="Diện tích hình chữ nhật, hình vuông; phép chia",
        pt_du_lieu="“Phủ kín bằng các hình vuông cạnh …”, “chia thành … phần bằng nhau”",
        pt_phuong_phap="Chia diện tích cho diện tích, kiểm tra bằng số hàng, số cột",
        pt_nhanh="Đếm số hàng nhân số cột nhanh hơn và tự kiểm tra được.",
        tuong_tu=("Hình chữ nhật 6 cm × 4 cm phủ bằng hình vuông cạnh 2 cm. Cần mấy hình?",
                  "6 hình"),
        mo_rong="Đổi mảnh phủ thành hình chữ nhật 1 × 2 — hỏi có mấy cách xếp khác nhau.",
        chuan_bi="Diện tích hình chữ nhật và phép chia hết.",
        bay="Chia diện tích, không chia chu vi")


# ══════════════════════════════ LỚP 4 ══════════════════════════════

@dang_ky("F2-M1-41", "F", "M1", lop=(4, 5),
         tu_khoa=("góc nhọn", "góc tù", "góc bẹt", "đo góc", "vuông góc", "song song"),
         dang_bai=("Góc nhọn, góc tù, góc bẹt — nhận biết và đo góc",
                   "Hai đường thẳng vuông góc, hai đường thẳng song song"))
def f2_m1_41(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["loai_goc", "so_sanh", "hinh"], rng.randint(5, 8)):
        d = rng.choice([15, 30, 45, 60, 75, 90, 100, 120, 135, 150, 180])
        if kieu == "loai_goc":
            ten = ("góc nhọn" if d < 90 else
                   ("góc vuông" if d == 90 else ("góc bẹt" if d == 180 else "góc tù")))
            y.append((f"Góc có số đo {sv(d)}° là góc gì?", ten))
        elif kieu == "so_sanh":
            y.append((f"Góc {sv(d)}° so với góc vuông thì lớn hơn, bé hơn hay bằng?",
                      "bé hơn" if d < 90 else ("bằng" if d == 90 else "lớn hơn")))
        else:
            # Trước đây nhánh này luôn hỏi đúng một câu về hình chữ nhật, nên
            # bài nào rơi vào nó hai lần là có hai ý giống hệt nhau. Thay bằng
            # một bảng hình, mỗi hình một đáp án đếm được từ chính hình ấy.
            HINH_GOC = [
                ("hình chữ nhật", 2, 4), ("hình vuông", 2, 4),
                ("hình bình hành (không có góc vuông)", 2, 0),
                ("hình thang thường", 1, 0), ("hình thang vuông", 1, 2),
                ("hình tam giác vuông", 0, 1),
                ("hình tam giác thường", 0, 0),
            ]
            ten_h, ss, vg = rng.choice(HINH_GOC)
            y.append((f"{hoa(ten_h)} có mấy cặp cạnh song song và mấy cặp cạnh "
                      f"vuông góc?",
                      f"{sv(ss)} cặp song song, {sv(vg)} cặp vuông góc"))
    return Bai(
        tieu_de="Góc nhọn, góc tù, góc bẹt; vuông góc và song song",
        dan="Dùng ê ke và thước đo góc để kiểm chứng.",
        y=y,
        giai_mau=["Góc vuông có số đo 90°, góc bẹt có số đo 180°.",
                  "Góc bé hơn 90° là góc nhọn; góc lớn hơn 90° và bé hơn 180° là góc tù.",
                  "So số đo của góc với 90° và 180° là phân loại được ngay.",
                  "Đáp số ý a: xem số đo rồi đối chiếu hai mốc **90°** và **180°**."],
        huong_giai="Chỉ cần hai mốc: 90° và 180°. Bé hơn 90° là nhọn, đúng 90° là vuông, "
                   "giữa 90° và 180° là tù, đúng 180° là bẹt.",
        td=["TD1", "TD2"],
        diem_chot="Hai mốc **90°** và **180°** chia hết các loại góc.",
        loi="Gọi góc 90° là góc nhọn vì thấy “nhỏ”.",
        phong="Áp ê ke vào góc trước khi gọi tên.",
        goi_y=("Góc vuông có số đo bao nhiêu độ?",
               "Số đo của góc này lớn hơn hay bé hơn 90°?",
               "Nếu lớn hơn 90° thì có bé hơn 180° không?"),
        pt_dang="Nhận biết và phân loại góc",
        pt_kien_thuc="Số đo góc; hai đường thẳng vuông góc, song song",
        pt_du_lieu="Đề cho số đo góc hoặc hỏi về cạnh của hình",
        pt_phuong_phap="So số đo với hai mốc 90° và 180°",
        pt_nhanh="Ê ke chính là một góc vuông cầm tay — áp vào là biết ngay.",
        tuong_tu=("Góc 120° là góc gì?", "góc tù"),
        mo_rong="Cho hai góc kề bù, biết một góc tìm góc kia.",
        chuan_bi="Cách dùng ê ke và thước đo góc.")


@dang_ky("F2-M4-41", "F", "M4", lop=(4, 5),
         tu_khoa=("hình học tổng hợp", "ôn tập hình học", "đề thi vào lớp 6",
                  "hình học có yếu tố chuyển động"),
         dang_bai=("Bài toán hình học tổng hợp lớp 4", "Ôn tập hình học lớp 4",
                   "Bài toán hình học dạng đề thi vào lớp 6",
                   "Bài toán hình học có yếu tố chuyển động",
                   "Ôn tập hình học phẳng"))
def f2_m4_41(rng, lop):
    a = rng.randint(12, 60)
    b = rng.randint(5, a - 1)
    them = rng.randint(2, 10)
    v = rng.choice([2, 4, 5])
    cv = (a + b) * 2
    y = [(f"Hình chữ nhật có chiều dài {sv(a)} m, chiều rộng {sv(b)} m. Tính chu vi.",
          sv(cv) + " m"),
         ("Tính diện tích hình chữ nhật đó.", sv(a * b) + " m²"),
         (f"Một người đi bộ quanh hình chữ nhật ấy với vận tốc {sv(v)} m/giây. "
          f"Hỏi đi hết một vòng mất bao nhiêu giây?",
          sv(cv // v) + " giây" if cv % v == 0 else sv(round(cv / v, 2)) + " giây"),
         (f"Nếu tăng chiều dài thêm {sv(them)} m thì diện tích tăng thêm bao nhiêu?",
          sv(them * b) + " m²"),
         (f"Khi đó chu vi tăng thêm bao nhiêu mét?", sv(them * 2) + " m"),
         (f"Nếu tăng cả chiều dài và chiều rộng thêm {sv(them)} m thì diện tích mới bằng "
          f"bao nhiêu?", sv((a + them) * (b + them)) + " m²"),
         ("Diện tích tăng thêm khi tăng cả hai chiều bằng bao nhiêu?",
          sv((a + them) * (b + them) - a * b) + " m²")]
    return Bai(
        tieu_de="Hình chữ nhật — tổng hợp chu vi, diện tích và chuyển động",
        dan="Bài nhiều ý nối tiếp, ý sau dùng kết quả ý trước.",
        y=y,
        giai_mau=[f"Bước 1 — chu vi: ({sv(a)} + {sv(b)}) × 2 = {sv(cv)} (m).",
                  f"Bước 2 — diện tích: {sv(a)} × {sv(b)} = {sv(a * b)} (m²).",
                  f"Bước 3 — đi một vòng chính là đi hết chu vi: "
                  f"{sv(cv)} : {sv(v)} = "
                  f"{sv(cv // v) if cv % v == 0 else sv(round(cv / v, 2))} (giây).",
                  f"Bước 4 — tăng chiều dài thêm {sv(them)} m thì phần dôi ra là một hình "
                  f"chữ nhật {sv(them)} m × {sv(b)} m, diện tích {sv(them * b)} (m²).",
                  f"Đáp số ý a: **{sv(cv)} m**."],
        huong_giai="Đi một vòng quanh hình là đi hết **chu vi**. Tăng một chiều thì phần "
                   "diện tích dôi ra là một hình chữ nhật có kích thước bằng phần tăng nhân "
                   "chiều còn lại. Tăng cả hai chiều thì phần dôi gồm **ba mảnh**.",
        td=["TD3", "TD6"],
        diem_chot="Tăng cả hai chiều thì phần dôi ra **không phải** tích của hai phần tăng.",
        loi="Nhân hai lượng tăng với nhau rồi coi đó là diện tích tăng thêm.",
        phong="Vẽ hình cũ nằm trong hình mới rồi tô phần dôi ra.",
        goi_y=("Đi một vòng là đi hết đại lượng nào?",
               "Phần diện tích dôi ra có hình dạng gì?",
               "Tăng cả hai chiều thì phần dôi gồm mấy mảnh?"),
        pt_dang="Hình chữ nhật tổng hợp",
        pt_kien_thuc="Chu vi, diện tích hình chữ nhật; s = v × t",
        pt_du_lieu="Một hình nhưng nhiều câu hỏi nối tiếp",
        pt_phuong_phap="Tính chu vi và diện tích trước, dùng lại cho các ý sau",
        pt_nhanh="Chu vi tăng đúng 2 lần phần tăng, dù tăng chiều nào.",
        tuong_tu=("Hình chữ nhật 10 m × 5 m, tăng chiều dài 3 m. Diện tích tăng bao nhiêu?",
                  "15 m²"),
        mo_rong="Giảm một chiều và tăng chiều kia cùng một lượng — diện tích đổi thế nào?",
        chuan_bi="Công thức chu vi, diện tích hình chữ nhật và quan hệ s = v × t.",
        bay="Phần tăng gồm ba mảnh")


# ══════════════════════════════ LỚP 5 ══════════════════════════════

@dang_ky("F2-M2-51", "F", "M2", lop=(5,),
         tu_khoa=("hình trụ", "hình cầu", "nhận dạng", "hình học không gian"),
         dang_bai=("Hình trụ, hình cầu — nhận dạng", "Ôn tập hình học không gian"))
def f2_m2_51(rng, lop):
    a = rng.randint(2, 12)
    b = rng.randint(2, 10)
    c = rng.randint(2, 8)
    y = [("Hình hộp chữ nhật có mấy mặt, mấy đỉnh, mấy cạnh?",
          "6 mặt, 8 đỉnh, 12 cạnh"),
         ("Hình lập phương khác hình hộp chữ nhật ở điểm nào?",
          "có ba kích thước bằng nhau, sáu mặt đều là hình vuông"),
         ("Hình trụ có mấy mặt đáy và hai mặt đáy đó là hình gì?",
          "2 mặt đáy, đều là hình tròn bằng nhau"),
         ("Hình cầu có mặt đáy không?", "không có mặt đáy"),
         (f"Hình hộp chữ nhật ba kích thước {sv(a)} cm, {sv(b)} cm, {sv(c)} cm có thể tích "
          f"bằng bao nhiêu?", sv(a * b * c) + " cm³"),
         (f"Tổng độ dài tất cả các cạnh của hình hộp ấy bằng bao nhiêu?",
          sv(4 * (a + b + c)) + " cm"),
         (f"Hình lập phương cạnh {sv(a)} cm có diện tích toàn phần bằng bao nhiêu?",
          sv(6 * a * a) + " cm²")]
    return Bai(
        tieu_de="Nhận dạng hình khối và tính thể tích",
        dan="Cầm mô hình hoặc vẽ hình khai triển ra nháp.",
        y=y,
        giai_mau=[f"Hình hộp chữ nhật có 6 mặt, 8 đỉnh, 12 cạnh; các cạnh chia thành ba "
                  f"nhóm, mỗi nhóm 4 cạnh bằng nhau.",
                  f"Thể tích: {sv(a)} × {sv(b)} × {sv(c)} = {sv(a * b * c)} (cm³).",
                  f"Tổng độ dài các cạnh: ({sv(a)} + {sv(b)} + {sv(c)}) × 4 = "
                  f"{sv(4 * (a + b + c))} (cm).",
                  f"Đáp số ý e: **{sv(a * b * c)} cm³**."],
        huong_giai="Nhớ bộ ba số của hình hộp chữ nhật: 6 mặt, 8 đỉnh, 12 cạnh. "
                   "12 cạnh chia thành ba nhóm, mỗi nhóm 4 cạnh bằng nhau, nên tổng độ dài "
                   "các cạnh bằng 4 lần tổng ba kích thước.",
        td=["TD1", "TD3"],
        diem_chot="12 cạnh = **4 nhóm ba kích thước**, nên nhân 4 chứ không nhân 12.",
        loi="Nhân tổng ba kích thước với 12.",
        phong="Đếm cạnh theo nhóm: 4 cạnh dài, 4 cạnh rộng, 4 cạnh cao.",
        goi_y=("Hình hộp có bao nhiêu cạnh?",
               "Các cạnh chia thành mấy nhóm bằng nhau?",
               "Mỗi nhóm có mấy cạnh?"),
        pt_dang="Nhận dạng hình khối; thể tích, diện tích toàn phần",
        pt_kien_thuc="Đặc điểm hình hộp, lập phương, trụ, cầu",
        pt_du_lieu="Đề hỏi số mặt, số cạnh, hoặc cho ba kích thước",
        pt_phuong_phap="Đếm theo nhóm; áp công thức thể tích",
        pt_nhanh="Tổng độ dài các cạnh = (dài + rộng + cao) × 4.",
        tuong_tu=("Hình lập phương cạnh 3 cm có diện tích toàn phần bao nhiêu?", "54 cm²"),
        mo_rong="Vẽ hình khai triển của hình hộp và tính diện tích tấm bìa cần dùng.",
        chuan_bi="Công thức thể tích và diện tích toàn phần hình hộp chữ nhật.",
        bay="Nhân 4 chứ không nhân 12")


@dang_ky("F2-M4-51", "F", "M4", lop=(5,),
         tu_khoa=("khối lập phương", "sơn màu", "ghép", "cắt", "xếp"),
         dang_bai=("Bài toán về khối lập phương sơn màu",
                   "Bài toán ghép, cắt và xếp khối lập phương"))
def f2_m4_51(rng, lop):
    n = rng.randint(3, 6)
    ba = 8
    hai = 12 * (n - 2)
    mot = 6 * (n - 2) ** 2
    khong = (n - 2) ** 3
    y = [(f"Một khối lập phương lớn ghép từ {sv(n)} × {sv(n)} × {sv(n)} khối lập phương "
          f"nhỏ. Hỏi có tất cả bao nhiêu khối nhỏ?", sv(n ** 3)),
         ("Sơn toàn bộ mặt ngoài khối lớn. Có bao nhiêu khối nhỏ được sơn 3 mặt?", sv(ba)),
         ("Có bao nhiêu khối nhỏ được sơn 2 mặt?", sv(hai)),
         ("Có bao nhiêu khối nhỏ được sơn 1 mặt?", sv(mot)),
         ("Có bao nhiêu khối nhỏ không được sơn mặt nào?", sv(khong)),
         ("Cộng bốn loại trên lại có bằng tổng số khối nhỏ không?",
          f"có, {sv(ba)} + {sv(hai)} + {sv(mot)} + {sv(khong)} = {sv(n ** 3)}")]
    return Bai(
        tieu_de="Khối lập phương sơn màu",
        dan="Tưởng tượng khối lớn và xét theo vị trí: góc, cạnh, mặt, trong lõi.",
        y=y,
        giai_mau=[f"Khối lớn gồm {sv(n)} × {sv(n)} × {sv(n)} = {sv(n ** 3)} khối nhỏ.",
                  f"Khối ở **đỉnh** được sơn 3 mặt: hình lập phương có 8 đỉnh nên có "
                  f"{sv(ba)} khối.",
                  f"Khối ở **cạnh** (không tính hai đầu) được sơn 2 mặt: mỗi cạnh có "
                  f"{sv(n - 2)} khối, có 12 cạnh nên {sv(hai)} khối.",
                  f"Khối ở **giữa mặt** được sơn 1 mặt: mỗi mặt có {sv(n - 2)} × "
                  f"{sv(n - 2)} = {sv((n - 2) ** 2)} khối, có 6 mặt nên {sv(mot)} khối.",
                  f"Khối **trong lõi** không được sơn: {sv(n - 2)} × {sv(n - 2)} × "
                  f"{sv(n - 2)} = {sv(khong)} khối.",
                  f"Thử lại: {sv(ba)} + {sv(hai)} + {sv(mot)} + {sv(khong)} = "
                  f"{sv(n ** 3)} ✓"],
        huong_giai="Phân loại khối nhỏ theo **vị trí**: ở đỉnh sơn 3 mặt, ở cạnh sơn 2 mặt, "
                   "ở giữa mặt sơn 1 mặt, ở trong lõi không sơn. Bốn loại cộng lại phải "
                   "đúng bằng tổng số khối — đó là cách tự kiểm tra.",
        td=["TD6", "TD4"],
        diem_chot="Phân loại theo vị trí, và **cộng bốn loại lại để thử**.",
        loi="Đếm cả khối ở đỉnh vào nhóm khối ở cạnh, thành ra đếm trùng.",
        phong="Trừ hai đầu mỗi cạnh khi đếm khối sơn 2 mặt.",
        goi_y=("Khối ở đỉnh có mấy mặt lộ ra ngoài?",
               "Mỗi cạnh có bao nhiêu khối không nằm ở đỉnh?",
               "Cộng bốn loại lại xem có bằng tổng số khối không."),
        pt_dang="Khối lập phương sơn màu",
        pt_kien_thuc="Cấu tạo hình lập phương: 8 đỉnh, 12 cạnh, 6 mặt",
        pt_du_lieu="“Ghép từ … khối nhỏ”, “sơn mặt ngoài”",
        pt_phuong_phap="Phân loại theo vị trí rồi đếm từng loại",
        pt_nhanh="Số khối không sơn luôn là (n − 2) nhân ba lần chính nó.",
        tuong_tu=("Khối 3 × 3 × 3 sơn ngoài, có mấy khối không được sơn?", "1 khối"),
        mo_rong="Chỉ sơn bốn mặt bên, không sơn hai mặt đáy — đếm lại từng loại.",
        chuan_bi="Thể tích hình lập phương và cách đếm có phân loại.",
        bay="Đếm trùng khối ở đỉnh và ở cạnh")


@dang_ky("F2-M5-51", "F", "M5", lop=(5,),
         tu_khoa=("đề Chuyên", "Amsterdam", "hình học chuyên sâu", "tỉ lệ",
                  "tăng giảm kích thước"),
         dang_bai=("Bài toán hình học dạng đề Chuyên Hà Nội – Amsterdam",
                   "Mô phỏng đề thi vào lớp 6 — phần hình học chuyên sâu",
                   "Bài toán hình học có yếu tố tăng, giảm kích thước",
                   "Bài toán hình học có yếu tố tỉ lệ và chuyển động",
                   "Bài toán hình học không gian tổng hợp"))
def f2_m5_51(rng, lop):
    a = rng.randint(10, 40)
    b = rng.randint(5, a - 1)
    k = rng.choice([2, 3])
    m = rng.randint(1, 5)
    y = [(f"Hình chữ nhật có chiều dài {sv(a)} cm, chiều rộng {sv(b)} cm. Tính diện tích.",
          sv(a * b) + " cm²"),
         (f"Gấp chiều dài lên {sv(k)} lần, giữ nguyên chiều rộng. Diện tích mới gấp mấy lần?",
          f"{sv(k)} lần"),
         (f"Gấp cả hai chiều lên {sv(k)} lần. Diện tích mới gấp mấy lần diện tích cũ?",
          f"{sv(k * k)} lần"),
         (f"Diện tích mới khi gấp cả hai chiều bằng bao nhiêu?", sv(a * b * k * k) + " cm²"),
         (f"Chu vi mới khi gấp cả hai chiều gấp mấy lần chu vi cũ?", f"{sv(k)} lần"),
         (f"Nếu giảm chiều rộng đi {sv(m)} cm và tăng chiều dài thêm {sv(m)} cm thì "
          f"diện tích mới bằng bao nhiêu?", sv((a + m) * (b - m)) + " cm²"),
         (f"Diện tích khi đó tăng hay giảm so với ban đầu, và chênh bao nhiêu?",
          ("giảm " if (a + m) * (b - m) < a * b else "tăng ")
          + sv(abs((a + m) * (b - m) - a * b)) + " cm²")]
    return Bai(
        tieu_de="Diện tích và chu vi khi kích thước thay đổi — dạng đề chuyên",
        dan="Trả lời bằng lập luận tỉ lệ, hạn chế tính số lớn.",
        y=y,
        giai_mau=[f"Diện tích ban đầu: {sv(a)} × {sv(b)} = {sv(a * b)} (cm²).",
                  f"Gấp một chiều lên {sv(k)} lần thì diện tích gấp {sv(k)} lần, vì "
                  f"chiều kia giữ nguyên.",
                  f"Gấp cả hai chiều lên {sv(k)} lần thì diện tích gấp "
                  f"{sv(k)} × {sv(k)} = {sv(k * k)} lần.",
                  f"Diện tích mới: {sv(a * b)} × {sv(k * k)} = {sv(a * b * k * k)} (cm²).",
                  f"Chu vi chỉ gấp {sv(k)} lần, vì chu vi là tổng độ dài chứ không phải tích.",
                  f"Đáp số ý c: **gấp {sv(k * k)} lần**."],
        huong_giai="Diện tích là **tích** hai chiều nên gấp cả hai chiều lên k lần thì "
                   "diện tích gấp k × k lần. Chu vi là **tổng** nên chỉ gấp k lần. "
                   "Khi một chiều tăng và chiều kia giảm cùng một lượng, phải tính ra "
                   "mới biết diện tích tăng hay giảm.",
        td=["TD6", "TD3"],
        diem_chot="Diện tích gấp **k × k** lần, chu vi chỉ gấp **k** lần.",
        loi="Cho rằng gấp đôi hai chiều thì diện tích cũng chỉ gấp đôi.",
        phong="Thử với hình 1 × 1 và 2 × 2 để thấy diện tích gấp 4 lần.",
        goi_y=("Diện tích là tích hay tổng hai chiều?",
               "Gấp mỗi chiều lên k lần thì tích gấp mấy lần?",
               "Chu vi là tổng nên gấp bao nhiêu lần?"),
        pt_dang="Biến thiên diện tích và chu vi theo tỉ lệ",
        pt_kien_thuc="Diện tích, chu vi hình chữ nhật; tỉ lệ",
        pt_du_lieu="“Gấp … lần”, “tăng … cm rồi giảm … cm”",
        pt_phuong_phap="Lập luận trên tỉ lệ trước, chỉ tính số khi cần",
        pt_nhanh="Tăng một chiều và giảm chiều kia cùng một lượng thì diện tích luôn "
                 "**giảm**, trừ khi hai chiều ban đầu chênh nhau đúng lượng ấy.",
        tuong_tu=("Gấp đôi cả hai chiều thì diện tích gấp mấy lần?", "4 lần"),
        mo_rong="Chuyển sang hình hộp: gấp cả ba kích thước lên k lần thì thể tích gấp "
                "k × k × k lần.",
        chuan_bi="Diện tích, chu vi hình chữ nhật và tư duy tỉ lệ.",
        bay="Diện tích gấp bình phương, chu vi chỉ gấp một lần")
