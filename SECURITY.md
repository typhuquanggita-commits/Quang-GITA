# Chính sách an ninh — Học viện GITA

## Báo cáo lỗ hổng

Phát hiện lỗ hổng bảo mật, vui lòng báo riêng cho Ban lãnh đạo Học viện GITA.
**Không mở issue công khai.** Chúng tôi phản hồi trong vòng 5 ngày làm việc.

Nếu lỗ hổng có thể ảnh hưởng tới **an toàn của trẻ em**, báo đồng thời cho
**Cán bộ Bảo vệ trẻ em** của Học viện. Xem quy trình tại
[`docs/an-toan-va-phan-quyen/04-kiem-soat-an-ninh.md`](docs/an-toan-va-phan-quyen/04-kiem-soat-an-ninh.md) §3.

---

## Ba quy tắc bắt buộc khi phát triển

### 1. Không bao giờ nhúng bí mật vào mã chạy phía trình duyệt

Vite thay thế `process.env.X` bằng **văn bản** tại thời điểm build. Khoá sẽ nằm nguyên dạng
chuỗi trong tệp JavaScript đã build và bất kỳ ai mở trang cũng trích ra được.

Cấu hình hiện tại của kho mã này:

| Môi trường | Hành vi |
|---|---|
| `production` | **Không bao giờ** nhúng khoá. Có khoá trong môi trường build thì in cảnh báo và vẫn không nhúng |
| `development` | Chỉ nhúng khi lập trình viên chủ động đặt `GITA_ALLOW_CLIENT_API_KEY=true` trong `.env.local` |

**Để chạy production**, cần dựng **backend proxy** giữ khoá phía máy chủ:

```
Trình duyệt ──► /api/model  (máy chủ của Học viện: xác thực · giới hạn tần suất · nhật ký)
                     └──► API nhà cung cấp mô hình  (khoá chỉ tồn tại ở đây)
```

Proxy đồng thời là nơi duy nhất đặt được xác thực người dùng, giới hạn tần suất và nhật ký
sử dụng — ba thứ không thể làm khi gọi thẳng từ trình duyệt.

### 2. Không commit bí mật

`.gitignore` đã loại trừ `.env`, `.env.*`, khoá riêng tư và tệp service account.
Dùng [`.env.example`](.env.example) làm mẫu.

Nếu đã lỡ commit bí mật: **thu hồi và cấp lại khoá ngay**. Xoá commit **không** làm bí mật
biến mất khỏi lịch sử kho mã.

### 3. Mọi điểm cuối chạm dữ liệu học viên phải qua `can()`

Xem [`src/auth/README.md`](src/auth/README.md).
Chạy `npm run check` trước mỗi lần phát hành — bộ tự kiểm phân quyền phải đạt 100%.

---

## Cấu hình dev server

Mặc định lắng nghe `127.0.0.1` (chỉ máy này). Đặt `GITA_DEV_HOST=0.0.0.0` chỉ khi thật sự cần
truy cập từ máy khác, và chỉ trên mạng tin cậy.

---

## Tài liệu liên quan

| Tài liệu | Nội dung |
|---|---|
| [`docs/an-toan-va-phan-quyen/`](docs/an-toan-va-phan-quyen/README.md) | Mô hình phân quyền, ma trận quyền, phân loại dữ liệu, kiểm soát an ninh |
| [`src/auth/`](src/auth/README.md) | Bản cài đặt tham chiếu |
| [`docs/leader-boom-365/09-an-toan-bao-ve-tre-em.md`](docs/leader-boom-365/09-an-toan-bao-ve-tre-em.md) | An toàn và bảo vệ trẻ em tại hiện trường |
