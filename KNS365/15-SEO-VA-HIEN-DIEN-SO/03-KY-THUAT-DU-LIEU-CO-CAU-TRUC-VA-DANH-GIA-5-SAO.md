# KỸ THUẬT · DỮ LIỆU CÓ CẤU TRÚC · HỆ ĐÁNH GIÁ 5 SAO
### Checklist kỹ thuật · JSON-LD dùng được ngay · quy trình sản xuất nội dung · cách có đánh giá 5 sao tử tế

---

## PHẦN A. CHECKLIST KỸ THUẬT

### A1. Bắt buộc — không có thì mọi nỗ lực nội dung đều lãng phí

| ✅ | Hạng mục | Chuẩn |
|:--:|---|---|
| ☐ | **HTTPS** toàn site, không có nội dung lẫn HTTP | |
| ☐ | **Tốc độ tải** — Core Web Vitals đạt ngưỡng "Good" | LCP ≤2,5s · INP ≤200ms · CLS ≤0,1 |
| ☐ | **Ưu tiên di động** | ≥70% phụ huynh Việt tìm kiếm bằng điện thoại |
| ☐ | **URL sạch, tiếng Việt không dấu** | `/ky-nang-song/con-nhut-nhat/` — không dùng `?id=123` |
| ☐ | **Một trang = một chủ đề**; không hai trang tranh cùng từ khoá | Chống tự cạnh tranh |
| ☐ | **Thẻ canonical** trên mọi trang | |
| ☐ | **Sitemap.xml + robots.txt** đúng, đã gửi Search Console | |
| ☐ | **Google Search Console + Analytics** cài từ ngày đầu | Không đo thì không cải tiến được |
| ☐ | **Ảnh nén WebP, có `alt` mô tả thật** | `alt` cũng là chỗ mô tả cho người khiếm thị |
| ☐ | **Không popup che nội dung** khi vừa vào trang | Bị phạt trên di động |
| ☐ | **Breadcrumb** trên mọi trang con | |
| ☐ | **Trang 404 hữu ích** — gợi ý nội dung liên quan | |
| ☐ | **Tệp tải về có trang giới thiệu riêng** *(không link thẳng PDF)* | Trang mới xếp hạng được, PDF thì không |

### A2. Riêng cho nội dung KNS365

| ✅ | Hạng mục |
|:--:|---|
| ☐ | **Chân trang mọi bài liên quan trẻ em có hộp hotline 111** |
| ☐ | **Trang chính sách bảo vệ dữ liệu trẻ em** liên kết từ chân site *(trích phân hệ 11)* |
| ☐ | **Mọi bài có tác giả liên kết tới trang tiểu sử** |
| ☐ | **Bài YMYL có dòng người thẩm định + ngày** |
| ☐ | **Ngày cập nhật hiển thị**, không giả mạo bằng cách sửa ngày mà không sửa nội dung |
| ☐ | **Không có ảnh nhận diện học sinh** nếu chưa có phiếu đồng ý đúng mục đích |

---

## PHẦN B. DỮ LIỆU CÓ CẤU TRÚC *(JSON-LD)*

> Dán vào `<head>` từng loại trang. **Chỉ khai báo thứ thật sự hiển thị trên trang** — khai sai bị coi là spam.

### B1. Tổ chức — đặt ở trang chủ

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Học viện GITA",
  "alternateName": ["KNSGITA", "Học viện Gen Việt"],
  "url": "https://<tên-miền>/",
  "logo": "https://<tên-miền>/logo-gita.png",
  "description": "Học viện đào tạo kỹ năng sống theo mô thức huấn luyện GITA, chương trình KNS365 cho học sinh lớp 1 đến lớp 12.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<số nhà, đường>",
    "addressLocality": "<Quận>",
    "addressRegion": "Hà Nội",
    "postalCode": "<mã>",
    "addressCountry": "VN"
  },
  "telephone": "+84-<số>",
  "email": "<email>",
  "sameAs": [
    "https://www.facebook.com/<trang>",
    "https://www.youtube.com/@<kênh>"
  ]
}
```

### B2. Khoá học — đặt ở trang chương trình

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "KNS365 – Chương trình Kỹ năng sống lớp 1",
  "description": "24 chuyên đề, mỗi chuyên đề 2 buổi x 180 phút, hấp thụ 50 chủ đề kỹ năng sống theo 5 nhóm năng lực.",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Học viện GITA",
    "sameAs": "https://<tên-miền>/"
  },
  "educationalLevel": "Lớp 1",
  "teaches": [
    "Giới thiệu bản thân trước đám đông",
    "Nhận diện và điều tiết cảm xúc",
    "Phòng tránh xâm hại và bắt cóc",
    "Hợp tác và chia sẻ"
  ],
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "onsite",
    "courseWorkload": "PT6H",
    "location": {
      "@type": "Place",
      "name": "<Tên cơ sở>",
      "address": "<địa chỉ>"
    }
  }
}
```

