# -*- coding: utf-8 -*-
"""KHUNG BỘ SINH NỘI DUNG GITA.

Nguyên tắc bất di bất dịch: **mọi đáp số do máy tính ra, không do người gõ.**
Mỗi mẫu bài nhận một bộ sinh số ngẫu nhiên có hạt giống cố định, tự chọn số liệu,
tự tính đáp số, rồi trả về một đối tượng `Bai` đầy đủ mọi trường mà Chuẩn biên soạn
phiếu GITA v2.0 yêu cầu.
"""
from __future__ import annotations

import random
import unicodedata
from dataclasses import dataclass
from fractions import Fraction

# ───────────────────────────── ĐỊNH DẠNG SỐ ─────────────────────────────

def sv(n) -> str:
    """Số Việt Nam: phân cách nghìn bằng dấu cách, thập phân bằng dấu phẩy."""
    if isinstance(n, Fraction):
        return ps(n)
    if isinstance(n, float):
        if abs(n - round(n)) < 1e-9:
            n = int(round(n))
        else:
            t = f"{n:.4f}".rstrip("0").rstrip(".")
            nguyen, _, le = t.partition(".")
            return sv(int(nguyen)) + "," + le
    am = n < 0
    s = f"{abs(int(n)):,}".replace(",", " ")
    return ("-" if am else "") + s


def nam(n: int) -> str:
    """Năm dương lịch viết liền, không tách nhóm nghìn: 1975 chứ không 1 975."""
    return str(int(n))


