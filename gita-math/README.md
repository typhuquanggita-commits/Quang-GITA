# HỆ THỐNG TOÁN TIỂU HỌC CHẤT LƯỢNG CAO — HỌC VIỆN GITA

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn
*Tư duy xuất sắc — Bản lĩnh dẫn đầu*

Hệ tài liệu toán **từ tiền tiểu học tới lớp 5**. Ba khối đầu — mẫu giáo lớn, lớp 1,
lớp 2 — nhắm việc xây nền và giữ cho trẻ thích toán. Ba khối sau — lớp 3, 4, 5 — chia
hai tuyến, phục vụ mục tiêu thi chất lượng cao và thi chuyên vào các trường top đầu
Hà Nội.

---

## 1. HỆ THỐNG GỒM NHỮNG GÌ

| Hạng mục | Số lượng | Nơi để |
|---|---:|---|
| **Khối Mầm** — buổi học 5–8 tuổi, mỗi buổi hai bản | 190 × 2 | `12-khoi-mam/` |
| **Khung năm học khối Mầm** — lộ trình, bản đồ kiến thức, đánh giá đầu vào | 9 | `12-khoi-mam/lo-trinh/` · `ban-do/` · `danh-gia/` |
| Cụm chuyên đề (chương) | 96 | `02-chi-muc/` |
| Phiếu học 90 phút | 600 | `03-phieu/` |
| Phiếu Lời giải & Phân tích chuyên sâu | 600 | `03-phieu/` |
| Phiếu Hướng dẫn ôn chắc chuyên đề | 96 | `03-phieu/` |
| Phiếu ôn tập mốc · Đề thi mốc · Đề đánh giá năng lực | 12 · 120 · 30 | `07-de-thi/` |
| — trong đó đã biên soạn đủ đề, đáp án, bảng phân tích | **162 / 162** | |
| Bản đồ kiến thức theo kỳ | 9 | `06-ban-do-kien-thuc/` |
| Bộ test đầu vào bốn trục | 3 | `08-test-dau-vao/` |
| Sơ đồ đọc vị đề bài | 24 | `10-so-do-doc-vi/` |
| Lộ trình học 34 tuần | 6 | `05-lo-trinh/` |
| **Tổng tài liệu** | **1880** | |

**Cấu trúc bất biến của mọi phiếu học:** 90 phút · thang 100 · 5 phần × 5 bài ×
4–10 ý · 115–170 ý một phiếu.

**Chuỗi sáu buổi của một cụm:** `LT` Lý thuyết → `DB` Dạng bài & Đọc vị →
`KN` Kỹ năng & Phương pháp → `NC` Luyện nâng cao → `OT` Ôn thi → `TH` Thi chương.
Mỗi buổi kèm một phiếu `GP` lời giải; mỗi cụm có một phiếu `HD` hướng dẫn ôn chắc.

### Khối Mầm dùng khung riêng, không dùng khung của lớp 3–5

| Khối | Tuổi | Một buổi | Cấu trúc | Đánh giá |
|---|:--:|:--:|---|---|
| Tiền tiểu học | 5–6 | 25 phút | 4 hoạt động | ba mức, **không chấm điểm** |
| Lớp 1 | 6–7 | 35 phút | 4 phần × 4 bài | thang 20 |
| Lớp 2 | 7–8 | 40 phút | 5 phần × 4 bài | thang 40 |

Đặt một phiếu 90 phút thang điểm 100 trước mặt trẻ năm tuổi là sai ở mọi mặt: trẻ chưa
đọc trôi chảy, sức tập trung chỉ quãng 20–25 phút, và một thang điểm kèm bút đỏ ở tuổi
này dạy trẻ sợ sai trước khi kịp thấy toán là thứ đáng chơi. Yêu cầu *học sinh thích học
toán* không phải lời chúc thêm vào cuối — nó là ràng buộc thiết kế, và bốn luật giữ hứng
thú được `kiem_mam.py` cưỡng chế như mọi ràng buộc kỹ thuật khác.

Mỗi buổi ra **hai tệp**: bản của trẻ, và bản người lớn ngồi cùng có câu đọc lên cho trẻ
nghe, đồ vật cần chuẩn bị, đáp án, dấu hiệu nhận ra con đã hiểu, và phải làm gì khi con
tắc. Ở tuổi này người lớn là một phần của học liệu, không phải người đứng ngoài chấm bài.