### B3. Tác giả — đặt ở trang tiểu sử ⭐ *tín hiệu E-E-A-T mạnh*

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "<Họ tên huấn luyện viên>",
  "jobTitle": "Huấn luyện viên GITA bậc <n>",
  "worksFor": {
    "@type": "EducationalOrganization",
    "name": "Học viện GITA"
  },
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "Chứng nhận Huấn luyện viên GITA",
    "recognizedBy": { "@type": "Organization", "name": "Học viện GITA" }
  },
  "knowsAbout": [
    "Giáo dục kỹ năng sống",
    "Tâm lý học đường",
    "Bảo vệ trẻ em"
  ],
  "url": "https://<tên-miền>/doi-ngu/<slug>/"
}
```

### B4. Bài viết chuyên môn — kèm người thẩm định *(bắt buộc với YMYL)*

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Con nhút nhát không dám phát biểu: 4 vòng luyện và cách đo tiến bộ",
  "datePublished": "2026-09-01",
  "dateModified": "2026-09-01",
  "author": {
    "@type": "Person",
    "name": "<Tác giả>",
    "url": "https://<tên-miền>/doi-ngu/<slug>/"
  },
  "reviewedBy": {
    "@type": "Person",
    "name": "<Người thẩm định>",
    "jobTitle": "Thạc sĩ Tâm lý học đường"
  },
  "publisher": {
    "@type": "EducationalOrganization",
    "name": "Học viện GITA",
    "logo": { "@type": "ImageObject", "url": "https://<tên-miền>/logo-gita.png" }
  }
}
```

### B5. Câu hỏi thường gặp — đặt cuối bài giải quyết vấn đề

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Con nhút nhát có phải là tính cách không thay đổi được không?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Nhút nhát là điểm xuất phát, không phải kết luận. Điều đo được là thời gian từ lúc trẻ được mời đến lúc nói được câu đầu tiên. Con số này giảm khi trẻ được luyện nhiều vòng và nhận phản hồi cụ thể."
    }
  }]
}
```

### B6. Hướng dẫn từng bước — đặt ở bài quy trình

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cách giúp con giữ một thói quen trong 21 ngày",
  "totalTime": "P21D",
  "step": [
    { "@type": "HowToStep", "name": "Chọn thói quen nhỏ", "text": "Chọn việc làm được trong dưới 5 phút." },
    { "@type": "HowToStep", "name": "Gắn vào một neo có sẵn", "text": "Gắn ngay sau một việc con đã làm đều mỗi ngày." },
    { "@type": "HowToStep", "name": "Dán bảng chuỗi ngày", "text": "Dán nơi cả nhà nhìn thấy; con tự tô ô mỗi ngày." },
    { "@type": "HowToStep", "name": "Nối lại khi đứt", "text": "Đứt thì nối lại trong vòng 2 ngày, không bắt đầu lại từ đầu." }
  ]
}
```

> ⚠️ **Về `Review` và `AggregateRating`:** chỉ khai báo khi có **đánh giá thật, hiển thị công khai trên trang**. **Không bao giờ khai số sao không có thật** — bị phạt thủ công và mất toàn bộ kết quả nổi bật.

---

## PHẦN C. QUY TRÌNH SẢN XUẤT NỘI DUNG — 7 BƯỚC

