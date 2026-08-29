# MATH365 · GITA365

Nền tảng luyện Toán ba luồng, xây quanh **mô thức huấn luyện GITA** và cơ chế **KPI 90% để thăng cấp**.

| Luồng | Đích đến |
| --- | --- |
| **Luồng 1 · Chuyên Toán** | Đỗ chuyên Toán KHTN, Hà Nội – Amsterdam, Chu Văn An, Nguyễn Tất Thành, Chuyên Sư phạm |
| **Luồng 2 · Vào 10 · 9–10 điểm** | Toán tuyển sinh lớp 10 Hà Nội đạt 9 đến 10 điểm |
| **Luồng 3 · THPT 10–12** | Top 1 tổng kết môn Toán lớp 10–11–12 và trên 9 điểm Toán thi đại học |

---

## Mô thức GITA

| | Trụ cột | Nội dung |
| --- | --- | --- |
| **G** | **Goal** | Hệ thống mục tiêu ba tầng: năm → giai đoạn → tuần; kết quả xuất sắc được định lượng |
| **I** | **Inspirits** | Động lực, khát khao, niềm tin, bản lĩnh — nội lực để đi hết lộ trình |
| **T** | **Talent** | Điểm mạnh, sở trường, tốc độ, tập trung, tư duy xuất sắc — nhận diện bằng dữ liệu rồi khuếch đại |
| **A** | **Action / Academy** | Hành động quyết đoán – kiên trì – sáng tạo – cẩn thận – tối ưu theo quy tắc 20/80, trong môi trường thi đua và nhóm bạn xuất sắc |

Mô thức xuyên suốt mọi tầng: thư mục tài liệu, quy trình, giải pháp, chiến lược, thói quen — và được triển khai vào ba môi trường **gia đình – nhà trường – xã hội**.

---

## Quy mô nội dung

| Hạng mục | Số lượng |
| --- | --- |
| Phiếu luyện | **2.000** (600 chuyên · 600 vào 10 · 800 THPT 10–12) |
| Nhiệm vụ | **2.000** (1 nhiệm vụ ↔ 1 phiếu, có KPI và điều kiện mở khoá riêng) |
| Câu hỏi sinh ra | **16.000** (8 câu/phiếu, mỗi câu có lời giải từng bước) |
| Dạng bài tham số hoá | **64** bộ sinh đề |
| Chuyên đề | 56, phân theo 10 mạch kiến thức và 5 tầng hấp thu |
| Thư mục tài liệu | 408 thư mục · 1.097 đầu tài liệu bổ trợ |
| Ma trận đề | 7 kỳ thi / trường |
| Bí kíp · thói quen · phương pháp | 30 · 8 · 8 |
| Vai trò phân quyền | 8 vai trò (4 học sinh · 3 giáo viên · 1 quản trị) |

### Vì sao 2.000 phiếu được sinh chứ không gõ tay

Mỗi phiếu được dựng từ các **bộ sinh đề tham số hoá** với hạt giống cố định (`Rng` – mulberry32):

- **Đáp án luôn đúng** vì được tính từ tham số, không phải chép tay.
- **Làm lại là đề mới** — không thể học thuộc đáp án, nhưng vẫn đúng dạng và đúng mức độ.
- **Tái lập được**: cùng mã phiếu luôn cho cùng nội dung ở mọi máy.
- Các phương án nhiễu được xây từ **lỗi sai điển hình**, nên việc chọn sai nói lên nguyên nhân — đó là dữ liệu đầu vào cho phần chẩn đoán.

Chạy `npm run smoke` để sinh toàn bộ 16.000 câu và kiểm tra tính hợp lệ.

---

## Vòng lặp luyện tập

```
Nhận nhiệm vụ → Phần 1 Khởi động → Phần 2 Luyện chuẩn → Phần 3 Thử thách
      → Nộp bài → Chấm tự động → Báo KPI tổng & từng phần
      → Nhận xét tình hình (sai kỹ năng nào, vì sao)
      → Giải pháp tối ưu (việc cụ thể cần làm)
      → Định hướng: làm lại đề mới | nhiệm vụ tiếp | thử thách | nâng Level
```

**Quy tắc thăng cấp**

- Đạt **KPI ≥ 90%** ở **2 phiếu** cùng mức độ → mở khoá **Level** kế tiếp.
- Đạt chuẩn ở **15 nhiệm vụ** của một giai đoạn, với KPI trung bình 5 lượt gần nhất ≥ 90% → mở khoá **Giai đoạn** mới.

---

## Phân quyền

Tám vai trò trong ba nhóm, gắn với năm cấp độ chuyên môn P1 → P5 (tư vấn viên → trợ giảng → giáo viên → coach → master coach).

> **Cảnh báo bảo mật:** phân quyền trong bản này được thực thi ở phía trình duyệt, chỉ phục vụ việc định hình trải nghiệm và quy trình nghiệp vụ. Khi triển khai thật, **mọi kiểm tra quyền bắt buộc phải được thực hiện lại ở phía máy chủ**.

---

## Chạy dự án

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # typecheck + build production
npm run typecheck
npm run smoke      # sinh và kiểm tra toàn bộ 2.000 phiếu / 16.000 câu
```

Không cần API key hay dịch vụ ngoài. Toàn bộ tiến độ học tập được lưu trong `localStorage` của trình duyệt.

## Cấu trúc mã nguồn

```
src/
  data/            Nội dung học thuật & cấu hình hệ thống
    schools.ts       10 mạch kiến thức + 10 kỳ thi/trường
    blueprints.ts    7 ma trận đề chi tiết kèm chiến thuật phòng thi
    topics.ts        Cây chuyên đề luồng chuyên & vào 10
    topics-qg.ts     Cây chuyên đề THPT lớp 10–12
    generators.ts    Bộ sinh đề luồng chuyên & vào 10
    generators-qg.ts Bộ sinh đề luồng THPT 10–12
    catalog.ts       15 giai đoạn · 2.000 phiếu · 2.000 nhiệm vụ
    questions.ts     Bài mẫu viết tay có lời giải và barem
    gita.ts          Mô thức GITA, tầng hấp thu, cấp chuyên môn, môi trường
    library-tree.ts  Kiến trúc thư mục tài liệu
    playbook.ts      Kho bí kíp, thói quen, phương pháp học
    roles.ts         Ma trận phân quyền
    brand.ts         Bộ nhận diện GITA365 / MATH365
  lib/
    rng.ts           Bộ sinh ngẫu nhiên có hạt giống + tiện ích số học
    engine.ts        Chấm điểm, chẩn đoán, định hướng, thăng cấp
    roadmap.ts       Sinh lộ trình cá nhân hoá
    auth.ts          Kiểm tra quyền phía client
    storage.ts       Lưu trạng thái vào localStorage
  pages/           14 trang giao diện
  components/      Thư viện UI + biểu đồ SVG tự vẽ
```

---

## Lưu ý về tính chính xác của thông tin kỳ thi

Cấu trúc đề, ngưỡng điểm và quy chế trong ứng dụng được tổng hợp từ đề thi chính thức, đề tham khảo và thông tin tuyển sinh các năm gần đây. **Quy chế và định dạng đề có thể thay đổi giữa các mùa thi.** Trước mỗi mùa thi, hãy đối chiếu với công bố chính thức của Bộ GD&ĐT, Sở GD&ĐT Hà Nội hoặc chính trường dự thi — các đường dẫn nguồn có sẵn trong trang *Kỳ thi & Cấu trúc đề*.
