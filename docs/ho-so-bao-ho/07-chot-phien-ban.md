# 07 · CHỐT PHIÊN BẢN & LƯU BẰNG CHỨNG

## 1. Vì sao phải chốt phiên bản

Đăng ký quyền tác giả là đăng ký **một tác phẩm cụ thể ở một trạng thái cụ thể**. Không thể đăng ký
"bộ tài liệu đang cập nhật". Và khi có tranh chấp, câu hỏi đầu tiên luôn là:
**"Bản của anh có từ bao giờ, và chứng minh thế nào?"**

| Nếu không chốt phiên bản | Hậu quả |
|---|---|
| Tài liệu sửa liên tục, không rõ bản nào là bản chính thức | Không đăng ký được · đơn vị nhượng quyền dùng bản khác nhau |
| Không có bằng chứng ngày sáng tạo | Khi tranh chấp, khó chứng minh mình có trước |
| Không có lịch sử thay đổi | Không biết ai sửa gì, khi nào, vì sao |

---

## 2. Quy trình chốt phiên bản — bảy bước

| Bước | Việc | Ai | Kết quả |
|---|---|---|---|
| **1** | **Đóng băng nội dung** — thông báo ngày khoá, sau đó không sửa | Chủ biên | Ngày khoá đã công bố |
| **2** | **Rà chuyên môn** — nội dung đúng, không mâu thuẫn giữa các tài liệu | Hội đồng chuyên môn | Biên bản rà soát |
| **3** | **Rà pháp lý** — trích dẫn nguồn đầy đủ, đã gỡ nhóm D, không hứa vượt cam kết | Pháp chế | Biên bản rà soát |
| **4** | **Rà trình bày** — đúng chuẩn TL 06 | Biên tập | Bảng kiểm TL 06 §7 |
| **5** | **Gán số phiên bản và mã tài liệu** | Biên tập | `LB-XX-1.0` |
| **6** | **Xuất bản chốt** — PDF khoá, không sửa được, kèm mục lục và số trang liên tục | Biên tập | Tệp bản chốt |
| **7** | **Lưu bằng chứng ngày** theo §3 | Pháp chế | Hồ sơ bằng chứng |

**Quyết định chốt phiên bản do một người ký** — thường là Giám đốc chuyên môn. Ghi rõ trong
**Biên bản chốt phiên bản**: mã tài liệu · số phiên bản · ngày · người ký · danh sách thay đổi
so với phiên bản trước.

---

## 3. Lưu bằng chứng ngày sáng tạo — năm lớp

Không lớp nào là tuyệt đối; **nhiều lớp cùng lúc mới đủ thuyết phục**. Cả năm lớp đều rẻ.

| Lớp | Cách làm | Mạnh ở đâu | Yếu ở đâu |
|---|---|---|---|
| **1 · Đăng ký chính thức** | Giấy chứng nhận đăng ký quyền tác giả | **Mạnh nhất** · cơ quan nhà nước xác nhận | Tốn thời gian và phí; không làm cho mọi phiên bản |
| **2 · Lịch sử phiên bản kỹ thuật** | Kho mã nguồn có ghi nhận thời điểm từng thay đổi | Chi tiết tới từng dòng, từng ngày | Do mình quản lý — có thể bị lập luận là sửa được |
| **3 · Dấu thời gian bên thứ ba** | Gửi bản chốt qua email tới hộp thư độc lập · dịch vụ đóng dấu thời gian | Có bên thứ ba xác nhận | — |
| **4 · Công chứng bản in** | Công chứng bản in đã đóng quyển | Được thừa nhận rộng | Tốn chi phí cho tài liệu dày |
| **5 · Bằng chứng sử dụng thực tế** | Ảnh khoá trại có ngày · biểu mẫu đã ký · hợp đồng · bài đăng có mốc thời gian | Chứng minh **sử dụng thật**, quan trọng với nhãn hiệu | Rời rạc, cần thu thập có hệ thống |

> **Lớp 5 quan trọng hơn nhiều người nghĩ, đặc biệt với nhãn hiệu.** Bằng chứng sử dụng thực tế
> — hợp đồng có tên thương hiệu, ảnh biển hiệu có ngày, ấn phẩm đã phát cho phụ huynh — là thứ
> chứng minh mình **đã dùng dấu hiệu này trong kinh doanh từ khi nào**. Thu thập ngay từ bây giờ,
> lưu theo năm, đừng để tới lúc cần mới đi tìm.

