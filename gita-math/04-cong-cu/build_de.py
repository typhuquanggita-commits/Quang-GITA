#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Biên soạn trọn bộ 162 đề thi kèm đáp án và bảng phân tích sau thi.

    python3 04-cong-cu/build_de.py            # chỉ sinh đề còn thiếu
    python3 04-cong-cu/build_de.py --ghi-de   # dựng lại tất cả

Ba họ đề, theo đúng đặc tả ở `07-de-thi/00-dac-ta-bo-de-thi.md`:

* **ON** — 12 phiếu ôn tập mốc, 90 phút, thang 100, năm phần A–E.
* **MOC** — 120 đề thi mốc: 3 lớp × 4 mốc × 10 biến thể, 60 phút, thang 10.
* **NL** — 30 đề đánh giá năng lực: 3 lớp × 10 đề, 60 phút, thang 100.

Mỗi tệp gồm ba khối: **đề**, **đáp án và biểu điểm**, **bảng phân tích sau thi**.
Bảng phân tích là thứ phân biệt bộ đề này với một tuyển tập đề rời: mỗi bài đều
ghi rõ bài ấy đo cái gì, sai bài ấy nghĩa là hổng chỗ nào, và phải quay lại học
phiếu nào. Chấm xong là biết ngay phải làm gì tiếp, không phải chỉ biết điểm.

Ba đề viết tay đầu tiên — `GITA-ON-L4-GK1`, `GITA-MOC-L4-GK1-D01`,
`GITA-NL-L5-D01` — được giữ làm chuẩn vàng, bộ sinh không ghi đè.
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(GOC / "04-cong-cu"))

import sinh                                              # noqa: E402,F401
from lap import de                                       # noqa: E402
from sinh.khung import sv                                # noqa: E402

CHUAN_VANG = {"GITA-ON-L4-GK1", "GITA-MOC-L4-GK1-D01", "GITA-NL-L5-D01"}
THU_MUC = {"ON": "on-tap", "MOC": "de-moc", "NL": "dgnl"}
NGAY = date.today().isoformat()

CHU = "abcdefghij"


def cum_theo_lop() -> dict[int, list[dict]]:
    """Danh sách cụm của từng lớp, kèm nhóm chuyên đề và dạng bài.

    Lấy từ chỉ mục chính chứ không từ `data/cum_chuyen_de.py`, vì chỉ mục chính
    là nơi duy nhất có sẵn danh sách dạng bài của từng cụm — mà dạng bài mới là
    thứ bộ chọn mẫu cần để rút đúng bài cho đúng chương.
    """
    rows = json.loads((GOC / "02-chi-muc" / "index-master.json").read_text("utf-8"))
    gom: dict[tuple[int, int], dict] = {}
    for r in rows:
        if r["loai"] in ("GP", "HD", "MOC") or r["tuyen"] != "T1":
            continue
        k = (r["lop"], r["cum"])
        d = gom.setdefault(k, {"cum": r["cum"], "cum_ten": r["cum_ten"],
                               "nhom_ma": r.get("nhom_ma"), "dang_bai": []})
        for x in r.get("dang_bai") or []:
            if x not in d["dang_bai"]:
                d["dang_bai"].append(x)
    ra: dict[int, list[dict]] = defaultdict(list)
    for (lop, _), d in sorted(gom.items()):
        ra[lop].append(d)
    return ra


PHAM_VI_MOC = {"GK1": (0, 4), "CK1": (0, 8), "GK2": (8, 12), "CK2": (0, 16)}


def cum_trong_pham_vi(cums: list[dict], moc: str) -> list[dict]:
    a, b = PHAM_VI_MOC[moc]
    return cums[a:b]


# ─────────────────────────── KẾT XUẤT CHUNG ───────────────────────────

