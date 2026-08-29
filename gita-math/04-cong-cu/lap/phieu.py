# -*- coding: utf-8 -*-
"""Lắp một phiếu học GITA hoàn chỉnh (đề + hướng dẫn giải) từ kho mẫu bài.

Đầu ra tuân thủ CHUẨN BIÊN SOẠN PHIẾU GITA v2.0:
  5 phần · mỗi phần 5 bài · mỗi bài 4–10 ý · tổng 115–170 ý · thang 100 điểm ·
  2–4 bẫy đánh dấu trong phần đáp án · gợi ý ba tầng cho trọn hai phần cuối ·
  mỗi bài trong đáp án có đủ Đáp số – Hướng giải – Nhãn tư duy – Lỗi thường gặp.
"""
from __future__ import annotations

import random
import sys
from pathlib import Path

CC = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(CC))
sys.path.insert(0, str(CC / "data"))

from loai_phieu import LOAI                       # noqa: E402
from sinh.khung import la_ma                      # noqa: E402
from sinh.khung import KHO                        # noqa: E402
from .chon import chon_nam_mau                    # noqa: E402
from .meta import PHAN_CAU_TRUC, ho_so_cum        # noqa: E402

MAU_THEO_MA = {x.ma: x for g in KHO for m in KHO[g] for x in KHO[g][m]}

# Phiếu mốc tổng ôn nhiều cụm: bảng này ghi nhóm chuyên đề của những cụm ấy,
# nạp một lần từ chỉ mục khi mô-đun được dùng lần đầu.
NHOM_CUA_MOC: dict[str, list[str]] = {}


def nap_nhom_moc(rows: list[dict]) -> None:
    """Với mỗi phiếu mốc, ghi lại danh sách nhóm chuyên đề của các cụm được tổng ôn."""
    pham_vi = {"GK1": range(1, 5), "CK1": range(1, 9),
               "GK2": range(9, 13), "CK2": range(1, 17)}
    for r in rows:
        if r.get("loai") != "MOC":
            continue
        khoa = r["ma"].rsplit("-", 1)[-1]
        cums = set(pham_vi.get(khoa, range(1, 17)))
        g = []
        for x in rows:
            if (x["lop"] == r["lop"] and x["tuyen"] == r["tuyen"]
                    and x.get("cum") in cums and x.get("nhom_ma") not in ("*", None)
                    and x["nhom_ma"] not in g):
                g.append(x["nhom_ma"])
        NHOM_CUA_MOC[r["ma"]] = g or ["A"]

CHU_Y = "abcdefghij"

# Mức năng lực của từng phần, theo từng loại phiếu.
MUC_PHAN = {
    "MOC": ["M1", "M2", "M3", "M4", "M5"],
    "LT": ["M1", "M1", "M1", "M2", "M2"],
    "DB": ["M1", "M2", "M2", "M3", "M3"],
    "KN": ["M1", "M2", "M2", "M3", "M3"],
    "NC": ["M1", "M2", "M3", "M4", "M5"],
    "OT": ["M2", "M3", "M3", "M4", "M5"],
    "TH": ["M1", "M2", "M3", "M4", "M5"],
}
MUC_TEN = {"M1": "Nhận biết", "M2": "Thông hiểu", "M3": "Vận dụng",
           "M4": "Vận dụng cao", "M5": "Sáng tạo · vượt ngưỡng"}

# Những mẫu có các ý nối tiếp nhau thành một mạch lập luận: không được cắt bớt ý.
KHONG_CAT = {
    "A-M3-02", "A-M5-03", "C-M3-01", "C-M3-03", "C-M4-01", "C-M4-03",
    "F-M1-02", "F-M3-03", "G-M1-02", "G-M2-02", "G-M3-03", "G-M4-01",
    "G-M4-02", "G-M5-01", "H-M3-03", "A3-M3-01", "F3-M3-01", "F3-M5-01",
    "G3-M3-01", "H3-M2-01",
}

Y_LO, Y_HI = 128, 158          # khoảng ý mục tiêu, nằm gọn trong chuẩn 115–170


# ────────────────────────── phần G-I-T-A của front-matter ──────────────────────────

