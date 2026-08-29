# 03 · MÀU SẮC

## 1. Bảng màu chính — lấy trực tiếp từ logo đã đăng ký

Các giá trị dưới đây được **đo trực tiếp từ tệp logo gốc**, không phải ước lượng.

| Màu | Tên gọi | HEX | RGB | CMYK tham chiếu | Dùng ở đâu |
|---|---|---|---|---|---|
| ■ | **Xanh Leader** | `#0000FE` | 0, 0, 254 | 100 / 88 / 0 / 0 | Màu chủ đạo · cánh logo · nền lớn · tiêu đề |
| ■ | **Vàng Boom** | `#FCFF00` | 252, 255, 0 | 0 / 0 / 100 / 0 | Màu nhấn · sọc cánh · chi tiết nổi bật |
| ■ | **Vàng Kim Chiến Thắng** | `#C6A443` | 198, 164, 67 | 25 / 33 / 90 / 5 | Bảy ngôi sao · cúp · huy hiệu · chứng nhận |
| ■ | **Đen Bản Lĩnh** | `#000000` | 0, 0, 0 | 0 / 0 / 0 / 100 | Chữ wordmark · chữ chính |
| ■ | **Trắng** | `#FFFFFF` | 255, 255, 255 | 0 / 0 / 0 / 0 | Nền chính · khoảng thở |

**Chuyển sắc của hai chi tiết đặc biệt** — giữ nguyên khi tái tạo:

| Chi tiết | Chuyển sắc |
|---|---|
| Quả cầu đen | `#181818` → `#404040` (bóng gương ở góc trên trái) |
| Ngôi sao vàng kim | `#A08038` → `#C6A443` → `#E8D058` |

---

## 2. ⚠️ Cảnh báo kỹ thuật quan trọng về hai màu nguyên bản

Đây là phần **phải đọc trước khi đặt in bất cứ thứ gì**.

**Xanh Leader `#0000FE` và Vàng Boom `#FCFF00` là hai màu nguyên bản của không gian màn hình (RGB).**
Chúng rất mạnh trên màn hình, nhưng có ba giới hạn kỹ thuật thật:

| Vấn đề | Giải thích | Hệ quả thực tế |
|---|---|---|
| **Ngoài dải màu in** | Xanh RGB nguyên bản nằm ngoài dải màu CMYK. Máy in offset và in kỹ thuật số **không tái tạo được** | In ra sẽ thành xanh tím sẫm hơn, xỉn hơn màn hình. Đây là giới hạn vật lý, không phải lỗi nhà in |
| **Rung thị giác** | Xanh nguyên bản cạnh vàng nguyên bản ở diện tích lớn gây hiện tượng nhoè viền, mỏi mắt | Không dùng cho khối văn bản dài hoặc nền lớn cạnh nhau |
| **Vàng trên trắng không đọc được** | Tỉ lệ tương phản của `#FCFF00` trên nền trắng chỉ khoảng **1,07 : 1** — dưới xa ngưỡng tối thiểu 4,5 : 1 | **Cấm dùng vàng làm màu chữ trên nền trắng** — quy tắc TH-08 |

### 2.1 Giải pháp — không sửa logo, chỉ chuẩn hoá sản xuất

> **Nguyên tắc:** logo đã đăng ký **giữ nguyên tuyệt đối**. Việc cần làm là quy định
> **màu sản xuất tương đương** cho từng chất liệu, và một **bảng màu hỗ trợ** cho
> mọi thứ *không phải* logo.

| Chất liệu | Quy định |
|---|---|
| **Màn hình, web, mạng xã hội** | Dùng đúng `#0000FE` và `#FCFF00` |
| **In offset** | Đặt màu pha theo hệ Pantone thay vì in 4 màu — nhà in cần chốt mã Pantone gần nhất cho hai màu này và **lưu vào kho tài sản** (việc cần làm số 3, TL 02 §7) |
| **In kỹ thuật số** | Chấp nhận sai lệch; **in mẫu duyệt trước khi in số lượng lớn** |
| **Thêu đồng phục** | Chốt **mã chỉ** cụ thể một lần, dùng thống nhất toàn quốc |
| **Sơn biển hiệu** | Chốt mã sơn cụ thể, ghi vào hồ sơ nhận diện của đơn vị |

**Bảng kiểm màu bắt buộc khi có nhà cung cấp mới ở tỉnh:**
- [ ] Đã in mẫu và so với mẫu chuẩn do Học viện cấp
- [ ] Đã lưu mã màu thực tế của nhà cung cấp vào hồ sơ đơn vị
- [ ] Đã được Học viện duyệt mẫu trước khi sản xuất hàng loạt

