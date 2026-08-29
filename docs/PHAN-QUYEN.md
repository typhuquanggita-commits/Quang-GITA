# Phân quyền

## Ba tầng quyết định

```
Vai trò  →  Cấp bậc trong vai trò  →  (riêng học viên) Cấp độ học
```

1. **Vai trò** trả lời "người này làm công việc gì trong hệ thống".
2. **Cấp bậc** trả lời "ở mức trách nhiệm nào" — quyền **cộng dồn** theo bậc, nên bậc 3
   có tất cả quyền của bậc 1 và 2. Đây là bất biến được test canh giữ: *lên bậc chỉ
   thêm quyền, không bao giờ mất quyền đã có.*
3. **Cấp độ học** chỉ áp dụng cho học viên: một số tính năng mở dần theo tiến độ, để
   người học không bị đẩy vào đề khó khi nền chưa vững.

Toàn bộ câu trả lời "được hay không" đi qua một hàm duy nhất — `can(actor, permission)`
trong `src/lib/permissions.ts`. Không nơi nào trong giao diện tự suy luận bằng cách so
sánh vai trò; làm vậy sẽ tạo ra hàng chục bản sao của cùng một luật và chắc chắn bỏ sót
một chỗ khi đổi luật.

## Cổng mở theo cấp độ học viên

| Đạt cấp | Mở thêm |
|---|---|
| 3 | Thi thử theo phần, Gia sư AI |
| 5 | Đề mô phỏng full 3 phần |
| 6 | Tự nhảy cấp ở tuyến đã thành thạo |

Cấp độ học **không bao giờ** mở quyền quản lý lớp hay quyền nội dung — một học viên
cấp 6 vẫn không giao được nhiệm vụ cho người khác.

## Mười vai trò, hai họ

Vai trò chia làm hai họ. **Họ chuyên môn** đứng trực tiếp với người học; **họ vận hành**
lo hệ thống. Ranh giới giữa hai họ là ranh giới an toàn quan trọng nhất của thiết kế này.

### Họ chuyên môn

| Vai trò | Số bậc | Trọng tâm |
|---|---|---|
| **Học viên** | 3 | Học. Bậc suy ra từ cấp độ: bậc 1 (cấp 1–2), bậc 2 (cấp 3–4), bậc 3 (cấp 5–6) |
| **Trợ giảng** | 2 | Theo sát một lớp, nhận xét bài làm. Bậc 2 được giao nhiệm vụ |
| **Giáo viên** | 3 | Chuyên môn của lớp. Bậc 2 duyệt lên cấp, biên soạn câu hỏi, thiết kế thói quen; bậc 3 duyệt chuyển giai đoạn, quản lý lớp, thẩm định nội dung, dẫn buổi huấn luyện |
| **Coach GITA** | 3 | Phần con người của việc học: mục tiêu, động lực, thói quen, kỷ luật hành động. Bậc 2 kê lộ trình và giao nhiệm vụ; bậc 3 theo dõi mọi lớp và duyệt lên cấp |
| **Tư vấn** | 2 | Cửa vào hệ thống: đọc hồ sơ năng lực, đề xuất lộ trình cho người học và gia đình. Không chấm bài, không sửa nội dung |
| **Chủ nhiệm chuyên môn** | 2 | Chất lượng nội dung toàn chương trình. Bậc 2 sửa khung chương trình và phát hành |

### Họ vận hành

| Vai trò | Số bậc | Trọng tâm | Cố ý **không** có |
|---|---|---|---|
| **Admin sản phẩm** | 2 | Nội dung và khung chương trình trên môi trường thật. Bậc 2 phát hành | Tạo tài khoản, cấu hình phân quyền, chấm bài |
| **Admin hệ thống** | 2 | Tài khoản, nhật ký thao tác. Bậc 2 cấu hình ma trận phân quyền | Sửa nội dung, sửa khung chương trình, duyệt tiến độ |
| **Giám đốc điều hành** | 1 | Góc nhìn toàn tổ chức, **chỉ đọc** | Mọi quyền ghi, không trừ quyền nào |
| **Super Admin** | 1 | Toàn quyền, gồm cả thao tác nguy hiểm | — |

### Vì sao tách Admin sản phẩm và Admin hệ thống

Gộp hai vai này thành một "quản trị viên" là cách nhanh nhất để tạo ra một tài khoản mà
khi bị chiếm đoạt thì mất tất cả: kẻ chiếm được vừa tạo được tài khoản, vừa sửa được nội
dung, vừa xóa được nhật ký che dấu vết. Tách ra thì:

- **Người giữ chìa khóa không đồng thời là người chấm bài.** Admin hệ thống mở được tài
  khoản nhưng không sửa được một câu hỏi hay một điểm số nào.
- **Người sửa nội dung không tự cấp được quyền cho mình.** Admin sản phẩm phát hành được
  cả chương trình nhưng không tạo nổi một tài khoản.
- **Giám đốc điều hành nhìn thấy mọi thứ mà không ghi được gì.** Vai trò cao nhất về tổ
  chức lại là vai trò ít rủi ro nhất về dữ liệu — đây là chủ đích, không phải hạ thấp.
- **Chỉ Super Admin giữ cả hai phía**, và giữ riêng quyền `system.danger`. Vai trò này
  phải hiếm: mỗi tài khoản Super Admin là một điểm sập duy nhất.

Bốn bất biến trên đều được test canh giữ, nên không thể vô tình nới ra khi sửa mã.

## 30 quyền

