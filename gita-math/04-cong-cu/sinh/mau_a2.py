# -*- coding: utf-8 -*-
"""Thư viện mẫu bài v2 — NHÓM A: Số học & Cấu tạo số."""
from __future__ import annotations

from .khung import Bai, dang_ky, luan_phien, sv

HANG3 = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn"]


def cs(n: int) -> list[int]:
    return [int(c) for c in str(n)]


# ══════════════════════════════ LỚP 3 ══════════════════════════════

@dang_ky("A2-M1-31", "A", "M1", lop=(3,),
         tu_khoa=("số có bốn chữ số", "số có năm chữ số", "đọc", "viết", "cấu tạo"),
         dang_bai=("Số có bốn chữ số: đọc, viết, cấu tạo",
                   "Số có năm chữ số: đọc, viết, cấu tạo"))
def a2_m1_31(rng, lop):
    so = rng.randint(1000, 99999)
    ds = cs(so)
    n = len(ds)
    y = [(f"Số {sv(so)} có bao nhiêu chữ số?", str(n)),
         (f"Chữ số hàng đơn vị là chữ số nào?", str(ds[-1])),
         (f"Chữ số hàng trăm là chữ số nào?", str(ds[-3]) if n >= 3 else "0"),
         (f"Chữ số hàng nghìn là chữ số nào?", str(ds[-4]) if n >= 4 else "0"),
         (f"Viết số {sv(so)} thành tổng các giá trị hàng.",
          " + ".join(sv(d * 10 ** (n - 1 - i)) for i, d in enumerate(ds) if d)),
         (f"Tổng các chữ số của số {sv(so)} bằng bao nhiêu?", sv(sum(ds))),
         (f"Số liền sau của {sv(so)} là số nào?", sv(so + 1))]
    return Bai(
        tieu_de="Đọc, viết và phân tích cấu tạo số",
        dan=f"Cho số **{sv(so)}**.",
        y=y,
        giai_mau=[f"Đếm từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn.",
                  f"Số {sv(so)} có {n} chữ số.",
                  f"Chữ số hàng đơn vị là chữ số cuối cùng bên phải: {ds[-1]}.",
                  f"Viết thành tổng: {' + '.join(sv(d * 10 ** (n - 1 - i)) for i, d in enumerate(ds) if d)}.",
                  f"Cộng các chữ số: {' + '.join(str(d) for d in ds)} = {sv(sum(ds))}.",
                  f"Đáp số ý a: **{n} chữ số**."],
        huong_giai="Đếm hàng từ phải sang trái. Giá trị của một chữ số bằng chính chữ số "
                   "đó nhân với giá trị hàng nó đứng. Hàng nào khuyết thì viết chữ số 0.",
        td=["TD1"],
        diem_chot="Phân biệt **chữ số** với **giá trị** của chữ số.",
        loi="Đếm hàng từ trái sang phải nên lệch hàng.",
        phong="Đánh dấu hàng đơn vị trước, rồi đi ngược về bên trái.",
        goi_y=("Chữ số cuối cùng bên phải là hàng đơn vị.",
               "Đếm ngược: đơn vị, chục, trăm, nghìn.",
               "Giá trị = chữ số nhân 1, 10, 100, 1 000…"),
        pt_dang="Đọc, viết, cấu tạo số",
        pt_kien_thuc="Cấu tạo thập phân của số tự nhiên",
        pt_du_lieu="Câu hỏi về hàng, về tổng chữ số, về số liền kề",
        pt_phuong_phap="Đánh số hàng từ phải sang trái",
        pt_nhanh="Số chữ số đứng sau một chữ số chính là số chữ số 0 khi ghi giá trị của nó.",
        tuong_tu=("Số 40 506 có mấy chữ số và tổng các chữ số bằng bao nhiêu?",
                  "5 chữ số, tổng 15"),
        mo_rong="Hỏi số lớn nhất và số bé nhất có cùng số chữ số ấy.",
        chuan_bi="Đếm và so sánh số trong phạm vi 100 000.")


@dang_ky("A2-M2-31", "A", "M2", lop=(3,),
         tu_khoa=("tìm thành phần chưa biết", "phép cộng", "phép trừ",
                  "tính chất phép nhân", "giao hoán", "kết hợp", "nhân với 1"),
         dang_bai=("Tìm thành phần chưa biết của phép cộng, phép trừ",
                   "Tính chất phép nhân: giao hoán, kết hợp, nhân với 1 và 0"))
