# -*- coding: utf-8 -*-
"""Thang độ khó của hệ thống — **định nghĩa đo được** cho năm mức M1–M5.

Trước tệp này, năm mức chỉ có năm cái nhãn. Tệ hơn: hai nhãn ấy được chép ra
hai chỗ và lệch nhau — `build_site.py` gọi M5 là *"Điểm 10 — phân hoá"* còn
`lap/phieu.py` gọi là *"Sáng tạo · vượt ngưỡng"*. Người học đọc web một tên,
cầm phiếu ra một tên khác.

Nhưng vấn đề lớn hơn cái tên. Đo toàn kho 265 mẫu cho ra:

    mức     chữ mỗi ý   có bẫy   tư duy bậc cao   lời giải từng bước
    M1             41      48%              17%                  9%
    M2             48      58%              28%                 33%
    M3             71      71%              38%                 34%
    M4             83      68%              61%                 43%
    M5             68      85%              93%                 50%

Ba chỗ gãy nhìn thấy ngay:

* **M1 có bẫy ở gần một nửa số mẫu.** M1 là *Nhận biết* — phần mở đầu phiếu,
  chỗ để học sinh yếu lấy lại tự tin. Cài bẫy ở đó là phản tác dụng: em nào
  sập bẫy ngay bài 1 thì bỏ luôn bốn phần sau.
* **M4 tụt xuống dưới M3 ở cả hai cột bẫy và chữ mỗi ý.** Thang độ khó mà chỗ
  thứ tư lại dễ hơn chỗ thứ ba thì không còn là thang.
* **M5 ngắn hơn M4.** Bài phân hoá lẽ ra phải dài hơn, nhiều dữ kiện hơn.

Tệp này định nghĩa thang ấy **bằng con số kiểm được**, không bằng tính từ. Mỗi
mức có một khoảng cho từng đặc trưng đo được từ chính bài đã sinh ra, và
`kiem_do_kho.py` đối chiếu cả kho với bảng này. Nói "M4 khó hơn M3" mà không
có phép đo thì chỉ là một lời hứa.
"""

# ═════════════════════ NĂM MỨC CỦA LỚP 3, 4, 5 ═════════════════════
#
# `tieu_chi` là các khoảng đo được, và chúng áp cho **trung bình của cả mức**
# chứ không cho từng bài lẻ. Lý do: tải đọc của một bài phụ thuộc vào việc nó
# được viết dưới dạng phép tính trần hay dưới dạng lời văn, mà cả hai đều hợp
# lệ ở mọi mức. Ép từng bài vào một khoảng chữ sẽ buộc phải viết lại những bài
# đang tốt chỉ để chạm một con số — đó là tối ưu cho thước đo chứ không phải
# cho người học. Riêng `bay` và `td_cao` vốn đã là tỉ lệ nên đương nhiên là
# thống kê của cả mức.
#
# Các đặc trưng:
#   chu_y     — số chữ trung bình của một ý (tải đọc hiểu)
#   buoc      — số bước trong lời giải mẫu có số thật; đây là thước đo **độ đầy
#               đủ của tài liệu**, không phải độ khó, nên không vào chỉ số
#   bay       — tỉ lệ mẫu của mức ấy được phép/phải cài bẫy
#   td_cao    — tỉ lệ mẫu chạm nhãn tư duy bậc cao (TD5 khái quát, TD6 sáng tạo)
#
# Khoảng ghi dạng (tối thiểu, tối đa); `None` nghĩa là không chặn phía ấy.

