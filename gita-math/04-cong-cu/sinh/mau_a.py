# -*- coding: utf-8 -*-
"""Thư viện mẫu bài — NHÓM A: Số học & Cấu tạo số.

Mỗi mẫu tự chọn số liệu và **tự tính đáp số**; người soạn chỉ viết lời dẫn,
hướng giải và bảng phân tích. Không có đáp số nào được gõ tay.
"""
from __future__ import annotations

from .khung import Bai, dang_ky, luan_phien, sv

# ─────────────────────────── tiện ích riêng của nhóm A ───────────────────────────

HANG = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn", "triệu"]
DOC = {0: "không", 1: "một", 2: "hai", 3: "ba", 4: "bốn", 5: "năm",
       6: "sáu", 7: "bảy", 8: "tám", 9: "chín"}


def gia_tri_hang(n: int, vi_tri: int) -> int:
    """Giá trị của chữ số ở hàng thứ `vi_tri` (0 = đơn vị) trong số n."""
    return (n // 10 ** vi_tri) % 10 * 10 ** vi_tri


def chu_so(n: int) -> list[int]:
    return [int(c) for c in str(n)]


def tong_chu_so(n: int) -> int:
    return sum(chu_so(n))


def so_tu_chu_so(ds: list[int]) -> int:
    return int("".join(str(d) for d in ds))


def khoang_lop(lop: int) -> tuple[int, int]:
    """Khoảng số tự nhiên phù hợp từng lớp."""
    return {3: (1_000, 99_999), 4: (10_000, 999_999), 5: (100_000, 9_999_999)}[lop]


# ══════════════════════════════════ MỨC M1 ══════════════════════════════════

@dang_ky("A-M1-01", "A", "M1", tu_khoa=("cấu tạo số", "giá trị chữ số", "hàng"))
def a_m1_01(rng, lop):
    lo, hi = khoang_lop(lop)
    so = rng.randint(lo, hi)
    ds = chu_so(so)
    n = len(ds)
    vi = list(range(n))
    rng.shuffle(vi)
    vi = sorted(vi[:rng.randint(4, min(7, n))])
    y = []
    for v in vi:                       # v tính từ trái sang
        bac = n - 1 - v                # bậc hàng, 0 = đơn vị
        y.append((f"Chữ số ở hàng **{HANG[bac]}** của số {sv(so)} là chữ số nào, "
                  f"và nó có giá trị bằng bao nhiêu?",
                  f"chữ số {ds[v]}, giá trị {sv(gia_tri_hang(so, bac))}"))
    return Bai(
        tieu_de="Đọc giá trị của chữ số theo hàng",
        dan=f"Cho số **{sv(so)}**.",
        y=y,
        huong_giai="Đếm hàng từ phải sang trái: đơn vị – chục – trăm – nghìn – "
                   "chục nghìn – trăm nghìn – triệu. Giá trị của một chữ số bằng "
                   "chính chữ số đó nhân với giá trị của hàng nó đứng.",
        td=["TD1"],
        diem_chot="Phân biệt **chữ số** (một kí hiệu) với **giá trị** của chữ số "
                  "(chữ số nhân giá trị hàng).",
        loi="Đếm hàng từ trái sang phải nên lệch hàng.",
        phong="Luôn viết số ra nháp rồi đánh dấu hàng đơn vị trước, đi ngược về trái.",
        goi_y=("Hàng đơn vị là chữ số cuối cùng bên phải.",
               "Đếm ngược: đơn vị, chục, trăm, nghìn…",
               "Giá trị = chữ số × 1, 10, 100, 1 000… tuỳ hàng."),
        pt_dang="Xác định chữ số và giá trị chữ số theo hàng",
        pt_kien_thuc="Cấu tạo thập phân của số tự nhiên",
        pt_du_lieu="Đề hỏi “chữ số hàng …” hoặc “giá trị của chữ số …”",
        pt_phuong_phap="Đánh số hàng từ phải sang trái rồi tra bảng hàng",
        pt_nhanh="Đếm số chữ số đứng sau chữ số cần tìm — đó chính là số chữ số 0 "
                 "phải viết thêm khi ghi giá trị.",
        tuong_tu=(f"Chữ số hàng chục của số {sv(so)} có giá trị bao nhiêu?",
                  sv(gia_tri_hang(so, 1))),
    )


@dang_ky("A-M1-02", "A", "M1", tu_khoa=("so sánh số", "thứ tự", "sắp xếp"))
def a_m1_02(rng, lop):
    lo, hi = khoang_lop(lop)
    cap = []
    for _ in range(rng.randint(5, 8)):
        a = rng.randint(lo, hi)
        kieu = rng.random()
        if kieu < 0.35:                                   # khác nhau một chữ số
            ds = chu_so(a)
            i = rng.randrange(len(ds))
            ds2 = ds[:]
            ds2[i] = (ds2[i] + rng.randint(1, 8)) % 10
            if i == 0 and ds2[i] == 0:
                ds2[i] = 9
            b = so_tu_chu_so(ds2)
        elif kieu < 0.7:                                  # hơn kém chút ít
            b = a + rng.choice([-1, 1]) * rng.randint(1, 99)
        else:
            b = rng.randint(lo, hi)
        b = max(1, b)
        cap.append((a, b))
    y = [(f"{sv(a)} … {sv(b)}", "<" if a < b else (">" if a > b else "="))
         for a, b in cap]
    return Bai(
        tieu_de="Điền dấu <, >, = thích hợp",
        dan="Điền dấu thích hợp vào chỗ chấm.",
        y=y,
        huong_giai="So sánh hai số tự nhiên: số nào nhiều chữ số hơn thì lớn hơn; "
                   "nếu bằng số chữ số thì so từng cặp chữ số cùng hàng, kể từ trái "
                   "sang phải, gặp cặp khác nhau đầu tiên là kết luận được ngay.",
        td=["TD1", "TD5"],
        diem_chot="Đếm số chữ số **trước**, chỉ khi bằng nhau mới so từng hàng.",
        loi="So từ hàng đơn vị (phải sang trái) nên kết luận sai.",
        phong="Gạch chân cặp chữ số khác nhau đầu tiên tính từ bên trái.",
        goi_y=("Hai số có cùng số chữ số không?",
               "So chữ số đầu tiên bên trái trước.",
               "Gặp cặp chữ số khác nhau đầu tiên là dừng, không cần so tiếp."),
        pt_dang="So sánh hai số tự nhiên",
        pt_kien_thuc="Thứ tự trong tập số tự nhiên",
        pt_du_lieu="Dấu … giữa hai số, yêu cầu điền <, >, =",
        pt_phuong_phap="Đếm chữ số → so từng hàng từ trái sang phải",
        pt_nhanh="Số nhiều chữ số hơn thì lớn hơn — không cần đọc hết số.",
        tuong_tu=(f"Điền dấu: {sv(cap[0][0])} … {sv(cap[0][0] + 1)}", "<"),
    )


@dang_ky("A-M1-03", "A", "M1", tu_khoa=("số chẵn", "số lẻ", "liền trước", "liền sau"))
def a_m1_03(rng, lop):
    lo, hi = khoang_lop(lop)
    ds = sorted(rng.sample(range(lo, hi), rng.randint(4, 6)))
    y = []
    for s in ds:
        h = rng.choice(["chan_le", "lien_truoc", "lien_sau", "chan_lien_sau"])
        if h == "chan_le":
            y.append((f"Số {sv(s)} là số chẵn hay số lẻ?",
                      "số chẵn" if s % 2 == 0 else "số lẻ"))
        elif h == "lien_truoc":
            y.append((f"Số liền trước của {sv(s)} là số nào?", sv(s - 1)))
        elif h == "lien_sau":
            y.append((f"Số liền sau của {sv(s)} là số nào?", sv(s + 1)))
        else:
            k = s + (2 if s % 2 == 0 else 1)
            y.append((f"Số chẵn bé nhất lớn hơn {sv(s)} là số nào?", sv(k)))
    return Bai(
        tieu_de="Số chẵn – số lẻ, số liền trước – số liền sau",
        dan="Trả lời ngắn gọn từng câu.",
        y=y,
        huong_giai="Số chẵn là số có chữ số tận cùng 0, 2, 4, 6, 8; số lẻ tận cùng "
                   "1, 3, 5, 7, 9. Số liền trước kém 1 đơn vị, số liền sau hơn 1 đơn vị. "
                   "Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị.",
        td=["TD1"],
        diem_chot="Chỉ cần nhìn **chữ số tận cùng** là biết chẵn hay lẻ, dù số dài bao nhiêu.",
        loi="Nhầm “liền trước” với “bé hơn”, trả lời một số bất kì bé hơn.",
        phong="Liền trước – liền sau chỉ hơn kém đúng **1** đơn vị.",
        goi_y=("Nhìn chữ số cuối cùng bên phải.",
               "Liền trước = trừ 1; liền sau = cộng 1.",
               "Hai số chẵn liên tiếp cách nhau 2 đơn vị."),
        pt_dang="Nhận biết chẵn – lẻ và số liền kề",
        pt_kien_thuc="Dãy số tự nhiên liên tiếp, dấu hiệu chia hết cho 2",
        pt_du_lieu="Từ khoá “chẵn”, “lẻ”, “liền trước”, “liền sau”",
        pt_phuong_phap="Xét chữ số tận cùng; cộng hoặc trừ 1 đơn vị",
        pt_nhanh="Che hết các chữ số, chỉ để lộ chữ số cuối.",
        tuong_tu=(f"Số liền sau của {sv(ds[0])} là số nào?", sv(ds[0] + 1)),
    )


@dang_ky("A-M1-04", "A", "M1", lop=(4, 5), tu_khoa=("viết số", "cấu tạo số", "tổng"))
def a_m1_04(rng, lop):
    lo, hi = khoang_lop(lop)
    y = []
    for _ in range(rng.randint(4, 6)):
        so = rng.randint(lo, hi)
        ds = chu_so(so)
        n = len(ds)
        thanh = [f"{sv(ds[i] * 10 ** (n - 1 - i))}" for i in range(n) if ds[i]]
        y.append((f"Viết số gồm tổng: {' + '.join(thanh)}", sv(so)))
    return Bai(
        tieu_de="Viết số khi biết tổng các giá trị hàng",
        dan="Viết số tự nhiên ứng với mỗi tổng dưới đây.",
        y=y,
        huong_giai="Mỗi số hạng cho biết một hàng. Xếp các chữ số vào đúng hàng của "
                   "nó, hàng nào khuyết thì viết chữ số 0.",
        td=["TD1", "TD3"],
        diem_chot="Hàng khuyết trong tổng vẫn phải có chữ số **0** trong số viết ra.",
        loi="Bỏ qua hàng khuyết nên số viết ra bị ngắn đi một chữ số.",
        phong="Kẻ sẵn các ô hàng rồi mới điền chữ số vào ô tương ứng.",
        goi_y=("Số hạng lớn nhất cho biết hàng cao nhất.",
               "Kẻ đủ ô từ hàng cao nhất xuống hàng đơn vị.",
               "Ô nào không có số hạng tương ứng thì điền 0."),
        pt_dang="Viết số từ dạng tổng theo hàng",
        pt_kien_thuc="Cấu tạo thập phân của số tự nhiên",
        pt_du_lieu="Tổng gồm các số tròn chục, tròn trăm, tròn nghìn…",
        pt_phuong_phap="Kẻ bảng hàng, điền chữ số, bù 0 vào hàng khuyết",
        pt_nhanh="Đếm số chữ số 0 của số hạng lớn nhất là biết số cần viết dài mấy chữ số.",
        tuong_tu=("Viết số gồm tổng: 30 000 + 400 + 7", "30 407"),
    )


@dang_ky("A-M1-05", "A", "M1", lop=(4, 5), tu_khoa=("làm tròn", "ước lượng"))
def a_m1_05(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        so = rng.randint(1_000, 999_999)
        b = rng.choice([10, 100, 1000])
        du = so % b
        tron = so - du if du * 2 < b else so - du + b
        ten = {10: "hàng chục", 100: "hàng trăm", 1000: "hàng nghìn"}[b]
        y.append((f"Làm tròn số {sv(so)} đến {ten}.", sv(tron)))
    return Bai(
        tieu_de="Làm tròn số đến hàng cho trước",
        dan="Làm tròn mỗi số dưới đây theo yêu cầu.",
        y=y,
        huong_giai="Nhìn chữ số ở hàng **liền sau** hàng cần làm tròn: nếu chữ số đó "
                   "bé hơn 5 thì giữ nguyên hàng làm tròn và thay các chữ số sau bằng 0; "
                   "nếu từ 5 trở lên thì tăng hàng làm tròn thêm 1 rồi mới thay 0.",
        td=["TD1", "TD5"],
        diem_chot="Chỉ xét **một** chữ số liền sau, không cộng dồn cả phần đuôi.",
        loi="Nhìn nhầm sang chữ số ở hàng cần làm tròn thay vì hàng liền sau nó.",
        phong="Gạch một nét ngăn ngay sau hàng cần làm tròn rồi mới quyết định.",
        goi_y=("Gạch một nét ngay sau hàng cần làm tròn.",
               "Chữ số đứng ngay sau nét gạch quyết định tất cả.",
               "Nhỏ hơn 5 giữ nguyên, từ 5 trở lên thêm 1."),
        pt_dang="Làm tròn số tự nhiên",
        pt_kien_thuc="Quy tắc làm tròn, giá trị hàng",
        pt_du_lieu="Cụm từ “làm tròn đến hàng …”",
        pt_phuong_phap="Gạch ngăn hàng → xét chữ số liền sau → giữ nguyên hoặc thêm 1",
        pt_nhanh="Che toàn bộ phần đuôi sau nét gạch, chỉ để lộ đúng một chữ số.",
        tuong_tu=("Làm tròn 4 762 đến hàng trăm.", "4 800"),
    )


@dang_ky("A-M1-06", "A", "M1", tu_khoa=("đọc số", "viết số"))
def a_m1_06(rng, lop):
    lo, hi = khoang_lop(lop)
    y = []
    for _ in range(rng.randint(4, 6)):
        so = rng.randint(lo, hi)
        ds = chu_so(so)
        y.append((f"Số {sv(so)} có bao nhiêu chữ số, và tổng các chữ số của nó bằng bao nhiêu?",
                  f"{len(ds)} chữ số, tổng {sv(sum(ds))}"))
    return Bai(
        tieu_de="Đếm chữ số và tính tổng các chữ số",
        dan="Với mỗi số dưới đây, trả lời đủ hai ý.",
        y=y,
        huong_giai="Đếm số chữ số bằng cách tách số theo lớp (mỗi lớp 3 chữ số). "
                   "Tổng các chữ số là cộng tất cả các chữ số lại, không phân biệt hàng.",
        td=["TD1"],
        diem_chot="Tổng các chữ số **không** phụ thuộc thứ tự các chữ số.",
        loi="Cộng cả giá trị hàng (ví dụ cộng 300 thay vì cộng 3).",
        phong="Viết rời từng chữ số ra rồi mới cộng.",
        goi_y=("Tách số thành từng lớp ba chữ số.",
               "Viết các chữ số cách nhau ra nháp.",
               "Cộng các chữ số, không cộng giá trị hàng."),
        pt_dang="Đếm chữ số, tính tổng chữ số",
        pt_kien_thuc="Cấu tạo số, tổng chữ số",
        pt_du_lieu="Yêu cầu “có mấy chữ số”, “tổng các chữ số”",
        pt_phuong_phap="Tách lớp để đếm; cộng rời từng chữ số",
        pt_nhanh="Ghép cặp các chữ số cộng lại tròn 10 rồi cộng nhanh.",
        tuong_tu=("Số 40 506 có mấy chữ số và tổng các chữ số bằng bao nhiêu?",
                  "5 chữ số, tổng 15"),
    )


# ══════════════════════════════════ MỨC M2 ══════════════════════════════════

@dang_ky("A-M2-01", "A", "M2", lop=(4, 5), tu_khoa=("chia hết", "dấu hiệu chia hết"))
def a_m2_01(rng, lop):
    ds = sorted(rng.sample(range(102, 9_999), rng.randint(5, 8)))
    y = []
    for s in ds:
        d = rng.choice([2, 3, 5, 9])
        y.append((f"Số {sv(s)} có chia hết cho {d} không? Vì sao?",
                  ("có" if s % d == 0 else "không") +
                  (f" (chữ số tận cùng {s % 10})" if d in (2, 5)
                   else f" (tổng chữ số {sv(tong_chu_so(s))})")))
    return Bai(
        tieu_de="Dùng dấu hiệu chia hết để trả lời nhanh",
        dan="Không đặt tính chia, hãy dùng dấu hiệu chia hết.",
        y=y,
        huong_giai="Chia hết cho 2: tận cùng 0, 2, 4, 6, 8. Chia hết cho 5: tận cùng "
                   "0 hoặc 5. Chia hết cho 3: tổng các chữ số chia hết cho 3. "
                   "Chia hết cho 9: tổng các chữ số chia hết cho 9.",
        td=["TD1", "TD5"],
        diem_chot="Dấu hiệu cho 2 và 5 nhìn **đuôi**; dấu hiệu cho 3 và 9 nhìn **tổng**.",
        loi="Dùng dấu hiệu của 3 để kết luận cho 2, hoặc cộng thiếu một chữ số.",
        phong="Viết rõ tổng các chữ số ra bên cạnh trước khi kết luận.",
        goi_y=("Số chia là 2 hay 5 thì nhìn chữ số tận cùng.",
               "Số chia là 3 hay 9 thì cộng các chữ số.",
               "Tổng chữ số vẫn lớn thì cộng tiếp lần nữa."),
        pt_dang="Kiểm tra chia hết bằng dấu hiệu",
        pt_kien_thuc="Dấu hiệu chia hết cho 2, 3, 5, 9",
        pt_du_lieu="Câu hỏi “có chia hết cho … không”",
        pt_phuong_phap="Chọn đúng dấu hiệu theo số chia rồi kiểm tra",
        pt_nhanh="Cộng chữ số theo cặp tròn 9, phần dư chính là số dư khi chia 9.",
        tuong_tu=(f"Số {sv(ds[0])} có chia hết cho 9 không?",
                  "có" if ds[0] % 9 == 0 else "không"),
    )


@dang_ky("A-M2-02", "A", "M2", tu_khoa=("chia có dư", "phép chia"))
def a_m2_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 7)):
        b = rng.randint(3, 9) if lop == 3 else rng.randint(3, 25)
        thuong = rng.randint(12, 400 if lop == 3 else 9_000)
        du = rng.randint(1, b - 1)
        a = b * thuong + du
        y.append((f"{sv(a)} : {sv(b)} = ? (dư ?)", f"{sv(thuong)} dư {sv(du)}"))
    return Bai(
        tieu_de="Phép chia có dư",
        dan="Thực hiện phép chia, ghi rõ thương và số dư.",
        y=y,
        huong_giai="Đặt tính chia. Trong phép chia có dư, luôn có "
                   "**số bị chia = số chia × thương + số dư** và **số dư bé hơn số chia**.",
        td=["TD1"],
        diem_chot="Số dư luôn **bé hơn** số chia — dư bằng hoặc lớn hơn số chia là chia chưa xong.",
        loi="Để số dư lớn hơn số chia, hoặc quên hạ chữ số 0 nên thương thiếu chữ số.",
        phong="Thử lại bằng công thức số bị chia = số chia × thương + số dư.",
        goi_y=("Đặt tính chia theo cột.",
               "Mỗi lần hạ một chữ số phải viết một chữ số ở thương, kể cả chữ số 0.",
               "Thử lại: nhân thương với số chia rồi cộng số dư."),
        pt_dang="Phép chia có dư",
        pt_kien_thuc="Quan hệ giữa số bị chia, số chia, thương và số dư",
        pt_du_lieu="Đề yêu cầu ghi cả thương và số dư",
        pt_phuong_phap="Đặt tính chia, kiểm tra điều kiện số dư",
        pt_nhanh="Ước lượng thương bằng cách làm tròn số chia trước khi chia.",
        tuong_tu=("Tìm thương và số dư của 1 234 : 7", "176 dư 2"),
        bay="Số dư phải bé hơn số chia",
    )


