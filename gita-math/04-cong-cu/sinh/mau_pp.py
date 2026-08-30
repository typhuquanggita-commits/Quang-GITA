# -*- coding: utf-8 -*-
"""Thư viện mẫu bài theo **trục phương pháp giải**.

Kho mẫu cho tới nay xây theo trục nội dung — bài này nói về cái gì. Tệp này bù
trục còn lại: bài này **giải bằng thủ pháp nào**. Rà soát ngày 30/08/2026 cho
thấy sáu phương pháp kinh điển của tài liệu bồi dưỡng học sinh giỏi tiểu học
vắng hẳn khỏi cả 1 296 tài liệu — thử chọn, khử, thay thế, diện tích, dùng chữ
thay số, biểu đồ Ven — cùng bốn dạng chuyển động chưa có kỹ thuật đi kèm.

Mọi mẫu ở đây khai `dang_bai` trùng đúng tên trong `data/phuong_phap.py`, nhờ
vậy bộ chọn mẫu ưu tiên đúng chỗ và `kiem_tra_mau.py` đo được độ phủ trục
phương pháp.

Như mọi mẫu khác: **đáp số do mã tính ra**, và mỗi mẫu tự viết lời giải từng
bước có số thật của chính bài vừa sinh.
"""
from __future__ import annotations

from fractions import Fraction

from .khung import (Bai, CHAT_LONG, HANG_HOA, NOI_CHON, TEN, TO_DOI,
                    chon, dang_ky, hai_ten, hoa, luan_phien, ps, sv)


# ═══════════════════════ THỬ CHỌN — nhóm G ═══════════════════════

@dang_ky("PP-G-M3-01", "G", "M3", lop=(4, 5),
         tu_khoa=("thử chọn", "lựa chọn", "loại trừ", "xét mọi khả năng"),
         dang_bai=("Thử chọn", "Bài toán tìm số thoả nhiều điều kiện",
                   "Phương pháp thử chọn"),
         bay="Dừng ở đáp số đầu tiên")