---

## 3. Bảng màu hỗ trợ — dùng cho mọi thứ không phải logo

Bảng này giải quyết các nhu cầu mà năm màu chính không đáp ứng được: chữ dài, nền lớn,
giao diện phần mềm, biểu đồ, trạng thái.

| Màu | Tên | HEX | Dùng ở đâu |
|---|---|---|---|
| ■ | **Xanh Sâu** | `#0B1E8C` | **Màu chữ và nền lớn thay cho Xanh Leader** — đọc được, in được, giữ đúng họ màu |
| ■ | **Xanh Nhạt** | `#E8ECFB` | Nền khối, nền bảng, vùng nhấn nhẹ |
| ■ | **Than** | `#151821` | Chữ chính trên nền sáng · nền tối |
| ■ | **Xám Ghi** | `#5B6273` | Chữ phụ, chú thích |
| ■ | **Xám Nền** | `#F4F5F8` | Nền trang, nền phân vùng |
| ■ | **Đường Kẻ** | `#DDE1EA` | Đường viền, đường phân cách |

**Ba màu ngữ nghĩa** — chỉ dùng cho trạng thái, **không** dùng làm màu thương hiệu:

| Màu | Tên | HEX | Nghĩa |
|---|---|---|---|
| ■ | Xanh Đạt | `#1B6B45` | Đạt chuẩn · an toàn · hoàn thành |
| ■ | Cam Lưu Ý | `#A8641A` | Cảnh báo · cần chú ý |
| ■ | Đỏ Dừng | `#A3231B` | Không đạt · nguy hiểm · phải dừng |

---

## 4. Tỉ lệ sử dụng màu

Quy tắc **60 – 25 – 10 – 5** cho mọi ấn phẩm:

| Tỉ lệ | Màu | Vai trò |
|---|---|---|
| **60%** | Trắng hoặc Xám Nền | Khoảng thở — thương hiệu này không rối |
| **25%** | Xanh Sâu hoặc Xanh Leader | Cấu trúc, tiêu đề, khối chính |
| **10%** | Than và Xám Ghi | Chữ nội dung |
| **5%** | Vàng Boom và Vàng Kim | **Điểm nhấn — chỉ 5%** |

> **Sai lầm phổ biến nhất khi nhượng quyền:** đơn vị mới hào hứng dùng vàng và xanh khắp nơi.
> Kết quả là ấn phẩm chói, rối, và trông rẻ. **Vàng là gia vị, không phải nguyên liệu chính.**

---

## 5. Quy tắc tương phản bắt buộc

| Nền | Chữ được dùng | Chữ **cấm** dùng |
|---|---|---|
| Trắng `#FFFFFF` | Than · Xanh Sâu · Xanh Leader · Đen | ❌ **Vàng Boom** · ❌ Vàng Kim · ❌ Xám nhạt |
| Xanh Leader `#0000FE` | Trắng · Vàng Boom | ❌ Than · ❌ Xanh Sâu |
| Xanh Sâu `#0B1E8C` | Trắng · Vàng Boom | ❌ Đen |
| Than `#151821` | Trắng · Vàng Boom · Vàng Kim | ❌ Xanh Leader |
| Vàng Boom `#FCFF00` | **Chỉ** Than hoặc Đen | ❌ Trắng · ❌ Xanh Leader |

**Ngưỡng bắt buộc:** chữ nội dung ≥ **4,5 : 1** · chữ lớn từ 24px hoặc 19px đậm ≥ **3 : 1**.
Áp dụng cho mọi ấn phẩm và mọi giao diện, không có ngoại lệ.

---

## 6. Bảng màu dùng cho giao diện phần mềm

Nền tảng số của hệ thống dùng **Xanh Sâu** làm màu nhấn chính, không dùng Xanh Leader nguyên bản
(vì nó quá chói cho giao diện dùng nhiều giờ), và giữ Vàng Boom cho nhấn mạnh nhỏ.

| Vai trò | Nền sáng | Nền tối |
|---|---|---|
| Nền trang | `#F4F5F8` | `#0E1015` |
| Bề mặt thẻ | `#FFFFFF` | `#171A21` |
| Chữ chính | `#151821` | `#E9EBF0` |
| Chữ phụ | `#5B6273` | `#98A0B0` |
| Đường kẻ | `#DDE1EA` | `#262B36` |
| Màu nhấn | `#0B1E8C` | `#7B9BF0` |
| Nhấn mạnh | `#FCFF00` trên nền tối | `#FCFF00` |
