# 14 — MÔ HÌNH KHẢ THI: CÁCH TÍNH VÀ CÁCH ĐỌC

Bản demo tương tác (`ban-trinh-duyet.html`, khu vực **Khả thi**) chạy đúng mô hình dưới đây.
Chương này giải thích công thức để anh kiểm chứng, chứ không phải tin lời.

## 14.1. Công thức

Mỗi tháng `t`, cho **một** nhóm:

```
tuong_tac_that(t)   = tong_thanh_vien(t-1) × ti_le_tuong_tac
bao_hoa(t)          = max(0, 1 − tong_thanh_vien(t-1) / thi_truong_tiem_nang)
yeu_cau_tham_gia(t) = kenh_chu_dong × (1 + tang_nang_luc)^(t-1)  +  tuong_tac_that(t) × K
nguoi_moi(t)        = yeu_cau_tham_gia(t) × (1 − ti_le_tu_choi) × bao_hoa(t)
tong_thanh_vien(t)  = tong_thanh_vien(t-1) × (1 − ti_le_roi_nhom) + nguoi_moi(t)
```

Bốn điều mô hình này **cố tình** giữ, vì bỏ đi là tự lừa mình:

| Yếu tố | Vì sao bắt buộc có |
|---|---|
| **Bão hòa thị trường** | Không có nó, mọi mô hình tăng trưởng đều vượt dân số Việt Nam sau năm thứ tư |
| **Hao hụt (rời nhóm)** | Cộng đồng là cái thùng có lỗ; bơm mà không vá thì không bao giờ đầy |
| **Cổng lọc từ chối** | Chặn nick ảo làm chậm số thật — phải trả giá này công khai, không giấu |
| **Lan truyền dựa trên người *tương tác thật*, không phải tổng thành viên** | Người im lặng không mời ai cả |

## 14.2. Tham số của kế hoạch cơ sở

| Tham số | Giá trị | Căn cứ |
|---|---|---|
| Thành viên nền | 500 | cần anh thay bằng số thật của từng nhóm |
| Kênh chủ động | 800 người/tháng | livestream + video ngắn + đối tác + quảng cáo có kiểm soát |
| Tăng năng lực kênh | 9%/tháng | đội ngũ và đại sứ lớn dần |
| Hệ số lan truyền K | 0,45 | mỗi người tương tác thật kéo về 0,45 người mỗi tháng |
| Tỉ lệ tương tác thật | 30% | mức của cộng đồng vận hành tốt, đo theo tháng (MAM) |
| Rời nhóm | 2,0%/tháng | ngưỡng lành mạnh trong `09` |
| Từ chối ở cổng | 25% | giữa khoảng lành mạnh 15–30% ở `06.4` |
| Thị trường tiềm năng | 8 triệu | người Việt quan tâm phát triển bản thân và gia đình |

**Kết quả kế hoạch cơ sở** (mỗi nhóm): tháng 6 ≈ 1.900 · tháng 12 ≈ 5.700 · tháng 24 ≈ 29.000 ·
tháng 36 ≈ 113.000 · tháng 60 ≈ 919.000 tương tác thật mỗi tháng.

## 14.3. Đọc kết quả này thế nào

| Mốc | Kết luận thẳng |
|---|---|
| **1.000 @ 6 tháng** | **Đạt thoải mái.** Đây là mốc của chất lượng vận hành, không phải của ngân sách. |
| **10.000 @ 1 năm** | **Thiếu khoảng 40%** với tham số cơ sở. Đóng khoảng cách bằng cách nâng kênh chủ động lên ~1.400/tháng và K lên 0,55 — tức là bộ máy nội dung và mạng đại sứ phải sẵn sàng ngay từ tháng thứ 7. |
| **50.000–100.000 @ 2 năm** | Đạt được nếu giữ đúng tỉ lệ tương tác 30% và bắt đầu **kiến trúc cụm nhóm** từ tháng 13. |
| **200.000 @ 3 năm** | Đạt được với kịch bản B. Kịch bản A đòi 1.000.000 ở mốc này — cần ngân sách truyền thông gấp 3–4 lần. |
| **1.000.000 @ 5 năm** | **Đạt được** với kế hoạch cơ sở, miễn là hai điều kiện không đổ: tỉ lệ tương tác thật không rơi dưới 10% và kim tự tháp tự quản được dựng đúng hạn. |

## 14.4. Phát hiện quan trọng nhất từ mô hình

Kéo **tỉ lệ tương tác thật** từ 30% xuống 8% (nút "Nếu buông chăm sóc" trong bản demo):
tổng thành viên chỉ giảm khoảng một nửa, nhưng **mọi mốc tương tác thật đều sụp**,
vì lan truyền K ăn theo người tương tác chứ không ăn theo người có tên trong nhóm.

> Nói cách khác: **quy trình chăm sóc bài đăng ở chương `04` không phải chi phí — nó là
> động cơ tăng trưởng.** Bỏ nó để tiết kiệm nhân sự là cách chắc chắn nhất để không bao giờ
> tới được một triệu.

## 14.5. Nhân sự phải có ở từng mốc

Tính theo tỉ lệ chuẩn: 1 kiểm duyệt / 2.000 thành viên · 1 chăm sóc / 80 người được nuôi dưỡng ·
1 trưởng tổ / 6 người tương tác thật · 1 đại sứ khu vực / 30 trưởng tổ · tách nhóm vệ tinh mỗi 50.000 thành viên.

| Mốc | Tổng TV | Tương tác thật | Kiểm duyệt | Chăm sóc | Trưởng tổ | Đại sứ | Nhóm vệ tinh |
|---|---|---|---|---|---|---|---|
| Tháng 6 | ~6.200 | ~1.900 | 4 | 18 | 312 | 11 | 1 |
| Tháng 12 | ~19.000 | ~5.700 | 10 | 40 | 952 | 32 | 1 |
| Tháng 24 | ~98.000 | ~29.000 | 49 | 163 | 4.890 | 163 | 2 |
| Tháng 36 | ~378.000 | ~113.000 | 189 | 559 | 18.892 | 630 | 8 |
| Tháng 60 | ~3.064.000 | ~919.000 | 1.532 | 3.107 | 153.191 | 5.107 | 62 |

Cột "Trưởng tổ" và "Đại sứ" là **tình nguyện viên được đào tạo**, không phải biên chế.
Cột "Kiểm duyệt" ở tháng 60 cho thấy rõ: không thể vận hành bằng một nhóm và một đội — bắt buộc
phải chia thành 62 nhóm vệ tinh tự quản, mỗi nhóm một ban quản trị riêng.
