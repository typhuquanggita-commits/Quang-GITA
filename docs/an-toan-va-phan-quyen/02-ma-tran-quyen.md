# 02 · MA TRẬN QUYỀN ĐẦY ĐỦ

## 1. Ký hiệu

**Hành động:** `R` đọc · `C` tạo · `U` sửa · `D` xoá · `X` xuất · `S` chia sẻ · `A` phê duyệt · `G` gán · `P` xuất bản · `B` break-glass

**Phạm vi (viết sau dấu hai chấm):** `own` · `child` · `assigned` · `team` · `class` · `referred` · `org` · `agg` (chỉ dữ liệu tổng hợp ẩn danh)

**Ô trống = KHÔNG CÓ QUYỀN.** Mặc định của toàn hệ là từ chối.

**Vai trò:** ST học sinh · PA phụ huynh · TE giáo viên · CO coach · HC coach trưởng · AD tư vấn ·
CN tham vấn tâm lý · SP chuyên gia · CS cán bộ BVTE · PD admin sản phẩm · SA admin hệ thống ·
SU super admin · ED giám đốc điều hành

---

## 2. Ma trận theo tài nguyên

### Nhóm A · Hồ sơ học viên (P2)

| Tài nguyên | ST | PA | TE | CO | HC | AD | CN | SP | CS | PD | SA | SU | ED |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `profile` Hồ sơ cơ bản | R:own | R:child | R:class | RU:assigned | R:team | RU:assigned | R:referred | R:referred | R:org | — | — | RU:org¹ | R:agg |
| `assessment` Bài đánh giá | RC:own | R:child | — | R:assigned | R:team | RCU:assigned | R:referred | R:referred | — | — | — | — | R:agg |
| `result` Kết quả đánh giá | R:own | R:child | R:class² | R:assigned | R:team | RU:assigned | R:referred | R:referred | — | — | — | — | R:agg |
| `competency` Hồ sơ năng lực | R:own | R:child | R:class² | RU:assigned | RU:team | RU:assigned | R:referred | R:referred | — | — | — | — | R:agg |
| `goal` Mục tiêu | RCU:own³ | R:child | — | RU:assigned | R:team | RU:assigned | R:referred | — | — | — | — | — | R:agg |
| `roadmap` Lộ trình | R:own | R:child | — | RCU:assigned | RUA:team | RC:assigned | R:referred | R:referred | — | — | — | — | R:agg |
| `task` Nhiệm vụ | RU:own⁴ | R:child | RC:class | RCU:assigned | R:team | — | — | — | — | — | — | — | — |
| `habit` Thói quen | RCU:own³ | R:child | — | RU:assigned | R:team | R:assigned | R:referred | — | — | — | — | — | R:agg |
| `evidence` Minh chứng | RC:own⁵ | R:child | RC:class | RC:assigned | R:team | R:assigned | — | R:referred | — | — | — | — | R:agg |
| `portfolio` Portfolio | RCUX:own⁶ | RX:child | — | RU:assigned | R:team | R:assigned | — | R:referred | — | — | — | — | R:agg |

### Nhóm B · Nhật ký và phản tư (P2, có ngoại lệ riêng tư)

| Tài nguyên | ST | PA | TE | CO | HC | AD | CN | SP | CS | PD | SA | SU | ED |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `journal` Nhật ký ngày | RCU:own | R:child | — | R:assigned | R:team | R:assigned | R:referred | — | — | — | — | — | R:agg |
| `reflection` Phản tư riêng tư | RCU:own | **R:child⁷** | — | R:assigned⁷ | — | R:assigned⁷ | R:referred | — | — | — | — | — | — |
| `reflection_flagged` Phản tư gắn cờ an toàn **(P3)** | RCU:own | — | — | — | — | — | **R:referred** | — | **R:org** | — | — | — | B |
| `parent_journal` Nhật ký đồng hành | R:own⁸ | RCU:own | — | R:assigned | R:team | R:assigned | R:referred | — | — | — | — | — | R:agg |

### Nhóm C · Huấn luyện và báo cáo (P2)

| Tài nguyên | ST | PA | TE | CO | HC | AD | CN | SP | CS | PD | SA | SU | ED |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `coaching_session` Buổi Review | RC:own⁹ | R:child | — | RCU:assigned | RU:team | R:assigned | R:referred | — | — | — | — | — | R:agg |
| `report` Báo cáo theo mốc | R:own | RX:child | R:class² | RCU:assigned | RUA:team | RCU:assigned | R:referred | R:referred | — | — | — | — | R:agg |
| `output_dossier` Bản đồ Nhận diện / Cơ chế | R:own | RX:child | — | R:assigned | RA:team | **RCU:assigned** | R:referred | R:referred | — | — | — | — | R:agg |
| `alert` Cảnh báo vàng/cam/đỏ | R:own | R:child | — | RU:assigned | RU:team | R:assigned | R:referred | — | R:org | — | — | — | R:agg |

### Nhóm D · Dữ liệu nhạy cảm đặc biệt (P3)

