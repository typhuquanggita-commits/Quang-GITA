# 05 · TRIỂN KHAI KỸ THUẬT

## 1. Bản cài đặt tham chiếu

| Tệp | Nội dung |
|---|---|
| [`src/auth/types.ts`](../../src/auth/types.ts) | 13 vai trò · 9 hành động · 8 phạm vi · 4 mức nhạy cảm · 34 loại tài nguyên |
| [`src/auth/policy.ts`](../../src/auth/policy.ts) | Ma trận quyền · danh sách trắng P3 · cổng cấp độ L · cổng gói G |
| [`src/auth/can.ts`](../../src/auth/can.ts) | Hàm `can()` theo thuật toán 10 bước · `resolveScopes()` · `filterReadable()` |
| [`src/auth/audit.ts`](../../src/auth/audit.ts) | Hợp đồng nhật ký kiểm toán |
| [`src/auth/policy.selftest.ts`](../../src/auth/policy.selftest.ts) | **37 mệnh đề tự kiểm** |

```bash
npm run test:auth     # bộ tự kiểm phân quyền  → phải đạt 100%
npm run typecheck     # kiểm kiểu
npm run check         # cả hai — chạy trước mỗi lần phát hành
```

---

## 2. Bốn quy tắc tích hợp

| # | Quy tắc | Vì sao |
|---|---|---|
| 1 | **Mọi điểm cuối chạm P2/P3 đều gọi `can()`** | Một điểm cuối quên gọi là một lỗ hổng. Không có ngoại lệ "chỗ này nội bộ" |
| 2 | **Lọc ở máy chủ, không lọc ở giao diện** | Dữ liệu đã rời máy chủ là đã rò rỉ, dù giao diện có ẩn |
| 3 | **Luôn truyền `auditSink` thật** | Bỏ trống sẽ ném lỗi khi chạm P2/P3 — chủ ý, để không ai chạy hệ thống không có nhật ký |
| 4 | **AI chạy dưới quyền của người đang hỏi** | Chống lỗ hổng TK-04 |

---

## 3. Quyền phái sinh, không lưu cứng

Đây là điểm cài đặt quan trọng nhất và cũng dễ làm sai nhất.

**Sai:** lưu một bảng `user_permissions` rồi cấp quyền khi tạo phân công.
Khi phân công kết thúc, không ai nhớ xoá dòng đó — quyền sống mãi.

**Đúng:** quyền được **tính tại thời điểm truy vấn** từ bản ghi quan hệ còn hiệu lực.
Hàm `resolveScopes()` bỏ qua mọi quan hệ có `validTo` trong quá khứ.
Kết thúc phân công = đặt `validTo` = quyền mất ngay ở lần gọi tiếp theo.

**Tác vụ hằng đêm bổ sung:** rà và cảnh báo các quan hệ đã hết hạn nhưng tài khoản vẫn hoạt động,
và các tài khoản của nhân sự đã nghỉ việc.

---

## 4. Mã hoá tầng ứng dụng cho P3

Đây là cơ chế kỹ thuật **thực thi** bất biến BB-01 — không chỉ là quy định trên giấy.

```
Dữ liệu P3 ──► mã hoá bằng khoá K_P3 ──► lưu vào kho tách biệt
                      ▲
                      │
        K_P3 nằm trong dịch vụ quản lý khoá,
        cấp cho các vai trò COUNSELOR / CSO / SPECIALIST
        theo danh sách trắng của từng loại dữ liệu.
        Vai trò quản trị hệ thống KHÔNG có quyền lấy K_P3.
```

**Hệ quả thực tế:** kể cả khi Super Admin truy cập trực tiếp cơ sở dữ liệu, họ chỉ thấy dữ liệu
đã mã hoá. Đây là khác biệt giữa "quy định cấm xem" và "kỹ thuật không cho xem".
Chỉ quy định thôi thì không chống được T3 trong mô hình đe doạ.

---

## 5. Lược đồ nhật ký kiểm toán

```
at                 thời điểm, chuẩn ISO 8601
actorId            ai thao tác
actorRoles         vai trò đang giữ tại thời điểm đó
action             read | create | update | delete | export | share | approve | assign | publish
resourceType       loại tài nguyên
resourceId         mã tài nguyên
sensitivity        P0 | P1 | P2 | P3
subjectOfDataId    chủ thể dữ liệu — dùng để trả lời "ai đã xem hồ sơ của con tôi"
allowed            cho phép hay từ chối
reason             mã lý do
viaBreakGlass      có phải truy cập khẩn cấp không
```

**Ba yêu cầu bắt buộc:**
- **Chỉ ghi thêm.** Không sửa, không xoá — kể cả Super Admin.
- **Kho tách biệt** khỏi cơ sở dữ liệu nghiệp vụ.
- **Lưu tối thiểu 5 năm.**

