# -*- coding: utf-8 -*-
"""Bộ lắp ba họ đề thi: ôn tập mốc (ON), thi mốc (MOC), đánh giá năng lực (NL).

Ba họ này khác hẳn phiếu học ở một điểm quyết định: **phiếu học dạy, đề thi
đo**. Phiếu học có 25 bài trải năm mức để học viên đi lên dần; đề thi chỉ có ít
bài nhưng phải phủ đúng ma trận mức độ và phải chấm được bằng biểu điểm rõ ràng.

Vì vậy bộ lắp ở đây không dùng lại `phieu.sinh_25_bai` mà có luật riêng:

* **MOC** — năm bài, mỗi bài 2 điểm, 60 phút, thang 10. Từng bài bị buộc vào một
  nhóm chuyên đề và một mức cố định, đúng format đề kiểm tra định kỳ của nhà
  trường. Mười biến thể D01–D10 đổi hạt giống, đổi mức, đổi nhóm chuyên đề hoặc
  đổi bối cảnh, nhưng **không đổi ma trận** — nếu đổi thì mười đề không còn so
  sánh được với nhau, mà so sánh được mới là lý do có mười đề.
* **ON** — năm phần 90 phút thang 100, hai phần đầu là bảng hệ thống hoá lấy
  thẳng từ dữ liệu cụm, ba phần sau là bài luyện.
* **NL** — bám format đề đánh giá năng lực vào lớp 6: trắc nghiệm nhanh, trả lời
  ngắn, đọc hiểu số liệu, tự luận, phân hoá.

Như mọi thứ khác trong hệ thống: **đáp số do mã tính ra**, và hạt giống chốt
theo mã đề nên dựng lại bao nhiêu lần cũng ra đúng đề ấy.
"""
from __future__ import annotations

import hashlib
import random
import sys
from pathlib import Path

CC = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(CC))

from data.cum_chuyen_de import CUM                       # noqa: E402
from data.nhom_chuyen_de import NHOM                     # noqa: E402
from sinh.khung import KHO                               # noqa: E402
from .chon import kho_muc, kho_khac, diem_khop           # noqa: E402
from sinh.khung import khong_dau                         # noqa: E402


def hat(ma: str) -> int:
    """Hạt giống chốt theo mã đề — dựng lại lần nào cũng ra đúng đề ấy."""
    return int(hashlib.sha256(ma.encode()).hexdigest()[:8], 16)


# ─────────────────────── MOC — đề thi mốc ───────────────────────
#
# Năm bài cố định vai trò. Cột `nhom` là các nhóm chuyên đề được phép rút mẫu
# cho bài ấy; cột `muc` là mức chuẩn trước khi biến thể điều chỉnh.

KHUNG_MOC = [
    {"ten": "Tính và điền kết quả", "nhom": ("A", "B"), "muc": "M1", "phut": 10},
    {"ten": "Tìm thành phần chưa biết, đổi đơn vị", "nhom": ("B", "E"),
     "muc": "M2", "phut": 10},
    {"ten": "Toán điển hình có lời văn", "nhom": ("D",), "muc": "M2", "phut": 15},
    {"ten": "Hình học hoặc đại lượng", "nhom": ("F", "E"), "muc": "M3", "phut": 15},
    {"ten": "Bài phân hoá", "nhom": ("G", "C", "D"), "muc": "M5", "phut": 10},
]

BAC = ["M1", "M2", "M3", "M4", "M5"]


def _doi_muc(muc: str, buoc: int) -> str:
    return BAC[max(0, min(4, BAC.index(muc) + buoc))]


# Mười biến thể. `muc_45` dịch mức của bài 4 và bài 5; `nghieng` thay danh sách
# nhóm chuyên đề của bài 5; `thuc_te` đòi mẫu có bối cảnh thật; `bay` đòi mẫu có
# cài bẫy. Không biến thể nào đụng tới ma trận mức độ chung của đề.
BIEN_THE = {
    "D01": {"ten": "Bản chuẩn — dùng cho lần thi chính thức"},
    "D02": {"ten": "Đổi số liệu, giữ nguyên dạng"},
    "D03": {"ten": "Đổi bối cảnh sang mua bán", "thuc_te": True},
    "D04": {"ten": "Đổi bối cảnh sang trường lớp", "thuc_te": True},
    "D05": {"ten": "Tăng một bậc độ khó ở bài 4 và bài 5", "muc_45": 1},
    "D06": {"ten": "Giảm một bậc độ khó — dùng cho lớp bù nền", "muc_45": -1,
            "muc_het": -1},
    "D07": {"ten": "Thêm một bẫy đơn vị đo", "bay": True, "nghieng_2": ("E",)},
    "D08": {"ten": "Thêm một bẫy dữ kiện thừa", "bay": True},
    "D09": {"ten": "Thiên về hình học và đại lượng", "nghieng": ("F", "E")},
    "D10": {"ten": "Thiên về suy luận và toán đếm", "nghieng": ("G", "C")},
}


