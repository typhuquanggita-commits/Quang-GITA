<div align="center">

# MATHGITA

**Hệ thống Web App luyện Toán THCS 6 – 9 của Trung tâm GITA**
_Học hiểu tận gốc · Mục tiêu 9+ điểm_

</div>

---

## 1. MATHGITA là gì

MATHGITA chuẩn hoá toàn bộ giáo án GITA (MATH TIỂU HỌC GITA · MATH365 · CHUYÊN · CLC)
thành một hệ thống học liệu trực tuyến hoàn chỉnh cho khối 6, 7, 8, 9, bám sát
**Chương trình GDPT 2018** và **ma trận đề kiểm tra của Bộ GD&ĐT**.

Học sinh học lý thuyết → đọc vị dạng bài → luyện tập trực tiếp trên web → được chấm điểm
tự động → xem lời giải chi tiết → nhận phân tích chất lượng và **lộ trình cải thiện cá nhân hoá**.

## 2. Giáo án GITA số hoá

Toàn bộ chương trình được tổ chức theo **đúng cách GITA đang dạy**, số hoá từ bộ giáo án gốc
của trung tâm (thư mục Drive `MATHC2 / Giáo Án`):

```
CHƯƠNG  →  BUỔI HỌC (S1, S2, S3+S4…)  →  PHIẾU CƠ BẢN (lớp {khối}CB)
                                       →  PHIẾU NÂNG CAO (lớp {khối}NC)
```

Trang **Giáo án** (`/giao-an`) hiển thị đầy đủ **31 chương · 93 buổi học · 186 phiếu bài tập**,
mỗi buổi có mục tiêu, nội dung phiếu cơ bản, nội dung phiếu nâng cao, và liên kết trực tiếp tới
chuyên đề tương ứng để học lý thuyết và luyện tập ngay.

## 3. Hệ thống học liệu 8 lớp

Mỗi chuyên đề được biên soạn theo một chuẩn thống nhất:

| Lớp học liệu | Nội dung |
|---|---|
| **Lý thuyết** | Kiến thức trọng tâm, công thức phải thuộc, lưu ý và bẫy thường gặp, ví dụ minh hoạ |
| **Sơ đồ đọc vị bài** | Bảng “dấu hiệu trong đề → hành động giải → vì sao”, giúp học sinh biết phải làm gì ngay khi đọc đề |
| **Dạng bài** | Phương pháp giải theo bước, kỹ năng cần rèn, lỗi sai thường gặp |
| **Ví dụ mẫu có phân tích tư duy** | Không chỉ trình bày lời giải mà giải thích *vì sao nghĩ ra bước đó* |
| **Kỹ năng & phương pháp luyện bài** | Quy trình làm bài, kỹ thuật tính nhanh, cách trình bày lấy trọn điểm |
| **Sơ đồ tư duy tổng hợp** | Hệ thống hoá kiến thức theo chuyên đề và theo học kỳ |
| **Bài vận dụng – vận dụng cao** | Phần quyết định để chạm mốc 9+ |
| **Cẩm nang công thức điểm 10** | Mỗi thẻ gồm: công thức · điều kiện · dùng khi nào · bẫy |

### Quy mô học liệu

| Hạng mục | Số lượng |
|---|---|
| Chương · Buổi học · Phiếu bài tập | **31** · **93** · **186** |
| Chuyên đề (khối 6–9) | **31** |
| Khối lý thuyết · Yêu cầu cần đạt | 74 · 94 |
| Quy tắc “đọc vị bài” | **132** |
| Sơ đồ tư duy | 31 theo chuyên đề + **8 theo học kỳ** |
| Dạng bài · Ví dụ mẫu có phân tích tư duy | **117** · **119** |
| Bước phương pháp · Bộ kỹ năng luyện bài | 359 · 44 |
| Thẻ Cẩm nang công thức điểm 10 | **86** |
| Chuyên đề HSG · Kỹ thuật lõi · Bài mẫu | **19** · **68** · **31** |
| Mốc lộ trình học tập | 24 |
| Khuôn câu hỏi tham số hoá | **268** |
| Bài hình tự luận nhiều ý (có thang điểm) — khối 7 · 8 · 9 | **6** · **5** · **6** |
| Đề · Câu hỏi sinh ra | **432** · **7.884** |

## 4. Ngân hàng đề

- **Bộ 100 đề luyện thi mỗi khối** (6 · 7 · 8 · 9) — tổng **400 đề**, chia theo mức độ
  Cơ bản (60 đề) · Nâng cao (30 đề) · Chuyên–CLC (10 đề).
