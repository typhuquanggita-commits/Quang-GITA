# Bộ nhận diện ENGWIN365

File `.png` trong thư mục này **không được commit** — chúng là sản phẩm dựng ra từ
dữ liệu. Bản `.svg` thì có commit vì đó là bản gốc vector.

## Dựng lại

```bash
apt-get install -y librsvg2-bin fonts-inter    # một lần
node tools/make-brand.mjs                      # 59 SVG + 59 PNG, vài giây
```

```bash
node tools/make-brand.mjs --only level    # chỉ dựng lại huy hiệu cấp độ
node tools/make-brand.mjs --svg-only      # bỏ bước xuất PNG
```

Nhóm dựng được: `logo` · `tier` · `level` · `podcast` · `diagram` · `card`.

## Có gì trong này

| Thư mục | Số file | Nội dung |
|---------|---------|----------|
| `logo/` | 9 | Dấu hiệu, nằm ngang, xếp dọc, chữ đơn — bản nền tối và nền sáng, kèm favicon |
| `tier/` | 5 | Huy hiệu năm tầng của tháp học tập |
| `level/` | 25 | Huy hiệu 25 cấp độ, sinh từ `data/levels.ts` |
| `podcast/` | 6 | Bìa series + bìa năm định dạng, 3000×3000 chuẩn Apple Podcasts |
| `diagram/` | 4 | Tháp học tập · quỹ đạo 36 tháng · sơ đồ nối âm · bảng 12 nguyên âm |
| `card/` | 10 | Thẻ trích dẫn, bản vuông 1080 và bản dọc 1080×1920 |

## Nguyên tắc: không vẽ tay

Mọi ấn phẩm sinh ra từ dữ liệu trong `data/`:

- Thêm một cấp độ vào `data/levels.ts` → chạy lại là có thêm huy hiệu.
- Đổi một mã màu trong `data/brand.ts` → toàn bộ 59 file đổi theo.
- Thêm một định dạng podcast vào `content/podcast-scripts.json` → có thêm ảnh bìa.

Nhờ vậy bộ nhận diện không bao giờ lệch khỏi nội dung. Không có chuyện huy hiệu ghi
tên cũ trong khi cấp độ đã đổi tên.

## Font

Cần **Inter** (`apt-get install -y fonts-inter`) cho tiêu đề và nội dung, và
**DejaVu Sans** cho ký hiệu IPA. Cả hai đều hỗ trợ đầy đủ dấu tiếng Việt.

## Phần phải thuê người

Ảnh chụp người thật không dựng được bằng máy. Bản brief cho nhiếp ảnh gia — luật
chụp và danh sách cảnh — nằm trong tab **Nhận diện** của ứng dụng, mục cuối.