| Nhóm | Quyền |
|---|---|
| **Học tập** | `learn.worksheet` `learn.mock` `learn.mockFull` `learn.review` `learn.aiTutor` `learn.analytics` `learn.skipLevel` |
| **Lớp học** | `class.view` `class.viewAll` `class.assign` `class.comment` `class.approveLevel` `class.approveStage` `class.manage` |
| **Nội dung** | `content.author` `content.review` `content.curriculum` `content.publish` |
| **Huấn luyện GITA** | `coach.session` `coach.habit` `coach.plan` |
| **Tư vấn** | `consult.profile` `consult.roadmap` |
| **Báo cáo** | `report.org` `report.quality` |
| **Hệ thống** | `system.users` `system.roles` `system.export` `system.audit` `system.danger` |

### Vai trò và bậc chuyên môn GITA

Vai trò trả lời "làm việc gì", còn bậc chuyên môn P1–P5 trong
[`docs/GITA/02-CAP-DO-CHUYEN-MON.md`](GITA/02-CAP-DO-CHUYEN-MON.md) trả lời "đủ năng lực
tới đâu". Ánh xạ:

| Bậc | Vai trò tương ứng |
|---|---|
| P1 Trợ giảng GITA | Trợ giảng |
| P2 Giáo viên GITA | Giáo viên bậc 1–2 |
| P3 Huấn luyện viên GITA | Coach mọi bậc, Giáo viên bậc 3 |
| P4 Cố vấn lộ trình | Tư vấn mọi bậc, Chủ nhiệm bậc 1 |
| P5 Kiến trúc sư chương trình | Chủ nhiệm bậc 2, Admin sản phẩm, Super Admin |

Admin hệ thống và Giám đốc điều hành **không** nằm trên trục này: họ không đứng lớp, và
xếp bừa một bậc cho họ sẽ làm thang đo năng lực mất ý nghĩa.

Danh mục đầy đủ kèm mô tả nằm trong `src/data/roles.ts`. Màn hình **Phân quyền** in ra
đúng ma trận mà mã nguồn đang dùng, nên tài liệu không thể lệch khỏi hành vi thật.

## Mọi chỗ khóa đều giải thích được cách mở

`lockReason(actor, permission)` luôn trả về một câu giải thích cụ thể: cần lên cấp mấy,
cần bậc nào, hoặc vai trò nào mới có quyền đó. Thông báo "bạn không có quyền" mà không
nói lý do là một trong những trải nghiệm gây bực bội nhất trong phần mềm — có một bài
test bảo đảm không quyền nào bị khóa mà thiếu lời giải thích.

Trên giao diện, dùng `<PermissionGate permission="...">` hoặc hook `useCan(...)`.

## Ranh giới bảo mật

> Đây là lớp kiểm soát **phía người dùng**. Nó quyết định giao diện hiện gì và chặn
> thao tác nhầm lẫn, nhưng **không phải ranh giới bảo mật**: bất kỳ ai mở công cụ nhà
> phát triển đều đổi được trạng thái cục bộ.

Khi triển khai thật, mọi quyền phải được kiểm tra **lại** trên máy chủ. Danh mục quyền
trong `src/data/roles.ts` chính là hợp đồng để máy chủ hiện thực hóa — dùng đúng các mã
quyền đó ở tầng API, và lớp client này trở thành phần trải nghiệm chứ không phải phần
phòng thủ.

Ngoài ra, khóa Gemini API do người dùng nhập được lưu trong trình duyệt của chính họ và
gọi thẳng tới Google. Cách này chỉ phù hợp khi tự dùng trên máy cá nhân; triển khai cho
nhiều người học thì phải đặt một máy chủ trung gian giữ khóa.

### Những gì lớp client này vẫn phải làm đúng

Nói "không phải ranh giới bảo mật" không có nghĩa là được phép cẩu thả. Bốn quy tắc dưới
đây được thực thi trong mã và có test canh giữ:

1. **Khóa API không bao giờ nằm trong tệp xuất.** `exportState` loại bỏ `aiApiKey` trước
   khi ghi. Tệp này hay được gửi cho giáo viên hoặc lưu trên đám mây, nên nó phải an
   toàn khi chia sẻ — và người xuất gần như chắc chắn không biết khóa nằm trong đó.
2. **Tệp nhập vào luôn bị chuẩn hóa.** `sanitizeProfile` ép vai trò về danh mục hợp lệ
   (vai trò lạ → `student`) và chặn cấp bậc trong khung của vai trò; `sanitizeSettings`
   ép mọi cài đặt về đúng kiểu và đúng miền giá trị; giai đoạn và điểm kinh nghiệm bị
   chặn trong khoảng cho phép. Một tệp hỏng không được phép làm trắng màn hình, và một
   vai trò không tồn tại sẽ khóa người dùng khỏi chính dữ liệu của họ.
3. **Đổi vai trò không để lại cấp bậc cũ.** Mọi cập nhật hồ sơ đều đi qua
   `sanitizeProfile` trong reducer, nên chuyển từ vai trò 3 bậc sang vai trò 1 bậc không
   thể giữ lại bậc 3 — đó là một kẽ hở leo thang quyền rất kín đáo.
4. **Nội dung câu hỏi được khử mã trước khi hiển thị.** Đề bài cho phép vài thẻ định
   dạng (`<b>`, `<sup>`, `<sub>`…), nên nó được khử toàn bộ HTML trước rồi mới mở lại
   đúng danh sách thẻ cho phép — không thẻ nào mang được thuộc tính.

`system.danger` dành riêng cho thao tác phá hủy ở phạm vi **hệ thống**. Nút "Xóa toàn bộ
dữ liệu" trong Cài đặt không nằm trong phạm vi đó: người học xóa dữ liệu của chính mình
trên máy mình là quyền đương nhiên, không phải đặc quyền quản trị.
