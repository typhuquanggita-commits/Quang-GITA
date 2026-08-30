# KẾ HOẠCH TRIỂN KHAI & ĐẶC TẢ TRANG
### Kiến trúc URL · đặc tả từng trang · thẩm quyền thực thể · lịch 12 tháng · tiêu chí nghiệm thu

> Ba tài liệu trước trả lời *"làm gì và vì sao"*. Tài liệu này trả lời **"dựng chính xác cái gì, ở URL nào, gồm những phần nào, ai làm, tuần nào xong"**.
> Đội kỹ thuật và nội dung có thể cầm tài liệu này bắt tay vào việc mà không cần hỏi lại.

---

## PHẦN A. KIẾN TRÚC URL

> Nguyên tắc: **URL nói được nội dung khi chưa cần mở trang**. Tiếng Việt không dấu, gạch nối, không tham số, tối đa 3 cấp.

```
/                                          Trang chủ

/chuong-trinh/                             ◆ TRỤ T5 — chương trình
   /chuong-trinh/lop-1/  →  /lop-12/       12 trang, mỗi lớp một trang
   /chuong-trinh/mo-thuc-gita/
   /chuong-trinh/cach-danh-gia/
   /chuong-trinh/hoc-phi/

/chuan-dau-ra/                             ◆ TRỤ T1 — công cụ tra cứu ⭐
   /chuan-dau-ra/lop-1/  →  /lop-12/       12 trang + bộ lọc tương tác

/tai-lieu/                                 ◆ TRỤ T2 — kho giáo viên ⭐
   /tai-lieu/rubric-danh-gia-ky-nang-song/
   /tai-lieu/giao-an-ky-nang-song-lop-1/   → lớp 2…12
   /tai-lieu/tro-choi-tap-the-hoc-sinh/
   /tai-lieu/phieu-thuc-hanh-ky-nang-song/
   /tai-lieu/ke-hoach-day-ky-nang-song-ca-nam/
   /tai-lieu/bo-kit-dung-cu-lop-ky-nang-song/

/cha-me/                                   ◆ TRỤ T3 — vấn đề phụ huynh
   /cha-me/con-nhut-nhat/
   /cha-me/con-mat-tap-trung/
   /cha-me/day-con-tu-lap/
   /cha-me/con-tuc-gian-danh-ban/
   /cha-me/con-hoc-truoc-quen-sau/
   /cha-me/con-khong-co-ban/
   /cha-me/cau-hoi-nen-hoi-con-moi-toi/
   /cha-me/con-may-tuoi-nen-co-dien-thoai/

/an-toan/                                  ◆ TRỤ T4 — YMYL ⚠️
   /an-toan/quy-tac-5-ngon-tay/
   /an-toan/dau-hieu-con-khong-on/
   /an-toan/quy-trinh-bao-ve-tre-em/
   /an-toan/con-bi-bat-nat/

/co-so/                                    ◆ TRỤ T6 — địa phương
   /co-so/ha-noi/                          mỗi cơ sở một trang

/doi-ngu/                                  E-E-A-T
   /doi-ngu/<ho-ten-khong-dau>/            mỗi HLV một trang

/bao-cao-tac-dong/                         ⭐ VŨ KHÍ CHÍNH — xem Phần D
   /bao-cao-tac-dong/2026/

/ve-chung-toi/
/chinh-sach-bao-ve-du-lieu-tre-em/
/lien-he/
```

### Quy tắc URL bất di bất dịch

| # | Quy tắc |
|:--:|---|
| 1 | **Một trang = một ý định tìm kiếm.** Không hai trang cùng nhắm một truy vấn |
| 2 | **URL không đổi sau khi đã đăng.** Buộc phải đổi → chuyển hướng 301 vĩnh viễn |
| 3 | **Không nhồi từ khoá vào URL** — `/cha-me/con-nhut-nhat/`, không phải `/day-con-tu-tin-con-nhut-nhat-lam-sao-de-con-het-nhut-nhat/` |
| 4 | **Trang tải tài liệu phải là trang HTML**, PDF chỉ là tệp đính kèm — PDF không xếp hạng tốt và không gắn được schema |

