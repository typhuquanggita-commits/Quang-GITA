#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Xếp tuyến và chọn phiếu khởi đầu từ kết quả TEST ĐẦU VÀO 4 TRỤC.

  python3 04-cong-cu/xep_lop.py --lop 4 --N 20 --K 18 --P 16 --T 22 --tuan 7
"""
from __future__ import annotations
import argparse

NGUONG = [(23, "M5"), (19, "M4"), (15, "M3"), (10, "M2"), (0, "M1")]
THU_TU = {"M1": 1, "M2": 2, "M3": 3, "M4": 4, "M5": 5}
TEN_TRUC = {"N": "Nền kiến thức", "K": "Kỹ năng", "P": "Phương pháp", "T": "Tư duy"}


def muc(diem: int) -> str:
    for nguong, m in NGUONG:
        if diem >= nguong:
            return m
    return "M1"


def xep(lop: int, d: dict[str, int], tuan: int) -> dict:
    for k, v in d.items():
        if not 0 <= v <= 25:
            raise SystemExit(f"Điểm trục {k} = {v} không hợp lệ (phải trong 0–25).")
    m = {k: muc(v) for k, v in d.items()}
    S = sum(d.values())
    thap_nhat = min(THU_TU[m[k]] for k in ("N", "K", "P", "T"))
    nen_ky = min(THU_TU[m["N"]], THU_TU[m["K"]])

    if nen_ky <= 2:
        tuyen, cach = "Tuyến 1", "Cách A — tuần tự, kèm buổi bù nền 30 phút mỗi tuần"
    elif thap_nhat >= 4 and S >= 85:
        tuyen, cach = "Tuyến 2", "Cách C — lệch tuyến theo nhóm chuyên đề"
    elif thap_nhat >= 3 and S >= 70:
        tuyen, cach = "Tuyến 1 + Tuyến 2", "Cách B — song song 2 phiếu T1 + 1 phiếu T2 mỗi tuần"
    else:
        tuyen, cach = "Tuyến 1", "Cách A — tuần tự"

    bat_dau = max(1, (tuan - 1) * 3 + 1)
    if thap_nhat <= 2:
        bat_dau = max(1, bat_dau - 9)

    ghi_chu = []
    if THU_TU[m["T"]] >= 4 and THU_TU[m["N"]] <= 2:
        ghi_chu.append("Tư duy tốt nhưng hổng nền: giao thêm Phần V của phiếu Tuyến 2 "
                       "cùng chuyên đề để giữ hứng thú.")
    if THU_TU[m["N"]] >= 4 and THU_TU[m["T"]] <= 2:
        ghi_chu.append("Thuộc bài nhưng chưa biết nghĩ: tăng liều Phần IV–V, "
                       "bắt buộc áp dụng Luật 3 hướng.")
    if THU_TU[m["P"]] <= 2 and THU_TU[m["K"]] >= 4:
        ghi_chu.append("Tính tốt nhưng chưa nhận dạng: bắt buộc vẽ sơ đồ đoạn thẳng "
                       "trước mọi bài nhóm D.")
    if S < 30:
        ghi_chu.append("Tổng điểm dưới 30: tư vấn thẳng thắn lộ trình bù nền trước khi "
                       "vào lớp CLC.")
    if not ghi_chu:
        ghi_chu.append("Bốn trục cân đối — theo đúng lộ trình chuẩn của tuyến được xếp.")

    return {"muc": m, "tong": S, "tuyen": tuyen, "cach": cach,
            "phieu_bat_dau": bat_dau, "ghi_chu": ghi_chu, "lop": lop}


def main() -> None:
    p = argparse.ArgumentParser(description="Xếp lớp GITA từ test đầu vào 4 trục")
    p.add_argument("--lop", type=int, required=True, choices=(3, 4, 5))
    for t in ("N", "K", "P", "T"):
        p.add_argument(f"--{t}", type=int, required=True, help=f"điểm trục {t} (0–25)")
    p.add_argument("--tuan", type=int, default=1, help="tuần học sinh bắt đầu (1–34)")
    a = p.parse_args()
    r = xep(a.lop, {"N": a.N, "K": a.K, "P": a.P, "T": a.T}, a.tuan)

    print("=" * 62)
    print(f"  KẾT QUẢ XẾP LỚP GITA — LỚP {r['lop']}")
    print("=" * 62)
    for t in ("N", "K", "P", "T"):
        d = getattr(a, t)
        thanh = "█" * round(d / 25 * 20)
        print(f"  {t} · {TEN_TRUC[t]:<16} {d:>2}/25  {r['muc'][t]}  {thanh}")
    print(f"\n  Tổng điểm: {r['tong']}/100")
    print(f"  Tuyến khuyến nghị : {r['tuyen']}")
    print(f"  Cách học          : {r['cach']}")
    ma = f"GITA-{'T2' if r['tuyen'] == 'Tuyến 2' else 'T1'}-L{r['lop']}-P{r['phieu_bat_dau']:03d}"
    print(f"  Phiếu khởi đầu    : {ma}")
    print("\n  Ghi chú cho huấn luyện viên:")
    for g in r["ghi_chu"]:
        print(f"    · {g}")
    print("=" * 62)


if __name__ == "__main__":
    main()