@dang_ky("A-M2-03", "A", "M2", lop=(4, 5), tu_khoa=("chia hết", "điền chữ số"))
def a_m2_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        d = rng.choice([2, 3, 5, 9])
        goc = rng.randint(100, 9_999)
        s = str(goc)
        vi = rng.randrange(len(s))
        mau = s[:vi] + "*" + s[vi + 1:]
        dap = [c for c in "0123456789"
               if not (vi == 0 and c == "0") and int(mau.replace("*", c)) % d == 0]
        y.append((f"Tìm tất cả chữ số thay cho dấu * để số {mau} chia hết cho {d}.",
                  ", ".join(dap) if dap else "không có chữ số nào"))
    return Bai(
        tieu_de="Tìm chữ số để số chia hết cho một số cho trước",
        dan="Với mỗi câu, tìm **tất cả** các chữ số thoả mãn.",
        y=y,
        huong_giai="Xét dấu hiệu chia hết ứng với số chia, rồi thử lần lượt 10 chữ số "
                   "từ 0 đến 9. Nếu dấu * đứng ở hàng cao nhất thì loại chữ số 0.",
        td=["TD2", "TD5"],
        diem_chot="Phải tìm **tất cả** chữ số thoả mãn, không dừng ở chữ số đầu tiên tìm được.",
        loi="Chỉ nêu một đáp số, hoặc nhận cả chữ số 0 ở hàng cao nhất.",
        phong="Liệt kê đủ 10 chữ số ra nháp rồi gạch dần chữ số không đạt.",
        goi_y=("Số chia là 2 hay 5 thì chỉ cần xét chữ số tận cùng.",
               "Số chia là 3 hay 9 thì tính tổng các chữ số đã biết trước.",
               "Cộng thêm dấu * và tìm chữ số làm tổng chia hết cho số đó."),
        pt_dang="Điền chữ số theo điều kiện chia hết",
        pt_kien_thuc="Dấu hiệu chia hết, chữ số hàng cao nhất khác 0",
        pt_du_lieu="Số có ô trống hoặc dấu *, kèm điều kiện chia hết",
        pt_phuong_phap="Dùng dấu hiệu để lập điều kiện cho dấu * rồi thử 0–9",
        pt_nhanh="Với 3 và 9: tính tổng các chữ số đã biết một lần duy nhất, rồi tìm "
                 "phần bù cần thêm.",
        tuong_tu=("Tìm chữ số thay cho * để 12* chia hết cho 5.", "0, 5"),
        bay="Chữ số hàng cao nhất không được là 0",
    )


