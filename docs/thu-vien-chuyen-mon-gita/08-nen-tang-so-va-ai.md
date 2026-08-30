# 08 · NỀN TẢNG SỐ & TRÍ TUỆ NHÂN TẠO


> 📘 **BẢN TÓM TẮT ĐIỀU HÀNH.** Tài liệu này nêu **khung và nguyên lý**.
> **BẢN TÁC NGHIỆP:** [`16-nen-tang-so-chi-tiet.md`](16-nen-tang-so-chi-tiet.md) — **Đặc tả chức năng nền tảng số** — 7 nhóm chức năng · phân quyền 13 vai trò · nguyên tắc dùng AI.
>
> Khi hai bản khác nhau, **bản tác nghiệp là bản đúng**.

> Nền tảng số không phải mục tiêu — nó là **cách duy nhất để hệ 365 chạy được ở quy mô lớn**
> mà không đánh mất chất lượng chuyên môn. Không có nền tảng, mỗi Coach chỉ theo được ~12 học viên
> và toàn bộ dữ liệu nằm trên giấy, không đối chiếu được.

---

## 1. Chín vai trò người dùng

| Vai trò | Thấy được gì | Làm được gì | Không được làm |
|---|---|---|---|
| **Học viên** | Hồ sơ của mình · nhiệm vụ hôm nay · KPI của mình · Portfolio | Ghi nhật ký · tự chấm · nộp minh chứng · đặt câu hỏi cho Coach | Xem hồ sơ học viên khác · sửa dữ liệu đã ghi ngày trước |
| **Phụ huynh** | Hồ sơ con · báo cáo theo mốc · lịch Review | Ghi nhật ký đồng hành · xác nhận thói quen · nhắn Coach | Xem **nội dung phản tư riêng tư** của con nếu con đã chọn ẩn · xem hồ sơ học viên khác |
| **Chuyên viên tư vấn** | Hồ sơ các ca được phân công · dữ liệu 4 nguồn | Dựng Bản đồ Nhận diện, Bản đồ Cơ chế · đề xuất chuyển tầng | Can thiệp hằng ngày · sửa dữ liệu gốc |
| **Người huấn luyện (Coach)** | Hồ sơ học viên phụ trách · KPI · cảnh báo | Dẫn Review · điều chỉnh lộ trình · nghiệm thu cấp | Làm thay học viên · xoá dữ liệu |
| **Giáo viên** | Lớp mình dạy · dữ liệu buổi học | Ghi nhận sau buổi · giao nhiệm vụ theo năng lực | Xem hồ sơ tâm lý |
| **Chuyên viên tham vấn (tâm lý)** | **Hồ sơ tham vấn — khu vực riêng** | Ghi chép tham vấn · gắn cờ chuyển chuyên môn | — |
| **Chuyên gia** | Ca được chuyển tới | Đánh giá chuyên sâu · khuyến nghị | — |
| **Người huấn luyện trưởng** | Toàn bộ ca của đội Coach mình | Giám sát chuyên môn · nghiệm thu · phân công | — |
| **Quản trị viên** | Cấu hình hệ thống · nhật ký truy cập | Phân quyền · sao lưu | **Không xem nội dung hồ sơ tham vấn** |

---

## 2. Mười tám trung tâm chức năng

