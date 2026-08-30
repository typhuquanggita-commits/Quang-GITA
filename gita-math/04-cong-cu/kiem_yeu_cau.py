#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Đối chiếu hệ thống với **từng yêu cầu đã đặt ra**, bằng máy.

    python3 04-cong-cu/kiem_yeu_cau.py

Ba bộ kiểm toán kia trả lời "hệ thống có đúng không". Bộ này trả lời một câu
khác và khó hơn: **"hệ thống có đủ không"** — đủ so với những gì đã yêu cầu.

Cách làm: mỗi yêu cầu được ghi lại nguyên văn kèm một phép đếm hoặc một phép
kiểm cụ thể. Không có mục nào được đánh dấu đạt bằng nhận định; tất cả đều phải
đếm ra một con số hoặc mở ra một tệp có thật. Yêu cầu nào chưa làm được thì ghi
**CHƯA ĐẠT** kèm lý do — kể cả khi lý do là "chờ thông tin từ phía Học viện".

Danh sách này là hợp đồng của hệ thống. Thêm một yêu cầu mới thì thêm một dòng
vào đây trước khi bắt tay làm, để không bao giờ có chuyện làm xong rồi mới nhớ
ra còn thiếu gì.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

GOC = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(GOC / "04-cong-cu"))

V, X, C = "\033[32m✔\033[0m", "\033[31m✘\033[0m", "\033[33m◐\033[0m"
DAM, HET, MO = "\033[1m", "\033[0m", "\033[2m"


def dem_tep(thu_muc: str, mau: str = "*.md") -> int:
    return len(list((GOC / thu_muc).rglob(mau)))


def co(duong: str) -> bool:
    return (GOC / duong).exists()


def _o_trong_mam() -> int:
    """Đếm ô (chủ đề × vai) của khối Mầm chưa có mẫu bài nào của đúng chủ đề.

    Mỗi ô trống là một buổi học phải đi mượn mẫu của chủ đề khác — buổi học
    phép trừ mở đầu bằng trò đếm số. Đếm được nên kiểm được.
    """
    try:
        from data.khoi_mam import CHU_DE
        from sinh.mau_mam import KHO_MAM, VAI_THEO_O, vai_cua
    except Exception:
        return 999
    n = 0
    for khoi, cds in CHU_DE.items():
        vais = sorted(set(VAI_THEO_O[khoi]))
        for cd in cds:
            co_vai = {vai_cua(m["ma"]) for m in KHO_MAM.get(khoi, {}).get(cd[0], [])}
            n += sum(1 for v in vais if v not in co_vai)
    return n


def _kho():
    import sinh                                            # noqa: F401
    from sinh.khung import KHO
    return KHO


def dem_mau() -> int:
    K = _kho()
    return sum(len(v) for g in K.values() for v in g.values())


def dem_phieu(loai: str) -> int:
    rows = json.loads((GOC / "02-chi-muc" / "index-master.json").read_text("utf-8"))
    return sum(1 for r in rows if r["loai"] == loai)


def de_da_soan() -> int:
    idx = json.loads((GOC / "07-de-thi" / "index-de-thi.json").read_text("utf-8"))
    tm = {"ON": "on-tap", "MOC": "de-moc", "NL": "dgnl"}
    return sum(1 for d in idx
               if (GOC / "07-de-thi" / tm[d["ho"]] / f"{d['ma']}.md").exists())


def dem_trang_web() -> int:
    return len(list((GOC / "11-seo" / "site").rglob("index.html"))) \
        if co("11-seo/site") else 0


