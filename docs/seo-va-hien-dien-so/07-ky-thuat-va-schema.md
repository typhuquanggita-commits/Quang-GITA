# 07 · KỸ THUẬT & DỮ LIỆU CÓ CẤU TRÚC

> Phần này là **điều kiện cần**. Nội dung hay mà kỹ thuật sai thì không lên được; kỹ thuật đúng
> mà nội dung rỗng cũng không lên được. Làm xong phần này một lần, dùng nhiều năm.

---

## 1. Nền tảng website — chọn đúng từ đầu

| Yêu cầu | Vì sao | Ngưỡng |
|---|---|---|
| **Tự chủ mã nguồn và dữ liệu** | Website là tài sản sở hữu (SEO-09) | Không dùng nền tảng khoá dữ liệu |
| **Hiển thị nội dung ngay trong HTML** | Nội dung chỉ hiện sau khi chạy JavaScript có rủi ro không được đọc đầy đủ | Kết xuất phía máy chủ hoặc tĩnh |
| **Sửa được thẻ tiêu đề, mô tả, URL, schema từng trang** | Bắt buộc | — |
| **Tốc độ tải** | Phần lớn phụ huynh Việt Nam truy cập bằng điện thoại, mạng di động | Xem §2 |
| **HTTPS toàn trang** | Điều kiện tối thiểu | Bắt buộc |
| **Tên miền riêng** `leaderboom.vn` | Đã nằm trong danh mục tài sản E-01 | Bắt buộc |

---

## 2. Core Web Vitals — ba chỉ số phải đạt

| Chỉ số | Đo cái gì | Ngưỡng "Tốt" | Nguyên nhân hỏng thường gặp |
|---|---|---|---|
| **LCP** — Largest Contentful Paint | Thời gian phần tử lớn nhất hiện ra | **≤ 2,5 giây** | Ảnh quá nặng · phông chữ chặn hiển thị · máy chủ chậm |
| **INP** — Interaction to Next Paint *(đã thay FID)* | Trang phản hồi thao tác nhanh không | **≤ 200 mili giây** | JavaScript nặng · quá nhiều mã theo dõi |
| **CLS** — Cumulative Layout Shift | Bố cục có nhảy khi tải không | **≤ 0,1** | Ảnh không khai báo kích thước · quảng cáo chèn vào |

**Sáu việc cụ thể:**

| Việc | Tác động |
|---|---|
| **Nén ảnh sang định dạng hiện đại**, khai báo `width` và `height` | LCP + CLS |
| **Tải lười** ảnh dưới màn hình đầu, **không tải lười** ảnh đầu trang | LCP |
| **Nhúng phông chữ đúng cách** — `display=swap`, chỉ tải trọng số dùng thật | LCP |
| **Gỡ mã theo dõi không dùng** | INP |
| **Dùng CDN** | LCP |
| **Kiểm tra trên điện thoại tầm trung, mạng 4G**, không kiểm tra trên máy tính wifi | Tất cả |

> **Sai lầm phổ biến:** tối ưu điểm số trên máy tính rồi báo cáo "đạt 95/100". Google đánh giá theo
> **dữ liệu người dùng thật trên thiết bị di động**. Đo bằng dữ liệu thực địa, không chỉ đo phòng thí nghiệm.

---

## 3. Chuẩn kỹ thuật từng trang

