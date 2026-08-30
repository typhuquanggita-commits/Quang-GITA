# SEO — những gì mã nguồn làm được, và những gì không

> **Nói thẳng trước:** không có đoạn mã nào đưa một trang lên top 1 Google. Mã nguồn có
> thể làm cho trang **đủ điều kiện** để xếp hạng — và trước hôm nay nó *không* đủ điều
> kiện, vì một lý do cấu trúc. Phần còn lại là tên miền, nội dung, và thời gian.

---

## 1. Vấn đề gốc đã được sửa

Trước đây toàn bộ ứng dụng chạy bằng **hash** (`#/hoc-phi`). Đoạn sau dấu `#` **không bao
giờ được gửi lên máy chủ** — nên với Google, cả hai mươi màn hình chỉ là **một địa chỉ duy
nhất**. Không thể xếp hạng một trang không tồn tại như một địa chỉ riêng, và không kỹ thuật
SEO nào sửa được điều đó từ bên ngoài.

Nay dùng **History API** khi trang được phục vụ qua http(s), và tự động lui về hash khi mở
bằng `file://`. Giữ được lý do ban đầu (chạy offline, mở trực tiếp từ ổ đĩa) mà không còn hy
sinh khả năng tìm thấy.

---

## 2. Điều kiện triển khai — bắt buộc

### 2.1. SPA fallback

Máy chủ phải trả `index.html` cho mọi đường dẫn không khớp tệp tĩnh. Thiếu bước này, người
dùng mở thẳng `/hoc-phi` sẽ nhận 404.

| Nền tảng | Cấu hình |
|---|---|
| **Netlify** | Tạo `public/_redirects` với dòng `/*  /index.html  200` |
| **Vercel** | `vercel.json`: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` |
| **Cloudflare Pages** | Tự động, không cần cấu hình |
| **GitHub Pages** | Sao chép `dist/index.html` thành `dist/404.html` |
| **Nginx** | `try_files $uri $uri/ /index.html;` |

> Các trang được **kết xuất tĩnh** (mục 3) đã có tệp `index.html` riêng nên chạy được cả
> khi thiếu fallback. Nhưng các đường dẫn còn lại thì không — hãy cấu hình đủ.

Nếu host không làm được, đặt `VITE_ROUTER=hash` để quay về chế độ cũ. Ứng dụng vẫn chạy đầy
đủ, chỉ mất khả năng xếp hạng.

### 2.2. Tên miền

```bash
VITE_SITE_URL=https://ten-mien-that.vn npm run build
```

Thiếu biến này thì `canonical` để trống và `sitemap.xml` dùng đường dẫn tương đối — Google
sẽ bỏ qua sitemap. **Canonical sai còn hại hơn không có canonical**, vì nó gộp nhầm hai
trang khác nhau làm một; nên khi chưa khai báo tên miền, hệ thống để trống thay vì đoán.

---

## 3. Những gì build tự làm

```
npm run build
  → npm run seo        sinh sitemap.xml + robots.txt từ bảng route
  → tsc --noEmit       kiểm tra kiểu
  → vite build         đóng gói
  → npm run prerender  kết xuất tĩnh 11 đường dẫn + ảnh chia sẻ
```

### 3.1. Kết xuất tĩnh (prerender) — việc quyết định

Một ứng dụng một trang gửi về trình duyệt một tệp HTML gần như rỗng, rồi JavaScript mới dựng
nội dung. Google **biết** chạy JavaScript, nhưng:

- Nó chạy ở **lượt thứ hai**, cách lượt đầu từ vài giờ đến vài ngày.
- Bộ thu thập **mạng xã hội** (Facebook, Zalo, Messenger) **không chạy JavaScript**. Chia sẻ
  một địa chỉ sẽ ra ô trống — và đó là kênh lan truyền lớn nhất ở Việt Nam.
- Điểm trải nghiệm **LCP** bị kéo xuống vì nội dung đầu tiên phải đợi JS tải xong.

Bước prerender dùng Chromium duyệt bản build thật, chờ trang dựng xong, rồi ghi HTML **đã
dựng** vào đúng đường dẫn tĩnh. Kết quả kiểm chứng được:

```
dist/hsa-la-gi/index.html  →  3.555 ký tự văn bản, không cần JavaScript
                              <title> đúng, <meta description> đúng
                              JSON-LD: EducationalOrganization + FAQPage (8 câu)
