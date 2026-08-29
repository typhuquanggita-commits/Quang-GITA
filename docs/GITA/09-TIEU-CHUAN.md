# Bộ tiêu chuẩn chất lượng HSA365

> Tiêu chuẩn chỉ có giá trị khi **kiểm chứng được**. Mỗi điều dưới đây đều kèm
> cách kiểm — bằng bài test, bằng công cụ, hoặc bằng quy trình có biên bản.

---

## 1. Chuẩn nội dung

Trong một sản phẩm giáo dục, **một câu hỏi sai đáp án gây hại hơn mọi lỗi kỹ thuật
khác**. Vì vậy các ràng buộc dưới đây được chặn ngay ở tầng test, không phụ thuộc
vào việc ai đó nhớ kiểm tra.

| # | Ràng buộc | Kiểm bằng |
|---|---|---|
| N1 | Không có mã câu hỏi trùng nhau | `tests/content.test.ts` |
| N2 | Câu trắc nghiệm có đúng 4 phương án, đáp án nằm trong số đó | tự động |
| N3 | Các phương án không trùng nội dung nhau | tự động |
| N4 | Câu điền có đáp án chuẩn hóa được và không rỗng | tự động |
| N5 | Mọi câu có lời giải dài hơn 30 ký tự — đủ để thực sự giải thích | tự động |
| N6 | Bẫy được chú thích phải trỏ tới phương án có thật và **không phải đáp án đúng** | tự động |
| N7 | Mọi câu thuộc một chuyên đề có thật và đúng phần thi | tự động |
| N8 | Mọi ngữ liệu được tham chiếu đều tồn tại | tự động |
| N9 | Mọi chuyên đề có ít nhất một câu hỏi | tự động |
| N10 | Trọng số chuyên đề cộng lại đúng bằng 1 trong mỗi nhóm | tự động |
| N11 | Thời gian mục tiêu nằm trong khoảng 30–240 giây | tự động |

**Quy trình thẩm định nội dung ba vòng** (cho câu hỏi mới):

1. **Vòng 1 — Tác giả tự kiểm.** Giải lại từ đầu không nhìn đáp án đã ghi.
2. **Vòng 2 — Thẩm định chuyên môn (P3 trở lên).** Kiểm tính đúng, độ khó khai
   báo, và chất lượng phần chú thích bẫy.
3. **Vòng 3 — Kiểm tự động.** Toàn bộ N1–N11 phải xanh trước khi hợp nhất.

Không bỏ qua vòng nào, kể cả với câu do người có kinh nghiệm nhất soạn.

---

## 2. Chuẩn sư phạm

Các nguyên tắc dưới đây không phải sở thích thiết kế — chúng là kết luận đã được
kiểm chứng rộng rãi trong nghiên cứu khoa học học tập, và HSA365 hiện thực hóa
từng nguyên tắc thành một cơ chế cụ thể.

| Nguyên tắc | Hiện thực trong sản phẩm |
|---|---|
| **Truy xuất chủ động** hiệu quả hơn đọc lại | Thói quen "Mười phút nạp, không hơn"; mọi phiếu đều là bài làm, không phải bài đọc |
| **Ôn tập ngắt quãng** giữ kiến thức lâu hơn ôn dồn | Sổ tay lỗi sai với lịch SM-2 hiệu chỉnh, trần khoảng cách theo ngày thi |
| **Xen kẽ dạng bài** tốt hơn luyện khối | Phiếu "Tổng hợp"; các chuyên đề được đan xen trong đề mô phỏng thay vì nhóm lại |
| **Khó vừa phải là khó có ích** | Chế độ thích ứng chọn câu có xác suất đúng ~0,6 — mức mang lại nhiều thông tin nhất |
| **Hiệu chuẩn nhận thức** | Khai báo mức tự tin; đối chiếu tự tin với kết quả thật |
| **Phản hồi phải nói nguyên nhân** | Mỗi câu sai kèm lý do vì sao phương án đã chọn lại sai, không chỉ đáp án đúng |
| **Mục tiêu gần quan trọng hơn mục tiêu xa** | Hệ thống mục tiêu ba tầng; "Việc của hôm nay" |