| Bước | Việc | Ai | Đầu ra |
|:--:|---|---|---|
| **1** | **Chọn truy vấn thật** — xác nhận bằng công cụ, xem 10 kết quả đang đứng đầu | Marketing | Phiếu brief có ảnh chụp trang kết quả |
| **2** | **Trả lời câu hỏi: bài này có gì mà 10 kết quả kia không có?** | Marketing + HLV | ⚠️ **Không trả lời được thì không viết** |
| **3** | **Rút tài sản nội bộ** — rubric, số liệu, quy trình, trích lời HLV | HLV | Trích dẫn có mã tài liệu nguồn |
| **4** | **Viết** theo 7 nguyên tắc giọng thương hiệu | Người viết | Bản thảo |
| **5** | **Thẩm định chuyên môn** | HLV bậc cao · **YMYL: vai TV / cán bộ tâm lý** | Chữ ký + ngày |
| **6** | **Kiểm tra tuân thủ** — ảnh có phiếu đồng ý? có hotline 111? không hứa tuyệt đối? không so sánh đối thủ? | QLHV | Checklist ký |
| **7** | **Đăng + gắn JSON-LD + liên kết nội bộ + gửi Search Console** | Kỹ thuật | Bản đăng |

> 🔴 **Bước 2 và bước 5 không được bỏ qua trong bất kỳ hoàn cảnh nào.** Bỏ bước 2 tạo ra nội dung vô giá trị; bỏ bước 5 tạo ra rủi ro thật cho trẻ em.

---

## PHẦN D. HỆ ĐÁNH GIÁ **5 SAO** — CÓ MỘT CÁCH DUY NHẤT

> **Đánh giá 5 sao không mua được, không bịa được, và không xin bừa mà có.**
> Nó là **hệ quả tự nhiên của phân hệ 13** — 12 khoảnh khắc WOW đã thiết kế. Không có trải nghiệm thật thì mọi kỹ thuật xin đánh giá đều vô nghĩa.

### D1. Ba nơi đánh giá cần kiểm soát

| Nơi | Vì sao quan trọng | Việc phải làm |
|---|---|---|
| **Google Business Profile** | Hiện ngay bên phải kết quả tìm kiếm địa phương — **quan trọng nhất** | Xác minh · điền đủ · cập nhật ảnh & bài đăng hằng tuần · **trả lời 100% đánh giá** |
| **Facebook / mạng xã hội** | Phụ huynh kiểm tra chéo trước khi quyết định | Bật đánh giá · trả lời công khai |
| **Trang chứng thực trên web** | Do mình kiểm soát, gắn được `Review` schema | Có tên thật, có xác nhận của gia đình |

### D2. Xin đánh giá đúng lúc — **dùng WOW làm cửa**

