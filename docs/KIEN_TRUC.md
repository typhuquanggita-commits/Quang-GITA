# GITA 365 · KIẾN TRÚC & CÁCH MỞ RỘNG

## Nguyên tắc
**Dữ liệu tách hoàn toàn khỏi giao diện.** Đổi nội dung chỉ sửa `src/data.*.js`.
Không thư viện ngoài, không bước dựng — mở `index.html` là chạy.

```
index.html          → nạp dữ liệu → lớp giao diện → màn hình → lõi ứng dụng
                      (thứ tự thẻ script quan trọng: data.* trước ui.js trước views* trước app.js)
```

## Bản đồ tệp

| Tệp | Giữ gì |
|---|---|
| `src/data.core.js` | 15 vai · bảng PERM · 5 tầng · mô thức G–I–T–A · **5 nhóm điều hướng** · la bàn văn hoá |
| `src/i18n.js` | chuỗi giao diện VI/EN · tên 5 nhóm và 55 mục · la bàn bản tiếng Anh |
| `src/data.map.js` | mô hình *Gia đình vận hành 365*: 5 khoang · 9 vai · băng nền 8 việc · đầu vào/ra · 6 ranh giới |
| `src/data.vault.js` | 42 mô thức · 6 sách · 7 bản đồ A3 · 40 poster · 14 bài học |
| `src/data.scripts.js` | 220 phác đồ · 1.000 kịch bản (mã, tầng, câu mở, câu chốt, điều không làm) |
| `src/data.journey.js` | 10 chân dung thành công · lộ trình 5 chặng |
| `src/data.daisu.js` | 4 cấp đại sứ · 20 nhiệm vụ · 13 quy tắc an toàn |
| `src/data.eco.js` | gia đình · đội ngũ · cú hích · nghi lễ · sự kiện · bảng số · nhiệm vụ theo vai |
| `src/data.language.js` | 9 điểm chạm · 6 nhịp ngôn từ · bảng thay-vì · 3 đoạn thoại mẫu |
| `src/data.reward.js` | 10 cấp độ · cách tích điểm · huy hiệu · quà · **hoa hồng trần 10%** · hành trình người dẫn dắt |
| `src/data.qa.js` | 4 chuyên gia phản biện · chuẩn 1000 điểm · chỉ số hài lòng · tài liệu khách gửi |
| `src/data.brand.js` | nhận diện thương hiệu · biên bản rà soát 6 nhóm |
| `src/data.arch.js` | tầm nhìn 100 năm · **100 tầng giá trị** · chuỗi WOW · chuẩn vận hành |
| `src/data.ai.js` | giới hạn AI theo tầng · KPI định tuyến · rà soát năng lực · lá chắn dữ liệu |
| `src/data.bench.js` | 10 hệ thống lớn · 6 hệ AI châu Á · 12 việc rút ra · 5 điều không lấy |
| `src/data.accounts.js` | ⚠ tài khoản DEMO — **xoá khi nối máy chủ thật** |
| `src/ui.js` | `U.h()` thoát ký tự · biểu tượng · thẻ · ô số · vòng tiến trình · bảng · hộp thoại |
| `src/guard.js` | đóng dấu chìm · chặn sao chép khối lớn · nhận diện quét kho |
| `src/views*.js` | 56 màn hình, mỗi màn là một hàm trả về chuỗi HTML |
| `src/app.js` | trạng thái · phân quyền · cổng vào · khung · định tuyến · trợ lý · PWA |

## Thêm một màn hình

```js
// 1. src/data.core.js — thêm mục vào đúng một trong 5 nhóm
{v:'ma-man', t:'Tên hiển thị', h:'Câu mô tả ngắn', ic:'star', perm:'pro_coach'}

// 2. src/i18n.js — thêm bản tiếng Anh
'ma-man': ['English name', 'English hint'],

// 3. src/views5.js — viết hàm màn hình
G.VIEWS['ma-man'] = function(){
  if(!G.can('pro_coach')) return U.lockCard();   // chốt quyền lớp hai
  return U.ph({eyebrow:'…', ic:'star', t:'…', lead:'…'}) + '…';
};

// 4. sw.js — thêm tệp mới vào danh sách FILES nếu tạo tệp mới
// 5. node tools/kiem-tra.js
```

## Phân quyền — hai lớp

1. **Thanh điều hướng** ẩn mục mà vai không có quyền (`visible()`).
2. **Lớp render** chặn thật: `G.allowed(view)` chạy trước mọi lần dựng màn hình,
   nên vào thẳng bằng liên kết `#ma-man` hay bằng trạng thái đã lưu đều bị chặn.
3. Mỗi màn hình nhạy cảm còn có **chốt riêng** ở dòng đầu của hàm.

> Khi nối máy chủ: client chỉ ẩn/hiện nút — **máy chủ luôn kiểm lại trước khi ghi.**

## Thêm một ngôn ngữ

