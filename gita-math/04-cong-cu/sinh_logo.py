#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Dựng bộ logo GITA (SVG) từ logo gốc Học viện cung cấp.

Ba mô-típ của logo gốc được tái dựng bằng toạ độ tính toán, không vẽ tay:
  1. QUỸ ĐẠO  — ba dải ru-băng hình e-líp thuôn hai đầu (xanh đậm, xanh sáng, đỏ)
  2. CHÒM SAO — bảy ngôi sao năm cánh xếp theo cung vươn lên, to dần
  3. CHỮ GITA — chữ chân có chân, đậm, màu xanh thương hiệu

Đầu ra: 00-thuong-hieu/assets/*.svg
"""
from __future__ import annotations
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "00-thuong-hieu" / "assets"

XANH_DAM = "#1B5EA8"
XANH_VUA = "#2E7BC4"
XANH_SANG = "#5AA0DC"
DO = "#E0242A"


def diem_elip(cx, cy, rx, ry, goc_xoay_deg, t_deg):
    """Toạ độ trên e-líp xoay, tham số t tính bằng độ."""
    th = math.radians(goc_xoay_deg)
    t = math.radians(t_deg)
    x = rx * math.cos(t)
    y = ry * math.sin(t)
    return (cx + x * math.cos(th) - y * math.sin(th),
            cy + x * math.sin(th) + y * math.cos(th))


def ruy_bang(cx, cy, rx, ry, xoay, t0, t1, day_max, nhon=0.65, buoc=1.5, le=2) -> str:
    """Dải ru-băng chạy theo cung e-líp, dày nhất ở giữa và thuôn về hai đầu.

    `buoc` là bước tham số (độ) giữa hai điểm trên đường bao: bước nhỏ cho bản
    in chất lượng cao, bước lớn cho bản nhẹ nhúng thẳng vào HTML. `le` là số
    chữ số thập phân giữ lại trong dữ liệu đường."""
    ngoai, trong = [], []
    n = max(8, int(abs(t1 - t0) / buoc))
    for i in range(n + 1):
        t = t0 + (t1 - t0) * i / n
        u = i / n
        day = day_max * (math.sin(math.pi * u) ** nhon)
        ngoai.append(diem_elip(cx, cy, rx + day / 2, ry + day / 2, xoay, t))
        trong.append(diem_elip(cx, cy, rx - day / 2, ry - day / 2, xoay, t))
    ra = lambda ds: " L ".join(f"{x:.{le}f},{y:.{le}f}" for x, y in ds)
    return "M " + ra(ngoai) + " L " + ra(reversed(trong)) + " Z"


def ngoi_sao(cx, cy, r, xoay_deg=-90, le=2) -> str:
    """Sao năm cánh, bán kính trong bằng 0,382 bán kính ngoài."""
    pts = []
    for i in range(10):
        rr = r if i % 2 == 0 else r * 0.382
        a = math.radians(xoay_deg + i * 36)
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    return "M " + " L ".join(f"{x:.{le}f},{y:.{le}f}" for x, y in pts) + " Z"


def chom_sao(x0, y0, so=7, r0=5.0, buoc_r=1.15, nhip=17.0, cao=6.5,
             mau=XANH_DAM, le=2) -> str:
    """Bảy sao xếp theo cung vươn lên, to dần về bên phải."""
    ra = []
    for i in range(so):
        r = r0 * (buoc_r ** i)
        x = x0 + i * nhip + i * 0.9
        y = y0 - (i ** 1.25) * cao * 0.42
        ra.append(f'<path d="{ngoi_sao(x, y, r, le=le)}" fill="{mau}"/>')
    return "\n    ".join(ra)


def quy_dao(mau_dam=XANH_DAM, mau_sang=XANH_SANG, mau_do=DO, buoc=1.5, le=2) -> str:
    """Ba dải ru-băng lồng nhau, đúng thứ tự lớp của logo gốc."""
    cx, cy, xoay = 236, 132, -13
    k = dict(buoc=buoc, le=le)
    return "\n    ".join([
        f'<path d="{ruy_bang(cx, cy, 214, 104, xoay, 118, 352, 15, **k)}" fill="{mau_dam}"/>',
        f'<path d="{ruy_bang(cx, cy, 188, 88, xoay, 126, 344, 13, **k)}" fill="{mau_sang}"/>',
        f'<path d="{ruy_bang(cx, cy, 163, 73, xoay, 138, 336, 12, **k)}" fill="{mau_do}"/>',
    ])


CHU = ('<text x="{x}" y="{y}" font-family="Bitter, Bookman, Georgia, serif" '
       'font-weight="800" font-size="{cs}" letter-spacing="{ls}" fill="{mau}">GITA</text>')


def viet(path: Path, noi_dung: str) -> None:
    path.write_text(noi_dung, encoding="utf-8")
    print("  ✔", path.relative_to(ROOT))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    # 1. Bản đầy đủ — dùng cho bìa, website, standee
    viet(OUT / "logo-gita-primary.svg", f"""<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 470 250" width="470" height="250" role="img"
     aria-label="Học viện Phát triển Tài năng Toàn cầu GITA">
  <title>GITA — Học viện Phát triển Tài năng Toàn cầu</title>
  <g>
    {quy_dao()}
  </g>
  <g>
    {chom_sao(322, 44)}
  </g>
  {CHU.format(x=176, y=172, cs=84, ls=1.5, mau=XANH_DAM)}
</svg>
""")

    # 2. Bản một màu — đóng dấu, in đen trắng, khắc
    viet(OUT / "logo-gita-mono.svg", f"""<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 470 250" width="470" height="250" role="img"
     aria-label="GITA — bản một màu">
  <title>GITA — bản một màu</title>
  <g fill="currentColor" color="{XANH_DAM}">
    {quy_dao("currentColor", "currentColor", "currentColor").replace('fill="currentColor"/>', 'fill="currentColor" opacity="1"/>')}
    {chom_sao(322, 44, mau="currentColor")}
    {CHU.format(x=176, y=172, cs=84, ls=1.5, mau="currentColor")}
  </g>
</svg>
""")

    # 3. Chỉ biểu tượng — favicon, watermark, đầu phiếu
    viet(OUT / "logo-gita-mark.svg", f"""<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="14 2 452 144" width="226" height="72" role="img"
     aria-label="Biểu tượng GITA">
  <title>GITA — biểu tượng quỹ đạo và chòm sao</title>
  <g>
    {quy_dao()}
  </g>
  <g>
    {chom_sao(322, 44)}
  </g>
</svg>
""")

    # 4. Bản nhẹ — nhúng thẳng vào HTML ứng dụng và bản in A4.
    #    Bước tham số thô hơn nên tệp nhỏ hơn ~5 lần, mắt thường không phân biệt
    #    được ở cỡ hiển thị ≤ 40 mm.
    viet(OUT / "logo-gita-nhe.svg", f"""<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 470 250" width="470" height="250" role="img"
     aria-label="GITA">
  <title>GITA</title>
  <g>
    {quy_dao(buoc=9, le=1)}
    {chom_sao(322, 44, le=1)}
  </g>
  {CHU.format(x=176, y=172, cs=84, ls=1.5, mau=XANH_DAM)}
</svg>
""")

    viet(OUT / "logo-gita-mark-nhe.svg", f"""<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="14 2 452 144" width="226" height="72" role="img"
     aria-label="Biểu tượng GITA">
  <title>GITA — biểu tượng quỹ đạo và chòm sao</title>
  <g>
    {quy_dao(buoc=9, le=1)}
    {chom_sao(322, 44, le=1)}
  </g>
</svg>
""")

    # 5. Cung năm sao — mô-típ mức năng lực M1..M5, dùng trong phiếu và ứng dụng
    sao5 = "\n    ".join(
        f'<path d="{ngoi_sao(16 + i * 30, 30 - i * 3.2, 11 + i * 1.1)}" '
        f'fill="{XANH_DAM if i < 3 else DO}" class="sao s{i+1}"/>'
        for i in range(5))
    viet(OUT / "cung-nam-sao.svg", f"""<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 170 48" width="170" height="48" role="img"
     aria-label="Cung năm sao — năm mức năng lực M1 đến M5">
  <title>Cung năm sao — mô-típ mức năng lực GITA</title>
  {sao5}
</svg>
""")
    print(f"\n✔ Đã dựng 6 tệp logo trong {OUT.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
