#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dựng website công khai của MATH TIỂU HỌC 365 từ kho học liệu.

    python3 04-cong-cu/build_site.py            # dựng vào 11-seo/site/
    python3 04-cong-cu/build_site.py --ra /tmp/thu

Kiến trúc đường dẫn — mỗi tầng là một tầng chủ đề, không phải một tầng thư mục
tuỳ tiện. Cỗ máy tìm kiếm đọc đường dẫn như đọc mục lục:

    /                                          trang chủ
    /toan-lop-4/                               trụ của một lớp
    /toan-lop-4/toan-co-loi-van/               trụ của một nhóm chuyên đề
    /toan-lop-4/toan-co-loi-van/tong-hieu/     một dạng bài  ← trang chủ lực
    /toan-lop-4/chuyen-de/c03-.../             một cụm sáu buổi
    /phieu/gita-t1-l4-c03-nc/                  một phiếu học
    /phieu/gita-t1-l4-c03-nc/loi-giai/         lời giải phiếu ấy
    /on-chac/gita-t1-l4-c03/                   phiếu hướng dẫn ôn chắc
    /doc-vi/toan-co-loi-van-lop-4/             sơ đồ đọc vị
    /lo-trinh/tuyen-1-lop-4/                   lộ trình 34 tuần
    /thi-vao-6/ams/                            trang cho một trường

Trang dạng bài là trang chủ lực vì đó là chỗ GITA có thứ người khác không có:
538 dạng bài đã được gọi tên, mỗi dạng có mẫu bài tự sinh được ví dụ **có số
thật** kèm lời giải từng bước và bảng phân tích sáu cột. Trang đối thủ ở nhóm ý
định này phần lớn là một đoạn giới thiệu ngắn rồi một nút tải tệp PDF.
"""
from __future__ import annotations

import argparse
import json
import random
import re
import shutil
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(GOC / "04-cong-cu"))

import sinh                                                    # noqa: E402,F401
from sinh.khung import KHO, khong_dau                          # noqa: E402
from lap.chon import diem_khop                                 # noqa: E402
from lap import seo                                            # noqa: E402
from data.nhom_chuyen_de import NHOM                           # noqa: E402
from data.tu_khoa import (Y_DINH, NHOM_TU_KHOA, TRUONG, DUOI,  # noqa: E402
                          MAU_TIEU_DE, MAU_MO_TA)
from render_html import md, inline                             # noqa: E402

NGAY = date.today().isoformat()

# Phiếu cho đọc trọn vẹn: đây là phần miễn phí, và cũng là phần đi vào chỉ mục
# đầy đủ. Các loại còn lại vẫn vào chỉ mục nhưng khai báo có phần phải trả tiền.
LOAI_MO = {"LT", "DB"}
# Số phần hiện công khai ở phiếu có thu phí. Hai phần đầu là mức M1–M2, đủ để
# người đọc đánh giá chất lượng mà không phát không phần phân hoá học sinh giỏi.
SO_PHAN_MO = 2

TEN_LOAI_NGAN = {
    "LT": "Lý thuyết", "DB": "Dạng bài & Đọc vị", "KN": "Kỹ năng & Phương pháp",
    "NC": "Luyện nâng cao", "OT": "Ôn thi", "TH": "Thi chương",
    "MOC": "Kiểm tra mốc", "HD": "Hướng dẫn ôn chắc",
}
# Tên loại buổi viết ngắn, chỉ dùng trong tiêu đề trang. Tiêu đề chỉ có 60 ký
# tự; tên loại dài sẽ ăn hết chỗ của tên chuyên đề — mà tên chuyên đề mới là
# phần chứa từ khoá người ta gõ.
TEN_LOAI_TIEU_DE = {
    "LT": "Lý thuyết", "DB": "Nhận dạng bài", "KN": "Kỹ năng", "NC": "Nâng cao",
    "OT": "Ôn thi", "TH": "Thi chương", "MOC": "Kiểm tra mốc", "HD": "Ôn chắc",
}
# Tuyến 2 là tuyến luyện thi chất lượng cao. Ghi thêm "CLC" vào tiêu đề vừa
# phân biệt được hai tuyến cùng tên chuyên đề, vừa đúng chữ phụ huynh hay gõ.
TUYEN_NHAN = {"T1": "", "T2": " CLC"}

LOAI_HOC_LIEU = {
    "LT": "Bài giảng lý thuyết", "DB": "Bảng nhận dạng bài",
    "KN": "Bài luyện kỹ năng", "NC": "Bài tập nâng cao",
    "OT": "Đề ôn tập", "TH": "Đề kiểm tra", "MOC": "Đề kiểm tra định kỳ",
    "HD": "Tài liệu hướng dẫn tự học",
}


# ─────────────────────────────── TIỆN ÍCH ───────────────────────────────

def doc(p: Path) -> str:
    return p.read_text(encoding="utf-8")


def tach_fm(text: str) -> tuple[dict, str]:
    """Tách phần khai báo YAML đầu tệp khỏi phần thân."""
    if not text.startswith("---"):
        return {}, text
    i = text.index("\n---", 3)
    fm, than = text[3:i], text[i + 4:]
    d, khoa, gom = {}, None, []
    for dong in fm.split("\n"):
        m = re.match(r'^(\w+):\s*(.*)$', dong)
        if m and not dong.startswith(" "):
            if khoa:
                d[khoa] = " ".join(gom).strip()
            k, v = m.group(1), m.group(2).strip()
            if v == ">":
                khoa, gom = k, []
            else:
                khoa = None
                d[k] = v.strip('"')
        elif khoa is not None and dong.strip():
            gom.append(dong.strip())
    if khoa:
        d[khoa] = " ".join(gom).strip()
    return d, than.lstrip("\n")


def bo_dau_trang(than: str) -> str:
    """Bỏ khối đầu phiếu (tên phiếu, ô điền họ tên) — đó là thứ của bản in giấy."""
    i = than.find("\n## ")
    return than[i:] if i > 0 else than


def cat_phan(than: str) -> list[tuple[str, str]]:
    """Cắt thân phiếu thành từng phần theo tiêu đề `## PHẦN …`."""
    vt = [m.start() for m in re.finditer(r"^## ", than, re.M)]
    if not vt:
        return [("", than)]
    ra = []
    for i, v in enumerate(vt):
        het = vt[i + 1] if i + 1 < len(vt) else len(than)
        khoi = than[v:het]
        ra.append((khoi.split("\n", 1)[0][3:].strip(), khoi))
    return ra


def dem_chu(html_: str) -> int:
    return len(re.sub(r"<[^>]+>", " ", html_).split())


def bang_cuon(h: str) -> str:
    """Bọc mọi bảng trong khung cuộn ngang, để thân trang không bao giờ trượt ngang."""
    return re.sub(r"(<table>.*?</table>)", r'<div class="cuon">\1</div>', h, flags=re.S)


def the_lien_ket(muc: list[tuple[str, str, str]]) -> str:
    """Khối thẻ điều hướng — đây là đường đi của uy tín trang trong nội bộ site."""
    if not muc:
        return ""
    return '<ul class="the">' + "".join(
        f'<li><a href="{dd}"><b>{seo.esc(ten)}</b><span>{seo.esc(mo)}</span></a></li>'
        for ten, mo, dd in muc) + "</ul>"


# ─────────────────────── SINH VÍ DỤ CHO TRANG DẠNG BÀI ───────────────────────

def mau_khop(lop: int, nhom: str, dang: str) -> list:
    """Các mẫu bài của kho khớp với một dạng bài, sắp theo mức khớp giảm dần."""
    kd = khong_dau(dang)
    ra = []
    for muc in ("M1", "M2", "M3", "M4", "M5"):
        for m in KHO.get(nhom, {}).get(muc, []):
            if lop in m.lop:
                d = diem_khop(m, kd)
                if d > 0:
                    ra.append((d, muc, m))
    ra.sort(key=lambda x: (-x[0], x[1]))
    return ra


def vi_du(lop: int, nhom: str, dang: str, so: int = 3) -> list[dict]:
    """Dựng tối đa `so` ví dụ có lời giải đầy đủ cho một dạng bài.

    Hạt giống chốt theo tên dạng bài nên trang dựng lại lần nào cũng ra đúng ví
    dụ ấy. Điều này quan trọng với tìm kiếm: nội dung đổi mỗi lần dựng lại sẽ
    làm cỗ máy phải đánh giá lại trang và làm mất lịch sử xếp hạng.
    """
    khop = mau_khop(lop, nhom, dang)
    if not khop:
        return []
    # Mỗi ví dụ lấy ở một mức khác nhau, để trang đi từ dễ tới khó.
    theo_muc: dict[str, list] = defaultdict(list)
    for d, muc, m in khop:
        theo_muc[muc].append((d, m))
    ra = []
    for muc in ("M1", "M2", "M3", "M4", "M5"):
        if muc not in theo_muc or len(ra) >= so:
            continue
        d, m = max(theo_muc[muc], key=lambda x: x[0])
        rng = random.Random(f"{dang}|{lop}|{m.ma}")
        try:
            b = m.sinh(rng, lop)
        except Exception:
            continue
        ra.append({"muc": muc, "bai": b, "ma": m.ma, "diem": d})
    # Nếu chỉ có một mức, lấy thêm mẫu khác cùng mức để trang không quá mỏng.
    if len(ra) < 2:
        for d, muc, m in khop:
            if len(ra) >= so or any(x["ma"] == m.ma for x in ra):
                continue
            rng = random.Random(f"{dang}|{lop}|{m.ma}")
            try:
                ra.append({"muc": muc, "bai": m.sinh(rng, lop), "ma": m.ma,
                           "diem": d})
            except Exception:
                continue
    return ra[:so]


MUC_TEN = {"M1": "Nhận biết", "M2": "Thông hiểu", "M3": "Vận dụng",
           "M4": "Vận dụng cao", "M5": "Điểm 10 — phân hoá"}


def khoi_vi_du(v: dict, stt: int) -> str:
    """Kết xuất một ví dụ: đề → các bước giải → bảng phân tích → lỗi hay mắc."""
    b = v["bai"]
    y = "".join(f'<div class="y">{inline(f"{chr(97 + i)}) {de}")}</div>'
                for i, (de, _) in enumerate(b.y))
    buoc = "".join(f"<li>{inline(x)}</li>" for x in b.cac_buoc)
    dap = "".join(f"<tr><td>{inline(chr(97 + i) + ')')}</td><td>{inline(dp)}</td></tr>"
                  for i, (_, dp) in enumerate(b.y))
    pt = (f"<tr><td>{inline(b.pt_dang)}</td><td>{inline(b.pt_kien_thuc)}</td>"
          f"<td>{inline(b.pt_du_lieu)}</td><td>{inline(b.pt_phuong_phap)}</td>"
          f"<td>{inline(b.pt_nhanh)}</td></tr>")
    loi = (f"<p><strong>Lỗi hay mắc:</strong> {inline(b.loi)}</p>" if b.loi else "")
    # Bài tự luyện để trong thẻ <details>: người đọc thử trước rồi mới mở đáp số.
    # Nội dung trong <details> vẫn nằm trong HTML nên cỗ máy tìm kiếm vẫn đọc được.
    de_tt, dap_tt = (b.tuong_tu if isinstance(b.tuong_tu, (tuple, list))
                     else (b.tuong_tu, ""))
    tt = (f"<h4>Bài tự luyện</h4><p>{inline(de_tt)}</p>"
          + (f"<details><summary>Xem đáp số</summary><p>{inline(dap_tt)}</p></details>"
             if dap_tt else "")) if de_tt else ""
    return f"""<section class="vd">
