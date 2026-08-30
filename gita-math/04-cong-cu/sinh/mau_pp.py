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