def _rut(rng, nhoms, muc, lop, da_dung, dang, thuc_te=False, uu_bay=False):
    """Rút một mẫu cho một bài của đề thi.

    Khác `chon.chon_nam_mau` ở chỗ chỉ lấy **một** mẫu và được chọn trong nhiều
    nhóm chuyên đề cùng lúc, vì một bài của đề thi thường mở hơn một bài của
    phiếu học — "hình học hoặc đại lượng" là hai nhóm chứ không phải một.
    """
    kho_dang = khong_dau(" · ".join(dang))
    ung = [m for g in nhoms for m in kho_muc(g, muc, lop)]
    if not ung:                       # mức ấy trống ở mọi nhóm được phép
        ung = [m for g in nhoms for b in BAC for m in kho_muc(g, b, lop)]
    if not ung:
        ung = kho_khac(nhoms[0], muc, lop) or [
            m for b in BAC for m in kho_khac(nhoms[0], b, lop)]
    chua = [m for m in ung if m.ma not in da_dung] or ung
    chua.sort(key=lambda m: (
        -diem_khop(m, kho_dang),
        0 if (thuc_te and m.thuc_te) else 1,
        0 if (uu_bay and m.bay) else 1,
        rng.random()))
    chon = chua[0] if len(chua) < 3 else rng.choice(chua[:3])
    da_dung.add(chon.ma)
    return chon


def bai_moc(row: dict, cums: list[dict]) -> list[dict]:
    """Dựng năm bài của một đề thi mốc."""
    rng = random.Random(hat(row["ma"]))
    bt = BIEN_THE[row.get("bien_the_ma", "D01")]
    lop = row["lop"]
    dang = [d for c in cums for d in c.get("dang_bai", [])]
    da_dung: set[str] = set()
    ra = []
    for i, k in enumerate(KHUNG_MOC, 1):
        nhoms = k["nhom"]
        if i == 5 and "nghieng" in bt:
            nhoms = bt["nghieng"]
        if i == 2 and "nghieng_2" in bt:
            nhoms = bt["nghieng_2"]
        muc = k["muc"]
        if i >= 4 and "muc_45" in bt:
            muc = _doi_muc(muc, bt["muc_45"])
        elif "muc_het" in bt:
            muc = _doi_muc(muc, bt["muc_het"])
        m = _rut(rng, nhoms, muc, lop, da_dung, dang,
                 thuc_te=bt.get("thuc_te", False), uu_bay=bt.get("bay", False))
        b = m.sinh(random.Random(hat(row["ma"] + m.ma)), lop)
        ra.append({"stt": i, "ten_phan": k["ten"], "phut": k["phut"],
                   "diem": 2, "muc": muc, "bai": b, "ma_mau": m.ma})
    return ra


# ─────────────────────── ON — phiếu ôn tập mốc ───────────────────────

KHUNG_ON = [
    ("A", "BẢN ĐỒ CÁC CỤM TRONG PHẠM VI MỐC", 10, 10),
    ("B", "CÔNG THỨC VÀ QUY TẮC PHẢI THUỘC", 10, 10),
    ("C", "LUYỆN LẠI THEO TỪNG CỤM", 30, 35),
    ("D", "BÀI TỔNG HỢP LIÊN CỤM", 25, 30),
    ("E", "BÀI PHÂN HOÁ", 15, 15),
]