def a2_m2_31(rng, lop):
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["x_cong", "x_tru", "giao_hoan", "nhan_0_1"],
                                        rng.randint(5, 8))):
        x = rng.randint(12, 400)
        b = rng.randint(5, 300)
        c = rng.randint(2, 9)
        if kieu == "x_cong":
            y.append((f"x + {sv(b)} = {sv(x + b)}", f"x = {sv(x)}"))
            if k == 0:
                buoc = [f"x là **số hạng chưa biết** của phép cộng.",
                        f"Số hạng chưa biết = tổng − số hạng đã biết.",
                        f"x = {sv(x + b)} − {sv(b)} = {sv(x)}.",
                        f"Thử lại: {sv(x)} + {sv(b)} = {sv(x + b)} ✓",
                        f"Đáp số: **x = {sv(x)}**."]
        elif kieu == "x_tru":
            y.append((f"x − {sv(b)} = {sv(x)}", f"x = {sv(x + b)}"))
        elif kieu == "giao_hoan":
            y.append((f"{sv(c)} × {sv(b)} = {sv(b)} × …", sv(c)))
        else:
            y.append((f"{sv(b)} × 1 × 0 = …", "0"))
    return Bai(
        tieu_de="Tìm x và tính chất của phép nhân",
        dan="Tìm x hoặc điền số thích hợp.",
        y=y, giai_mau=buoc,
        huong_giai="Gọi tên vai trò của x trước: số hạng, số bị trừ hay số trừ. "
                   "Phép nhân có tính giao hoán và kết hợp; nhân với 1 giữ nguyên, "
                   "nhân với 0 luôn bằng 0.",
        td=["TD1", "TD3"],
        diem_chot="Một tích có thừa số bằng 0 thì bằng 0, dù các thừa số khác lớn đến đâu.",
        loi="Áp dụng quy tắc của số trừ cho số bị trừ.",
        phong="Viết ra vai trò của x trước khi viết phép tính.",
        goi_y=("x đóng vai trò gì trong phép tính?",
               "Viết quy tắc tương ứng ra nháp.",
               "Thay x tìm được vào đề để thử lại."),
        pt_dang="Tìm thành phần chưa biết; tính chất phép nhân",
        pt_kien_thuc="Quan hệ các thành phần phép tính; giao hoán, kết hợp, nhân 0 và 1",
        pt_du_lieu="Có chữ x, hoặc có dấu … trong một đẳng thức",
        pt_phuong_phap="Gọi tên vai trò rồi dùng quy tắc",
        pt_nhanh="Thử lại bằng cách thay số vừa tìm vào đề — mất ba giây nhưng chắc chắn.",
        tuong_tu=("Tìm x: x + 25 = 60", "x = 35"),
        mo_rong="Cho x xuất hiện hai lần: x + x + 12 = 40.",
        chuan_bi="Cộng, trừ trong phạm vi 1 000 và bảng nhân chia.",
        bay="Thừa số 0")


@dang_ky("A2-M3-31", "A", "M3", lop=(3,),
         tu_khoa=("chia hết cho 2", "chia hết cho 5", "chia hết cho 3", "chia hết cho 9",
                  "tổng các chữ số", "làm quen"),
         dang_bai=("Bài toán chia hết cho 2 và cho 5 — làm quen",
                   "Bài toán chia hết cho 3 và cho 9 qua tổng các chữ số"))
