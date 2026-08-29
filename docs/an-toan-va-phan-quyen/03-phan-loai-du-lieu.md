# 03 · PHÂN LOẠI DỮ LIỆU, ĐỒNG Ý VÀ VÒNG ĐỜI

## 1. Bốn mức nhạy cảm

| Mức | Tên | Định nghĩa | Yêu cầu kỹ thuật tối thiểu |
|---|---|---|---|
| **P0** | Công khai | Công bố ra ngoài không gây hại | Không yêu cầu đặc biệt |
| **P1** | Nội bộ | Chỉ dùng trong tổ chức; rò rỉ gây thiệt hại nghiệp vụ, không gây hại cá nhân | Xác thực đăng nhập · nhật ký ghi/sửa |
| **P2** | Bảo mật | Dữ liệu cá nhân của trẻ em; rò rỉ gây hại cho cá nhân | Mã hoá khi truyền và khi lưu · phân quyền theo vai trò **và** phạm vi · **nhật ký mọi lần đọc** · không xuất hàng loạt |
| **P3** | Nhạy cảm đặc biệt | Sức khoẻ, tâm lý, bảo vệ trẻ em; rò rỉ gây hại nghiêm trọng, không đảo ngược | Tất cả yêu cầu của P2 · **mã hoá tầng ứng dụng bằng khoá riêng mà vai trò quản trị không giữ** · danh sách trắng rất hẹp · break-glass có phê duyệt · thông báo khi truy cập |

---

## 2. Bảng phân loại từng loại dữ liệu

| Loại dữ liệu | Mức | Ghi chú |
|---|---|---|
| Nội dung truyền thông, mô tả chương trình | P0 | |
| Giáo án, kịch bản, thư viện hoạt động, biểu mẫu trắng | P1 | |
| Cấu hình sản phẩm, bảng giá | P1 | |
| Họ tên, ngày sinh, lớp, trường, ảnh học viên | **P2** | Ảnh còn chịu ràng buộc đồng ý riêng (§4) |
| Phiếu tự đánh giá, phiếu phụ huynh, kết quả đánh giá | **P2** | |
| Hồ sơ năng lực, KPI, nhật ký ngày, báo cáo theo mốc | **P2** | |
| Bản đồ Nhận diện, Bản đồ Cơ chế, Portfolio | **P2** | |
| Biên bản Review, ghi chú Coach | **P2** | |
| Thông tin thanh toán, hợp đồng | **P2** | |
| **Khai báo y tế, dị ứng, thuốc đang dùng, tiền sử bệnh** | **P3** | |
| **Hồ sơ tham vấn tâm lý, ghi chép của chuyên viên tham vấn** | **P3** | |
| **Báo cáo lo ngại bảo vệ trẻ em, biên bản điều tra** | **P3** | Lưu tách kho hoàn toàn |
| **Nội dung phản tư đã gắn cờ an toàn** | **P3** | Tự động nâng mức khi cờ được bật |
| Nhật ký kiểm toán | **P2** | Chỉ ghi thêm, không sửa, không xoá |
| Thống kê tổng hợp đã ẩn danh | P1 | Xem quy tắc ẩn danh §6 |

**Quy tắc nâng mức tự động:** khi một bản ghi P2 chứa nội dung liên quan an toàn (do người gắn cờ
hoặc do hệ thống phát hiện từ khoá), bản ghi đó **tự động nâng lên P3** và mọi quyền truy cập
đang có với nó **bị thu hồi ngay**, chỉ còn danh sách trắng P3.

---

## 3. Nguyên tắc xử lý dữ liệu

| Nguyên tắc | Nội dung | Kiểm chứng thế nào |
|---|---|---|
| **Thu thập tối thiểu** | Chỉ thu dữ liệu có mục đích chuyên môn rõ ràng, đã ghi trong tài liệu | Mỗi trường dữ liệu phải chỉ ra được nó phục vụ nhóm N nào hoặc năng lực NL nào. Trường không chỉ ra được thì **xoá khỏi biểu mẫu** |
| **Đúng mục đích** | Không dùng dữ liệu chuyên môn cho marketing nếu chưa có đồng ý riêng | Rà biểu mẫu BM-04 |
| **Đặc quyền tối thiểu** | Mỗi vai trò chỉ thấy đúng phần cần cho công việc | Ma trận TL 02 |
| **Tách kho dữ liệu nhạy cảm** | P3 nằm ở kho riêng, khoá riêng, sao lưu riêng | Kiểm tra kiến trúc |
| **Ẩn danh khi có thể** | Báo cáo tổng hợp, tài liệu đào tạo, ví dụ chuyên môn đều dùng bản ẩn danh | Rà nội dung trước khi xuất bản |
| **Giữ đúng thời hạn** | Hết hạn thì xoá hoặc ẩn danh hoá, không giữ "để dành" | Tác vụ tự động rà hằng tháng |

---

## 4. Đồng ý và rút đồng ý

### 4.1 Đồng ý phải tách theo mục đích
Biểu mẫu BM-04 có **ô đồng ý riêng cho từng mục đích**, không có ô "đồng ý tất cả":
nhóm phụ huynh kín · trang chính thức · tài liệu truyền thông · tài liệu đào tạo nội bộ ·
ghi hình phục vụ đánh giá năng lực · dùng hồ sơ đã ẩn danh làm ví dụ chuyên môn.

