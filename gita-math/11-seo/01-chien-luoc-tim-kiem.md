# CHIẾN LƯỢC TÌM KIẾM CỦA MATH TIỂU HỌC 365

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn
*Tư duy xuất sắc, Bản lĩnh dẫn đầu*

> Phiên bản 1.0. Tài liệu này nói **cách giành thứ hạng bằng nội dung tốt hơn**, không
> phải bằng mẹo kỹ thuật. Phần kỹ thuật đã làm xong và được máy cưỡng chế; phần khó và
> phần quyết định là ba việc ở mục 6 mà chỉ người thật làm được.

---

## 1. BA ĐIỀU PHẢI THỐNG NHẤT TRƯỚC

**1.1. Bản online hiện tại không bao giờ lên được Google.** Ba bản đang chạy trên
claude.ai là trang riêng tư, chỉ người được chia sẻ mới mở được, và nội dung do
JavaScript dựng ra sau khi tải. Không có cỗ máy tìm kiếm nào đưa được nó vào chỉ mục,
dù có làm gì đi nữa. Muốn có mặt trên Google thì **phải có website riêng trên tên miền
của mình** — đó là lý do bộ sinh `build_site.py` ra đời.

**1.2. "Top 1 cho MATH TIỂU HỌC 365" là mục tiêu dễ đạt và gần như vô giá trị.** Không
ai cạnh tranh tên riêng ấy, nên chỉ cần trang chủ được lập chỉ mục là xong. Nhưng hiện
chưa ai gõ cụm từ ấy vào ô tìm kiếm, nên đứng số 1 cũng không có ai vào. Từ khoá thương
hiệu chỉ có giá trị **sau khi** các trang khác đã kéo người vào và họ nhớ tên. Vì vậy
toàn bộ chiến lược này nhắm vào **truy vấn nhu cầu** — những câu phụ huynh và học sinh
đang thật sự gõ.

**1.3. Không hứa mốc thời gian.** Một tên miền mới thường mất vài tháng chỉ để được thu
thập đủ và được tin. Ai hứa "lên top trong 30 ngày" thì hoặc nhắm từ khoá không ai tìm,
hoặc dùng cách sẽ bị phạt. Thứ tài liệu này cam kết là **làm đúng và đủ những việc có
tác dụng**, và đo được tiến độ hằng tháng bằng số thật.

## 2. NHÌN THẲNG VÀO ĐỐI THỦ

Khảo sát trang kết quả cho các truy vấn chính của thị trường Hà Nội cho thấy một hình
mẫu lặp lại ở gần như mọi trang đang đứng đầu:

| Điều quan sát được | Nghĩa là gì với GITA |
|---|---|
| Trang xếp đầu phần lớn là **vỏ bọc quanh một tệp PDF**: vài dòng giới thiệu rồi một nút tải | Nội dung đọc được ngay trên màn hình là một khoảng trống thật, không phải chỗ tranh giành |
| Các tên miền mạnh (kho tài liệu tổng hợp) đã giữ từ khoá đầu nhiều năm, có rất nhiều liên kết trỏ về | Không vào bằng cách làm giống họ trên chính từ khoá của họ |
| Đề có nhưng **lời giải thường chỉ là đáp số**, hiếm khi có lời giải từng bước | Chỗ GITA mạnh nhất: 600 phiếu lời giải đi từ dấu hiệu đọc đề tới kết quả |
| Gần như không trang nào dạy **cách gọi tên dạng bài** khi gặp đề lạ | Khoảng trống lớn nhất. 24 sơ đồ đọc vị hiện không có đối thủ |
| Không trang nào có **lộ trình học cả năm** — vì muốn có phải có chương trình thật đứng sau | Khoảng trống thứ hai. 6 lộ trình 34 tuần không thể bị sao chép nhanh |

**Kết luận chiến lược:** không đánh trực diện vào "đề thi toán lớp 4" trong năm đầu.
Đánh vào ba chỗ đối thủ bỏ trống — **dạng bài có lời giải từng bước**, **đọc vị đề**,
**lộ trình cả năm** — rồi dùng uy tín gom được từ đó mới quay lại từ khoá đầu.

## 3. BỐN NHÓM Ý ĐỊNH VÀ THỨ TỰ ƯU TIÊN

Xếp theo **khả năng thắng**, không theo lượng tìm kiếm. Chi tiết đầy đủ ở
`04-cong-cu/data/tu_khoa.py`.