| Thời điểm | Vì sao đúng lúc | Cách nói |
|---|---|---|
| **Ngay sau Lễ Công Nhận Cấp Độ** ⭐ | Phụ huynh vừa trao Pin cho con, cảm xúc cao nhất | *"Nếu anh/chị thấy con thay đổi thật, em xin phép nhờ anh/chị **kể lại đúng điều mình thấy** — kể cả phần chưa tốt."* |
| **Sau khi nhận video SHOWCASE của con** | Vừa thấy con đứng nói | Nhắn kèm liên kết đánh giá |
| **Sau Phiên Nhìn Lại cuối năm** *(WOW #12)* | Vừa xem bằng chứng 9 tháng | Đây là lúc đánh giá chân thật và chi tiết nhất |
| **Sau Ngày Hội Tác Động** | Vừa thấy con bảo vệ dự án | |

### D3. Bốn quy tắc tử tế — **không thương lượng**

| # | Quy tắc |
|:--:|---|
| **1** | **Không tặng quà, giảm phí hay ưu đãi để đổi lấy đánh giá.** Vi phạm chính sách nền tảng và biến lời khen thành giao dịch |
| **2** | **Không chỉ xin đánh giá từ phụ huynh hài lòng.** Xin tất cả — hồ sơ toàn 5 sao trông giả, và mất cơ hội biết mình yếu chỗ nào |
| **3** | **Không viết hộ.** Gợi ý *nội dung nên nhắc tới* thì được; viết sẵn cho phụ huynh copy thì không |
| **4** | **Không xoá hay giấu đánh giá xấu** — trừ nội dung vi phạm pháp luật hoặc lộ thông tin trẻ em |

### D4. Trả lời đánh giá — mẫu chuẩn

| Loại | Cách trả lời |
|---|---|
| **5 sao** | Cảm ơn + **nhắc lại một chi tiết cụ thể về con** *(chứng minh mình nhớ từng em)*. ❌ Không sao chép cùng một câu cảm ơn cho mọi đánh giá |
| **3–4 sao** | Cảm ơn vì nói thẳng → hỏi cụ thể điều gì chưa ổn → **hứa một việc có thời hạn** → mời trao đổi riêng |
| **1–2 sao** | **Trả lời trong 24 giờ.** Không tranh cãi, không giải thích dài trên công khai. *"Cảm ơn anh/chị đã nói thẳng. Em xin gọi lại trong hôm nay để nghe đầy đủ và xử lý."* → chuyển sang quy trình **LEAD** *(phân hệ 13)* |
| **Đánh giá sai sự thật** | Trả lời điềm tĩnh, nêu **dữ kiện kiểm chứng được**, không công kích. Báo cáo nền tảng nếu vi phạm chính sách |

> ⚠️ **Tuyệt đối không nêu tên hay tình trạng của học sinh** khi trả lời công khai — kể cả để tự bảo vệ. Đây là dữ liệu **D3** theo phân hệ 11.

### D5. Chỉ số theo dõi

| Chỉ số | Ngưỡng tốt | Báo động |
|---|:--:|:--:|
| Điểm trung bình Google Business Profile | **≥ 4,7** | < 4,3 |
| Số đánh giá mới/tháng | ≥ 5 | < 2 |
| Tỷ lệ đánh giá được trả lời | **100%** | < 90% |
| Thời gian trả lời đánh giá ≤3 sao | ≤ 24 giờ | > 48 giờ |
| Tỷ lệ đánh giá có nêu **chi tiết cụ thể** *(không phải "tốt lắm")* | ≥ 60% | < 30% |

> 💡 **Chỉ số cuối cùng quan trọng hơn điểm trung bình.** Đánh giá *"Con tôi từ chỗ không dám phát biểu, giờ xung phong đọc bài trước lớp"* có giá trị hơn nhiều so với mười đánh giá *"Trung tâm tốt"* — với cả phụ huynh đang đọc lẫn thuật toán.

---

## PHẦN E. ĐO LƯỜNG SEO — ĐO THỨ ĐÚNG

| Đo cái này ✅ | Đừng chạy theo cái này ❌ |
|---|---|
| **Số truy vấn có thứ hạng tăng** theo cụm ý định | Thứ hạng của một từ khoá đơn lẻ |
| **Lượt tải tài liệu** *(cụm giáo viên)* | Lượt xem trang thuần tuý |
| **Số trường liên hệ từ kênh tự nhiên** | Tổng lưu lượng |
| **Số liên kết tự nhiên từ tên miền giáo dục** | Tổng số backlink |
| **Tỷ lệ trang có tác giả + thẩm định** | Số lượng bài đăng |
| **Số truy vấn thương hiệu** *("Học viện GITA", "KNS365")* | — *(đây là chỉ số uy tín tăng)* |

### Mốc kỳ vọng thực tế — **không hứa top 1**

| Mốc | Điều hợp lý để kỳ vọng |
|---|---|
| **Tháng 1–3** | Site được lập chỉ mục đầy đủ · bắt đầu có thứ hạng ở truy vấn dài, ít cạnh tranh |
| **Tháng 4–6** | Có lưu lượng đều từ **cụm giáo viên** · bắt đầu có liên kết tự nhiên |
| **Tháng 7–12** | Cạnh tranh được ở **cụm vấn đề phụ huynh** · truy vấn thương hiệu tăng rõ |
| **Từ tháng 12** | Có cơ hội đứng đầu ở các truy vấn **ngách mà chỉ GITA có dữ liệu** *(rubric, chuẩn đầu ra, quy trình đo)* |

> 🎯 **Nơi thực tế có thể đạt vị trí số 1:** không phải ở *"kỹ năng sống là gì"* — nơi đó cạnh tranh với hàng nghìn trang. Mà ở những truy vấn như *"rubric đánh giá kỹ năng sống"*, *"chuẩn đầu ra kỹ năng sống lớp 3"*, *"cách đo tiến bộ kỹ năng sống"* — **những chỗ Học viện GITA là đơn vị duy nhất có dữ liệu thật để trả lời.**
> Đó là chiến lược đúng: **không giành chỗ đông người, mà tạo ra chỗ chỉ mình đứng được.**

---

*Tài liệu thuộc bộ **KNS365 – Hệ GEN VIỆT** · Học viện GITA.*
