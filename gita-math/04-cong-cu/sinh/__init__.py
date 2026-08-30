# -*- coding: utf-8 -*-
"""Bộ sinh nội dung GITA.

Nhập gói này là nạp toàn bộ thư viện mẫu bài của tám nhóm chuyên đề vào
`khung.KHO`. Kho mẫu tra theo `KHO[nhóm][mức]`.
"""
from . import khung  # noqa: F401
from . import (mau_a, mau_b, mau_c, mau_d, mau_e, mau_f,  # noqa: F401
               mau_g, mau_h, mau_lop3, mau_a2, mau_d2, mau_e2, mau_f2, mau_g2, mau_h2, mau_l3b, mau_bo)

from .khung import KHO, Bai, Mau, lay_mau  # noqa: F401

__all__ = ["KHO", "Bai", "Mau", "lay_mau", "khung"]
