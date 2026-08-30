# -*- coding: utf-8 -*-
"""Khuôn trang web công khai của MATH TIỂU HỌC 365.

Tệp này giữ ba thứ: cách đặt đường dẫn, khuôn HTML một trang, và các khối dữ
liệu có cấu trúc (JSON-LD) gửi cho cỗ máy tìm kiếm.

Ba quyết định kỹ thuật đáng ghi lại, vì chúng quyết định trang có lên được hay
không, chứ không phải chuyện trang trí:

1. **Nội dung nằm sẵn trong HTML, không do JavaScript dựng ra.** Bản online
   trong `09-online/` là một ứng dụng một trang: mở lên phải chạy JavaScript
   mới có chữ. Cỗ máy tìm kiếm có thể xử lý được kiểu ấy nhưng xử lý chậm và
   không đều. Trang ở đây trả về chữ ngay trong lần tải đầu.

2. **Không tải tệp nào từ máy chủ ngoài.** Không phông chữ ngoài, không thư
   viện ngoài, không ảnh nền. Toàn bộ CSS nằm trong thẻ `<style>`. Đây là cách
   rẻ nhất để giữ ba chỉ số Core Web Vitals ở mức xanh.

3. **Nội dung phải trả tiền vẫn cho vào chỉ mục, nhưng khai báo trung thực.**
   Phần bị che khai `isAccessibleForFree: false` kèm `cssSelector` trỏ đúng vào
   khối bị che. Đây là cách Google cho phép. Cách làm sai — cho cỗ máy tìm kiếm
   thấy toàn bộ còn người đọc thì bị chặn — gọi là che giấu nội dung và bị phạt
   gỡ khỏi chỉ mục.
"""
from __future__ import annotations

import html
import re
import unicodedata

TEN_MIEN = "https://mathtieuhoc365.vn"
TEN_SITE = "MATH TIỂU HỌC 365"
TEN_TO_CHUC = "Học viện Phát triển Tài năng Toàn cầu — GITA"
KHAU_HIEU = "Tư duy xuất sắc, Bản lĩnh dẫn đầu"

XANH_DAM, XANH, XANH_SANG, DO = "#1B5EA8", "#2E7BC4", "#5AA0DC", "#E0242A"


# ───────────────────────────── ĐƯỜNG DẪN ─────────────────────────────

def slug(s: str) -> str:
    """Đường dẫn không dấu, chỉ chữ thường, số và gạch nối.

    Tiếng Việt bỏ dấu về ASCII: đường dẫn có dấu tuy hợp lệ nhưng khi được chép
    lại ở nơi khác sẽ biến thành chuỗi phần trăm dài loằng ngoằng, làm mất chữ
    trong đường dẫn — mà chữ trong đường dẫn là một tín hiệu xếp hạng nhẹ và là
    thứ người ta nhìn thấy khi được chia sẻ.
    """
    s = s.replace("Đ", "D").replace("đ", "d")
    s = "".join(c for c in unicodedata.normalize("NFD", s)
                if unicodedata.category(c) != "Mn").lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return re.sub(r"-{2,}", "-", s)[:80].strip("-")


def rut(s: str, n: int) -> str:
    """Cắt tới ranh giới từ, không cắt giữa chữ."""
    s = " ".join(s.split())
    if len(s) <= n:
        return s
    return s[:n].rsplit(" ", 1)[0].rstrip(" ,.;–—-") + "…"


def dat_tieu_de(chinh: str, duoi: str = "", gioi_han: int = 60) -> str:
    """Ghép tiêu đề sao cho **không bao giờ cắt cụt phần tên thương hiệu**.

    Google cắt tiêu đề ở khoảng 580 điểm ảnh, với tiếng Việt là quãng 58–62 ký
    tự. Cắt bừa ở ký tự thứ 60 dễ tạo ra thứ tệ nhất: tên thương hiệu đứt làm
    đôi, vừa mất nhận diện vừa trông cẩu thả. Thứ tự nhường chỗ ở đây là: giữ
    trọn phần mô tả nội dung trước, bỏ hẳn phần đuôi thương hiệu nếu không đủ
    chỗ, và chỉ cắt phần nội dung khi tự nó đã quá dài.
    """
    chinh = " ".join(chinh.split())
    if duoi and len(chinh) + len(duoi) <= gioi_han:
        return chinh + duoi
    if len(chinh) <= gioi_han:
        return chinh
    return rut(chinh, gioi_han)