| # | Trung tâm | Chức năng lõi |
|---|---|---|
| 1 | **Hồ sơ** | Thông tin, lịch sử, mã định danh GITA của học viên |
| 2 | **Đánh giá** | Phát và thu CC-01 → CC-06; tự động đối chiếu 4 nguồn |
| 3 | **Kết quả** | Điểm số, cấp độ năng lực, đường tiến bộ |
| 4 | **Mục tiêu** | Mục tiêu năm – tháng – tuần, trạng thái |
| 5 | **Lộ trình** | Lộ trình theo tầng, cấp, chu kỳ; cổng nghiệm thu |
| 6 | **Nhiệm vụ hôm nay** | Màn hình chính của học viên: 3 việc, không hơn |
| 7 | **Thói quen** | Chuỗi ngày, Recovery time, biểu đồ tuần |
| 8 | **Phản tư** | Nhật ký ngày; **học viên chọn chia sẻ hay giữ riêng** |
| 9 | **Huấn luyện** | Lịch Review, biên bản, ghi chú Coach |
| 10 | **Vấn đề** | Tra 220 phác đồ theo N01–N11 |
| 11 | **Giải pháp** | Phác đồ theo tầng; gợi ý đòn bẩy |
| 12 | **Minh chứng** | Kho ảnh, video, sản phẩm gắn với năng lực |
| 13 | **Báo cáo** | Sinh báo cáo theo mốc D7 / D28 / D118 / quý / D365 |
| 14 | **Hồ sơ đầu ra** | Bản đồ Nhận diện, Bản đồ Cơ chế, Portfolio |
| 15 | **Phụ huynh** | Nhật ký đồng hành, tài liệu, lịch, kênh liên lạc |
| 16 | **Chuyên gia** | Luồng chuyển chuyên môn, hồ sơ bàn giao |
| 17 | **Cảnh báo** | Vàng – cam – đỏ theo quy tắc TL 13 §8 |
| 18 | **Quản trị** | Phân quyền, nhật ký truy cập, sao lưu, lưu trữ |

---

## 3. Phân quyền theo gói dịch vụ

| Trung tâm | G1 Trải nghiệm | G2 Đánh giá | G3 Tư vấn | G4 Đồng hành | G5 Toàn diện |
|---|---|---|---|---|---|
| Hồ sơ · Đánh giá nhanh | ✔ | ✔ | ✔ | ✔ | ✔ |
| Kết quả đánh giá đầy đủ | — | ✔ | ✔ | ✔ | ✔ |
| Mục tiêu · Lộ trình | — | rút gọn | ✔ | ✔ | ✔ |
| Nhiệm vụ hôm nay · Thói quen · Phản tư | thử 7 ngày | — | ✔ | ✔ | ✔ |
| Huấn luyện (Review với Coach) | — | — | định kỳ | ✔ | ✔ |
| Vấn đề · Giải pháp (tra cứu) | — | — | ✔ | ✔ | ✔ |
| Minh chứng · Báo cáo | — | 1 báo cáo | theo mốc | đầy đủ | đầy đủ |
| Portfolio | — | — | — | ✔ | ✔ |
| Chuyên gia | — | — | — | khi cần | ✔ |

**Quy tắc mở khoá và nâng cấp:** nâng gói mở thêm chức năng ngay · hạ gói giữ nguyên dữ liệu đã có,
chỉ khoá chức năng mới · **hết hạn vẫn xem được toàn bộ hồ sơ và Portfolio của mình** — dữ liệu là của gia đình.

---

## 4. Tự động hoá — bộ máy sự kiện

Cấu trúc chuẩn: **Sự kiện → Điều kiện kích hoạt → Điều kiện kiểm tra → Hành động → Thông báo → Phân công → Cảnh báo → Chuyển cấp**

### 4.1 Mười luật tự động nên có ngay

| # | Sự kiện | Điều kiện | Hành động tự động |
|---|---|---|---|
| 1 | Nhật ký trống 3 ngày | Đang ở T3 | Cảnh báo **vàng** → thông báo Coach |
| 2 | Nhật ký trống 7 ngày | — | Cảnh báo **cam** → giao việc gọi cho Coach trong 24h |
| 3 | Nhật ký trống 14 ngày | — | Cảnh báo **đỏ** → thông báo Coach trưởng, lên lịch họp 3 bên |
| 4 | Reminder rate tăng 2 tuần liên tiếp | — | Gợi ý Coach rà lại quy mô thói quen |
| 5 | Đủ điều kiện nghiệm thu cấp | KPI đạt ngưỡng | Sinh phiếu BM-12, thông báo Coach |
| 6 | Đến mốc D7 / D28 / D118 | — | Sinh khung báo cáo, nhắc hạn bàn giao |
| 7 | Hồ sơ Bản đồ Nhận diện quá 7 ngày chưa bàn giao | — | Cảnh báo Trainer trưởng — **vi phạm cổng C6** |
| 8 | Học viên tự chấm lệch ≥ 2 bậc so với Coach | — | Gắn cờ "cần đối chiếu" trong hồ sơ |
| 9 | Gia đình vắng 2 buổi Review liên tiếp | — | Thông báo Coach, gợi ý rà cam kết |
| 10 | Xuất hiện từ khoá trong nhật ký thuộc **danh sách an toàn** | — | **Thông báo ngay chuyên viên tâm lý và Cán bộ BVTE, không tự động phản hồi học viên** |

