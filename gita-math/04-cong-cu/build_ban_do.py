#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh 9 BẢN ĐỒ TỔNG HỢP KIẾN THỨC (3 lớp × {HK1, HK2, CẢ NĂM}).

Mỗi bản đồ gồm: sơ đồ cây kiến thức · bảng mạch kiến thức nối sang mã phiếu
Tuyến 1 / Tuyến 2 · bảng công thức phải thuộc · bảng lỗi kinh điển ·
checklist tự kiểm · mốc kiểm tra của kỳ.
"""
from __future__ import annotations
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))
from nhom_chuyen_de import NHOM              # noqa: E402
from ban_do_kien_thuc import BAN_DO, TU_KHOA  # noqa: E402

OUT = ROOT / "06-ban-do-kien-thuc"
INDEX = ROOT / "02-chi-muc" / "index-master.json"
KY_TEN = {"HK1": "HỌC KỲ I", "HK2": "HỌC KỲ II", "CA-NAM": "CẢ NĂM"}
MOC = {"HK1": ["Giữa kỳ I (sau phiếu P027)", "Cuối kỳ I (sau phiếu P054)"],
       "HK2": ["Giữa kỳ II (sau phiếu P078)", "Cuối kỳ II (sau phiếu P100)"]}


def phieu_cua(rows, lop, tuyen, mach, ky, ky_goc):
    """Phiếu ôn lại cho một mạch: lọc theo nhóm chuyên đề, rồi lọc tiếp theo từ
    khoá nếu mạch đó dùng chung nhóm với mạch khác. Không có phiếu khớp từ khoá
    thì trả về toàn bộ phiếu của nhóm để huấn luyện viên vẫn có chỗ tra."""
    nhom_phieu = [r for r in rows if r["lop"] == lop and r["tuyen"] == tuyen
                  and r["nhom_ma"] == mach["nhom"]
                  and (ky == "CA-NAM" or r["hoc_ky"] == ky)]
    tk = TU_KHOA.get((lop, ky_goc, mach["ten"]))
    if not tk:
        return nhom_phieu
    loc = [r for r in nhom_phieu
           if any(t in r["ten_phieu"].lower() for t in tk)]
    return loc or nhom_phieu


def cay_kien_thuc(mach) -> list[str]:
    L = ["```", "KIẾN THỨC"]
    for i, (m, _) in enumerate(mach):
        nhanh = "└──" if i == len(mach) - 1 else "├──"
        noi = "   " if i == len(mach) - 1 else "│  "
        L.append(f"{nhanh} [{m['nhom']}] {m['ten']}")
        for j, c in enumerate(m["cot_loi"]):
            la = "└─" if j == len(m["cot_loi"]) - 1 else "├─"
            L.append(f"{noi} {la} {c}")
    L.append("```")
    return L


def sinh(lop: int, ky: str, rows) -> str:
    if ky == "CA-NAM":
        mach = [(m, "HK1") for m in BAN_DO[(lop, "HK1")]] + \
               [(m, "HK2") for m in BAN_DO[(lop, "HK2")]]
    else:
        mach = [(m, ky) for m in BAN_DO[(lop, ky)]]
    L = [f"# BẢN ĐỒ TỔNG HỢP KIẾN THỨC — LỚP {lop} — {KY_TEN[ky]}", "",
         "**HỌC VIỆN GITA** · *Tư duy xuất sắc, Bản lĩnh dẫn đầu*", "",
         f"- Số mạch kiến thức: **{len(mach)}**",
         f"- Phạm vi phiếu: " + ("**P001 – P100 (cả năm)**" if ky == "CA-NAM"
                                 else ("**P001 – P054**" if ky == "HK1" else "**P055 – P100**")),
         "- Cách dùng: treo tường hoặc dán vào trang đầu vở. Trước mỗi mốc kiểm tra,",
         "  học sinh tự đánh dấu ✔ vào mạch đã chắc, ✘ vào mạch còn yếu, rồi làm lại",
         "  đúng những phiếu được liệt kê ở cột **Phiếu ôn lại**.", ""]
    if ky != "CA-NAM":
        L += ["**Mốc kiểm tra của kỳ này:** " + " · ".join(MOC[ky]), ""]
    L += ["---", "", "## 1. CÂY KIẾN THỨC", ""] + cay_kien_thuc(mach)

    L += ["", "---", "", "## 2. MẠCH KIẾN THỨC NỐI SANG HỆ THỐNG PHIẾU", ""]
    for i, (m, kg) in enumerate(mach, 1):
        t1 = phieu_cua(rows, lop, "T1", m, ky, kg)
        t2 = phieu_cua(rows, lop, "T2", m, ky, kg)
        L += [f"### {i}. {m['ten']}  ·  nhóm **{m['nhom']} — {NHOM[m['nhom']]['ten']}**", "",
              "**Nội dung cốt lõi:** " + " · ".join(m["cot_loi"]), "",
              "| | Mã phiếu ôn lại |", "|---|---|",
              "| Tuyến 1 | " + (", ".join(f"`{r['ma_phieu'][-4:]}`" for r in t1) or "—") + " |",
              "| Tuyến 2 | " + (", ".join(f"`{r['ma_phieu'][-4:]}`" for r in t2) or "—") + " |",
              ""]
    L += [f"> Mã phiếu viết tắt: `P0xx` thuộc khối `GITA-T1-L{lop}` hoặc `GITA-T2-L{lop}`.",
          "> Khi một mạch không có phiếu nào khớp từ khoá trong kỳ này, bảng liệt kê "
          "toàn bộ phiếu cùng nhóm chuyên đề của kỳ để huấn luyện viên tự chọn.", ""]

    L += ["---", "", "## 3. CÔNG THỨC VÀ QUY TẮC PHẢI THUỘC", "",
          "| # | Mạch | Phải thuộc lòng |", "|---:|---|---|"]
    n = 0
    for m, _ in mach:
        for ct in m["phai_thuoc"]:
            n += 1
            L.append(f"| {n} | {m['ten']} | {ct} |")

    L += ["", "---", "", "## 4. LỖI KINH ĐIỂN — ĐỌC TRƯỚC MỖI KỲ THI", "",
          "| Mạch | Lỗi thường mắc |", "|---|---|"]
    for m, _ in mach:
        for e in m["loi"]:
            L.append(f"| {m['ten']} | {e} |")

    L += ["", "---", "", "## 5. CHECKLIST TỰ KIỂM — “EM ĐÃ CHẮC CHƯA?”", "",
          "Trả lời được ngay trong 10 giây thì đánh ✔. Nếu phải nghĩ lâu, đánh ✘",
          "và làm lại các phiếu ở mục 2.", ""]
    k = 0
    for m, _ in mach:
        for q in m["tu_kiem"]:
            k += 1
            L.append(f"- [ ] **{k}.** ({m['ten']}) {q}")
    L += ["", f"**Chuẩn đạt:** ✔ từ {int(k*0.9)}/{k} câu trở lên mới được coi là "
          f"vững kiến thức {KY_TEN[ky].lower()}.", ""]

    L += ["---", "", "## 6. LỘ TRÌNH ÔN THEO BẢN ĐỒ (4 BUỔI)", "",
          "| Buổi | Việc làm | Sản phẩm |", "|:--:|---|---|",
          "| 1 | Đọc cây kiến thức, tự chấm checklist mục 5 | Danh sách mạch còn ✘ |",
          "| 2 | Làm lại các phiếu ở mục 2 ứng với mạch ✘ | Sổ lỗi cập nhật |",
          "| 3 | Học thuộc bảng công thức mục 3, kiểm tra chéo trong team | Bảng công thức không nhìn sách |",
          "| 4 | Làm 1 đề trong bộ đề mốc tương ứng (`07-de-thi/`) | Điểm và bảng phân tích lỗi |", ""]
    return "\n".join(L) + "\n"


def main() -> None:
    OUT.mkdir(exist_ok=True)
    rows = json.loads(INDEX.read_text(encoding="utf-8"))
    n = 0
    for lop in (3, 4, 5):
        for ky in ("HK1", "HK2", "CA-NAM"):
            (OUT / f"ban-do-L{lop}-{ky}.md").write_text(sinh(lop, ky, rows), encoding="utf-8")
            n += 1
    print(f"✔ Đã sinh {n} bản đồ kiến thức vào {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
