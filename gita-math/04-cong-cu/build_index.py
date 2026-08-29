#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh MASTER INDEX 600 phiếu của hệ thống toán GITA.

Nguồn dữ liệu duy nhất: 04-cong-cu/data/{nhom_chuyen_de,lop3,lop4,lop5}.py
Đầu ra: 02-chi-muc/index-master.json | .csv | các bảng Markdown.

Quy ước:
  * Mỗi khối (lớp x tuyến) có 100 phiếu, mỗi phiếu học 90 phút.
  * Phiếu số 10, 20, ..., 100 là PHIẾU KIỂM TRA ĐỊNH VỊ (tổng ôn 9 phiếu liền trước).
  * 90 phiếu còn lại là PHIẾU CHUYÊN ĐỀ, lấy theo đúng thứ tự ngân hàng chuyên đề.
"""
from __future__ import annotations
import csv, json, math, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))

from nhom_chuyen_de import NHOM, TU_DUY          # noqa: E402
import lop3, lop4, lop5                          # noqa: E402

BANK = {3: lop3, 4: lop4, 5: lop5}
TUYEN_TEN = {
    "T1": "Tuyến 1 — Nền tảng đến Nâng cao",
    "T2": "Tuyến 2 — Nâng cao thi CLC & thi Chuyên",
}
# Mức trọng tâm của 5 phần trong phiếu, theo tuyến
MUC_THEO_TUYEN = {
    "T1": ["M1", "M2", "M3", "M4", "M5"],
    "T2": ["M2", "M3", "M4", "M5", "M5+"],
}
PHIEU_MOI_KHOI = 100
BUOC_DINH_VI = 10
PHIEU_MOI_TUAN = 3
HK1_HET_O_PHIEU = 54          # phiếu 1–54 thuộc học kỳ I
MOC = [(27, "Giữa kỳ I"), (54, "Cuối kỳ I"), (78, "Giữa kỳ II"), (100, "Cuối kỳ II")]


def moc_cua(n: int) -> str:
    for gioi_han, ten in MOC:
        if n <= gioi_han:
            return ten
    return MOC[-1][1]


def sinh_khoi(lop: int, tuyen: str) -> list[dict]:
    bank = BANK[lop].TUYEN_1 if tuyen == "T1" else BANK[lop].TUYEN_2
    if len(bank) != 90:
        raise SystemExit(f"Ngân hàng lớp {lop} {tuyen} phải có đúng 90 chuyên đề, đang có {len(bank)}")
    ket_qua, con_tro, so_dv = [], 0, 0
    for n in range(1, PHIEU_MOI_KHOI + 1):
        la_dinh_vi = n % BUOC_DINH_VI == 0
        if la_dinh_vi:
            so_dv += 1
            nhom_ma, nhom_ten = "*", "Tổng hợp nhiều nhóm chuyên đề"
            ten = (f"Kiểm tra định vị số {so_dv} — Tổng ôn phiếu "
                   f"P{n - BUOC_DINH_VI + 1:03d}–P{n - 1:03d}")
            td = sorted(TU_DUY)
            loai = "DV"
        else:
            nhom_ma, ten = bank[con_tro].split("|", 1)
            nhom_ten = NHOM[nhom_ma]["ten"]
            td = NHOM[nhom_ma]["td"]
            con_tro += 1
            loai = "CD"
        ket_qua.append({
            "ma_phieu": f"GITA-{tuyen}-L{lop}-P{n:03d}",
            "tuyen": tuyen,
            "tuyen_ten": TUYEN_TEN[tuyen],
            "lop": lop,
            "so_thu_tu": n,
            "loai": loai,
            "loai_ten": "Phiếu chuyên đề" if loai == "CD" else "Phiếu kiểm tra định vị",
            "nhom_ma": nhom_ma,
            "nhom_ten": nhom_ten,
            "ten_phieu": ten,
            "hoc_ky": "HK1" if n <= HK1_HET_O_PHIEU else "HK2",
            "tuan": min(math.ceil(n / PHIEU_MOI_TUAN), 35),
            "moc_kiem_tra": moc_cua(n),
            "muc_5_phan": MUC_THEO_TUYEN[tuyen],
            "tu_duy_trong_tam": td,
            "thoi_luong_phut": 90,
            "cau_truc": "5 phần × 5 bài × 4–10 ý",
            "thang_diem": 100,
        })
    if con_tro != 90:
        raise SystemExit("Không dùng hết ngân hàng chuyên đề")
    return ket_qua


def sinh_tat_ca() -> list[dict]:
    out = []
    for lop in (3, 4, 5):
        for tuyen in ("T1", "T2"):
            out.extend(sinh_khoi(lop, tuyen))
    return out


def bang_markdown(rows: list[dict]) -> str:
    d = ["| # | Mã phiếu | Tuần | HK | Mốc | Nhóm CĐ | Tên phiếu / chuyên đề | Loại |",
         "|---:|---|---:|:--:|---|:--:|---|:--:|"]
    for r in rows:
        d.append(f"| {r['so_thu_tu']} | `{r['ma_phieu']}` | {r['tuan']} | {r['hoc_ky']} | "
                 f"{r['moc_kiem_tra']} | {r['nhom_ma']} | {r['ten_phieu']} | {r['loai']} |")
    return "\n".join(d)


def phan_bo(rows: list[dict]) -> dict[str, int]:
    dem: dict[str, int] = {}
    for r in rows:
        dem[r["nhom_ma"]] = dem.get(r["nhom_ma"], 0) + 1
    return dem


def main() -> None:
    outdir = ROOT / "02-chi-muc"
    outdir.mkdir(exist_ok=True)
    tat_ca = sinh_tat_ca()

    (outdir / "index-master.json").write_text(
        json.dumps(tat_ca, ensure_ascii=False, indent=1), encoding="utf-8")

    cols = ["ma_phieu", "tuyen", "lop", "so_thu_tu", "loai", "nhom_ma", "nhom_ten",
            "ten_phieu", "hoc_ky", "tuan", "moc_kiem_tra", "thoi_luong_phut", "thang_diem"]
    with (outdir / "index-master.csv").open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        w.writerows(tat_ca)

    for lop in (3, 4, 5):
        for tuyen in ("T1", "T2"):
            rows = [r for r in tat_ca if r["lop"] == lop and r["tuyen"] == tuyen]
            pb = phan_bo(rows)
            head = [
                f"# CHỈ MỤC 100 PHIẾU — LỚP {lop} — {TUYEN_TEN[tuyen].upper()}",
                "",
                f"- **Mã khối:** `GITA-{tuyen}-L{lop}` · **Số phiếu:** 100 · "
                f"**Thời lượng mỗi phiếu:** 90 phút · **Thang điểm:** 100",
                f"- **Cấu trúc mỗi phiếu:** 5 phần × 5 bài × 4–10 ý "
                f"(mức {' → '.join(MUC_THEO_TUYEN[tuyen])})",
                "- **Phiếu số 10, 20, …, 100** là phiếu kiểm tra định vị (tổng ôn 9 phiếu liền trước).",
                f"- **Học kỳ I:** phiếu P001–P{HK1_HET_O_PHIEU:03d} · "
                f"**Học kỳ II:** phiếu P{HK1_HET_O_PHIEU+1:03d}–P100",
                "",
                "## Phân bố theo nhóm chuyên đề",
                "",
                "| Mã | Nhóm chuyên đề | Số phiếu |",
                "|:--:|---|---:|",
            ]
            for ma in sorted(NHOM):
                head.append(f"| {ma} | {NHOM[ma]['ten']} | {pb.get(ma, 0)} |")
            head += [f"| * | Phiếu kiểm tra định vị (tổng hợp) | {pb.get('*', 0)} |",
                     f"| | **Tổng** | **{len(rows)}** |", "", "## Danh mục phiếu", ""]
            (outdir / f"chi-muc-L{lop}-{tuyen}.md").write_text(
                "\n".join(head) + "\n" + bang_markdown(rows) + "\n", encoding="utf-8")

    # Bảng tổng quan
    tq = ["# TỔNG QUAN 600 PHIẾU HỆ THỐNG TOÁN GITA", "",
          "| Khối | Mã khối | Số phiếu | Phiếu chuyên đề | Phiếu định vị | Tổng thời lượng |",
          "|---|---|---:|---:|---:|---:|"]
    for lop in (3, 4, 5):
        for tuyen in ("T1", "T2"):
            rows = [r for r in tat_ca if r["lop"] == lop and r["tuyen"] == tuyen]
            cd = sum(1 for r in rows if r["loai"] == "CD")
            dv = sum(1 for r in rows if r["loai"] == "DV")
            tq.append(f"| Lớp {lop} — {TUYEN_TEN[tuyen]} | `GITA-{tuyen}-L{lop}` | "
                      f"{len(rows)} | {cd} | {dv} | {len(rows)*90//60} giờ |")
    tq.append(f"| **TOÀN HỆ THỐNG** | | **{len(tat_ca)}** | "
              f"**{sum(1 for r in tat_ca if r['loai']=='CD')}** | "
              f"**{sum(1 for r in tat_ca if r['loai']=='DV')}** | "
              f"**{len(tat_ca)*90//60} giờ** |")
    tq += ["", "## Ma trận phân bố nhóm chuyên đề trên 6 khối", "",
           "| Nhóm | " + " | ".join(f"L{l}-{t}" for l in (3, 4, 5) for t in ("T1", "T2")) + " | Tổng |",
           "|---|" + "---:|" * 7]
    for ma in sorted(NHOM):
        cells = []
        tong = 0
        for lop in (3, 4, 5):
            for tuyen in ("T1", "T2"):
                rows = [r for r in tat_ca if r["lop"] == lop and r["tuyen"] == tuyen]
                c = phan_bo(rows).get(ma, 0)
                cells.append(str(c))
                tong += c
        tq.append(f"| **{ma}** — {NHOM[ma]['ten']} | " + " | ".join(cells) + f" | {tong} |")
    (outdir / "00-tong-quan-600-phieu.md").write_text("\n".join(tq) + "\n", encoding="utf-8")

    print(f"✔ Đã sinh {len(tat_ca)} phiếu vào {outdir}")
    for f in sorted(outdir.iterdir()):
        print("  -", f.name)


if __name__ == "__main__":
    main()