def fm(row: dict, them: dict | None = None) -> list[str]:
    d = {"ma": row["ma"], "ho": row["ho"], "lop": row["lop"], "moc": row["moc"],
         "moc_ten": row["moc_ten"], "pham_vi": row["pham_vi"],
         "bien_the": row.get("bien_the") or "—",
         "thoi_luong": row["thoi_luong"], "thang_diem": row["thang_diem"],
         "cap_nhat": NGAY}
    d.update(them or {})
    ra = ["---"]
    for k, v in d.items():
        # Bọc **mọi** giá trị trong dấu nháy. Không bọc thì bộ đọc YAML tự đoán
        # kiểu: "2026-08-30" thành đối tượng ngày, và bộ đóng gói dữ liệu web
        # sập vì không tuần tự hoá được kiểu ấy. Ở đây mọi trường đều là chữ.
        v = str(v).replace('"', "'")
        ra.append(f'{k}: "{v}"')
    ra.append("---")
    return ra


def dau_de(row: dict, tieu_de: str, ma_tran: str) -> list[str]:
    return [
        "", f"# {tieu_de}", "",
        "**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn  ",
        f"Mã đề: **{row['ma']}** · Thời gian làm bài: **{row['thoi_luong']} phút** "
        f"· Thang điểm: **{row['thang_diem']}**  ",
        f"Phạm vi: **{row['pham_vi']}** · Đợt: {row.get('tuan', '')}  ",
        f"Biến thể: *{row.get('bien_the') or 'Bản chuẩn'}*", "",
        "Họ và tên: ......................................... "
        f"Lớp: ......... Điểm: ......../{row['thang_diem']}", "",
        f"> {ma_tran}", "", "---", "",
    ]


def y_de(bai, so_y: int | None = None) -> list[str]:
    """In các ý của một bài, có thể cắt bớt cho vừa dung lượng một bài thi."""
    ds = bai.y if so_y is None else bai.y[:so_y]
    return [f"{CHU[i]}) {d}" for i, (d, _) in enumerate(ds)]


def y_dap(bai, so_y: int | None = None) -> list[str]:
    ds = bai.y if so_y is None else bai.y[:so_y]
    return [f"{CHU[i]}) **{a}**" for i, (_, a) in enumerate(ds)]


def khoi_phan_tich(muc: list[dict]) -> list[str]:
    """Bảng phân tích sau thi — sai bài này nghĩa là hổng chỗ nào, học lại đâu."""
    ra = ["", "---", "", "## BẢNG PHÂN TÍCH SAU THI", "",
          "Chấm xong đối chiếu bảng này để biết phải làm gì tiếp, không dừng ở con số điểm.",
          "",
          "| Bài | Đo cái gì | Sai bài này nghĩa là | Học lại ở đâu |",
          "|:--:|---|---|---|"]
    for m in muc:
        ra.append(f"| {m['nhan']} | {m['do']} | {m['sai']} | {m['hoc_lai']} |")
    return ra


def _hoc_lai(bai) -> str:
    return f"Nhóm chuyên đề **{bai.nhom or '—'}** · mức {bai.muc or '—'}"


# ─────────────────────────── HỌ MOC ───────────────────────────