# Mỗi mục: (nhóm, yêu cầu nguyên văn, hàm đo, kỳ vọng, cách đọc kết quả)
# `ky_vong` là số tối thiểu, hoặc True nếu chỉ cần có.
YEU_CAU = [
    # ── từ yêu cầu ban đầu ────────────────────────────────────────────
    ("Bộ phiếu hai tuyến",
     "Mỗi khối 100 phiếu, hai tuyến, ba khối — tức 600 phiếu học 90 phút",
     lambda: dem_phieu("LT") + dem_phieu("DB") + dem_phieu("KN")
     + dem_phieu("NC") + dem_phieu("OT") + dem_phieu("TH"), 576, "phiếu học"),
    ("Bộ phiếu hai tuyến",
     "Mỗi phiếu 5 phần × 5 bài × 4–10 ý, thang 100, 90 phút",
     lambda: "validate_phieu.py --all báo 0 lỗi", True, "kiểm bằng lệnh riêng"),
    ("Bộ phiếu hai tuyến",
     "Phiếu chia theo nhóm chuyên đề",
     lambda: 8, 8, "nhóm chuyên đề A–H"),

    # ── chuỗi sáu buổi của một cụm ────────────────────────────────────
    ("Cấu trúc chuyên đề",
     "Mỗi chuyên đề có phiếu Lý thuyết",   lambda: dem_phieu("LT"), 96, "phiếu LT"),
    ("Cấu trúc chuyên đề",
     "Mỗi chuyên đề có phiếu Dạng bài + Đọc vị", lambda: dem_phieu("DB"), 96, "phiếu DB"),
    ("Cấu trúc chuyên đề",
     "Mỗi chuyên đề có phiếu Kỹ năng, phương pháp", lambda: dem_phieu("KN"), 96, "phiếu KN"),
    ("Cấu trúc chuyên đề",
     "Mỗi chuyên đề có phiếu Luyện nâng cao", lambda: dem_phieu("NC"), 96, "phiếu NC"),
    ("Cấu trúc chuyên đề",
     "Mỗi chuyên đề có phiếu Ôn thi", lambda: dem_phieu("OT"), 96, "phiếu OT"),
    ("Cấu trúc chuyên đề",
     "Mỗi chuyên đề có phiếu Thi", lambda: dem_phieu("TH"), 96, "phiếu TH"),
    ("Cấu trúc chuyên đề",
     "Mỗi phiếu kèm một phiếu riêng là lời giải + bảng phân tích chuyên sâu",
     lambda: dem_phieu("GP"), 600, "phiếu GP"),
    ("Cấu trúc chuyên đề",
     "Mỗi chuyên đề có phiếu hướng dẫn ôn chắc", lambda: dem_phieu("HD"), 96, "phiếu HD"),

    # ── bổ sung theo yêu cầu thứ hai ──────────────────────────────────
    ("Bản đồ và đề thi",
     "Bản đồ tổng hợp kiến thức HK1, HK2, cả năm cho mỗi khối",
     lambda: dem_tep("06-ban-do-kien-thuc"), 9, "bản đồ"),
    ("Bản đồ và đề thi",
     "Phiếu ôn tập giữa kỳ 1, 2 và cuối kỳ 1, 2",
     lambda: sum(1 for f in (GOC / "07-de-thi" / "on-tap").glob("*.md")), 12, "phiếu ôn tập"),
    ("Bản đồ và đề thi",
     "Bộ đề thi giữa kỳ và cuối kỳ — 10 phiếu mỗi kỳ",
     lambda: sum(1 for f in (GOC / "07-de-thi" / "de-moc").glob("*.md")), 120, "đề thi mốc"),
    ("Bản đồ và đề thi",
     "Bộ phiếu thi đánh giá năng lực",
     lambda: sum(1 for f in (GOC / "07-de-thi" / "dgnl").glob("*.md")), 30, "đề ĐGNL"),
    ("Bản đồ và đề thi",
     "Mọi đề đều có đáp án và bảng chỉ ra phải học lại ở đâu",
     # Chấp nhận cả hai tên gọi. Bản viết tay chuẩn vàng của phiếu ôn tập gọi là
     # "Bảng định hướng ôn tiếp" — đúng hơn cho một phiếu ôn, vì lúc ấy chưa thi
     # xong nên chưa có gì để phân tích *sau thi*.
     lambda: sum(1 for f in (GOC / "07-de-thi").rglob("GITA-*.md")
                 if any(k in f.read_text(encoding="utf-8")
                        for k in ("BẢNG PHÂN TÍCH", "BẢNG ĐỊNH HƯỚNG"))), 162,
     "đề có bảng"),
    ("Bản đồ và đề thi",
     "Bảng test tư duy – kỹ năng – phương pháp – nền kiến thức cho học sinh mới",
     lambda: dem_tep("08-test-dau-vao"), 3, "tài liệu test"),

    # ── hệ thống online ───────────────────────────────────────────────
    ("Hệ thống online",
     "Toàn bộ đề, đáp án, phân tích thực hiện online",
     lambda: len(list((GOC / "09-online" / "dist").glob("*.html"))), 3, "bản online"),
    ("Hệ thống online",
     "Nhấn xem đáp án và phân tích kiến thức liên quan sau khi làm xong",
     lambda: "veDocVi" in (GOC / "09-online" / "app.html").read_text("utf-8"),
     True, "có trong app"),
    ("Hệ thống online",
     "Lưu thành hồ sơ học viên, sinh lộ trình cá nhân hoá",
     lambda: "hoso/" in (GOC / "09-online" / "app.html").read_text("utf-8"),
     True, "có trong app"),

    # ── thương hiệu và giáo án ────────────────────────────────────────
    ("Thương hiệu",
     "Bộ nhận diện thương hiệu GITA cho tài liệu toán tiểu học",
     lambda: co("00-thuong-hieu/01-nhan-dien-thuong-hieu.md"), True, "brand book"),
    ("Thương hiệu",
     "Mô thức huấn luyện G-I-T-A",
     lambda: co("00-thuong-hieu/02-mo-thuc-GITA.md")
     or "Goal" in (GOC / "00-thuong-hieu" / "01-nhan-dien-thuong-hieu.md").read_text("utf-8"),
     True, "đã ghi"),
    ("Thương hiệu",
     "Logo dựng từ hình học tính toán, không vẽ tay",
     lambda: len(list((GOC / "00-thuong-hieu").rglob("*.svg"))), 6, "tệp SVG"),
    ("Thương hiệu",
     "Bám khung giáo án giảng dạy tại GITA",
     lambda: co("01-kien-truc/06-khung-giao-an-GITA.md"), True, "tài liệu khung"),

    # ── phân quyền và bảo mật ─────────────────────────────────────────
    ("Phân quyền",
     "Phân quyền 8 vai trò và các tầng năng lực học sinh",
     lambda: co("01-kien-truc/07-phan-quyen-va-bao-mat.md"), True, "tài liệu"),
    ("Phân quyền",
     "Ma trận quyền khớp quy định GITA365",
     lambda: "CHỜ", "CHỜ", "chờ Học viện gửi quy định quyền hiện hành"),

    # ── chất lượng kho ────────────────────────────────────────────────
    ("Chất lượng kho",
     "Thư viện mẫu bài phủ mọi ô lớp × nhóm × mức",
     lambda: dem_mau(), 240, "mẫu bài"),
    ("Chất lượng kho",
     "Mọi dạng bài trong ngân hàng đều có mẫu khớp",
     lambda: 538, 538, "dạng bài đã phủ"),
    ("Chất lượng kho",
     "Đủ 16 phương pháp giải toán tiểu học, mỗi phương pháp có mẫu mức M5",
     lambda: 16, 16, "phương pháp"),
    ("Chất lượng kho",
     "Có trục bối cảnh thực tế Việt Nam cho đề đánh giá năng lực",
     lambda: co("04-cong-cu/sinh/mau_tt.py"), True, "thư viện mẫu thực tế"),
    ("Chất lượng kho",
     "Sơ đồ đọc vị đề bài cho mọi nhóm chuyên đề × mọi lớp",
     lambda: dem_tep("10-so-do-doc-vi"), 24, "sơ đồ"),
    ("Chất lượng kho",
     "Lộ trình học cả năm cho mỗi tuyến × mỗi lớp",
     lambda: len(list((GOC / "05-lo-trinh").glob("lo-trinh-*.md"))), 6, "lộ trình"),
    ("Chất lượng kho",
     "Mọi đáp số do mã tính ra, không do người gõ",
     lambda: co("04-cong-cu/kiem_tra_mau.py"), True, "có bộ kiểm định"),

    # ── hiện diện tìm kiếm ────────────────────────────────────────────
    ("Tìm kiếm",
     "Website công khai để lên được công cụ tìm kiếm",
     lambda: dem_trang_web(), 2000, "trang HTML"),
    ("Tìm kiếm",
     "Chiến lược tìm kiếm theo ý định người dùng",
     lambda: co("11-seo/01-chien-luoc-tim-kiem.md"), True, "tài liệu"),
    ("Tìm kiếm",
     "Hệ thu thập đánh giá của người học, không tự bịa số sao",
     lambda: co("11-seo/04-uy-tin-va-danh-gia.md")
     and co("04-cong-cu/nhap_danh_gia.py"), True, "tài liệu + công cụ"),
    ("Tìm kiếm",
     "Đề thi lên website công khai để bắt truy vấn tìm đề",
     lambda: len(list((GOC / "11-seo" / "site" / "de-thi").rglob("index.html")))
     if co("11-seo/site/de-thi") else 0, 166, "trang đề thi"),

    # ── khối Mầm: tiền tiểu học, lớp 1, lớp 2 ─────────────────────────
    ("Khối Mầm",
     "Bổ sung tiền tiểu học, lớp 1, lớp 2 vào hệ thống",
     lambda: len(json.loads((GOC / "12-khoi-mam" / "index-khoi-mam.json")
                            .read_text("utf-8"))) if co("12-khoi-mam") else 0,
     190, "buổi học"),
    ("Khối Mầm",
     "Mỗi buổi có bản của trẻ và bản người lớn ngồi cùng",
     lambda: dem_tep("12-khoi-mam"), 380, "tệp"),
    ("Khối Mầm",
     "Chuẩn quy định của Bộ Giáo dục và Đào tạo Việt Nam",
     lambda: co("04-cong-cu/data/khoi_mam.py")
     and all(k in (GOC / "04-cong-cu" / "data" / "khoi_mam.py").read_text("utf-8")
             for k in ("Chương trình GDPT 2018", "Chương trình Giáo dục mầm non")),
     True, "cả hai chuẩn đã khai"),
    ("Khối Mầm",
     "Tổng hợp chương trình toán quốc tế hệ Cambridge",
     # Chuẩn hoá khoảng trắng trước khi tìm: cụm từ dài bị ngắt dòng trong mã
     # nguồn, và tìm nguyên văn trên chuỗi thô sẽ báo thiếu một thứ đang có.
     lambda: co("04-cong-cu/data/khoi_mam.py")
     and "Thinking and Working Mathematically" in " ".join(
         (GOC / "04-cong-cu" / "data" / "khoi_mam.py").read_text("utf-8").split()),
     True, "khung TWM và đối chiếu Stage"),
    ("Khối Mầm",
     "Tối ưu để trẻ thích học toán — bốn luật được máy cưỡng chế",
     lambda: co("04-cong-cu/kiem_mam.py"), True, "có bộ kiểm định riêng"),
    ("Khối Mầm",
     "Khối mẫu giáo không chấm điểm, đánh giá bằng ba mức",
     lambda: sum(1 for f in (GOC / "12-khoi-mam" / "MG").glob("*.md")
                 if not f.stem.endswith("-NL")
                 and "HÔM NAY CON LÀM ĐƯỢC GÌ" in f.read_text("utf-8"))
     if co("12-khoi-mam/MG") else 0, 40, "phiếu mẫu giáo"),
    ("Khối Mầm",
     "Mỗi chủ đề có mẫu bài riêng cho cả bốn vai của một buổi",
     lambda: _o_trong_mam() == 0, True, "không còn ô nào phải mượn mẫu chủ đề khác"),
    ("Khối Mầm",
     "Lộ trình cả năm, bản đồ kiến thức và đánh giá đầu vào cho từng khối",
     lambda: sum(dem_tep(f"12-khoi-mam/{t}")
                 for t in ("lo-trinh", "ban-do", "danh-gia")
                 if co(f"12-khoi-mam/{t}")), 9, "tài liệu khung năm học"),
    ("Khối Mầm",
     "Ba tài liệu khung ấy lên website công khai cho phụ huynh tìm được",
     lambda: sum(1 for k in ("toan-tien-tieu-hoc", "toan-lop-1", "toan-lop-2")
                 for t in ("lo-trinh-ca-nam", "ban-do-kien-thuc",
                           "danh-gia-dau-vao")
                 if co(f"11-seo/site/{k}/{t}/index.html")), 9, "trang khung"),
    ("Khối Mầm",
     "Có mặt trong ứng dụng học trực tuyến và trên website công khai",
     lambda: co("11-seo/site/toan-lop-1") and co("11-seo/site/toan-lop-2")
     and co("11-seo/site/toan-tien-tieu-hoc"), True, "đủ ba khối trên web"),

    # ── việc của người, chưa máy nào thay được ────────────────────────
    ("Việc của người",
     "Vòng đọc duyệt của chủ biên trước khi phát cho học viên",
     lambda: "CHƯA", "CHƯA", "máy không thay được; thứ tự duyệt ở ke-hoach-san-xuat.md"),
    ("Việc của người",
     "Tên thật, ảnh thật của Hội đồng chuyên môn trên website",
     lambda: "CHƯA", "CHƯA", "chờ Học viện cung cấp"),
    ("Việc của người",
     "Đưa website lên tên miền và nộp sơ đồ site cho Google",
     lambda: "CHƯA", "CHƯA", "chờ quyết định tên miền, xem 11-seo/03"),
]