MUC = {
    "M1": {
        "ten": "Nhận biết",
        "bloom": "Remember",
        "la_gi": "Nhắc lại, nhận ra, đọc đúng một khái niệm vừa học.",
        "hoc_sinh_lam_gi": "Trả lời được ngay sau khi đọc lại lý thuyết, "
                           "không phải nghĩ thêm bước nào.",
        "vai_tro": "Mở phiếu. Đây là chỗ học sinh yếu lấy lại tự tin, nên "
                   "**tuyệt đối không cài bẫy**.",
        "phut_moi_bai": 4,
        "tieu_chi": {"chu_y": (None, 60), "buoc": (0, 2),
                     "bay": (0.0, 0.0), "td_cao": (0.0, 0.25)},
        "vi_du": "Đọc số 45 300 và cho biết chữ số 4 nằm ở hàng nào.",
    },
    "M2": {
        "ten": "Thông hiểu",
        "bloom": "Understand",
        "la_gi": "Giải thích được vì sao, hoặc đổi qua lại giữa hai cách viết "
                 "của cùng một thứ.",
        "hoc_sinh_lam_gi": "Làm được một hoặc hai bước, nhưng phải hiểu chứ "
                           "không học vẹt được.",
        "vai_tro": "Củng cố. Bẫy nhẹ, và chỉ ở loại **nhắc nhở cẩn thận** "
                   "chứ chưa phải bẫy đánh lừa cách nghĩ.",
        "phut_moi_bai": 6,
        "tieu_chi": {"chu_y": (35, 80), "buoc": (0, 3),
                     "bay": (0.15, 0.45), "td_cao": (0.10, 0.40)},
        "vi_du": "Vì sao 3 m 5 cm không bằng 35 cm?",
    },
    "M3": {
        "ten": "Vận dụng",
        "bloom": "Apply",
        "la_gi": "Dùng kiến thức vào một tình huống quen thuộc, đề nói thẳng "
                 "phải làm gì.",
        "hoc_sinh_lam_gi": "Nhận ra dạng bài rồi áp đúng cách giải của dạng ấy.",
        "vai_tro": "Phần chính của phiếu. Từ đây bẫy trở thành công cụ dạy "
                   "sự cẩn thận, phải có ở quá nửa số bài.",
        "phut_moi_bai": 8,
        "tieu_chi": {"chu_y": (55, 100), "buoc": (2, None),
                     "bay": (0.55, None), "td_cao": (0.30, None)},
        "vi_du": "Một mảnh vườn dài 24 m, rộng 15 m. Tính chu vi và diện tích.",
    },
    "M4": {
        "ten": "Vận dụng cao",
        "bloom": "Analyse",
        "la_gi": "Tình huống lạ hoặc nhiều bước, đề **không nói** phải dùng "
                 "cách nào — học sinh phải tự chọn.",
        "hoc_sinh_lam_gi": "Đọc đề, gọi tên dạng, chọn phương pháp, rồi mới giải.",
        "vai_tro": "Phân loại học sinh khá và giỏi. Phải khó hơn M3 ở **mọi "
                   "cột đo được**, không được chỗ hơn chỗ kém.",
        "phut_moi_bai": 10,
        "tieu_chi": {"chu_y": (70, None), "buoc": (3, None),
                     "bay": (0.70, None), "td_cao": (0.55, None)},
        "vi_du": "Tổng hai số là 156, nếu bớt số lớn 12 đơn vị thì được số bé. "
                 "Tìm hai số.",
    },
    "M5": {
        "ten": "Phân hoá — điểm 10",
        "bloom": "Evaluate · Create",
        "la_gi": "Phải **kết hợp hai phương pháp**, hoặc tự nghĩ ra cách làm "
                 "mà chưa ai dạy.",
        "hoc_sinh_lam_gi": "Thử, nhận ra hướng sai, đổi hướng, rồi lập luận "
                           "cho người khác tin.",
        "vai_tro": "Bài lấy điểm 10 và bài luyện thi chuyên. Đây là mức duy "
                   "nhất **bắt buộc** chạm tư duy bậc cao.",
        "phut_moi_bai": 12,
        "tieu_chi": {"chu_y": (75, None), "buoc": (4, None),
                     "bay": (0.80, None), "td_cao": (0.85, None)},
        "vi_du": "Tìm số có ba chữ số, biết tổng các chữ số bằng 12 và khi đổi "
                 "chỗ chữ số hàng trăm với hàng đơn vị thì số ấy giảm 198.",
    },
}

THU_TU = ("M1", "M2", "M3", "M4", "M5")

# Tên cũ từng dùng ở hai chỗ khác nhau, giữ lại để tra ngược khi cần đối chiếu
# tài liệu đã in. Từ nay chỉ dùng `MUC[m]["ten"]`.
TEN_CU = {"M5": ("Điểm 10 — phân hoá", "Sáng tạo · vượt ngưỡng")}


