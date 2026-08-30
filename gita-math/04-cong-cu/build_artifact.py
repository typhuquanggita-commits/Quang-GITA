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

    # Chặn ghép bản mới lên dữ liệu cũ.
    #
    # Mỗi khối lớp có một tệp dữ liệu **riêng**, dựng bằng `build_web_data.py
    # --lop N`. Ai sinh lại kho rồi chỉ chạy `build_artifact.py --lop N` sẽ ra
    # một bản trông như mới nhưng ruột là dữ liệu cũ — không có lỗi, không có
    # cảnh báo, chỉ có nội dung sai. Tôi đã mắc đúng lỗi ấy và đăng ba bản
    # thiếu nội dung của cả một ngày làm việc. Từ nay dựng bản mà dữ liệu cũ
    # hơn kho thì dừng hẳn, kèm câu lệnh phải chạy.
    moi_nhat, ten_moi = 0.0, ""
    for thu_muc, mau in (("03-phieu", "*.md"), ("07-de-thi", "*.md"),
                         ("12-khoi-mam", "*.md"), ("09-online", "app.html")):
        for f in (ROOT / thu_muc).rglob(mau):
            if f.stat().st_mtime > moi_nhat:
                moi_nhat, ten_moi = f.stat().st_mtime, f.name
    if DATA.stat().st_mtime < moi_nhat:
        from datetime import datetime as _dt
        raise SystemExit(
            f"{DATA.name} cũ hơn kho tài liệu — ghép bây giờ sẽ ra một bản "
            f"thiếu nội dung.\n"
            f"  dữ liệu : {_dt.fromtimestamp(DATA.stat().st_mtime):%Y-%m-%d %H:%M}\n"
            f"  mới nhất: {_dt.fromtimestamp(moi_nhat):%Y-%m-%d %H:%M}  ({ten_moi})\n"
            f"  Chạy trước: python3 04-cong-cu/build_web_data.py"
            + (f" --lop {a.lop}" if a.lop else ""))
    app = APP.read_text(encoding="utf-8")
    data = DATA.read_text(encoding="utf-8")
    moc = re.compile(r"/\*__GITA_DATA__\*/.*?/\*__END__\*/", re.S)
    if not moc.search(app):
        raise SystemExit("Không tìm thấy mốc chèn dữ liệu /*__GITA_DATA__*/ … /*__END__*/")
    # Nhúng dưới dạng chuỗi JS: bọc nháy kép và thoát mọi ký tự đặc biệt.
    # Riêng "</" phải thoát để dữ liệu không đóng sớm thẻ script.
    an_toan = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    out = moc.sub(lambda m: an_toan, app, count=1)
    if a.lop:                       # mỗi bản một tên riêng để phân biệt trong thư viện
        out = out.replace("<title>Học viện GITA</title>",
                          f"<title>GITA Toán lớp {a.lop}</title>", 1)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(out, encoding="utf-8")
    print(f"✔ {OUT.relative_to(ROOT)} — {OUT.stat().st_size/1024:.0f} KB")

if __name__ == "__main__":
    main()