def render_moc(row: dict, cums: list[dict]) -> str:
    bais = de.bai_moc(row, cums)
    ten_cum = " · ".join(c["cum_ten"] for c in cums)
    r = fm(row) + dau_de(
        row, f"ĐỀ THI {row['moc_ten'].upper()} — MÔN TOÁN — LỚP {row['lop']}",
        "**Ma trận:** Nhận biết 40% · Thông hiểu 30% · Vận dụng 20% · "
        "Vận dụng cao 10%. Học viên nhắm điểm 9 – 10 mới cần làm trọn Bài 5.")
    r.insert(len(fm(row)) + 6, f"Các cụm trong phạm vi: {ten_cum}  ")

    for b in bais:
        bai = b["bai"]
        r += ["", f"### Bài {b['stt']}. ({sv(b['diem'])} điểm — {b['phut']} phút) "
                  f"{b['ten_phan']}", ""]
        if bai.dan:
            r += [bai.dan, ""]
        r += y_de(bai, 6) + [""]

    r += ["", "---", "", "## ĐÁP ÁN VÀ BIỂU ĐIỂM", ""]
    for b in bais:
        bai = b["bai"]
        n = min(6, len(bai.y))
        r += ["", f"### Bài {b['stt']}. ({sv(b['diem'])} điểm — mỗi ý "
                  f"{round(2 / n, 2)} điểm)".replace(".", ","), ""]
        r += y_dap(bai, 6)
        if bai.cac_buoc:
            r += ["", "**Cách giải mẫu:**", ""]
            r += [f"{i + 1}. {x}" for i, x in enumerate(bai.cac_buoc)]
        if bai.loi:
            r += ["", f"*Lỗi hay mắc:* {bai.loi}"]

    r += khoi_phan_tich([{
        "nhan": f"Bài {b['stt']}",
        "do": b["bai"].pt_dang or b["ten_phan"],
        "sai": b["bai"].loi or "Chưa nắm chắc dạng bài này",
        "hoc_lai": _hoc_lai(b["bai"]),
    } for b in bais])
    r += ["", "---", "",
          f"*Đề do bộ sinh GITA biên soạn ngày {NGAY}. Mọi đáp số do mã tính ra. "
          f"Mười đề của cùng một mốc dùng chung một ma trận nên so sánh được với nhau.*"]
    return "\n".join(r) + "\n"


# ─────────────────────────── HỌ ON ───────────────────────────

