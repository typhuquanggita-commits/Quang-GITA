# ENGWILL365

**Hệ thống học tiếng Anh cá nhân hoá — từ số 0 đến IELTS 8.0 trong 36 tháng.**

> ENGlish + WILL + 365 — Tiếng Anh không phải tài năng, là Ý CHÍ nhân với 365 ngày.

Một ứng dụng web trình bày trọn vẹn một hệ thống học tiếng Anh 3 năm: lộ trình theo cột
mốc, thư viện phương pháp đã kiểm chứng, chuỗi bài giảng, bài luyện hằng ngày, bí kíp,
kiến trúc thói quen, lập trình tư duy, hệ thống câu lạc bộ và cơ chế kiểm định.

## Cá nhân hoá — tab **Kế hoạch của tôi**

Trả lời 13 câu (~5 phút), hệ thống tính lại lộ trình bằng **phép toán giờ học**
lấy từ chính quỹ đạo trong `data/system.ts`, không phải bằng lời động viên:

- **Cột mốc xuất phát** — theo trình độ thật, bỏ qua những mốc bạn đã vượt
- **Số giờ còn thiếu & số tháng thật sự cần** — `(giờ đích − giờ đã có) ÷ quỹ ngày`
- **Phán quyết khả thi** — Dư dả / Vừa khít / Căng / **Không khả thi**, kèm ba đòn bẩy
  có số cụ thể (tăng lên bao nhiêu phút · giãn thêm bao nhiêu tháng · mức band thực tế đạt được)
- **Nguyên mẫu người học** — chấm điểm từ 12 phát biểu hành vi, ra siêu năng lực + điểm mù
- **Phân bổ 4 trụ cột** — chỉnh theo nguyên mẫu (người đọc được đẩy Đầu ra, người
  giao tiếp được đẩy Ghi nhớ…)
- **Nhịp Ngày Đủ / Ngày Bận** — xếp vào đúng khung giờ đỉnh bạn chọn, tổng khớp
  chính xác quỹ thời gian bạn khai
- **10 việc/ngày rút gọn** theo quỹ thật (45 phút → còn 7 việc)
- **Bộ tài liệu đã lọc** theo trình độ + ngân sách + kiểu học, kèm danh sách tạm loại bỏ
- **Rủi ro riêng** — ngân sách 0đ làm hở Luật số 4, không nói to được ở nhà,
  đã bỏ dở ≥ 3 lần, mục tiêu lệch quỹ thời gian… mỗi rủi ro kèm cách bịt cụ thể

Câu trả lời lưu trong `localStorage` của trình duyệt, không gửi đi đâu.

> Bộ máy này được thiết kế để **nói thẳng**. Ví dụ thật: mất gốc + mục tiêu 8.0 +
> hạn 12 tháng + 45 phút/ngày → *"Cần khoảng 52 tháng nhưng bạn chỉ có 12 tháng —
> chênh gấp 4,3 lần. Không có phương pháp nào rút ngắn được khoảng cách này, vì
> tiếp thu ngôn ngữ bị chặn bởi số giờ tiếp xúc chứ không bởi kỹ thuật."*

---

Hệ thống có **hai tầng**. Tầng **La Bàn** trả lời *vì ai và vì sao*. Tầng
**Lộ trình** trả lời *làm gì và làm thế nào*. Thiếu tầng thứ nhất, tầng thứ hai
chỉ là một thời khoá biểu — và thời khoá biểu nào cũng bị bỏ ở tháng thứ tư.

## Tầng 1 — LA BÀN (hiến chương cá nhân, viết ở ngôi thứ nhất)

| # | Mục | Nội dung |
|---|-----|----------|
| 01 | **Tại sao** | 3 tầng lý do + quy trình khai vấn 25 phút ◆ |
| 02 | **Kết quả xuất sắc** | 5 bậc: điểm thi → năng lực thật → tài sản → bằng chứng công khai → tác động |
| 03 | **Con người tôi trở thành** | Tuyên bố bản sắc + 7 đặc tính, mỗi đặc tính có "làm gì dưới áp lực" |
| 04 | **Chiến lược** | 6 cược chiến lược, mỗi cược có đánh đổi và điều kiện chứng minh nó SAI |
| 05 | **Kế hoạch rèn luyện** | Ngày (3 phiên bản: Đủ 105′ / Bận 35′ / Tệ 2′) · Tuần · Tháng |
| 06 | **10 việc quan trọng** | 3 danh sách × 10 việc, xếp theo ưu tiên, đánh dấu bắt buộc |
| 07 | **KPI** | 10 chỉ số dẫn/trễ, mỗi chỉ số có **lằn đỏ** + 5 chỉ số cố tình KHÔNG đo |
| 08 | **Tư duy 20/80** | 7 nước đi chiếm ~80% khác biệt, mỗi cái có tình huống kích hoạt |
| 09 | **Quy tắc thành công** | 12 quy tắc, mỗi quy tắc kèm điều khoản xử lý khi lỡ |
| 10 | **Phương pháp khác biệt** | 8 điều làm khác số đông: "phần lớn người học" vs "tôi làm" |
| 11 | **Điểm mạnh của tôi** | Tự kiểm 7 câu ◆ + 6 nguyên mẫu người học, mỗi loại có siêu năng lực & điểm mù |

