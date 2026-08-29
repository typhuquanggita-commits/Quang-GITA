# `src/auth` — Bản cài đặt tham chiếu hệ phân quyền GITA 365

Đặc tả đầy đủ: [`docs/an-toan-va-phan-quyen/`](../../docs/an-toan-va-phan-quyen/README.md)

## Tệp

| Tệp | Vai trò |
|---|---|
| `types.ts` | Kiểu dữ liệu: 13 vai trò · 9 hành động · 8 phạm vi · 4 mức nhạy cảm · 34 loại tài nguyên |
| `policy.ts` | **Ma trận quyền** · danh sách trắng P3 · cổng cấp độ học viên · cổng gói dịch vụ |
| `can.ts` | **Hàm quyết định `can()`** theo thuật toán 10 bước · `resolveScopes()` · `filterReadable()` |
| `audit.ts` | Hợp đồng nhật ký kiểm toán · bộ ghi trong bộ nhớ dùng cho kiểm thử |
| `policy.selftest.ts` | **37 mệnh đề tự kiểm**, gồm đủ 15 mệnh đề bắt buộc của TL 02 §5 |

## Chạy

```bash
npm run test:auth     # bộ tự kiểm phân quyền
npm run typecheck     # kiểm kiểu TypeScript
npm run check         # cả hai
```

Bộ tự kiểm chạy bằng Node ≥ 22.6 với `--experimental-strip-types`, không cần cài thêm gói.

## Dùng

```ts
import {can} from './src/auth/can.ts';

const decision = can(
  subject,                       // ai đang thao tác
  'read',                        // hành động
  resource,                      // tài nguyên, kèm ownerId và mức nhạy cảm
  {now: new Date()},             // ngữ cảnh: thời điểm, đồng ý, mục đích
  {auditSink: myAuditSink},      // bắt buộc khi tài nguyên là P2/P3
);

if (!decision.allow) {
  // KHÔNG trả decision.reason ra giao diện — bản thân lý do cũng là rò rỉ thông tin.
  throw new ForbiddenError('Bạn không có quyền truy cập nội dung này.');
}
```

## Bốn quy tắc bắt buộc khi tích hợp

1. **Mọi điểm cuối chạm dữ liệu P2/P3 đều phải gọi `can()`.** Không có đường tắt, không có
   "chỗ này nội bộ nên bỏ qua". Một điểm cuối quên gọi là một lỗ hổng.
2. **Lọc ở máy chủ, không lọc ở giao diện.** Dùng `filterReadable()` trước khi trả dữ liệu.
   Dữ liệu đã rời máy chủ là đã rò rỉ, dù giao diện có ẩn đi.
3. **Luôn truyền `auditSink` thật.** Bỏ trống sẽ ném lỗi khi chạm P2/P3 — đây là chủ ý,
   để không ai vô tình chạy hệ thống mà không có nhật ký.
4. **Trợ lý AI chạy dưới danh tính và quyền của người đang hỏi**, không có danh tính riêng
   quyền cao. Mọi truy vấn của AI đều đi qua `can()`. Xem TL 04 §7 TK-04.

## Những gì bản này CHƯA làm và phải bổ sung khi triển khai thật

| Hạng mục | Ghi chú |
|---|---|
| Xác thực người dùng | Bản này chỉ làm **phân quyền**, không làm **xác thực**. Cần thêm đăng nhập, 2FA, quản lý phiên |
| Mã hoá tầng ứng dụng cho P3 | Cơ chế kỹ thuật thực thi bất biến BB-01. Khoá không nằm ở vai trò quản trị |
| Kho nhật ký chỉ ghi thêm | `InMemoryAuditSink` chỉ dùng cho kiểm thử |
| Tác vụ thu hồi quyền hằng đêm | Quyền phái sinh từ quan hệ còn hiệu lực — cần tác vụ rà và cảnh báo |
| Quy trình break-glass đầy đủ | Bản này kiểm tra phê duyệt và hạn dùng; còn cần luồng yêu cầu, thông báo, biên bản giải trình |
| Giới hạn tần suất và chống xuất hàng loạt | Biện pháp B5 |
