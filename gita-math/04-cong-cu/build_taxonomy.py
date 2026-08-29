#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh 01-kien-truc/03-taxonomy-chuyen-de.md từ chỉ mục cụm chuyên đề."""
from __future__ import annotations
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))
from nhom_chuyen_de import NHOM, TU_DUY   # noqa: E402
from loai_phieu import LOAI, CHUOI_BUOI   # noqa: E402

INDEX = ROOT / "02-chi-muc" / "index-master.json"
OUT = ROOT / "01-kien-truc" / "03-taxonomy-chuyen-de.md"
TUYEN_TEN = {"T1": "Tuyến 1 — Nền tảng đến Nâng cao",
             "T2": "Tuyến 2 — Nâng cao thi CLC & thi Chuyên"}


def main() -> None:
    rows = json.loads(INDEX.read_text(encoding="utf-8"))
    L = ["# TAXONOMY — 8 NHÓM CHUYÊN ĐỀ × 96 CỤM × 3 LỚP × 2 TUYẾN", "",
         "Sinh tự động từ `04-cong-cu/data/{nhom_chuyen_de,cum_chuyen_de,lop3,lop4,lop5}.py`. "
         "Không sửa tay — sửa ngân hàng rồi chạy `python3 04-cong-cu/build_taxonomy.py`.", "",
         "Mỗi **cụm chuyên đề** là một chương, dạy trọn trong sáu buổi 90 phút: "
         + " → ".join(f"**{k}** ({LOAI[k]['ten'].replace('Phiếu ', '')})" for k in CHUOI_BUOI) + ".", "",
         "## 0. Tám nhóm chuyên đề gốc", "",
         "| Mã | Nhóm | Nội dung bao phủ | Tư duy trọng tâm |", "|:--:|---|---|---|"]
    for ma in sorted(NHOM):
        n = NHOM[ma]
        L.append(f"| **{ma}** | {n['ten']} | {n['mo_ta']} | "
                 f"{', '.join(f'{t} ({TU_DUY[t]})' for t in n['td'])} |")
    L += ["", "## 0.1. Sáu năng lực tư duy", "", "| Mã | Năng lực |", "|:--:|---|"]
    L += [f"| {k} | {v} |" for k, v in sorted(TU_DUY.items())]

    for lop in (3, 4, 5):
        L += ["", "---", "", f"# LỚP {lop}"]
        for tuyen in ("T1", "T2"):
            cums = {}
            for r in rows:
                if r["lop"] == lop and r["tuyen"] == tuyen and r["cum"]:
                    cums.setdefault(r["cum"], r)
            L += ["", f"## Lớp {lop} — {TUYEN_TEN[tuyen]}", ""]
            for g in sorted(NHOM):
                ds = [c for k, c in sorted(cums.items()) if c["nhom_ma"] == g]
                if not ds:
                    continue
                L += [f"### {g}. {NHOM[g]['ten']} — {len(ds)} cụm, "
                      f"{sum(c['so_dang_bai'] for c in ds)} dạng bài", ""]
                for c in ds:
                    L += [f"**C{c['cum']:02d} · {c['cum_ten']}** — tuần "
                          f"{min(r['tuan'] for r in rows if r['lop'] == lop and r['tuyen'] == tuyen and r['cum'] == c['cum'])}"
                          f", {c['hoc_ky']} · mã phiếu "
                          + ", ".join(f"`C{c['cum']:02d}-{k}`" for k in CHUOI_BUOI) + "", ""]
                    L += [f"{i}. {d}" for i, d in enumerate(c["dang_bai"], 1)]
                    L.append("")
    OUT.write_text("\n".join(L) + "\n", encoding="utf-8")
    print(f"✔ {OUT.relative_to(ROOT)} — {len(L)} dòng")


if __name__ == "__main__":
    main()