def render_on(row: dict, cums: list[dict]) -> str:
    kh = de.bai_on(row, cums)
    r = fm(row) + dau_de(
        row, f"PHIẾU ÔN TẬP {row['moc_ten'].upper()} — MÔN TOÁN — LỚP {row['lop']}",
        "**Cách dùng:** làm trọn phiếu này trước kỳ thi mốc một tuần. Phần A và B "
        "làm không nhìn tài liệu; sai chỗ nào thì mở đúng phiếu của cụm ấy ôn lại.")

    # A — bản đồ cụm
    r += ["", "## PHẦN A — BẢN ĐỒ CÁC CỤM TRONG PHẠM VI MỐC · 10 phút · 10 điểm", "",
          "Điền vào bảng. Không nhìn tài liệu.", "",
          "| Cụm | Tên chuyên đề | Nhóm chuyên đề | Một dấu hiệu nhận biết |",
          "|:--:|---|:--:|---|"]
    for c in cums:
        r.append(f"| C{c['cum']:02d} | {c['cum_ten']} | ............ | "
                 f"........................................ |")
    r += ["", f"*Gợi ý chấm: mỗi cụm điền đúng cả hai cột trống được "
             f"{round(10 / max(1, len(cums)), 1)} điểm.*".replace(".", ",")]

    # B — công thức phải thuộc
    r += ["", "## PHẦN B — CÔNG THỨC VÀ QUY TẮC PHẢI THUỘC · 10 phút · 10 điểm", "",
          "Viết lại từ trí nhớ. Mỗi ý bỏ trống là một chỗ phải ôn lại trước khi thi.", ""]
    for i, c in enumerate(cums, 1):
        r += [f"{i}. Chuyên đề **{c['cum_ten']}** — công thức hoặc quy tắc cốt lõi:",
              "   .................................................................",
              "   ................................................................."]

    # C — luyện lại theo từng cụm
    r += ["", "## PHẦN C — LUYỆN LẠI THEO TỪNG CỤM · 30 phút · 35 điểm", ""]
    for i, x in enumerate(kh["C"], 1):
        b = x["bai"]
        r += [f"### Bài {i}. ({round(35 / max(1, len(kh['C'])), 1)} điểm) "
              f"{b.tieu_de} — cụm C{x['cum']['cum']:02d}".replace(".", ","), ""]
        if b.dan:
            r += [b.dan, ""]
        r += y_de(b, 5) + [""]

    # D — liên cụm
    r += ["", "## PHẦN D — BÀI TỔNG HỢP LIÊN CỤM · 25 phút · 30 điểm", "",
          "Mỗi bài dưới đây phải dùng kỹ thuật của **hai chuyên đề khác nhau**.", ""]
    for i, x in enumerate(kh["D"], 1):
        b = x["bai"]
        r += [f"### Bài {i}. ({round(30 / max(1, len(kh['D'])), 1)} điểm) "
              f"{b.tieu_de} — nối nhóm {x['noi'][0]} với nhóm {x['noi'][1]}"
              .replace(".", ","), ""]
        if b.dan:
            r += [b.dan, ""]
        r += y_de(b, 5) + [""]

    # E — phân hoá
    r += ["", "## PHẦN E — BÀI PHÂN HOÁ · 15 phút · 15 điểm", "",
          "Dành cho học viên nhắm điểm 9 – 10. Làm hết phần A đến D rồi mới vào đây.", ""]
    for i, x in enumerate(kh["E"], 1):
        b = x["bai"]
        r += [f"### Bài {i}. ({round(15 / max(1, len(kh['E'])), 1)} điểm — mức "
              f"{x['muc']}) {b.tieu_de}".replace(".", ","), ""]
        if b.dan:
            r += [b.dan, ""]
        r += y_de(b, 4) + [""]

    # đáp án
    r += ["", "---", "", "## ĐÁP ÁN VÀ BIỂU ĐIỂM", "",
          "*Phần A và B chấm theo đối chiếu chương trình — xem lại bản đồ kiến thức "
          "của lớp ở `06-ban-do-kien-thuc/`.*"]
    for nhan, khoa, so_y in (("C", "C", 5), ("D", "D", 5), ("E", "E", 4)):
        r += ["", f"### Phần {nhan}", ""]
        for i, x in enumerate(kh[khoa], 1):
            b = x["bai"]
            r += [f"**Bài {i}.**"] + y_dap(b, so_y)
            if b.cac_buoc and nhan == "E":
                r += ["", "Cách giải mẫu:"] + \
                     [f"{j + 1}. {t}" for j, t in enumerate(b.cac_buoc)]
            r.append("")

    r += khoi_phan_tich(
        [{"nhan": f"C{i}", "do": f"Cụm C{x['cum']['cum']:02d} — {x['cum']['cum_ten']}",
          "sai": x["bai"].loi or "Chưa chắc cụm này",
          "hoc_lai": f"Phiếu `NC` và `OT` của cụm C{x['cum']['cum']:02d}"}
         for i, x in enumerate(kh["C"], 1)]
        + [{"nhan": f"D{i}", "do": f"Nối nhóm {x['noi'][0]} với nhóm {x['noi'][1]}",
            "sai": "Làm được từng chuyên đề riêng nhưng chưa ghép được hai chuyên đề",
            "hoc_lai": "Phần IV và V của phiếu `OT` các cụm liên quan"}
           for i, x in enumerate(kh["D"], 1)]
        + [{"nhan": f"E{i}", "do": x["bai"].pt_dang or "Bài phân hoá",
            "sai": x["bai"].loi or "Chưa đạt mức phân hoá",
            "hoc_lai": _hoc_lai(x["bai"])}
           for i, x in enumerate(kh["E"], 1)])
    r += ["", "---", "",
          f"*Phiếu do bộ sinh GITA biên soạn ngày {NGAY}. Mọi đáp số do mã tính ra.*"]
    return "\n".join(r) + "\n"


# ─────────────────────────── HỌ NL ───────────────────────────

