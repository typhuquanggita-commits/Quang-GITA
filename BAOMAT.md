# Bảo mật và mật khẩu — ENGWIN365

Tài liệu này nói rõ hệ thống bảo vệ cái gì, bằng cách nào, và **cái gì nó
không bảo vệ được**. Phần cuối cùng quan trọng nhất.

---

## 1. Điều cần biết trước tiên: mật khẩu trên web tĩnh là bảo mật giả

Bản web của ENGWIN365 là một trang tĩnh. Toàn bộ mã và nội dung được gửi
xuống trình duyệt của người xem trước khi có bất cứ đoạn mã nào chạy.

Nghĩa là: **nếu đặt một màn hình đăng nhập viết bằng JavaScript ngay trong
trang, bất cứ ai cũng có thể bỏ qua nó** — chỉ cần mở công cụ nhà phát triển,
hoặc tải thẳng tệp `.js`, là đọc được toàn bộ nội dung mà không cần mật khẩu.
Điều này đúng với mọi trang tĩnh, không riêng gì ứng dụng này.

Vì vậy chúng tôi **không** làm màn hình đăng nhập giả trong bản web. Thay vào
đó có hai cơ chế thật, cho hai hoàn cảnh khác nhau:

| | Bản web | Bản máy tính (Windows) |
|---|---|---|
| Chặn người lạ | Xác thực ở **tầng máy chủ** — chặn trước khi tệp được gửi đi | Không cần: tệp nằm trên máy bạn |
| Bảo vệ hồ sơ cá nhân | Không lưu hồ sơ | **Mã hoá AES-256-GCM** bằng mã khoá của bạn |
| Mã khoá lưu ở đâu | — | **Không lưu ở đâu cả** |

---

## 2. Bản máy tính: két dữ liệu mã hoá

Hồ sơ học tập nằm trong thư mục dữ liệu ứng dụng, trong hai tệp:

- `vault.json` — muối ngẫu nhiên 32 byte + một chuỗi xác minh đã mã hoá
- `profile.enc` — hồ sơ của bạn, đã mã hoá

**Mã khoá không được lưu ở bất cứ đâu, kể cả trên máy bạn.** Cách kiểm tra mã
khoá đúng hay sai là: dẫn xuất khoá từ mã bạn nhập, rồi thử giải mã chuỗi xác
minh. Đúng thì giải mã được, sai thì không. Không có bản sao mã khoá nào để
so sánh, nên cũng không có gì để lấy trộm.

Cụ thể:

- **Dẫn xuất khoá:** scrypt với `N = 2^17`, `r = 8`, `p = 1`. Chọn scrypt vì
  nó tốn cả bộ nhớ lẫn thời gian, khiến việc dò mã bằng card đồ hoạ hay phần
  cứng chuyên dụng đắt hơn nhiều so với các hàm băm thông thường.
- **Mã hoá:** AES-256-GCM. Đây là mã hoá có xác thực: nếu ai đó sửa một byte
  trong tệp, lần đọc sau sẽ báo lỗi thay vì trả về dữ liệu sai lặng lẽ.
  Điều này đã được kiểm chứng bằng bài kiểm tra tự động.
- **Quyền tệp:** `0600` — chỉ chủ sở hữu đọc được.
- **Chống dò:** sau ba lần nhập sai, mỗi lần thử tiếp theo phải chờ lâu dần,
  tối đa 30 giây.
- **Khoá tự động:** đóng cửa sổ là khoá lại, khoá bị xoá khỏi bộ nhớ.

> **Mất mã khoá là mất hồ sơ.** Không có cửa hậu, không có mã khôi phục,
> không có cách nào chúng tôi lấy lại giúp bạn. Đó chính là điều kiện để dữ
> liệu thật sự riêng tư. Hãy ghi mã khoá vào một trình quản lý mật khẩu.

### Yêu cầu với mã khoá

- Từ 8 ký tự trở lên
- Có ít nhất một chữ cái và một chữ số
- Không phải một ký tự lặp lại, không nằm trong danh sách mã dễ đoán

### Quyền tệp khác nhau giữa Windows và Linux — và vì sao vẫn đủ

Trên Linux và macOS, hai tệp của két được ghi với quyền `0600`: chỉ chủ sở hữu
đọc được.

Trên Windows **không có mode bit**. Node chỉ ánh xạ được duy nhất thuộc tính
chỉ-đọc, và `fs.stat` luôn trả về `0666` dù `chmod` đặt gì. Nói cách khác, lời
gọi `chmod(0600)` trong mã nguồn **không có tác dụng trên Windows** — và tài
liệu này nói thẳng điều đó thay vì để người đọc tưởng là có.

Cái bảo vệ thật trên Windows là danh sách kiểm soát truy cập của NTFS mà thư mục
hồ sơ người dùng truyền xuống. Két nằm trong `%APPDATA%\ENGWIN365`, tức dưới
`C:\Users\<tên>`, và thư mục đó mặc định chỉ cấp quyền cho chính người dùng,
cho SYSTEM và cho nhóm quản trị. Một người dùng thường khác trên cùng máy không
đọc được. Đây là mức tương đương với `0600` trên POSIX — nơi `root` cũng đọc
được tất.

