# Hệ thống tài liệu GITA

Mười một tài liệu, phân theo vai trò và theo tầng. Tất cả nằm trong kho mã nguồn
nên luôn đi cùng phiên bản sản phẩm — không có chuyện tài liệu nói một đằng,
phần mềm chạy một nẻo.

| # | Tài liệu | Dành cho | Trả lời câu hỏi |
|---|---|---|---|
| 00 | [Khung mô thức GITA](00-KHUNG-GITA.md) | Mọi vai trò | GITA là gì và vì sao bốn trụ cột này? |
| 01 | [Năm tầng hấp thu](01-TANG-HAP-THU.md) | Giáo viên, coach, phụ huynh | Người học đang ở đâu và cần được phục vụ thế nào? |
| 02 | [Năm cấp chuyên môn](02-CAP-DO-CHUYEN-MON.md) | Đội ngũ chuyên môn | Tôi ở cấp nào, làm được gì, và lên cấp bằng cách nào? |
| 03 | [GITA trong gia đình](03-GITA-GIA-DINH.md) | Phụ huynh | Tôi giúp con bằng cách nào mà không gây áp lực? |
| 04 | [GITA trong trường học](04-GITA-TRUONG-HOC.md) | Giáo viên, tổ chuyên môn | Dạy 40 người ở 5 tầng khác nhau bằng cách nào? |
| 05 | [GITA ngoài xã hội](05-GITA-XA-HOI.md) | Người học trưởng thành | Áp dụng bốn trụ cột cho việc ngoài kỳ thi ra sao? |
| 06 | [Lộ trình thói quen thành công](06-THOI-QUEN.md) | Người học, phụ huynh | Cài thói quen thế nào và khôi phục ra sao khi đứt? |
| 07 | [Quy trình vận hành chuẩn](07-QUY-TRINH.md) | Đội ngũ chuyên môn | Bảy quy trình lõi chạy như thế nào? |
| 08 | [Nhận diện HSA365](08-NHAN-DIEN.md) | Mọi vai trò | Điều gì làm HSA365 khác, và chúng tôi từ chối làm gì? |
| 09 | [Bộ tiêu chuẩn chất lượng](09-TIEU-CHUAN.md) | Kiến trúc sư chương trình, kỹ thuật | Đạt chuẩn nghĩa là gì, và kiểm chứng bằng cách nào? |
| 10 | [Nhóm bạn xuất sắc](10-DOI-NHOM.md) | Người học, coach | Lập và vận hành đội học tập ra sao? |

## Nguồn sự thật

Cấu trúc mô thức — bốn trụ cột, ba nhịp, năm tầng hấp thu, năm cấp chuyên môn,
năm cấp độ hành động, mười hai thói quen, ba môi trường, giáo án đội nhóm —
được định nghĩa **một lần** trong [`src/data/gita.ts`](../../src/data/gita.ts).

- Màn hình **Mô thức GITA** (`#/gita`) in ra chính dữ liệu đó.
- Các tài liệu ở đây diễn giải chính cấu trúc đó.
- Bộ test `tests/gita.test.ts` canh giữ tính toàn vẹn của nó.

Đổi mô thức thì sửa một chỗ, ba nơi kia cập nhật theo.
