# -*- coding: utf-8 -*-
"""Thư viện mẫu bài — NHÓM G: Suy luận logic & Toán đếm."""
from __future__ import annotations

from .khung import Bai, TEN, dang_ky, luan_phien, sv

MON = ["Toán", "Tiếng Việt", "Tiếng Anh", "Mĩ thuật", "Âm nhạc"]
MAU = ["đỏ", "xanh", "vàng", "trắng", "tím", "nâu"]


def chon_2(k: int) -> int:
    """Số cách chọn 2 trong k phần tử."""
    return k * (k - 1) // 2


# ══════════════════════════════════ MỨC M1 ══════════════════════════════════

@dang_ky("G-M1-01", "G", "M1", tu_khoa=("quy tắc đếm", "đếm cách chọn"))
def g_m1_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        a = rng.randint(2, 8)
        b = rng.randint(2, 8)
        y.append((f"Có {sv(a)} chiếc áo và {sv(b)} chiếc quần. Hỏi có bao nhiêu cách "
                  f"chọn một bộ gồm một áo và một quần?", sv(a * b) + " cách"))
    return Bai(
        tieu_de="Quy tắc nhân trong phép đếm",
        dan="Đếm số cách chọn.",
        y=y,
        huong_giai="Nếu công việc gồm hai bước liên tiếp, bước một có a cách, bước hai có "
                   "b cách, thì cả công việc có a × b cách. Đây là **quy tắc nhân**.",
        td=["TD2", "TD4"],
        diem_chot="Hai việc phải làm **cùng lúc, nối tiếp** thì nhân; chọn một trong hai "
                  "khả năng rời nhau thì cộng.",
        loi="Cộng số áo với số quần.",
        phong="Tự hỏi: chọn xong áo đã đủ một bộ chưa? Chưa đủ thì phải nhân.",
        goi_y=("Chọn xong áo đã có một bộ chưa?",
               "Với mỗi áo có bao nhiêu cách chọn quần?",
               "Nhân hai số lại."),
        pt_dang="Quy tắc nhân",
        pt_kien_thuc="Quy tắc nhân, quy tắc cộng trong phép đếm",
        pt_du_lieu="Chọn một phần tử từ mỗi nhóm để ghép thành một bộ",
        pt_phuong_phap="Nhân số cách của các bước liên tiếp",
        pt_nhanh="Vẽ sơ đồ cây với hai ba nhánh đầu để thấy rõ phép nhân.",
        tuong_tu=("Có 3 áo và 4 quần, có bao nhiêu cách chọn một bộ?", "12 cách"),
        bay="Cộng hay nhân",
    )


@dang_ky("G-M1-02", "G", "M1", tu_khoa=("suy luận", "loại trừ"))
def g_m1_02(rng, lop):
    ten = rng.sample(TEN, 3)
    mon = rng.sample(MON, 3)
    thich = dict(zip(ten, mon))          # mỗi bạn thích đúng một môn khác nhau
    a, b, c = ten
    y = [(f"Kẻ bảng ba hàng (tên bạn) và ba cột (môn học). Dữ kiện “{a} thích "
          f"{thich[a]}” cho phép đánh dấu ✔ vào ô nào?",
          f"ô ({a}; {thich[a]})"),
         (f"Sau dấu ✔ đó, những ô nào chắc chắn phải đánh ✘?",
          f"toàn bộ hàng {a} và toàn bộ cột {thich[a]}"),
         (f"Dữ kiện “{b} không thích {thich[c]}” cho phép đánh ✘ vào ô nào?",
          f"ô ({b}; {thich[c]})"),
         (f"Đến đây, hàng {b} còn lại đúng một ô trống. Vậy {b} thích môn nào?",
          thich[b]),
         (f"Suy ra {c} thích môn nào?", thich[c]),
         ("Phương pháp vừa dùng tên là gì?", "phương pháp lập bảng và loại trừ")]
    return Bai(
        tieu_de="Suy luận bằng phương pháp lập bảng và loại trừ",
        dan=f"Ba bạn {a}, {b}, {c} mỗi bạn thích đúng một môn khác nhau trong ba môn "
            f"{', '.join(mon)}. Biết **{a} thích {thich[a]}** và **{b} không thích "
            f"{thich[c]}**.",
        y=y,
        huong_giai="Kẻ bảng: hàng là tên người, cột là môn học. Mỗi dữ kiện cho phép đánh "
                   "dấu ✘ vào một ô (không thể) hoặc ✔ vào một ô (chắc chắn). Khi một hàng "
                   "chỉ còn đúng một ô trống thì ô đó là ✔; khi một cột đã có ✔ thì các ô "
                   "còn lại của cột đó đều là ✘.",
        td=["TD2", "TD6"],
        diem_chot="Mỗi lần đánh một dấu, phải **lan toả** ngay sang cả hàng và cả cột.",
        loi="Suy luận trong đầu, không kẻ bảng, nên bỏ sót khả năng.",
        phong="Luôn kẻ bảng, kể cả khi bài có vẻ dễ.",
        goi_y=("Kẻ bảng tên người × môn học.",
               "Dữ kiện nào cho một dấu chắc chắn?",
               "Sau mỗi dấu ✔, gạch bỏ cả hàng và cả cột."),
        pt_dang="Suy luận loại trừ có bảng",
        pt_kien_thuc="Phương pháp lập bảng, loại trừ",
        pt_du_lieu="Mỗi người ứng với đúng một đối tượng, đề cho các dữ kiện phủ định",
        pt_phuong_phap="Kẻ bảng, đánh dấu, lan toả theo hàng và cột",
        pt_nhanh="Bắt đầu từ dữ kiện khẳng định (“thích”, “là”) trước dữ kiện phủ định.",
        tuong_tu=("Ba bạn thích ba môn khác nhau, An thích Toán, Bình không thích Anh. "
                  "Bình thích môn nào?", "Tiếng Việt"),
    )


