# -*- coding: utf-8 -*-
"""Thư viện mẫu bài cho khối Mầm — mẫu giáo lớn, lớp 1, lớp 2.

Mẫu ở đây khác mẫu của lớp 3–5 ở bốn chỗ, và cả bốn đều bắt nguồn từ một sự
thật: **người làm bài chưa đọc thạo.**

1. **Câu lệnh ngắn và chỉ một việc.** "Đếm rồi viết số vào ô" là hai việc, phải
   tách thành hai câu. Ở lớp 3–5 một câu lệnh ba mệnh đề là bình thường; ở đây
   nó làm trẻ dừng lại vì không nhớ hết.
2. **Có phần đọc lên cho trẻ nghe.** Trường `loi_doc` là câu người lớn nói ra
   miệng. Với khối mẫu giáo, đó mới là đề bài thật; chữ trên giấy chỉ để người
   lớn nhìn.
3. **Có đồ vật thật đi kèm.** Trường `do_dung` liệt kê thứ cần chuẩn bị. Khái
   niệm số ở tuổi này hình thành qua tay trước khi hình thành qua mắt.
4. **Không có bẫy.** Lớp 3–5 cài bẫy để rèn sự cẩn thận. Ở đây cài bẫy chỉ dạy
   trẻ rằng người lớn đang gài mình, và trẻ sẽ ngừng đoán. Ngừng đoán là ngừng
   học toán.

Mỗi mẫu vẫn giữ nguyên tắc gốc của cả hệ thống: **đáp số do mã tính ra.**
"""
from __future__ import annotations

import random

from .khung import dang_ky, hoa, luan_phien, sv

# Bối cảnh quen thuộc với trẻ Việt Nam. Cố ý không dùng bối cảnh ngoại quốc và
# không dùng đồ vật trẻ thành phố lẫn nông thôn đều khó hình dung.
DO_VAT = [("quả cam", "quả"), ("cái kẹo", "cái"), ("bông hoa", "bông"),
          ("con cá", "con"), ("quyển vở", "quyển"), ("chiếc lá", "chiếc"),
          ("viên bi", "viên"), ("quả bóng", "quả"), ("con vịt", "con"),
          ("cái bánh", "cái")]
CON_VAT = ["gà", "vịt", "mèo", "thỏ", "cá", "chim", "bướm", "ong"]
BAN = ["An", "Bi", "Bo", "Na", "Nam", "Mai", "Tí", "Tèo", "Cốm", "Bơ"]
HINH = ["hình tròn", "hình vuông", "hình tam giác", "hình chữ nhật"]
KHOI_HH = ["khối cầu", "khối trụ", "khối lập phương", "khối hộp chữ nhật"]


class BaiMam:
    """Một việc trong buổi học của khối Mầm.

    Không dùng lại lớp `Bai` của lớp 3–5 vì hai đối tượng mang thông tin khác
    nhau: `Bai` có bẫy, gợi ý ba tầng và bảng phân tích sáu cột — cả ba đều
    không có nghĩa với trẻ sáu tuổi. Đối tượng ở đây mang thứ khác: câu người
    lớn đọc lên, đồ vật cần chuẩn bị, và dấu hiệu để biết trẻ đã hiểu hay chưa.
    """

    __slots__ = ("tieu_de", "loi_doc", "y", "do_dung", "twm", "cau_hoi_twm",
                 "dau_hieu_hieu", "khi_kho", "mo_rong", "ma_mau", "mach")

    def __init__(self, tieu_de, loi_doc, y, do_dung=(), twm=(), cau_hoi_twm="",
                 dau_hieu_hieu="", khi_kho="", mo_rong="", ma_mau="", mach="S"):
        self.tieu_de = tieu_de
        self.loi_doc = loi_doc            # câu người lớn nói ra miệng
        self.y = list(y)                  # [(việc, đáp án)]
        self.do_dung = list(do_dung)      # đồ vật thật cần chuẩn bị
        self.twm = list(twm)              # đặc điểm tư duy Cambridge được nhấn
        self.cau_hoi_twm = cau_hoi_twm    # câu hỏi mở người lớn hỏi thêm
        self.dau_hieu_hieu = dau_hieu_hieu   # làm được thế này là đã hiểu
        self.khi_kho = khi_kho            # trẻ tắc thì người lớn làm gì
        self.mo_rong = mo_rong
        self.ma_mau = ma_mau
        self.mach = mach


KHO_MAM: dict[str, dict[str, list]] = {}      # KHO_MAM[khối][mã chủ đề] = [mẫu]
MA_MAM: set[str] = set()


def dang_ky_mam(ma: str, khoi: str, chu_de: tuple[str, ...], mach: str = "S",
                twm: tuple[str, ...] = ()):
    """Ghi một hàm sinh vào kho của khối Mầm.

    Một mẫu được khai cho **nhiều chủ đề** vì ở tuổi này ranh giới giữa các chủ
    đề rất mờ: đếm quả cam vừa là chủ đề đếm, vừa là chủ đề so sánh nhiều ít.
    """
    if ma in MA_MAM:
        raise ValueError(f"Mã mẫu khối Mầm bị trùng: {ma}")
    MA_MAM.add(ma)

    def bao(f):
        for cd in chu_de:
            KHO_MAM.setdefault(khoi, {}).setdefault(cd, []).append(
                {"ma": ma, "sinh": f, "mach": mach, "twm": twm})
        return f
    return bao


# ═══════════════════════════ MẪU GIÁO LỚN ═══════════════════════════

@dang_ky_mam("MM-MG-01", "MG", ("MG01", "MG02"), "S",
             ("specialising", "convincing"))
def mm_mg_01(rng):
    """Đếm đồ vật thật rồi nói số cuối cùng."""
    y = []
    for _ in range(rng.randint(3, 5)):
        n = rng.randint(2, 10)
        v, dv = rng.choice(DO_VAT)
        y.append((f"Cô đặt ra {sv(n)} {v}. Con đếm xem có mấy {dv}?", sv(n)))
    return BaiMam(
        tieu_de="Đếm rồi nói số cuối cùng",
        loi_doc="Con đếm to lên nhé, đếm xong nói cho cô số cuối cùng con đọc.",
        y=y,
        do_dung=["10 đồ vật nhỏ giống nhau: hột hạt, cúc áo, que tính hoặc kẹo"],
        twm=["specialising", "convincing"],
        cau_hoi_twm="Vì sao con biết là {} cái? — để trẻ nói ra cách mình đếm.",
        dau_hieu_hieu="Trẻ nói ngay số cuối cùng vừa đọc mà không đếm lại từ đầu. "
                      "Đó là dấu hiệu trẻ đã hiểu **số cuối cùng chính là số lượng**, "
                      "chứ không phải chỉ đọc thuộc dãy số.",
        khi_kho="Cầm tay trẻ chạm vào từng vật khi đếm. Đếm chậm, mỗi tiếng một "
                "vật. Đừng đếm hộ.",
        mo_rong="Xếp lại đồ vật thành vòng tròn rồi hỏi lại — trẻ hiểu thật sẽ "
                "không cần đếm lại.")


@dang_ky_mam("MM-MG-02", "MG", ("MG02", "MG05"), "S",
             ("characterising", "specialising"))
def mm_mg_02(rng):
    """Nối chữ số với nhóm có đúng số lượng."""
    y = []
    for n in rng.sample(range(1, 11), rng.randint(3, 5)):
        v, dv = rng.choice(DO_VAT)
        y.append((f"Ô này có {sv(n)} {v}. Con tìm thẻ số nào đặt vào ô đó?", sv(n)))
    return BaiMam(
        tieu_de="Tìm thẻ số cho đúng nhóm",
        loi_doc="Đây là các thẻ số. Con nhìn từng ô, đếm rồi đặt đúng thẻ số vào.",
        y=y,
        do_dung=["Bộ thẻ số từ 1 đến 10", "Các nhóm đồ vật đặt sẵn"],
        twm=["characterising", "specialising"],
        cau_hoi_twm="Hai ô này cùng đặt thẻ số 5, chúng giống nhau ở chỗ nào?",
        dau_hieu_hieu="Trẻ nhận ra hai nhóm khác hẳn nhau về đồ vật vẫn có thể "
                      "cùng một số — đó là bước trừu tượng hoá đầu tiên của toán.",
        khi_kho="Bớt xuống còn ba ô và ba thẻ. Đủ ít thì trẻ mới nhìn ra được.",
        mo_rong="Úp thẻ số xuống, cho trẻ tự viết số vào giấy nháp.")


@dang_ky_mam("MM-MG-03", "MG", ("MG03",), "S", ("convincing", "conjecturing"))
def mm_mg_03(rng):
    """So sánh hai nhóm bằng cách ghép đôi."""
    y = []
    for _ in range(rng.randint(3, 4)):
        a = rng.randint(3, 9)
        b = rng.randint(3, 9)
        while b == a:
            b = rng.randint(3, 9)
        c1, c2 = rng.sample(CON_VAT, 2)
        lon = c1 if a > b else c2
        y.append((f"Hàng trên có {sv(a)} con {c1}, hàng dưới có {sv(b)} con {c2}. "
                  f"Bên nào nhiều hơn?", f"{lon} nhiều hơn, hơn {sv(abs(a - b))} con"))
    return BaiMam(
        tieu_de="Bên nào nhiều hơn",
        loi_doc="Con đừng đếm vội. Con ghép một con hàng trên với một con hàng "
                "dưới, xem bên nào còn thừa ra.",
        y=y,
        do_dung=["Hai loại đồ vật khác nhau, mỗi loại 10 cái"],
        twm=["convincing", "conjecturing"],
        cau_hoi_twm="Làm sao để hai hàng bằng nhau? Có mấy cách?",
        dau_hieu_hieu="Trẻ ghép đôi để so mà không cần đếm hết cả hai hàng. Cách "
                      "so này là gốc của khái niệm nhiều hơn – ít hơn.",
        khi_kho="Xếp hai hàng thẳng cột nhau, mỗi con hàng trên đúng trên một con "
                "hàng dưới. Nhìn là thấy ngay bên nào thừa.",
        mo_rong="Cố ý xếp hàng ít nhưng dài hơn để trẻ khỏi nhầm dài với nhiều.")


@dang_ky_mam("MM-MG-04", "MG", ("MG04",), "S", ("conjecturing", "generalising"))
def mm_mg_04(rng):
    """Tách một nhóm thành hai nhóm nhỏ bằng nhiều cách."""
    y = []
    for _ in range(rng.randint(3, 4)):
        n = rng.randint(4, 10)
        v, dv = rng.choice(DO_VAT)
        cach = [f"{i} và {n - i}" for i in range(1, n)]
        y.append((f"Con có {sv(n)} {v}. Con chia vào hai cái đĩa, mỗi đĩa phải có "
                  f"ít nhất một cái. Con tìm được mấy cách chia?",
                  f"{sv(n - 1)} cách: " + ", ".join(cach)))
    return BaiMam(
        tieu_de="Chia vào hai đĩa",
        loi_doc="Con chia số đồ này vào hai cái đĩa. Chia xong đếm lại tổng xem "
                "có còn đúng bằng lúc đầu không.",
        y=y,
        do_dung=["Hai cái đĩa hoặc hai tờ giấy", "10 đồ vật nhỏ giống nhau"],
        twm=["conjecturing", "generalising"],
        cau_hoi_twm="Chia kiểu nào thì gộp lại vẫn bằng lúc đầu à? Lúc nào cũng thế?",
        dau_hieu_hieu="Trẻ nói được rằng chia kiểu gì thì gộp lại vẫn bằng số cũ. "
                      "Đó chính là tính bảo toàn của số, và là nền của phép cộng.",
        khi_kho="Làm mẫu một cách rồi hỏi còn cách nào khác không. Đừng liệt kê hộ.",
        mo_rong="Chia vào ba đĩa — số cách nhiều hơn hẳn, trẻ sẽ cần cách ghi lại.")


@dang_ky_mam("MM-MG-05", "MG", ("MG06", "MG07"), "H",
             ("classifying", "characterising"))
