# ENGWILL365

**Hệ thống học tiếng Anh cá nhân hoá — từ số 0 đến IELTS 8.0 trong 36 tháng.**

> ENGlish + WILL + 365 — Tiếng Anh không phải tài năng, là Ý CHÍ nhân với 365 ngày.

Một ứng dụng web trình bày trọn vẹn một hệ thống học tiếng Anh 3 năm: lộ trình theo cột
mốc, thư viện phương pháp đã kiểm chứng, chuỗi bài giảng, bài luyện hằng ngày, bí kíp,
kiến trúc thói quen, lập trình tư duy, hệ thống câu lạc bộ và cơ chế kiểm định.

## Hệ thống gồm gì

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

1. Đọc [`docs/ENGWILL365.md`](docs/ENGWILL365.md) — sổ tay vận hành, 10 phút.
2. Mở ứng dụng, vào tab **Lộ trình**, chọn cột mốc **Y1Q1**.
3. Làm đúng buổi học của ngày mai.

Hệ thống này là một bản thiết kế, không phải một lời hứa. Nó chỉ tạo ra kết quả khi được
vận hành mỗi ngày.