@dang_ky("G-M1-03", "G", "M1", tu_khoa=("đếm", "quy tắc cộng"))
def g_m1_03(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["cong", "nhan", "tru"], rng.randint(4, 7)):
        a = rng.randint(3, 12)
        b = rng.randint(3, 12)
        c = rng.randint(1, min(a, b))
        if kieu == "cong":
            y.append((f"Trên bàn có {sv(a)} quyển sách Toán và {sv(b)} quyển sách Tiếng "
                      f"Việt. Có bao nhiêu cách chọn **một** quyển sách bất kì?",
                      sv(a + b) + " cách"))
        elif kieu == "nhan":
            y.append((f"Có {sv(a)} quyển sách Toán và {sv(b)} quyển sách Tiếng Việt. "
                      f"Có bao nhiêu cách chọn **một quyển Toán và một quyển Tiếng Việt**?",
                      sv(a * b) + " cách"))
        else:
            y.append((f"Lớp có {sv(a)} bạn giỏi Toán, {sv(b)} bạn giỏi Tiếng Việt, trong "
                      f"đó {sv(c)} bạn giỏi cả hai môn. Hỏi có bao nhiêu bạn giỏi ít nhất "
                      f"một môn?", sv(a + b - c) + " bạn"))
    return Bai(
        tieu_de="Quy tắc cộng, quy tắc nhân và phép đếm có phần chung",
        dan="Đọc kĩ chữ “và” hay chữ “hoặc”.",
        y=y,
        huong_giai="Chọn **một trong hai nhóm rời nhau** thì cộng. Chọn **mỗi nhóm một "
                   "phần tử** thì nhân. Khi hai nhóm có phần tử chung, số phần tử thuộc ít "
                   "nhất một nhóm bằng tổng hai nhóm trừ đi phần chung (vì phần chung đã bị "
                   "đếm hai lần).",
        td=["TD2", "TD6"],
        diem_chot="Có phần chung thì phải **trừ đi một lần** phần chung.",
        loi="Cộng thẳng hai nhóm khi chúng có phần tử chung.",
        phong="Vẽ hai vòng tròn giao nhau, ghi số vào từng miền.",
        goi_y=("Hai nhóm có phần tử nào thuộc cả hai không?",
               "Nếu có, phần chung bị đếm mấy lần khi cộng?",
               "Trừ bớt phần chung đi một lần."),
        pt_dang="Đếm bằng quy tắc cộng, nhân, bù trừ",
        pt_kien_thuc="Quy tắc cộng, quy tắc nhân, nguyên lí bù trừ",
        pt_du_lieu="Từ khoá “và”, “hoặc”, “cả hai”, “ít nhất một”",
        pt_phuong_phap="Vẽ hai vòng tròn giao nhau, đếm theo miền",
        pt_nhanh="Vẽ sơ đồ Ven ba miền, điền số vào miền giữa trước.",
        tuong_tu=("20 bạn giỏi Toán, 15 giỏi Văn, 8 giỏi cả hai. Bao nhiêu bạn giỏi ít "
                  "nhất một môn?", "27 bạn"),
        bay="Phần chung bị đếm hai lần",
    )


