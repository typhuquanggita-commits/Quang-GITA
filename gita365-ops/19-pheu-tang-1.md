# 19 — PHỄU TẦNG 1: TỪ NGƯỜI ĐỌC THÀNH NGƯỜI THỰC HÀNH

> Đây là lỗ hổng lớn nhất của hệ thống trước bản này: bốn bộ tài nguyên chỉ để **đọc**.
> Người ta đọc xong rồi thôi, không để lại gì, và cộng đồng không biết họ là ai.
> Chương này khép vòng đó — bằng ba lớp, dùng được ngay cả khi chưa có web app.

---

## 19.1. Ba lớp của phễu — và lớp nào đang chạy được

| Lớp | Vai trò | Trạng thái hiện tại |
|---|---|---|
| **Lớp 1 · Cửa ngõ** | Trang Thư viện Gia Đình gom bốn bộ công cụ, không cần đăng ký | ✅ **Đã chạy** — [Thư viện Gia Đình](https://claude.ai/code/artifact/3799a28b-5be1-4c38-ba04-0bed78027c84) |
| **Lớp 2 · Nhận diện** | Biến người đọc ẩn danh thành một gia đình có tên trong sổ | ✅ **Đã chạy** — bộ soạn phiếu Mã gia đình, dán vào nhóm bằng bình luận |
| **Lớp 3 · Tài khoản thật** | Tài khoản trên web app GITA365, có tiến độ học, kích hoạt chuỗi nuôi dưỡng tự động | ⏳ **Chờ đường dẫn web app** — đặc tả ở `19.4` |

### Vì sao lớp 2 dùng bình luận chứ không dùng biểu mẫu

Ba lý do, và đây là lựa chọn thiết kế chứ không phải giải pháp tạm:

1. **Bình luận là tín hiệu xếp hạng.** Mỗi phiếu dán vào nhóm là một bình luận thật — đúng thứ thuật toán 2026 đếm (`15.1`). Biểu mẫu Google không tạo ra tín hiệu nào cho nhóm.
2. **Người mới lộ diện trước cả cộng đồng**, nên có người chào — đó là bước đầu của việc ở lại.
3. **Không phải xây và không phải bảo trì gì cả.** Không có kho dữ liệu để rò rỉ, không có tài khoản để quên mật khẩu.

> ⚠️ **Giới hạn kỹ thuật cần biết:** một trang artifact có thu thập dữ liệu **không chia sẻ công khai được** — nó chỉ mở cho người đã đăng nhập trong cùng tổ chức. Vì vậy trang Thư viện **cố tình không gửi gì đi đâu**: nó chỉ soạn ra đoạn văn bản trên máy người xem để họ tự dán vào nhóm. Đây là cách duy nhất vừa công khai được, vừa không đụng tới dữ liệu cá nhân.

---

## 19.2. Đường đi đầy đủ của một người

```
Đọc một bài trong nhóm
   │  bình luận ghim dẫn tới
   ▼
THƯ VIỆN GIA ĐÌNH  ── mở một bộ công cụ, dùng ngay tối nay
   │  cuối trang: "Nhận Mã gia đình để cùng thi đua"
   ▼
SOẠN PHIẾU  ── điền 6 ô, bấm Chép
   │
   ▼
DÁN PHIẾU VÀO NHÓM  ── một bình luận thật, có tên nhà và điều họ muốn cải thiện
   │  ban quản trị trả lời trong 24 giờ (SOP-05)
   ▼
ĐƯỢC CẤP MÃ GIA ĐÌNH  ── ghi vào sổ GIA_DINH, xếp bảng đấu
   │
   ▼
THAM GIA NHIỆM VỤ TUẦN  ── có điểm, có tên trên bảng vinh danh
   │
   ▼
[khi web app sẵn sàng] TẠO TÀI KHOẢN TẦNG 1  ── có tiến độ học, vào chuỗi nuôi dưỡng
```

**Điểm rơi lớn nhất nằm ở mũi tên thứ ba** — người đọc xong tài nguyên rồi đóng tab. Ba việc chống rơi:
- Nút "Nhận Mã gia đình" đặt **ngay dưới bốn bộ công cụ**, không bắt cuộn xa.
- Phiếu **soạn sẵn** — người ta chỉ bấm Chép, không phải nghĩ viết gì.
- Nút cuối cùng **mở thẳng nhóm**, không bắt tự tìm đường về.

---

## 19.3. Việc của ban quản trị khi phiếu về

Theo **SOP-05**, trong 24 giờ:

1. Trả lời **công khai** dưới bình luận đó, cấp mã ngay: *"Nhà mình nhận mã GD-HN-0143 nhé, bảng CHỒI. Từ giờ nhà mình bình luận nhiệm vụ thì ghi mã này ở dòng đầu."*
2. Ghi vào sheet `GIA_DINH` của sổ vận hành: mã · tên gọi · tỉnh · số người · tuổi con nhỏ nhất · nhiều thế hệ · ngày đăng ký.
3. Ghi điều họ muốn cải thiện vào cột `ghi_chu` — **đây là dữ liệu cá nhân hóa quý nhất**, dùng để chọn nội dung và để nhắn tin đúng chỗ đau.
4. Nhắn riêng TN4 (`04-tin-nhan.md`) giải thích bảng đấu và cách tính điểm.
5. Gắn thẻ họ trong bài chào mừng gộp của tuần.

**Tiêu chuẩn đạt:** không phiếu nào chờ quá 24 giờ · 100% được ghi vào sổ · 100% nhận tin nhắn riêng.

---

## 19.4. Đặc tả lớp 3 — khi web app GITA365 sẵn sàng

### Trang đích cần có
| Thành phần | Yêu cầu |
|---|---|
| Tiêu đề | Đúng câu người dùng đang tìm, không phải tên khóa học |
| Ba dòng đầu | Nói rõ họ nhận được gì và mất bao lâu |
| Biểu mẫu | **Tối đa 4 ô**: tên · số điện thoại hoặc email · tỉnh · điều muốn cải thiện nhất (chọn 1 trong 6) |
| Nút | "Bắt đầu bài đầu tiên" — không phải "Đăng ký" |
| Bằng chứng | Một câu chuyện thật của một gia đình, có tên và có số |
| Cam kết dữ liệu | Nhắc lại 5 điều ở `13.11` ngay cạnh nút bấm |

### Sự kiện cần ghi lại (để chuỗi nuôi dưỡng chạy được)
`account_created` · `lesson_started` · `lesson_completed` · `course_completed_t1` · `inactive_14d` · `referral_success`

### Chuỗi 72 giờ vàng sau khi tạo tài khoản
| Mốc | Nội dung | Nếu không phản hồi |
|---|---|---|
| +1 giờ | "Một việc duy nhất cần làm trước tiên" — đúng một việc, không phải danh sách | — |
| +24 giờ | Nhắc bằng **một câu chuyện**, không bằng mệnh lệnh | — |
| +72 giờ | Hoàn tất bài 1 → chúc mừng, xin một câu cảm nhận | Chưa xong → gửi bản rút gọn 5 phút |
| +7 ngày | Gợi ý lộ trình theo mục tiêu họ đã chọn | — |
| +14 ngày | Mời buổi định hướng nhóm nhỏ — cửa vào tầng 2 | — |
| +30 ngày | Hoàn tất ≥60% → mời ghi danh cohort tầng 2 | — |
| +45 ngày | Im lặng → chuyển sang chuỗi đánh thức (`05.6`) | — |

### Mã theo dõi đã gắn sẵn
Mọi bình luận ghim trong kho nội dung đều mang mã dạng:
`?utm_source=fb_group&utm_medium=g2&utm_campaign=<mã bài>`
Nhờ đó khi web app chạy, anh biết **chính xác bài nào tạo ra tài khoản** mà không cần đoán.

---

## 19.5. Đo phễu

| Cổng | Chỉ số | Ngưỡng |
|---|---|---|
| Bài đăng → mở Thư viện | Lượt bấm trên bình luận ghim | ≥ 8% người tiếp cận |
| Thư viện → dán phiếu | Số phiếu / lượt mở trang | ≥ 10% |
| Phiếu → được cấp mã | Tỉ lệ xử lý trong 24 giờ | 100% |
| Có mã → tham gia nhiệm vụ tuần đầu | | ≥ 60% |
| Có mã → tạo tài khoản tầng 1 *(khi có web app)* | | ≥ 25% |
| Tài khoản → hoàn tất bài học đầu | | ≥ 50% |

Ba cổng đầu **đo được ngay từ tuần này**. Ba cổng sau chờ web app.

---

## 19.6. Việc cần anh làm để lớp 1 và 2 chạy

1. **Bấm chia sẻ** cho năm trang: Thư viện Gia Đình và bốn bộ công cụ — mặc định chúng đang riêng tư, thành viên chưa mở được.
2. **Kiểm tra trên điện thoại** một lần: điền thử phiếu, bấm Chép, dán thử vào một bình luận nháp.
3. **Thay bình luận ghim** trong các bài: thay vì dẫn thẳng tới từng bộ công cụ, dẫn tới **Thư viện Gia Đình** — như vậy mỗi bài đều đưa người ta vào cùng một cửa, và cửa đó có bước tiếp theo.
4. Khi có đường dẫn web app: báo tôi, tôi thay toàn bộ mã theo dõi và viết trang đích theo đặc tả `19.4`.
