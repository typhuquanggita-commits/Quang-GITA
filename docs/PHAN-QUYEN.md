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

## Năm vai trò

| Vai trò | Số bậc | Trọng tâm |
|---|---|---|
| **Học viên** | 3 | Học. Bậc suy ra từ cấp độ: bậc 1 (cấp 1–2), bậc 2 (cấp 3–4), bậc 3 (cấp 5–6) |
| **Trợ giảng** | 2 | Theo sát một lớp, nhận xét bài làm. Bậc 2 được giao nhiệm vụ |
| **Giáo viên** | 3 | Chuyên môn của lớp. Bậc 2 duyệt lên cấp + biên soạn câu hỏi; bậc 3 duyệt chuyển giai đoạn, quản lý lớp, thẩm định nội dung |
| **Chủ nhiệm chuyên môn** | 2 | Chất lượng nội dung toàn chương trình. Bậc 2 sửa khung chương trình và phát hành |
| **Quản trị hệ thống** | 1 | Toàn quyền kỹ thuật |

## 22 quyền

| Nhóm | Quyền |
|---|---|
| **Học tập** | `learn.worksheet` `learn.mock` `learn.mockFull` `learn.review` `learn.aiTutor` `learn.analytics` `learn.skipLevel` |
| **Lớp học** | `class.view` `class.viewAll` `class.assign` `class.comment` `class.approveLevel` `class.approveStage` `class.manage` |
| **Nội dung** | `content.author` `content.review` `content.curriculum` `content.publish` |
| **Hệ thống** | `system.users` `system.roles` `system.export` `system.audit` |

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
