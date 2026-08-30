# 02 · KIẾN TRÚC NỘI DUNG

## 1. Bản đồ website

Cấu trúc phản ánh **bốn tầng ý định** ở TL 01 §1 — mỗi tầng có khu vực riêng, và các khu vực
liên kết với nhau theo hành trình phụ huynh.

```
leaderboom.vn
│
├── /                          Trang chủ — tầng 3 và 4
│
├── /van-de/                   ★ TRỤ CỘT — tầng 1 · động cơ lưu lượng chính
│   ├── /moi-truong/           N01 · 20 bài
│   ├── /hanh-vi/              N02 · 20 bài
│   ├── /thoi-quen/            N03 · 20 bài
│   ├── /nang-luc-hoc-tap/     N04 · 20 bài
│   ├── /tu-quan-tri/          N05 · 20 bài
│   ├── /dong-luc-muc-tieu/    N06 · 20 bài
│   ├── /dong-hanh-cung-con/   N07 · 20 bài  ← nhóm phụ huynh
│   ├── /hieu-suat/            N08 · 20 bài
│   ├── /tai-nang/             N09 · 20 bài
│   ├── /huong-nghiep/         N10 · 20 bài
│   └── /du-an-lanh-dao/       N11 · 20 bài
│
├── /phuong-phap/              Tầng 2 — mô thức GITA · 5 tầng · 18 năng lực · cơ sở khoa học
├── /chuong-trinh/             Tầng 3 — trại 7 ngày · 90 ngày · 365 ngày · 5 gói · học phí
├── /thu-thach-21-ngay/        ★ CỬA VÀO — miễn phí, thu email, chuyển thành thành viên
├── /an-toan/                  ★ 10 chuẩn an toàn · nhân sự · bảo hiểm · quy trình y tế
├── /ket-qua/                  Số liệu thật · nghiên cứu hiệu quả · **cả số liệu chưa đạt**
├── /danh-gia/                 Tầng 4 — phản hồi thật · cách Học viện xử lý phản hồi xấu
├── /ve-chung-toi/             Đội ngũ · hồ sơ tác giả · chứng chỉ · pháp lý
├── /cau-hoi-thuong-gap/       Tầng 4 — trả lời thẳng, gồm cả câu hỏi khó
├── /hoc-lieu/                 Biểu mẫu tải được — thu email
└── /dia-diem/                 Tầng 3 địa phương — mỗi đơn vị một trang
    ├── /ha-noi/
    └── /[tinh]/
```

> **Hai trang bị đánh giá thấp nhất nhưng quyết định tỉ lệ chốt: `/an-toan/` và `/danh-gia/`.**
> Với phụ huynh, câu hỏi thật không phải *"chương trình này hay không"* mà là
> ***"con tôi có an toàn khi ở đó bảy ngày không"***. Trang an toàn nêu đủ 10 chuẩn A1–A10,
> tỉ lệ nhân sự, bảo hiểm, quy trình y tế **trả lời câu hỏi đó trước khi họ phải hỏi** — và
> gần như không đối thủ nào ở Việt Nam có một trang như vậy.

---

## 2. Cụm chủ đề — cách Google hiểu Học viện là chuyên gia

Google không đánh giá từng bài riêng lẻ; nó đánh giá **độ bao phủ chủ đề**. Một website có 20 bài
sâu về *tự giác học tập* được coi là chuyên gia về chủ đề đó; một website có 20 bài về 20 chủ đề
khác nhau thì không.

**Mô hình trụ cột – vệ tinh:**

```
        TRANG TRỤ CỘT  /van-de/tu-quan-tri/
        "Vì sao con không tự giác học — và làm gì được"
        2.500–3.500 chữ · tổng quan cơ chế · liên kết xuống 20 bài con
                    ↕ liên kết hai chiều
   ┌────────────┬────────────┬────────────┬────────────┐
 Bài N05-01   Bài N05-02   Bài N05-03    …          Bài N05-20
 800–1.500 chữ · mỗi bài một biểu hiện cụ thể · liên kết ngang với bài liên quan
```

| Loại trang | Số lượng | Độ dài | Vai trò |
|---|---|---|---|
| **Trụ cột nhóm** | 11 | 2.500–3.500 chữ | Bao phủ chủ đề · nhận liên kết từ ngoài · xếp hạng từ khoá rộng |
| **Bài vệ tinh** | 220 | 800–1.500 chữ | Bắt truy vấn dài · **được AI trích dẫn** |
| **Trang trụ cột lớn** | 4 | 3.000+ chữ | `/phuong-phap/` · `/an-toan/` · `/ket-qua/` · `/chuong-trinh/` |

**Ba quy tắc liên kết nội bộ:**
1. Mỗi bài vệ tinh **liên kết lên trang trụ cột của nhóm mình** — bằng chữ mô tả, không dùng *"tại đây"*.
2. Mỗi bài vệ tinh **liên kết ngang 2–4 bài cùng cơ chế**, kể cả khác nhóm.
3. Mỗi bài **liên kết tới đúng một lời mời** — thử thách 21 ngày hoặc học liệu tải được. **Một, không phải ba.**

---

## 3. Cấu trúc chuẩn của một bài phác đồ

Đây là mẫu dùng cho cả 220 bài. **Thứ tự các phần không đổi** — nó vừa phục vụ người đọc đang lo
lắng, vừa phục vụ cách AI đọc và trích dẫn.