```js
// src/i18n.js
G.LANGS.push({k:'ja', n:'日本語', flag:'JA', done:100});
G.UI.ja = { …chép khối en rồi dịch… };
G.NAV_EN / G.ITEM_EN / G.TIER_EN / G.CULTURE_EN  → tạo bản _ja tương ứng
```
Hàm `G.tx(o,'t')` tự lấy `o.t_<mã ngôn ngữ>` khi có, không có thì rơi về tiếng Việt.

## Trạng thái người dùng

Lưu trong `localStorage['gita365.v7']`: vai đang dùng, màn hình, nhóm đang mở,
tab la bàn, các ô đã tick, bảng tầm nhìn, nhật ký, tâm trạng.
Ngôn ngữ lưu riêng ở `gita365.lang`.

> Khi nối máy chủ, chuyển toàn bộ khối này sang hồ sơ gia đình — kèm quyền
> **xoá dữ liệu theo yêu cầu của gia đình**.

## Nối với hệ thống v6.9

| Việc | Tệp bên v6.9 |
|---|---|
| Đăng nhập, phiên, băm mật khẩu | `02_Security.gs` |
| Đọc/ghi hồ sơ, nhật ký, check-in | `08_Api.gs`, `01_Store.gs` |
| Kho kịch bản, phác đồ, mô thức | `data/*.json` trên Drive |
| Trợ lý AI | `06_AI.gs` |
| Cổng nghiệm thu, chuyển tầng | `04_Journey.gs`, `12_Cycle.gs` |
| Tài chính, hoa hồng | `05_Finance.gs` |
| Nhật ký hệ thống, việc chạy nền | `09_Jobs.gs` |

Bảng `G.PERM` trong `data.core.js` **giữ nguyên** bảng `PERM` của `00_Config.gs`
— một nguồn sự thật duy nhất cho cả hai bên.

## Bộ kiểm phát hành

```bash
npx http-server -p 8099 -s .
node tools/kiem-tra.js
```
Kiểm toàn vẹn liên kết · phân quyền 19 vai × 56 màn hình · chống tiêm mã ·
khả năng cài đặt. Chạy trước mỗi lần phát hành.

## Ma trận 220 × 5 tầng × 4 nhóm khách hàng — ghép chứ không lưu

Ba trục nhân với nhau ra **4.400 phiếu làm việc**. Không lưu 4.400 bản ghi:
lưu bốn lớp rồi ghép lúc hiển thị. Sửa một chuẩn là 4.400 phiếu cùng đúng;
viết tay 4.400 bản thì sửa một chuẩn phải sửa 4.400 chỗ.

| Lớp | Ở đâu | Bao nhiêu | Giữ gì |
|---|---|---|---|
| Kế hoạch theo (vấn đề × tầng) | `kho-goc/data.matran.t1..t5.js` | 1.100 | lộ trình · việc của bốn vai · đích · hồ sơ |
| Băng làm gì ở tầng nào | `G.MT_BANG_TANG` | 5 × 4 = 20 | giao gì · giữ lại gì · cổng đòi gì · rủi ro |
| Băng trông thế nào ở nhóm nào | `G.MT_BANG_NHOM` | 11 × 4 = 44 | trông thế nào · làm trước tiên · **khi nào dừng và chuyển tuyến** |
| Chỉ số riêng từng vấn đề | `G.MT_DO` | 220 × 4 ngưỡng | đơn vị · cách lấy số · ngưỡng XANH/VÀNG/CAM/ĐỎ |

Bốn băng **XANH · VÀNG · CAM · ĐỎ** không phải nhãn mới: hệ thống đã phân
loại gia đình bằng chúng từ đầu (trường `band` trong `G.FAMILIES`, buồng lái
Coach, chuẩn NV-CHAM "băng ĐỎ chạm trong 48 giờ"). Băng độc lập với tầng —
nhà tầng 5 vẫn có thể ở ĐỎ, nhà tầng 1 vẫn có thể ở XANH.
Không dùng `G.KHACH_TANG` (Bạch kim – Vàng – Thép – Chì) làm trục này vì
bảng đó ánh xạ thẳng sang tầng: lấy nó làm trục thứ ba là đếm tầng hai lần.

Hàm ghép: `G.mtPhieu(maVấnĐề, tầng, băng)` trong `src/ma-tran-bang.js`.
Xếp băng bằng số, không bằng cảm nhận: `G.mtXepBang(m1, m2, sốCổngTrượt)`.

## Hàm phải nằm ở `src/`, không nằm ở `kho-goc/`

`tools/ma-hoa-kho.js` đóng gói kho bằng `JSON.stringify` — **JSON bỏ hàm**.
Hàm định nghĩa trong `kho-goc/*.js` sẽ biến mất sau khi mã hoá và màn hình
vỡ ngay khi chạy bản có cấp phép, dù bản chưa mã hoá chạy tốt.
Quy tắc: **dữ liệu ở `kho-goc/`, hàm ở `src/`.**

## Nối dài một màn hình đã có

