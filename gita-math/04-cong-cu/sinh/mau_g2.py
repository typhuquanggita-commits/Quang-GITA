# -*- coding: utf-8 -*-
"""Thư viện mẫu bài v2 — NHÓM G: Suy luận logic & Toán đếm."""
from __future__ import annotations

from .khung import Bai, TEN, dang_ky, hoa, luan_phien, sv


# ══════════════════════════════ TRỒNG CÂY ══════════════════════════════

@dang_ky("G2-M2-31", "G", "M2", lop=(3, 4, 5),
         tu_khoa=("trồng cây", "đường thẳng", "khép kín", "chia đoạn", "đa giác"),
         dang_bai=("Bài toán trồng cây trên đường thẳng",
                   "Bài toán trồng cây: đường thẳng và đường khép kín",
                   "Bài toán trồng cây và bài toán chia đoạn",
                   "Bài toán trồng cây: đường thẳng, đường tròn, đa giác"), thuc_te=True)
def g2_m2_31(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["hai_dau", "mot_dau", "khong_dau",
                                              "khep_kin", "chia_doan"], rng.randint(5, 7))):
        d = rng.choice([2, 3, 4, 5, 6])
        n = rng.randint(6, 40)
        dai = d * n
        if kieu == "hai_dau":
            y.append((f"Đoạn đường dài {sv(dai)} m, trồng cây cách nhau {sv(d)} m, "
                      f"trồng cả ở hai đầu. Cần bao nhiêu cây?", sv(n + 1)))
            if k == 0:
                buoc = [f"Bước 1 — số khoảng: {sv(dai)} : {sv(d)} = {sv(n)} (khoảng).",
                        f"Bước 2 — trồng cả hai đầu thì số cây **hơn số khoảng 1**.",
                        f"Số cây: {sv(n)} + 1 = {sv(n + 1)} (cây).",
                        f"Kiểm tra bằng hình nhỏ: 3 khoảng thì có 4 cây ✓",
                        f"Đáp số: **{sv(n + 1)} cây**."]
        elif kieu == "mot_dau":
            y.append((f"Đoạn đường dài {sv(dai)} m, cây cách nhau {sv(d)} m, chỉ trồng ở "
                      f"một đầu. Cần bao nhiêu cây?", sv(n)))
        elif kieu == "khong_dau":
            y.append((f"Đoạn đường dài {sv(dai)} m, cây cách nhau {sv(d)} m, không trồng "
                      f"ở cả hai đầu. Cần bao nhiêu cây?", sv(n - 1)))
        elif kieu == "khep_kin":
            y.append((f"Quanh một hồ nước có chu vi {sv(dai)} m, trồng cây cách nhau "
                      f"{sv(d)} m. Cần bao nhiêu cây?", sv(n)))
        else:
            y.append((f"Cưa một khúc gỗ dài {sv(dai)} m thành các đoạn dài {sv(d)} m. "
                      f"Phải cưa bao nhiêu nhát?", sv(n - 1)))
    return Bai(
        tieu_de="Trồng cây và chia đoạn — năm trường hợp",
        dan="Vẽ một hình nhỏ ba khoảng để kiểm tra trước khi áp công thức.",
        y=y, giai_mau=buoc,
        huong_giai="Tính **số khoảng** trước: độ dài chia khoảng cách. Rồi chọn công thức "
                   "theo trường hợp — trồng cả hai đầu thì cộng 1, một đầu thì bằng, không "
                   "đầu nào thì trừ 1, khép kín thì bằng, cưa thành đoạn thì trừ 1.",
        td=["TD3", "TD6"],
        diem_chot="Năm trường hợp cho **năm đáp số khác nhau** với cùng một số khoảng.",
        loi="Máy móc cộng 1 cho mọi trường hợp.",
        phong="Vẽ hình ba khoảng, đếm tay rồi mới áp dụng cho số lớn.",
        goi_y=("Số khoảng bằng bao nhiêu?",
               "Đề nói trồng cả hai đầu, một đầu, hay khép kín?",
               "Cưa thành đoạn thì số nhát cưa ít hơn số đoạn 1."),
        pt_dang="Bài toán trồng cây, chia đoạn",
        pt_kien_thuc="Quan hệ số điểm – số khoảng",
        pt_du_lieu="“Trồng cây”, “cột điện”, “quanh hồ”, “cưa thành đoạn”",
        pt_phuong_phap="Tính số khoảng rồi chọn công thức theo trường hợp",
        pt_nhanh="Khép kín thì số cây bằng đúng số khoảng — không cộng, không trừ.",
        tuong_tu=("Đường dài 20 m, cây cách nhau 4 m, trồng cả hai đầu. Mấy cây?", "6 cây"),
        mo_rong="Trồng cây hai bên đường — nhân đôi kết quả một bên.",
        chuan_bi="Phép chia hết và thói quen vẽ hình kiểm tra.",
        bay="Năm trường hợp khác nhau")