def ghep_tieu_de(loi: str, *them: str, gioi_han: int = 60, giu: str = "") -> str:
    """Ghép lõi tiêu đề với các phần bổ nghĩa **theo thứ tự ưu tiên**.

    Phần nào không còn chỗ thì bỏ hẳn phần ấy, không cắt cụt nó. Nhờ vậy tiêu đề
    của một dạng bài tên dài vẫn là một câu trọn vẹn, còn dạng bài tên ngắn thì
    được thêm cả " có lời giải" lẫn tên thương hiệu.

    `giu` là phần **bắt buộc giữ**: lõi bị cắt bớt để nhường chỗ cho nó. Dùng cho
    phần phân biệt hai trang với nhau — chẳng hạn tên loại phiếu ở cuối tiêu đề
    của sáu buổi trong cùng một chuyên đề. Không có cơ chế này thì sáu phiếu tên
    chuyên đề dài sẽ bị cắt về đúng một tiêu đề giống hệt nhau, và sáu trang tự
    tranh nhau cùng một truy vấn.
    """
    con = gioi_han - len(giu)
    ra = " ".join(loi.split())
    if len(ra) > con:
        ra = rut(ra, con)
    ra += giu                       # phần phân biệt đứng ngay sau lõi…
    for t in them:                  # …rồi mới tới đuôi thương hiệu
        if len(ra) + len(t) <= gioi_han:
            ra += t
    return ra


def esc(s: str) -> str:
    return html.escape(str(s), quote=True)


# ───────────────────────── DỮ LIỆU CÓ CẤU TRÚC ─────────────────────────

def _js(x, thut: int = 0) -> str:
    """Kết xuất JSON-LD tự viết, để không phụ thuộc thứ tự khoá của json.dumps.

    Thứ tự khoá cố định giúp so sánh hai lần dựng site bằng `diff`, nhờ đó biết
    chắc một thay đổi có ảnh hưởng tới dữ liệu gửi cho cỗ máy tìm kiếm hay không.
    """
    d = "  " * thut
    if isinstance(x, dict):
        if not x:
            return "{}"
        than = ",\n".join(f'{d}  "{k}": {_js(v, thut + 1)}' for k, v in x.items())
        return "{\n" + than + "\n" + d + "}"
    if isinstance(x, list):
        if not x:
            return "[]"
        than = ",\n".join(d + "  " + _js(v, thut + 1) for v in x)
        return "[\n" + than + "\n" + d + "]"
    if isinstance(x, bool):
        return "true" if x else "false"
    if isinstance(x, (int, float)):
        return str(x)
    # Chuỗi trong JSON-LD: chỉ cần thoát cho JSON, nhưng phải chặn "</script"
    # vì trình duyệt kết thúc thẻ script ngay tại đó bất kể đang ở trong chuỗi.
    s = str(x).replace("\\", "\\\\").replace('"', '\\"')
    s = s.replace("\n", " ").replace("\r", " ").replace("\t", " ")
    s = re.sub(r"</(script)", r"<\\/\1", s, flags=re.I)
    return '"' + s + '"'


def to_chuc() -> dict:
    """Khối nhận diện tổ chức, gắn ở mọi trang để gom tín hiệu về một thực thể.

    `sameAs` chỉ nên ghi những địa chỉ đang thật sự tồn tại và thật sự do GITA
    quản lý. Ghi thừa một địa chỉ không kiểm soát được là tự nối tên mình vào
    một thực thể khác.
    """
    return {
        "@type": "EducationalOrganization",
        "@id": TEN_MIEN + "/#to-chuc",
        "name": TEN_TO_CHUC,
        "alternateName": ["GITA", "Học viện GITA"],
        "slogan": KHAU_HIEU,
        "url": TEN_MIEN + "/",
        "logo": {"@type": "ImageObject",
                 "url": TEN_MIEN + "/anh/logo-gita.png",
                 "width": 470, "height": 250},
        "areaServed": {"@type": "City", "name": "Hà Nội"},
        "knowsLanguage": "vi",
    }


