#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Khung năm học của khối Mầm — lộ trình, bản đồ kiến thức, đánh giá đầu vào.

    python3 04-cong-cu/build_mam_khung.py

Lớp 3–5 có ba thứ mà khối Mầm chưa có, và thiếu cả ba thì 190 buổi học chỉ là
một đống phiếu rời chứ chưa thành một năm học:

* **Lộ trình cả năm** — tuần này học gì, tuần sau học gì, khi nào nhìn lại.
* **Bản đồ kiến thức** — toàn bộ những gì phải nắm được, xếp theo mạch, in ra
  dán tường để trẻ và bố mẹ tự đánh dấu.
* **Đánh giá đầu vào** — đo xem đứa trẻ đang đứng ở đâu trước khi bắt đầu.

Ba tài liệu ấy ở khối này khác hẳn bản của lớp 3–5 ở một điểm gốc: **người đọc
không phải học sinh mà là bố mẹ và giáo viên**. Trẻ năm tuổi không đọc được lộ
trình của chính mình. Vì vậy mọi câu ở đây viết cho người lớn, và mọi việc đều
kèm câu người lớn nói ra miệng.

Điểm gốc thứ hai: **khối mẫu giáo không có điểm số** — kể cả ở bài đánh giá đầu
vào. Đo bằng ba mức quan sát được, không bằng một con số. Một đứa trẻ năm tuổi
bị chấm 4/10 ngay buổi đầu tiên sẽ nhớ con số ấy lâu hơn nhớ bất cứ điều gì
mình học được sau đó.
"""
from __future__ import annotations

import random
import sys
from datetime import date
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(GOC / "04-cong-cu"))

from data.khoi_mam import (CHU_DE, DOI_CHIEU_CAM, KHOI, LUAT_HUNG_THU,  # noqa: E402
                           MACH, PHAN_BUOI, TWM)
from sinh.mau_mam import KHO_MAM, vai_cua                               # noqa: E402

NGAY = date.today().isoformat()
RA = GOC / "12-khoi-mam"
TUAN = 35
CHU = "abcdefghijklmno"
TEN_HOC = "HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA"
KHAU_HIEU = "*Tư duy xuất sắc, Bản lĩnh dẫn đầu*"


def hat(s: str) -> int:
    h = 2166136261
    for c in s:
        h = ((h ^ ord(c)) * 16777619) & 0xFFFFFFFF
    return h


# ─────────────────────── NHỊP HỌC CẢ NĂM ───────────────────────
#
# Mỗi khối có số buổi khác nhau nhưng năm học đều 35 tuần, nên nhịp phải chia
# lại cho từng khối. Chia đều chứ không dồn: dồn ba buổi vào một tuần rồi để
# tuần sau trống là cách chắc chắn làm trẻ đuối rồi quên.

def chia_tuan(tong_buoi: int, so_tuan: int = TUAN) -> list[int]:
    """Chia `tong_buoi` buổi vào `so_tuan` tuần, chênh nhau nhiều nhất 1 buổi."""
    co_ban, du = divmod(tong_buoi, so_tuan)
    ra = [co_ban] * so_tuan
    # Rải phần dư đều khắp năm thay vì dồn vào đầu năm.
    for i in range(du):
        ra[round(i * so_tuan / du)] += 1
    return ra


# Mốc nhìn lại. Khối mẫu giáo cố ý **không gọi là kiểm tra** và không có điểm.
MOC = {
    "MG": {12: "Nhìn lại lần 1 — ghi ba mức, không chấm điểm",
           24: "Nhìn lại lần 2 — ghi ba mức, không chấm điểm",
           35: "Nhìn lại cuối năm — hồ sơ sẵn sàng vào lớp 1"},
    "L1": {9: "Giữa kỳ I — bài nhẹ 20 phút, thang 20",
           18: "Cuối kỳ I — bài nhẹ 20 phút, thang 20",
           27: "Giữa kỳ II — bài nhẹ 20 phút, thang 20",
           35: "Cuối kỳ II — bài nhẹ 20 phút, thang 20"},
    "L2": {9: "Giữa kỳ I — bài 30 phút, thang 40",
           18: "Cuối kỳ I — bài 30 phút, thang 40",
           27: "Giữa kỳ II — bài 30 phút, thang 40",
           35: "Cuối kỳ II — bài 30 phút, thang 40"},
}

# Việc ở nhà theo vai của buổi. Cố ý ngắn: mỗi buổi một việc, làm trong bữa cơm
# hoặc lúc đi đường cũng được. Bài tập về nhà dài ở tuổi này phản tác dụng.
VIEC_NHA = {
    "MG": "Nhắc lại trò chơi của buổi bằng đồ vật trong nhà — 5 phút, không cần bút.",
    "L1": "Làm lại phần B và C trên phiếu, mỗi ngày 10 phút. Sai chỗ nào thì "
          "khoanh lại để buổi sau hỏi.",
    "L2": "Làm lại phần C và D, mỗi ngày 15 phút. Ghi vào sổ lỗi một dòng: "
          "sai gì và lần sau tránh thế nào.",
}


def cach_danh_gia(khoi: str) -> str:
    """Câu mô tả cách đánh giá của khối — mẫu giáo không có thang điểm nào."""
    thang = KHOI[khoi]["thang"]
    return "ba mức, không chấm điểm" if thang is None else f"thang {thang}"


def dau_trang(tieu_de: str, khoi: str, phu: list[str],
              ghi_thoi_luong: bool = True) -> str:
    K = KHOI[khoi]
    dong = f"{K['ten']} · {K['tuoi']}"
    if ghi_thoi_luong:
        dong += f" · {K['phut']} phút mỗi buổi"
    d = [f"# {tieu_de}", "", f"**{TEN_HOC}** · {KHAU_HIEU} · gita.edu.vn", "",
         dong, ""]
    d += [f"- {x}" for x in phu]
    d += ["", f"*Cập nhật: {NGAY}*", "", "---", ""]
    return "\n".join(d)


# ═══════════════════════ 1 · LỘ TRÌNH CẢ NĂM ═══════════════════════

def lo_trinh(khoi: str) -> str:
    K = KHOI[khoi]
    cds = CHU_DE[khoi]
    buoi = [(cd, b) for cd in cds for b in range(1, K["buoi_moi_chu_de"] + 1)]
    nhip = chia_tuan(len(buoi))
    moc = MOC[khoi]

    d = [dau_trang(f"LỘ TRÌNH CẢ NĂM — {K['ten'].upper()}", khoi, [
        f"Tổng số buổi: **{len(buoi)}** · {len(cds)} chủ đề × "
        f"{K['buoi_moi_chu_de']} buổi",
        f"Năm học: **{TUAN} tuần** · nhịp {min(nhip)}–{max(nhip)} buổi mỗi tuần",
        f"Đánh giá: **{cach_danh_gia(khoi)}**",
        f"Chuẩn bám theo: {K['chuan']}",
    ])]

    d += ["## 1. LỘ TRÌNH NÀY TRẢ LỜI BỐN CÂU HỎI", "",
          "| Câu hỏi của bố mẹ | Trả lời ở mục |", "|---|---|",
          "| Tuần này học gì? | Mục 3 — bảng 35 tuần |",
          "| Học xong buổi ấy con phải làm được gì? | Mục 3, cột **Con làm được gì** |",
          "| Ở nhà làm gì cho con? | Mục 4 — việc ở nhà |",
          "| Khi nào biết con đã chắc? | Mục 5 — mốc nhìn lại |", ""]

    d += ["---", "", "## 2. BỐN LUẬT KHÔNG ĐƯỢC PHÁ", "",
          "Bốn điều dưới đây là **ràng buộc thiết kế**, không phải lời khuyên. "
          "Phá một điều thì lộ trình vẫn chạy nhưng đứa trẻ sẽ chán, và một đứa "
          "trẻ chán toán ở tuổi này thì mọi lộ trình về sau đều vô nghĩa.", ""]
    for i, (luat, vi_sao) in enumerate(LUAT_HUNG_THU, 1):
        d += [f"{i}. {luat}", f"   *Vì sao:* {vi_sao}", ""]

    d += ["---", "", f"## 3. BẢNG {TUAN} TUẦN", "",
          "Cột **Con làm được gì** chép nguyên yêu cầu cần đạt của chương trình, "
          "để bố mẹ đối chiếu được chứ không phải tin lời trung tâm.", "",
          "| Tuần | Chủ đề | Buổi | Con học gì | Con làm được gì | Mốc |",
          "|:--:|:--:|---|---|---|---|"]
    i = 0
    for t in range(1, TUAN + 1):
        lo = buoi[i:i + nhip[t - 1]]
        i += nhip[t - 1]
        if not lo:
            d.append(f"| {t} | — | ôn lại | Tuần đệm — làm lại buổi con còn "
                     f"lúng túng | | {moc.get(t, '')} |")
            continue
        ma_cd = " ".join(sorted({cd[0] for cd, _ in lo}))
        ma_b = " · ".join(f"`GITA-{khoi}-{cd[0]}-B{b}`" for cd, b in lo)
        ten = " + ".join(dict.fromkeys(cd[1] for cd, _ in lo))
        yc = "; ".join(dict.fromkeys(y for cd, _ in lo for y in cd[3]))
        d.append(f"| {t} | {ma_cd} | {ma_b} | {ten} | {yc} | "
                 f"{'**' + moc[t] + '**' if t in moc else ''} |")
    d.append("")

    d += ["---", "", "## 4. VIỆC Ở NHÀ", "",
          f"**Mỗi buổi một việc, không hơn.** {VIEC_NHA[khoi]}", "",
          "Ba việc **không** nên làm ở nhà:", "",
          "1. Dạy trước bài của buổi sau. Trẻ đến lớp mất phần khám phá, và phần "
          "khám phá mới là phần trẻ thích.",
          "2. Chữa bài bằng bút đỏ. Khoanh tròn bằng bút chì rồi hỏi lại, "
          "không gạch.",
          "3. So sánh với anh chị hoặc với bạn cùng lớp.", ""]

    d += ["---", "", "## 5. MỐC NHÌN LẠI", "",
          "| Tuần | Việc | Sau đó làm gì |", "|:--:|---|---|"]
    for t, ten in moc.items():
        if khoi == "MG":
            sau = ("Ghi ba mức vào phiếu theo dõi. Chủ đề nào còn ở mức *chưa "
                   "làm được* thì lấy lại buổi cũ chơi lại, không học tiếp.")
        else:
            sau = ("Chấm rồi lập bảng lỗi. Chủ đề nào sai quá nửa thì học lại "
                   "buổi `B1` của chủ đề ấy trước khi đi tiếp.")
        d.append(f"| {t} | {ten} | {sau} |")
    d += ["", "---", "",
          "## 6. NỐI SANG KHỐI SAU", "",
          {"MG": "Hết năm, trẻ có hồ sơ ba mức của 10 chủ đề. Trẻ nào ở mức "
                 "*tự làm được* từ 8 chủ đề trở lên vào thẳng lộ trình lớp 1; "
                 "số còn lại học lại 2–3 chủ đề yếu trong hè, mỗi tuần 2 buổi.",
           "L1": "Hết năm, làm bài đánh giá đầu vào lớp 2 (`12-khoi-mam/"
                 "danh-gia/danh-gia-dau-vao-L2.md`). Từ 15/20 trở lên vào thẳng "
                 "lộ trình lớp 2.",
           "L2": "Hết năm, làm bài test đầu vào lớp 3 tại `08-test-dau-vao/"
                 "test-dau-vao-L3.md` để nối sang hệ hai tuyến của lớp 3–5."}[khoi],
          ""]
    return "\n".join(d)


# ═══════════════════ 2 · BẢN ĐỒ KIẾN THỨC ═══════════════════

def ban_do(khoi: str) -> str:
    K = KHOI[khoi]
    cds = CHU_DE[khoi]
    d = [dau_trang(f"BẢN ĐỒ KIẾN THỨC — {K['ten'].upper()}", khoi, [
        f"Số chủ đề: **{len(cds)}** · trải trên **{len({c[2] for c in cds})}** mạch",
        "Cách dùng: in ra dán tường. Học xong chủ đề nào thì cùng con đánh dấu "
        "vào chủ đề ấy.",
        f"Đối chiếu quốc tế: {DOI_CHIEU_CAM[khoi]['stage']}",
    ])]

    d += ["## 1. CÂY KIẾN THỨC", "", "```", "KIẾN THỨC CẢ NĂM"]
    for mi, (ma_m, M) in enumerate(MACH.items()):
        trong = [c for c in cds if c[2] == ma_m]
        if not trong:
            continue
        cuoi_m = mi == len(MACH) - 1 or not any(
            c[2] == m2 for m2 in list(MACH)[mi + 1:] for c in cds)
        goc = "└──" if cuoi_m else "├──"
        doc = "   " if cuoi_m else "│  "
        d.append(f"{goc} {M['ten']}  ({M['cam']})")
        for ci, c in enumerate(trong):
            cuoi_c = ci == len(trong) - 1
            d.append(f"{doc} {'└─' if cuoi_c else '├─'} [{c[0]}] {c[1]}")
            doc2 = f"{doc} {'   ' if cuoi_c else '│  '}"
            for yi, y in enumerate(c[3]):
                d.append(f"{doc2}{'└' if yi == len(c[3]) - 1 else '├'} {y}")
    d += ["```", "", "---", ""]

    d += ["## 2. BẢNG TỰ ĐÁNH DẤU", "",
          "Cột **Mức** ghi theo ba mức: `1` chưa làm được · `2` làm được khi có "
          "người giúp · `3` tự làm được. Ghi bằng bút chì để còn sửa được.", "",
          "| Chủ đề | Con phải làm được gì | Buổi học | Mức |",
          "|:--:|---|---|:--:|"]
    for c in cds:
        ma_b = " ".join(f"`B{b}`" for b in range(1, K["buoi_moi_chu_de"] + 1))
        d.append(f"| **{c[0]}** {c[1]} | " + "<br>".join(f"• {y}" for y in c[3])
                 + f" | {ma_b} | |")
    d += ["", "---", ""]

    d += ["## 3. TÁM CÁCH NGHĨ RÈN SUỐT NĂM", "",
          "Đây là phần Cambridge bổ sung thêm vào chương trình của Bộ. Nó không "
          "thêm nội dung mới mà thêm **cách làm việc với nội dung ấy**. Với trẻ "
          "nhỏ, một cách nghĩ chỉ tồn tại khi có người lớn hỏi thành lời — nên "
          "cột quan trọng nhất của bảng này là cột câu hỏi.", "",
          "| Cách nghĩ | Gốc Cambridge | Là gì | Câu người lớn hỏi | Từ tuổi |",
          "|---|---|---|---|:--:|"]
    dung = {t for c in cds for t in c[4]}
    for ma_t, T in TWM.items():
        dau = " ✔" if ma_t in dung else ""
        d.append(f"| **{T['ten']}**{dau} | {T['goc']} | {T['la_gi']} | "
                 f"*{T['cau_hoi']}* | {T['tuoi']} |")
    d += ["", "Dấu ✔ là cách nghĩ được nhấn ở khối này. Bốn cách còn lại vẫn "
          "hỏi được, chỉ là chưa đặt thành trọng tâm.", "", "---", ""]

    D = DOI_CHIEU_CAM[khoi]
    d += ["## 4. ĐỐI CHIẾU VỚI CAMBRIDGE", "",
          "Đối chiếu để biết chỗ lệch, **không phải để dạy trước**. Nội dung "
          "Cambridge có sớm hơn mà chương trình Việt Nam để sau thì vẫn dạy "
          "sau — chỉ đưa vào phần thử thách vui cho trẻ nào đã chắc.", "",
          "| Mục | Nội dung |", "|---|---|",
          f"| Tương ứng | {D['stage']} |",
          f"| Phần trùng nhau | {D['trung']} |",
          f"| Cambridge có sớm hơn | {D['cam_som_hon']} |",
          f"| Việt Nam có sớm hơn | {D['vn_som_hon']} |", "", "---", ""]

    d += ["## 5. MỘT BUỔI HỌC GỒM GÌ", "", "| Phần | Thời lượng | Mục đích |",
          "|---|:--:|---|"]
    for p in PHAN_BUOI[khoi]:
        if len(p) == 3:
            d.append(f"| {p[0]} | {p[1]} phút | {p[2]} |")
        else:
            d.append(f"| {p[0]} — {p[1]} | {p[2]} phút | {p[3]} điểm |")
    d.append("")
    return "\n".join(d)


# ═══════════════ 3 · ĐÁNH GIÁ ĐẦU VÀO ═══════════════
#
# Nguồn câu hỏi là **chủ đề của khối liền trước**, vì bài đầu vào đo cái trẻ
# mang đến chứ không đo cái sắp được dạy. Riêng khối mẫu giáo không có khối
# trước nên lấy chính các chủ đề dễ nhất của mình.

NGUON_DAU_VAO = {
    "MG": ("MG", ["MG01", "MG03", "MG06", "MG07", "MG08"]),
    "L1": ("MG", [c[0] for c in CHU_DE["MG"]]),
    "L2": ("L1", [c[0] for c in CHU_DE["L1"]]),
}
# Số câu chọn sao cho **chia hết thang điểm của khối**: thang 20 chia cho 10
# câu là 2 điểm một câu, thang 40 chia cho 20 câu cũng 2 điểm một câu. Chọn số
# câu tuỳ ý rồi lấy phần nguyên sẽ ra một bài "thang 40" nhưng cộng hết chỉ
# được 30 — người chấm sẽ tưởng học sinh mất 10 điểm.
SO_CAU = {"MG": 8, "L1": 9, "L2": 20}


def danh_gia(khoi: str) -> str:
    K = KHOI[khoi]
    kho_khoi, ma_cds = NGUON_DAU_VAO[khoi]
    rng = random.Random(hat(f"DGDV-{khoi}"))

    # Rút mỗi mẫu **một ý** để bài phủ được nhiều dạng, thay vì bốn ý cùng dạng.
    ung = []
    for ma_cd in ma_cds:
        for m in KHO_MAM[kho_khoi].get(ma_cd, []):
            if vai_cua(m["ma"]) == "khoi_dong":
                continue          # ý vận động không chấm trên giấy được
            ung.append((ma_cd, m))
    rng.shuffle(ung)

    cau, da_mau = [], set()
    for ma_cd, m in ung:
        if len(cau) >= SO_CAU[khoi] or m["ma"] in da_mau:
            continue
        b = m["sinh"](random.Random(hat(f"DGDV-{khoi}-{m['ma']}")))
        if not b.y:
            continue
        da_mau.add(m["ma"])
        cau.append((ma_cd, m, b, rng.choice(b.y)))
    thu_tu = {m: i for i, m in enumerate(MACH)}
    cau.sort(key=lambda x: (thu_tu[x[2].mach], x[0]))

    # Bài đầu vào của khối này đo **bốn trục**: ba mạch kiến thức của chương
    # trình, cộng trục tư duy theo khung Cambridge. Trục tư duy chấm bằng câu
    # hỏi mở, nên chiếm phần điểm còn lại sau khi ba mạch đã lấy 2 điểm mỗi câu.
    khong_diem = K["thang"] is None
    DIEM_CAU = 2
    if khong_diem:
        diem_moi = tong = diem_tu_duy = None
    else:
        while len(cau) > 3 and K["thang"] - DIEM_CAU * len(cau) < DIEM_CAU:
            cau.pop()
        diem_moi = DIEM_CAU
        diem_tu_duy = K["thang"] - DIEM_CAU * len(cau)
        tong = K["thang"]

    # Hai câu hỏi mở của trục tư duy, lấy từ chính các mẫu đã dùng.
    hoi_tu_duy = []
    for _, m, b, _ in cau:
        if b.cau_hoi_twm and "{}" not in b.cau_hoi_twm and len(hoi_tu_duy) < 2:
            if b.cau_hoi_twm not in [h for h, _ in hoi_tu_duy]:
                hoi_tu_duy.append((b.cau_hoi_twm, b.twm))

    d = [dau_trang(f"ĐÁNH GIÁ ĐẦU VÀO — {K['ten'].upper()}", khoi, [
        f"Số việc: **{len(cau)}** việc theo ba mạch + "
        f"{len(hoi_tu_duy)} câu hỏi mở đo tư duy",
        "Cách ghi: **ba mức, không chấm điểm**" if khong_diem else
        f"Thang điểm: **{tong}** — {len(cau)} việc × {diem_moi} điểm + "
        f"{diem_tu_duy} điểm trục tư duy · thời gian "
        f"{20 if khoi == 'L1' else 30} phút",
        "Người thực hiện: **giáo viên hoặc bố mẹ ngồi cùng, đọc từng việc lên**"
        if khoi in ("MG", "L1") else
        "Người thực hiện: học sinh tự đọc và tự làm, người lớn chỉ ngồi cạnh",
        "Mục đích: xếp đúng điểm bắt đầu, **không phải để loại ai**",
    ], ghi_thoi_luong=False)]

    dan_doc = ("Đọc từng việc lên, đọc lại lần hai nếu trẻ hỏi. Không giải "
               "thích thêm, không gợi ý cách làm."
               if khoi in ("MG", "L1") else
               "Để học sinh tự đọc đề. Chỉ đọc hộ khi em hỏi, và đọc đúng chữ "
               "trong đề, không diễn giải lại.")
    d += ["## 1. DẶN NGƯỜI COI BÀI", "",
          f"1. {dan_doc}",
          "2. Trẻ tắc quá 1 phút thì chuyển sang việc sau, ghi lại là *chưa làm "
          "được* rồi đi tiếp. Không ngồi chờ cho tới lúc trẻ nản.",
          "3. Không nói *sai rồi*, không nói *dễ thế mà*. Nói *được rồi, mình "
          "sang việc khác nhé*.",
          "4. Cho phép dùng ngón tay, que tính, giấy nháp ở mọi việc. Bài này "
          "đo trẻ **làm được gì**, không đo trẻ nhẩm nhanh đến đâu.", "",
          "---", ""]

    d += ["## 2. CÁC VIỆC", ""]
    mach_hien = None
    for i, (ma_cd, m, b, (viec, _)) in enumerate(cau, 1):
        if b.mach != mach_hien:
            mach_hien = b.mach
            d += [f"### Mạch {MACH[mach_hien]['ten']} "
                  f"*({MACH[mach_hien]['cam']})*", ""]
        d += [f"**Việc {i}.** {viec}", ""]
        if b.do_dung:
            d.append(f"*Đồ dùng:* {'; '.join(b.do_dung)}")
            d.append("")
        d += ["Ghi kết quả:  ☐ chưa làm được   ☐ làm được khi có người giúp   "
              "☐ tự làm được", ""]
    if hoi_tu_duy:
        d += [f"### Trục tư duy *(Thinking and Working Mathematically)*", "",
              "Hai câu này **hỏi miệng**, không viết. Chấm cách nghĩ chứ không "
              "chấm đáp số: nói được vì sao là đủ, kể cả khi con số bị sai.", ""]
        for j, (hoi, twm) in enumerate(hoi_tu_duy, 1):
            ten = " · ".join(TWM[t]["ten"] for t in twm if t in TWM)
            d += [f"**Hỏi {j}.** *{hoi}*", "",
                  f"*Đo cách nghĩ:* {ten}", ""]
            if khong_diem:
                d += ["Ghi kết quả:  ☐ chưa nói được   ☐ nói được khi gợi ý   "
                      "☐ tự nói được", ""]
            else:
                d_hoi = diem_tu_duy // len(hoi_tu_duy)
                # Thang một điểm thì không chia ba mức được — nói thẳng hai mức
                # còn hơn in ra ba mức mà hai mức trùng số.
                thang = (f"0 — không nói được gì · {d_hoi} — nói được cách nghĩ, "
                         f"kể cả khi cần gợi ý" if d_hoi < 2 else
                         f"0 — không trả lời · {d_hoi // 2} — nói được khi gợi ý "
                         f"· {d_hoi} — tự giải thích được cách nghĩ")
                d += [f"Chấm ({d_hoi} điểm): {thang}", ""]
    d += ["---", ""]

    d += ["## 3. ĐÁP ÁN VÀ CÁCH ĐỌC KẾT QUẢ", "",
          "| Việc | Chủ đề | Mạch | Đáp án | Làm được nghĩa là |",
          "|:--:|:--:|:--:|---|---|"]
    for i, (ma_cd, m, b, (_, dap)) in enumerate(cau, 1):
        hieu = b.dau_hieu_hieu.replace("\n", " ").replace("**", "")
        hieu = hieu[:150] + ("…" if len(hieu) > 150 else "")
        d.append(f"| {i} | {ma_cd} | {MACH[b.mach]['ten']} | {dap} | {hieu} |")
    d += ["", "---", ""]

    d += ["## 4. XẾP ĐIỂM BẮT ĐẦU", ""]
    if khong_diem:
        d += ["Đếm số việc ở mức *tự làm được*:", "",
              "| Số việc tự làm được | Bắt đầu từ đâu |", "|:--:|---|",
              f"| {len(cau) - 1}–{len(cau)} | Vào thẳng chủ đề "
              f"{CHU_DE[khoi][2][0]} trở đi, các chủ đề đầu chỉ ôn nhanh 1 buổi |",
              f"| {len(cau) // 2}–{len(cau) - 2} | Bắt đầu từ chủ đề "
              f"{CHU_DE[khoi][0][0]} theo đúng lộ trình |",
              f"| dưới {len(cau) // 2} | Bắt đầu từ chủ đề {CHU_DE[khoi][0][0]}, "
              f"mỗi chủ đề thêm 1 buổi chơi lại bằng đồ vật thật |", "",
              "**Không xếp hạng, không thông báo kết quả trước mặt trẻ khác.** "
              "Kết quả này là của người lớn dùng để chọn điểm bắt đầu, không "
              "phải nhận xét về đứa trẻ."]
    else:
        d += [f"{len(cau)} việc × {diem_moi} điểm + {diem_tu_duy} điểm trục "
              f"tư duy = **{tong} điểm**, đúng thang của khối. "
              f"*Làm được khi có người giúp* tính nửa điểm.", "",
              "| Điểm | Bắt đầu từ đâu |", "|:--:|---|",
              f"| {int(tong * 0.85)}–{tong} | Vào lộ trình bình thường, thêm "
              f"phần thử thách vui của mỗi buổi |",
              f"| {int(tong * 0.6)}–{int(tong * 0.85) - 1} | Vào lộ trình bình "
              f"thường |",
              f"| {int(tong * 0.4)}–{int(tong * 0.6) - 1} | Vào lộ trình, kèm "
              f"2 buổi ôn lại kiến thức khối trước mỗi tuần |",
              f"| dưới {int(tong * 0.4)} | Học 4 tuần bù kiến thức khối trước "
              f"rồi mới vào lộ trình |", "",
              "Bảng lỗi theo mạch quan trọng hơn tổng điểm: hai học sinh cùng "
              f"{int(tong * 0.6)} điểm nhưng một em sai hết mạch Hình học còn "
              "em kia sai rải rác thì cần hai cách dạy khác nhau."]
    d.append("")
    return "\n".join(d)


def main() -> int:
    V = "\033[32m✔\033[0m"
    n = 0
    for ten, ham in (("lo-trinh", lo_trinh), ("ban-do", ban_do),
                     ("danh-gia", danh_gia)):
        thu_muc = RA / ten
        thu_muc.mkdir(parents=True, exist_ok=True)
        for khoi in KHOI:
            ten_tep = (f"{ten}-{khoi}.md" if ten != "danh-gia"
                       else f"danh-gia-dau-vao-{khoi}.md")
            (thu_muc / ten_tep).write_text(ham(khoi), encoding="utf-8")
            n += 1
    print(f"{V} Khung năm học khối Mầm: {n} tài liệu "
          f"({len(KHOI)} lộ trình · {len(KHOI)} bản đồ · {len(KHOI)} đánh giá đầu vào)")
    for khoi, K in KHOI.items():
        tong = K["so_chu_de"] * K["buoi_moi_chu_de"]
        nhip = chia_tuan(tong)
        print(f"     {K['ten_ngan']:<16} {tong:>3} buổi / {TUAN} tuần · "
              f"nhịp {min(nhip)}–{max(nhip)} buổi/tuần · "
              f"{len(MOC[khoi])} mốc nhìn lại")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
