#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh 6 LỘ TRÌNH HỌC XUẤT SẮC (3 lớp × 2 tuyến), mỗi lộ trình 34 tuần.

Lộ trình không phải bản liệt kê phiếu theo thứ tự. Nó trả lời bốn câu mà một
phụ huynh và một huấn luyện viên hỏi mỗi tuần: tuần này học gì · làm xong thì
phải có sản phẩm gì · qua được cổng nào thì đi tiếp · quên rồi thì ôn lại lúc nào.

    python3 04-cong-cu/build_lo_trinh.py
Đầu ra: 05-lo-trinh/lo-trinh-{T1|T2}-L{3,4,5}.md
"""
from __future__ import annotations

import collections
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))

from nhom_chuyen_de import NHOM                    # noqa: E402
from loai_phieu import LOAI                        # noqa: E402
from phan_quyen import TANG                        # noqa: E402

OUT = ROOT / "05-lo-trinh"
INDEX = ROOT / "02-chi-muc" / "index-master.json"

TUYEN_TEN = {"T1": "Tuyến 1 — Nền tảng đến Nâng cao",
             "T2": "Tuyến 2 — Nâng cao thi CLC và thi Chuyên"}
DICH = {
    "T1": "Học chắc gốc: hết năm không còn dạng bài nào trong chương trình mà em "
          "chưa gọi được tên và chưa giải được ở mức vận dụng.",
    "T2": "Thi được: hết năm em làm trọn một đề thi chất lượng cao trong 90 phút "
          "với điểm từ 80/100, và không sợ bài lạ ở phần phân hoá.",
}
# Sản phẩm bắt buộc sau mỗi loại buổi — thứ huấn luyện viên kiểm, không phải điểm số.
SAN_PHAM = {
    "LT": "sơ đồ tư duy chương tự vẽ",
    "DB": "bảng dạng bài — dấu hiệu điền đủ",
    "KN": "sổ lỗi cập nhật + một lần giảng lại",
    "NC": "phần IV, V đã chữa, mỗi bài sai một dòng cách phòng",
    "OT": "điểm bài ôn + bảng phân tích lỗi",
    "TH": "điểm thi chương + quyết định đóng cụm",
    "MOC": "điểm bài mốc + tầng năng lực mới",
}
NHIP = {
    "T1": ("3 buổi mỗi tuần ở lớp, mỗi buổi 90 phút", "40 phút tự học mỗi ngày",
           "1 buổi cuối tuần 60 phút để ôn lại cụm đã học"),
    "T2": ("3 buổi mỗi tuần ở lớp, mỗi buổi 90 phút", "60 phút tự học mỗi ngày",
           "1 buổi cuối tuần 90 phút: một đề thi bấm giờ và chữa"),
}
QUY_TAC_2080 = {
    "T1": [("20% việc cho 80% kết quả", "Thuộc bảng công thức của chương và làm chắc "
            "Phần I – III của mọi phiếu. Riêng hai việc này đã đủ 70 – 80 điểm."),
           ("Việc bỏ được", "Chưa cần làm hết Phần V của mọi phiếu. Làm Phần V của "
            "phiếu NC là đủ ở tuyến này."),
           ("Việc không bao giờ được bỏ", "Sổ lỗi. Một lỗi không ghi lại là một lỗi "
            "sẽ lặp lại trong kỳ thi.")],
    "T2": [("20% việc cho 80% kết quả", "Đọc vị đúng dạng bài trong 10 giây, và làm "
            "trọn Phần IV – V của phiếu NC và OT."),
           ("Việc bỏ được", "Không làm lại Phần I – II khi đã đúng trọn hai lần liên "
            "tiếp. Thời gian ấy dồn cho bài phân hoá."),
           ("Việc không bao giờ được bỏ", "Mỗi tuần một đề bấm giờ. Kỹ năng phân bổ "
            "thời gian chỉ rèn được bằng cách bấm giờ thật.")],
}
ON_LAI = [("Ngay sau buổi", "10 phút", "Đọc lại điểm chốt và sổ lỗi của buổi vừa học"),
          ("Sau 1 ngày", "15 phút", "Làm lại 3 bài sai gần nhất, không nhìn lời giải"),
          ("Sau 1 tuần", "30 phút", "Làm lại phần IV của phiếu NC cụm vừa đóng"),
          ("Sau 1 tháng", "45 phút", "Làm lại trọn phiếu TH của cụm, bấm giờ 90 phút"),
          ("Trước mỗi mốc", "2 buổi", "Theo phiếu HD của các cụm còn ✘ trong checklist")]


def moc_cua(stt: int) -> str:
    return {25: "Giữa kỳ I", 50: "Cuối kỳ I", 75: "Giữa kỳ II", 100: "Cuối kỳ II"}.get(stt, "")


def sinh(tuyen: str, lop: int, rows) -> str:
    ds = sorted([r for r in rows if r["tuyen"] == tuyen and r["lop"] == lop
                 and r.get("la_buoi_hoc")], key=lambda r: r["stt"])
    theo_tuan = collections.OrderedDict()
    for r in ds:
        theo_tuan.setdefault(r["tuan"], []).append(r)
    cums = collections.OrderedDict()
    for r in ds:
        if r.get("cum"):
            cums.setdefault(r["cum"], r)

    L = [f"# LỘ TRÌNH HỌC XUẤT SẮC — {TUYEN_TEN[tuyen]} — LỚP {lop}", "",
         "**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · "
         "*Tư duy xuất sắc, Bản lĩnh dẫn đầu* · gita.edu.vn", "",
         f"**Đích đến của năm học.** {DICH[tuyen]}", "",
         f"- Số buổi học: **{len(ds)}** phiếu 90 phút · **{len(cums)}** cụm chuyên đề "
         f"· **{max(theo_tuan)}** tuần",
         f"- Nhịp học: " + " · ".join(NHIP[tuyen]),
         "- Mỗi cụm gồm 6 buổi `LT → DB → KN → NC → OT → TH`, kèm phiếu `HD` để tự ôn "
         "và 6 phiếu `GP` lời giải.", "", "---", "",
         "## 1. BỐN CÂU HỎI LỘ TRÌNH NÀY TRẢ LỜI", "",
         "| Câu hỏi | Trả lời ở mục |", "|---|---|",
         "| Tuần này học gì? | Mục 3 — bảng 34 tuần |",
         "| Học xong phải có sản phẩm gì? | Mục 3, cột **Sản phẩm phải nộp** |",
         "| Khi nào được đi tiếp? | Mục 4 — bốn cổng |",
         "| Quên rồi thì ôn lại lúc nào? | Mục 5 — lịch ôn lại |", "",
         "---", "", "## 2. QUY TẮC 20/80 CỦA TUYẾN NÀY", "",
         "| Loại việc | Nội dung |", "|---|---|"]
    for ten, noi in QUY_TAC_2080[tuyen]:
        L.append(f"| **{ten}** | {noi} |")

    L += ["", "---", "", "## 3. BẢNG 34 TUẦN", "",
          "Cột **Cổng** ghi việc phải qua mới được sang tuần sau. Ô trống nghĩa là "
          "học bình thường.", "",
          "| Tuần | Cụm | Buổi và mã phiếu | Trọng tâm tuần | Sản phẩm phải nộp | Cổng |",
          "|:--:|:--:|---|---|---|---|"]
    for tuan, ps in theo_tuan.items():
        ma_cum = " ".join(dict.fromkeys(
            f"C{p['cum']:02d}" if p.get("cum") else "mốc" for p in ps))
        buoi = " · ".join(f"`{p['loai']}`" for p in ps)
        trong_tam = " + ".join(dict.fromkeys(p["cum_ten"] for p in ps))
        sp = "; ".join(dict.fromkeys(SAN_PHAM.get(p["loai"], "") for p in ps))
        cong = ""
        for p in ps:
            if p["loai"] == "TH":
                cong = f"Đóng cụm {ma_cum}: ≥ 80/100 và ≥ 90% checklist `HD`"
            if p["loai"] == "MOC":
                cong = f"**Mốc {moc_cua(p['stt'])}** — xếp lại tầng năng lực"
        L.append(f"| {tuan} | {ma_cum} | {buoi} | {trong_tam} | {sp} | {cong} |")

    L += ["", "---", "", "## 4. BỐN CỔNG CỦA NĂM HỌC", "",
          "Cổng là điều kiện **đo được**, không phải cảm nhận. Chưa qua cổng thì không "
          "mở nội dung tiếp theo — đó là cách giữ cho nền không bị hổng.", "",
          "| Cổng | Ở đâu | Điều kiện qua | Chưa qua thì làm gì |", "|---|---|---|---|",
          "| **Cổng buổi** | Sau mỗi buổi | Nộp đủ sản phẩm ở cột “Sản phẩm phải nộp” "
          "| Làm nốt trước buổi sau, không nợ sang tuần |",
          "| **Cổng cụm** | Buổi `TH` của cụm | ≥ 80/100 ở phiếu `TH` **và** ≥ 90% "
          "checklist phiếu `HD` | Học lại phiếu `NC`, làm bài tương tự trong phiếu `GP`, "
          "thi lại. Không mở cụm mới |",
          "| **Cổng mốc** | Tuần có phiếu `MOC` | Đạt ngưỡng tầng năng lực mục tiêu "
          "| Theo phiếu `HD` của các cụm còn ✘, hai buổi bù trước khi đi tiếp |"]
    if tuyen == "T1":
        L.append("| **Cổng chuyển tuyến** | Bất kỳ lúc nào | Ba huy hiệu ★★★★☆ liên tiếp "
                 "trong cùng một nhóm chuyên đề | Tiếp tục Tuyến 1 ở nhóm ấy; các nhóm "
                 "khác vẫn có thể chuyển riêng |")
    else:
        L.append("| **Cổng dự thi** | Trước kỳ thi 8 tuần | Ba đề mốc gần nhất đều "
                 "≥ 80/100 và tầng năng lực từ M4 | Vào giai đoạn nước rút ở mục 7, "
                 "ưu tiên nhóm chuyên đề còn yếu |")

    L += ["", "**Năm tầng năng lực và ngưỡng mở nội dung**", "",
          "| Tầng | Tên | Ngưỡng | Mở được gì |", "|:--:|---|:--:|---|"]
    for t in TANG:
        L.append(f"| {t['ma']} | {t['ten']} | ≥ {t['nguong']}% | "
                 f"{', '.join(t['mo'])} · tuyến {', '.join(t['tuyen'])} |")

    L += ["", "---", "", "## 5. LỊCH ÔN LẠI — CHỐNG QUÊN", "",
          "Quên là chuyện bình thường; không ôn lại đúng lúc mới là vấn đề. Năm mốc "
          "dưới đây rải theo đúng nhịp quên tự nhiên.", "",
          "| Mốc ôn | Thời lượng | Việc làm |", "|---|:--:|---|"]
    for moc, tl, viec in ON_LAI:
        L.append(f"| {moc} | {tl} | {viec} |")

    L += ["", "---", "", "## 6. TÁM NHÓM CHUYÊN ĐỀ TRẢI TRONG NĂM", "",
          "| Nhóm | Tên | Số cụm trong năm | Tuần xuất hiện | Sơ đồ đọc vị |",
          "|:--:|---|:--:|---|---|"]
    theo_nhom = collections.OrderedDict()
    for c, r in cums.items():
        theo_nhom.setdefault(r["nhom_ma"], []).append(r)
    for g in "ABCDEFGH":
        rs = theo_nhom.get(g, [])
        tuans = ", ".join(str(r["tuan"]) for r in rs) or "—"
        L.append(f"| {g} | {NHOM[g]['ten']} | {len(rs)} | {tuans} | "
                 f"`10-so-do-doc-vi/so-do-{g}-L{lop}.md` |")

    L += ["", "---", "", "## 7. MƯỜI HAI TUẦN NƯỚC RÚT", "",
          "Áp dụng cho 12 tuần cuối trước kỳ thi mục tiêu. Trong giai đoạn này, "
          "**không học kiến thức mới** — chỉ làm chắc và làm nhanh cái đã có.", "",
          "| Tuần nước rút | Việc chính | Đo bằng |", "|:--:|---|---|",
          "| 1 – 3 | Rà bản đồ kiến thức cả năm, đánh dấu mạch còn ✘, học lại theo "
          "phiếu `HD` của những cụm ấy | Checklist bản đồ ≥ 90% ✔ |",
          "| 4 – 6 | Mỗi tuần hai đề mốc bấm giờ 90 phút, chữa kỹ bằng bảng phân tích "
          "sáu cột | Điểm ba đề gần nhất đều ≥ 75/100 |",
          "| 7 – 9 | Luyện riêng phần phân hoá: Phần IV và V của mọi phiếu `NC` thuộc "
          "nhóm chuyên đề còn yếu nhất | Không còn nhóm nào dưới M3 |",
          "| 10 – 11 | Đề đánh giá năng lực, luyện tốc độ đọc vị: 10 đề đọc vị mỗi "
          "buổi, chỉ gọi tên dạng bài | Đọc vị đúng ≥ 9/10 trong 10 giây mỗi đề |",
          "| 12 | Hai đề tổng duyệt trong điều kiện y như phòng thi; ngày cuối chỉ đọc "
          "sổ lỗi, không làm bài mới | Điểm hai đề tổng duyệt đều ≥ 80/100 |", "",
          "---", "", "## 8. BẢNG THEO DÕI CÁ NHÂN", "",
          "In một bản dán vào trang đầu vở. Mỗi tuần điền một dòng.", "",
          "| Tuần | Điểm phiếu cao nhất | Điểm phiếu thấp nhất | Nhóm còn yếu | "
          "Số lỗi mới ghi vào sổ | Đã qua cổng chưa |", "|:--:|:--:|:--:|---|:--:|:--:|"]
    for t in list(theo_tuan)[:6]:
        L.append(f"| {t} |  |  |  |  |  |")
    L += ["| … |  |  |  |  |  |", "",
          "> **Cách đọc bảng này.** Cột “Nhóm còn yếu” quan trọng hơn cột điểm. Điểm "
          "thấp ở một tuần có thể do một buổi mệt; cùng một nhóm chuyên đề xuất hiện "
          "ba tuần liên tiếp ở cột ấy mới là tín hiệu phải đổi cách học.", "",
          "---", "",
          "**Người biên soạn:** Ban chuyên môn Học viện GITA",
          "**Phiên bản:** 2.0 · Sinh từ chỉ mục 1 296 tài liệu, khớp đúng tuần và cụm "
          "của khối này.", ""]
    return "\n".join(L)


def main() -> None:
    OUT.mkdir(exist_ok=True)
    rows = json.loads(INDEX.read_text(encoding="utf-8"))
    n = 0
    for tuyen in ("T1", "T2"):
        for lop in (3, 4, 5):
            (OUT / f"lo-trinh-{tuyen}-L{lop}.md").write_text(
                sinh(tuyen, lop, rows), encoding="utf-8")
            n += 1
    print(f"✔ Đã sinh {n} lộ trình học xuất sắc vào {OUT.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