| Thứ tự | Phần | Độ dài | Vì sao ở vị trí này |
|---|---|---|---|
| 1 | **Tiêu đề** — ngôn ngữ phụ huynh gõ | ≤ 60 ký tự | Khớp truy vấn |
| 2 | **Hai câu trả lời thẳng** | 40–60 chữ | **Phần AI trích dẫn.** Không mở bài dài dòng |
| 3 | **Hộp tóm tắt** — 3 gạch đầu dòng | 60 chữ | Người vội đọc xong là đủ dùng |
| 4 | **"Điều nhiều người nghĩ là nguyên nhân"** | 150 chữ | Bắt trúng giả định sai của người đọc |
| 5 | **"Cơ chế thật thường gặp"** | 300–400 chữ | Phần chuyên môn · phần được trích nhiều thứ hai |
| 6 | **"Bảy ngày tới nhà mình làm gì"** — bảng ngày | 300 chữ | **Giá trị cho không.** Lý do người ta lưu và chia sẻ |
| 7 | **"Việc của bố mẹ — và việc không nên làm"** — bảng ✅/❌ | 200 chữ | Định dạng dễ trích, dễ nhớ |
| 8 | **"Khi nào cần người có chuyên môn"** | 100 chữ | **Bắt buộc với nội dung YMYL** — biết giới hạn của mình |
| 9 | **Hồ sơ tác giả** — tên, chứng chỉ, ngày cập nhật | — | E-E-A-T, xem TL 03 |
| 10 | **Câu hỏi thường gặp** — 3–5 câu | 200 chữ | Bắt truy vấn phụ · dữ liệu có cấu trúc FAQ |
| 11 | **Một lời mời duy nhất** | — | Thử thách 21 ngày hoặc biểu mẫu tải được |

> **Phần 8 là phần phân biệt nội dung có trách nhiệm với nội dung câu view.** Mỗi bài phải nói rõ
> khi nào vấn đề vượt phạm vi của bài viết và cần chuyên viên tâm lý hoặc y tế. Đây vừa là chuẩn
> chuyên môn B7 của Học viện, vừa là **tín hiệu Trustworthiness mạnh** với nội dung YMYL.

---

## 4. Ranh giới cho và bán

Câu hỏi luôn xuất hiện: *"cho nhiều thế thì ai còn mua nữa?"*

| Cho miễn phí | Giữ trong sản phẩm trả phí |
|---|---|
| **Toàn bộ lộ trình 7 ngày** của mọi phác đồ | Lộ trình 21 / 90 / 365 ngày chi tiết |
| Cơ chế và cách hiểu vấn đề | **Chẩn đoán cho đúng đứa trẻ cụ thể** |
| Biểu mẫu quan sát cơ bản | Bộ công cụ đánh giá `CC-01`→`CC-14` |
| Nguyên tắc chấm năng lực | Chấm năng lực có Coach đối chiếu 4 nguồn |
| Thử thách 21 ngày (gói G1) | Trại 7 ngày · Coach riêng · báo cáo 90 ngày |

> **Cho đi phần *biết*, bán phần *được đồng hành*.** Một phụ huynh đọc xong bài và tự làm được
> bảy ngày quan sát là một phụ huynh **đã tin Học viện biết việc mình đang nói** — và là người
> có xác suất đăng ký cao hơn hẳn người chỉ xem quảng cáo. Phần khó không phải biết phải làm gì;
> phần khó là **duy trì trong 90 ngày**, và đó đúng là thứ Học viện bán.

---

## 5. Sáu lỗi kiến trúc phải tránh

| Lỗi | Hậu quả | Cách đúng |
|---|---|---|
| **Blog rời rạc, không theo cụm** | Google không nhận ra chuyên môn ở chủ đề nào | Đi theo nhóm N01→N11, làm hết một nhóm rồi sang nhóm khác |
| **Nhiều bài trùng ý định tìm kiếm** | Các bài tự cạnh tranh nhau, không bài nào lên | Một truy vấn — một bài. Trùng thì gộp lại |
| **Trang sản phẩm không có nội dung thật** | Không xếp hạng, không chuyển đổi | Trang chương trình phải có lịch trình, nhân sự, an toàn, chi phí |
| **Nhồi từ khoá** | Với nội dung YMYL, gây hại nhiều hơn lợi | Viết cho phụ huynh; từ khoá xuất hiện tự nhiên |
| **Nội dung mồ côi** — không trang nào liên kết tới | Google khó tìm, người đọc không đến | Mọi bài nằm trong một cụm, có liên kết vào và ra |
| **Xoá hoặc bỏ bê bài cũ** | Mất thứ hạng đã tích luỹ | **Cập nhật và ghi ngày cập nhật**, không xoá |

---

## 6. Liên kết

- Bản đồ từ khoá và bảng dịch: [`01-nguoi-tim-kiem-va-tu-khoa.md`](01-nguoi-tim-kiem-va-tu-khoa.md)
- Chứng minh uy tín trên từng trang: [`03-eeat-va-ymyl.md`](03-eeat-va-ymyl.md)
- Cách viết hai câu đầu để được trích: [`04-duoc-ai-trich-dan.md`](04-duoc-ai-trich-dan.md)
- Dữ liệu có cấu trúc: [`07-ky-thuat-va-schema.md`](07-ky-thuat-va-schema.md)