def mm_mg_05(rng):
    """Gọi tên hình, tìm hình ấy quanh mình."""
    y = []
    for h in rng.sample(HINH + KHOI_HH, rng.randint(3, 5)):
        goi_y = {"hình tròn": "cái đĩa, bánh xe, mặt đồng hồ",
                 "hình vuông": "viên gạch, khăn mùi soa, mặt xúc xắc",
                 "hình tam giác": "cái nón, mái nhà, miếng bánh cắt",
                 "hình chữ nhật": "cửa ra vào, quyển vở, cái bảng",
                 "khối cầu": "quả bóng, viên bi, quả cam",
                 "khối trụ": "lon nước, cái cốc, cây bút chì",
                 "khối lập phương": "viên xúc xắc, hộp quà vuông",
                 "khối hộp chữ nhật": "hộp bánh, viên gạch, quyển sách dày"}[h]
        y.append((f"Đây là {h}. Con tìm quanh nhà một đồ vật có dạng {h}.",
                  f"ví dụ: {goi_y}"))
    return BaiMam(
        tieu_de="Tìm hình quanh mình",
        loi_doc="Con nhìn quanh phòng xem có cái gì giống hình này không. Tìm "
                "được thì chỉ cho cô.",
        y=y,
        do_dung=["Bộ hình phẳng và khối bằng gỗ hoặc bìa"],
        twm=["classifying", "characterising"],
        cau_hoi_twm="Mấy đồ vật con vừa tìm giống nhau ở chỗ nào?",
        dau_hieu_hieu="Trẻ tìm được đồ vật ở tư thế khác — quả bóng lăn, hộp nằm "
                      "nghiêng — mà vẫn gọi đúng tên khối.",
        khi_kho="Đưa vật thật vào tay trẻ cho sờ. Sờ được góc và cạnh thì gọi tên "
                "dễ hơn nhiều so với chỉ nhìn.",
        mo_rong="Bịt mắt, cho trẻ sờ và đoán tên khối.")


@dang_ky_mam("MM-MG-06", "MG", ("MG09",), "S", ("conjecturing", "generalising"))
def mm_mg_06(rng):
    """Xếp tiếp dãy theo quy luật."""
    y = []
    for _ in range(rng.randint(3, 4)):
        so_loai = rng.choice([2, 2, 3])
        bo = rng.sample(["đỏ", "xanh", "vàng", "trắng"], so_loai)
        dai = so_loai * rng.randint(2, 3)
        day = [bo[i % so_loai] for i in range(dai)]
        tiep = bo[dai % so_loai]
        y.append((" – ".join(day) + " – … Con đoán xem tiếp theo là màu gì?", tiep))
    return BaiMam(
        tieu_de="Đoán tiếp dãy",
        loi_doc="Cô xếp một dãy. Con nhìn kỹ rồi đoán xem cái tiếp theo là gì.",
        y=y,
        do_dung=["Hột hạt hoặc khối gỗ nhiều màu"],
        twm=["conjecturing", "generalising"],
        cau_hoi_twm="Vì sao con đoán là màu đó? Con nói quy luật thành một câu xem.",
        dau_hieu_hieu="Trẻ nói được quy luật thành lời — “cứ đỏ rồi xanh rồi lại "
                      "đỏ” — chứ không chỉ chỉ tay vào màu đúng.",
        khi_kho="Đọc to cả dãy theo nhịp, vỗ tay theo. Nhịp điệu giúp trẻ nghe ra "
                "quy luật trước khi nhìn ra.",
        mo_rong="Cho trẻ tự nghĩ một quy luật rồi đố lại người lớn — trẻ thích "
                "phần này nhất và nó khó hơn hẳn phần đoán.")


@dang_ky_mam("MM-MG-07", "MG", ("MG08",), "H", ("specialising", "convincing"))
def mm_mg_07(rng):
    """Định hướng không gian so với bản thân."""
    y = []
    HUONG = [("phía trên", "trên đầu con"), ("phía dưới", "dưới chân con"),
             ("phía trước", "trước mặt con"), ("phía sau", "sau lưng con"),
             ("bên phải", "tay phải con"), ("bên trái", "tay trái con")]
    for h, goi in rng.sample(HUONG, rng.randint(3, 5)):
        y.append((f"Con đặt quả bóng ở {h} mình. Rồi kể tên một đồ vật đang ở {h} "
                  f"con.", f"vật nào ở {goi}"))
    return BaiMam(
        tieu_de="Trên – dưới, trước – sau, phải – trái",
        loi_doc="Con đứng dậy nhé. Cô nói hướng nào thì con đặt quả bóng ở hướng ấy.",
        y=y,
        do_dung=["Một quả bóng hoặc một con thú bông"],
        twm=["specialising", "convincing"],
        cau_hoi_twm="Nếu con quay người lại thì quả bóng còn ở bên phải con nữa không?",
        dau_hieu_hieu="Trẻ nhận ra phải – trái **đổi theo hướng mình đứng**, còn "
                      "trên – dưới thì không đổi. Đây là chỗ khó thật của chủ đề.",
        khi_kho="Buộc một sợi dây màu vào cổ tay phải làm dấu. Bỏ dây khi trẻ đã quen.",
        mo_rong="Đứng đối diện nhau rồi hỏi tay phải của cô ở phía nào của con.")


@dang_ky_mam("MM-MG-08", "MG", ("MG10",), "T", ("classifying", "critiquing"))
def mm_mg_08(rng):
    """Đo bằng đơn vị tự chọn rồi ghi vào bảng đếm."""
    y = []
    VAT = ["cái bàn", "quyển sách", "cái ghế", "tấm thảm", "cửa ra vào"]
    DV = ["gang tay", "bước chân", "que tính", "bàn chân"]
    for v in rng.sample(VAT, rng.randint(3, 4)):
        d = rng.choice(DV)
        y.append((f"Con đo chiều dài {v} bằng {d} của con. Được mấy {d}?",
                  f"trẻ tự đo và ghi lại — không có đáp số cố định"))
    return BaiMam(
        tieu_de="Đo bằng gang tay và bước chân",
        loi_doc="Con đo bằng gang tay của con nhé. Nhớ đặt sát nhau, không chừa "
                "khoảng trống.",
        y=y,
        do_dung=["Bảng có sẵn ô để ghi", "Que tính"],
        twm=["classifying", "critiquing"],
        cau_hoi_twm="Con đo được 8 gang, cô đo được 5 gang, cùng cái bàn ấy. Vì "
                    "sao lại khác nhau?",
        dau_hieu_hieu="Trẻ nhận ra kết quả đo phụ thuộc vào đơn vị dùng để đo. "
                      "Đó chính là lý do loài người cần một đơn vị chung, và là "
                      "cửa vào của xăng-ti-mét ở lớp 1.",
        khi_kho="Đo cùng trẻ một lần, đếm to từng gang.",
        mo_rong="Hỏi muốn hai người đo ra cùng một số thì phải làm sao.")


# ═══════════════════════════════ LỚP 1 ═══════════════════════════════

@dang_ky_mam("MM-L1-01", "L1", ("L101", "L105", "L107"), "S",
             ("specialising", "characterising"))
def mm_l1_01(rng):
    """Đếm, đọc, viết, so sánh số."""
    y = []
    tran = rng.choice([10, 20, 100])
    for _ in range(rng.randint(4, 6)):
        a, b = rng.randint(1, tran), rng.randint(1, tran)
        while b == a:
            b = rng.randint(1, tran)
        dau = ">" if a > b else "<"
        y.append((f"Điền dấu >, < hoặc = : {sv(a)} … {sv(b)}", dau))
    return BaiMam(
        tieu_de=f"So sánh số trong phạm vi {sv(tran)}",
        loi_doc="Con đọc to hai số rồi mới điền dấu.",
        y=y, mach="S",
        do_dung=["Que tính hoặc bảng số 100"],
        twm=["specialising", "characterising"],
        cau_hoi_twm="Số nào cũng so được như thế à? Con nói cách so của con xem.",
        dau_hieu_hieu="Trẻ so bằng cách nhìn hàng chục trước rồi mới nhìn hàng "
                      "đơn vị, không phải đếm từ 1 lên.",
        khi_kho="Dùng bảng số 100: số nào ở trên hoặc ở bên trái thì bé hơn.",
        mo_rong="Cho ba số, hỏi số nào lớn nhất, rồi xếp cả ba theo thứ tự.")


@dang_ky_mam("MM-L1-02", "L1", ("L102", "L103", "L113"), "S",
             ("conjecturing", "convincing"))
def mm_l1_02(rng):
    """Cộng trừ trong phạm vi 10 gắn với tình huống thật."""
    y = []
    for kieu in luan_phien(rng, ["cong", "tru"], rng.randint(4, 6)):
        v, dv = rng.choice(DO_VAT)
        b = rng.choice(BAN)
        if kieu == "cong":
            a, c = rng.randint(1, 5), rng.randint(1, 5)
            y.append((f"{hoa(b)} có {sv(a)} {v}, mẹ cho thêm {sv(c)} {dv}. "
                      f"{hoa(b)} có tất cả mấy {dv}?", f"{sv(a + c)} {dv}"))
        else:
            a = rng.randint(4, 10)
            c = rng.randint(1, a - 1)
            y.append((f"{hoa(b)} có {sv(a)} {v}, cho bạn {sv(c)} {dv}. "
                      f"{hoa(b)} còn lại mấy {dv}?", f"{sv(a - c)} {dv}"))
    return BaiMam(
        tieu_de="Thêm vào và bớt đi",
        loi_doc="Con lấy que tính ra làm theo lời cô kể, rồi mới viết phép tính.",
        y=y, mach="S",
        do_dung=["10 que tính"],
        twm=["conjecturing", "convincing"],
        cau_hoi_twm="Con biết 3 + 2 = 5 rồi. Vậy 2 + 3 bằng mấy? Vì sao con biết ngay?",
        dau_hieu_hieu="Trẻ nhận ra đổi chỗ hai số trong phép cộng thì kết quả "
                      "không đổi, và dùng được điều đó để tính nhanh hơn.",
        khi_kho="Làm bằng que tính trước, viết phép tính sau. Đừng bắt viết trước.",
        mo_rong="Cho sẵn phép tính, bảo trẻ tự nghĩ ra một câu chuyện hợp với nó.")


@dang_ky_mam("MM-L1-03", "L1", ("L108",), "S", ("improving", "critiquing"))
def mm_l1_03(rng):
    """Cộng trừ không nhớ trong phạm vi 100."""
    y = []
    for kieu in luan_phien(rng, ["cong", "tru"], rng.randint(4, 6)):
        if kieu == "cong":
            a = rng.randrange(10, 90)
            b = rng.randrange(1, min(99 - a, 89) + 1)
            while (a % 10) + (b % 10) > 9:      # không nhớ
                b = rng.randrange(1, min(99 - a, 89) + 1)
            y.append((f"Đặt tính rồi tính: {sv(a)} + {sv(b)}", sv(a + b)))
        else:
            a = rng.randrange(20, 100)
            b = rng.randrange(1, a)
            while (a % 10) < (b % 10):          # không nhớ
                b = rng.randrange(1, a)
            y.append((f"Đặt tính rồi tính: {sv(a)} − {sv(b)}", sv(a - b)))
    return BaiMam(
        tieu_de="Đặt tính rồi tính",
        loi_doc="Con viết thẳng cột: hàng đơn vị dưới hàng đơn vị, hàng chục dưới "
                "hàng chục.",
        y=y, mach="S",
        do_dung=["Giấy ô li"],
        twm=["improving", "critiquing"],
        cau_hoi_twm="Có phép nào con tính nhẩm được luôn không cần đặt tính không?",
        dau_hieu_hieu="Trẻ tự nhẩm được các phép có số tròn chục thay vì đặt tính "
                      "hết — đó là dấu hiệu bắt đầu chọn cách làm, không làm máy móc.",
        khi_kho="Kẻ sẵn hai cột trên giấy ô li cho trẻ điền vào.",
        mo_rong="Đưa một bài đặt tính sai cột, hỏi trẻ tìm chỗ sai.")


@dang_ky_mam("MM-L1-04", "L1", ("L104", "L111"), "H",
             ("classifying", "critiquing"))
def mm_l1_04(rng):
    """Đếm hình trong một hình ghép."""
    y = []
    for _ in range(rng.randint(3, 5)):
        h = rng.choice(HINH)
        n = rng.randint(2, 6)
        y.append((f"Trong hình bên có mấy {h}?", f"{sv(n)} {h}"))
    return BaiMam(
        tieu_de="Đếm hình trong hình ghép",
        loi_doc="Con dùng bút chì đánh dấu từng hình đã đếm để khỏi đếm sót hoặc "
                "đếm hai lần.",
        y=y, mach="H",
        do_dung=["Bút chì màu"],
        twm=["classifying", "critiquing"],
        cau_hoi_twm="Con đếm thế nào để chắc chắn không sót cái nào?",
        dau_hieu_hieu="Trẻ đếm theo một trật tự — trái sang phải, trên xuống dưới "
                      "— thay vì đếm lung tung. Trật tự khi đếm là kỹ năng, không "
                      "phải chuyện tự nhiên biết.",
        khi_kho="Đánh dấu hộ hai hình đầu tiên rồi để trẻ làm tiếp.",
        mo_rong="Hỏi cả số hình lớn tạo bởi nhiều hình nhỏ ghép lại.")


@dang_ky_mam("MM-L1-05", "L1", ("L106", "L110"), "H",
             ("critiquing", "improving"))