# ══════════════════════════════ BÙ TRỪ ══════════════════════════════

@dang_ky("G2-M3-31", "G", "M3", lop=(3, 4, 5),
         tu_khoa=("bù trừ", "hai tập hợp", "ba tập hợp", "sơ đồ Ven"),
         dang_bai=("Nguyên lý bù trừ mức làm quen với hai tập hợp",
                   "Nguyên lý bù trừ với hai và ba tập hợp",
                   "Nguyên lý bù trừ và sơ đồ Ven"), thuc_te=True)
def g2_m3_31(rng, lop):
    ca_hai = rng.randint(3, 15)
    chi_a = rng.randint(4, 25)
    chi_b = rng.randint(4, 25)
    khong = rng.randint(0, 8)
    a = chi_a + ca_hai
    b = chi_b + ca_hai
    tong = chi_a + chi_b + ca_hai + khong
    y = [(f"Lớp có {sv(tong)} học sinh. Có {sv(a)} bạn thích môn Toán, {sv(b)} bạn thích "
          f"môn Tiếng Việt, {sv(ca_hai)} bạn thích cả hai môn. Hỏi bao nhiêu bạn thích "
          f"ít nhất một trong hai môn?", sv(chi_a + chi_b + ca_hai)),
         ("Bao nhiêu bạn chỉ thích môn Toán?", sv(chi_a)),
         ("Bao nhiêu bạn chỉ thích môn Tiếng Việt?", sv(chi_b)),
         ("Bao nhiêu bạn không thích môn nào trong hai môn đó?", sv(khong)),
         ("Nếu cộng thẳng số bạn thích Toán với số bạn thích Tiếng Việt thì được bao nhiêu?",
          sv(a + b)),
         ("Con số vừa cộng lớn hơn số bạn thích ít nhất một môn bao nhiêu? Vì sao?",
          f"{sv(ca_hai)}, vì nhóm thích cả hai môn bị đếm hai lần")]
    return Bai(
        tieu_de="Nguyên lý bù trừ với hai tập hợp",
        dan="Vẽ hai vòng tròn giao nhau và điền số vào từng miền.",
        y=y,
        giai_mau=[f"Vẽ hai vòng tròn giao nhau. Miền giữa là {sv(ca_hai)} bạn thích cả hai môn.",
                  f"Chỉ thích Toán: {sv(a)} − {sv(ca_hai)} = {sv(chi_a)} (bạn).",
                  f"Chỉ thích Tiếng Việt: {sv(b)} − {sv(ca_hai)} = {sv(chi_b)} (bạn).",
                  f"Thích ít nhất một môn: {sv(chi_a)} + {sv(ca_hai)} + {sv(chi_b)} = "
                  f"{sv(chi_a + chi_b + ca_hai)} (bạn).",
                  f"Không thích môn nào: {sv(tong)} − {sv(chi_a + chi_b + ca_hai)} = "
                  f"{sv(khong)} (bạn).",
                  f"Đáp số ý a: **{sv(chi_a + chi_b + ca_hai)} bạn**."],
        huong_giai="Vẽ sơ đồ Ven hai vòng tròn. **Điền miền giữa trước**, rồi trừ ra hai "
                   "miền riêng. Cộng thẳng hai nhóm sẽ đếm nhóm chung **hai lần**, nên phải "
                   "trừ đi một lần.",
        td=["TD2", "TD6"],
        diem_chot="Điền **miền giữa trước** — mọi miền khác suy ra từ đó.",
        loi="Cộng thẳng hai nhóm rồi coi đó là số bạn thích ít nhất một môn.",
        phong="Vẽ sơ đồ Ven, ghi số vào từng miền rồi cộng lại kiểm tra với sĩ số.",
        goi_y=("Bao nhiêu bạn thích cả hai môn?",
               "Chỉ thích Toán thì bằng số thích Toán trừ đi đâu?",
               "Cộng ba miền lại rồi lấy sĩ số trừ đi."),
        pt_dang="Nguyên lý bù trừ, sơ đồ Ven",
        pt_kien_thuc="Đếm có phần chung; sơ đồ Ven",
        pt_du_lieu="Có cụm “cả hai”, “ít nhất một”, “không … nào”",
        pt_phuong_phap="Vẽ Ven, điền miền giữa trước, trừ dần ra",
        pt_nhanh="Số thích ít nhất một môn = A + B − cả hai.",
        tuong_tu=("20 bạn giỏi Toán, 15 giỏi Văn, 8 giỏi cả hai. Bao nhiêu bạn giỏi ít "
                  "nhất một môn?", "27 bạn"),
        mo_rong="Thêm môn thứ ba — sơ đồ Ven ba vòng, cộng ba rồi trừ ba đôi rồi cộng "
                "lại phần chung của cả ba.",
        chuan_bi="Phép cộng, trừ và cách vẽ sơ đồ Ven.",
        bay="Phần chung bị đếm hai lần")