# ══════════════════════════════════ MỨC M2 ══════════════════════════════════

@dang_ky("G-M2-01", "G", "M2", lop=(4, 5), tu_khoa=("giả thiết tạm", "suy luận"))
def g_m2_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        loai1, loai2 = rng.sample([(2, "xe đạp"), (4, "xe ô tô"), (3, "xe ba bánh")], 2)
        n1 = rng.randint(3, 30)
        n2 = rng.randint(3, 30)
        tong = n1 + n2
        banh = n1 * loai1[0] + n2 * loai2[0]
        y.append((f"Trong sân có {sv(tong)} chiếc {loai1[1]} và {loai2[1]}, đếm được tất "
                  f"cả {sv(banh)} bánh xe. Hỏi mỗi loại có bao nhiêu chiếc?",
                  f"{loai1[1]}: {sv(n1)} chiếc, {loai2[1]}: {sv(n2)} chiếc"))
    return Bai(
        tieu_de="Giả thiết tạm với hai loại đối tượng",
        dan="Dùng phương pháp giả thiết tạm.",
        y=y,
        huong_giai="Giả sử tất cả đều là loại có ít bánh hơn, tính tổng số bánh giả định. "
                   "Số bánh còn thiếu so với thực tế chia cho hiệu số bánh của hai loại "
                   "cho biết số xe loại nhiều bánh hơn.",
        td=["TD6", "TD3"],
        diem_chot="Chia cho **hiệu** số bánh của hai loại, không chia cho số bánh của một loại.",
        loi="Chia số bánh thiếu cho số bánh của loại nhiều hơn.",
        phong="Thử lại: nhân ngược ra tổng số bánh, phải khớp với đề.",
        goi_y=("Giả sử tất cả đều là loại ít bánh thì có bao nhiêu bánh?",
               "So với thực tế thì thiếu bao nhiêu bánh?",
               "Mỗi lần đổi một chiếc thì số bánh tăng thêm bao nhiêu?"),
        pt_dang="Giả thiết tạm hai loại",
        pt_kien_thuc="Phương pháp giả thiết tạm",
        pt_du_lieu="Hai loại đối tượng, biết tổng số và tổng của một đại lượng phụ",
        pt_phuong_phap="Giả sử đồng nhất → tính chênh → chia cho hiệu đơn vị",
        pt_nhanh="Kiểm tra ngay: số bánh phải nằm giữa tổng × (số bánh ít nhất) và "
                 "tổng × (số bánh nhiều nhất).",
        tuong_tu=("10 xe đạp và ô tô, 28 bánh. Có mấy ô tô?", "4 ô tô"),
        bay="Chia cho hiệu, không chia cho một loại",
    )


@dang_ky("G-M2-02", "G", "M2", lop=(4, 5), tu_khoa=("nói thật nói dối", "suy luận"))
def g_m2_02(rng, lop):
    a, b, c = rng.sample(TEN, 3)
    y = [(f"Câu nói của {b} và câu nói của {c} có thể cùng đúng được không? Vì sao?",
          "không, vì hai câu phủ định nhau"),
         (f"Hai câu đó có thể cùng sai được không?", "không, vì chúng phủ định nhau"),
         (f"Vậy trong hai bạn {b} và {c} có đúng mấy bạn nói thật?", "đúng một bạn"),
         (f"Đề cho biết cả ba bạn chỉ có một bạn nói thật. Suy ra {a} nói thật hay nói dối?",
          "nói dối"),
         (f"Câu của {a} là “Tôi không làm.” Câu đó sai thì điều gì đúng?",
          f"{a} chính là người làm vỡ lọ hoa"),
         ("Ai là người làm vỡ lọ hoa?", a)]
    return Bai(
        tieu_de="Bài toán nói thật – nói dối",
        dan=f"Ba bạn {a}, {b}, {c}, trong đó đúng một bạn làm vỡ lọ hoa.\n"
            f"- {a} nói: “Tôi không làm.”\n"
            f"- {b} nói: “{c} làm.”\n"
            f"- {c} nói: “{b} nói dối.”\n\n"
            f"Biết rằng trong ba bạn chỉ có đúng **một** bạn nói thật.",
        y=y,
        huong_giai="Tìm hai câu nói **phủ định nhau**: trong hai câu đó chắc chắn có đúng "
                   "một câu đúng. Vì cả ba chỉ có một câu đúng, câu đúng ấy nằm trong cặp "
                   "phủ định, nên câu còn lại (của người thứ ba) là sai. Đọc nội dung câu "
                   "sai đó để kết luận.",
        td=["TD2", "TD6"],
        diem_chot="Cặp câu **phủ định nhau** luôn có đúng một câu đúng — đó là điểm tựa.",
        loi="Thử từng người một cách rời rạc mà không dùng ràng buộc tổng số câu nói thật.",
        phong="Đánh số các câu nói, ghi rõ câu nào phủ định câu nào.",
        goi_y=("Có hai câu nào phủ định lẫn nhau không?",
               "Trong hai câu đó có mấy câu đúng?",
               "Vậy câu của người thứ ba đúng hay sai?"),
        pt_dang="Suy luận nói thật – nói dối",
        pt_kien_thuc="Logic mệnh đề sơ cấp, phương pháp loại trừ",
        pt_du_lieu="“Chỉ một người nói thật”, các câu nói mâu thuẫn nhau",
        pt_phuong_phap="Tìm cặp mâu thuẫn, khoá số câu đúng, suy ra phần còn lại",
        pt_nhanh="Cặp mâu thuẫn đã dùng hết “suất” nói thật, nên mọi câu ngoài cặp đều sai.",
        tuong_tu=("An nói “tôi không làm”, Bình nói “Chi làm”, Chi nói “Bình nói dối”, "
                  "chỉ một người nói thật. Ai làm?", "An"),
        bay="Cặp câu phủ định nhau",
    )


