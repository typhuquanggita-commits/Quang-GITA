# -*- coding: utf-8 -*-
"""Bộ sinh nội dung GITA.

Nhập gói này là nạp toàn bộ thư viện mẫu bài của tám nhóm chuyên đề vào
`khung.KHO`. Kho mẫu tra theo `KHO[nhóm][mức]`.
"""
from . import khung  # noqa: F401
from . import (mau_a, mau_b, mau_c, mau_d, mau_e, mau_f,  # noqa: F401
               mau_g, mau_h, mau_lop3)

from .khung import KHO, Bai, Mau, lay_mau  # noqa: F401

__all__ = ["KHO", "Bai", "Mau", "lay_mau", "khung"]