Hai chuẩn được hợp nhất, không phải chọn một: **Chương trình GDPT 2018** của Bộ Giáo dục
và Đào tạo (với khối mẫu giáo là Chương trình Giáo dục mầm non) là chuẩn bắt buộc về nội
dung; **Cambridge Primary Mathematics** bổ sung khung **Thinking and Working
Mathematically** — tám đặc điểm tư duy xếp thành bốn cặp, mỗi đặc điểm kèm một câu hỏi
người lớn nói ra miệng. Chỗ lệch giữa hai chương trình được ghi rõ thay vì giả vờ trùng
khít.

## 2. ĐÃ BIÊN SOẠN XONG

**Đủ 1 296 tài liệu**, tất cả đều qua kiểm định tự động theo Chuẩn biên soạn phiếu v2.0.

Kho được dựng bằng **bộ sinh nội dung** (`04-cong-cu/sinh/` và `04-cong-cu/lap/`) theo
một nguyên tắc bất di bất dịch: **mọi đáp số do mã tính ra, không do người gõ**. Thư
viện có **254 mẫu bài** phủ kín 8 nhóm chuyên đề × 5 mức × 3 lớp — cả 120 ô đều có từ
hai mẫu trở lên, và **538/538 dạng bài** của ngân hàng đều có mẫu khớp. Mỗi mẫu tự chọn
số liệu, tự tính đáp số, và mang sẵn hướng giải, nhãn tư duy, lỗi thường gặp, gợi ý ba
tầng, sáu cột bảng phân tích chuyên sâu và một bài tương tự.

Kho được xây theo **ba trục vuông góc nhau**. Trục nội dung — *bài này nói về cái gì*
— là tám nhóm chuyên đề và 538 dạng bài. Trục phương pháp — *bài này giải bằng thủ
pháp gì* — là **16 phương pháp giải toán tiểu học** ghi ở `04-cong-cu/data/phuong_phap.py`:
sơ đồ đoạn thẳng, rút về đơn vị, chia tỉ lệ, thử chọn, khử, giả thiết tạm, thay thế,
Đi-rích-lê, diện tích, tính ngược từ cuối, sơ đồ cây, dùng chữ thay số, lập bảng, biểu
đồ Ven, suy luận, xét trường hợp. Một học sinh thuộc hết dạng bài vẫn tắc trước đề lạ
nếu chưa từng được gọi tên thủ pháp mà đề ấy đòi, nên kiểm định cưỡng chế cả hai trục.

Trục thứ ba là **bối cảnh thực tế Việt Nam** (`04-cong-cu/sinh/mau_tt.py`): tiền điện
bậc thang, lãi suất tiết kiệm, khuyến mãi nhiều lần, tỉ lệ bản đồ, giá vé có dữ kiện
thừa. Đề đánh giá năng lực vào lớp 6 đang chuyển sang các tình huống này rất nhanh, và
một học sinh làm được bài “tìm x” vẫn tắc khi phải đọc một hoá đơn tiền điện.

Phiếu `GP` không chỉ trả đáp số: mỗi bài có mục **Các bước giải** đi từ đọc vị dấu hiệu
→ kiến thức phải dùng → cách làm → lối tắt → kết quả, rồi tới **cách nghĩ chung cho mọi
bài cùng dạng**. Cách đọc đề được rút thành **24 sơ đồ đọc vị** (`10-so-do-doc-vi/`),
mỗi sơ đồ là một cây quyết định cho một nhóm chuyên đề ở một lớp, kèm bảng dấu hiệu,
tám cặp chữ dễ đọc nhầm và mười đề luyện đọc vị. Thứ tự học cả năm nằm ở **6 lộ trình
34 tuần** (`05-lo-trinh/lo-trinh-T{1,2}-L{3,4,5}.md`) với bốn cổng kiểm tra và lịch ôn
lại năm mốc.

Ba tài liệu viết tay đầu tiên — trọn cụm `GITA-T1-L4-C03` và `GITA-T2-L5-C04-NC` — được
giữ nguyên làm **chuẩn vàng** đối chiếu; bộ sinh không ghi đè chúng.

**Sinh lại toàn bộ kho:** `python3 04-cong-cu/sinh_kho.py --ghi-de` (khoảng 3 giây).
Hạt giống chốt theo mã phiếu nên sinh lại bao nhiêu lần cũng ra đúng tài liệu ấy.

## 3. BẢN DÙNG NGAY — HỆ THỐNG HỌC ONLINE

Làm bài trực tuyến, chấm tự động, nhấn xem đáp án và phân tích kiến thức liên quan,
lưu hồ sơ học viên và sinh lộ trình cá nhân hoá.

