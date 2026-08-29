#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh lich dang bai cho he van hanh cong dong GITA365.

Doc ngan hang chu de tu data/thu-vien-chu-de.json va xuat ra file CSV lich dang bai
chi tiet cho ca hai nhom, dung de nap vao chuc nang len lich bai dang cua nhom Facebook.

Vi du:
    python3 scripts/generate_calendar.py --tuan 12 --batdau 2026-09-07
    python3 scripts/generate_calendar.py --tuan 4 --batdau 2026-12-28 --ra data/lich-quy-1.csv
"""

import argparse
import csv
import json
from datetime import date, datetime, timedelta
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
NGAN_HANG = GOC / "data" / "thu-vien-chu-de.json"
RA_MAC_DINH = GOC / "data" / "lich-dang-bai-12-tuan.csv"

THU_SANG_SO = {"T2": 0, "T3": 1, "T4": 2, "T5": 3, "T6": 4, "T7": 5, "CN": 6}
TEN_THU = {0: "Thu Hai", 1: "Thu Ba", 2: "Thu Tu", 3: "Thu Nam", 4: "Thu Sau", 5: "Thu Bay", 6: "Chu Nhat"}

COT = [
    "tuan", "ngay", "thu", "gio", "nhom", "ma_bai", "nghi_thuc", "tru_cot",
    "tieu_de", "dinh_dang", "cta", "tang_gia_tri", "muc_cham_soc", "chu_de_thang",
    "nguoi_phu_trach", "trang_thai",
]


def kiem_tra_thu_hai(ngay: date) -> date:
    """Lui ve thu Hai cua tuan chua ngay bat dau, de lich luon bat dau tu dau tuan."""
    return ngay - timedelta(days=ngay.weekday())


def sinh_lich(du_lieu: dict, so_tuan: int, bat_dau: date, phu_trach: dict) -> list:
    dong = []
    chu_de_thang = du_lieu["chu_de_thang"]

    for ma_nhom, nhom in du_lieu["nhom"].items():
        cac_chu_de = chu_de_thang[ma_nhom]
        bai_nhe = nhom["bai_nhe"]
        so_bai_nhe_tuan = max(0, nhom["bai_moi_tuan"] - len(nhom["nghi_thuc"]))
        dem_nhe = 0

        for tuan in range(1, so_tuan + 1):
            # Moi 4 tuan doi sang mot chu de thang moi, xoay vong theo quy.
            chi_so_thang = ((tuan - 1) // 4) % len(cac_chu_de)
            chu_de = cac_chu_de[chi_so_thang]
            tuan_trong_thang = (tuan - 1) % 4  # 0..3 -> chon tieu de thu may

            for nghi in nhom["nghi_thuc"]:
                lech = THU_SANG_SO[nghi["thu"]]
                ngay = bat_dau + timedelta(weeks=tuan - 1, days=lech)
                tieu_de = nghi["tieu_de"][chu_de][tuan_trong_thang]
                ma_bai = f"{ma_nhom}-W{tuan:02d}-{nghi['thu']}-{nghi['ma'][:4]}"
                dong.append({
                    "tuan": tuan,
                    "ngay": ngay.isoformat(),
                    "thu": TEN_THU[lech],
                    "gio": nghi["gio"],
                    "nhom": f"{ma_nhom} - {nhom['ten']}",
                    "ma_bai": ma_bai,
                    "nghi_thuc": nghi["ten"],
                    "tru_cot": nghi["tru_cot"],
                    "tieu_de": tieu_de,
                    "dinh_dang": nghi["dinh_dang"],
                    "cta": nghi["cta"],
                    "tang_gia_tri": nghi["tang"],
                    "muc_cham_soc": nghi["cham_soc"],
                    "chu_de_thang": chu_de,
                    "nguoi_phu_trach": phu_trach.get(ma_nhom, "chua phan cong"),
                    "trang_thai": "chua soan",
                })

            for i in range(so_bai_nhe_tuan):
                mau = bai_nhe[dem_nhe % len(bai_nhe)]
                dem_nhe += 1
                # Bai nhe rai deu trong tuan, bat dau tu thu Hai.
                lech = i % 7
                ngay = bat_dau + timedelta(weeks=tuan - 1, days=lech)
                dong.append({
                    "tuan": tuan,
                    "ngay": ngay.isoformat(),
                    "thu": TEN_THU[lech],
                    "gio": mau["gio"],
                    "nhom": f"{ma_nhom} - {nhom['ten']}",
                    "ma_bai": f"{ma_nhom}-W{tuan:02d}-N{i + 1}",
                    "nghi_thuc": "Bai nhe",
                    "tru_cot": mau["tru_cot"],
                    "tieu_de": mau["tieu_de"],
                    "dinh_dang": mau["dinh_dang"],
                    "cta": "Tra loi 1 dong",
                    "tang_gia_tri": "T0",
                    "muc_cham_soc": "CARE-1",
                    "chu_de_thang": chu_de,
                    "nguoi_phu_trach": phu_trach.get(ma_nhom, "chua phan cong"),
                    "trang_thai": "chua soan",
                })

    dong.sort(key=lambda d: (d["ngay"], d["gio"], d["nhom"]))
    return dong


def tom_tat(dong: list) -> None:
    theo_nhom = {}
    for d in dong:
        theo_nhom.setdefault(d["nhom"], []).append(d)
    print(f"Tong so bai: {len(dong)}")
    for nhom, ds in sorted(theo_nhom.items()):
        so_tuan = len({d["tuan"] for d in ds})
        tru_cot = {}
        for d in ds:
            tru_cot[d["tru_cot"]] = tru_cot.get(d["tru_cot"], 0) + 1
        print(f"\n  {nhom}: {len(ds)} bai / {so_tuan} tuan = {len(ds) / so_tuan:.1f} bai/tuan")
        for ten, so in sorted(tru_cot.items(), key=lambda x: -x[1]):
            print(f"      - {ten}: {so} bai ({so * 100 // len(ds)}%)")


def main() -> None:
    p = argparse.ArgumentParser(description="Sinh lich dang bai GITA365")
    p.add_argument("--tuan", type=int, default=12, help="So tuan can sinh (mac dinh 12)")
    p.add_argument("--batdau", type=str, default=None,
                   help="Ngay bat dau dang YYYY-MM-DD (mac dinh: thu Hai cua tuan hien tai)")
    p.add_argument("--ra", type=str, default=str(RA_MAC_DINH), help="Duong dan file CSV xuat ra")
    p.add_argument("--phutrach-g1", type=str, default="chua phan cong")
    p.add_argument("--phutrach-g2", type=str, default="chua phan cong")
    tham_so = p.parse_args()

    if tham_so.tuan < 1:
        p.error("--tuan phai lon hon 0")

    bat_dau = (datetime.strptime(tham_so.batdau, "%Y-%m-%d").date()
               if tham_so.batdau else date.today())
    bat_dau = kiem_tra_thu_hai(bat_dau)

    du_lieu = json.loads(NGAN_HANG.read_text(encoding="utf-8"))
    dong = sinh_lich(du_lieu, tham_so.tuan, bat_dau,
                     {"G1": tham_so.phutrach_g1, "G2": tham_so.phutrach_g2})

    duong_ra = Path(tham_so.ra)
    duong_ra.parent.mkdir(parents=True, exist_ok=True)
    with duong_ra.open("w", newline="", encoding="utf-8") as f:
        ghi = csv.DictWriter(f, fieldnames=COT)
        ghi.writeheader()
        ghi.writerows(dong)

    print(f"Da ghi {duong_ra} (bat dau {bat_dau.isoformat()}, {tham_so.tuan} tuan)")
    tom_tat(dong)


if __name__ == "__main__":
    main()
