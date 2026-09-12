# GITA 365 — bản đồ kho cho phiên làm việc

Tệp này để một phiên làm việc **không phải dò lại kho từ đầu**. Dò lại mỗi
lần là tốn tài nguyên vào việc đã biết rồi, và đó là khoản tốn lớn nhất
mà không ai nhìn thấy.

---

## LUẬT CỨNG — ĐỌC TRƯỚC MỌI THỨ KHÁC

**KHÔNG BAO GIỜ đọc bốn tệp này. Chúng do máy sinh ra, không sửa tay.**

| Tệp | Cỡ | Đọc một lần tốn |
|---|---|---|
| `gita-app.js` | 1,4 MB | ~360.000 token |
| `GITA365.html` | 1,8 MB | ~460.000 token |
| `GITA365-v*-gioi-thieu.html` | 2,2 MB | ~540.000 token |
| `ban-xem-thu.html` | 2,1 MB | ~520.000 token |

Một lần lỡ đọc là mất nửa ngày làm việc. Muốn xem nội dung thì đọc **tệp
nguồn** trong `src/`, rồi chạy `node tools/gop-src.js` để dựng lại.

Bốn tệp trên cũng đã bị chặn bằng luật `deny` trong `.claude/settings.json`
— chặn hai lớp vì lớp nhắc-nhở thì phụ thuộc trí nhớ, còn lớp chặn thì không.

---

## Kho này là gì