- **Đề cương** giữa kỳ I/II, cuối kỳ I/II, cả năm, ôn hè.
- **Đề thi Học sinh giỏi** vòng trường và vòng huyện/quận.
- **Bộ luyện theo chuyên đề** cho từng chuyên đề.

Tổng cộng **432 đề** / **7.884 câu hỏi**, mỗi mã đề sinh ra một bộ câu hỏi riêng, sinh từ
**268 khuôn câu hỏi tham số hoá** phủ kín 4 mức độ nhận thức và 4 loại câu hỏi.

**Cách hoạt động:** câu hỏi được sinh từ *khuôn tham số hoá* (`src/bank/`). Mỗi khuôn tự sinh
số liệu, đáp án, **lời giải từng bước**, phân tích tư duy và cảnh báo bẫy. Mỗi mã đề gắn với
một hạt giống cố định nên **cùng một mã đề luôn cho cùng một bộ câu hỏi**, còn các mã đề
khác nhau cho các bộ câu hỏi khác nhau.

## 5. Ma trận đề & cách chấm (theo chuẩn Bộ GD&ĐT)

| Loại câu | Cách chấm |
|---|---|
| Trắc nghiệm nhiều lựa chọn | Đúng trọn điểm, sai 0 điểm |
| Trắc nghiệm đúng/sai (4 ý) | 1 ý đúng 10% · 2 ý 25% · 3 ý 50% · 4 ý 100% |
| Trả lời ngắn | So khớp đáp số sau chuẩn hoá (chấp nhận nhiều cách viết: `3/4`, `0.75`, `0,75`…) |
| Tự luận | Chấm theo thang rubric từng ý |

Điểm được quy về **thang 10**, xếp loại theo Thông tư 22.

## 6. Hai chế độ làm bài

| Chế độ | Mục đích | Đặc điểm |
|---|---|---|
| **Luyện tập** (`/luyen-tap`) | Để **hiểu bài** | Không bấm giờ; chấm và hiện lời giải ngay sau **mỗi câu**; chọn chuyên đề và mức độ |
| **Thi** (`/bo-de`) | Để **đo năng lực** | Bấm giờ, tự lưu bài đang làm, nộp xong mới xem lời giải và phân tích |

Nguyên tắc GITA: luyện tập đến khi tỉ lệ đúng ≥ 85% rồi mới chuyển sang chế độ thi.

## 7. Sổ tay lỗi sai

Trang **Sổ tay lỗi sai** (`/so-tay`) tự động gom mọi câu đã làm sai **theo dạng bài**
(chứ không theo từng câu riêng lẻ), xếp theo tần suất sai giảm dần, kèm:

- Lời giải chi tiết và phân tích tư duy của từng câu đã sai
- Nút **Luyện lại đúng dạng đó** và **Đọc lại Sơ đồ đọc vị bài**
- Quy trình 4 bước chữa lỗi theo phương pháp GITA
- In được để kẹp vào vở

## 8. Đánh giá chất lượng & định hướng cải thiện

Sau mỗi bài, hệ thống không chỉ trả về điểm mà còn phân tích:

- Tỉ lệ đúng theo **4 mức độ nhận thức** (NB · TH · VD · VDC) và theo **từng chuyên đề, từng dạng bài**.
- **Điểm mạnh / lỗ hổng** cụ thể, kèm chẩn đoán nguyên nhân (mất nền tảng, đọc đề vội, thiếu thời gian…).
- **Kế hoạch cải thiện có thứ tự ưu tiên**: làm gì trước, làm gì sau, mỗi việc kèm hành động cụ thể.
- **Khoảng cách tới mốc 9+** và nhận xét về nhịp độ làm bài.

## 9. Lộ trình học tập 3 giai đoạn

`Giai đoạn 1 — Nền tảng` → `Giai đoạn 2 — Chuyên đề nâng cao` → `Giai đoạn 3 — Luyện đề & Tổng ôn`

Mỗi khối có lộ trình riêng chia thành các mốc theo tuần, mỗi mốc có mục tiêu, chuyên đề,
**sản phẩm đầu ra kiểm chứng được** và **ngưỡng điểm để được chuyển mốc**.

## 10. Tài khoản & phân quyền

