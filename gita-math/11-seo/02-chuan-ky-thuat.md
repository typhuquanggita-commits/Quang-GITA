# CHUẨN KỸ THUẬT CỦA WEBSITE

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn

> Mọi hạng mục trong tài liệu này đều được `04-cong-cu/kiem_toan_seo.py` **kiểm tự động**
> và bắt buộc đạt trước khi đưa site lên. Đây không phải danh sách khuyến nghị.

---

## 1. TÌNH TRẠNG HIỆN TẠI

```
python3 04-cong-cu/build_site.py        →  2 003 trang · 76 MB
python3 04-cong-cu/kiem_toan_seo.py     →  SẠCH LỖI · 28 hạng mục đạt
```

## 2. HAI MƯƠI TÁM HẠNG MỤC ĐANG ĐƯỢC CƯỠNG CHẾ

### 2.1. Cấu trúc từng trang (9 hạng mục)

| Kiểm gì | Ngưỡng | Vì sao ngưỡng ấy |
|---|---|---|
| Có thẻ tiêu đề | bắt buộc | Không có thì cỗ máy tự bịa một tiêu đề từ nội dung |
| Độ dài tiêu đề | ≤ 60 ký tự | Google cắt quanh 580 điểm ảnh, tiếng Việt là quãng 58–62 ký tự |
| Có thẻ mô tả | bắt buộc | Không có thì đoạn trích lấy tuỳ ý từ thân trang |
| Độ dài mô tả | 70–158 ký tự | Ngắn hơn thì phí chỗ, dài hơn thì bị cắt cụt giữa câu |
| Số thẻ `h1` | đúng một | Nhiều `h1` làm mất trọng tâm chủ đề của trang |
| Bậc tiêu đề | không nhảy cóc | `h2` rồi thẳng `h4` làm hỏng cấu trúc dàn bài |
| Địa chỉ chuẩn | trỏ đúng vào chính trang | Sai một chỗ là gộp nhầm hai trang làm một |
| Khai báo ngôn ngữ | `lang="vi"` | Quyết định trang được đưa cho người dùng vùng nào |
| Khai báo khung nhìn | bắt buộc | Không có thì trang bị đánh giá là không dùng được trên điện thoại |

Đo độ dài **trên chữ người đọc thấy**, sau khi hoàn nguyên ký tự thoát HTML: dấu `&`
viết trong mã nguồn là `&amp;` dài gấp năm lần, đo trên chuỗi thô sẽ báo lỗi giả.

**Cách tiêu đề được ghép.** Hàm `seo.ghep_tieu_de(lõi, *bổ_nghĩa, giu=…)` giữ nguyên
phần `giu` và cắt phần lõi để nhường chỗ. Nhờ vậy sáu buổi của một chuyên đề tên dài
không bị cắt về cùng một tiêu đề giống hệt nhau — lỗi này từng làm 132 nhóm trang tự
tranh nhau, và kiểm toán bắt được ngay trong lần chạy đầu tiên.

### 2.2. Trùng lặp (3 hạng mục)

Không hai trang nào được trùng **tiêu đề**, trùng **mô tả**, hay trùng **nguyên nội
dung phần thân**. Hai trang trùng là hai trang tự tranh nhau một truy vấn, và cỗ máy
thường chọn trang kém hơn.

Phần phân biệt luôn là thứ **không bao giờ bị cắt**: tên loại buổi, số lớp, và nhãn
`CLC` cho tuyến 2.

### 2.3. Liên kết nội bộ (2 hạng mục)

- **Mọi liên kết trỏ tới trang có thật.** Liên kết gãy làm cỗ máy đi vào ngõ cụt và
  phần uy tín rót vào đó mất trắng.
- **Không có trang mồ côi.** Trang không có liên kết nào trỏ vào thì gần như không có
  uy tín, dù có nằm trong sơ đồ site.

### 2.4. Dữ liệu có cấu trúc (3 hạng mục)

Mọi khối JSON-LD phải **đọc được cú pháp** — hỏng thì bị bỏ qua toàn bộ, im lặng, không
báo lỗi ở đâu cả. Mọi trang phải có khối nhận diện tổ chức; mọi trang con phải có vệt
đường dẫn.

| Kiểu dữ liệu | Dùng ở đâu | Ghi chú |
|---|---|---|
| `EducationalOrganization` | mọi trang | Gom mọi tín hiệu về một thực thể duy nhất |
| `BreadcrumbList` | mọi trang con | Hiện vệt đường dẫn ngay dưới tiêu đề trong kết quả |
| `Course` | trang lớp, trang nhóm, trang chuyên đề, lộ trình | |
| `LearningResource` | trang dạng bài, phiếu, lời giải, đọc vị, ôn chắc | Kiểu đúng nhất cho học liệu |
| `FAQPage` | trang có khối câu hỏi thường gặp | **Không hứa kết quả mở rộng**: từ tháng 8/2023 Google chỉ còn hiện dạng này cho một số ít trang cơ quan nhà nước và y tế. Vẫn đánh dấu vì giúp hiểu đúng cấu trúc trang |
| `AggregateRating` | **chưa dùng** | Chỉ gắn khi có đánh giá thật, xem mục 2.5 |

