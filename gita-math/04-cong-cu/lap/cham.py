# -*- coding: utf-8 -*-
"""Chấm bài **khách quan** — đối chiếu đáp số học sinh gõ với đáp án của kho.

Cho tới nay ứng dụng làm bài online chỉ có nút ✓ / ✗ để học sinh **tự bấm**
mình đúng hay sai. Đáp số các em gõ vào ô được lưu lại nhưng không ai đối chiếu
với đáp án. Nghĩa là mọi con số trong hồ sơ học viên — tầng năng lực, tỉ lệ
đúng theo nhóm chuyên đề, biểu đồ tiến bộ — đều dựng trên lời tự khai của một
đứa trẻ về bài của chính nó. Không dùng để ra quyết định dạy học được.

Tệp này chấm bằng máy. Nguyên tắc quan trọng nhất: **thà không chấm còn hơn
chấm sai.** Đáp án trong kho có ba loại rất khác nhau:

    "2 971"                              → số, chấm được
    "Sơn: 66 viên, Đức: 56 viên"          → nhiều số có nhãn, chấm được
    "Đi ngược công thức qua bước nửa chu vi"  → câu giải thích, KHÔNG chấm được

Loại thứ ba không có một đáp số đúng duy nhất — hai học sinh viết hai câu khác
nhau đều có thể đúng. Máy chấm loại ấy là chấm bừa. Vì vậy mỗi ý được phân
loại ngay từ lúc dựng dữ liệu, và ý nào máy không chấm được thì **nói thẳng ra
trên giao diện** rồi để người lớn chấm, đồng thời **không tính vào điểm khách
quan** của hồ sơ.
"""
from __future__ import annotations

import re
import unicodedata

# Đơn vị hay đi kèm đáp số ở tiểu học. Học sinh viết thiếu đơn vị vẫn được tính
# đúng phần số — thiếu đơn vị là lỗi trình bày, không phải lỗi tính.
DON_VI = (
    "cm2 dm2 m2 km2 mm2 cm3 dm3 m3 "
    "mm cm dm m km g kg tạ tấn ml l lít "
    "giây phút giờ ngày tuần tháng năm "
    "đồng nghìn triệu phần trăm % độ "
    "quyển cái con quả bông chiếc viên bạn học_sinh người bó hộp thùng "
    "lá cờ điểm tuổi lần bước cọc viên_gạch hình đoạn cặp nhóm tổ hàng cột"
).split()

_SO = r"-?\d+(?:[.,]\d+)?"
RE_SO = re.compile(rf"^{_SO}$")
RE_SO_DV = re.compile(rf"^({_SO})\s*([^\d]{{1,24}})$")
RE_DANH_SACH = re.compile(rf"^{_SO}(?:\s*[,;·]\s*{_SO})+$")
RE_PHAN_SO = re.compile(rf"^({_SO})\s*(?:/|phần)\s*({_SO})$")
# "Sơn: 66 viên, Đức: 56 viên" · "đậu phụ: 50 000" — số có nhãn, một hoặc nhiều.
RE_CO_NHAN = re.compile(rf"^[^:]{{1,24}}:\s*{_SO}[^,;]{{0,16}}(?:[,;]\s*[^:]{{1,24}}:\s*{_SO}[^,;]{{0,16}})*$")
# "x = 97" · "y = 3,5" — đáp số của bài tìm x, rất phổ biến ở nhóm B.
RE_AN = re.compile(rf"^[a-z]\s*=\s*({_SO}(?:\s*/\s*{_SO})?)$")
# "9 giờ 17 phút" · "3 m 5 cm" · "2 kg 300 g" — số đo hợp thành nhiều đơn vị.
# "3, vì …" · "12 — vì …" — đáp số kèm lý do.
RE_SO_VI = re.compile(rf"^({_SO})\s*(?:,|—|-|–)?\s*(?:vì|do|bởi)\s+.+$")
RE_HOP = re.compile(rf"^{_SO}\s*[^\d\s]{{1,6}}(?:\s+{_SO}\s*[^\d\s]{{1,6}})+$")

# Câu trả lời một từ hoặc hai từ, có tập giá trị đóng — chấm khớp chữ được.
TU_DONG_Y = {"có", "không", "đúng", "sai", "bằng nhau", "chắc chắn", "có thể",
             "không thể", "lớn hơn", "bé hơn", "nhiều hơn", "ít hơn", "chẵn",
             "lẻ", "vuông", "nhọn", "tù", "bẹt"}


def bo_dau(s: str) -> str:
    """Bỏ dấu tiếng Việt, kể cả chữ đ mà NFD không tách."""
    s = s.replace("đ", "d").replace("Đ", "D")
    return "".join(c for c in unicodedata.normalize("NFD", s)
                   if unicodedata.category(c) != "Mn")


def chuan_hoa(s: str) -> str:
    """Đưa một đáp số về dạng so sánh được.

    Gộp mọi cách viết cùng một con số mà học sinh có thể dùng: `2 971`,
    `2.971`, `2971` là một; `3,5` và `3.5` là một; `3 phần 4`, `3/4` là một.
    """
    if s is None:
        return ""
    s = str(s).strip().lower()
    s = s.replace(" ", " ").replace(" ", " ").replace(" ", " ")
    s = re.sub(r"[*_`]", "", s)                 # bỏ đánh dấu markdown
    s = s.rstrip(" .")
    # Dấu cách nghìn và dấu chấm nghìn: chỉ gộp khi nằm **giữa hai chữ số**.
    s = re.sub(r"(?<=\d)[  .](?=\d\d\d(?!\d))", "", s)
    s = re.sub(r"(\d)\s*phần\s*(\d)", r"\1/\2", s)
    # Dấu phẩy chỉ là dấu thập phân khi **cả chuỗi là một số**. Trong
    # "21,42,63,84" nó là dấu ngăn cách danh sách, đổi thành dấu chấm sẽ biến
    # bốn số thành một chuỗi vô nghĩa.
    if re.fullmatch(r"-?\d+,\d+", s):
        s = s.replace(",", ".")
    s = re.sub(r"\s+", " ", s).strip()
    return s