| Tài nguyên | ST | PA | TE | CO | HC | AD | CN | SP | CS | PD | SA | SU | ED |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `health_record` Hồ sơ y tế | R:own | RCU:child | — | — | — | — | R:referred | R:referred | R:org | — | — | — | **B** |
| `counseling_record` Hồ sơ tham vấn | — | — | — | — | — | — | **RCU:referred** | **R:referred** | — | — | — | — | **B** |
| `safeguarding_report` Báo cáo BVTE | — | — | — | — | — | — | — | — | **RCU:org** | — | — | — | **R:org** |
| `referral` Hồ sơ chuyển chuyên môn | — | R:child¹⁰ | — | R:assigned¹⁰ | RA:team | RC:assigned | RC:referred | R:referred | R:org | — | — | — | RA:org |

> **`SU` (Super Admin) trống toàn bộ Nhóm D — đây là chủ ý thiết kế, không phải thiếu sót.**
> Xem bất biến BB-01, BB-02, BB-03 và giải thích tại [`01-mo-hinh-phan-quyen.md`](01-mo-hinh-phan-quyen.md) §5.

### Nhóm E · Thư viện chuyên môn (P1)

| Tài nguyên | ST | PA | TE | CO | HC | AD | CN | SP | CS | PD | SA | SU | ED |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `problem_library` 220 phác đồ | — | — | R:org¹¹ | R:org | RU:org | RU:org | R:org | R:org | — | R:org | — | — | R:org |
| `solution_library` Thư viện giải pháp | — | — | R:org¹¹ | R:org | RU:org | RU:org | R:org | R:org | — | R:org | — | — | R:org |
| `activity_library` Thư viện hoạt động | — | — | R:org | R:org | RCUA:org | R:org | R:org | — | **A:org**¹² | R:org | — | — | R:org |
| `lesson_plan` Giáo án | — | — | RCU:own | — | — | — | — | — | — | R:org | — | — | R:org |
| `form_template` Biểu mẫu trắng | R:org | R:org | R:org | R:org | R:org | R:org | R:org | R:org | R:org | RCUP:org | — | — | R:org |

### Nhóm F · Quản trị hệ thống (P1 + siêu dữ liệu)

| Tài nguyên | ST | PA | TE | CO | HC | AD | CN | SP | CS | PD | SA | SU | ED |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `user_account` Tài khoản | RU:own¹³ | RU:own¹³ | RU:own¹³ | RU:own¹³ | RU:own¹³ | RU:own¹³ | RU:own¹³ | RU:own¹³ | RU:own¹³ | RU:own¹³ | R:org | **RCUD:org** | R:org |
| `role_assignment` Gán vai trò | — | — | — | — | — | — | — | — | — | — | — | **CU:org**¹⁴ | **A:org**¹⁴ |
| `product_config` Cấu hình gói, giá | — | — | — | — | — | — | — | — | — | **RCUP:org** | — | — | RA:org |
| `billing` Thanh toán, hợp đồng | R:own | RX:own | — | — | — | R:assigned¹⁵ | — | — | — | R:org | — | — | RX:org |
| `system_config` Cấu hình hạ tầng | — | — | — | — | — | — | — | — | — | — | **RCU:org** | RCU:org | R:org |
| `audit_log` Nhật ký kiểm toán | — | — | — | — | — | — | — | — | **R:org** | — | R:org¹⁶ | R:org¹⁶ | **R:org** |
| `analytics_aggregate` Thống kê tổng hợp | — | — | R:class | R:assigned | R:team | R:org | R:agg | — | R:agg | R:agg | — | — | **R:org** |

---

## 3. Chú thích

| # | Nội dung |
|---|---|
| ¹ | Super Admin sửa được **siêu dữ liệu** hồ sơ (trạng thái, gán vai trò, khoá tài khoản), **không đọc được nội dung chuyên môn**. Trường nội dung được mã hoá ở tầng ứng dụng |
| ² | Giáo viên chỉ thấy **phần liên quan môn mình dạy** (nhóm dữ liệu N04, N08), không thấy toàn bộ hồ sơ |
| ³ | Học viên tự đặt mục tiêu và điều chỉnh thói quen **từ cấp độ L3** trở lên. Dưới L3 chỉ đọc và đề xuất |
| ⁴ | Học viên đánh dấu hoàn thành nhiệm vụ **từ L2** |
| ⁵ | Học viên nộp minh chứng **từ L4** |
| ⁶ | Học viên xuất Portfolio của mình **từ L5**; trước đó Coach xuất hộ |
| ⁷ | **Chỉ thấy xu hướng và KPI, không thấy nguyên văn**, khi học viên từ 12 tuổi đã bật chế độ riêng tư (bất biến BB-04). Nội dung gắn cờ an toàn chuyển sang dòng `reflection_flagged` |
| ⁸ | Học viên đọc được nhật ký đồng hành của cha mẹ viết về mình — đây là chủ ý: quan hệ đồng hành phải hai chiều và minh bạch |
| ⁹ | Học viên tự mở buổi Review **từ L4** |
| ¹⁰ | Phụ huynh và Coach thấy **có ca chuyển và trạng thái**, không thấy nội dung chuyên môn của chuyên gia |
| ¹¹ | Giáo viên chỉ tra được nhóm N04 Năng lực học tập và N08 Hiệu suất |
| ¹² | Cán bộ BVTE **phê duyệt** hoạt động mới về mặt an toàn trẻ em (bước 4 quy trình bổ sung hoạt động), không sửa nội dung |
| ¹³ | Mọi vai trò tự sửa được hồ sơ tài khoản của **chính mình** (tên hiển thị, mật khẩu, 2FA) |
| ¹⁴ | **Bốn mắt**: Super Admin đề xuất gán vai trò, Giám đốc điều hành phê duyệt. Với vai trò `CN`, `CS`, `SU`, `ED` thì bắt buộc; vai trò khác có thể cấu hình |
| ¹⁵ | Tư vấn thấy **trạng thái thanh toán** để biết gói dịch vụ, không thấy chi tiết giao dịch |
| ¹⁶ | Admin hệ thống và Super Admin **đọc được nhật ký nhưng không sửa, không xoá**. Nhật ký chỉ ghi thêm (append-only), lưu tách kho |