@dang_ky("A-M2-04", "A", "M2", lop=(4, 5), tu_khoa=("chia hết", "tính chất chia hết"))
def a_m2_04(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        d = rng.choice([2, 3, 5, 9])
        a = d * rng.randint(11, 99)
        b = d * rng.randint(11, 99)
        c = rng.randint(1, d - 1) if d > 1 else 0
        h = rng.choice(["tong", "hieu", "them_du"])
        if h == "tong":
            y.append((f"Tổng {sv(a)} + {sv(b)} có chia hết cho {d} không?", "có"))
        elif h == "hieu":
            x, z = max(a, b), min(a, b)
            y.append((f"Hiệu {sv(x)} − {sv(z)} có chia hết cho {d} không?", "có"))
        else:
            y.append((f"Tổng {sv(a)} + {sv(c)} có chia hết cho {d} không? "
                      f"Nếu không, số dư bằng bao nhiêu?", f"không, dư {sv(c)}"))
    return Bai(
        tieu_de="Tính chất chia hết của tổng và hiệu",
        dan="Trả lời và giải thích ngắn gọn, không cần tính ra kết quả tổng.",
        y=y,
        huong_giai="Nếu hai số cùng chia hết cho một số thì tổng và hiệu của chúng "
                   "cũng chia hết cho số đó. Nếu một số chia hết còn số kia dư r thì "
                   "tổng cũng dư đúng r.",
        td=["TD2", "TD5"],
        diem_chot="Xét **số dư** của từng số hạng là đủ, không cần cộng ra kết quả.",
        loi="Cộng hai số ra rồi mới chia — mất thời gian và dễ sai tính.",
        phong="Ghi số dư của từng số hạng ngay bên dưới nó.",
        goi_y=("Mỗi số hạng có chia hết cho số đó không?",
               "Nếu cả hai cùng chia hết thì tổng chia hết.",
               "Nếu một số dư r, tổng cũng dư r."),
        pt_dang="Xét chia hết của tổng, hiệu",
        pt_kien_thuc="Tính chất chia hết của tổng và hiệu",
        pt_du_lieu="Câu hỏi về tổng hoặc hiệu, không yêu cầu kết quả cụ thể",
        pt_phuong_phap="Xét số dư từng số hạng rồi cộng, trừ các số dư",
        pt_nhanh="Chỉ cộng các **số dư**, không cộng các số.",
        tuong_tu=("Tổng 45 + 27 có chia hết cho 9 không?", "có"),
    )


@dang_ky("A-M2-05", "A", "M2", lop=(4, 5), tu_khoa=("số chẵn", "số lẻ", "đếm số"))
def a_m2_05(rng, lop):
    y = []
    for loai in luan_phien(rng, ["chan", "le", "chia3", "chia5"], rng.randint(4, 6)):
        a = rng.randint(10, 400)
        b = a + rng.randint(30, 600)
        if loai == "chan":
            dau = a + (a % 2)
            n = (b - dau) // 2 + 1 if dau <= b else 0
            y.append((f"Có bao nhiêu số chẵn từ {sv(a)} đến {sv(b)}?", sv(n)))
        elif loai == "le":
            dau = a if a % 2 else a + 1
            n = (b - dau) // 2 + 1 if dau <= b else 0
            y.append((f"Có bao nhiêu số lẻ từ {sv(a)} đến {sv(b)}?", sv(n)))
        else:
            d = 3 if loai == "chia3" else 5
            n = b // d - (a - 1) // d
            y.append((f"Có bao nhiêu số chia hết cho {d} từ {sv(a)} đến {sv(b)}?", sv(n)))
    return Bai(
        tieu_de="Đếm số thoả điều kiện trong một khoảng",
        dan="Đếm số lượng, không cần liệt kê.",
        y=y,
        huong_giai="Các số cần đếm lập thành một dãy cách đều. Số lượng số hạng bằng "
                   "(số cuối − số đầu) : khoảng cách + 1. Phải tìm đúng số đầu và số "
                   "cuối **nằm trong khoảng đã cho**.",
        td=["TD4", "TD1"],
        diem_chot="Công thức có **+ 1** ở cuối; quên cộng 1 là sai một đơn vị.",
        loi="Lấy luôn hai đầu khoảng làm số đầu và số cuối của dãy dù chúng không thoả điều kiện.",
        phong="Viết ra ba số đầu và ba số cuối của dãy trước khi áp công thức.",
        goi_y=("Số đầu tiên trong khoảng thoả điều kiện là số nào?",
               "Số cuối cùng trong khoảng thoả điều kiện là số nào?",
               "Số lượng = (cuối − đầu) : khoảng cách + 1."),
        pt_dang="Đếm số hạng của dãy cách đều theo điều kiện chia hết",
        pt_kien_thuc="Dãy số cách đều, dấu hiệu chia hết",
        pt_du_lieu="Cụm “có bao nhiêu số … từ … đến …”",
        pt_phuong_phap="Tìm số đầu, số cuối hợp lệ rồi dùng công thức đếm",
        pt_nhanh="Số các số chia hết cho d từ 1 đến n bằng phần nguyên của n : d, "
                 "nên đếm từ a đến b là b : d trừ đi (a − 1) : d.",
        tuong_tu=("Có bao nhiêu số chẵn từ 10 đến 40?", "16"),
        bay="Hai đầu khoảng chưa chắc thoả điều kiện",
    )


# ══════════════════════════════════ MỨC M3 ══════════════════════════════════

@dang_ky("A-M3-01", "A", "M3", lop=(4, 5), tu_khoa=("cấu tạo số", "tìm số"))
def a_m3_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(1, 9)
        b = rng.randint(0, 9)
        so = a * 10 + b
        t = a + b
        h = a - b
        kieu = rng.choice(["tong_hieu", "tong_doi", "hieu_doi"])
        if kieu == "tong_hieu":
            y.append((f"Tìm số có hai chữ số, biết tổng hai chữ số bằng {sv(t)} "
                      f"và chữ số hàng chục hơn chữ số hàng đơn vị {sv(h)} đơn vị.",
                      sv(so)) if h >= 0 else
                     (f"Tìm số có hai chữ số, biết tổng hai chữ số bằng {sv(t)} "
                      f"và chữ số hàng đơn vị hơn chữ số hàng chục {sv(-h)} đơn vị.",
                      sv(so)))
        elif kieu == "tong_doi":
            moi = b * 10 + a
            y.append((f"Số có hai chữ số {sv(so)}; đổi chỗ hai chữ số ta được số nào? "
                      f"Hiệu của hai số đó bằng bao nhiêu?",
                      f"{sv(moi)}, hiệu {sv(abs(so - moi))}"))
        else:
            y.append((f"Chữ số hàng chục của số {sv(so)} gấp mấy lần chữ số hàng đơn vị "
                      f"(nếu chia hết), hoặc hơn bao nhiêu đơn vị?",
                      (f"gấp {sv(a // b)} lần" if b and a % b == 0 else f"hơn {sv(a - b)} đơn vị")))
    return Bai(
        tieu_de="Cấu tạo số có hai chữ số",
        dan="Trình bày lời giải ngắn gọn cho từng ý.",
        y=y,
        huong_giai="Viết số có hai chữ số dưới dạng **ab = a × 10 + b** với a là chữ số "
                   "hàng chục (khác 0), b là chữ số hàng đơn vị. Từ điều kiện của đề, "
                   "lập quan hệ giữa a và b rồi dùng bài toán tổng – hiệu.",
        td=["TD3", "TD2"],
        diem_chot="Chữ số hàng chục **khác 0** và mỗi chữ số chỉ nhận giá trị từ 0 đến 9.",
        loi="Tìm ra a hoặc b lớn hơn 9 mà vẫn nhận đáp số.",
        phong="Sau khi tính xong, kiểm tra lại từng chữ số có nằm trong khoảng 0–9 không.",
        goi_y=("Gọi chữ số hàng chục là a, hàng đơn vị là b.",
               "Viết số đó thành a × 10 + b.",
               "Đưa về bài toán tổng – hiệu của a và b."),
        pt_dang="Tìm số theo điều kiện của các chữ số",
        pt_kien_thuc="Cấu tạo thập phân, bài toán tổng – hiệu",
        pt_du_lieu="Đề cho quan hệ giữa các chữ số chứ không cho số",
        pt_phuong_phap="Đặt ẩn cho từng chữ số, viết số theo cấu tạo, giải hệ điều kiện",
        pt_nhanh="Đổi chỗ hai chữ số của số có hai chữ số thì hiệu luôn bằng 9 lần "
                 "hiệu hai chữ số.",
        tuong_tu=("Tìm số có hai chữ số, tổng hai chữ số bằng 11, hiệu bằng 3.", "74"),
    )


@dang_ky("A-M3-02", "A", "M3", lop=(4, 5), tu_khoa=("lập số", "đếm số", "chữ số"))
def a_m3_02(rng, lop):
    ds = sorted(rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3))
    co0 = rng.random() < 0.5
    if co0:
        ds = sorted(rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 2) + [0])
    n = len(ds)
    tat_ca = []
    for i in range(n):
        for j in range(n):
            for k in range(n):
                if len({i, j, k}) == 3 and ds[i] != 0:
                    tat_ca.append(ds[i] * 100 + ds[j] * 10 + ds[k])
    tat_ca = sorted(set(tat_ca))
    chan = [x for x in tat_ca if x % 2 == 0]
    chia5 = [x for x in tat_ca if x % 5 == 0]
    bo = ", ".join(str(d) for d in ds)
    return Bai(
        tieu_de="Lập số có ba chữ số khác nhau",
        dan=f"Cho ba chữ số **{bo}**. Lập các số có ba chữ số khác nhau từ ba chữ số này.",
        y=[("Viết tất cả các số lập được (theo thứ tự từ bé đến lớn).",
            " · ".join(sv(x) for x in tat_ca)),
           ("Lập được tất cả bao nhiêu số?", sv(len(tat_ca))),
           ("Số lớn nhất lập được là số nào?", sv(max(tat_ca))),
           ("Số bé nhất lập được là số nào?", sv(min(tat_ca))),
           ("Trong các số đó có bao nhiêu số chẵn?", sv(len(chan))),
           ("Có bao nhiêu số chia hết cho 5?", sv(len(chia5))),
           ("Tổng của số lớn nhất và số bé nhất bằng bao nhiêu?",
            sv(max(tat_ca) + min(tat_ca)))],
        huong_giai="Lập số theo thứ tự: chọn chữ số hàng trăm trước (khác 0), rồi hàng "
                   "chục, rồi hàng đơn vị, mỗi chữ số dùng đúng một lần. Viết có hệ thống "
                   "theo nhóm cùng chữ số hàng trăm để không bỏ sót và không trùng lặp.",
        td=["TD4", "TD6"],
        diem_chot="Chữ số **0 không được đứng ở hàng trăm**, nên nếu bộ có chữ số 0 thì "
                  "số lượng số lập được ít hơn.",
        loi="Viết lộn xộn nên vừa sót vừa trùng; hoặc nhận cả số bắt đầu bằng 0.",
        phong="Liệt kê theo nhóm: cố định hàng trăm rồi mới hoán vị hai chữ số còn lại.",
        goi_y=("Chọn chữ số hàng trăm trước — chữ số nào không được chọn?",
               "Với mỗi chữ số hàng trăm, hai chữ số còn lại xếp được mấy cách?",
               "Liệt kê theo nhóm để kiểm soát, đừng viết ngẫu nhiên."),
        pt_dang="Lập số và đếm số lập được từ một bộ chữ số",
        pt_kien_thuc="Quy tắc nhân trong phép đếm, điều kiện chữ số đứng đầu",
        pt_du_lieu="Đề cho một bộ chữ số và yêu cầu lập số",
        pt_phuong_phap="Cố định hàng cao nhất rồi hoán vị các hàng còn lại",
        pt_nhanh="Ba chữ số khác 0 lập được 3 × 2 × 1 = 6 số; nếu có chữ số 0 thì chỉ "
                 "còn 2 × 2 × 1 = 4 số.",
        tuong_tu=("Từ ba chữ số 1, 2, 3 lập được bao nhiêu số có ba chữ số khác nhau?", "6"),
        bay="Chữ số 0 không đứng đầu",
    )


