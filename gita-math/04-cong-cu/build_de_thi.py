#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh chỉ mục và bảng đặc tả cho BỘ ĐỀ THI (07-de-thi/)."""
from __future__ import annotations
import csv, json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))
from de_thi import MOC, HO_DE, BIEN_THE   # noqa: E402

OUT = ROOT / "07-de-thi"


def sinh() -> list[dict]:
    ds = []
    for lop in (3, 4, 5):
        for ma_moc, ten_moc, pham_vi, tuan in MOC:
            ds.append({"ma": f"GITA-ON-L{lop}-{ma_moc}", "ho": "ON", "lop": lop,
                       "moc": ma_moc, "moc_ten": ten_moc, "pham_vi": pham_vi, "tuan": tuan,
                       "ten": f"Phiếu ôn tập {ten_moc} — Lớp {lop}",
                       "thoi_luong": HO_DE["ON"]["thoi_luong"],
                       "thang_diem": HO_DE["ON"]["thang_diem"], "bien_the": None})
            for ma_bt, mo_ta in BIEN_THE:
                ds.append({"ma": f"GITA-MOC-L{lop}-{ma_moc}-{ma_bt}", "ho": "MOC", "lop": lop,
                           "moc": ma_moc, "moc_ten": ten_moc, "pham_vi": pham_vi, "tuan": tuan,
                           "ten": f"Đề thi {ten_moc} — Lớp {lop} — đề {ma_bt[1:]}",
                           "thoi_luong": HO_DE["MOC"]["thoi_luong"],
                           "thang_diem": HO_DE["MOC"]["thang_diem"], "bien_the": mo_ta})
        for ma_bt, mo_ta in BIEN_THE:
            ds.append({"ma": f"GITA-NL-L{lop}-{ma_bt}", "ho": "NL", "lop": lop,
                       "moc": "NL", "moc_ten": "Đánh giá năng lực", "pham_vi": "Cả năm",
                       "tuan": "tháng 4 – 6",
                       "ten": f"Đề đánh giá năng lực — Lớp {lop} — đề {ma_bt[1:]}",
                       "thoi_luong": HO_DE["NL"]["thoi_luong"],
                       "thang_diem": HO_DE["NL"]["thang_diem"], "bien_the": mo_ta})
    return ds


def main() -> None:
    OUT.mkdir(exist_ok=True)
    ds = sinh()
    (OUT / "index-de-thi.json").write_text(json.dumps(ds, ensure_ascii=False, indent=1),
                                           encoding="utf-8")
    with (OUT / "index-de-thi.csv").open("w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(ds[0].keys()))
        w.writeheader(); w.writerows(ds)

    L = ["# BỘ ĐỀ THI GITA — ĐẶC TẢ VÀ CHỈ MỤC", "",
         "**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn", "",
         "Ba họ tài liệu này **tách khỏi** 100 phiếu học của mỗi khối. "
         "Phiếu học rèn năng lực; bộ đề thi đo năng lực.", "",
         "| Họ | Tên | Thời lượng | Thang điểm | Số lượng |", "|:--:|---|---:|---:|---|"]
    for k, v in HO_DE.items():
        sl = (f"{v['so_luong_moi_lop']} / lớp" if "so_luong_moi_lop" in v
              else f"{v['so_luong_moi_mo']} / mốc / lớp")
        L.append(f"| **{k}** | {v['ten']} | {v['thoi_luong']} phút | {v['thang_diem']} | {sl} |")
    L += ["", f"**Tổng số đề: {len(ds)}** — "
          f"{sum(1 for d in ds if d['ho'] == 'ON')} phiếu ôn tập · "
          f"{sum(1 for d in ds if d['ho'] == 'MOC')} đề thi mốc · "
          f"{sum(1 for d in ds if d['ho'] == 'NL')} đề đánh giá năng lực.", "",
          "## 1. Bốn mốc trong năm", "",
          "| Mã | Mốc | Phạm vi kiến thức | Thời điểm |", "|:--:|---|---|---|"]
    for ma, ten, pv, tuan in MOC:
        L.append(f"| **{ma}** | {ten} | {pv} | {tuan} |")

    for k, v in HO_DE.items():
        L += ["", f"## 2.{list(HO_DE).index(k) + 1}. {k} — {v['ten']}", "",
              f"**Mục đích:** {v['muc_dich']}", "",
              "| Phần | Tên phần | Phút | Điểm | Yêu cầu |", "|:--:|---|---:|---:|---|"]
        for nhan, ten, phut, diem, mo in v["cau_truc"]:
            L.append(f"| **{nhan}** | {ten} | {phut} | {diem} | {mo} |")
        L.append(f"| | | **{sum(x[2] for x in v['cau_truc'])}** "
                 f"| **{sum(x[3] for x in v['cau_truc']):g}** | |")
        if "ma_tran" in v:
            L += ["", "**Ma trận mức độ:** " +
                  " · ".join(f"{m} {t}%" for m, t in v["ma_tran"])]

    L += ["", "## 3. Mười biến thể của mỗi mốc", "",
          "Mười đề của một mốc **cùng ma trận**, khác nhau ở biến thể sau:", "",
          "| Mã | Biến thể |", "|:--:|---|"]
    for ma, mo in BIEN_THE:
        L.append(f"| **{ma}** | {mo} |")

    L += ["", "## 4. Cách dùng", "",
          "| Tình huống | Dùng đề nào |", "|---|---|",
          "| Thi chính thức tại lớp | `D01` của mốc tương ứng |",
          "| Học viên vắng buổi thi | `D02` |",
          "| Giao về nhà luyện thêm | `D03`, `D04` |",
          "| Lớp mũi nhọn | `D05`, `D10` |",
          "| Lớp bù nền | `D06` |",
          "| Rèn tư duy phản biện | `D07`, `D08` |",
          "| Bù chuyên đề hình học | `D09` |",
          "| Luyện thi vào lớp 6 | toàn bộ họ `NL` |", "",
          "## 5. Chỉ mục đầy đủ", "",
          "| Mã đề | Họ | Lớp | Mốc | Phạm vi | Thời lượng | Thang điểm |",
          "|---|:--:|:--:|:--:|---|---:|---:|"]
    for d in ds:
        L.append(f"| `{d['ma']}` | {d['ho']} | {d['lop']} | {d['moc']} | {d['pham_vi']} "
                 f"| {d['thoi_luong']}′ | {d['thang_diem']} |")
    (OUT / "00-dac-ta-bo-de-thi.md").write_text("\n".join(L) + "\n", encoding="utf-8")
    print(f"✔ {len(ds)} đề · {OUT.relative_to(ROOT)}/00-dac-ta-bo-de-thi.md + index (json, csv)")


if __name__ == "__main__":
    main()