---

## PHẦN B. ĐẶC TẢ CHUẨN CỦA MỘT TRANG

> Mọi trang đều phải điền đủ bảng này **trước khi viết**. Thiếu ô nào thì chưa được viết.

| Trường | Quy chuẩn |
|---|---|
| **URL** | Theo Phần A |
| **Thẻ tiêu đề** *(title tag)* | **50–60 ký tự**; cụm từ tìm kiếm đứng đầu; kết bằng ` \| Học viện GITA` |
| **Mô tả meta** | **140–158 ký tự**; nêu **lợi ích cụ thể + con số**; có động từ mời hành động |
| **H1** | Một H1 duy nhất, khác thẻ tiêu đề một chút, tự nhiên hơn |
| **Đoạn mở** | **2 câu đầu trả lời thẳng câu hỏi.** Không mở bài dài dòng |
| **Hộp tóm tắt** | 3–5 gạch đầu dòng ngay sau đoạn mở — phần hay được trích vào AI Overviews |
| **Dàn H2** | Mỗi H2 là **một câu hỏi phụ có thật**; 4–8 H2 |
| **Độ dài** | Trang trụ **2.000–3.500 từ** · trang cụm **1.200–2.000 từ** · trang địa phương **800–1.200 từ**. ⚠️ **Không viết dài để lấy số** |
| **Tài sản riêng** ⭐ | **Bắt buộc**: ≥1 bảng/sơ đồ/số liệu/rubric mà chỉ GITA có |
| **Hình ảnh** | ≥2 hình có `alt` mô tả thật · WebP · ⚠️ không ảnh nhận diện học sinh nếu chưa có phiếu đồng ý |
| **Liên kết nội bộ** | ≥3 tới trang cùng cụm + 1 về trang trụ + 1 tới trang chuyển đổi |
| **Liên kết ra ngoài** | 1–3 tới **nguồn chính thống** *(văn bản pháp luật, WHO, UNICEF, Bộ GD&ĐT)* |
| **Dữ liệu có cấu trúc** | Theo loại trang — xem tài liệu `03` |
| **Hộp tác giả** | Tên · ảnh · chức danh · năm kinh nghiệm · liên kết `/doi-ngu/…` |
| **Thẩm định** ⚠️ | Trang YMYL: tên người thẩm định + chức danh + ngày |
| **Hotline 111** | Bắt buộc ở mọi trang thuộc `/an-toan/` và trang nhắc tới an toàn trẻ em |
| **Mời hành động** | **Một bước nhỏ, miễn phí** — tải phiếu, thử 7 ngày. Không chốt bán |
| **Ngày cập nhật** | Hiển thị · trang thường ≤12 tháng · **trang YMYL ≤6 tháng** |

---

## PHẦN C. ĐẶC TẢ 6 TRANG TRỤ

### T1 · `/chuan-dau-ra/` — **Chuẩn đầu ra kỹ năng sống theo lớp** ⭐

| Trường | Nội dung |
|---|---|
| **Thẻ tiêu đề** | `Chuẩn đầu ra kỹ năng sống lớp 1–12 (có bảng tra) \| Học viện GITA` |
| **Mô tả meta** | `Tra cứu chuẩn đầu ra kỹ năng sống từng lớp: 10 chuẩn hành vi cụ thể mỗi khối, kèm cách đo và bằng chứng cần có. Xem miễn phí, tải bản PDF.` |
| **H1** | Chuẩn đầu ra kỹ năng sống từ lớp 1 đến lớp 12 |
| **Tài sản riêng** | Toàn bộ `00/05-CHUAN-DAU-RA-THEO-KHOI` — **10 chuẩn hành vi/khối + vạch xuất sắc + bằng chứng** |
| **Công cụ** | Bộ lọc: chọn lớp → hiện 10 chuẩn + cách đo. **Đây là thứ giữ chân người dùng và tạo link** |
| **Schema** | `WebPage` + `FAQPage` |
| **Liên kết ra** | Thông tư 27/2020, Thông tư 22/2021, CT GDPT 2018 trên cổng Bộ GD&ĐT |
| **Trang con** | 12 trang `/chuan-dau-ra/lop-N/` |