KHUNG_G = {
    "MOC": "Phiếu này đo mức em đạt được sau **{cum}**; mục tiêu là từ 80/100 trở lên trước khi bước vào giai đoạn học tiếp theo.",
    "LT": "Sau phiếu này em phát biểu lại được toàn bộ lý thuyết của chương "
          "**{cum}** và tự vẽ được sơ đồ tư duy chương mà không nhìn sách.",
    "DB": "Sau phiếu này em gọi đúng tên từng dạng bài của chương **{cum}** và "
          "nêu được dấu hiệu nhận biết của mỗi dạng chỉ sau một lần đọc đề.",
    "KN": "Sau phiếu này em trình bày bài sạch, dò soát đủ ba tầng và giảng lại "
          "được cho bạn trọng tâm **{tt}**.",
    "NC": "Sau phiếu này em giải đúng mọi bài **{tt}** ở dạng cho thẳng, và tự "
          "tìm ra dữ kiện khi đề giấu đi một phần.",
    "OT": "Sau phiếu này em làm đúng và đủ nhanh phần **{tt}** trong đề thi của "
          "chương, không mất điểm ở các bài quen thuộc.",
    "TH": "Phiếu này đo mức em thật sự đạt được sau trọn cụm **{cum}**; mục tiêu "
          "là từ 80/100 trở lên để đóng cụm.",
}
KHUNG_I = {
    "MOC": "Kiểm tra mốc không phải để xếp hạng, mà để em biết chỗ nào còn hổng khi vẫn còn kịp lấp.",
    "LT": "Hiểu gốc một lần thì không bao giờ phải học thuộc lại. Hôm nay em xây "
          "cái gốc ấy cho chương này.",
    "DB": "Đọc vị được đề là đã đi được nửa đường. Hôm nay em tập nhìn một đề lạ "
          "và gọi đúng tên nó trong mười giây.",
    "KN": "Điểm 10 không đến từ việc nghĩ ra lời giải, mà đến từ việc trình bày "
          "lời giải ấy không sai một dấu.",
    "NC": "Bài khó không khó vì em kém, mà vì em chưa gặp. Hôm nay em gặp đủ, "
          "để hôm thi không còn bài nào lạ.",
    "OT": "Trong phòng thi, người bình tĩnh là người đã làm dạng này nhiều lần. "
          "Hôm nay là một trong những lần ấy.",
    "TH": "Thi là dịp để em thấy mình đã chắc tới đâu. Sai ở đây còn kịp sửa, "
          "sai ở kỳ thi thật thì không.",
}
KHUNG_T = {
    "MOC": "Phần IV và V trải khắp các nhóm chuyên đề đã học: ai nắm hệ thống mới làm trọn được.",
    "LT": "Phần D và E là chỗ lộ ra ai học lý thuyết để hiểu, ai học để thuộc.",
    "DB": "Phần D và E là chỗ lộ ra ai đọc đề bằng dấu hiệu, ai đoán mò theo thói quen.",
    "KN": "Phần D và E là chỗ lộ ra ai hệ thống được cả chương trong một trang giấy.",
    "NC": "Bài IV.5 và V.4 là hai bài phát hiện tài năng: ai nhìn ra đại lượng "
          "không đổi trước khi tính là người có tư duy bất biến.",
    "OT": "Bài IV.4 và V.3 phân loại rõ nhất: cùng một đề, người giỏi mất ba phút, "
          "người chưa chắc mất mười lăm phút.",
    "TH": "Phần V dành riêng cho điểm 10: chỉ những em nắm bản chất mới giải trọn vẹn.",
}
KHUNG_A = {
    "MOC": "Làm hết phần dễ trước, khoanh bài khó lại. Còn 10 phút cuối thì dò ba tầng toàn bài.",
    "LT": "Vẽ xong sơ đồ tư duy chương rồi mới làm phần E. Không làm ngược.",
    "DB": "Trước mỗi bài, viết ra một dòng: “Đây là dạng …”. Không viết thì không giải.",
    "KN": "Soát ba tầng trước khi nộp: đơn vị → phép tính → đề hỏi gì.",
    "NC": "Vẽ sơ đồ hoặc tóm tắt trước khi tính — không bài nào được bỏ qua bước này.",
    "OT": "Bấm giờ đúng theo thời lượng từng phần. Hết giờ phần nào chuyển phần đó.",
    "TH": "Làm phần dễ trước, khoanh bài khó lại rồi quay lại sau. Không ngồi lì một bài.",
}


def gita4(loai: str, cum_ten: str, trong_tam: str) -> dict[str, str]:
    k = dict(cum=cum_ten, tt=trong_tam)
    return {"muc_tieu_G": KHUNG_G[loai].format(**k),
            "dong_luc_I": KHUNG_I[loai].format(**k),
            "tai_nang_T": KHUNG_T[loai].format(**k),
            "hanh_dong_A": KHUNG_A[loai].format(**k)}


# ───────────────────────────── sinh 25 bài của phiếu ─────────────────────────────