@dang_ky("A-M3-03", "A", "M3", lop=(4, 5), tu_khoa=("chia hết", "vừa chia hết"))
def a_m3_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        cap = rng.choice([(2, 5), (2, 3), (3, 5), (5, 9), (2, 9)])
        a = rng.randint(20, 300)
        b = a + rng.randint(100, 900)
        ds = [x for x in range(a, b + 1) if x % cap[0] == 0 and x % cap[1] == 0]
        y.append((f"Có bao nhiêu số từ {sv(a)} đến {sv(b)} vừa chia hết cho {cap[0]} "
                  f"vừa chia hết cho {cap[1]}? Số bé nhất trong đó là số nào?",
                  f"{sv(len(ds))} số, bé nhất là {sv(ds[0])}" if ds else "không có số nào"))
    return Bai(
        tieu_de="Số chia hết cho nhiều số cùng lúc",
        dan="Trả lời gọn, có thể dùng dãy cách đều.",
        y=y,
        huong_giai="Số vừa chia hết cho hai số thì chia hết cho bội chung nhỏ nhất của "
                   "chúng. Các số đó lập thành dãy cách đều với khoảng cách bằng bội "
                   "chung nhỏ nhất; dùng công thức đếm số hạng của dãy cách đều.",
        td=["TD2", "TD4"],
        diem_chot="Khoảng cách của dãy là **bội chung nhỏ nhất**, không phải tích hai số "
                  "khi hai số không nguyên tố cùng nhau.",
        loi="Lấy tích hai số làm khoảng cách (ví dụ dùng 27 cho “chia hết cho 3 và 9”).",
        phong="Kiểm tra bằng cách viết ba số đầu tiên của dãy rồi xem khoảng cách thật.",
        goi_y=("Số chia hết cho cả hai số thì chia hết cho số nào?",
               "Tìm bội chung nhỏ nhất của hai số đó.",
               "Các số cần tìm cách đều nhau đúng bằng bội chung nhỏ nhất."),
        pt_dang="Đếm số chia hết đồng thời cho nhiều số",
        pt_kien_thuc="Bội chung nhỏ nhất, dãy số cách đều",
        pt_du_lieu="Cụm “vừa chia hết cho … vừa chia hết cho …”",
        pt_phuong_phap="Quy về một số chia duy nhất là BCNN rồi đếm",
        pt_nhanh="Chia hết cho 2 và 5 thì tận cùng là 0; chia hết cho 2 và 3 thì chia hết cho 6.",
        tuong_tu=("Có bao nhiêu số từ 1 đến 100 vừa chia hết cho 2 vừa chia hết cho 5?", "10"),
        bay="BCNN chứ không phải tích hai số chia",
    )