Kho đủ 1 296 tài liệu nặng 53 MB, vượt hạn mức một trang xuất bản, nên bản online được
**tách theo khối lớp**. Mỗi bản có trọn nội dung khối mình và đủ chỉ mục cả ba khối; mở
tài liệu của khối khác thì được dẫn sang đúng bản của khối ấy.

| Khối | Nội dung nhúng | Dung lượng |
|---|---|---:|
| Lớp 3 | 200 phiếu học + 232 phiếu kèm + 8 sơ đồ đọc vị | 11,2 MB |
| Lớp 4 | 200 phiếu học + 232 phiếu kèm + 8 sơ đồ đọc vị | 11,9 MB |
| Lớp 5 | 200 phiếu học + 232 phiếu kèm + 8 sơ đồ đọc vị | 12,1 MB |

Cả ba bản đều mang đủ 6 lộ trình 34 tuần và chỉ mục cả ba khối.

Địa chỉ ba bản ghi tại `09-online/dia-chi-ban.json`.

Tệp nguồn: `09-online/app.html` · dữ liệu: `09-online/data/gita-data-L{3,4,5}.json` ·
bản xuất bản: `09-online/dist/gita-online-L{3,4,5}.html`

Dữ liệu web thay mọi câu lặp lại bằng tham chiếu vào một **bảng chuỗi dùng chung** và
tách dòng bảng Markdown thành ô, nhờ đó nhỏ đi hơn hai lần; trang đọc bằng `JSON.parse`
kèm hàm reviver nên dựng xong trong khoảng 0,6 giây.

## 3B. BẢN CÔNG KHAI — WEBSITE ĐỂ LÊN GOOGLE

Bản online ở mục 3 là **trang riêng tư**: chỉ người được chia sẻ mới mở được, và nội
dung do JavaScript dựng sau khi tải. Không cỗ máy tìm kiếm nào đưa được nó vào chỉ mục.

Vì vậy có thêm một bản thứ hai: **website tĩnh công khai**, cùng kho học liệu nhưng
kết xuất thành HTML thật, để đưa lên tên miền của Học viện.

```
python3 04-cong-cu/build_web_data.py --lop 3|4|5   ← BẮT BUỘC trước build_artifact --lop
python3 04-cong-cu/build_site.py     →  2 411 trang · 85 MB
python3 04-cong-cu/kiem_toan_seo.py  →  SẠCH LỖI · 28 hạng mục đạt
```

| Nhóm trang | Số lượng | Vai trò trong tìm kiếm |
|---|---:|---|
| Trang **dạng bài** | 538 | Trang chủ lực. Mỗi dạng có ví dụ có số thật, lời giải từng bước, bảng dấu hiệu đọc vị và bài tự luyện |
| Trang phiếu và lời giải | 1 200 | Hai phần đầu mở, phần sau khai báo thu phí trung thực |
| Trang **đề thi** | 166 | 162 đề công khai trọn vẹn kèm đáp án và bảng phân tích, cộng bốn trang trụ |
| Trang chuyên đề · nhóm · lớp | 123 | Trụ chủ đề, dẫn uy tín xuống trang dạng bài |
| Sơ đồ đọc vị · lộ trình · thi vào 6 | 39 | Ba khoảng trống đối thủ chưa làm |
| Hướng dẫn ôn chắc | 96 | |
| Trang **khối Mầm** | 233 | Ba khối 5–8 tuổi: trang trụ, trang chủ đề, trang từng buổi |
| Trang uy tín và điều hướng | 7 | Đội ngũ, quy trình biên soạn, đánh giá, đăng ký |

Nội dung nằm sẵn trong HTML, không tệp nào tải từ máy chủ ngoài, tải xong trong 18–48 ms
đo bằng Chromium. Chiến lược, chuẩn kỹ thuật và các bước triển khai ở `11-seo/`.

## 4. CÂY THƯ MỤC

