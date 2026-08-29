#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Ghép app.html + dữ liệu JSON thành một trang tự chứa để xuất bản online.

  python3 04-cong-cu/build_artifact.py            # bản đủ ba khối (rất nặng)
  python3 04-cong-cu/build_artifact.py --lop 4    # bản riêng khối lớp 4

Kho đủ 1 296 tài liệu nặng hơn hạn mức một trang xuất bản, nên bản phát hành
được tách theo khối lớp: mỗi bản có trọn nội dung của khối mình và đủ chỉ mục
của cả ba khối.
Đầu ra: 09-online/dist/gita-online[-Lx].html
"""
from pathlib import Path
import argparse, json, re

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "09-online" / "app.html"


def main() -> None:
    ap = argparse.ArgumentParser(description="Ghép trang xuất bản GITA")
    ap.add_argument("--lop", type=int, choices=(3, 4, 5))
    a = ap.parse_args()
    hau = f"-L{a.lop}" if a.lop else ""
    DATA = ROOT / "09-online" / "data" / f"gita-data{hau}.json"
    OUT = ROOT / "09-online" / "dist" / f"gita-online{hau}.html"
    if not DATA.exists():
        raise SystemExit(f"Chưa có {DATA.name} — chạy build_web_data.py trước.")
    app = APP.read_text(encoding="utf-8")
    data = DATA.read_text(encoding="utf-8")
    moc = re.compile(r"/\*__GITA_DATA__\*/.*?/\*__END__\*/", re.S)
    if not moc.search(app):
        raise SystemExit("Không tìm thấy mốc chèn dữ liệu /*__GITA_DATA__*/ … /*__END__*/")
    # Nhúng dưới dạng chuỗi JS: bọc nháy kép và thoát mọi ký tự đặc biệt.
    # Riêng "</" phải thoát để dữ liệu không đóng sớm thẻ script.
    an_toan = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    out = moc.sub(lambda m: an_toan, app, count=1)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(out, encoding="utf-8")
    print(f"✔ {OUT.relative_to(ROOT)} — {OUT.stat().st_size/1024:.0f} KB")

if __name__ == "__main__":
    main()
