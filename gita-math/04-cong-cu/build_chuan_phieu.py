#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh 01-kien-truc/02-chuan-bien-soan-phieu.md — CHUẨN BIÊN SOẠN PHIẾU GITA v2.0.

Bảng cấu trúc của 8 loại phiếu được sinh thẳng từ 04-cong-cu/data/loai_phieu.py
nên tài liệu chuẩn và bộ kiểm định không bao giờ lệch nhau.
"""
from __future__ import annotations
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))
from loai_phieu import LOAI, CHUOI_BUOI, MOC   # noqa: E402

OUT = ROOT / "01-kien-truc" / "02-chuan-bien-soan-phieu.md"

MO_DAU = """# CHUẨN BIÊN SOẠN PHIẾU GITA v2.0

> Hợp đồng kỹ thuật của toàn bộ **1 296 tài liệu**. Phiếu không thoả chuẩn này bị
> `04-cong-cu/validate_phieu.py` từ chối. Không có ngoại lệ.
> Chuẩn này bám **Khung giáo án giảng dạy tại Học viện GITA**.

---

## 1. ĐƠN VỊ TỔ CHỨC: CỤM CHUYÊN ĐỀ

Đơn vị biên soạn **không phải một phiếu lẻ, mà là một CỤM CHUYÊN ĐỀ (chương)**.

| | |
|---|---|
| Mỗi khối (lớp × tuyến) | **16 cụm chuyên đề** |
| Mỗi cụm | **6 buổi học 90 phút** + 1 phiếu Hướng dẫn ôn chắc |
| Mỗi buổi học | 1 phiếu học + 1 phiếu Lời giải & Phân tích chuyên sâu |
| Mỗi khối | 16 × 6 + 4 phiếu mốc = **100 phiếu học** |
| Toàn hệ thống | 6 khối × 216 tài liệu = **1 296 tài liệu** |

**Chuỗi sáu buổi bất biến của một cụm:**

"""

BAT_BIEN = """
---

## 3. KHUNG BẤT BIẾN CỦA MỌI PHIẾU HỌC

Sáu loại phiếu học (LT, DB, KN, NC, OT, TH) và phiếu mốc đều dùng chung một bộ xương:

| Thuộc tính | Giá trị |
|---|---|
| Thời lượng | **90 phút** |
| Thang điểm | **100** (+ tối đa 5 điểm sáng tạo, ghi riêng) |
| Số phần | **5** |
| Số bài mỗi phần | **5** |
| Số ý mỗi bài | **4 – 10** |
| Tổng số bài | **25** |
| Tổng số ý | **115 – 170** |

Cái thay đổi giữa các loại phiếu là **bản chất của năm phần**, không phải bộ xương.

---

## 4. QUY TẮC NỘI DUNG BẮT BUỘC

### 4.1. Độ khó tăng đơn điệu
Trong mỗi phần, Bài 1 → Bài 5 khó dần. Trong mỗi bài, ý `a)` → ý cuối khó dần.

### 4.2. Luật "3 – 1 – 1" cho mỗi phần
3 bài đúng trọng tâm phiếu · 1 bài liên kết sang nhóm chuyên đề khác ·
1 bài bối cảnh thực tế.

### 4.3. Năm mục bắt buộc của mỗi DẠNG BÀI (phiếu DB)
Theo đúng khung giáo án Dạng bài – Phương pháp học giỏi:

1. **Dấu hiệu nhận biết dạng bài**
2. **Điều kiện cần có để làm đúng dạng bài**
3. **Phương pháp giải và kỹ năng cần có**
4. **Các bước trình bày**
5. **Dò soát kết quả**

Thiếu bất kỳ mục nào thì phiếu DB không được phát hành.

### 4.4. Bốn bước bắt buộc của phần ĐỌC VỊ (phiếu DB, Phần E)
Khai thác dữ liệu đề cho → Xác định dạng bài → Nêu hướng giải → Dự đoán bẫy.
**Không bắt học viên tính ra đáp số ở phần này** — đây là phần rèn tốc độ nhận dạng.

### 4.5. Bảy ô bắt buộc của SƠ ĐỒ TƯ DUY chương (phiếu LT và KN)
Tên chương · Các nội dung chính · Công thức, định nghĩa, điều kiện quan trọng ·
Hình vẽ minh hoạ · Bài tập minh hoạ · Dạng bài và dấu hiệu nhận biết ·
Phương pháp cần có để ghi điểm 10.

### 4.6. Bẫy có chủ đích (chỉ ở hai phần cuối)
Mỗi phiếu có **2 – 4 bẫy**. Loại bẫy hợp lệ: đơn vị đo không đồng nhất · dữ kiện thừa ·
câu hỏi hỏi khác cái vừa tính · điều kiện "đôi một khác nhau" · trường hợp biên ·
số liệu làm tròn. **Bẫy bằng cách diễn đạt mập mờ là bẫy sai — cấm dùng.**