```
gita-math/
├── 00-thuong-hieu/       Brand book, mô thức huấn luyện G-I-T-A, logo SVG
├── 01-kien-truc/         Hai tuyến · chuẩn biên soạn v2.0 · taxonomy · ma trận
│                         năng lực · khảo sát nguồn Hà Nội · khung giáo án ·
│                         phân quyền và bảo mật
├── 02-chi-muc/           Chỉ mục 1 296 tài liệu (JSON, CSV, Markdown)
├── 03-phieu/             Phiếu học, phiếu GP, phiếu HD  →  T1|T2 / L3|L4|L5
├── 04-cong-cu/           Bộ công cụ sinh, kiểm định, kiểm toán, kết xuất bản in
│   ├── data/             Nguồn dữ liệu duy nhất: nhóm chuyên đề, cụm, loại phiếu,
│   │                     ngân hàng 540 dạng bài, 16 phương pháp giải, bản đồ,
│   │                     đề thi, phân quyền, bản đồ từ khoá tìm kiếm
│   ├── sinh/             Thư viện 254 mẫu bài tự tính đáp số, theo tám nhóm
│   ├── lap/              Bộ lắp mẫu bài thành phiếu, phiếu GP và phiếu HD
│   └── templates/        Khuôn phiếu và quy trình biên soạn một cụm
├── 05-lo-trinh/          Kế hoạch sản xuất · 6 lộ trình học 34 tuần
├── 06-ban-do-kien-thuc/  9 bản đồ HK1 · HK2 · cả năm cho ba lớp
├── 07-de-thi/            162 đề: ôn tập mốc, thi mốc, đánh giá năng lực
├── 08-test-dau-vao/      Test bốn trục cho học sinh mới + công cụ xếp lớp
├── 09-online/            Hệ thống làm bài trực tuyến
├── 10-so-do-doc-vi/      24 sơ đồ đọc vị đề bài (8 nhóm × 3 lớp)
├── 11-seo/               Chiến lược tìm kiếm + bộ sinh website công khai
└── 12-khoi-mam/          Tiền tiểu học · lớp 1 · lớp 2 — 190 buổi × 2 bản
    ├── lo-trinh/         Lộ trình 35 tuần cho từng khối
    ├── ban-do/           Bản đồ kiến thức cả năm cho từng khối
    └── danh-gia/         Đánh giá đầu vào cho từng khối
```

## 5. BỘ CÔNG CỤ — CHẠY THEO ĐÚNG THỨ TỰ NÀY

| Lệnh | Việc |
|---|---|
| `python3 04-cong-cu/build_index.py` | Sinh chỉ mục 1 296 tài liệu |
| `python3 04-cong-cu/build_taxonomy.py` | Sinh taxonomy 96 cụm × 540 dạng bài |
| `python3 04-cong-cu/build_chuan_phieu.py` | Sinh Chuẩn biên soạn phiếu v2.0 |
| `python3 04-cong-cu/build_ban_do.py` | Sinh 9 bản đồ kiến thức |
| `python3 04-cong-cu/build_de_thi.py` | Sinh chỉ mục 162 đề thi |
| `python3 04-cong-cu/build_de.py` | **Biên soạn trọn 162 đề thi** kèm đáp án và bảng phân tích |
| `python3 04-cong-cu/build_mam.py` | **Biên soạn khối Mầm — 190 buổi × 2 bản** |
| `python3 04-cong-cu/build_mam_khung.py` | **Khung năm học khối Mầm — lộ trình, bản đồ, đánh giá đầu vào** |
| `python3 04-cong-cu/kiem_do_kho.py` | **Kiểm định thang độ khó — M4 có thật sự khó hơn M3 không** |
| `python3 04-cong-cu/kiem_cham.py` | **Kiểm định bộ chấm khách quan — có chấm đúng, có chấm bừa không** |
| `python3 04-cong-cu/kiem_mam.py` | **Kiểm định khối Mầm — 15 hạng mục** |
| `python3 04-cong-cu/build_phan_quyen.py` | Sinh tài liệu phân quyền và bảo mật |
| `python3 04-cong-cu/kiem_tra_mau.py` | Kiểm định 254 mẫu bài × mọi lớp × 300 hạt giống, đo độ phủ 538 dạng bài và 16 phương pháp |
| `python3 04-cong-cu/sinh_kho.py` | **Sinh trọn kho 1 296 tài liệu** (`--ghi-de` để dựng lại) |
| `python3 04-cong-cu/validate_phieu.py --all` | Kiểm định từng phiếu theo chuẩn v2.0 |
| `python3 04-cong-cu/build_so_do.py` | Sinh 24 sơ đồ đọc vị đề bài |
| `python3 04-cong-cu/build_lo_trinh.py` | Sinh 6 lộ trình học 34 tuần |
| `python3 04-cong-cu/kiem_toan.py` | **Kiểm toán toàn hệ thống — 12 nhóm, 36 hạng mục** |
| `python3 04-cong-cu/kiem_yeu_cau.py` | **Đối chiếu với từng yêu cầu đã đặt ra — 40 mục** |
| `python3 04-cong-cu/render_html.py --all` | Kết xuất bản in A4: bản ĐỀ và bản ĐÁP ÁN |
| `python3 04-cong-cu/build_web_data.py --lop 4` | Đóng gói dữ liệu online cho một khối lớp |
| `python3 04-cong-cu/build_artifact.py --lop 4` | Ghép thành một trang tự chứa để xuất bản |
| `python3 04-cong-cu/build_site.py` | **Dựng website công khai — 2 003 trang HTML** vào `11-seo/site/` |
| `python3 04-cong-cu/kiem_toan_seo.py` | **Kiểm toán website — 28 hạng mục** trước khi đưa lên |
| `python3 04-cong-cu/nhap_danh_gia.py --kiem` | Kiểm tệp đánh giá của người học |
| `python3 04-cong-cu/sinh_logo.py` | Dựng lại sáu tệp logo SVG từ hình học tính toán |
| `python3 04-cong-cu/xep_lop.py --lop 4 --N 20 --K 18 --P 16 --T 22 --tuan 7` | Xếp lớp từ test đầu vào |