| Hạng mục | Chuẩn | Ghi chú |
|---|---|---|
| **Thẻ tiêu đề** | 50–60 ký tự · từ khoá chính ở đầu · có tên thương hiệu ở cuối | `Con không tự giác học phải làm sao — 7 ngày quan sát \| Leader Boom` |
| **Thẻ mô tả** | 140–160 ký tự · có lời hứa cụ thể | Không nhồi từ khoá |
| **URL** | Ngắn, không dấu, gạch nối | `/van-de/tu-quan-tri/con-khong-tu-giac-hoc/` |
| **Một H1 duy nhất** | Trùng ý với thẻ tiêu đề, không cần trùng chữ | — |
| **H2/H3 là câu hỏi thật** | Xem TL 04 §2 | — |
| **Ảnh có `alt` mô tả thật** | Không nhồi từ khoá vào `alt` | Cũng là yêu cầu tiếp cận |
| **Liên kết nội bộ dùng chữ mô tả** | Không dùng "tại đây", "xem thêm" | — |
| **Thẻ chuẩn tắc** `canonical` | Mọi trang, kể cả trang tự tham chiếu | Chống trùng lặp |
| **Ngôn ngữ** | `<html lang="vi">` | Bắt buộc |
| **Sơ đồ trang XML** | Tự sinh, nộp qua Search Console | — |
| **`robots.txt`** | **Kiểm tra không chặn nhầm** thư mục nội dung | Lỗi này làm mất toàn bộ lưu lượng |
| **Breadcrumb** | Trang chủ → nhóm → bài | Kèm schema |
| **Trang 404 tử tế** | Gợi ý nội dung liên quan | — |
| **Chuyển hướng 301** khi đổi URL | **Không bao giờ xoá bài** — chuyển hướng | SEO-09 |

---

## 4. Dữ liệu có cấu trúc — mã dán được ngay

Đây là thứ giúp Google và hệ thống AI **hiểu trang nói về ai, do ai viết, đáng tin tới đâu**.
Thay các giá trị trong `[ ]`.

### 4.1 Tổ chức — đặt ở mọi trang

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://leaderboom.vn/#organization",
  "name": "Học viện GITA",
  "alternateName": "Leader Boom",
  "url": "https://leaderboom.vn",
  "logo": "https://leaderboom.vn/logo.png",
  "description": "Chương trình phát triển năng lực và thói quen cho học sinh 9–18 tuổi: trại 7 ngày và lộ trình 365 ngày.",
  "foundingDate": "[năm]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[địa chỉ]",
    "addressLocality": "[quận]",
    "addressRegion": "Hà Nội",
    "addressCountry": "VN"
  },
  "telephone": "[+84...]",
  "email": "[email]",
  "sameAs": [
    "https://www.facebook.com/[trang]",
    "https://www.youtube.com/[kênh]",
    "https://www.tiktok.com/[tài khoản]"
  ]
}
```

### 4.2 Bài phác đồ — `Article` + `Person`

**Đây là schema quan trọng nhất** vì nó gắn nội dung với tác giả có thẩm quyền — điều kiện của
nội dung YMYL.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Tiêu đề bài, ≤ 110 ký tự]",
  "description": "[Hai câu trả lời thẳng]",
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "inLanguage": "vi",
  "author": {
    "@type": "Person",
    "name": "[Họ tên thật]",
    "jobTitle": "[Coach trưởng]",
    "url": "https://leaderboom.vn/ve-chung-toi/[slug]/",
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "[Chứng nhận C4 hệ đào tạo GITA]"
    },
    "worksFor": { "@id": "https://leaderboom.vn/#organization" }
  },
  "reviewedBy": {
    "@type": "Person",
    "name": "[Người duyệt chuyên môn]",
    "jobTitle": "[chức danh]"
  },
  "publisher": { "@id": "https://leaderboom.vn/#organization" },
  "mainEntityOfPage": "https://leaderboom.vn/van-de/[nhom]/[bai]/"
}
```

> **`author` và `reviewedBy` là hai trường tạo khác biệt lớn nhất với nội dung YMYL.**
> Không có `author` là tín hiệu nội dung vô danh.

### 4.3 Câu hỏi thường gặp — phần 10 của mỗi bài

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "[Câu hỏi đúng như phụ huynh gõ]",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "[Trả lời 40–70 chữ, tự đứng được]"
    }
  }]
}
```

### 4.4 Lộ trình 7 ngày — `HowTo`

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Bảy ngày quan sát: [tên vấn đề]",
  "totalTime": "P7D",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Ngày 1 — Lập baseline",
      "text": "[Ghi chính xác hành vi, tần suất, thời lượng]" }
  ]
}
```

