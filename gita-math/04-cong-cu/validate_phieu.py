#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Kiểm định phiếu GITA theo CHUẨN BIÊN SOẠN PHIẾU v1.0.

  python3 04-cong-cu/validate_phieu.py 03-phieu/T2/L5/GITA-T2-L5-P013.md
  python3 04-cong-cu/validate_phieu.py --all

Trả mã thoát 0 nếu mọi phiếu đạt chuẩn, 1 nếu có lỗi.
"""
from __future__ import annotations
import argparse, json, re, sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))
from loai_phieu import LOAI  # noqa: E402
INDEX = ROOT / "02-chi-muc" / "index-master.json"
MOC_DAP_AN = "## HƯỚNG DẪN GIẢI VÀ ĐÁP ÁN"

SO_PHAN = 5
SO_BAI_MOI_PHAN = 5
Y_MIN, Y_MAX = 4, 10
Y_TONG_MIN, Y_TONG_MAX = 115, 170
TRUONG_BAT_BUOC = ["ma", "tuyen", "lop", "cum", "cum_ten", "buoi_trong_cum", "loai",
                   "nhom_ma", "ten", "stt", "hoc_ky", "tuan", "thoi_luong_phut",
                   "thang_diem", "muc_tieu_G", "dong_luc_I", "tai_nang_T", "hanh_dong_A"]
LOAI_CO_PHIEU_HOC = ["LT", "DB", "KN", "NC", "OT", "TH", "MOC"]
TU_CAM_THCS = ["phương trình", "ẩn số", "biến số", "hàm số", "tập hợp con",
               "căn bậc hai", "số âm", "đa thức", "bất phương trình"]

RE_PHAN = re.compile(r"^##\s+PHẦN\s+([A-EIVX]+)\b", re.M)
RE_BAI = re.compile(r"^###\s+Bài\s+(\d+)\.", re.M)
RE_Y = re.compile(r"^\s{0,3}([a-zk-z])\)\s", re.M)
RE_DA_BAI = re.compile(r"^###\s+Bài\s+([A-EIVX]+)\.(\d+)", re.M)


class Ket_qua:
    def __init__(self, ten: str):
        self.ten, self.loi, self.canh_bao = ten, [], []

    def E(self, m: str): self.loi.append(m)
    def W(self, m: str): self.canh_bao.append(m)
    @property
    def dat(self) -> bool: return not self.loi


def tach_front_matter(text: str):
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, text
    return yaml.safe_load(text[3:end]), text[end + 4:]


def kiem_tra(path: Path, index: dict | None) -> Ket_qua:
    kq = Ket_qua(path.name)
    text = path.read_text(encoding="utf-8")
    fm, than = tach_front_matter(text)

    # --- 16. Front-matter ---
    if fm is None:
        kq.E("Thiếu front-matter YAML ở đầu tệp.")
        fm = {}
    for t in TRUONG_BAT_BUOC:
        if t not in fm or fm[t] in (None, ""):
            kq.E(f"Front-matter thiếu trường bắt buộc: `{t}`.")
    if fm.get("thoi_luong_phut") not in (None, 90):
        kq.E("`thoi_luong_phut` phải bằng 90.")
    if fm.get("thang_diem") not in (None, 100):
        kq.E("`thang_diem` phải bằng 100.")
    loai = fm.get("loai")
    if loai not in LOAI_CO_PHIEU_HOC:
        kq.E(f"`loai` = {loai!r} không phải loại phiếu học "
             f"({', '.join(LOAI_CO_PHIEU_HOC)}).")
    khung = LOAI.get(loai, LOAI["NC"])["cau_truc"]
    NHAN_PHAN = [x[0] for x in khung]
    PHUT_PHAN = [x[2] for x in khung]
    DIEM_PHAN = [x[3] for x in khung]

    ma = fm.get("ma")
    if ma and index is not None:
        if ma not in index:
            kq.E(f"`{ma}` không có trong 02-chi-muc/index-master.json.")
        else:
            ref = index[ma]
            for t in ("tuyen", "lop", "cum", "loai", "nhom_ma", "hoc_ky", "tuan", "stt"):
                if t in fm and fm[t] != ref[t]:
                    kq.E(f"Front-matter `{t}` = {fm[t]!r} lệch với chỉ mục ({ref[t]!r}).")
            if fm.get("ten") != ref["ten"]:
                kq.W(f"`ten` khác chỉ mục:\n      phiếu : {fm.get('ten')}"
                     f"\n      chỉ mục: {ref['ten']}")
    if ma and ma != path.stem:
        kq.E(f"Tên tệp `{path.stem}` không khớp `ma_phieu` = `{ma}`.")

    # --- Tách phần đề / phần đáp án ---
    if MOC_DAP_AN not in than:
        kq.E(f"Thiếu mục đáp án — phải có dòng `{MOC_DAP_AN}`.")
        de, da = than, ""
    else:
        de, da = than.split(MOC_DAP_AN, 1)

    # --- 1. Đủ 5 phần ---
    phan_pos = [m.start() for m in RE_PHAN.finditer(de)]
    if len(phan_pos) != SO_PHAN:
        kq.E(f"Phải có đúng {SO_PHAN} phần `## PHẦN …`, đang có {len(phan_pos)}.")
    nhan_thay = RE_PHAN.findall(de)
    if nhan_thay and nhan_thay != NHAN_PHAN[:len(nhan_thay)]:
        kq.E(f"Nhãn các phần phải là {' → '.join(NHAN_PHAN)} theo loại phiếu "
             f"`{loai}`, đang là {' → '.join(nhan_thay)}.")

    # --- 2. Mỗi phần 5 bài, mỗi bài 4–10 ý ---
    tong_y = 0
    ranh = phan_pos + [len(de)]
    for i in range(len(phan_pos)):
        khoi = de[ranh[i]:ranh[i + 1]]
        tieu_de_phan = khoi.splitlines()[0]
        bai_pos = [m.start() for m in RE_BAI.finditer(khoi)]
        if len(bai_pos) != SO_BAI_MOI_PHAN:
            kq.E(f"Phần {i+1}: phải có {SO_BAI_MOI_PHAN} bài, đang có {len(bai_pos)}.")
        # điểm & thời gian ghi trên tiêu đề phần
        if i < len(DIEM_PHAN):
            if f"{DIEM_PHAN[i]} điểm" not in tieu_de_phan:
                kq.E(f"Phần {i+1}: tiêu đề phải ghi `{DIEM_PHAN[i]} điểm`.")
            if f"{PHUT_PHAN[i]} phút" not in tieu_de_phan:
                kq.E(f"Phần {i+1}: tiêu đề phải ghi `{PHUT_PHAN[i]} phút`.")
        rb = bai_pos + [len(khoi)]
        for j in range(len(bai_pos)):
            than_bai = khoi[rb[j]:rb[j + 1]]
            n_y = len(RE_Y.findall(than_bai))
            tong_y += n_y
            if not (Y_MIN <= n_y <= Y_MAX):
                kq.E(f"Phần {i+1} – Bài {j+1}: có {n_y} ý, phải trong khoảng "
                     f"{Y_MIN}–{Y_MAX}.")
    if not (Y_TONG_MIN <= tong_y <= Y_TONG_MAX):
        kq.E(f"Tổng số ý = {tong_y}, phải trong khoảng {Y_TONG_MIN}–{Y_TONG_MAX}.")

    # --- 4. Tổng điểm ---
    diem = [int(x) for x in re.findall(r"\((\d+)\s*điểm\)", de)]
    if diem and sum(diem) != 100:
        kq.E(f"Tổng điểm ghi trên các bài = {sum(diem)}, phải bằng 100.")

    # --- 7. Bẫy ---
    n_bay = len(re.findall(r"\bBẪY\b", da))
    if n_bay < 2:
        kq.E(f"Phải đánh dấu ít nhất 2 `BẪY` trong phần đáp án, đang có {n_bay}.")
    elif n_bay > 4:
        kq.E(f"Chỉ được tối đa 4 `BẪY`, đang có {n_bay}.")

    # --- 8. Nhãn tư duy ---
    n_td = len(set(re.findall(r"\bTD[1-6]\b", da)))
    if n_td == 0:
        kq.E("Phần đáp án chưa gắn nhãn tư duy `TD1`…`TD6`.")

    # --- 13. Đáp án đủ 25 bài, đủ 4 mục ---
    da_bai = RE_DA_BAI.findall(da)
    if len(da_bai) != SO_PHAN * SO_BAI_MOI_PHAN:
        kq.E(f"Phần đáp án phải có đủ {SO_PHAN*SO_BAI_MOI_PHAN} mục "
             f"`### Bài <La Mã>.<số>`, đang có {len(da_bai)}.")
    for muc in ("**Đáp số", "**Hướng giải", "**Nhãn tư duy", "**Lỗi thường gặp"):
        thieu = SO_PHAN * SO_BAI_MOI_PHAN - da.count(muc)
        if thieu > 0:
            kq.E(f"Phần đáp án thiếu {thieu} mục `{muc}…`.")

    # --- 14. Gợi ý 3 tầng ở Phần IV, V ---
    n_goi_y = da.count("**Gợi ý 3 tầng")
    if n_goi_y < 10:
        kq.E(f"Phần IV và V phải có `Gợi ý 3 tầng` cho cả 10 bài, đang có {n_goi_y}.")

    # --- 10. Không dùng thuật ngữ THCS ---
    thap = de.lower()
    for tu in TU_CAM_THCS:
        if tu in thap:
            kq.E(f"Đề dùng thuật ngữ THCS bị cấm: “{tu}”.")

    # --- 11. Câu quá 35 chữ ---
    for dong in de.splitlines():
        d = dong.strip()
        if not d or d.startswith(("#", "|", ">", "```", "<", "-", "*")):
            continue
        for cau in re.split(r"(?<=[.?!;:])\s+", d):
            n = len(cau.split())
            if n > 35:
                kq.W(f"Câu dài {n} chữ (chuẩn ≤ 35): “{cau[:70]}…”")

    # --- 15. Người biên soạn / giải thử ---
    if "Người biên soạn" not in da or "Người giải thử" not in da:
        kq.E("Cuối phần đáp án phải ghi `Người biên soạn:` và `Người giải thử:`.")

    return kq


def main() -> int:
    ap = argparse.ArgumentParser(description="Kiểm định phiếu GITA")
    ap.add_argument("tep", nargs="*", type=Path)
    ap.add_argument("--all", action="store_true", help="kiểm định mọi phiếu trong 03-phieu/")
    a = ap.parse_args()

    index = None
    if INDEX.exists():
        index = {r["ma"]: r for r in json.loads(INDEX.read_text(encoding="utf-8"))}

    tep = list(a.tep)
    if a.all or not tep:
        tep = sorted((ROOT / "03-phieu").rglob("GITA-*.md"))
    if not tep:
        print("Không tìm thấy phiếu nào để kiểm định.")
        return 0

    so_loi = 0
    for p in tep:
        kq = kiem_tra(p, index)
        bieu_tuong = "✔" if kq.dat else "✘"
        print(f"{bieu_tuong} {kq.ten}")
        for m in kq.loi:
            print(f"    LỖI      · {m}")
        for m in kq.canh_bao:
            print(f"    cảnh báo · {m}")
        so_loi += len(kq.loi)
    print(f"\n— Đã kiểm định {len(tep)} phiếu · {so_loi} lỗi —")
    return 1 if so_loi else 0


if __name__ == "__main__":
    sys.exit(main())