def sinh_25_bai(rng: random.Random, row: dict) -> list[list]:
    """Trả về 5 phần, mỗi phần 5 đối tượng Bai đã cân bằng số ý.

    Phần nào có trong bảng `PHAN_CAU_TRUC` thì được dựng thẳng từ dữ liệu của cụm
    (sơ đồ tư duy, bảng dạng bài, kỹ năng, thuyết trình); các phần còn lại rút bài
    từ ngân hàng mẫu theo đúng mức của phần.
    """
    loai, nhom, lop = row["loai"], row["nhom_ma"], row["lop"]
    dang = row.get("dang_bai") or [row["cum_ten"]]
    nhom_ds = NHOM_CUA_MOC.get(row["ma"], [nhom]) if nhom == "*" else [nhom]
    hs = ho_so_cum(rng, nhom_ds[0], lop)
    da_dung: set[str] = set()
    phan: list[list] = []
    for i, muc in enumerate(MUC_PHAN[loai]):
        dung = PHAN_CAU_TRUC.get((loai, i))
        if dung is not None:
            phan.append(dung(rng, row, hs))
            continue
        if len(nhom_ds) > 1:            # phiếu mốc: mỗi bài một nhóm chuyên đề khác nhau
            mau = []
            for k in range(5):
                g = nhom_ds[(i * 5 + k) % len(nhom_ds)]
                mau += chon_nam_mau(rng, g, muc, lop, dang, da_dung,
                                    uu_tien_bay=i >= 3)[:1]
        else:
            mau = chon_nam_mau(rng, nhom, muc, lop, dang, da_dung,
                               uu_tien_bay=i >= 3, so_lien_ket=1 if i >= 2 else 0)
        phan.append([m.tao(rng, lop) for m in mau])
    can_bang(rng, phan, row)
    return phan


def _tong_y(phan) -> int:
    return sum(b.so_y for p in phan for b in p)


def can_bang(rng: random.Random, phan, row) -> None:
    """Đưa tổng số ý về khoảng mục tiêu: cắt đuôi bài dài, sinh lại bài ngắn."""
    lop = row["lop"]
    # 1) quá dài → cắt bớt ý ở cuối những bài dài nhất và được phép cắt
    for _ in range(400):
        if _tong_y(phan) <= Y_HI:
            break
        ung = [(b.so_y, i, j) for i, p in enumerate(phan) for j, b in enumerate(p)
               if b.so_y > 4 and b.ma_mau not in KHONG_CAT and b.ma_mau != "META"]
        if not ung:
            break
        _, i, j = max(ung)
        phan[i][j].y = phan[i][j].y[:-1]
    # 2) quá ngắn → sinh lại bài ngắn nhất bằng hạt giống khác, giữ bản dài hơn
    het: set[tuple[int, int]] = set()
    for _ in range(200):
        if _tong_y(phan) >= Y_LO:
            break
        ung = [(b.so_y, i, j) for i, p in enumerate(phan) for j, b in enumerate(p)
               if b.ma_mau not in ("META", "") and (i, j) not in het]
        if not ung:
            break
        _, i, j = min(ung)
        bai_cu = phan[i][j]
        mau = MAU_THEO_MA.get(bai_cu.ma_mau)
        if mau is None:
            het.add((i, j))
            continue
        tot = bai_cu
        for _ in range(25):                  # thử nhiều hạt giống rồi mới bỏ cuộc
            thu = mau.tao(rng, lop)
            if thu.so_y > tot.so_y:
                tot = thu
                if tot.so_y >= 8:
                    break
        if tot.so_y > bai_cu.so_y:
            phan[i][j] = tot
        else:
            het.add((i, j))


# ─────────────────────────────── kết xuất Markdown ───────────────────────────────

TIEU_DE_PHIEU = {"MOC": "PHIẾU KIỂM TRA MỐC GITA", "LT": "PHIẾU HỌC GITA", "DB": "PHIẾU HỌC GITA", "KN": "PHIẾU HỌC GITA",
                 "NC": "PHIẾU HỌC GITA", "OT": "PHIẾU HỌC GITA", "TH": "PHIẾU THI CHƯƠNG GITA"}


def _yaml_khoi(v: str) -> str:
    """Ghi một đoạn văn nhiều dòng theo cú pháp YAML khối, thụt đúng hai mức."""
    dong, cur = [], ""
    for tu in v.split():
        if len(cur) + len(tu) + 1 > 84:
            dong.append(cur)
            cur = tu
        else:
            cur = f"{cur} {tu}".strip()
    dong.append(cur)
    return ">\n" + "\n".join("  " + d for d in dong)