**Ràng buộc sư phạm được canh giữ bằng test:**

- Ngưỡng hoàn thành luôn thấp hơn ngưỡng thành thạo (mọi phiếu).
- Mỗi cấp của mỗi tuyến kết thúc bằng một phiếu vượt ải.
- Không phiếu nào lặp lại cùng một câu trong ba chặng.
- Điểm kinh nghiệm chỉ cộng cho lần cải thiện — chống cày lại phiếu dễ.

---

## 3. Chuẩn kỹ thuật

| # | Ràng buộc | Kiểm bằng |
|---|---|---|
| K1 | TypeScript nghiêm ngặt: `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noUnusedLocals` | `npm run typecheck` |
| K2 | Không có `any` trong mã sản phẩm | cấu hình trình biên dịch |
| K3 | Mọi quy tắc nghiệp vụ là hàm thuần trong `src/lib/` | rà mã |
| K4 | Mọi thay đổi trạng thái đi qua một reducer duy nhất | rà mã |
| K5 | Lưu trữ có đánh phiên bản kèm hàm di trú | `tests/storage.test.ts` |
| K6 | Không dùng `Math.random` cho việc sinh đề — mọi thứ tái lập được | `tests/scoring.test.ts` |
| K7 | Toàn bộ test xanh trước khi hợp nhất | `npm run verify` |

**Kiểm tra trước khi hợp nhất:** `npm run verify` chạy typecheck → toàn bộ test →
build. Ba bước, không bỏ bước nào.

---

## 4. Chuẩn khả năng truy cập

Mục tiêu: **WCAG 2.2 mức AA**. Đây cũng là mức mà khu vực công tại Hoa Kỳ tham
chiếu theo Section 508, nên nó là mốc quốc tế hợp lý cho một sản phẩm giáo dục.

| # | Ràng buộc | Hiện thực |
|---|---|---|
| A1 | Điều hướng bàn phím đầy đủ, không bẫy tiêu điểm | Hộp thoại có bẫy tiêu điểm đúng chuẩn và trả tiêu điểm về chỗ cũ khi đóng |
| A2 | Viền tiêu điểm rõ trên **cả hai** chế độ màu | `:focus-visible` với viền 2px và offset 2px |
| A3 | Liên kết bỏ qua điều hướng | Có, kiểm bằng `tests/ui.test.tsx` |
| A4 | Vùng mốc và nhãn ARIA đúng | `<nav aria-label>`, `<main id="main">`, `role="dialog"` |
| A5 | Thông báo động cho trình đọc màn hình | `aria-live` cho đồng hồ sắp hết giờ và cho thông báo nổi |
| A6 | Tôn trọng `prefers-reduced-motion` | Có, cộng thêm công tắc thủ công trong Cài đặt |
| A7 | Chỉnh cỡ chữ tới 137,5% không vỡ bố cục | Toàn bộ đơn vị theo `rem`, gốc nhân với hệ số người dùng chọn |
| A8 | Màu không bao giờ là kênh thông tin duy nhất | Mọi biểu đồ đều kèm nhãn trực tiếp và bảng số liệu |
| A9 | Bảng màu biểu đồ tách biệt với người mù màu | Đã kiểm định deutan/protan/tritan cho cả hai chế độ màu |
| A10 | Vùng bấm đủ lớn trên thiết bị cảm ứng | Tối thiểu 36×36px, các ô câu hỏi 36px |

**Cách kiểm định bảng màu biểu đồ:** ba khe phân loại được chạy qua bộ kiểm tra sáu
tiêu chí (dải độ sáng, sàn độ bão hòa, tách biệt với người mù màu, sàn thị lực
bình thường, tương phản với nền) cho từng chế độ màu riêng. Chế độ tối dùng bảng
màu **được chọn riêng**, không phải đảo ngược tự động.

