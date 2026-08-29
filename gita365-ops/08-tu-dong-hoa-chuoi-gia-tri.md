# 08 — TỰ ĐỘNG HÓA CHUỖI GIÁ TRỊ

> Mục tiêu: để **máy làm việc lặp lại, người làm việc chạm tới con người**.
> Nguyên tắc bất di bất dịch: **không tự động hóa phần tạo cảm xúc**. Tự động lời chào có thể;
> tự động lời an ủi thì không — thành viên nhận ra ngay và niềm tin mất vĩnh viễn.

## 8.1. Ba vùng tự động hóa

| Vùng | Nghĩa | Ví dụ |
|---|---|---|
| 🟩 **XANH** | Hợp lệ với chính sách nền tảng, làm ngay | Lên lịch bài trong nhóm, quy tắc Trợ lý quản trị, lọc từ khóa, tự động từ chối tài khoản đáng ngờ, chuỗi thư/tin nhắn từ hệ thống của mình, nhắc tiến độ trên web app |
| 🟨 **VÀNG** | Bán tự động — máy chuẩn bị, người bấm nút | Soạn sẵn bình luận trả lời cho người trực chọn, gợi ý danh sách người cần nhắn, tổng hợp báo cáo tuần |
| 🟥 **ĐỎ** | **Cấm tuyệt đối** | Bot tự động bình luận/thả cảm xúc, tài khoản ảo, phần mềm bên thứ ba đăng nhập tài khoản cá nhân để đăng bài/quét thành viên, mua tương tác, tự động gửi tin nhắn hàng loạt tới người lạ |

**Vùng đỏ không chỉ vi phạm điều khoản nền tảng — nó là con đường nhanh nhất để mất nhóm
(bị khóa nhóm, khóa tài khoản admin) và mất lòng tin của thành viên.**

---

## 8.2. Chuỗi tự động 1 — Cổng vào (Gate)

```
Yêu cầu tham gia
   └─► Trợ lý quản trị tự động lọc:
         ✗ tài khoản < 30 ngày tuổi           → từ chối tự động
         ✗ không trả lời đủ 3 câu hỏi          → từ chối tự động
         ✗ câu trả lời chứa từ khóa cấm        → chuyển xét thủ công
         ✗ không có bạn chung & không ảnh      → chuyển xét thủ công
         ✓ hợp lệ                              → duyệt
   └─► Câu trả lời được chép về Sheet THANH_VIEN (xuất định kỳ, gắn thẻ tự động theo câu 2)
   └─► Kích hoạt chuỗi chào mừng 7 ngày (`05.2`)
```

**Cấu hình cần bật trong công cụ quản trị nhóm:**
- Câu hỏi duyệt thành viên: 3–4 câu, bắt buộc trả lời.
- Trợ lý quản trị: từ chối tự động theo tuổi tài khoản, theo từ khóa, theo tiền sử vi phạm.
- Lọc từ khóa bài & bình luận (danh sách ở `13.5`).
- Duyệt bài đầu tiên của thành viên mới; tạm dừng đăng bài 3 ngày đầu.
- Cảnh báo xung đột & làm chậm bình luận khi bài nóng.

---

## 8.3. Chuỗi tự động 2 — Nhịp đăng (Rhythm)

| Bước | Công cụ | Ghi chú |
|---|---|---|
| Lịch 12 tuần | `data/lich-dang-bai-12-tuan.csv` | Nguồn sự thật duy nhất |
| Lên lịch bài | Chức năng **lên lịch bài đăng trong nhóm** của công cụ quản trị | Nạp trước ít nhất 2 tuần |
| Nhắc người trực | Lịch/nhắc việc tự động 15 phút trước giờ đăng | Kèm mã bài + 3 câu hỏi mồi đã soạn |
| Ghim bình luận CTA | Người trực làm thủ công trong 60 giây đầu | Không có công cụ tự động hợp lệ |
| Thu số liệu | Xuất từ Thông tin chi tiết của nhóm hằng tuần | Đổ vào `data/bang-theo-doi-kpi.csv` |

---

## 8.4. Chuỗi tự động 3 — Nuôi dưỡng ngoài nền tảng (Nurture)

Đây là nơi tự động hóa **mạnh nhất và hợp lệ nhất**, vì diễn ra trên hệ thống của chính GITA365:

```
Tạo tài khoản web app (tầng 1)
   ├─ +1 giờ   : thư/tin nhắn "việc đầu tiên cần làm" (1 việc duy nhất)
   ├─ +24 giờ  : nếu chưa mở bài 1 → nhắc bằng câu chuyện, không bằng mệnh lệnh
   ├─ +72 giờ  : nếu hoàn tất bài 1 → chúc mừng + xin 1 câu cảm nhận
   │             nếu chưa           → gửi bản rút gọn 5 phút
   ├─ +7 ngày  : gợi ý lộ trình cá nhân hóa theo mục tiêu đã chọn
   ├─ +14 ngày : mời buổi định hướng nhóm nhỏ (cửa vào tầng 2)
   ├─ +30 ngày : nếu hoàn tất ≥60% → mời ghi danh cohort tầng 2
   └─ +45 ngày : nếu im lặng → chuyển sang chuỗi đánh thức (`05.6`)
```