| Ưu tiên | Nhóm ý định | Người tìm là ai | Trang đích | Vì sao thắng được |
|:--:|---|---|---|---|
| 1 | **Học một dạng bài cụ thể** — "cách giải bài toán tổng hiệu lớp 4" | Học sinh đang bí, phụ huynh đang kèm con | 538 trang dạng bài | Đối thủ chỉ có đề rồi bắt tải PDF; ta có lời giải từng bước đọc được ngay |
| 1 | **Không biết đề hỏi dạng gì** — "phân biệt tổng tỉ và hiệu tỉ" | Học sinh làm được khi biết dạng, gặp đề lạ là tắc | 24 sơ đồ đọc vị | Gần như không có trang tiếng Việt nào làm nội dung này |
| 1 | **Không biết cho con học theo thứ tự nào** — "lộ trình học toán lớp 4 thi vào 6" | Phụ huynh, người quyết định chi tiền | 6 lộ trình 34 tuần | Đòi phải có chương trình thật đứng sau, không bịa được |
| 2 | **Chuẩn bị thi vào 6 trường top** | Phụ huynh lớp 4 và 5, ý định thương mại cao nhất | 7 trang theo trường | Đối thủ nói chung cho cả nước; ta nói riêng từng trường Hà Nội |
| 3 | **Tìm đề để luyện** — "đề thi toán lớp 4 học kì 1" | Phụ huynh và giáo viên | 1 200 trang phiếu và lời giải | Đông đối thủ mạnh. Vào bằng đề **có phân tích từng câu** và ghi rõ mức độ |
| 4 | **Tìm đúng tên GITA** | Người đã nghe tên | Trang chủ | Không ai cạnh tranh, nhưng chưa ai tìm. Chỉ có giá trị sau nhóm 1 và 2 |

**Quy tắc một trang một từ khoá.** Mỗi trang nhận đúng một từ khoá chính. Hai trang cùng
nhận một từ khoá là hai trang tự tranh nhau và cỗ máy thường chọn nhầm trang.
`build_site.py` báo lỗi và dừng ngay nếu điều đó xảy ra.

## 4. KIẾN TRÚC 2 003 TRANG

Đường dẫn được đọc như một mục lục: mỗi tầng là một tầng chủ đề.

```
/                                          trang chủ
/toan-lop-4/                               trụ của một lớp                     3 trang
/toan-lop-4/toan-co-loi-van/               trụ của một nhóm chuyên đề         24 trang
/toan-lop-4/toan-co-loi-van/tong-hieu/     một dạng bài  ← trang chủ lực     538 trang
/toan-lop-4/chuyen-de/c03-.../             một cụm sáu buổi                   96 trang
/phieu/gita-t1-l4-c03-nc/                  một phiếu học                     600 trang
/phieu/gita-t1-l4-c03-nc/loi-giai/         lời giải phiếu ấy                 600 trang
/on-chac/gita-t1-l4-c03/                   hướng dẫn ôn chắc                  96 trang
/doc-vi/toan-co-loi-van-lop-4/             sơ đồ đọc vị                       24 trang
/lo-trinh/tuyen-1-lop-4/                   lộ trình 34 tuần                    6 trang
/thi-vao-6/ams/                            trang cho một trường                7 trang
```

**Đường đi của uy tín trong nội bộ.** Trang chủ → trang lớp → trang nhóm → trang dạng
bài, và ngược lại mọi trang dạng bài đều trỏ về nhóm và về sơ đồ đọc vị của nhóm ấy.
Mỗi trang dạng bài còn trỏ ngang sang chín dạng bài anh em. Nhờ vậy không có trang nào
bị bỏ rơi — kiểm toán bắt buộc **không có trang mồ côi**.

**Đường đi của người đọc thành học viên.** Trang dạng bài (miễn phí, đầy đủ) → phiếu học
luyện dạng ấy (hai phần đầu mở, ba phần sau thu phí) → trang tham gia chương trình. Đây
là lý do trang dạng bài phải thật sự tốt: nó vừa là chỗ vào của người tìm kiếm, vừa là
chỗ chứng minh chất lượng.

## 5. PHẦN MIỄN PHÍ VÀ PHẦN THU PHÍ

Cho không toàn bộ thì không còn sản phẩm. Giấu hết thì không có gì để lên hạng. Ranh
giới đã chọn:

| Đọc trọn vẹn, vào chỉ mục đầy đủ | Hiện hai phần đầu, ba phần sau thu phí |
|---|---|
| 538 trang dạng bài (có ví dụ, lời giải, bảng phân tích, bài tự luyện) | 4 loại phiếu `KN` `NC` `OT` `TH` và 24 đề kiểm tra mốc |
| 24 sơ đồ đọc vị · 6 lộ trình · 96 hướng dẫn ôn chắc | 600 phiếu lời giải (hiện ba phần đầu) |
| 192 phiếu `LT` và `DB` trọn vẹn kèm lời giải | |
| Toàn bộ trang trụ, trang chuyên đề, trang thi vào 6 | |

Khoảng **900 trang miễn phí hoàn toàn** — thừa đủ để lên hạng — trong khi phần phân hoá
học sinh giỏi vẫn là sản phẩm.

**Khai báo trung thực, không che giấu.** Phần bị cắt được đánh dấu
`isAccessibleForFree: false` kèm `cssSelector` trỏ đúng vào khối bị che. Người đọc và cỗ
máy tìm kiếm **thấy đúng một thứ như nhau**. Cách làm sai — cho cỗ máy thấy toàn bộ còn
người đọc thì bị chặn — gọi là che giấu nội dung, và hình phạt là gỡ khỏi chỉ mục.