<h3>Ví dụ {stt}. {seo.esc(b.tieu_de)}
  <span class="nhan">{v['muc']} · {MUC_TEN[v['muc']]}</span></h3>
{f'<p>{inline(b.dan)}</p>' if b.dan else ''}
{y}
<h4>Các bước giải</h4>
<ol>{buoc}</ol>
<h4>Đáp số từng ý</h4>
<div class="cuon"><table><thead><tr><th>Ý</th><th>Đáp số</th></tr></thead>
<tbody>{dap}</tbody></table></div>
<h4>Bảng phân tích</h4>
<div class="cuon"><table><thead><tr><th>Dạng bài</th><th>Kiến thức liên quan</th>
<th>Dữ liệu nhận biết</th><th>Phương pháp áp dụng</th><th>Cách xử lý nhanh nhất</th>
</tr></thead><tbody>{pt}</tbody></table></div>
{loi}{tt}</section>"""


# ─────────────────────────────── BỘ DỰNG ───────────────────────────────

class Site:
    def __init__(self, ra: Path):
        self.ra = ra
        self.rows = json.loads(doc(GOC / "02-chi-muc" / "index-master.json"))
        self.trang: list[tuple[str, float]] = []      # (đường dẫn, độ ưu tiên)
        self.tieu_de: dict[str, str] = {}
        self.tu_khoa_chinh: dict[str, str] = {}       # từ khoá → đường dẫn nhận nó
        self.mong: list[tuple[str, int]] = []         # trang dưới ngưỡng nội dung

        self.hoc = [r for r in self.rows if r["loai"] not in ("GP", "HD")]
        self.gp = {r["ma"]: r for r in self.rows if r["loai"] == "GP"}
        self.hd = {r["ma"]: r for r in self.rows if r["loai"] == "HD"}
        self.theo_ma = {r["ma"]: r for r in self.rows}

        # dạng bài duy nhất theo (lớp, nhóm) → các cụm chứa nó
        self.dang: dict[tuple[int, str, str], list[dict]] = defaultdict(list)
        for r in self.hoc:
            if r.get("nhom_ma") in (None, "*"):
                continue
            for d in r.get("dang_bai") or []:
                self.dang[(r["lop"], r["nhom_ma"], d)].append(r)

    # ── ghi ──────────────────────────────────────────────────────────────
    def ghi(self, dd: str, html_: str, uu_tien: float, tieu_de: str,
            tu_khoa: str | None = None, nguong: int = 0) -> None:
        p = self.ra / dd.strip("/") / "index.html" if dd != "/" else self.ra / "index.html"
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(html_, encoding="utf-8")
        self.trang.append((dd, uu_tien))
        self.tieu_de[dd] = tieu_de
        if tu_khoa:
            if tu_khoa in self.tu_khoa_chinh:
                raise SystemExit(
                    f"Hai trang cùng nhận một từ khoá chính: {tu_khoa!r}\n"
                    f"  {self.tu_khoa_chinh[tu_khoa]}\n  {dd}")
            self.tu_khoa_chinh[tu_khoa] = dd
        if nguong:
            n = dem_chu(html_)
            if n < nguong:
                self.mong.append((dd, n))

    # ── đường dẫn ────────────────────────────────────────────────────────
    @staticmethod
    def dd_lop(lop: int) -> str:
        return f"/toan-lop-{lop}/"

    @staticmethod
    def dd_nhom(lop: int, g: str) -> str:
        return f"/toan-lop-{lop}/{seo.slug(NHOM[g]['ten'])}/"

    def dd_dang(self, lop: int, g: str, dang: str) -> str:
        return self.dd_nhom(lop, g) + seo.slug(dang) + "/"

    @staticmethod
    def dd_cum(lop: int, cum: int, ten: str) -> str:
        return f"/toan-lop-{lop}/chuyen-de/c{cum:02d}-{seo.slug(ten)}/"

    @staticmethod
    def dd_phieu(ma: str) -> str:
        return f"/phieu/{ma.lower()}/"

    @staticmethod
    def dd_on_chac(ma: str) -> str:
        return f"/on-chac/{ma.lower().removesuffix('-hd')}/"

    @staticmethod
    def dd_doc_vi(lop: int, g: str) -> str:
        return f"/doc-vi/{seo.slug(NHOM[g]['ten'])}-lop-{lop}/"

    @staticmethod
    def dd_de(ma: str) -> str:
        return f"/de-thi/{ma.lower()}/"

    @staticmethod
    def dd_lo_trinh(tuyen: str, lop: int) -> str:
        return f"/lo-trinh/tuyen-{tuyen[-1]}-lop-{lop}/"

    # ── khối dùng lại ────────────────────────────────────────────────────
    def khoi_hoi_dap(self, g: str, lop: int, dd: str) -> tuple[str, dict]:
        """Khối câu hỏi thường gặp, lấy từ bản đồ từ khoá.

        Đây là chỗ trả lời đúng câu phụ huynh gõ vào ô tìm kiếm. Câu trả lời
        viết đủ ý ngay tại đây, không bắt bấm sang trang khác — trang trả lời
        trọn câu hỏi là trang cỗ máy tìm kiếm ưu tiên.
        """
        cap = [(h.format(lop=lop), a) for h, a in NHOM_TU_KHOA[g]["hoi"]]
        than = "<h2>Câu hỏi thường gặp</h2>" + "".join(
            f"<h3>{seo.esc(h)}</h3>{md(a)}" for h, a in cap)
        return than, seo.cau_hoi(cap, dd)

    def phieu_cua_dang(self, lop: int, g: str, dang: str) -> list:
        return sorted(self.dang[(lop, g, dang)], key=lambda r: (r["tuyen"], r["stt"]))

    # ── 1. trang dạng bài (trang chủ lực) ────────────────────────────────
    def lam_dang_bai(self) -> None:
        for (lop, g, dang), rs in sorted(self.dang.items()):
            dd = self.dd_dang(lop, g, dang)
            vd = vi_du(lop, g, dang)
            nhom_ten = NHOM[g]["ten"]
            tieu_de = seo.ghep_tieu_de(f"{dang} lớp {lop}", " có lời giải", DUOI)
            mo_ta = seo.rut(MAU_MO_TA["dang_bai"].format(dang=dang, lop=lop), 158)

            mo = (f"<p>Đây là một dạng bài thuộc nhóm "
                  f"<a href=\"{self.dd_nhom(lop, g)}\">{seo.esc(nhom_ten)}</a> của "
                  f"chương trình toán lớp {lop}. Dưới đây là "
                  f"{'ví dụ' if len(vd) == 1 else f'{len(vd)} ví dụ'} có lời giải "
                  f"đi từng bước, bảng phân tích cho biết nhìn vào đâu để nhận ra "
                  f"dạng này, và danh sách phiếu học luyện sâu dạng ấy.</p>")

            # Dấu hiệu đọc vị rút từ chính các mẫu bài — không viết lại bằng tay,
            # nên không bao giờ lệch với đề mà học sinh gặp trong phiếu.
            # Dấu hiệu đọc vị chỉ lấy từ ví dụ **khớp đích danh dạng bài** (từ 5
            # điểm trở lên trong thang của `diem_khop`). Ví dụ chỉ khớp mềm qua
            # vài từ khoá vẫn đáng đưa lên trang để luyện thêm, nhưng dấu hiệu
            # nhận biết của nó là dấu hiệu của một dạng khác — in vào mục này là
            # dạy học sinh đọc vị sai, đúng thứ trang này sinh ra để chữa.
            # Bảng dấu hiệu ghi rõ **dấu hiệu ấy thuộc ví dụ nào và dạng nào**.
            # Gộp dấu hiệu của mọi ví dụ thành một danh sách vô danh là sai: khi
            # kho chưa có mẫu khớp đích danh, ví dụ khớp gần nhất có thể thuộc
            # một dạng lân cận, và dấu hiệu của nó in trần ra sẽ dạy học sinh
            # đọc vị sai — đúng thứ trang này sinh ra để chữa. Ghi kèm tên dạng
            # thì thông tin vẫn đúng, và người đọc còn học được cách phân biệt
            # hai dạng đứng cạnh nhau.
            hang = []
            for i, v in enumerate(vd):
                b = v["bai"]
                if b.pt_du_lieu:
                    hang.append(f"<tr><td>Ví dụ {i + 1}</td>"
                                f"<td>{inline(b.pt_dang)}</td>"
                                f"<td>{inline(b.pt_du_lieu)}</td></tr>")
            khoi_dh = ""
            if hang:
                khoi_dh = (
                    "<h2>Nhìn vào đâu để biết đề đang hỏi dạng nào</h2>"
                    "<p>Đọc cột dấu hiệu trước, rồi mới đọc cột tên dạng. Đó đúng "
                    "là thứ tự học sinh phải làm khi cầm một đề lạ.</p>"
                    '<div class="cuon"><table><thead><tr><th>Ở ví dụ</th>'
                    "<th>Đề đang hỏi dạng</th><th>Dấu hiệu nhận ra</th></tr></thead>"
                    f"<tbody>{''.join(hang)}</tbody></table></div>"
                    f'<p>Cách đọc đề của cả nhóm {seo.esc(nhom_ten)} được vẽ thành '
                    f'cây quyết định ở <a href="{self.dd_doc_vi(lop, g)}">sơ đồ đọc '
                    f'vị nhóm này</a>.</p>')

            than = mo + khoi_dh
            if vd:
                than += "<h2>Ví dụ có lời giải</h2>"
                than += "".join(khoi_vi_du(v, i + 1) for i, v in enumerate(vd))
            else:
                than += ("<p>Dạng bài này hiện được luyện trực tiếp trong các phiếu "
                         "dưới đây.</p>")

            # Liên kết sang phiếu — đường đi tự nhiên từ trang miễn phí vào sản phẩm.
            ps = self.phieu_cua_dang(lop, g, dang)
            if ps:
                than += "<h2>Phiếu học luyện dạng này</h2>"
                than += the_lien_ket([
                    (f"{r['cum_ten']} · {TEN_LOAI_NGAN.get(r['loai'], r['loai'])}",
                     f"Tuyến {r['tuyen'][-1]} · tuần {r['tuan']} · 90 phút",
                     self.dd_phieu(r["ma"])) for r in ps[:8]])

            hd, ld_faq = self.khoi_hoi_dap(g, lop, dd)
            than += hd

            # Dạng bài cùng nhóm — liên kết ngang giữ người đọc ở lại site.
            anh_em = [d for (l2, g2, d) in self.dang if l2 == lop and g2 == g
                      and d != dang]
            if anh_em:
                than += "<h2>Dạng bài khác cùng nhóm</h2>" + the_lien_ket([
                    (d, f"Lớp {lop} · {nhom_ten}", self.dd_dang(lop, g, d))
                    for d in sorted(anh_em)[:9]])

            vet = [("Trang chủ", "/"), (f"Toán lớp {lop}", self.dd_lop(lop)),
                   (nhom_ten, self.dd_nhom(lop, g)), (seo.rut(dang, 48), dd)]
            self.ghi(dd, seo.trang(
                dd=dd, tieu_de=tieu_de, mo_ta=mo_ta,
                h1=f"{dang} — lớp {lop}", than=bang_cuon(than), vet=vet, ngay=NGAY,
                muc_dang=self.dd_lop(lop),
                json_ld=[seo.duong_dan_dieu_huong(vet),
                         seo.hoc_lieu(dang, mo_ta, dd, lop, NGAY,
                                      "Bài giảng một dạng bài"),
                         ld_faq]),
                0.9, tieu_de, nguong=340)

    # ── 2. trang nhóm chuyên đề của một lớp ──────────────────────────────
    def lam_nhom(self) -> None:
        for lop in (3, 4, 5):
            for g in "ABCDEFGH":
                ds = sorted(d for (l2, g2, d) in self.dang if l2 == lop and g2 == g)
                if not ds:
                    continue
                dd = self.dd_nhom(lop, g)
                tk = NHOM_TU_KHOA[g]["chinh"].format(lop=lop)
                nhom_ten = NHOM[g]["ten"]
                tieu_de = seo.ghep_tieu_de(tk[0].upper() + tk[1:], DUOI)
                mo_ta_ngan = NHOM[g]["mo_ta"].split(".")[0] + "."
                mo_ta = seo.rut(MAU_MO_TA["nhom"].format(
                    mo_ta_ngan=mo_ta_ngan, so_dang=len(ds), lop=lop), 158)

                cums = sorted({(r["cum"], r["cum_ten"]) for r in self.hoc
                               if r["lop"] == lop and r.get("nhom_ma") == g})
                than = (f"<p>{inline(NHOM[g]['mo_ta'])}</p>"
                        f"<p>Ở lớp {lop}, nhóm này gồm <strong>{len(ds)} dạng bài"
                        f"</strong> nằm trong {len(cums)} chuyên đề. Mỗi dạng có "
                        f"trang riêng với ví dụ có lời giải từng bước và bảng phân "
                        f"tích. Nếu chưa biết đề đang hỏi dạng nào, bắt đầu từ "
                        f"<a href=\"{self.dd_doc_vi(lop, g)}\">sơ đồ đọc vị</a>.</p>")
                than += "<h2>Tất cả dạng bài</h2>" + the_lien_ket(
                    [(d, f"Lớp {lop}", self.dd_dang(lop, g, d)) for d in ds])
                if cums:
                    than += "<h2>Chuyên đề chứa nhóm này</h2>" + the_lien_ket(
                        [(t, f"Chuyên đề C{c:02d} · sáu buổi 90 phút",
                          self.dd_cum(lop, c, t)) for c, t in cums])
                hd, ld_faq = self.khoi_hoi_dap(g, lop, dd)
                than += hd

                vet = [("Trang chủ", "/"), (f"Toán lớp {lop}", self.dd_lop(lop)),
                       (nhom_ten, dd)]
                self.ghi(dd, seo.trang(
                    dd=dd, tieu_de=tieu_de, mo_ta=mo_ta,
                    h1=f"{nhom_ten} — toán lớp {lop}", than=bang_cuon(than),
                    vet=vet, ngay=NGAY, muc_dang=self.dd_lop(lop),
                    json_ld=[seo.duong_dan_dieu_huong(vet),
                             seo.khoa_hoc(f"{nhom_ten} lớp {lop}", mo_ta, dd,
                                          lop, len(cums) * 6),
                             ld_faq]),
                    0.8, tieu_de, tu_khoa=tk, nguong=300)

    # ── 3. trang chuyên đề (cụm sáu buổi) ────────────────────────────────
    def lam_cum(self) -> None:
        cums = defaultdict(list)
        for r in self.hoc:
            if r["loai"] != "MOC":
                cums[(r["lop"], r["tuyen"], r["cum"], r["cum_ten"])].append(r)
        for (lop, tuyen, cum, ten), rs in sorted(cums.items()):
            rs.sort(key=lambda r: r.get("buoi_trong_cum", 0))
            dd = self.dd_cum(lop, cum, ten)
            if dd in self.tieu_de:            # hai tuyến trùng tên cụm
                dd = dd[:-1] + f"-tuyen-{tuyen[-1]}/"
            g = rs[0].get("nhom_ma")
            ds = sorted({d for r in rs for d in r.get("dang_bai") or []})
            tieu_de = seo.ghep_tieu_de(f"{ten}", DUOI,
                                       giu=f" — lớp {lop}{TUYEN_NHAN[tuyen]}")
            mo_ta = seo.rut(MAU_MO_TA["cum"].format(
                cum_ten=ten, lop=lop, so_dang=len(ds)), 158)

            than = (f"<p>Chuyên đề <strong>{seo.esc(ten)}</strong> của lớp {lop} "
                    f"được học trong <strong>sáu buổi 90 phút</strong>, đi theo "
                    f"đúng một thứ tự: hiểu lý thuyết, nhận ra dạng bài, luyện kỹ "
                    f"năng, lên nâng cao, ôn lại, rồi thi chương. Mỗi buổi có phiếu "
                    f"lời giải riêng.</p>")
            than += "<h2>Sáu buổi của chuyên đề</h2>" + the_lien_ket([
                (f"Buổi {r.get('buoi_trong_cum', '?')} · "
                 f"{TEN_LOAI_NGAN.get(r['loai'], r['loai'])}",
                 seo.rut(r.get("ten", ""), 74), self.dd_phieu(r["ma"]))
                for r in rs])
            ma_hd = f"{rs[0]['ma'].rsplit('-', 1)[0]}-HD"
            if ma_hd in self.hd:
                than += ('<p><a href="' + self.dd_on_chac(ma_hd) +
                         '">Phiếu hướng dẫn ôn chắc chuyên đề này</a> — dùng khi ôn '
                         'lại trước kỳ thi.</p>')
            if ds and g:
                than += "<h2>Dạng bài của chuyên đề</h2>" + the_lien_ket([
                    (d, f"Lớp {lop}", self.dd_dang(lop, g, d))
                    for d in ds if (lop, g, d) in self.dang])

            vet = [("Trang chủ", "/"), (f"Toán lớp {lop}", self.dd_lop(lop)),
                   (seo.rut(ten, 46), dd)]
            self.ghi(dd, seo.trang(
                dd=dd, tieu_de=tieu_de, mo_ta=mo_ta,
                h1=f"{ten} — lớp {lop}", than=bang_cuon(than), vet=vet, ngay=NGAY,
                muc_dang=self.dd_lop(lop),
                json_ld=[seo.duong_dan_dieu_huong(vet),
                         seo.khoa_hoc(f"{ten} lớp {lop}", mo_ta, dd, lop, 6)]),
                0.7, tieu_de, nguong=200)

    # ── 4. trang phiếu học và trang lời giải ─────────────────────────────
    def lam_phieu(self) -> None:
        for r in self.hoc:
            p = (GOC / "03-phieu" / r["tuyen"] / f"L{r['lop']}" / f"{r['ma']}.md")
            if not p.exists():
                continue
            fm, than = tach_fm(doc(p))
            phan = cat_phan(bo_dau_trang(than))
            dd = self.dd_phieu(r["ma"])
            lop, loai = r["lop"], r["loai"]
            mo = loai in LOAI_MO
            ten_ngan = f"{r.get('cum_ten', '')} · {TEN_LOAI_NGAN.get(loai, loai)}"
            tieu_de = seo.ghep_tieu_de(
                r.get("cum_ten", ""), DUOI,
                giu=f" lớp {lop} · {TEN_LOAI_TIEU_DE.get(loai, loai)}"
                    f"{TUYEN_NHAN[r['tuyen']]}")
            trong_tam = (fm.get("trong_tam") or r.get("ten", "")).rstrip(".") + "."
            mo_ta = seo.rut(
                f"Buổi {TEN_LOAI_NGAN.get(loai, loai).lower()} của chuyên đề "
                f"{r.get('cum_ten', '')} lớp {lop}, tuyến {r['tuyen'][-1]}. "
                f"{trong_tam} Phiếu 90 phút, thang 100, có lời giải đi kèm.", 158)

            dau = (f"<p>Phiếu <strong>{seo.esc(TEN_LOAI_NGAN.get(loai, loai))}"
                   f"</strong> của chuyên đề <em>{seo.esc(r.get('cum_ten', ''))}</em>, "
                   f"lớp {lop}, tuyến {r['tuyen'][-1]}. Làm trong 90 phút, thang "
                   f"điểm 100, năm phần đi từ nhận biết tới mức phân hoá.</p>")
            if fm.get("muc_tieu_G"):
                dau += f'<div class="tom"><p><strong>Sau phiếu này em làm được gì:</strong> ' \
                       f'{inline(fm["muc_tieu_G"])}</p></div>'

            hien = phan if mo else phan[:SO_PHAN_MO]
            an = [] if mo else phan[SO_PHAN_MO:]
            than_html = (dau + '<section class="vd">'
                         + "\n".join(md(k) for _, k in hien) + "</section>")
            if an:
                ten_an = ", ".join(t.split("·")[0].strip() for t, _ in an)
                than_html += (
                    f'<div class="che" id="phan-tra-phi">'
                    f'<h2>Còn {len(an)} phần nữa của phiếu này</h2>'
                    f'<p>{seo.esc(ten_an)} — đây là các phần mức vận dụng và phân '
                    f'hoá, dành cho học viên đang theo chương trình. Hai phần đầu ở '
                    f'trên là bản đọc thử đầy đủ, không cắt xén.</p>'
                    f'<p><a href="/dang-ky/">Xem cách tham gia chương trình</a> · '
                    + (f'<a href="{self.dd_cum(lop, r["cum"], r["cum_ten"])}">'
                       f'Về chuyên đề</a>' if loai != "MOC"
                       else f'<a href="{self.dd_lop(lop)}">Về toán lớp {lop}</a>')
                    + '</p></div>')

            ma_gp = f"{r['ma']}-GP"
            if ma_gp in self.gp:
                than_html += (f'<p><a href="{dd}loi-giai/"><strong>Xem lời giải và '
                              f'bảng phân tích chuyên sâu của phiếu này</strong></a></p>')
            g = r.get("nhom_ma")
            ds = [d for d in (r.get("dang_bai") or []) if (lop, g, d) in self.dang]
            if ds:
                than_html += "<h2>Dạng bài có trong phiếu</h2>" + the_lien_ket(
                    [(d, f"Lớp {lop}", self.dd_dang(lop, g, d)) for d in ds])

            vet = [("Trang chủ", "/"), (f"Toán lớp {lop}", self.dd_lop(lop))]
            if loai != "MOC":
                vet.append((seo.rut(r.get("cum_ten", ""), 40),
                            self.dd_cum(lop, r["cum"], r["cum_ten"])))
            vet.append((r.get("cum_ten") if loai == "MOC"
                        else TEN_LOAI_NGAN.get(loai, loai), dd))
            self.ghi(dd, seo.trang(
                dd=dd, tieu_de=tieu_de, mo_ta=mo_ta,
                h1=r.get("ten", ten_ngan), than=bang_cuon(than_html), vet=vet,
                ngay=NGAY, muc_dang=self.dd_lop(lop),
                json_ld=[seo.duong_dan_dieu_huong(vet),
                         seo.hoc_lieu(r.get("ten", ten_ngan), mo_ta, dd, lop, NGAY,
                                      LOAI_HOC_LIEU.get(loai, "Phiếu bài tập"),
                                      mien_phi=mo,
                                      o_che="#phan-tra-phi" if an else None,
                                      thoi_luong="PT90M")]),
                0.6 if mo else 0.5, tieu_de, nguong=200)

            if ma_gp in self.gp:
                self.lam_loi_giai(self.gp[ma_gp], r, dd, mo)

    def lam_loi_giai(self, gr: dict, hr: dict, dd_phieu: str, mo: bool) -> None:
        p = (GOC / "03-phieu" / gr["tuyen"] / f"L{gr['lop']}" / f"{gr['ma']}.md")
        if not p.exists():
            return
        fm, than = tach_fm(doc(p))
        phan = cat_phan(bo_dau_trang(than))
        dd = dd_phieu + "loi-giai/"
        lop = gr["lop"]
        tieu_de = seo.ghep_tieu_de(
            f"Lời giải {hr.get('cum_ten', '')}", DUOI,
            giu=f" lớp {lop} · {TEN_LOAI_TIEU_DE.get(hr['loai'], hr['loai'])}"
                f"{TUYEN_NHAN[hr['tuyen']]}")
        mo_ta = seo.rut(
            f"Lời giải đầy đủ buổi {TEN_LOAI_NGAN.get(hr['loai'], hr['loai']).lower()} "
            f"chuyên đề {hr.get('cum_ten', '')} lớp {lop}, tuyến {hr['tuyen'][-1]}: "
            f"các bước giải có số thật và bảng phân tích sáu cột.", 158)

        dau = (f'<p>Lời giải đầy đủ của phiếu '
               f'<a href="{dd_phieu}">{seo.esc(hr.get("ten", hr["ma"]))}</a>. '
               f'Mỗi bài có phần <em>các bước giải</em> đi từ dấu hiệu đọc vị tới '
               f'kết quả, phần <em>cách nghĩ chung cho mọi bài cùng dạng</em>, và '
               f'bảng phân tích sáu cột.</p>')
        hien = phan if mo else phan[:SO_PHAN_MO + 1]
        an = [] if mo else phan[SO_PHAN_MO + 1:]
        than_html = (dau + '<section class="vd">'
                     + "\n".join(md(k) for _, k in hien) + "</section>")
        if an:
            than_html += (
                f'<div class="che" id="phan-tra-phi">'
                f'<h2>Lời giải {len(an)} phần còn lại</h2>'
                f'<p>Phần lời giải của các mức vận dụng và phân hoá dành cho học '
                f'viên đang theo chương trình.</p>'
                f'<p><a href="/dang-ky/">Xem cách tham gia chương trình</a></p></div>')

        vet = [("Trang chủ", "/"), (f"Toán lớp {lop}", self.dd_lop(lop))]
        if hr["loai"] != "MOC":
            vet.append((seo.rut(hr.get("cum_ten", ""), 36),
                        self.dd_cum(lop, hr["cum"], hr["cum_ten"])))
        vet += [(hr.get("cum_ten") if hr["loai"] == "MOC"
                 else TEN_LOAI_NGAN.get(hr["loai"], hr["loai"]), dd_phieu),
                ("Lời giải", dd)]
        self.ghi(dd, seo.trang(
            dd=dd, tieu_de=tieu_de, mo_ta=mo_ta,
            h1=f"Lời giải và phân tích — {hr.get('ten', hr['ma'])}",
            than=bang_cuon(than_html), vet=vet, ngay=NGAY,
            muc_dang=self.dd_lop(lop),
            json_ld=[seo.duong_dan_dieu_huong(vet),
                     seo.hoc_lieu(f"Lời giải {hr['ma']}", mo_ta, dd, lop, NGAY,
                                  "Lời giải có phân tích", mien_phi=mo,
                                  o_che="#phan-tra-phi" if an else None)]),
            0.5, tieu_de, nguong=200)

    # ── 5. trang hướng dẫn ôn chắc ───────────────────────────────────────
    def lam_on_chac(self) -> None:
        for ma, r in sorted(self.hd.items()):
            p = (GOC / "03-phieu" / r["tuyen"] / f"L{r['lop']}" / f"{ma}.md")
            if not p.exists():
                continue
            fm, than = tach_fm(doc(p))
            dd = self.dd_on_chac(ma)
            lop, ten = r["lop"], r.get("cum_ten", "")
            tieu_de = seo.ghep_tieu_de(f"Ôn chắc {ten}", DUOI,
                                       giu=f" lớp {lop}{TUYEN_NHAN[r['tuyen']]}")
            mo_ta = seo.rut(MAU_MO_TA["on_chac"].format(cum_ten=ten, lop=lop), 158)
            than_html = (
                f"<p>Hướng dẫn tự ôn chắc chuyên đề <strong>{seo.esc(ten)}</strong> "
                f"lớp {lop}: ôn theo thứ tự nào, phải thuộc những gì, và tự kiểm tra "
                f"thế nào trước khi vào phòng thi.</p>" + md(bo_dau_trang(than)))
            vet = [("Trang chủ", "/"), (f"Toán lớp {lop}", self.dd_lop(lop)),
                   (seo.rut(ten, 40), self.dd_cum(lop, r["cum"], ten)),
                   ("Ôn chắc", dd)]
            self.ghi(dd, seo.trang(
                dd=dd, tieu_de=tieu_de, mo_ta=mo_ta,
                h1=f"Ôn chắc chuyên đề {ten} — lớp {lop}",
                than=bang_cuon(than_html), vet=vet, ngay=NGAY,
                muc_dang=self.dd_lop(lop),
                json_ld=[seo.duong_dan_dieu_huong(vet),
                         seo.hoc_lieu(f"Ôn chắc {ten} lớp {lop}", mo_ta, dd, lop,
                                      NGAY, "Tài liệu hướng dẫn tự học")]),
                0.7, tieu_de, nguong=250)

    # ── 6. sơ đồ đọc vị ──────────────────────────────────────────────────
    def lam_doc_vi(self) -> None:
        muc = []
        for lop in (3, 4, 5):
            for g in "ABCDEFGH":
                p = GOC / "10-so-do-doc-vi" / f"so-do-{g}-L{lop}.md"
                if not p.exists():
                    continue
                fm, than = tach_fm(doc(p))
                dd = self.dd_doc_vi(lop, g)
                nhom_ten = NHOM[g]["ten"]
                tieu_de = seo.ghep_tieu_de(f"Đọc vị đề {nhom_ten}", DUOI,
                                           giu=f" lớp {lop}")
                mo_ta = seo.rut(MAU_MO_TA["doc_vi"].format(
                    lop=lop, nhom_ten=nhom_ten), 158)
                than_html = (
                    f"<p>Nhiều học sinh giải được bài khi đã biết nó thuộc dạng nào, "
                    f"nhưng gặp đề lạ thì tắc ngay từ dòng đầu. Trang này là "
                    f"<strong>cây quyết định</strong>: đọc đề rồi trả lời lần lượt "
                    f"vài câu hỏi, tới cuối là ra tên dạng bài của nhóm "
                    f"{seo.esc(nhom_ten)} lớp {lop}.</p>" + md(bo_dau_trang(than)))
                than_html += (f'<p><a href="{self.dd_nhom(lop, g)}">Xem toàn bộ dạng '
                              f'bài của nhóm {seo.esc(nhom_ten)} lớp {lop}</a></p>')
                vet = [("Trang chủ", "/"), ("Đọc vị đề", "/doc-vi/"),
                       (f"{nhom_ten} lớp {lop}", dd)]
                self.ghi(dd, seo.trang(
                    dd=dd, tieu_de=tieu_de, mo_ta=mo_ta,
                    h1=f"Đọc vị đề bài {nhom_ten} — lớp {lop}",
                    than=bang_cuon(than_html), vet=vet, ngay=NGAY,
                    muc_dang="/doc-vi/",
                    json_ld=[seo.duong_dan_dieu_huong(vet),
                             seo.hoc_lieu(f"Sơ đồ đọc vị {nhom_ten} lớp {lop}",
                                          mo_ta, dd, lop, NGAY,
                                          "Sơ đồ nhận dạng bài toán")]),
                    0.85, tieu_de, nguong=300)
                muc.append((f"{nhom_ten} · lớp {lop}",
                            f"Cây quyết định + bảng dấu hiệu + 10 đề luyện", dd))

        dd = "/doc-vi/"
        than = ("<p>Kỹ năng khó dạy nhất ở toán tiểu học không phải là tính, mà là "
                "<strong>đọc đề rồi gọi đúng tên dạng bài</strong>. Học sinh thuộc "
                "công thức nhưng không nhận ra đề đang hỏi gì thì vẫn mất điểm.</p>"
                "<p>Đây là 24 sơ đồ đọc vị — mỗi nhóm chuyên đề ở mỗi lớp một sơ đồ. "
                "Mỗi sơ đồ gồm cây quyết định, bảng dấu hiệu nhận biết, các cặp chữ "
                "học sinh hay đọc nhầm, và mười đề luyện chỉ để gọi tên dạng chứ "
                "chưa phải giải.</p>") + the_lien_ket(muc)
        vet = [("Trang chủ", "/"), ("Đọc vị đề", dd)]
        self.ghi(dd, seo.trang(
            dd=dd, tieu_de="Đọc vị đề toán tiểu học: 24 sơ đồ nhận dạng",
            mo_ta="Cây quyết định giúp học sinh lớp 3, 4, 5 đọc đề rồi gọi đúng tên "
                  "dạng bài, cho cả tám nhóm chuyên đề, kèm đề luyện đọc vị.",
            h1="Đọc vị đề bài — 24 sơ đồ nhận dạng cho lớp 3, 4, 5",
            than=than, vet=vet, ngay=NGAY, muc_dang=dd,
            json_ld=[seo.duong_dan_dieu_huong(vet)]),
            0.9, "Đọc vị đề toán tiểu học",
            tu_khoa="cách nhận dạng bài toán tiểu học", nguong=150)

    # ── 7. lộ trình học ──────────────────────────────────────────────────
    def lam_lo_trinh(self) -> None:
        muc = []
        for tuyen in ("T1", "T2"):
            for lop in (3, 4, 5):
                p = GOC / "05-lo-trinh" / f"lo-trinh-{tuyen}-L{lop}.md"
                if not p.exists():
                    continue
                fm, than = tach_fm(doc(p))
                dd = self.dd_lo_trinh(tuyen, lop)
                nhan = ("cơ bản đến nâng cao" if tuyen == "T1"
                        else "nâng cao, luyện CLC và chuyên")
                tieu_de = seo.ghep_tieu_de(
                    f"Lộ trình toán lớp {lop} 34 tuần — tuyến {tuyen[-1]}", DUOI)
                mo_ta = seo.rut(
                    f"Lộ trình toán lớp {lop} tuyến {tuyen[-1]} ({nhan}) theo 34 "
                    f"tuần: tuần nào học chuyên đề nào, sản phẩm sau mỗi tuần và "
                    f"bốn cổng kiểm tra năng lực.", 158)
                than_html = (
                    f"<p>Lộ trình học toán lớp {lop} theo tuyến {tuyen[-1]} — "
                    f"<em>{nhan}</em> — trải trong <strong>34 tuần</strong>. Bảng "
                    f"dưới đây nói rõ tuần nào học chuyên đề nào, buổi ấy làm ra sản "
                    f"phẩm gì, và bốn cổng kiểm tra đặt ở đâu.</p>"
                    + md(bo_dau_trang(than)))
                than_html += (f'<p><a href="{self.dd_lop(lop)}">Xem toàn bộ chuyên đề '
                              f'toán lớp {lop}</a></p>')
                vet = [("Trang chủ", "/"), ("Lộ trình", "/lo-trinh/"),
                       (f"Tuyến {tuyen[-1]} · lớp {lop}", dd)]
                self.ghi(dd, seo.trang(
                    dd=dd, tieu_de=tieu_de, mo_ta=mo_ta,
                    h1=f"Lộ trình học toán lớp {lop} — 34 tuần, tuyến {tuyen[-1]}",
                    than=bang_cuon(than_html), vet=vet, ngay=NGAY,
                    muc_dang="/lo-trinh/",
                    json_ld=[seo.duong_dan_dieu_huong(vet),
                             seo.khoa_hoc(f"Lộ trình toán lớp {lop} tuyến "
                                          f"{tuyen[-1]}", mo_ta, dd, lop, 100)]),
                    0.85, tieu_de, nguong=300)
                muc.append((f"Tuyến {tuyen[-1]} · lớp {lop}",
                            f"{nhan.capitalize()} · 100 buổi · 34 tuần · 4 cổng", dd))

        dd = "/lo-trinh/"
        than = ("<p>Câu hỏi phụ huynh hỏi nhiều nhất không phải <em>học tài liệu "
                "nào</em> mà là <em>học theo thứ tự nào</em>. Tài liệu thì ở đâu "
                "cũng có; thứ tự thì không ai nói.</p>"
                "<p>Sáu lộ trình dưới đây trả lời đúng câu ấy: mỗi lộ trình trải "
                "100 buổi học 90 phút vào 34 tuần của một năm học, ghi rõ tuần nào "
                "học chuyên đề nào, sau mỗi tuần phải có sản phẩm gì, và đặt bốn "
                "cổng kiểm tra để biết có được đi tiếp hay phải học lại.</p>"
                "<p><strong>Tuyến 1</strong> dành cho học sinh xây nền từ cơ bản lên "
                "nâng cao. <strong>Tuyến 2</strong> dành cho học sinh đã chắc nền và "
                "đang nhắm kỳ thi chất lượng cao hoặc thi chuyên vào lớp 6.</p>"
                ) + the_lien_ket(muc)
        vet = [("Trang chủ", "/"), ("Lộ trình", dd)]
        self.ghi(dd, seo.trang(
            dd=dd, tieu_de="Lộ trình học toán tiểu học 34 tuần cho lớp 3, 4, 5",
            mo_ta="Sáu lộ trình học toán lớp 3, 4, 5 theo 34 tuần: tuần nào học "
                  "chuyên đề nào, sản phẩm sau mỗi tuần và bốn cổng kiểm tra năng lực.",
            h1="Lộ trình học toán tiểu học — 34 tuần cho lớp 3, 4 và 5",
            than=than, vet=vet, ngay=NGAY, muc_dang=dd,
            json_ld=[seo.duong_dan_dieu_huong(vet)]),
            0.9, "Lộ trình học toán tiểu học",
            tu_khoa="lộ trình học toán tiểu học", nguong=150)

    # ── 8. thi vào lớp 6 ─────────────────────────────────────────────────
    def lam_thi_vao_6(self) -> None:
        muc = []
        for t in TRUONG:
            dd = f"/thi-vao-6/{t['ma']}/"
            tieu_de = seo.ghep_tieu_de(
                f"Thi vào lớp 6 {t['goi_tat']} môn toán", " — ôn thế nào", DUOI)
            mo_ta = seo.rut(MAU_MO_TA["thi_vao_6"].format(ten=t["ten"]), 158)
            hang = ""
            for g in t["trong_tam"]:
                ds = sorted(d for (l2, g2, d) in self.dang if l2 == 5 and g2 == g)[:6]
                lk = " · ".join(f'<a href="{self.dd_dang(5, g, d)}">{seo.esc(d)}</a>'
                                for d in ds)
                hang += (f"<tr><td><a href=\"{self.dd_nhom(5, g)}\">"
                         f"{seo.esc(NHOM[g]['ten'])}</a></td><td>{lk}</td></tr>")
            than = (
                f"<p>Đề thi vào lớp 6 của <strong>{seo.esc(t['ten'])}</strong> có "
                f"màu sắc riêng. {seo.esc(t['ghi_chu'])}</p>"
                f'<div class="tom"><p><strong>Nói thẳng một điều:</strong> không ai '
                f'đoán trước được đề năm nay. Trang này không bán "đề tủ" và không '
                f'hứa tỉ lệ đỗ. Việc có ích duy nhất là <em>luyện chắc các nhóm dạng '
                f'bài mà đề trường này nhiều năm liền vẫn hỏi</em>, và biết con đang '
                f'hổng nhóm nào.</p></div>'
                f"<h2>Bốn nhóm chuyên đề trọng tâm</h2>"
                f'<div class="cuon"><table><thead><tr><th>Nhóm chuyên đề</th>'
                f"<th>Dạng bài nên luyện chắc trước</th></tr></thead>"
                f"<tbody>{hang}</tbody></table></div>"
                f"<h2>Luyện theo lộ trình nào</h2>"
                f'<p>Học sinh nhắm kỳ thi này nên đi theo '
                f'<a href="{self.dd_lo_trinh("T2", 5)}">lộ trình tuyến 2 lớp 5</a> — '
                f'34 tuần, 12 tuần cuối là giai đoạn nước rút. Nếu đang học lớp 4, '
                f'bắt đầu từ <a href="{self.dd_lo_trinh("T2", 4)}">tuyến 2 lớp 4</a> '
                f'để có hai năm chuẩn bị thay vì một.</p>'
                f'<p>Chưa rõ con đang ở đâu thì làm '
                f'<a href="/test-dau-vao/">bài test bốn trục</a> trước khi chọn tuyến.</p>')
            vet = [("Trang chủ", "/"), ("Thi vào lớp 6", "/thi-vao-6/"),
                   (t["goi_tat"], dd)]
            self.ghi(dd, seo.trang(
                dd=dd, tieu_de=tieu_de, mo_ta=mo_ta,
                h1=f"Ôn thi vào lớp 6 {t['ten']} — môn toán",
                than=than, vet=vet, ngay=NGAY, muc_dang="/thi-vao-6/",
                json_ld=[seo.duong_dan_dieu_huong(vet)]),
                0.8, tieu_de, tu_khoa=t["tu_khoa"], nguong=200)
            muc.append((t["ten"], t["ghi_chu"], dd))

        dd = "/thi-vao-6/"
        than = ("<p>Kỳ thi vào lớp 6 các trường top ở Hà Nội không thi cùng một đề và "
                "không nhắm cùng một loại học sinh. Trang này ghi lại màu sắc đề của "
                "từng trường và chỉ ra nhóm chuyên đề nên luyện chắc trước.</p>"
                '<div class="tom"><p>Toàn bộ nhận định dưới đây rút từ <strong>đề đã '
                "công bố các năm trước</strong>. Không có chỉ tiêu, điểm chuẩn hay tỉ "
                "lệ đỗ nào được đoán ở đây, vì những con số ấy chỉ nhà trường mới "
                "công bố được.</p></div>") + the_lien_ket(muc)
        vet = [("Trang chủ", "/"), ("Thi vào lớp 6", dd)]
        self.ghi(dd, seo.trang(
            dd=dd, tieu_de="Ôn thi vào lớp 6 các trường top Hà Nội — môn toán",
            mo_ta="Màu sắc đề toán vào lớp 6 của bảy trường top Hà Nội và nhóm "
                  "chuyên đề nên luyện chắc trước cho từng trường.",
            h1="Ôn thi vào lớp 6 môn toán — các trường top Hà Nội",
            than=than, vet=vet, ngay=NGAY, muc_dang=dd,
            json_ld=[seo.duong_dan_dieu_huong(vet)]),
            0.9, "Ôn thi vào lớp 6 môn toán", tu_khoa="ôn thi vào lớp 6 môn toán",
            nguong=150)

    # ── 9. trang trụ của một lớp ─────────────────────────────────────────
    def lam_lop(self) -> None:
        for lop in (3, 4, 5):
            dd = self.dd_lop(lop)
            nhoms = [g for g in "ABCDEFGH"
                     if any(l2 == lop and g2 == g for (l2, g2, _) in self.dang)]
            cums = sorted({(r["cum"], r["cum_ten"]) for r in self.hoc
                           if r["lop"] == lop and r["loai"] != "MOC"})
            so_dang = sum(1 for (l2, _, _) in self.dang if l2 == lop)
            tieu_de = seo.ghep_tieu_de(
                f"Toán lớp {lop} nâng cao: {len(cums)} chuyên đề", DUOI)
            mo_ta = seo.rut(MAU_MO_TA["lop"].format(lop=lop, so_cum=len(cums)), 158)
            than = (
                f"<p>Toàn bộ chương trình toán lớp {lop} ở đây được chia thành "
                f"<strong>tám nhóm chuyên đề</strong> và <strong>{so_dang} dạng bài"
                f"</strong> đã gọi tên rõ ràng. Mỗi dạng có trang riêng: ví dụ có "
                f"lời giải đi từng bước, bảng phân tích cho biết nhìn dấu hiệu nào "
                f"để nhận ra dạng, và phiếu học để luyện sâu.</p>"
                f'<div class="tom"><p><strong>Chưa biết bắt đầu từ đâu?</strong> '
                f'Nếu con đang mất gốc hoặc học chưa đều, mở '
                f'<a href="{self.dd_lo_trinh("T1", lop)}">lộ trình tuyến 1</a>. '
                f'Nếu con đã chắc nền và nhắm thi chất lượng cao hoặc thi chuyên, mở '
                f'<a href="{self.dd_lo_trinh("T2", lop)}">lộ trình tuyến 2</a>. '
                f'Nếu con giải được bài khi biết dạng nhưng gặp đề lạ là tắc, vấn đề '
                f'nằm ở khâu đọc đề — bắt đầu từ '
                f'<a href="/doc-vi/">sơ đồ đọc vị</a>.</p></div>')
            than += "<h2>Tám nhóm chuyên đề</h2>" + the_lien_ket([
                (NHOM[g]["ten"],
                 f"{sum(1 for (l2, g2, _) in self.dang if l2 == lop and g2 == g)} "
                 f"dạng bài · " + seo.rut(NHOM[g]["mo_ta"], 66),
                 self.dd_nhom(lop, g)) for g in nhoms])
            than += "<h2>Chuyên đề học theo thứ tự</h2>" + the_lien_ket([
                (t, f"Chuyên đề C{c:02d} · sáu buổi 90 phút", self.dd_cum(lop, c, t))
                for c, t in cums])
            vet = [("Trang chủ", "/"), (f"Toán lớp {lop}", dd)]
            self.ghi(dd, seo.trang(
                dd=dd, tieu_de=tieu_de, mo_ta=mo_ta,
                h1=f"Toán lớp {lop} — {len(cums)} chuyên đề, {so_dang} dạng bài",
                than=than, vet=vet, ngay=NGAY, muc_dang=dd,
                json_ld=[seo.duong_dan_dieu_huong(vet),
                         seo.khoa_hoc(f"Toán lớp {lop}", mo_ta, dd, lop,
                                      len(cums) * 6)]),
                1.0, tieu_de, tu_khoa=f"toán lớp {lop} nâng cao", nguong=200)

    # ── 9B. đề thi ───────────────────────────────────────────────────────
    def lam_de_thi(self) -> None:
        """162 trang đề thi: ôn tập mốc, thi mốc, đánh giá năng lực.

        Đây là nhóm trang nhắm đúng truy vấn đông người tìm nhất — "đề thi toán
        lớp 4 học kì 1 có đáp án". Không kỳ vọng thắng ngay ở đó, vì các kho tài
        liệu tổng hợp đã giữ chỗ nhiều năm. Cửa vào là thứ họ không có: **bảng
        phân tích sau thi** ghi rõ sai bài nào thì hổng chỗ nào và học lại ở đâu.
        """
        idx = json.loads(doc(GOC / "07-de-thi" / "index-de-thi.json"))
        THU_MUC = {"ON": "on-tap", "MOC": "de-moc", "NL": "dgnl"}
        HO_TEN = {"ON": "Phiếu ôn tập mốc", "MOC": "Đề thi mốc",
                  "NL": "Đề đánh giá năng lực"}
        theo_ho = defaultdict(list)

        for d in idx:
            p = GOC / "07-de-thi" / THU_MUC[d["ho"]] / f"{d['ma']}.md"
            if not p.exists():
                continue
            fm_, than = tach_fm(doc(p))
            dd = self.dd_de(d["ma"])
            lop, ho = d["lop"], d["ho"]
            # Đề thi công khai trọn vẹn: đây là nhóm trang để người ta tìm thấy
            # site, và một đề bị cắt đôi thì không ai dùng, cũng không ai dẫn về.
            phan = cat_phan(bo_dau_trang(than))
            tieu_de = seo.ghep_tieu_de(
                f"{HO_TEN[ho]} {d['moc_ten']} lớp {lop}", DUOI,
                giu=f" — {d['ma'].rsplit('-', 1)[-1]}" if ho != "ON" else "")
            # Mô tả phải nhắc **biến thể**, nếu không mười đề của cùng một mốc
            # sẽ có mười mô tả giống hệt nhau và tự tranh nhau một truy vấn.
            bt = (d.get("bien_the") or "").rstrip(".")
            mo_ta = seo.rut(
                f"{HO_TEN[ho]} môn toán lớp {lop} — {d['moc_ten']}"
                + (f", {bt[0].lower() + bt[1:]}" if bt and bt != "—" else "")
                + f". {d['thoi_luong']} phút, thang {d['thang_diem']}. Có đáp án, "
                  f"biểu điểm và bảng phân tích sau thi chỉ ra phải học lại ở đâu.", 158)

            than_html = (
                f"<p>{seo.esc(HO_TEN[ho])} môn toán lớp {lop}, "
                f"<strong>{d['moc_ten']}</strong>. Làm trong {d['thoi_luong']} phút, "
                f"thang điểm {d['thang_diem']}. Phạm vi: {seo.esc(d['pham_vi'])}.</p>"
                f'<div class="tom"><p><strong>Chấm xong đừng dừng ở con số điểm.</strong> '
                f'Cuối trang có bảng phân tích sau thi: mỗi bài ghi rõ nó đo cái gì, '
                f'sai bài ấy nghĩa là hổng chỗ nào, và phải quay lại học phiếu nào. '
                f'Đó mới là thứ dùng được sau một lần thi.</p></div>'
                + "\n".join(md(k) for _, k in phan))

            anh_em = [x for x in idx if x["ho"] == ho and x["lop"] == lop
                      and x["ma"] != d["ma"]][:8]
            if anh_em:
                than_html += "<h2>Đề khác cùng loại</h2>" + the_lien_ket([
                    (x["ten"], x.get("bien_the") or x["pham_vi"], self.dd_de(x["ma"]))
                    for x in anh_em])
            than_html += (f'<p><a href="{self.dd_lop(lop)}">Xem toàn bộ chuyên đề '
                          f'toán lớp {lop}</a> · '
                          f'<a href="{self.dd_lo_trinh("T1", lop)}">lộ trình 34 '
                          f'tuần</a> · <a href="/doc-vi/">sơ đồ đọc vị đề</a></p>')

            vet = [("Trang chủ", "/"), ("Đề thi", "/de-thi/"),
                   (f"Lớp {lop}", f"/de-thi/lop-{lop}/"),
                   (seo.rut(d["ten"], 42), dd)]
            self.ghi(dd, seo.trang(
                dd=dd, tieu_de=tieu_de, mo_ta=mo_ta, h1=d["ten"],
                than=bang_cuon(than_html), vet=vet, ngay=NGAY, muc_dang="/de-thi/",
                json_ld=[seo.duong_dan_dieu_huong(vet),
                         seo.hoc_lieu(d["ten"], mo_ta, dd, lop, NGAY,
                                      "Đề thi có đáp án",
                                      thoi_luong=f"PT{d['thoi_luong']}M")]),
                0.75, tieu_de, nguong=250)
            theo_ho[(lop, ho)].append(d)

        # trang trụ theo lớp
        for lop in (3, 4, 5):
            dd = f"/de-thi/lop-{lop}/"
            than = (f"<p>Toàn bộ đề thi môn toán lớp {lop} của hệ thống: phiếu ôn "
                    f"tập trước mỗi mốc, mười đề cho mỗi mốc trong năm, và đề đánh "
                    f"giá năng lực bám format thi vào lớp 6.</p>"
                    f'<div class="tom"><p>Mười đề của cùng một mốc dùng chung một '
                    f'ma trận mức độ, chỉ khác biến thể — nên điểm của hai lần thi '
                    f'khác đề vẫn so sánh được với nhau. Đó là lý do có mười đề chứ '
                    f'không phải một.</p></div>')
            for ho in ("ON", "MOC", "NL"):
                ds = theo_ho.get((lop, ho), [])
                if ds:
                    than += f"<h2>{HO_TEN[ho]} — {len(ds)} đề</h2>" + the_lien_ket([
                        (x["ten"], x.get("bien_the") or x["pham_vi"],
                         self.dd_de(x["ma"])) for x in ds])
            vet = [("Trang chủ", "/"), ("Đề thi", "/de-thi/"), (f"Lớp {lop}", dd)]
            self.ghi(dd, seo.trang(
                dd=dd, tieu_de=seo.ghep_tieu_de(
                    f"Đề thi toán lớp {lop} có đáp án", DUOI),
                mo_ta=seo.rut(
                    f"Đề thi toán lớp {lop} có đáp án và biểu điểm: phiếu ôn tập "
                    f"mốc, đề thi giữa kỳ và cuối kỳ, đề đánh giá năng lực vào lớp 6.", 158),
                h1=f"Đề thi toán lớp {lop} — có đáp án và bảng phân tích",
                than=than, vet=vet, ngay=NGAY, muc_dang="/de-thi/",
                json_ld=[seo.duong_dan_dieu_huong(vet)]),
                0.9, f"Đề thi toán lớp {lop}",
                tu_khoa=f"đề thi toán lớp {lop} có đáp án", nguong=150)

        # trang trụ chung
        dd = "/de-thi/"
        than = ("<p>Hệ thống có <strong>162 đề</strong> chia làm ba họ, và cả ba "
                "đều kèm đáp án, biểu điểm và bảng phân tích sau thi.</p>"
                "<h2>Ba họ đề</h2>"
                "<ul>"
                "<li><strong>Phiếu ôn tập mốc</strong> — 90 phút, thang 100. Làm "
                "trước kỳ thi một tuần để hệ thống lại toàn bộ chuyên đề trong "
                "phạm vi.</li>"
                "<li><strong>Đề thi mốc</strong> — 60 phút, thang 10, đúng format "
                "đề kiểm tra định kỳ của nhà trường. Mỗi mốc có mười đề dùng chung "
                "một ma trận: bản chuẩn, bản đổi số liệu, bản tăng và giảm độ khó, "
                "bản có bẫy đơn vị, bản có dữ kiện thừa, bản thiên hình học, bản "
                "thiên suy luận.</li>"
                "<li><strong>Đề đánh giá năng lực</strong> — 60 phút, thang 100, "
                "bám format đề vào lớp 6 các trường chất lượng cao Hà Nội: 20 câu "
                "trắc nghiệm nhanh, 10 câu trả lời ngắn, một bài đọc hiểu số liệu, "
                "ba bài tự luận và một bài phân hoá.</li>"
                "</ul>"
                '<div class="tom"><p><strong>Điều khác biệt nằm ở bảng phân tích '
                'sau thi.</strong> Một tuyển tập đề rời chỉ cho biết điểm. Mỗi đề ở '
                'đây ghi rõ từng bài đo cái gì, sai bài ấy nghĩa là hổng chỗ nào, '
                'và phải quay lại học phiếu nào — chấm xong là biết ngay việc tiếp '
                'theo.</p></div>')
        than += "<h2>Chọn theo lớp</h2>" + the_lien_ket([
            (f"Đề thi toán lớp {lop}",
             f"{sum(len(theo_ho.get((lop, h), [])) for h in ('ON', 'MOC', 'NL'))} đề "
             f"· có đáp án và bảng phân tích", f"/de-thi/lop-{lop}/")
            for lop in (3, 4, 5)])
        vet = [("Trang chủ", "/"), ("Đề thi", dd)]
        self.ghi(dd, seo.trang(
            dd=dd, tieu_de="Đề thi toán tiểu học có đáp án và phân tích",
            mo_ta="162 đề thi toán lớp 3, 4, 5 có đáp án, biểu điểm và bảng phân "
                  "tích sau thi: ôn tập mốc, thi giữa kỳ và cuối kỳ, đánh giá năng lực.",
            h1="Đề thi toán tiểu học — 162 đề có đáp án và bảng phân tích",
            than=than, vet=vet, ngay=NGAY, muc_dang=dd,
            json_ld=[seo.duong_dan_dieu_huong(vet)]),
            0.95, "Đề thi toán tiểu học",
            tu_khoa="đề thi toán tiểu học có đáp án", nguong=150)

    # ── 10. trang chủ ────────────────────────────────────────────────────
    def lam_chu(self) -> None:
        so_dang = len(self.dang)
        than = (
            "<p>Đây là hệ thống toán tiểu học lớp 3, 4 và 5 của Học viện GITA. Điểm "
            "khác của nó so với một kho tài liệu: mọi bài đều <strong>đã được gọi "
            "tên dạng</strong>, mọi lời giải đều <strong>đi từng bước từ dấu hiệu "
            "đọc đề tới kết quả</strong>, và mọi thứ đều nằm trong một "
            "<strong>lộ trình 34 tuần</strong> chứ không rời rạc.</p>"
            f'<div class="tom"><p><strong>Hệ thống gồm:</strong> {so_dang} dạng bài '
            f'có trang riêng · 96 chuyên đề, mỗi chuyên đề sáu buổi 90 phút · 600 '
            f'phiếu học kèm 600 phiếu lời giải và bảng phân tích chuyên sâu · 24 sơ '
            f'đồ đọc vị đề · 6 lộ trình 34 tuần.</p></div>'
            "<h2>Bắt đầu từ đâu</h2>")
        than += the_lien_ket([
            ("Con chưa chắc nền", "Vào lộ trình tuyến 1 của lớp con đang học, "
             "học tuần nào theo đúng tuần ấy.", "/lo-trinh/"),
            ("Con đọc đề là tắc", "Vấn đề nằm ở khâu gọi tên dạng bài. Bắt đầu "
             "bằng 24 sơ đồ đọc vị.", "/doc-vi/"),
            ("Con nhắm thi vào 6", "Xem màu sắc đề của từng trường top Hà Nội rồi "
             "chọn nhóm chuyên đề luyện trước.", "/thi-vao-6/"),
            ("Con đang bí một bài", "Tìm đúng dạng bài ấy, đọc ví dụ có lời giải "
             "từng bước rồi làm bài tự luyện.", "/toan-lop-4/"),
        ])
        than += "<h2>Chương trình theo lớp</h2>" + the_lien_ket([
            (f"Toán lớp {lop}",
             f"{sum(1 for (l2, _, _) in self.dang if l2 == lop)} dạng bài · "
             f"tám nhóm chuyên đề · hai tuyến học", self.dd_lop(lop))
            for lop in (3, 4, 5)])
        than += ("<h2>Vì sao tin được nội dung ở đây</h2>"
                 "<p>Mọi đáp số trên trang này do chương trình máy tính ra rồi mới "
                 "in ra chữ, chứ không do người gõ tay — nên không có lỗi đánh máy "
                 "trong đáp án. Mọi phiếu đều qua bộ kiểm định tự động về cấu trúc, "
                 "thang điểm và số ý trước khi phát hành, và qua vòng đọc duyệt của "
                 "Hội đồng chuyên môn. Cách làm được ghi công khai ở "
                 '<a href="/quy-trinh-bien-soan/">quy trình biên soạn</a>.</p>')
        vet = [("Trang chủ", "/")]
        self.ghi("/", seo.trang(
            dd="/", tieu_de=MAU_TIEU_DE["chu"],
            mo_ta=seo.rut(MAU_MO_TA["chu"].format(so_dang=so_dang, so_so_do=24), 158),
            h1="Toán tiểu học lớp 3, 4, 5 — học theo dạng bài và theo lộ trình",
            than=than, vet=vet, ngay=NGAY,
            json_ld=[seo.duong_dan_dieu_huong(vet)]),
            1.0, MAU_TIEU_DE["chu"], tu_khoa="math tiểu học 365", nguong=150)

    # ── 11. nhóm trang uy tín ────────────────────────────────────────────
    def lam_uy_tin(self) -> None:
        """Bốn trang quyết định việc cỗ máy tìm kiếm có coi site là nguồn đáng tin.

        Đây không phải trang phụ. Với chủ đề giáo dục cho trẻ em, cỗ máy đánh giá
        rất nặng ba câu hỏi: ai viết, viết dựa trên gì, và có ai kiểm chứng chưa.
        Bốn trang này trả lời đúng ba câu ấy, và mọi trang khác đều dẫn về đây
        qua chân trang.
        """
        chung = [("Trang chủ", "/")]

        # 11.1 Về đội ngũ
        dd = "/ve-chung-toi/"
        than = (
            "<p>MATH TIỂU HỌC 365 là hệ thống học liệu toán tiểu học do "
            "<strong>Học viện Phát triển Tài năng Toàn cầu — GITA</strong> biên "
            "soạn và vận hành tại Hà Nội.</p>"
            "<h2>Ai biên soạn</h2>"
            "<p>Nội dung do <strong>Hội đồng chuyên môn Toán tiểu học GITA</strong> "
            "biên soạn. Hội đồng gồm chủ biên học liệu, giáo viên đứng lớp các khối "
            "3, 4, 5 và coach kèm đội tuyển. Mỗi tài liệu phát hành đều ghi người "
            "duyệt và ngày duyệt trong sổ duyệt nội bộ.</p>"
            '<div class="tom"><p><strong>Phần cần bổ sung trước khi chạy thật:</strong> '
            "mục này phải thay bằng tên thật, ảnh thật và tóm tắt chuyên môn thật của "
            "từng thành viên hội đồng. Cỗ máy tìm kiếm — và phụ huynh — đều đánh giá "
            "rất nặng việc <em>có người thật đứng tên</em> sau nội dung dạy trẻ em. "
            "Trang không có tên người là trang khó lên hạng ở chủ đề giáo dục.</p></div>"
            "<h2>Mô thức huấn luyện G-I-T-A</h2>"
            "<p><strong>G — Goal:</strong> mỗi buổi học mở đầu bằng một mục tiêu nói "
            "được thành câu, không phải bằng một trang bài tập. "
            "<strong>I — Inspirits:</strong> học sinh phải hiểu vì sao chương này "
            "đáng học trước khi làm bài đầu tiên. "
            "<strong>T — Talent:</strong> hai phần cuối của mọi phiếu là chỗ phân "
            "hoá, để học sinh giỏi có chỗ đi tiếp thay vì làm lại bài đã biết. "
            "<strong>A — Action:</strong> mỗi buổi kết thúc bằng một sản phẩm cụ thể "
            "— một sơ đồ, một bài trình bày, một đề tự chấm.</p>"
            "<h2>Liên hệ</h2>"
            "<p>Học viện GITA · Hà Nội · gita.edu.vn</p>"
            '<div class="tom"><p>Thay mục này bằng địa chỉ, số điện thoại và hộp thư '
            "thật trước khi chạy. Địa chỉ và số điện thoại kiểm chứng được là một "
            "trong vài tín hiệu uy tín mạnh nhất cho một tổ chức giáo dục.</p></div>")
        vet = chung + [("Về chúng tôi", dd)]
        self.ghi(dd, seo.trang(
            dd=dd, tieu_de=seo.ghep_tieu_de("Về Học viện GITA và đội ngũ biên soạn", DUOI),
            mo_ta="Ai biên soạn hệ thống toán tiểu học MATH TIỂU HỌC 365, mô thức "
                  "huấn luyện G-I-T-A và cách liên hệ với Học viện GITA tại Hà Nội.",
            h1="Về chúng tôi — Học viện GITA và Hội đồng chuyên môn",
            than=than, vet=vet, ngay=NGAY,
            json_ld=[seo.duong_dan_dieu_huong(vet)]), 0.6, "Về chúng tôi")

        # 11.2 Quy trình biên soạn
        dd = "/quy-trinh-bien-soan/"
        than = (
            "<p>Trang này mô tả đúng cách hệ thống được dựng, kể cả những chỗ chưa "
            "hoàn hảo. Người đọc có quyền biết tài liệu con mình học được làm ra "
            "thế nào.</p>"
            "<h2>1. Mọi đáp số do máy tính ra</h2>"
            "<p>Không có đáp án nào trên hệ thống này được gõ bằng tay. Mỗi dạng bài "
            "có một <em>mẫu bài</em> viết dưới dạng chương trình: mẫu tự chọn số "
            "liệu, tự tính đáp số, rồi mới in thành đề. Nhờ vậy không tồn tại lỗi "
            "đánh máy trong đáp án — loại lỗi phổ biến nhất ở tài liệu in.</p>"
            "<h2>2. Kiểm định tự động trước khi phát hành</h2>"
            "<p>Mỗi phiếu phải qua bộ kiểm định kiểm: đúng năm phần, đúng 25 bài, số "
            "ý nằm trong khoảng quy định, mọi ý có đáp số, thang điểm cộng đúng 100, "
            "không dùng thuật ngữ cấp hai, có đủ bẫy và gợi ý ba tầng. Phiếu không "
            "đạt thì không được phát hành.</p>"
            "<h2>3. Vòng đọc duyệt của người</h2>"
            "<p>Máy không đánh giá được lời văn có tự nhiên không và độ khó có vừa "
            "tầm học sinh thật không. Vì vậy mọi tài liệu còn phải qua vòng đọc "
            "duyệt của chủ biên, ưu tiên theo mức ảnh hưởng: đề kiểm tra mốc trước, "
            "rồi đề thi chương, rồi phiếu nâng cao.</p>"
            "<h2>4. Nguồn tham chiếu</h2>"
            "<p>Chương trình bám Chương trình giáo dục phổ thông 2018 môn Toán cấp "
            "tiểu học. Phần nâng cao tham chiếu cấu trúc đề đã công bố của các kỳ "
            "thi vào lớp 6 tại Hà Nội và các kỳ thi học sinh giỏi cấp trường, cấp "
            "quận.</p>"
            "<h2>5. Sửa lỗi</h2>"
            "<p>Phát hiện một lỗi trong đề hay đáp án, xin báo về hộp thư của Học "
            "viện kèm mã phiếu. Lỗi ở một mẫu bài thường là lỗi lặp ở hàng chục "
            "phiếu, nên một báo lỗi đúng chỗ sửa được rất nhiều tài liệu cùng lúc. "
            "Tài liệu sửa xong được ghi lại ngày cập nhật ở chân trang.</p>")
        vet = chung + [("Quy trình biên soạn", dd)]
        self.ghi(dd, seo.trang(
            dd=dd, tieu_de=seo.ghep_tieu_de("Quy trình biên soạn và kiểm định học liệu", DUOI),
            mo_ta="Cách MATH TIỂU HỌC 365 biên soạn học liệu: đáp số do máy tính ra, "
                  "kiểm định tự động trước khi phát hành và vòng đọc duyệt của chủ biên.",
            h1="Quy trình biên soạn và kiểm định học liệu",
            than=than, vet=vet, ngay=NGAY,
            json_ld=[seo.duong_dan_dieu_huong(vet)]), 0.6, "Quy trình biên soạn")

        # 11.3 Đánh giá của người học
        dd = "/danh-gia/"
        p = GOC / "11-seo" / "danh-gia" / "danh-gia.json"
        dg = json.loads(doc(p)) if p.exists() else None
        if dg and dg.get("y_kien"):
            khoi = "".join(
                f'<blockquote><p>{inline(y["noi_dung"])}</p>'
                f'<p><strong>{seo.esc(y["nguoi"])}</strong> · {seo.esc(y["vai"])} · '
                f'{seo.esc(y["ngay"])} · {"★" * int(y["sao"])}</p></blockquote>'
                for y in dg["y_kien"])
            dau = (f'<p>Đã thu thập <strong>{dg["so_luot"]} lượt đánh giá</strong>, '
                   f'điểm trung bình <strong>{dg["diem_trung_binh"]}/5</strong>.</p>')
        else:
            khoi = ""
            dau = ('<div class="tom"><p><strong>Chưa có đánh giá nào được đăng.</strong> '
                   "Trang này để trống cho tới khi có ý kiến thật của người học thật. "
                   "Chúng tôi không viết sẵn lời khen, không đặt mua đánh giá, và "
                   "không gắn số sao vào dữ liệu gửi cho cỗ máy tìm kiếm khi chưa có "
                   "đủ đánh giá thật.</p></div>")
        than = (
            dau +
            "<h2>Cách chúng tôi thu thập đánh giá</h2>"
            "<p>Sau mỗi cổng kiểm tra của lộ trình — tức bốn lần trong một năm học — "
            "học viên và phụ huynh nhận một phiếu hỏi ngắn: chấm sao, và trả lời hai "
            "câu <em>điều gì có ích nhất</em> và <em>điều gì cần sửa</em>. Ý kiến "
            "được đăng nguyên văn, kèm tên và vai trò của người viết, sau khi người "
            "viết đồng ý cho đăng.</p>"
            "<h2>Ba điều chúng tôi không làm</h2>"
            "<ul>"
            "<li><strong>Không viết đánh giá thay người học.</strong> Một lời khen tự "
            "viết là gian dối với phụ huynh và vi phạm chính sách của Google — hình "
            "phạt là gỡ toàn bộ kết quả mở rộng của cả tên miền.</li>"
            "<li><strong>Không giấu đánh giá xấu.</strong> Ý kiến chê được đăng cùng "
            "chỗ với ý kiến khen, kèm phần trả lời của Hội đồng chuyên môn về việc "
            "đã sửa gì.</li>"
            "<li><strong>Không đổi quà lấy đánh giá tốt.</strong> Đánh giá mua được "
            "thì không còn là thông tin, chỉ còn là quảng cáo.</li>"
            "</ul>"
            "<h2>Vì sao trang này viết thẳng như vậy</h2>"
            "<p>Phần lớn trang học liệu đặt ở đầu trang một dòng năm sao và một con số "
            "tròn trịa, không nói rõ số ấy lấy từ đâu và ai chấm. Một con số như vậy "
            "không giúp phụ huynh quyết định được điều gì.</p>"
            "<p>Cái giúp được là <em>ý kiến cụ thể của người đã học</em>: học được bao "
            "lâu, thay đổi ở chỗ nào, và chỗ nào vẫn chưa ổn. Vì vậy trang này để "
            "trống cho tới khi có ý kiến thật, và khi có thì đăng nguyên văn kèm tên "
            "người viết.</p>"
            "<h2>Nếu bạn muốn góp ý ngay</h2>"
            "<p>Không cần chờ tới cổng kiểm tra. Phát hiện một lỗi trong đề hay đáp "
            'án, hoặc thấy một phiếu quá dễ hay quá khó so với lớp, xin báo về hộp thư '
            "của Học viện kèm mã phiếu ghi ở đầu tài liệu. Lỗi ở một mẫu bài thường là "
            'lỗi lặp ở hàng chục phiếu, nên một báo lỗi đúng chỗ sửa được rất nhiều '
            'tài liệu cùng lúc — cách chúng tôi xử lý ghi ở '
            '<a href="/quy-trinh-bien-soan/">quy trình biên soạn</a>.</p>' + khoi)
        vet = chung + [("Đánh giá", dd)]
        self.ghi(dd, seo.trang(
            dd=dd, tieu_de=seo.ghep_tieu_de("Đánh giá của người học và cách thu thập", DUOI),
            mo_ta="Ý kiến thật của học viên và phụ huynh về MATH TIỂU HỌC 365, cùng "
                  "cách chúng tôi thu thập và công bố đánh giá.",
            h1="Đánh giá của người học",
            than=than, vet=vet, ngay=NGAY,
            json_ld=[seo.duong_dan_dieu_huong(vet)]), 0.6, "Đánh giá của người học")

        # 11.4 Đăng ký và test đầu vào
        for dd, h1, td, mt, than in [
            ("/dang-ky/", "Tham gia chương trình",
             "Tham gia chương trình học" + DUOI,
             "Cách tham gia chương trình toán tiểu học của Học viện GITA: xếp lớp "
             "theo bài test bốn trục rồi vào đúng tuyến học.",
             "<p>Học viên mới vào chương trình theo ba bước. Không có bước nào là "
             "bài kiểm tra để loại người.</p>"
             "<h2>Bước 1 — Làm bài test bốn trục</h2>"
             '<p><a href="/test-dau-vao/">Bài test</a> đo tách rời bốn thứ: nền kiến '
             "thức, tư duy, kỹ năng tính và phương pháp trình bày. Đo tách rời vì hai "
             "học sinh cùng một điểm tổng thường hổng ở hai chỗ hoàn toàn khác nhau, "
             "và chữa hai chỗ ấy là hai việc khác nhau. Bài làm trong 60 phút.</p>"
             "<h2>Bước 2 — Xếp tuyến và xếp tuần bắt đầu</h2>"
             '<p>Kết quả bốn trục cho ra hai thứ: học <a href="/lo-trinh/">tuyến 1 hay '
             'tuyến 2</a>, và bắt đầu từ tuần nào chứ không mặc định từ tuần 1. Học '
             "sinh chưa chắc nền vào tuyến 1 — đi từ cơ bản lên nâng cao. Học sinh đã "
             "chắc nền và nhắm thi chất lượng cao hoặc thi chuyên vào tuyến 2.</p>"
             "<p>Học sinh đang học dở chương trình ở nơi khác thì vào giữa lộ trình, "
             "tại đúng cụm chuyên đề còn hổng, chứ không phải học lại từ đầu.</p>"
             "<h2>Bước 3 — Học theo lộ trình 34 tuần</h2>"
             "<p>Mỗi tuần có buổi học 90 phút và một sản phẩm phải nộp: một sơ đồ tư "
             "duy chương, một bài trình bày lời giải, hoặc một đề tự chấm. Bốn cổng "
             "kiểm tra đặt ở tuần 8, 16, 25 và 33. Sau mỗi cổng, tuyến và tốc độ học "
             "được chỉnh lại theo kết quả thật chứ không giữ nguyên cả năm.</p>"
             "<h2>Con đang ở tình huống nào</h2>"
             "<ul>"
             "<li><strong>Con học đều nhưng không bứt lên được.</strong> Thường là "
             'thiếu khâu đọc vị đề. Xem <a href="/doc-vi/">sơ đồ đọc vị</a> trước khi '
             "quyết định học thêm gì.</li>"
             "<li><strong>Con làm đúng ở nhà, sai ở lớp.</strong> Thường là lỗi trình "
             "bày và lỗi tự kiểm tra, không phải lỗi kiến thức. Trục phương pháp trong "
             "bài test sẽ chỉ ra.</li>"
             "<li><strong>Con nhắm thi vào 6 trường top.</strong> Xem "
             '<a href="/thi-vao-6/">màu sắc đề của từng trường</a> rồi vào tuyến 2 '
             "sớm — hai năm chuẩn bị khác hẳn một năm.</li>"
             "</ul>"
             '<div class="tom"><p><strong>Phần cần điền trước khi chạy thật:</strong> '
             "thay mục này bằng học phí, lịch khai giảng, địa điểm, hộp thư và số điện "
             "thoại thật. Trang mời tham gia mà không có thông tin liên hệ kiểm chứng "
             "được thì vừa khó lên hạng tìm kiếm vừa khó thuyết phục phụ huynh.</p></div>"),
            ("/test-dau-vao/", "Bài test bốn trục cho học sinh mới",
             "Test đầu vào bốn trục cho học sinh mới" + DUOI,
             "Bài test bốn trục đo nền kiến thức, tư duy, kỹ năng và phương pháp của "
             "học sinh tiểu học, dùng để xếp tuyến học chứ không để loại.",
             "<p>Một điểm tổng không nói được gì hữu ích. Hai học sinh cùng 6/10 có "
             "thể hổng ở hai chỗ hoàn toàn khác nhau, và chữa hai chỗ ấy là hai việc "
             "khác nhau. Vì vậy bài test đo bốn trục tách rời.</p>"
             "<h2>Bốn trục đo gì</h2>"
             "<ul>"
             "<li><strong>Nền kiến thức</strong> — những gì đáng lẽ đã chắc từ lớp "
             "dưới: bảng nhân chia, cấu tạo số, đơn vị đo, công thức hình cơ bản. "
             "Hổng trục này thì mọi thứ xây lên trên đều lung lay, và đây là trục phải "
             "vá trước tiên.</li>"
             "<li><strong>Tư duy</strong> — khả năng suy luận trên một tình huống chưa "
             "từng gặp. Đo bằng bài không có dạng sẵn: học sinh phải tự tìm cách chứ "
             "không nhớ lại cách.</li>"
             "<li><strong>Kỹ năng</strong> — tốc độ và độ chính xác khi tính. Nhiều em "
             "hiểu bài nhưng không kịp giờ; đó là vấn đề của trục này chứ không phải "
             "của trục kiến thức.</li>"
             "<li><strong>Phương pháp</strong> — có biết trình bày lời giải cho người "
             "khác đọc hiểu, và có thói quen tự kiểm tra lại bài trước khi nộp hay "
             "không. Đây là trục bị bỏ quên nhiều nhất và cũng là trục làm mất điểm "
             "oan nhiều nhất trong phòng thi.</li>"
             "</ul>"
             "<h2>Bài test không dùng để làm gì</h2>"
             "<p>Không dùng để xếp hạng học sinh với nhau, không dùng để loại ai, và "
             "không cho ra một nhãn giỏi hay kém. Kết quả bốn trục chỉ dùng vào một "
             'việc: xác định điểm bắt đầu cụ thể trong <a href="/lo-trinh/">lộ trình '
             '34 tuần</a> — vào tuyến nào và bắt đầu từ tuần nào.</p>'
             "<h2>Làm bài test thế nào</h2>"
             "<p>Bài làm trong 60 phút, trên giấy hoặc trực tuyến. Phụ huynh không "
             "nhắc bài — một bài test được nhắc sẽ cho ra một lộ trình sai, và người "
             'chịu thiệt là chính học sinh. Sau khi có kết quả, xem '
             '<a href="/dang-ky/">ba bước tham gia chương trình</a>.</p>'),
        ]:
            vet = chung + [(h1, dd)]
            self.ghi(dd, seo.trang(
                dd=dd, tieu_de=seo.ghep_tieu_de(td), mo_ta=seo.rut(mt, 158), h1=h1,
                than=than, vet=vet, ngay=NGAY,
                json_ld=[seo.duong_dan_dieu_huong(vet)]), 0.5, h1)

    # ── 12. sitemap, robots, trang 404 ───────────────────────────────────
    def lam_ky_thuat(self) -> None:
        # Sơ đồ site: một tệp cho mỗi 1000 địa chỉ, kèm một tệp chỉ mục. Giới hạn
        # của chuẩn là 50 000 địa chỉ một tệp; chia nhỏ hơn để dễ soi trong Search
        # Console xem nhóm trang nào đã được thu thập tới đâu.
        nhom: dict[str, list] = defaultdict(list)
        for dd, ut in sorted(self.trang):
            k = dd.strip("/").split("/")[0] or "goc"
            if k.startswith("toan-lop"):
                k = "chuong-trinh"
            elif k not in ("phieu", "on-chac", "doc-vi", "lo-trinh", "thi-vao-6"):
                k = "goc"
            nhom[k].append((dd, ut))

        ten_tep = []
        for k, ds in sorted(nhom.items()):
            for i in range(0, len(ds), 1000):
                phan = ds[i:i + 1000]
                ten = f"sitemap-{k}{'' if len(ds) <= 1000 else f'-{i // 1000 + 1}'}.xml"
                than = "".join(
                    f"<url><loc>{seo.TEN_MIEN}{dd}</loc><lastmod>{NGAY}</lastmod>"
                    f"<priority>{ut:.1f}</priority></url>" for dd, ut in phan)
                (self.ra / ten).write_text(
                    '<?xml version="1.0" encoding="UTF-8"?>\n'
                    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
                    + than + "</urlset>", encoding="utf-8")
                ten_tep.append(ten)

        (self.ra / "sitemap.xml").write_text(
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
            + "".join(f"<sitemap><loc>{seo.TEN_MIEN}/{t}</loc>"
                      f"<lastmod>{NGAY}</lastmod></sitemap>" for t in ten_tep)
            + "</sitemapindex>", encoding="utf-8")

        # robots.txt: mở toàn bộ. Không chặn gì cả, vì không có gì cần giấu —
        # phần thu phí đã được cắt ngay trong HTML chứ không dựa vào việc chặn.
        (self.ra / "robots.txt").write_text(
            "User-agent: *\n"
            "Allow: /\n"
            "Disallow: /tim-kiem?\n\n"
            f"Sitemap: {seo.TEN_MIEN}/sitemap.xml\n", encoding="utf-8")

        vet = [("Trang chủ", "/")]
        (self.ra / "404.html").write_text(seo.trang(
            dd="/404.html", tieu_de=seo.ghep_tieu_de("Không tìm thấy trang", DUOI),
            mo_ta="Địa chỉ này không còn hoặc chưa bao giờ tồn tại.",
            h1="Không tìm thấy trang này",
            than="<p>Địa chỉ vừa mở không còn hoặc chưa bao giờ tồn tại. Thử bắt đầu "
                 "lại từ một trong các trang chính:</p>" + the_lien_ket([
                     ("Toán lớp 3", "Tám nhóm chuyên đề · hai tuyến", "/toan-lop-3/"),
                     ("Toán lớp 4", "Tám nhóm chuyên đề · hai tuyến", "/toan-lop-4/"),
                     ("Toán lớp 5", "Tám nhóm chuyên đề · hai tuyến", "/toan-lop-5/"),
                     ("Đọc vị đề", "24 sơ đồ nhận dạng bài toán", "/doc-vi/"),
                     ("Lộ trình", "Sáu lộ trình 34 tuần", "/lo-trinh/"),
                     ("Thi vào lớp 6", "Bảy trường top Hà Nội", "/thi-vao-6/")]),
            vet=vet, ngay=NGAY, json_ld=[seo.duong_dan_dieu_huong(vet)]),
            encoding="utf-8")

    def dung(self) -> None:
        self.lam_chu()
        self.lam_lop()
        self.lam_nhom()
        self.lam_dang_bai()
        self.lam_cum()
        self.lam_phieu()
        self.lam_on_chac()
        self.lam_doc_vi()
        self.lam_lo_trinh()
        self.lam_thi_vao_6()
        self.lam_de_thi()
        self.lam_uy_tin()
        self.lam_ky_thuat()


def main() -> None:
    ap = argparse.ArgumentParser(description="Dựng website công khai MATH TIỂU HỌC 365")
    ap.add_argument("--ra", default=str(GOC / "11-seo" / "site"))
    ap.add_argument("--giu", action="store_true",
                    help="không xoá thư mục đích trước khi dựng")
    a = ap.parse_args()

    ra = Path(a.ra)
    if ra.exists() and not a.giu:
        shutil.rmtree(ra)
    ra.mkdir(parents=True, exist_ok=True)

    s = Site(ra)
    s.dung()

    tong = sum((ra / f).stat().st_size for f in
               [p.relative_to(ra) for p in ra.rglob("*") if p.is_file()])
    print(f"\n  Đã dựng {len(s.trang)} trang vào {ra}")
    theo = defaultdict(int)
    for dd, _ in s.trang:
        k = dd.strip("/").split("/")[0] or "(trang chủ)"
        theo["chương trình" if k.startswith("toan-lop") else k] += 1
    for k, n in sorted(theo.items(), key=lambda x: -x[1]):
        print(f"     {n:>5}  {k}")
    print(f"  Tổng dung lượng {tong / 1e6:.1f} MB")
    if s.mong:
        print(f"\n  ⚠ {len(s.mong)} trang dưới ngưỡng nội dung:")
        for dd, n in sorted(s.mong, key=lambda x: x[1])[:12]:
            print(f"     {n:>4} từ  {dd}")
    else:
        print("  Mọi trang đều đạt ngưỡng nội dung.")


if __name__ == "__main__":
    main()