Web App + bản `.exe` cho Windows. Vanilla JS, HTML, CSS. **Không có bước
biên dịch** — thẻ `<script src>` thường, không phải module.

    src/*.js  (74 tệp)  →  node tools/gop-src.js  →  gita-app.js
    kho-goc/*.js (101)  →  node tools/ma-hoa-kho.js  →  kho/*.enc (7 gói)

**`kho-goc/` và `kho/khoa.json` nằm trong `.gitignore`.** Không có git để
lùi. Bảy tệp `kho/*.enc` đã phát hành **là bản lưu duy nhất của nội dung**
— chúng đã cứu được cả kho một lần ở bản 9.6.

---

## Ba luật của kho nội dung

1. **Hàm không sống trong kho.** `tools/ma-hoa-kho.js` đóng gói bằng
   `JSON.stringify`, mà `JSON.stringify` bỏ hàm. Phần chạy phải ở `src/`.
2. **Kho nạp SAU khi đăng nhập.** Không được đọc `G.KHO_NAO_ĐÓ` ở thời
   điểm tệp vừa tải — lúc ấy chưa có gì.
3. **`kho-goc/` nạp theo thứ tự A–Z**, và dấu gạch ngang `-` đứng TRƯỚC
   dấu chấm `.` khi so tên tệp.

---

## Một lệnh làm hết

    node tools/phat-hanh.js

Nó tự chạy theo thứ tự: mã hoá kho → soi kho đổi gì so với bản đã phát
hành → sinh tệp nạp khoá → gộp mã → dựng bản một tệp → chạy bộ kiểm.

### Lệnh lẻ, dùng lúc đang sửa

| Việc | Lệnh | Mất bao lâu |
|---|---|---|
| Đóng gói lại kho | `node tools/ma-hoa-kho.js` | 5 giây |
| Gộp `src/` thành một tệp | `node tools/gop-src.js` | 2 giây |
| Dựng bản một tệp | `python3 tools/dong-goi.py` | 10 giây |
| **Bộ kiểm — chế độ im** | `xvfb-run -a node tools/kiem-tra.js --im` | ~12 phút |
| Bộ rà soát chỗ trống | `xvfb-run -a node tools/ra-soat-day-du.js` | ~3 phút |
| **Đo khung màn — 4 khổ thật** | `xvfb-run -a node tools/do-khung-man.js --im` | ~6 phút |
| Kho vừa đóng đổi gì | `node tools/soi-doi-kho.js` | 3 giây |
| Đề bài thị giác → tấm PNG | `node tools/tam-ra-anh.js <đề-bài.json> <thư mục> [khổ]` | ~10 giây |
| Tấm in A4/A5 | `node tools/tam-ra-anh.js <đề-bài.json> <thư mục> a4d` | ~10 giây |
| Bộ tấm PNG → phim mp4 | `node tools/dung-phim.js <thư mục> <ra.mp4> [giây/cảnh]` | ~20 giây |
| Đề bài → nhiều khổ → nhiều phim | `node tools/bo-phim.js <đề-bài.json> <thư mục> --kho=vuong,doc,dung` | ~90 giây |
| Thử trọn đường dựng phim | `xvfb-run -a node tools/thu-phim.js` | ~4 phút |

Bốn lệnh phim cần `ffmpeg` và `ffprobe` (`apt-get install -y ffmpeg`). Không
có thì chúng nói ra chứ không lặng lẽ bỏ qua.

- Phim dựng từ tấm ĐÃ phát hành — luật C19, kiểm bằng `nguon.json`
- Lời đọc và nhạc là TỆP CÓ SẴN, máy chỉ trộn chứ không sinh — luật C20
- Đổi khổ là VẼ LẠI, không đệm đen — `bo-phim.js` gọi bộ vẽ một lần cho
  mỗi khổ

**Luôn dùng `--im`.** Bộ kiểm đầy đủ in ra 867 dòng, 80.614 ký tự. Chế độ
im in ra 184 ký tự — **giảm 438 lần** — và vẫn chạy đủ 759 phép đo, chỉ
bớt phần khoe. Chỗ đỏ in kèm số mục để biết đường tìm.

Bộ kiểm cần máy chủ tĩnh ở cổng 8099; `.claude/khoi-dong.sh` bật sẵn mỗi
phiên. Cần `xvfb-run -a` vì Playwright chạy trình duyệt thật.

---

## Sửa một chỗ thì phải đụng những đâu

Thêm **một màn hình mới**, đủ sáu chỗ, thiếu chỗ nào bộ kiểm cũng bắt:

1. `src/ten-man.js` — phần chạy và `G.VIEWS['ten-man']`
2. `tools/danh-sach-src.json` — khai tên tệp, không khai thì không được gộp
3. `src/data.core.js` → `G.NAV` — mục trong cột trái, kèm `perm`
4. `src/i18n.js` — bản tiếng Anh của mục ấy
5. `kho-goc/data.*.js` — kho chuẩn, nếu màn cần dữ liệu
6. `tools/ma-hoa-kho.js` — xếp kho vào gói `NEN` hay `NGHE`
   **và** `src/kho-khoa.js` → `G.THUOC_CAP_PHEP`

Thêm **một kho mới** vào gói nghề mà quên khai ở `THUOC_CAP_PHEP` thì:
máy vừa đăng nhập Coach, đăng nhập lại bằng phụ huynh, phụ huynh **giữ
nguyên** dữ liệu nghề trong bộ nhớ. Bộ kiểm mục 40 bắt chỗ này.

---

## Luật phân luồng dữ liệu — chỗ dễ sai nhất

Kho đi theo **quyền của màn hình đọc nó**, không theo cảm giác.

- Mọi màn đọc kho ấy đều khoá ở quyền nghề → kho vào gói **NGHE**
- Có màn của khách hàng đọc → gói **NEN**
- Kho phục vụ nhiều phạm vi cùng lúc → **cắt theo bản ghi**, hai nửa cùng
  tên kho ở hai gói, và khai tên vào `G.KHO_TRAI_RA` để lúc mở thì NỐI
  chứ không GÁN ĐÈ

**Lọc trên màn hình KHÔNG PHẢI bảo vệ dữ liệu.** Gửi xuống rồi thì mở
công cụ nhà phát triển là đọc được hết. Lỗi này đã xảy ra ba lần trong kho
này: KICHBAN (8.9), CV_MUC (9.7), và 17 kho nghề (9.8).

---

## Trước khi đẩy

1. `node tools/soi-doi-kho.js` — có bản ghi nào **ít đi** không? Nội dung
   ít đi hầu như luôn là hỏng, không phải sửa.
2. `xvfb-run -a node tools/kiem-tra.js --im` — đỏ là **không phát hành**,
   không có ngoại lệ.
3. `xvfb-run -a node tools/ra-soat-day-du.js`
4. `xvfb-run -a node tools/do-khung-man.js --im` — 183 màn × 4 khổ màn ×
   2 vai. Hai bộ trên đọc CHUỖI HTML và chạy ở đúng một khổ để bàn, nên
   không bộ nào trả lời được câu của người cầm điện thoại.
5. Bump số bản ở `src/data.core.js`, `desktop/package.json`, `sw.js`

**Không bao giờ `git add kho-goc/` hay `kho/khoa.json`.**

---

## Hai núm nhìn màn — `src/thu-phong.js`

Người dùng đổi được hai thứ, và hai thứ ấy KHÁC nhau:

- **KHỔ** (chỉ hiện trên màn chạm) — *Vừa màn* là bản điện thoại một
  cột; *Toàn cảnh* dựng bố cục **1280px** rồi thu cho vừa màn, để nhìn
  trọn một bảng rộng rồi chụm ngón tay phóng vào. Làm bằng cách đổi
  `width` của thẻ viewport, KHÔNG bằng `transform: scale()` — scale thì
  chữ mờ, chỗ bấm lệch chỗ nhìn, `position:fixed` chạy loạn.
- **CỠ** — sáu nấc 70→150%, đặt `zoom` ở thẻ gốc. Chạy cả trên máy tính.
  Phím tắt `Ctrl +` · `Ctrl −` · `Ctrl 0`.

Hai chỗ đã sập khi làm, ghi lại để không lặp:

1. Khai `width=1280` rồi **để trình duyệt tự thu** thì chỉ chạy khi BẤM
   nút; mở sẵn chế độ ấy từ lúc tải trang thì trang nằm nguyên tỉ lệ
   1:1 và người dùng chỉ thấy góc trên bên trái. Phải tự tính
   `initial-scale` và `minimum-scale`, và **làm tròn XUỐNG** — làm tròn
   gần nhất thì mép phải bị cắt mất một vệt.
2. Khi bố cục rộng hơn màn, Chromium và Safari **tự thổi cỡ chữ** lên
   không đều: tiêu đề nở gấp đôi còn ô bảng thì không, cả bố cục vỡ.
   Chặn bằng `text-size-adjust:100%` ở `html` — đặt `100%` chứ không
   đặt `none`, vì `none` khoá luôn phép phóng chữ của người mắt kém.

---

## Thanh điều hướng dưới đáy — `src/thanh-duoi.js`

Chỉ hiện ở khổ ≤860px. Bốn ô cộng nút Menu; menu ba gạch ở trên vẫn giữ
nguyên. Lý do: cầm máy một tay thì góc trên bên trái là góc xa ngón cái
nhất, còn đáy màn là chỗ ngón cái nằm sẵn.

Bốn ô lấy từ **ba nguồn, theo thứ tự tin cậy**: `G.DUOI[portal]` (lời
khai của chủ hệ, ở `src/data.core.js`) → `G.PORTALS[vai].home` → thứ tự
`G.NAV` LẤP chỗ còn trống. Khai sai không vỡ: màn nào vai không mở được
thì bị bỏ qua và nguồn ba lấp nốt.

**Vì sao phải khai tay, dù luật kho là đừng dựng bản thứ hai:** bản đầu
tôi lấy bốn mục đầu tiên trong `G.NAV`, và đo ra thì cả sáu vai có chung
ba ô — "Đã đổi gì · KPI · GITA là gì" — vì nhóm đầu của `G.NAV` là nhóm
giới thiệu. Thứ tự `G.NAV` là thứ tự **ĐỌC**, không phải thứ tự **HAY
DÙNG**; thứ chưa có trong kho thì phải khai, không suy ra được. Ô `star`
cũng không dùng được: 101 mục mang star.

**Thanh che mất dòng cuối là lớp lỗi riêng của nó** — `do-khung-man.js`
có phép đo canh, và nó đã đỏ thật hai lần ở màn trợ lý: một lần vì cửa
sổ trò chuyện tự tính chiều cao mà không biết có thanh, một lần vì
`body.man-chat main` nặng hơn luật lề chung nên ăn mất chỗ chừa.

---

## Chuẩn giao diện điện thoại — bốn luật nền, `assets/style.css`

Cả bốn đều do `tools/do-khung-man.js` canh, và cả bốn đều từng sai thật.

1. **Vùng an toàn.** `index.html` khai `viewport-fit=cover` VÀ
   `apple-mobile-web-app-status-bar-style: black-translucent` — tức là
   ĐÃ NHẬN VIỆC tự lo phần dưới tai thỏ và dưới vạch về nhà. Bốn biến
   `--sat --sab --sal --sar` gom một chỗ; mọi thứ neo vào đáy thanh
   trên phải dùng `--top-tong`, **không** dùng `--top-h`.
2. **`100vh` không bao giờ đứng một mình.** Thanh địa chỉ của trình
   duyệt thu vào rồi thò ra, mà `100vh` luôn tính theo lúc nó đã thu.
   Viết `min-height:100vh; min-height:100dvh` — dòng trước là bản lùi.
3. **Ô nhập phải từ 16px trên màn chạm.** Dưới mức ấy Safari trên
   iPhone phóng CẢ TRANG khi người ta chạm vào ô, và không thu lại khi
   gõ xong. Đây là chỗ **đáng dùng `!important`**: 16 là ngưỡng cứng
   của nền tảng, không phải một ý thích, nên nó phải thắng mọi luật
   của thành phần (`.ch-go input`, `.cs-o textarea`…). Không dùng thì
   phải đi nâng độ nặng cho từng thành phần, mãi mãi.
4. **Vùng chạm 32px, và đo VÙNG CHẠM chứ không đo cái ô vuông.** Một ô
   tích 16px nằm trong nhãn cao 44px thì bấm vẫn trúng. Ngưỡng nâng ở
   khối `@media(pointer:coarse)` — hỏi con trỏ, không hỏi bề ngang màn,
   vì máy bảng 1024px vẫn là ngón tay.

Màu thanh trình duyệt (`meta[name=theme-color]`) **đọc từ `--bg-0` lúc
chạy**, không gõ lại bằng tay — hai mã gõ tay cũ lệch với nền thật đủ
để thấy một vệt khác màu ở đầu trang.

---

## Cách viết trong kho này

- Tiếng Việt, câu ngắn, không dùng từ học thuật khi có từ thường thay được
- Lời chú giải nói **VÌ SAO**, không nói *cái gì* — đọc mã là biết cái gì
- Chỗ nào từng hỏng thật thì ghi lại đã hỏng thế nào, để lần sau không lặp
- Màu: lấy từ `G.MT_BANG`. **Cấm** `#F5B942`, `#FFD98A`, `#FF7A45` trong
  `src/`, `assets/style.css`, `index.html`
- Mọi chữ do người dùng nhập phải qua `U.h()` trước khi ghép vào HTML.
  `U.tbl` chỉ thoát phần đầu cột, **không** thoát ô — tự thoát lấy.
- Trường không áp dụng thì **bỏ hẳn khoá**, đừng để `null` hay `[]`. Vắng
  mặt nghĩa là không áp dụng; rỗng nghĩa là đáng lẽ phải có giá trị, và
  bộ soát trường trống sẽ báo đỏ.

---

## Ba lớp lỗi CHỈ hiện ra trên điện thoại

Tìm ra ở 9.99.51 bằng cách đo trên khổ màn thật, không bằng cách đọc mã.
Cả ba đều sống qua rất nhiều bản vì mọi bộ soi đều chạy ở khổ để bàn.

1. **Độ nặng chọn lọc trong `@media`.** `.shell` trong khối
   `max-width:860px` THUA `.shell.no-right` ở ngoài — hai lớp nặng hơn
   một lớp, kể cả trong `@media`. Hậu quả: trên màn 390px vùng nội dung
   rộng 268px thay vì 388px, ở MỌI màn.
2. **Khối `@media` đặt trước lớp nó muốn đè.** Cùng độ nặng thì dòng
   đứng SAU thắng, nên khối ấy không làm gì cả — và không báo gì cả.
   Khối khổ chạm phải nằm CUỐI `assets/style.css`.
3. **`.row` là flex và flex không tự xuống dòng.** Một hàng hai nút nhãn
   dài cần 539px trong cột rộng 358px thì nó không co lại — nó đẩy CẢ
   TRANG cuộn ngang. Đã mở `flex-wrap:wrap` cho `.row` ở khổ ≤600px.

Và một lớp thứ tư, nặng nhất, không phải chuyện khổ màn: bộ sinh SEO
chèn khối vào giữa thẻ `<meta name="rights"` và **cắt đôi thẻ ấy**. Nửa
sau rơi xuống thân trang, hiện ra thành chữ ở đầu mọi trang — và chính
thẻ khai quyền sở hữu trí tuệ thì không còn tồn tại. Trên màn để bàn nó
khuất sau thanh trên, nên không ai thấy. `do-khung-man.js` nay canh
đúng lớp ấy: thân trang không được có chữ nằm trần ngoài mọi thẻ.

---

## Ba cái bẫy của phép dò chữ tiếng Việt

Cả ba đều đã cắn kho này, và cái thứ ba NGƯỢC với cái thứ hai.

1. **`\b` không khớp chữ có dấu.** `/\bvà\b/` không bao giờ khớp, vì "à"
   nằm ngoài lớp `\w` của JavaScript nên sau nó không có biên nào. Phép
   chặn im lặng suốt.
2. **Dò chuỗi con thì bắt oan.** `boDau('hư')` = `hu`, và `hu` nằm trong
   "chưa", "chuẩn", "thứ" — một bài sạch bị báo 13 câu dán nhãn.
3. **Dò theo biên từ bằng khoảng trắng cũng sai** (9.99.54), vì **tiếng
   Việt không phân từ bằng khoảng trắng** — khoảng trắng ngăn ÂM TIẾT,
   không ngăn TỪ. "tin" đứng riêng một âm tiết trong "thông tin", "tin
   nhắn", "tin cậy". Cách dùng: dò biên âm tiết rồi **TRỪ cụm ghép đã
   biết** (`DN_TRU`), danh sách trừ ngắn và chỉ dài thêm khi bắt oan
   THẬT — thêm cho đủ là mở đường cho chữ lọt.

---

## Trợ lý hình ảnh — cổng Điều Nhỏ (9.99.54)

Theo bản đặc tả `GITA365-IMG-AGENT-P1-KNOWLEDGE-CORE` của chủ hệ.

Cổng thiết kế cũ hỏi hai câu, và **cả hai đều là câu hỏi về TẤM HÌNH**:
cho ai xem, và làm MỘT nhiệm vụ gì. Thiếu hẳn câu hỏi về NGƯỜI. Nay ba
câu — `G.TG_DIEUNHO`:

- **DN1 Ai xem** — đã có, đọc từ ô `nguoiXem`
- **DN2 Điều nhỏ** — *mới*: xem xong thì người ta LÀM ĐƯỢC gì
- **DN3 Thời điểm đời** — *mới*: họ gặp tấm này vào lúc nào

Thiếu thì hỏi theo **khuôn bốn câu** `G.TG_KHUON4` (lắng → nói điều đã
hiểu → hỏi rõ → nói bước tiếp), không quăng ra một dòng báo đỏ.

**Chỗ cố ý không theo bản đặc tả:** bản đặc tả nhận điều nhỏ bằng bảng
động từ có "hiểu", "nhớ", "tin". Ba từ ấy không quan sát được, và
`KN_CHUAN_NGHE` CN1 của chính kho này đã cấm đúng chúng. Nhận ở cổng
hình mà cấm ở cổng nội dung là hai cửa của một Học viện nói hai điều
khác nhau — nên ở đây **chặn**.

---

## Một phép kiểm chưa từng đỏ thì chưa phải phép kiểm

Viết xong một phép kiểm mới thì **cố tình làm hỏng dữ liệu** để xem nó có
đỏ đúng chỗ không, rồi mới trả dữ liệu về. Luật này đã bắt được ba phép
kiểm câm trong kho này.

---

## Việc còn chờ chủ hệ thống, không phải chờ mã

**Đừng đọc danh sách này bằng mắt — chạy `node tools/soat-san-sang.js`.**
Nó đọc thẳng `may-chu/wrangler.toml`, hỏi Cloudflare đang giữ bí mật nào,
soi kho mã, và **từ 9.99.49 đọc luôn mọi sổ `*_CHOCHU` trong kho** rồi đo
từng mục bằng ô `do` mà chính mục ấy khai — nên một mục đã xong sẽ bị bắt
là "ĐÃ XONG mà vẫn nằm trong sổ", và bộ kiểm đỏ cho tới khi gỡ. Sổ chờ chỉ
dài ra chứ không ngắn đi là cách nó mục. Cùng phép đo ấy hiện ở màn *Biên
soạn nội dung → ngăn Chờ chủ hệ* (`src/cho-chu-he.js`, một bản duy nhất).

Danh sách gõ tay thì MỤC: tới 9.99.7 chỗ này còn ghi
"điền hệ số lương ở `CV_HANG[].heSoGhiChu`" — mà `heSoGhiChu` chỉ là một
dòng ghi chú, không phải chỗ điền được, và chỗ điền thật (bảng
`heSoLuong`) tới 9.99.5 mới có.

Còn thật, tính tới 9.99.8:

- Bật GitHub Pages: `Settings → Pages → Source: GitHub Actions` — không
  có lệnh nào làm hộ được
- Trỏ DNS cho `gita.edu.vn` (CNAME trong kho đã có sẵn tên miền)
- Nạp năm bí mật máy chủ — `soat-san-sang.js` in ra đúng năm lệnh
- Chọn đường lấy sao kê ngân hàng: webhook · cổng thanh toán · nhập tay
- SPF/DKIM cho tên miền gửi thư
- **L-01** — hệ số lương ba vị trí phòng tài chính. Màn *Phòng Kế toán –
  Tài chính → Lương → Đặt hệ số*, chỉ Super Admin. Chưa đặt thì bảng
  lương vẫn chấm điểm, phần tiền để trống chứ không phải 0.
- Bốn ô còn lại của `G.TR_CHUA`: X-SHP · X-GOP · X-GP · X-DUTRU. Mục 74
  của bộ kiểm đối chiếu lời khai của sổ ấy với sổ thật mỗi lần chạy.
- Sáu mục của bộ nội dung — **ND-01 · ND-02 · ND-03 · ND-04 · MD-01 ·
  MD-02 · KL-01 · KL-02 · TG-01 · TG-02**. Đừng chép lại chúng ra đây:
  `soat-san-sang.js` in ra cả con số lẫn **chỗ điền** của từng mục, và
  ô `noiDien` nằm trong chính kho. Từ 9.99.49 mỗi mục có KHUNG để ghi
  câu trả lời: `KL_BIEUTUONG` · `KL_NGANKHO.o` (23 ô, mỗi ô một lần
  ngồi) · `MD_MAU_MA` · `MD_THUHANHVI` (10 trường, quyết từng trường
  một) · `TG_IN_CHOT` · và sổ `chotTrichNghe` ở máy chủ cho ND-04.
  Một mục chờ không có chỗ ghi thì nó không phải mục chờ — nó là một
  lời than, và ND-04 đã đứng yên ba bản đúng vì thế.

**Đã xong, đừng làm lại:** pháp nhân trong `LICENSE`/`NOTICE` (không còn
chỗ trống nào), học phí từng tầng (chốt 9.94, mục 71 đối chiếu hai bản),
cửa sổ gộp 7 ngày và số báo giá N4/N5 (đã đặt và có phép đo).

**Không phải việc của chủ hệ:** ngưỡng chuyển tuyến y tế/tâm lý. Kho
`data.quy-trinh-nhom.js` cố ý ghi DẤU HIỆU QUAN SÁT ĐƯỢC để người làm ca
đề nghị, và nói thẳng "ngưỡng do Hội đồng chuyên môn chốt". Đó là một
quyết định lâm sàng, không phải một ô trống chờ điền.

## Đã chốt, không hỏi lại

- **Giá gói theo tầng** (9.94) — `G.HP_TANG[].gia` là bản GỐC; máy chủ
  giữ bản chép ở `may-chu/tai-chinh.js → GIA_TANG`, và bộ kiểm mục 71
  đối chiếu hai bản mỗi lần chạy. Thang duyệt chi neo vào chính bảng
  giá ấy, nên sửa giá là phải chốt lại thang.
- **Chi từ 1,5 triệu trở lên** (9.92, 9.94) — phải xin duyệt VÀ phải
  vào báo cáo chi. Một ngưỡng, hai nghĩa vụ, cùng một hằng số
  `TRAN_PHAI_DUYET`.
- **Phòng tài chính trực thuộc ai** (9.98) — Super Admin quản lý đương
  nhiên; Giám đốc và Admin hệ thống quản lý được KHI Super Admin cấp
  `quanLyPhong`. Chỉ R01 cấp được quyền ấy, và không ai tự cấp cho mình.
- **Nối sổ với tài khoản ngân hàng** (9.98) — `giaoDichNganHang`, cửa
  webhook xác thực bằng `GITA_KHOA_NGANHANG` (không dùng phiên). Tự khớp
  CHỈ theo mã tham chiếu, không bao giờ theo số tiền. Đối chiếu nêu HAI
  phía riêng: tiền vào không có phiếu (mất lòng khách) và phiếu không có
  tiền vào (mất tiền).
- **Phòng Kế toán – Tài chính** (9.97) — ba vị trí: kế toán THU, kế toán
  CHI, kế toán TRƯỞNG. Là một TRỤC RIÊNG, vuông góc với thang vai
  R01–R15, cấp bằng `quyenTaiChinh` chứ không thêm vai. Chỉ R01–R02 cấp
  được. Tách thu khỏi chi là lớp kiểm soát chính: người ghi nhận tiền
  vào không được là người duyệt tiền ra.
- **Điểm KPI dưới 60** (9.99.8, L-02) — máy KHÔNG cắt và cũng không
  tha: lượt chốt lương bị chặn, người chốt phải ghi quyết định của mình
  kèm lý do, và câu ấy ở lại trong dòng lương. Không có luật chung, vì
  một luật chung phải chọn sẵn một cách cho mọi trường hợp mà nguyên
  nhân điểm thấp nằm đâu thì chỉ người đọc sổ mới biết.
- **Lương đã chốt vào sổ chi** (9.99.7) — khoản mục `luong`, trạng thái
  đã duyệt, mốc tiền ra là ngày cuối KỲ LƯƠNG chứ không phải ngày chốt.
  Không đi qua thang nấc vì không có số tiền nào được gõ tay; đổi lại
  `doiSoatLuong` soi hai phía như đối chiếu ngân hàng.
- **Sáu mốc chu kỳ** (9.97) — 10·15·20·50·80·100 triệu, TỔNG chi một
  người một TUẦN. Mỗi mốc một vai cố định, leo R03 → R02 → R01, mốc
  chẵn thêm một chữ ký. Kế toán trưởng được cấp hạn mức tới mốc nào thì
  ký thay tới mốc ấy.
- **Không còn lối tự ghi** (9.97) — mọi khoản chi đều chờ duyệt; dưới
  1,5 triệu thì người duyệt là kế toán chi.
- **Trần chu kỳ 10 triệu** (9.95) — tổng MỌI khoản chi của MỘT người
  trong MỘT tháng, cộng qua tất cả khoản mục. Chạm trần thì lối tự ghi
  đóng lại với người ấy tới hết chu kỳ. Đây là phép soi nhìn theo cột
  NGANG; phép gộp 7 ngày nhìn theo cột DỌC, và hai cái không thay được
  nhau. `TRAN_CHU_KY` neo vào giá gói T3.
