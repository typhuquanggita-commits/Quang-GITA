# ĐƯA WEBSITE LÊN TÊN MIỀN THẬT

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn

> Bộ sinh đã dựng xong 2 003 trang trong `11-seo/site/`. Tài liệu này là các bước đưa
> chúng lên mạng và báo cho Google biết. Không bước nào cần lập trình thêm.

---

## 1. CHỌN TÊN MIỀN — QUYẾT ĐỊNH ĐẦU TIÊN VÀ KHÓ ĐẢO NGƯỢC NHẤT

Bộ sinh đang đặt `TEN_MIEN = "https://mathtieuhoc365.vn"` trong `04-cong-cu/lap/seo.py`.
Đổi một dòng ấy rồi dựng lại là xong về mặt kỹ thuật — nhưng lựa chọn thì không đảo
ngược được sau khi đã có thứ hạng.

| Phương án | Được gì | Mất gì |
|---|---|---|
| **`gita.edu.vn/math-tieu-hoc/`** — thư mục con của tên miền đang có | Thừa hưởng toàn bộ uy tín tên miền đã tích luỹ; lên hạng nhanh hơn hẳn | Tên thương hiệu con không nằm trong tên miền |
| `mathtieuhoc365.vn` — tên miền riêng | Tên thương hiệu nằm ngay trong địa chỉ | **Bắt đầu từ số không.** Vài tháng chỉ để được thu thập và được tin |
| `math.gita.edu.vn` — tên miền phụ | Nhìn có vẻ dung hoà | Thực tế Google xử lý gần như tên miền riêng. Nhận cái dở của cả hai |

**Khuyến nghị: dùng thư mục con của `gita.edu.vn`.** Uy tín tên miền là tài sản khó
kiếm nhất trong tìm kiếm; tự nguyện bỏ nó để lấy một cái tên đẹp là cái giá đắt. Tên
"MATH TIỂU HỌC 365" vẫn hiện đầy đủ trên trang, trong tiêu đề và trong nhận diện — chỗ
người ta thật sự đọc.

Chọn xong thì sửa `TEN_MIEN`, chạy lại `build_site.py` và `kiem_toan_seo.py`.

## 2. ĐƯA LÊN MÁY CHỦ

Site là **HTML tĩnh thuần**: không cơ sở dữ liệu, không mã chạy phía máy chủ. Chép cả
thư mục `11-seo/site/` lên là chạy.

Cấu hình máy chủ cần đúng bốn điều, và cả bốn đều ảnh hưởng trực tiếp tới thứ hạng:

| Cần gì | Vì sao |
|---|---|
| **HTTPS**, và `http://` chuyển vĩnh viễn (301) sang `https://` | HTTPS là một yếu tố xếp hạng đã công bố; hai bản cùng tồn tại là tự chia đôi tín hiệu |
| **Một dạng địa chỉ duy nhất**: chọn có `www` hoặc không, dạng kia chuyển 301 về | Hai dạng cùng phục vụ là hai bản sao của cả site |
| **Đường dẫn kết thúc bằng `/`** trả về `index.html` của thư mục | Kiến trúc đường dẫn dựa hoàn toàn vào điều này |
| **Trang không tồn tại trả mã 404** và hiện `404.html` | Trả mã 200 cho trang trống là lỗi nặng: cỗ máy lập chỉ mục hàng loạt trang rỗng |

Thêm hai điều nên có: nén `gzip` hoặc `brotli` cho HTML, và đặt máy chủ hoặc mạng phân
phối có điểm phục vụ tại Việt Nam — người dùng ở Hà Nội mà máy chủ ở nước ngoài thì mất
vài trăm mili giây mỗi lần tải, và đó là chỉ số Core Web Vitals bị trừ điểm.

## 3. BÁO CHO GOOGLE

Theo đúng thứ tự này, làm ngay trong ngày đưa site lên:

1. **Tạo tài khoản Google Search Console** và xác minh quyền sở hữu tên miền. Đây là
   nơi duy nhất cho biết Google thật sự thấy gì — mọi con số khác đều là suy đoán.
2. **Nộp `sitemap.xml`.** Đợi 24–48 giờ rồi xem mục Trang: bao nhiêu đã vào chỉ mục,
   bao nhiêu bị loại và vì lý do gì.
3. **Kiểm tra trực tiếp năm địa chỉ** bằng công cụ Kiểm tra URL: trang chủ, một trang
   lớp, một trang dạng bài, một sơ đồ đọc vị, một lộ trình. Xem đúng HTML mà Google
   nhận được — nếu thiếu chữ thì máy chủ đang cấu hình sai.