---

## 4. Ma trận quyền theo gói dịch vụ

Quyền vai trò là điều kiện cần. Gói dịch vụ của gia đình là điều kiện đủ cho các tính năng có thu phí.

| Tài nguyên | G1 Trải nghiệm | G2 Đánh giá | G2.5 Giải mã | G3 Tư vấn | G4 Đồng hành | G5 Toàn diện |
|---|---|---|---|---|---|---|
| `profile`, `assessment` | ✔ rút gọn | ✔ | ✔ | ✔ | ✔ | ✔ |
| `result`, `competency` | — | ✔ | ✔ | ✔ | ✔ | ✔ |
| `output_dossier` Bản đồ Nhận diện | — | ✔ | ✔ | ✔ | ✔ | ✔ |
| `output_dossier` Bản đồ Cơ chế | — | — | ✔ | ✔ | ✔ | ✔ |
| `goal`, `roadmap` | — | rút gọn | ✔ | ✔ | ✔ | ✔ |
| `task`, `habit`, `journal`, `reflection` | thử 7 ngày | — | ✔ | ✔ | ✔ | ✔ |
| `coaching_session` | — | — | 2 buổi | định kỳ | ✔ | ✔ |
| `problem_library`, `solution_library` | — | — | ✔ | ✔ | ✔ | ✔ |
| `report` | — | 1 báo cáo | theo mốc | theo mốc | đầy đủ | đầy đủ |
| `portfolio` | — | — | — | — | ✔ | ✔ |
| `referral` chuyên gia | — | — | — | — | khi cần | ✔ |

**Ba quy tắc gói:**
1. **Nâng gói** mở thêm chức năng ngay lập tức.
2. **Hạ gói** giữ nguyên dữ liệu đã có, chỉ khoá chức năng mới.
3. **Hết hạn gói** vẫn xem và xuất được **toàn bộ hồ sơ và Portfolio của mình** — dữ liệu là của gia đình,
   không phải của Học viện.

---

## 5. Kiểm thử bắt buộc trước mỗi lần phát hành

Bộ kiểm thử phải khẳng định được **ít nhất** các mệnh đề sau. Bản cài đặt:
[`../../src/auth/policy.selftest.ts`](../../src/auth/policy.selftest.ts).

| # | Mệnh đề phải đúng |
|---|---|
| 1 | `SUPER_ADMIN` **không** đọc được `counseling_record` và `safeguarding_report` |
| 2 | `SYSTEM_ADMIN` **không** đọc được bất kỳ tài nguyên P3 nào |
| 3 | `PRODUCT_ADMIN` **không** đọc được bất kỳ tài nguyên nào thuộc Nhóm A, B, C, D |
| 4 | `COACH` **không** đọc được hồ sơ của học viên **không** được phân công cho mình |
| 5 | `TEACHER` **không** đọc được hồ sơ của học viên **không** thuộc lớp mình |
| 6 | `PARENT` **không** đọc được nguyên văn `reflection` khi con ≥ 12 tuổi và đã bật riêng tư |
| 7 | `PARENT` **không** đọc được hồ sơ của trẻ **không** phải con mình |
| 8 | `STUDENT` **không** đọc được hồ sơ của bất kỳ học viên nào khác |
| 9 | `STUDENT` ở **L2 không** tự đặt được mục tiêu; ở **L3 thì được** |
| 10 | `SPECIALIST` **không** đọc được `counseling_record` của ca **chưa** được chuyển tới |
| 11 | `EXEC_DIRECTOR` **không** đọc được hồ sơ cá nhân nếu **không có** break-glass còn hạn |
| 12 | Quyền của `COACH` **mất** trong 24 giờ sau khi phân công kết thúc |
| 13 | Mọi lần đọc P2/P3 **đều tạo** một bản ghi nhật ký kiểm toán |
| 14 | `export` bị từ chối khi hồ sơ đang có **lưu giữ pháp lý** |
| 15 | Break-glass **tự huỷ** sau thời hạn và **không tự phê duyệt** được |