# ══════════════════════════════════ MỨC M3 ══════════════════════════════════

@dang_ky("G-M3-01", "G", "M3", lop=(4, 5), tu_khoa=("Đi-rích-lê", "nguyên lí ngăn kéo"))
def g_m3_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        loai = rng.randint(2, 6)
        can = rng.randint(2, 5)
        lay = loai * (can - 1) + 1
        ds_mau = ", ".join(MAU[:loai])
        y.append((f"Trong một hộp có bi thuộc {sv(loai)} màu ({ds_mau}), mỗi màu có rất "
                  f"nhiều viên. Hỏi phải lấy ra ít nhất bao nhiêu viên (không nhìn) để "
                  f"chắc chắn có {sv(can)} viên cùng màu?", sv(lay) + " viên"))
    return Bai(
        tieu_de="Nguyên lí Đi-rích-lê (nguyên lí ngăn kéo)",
        dan="Xét trường hợp xấu nhất.",
        y=y,
        huong_giai="Xét trường hợp **xấu nhất**: lấy được nhiều nhất bao nhiêu viên mà vẫn "
                   "chưa đủ điều kiện? Đó là mỗi màu lấy (k − 1) viên. Lấy thêm đúng một "
                   "viên nữa thì chắc chắn có k viên cùng màu.",
        td=["TD6", "TD2"],
        diem_chot="Luôn xuất phát từ **trường hợp xấu nhất** rồi cộng thêm 1.",
        loi="Nhân số màu với số viên cần rồi lấy luôn kết quả đó.",
        phong="Viết rõ câu “Xấu nhất là mỗi màu lấy được … viên mà vẫn chưa đủ”.",
        goi_y=("Xấu nhất thì mỗi màu lấy được bao nhiêu viên mà vẫn chưa đủ?",
               "Tổng số viên ở tình huống xấu nhất là bao nhiêu?",
               "Lấy thêm một viên nữa thì sao?"),
        pt_dang="Nguyên lí Đi-rích-lê",
        pt_kien_thuc="Nguyên lí ngăn kéo, lập luận trường hợp xấu nhất",
        pt_du_lieu="Cụm “ít nhất … để chắc chắn …”",
        pt_phuong_phap="Dựng tình huống xấu nhất rồi cộng 1",
        pt_nhanh="Công thức: số loại × (số cần − 1) + 1.",
        tuong_tu=("Hộp có bi 3 màu, lấy ít nhất mấy viên để chắc chắn có 2 viên cùng màu?",
                  "4 viên"),
        bay="Trường hợp xấu nhất, không phải trường hợp may mắn",
    )