### T2 · `/tai-lieu/` — **Kho tài liệu cho giáo viên** ⭐ *trang chiến lược nhất*

| Trường | Nội dung |
|---|---|
| **Thẻ tiêu đề** | `Kho giáo án & tài liệu kỹ năng sống (tải miễn phí) \| Học viện GITA` |
| **Mô tả meta** | `19 rubric đánh giá, 160 trò chơi tập thể, giáo án 12 khối, phiếu thực hành 5 lớp chiều sâu. Tải miễn phí, không cần đăng ký.` |
| **Tài sản riêng** | `07/BO-RUBRIC-CHI-TIET-19-HO` · `04/KHO-TRO-CHOI-TEAMWORK-160` · `02` · `06` |
| **Quy tắc quan trọng** | ⚠️ **Không bắt điền form mới cho tải.** Rào cản giết chết lượt chia sẻ — mà chia sẻ mới là thứ ta cần |
| **Schema** | `CollectionPage` + từng tài liệu gắn `LearningResource` |

### T3 · `/cha-me/` — **Cẩm nang cha mẹ đồng hành**

| Trường | Nội dung |
|---|---|
| **Thẻ tiêu đề** | `Cẩm nang cha mẹ: đồng hành cùng con mỗi ngày \| Học viện GITA` |
| **Tài sản riêng** | `08/CAM-NANG-PHU-HUYNH` — 4 việc nên làm · 5 điều nên tránh · 8 tình huống ❌/✅ |
| **Điểm nhấn** | Câu hỏi mỗi tối: *"Hôm nay con làm được điều gì mà hôm qua chưa làm được?"* — **câu này có thể trở thành thứ người ta nhớ về thương hiệu** |

### T4 · `/an-toan/` — **Bảo vệ con an toàn** ⚠️ YMYL

| Trường | Nội dung |
|---|---|
| **Thẻ tiêu đề** | `Bảo vệ con an toàn: dấu hiệu, quy tắc và quy trình xử lý \| Học viện GITA` |
| **Bắt buộc** | Người thẩm định ghi tên + chức danh + ngày · nguồn WHO/UNICEF/Luật Trẻ em 2016 · **hộp hotline 111 ở đầu và cuối trang** · dòng *"Bài viết không thay thế tư vấn chuyên môn"* |
| **Cấm** | Ảnh trẻ em thật · mô tả chi tiết hành vi xâm hại · tiêu đề gây sợ |
| **Tài sản riêng** | Quy trình 5 bước · 10 quy tắc an toàn · Quy tắc 5 Ngón Tay · Bàn Tay Tin Cậy |
| **Rà soát** | **≤6 tháng/lần** |

### T5 · `/chuong-trinh/` — **KNS365 học gì, đo thế nào**

| Trường | Nội dung |
|---|---|
| **Thẻ tiêu đề** | `Chương trình KNS365: học gì, đo thế nào \| Học viện GITA` |
| **Tài sản riêng** | 5 nhóm kỹ năng · thang sâu 6 bậc · 10 Cấp Độ · khung đo 4 tầng |
| **Schema** | `Course` + `EducationalOrganization` |
| **Điểm khác biệt phải nêu rõ** | **Vì sao 180 phút chứ không phải 35 phút** — bảng so sánh ở `01/PHUONG-AN-HOP-NHAT` Phần A |

### T6 · `/co-so/<thanh-pho>/` — **Trang địa phương**

| Trường | Nội dung |
|---|---|
| **Thẻ tiêu đề** | `Trung tâm kỹ năng sống tại <Thành phố> \| Học viện GITA` |
| **Bắt buộc** | Địa chỉ đầy đủ · bản đồ nhúng · giờ mở cửa · ảnh cơ sở thật · **tên HLV phụ trách** · lịch khai giảng · đánh giá thật |
| **Schema** | `LocalBusiness` + `Review` *(chỉ khi có đánh giá thật hiển thị)* |
| **NAP** | ⚠️ Tên – Địa chỉ – Điện thoại **phải giống hệt** trên Google Business Profile và mọi nơi khác. Sai một dấu phẩy cũng làm loãng tín hiệu |