def a2_m3_31(rng, lop):
    y, buoc = [], []
    for k, d in enumerate(luan_phien(rng, [2, 5, 3, 9], rng.randint(5, 8))):
        s = rng.randint(102, 9999)
        tong = sum(cs(s))
        y.append((f"Số {sv(s)} có chia hết cho {d} không? Vì sao?",
                  ("có" if s % d == 0 else "không")
                  + (f" (tận cùng là {s % 10})" if d in (2, 5)
                     else f" (tổng các chữ số bằng {sv(tong)})")))
        if k == 0:
            buoc = ([f"Số chia là {d}, nên chỉ cần nhìn **chữ số tận cùng**.",
                     f"Chữ số tận cùng của {sv(s)} là {s % 10}.",
                     f"Vậy {sv(s)} " + ("chia hết" if s % d == 0 else "không chia hết")
                     + f" cho {d}."] if d in (2, 5) else
                    [f"Số chia là {d}, nên phải cộng các chữ số.",
                     f"Tổng các chữ số: {' + '.join(str(c) for c in cs(s))} = {sv(tong)}.",
                     f"{sv(tong)} " + ("chia hết" if tong % d == 0 else "không chia hết")
                     + f" cho {d}, nên {sv(s)} cũng vậy."])
    return Bai(
        tieu_de="Dấu hiệu chia hết cho 2, 3, 5, 9",
        dan="Không đặt tính chia, chỉ dùng dấu hiệu.",
        y=y, giai_mau=buoc,
        huong_giai="Chia hết cho 2: tận cùng 0, 2, 4, 6, 8. Chia hết cho 5: tận cùng 0 "
                   "hoặc 5. Chia hết cho 3 hoặc 9: cộng các chữ số rồi xét tổng.",
        td=["TD1", "TD5"],
        diem_chot="2 và 5 nhìn **đuôi**; 3 và 9 nhìn **tổng**.",
        loi="Dùng dấu hiệu của 3 để kết luận cho 2.",
        phong="Ghi tổng các chữ số ra bên cạnh trước khi kết luận.",
        goi_y=("Số chia là 2 hay 5 thì nhìn chữ số cuối.",
               "Số chia là 3 hay 9 thì cộng các chữ số.",
               "Tổng vẫn còn lớn thì cộng tiếp một lần nữa."),
        pt_dang="Kiểm tra chia hết bằng dấu hiệu",
        pt_kien_thuc="Dấu hiệu chia hết cho 2, 3, 5, 9",
        pt_du_lieu="Câu hỏi “có chia hết cho … không”",
        pt_phuong_phap="Chọn dấu hiệu theo số chia rồi kiểm tra",
        pt_nhanh="Số chia hết cho 9 thì chắc chắn chia hết cho 3; điều ngược lại không đúng.",
        tuong_tu=("Số 342 có chia hết cho 9 không?", "có, vì 3 + 4 + 2 = 9"),
        mo_rong="Hỏi số dư khi chia cho 9 — bằng số dư của tổng các chữ số.",
        chuan_bi="Bảng chia và phép cộng các số một chữ số.",
        bay="Dấu hiệu của 2, 5 khác hẳn dấu hiệu của 3, 9")


@dang_ky("A2-M4-31", "A", "M4", lop=(3,),
         tu_khoa=("số có ba chữ số", "số có bốn chữ số", "điều kiện", "thoả điều kiện"),
         dang_bai=("Bài toán về số có ba chữ số thoả điều kiện cho trước",
                   "Bài toán về số có bốn chữ số và điều kiện của chữ số"))