def _yv(v) -> str:
    """Giá trị YAML an toàn: mọi chuỗi đều bọc nháy kép.

    Tên cụm có thể chứa dấu hai chấm (“Số tự nhiên: hàng, lớp…”) và mã nhóm của
    phiếu mốc là dấu sao — cả hai đều phá cú pháp YAML nếu để trần.
    """
    if isinstance(v, bool) or v is None:
        return '""' if v is None else str(v).lower()
    if isinstance(v, (int, float)):
        return str(v)
    return '"' + str(v).replace("\\", "\\\\").replace('"', '\\"') + '"'


def front_matter(row: dict, trong_tam: str, g4: dict) -> str:
    d = {
        "ma": row["ma"], "tuyen": row["tuyen"], "lop": row["lop"], "cum": row["cum"],
        "cum_ten": row["cum_ten"], "buoi_trong_cum": row.get("buoi_trong_cum") or 0,
        "loai": row["loai"], "loai_ten": row["loai_ten"], "nhom_ma": row["nhom_ma"],
        "nhom_ten": row["nhom_ten"], "ten": row["ten"], "trong_tam": trong_tam,
        "stt": row["stt"], "hoc_ky": row["hoc_ky"], "tuan": row["tuan"],
        "moc_kiem_tra": row.get("moc_kiem_tra", ""),
        "thoi_luong_phut": 90, "thang_diem": 100,
    }
    L = ["---"]
    for k, v in d.items():
        L.append(f"{k}: {_yv(v)}")
    for k in ("muc_tieu_G", "dong_luc_I", "tai_nang_T", "hanh_dong_A"):
        L.append(f"{k}: {_yaml_khoi(g4[k])}")
    L.append("---")
    return "\n".join(L)


def cong_thuc_nen(hs) -> list[str]:
    """Hộp công thức nền đầu phiếu, gom từ kiến thức gốc của chương."""
    thay, ds = set(), []
    for b in hs:
        k = b.pt_kien_thuc.strip()
        if k and k not in thay:
            thay.add(k)
            ds.append(k)
        if len(ds) == 4:
            break
    return ["> **KIẾN THỨC NỀN CỦA CHƯƠNG**"] + [f"> {i + 1}. {k}" for i, k in enumerate(ds)]


def dau_phieu(row: dict, trong_tam: str, hs) -> list[str]:
    tuyen_ten = row["tuyen_ten"]
    return [
        f"# {TIEU_DE_PHIEU[row['loai']]} · {row['ma']}", "",
        "**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · "
        "*Tư duy xuất sắc, Bản lĩnh dẫn đầu* · gita.edu.vn",
        f"{tuyen_ten} · Lớp {row['lop']} · Tuần {row['tuan']} · {row['hoc_ky']}"
        + (f" · Mốc {row['moc_kiem_tra']}" if row.get("moc_kiem_tra") else ""),
        (f"**{row['cum_ten']}** · Phiếu số {row['stt']}/100 · **{row['loai_ten']}**"
         if row["loai"] == "MOC" else
         f"**Cụm chuyên đề C{row['cum']:02d} — {row['cum_ten']}** · "
         f"Buổi {row['buoi_trong_cum']}/6 · **{row['loai_ten']}**"),
        (f"Phạm vi: **{row['nhom_ten']}**" if row["loai"] == "MOC"
         else f"Nhóm chuyên đề **{row['nhom_ma']} — {row['nhom_ten']}**"),
        f"**Trọng tâm phiếu: {trong_tam}**",
        "Thời gian làm bài: 90 phút · Thang điểm: 100 · Điểm sáng tạo tối đa: +5",
        f"Phiếu lời giải và phân tích chuyên sâu đi kèm: `{row['ma']}-GP`", "",
        "Họ và tên: ......................................... "
        "Lớp: ......... Điểm: ......../100", "",
    ] + cong_thuc_nen(hs) + ["", "---", ""]


def khoi_de(row: dict, phan) -> list[str]:
    khung = LOAI[row["loai"]]["cau_truc"]
    L: list[str] = []
    for i, (nhan, ten, phut, diem, _mo_ta) in enumerate(khung):
        muc = MUC_PHAN[row["loai"]][i]
        L += [f"## PHẦN {nhan} — {ten} · Mức {muc} — {MUC_TEN[muc]} · "
              f"{phut} phút · {diem} điểm", ""]
        for j, b in enumerate(phan[i]):
            L.append(f"### Bài {j + 1}. ({diem // 5} điểm) {b.tieu_de}")
            L.append("")
            if b.dan:
                L += [b.dan, ""]
            for k, (noi, _dap) in enumerate(b.y):
                L.append(f"{CHU_Y[k]}) {noi}")
            L.append("")
        L += ["---", ""]
    return L