**Sự kiện kích hoạt nên gắn vào web app (yêu cầu kỹ thuật):**

| Sự kiện | Dữ liệu cần ghi | Hành động tự động |
|---|---|---|
| `account_created` | nguồn UTM, mục tiêu đã chọn | Bắt đầu chuỗi 72 giờ |
| `lesson_completed` | mã bài, thời điểm | Cộng điểm GITA, mở nội dung kế tiếp |
| `course_completed_t1` | ngày hoàn tất | Gắn thẻ `hoan_tat_t1`, mời định hướng |
| `orientation_attended` | có/không | Mở ghi danh cohort tầng 2 |
| `inactive_14d` | ngày cuối hoạt động | Chuyển sang chuỗi đánh thức |
| `referral_success` | người giới thiệu | Cộng 25 điểm, đưa vào bảng vinh danh |

---

## 8.5. Chuỗi tự động 4 — Vinh danh & thi đua

```
Bình luận/bài nộp nghi thức
   └─► Care ghi điểm vào Sheet (hoặc biểu mẫu chấm nhanh)
        └─► Công thức tự tính tổng điểm tuần theo Mã gia đình
             └─► Sinh bảng xếp hạng (ảnh/bảng) tự động
                  └─► Đăng bài vinh danh Chủ nhật 21:00
                       └─► Gửi tin chúc mừng cá nhân cho top 5
```

Bảng tính tự sinh bảng xếp hạng bằng công thức, người chỉ làm 2 việc: chấm điểm chuyển hóa
và viết lời vinh danh (phần cảm xúc — không tự động).

---

## 8.6. Điều tôi (trợ lý AI) có thể tự động hóa ngay trong repo này

| Việc | Trạng thái |
|---|---|
| Sinh lịch đăng 12 tuần / bất kỳ chu kỳ nào | ✅ `scripts/generate_calendar.py` |
| Sinh nội dung bài theo khuôn 6 lớp, đúng nghi thức | ✅ theo `10` |
| Soạn kịch bản bình luận, tin nhắn, kịch bản mời | ✅ theo `10` |
| Phân tích số liệu xuất từ nhóm, ra báo cáo tuần + khuyến nghị | ✅ khi có tệp xuất |
| Dựng bảng theo dõi & bảng điều khiển | ✅ |
| **Đăng bài / duyệt thành viên / trả lời bình luận trực tiếp trên Facebook** | ❌ **Chưa thể** — phiên làm việc này không có kết nối tới Facebook. Xem 8.7 |

## 8.7. Để tôi thực sự "vận hành tự động" trên 2 nhóm, cần gì

Anh là Admin nên **anh có quyền trao**, nhưng về mặt kỹ thuật cần thêm:

1. **Thực tế nền tảng**: Facebook đã đóng phần lớn giao diện lập trình cho Nhóm từ năm 2020.
   Không có cách hợp lệ để phần mềm bên thứ ba tự động đăng bài, duyệt thành viên hay trả lời
   bình luận trong nhóm. Bất kỳ công cụ nào quảng cáo làm được điều đó đều hoạt động bằng cách
   đăng nhập tài khoản cá nhân — **vi phạm điều khoản, rủi ro mất nhóm** (thuộc vùng 🟥 ĐỎ).
2. **Cách vận hành tự động hợp lệ nhất hiện nay** — mô hình **"máy soạn, người bấm"**:
   - Tôi sinh trước toàn bộ bài đăng, bình luận mồi, kịch bản chăm sóc, bảng xếp hạng theo lịch.
   - Một người trong đội (hoặc chính anh) nạp vào chức năng **lên lịch bài đăng của nhóm** —
     việc này mất khoảng 20–30 phút cho cả 2 tuần.
   - Trợ lý quản trị của Facebook tự lo phần lọc cổng vào và kiểm duyệt từ khóa 24/7.
   - Chuỗi nuôi dưỡng ngoài nền tảng (web app, thư, tin nhắn hệ thống) chạy tự động 100%.
   → Kết quả: khoảng **85% khối lượng vận hành được tự động**, phần còn lại là 30 phút vàng
     và các cuộc trò chuyện thật — vốn là phần **không nên** tự động.
3. **Nếu muốn tự động sâu hơn**, cần kết nối một trong các hạ tầng sau và cấp quyền cho tôi:
   - Trang Facebook GITA365 liên kết với nhóm (Trang thì có giao diện lập trình đầy đủ:
     đăng bài, trả lời tin nhắn, chatbot Messenger).
   - Hệ thống ngoài: web app GITA365, Zalo OA, thư điện tử, bảng tính Google.
   - Khi đó tôi vận hành được: nội dung, chuỗi nuôi dưỡng, phân loại, báo cáo — tự động thật.

> **Tóm lại**: tôi triển khai được ngay 🟩 và 🟨. Phần đăng trực tiếp lên nhóm vẫn cần một
> thao tác con người vì chính sách nền tảng, chứ không phải vì thiếu quyền của anh.
