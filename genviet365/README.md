# GEN VIỆT 365 — hệ thống huấn luyện nhân tài

Ứng dụng trình bày **toàn bộ** hệ thống GEN VIỆT 365 của Học viện GITA: kiến trúc, giáo
trình, mô hình chi hội, bộ đo, biểu mẫu, dữ liệu và lộ trình 30 năm (2026 – 2056).

**8 nhóm · 45 màn.** Không cần cài gì, không có bước dựng.

Bản viết đầy đủ:
- [`../docs/GEN_VIET_365.md`](../docs/GEN_VIET_365.md) — kiến trúc
- [`../docs/GEN_VIET_365_VAN_HANH.md`](../docs/GEN_VIET_365_VAN_HANH.md) — sổ tay vận hành

## Chạy

Mở thẳng `genviet365/index.html`, hoặc:

```bash
npx http-server -p 8099 -s .
```

## Gộp thành một tệp để gửi đi

```bash
node genviet365/dong-goi-artifact.cjs [đường-dẫn-ra]
```

Sinh ra một trang tự chứa (CSS và sáu tệp JS nhúng sẵn, chỉ còn phông chữ gọi ra ngoài)
để đăng làm Artifact, gửi qua thư hoặc mở trên máy không có kho mã. Tệp gộp là **bản sinh
ra** — không sửa tay; sửa xong nguồn thì gộp lại.

## Bản đồ tệp

| Tệp | Giữ gì |
|---|---|
| `du-lieu.js` | Lõi kiến trúc: 7 nguyên lý · 7 lớp · hộ chiếu · 6 bậc · 4 trụ × 12 trục × 5 mức · 5 phẩm chất · nhịp 365 · 5 hình thái · mô hình chi hội · 4 môi trường · băng màu · KPI · mã hoá · vai · tài chính · 7 rủi ro · 6 chặng · 90 ngày đầu · nguồn |
| `du-lieu-daotao.js` | Lộ trình từng bậc (chu kỳ 90 ngày) · khoá nền 8 buổi · 24 chuyên đề · thiết kế trại và 21 ngày hậu trại · bộ test đầu vào · đào tạo ban điều hành |
| `du-lieu-vanhanh.js` | Lịch năm 52 tuần · sổ tay 6 vai · sổ tay 3 môi trường · cổng nghiệm thu 100 điểm · 4 báo cáo · 14 biểu mẫu · an toàn và đạo đức · năm đầu tiên |
| `du-lieu-kythuat.js` | Cấu trúc hộ chiếu JSON · 5 luật ghi dữ liệu · 12 bảng lưu · 9 đường máy chủ · 10 quyền · 7 nguyên tắc dựng phần mềm |
| `man-hinh.js` | `GV.NHOM` (8 nhóm điều hướng) · `GV.MAN` (45 màn, mỗi màn là danh sách KHỐI) · `GV.TU` (bảng tra nối khối tới dữ liệu) |
| `giao-dien.js` | Lớp dựng: ~30 loại khối · vỏ ứng dụng · định tuyến theo hash · nhớ màn đang đọc |
| `style.css` | Bảng màu lấy từ nhận diện GITA · kiểu chữ · bố cục · sáng và tối |
| `index.html` | Vỏ — nạp phông rồi nạp sáu tệp JS theo đúng thứ tự |
| `dong-goi-artifact.cjs` | Gộp tất cả thành một trang tự chứa |

## Quy tắc

**Dữ liệu ở `du-lieu*.js`, màn ở `man-hinh.js`, hàm ở `giao-dien.js`.**

- Thêm một mục nội dung → sửa `du-lieu*.js`.
- Thêm một màn → thêm vào `GV.NHOM` và `GV.MAN`, trỏ khối tới khoá trong `GV.TU`.
- Chỉ sửa `giao-dien.js` khi cần một **loại khối** chưa từng có.

Cùng quy ước với hệ thống GITA 365 v8: không thư viện ngoài, mọi chuỗi đi vào HTML đều qua
`e()`, tên tệp và tên biến bằng tiếng Việt không dấu.

## Trước khi phát hành

```bash
node --check genviet365/*.js
```

Rồi mở thử toàn bộ 45 màn ở cả hai chế độ sáng và tối, và ở khổ điện thoại — bộ kiểm cần
bắt được ba thứ: màn dựng ra quá ngắn, khối thiếu loại, và trang tràn ngang.