### 4.7. Nhãn tư duy
Mỗi bài gắn 1–2 nhãn `TD1…TD6`, ghi trong phiếu Lời giải, không in trên đề học viên.

### 4.8. Số liệu, hình vẽ, ngôn ngữ
- Kết quả Phần I–II phải "đẹp"; từ Phần III mới được dùng số lẻ nếu bài toán cần.
- Dấu thập phân dùng **dấu phẩy**; đơn vị viết cách số một dấu cách.
- Bài hình phải có hình vẽ hoặc mô tả đủ để học viên tự vẽ lại.
- Câu lệnh mở đầu bằng động từ; câu dài tối đa **35 chữ**.
- **Cấm thuật ngữ THCS**: phương trình, ẩn số, biến số, hàm số, tập hợp con,
  căn bậc hai, số âm, đa thức, bất phương trình.

---

## 5. PHIẾU LỜI GIẢI & PHÂN TÍCH CHUYÊN SÂU (GP)

Mỗi phiếu học có **một phiếu GP riêng**, phát sau khi học viên đã nộp bài.
Với **mỗi bài**, phiếu GP phải có đủ:

1. **Đáp số** — cho từng ý.
2. **Hướng giải** — đúng cách trình bày của học sinh tiểu học.
3. **Bảng phân tích chuyên sâu** — sáu cột theo khung phản biện GITA:

| Dạng bài | Kiến thức liên quan | Dữ liệu nhận biết | Phương pháp áp dụng | Cách xử lý nhanh nhất | Kết quả |
|---|---|---|---|---|---|

4. **Nhãn tư duy và điểm chốt** — bước quyết định của lời giải.
5. **Lỗi thường gặp và cách phòng** — ít nhất một lỗi.
6. **Gợi ý ba tầng** — nhẹ → vừa → mạnh, bắt buộc cho bài mức M4 và M5.
7. **Bài tương tự tự luyện** — cho mỗi bài học viên làm sai, để làm lại sau 48 giờ.

---

## 6. PHIẾU HƯỚNG DẪN ÔN CHẮC CHUYÊN ĐỀ (HD)

Mỗi cụm có một phiếu HD, phát ở buổi đầu và dùng lại trước kỳ thi. Bảy mục bắt buộc
được liệt kê ở bảng cấu trúc mục 2. **Tiêu chí ôn chắc một cụm:** đạt ≥ 80/100 ở phiếu
`TH` của cụm **và** ≥ 90% checklist tự kiểm.

---

## 7. THANG CHẤM

| Hạng mục | Điểm |
|---|---:|
| Phần 1 — 5 bài | 15 |
| Phần 2 — 5 bài | 20 |
| Phần 3 — 5 bài | 25 |
| Phần 4 — 5 bài | 25 |
| Phần 5 — 5 bài | 15 |
| **Tổng** | **100** |
| *Điểm sáng tạo* (cách giải khác đúng và ngắn hơn) | *+1/lần, tối đa +5* |

Trong một bài, điểm chia đều cho các ý; ý cuối của bài ở hai phần cuối nhân hệ số 1,5.
Trình bày sai trừ tối đa **10%** điểm của bài, trừ vào cột *Trình bày*, không xoá điểm
tư duy đã đạt.

---

## 8. QUY ƯỚC MÃ VÀ ĐƯỜNG DẪN

```
Phiếu học   GITA-{T1|T2}-L{3|4|5}-C{01..16}-{LT|DB|KN|NC|OT|TH}
Lời giải    <mã phiếu học>-GP
Hướng dẫn   GITA-{T1|T2}-L{3|4|5}-C{01..16}-HD
Phiếu mốc   GITA-{T1|T2}-L{3|4|5}-MOC-{GK1|CK1|GK2|CK2}
Đường dẫn   03-phieu/{T1|T2}/L{3|4|5}/<mã>.md
```

Front-matter bắt buộc: `ma · tuyen · lop · cum · cum_ten · buoi_trong_cum · loai ·
nhom_ma · ten · trong_tam · stt · hoc_ky · tuan · moc_kiem_tra · thoi_luong_phut ·
thang_diem · muc_tieu_G · dong_luc_I · tai_nang_T · hanh_dong_A`.

---

## 9. CHECKLIST KIỂM ĐỊNH TRƯỚC KHI PHÁT HÀNH

