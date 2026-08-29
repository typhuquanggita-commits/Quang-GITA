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
header{border-bottom:2.5pt solid #F2A81D;padding-bottom:6pt;margin-bottom:10pt;
  display:flex;gap:10pt;align-items:flex-start}
header svg{flex:none}
header .id{font-size:8.5pt;letter-spacing:.12em;text-transform:uppercase;color:#4B5563;font-weight:700}
header h1{font-size:15pt;margin:2pt 0 3pt;color:#0B2C5C;font-weight:800;line-height:1.2}
header .meta{font-size:9pt;color:#4B5563;line-height:1.45}
header .ma{font-family:"IBM Plex Mono",Consolas,monospace;font-size:9pt;color:#0B2C5C;font-weight:600}
.hs{border:1pt solid #D1D5DB;border-radius:3pt;padding:5pt 8pt;margin:8pt 0 12pt;font-size:10pt}
h2{font-size:12pt;color:#0B2C5C;margin:14pt 0 6pt;padding:4pt 7pt;background:#EAF0F8;
  border-left:3pt solid #0B2C5C;border-radius:0 3pt 3pt 0;page-break-after:avoid}
h3{font-size:11pt;margin:10pt 0 4pt;page-break-after:avoid}
h4{font-size:9pt;letter-spacing:.1em;text-transform:uppercase;color:#4B5563;margin:8pt 0 3pt}
p{margin:0 0 5pt}
ul,ol{margin:0 0 6pt;padding-left:16pt}
li{margin-bottom:2pt}
blockquote{margin:0 0 8pt;padding:5pt 9pt;background:#F8FAFC;border-left:2.5pt solid #F2A81D;
  border-radius:0 3pt 3pt 0;font-size:10.5pt}
table{border-collapse:collapse;width:100%;font-size:9.5pt;margin:0 0 8pt}
th,td{border:0.6pt solid #D1D5DB;padding:3pt 5pt;text-align:left;vertical-align:top}
th{background:#EAF0F8;font-size:8.5pt;text-transform:uppercase;letter-spacing:.06em}
pre{background:#F8FAFC;border:0.6pt solid #D1D5DB;border-radius:3pt;padding:6pt;
  font-family:"IBM Plex Mono",Consolas,monospace;font-size:8.5pt;line-height:1.4;
  overflow-x:auto;white-space:pre-wrap}
code{font-family:"IBM Plex Mono",Consolas,monospace;font-size:.9em}
hr{border:0;border-top:0.6pt solid #D1D5DB;margin:10pt 0}
.bai{page-break-inside:avoid;margin-bottom:9pt}
.y{margin:2pt 0 2pt 14pt}
.ke{border-bottom:0.6pt dotted #9CA3AF;display:inline-block;min-width:38mm;height:11pt}
footer{position:fixed;bottom:6mm;left:0;right:0;text-align:center;font-size:8pt;color:#6B7280}
.badge{display:inline-block;font-size:8pt;font-weight:700;padding:1pt 6pt;border-radius:8pt;
  background:#0B2C5C;color:#fff;letter-spacing:.05em}
.badge.da{background:#D7263D}
@media print{ .noprint{display:none} }
"""

LOGO = ('<svg width="30" height="30" viewBox="0 0 120 120">'
        '<path d="M60 4 L108 20 v44c0 26-20 43-48 52C32 107 12 90 12 64V20Z" fill="#123A73"/>'
        '<rect x="26" y="76" width="15" height="16" rx="2.5" fill="#1E88E5"/>'
        '<rect x="45" y="65" width="15" height="27" rx="2.5" fill="#FF6B4A"/>'
        '<rect x="64" y="52" width="15" height="40" rx="2.5" fill="#7B4BC4"/>'
        '<rect x="83" y="37" width="15" height="55" rx="2.5" fill="#1F9D6B"/></svg>')


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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;600&display=swap">
<style>{CSS}</style></head><body><div class="wrap">
<header>{LOGO}<div>
  <div class="id">Học viện Phát triển Tài năng Toàn cầu — GITA · gita.edu.vn</div>
  <h1>{html.escape(tieu_de)}</h1>
  <div class="meta"><span class="ma">{html.escape(ma)}</span> · {' · '.join(html.escape(x) for x in dong)}</div>
</div><div style="margin-left:auto"><span class="badge{' da' if la_dap_an else ''}">
{'ĐÁP ÁN — HLV' if la_dap_an else 'ĐỀ — HỌC VIÊN'}</span></div></header>
{hs}
{than}
<footer>GITA · Mỗi phiếu một bậc thang · {html.escape(ma)} ·
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
