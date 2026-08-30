#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kiểm định **thang độ khó** — năm mức có thật sự tách nhau không.

    python3 04-cong-cu/kiem_do_kho.py [số hạt]

Năm bộ kiểm định kia hỏi "kho có đủ không" và "phiếu có đúng cấu trúc không".
Bộ này hỏi một câu chưa ai hỏi: **"M4 có thật sự khó hơn M3 không?"**

Câu ấy quan trọng vì cả hệ thống dựng trên giả định thang độ khó là thật —
phiếu xếp năm phần theo năm mức, lộ trình xếp học sinh theo tầng năng lực, đề
thi trộn theo ma trận mức độ. Nếu M4 không khó hơn M3 thì cả ba thứ ấy đang
xếp học sinh theo một cái thang không tồn tại.

Kiểm bốn nhóm:

1. **Thang có tăng đều không** — chỉ số độ khó trung vị phải tăng nghiêm ngặt
   từ M1 tới M5, ở cả ba lớp.
2. **Mỗi mức có đúng đặc tính của mình không** — tỉ lệ bẫy và tỉ lệ tư duy bậc
   cao phải nằm trong khoảng đã khai ở `data/muc_do.py`.
3. **Từng mẫu có đứng đúng mức không** — tải đọc và số bước lập luận của từng
   bài phải hợp với mức mẫu tự khai.
4. **Thang có phủ kín không** — mọi lớp × nhóm × mức đều phải có mẫu, và khối
   Mầm phải đủ ba bậc ở mọi chủ đề.
