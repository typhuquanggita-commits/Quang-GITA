#!/usr/bin/env python3
"""Phần dùng chung của công cụ khớp giọng — tách ra để bài kiểm tra dùng lại."""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def doc_dan_giong():
    """Đọc dàn 10 giọng thẳng từ data/voices.ts — một nguồn sự thật duy nhất."""
    src = open(os.path.join(ROOT, "data", "voices.ts"), encoding="utf-8").read()
    block = re.compile(
        r"id: '(v\d+)',.*?stageName: '([^']+)',\s*gender: '([^']+)',.*?"
        r"model: '([^']+)', speaker: (\d+),\s*"
        r"measured: \{f0: ([\d.]+), centroid: ([\d.]+), variation: ([\d.]+)\}",
        re.S,
    )
    return [
        {"id": m.group(1), "ten": m.group(2), "gioi": m.group(3),
         "model": m.group(4), "speaker": int(m.group(5)),
         "f0": float(m.group(6)), "centroid": float(m.group(7)),
         "f0_var": float(m.group(8))}
        for m in block.finditer(src)
    ]
