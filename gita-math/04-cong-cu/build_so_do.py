#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh 24 SƠ ĐỒ ĐỌC VỊ ĐỀ BÀI (8 nhóm chuyên đề × 3 lớp).

Cây quyết định do người biên soạn viết (04-cong-cu/data/so_do_doc_vi.py);
bảng dấu hiệu và bộ đề luyện đọc vị được rút thẳng từ thư viện 229 mẫu bài,
nên sơ đồ luôn khớp với đề thật mà học viên đang làm.

    python3 04-cong-cu/build_so_do.py
Đầu ra: 10-so-do-doc-vi/so-do-{nhóm}-L{lớp}.md
"""
from __future__ import annotations

import random
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu"))
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))

from nhom_chuyen_de import NHOM, TU_DUY            # noqa: E402
from so_do_doc_vi import CAU_MO, CAY, CHOT, DOC_NHAM  # noqa: E402
import sinh                                        # noqa: E402
from sinh import KHO                               # noqa: E402

OUT = ROOT / "10-so-do-doc-vi"
MUC = ("M1", "M2", "M3", "M4", "M5")
MUC_TEN = {"M1": "Nhận biết", "M2": "Thông hiểu", "M3": "Vận dụng",
           "M4": "Vận dụng cao", "M5": "Sáng tạo · vượt ngưỡng"}


def o(v: str) -> str:
    return str(v).replace("|", "∣").replace("\n", " ").strip()


def cay_ascii(g: str) -> list[str]:
    """Cây quyết định vẽ bằng kí tự, đọc từ trên xuống."""
    L = ["```", f"ĐỌC ĐỀ  ─►  {CAU_MO[g].replace('**', '')}", "│"]
    for i, (hoi, dung, sai) in enumerate(CAY[g]):
        cuoi = i == len(CAY[g]) - 1
        L.append(("└─ " if cuoi else "├─ ") + f"{i + 1}. {hoi.replace('**', '')}")
        doc = "   " if cuoi else "│  "
        L.append(f"{doc}   ├─ ĐÚNG  {dung.replace(chr(42) * 2, '').lstrip('→ ')}")
        L.append(f"{doc}   └─ SAI   " + sai.replace("**", ""))
        if not cuoi:
            L.append("│")
    L += ["", "Gọi tên được dạng bài rồi, hỏi tiếp ba câu chốt:"]
    for i, c in enumerate(CHOT, 1):
        L.append(f"   {i}. {c.replace('**', '')}")
    L.append("```")
    return L


def mau_cua(g: str, lop: int) -> dict[str, list]:
    return {m: [x for x in KHO.get(g, {}).get(m, []) if lop in x.lop] for m in MUC}


def bang_dau_hieu(g: str, lop: int, rng) -> list[str]:
    L = ["| Mức | Dấu hiệu nhìn thấy trong đề | Dạng bài | Phương pháp | Lối tắt | Bẫy |",
         "|:--:|---|---|---|---|---|"]
    thay = set()
    for m in MUC:
        for x in mau_cua(g, lop)[m]:
            b = x.tao(rng, lop)
            if b.pt_dang in thay:
                continue
            thay.add(b.pt_dang)
            L.append(f"| {m} | {o(b.pt_du_lieu)} | {o(b.pt_dang)} | "
                     f"{o(b.pt_phuong_phap)} | {o(b.pt_nhanh)} | {o(b.bay) or '—'} |")
    return L


def de_luyen(g: str, lop: int, rng, so: int = 10) -> list[str]:
    """Bộ đề luyện đọc vị: cho đề, hỏi dạng bài và dấu hiệu — không phải giải."""
    kho = [x for m in MUC for x in mau_cua(g, lop)[m]]
    rng.shuffle(kho)
    L = ["Với mỗi đề dưới đây, **không giải**. Chỉ trả lời hai câu: "
         "đây là dạng bài gì, và dấu hiệu nào cho biết điều đó.", ""]
    dap = ["| # | Dạng bài | Dấu hiệu |", "|:--:|---|---|"]
    for i, x in enumerate(kho[:so], 1):
        b = x.tao(rng, lop)
        de = ((b.dan + " ") if b.dan else "") + b.y[0][0]
        L.append(f"**Đề {i}.** {de}")
        L.append("")
        L.append("- Dạng bài: ...........................................  "
                 "Dấu hiệu: ...........................................")
        L.append("")
        dap.append(f"| {i} | {o(b.pt_dang)} | {o(b.pt_du_lieu)} |")
    return L + ["---", "", "### Đáp án phần luyện đọc vị", ""] + dap


def sinh_mot(g: str, lop: int) -> str:
    rng = random.Random(hash((g, lop)) % 99_991)
    n = NHOM[g]
    td = " · ".join(f"**{t}** {TU_DUY.get(t, '')}" for t in n["td"])
    L = [f"# SƠ ĐỒ ĐỌC VỊ ĐỀ BÀI — NHÓM {g} · LỚP {lop}", "",
         "**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · "
         "*Tư duy xuất sắc, Bản lĩnh dẫn đầu* · gita.edu.vn",
         f"Nhóm chuyên đề **{g} — {n['ten']}** · Lớp {lop}",
         f"Năng lực tư duy chính: {td}", "",
         "> **Đọc vị là gì.** Là trả lời xong năm câu hỏi *trước khi* đặt bút tính: "
         "đề nói về cái gì · dấu hiệu nào · kiến thức nào · phương pháp nào · "
         "lối tắt và bẫy ở đâu. Học sinh giỏi không giải nhanh hơn — họ **nhận ra "
         "dạng bài nhanh hơn**.", "",
         f"**Phạm vi nhóm này:** {n['mo_ta']}", "", "---", "",
         "## 1. CÂY QUYẾT ĐỊNH ĐỌC VỊ", "",
         "Đọc từ trên xuống, dừng lại ở câu hỏi đầu tiên trả lời **ĐÚNG**.", ""]
    L += cay_ascii(g)
    L += ["", "---", "", "## 2. BẢNG DẤU HIỆU — DẠNG BÀI — PHƯƠNG PHÁP", "",
          "Bảng này rút thẳng từ ngân hàng mẫu bài của nhóm, đúng phạm vi lớp "
          f"{lop}. Học **theo hàng ngang**: mỗi hàng đọc thành một câu có nghĩa "
          "từ đề bài tới lời giải.", ""]
    L += bang_dau_hieu(g, lop, rng)
    L += ["", "---", "", "## 3. TÁM CẶP CHỮ DỄ ĐỌC NHẦM", "",
          "Đọc sai một chữ là đi sai cả bài. Học thuộc tám cặp này.", "",
          "| Cặp chữ dễ nhầm | Khác nhau ở chỗ |", "|---|---|"]
    for cap, khac in DOC_NHAM:
        L.append(f"| {o(cap)} | {o(khac)} |")
    L += ["", "---", "", "## 4. LUYỆN ĐỌC VỊ — 10 ĐỀ, KHÔNG GIẢI", ""]
    L += de_luyen(g, lop, rng)
    L += ["", "---", "", "## 5. TỰ KIỂM — ĐÃ ĐỌC VỊ CHẮC CHƯA", "",
          "| # | Tiêu chí | Đạt khi |", "|:--:|---|---|",
          "| 1 | Gọi tên dạng bài | Trong 10 giây kể từ khi đọc xong đề |",
          "| 2 | Chỉ ra dấu hiệu | Gạch chân được đúng cụm từ trong đề |",
          "| 3 | Nêu phương pháp | Nói được các bước trước khi tính |",
          "| 4 | Nhớ bẫy | Kể được ít nhất một bẫy của dạng ấy |",
          "| 5 | Bộ 10 đề ở mục 4 | Đúng từ 9/10 dạng bài trở lên |", "",
          "Chưa đạt tiêu chí 5 thì đọc lại mục 2 và làm lại mục 4 với bộ đề khác.",
          "", "---", "",
          "**Người biên soạn:** Ban chuyên môn Học viện GITA",
          "**Phiên bản:** 2.0 · Cây quyết định do người viết, bảng dấu hiệu do bộ "
          "sinh nội dung rút từ ngân hàng mẫu bài.", ""]
    return "\n".join(L)


def main() -> None:
    OUT.mkdir(exist_ok=True)
    n = 0
    for g in "ABCDEFGH":
        for lop in (3, 4, 5):
            (OUT / f"so-do-{g}-L{lop}.md").write_text(sinh_mot(g, lop), encoding="utf-8")
            n += 1
    print(f"✔ Đã sinh {n} sơ đồ đọc vị vào {OUT.relative_to(ROOT)}/")
    print(f"  {len(CAY)} cây quyết định · {sum(len(v) for v in CAY.values())} nút · "
          f"{len(DOC_NHAM)} cặp chữ dễ đọc nhầm")


if __name__ == "__main__":
    main()