def duong_dan_dieu_huong(chuoi: list[tuple[str, str]]) -> dict:
    """BreadcrumbList — vệt đường dẫn hiện ngay dưới tiêu đề trong kết quả tìm kiếm."""
    return {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": ten,
             "item": TEN_MIEN + dd}
            for i, (ten, dd) in enumerate(chuoi)
        ],
    }


def hoc_lieu(ten: str, mo_ta: str, dd: str, lop: int, ngay: str,
             loai_hoc_lieu: str, mien_phi: bool = True,
             o_che: str | None = None, thoi_luong: str | None = None) -> dict:
    """LearningResource — kiểu dữ liệu đúng nhất cho một phiếu học hoặc một dạng bài."""
    d = {
        "@type": "LearningResource",
        "@id": TEN_MIEN + dd + "#hoc-lieu",
        "name": ten,
        "description": mo_ta,
        "url": TEN_MIEN + dd,
        "inLanguage": "vi",
        "learningResourceType": loai_hoc_lieu,
        "educationalLevel": f"Lớp {lop}",
        "typicalAgeRange": {3: "8-9", 4: "9-10", 5: "10-11"}[lop],
        "dateModified": ngay,
        "publisher": {"@id": TEN_MIEN + "/#to-chuc"},
        "isFamilyFriendly": True,
        "isAccessibleForFree": mien_phi,
    }
    if thoi_luong:
        d["timeRequired"] = thoi_luong
    if not mien_phi and o_che:
        # Cách Google chấp nhận cho nội dung phải trả tiền: chỉ đúng khối bị che.
        d["hasPart"] = {"@type": "WebPageElement",
                        "isAccessibleForFree": False,
                        "cssSelector": o_che}
    return d


def khoa_hoc(ten: str, mo_ta: str, dd: str, lop: int, so_buoi: int) -> dict:
    """Course — dùng cho trang trụ của một lớp và của một chuyên đề.

    Cố tình **không** gắn `aggregateRating` ở đây. Đánh giá chỉ được gắn khi có
    dữ liệu đánh giá thật, và việc gắn do `xep_danh_gia()` quyết định.
    """
    return {
        "@type": "Course",
        "@id": TEN_MIEN + dd + "#khoa-hoc",
        "name": ten,
        "description": mo_ta,
        "url": TEN_MIEN + dd,
        "inLanguage": "vi",
        "educationalLevel": f"Lớp {lop}",
        "provider": {"@id": TEN_MIEN + "/#to-chuc"},
        "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "blended",
            "courseWorkload": f"PT{so_buoi * 90 // 60}H",
        },
    }


def cau_hoi(cap: list[tuple[str, str]], dd: str) -> dict:
    """FAQPage cho khối câu hỏi thường gặp.

    Lưu ý thực tế: từ tháng 8 năm 2023 Google chỉ còn hiện kết quả mở rộng dạng
    câu hỏi cho một số ít trang cơ quan nhà nước và y tế. Vẫn đánh dấu, vì nó
    giúp cỗ máy hiểu đúng cấu trúc trang và có thể được các cỗ máy khác dùng —
    nhưng **không được hứa** rằng đánh dấu này sẽ làm kết quả tìm kiếm nở to ra.
    """
    return {
        "@type": "FAQPage",
        "@id": TEN_MIEN + dd + "#hoi-dap",
        "mainEntity": [
            {"@type": "Question", "name": h,
             "acceptedAnswer": {"@type": "Answer", "text": a}}
            for h, a in cap
        ],
    }