Chuỗi trong JSON-LD được thoát cả `</script` — nếu không, trình duyệt kết thúc thẻ
script ngay tại đó dù đang ở giữa một chuỗi, và toàn bộ khối hỏng.

### 2.5. Chặn số sao tự bịa

`xep_danh_gia()` chỉ trả về khối đánh giá khi có tệp `11-seo/danh-gia/danh-gia.json` với
**từ 5 lượt đánh giá thật trở lên**. Kiểm toán báo lỗi nếu tìm thấy `AggregateRating`
trên trang mà chưa có dữ liệu ấy.

Vì sao làm chặt tới mức chặn bằng mã: gắn số sao tự bịa vi phạm chính sách dữ liệu có
cấu trúc của Google, và hình phạt là **gỡ toàn bộ kết quả mở rộng của cả tên miền** —
mất nhiều hơn được rất nhiều. Ngoài ra Google không cho hiện đánh giá mà một tổ chức tự
viết về chính mình.

### 2.6. Chất lượng nội dung (2 hạng mục)

- **Không trang nào dưới 250 từ** nội dung chính. Trang mỏng kéo tụt đánh giá chất lượng
  của cả tên miền chứ không riêng trang ấy.
- **Không trang nào nhồi từ khoá.** Phép đo lấy đúng **cụm từ khoá đích của trang** —
  chính là thẻ `h1` — rồi đếm số lần cụm ấy được nhắc lại trong phần lời biên tập.

> Phép đo này đã phải làm lại hai lần, và cách nó sai là bài học đáng ghi. Bản đầu đếm
> **từ đơn** hay gặp nhất: nó báo động ở 154 trang, trong đó có trang về bài toán thời
> gian có chữ "phút" chiếm 10,6% — nhưng đó là đề bài, không phải mánh xếp hạng. Bản
> hai đếm cụm từ khoá nhưng tính cả **đề toán do bộ sinh dựng ra**: một trang về hình
> tròn tất nhiên có chữ "hình tròn" ở mọi câu. Bản đang dùng chỉ đo **phần lời người
> biên soạn viết**, sau khi loại bỏ khối ví dụ (`section.vd`) và khối thẻ điều hướng
> (`ul.the`), và đòi cả hai điều kiện: nhắc lại từ 8 lần trở lên **và** chiếm quá 2% số
> từ. Ngưỡng hiệu chỉnh trên chính kho này, nơi trung vị là 0,98% và đỉnh thật là 3,06%.
>
> Bài học chung: một phép kiểm báo động giả hàng loạt còn tệ hơn không có phép kiểm nào,
> vì nó dạy người ta bỏ qua cảnh báo.

### 2.7. Tệp kỹ thuật (5 hạng mục)

- Có `sitemap.xml` dạng chỉ mục, chia theo nhóm trang, mỗi tệp con tối đa 1 000 địa chỉ.
  Chuẩn cho phép 50 000, chia nhỏ hơn để soi được trong Search Console xem **nhóm trang
  nào đã thu thập tới đâu**.
- Mọi trang có trong sơ đồ site, và sơ đồ site không liệt kê trang không tồn tại.
- Có `robots.txt` trỏ tới sơ đồ site. **Không chặn gì cả** — không có gì cần giấu, vì
  phần thu phí đã được cắt ngay trong HTML chứ không dựa vào việc chặn cỗ máy.
- Có trang báo không tìm thấy, dẫn về sáu trang chính.
- Không trang nào bị chặn khỏi chỉ mục ngoài ý muốn.

### 2.8. Tốc độ tải (3 hạng mục)

| Kiểm gì | Ngưỡng | Kết quả đo |
|---|---|---|
| Tải tệp từ máy chủ ngoài | không được có | 0 — toàn bộ CSS nằm trong thẻ `<style>`, không phông chữ ngoài, không thư viện ngoài |
| Dung lượng một trang | ≤ 300 KB | đạt |
| Ảnh có văn bản thay thế | bắt buộc | đạt |

Đo thật bằng Chromium trên tệp cục bộ: **tải xong trong 18–48 ms**. Không có tệp ngoài
nào là cách rẻ nhất và chắc nhất để giữ ba chỉ số Core Web Vitals ở mức xanh; con số
thật trên máy chủ sẽ do đường truyền quyết định chứ không do trang.

## 3. QUY TRÌNH PHÁT HÀNH

```
python3 04-cong-cu/sinh_kho.py --ghi-de      # dựng lại kho học liệu nếu có sửa mẫu bài
python3 04-cong-cu/build_so_do.py            # 24 sơ đồ đọc vị
python3 04-cong-cu/build_lo_trinh.py         # 6 lộ trình 34 tuần
python3 04-cong-cu/validate_phieu.py --all   # kiểm định từng phiếu
python3 04-cong-cu/kiem_toan.py              # kiểm toán hệ thống — 36 hạng mục
python3 04-cong-cu/build_site.py             # dựng 2 003 trang web
python3 04-cong-cu/kiem_toan_seo.py          # kiểm toán website — 28 hạng mục
```

**Chỉ đưa lên khi cả bốn lệnh kiểm tra đều báo sạch lỗi.** Đưa lên một site có liên kết
gãy hoặc tiêu đề trùng thì phải chờ cỗ máy thu thập lại mới sửa được hậu quả, và lần thu
thập lại ấy có thể mất hàng tuần.
