#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kiểm định khối Mầm — mẫu giáo lớn, lớp 1, lớp 2.

    python3 04-cong-cu/kiem_mam.py

Bộ kiểm định của lớp 3–5 không dùng lại được ở đây, vì nó kiểm những thứ khối
này cố ý không có: thang điểm 100, năm phần, hai mươi lăm bài, bẫy, gợi ý ba
tầng. Kiểm bằng thước ấy thì mọi phiếu của trẻ năm tuổi đều trượt.

Bộ này kiểm bốn nhóm khác, và nhóm thứ tư là nhóm quan trọng nhất:

1. **Cấu trúc** — đúng số hoạt động, đúng thời lượng, đúng cách đánh giá.
2. **Bám chuẩn** — mỗi buổi ghi đủ yêu cầu cần đạt của Bộ, và mỗi chủ đề đều có
   mẫu bài cho hai ô cốt lõi.
3. **Cặp đôi phiếu** — buổi nào cũng có đủ bản của trẻ và bản người lớn, và bản
   của trẻ tuyệt đối không lộ đáp án.
4. **Bốn luật giữ hứng thú** — mở bằng trò chơi, có đồ vật thật, kết bằng việc
   chắc chắn làm được, không chấm điểm ở khối mẫu giáo. Bốn điều này là ràng
   buộc thiết kế chứ không phải lời khuyên, nên được kiểm như mọi ràng buộc kỹ
   thuật khác. Một bộ tài liệu làm trẻ chán toán thì đúng chuẩn cũng vô ích.
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(GOC / "04-cong-cu"))

from data.khoi_mam import CHU_DE, KHOI, PHAN_BUOI, TWM                  # noqa: E402
from sinh.mau_mam import KHO_MAM, VAI_THEO_O, vai_cua                   # noqa: E402

V, X, DAM, HET, MO = ("\033[32m✔\033[0m", "\033[31m✘\033[0m",
                      "\033[1m", "\033[0m", "\033[2m")
RA = GOC / "12-khoi-mam"


class Kiem:
    def __init__(self):
        self.dat: list[str] = []
        self.loi: list[str] = []

    def bao(self, ok, mo_ta, chi_tiet=None):
        (self.dat if ok else self.loi).append(mo_ta)
        print(f"   {V if ok else X} {mo_ta}")
        if not ok:
            for d in (chi_tiet or [])[:6]:
                print(f"        {MO}{d}{HET}")
            n = len(chi_tiet or [])
            if n > 6:
                print(f"        {MO}… và {n - 6} chỗ nữa{HET}")