def xep_danh_gia(danh_gia: dict | None) -> dict | None:
    """Trả về khối `aggregateRating` **chỉ khi** có đánh giá thật đã thu thập.

    `danh_gia` là một bản ghi trong `11-seo/danh-gia/danh-gia.json`, do người
    học gửi qua biểu mẫu và do người quản trị duyệt. Không có tệp ấy thì hàm
    trả về None và trang không có ngôi sao nào.

    Vì sao làm chặt như vậy: gắn số sao tự bịa là vi phạm chính sách nội dung
    có cấu trúc của Google, và hình phạt là gỡ toàn bộ kết quả mở rộng của cả
    tên miền — mất nhiều hơn được. Ngoài ra Google không cho hiện đánh giá mà
    một tổ chức tự viết về chính mình.
    """
    if not danh_gia:
        return None
    so = int(danh_gia.get("so_luot", 0))
    diem = danh_gia.get("diem_trung_binh")
    if so < 5 or diem is None:
        # Dưới 5 lượt thì con số trung bình chưa nói lên điều gì.
        return None
    return {
        "@type": "AggregateRating",
        "ratingValue": round(float(diem), 1),
        "ratingCount": so,
        "bestRating": 5,
        "worstRating": 1,
    }


# ───────────────────────────── KHUÔN TRANG ─────────────────────────────

