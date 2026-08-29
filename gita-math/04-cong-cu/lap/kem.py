# -*- coding: utf-8 -*-
"""Lắp hai phiếu đi kèm mỗi cụm chuyên đề.

  GP — Lời giải & Phân tích chuyên sâu: đi kèm **từng** phiếu học, dựng lại đúng
       nội dung phiếu ấy nhờ hạt giống chốt theo mã phiếu.
  HD — Hướng dẫn ôn chắc chuyên đề: mỗi cụm một phiếu, tổng hợp bản đồ chương,
       công thức, bảng dạng bài, lộ trình ôn, checklist, sổ lỗi và tiêu chí đạt.
"""
from __future__ import annotations

import random
import sys
from pathlib import Path

CC = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(CC))
sys.path.insert(0, str(CC / "data"))

from loai_phieu import LOAI                        # noqa: E402
from .meta import ho_so_cum                        # noqa: E402
from .phieu import CHU_Y, _hat, _yv, dung          # noqa: E402

CHAN = ["**Người biên soạn:** Ban chuyên môn Học viện GITA",
        "**Phiên bản:** 2.0 · Chuẩn biên soạn phiếu GITA v2.0 · "
        "Đáp số do bộ sinh nội dung GITA tính, đã đối chiếu tự động."]


def _o(v: str) -> str:
    """Ô bảng Markdown an toàn: gạch đứng và xuống dòng đều bị thay."""
    return str(v).replace("|", "∣").replace("\n", " ").strip()


def _fm(row: dict, them: dict | None = None) -> str:
    d = {"ma": row["ma"], "tuyen": row["tuyen"], "lop": row["lop"],
         "cum": row["cum"], "cum_ten": row["cum_ten"], "loai": row["loai"],
         "loai_ten": row["loai_ten"], "nhom_ma": row["nhom_ma"],
         "nhom_ten": row["nhom_ten"], "ten": row["ten"],
         "hoc_ky": row["hoc_ky"], "tuan": row["tuan"]}
    d.update(them or {})
    return "\n".join(["---"] + [f"{k}: {_yv(v)}" for k, v in d.items()] + ["---"])


def _dau(row: dict, phu: str) -> list[str]:
    return [f"# {row['loai_ten'].upper()} · {row['ma']}", "",
            "**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · "
            "*Tư duy xuất sắc, Bản lĩnh dẫn đầu* · gita.edu.vn",
            f"{row['tuyen_ten']} · Lớp {row['lop']} · Tuần {row['tuan']} · {row['hoc_ky']}",
            f"**Cụm chuyên đề C{row['cum']:02d} — {row['cum_ten']}**",
            f"Nhóm chuyên đề **{row['nhom_ma']} — {row['nhom_ten']}**", phu, "", "---", ""]


# ══════════════════════════════ PHIẾU GP ══════════════════════════════

