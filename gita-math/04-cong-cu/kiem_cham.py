#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kiểm định **bộ chấm khách quan** — máy có chấm đúng, và có chấm bừa không.

    python3 04-cong-cu/kiem_cham.py

Bộ chấm là chỗ duy nhất trong cả hệ thống mà một lỗi nhỏ biến thành một lời
nói dối về đứa trẻ: chấm sai một ý thì hồ sơ ghi sai một ý, và mọi thứ dựng
trên hồ sơ — tầng năng lực, lộ trình cá nhân hoá, biểu đồ tiến bộ — lệch theo.
Vì vậy nó được kiểm bằng một bộ riêng, và kiểm cả hai chiều:

* **Không bỏ sót** — gõ đúng đáp án thì phải được chấm đúng, kể cả khi viết
  khác cách: `2971` với `2 971`, `3,5` với `3.5`, `3/4` với `3 phần 4`.
* **Không chấm bừa** — gõ sai phải bị chấm sai, và những đáp án không có một
  cách viết đúng duy nhất thì máy phải **từ chối chấm** chứ không đoán.

Chiều thứ hai quan trọng hơn. Bản chấm cũ trong ứng dụng có một nhánh "nếu đáp
án chứa chuỗi học sinh gõ thì tính đúng" — học sinh gõ `6` vào ý có đáp án `66`
liền được chấm đúng. Một bộ chấm rộng tay làm hỏng dữ liệu êm hơn hẳn một bộ
chấm chặt tay, vì không ai phàn nàn.
"""
from __future__ import annotations

import sys
from collections import Counter, defaultdict
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(GOC / "04-cong-cu"))

from lap.cham import cham_duoc, khop, kieu                        # noqa: E402

V, X, DAM, HET, MO = ("\033[32m✔\033[0m", "\033[31m✘\033[0m",
                      "\033[1m", "\033[0m", "\033[2m")

# (học sinh gõ, đáp án của kho, kết quả mong đợi) — None nghĩa là "không chấm".
PHEP_THU = [
    # cùng một con số, viết khác cách
    ("2971", "2 971", True), ("2 971", "2971", True), ("2.971", "2 971", True),
    ("3,5", "3.5", True), ("3.5", "3,5", True),
    ("3/4", "3 phần 4", True), ("3 phần 4", "3/4", True),
    ("1 000 000", "1000000", True),
    # đơn vị: thiếu đơn vị vẫn đúng, sai đơn vị thì sai
    ("66", "66 viên", True), ("66 viên", "66 viên", True),
    ("66 quả", "66 viên", False), ("96 cm2", "96 cm²", False),
    # đáp số của bài tìm x
    ("97", "x = 97", True), ("x = 97", "x = 97", True), ("x=97", "x = 97", True),
    ("98", "x = 97", False),
    # số đo hợp thành
    ("9 giờ 17 phút", "9 giờ 17 phút", True), ("9 17", "9 giờ 17 phút", True),
    # danh sách: thứ tự không quan trọng
    ("21, 42, 63, 84", "21, 42, 63, 84", True),
    ("84, 63, 42, 21", "21, 42, 63, 84", True),
    ("21, 42, 63", "21, 42, 63, 84", False),
    # đáp án có nhãn: thứ tự **có** quan trọng
    ("66, 56", "Sơn: 66 viên, Đức: 56 viên", True),
    ("56, 66", "Sơn: 66 viên, Đức: 56 viên", False),
    # câu trả lời chữ thuộc tập đóng
    ("có", "có", True), ("khong", "không", True), ("có", "không", False),
    # đáp số kèm lý do: chỉ chấm phần đáp số
    ("3", "3, vì nhóm thích cả hai môn bị đếm hai lần", True),
    ("4", "3, vì nhóm thích cả hai môn bị đếm hai lần", False),
    # bỏ trống là sai, không phải "chưa chấm"
    ("", "825", False), ("   ", "825", False),
    # KHÔNG được chấm bừa
    ("6", "66", False),                       # lỗi của bản chấm cũ
    ("2", "1 phần 2", False),
    ("bất kỳ", "Đi ngược công thức qua bước nửa chu vi", None),
    ("bất kỳ", "Ngoặc → nhân chia → cộng trừ", None),
    ("bất kỳ", "Bảng nhân, bảng chia 6 và 7", None),   # tên chuyên đề, không phải đáp số
    ("bất kỳ", "Đếm cặp", None),                       # tên cách làm, có nhiều cách viết
    ("bất kỳ", "", None),
]


def main() -> int:
    dat, loi = 0, []
    print(f"\n{DAM}KIỂM ĐỊNH BỘ CHẤM KHÁCH QUAN{HET}\n\n{DAM}1 · PHÉP THỬ TỪNG CA{HET}")
    for hs, da, mong in PHEP_THU:
        r = khop(hs, da)
        if r == mong:
            dat += 1
        else:
            loi.append(f"khop({hs!r}, {da!r}) = {r}, mong đợi {mong}  [kiểu {kieu(da)}]")
    print(f"   {V if not loi else X} {dat}/{len(PHEP_THU)} phép thử đạt")
    for e in loi[:10]:
        print(f"        {MO}{e}{HET}")

    # ── 2. đối chiếu ngược trên toàn kho ────────────────────────────
    print(f"\n{DAM}2 · ĐỐI CHIẾU NGƯỢC TRÊN TOÀN KHO{HET}")
    import importlib.util as u
    spec = u.spec_from_file_location("bwd", GOC / "04-cong-cu" / "build_web_data.py")
    m = u.module_from_spec(spec)
    try:
        spec.loader.exec_module(m)
    except SystemExit:
        pass

    c = Counter()
    theo = defaultdict(lambda: [0, 0])
    tu_choi = []
    for p in sorted((GOC / "03-phieu").rglob("*.md")):
        if p.stem.endswith(("-GP", "-HD")):
            continue
        loai = p.stem.rsplit("-", 1)[-1]
        try:
            d = m.doc_phieu(p)
        except Exception:                                  # noqa: BLE001
            continue
        for ph in d["phan"]:
            for b in ph["bai"]:
                for y in b["y"]:
                    da = y.get("dap_so", "")
                    ok = cham_duoc(da)
                    c[ok] += 1
                    theo[loai][1] += 1
                    theo[loai][0] += ok
                    # Gõ **y nguyên đáp án** thì không được chấm sai bao giờ.
                    if ok and khop(da, da) is not True:
                        tu_choi.append(f"{da[:50]}  [kiểu {kieu(da)}]")

    tong = c[True] + c[False]
    print(f"   {V if not tu_choi else X} Gõ y nguyên đáp án luôn được chấm đúng "
          f"({tong:,} ý đã thử)".replace(",", " "))
    for e in tu_choi[:8]:
        print(f"        {MO}{e}{HET}")

    print(f"\n{DAM}3 · ĐỘ PHỦ CỦA CHẤM MÁY{HET}   {MO}(theo dõi, không chặn){HET}")
    print(f"   {MO}toàn kho: {c[True]:,}/{tong:,} ý = "
          f"{100 * c[True] / tong:.0f}%{HET}".replace(",", " "))
    for loai, (a, t) in sorted(theo.items(), key=lambda z: -z[1][0] / z[1][1]):
        print(f"   {MO}{loai:<4} {a:>6}/{t:<6} = {100 * a // t:>3}%{HET}")
    print(f"   {MO}Phần không chấm máy được là những ý mà đáp án là **một câu** — "
          f"không có{HET}\n   {MO}một cách viết đúng duy nhất, nên người lớn chấm và "
          f"chúng không vào điểm khách quan.{HET}")

    print("\n" + "─" * 72)
    if loi or tu_choi:
        print(f"\033[31m{DAM}  CÒN LỖI: {len(loi)} phép thử sai, "
              f"{len(tu_choi)} đáp án tự nó bị chấm sai{HET}")
        return 1
    print(f"\033[32m{DAM}  SẠCH LỖI · {len(PHEP_THU)} phép thử · "
          f"{tong:,} ý đối chiếu ngược · {100 * c[True] / tong:.0f}% chấm máy "
          f"được{HET}".replace(",", " "))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
