# GITA 365 — CÁCH LÀM

Một trang. Mọi việc thường ngày đều nằm ở đây.

---

## Một lệnh cho mọi lần cập nhật

```bash
node tools/phat-hanh.js          # đóng gói và kiểm, chưa đẩy
node tools/phat-hanh.js --day    # kiểm xong thì commit và đẩy luôn
```

Nó tự làm đủ sáu việc, dừng ngay khi có việc nào hỏng:

| | Việc | Ý nghĩa |
|---|---|---|
| 1 | Mã hoá lại kho | Giữ nguyên khoá — giấy phép đã cấp vẫn dùng được |
| 2 | Sinh tệp nạp khoá | Cho máy chủ cấp phép |
| 3 | Thử máy chủ cấp phép | 18 phép kiểm với `ROLES` thật của v6.9, không cần mạng |
| 4 | Dựng bản một tệp | Để gửi khách xem thử |
| 5 | Bộ kiểm phát hành | 80+ màn hình × 19 vai, chống tiêm mã, phạm vi cấp phép |
| 6 | Soát tài sản | Không để lọt kho gốc, bộ khoá hay giấy phép lên kho mã |

Thêm `--day` thì commit và đẩy, CI dựng bộ cài Windows mới trong khoảng
90 giây. Đặt lời commit bằng `GITA_LOI="…"` nếu muốn.

> Muốn kiểm cả bước 3 thì trỏ tới mã nguồn v6.9 một lần:
> `export GITA_V69=/đường/dẫn/GITA365_v69/src`

---

## Đưa lên mạng — làm một lần

### 1. Chuyển kho mã sang riêng tư

`Settings → Danger Zone → Change repository visibility → Make private`

Việc duy nhất phải bấm tay. GitHub không mở API cho việc này.

### 2. Nạp khoá vào máy chủ cấp phép

```bash
node tools/tao-nap-khoa.js
```

Rồi trên Apps Script: **Project Settings → Script Properties → Add script property**

| | |
|---|---|
| Property | `GITA_KHOA_KHO` |
| Value | dán toàn bộ nội dung `giay-phep/GITA_KHOA_KHO.txt` |

**Save script properties.** Xong — không có mã nào phải dán rồi xoá, nên
không có nguy cơ quên xoá.

### 3. Dán máy chủ cấp phép

Dán `server/GITA_CapPhep.gs` vào dự án Apps Script (cùng chỗ `00_Config.gs`),
lưu. Hai hàm nối vào `02_Security.gs` đã viết sẵn, không phải sửa gì.

**Deploy → New deployment → Web app** · Execute as **Me** · Who has access
**Anyone** → chép URL kết thúc bằng `/exec`.

### 4. Nối hai đầu

Sửa đúng một dòng trong `cau-hinh.js`:

```js
G.API_CAP_PHEP = 'https://script.google.com/macros/s/…/exec';
```

### 5. Đưa bản web lên Cloudflare Pages

```
dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
  Nhánh            : claude/gita-365-ui-design-xew4bz
  Build command    : (để trống)
  Output directory : /
```

Tiêu đề bảo mật và các đường dẫn bị chặn đã nằm sẵn trong `_headers` và
`_redirects` — Cloudflare tự đọc.

---

## Diễn tập trước khi đụng vào Google và Cloudflare

```bash
node tools/gia-lap-trien-khai.js
```

Dựng ngay tại máy một máy chủ cấp phép chạy **chính** `server/GITA_CapPhep.gs`
và một bản web phục vụ kèm đúng `_headers` và `_redirects`, rồi tự kiểm cả
ba mặt. Sai chỗ nào sửa tại máy, không phải triển khai đi triển khai lại.

Điểm *"chạy trên HTTPS"* luôn trượt khi diễn tập — bản thật trên Cloudflare
sẽ đạt.

## Kiểm bản thật sau khi triển khai

```bash
node tools/kiem-trien-khai.js \
  https://script.google.com/macros/s/…/exec \
  https://gita365.pages.dev
```

Chạy từ ngoài vào, đúng như một người lạ trên internet nhìn thấy:

- **A · Máy chủ cấp phép** — sống, đã nạp đủ bảy gói, và token bịa **không**
  được cấp khoá
- **B · Bản web** — lên đúng, đủ năm tiêu đề bảo mật, cài được như ứng dụng,
  chạy được khi mất mạng
- **C · Tài sản** — bộ khoá, `kho-goc/`, `giay-phep/`, `tools/`, `server/`
  đều không phục vụ ra ngoài; gói `.enc` tải về được nhưng không đọc nổi

Thay cho bảng bảy dòng phải tự soi bằng mắt.

---

## Cấp giấy phép cho đội ngũ

Một người:

```bash
node tools/tao-giay-phep.js "Coach Minh" 12 nen nghe tang1 tang2
```

Cả nhóm, từ một tệp CSV:

```csv
# tên,số tháng,gói được cấp
Coach Minh,12,nen nghe tang1 tang2
Tư vấn Lan,12,nen nghe
Phụ huynh Hà,6,nen tang1
Cộng tác viên Nam,6,nen
```

```bash
node tools/tao-giay-phep.js --danh-sach doi-ngu.csv
```

Gõ sai tên gói thì **dừng dòng đó**, không bao giờ im lặng cấp toàn bộ.

Mỗi tệp mang số hiệu và dấu truy nguồn riêng — bản nào rò ra ngoài là biết
của ai. Gửi đúng một tệp cho đúng một người.

**Người nhận:** mở ứng dụng máy tính → **Trợ giúp → Nạp giấy phép** → chọn tệp.

---

## Khi nghi rò rỉ

```bash
node tools/ma-hoa-kho.js --doi-khoa     # đổi toàn bộ khoá
node tools/tao-giay-phep.js --danh-sach doi-ngu.csv   # cấp lại cho mọi người
node tools/phat-hanh.js --day           # đóng gói và phát hành lại
```

Rồi nạp lại `GITA_KHOA_KHO` trên Apps Script. Mọi bản sao cũ chết ngay.

Muốn khoá cửa tức thì mà chưa kịp làm gì: trên Apps Script chạy `xoaBoKhoa()`
— máy chủ trả lỗi `NOKEY` cho tới khi nạp lại.

---

## Ba việc chờ quyết định của chủ hệ thống

Không phải lỗi kỹ thuật — cần người quyết:

1. **Chuyển kho mã sang riêng tư** (mục 1 ở trên).
2. **Điền pháp nhân vào `LICENSE` và `NOTICE`**: tên đầy đủ Học viện GITA,
   mã số thuế, địa chỉ. Bản quyền chỉ đòi được khi có pháp nhân đứng tên.
3. **Chốt ngưỡng chuyển tuyến chuyên môn y tế — tâm lý** bằng số, để hệ
   thống tự nhắc tư vấn dừng lại và chuyển tuyến.