> Luật số 10 phải được thiết kế rất cẩn thận: hệ thống **chỉ báo cho người**, tuyệt đối
> **không tự nhắn gì cho học viên** trong tình huống liên quan an toàn.

---

## 5. Trí tuệ nhân tạo — phạm vi và ranh giới

### 5.1 AI được làm gì

| Ứng dụng | Mô tả | Ai duyệt trước khi dùng |
|---|---|---|
| **Trợ lý học viên** | Nhắc nhiệm vụ, gợi ý cách chia nhỏ bài, hỏi câu hỏi phản tư | Không cần duyệt từng lần; nội dung mẫu do chuyên môn duyệt trước |
| **Trợ lý phụ huynh** | Gợi ý câu hỏi mở, nhắc nhịp đồng hành | Như trên |
| **Trợ lý Coach** | Tổng hợp dữ liệu tuần, phát hiện xu hướng, chuẩn bị khung Review | Coach |
| **Phân tích kết quả đánh giá** | Tóm tắt 4 nguồn, **chỉ ra chỗ mâu thuẫn** | Tư vấn |
| **Phát hiện khoảng cách phát triển** | So baseline và mục tiêu, nêu vùng chênh lớn | Tư vấn |
| **Khuyến nghị giải pháp** | Gợi ý phác đồ từ thư viện 220 | **Bắt buộc Coach hoặc Tư vấn duyệt** |
| **Đề xuất nhiệm vụ** | Gợi ý nhiệm vụ ngày theo lộ trình | Coach duyệt bộ nhiệm vụ đầu chu kỳ |
| **Phân tích phản tư** | Tóm tắt xu hướng cảm xúc và chủ đề lặp lại | **Chỉ hiển thị cho Coach, không cho phụ huynh** |
| **Phát hiện cảnh báo** | Nhận diện tín hiệu rủi ro sớm | **Chuyển người ngay, không tự phản hồi** |
| **Tạo báo cáo** | Sinh bản nháp báo cáo theo mốc | **Bắt buộc người đọc và sửa trước khi gửi** |
| **Đề xuất điều chỉnh lộ trình** | Gợi ý thay đổi khi KPI lệch | **Bắt buộc Coach duyệt** |

### 5.2 AI tuyệt đối không được làm

| Ranh giới | Lý do |
|---|---|
| **Không kết luận nguyên nhân** của một Case | Nguyên nhân thuộc T2, cần bằng chứng ủng hộ và phản bác — việc của con người |
| **Không quyết định chuyển tầng** | Cổng chuyển tầng là quyết định chuyên môn có chữ ký |
| **Không gửi bất kỳ nội dung nào tới học viên hoặc phụ huynh mà chưa có người duyệt** trong các tình huống: đánh giá năng lực · phản hồi về vấn đề · nội dung liên quan cảm xúc, an toàn, sức khoẻ | Rủi ro tổn thương và rủi ro sai chuyên môn |
| **Không đưa ra nhận định về sức khoẻ tâm thần** | Vượt phạm vi; phải chuyển chuyên môn |
| **Không tạo nhãn về học viên** ("kiểu người", "tính cách") | Vi phạm nguyên tắc không dán nhãn |
| **Không truy cập hồ sơ tham vấn tâm lý** | Khu vực dữ liệu nhạy cảm, phân quyền riêng |
| **Không dùng dữ liệu học viên để huấn luyện mô hình bên ngoài** | Bảo vệ dữ liệu trẻ em |

### 5.3 Bốn tầng phê duyệt

```
AI đề xuất  →  Coach xem và sửa  →  Coach trưởng duyệt (với thay đổi lộ trình lớn)  →  Chuyên gia (khi vượt phạm vi)
```

