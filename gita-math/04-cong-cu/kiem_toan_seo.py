#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kiểm toán website trước khi phát hành.

    python3 04-cong-cu/kiem_toan_seo.py [--site 11-seo/site]

Mỗi hạng mục dưới đây là một lỗi **thật sự làm mất thứ hạng**, không phải một
mục trong danh sách mẹo. Bốn nhóm lỗi hay gặp nhất và cái giá của chúng:

* **Liên kết gãy** — cỗ máy đi vào ngõ cụt, phần uy tín rót vào trang đó mất
  trắng, và người đọc gặp trang trắng.
* **Tiêu đề hoặc mô tả trùng nhau** — hai trang tranh nhau cùng một truy vấn,
  cỗ máy chọn đại một trang và thường chọn sai.
* **Dữ liệu có cấu trúc hỏng cú pháp** — bị bỏ qua toàn bộ, im lặng, không báo.
* **Trang mỏng** — kéo tụt đánh giá chất lượng của cả tên miền chứ không chỉ
  của riêng trang ấy.

Chạy lệnh này trước mỗi lần đưa site lên. Có bất kỳ lỗi nào thì đừng đưa lên.
"""
from __future__ import annotations

import argparse
import html as _html
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent

X = "\033[31m✘\033[0m"
V = "\033[32m✔\033[0m"
DAM = "\033[1m"
HET = "\033[0m"

# Ngưỡng. Con số lấy theo chỗ Google cắt ngắn trên trang kết quả, đo bằng ký tự
# tiếng Việt: tiêu đề cắt quanh 60, mô tả cắt quanh 158 trên máy tính bàn.
TIEU_DE_MAX = 60
MO_TA_MIN, MO_TA_MAX = 70, 158
CHU_MIN = 250            # trang dưới mức này bị coi là trang mỏng


class KiemToan:
    def __init__(self, goc: Path):
        self.goc = goc
        self.loi: list[str] = []
        self.dat: list[str] = []
        self.tep = sorted(p for p in goc.rglob("*.html"))
        self.trang: dict[str, dict] = {}

    def bao(self, ok: bool, mo_ta: str, chi_tiet: list[str] | None = None) -> None:
        if ok:
            self.dat.append(mo_ta)
        else:
            self.loi.append(mo_ta)
            print(f"   {X} {mo_ta}")
            for d in (chi_tiet or [])[:8]:
                print(f"        {d}")
            n = len(chi_tiet or [])
            if n > 8:
                print(f"        … và {n - 8} chỗ nữa")
            return
        print(f"   {V} {mo_ta}")

    # ── đọc ──────────────────────────────────────────────────────────────
    def doc_het(self) -> None:
        for p in self.tep:
            h = p.read_text(encoding="utf-8")
            dd = "/" + str(p.relative_to(self.goc)).replace("\\", "/")
            dd = dd.removesuffix("index.html") if dd.endswith("/index.html") else dd
            if not dd.endswith("/") and dd != "/404.html":
                dd += "/"
            self.trang[dd] = {
                "html": h,
                "tieu_de": self._lay(r"<title>(.*?)</title>", h),
                "mo_ta": self._lay(r'<meta name="description" content="(.*?)">', h),
                "canonical": self._lay(r'<link rel="canonical" href="(.*?)">', h),
                "h1": re.findall(r"<h1>(.*?)</h1>", h, re.S),
                "lien_ket": re.findall(r'<a[^>]+href="(/[^"#?]*)"', h),
                "ld": re.findall(r'<script type="application/ld\+json">(.*?)</script>',
                                 h, re.S),
                "chu": len(re.sub(r"<[^>]+>", " ", re.sub(
                    r"<(script|style|nav|header|footer)[^>]*>.*?</\1>", " ", h,
                    flags=re.S)).split()),
                "tieu_muc": re.findall(r"<h([1-6])[ >]", h),
            }

    @staticmethod
    def _lay(mau: str, h: str) -> str:
        """Lấy nội dung một thẻ, đã hoàn nguyên các ký tự thoát HTML.

        Phải hoàn nguyên trước khi đo độ dài: trong mã nguồn dấu "&" được viết
        thành "&amp;" dài gấp năm lần, còn Google đo trên chữ người đọc thấy.
        Đo trên chuỗi chưa hoàn nguyên sẽ báo lỗi giả ở mọi tiêu đề có dấu "&".
        """
        m = re.search(mau, h, re.S)
        return _html.unescape(m.group(1).strip()) if m else ""

    # ── các phép kiểm ────────────────────────────────────────────────────
    def kiem(self) -> None:
        T = self.trang
        print(f"\n{DAM}1 · CẤU TRÚC TỪNG TRANG{HET}")

        thieu = [d for d, v in T.items() if not v["tieu_de"]]
        self.bao(not thieu, "Mọi trang đều có thẻ tiêu đề", thieu)

        dai = [f"{len(v['tieu_de'])} ký tự · {d}" for d, v in T.items()
               if len(v["tieu_de"]) > TIEU_DE_MAX]
        self.bao(not dai, f"Không tiêu đề nào vượt {TIEU_DE_MAX} ký tự", dai)

        thieu = [d for d, v in T.items() if not v["mo_ta"]]
        self.bao(not thieu, "Mọi trang đều có thẻ mô tả", thieu)

        lech = [f"{len(v['mo_ta'])} ký tự · {d}" for d, v in T.items()
                if d != "/404.html" and v["mo_ta"]
                and not MO_TA_MIN <= len(v["mo_ta"]) <= MO_TA_MAX]
        self.bao(not lech, f"Mọi mô tả dài {MO_TA_MIN}–{MO_TA_MAX} ký tự", lech)

        sai = [f"{len(v['h1'])} thẻ h1 · {d}" for d, v in T.items()
               if len(v["h1"]) != 1]
        self.bao(not sai, "Mỗi trang đúng một thẻ h1", sai)

        # Bậc tiêu đề không được nhảy cóc (h2 rồi thẳng xuống h4).
        nhay = []
        for d, v in T.items():
            bac = [int(x) for x in v["tieu_muc"]]
            for a, b in zip(bac, bac[1:]):
                if b > a + 1:
                    nhay.append(f"h{a} → h{b} · {d}")
                    break
        self.bao(not nhay, "Bậc tiêu đề không nhảy cóc", nhay)

        sai = [d for d, v in T.items()
               if v["canonical"] and not v["canonical"].endswith(d)
               and d != "/404.html"]
        self.bao(not sai, "Địa chỉ chuẩn của mọi trang trỏ đúng vào chính nó", sai)

        thieu = [d for d, v in T.items() if '<html lang="vi">' not in v["html"]]
        self.bao(not thieu, "Mọi trang khai báo ngôn ngữ tiếng Việt", thieu)

        thieu = [d for d, v in T.items()
                 if 'name="viewport"' not in v["html"]]
        self.bao(not thieu, "Mọi trang khai báo khung nhìn cho điện thoại", thieu)

        print(f"\n{DAM}2 · TRÙNG LẶP{HET}")
        for ten, khoa in (("tiêu đề", "tieu_de"), ("mô tả", "mo_ta")):
            dem = Counter(v[khoa] for v in T.values() if v[khoa])
            trung = [f"{n} trang cùng {ten}: {t[:64]}"
                     for t, n in dem.most_common() if n > 1]
            self.bao(not trung, f"Không có hai trang trùng {ten}", trung)

        # Nội dung trùng: so phần thân đã bỏ khung, để bắt trang sinh máy giống hệt nhau.
        van = defaultdict(list)
        for d, v in T.items():
            than = re.search(r'<main id="noi-dung">(.*?)</main>', v["html"], re.S)
            if than:
                van[" ".join(re.sub(r"<[^>]+>", " ", than.group(1)).split())].append(d)
        trung = [f"{len(ds)} trang cùng nội dung: {ds[0]}" for ds in van.values()
                 if len(ds) > 1]
        self.bao(not trung, "Không có hai trang trùng nguyên nội dung", trung)

        print(f"\n{DAM}3 · LIÊN KẾT NỘI BỘ{HET}")
        co = set(T) | {"/robots.txt", "/sitemap.xml"}
        gay = defaultdict(list)
        for d, v in T.items():
            for lk in v["lien_ket"]:
                dich = lk if lk.endswith(("/", ".xml", ".txt", ".html")) else lk + "/"
                if dich not in co and not dich.startswith("/anh/"):
                    gay[dich].append(d)
        self.bao(not gay, "Mọi liên kết nội bộ đều tới trang có thật",
                 [f"{k}  ← {v[0]}" + (f" và {len(v) - 1} trang nữa" if len(v) > 1 else "")
                  for k, v in sorted(gay.items())])

        # Trang mồ côi: không trang nào trỏ tới. Cỗ máy chỉ tới được qua sơ đồ
        # site, và trang không có liên kết trỏ vào thì gần như không có uy tín.
        duoc_tro = {lk if lk.endswith("/") else lk + "/"
                    for v in T.values() for lk in v["lien_ket"]}
        mo_coi = sorted(d for d in T if d not in duoc_tro
                        and d not in ("/", "/404.html"))
        self.bao(not mo_coi, "Không có trang mồ côi", mo_coi)

        print(f"\n{DAM}4 · DỮ LIỆU CÓ CẤU TRÚC{HET}")
        hong, thieu_bc = [], []
        for d, v in T.items():
            if not v["ld"]:
                thieu_bc.append(d)
                continue
            for khoi in v["ld"]:
                try:
                    o = json.loads(khoi)
                except json.JSONDecodeError as e:
                    hong.append(f"{d} · {e}")
                    continue
                loai = {x.get("@type") for x in o.get("@graph", [])}
                if "BreadcrumbList" not in loai and d != "/":
                    thieu_bc.append(d)
                if "EducationalOrganization" not in loai:
                    hong.append(f"{d} · thiếu khối nhận diện tổ chức")
        self.bao(not hong, "Mọi khối dữ liệu có cấu trúc đọc được và đủ tổ chức", hong)
        self.bao(not thieu_bc, "Mọi trang con có vệt đường dẫn khai báo", thieu_bc)

        # Không được tự gắn số sao khi chưa có đánh giá thật.
        sao = [d for d, v in T.items() if "AggregateRating" in v["html"]]
        p_dg = GOC / "11-seo" / "danh-gia" / "danh-gia.json"
        that = p_dg.exists() and json.loads(p_dg.read_text(encoding="utf-8")).get("y_kien")
        self.bao(not sao or bool(that),
                 "Không trang nào gắn số sao khi chưa có đánh giá thật", sao)

        print(f"\n{DAM}5 · CHẤT LƯỢNG NỘI DUNG{HET}")
        mong = [f"{v['chu']} từ · {d}" for d, v in T.items()
                if d != "/404.html" and v["chu"] < CHU_MIN]
        self.bao(not mong, f"Không trang nào dưới {CHU_MIN} từ nội dung", mong)

        # Nhồi từ khoá: một từ khoá chiếm quá 3% số từ là dấu hiệu viết cho máy
        # đọc chứ không cho người đọc, và bị đánh giá là nội dung kém.
        # Nhồi từ khoá là **lặp lại cụm từ khoá đích** một cách bất thường, chứ
        # không phải một từ đơn xuất hiện nhiều. Đếm tần suất từ đơn cho kết quả
        # vô nghĩa trên trang có lời giải toán: một trang về bài toán thời gian
        # tự nhiên có chữ "phút" ở khắp nơi, và đó là đề bài chứ không phải mánh
        # xếp hạng. Vì vậy phép đo ở đây lấy đúng **cụm từ khoá đích của trang**
        # — chính là thẻ h1 — rồi đếm xem cụm ấy được nhắc lại bao nhiêu lần
        # trong phần nội dung chính. Văn bản viết cho người đọc nhắc lại cụm ấy
        # vài lần; văn bản viết để lừa cỗ máy nhắc lại hàng chục lần.
        # Ngưỡng hiệu chỉnh trên chính kho này: mật độ cụm từ khoá đích có trung
        # vị 0,98% và phân vị 99 là 2,80%, đỉnh 3,06% — và đỉnh ấy chỉ là một
        # đoạn mở đầu ngắn nhắc lại tên chuyên đề ba lần, hoàn toàn bình thường.
        # Vì vậy phép kiểm đòi **cả hai điều kiện**: nhắc lại từ 8 lần trở lên
        # *và* chiếm quá 2% số từ. Một trang dài nhắc lại bảy lần là văn viết
        # bình thường; một trang 400 từ nhắc lại mười hai lần thì không.
        LAP_MAX, MAT_DO_MAX = 8, 0.02
        nhoi = []
        for d, v in T.items():
            if not v["h1"]:
                continue
            khoi = re.search(r'<main id="noi-dung">(.*?)</main>', v["html"], re.S)
            than = re.sub(r'<ul class="the">.*?</ul>|<section class="vd">.*?</section>',
                          " ", khoi.group(1) if khoi else "", flags=re.S)
            than = " ".join(re.sub(r"<[^>]+>", " ",
                                   _html.unescape(than)).split()).lower()
            cum = " ".join(re.sub(r"<[^>]+>", " ",
                                  _html.unescape(v["h1"][0])).split()).lower()
            cum = re.split(r"\s+[—·]\s+", cum)[0]      # bỏ phần bổ nghĩa sau gạch
            if len(cum.split()) < 2:
                continue
            n, tu = than.count(cum), len(than.split())
            if n >= LAP_MAX and tu and n / tu > MAT_DO_MAX:
                nhoi.append(f"nhắc lại {n} lần cụm “{cum}” trong {tu} từ "
                            f"({n / tu:.1%}) · {d}")
        self.bao(not nhoi, "Không trang nào có dấu hiệu nhồi từ khoá", nhoi)

        print(f"\n{DAM}6 · TỆP KỸ THUẬT{HET}")
        p_sm = self.goc / "sitemap.xml"
        self.bao(p_sm.exists(), "Có tệp chỉ mục sơ đồ site")
        trong_sm: set[str] = set()
        if p_sm.exists():
            for m in re.finditer(r"<loc>([^<]+)</loc>", p_sm.read_text(encoding="utf-8")):
                con = self.goc / Path(m.group(1)).name
                if con.exists():
                    trong_sm |= {re.sub(r"^https?://[^/]+", "", x) for x in
                                 re.findall(r"<loc>([^<]+)</loc>",
                                            con.read_text(encoding="utf-8"))}
        thieu = sorted(set(T) - trong_sm - {"/404.html"})
        self.bao(not thieu, "Mọi trang đều có trong sơ đồ site", thieu)
        thua = sorted(trong_sm - set(T))
        self.bao(not thua, "Sơ đồ site không liệt kê trang không tồn tại", thua)

        p_rb = self.goc / "robots.txt"
        self.bao(p_rb.exists() and "Sitemap:" in p_rb.read_text(encoding="utf-8"),
                 "robots.txt có và trỏ tới sơ đồ site")
        self.bao((self.goc / "404.html").exists(), "Có trang báo không tìm thấy")

        chan = [d for d, v in T.items() if "noindex" in v["html"]]
        self.bao(not chan, "Không trang nào bị chặn khỏi chỉ mục ngoài ý muốn", chan)

        print(f"\n{DAM}7 · TỐC ĐỘ TẢI{HET}")
        ngoai = defaultdict(list)
        for d, v in T.items():
            for u in re.findall(r'(?:src|href)="(https?://[^"]+)"', v["html"]):
                if not u.startswith("https://mathtieuhoc365.vn"):
                    ngoai[u.split("/")[2]].append(d)
        self.bao(not ngoai, "Không trang nào phải tải tệp từ máy chủ ngoài",
                 [f"{k} ({len(v)} trang)" for k, v in ngoai.items()])

        nang = [f"{v['html'].count('') // 1000} KB · {d}" for d, v in T.items()
                if len(v["html"].encode()) > 300_000]
        self.bao(not nang, "Không trang nào nặng quá 300 KB", nang)

        thieu_alt = [d for d, v in T.items()
                     if re.search(r"<img(?![^>]*\balt=)", v["html"])]
        self.bao(not thieu_alt, "Mọi ảnh đều có văn bản thay thế", thieu_alt)


def main() -> None:
    ap = argparse.ArgumentParser(description="Kiểm toán website trước khi phát hành")
    ap.add_argument("--site", default=str(GOC / "11-seo" / "site"))
    a = ap.parse_args()
    goc = Path(a.site)
    if not goc.exists():
        raise SystemExit(f"Chưa có {goc}. Chạy build_site.py trước.")

    kt = KiemToan(goc)
    kt.doc_het()
    print(f"{DAM}KIỂM TOÁN WEBSITE — {len(kt.trang)} trang{HET}")
    kt.kiem()

    n = len(kt.dat) + len(kt.loi)
    print("\n" + "─" * 72)
    if kt.loi:
        print(f"\033[31m\033[1m  CÒN LỖI: {len(kt.loi)}/{n} hạng mục chưa đạt{HET}")
        sys.exit(1)
    print(f"\033[32m\033[1m  SẠCH LỖI · {n} hạng mục đạt{HET}")


if __name__ == "__main__":
    main()