def kieu(dap: str) -> str:
    """Loại của một đáp án: quyết định máy có chấm được hay không."""
    d = chuan_hoa(dap)
    if not d:
        return "trong"
    if RE_SO.match(d):
        return "so"
    if RE_AN.match(d):
        return "an"
    if RE_PHAN_SO.match(d):
        return "phan_so"
    if RE_DANH_SACH.match(d):
        return "danh_sach"
    if RE_CO_NHAN.match(d):
        return "co_nhan"
    if RE_HOP.match(d):
        return "hop"
    if RE_SO_DV.match(d):
        return "so_don_vi"
    # Câu trả lời chữ chỉ chấm máy khi nó thuộc **tập giá trị đóng** (có/không,
    # lớn hơn/bé hơn…) hoặc chỉ có **một từ** (một cái tên, một dấu so sánh).
    # Hai từ trở lên là đã có chỗ để diễn đạt khác đi: "Đếm cặp" và "ghép cặp"
    # là một cách làm, máy chấm sẽ báo sai cho học sinh viết cách thứ hai.
    if d in TU_DONG_Y or (" " not in d and not re.search(r"\d", d) and d):
        return "ngan"
    # Câu ngắn **bắt đầu bằng số** — "5 chữ số, tổng 23", "3 hình tam giác".
    # Chấm theo dãy số trong câu, vì phần chữ chỉ là nhãn cho số.
    #
    # Điều kiện "bắt đầu bằng số" đắt nhưng bắt buộc. Không có nó, một tên
    # chuyên đề như "Bảng nhân, bảng chia 6 và 7" cũng lọt vào diện chấm máy —
    # tôi đã bắt được đúng ca ấy khi thử trên phiếu thật. Máy sẽ chấm học sinh
    # theo dãy số [6, 7] rút từ một cái tên, tức là chấm bừa. Mất vài phần trăm
    # độ phủ còn hơn.
    if re.match(r"^-?\d", d) and len(d.split()) <= 8:
        return "cau_co_so"
    # "3, vì nhóm thích cả hai môn bị đếm hai lần" — đáp số đứng trước, lý do
    # đứng sau. Chấm phần đáp số; phần lý do để người lớn đọc.
    if RE_SO_VI.match(d):
        return "so_kem_ly_do"
    return "tu_do"


def cham_duoc(dap: str) -> bool:
    """Máy có chấm được ý này không. `tu_do` và `trong` thì không."""
    return kieu(dap) not in ("tu_do", "trong")


def _cac_so(s: str) -> list[str]:
    """Dãy số xuất hiện trong một đáp án, theo đúng thứ tự.

    Tách ở dấu ngăn cách trước rồi mới rút số, vì rút thẳng trên cả chuỗi sẽ
    nuốt dấu phẩy ngăn cách vào trong số: "21,42,63,84" ra hai số thay vì bốn.
    """
    ra = []
    for phan in re.split(r"[,;·]| và ", chuan_hoa(s)):
        ra += re.findall(_SO, phan)
    return ra


def khop(hoc_sinh: str, dap_an: str) -> bool | None:
    """Học sinh trả lời đúng không.

    `True`/`False` khi máy chấm được; **`None` khi máy không chấm được** — và
    `None` phải được giao diện hiểu là "chưa chấm", không được coi là sai.
    """
    if not cham_duoc(dap_an):
        return None
    hs, da = chuan_hoa(hoc_sinh), chuan_hoa(dap_an)
    if not hs:
        return False
    if hs == da:
        return True
    k = kieu(dap_an)
    if k == "so_kem_ly_do":
        # Chỉ đòi đúng đáp số; phần giải thích không chấm bằng máy.
        so_da = RE_SO_VI.match(da).group(1)
        so_hs = _cac_so(hs)
        return bool(so_hs) and so_hs[0] == chuan_hoa(so_da)
    if k in ("so", "phan_so", "an", "hop", "cau_co_so"):
        return _cac_so(hs) == _cac_so(da)
    if k == "so_don_vi":
        # Thiếu đơn vị vẫn tính đúng: đó là lỗi trình bày, không phải lỗi tính.
        m_da, m_hs = RE_SO_DV.match(da), RE_SO_DV.match(hs)
        if m_da and RE_SO.match(hs):
            return chuan_hoa(m_da.group(1)) == hs
        if m_da and m_hs:
            return (chuan_hoa(m_da.group(1)) == chuan_hoa(m_hs.group(1))
                    and bo_dau(m_hs.group(2)).strip() == bo_dau(m_da.group(2)).strip())
        return False
    if k in ("danh_sach", "co_nhan"):
        # Thứ tự không đổi ý nghĩa với danh sách số; với đáp án có nhãn thì so
        # đúng dãy số theo thứ tự xuất hiện.
        a, b = _cac_so(hs), _cac_so(da)
        return sorted(a) == sorted(b) if k == "danh_sach" else a == b
    if k == "ngan":
        return bo_dau(hs) == bo_dau(da)
    return False