---

## PHẦN D. THẨM QUYỀN THỰC THỂ — **ĐÒN BẨY MẠNH NHẤT ĐỂ LÊN SỐ 1**

> Google xếp hạng **thực thể**, không chỉ xếp hạng chuỗi ký tự. Muốn đứng số 1 bền, Học viện GITA phải được Google nhận diện là **một thực thể có thật, có thẩm quyền trong một chủ đề xác định**.

### D1. Xác định lãnh thổ chủ đề

> **Lãnh thổ của Học viện GITA:** *"Giáo dục kỹ năng sống **có đo lường** cho học sinh phổ thông Việt Nam."*

Không phải "kỹ năng sống" chung chung — chỗ đó quá rộng, không ai chiếm được. **Hai chữ "có đo lường" là chỗ đứng riêng**, và Học viện là đơn vị hiếm hoi có rubric, thang bậc và khung đo thật để bảo vệ chỗ đứng đó.

### D2. Phủ hết lãnh thổ *(topical coverage)*

Muốn được coi là thẩm quyền, **không thể có lỗ hổng**. Bản đồ chủ đề phải phủ đủ:

| Nhánh | Số trang tối thiểu |
|---|:--:|
| Chuẩn đầu ra 12 lớp | 12 + 1 trụ |
| Cách đánh giá & rubric | 6 |
| Giáo án & tài liệu dạy | 12 + 1 trụ |
| Vấn đề phụ huynh theo lứa tuổi | 15 |
| An toàn trẻ em ⚠️ | 6 |
| Đo lường & bằng chứng | 4 |
| Đội ngũ & tổ chức | 10+ |
| **Tổng tối thiểu** | **~70 trang thật** |

> ⚠️ **70 trang chất lượng trong 12 tháng ≈ 6 trang/tháng.** Đây là con số làm được nếu mỗi trang rút từ tài sản có sẵn. **Đừng chạy theo 300 bài mỏng.**

### D3. Đồ thị thực thể — `sameAs`

| Nơi | Việc phải làm |
|---|---|
| **Google Business Profile** | Xác minh · điền 100% trường · ảnh thật · đăng bài hằng tuần · trả lời 100% đánh giá |
| **Mạng xã hội chính thức** | Facebook · YouTube · TikTok — **cùng tên, cùng logo, cùng mô tả** |
| **Danh bạ giáo dục uy tín** | Đăng ký nơi thật sự có kiểm duyệt, ⚠️ **không mua danh bạ rác** |
| **Trang tác giả** | Mỗi HLV một trang `Person` có `hasCredential`, liên kết hai chiều với bài viết |
| **Nhắc tới trên báo/hội thảo** | Hệ quả tự nhiên của mục D4 |

> ⚠️ **NAP nhất quán tuyệt đối:** tên pháp nhân, địa chỉ, số điện thoại phải **giống từng ký tự** ở mọi nơi. Đây là lỗi phổ biến nhất và làm hỏng SEO địa phương.

### D4. ⭐ **VŨ KHÍ CHÍNH — Báo cáo tác động thường niên**

> **Đây là thứ có khả năng đưa Học viện lên số 1 nhanh hơn mọi kỹ thuật khác cộng lại.**

| | |
|---|---|
| **Là gì** | **"Báo cáo Kỹ năng sống Học sinh Việt Nam <năm>"** — dữ liệu gốc từ chính học sinh của Học viện: đo nền và đo cuối, cỡ mẫu thật, phương pháp công khai, **có cả số liệu chưa đạt** |
| **Vì sao mạnh** | ① **Không ai trong ngành có dữ liệu này** ② Nhà báo, giáo viên, luận văn **cần số liệu để trích** — và họ dẫn link ③ Liên kết từ báo chí và trường học là loại liên kết mạnh nhất, **không mua được** ④ Nó chứng minh E-E-A-T ở cả bốn chữ cùng lúc |
| **Nội dung** | Trích từ **phân hệ 14** — 4 tầng bằng chứng, 18 chỉ số, thiết kế đo, **trang tự nêu hạn chế nghiên cứu** |
| **Cách phát hành** | Trang HTML đầy đủ *(không chỉ PDF)* · biểu đồ tải rời cho người khác dùng lại kèm ghi nguồn · thông cáo gửi báo giáo dục · gửi các trường đối tác |
| **Nhịp** | **Mỗi năm một lần**, cùng thời điểm — tạo thói quen chờ đợi trong ngành |

