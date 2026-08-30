#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Biên soạn khối Mầm — mẫu giáo lớn, lớp 1, lớp 2.

    python3 04-cong-cu/build_mam.py            # sinh phần còn thiếu
    python3 04-cong-cu/build_mam.py --ghi-de   # dựng lại tất cả

Mỗi buổi học sinh ra **hai tệp**, và cặp đôi ấy là điểm khác lớn nhất so với
khối lớp 3–5:

* **Phiếu của trẻ** — chỉ có việc phải làm, chữ to, câu ngắn, không có đáp án.
* **Phiếu người lớn ngồi cùng** — câu đọc lên cho trẻ nghe, đồ vật cần chuẩn bị,
  đáp án, dấu hiệu nhận ra trẻ đã hiểu, và phải làm gì khi trẻ tắc.

Vì sao tách đôi: ở tuổi này người lớn là một phần của học liệu, không phải người
đứng ngoài chấm bài. Một bộ tài liệu cho trẻ năm tuổi mà chỉ có phiếu bài tập là
một bộ tài liệu chưa xong một nửa.

Riêng khối mẫu giáo lớn còn khác ở chỗ **không có điểm số**. Đánh giá bằng ba
mức — chưa làm được, làm được khi có người giúp, tự làm được — vì một thang điểm
kèm bút đỏ ở tuổi này dạy trẻ sợ sai trước khi kịp thấy toán là thứ đáng chơi.
"""
from __future__ import annotations

import argparse
import json
import random
import sys
from datetime import date
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(GOC / "04-cong-cu"))

from data.khoi_mam import (CHU_DE, DOI_CHIEU_CAM, KHOI, LUAT_HUNG_THU,  # noqa: E402
                           MACH, PHAN_BUOI, TWM)
from sinh.mau_mam import KHO_MAM, VAI_THEO_O, vai_cua                   # noqa: E402
import sinh.mau_mam as _mm                                              # noqa: E402,F401

NGAY = date.today().isoformat()
RA = GOC / "12-khoi-mam"
CHU = "abcdefghij"


def hat(ma: str) -> int:
    import hashlib
    return int(hashlib.sha256(ma.encode()).hexdigest()[:8], 16)


def fm(d: dict) -> list[str]:
    ra = ["---"]
    for k, v in d.items():
        ra.append(f'{k}: "{str(v)}"')
    ra.append("---")
    return ra


def dau(khoi: str, cd: tuple, buoi: int, ma: str, cho_ai: str) -> list[str]:
    K = KHOI[khoi]
    ten = f"{cd[1]} — buổi {buoi}/{K['buoi_moi_chu_de']}"
    thang = (f" · Thang điểm: **{K['thang']}**" if K["thang"]
             else " · **Không chấm điểm**")
    return [
        "", f"# {ten}", "",
        "**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn  ",
        f"{K['ten']} · {K['tuoi']} · Mã: **{ma}**  ",
        f"Mạch: **{MACH[cd[2]]['ten']}** *(Cambridge: {MACH[cd[2]]['cam']})*  ",
        f"Thời lượng: **{K['phut']} phút**{thang}  ",
        f"Bản dành cho: **{cho_ai}**", "", "---", "",
    ]


def chon_mau(khoi: str, ma_cd: str, so: int, rng) -> list[dict]:
    """Rút các mẫu cho một buổi, **mỗi hoạt động một mẫu khác nhau**.

    Bốn hoạt động của một buổi có bốn mục đích khác nhau — chơi khởi động,
    khám phá, tự làm, đố vui. Cho cả bốn cùng một bài thì buổi học biến thành
    làm một bài bốn lần, và đó đúng là thứ làm trẻ chán toán.

    Vì vậy thứ tự lấp đầy là: mẫu của **đúng chủ đề** trước, rồi mẫu **cùng
    mạch kiến thức** của khối, rồi mới tới mẫu bất kỳ của khối. Chỉ khi cả kho
    của khối cạn mới chấp nhận lặp lại.
    """
    rieng = list(KHO_MAM.get(khoi, {}).get(ma_cd, []))
    ca_khoi = [m for ds in KHO_MAM.get(khoi, {}).values() for m in ds]
    mach_cd = rieng[0]["mach"] if rieng else None
    cung_mach = [m for m in ca_khoi if m["mach"] == mach_cd]
    vai_o = VAI_THEO_O[khoi]

    ra, da = [], set()
    for i in range(so):
        vai = vai_o[i] if i < len(vai_o) else "luyen"
        chon = None
        # Hai ô cốt lõi — "Học cái mới" và "Luyện tay" — là chỗ dạy **nội dung
        # của chính chủ đề**, nên ở đó **đúng chủ đề thắng đúng vai**: thà lấy
        # một bài luyện của đúng chủ đề còn hơn lấy một bài khám phá của chủ đề
        # khác, vì buổi học về bảng nhân mà phần "Học cái mới" nói về đường gấp
        # khúc thì buổi ấy không dạy được điều nó định dạy.
        #
        # Hai ô còn lại — khởi động và đố vui — cố ý được đi rộng: nhắc lại kiến
        # thức cũ và đổi không khí là việc của chúng, không nhất thiết bám chủ đề.
        if vai in ("kham_pha", "luyen"):
            ung = [m for m in rieng if m["ma"] not in da]
            if ung:
                dung_vai = [m for m in ung if vai_cua(m["ma"]) == vai]
                chon = rng.choice(dung_vai or ung)
        if chon is None:
            # Ưu tiên theo ba tầng, trong mỗi tầng phải đúng vai của ô.
            for nguon in (rieng, cung_mach, ca_khoi):
                ung = [m for m in nguon
                       if m["ma"] not in da and vai_cua(m["ma"]) == vai]
                if ung:
                    chon = rng.choice(ung)
                    break
        if chon is None:                     # không còn mẫu đúng vai: nới ra
            for nguon in (rieng, cung_mach, ca_khoi):
                ung = [m for m in nguon if m["ma"] not in da]
                if ung:
                    chon = rng.choice(ung)
                    break
        if chon is None:                     # kho đã cạn: buộc phải lặp
            chon = rng.choice(ca_khoi or rieng)
        da.add(chon["ma"])
        ra.append(chon)
    return ra


def sinh_buoi(khoi: str, cd: tuple, buoi: int) -> tuple[str, str, list[str]]:
    """Trả về (phiếu của trẻ, phiếu người lớn, danh sách mã mẫu đã dùng)."""
    ma = f"GITA-{khoi}-{cd[0]}-B{buoi}"
    rng = random.Random(hat(ma))
    K = KHOI[khoi]
    khung = PHAN_BUOI[khoi]
    mau = chon_mau(khoi, cd[0], len(khung), rng)
    # Hạt giống phải khác nhau theo **vị trí trong buổi**. Không có `str(i)` thì
    # hai hoạt động dùng cùng một mẫu sẽ ra y hệt nhau tới từng con số.
    bais = [m["sinh"](random.Random(hat(ma + m["ma"] + str(i))))
            for i, m in enumerate(mau)]

    meta = {"ma": ma, "khoi": khoi, "khoi_ten": K["ten"], "chu_de": cd[0],
            "chu_de_ten": cd[1], "mach": cd[2], "mach_ten": MACH[cd[2]]["ten"],
            "buoi": buoi, "thoi_luong": K["phut"],
            "thang_diem": K["thang"] or "không chấm điểm",
            "chuan": K["chuan"], "cap_nhat": NGAY}

    # ── phiếu của trẻ ────────────────────────────────────────────────
    t = fm(meta) + dau(khoi, cd, buoi, ma, "trẻ làm")
    if khoi == "MG":
        t += ["Họ và tên: ......................................... "
              "Ngày: ..............", ""]
    else:
        t += ["Họ và tên: ......................................... "
              f"Lớp: ......... Điểm: ......../{K['thang']}", ""]

    for i, (kh, b) in enumerate(zip(khung, bais)):
        if khoi == "MG":
            ten_p, phut, mo_ta = kh
            t += ["", f"## {ten_p} · {phut} phút", "", f"*{mo_ta}*", ""]
        else:
            nhan, ten_p, phut, diem = kh
            t += ["", f"## PHẦN {nhan} — {ten_p} · {phut} phút · {diem} điểm", ""]
        t += [f"**{b.tieu_de}**", ""]
        for j, (viec, _) in enumerate(b.y):
            t += [f"{CHU[j]}) {viec}", ""]

    if khoi == "MG":
        t += ["", "---", "", "## HÔM NAY CON LÀM ĐƯỢC GÌ", "",
              "*Người lớn tô cùng con. Không có ô nào là ô sai.*", "",
              "| Việc | Chưa làm được | Làm được khi có người giúp | Tự làm được |",
              "|---|:--:|:--:|:--:|"]
        for b in bais:
            t += [f"| {b.tieu_de} | ☐ | ☐ | ☐ |"]
    else:
        t += ["", "---", "", "## TỰ CHẤM", "",
              "*Con tự đánh dấu vào việc mình đã làm được.*", ""]
        for b in bais:
            t += [f"- ☐ {b.tieu_de}"]

    # ── phiếu người lớn ──────────────────────────────────────────────
    m2 = dict(meta, ma=ma + "-NL")
    g = fm(m2) + dau(khoi, cd, buoi, ma + "-NL", "người lớn ngồi cùng")
    g += ["## YÊU CẦU CẦN ĐẠT CỦA BUỔI NÀY", "",
          f"*Theo {K['chuan']}.*", ""]
    for x in cd[3]:
        g += [f"- {x}"]
    # Cặp đặc điểm tư duy mà **chủ đề** định rèn, nêu thẳng ở đầu phiếu người
    # lớn. Mẫu bài cũng khai đặc điểm riêng của nó, nhưng hai thứ ấy có thể khác
    # nhau — và cái chủ đề định rèn thì buổi nào cũng phải nhắc, nếu không thì
    # khung tư duy chỉ nằm trong bảng dữ liệu chứ không tới được người dạy.
    g += ["", "## TƯ DUY BUỔI NÀY RÈN", "",
          "*Theo khung Thinking and Working Mathematically của Cambridge "
          "Primary Mathematics.*", ""]
    # Không đặt tên biến vòng lặp là `t`: `t` đang giữ nguyên phiếu của trẻ, và
    # che nó ở đây làm phiếu của trẻ bị ghi đè bằng một chuỗi tên đặc điểm.
    for ma_tw in cd[4]:
        if ma_tw in TWM:
            d = TWM[ma_tw]
            g += [f"- **{d['ten']}** *({d['goc']})* — {d['la_gi']}  ",
                  f"  Câu người lớn hỏi: “{d['cau_hoi']}”"]

    g += ["", "## ĐỒ VẬT CẦN CHUẨN BỊ TRƯỚC", ""]
    do = []
    for b in bais:
        for x in b.do_dung:
            if x not in do:
                do.append(x)
    g += [f"- {x}" for x in do] or ["- Không cần đồ vật gì ngoài giấy bút."]

    for i, (kh, b) in enumerate(zip(khung, bais)):
        ten_p = kh[0] if khoi == "MG" else f"PHẦN {kh[0]} — {kh[1]}"
        g += ["", "---", "", f"## {ten_p}", "", f"**{b.tieu_de}**", "",
              f"> **Cô/mẹ đọc lên:** {b.loi_doc}", ""]
        g += ["**Đáp án từng việc**", ""]
        for j, (viec, dap) in enumerate(b.y):
            g += [f"{CHU[j]}) {viec}", f"   → **{dap}**", ""]
        if b.cau_hoi_twm:
            cap = " · ".join(TWM[k]["ten"] for k in b.twm if k in TWM)
            g += [f"**Hỏi thêm một câu** *(rèn: {cap})*: {b.cau_hoi_twm}", ""]
        if b.dau_hieu_hieu:
            g += [f"**Thế nào là con đã hiểu:** {b.dau_hieu_hieu}", ""]
        if b.khi_kho:
            g += [f"**Con tắc thì làm gì:** {b.khi_kho}", ""]
        if b.mo_rong:
            g += [f"**Nếu con làm nhanh:** {b.mo_rong}", ""]

    g += ["", "---", "", "## BỐN ĐIỀU GIỮ CHO CON THÍCH TOÁN", ""]
    for i, (luat, vi_sao) in enumerate(LUAT_HUNG_THU, 1):
        g += [f"{i}. **{luat}** — {vi_sao}"]

    g += ["", "## ĐỐI CHIẾU VỚI CAMBRIDGE", "",
          f"Khối này tương ứng **{DOI_CHIEU_CAM[khoi]['stage']}**. "
          f"Phần trùng nhau: {DOI_CHIEU_CAM[khoi]['trung']}", "",
          f"*Cambridge đi sớm hơn ở:* {DOI_CHIEU_CAM[khoi]['cam_som_hon']}", "",
          f"*Chương trình Việt Nam đi sớm hơn ở:* {DOI_CHIEU_CAM[khoi]['vn_som_hon']}",
          "", "---", "",
          f"*Buổi học do bộ sinh GITA biên soạn ngày {NGAY}. Mọi đáp số do mã "
          f"tính ra. Bám {K['chuan']}, bổ sung khung Thinking and Working "
          f"Mathematically của Cambridge Primary Mathematics.*"]

    return "\n".join(t) + "\n", "\n".join(g) + "\n", [m["ma"] for m in mau]


def main() -> int:
    ap = argparse.ArgumentParser(description="Biên soạn khối Mầm")
    ap.add_argument("--ghi-de", action="store_true")
    a = ap.parse_args()

    moi = giu = 0
    chi_muc = []
    for khoi, K in KHOI.items():
        for cd in CHU_DE[khoi]:
            for buoi in range(1, K["buoi_moi_chu_de"] + 1):
                ma = f"GITA-{khoi}-{cd[0]}-B{buoi}"
                d = RA / khoi
                d.mkdir(parents=True, exist_ok=True)
                p1, p2 = d / f"{ma}.md", d / f"{ma}-NL.md"
                t, g, ma_mau = sinh_buoi(khoi, cd, buoi)
                if p1.exists() and p2.exists() and not a.ghi_de:
                    giu += 2
                else:
                    p1.write_text(t, encoding="utf-8")
                    p2.write_text(g, encoding="utf-8")
                    moi += 2
                chi_muc.append({
                    "ma": ma, "khoi": khoi, "khoi_ten": K["ten"],
                    "tuoi": K["tuoi"], "chu_de": cd[0], "chu_de_ten": cd[1],
                    "mach": cd[2], "mach_ten": MACH[cd[2]]["ten"],
                    "cam": MACH[cd[2]]["cam"], "buoi": buoi,
                    "thoi_luong": K["phut"], "thang_diem": K["thang"],
                    "yeu_cau": cd[3], "twm": list(cd[4]),
                    "chuan": K["chuan"], "ma_mau": ma_mau,
                })

    (RA / "index-khoi-mam.json").write_text(
        json.dumps(chi_muc, ensure_ascii=False, indent=1), encoding="utf-8")

    V = "\033[32m✔\033[0m"
    print(f"{V} Sinh mới {moi} tệp · giữ nguyên {giu} · "
          f"{len(chi_muc)} buổi học × 2 bản")
    for khoi, K in KHOI.items():
        n = sum(1 for x in chi_muc if x["khoi"] == khoi)
        print(f"     {K['ten_ngan']:<16} {len(CHU_DE[khoi]):>2} chủ đề × "
              f"{K['buoi_moi_chu_de']} buổi = {n:>3} buổi · {K['phut']} phút/buổi")
    print(f"  Khối Mầm nằm tại 12-khoi-mam/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