- [ ] 1. Đủ 5 phần, nhãn phần đúng theo loại phiếu.
- [ ] 2. Mỗi phần đúng 5 bài; mỗi bài 4–10 ý; tổng ý 115–170.
- [ ] 3. Thời gian và điểm của từng phần đúng bảng cấu trúc loại phiếu.
- [ ] 4. Tổng điểm bằng 100.
- [ ] 5. Độ khó tăng đơn điệu theo phần và theo bài.
- [ ] 6. Mỗi phần thoả luật 3 – 1 – 1.
- [ ] 7. Có 2–4 bẫy, chỉ đặt ở hai phần cuối, thuộc loại bẫy hợp lệ.
- [ ] 8. Mọi bài có nhãn TD.
- [ ] 9. Bài hình có hình vẽ hoặc mô tả vẽ được.
- [ ] 10. Không có thuật ngữ THCS; không có câu quá 35 chữ.
- [ ] 11. Phiếu DB có đủ 5 mục cho mỗi dạng bài và đủ 4 bước ở phần Đọc vị.
- [ ] 12. Phiếu LT và KN có đủ 7 ô sơ đồ tư duy.
- [ ] 13. Phiếu GP có đủ 7 mục, trong đó có bảng phân tích 6 cột.
- [ ] 14. Gợi ý ba tầng có đủ cho mọi bài của hai phần cuối.
- [ ] 15. Đã **giải thử toàn bộ phiếu** và đối chiếu đáp số; ghi tên người giải thử.
- [ ] 16. Front-matter khớp dòng tương ứng trong `02-chi-muc/index-master.json`.

---

## 10. QUY TRÌNH BIÊN SOẠN MỘT CỤM (5 BƯỚC)

1. **Chốt cụm** — lấy dòng cụm trong chỉ mục: tên cụm, nhóm chuyên đề, danh sách dạng bài.
2. **Soạn phiếu HD trước** — bản đồ chương, bảng công thức, bảng dạng bài. Đây là xương sống.
3. **Soạn 6 phiếu học theo đúng thứ tự LT → DB → KN → NC → OT → TH.**
4. **Giải thử độc lập** — người thứ hai giải toàn bộ, không nhìn đáp án.
5. **Soạn 6 phiếu GP + chạy kiểm định**:
   `python3 04-cong-cu/validate_phieu.py --all`
"""


def main() -> None:
    L = [MO_DAU]
    L.append("| Buổi | Mã | Loại phiếu | Mẫu giáo án tương ứng |")
    L.append("|:--:|:--:|---|---|")
    for i, k in enumerate(CHUOI_BUOI, 1):
        L.append(f"| {i} | **{k}** | {LOAI[k]['ten']} | {LOAI[k]['giao_an']} |")
    L.append("")
    L.append("Hai loại phiếu đi kèm, không chiếm buổi học:")
    L.append("")
    L.append("| Mã | Loại phiếu | Phát khi nào |")
    L.append("|:--:|---|---|")
    for k in ("GP", "HD"):
        L.append(f"| **{k}** | {LOAI[k]['ten']} | {LOAI[k]['giao_an']} |")
    L.append("")
    L.append("Bốn phiếu mốc của mỗi khối:")
    L.append("")
    L.append("| Mã | Tên | Phạm vi | Vị trí trong năm |")
    L.append("|:--:|---|---|---|")
    for (ma, ten, pv), vt in zip(MOC, ["phiếu số 25", "phiếu số 50", "phiếu số 75", "phiếu số 100"]):
        L.append(f"| **{ma}** | {ten} | {pv} | {vt} |")

    L.append("\n---\n\n## 2. CẤU TRÚC TỪNG LOẠI PHIẾU\n")
    for k, v in LOAI.items():
        L.append(f"### {k} — {v['ten']}\n")
        L.append(f"**Mục tiêu:** {v['muc_tieu']}  ")
        L.append(f"**Giáo án tương ứng:** {v['giao_an']}  ")
        if v["thoi_luong"]:
            L.append(f"**Thời lượng:** {v['thoi_luong']} phút · **Thang điểm:** {v['thang_diem']}\n")
        else:
            L.append("**Không chiếm buổi học** — phát kèm.\n")
        if v["thoi_luong"]:
            L.append("| Phần | Tên phần | Phút | Điểm | Yêu cầu nội dung |")
            L.append("|:--:|---|---:|---:|---|")
            for nhan, ten, phut, diem, mo in v["cau_truc"]:
                L.append(f"| **{nhan}** | {ten} | {phut} | {diem} | {mo} |")
            L.append(f"| | | **{sum(x[2] for x in v['cau_truc'])}** "
                     f"| **{sum(x[3] for x in v['cau_truc'])}** | |")
        else:
            L.append("| Mục | Tên mục | Yêu cầu nội dung |")
            L.append("|:--:|---|---|")
            for nhan, ten, _p, _d, mo in v["cau_truc"]:
                L.append(f"| **{nhan}** | {ten} | {mo} |")
        L.append("")
    L.append(BAT_BIEN)
    OUT.write_text("\n".join(L), encoding="utf-8")
    print(f"✔ {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