@dang_ky("A-M3-04", "A", "M3", lop=(4, 5), tu_khoa=("số tự nhiên liên tiếp", "tổng"))
def a_m3_04(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        n = rng.choice([3, 5, 7, 9])
        giua = rng.randint(20, 500)
        dau = giua - n // 2
        tong = n * giua
        y.append((f"Tổng của {sv(n)} số tự nhiên liên tiếp bằng {sv(tong)}. "
                  f"Tìm số bé nhất trong {sv(n)} số đó.", sv(dau)))
    return Bai(
        tieu_de="Tổng của các số tự nhiên liên tiếp",
        dan="Với mỗi ý, tìm số theo yêu cầu.",
        y=y,
        huong_giai="Với một số **lẻ** các số tự nhiên liên tiếp, số ở giữa chính là "
                   "trung bình cộng: số giữa = tổng : số lượng. Số bé nhất bằng số giữa "
                   "trừ đi một nửa số lượng còn lại.",
        td=["TD3", "TD4"],
        diem_chot="Với số lượng lẻ thì **số giữa = tổng : số lượng** — đó là chìa khoá.",
        loi="Lấy tổng chia cho số lượng rồi nhận luôn kết quả là số bé nhất.",
        phong="Vẽ dãy số ra, đánh dấu vị trí số giữa trước khi lùi về số đầu.",
        goi_y=("Số lượng số hạng là số chẵn hay lẻ?",
               "Với số lượng lẻ, số ở giữa bằng tổng chia số lượng.",
               "Từ số giữa lùi về đầu dãy mấy đơn vị?"),
        pt_dang="Dãy số tự nhiên liên tiếp có tổng cho trước",
        pt_kien_thuc="Trung bình cộng, dãy cách đều",
        pt_du_lieu="Cụm “… số tự nhiên liên tiếp có tổng bằng …”",
        pt_phuong_phap="Tìm số giữa bằng phép chia rồi suy ra hai đầu dãy",
        pt_nhanh="Tổng của n số liên tiếp (n lẻ) luôn chia hết cho n.",
        tuong_tu=("Tổng của 5 số tự nhiên liên tiếp bằng 100. Số bé nhất là số nào?", "18"),
    )


@dang_ky("A-M3-05", "A", "M3", lop=(4, 5), tu_khoa=("số tận cùng", "tích"))
def a_m3_05(rng, lop):
    y = []
    for h in luan_phien(rng, ["tich", "tong", "hieu"], rng.randint(4, 6)):
        a = rng.randint(23, 9_999)
        b = rng.randint(23, 9_999)
        if h == "tich":
            y.append((f"Tích {sv(a)} × {sv(b)} có chữ số tận cùng là chữ số nào?",
                      str((a % 10) * (b % 10) % 10)))
        elif h == "tong":
            y.append((f"Tổng {sv(a)} + {sv(b)} có chữ số tận cùng là chữ số nào?",
                      str((a + b) % 10)))
        else:
            x, z = max(a, b), min(a, b)
            y.append((f"Hiệu {sv(x)} − {sv(z)} có chữ số tận cùng là chữ số nào?",
                      str((x - z) % 10)))
    return Bai(
        tieu_de="Chữ số tận cùng của tổng, hiệu, tích",
        dan="Không tính hết phép tính, chỉ tìm chữ số tận cùng.",
        y=y,
        huong_giai="Chữ số tận cùng của tổng, hiệu, tích chỉ phụ thuộc vào chữ số tận "
                   "cùng của các số tham gia. Chỉ cần lấy các chữ số tận cùng ra tính "
                   "với nhau rồi lấy chữ số tận cùng của kết quả.",
        td=["TD5", "TD2"],
        diem_chot="Chỉ làm việc với **chữ số cuối**, bỏ hết phần đầu của số.",
        loi="Tính trọn cả phép tính, vừa lâu vừa dễ sai.",
        phong="Che phần đầu của hai số, chỉ để lộ chữ số cuối cùng.",
        goi_y=("Chữ số tận cùng của mỗi số là chữ số nào?",
               "Thực hiện phép tính với riêng hai chữ số tận cùng đó.",
               "Lấy chữ số tận cùng của kết quả vừa tính."),
        pt_dang="Tìm chữ số tận cùng của một phép tính",
        pt_kien_thuc="Tính chất chữ số tận cùng",
        pt_du_lieu="Câu hỏi chỉ hỏi “chữ số tận cùng”, không hỏi kết quả",
        pt_phuong_phap="Rút gọn về chữ số tận cùng rồi tính",
        pt_nhanh="Với phép trừ, nếu chữ số cuối của số bị trừ nhỏ hơn thì mượn 10 rồi trừ.",
        tuong_tu=("Tích 137 × 46 có chữ số tận cùng là chữ số nào?", "2"),
    )


# ══════════════════════════════════ MỨC M4 ══════════════════════════════════

@dang_ky("A-M4-01", "A", "M4", lop=(4, 5), tu_khoa=("cấu tạo số", "số có ba chữ số"))
def a_m4_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(1, 9)
        b = rng.randint(0, 9)
        c = rng.randint(0, 9)
        so = a * 100 + b * 10 + c
        kieu = rng.choice(["xoa_dau", "them_dau", "doi_cho"])
        if kieu == "xoa_dau":
            con = b * 10 + c
            y.append((f"Một số có ba chữ số, nếu xoá chữ số hàng trăm thì được số mới "
                      f"kém số ban đầu {sv(so - con)} đơn vị. Tìm số ban đầu, biết chữ số "
                      f"hàng chục là {sv(b)} và chữ số hàng đơn vị là {sv(c)}.", sv(so)))
        elif kieu == "them_dau":
            moi = 1000 + so
            y.append((f"Viết thêm chữ số 1 vào bên trái số {sv(so)} thì được số mới. "
                      f"Số mới hơn số ban đầu bao nhiêu đơn vị?", sv(moi - so)))
        else:
            moi = c * 100 + b * 10 + a
            y.append((f"Đổi chỗ chữ số hàng trăm và chữ số hàng đơn vị của số {sv(so)} "
                      f"ta được số mới. Hiệu hai số bằng bao nhiêu?", sv(abs(so - moi))))
    return Bai(
        tieu_de="Thêm, bớt, đổi chỗ chữ số",
        dan="Phân tích số theo cấu tạo rồi trả lời.",
        y=y,
        huong_giai="Viết số có ba chữ số dạng **a × 100 + b × 10 + c**. Xoá chữ số hàng "
                   "trăm là bớt đi a × 100. Viết thêm chữ số 1 vào bên trái một số có ba "
                   "chữ số là cộng thêm 1 000. Đổi chỗ hàng trăm với hàng đơn vị làm số "
                   "thay đổi 99 lần hiệu hai chữ số đó.",
        td=["TD3", "TD2"],
        diem_chot="Thêm chữ số vào **bên trái** là cộng thêm; thêm vào **bên phải** là "
                  "nhân 10 rồi cộng.",
        loi="Nhầm “viết thêm bên trái” thành “viết thêm bên phải”.",
        phong="Viết cả số cũ và số mới ra rồi mới so sánh.",
        goi_y=("Viết số theo cấu tạo a × 100 + b × 10 + c.",
               "Viết số mới cũng theo cấu tạo như vậy.",
               "Trừ hai biểu thức, các phần giống nhau triệt tiêu."),
        pt_dang="Biến đổi số bằng cách thêm, bớt, đổi chỗ chữ số",
        pt_kien_thuc="Cấu tạo thập phân, hiệu hai số",
        pt_du_lieu="Đề nói “xoá chữ số”, “viết thêm chữ số”, “đổi chỗ”",
        pt_phuong_phap="Viết cả hai số theo cấu tạo rồi lấy hiệu",
        pt_nhanh="Đổi chỗ hàng trăm với hàng đơn vị: hiệu = 99 × (hiệu hai chữ số).",
        tuong_tu=("Viết thêm chữ số 2 vào bên trái số 345 thì số mới hơn số cũ bao nhiêu?",
                  "2 000"),
        bay="Bên trái hay bên phải",
    )


@dang_ky("A-M4-02", "A", "M4", lop=(5,), tu_khoa=("ước", "bội", "ƯCLN", "BCNN"))
def a_m4_02(rng, lop):
    def ucln(x, z):
        while z:
            x, z = z, x % z
        return x
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(8, 90)
        b = rng.randint(8, 90)
        g = ucln(a, b)
        l = a * b // g
        h = rng.choice(["uc", "bc", "uoc"])
        if h == "uc":
            y.append((f"Tìm ước chung lớn nhất của {sv(a)} và {sv(b)}.", sv(g)))
        elif h == "bc":
            y.append((f"Tìm bội chung nhỏ nhất của {sv(a)} và {sv(b)}.", sv(l)))
        else:
            u = [d for d in range(1, a + 1) if a % d == 0]
            y.append((f"Số {sv(a)} có bao nhiêu ước? Kể ra.",
                      f"{sv(len(u))} ước: " + ", ".join(sv(d) for d in u)))
    return Bai(
        tieu_de="Ước, bội, ước chung lớn nhất, bội chung nhỏ nhất",
        dan="Trình bày cách tìm, không chỉ ghi đáp số.",
        y=y,
        huong_giai="Tìm ước bằng cách thử chia lần lượt từ 1 đến số đó, chỉ cần thử tới "
                   "căn của số vì các ước đi theo cặp. Ước chung lớn nhất tìm bằng cách "
                   "liệt kê ước chung rồi chọn số lớn nhất. Bội chung nhỏ nhất bằng tích "
                   "hai số chia cho ước chung lớn nhất.",
        td=["TD2", "TD1"],
        diem_chot="Các ước luôn đi thành **cặp** nhân với nhau bằng chính số đó.",
        loi="Liệt kê thiếu ước lớn vì chỉ thử vài số nhỏ.",
        phong="Cứ tìm được một ước nhỏ thì viết ngay ước lớn đi kèm với nó.",
        goi_y=("Thử chia lần lượt cho 1, 2, 3, …",
               "Mỗi ước tìm được đi kèm một ước nữa: số đó chia cho ước vừa tìm.",
               "Dừng lại khi hai ước trong cặp gặp nhau."),
        pt_dang="Ước, bội, ƯCLN, BCNN",
        pt_kien_thuc="Ước và bội của số tự nhiên",
        pt_du_lieu="Từ khoá “ước chung lớn nhất”, “bội chung nhỏ nhất”",
        pt_phuong_phap="Liệt kê theo cặp ước; dùng quan hệ tích = ƯCLN × BCNN",
        pt_nhanh="ƯCLN × BCNN = tích hai số — tìm được một cái là suy ra cái kia.",
        tuong_tu=("Tìm ước chung lớn nhất của 12 và 18.", "6"),
    )


@dang_ky("A-M4-03", "A", "M4", lop=(4, 5), tu_khoa=("chia hết", "số dư", "tìm số"))
def a_m4_03(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        d1, d2 = rng.sample([3, 4, 5, 6, 7, 8, 9], 2)
        r1 = rng.randrange(1, d1)
        r2 = rng.randrange(1, d2)
        hi = rng.choice([200, 300, 500])
        ds = [x for x in range(1, hi + 1) if x % d1 == r1 and x % d2 == r2]
        y.append((f"Tìm số bé nhất không quá {sv(hi)} chia cho {sv(d1)} dư {sv(r1)} "
                  f"và chia cho {sv(d2)} dư {sv(r2)}.",
                  sv(ds[0]) if ds else "không có số nào"))
    return Bai(
        tieu_de="Tìm số theo hai điều kiện chia có dư",
        dan="Tìm số bé nhất thoả mãn.",
        y=y,
        huong_giai="Liệt kê các số thoả điều kiện thứ nhất — chúng lập thành dãy cách "
                   "đều khoảng cách bằng số chia thứ nhất. Đi dọc dãy đó, thử điều kiện "
                   "thứ hai, gặp số đầu tiên thoả mãn thì dừng.",
        td=["TD2", "TD6"],
        diem_chot="Chỉ **đi dọc một dãy** rồi thử điều kiện còn lại, không thử tất cả số.",
        loi="Thử từng số từ 1 trở đi nên quá lâu và dễ bỏ sót.",
        phong="Viết dãy số thoả điều kiện thứ nhất trước, rồi mới lọc.",
        goi_y=("Viết vài số chia cho số thứ nhất dư đúng như đề.",
               "Chúng cách đều nhau bao nhiêu đơn vị?",
               "Đi dọc dãy đó và kiểm tra điều kiện thứ hai."),
        pt_dang="Tìm số thoả nhiều điều kiện chia có dư",
        pt_kien_thuc="Phép chia có dư, dãy cách đều",
        pt_du_lieu="Hai điều kiện “chia cho … dư …” đi cùng nhau",
        pt_phuong_phap="Lập dãy theo điều kiện chặt hơn rồi lọc theo điều kiện còn lại",
        pt_nhanh="Chọn điều kiện có số chia **lớn hơn** để lập dãy — dãy thưa hơn nên "
                 "thử nhanh hơn.",
        tuong_tu=("Tìm số bé nhất chia cho 5 dư 2 và chia cho 3 dư 1.", "7"),
    )


@dang_ky("A-M4-04", "A", "M4", lop=(4, 5), tu_khoa=("số nguyên tố", "hợp số"))
def a_m4_04(rng, lop):
    def nt(x):
        if x < 2:
            return False
        d = 2
        while d * d <= x:
            if x % d == 0:
                return False
            d += 1
        return True
    ds = sorted(rng.sample(range(11, 200), rng.randint(5, 8)))
    y = [(f"Số {sv(s)} là số nguyên tố hay hợp số? Nếu là hợp số, chỉ ra một ước "
          f"khác 1 và khác chính nó.",
          "số nguyên tố" if nt(s) else
          f"hợp số (ví dụ ước {sv(next(d for d in range(2, s) if s % d == 0))})")
         for s in ds]
    return Bai(
        tieu_de="Số nguyên tố và hợp số",
        dan="Trả lời và nêu căn cứ.",
        y=y,
        huong_giai="Số nguyên tố chỉ có đúng hai ước là 1 và chính nó. Để kiểm tra, thử "
                   "chia lần lượt cho 2, 3, 5, 7, 11… và chỉ cần thử đến khi thương bé "
                   "hơn hoặc bằng số chia là dừng được.",
        td=["TD2"],
        diem_chot="Chỉ cần thử các **số nguyên tố nhỏ**, không phải thử mọi số.",
        loi="Thử chia cho mọi số từ 2 đến số đó nên mất thời gian, hoặc kết luận vội.",
        phong="Thử theo thứ tự 2, 3, 5, 7, 11, 13 và dừng đúng lúc.",
        goi_y=("Số đó có chia hết cho 2 hay 5 không?",
               "Cộng các chữ số xem có chia hết cho 3 không.",
               "Thử tiếp 7, 11, 13; dừng khi thương bé hơn số chia."),
        pt_dang="Nhận biết số nguyên tố, hợp số",
        pt_kien_thuc="Định nghĩa số nguyên tố, dấu hiệu chia hết",
        pt_du_lieu="Câu hỏi “là số nguyên tố hay hợp số”",
        pt_phuong_phap="Thử chia theo dãy số nguyên tố tăng dần, dừng đúng ngưỡng",
        pt_nhanh="Loại ngay các số chẵn lớn hơn 2 và các số tận cùng bằng 5 lớn hơn 5.",
        tuong_tu=("Số 91 là số nguyên tố hay hợp số?", "hợp số (91 = 7 × 13)"),
        bay="91, 121, 143 trông như số nguyên tố nhưng không phải",
    )


# ══════════════════════════════════ MỨC M5 ══════════════════════════════════

@dang_ky("A-M5-01", "A", "M5", lop=(4, 5), tu_khoa=("cấu tạo số", "tìm số", "nâng cao"))
def a_m5_01(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(1, 9)
        b = rng.randint(0, 9)
        so = a * 10 + b
        tong = a + b
        if tong and so % tong == 0:
            y.append((f"Tìm số có hai chữ số biết số đó bằng {sv(so // tong)} lần tổng "
                      f"hai chữ số của nó và chữ số hàng chục là {sv(a)}.", sv(so)))
        else:
            y.append((f"Số có hai chữ số {sv(so)} gấp tổng hai chữ số của nó bao nhiêu "
                      f"lần? (viết dưới dạng thương và số dư)",
                      f"{sv(so // tong)} dư {sv(so % tong)}"))
    return Bai(
        tieu_de="Quan hệ giữa một số và tổng các chữ số của nó",
        dan="Trình bày lập luận đầy đủ.",
        y=y,
        huong_giai="Viết số có hai chữ số là a × 10 + b, tổng hai chữ số là a + b. "
                   "So sánh hai biểu thức để tìm quan hệ; chú ý a chạy từ 1 đến 9 và "
                   "b chạy từ 0 đến 9 nên số trường hợp là hữu hạn, có thể lập bảng.",
        td=["TD3", "TD6"],
        diem_chot="Khi ẩn chỉ nhận hữu hạn giá trị, **lập bảng** là phương pháp chắc chắn nhất.",
        loi="Chia bừa mà không kiểm tra điều kiện chia hết nên nhận đáp số không nguyên.",
        phong="Kiểm tra lại đáp số bằng cách thay ngược vào đề.",
        goi_y=("Đặt số đó là a × 10 + b.",
               "Tổng hai chữ số là a + b — viết cả hai biểu thức ra cạnh nhau.",
               "Lập bảng a từ 1 đến 9 rồi thử."),
        pt_dang="Số và tổng chữ số của nó",
        pt_kien_thuc="Cấu tạo thập phân, phép chia có dư",
        pt_du_lieu="Đề liên hệ số với tổng các chữ số của chính nó",
        pt_phuong_phap="Đặt ẩn cho chữ số, viết hai biểu thức, lập bảng thử",
        pt_nhanh="a × 10 + b − (a + b) = 9 × a — hiệu luôn là bội của 9.",
        tuong_tu=("Số 27 gấp mấy lần tổng hai chữ số của nó?", "3 lần"),
    )


@dang_ky("A-M5-02", "A", "M5", lop=(4, 5), tu_khoa=("đếm chữ số", "đánh số trang"))
def a_m5_02(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        n = rng.choice([rng.randint(30, 99), rng.randint(100, 999), rng.randint(1000, 2500)])
        tong = 0
        for i in range(1, n + 1):
            tong += len(str(i))
        y.append((f"Một quyển sách có {sv(n)} trang, đánh số trang từ 1. "
                  f"Phải dùng tất cả bao nhiêu chữ số?", sv(tong)))
    return Bai(
        tieu_de="Đếm chữ số dùng để đánh số trang",
        dan="Tính số chữ số cần dùng.",
        y=y,
        huong_giai="Chia các trang thành nhóm theo số chữ số: từ 1 đến 9 có 9 số, mỗi số "
                   "1 chữ số; từ 10 đến 99 có 90 số, mỗi số 2 chữ số; từ 100 đến 999 có "
                   "900 số, mỗi số 3 chữ số; từ 1 000 trở đi mỗi số 4 chữ số. Nhân rồi cộng.",
        td=["TD4", "TD6"],
        diem_chot="Nhóm cuối cùng thường **không đầy đủ** — phải đếm đúng số trang còn lại.",
        loi="Lấy số trang nhân với số chữ số của trang cuối.",
        phong="Kẻ bảng ba cột: khoảng trang – số trang – số chữ số, rồi cộng cột cuối.",
        goi_y=("Từ trang 1 đến trang 9 dùng mấy chữ số?",
               "Từ trang 10 đến trang 99 có bao nhiêu trang?",
               "Nhóm cuối cùng có bao nhiêu trang, mỗi trang mấy chữ số?"),
        pt_dang="Đếm chữ số theo nhóm độ dài",
        pt_kien_thuc="Đếm số hạng dãy cách đều, cấu tạo số",
        pt_du_lieu="Bài toán đánh số trang, đánh số nhà, đánh số vé",
        pt_phuong_phap="Chia nhóm 1 chữ số – 2 chữ số – 3 chữ số rồi nhân và cộng",
        pt_nhanh="Sách 100 trang luôn dùng 192 chữ số; nhớ mốc này để kiểm tra nhanh.",
        tuong_tu=("Quyển sách 150 trang dùng hết bao nhiêu chữ số?", "342"),
        bay="Nhóm cuối không đầy đủ",
    )


@dang_ky("A-M5-03", "A", "M5", lop=(4, 5), tu_khoa=("chia hết", "chứng tỏ", "lập luận"))
def a_m5_03(rng, lop):
    d = rng.choice([2, 3, 5, 9])
    n = rng.randint(3, 6)
    y = [("Trong dãy trên có bao nhiêu số chia hết cho " + str(d) + "?", None)]
    ds = sorted(rng.sample(range(100, 999), n))
    dem = sum(1 for x in ds if x % d == 0)
    tong = sum(ds)
    y = [(f"Dãy số: {', '.join(sv(x) for x in ds)}. "
          f"Có bao nhiêu số trong dãy chia hết cho {d}?", sv(dem)),
         (f"Tổng của dãy bằng bao nhiêu?", sv(tong)),
         (f"Tổng đó có chia hết cho {d} không?", "có" if tong % d == 0 else f"không, dư {sv(tong % d)}"),
         (f"Số dư khi chia tổng cho {d} bằng tổng các số dư của từng số hạng chia cho "
          f"{d} rồi lại chia cho {d} — hãy kiểm chứng bằng số cụ thể.",
          f"tổng các số dư là {sv(sum(x % d for x in ds))}, chia {d} dư {sv(sum(x % d for x in ds) % d)}"),
         (f"Cần bớt ở tổng ít nhất bao nhiêu đơn vị để tổng chia hết cho {d}?",
          sv(tong % d)),
         (f"Cần thêm vào tổng ít nhất bao nhiêu đơn vị để tổng chia hết cho {d}?",
          sv((d - tong % d) % d))]
    return Bai(
        tieu_de="Số dư của tổng — lập luận không cần tính hết",
        dan="Dùng tính chất số dư, hạn chế tính toán.",
        y=y,
        huong_giai="Số dư của một tổng khi chia cho d bằng số dư của tổng các số dư. "
                   "Nhờ đó, muốn biết tổng có chia hết cho d không thì chỉ cần cộng các "
                   "số dư, không cần cộng các số.",
        td=["TD2", "TD6"],
        diem_chot="Làm việc với **số dư** thay vì với số — đây là kỹ thuật rút gọn mạnh nhất.",
        loi="Cộng hết cả dãy rồi mới chia, mất thời gian và dễ sai.",
        phong="Ghi số dư của từng số ngay dưới số đó rồi cộng dòng số dư.",
        goi_y=("Tính số dư của từng số khi chia cho d.",
               "Cộng các số dư lại.",
               "Lấy tổng các số dư chia tiếp cho d."),
        pt_dang="Xét số dư của tổng",
        pt_kien_thuc="Tính chất số dư của tổng",
        pt_du_lieu="Đề hỏi chia hết hay số dư của một tổng dài",
        pt_phuong_phap="Rút gọn từng số hạng về số dư rồi cộng",
        pt_nhanh="Với d = 9, số dư của một số bằng số dư của tổng các chữ số của nó.",
        tuong_tu=("Tổng 123 + 234 + 345 chia cho 9 dư mấy?", "dư 0"),
    )


@dang_ky("A-M5-04", "A", "M5", lop=(5,), tu_khoa=("số tận cùng", "luỹ thừa", "tích nhiều thừa số"))
def a_m5_04(rng, lop):
    y = []
    for _ in range(rng.randint(4, 6)):
        co = rng.choice([2, 3, 4, 7, 8, 9])
        mu = rng.randint(5, 60)
        tc = pow(co, mu, 10)
        y.append((f"Tích của {sv(mu)} thừa số đều bằng {sv(co)} có chữ số tận cùng "
                  f"là chữ số nào?", str(tc)))
    return Bai(
        tieu_de="Chữ số tận cùng của tích nhiều thừa số giống nhau",
        dan="Tìm quy luật rồi trả lời.",
        y=y,
        huong_giai="Viết chữ số tận cùng của các tích 1 thừa số, 2 thừa số, 3 thừa số… "
                   "Dãy chữ số tận cùng lặp lại tuần hoàn với chu kì không quá 4. Lấy số "
                   "thừa số chia cho độ dài chu kì, số dư cho biết vị trí trong chu kì.",
        td=["TD4", "TD6"],
        diem_chot="Chu kì lặp lại của chữ số tận cùng dài **không quá 4**.",
        loi="Chia lấy dư rồi quên rằng số dư 0 ứng với **số cuối** của chu kì.",
        phong="Đánh số vị trí trong chu kì từ 1, và quy ước dư 0 là vị trí cuối.",
        goi_y=("Viết chữ số tận cùng của vài tích đầu tiên.",
               "Dãy đó lặp lại sau mấy bước?",
               "Chia số thừa số cho độ dài chu kì và xét số dư."),
        pt_dang="Chữ số tận cùng của luỹ thừa",
        pt_kien_thuc="Tính tuần hoàn của chữ số tận cùng",
        pt_du_lieu="Tích nhiều thừa số giống nhau, số thừa số lớn",
        pt_phuong_phap="Tìm chu kì rồi chia lấy dư để định vị",
        pt_nhanh="Chữ số 0, 1, 5, 6 giữ nguyên tận cùng ở mọi số thừa số.",
        tuong_tu=("Tích của 20 thừa số đều bằng 3 có chữ số tận cùng là chữ số nào?", "1"),
        bay="Số dư 0 ứng với vị trí cuối chu kì",
    )
