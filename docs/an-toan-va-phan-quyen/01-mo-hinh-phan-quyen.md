# 01 · MÔ HÌNH PHÂN QUYỀN

## 1. Mười ba vai trò

| Mã | Vai trò | Nhóm | Mục đích nghiệp vụ | Mức nhạy cảm cao nhất được chạm |
|---|---|---|---|---|
| `STUDENT` | **Học sinh** | Người học | Chủ thể của hành trình | P2 *(chỉ của chính mình)* |
| `PARENT` | **Phụ huynh** | Người học | Đối tác đồng hành | P2 *(chỉ của con mình, trừ phản tư riêng tư)* |
| `TEACHER` | **Giáo viên** | Chuyên môn | Dạy lớp tại Học viện | P2 *(chỉ lớp mình)* |
| `COACH` | **Người huấn luyện** | Chuyên môn | Đồng hành thực thi lộ trình | P2 *(chỉ học viên được phân công)* |
| `HEAD_COACH` | **Người huấn luyện trưởng** | Chuyên môn | Giám sát chuyên môn đội Coach | P2 *(đội mình phụ trách)* |
| `ADVISOR` | **Chuyên viên tư vấn** | Chuyên môn | Đọc dữ liệu, dựng hồ sơ chuyên môn | P2 *(ca được phân công)* |
| `COUNSELOR` | **Chuyên viên tham vấn tâm lý** | Nhạy cảm | Sàng lọc, hỗ trợ, can thiệp tâm lý | **P3** *(hồ sơ tham vấn)* |
| `SPECIALIST` | **Chuyên gia** | Nhạy cảm | Đánh giá chuyên sâu ca được chuyển | **P3** *(chỉ ca đã chuyển tới)* |
| `CSO` | **Cán bộ Bảo vệ trẻ em** | An toàn | Tiếp nhận và xử lý lo ngại | **P3** *(báo cáo bảo vệ trẻ em)* |
| `PRODUCT_ADMIN` | **Admin sản phẩm** | Quản trị | Cấu hình gói, giá, nội dung sản phẩm | **P1** — không chạm dữ liệu học viên |
| `SYSTEM_ADMIN` | **Admin hệ thống** | Quản trị | Vận hành hạ tầng, sao lưu, giám sát | **P1** + siêu dữ liệu P2 *(không đọc nội dung)* |
| `SUPER_ADMIN` | **Super Admin** | Quản trị | Quản trị tài khoản và phân quyền | **P1** + siêu dữ liệu — **không đọc P3** |
| `EXEC_DIRECTOR` | **Giám đốc điều hành** | Lãnh đạo | Quyết định tổ chức, chịu trách nhiệm cuối cùng | Tổng hợp ẩn danh + **P3 chỉ qua break-glass** |

> **Điểm quan trọng nhất của bảng này:** ba vai trò quản trị (`PRODUCT_ADMIN`, `SYSTEM_ADMIN`,
> `SUPER_ADMIN`) **không** phải là ba mức của cùng một quyền. Chúng là **ba trục khác nhau**:
> sản phẩm · hạ tầng · tài khoản. Không trục nào bao hàm quyền đọc nội dung hồ sơ trẻ em.

---

## 2. Bảy phạm vi quan hệ + một phạm vi tổng hợp

Vai trò trả lời *"được làm gì"*. Phạm vi trả lời *"với hồ sơ của ai"*. Thiếu phạm vi là lỗ hổng
phổ biến nhất trong hệ thống giáo dục: một Coach có quyền `read:report` mà không giới hạn phạm vi
sẽ đọc được báo cáo của **toàn bộ** học viên.

| Mã phạm vi | Nghĩa | Vai trò dùng | Cách xác định |
|---|---|---|---|
| `own` | Hồ sơ của chính mình | STUDENT | `subject.id === resource.ownerId` |
| `child` | Hồ sơ con mình | PARENT | Quan hệ giám hộ đã xác thực, còn hiệu lực |
| `assigned` | Học viên được phân công | COACH, ADVISOR | Bản ghi phân công còn hiệu lực |
| `team` | Học viên của đội Coach mình phụ trách | HEAD_COACH | Cây tổ chức |
| `class` | Học viên lớp mình dạy | TEACHER | Danh sách lớp của học kỳ hiện tại |
| `referred` | Ca đã được chuyển tới đúng quy trình | SPECIALIST, COUNSELOR | Bản ghi chuyển ca có phê duyệt |
| `org` | Toàn tổ chức | SUPER_ADMIN, SYSTEM_ADMIN, EXEC_DIRECTOR, CSO | Mặc định, nhưng **luôn kèm giới hạn mức nhạy cảm** |
| `agg` | **Chỉ dữ liệu tổng hợp**, không gắn với cá nhân nào | EXEC_DIRECTOR, PRODUCT_ADMIN | `!resource.ownerId` — hồ sơ có chủ sở hữu **không bao giờ** thoả `agg` |