def main() -> int:
    if not (RA / "index-khoi-mam.json").exists():
        raise SystemExit("Chưa có 12-khoi-mam/. Chạy build_mam.py trước.")
    idx = json.loads((RA / "index-khoi-mam.json").read_text(encoding="utf-8"))
    k = Kiem()
    tep = {x["ma"]: (RA / x["khoi"] / f"{x['ma']}.md",
                     RA / x["khoi"] / f"{x['ma']}-NL.md") for x in idx}
    doc = {ma: (a.read_text(encoding="utf-8") if a.exists() else "",
                b.read_text(encoding="utf-8") if b.exists() else "")
           for ma, (a, b) in tep.items()}

    print(f"\n{DAM}KIỂM ĐỊNH KHỐI MẦM — {len(idx)} buổi học{HET}")

    # ── 1. cấu trúc ──────────────────────────────────────────────────
    print(f"\n{DAM}1 · CẤU TRÚC{HET}")
    thieu = [ma for ma, (a, b) in doc.items() if not a or not b]
    k.bao(not thieu, "Buổi nào cũng có đủ bản của trẻ và bản người lớn", thieu)

    sai = []
    for x in idx:
        t = doc[x["ma"]][0]
        can = len(PHAN_BUOI[x["khoi"]])
        # Đếm tiêu đề hoạt động, bỏ các mục cuối phiếu.
        co = len([h for h in re.findall(r"^## (.+)$", t, re.M)
                  if not h.startswith(("HÔM NAY", "TỰ CHẤM"))])
        if co != can:
            sai.append(f"{x['ma']}: {co}/{can} hoạt động")
    k.bao(not sai, "Mỗi buổi đúng số hoạt động theo khung của khối", sai)

    sai = [x["ma"] for x in idx
           if f"{KHOI[x['khoi']]['phut']} phút" not in doc[x["ma"]][0]]
    k.bao(not sai, "Mỗi buổi ghi đúng thời lượng của khối", sai)

    # ── 2. bám chuẩn ─────────────────────────────────────────────────
    print(f"\n{DAM}2 · BÁM CHUẨN CỦA BỘ GIÁO DỤC{HET}")
    sai = [x["ma"] for x in idx
           if "YÊU CẦU CẦN ĐẠT" not in doc[x["ma"]][1]]
    k.bao(not sai, "Bản người lớn nào cũng ghi yêu cầu cần đạt", sai)

    sai = [x["ma"] for x in idx if x["chuan"] not in doc[x["ma"]][1]]
    k.bao(not sai, "Mỗi buổi ghi rõ chuẩn chương trình đang bám", sai)

    trong = sorted({(x["khoi"], x["chu_de"], v) for x in idx
                    for v in ("kham_pha", "luyen")
                    if not any(vai_cua(m["ma"]) == v
                               for m in KHO_MAM[x["khoi"]].get(x["chu_de"], []))})
    k.bao(not trong,
          "Mỗi chủ đề có mẫu bài cho cả hai ô cốt lõi — học cái mới và luyện tay",
          [f"{a} {b}: thiếu mẫu cho ô {c}" for a, b, c in trong])

    thieu_tw = [x["ma"] for x in idx
                if not any(TWM[t]["ten"] in doc[x["ma"]][1] for t in x["twm"]
                           if t in TWM)]
    k.bao(not thieu_tw,
          "Mỗi buổi có câu hỏi rèn tư duy theo khung Cambridge", thieu_tw)

    # ── 3. cặp đôi phiếu ─────────────────────────────────────────────
    print(f"\n{DAM}3 · TÁCH BẢN TRẺ VÀ BẢN NGƯỜI LỚN{HET}")
    lo = [x["ma"] for x in idx
          if "Đáp án" in doc[x["ma"]][0] or "→ **" in doc[x["ma"]][0]]
    k.bao(not lo, "Bản của trẻ không lộ đáp án", lo)

    sai = [x["ma"] for x in idx if "Đáp án từng việc" not in doc[x["ma"]][1]]
    k.bao(not sai, "Bản người lớn có đáp án đủ mọi việc", sai)

    sai = [x["ma"] for x in idx
           if "Con tắc thì làm gì" not in doc[x["ma"]][1]]
    k.bao(not sai, "Bản người lớn nói rõ phải làm gì khi trẻ tắc", sai)

    # ── 4. bốn luật giữ hứng thú ─────────────────────────────────────
    print(f"\n{DAM}4 · BỐN LUẬT GIỮ CHO TRẺ THÍCH TOÁN{HET}")

    # Luật 1: mở bằng trò chơi hoặc việc nhẹ, không mở bằng bài tập nặng.
    sai = []
    for x in idx:
        vai_dau = vai_cua(x["ma_mau"][0])
        if vai_dau not in ("khoi_dong", "kham_pha"):
            sai.append(f"{x['ma']}: hoạt động đầu là {vai_dau}")
    k.bao(not sai, "Buổi nào cũng mở bằng khởi động hoặc khám phá, "
                   "không mở bằng bài luyện", sai)

    # Luật 2: có đồ vật thật.
    sai = [x["ma"] for x in idx
           if "ĐỒ VẬT CẦN CHUẨN BỊ" not in doc[x["ma"]][1]]
    k.bao(not sai, "Buổi nào cũng liệt kê đồ vật thật cần chuẩn bị", sai)

    # Luật 3: kết bằng việc nhẹ, chắc chắn làm được.
    sai = []
    for x in idx:
        vai_cuoi = vai_cua(x["ma_mau"][-1])
        if vai_cuoi not in ("do_vui", "khoi_dong"):
            sai.append(f"{x['ma']}: hoạt động cuối là {vai_cuoi}")
    k.bao(not sai, "Buổi nào cũng kết bằng việc nhẹ, chắc chắn làm được", sai)

    # Luật 4: khối mẫu giáo không chấm điểm.
    sai = [x["ma"] for x in idx if x["khoi"] == "MG"
           and ("Điểm:" in doc[x["ma"]][0] or "điểm" in doc[x["ma"]][0].split(
               "HÔM NAY")[0].lower().replace("chấm điểm", ""))]
    k.bao(not sai, "Khối mẫu giáo không có thang điểm nào trên phiếu", sai)

    sai = [x["ma"] for x in idx if x["khoi"] == "MG"
           and "HÔM NAY CON LÀM ĐƯỢC GÌ" not in doc[x["ma"]][0]]
    k.bao(not sai, "Khối mẫu giáo đánh giá bằng ba mức, không bằng điểm", sai)

    # ── kết luận ─────────────────────────────────────────────────────
    n = len(k.dat) + len(k.loi)
    print("\n" + "─" * 72)
    if k.loi:
        print(f"\033[31m{DAM}  CÒN LỖI: {len(k.loi)}/{n} hạng mục chưa đạt{HET}")
        return 1
    tong_mau = len({m["ma"] for kh in KHO_MAM.values()
                    for ds in kh.values() for m in ds})
    print(f"\033[32m{DAM}  SẠCH LỖI · {n} hạng mục đạt · {len(idx)} buổi × 2 bản · "
          f"{tong_mau} mẫu bài{HET}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
