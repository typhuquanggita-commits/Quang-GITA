# GEN VIỆT 365 — bản thiết kế kiến trúc

Trang trình bày kiến trúc **hệ thống huấn luyện nhân tài GEN VIỆT 365**, tầm nhìn
30 năm (2026 – 2056), của Học viện GITA.

Bản viết đầy đủ: [`../docs/GEN_VIET_365.md`](../docs/GEN_VIET_365.md)

## Chạy

Không cần cài gì, không có bước dựng. Mở thẳng:

```
genviet365/index.html
```

Hoặc phục vụ qua máy chủ tĩnh nếu muốn:

```bash
npx http-server -p 8099 -s .
```

## Gộp thành một tệp để gửi đi

```bash
node genviet365/dong-goi-artifact.cjs [đường-dẫn-ra]
```

Sinh ra một trang tự chứa (CSS và JS nhúng sẵn, chỉ còn phông chữ gọi ra ngoài) để
đăng làm Artifact, gửi qua thư hoặc mở trên máy không có kho mã. Tệp gộp là **bản sinh
ra** — không sửa tay, sửa xong nguồn thì gộp lại.

## Bản đồ tệp

| Tệp | Giữ gì |
|---|---|
| `du-lieu.js` | **Toàn bộ kiến trúc.** 7 nguyên lý · 7 lớp · 6 bậc · 4 trụ × 12 trục · 5 phẩm chất · 5 hình thái · mô hình chi hội · 4 môi trường · 7 rủi ro · 6 chặng 30 năm |
| `giao-dien.js` | Lớp dựng — 18 màn nội dung, mỗi màn một hàm trả về chuỗi HTML |
| `style.css` | Bảng màu (lấy từ nhận diện GITA), kiểu chữ, bố cục · sáng và tối |
| `index.html` | Vỏ — nạp phông, `du-lieu.js`, rồi `giao-dien.js` |
| `dong-goi-artifact.cjs` | Gộp bốn tệp trên thành một trang tự chứa |

**Quy tắc: dữ liệu ở `du-lieu.js`, trình bày ở `giao-dien.js`.** Đổi nội dung kiến trúc
thì chỉ sửa `du-lieu.js`; thứ tự các phần nằm ở `GV.MUC_LUC` và ở hàm `dung()`.

Cùng quy ước với hệ thống GITA 365 v8: không thư viện ngoài, mọi chuỗi đi vào HTML đều
qua `e()`, tên tệp và tên biến bằng tiếng Việt không dấu.