> **`agg` không phải phạm vi quan hệ** — nó là phạm vi *loại dữ liệu*. Đây là cơ chế cho phép
> Giám đốc điều hành xem số liệu toàn hệ thống mà **không** đọc được hồ sơ của bất kỳ đứa trẻ nào.
> Bất biến **BB-07**: hàm `can()` chỉ gán `agg` khi tài nguyên không có `ownerId`. Nới quy tắc này
> là mở lại đúng lỗ hổng đã được vá — xem [`04-kiem-soat-an-ninh.md`](04-kiem-soat-an-ninh.md).

**Quy tắc hết hiệu lực:** khi phân công kết thúc, khi học viên đổi lớp, khi ca đóng, quyền
phải **tự động mất trong 24 giờ**. Quyền còn sót lại sau khi quan hệ đã chấm dứt là dạng lỗ hổng
khó phát hiện nhất — hệ thống phải rà tự động hằng đêm.

---

## 3. Bốn mức nhạy cảm dữ liệu

| Mức | Tên | Ví dụ | Ai chạm được |
|---|---|---|---|
| **P0** | Công khai | Nội dung marketing, mô tả chương trình | Mọi người |
| **P1** | Nội bộ | Kịch bản, giáo án, biểu mẫu trắng, cấu hình sản phẩm | Nhân sự đã ký cam kết |
| **P2** | Bảo mật | Hồ sơ học viên, đánh giá, KPI, báo cáo, nhật ký, ảnh | Theo vai trò **và** phạm vi |
| **P3** | Nhạy cảm đặc biệt | **Hồ sơ y tế · hồ sơ tham vấn tâm lý · báo cáo bảo vệ trẻ em · nội dung gắn cờ an toàn** | Danh sách trắng rất hẹp, xem §5 |

Chi tiết phân loại và vòng đời: [`03-phan-loai-du-lieu.md`](03-phan-loai-du-lieu.md).

---

## 4. Tầng năng lực học viên (L1–L5) mở dần quyền tự phục vụ

Đây là phần đặc thù của GITA: **học viên được trao thêm quyền điều khiển hành trình của chính mình
khi năng lực tự quản trị tăng lên**. Phân quyền ở đây không phải để hạn chế — nó là **công cụ sư phạm**,
phản chiếu nguyên tắc "tăng dần độ khó, giảm dần hỗ trợ".

| Cấp | Tên | Học viên tự làm được gì trên hệ thống |
|---|---|---|
| **L1** | Nhận biết | Xem nhiệm vụ hôm nay · ghi nhật ký · xem hồ sơ của mình |
| **L2** | Tập luyện có hỗ trợ | + Tự chấm 1–5 · đánh dấu hoàn thành · đặt lời nhắc cá nhân |
| **L3** | Thực hiện độc lập | + **Tự đặt mục tiêu tuần** · tự điều chỉnh thói quen trong khung đã thống nhất · bật/tắt chế độ riêng tư cho phản tư |
| **L4** | Chủ động dẫn dắt | + **Tự mở buổi Review** và đặt lịch với Coach · đề xuất điều chỉnh lộ trình · xem đầy đủ dữ liệu KPI của mình · nộp minh chứng |
| **L5** | Lan toả & kiến tạo | + **Tạo và quản lý dự án** · mời bạn tham gia · xuất Portfolio của mình · làm mentor đồng đẳng cho học viên khác *(chỉ xem tiến độ được chia sẻ, không xem hồ sơ)* |

**Ba quy tắc bắt buộc của cơ chế này:**
1. **Không bao giờ dùng cấp độ làm hình phạt.** Không hạ cấp vì học viên làm sai — chỉ điều chỉnh khi
   dữ liệu cho thấy cấp hiện tại chưa phù hợp, và **phải giải thích cho học viên**.
2. **Cấp độ hiển thị cho học viên**, kèm điều kiện lên cấp. Hệ thống phân quyền mà người dùng
   không biết mình đang ở đâu sẽ tạo cảm giác bị kiểm soát tuỳ tiện.
3. **Quyền riêng tư phản tư mở từ L3 và không bao giờ bị thu lại** — trừ nội dung gắn cờ an toàn.

---

## 5. Danh sách trắng cho dữ liệu P3

Đây là phần chặt nhất của toàn hệ thống. **Mặc định: mọi vai trò đều bị từ chối.**

| Loại dữ liệu P3 | Đọc | Ghi | Không bao giờ được đọc |
|---|---|---|---|
| **Hồ sơ y tế học viên** | `COUNSELOR`, nhân viên y tế *(vai trò vận hành trại)*, `EXEC_DIRECTOR` qua break-glass | Nhân viên y tế | `TEACHER`, `PRODUCT_ADMIN`, `SYSTEM_ADMIN`, `SUPER_ADMIN` |
| **Hồ sơ tham vấn tâm lý** | `COUNSELOR` · `SPECIALIST` (chỉ ca `referred`) | `COUNSELOR` | Tất cả vai trò còn lại, gồm cả `SUPER_ADMIN`, `HEAD_COACH`, `PARENT` |
| **Báo cáo bảo vệ trẻ em** | `CSO` · `EXEC_DIRECTOR` | `CSO` | **Tất cả vai trò còn lại**, gồm `SYSTEM_ADMIN` và `SUPER_ADMIN` |
| **Nội dung phản tư gắn cờ an toàn** | `COUNSELOR` · `CSO` | — | `PARENT`, `TEACHER`, `COACH` *(chỉ nhận thông báo có sự việc, không nhận nội dung)* |