def pp_g_m3_01(rng, lop):
    """Tìm số có hai chữ số thoả đồng thời hai điều kiện."""
    y, buoc = [], []
    for k in range(rng.randint(4, 6)):
        d = rng.choice([3, 4, 5, 6, 9])
        t = rng.randint(6, 15)
        ds = [n for n in range(10, 100) if n % d == 0
              and n // 10 + n % 10 == t]
        while not ds:
            d = rng.choice([3, 4, 5, 6, 9])
            t = rng.randint(6, 15)
            ds = [n for n in range(10, 100) if n % d == 0
                  and n // 10 + n % 10 == t]
        de = (f"Tìm mọi số có hai chữ số vừa chia hết cho {sv(d)}, "
              f"vừa có tổng hai chữ số bằng {sv(t)}.")
        dap = ", ".join(sv(n) for n in ds) if len(ds) > 1 else sv(ds[0])
        if k == 0:
            bo = [n for n in range(10, 100) if n // 10 + n % 10 == t]
            buoc = [
                f"Điều kiện chặt hơn là **tổng hai chữ số bằng {sv(t)}** — điều kiện "
                f"này chỉ cho {sv(len(bo))} số, ít hơn hẳn điều kiện chia hết. "
                f"Dùng nó để thu hẹp trước.",
                f"Liệt kê các số có hai chữ số mà tổng hai chữ số bằng {sv(t)}: "
                + ", ".join(sv(n) for n in bo) + ".",
                f"Thử từng số xem có chia hết cho {sv(d)} không, gạch bỏ số nào không thoả.",
                f"Còn lại: **{dap}**. Phải xét hết danh sách chứ không dừng ở số đầu tiên.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Tìm số bằng cách thử và loại",
        dan="Với mỗi câu, viết ra danh sách đã thử rồi mới ghi đáp số. "
            "Đáp số có thể gồm nhiều số.",
        y=y, giai_mau=buoc,
        huong_giai="Chọn điều kiện cho ít khả năng nhất để liệt kê trước, rồi mới "
                   "đem điều kiện còn lại ra thử. Làm ngược thứ tự ấy thì phải thử "
                   "gấp nhiều lần.",
        td=["TD3", "TD4"],
        diem_chot="Phải xét **hết** danh sách. Bài thử chọn thường có hơn một đáp số.",
        loi="Tìm được một số thoả rồi dừng, bỏ sót các đáp số còn lại.",
        phong="Viết danh sách ra giấy và gạch bỏ từng số, đừng thử nhẩm trong đầu.",
        goi_y=("Trong hai điều kiện, điều kiện nào cho ít số hơn?",
               "Liệt kê hết các số thoả điều kiện ấy.",
               "Thử từng số với điều kiện còn lại, đừng dừng sớm."),
        pt_dang="Thử chọn",
        pt_kien_thuc="Dấu hiệu chia hết; cấu tạo số có hai chữ số",
        pt_du_lieu="Đề đòi một số thoả **nhiều điều kiện cùng lúc**, số khả năng hữu hạn",
        pt_phuong_phap="Thu hẹp bằng điều kiện chặt nhất rồi thử từng khả năng còn lại",
        pt_nhanh="Tổng hai chữ số cố định thì chỉ có tối đa mười số — liệt kê rất nhanh.",
        tuong_tu=("Tìm mọi số có hai chữ số chia hết cho 5 và có tổng hai chữ số bằng 9.",
                  "45 và 90"),
        mo_rong="Thêm điều kiện thứ ba, chẳng hạn chữ số hàng chục lớn hơn hàng "
                "đơn vị, để học sinh phải lọc ba lần.",
        chuan_bi="Dấu hiệu chia hết cho 2, 3, 5, 9 và cách đọc cấu tạo số.")


@dang_ky("PP-G-M4-01", "G", "M4", lop=(5,),
         tu_khoa=("thử chọn", "lựa chọn", "loại trừ", "xét trường hợp"),
         dang_bai=("Thử chọn", "Xét trường hợp", "Phương pháp thử chọn"),
         thuc_te=True, bay="Xét thiếu trường hợp")
def pp_g_m4_01(rng, lop):
    """Đổi tiền: đếm mọi cách trả một số tiền bằng hai loại mệnh giá."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        a, b = rng.choice([(2, 5), (2, 5), (5, 10), (2, 7), (5, 20)])
        # Dựng số tiền từ **một cách trả có thật**, để bài luôn có đáp số. Rút số
        # tiền ra từ một khoảng ngẫu nhiên thì dễ ra "0 cách" — đúng về toán học
        # nhưng vô nghĩa với một đề luyện đếm cách.
        n = a * rng.randint(2, 12) + b * rng.randint(1, 6)
        cach = [(x, (n - a * x) // b) for x in range(n // a + 1)
                if (n - a * x) >= 0 and (n - a * x) % b == 0]
        de = (f"Có nhiều tờ tiền loại {sv(a)} nghìn đồng và loại {sv(b)} nghìn đồng. "
              f"Hỏi có bao nhiêu cách trả đúng {sv(n)} nghìn đồng, nếu được dùng cả "
              f"hai loại hoặc chỉ một loại?")
        dap = f"{sv(len(cach))} cách"
        if k == 0:
            vd = "; ".join(f"{sv(x)} tờ {sv(a)} nghìn và {sv(z)} tờ {sv(b)} nghìn"
                           for x, z in cach[:3])
            buoc = [
                f"Gọi số tờ loại {sv(b)} nghìn là ẩn để thử, vì loại này giá trị lớn "
                f"nên số cách ít hơn — thử ít lần hơn.",
                f"Số tờ loại {sv(b)} nghìn nhiều nhất có thể là "
                f"{sv(n)} : {sv(b)} = {sv(n // b)} tờ.",
                f"Thử lần lượt số tờ loại {sv(b)} nghìn từ 0 tới {sv(n // b)}. Mỗi lần "
                f"lấy {sv(n)} trừ đi phần đã trả, xem phần còn lại có chia hết cho "
                f"{sv(a)} không.",
                f"Các cách hợp lệ đầu tiên: {vd}.",
                f"Đếm hết được **{dap}**.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Đếm số cách trả tiền bằng hai loại mệnh giá",
        dan="Lập bảng thử, mỗi dòng một khả năng. Chỉ ghi đáp số sau khi đã thử hết.",
        y=y, giai_mau=buoc,
        huong_giai="Chọn loại tiền **mệnh giá lớn** làm ẩn để thử, vì nó cho ít khả "
                   "năng hơn. Với mỗi khả năng, kiểm phần còn lại có chia hết cho "
                   "mệnh giá kia không.",
        td=["TD3", "TD4"],
        diem_chot="Phải thử từ 0 tờ, không được bỏ qua trường hợp chỉ dùng một loại.",
        loi="Bắt đầu thử từ 1 tờ, làm mất trường hợp không dùng loại ấy.",
        phong="Kẻ bảng hai cột và điền từ 0 trở đi, đừng nhảy cóc.",
        goi_y=("Nên chọn loại tiền nào làm ẩn để phải thử ít lần hơn?",
               "Nhiều nhất có thể dùng bao nhiêu tờ loại ấy?",
               "Thử từ 0 tờ trở đi, mỗi lần kiểm phần còn lại có chia hết không."),
        pt_dang="Thử chọn",
        pt_kien_thuc="Phép chia hết; đếm có hệ thống",
        pt_du_lieu="Đề hỏi **có bao nhiêu cách**, và số khả năng đếm được",
        pt_phuong_phap="Chọn ẩn cho ít khả năng nhất, thử từ 0 và loại dần",
        pt_nhanh="Chỉ cần thử các giá trị làm phần còn lại chia hết cho mệnh giá kia.",
        tuong_tu=("Có bao nhiêu cách trả 20 nghìn bằng tờ 2 nghìn và tờ 5 nghìn?",
                  "3 cách"),
        mo_rong="Thêm loại tiền thứ ba để học sinh phải thử hai tầng lồng nhau.",
        chuan_bi="Phép chia có dư và cách kẻ bảng liệt kê.")


# ═══════════════════════ KHỬ — nhóm D ═══════════════════════

@dang_ky("PP-D-M4-01", "D", "M4", lop=(5,),
         tu_khoa=("phương pháp khử", "khử", "hai lần mua", "so hai tình huống"),
         dang_bai=("Phương pháp khử", "Bài toán hai lần mua hàng"),
         thuc_te=True, bay="Chưa cân bằng đã trừ")
def pp_d_m4_01(rng, lop):
    """Hai lần mua hai loại hàng, khử một loại để tìm giá loại kia."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        (h1, dv1), (h2, dv2) = rng.sample(HANG_HOA, 2)
        gia1 = rng.randrange(12, 40) * 1000
        gia2 = rng.randrange(12, 40) * 1000
        while gia2 == gia1:
            gia2 = rng.randrange(12, 40) * 1000
        a1, b1 = rng.randint(2, 6), rng.randint(2, 6)
        a2 = a1                       # giữ nguyên loại 1 để khử được ngay
        b2 = b1 + rng.randint(1, 4)
        t1, t2 = a1 * gia1 + b1 * gia2, a2 * gia1 + b2 * gia2
        de = (f"Lần thứ nhất mua {sv(a1)} {dv1} {h1} và {sv(b1)} {dv2} {h2} hết "
              f"{sv(t1)} đồng. Lần thứ hai mua {sv(a2)} {dv1} {h1} và {sv(b2)} {dv2} "
              f"{h2} hết {sv(t2)} đồng. Tính giá một {dv2} {h2} và một {dv1} {h1}.")
        dap = f"một {dv2} {h2}: {sv(gia2)} đồng; một {dv1} {h1}: {sv(gia1)} đồng"
        if k == 0:
            buoc = [
                f"Hai lần đều mua đúng {sv(a1)} {dv1} {h1} — số lượng loại này "
                f"**đã bằng nhau**, nên trừ hai lần cho nhau là nó tự mất đi.",
                f"Số {h2} mua thêm ở lần hai: {sv(b2)} − {sv(b1)} = {sv(b2 - b1)} ({dv2}).",
                f"Số tiền trả thêm: {sv(t2)} − {sv(t1)} = {sv(t2 - t1)} (đồng).",
                f"Giá một {dv2} {h2}: {sv(t2 - t1)} : {sv(b2 - b1)} = {sv(gia2)} (đồng).",
                f"Thay lại vào lần thứ nhất: {sv(b1)} {dv2} {h2} hết "
                f"{sv(b1 * gia2)} đồng, nên {sv(a1)} {dv1} {h1} hết "
                f"{sv(t1)} − {sv(b1 * gia2)} = {sv(a1 * gia1)} đồng.",
                f"Giá một {dv1} {h1}: {sv(a1 * gia1)} : {sv(a1)} = **{sv(gia1)} đồng**.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Hai lần mua hàng — khử một loại",
        dan="Viết hai lần mua thành hai dòng thẳng cột nhau rồi mới trừ.",
        y=y, giai_mau=buoc,
        huong_giai="Tìm loại hàng có **số lượng bằng nhau ở cả hai lần** rồi trừ hai "
                   "dòng cho nhau — loại ấy tự triệt tiêu. Nếu chưa lần nào bằng "
                   "nhau thì nhân cả hai dòng lên cho bằng đã.",
        td=["TD2", "TD5"],
        diem_chot="Chỉ được trừ khi số lượng của loại cần khử đã bằng nhau ở hai dòng.",
        loi="Trừ ngay khi hai dòng còn khác nhau ở cả hai loại — khử hụt, ra sai.",
        phong="Viết hai dòng thẳng cột, khoanh tròn loại có số lượng bằng nhau.",
        goi_y=("Loại hàng nào mua số lượng như nhau ở cả hai lần?",
               "Lần hai mua thêm bao nhiêu và trả thêm bao nhiêu tiền?",
               "Chia tiền trả thêm cho lượng mua thêm là ra giá một đơn vị."),
        pt_dang="Phương pháp khử",
        pt_kien_thuc="Phép nhân, phép chia; so sánh hai tình huống",
        pt_du_lieu="Đề cho **hai lần mua** cùng hai loại hàng với hai tổng tiền khác nhau",
        pt_phuong_phap="Trừ hai tình huống để triệt tiêu loại có số lượng bằng nhau",
        pt_nhanh="Nếu một loại đã bằng nhau sẵn thì trừ được ngay, không cần nhân.",
        tuong_tu=("Lần một mua 3 kg gạo và 2 kg đường hết 130 000 đồng. Lần hai mua "
                  "3 kg gạo và 5 kg đường hết 220 000 đồng. Tính giá 1 kg đường.",
                  "30 000 đồng"),
        mo_rong="Cho hai lần mua mà **không** loại nào bằng nhau, buộc phải nhân cả "
                "hai dòng lên trước khi trừ.",
        chuan_bi="Nhân, chia số có nhiều chữ số và cách trình bày bài giải nhiều bước.")


# ═══════════════════════ THAY THẾ — nhóm D ═══════════════════════

@dang_ky("PP-D-M4-02", "D", "M4", lop=(5,),
         tu_khoa=("thay thế", "phương pháp thế", "đổi ngang", "quy về một loại"),
         dang_bai=("Phương pháp thay thế", "Bài toán đổi ngang hai loại"),
         thuc_te=True, bay="Quên đổi ngược lại")
def pp_d_m4_02(rng, lop):
    """Đổi hết về một loại chuẩn rồi giải, sau đó đổi ngược."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        k_lan = rng.randint(2, 4)                 # 1 loại lớn = k_lan loại nhỏ
        n_lon = rng.randint(3, 7)
        n_nho = rng.randint(4, 12)
        gia_nho = rng.randrange(3, 15) * 1000
        tong = (n_lon * k_lan + n_nho) * gia_nho
        (h1, dv1), (h2, dv2) = rng.sample(DO_CAP, 2)
        de = (f"Mua {sv(n_lon)} {dv1} {h1} và {sv(n_nho)} {dv2} {h2} hết {sv(tong)} "
              f"đồng. Biết giá một {dv1} {h1} bằng giá {sv(k_lan)} {dv2} {h2}. "
              f"Tính giá một {dv2} {h2} và giá một {dv1} {h1}.")
        dap = (f"một {dv2} {h2}: {sv(gia_nho)} đồng; "
               f"một {dv1} {h1}: {sv(k_lan * gia_nho)} đồng")
        if k == 0:
            buoc = [
                f"Chọn {h2} làm loại chuẩn vì nó rẻ hơn, rồi **đổi hết** {h1} về {h2}.",
                f"{sv(n_lon)} {dv1} {h1} đổi được: {sv(n_lon)} × {sv(k_lan)} = "
                f"{sv(n_lon * k_lan)} ({dv2} {h2}).",
                f"Vậy số tiền ấy mua được tất cả: {sv(n_lon * k_lan)} + {sv(n_nho)} = "
                f"{sv(n_lon * k_lan + n_nho)} ({dv2} {h2}).",
                f"Giá một {dv2} {h2}: {sv(tong)} : {sv(n_lon * k_lan + n_nho)} = "
                f"{sv(gia_nho)} (đồng).",
                f"Đổi ngược lại — đây là bước hay bị quên. Giá một {dv1} {h1}: "
                f"{sv(gia_nho)} × {sv(k_lan)} = **{sv(k_lan * gia_nho)} đồng**.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Đổi hết về một loại rồi giải",
        dan="Ghi rõ đã chọn loại nào làm chuẩn trước khi tính.",
        y=y, giai_mau=buoc,
        huong_giai="Chọn loại **giá nhỏ hơn** làm chuẩn, đổi mọi loại còn lại về nó. "
                   "Bài trở thành bài chia đơn giản. Giải xong nhớ đổi ngược về đại "
                   "lượng đề hỏi.",
        td=["TD2", "TD5"],
        diem_chot="Đổi xong phải đổi ngược lại — đề hỏi cả hai giá, không chỉ một.",
        loi="Tính ra giá loại chuẩn rồi dừng, quên nhân lên cho loại kia.",
        phong="Gạch chân câu hỏi cuối trước khi tính, để biết đề hỏi mấy đại lượng.",
        goi_y=("Một cái loại đắt bằng mấy cái loại rẻ?",
               "Nếu đổi hết về loại rẻ thì tất cả là bao nhiêu cái?",
               "Chia tổng tiền cho số ấy, rồi nhân ngược lên cho loại đắt."),
        pt_dang="Phương pháp thay thế",
        pt_kien_thuc="Quan hệ gấp – kém; phép nhân, phép chia",
        pt_du_lieu="Đề cho **quan hệ đổi ngang** giữa hai loại cùng một tổng chung",
        pt_phuong_phap="Quy hết về loại chuẩn, giải, rồi đổi ngược",
        pt_nhanh="Tổng số cái sau khi đổi bằng số loại rẻ cộng số loại đắt nhân hệ số.",
        tuong_tu=("Mua 4 quyển sách và 6 quyển vở hết 216 000 đồng. Một quyển sách "
                  "bằng giá 3 quyển vở. Tính giá một quyển vở.",
                  "12 000 đồng"),
        mo_rong="Cho quan hệ đổi ngang giữa **ba** loại để phải đổi hai lần liên tiếp.",
        chuan_bi="Quan hệ gấp – kém và phép chia hết.")


DO_CAP = [("vở", "quyển"), ("bút", "chiếc"), ("sách", "quyển"), ("cặp", "chiếc"),
          ("thước", "chiếc"), ("hộp màu", "hộp")]


# ═══════════════════════ DIỆN TÍCH — nhóm F ═══════════════════════

@dang_ky("PP-F-M5-01", "F", "M5", lop=(5,),
         tu_khoa=("phương pháp diện tích", "tam giác chung chiều cao",
                  "tỉ số diện tích", "chia hình"),
         dang_bai=("Phương pháp diện tích", "Tam giác chung chiều cao",
                   "Bài toán tỉ số diện tích"),
         bay="So hai tam giác không chung chiều cao")
def pp_f_m5_01(rng, lop):
    """Tam giác chung chiều cao: tỉ số diện tích bằng tỉ số hai đáy."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        m, n = rng.randint(1, 4), rng.randint(2, 5)
        while n == m:
            n = rng.randint(2, 5)
        s_abm = rng.randrange(3, 20) * m * n          # chia hết cho m
        s_amc = s_abm // m * n
        de = (f"Tam giác ABC có điểm M nằm trên cạnh BC sao cho BM bằng "
              f"{ps(Fraction(m, n))} MC. Biết diện tích tam giác ABM là "
              f"{sv(s_abm)} cm², tính diện tích tam giác AMC và diện tích tam giác ABC.")
        dap = f"AMC = {sv(s_amc)} cm²; ABC = {sv(s_abm + s_amc)} cm²"
        if k == 0:
            buoc = [
                "Hai tam giác ABM và AMC **chung đỉnh A** và có đáy BM, MC cùng nằm "
                "trên đường thẳng BC — nên chúng chung chiều cao hạ từ A.",
                "Hai tam giác chung chiều cao thì tỉ số diện tích bằng đúng tỉ số "
                "hai đáy. Đây là toàn bộ nội dung của phương pháp diện tích.",
                f"BM : MC = {sv(m)} : {sv(n)}, nên diện tích ABM : diện tích AMC = "
                f"{sv(m)} : {sv(n)}.",
                f"Diện tích AMC = {sv(s_abm)} : {sv(m)} × {sv(n)} = {sv(s_amc)} (cm²).",
                f"Diện tích ABC = {sv(s_abm)} + {sv(s_amc)} = "
                f"**{sv(s_abm + s_amc)} cm²**.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Tam giác chung chiều cao — tỉ số diện tích bằng tỉ số đáy",
        dan="Vẽ hình trước khi tính. Ghi rõ hai tam giác nào chung chiều cao.",
        y=y, giai_mau=buoc,
        huong_giai="Tìm hai tam giác **chung một đỉnh** và có hai đáy nằm trên cùng "
                   "một đường thẳng. Khi ấy tỉ số diện tích bằng tỉ số hai đáy, và "
                   "từ diện tích suy ra được độ dài hoặc ngược lại.",
        td=["TD4", "TD6"],
        diem_chot="Điều kiện bắt buộc là **chung chiều cao**. Thiếu điều kiện ấy thì "
                  "tỉ số diện tích không còn bằng tỉ số đáy.",
        loi="Đem so hai tam giác không chung đỉnh, hoặc hai đáy không cùng nằm trên "
            "một đường thẳng.",
        phong="Chỉ vào đỉnh chung và vào đường thẳng chứa hai đáy trước khi lập tỉ số.",
        goi_y=("Hai tam giác ấy có chung đỉnh nào không?",
               "Hai đáy của chúng có cùng nằm trên một đường thẳng không?",
               "Nếu có thì tỉ số diện tích bằng đúng tỉ số hai đáy."),
        pt_dang="Phương pháp diện tích",
        pt_kien_thuc="Diện tích tam giác; tỉ số; tam giác chung chiều cao",
        pt_du_lieu="Hình bị chia thành nhiều phần, đề cho diện tích một phần và tỉ "
                   "số hai đoạn trên cùng một cạnh",
        pt_phuong_phap="Lập tỉ số diện tích bằng tỉ số hai đáy của hai tam giác chung "
                       "chiều cao",
        pt_nhanh="Không cần biết chiều cao là bao nhiêu — nó tự triệt tiêu trong tỉ số.",
        tuong_tu=("Tam giác ABC có M trên BC với BM = 1/2 MC. Diện tích ABM là 12 cm². "
                  "Tính diện tích ABC.",
                  "36 cm²"),
        mo_rong="Lấy thêm điểm N trên AC để có bốn tam giác nhỏ, hỏi diện tích tứ "
                "giác ở giữa.",
        chuan_bi="Công thức diện tích tam giác và cách rút gọn tỉ số.")


# ═══════════════════ DÙNG CHỮ THAY SỐ — nhóm A ═══════════════════

@dang_ky("PP-A-M4-01", "A", "M4", lop=(4, 5),
         tu_khoa=("dùng chữ thay số", "cấu tạo số", "tìm chữ số", "số có hai chữ số"),
         dang_bai=("Dùng chữ thay số", "Bài toán cấu tạo số viết bằng chữ",
                   "Tìm số khi biết quan hệ giữa các chữ số"),
         bay="Quên chữ số hàng cao nhất khác 0")
def pp_a_m4_01(rng, lop):
    """Viết cấu tạo số theo chữ rồi lập luận ra chữ số."""
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["doi_cho", "tong_tich"],
                                        rng.randint(4, 6))):
        if kieu == "doi_cho":
            hieu = rng.choice([9, 18, 27, 36, 45])
            d = hieu // 9
            ds = [10 * a + b for a in range(1, 10) for b in range(1, 10)
                  if a - b == d]
            n = rng.choice(ds)
            a, b = n // 10, n % 10
            de = (f"Số có hai chữ số ab. Khi đổi chỗ hai chữ số thì được số mới nhỏ "
                  f"hơn số cũ {sv(hieu)} đơn vị, và tổng hai chữ số bằng {sv(a + b)}. "
                  f"Tìm số ab.")
            dap = sv(n)
            if k == 0:
                buoc = [
                    "Viết cấu tạo số theo chữ: số ab bằng a × 10 + b, số ba bằng "
                    "b × 10 + a. Đây là bước quyết định của phương pháp.",
                    f"Hiệu hai số: (a × 10 + b) − (b × 10 + a) = a × 9 − b × 9 = "
                    f"(a − b) × 9.",
                    f"Mà hiệu ấy bằng {sv(hieu)}, nên a − b = {sv(hieu)} : 9 = {sv(d)}.",
                    f"Đề còn cho a + b = {sv(a + b)}. Biết tổng và hiệu hai chữ số: "
                    f"a = ({sv(a + b)} + {sv(d)}) : 2 = {sv(a)}, b = {sv(b)}.",
                    f"Kiểm lại a khác 0 vì a là chữ số hàng chục. Số phải tìm là "
                    f"**{sv(n)}**.",
                ]
        else:
            # Số có hai chữ số bằng k lần tổng hai chữ số của nó. Đề cũ ở đây cho
            # thẳng "a × 10 + b = 69" — tức là đã đọc ra ngay đáp số, không còn gì
            # để lập luận. Dạng này thì bắt buộc phải viết cấu tạo số mới giải được.
            k = rng.choice([2, 3, 4, 6, 7, 8, 9])
            ds = [10 * x + z for x in range(1, 10) for z in range(0, 10)
                  if 10 * x + z == k * (x + z)]
            while not ds:
                k = rng.choice([2, 3, 4, 6, 7, 8, 9])
                ds = [10 * x + z for x in range(1, 10) for z in range(0, 10)
                      if 10 * x + z == k * (x + z)]
            de = (f"Tìm mọi số có hai chữ số mà số đó bằng {sv(k)} lần tổng hai "
                  f"chữ số của nó.")
            dap = ", ".join(sv(v) for v in ds)
        y.append((de, dap))
    return Bai(
        tieu_de="Đặt chữ thay chữ số rồi lập luận",
        dan="Câu nào cũng phải viết cấu tạo số ra trước khi tính.",
        y=y, giai_mau=buoc,
        huong_giai="Viết số theo cấu tạo: số có hai chữ số ab bằng a × 10 + b. Thay "
                   "vào điều kiện đề cho rồi rút gọn — thường ra một quan hệ rất "
                   "gọn giữa a và b.",
        td=["TD1", "TD4"],
        diem_chot="Chữ số hàng cao nhất **khác 0**, và mọi chữ số chỉ nhận giá trị "
                  "từ 0 đến 9. Hai ràng buộc này thường là chỗ loại bớt đáp số.",
        loi="Tính ra a bằng 0 rồi vẫn nhận, hoặc để một chữ số vượt quá 9.",
        phong="Viết sẵn hai dòng ràng buộc lên đầu bài giải rồi mới tính.",
        goi_y=("Số có hai chữ số ab viết theo cấu tạo là gì?",
               "Thay cấu tạo ấy vào điều kiện đề cho, rồi rút gọn.",
               "Kiểm lại: chữ số hàng chục có khác 0 không?"),
        pt_dang="Dùng chữ thay số",
        pt_kien_thuc="Cấu tạo thập phân của số; tổng – hiệu",
        pt_du_lieu="Đề viết số bằng chữ hoặc bằng dấu sao và cho quan hệ giữa các chữ số",
        pt_phuong_phap="Viết cấu tạo số theo chữ, thay vào điều kiện rồi rút gọn",
        pt_nhanh="Đổi chỗ hai chữ số của số có hai chữ số thì hiệu luôn là bội của 9.",
        tuong_tu=("Số có hai chữ số, đổi chỗ hai chữ số được số nhỏ hơn 27 đơn vị, "
                  "tổng hai chữ số bằng 11. Tìm số ấy.",
                  "74"),
        mo_rong="Chuyển sang số có ba chữ số abc để học sinh phải viết "
                "a × 100 + b × 10 + c.",
        chuan_bi="Cấu tạo thập phân và bài toán tìm hai số biết tổng và hiệu.")


# ═══════════════════════ BIỂU ĐỒ VEN — nhóm H ═══════════════════════

@dang_ky("PP-H-M3-01", "H", "M3", lop=(4, 5),
         tu_khoa=("biểu đồ ven", "hai vòng tròn", "phần chung", "đếm không trùng"),
         dang_bai=("Biểu đồ Ven", "Bài toán đếm hai nhóm có phần chung"),
         thuc_te=True, bay="Cộng thẳng, quên trừ phần chung")
def pp_h_m3_01(rng, lop):
    """Hai câu lạc bộ có người tham gia cả hai — đếm bằng hai vòng tròn."""
    y, buoc = [], []
    for k in range(rng.randint(4, 6)):
        ca_hai = rng.randint(3, 12)
        chi_a = rng.randint(5, 20)
        chi_b = rng.randint(5, 20)
        ngoai = rng.randint(0, 6)
        tong = chi_a + chi_b + ca_hai + ngoai
        a, b = rng.sample(["cờ vua", "bóng rổ", "vẽ", "hát", "tiếng Anh", "bơi"], 2)
        lop_ = rng.choice(["4A", "4B", "5A", "5B"])
        de = (f"Lớp {lop_} có {sv(tong)} học sinh. Có {sv(chi_a + ca_hai)} em học "
              f"{a}, {sv(chi_b + ca_hai)} em học {b}, trong đó {sv(ca_hai)} em học "
              f"cả hai môn. Hỏi có bao nhiêu em không học môn nào trong hai môn ấy?")
        dap = f"{sv(ngoai)} em"
        if k == 0:
            buoc = [
                f"Vẽ hai vòng tròn chồng nhau. Điền **phần chung trước**: "
                f"{sv(ca_hai)} em học cả hai môn.",
                f"Chỉ học {a}: {sv(chi_a + ca_hai)} − {sv(ca_hai)} = {sv(chi_a)} (em).",
                f"Chỉ học {b}: {sv(chi_b + ca_hai)} − {sv(ca_hai)} = {sv(chi_b)} (em).",
                f"Số em học ít nhất một trong hai môn: {sv(chi_a)} + {sv(ca_hai)} + "
                f"{sv(chi_b)} = {sv(chi_a + ca_hai + chi_b)} (em).",
                f"Số em không học môn nào: {sv(tong)} − {sv(chi_a + ca_hai + chi_b)} "
                f"= **{sv(ngoai)} em**.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Hai nhóm có phần chung — đếm bằng hai vòng tròn",
        dan="Vẽ hai vòng tròn và điền số vào ba phần trước khi tính.",
        y=y, giai_mau=buoc,
        huong_giai="Điền phần chung vào trước, rồi trừ ra hai phần riêng. Cộng ba "
                   "phần ấy được số người tham gia ít nhất một hoạt động; lấy tổng "
                   "trừ đi là ra số người ngoài cả hai vòng.",
        td=["TD2", "TD4"],
        diem_chot="Con số đề cho cho mỗi môn **đã bao gồm** những em học cả hai. "
                  "Cộng thẳng hai con số ấy là đếm phần chung hai lần.",
        loi="Lấy tổng trừ đi tổng hai con số đề cho mà không cộng lại phần chung.",
        phong="Vẽ hình trước, điền phần giữa trước, rồi mới điền hai bên.",
        goi_y=("Bao nhiêu em học cả hai môn? Điền số ấy vào phần chồng nhau.",
               "Vậy chỉ học riêng mỗi môn là bao nhiêu em?",
               "Cộng ba phần rồi lấy sĩ số lớp trừ đi."),
        pt_dang="Biểu đồ Ven",
        pt_kien_thuc="Phép cộng, phép trừ; đếm không trùng lặp",
        pt_du_lieu="Đề cho số người của từng nhóm **và** số người thuộc cả hai nhóm",
        pt_phuong_phap="Vẽ hai vòng tròn, điền phần chung trước rồi mới trừ ra phần riêng",
        pt_nhanh="Số người ít nhất một nhóm = nhóm A + nhóm B − phần chung.",
        tuong_tu=("Lớp có 40 em, 25 em học vẽ, 20 em học hát, 10 em học cả hai. "
                  "Bao nhiêu em không học môn nào?",
                  "5 em"),
        mo_rong="Thêm nhóm thứ ba để phải vẽ ba vòng tròn và trừ ba phần chung đôi một.",
        chuan_bi="Phép cộng trừ trong phạm vi 100 và cách đọc đề có nhiều số liệu.")


# ═════════════ CHUYỂN ĐỘNG — bốn dạng chưa có kỹ thuật ═════════════

@dang_ky("PP-D-M4-03", "D", "M4", lop=(5,),
         tu_khoa=("xuôi dòng", "ngược dòng", "vận tốc dòng nước", "chuyển động trên sông"),
         dang_bai=("Chuyển động trên dòng nước", "Bài toán xuôi dòng ngược dòng",
                   "Vận tốc dòng nước"),
         thuc_te=True, bay="Nhầm vận tốc thực với vận tốc xuôi dòng")
def pp_d_m4_03(rng, lop):
    """Xuôi dòng, ngược dòng: hai công thức và cách tách vận tốc dòng."""
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["tim_xuoi_nguoc", "tim_hai_van_toc"],
                                        rng.randint(4, 5))):
        v_that = rng.randrange(12, 30, 2)
        v_dong = rng.randrange(2, 8)
        v_xuoi, v_nguoc = v_that + v_dong, v_that - v_dong
        if kieu == "tim_xuoi_nguoc":
            t = rng.randint(2, 5)
            de = (f"Một ca nô có vận tốc thực {sv(v_that)} km/giờ đi trên sông có "
                  f"vận tốc dòng nước {sv(v_dong)} km/giờ. Tính quãng đường ca nô đi "
                  f"được trong {sv(t)} giờ khi xuôi dòng và khi ngược dòng.")
            dap = f"xuôi dòng {sv(v_xuoi * t)} km; ngược dòng {sv(v_nguoc * t)} km"
            if k == 0:
                buoc = [
                    "Hai công thức phải thuộc: vận tốc xuôi dòng = vận tốc thực + "
                    "vận tốc dòng; vận tốc ngược dòng = vận tốc thực − vận tốc dòng.",
                    f"Vận tốc xuôi dòng: {sv(v_that)} + {sv(v_dong)} = {sv(v_xuoi)} "
                    f"(km/giờ).",
                    f"Vận tốc ngược dòng: {sv(v_that)} − {sv(v_dong)} = {sv(v_nguoc)} "
                    f"(km/giờ).",
                    f"Quãng đường xuôi dòng: {sv(v_xuoi)} × {sv(t)} = {sv(v_xuoi * t)} (km).",
                    f"Quãng đường ngược dòng: {sv(v_nguoc)} × {sv(t)} = "
                    f"**{sv(v_nguoc * t)} km**.",
                ]
        else:
            de = (f"Một ca nô xuôi dòng với vận tốc {sv(v_xuoi)} km/giờ và ngược dòng "
                  f"với vận tốc {sv(v_nguoc)} km/giờ. Tính vận tốc thực của ca nô và "
                  f"vận tốc dòng nước.")
            dap = f"vận tốc thực {sv(v_that)} km/giờ; dòng nước {sv(v_dong)} km/giờ"
        y.append((de, dap))
    return Bai(
        tieu_de="Chuyển động trên dòng nước",
        dan="Câu nào cũng ghi rõ đang dùng công thức xuôi dòng hay ngược dòng.",
        y=y, giai_mau=buoc,
        huong_giai="Xuôi dòng thì dòng nước đẩy thêm nên cộng; ngược dòng thì dòng "
                   "nước cản lại nên trừ. Biết cả hai vận tốc xuôi và ngược thì đây "
                   "chính là bài tổng – hiệu: vận tốc thực là nửa tổng, vận tốc dòng "
                   "là nửa hiệu.",
        td=["TD2", "TD5"],
        diem_chot="Vận tốc thực là vận tốc khi nước lặng — không bằng vận tốc xuôi "
                  "dòng, cũng không bằng vận tốc ngược dòng.",
        loi="Lấy vận tốc xuôi dòng làm vận tốc thực rồi cộng thêm vận tốc dòng lần nữa.",
        phong="Viết ba đại lượng thành ba dòng riêng, đặt tên rõ trước khi tính.",
        goi_y=("Xuôi dòng thì nước đẩy thêm hay cản lại?",
               "Vận tốc xuôi dòng bằng vận tốc thực cộng gì?",
               "Biết cả xuôi và ngược thì đây là bài tổng – hiệu."),
        pt_dang="Chuyển động trên dòng nước",
        pt_kien_thuc="Vận tốc – quãng đường – thời gian; tổng – hiệu",
        pt_du_lieu="Đề nhắc **dòng nước**, **xuôi dòng**, **ngược dòng**, ca nô hay thuyền",
        pt_phuong_phap="Áp hai công thức xuôi – ngược; biết cả hai thì quy về tổng – hiệu",
        pt_nhanh="Vận tốc dòng nước = (vận tốc xuôi − vận tốc ngược) : 2.",
        tuong_tu=("Ca nô xuôi dòng 24 km/giờ, ngược dòng 18 km/giờ. Tính vận tốc "
                  "dòng nước.",
                  "3 km/giờ"),
        mo_rong="Cho thêm một vật trôi tự do theo dòng để học sinh nhận ra vật ấy đi "
                "đúng bằng vận tốc dòng nước.",
        chuan_bi="Ba công thức vận tốc – quãng đường – thời gian và bài tổng – hiệu.")