# ═════════════════ HIỆU CHỈNH THEO KHỐI LỚP ═════════════════
#
# Cùng một mức nhưng ở ba lớp là ba độ khó khác nhau, vì phạm vi số và bộ phép
# tính được phép dùng khác nhau. Một bài "vận dụng cao" của lớp 3 mà bắt chia
# số thập phân là ra ngoài chương trình, còn một bài "vận dụng cao" của lớp 5
# mà chỉ cộng trong phạm vi 1 000 thì quá nhẹ.

HIEU_CHINH_LOP = {
    3: {
        "pham_vi_so": "đến 100 000",
        "phep_tinh": "cộng, trừ, nhân chia với số có một chữ số",
        "so_lon_nhat": 100_000,
        "khong_dung": ("số thập phân", "tỉ số phần trăm", "diện tích xung quanh",
                       "vận tốc"),
        "ghi_chu": "Bài M5 của lớp 3 lấy độ khó từ **số bước lập luận**, không "
                   "lấy từ độ lớn của số.",
    },
    4: {
        "pham_vi_so": "đến hàng triệu",
        "phep_tinh": "bốn phép tính với số tự nhiên; phân số cơ bản",
        "so_lon_nhat": 10_000_000,
        "khong_dung": ("tỉ số phần trăm", "vận tốc", "thể tích"),
        "ghi_chu": "Lớp 4 là chỗ trục phương pháp bắt đầu nặng hơn trục nội "
                   "dung: tổng–hiệu, tổng–tỉ, hiệu–tỉ đều vào ở đây.",
    },
    5: {
        "pham_vi_so": "số tự nhiên, phân số, số thập phân",
        "phep_tinh": "bốn phép tính trên cả ba loại số; tỉ số phần trăm",
        "so_lon_nhat": 1_000_000_000,
        "khong_dung": (),
        "ghi_chu": "Chỉ lớp 5 mới có đủ công cụ cho bài M5 kết hợp hai phương "
                   "pháp — đó là lý do phần lớn mẫu M5 nặng nằm ở lớp này.",
    },
}


# ═════════════════ BA BẬC CỦA KHỐI MẦM ═════════════════
#
# Khối Mầm **không dùng thang M1–M5**, và đó là quyết định có chủ ý. Năm mức
# của Bloom giả định người học đọc được đề và tự nhận ra mình đang ở mức nào —
# cả hai điều ấy đều không đúng với trẻ năm tuổi. Thay bằng ba bậc mô tả
# **mức độ trẻ cần người lớn giúp**, đúng cách đánh giá ba mức đang dùng.

MUC_MAM = {
    "B1": {
        "ten": "Làm quen",
        "la_gi": "Người lớn làm mẫu trước, trẻ làm theo từng bước.",
        "dau_hieu": "Trẻ làm đúng khi được nhắc, chưa tự nhớ được thứ tự việc.",
        "vai_tro": "Buổi 1 và 2 của mỗi chủ đề.",
    },
    "B2": {
        "ten": "Tự làm",
        "la_gi": "Trẻ tự làm, người lớn chỉ hỏi chứ không làm hộ.",
        "dau_hieu": "Trẻ làm đúng mà không cần nhắc, và nói được mình đã làm gì.",
        "vai_tro": "Buổi 3 của mỗi chủ đề, và buổi 4 của khối mẫu giáo.",
    },
    "B3": {
        "ten": "Thử thách",
        "la_gi": "Thêm một điều kiện lạ để trẻ phải nghĩ, không chỉ làm lại.",
        "dau_hieu": "Trẻ đoán thử, thử sai rồi đổi cách — chứ không đứng im chờ.",
        "vai_tro": "Buổi cuối của mỗi chủ đề ở lớp 1 và lớp 2. Không bắt buộc "
                   "làm đúng: mục đích là để trẻ được nghĩ, không phải để đo.",
    },
}

THU_TU_MAM = ("B1", "B2", "B3")


def khoang(muc: str, ten_do: str) -> tuple:
    """Khoảng cho phép của một đặc trưng đo được ở một mức."""
    return MUC[muc]["tieu_chi"][ten_do]


def dat_khoang(gia_tri: float, k: tuple) -> bool:
    """Giá trị có nằm trong khoảng cho phép không; `None` là không chặn."""
    lo, hi = k
    return (lo is None or gia_tri >= lo) and (hi is None or gia_tri <= hi)