**Vì sao Super Admin bị loại khỏi P3:** trong một sự việc bảo vệ trẻ em, người bị nghi ngờ có thể là
bất kỳ ai trong tổ chức — kể cả nhân sự kỹ thuật. Nếu Super Admin đọc được báo cáo, hệ thống
không bảo vệ được người báo cáo. Đây là chuẩn của mọi tổ chức làm việc với trẻ em.

**Super Admin vẫn quản trị được hệ thống**: tạo/khoá tài khoản, gán vai trò, khôi phục truy cập,
sao lưu — nhưng dữ liệu P3 được **mã hoá ở tầng ứng dụng bằng khoá mà vai trò quản trị không giữ**.

---

## 6. Break-glass — truy cập khẩn cấp

Có tình huống thật cần vượt quyền: một sự việc an toàn đang diễn ra, một cuộc điều tra,
một yêu cầu hợp pháp của cơ quan chức năng.

**Quy trình bốn bước, không rút gọn được:**

```
1. NGƯỜI YÊU CẦU nhập: hồ sơ cần xem · lý do cụ thể · căn cứ · thời hạn cần (tối đa 24 giờ)
        ↓
2. NGƯỜI PHÊ DUYỆT — phải là người KHÁC, thuộc danh sách phê duyệt của loại dữ liệu đó
   (P3 tham vấn → Giám đốc điều hành ·  P3 bảo vệ trẻ em → Giám đốc điều hành)
        ↓
3. HỆ THỐNG cấp quyền tạm, ghi nhật ký bất biến, GỬI THÔNG BÁO NGAY tới:
   Cán bộ BVTE · Giám đốc điều hành · chủ sở hữu dữ liệu (hoặc người giám hộ, trừ khi
   việc thông báo gây nguy hiểm cho trẻ — khi đó ghi rõ lý do hoãn thông báo)
        ↓
4. HẾT THỜI HẠN quyền tự huỷ. Trong 7 ngày phải có BIÊN BẢN GIẢI TRÌNH những gì đã xem và vì sao
```

**Ba quy tắc chống lạm dụng:**
- **Không tự phê duyệt.** Người yêu cầu và người phê duyệt luôn là hai người khác nhau.
- **Không break-glass im lặng.** Mọi lần đều thông báo, kể cả khi hợp lệ.
- **Rà soát bắt buộc mỗi quý.** Nếu một tài khoản dùng break-glass > 2 lần/quý, Giám đốc điều hành
  phải xem lại: hoặc vai trò đó đang thiếu quyền chính đáng, hoặc đang có lạm dụng.

---

## 7. Thuật toán quyết định

```
can(subject, action, resource, context) → { allow: boolean, reason: string }

 1. Nếu tài khoản bị khoá / đã hết hạn / chưa ký cam kết bảo mật     → TỪ CHỐI
 2. Nếu chủ thể dữ liệu đã rút đồng ý cho mục đích này               → TỪ CHỐI
 3. Nếu hồ sơ đang bị lưu giữ pháp lý và hành động là delete/export  → TỪ CHỐI
 4. Tra ma trận: vai trò có được cấp (action, resourceType) không?   → không có: TỪ CHỐI
 5. Kiểm phạm vi quan hệ giữa subject và resource                     → sai phạm vi: TỪ CHỐI
 6. Kiểm mức nhạy cảm: vai trò có nằm trong danh sách trắng của mức?  → không: TỪ CHỐI
 7. Nếu là học viên: hành động có nằm trong cấp độ L hiện tại không?  → chưa mở: TỪ CHỐI
 8. Nếu tính năng thuộc gói dịch vụ: gói G của gia đình có mở không?  → chưa mua: TỪ CHỐI
 9. Nếu là break-glass: có phê duyệt hợp lệ, còn hạn không?           → không: TỪ CHỐI
10. CHO PHÉP  → ghi nhật ký kiểm toán nếu tài nguyên ở mức P2 hoặc P3
```

**Ba nguyên tắc cài đặt:**
- **Mặc định từ chối.** Không có quy tắc cho phép = từ chối.
- **Từ chối thắng cho phép.** Chỉ cần một bước từ chối là kết quả cuối là từ chối.
- **Lý do từ chối không tiết lộ thông tin.** Trả về "không có quyền truy cập" chứ không phải
  "hồ sơ này thuộc chuyên viên tham vấn X" — bản thân thông điệp lỗi cũng là rò rỉ dữ liệu.

Cài đặt tham chiếu: [`../../src/auth/can.ts`](../../src/auth/can.ts).
