# -*- coding: utf-8 -*-
"""Thư viện mẫu bài — NHÓM F: Hình học."""
from __future__ import annotations

from fractions import Fraction

from .khung import Bai, dang_ky, luan_phien, sv

PI = Fraction(314, 100)


def so_dep(f: Fraction) -> str:
    """Viết một phân số ra dạng số tự nhiên hoặc số thập phân gọn."""
    if f.denominator == 1:
        return sv(f.numerator)
    return sv(round(float(f), 4))


def tam_giac_trong(n: int) -> int:
    """Số tam giác đếm được khi chia một tam giác lớn bởi n đường kẻ từ một đỉnh."""
    k = n + 1                       # số tam giác nhỏ
    return k * (k + 1) // 2


# ══════════════════════════════════ MỨC M1 ══════════════════════════════════

@dang_ky("F-M1-01", "F", "M1", tu_khoa=("chu vi", "diện tích", "hình chữ nhật"))
def f_m1_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["cv_cn", "dt_cn", "cv_v", "dt_v"], rng.randint(4, 8)):
        a = rng.randint(4, 60)
        b = rng.randint(3, a - 1) if a > 4 else 3
        if kieu == "cv_cn":
            y.append((f"Hình chữ nhật có chiều dài {sv(a)} cm, chiều rộng {sv(b)} cm. "
                      f"Tính chu vi.", sv((a + b) * 2) + " cm"))
        elif kieu == "dt_cn":
            y.append((f"Hình chữ nhật có chiều dài {sv(a)} cm, chiều rộng {sv(b)} cm. "
                      f"Tính diện tích.", sv(a * b) + " cm²"))
        elif kieu == "cv_v":
            y.append((f"Hình vuông có cạnh {sv(a)} cm. Tính chu vi.", sv(a * 4) + " cm"))
        else:
            y.append((f"Hình vuông có cạnh {sv(a)} cm. Tính diện tích.",
                      sv(a * a) + " cm²"))
    return Bai(
        tieu_de="Chu vi và diện tích hình chữ nhật, hình vuông",
        dan="Tính theo yêu cầu, ghi rõ đơn vị.",
        y=y,
        huong_giai="Chu vi hình chữ nhật = (dài + rộng) × 2. Diện tích hình chữ nhật = "
                   "dài × rộng. Chu vi hình vuông = cạnh × 4. Diện tích hình vuông = "
                   "cạnh × cạnh.",
        td=["TD1", "TD3"],
        diem_chot="Chu vi ghi đơn vị **cm**, diện tích ghi đơn vị **cm²** — sai đơn vị là mất điểm.",
        loi="Nhầm công thức chu vi với diện tích; quên nhân 2 ở chu vi.",
        phong="Vẽ hình và ghi số đo lên hình trước khi tính.",
        goi_y=("Đề hỏi chu vi hay diện tích?",
               "Viết công thức tương ứng ra trước.",
               "Ghi đơn vị đúng loại: cm cho chu vi, cm² cho diện tích."),
        pt_dang="Chu vi, diện tích hình cơ bản",
        pt_kien_thuc="Công thức chu vi, diện tích hình chữ nhật và hình vuông",
        pt_du_lieu="Cho chiều dài, chiều rộng hoặc cạnh",
        pt_phuong_phap="Chọn đúng công thức, ghi đúng đơn vị",
        pt_nhanh="Hình vuông là hình chữ nhật có dài bằng rộng — chỉ cần nhớ một bộ công thức.",
        tuong_tu=("Hình chữ nhật dài 8 cm, rộng 5 cm. Tính diện tích.", "40 cm²"),
        chu_y="Đơn vị của diện tích",
    )