> 🎯 **Nguyên lý:** *muốn được dẫn link, phải là nguồn gốc của một thông tin mà người khác cần.*
> Học viện GITA có thể trở thành **nguồn số liệu chuẩn của ngành kỹ năng sống Việt Nam**. Đó là con đường thật tới vị trí số 1 — và không đối thủ nào đi tắt được, vì họ không có học sinh và không có hệ đo.

---

## PHẦN E. QUY TẮC LIÊN KẾT NỘI BỘ

| # | Quy tắc |
|:--:|---|
| 1 | **Mọi trang cụm liên kết về trang trụ** bằng chữ neo mô tả *(không dùng "tại đây", "xem thêm")* |
| 2 | **Trang trụ liên kết xuống mọi trang cụm** của nó |
| 3 | **Trang cùng cụm liên kết chéo** ≥2 lần |
| 4 | **Trang lưu lượng cao trỏ về trang chuyển đổi** *(cơ sở, chương trình)* — nhưng đặt cuối bài, không chen giữa |
| 5 | **Không quá 100 liên kết/trang**; ưu tiên liên kết trong thân bài hơn ở chân trang |
| 6 | **Chữ neo đa dạng** — không lặp cùng một cụm từ cho mọi liên kết |
| 7 | **Trang mới đăng phải được liên kết từ ≥2 trang cũ trong 48 giờ** |

---

## PHẦN F. LỊCH 12 THÁNG

| Tháng | Trọng tâm | Sản phẩm bàn giao |
|:--:|---|---|
| **1** | **Nền móng kỹ thuật** | Site chạy · HTTPS · Core Web Vitals đạt · Search Console · Analytics · sitemap · schema Organization · trang chính sách bảo vệ dữ liệu · Google Business Profile xác minh |
| **2** | **Trụ T2 + T1** *(cụm giáo viên)* | Trang trụ `/tai-lieu/` · trang rubric · trụ `/chuan-dau-ra/` + 4 trang lớp · 6 trang `/doi-ngu/` |
| **3** | **Mở rộng kho giáo viên** | Giáo án 4 khối · trò chơi · phiếu thực hành · **công cụ tra chuẩn đầu ra** |
| **4** | **Hoàn tất T1** | Đủ 12 trang chuẩn đầu ra · 6 trang lớp giáo án · đo lại thứ hạng cụm giáo viên |
| **5–6** | **Trụ T3 + T4** *(phụ huynh & an toàn)* | Trụ `/cha-me/` + 6 trang cụm · trụ `/an-toan/` + 4 trang ⚠️ **có thẩm định** |
| **7** | **Trụ T5 + T6** *(chuyển đổi)* | `/chuong-trinh/` + 12 trang lớp · trang cơ sở đầu tiên · schema `Course` + `LocalBusiness` |
| **8** | **Hệ đánh giá 5 sao** | Quy trình xin đánh giá gắn vào Lễ Công Nhận Cấp Độ · trả lời 100% đánh giá cũ · trang chứng thực |
| **9** | **Hoàn tất phủ chủ đề** | Đủ ~70 trang · rà lỗ hổng chủ đề · sửa trang yếu |
| **10** | ⭐ **Chuẩn bị Báo cáo tác động** | Tổng hợp số liệu năm · viết · thẩm định chuyên môn · thiết kế biểu đồ |
| **11** | ⭐ **Phát hành Báo cáo tác động** | Trang HTML + PDF · thông cáo báo chí · gửi trường đối tác · gửi báo giáo dục |
| **12** | **Rà soát & làm mới** | Cập nhật trang cũ · phân tích truy vấn mới · lập kế hoạch năm 2 |