def render_gp(row_gp: dict, row_hoc: dict) -> str:
    n = dung(row_hoc)
    phan, bay = n["phan"], n["bay"]
    khung = LOAI[row_hoc["loai"]]["cau_truc"]
    nhan = [x[0] for x in khung]

    L = [_fm(row_gp, {"kem_theo": row_gp["kem_theo"]}), ""]
    L += _dau(row_gp,
              f"Phiếu này đi kèm **{row_gp['kem_theo']}**. "
              f"Dành cho học viên **sau khi đã làm xong** phiếu ấy.")

    L += ["## 1. ĐÁP SỐ TỪNG Ý", "",
          "Tự chấm trước, đọc lời giải sau. Mỗi ý đúng được tính điểm như nhau "
          "trong cùng một bài.", ""]
    for i, p in enumerate(phan):
        L += [f"**Phần {nhan[i]}**", ""]
        for j, b in enumerate(p):
            dap = " · ".join(f"{CHU_Y[k]}) {d}" for k, (_x, d) in enumerate(b.y))
            L.append(f"- **Bài {nhan[i]}.{j + 1}** — {dap}")
        L.append("")

    L += ["---", "", "## 2. LỜI GIẢI ĐẦY ĐỦ", "",
          "Đọc kĩ phần chữ đậm: đó là câu cần nhớ, không phải con số.", ""]
    for i, p in enumerate(phan):
        for j, b in enumerate(p):
            hg = b.huong_giai
            if (i, j) in bay:
                hg = f"**BẪY — {bay[(i, j)]}.** {hg}"
            L += [f"### Bài {nhan[i]}.{j + 1} — {b.tieu_de}", "", hg, "",
                  f"*Điểm chốt:* {b.diem_chot}", ""]

    L += ["---", "", "## 3. BẢNG PHÂN TÍCH CHUYÊN SÂU", "",
          "Sáu cột dưới đây là bộ khung đọc vị mọi đề bài. Học thuộc **cách đọc "
          "bảng**, đừng học thuộc từng dòng.", "",
          "| Bài | Dạng bài | Kiến thức liên quan | Dữ liệu nhận biết | "
          "Phương pháp áp dụng | Cách xử lý nhanh nhất | Kết quả |",
          "|---|---|---|---|---|---|---|"]
    for i, p in enumerate(phan):
        for j, b in enumerate(p):
            L.append(f"| {nhan[i]}.{j + 1} | {_o(b.pt_dang)} | {_o(b.pt_kien_thuc)} | "
                     f"{_o(b.pt_du_lieu)} | {_o(b.pt_phuong_phap)} | "
                     f"{_o(b.pt_nhanh)} | {_o(b.pt_ket_qua)} |")

    L += ["", "---", "", "## 4. NHÃN TƯ DUY VÀ ĐIỂM CHỐT", "",
          "| Bài | Nhãn tư duy | Điểm chốt |", "|---|---|---|"]
    for i, p in enumerate(phan):
        for j, b in enumerate(p):
            L.append(f"| {nhan[i]}.{j + 1} | {', '.join(b.td)} | {_o(b.diem_chot)} |")

    L += ["", "---", "", "## 5. LỖI THƯỜNG GẶP VÀ CÁCH PHÒNG", "",
          "Chép cả hai cột vào sổ lỗi. Chỉ chép cột trái là vô ích.", "",
          "| Bài | Lỗi thường gặp | Cách phòng |", "|---|---|---|"]
    for i, p in enumerate(phan):
        for j, b in enumerate(p):
            L.append(f"| {nhan[i]}.{j + 1} | {_o(b.loi)} | {_o(b.phong)} |")

    L += ["", "---", "", "## 6. GỢI Ý BA TẦNG", "",
          "Đọc tầng 1 trước; chỉ đọc tầng sau khi đã thử lại ít nhất 3 phút.", ""]
    for i, p in enumerate(phan):
        for j, b in enumerate(p):
            if not b.goi_y:
                continue
            L += [f"**Bài {nhan[i]}.{j + 1}** — (1) {b.goi_y[0]} — (2) {b.goi_y[1]} — "
                  f"(3) {b.goi_y[2]}"]
    L.append("")

    L += ["---", "", "## 7. BÀI TƯƠNG TỰ TỰ LUYỆN", "",
          "Làm lại vào vở, che cột đáp số. Đúng cả 25 bài mới coi là đã chắc.", "",
          "| Bài | Đề tương tự | Đáp số |", "|---|---|---|"]
    for i, p in enumerate(phan):
        for j, b in enumerate(p):
            L.append(f"| {nhan[i]}.{j + 1} | {_o(b.tuong_tu[0])} | {_o(b.tuong_tu[1])} |")

    L += ["", "---", ""] + CHAN + [""]
    return "\n".join(L).rstrip() + "\n"


# ══════════════════════════════ PHIẾU HD ══════════════════════════════

BUOI_TEN = {"LT": "Lý thuyết", "DB": "Dạng bài & Đọc vị", "KN": "Kỹ năng & Phương pháp",
            "NC": "Luyện nâng cao", "OT": "Ôn thi", "TH": "Thi chương"}