| Vai trò | Quyền |
|---|---|
| **Khách** | Xem giới thiệu, học thử một phần |
| **Học sinh ngoài** | Lý thuyết, sơ đồ, dạng bài NB–TH, 3 đề luyện mỗi khối |
| **Học sinh GITA** (đóng phí) | Toàn bộ học liệu + VD/VDC + 100 đề/khối + đề cương + HSG + cẩm nang + nhiệm vụ về nhà + báo cáo |
| **Giáo viên GITA** | Toàn quyền học liệu + giao nhiệm vụ về nhà + báo cáo chất lượng lớp |
| **Quản trị viên** | Quản lý tài khoản, lớp học, gói học phí, toàn hệ thống |

### Tài khoản trải nghiệm (mật khẩu chung: `gita2026`)

| Email | Vai trò |
|---|---|
| `hs9@gita.edu.vn` | Học sinh GITA lớp 9 |
| `free@gita.edu.vn` | Học sinh ngoài |
| `teacher@gita.edu.vn` | Giáo viên |
| `admin@gita.edu.vn` | Quản trị viên |

## 11. Kho tài liệu chuẩn nhận diện GITA

Trang **Thư viện** sinh tài liệu in được (A4, có tiêu đề GITA, đánh số câu, trang đáp án):

- **Phiếu bài tập theo đúng mẫu gốc GITA** — đầu trang “HỌC VIỆN PHÁT TRIỂN TOÀN CẦU — GITA”,
  khối thông tin Giáo viên / Ngày / Họ tên học sinh / Lớp (6CB, 6NC…) / Mục tiêu, hộp tiêu đề
  “PHIẾU CƠ BẢN” hoặc “PHIẾU NÂNG CAO”, phần **TÓM TẮT LÝ THUYẾT**, các **THỬ THÁCH 1…n**,
  phần **VỀ ĐÍCH**, trang đáp án và khẩu hiệu *“TÔI TỰ TIN CHINH PHỤC 10 ĐIỂM TOÁN, TÔI YÊU TOÁN”*.
- **Sơ đồ tư duy tổng hợp** toàn khối.
- **Bảng công thức điểm 10**.
- **Đề cương ôn tập** theo cấu trúc chuẩn.
- **Tuyển tập bài hình tự luận nhiều ý** cho cả ba khối 7 · 8 · 9 — mỗi bài 3–4 ý theo đúng
  cấu trúc câu hình của đề học kì và đề tuyển sinh, kèm phân tích tư duy, lời giải đầy đủ và
  thang điểm chi tiết:
  - **Khối 7** (6 bài): tam giác bằng nhau, tam giác cân, đường trung trực, ba đường phân giác
    đồng quy — thang điểm 3,5 điểm theo chuẩn câu hình đề học kì.
  - **Khối 8** (5 bài): tam giác đồng dạng, hệ thức trong tam giác vuông, định lí Thalès,
    hình bình hành — thang điểm 5,0 điểm.
  - **Khối 9** (6 bài): biên soạn theo bộ “Thách thức tài năng Toán 9” của GITA, đúng cấu trúc
    câu hình đề tuyển sinh vào 10 — thang điểm 5,0 điểm.

## 12. Nguồn tư liệu biên soạn

Toàn bộ học liệu được biên soạn lại từ kho tư liệu gốc của GITA trên Google Drive, rồi
chuẩn hoá về bộ nhận diện và cấu trúc thống nhất của MATHGITA. Không sao chép nguyên văn:
mỗi dạng bài trong tài liệu gốc được chuyển thành một **khuôn câu hỏi tham số hoá**, tự sinh
đề, đáp án, lời giải từng bước, phân tích tư duy và bẫy thường gặp.

| Khối | Tài liệu gốc | Nội dung rút ra |
|---|---|---|
| 6 | Giáo án GITA theo chương – buổi (phiếu CB/NC) | 31 chương · 93 buổi · 186 phiếu, mẫu phiếu chuẩn |
| 6 | *Đề cương học kì 1 Toán 6 – KNTT* | Tổng luỹ thừa chia hết, chữ số tận cùng, ƯCLN–BCNN ngược, dạng “đều thiếu”, tích hai thừa số, chứng minh chia hết bằng tổ hợp tuyến tính |
| 7 | *Đề cương học kì I Toán 7* (Archimedes) | Số thập phân tuần hoàn, tìm x chứa căn, phương trình tích, cực trị chứa giá trị tuyệt đối, biểu đồ quạt/đoạn thẳng, 6 câu hình 4 ý |
| 7 | *Đề cương giữa kì 1 Toán 7 – KNTT*, phiếu nâng cao GITA “Hai tam giác bằng nhau” | Dãy tỉ số có hệ số, làm tròn, hai dạng chứng minh tam giác bằng nhau |
| 8 | *Đề cương ôn tập cuối kì II Toán 8 – KNTT* | Phương trình có mẫu, lập phương trình (giảm giá, ca nô, chu vi), hệ số góc, xác suất thực nghiệm, hình chóp đều, 5 câu hình đồng dạng |
| 9 | *Đề cương ôn tập học kì II Toán 9* | Viète đảo, dấu hai nghiệm, tương giao có tham số, điểm cố định, căn kép, năng suất vượt mức, vị trí tương đối hai đường tròn, đa giác đều nội tiếp, hình nón |
| 9 | Bộ “Thách thức tài năng Toán 9” của GITA | 6 câu hình thi vào 10 nhiều ý kèm thang điểm |