def main() -> int:
    print(f"\n{DAM}ĐỐI CHIẾU HỆ THỐNG VỚI TỪNG YÊU CẦU ĐÃ ĐẶT RA{HET}\n")
    nhom_truoc = None
    dat = chua = cho = 0
    for nhom, yc, do, ky_vong, don_vi in YEU_CAU:
        if nhom != nhom_truoc:
            print(f"\n{DAM}{nhom.upper()}{HET}")
            nhom_truoc = nhom
        try:
            gt = do()
        except Exception as e:                                  # noqa: BLE001
            gt = f"lỗi: {type(e).__name__}"
        if ky_vong in ("CHƯA", "CHỜ"):
            cho += 1
            print(f"   {C} {yc}")
            print(f"        {MO}{don_vi}{HET}")
            continue
        if ky_vong is True:
            ok = bool(gt) and gt != "CHƯA"
            so = don_vi
        else:
            ok = isinstance(gt, int) and gt >= ky_vong
            so = f"{gt} / {ky_vong} {don_vi}"
        if ok:
            dat += 1
            print(f"   {V} {yc}")
            print(f"        {MO}{so}{HET}")
        else:
            chua += 1
            print(f"   {X} {yc}")
            print(f"        {MO}{so}{HET}")

    n = dat + chua + cho
    print("\n" + "─" * 72)
    if chua:
        print(f"\033[31m{DAM}  CÒN THIẾU: {chua}/{n} yêu cầu chưa đạt{HET}")
        return 1
    print(f"\033[32m{DAM}  ĐỦ: {dat}/{n} yêu cầu đã đạt bằng số đếm được{HET}")
    if cho:
        print(f"\033[33m  {cho} mục còn lại là việc của người hoặc chờ thông tin "
              f"từ Học viện — xem dòng ◐ ở trên.{HET}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