@dang_ky("G-M3-02", "G", "M3", lop=(4, 5), tu_khoa=("bắt tay", "đếm cặp", "trận đấu"))
def g_m3_02(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["bat_tay", "tran_dau", "duong_thang"], rng.randint(4, 7)):
        n = rng.randint(4, 20)
        if kieu == "bat_tay":
            y.append((f"Có {sv(n)} người, mỗi người bắt tay với tất cả những người còn "
                      f"lại đúng một lần. Hỏi có tất cả bao nhiêu cái bắt tay?",
                      sv(chon_2(n)) + " cái"))
        elif kieu == "tran_dau":
            y.append((f"Một giải đấu có {sv(n)} đội, hai đội bất kì đấu với nhau đúng một "
                      f"trận. Hỏi có tất cả bao nhiêu trận?", sv(chon_2(n)) + " trận"))
        else:
            y.append((f"Cho {sv(n)} điểm, không có ba điểm nào thẳng hàng. Qua hai điểm "
                      f"bất kì kẻ một đường thẳng. Hỏi kẻ được bao nhiêu đường thẳng?",
                      sv(chon_2(n)) + " đường thẳng"))
    return Bai(
        tieu_de="Đếm số cặp — bắt tay, trận đấu, đường thẳng",
        dan="Ba tình huống, cùng một cách đếm.",
        y=y,
        huong_giai="Mỗi người bắt tay với n − 1 người còn lại, nên tổng số lượt bắt tay là "
                   "n × (n − 1). Nhưng mỗi cái bắt tay được đếm **hai lần** (một lần từ "
                   "mỗi phía), nên số bắt tay thật sự là n × (n − 1) : 2.",
        td=["TD4", "TD6"],
        diem_chot="Chia cho 2 vì mỗi cặp được đếm **hai lần**.",
        loi="Quên chia 2, đáp số gấp đôi.",
        phong="Thử với 3 người: phải ra 3 cái bắt tay, không phải 6.",
        goi_y=("Mỗi người bắt tay với bao nhiêu người?",
               "Nhân với số người thì mỗi cái bắt tay bị đếm mấy lần?",
               "Chia kết quả cho 2."),
        pt_dang="Đếm số cặp",
        pt_kien_thuc="Tổ hợp chập hai, nguyên tắc đếm lặp",
        pt_du_lieu="“Hai … bất kì”, “mỗi người với tất cả những người còn lại”",
        pt_phuong_phap="n × (n − 1) : 2",
        pt_nhanh="Nhớ vài giá trị: 5 người có 10 cặp, 10 người có 45 cặp.",
        tuong_tu=("6 đội bóng đấu vòng tròn một lượt. Có bao nhiêu trận?", "15 trận"),
        bay="Mỗi cặp bị đếm hai lần",
    )


