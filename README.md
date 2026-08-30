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

## 2. Hệ thống học liệu 8 lớp

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

## 3. Ngân hàng đề

- **Bộ 100 đề luyện thi mỗi khối** (6 · 7 · 8 · 9) — tổng **400 đề**, chia theo mức độ
  Cơ bản (60 đề) · Nâng cao (30 đề) · Chuyên–CLC (10 đề).
- **Đề cương** giữa kỳ I/II, cuối kỳ I/II, cả năm, ôn hè.
- **Đề thi Học sinh giỏi** vòng trường và vòng huyện/quận.
- **Bộ luyện theo chuyên đề** cho từng chuyên đề.

Tổng cộng **432 đề** / **7.884 câu hỏi**, mỗi mã đề sinh ra một bộ câu hỏi riêng, sinh từ
**175 khuôn câu hỏi tham số hoá** phủ kín 4 mức độ nhận thức và 4 loại câu hỏi.

**Cách hoạt động:** câu hỏi được sinh từ *khuôn tham số hoá* (`src/bank/`). Mỗi khuôn tự sinh
số liệu, đáp án, **lời giải từng bước**, phân tích tư duy và cảnh báo bẫy. Mỗi mã đề gắn với
một hạt giống cố định nên **cùng một mã đề luôn cho cùng một bộ câu hỏi**, còn các mã đề
khác nhau cho các bộ câu hỏi khác nhau.

## 4. Ma trận đề & cách chấm (theo chuẩn Bộ GD&ĐT)

| Loại câu | Cách chấm |
|---|---|
| Trắc nghiệm nhiều lựa chọn | Đúng trọn điểm, sai 0 điểm |
| Trắc nghiệm đúng/sai (4 ý) | 1 ý đúng 10% · 2 ý 25% · 3 ý 50% · 4 ý 100% |
| Trả lời ngắn | So khớp đáp số sau chuẩn hoá (chấp nhận nhiều cách viết: `3/4`, `0.75`, `0,75`…) |
| Tự luận | Chấm theo thang rubric từng ý |

Điểm được quy về **thang 10**, xếp loại theo Thông tư 22.

## 5. Hai chế độ làm bài

| Chế độ | Mục đích | Đặc điểm |
|---|---|---|
| **Luyện tập** (`/luyen-tap`) | Để **hiểu bài** | Không bấm giờ; chấm và hiện lời giải ngay sau **mỗi câu**; chọn chuyên đề và mức độ |
| **Thi** (`/bo-de`) | Để **đo năng lực** | Bấm giờ, tự lưu bài đang làm, nộp xong mới xem lời giải và phân tích |

Nguyên tắc GITA: luyện tập đến khi tỉ lệ đúng ≥ 85% rồi mới chuyển sang chế độ thi.

## 6. Sổ tay lỗi sai

Trang **Sổ tay lỗi sai** (`/so-tay`) tự động gom mọi câu đã làm sai **theo dạng bài**
(chứ không theo từng câu riêng lẻ), xếp theo tần suất sai giảm dần, kèm:

- Lời giải chi tiết và phân tích tư duy của từng câu đã sai
- Nút **Luyện lại đúng dạng đó** và **Đọc lại Sơ đồ đọc vị bài**
- Quy trình 4 bước chữa lỗi theo phương pháp GITA
- In được để kẹp vào vở

## 7. Đánh giá chất lượng & định hướng cải thiện

Sau mỗi bài, hệ thống không chỉ trả về điểm mà còn phân tích:

- Tỉ lệ đúng theo **4 mức độ nhận thức** (NB · TH · VD · VDC) và theo **từng chuyên đề, từng dạng bài**.
- **Điểm mạnh / lỗ hổng** cụ thể, kèm chẩn đoán nguyên nhân (mất nền tảng, đọc đề vội, thiếu thời gian…).
- **Kế hoạch cải thiện có thứ tự ưu tiên**: làm gì trước, làm gì sau, mỗi việc kèm hành động cụ thể.
- **Khoảng cách tới mốc 9+** và nhận xét về nhịp độ làm bài.

## 8. Lộ trình học tập 3 giai đoạn

`Giai đoạn 1 — Nền tảng` → `Giai đoạn 2 — Chuyên đề nâng cao` → `Giai đoạn 3 — Luyện đề & Tổng ôn`

Mỗi khối có lộ trình riêng chia thành các mốc theo tuần, mỗi mốc có mục tiêu, chuyên đề,
**sản phẩm đầu ra kiểm chứng được** và **ngưỡng điểm để được chuyển mốc**.

## 9. Tài khoản & phân quyền

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

## 10. Kho tài liệu chuẩn nhận diện GITA

Trang **Thư viện** sinh tài liệu in được (A4, có tiêu đề GITA, đánh số câu, trang đáp án):

- **Phiếu bài tập theo chuyên đề** — chọn khối, chuyên đề, mức độ, số câu → sinh phiếu mới bất kỳ lúc nào, kèm lời giải chi tiết.
- **Sơ đồ tư duy tổng hợp** toàn khối.
- **Bảng công thức điểm 10**.
- **Đề cương ôn tập** theo cấu trúc chuẩn.

## 11. Chạy dự án

```bash
npm install     # cài phụ thuộc
npm run dev     # chạy ở http://localhost:3000
npm run build   # kiểm tra kiểu + đóng gói vào dist/
npm run preview # xem bản đã đóng gói
```

Yêu cầu: Node.js 18+. Dự án dùng **React 19 + TypeScript + Vite**, không phụ thuộc dịch vụ ngoài.

## 12. Cấu trúc mã nguồn

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

## 13. Về lưu trữ dữ liệu

Bản này lưu dữ liệu học tập trên trình duyệt (localStorage) để hệ thống chạy độc lập,
không cần máy chủ. Lớp `src/lib/store.ts` đóng vai trò kho dữ liệu — khi triển khai máy chủ
thật, chỉ cần thay phần thân các hàm trong tệp này bằng lời gọi API, toàn bộ giao diện giữ nguyên.

---

<div align="center">
<sub>MATHGITA — Trung tâm GITA · Chuẩn Chương trình GDPT 2018 · Ma trận đề theo Bộ GD&ĐT</sub>
</div>