### 4.2 Quyền rút đồng ý
| Quyền | Thời hạn thực hiện |
|---|---|
| Rút đồng ý hình ảnh cho một hoặc nhiều mục đích | **Gỡ nội dung trong 7 ngày** |
| Yêu cầu sửa dữ liệu sai | Xử lý trong 7 ngày |
| Yêu cầu xuất toàn bộ dữ liệu của con | Cung cấp trong 15 ngày, định dạng đọc được |
| Yêu cầu xoá dữ liệu | Xử lý theo §5; nêu rõ phần nào buộc phải giữ và vì sao |

**Cài đặt kỹ thuật bắt buộc:** trạng thái đồng ý là **điều kiện kiểm tra trong hàm phân quyền**
(bước 2 của thuật toán), không phải một ghi chú trong hồ sơ. Rút đồng ý phải làm thay đổi
kết quả `can()` ngay lập tức.

### 4.3 Sự đồng ý của chính học viên
Với học viên **từ 12 tuổi**, ngoài đồng ý của người giám hộ, hệ thống ghi nhận **ý kiến của học viên**
với hai nội dung: (a) chế độ riêng tư cho nhật ký phản tư, (b) việc dùng hình ảnh cá nhân
trong truyền thông. Khi hai bên khác ý, **lấy phương án bảo vệ quyền riêng tư cao hơn**.

---

## 5. Thời hạn lưu trữ

| Loại hồ sơ | Thời hạn | Sau khi hết hạn |
|---|---|---|
| Hồ sơ y tế học viên | 3 năm kể từ khi kết thúc chương trình | Xoá vĩnh viễn |
| Hồ sơ năng lực, Bản đồ Nhận diện, Bản đồ Cơ chế | Suốt hành trình + 3 năm | Ẩn danh hoá phục vụ nghiên cứu, hoặc xoá theo yêu cầu gia đình |
| Phiếu quan sát của ACT | 2 năm | Xoá |
| Nhật ký ngày, phản tư | Suốt hành trình + 1 năm | Xuất cho gia đình rồi xoá |
| Portfolio | Không giới hạn khi gia đình còn muốn giữ | Gia đình quyết định |
| Hình ảnh, video | Theo phạm vi và thời hạn đã đồng ý | Xoá khi hết hạn hoặc khi rút đồng ý |
| **Báo cáo bảo vệ trẻ em** | **Theo quy định pháp luật, tối thiểu 5 năm** | Không tự xoá; xử lý theo hướng dẫn pháp chế |
| Hồ sơ tham vấn tâm lý | Theo quy định chuyên ngành; tối thiểu 3 năm sau khi đóng ca | Theo hướng dẫn chuyên môn |
| Nhật ký kiểm toán | 5 năm | Lưu trữ nguội |
| Hợp đồng, chứng từ tài chính | Theo quy định kế toán | Theo quy định |

**Lưu giữ pháp lý (legal hold):** khi một hồ sơ liên quan tới sự việc đang được xử lý —
khiếu nại, điều tra, yêu cầu của cơ quan chức năng — hồ sơ đó bị **khoá khỏi mọi thao tác
xoá và xuất** cho tới khi lệnh giữ được gỡ. Đây là bước 3 trong thuật toán phân quyền.

---

## 6. Quy tắc ẩn danh

Ẩn danh **không phải là bỏ tên**. Một hồ sơ vẫn nhận diện được qua tổ hợp lớp, trường, giới tính,
ngày sinh và vài chi tiết đặc thù.

| Quy tắc | Nội dung |
|---|---|
| **Bỏ định danh trực tiếp** | Họ tên, ảnh, số điện thoại, địa chỉ, email, mã học viên |
| **Khái quát hoá định danh gián tiếp** | Ngày sinh → nhóm tuổi · trường lớp cụ thể → loại trường · địa bàn → tỉnh/thành |
| **Ngưỡng k ≥ 10** | Không công bố ô thống kê có dưới 10 học viên. Một ô "2 học viên lớp 6 trường X" là định danh được |
| **Loại chi tiết đặc thù** | Câu chuyện, biến cố, tình huống hiếm gặp có thể nhận ra người — phải viết lại hoặc bỏ |
| **Duyệt hai người** | Mọi tài liệu ẩn danh dùng cho đào tạo hoặc truyền thông phải qua hai người đọc độc lập |

---

## 7. Nghĩa vụ pháp lý tham chiếu

| Nội dung | Căn cứ tham chiếu |
|---|---|
| Bảo vệ dữ liệu cá nhân, dữ liệu cá nhân nhạy cảm, dữ liệu trẻ em | Nghị định 13/2023/NĐ-CP |
| Quyền bí mật đời sống riêng tư của trẻ em; nghiêm cấm công bố thông tin về đời sống riêng tư của trẻ em mà không có sự đồng ý phù hợp | Luật Trẻ em 2016; Nghị định 56/2017/NĐ-CP |
| Môi trường giáo dục an toàn, phòng chống bạo lực học đường | Nghị định 80/2017/NĐ-CP |
| Quản lý hoạt động giáo dục kỹ năng sống, hoạt động ngoài giờ chính khoá | Thông tư 04/2014/TT-BGDĐT |
| Công tác tư vấn tâm lý cho học sinh | Thông tư 31/2017/TT-BGDĐT |
| Đường dây bảo vệ trẻ em quốc gia | Tổng đài 111 |

> ⚠️ Đây là **khung đối chiếu**. Bộ phận pháp chế phải rà soát hiệu lực, sửa đổi, bổ sung của
> từng văn bản tại thời điểm áp dụng, và bổ sung quy định của địa phương nơi tổ chức hoạt động.
> Trường hợp chương trình phục vụ học viên hoặc gia đình ở nước ngoài, cần rà thêm nghĩa vụ
> của các khu vực pháp lý liên quan.
