# Hướng dẫn dùng thư mục dữ liệu

| Tệp | Dùng để làm gì | Ai cập nhật |
|---|---|---|
| `thu-vien-chu-de.json` | Ngân hàng nghi thức + 12 tiêu đề/nghi thức (đủ 1 quý). Sửa ở đây rồi chạy lại bộ sinh lịch | Biên tập nội dung, mỗi quý 1 lần |
| `lich-dang-bai-12-tuan.csv` | Lịch đăng chi tiết 288 bài (G1: 168, G2: 120). Nạp vào chức năng lên lịch của nhóm | Ops, mỗi 2 tuần nạp trước |
| `bang-theo-doi-kpi.csv` | Bảng đo tuần. Hai dòng đầu là **ngưỡng**, hai dòng sau là **số nền**, rồi mỗi tuần 2 dòng (G1, G2) | Dữ liệu, mỗi thứ Hai |

## Sinh lại lịch

```bash
python3 gita365-ops/scripts/generate_calendar.py \
    --tuan 12 \
    --batdau 2026-09-07 \
    --phutrach-g1 "Care 1" \
    --phutrach-g2 "Care 2" \
    --ra gita365-ops/data/lich-dang-bai-12-tuan.csv
```

Bộ sinh tự lùi ngày bắt đầu về thứ Hai của tuần đó, xoay chủ đề tháng sau mỗi 4 tuần,
và in ra bảng kiểm tra tỉ lệ trụ cột nội dung để đối chiếu với chuẩn ở `03.5`.

## Các sheet cần dựng thêm (trên Google Sheet, không nằm trong repo vì chứa dữ liệu cá nhân)

| Sheet | Cột chính |
|---|---|
| `THANH_VIEN` | ho_ten, link_fb, nhom, ngay_vao, nguon, tra_loi_cau_2, cap_do_L, diem_GITA, lan_tuong_tac_cuoi, trang_thai_phieu, tai_khoan_webapp, khoa_dang_hoc, ghi_chu, nguoi_cham_soc |
| `GIA_DINH` (G2) | ma_gia_dinh, ten_goi, tinh, so_thanh_vien, bang_dau, diem_chuyen_can, diem_lan_toa, diem_chuyen_hoa, tong_diem, hang |
| `SO_DEN` | link_tai_khoan, ten, ngay, ly_do, bang_chung, nguoi_xu_ly, nhom |
| `SO_CA` | ngay, ma_bai, nguoi_truc, binh_luan_60p, 3_nguoi_chat_luong, cau_hoi_dang_chu_y, viec_chuyen_ca |

> ⚠️ Không đưa dữ liệu cá nhân của thành viên vào kho mã nguồn này.