def mm_l1_05(rng):
    """Đo độ dài bằng xăng-ti-mét và xem giờ đúng."""
    y = []
    for kieu in luan_phien(rng, ["do", "gio"], rng.randint(4, 6)):
        if kieu == "do":
            n = rng.randint(3, 20)
            y.append((f"Đoạn thẳng dài {sv(n)} cm. Con vẽ một đoạn thẳng dài đúng "
                      f"như thế.", f"{sv(n)} cm"))
        else:
            g = rng.randint(1, 12)
            y.append((f"Kim ngắn chỉ số {sv(g)}, kim dài chỉ số 12. Mấy giờ?",
                      f"{sv(g)} giờ"))
    return BaiMam(
        tieu_de="Đo độ dài và xem giờ đúng",
        loi_doc="Khi đo, con nhớ đặt vạch số 0 của thước đúng vào đầu đoạn thẳng.",
        y=y, mach="H",
        do_dung=["Thước có vạch xăng-ti-mét", "Mô hình đồng hồ kim"],
        twm=["critiquing", "improving"],
        cau_hoi_twm="Bạn đặt thước từ vạch số 1 rồi đọc số cuối. Bạn làm thế đúng "
                    "hay sai? Vì sao?",
        dau_hieu_hieu="Trẻ đặt vạch 0 vào đầu đoạn thẳng mà không cần nhắc, và "
                      "nhận ra lỗi khi thấy người khác đặt sai.",
        khi_kho="Đo cùng trẻ, giữ hộ đầu thước.",
        mo_rong="Cho một đoạn thẳng, hỏi trẻ ước lượng trước rồi mới đo.")


@dang_ky_mam("MM-L1-06", "L1", ("L109", "L112", "L114"), "S",
             ("convincing", "conjecturing"))
def mm_l1_06(rng):
    """Bài toán có lời văn một phép tính, và dãy số có quy luật."""
    y = []
    for kieu in luan_phien(rng, ["loi_van", "day_so"], rng.randint(4, 6)):
        if kieu == "loi_van":
            v, dv = rng.choice(DO_VAT)
            b1, b2 = rng.sample(BAN, 2)
            a, c = rng.randint(2, 20), rng.randint(2, 20)
            y.append((f"{hoa(b1)} có {sv(a)} {v}. {hoa(b2)} có {sv(c)} {dv}. "
                      f"Cả hai bạn có tất cả mấy {dv}?",
                      f"{sv(a + c)} {dv}"))
        else:
            d = rng.choice([1, 2, 5, 10])
            dau = rng.randint(1, 20)
            day = [dau + i * d for i in range(5)]
            y.append((", ".join(sv(x) for x in day[:4]) + ", … Số tiếp theo là số nào?",
                      sv(day[4])))
    return BaiMam(
        tieu_de="Bài toán có lời văn và dãy số",
        loi_doc="Con đọc đề hai lần. Lần đầu đọc hiểu, lần sau gạch chân câu hỏi.",
        y=y, mach="S",
        do_dung=["Bút chì để gạch chân"],
        twm=["convincing", "conjecturing"],
        cau_hoi_twm="Con nghĩ dãy này cứ thế mãi thì số thứ mười là số nào?",
        dau_hieu_hieu="Trẻ viết được phép tính **và** câu trả lời, không chỉ viết "
                      "mỗi đáp số. Với dãy số, trẻ nói được khoảng cách giữa hai "
                      "số liền nhau.",
        khi_kho="Đọc đề hộ trẻ, rồi hỏi lại đề cho biết gì, đề hỏi gì.",
        mo_rong="Cho đáp số trước, bảo trẻ tự đặt một đề toán hợp với đáp số ấy.")


# ═══════════════════════════════ LỚP 2 ═══════════════════════════════

@dang_ky_mam("MM-L2-01", "L2", ("L201", "L202", "L203", "L208"), "S",
             ("improving", "critiquing"))