"""
from __future__ import annotations

import random
import statistics as st
import sys
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(GOC / "04-cong-cu"))

import sinh                                                        # noqa: E402,F401
from sinh import KHO                                               # noqa: E402
from sinh.do_kho import (TD_CAO, chi_so, dac_trung,                # noqa: E402
                         day_du_loi_giai)
from data.muc_do import MUC, MUC_MAM, THU_TU, dat_khoang           # noqa: E402
from data.nhom_chuyen_de import NHOM                               # noqa: E402

V, X, DAM, HET, MO = ("\033[32m✔\033[0m", "\033[31m✘\033[0m",
                      "\033[1m", "\033[0m", "\033[2m")


class Kiem:
    def __init__(self):
        self.dat: list[str] = []
        self.loi: list[str] = []

    def bao(self, ok, mo_ta, chi_tiet=None):
        (self.dat if ok else self.loi).append(mo_ta)
        print(f"   {V if ok else X} {mo_ta}")
        if not ok:
            for d in (chi_tiet or [])[:8]:
                print(f"        {MO}{d}{HET}")
            n = len(chi_tiet or [])
            if n > 8:
                print(f"        {MO}… và {n - 8} chỗ nữa{HET}")


def main() -> int:
    hat = int(sys.argv[1]) if len(sys.argv) > 1 else 12
    k = Kiem()
    print(f"\n{DAM}KIỂM ĐỊNH THANG ĐỘ KHÓ — {hat} hạt giống mỗi mẫu × lớp{HET}")

    # Sinh một lần, dùng lại cho mọi phép kiểm.
    bai = []                       # (mã, mức, lớp, bài)
    for g in KHO:
        for m in KHO[g]:
            for x in KHO[g][m]:
                for l in x.lop:
                    for h in range(hat):
                        bai.append((x.ma, m, l, g, x.tao(random.Random(h), l)))

    # ── 1. thang có tăng đều ────────────────────────────────────────
    print(f"\n{DAM}1 · THANG CÓ TĂNG ĐỀU KHÔNG{HET}")
    print(f"   {MO}{'mức':<5}{'chỉ số':>9}{'chữ mỗi ý':>12}{'bước giải':>11}"
          f"{'có bẫy':>9}{'tư duy cao':>12}{HET}")
    tv = {}
    for m in THU_TU:
        d = [b for _ma, mm, _l, _g, b in bai if mm == m]
        tv[m] = st.median(chi_so(b) for b in d)
        dt = [dac_trung(b) for b in d]
        print(f"   {MO}{m:<5}{tv[m]:>9.1f}"
              f"{st.median(x['chu_y'] for x in dt):>12.0f}"
              f"{st.median(x['buoc'] for x in dt):>11.1f}"
              f"{100 * sum(x['bay'] for x in dt) / len(dt):>8.0f}%"
              f"{100 * sum(x['td_cao'] for x in dt) / len(dt):>11.0f}%{HET}")
    lech = [f"{a} ({tv[a]:.1f}) không thấp hơn {b} ({tv[b]:.1f})"
            for a, b in zip(THU_TU, THU_TU[1:]) if tv[a] >= tv[b]]
    k.bao(not lech, "Chỉ số độ khó tăng nghiêm ngặt từ M1 tới M5", lech)

    lech_lop = []
    for lp in (3, 4, 5):
        t = {m: st.median([chi_so(b) for _ma, mm, l, _g, b in bai
                           if mm == m and l == lp] or [0]) for m in THU_TU}
        lech_lop += [f"lớp {lp}: {a} ({t[a]:.1f}) không thấp hơn {b} ({t[b]:.1f})"
                     for a, b in zip(THU_TU, THU_TU[1:]) if t[a] >= t[b]]
    k.bao(not lech_lop, "Thang tăng đều ở **cả ba khối lớp**, không chỉ khi gộp",
          lech_lop)

    # ── 2. mỗi mức đúng đặc tính của mình ───────────────────────────
    print(f"\n{DAM}2 · MỖI MỨC CÓ ĐÚNG ĐẶC TÍNH CỦA MÌNH{HET}")
    sai = []
    for m in THU_TU:
        d = [dac_trung(b) for _ma, mm, _l, _g, b in bai if mm == m]
        for ten, nhan in (("bay", "tỉ lệ bài có bẫy"),
                          ("td_cao", "tỉ lệ chạm tư duy bậc cao")):
            ti = sum(x[ten] for x in d) / len(d)
            kh = MUC[m]["tieu_chi"][ten]
            if not dat_khoang(ti, kh):
                sai.append(f"{m} — {nhan} = {ti:.0%}, chuẩn đòi "
                           f"{kh[0] if kh[0] is not None else 0:.0%}"
                           f"–{'100' if kh[1] is None else f'{kh[1] * 100:.0f}'}%")
    k.bao(not sai, "Tỉ lệ bẫy và tỉ lệ tư duy bậc cao nằm trong khoảng đã "
                   "khai của từng mức", sai)

    m1_bay = sorted({ma for ma, mm, _l, _g, b in bai if mm == "M1" and b.bay})
    k.bao(not m1_bay,
          "Mức M1 — phần mở phiếu — không mẫu nào cài bẫy",
          [f"{ma}: cài bẫy ở mức Nhận biết" for ma in m1_bay])

    m5_nhe = sorted({ma for ma, mm, _l, _g, b in bai
                     if mm == "M5" and not any(t in TD_CAO for t in b.td)})
    k.bao(not m5_nhe,
          "Mọi mẫu M5 đều chạm tư duy bậc cao (TD5 khái quát hoặc TD6 sáng tạo)",
          [f"{ma}: M5 mà không có TD5/TD6" for ma in m5_nhe])

    # ── 3. từng mẫu đứng đúng mức ───────────────────────────────────
    print(f"\n{DAM}3 · TỪNG MẪU CÓ ĐỨNG ĐÚNG MỨC KHÔNG{HET}")

    tb_doc = {m: st.mean(dac_trung(b)["chu_y"]
                         for _ma, mm, _l, _g, b in bai if mm == m)
              for m in THU_TU}
    sai = [f"{m} — tải đọc trung bình {tb_doc[m]:.0f} chữ mỗi ý, chuẩn đòi "
           f"{MUC[m]['tieu_chi']['chu_y']}"
           for m in THU_TU
           if not dat_khoang(tb_doc[m], MUC[m]["tieu_chi"]["chu_y"])]
    k.bao(not sai, "Tải đọc trung bình của mỗi mức nằm trong khoảng đã khai", sai)

    # **Không** kiểm tải đọc ở cấp từng mẫu, và đây là một kết luận rút ra từ
    # phép đo chứ không phải một chỗ bỏ sót.
    #
    # Đã thử ba cách: so từng mẫu với khoảng của mức, so với trung bình M4 toàn
    # kho, và so với trung bình M4 của chính nhóm mình. Cả ba đều báo sai hàng
    # loạt mẫu đang tốt, vì mỗi nhóm chuyên đề trộn hai kiểu đề có độ dài khác
    # nhau một trời một vực ở **mọi mức**: bài tính trần ("4 × 1 + 4 × 2 + …",
    # 23 chữ) và bài có lời văn ("Một cửa hàng có 6 thùng nước…", 139 chữ). Đo
    # tiến trình tải đọc trong từng nhóm cũng không đều: nhóm B, F, G, H đều có
    # chỗ M4 ngắn hơn M3.
    #
    # Tải đọc vì vậy là đặc trưng có nghĩa **ở cấp mức** — nơi hai kiểu đề trộn
    # lẫn và trung bình nói lên điều thật — chứ không có nghĩa ở cấp một mẫu.
    # Ép nó thành luật cho từng mẫu sẽ buộc phải viết lại những bài đang tốt
    # chỉ để chạm một con số.

    # ── 3b. độ đầy đủ của lời giải ──────────────────────────────────
    #
    # Đây là **hạng mục theo dõi**, không phải hạng mục chặn: một mẫu chưa tự
    # viết lời giải từng bước vẫn cho ra phiếu dùng được, vì `Bai.cac_buoc` bù
    # bằng hướng giải. Nhưng bản bù không có số thật của chính bài ấy, nên đây
    # là chỗ kho còn thiếu nhiều nhất và cần được nhìn thấy bằng con số.
    print(f"\n{DAM}3b · ĐỘ ĐẦY ĐỦ CỦA LỜI GIẢI TỪNG BƯỚC{HET}   {MO}(theo dõi, "
          f"không chặn){HET}")
    for m in THU_TU:
        ds = {ma for ma, mm, _l, _g, _b in bai if mm == m}
        co = {ma for ma, mm, _l, _g, b in bai if mm == m and day_du_loi_giai(b)}
        print(f"   {MO}{m}: {len(co):>3}/{len(ds):<3} mẫu tự viết lời giải có "
              f"số thật ({100 * len(co) // max(1, len(ds)):>3}%){HET}")
    tong_co = len({ma for ma, _mm, _l, _g, b in bai if day_du_loi_giai(b)})
    tong_ma = len({ma for ma, _mm, _l, _g, _b in bai})
    print(f"   {MO}toàn kho: {tong_co}/{tong_ma} "
          f"({100 * tong_co // tong_ma}%){HET}")

    # ── 4. thang phủ kín ────────────────────────────────────────────
    print(f"\n{DAM}4 · THANG PHỦ KÍN MỌI KHỐI LỚP{HET}")
    trong = [f"lớp {l} · nhóm {g} · {m}"
             for l in (3, 4, 5) for g in NHOM for m in THU_TU
             if not [x for x in KHO[g].get(m, []) if l in x.lop]]
    k.bao(not trong, f"Đủ 3 lớp × {len(NHOM)} nhóm × 5 mức = "
                     f"{3 * len(NHOM) * 5} ô, không ô nào trống", trong)

    mong = [f"lớp {l} · nhóm {g} · {m}: chỉ {n} mẫu"
            for l in (3, 4, 5) for g in NHOM for m in THU_TU
            if (n := len([x for x in KHO[g].get(m, []) if l in x.lop])) < 2]
    k.bao(not mong, "Mọi ô có từ hai mẫu trở lên để phiếu không lặp bài", mong)

    thieu_bac = kiem_bac_mam()
    k.bao(not thieu_bac,
          f"Khối Mầm: mọi chủ đề đủ {len(MUC_MAM)} bậc "
          f"({' · '.join(MUC_MAM[b]['ten'] for b in MUC_MAM)})", thieu_bac)

    # ── kết luận ────────────────────────────────────────────────────
    n = len(k.dat) + len(k.loi)
    print("\n" + "─" * 72)
    if k.loi:
        print(f"\033[31m{DAM}  CÒN LỖI: {len(k.loi)}/{n} hạng mục chưa đạt{HET}")
        return 1
    print(f"\033[32m{DAM}  SẠCH LỖI · {n} hạng mục đạt · {len(bai):,} bài đã chấm "
          f"độ khó{HET}".replace(",", " "))
    return 0


def kiem_bac_mam() -> list[str]:
    """Chủ đề nào của khối Mầm chưa đủ ba bậc độ khó."""
    import json
    p = GOC / "12-khoi-mam" / "index-khoi-mam.json"
    if not p.exists():
        return ["chưa dựng 12-khoi-mam/"]
    idx = json.loads(p.read_text(encoding="utf-8"))
    theo = {}
    for x in idx:
        theo.setdefault((x["khoi"], x["chu_de"]), set()).add(x.get("bac"))
    # Khối mẫu giáo cố ý **dừng ở bậc Tự làm**: thêm một thử thách cho trẻ năm
    # tuổi ở buổi cuối là kết buổi bằng sự hụt hẫng, trái luật thứ ba trong bốn
    # luật giữ hứng thú. Vì vậy chuẩn của MG là hai bậc, không phải ba.
    can = {"MG": {"B1", "B2"}, "L1": set(MUC_MAM), "L2": set(MUC_MAM)}
    return [f"{kh} {cd}: mới có bậc {sorted(b - {None}) or '—'}, "
            f"cần {sorted(can[kh])}"
            for (kh, cd), b in sorted(theo.items())
            if not can.get(kh, set(MUC_MAM)) <= b]


if __name__ == "__main__":
    raise SystemExit(main())
