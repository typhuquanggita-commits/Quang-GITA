#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kết xuất phiếu Markdown thành HTML khổ A4 in được, mang nhận diện GITA.

  python3 04-cong-cu/render_html.py 03-phieu/T1/L4/GITA-T1-L4-C03-NC.md
  python3 04-cong-cu/render_html.py --all

Mỗi phiếu học sinh ra HAI tệp trong 04-cong-cu/ban-in/:
  <mã>-DE.html  — bản phát cho học viên, KHÔNG có đáp án
  <mã>-DA.html  — bản của huấn luyện viên, chỉ phần hướng dẫn giải và đáp án
Phiếu GP và HD chỉ ra một tệp.
Mở tệp bằng trình duyệt rồi in ra PDF hoặc in giấy (khổ A4, lề 14 mm).
"""
from __future__ import annotations
import argparse, html, re, sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "04-cong-cu" / "ban-in"
MOC_DAP_AN = ["## HƯỚNG DẪN GIẢI VÀ ĐÁP ÁN", "## ĐÁP ÁN VÀ BIỂU ĐIỂM",
              "## ĐÁP ÁN VÀ BẢNG CHẤM"]

CSS = """
@page { size: A4; margin: 14mm 14mm 16mm; }
*{box-sizing:border-box}
body{font-family:"Be Vietnam Pro","Segoe UI",Arial,sans-serif;font-size:11.5pt;
  line-height:1.5;color:#111827;margin:0;background:#fff}
.wrap{max-width:182mm;margin:0 auto}
header{border-bottom:2.5pt solid #1B5EA8;padding-bottom:6pt;margin-bottom:10pt;
  display:flex;gap:10pt;align-items:flex-start}
header svg{flex:none}
header .id{font-size:8.5pt;letter-spacing:.12em;text-transform:uppercase;color:#4B5563;font-weight:700}
header h1{font-family:"Bitter",Bookman,Georgia,serif;font-size:15pt;margin:2pt 0 3pt;color:#1B5EA8;font-weight:800;line-height:1.2}
header .meta{font-size:9pt;color:#4B5563;line-height:1.45}
header .ma{font-family:"IBM Plex Mono",Consolas,monospace;font-size:9pt;color:#1B5EA8;font-weight:600}
.hs{border:1pt solid #D6DFEA;border-radius:3pt;padding:5pt 8pt;margin:8pt 0 12pt;font-size:10pt}
h2{font-size:12pt;color:#1B5EA8;margin:14pt 0 6pt;padding:4pt 7pt;background:#EAF2FA;
  border-left:3pt solid #2E7BC4;border-radius:0 3pt 3pt 0;page-break-after:avoid}
h3{font-size:11pt;margin:10pt 0 4pt;page-break-after:avoid}
h4{font-size:9pt;letter-spacing:.1em;text-transform:uppercase;color:#4B5563;margin:8pt 0 3pt}
p{margin:0 0 5pt}
ul,ol{margin:0 0 6pt;padding-left:16pt}
li{margin-bottom:2pt}
blockquote{margin:0 0 8pt;padding:5pt 9pt;background:#F5F8FC;border-left:2.5pt solid #5AA0DC;
  border-radius:0 3pt 3pt 0;font-size:10.5pt}
table{border-collapse:collapse;width:100%;font-size:9.5pt;margin:0 0 8pt}
th,td{border:0.6pt solid #D6DFEA;padding:3pt 5pt;text-align:left;vertical-align:top}
th{background:#EAF2FA;font-size:8.5pt;text-transform:uppercase;letter-spacing:.06em}
pre{background:#F5F8FC;border:0.6pt solid #D6DFEA;border-radius:3pt;padding:6pt;
  font-family:"IBM Plex Mono",Consolas,monospace;font-size:8.5pt;line-height:1.4;
  overflow-x:auto;white-space:pre-wrap}
code{font-family:"IBM Plex Mono",Consolas,monospace;font-size:.9em}
hr{border:0;border-top:0.6pt solid #D6DFEA;margin:10pt 0}
.bai{page-break-inside:avoid;margin-bottom:9pt}
.y{margin:2pt 0 2pt 14pt}
.ke{border-bottom:0.6pt dotted #9CA3AF;display:inline-block;min-width:38mm;height:11pt}
footer{position:fixed;bottom:6mm;left:0;right:0;text-align:center;font-size:8pt;color:#6B7280}
.badge{display:inline-block;font-size:8pt;font-weight:700;padding:1pt 6pt;border-radius:8pt;
  background:#1B5EA8;color:#fff;letter-spacing:.05em}
.badge.da{background:#E0242A}
@media print{ .noprint{display:none} }
"""

LOGO = ('<svg width="56" height="17.8" viewBox="14 2 452 144" aria-hidden="true">'
        '<path d="M 158.8,244.1 L 128.4,243.6 L 100.6,239.5 L 76.1,232.4 L 55.3,222.6 L 38.9,210.3 L 27.4,195.8 L 21.0,179.7 L 20.0,162.2 L 24.3,143.8 L 34.0,125.1 L 48.7,106.5 L 68.1,88.5 L 91.7,71.6 L 118.9,56.2 L 149.0,42.8 L 181.2,31.6 L 214.8,23.1 L 248.8,17.2 L 282.4,14.3 L 314.7,14.4 L 344.9,17.4 L 372.2,23.2 L 395.9,31.6 L 415.5,42.4 L 430.2,55.4 L 439.2,70.2 L 439.2,70.2 L 426.9,57.3 L 410.9,46.2 L 390.8,37.3 L 367.3,30.8 L 340.7,26.8 L 311.7,25.5 L 281.1,26.7 L 249.5,30.4 L 217.7,36.6 L 186.4,45.1 L 156.3,55.5 L 128.3,67.8 L 102.8,81.6 L 80.6,96.6 L 62.1,112.5 L 47.8,128.8 L 38.1,145.2 L 33.2,161.5 L 33.2,177.1 L 38.1,191.7 L 47.9,205.1 L 62.4,216.8 L 81.2,226.7 L 103.9,234.5 L 130.0,240.2 L 158.8,244.1 Z" fill="#1B5EA8"/>'
        '    <path d="M 144.3,226.2 L 119.3,224.0 L 97.3,218.5 L 78.7,210.6 L 63.9,200.4 L 53.4,188.3 L 47.6,174.7 L 46.5,159.8 L 50.2,144.0 L 58.7,127.9 L 71.7,111.9 L 88.9,96.3 L 109.9,81.7 L 134.1,68.3 L 160.8,56.7 L 189.5,47.0 L 219.3,39.5 L 249.4,34.4 L 279.1,31.9 L 307.5,31.9 L 334.0,34.5 L 357.8,39.6 L 378.3,46.9 L 394.9,56.3 L 406.6,67.7 L 406.6,67.7 L 392.2,58.4 L 374.6,50.8 L 353.9,45.3 L 330.5,42.0 L 305.0,41.0 L 277.9,42.2 L 249.9,45.6 L 221.7,51.1 L 193.9,58.5 L 167.2,67.7 L 142.2,78.4 L 119.5,90.4 L 99.8,103.3 L 83.3,117.0 L 70.6,131.1 L 62.0,145.2 L 57.7,159.1 L 57.7,172.4 L 62.2,184.9 L 71.0,196.2 L 84.0,206.1 L 100.9,214.5 L 121.2,221.0 L 144.3,226.2 Z" fill="#5AA0DC"/>'
        '    <path d="M 129.0,206.8 L 110.6,202.7 L 95.5,196.0 L 83.8,187.4 L 76.0,177.2 L 72.0,165.7 L 72.2,153.2 L 76.5,140.0 L 84.8,126.5 L 97.0,113.2 L 112.6,100.3 L 131.4,88.1 L 152.8,77.2 L 176.3,67.6 L 201.2,59.8 L 227.0,53.8 L 252.9,49.8 L 278.2,47.9 L 302.4,48.2 L 324.7,50.6 L 344.6,55.0 L 361.4,61.3 L 374.4,69.6 L 374.4,69.6 L 359.1,63.7 L 341.5,59.3 L 321.7,56.7 L 300.0,55.9 L 277.0,57.0 L 253.0,59.8 L 228.8,64.3 L 204.9,70.4 L 181.8,77.9 L 160.0,86.7 L 140.0,96.5 L 122.4,107.1 L 107.5,118.3 L 95.6,129.8 L 87.2,141.5 L 82.2,153.0 L 81.0,164.1 L 83.6,174.6 L 89.8,184.2 L 99.7,192.8 L 112.9,200.3 L 129.0,206.8 Z" fill="#E0242A"/>'
        '<path d="M 322.0,39.0 L 323.1,42.5 L 326.8,42.5 L 323.8,44.6 L 324.9,48.0 L 322.0,45.9 L 319.1,48.0 L 320.2,44.6 L 317.2,42.5 L 320.9,42.5 Z" fill="#1B5EA8"/>'
        '    <path d="M 339.9,35.5 L 341.2,39.5 L 345.4,39.5 L 342.0,41.9 L 343.3,45.9 L 339.9,43.5 L 336.5,45.9 L 337.8,41.9 L 334.4,39.5 L 338.6,39.5 Z" fill="#1B5EA8"/>'
        '    <path d="M 357.8,30.9 L 359.3,35.5 L 364.1,35.5 L 360.2,38.3 L 361.7,42.9 L 357.8,40.0 L 353.9,42.9 L 355.4,38.3 L 351.5,35.5 L 356.3,35.5 Z" fill="#1B5EA8"/>'
        '    <path d="M 375.7,25.6 L 377.4,30.9 L 382.9,30.9 L 378.5,34.1 L 380.2,39.4 L 375.7,36.1 L 371.2,39.4 L 372.9,34.1 L 368.5,30.9 L 374.0,30.9 Z" fill="#1B5EA8"/>'
        '    <path d="M 393.6,19.8 L 395.6,25.9 L 401.9,25.9 L 396.8,29.6 L 398.7,35.6 L 393.6,31.9 L 388.5,35.6 L 390.4,29.6 L 385.3,25.9 L 391.6,25.9 Z" fill="#1B5EA8"/>'
        '    <path d="M 411.5,13.5 L 413.8,20.5 L 421.1,20.5 L 415.2,24.8 L 417.4,31.7 L 411.5,27.4 L 405.6,31.7 L 407.8,24.8 L 401.9,20.5 L 409.2,20.5 Z" fill="#1B5EA8"/>'
        '    <path d="M 429.4,6.8 L 432.0,14.8 L 440.4,14.8 L 433.6,19.7 L 436.2,27.7 L 429.4,22.8 L 422.6,27.7 L 425.2,19.7 L 418.4,14.8 L 426.8,14.8 Z" fill="#1B5EA8"/>'
        '</svg>')


# ───────────────────── bộ dựng Markdown tối giản ─────────────────────
def inline(s: str) -> str:
    s = html.escape(s, quote=False)
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(^|[^*])\*([^*\n]+)\*", r"\1<em>\2</em>", s)
    s = re.sub(r"\.{4,}", lambda m: '<span class="ke"></span>', s)
    return s


def md(text: str) -> str:
    L = text.split("\n")
    out, buf, i = [], [], 0

    def xa():
        if buf:
            out.append("<p>" + inline(" ".join(buf)) + "</p>")
            buf.clear()

    while i < len(L):
        ln = L[i]
        if ln.startswith("```"):
            xa(); body = []; i += 1
            while i < len(L) and not L[i].startswith("```"):
                body.append(L[i]); i += 1
            i += 1
            out.append("<pre>" + html.escape("\n".join(body)) + "</pre>")
            continue
        if re.match(r"^\s*\|.*\|\s*$", ln) and i + 1 < len(L) and \
                re.match(r"^\s*\|[\s:|-]+\|\s*$", L[i + 1]):
            xa()
            o = lambda r: [c.strip() for c in r.strip().strip("|").split("|")]
            head = o(ln); i += 2; rows = []
            while i < len(L) and re.match(r"^\s*\|.*\|\s*$", L[i]):
                rows.append(o(L[i])); i += 1
            out.append("<table><thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in head)
                       + "</tr></thead><tbody>"
                       + "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>"
                                 for r in rows) + "</tbody></table>")
            continue
        m = re.match(r"^(#{1,4})\s+(.*)$", ln)
        if m:
            xa(); n = len(m.group(1))
            out.append(f"<h{n}>{inline(m.group(2))}</h{n}>"); i += 1; continue
        if re.match(r"^\s*(---|___)\s*$", ln):
            xa(); out.append("<hr>"); i += 1; continue
        if ln.startswith(">"):
            xa(); body = []
            while i < len(L) and L[i].startswith(">"):
                body.append(re.sub(r"^>\s?", "", L[i])); i += 1
            out.append("<blockquote>" + md("\n".join(body)) + "</blockquote>"); continue
        if re.match(r"^\s*([-*+]|\d+\.)\s+", ln):
            xa(); ord_ = bool(re.match(r"^\s*\d+\.", ln)); it = []
            while i < len(L) and re.match(r"^\s*([-*+]|\d+\.)\s+", L[i]):
                t = re.sub(r"^\s*([-*+]|\d+\.)\s+", "", L[i]); i += 1
                t = re.sub(r"^\[ \]\s*", "☐ ", t)
                it.append(f"<li>{inline(t)}</li>")
            tag = "ol" if ord_ else "ul"
            out.append(f"<{tag}>" + "".join(it) + f"</{tag}>"); continue
        if re.match(r"^\s{0,3}[a-z]\)\s", ln):
            xa(); t = ln.strip(); i += 1
            # gộp phần xuống dòng của cùng một ý
            while (i < len(L) and L[i].strip()
                   and not re.match(r"^\s{0,3}[a-z]\)\s", L[i])
                   and not re.match(r"^(#{1,4}\s|>|\||```|\s*([-*+]|\d+\.)\s)", L[i])
                   and not re.match(r"^\s*(---|___)\s*$", L[i])):
                t += " " + L[i].strip(); i += 1
            out.append(f'<div class="y">{inline(t)}</div>'); continue
        if not ln.strip():
            xa(); i += 1; continue
        buf.append(ln.strip()); i += 1
    xa()
    return "\n".join(out)


def trang(fm: dict, tieu_de: str, than: str, la_dap_an: bool) -> str:
    ma = fm.get("ma", fm.get("ma_de", ""))
    dong = []
    if fm.get("cum"):
        dong.append(f"Cụm C{fm['cum']:02d} — {fm.get('cum_ten','')}"
                    + (f" · Buổi {fm['buoi_trong_cum']}/6" if fm.get("buoi_trong_cum") else ""))
    if fm.get("loai_ten"):
        dong.append(fm["loai_ten"])
    if fm.get("lop"):
        dong.append(f"Lớp {fm['lop']}" + (f" · Tuyến {fm['tuyen'][-1]}" if fm.get("tuyen") else ""))
    if fm.get("thoi_luong_phut") or fm.get("thoi_luong"):
        dong.append(f"{fm.get('thoi_luong_phut') or fm.get('thoi_luong')} phút · "
                    f"thang {fm.get('thang_diem', 100)}")
    hs = ("" if la_dap_an else
          '<div class="hs">Họ và tên: <span class="ke"></span>&nbsp;&nbsp;Lớp: '
          '<span class="ke" style="min-width:20mm"></span>&nbsp;&nbsp;Ngày: '
          '<span class="ke" style="min-width:26mm"></span>&nbsp;&nbsp;Điểm: '
          '<span class="ke" style="min-width:20mm"></span></div>')
    return f"""<!DOCTYPE html><html lang="vi"><head><meta charset="utf-8">
<title>{html.escape(ma)} — {'Đáp án' if la_dap_an else 'Đề'}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bitter:wght@700;800&family=Be+Vietnam+Pro:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;600&display=swap">
<style>{CSS}</style></head><body><div class="wrap">
<header>{LOGO}<div>
  <div class="id">Học viện Phát triển Tài năng Toàn cầu — GITA · gita.edu.vn</div>
  <h1>{html.escape(tieu_de)}</h1>
  <div class="meta"><span class="ma">{html.escape(ma)}</span> · {' · '.join(html.escape(x) for x in dong)}</div>
</div><div style="margin-left:auto"><span class="badge{' da' if la_dap_an else ''}">
{'ĐÁP ÁN — HLV' if la_dap_an else 'ĐỀ — HỌC VIÊN'}</span></div></header>
{hs}
{than}
<footer>GITA · Mỗi phiếu một ngôi sao · {html.escape(ma)} ·
{'Bản dành cho huấn luyện viên — không phát cho học viên' if la_dap_an else 'Bản phát cho học viên'}</footer>
</div></body></html>"""


def tach_fm(text: str):
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    return yaml.safe_load(text[3:end]) or {}, text[end + 4:]


def bo_dau_trang(than: str) -> str:
    """Bỏ khối tiêu đề lặp trong tệp nguồn — trình kết xuất đã tự dựng tiêu đề riêng."""
    dong = than.lstrip("\n").split("\n")
    # tìm dòng "Họ và tên" trong 40 dòng đầu: cắt từ đầu tới hết dòng đó
    for i, d in enumerate(dong[:40]):
        if d.startswith("Họ và tên"):
            return "\n".join(dong[i + 1:]).lstrip("\n")
    # không có: chỉ bỏ tiêu đề cấp 1 và khối thương hiệu ngay sau nó
    if dong and dong[0].startswith("# "):
        i = 1
        while i < len(dong) and dong[i].strip() == "":
            i += 1
        while i < len(dong) and dong[i].strip() and not dong[i].startswith(("#", ">", "|", "---")):
            i += 1
        return "\n".join(dong[i:]).lstrip("\n")
    return than


def ket_xuat(path: Path) -> list[Path]:
    fm, than = tach_fm(path.read_text(encoding="utf-8"))
    ma = fm.get("ma") or fm.get("ma_de") or path.stem
    h1 = re.search(r"^#\s+(.+)$", than, re.M)
    tieu_de = (fm.get("trong_tam") or fm.get("ten")
               or (h1.group(1).strip() if h1 else ma))
    OUT.mkdir(parents=True, exist_ok=True)
    ra = []
    moc = next((m for m in MOC_DAP_AN if m in than), None)
    if moc:
        de, da = than.split(moc, 1)
        de = bo_dau_trang(de)
        f1 = OUT / f"{ma}-DE.html"
        f1.write_text(trang(fm, tieu_de, md(de), False), encoding="utf-8")
        f2 = OUT / f"{ma}-DA.html"
        f2.write_text(trang(fm, tieu_de, md(moc + "\n" + da), True),
                      encoding="utf-8")
        ra += [f1, f2]
    else:
        la_da = fm.get("loai") == "GP"
        f = OUT / f"{ma}.html"
        f.write_text(trang(fm, tieu_de, md(bo_dau_trang(than)), la_da), encoding="utf-8")
        ra.append(f)
    return ra


def main() -> None:
    ap = argparse.ArgumentParser(description="Kết xuất phiếu GITA ra HTML in được")
    ap.add_argument("tep", nargs="*", type=Path)
    ap.add_argument("--all", action="store_true",
                    help="kết xuất mọi phiếu trong 03-phieu/ và 07-de-thi/")
    a = ap.parse_args()
    tep = list(a.tep)
    if a.all or not tep:
        tep = sorted((ROOT / "03-phieu").rglob("GITA-*.md")) + \
              sorted((ROOT / "07-de-thi").rglob("GITA-*.md"))
    n = 0
    for p in tep:
        for f in ket_xuat(p):
            print("  ✔", f.relative_to(ROOT))
            n += 1
    print(f"\n✔ Đã kết xuất {n} tệp HTML in được vào {OUT.relative_to(ROOT)}/")
    print("  Mở bằng trình duyệt → In → khổ A4, lề mặc định, bật 'In màu nền'.")


if __name__ == "__main__":
    main()
