# -*- coding: utf-8 -*-
"""Thư viện mẫu bài v2 — bù nốt những ô còn đúng một mẫu."""
from __future__ import annotations

from fractions import Fraction

from .khung import Bai, TEN, TO_DOI, dang_ky, hoa, luan_phien, ps, sv

PI = Fraction(314, 100)


def gon(f: Fraction) -> str:
    return sv(f.numerator) if f.denominator == 1 else sv(round(float(f), 4))


# ═══════════════════ LỚP 4 — nhóm E, F, H ở mức cao ═══════════════════

@dang_ky("E4-M5-11", "E", "M5", lop=(4, 5), tu_khoa=("đại lượng", "nâng cao", "suy luận",
                                                     "đổi đơn vị", "tổng hợp"),
         dang_bai=("Bài toán đại lượng tổng hợp nâng cao",), thuc_te=True)
def e4_m5_11(rng, lop):
    tan = rng.randint(2, 9)
    ta = rng.randint(1, 9)
    kg = rng.randint(10, 90)
    tong_kg = tan * 1000 + ta * 100 + kg
    xe = rng.choice([2, 4, 5])
    moi = tong_kg // xe
    du = tong_kg - moi * xe
    y = [(f"Một kho chứa {sv(tan)} tấn {sv(ta)} tạ {sv(kg)} kg thóc. Đổi ra ki-lô-gam.",
          sv(tong_kg) + " kg"),
         (f"Số thóc ấy nặng bao nhiêu tạ và bao nhiêu ki-lô-gam?",
          f"{sv(tong_kg // 100)} tạ {sv(tong_kg % 100)} kg"),
         (f"Chở đều bằng {sv(xe)} xe thì mỗi xe chở bao nhiêu ki-lô-gam, còn thừa bao nhiêu?",
          f"{sv(moi)} kg, thừa {sv(du)} kg" if du else f"{sv(moi)} kg, không thừa"),
         (f"Nếu mỗi xe chỉ chở được 1 tấn thì cần ít nhất bao nhiêu xe?",
          sv(-(-tong_kg // 1000)) + " xe"),
         (f"Bán {sv(tong_kg // 2)} kg thì còn lại bao nhiêu tạ và ki-lô-gam?",
          f"{sv((tong_kg - tong_kg // 2) // 100)} tạ "
          f"{sv((tong_kg - tong_kg // 2) % 100)} kg"),
         ("Vì sao ở ý d phải làm tròn lên chứ không làm tròn xuống?",
          "vì phần thóc còn lại vẫn cần thêm một xe nữa để chở")]
    return Bai(
        tieu_de="Đại lượng khối lượng — đổi đơn vị và chia phần",
        dan="Đổi hết về ki-lô-gam trước khi tính.",
        y=y,
        giai_mau=[f"Bước 1 — đổi về ki-lô-gam: {sv(tan)} tấn = {sv(tan * 1000)} kg; "
                  f"{sv(ta)} tạ = {sv(ta * 100)} kg.",
                  f"Tổng: {sv(tan * 1000)} + {sv(ta * 100)} + {sv(kg)} = {sv(tong_kg)} (kg).",
                  f"Bước 2 — chia cho {sv(xe)} xe: {sv(tong_kg)} : {sv(xe)} = {sv(moi)} "
                  + (f"dư {sv(du)}." if du else "."),
                  f"Bước 3 — mỗi xe chở 1 tấn = 1 000 kg, cần {sv(tong_kg)} : 1 000 = "
                  f"{sv(tong_kg // 1000)} xe đầy, còn {sv(tong_kg % 1000)} kg nữa nên "
                  f"phải thêm một xe.",
                  f"Đáp số ý a: **{sv(tong_kg)} kg**."],
        huong_giai="Quy hết về một đơn vị rồi mới tính. Với câu hỏi “cần ít nhất bao nhiêu "
                   "xe”, phần dư vẫn phải có một xe chở, nên **làm tròn lên**.",
        td=["TD3", "TD6"],
        diem_chot="Câu hỏi “ít nhất bao nhiêu xe” luôn **làm tròn lên**.",
        loi="Chia rồi lấy phần nguyên, bỏ quên phần dư vẫn cần một xe.",
        phong="Hỏi lại: phần thóc dư có tự bay đi được không?",
        goi_y=("Đổi tất cả về ki-lô-gam.", "Chia cho sức chở mỗi xe.",
               "Còn dư thì có cần thêm xe không?"),
        pt_dang="Đại lượng khối lượng, chia phần và làm tròn lên",
        pt_kien_thuc="Bảng đơn vị khối lượng; phép chia có dư",
        pt_du_lieu="Số đo nhiều đơn vị; câu hỏi “ít nhất bao nhiêu”",
        pt_phuong_phap="Quy về một đơn vị, chia, xét phần dư",
        pt_nhanh="1 tấn = 1 000 kg nên chia cho 1 000 là bớt ba chữ số 0.",
        tuong_tu=("3 tấn 4 tạ 50 kg = … kg", "3 450 kg"),
        mo_rong="Mỗi xe chở tối đa 1,5 tấn — phải đổi sang đơn vị chung trước.",
        chuan_bi="Bảng đơn vị khối lượng và phép chia có dư.",
        bay="Làm tròn lên khi hỏi số xe ít nhất")


@dang_ky("F4-M5-11", "F", "M5", lop=(4, 5), tu_khoa=("hình học", "nâng cao", "diện tích",
                                                     "cắt ghép", "suy luận"),
         dang_bai=("Bài toán hình học nâng cao về diện tích",))
def f4_m5_11(rng, lop):
    a = rng.randint(8, 30)
    b = rng.randint(4, a - 1)
    k = rng.randint(2, 4)
    y = [(f"Hình chữ nhật có chiều dài {sv(a)} cm, chiều rộng {sv(b)} cm. Tính diện tích.",
          sv(a * b) + " cm²"),
         (f"Cắt hình ấy thành {sv(k)} phần bằng nhau. Mỗi phần có diện tích bao nhiêu?",
          sv(a * b // k) + " cm²" if a * b % k == 0
          else sv(round(a * b / k, 2)) + " cm²"),
         (f"Nối trung điểm hai cạnh dài lại, hình bị chia thành hai phần. Mỗi phần có "
          f"diện tích bao nhiêu?", sv(a * b // 2) + " cm²" if a * b % 2 == 0
          else sv(round(a * b / 2, 2)) + " cm²"),
         (f"Nối một đỉnh với trung điểm cạnh đối diện, được một tam giác. Diện tích tam "
          f"giác ấy bằng bao nhiêu phần diện tích hình chữ nhật?", "1 phần 4"),
         (f"Diện tích tam giác ấy bằng bao nhiêu xăng-ti-mét vuông?",
          sv(a * b // 4) + " cm²" if a * b % 4 == 0 else sv(round(a * b / 4, 2)) + " cm²"),
         (f"Nếu ghép hai hình chữ nhật ấy theo chiều rộng thì hình mới có diện tích và "
          f"chu vi bằng bao nhiêu?",
          f"diện tích {sv(2 * a * b)} cm², chu vi {sv((a + 2 * b) * 2)} cm")]
    return Bai(
        tieu_de="Cắt, ghép hình và tỉ số diện tích",
        dan="Vẽ hình và tô phần cần tính trước khi làm.",
        y=y,
        giai_mau=[f"Diện tích hình chữ nhật: {sv(a)} × {sv(b)} = {sv(a * b)} (cm²).",
                  f"Nối một đỉnh với trung điểm cạnh đối diện được một tam giác có đáy "
                  f"bằng nửa cạnh và chiều cao bằng cạnh kia.",
                  f"Diện tích tam giác = đáy × chiều cao : 2, tức bằng "
                  f"(nửa cạnh × cạnh kia) : 2 = **một phần tư** diện tích hình chữ nhật.",
                  f"Cụ thể: {sv(a * b)} : 4 = "
                  + (sv(a * b // 4) if a * b % 4 == 0 else sv(round(a * b / 4, 2)))
                  + " (cm²).",
                  f"Ghép hai hình theo chiều rộng: diện tích cộng lại, nhưng chu vi thì "
                  f"không cộng vì hai cạnh dán vào trong.",
                  f"Đáp số ý d: **một phần tư**."],
        huong_giai="Diện tích cộng được khi ghép hình, **chu vi thì không**. Tam giác có "
                   "đáy bằng nửa một cạnh và chiều cao bằng cạnh kia thì diện tích bằng "
                   "một phần tư hình chữ nhật.",
        td=["TD6", "TD3"],
        diem_chot="Ghép hình: **diện tích cộng, chu vi không cộng**.",
        loi="Cộng chu vi hai hình nhỏ lại thành chu vi hình ghép.",
        phong="Tô đậm đường bao của hình mới rồi mới tính chu vi.",
        goi_y=("Tam giác ấy có đáy và chiều cao bằng bao nhiêu?",
               "Diện tích tam giác bằng đáy nhân chiều cao chia 2.",
               "So với diện tích hình chữ nhật thì bằng mấy phần?"),
        pt_dang="Cắt ghép hình, tỉ số diện tích",
        pt_kien_thuc="Diện tích hình chữ nhật, tam giác; đường bao",
        pt_du_lieu="“Cắt thành … phần”, “nối trung điểm”, “ghép hai hình”",
        pt_phuong_phap="Vẽ hình, xác định đáy và chiều cao, so tỉ số",
        pt_nhanh="Tam giác nối một đỉnh với trung điểm cạnh đối diện luôn bằng một phần tư.",
        tuong_tu=("Hình chữ nhật 8 cm × 6 cm, nối một đỉnh với trung điểm cạnh đối diện. "
                  "Diện tích tam giác bằng bao nhiêu?", "12 cm²"),
        mo_rong="Nối hai trung điểm của hai cạnh kề — tỉ số diện tích bằng bao nhiêu?",
        chuan_bi="Diện tích hình chữ nhật và tam giác; khái niệm trung điểm.",
        bay="Chu vi không cộng như diện tích")


@dang_ky("H4-M4-11", "H", "M4", lop=(4, 5), tu_khoa=("phân số", "so sánh", "rút gọn",
                                                     "quy đồng", "sắp thứ tự"),
         dang_bai=("So sánh và sắp thứ tự phân số",))
def h4_m4_11(rng, lop):
    mau = rng.choice([12, 18, 24, 36])
    ds = sorted({Fraction(rng.randint(1, mau - 1), mau) for _ in range(6)})
    while len(ds) < 4:
        ds = sorted(set(ds) | {Fraction(rng.randint(1, mau - 1), mau)})
    ds = ds[:5]
    tron = ds[:]
    rng.shuffle(tron)
    y = [("Rút gọn các phân số sau về dạng tối giản: "
          + " · ".join(f"{sv(f.numerator)} phần {sv(f.denominator)}" for f in tron),
          " · ".join(ps(f) for f in tron)),
         ("Sắp xếp các phân số ấy từ bé đến lớn.", " < ".join(ps(f) for f in ds)),
         ("Phân số nào lớn nhất?", ps(ds[-1])),
         ("Phân số nào bé nhất?", ps(ds[0])),
         ("Phân số lớn nhất hơn phân số bé nhất bao nhiêu?", ps(ds[-1] - ds[0])),
         ("Có phân số nào lớn hơn 1 không?",
          "có" if any(f > 1 for f in ds) else "không, tất cả đều bé hơn 1")]
    return Bai(
        tieu_de="Rút gọn, so sánh và sắp thứ tự phân số",
        dan="Rút gọn trước rồi mới so sánh.",
        y=y,
        giai_mau=[f"Các phân số đều có cùng mẫu số {sv(mau)} nên so sánh **tử số** là đủ.",
                  f"Sắp tử số từ bé đến lớn rồi ghi lại phân số tương ứng.",
                  f"Kết quả: {' < '.join(ps(f) for f in ds)}.",
                  f"Hiệu của phân số lớn nhất và bé nhất: {ps(ds[-1])} − {ps(ds[0])} = "
                  f"{ps(ds[-1] - ds[0])}.",
                  f"Đáp số ý b: **{' < '.join(ps(f) for f in ds)}**."],
        huong_giai="Cùng mẫu số thì so tử số. Khác mẫu thì quy đồng hoặc so với 1 và với "
                   "một nửa. Rút gọn về tối giản trước khi trình bày kết quả.",
        td=["TD1", "TD5"],
        diem_chot="Cùng mẫu số thì **chỉ cần so tử số**.",
        loi="Rút gọn xong quên rằng thứ tự vẫn giữ nguyên, đi quy đồng lại từ đầu.",
        phong="Ghi cả phân số gốc và phân số tối giản cạnh nhau để đối chiếu.",
        goi_y=("Các phân số có cùng mẫu số không?", "Nếu cùng mẫu thì so gì?",
               "Rút gọn không làm thay đổi giá trị nên không đổi thứ tự."),
        pt_dang="Rút gọn, so sánh, sắp thứ tự phân số",
        pt_kien_thuc="Tính chất cơ bản của phân số; so sánh phân số",
        pt_du_lieu="Một nhóm phân số cần sắp thứ tự",
        pt_phuong_phap="Rút gọn → so cùng mẫu hoặc quy đồng",
        pt_nhanh="So với 1 và với một nửa trước — nhiều phân số phân loại được ngay.",
        tuong_tu=("Sắp xếp từ bé đến lớn: 3 phần 8, 5 phần 8, 1 phần 8",
                  "1 phần 8 < 3 phần 8 < 5 phần 8"),
        mo_rong="Trộn thêm số thập phân vào dãy để sắp thứ tự chung.",
        chuan_bi="Rút gọn phân số và quy đồng mẫu số.")


@dang_ky("H4-M5-11", "H", "M5", lop=(4, 5), tu_khoa=("phân số", "nâng cao", "dãy phân số",
                                                     "quy luật"),
         dang_bai=("Dãy phân số có quy luật",))
def h4_m5_11(rng, lop):
    n = rng.randint(5, 12)
    ds = [Fraction(i, i + 1) for i in range(1, n + 1)]
    y = [("Viết bốn phân số đầu của dãy.", " · ".join(ps(f) for f in ds[:4])),
         (f"Phân số thứ {sv(n)} của dãy là phân số nào?", ps(ds[n - 1])),
         ("Các phân số của dãy này lớn hơn hay bé hơn 1?", "đều bé hơn 1"),
         ("Dãy này tăng dần hay giảm dần?", "tăng dần"),
         ("Vì sao dãy tăng dần?",
          "vì phần bù tới 1 là 1 phần (n + 1) càng lúc càng bé"),
         (f"Phân số thứ {sv(n)} còn thiếu bao nhiêu nữa thì bằng 1?", ps(1 - ds[n - 1]))]
    return Bai(
        tieu_de="Dãy phân số dạng n phần (n + 1)",
        dan="Quan sát phần bù tới 1 để so sánh.",
        y=y,
        giai_mau=[f"Bốn phân số đầu: {' · '.join(ps(f) for f in ds[:4])}.",
                  f"Phân số thứ n có tử là n và mẫu là n + 1.",
                  f"Phân số thứ {sv(n)} là {ps(ds[n - 1])}.",
                  f"Mỗi phân số còn thiếu đúng 1 phần (n + 1) nữa thì bằng 1.",
                  f"Phần thiếu ấy càng lúc càng bé, nên dãy **tăng dần**.",
                  f"Đáp số ý b: **{ps(ds[n - 1])}**."],
        huong_giai="Phân số dạng n phần (n + 1) luôn bé hơn 1 và còn thiếu đúng 1 phần "
                   "(n + 1) nữa thì bằng 1. Phần thiếu càng bé thì phân số càng lớn — đó "
                   "là kỹ thuật **so sánh bằng phần bù**.",
        td=["TD6", "TD5"],
        diem_chot="Phần bù **bé hơn** nghĩa là phân số **lớn hơn**.",
        loi="So phần bù rồi kết luận cùng chiều với phần bù.",
        phong="Nghĩ tới chiếc bánh: thiếu ít hơn thì phần đang có nhiều hơn.",
        goi_y=("Mỗi phân số còn thiếu bao nhiêu nữa thì bằng 1?",
               "Phần thiếu ấy thay đổi thế nào khi n tăng?",
               "Thiếu ít hơn thì phân số lớn hơn."),
        pt_dang="Dãy phân số, so sánh bằng phần bù",
        pt_kien_thuc="Phần bù tới 1; quy luật dãy phân số",
        pt_du_lieu="Tử và mẫu hơn kém nhau đúng 1 đơn vị",
        pt_phuong_phap="Xét phần bù tới 1 rồi so sánh",
        pt_nhanh="n phần (n + 1) càng có n lớn thì càng gần 1, tức càng lớn.",
        tuong_tu=("So sánh 5 phần 6 và 7 phần 8.", "5 phần 6 < 7 phần 8"),
        mo_rong="Dãy 1 phần 2, 2 phần 3, 3 phần 4 … nhân tất cả lại bằng bao nhiêu?",
        chuan_bi="So sánh phân số và phép trừ phân số.",
        bay="Chiều của phần bù")


# ═══════════════════ LỚP 3 — làm dày mức M5 ═══════════════════

@dang_ky("A3-M5-11", "A", "M5", lop=(3,), tu_khoa=("cấu tạo số", "nâng cao", "tìm số"),
         dang_bai=("Bài toán cấu tạo số nâng cao lớp 3",))
def a3_m5_11(rng, lop):
    a = rng.randint(1, 9)
    b = rng.randint(0, 9)
    so = a * 10 + b
    them = rng.randint(1, 9)
    y = [(f"Số có hai chữ số {sv(so)}: viết thêm chữ số {sv(them)} vào bên **phải** thì "
          f"được số nào?", sv(so * 10 + them)),
         (f"Số mới hơn số cũ bao nhiêu đơn vị?", sv(so * 10 + them - so)),
         (f"Viết thêm chữ số {sv(them)} vào bên **trái** thì được số nào?",
          sv(them * 100 + so)),
         (f"Số mới khi thêm bên trái hơn số cũ bao nhiêu đơn vị?", sv(them * 100)),
         ("Thêm bên trái hay bên phải làm số tăng nhiều hơn? Vì sao?",
          "tuỳ theo chữ số thêm vào; thêm bên phải làm số cũ gấp 10 lần rồi cộng thêm"),
         (f"Xoá chữ số hàng đơn vị của {sv(so)} thì được số nào?", sv(a))]
    return Bai(
        tieu_de="Thêm, bớt chữ số vào một số",
        dan="Viết cả số cũ và số mới ra rồi so sánh.",
        y=y,
        giai_mau=[f"Viết thêm một chữ số vào **bên phải** là nhân số cũ với 10 rồi cộng "
                  f"chữ số ấy.",
                  f"{sv(so)} × 10 + {sv(them)} = {sv(so * 10 + them)}.",
                  f"Số mới hơn số cũ: {sv(so * 10 + them)} − {sv(so)} = "
                  f"{sv(so * 10 + them - so)}.",
                  f"Viết thêm vào **bên trái** một số có hai chữ số là cộng thêm "
                  f"chữ số ấy nhân 100: {sv(them)} × 100 + {sv(so)} = {sv(them * 100 + so)}.",
                  f"Đáp số ý a: **{sv(so * 10 + them)}**."],
        huong_giai="Thêm chữ số vào bên phải là **nhân 10 rồi cộng**; thêm vào bên trái là "
                   "**cộng thêm** chữ số ấy nhân giá trị hàng mới. Xoá chữ số hàng đơn vị "
                   "là chia cho 10 lấy phần nguyên.",
        td=["TD3", "TD2", "TD5"],
        diem_chot="Bên phải thì **nhân 10**, bên trái thì **cộng thêm**.",
        loi="Nhầm “thêm bên trái” thành “thêm bên phải”.",
        phong="Viết cả hai số ra giấy rồi mới so sánh.",
        goi_y=("Viết số mới ra bên cạnh số cũ.",
               "Thêm bên phải thì số cũ bị nhân với mấy?",
               "Thêm bên trái thì cộng thêm bao nhiêu?"),
        pt_dang="Thêm, bớt chữ số",
        pt_kien_thuc="Cấu tạo thập phân của số tự nhiên",
        pt_du_lieu="“Viết thêm chữ số … vào bên trái / bên phải”",
        pt_phuong_phap="Viết cả hai số theo cấu tạo rồi lấy hiệu",
        pt_nhanh="Thêm một chữ số vào bên phải thì số mới bằng số cũ nhân 10 cộng chữ số ấy.",
        tuong_tu=("Viết thêm chữ số 5 vào bên phải số 34 thì được số nào?", "345"),
        mo_rong="Thêm chữ số vào giữa hai chữ số của số có hai chữ số.",
        chuan_bi="Cấu tạo số có hai, ba chữ số.",
        bay="Bên trái hay bên phải")


@dang_ky("D3-M5-11", "D", "M5", lop=(3,), tu_khoa=("toán điển hình", "nâng cao", "tổng ôn"),
         dang_bai=("Tổng ôn toán điển hình lớp 3",), thuc_te=True)
def d3_m5_11(rng, lop):
    a = rng.randint(8, 50)
    k = rng.randint(2, 4)
    b = a * k
    them = rng.randint(3, 20)
    t1, t2 = rng.sample(TO_DOI, 2)
    y = [(f"{hoa(t1)} có {sv(a)} lá cờ, {t2} có gấp {sv(k)} lần {t1}. "
          f"{hoa(t2)} có bao nhiêu lá cờ?", sv(b)),
         ("Cả hai tổ có bao nhiêu lá cờ?", sv(a + b)),
         (f"{hoa(t2)} nhiều hơn {t1} bao nhiêu lá cờ?", sv(b - a)),
         (f"Nếu {t1} được cho thêm {sv(them)} lá cờ thì {t1} có bao nhiêu lá?",
          sv(a + them)),
         (f"Khi đó {t2} còn nhiều hơn {t1} bao nhiêu lá?", sv(b - a - them)
          if b - a - them >= 0 else f"{t1} nhiều hơn {sv(a + them - b)} lá"),
         (f"Phải cho {t1} thêm bao nhiêu lá nữa thì hai tổ bằng nhau?", sv(b - a))]
    return Bai(
        tieu_de="Tổng ôn toán điển hình — gấp, kém, nhiều hơn, ít hơn",
        dan="Mỗi ý một phép tính, trả lời gọn.",
        y=y,
        giai_mau=[f"Bước 1 — số cờ của {t2}: {sv(a)} × {sv(k)} = {sv(b)} (lá).",
                  f"Bước 2 — cả hai tổ: {sv(a)} + {sv(b)} = {sv(a + b)} (lá).",
                  f"Bước 3 — {t2} nhiều hơn: {sv(b)} − {sv(a)} = {sv(b - a)} (lá).",
                  f"Bước 4 — muốn hai tổ bằng nhau thì cho {t1} thêm đúng phần hơn ấy, "
                  f"tức {sv(b - a)} lá.",
                  f"Đáp số ý a: **{sv(b)} lá cờ**."],
        huong_giai="Bốn quan hệ quen: gấp lần thì nhân, kém lần thì chia, nhiều hơn thì "
                   "cộng, ít hơn thì trừ. Muốn hai bên bằng nhau bằng cách **chỉ thêm cho "
                   "một bên** thì thêm đúng phần hơn.",
        td=["TD2", "TD3", "TD5"],
        diem_chot="Chỉ thêm cho một bên thì thêm **đúng phần hơn**; nếu chuyển qua lại thì "
                  "chỉ chuyển **nửa phần hơn**.",
        loi="Nhầm hai tình huống: cho thêm và chuyển qua lại.",
        phong="Hỏi lại: tổng có đổi không? Cho thêm thì tổng đổi, chuyển thì tổng không đổi.",
        goi_y=("Tổ thứ hai có bao nhiêu lá cờ?",
               "Tổ thứ hai nhiều hơn tổ thứ nhất bao nhiêu?",
               "Cho thêm cho một bên thì thêm đúng phần hơn."),
        pt_dang="Toán điển hình: gấp, kém, nhiều hơn, ít hơn",
        pt_kien_thuc="Bốn quan hệ cơ bản; phép cộng, trừ, nhân, chia",
        pt_du_lieu="“Gấp … lần”, “nhiều hơn”, “cho thêm”, “để bằng nhau”",
        pt_phuong_phap="Tính từng bước, bám vào tổng có đổi hay không",
        pt_nhanh="Cho thêm: thêm đúng hiệu. Chuyển qua lại: chuyển nửa hiệu.",
        tuong_tu=("Tổ Một 12 lá, tổ Hai gấp 3 lần. Tổ Hai nhiều hơn bao nhiêu lá?",
                  "24 lá"),
        mo_rong="Ba tổ, mỗi tổ gấp đôi tổ trước — tính tổng và các hiệu.",
        chuan_bi="Bốn phép tính và bài toán giải bằng hai phép tính.",
        bay="Cho thêm khác với chuyển qua lại")


@dang_ky("G3-M5-11", "G", "M5", lop=(3,), tu_khoa=("suy luận", "nâng cao", "logic"),
         dang_bai=("Suy luận logic nâng cao lớp 3",))
def g3_m5_11(rng, lop):
    a, b, c = rng.sample(TEN, 3)
    n = rng.randint(4, 9)
    y = [(f"{a} cao hơn {b}, {b} cao hơn {c}. Ai cao nhất?", a),
         (f"Ai thấp nhất?", c),
         (f"Xếp ba bạn theo thứ tự từ thấp đến cao.", f"{c}, {b}, {a}"),
         (f"Có {sv(n)} bạn xếp thành một hàng dọc. {a} đứng thứ {sv(3)} từ đầu hàng. "
          f"Hỏi {a} đứng thứ mấy từ cuối hàng?", sv(n - 2)),
         (f"Trước {a} có mấy bạn?", "2 bạn"),
         (f"Sau {a} có mấy bạn?", sv(n - 3) + " bạn"),
         (f"Số bạn đứng trước cộng số bạn đứng sau cộng chính {a} bằng bao nhiêu?", sv(n))]
    return Bai(
        tieu_de="Suy luận thứ tự và vị trí trong hàng",
        dan="Vẽ một hàng ô ra nháp rồi đánh dấu vị trí.",
        y=y,
        giai_mau=[f"Vẽ {sv(n)} ô liền nhau tượng trưng cho {sv(n)} bạn.",
                  f"{a} đứng thứ 3 từ đầu, nên trước {a} có 2 bạn.",
                  f"Sau {a} còn {sv(n)} − 3 = {sv(n - 3)} bạn.",
                  f"Tính từ cuối hàng, {a} đứng thứ {sv(n - 3)} + 1 = {sv(n - 2)}.",
                  f"Kiểm tra: 2 + 1 + {sv(n - 3)} = {sv(n)} ✓",
                  f"Đáp số ý d: **thứ {sv(n - 2)} từ cuối**."],
        huong_giai="Vẽ hàng ô rồi đánh dấu. Với vị trí trong hàng: số bạn đứng trước + "
                   "chính mình + số bạn đứng sau = tổng số bạn. Đó cũng là cách tự kiểm tra.",
        td=["TD2", "TD6"],
        diem_chot="Đừng quên **đếm cả chính mình** khi cộng lại.",
        loi="Lấy tổng số bạn trừ thứ tự từ đầu rồi ghi luôn, quên cộng 1.",
        phong="Vẽ hàng ô và đếm thử với 5 bạn trước khi làm với số lớn.",
        goi_y=("Trước bạn ấy có mấy người?", "Sau bạn ấy có mấy người?",
               "Cộng cả chính bạn ấy vào xem có bằng tổng số bạn không."),
        pt_dang="Suy luận thứ tự, vị trí trong hàng",
        pt_kien_thuc="Đếm vị trí, quan hệ trước – sau",
        pt_du_lieu="“Đứng thứ … từ đầu”, “cao hơn”, “thấp hơn”",
        pt_phuong_phap="Vẽ hàng ô, đánh dấu, cộng kiểm tra",
        pt_nhanh="Thứ tự từ đầu + thứ tự từ cuối = tổng số người + 1.",
        tuong_tu=("Hàng có 7 bạn, An đứng thứ 3 từ đầu. An đứng thứ mấy từ cuối?", "thứ 5"),
        mo_rong="Hai bạn đứng cách nhau mấy người — đếm khoảng thay vì đếm người.",
        chuan_bi="Đếm và cộng, trừ trong phạm vi 100.",
        bay="Nhớ đếm cả chính mình")