Muốn làm đầy một màn hình mà không thêm mục vào trình đơn thì bọc hàm cũ
(xem `src/tu-lieu-day-du.js`). Bắt buộc kiểm thẻ khoá trước khi nối:

```js
function biKhoa(html){
  return typeof html !== 'string' ||
    html.trim().indexOf('<div class="card center" style="padding:40px">') === 0;
}
```

Hàm cũ trả về thẻ khoá thì giữ nguyên thẻ khoá — không thì phần nối lọt qua
cổng phân quyền và mở cửa cho vai không được phép.

## Bộ rà soát chỗ trống — `tools/ra-soat-day-du.js`

Bộ kiểm phát hành hỏi **"màn hình có chạy không"**. Bộ này hỏi câu khác:
**"màn hình có RỖNG chỗ nào không"**. Hai câu hỏi khác nhau, và câu thứ
hai là câu bắt được thứ mà mắt người bỏ sót: một kho có nhan đề mà không
có nội dung vẫn chạy tốt, vẫn xanh hết mọi bài kiểm cũ.

```bash
npx http-server -p 8099 -s .
node tools/ra-soat-day-du.js
```

Chạy hết mọi màn hình của mọi vai rồi soi bảy loại chỗ trống:

| # | Bắt gì | Vì sao đáng bắt |
|---|---|---|
| 1 | Màn dựng ra quá ngắn | Có khung mà không có ruột |
| 2 | Chữ tạm — TODO, "đang cập nhật", "sắp có" | Chỗ trống được viết bằng chữ |
| 3 | Ô rỗng trên màn | Nhãn có, nội dung không |
| 4 | Bản ghi thiếu trường bắt buộc | Kho có ô để trống |
| 5 | Mảng khai báo mà rỗng | Biến có tên, không có gì bên trong |
| 6 | Chuỗi chưa dịch | Giao diện EN hiện mã màn hình thay cho tên |
| 7 | Nút bấm không có bộ nhận | Bấm vào không tới đâu |

**Mỗi ngoại lệ phải có lý do viết ra.** Bảng `THA` trong tệp ghi từng
trường được phép để trống kèm lý do — ví dụ `AD_GIONG.ten` để trống vì
chưa ký hợp đồng thu âm thì không được điền tên ai, `HP_TANG.gia` để
trống vì mức học phí là quyết định của chủ Học viện. Ngoại lệ không có
lý do thì nó chỉ là một chỗ trống được tha.

**Phép LỌC phải kèm điều kiện kho đã nạp.** Kho rỗng thì lọc ra cũng
rỗng và bài kiểm trông như đã đạt. Mọi phép lọc trong bộ kiểm đều kèm
một phép đếm — đó là cách chặn "đạt rỗng".

## Bài kiểm phải đo đúng thứ nó định đo

Hai bài kiểm trong dự án này từng đo sai thứ, và cả hai đều đỏ khi hệ
thống tốt lên chứ không phải khi hệ thống hỏng đi:

- **"Phần khoá với Giám đốc đúng 20% ± 2"** — tử số là số màn quản trị
  (gần như không đổi), mẫu số là tổng số màn (tăng mỗi đợt thêm nội dung
  cho gia đình). Thêm một màn cho phụ huynh là bài kiểm đỏ. Đã thay bằng
  phép đo đúng: *màn nào khoá với Giám đốc cũng phải vì một quyền quản
  trị hệ thống, và mọi màn đòi quyền ấy đều thật sự khoá.*
- **"Câu mở dài trên 60 ký tự"** — phạt lối viết gọn. Câu mở hay nhất
  trong kho dài 51 ký tự và không thừa chữ nào. Ngưỡng hạ xuống 40: dưới
  40 thì không thể là câu thật, trên 40 thì phải đọc mới biết và bài
  kiểm tự động không đọc thay người được.

Khi một bài kiểm đỏ, hỏi trước: *hệ thống hỏng, hay bài kiểm đo sai?*
Nới dung sai để cho qua là cách chắc chắn nhất để bài kiểm mất tác dụng.

## Vá dữ liệu sinh sẵn — thứ tự nạp theo chữ cái

`tools/ma-hoa-kho.js` nạp `kho-goc/*.js` theo thứ tự chữ cái. Tệp vá
phải nạp SAU tệp gốc, và dấu gạch ngang xếp TRƯỚC dấu chấm:

```
data.tinhhuong-t5-dich.js   ✗ chạy TRƯỚC data.tinhhuong.js — vá vào mảng chưa tồn tại
data.tinhhuong.t5-dich.js   ✓ chạy SAU
```

Mẫu vá dùng trong `data.scripts.tuvan-ruot.js` và
`data.tinhhuong.t5-dich.js`: chỉ điền trường đang trống, không đụng
trường đã có, và để lại một hàm đếm phần còn nợ (`G.tvConNo()` ở
`src/duong-vao.js`) để bộ rà soát báo đỏ tới khi con số về 0.