# ══════════════════════════════ CHIA KẸO, PHÂN PHỐI ══════════════════════════════

@dang_ky("G2-M2-32", "G", "M2", lop=(3, 4, 5),
         tu_khoa=("chia kẹo", "chia phần", "phân phối", "phần dư"),
         dang_bai=("Toán chia kẹo: chia phần bằng nhau và phần dư",
                   "Bài toán chia kẹo và bài toán phân phối",
                   "Bài toán chia phần và bài toán phân phối"), thuc_te=True)
def g2_m2_32(rng, lop):
    n = rng.randint(4, 12)
    moi = rng.randint(3, 12)
    du = rng.randint(1, n - 1)
    tong = n * moi + du
    y = [(f"Có {sv(tong)} cái kẹo chia đều cho {sv(n)} bạn. Mỗi bạn được mấy cái và "
          f"còn thừa mấy cái?", f"mỗi bạn {sv(moi)} cái, thừa {sv(du)} cái"),
         (f"Muốn chia hết, phải bớt đi ít nhất bao nhiêu cái kẹo?", sv(du) + " cái"),
         (f"Hoặc phải thêm vào ít nhất bao nhiêu cái kẹo?", sv(n - du) + " cái"),
         (f"Nếu thêm {sv(n - du)} cái thì mỗi bạn được mấy cái?", sv(moi + 1) + " cái"),
         (f"Nếu chỉ chia cho {sv(n - 1)} bạn thì mỗi bạn được mấy cái, thừa mấy cái?",
          f"mỗi bạn {sv(tong // (n - 1))} cái, thừa {sv(tong % (n - 1))} cái"),
         (f"Số kẹo phải là số như thế nào để chia hết cho {sv(n)} bạn?",
          f"phải là số chia hết cho {sv(n)}")]
    return Bai(
        tieu_de="Chia kẹo — chia hết và chia có dư",
        dan="Ghi rõ thương và số dư trong mọi câu trả lời.",
        y=y,
        giai_mau=[f"Bước 1 — chia: {sv(tong)} : {sv(n)} = {sv(moi)} dư {sv(du)}.",
                  f"Mỗi bạn được {sv(moi)} cái, còn thừa {sv(du)} cái.",
                  f"Muốn chia hết thì bớt đúng phần dư: bớt {sv(du)} cái.",
                  f"Hoặc thêm cho đủ một suất nữa: thêm {sv(n)} − {sv(du)} = "
                  f"{sv(n - du)} (cái).",
                  f"Thử lại: {sv(n)} × {sv(moi)} + {sv(du)} = {sv(tong)} ✓",
                  f"Đáp số: **mỗi bạn {sv(moi)} cái, thừa {sv(du)} cái**."],
        huong_giai="Trong phép chia có dư, **số dư luôn bé hơn số chia**. Muốn chia hết thì "
                   "hoặc bớt đi đúng phần dư, hoặc thêm vào phần còn thiếu để đủ một suất — "
                   "phần còn thiếu bằng số chia trừ số dư.",
        td=["TD1", "TD2"],
        diem_chot="Thêm vào thì thêm **số chia trừ số dư**, không phải thêm số dư.",
        loi="Nhầm “thêm bao nhiêu” với “bớt bao nhiêu”, cả hai đều lấy số dư.",
        phong="Vẽ một hàng ô: phần dư còn thiếu bao nhiêu ô nữa thì đầy một suất?",
        goi_y=("Chia thử xem mỗi bạn được mấy cái, thừa mấy cái.",
               "Bớt đi thì bớt đúng phần thừa.",
               "Thêm vào thì thêm phần còn thiếu để đủ một suất nữa."),
        pt_dang="Chia hết và chia có dư trong tình huống chia phần",
        pt_kien_thuc="Phép chia có dư; số dư bé hơn số chia",
        pt_du_lieu="“Chia đều cho … bạn”, “còn thừa”",
        pt_phuong_phap="Chia lấy thương và dư, rồi lập luận thêm hoặc bớt",
        pt_nhanh="Thử lại bằng công thức số bị chia = số chia × thương + số dư.",
        tuong_tu=("Có 26 cái kẹo chia đều cho 5 bạn. Mỗi bạn mấy cái, thừa mấy cái?",
                  "5 cái, thừa 1 cái"),
        mo_rong="Chia sao cho mỗi bạn được số kẹo khác nhau và chênh nhau 1 cái.",
        chuan_bi="Phép chia có dư trong bảng và ngoài bảng.",
        bay="Thêm vào khác với bớt đi")