def a2_m4_31(rng, lop):
    t = rng.randint(6, 20)
    ds = sorted(x for x in range(100, 1000)
                if sum(cs(x)) == t and len(set(cs(x))) == 3)
    if not ds:
        ds = sorted(x for x in range(100, 1000) if sum(cs(x)) == t) or [111]
    chan = [x for x in ds if x % 2 == 0]
    y = [(f"Có bao nhiêu số có ba chữ số **khác nhau** mà tổng các chữ số bằng {sv(t)}?",
          sv(len(ds))),
         ("Số lớn nhất trong các số đó là số nào?", sv(max(ds))),
         ("Số bé nhất trong các số đó là số nào?", sv(min(ds))),
         ("Trong các số đó có bao nhiêu số chẵn?", sv(len(chan))),
         ("Tổng của số lớn nhất và số bé nhất bằng bao nhiêu?", sv(max(ds) + min(ds))),
         ("Hiệu của số lớn nhất và số bé nhất bằng bao nhiêu?", sv(max(ds) - min(ds)))]
    return Bai(
        tieu_de="Tìm số có ba chữ số thoả điều kiện",
        dan=f"Xét các số có ba chữ số **khác nhau**, tổng các chữ số bằng **{sv(t)}**.",
        y=y,
        giai_mau=[f"Liệt kê có thứ tự: chọn chữ số hàng trăm từ nhỏ tới lớn, "
                  f"rồi tìm hai chữ số còn lại cộng lại cho đủ {sv(t)}.",
                  f"Chữ số hàng trăm khác 0, ba chữ số phải khác nhau đôi một.",
                  f"Đếm được tất cả {sv(len(ds))} số.",
                  f"Số bé nhất là {sv(min(ds))}, số lớn nhất là {sv(max(ds))}.",
                  f"Đáp số ý a: **{sv(len(ds))} số**."],
        huong_giai="Liệt kê có hệ thống: cố định chữ số hàng trăm rồi tìm cặp chữ số còn "
                   "lại. Nhớ hai ràng buộc: chữ số hàng trăm khác 0, và ba chữ số khác nhau.",
        td=["TD4", "TD6"],
        diem_chot="Liệt kê **có thứ tự** thì mới không sót và không trùng.",
        loi="Viết lộn xộn nên vừa sót vừa lặp; hoặc quên điều kiện ba chữ số khác nhau.",
        phong="Kẻ bảng theo chữ số hàng trăm tăng dần.",
        goi_y=("Chữ số hàng trăm nhỏ nhất có thể là bao nhiêu?",
               "Với mỗi hàng trăm, hai chữ số còn lại phải cộng lại bằng bao nhiêu?",
               "Loại các trường hợp có chữ số trùng nhau."),
        pt_dang="Đếm số thoả điều kiện về chữ số",
        pt_kien_thuc="Cấu tạo số, tổng chữ số, quy tắc đếm",
        pt_du_lieu="“Số có ba chữ số khác nhau, tổng các chữ số bằng …”",
        pt_phuong_phap="Cố định hàng cao nhất rồi liệt kê phần còn lại",
        pt_nhanh="Số lớn nhất luôn xếp chữ số lớn ở hàng cao nhất, số bé nhất thì ngược lại.",
        tuong_tu=("Có mấy số có ba chữ số khác nhau mà tổng các chữ số bằng 6?", "8 số"),
        mo_rong="Thêm điều kiện chia hết cho 3 hoặc cho 5 để lọc tiếp.",
        chuan_bi="Cấu tạo số có ba chữ số và thói quen liệt kê có thứ tự.",
        bay="Chữ số hàng trăm khác 0 và ba chữ số khác nhau")


@dang_ky("A2-M5-31", "A", "M5", lop=(3, 4),
         tu_khoa=("chữ số tận cùng", "tích", "tổng"),
         dang_bai=("Chữ số tận cùng của một tích đơn giản",
                   "Chữ số tận cùng của tổng và của tích"))
def a2_m5_31(rng, lop):
    y, buoc = [], []
    for k, h in enumerate(luan_phien(rng, ["tich", "tong", "tich3"], rng.randint(4, 7))):
        a = rng.randint(23, 999)
        b = rng.randint(23, 999)
        c = rng.randint(2, 9)
        if h == "tich":
            y.append((f"Tích {sv(a)} × {sv(b)} có chữ số tận cùng là chữ số nào?",
                      str((a % 10) * (b % 10) % 10)))
            if k == 0:
                buoc = [f"Chữ số tận cùng của tích chỉ phụ thuộc chữ số tận cùng của các "
                        f"thừa số.",
                        f"Chữ số tận cùng của {sv(a)} là {a % 10}, của {sv(b)} là {b % 10}.",
                        f"Nhân hai chữ số ấy: {a % 10} × {b % 10} = {(a % 10) * (b % 10)}.",
                        f"Lấy chữ số tận cùng của kết quả: "
                        f"**{(a % 10) * (b % 10) % 10}**."]
        elif h == "tong":
            y.append((f"Tổng {sv(a)} + {sv(b)} có chữ số tận cùng là chữ số nào?",
                      str((a + b) % 10)))
        else:
            y.append((f"Tích {sv(a)} × {sv(b)} × {sv(c)} có chữ số tận cùng là chữ số nào?",
                      str((a % 10) * (b % 10) * c % 10)))
    return Bai(
        tieu_de="Chữ số tận cùng của tổng và tích",
        dan="Không tính hết phép tính, chỉ tìm chữ số tận cùng.",
        y=y, giai_mau=buoc,
        huong_giai="Chữ số tận cùng của tổng và của tích chỉ phụ thuộc chữ số tận cùng của "
                   "các số tham gia. Che phần đầu, chỉ tính với chữ số cuối.",
        td=["TD5", "TD2"],
        diem_chot="Chỉ làm việc với **chữ số cuối**, bỏ hết phần đầu.",
        loi="Tính trọn cả phép tính, vừa lâu vừa dễ sai.",
        phong="Lấy tay che phần đầu của hai số, chỉ để lộ chữ số cuối.",
        goi_y=("Chữ số tận cùng của mỗi số là gì?",
               "Tính riêng với hai chữ số ấy.",
               "Lấy chữ số tận cùng của kết quả vừa tính."),
        pt_dang="Chữ số tận cùng",
        pt_kien_thuc="Tính chất chữ số tận cùng của tổng, tích",
        pt_du_lieu="Câu hỏi chỉ hỏi chữ số tận cùng",
        pt_phuong_phap="Rút gọn về chữ số tận cùng rồi tính",
        pt_nhanh="Tích có thừa số tận cùng 0 hoặc 5 thì tận cùng là 0 hoặc 5.",
        tuong_tu=("Tích 137 × 46 có chữ số tận cùng là chữ số nào?", "2"),
        mo_rong="Hỏi chữ số tận cùng của tích nhiều thừa số giống nhau — tìm chu kì lặp.",
        chuan_bi="Bảng nhân và thói quen quan sát trước khi tính.")


