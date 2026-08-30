# Đăng nhập, phân quyền và học phí — hiện trạng, giới hạn và đặc tả để triển khai

Tài liệu này tồn tại vì một lý do: **MATH365 hiện chưa có đăng nhập thật và chưa có phân quyền thật.**
Nếu bạn đọc thấy trong ứng dụng có mục "Phân quyền" với tám vai trò và mười sáu quyền, đó là
**phân quyền hiển thị phía trình duyệt**, không phải kiểm soát truy cập. Tài liệu này nói rõ ranh
giới đó, và đưa ra đặc tả đầy đủ để đội kỹ thuật dựng phần còn thiếu.

---

## 1. Hiện trạng — cái gì đang có thật

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Hồ sơ người học | **Có** | Lưu trong `localStorage` của từng trình duyệt |
| Tám vai trò và mười sáu quyền | **Có, nhưng chỉ ở phía trình duyệt** | `src/data/roles.ts`, `src/lib/auth.ts` |
| Lên cấp vai trò theo KPI | **Có** | `suggestRoleUpgrade` trong `src/lib/auth.ts` |
| Làm phiếu, chấm điểm, xem lời giải | **Có** | Chạy hoàn toàn trên máy người dùng |
| Bộ đề luyện: làm, nộp, chấm, xem lời giải | **Có** | 700 đề, sinh tất định theo mã đề |
| Báo cáo tuần cho gia đình | **Có** | Dựng từ dữ liệu trên chính máy đó |
| **Đăng nhập bằng tài khoản** | **Chưa có** | Cần máy chủ |
| **Chặn nội dung trả phí** | **Chưa có** | Cần máy chủ |
| **Giáo viên giao bài, học sinh nộp, giáo viên nhận kết quả** | **Chưa có (giữa các máy)** | Cần máy chủ |
| **Đồng bộ tiến độ giữa nhiều thiết bị** | **Chưa có** | Cần máy chủ |

## 2. Vì sao phân quyền hiện tại không phải là bảo mật

Toàn bộ mã của một ứng dụng chạy trên trình duyệt đều nằm trên máy người dùng. Người dùng có thể:

- Mở công cụ dành cho nhà phát triển và sửa trực tiếp giá trị `role` trong `localStorage`.
- Đọc toàn bộ dữ liệu bài giảng, lời giải và đề trong gói mã đã tải về.
- Bỏ qua mọi câu lệnh `if` kiểm tra quyền, vì chính câu lệnh đó cũng chạy trên máy họ.

Do đó **mọi kiểm tra quyền ở phía trình duyệt chỉ có giá trị làm giao diện gọn gàng**, không có giá
trị ngăn chặn. Muốn thật sự chặn, dữ liệu phải nằm trên máy chủ và máy chủ phải là bên quyết định
ai được nhận gì.

Một hệ quả quan trọng cho MATH365: **nội dung nào đã tải xuống trình duyệt thì coi như đã công khai.**
Vì vậy ranh giới trả phí phải đặt ở tầng dữ liệu (máy chủ chỉ trả về nội dung cho người có quyền),
không đặt ở tầng giao diện.

## 3. Kiến trúc đề xuất

```
Trình duyệt (MATH365 hiện tại)
    │
    │  AccountProvider  ← điểm cắm duy nhất, xem src/lib/account.ts
    ▼
Máy chủ (cần dựng)
    ├── Xác thực          : email + mật khẩu, hoặc OTP qua số điện thoại
    ├── Phiên đăng nhập   : token ngắn hạn + token làm mới
    ├── Quyền và gói học  : bảng entitlement theo người dùng
    ├── Nội dung có kiểm soát : API trả nội dung theo quyền
    ├── Lớp học và giao bài   : giáo viên ↔ học sinh
    └── Lưu tiến độ           : đồng bộ nhiều thiết bị
```

Có thể dùng nền tảng có sẵn (Supabase, Firebase) để rút ngắn phần xác thực và cơ sở dữ liệu, hoặc
dựng máy chủ riêng. Đặc tả dưới đây độc lập với lựa chọn đó.

## 4. Mô hình dữ liệu tối thiểu

```
account
  id, email hoặc phone, password_hash, created_at, status
  profile_name, grade, track, target_school, exam_date

enrollment                      -- người này thuộc nhóm nào
  account_id, org_id, class_id, role_id, joined_at, ended_at

entitlement                     -- người này được mở những gì
  account_id, plan            -- 'ngoai' | 'hoc-phi' | 'hoc-phi-chuyen'
  starts_at, ends_at
  scope                       -- ví dụ: ['track:thpt', 'track:chinh-khoa']

class
  id, org_id, name, track, teacher_account_id, created_at

assignment                      -- giáo viên giao bài
  id, class_id, created_by, kind        -- 'worksheet' | 'bank-exam' | 'topic'
  ref_id                                -- mã phiếu hoặc mã đề, ví dụ 'BD-9-042'
  due_at, note

submission                      -- học sinh nộp
  id, assignment_id, account_id
  answers_json, score, max_score, seconds, submitted_at
  per_item_json                        -- điểm từng câu, để giáo viên xem chi tiết

progress                        -- tiến độ đồng bộ
  account_id, updated_at, state_json   -- chính là AppState hiện tại
```

## 5. Hai nhóm học sinh: ngoài và có đóng phí

Đây là yêu cầu nghiệp vụ trung tâm. Đề xuất ba gói:

