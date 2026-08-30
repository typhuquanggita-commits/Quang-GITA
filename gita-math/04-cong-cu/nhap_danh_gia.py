#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kiểm và tính lại tệp đánh giá của người học.

    python3 04-cong-cu/nhap_danh_gia.py --kiem        # kiểm tệp hiện có
    python3 04-cong-cu/nhap_danh_gia.py --tinh-lai    # tính lại tổng hợp rồi ghi

Công cụ này tồn tại vì một lý do: **hai con số tổng hợp không được phép gõ tay.**
`so_luot` và `diem_trung_binh` là hai con số duy nhất trên toàn bộ website được
gửi cho cỗ máy tìm kiếm dưới dạng lời khẳng định về chất lượng. Gõ tay thì sớm
muộn cũng lệch với danh sách ý kiến bên dưới, và khi lệch thì đó là một con số
sai đang được công bố công khai. Vì vậy cả hai đều được tính lại từ dữ liệu gốc.

Tệp: `11-seo/danh-gia/danh-gia.json`. Chưa có tệp thì trang `/danh-gia/` hiện
đúng một câu — chưa có đánh giá nào được đăng — và đó là câu trung thực.
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import date
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
TEP = GOC / "11-seo" / "danh-gia" / "danh-gia.json"

TRUONG_BAT_BUOC = ("nguoi", "vai", "ngay", "sao", "noi_dung", "dong_y_dang")
# Dưới ngưỡng này thì trung bình chưa nói lên điều gì, nên không công bố số sao.
NGUONG_CONG_BO = 5


def kiem(d: dict) -> list[str]:
    loi = []
    ys = d.get("y_kien")
    if not isinstance(ys, list):
        return ["Thiếu danh sách `y_kien`, hoặc nó không phải một danh sách."]

    for i, y in enumerate(ys, 1):
        vi = f"ý kiến {i}"
        for t in TRUONG_BAT_BUOC:
            if t not in y:
                loi.append(f"{vi}: thiếu trường `{t}`")
        sao = y.get("sao")
        if not isinstance(sao, int) or not 1 <= sao <= 5:
            loi.append(f"{vi}: `sao` phải là số nguyên từ 1 đến 5, đang là {sao!r}")
        if not str(y.get("noi_dung", "")).strip():
            loi.append(f"{vi}: `noi_dung` để trống")
        if not str(y.get("nguoi", "")).strip():
            loi.append(f"{vi}: `nguoi` để trống — đánh giá không có người viết "
                       f"thì không được đăng")
        try:
            date.fromisoformat(str(y.get("ngay")))
        except (ValueError, TypeError):
            loi.append(f"{vi}: `ngay` phải theo dạng NĂM-THÁNG-NGÀY")
        if y.get("dong_y_dang") not in (True, False):
            loi.append(f"{vi}: `dong_y_dang` phải là true hoặc false — không có "
                       f"giá trị mặc định, vì đăng lời của người khác khi chưa "
                       f"hỏi là chuyện không được phép đoán")

    # Đối chiếu hai con số tổng hợp với dữ liệu gốc.
    dung = tong_hop(ys)
    for t in ("so_luot", "diem_trung_binh"):
        if t in d and d[t] != dung[t]:
            loi.append(f"`{t}` ghi {d[t]!r} nhưng tính từ danh sách ra "
                       f"{dung[t]!r} — chạy --tinh-lai")
    return loi


def tong_hop(ys: list[dict]) -> dict:
    """Tính lại số lượt và điểm trung bình.

    Đếm **mọi** ý kiến, kể cả ý kiến người viết không cho đăng nội dung: người ấy
    vẫn đã chấm sao thật. Loại họ khỏi mẫu sẽ đẩy điểm trung bình lên một cách
    có lợi cho mình, và đó chính là kiểu chọn mẫu làm cho một con số trở thành
    quảng cáo thay vì thông tin.
    """
    sao = [y["sao"] for y in ys if isinstance(y.get("sao"), int)]
    return {"so_luot": len(sao),
            "diem_trung_binh": round(sum(sao) / len(sao), 1) if sao else None}


def main() -> None:
    ap = argparse.ArgumentParser(description="Kiểm và tính lại tệp đánh giá")
    ap.add_argument("--kiem", action="store_true")
    ap.add_argument("--tinh-lai", action="store_true")
    ap.add_argument("--tep", default=str(TEP))
    a = ap.parse_args()

    p = Path(a.tep)
    if not p.exists():
        print(f"  Chưa có {p.relative_to(GOC) if p.is_relative_to(GOC) else p}.")
        print("  Trang /danh-gia/ đang hiện: chưa có đánh giá nào được đăng.")
        print("  Đó là trạng thái đúng cho tới khi có ý kiến thật của người học thật.")
        return

    d = json.loads(p.read_text(encoding="utf-8"))
    loi = kiem(d)
    if loi and not a.tinh_lai:
        print(f"\033[31m\033[1m  {len(loi)} chỗ chưa đạt:\033[0m")
        for x in loi:
            print(f"   \033[31m✘\033[0m {x}")
        sys.exit(1)

    if a.tinh_lai:
        d.update(tong_hop(d["y_kien"]))
        d["cap_nhat"] = date.today().isoformat()
        p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n",
                     encoding="utf-8")
        print(f"  Đã tính lại: {d['so_luot']} lượt · trung bình "
              f"{d['diem_trung_binh']}/5")

    n = d.get("so_luot", 0)
    dang = sum(1 for y in d["y_kien"] if y.get("dong_y_dang"))
    print(f"\033[32m\033[1m  Tệp đánh giá hợp lệ.\033[0m")
    print(f"   {n} lượt chấm · {dang} ý kiến được phép đăng nội dung")
    if n < NGUONG_CONG_BO:
        print(f"   Chưa đủ {NGUONG_CONG_BO} lượt nên website **chưa công bố số "
              f"sao** — trung bình của vài lượt là nhiễu, không phải kết luận.")
    else:
        print(f"   Website công bố: {d['diem_trung_binh']}/5 từ {n} lượt.")


if __name__ == "__main__":
    main()