**Quy tắc vàng:** mọi thứ sinh ra từ `04-cong-cu/data/`. Muốn sửa chương trình thì sửa
dữ liệu nguồn rồi chạy lại bộ sinh, **không sửa tay tệp đã sinh**.

## 6. ĐỌC THEO VAI TRÒ

| Bạn là | Đọc theo thứ tự này |
|---|---|
| **Giám đốc / chủ đầu tư** | `00-thuong-hieu/01` → `01-kien-truc/01` → `05-lo-trinh/ke-hoach-san-xuat.md` |
| **Chủ biên học liệu** | `01-kien-truc/02` chuẩn biên soạn → `04-cong-cu/sinh/khung.py` → một tệp `04-cong-cu/sinh/mau_*.py` → cụm chuẩn vàng `GITA-T1-L4-C03-*` |
| **Giáo viên đứng lớp** | `01-kien-truc/06` khung giáo án → `05-lo-trinh/lo-trinh-*` của lớp mình → `06-ban-do-kien-thuc/` → `10-so-do-doc-vi/` → phiếu `HD` của cụm đang dạy |
| **Coach kèm học viên** | `00-thuong-hieu/02` mô thức GITA → `01-kien-truc/04` ma trận năng lực |
| **Tư vấn tuyển sinh** | `08-test-dau-vao/00-huong-dan-test-dau-vao.md` |
| **Quản trị hệ thống** | `01-kien-truc/07-phan-quyen-va-bao-mat.md` — đọc kỹ mục ranh giới bảo mật |

## 7. BA ĐIỀU PHẢI BIẾT TRƯỚC KHI DÙNG THẬT

**7.1. Bản online chưa dùng để thi thật được.** Đây là một trang chạy trên máy người xem;
phân quyền trong trang ngăn được nhầm lẫn nhưng không ngăn được người cố tình mở công cụ
nhà phát triển. Thi thật dùng bản in, hoặc chờ triển khai hệ thống có máy chủ theo lộ
trình ở `01-kien-truc/07`, mục 6 lớp 3.

**7.1B. Website công khai chưa có tên miền và chưa có tên người.** Bộ sinh đã dựng đủ
2 003 trang và qua 28 hạng mục kiểm toán, nhưng site chưa được đưa lên đâu cả. Ba chỗ
trong site đang chờ thông tin thật — đội ngũ biên soạn, thông tin liên hệ, thông tin ghi
danh — và chúng hiện rõ trên trang, cố ý, để không ai quên. Xem `11-seo/03-trien-khai-len-ten-mien.md`.

**7.2. Ma trận phân quyền đang là thiết kế đề xuất.** Cần đối chiếu với quy định quyền
hiện hành của **GITA365** và chỉnh cho khớp trước khi áp dụng. Việc này ghi ở
`01-kien-truc/07`, mục 9.

**7.3. Kho do máy dựng cần một vòng duyệt của người.** Mọi đáp số đã do mã tính ra và
đã qua kiểm định tự động, nhưng **lời văn và độ phù hợp sư phạm** của 1 284 tài liệu
sinh tự động thì máy không tự đánh giá được. Trước khi phát cho học viên, chủ biên nên
đọc duyệt theo thứ tự: phiếu `TH` của từng cụm → phiếu `NC` → phần V của mọi phiếu. Cụm
chuẩn vàng `GITA-T1-L4-C03` là thước đo để so.
