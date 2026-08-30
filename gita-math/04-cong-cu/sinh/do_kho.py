# -*- coding: utf-8 -*-
"""Chấm độ khó của một bài **bằng đặc trưng đo được**, không bằng nhãn tự khai.

Một mẫu bài khai mình là M4 không có nghĩa nó khó bằng M4. Tệp này tính ra một
chỉ số 0–100 từ chính bài đã sinh, để đối chiếu với nhãn ấy.

Bốn đặc trưng, chọn vì cả bốn đều **quan sát được trên giấy** và đều là thứ
làm học sinh mất điểm thật:

* **Tải đọc** — số chữ trung bình mỗi ý. Đề dài không tự nó khó, nhưng đề dài
  buộc phải giữ nhiều thứ trong đầu cùng lúc, và đó là chỗ học sinh tiểu học
  đuối trước tiên.
* **Có bẫy** — bài đòi sự cẩn thận, không chỉ đòi làm đúng phép tính.
* **Tư duy bậc cao** — bài chạm nhãn TD5 (khái quát hoá) hoặc TD6 (sáng tạo),
  tức là học sinh phải tự rút ra điều gì đó chứ không áp công thức.

Cố ý **không** dùng độ lớn của con số làm đặc trưng. Một bài chia 8 472 : 4
không khó hơn một bài chia 84 : 4 về mặt tư duy — nó chỉ dài tay hơn. Lấy độ
lớn làm thước đo là cách nhanh nhất để có một thang độ khó giả.

Cũng cố ý **không** dùng số bước của lời giải mẫu. Bản đầu của tệp này có
dùng, với trọng số lớn nhất, và kết quả là 76 mẫu bị chấm thấp hơn nhãn của
mình từ hai mức trở lên — trong đó có những mẫu khó thật như tổng dãy cộng trừ
xen kẽ. Lý do: mẫu ấy chưa **tự viết** lời giải từng bước, chứ không phải bài
ấy dễ. Số bước đo **độ đầy đủ của tài liệu**, không đo độ khó của đề; trộn hai
thứ vào một chỉ số thì chỉ số ấy nói dối cả hai. Nay tách ra: độ đầy đủ đo
riêng bằng `day_du_loi_giai()` và được `kiem_do_kho.py` theo dõi thành một
hạng mục của chính nó.
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from data.muc_do import MUC, THU_TU, dat_khoang                    # noqa: E402

TD_CAO = ("TD5", "TD6")

# Trọng số cộng lại đúng 100. Số bước nặng nhất vì nó là đặc trưng thật nhất;
# tải đọc nhẹ hơn vì một đề dài dòng chưa chắc đã là một đề khó.
TRONG_SO = {"doc": 25, "bay": 25, "tu_duy": 50}


def dac_trung(b) -> dict:
    """Bốn đặc trưng đo được của một bài đã sinh."""
    de = " ".join(t for t, _ in b.y)
    return {
        "chu_y": len(de) / max(1, b.so_y),
        "buoc": len(b.giai_mau),
        "bay": 1.0 if b.bay else 0.0,
        "td_cao": 1.0 if any(t in TD_CAO for t in b.td) else 0.0,
    }


def _thang(x: float, lo: float, hi: float) -> float:
    """Đưa một giá trị về khoảng 0–1, cắt ở hai đầu."""
    if hi <= lo:
        return 0.0
    return max(0.0, min(1.0, (x - lo) / (hi - lo)))


def chi_so(b) -> float:
    """Chỉ số độ khó 0–100 của một bài.

    Mốc quy đổi lấy từ chính khoảng của M1 và M5 trong `data/muc_do.py`: 40 chữ
    mỗi ý là đáy, 120 chữ là trần.
    """
    d = dac_trung(b)
    return round(
        TRONG_SO["doc"] * _thang(d["chu_y"], 40, 120)
        + TRONG_SO["bay"] * d["bay"]
        + TRONG_SO["tu_duy"] * d["td_cao"], 1)


def muc_doan(b) -> str:
    """Mức mà chỉ số độ khó gợi ý — dùng để so với mức mẫu tự khai."""
    c = chi_so(b)
    for m, tran in zip(THU_TU, (18, 34, 52, 72, 101)):
        if c < tran:
            return m
    return "M5"


def lech_tieu_chi(b, muc: str) -> list[str]:
    """Những tiêu chí của mức mà bài này không đạt.

    Chỉ kiểm tiêu chí có nghĩa trên **một bài lẻ**: tải đọc. Tỉ lệ bẫy và tỉ lệ
    tư duy bậc cao là thống kê của cả một mức, còn số bước là thước đo độ đầy
    đủ chứ không phải độ khó — cả ba được `kiem_do_kho.py` kiểm ở cấp kho.
    """
    d = dac_trung(b)
    ra = []
    for ten, nhan in (("chu_y", "tải đọc (chữ mỗi ý)"),):
        k = MUC[muc]["tieu_chi"][ten]
        if not dat_khoang(d[ten], k):
            lo, hi = k
            mong = (f"≥ {lo}" if hi is None else
                    f"≤ {hi}" if lo is None else f"{lo}–{hi}")
            ra.append(f"{nhan} = {d[ten]:.0f}, mức {muc} cần {mong}")
    return ra


def day_du_loi_giai(b) -> bool:
    """Mẫu này có **tự viết** lời giải từng bước có số thật hay không.

    Không phải thước đo độ khó — một bài dễ vẫn nên có lời giải đầy đủ, một bài
    khó vẫn có thể chưa được viết. Đây là thước đo mức độ hoàn thiện của kho,
    và là hạng mục còn thiếu nhiều nhất tính tới lúc này.
    """
    return bool(b.giai_mau)