Các trang tham khảo bên ngoài được nêu trong yêu cầu ban đầu (mathx.vn, toanmath.com,
tailieumontoan.com, hocmai.vn và các nhóm Facebook chuyên đề) **không truy cập được** từ môi
trường biên soạn do chính sách chặn kết nối ra ngoài. Phần tư liệu của các nguồn này đã có sẵn
trong Drive của GITA (ví dụ bộ đề cương MATHX lớp 8) và được sử dụng từ đó.

## 13. Chạy dự án

```bash
npm install     # cài phụ thuộc
npm run dev     # chạy ở http://localhost:3000
npm run build   # kiểm tra kiểu + đóng gói vào dist/
npm run preview # xem bản đã đóng gói
```

Yêu cầu: Node.js 18+. Dự án dùng **React 19 + TypeScript + Vite**, không phụ thuộc dịch vụ ngoài.

## 14. Cấu trúc mã nguồn

```
src/
  brand/        Bộ nhận diện thương hiệu GITA (design tokens + stylesheet)
  types.ts      Mô hình dữ liệu lõi
  lib/
    auth.tsx    Xác thực & phân quyền 5 vai trò
    store.ts    Kho dữ liệu (localStorage — thay bằng API khi có máy chủ)
    grading.ts  Engine chấm điểm theo chuẩn Bộ GD&ĐT
    analytics.ts Engine đánh giá chất lượng & định hướng cải thiện
    exams.ts    Sinh đề theo ma trận
    mathText.tsx Trình kết xuất công thức toán
    rng.ts      Bộ sinh ngẫu nhiên có hạt giống + tiện ích số học
    router.tsx  Định tuyến
  content/      Học liệu: chuyên đề 6–9, cẩm nang công thức, HSG, lộ trình
  bank/         Ngân hàng khuôn câu hỏi tham số hoá theo khối
  components/   Thành phần giao diện dùng chung
  pages/        Các màn hình của ứng dụng
```

## 15. Bộ chuẩn nhận diện thương hiệu GITA

Trang `/nhan-dien` tài liệu hoá quy chuẩn áp dụng thống nhất cho **toàn bộ file** của GITA:

- **Logo**: hai phiên bản nền tối / nền sáng, quy tắc nên – không nên, kích thước tối thiểu khi in.
- **Bảng màu**: 8 màu thương hiệu kèm mã hex và ngữ cảnh sử dụng; 4 màu gắn cố định với 4 mức độ nhận thức.
- **Hệ thống chữ**: chữ chính (Be Vietnam Pro), chữ trích dẫn (Lora), chữ toán học (Cambria Math) và thang cỡ chữ.
- **Quy chuẩn tài liệu in**: cấu trúc 7 phần bắt buộc của mọi phiếu/đề, khổ giấy, cỡ chữ, giãn dòng, mã màu in ấn.
- **Quy chuẩn trình bày bài giải**: 4 khối cố định (Đề bài → Phân tích tư duy → Lời giải → Bẫy thường gặp) và nguyên tắc ngôn ngữ.
- **Quy tắc đặt mã**: cấu trúc mã đề, mã chuyên đề, mã dạng bài, mã khuôn câu hỏi.

## 16. Về lưu trữ dữ liệu

Bản này lưu dữ liệu học tập trên trình duyệt (localStorage) để hệ thống chạy độc lập,
không cần máy chủ. Lớp `src/lib/store.ts` đóng vai trò kho dữ liệu — khi triển khai máy chủ
thật, chỉ cần thay phần thân các hàm trong tệp này bằng lời gọi API, toàn bộ giao diện giữ nguyên.

---

<div align="center">
<sub>MATHGITA — Trung tâm GITA · Chuẩn Chương trình GDPT 2018 · Ma trận đề theo Bộ GD&ĐT</sub>
</div>