### 4.5 Chương trình trại — `Course`

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Trại huấn luyện Leader Boom",
  "description": "[mô tả]",
  "provider": { "@id": "https://leaderboom.vn/#organization" },
  "educationalLevel": "Học sinh 9–18 tuổi",
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "Onsite",
    "location": { "@type": "Place", "name": "[địa điểm]" },
    "startDate": "[YYYY-MM-DD]",
    "endDate": "[YYYY-MM-DD]",
    "courseWorkload": "P7D"
  }
}
```

### 4.6 Đơn vị địa phương — `LocalBusiness`

Trên mỗi trang `/dia-diem/[tinh]/`, dùng **tên chuẩn** `Leader Boom [Tỉnh]` (TL 05 §2.1),
và **NAP phải khớp tuyệt đối** với Google Business Profile.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Leader Boom [Tỉnh]",
  "parentOrganization": { "@id": "https://leaderboom.vn/#organization" },
  "address": { "@type": "PostalAddress", "streetAddress": "[…]", "addressLocality": "[…]", "addressCountry": "VN" },
  "telephone": "[số riêng của đơn vị]",
  "geo": { "@type": "GeoCoordinates", "latitude": "[…]", "longitude": "[…]" },
  "openingHours": "[Mo-Fr 08:00-17:30]"
}
```

### 4.7 ⚠️ Đánh giá — quy tắc bắt buộc

**Chỉ đánh dấu `Review` và `AggregateRating` cho đánh giá có thật, thu thập hợp lệ, và hiển thị
công khai trên chính trang đó.** Đánh dấu đánh giá không có thật, hoặc tự gán điểm trung bình,
là **vi phạm chính sách và bị xử lý** — xem TL 06 §1.

---

## 5. Bảng kiểm kỹ thuật trước khi phát hành

| ⬜ | Hạng mục |
|---|---|
| ⬜ | Đã cài **Google Search Console** và xác minh quyền sở hữu |
| ⬜ | Đã cài công cụ phân tích, có ghi nhận mục tiêu chuyển đổi |
| ⬜ | Sơ đồ trang XML đã nộp · `robots.txt` **không chặn nhầm** |
| ⬜ | HTTPS toàn trang · chuyển hướng đúng từ bản không HTTPS |
| ⬜ | Mỗi trang có **một** H1, thẻ tiêu đề và mô tả riêng |
| ⬜ | Mọi trang có thẻ `canonical` |
| ⬜ | Schema `EducationalOrganization` ở mọi trang · `Article`+`Person` ở mọi bài |
| ⬜ | Đã kiểm tra schema bằng công cụ kiểm tra chính thức, **không lỗi** |
| ⬜ | LCP ≤ 2,5s · INP ≤ 200ms · CLS ≤ 0,1 **trên điện thoại tầm trung, mạng 4G** |
| ⬜ | Mọi ảnh có `alt`, có `width`/`height`, đã nén |
| ⬜ | Không có nội dung mồ côi — mọi trang có liên kết vào |
| ⬜ | Trang 404 tử tế · mọi URL cũ đã chuyển hướng 301 |
| ⬜ | NAP trên website khớp tuyệt đối với Google Business Profile |
| ⬜ | Chính sách bảo mật dữ liệu theo NĐ 13/2023 đã đăng |

---

## 6. Liên kết

- Chuẩn on-page từng loại trang: [`10-chuan-trien-khai.md`](10-chuan-trien-khai.md)
- Cấu trúc bài phác đồ: [`02-kien-truc-noi-dung.md`](02-kien-truc-noi-dung.md) §3
- Hồ sơ tác giả cho schema `Person`: [`03-eeat-va-ymyl.md`](03-eeat-va-ymyl.md) §3
- Quy tắc đánh giá: [`06-danh-gia-5-sao.md`](06-danh-gia-5-sao.md)