@dang_ky("G-M3-03", "G", "M3", lop=(4, 5), tu_khoa=("suy luận", "cân đĩa", "tìm vật"))
def g_m3_03(rng, lop):
    n = rng.choice([3, 9, 27, 8, 12])
    lan = {3: 1, 9: 2, 27: 3, 8: 2, 12: 3}[n]
    y = [(f"Có {sv(n)} đồng tiền giống hệt nhau, trong đó có đúng một đồng nhẹ hơn. "
          f"Dùng cân đĩa (không quả cân), cần cân ít nhất mấy lần để tìm ra đồng nhẹ?",
          sv(lan) + " lần"),
         ("Mỗi lần cân, ta chia số đồng tiền thành mấy phần?", "3 phần"),
         ("Vì sao lại chia thành ba phần chứ không phải hai?",
          "vì mỗi lần cân có ba kết quả: trái nặng hơn, phải nặng hơn, hoặc cân bằng"),
         (f"Sau lần cân thứ nhất, số đồng tiền còn phải xét nhiều nhất là bao nhiêu?",
          sv(-(-n // 3))),
         ("Nếu có 3 đồng tiền thì cần cân mấy lần?", "1 lần"),
         ("Nếu có 9 đồng tiền thì cần cân mấy lần?", "2 lần")]
    return Bai(
        tieu_de="Bài toán cân đĩa tìm vật khác biệt",
        dan="Chú ý mỗi lần cân cho bao nhiêu kết quả.",
        y=y,
        huong_giai="Mỗi lần cân bằng cân đĩa cho **ba** kết quả có thể, nên mỗi lần cân "
                   "chia được số vật thành ba phần và loại đi hai phần. Sau k lần cân, "
                   "phân biệt được tối đa 3 nhân với chính nó k lần vật.",
        td=["TD6", "TD2"],
        diem_chot="Cân đĩa cho **ba** kết quả, nên chia ba chứ không chia đôi.",
        loi="Chia đôi như tìm kiếm thông thường nên cần nhiều lần cân hơn mức cần thiết.",
        phong="Nhớ ba kết quả: nghiêng trái, nghiêng phải, thăng bằng.",
        goi_y=("Một lần cân cho mấy kết quả khác nhau?",
               "Vậy nên chia số đồng tiền thành mấy phần?",
               "Sau mỗi lần cân còn lại nhiều nhất bao nhiêu đồng?"),
        pt_dang="Cân đĩa, chia ba",
        pt_kien_thuc="Lập luận trường hợp xấu nhất, chia nhóm",
        pt_du_lieu="Cân đĩa không có quả cân, tìm vật khác biệt",
        pt_phuong_phap="Chia ba phần bằng nhau mỗi lần cân",
        pt_nhanh="3 đồng → 1 lần; 9 đồng → 2 lần; 27 đồng → 3 lần.",
        tuong_tu=("Có 9 đồng tiền, một đồng nhẹ hơn. Cần cân mấy lần?", "2 lần"),
        bay="Chia ba chứ không chia đôi",
    )


# ══════════════════════════════════ MỨC M4 ══════════════════════════════════

@dang_ky("G-M4-01", "G", "M4", lop=(4, 5), tu_khoa=("bất biến", "suy luận", "chẵn lẻ"))
def g_m4_01(rng, lop):
    n = rng.randrange(5, 40)
    y = [(f"Trên bảng viết các số từ 1 đến {sv(n)}. Mỗi bước, xoá hai số bất kì và viết "
          f"thay vào **hiệu** của chúng (số lớn trừ số bé). Sau nhiều bước chỉ còn một số. "
          f"Số cuối cùng là số chẵn hay số lẻ?",
          "chẵn" if (n * (n + 1) // 2) % 2 == 0 else "lẻ"),
         (f"Tổng các số từ 1 đến {sv(n)} bằng bao nhiêu?", sv(n * (n + 1) // 2)),
         ("Khi thay hai số a và b bằng hiệu của chúng, tổng trên bảng thay đổi bao nhiêu?",
          "giảm đi 2 lần số bé"),
         ("Vì tổng giảm đi một số chẵn nên tính chẵn lẻ của tổng có thay đổi không?",
          "không thay đổi"),
         ("Vậy đại lượng bất biến ở đây là gì?", "tính chẵn lẻ của tổng các số trên bảng"),
         ("Số cuối cùng có thể bằng 0 không?",
          "có" if (n * (n + 1) // 2) % 2 == 0 else "không")]
    return Bai(
        tieu_de="Bài toán bất biến — tính chẵn lẻ của tổng",
        dan="Tìm đại lượng không đổi qua mỗi bước.",
        y=y,
        huong_giai="Khi thay a và b (giả sử a ≥ b) bằng a − b, tổng giảm đi 2b — luôn là "
                   "một số chẵn. Vì vậy **tính chẵn lẻ của tổng không bao giờ thay đổi**. "
                   "Số còn lại cuối cùng chính là tổng lúc đó, nên nó cùng tính chẵn lẻ với "
                   "tổng ban đầu.",
        td=["TD6", "TD2"],
        diem_chot="Tìm đại lượng **không đổi** qua mỗi bước là chìa khoá của cả lớp bài này.",
        loi="Thử mò vài trường hợp rồi kết luận, không chứng minh được cho mọi cách làm.",
        phong="Sau khi đoán, hãy kiểm tra: đại lượng đó thay đổi thế nào sau **một** bước?",
        goi_y=("Sau mỗi bước, tổng các số trên bảng thay đổi bao nhiêu?",
               "Lượng thay đổi đó là số chẵn hay số lẻ?",
               "Vậy tính chẵn lẻ của tổng có đổi không?"),
        pt_dang="Bài toán bất biến",
        pt_kien_thuc="Tính chẵn lẻ, đại lượng bất biến",
        pt_du_lieu="Một quá trình lặp lại nhiều bước, hỏi trạng thái cuối",
        pt_phuong_phap="Tìm đại lượng không đổi rồi so trạng thái đầu với trạng thái cuối",
        pt_nhanh="Thử với n nhỏ (n = 3, 4) để đoán, rồi chứng minh bằng bất biến.",
        tuong_tu=("Viết các số 1 đến 4, mỗi bước thay hai số bằng hiệu. Số cuối chẵn hay lẻ?",
                  "chẵn"),
        bay="Phải chứng minh, không được thử vài trường hợp",
    )


@dang_ky("G-M4-02", "G", "M4", lop=(4, 5), tu_khoa=("đếm", "lập số", "điều kiện"))
def g_m4_02(rng, lop):
    bo = sorted(rng.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 4))
    n = len(bo)
    ba = []
    for i in range(n):
        for j in range(n):
            for k in range(n):
                if len({i, j, k}) == 3 and bo[i] != 0:
                    ba.append(bo[i] * 100 + bo[j] * 10 + bo[k])
    ba = sorted(set(ba))
    chan = [x for x in ba if x % 2 == 0]
    c5 = [x for x in ba if x % 5 == 0]
    c3 = [x for x in ba if x % 3 == 0]
    return Bai(
        tieu_de="Đếm số lập được thoả nhiều điều kiện",
        dan=f"Cho bốn chữ số **{', '.join(str(d) for d in bo)}**. "
            f"Xét các số có ba chữ số **khác nhau** lập từ bốn chữ số đó.",
        y=[("Lập được tất cả bao nhiêu số?", sv(len(ba))),
           ("Trong đó có bao nhiêu số chẵn?", sv(len(chan))),
           ("Có bao nhiêu số chia hết cho 5?", sv(len(c5))),
           ("Có bao nhiêu số chia hết cho 3?", sv(len(c3))),
           ("Số lớn nhất và số bé nhất lập được là những số nào?",
            f"{sv(max(ba))} và {sv(min(ba))}"),
           ("Tổng của số lớn nhất và số bé nhất bằng bao nhiêu?", sv(max(ba) + min(ba)))],
        huong_giai="Đếm theo từng bước có ràng buộc: với điều kiện về chữ số tận cùng "
                   "(chẵn, chia hết cho 5) thì chọn **chữ số tận cùng trước**, rồi mới chọn "
                   "các hàng còn lại. Nhớ loại các số có chữ số 0 ở hàng trăm.",
        td=["TD4", "TD6"],
        diem_chot="Có ràng buộc ở hàng nào thì **chọn hàng đó trước**.",
        loi="Chọn hàng trăm trước rồi mới xét điều kiện tận cùng, dẫn đến đếm trùng hoặc sót.",
        phong="Viết rõ thứ tự chọn hàng trước khi nhân các số cách.",
        goi_y=("Điều kiện của đề ràng buộc hàng nào?",
               "Chọn hàng bị ràng buộc trước tiên.",
               "Nhớ loại trường hợp chữ số 0 đứng ở hàng trăm."),
        pt_dang="Đếm số lập được có điều kiện",
        pt_kien_thuc="Quy tắc nhân, dấu hiệu chia hết",
        pt_du_lieu="Bộ chữ số cho trước kèm điều kiện chia hết",
        pt_phuong_phap="Chọn hàng bị ràng buộc trước rồi nhân số cách các hàng còn lại",
        pt_nhanh="Số chia hết cho 3 nhận diện qua tổng ba chữ số được chọn — xét theo bộ ba.",
        tuong_tu=("Từ 1, 2, 3, 4 lập được bao nhiêu số có ba chữ số khác nhau?", "24"),
        bay="Chữ số 0 ở hàng trăm",
    )


# ══════════════════════════════════ MỨC M5 ══════════════════════════════════

@dang_ky("G-M5-01", "G", "M5", lop=(5,), tu_khoa=("tô màu", "bàn cờ", "bất biến", "nâng cao"))
def g_m5_01(rng, lop):
    n = rng.choice([4, 6, 8, 5, 7])
    o = n * n
    phu = o % 2 == 0
    y = [(f"Một bàn cờ vuông {sv(n)} × {sv(n)} ô. Hỏi có tất cả bao nhiêu ô?", sv(o)),
         (f"Tô màu xen kẽ đen trắng như bàn cờ vua thì có bao nhiêu ô đen?",
          sv(o // 2) if o % 2 == 0 else sv(o // 2 + 1)),
         (f"Một quân đô-mi-nô phủ đúng 2 ô liền nhau. Có thể phủ kín cả bàn cờ "
          f"{sv(n)} × {sv(n)} bằng các quân đô-mi-nô không?",
          "có" if phu else "không, vì số ô là số lẻ"),
         (f"Mỗi quân đô-mi-nô luôn phủ mấy ô đen và mấy ô trắng?", "1 ô đen và 1 ô trắng"),
         (f"Nếu bỏ đi hai ô ở hai góc đối diện của bàn cờ {sv(n)} × {sv(n)} "
          f"(hai ô này cùng màu) thì còn phủ kín được không?",
          "không, vì số ô đen và ô trắng không còn bằng nhau" if phu
          else "không, vì số ô còn lại là số lẻ"),
         (f"Đại lượng bất biến dùng ở đây là gì?",
          "hiệu giữa số ô đen và số ô trắng chưa bị phủ")]
    return Bai(
        tieu_de="Tô màu và phủ bàn cờ",
        dan="Dùng kĩ thuật tô màu để lập luận.",
        y=y,
        huong_giai="Tô bàn cờ xen kẽ hai màu. Mỗi quân đô-mi-nô, dù đặt ngang hay dọc, "
                   "luôn phủ đúng **một ô mỗi màu**. Vì vậy nếu phủ kín được thì số ô đen "
                   "phải bằng số ô trắng. Hai ô ở hai góc đối diện của bàn cờ luôn **cùng "
                   "màu**, bỏ chúng đi làm hai màu lệch nhau 2 ô, nên không thể phủ kín.",
        td=["TD6", "TD2"],
        diem_chot="Tô màu biến bài toán hình thành bài toán **đếm** — đó là toàn bộ ý tưởng.",
        loi="Thử xếp bằng tay rồi kết luận “không xếp được” mà không chứng minh.",
        phong="Luôn tô màu và đếm hai màu trước khi kết luận.",
        goi_y=("Tô bàn cờ xen kẽ hai màu.",
               "Một quân đô-mi-nô phủ mấy ô mỗi màu?",
               "So sánh số ô của hai màu sau khi bỏ ô."),
        pt_dang="Tô màu, bất biến trên bàn cờ",
        pt_kien_thuc="Kĩ thuật tô màu, bất biến, tính chẵn lẻ",
        pt_du_lieu="Bàn cờ, quân đô-mi-nô, câu hỏi “có thể phủ kín không”",
        pt_phuong_phap="Tô màu xen kẽ, đếm hai màu, so sánh",
        pt_nhanh="Hai ô ở hai góc đối diện của bàn cờ luôn cùng màu.",
        tuong_tu=("Bàn cờ 8 × 8 bỏ hai ô góc đối diện, có phủ kín bằng đô-mi-nô được không?",
                  "không"),
        bay="Phải chứng minh bằng tô màu",
    )


@dang_ky("G-M5-02", "G", "M5", lop=(4, 5), tu_khoa=("Đi-rích-lê", "chia nhóm", "nâng cao"))
def g_m5_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        nhom = rng.randint(3, 12)
        k = rng.randint(2, 5)
        n = nhom * (k - 1) + 1
        y.append((f"Có {sv(n)} học sinh sinh trong {sv(nhom)} tháng khác nhau. Chứng tỏ "
                  f"rằng có ít nhất {sv(k)} bạn sinh cùng một tháng. Hỏi nếu bớt đi một "
                  f"bạn thì kết luận đó còn đúng không?",
                  f"không còn đúng ({sv(n - 1)} bạn có thể chia đều "
                  f"{sv(k - 1)} bạn mỗi tháng)"))
    return Bai(
        tieu_de="Đi-rích-lê ở dạng chứng minh",
        dan="Nêu rõ ngăn kéo là gì, đồ vật là gì.",
        y=y,
        huong_giai="Coi mỗi tháng là một “ngăn kéo”, mỗi học sinh là một “đồ vật”. Nếu mỗi "
                   "ngăn kéo chứa nhiều nhất k − 1 đồ vật thì tổng số đồ vật nhiều nhất là "
                   "số ngăn × (k − 1). Có nhiều hơn thế thì chắc chắn có một ngăn chứa từ "
                   "k đồ vật trở lên.",
        td=["TD6", "TD2"],
        diem_chot="Phải gọi tên rõ **ngăn kéo** và **đồ vật** thì lập luận mới chặt.",
        loi="Nói chung chung “vì nhiều người quá nên phải trùng” mà không chỉ ra con số.",
        phong="Viết hẳn hai dòng: “Ngăn kéo là …”, “Đồ vật là …”.",
        goi_y=("Cái gì đóng vai trò ngăn kéo?",
               "Nếu mỗi ngăn chỉ có k − 1 đồ vật thì tổng cộng nhiều nhất bao nhiêu?",
               "So sánh với số đồ vật thực tế."),
        pt_dang="Đi-rích-lê dạng chứng minh",
        pt_kien_thuc="Nguyên lí ngăn kéo",
        pt_du_lieu="“Chứng tỏ rằng có ít nhất … cùng …”",
        pt_phuong_phap="Đặt tên ngăn kéo và đồ vật, tính ngưỡng",
        pt_nhanh="Ngưỡng = số ngăn × (số cần − 1) + 1.",
        tuong_tu=("13 bạn sinh trong 12 tháng, chứng tỏ có 2 bạn cùng tháng sinh.",
                  "đúng, vì 13 > 12 × 1"),
    )