# ══════════════════════════════ CÂN ĐO, SỐ LẦN ÍT NHẤT ══════════════════════════════

@dang_ky("G2-M4-31", "G", "M4", lop=(3, 4, 5),
         tu_khoa=("cân đĩa", "khối lượng", "số lần ít nhất", "cân đong đo", "thử"),
         dang_bai=("Bài toán cân đĩa và so sánh khối lượng",
                   "Bài toán cân, đong, đo với số lần ít nhất",
                   "Bài toán về số lần ít nhất, nhiều nhất",
                   "Bài toán cân, đo, thử với số lần ít nhất"))
def g2_m4_31(rng, lop):
    n = rng.choice([3, 9, 27, 4, 8, 12])
    lan = {3: 1, 9: 2, 27: 3, 4: 2, 8: 2, 12: 3}[n]
    a, b, c = rng.sample(TEN, 3)
    y = [(f"Có {sv(n)} gói kẹo giống hệt nhau, trong đó đúng một gói nhẹ hơn. Dùng cân "
          f"đĩa không có quả cân, cần cân ít nhất mấy lần để tìm ra gói nhẹ?",
          sv(lan) + " lần"),
         ("Một lần cân bằng cân đĩa cho mấy kết quả khác nhau?",
          "3 kết quả: nghiêng trái, nghiêng phải, thăng bằng"),
         ("Vì thế mỗi lần cân nên chia số gói thành mấy phần?", "3 phần"),
         (f"Sau lần cân thứ nhất, số gói còn phải xét nhiều nhất là bao nhiêu?",
          sv(-(-n // 3))),
         (f"Biết {a} nặng hơn {b}, {b} nặng hơn {c}. Ai nhẹ nhất?", c),
         (f"Với ba bạn ấy, cần cân ít nhất mấy lần để xếp thứ tự từ nhẹ đến nặng?",
          "2 lần")]
    return Bai(
        tieu_de="Cân đĩa và số lần cân ít nhất",
        dan="Xét trường hợp xấu nhất, không xét trường hợp may mắn.",
        y=y,
        giai_mau=[f"Cân đĩa cho **ba** kết quả, nên mỗi lần cân chia được số gói thành "
                  f"ba phần và loại ngay hai phần.",
                  f"Chia {sv(n)} gói thành ba phần, mỗi phần nhiều nhất {sv(-(-n // 3))} gói.",
                  f"Đặt hai phần bằng nhau lên hai đĩa: bên nào nhẹ hơn thì gói nhẹ ở đó; "
                  f"cân bằng thì gói nhẹ ở phần còn lại.",
                  f"Lặp lại cách ấy, sau {sv(lan)} lần thì còn đúng một gói.",
                  f"Đáp số: **{sv(lan)} lần**."],
        huong_giai="Mỗi lần cân bằng cân đĩa cho ba kết quả, nên chia ba chứ không chia "
                   "đôi. Sau k lần cân phân biệt được nhiều nhất 3 nhân với chính nó k lần "
                   "vật. Luôn lập luận theo **trường hợp xấu nhất**.",
        td=["TD6", "TD2"],
        diem_chot="Cân đĩa cho **ba** kết quả nên chia ba, không chia đôi.",
        loi="Chia đôi như tìm kiếm thông thường nên cần nhiều lần cân hơn mức cần thiết.",
        phong="Nhớ ba kết quả: nghiêng trái, nghiêng phải, thăng bằng.",
        goi_y=("Một lần cân cho mấy kết quả?",
               "Vậy nên chia số gói thành mấy phần?",
               "Sau mỗi lần cân còn lại nhiều nhất bao nhiêu gói?"),
        pt_dang="Cân đĩa, tìm vật khác biệt",
        pt_kien_thuc="Lập luận trường hợp xấu nhất; chia nhóm ba",
        pt_du_lieu="Cân đĩa không có quả cân, tìm vật nhẹ hơn",
        pt_phuong_phap="Chia ba phần mỗi lần cân",
        pt_nhanh="3 gói → 1 lần; 9 gói → 2 lần; 27 gói → 3 lần.",
        tuong_tu=("Có 9 gói kẹo, một gói nhẹ hơn. Cần cân mấy lần?", "2 lần"),
        mo_rong="Không biết gói khác biệt nặng hơn hay nhẹ hơn — số lần cân tăng lên.",
        chuan_bi="Phép chia và thói quen lập luận theo trường hợp xấu nhất.",
        bay="Chia ba chứ không chia đôi")


@dang_ky("G2-M5-31", "G", "M5", lop=(3, 4, 5),
         tu_khoa=("bất biến", "chẵn lẻ", "không đổi"),
         dang_bai=("Bài toán bất biến đơn giản: tính chẵn lẻ không đổi",))
def g2_m5_31(rng, lop):
    n = rng.randrange(5, 30)
    tong = n * (n + 1) // 2
    y = [(f"Trên bảng viết các số từ 1 đến {sv(n)}. Tổng của chúng bằng bao nhiêu?",
          sv(tong)),
         ("Mỗi bước, xoá hai số bất kì và viết thay vào **tổng** của chúng. "
          "Tổng các số trên bảng có thay đổi không?", "không thay đổi"),
         ("Sau nhiều bước chỉ còn một số. Số đó bằng bao nhiêu?", sv(tong)),
         ("Nếu mỗi bước thay hai số bằng **hiệu** của chúng thì tổng giảm đi bao nhiêu?",
          "giảm đi 2 lần số bé — luôn là một số chẵn"),
         ("Vì thế tính chẵn lẻ của tổng có thay đổi không?", "không thay đổi"),
         (f"Số cuối cùng trong trường hợp thay bằng hiệu là số chẵn hay số lẻ?",
          "chẵn" if tong % 2 == 0 else "lẻ"),
         ("Số cuối cùng ấy có thể bằng 0 không?", "có" if tong % 2 == 0 else "không")]
    return Bai(
        tieu_de="Đại lượng bất biến: tính chẵn lẻ của tổng",
        dan="Tìm cho ra thứ **không đổi** qua mỗi bước.",
        y=y,
        giai_mau=[f"Tổng ban đầu: 1 + 2 + … + {sv(n)} = ({sv(n)} × {sv(n + 1)}) : 2 = "
                  f"{sv(tong)}.",
                  f"Thay hai số a và b bằng a + b: tổng **không đổi**, nên số cuối cùng "
                  f"chính là {sv(tong)}.",
                  f"Thay hai số a và b (a ≥ b) bằng a − b: tổng giảm đi 2 × b — luôn chẵn.",
                  f"Giảm đi một số chẵn thì tính chẵn lẻ của tổng giữ nguyên.",
                  f"Tổng ban đầu {sv(tong)} là số "
                  + ("chẵn" if tong % 2 == 0 else "lẻ")
                  + f", nên số cuối cùng cũng là số "
                  + ("chẵn" if tong % 2 == 0 else "lẻ") + ".",
                  f"Đáp số ý f: **số " + ("chẵn" if tong % 2 == 0 else "lẻ") + "**."],
        huong_giai="Chìa khoá là tìm một đại lượng **không đổi** qua mỗi bước. Ở đây là "
                   "tính chẵn lẻ của tổng: mỗi bước tổng giảm đi một số chẵn nên tính chẵn "
                   "lẻ giữ nguyên từ đầu đến cuối.",
        td=["TD6", "TD2"],
        diem_chot="Tìm đại lượng **bất biến** rồi so trạng thái đầu với trạng thái cuối.",
        loi="Thử vài trường hợp rồi kết luận, không chứng minh được cho mọi cách làm.",
        phong="Sau khi đoán, kiểm tra: đại lượng đó đổi thế nào sau **một** bước?",
        goi_y=("Sau mỗi bước, tổng các số trên bảng đổi bao nhiêu?",
               "Lượng thay đổi ấy là số chẵn hay số lẻ?",
               "Vậy tính chẵn lẻ của tổng có đổi không?"),
        pt_dang="Bài toán bất biến",
        pt_kien_thuc="Tính chẵn lẻ; tổng dãy số tự nhiên liên tiếp",
        pt_du_lieu="Một quá trình lặp nhiều bước, hỏi trạng thái cuối",
        pt_phuong_phap="Tìm đại lượng không đổi rồi so hai đầu quá trình",
        pt_nhanh="Thử với n nhỏ (n = 3, 4) để đoán, rồi chứng minh bằng bất biến.",
        tuong_tu=("Viết các số 1 đến 4, mỗi bước thay hai số bằng hiệu. Số cuối chẵn hay lẻ?",
                  "chẵn"),
        mo_rong="Thay bằng tích thay vì tổng — bất biến lúc này là gì?",
        chuan_bi="Tổng dãy số tự nhiên liên tiếp và khái niệm chẵn lẻ.",
        bay="Phải chứng minh, không được thử vài trường hợp")


@dang_ky("G2-M5-41", "G", "M5", lop=(4, 5),
         tu_khoa=("trắc nghiệm nhanh", "đề thi CLC", "mô phỏng đề thi", "vào lớp 6"),
         dang_bai=("Mô phỏng đề thi CLC lớp 4 — phần trắc nghiệm nhanh",
                   "Mô phỏng đề thi vào lớp 6 — phần trắc nghiệm (đề 1)"))
def g2_m5_41(rng, lop):
    n = rng.randint(5, 12)
    m = rng.randint(4, 10)
    loai = rng.randint(3, 6)
    can = rng.randint(2, 4)
    d = rng.choice([3, 4, 5, 6])
    dai = d * rng.randint(6, 20)
    y = [(f"Có {sv(n)} bạn, mỗi bạn bắt tay với tất cả các bạn còn lại đúng một lần. "
          f"Có bao nhiêu cái bắt tay?", sv(n * (n - 1) // 2)),
         (f"Có {sv(m)} áo và {sv(m - 1)} quần. Có bao nhiêu cách chọn một bộ?",
          sv(m * (m - 1))),
         (f"Hộp có bi {sv(loai)} màu. Lấy ít nhất mấy viên để chắc chắn có {sv(can)} viên "
          f"cùng màu?", sv(loai * (can - 1) + 1)),
         (f"Đoạn đường dài {sv(dai)} m, trồng cây cách nhau {sv(d)} m, trồng cả hai đầu. "
          f"Cần bao nhiêu cây?", sv(dai // d + 1)),
         (f"Từ ba chữ số 1, 2, 3 lập được bao nhiêu số có ba chữ số khác nhau?", "6"),
         (f"Trên một đường thẳng có {sv(n)} điểm. Có bao nhiêu đoạn thẳng?",
          sv(n * (n - 1) // 2)),
         (f"Một tháng có {sv(30)} ngày và ngày 1 là Thứ Hai. Tháng ấy có mấy ngày Thứ Hai?",
          "5 ngày")]
    return Bai(
        tieu_de="Trắc nghiệm nhanh — sáu kỹ thuật đếm",
        dan="Mỗi ý làm trong 60 giây. Ghi thẳng đáp số, không cần trình bày.",
        y=y,
        giai_mau=[f"Ý a — bắt tay: mỗi bạn bắt tay {sv(n - 1)} bạn, tổng {sv(n)} × "
                  f"{sv(n - 1)} = {sv(n * (n - 1))} lượt.",
                  f"Mỗi cái bắt tay có hai người nên bị đếm hai lần: "
                  f"{sv(n * (n - 1))} : 2 = {sv(n * (n - 1) // 2)} (cái).",
                  f"Ý c — xấu nhất mỗi màu lấy {sv(can - 1)} viên mà vẫn chưa đủ: "
                  f"{sv(loai)} × {sv(can - 1)} = {sv(loai * (can - 1))} viên; "
                  f"lấy thêm 1 viên nữa là chắc chắn đủ.",
                  f"Ý d — số khoảng {sv(dai)} : {sv(d)} = {sv(dai // d)}; trồng cả hai đầu "
                  f"nên cộng 1.",
                  f"Đáp số ý a: **{sv(n * (n - 1) // 2)} cái bắt tay**."],
        huong_giai="Sáu kỹ thuật quen: đếm cặp thì chia 2; chọn mỗi nhóm một phần tử thì "
                   "nhân; “chắc chắn có” thì xét trường hợp xấu nhất rồi cộng 1; trồng cây "
                   "thì tính số khoảng trước; lập số thì cố định hàng cao nhất; thứ trong "
                   "tuần thì chia 7 lấy dư.",
        td=["TD4", "TD5"],
        diem_chot="Nhận **đúng kỹ thuật** trong 5 giây rồi mới tính — đó là kỹ năng thi.",
        loi="Đếm cặp mà quên chia 2; “chắc chắn có” mà quên cộng 1.",
        phong="Trước mỗi ý, viết một chữ tắt cho kỹ thuật: cặp, nhân, xấu nhất, khoảng.",
        goi_y=("Ý này thuộc kỹ thuật đếm nào?",
               "Có cần chia 2 vì đếm trùng không?",
               "Có phải cộng 1 ở bước cuối không?"),
        pt_dang="Trắc nghiệm đếm nhanh",
        pt_kien_thuc="Đếm cặp, quy tắc nhân, ngăn kéo, trồng cây, chu kì 7",
        pt_du_lieu="Nhiều câu ngắn, mỗi câu một kỹ thuật khác nhau",
        pt_phuong_phap="Nhận dạng kỹ thuật trước, tính sau",
        pt_nhanh="Học thuộc bốn công thức: n(n−1):2, a×b, loại×(cần−1)+1, khoảng+1.",
        tuong_tu=("6 bạn bắt tay nhau. Có bao nhiêu cái bắt tay?", "15 cái"),
        mo_rong="Bấm giờ 6 phút cho cả bảy ý, chấm theo tốc độ.",
        chuan_bi="Bốn công thức đếm cơ bản và nguyên lý ngăn kéo.",
        bay="Chia 2 và cộng 1 — hai chỗ hay quên nhất")