def render_nl(row: dict, cums: list[dict]) -> str:
    kh = de.bai_nl(row, cums)
    r = fm(row) + dau_de(
        row, f"ĐỀ ĐÁNH GIÁ NĂNG LỰC — MÔN TOÁN — LỚP {row['lop']}",
        "**Bám format đề vào lớp 6 các trường chất lượng cao Hà Nội:** phủ rộng "
        "dạng, tốc độ cao, có bài bối cảnh thực tế. Làm phần I trong đúng 20 phút "
        "rồi mới sang phần II — quản được thời gian mới là năng lực đang đo.")

    r += ["", "## PHẦN I — TRẮC NGHIỆM NHANH · 20 câu · 20 phút · 40 điểm", "",
          "Mỗi câu 2 điểm. Chọn một phương án đúng.", ""]
    for i, c in enumerate(kh["I"], 1):
        r += [f"**Câu {i}.** {c['de']}"]
        r += ["   " + "   ".join(f"**{'ABCD'[j]}.** {p}"
                                 for j, p in enumerate(c["pa"])), ""]

    r += ["", "## PHẦN II — TRẢ LỜI NGẮN · 10 câu · 12 phút · 20 điểm", "",
          "Mỗi câu 2 điểm. Chỉ ghi đáp số, không cần trình bày.", ""]
    for i, c in enumerate(kh["II"], 1):
        r += [f"**Câu {i}.** {c['de']}", "   Đáp số: ......................", ""]

    b3 = kh["III"]["bai"]
    r += ["", "## PHẦN III — ĐỌC HIỂU SỐ LIỆU · 8 phút · 10 điểm", ""]
    if b3.dan:
        r += [b3.dan, ""]
    r += y_de(b3, 5) + [""]

    r += ["", "## PHẦN IV — TỰ LUẬN · 15 phút · 20 điểm", "",
          "Trình bày đủ lời giải, không chỉ ghi đáp số.", ""]
    for i, x in enumerate(kh["IV"], 1):
        b = x["bai"]
        r += [f"### Bài {i}. ({round(20 / 3, 1)} điểm) {b.tieu_de}".replace(".", ","), ""]
        if b.dan:
            r += [b.dan, ""]
        r += y_de(b, 3) + [""]

    b5 = kh["V"]["bai"]
    r += ["", "## PHẦN V — BÀI PHÂN HOÁ · 5 phút · 10 điểm", "",
          "Mức đề trường chuyên. Làm xong bốn phần trên rồi mới vào đây.", ""]
    if b5.dan:
        r += [b5.dan, ""]
    r += y_de(b5, 3) + [""]

    # đáp án
    r += ["", "---", "", "## ĐÁP ÁN VÀ BIỂU ĐIỂM", "", "### Phần I — trắc nghiệm", "",
          "| Câu | Đáp án | Câu | Đáp án | Câu | Đáp án | Câu | Đáp án |",
          "|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|"]
    for i in range(0, 20, 4):
        o = kh["I"][i:i + 4]
        r.append("| " + " | ".join(f"{i + j + 1} | **{c['dung']}**"
                                   for j, c in enumerate(o)) + " |")
    r += ["", "*Trả lời đúng cả 20 câu trong 20 phút là mức tốc độ của học viên "
              "nhắm trường top.*"]

    r += ["", "### Phần II — trả lời ngắn", ""]
    for i, c in enumerate(kh["II"], 1):
        r.append(f"{i}. **{c['dap']}**")

    r += ["", "### Phần III — đọc hiểu số liệu", ""] + y_dap(b3, 5)
    r += ["", "### Phần IV — tự luận", ""]
    for i, x in enumerate(kh["IV"], 1):
        b = x["bai"]
        r += [f"**Bài {i}.**"] + y_dap(b, 3)
        if b.cac_buoc:
            r += ["", "Cách giải mẫu:"] + \
                 [f"{j + 1}. {t}" for j, t in enumerate(b.cac_buoc)]
        r.append("")
    r += ["### Phần V — bài phân hoá", ""] + y_dap(b5, 3)
    if b5.cac_buoc:
        r += ["", "Cách giải mẫu:"] + \
             [f"{j + 1}. {t}" for j, t in enumerate(b5.cac_buoc)]

    r += khoi_phan_tich([
        {"nhan": "I", "do": "Tốc độ và độ rộng — 20 dạng trong 20 phút",
         "sai": "Đúng nhưng không kịp giờ là hổng tốc độ, không phải hổng kiến thức",
         "hoc_lai": "Phiếu `KN` của mọi cụm — phần kỹ thuật tính nhanh"},
        {"nhan": "II", "do": "Độ chính xác khi không có phương án gợi ý",
         "sai": "Làm đúng phần I mà sai phần II là đang đoán chứ chưa chắc",
         "hoc_lai": "Phiếu `DB` — đọc vị dạng bài"},
        {"nhan": "III", "do": "Đọc hiểu bảng và biểu đồ",
         "sai": kh["III"]["bai"].loi or "Đọc số trên biểu đồ mà bỏ qua câu hỏi",
         "hoc_lai": "Nhóm chuyên đề **H — Thống kê & Số liệu**"},
        {"nhan": "IV", "do": "Toán điển hình và cách trình bày lời giải",
         "sai": "Ra đúng đáp số nhưng trình bày thiếu bước vẫn mất điểm trong phòng thi",
         "hoc_lai": "Nhóm **D** và phiếu `KN` phần trình bày"},
        {"nhan": "V", "do": "Mức phân hoá của đề trường chuyên",
         "sai": kh["V"]["bai"].loi or "Chưa đạt mức đề chuyên",
         "hoc_lai": "Phiếu `NC` của tuyến 2 và các sơ đồ đọc vị"},
    ])
    r += ["", "---", "",
          f"*Đề do bộ sinh GITA biên soạn ngày {NGAY}. Mọi đáp số do mã tính ra. "
          f"Phương án nhiễu của phần I được dựng từ các lỗi học sinh hay mắc, "
          f"không phải số ngẫu nhiên.*"]
    return "\n".join(r) + "\n"