def chon_bay(rng, phan) -> dict[tuple[int, int], str]:
    """Chọn 2–4 bài để đánh dấu BẪY, ưu tiên hai phần cuối."""
    uu = [(i, j, b.bay) for i in (3, 4) for j, b in enumerate(phan[i]) if b.bay]
    con = [(i, j, b.bay) for i in (0, 1, 2) for j, b in enumerate(phan[i]) if b.bay]
    ds = uu + con
    if len(ds) < 2:                       # chương không có mẫu cài bẫy: tự đặt bẫy
        them = [(4, j, phan[4][j].loi) for j in range(5)][:2 - len(ds)]
        ds = ds + them
    rng.shuffle(ds[:0])                   # giữ nguyên thứ tự ưu tiên
    lay = ds[:max(2, min(4, len(uu) or 2))]
    return {(i, j): b for i, j, b in lay}


def khoi_dap_an(row: dict, phan, bay: dict) -> list[str]:
    khung = LOAI[row["loai"]]["cau_truc"]
    L = ["## HƯỚNG DẪN GIẢI VÀ ĐÁP ÁN", "",
         "> Dành cho huấn luyện viên và phụ huynh. "
         "Không phát cho học sinh trước khi làm bài.", ""]
    for i, (nhan, *_r) in enumerate(khung):
        for j, b in enumerate(phan[i]):
            L.append(f"### Bài {nhan}.{j + 1}")
            dap = " · ".join(f"{CHU_Y[k]}) {d}" for k, (_n, d) in enumerate(b.y))
            L.append(f"**Đáp số:** {dap}")
            hg = b.huong_giai
            if (i, j) in bay:
                hg = f"BẪY — {bay[(i, j)]}. {hg}"
            L.append(f"**Hướng giải:** {hg}")
            L.append(f"**Nhãn tư duy:** {', '.join(b.td)}. Điểm chốt: {b.diem_chot}")
            L.append(f"**Lỗi thường gặp:** {b.loi} Phòng: {b.phong}")
            if i >= 3 and b.goi_y:
                L.append("**Gợi ý 3 tầng:** (1) {} — (2) {} — (3) {}".format(*b.goi_y))
            L.append("")
    L += ["---", "",
          "**Người biên soạn:** Ban chuyên môn Học viện GITA",
          "**Người giải thử:** ................................. "
          "Ngày giải thử: ......../......../..........",
          "**Phiên bản:** 2.0 · Chuẩn biên soạn phiếu GITA v2.0 · "
          "Đáp số do bộ sinh nội dung GITA tính, đã đối chiếu tự động.", ""]
    return L


def dung(row: dict, hat: int | None = None) -> dict:
    """Dựng nội dung một phiếu — dùng chung cho phiếu học và phiếu GP đi kèm.

    Hạt giống chốt theo mã phiếu nên sinh lại bao nhiêu lần cũng ra đúng phiếu ấy,
    và phiếu GP luôn khớp từng ý với phiếu học tương ứng.
    """
    rng = random.Random(hat if hat is not None else _hat(row["ma"]))
    dang = row.get("dang_bai") or [row["cum_ten"]]
    buoi = row.get("buoi_trong_cum") or 1
    trong_tam = dang[(buoi - 1) % len(dang)]
    hs = ho_so_cum(random.Random(_hat(row["ma"]) + 1), row["nhom_ma"], row["lop"])
    phan = sinh_25_bai(rng, row)
    bay = chon_bay(rng, phan)
    return {"phan": phan, "bay": bay, "trong_tam": trong_tam, "hs": hs}


def render(row: dict, hat: int | None = None) -> str:
    """Kết xuất trọn một phiếu học (đề + hướng dẫn giải) ra Markdown."""
    n = dung(row, hat)
    phan, bay, trong_tam, hs = n["phan"], n["bay"], n["trong_tam"], n["hs"]
    L = [front_matter(row, trong_tam, gita4(row["loai"], row["cum_ten"], trong_tam)), ""]
    L += dau_phieu(row, trong_tam, hs)
    L += khoi_de(row, phan)
    L += khoi_dap_an(row, phan, bay)
    return "\n".join(L).rstrip() + "\n"


def _hat(ma: str) -> int:
    """Hạt giống ổn định theo mã phiếu: sinh lại nhiều lần vẫn ra đúng phiếu ấy."""
    h = 0
    for c in ma:
        h = (h * 131 + ord(c)) % 1_000_003
    return h
