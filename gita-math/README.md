# HỆ THỐNG TOÁN TIỂU HỌC CHẤT LƯỢNG CAO — HỌC VIỆN GITA

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn
*Tư duy xuất sắc — Bản lĩnh dẫn đầu*

Hệ tài liệu toán lớp 3 → lớp 5, hai tuyến, phục vụ mục tiêu thi chất lượng cao và thi
chuyên vào các trường top đầu Hà Nội.

---

## 1. HỆ THỐNG GỒM NHỮNG GÌ

| Hạng mục | Số lượng | Nơi để |
|---|---:|---|
| Cụm chuyên đề (chương) | 96 | `02-chi-muc/` |
| Phiếu học 90 phút | 600 | `03-phieu/` |
| Phiếu Lời giải & Phân tích chuyên sâu | 600 | `03-phieu/` |
| Phiếu Hướng dẫn ôn chắc chuyên đề | 96 | `03-phieu/` |
| Phiếu ôn tập mốc · Đề thi mốc · Đề đánh giá năng lực | 12 · 120 · 30 | `07-de-thi/` |
| Bản đồ kiến thức theo kỳ | 9 | `06-ban-do-kien-thuc/` |
| Bộ test đầu vào bốn trục | 3 | `08-test-dau-vao/` |
| **Tổng tài liệu** | **1458** | |

**Cấu trúc bất biến của mọi phiếu học:** 90 phút · thang 100 · 5 phần × 5 bài ×
4–10 ý · 115–170 ý một phiếu.

**Chuỗi sáu buổi của một cụm:** `LT` Lý thuyết → `DB` Dạng bài & Đọc vị →
`KN` Kỹ năng & Phương pháp → `NC` Luyện nâng cao → `OT` Ôn thi → `TH` Thi chương.
Mỗi buổi kèm một phiếu `GP` lời giải; mỗi cụm có một phiếu `HD` hướng dẫn ôn chắc.

## 2. ĐÃ BIÊN SOẠN XONG

**Đủ 1 296 tài liệu**, tất cả đều qua kiểm định tự động theo Chuẩn biên soạn phiếu v2.0.

Kho được dựng bằng **bộ sinh nội dung** (`04-cong-cu/sinh/` và `04-cong-cu/lap/`) theo
một nguyên tắc bất di bất dịch: **mọi đáp số do mã tính ra, không do người gõ**. Thư
viện có 162 mẫu bài phủ kín 8 nhóm chuyên đề × 5 mức × 3 lớp; mỗi mẫu tự chọn số liệu,
tự tính đáp số, và mang sẵn hướng giải, nhãn tư duy, lỗi thường gặp, gợi ý ba tầng, sáu
cột bảng phân tích chuyên sâu và một bài tương tự.

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
| Lớp 3 | 200 phiếu học + 232 phiếu kèm | 8,9 MB |
| Lớp 4 | 200 phiếu học + 232 phiếu kèm | 9,9 MB |
| Lớp 5 | 200 phiếu học + 232 phiếu kèm | 10,0 MB |

Địa chỉ ba bản ghi tại `09-online/dia-chi-ban.json`.

Tệp nguồn: `09-online/app.html` · dữ liệu: `09-online/data/gita-data-L{3,4,5}.json` ·
bản xuất bản: `09-online/dist/gita-online-L{3,4,5}.html`