| Loại quyết định | Ai được quyết |
|---|---|
| Gợi ý nhiệm vụ ngày | AI đề xuất, Coach duyệt bộ đầu chu kỳ |
| Điều chỉnh nhỏ trong lộ trình | Coach |
| Thay đổi ưu tiên phát triển | Coach + Tư vấn |
| **Chuyển tầng** | Tư vấn + Coach, có văn bản |
| **Chuyển chuyên môn** | Coach trưởng + Giám đốc chương trình |
| Vấn đề an toàn | **Cán bộ BVTE + Giám đốc chương trình** |

### 5.4 Kiểm soát sai lệch
- **Nhật ký thay đổi:** mọi đề xuất của AI được ghi lại kèm việc người đã chấp nhận hay bác bỏ.
- **Rà soát định kỳ:** mỗi quý, chuyên môn rà 30 đề xuất ngẫu nhiên để đo tỉ lệ chính xác.
- **Ngưỡng dừng:** nếu tỉ lệ đề xuất bị bác bỏ vượt 40% ở một chức năng, **tắt chức năng đó** và hiệu chỉnh lại.

---

## 6. Dữ liệu học viên — nguyên tắc

| Nguyên tắc | Thực hành |
|---|---|
| **Thu thập tối thiểu** | Chỉ thu dữ liệu có mục đích chuyên môn rõ ràng |
| **Dùng đúng mục đích đã nêu** | Không dùng dữ liệu chuyên môn cho marketing nếu chưa có đồng ý riêng |
| **Phân quyền theo vai trò** | Xem bảng §1 |
| **Dữ liệu tham vấn tách riêng** | Khu vực riêng; quản trị viên **không** xem được nội dung |
| **Quyền của gia đình** | Xem toàn bộ hồ sơ của con · yêu cầu sửa dữ liệu sai · rút đồng ý hình ảnh · yêu cầu xuất dữ liệu |
| **Quyền riêng tư của học viên** | Học viên được chọn **giữ riêng** phần phản tư cá nhân — trừ nội dung liên quan an toàn |
| **Thời hạn lưu** | Y tế 3 năm · hồ sơ năng lực suốt hành trình + 3 năm · phiếu quan sát 2 năm · báo cáo BVTE ≥ 5 năm |
| **Sự cố dữ liệu** | Có quy trình xử lý, thông báo gia đình bị ảnh hưởng |

> **Điểm nhạy cảm cần quyết định chính sách rõ:** phụ huynh có được đọc toàn bộ nhật ký phản tư của con không?
> **Khuyến nghị:** không mặc định. Học viên từ 12 tuổi trở lên được chọn chế độ riêng tư cho phần phản tư;
> phụ huynh thấy **xu hướng và KPI**, không thấy nguyên văn. Ngoại lệ duy nhất là nội dung liên quan an toàn —
> và điều này được nói rõ với học viên ngay từ đầu, không giấu.

---

## 7. Lộ trình xây dựng nền tảng

| Giai đoạn | Phạm vi | Nguyên tắc |
|---|---|---|
| **Bước 1 — Số hoá thu dữ liệu** | Nhật ký ngày · phiếu quan sát · KPI tuần | Làm đúng ba thứ này trước. Đây là 80% giá trị |
| **Bước 2 — Hồ sơ và báo cáo** | Hồ sơ năng lực · sinh báo cáo theo mốc | Giảm mạnh thời gian dựng hồ sơ sau trại |
| **Bước 3 — Cảnh báo và tự động hoá** | 10 luật ở §4.1 | Cho phép mỗi Coach theo được nhiều học viên hơn |
| **Bước 4 — Trợ lý AI** | Theo §5, có phê duyệt của người | **Chỉ làm sau khi ba bước trên đã chạy ổn định** |

> **Sai lầm thường gặp:** làm trợ lý AI trước khi có dữ liệu sạch. AI vận hành trên dữ liệu thưa
> và không nhất quán sẽ tạo ra đề xuất nghe hợp lý nhưng sai — nguy hiểm hơn là không có AI.