CSS = f"""
:root{{
  --xanh-dam:{XANH_DAM}; --xanh:{XANH}; --xanh-sang:{XANH_SANG}; --do:{DO};
  --nen:#FDFCFA; --nen-2:#F3F5F8; --vien:#DCE3EC;
  --chu:#141A22; --chu-nhat:#54606F; --chu-tren-dam:#FFFFFF;
  --do-doc:#C4181E;
}}
@media (prefers-color-scheme:dark){{
  :root:not([data-theme="light"]){{
    --xanh-dam:#8FBEE8; --xanh:#6FA8DC; --xanh-sang:#4A7FB0; --do:#FF8E93;
    --nen:#10151C; --nen-2:#19202A; --vien:#2C3644;
    --chu:#E9EEF5; --chu-nhat:#9DABBC; --chu-tren-dam:#0C1118;
    --do-doc:#FF8E93;
  }}
}}
:root[data-theme="dark"]{{
  --xanh-dam:#8FBEE8; --xanh:#6FA8DC; --xanh-sang:#4A7FB0; --do:#FF8E93;
  --nen:#10151C; --nen-2:#19202A; --vien:#2C3644;
  --chu:#E9EEF5; --chu-nhat:#9DABBC; --chu-tren-dam:#0C1118;
  --do-doc:#FF8E93;
}}
*{{box-sizing:border-box}}
html{{-webkit-text-size-adjust:100%}}
body{{margin:0;background:var(--nen);color:var(--chu);
  font:16px/1.68 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  text-rendering:optimizeLegibility}}
h1,h2,h3,h4,.hieu{{font-family:Bitter,Bookman,Georgia,"Times New Roman",serif;
  font-weight:800;line-height:1.25;text-wrap:balance;color:var(--xanh-dam);margin:1.6em 0 .5em}}
h1{{font-size:clamp(1.55rem,1.1rem + 1.9vw,2.3rem);margin-top:.2em}}
h2{{font-size:clamp(1.25rem,1rem + 1vw,1.6rem);padding-bottom:.24em;
  border-bottom:2px solid var(--vien)}}
h3{{font-size:1.08rem;color:var(--chu)}}
h4{{font-size:1rem;color:var(--chu-nhat)}}
p,li{{max-width:68ch}}
a{{color:var(--xanh-dam);text-underline-offset:2px}}
a:hover{{color:var(--do-doc)}}
:focus-visible{{outline:3px solid var(--do);outline-offset:2px;border-radius:2px}}
code{{background:var(--nen-2);padding:.08em .34em;border-radius:3px;
  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.9em}}
pre{{background:var(--nen-2);border:1px solid var(--vien);border-left:3px solid var(--xanh);
  padding:.9rem 1rem;border-radius:6px;overflow-x:auto;font-size:.87rem;line-height:1.5}}
blockquote{{margin:1.2em 0;padding:.1em 0 .1em 1.1em;border-left:3px solid var(--xanh-sang);
  color:var(--chu-nhat)}}
hr{{border:0;border-top:1px solid var(--vien);margin:2em 0}}
table{{border-collapse:collapse;width:100%;font-size:.92rem;margin:1.1em 0}}
th,td{{border:1px solid var(--vien);padding:.45rem .6rem;text-align:left;vertical-align:top}}
th{{background:var(--nen-2);font-weight:700;color:var(--xanh-dam)}}
td:has(+td:last-child),table td:last-child{{font-variant-numeric:tabular-nums}}
.cuon{{overflow-x:auto;margin:1.1em 0;-webkit-overflow-scrolling:touch}}
.cuon table{{margin:0}}
.ke{{display:inline-block;min-width:5em;border-bottom:1px dotted var(--chu-nhat)}}
.y{{margin:.35em 0 .35em 1.15em}}

.dai{{max-width:960px;margin:0 auto;padding:0 1.15rem}}
header.mai{{border-bottom:1px solid var(--vien);background:var(--nen-2)}}
.mai .dai{{display:flex;gap:1rem;align-items:center;flex-wrap:wrap;padding-top:.7rem;padding-bottom:.7rem}}
.hieu-site{{display:flex;gap:.6rem;align-items:center;text-decoration:none;color:var(--xanh-dam);
  font-family:Bitter,Bookman,Georgia,serif;font-weight:800;font-size:1.02rem;letter-spacing:.01em}}
nav.chinh{{margin-left:auto;display:flex;gap:.2rem;flex-wrap:wrap}}
nav.chinh a{{padding:.34rem .6rem;border-radius:5px;text-decoration:none;
  color:var(--chu-nhat);font-size:.9rem;font-weight:600}}
nav.chinh a:hover,nav.chinh a[aria-current]{{background:var(--xanh-dam);color:var(--chu-tren-dam)}}

nav.vet{{font-size:.83rem;color:var(--chu-nhat);padding:.8rem 0 0}}
nav.vet ol{{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.3rem}}
nav.vet li:not(:last-child)::after{{content:"›";margin-left:.35rem;color:var(--vien)}}
nav.vet a{{color:var(--chu-nhat);text-decoration:none}}
nav.vet a:hover{{color:var(--xanh-dam);text-decoration:underline}}

.tom{{background:var(--nen-2);border:1px solid var(--vien);border-top:3px solid var(--xanh);
  border-radius:8px;padding:1rem 1.15rem;margin:1.4em 0}}
.tom p:first-child{{margin-top:0}} .tom p:last-child{{margin-bottom:0}}
.nhan{{display:inline-block;font-size:.74rem;font-weight:700;letter-spacing:.06em;
  text-transform:uppercase;padding:.16rem .48rem;border-radius:3px;
  background:var(--xanh-dam);color:var(--chu-tren-dam);margin-right:.35rem}}
.nhan.do{{background:var(--do)}}
.the{{display:grid;gap:.75rem;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));
  padding:0;list-style:none;margin:1.2em 0}}
.the li{{margin:0;max-width:none}}
.the a{{display:block;height:100%;padding:.8rem .9rem;border:1px solid var(--vien);
  border-left:3px solid var(--xanh);border-radius:7px;background:var(--nen-2);
  text-decoration:none;color:var(--chu)}}
.the a:hover{{border-left-color:var(--do);background:var(--nen)}}
.the b{{display:block;color:var(--xanh-dam);font-size:.97rem;margin-bottom:.15rem}}
.the span{{display:block;font-size:.83rem;color:var(--chu-nhat);line-height:1.5}}
.doi{{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;
  border-top:1px solid var(--vien);margin-top:2.2em;padding-top:.9rem;font-size:.9rem}}

.che{{border:1px dashed var(--xanh-sang);border-radius:8px;padding:1.1rem 1.2rem;
  background:var(--nen-2);margin:1.5em 0}}
.che h2{{border:0;margin-top:0;font-size:1.1rem}}

footer.chan{{border-top:1px solid var(--vien);background:var(--nen-2);margin-top:3rem;
  padding:1.5rem 0;font-size:.86rem;color:var(--chu-nhat)}}
footer.chan a{{color:var(--chu-nhat)}}
footer.chan .dai>div{{display:flex;gap:2rem;flex-wrap:wrap;justify-content:space-between}}
.nhay{{position:absolute;left:-9999px}}
.nhay:focus{{position:static;display:inline-block;padding:.5rem}}
@media print{{header.mai,nav.vet,nav.chinh,footer.chan,.the{{display:none}}}}
"""