# ══════════════════════════════ LỚP 4 – 5 ══════════════════════════════

@dang_ky("A2-M1-41", "A", "M1", lop=(4, 5),
         tu_khoa=("ôn tập số tự nhiên", "đọc", "viết", "so sánh", "lớp nghìn",
                  "phân số", "số thập phân"),
         dang_bai=("Ôn tập số tự nhiên: đọc, viết, so sánh đến lớp nghìn",
                   "Ôn tập số tự nhiên, phân số và số thập phân"))
def a2_m1_41(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["so_sanh", "hang", "lien_ke", "tron"], rng.randint(5, 8)):
        a = rng.randint(10_000, 9_999_999)
        if kieu == "so_sanh":
            b = a + rng.choice([-1, 1]) * rng.randint(1, 5000)
            y.append((f"{sv(a)} … {sv(max(1, b))}",
                      "<" if a < max(1, b) else (">" if a > max(1, b) else "=")))
        elif kieu == "hang":
            bac = rng.randint(0, len(str(a)) - 1)
            ten = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn",
                   "triệu"][bac]
            y.append((f"Chữ số hàng {ten} của số {sv(a)} có giá trị bằng bao nhiêu?",
                      sv((a // 10 ** bac) % 10 * 10 ** bac)))
        elif kieu == "lien_ke":
            y.append((f"Số liền trước và số liền sau của {sv(a)} là những số nào?",
                      f"{sv(a - 1)} và {sv(a + 1)}"))
        else:
            b = rng.choice([100, 1000])
            du = a % b
            y.append((f"Làm tròn {sv(a)} đến hàng {'trăm' if b == 100 else 'nghìn'}.",
                      sv(a - du if du * 2 < b else a - du + b)))
    return Bai(
        tieu_de="Ôn tập số tự nhiên: đọc, viết, so sánh, làm tròn",
        dan="Trả lời nhanh, mỗi ý không quá 20 giây.",
        y=y,
        huong_giai="So sánh: số nhiều chữ số hơn thì lớn hơn; bằng số chữ số thì so từng "
                   "hàng từ trái sang phải. Làm tròn: nhìn chữ số ở hàng **liền sau** hàng "
                   "cần làm tròn.",
        td=["TD1", "TD5"],
        diem_chot="So sánh đi từ **trái sang phải**, làm tròn nhìn **một chữ số liền sau**.",
        loi="So sánh từ hàng đơn vị; hoặc làm tròn nhìn nhầm sang chính hàng cần làm tròn.",
        phong="Gạch một nét ngăn ngay sau hàng cần làm tròn.",
        goi_y=("Hai số có cùng số chữ số không?",
               "So chữ số đầu tiên bên trái trước.",
               "Làm tròn thì chỉ xét đúng một chữ số liền sau."),
        pt_dang="Ôn tập số tự nhiên",
        pt_kien_thuc="Thứ tự số tự nhiên, giá trị hàng, quy tắc làm tròn",
        pt_du_lieu="Câu hỏi ngắn về so sánh, hàng, số liền kề, làm tròn",
        pt_phuong_phap="Đếm chữ số, xét hàng từ trái sang phải",
        pt_nhanh="Số nhiều chữ số hơn thì lớn hơn — không cần đọc hết số.",
        tuong_tu=("Làm tròn 4 762 đến hàng trăm.", "4 800"),
        mo_rong="Trộn thêm phân số và số thập phân vào cùng một dãy để sắp thứ tự.",
        chuan_bi="Bảng hàng và lớp của số tự nhiên.")


@dang_ky("A2-M5-41", "A", "M5", lop=(4, 5),
         tu_khoa=("đề thi vào lớp 6", "số chính phương", "chuyên toán", "dạng đề thi"),
         dang_bai=("Bài toán số học dạng đề thi vào lớp 6",
                   "Bài toán số học dạng đề Chuyên Toán KHTN",
                   "Bài toán về số chính phương — làm quen"))
def a2_m5_41(rng, lop):
    n = rng.randint(4, 12)
    cp = [i * i for i in range(1, 21)]
    a = rng.randint(2, 9)
    y = [(f"Viết {sv(n)} số chính phương đầu tiên.",
          " · ".join(sv(x) for x in cp[:n])),
         (f"Số chính phương thứ {sv(n)} là số nào?", sv(cp[n - 1])),
         ("Tổng của n số lẻ đầu tiên là một số chính phương — kiểm chứng với n = "
          + sv(n) + ".", f"1 + 3 + … + {sv(2 * n - 1)} = {sv(n * n)}"),
         ("Một số chính phương có thể tận cùng bằng 2, 3, 7 hoặc 8 không?",
          "không bao giờ"),
         (f"Số {sv(a * a)} có phải số chính phương không? Nếu có, nó là bình phương của số nào?",
          f"có, là {sv(a)} nhân {sv(a)}"),
         (f"Trong các số từ 1 đến {sv(cp[n - 1])} có bao nhiêu số chính phương?", sv(n))]
    return Bai(
        tieu_de="Số chính phương — làm quen theo hướng đề thi",
        dan="Số chính phương là số bằng tích của một số tự nhiên với chính nó.",
        y=y,
        giai_mau=[f"Số chính phương đầu tiên là 1 × 1 = 1, tiếp theo 2 × 2 = 4, "
                  f"3 × 3 = 9, …",
                  f"Viết {sv(n)} số đầu: {' · '.join(sv(x) for x in cp[:n])}.",
                  f"Số chính phương thứ {sv(n)} là {sv(n)} × {sv(n)} = {sv(cp[n - 1])}.",
                  f"Nhận xét: hiệu hai số chính phương liên tiếp là các số lẻ liên tiếp "
                  f"1, 3, 5, 7…",
                  f"Vì thế tổng {sv(n)} số lẻ đầu tiên bằng {sv(n)} × {sv(n)} = {sv(n * n)}.",
                  f"Đáp số ý b: **{sv(cp[n - 1])}**."],
        huong_giai="Lập bảng các số chính phương đầu tiên rồi quan sát hai quy luật: "
                   "hiệu hai số liên tiếp là dãy số lẻ, và chữ số tận cùng chỉ có thể là "
                   "0, 1, 4, 5, 6, 9.",
        td=["TD4", "TD6"],
        diem_chot="Số chính phương **không bao giờ** tận cùng bằng 2, 3, 7, 8.",
        loi="Kết luận một số là chính phương chỉ vì nó “trông đẹp”.",
        phong="Kiểm tra chữ số tận cùng trước, sau đó thử khai căn bằng cách nhân thử.",
        goi_y=("Viết bảng các số chính phương đầu tiên.",
               "Hiệu hai số chính phương liên tiếp là những số nào?",
               "Chữ số tận cùng của số chính phương có thể là những chữ số nào?"),
        pt_dang="Số chính phương",
        pt_kien_thuc="Định nghĩa số chính phương, tổng số lẻ đầu tiên",
        pt_du_lieu="Có cụm “bình phương”, “nhân với chính nó”, “số chính phương”",
        pt_phuong_phap="Lập bảng, quan sát quy luật, dùng chữ số tận cùng để loại",
        pt_nhanh="Tổng n số lẻ đầu tiên luôn bằng n nhân n.",
        tuong_tu=("Số chính phương thứ 7 là số nào?", "49"),
        mo_rong="Chứng tỏ tổng hai số chính phương liên tiếp luôn là số lẻ.",
        chuan_bi="Bảng nhân và chữ số tận cùng của tích.",
        bay="Chữ số tận cùng loại được nhiều số ngay lập tức")