@dang_ky("PP-D-M5-01", "D", "M5", lop=(5,),
         tu_khoa=("chiều dài đáng kể", "đoàn tàu qua cầu", "tàu chạy qua",
                  "vật chuyển động có chiều dài"),
         dang_bai=("Vật chuyển động có chiều dài đáng kể",
                   "Bài toán đoàn tàu qua cầu"),
         thuc_te=True, bay="Quên cộng chiều dài của chính đoàn tàu")
def pp_d_m5_01(rng, lop):
    """Đoàn tàu qua cầu: quãng đường bằng chiều dài cầu cộng chiều dài tàu."""
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["qua_cau", "qua_cot"],
                                        rng.randint(4, 5))):
        # Chỉ lấy vận tốc là bội của 18 km/giờ, vì khi ấy đổi sang mét trên giây
        # ra số nguyên (18 → 5, 36 → 10, 54 → 15, 72 → 20). Vận tốc khác cho ra
        # thời gian là phân số của một giây — đúng về số học nhưng không phải thứ
        # đặt trước học sinh lớp 5.
        v_kmh = rng.choice([18, 36, 54, 72])
        v_ms = v_kmh * 5 // 18
        if kieu == "qua_cau":
            # Quãng đường phải đủ dài để tách được một đoàn tàu từ 60 m và một cây
            # cầu từ 100 m. Chọn thời gian trước rồi mới suy ra quãng đường, và
            # chặn dưới ở 220 m — nếu không, vận tốc nhỏ cho ra quãng đường ngắn
            # hơn cả đoàn tàu và bài trở thành vô nghĩa.
            t_s = rng.randint(-(-220 // v_ms), 220 // v_ms + 28)
            s = v_ms * t_s
            l_tau = rng.randrange(60, min(200, s - 100) + 1, 20)
            l_cau = s - l_tau
            de = (f"Một đoàn tàu dài {sv(l_tau)} m chạy với vận tốc {sv(v_kmh)} km/giờ "
                  f"qua một cây cầu dài {sv(l_cau)} m. Tính thời gian đoàn tàu chạy "
                  f"qua hết cầu.")
            dap = f"{sv(t_s)} giây"
            if k == 0:
                buoc = [
                    "Đây là chỗ khác hẳn bài chuyển động thường: đoàn tàu **có chiều "
                    "dài**, nên quãng đường không phải chỉ là chiều dài cầu.",
                    "Tàu qua hết cầu tính từ lúc đầu tàu lên cầu tới lúc đuôi tàu "
                    "rời cầu, nên quãng đường = chiều dài cầu + chiều dài tàu.",
                    f"Quãng đường: {sv(l_cau)} + {sv(l_tau)} = {sv(s)} (m).",
                    f"Đổi vận tốc về mét trên giây: {sv(v_kmh)} km/giờ = "
                    f"{sv(v_kmh)} × 1 000 : 3 600 = {sv(v_ms)} (m/giây).",
                    f"Thời gian: {sv(s)} : {sv(v_ms)} = **{dap}**.",
                ]
        else:
            t_s = rng.randint(6, 20)
            l_tau = v_ms * t_s
            de = (f"Một đoàn tàu chạy với vận tốc {sv(v_kmh)} km/giờ, chạy qua một "
                  f"cột điện bên đường hết {sv(t_s)} giây. Tính chiều dài đoàn tàu.")
            dap = f"{sv(l_tau)} m"
        y.append((de, dap))
    return Bai(
        tieu_de="Đoàn tàu qua cầu, qua cột điện",
        dan="Câu nào cũng ghi rõ quãng đường tàu đi được gồm những phần nào.",
        y=y, giai_mau=buoc,
        huong_giai="Vật chuyển động có chiều dài thì quãng đường phải cộng thêm "
                   "chính chiều dài của nó. Qua cầu thì cộng chiều dài cầu; qua cột "
                   "điện — cột không có chiều dài đáng kể — thì quãng đường đúng "
                   "bằng chiều dài tàu.",
        td=["TD4", "TD6"],
        diem_chot="Quãng đường tính từ lúc **đầu tàu** bắt đầu tới lúc **đuôi tàu** "
                  "kết thúc, nên luôn phải cộng chiều dài đoàn tàu.",
        loi="Lấy quãng đường bằng đúng chiều dài cầu, quên chiều dài tàu.",
        phong="Vẽ đoàn tàu thành một đoạn thẳng đặt cạnh cây cầu trước khi tính.",
        goi_y=("Tàu qua hết cầu tính từ lúc nào tới lúc nào?",
               "Vậy quãng đường gồm chiều dài cầu và thêm cái gì nữa?",
               "Đổi vận tốc về mét trên giây trước khi chia."),
        pt_dang="Vật chuyển động có chiều dài đáng kể",
        pt_kien_thuc="Vận tốc – quãng đường – thời gian; đổi đơn vị vận tốc",
        pt_du_lieu="Đề cho **chiều dài của chính vật chuyển động** — đoàn tàu, đoàn "
                   "người, khúc gỗ",
        pt_phuong_phap="Cộng chiều dài vật vào quãng đường rồi mới chia cho vận tốc",
        pt_nhanh="Qua cột điện thì quãng đường bằng đúng chiều dài tàu — đây là cách "
                 "nhanh nhất để đo chiều dài đoàn tàu.",
        tuong_tu=("Tàu dài 150 m chạy 54 km/giờ qua cầu dài 300 m. Tính thời gian "
                  "qua hết cầu.",
                  "30 giây"),
        mo_rong="Cho hai đoàn tàu chạy ngược chiều vượt qua nhau, quãng đường lúc ấy "
                "là tổng chiều dài hai tàu.",
        chuan_bi="Đổi đơn vị km/giờ sang m/giây và ba công thức chuyển động.")


def uoc_chung(a: int, b: int) -> int:
    while b:
        a, b = b, a % b
    return a


# Các cặp (vận tốc lên dốc, vận tốc xuống dốc) mà vận tốc trung bình
# 2 × v₁ × v₂ : (v₁ + v₂) ra số nguyên, và cả hai đều là vận tốc xe đạp có thật.
BO_DOC = [(6, 12), (9, 18), (10, 15), (12, 24), (8, 24), (5, 20), (6, 30),
          (12, 36), (10, 40), (15, 30)]


@dang_ky("PP-D-M5-02", "D", "M5", lop=(5,),
         tu_khoa=("lên dốc", "xuống dốc", "đường bằng", "vận tốc thay đổi theo đoạn"),
         dang_bai=("Chuyển động lên dốc xuống dốc",
                   "Bài toán vận tốc khác nhau trên từng đoạn"),
         thuc_te=True, bay="Lấy trung bình cộng hai vận tốc")
def pp_d_m5_02(rng, lop):
    """Lên dốc, xuống dốc: tính theo từng đoạn, không lấy trung bình vận tốc."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        # Ba ràng buộc cùng lúc: dốc dài như một con dốc thật (dưới 40 km), thời
        # gian mỗi chặng ra số tròn, và vận tốc trung bình cũng ra số tròn. Chỉ ít
        # cặp vận tốc thoả cả ba, nên chọn sẵn thay vì rút ngẫu nhiên rồi chấp nhận
        # "dốc dài 588 km" và "vận tốc trung bình 144 phần 13".
        v_len, v_xuong = rng.choice(BO_DOC)
        boi = v_len * v_xuong // uoc_chung(v_len, v_xuong)      # bội chung nhỏ nhất
        s = boi * rng.randint(1, max(1, 40 // boi))
        t_len = Fraction(s, v_len)
        t_xuong = Fraction(s, v_xuong)
        tb = Fraction(2 * s, t_len + t_xuong)
        de = (f"Một người đi xe đạp lên dốc dài {sv(s)} km với vận tốc {sv(v_len)} "
              f"km/giờ, rồi xuống dốc chính con dốc ấy với vận tốc {sv(v_xuong)} "
              f"km/giờ. Tính vận tốc trung bình của cả lượt đi và lượt về.")
        dap = f"{ps(tb)} km/giờ" if tb.denominator != 1 else f"{sv(tb.numerator)} km/giờ"
        if k == 0:
            buoc = [
                f"Đây là bẫy kinh điển: **không** được lấy trung bình cộng hai vận "
                f"tốc, vì thời gian đi hai đoạn không bằng nhau.",
                f"Thời gian lên dốc: {sv(s)} : {sv(v_len)} = {ps(t_len)} (giờ).",
                f"Thời gian xuống dốc: {sv(s)} : {sv(v_xuong)} = {ps(t_xuong)} (giờ).",
                f"Tổng quãng đường cả đi lẫn về: {sv(s)} × 2 = {sv(2 * s)} (km). "
                f"Tổng thời gian: {ps(t_len)} + {ps(t_xuong)} = {ps(t_len + t_xuong)} (giờ).",
                f"Vận tốc trung bình = tổng quãng đường : tổng thời gian = "
                f"{sv(2 * s)} : {ps(t_len + t_xuong)} = **{dap}**.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Lên dốc, xuống dốc — vận tốc trung bình",
        dan="Tính riêng thời gian từng đoạn trước, tuyệt đối không cộng hai vận tốc "
            "rồi chia đôi.",
        y=y, giai_mau=buoc,
        huong_giai="Vận tốc trung bình luôn bằng **tổng quãng đường chia tổng thời "
                   "gian**, không bao giờ bằng trung bình cộng của các vận tốc. Vì "
                   "đoạn đi chậm mất nhiều thời gian hơn nên nó kéo trung bình xuống.",
        td=["TD2", "TD6"],
        diem_chot="Vận tốc trung bình luôn **nhỏ hơn** trung bình cộng hai vận tốc. "
                  "Ra lớn hơn hoặc bằng là chắc chắn sai.",
        loi="Lấy (vận tốc lên + vận tốc xuống) : 2.",
        phong="Sau khi tính xong, so đáp số với trung bình cộng — phải nhỏ hơn.",
        goi_y=("Đi lên và đi xuống, đoạn nào mất nhiều thời gian hơn?",
               "Tính riêng thời gian mỗi đoạn.",
               "Vận tốc trung bình = tổng quãng đường : tổng thời gian."),
        pt_dang="Chuyển động lên dốc xuống dốc",
        pt_kien_thuc="Vận tốc – quãng đường – thời gian; vận tốc trung bình",
        pt_du_lieu="Đề cho **hai vận tốc khác nhau trên hai đoạn** của cùng một hành trình",
        pt_phuong_phap="Tính thời gian từng đoạn, cộng lại, rồi chia tổng quãng đường",
        pt_nhanh="Đi và về cùng một quãng đường thì vận tốc trung bình = "
                 "2 × v₁ × v₂ : (v₁ + v₂).",
        tuong_tu=("Lên dốc 12 km với 6 km/giờ, xuống dốc ấy với 12 km/giờ. Tính vận "
                  "tốc trung bình.",
                  "8 km/giờ"),
        mo_rong="Chia hành trình thành ba đoạn có ba vận tốc để công thức tắt không "
                "còn dùng được, buộc phải quay về cách tính chung.",
        chuan_bi="Ba công thức chuyển động và phép cộng phân số.")


# ═══════════════ TÍNH NGƯỢC TỪ CUỐI — nhóm B ═══════════════

@dang_ky("PP-B-M3-01", "B", "M3", lop=(4, 5),
         tu_khoa=("tính ngược", "ngược từ cuối", "tìm số ban đầu", "sơ đồ mũi tên"),
         dang_bai=("Tính ngược từ cuối", "Bài toán tìm số ban đầu",
                   "Bài toán chuỗi phép tính ngược"),
         bay="Đi ngược nhưng không đảo thứ tự")
def pp_b_m3_01(rng, lop):
    """Chuỗi phép tính rồi cho kết quả cuối, hỏi số ban đầu."""
    y, buoc = [], []
    for k in range(rng.randint(4, 6)):
        x = rng.randint(6, 60)
        a = rng.randint(2, 9)          # nhân
        b = rng.randint(5, 40)         # cộng
        c = rng.randint(2, 6)          # chia
        # Chọn số sao cho mọi bước đều chia hết — học sinh tiểu học không làm
        # phép chia có dư trong một chuỗi biến đổi.
        while (x * a + b) % c != 0:
            b += 1
        kq = (x * a + b) // c
        de = (f"Em nghĩ ra một số. Lấy số ấy nhân với {sv(a)}, được bao nhiêu thì "
              f"cộng thêm {sv(b)}, rồi chia cho {sv(c)} thì được {sv(kq)}. "
              f"Hỏi số em nghĩ ra là số nào?")
        dap = sv(x)
        if k == 0:
            buoc = [
                f"Viết chuỗi thao tác thành sơ đồ mũi tên: "
                f"số cần tìm → × {sv(a)} → + {sv(b)} → : {sv(c)} → {sv(kq)}.",
                f"Đi **ngược mũi tên**, và mỗi bước làm phép tính ngược lại. "
                f"Phép cuối cùng là chia cho {sv(c)}, nên bước đầu khi đi ngược là "
                f"nhân với {sv(c)}: {sv(kq)} × {sv(c)} = {sv(x * a + b)}.",
                f"Phép trước đó là cộng {sv(b)}, đi ngược thì trừ: "
                f"{sv(x * a + b)} − {sv(b)} = {sv(x * a)}.",
                f"Phép đầu tiên là nhân {sv(a)}, đi ngược thì chia: "
                f"{sv(x * a)} : {sv(a)} = {sv(x)}.",
                f"Số cần tìm là **{sv(x)}**. Thử lại xuôi: {sv(x)} × {sv(a)} = "
                f"{sv(x * a)}, cộng {sv(b)} được {sv(x * a + b)}, chia {sv(c)} "
                f"được {sv(kq)} — đúng bằng đề cho.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Tìm số ban đầu bằng cách tính ngược",
        dan="Vẽ sơ đồ mũi tên trước khi tính. Tính xong phải thử lại theo chiều xuôi.",
        y=y, giai_mau=buoc,
        huong_giai="Viết chuỗi thao tác thành sơ đồ mũi tên rồi đi ngược lại từ kết "
                   "quả cuối. Mỗi bước đảo phép tính: nhân thành chia, cộng thành "
                   "trừ. Thứ tự cũng phải đảo — phép làm sau cùng được gỡ trước tiên.",
        td=["TD3", "TD5"],
        diem_chot="Đảo **cả phép tính lẫn thứ tự**. Đảo phép tính mà giữ nguyên thứ "
                  "tự thì vẫn sai.",
        loi="Bắt đầu gỡ từ phép tính đầu tiên của đề thay vì từ phép tính cuối cùng.",
        phong="Thử lại theo chiều xuôi. Bài này luôn thử lại được, nên không có lý "
              "do gì để nộp một đáp số chưa thử.",
        goi_y=("Đề đã làm những phép tính nào, theo thứ tự nào?",
               "Phép nào làm sau cùng? Gỡ phép ấy trước tiên.",
               "Nhân thì gỡ bằng chia, cộng thì gỡ bằng trừ."),
        pt_dang="Tính ngược từ cuối",
        pt_kien_thuc="Bốn phép tính; quan hệ giữa phép tính và phép tính ngược",
        pt_du_lieu="Đề kể một **chuỗi thao tác** rồi cho kết quả cuối, hỏi số ban đầu",
        pt_phuong_phap="Vẽ sơ đồ mũi tên, đi ngược và đảo từng phép tính",
        pt_nhanh="Gỡ từ phải sang trái, mỗi bước một phép tính ngược — không cần đặt ẩn.",
        tuong_tu=("Một số nhân 3, cộng 7, chia 2 thì được 20. Tìm số ấy.", "11"),
        mo_rong="Thêm bước “trừ đi một nửa số đang có” để học sinh phải gỡ một phép "
                "tính có liên quan tới chính số ấy.",
        chuan_bi="Bốn phép tính với số có hai chữ số và thứ tự thực hiện phép tính.")


# ═══════════════════ LẬP BẢNG ĐÚNG – SAI — nhóm G ═══════════════════

@dang_ky("PP-G-M4-02", "G", "M4", lop=(4, 5),
         tu_khoa=("lập bảng", "bảng đúng sai", "ghép người với việc", "suy luận bằng bảng"),
         dang_bai=("Lập bảng", "Bài toán ghép người với việc",
                   "Suy luận bằng bảng đúng – sai"),
         thuc_te=True, bay="Đánh dấu đúng mà quên gạch phần còn lại")
def pp_g_m4_02(rng, lop):
    """Ghép ba bạn với ba môn, cho hai điều phủ định."""
    y, buoc = [], []
    MON = [("bơi", "cờ vua", "vẽ"), ("hát", "múa", "đàn"),
           ("bóng đá", "cầu lông", "bóng rổ"), ("tiếng Anh", "tin học", "mĩ thuật")]
    for k in range(rng.randint(4, 5)):
        a, b, c = rng.sample(TEN, 3)
        m1, m2, m3 = rng.choice(MON)
        # Xếp thật rồi mới viết manh mối, để lời giải chắc chắn đúng và duy nhất.
        nguoi = [a, b, c]
        mon = rng.sample([m1, m2, m3], 3)
        xep = dict(zip(nguoi, mon))
        # Hai manh mối phủ định đủ để suy ra duy nhất: loại người 1 khỏi hai môn.
        khac1 = [m for m in mon if m != xep[a]]
        de = (f"Ba bạn {a}, {b} và {c} mỗi bạn học một môn năng khiếu khác nhau "
              f"trong ba môn: {m1}, {m2} và {m3}. Biết rằng: {a} không học "
              f"{khac1[0]} và cũng không học {khac1[1]}; {b} không học {xep[c]}. "
              f"Hỏi mỗi bạn học môn nào?")
        dap = "; ".join(f"{n} học {xep[n]}" for n in nguoi)
        if k == 0:
            buoc = [
                f"Kẻ bảng ba dòng ({a}, {b}, {c}) và ba cột ({m1}, {m2}, {m3}). "
                f"Mỗi ô ghi ✓ nếu chắc chắn đúng, × nếu chắc chắn sai.",
                f"Manh mối thứ nhất cho hai dấu ×: dòng {a} bị gạch ở cột "
                f"{khac1[0]} và cột {khac1[1]}.",
                f"Dòng {a} chỉ còn một ô trống, nên ô ấy là ✓: **{a} học {xep[a]}**. "
                f"Đây là bước hay bị quên tiếp theo — đã có ✓ thì phải gạch × cho "
                f"cả **cột** {xep[a]} ở hai dòng còn lại.",
                f"Manh mối thứ hai: dòng {b} bị gạch ở cột {xep[c]}. Cột {xep[a]} "
                f"cũng đã gạch, nên dòng {b} chỉ còn một ô: **{b} học {xep[b]}**.",
                f"Còn lại **{c} học {xep[c]}**. Thử lại cả hai manh mối đều đúng.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Ghép người với môn bằng bảng đúng – sai",
        dan="Bắt buộc kẻ bảng ra giấy. Không được suy luận nhẩm ở bài này.",
        y=y, giai_mau=buoc,
        huong_giai="Mỗi dòng một người, mỗi cột một khả năng. Đánh × cho điều chắc "
                   "chắn sai. Dòng nào chỉ còn một ô trống thì ô ấy là ✓ — và ngay "
                   "sau đó phải gạch × cho cả cột chứa ô ấy.",
        td=["TD3", "TD4"],
        diem_chot="Đặt được một ✓ thì **cả dòng và cả cột** còn lại đều thành ×. "
                  "Bỏ bước gạch cột là chỗ bài bị tắc giữa chừng.",
        loi="Đánh ✓ rồi đi tiếp luôn, không gạch × cho phần còn lại của cột.",
        phong="Sau mỗi lần đặt ✓, dừng lại gạch đủ dòng và cột rồi mới đọc manh mối kế.",
        goi_y=("Kẻ bảng ba dòng ba cột trước đã.",
               "Manh mối nào cho biết chắc chắn một ô là sai?",
               "Dòng nào chỉ còn một ô trống thì ô ấy chính là đáp án của dòng ấy."),
        pt_dang="Lập bảng",
        pt_kien_thuc="Suy luận loại trừ; đọc hiểu câu phủ định",
        pt_du_lieu="Đề ghép **người với việc** và cho một loạt câu khẳng định hoặc "
                   "phủ định",
        pt_phuong_phap="Kẻ bảng hai chiều, đánh × và ✓, mỗi ✓ kéo theo cả dòng cả cột",
        pt_nhanh="Bắt đầu từ người bị loại nhiều khả năng nhất — dòng ấy chốt được sớm nhất.",
        tuong_tu=("An, Bình, Chi học ba môn bơi, vẽ, hát. An không học bơi và không "
                  "học vẽ. Bình không học hát. Hỏi mỗi bạn học môn nào?",
                  "An học hát; Bình học vẽ; Chi học bơi"),
        mo_rong="Thêm bạn thứ tư và môn thứ tư, cùng một manh mối dạng “bạn X học "
                "môn mà bạn Y không học”.",
        chuan_bi="Đọc hiểu câu phủ định và cách kẻ bảng hai chiều.")


# ═══════════════════════════════════════════════════════════════════
#  MỨC M5 — CHỖ PHÂN HOÁ HỌC SINH GIỎI
#
#  Mỗi mẫu dưới đây **ghép hai phương pháp** vào một bài. Đó đúng là hình dạng
#  của câu chốt trong đề thi vào lớp 6 trường chuyên: không có bài nào chỉ đòi
#  một thủ pháp, mà luôn đòi nhận ra thủ pháp thứ nhất, dùng nó để rút gọn, rồi
#  mới thấy thủ pháp thứ hai. Học sinh thuộc từng phương pháp rời vẫn tắc ở đây
#  nếu chưa bao giờ luyện việc nối hai phương pháp lại.
# ═══════════════════════════════════════════════════════════════════

@dang_ky("PP-A-M5-01", "A", "M5", lop=(5,),
         tu_khoa=("dùng chữ thay số", "thử chọn", "số có ba chữ số", "chữ thay số"),
         dang_bai=("Dùng chữ thay số", "Thử chọn",
                   "Tìm số có ba chữ số thoả nhiều điều kiện"),
         bay="Bỏ sót nghiệm hoặc nhận nghiệm có chữ số hàng trăm bằng 0")
def pp_a_m5_01(rng, lop):
    """Ghép dùng chữ thay số với thử chọn — số có ba chữ số, ba điều kiện."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        t = rng.randint(9, 20)                 # tổng ba chữ số
        d = rng.choice([3, 4, 6, 9])           # chia hết cho d
        ds = [n for n in range(100, 1000)
              if sum(map(int, str(n))) == t and n % d == 0
              and int(str(n)[0]) > int(str(n)[2])]
        while not ds:
            t = rng.randint(9, 20)
            d = rng.choice([3, 4, 6, 9])
            ds = [n for n in range(100, 1000)
                  if sum(map(int, str(n))) == t and n % d == 0
                  and int(str(n)[0]) > int(str(n)[2])]
        de = (f"Tìm mọi số có ba chữ số abc thoả cả ba điều kiện: tổng ba chữ số "
              f"bằng {sv(t)}; số đó chia hết cho {sv(d)}; chữ số hàng trăm lớn hơn "
              f"chữ số hàng đơn vị.")
        dap = ", ".join(sv(n) for n in ds[:8]) + ("…" if len(ds) > 8 else "")
        if k == 0:
            buoc = [
                "Bài này đòi **hai phương pháp nối nhau**. Một mình thử chọn thì "
                "phải xét 900 số — quá nhiều. Một mình dùng chữ thay số thì ra "
                "quan hệ nhưng chưa ra số. Phải dùng cả hai.",
                f"Dùng chữ thay số trước: viết abc = a × 100 + b × 10 + c. Điều "
                f"kiện tổng chữ số bằng {sv(t)} cho a + b + c = {sv(t)}.",
                f"Điều kiện chia hết cho {sv(d)} kết hợp với tổng chữ số "
                f"{sv(t)} thu hẹp mạnh danh sách — chỉ còn các số mà tổng chữ số "
                f"vừa bằng {sv(t)} vừa thoả dấu hiệu chia hết.",
                "Bây giờ mới thử chọn trên danh sách đã ngắn, và lọc nốt bằng "
                "điều kiện thứ ba a > c.",
                f"Kết quả: **{dap}** — tất cả {sv(len(ds))} số. Nhớ kiểm a khác 0 "
                f"vì a là chữ số hàng trăm.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Tìm số có ba chữ số thoả ba điều kiện",
        dan="Ghi rõ đã dùng điều kiện nào để thu hẹp trước. Đáp số thường gồm "
            "nhiều số.",
        y=y, giai_mau=buoc,
        huong_giai="Viết cấu tạo số theo chữ để đọc ra quan hệ giữa các chữ số, "
                   "rồi dùng điều kiện chặt nhất thu hẹp danh sách trước khi thử. "
                   "Thử chọn mà không thu hẹp trước là phải xét gần một nghìn số.",
        td=["TD1", "TD3", "TD4"],
        diem_chot="Ghép hai phương pháp theo đúng thứ tự: **rút gọn trước, thử sau**.",
        loi="Thử luôn từ 100 đến 999, hết giờ mà chưa xong.",
        phong="Trước khi thử, tự hỏi điều kiện nào cho ít khả năng nhất.",
        goi_y=("Viết cấu tạo số abc theo chữ.",
               "Trong ba điều kiện, điều kiện nào cho ít số nhất?",
               "Lọc bằng điều kiện ấy rồi mới thử hai điều kiện còn lại."),
        pt_dang="Dùng chữ thay số kết hợp thử chọn",
        pt_kien_thuc="Cấu tạo thập phân; dấu hiệu chia hết; đếm có hệ thống",
        pt_du_lieu="Đề đòi một số thoả **ba điều kiện trở lên** trên các chữ số",
        pt_phuong_phap="Dùng chữ thay số để rút gọn, rồi thử chọn trên danh sách đã ngắn",
        pt_nhanh="Tổng ba chữ số cố định thì dấu hiệu chia hết cho 3 và 9 kiểm được ngay "
                 "trên tổng ấy, không cần chia thử từng số.",
        tuong_tu=("Tìm số có ba chữ số chia hết cho 9, tổng ba chữ số bằng 18, "
                  "chữ số hàng trăm lớn hơn hàng đơn vị.",
                  "Gồm nhiều số, chẳng hạn 981, 972, 963"),
        mo_rong="Thêm điều kiện chữ số hàng chục là số chẵn, để phải lọc bốn lần.",
        chuan_bi="Cấu tạo số có ba chữ số và dấu hiệu chia hết cho 3, 4, 9.")


@dang_ky("PP-D-M5-03", "D", "M5", lop=(5,),
         tu_khoa=("giả thiết tạm", "thay thế", "ba loại", "phương pháp thế"),
         dang_bai=("Phương pháp thay thế", "Giả thiết tạm",
                   "Bài toán ba loại vật có quan hệ đổi ngang"),
         thuc_te=True, bay="Đổi xong quên đổi ngược đủ cả ba loại")
def pp_d_m5_03(rng, lop):
    """Ghép thay thế với giả thiết tạm — ba loại vật, hai quan hệ đổi ngang."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        k1 = rng.randint(2, 4)          # 1 loại vừa = k1 loại nhỏ
        k2 = rng.randint(2, 3)          # 1 loại lớn = k2 loại vừa
        n_lon, n_vua, n_nho = (rng.randint(2, 5), rng.randint(3, 7),
                               rng.randint(4, 10))
        gia_nho = rng.randrange(2, 12) * 1000
        tong_nho = n_lon * k1 * k2 + n_vua * k1 + n_nho
        tong = tong_nho * gia_nho
        de = (f"Mua {sv(n_lon)} hộp lớn, {sv(n_vua)} hộp vừa và {sv(n_nho)} hộp nhỏ "
              f"hết {sv(tong)} đồng. Biết một hộp vừa bằng giá {sv(k1)} hộp nhỏ, "
              f"và một hộp lớn bằng giá {sv(k2)} hộp vừa. Tính giá mỗi loại hộp.")
        dap = (f"nhỏ {sv(gia_nho)} đồng; vừa {sv(k1 * gia_nho)} đồng; "
               f"lớn {sv(k1 * k2 * gia_nho)} đồng")
        if k == 0:
            buoc = [
                "Ba loại và hai quan hệ đổi ngang. Quy tắc: **đổi hết về loại nhỏ "
                "nhất**, vì mọi quan hệ đều dẫn được về nó.",
                f"Một hộp lớn = {sv(k2)} hộp vừa = {sv(k2)} × {sv(k1)} = "
                f"{sv(k1 * k2)} hộp nhỏ.",
                f"Đổi cả đơn hàng về hộp nhỏ: {sv(n_lon)} × {sv(k1 * k2)} + "
                f"{sv(n_vua)} × {sv(k1)} + {sv(n_nho)} = {sv(tong_nho)} (hộp nhỏ).",
                f"Giá một hộp nhỏ: {sv(tong)} : {sv(tong_nho)} = {sv(gia_nho)} (đồng).",
                f"Đổi ngược **đủ cả hai loại còn lại** — đây là chỗ hay sót: hộp "
                f"vừa {sv(gia_nho)} × {sv(k1)} = {sv(k1 * gia_nho)} đồng; hộp lớn "
                f"{sv(k1 * gia_nho)} × {sv(k2)} = **{sv(k1 * k2 * gia_nho)} đồng**.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Ba loại hộp, hai quan hệ đổi ngang",
        dan="Ghi rõ đã chọn loại nào làm chuẩn, và đổi ngược đủ cả ba loại.",
        y=y, giai_mau=buoc,
        huong_giai="Nối hai quan hệ đổi ngang lại để đưa loại lớn nhất về loại nhỏ "
                   "nhất, rồi quy cả đơn hàng về loại nhỏ. Giải xong đổi ngược "
                   "theo đúng thứ tự ngược lại.",
        td=["TD2", "TD5", "TD6"],
        diem_chot="Nối hai quan hệ là phép **nhân**, không phải phép cộng: một lớn "
                  "bằng k₁ × k₂ nhỏ, không phải k₁ + k₂ nhỏ.",
        loi="Cộng hai hệ số đổi ngang, hoặc chỉ đổi ngược một loại rồi dừng.",
        phong="Vẽ ba mức thành ba tầng, ghi hệ số trên mỗi mũi tên.",
        goi_y=("Một hộp lớn bằng bao nhiêu hộp nhỏ?",
               "Đổi cả đơn hàng về hộp nhỏ thì được bao nhiêu hộp?",
               "Đề hỏi giá mấy loại? Đổi ngược đủ chừng ấy loại."),
        pt_dang="Phương pháp thay thế",
        pt_kien_thuc="Quan hệ gấp – kém bắc cầu; nhân, chia",
        pt_du_lieu="Đề cho **ba loại** và **hai quan hệ đổi ngang** nối tiếp nhau",
        pt_phuong_phap="Bắc cầu hai quan hệ, quy hết về loại nhỏ nhất, giải, rồi đổi ngược",
        pt_nhanh="Hệ số từ loại lớn về loại nhỏ là tích của hai hệ số trung gian.",
        tuong_tu=("Mua 2 hộp lớn, 3 hộp vừa, 4 hộp nhỏ hết 260 000 đồng. Một hộp vừa "
                  "bằng 2 hộp nhỏ, một hộp lớn bằng 3 hộp vừa. Tính giá hộp nhỏ.",
                  "10 000 đồng"),
        mo_rong="Thêm loại thứ tư để phải bắc cầu ba lần.",
        chuan_bi="Quan hệ gấp – kém và phép chia hết.")


@dang_ky("PP-B-M5-01", "B", "M5", lop=(5,),
         tu_khoa=("tính ngược", "ngược từ cuối", "phân số", "sơ đồ mũi tên"),
         dang_bai=("Tính ngược từ cuối", "Bài toán chia phần còn lại",
                   "Bài toán tìm số ban đầu qua nhiều lần chia"),
         bay="Lấy phân số trên số ban đầu thay vì trên phần còn lại")
def pp_b_m5_01(rng, lop):
    """Ghép tính ngược từ cuối với phân số — bài chia phần còn lại kinh điển."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        # Dựng ngược từ số cuối để mọi bước đều chia hết.
        con = rng.randint(3, 20)
        m1, m2 = rng.choice([(2, 2), (2, 3), (3, 2), (3, 3), (2, 4)])
        b2 = con * m2 // (m2 - 1) if (con * m2) % (m2 - 1) == 0 else None
        if b2 is None:
            con = (m2 - 1) * rng.randint(2, 8)
            b2 = con * m2 // (m2 - 1)
        b1 = b2 * m1 // (m1 - 1) if (b2 * m1) % (m1 - 1) == 0 else None
        if b1 is None:
            b2 = (m1 - 1) * ((b2 // (m1 - 1)) + 1)
            con = b2 * (m2 - 1) // m2
            b1 = b2 * m1 // (m1 - 1)
        de = (f"Một rổ cam. Lần thứ nhất bán {ps(__import__('fractions').Fraction(1, m1))} "
              f"số cam trong rổ. Lần thứ hai bán "
              f"{ps(__import__('fractions').Fraction(1, m2))} **số cam còn lại sau "
              f"lần thứ nhất**. Cuối cùng trong rổ còn {sv(con)} quả. Hỏi lúc đầu "
              f"rổ có bao nhiêu quả cam?")
        dap = f"{sv(b1)} quả"
        if k == 0:
            buoc = [
                f"Chỗ bẫy nằm ngay ở đề: lần hai bán một phần {sv(m2)} của **số "
                f"còn lại**, không phải của số ban đầu. Đọc sót chữ ấy là sai cả bài.",
                f"Đi ngược từ cuối. Sau lần hai còn {sv(con)} quả, mà lần hai bán "
                f"một phần {sv(m2)} nên {sv(con)} quả ứng với {sv(m2 - 1)} phần "
                f"{sv(m2)} số cam trước lần hai.",
                f"Số cam trước lần hai: {sv(con)} : {sv(m2 - 1)} × {sv(m2)} = "
                f"{sv(b2)} (quả).",
                f"Tương tự, {sv(b2)} quả ứng với {sv(m1 - 1)} phần {sv(m1)} số cam "
                f"ban đầu.",
                f"Số cam ban đầu: {sv(b2)} : {sv(m1 - 1)} × {sv(m1)} = "
                f"**{sv(b1)} quả**. Thử lại xuôi để chắc chắn.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Bán hai lần theo phân số, tìm số ban đầu",
        dan="Trước khi tính, gạch chân xem mỗi phân số lấy trên số nào.",
        y=y, giai_mau=buoc,
        huong_giai="Đi ngược từ số cuối. Ở mỗi bước, số hiện có ứng với phần còn "
                   "lại sau khi bán, nên nhân với mẫu rồi chia cho phần còn lại. "
                   "Tính xong bắt buộc thử lại theo chiều xuôi.",
        td=["TD3", "TD5", "TD6"],
        diem_chot="Phân số của lần sau lấy trên **phần còn lại**, không lấy trên "
                  "số ban đầu. Đây là bẫy chính của cả dạng bài.",
        loi="Lấy cả hai phân số trên số ban đầu rồi cộng lại.",
        phong="Thử lại theo chiều xuôi — bài này luôn thử lại được.",
        goi_y=("Sau lần hai còn lại mấy phần mấy của số trước lần hai?",
               "Từ đó tính ngược ra số cam trước lần hai.",
               "Làm y như vậy một lần nữa để ra số ban đầu."),
        pt_dang="Tính ngược từ cuối",
        pt_kien_thuc="Phân số của một số; phép chia; tính ngược",
        pt_du_lieu="Đề bán hoặc dùng nhiều lần, lần sau lấy trên **phần còn lại**",
        pt_phuong_phap="Đi ngược từ số cuối, mỗi bước nhân mẫu chia cho phần còn lại",
        pt_nhanh="Bán một phần m thì còn (m − 1) phần m — nhân ngược bằng "
                 "m : (m − 1) cho mỗi lần.",
        tuong_tu=("Bán 1/2 số cam, rồi bán 1/3 số còn lại, cuối cùng còn 10 quả. "
                  "Lúc đầu có bao nhiêu quả?",
                  "30 quả"),
        mo_rong="Thêm lần bán thứ ba, hoặc cho lần cuối bán thêm một số quả lẻ.",
        chuan_bi="Tìm phân số của một số và bài toán tính ngược một bước.")


@dang_ky("PP-G-M5-01", "G", "M5", lop=(5,),
         tu_khoa=("lập bảng", "suy luận", "bảng đúng sai", "xét trường hợp"),
         dang_bai=("Lập bảng", "Xét trường hợp",
                   "Bài toán ghép bốn người với bốn thuộc tính"),
         bay="Xét thiếu trường hợp khi manh mối không chốt được ngay")
def pp_g_m5_01(rng, lop):
    """Ghép lập bảng với xét trường hợp — bốn người, hai thuộc tính."""
    y, buoc = [], []
    MON = ("Toán", "Văn", "Anh", "Tin")
    GIAI = ("nhất", "nhì", "ba", "khuyến khích")
    for k in range(rng.randint(4, 5)):
        ng = rng.sample(TEN, 4)
        mon = rng.sample(MON, 4)
        giai = rng.sample(GIAI, 4)
        xm = dict(zip(ng, mon))
        xg = dict(zip(ng, giai))
        # Bốn manh mối đủ chốt duy nhất: hai phủ định môn, một nối môn với giải,
        # một phủ định giải.
        de = (f"Bốn bạn {', '.join(ng)} mỗi bạn thi một môn khác nhau trong bốn môn "
              f"{', '.join(mon)} và mỗi bạn được một giải khác nhau trong bốn giải "
              f"{', '.join(giai)}. Biết rằng: "
              f"(1) {ng[0]} không thi {xm[ng[1]]} và không thi {xm[ng[2]]}; "
              f"(2) {ng[1]} không thi {xm[ng[2]]} và không thi {xm[ng[3]]}; "
              f"(3) {ng[3]} thi {xm[ng[3]]}; "
              f"(4) bạn thi {xm[ng[0]]} được giải {xg[ng[0]]}, bạn thi {xm[ng[1]]} "
              f"được giải {xg[ng[1]]}, và {ng[2]} không được giải {xg[ng[3]]}. "
              f"Hỏi mỗi bạn thi môn gì và được giải gì?")
        dap = "; ".join(f"{n} thi {xm[n]} được giải {xg[n]}" for n in ng)
        if k == 0:
            buoc = [
                "Bài hai tầng: vừa ghép người với môn, vừa ghép người với giải. "
                "Kẻ **hai bảng** chứ đừng cố nhét vào một bảng.",
                f"Bảng môn — manh mối (3) cho ngay một dấu ✓: {ng[3]} thi "
                f"{xm[ng[3]]}. Gạch × cả dòng {ng[3]} và cả cột {xm[ng[3]]}.",
                f"Manh mối (1) gạch hai ô của dòng {ng[0]}; cùng với cột vừa gạch, "
                f"dòng {ng[0]} chỉ còn một ô: {ng[0]} thi {xm[ng[0]]}.",
                f"Manh mối (2) làm tương tự cho {ng[1]}, còn lại {ng[2]} nhận môn "
                f"cuối cùng.",
                f"Sang bảng giải: manh mối (4) nối môn với giải, mà môn thì vừa "
                f"biết, nên suy được giải của {ng[0]} và {ng[1]}. Hai người còn "
                f"lại chỉ còn hai giải; manh mối cuối loại một khả năng, ra duy nhất.",
                f"Kết quả: **{dap}**.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Bốn bạn, bốn môn, bốn giải",
        dan="Kẻ hai bảng riêng: một bảng người – môn, một bảng người – giải.",
        y=y, giai_mau=buoc,
        huong_giai="Bài hai tầng thì kẻ hai bảng và giải tầng nào chốt được trước. "
                   "Kết quả tầng một trở thành manh mối cho tầng hai. Khi một tầng "
                   "còn hai khả năng ngang nhau thì xét cả hai trường hợp rồi loại.",
        td=["TD3", "TD4", "TD6"],
        diem_chot="Giải xong bảng thứ nhất mới có đủ dữ kiện cho bảng thứ hai — "
                  "không cố giải song song hai bảng cùng lúc.",
        loi="Nhét cả hai tầng vào một bảng rồi rối, hoặc bỏ sót một trường hợp.",
        phong="Mỗi lần đặt ✓ thì gạch đủ dòng và cột trước khi đọc manh mối kế.",
        goi_y=("Manh mối nào cho biết chắc chắn một ô là đúng?",
               "Giải xong bảng môn thì bảng giải có thêm dữ kiện gì?",
               "Nếu còn hai khả năng thì xét cả hai rồi loại bằng manh mối cuối."),
        pt_dang="Lập bảng",
        pt_kien_thuc="Suy luận loại trừ hai tầng; xét trường hợp",
        pt_du_lieu="Đề ghép **hai thuộc tính** cho cùng một nhóm người",
        pt_phuong_phap="Kẻ hai bảng, giải tầng chốt được trước, dùng kết quả làm "
                       "manh mối cho tầng sau",
        pt_nhanh="Manh mối dạng khẳng định luôn dùng trước manh mối dạng phủ định.",
        tuong_tu=("Ba bạn thi ba môn và được ba giải. An không thi Toán; bạn thi "
                  "Toán được giải nhất; Bình không được giải nhất. Suy ra ai thi gì.",
                  "Chi thi Toán được giải nhất; An và Bình nhận hai môn còn lại"),
        mo_rong="Thêm tầng thứ ba — trường của mỗi bạn — để phải kẻ ba bảng.",
        chuan_bi="Bảng đúng – sai một tầng và cách đọc câu phủ định.")


@dang_ky("PP-H-M5-01", "H", "M5", lop=(5,),
         tu_khoa=("biểu đồ ven", "ba vòng tròn", "bù trừ", "đếm không trùng"),
         dang_bai=("Biểu đồ Ven", "Nguyên lý bù trừ ba nhóm",
                   "Bài toán đếm ba nhóm có phần chung"),
         thuc_te=True, bay="Trừ hai lần phần chung của cả ba nhóm")
def pp_h_m5_01(rng, lop):
    """Biểu đồ Ven ba vòng — nguyên lý bù trừ."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        abc = rng.randint(2, 6)                    # cả ba
        ab, bc, ca = (rng.randint(3, 9) for _ in range(3))   # đúng hai (ngoài abc)
        a, b, c = (rng.randint(4, 14) for _ in range(3))     # chỉ một
        ngoai = rng.randint(0, 5)
        tong = a + b + c + ab + bc + ca + abc + ngoai
        A, B, C = a + ab + ca + abc, b + ab + bc + abc, c + bc + ca + abc
        m1, m2, m3 = rng.sample(["bơi", "vẽ", "cờ vua", "hát", "bóng rổ"], 3)
        de = (f"Lớp có {sv(tong)} học sinh. Có {sv(A)} em học {m1}, {sv(B)} em học "
              f"{m2}, {sv(C)} em học {m3}. Có {sv(ab + abc)} em học cả {m1} và "
              f"{m2}, {sv(bc + abc)} em học cả {m2} và {m3}, {sv(ca + abc)} em học "
              f"cả {m1} và {m3}, và {sv(abc)} em học cả ba môn. Hỏi có bao nhiêu em "
              f"không học môn nào?")
        dap = f"{sv(ngoai)} em"
        if k == 0:
            it_nhat = A + B + C - (ab + abc) - (bc + abc) - (ca + abc) + abc
            buoc = [
                "Ba vòng tròn chồng nhau. Cộng thẳng ba nhóm thì mỗi phần chung "
                "đôi bị đếm hai lần, còn phần chung cả ba bị đếm **ba lần**.",
                f"Trừ ba phần chung đôi: {sv(A)} + {sv(B)} + {sv(C)} − "
                f"{sv(ab + abc)} − {sv(bc + abc)} − {sv(ca + abc)} = "
                f"{sv(A + B + C - (ab + abc) - (bc + abc) - (ca + abc))}.",
                f"Nhưng phần chung cả ba lúc đầu bị đếm 3 lần, vừa rồi bị trừ 3 "
                f"lần, thành ra mất hẳn. Phải **cộng lại một lần**: "
                f"+ {sv(abc)} = {sv(it_nhat)} em học ít nhất một môn.",
                f"Số em không học môn nào: {sv(tong)} − {sv(it_nhat)} = "
                f"**{sv(ngoai)} em**.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Ba nhóm có phần chung — nguyên lý bù trừ",
        dan="Vẽ ba vòng tròn và điền từ **phần giữa** ra ngoài.",
        y=y, giai_mau=buoc,
        huong_giai="Cộng ba nhóm, trừ ba phần chung đôi, rồi **cộng lại** phần "
                   "chung cả ba. Lý do cộng lại: phần ấy bị đếm ba lần rồi bị trừ "
                   "ba lần nên biến mất hẳn.",
        td=["TD2", "TD4", "TD6"],
        diem_chot="Dấu của phần chung cả ba là **cộng**, không phải trừ. Đây là "
                  "chỗ sai nhiều nhất của cả dạng bài.",
        loi="Trừ luôn phần chung cả ba lần nữa, ra thiếu.",
        phong="Điền số vào hình từ phần giữa ra ngoài rồi cộng bảy phần — cách này "
              "không cần nhớ công thức và không sai dấu được.",
        goi_y=("Vẽ ba vòng tròn, điền số em học cả ba môn vào phần giữa trước.",
               "Từ đó tính phần chỉ chung đúng hai môn.",
               "Cộng bảy phần lại rồi lấy sĩ số trừ đi."),
        pt_dang="Biểu đồ Ven",
        pt_kien_thuc="Đếm không trùng lặp; nguyên lý bù trừ",
        pt_du_lieu="Đề cho **ba nhóm**, ba phần chung đôi và một phần chung cả ba",
        pt_phuong_phap="Cộng ba nhóm, trừ ba phần chung đôi, cộng lại phần chung cả ba",
        pt_nhanh="Điền hình từ giữa ra ngoài thì chỉ còn phép cộng bảy số, không "
                 "phải nhớ dấu của công thức.",
        tuong_tu=("Lớp 40 em: 20 học bơi, 18 học vẽ, 15 học hát, 8 học bơi và vẽ, "
                  "6 học vẽ và hát, 5 học bơi và hát, 3 học cả ba. Bao nhiêu em "
                  "không học môn nào?",
                  "3 em"),
        mo_rong="Hỏi ngược: cho số em không học môn nào, tìm số em học cả ba.",
        chuan_bi="Biểu đồ Ven hai vòng và phép cộng trừ nhiều số hạng.")


@dang_ky("PP-G-M5-02", "G", "M5", lop=(5,),
         tu_khoa=("sơ đồ cây", "đếm số cách", "xét trường hợp", "đếm có điều kiện"),
         dang_bai=("Ứng dụng sơ đồ (cây, khối, mũi tên)", "Xét trường hợp",
                   "Bài toán đếm số cách có điều kiện"),
         bay="Đếm trùng hai nhánh cho cùng một kết quả")
def pp_g_m5_02(rng, lop):
    """Sơ đồ cây kết hợp xét trường hợp — đếm số có điều kiện."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        bo = sorted(rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], rng.randint(4, 5)))
        dk = rng.choice(["chan", "le", "chia3"])
        ten_dk = {"chan": "số chẵn", "le": "số lẻ", "chia3": "số chia hết cho 3"}[dk]
        ds = []
        for x in bo:
            for z in bo:
                for w in bo:
                    if x == z or z == w or x == w:
                        continue
                    n = 100 * x + 10 * z + w
                    if ((dk == "chan" and n % 2 == 0)
                            or (dk == "le" and n % 2 == 1)
                            or (dk == "chia3" and n % 3 == 0)):
                        ds.append(n)
        de = (f"Từ các chữ số {', '.join(sv(x) for x in bo)}, lập được bao nhiêu "
              f"{ten_dk} có ba chữ số **khác nhau**?")
        dap = f"{sv(len(ds))} số"
        if k == 0:
            if dk == "chan":
                cuoi = [x for x in bo if x % 2 == 0]
                gt = (f"Điều kiện rơi vào **chữ số hàng đơn vị**: phải chẵn. Trong "
                      f"bộ đã cho có {sv(len(cuoi))} chữ số chẵn — "
                      f"{', '.join(sv(x) for x in cuoi)}.")
                cach = (f"Chọn hàng đơn vị trước ({sv(len(cuoi))} cách), rồi hàng "
                        f"trăm ({sv(len(bo) - 1)} cách vì phải khác), rồi hàng chục "
                        f"({sv(len(bo) - 2)} cách).")
            elif dk == "le":
                cuoi = [x for x in bo if x % 2 == 1]
                gt = (f"Điều kiện rơi vào **chữ số hàng đơn vị**: phải lẻ. Trong bộ "
                      f"đã cho có {sv(len(cuoi))} chữ số lẻ.")
                cach = (f"Chọn hàng đơn vị trước ({sv(len(cuoi))} cách), rồi hai "
                        f"hàng còn lại.")
            else:
                gt = ("Điều kiện chia hết cho 3 rơi vào **tổng ba chữ số**, không "
                      "rơi vào một hàng nào. Vì vậy không chọn theo hàng được, mà "
                      "phải xét từng bộ ba chữ số có tổng chia hết cho 3.")
                cach = ("Liệt kê các bộ ba chữ số thoả điều kiện tổng, mỗi bộ cho "
                        "6 số vì ba chữ số khác nhau xếp được 6 cách.")
            buoc = [
                "Vẽ sơ đồ cây ba tầng: hàng trăm, hàng chục, hàng đơn vị. Nhưng "
                "**đừng vẽ hết** — hãy xem điều kiện rơi vào tầng nào trước đã.",
                gt, cach,
                "Chữ số phải khác nhau nên mỗi tầng sau ít đi một lựa chọn — đây "
                "là chỗ khác với bài đếm không có điều kiện khác nhau.",
                f"Đếm hết được **{dap}**.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Đếm số có ba chữ số khác nhau, thoả một điều kiện",
        dan="Trước khi đếm, xác định điều kiện rơi vào hàng nào.",
        y=y, giai_mau=buoc,
        huong_giai="Xem điều kiện ràng buộc hàng nào thì **chọn hàng ấy trước**, "
                   "rồi mới chọn các hàng còn lại. Điều kiện rơi vào tổng chữ số "
                   "thì không chọn theo hàng được, phải xét theo bộ.",
        td=["TD3", "TD4", "TD6"],
        diem_chot="Thứ tự chọn quyết định bài dễ hay khó. Chọn hàng bị ràng buộc "
                  "trước là mẹo lớn nhất của cả dạng đếm.",
        loi="Chọn hàng trăm trước rồi mới xét điều kiện ở hàng đơn vị, thành ra "
            "phải chia trường hợp rối rắm.",
        phong="Vẽ hai tầng đầu của sơ đồ cây để kiểm lại cách đếm trước khi nhân.",
        goi_y=("Điều kiện của đề ràng buộc hàng nào?",
               "Chọn hàng ấy trước thì còn bao nhiêu cách cho hai hàng kia?",
               "Nhớ trừ đi vì ba chữ số phải khác nhau."),
        pt_dang="Ứng dụng sơ đồ (cây, khối, mũi tên)",
        pt_kien_thuc="Đếm có hệ thống; dấu hiệu chia hết; cấu tạo số",
        pt_du_lieu="Đề hỏi **lập được bao nhiêu số** thoả một điều kiện",
        pt_phuong_phap="Chọn hàng bị điều kiện ràng buộc trước, rồi nhân số cách các hàng còn lại",
        pt_nhanh="Ba chữ số khác nhau xếp được 6 cách — dùng khi điều kiện rơi vào tổng.",
        tuong_tu=("Từ các chữ số 1, 2, 3, 4 lập được bao nhiêu số chẵn có ba chữ "
                  "số khác nhau?",
                  "12 số"),
        mo_rong="Đổi thành số có bốn chữ số, hoặc cho phép chữ số lặp lại.",
        chuan_bi="Quy tắc nhân trong đếm và dấu hiệu chia hết cho 2, 3.")


@dang_ky("PP-D-M5-04", "D", "M5", lop=(5,),
         tu_khoa=("sơ đồ đoạn thẳng", "ba đại lượng", "tỉ số ẩn", "tổng tỉ"),
         dang_bai=("Sơ đồ đoạn thẳng", "Chia tỉ lệ",
                   "Bài toán ba đại lượng có tỉ số bắc cầu"),
         bay="Không quy ba tỉ số về cùng một đơn vị phần")
def pp_d_m5_04(rng, lop):
    """Sơ đồ đoạn thẳng mức M5 — ba đại lượng, tỉ số bắc cầu."""
    y, buoc = [], []
    for k in range(rng.randint(4, 5)):
        p, q = rng.randint(2, 4), rng.randint(2, 4)     # B = p×A, C = q×B
        mot_phan = rng.randrange(4, 40)
        A = mot_phan
        B, C = p * A, p * q * A
        tong = A + B + C
        t1, t2, t3 = rng.sample(TO_DOI, 3)
        de = (f"Ba đội trồng được tất cả {sv(tong)} cây. Biết {t2} trồng gấp "
              f"{sv(p)} lần {t1}, và {t3} trồng gấp {sv(q)} lần {t2}. Hỏi mỗi đội "
              f"trồng được bao nhiêu cây?")
        dap = f"{t1}: {sv(A)} cây; {t2}: {sv(B)} cây; {t3}: {sv(C)} cây"
        if k == 0:
            buoc = [
                f"Vẽ sơ đồ đoạn thẳng, nhưng phải **quy cả ba về cùng một loại "
                f"phần** trước đã. Lấy {t1} làm một phần.",
                f"{t2} gấp {sv(p)} lần {t1} nên {t2} là {sv(p)} phần.",
                f"{t3} gấp {sv(q)} lần {t2}, mà {t2} là {sv(p)} phần, nên {t3} là "
                f"{sv(p)} × {sv(q)} = {sv(p * q)} phần — **nhân chứ không cộng**.",
                f"Tổng số phần: 1 + {sv(p)} + {sv(p * q)} = {sv(1 + p + p * q)} (phần).",
                f"Một phần: {sv(tong)} : {sv(1 + p + p * q)} = {sv(A)} (cây). "
                f"Từ đó {t2} = {sv(B)} cây, {t3} = **{sv(C)} cây**.",
            ]
        y.append((de, dap))
    return Bai(
        tieu_de="Ba đại lượng, tỉ số bắc cầu",
        dan="Vẽ sơ đồ ba đoạn thẳng, ghi rõ mỗi đoạn mấy phần.",
        y=y, giai_mau=buoc,
        huong_giai="Chọn đại lượng nhỏ nhất làm một phần, rồi quy hai đại lượng "
                   "kia về cùng loại phần ấy. Tỉ số bắc cầu thì **nhân** hai hệ số, "
                   "không cộng. Đếm tổng số phần trên sơ đồ rồi mới chia.",
        td=["TD1", "TD2", "TD5"],
        diem_chot="Gấp p lần rồi gấp tiếp q lần là gấp p × q lần, không phải "
                  "gấp p + q lần.",
        loi="Cộng hai hệ số, ra tổng số phần sai và cả ba đáp số cùng sai.",
        phong="Vẽ xong đếm lại số phần trên hình trước khi chia.",
        goi_y=("Lấy đội nào làm một phần thì gọn nhất?",
               "Đội thứ ba gấp mấy lần đội thứ nhất?",
               "Cộng đủ ba số phần rồi mới chia tổng số cây."),
        pt_dang="Sơ đồ đoạn thẳng",
        pt_kien_thuc="Tỉ số; chia tỉ lệ; quan hệ gấp bắc cầu",
        pt_du_lieu="Đề cho **ba đại lượng** nối nhau bằng hai quan hệ gấp",
        pt_phuong_phap="Quy cả ba về cùng loại phần, nhân hệ số bắc cầu, rồi chia tỉ lệ",
        pt_nhanh="Tổng số phần bằng 1 + p + p × q — tính thẳng, không cần vẽ lại.",
        tuong_tu=("Ba đội trồng 78 cây. Đội Hai gấp 2 lần đội Một, đội Ba gấp 3 lần "
                  "đội Hai. Mỗi đội trồng mấy cây?",
                  "Đội Một 6 cây, đội Hai 12 cây, đội Ba 36 cây"),
        mo_rong="Đổi một quan hệ gấp thành quan hệ hơn kém một số cây cụ thể.",
        chuan_bi="Sơ đồ đoạn thẳng cho hai đại lượng và bài tổng – tỉ.")


@dang_ky("PP-D-M5-05", "D", "M5", lop=(5,),
         tu_khoa=("rút về đơn vị", "tỉ lệ nghịch", "công việc chung", "vòi nước"),
         dang_bai=("Rút về đơn vị", "Bài toán công việc chung",
                   "Bài toán tỉ lệ nghịch nâng cao"),
         thuc_te=True, bay="Dùng tỉ lệ thuận cho bài tỉ lệ nghịch")
def pp_d_m5_05(rng, lop):
    """Rút về đơn vị mức M5 — công việc chung, tỉ lệ nghịch."""
    y, buoc = [], []
    for k, kieu in enumerate(luan_phien(rng, ["chung", "nghich"], rng.randint(4, 5))):
        if kieu == "chung":
            a, b = rng.choice([(4, 12), (6, 12), (3, 6), (6, 3), (8, 8), (5, 20),
                               (10, 15), (12, 4)])
            from fractions import Fraction as F
            chung = F(1, a) + F(1, b)
            t = 1 / chung
            de = (f"Vòi thứ nhất chảy một mình thì đầy bể sau {sv(a)} giờ. Vòi thứ "
                  f"hai chảy một mình thì đầy bể sau {sv(b)} giờ. Hỏi mở cả hai vòi "
                  f"cùng lúc thì sau bao lâu đầy bể?")
            dap = f"{sv(t.numerator)} giờ" if t.denominator == 1 else f"{ps(t)} giờ"
            if k == 0:
                buoc = [
                    "Không được cộng hai khoảng thời gian, cũng không được lấy "
                    "trung bình. Phải **rút về đơn vị**: xét trong một giờ.",
                    f"Một giờ vòi thứ nhất chảy được {ps(F(1, a))} bể.",
                    f"Một giờ vòi thứ hai chảy được {ps(F(1, b))} bể.",
                    f"Một giờ cả hai vòi chảy được {ps(F(1, a))} + {ps(F(1, b))} = "
                    f"{ps(chung)} (bể).",
                    f"Thời gian đầy bể: 1 : {ps(chung)} = **{dap}**.",
                ]
        else:
            n1 = rng.randint(3, 12)
            ngay1 = rng.randint(4, 20)
            tong = n1 * ngay1
            n2 = next((x for x in range(2, 25) if x != n1 and tong % x == 0), n1 + 1)
            de = (f"{sv(n1)} người làm xong một công việc trong {sv(ngay1)} ngày. "
                  f"Hỏi {sv(n2)} người làm xong công việc ấy trong bao nhiêu ngày, "
                  f"biết sức làm của mỗi người như nhau?")
            dap = f"{sv(tong // n2)} ngày"
        y.append((de, dap))
    return Bai(
        tieu_de="Công việc chung và tỉ lệ nghịch",
        dan="Câu nào cũng phải quy về **một đơn vị thời gian** hoặc **một người** "
            "trước khi tính.",
        y=y, giai_mau=buoc,
        huong_giai="Với bài vòi nước, xét lượng chảy trong một giờ rồi cộng lại. "
                   "Với bài số người, xét tổng số ngày công. Cả hai đều là rút về "
                   "đơn vị, chỉ khác đơn vị được chọn.",
        td=["TD2", "TD5", "TD6"],
        diem_chot="Càng nhiều người thì càng **ít** ngày — đây là tỉ lệ nghịch, "
                  "nhân chia ngược với tỉ lệ thuận.",
        loi="Cộng hai khoảng thời gian của hai vòi, hoặc nhân thẳng số người với "
            "số ngày theo kiểu tỉ lệ thuận.",
        phong="Kiểm bằng lẽ thường: thêm người thì đáp số phải nhỏ đi.",
        goi_y=("Trong một giờ, mỗi vòi chảy được mấy phần bể?",
               "Cả hai vòi trong một giờ chảy được mấy phần bể?",
               "Lấy 1 chia cho phần ấy là ra thời gian."),
        pt_dang="Rút về đơn vị",
        pt_kien_thuc="Phân số; tỉ lệ nghịch; tổng số ngày công",
        pt_du_lieu="Đề cho **thời gian làm một mình** của từng bên, hoặc số người "
                   "và số ngày",
        pt_phuong_phap="Quy về một đơn vị — một giờ hoặc một người — rồi cộng và chia",
        pt_nhanh="Hai vòi cùng chảy thì thời gian chung = a × b : (a + b).",
        tuong_tu=("Vòi một đầy bể trong 6 giờ, vòi hai trong 3 giờ. Mở cả hai thì "
                  "bao lâu đầy bể?",
                  "2 giờ"),
        mo_rong="Thêm một vòi tháo nước ở đáy để phải trừ thay vì cộng.",
        chuan_bi="Cộng phân số khác mẫu và khái niệm tỉ lệ nghịch.")