4. **Tạo hồ sơ Google Doanh nghiệp** cho Học viện, với địa chỉ và số điện thoại trùng
   khớp từng ký tự với thông tin ở chân trang website.
5. **Kiểm tra dữ liệu có cấu trúc** bằng công cụ Kiểm tra kết quả nhiều định dạng của
   Google cho ba loại trang khác nhau.

Không cần và không nên dùng dịch vụ "gửi tên miền lên hàng trăm cỗ máy tìm kiếm". Nộp
sơ đồ site một lần là đủ.

## 4. HAI VIỆC PHẢI LÀM TRƯỚC KHI MỞ CÔNG KHAI

Ba chỗ trong site đang có ô ghi rõ **phần cần bổ sung**. Chúng hiện trên trang, cố ý,
để không ai quên. Mở công khai mà chưa điền là tự bỏ đi phần lớn tác dụng của cả hệ
thống — với chủ đề giáo dục trẻ em, Google đánh giá rất nặng việc *có người thật đứng
tên*.

| Trang | Phải thay bằng |
|---|---|
| `/ve-chung-toi/` | Tên thật, ảnh thật, tóm tắt chuyên môn thật của từng thành viên Hội đồng chuyên môn. Địa chỉ, số điện thoại, hộp thư thật |
| `/dang-ky/` | Học phí, lịch khai giảng, địa điểm, thông tin liên hệ |

Cùng lúc, sửa `sameAs` trong `seo.to_chuc()` để khai các trang mạng xã hội chính chủ, và
thay tệp `/anh/logo-gita.png` cùng `/anh/chia-se.png` bằng ảnh thật (ảnh chia sẻ nên
1200×630 điểm ảnh).

## 5. NHỊP VẬN HÀNH SAU KHI MỞ

| Bao lâu một lần | Làm gì |
|---|---|
| Hằng tuần | Xem mục Trang trong Search Console: có trang nào mới bị loại khỏi chỉ mục không, vì lý do gì |
| Hằng tháng | Ghi lại bốn con số ở mục 7 của `01-chien-luoc-tim-kiem.md`. Xem truy vấn nào đang có hiển thị mà chưa có nhấp — đó là chỗ tiêu đề và mô tả cần viết lại |
| Sau mỗi vòng duyệt học liệu | Chạy lại toàn bộ quy trình phát hành ở `02-chuan-ky-thuat.md` mục 3 |
| Sau mỗi cổng kiểm tra của lộ trình | Thu thập đánh giá theo `04-uy-tin-va-danh-gia.md` |

**Đừng sửa nội dung liên tục để "tối ưu".** Mỗi lần đổi lớn, cỗ máy phải đánh giá lại
trang và thứ hạng dao động vài tuần. Hạt giống ngẫu nhiên của bộ sinh đã được chốt theo
tên dạng bài đúng vì lý do này: dựng lại bao nhiêu lần cũng ra đúng nội dung ấy, nên
chạy lại quy trình phát hành không hề làm xáo trộn thứ hạng.

## 6. NẾU SAU BA THÁNG VẪN KHÔNG CÓ GÌ

Kiểm theo đúng thứ tự này, dừng ở chỗ đầu tiên thấy sai:

1. **Search Console báo bao nhiêu trang đã vào chỉ mục?** Dưới 300 là trục trặc thu
   thập, không phải trục trặc nội dung. Kiểm `robots.txt`, kiểm mã trạng thái máy chủ,
   kiểm xem có thẻ `noindex` sót lại không.
2. **Trang đã vào chỉ mục nhưng không có hiển thị nào?** Từ khoá đang nhắm quá cạnh
   tranh. Lùi về truy vấn dài hơn và cụ thể hơn trong nhóm dạng bài.
3. **Có hiển thị nhưng không ai nhấp?** Vấn đề ở tiêu đề và mô tả, không ở nội dung.
   Viết lại cho đúng câu người ta gõ.
4. **Có nhấp nhưng người ta thoát ngay?** Trang không trả lời đúng câu họ hỏi. Đọc lại
   truy vấn dẫn họ tới và sửa phần mở đầu của trang.
5. **Mọi thứ trên đều ổn mà vẫn không lên?** Lúc này mới là vấn đề uy tín tên miền — tức
   là mục 6.2 của `01-chien-luoc-tim-kiem.md` chưa được làm. Không có cách kỹ thuật nào
   thay thế được việc có người thật dẫn về mình.
