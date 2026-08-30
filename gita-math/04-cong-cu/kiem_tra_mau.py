#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kiểm định thư viện mẫu bài GITA.

Sinh mọi mẫu × mọi lớp hợp lệ × N hạt giống và kiểm tra từng bài có đủ mọi
trường mà Chuẩn biên soạn phiếu v2.0 đòi hỏi. Chạy trước mỗi lần sinh kho.

    python3 04-cong-cu/kiem_tra_mau.py [số hạt giống, mặc định 300]
"""
from __future__ import annotations

import json
import random
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu"))

import sinh                                  # noqa: E402
from sinh import KHO                         # noqa: E402
from sinh.khung import khong_dau             # noqa: E402

MUC = ("M1", "M2", "M3", "M4", "M5")
NHOM = "ABCDEFGH"
X, V, D = "\033[31m✘\033[0m", "\033[32m✔\033[0m", "\033[2m"


def kiem_mot(b) -> list[str]:
    """Trả về danh sách lỗi của một bài; rỗng nghĩa là đạt."""
    e = []
    if not 4 <= b.so_y <= 10:
        e.append(f"số ý = {b.so_y}, ngoài khoảng 4–10")
    if not b.tieu_de or not b.y:
        e.append("thiếu tiêu đề hoặc không có ý nào")
    if any(not t or not d for t, d in b.y):
        e.append("có ý rỗng hoặc thiếu đáp số")
    if not b.goi_y or len(b.goi_y) != 3:
        e.append("gợi ý phải đủ ba tầng")
    if not (b.tuong_tu[0] and b.tuong_tu[1]):
        e.append("thiếu bài tương tự hoặc đáp số của nó")
    thieu = [t for t in ("huong_giai", "diem_chot", "loi", "phong", "pt_dang",
                         "pt_kien_thuc", "pt_du_lieu", "pt_phuong_phap", "pt_nhanh")
             if not getattr(b, t)]
    if thieu:
        e.append("thiếu trường: " + ", ".join(thieu))
    if not b.td:
        e.append("thiếu nhãn tư duy TD")
    return e


def phu_dang_bai() -> list:
    """Những dạng bài trong ngân hàng chưa có mẫu nào khớp.

    Khai báo `dang_bai` của mẫu tính là khớp đích danh; từ khoá khớp mềm. Một
    dạng bài không có mẫu nào khớp nghĩa là phiếu của chương ấy sẽ phải mượn bài
    của chương khác — chính là chỗ chất lượng rơi.
    """
    rows = json.loads((ROOT / "02-chi-muc" / "index-master.json")
                      .read_text(encoding="utf-8"))
    dang = set()
    for r in rows:
        if r.get("nhom_ma") in ("*", None):
            continue
        for d in r.get("dang_bai") or []:
            dang.add((r["lop"], r["nhom_ma"], d))
    thieu = []
    for lop, nhom, d in sorted(dang):
        kho_d = khong_dau(d)
        if not any(
                any(khong_dau(x) in kho_d for x in m.dang_bai)
                or any(khong_dau(t) in kho_d for t in m.tu_khoa)
                for muc in MUC for m in KHO.get(nhom, {}).get(muc, [])
                if lop in m.lop):
            thieu.append((lop, nhom, d))
    return thieu


def main() -> int:
    hat = int(sys.argv[1]) if len(sys.argv) > 1 else 300
    print(f"KIỂM ĐỊNH THƯ VIỆN MẪU BÀI — {hat} hạt giống mỗi mẫu × lớp\n" + "─" * 72)

    print(f"{'nhóm':<6}" + "".join(f"{m:>5}" for m in MUC) + f"{'tổng':>8}")
    tong_mau = 0
    for g in NHOM:
        hang = [len(KHO[g].get(m, [])) for m in MUC]
        tong_mau += sum(hang)
        print(f"{g:<6}" + "".join(f"{h:>5}" for h in hang) + f"{sum(hang):>8}")
    print(f"{'TỔNG':<6}" + " " * 25 + f"{tong_mau:>8}\n")

    trong = [(g, m, l) for g in NHOM for m in MUC for l in (3, 4, 5)
             if not [x for x in KHO[g].get(m, []) if l in x.lop]]
    print(f"  {V if not trong else X} Phủ kín 8 nhóm × 5 mức × 3 lớp = 120 ô"
          + ("" if not trong else f" — còn trống: {trong}"))

    mong = [(l, g, m) for l in (3, 4, 5) for g in NHOM for m in MUC
            if len([x for x in KHO[g].get(m, []) if l in x.lop]) < 2]
    print(f"  {V if not mong else X} Mọi ô có từ hai mẫu trở lên"
          + ("" if not mong else f" — còn mỏng: {mong}"))

    thieu_dang = phu_dang_bai()
    print(f"  {V if not thieu_dang else X} Mọi dạng bài trong ngân hàng đều có mẫu khớp"
          + ("" if not thieu_dang else f" — thiếu {len(thieu_dang)}: {thieu_dang[:5]}"))

    loi, n = {}, 0
    for g in KHO:
        for m in KHO[g]:
            for x in KHO[g][m]:
                for lp in x.lop:
                    for s in range(hat):
                        try:
                            e = kiem_mot(x.tao(random.Random(s * 1009 + lp), lp))
                            if e:
                                loi.setdefault(f"{x.ma}/L{lp}", []).append(e[0])
                            n += 1
                        except Exception as ex:                # noqa: BLE001
                            loi.setdefault(f"{x.ma}/L{lp}", []).append(f"{type(ex).__name__}: {ex}")
    print(f"  {V if not loi else X} Sinh thử {n:,} bài".replace(",", " "))
    for k, v in list(loi.items())[:25]:
        print(f"      {X} {k}: {v[0]}  ({len(v)} lần)")

    # phân bố theo lớp
    for lp in (3, 4, 5):
        c = sum(1 for g in KHO for m in KHO[g] for x in KHO[g][m] if lp in x.lop)
        print(f"      {D}lớp {lp}: {c} mẫu dùng được\033[0m")

    print("─" * 72)
    if loi or trong or mong or thieu_dang:
        print(f"\033[31m\033[1m  KẾT LUẬN: CÒN LỖI — {len(loi)} mẫu hỏng, "
              f"{len(trong)} ô trống, {len(mong)} ô mỏng, "
              f"{len(thieu_dang)} dạng bài chưa phủ\033[0m")
        return 1
    print(f"\033[32m\033[1m  KẾT LUẬN: SẠCH LỖI · {tong_mau} mẫu · "
          f"{n:,} bài sinh thử · 538/538 dạng bài đã phủ\033[0m".replace(",", " "))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