@dang_ky("F-M1-02", "F", "M1", tu_khoa=("nhận dạng hình", "đếm hình"))
def f_m1_02(rng, lop):
    m = rng.randint(2, 5)
    n = rng.randint(2, 5)
    hcn = m * (m + 1) // 2 * (n * (n + 1) // 2)
    vuong = sum((m - k) * (n - k) for k in range(min(m, n)))
    y = [(f"Lưới ô vuông gồm {sv(m)} hàng và {sv(n)} cột ô vuông nhỏ. "
          f"Có tất cả bao nhiêu ô vuông nhỏ?", sv(m * n)),
         ("Có bao nhiêu hình chữ nhật (kể cả hình vuông) trong lưới đó?", sv(hcn)),
         ("Có bao nhiêu hình vuông trong lưới đó?", sv(vuong)),
         (f"Nếu mỗi ô vuông nhỏ có cạnh 1 cm thì chu vi cả lưới bằng bao nhiêu?",
          sv((m + n) * 2) + " cm"),
         ("Diện tích cả lưới bằng bao nhiêu?", sv(m * n) + " cm²")]
    return Bai(
        tieu_de="Đếm hình trong lưới ô vuông",
        dan="Đếm có hệ thống, không đếm mò.",
        y=y,
        huong_giai="Một hình chữ nhật trong lưới được xác định bởi hai đường kẻ ngang và "
                   "hai đường kẻ dọc. Lưới m hàng có m + 1 đường ngang, n cột có n + 1 "
                   "đường dọc, nên số hình chữ nhật bằng số cách chọn hai đường ngang nhân "
                   "số cách chọn hai đường dọc. Đếm hình vuông thì đếm theo từng cỡ cạnh.",
        td=["TD3", "TD4"],
        diem_chot="Đếm **theo cỡ** hoặc **theo đường kẻ**, tuyệt đối không đếm ngẫu nhiên.",
        loi="Chỉ đếm các ô vuông nhỏ, quên các hình ghép từ nhiều ô.",
        phong="Kẻ bảng theo cỡ hình: cỡ 1×1, 1×2, 2×2… rồi cộng.",
        goi_y=("Lưới có bao nhiêu đường kẻ ngang, bao nhiêu đường kẻ dọc?",
               "Chọn hai đường ngang và hai đường dọc thì được một hình chữ nhật.",
               "Đếm hình vuông theo từng cỡ cạnh 1, 2, 3…"),
        pt_dang="Đếm hình trong lưới",
        pt_kien_thuc="Quy tắc đếm, tổ hợp đơn giản",
        pt_du_lieu="Hình vẽ là lưới ô vuông đều",
        pt_phuong_phap="Đếm theo đường kẻ hoặc theo cỡ hình",
        pt_nhanh="Số cách chọn 2 trong k đường kẻ là k × (k − 1) : 2.",
        tuong_tu=("Lưới 2 hàng 2 cột có bao nhiêu hình vuông?", "5"),
        chu_y="Bỏ sót các hình ghép nhiều ô",
    )


@dang_ky("F-M1-03", "F", "M1", lop=(4, 5), tu_khoa=("chu vi", "tìm cạnh"))
def f_m1_03(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["tim_rong", "tim_dai", "tim_canh"], rng.randint(4, 7)):
        a = rng.randint(6, 60)
        b = rng.randint(3, a - 1)
        if kieu == "tim_rong":
            y.append((f"Hình chữ nhật có chu vi {sv((a + b) * 2)} cm, chiều dài {sv(a)} cm. "
                      f"Tính chiều rộng.", sv(b) + " cm"))
        elif kieu == "tim_dai":
            y.append((f"Hình chữ nhật có diện tích {sv(a * b)} cm², chiều rộng {sv(b)} cm. "
                      f"Tính chiều dài.", sv(a) + " cm"))
        else:
            y.append((f"Hình vuông có chu vi {sv(a * 4)} cm. Tính cạnh và diện tích.",
                      f"cạnh {sv(a)} cm, diện tích {sv(a * a)} cm²"))
    return Bai(
        tieu_de="Tìm kích thước khi biết chu vi hoặc diện tích",
        dan="Làm ngược từ công thức.",
        y=y,
        huong_giai="Từ chu vi hình chữ nhật, chia đôi được nửa chu vi (chính là dài + rộng), "
                   "rồi trừ đi chiều đã biết. Từ diện tích, chia cho một chiều được chiều kia. "
                   "Từ chu vi hình vuông, chia 4 được cạnh.",
        td=["TD3", "TD2"],
        diem_chot="Chia chu vi cho **2** ra nửa chu vi — bước trung gian không được bỏ.",
        loi="Trừ thẳng chiều dài khỏi chu vi mà chưa chia đôi.",
        phong="Viết dòng “Nửa chu vi = …” trước khi trừ.",
        goi_y=("Nửa chu vi bằng bao nhiêu?",
               "Nửa chu vi chính là tổng chiều dài và chiều rộng.",
               "Trừ đi chiều đã biết để ra chiều còn lại."),
        pt_dang="Tìm kích thước từ chu vi, diện tích",
        pt_kien_thuc="Công thức chu vi, diện tích; phép tính ngược",
        pt_du_lieu="Cho chu vi hoặc diện tích và một kích thước",
        pt_phuong_phap="Đi ngược công thức, qua bước nửa chu vi",
        pt_nhanh="Nửa chu vi = chu vi : 2 — luôn tính bước này đầu tiên.",
        tuong_tu=("Hình chữ nhật chu vi 30 cm, dài 10 cm. Chiều rộng bằng bao nhiêu?",
                  "5 cm"),
        chu_y="Quên chia đôi chu vi",
    )


# ══════════════════════════════════ MỨC M2 ══════════════════════════════════