Dữ liệu web thay mọi câu lặp lại bằng tham chiếu vào một **bảng chuỗi dùng chung** và
tách dòng bảng Markdown thành ô, nhờ đó nhỏ đi hơn hai lần; trang đọc bằng `JSON.parse`
kèm hàm reviver nên dựng xong trong khoảng 0,6 giây.

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
│   │                     ngân hàng 540 dạng bài, bản đồ, đề thi, phân quyền
│   ├── sinh/             Thư viện 162 mẫu bài tự tính đáp số, theo tám nhóm
│   ├── lap/              Bộ lắp mẫu bài thành phiếu, phiếu GP và phiếu HD
│   └── templates/        Khuôn phiếu và quy trình biên soạn một cụm
├── 05-lo-trinh/          Kế hoạch sản xuất
├── 06-ban-do-kien-thuc/  9 bản đồ HK1 · HK2 · cả năm cho ba lớp
├── 07-de-thi/            162 đề: ôn tập mốc, thi mốc, đánh giá năng lực
├── 08-test-dau-vao/      Test bốn trục cho học sinh mới + công cụ xếp lớp
└── 09-online/            Hệ thống làm bài trực tuyến
```

## 5. BỘ CÔNG CỤ — CHẠY THEO ĐÚNG THỨ TỰ NÀY

| Lệnh | Việc |
|---|---|
| `python3 04-cong-cu/build_index.py` | Sinh chỉ mục 1 296 tài liệu |
| `python3 04-cong-cu/build_taxonomy.py` | Sinh taxonomy 96 cụm × 540 dạng bài |
| `python3 04-cong-cu/build_chuan_phieu.py` | Sinh Chuẩn biên soạn phiếu v2.0 |
| `python3 04-cong-cu/build_ban_do.py` | Sinh 9 bản đồ kiến thức |
| `python3 04-cong-cu/build_de_thi.py` | Sinh chỉ mục 162 đề thi |
| `python3 04-cong-cu/build_phan_quyen.py` | Sinh tài liệu phân quyền và bảo mật |
| `python3 04-cong-cu/kiem_tra_mau.py` | Kiểm định 162 mẫu bài × mọi lớp × 300 hạt giống |
| `python3 04-cong-cu/sinh_kho.py` | **Sinh trọn kho 1 296 tài liệu** (`--ghi-de` để dựng lại) |
| `python3 04-cong-cu/validate_phieu.py --all` | Kiểm định từng phiếu theo chuẩn v2.0 |
| `python3 04-cong-cu/kiem_toan.py` | **Kiểm toán toàn hệ thống — 12 nhóm, 35 hạng mục** |
| `python3 04-cong-cu/render_html.py --all` | Kết xuất bản in A4: bản ĐỀ và bản ĐÁP ÁN |
| `python3 04-cong-cu/build_web_data.py --lop 4` | Đóng gói dữ liệu online cho một khối lớp |
| `python3 04-cong-cu/build_artifact.py --lop 4` | Ghép thành một trang tự chứa để xuất bản |
| `python3 04-cong-cu/sinh_logo.py` | Dựng lại sáu tệp logo SVG từ hình học tính toán |
| `python3 04-cong-cu/xep_lop.py --lop 4 --N 20 --K 18 --P 16 --T 22 --tuan 7` | Xếp lớp từ test đầu vào |

**Quy tắc vàng:** mọi thứ sinh ra từ `04-cong-cu/data/`. Muốn sửa chương trình thì sửa
dữ liệu nguồn rồi chạy lại bộ sinh, **không sửa tay tệp đã sinh**.

## 6. ĐỌC THEO VAI TRÒ

| Bạn là | Đọc theo thứ tự này |
|---|---|
| **Giám đốc / chủ đầu tư** | `00-thuong-hieu/01` → `01-kien-truc/01` → `05-lo-trinh/ke-hoach-san-xuat.md` |
| **Chủ biên học liệu** | `01-kien-truc/02` chuẩn biên soạn → `04-cong-cu/sinh/khung.py` → một tệp `04-cong-cu/sinh/mau_*.py` → cụm chuẩn vàng `GITA-T1-L4-C03-*` |
| **Giáo viên đứng lớp** | `01-kien-truc/06` khung giáo án → `06-ban-do-kien-thuc/` → phiếu `HD` của cụm đang dạy |
| **Coach kèm học viên** | `00-thuong-hieu/02` mô thức GITA → `01-kien-truc/04` ma trận năng lực |
| **Tư vấn tuyển sinh** | `08-test-dau-vao/00-huong-dan-test-dau-vao.md` |
| **Quản trị hệ thống** | `01-kien-truc/07-phan-quyen-va-bao-mat.md` — đọc kỹ mục ranh giới bảo mật |

## 7. BA ĐIỀU PHẢI BIẾT TRƯỚC KHI DÙNG THẬT

**7.1. Bản online chưa dùng để thi thật được.** Đây là một trang chạy trên máy người xem;
phân quyền trong trang ngăn được nhầm lẫn nhưng không ngăn được người cố tình mở công cụ
nhà phát triển. Thi thật dùng bản in, hoặc chờ triển khai hệ thống có máy chủ theo lộ
trình ở `01-kien-truc/07`, mục 6 lớp 3.

**7.2. Ma trận phân quyền đang là thiết kế đề xuất.** Cần đối chiếu với quy định quyền
hiện hành của **GITA365** và chỉnh cho khớp trước khi áp dụng. Việc này ghi ở
`01-kien-truc/07`, mục 9.

**7.3. Kho do máy dựng cần một vòng duyệt của người.** Mọi đáp số đã do mã tính ra và
đã qua kiểm định tự động, nhưng **lời văn và độ phù hợp sư phạm** của 1 284 tài liệu
sinh tự động thì máy không tự đánh giá được. Trước khi phát cho học viên, chủ biên nên
đọc duyệt theo thứ tự: phiếu `TH` của từng cụm → phiếu `NC` → phần V của mọi phiếu. Cụm
chuẩn vàng `GITA-T1-L4-C03` là thước đo để so.
