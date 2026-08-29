#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Ghép app.html + gita-data.json thành một trang tự chứa để xuất bản online.

  python3 04-cong-cu/build_artifact.py
Đầu ra: 09-online/dist/gita-online.html
"""
from pathlib import Path
import re, sys

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "09-online" / "app.html"
DATA = ROOT / "09-online" / "data" / "gita-data.json"
OUT = ROOT / "09-online" / "dist" / "gita-online.html"

def main() -> None:
    if not DATA.exists():
        raise SystemExit("Chưa có gita-data.json — chạy build_web_data.py trước.")
    app = APP.read_text(encoding="utf-8")
    data = DATA.read_text(encoding="utf-8")
    moc = re.compile(r"/\*__GITA_DATA__\*/.*?/\*__END__\*/", re.S)
    if not moc.search(app):
        raise SystemExit("Không tìm thấy mốc chèn dữ liệu /*__GITA_DATA__*/ … /*__END__*/")
    # </script> trong dữ liệu sẽ đóng sớm thẻ script -> phải thoát
    an_toan = data.replace("</", "<\\/")
    out = moc.sub(lambda m: an_toan, app, count=1)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(out, encoding="utf-8")
    print(f"✔ {OUT.relative_to(ROOT)} — {OUT.stat().st_size/1024:.0f} KB")

if __name__ == "__main__":
    main()