Ở cả hai hệ, quyền tệp chỉ là **lớp phòng thủ thứ hai**. Lớp thứ nhất là mã hoá
AES-256-GCM với khoá dẫn xuất bằng scrypt: lấy được tệp mà không có mã khoá thì
vẫn không đọc được gì.

Bài kiểm `desktop/vault.test.cjs` kiểm đúng cơ chế của từng hệ, không đòi
Windows một thứ hệ điều hành đó không có.

---

## 3. Bản máy tính: cách ly tiến trình

| Thiết lập | Giá trị | Ý nghĩa |
|---|---|---|
| `contextIsolation` | `true` | Mã của trang không chạm được vào Node |
| `nodeIntegration` | `false` | Trang không có `require`, không có `process` |
| `sandbox` | `true` | Tiến trình hiển thị chạy trong hộp cát Chromium |
| `webviewTag` | `false` | Không nhúng được trang khác |

Trang chỉ nói chuyện với két qua đúng **chín kênh IPC đã khai báo sẵn**. Không
có kênh động — trang không thể gọi một kênh không nằm trong danh sách.

Nội dung được phục vụ qua giao thức riêng `app://engwin` thay vì `file://`.
Có hai lý do: ES module không nạp được qua `file://` (gốc của trang là `null`,
vi phạm chính sách cùng nguồn), và một gốc thật làm cho `'self'` trong CSP có
nghĩa. Bộ xử lý giao thức chặn mọi đường dẫn thoát ra ngoài thư mục `dist` —
kể cả dạng mã hoá `%2e%2e`, đã được kiểm chứng bằng bài kiểm tra tự động.

CSP áp dụng:

```
default-src 'self'; script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline'; img-src 'self' data:;
connect-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'none'
```

Ứng dụng **không gọi ra Internet**. Không có yêu cầu mạng nào trong bản dựng —
điều này đã được kiểm chứng bằng cách chạy bản dựng trong trình duyệt và ghi
lại mọi yêu cầu. Quyền hệ thống duy nhất được cấp là micro, dùng cho khối
PHẢN XẠ.

---

## 4. Bản web: xác thực ở tầng máy chủ

Nếu bạn muốn giới hạn ai xem được bản web, phải chặn **trước khi** máy chủ gửi
tệp đi. Dưới đây là ba cách, chọn một tuỳ nơi bạn đặt trang.

### Netlify — `_headers` + Identity

