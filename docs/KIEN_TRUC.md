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
