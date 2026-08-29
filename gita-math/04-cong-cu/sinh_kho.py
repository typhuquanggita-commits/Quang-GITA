#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh trọn kho học liệu GITA từ chỉ mục và thư viện mẫu bài.

    python3 04-cong-cu/sinh_kho.py                # sinh những tài liệu còn thiếu
    python3 04-cong-cu/sinh_kho.py --ghi-de       # sinh lại tất cả, đè cả bản viết tay
    python3 04-cong-cu/sinh_kho.py --loai NC --lop 4

Mặc định **không đè** tài liệu đã có trên đĩa: những phiếu chuẩn vàng viết tay là
thước đo chất lượng của bộ sinh, không được máy ghi đè.
"""
from __future__ import annotations

import argparse
import json
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu"))

import lap.phieu as P                            # noqa: E402
import lap.kem as K                              # noqa: E402

INDEX = ROOT / "02-chi-muc" / "index-master.json"
OUT = ROOT / "03-phieu"

# Bản viết tay chuẩn vàng — thước đo chất lượng của bộ sinh. Máy không được đè,
# kể cả khi chạy --ghi-de; muốn dựng lại phải nêu rõ --ke-ca-chuan-vang.
CHUAN_VANG = {
    "GITA-T1-L4-C03-LT", "GITA-T1-L4-C03-DB", "GITA-T1-L4-C03-KN",
    "GITA-T1-L4-C03-NC", "GITA-T1-L4-C03-OT", "GITA-T1-L4-C03-TH",
    "GITA-T1-L4-C03-HD", "GITA-T1-L4-C03-NC-GP", "GITA-T2-L5-C04-NC",
}
V, X = "\033[32m✔\033[0m", "\033[31m✘\033[0m"


def duong_dan(r: dict) -> Path:
    return OUT / r["tuyen"] / f"L{r['lop']}" / f"{r['ma']}.md"


def main() -> int:
    ap = argparse.ArgumentParser(description="Sinh kho học liệu GITA")
    ap.add_argument("--ghi-de", action="store_true", help="ghi đè cả tài liệu đã có")
    ap.add_argument("--ke-ca-chuan-vang", action="store_true",
                    help="đè cả chín bản viết tay chuẩn vàng — cân nhắc kỹ")
    ap.add_argument("--loai", nargs="*", help="chỉ sinh những loại này")
    ap.add_argument("--lop", nargs="*", type=int, help="chỉ sinh những lớp này")
    ap.add_argument("--tuyen", nargs="*", help="chỉ sinh những tuyến này")
    a = ap.parse_args()

    rows = json.loads(INDEX.read_text(encoding="utf-8"))
    P.nap_nhom_moc(rows)
    theo_ma = {r["ma"]: r for r in rows}

    can = [r for r in rows
           if (not a.loai or r["loai"] in a.loai)
           and (not a.lop or r["lop"] in a.lop)
           and (not a.tuyen or r["tuyen"] in a.tuyen)]
    print(f"Chỉ mục có {len(rows)} tài liệu · sẽ xử lý {len(can)}")

    t0 = time.time()
    moi = bo_qua = giu = loi = 0
    for i, r in enumerate(can, 1):
        p = duong_dan(r)
        if r["ma"] in CHUAN_VANG and p.exists() and not a.ke_ca_chuan_vang:
            giu += 1
            continue
        if p.exists() and not a.ghi_de:
            bo_qua += 1
            continue
        try:
            if r["loai"] == "GP":
                noi_dung = K.render_gp(r, theo_ma[r["kem_theo"]])
            elif r["loai"] == "HD":
                noi_dung = K.render_hd(r)
            else:
                noi_dung = P.render(r)
        except Exception as e:                    # noqa: BLE001
            print(f"  {X} {r['ma']}: {type(e).__name__}: {e}")
            loi += 1
            continue
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(noi_dung, encoding="utf-8")
        moi += 1
        if i % 200 == 0:
            print(f"  … {i}/{len(can)}  ({time.time() - t0:.0f}s)")

    print(f"\n{V if not loi else X} Sinh mới {moi} · giữ nguyên {bo_qua} · "
          f"giữ bản chuẩn vàng {giu} · lỗi {loi} · {time.time() - t0:.0f} giây")
    if not loi:
        print(f"  Kho nằm tại {OUT.relative_to(ROOT)}/ — kiểm định bằng "
              f"`python3 04-cong-cu/validate_phieu.py --all`")
    return 1 if loi else 0


if __name__ == "__main__":
    raise SystemExit(main())