def bai_on(row: dict, cums: list[dict]) -> dict:
    """Dựng phần luyện của phiếu ôn tập mốc.

    Phần A và B không sinh từ mẫu bài mà lấy thẳng từ dữ liệu cụm — đó là bảng
    hệ thống hoá, và một bảng hệ thống hoá phải nói đúng về chương trình chứ
    không phải là một bài tập nữa.
    """
    rng = random.Random(hat(row["ma"]))
    lop = row["lop"]
    dang = [d for c in cums for d in c.get("dang_bai", [])]
    da_dung: set[str] = set()

    # C — mỗi bài một cụm, lấy đúng nhóm chuyên đề của cụm ấy
    c_bai = []
    for c in cums[:5]:
        g = c.get("nhom_ma") or "D"
        m = _rut(rng, (g,), "M2" if len(c_bai) < 3 else "M3", lop, da_dung,
                 c.get("dang_bai", []))
        c_bai.append({"cum": c, "bai": m.sinh(random.Random(hat(row["ma"] + m.ma)), lop),
                      "ma_mau": m.ma})

    # D — mỗi bài ghép kỹ thuật của hai cụm khác nhau
    d_bai = []
    for i in range(min(4, max(2, len(cums) // 2))):
        g1 = (cums[i % len(cums)].get("nhom_ma") or "D")
        g2 = (cums[(i + 1) % len(cums)].get("nhom_ma") or "B")
        m = _rut(rng, (g1, g2), "M3", lop, da_dung, dang)
        d_bai.append({"noi": (g1, g2),
                      "bai": m.sinh(random.Random(hat(row["ma"] + m.ma)), lop),
                      "ma_mau": m.ma})

    # E — phân hoá
    e_bai = []
    for muc in ("M4", "M5"):
        g = rng.choice(["G", "C", "D", "F"])
        m = _rut(rng, (g,), muc, lop, da_dung, dang)
        e_bai.append({"muc": muc,
                      "bai": m.sinh(random.Random(hat(row["ma"] + m.ma)), lop),
                      "ma_mau": m.ma})
    return {"C": c_bai, "D": d_bai, "E": e_bai}


# ─────────────────────── NL — đề đánh giá năng lực ───────────────────────

KHUNG_NL = [
    ("I", "TRẮC NGHIỆM NHANH", 20, 40),
    ("II", "TRẢ LỜI NGẮN", 12, 20),
    ("III", "ĐỌC HIỂU SỐ LIỆU", 8, 10),
    ("IV", "TỰ LUẬN", 15, 20),
    ("V", "BÀI PHÂN HOÁ", 5, 10),
]


_SO = __import__("re").compile(r"\d[\d  .]*")


def _nhieu(rng: random.Random, dap: str) -> list[str]:
    """Dựng ba phương án nhiễu quanh một đáp số.

    Hai nguyên tắc, và cả hai đều rút ra từ những phương án hỏng của bản trước.

    **Một, chỉ nhận đáp số là một con số duy nhất kèm đơn vị.** Bản trước nhận
    cả đáp số ghép như "cạnh 32 cm, diện tích 1 024 cm²" rồi chỉ đổi con số đầu,
    ra bốn phương án cùng ghi "diện tích 1 024 cm²" — tự lộ đáp án. Nó cũng nhận
    cả phân số "5 phần 6" rồi đổi tử số thành "105 phần 6", một thứ không ai
    chọn. Câu nào không đủ điều kiện thì **chuyển sang phần trả lời ngắn**, chỗ
    không cần phương án, chứ không bịa nhiễu cho đủ số câu.

    **Hai, nhiễu phải là kết quả của một lỗi có thật.** Quên nhớ, đặt sai hàng,
    đảo hai chữ số, nhân thay vì chia. Bản trước rải n−1, n, n+1 làm ba phương
    án của một phép nhân chín chữ số: học sinh không phân biệt được bằng lập
    luận, chỉ bằng tính lại — câu ấy đo sự cẩn thận chứ không đo tư duy, và ba
    số liên tiếp thì ai cũng đoán được số giữa là đáp án.
    """
    d = dap.strip()
    # loại đáp số ghép, phân số, và đáp số bằng chữ
    if ("phần" in d or "," in d or ";" in d or " và " in d
            or d.count("=") or len(_SO.findall(d)) != 1):
        return []
    m = _SO.search(d)
    if not m:
        return []
    tho = m.group(0).replace(" ", "").replace(" ", "").rstrip(".").replace(".", "")
    if not tho.isdigit():
        return []
    n = int(tho)
    if n < 2:
        return []
    duoi = (d[:m.start()] + " " + d[m.end():]).strip()

    ung: list[int] = []

    def them(x):
        # Nhiễu phải cùng cỡ với đáp số. Chia mười một số hai chữ số ra "1 cách"
        # — không ai chọn phương án ấy, nên nó chỉ làm câu hỏi còn ba lựa chọn
        # thật thay vì bốn.
        if not isinstance(x, int) or x <= 0 or x == n or x in ung:
            return
        if len(str(x)) < len(str(n)) - 1 or len(str(x)) > len(str(n)) + 1:
            return
        ung.append(x)

    st = str(n)
    if len(st) >= 2:                              # đảo hai chữ số cuối
        them(int(st[:-2] + st[-1] + st[-2]))
    if len(st) >= 3:                              # đảo hai chữ số đầu
        them(int(st[1] + st[0] + st[2:]))
    them(n * 10)                                  # đặt lệch một hàng
    them(n // 10 if n >= 10 else None)
    them(n * 2)                                   # nhân thay vì chia
    them(n // 2 if n % 2 == 0 else None)
    them(n + 10 ** (len(st) - 1) if len(st) > 1 else None)   # quên nhớ một hàng
    them(n - 10 ** (len(st) - 1) if len(st) > 1 else None)
    if n <= 60:                                   # số nhỏ: lệch một đơn vị là lỗi thật
        them(n + 1)
        them(n - 1)

    if len(ung) < 3:
        return []
    rng.shuffle(ung)
    from sinh.khung import sv
    return [f"{sv(x)} {duoi}".strip() for x in ung[:3]]


def bai_nl(row: dict, cums: list[dict]) -> dict:
    """Dựng năm phần của một đề đánh giá năng lực."""
    rng = random.Random(hat(row["ma"]))
    lop = row["lop"]
    dang = [d for c in cums for d in c.get("dang_bai", [])]
    da_dung: set[str] = set()
    NHOMS = ("A", "B", "C", "D", "E", "F", "G", "H")

    # I — 20 câu trắc nghiệm.
    #
    # Ràng buộc quyết định chất lượng của phần này: **mỗi câu một mẫu bài khác
    # nhau**. Bản đầu tiên rút một mẫu rồi vét sạch mọi ý của nó, kết quả là 20
    # câu chỉ dựng từ 4 mẫu, có mẫu cấp tới 8 câu — một đề "đánh giá năng lực"
    # mà sáu câu đầu cùng một dạng thì không đo được độ rộng, tức là không đo
    # được đúng thứ nó sinh ra để đo. Kho có 241 mẫu, thừa sức cấp 20 mẫu rời.
    tn: list[dict] = []
    da_dung_tn: set[str] = set()
    for i in range(20):
        g = NHOMS[i % 8]
        muc = "M1" if i < 8 else ("M2" if i < 16 else "M3")
        # Thử nhiều lần, và sau vài lần thì nới sang nhóm chuyên đề kế bên: một
        # ô (nhóm × mức × lớp) có thể toàn mẫu cho đáp số ghép hoặc phân số,
        # không dựng được phương án nhiễu. Thà lấy câu ở nhóm bên cạnh còn hơn
        # để đề thiếu câu — 19 câu thì thang điểm 40 của phần I không chia đều.
        for lan in range(14):
            gg = g if lan < 6 else NHOMS[(NHOMS.index(g) + lan) % 8]
            m = _rut(rng, (gg,), muc, lop, da_dung_tn, dang)
            b = m.sinh(random.Random(hat(row["ma"] + m.ma + str(i))), lop)
            # Lấy **một ý duy nhất** của mẫu, chọn ngẫu nhiên trong các ý dựng
            # được phương án nhiễu. Nhờ vậy hai đề khác nhau của cùng một lớp
            # cũng không trùng câu, dù có tình cờ rút trúng cùng một mẫu.
            ung = [(d, a) for d, a in b.y if _nhieu(rng, a)]
            if not ung:
                continue
            de_, dap = rng.choice(ung)
            nh = _nhieu(rng, dap)
            pa = nh + [dap]
            rng.shuffle(pa)
            tn.append({"de": de_, "dap": dap, "pa": pa,
                       "dung": "ABCD"[pa.index(dap)], "ma_mau": m.ma})
            break

    # II — 10 câu trả lời ngắn, cũng mỗi câu một mẫu khác nhau, và tránh luôn
    # các mẫu đã dùng ở phần I để cả đề không lặp lại dạng nào.
    ngan: list[dict] = []
    da_dung_ngan = set(da_dung_tn)
    for i in range(10):
        g = NHOMS[(i + 3) % 8]
        m = _rut(rng, (g,), "M2" if i < 5 else "M3", lop, da_dung_ngan, dang)
        b = m.sinh(random.Random(hat(row["ma"] + "N" + m.ma + str(i))), lop)
        de_, dap = rng.choice(b.y)
        ngan.append({"de": de_, "dap": dap, "ma_mau": m.ma})

    da_dung = set(da_dung_ngan)

    # III — đọc hiểu số liệu, lấy từ nhóm H (thống kê)
    m = _rut(rng, ("H",), "M3", lop, da_dung, dang)
    doc_hieu = {"bai": m.sinh(random.Random(hat(row["ma"] + "H" + m.ma)), lop),
                "ma_mau": m.ma}

    # IV — ba bài tự luận toán điển hình
    tu_luan = []
    for muc in ("M2", "M3", "M3"):
        m = _rut(rng, ("D",), muc, lop, da_dung, dang)
        tu_luan.append({"muc": muc,
                        "bai": m.sinh(random.Random(hat(row["ma"] + "T" + m.ma)), lop),
                        "ma_mau": m.ma})

    # V — một bài phân hoá mức đề chuyên
    g = rng.choice(["G", "F", "C"])
    m = _rut(rng, (g,), "M5", lop, da_dung, dang)
    phan_hoa = {"bai": m.sinh(random.Random(hat(row["ma"] + "V" + m.ma)), lop),
                "ma_mau": m.ma}

    return {"I": tn, "II": ngan, "III": doc_hieu, "IV": tu_luan, "V": phan_hoa}