def render_hd(row: dict) -> str:
    rng = random.Random(_hat(row["ma"]))
    hs = ho_so_cum(rng, row["nhom_ma"], row["lop"], so=14)
    dang = row.get("dang_bai") or [row["cum_ten"]]
    ma_cum = f"GITA-{row['tuyen']}-L{row['lop']}-C{row['cum']:02d}"

    L = [_fm(row), ""]
    L += _dau(row, "Phiếu này dùng để **tự ôn chắc cả cụm** sau khi đã học xong "
                   "sáu buổi. Không cần giáo viên nhắc.")

    L += ["## 1. BẢN ĐỒ CHƯƠNG", "",
          "```", "CỤM " + f"C{row['cum']:02d} — {row['cum_ten']}"]
    for i, d in enumerate(dang):
        nhanh = "└──" if i == len(dang) - 1 else "├──"
        L.append(f"{nhanh} {d}")
    L += ["```", "",
          "| Buổi | Loại phiếu | Mã phiếu | Sản phẩm phải có sau buổi |", "|:--:|---|---|---|"]
    sp = {"LT": "Sơ đồ tư duy chương tự vẽ",
          "DB": "Bảng dạng bài — dấu hiệu điền đủ",
          "KN": "Sổ lỗi và kịch bản thuyết trình",
          "NC": "Bài IV, V đã chữa và ghi lỗi",
          "OT": "Điểm bài ôn và bảng phân tích lỗi",
          "TH": "Điểm bài thi chương"}
    for i, k in enumerate(["LT", "DB", "KN", "NC", "OT", "TH"], 1):
        L.append(f"| {i} | {BUOI_TEN[k]} | `{ma_cum}-{k}` | {sp[k]} |")

    L += ["", "---", "", "## 2. BẢNG CÔNG THỨC VÀ QUY TẮC PHẢI THUỘC", "",
          "Học thuộc theo cặp **dạng bài – công thức**, không học rời.", "",
          "| # | Dùng cho dạng bài | Công thức hoặc quy tắc |", "|---:|---|---|"]
    thay = set()
    n = 0
    for b in hs:
        if b.pt_kien_thuc in thay:
            continue
        thay.add(b.pt_kien_thuc)
        n += 1
        L.append(f"| {n} | {_o(b.pt_dang)} | {_o(b.pt_kien_thuc)} |")

    L += ["", "---", "", "## 3. BẢNG DẠNG BÀI VÀ DẤU HIỆU NHẬN BIẾT", "",
          "| Dạng bài | Dữ liệu nhận biết | Phương pháp áp dụng | Cách xử lý nhanh nhất |",
          "|---|---|---|---|"]
    thay = set()
    for b in hs:
        if b.pt_dang in thay:
            continue
        thay.add(b.pt_dang)
        L.append(f"| {_o(b.pt_dang)} | {_o(b.pt_du_lieu)} | {_o(b.pt_phuong_phap)} | "
                 f"{_o(b.pt_nhanh)} |")

    L += ["", "---", "", "## 4. LỘ TRÌNH ÔN BỐN BUỔI", "",
          "| Buổi ôn | Việc làm | Thời lượng | Sản phẩm |", "|:--:|---|:--:|---|",
          f"| 1 | Đọc lại bản đồ chương ở mục 1, tự vẽ lại sơ đồ tư duy cụm "
          f"C{row['cum']:02d} mà không nhìn phiếu | 45 phút | Sơ đồ tư duy tự vẽ |",
          "| 2 | Học thuộc bảng công thức mục 2, kiểm tra chéo trong nhóm hai bạn "
          "| 45 phút | Đọc thuộc không nhìn |",
          f"| 3 | Làm lại phiếu `{ma_cum}-NC` phần IV và V, chấm bằng phiếu "
          f"`{ma_cum}-NC-GP` | 60 phút | Sổ lỗi cập nhật |",
          f"| 4 | Làm lại phiếu `{ma_cum}-TH` trong đúng 90 phút, tự chấm | 90 phút "
          f"| Điểm và bảng phân tích lỗi |"]

    L += ["", "---", "", "## 5. CHECKLIST TỰ KIỂM", "",
          "Trả lời được ngay trong 10 giây thì đánh ✔. Phải nghĩ lâu thì đánh ✘ và "
          "làm lại phần tương ứng.", ""]
    k = 0
    for b in hs:
        for cau in (f"Em nêu được dấu hiệu nhận biết của dạng “{b.pt_dang}” chứ?",
                    f"Em nhớ công thức: {b.pt_kien_thuc}?"):
            k += 1
            L.append(f"- [ ] **{k}.** {cau}")
        if k >= 20:
            break
    L += ["", f"**Chuẩn đạt:** ✔ từ {max(1, int(k * 0.9))}/{k} câu trở lên.", ""]

    L += ["---", "", "## 6. SỔ LỖI MẪU", "",
          "Đây là những lỗi học viên khoá trước mắc nhiều nhất ở cụm này. "
          "Chép vào sổ lỗi của em, kèm cột cách phòng.", "",
          "| # | Lỗi thường gặp | Cách phòng |", "|---:|---|---|"]
    thay = set()
    n = 0
    for b in hs:
        if b.loi in thay:
            continue
        thay.add(b.loi)
        n += 1
        L.append(f"| {n} | {_o(b.loi)} | {_o(b.phong)} |")

    L += ["", "---", "", "## 7. TIÊU CHÍ ÔN CHẮC", "",
          "Cụm này chỉ được coi là **đã ôn chắc** khi đủ cả bốn điều kiện sau.", "",
          "| # | Tiêu chí | Ngưỡng đạt |", "|---:|---|---|",
          f"| 1 | Điểm phiếu thi chương `{ma_cum}-TH` | ≥ 80/100 |",
          "| 2 | Checklist tự kiểm ở mục 5 | ≥ 90% số câu đánh ✔ |",
          "| 3 | Bảng công thức mục 2 | Đọc thuộc, không nhìn sách |",
          "| 4 | Sổ lỗi | Mỗi lỗi ở mục 6 đều có một dòng cách phòng do em tự viết |",
          "",
          "Chưa đạt thì **học lại phiếu `" + ma_cum + "-NC`** và làm bài tương tự "
          "trong phiếu `" + ma_cum + "-NC-GP`, chưa mở cụm mới.", "",
          "---", ""] + CHAN + [""]
    return "\n".join(L).rstrip() + "\n"