> Khi nào có máy chủ thật, có thể dùng cơ chế *lấy mẫu linh hoạt* của Google để trả nội
> dung đầy đủ cho cỗ máy mà vẫn che với người chưa trả tiền. Đó là ngoại lệ được Google
> ghi rõ, không phải lách luật. Với site tĩnh hiện nay thì chưa làm được, và cắt cho cả
> hai bên như đang làm là cách an toàn tuyệt đối.

## 6. BA VIỆC CHỈ NGƯỜI THẬT LÀM ĐƯỢC

Phần kỹ thuật đã xong và được `kiem_toan_seo.py` cưỡng chế 28 hạng mục. **Ba việc dưới
đây quyết định thành bại, và không dòng mã nào thay thế được.**

### 6.1. Đứng tên thật sau nội dung

Google đánh giá rất nặng chủ đề giáo dục trẻ em: ai viết, dựa trên gì, ai kiểm chứng.
Trang `/ve-chung-toi/` hiện đang ghi "Hội đồng chuyên môn" chung chung. **Phải thay bằng
tên thật, ảnh thật, tóm tắt chuyên môn thật của từng người**, và mỗi trang tài liệu nên
ghi người duyệt. Đây là việc có tác động lớn nhất trên mỗi giờ công bỏ ra.

Cùng nhóm việc: địa chỉ thật, số điện thoại thật, hộp thư thật ở chân trang; hồ sơ
Google Doanh nghiệp của Học viện; các trang mạng xã hội chính chủ khai trong `sameAs`.

### 6.2. Có người thật nói về mình ở nơi khác

Không có cách nào tự tạo ra uy tín trên tên miền của chính mình. Thứ tính là **trang
khác dẫn về mình**. Việc nên làm, theo thứ tự dễ trước:

- Gửi 24 sơ đồ đọc vị cho các nhóm phụ huynh và diễn đàn giáo viên tiểu học Hà Nội —
  đây là tài liệu dễ được chia sẻ nhất vì không nơi nào khác có.
- Chia sẻ 6 lộ trình 34 tuần với các trường và trung tâm đối tác.
- Bài viết của giáo viên trong hội đồng trên báo giáo dục hoặc trang chuyên môn.

Tuyệt đối **không mua liên kết**. Đó là vi phạm bị phạt nặng nhất và hình phạt rơi vào
cả tên miền chứ không riêng trang mua.

### 6.3. Thu thập đánh giá thật

Chi tiết ở `04-uy-tin-va-danh-gia.md`. Nguyên tắc: không viết thay, không giấu chê,
không đổi quà lấy khen, và **không gắn số sao vào dữ liệu gửi cho cỗ máy tìm kiếm khi
chưa có đánh giá thật** — kiểm toán cưỡng chế điều này.

## 7. ĐO BẰNG GÌ

Đo hằng tháng, bằng số, không bằng cảm giác. Ba tháng đầu **đừng nhìn thứ hạng** — nhìn
số trang được lập chỉ mục, vì chưa vào chỉ mục thì chưa có gì để xếp hạng.

| Tháng | Nhìn con số nào | Đạt là thế nào |
|:--:|---|---|
| 1 | Số trang đã vào chỉ mục (Search Console) | Trên 300 trang. Dưới mức này là có trục trặc thu thập, kiểm lại `robots.txt` và sơ đồ site |
| 2–3 | Số trang vào chỉ mục · số truy vấn có hiển thị | Trên 1 200 trang · bắt đầu có hiển thị ở truy vấn dạng bài |
| 4–6 | Số lần nhấp · vị trí trung bình theo nhóm ý định | Nhóm dạng bài và đọc vị lọt trang 1–2; nhóm đề thi chưa cần |
| 7–12 | Số nhấp từ nhóm 1 và 2 · số người điền biểu mẫu test đầu vào | Truy cập tự nhiên trở thành nguồn học viên mới thật sự |

**Chỉ số duy nhất đáng gắn với tiền:** số phụ huynh vào từ tìm kiếm rồi làm bài test đầu
vào. Thứ hạng chỉ là phương tiện.

## 8. NHỮNG VIỆC TUYỆT ĐỐI KHÔNG LÀM

Mỗi dòng dưới đây từng làm sập cả tên miền của người khác.

| Không làm | Vì sao |
|---|---|
| Mua liên kết, trao đổi liên kết hàng loạt | Vi phạm nặng nhất; phạt rơi vào cả tên miền |
| Tự viết đánh giá năm sao, hoặc mua đánh giá | Vi phạm chính sách; gỡ toàn bộ kết quả mở rộng của tên miền |
| Sinh hàng loạt trang chỉ đổi tên tỉnh hoặc tên trường | Bị coi là nội dung sinh tự động không có giá trị |
| Cho cỗ máy thấy nội dung khác với người đọc | Che giấu nội dung; gỡ khỏi chỉ mục |
| Nhồi từ khoá vào chân trang hoặc chữ ẩn | Bị phát hiện tự động từ rất lâu rồi |
| Sao chép đề và lời giải của trang khác | Vừa vi phạm bản quyền vừa không lên hạng được vì đã trùng |
| Hứa tỉ lệ đỗ, đoán điểm chuẩn, quảng cáo "đề tủ" | Sai sự thật với phụ huynh, và là rủi ro pháp lý |