◆ = mục chỉ bạn mới trả lời được; hệ thống cung cấp bản nháp mạnh + quy trình để bạn thay thế.

Kết thúc bằng **Tuyên ngôn** 8 dòng — in ra, dán lên bàn học.

## Tầng 2 — LỘ TRÌNH

| Phần | Số lượng | Mô tả |
|------|----------|-------|
| **Lộ trình** | 12 cột mốc | Mỗi mốc 13 tuần, có tên riêng, một ý tưởng lớn, nhịp tuần cụ thể, cổng thoát và danh sách bẫy |
| **Phương pháp** | 28 | Từ Krashen, Ericsson, Bjork, Dweck, Clear, Arguelles, Lewis, Nation… — đã sàng lọc cho người Việt |
| **Bài giảng** | 268 bài / 10 chuỗi | Foundation · Fluency · Academic · IELTS · Mindset |
| **Luyện tập** | 31 bài luyện | Mỗi bài có mục tiêu, các bước, dấu hiệu thành công, đường nâng cấp |
| **Bí kíp** | 24 chiến thuật | Bí mật + nước đi + bằng chứng + phản mẫu |
| **Tài liệu** | 37 nguồn | Phân theo xương sống / hỗ trợ / tuỳ chọn, kèm hướng dẫn dùng ở tháng nào |
| **Thói quen** | 12 thói quen · 6 nghi thức | Tín hiệu → hành vi → phần thưởng, kèm phiên bản 2 phút |
| **Tư duy** | 10 mô-đun | Câu chuyện cũ ✕ → câu chuyện mới ✓ + nghi thức thực hành |
| **Club** | 7 câu lạc bộ | Kèm luật vận hành và kịch bản cho người dẫn |
| **Kiểm định** | 12 cổng | Không đạt thì lặp lại 4 tuần, không đi tiếp |

## Quỹ đạo

```
Tháng  0 ──── 12 ──── 24 ──── 36
Band  0.0    5.0     6.5     8.0
CEFR  Pre-A1  B1      B2+     C1+
Từ     300   3.000   6.800  10.000
Input    0h    450h  1.080h  1.800h
```

## Chạy ứng dụng

**Yêu cầu:** Node.js 18+

```bash
npm install
npm run dev      # mở http://localhost:3000
```

```bash
npm run build    # build production vào dist/
npm run preview  # xem thử bản build
```

Ứng dụng chạy hoàn toàn tĩnh — không cần API key, không gọi mạng.

## Cấu trúc mã nguồn

```
data/                  Toàn bộ nội dung hệ thống, tách khỏi giao diện
  profile.ts           13 câu hỏi + bộ máy suy dẫn kế hoạch cá nhân (hàm thuần)
  charter.ts           LA BÀN — 11 mục hiến chương cá nhân + tuyên ngôn
  system.ts            Hiến chương: 5 luật, 7 trụ cột, quỹ đạo, ngân sách thời gian
  roadmap.ts           12 cột mốc × 36 tháng
  methods.ts           28 phương pháp
  drills.ts            31 bài luyện
  lectures.ts          10 chuỗi bài giảng · 268 bài
  playbooks.ts         24 bí kíp
  resources.ts         37 tài liệu
  habits.ts            12 thói quen + 6 nghi thức
  mindset.ts           10 mô-đun lập trình tư duy
  clubs.ts             7 câu lạc bộ + 12 cổng kiểm định

components/engwill/    Một component cho mỗi tab
types.ts               Kiểu dữ liệu lõi
docs/ENGWILL365.md     Sổ tay vận hành — bản rút gọn để dùng hằng ngày
```

Nội dung nằm hoàn toàn trong `data/` dưới dạng dữ liệu có kiểu. Muốn cá nhân hoá lộ
trình — đổi nhịp tuần, thêm tài liệu, sửa mục tiêu — chỉ cần sửa file dữ liệu tương ứng;
giao diện tự cập nhật theo.

## Bắt đầu từ đâu

1. Mở ứng dụng, vào tab **Kế hoạch của tôi**, trả lời 13 câu (~5 phút). Trả lời
   thật, kể cả khi khó nghe — chọn trình độ hoặc quỹ thời gian cao hơn thực tế
   chỉ khiến kế hoạch sụp ở tuần thứ ba.
2. Sang tab **La Bàn**. Dành 45 phút viết cho xong **mục 01 (Tại sao)**
   và **mục 11 (Điểm mạnh)** bằng câu trả lời thật của bạn — đây là hai mục quyết
   định bạn có đi hết 3 năm hay không.
3. Đọc [`docs/ENGWILL365.md`](docs/ENGWILL365.md) — sổ tay vận hành, 10 phút.
4. Sang tab **Lộ trình**, mở đúng cột mốc xuất phát mà hệ thống đã tính cho bạn.
5. Làm đúng buổi học của ngày mai.

Hệ thống này là một bản thiết kế, không phải một lời hứa. Nó chỉ tạo ra kết quả khi được
vận hành mỗi ngày.