LA_MA = [(1000, "M"), (900, "CM"), (500, "D"), (400, "CD"), (100, "C"), (90, "XC"),
         (50, "L"), (40, "XL"), (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]


def la_ma(n: int) -> str:
    """Số La Mã — dùng cho thế kỉ và tên phần của phiếu."""
    ra, n = [], int(n)
    for gt, ki in LA_MA:
        while n >= gt:
            ra.append(ki)
            n -= gt
    return "".join(ra)


def ps(f: Fraction) -> str:
    """Phân số viết bằng lời cho học sinh tiểu học."""
    f = Fraction(f)
    if f.denominator == 1:
        return sv(f.numerator)
    return f"{sv(f.numerator)} phần {sv(f.denominator)}"


def hs(a: int, b: int, c: int) -> str:
    """Hỗn số: a và b phần c."""
    return f"{sv(a)} và {sv(b)} phần {sv(c)}"


def don_vi(n, dv: str) -> str:
    return f"{sv(n)} {dv}"


def kg_ra_tan_ta(kg: int) -> str:
    tan, du = divmod(kg, 1000)
    ta, kg2 = divmod(du, 100)
    phan = []
    if tan:
        phan.append(f"{sv(tan)} tấn")
    if ta:
        phan.append(f"{sv(ta)} tạ")
    if kg2:
        phan.append(f"{sv(kg2)} kg")
    return " ".join(phan) if phan else "0 kg"


def tan_ta_ra_kg(tan: int = 0, ta: int = 0, yen: int = 0, kg: int = 0) -> int:
    return tan * 1000 + ta * 100 + yen * 10 + kg


def phut_ra_gio(p: int) -> str:
    g, m = divmod(p, 60)
    if g and m:
        return f"{sv(g)} giờ {sv(m)} phút"
    return f"{sv(g)} giờ" if g else f"{sv(m)} phút"


# ───────────────────────────── BỐI CẢNH ─────────────────────────────

TEN = ["An", "Bình", "Chi", "Dũng", "Hà", "Hùng", "Lan", "Minh", "Nam", "Ngọc",
       "Phúc", "Quân", "Sơn", "Thảo", "Trang", "Tuấn", "Vy", "Yến", "Đức", "Khánh"]
LOP_HOC = ["4A", "4B", "4C", "5A", "5B", "5C", "3A", "3B"]
TO_DOI = ["tổ Một", "tổ Hai", "tổ Ba", "đội Một", "đội Hai", "nhóm Sao Mai", "nhóm Hoa Phượng"]
DO_VAT = [("quyển vở", "quyển"), ("chiếc bút", "chiếc"), ("quyển sách", "quyển"),
          ("cái bánh", "cái"), ("hộp màu", "hộp"), ("lá cờ", "lá"), ("bông hoa", "bông")]
HANG_HOA = [("gạo", "kg"), ("thóc", "kg"), ("đường", "kg"), ("xi măng", "kg"),
            ("phân bón", "kg"), ("muối", "kg")]
CHAT_LONG = [("dầu", "lít"), ("nước mắm", "lít"), ("nước", "lít"), ("sữa", "lít")]
NOI_CHON = ["kho A", "kho B", "cửa hàng", "thư viện", "trang trại", "hợp tác xã", "xưởng"]
CAY_TRONG = ["cây bàng", "cây phượng", "cây xoài", "cây keo", "cây bạch đàn"]


def chon(rng: random.Random, ds):
    return rng.choice(ds)


def luan_phien(rng: random.Random, ds, n: int) -> list:
    """Lấy n phần tử từ ds sao cho các loại được dùng luân phiên, đều tay.

    Dùng thay cho việc gọi `rng.choice` n lần trong một vòng lặp: cách đó hay
    cho ra một bài gồm bốn năm ý giống hệt nhau về kiểu, làm phiếu nghèo nàn.
    """
    ra, kho = [], []
    while len(ra) < n:
        if not kho:
            kho = list(ds)
            rng.shuffle(kho)
        ra.append(kho.pop())
    return ra


def hai_ten(rng: random.Random) -> tuple[str, str]:
    a, b = rng.sample(TEN, 2)
    return a, b


def ba_ten(rng: random.Random) -> tuple[str, str, str]:
    return tuple(rng.sample(TEN, 3))


# ───────────────────────────── ĐỐI TƯỢNG BÀI ─────────────────────────────

@dataclass
class Bai:
    """Một bài trong phiếu, đã có đủ mọi thứ mà chuẩn v2.0 đòi hỏi."""
    tieu_de: str                                  # tiêu đề ngắn của bài
    y: list[tuple[str, str]]                      # [(nội dung ý, đáp số)]
    huong_giai: str
    td: list[str]                                 # nhãn tư duy TD1..TD6
    diem_chot: str
    loi: str                                      # lỗi thường gặp
    phong: str                                    # cách phòng lỗi
    dan: str = ""                                 # đề dẫn chung của bài
    goi_y: tuple[str, str, str] | None = None     # gợi ý 3 tầng
    bay: str = ""                                 # loại bẫy, rỗng nếu không có
    pt_dang: str = ""                             # bảng phân tích — Dạng bài
    pt_kien_thuc: str = ""                        # — Kiến thức liên quan
    pt_du_lieu: str = ""                          # — Dữ liệu nhận biết
    pt_phuong_phap: str = ""                      # — Phương pháp áp dụng
    pt_nhanh: str = ""                            # — Cách xử lý nhanh nhất
    tuong_tu: tuple[str, str] = ("", "")          # (đề tương tự, đáp số)
    nhom: str = ""                                # nhóm chuyên đề của bài
    muc: str = ""                                 # mức M1..M5
    thuc_te: bool = False                         # có phải bài bối cảnh thực tế
    lien_ket: str = ""                            # nhóm chuyên đề được liên kết

    @property
    def so_y(self) -> int:
        return len(self.y)

    @property
    def pt_ket_qua(self) -> str:
        return " · ".join(d for _n, d in self.y[:4]) + ("…" if self.so_y > 4 else "")


@dataclass
class Mau:
    """Một mẫu bài: biết mình thuộc nhóm nào, mức nào, hợp lớp nào, và cách tự sinh."""
    ma: str
    nhom: str
    muc: str
    lop: tuple[int, ...]
    sinh: object                                  # Callable[[Random, int], Bai]
    tu_khoa: tuple[str, ...] = ()                 # để khớp dạng bài của cụm
    thuc_te: bool = False
    bay: str = ""                                 # mẫu này cài bẫy loại gì
    y_min: int = 4
    y_max: int = 10

    def tao(self, rng: random.Random, lop: int) -> Bai:
        b: Bai = self.sinh(rng, lop)
        b.nhom = self.nhom
        b.muc = self.muc
        b.thuc_te = self.thuc_te
        if self.bay and not b.bay:
            b.bay = self.bay
        return b


# Kho mẫu: KHO[nhóm][mức] = [Mau, ...]
KHO: dict[str, dict[str, list[Mau]]] = {}


def dang_ky(ma: str, nhom: str, muc: str, lop=(3, 4, 5), tu_khoa=(),
            thuc_te: bool = False, bay: str = ""):
    """Trang trí một hàm sinh để đưa vào kho mẫu."""
    def bao(f):
        m = Mau(ma=ma, nhom=nhom, muc=muc, lop=tuple(lop), sinh=f,
                tu_khoa=tuple(tu_khoa), thuc_te=thuc_te, bay=bay)
        KHO.setdefault(nhom, {}).setdefault(muc, []).append(m)
        return f
    return bao


def lay_mau(nhom: str, muc: str, lop: int, thuc_te: bool | None = None,
            co_bay: bool | None = None) -> list[Mau]:
    ds = KHO.get(nhom, {}).get(muc, [])
    ra = [m for m in ds if lop in m.lop]
    if thuc_te is not None:
        ra = [m for m in ra if m.thuc_te == thuc_te]
    if co_bay is not None:
        ra = [m for m in ra if bool(m.bay) == co_bay]
    return ra


def khong_dau(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", s)
                   if unicodedata.category(c) != "Mn").lower()


# ───────────────────────────── TIỆN ÍCH SỐ HỌC ─────────────────────────────

def cap_tong_hieu(rng: random.Random, tong_min: int, tong_max: int,
                  hieu_min: int = 2, hieu_max: int | None = None,
                  boi: int = 2) -> tuple[int, int, int, int]:
    """Sinh cặp (tổng, hiệu, số lớn, số bé) luôn cho đáp số là số tự nhiên."""
    for _ in range(400):
        tong = rng.randrange(tong_min, tong_max + 1, boi)
        hm = hieu_max if hieu_max is not None else max(hieu_min, tong // 3)
        hieu = rng.randrange(hieu_min, hm + 1)
        if (tong + hieu) % 2:
            hieu += 1
        if hieu > tong or (tong + hieu) % 2:
            continue
        lon = (tong + hieu) // 2
        be = tong - lon
        if be >= 0 and lon != be or hieu == 0:
            return tong, hieu, lon, be
    tong, hieu = 100, 20
    return tong, hieu, 60, 40


def bo_so_tbc(rng: random.Random, n: int, tb_min: int, tb_max: int,
              bien: int = 12, boi: int = 1) -> tuple[list[int], int]:
    """Sinh n số có trung bình cộng là số tự nhiên đẹp."""
    for _ in range(400):
        tb = rng.randrange(tb_min, tb_max + 1)
        lech = [rng.randrange(-bien, bien + 1) for _ in range(n - 1)]
        cuoi = -sum(lech)
        if abs(cuoi) > bien:
            continue
        ds = [tb + x for x in lech + [cuoi]]
        if all(d > 0 for d in ds) and len(set(ds)) >= max(2, n - 1):
            if boi > 1 and any(d % boi for d in ds):
                continue
            rng.shuffle(ds)
            return ds, tb
    ds = [tb_min] * n
    return ds, tb_min


def chia_het(rng: random.Random, a_min: int, a_max: int, b: int) -> int:
    """Số trong khoảng, chia hết cho b."""
    lo = -(-a_min // b)
    hi = a_max // b
    return rng.randint(max(1, lo), max(1, hi)) * b