### 3.1 Hồ sơ bằng chứng — cấu trúc lưu

```
ho-so-bang-chung/
├── 2025/
│   ├── tai-lieu/          bản chốt PDF từng phiên bản
│   ├── su-dung/           ảnh trại, ấn phẩm, biển hiệu — có ngày
│   ├── hop-dong/          hợp đồng có tên thương hiệu
│   └── bien-ban/          biên bản chốt phiên bản
├── 2026/
└── dang-ky/               giấy chứng nhận, tờ khai, biên nhận
```

**Lưu ở hai nơi độc lập**, một bản ngoại tuyến. Hồ sơ bằng chứng mất là mất toàn bộ lợi thế
chứng minh.

---

## 4. Sổ phiên bản — bảng theo dõi toàn hệ

| Mã | Tài liệu | Phiên bản | Ngày chốt | Người ký | Đã đăng ký | Số GCN |
|---|---|---|---|---|---|---|
| `LB-CT` | Bản mô tả chương trình chuẩn | 1.0 | | | ⬜ | |
| `LB-LB` | Chương trình Leader Boom 365 | 1.0 | | | ⬜ | |
| `LB-VH` | Quy trình vận hành trại | 1.0 | | | ⬜ | |
| `LB-TV` | Thư viện chuyên môn | 1.0 | | | ⬜ | |
| `LB-AT` | An toàn và phân quyền | 1.0 | | | ⬜ | |
| `LB-TH` | Nhận diện thương hiệu | 1.0 | | | ⬜ | |
| `LB-NQ` | Nhượng quyền | 1.0 | | | ⬜ | |
| `LB-CĐ` | Cộng đồng | 1.0 | | | ⬜ | |

---

## 5. Khi nào đăng ký lại

| Loại thay đổi | Số phiên bản | Đăng ký lại |
|---|---|---|
| Sửa lỗi chính tả, cập nhật số liệu, sửa liên kết | 1.0 → 1.1 | ❌ Không cần |
| Bổ sung một mục, làm rõ nội dung đã có | 1.1 → 1.2 | ❌ Không cần |
| **Thêm hoặc thay đổi nội dung chuyên môn đáng kể** | 1.x → **2.0** | ✅ **Nên** — là tác phẩm phái sinh |
| Viết lại toàn bộ, đổi cấu trúc | → 2.0 hoặc 3.0 | ✅ **Bắt buộc** |

> **Nguyên tắc thực dụng:** đăng ký phiên bản **1.0** cho toàn bộ, rồi **chỉ đăng ký lại khi lên
> số lớn**. Đăng ký mọi bản sửa nhỏ là lãng phí; không đăng ký bản viết lại là mất bảo hộ cho
> phần mới.

---

## 6. Nhịp chốt phiên bản

| Nhịp | Việc |
|---|---|
| **Sau mỗi mùa trại** | Rà tài liệu theo bài học thực tế · quyết định có lên phiên bản không |
| **Hằng năm** | **Chốt phiên bản chính thức** toàn bộ hệ tài liệu · cập nhật sổ §4 |
| **Trước mỗi lần chuyển giao nhượng quyền** | Xác nhận đơn vị nhận **đúng phiên bản mới nhất đã chốt** |
| **Khi có thay đổi pháp luật liên quan** | Rà và chốt lại phần bị ảnh hưởng trong 90 ngày |

> **Quy tắc với đơn vị nhượng quyền:** đơn vị **phải xác nhận bằng văn bản đã nhận và áp dụng
> phiên bản mới** khi có bản cập nhật. Không có xác nhận thì coi như đơn vị đang vận hành theo
> bản cũ — và đó là rủi ro chất lượng có thật khi có 20 đơn vị ở 20 tỉnh.

---

## 7. Liên kết

- Chuẩn trình bày: [`06-chuan-trinh-bay-tai-lieu.md`](06-chuan-trinh-bay-tai-lieu.md)
- Hồ sơ đăng ký quyền tác giả: [`03-dang-ky-quyen-tac-gia.md`](03-dang-ky-quyen-tac-gia.md)
- Lộ trình nộp đơn: [`08-lo-trinh-nop-don.md`](08-lo-trinh-nop-don.md)
- Cơ chế cập nhật chuẩn cho đơn vị nhận quyền: [`../nhuong-quyen-leader-boom/08-phap-ly-so-huu-tri-tue.md`](../nhuong-quyen-leader-boom/08-phap-ly-so-huu-tri-tue.md)
