# -*- coding: utf-8 -*-
"""Chọn năm mẫu bài cho một phần của phiếu.

Nguyên tắc:
  1. Đúng **mức** của phần — không hạ mức, vì phần V hạ mức là hỏng phân hoá.
  2. Ưu tiên mẫu thuộc **nhóm chuyên đề của cụm**, và trong đó ưu tiên mẫu có từ
     khoá trùng danh sách **dạng bài** của cụm.
  3. Từ phần III trở đi chèn một **bài liên kết** lấy từ nhóm chuyên đề khác —
     đúng tinh thần "bài liên kết" của chuẩn biên soạn.
  4. Tránh lặp mẫu trong cùng một phiếu; chỉ lặp khi kho ở mức đó đã cạn.
  5. Hai phần cuối ưu tiên mẫu **có cài bẫy**, phục vụ luật 2–4 bẫy mỗi phiếu.
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from sinh.khung import KHO, khong_dau            # noqa: E402


def diem_khop(mau, kho_dang: str) -> int:
    """Mức khớp giữa mẫu và danh sách dạng bài của cụm.

    Khai báo `dang_bai` là khớp đích danh nên tính 5 điểm mỗi tên trùng; từ khoá
    chỉ khớp mềm nên tính 1 điểm. Nhờ vậy mẫu viết riêng cho một dạng bài luôn
    được chọn trước mẫu chỉ tình cờ trùng vài từ.
    """
    diem = sum(5 for d in mau.dang_bai if khong_dau(d) in kho_dang)
    return diem + sum(1 for t in mau.tu_khoa if khong_dau(t) in kho_dang)


def kho_muc(nhom: str, muc: str, lop: int) -> list:
    return [x for x in KHO.get(nhom, {}).get(muc, []) if lop in x.lop]


def kho_khac(nhom: str, muc: str, lop: int) -> list:
    return [x for g in KHO if g != nhom for x in kho_muc(g, muc, lop)]


def _xep(rng, ds, kho_dang, uu_tien_bay):
    return sorted(ds, key=lambda m: (-diem_khop(m, kho_dang),
                                     0 if (uu_tien_bay and m.bay) else 1,
                                     rng.random()))


def _rut_nhieu(rng, ds, da_dung, kho_dang, uu_tien_bay, can: int) -> list:
    """Rút `can` mẫu khác nhau từ `ds`, ưu tiên mẫu chưa dùng trong phiếu.

    Trả về ít hơn `can` nếu kho không đủ mẫu khác nhau — phần gọi sẽ bù bằng
    nhóm chuyên đề khác, tốt hơn nhiều so với việc lặp lại cùng một mẫu.
    """
    con = _xep(rng, [m for m in ds if m.ma not in da_dung], kho_dang, uu_tien_bay)
    ra = []
    while con and len(ra) < can:
        chon = rng.choice(con[:3]) if len(con) >= 3 else con[0]
        con.remove(chon)
        da_dung.add(chon.ma)
        ra.append(chon)
    return ra


def chon_nam_mau(rng, nhom: str, muc: str, lop: int, dang_bai: list[str],
                 da_dung: set[str], uu_tien_bay: bool = False,
                 so_lien_ket: int = 0) -> list:
    """Chọn đúng 5 mẫu cho một phần.

    Thứ tự lấp đầy: mẫu **chưa dùng** của nhóm chuyên đề → mẫu chưa dùng của
    nhóm khác (bài liên kết) → chấp nhận dùng lại mẫu của nhóm. Nhờ vậy một phiếu
    hầu như không bao giờ có hai bài sinh từ cùng một mẫu, kể cả khi kho của một
    mức trong nhóm chỉ có một hai mẫu.
    """
    kho_dang = khong_dau(" · ".join(dang_bai))
    rieng = kho_muc(nhom, muc, lop)
    khac = kho_khac(nhom, muc, lop)
    if not rieng and not khac:                    # không bao giờ nên xảy ra
        raise LookupError(f"Kho rỗng: nhóm {nhom}, mức {muc}, lớp {lop}")
    if not rieng:
        rieng, khac = khac, []
    n_lk = min(so_lien_ket, len(khac), 2)
    ra = _rut_nhieu(rng, rieng, da_dung, kho_dang, uu_tien_bay, 5 - n_lk)
    ra += _rut_nhieu(rng, khac, da_dung, kho_dang, uu_tien_bay, 5 - len(ra))
    while len(ra) < 5:                            # kho đã cạn: buộc phải lặp
        ra.append(rng.choice(rieng or khac))
    rng.shuffle(ra)
    return ra