Đặt tệp `dist/_headers`:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: no-referrer
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; frame-ancestors 'none'
```

Rồi bật **Netlify Identity** và đặt `Site settings → Access control →
Visitor access → Password protection`. Việc chặn xảy ra ở máy chủ Netlify.

### Cloudflare Pages — Cloudflare Access

Bật **Zero Trust → Access → Applications**, thêm ứng dụng trỏ tới tên miền
của bạn, đặt chính sách theo địa chỉ thư điện tử hoặc theo miền tổ chức.
Người chưa đăng nhập không nhận được một byte nào của trang.

### Máy chủ riêng — nginx với xác thực cơ bản

```nginx
server {
    listen 443 ssl http2;
    server_name engwin.gita365.vn;

    root /var/www/engwin365/dist;
    index index.html;

    auth_basic           "ENGWIN365";
    auth_basic_user_file /etc/nginx/.htpasswd-engwin;

    add_header X-Frame-Options        DENY              always;
    add_header X-Content-Type-Options nosniff           always;
    add_header Referrer-Policy        no-referrer       always;
    add_header Strict-Transport-Security "max-age=31536000" always;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Tạo tệp mật khẩu:

```bash
htpasswd -B -c /etc/nginx/.htpasswd-engwin quang   # -B = bcrypt
```

Xác thực cơ bản chỉ an toàn khi chạy trên HTTPS — nếu không, mật khẩu đi qua
mạng dưới dạng gần như bản rõ.

---

## 4b. Bốn lỗ hổng đã bịt trong đợt rà soát

Bốn chỗ dưới đây từng có thật trong kho này. Mỗi chỗ nay có bài kiểm giữ —
`npm run test:baomat` đọc thẳng mã nguồn, không tin lời khai.

| Lỗ hổng | Trước | Nay |
|---|---|---|
| CSP cho script nội tuyến | `script-src 'self' 'unsafe-inline'` trong khi bản dựng không có script nội tuyến nào | `script-src 'self'`; bài kiểm **đếm** script nội tuyến để giữ điều kiện đó |
| Bản web không có CSP | không có thẻ meta nào, và không máy chủ nào đặt hộ | mang chính sách trong thẻ meta của `index.html` |
| Quyền `media` mở cả camera | `cb(permission === 'media')` — `media` gộp micro **và** webcam | xét `mediaTypes`: chỉ nhận khi có audio và không có video, chặn ở **cả hai cửa** |
| Đổi mã khoá mất hồ sơ khi mất điện | ghi `vault.json` bằng khoá mới trước, mã hoá lại hồ sơ sau | dàn hai bản mới rồi đổi tên theo thứ tự cố định, kèm luật phục hồi |
| Chờ chống dò mã về không khi tắt ứng dụng | đếm trong biến của tiến trình | đếm trong `vault.json`, tắt mở lại không xoá được |

### Vì sao KHÔNG khoá vĩnh viễn sau N lần sai

Nhiều hệ thống xoá dữ liệu sau mấy lần nhập sai. Ở đây **không** làm thế, và đó
là lựa chọn có chủ ý: bản máy tính không có máy chủ, không có đường khôi phục,
nên khoá vĩnh viễn nghĩa là một đứa trẻ nghịch bàn phím xoá được cả hồ sơ ba năm
của anh chị nó. Thay vào đó thời gian chờ tăng luỹ thừa tới trần 30 giây và
không bao giờ tự về không.

Hàng rào thật vẫn là **scrypt N=2¹⁷**: mỗi lần thử tốn vài trăm mili giây CPU, kể
cả khi kẻ tấn công bỏ qua ứng dụng và tấn công thẳng vào tệp trên đĩa — chỗ mà
mọi thời gian chờ trong ứng dụng đều vô nghĩa.

### Ghi nguyên tử và phục hồi sau mất điện

Mọi lần ghi xuống két đều qua tệp tạm → `fsync` → đổi tên. Đổi tên là thao tác
nguyên tử trên cùng phân vùng: hoặc tệp cũ còn nguyên, hoặc tệp mới đã đủ, không
có trạng thái ở giữa. `fs.writeFileSync` thẳng lên tệp đích thì mất điện giữa
chừng làm AES-GCM từ chối giải mã **cả tệp** — mất hồ sơ vĩnh viễn, không phải
mất một phần.

Đổi mã khoá chạm hai tệp nên không đổi tên cùng lúc được. Luật phục hồi quyết
định được, không đoán:

- còn `profile.enc.new` → chưa đổi tên tệp nào → **lùi lại**, xoá hai tệp dàn sẵn
- chỉ còn `vault.json.new` → hồ sơ đã sang khoá mới → **tiến tới**, đổi nốt tên

Và nếu hồ sơ đang hỏng thì hệ thống **từ chối đổi mã khoá** — đổi lúc đó là chôn
vĩnh viễn một tệp có thể vẫn cứu được bằng mã cũ.

## 4c. Phân quyền: chỗ nào là thật, chỗ nào không

Nói thẳng để không ai hiểu nhầm:

- **Trên bản web, phân quyền KHÔNG phải bảo mật.** Vai nằm trong bộ nhớ trình
  duyệt; ai mở công cụ nhà phát triển cũng đổi được. Nó ngăn **nhầm lẫn** — người
  tư vấn không mở nhầm màn hình chấm bài — chứ không ngăn được người cố ý.
- **Trên bản máy tính, vai nằm trong két đã mã hoá.** Muốn đổi phải mở được két,
  tức là phải có mã khoá. Đây là chỗ **duy nhất** phân quyền có hàng rào thật, và
  nó chỉ tồn tại vì bản máy tính có két.
- **Hiệu lực đầy đủ cần máy chủ:** vai gắn với phiên đăng nhập, và **mọi** thao
  tác đọc ghi đều kiểm lại vai ở phía máy chủ, không tin bất cứ điều gì trình
  duyệt gửi lên. `data/phanquyen.ts` là bản thiết kế cho tầng đó, không phải bản
  thay thế nó.

## 5. Những gì hệ thống này KHÔNG bảo vệ

Nói thẳng để bạn không tin nhầm:

1. **Không chống được người đã có quyền vào máy bạn khi két đang mở.** Khi đã
   mở khoá, khoá nằm trong bộ nhớ. Đóng ứng dụng khi rời máy.
2. **Không chống được phần mềm ghi phím.** Nếu máy đã nhiễm mã độc, mã khoá
   bị ghi lại lúc bạn gõ.
3. **Không mã hoá bản web.** Bản web không lưu hồ sơ cá nhân; nếu bạn cần hồ
   sơ được mã hoá, hãy dùng bản máy tính.
4. **Không có đồng bộ giữa các máy.** Két nằm trên đúng một máy. Đây là lựa
   chọn có chủ ý: đồng bộ đòi hỏi máy chủ, và máy chủ là thứ có thể bị xâm
   nhập.
5. **Tệp cài đặt chưa được ký số.** Windows SmartScreen sẽ cảnh báo khi cài
   lần đầu. Muốn hết cảnh báo phải mua chứng thư ký mã (code-signing
   certificate) và ký lại tệp `.exe`.

---

## 6. Cách tự kiểm chứng

Đừng tin tài liệu này — chạy lại các bài kiểm tra:

```bash
npm run test:vault    # 36 phép thử két: mã hoá, đổi mã, chống sửa đổi, quyền tệp
npm run test:desktop  # 19 phép thử bản máy tính: cách ly, IPC, chặn thoát thư mục
```