| Gói | Ai dùng | Mở những gì |
|---|---|---|
| `ngoai` | Học sinh chưa đăng ký học tại GITA | Toàn bộ trang nội dung công khai (chuyên đề, công thức, đề cương, cấu trúc đề thi); phiếu luyện Level 1–2; 20 đề đầu mỗi khối trong bộ đề luyện; lời giải rút gọn |
| `hoc-phi` | Học sinh đang đóng phí | Toàn bộ phiếu luyện mọi Level; toàn bộ 700 đề luyện; lời giải chi tiết từng bước; lộ trình cá nhân hoá; báo cáo tuần; nhận bài giao từ giáo viên |
| `hoc-phi-chuyen` | Học sinh lớp chuyên sâu | Như trên, cộng kho chuyên và đội tuyển, cộng module nâng cao |

Quy tắc thực thi **bắt buộc đặt ở máy chủ**:

1. Trang nội dung công khai vẫn dựng sẵn dạng HTML tĩnh như hiện nay — đây là phần phục vụ tìm kiếm
   và không cần bảo vệ.
2. Mọi nội dung thuộc gói trả phí (lời giải chi tiết, đề từ số 21 trở đi, phiếu Level 3–5) **không
   được đóng gói vào mã trình duyệt**, mà lấy qua API kèm token.
3. Máy chủ kiểm tra `entitlement` còn hiệu lực trước khi trả nội dung. Hết hạn thì trả 403.
4. Giao diện vẫn hiển thị mục bị khoá kèm nút nâng cấp — nhưng đó chỉ là trải nghiệm, không phải rào chắn.

## 6. API tối thiểu

```
POST /auth/register            { email, password, profile }        → { account, tokens }
POST /auth/login               { email, password }                 → { account, tokens }
POST /auth/refresh             { refresh_token }                   → { tokens }
POST /auth/logout              { refresh_token }                   → 204

GET  /me                                                            → { account, role, entitlement }
GET  /me/progress                                                   → { state_json, updated_at }
PUT  /me/progress              { state_json, updated_at }           → 204   (giải quyết xung đột theo updated_at)

GET  /content/worksheet/:id                                         → nội dung phiếu, 403 nếu ngoài gói
GET  /content/bank-exam/:id                                         → đề luyện, 403 nếu ngoài gói
GET  /content/solution/:itemId                                      → lời giải chi tiết, 403 nếu ngoài gói

GET  /classes                                                       → lớp mà tài khoản này thuộc về
GET  /classes/:id/students                                          → chỉ giáo viên của lớp
POST /classes/:id/assignments  { kind, ref_id, due_at, note }       → tạo bài giao
GET  /classes/:id/assignments                                       → danh sách bài giao
POST /assignments/:id/submissions { answers_json, seconds }         → nộp bài, máy chủ tự chấm
GET  /assignments/:id/submissions                                   → chỉ giáo viên; kết quả cả lớp
GET  /classes/:id/report?from=&to=                                  → báo cáo lớp theo tuần
```

Quy ước lỗi: `401` chưa đăng nhập, `403` đã đăng nhập nhưng ngoài gói hoặc sai vai trò, `404` không
tồn tại hoặc không thuộc phạm vi của người gọi (không tiết lộ sự tồn tại của tài nguyên người khác).

## 7. Bảng phân quyền theo vai trò

Giữ nguyên tám vai trò và mười sáu quyền đã khai báo trong `src/data/roles.ts`. Máy chủ là bên duy
nhất được phép quyết định vai trò; trình duyệt chỉ đọc để dựng giao diện.

Quy tắc bắt buộc ở máy chủ:

- `class.view`, `class.assign`, `class.grade`, `class.unlock`: chỉ áp dụng cho lớp mà tài khoản đó
  là giáo viên, kiểm tra qua bảng `enrollment`.
- `user.manage`, `system.config`: chỉ vai trò `quan-tri` và chỉ trong phạm vi `org_id` của mình.
- `practice.all`, `solution.full`, `mock.exam`: kiểm tra qua `entitlement`, không qua vai trò.
  Một học sinh có vai trò cao nhưng hết hạn học phí thì vẫn bị chặn.
- Mọi thay đổi vai trò và gói học đều ghi nhật ký: ai đổi, đổi cho ai, lúc nào, lý do.

## 8. Đường đi từ hiện tại sang có máy chủ

Ứng dụng đã chuẩn bị sẵn một điểm cắm duy nhất: `src/lib/account.ts` khai báo giao diện
`AccountProvider` và hiện dùng `localAccountProvider` (lưu trên máy). Để chuyển sang máy chủ:

1. Viết `remoteAccountProvider` cài đặt cùng giao diện đó, gọi các API ở mục 6.
2. Đổi một dòng trong `src/lib/account.ts` để chọn provider theo biến môi trường.
3. Chuyển lời giải chi tiết và đề từ số 21 trở đi ra khỏi gói mã trình duyệt, lấy qua API.
4. Bật kiểm tra `entitlement` ở máy chủ.

Bước 3 là bước tốn công nhất và cũng là bước duy nhất thật sự tạo ra ranh giới trả phí. Ba bước còn
lại chỉ mất vài ngày công.

## 9. Những gì tài liệu này KHÔNG hứa

- Không có mã máy chủ trong kho này. Đây là đặc tả, không phải phần đã dựng.
- Việc chuyển nội dung trả phí ra sau API sẽ làm giảm số trang tĩnh phục vụ tìm kiếm. Cần cân nhắc
  giữ phần nội dung công khai đủ nhiều để không mất lưu lượng tìm kiếm.
- Không có phương án nào ngăn được hoàn toàn việc một học sinh đã trả phí chia sẻ lại nội dung.
  Mục tiêu thực tế là làm cho việc lách trở nên bất tiện hơn giá trị nhận được, không phải chống
  sao chép tuyệt đối.
