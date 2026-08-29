#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh MASTER INDEX toàn bộ tài liệu của hệ thống toán GITA.

Kiến trúc (theo Khung giáo án giảng dạy tại GITA):
  * Mỗi khối (lớp × tuyến) có 16 CỤM CHUYÊN ĐỀ (chương).
  * Mỗi cụm dạy trong 6 buổi 90 phút: LT → DB → KN → NC → OT → TH.
  * Mỗi khối có thêm 4 phiếu MỐC: Giữa kỳ I, Cuối kỳ I, Giữa kỳ II, Cuối kỳ II.
        16 × 6 + 4 = 100 phiếu học / khối  →  600 phiếu học toàn hệ thống.
  * Mỗi phiếu học có 1 phiếu GP (Lời giải & Phân tích chuyên sâu) đi kèm.
  * Mỗi cụm có 1 phiếu HD (Hướng dẫn ôn chắc chuyên đề).
        (16 + 100 + 100) = 216 tài liệu / khối  →  1 296 tài liệu toàn hệ thống.

Đầu ra: 02-chi-muc/
"""
from __future__ import annotations
import csv, json, math, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))

from nhom_chuyen_de import NHOM, TU_DUY          # noqa: E402
from cum_chuyen_de import CUM                    # noqa: E402
from loai_phieu import LOAI, CHUOI_BUOI, MOC     # noqa: E402
import lop3, lop4, lop5                          # noqa: E402

BANK = {3: lop3, 4: lop4, 5: lop5}
TUYEN_TEN = {"T1": "Tuyến 1 — Nền tảng đến Nâng cao",
             "T2": "Tuyến 2 — Nâng cao thi CLC & thi Chuyên"}
SO_CUM = 16
BUOI_MOI_CUM = 6
PHIEU_MOI_TUAN = 3
# Vị trí bốn phiếu mốc trong dãy 100 buổi
VI_TRI_MOC = {25: "GK1", 50: "CK1", 75: "GK2", 100: "CK2"}
MOC_TEN = {m[0]: m[1] for m in MOC}
MOC_PHAM_VI = {m[0]: m[2] for m in MOC}


def stt_cua(cum: int, buoi: int) -> int:
    """cụm 1..16, buổi 0..5 -> số thứ tự 1..100 trong năm học."""
    tho = (cum - 1) * BUOI_MOI_CUM + buoi + 1
    bu = 0 if cum <= 4 else 1 if cum <= 8 else 2 if cum <= 12 else 3
    return tho + bu


def moc_cua(stt: int) -> str:
    return ("Giữa kỳ I" if stt <= 25 else "Cuối kỳ I" if stt <= 50
            else "Giữa kỳ II" if stt <= 75 else "Cuối kỳ II")


def dang_bai_cua_khoi(lop: int, tuyen: str) -> list[list[str]]:
    """Cắt ngân hàng chuyên đề thành 16 danh sách dạng bài, một cho mỗi cụm."""
    bank = BANK[lop].TUYEN_1 if tuyen == "T1" else BANK[lop].TUYEN_2
    theo_nhom: dict[str, list[str]] = {}
    for x in bank:
        g, t = x.split("|", 1)
        theo_nhom.setdefault(g, []).append(t)
    con_tro = {g: 0 for g in theo_nhom}
    ra = []
    for _ten, g, n in CUM[(lop, tuyen)]:
        i = con_tro[g]
        lat = theo_nhom[g][i:i + n]
        if len(lat) != n:
            raise SystemExit(f"L{lop}-{tuyen}: nhóm {g} thiếu dạng bài (cần {n}, còn {len(lat)}).")
        con_tro[g] = i + n
        ra.append(lat)
    for g, i in con_tro.items():
        if i != len(theo_nhom[g]):
            raise SystemExit(f"L{lop}-{tuyen}: nhóm {g} còn thừa {len(theo_nhom[g]) - i} dạng bài.")
    return ra


def ho_so(ma, tuyen, lop, loai, ten, **kw) -> dict:
    lp = LOAI[loai] if loai in LOAI else None
    d = {
        "ma": ma, "tuyen": tuyen, "tuyen_ten": TUYEN_TEN[tuyen], "lop": lop,
        "loai": loai, "loai_ten": lp["ten"] if lp else "Phiếu kiểm tra mốc",
        "ten": ten,
        "thoi_luong_phut": lp["thoi_luong"] if lp else 90,
        "thang_diem": lp["thang_diem"] if lp else 100,
    }
    d.update(kw)
    return d


def sinh_khoi(lop: int, tuyen: str) -> list[dict]:
    ds_dang_bai = dang_bai_cua_khoi(lop, tuyen)
    ra: list[dict] = []
    for k, ((ten_cum, g, _n), dang_bai) in enumerate(zip(CUM[(lop, tuyen)], ds_dang_bai), start=1):
        goc = f"GITA-{tuyen}-L{lop}-C{k:02d}"
        chung = dict(cum=k, cum_ten=ten_cum, nhom_ma=g, nhom_ten=NHOM[g]["ten"],
                     dang_bai=dang_bai, so_dang_bai=len(dang_bai),
                     tu_duy=NHOM[g]["td"])
        # 6 buổi học
        for j, lo in enumerate(CHUOI_BUOI):
            stt = stt_cua(k, j)
            ma = f"{goc}-{lo}"
            r = ho_so(ma, tuyen, lop, lo, f"{ten_cum} — {LOAI[lo]['ten']}",
                      stt=stt, tuan=min(math.ceil(stt / PHIEU_MOI_TUAN), 35),
                      hoc_ky="HK1" if stt <= 50 else "HK2", moc_kiem_tra=moc_cua(stt),
                      buoi_trong_cum=j + 1, la_buoi_hoc=True, **chung)
            ra.append(r)
            ra.append(ho_so(f"{ma}-GP", tuyen, lop, "GP",
                            f"{ten_cum} — Lời giải & Phân tích chuyên sâu ({LOAI[lo]['ten']})",
                            stt=None, tuan=r["tuan"], hoc_ky=r["hoc_ky"],
                            moc_kiem_tra=r["moc_kiem_tra"], kem_theo=ma,
                            la_buoi_hoc=False, **chung))
        # phiếu hướng dẫn ôn chắc chuyên đề
        ra.append(ho_so(f"{goc}-HD", tuyen, lop, "HD",
                        f"{ten_cum} — Hướng dẫn ôn chắc chuyên đề",
                        stt=None, tuan=min(math.ceil(stt_cua(k, 0) / PHIEU_MOI_TUAN), 35),
                        hoc_ky="HK1" if stt_cua(k, 0) <= 50 else "HK2",
                        moc_kiem_tra=moc_cua(stt_cua(k, 0)), kem_theo=None,
                        la_buoi_hoc=False, **chung))
    # 4 phiếu mốc
    for stt, ma_moc in VI_TRI_MOC.items():
        ma = f"GITA-{tuyen}-L{lop}-MOC-{ma_moc}"
        chung = dict(cum=0, cum_ten=MOC_TEN[ma_moc], nhom_ma="*",
                     nhom_ten="Tổng hợp nhiều nhóm chuyên đề",
                     dang_bai=[MOC_PHAM_VI[ma_moc]], so_dang_bai=0,
                     tu_duy=sorted(TU_DUY))
        ra.append(ho_so(ma, tuyen, lop, "MOC",
                        f"{MOC_TEN[ma_moc]} — {MOC_PHAM_VI[ma_moc]}",
                        stt=stt, tuan=min(math.ceil(stt / PHIEU_MOI_TUAN), 35),
                        hoc_ky="HK1" if stt <= 50 else "HK2", moc_kiem_tra=moc_cua(stt),
                        buoi_trong_cum=None, la_buoi_hoc=True, **chung))
        ra.append(ho_so(f"{ma}-GP", tuyen, lop, "GP",
                        f"{MOC_TEN[ma_moc]} — Lời giải & Phân tích chuyên sâu",
                        stt=None, tuan=min(math.ceil(stt / PHIEU_MOI_TUAN), 35),
                        hoc_ky="HK1" if stt <= 50 else "HK2", moc_kiem_tra=moc_cua(stt),
                        kem_theo=ma, la_buoi_hoc=False, **chung))
    ra.sort(key=lambda r: (r["stt"] if r["stt"] else 999, r["ma"]))
    return ra


def bang_cum(rows: list[dict], lop: int, tuyen: str) -> list[str]:
    L = ["| Cụm | Tên cụm chuyên đề | Nhóm | Dạng bài | Buổi | Tuần | HK |",
         "|:--:|---|:--:|---:|---|---:|:--:|"]
    for k in range(1, SO_CUM + 1):
        b = [r for r in rows if r["cum"] == k and r["la_buoi_hoc"]]
        if not b:
            continue
        L.append(f"| **C{k:02d}** | {b[0]['cum_ten']} | {b[0]['nhom_ma']} | {b[0]['so_dang_bai']} "
                 f"| P{b[0]['stt']:03d}–P{b[-1]['stt']:03d} | {b[0]['tuan']}–{b[-1]['tuan']} "
                 f"| {b[0]['hoc_ky']} |")
    return L


def main() -> None:
    outdir = ROOT / "02-chi-muc"
    outdir.mkdir(exist_ok=True)
    for f in outdir.glob("*.md"):
        f.unlink()
    tat_ca: list[dict] = []
    for lop in (3, 4, 5):
        for tuyen in ("T1", "T2"):
            tat_ca.extend(sinh_khoi(lop, tuyen))

    (outdir / "index-master.json").write_text(
        json.dumps(tat_ca, ensure_ascii=False, indent=1), encoding="utf-8")

    cols = ["ma", "tuyen", "lop", "cum", "cum_ten", "loai", "loai_ten", "ten", "nhom_ma",
            "stt", "tuan", "hoc_ky", "moc_kiem_tra", "thoi_luong_phut", "thang_diem",
            "la_buoi_hoc", "kem_theo"]
    with (outdir / "index-master.csv").open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        w.writerows(tat_ca)

    for lop in (3, 4, 5):
        for tuyen in ("T1", "T2"):
            rows = [r for r in tat_ca if r["lop"] == lop and r["tuyen"] == tuyen]
            buoi = [r for r in rows if r["la_buoi_hoc"]]
            L = [f"# CHỈ MỤC KHỐI — LỚP {lop} — {TUYEN_TEN[tuyen].upper()}", "",
                 f"- **Mã khối:** `GITA-{tuyen}-L{lop}`",
                 f"- **{SO_CUM} cụm chuyên đề** × 6 buổi + 4 phiếu mốc = **{len(buoi)} phiếu học** "
                 f"(mỗi phiếu 90 phút, thang 100)",
                 f"- Kèm theo: **{sum(1 for r in rows if r['loai'] == 'GP')} phiếu Lời giải & "
                 f"Phân tích chuyên sâu** và **{sum(1 for r in rows if r['loai'] == 'HD')} phiếu "
                 f"Hướng dẫn ôn chắc chuyên đề**",
                 f"- **Tổng tài liệu của khối: {len(rows)}**", "",
                 "Chuỗi 6 buổi của mỗi cụm: **LT → DB → KN → NC → OT → TH** "
                 "(Lý thuyết → Dạng bài & Đọc vị → Kỹ năng & Phương pháp → Luyện nâng cao "
                 "→ Ôn thi → Thi chương).", "",
                 "## 1. Mười sáu cụm chuyên đề", ""]
            L += bang_cum(rows, lop, tuyen)
            L += ["", "## 2. Một trăm buổi học theo thứ tự trong năm", "",
                  "| # | Mã phiếu | Loại | Cụm | Nhóm | Tên | Tuần | HK |",
                  "|---:|---|:--:|:--:|:--:|---|---:|:--:|"]
            for r in buoi:
                L.append(f"| {r['stt']} | `{r['ma']}` | {r['loai']} | "
                         f"{('C%02d' % r['cum']) if r['cum'] else '—'} | {r['nhom_ma']} | "
                         f"{r['ten']} | {r['tuan']} | {r['hoc_ky']} |")
            L += ["", "## 3. Dạng bài của từng cụm", ""]
            for k in range(1, SO_CUM + 1):
                c = next((r for r in rows if r["cum"] == k), None)
                if not c:
                    continue
                L += [f"### C{k:02d}. {c['cum_ten']}  ·  nhóm **{c['nhom_ma']} — {c['nhom_ten']}**", ""]
                L += [f"{i}. {d}" for i, d in enumerate(c["dang_bai"], 1)]
                L.append("")
            (outdir / f"chi-muc-L{lop}-{tuyen}.md").write_text("\n".join(L) + "\n", encoding="utf-8")

    buoi_tc = [r for r in tat_ca if r["la_buoi_hoc"]]
    tq = ["# TỔNG QUAN HỆ THỐNG TÀI LIỆU TOÁN GITA", "",
          "| Hạng mục | Số lượng |", "|---|---:|",
          f"| Cụm chuyên đề (chương) | {sum(1 for r in tat_ca if r['loai'] == 'HD')} |",
          f"| Phiếu học 90 phút | {len(buoi_tc)} |",
          f"| Phiếu Lời giải & Phân tích chuyên sâu | {sum(1 for r in tat_ca if r['loai'] == 'GP')} |",
          f"| Phiếu Hướng dẫn ôn chắc chuyên đề | {sum(1 for r in tat_ca if r['loai'] == 'HD')} |",
          f"| **Tổng tài liệu** | **{len(tat_ca)}** |",
          f"| Tổng thời lượng học | {len(buoi_tc) * 90 // 60} giờ |", "",
          "## Phân bố theo loại phiếu", "",
          "| Mã | Loại phiếu | Mẫu giáo án tương ứng | Số lượng |", "|:--:|---|---|---:|"]
    for k, v in LOAI.items():
        tq.append(f"| {k} | {v['ten']} | {v['giao_an']} | "
                  f"{sum(1 for r in tat_ca if r['loai'] == k)} |")
    tq.append(f"| MOC | Phiếu kiểm tra mốc | Kiểm tra định kỳ | "
              f"{sum(1 for r in tat_ca if r['loai'] == 'MOC')} |")
    tq += ["", "## Sáu khối", "",
           "| Khối | Cụm | Phiếu học | Phiếu GP | Phiếu HD | Tổng |", "|---|---:|---:|---:|---:|---:|"]
    for lop in (3, 4, 5):
        for tuyen in ("T1", "T2"):
            rows = [r for r in tat_ca if r["lop"] == lop and r["tuyen"] == tuyen]
            tq.append(f"| Lớp {lop} — {TUYEN_TEN[tuyen]} | {SO_CUM} | "
                      f"{sum(1 for r in rows if r['la_buoi_hoc'])} | "
                      f"{sum(1 for r in rows if r['loai'] == 'GP')} | "
                      f"{sum(1 for r in rows if r['loai'] == 'HD')} | {len(rows)} |")
    tq += ["", "## Ma trận nhóm chuyên đề (đếm theo cụm)", "",
           "| Nhóm | " + " | ".join(f"L{l}-{t}" for l in (3, 4, 5) for t in ("T1", "T2")) + " | Tổng |",
           "|---|" + "---:|" * 7]
    for g in sorted(NHOM):
        cells, tong = [], 0
        for lop in (3, 4, 5):
            for tuyen in ("T1", "T2"):
                c = sum(1 for _t, gg, _n in CUM[(lop, tuyen)] if gg == g)
                cells.append(str(c)); tong += c
        tq.append(f"| **{g}** — {NHOM[g]['ten']} | " + " | ".join(cells) + f" | {tong} |")
    (outdir / "00-tong-quan.md").write_text("\n".join(tq) + "\n", encoding="utf-8")

    print(f"✔ {len(tat_ca)} tài liệu · {len(buoi_tc)} phiếu học · "
          f"{sum(1 for r in tat_ca if r['loai'] == 'GP')} phiếu GP · "
          f"{sum(1 for r in tat_ca if r['loai'] == 'HD')} phiếu HD")
    for f in sorted(outdir.iterdir()):
        print("  -", f.name)


if __name__ == "__main__":
    main()