---

## PHẦN G. TIÊU CHÍ NGHIỆM THU — **KHÔNG ĐỦ 15 Ô THÌ KHÔNG ĐĂNG**

**Nội dung**
- ☐ 1. Trả lời được: **bài này có gì mà 10 kết quả đang đứng đầu không có?**
- ☐ 2. Có **≥1 tài sản riêng** *(rubric · số liệu · quy trình · trích lời HLV)*
- ☐ 3. **2 câu đầu trả lời thẳng** câu hỏi tìm kiếm
- ☐ 4. Có hộp tóm tắt 3–5 gạch đầu dòng
- ☐ 5. Mỗi H2 là một câu hỏi có thật

**Uy tín**
- ☐ 6. Có **hộp tác giả** liên kết tới `/doi-ngu/…`
- ☐ 7. Có **1–3 liên kết ra nguồn chính thống**
- ☐ 8. ⚠️ Trang YMYL: có **người thẩm định ghi tên + ngày**
- ☐ 9. ⚠️ Trang an toàn trẻ em: có **hộp hotline 111**

**Tuân thủ** *(nhóm phủ quyết)*
- ☐ 10. **Không ảnh nhận diện học sinh** nếu chưa có phiếu đồng ý đúng mục đích
- ☐ 11. **Không hứa kết quả tuyệt đối**, không giật tít gây sợ
- ☐ 12. **Không so sánh, không hạ thấp đối thủ**

**Kỹ thuật**
- ☐ 13. Thẻ tiêu đề 50–60 ký tự · mô tả meta 140–158 ký tự · một H1 duy nhất
- ☐ 14. **Dữ liệu có cấu trúc đã kiểm tra hợp lệ** bằng Rich Results Test
- ☐ 15. Liên kết nội bộ ≥3 · ảnh có `alt` · Core Web Vitals đạt · đã gửi Search Console

```
 Người viết: ……………  Người thẩm định: ……………  Người duyệt đăng: ……………
 Ngày đăng: ………  Ngày rà soát tiếp theo: ………
```

---

## PHẦN H. NƠI THỰC SỰ CÓ THỂ ĐẠT SỐ 1

| Nhóm truy vấn | Khả năng đạt số 1 | Vì sao |
|---|:--:|---|
| *rubric đánh giá kỹ năng sống · cách đo tiến bộ kỹ năng sống · chuẩn đầu ra kỹ năng sống lớp N* | 🟢 **Cao** | **GITA là đơn vị duy nhất có dữ liệu thật để trả lời** |
| *giáo án kỹ năng sống lớp N · trò chơi tập thể học sinh · phiếu thực hành kỹ năng sống* | 🟢 **Cao** | Kho tài liệu thật, đối thủ chỉ có bài viết |
| *Học viện GITA · KNS365 · mô thức GITA · Gen Việt* | 🟢 **Phải đạt 100%** | Truy vấn thương hiệu — mất chỗ này là mất khách đã tìm đúng tên |
| *trung tâm kỹ năng sống <quận/thành phố>* | 🟡 **Trung bình** | Cạnh tranh địa phương — thắng bằng Google Business Profile + đánh giá thật |
| *con nhút nhát · con mất tập trung · dạy con tự lập* | 🟡 **Trung bình** | Đông đối thủ; thắng được nếu đứng trên nền uy tín đã xây từ cụm giáo viên |
| *kỹ năng sống là gì · 10 kỹ năng sống cần thiết* | 🔴 **Thấp — không đầu tư** | Hàng nghìn trang, không có chỗ tạo khác biệt, giá trị chuyển đổi thấp |

> 🎯 **Chiến lược đúng: không giành chỗ đông người, mà tạo ra chỗ chỉ mình đứng được — rồi mở rộng dần từ đó.**

---

*Tài liệu thuộc bộ **KNS365 – Hệ GEN VIỆT** · Học viện GITA.*