```

Chỉ kết xuất các đường dẫn **cho lập chỉ mục**. Màn hình chứa dữ liệu học tập cá nhân không
được kết xuất — vừa vô nghĩa vừa rủi ro.

### 3.2. Chọn lọc chỉ mục

11 đường dẫn có nội dung thật được cho vào chỉ mục. 14 màn hình còn lại (hồ sơ, báo cáo, sổ
tay lỗi sai, không gian làm việc…) bị chặn bằng cả `robots.txt` lẫn thẻ `noindex`.

Lý do **không phải bảo mật** — chúng không truy cập được từ ngoài. Lý do là: một trang trống
rỗng đối với khách lạ mà nằm trong chỉ mục sẽ kéo tín hiệu chất lượng của cả tên miền xuống.
**Một trang không có gì để đọc mà được lập chỉ mục là một trang làm hại chính những trang
tốt.**

---

## 4. Nội dung — thứ thật sự quyết định thứ hạng

Thẻ meta chỉ giúp Google **hiểu** một trang. Cái quyết định trang đó có được xếp hạng không
là nó có **trả lời được câu người ta gõ vào ô tìm kiếm** hay không.

Năm bài đã viết, mỗi bài trả lời trọn một câu hỏi có lượng tìm kiếm thật:

| Đường dẫn | Câu hỏi nó trả lời |
|---|---|
| `/hsa-la-gi` | Kỳ thi HSA là gì, cấu trúc ra sao, lệ phí bao nhiêu |
| `/cau-truc-de-thi-hsa` | Đề gồm những phần nào, mỗi phần bao nhiêu câu |
| `/lo-trinh-on-thi-hsa` | Nên ôn bao lâu và bắt đầu từ đâu |
| `/bao-nhieu-diem-la-cao` | Bao nhiêu điểm là cao, thế nào là đủ xét tuyển |
| `/cau-hoi-thuong-gap` | Tám câu hỏi hay gặp nhất |

Ba ràng buộc tự đặt ra, **đều có test canh giữ**:

1. **Mọi con số lấy từ nguồn duy nhất trong mã nguồn.** Một bài nói "150 câu" trong khi hệ
   thống dùng 120 sẽ phá hủy lòng tin nhanh hơn bất kỳ lỗi kỹ thuật nào — và điều đó chỉ xảy
   ra khi con số được gõ lại ở hai nơi.
2. **Mỗi bài ghi nguồn và ngày cập nhật.** Đây là tín hiệu tin cậy Google đánh giá, nhưng
   quan trọng hơn: nó cho người đọc kiểm tra lại.
3. **Câu trả lời ngắn đặt trước mọi thứ khác.** Người tìm "lệ phí thi HSA bao nhiêu" cần con
   số trong ba giây, không cần đọc bài giới thiệu.

---

## 5. Đánh giá và số sao — nói rõ một lần

Hệ thống **không** khai báo `AggregateRating` hay `Review` trong dữ liệu có cấu trúc, và có
một bài test chặn việc thêm chúng vào.

Đánh dấu đánh giá không tồn tại trên trang là **vi phạm chính sách dữ liệu có cấu trúc của
Google** và dẫn tới **hình phạt thủ công cho cả tên miền** — cái giá lớn hơn nhiều lần so với
vài ngôi sao trong kết quả tìm kiếm.

Khi có đánh giá **thật** từ học viên thật, hãy thu thập chúng kèm danh tính kiểm chứng được,
hiển thị chúng trên trang, **rồi mới** đánh dấu. Thứ tự đó không được đảo.

---

## 6. Danh sách việc sau khi triển khai

Những việc này nằm **ngoài mã nguồn** và quyết định phần lớn thứ hạng:

- [ ] Đăng ký **Google Search Console**, xác minh tên miền, nộp `sitemap.xml`
- [ ] Đăng ký **Google Business Profile** nếu có địa chỉ vật lý (rất mạnh cho tìm kiếm địa phương)
- [ ] Kiểm tra **Rich Results Test** cho `/cau-hoi-thuong-gap` — FAQ phải hiện được
- [ ] Đo **PageSpeed Insights** trên bản triển khai thật, mục tiêu LCP < 2,5s
- [ ] Trang **giới thiệu tổ chức** có địa chỉ, số điện thoại, người chịu trách nhiệm nội dung
- [ ] Trang **chính sách bảo mật** và **điều khoản** — Google đánh giá tín hiệu tin cậy
- [ ] Ghi rõ **tác giả** của từng bài nội dung, kèm chuyên môn (tín hiệu E-E-A-T)
- [ ] Cập nhật nội dung theo mùa tuyển sinh và **đổi `updatedAt`**

**Thời gian:** một tên miền mới thường mất 3–6 tháng để vào chỉ mục ổn định và bắt đầu xếp
hạng cho từ khóa cạnh tranh. Không có cách rút ngắn hợp pháp. Ai hứa top 1 trong một tháng
đang bán thứ khác.
