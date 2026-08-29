#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh 01-kien-truc/03-taxonomy-chuyen-de.md từ ngân hàng chuyên đề.

Gom 540 chuyên đề theo NHÓM (A..H) cho từng lớp và từng tuyến, kèm mã phiếu
tương ứng — để huấn luyện viên tra ngược 'chuyên đề này nằm ở phiếu nào'.
"""
from __future__ import annotations
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))
from nhom_chuyen_de import NHOM, TU_DUY  # noqa: E402

INDEX = ROOT / "02-chi-muc" / "index-master.json"
OUT = ROOT / "01-kien-truc" / "03-taxonomy-chuyen-de.md"
TUYEN_TEN = {"T1": "Tuyến 1 — Nền tảng đến Nâng cao",
             "T2": "Tuyến 2 — Nâng cao thi CLC & thi Chuyên"}


def main() -> None:
    if not INDEX.exists():
        raise SystemExit("Chưa có index-master.json — chạy build_index.py trước.")
    rows = json.loads(INDEX.read_text(encoding="utf-8"))

    L = ["# TAXONOMY CHUYÊN ĐỀ — 8 NHÓM GỐC × 3 LỚP × 2 TUYẾN", "",
         "Tài liệu này được **sinh tự động** từ ngân hàng chuyên đề "
         "(`04-cong-cu/data/lop{3,4,5}.py`). Không sửa tay — sửa ngân hàng rồi chạy lại "
         "`python3 04-cong-cu/build_taxonomy.py`.", "",
         "## 0. Tám nhóm chuyên đề gốc", "",
         "| Mã | Nhóm | Nội dung bao phủ | Tư duy trọng tâm |", "|:--:|---|---|---|"]
    for ma in sorted(NHOM):
        n = NHOM[ma]
        td = ", ".join(f"{t} ({TU_DUY[t]})" for t in n["td"])
        L.append(f"| **{ma}** | {n['ten']} | {n['mo_ta']} | {td} |")
    L += ["", "## 0.1. Sáu năng lực tư duy", "", "| Mã | Năng lực |", "|:--:|---|"]
    L += [f"| {k} | {v} |" for k, v in sorted(TU_DUY.items())]

    for lop in (3, 4, 5):
        L += ["", f"---", "", f"# LỚP {lop}"]
        for tuyen in ("T1", "T2"):
            sub = [r for r in rows if r["lop"] == lop and r["tuyen"] == tuyen
                   and r["loai"] == "CD"]
            L += ["", f"## Lớp {lop} — {TUYEN_TEN[tuyen]}", ""]
            for ma in sorted(NHOM):
                items = [r for r in sub if r["nhom_ma"] == ma]
                if not items:
                    continue
                L += [f"### {ma}. {NHOM[ma]['ten']} — {len(items)} chuyên đề", "",
                      "| Phiếu | Tuần | HK | Chuyên đề |", "|---|---:|:--:|---|"]
                for r in items:
                    L.append(f"| `{r['ma_phieu']}` | {r['tuan']} | {r['hoc_ky']} "
                             f"| {r['ten_phieu']} |")
                L.append("")
    OUT.write_text("\n".join(L) + "\n", encoding="utf-8")
    print(f"✔ Đã sinh {OUT.relative_to(ROOT)} ({len(L)} dòng, "
          f"{sum(1 for r in rows if r['loai']=='CD')} chuyên đề)")


if __name__ == "__main__":
    main()