LOGO_SVG = (
    '<svg width="30" height="30" viewBox="0 0 100 100" aria-hidden="true" focusable="false">'
    '<ellipse cx="50" cy="50" rx="46" ry="19" fill="none" stroke="currentColor" '
    'stroke-width="7" transform="rotate(-24 50 50)"/>'
    '<ellipse cx="50" cy="50" rx="46" ry="19" fill="none" stroke="' + DO + '" '
    'stroke-width="5" opacity=".85" transform="rotate(28 50 50)"/>'
    '<circle cx="50" cy="50" r="9" fill="currentColor"/></svg>'
)

MUC_CHINH = [("Lớp 3", "/toan-lop-3/"), ("Lớp 4", "/toan-lop-4/"),
             ("Lớp 5", "/toan-lop-5/"), ("Đề thi", "/de-thi/"),
             ("Đọc vị đề", "/doc-vi/"), ("Lộ trình", "/lo-trinh/"),
             ("Thi vào 6", "/thi-vao-6/")]


def trang(*, dd: str, tieu_de: str, mo_ta: str, h1: str, than: str,
          vet: list[tuple[str, str]], json_ld: list[dict], ngay: str,
          muc_dang: str = "", dan_them: str = "", tom_tat: str = "") -> str:
    """Dựng một trang HTML hoàn chỉnh, tự chứa, không cần tải thêm tệp nào."""
    ld = {"@context": "https://schema.org",
          "@graph": [to_chuc()] + json_ld}
    nav = "".join(
        '<a href="%s"%s>%s</a>' % (d, ' aria-current="page"' if d == muc_dang else "", esc(t))
        for t, d in MUC_CHINH)
    vet_html = "".join(
        f'<li><a href="{d}">{esc(t)}</a></li>' if d != dd else f"<li>{esc(t)}</li>"
        for t, d in vet)
    tt = f'<div class="tom">{tom_tat}</div>' if tom_tat else ""
    return f"""<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(tieu_de)}</title>
<meta name="description" content="{esc(mo_ta)}">
<link rel="canonical" href="{TEN_MIEN}{dd}">
<meta property="og:type" content="article">
<meta property="og:locale" content="vi_VN">
<meta property="og:site_name" content="{esc(TEN_SITE)}">
<meta property="og:title" content="{esc(tieu_de)}">
<meta property="og:description" content="{esc(mo_ta)}">
<meta property="og:url" content="{TEN_MIEN}{dd}">
<meta property="og:image" content="{TEN_MIEN}/anh/chia-se.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<style>{CSS}</style>
<script type="application/ld+json">{_js(ld)}</script>
</head>
<body>
<a class="nhay" href="#noi-dung">Bỏ qua phần đầu trang</a>
<header class="mai"><div class="dai">
  <a class="hieu-site" href="/">{LOGO_SVG}<span>MATH TIỂU HỌC 365</span></a>
  <nav class="chinh" aria-label="Mục chính">{nav}</nav>
</div></header>
<div class="dai">
<nav class="vet" aria-label="Đường dẫn"><ol>{vet_html}</ol></nav>
<main id="noi-dung">
<h1>{esc(h1)}</h1>
{tt}
{than}
{dan_them}
</main>
</div>
<footer class="chan"><div class="dai"><div>
  <div><strong>{esc(TEN_TO_CHUC)}</strong><br>{esc(KHAU_HIEU)}<br>
    <a href="/ve-chung-toi/">Về đội ngũ biên soạn</a> ·
    <a href="/quy-trinh-bien-soan/">Quy trình biên soạn</a> ·
    <a href="/danh-gia/">Đánh giá của người học</a></div>
  <div>Cập nhật {esc(ngay)}<br>Nội dung do Hội đồng chuyên môn GITA biên soạn và duyệt.</div>
</div></div></footer>
</body>
</html>"""