def mm_l2_01(rng):
    """Cộng trừ có nhớ trong phạm vi 100 và 1 000."""
    y = []
    tran = rng.choice([100, 100, 1000])
    for kieu in luan_phien(rng, ["cong", "tru"], rng.randint(4, 6)):
        if kieu == "cong":
            a = rng.randrange(tran // 10, tran - 10)
            b = rng.randrange(10, tran - a)
            y.append((f"Đặt tính rồi tính: {sv(a)} + {sv(b)}", sv(a + b)))
        else:
            a = rng.randrange(tran // 5, tran)
            b = rng.randrange(10, a)
            y.append((f"Đặt tính rồi tính: {sv(a)} − {sv(b)}", sv(a - b)))
    return BaiMam(
        tieu_de=f"Cộng trừ có nhớ trong phạm vi {sv(tran)}",
        loi_doc="Nhớ sang hàng nào thì ghi số nhớ nhỏ ngay trên hàng ấy.",
        y=y, mach="S",
        do_dung=["Giấy ô li"],
        twm=["improving", "critiquing"],
        cau_hoi_twm="Làm sao biết kết quả của con đúng mà không cần tính lại?",
        dau_hieu_hieu="Trẻ tự thử lại bằng phép tính ngược — lấy tổng trừ đi một "
                      "số hạng phải ra số hạng kia.",
        khi_kho="Tách thành hai bước: cộng hàng đơn vị trước, ghi nhớ, rồi mới "
                "cộng hàng chục.",
        mo_rong="Đưa một bài làm sẵn có lỗi quên nhớ, cho trẻ tìm ra chỗ sai.")


@dang_ky_mam("MM-L2-02", "L2", ("L205", "L206"), "S",
             ("generalising", "specialising"))
def mm_l2_02(rng):
    """Bảng nhân và bảng chia 2, 5 — đúng phạm vi chương trình lớp 2."""
    y = []
    for kieu in luan_phien(rng, ["nhan", "chia", "y_nghia"], rng.randint(4, 6)):
        b = rng.choice([2, 5])
        k = rng.randint(1, 10)
        if kieu == "nhan":
            y.append((f"{sv(b)} × {sv(k)} = …", sv(b * k)))
        elif kieu == "chia":
            y.append((f"{sv(b * k)} : {sv(b)} = …", sv(k)))
        else:
            y.append((f"Viết phép nhân thay cho phép cộng: "
                      + " + ".join([sv(b)] * k), f"{sv(b)} × {sv(k)} = {sv(b * k)}"))
    return BaiMam(
        tieu_de="Bảng nhân, bảng chia 2 và 5",
        loi_doc="Con đọc to bảng nhân một lượt trước khi làm.",
        y=y, mach="S",
        do_dung=["Que tính xếp thành nhóm bằng nhau"],
        twm=["generalising", "specialising"],
        cau_hoi_twm="Con biết 2 × 6 rồi. Vậy 6 × 2 bằng mấy? Có phải lúc nào cũng thế không?",
        dau_hieu_hieu="Trẻ hiểu phép nhân là cộng các số hạng bằng nhau, và dùng "
                      "được phép nhân đã thuộc để suy ra phép chia tương ứng.",
        khi_kho="Xếp que tính thành từng nhóm rồi đếm — thấy được mới nhớ được.",
        mo_rong="Hỏi 2 × 11, một phép ngoài bảng, xem trẻ có tự cộng thêm 2 không.")


@dang_ky_mam("MM-L2-03", "L2", ("L204", "L207"), "S",
             ("convincing", "conjecturing"))
def mm_l2_03(rng):
    """Bài toán nhiều hơn, ít hơn một số đơn vị."""
    y = []
    for kieu in luan_phien(rng, ["nhieu_hon", "it_hon"], rng.randint(4, 5)):
        v, dv = rng.choice(DO_VAT)
        b1, b2 = rng.sample(BAN, 2)
        a = rng.randint(12, 80)
        d = rng.randint(3, 20)
        if kieu == "nhieu_hon":
            y.append((f"{hoa(b1)} có {sv(a)} {v}. {hoa(b2)} có nhiều hơn {b1} "
                      f"{sv(d)} {dv}. Hỏi {b2} có mấy {dv}?", f"{sv(a + d)} {dv}"))
        else:
            y.append((f"{hoa(b1)} có {sv(a)} {v}. {hoa(b2)} có ít hơn {b1} "
                      f"{sv(d)} {dv}. Hỏi {b2} có mấy {dv}?", f"{sv(a - d)} {dv}"))
    return BaiMam(
        tieu_de="Nhiều hơn, ít hơn một số đơn vị",
        loi_doc="Con vẽ hai đoạn thẳng: một đoạn cho bạn thứ nhất, một đoạn cho "
                "bạn thứ hai. Đoạn nào dài hơn?",
        y=y, mach="S",
        do_dung=["Thước kẻ để vẽ sơ đồ đoạn thẳng"],
        twm=["convincing", "conjecturing"],
        cau_hoi_twm="Nhìn sơ đồ con vẽ, làm sao biết phải cộng hay phải trừ?",
        dau_hieu_hieu="Trẻ vẽ sơ đồ trước rồi mới chọn phép tính, thay vì đoán "
                      "phép tính từ chữ “nhiều hơn” một cách máy móc. Đây là gốc "
                      "của toàn bộ toán có lời văn ở lớp trên.",
        khi_kho="Vẽ hộ đoạn thẳng thứ nhất, để trẻ vẽ đoạn thứ hai dài hơn hay "
                "ngắn hơn.",
        mo_rong="Đổi đề thành “Bạn thứ hai có 40, nhiều hơn bạn thứ nhất 8” — lúc "
                "này chữ nhiều hơn lại ứng với phép trừ.")


@dang_ky_mam("MM-L2-04", "L2", ("L209", "L210", "L213"), "H",
             ("conjecturing", "critiquing"))
def mm_l2_04(rng):
    """Đơn vị đo độ dài, khối lượng, dung tích, và xem đồng hồ."""
    y = []
    for kieu in luan_phien(rng, ["doi_dai", "khoi_luong", "gio"],
                           rng.randint(4, 6)):
        if kieu == "doi_dai":
            n = rng.randint(1, 9)
            y.append((f"{sv(n)} dm = … cm", f"{sv(n * 10)} cm"))
        elif kieu == "khoi_luong":
            a, b = rng.randint(2, 20), rng.randint(2, 20)
            y.append((f"Bao gạo nặng {sv(a)} kg, bao ngô nặng {sv(b)} kg. "
                      f"Cả hai bao nặng mấy ki-lô-gam?", f"{sv(a + b)} kg"))
        else:
            g = rng.randint(1, 12)
            ruoi = rng.choice([True, False])
            y.append((f"Kim ngắn ở giữa số {sv(g)} và số {sv(g % 12 + 1)}, kim dài "
                      f"chỉ số 6. Mấy giờ?" if ruoi else
                      f"Kim ngắn chỉ số {sv(g)}, kim dài chỉ số 12. Mấy giờ?",
                      f"{sv(g)} giờ 30 phút" if ruoi else f"{sv(g)} giờ"))
    return BaiMam(
        tieu_de="Đơn vị đo và xem đồng hồ",
        loi_doc="Con nhớ 1 đề-xi-mét bằng 10 xăng-ti-mét, và kim dài chỉ số 6 là "
                "đúng nửa giờ.",
        y=y, mach="H",
        do_dung=["Thước mét", "Cân đĩa", "Mô hình đồng hồ"],
        twm=["conjecturing", "critiquing"],
        cau_hoi_twm="Con đoán cái bàn này dài khoảng mấy đề-xi-mét? Đoán xong rồi "
                    "mình đo thử xem gần chưa.",
        dau_hieu_hieu="Trẻ ước lượng được trước khi đo, và ước lượng ngày càng "
                      "gần kết quả thật. Ước lượng là kỹ năng riêng, phải luyện.",
        khi_kho="Cho trẻ cầm thước 1 dm để có cảm giác về độ dài ấy.",
        mo_rong="Hỏi những vật nào trong nhà nặng khoảng 1 kg.")


@dang_ky_mam("MM-L2-05", "L2", ("L214", "L215"), "T",
             ("classifying", "characterising"))
def mm_l2_05(rng):
    """Thu thập, phân loại, kiểm đếm và đọc biểu đồ tranh."""
    loai = rng.sample(["quả cam", "quả táo", "quả chuối", "quả xoài", "quả lê"],
                      rng.randint(3, 4))
    so = [rng.randint(2, 9) for _ in loai]
    bang = " · ".join(f"{l}: {sv(n)}" for l, n in zip(loai, so))
    nhieu = loai[so.index(max(so))]
    it = loai[so.index(min(so))]
    y = [
        (f"Bảng kiểm đếm: {bang}. Loại nào nhiều nhất?", nhieu),
        (f"Loại nào ít nhất?", it),
        (f"Có tất cả bao nhiêu quả?", sv(sum(so))),
        (f"{hoa(nhieu)} nhiều hơn {it} mấy quả?", sv(max(so) - min(so))),
    ]
    if len(loai) >= 4:
        y.append((f"Nếu mỗi hình vẽ trong biểu đồ tranh thay cho 1 quả thì hàng "
                  f"{nhieu} vẽ mấy hình?", sv(max(so))))
    return BaiMam(
        tieu_de="Bảng kiểm đếm và biểu đồ tranh",
        loi_doc="Con đọc kỹ bảng trước khi trả lời. Mỗi câu hỏi hỏi một điều khác nhau.",
        y=y, mach="T",
        do_dung=["Giấy kẻ ô để vẽ biểu đồ tranh"],
        twm=["classifying", "characterising"],
        cau_hoi_twm="Nhìn bảng này con thấy điều gì đáng chú ý? Con kể cho cô nghe.",
        dau_hieu_hieu="Trẻ trả lời đúng câu hỏi được hỏi, không đọc bừa một con số "
                      "trong bảng. Đây là lỗi mất điểm phổ biến nhất của cả mạch "
                      "Thống kê ở tiểu học.",
        khi_kho="Che bớt các cột chưa cần, chỉ để lại cột đang hỏi.",
        mo_rong="Cho trẻ tự đi kiểm đếm một thứ có thật trong nhà rồi vẽ biểu đồ.")


@dang_ky_mam("MM-L2-06", "L2", ("L216", "L211", "L212"), "T",
             ("conjecturing", "convincing"))
def mm_l2_06(rng):
    """Chắc chắn – có thể – không thể, và hình học cơ bản."""
    SU_KIEN = [
        ("Ngày mai mặt trời mọc ở hướng đông", "chắc chắn"),
        ("Ngày mai trời mưa", "có thể"),
        ("Con mèo biết nói tiếng người", "không thể"),
        ("Tháng sau có ngày thứ Hai", "chắc chắn"),
        ("Bốc được viên bi đỏ từ hộp chỉ toàn bi xanh", "không thể"),
        ("Bốc được viên bi đỏ từ hộp có cả bi đỏ và bi xanh", "có thể"),
        ("Một năm có 12 tháng", "chắc chắn"),
        ("Hôm nay con được điểm 10", "có thể"),
    ]
    y = [(f"“{s}” — chắc chắn, có thể hay không thể?", k)
         for s, k in rng.sample(SU_KIEN, rng.randint(4, 6))]
    return BaiMam(
        tieu_de="Chắc chắn, có thể, không thể",
        loi_doc="Con nghĩ kỹ rồi chọn một trong ba từ: chắc chắn, có thể, không thể.",
        y=y, mach="T",
        do_dung=["Một hộp bi có bi hai màu để thử thật"],
        twm=["conjecturing", "convincing"],
        cau_hoi_twm="Vì sao con chọn từ đó? Con cho cô một ví dụ nữa cùng loại.",
        dau_hieu_hieu="Trẻ phân biệt được “không thể” với “khó xảy ra”. Đây là chỗ "
                      "nhầm nhiều nhất, và cũng là gốc của khái niệm xác suất sau này.",
        khi_kho="Thử thật bằng hộp bi. Bốc mấy lần cho trẻ thấy.",
        mo_rong="Cho trẻ tự nghĩ ba câu, mỗi câu một mức, rồi đố lại người lớn.")


# ═══════════════════════════════════════════════════════════════════
#  ĐỢT MẪU THỨ HAI
#
#  Đợt đầu đủ phủ mọi chủ đề nhưng còn mỏng: tám mẫu cho bốn mươi buổi mẫu giáo
#  nghĩa là mỗi mẫu quay lại hai mươi lần. Số liệu có khác nhau, nhưng *kiểu
#  việc* thì lặp, và trẻ nhận ra điều đó nhanh hơn người lớn tưởng.
#
#  Đợt này thêm mẫu theo **kiểu hoạt động** chứ không chỉ theo nội dung: trò
#  chơi vận động, việc làm bằng tay, câu đố, kể chuyện. Bốn hoạt động của một
#  buổi nhờ đó khác nhau về chất chứ không chỉ khác đề bài.
# ═══════════════════════════════════════════════════════════════════

@dang_ky_mam("MM-MG-09", "MG", ("MG01", "MG02", "MG05"), "S",
             ("specialising", "convincing"))
def mm_mg_09(rng):
    """Trò chơi vận động: nhảy, vỗ tay, bước chân theo số."""
    y = []
    DONG = [("nhảy", "cái"), ("vỗ tay", "cái"), ("giậm chân", "cái"),
            ("gật đầu", "cái"), ("bước lên phía trước", "bước")]
    for dong, dv in rng.sample(DONG, rng.randint(3, 4)):
        n = rng.randint(2, 9)
        y.append((f"Con {dong} đúng {sv(n)} {dv} nhé. Đếm to lên.", sv(n)))
    return BaiMam(
        tieu_de="Nhảy và đếm",
        loi_doc="Mình chơi trò làm theo số nhé. Cô nói số mấy thì con làm đúng "
                "chừng ấy lần, vừa làm vừa đếm to.",
        y=y,
        do_dung=["Chỗ trống để trẻ đứng dậy vận động"],
        twm=["specialising", "convincing"],
        cau_hoi_twm="Cô nhảy 4 cái, con nhảy 4 cái. Hai đứa mình nhảy bằng nhau à?",
        dau_hieu_hieu="Trẻ dừng đúng lúc đếm tới số được yêu cầu, không nhảy thêm "
                      "vì quán tính. Đếm để **điều khiển hành động** là bước tiến "
                      "so với chỉ đọc thuộc dãy số.",
        khi_kho="Đếm cùng trẻ, vỗ tay theo nhịp. Giảm xuống số nhỏ hơn 5.",
        mo_rong="Đếm ngược: nhảy 5 cái rồi đếm 5, 4, 3, 2, 1.")


@dang_ky_mam("MM-MG-10", "MG", ("MG03", "MG07"), "H",
             ("classifying", "convincing"))
def mm_mg_10(rng):
    """Xếp ba vật theo thứ tự cao thấp, dài ngắn."""
    y = []
    BO = [("cây bút chì", "dài", "ngắn"), ("bạn trong nhà", "cao", "thấp"),
          ("quyển sách", "dày", "mỏng"), ("cái cốc", "to", "nhỏ"),
          ("sợi dây", "dài", "ngắn")]
    for v, a, b in rng.sample(BO, rng.randint(3, 4)):
        n = rng.randint(3, 4)
        y.append((f"Con tìm {sv(n)} {v} rồi xếp theo thứ tự từ {b} nhất đến "
                  f"{a} nhất.", f"trẻ tự xếp — người lớn kiểm bằng cách đặt cạnh nhau"))
    return BaiMam(
        tieu_de="Xếp theo thứ tự",
        loi_doc="Con đặt chúng cạnh nhau, chân sát một đường thẳng, rồi mới so.",
        y=y,
        do_dung=["Bút chì, sách, cốc, dây các cỡ khác nhau"],
        twm=["classifying", "convincing"],
        cau_hoi_twm="Vì sao con biết cái này dài hơn cái kia? Con chỉ cho cô xem.",
        dau_hieu_hieu="Trẻ đặt hai vật **thẳng hàng ở một đầu** rồi mới so. Không "
                      "làm bước ấy thì so sánh chỉ là đoán bằng mắt.",
        khi_kho="Bắt đầu bằng hai vật chênh nhau rõ rệt, rồi mới tăng lên ba vật.",
        mo_rong="Cho hai vật gần bằng nhau để trẻ thấy cần đặt sát mới so được.")


@dang_ky_mam("MM-MG-11", "MG", ("MG06", "MG09"), "H",
             ("classifying", "characterising"))
def mm_mg_11(rng):
    """Xếp nhóm theo một tiêu chí do trẻ tự chọn."""
    y = []
    TIEU_CHI = ["màu sắc", "hình dạng", "kích thước", "loại đồ vật"]
    for tc in rng.sample(TIEU_CHI, rng.randint(3, 4)):
        y.append((f"Con xếp các đồ vật này thành nhóm theo {tc}. Được mấy nhóm?",
                  "trẻ tự xếp — miễn là mọi vật trong một nhóm giống nhau ở "
                  f"{tc} là đúng"))
    return BaiMam(
        tieu_de="Xếp thành nhóm",
        loi_doc="Con xếp các thứ này thành từng nhóm. Xếp xong nói cho cô vì sao "
                "con xếp thế.",
        y=y,
        do_dung=["Một rổ đồ vật khác nhau về màu, hình, cỡ"],
        twm=["classifying", "characterising"],
        cau_hoi_twm="Có cách xếp nào khác không? Cùng số đồ này mà xếp kiểu khác được không?",
        dau_hieu_hieu="Trẻ xếp được **cùng một rổ đồ theo hai tiêu chí khác nhau**. "
                      "Đó là dấu hiệu trẻ hiểu tiêu chí là do mình chọn, không "
                      "phải là thuộc tính cố định của đồ vật.",
        khi_kho="Chọn hộ tiêu chí đầu tiên: “Con để tất cả cái màu đỏ vào đây”.",
        mo_rong="Người lớn xếp sẵn rồi hỏi trẻ đoán mình đã xếp theo tiêu chí gì.")


@dang_ky_mam("MM-MG-12", "MG", ("MG04", "MG10"), "T",
             ("critiquing", "conjecturing"))
def mm_mg_12(rng):
    """Đố vui cuối buổi — câu đố nhẹ, ai cũng làm được."""
    y = []
    for _ in range(rng.randint(3, 4)):
        kieu = rng.choice(["tay", "chan", "them_bot"])
        if kieu == "tay":
            n = rng.randint(1, 5)
            y.append((f"Con giơ {sv(n)} ngón tay ở bàn tay này. Muốn có đúng "
                      f"{sv(n + 2)} ngón thì giơ thêm mấy ngón nữa?", "2 ngón"))
        elif kieu == "chan":
            c = rng.choice(["gà", "vịt", "chim"])
            n = rng.randint(2, 4)
            y.append((f"{sv(n)} con {c} có tất cả mấy cái chân?", f"{sv(n * 2)} cái chân"))
        else:
            a = rng.randint(3, 8)
            v, dv = rng.choice(DO_VAT)
            y.append((f"Trên đĩa có {sv(a)} {v}. Con ăn mất 1 {dv}. Còn mấy {dv}?",
                      f"{sv(a - 1)} {dv}"))
    return BaiMam(
        tieu_de="Đố vui cuối buổi",
        loi_doc="Câu đố nhẹ thôi, con trả lời được hết đấy.",
        y=y,
        do_dung=["Không cần gì — dùng ngón tay của trẻ"],
        twm=["critiquing", "conjecturing"],
        cau_hoi_twm="Con nghĩ ra một câu đố đố lại cô đi.",
        dau_hieu_hieu="Trẻ trả lời được mà vẫn cười. Mục đích của hoạt động này "
                      "là kết buổi bằng cảm giác làm được, không phải để đo gì thêm.",
        khi_kho="Hạ xuống câu dễ hơn ngay. Buổi học không được kết bằng một câu "
                "trẻ chịu thua.",
        mo_rong="Để trẻ ra câu đố cho người lớn — trẻ rất thích phần này.")


@dang_ky_mam("MM-MG-13", "MG", ("MG05", "MG08"), "H",
             ("specialising", "characterising"))
def mm_mg_13(rng):
    """Số thứ tự trong một hàng."""
    y = []
    for _ in range(rng.randint(3, 4)):
        n = rng.randint(4, 8)
        k = rng.randint(1, n)
        c = rng.choice(CON_VAT)
        thu = ["nhất", "hai", "ba", "tư", "năm", "sáu", "bảy", "tám"][k - 1]
        y.append((f"Có {sv(n)} con {c} xếp thành hàng. Con chỉ vào con thứ {thu}.",
                  f"con ở vị trí thứ {sv(k)} tính từ đầu hàng"))
    return BaiMam(
        tieu_de="Con thứ mấy trong hàng",
        loi_doc="Mình đếm từ đầu hàng nhé. Con chỉ vào đúng con cô gọi.",
        y=y,
        do_dung=["Đồ chơi con vật xếp thành hàng"],
        twm=["specialising", "characterising"],
        cau_hoi_twm="“Ba con vịt” với “con vịt thứ ba” có giống nhau không?",
        dau_hieu_hieu="Trẻ phân biệt được số lượng với số thứ tự. Đây là chỗ nhầm "
                      "nhiều nhất của cả chủ đề, và nhầm này kéo dài tới lớp 1.",
        khi_kho="Chỉ tay cùng trẻ, đếm to từ đầu hàng.",
        mo_rong="Đếm từ đầu kia của hàng — con thứ ba lúc này là con khác.")


@dang_ky_mam("MM-MG-14", "MG", ("MG10", "MG03"), "T",
             ("classifying", "convincing"))
def mm_mg_14(rng):
    """Kiểm đếm rồi trả lời câu hỏi từ bảng."""
    loai = rng.sample(CON_VAT, rng.randint(3, 4))
    so = [rng.randint(2, 8) for _ in loai]
    nhieu = loai[so.index(max(so))]
    it = loai[so.index(min(so))]
    bang = ", ".join(f"{l}: {sv(n)} con" for l, n in zip(loai, so))
    y = [(f"Trong tranh có {bang}. Con vật nào nhiều nhất?", nhieu),
         (f"Con vật nào ít nhất?", it),
         (f"Có tất cả bao nhiêu con?", f"{sv(sum(so))} con")]
    return BaiMam(
        tieu_de="Đếm rồi ghi vào bảng",
        loi_doc="Con đếm từng loại một, đếm xong loại nào thì ghi ngay vào bảng "
                "kẻo quên.",
        y=y, mach="T",
        do_dung=["Tranh có nhiều con vật", "Bảng kẻ sẵn ô"],
        twm=["classifying", "convincing"],
        cau_hoi_twm="Nhìn bảng này con thấy điều gì? Con kể cho cô nghe một điều.",
        dau_hieu_hieu="Trẻ đếm từng loại riêng và ghi lại ngay, thay vì đếm hết "
                      "rồi cố nhớ. Ghi lại để khỏi quên là một kỹ năng, phải dạy.",
        khi_kho="Che bớt tranh, chỉ để lộ một loại con vật mỗi lần.",
        mo_rong="Đếm đồ vật thật trong nhà rồi lập bảng.")


@dang_ky_mam("MM-MG-15", "MG", ("MG02", "MG04"), "S",
             ("conjecturing", "improving"))
def mm_mg_15(rng):
    """Làm cho hai bên bằng nhau."""
    y = []
    for _ in range(rng.randint(3, 4)):
        a = rng.randint(2, 8)
        b = rng.randint(2, 8)
        while b == a:
            b = rng.randint(2, 8)
        v, dv = rng.choice(DO_VAT)
        y.append((f"Đĩa này có {sv(a)} {v}, đĩa kia có {sv(b)} {dv}. Con làm sao "
                  f"cho hai đĩa bằng nhau?",
                  f"thêm {sv(abs(a - b))} {dv} vào đĩa ít, hoặc bớt {sv(abs(a - b))} "
                  f"{dv} ở đĩa nhiều"))
    return BaiMam(
        tieu_de="Làm cho hai đĩa bằng nhau",
        loi_doc="Con nghĩ xem có mấy cách làm cho hai đĩa bằng nhau.",
        y=y,
        do_dung=["Hai cái đĩa", "10 đồ vật nhỏ giống nhau"],
        twm=["conjecturing", "improving"],
        cau_hoi_twm="Con vừa thêm vào. Còn cách nào khác không? Cách nào nhanh hơn?",
        dau_hieu_hieu="Trẻ tìm ra **cả hai cách** — thêm vào bên ít và bớt ở bên "
                      "nhiều. Tìm ra hai cách cho một việc là bước đầu của tư duy "
                      "linh hoạt.",
        khi_kho="Ghép đôi hai đĩa trước cho trẻ thấy bên nào thừa mấy cái.",
        mo_rong="Không cho thêm đồ, chỉ được chuyển qua lại — lúc này phải chuyển "
                "một nửa phần chênh.")


@dang_ky_mam("MM-MG-16", "MG", ("MG08", "MG06"), "H",
             ("convincing", "specialising"))
def mm_mg_16(rng):
    """Thời gian trong ngày và trong tuần."""
    y = []
    VIEC = [("ăn sáng", "buổi sáng"), ("ngủ trưa", "buổi trưa"),
            ("tan học", "buổi chiều"), ("đi ngủ", "buổi tối"),
            ("đánh răng buổi sớm", "buổi sáng")]
    for v, b in rng.sample(VIEC, rng.randint(3, 4)):
        y.append((f"Con {v} vào buổi nào trong ngày?", b))
    return BaiMam(
        tieu_de="Sáng, trưa, chiều, tối",
        loi_doc="Mình kể lại một ngày của con nhé, từ lúc thức dậy đến lúc đi ngủ.",
        y=y, mach="H",
        do_dung=["Tranh các hoạt động trong ngày"],
        twm=["convincing", "specialising"],
        cau_hoi_twm="Hôm qua là thứ mấy? Vậy ngày mai là thứ mấy?",
        dau_hieu_hieu="Trẻ kể lại được thứ tự các buổi trong ngày, và dùng đúng "
                      "hôm qua – hôm nay – ngày mai.",
        khi_kho="Xếp tranh theo thứ tự cùng trẻ, vừa xếp vừa kể.",
        mo_rong="Hỏi việc gì làm trước, việc gì làm sau trong một chuỗi ba việc.")


# ────────────────────────────── LỚP 1 đợt hai ──────────────────────────────

@dang_ky_mam("MM-L1-07", "L1", ("L101", "L102", "L113"), "S",
             ("conjecturing", "improving"))
def mm_l1_07(rng):
    """Tìm số còn thiếu trong phép tính."""
    y = []
    for _ in range(rng.randint(4, 6)):
        a = rng.randint(1, 9)
        b = rng.randint(1, 10 - a)
        if rng.random() < 0.5:
            y.append((f"{sv(a)} + … = {sv(a + b)}", sv(b)))
        else:
            y.append((f"… + {sv(b)} = {sv(a + b)}", sv(a)))
    return BaiMam(
        tieu_de="Tìm số còn thiếu",
        loi_doc="Con dùng que tính: xếp ra số đã biết, rồi thêm cho đủ.",
        y=y, mach="S",
        do_dung=["10 que tính"],
        twm=["conjecturing", "improving"],
        cau_hoi_twm="Con tìm ra số đó bằng cách nào? Có cách nào nhanh hơn không?",
        dau_hieu_hieu="Trẻ đếm thêm từ số đã biết lên tới tổng, thay vì đếm lại "
                      "từ 1. Đếm thêm là kỹ thuật, không phải chuyện tự nhiên biết.",
        khi_kho="Xếp que tính thành hai nhóm, che một nhóm lại rồi hỏi.",
        mo_rong="Cho phép trừ: 8 − … = 3.")


@dang_ky_mam("MM-L1-08", "L1", ("L104", "L111", "L112"), "H",
             ("classifying", "conjecturing"))
def mm_l1_08(rng):
    """Ghép hình và tìm hình tiếp theo trong dãy hình."""
    y = []
    for kieu in luan_phien(rng, ["ghep", "day_hinh"], rng.randint(4, 6)):
        if kieu == "ghep":
            h1, h2 = rng.sample(HINH, 2)
            y.append((f"Ghép hai {h1} lại thì được hình gì?",
                      "hình lớn hơn — trẻ ghép thử rồi gọi tên"))
        else:
            bo = rng.sample(HINH, rng.choice([2, 3]))
            day = [bo[i % len(bo)] for i in range(4)]
            y.append((" – ".join(day) + " – … Hình tiếp theo là hình gì?",
                      bo[4 % len(bo)]))
    return BaiMam(
        tieu_de="Ghép hình và dãy hình",
        loi_doc="Con cắt các hình ra rồi ghép thử. Ghép được rồi mới vẽ lại.",
        y=y, mach="H",
        do_dung=["Bộ hình cắt sẵn bằng bìa", "Kéo an toàn"],
        twm=["classifying", "conjecturing"],
        cau_hoi_twm="Con ghép được hình gì khác nữa từ đúng mấy miếng này không?",
        dau_hieu_hieu="Trẻ xoay miếng ghép để thử, thay vì kết luận ngay là không "
                      "ghép được. Chịu xoay thử là một thói quen phải tập.",
        khi_kho="Ghép mẫu một lần rồi tháo ra cho trẻ ghép lại.",
        mo_rong="Cho trẻ tự nghĩ một dãy hình rồi đố người lớn.")


@dang_ky_mam("MM-L1-09", "L1", ("L107", "L108"), "S",
             ("characterising", "improving"))
def mm_l1_09(rng):
    """Chục và đơn vị."""
    y = []
    for _ in range(rng.randint(4, 6)):
        n = rng.randint(11, 99)
        y.append((f"Số {sv(n)} gồm mấy chục và mấy đơn vị?",
                  f"{sv(n // 10)} chục và {sv(n % 10)} đơn vị"))
    return BaiMam(
        tieu_de="Chục và đơn vị",
        loi_doc="Con lấy bó que tính. Mỗi bó là một chục, que rời là đơn vị.",
        y=y, mach="S",
        do_dung=["Que tính bó thành từng chục", "Que tính rời"],
        twm=["characterising", "improving"],
        cau_hoi_twm="Số nào cũng tách được thành chục và đơn vị à?",
        dau_hieu_hieu="Trẻ nhìn số 47 là “4 bó và 7 que” chứ không phải “số bốn "
                      "bảy”. Đây là nền của toàn bộ cách tính viết sau này.",
        khi_kho="Bó que tính thật cùng trẻ, mỗi bó đúng 10 que.",
        mo_rong="Hỏi ngược: 3 chục 8 đơn vị là số nào?")


@dang_ky_mam("MM-L1-10", "L1", ("L109", "L114"), "S",
             ("convincing", "critiquing"))
def mm_l1_10(rng):
    """Đọc đề và tự đặt đề."""
    y = []
    for _ in range(rng.randint(3, 5)):
        a, b = rng.randint(3, 15), rng.randint(2, 10)
        pt = rng.choice([("+", a + b), ("−", a - b if a > b else b - a)])
        dau, kq = pt
        if dau == "−" and a <= b:
            a, b = b, a
        y.append((f"Con hãy nghĩ ra một bài toán mà phép tính là "
                  f"{sv(a)} {dau} {sv(b)} = {sv(kq)}.",
                  "trẻ tự đặt đề — đúng khi câu chuyện khớp với phép tính"))
    return BaiMam(
        tieu_de="Tự đặt một bài toán",
        loi_doc="Lần này con làm cô giáo nhé. Con nghĩ ra đề toán, cô sẽ giải.",
        y=y, mach="S",
        do_dung=["Giấy nháp"],
        twm=["convincing", "critiquing"],
        cau_hoi_twm="Đề của con có đủ cho người khác giải được không? Thiếu gì không?",
        dau_hieu_hieu="Trẻ đặt được đề có đủ dữ kiện **và** có câu hỏi. Trẻ hay "
                      "quên câu hỏi, và chính lúc quên ấy mới hiểu vì sao đề nào "
                      "cũng phải có câu hỏi.",
        khi_kho="Cho sẵn bối cảnh — “về quả cam nhé” — rồi để trẻ điền số.",
        mo_rong="Đổi vai: người lớn đặt một đề thiếu dữ kiện, trẻ chỉ ra chỗ thiếu.")


@dang_ky_mam("MM-L1-11", "L1", ("L110", "L106"), "H",
             ("specialising", "convincing"))
def mm_l1_11(rng):
    """Thứ trong tuần và thời gian biểu."""
    y = []
    THU = ["thứ Hai", "thứ Ba", "thứ Tư", "thứ Năm", "thứ Sáu",
           "thứ Bảy", "Chủ nhật"]
    for _ in range(rng.randint(4, 6)):
        i = rng.randrange(7)
        kieu = rng.choice(["sau", "truoc", "thu_may"])
        if kieu == "sau":
            y.append((f"Hôm nay là {THU[i]}. Ngày mai là thứ mấy?",
                      THU[(i + 1) % 7]))
        elif kieu == "truoc":
            y.append((f"Hôm nay là {THU[i]}. Hôm qua là thứ mấy?",
                      THU[(i - 1) % 7]))
        else:
            y.append((f"Ngày thứ {sv(i + 1)} của tuần là thứ mấy?", THU[i]))
    return BaiMam(
        tieu_de="Các thứ trong tuần",
        loi_doc="Con đọc to bảy thứ trong tuần một lượt trước khi trả lời.",
        y=y, mach="H",
        do_dung=["Tờ lịch tuần"],
        twm=["specialising", "convincing"],
        cau_hoi_twm="Sau Chủ nhật là thứ mấy? Vì sao lại quay về thứ Hai?",
        dau_hieu_hieu="Trẻ hiểu tuần là một vòng lặp — hết Chủ nhật thì quay lại "
                      "thứ Hai — chứ không phải một dãy có điểm kết thúc.",
        khi_kho="Chỉ vào tờ lịch, đếm cùng trẻ.",
        mo_rong="Hỏi ba ngày nữa là thứ mấy — trẻ phải đếm vòng.")


@dang_ky_mam("MM-L1-12", "L1", ("L103", "L105"), "S",
             ("generalising", "critiquing"))
def mm_l1_12(rng):
    """Quan hệ giữa phép cộng và phép trừ."""
    y = []
    for _ in range(rng.randint(3, 5)):
        a = rng.randint(2, 9)
        b = rng.randint(1, 10 - a)
        y.append((f"Từ phép tính {sv(a)} + {sv(b)} = {sv(a + b)}, con viết ra hai "
                  f"phép trừ.",
                  f"{sv(a + b)} − {sv(a)} = {sv(b)} và {sv(a + b)} − {sv(b)} = {sv(a)}"))
    return BaiMam(
        tieu_de="Từ một phép cộng ra hai phép trừ",
        loi_doc="Ba số này ở với nhau thành một gia đình. Con viết đủ bốn phép "
                "tính của gia đình ấy.",
        y=y, mach="S",
        do_dung=["Ba thẻ số"],
        twm=["generalising", "critiquing"],
        cau_hoi_twm="Bộ ba số nào cũng viết được bốn phép tính à? Con thử bộ khác xem.",
        dau_hieu_hieu="Trẻ viết được cả bốn phép tính của một bộ ba số. Nắm được "
                      "quan hệ này thì học bảng trừ nhẹ đi một nửa.",
        khi_kho="Đặt ba thẻ số thành hình tam giác, che một thẻ rồi hỏi.",
        mo_rong="Che thẻ tổng thay vì che thẻ số hạng.")


@dang_ky_mam("MM-L1-13", "L1", ("L112", "L114"), "S",
             ("conjecturing", "generalising"))
def mm_l1_13(rng):
    """Đố vui: tìm quy luật số."""
    y = []
    for _ in range(rng.randint(3, 5)):
        kieu = rng.choice(["cach_deu", "doi", "hinh"])
        if kieu == "cach_deu":
            d = rng.choice([2, 3, 5, 10])
            a = rng.randint(1, 12)
            day = [a + i * d for i in range(5)]
            y.append((", ".join(sv(x) for x in day[:4]) + ", …", sv(day[4])))
        elif kieu == "doi":
            a = rng.choice([1, 2, 3])
            day = [a * 2 ** i for i in range(4)]
            y.append((", ".join(sv(x) for x in day[:3]) + ", …", sv(day[3])))
        else:
            n = rng.randint(2, 5)
            y.append((f"Xếp hình vuông bằng que tính: 1 hình cần 4 que, 2 hình "
                      f"liền nhau cần 7 que. {sv(n)} hình liền nhau cần mấy que?",
                      f"{sv(3 * n + 1)} que"))
    return BaiMam(
        tieu_de="Tìm quy luật",
        loi_doc="Con nhìn xem từ số này sang số kia thay đổi thế nào.",
        y=y, mach="S",
        do_dung=["Que tính để xếp hình"],
        twm=["conjecturing", "generalising"],
        cau_hoi_twm="Con nói quy luật thành một câu xem. Số thứ mười sẽ là số nào?",
        dau_hieu_hieu="Trẻ nói được quy luật thành lời trước khi viết số tiếp theo. "
                      "Viết đúng mà không nói được quy luật thường là đoán trúng.",
        khi_kho="Viết hiệu giữa hai số liền nhau xuống dưới cho trẻ nhìn thấy.",
        mo_rong="Cho trẻ tự nghĩ một dãy rồi đố lại.")


# ────────────────────────────── LỚP 2 đợt hai ──────────────────────────────

@dang_ky_mam("MM-L2-07", "L2", ("L201", "L202", "L203"), "S",
             ("critiquing", "improving"))
def mm_l2_07(rng):
    """Tìm chỗ sai trong bài làm sẵn."""
    y = []
    for _ in range(rng.randint(3, 5)):
        a, b = rng.randint(15, 89), rng.randint(15, 89)
        dung = a + b
        sai = dung - 10 if (a % 10) + (b % 10) >= 10 else dung + 9
        y.append((f"Một bạn tính {sv(a)} + {sv(b)} = {sv(sai)}. Bạn ấy sai ở đâu? "
                  f"Kết quả đúng là bao nhiêu?",
                  f"bạn quên nhớ sang hàng chục; kết quả đúng là {sv(dung)}"))
    return BaiMam(
        tieu_de="Tìm chỗ sai giúp bạn",
        loi_doc="Con làm giám khảo nhé. Xem bạn sai ở bước nào rồi sửa lại.",
        y=y, mach="S",
        do_dung=["Giấy ô li"],
        twm=["critiquing", "improving"],
        cau_hoi_twm="Làm sao để lần sau bạn ấy không sai như thế nữa?",
        dau_hieu_hieu="Trẻ chỉ ra **bước nào** sai chứ không chỉ nói kết quả sai. "
                      "Tìm được lỗi của người khác là bước trước khi tự tìm được "
                      "lỗi của mình.",
        khi_kho="Tính lại cùng trẻ từng hàng, so với bài của bạn ở từng bước.",
        mo_rong="Cho một bài đúng để trẻ khỏi quen là bài nào cũng có lỗi.")


@dang_ky_mam("MM-L2-08", "L2", ("L205", "L206"), "S",
             ("specialising", "generalising"))
def mm_l2_08(rng):
    """Bài toán có lời văn dùng phép nhân, phép chia."""
    y = []
    for kieu in luan_phien(rng, ["nhan", "chia"], rng.randint(4, 5)):
        b = rng.choice([2, 5])
        k = rng.randint(2, 10)
        v, dv = rng.choice(DO_VAT)
        if kieu == "nhan":
            y.append((f"Mỗi hộp có {sv(b)} {v}. Hỏi {sv(k)} hộp có mấy {dv}?",
                      f"{sv(b * k)} {dv}"))
        else:
            y.append((f"Có {sv(b * k)} {v} chia đều vào {sv(b)} hộp. Mỗi hộp có "
                      f"mấy {dv}?", f"{sv(k)} {dv}"))
    return BaiMam(
        tieu_de="Bài toán nhân, chia",
        loi_doc="Con đọc đề rồi hỏi mình: đây là gộp nhiều nhóm bằng nhau, hay "
                "chia đều ra?",
        y=y, mach="S",
        do_dung=["Que tính hoặc hột hạt để chia thử"],
        twm=["specialising", "generalising"],
        cau_hoi_twm="Bài này nhân hay chia? Vì sao con biết?",
        dau_hieu_hieu="Trẻ nhận ra dấu hiệu “mỗi … có …, hỏi tất cả” là nhân, còn "
                      "“chia đều” là chia — mà không cần thuộc lòng danh sách từ khoá.",
        khi_kho="Chia thật bằng hột hạt vào các đĩa.",
        mo_rong="Cho bài chia có dư để trẻ thấy không phải lúc nào cũng chia hết.")


@dang_ky_mam("MM-L2-09", "L2", ("L211", "L212"), "H",
             ("characterising", "critiquing"))
def mm_l2_09(rng):
    """Đường gấp khúc và ba điểm thẳng hàng."""
    y = []
    for kieu in luan_phien(rng, ["gap_khuc", "thang_hang"], rng.randint(4, 5)):
        if kieu == "gap_khuc":
            n = rng.randint(2, 4)
            doan = [rng.randint(3, 25) for _ in range(n)]
            y.append((f"Đường gấp khúc gồm {sv(n)} đoạn dài "
                      + ", ".join(f"{sv(x)} cm" for x in doan)
                      + ". Tính độ dài đường gấp khúc.", f"{sv(sum(doan))} cm"))
        else:
            y.append(("Ba điểm A, B, C cùng nằm trên một đường thẳng. Ba điểm ấy "
                      "gọi là gì?", "ba điểm thẳng hàng"))
    return BaiMam(
        tieu_de="Đường gấp khúc và điểm thẳng hàng",
        loi_doc="Con dùng thước đặt qua ba điểm xem chúng có cùng nằm trên một "
                "đường không.",
        y=y, mach="H",
        do_dung=["Thước kẻ", "Giấy có sẵn các điểm"],
        twm=["characterising", "critiquing"],
        cau_hoi_twm="Độ dài đường gấp khúc có bằng khoảng cách từ điểm đầu tới "
                    "điểm cuối không? Vì sao?",
        dau_hieu_hieu="Trẻ nhận ra đi theo đường gấp khúc **dài hơn** đi thẳng. "
                      "Đây là một hiểu biết hình học thật, không phải phép cộng.",
        khi_kho="Dùng sợi dây đặt theo đường gấp khúc rồi kéo thẳng ra đo.",
        mo_rong="Vẽ hai đường gấp khúc cùng điểm đầu điểm cuối, hỏi đường nào dài hơn.")


@dang_ky_mam("MM-L2-10", "L2", ("L207", "L208"), "S",
             ("characterising", "improving"))
def mm_l2_10(rng):
    """Trăm, chục, đơn vị và tính nhẩm số tròn trăm."""
    y = []
    for kieu in luan_phien(rng, ["cau_tao", "nham"], rng.randint(4, 6)):
        if kieu == "cau_tao":
            n = rng.randint(101, 999)
            y.append((f"Số {sv(n)} gồm mấy trăm, mấy chục, mấy đơn vị?",
                      f"{sv(n // 100)} trăm, {sv(n // 10 % 10)} chục, "
                      f"{sv(n % 10)} đơn vị"))
        else:
            a = rng.randrange(100, 900, 100)
            b = rng.randrange(100, 1000 - a, 100)
            y.append((f"Tính nhẩm: {sv(a)} + {sv(b)}", sv(a + b)))
    return BaiMam(
        tieu_de="Cấu tạo số và tính nhẩm số tròn trăm",
        loi_doc="Số tròn trăm thì nhẩm như đếm trăm: 3 trăm thêm 2 trăm là 5 trăm.",
        y=y, mach="S",
        do_dung=["Bảng số hoặc thẻ trăm – chục – đơn vị"],
        twm=["characterising", "improving"],
        cau_hoi_twm="Vì sao 300 + 200 nhẩm nhanh hơn 347 + 285?",
        dau_hieu_hieu="Trẻ nhẩm số tròn trăm mà không đặt tính. Biết khi nào cần "
                      "đặt tính và khi nào không là dấu hiệu đã chọn cách làm.",
        khi_kho="Che hai chữ số cuối để trẻ chỉ nhìn hàng trăm.",
        mo_rong="Nhẩm số tròn chục trong phạm vi 1 000.")


@dang_ky_mam("MM-L2-11", "L2", ("L214", "L215", "L216"), "T",
             ("conjecturing", "critiquing"))
def mm_l2_11(rng):
    """Tự thu thập số liệu và nhận xét."""
    CHU_DE_TK = ["màu áo các bạn trong lớp", "món ăn sáng của các bạn",
                 "phương tiện đi học", "con vật nuôi ở nhà", "môn học yêu thích"]
    cd = rng.choice(CHU_DE_TK)
    y = [(f"Con đi hỏi và kiểm đếm về {cd}. Ghi vào bảng.",
          "trẻ tự thu thập — người lớn kiểm bảng có đủ cột và đủ ô không"),
         ("Loại nào nhiều nhất trong bảng của con?", "trẻ đọc từ bảng của mình"),
         ("Con vẽ biểu đồ tranh cho bảng ấy, mỗi hình thay cho một bạn.",
          "trẻ tự vẽ — số hình mỗi hàng phải khớp với bảng"),
         ("Nhìn biểu đồ, con nói một điều con thấy được.",
          "bất kỳ nhận xét nào đọc đúng từ biểu đồ")]
    return BaiMam(
        tieu_de=f"Kiểm đếm về {cd}",
        loi_doc="Con đi hỏi từng bạn rồi ghi ngay vào bảng, đừng để nhớ trong đầu.",
        y=y, mach="T",
        do_dung=["Giấy kẻ ô", "Bút màu"],
        twm=["conjecturing", "critiquing"],
        cau_hoi_twm="Nếu hỏi lớp khác thì bảng có giống thế này không? Con đoán xem.",
        dau_hieu_hieu="Trẻ ghi ngay khi hỏi được, và bảng của trẻ có đủ cột. Số "
                      "liệu tự đi thu thập nhớ lâu hơn hẳn số liệu cho sẵn.",
        khi_kho="Làm mẫu với ba bạn đầu tiên.",
        mo_rong="Hỏi trẻ tự nghĩ một câu hỏi để đi kiểm đếm.")


@dang_ky_mam("MM-L2-12", "L2", ("L209", "L210"), "H",
             ("conjecturing", "improving"))
def mm_l2_12(rng):
    """Ước lượng rồi đo lại."""
    y = []
    VAT = [("chiều dài cái bàn", "dm"), ("chiều cao cửa ra vào", "m"),
           ("quãng đường từ nhà tới trường", "km"), ("chiều dài quyển vở", "cm"),
           ("khối lượng cặp sách", "kg"), ("lượng nước trong chai", "lít")]
    for v, dv in rng.sample(VAT, rng.randint(3, 5)):
        y.append((f"Con đoán {v} khoảng bao nhiêu {dv}? Đoán xong mình đo lại.",
                  f"trẻ đoán rồi đo — so xem đoán gần chưa"))
    return BaiMam(
        tieu_de="Đoán trước rồi đo lại",
        loi_doc="Con đoán trước đã, đoán sai không sao. Đoán xong mình đo xem gần chưa.",
        y=y, mach="H",
        do_dung=["Thước mét", "Cân", "Ca đong 1 lít"],
        twm=["conjecturing", "improving"],
        cau_hoi_twm="Lần này con đoán gần hơn lần trước không? Vì sao?",
        dau_hieu_hieu="Ước lượng của trẻ **gần dần** qua các lần. Điều đáng theo "
                      "dõi không phải là đoán đúng ngay, mà là đoán ngày càng gần.",
        khi_kho="Cho trẻ cầm vật chuẩn — thước 1 m, quả cân 1 kg — trước khi đoán.",
        mo_rong="Đoán bằng đơn vị lớn hơn: cái bàn dài mấy mét.")




# ═══════════════════════════════════════════════════════════════════
#  ĐỢT MẪU THỨ BA — VÁ ĐÚNG 31 Ô CÒN TRỐNG
#
#  Phép đo sau đợt hai cho thấy 31 cặp (chủ đề × vai) chưa có mẫu nào: có chủ
#  đề thiếu bài cho ô "Học cái mới", có chủ đề thiếu bài cho ô "Luyện tay".
#  Thiếu ô nào thì buổi học phải mượn bài của chủ đề khác vào đúng ô cốt lõi —
#  tức là buổi dạy bảng nhân lại có phần "Học cái mới" nói về đường gấp khúc.
#
#  Mười hai mẫu dưới đây viết riêng để lấp đúng những ô ấy.
# ═══════════════════════════════════════════════════════════════════

@dang_ky_mam("MM-MG-17", "MG", ("MG04", "MG05", "MG08", "MG10"), "S",
             ("conjecturing", "convincing"))
def mm_mg_17(rng):
    """Khám phá bằng tay: bày ra, đếm, rồi thử đổi cách bày."""
    y = []
    for _ in range(rng.randint(3, 4)):
        n = rng.randint(4, 10)
        v, dv = rng.choice(DO_VAT)
        cach = rng.choice(["thành hàng ngang", "thành vòng tròn", "thành hai hàng",
                           "rải lộn xộn"])
        y.append((f"Cô bày {sv(n)} {v} {cach}. Con đếm xem có mấy {dv}?", sv(n)))
    return BaiMam(
        tieu_de="Bày ra rồi đếm lại",
        loi_doc="Cô bày lại kiểu khác nhé, con đếm lại xem có còn bằng lúc nãy không.",
        y=y,
        do_dung=["10 đồ vật nhỏ giống nhau"],
        twm=["conjecturing", "convincing"],
        cau_hoi_twm="Cô bày kiểu khác mà vẫn bằng chừng ấy à? Vì sao con biết?",
        dau_hieu_hieu="Trẻ nói ngay số cũ mà không đếm lại khi đồ vật chỉ bị bày "
                      "khác đi. Đây là tính bảo toàn số lượng — mốc phát triển "
                      "quan trọng nhất của tuổi này.",
        khi_kho="Đếm lại cùng trẻ hai lần, chỉ rõ không thêm không bớt gì cả.",
        mo_rong="Bày dàn rộng ra rồi hỏi — trẻ chưa bảo toàn sẽ nói là nhiều hơn.")


@dang_ky_mam("MM-MG-18", "MG", ("MG01", "MG06", "MG07", "MG09"), "H",
             ("classifying", "critiquing"))
def mm_mg_18(rng):
    """Tự làm thử: nối, khoanh, tô theo yêu cầu."""
    y = []
    VIEC = [("khoanh tròn nhóm có nhiều hơn", "nhóm nhiều hơn"),
            ("nối mỗi con vật với cái chuồng của nó", "nối đủ đôi một"),
            ("tô màu hình tròn", "chỉ tô hình tròn"),
            ("gạch bỏ vật không cùng nhóm", "vật khác loại"),
            ("khoanh vào vật ở giữa hàng", "vật chính giữa")]
    for v, d in rng.sample(VIEC, rng.randint(3, 4)):
        y.append((f"Con {v}.", d))
    return BaiMam(
        tieu_de="Khoanh, nối, tô",
        loi_doc="Con làm từng việc một, làm xong việc này mới sang việc kia.",
        y=y, mach="H",
        do_dung=["Bút chì màu"],
        twm=["classifying", "critiquing"],
        cau_hoi_twm="Con kiểm lại xem có bỏ sót cái nào không?",
        dau_hieu_hieu="Trẻ tự kiểm lại sau khi làm xong, không nộp ngay. Thói quen "
                      "nhìn lại bài là thứ phải tập từ tuổi này.",
        khi_kho="Làm mẫu việc đầu tiên rồi để trẻ làm tiếp.",
        mo_rong="Đổi vai: người lớn làm sai một chỗ cho trẻ tìm ra.")


@dang_ky_mam("MM-L1-14", "L1", ("L101", "L105", "L109", "L114"), "S",
             ("conjecturing", "convincing"))
def mm_l1_14(rng):
    """Học cái mới bằng que tính và bảng số."""
    y = []
    for _ in range(rng.randint(4, 5)):
        n = rng.randint(11, 99)
        y.append((f"Con lấy đúng {sv(n)} que tính. Con lấy mấy bó và mấy que rời?",
                  f"{sv(n // 10)} bó và {sv(n % 10)} que rời"))
    return BaiMam(
        tieu_de="Lấy đúng số que tính",
        loi_doc="Bó nào cũng đúng mười que nhé. Con lấy bó trước rồi mới lấy que rời.",
        y=y, mach="S",
        do_dung=["Que tính bó sẵn từng chục", "Que tính rời"],
        twm=["conjecturing", "convincing"],
        cau_hoi_twm="Có cách nào lấy nhanh hơn là đếm từng que không?",
        dau_hieu_hieu="Trẻ lấy bó trước rồi mới đếm que rời, thay vì đếm từ 1. "
                      "Đó là lúc trẻ dùng được cấu tạo chục – đơn vị chứ không "
                      "chỉ đọc thuộc.",
        khi_kho="Bó que tính cùng trẻ, đếm to đủ mười mới buộc.",
        mo_rong="Hỏi ngược: cô đưa 3 bó 6 que, đó là số nào?")


@dang_ky_mam("MM-L1-15", "L1", ("L104", "L106", "L107", "L110", "L111"), "H",
             ("critiquing", "improving"))
def mm_l1_15(rng):
    """Luyện tay: vẽ, đo, viết số."""
    y = []
    for kieu in luan_phien(rng, ["ve_doan", "viet_so", "dem_hinh"],
                           rng.randint(4, 6)):
        if kieu == "ve_doan":
            n = rng.randint(3, 15)
            y.append((f"Vẽ một đoạn thẳng dài {sv(n)} cm.", f"{sv(n)} cm"))
        elif kieu == "viet_so":
            n = rng.randint(11, 99)
            doc = ("mười" if n // 10 == 1 else f"{sv(n // 10)} mươi")
            y.append((f"Viết số: {doc} {sv(n % 10) if n % 10 else ''}".strip(), sv(n)))
        else:
            n = rng.randint(3, 8)
            y.append((f"Trong hình có mấy đoạn thẳng?", f"{sv(n)} đoạn thẳng"))
    return BaiMam(
        tieu_de="Vẽ, đo và viết số",
        loi_doc="Con đặt vạch 0 của thước đúng vào điểm đầu rồi mới vẽ.",
        y=y, mach="H",
        do_dung=["Thước có vạch xăng-ti-mét", "Bút chì"],
        twm=["critiquing", "improving"],
        cau_hoi_twm="Con đo lại đoạn vừa vẽ xem có đúng chừng ấy không?",
        dau_hieu_hieu="Trẻ tự đo lại đoạn mình vừa vẽ. Tự kiểm là kỹ năng, không "
                      "phải tính cẩn thận bẩm sinh.",
        khi_kho="Đánh dấu sẵn hai điểm đầu cuối cho trẻ nối.",
        mo_rong="Vẽ đoạn dài hơn đoạn cho sẵn 3 cm.")


@dang_ky_mam("MM-L2-13", "L2", ("L201", "L202", "L203", "L204"), "S",
             ("conjecturing", "convincing"))
def mm_l2_13(rng):
    """Học cái mới: hiểu vì sao phải nhớ."""
    y = []
    for _ in range(rng.randint(4, 5)):
        a = rng.randrange(15, 89)
        b = rng.randrange(15, 89)
        dv = (a % 10) + (b % 10)
        y.append((f"Tính {sv(a)} + {sv(b)}. Cộng hàng đơn vị trước: "
                  f"{sv(a % 10)} + {sv(b % 10)} = {sv(dv)}. Vì sao phải nhớ "
                  f"sang hàng chục?",
                  f"vì {sv(dv)} lớn hơn 9, đủ một chục nên chuyển 1 chục sang; "
                  f"kết quả là {sv(a + b)}" if dv >= 10 else
                  f"không phải nhớ vì {sv(dv)} chưa đủ một chục; kết quả {sv(a + b)}"))
    return BaiMam(
        tieu_de="Vì sao phải nhớ",
        loi_doc="Con dùng que tính: đủ mười que rời thì bó lại thành một bó, đó "
                "chính là nhớ một chục.",
        y=y, mach="S",
        do_dung=["Que tính rời và dây buộc"],
        twm=["conjecturing", "convincing"],
        cau_hoi_twm="Phép nào phải nhớ, phép nào không? Con nhìn vào đâu để biết trước?",
        dau_hieu_hieu="Trẻ nói được **trước khi tính** rằng phép này có phải nhớ "
                      "hay không, chỉ bằng cách nhìn hàng đơn vị.",
        khi_kho="Bó que tính thật một lần cho trẻ thấy mười que rời thành một bó.",
        mo_rong="Tìm hai số cộng lại phải nhớ, và hai số cộng lại không phải nhớ.")


@dang_ky_mam("MM-L2-14", "L2", ("L205", "L206", "L207", "L208"), "S",
             ("generalising", "specialising"))
def mm_l2_14(rng):
    """Học cái mới: nhân là cộng nhiều lần bằng nhau."""
    y = []
    for _ in range(rng.randint(4, 5)):
        b = rng.choice([2, 5])
        k = rng.randint(2, 9)
        y.append((f"Xếp {sv(k)} nhóm, mỗi nhóm {sv(b)} que tính. Con viết phép "
                  f"cộng rồi viết phép nhân tương ứng.",
                  " + ".join([sv(b)] * k) + f" = {sv(b)} × {sv(k)} = {sv(b * k)}"))
    return BaiMam(
        tieu_de="Từ phép cộng sang phép nhân",
        loi_doc="Con xếp que tính thành từng nhóm bằng nhau rồi mới viết.",
        y=y, mach="S",
        do_dung=["Que tính", "Đĩa hoặc vòng để chia nhóm"],
        twm=["generalising", "specialising"],
        cau_hoi_twm="Phép cộng nào cũng viết thành phép nhân được không? Vì sao?",
        dau_hieu_hieu="Trẻ nhận ra chỉ **cộng các số hạng bằng nhau** mới viết "
                      "thành phép nhân được. Đây là chỗ hiểu bản chất, không phải "
                      "chỗ học thuộc bảng.",
        khi_kho="Xếp hộ hai nhóm đầu, để trẻ xếp tiếp.",
        mo_rong="Cho một phép cộng có số hạng không bằng nhau, hỏi có viết thành "
                "phép nhân được không.")


@dang_ky_mam("MM-L2-15", "L2", ("L209", "L210", "L211", "L212", "L213", "L216"),
             "H", ("improving", "critiquing"))
def mm_l2_15(rng):
    """Luyện tay: đổi đơn vị và tính toán trên số đo."""
    y = []
    for kieu in luan_phien(rng, ["doi", "cong_do", "so_sanh"], rng.randint(4, 6)):
        if kieu == "doi":
            n = rng.randint(1, 9)
            dv1, dv2, he = rng.choice([("dm", "cm", 10), ("m", "dm", 10),
                                       ("m", "cm", 100), ("km", "m", 1000)])
            y.append((f"{sv(n)} {dv1} = … {dv2}", f"{sv(n * he)} {dv2}"))
        elif kieu == "cong_do":
            a, b = rng.randint(5, 40), rng.randint(5, 40)
            y.append((f"{sv(a)} cm + {sv(b)} cm = … cm", f"{sv(a + b)} cm"))
        else:
            a, b = rng.randint(1, 9), rng.randint(11, 99)
            y.append((f"Điền dấu >, < hoặc = : {sv(a)} dm … {sv(b)} cm",
                      ">" if a * 10 > b else ("<" if a * 10 < b else "=")))
    return BaiMam(
        tieu_de="Đổi đơn vị và tính trên số đo",
        loi_doc="Muốn so hai số đo thì phải đưa về cùng một đơn vị đã.",
        y=y, mach="H",
        do_dung=["Thước mét", "Bảng đơn vị đo độ dài"],
        twm=["improving", "critiquing"],
        cau_hoi_twm="Vì sao không so thẳng 5 với 40 được?",
        dau_hieu_hieu="Trẻ tự đổi về cùng đơn vị trước khi so, không so thẳng hai "
                      "con số. Đây là lỗi mất điểm phổ biến nhất của cả mạch đo lường.",
        khi_kho="Viết bảng đơn vị ra, chỉ vào từng bậc khi đổi.",
        mo_rong="Cho ba số đo ba đơn vị khác nhau, bảo xếp thứ tự.")


@dang_ky_mam("MM-MG-19", "MG", ("MG02", "MG03", "MG05"), "S",
             ("characterising", "conjecturing"))
def mm_mg_19(rng):
    """Khám phá: đếm bằng ngón tay và cơ thể."""
    y = []
    BO_PHAN = [("ngón tay một bàn", 5), ("ngón tay hai bàn", 10),
               ("mắt", 2), ("tai", 2), ("chân", 2), ("mũi", 1)]
    for b, n in rng.sample(BO_PHAN, rng.randint(3, 4)):
        y.append((f"Con có mấy {b}?", sv(n)))
    return BaiMam(
        tieu_de="Đếm trên chính mình",
        loi_doc="Con vừa chỉ vừa đếm nhé.",
        y=y,
        do_dung=["Không cần gì cả"],
        twm=["characterising", "conjecturing"],
        cau_hoi_twm="Cô cũng có chừng ấy ngón tay à? Bạn nào cũng thế à?",
        dau_hieu_hieu="Trẻ nhận ra một số thứ **luôn có cùng số lượng** ở mọi "
                      "người. Đó là ví dụ đầu tiên về một điều luôn đúng.",
        khi_kho="Cầm tay trẻ chỉ vào từng ngón.",
        mo_rong="Hai bạn có tất cả bao nhiêu ngón tay?")


@dang_ky_mam("MM-L1-16", "L1", ("L102", "L103", "L113"), "S",
             ("improving", "critiquing"))
def mm_l1_16(rng):
    """Luyện tay: tính nhanh trong phạm vi 10 và 20."""
    y = []
    for _ in range(rng.randint(5, 8)):
        kieu = rng.choice(["cong10", "tru10", "cong20"])
        if kieu == "cong10":
            a = rng.randint(1, 9); b = rng.randint(1, 10 - a)
            y.append((f"{sv(a)} + {sv(b)} = …", sv(a + b)))
        elif kieu == "tru10":
            a = rng.randint(2, 10); b = rng.randint(1, a)
            y.append((f"{sv(a)} − {sv(b)} = …", sv(a - b)))
        else:
            a = rng.randint(10, 19); b = rng.randint(1, 20 - a)
            y.append((f"{sv(a)} + {sv(b)} = …", sv(a + b)))
    return BaiMam(
        tieu_de="Tính nhanh",
        loi_doc="Phép nào con nhớ luôn thì viết ngay, phép nào chưa nhớ thì đếm "
                "trên tay.",
        y=y, mach="S",
        do_dung=["Không bắt buộc — dùng ngón tay khi cần"],
        twm=["improving", "critiquing"],
        cau_hoi_twm="Phép nào con viết ra ngay không cần đếm? Vì sao nhớ được?",
        dau_hieu_hieu="Số phép trẻ trả lời ngay **tăng dần** qua các buổi. Đây là "
                      "chỗ duy nhất trong khối đáng đo bằng tốc độ.",
        khi_kho="Cho dùng que tính thoải mái. Nhanh sẽ đến sau khi chắc.",
        mo_rong="Bấm giờ một phút xem làm được mấy phép — chỉ chơi, không xếp hạng.")


@dang_ky_mam("MM-L2-16", "L2", ("L214", "L215"), "T",
             ("characterising", "improving"))
def mm_l2_16(rng):
    """Luyện tay: đọc bảng số liệu nhiều cột."""
    ngay = ["thứ Hai", "thứ Ba", "thứ Tư", "thứ Năm", "thứ Sáu"]
    so = [rng.randint(3, 15) for _ in ngay]
    bang = ", ".join(f"{n}: {sv(x)}" for n, x in zip(ngay, so))
    nhieu = ngay[so.index(max(so))]
    y = [(f"Số quyển sách bạn Nam đọc trong tuần — {bang}. Ngày nào đọc nhiều nhất?",
          nhieu),
         ("Cả tuần đọc bao nhiêu quyển?", sv(sum(so))),
         (f"Thứ Hai và thứ Ba đọc tất cả mấy quyển?", sv(so[0] + so[1])),
         (f"Ngày đọc nhiều nhất hơn ngày đọc ít nhất mấy quyển?",
          sv(max(so) - min(so)))]
    return BaiMam(
        tieu_de="Đọc bảng số liệu",
        loi_doc="Mỗi câu hỏi một điều khác nhau. Con đọc kỹ câu hỏi trước khi "
                "nhìn vào bảng.",
        y=y, mach="T",
        do_dung=["Bảng số liệu in sẵn"],
        twm=["characterising", "improving"],
        cau_hoi_twm="Câu nào con phải cộng nhiều số? Có cách cộng nào nhanh hơn không?",
        dau_hieu_hieu="Trẻ trả lời đúng **câu được hỏi**, không đọc bừa một con số "
                      "trong bảng. Đây là lỗi mất điểm phổ biến nhất của mạch Thống kê.",
        khi_kho="Che các cột không liên quan tới câu đang hỏi.",
        mo_rong="Hỏi một câu mà bảng không trả lời được, xem trẻ có nhận ra không.")


@dang_ky_mam("MM-L1-17", "L1", ("L108", "L112"), "S",
             ("conjecturing", "generalising"))
def mm_l1_17(rng):
    """Học cái mới: cộng trừ số tròn chục."""
    y = []
    for kieu in luan_phien(rng, ["cong", "tru"], rng.randint(4, 5)):
        # Chặn hai đầu: a = 90 thì không còn số tròn chục nào cộng thêm được mà
        # vẫn dưới 100; a = 10 thì không trừ được số tròn chục nào nhỏ hơn.
        a = rng.randrange(20, 90, 10) if kieu == "cong" else rng.randrange(20, 100, 10)
        b = (rng.randrange(10, 100 - a, 10) if kieu == "cong"
             else rng.randrange(10, a, 10))
        if kieu == "cong":
            y.append((f"{sv(a)} + {sv(b)} = …", sv(a + b)))
        else:
            y.append((f"{sv(a)} − {sv(b)} = …", sv(a - b)))
    return BaiMam(
        tieu_de="Cộng trừ số tròn chục",
        loi_doc="Số tròn chục thì tính như đếm bó: 3 bó thêm 2 bó là 5 bó, tức 50.",
        y=y, mach="S",
        do_dung=["Que tính bó thành chục"],
        twm=["conjecturing", "generalising"],
        cau_hoi_twm="Con biết 3 + 2 = 5. Vậy 30 + 20 bằng mấy? Vì sao giống nhau thế?",
        dau_hieu_hieu="Trẻ dùng phép tính trong phạm vi 10 để suy ra phép tính với "
                      "số tròn chục. Nhận ra chỗ giống nhau ấy tiết kiệm rất nhiều "
                      "công học thuộc.",
        khi_kho="Xếp bó que tính ra bàn, đếm bó thay vì đếm que.",
        mo_rong="Hỏi 300 + 200 — trẻ lớp 1 chưa học nhưng nhiều em đoán được.")


@dang_ky_mam("MM-MG-20", "MG", ("MG07", "MG09", "MG10"), "H",
             ("improving", "critiquing"))
def mm_mg_20(rng):
    """Tự làm thử: hoàn thành mẫu còn thiếu."""
    y = []
    for _ in range(rng.randint(3, 4)):
        bo = rng.sample(["đỏ", "xanh", "vàng"], 2)
        dai = rng.randint(5, 7)
        day = [bo[i % 2] for i in range(dai)]
        cho = rng.randrange(1, dai - 1)
        thieu = day[cho]
        hien = list(day)
        hien[cho] = "…"
        y.append((" – ".join(hien) + " . Ô trống là màu gì?", thieu))
    return BaiMam(
        tieu_de="Điền vào ô trống",
        loi_doc="Ô trống ở giữa dãy. Con nhìn hai bên rồi đoán.",
        y=y, mach="H",
        do_dung=["Hột hạt nhiều màu"],
        twm=["improving", "critiquing"],
        cau_hoi_twm="Con kiểm lại xem điền vào rồi dãy còn đúng quy luật không?",
        dau_hieu_hieu="Trẻ nhìn **cả hai bên** ô trống chứ không chỉ nhìn bên trái. "
                      "Điền ở giữa khó hơn hẳn điền ở cuối dãy.",
        khi_kho="Cho ô trống ở cuối dãy trước, rồi mới chuyển vào giữa.",
        mo_rong="Để hai ô trống cách nhau.")


# ═══════════════════════════════════════════════════════════════════
#  VAI CỦA TỪNG MẪU TRONG MỘT BUỔI
#
#  Bốn hoạt động của một buổi mẫu giáo có bốn mục đích khác nhau, và không phải
#  mẫu nào cũng hợp với mọi ô. Một bài đố vui đặt vào ô "Chơi khởi động" thì
#  buổi học mở đầu bằng một câu hỏi khó — sai hẳn ý đồ; còn một bài luyện đặt
#  vào ô cuối thì buổi học kết bằng sự mệt thay vì bằng tiếng cười.
#
#  Bốn vai:
#    khoi_dong  — vận động hoặc trò chơi, chưa cần bút, ai cũng làm được
#    kham_pha   — có đồ vật thật, người lớn làm mẫu rồi trẻ làm theo
#    luyen      — trẻ tự làm, đây là phần chính về nội dung
#    do_vui     — nhẹ, ngắn, chắc chắn làm được, để kết buổi
#
#  Mẫu không có tên trong bảng này mặc định nhận vai "luyen".
# ═══════════════════════════════════════════════════════════════════

VAI_MAU = {
    # mẫu giáo lớn
    "MM-MG-09": "khoi_dong",     # nhảy và đếm
    "MM-MG-07": "khoi_dong",     # định hướng không gian, phải đứng dậy
    "MM-MG-01": "kham_pha",      # đếm đồ vật thật
    "MM-MG-03": "kham_pha",      # ghép đôi so sánh
    "MM-MG-05": "kham_pha",      # sờ và gọi tên hình khối
    "MM-MG-10": "kham_pha",      # xếp thứ tự bằng vật thật
    "MM-MG-11": "kham_pha",      # xếp nhóm bằng rổ đồ
    "MM-MG-02": "luyen",
    "MM-MG-04": "luyen",
    "MM-MG-08": "luyen",
    "MM-MG-13": "luyen",
    "MM-MG-14": "luyen",
    "MM-MG-15": "luyen",
    "MM-MG-06": "do_vui",        # đoán tiếp dãy
    "MM-MG-12": "do_vui",        # đố vui cuối buổi
    "MM-MG-16": "do_vui",        # sáng trưa chiều tối, kể chuyện
    # lớp 1
    "MM-L1-11": "khoi_dong",     # đọc to các thứ trong tuần
    "MM-L1-01": "khoi_dong",     # so sánh số, nhắc lại buổi trước
    "MM-L1-02": "kham_pha",      # que tính
    "MM-L1-09": "kham_pha",      # bó que tính thành chục
    "MM-L1-08": "kham_pha",      # cắt và ghép hình
    "MM-L1-05": "kham_pha",      # đo bằng thước
    "MM-L1-03": "luyen",
    "MM-L1-07": "luyen",
    "MM-L1-12": "luyen",
    "MM-L1-06": "luyen",
    "MM-L1-13": "do_vui",        # tìm quy luật
    "MM-L1-10": "do_vui",        # tự đặt đề, trẻ làm cô giáo
    "MM-L1-04": "do_vui",        # đếm hình
    # lớp 2
    "MM-L2-10": "khoi_dong",     # nhẩm số tròn trăm
    "MM-L2-02": "khoi_dong",     # đọc to bảng nhân
    "MM-L2-04": "kham_pha",      # cân, đong, đồng hồ
    "MM-L2-12": "kham_pha",      # đoán rồi đo
    "MM-L2-09": "kham_pha",      # thước và dây
    "MM-L2-11": "kham_pha",      # đi thu thập số liệu
    "MM-L2-01": "luyen",
    "MM-L2-03": "luyen",
    "MM-L2-08": "luyen",
    "MM-L2-05": "luyen",
    "MM-L2-07": "do_vui",        # tìm chỗ sai giúp bạn
    "MM-L2-06": "do_vui",        # chắc chắn, có thể, không thể
    # đợt ba — vá đúng các ô cốt lõi còn trống
    "MM-MG-17": "kham_pha", "MM-MG-19": "kham_pha",
    "MM-MG-18": "luyen", "MM-MG-20": "luyen",
    "MM-L1-14": "kham_pha", "MM-L1-17": "kham_pha",
    "MM-L1-15": "luyen", "MM-L1-16": "luyen",
    "MM-L2-13": "kham_pha", "MM-L2-14": "kham_pha",
    "MM-L2-15": "luyen", "MM-L2-16": "luyen",
}

# Vai tương ứng với từng ô của một buổi, theo thứ tự các ô trong `PHAN_BUOI`.
VAI_THEO_O = {
    "MG": ["khoi_dong", "kham_pha", "luyen", "do_vui"],
    "L1": ["khoi_dong", "kham_pha", "luyen", "do_vui"],
    "L2": ["khoi_dong", "kham_pha", "luyen", "luyen", "do_vui"],
}


def vai_cua(ma: str) -> str:
    return VAI_MAU.get(ma, "luyen")