**Trường `subjectOfDataId` là bắt buộc.** Nó cho phép trả lời câu hỏi mà mọi phụ huynh đều có
quyền hỏi: *"những ai đã xem hồ sơ của con tôi, khi nào, và vì sao?"*

---

## 6. Quy trình break-glass — luồng kỹ thuật

```
POST /break-glass/request   { resourceType, resourceId, reason, duration ≤ 24h }
        ↓  tạo bản ghi trạng thái PENDING, thông báo người phê duyệt
POST /break-glass/approve   { requestId }
        ↓  KIỂM TRA: approver ≠ requester  ·  approver thuộc danh sách phê duyệt của loại dữ liệu
        ↓  tạo grant với expiresAt
        ↓  THÔNG BÁO NGAY: Cán bộ BVTE · Giám đốc điều hành · chủ thể dữ liệu
             (hoãn thông báo chủ thể chỉ khi việc thông báo gây nguy hiểm cho trẻ — ghi rõ lý do)
        ↓
Truy cập  →  can() phát hiện grant còn hạn  →  cho phép, đánh dấu viaBreakGlass = true
        ↓
Hết hạn   →  grant tự vô hiệu, không cần thao tác thủ công
        ↓
+7 ngày   →  hệ thống nhắc nộp BIÊN BẢN GIẢI TRÌNH; chưa nộp thì khoá quyền yêu cầu break-glass mới
```

---

## 7. Bảng kiểm tích hợp cho từng điểm cuối

Với **mỗi** điểm cuối API mới chạm dữ liệu học viên:

- [ ] Đã gọi `can()` trước khi đọc hoặc ghi
- [ ] Truyền `auditSink` thật, không phải bộ ghi rỗng
- [ ] Truy vấn danh sách dùng `filterReadable()` hoặc lọc trong câu truy vấn cơ sở dữ liệu
- [ ] `resource.sensitivity` được đặt đúng theo bảng phân loại TL 03 §2
- [ ] `resource.ownerId` được đặt đúng — thiếu trường này làm hỏng toàn bộ kiểm tra phạm vi
- [ ] Thông điệp lỗi trả về **không** tiết lộ sự tồn tại hay chủ sở hữu của tài nguyên
- [ ] Với `export`: có kiểm tra `legalHold` và giới hạn số bản ghi
- [ ] Đã thêm mệnh đề tương ứng vào bộ tự kiểm

---

## 8. Lộ trình triển khai

| Giai đoạn | Nội dung | Điều kiện hoàn thành |
|---|---|---|
| **1 · Nền tảng** | Xác thực, 2FA cho vai trò nhạy cảm, quản lý phiên | Đăng nhập an toàn hoạt động |
| **2 · Phân quyền** | Tích hợp `can()` vào mọi điểm cuối; nhật ký kiểm toán chạy thật | `npm run check` đạt 100%; không điểm cuối nào bỏ qua `can()` |
| **3 · Mã hoá P3** | Dịch vụ quản lý khoá; tách kho dữ liệu nhạy cảm | Super Admin truy cập trực tiếp cơ sở dữ liệu chỉ thấy dữ liệu đã mã hoá |
| **4 · Vòng đời** | Tác vụ thu hồi quyền hằng đêm; tác vụ xoá theo thời hạn | Quyền hết hạn trong 24 giờ; hồ sơ quá hạn được xử lý tự động |
| **5 · Giám sát** | Cảnh báo hành vi bất thường; báo cáo rà soát định kỳ | Đội ngũ nhận được cảnh báo thật, có quy trình xử lý |
| **6 · Break-glass** | Luồng yêu cầu – phê duyệt – thông báo – giải trình đầy đủ | Diễn tập một lần thành công |
| **7 · Trợ lý AI** | Chỉ bật sau khi giai đoạn 2–5 chạy ổn định | AI chạy dưới quyền người dùng; mọi truy vấn qua `can()` |

> **Thứ tự này không đảo được.** Bật trợ lý AI trước khi phân quyền và nhật ký chạy ổn định
> là cách nhanh nhất để vô hiệu hoá toàn bộ hệ thống bảo vệ dữ liệu — xem TL 04 §7 TK-04.

---

## 9. Những gì bản tham chiếu chưa làm

| Hạng mục | Ghi chú |
|---|---|
| **Xác thực người dùng** | Bản này chỉ làm **phân quyền**, không làm **xác thực** |
| Mã hoá tầng ứng dụng cho P3 | Cần dịch vụ quản lý khoá thật |
| Kho nhật ký chỉ ghi thêm | `InMemoryAuditSink` chỉ dùng cho kiểm thử |
| Tác vụ thu hồi quyền hằng đêm | Cần lịch chạy và cảnh báo |
| Luồng break-glass đầy đủ | Bản này kiểm tra phê duyệt và hạn dùng; còn cần yêu cầu, thông báo, giải trình |
| Giới hạn tần suất, chống xuất hàng loạt | Biện pháp B5, B6 |
| Backend proxy cho khoá API mô hình | Xem TL 04 §6 LH-01 |