---

## 5. Chuẩn hiệu năng

| Chỉ số | Ngưỡng | Cách đạt |
|---|---|---|
| Kích thước gói chính (nén gzip) | < 150 KB | Tách gói, nạp động thư viện AI |
| Thư viện AI | Chỉ tải khi dùng | `import()` động trong `src/lib/ai.ts` |
| Ghi xuống bộ nhớ cục bộ | Có trì hoãn 250ms | Tránh giật khung hình khi làm bài |
| Sinh 2.000 phiếu | Một lần duy nhất | Lazy singleton, không sinh lại mỗi lần dựng giao diện |
| Chạy ngoại tuyến | Toàn bộ vỏ ứng dụng | Service worker precache |

---

## 6. Chuẩn dữ liệu và quyền riêng tư

| # | Nguyên tắc |
|---|---|
| D1 | Dữ liệu học tập nằm trên thiết bị của người dùng, không có máy chủ |
| D2 | Xuất và nhập lại toàn bộ tiến độ bằng JSON |
| D3 | Nâng cấp ứng dụng không bao giờ làm mất tiến độ — bắt buộc có hàm di trú |
| D4 | Xóa dữ liệu phải có xác nhận rõ ràng và cảnh báo không hoàn tác |
| D5 | Tệp dữ liệu thiếu trường vẫn nạp được thay vì làm hỏng ứng dụng |
| D6 | Khóa AI do người dùng tự nhập, lưu cục bộ, và có cảnh báo bảo mật kèm theo |

> **Lưu ý pháp lý khi triển khai cho học sinh dưới 18 tuổi.** Kiến trúc mặc định
> không thu thập dữ liệu nên phần lớn nghĩa vụ không phát sinh. Nếu về sau bổ sung
> đồng bộ máy chủ, cần rà lại theo khung bảo vệ dữ liệu học sinh (ở Việt Nam là
> Nghị định về bảo vệ dữ liệu cá nhân; ở Hoa Kỳ tham chiếu FERPA và COPPA) trước
> khi phát hành.

---

## 7. Chuẩn phân quyền

| # | Ràng buộc | Kiểm bằng |
|---|---|---|
| Q1 | Quyền cộng dồn theo bậc — lên bậc không bao giờ mất quyền | `tests/permissions.test.ts` |
| Q2 | Mọi quyền bị khóa đều giải thích được cách mở | tự động |
| Q3 | Cấp độ học không mở quyền quản lý lớp hay quyền nội dung | tự động |
| Q4 | Mọi quyền khai báo cho một cấp chuyên môn đều thật sự có ở vai trò tương ứng | `tests/gita.test.ts` |
| Q5 | Kiểm soát phía client **không** được coi là ranh giới bảo mật | ghi rõ trong sản phẩm và tài liệu |

---

## 8. Chu kỳ hiệu chỉnh chương trình

Do P5 chủ trì, mỗi 6 tháng hoặc khi có dấu hiệu bất thường.

| Bước | Việc | Sản phẩm |
|---|---|---|
| 1 | Thu số liệu: tỉ lệ vượt ải theo chuyên đề, phân bố tầng hấp thu, độ phủ ngân hàng | Bảng số liệu trước |
| 2 | Đối chiếu bốn dấu hiệu chương trình đang hỏng (xem 02-CAP-DO-CHUYEN-MON) | Danh sách vấn đề |
| 3 | Đề xuất thay đổi ngưỡng, phân bổ hoặc độ khó | Đề xuất có lý do |
| 4 | Áp dụng trên một nhóm nhỏ trước | Số liệu thử nghiệm |
| 5 | Phát hành và đo lại sau 4 tuần | Bảng số liệu sau |

**Nguyên tắc:** không đổi ngưỡng dựa trên cảm nhận. Mọi thay đổi khung chương trình
phải có số liệu trước và sau.