# ─────────────────────────── CHẠY ───────────────────────────

def main() -> int:
    ap = argparse.ArgumentParser(description="Biên soạn trọn bộ đề thi GITA")
    ap.add_argument("--ghi-de", action="store_true")
    ap.add_argument("--ke-ca-chuan-vang", action="store_true")
    a = ap.parse_args()

    rows = json.loads((GOC / "07-de-thi" / "index-de-thi.json").read_text("utf-8"))
    cums = cum_theo_lop()
    moi = giu = vang = 0
    loi: list[str] = []

    for row in rows:
        p = GOC / "07-de-thi" / THU_MUC[row["ho"]] / f"{row['ma']}.md"
        if row["ma"] in CHUAN_VANG and not a.ke_ca_chuan_vang:
            if p.exists():
                vang += 1
                continue
        if p.exists() and not a.ghi_de:
            giu += 1
            continue

        lop = row["lop"]
        cs = cums[lop]
        if row["ho"] == "NL":
            pv = cs
        else:
            pv = cum_trong_pham_vi(cs, row["moc"])
        if not pv:
            pv = cs[:4]
        row = dict(row)
        if row["ho"] == "MOC":
            row["bien_the_ma"] = row["ma"].rsplit("-", 1)[-1]

        try:
            noi = {"ON": render_on, "MOC": render_moc, "NL": render_nl}[row["ho"]](row, pv)
        except Exception as e:                                     # noqa: BLE001
            loi.append(f"{row['ma']}: {type(e).__name__}: {e}")
            continue
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(noi, encoding="utf-8")
        moi += 1

    X, V = "\033[31m✘\033[0m", "\033[32m✔\033[0m"
    for x in loi[:10]:
        print(f"  {X} {x}")
    print(f"{V if not loi else X} Sinh mới {moi} · giữ nguyên {giu} · "
          f"giữ bản chuẩn vàng {vang} · lỗi {len(loi)}")
    print(f"  Bộ đề nằm tại 07-de-thi/ — {len(rows)} đề theo chỉ mục")
    return 1 if loi else 0


if __name__ == "__main__":
    raise SystemExit(main())