@dang_ky("F-M2-01", "F", "M2", lop=(4, 5), tu_khoa=("hình bình hành", "hình thoi", "diện tích"))
def f_m2_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["bh", "thoi", "tam_giac"], rng.randint(4, 7)):
        a = rng.randint(4, 40)
        h = rng.randint(3, 30)
        d1 = rng.randrange(4, 40, 2)
        d2 = rng.randrange(4, 40, 2)
        if kieu == "bh":
            y.append((f"Hình bình hành có đáy {sv(a)} cm, chiều cao {sv(h)} cm. "
                      f"Tính diện tích.", sv(a * h) + " cm²"))
        elif kieu == "thoi":
            y.append((f"Hình thoi có hai đường chéo dài {sv(d1)} cm và {sv(d2)} cm. "
                      f"Tính diện tích.", sv(d1 * d2 // 2) + " cm²"))
        else:
            if a * h % 2:
                h += 1
            y.append((f"Hình tam giác có đáy {sv(a)} cm, chiều cao {sv(h)} cm. "
                      f"Tính diện tích.", sv(a * h // 2) + " cm²"))
    return Bai(
        tieu_de="Diện tích hình bình hành, hình thoi, hình tam giác",
        dan="Áp dụng đúng công thức từng hình.",
        y=y,
        huong_giai="Hình bình hành: S = đáy × chiều cao. Hình thoi: S = tích hai đường "
                   "chéo chia 2. Hình tam giác: S = đáy × chiều cao chia 2.",
        td=["TD1", "TD3"],
        diem_chot="Hình bình hành **không** chia 2; hình tam giác và hình thoi **có** chia 2.",
        loi="Chia 2 cho hình bình hành, hoặc quên chia 2 cho hình tam giác.",
        phong="Nhớ theo cặp: bình hành ↔ chữ nhật (không chia); tam giác ↔ nửa bình hành (chia 2).",
        goi_y=("Đây là hình gì?",
               "Viết công thức diện tích của hình đó.",
               "Kiểm tra xem công thức có chia 2 không."),
        pt_dang="Diện tích các hình phẳng cơ bản",
        pt_kien_thuc="Công thức diện tích hình bình hành, hình thoi, hình tam giác",
        pt_du_lieu="Đề cho đáy và chiều cao, hoặc hai đường chéo",
        pt_phuong_phap="Nhận dạng hình rồi chọn công thức",
        pt_nhanh="Tam giác bằng nửa hình bình hành cùng đáy cùng chiều cao.",
        tuong_tu=("Tam giác đáy 10 cm, cao 6 cm. Diện tích bằng bao nhiêu?", "30 cm²"),
        bay="Chia 2 hay không chia 2",
    )


@dang_ky("F-M2-02", "F", "M2", lop=(4, 5), tu_khoa=("chu vi diện tích", "lời văn"), thuc_te=True)
def f_m2_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(10, 80)
        b = rng.randint(5, a - 1)
        kieu = rng.choice(["rao", "lat_gach", "trong_cay"])
        if kieu == "rao":
            y.append((f"Một mảnh vườn hình chữ nhật dài {sv(a)} m, rộng {sv(b)} m. "
                      f"Người ta rào xung quanh mảnh vườn. Hỏi cần bao nhiêu mét rào?",
                      sv((a + b) * 2) + " m"))
        elif kieu == "lat_gach":
            canh = rng.choice([2, 4, 5])
            dt = a * b
            y.append((f"Một nền nhà hình chữ nhật dài {sv(a)} dm, rộng {sv(b)} dm, "
                      f"lát bằng gạch vuông cạnh {sv(canh)} dm. Hỏi cần bao nhiêu viên gạch?",
                      sv(dt // (canh * canh)) + " viên"
                      if dt % (canh * canh) == 0
                      else sv(dt // (canh * canh) + 1) + " viên (làm tròn lên)"))
        else:
            kc = rng.choice([2, 4, 5])
            cv = (a + b) * 2
            y.append((f"Một mảnh đất hình chữ nhật dài {sv(a)} m, rộng {sv(b)} m. "
                      f"Người ta trồng cây quanh mảnh đất, hai cây liền nhau cách nhau "
                      f"{sv(kc)} m. Hỏi cần bao nhiêu cây?",
                      sv(cv // kc) + " cây" if cv % kc == 0
                      else f"không chia hết ({sv(cv)} m không chia hết cho {sv(kc)} m)"))
    return Bai(
        tieu_de="Bài toán thực tế về chu vi và diện tích",
        dan="Đọc kĩ xem bài hỏi chu vi hay diện tích.",
        y=y,
        huong_giai="Rào xung quanh, trồng cây quanh mảnh đất là bài toán **chu vi**. "
                   "Lát gạch, trải thảm, gieo hạt khắp mặt đất là bài toán **diện tích**. "
                   "Số viên gạch = diện tích nền : diện tích một viên.",
        td=["TD2", "TD3"],
        diem_chot="“Xung quanh” → chu vi; “khắp mặt” → diện tích.",
        loi="Lấy chu vi để tính số gạch lát nền.",
        phong="Gạch chân từ khoá chỉ vị trí: xung quanh, bao quanh, khắp, phủ kín.",
        goi_y=("Việc cần làm diễn ra ở viền hay ở mặt trong?",
               "Ở viền thì tính chu vi, ở mặt trong thì tính diện tích.",
               "Chia cho kích thước của một đơn vị (một viên gạch, một khoảng cây)."),
        pt_dang="Chu vi, diện tích trong tình huống thực tế",
        pt_kien_thuc="Công thức chu vi, diện tích; phép chia",
        pt_du_lieu="Từ khoá “rào xung quanh”, “lát gạch”, “trồng cây quanh”",
        pt_phuong_phap="Đọc vị chu vi hay diện tích rồi tính",
        pt_nhanh="Nhìn đơn vị của đáp số: mét thì là chu vi, mét vuông thì là diện tích.",
        tuong_tu=("Vườn dài 20 m rộng 10 m, rào xung quanh cần bao nhiêu mét rào?", "60 m"),
        bay="Chu vi hay diện tích",
    )


@dang_ky("F-M2-03", "F", "M2", lop=(5,), tu_khoa=("hình thang", "diện tích"))
def f_m2_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(4, 40)
        b = rng.randint(4, 40)
        h = rng.randint(3, 30)
        if (a + b) * h % 2:
            h += 1
        y.append((f"Hình thang có đáy lớn {sv(max(a, b))} cm, đáy bé {sv(min(a, b))} cm, "
                  f"chiều cao {sv(h)} cm. Tính diện tích.", sv((a + b) * h // 2) + " cm²"))
    return Bai(
        tieu_de="Diện tích hình thang",
        dan="Áp dụng công thức, ghi rõ đơn vị.",
        y=y,
        huong_giai="Diện tích hình thang = (đáy lớn + đáy bé) × chiều cao : 2. "
                   "Cách nhớ: ghép hai hình thang bằng nhau thành một hình bình hành có "
                   "đáy bằng tổng hai đáy, nên phải chia đôi.",
        td=["TD1", "TD3"],
        diem_chot="Cộng **hai đáy** trước rồi mới nhân chiều cao và chia 2.",
        loi="Nhân riêng từng đáy với chiều cao rồi cộng, quên chia 2.",
        phong="Viết công thức đầy đủ ra trước khi thay số.",
        goi_y=("Tổng hai đáy bằng bao nhiêu?",
               "Nhân tổng đó với chiều cao.",
               "Chia kết quả cho 2."),
        pt_dang="Diện tích hình thang",
        pt_kien_thuc="Công thức diện tích hình thang",
        pt_du_lieu="Đề cho hai đáy và chiều cao",
        pt_phuong_phap="Tổng hai đáy × chiều cao : 2",
        pt_nhanh="Nếu tổng hai đáy là số chẵn thì chia 2 ngay từ đầu cho gọn.",
        tuong_tu=("Hình thang đáy 12 cm và 8 cm, cao 5 cm. Diện tích bằng bao nhiêu?",
                  "50 cm²"),
    )


# ══════════════════════════════════ MỨC M3 ══════════════════════════════════

@dang_ky("F-M3-01", "F", "M3", lop=(5,), tu_khoa=("hình tròn", "chu vi", "diện tích"))
def f_m3_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["cv_r", "cv_d", "dt_r", "tim_r"], rng.randint(4, 7)):
        r = rng.randint(2, 30)
        d = 2 * r
        cv = PI * d
        dt = PI * r * r
        if kieu == "cv_r":
            y.append((f"Hình tròn có bán kính {sv(r)} cm. Tính chu vi (lấy π = 3,14).",
                      so_dep(cv) + " cm"))
        elif kieu == "cv_d":
            y.append((f"Hình tròn có đường kính {sv(d)} cm. Tính chu vi (lấy π = 3,14).",
                      so_dep(cv) + " cm"))
        elif kieu == "dt_r":
            y.append((f"Hình tròn có bán kính {sv(r)} cm. Tính diện tích (lấy π = 3,14).",
                      so_dep(dt) + " cm²"))
        else:
            y.append((f"Hình tròn có đường kính {sv(d)} cm. Bán kính bằng bao nhiêu?",
                      sv(r) + " cm"))
    return Bai(
        tieu_de="Chu vi và diện tích hình tròn",
        dan="Lấy π = 3,14. Ghi rõ đơn vị.",
        y=y,
        huong_giai="Chu vi hình tròn = đường kính × 3,14 = bán kính × 2 × 3,14. "
                   "Diện tích hình tròn = bán kính × bán kính × 3,14. Đường kính gấp đôi "
                   "bán kính.",
        td=["TD1", "TD3"],
        diem_chot="Chu vi dùng **đường kính**, diện tích dùng **bán kính nhân bán kính**.",
        loi="Lấy đường kính nhân đường kính khi tính diện tích.",
        phong="Ghi rõ r = … và d = … lên hình trước khi thay số.",
        goi_y=("Đề cho bán kính hay đường kính?",
               "Chu vi dùng đường kính; diện tích dùng bán kính.",
               "Nhân với 3,14 ở bước cuối."),
        pt_dang="Chu vi, diện tích hình tròn",
        pt_kien_thuc="Công thức hình tròn",
        pt_du_lieu="Đề cho bán kính hoặc đường kính",
        pt_phuong_phap="Quy về bán kính, chọn đúng công thức",
        pt_nhanh="Diện tích luôn có đơn vị mũ hai — nếu đáp số ghi cm là chắc chắn nhầm.",
        tuong_tu=("Hình tròn bán kính 5 cm. Tính diện tích.", "78,5 cm²"),
        bay="Đường kính hay bán kính",
    )


@dang_ky("F-M3-02", "F", "M3", lop=(5,), tu_khoa=("hình hộp chữ nhật", "thể tích", "diện tích xung quanh"))
def f_m3_02(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["v", "sxq", "stp", "v_lp"], rng.randint(4, 7)):
        a = rng.randint(3, 20)
        b = rng.randint(2, 20)
        c = rng.randint(2, 15)
        if kieu == "v":
            y.append((f"Hình hộp chữ nhật có ba kích thước {sv(a)} cm, {sv(b)} cm, "
                      f"{sv(c)} cm. Tính thể tích.", sv(a * b * c) + " cm³"))
        elif kieu == "sxq":
            y.append((f"Hình hộp chữ nhật có đáy {sv(a)} cm × {sv(b)} cm, chiều cao "
                      f"{sv(c)} cm. Tính diện tích xung quanh.",
                      sv((a + b) * 2 * c) + " cm²"))
        elif kieu == "stp":
            y.append((f"Hình hộp chữ nhật có đáy {sv(a)} cm × {sv(b)} cm, chiều cao "
                      f"{sv(c)} cm. Tính diện tích toàn phần.",
                      sv((a + b) * 2 * c + 2 * a * b) + " cm²"))
        else:
            y.append((f"Hình lập phương có cạnh {sv(a)} cm. Tính thể tích và diện tích "
                      f"toàn phần.", f"thể tích {sv(a ** 3)} cm³, "
                                     f"diện tích toàn phần {sv(6 * a * a)} cm²"))
    return Bai(
        tieu_de="Hình hộp chữ nhật và hình lập phương",
        dan="Ghi rõ đơn vị: cm² cho diện tích, cm³ cho thể tích.",
        y=y,
        huong_giai="Thể tích hình hộp chữ nhật = dài × rộng × cao. Diện tích xung quanh = "
                   "chu vi đáy × chiều cao. Diện tích toàn phần = diện tích xung quanh + "
                   "2 lần diện tích đáy. Hình lập phương là hình hộp có ba kích thước bằng nhau.",
        td=["TD1", "TD3"],
        diem_chot="Diện tích **xung quanh** không tính hai mặt đáy; **toàn phần** thì có.",
        loi="Cộng thiếu một mặt đáy khi tính diện tích toàn phần.",
        phong="Đếm đủ 6 mặt của hình hộp trước khi cộng.",
        goi_y=("Chu vi đáy bằng bao nhiêu?",
               "Diện tích xung quanh = chu vi đáy × chiều cao.",
               "Toàn phần thì cộng thêm hai mặt đáy."),
        pt_dang="Hình hộp chữ nhật, hình lập phương",
        pt_kien_thuc="Công thức thể tích, diện tích xung quanh, toàn phần",
        pt_du_lieu="Đề cho ba kích thước hoặc cạnh hình lập phương",
        pt_phuong_phap="Xác định loại diện tích cần tính, đếm đủ số mặt",
        pt_nhanh="Hình lập phương cạnh a: toàn phần 6 × a × a, thể tích a × a × a.",
        tuong_tu=("Hình lập phương cạnh 4 cm. Thể tích bằng bao nhiêu?", "64 cm³"),
        bay="Xung quanh hay toàn phần",
    )


@dang_ky("F-M3-03", "F", "M3", lop=(4, 5), tu_khoa=("đếm hình", "tam giác"))
def f_m3_03(rng, lop):
    n = rng.randint(2, 6)
    tg = tam_giac_trong(n)
    m = rng.randint(2, 5)
    y = [(f"Từ một đỉnh của tam giác lớn kẻ {sv(n)} đoạn thẳng tới cạnh đối diện. "
          f"Có tất cả bao nhiêu tam giác trong hình?", sv(tg)),
         (f"Trong đó có bao nhiêu tam giác nhỏ nhất (không bị chia tiếp)?", sv(n + 1)),
         (f"Trên một đường thẳng lấy {sv(m + 1)} điểm phân biệt. "
          f"Có bao nhiêu đoạn thẳng được tạo thành?", sv((m + 1) * m // 2)),
         (f"Nếu lấy thêm một điểm nữa trên đường thẳng đó thì có thêm bao nhiêu đoạn thẳng?",
          sv(m + 1)),
         (f"Với {sv(m + 2)} điểm thì có tất cả bao nhiêu đoạn thẳng?",
          sv((m + 2) * (m + 1) // 2))]
    return Bai(
        tieu_de="Đếm tam giác và đoạn thẳng",
        dan="Đếm có hệ thống, nêu cách đếm.",
        y=y,
        huong_giai="Kẻ n đoạn thẳng từ một đỉnh chia cạnh đối diện thành n + 1 phần, tạo "
                   "ra n + 1 tam giác nhỏ. Mỗi tam giác trong hình ứng với việc chọn hai "
                   "trong n + 2 điểm trên cạnh đối diện, nên số tam giác = (n + 2) × (n + 1) : 2. "
                   "Tương tự, k điểm trên một đường thẳng cho k × (k − 1) : 2 đoạn thẳng.",
        td=["TD4", "TD3"],
        diem_chot="Mọi bài đếm ở đây quy về **chọn hai điểm** trong một dãy điểm.",
        loi="Chỉ đếm tam giác nhỏ, quên các tam giác ghép.",
        phong="Đánh dấu tên các điểm rồi liệt kê từng cặp một cách có thứ tự.",
        goi_y=("Cạnh đối diện bị chia thành mấy phần?",
               "Mỗi tam giác ứng với việc chọn hai điểm nào?",
               "Số cách chọn 2 trong k điểm là k × (k − 1) : 2."),
        pt_dang="Đếm hình bằng quy tắc chọn hai điểm",
        pt_kien_thuc="Quy tắc đếm, tổ hợp chập hai",
        pt_du_lieu="Hình có nhiều đoạn kẻ từ cùng một đỉnh, hoặc nhiều điểm trên một đường",
        pt_phuong_phap="Quy về số cách chọn hai điểm",
        pt_nhanh="Số cách chọn 2 trong k là k × (k − 1) : 2 — thuộc công thức này là xong.",
        tuong_tu=("Trên một đường thẳng có 5 điểm. Có bao nhiêu đoạn thẳng?", "10"),
        bay="Bỏ sót hình ghép",
    )


# ══════════════════════════════════ MỨC M4 ══════════════════════════════════

@dang_ky("F-M4-01", "F", "M4", lop=(4, 5), tu_khoa=("tăng giảm kích thước", "diện tích"))
def f_m4_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(8, 50)
        b = rng.randint(4, a - 1)
        them = rng.randint(2, 15)
        kieu = rng.choice(["tang_dai", "tang_ca_hai", "gap_doi"])
        if kieu == "tang_dai":
            y.append((f"Hình chữ nhật dài {sv(a)} cm, rộng {sv(b)} cm. Nếu tăng chiều dài "
                      f"thêm {sv(them)} cm (giữ nguyên chiều rộng) thì diện tích tăng "
                      f"thêm bao nhiêu?", sv(them * b) + " cm²"))
        elif kieu == "tang_ca_hai":
            y.append((f"Hình chữ nhật dài {sv(a)} cm, rộng {sv(b)} cm. Nếu tăng cả chiều "
                      f"dài và chiều rộng thêm {sv(them)} cm thì diện tích tăng thêm "
                      f"bao nhiêu?", sv((a + them) * (b + them) - a * b) + " cm²"))
        else:
            y.append((f"Hình chữ nhật dài {sv(a)} cm, rộng {sv(b)} cm. Nếu gấp đôi chiều "
                      f"dài và giữ nguyên chiều rộng thì diện tích mới gấp mấy lần diện "
                      f"tích cũ?", "2 lần"))
    return Bai(
        tieu_de="Diện tích thay đổi khi kích thước thay đổi",
        dan="Vẽ hình minh hoạ phần tăng thêm.",
        y=y,
        huong_giai="Tăng một chiều thêm k đơn vị thì diện tích tăng thêm đúng một hình chữ "
                   "nhật có kích thước k × chiều còn lại. Tăng cả hai chiều thì phần tăng "
                   "gồm ba mảnh: hai dải và một hình vuông ở góc — nên **không** bằng tích "
                   "của hai phần tăng.",
        td=["TD3", "TD6"],
        diem_chot="Tăng cả hai chiều thì phần tăng gồm **ba mảnh**, không phải một.",
        loi="Nhân hai lượng tăng với nhau rồi coi đó là phần diện tích tăng thêm.",
        phong="Vẽ hình chữ nhật cũ nằm trong hình mới, tô phần dôi ra.",
        goi_y=("Vẽ hình cũ và hình mới chồng lên nhau.",
               "Phần dôi ra gồm mấy mảnh?",
               "Tính diện tích từng mảnh rồi cộng."),
        pt_dang="Biến thiên diện tích theo kích thước",
        pt_kien_thuc="Diện tích hình chữ nhật, phân tích hình",
        pt_du_lieu="“Tăng chiều dài thêm …”, “gấp đôi chiều …”",
        pt_phuong_phap="Vẽ hình chồng, tách phần dôi ra thành các mảnh chữ nhật",
        pt_nhanh="Gấp đôi một chiều thì diện tích gấp đôi; gấp đôi cả hai chiều thì gấp bốn.",
        tuong_tu=("Hình chữ nhật 10 cm × 5 cm, tăng chiều dài thêm 3 cm. "
                  "Diện tích tăng bao nhiêu?", "15 cm²"),
        bay="Phần tăng gồm ba mảnh",
    )


@dang_ky("F-M4-02", "F", "M4", lop=(5,), tu_khoa=("tỉ số diện tích", "tam giác chung chiều cao"))
def f_m4_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        m = rng.randint(1, 6)
        n = rng.randint(1, 6)
        while n == m:
            n = rng.randint(1, 6)
        s = rng.randint(6, 60) * (m + n)
        s1 = s * m // (m + n)
        y.append((f"Tam giác ABC có diện tích {sv(s)} cm². Điểm M nằm trên cạnh BC sao cho "
                  f"BM gấp {sv(m)} phần và MC gấp {sv(n)} phần bằng nhau. "
                  f"Tính diện tích tam giác ABM.", sv(s1) + " cm²"))
    return Bai(
        tieu_de="Tỉ số diện tích hai tam giác chung chiều cao",
        dan="Dùng nhận xét về chiều cao chung.",
        y=y,
        huong_giai="Hai tam giác ABM và ACM có **chung chiều cao** hạ từ A xuống BC. "
                   "Diện tích của chúng tỉ lệ thuận với hai đáy BM và MC. Vì vậy diện tích "
                   "tam giác ABM bằng diện tích tam giác ABC nhân với tỉ số BM trên BC.",
        td=["TD6", "TD3"],
        bay="Đề không cho chiều cao; đi tìm nó là vào ngõ cụt",
        diem_chot="Chung chiều cao thì diện tích **tỉ lệ với đáy** — không cần biết chiều "
                  "cao là bao nhiêu.",
        loi="Đi tìm chiều cao cụ thể trong khi đề không cho.",
        phong="Đọc lại: hai tam giác có chung đỉnh nào, chung chiều cao xuống cạnh nào?",
        goi_y=("Hai tam giác có chung đỉnh nào?",
               "Chiều cao hạ từ đỉnh đó xuống BC có chung không?",
               "Diện tích tỉ lệ thuận với đáy."),
        pt_dang="Tỉ số diện tích tam giác",
        pt_kien_thuc="Diện tích tam giác, tỉ lệ thuận",
        pt_du_lieu="Hai tam giác chung đỉnh, đáy nằm trên cùng một đường thẳng",
        pt_phuong_phap="Chia diện tích theo tỉ số hai đáy",
        pt_nhanh="Tỉ số diện tích bằng tỉ số đáy — chia tổng theo tỉ số như bài tổng – tỉ.",
        tuong_tu=("Tam giác ABC diện tích 30 cm², M trên BC với BM = MC. "
                  "Diện tích ABM bằng bao nhiêu?", "15 cm²"),
    )


# ══════════════════════════════════ MỨC M5 ══════════════════════════════════

@dang_ky("F-M5-01", "F", "M5", lop=(5,), tu_khoa=("diện tích phần tô màu", "hình tròn", "nâng cao"))
def f_m5_01(rng, lop):
    y = []
    for kieu in luan_phien(rng, ["vuong_tron", "tron_vuong", "hai_tron"], rng.randint(4, 6)):
        r = rng.randint(2, 20)
        a = 2 * r
        s_tron = PI * r * r
        if kieu == "vuong_tron":
            y.append((f"Một hình tròn bán kính {sv(r)} cm nội tiếp trong một hình vuông "
                      f"(hình tròn tiếp xúc cả bốn cạnh). Tính diện tích phần hình vuông "
                      f"nằm ngoài hình tròn (lấy π = 3,14).",
                      so_dep(a * a - s_tron) + " cm²"))
        elif kieu == "tron_vuong":
            y.append((f"Một hình vuông cạnh {sv(a)} cm. Tính diện tích hình tròn có đường "
                      f"kính bằng cạnh hình vuông đó (lấy π = 3,14).",
                      so_dep(s_tron) + " cm²"))
        else:
            r2 = rng.randint(1, r - 1) if r > 1 else 1
            y.append((f"Hai hình tròn đồng tâm có bán kính {sv(r)} cm và {sv(r2)} cm. "
                      f"Tính diện tích phần nằm giữa hai đường tròn (lấy π = 3,14).",
                      so_dep(PI * (r * r - r2 * r2)) + " cm²"))
    return Bai(
        tieu_de="Diện tích phần tô màu",
        dan="Phân tích hình thành hiệu của các hình quen thuộc.",
        y=y,
        huong_giai="Diện tích phần tô màu = diện tích hình lớn − diện tích hình bị khoét. "
                   "Bước quan trọng nhất là nhận ra hình lớn và hình bị khoét là những hình "
                   "nào, và tìm đúng kích thước của chúng từ dữ kiện đề cho.",
        td=["TD3", "TD6"],
        diem_chot="Đọc quan hệ hình học để suy ra kích thước: hình tròn nội tiếp hình vuông "
                  "thì **đường kính bằng cạnh hình vuông**.",
        loi="Lấy bán kính hình tròn làm cạnh hình vuông.",
        phong="Vẽ lại hình, ghi số đo lên hình trước khi tính.",
        goi_y=("Phần tô màu là hiệu của những hình nào?",
               "Kích thước của hình lớn suy từ đâu?",
               "Tính từng diện tích rồi trừ."),
        pt_dang="Diện tích phần tô màu",
        pt_kien_thuc="Diện tích hình tròn, hình vuông; phép trừ diện tích",
        pt_du_lieu="Hình gồm nhiều hình lồng nhau, hỏi phần còn lại",
        pt_phuong_phap="Tách thành hiệu các hình cơ bản",
        pt_nhanh="Hình tròn nội tiếp hình vuông chiếm khoảng 78,5% diện tích hình vuông.",
        tuong_tu=("Hình tròn bán kính 5 cm nội tiếp hình vuông. Diện tích phần ngoài "
                  "hình tròn bằng bao nhiêu?", "21,5 cm²"),
        bay="Quan hệ giữa bán kính và cạnh",
    )


@dang_ky("F-M5-02", "F", "M5", lop=(4, 5), tu_khoa=("cắt ghép hình", "chu vi", "nâng cao"))
def f_m5_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(4, 20)
        n = rng.randint(2, 6)
        kieu = rng.choice(["ghep_hang", "ghep_vuong", "cat_doi"])
        if kieu == "ghep_hang":
            y.append((f"Ghép {sv(n)} hình vuông cạnh {sv(a)} cm thành một hàng ngang. "
                      f"Tính chu vi hình chữ nhật thu được.",
                      sv((n * a + a) * 2) + " cm"))
        elif kieu == "ghep_vuong":
            y.append((f"Ghép {sv(n * n)} hình vuông cạnh {sv(a)} cm thành một hình vuông "
                      f"lớn. Tính chu vi hình vuông lớn.", sv(n * a * 4) + " cm"))
        else:
            y.append((f"Cắt một hình vuông cạnh {sv(a * 2)} cm thành hai hình chữ nhật "
                      f"bằng nhau. Tổng chu vi hai hình chữ nhật đó bằng bao nhiêu?",
                      sv(a * 2 * 4 + a * 2 * 2) + " cm"))
    return Bai(
        tieu_de="Cắt và ghép hình — chu vi thay đổi thế nào",
        dan="Chú ý các cạnh bị ghép vào bên trong.",
        y=y,
        huong_giai="Khi ghép hai hình lại, các cạnh dán vào nhau **không còn nằm trên "
                   "đường bao** nên không tính vào chu vi. Ngược lại, khi cắt một hình "
                   "thành hai phần thì xuất hiện thêm hai cạnh mới trên đường bao, nên "
                   "tổng chu vi tăng lên đúng hai lần đường cắt.",
        td=["TD6", "TD3"],
        diem_chot="Diện tích giữ nguyên khi cắt ghép, nhưng **chu vi thay đổi**.",
        loi="Cộng chu vi các hình nhỏ lại rồi coi đó là chu vi hình ghép.",
        phong="Tô đậm đường bao của hình mới rồi mới tính.",
        goi_y=("Vẽ hình sau khi ghép hoặc cắt.",
               "Đường bao của hình mới gồm những cạnh nào?",
               "Cạnh nào bị dán vào trong thì không tính."),
        pt_dang="Cắt ghép hình, biến thiên chu vi",
        pt_kien_thuc="Chu vi, đường bao của hình",
        pt_du_lieu="Từ khoá “ghép”, “cắt thành”, “xếp thành”",
        pt_phuong_phap="Xác định đường bao mới rồi cộng độ dài",
        pt_nhanh="Mỗi nhát cắt làm tổng chu vi tăng thêm hai lần chiều dài nhát cắt.",
        tuong_tu=("Ghép 3 hình vuông cạnh 4 cm thành hàng. Chu vi hình chữ nhật là bao nhiêu?",
                  "32 cm"),
        bay="Chu vi không cộng như diện tích",
    )
