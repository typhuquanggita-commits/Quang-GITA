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

## Trợ lý hình ảnh — bốn bảng quyết định (9.99.55)

Phần 2–4 của bản đặc tả. Màn *Kiến trúc sư thị giác → ngăn **Ý tưởng***
(`src/kien-truc-thi-giac.js`), cửa máy chủ `docYTuong`.

| Kho | Bản chép ở máy chủ | Việc |
|---|---|---|
| `G.TG_YDINH` (7) | `Y_DINH` | Đọc ra ý định theo dấu hiệu bề mặt |
| `G.TG_QUYET` (8) | `QUYET` | Ý định × người xem → khổ + sắc khí |
| `G.TG_CHU_TRAN` (4) | `CHU_TRAN` | Trần ký tự cho chữ trên ảnh |
| `G.TG_ANDU` (5) | `AN_DU` | Ngân hàng ẩn dụ cho góc nhìn thứ hai |

**Ba chỗ máy CỐ Ý không làm thay** — cả ba đều có phép đo riêng ở mục 71,
và cả ba đều đã được phá thử để xem có đỏ đúng chỗ không:

1. Không có dấu hiệu nào thì **nói là không biết**, không rơi về một ý
   định mặc định. Một cái đoán trình ra như một đề nghị thì người ta tin
   nó đã được cân nhắc.
2. Hai nhóm người xem cho ra hai khổ khác nhau thì **không chọn giùm** —
   đó là dấu hiệu cần HAI TẤM. Chọn đại một khổ thì một nhóm nhận tấm
   sai khổ mà không ai biết, vì tấm vẫn ra đúng quy cách.
3. Không có ẩn dụ nào hợp thì góc ấy **để trống và nói ra**, không rơi
   lặng lẽ về khuôn an toàn — nếu không thì người chọn thấy hai ý giống
   nhau và tưởng cả ba góc đều đã được cân nhắc.

**Thứ tự năm lớp của đề bài CHÍNH LÀ trọng số** (`dungLop5`): bộ tạo ảnh
nghe phần đầu rõ hơn phần cuối. Đảo lớp *Cảnh báo kỹ thuật* lên đầu thì
tấm về đúng kỹ thuật mà sai chuyện, và không phép chấm nào bắt được.

**Chống tự khen** (`chamThiGiac`): tám trong mười lượt gần nhất từ 90
điểm trở lên thì lượt sau **bị chặn** cho tới khi người chấm viết một
câu, và câu ấy ở lại trong sổ kèm tên người viết. Máy không kết luận là
chấm dễ — đội vẽ lên tay thật cũng ra đúng con số ấy. Cùng luật L-02 của
bảng lương: máy không cắt và cũng không tha.

Và một cái bẫy đã cắn thật ở đây: hồ sơ phiên mang tên ô là **`hoSo.u`**,
không phải `hoSo.username`. Gõ nhầm thì JavaScript không báo gì cả — nó
trả `undefined`, câu giải thích ở lại trong sổ mà **không có tên người
viết**, tức là mất đúng nửa có giá trị của phép ghi. Bộ thử bắt được vì
nó đòi **đúng tên**, không đòi "có ô `boiAi`".

## Trợ lý hình ảnh — góp ý vá vào đúng lớp (9.99.56)

Phần 5 của bản đặc tả. Màn *Kiến trúc sư thị giác → ngăn **Góp ý***,
cửa máy chủ `docGopY`; kho `G.TG_SUA_DAU` (5 lớp) và `G.TG_ADN` (5 thứ
không được động tới).

Luật `TG_LOP5_LUAT.vaDungLop` và `.khongXeDNA` đã có từ 9.99.55 **ở dạng
chữ**. Bản này dựng máy canh chúng — một luật không máy nào canh thì nó
là một lời chú giải.

**Nói bằng tiền:** mỗi lượt vẽ lại tốn một lượt gọi bộ tạo ảnh ngoài.
Góp ý "nhìn lạnh quá" là lớp Cảm xúc; đem đi sửa Bố cục thì tấm mới vẫn
lạnh y hệt. Sai lớp không lộ ra ở khâu nào — nó lộ ra ở tấm sau, và lúc
ấy không ai truy được vì sao.

**Cổng ADN có hai chỗ, và chỉ chỗ thứ hai mới là cổng:**

- `docGopY` chỉ **ĐỌC** — nó tách câu xé bảng nhận diện ra và nói ai đổi
  được, nhưng không chặn gì vì nó không ghi.
- `banMoiThiGiac` **GHI**, nên cổng có răng nằm ở đó: `y.gopY` xé ADN
  thì bản mới không được sinh (`code:'XEADN'`).

Đặt cổng ở chỗ đọc thôi là cổng cảnh báo. Người ta đọc, thấy hợp lý với
tấm này, rồi vẫn bấm sửa — và mỗi lần nhân nhượng **đều hợp lý ở tấm
ấy**. Mười lần thì bảng nhận diện không còn, mà không ai quyết định bỏ
nó cả.

**Câu chạm ADN không được đi tiếp vào phép chia lớp.** Vừa bị từ chối
vừa được chỉ đường đi sửa thì người ta làm theo vế thứ hai — vế thứ hai
là vế nói cách làm.

### Hai chỗ phá thử đã dạy lại, ghi để không lặp

1. **Một phép đo chỉ đúng khi cái nó đo CÓ THỂ sai.** Bản đầu của phép
   đo cổng ADN dùng một câu xé ADN **không mang dấu hiệu lớp nào**. Phá
   thử — cho câu xé đi tiếp vào phép chia lớp — mà phép đo vẫn XANH, vì
   câu ấy chẳng rơi vào lớp nào cả. Nay câu thử cố ý mang cả hai: "đổi
   màu" là ADN1, "gắt" là L3.
2. **Danh sách trừ ở đây KHÔNG cần, và giữ nó là tệ hơn bỏ.** Bản đầu có
   `TG_SUA_TRU` chép theo `DN_TRU`; phá thử thì bỏ hẳn nó đi mọi phép đo
   vẫn xanh. Lý do: `DN_CAM` **buộc** phải chứa âm tiết trần "tin" (một
   động từ người ta viết thật), còn `TG_SUA_DAU` không bị ép — mọi dấu
   hiệu dễ bắt oan đều viết được thành cụm hai âm tiết: *sai dấu* chứ
   không phải *dấu*, *sáng quá* chứ không phải *sáng*, *ngón tay* chứ
   không phải *ngón*. **Chặn ở chỗ CHỌN DẤU HIỆU rẻ hơn và chắc hơn
   chặn bằng một danh sách trừ** — danh sách trừ phải dài thêm mãi, cụm
   hai âm tiết thì đúng một lần. Một danh sách không chặn gì làm người
   đọc sau tưởng cái bẫy đã được lo, rồi thôi không nghĩ tới nữa.

Và một dấu hiệu phải loại: **`nhân vật` trần không dùng được cho L2**,
dù nó đúng là chuyện của L2 — chính L4 cũng nói *"ánh nhìn của nhân
vật"*, nên mọi góp ý về cảm xúc đều bị kéo thêm về L2. L2 dò **hình của
lời xin** (thiếu · thêm · sai · đổi), không dò danh từ.

## Trợ lý hình ảnh — dòng truy nguồn trên tấm (9.99.57)

Phần 6 của bản đặc tả. Kho `G.TG_TRUY`; vẽ ở `src/ve-thi-giac.js →
dongTruyNguon()`, chèn **ở đúng một chỗ** — ngay sau `b.ve()` trong
`G.veThiGiac`, nên cả mười sáu bộ vẽ đều có, và bộ vẽ thứ mười bảy viết
sau cũng tự có.

**Dấu ở góc nói tấm này CỦA AI. Dòng truy nguồn nói tấm này LÀ TẤM
NÀO.** Một tấm rời khỏi hệ thì đi một mình; lúc nó hiện lên ở chỗ không
ai ngờ, câu hỏi đầu tiên là "ra khỏi hệ lúc nào, qua cửa nào" — mà kho
có hàng trăm tấm cùng loại hình, cùng bảng màu, nhìn y hệt nhau.

**Chỉ mã, không tên người.** Tấm đi tới tay khách. Đặt tên người xuất
lên tấm là đưa một nhân sự ra trước mặt người lạ, để đổi lấy thứ nhật ký
`TG_XUAT` đã giữ rồi. Mã dẫn về sổ; sổ mới nói tên.

**Cố ý KHÔNG làm dấu chìm giấu trong bit thấp của điểm ảnh**, dù bản đặc
tả đề nghị. Tấm dựng bằng SVG rồi kết thành PNG, mà mọi nền tảng đăng
bài đều nén lại một lần nữa — một lần nén là bit thấp bay sạch, người
chụp màn hình cũng xoá nó. Dựng một lớp bảo vệ không giữ được là **tệ
hơn không dựng**: người ta tin tấm đã được đánh dấu rồi thôi không nghĩ
tới nữa.

### Hai con số phép đo bản in đã bắt ngay

- **Cỡ gốc phải đúng `DAU_CHU_NHO` (10,5), không được nhỏ hơn.**
  `tiDau()` nâng cỡ sao cho một chữ 10,5 điểm ảnh đạt đúng 2,1mm khi
  in. Đặt 8,5 cho "nhạt đi" thì ra `8,5/10,5 × 2,1 = 1,70mm` — dưới
  ngưỡng C22. **Muốn nhạt thì hạ độ đục, đừng hạ cỡ chữ:** độ đục không
  đổi theo khổ in, cỡ chữ thì đổi.
- **Lề dọc không được nhỏ hơn lề ngang, và phải cộng phần đuôi chữ.**
  `y` là đường chân, còn hộp bao chạy quá nó; phép đo bản in đo **hộp
  bao**. Lấy lề dọc bằng 55% lề ngang ra 4,0mm — dưới `LE_XEN_MM = 5`,
  và máy xén giấy có sai số.

## Trợ lý hình ảnh — kênh phát · giờ vàng · gỡ bài (9.99.58)

Phần 9 của bản đặc tả. Màn *Kiến trúc sư thị giác → ngăn **Đăng · Gỡ***;
cửa `dangTamThiGiac` · `goTamThiGiac` · `soDangBai`; bảng
`dangTamThiGiac` trong `may-chu/csdl.sql`; kho `G.TG_KENH` (6) ·
`G.TG_GIO_VANG` (3) · `G.TG_GO_LY_DO` (5).

**Chỉ đăng thứ đã PHÁT HÀNH.** Bậc `duyet` là người duyệt đã gật; bậc
`phatHanh` là bản cuối đã chốt. Cho đăng ở bậc duyệt thì một bản còn
đang sửa chữ đi ra ngoài, và tấm ngoài kia không sửa lại được nữa.

**Sai khổ thì nền tảng TỰ CẮT — và nó cắt ở GIỮA.** Thứ bị cắt thường
là dòng mời ở đáy hoặc dấu thương hiệu ở góc, đúng hai thứ quan trọng
nhất, và không báo gì cả.

**Giờ vàng NÓI RA, không chặn** (05:30–06:30 · 11:30–12:30 ·
20:30–22:00). Một tấm chúc Tết phải đi đúng giao thừa; một tấm xin lỗi
phải đi ngay. Nhưng đăng ngoài khung **phải viết một câu** — không bắt
viết thì mọi lượt đều đăng ngoài khung, và bảng giờ vàng thành một lời
chú giải. Giờ đọc theo **múi giờ Việt Nam** (`LECH_VN`), không theo giờ
máy chủ: Workers chạy UTC, và lệch bảy tiếng thì khung *tối* rơi vào
giữa trưa — im lặng, vì cả ba khung vẫn trả về một cái tên nghe hợp lý.

### Nút GỠ là chỗ dễ dựng sai nhất, và dựng sai thì tệ hơn không có

**Gỡ trong sổ KHÔNG gỡ được ở ngoài.** Tấm đã đăng thì nằm ở máy chủ
của nền tảng ấy; ai đã lưu về hoặc chụp màn hình thì vẫn giữ. Sổ của
Học viện chỉ ghi được rằng Học viện **đã QUYẾT** gỡ.

Nên hai ô tách hẳn nhau, ở cả bảng lẫn màn hình:

| Ô | Ai điền | Là gì |
|---|---|---|
| `goTrongSo` | máy, ngay khi bấm | Học viện đã quyết gỡ |
| `daGoNgoai` | người, sau khi vào kênh gỡ | **lời khai**, không phải phép đo |

Máy **không tự đánh dấu** `daGoNgoai` vì máy không nhìn thấy kênh ngoài
— một ô máy tự đánh dấu mà không đo được là *một lời nói dối mang dấu
của hệ thống*. `soDangBai` nêu riêng chỗ hở giữa hai ô, cùng luật với
đối chiếu ngân hàng; gộp thành một con số "còn tồn" thì một tấm quyết
gỡ ba tuần trước nằm chung rổ với một tấm vừa quyết gỡ năm phút trước.

Gỡ phải chọn lý do **và** viết một câu — gỡ không câu nào thì lần sau
người khác dựng lại đúng tấm ấy, vì không có gì nói cho họ biết vì sao.

## Trợ lý hình ảnh — đo phễu · sổ truy vết · ứng phó (9.99.59)

Phần 10, phần cuối của bản đặc tả. Màn *Kiến trúc sư thị giác* → hai
ngăn **Phễu · Đời tấm** và **Ứng phó**; cửa `doPheuThiGiac` ·
`doiMotTam`; kho `G.TG_PHEU` (8) · `G.TG_UNGPHO` (10).

### Luật của cả phần: KHÔNG BAO GIỜ gộp cột đo được với cột lời khai

Phễu có hai nửa, khác hẳn nhau ở chỗ con số **đến từ đâu**:

| Nửa | Bậc | Con số từ đâu |
|---|---|---|
| Đo được | đề xuất → duyệt → phát hành → đăng → gỡ | máy đếm thẳng trong sổ |
| Lời khai | lượt xem · lượt bấm · lượt nhắn về | người gõ từ bảng nền tảng |

Đặt một con số gõ tay cạnh một con số đo được — cùng hàng, cùng kiểu
chữ — thì người đọc tin cả hai như nhau. Mà con số gõ tay thì gõ nhầm
được, gõ đẹp lên được, hoặc **quên gõ mà hàng vẫn đầy**.

Nên máy chủ **không trả về ba bậc lời khai, kể cả với giá trị 0**. Một
số 0 nằm cùng bảng với sáu số đo được đọc ra là *"chưa ai xem"*, không
đọc ra là *"máy không biết"* — và hai câu ấy khác hẳn nhau. Cùng luật
với ô `daGoNgoai` của phần 9.

Kéo theo: **tỷ lệ chỉ tính được trong MỘT nửa.** Lấy "lượt xem" chia
"đã phát hành" là chia một lời khai cho một phép đo, và kết quả mang
tên của phép đo trong khi nó thừa hưởng mọi sai của lời khai.

### Sổ truy vết — `doiMotTam`

Nhật ký `audit` đã ghi đủ từ lâu (`TG_DEXUAT` · `TG_BAC` · `TG_XUAT` ·
`TG_DIRA` · `TG_DANG` · `TG_GO`), nhưng nằm rải trong sổ chung của cả
hệ xếp theo thời gian — muốn đọc đời một tấm thì phải lọc bằng mắt qua
hàng nghìn dòng. **Một sự thật CÓ mà không đọc ra được thì trên thực tế
là KHÔNG CÓ.** Cửa này gom đúng một tấm, xếp **tăng dần**, và nêu chỗ
hở *trước* dòng thời gian — một dòng nằm trong dòng thời gian thì người
ta đọc như một việc đã qua.

### Mười tờ ứng phó — `G.TG_UNGPHO`

RB-01…RB-10, viết **trước**, vì lúc chuyện xảy ra thì không ai ngồi
nghĩ ra quy trình được. Ba luật, cả ba đều có phép đo ở mục 71:

1. **Mỗi bước phải LÀM ĐƯỢC**, không phải một lời khuyên. *"Xử lý
   nhanh"* không phải một bước; *"gọi cửa `goTamThiGiac` với lý do
   `PHAP_LY`"* thì là. Dưới ba bước thì nó là một câu, không phải một
   quy trình.
2. **Mỗi tờ khai AI LÀM** — không khai thì lúc gấp ai cũng tưởng người
   kia đang làm.
3. **Mỗi tờ khai TRONG BAO LÂU** — không có mốc thì việc gấp và việc
   thường trôi cùng một nhịp, và nhịp ấy là nhịp của việc thường.

Màn xếp tờ **GẤP lên trước**, không xếp theo mã: xếp theo mã thì tờ
*"bộ kiểm đỏ trước giờ phát hành"* nằm cạnh tờ *"người trong ảnh rút
lời đồng ý"* như thể hai việc cùng một nhịp — mà chúng không cùng.

## Trợ lý hình ảnh — khép lại (9.99.60)

Bản đặc tả GIDA **đã xong cả mười phần**. Bản này vá hai chỗ chính lượt
soi lại tìm ra, chứ không thêm phần mới.

**1. Nửa lời khai của phễu chưa có chỗ ghi.** 9.99.59 khai ba bậc XEM ·
BAM · NHAN_VE là *lời khai* rồi không dựng chỗ nào để ghi — theo đúng
luật của chính kho này thì mục ấy không phải việc chờ, nó là **một lời
than**. Nay có bảng `khaiSoNgoai` và cửa `khaiSoKenhNgoai`.

Ba luật của bảng ấy:
- Một dòng là **một lượt đọc bảng**, không phải một con số cộng dồn. Ghi
  đè một ô "tổng" thì mất hẳn phần lịch sử, và không ai biết là đã mất.
- **Ngày đọc bảng do người khai**, máy không lấy ngày hôm nay thay —
  người ta hay đọc bảng tuần trước rồi mới ngồi gõ.
- **Để TRỐNG khác hẳn số 0**: trống là không đọc được, 0 là đọc được và
  bằng không. Phép cộng bỏ qua ô trống và **đếm riêng cỡ mẫu** (`tren`).

Có chỗ ghi **không** làm con số thành phép đo — nó vẫn ở ngăn lời khai,
vì máy chủ vẫn không nhìn thấy kênh ngoài. Cái nó có thêm là *ai gõ và
gõ lúc nào*: kiểm lại được, chứ không đúng hơn.

**2. Mười tờ ứng phó trỏ vào chỗ nào thì phải KHAI, không để phép đo dò
chữ.** Bản đầu của phép kiểm dò tên cửa trong câu văn của từng bước. Phá
thử mới thấy nó **câm đúng ở chỗ nguy hiểm nhất**: đổi `goTamThiGiac`
thành `goTamHinhAnh` thì phép dò không nhận ra cái tên mới nên không bắt
gì cả. **Phép dò chữ chỉ kiểm được những tên nó ĐÃ BIẾT — tức là đúng
những tên không có nguy cơ.** Nay mỗi tờ khai thẳng ô `cua` và `congCu`,
và mỗi ô được đối chiếu với cửa máy chủ thật / tệp thật trên đĩa.

---

## Một phép kiểm chưa từng đỏ thì chưa phải phép kiểm

Viết xong một phép kiểm mới thì **cố tình làm hỏng dữ liệu** để xem nó có
đỏ đúng chỗ không, rồi mới trả dữ liệu về. Luật này đã bắt được ba phép
kiểm câm trong kho này.

### Và phá thử phải xem cả DÒNG CHI TIẾT, không chỉ xem màu

Một mục **đỏ mà in ra câu khoe** thì gần như vô dụng: người đọc mất thêm
một vòng đi tìm, và lần thứ ba nó giấu luôn một phép đo câm.

Nguyên nhân luôn là một: điều kiện của `bao()` và điều kiện của câu chi
tiết là **hai bản chép viết tay của cùng một biểu thức**, và thêm cờ mới
thì người ta chỉ sửa bản thứ nhất. Đúng thứ luật của kho cấm — bản thứ
hai của một sự thật.

Chuyện này đã xảy ra **ba lần** ở mục 71. Nay biểu thức tính **một lần**
vào `const tgDat`, và cả hai chỗ cùng đọc nó; thêm cờ mới thì sửa đúng
một chỗ. Mục nào còn giữ hai bản chép thì đấy là chỗ sắp trôi tiếp.

---

## Sổ chờ: 26 mục câm đã khai xong (9.99.61)

Tới 9.99.60 có **26 mục trong 10 sổ chờ cũ chưa khai cách đo**, dựng
trước 9.99.49. Chưa khai thì bộ soát không tự đóng được mục ấy khi nó
xong, và nó nằm lại mãi. Nay **0 mục chưa khai**: 11 đo được, 23 khai
thẳng là máy không đo được **kèm lý do thật**.

### Kiểu đo thứ năm — `daChot`

Bốn kiểu cũ đo một kho BÊN NGOÀI mục. Kiểu này đo **chính mục**: một
câu hỏi mang sẵn câu trả lời trong ô của nó thì nó đã xong.

Vì sao cần: BLV · BV · CS · SV · T5P đều dựng theo lối *hỏi rồi ghi câu
trả lời ngay cạnh*. Chủ hệ trả lời, người viết ghi vào `daChot`, rồi
**không ai gỡ mục khỏi sổ**. Sau vài bản sổ có cả câu đã trả lời lẫn câu
chưa, và người đọc không phân biệt được — lúc ấy cả sổ thành vô dụng,
đúng như `TR_CHUA` đã từng mục ở 9.99.7.

Nó bắt ngay **bốn mục đã trả lời từ 9.59 mà vẫn nằm trong sổ chờ**. Cả
bốn đã chuyển sang sổ `*_DACHOT` — **gỡ khỏi sổ chờ, không xoá**: câu
trả lời kèm lý do là thứ đáng giữ nhất. Sổ `_DACHOT` không mang đuôi
`_CHOCHU` nên `ccDocSo()` không nhặt.

**`TV_CHOCHU → CC-GOI` là ví dụ rõ nhất của mục tự mô tả sai chính
mình:** ô `lenhDung` còn ghi *"HP_TANG[].gia đang là null và đang chờ
chủ hệ điền"* — đúng lúc viết, và sai từ 9.94 khi giá được chốt. Nay đo
thẳng `HP_TANG[].gia` chứ không đọc lời khai.

### Ba chỗ khai tay phải đụng khi thêm một kho

Thêm một kho mới thì ngoài `ma-hoa-kho.js` và `kho-khoa.js` còn ba chỗ
nữa, và cả ba đều bắt đỏ ngay ở 9.99.61:

| Chỗ | Bắt gì |
|---|---|
| `G.RONG_CO_Y` | kho rỗng phải khai **vì sao** và **lấp khi nào** |
| `G.SG_PHULUC` | kho của cuốn sách phải xếp vào phần IN hay PHỤ LỤC |
| danh sách kiểu đo ở mục 71 | `G.CC_KIEU` đổi hình là đỏ |

**Khung chờ điền là MẢNG RỖNG, không phải một dòng mang ô `null`.** Luật
của kho: vắng mặt nghĩa là không áp dụng, *rỗng* nghĩa là đáng lẽ phải
có giá trị — nên một dòng `{giaTri: null}` là một dòng tự khai rằng nó
đang thiếu, và bộ soát trường trống báo đỏ đúng như thế. Khung chưa điền
thì **chưa có dòng nào**.

### Định danh của một bản ghi không chỉ là ô `ma`

Mục 45 (không mã nào biến mất khỏi bảy gói) chỉ nhận `ma · id · code`.
Mấy sổ chờ không đánh mã — **câu hỏi chính là định danh**, và nó ổn định
vì viết lại câu hỏi là viết lại mục. Chỗ hẹp ấy lộ ra khi bốn mục được
tiễn sang `_DACHOT`: phép soi không lần được nên **báo MẤT trong khi
không mất chữ nào**. Một phép kiểm báo mất nhầm thì lần sau người ta tắt
nó đi. Nay định danh lùi dần: `ma → id → code → câu hỏi đã cắt gọn`.

---

## BỘ NÃO GITA 365 — phần 1: hiến pháp và hàng rào (9.99.62)

Theo bản đặc tả `GITA-BRAIN-365-v3.0` của chủ hệ. Màn **Bộ não GITA
365** (`src/bo-nao.js`, năm ngăn), máy chủ `may-chu/bo-nao.js`, kho
`data.bo-nao.js` (11 kho), bộ kiểm **mục 78**.

Bảy phân hệ của bản đặc tả sẽ dựng sau. Phần này dựng **cái trần**, vì
sơ đồ của chính bản đặc tả đặt Hiến pháp ở trên cùng kèm một câu:
*"không phân hệ nào vượt qua"*. Dựng bảy phân hệ trước rồi mới dựng
hiến pháp là dựng bảy cái cửa rồi mới hỏi cửa mở cho ai — tới lúc ấy
mỗi cửa đã có một luật riêng và gom lại thì không gom được nữa.

### Mỗi điều khai ĐÚNG MỘT đường đo

Bản đặc tả viết mười ba điều bằng giọng ngang nhau. Máy chỉ đo được
**tám**. Trình cả mười ba như đã kiểm thì người duyệt thấy mười ba dấu
tick rồi thôi không đọc — và năm điều nặng nhất về NGƯỜI (Đứa trẻ ·
Quyền tự chủ · Công bằng) lại đúng là năm điều không ai đọc nữa.

Nên mỗi điều có `mayDo` **hoặc** `nguoiDo`, không bao giờ cả hai và
không bao giờ thiếu cả hai — mục 78 canh đúng chỗ ấy. Cùng luật với ô
`daGoNgoai` (9.99.58) và cột lời khai của phễu (9.99.59).

### Điều 13 có RĂNG ở cửa đi ra — và đó là một lỗ đang mở

Luật vận hành số 1: *mọi ghi chép về một gia đình hoặc một đứa trẻ
không bao giờ rời hệ ở dạng nhận dạng được.*

`guiDeBaiRaNgoai` đã chạy từ 9.99.5x và kiểm quyền · kiểm bậc · kiểm
cổng — **không kiểm một chữ nào về dữ liệu người**. Tới hôm qua, một
cái tên trẻ con lọt vào ô nội dung thì nó đi thẳng ra bộ tạo ảnh đặt ở
nước ngoài, và Luật số 91/2025/QH15 gọi đó là **xử lý dữ liệu xuyên
biên giới**.

Phép soi đặt ở **lúc chuỗi rời khỏi hệ**, không ở lúc đề xuất: trong hệ
thì dữ liệu gia đình được phép có mặt. Và soi **chuỗi đã dựng xong**,
không soi từng ô — một cái tên nằm ở ô nội dung, ô bố cục hay ô điều
nhỏ đều như nhau, và soi từng ô là ba phép soi phải cùng nhớ.

Hai luật của cửa ấy:
- **Ngờ là đủ để chặn.** Bắt oan tốn ba mươi giây sửa lại; lọt một cái
  tên thì nó đã ra khỏi hệ và không gọi về được.
- **Máy KHÔNG tự xoá hộ.** Tự xoá thì người gửi không biết mình vừa
  suýt gửi cái gì, và lần sau viết y hệt — tệ hơn, một phép xoá tự động
  sót một chỗ thì người gửi đã yên tâm rồi.

### Ba chỗ máy cố ý không làm thay

1. **R9 (nhắc năng lực GITA chưa có) luôn là việc của người.** Máy
   không biết GITA đang có năng lực gì — danh sách ấy đổi mỗi bản, và
   một bản chép của nó trong bộ dò sẽ cũ đi lặng lẽ. Máy đo **9/10**
   điểm và nói thẳng ra.
2. **Việc chưa ai xếp hạng rơi về VÀNG**, không rơi về Xanh. Rơi về
   Xanh là để máy tự làm một việc chưa ai xếp hạng — đúng cách một hệ
   lặng lẽ mở rộng quyền của chính nó.
3. **Hàng rào nêu TỪNG ĐIỂM**, không gộp thành một con số: chín điểm
   sạch và một điểm phạm nặng cần cách xử lý khác hẳn mười điểm hơi
   phạm.

### Hai chỗ phép đo cũ bắt được ngay

- **`hoSo.role`, không phải `hoSo.vai`** — cùng cái bẫy đã cắn ở
  9.99.55 với `hoSo.username`. Gõ tên ô khác thì JavaScript trả
  `undefined`, phép thử sai, và **cổng đóng với mọi người trong im
  lặng**. Bốn dòng đỏ ở bốn cửa cùng lúc.
- **Khoá màn ở `qt_trang` là mâu thuẫn với chính bản đặc tả.** Phép đo
  tỉ lệ hiển thị (mục 11) bắt R07 · R08 · R12 tụt dưới đích — và Phân
  hệ 6 viết *"Trainer, coach, tư vấn viên đều phải học và thi cùng một
  Hiến pháp 13 điều"*, gọi đó là **đồng chuẩn**. Khoá hiến pháp ở tầng
  quản trị là làm cho người chạm khách nhiều nhất lại không đọc được
  luật mình phải theo. Nay `perm:'nghe_chung'`.

### Hai chỗ cố ý KHÔNG dựng

- **Không chép lại `HP_LUAT` (7 luật tiền) và `KN_CHUAN_NGHE`.** Hiến
  pháp đứng **trên** hai cái ấy; chúng là cách thi hành nó ở hai phạm
  vi hẹp. Khai lại là dựng bản thứ hai của một sự thật.
- **Không dựng lại hệ trên FastAPI + React + vector DB** như một bản
  đặc tả khác đề nghị. Kho này là vanilla JS không có bước biên dịch,
  chạy trên Cloudflare Workers + D1, và đã có 972 kho · 992 phép đo.
  Đổi nền là ném hết đi để bắt đầu lại — xem phần bàn ở cuối tệp này.

---

## BỘ NÃO — Phân hệ 1: Đánh thức Vùng Mạnh (9.99.63)

Bản đặc tả gọi phân hệ này là **lõi của v3.0**. Màn **Vùng Mạnh**
(`src/vung-manh.js`, năm ngăn), máy chủ `may-chu/vung-manh.js`, kho
`data.vung-manh.js` (13 kho), bảng `theVungManh`, bộ kiểm **mục 79**.

### Ba lằn ranh là ba CÁI CỔNG, không phải ba lời dặn

Bản đặc tả viết ba lằn ranh đạo đức ở cuối Phần III bằng giọng của một
lời dặn. Sáu tháng sau không còn ai nhớ một lời dặn, vì nó không chặn
được gì. Nên cả ba đều có răng, và mỗi cái có một phép đo riêng:

| Lằn ranh | Răng nằm ở đâu | Đo thế nào |
|---|---|---|
| LR1 · không xếp hạng trẻ | KHÔNG CÓ cửa ấy | hỏi **danh sách cửa** của máy chủ |
| LR2 · hạn 90 ngày | `doHan()` tính **lúc đọc** | mốc 90/91 ngày là biên |
| LR3 · không bán bằng Thẻ | `soatOLa()` chặn theo TÊN Ô | gửi `diem`·`goi`·`nhan` |

**LR1 là phép đo về thứ KHÔNG TỒN TẠI**, và nó khác hẳn mọi phép đo
khác trong bộ. "Không xếp hạng trẻ với nhau" không gọi được bằng một
hàm — nó nghĩa là không có cái cửa ấy. Nên phép đo hỏi danh sách hàm
xuất ra của mô-đun: một cửa trả nhiều thẻ cùng lúc mà **có mặt** là đỏ,
dù chưa ai gọi nó. Viết cửa ấy rồi mới cấm gọi là muộn.

**LR2 tính lúc đọc, không giữ một cột `conHan` trong bảng.** Một cột
như thế phải có ai đó chạy cập nhật, và ngày không ai chạy thì nó nói
dối theo đúng hướng nguy hiểm nhất. Quá hạn thì `docTheVungManh` **không
trả về năm dòng nữa** (`the: undefined`) — trả về kèm một dòng chữ đỏ
thì người ta vẫn dùng.

**Nỗi sợ (T7) là trường quan trọng nhất**, và đúng MỘT trường được mang
dấu ấy. Hai trường cùng mang thì cái nhấn mất nghĩa. Thẻ bắt buộc mang
dòng ghi chú *"không phải kết luận về con"* — nó chống lại điều nguy
hiểm nhất của cả phân hệ: cha mẹ biến một quan sát tạm thời thành một
cái nhãn dán suốt đời.

**Bộ dò lời hứa về gen cắm ở CHÍNH phân hệ này**, không gửi sang chỗ
chung, vì người viết bài về vùng mạnh là người đứng gần lời hứa ấy nhất
— cái tên "gen thiên tài" bán chạy và nằm ngay cạnh thứ GITA làm thật.
Nó dò **chuỗi con**, không dò biên âm tiết: "gen-thiên-tài" gõ gạch nối
thì biên không khớp mà ý thì y hệt. (Ngược với `DN_TRU` ở 9.99.54 — ở
đó dò chuỗi con bắt oan; ở đây tám cụm đều là cụm nhiều âm tiết nên
không có chỗ để bắt oan.)

### Ba chỗ phá thử bắt được, ghi để không lặp

1. **Dòng đỏ ghi SAI SỐ MỤC.** `mucNay` lấy từ chính **dòng in** tiêu
   đề mục, mà tám mục 72–79 chỉ có KHUNG CHÚ GIẢI, không có dòng in —
   nên mọi dòng đỏ của cả tám mục đều ghi `[mục 71]`. Con trỏ chỉ sai
   chỗ **tệ hơn không có con trỏ**: người đọc tin nó, đi tìm ở mục 71,
   không thấy gì, rồi ngờ chính phép đo. Và nó chỉ lộ ra lúc phá thử,
   vì lúc xanh thì không có dòng đỏ nào để mà sai. Thêm mục mới thì
   phải thêm **dòng in**, không chỉ khung chú giải. (Hai mục còn trùng
   số 72; cái thứ hai nay là 80 — đánh lại chứ không dồn số, vì số mục
   ở tệp ấy là NHÃN ĐỂ TÌM, không phải thứ tự chạy.)
2. **Màn dựng khung rỗng cho vai không có kho nghề.** Kho nạp SAU khi
   đăng nhập, và vai không có gói nghề thì không bao giờ nạp — cả năm
   ngăn vẫn dựng ra bảng có đầu cột mà không có dòng. Một cái khung rỗng
   đọc ra là *"chỗ này chưa làm xong"*, không đọc ra là *"vai của bạn
   không mở được"*. Chặn ở **một chỗ**, trước cả thanh ngăn.
3. **Màn `bo-nao` mắc đúng lỗi ấy nhưng lọt dưới ngưỡng.** Bộ rà soát
   chỗ trống bắt từ **hơn hai** thẻ rỗng, mà màn ấy rỗng đúng hai. Một
   cái hố nằm ngay dưới ngưỡng vẫn là cái hố — sửa cái hố, không sửa
   ngưỡng.

### Và một chỗ phần nhắc việc tự bịt miệng mình

`soat-san-sang.js` in ra `CC-TEN · undefined` cho ba mục và ba dòng
trống cho mấy mục không đánh mã. Nguyên nhân đúng thứ luật của kho cấm:
**hai chỗ đọc tên viết tay**, mỗi chỗ biết một nửa danh sách — mười sổ
chờ dựng ở mười thời điểm nên sổ này gọi câu việc là `viec`, sổ kia gọi
`t`, sổ nữa gọi `hoi`. Nay gom về một hàm `cau()`. Một dòng nhắc không
nói nó nhắc việc gì thì nó không nhắc được ai.

---

## BỘ NÃO — Phân hệ 2: Coach khách hàng (9.99.64)

Phần IV của bản đặc tả. Màn **Coach khách hàng** (`src/coach-kh.js`,
năm ngăn), máy chủ `may-chu/coach-kh.js`, kho `data.coach-kh.js` (14
kho), bộ kiểm **mục 81**, chín phép đo ở `thu-worker.js`.

### Phần này cố ý DỰNG ÍT

Bản đặc tả mở Phần IV bằng *"giữ nguyên toàn bộ từ v2.0, nhắc lại ở
dạng nén"*. Chép lại một bản nén vào kho là dựng bản thứ hai của một
sự thật, và bản thứ hai mục trong im lặng. Nên chỉ dựng thứ CHƯA có ở
đâu trong kho, và mỗi thứ dựng ra đều có một cái răng.

### Thứ THẬT SỰ mới của v3.0 là đúng một câu

*Trước khi trả lời bất kỳ câu hỏi nào về một đứa trẻ cụ thể, bộ não
đọc Thẻ Vùng Mạnh của con đó trước.*

Câu ấy nghe như một lời dặn về thứ tự thao tác. Nó không phải — nó là
**câu nối Phân hệ 2 vào Phân hệ 1**. Không có răng thì bốn tuần quan
sát của một gia đình thật dừng lại ở một tờ giấy đẹp, và không đổi
được một chữ nào trong câu trả lời.

**Dựng bằng một cái cờ `daDocThe` là hỏng ngay từ đầu:** một cái cờ do
người gọi truyền vào là một **lời khai**, và lời khai bật được mà
không đọc gì. Nên máy chủ **tự đọc** thẻ, và mục 81 đọc thẳng thân hàm
`traLoiCoach` để canh hai điều — không ô nào mang nghĩa *"đã đọc rồi"*,
và **có** lời gọi thật sang `docTheVungManh`. Cùng lối đo với LR1 ở mục
79: phép đo về thứ **không được tồn tại**.

Và phép đo mạnh nhất là câu của chính bản đặc tả, đo ở `thu-worker.js`:
cùng một câu hỏi *"con không chịu học"*, nhà có cửa **làm** và nhà có
cửa **nghe** phải ra **hai câu trả lời khác nhau**. Giống hệt nhau là
máy chưa đọc thẻ — dù cờ có bật, dù nhật ký có ghi. Đo **hành vi**,
không đo lời khai.

Bốn cửa đóng, cả bốn đều có phép đo: `CHUATHE` (nhà chưa có thẻ) ·
`THEQUAHAN` (LR2 đi xuyên từ Phân hệ 1 sang) · `THIEUCUA` (thẻ thiếu ô
cửa thì **nói là không biết**, không đoán — đoán thì một phần ba là
trúng) · `LUONGLA` (chưa phân luồng, bước B2 không bỏ được).

### Ba cái cổng còn lại

1. **Bốn luồng nặng — L05 · L06 · L09 · L12 — bắt buộc ba lượt hội
   đồng, và ba lượt CHÉP LẠI không tính là ba lượt.** Con số ba vẫn
   đúng trong khi cái được canh thì không còn, và bảng hội đồng thành
   sân khấu — một sân khấu mang dấu kiểm duyệt thì tệ hơn không có bảng
   nào. Ba luồng đầu chọn vì sai thì hỏng thứ không sửa lại được; luồng
   thứ tư (về chính GITA) vì đó là luồng **duy nhất người trả lời có
   lợi ích trong câu trả lời**.
2. **Ghế G5 Người giữ hồn: máy không ngồi vào được.** Bốn ghế kia hỏi
   câu đo được — đúng chưa, ngược lại thì sao, nguồn đâu, gọn chưa. Ghế
   này hỏi *"đọc xong người mẹ ấy thấy gì"*, và câu trả lời của máy cho
   nó **nghe y hệt** câu trả lời thật — đó đúng là lý do nó phải là
   người. Cùng luật với ô `daGoNgoai` (9.99.58).
3. **Bé tập bò, ba cái trần đếm được** — 20 chữ mỗi câu · 4 dòng mỗi
   đoạn · **2 con số cả bài**. Máy **chặn** và nói vượt ở đâu, không tự
   cắt hộ: cắt hộ thì người viết không biết mình vừa viết dài, và lần
   sau viết y hệt.

**Một chỗ suýt dựng thành phép đo bắt oan:** đếm con số thì mã `T4` ·
`L06` · `M3` · `RB-07` phải bị **gỡ trước khi đếm**. Không gỡ thì mọi
bài nhắc tới một bảng nào đó đều vượt trần — và một phép đo bắt oan thì
lần sau người ta tắt nó đi.

### Bảng đích hiển thị: đo lại CẢ BẢNG, không sửa mỗi số vừa kêu

Mục 11 bắt R13 tụt 34,9% so với đích 37%. Chú giải của chính bảng
`G.TAM_NHIN` đã dặn: nhiều số cùng lệch thì **hỏi lại xem cách đếm có
hỏng không**. Đã hỏi và đã đo — mẫu số 183 → 186 đúng ba màn mới; vai
**có** `nghe_chung` tử số tăng đúng 3; vai **không có** tử số đứng yên.
Cách đếm còn đúng.

Phép đo nói thêm một điều: **bảng đích đã lệch từ TRƯỚC ba màn ấy** —
R03 đo được 82,5 khi đích ghi 84. Ba màn mới chỉ đẩy đúng R13 vượt dung
sai; chín số kia lệch sẵn 1,2 và nằm im. Nên sửa **cả mười** về số đo
được. Sửa mỗi số vừa kêu là để chín số kia nằm sát mép, và lần thêm màn
sau chúng cùng vỡ một lượt — đúng cái đã xảy ra ở 9.64–9.67. Dung sai
±2 giữ nguyên: nới dung sai là bỏ hẳn phép canh.

---

## BỘ NÃO — Phân hệ 3: Nội dung & tiếp thị (9.99.65)

Phần V. Màn **Nội dung & tiếp thị** (`src/noi-dung-tiep-thi.js`, bốn
ngăn), máy chủ `may-chu/noi-dung-tiep-thi.js`, kho
`data.noi-dung-tiep-thi.js` (8 kho), bộ kiểm **mục 82**, chín phép đo ở
`thu-worker.js`.

### Kho đã có sẵn rất nhiều, nên phần này TRỎ chứ không chép

Kho đã có hiến pháp nội dung `KN_*` (28 kho) và một bộ soi chạy thật ở
`kien-truc-noi-dung.js`: dò câu sáo rỗng, dò lời phán, dò câu dài, đòi
nhãn nguồn, dò tự xưng chuyên gia. Phần V **không dựng lại cái nào** —
mục QC4 của bộ lọc quảng cáo **gọi thẳng** `soatNguon`, và mục 82 đọc
mã nguồn để canh đúng chỗ ấy: chép bảng nhãn nguồn sang thì thêm một
nhãn mới ở bản sau là hai bảng lệch nhau, và bộ lọc **bắt oan** một bài
đã ghi nguồn đúng.

### Bảy mục của bộ lọc KHÔNG cùng một loại

| Ngăn | Mục | Ai đo |
|---|---|---|
| Máy đo | QC1 từ tuyệt đối · QC2 so sánh · QC3 cam kết kết quả · QC4 số không nguồn | máy đếm thẳng |
| Người khai | QC5 chứng thực · QC6 ảnh trẻ em · QC7 người ảnh hưởng | **người**, kèm tên và giấy tờ |

Trình cả bảy như đã kiểm thì người duyệt thấy bảy dấu tick rồi thôi
không đọc — và ba mục nặng nhất về **pháp lý** lại đúng là ba mục không
ai đọc nữa. Máy nhìn thấy cái ô tích, **không nhìn thấy sự việc**. Nên
ba mục ấy đòi **một cái tên kèm một chỗ trỏ tới giấy tờ**, không nhận ô
tích. Cùng luật với Điều 13 (9.99.62), `daGoNgoai` (9.99.58), cột lời
khai của phễu (9.99.59).

**Khai `khongApDung` khác hẳn bỏ trống.** Bài không có ảnh trẻ em thì
QC6 không phải một mục phải ký — nhưng phải **nói ra thế**. Bỏ trống là
chưa ai nhìn tới, và một mục bỏ trống trôi qua thì nó trôi mãi.

### Hai cổng của 5.1

1. **Không khai tầng nhận thức thì không xuất bản**, và máy **không
   đoán hộ**. Đoán thì một phần bảy là trúng, và người viết tưởng bài
   đã được xếp tầng nên thôi không nghĩ tới nữa — mà việc xếp tầng
   chính là việc phải nghĩ.
2. **Lời kêu gọi sai tầng bị chặn.** Bài tầng 1–2 kết bằng *"Đăng ký
   ngay"* không bị ai phản đối — nó bị **lướt qua**, và lướt qua thì
   không để lại dấu nào để về sau truy.

**Bẫy tên gọi, ghi trước khi nó cắn:** kho đã có chữ *tầng* mang nghĩa
**tầng sản phẩm T1–T5**. *Tầng nhận thức* là thang khác hẳn — một bài
tầng sản phẩm T4 vẫn viết được cho người ở tầng nhận thức 1. Nên mọi
thứ ở đây mang tiền tố `NT_` và ô gọi là **`tangNT`**, không bao giờ
gọi trần là `tang`: gõ trần thì nó lặng lẽ khớp vào phép soi tầng sản
phẩm, và **cả hai phép soi cùng xanh trên hai thứ khác nhau**.

Bảng lời kêu gọi nằm ở **nhóm**, không ở tầng — chép ra bảy dòng là giữ
bảy bản của một luật. Nhóm N7 **cố ý không có khoá `keuGoiSai`**: người
đã vào rồi thì không còn lời mời nào sai. Một mảng rỗng ở đó là một
dòng tự khai rằng nó đang thiếu, và mục 82 báo đỏ đúng thế.

### 5.2 — phép đếm đội lốt một phép đo chất lượng

Một bài gốc phải ra đủ **bảy nhánh**. Không kể được trong sáu mươi giây
thì bài chưa có **ý trung tâm**; không rút được thành một trang thì bài
chưa có **việc làm được**. Thiếu thì nêu **từng nhánh** thiếu — một con
số thiếu không nói thiếu cái gì thì người viết đoán, và họ đoán nhánh
dễ làm nhất.

### Chọn dấu hiệu, không dựng danh sách trừ

`CUM_TUYET_DOI` dò **cụm nhiều âm tiết** (`tốt nhất`, `hàng đầu`),
không dò âm tiết trần `nhất` — nó nằm trong *nhất định*, *thống nhất*.
`CUM_SO_SANH` dò **hình của lời so sánh**, không dò tên đối thủ: một
danh sách tên đối thủ phải dài thêm mãi và luôn thiếu đúng cái tên mới.
`CUM_CAM_KET` dò **cụm hai vế** — `cam kết` trần không đủ, vì kho này
cam kết rất nhiều thứ đúng đắn.

### Hai chỗ bài thử của tôi sai, không phải mã sai

Phá thử xong thì hai phép đo đỏ, và cả hai là **lỗi ở bài thử**: một
bài thử quên khai ba mục người-đo (bản đặc tả viết *"MỌI nội dung tiếp
thị phải qua bộ lọc"* — bảy mục đều phải có **câu trả lời**, thứ khác
nhau là câu trả lời chứ không phải việc có phải trả lời hay không); một
bài thử viết *"Ba mươi phần"* bằng chữ nên không có chữ số nào để mà
đếm. Ghi lại vì cái bẫy thứ hai sẽ quay lại: **phép đo con số không
thấy số viết bằng chữ.**

---

## BỘ NÃO — Phân hệ 4: Vận hành & chăm sóc (9.99.66)

Phần VI. Màn **Vận hành & chăm sóc** (`src/van-hanh-cham-soc.js`, bốn
ngăn), máy chủ `may-chu/van-hanh-cham-soc.js`, kho
`data.van-hanh-cham-soc.js` (9 kho), bảng `hoSoSongSinh` và `soCham`,
bộ kiểm **mục 83**, chín phép đo ở `thu-worker.js`.

### Cái răng chính: đèn Đỏ phải GỌI

Bảng đèn của bản đặc tả có một cột mà mọi bảng đèn khác thường thiếu:
**ai làm**. Cả phân hệ có giá trị ở đúng dòng cuối — đèn Đỏ, **người
thật, gọi điện, trong 24 giờ, không bán gì**.

Một cái đèn đỏ **đóng lại được bằng tin nhắn thì nó không phải đèn
đỏ**. Nhắn tin rẻ, nhanh, và đóng được việc trong sổ — nên nếu cho
phép thì mọi đèn đỏ đều đóng bằng tin nhắn, và bảng ba màu còn đúng
hai màu. `ghiCham` chặn ba đường: nhắn vào nhà đỏ (`DOPHAIGOI`), máy
gọi (`DOPHAINGUOI`), và nhắc bài trong vùng tử thần (`NHACBAI`).

### Hai phép đo về thứ KHÔNG ĐƯỢC TỒN TẠI

Lối đo thứ ba trong bộ dùng nó, sau LR1 (mục 79) và ô tự khai (mục 81):

1. **Bảng `hoSoSongSinh` không có cột nào** cho bốn trường máy tính
   lẫn năm trường đã sống ở hệ khác. Mục 83 đọc **thẳng `csdl.sql`**,
   không tin lời khai của mô-đun.
2. **Mô-đun không mang một đường nào ra Google Sheets**, và cửa đi ra
   gọi đúng cổng ẩn danh của Bộ não chứ không dựng bộ dò thứ hai.

Vì sao gắt đến thế với một cột `den`: có cột thì **hoặc** bị gõ đè —
và một phép đo biến thành một lời khai, mà nhìn thì vẫn y hệt — **hoặc**
không ai gõ và nó cũ đi lặng lẽ, khai XANH cho một nhà đã im lặng hai
mươi ngày, rồi cả quy trình gọi điện trong 24 giờ đi theo nó. Cùng luật
với cột `conHan` **không có** trong `theVungManh` (9.99.63).

### Ba chỗ cố ý không theo bản đặc tả

1. **6.4 đề nghị lưu sổ dấu vết trên Google Sheets — không làm theo.**
   Mỗi dòng mang tên gia đình, tên con, và nội dung một cuộc trò
   chuyện riêng. Đẩy lên một dịch vụ đặt ngoài lãnh thổ là **xử lý dữ
   liệu xuyên biên giới** theo Luật số 91/2025/QH15, và phạm thẳng Điều
   13 của chính Hiến pháp Bộ não. Sổ nằm ở D1.
2. **Tiêu đề 6.1 ghi "20 trường" rồi liệt 12 + 8 + 3 = 23.** Tiêu đề
   viết trước, ba trường v3.0 thêm sau. Lấy 23 và **nói ra chỗ lệch** —
   im thì người đọc đếm được 23 rồi ngờ chính bản đặc tả.
3. **Tám trường "động" không cùng một loại.** Bốn cái máy tính được,
   ba cái đã sống ở hệ khác, một cái người ghi. Gom cả tám thành cột
   là mời người ta gõ đè lên một phép đo. Mỗi trường khai một ô
   `nguon` — `nguoiKhai` · `mayTinh` · `troSang` — và đó là ô quan
   trọng nhất của cả bảng.

### Một phát hiện của bài thử, đáng giữ thành phép đo riêng

Bài thử đầu cho nhà "xanh" tham gia 40 ngày trước rồi chờ nó xanh — và
nó ra **ĐỎ**, đúng như phải thế: **không có dòng nào trong sổ thì số
ngày im lặng đúng bằng số ngày đã tham gia**. Im lặng đếm từ lúc quen
nhau, không từ lúc chạm lần đầu. Để nó nằm im ở xanh vì *"chưa có dữ
liệu"* thì nhà bị bỏ quên ngay từ đầu là nhà không ai đi tìm. Nay có
phép đo riêng cho chỗ ấy.

### Chỗ bộ soi cơ sở dữ liệu bắt ngay

`hoSoSongSinh` lúc đầu thiếu chỉ mục. Chỉ mục thêm vào là
`ix_ss_thamgia` trên `ngayThamGia` — **đường tra thật**, vì nhịp 365
ngày hỏi *"hôm nay nhà nào đang ở ngày 8–12"* và đó là một phép lọc
khoảng trên ngày tham gia. Không phải một chỉ mục thêm cho bộ thử
xanh: chặng tử thần phải quét mỗi ngày, nên nó là đường nóng nhất của
cả bảng.

Và `soatNhacBai` dò **cụm nhiều âm tiết** — `bài hát`, `bài viết` không
bị bắt. Cùng luật chọn dấu hiệu của `CUM_TUYET_DOI` ở 9.99.65.

---

## BỘ NÃO — Phân hệ 5: Tài chính (9.99.67)

Phần VII. Màn **Bảy con số CEO** (`src/tai-chinh-ceo.js`, ba ngăn),
máy chủ `may-chu/tai-chinh-ceo.js`, kho `data.tai-chinh-ceo.js`
(6 kho), bộ kiểm **mục 84**, tám phép đo ở `thu-worker.js`.

### Bảy con số KHÔNG cùng một loại

| Ngăn | Con số | Là gì |
|---|---|---|
| Đo thẳng | S1 tiền mặt · S2 số tháng sống · S3 doanh thu · S7 tự giới thiệu | máy cộng trong sổ |
| Mẫu đủ tuổi | S4 chi phí một khách · S6 ở lại 90 ngày | **chỉ** tính trên phần đã đủ tuổi |
| Ước tính | S5 giá trị 365 ngày | **phép chiếu**, chưa phải phép đo |

**S5 là phép chiếu cho tới khi có một lớp nhà đủ 365 ngày**, và phép
chiếu **luôn đẹp hơn sự thật** — vì nhà rời đi sớm chưa kịp rời đi.
**S6 loại nhà chưa đủ 90 ngày ra khỏi mẫu và nói ra bao nhiêu bị
loại**: đếm họ vào mẫu là thổi tỷ lệ lên, và thổi đúng lúc đang tuyển
nhiều nhất.

**Mẫu rỗng thì không trả về 0%**, nhưng **mẫu có mà không ai ở lại thì
trả 0 thật** — gộp hai trường hợp ấy là mất đúng chỗ có nghĩa.

### S2 tính trên TIỀN CỦA HỌC VIỆN, không trên tổng tiền mặt

Tiền học 365 ngày là **tiền của khách cho tới khi dịch vụ được giao**.
Tính số tháng sống được trên tổng tiền mặt thì nó nói dối theo đúng
hướng nguy hiểm nhất: **dài ra đúng lúc thu được nhiều tiền trả
trước**, tức là đúng lúc nghĩa vụ giao dịch vụ nặng nhất. Máy trả về
ba con số riêng — tiền mặt · chưa giao · của Học viện — không gộp.

### Bốn luật, ba cổng ở đây và một cái TRỎ

L1 runway < 3 → chặn tăng chi, **máy không chọn cắt cái gì**. L2 ở lại
< 60% → chặn **riêng** khoản `tiepThi`, không chặn cả sổ chi (cổng quá
rộng thì người ta tìm đường vòng, và đường vòng không ai canh). L3
tiền của Học viện âm → báo động. **L4 đã chạy từ 9.92** — mô-đun gọi
thẳng `thangDuyetChi()`, và mục 84 **đọc mã nguồn** để canh rằng nó
không khai một con số ngưỡng nào: hai bản ngưỡng tiền lệch nhau thì
một khoản chi lọt qua mà không ai biết.

Khoản mục quảng cáo lấy **đúng tên** trong danh sách trắng của
`chi-tieu.js`, và mục 84 đối chiếu — cổng trỏ vào một tên không tồn
tại thì nó không chặn gì cả.

### Ba kịch bản phải đủ BA ô

Cắt gì trước · **giữ gì tới cùng** · ngưỡng nào thì hành động. Danh
sách **giữ** là phần khó viết và là phần cứu được sản phẩm — một danh
sách cắt không có danh sách giữ thì nó được áp lên mọi thứ. Máy **nói**
dấu hiệu đang trỏ về kịch bản nào rồi **dừng**: chuyển kịch bản có hệ
quả với người đang làm, nên nó phải có một cái tên ký bên dưới.

### Hai chỗ bộ kiểm bắt ngay, và cả hai là lỗi thật

1. **Dấu nháy trong `Academy's` cắt đôi một chuỗi nháy đơn ở
   `i18n.js`** — cả gói mã không parse, và triệu chứng hiện ra là
   `window.G.doLogin is not a function`, không phải một lỗi cú pháp.
   Cách tìm nhanh: `node --check src/*.js` rồi `node --check
   gita-app.js`.
2. **Mục 67 bắt `G.tcMoNgan` trùng với `src/phong-tai-chinh.js`.**
   Tiền tố `tc` đã thuộc về màn Phòng tài chính từ trước; tệp nạp sau
   thắng và tệp kia im lặng gọi nhầm hàm. Đổi tiền tố của màn mới
   thành `ceo`. **Chọn tiền tố là việc phải làm trước khi viết, không
   phải sau khi trùng.**

### Màn khoá `fin_view`, máy chủ khoá R01–R03 — lệch một bậc, CỐ Ý

`fin_view` là câu trả lời **sẵn có** cho *"ai xem tài chính"*, dùng
lại chứ không dựng câu thứ hai. Cổng máy chủ hẹp hơn một bậc theo luật
*tài chính chỉ R01–R03* đã chốt 9.97. Cái hẹp hơn nằm ở **máy chủ** —
đúng chiều an toàn: màn hình chỉ quyết mục nào hiện trong cột trái,
thứ quyết ai đọc được con số là cổng máy chủ.

---

## Bộ tối ưu cấu hình gói (9.99.68)

Theo tệp `gita365-toi-uu-goi.ts` của chủ hệ. Máy chủ
`may-chu/gia-goi.js` (bộ **đánh giá**) và `may-chu/toi-uu-goi.js` (bộ
**tìm**), kho `data.goi-toi-uu.js` (9 kho), bộ kiểm **mục 85**, chín
phép đo ở `thu-worker.js`.

### Hai chỗ phải nói trước

1. Tệp gốc là **TypeScript**, mà kho không có bước biên dịch — và nó
   `import` từ `gita365-gia-goi` **không tồn tại trong kho**. Nên bộ
   đánh giá được dựng lại từ đầu bằng JS thuần.
2. **Mô hình chi phí là con số của chủ hệ.** Kho không có, và máy
   không đoán. `TU_CHIPHI_KHUNG` **rỗng** và khai ở `RONG_CO_Y`;
   `kiemThamSo` chặn và nói thiếu ô nào.

### Hàm mục tiêu là Lời mở đầu Hiến pháp viết thành mã

| Bậc | Điều kiện | Tối đa hoá |
|---|---|---|
| ① | chưa đạt mục tiêu lợi nhuận | **lợi nhuận** |
| ② | đã đạt | **số gia đình**, và **hạ giá** |

Đủ tiền rồi thì phục vụ thêm người, không lấy thêm tiền của cùng số
người. Mục 85 đo bằng **hành vi**, không đọc lời khai: dựng hai cấu
hình cùng đạt mục tiêu và đòi cái **rẻ hơn thắng dù lãi ít hơn**, rồi
nâng mục tiêu để hai bậc đảo chiều và đòi cái **lãi hơn** thắng.

**Hệ quả phải nói ra:** bậc hai **bỏ phần lợi nhuận vượt mục tiêu** ra
khỏi điểm số, nên bộ tối ưu sẽ vui vẻ đánh đổi mười tám tỷ lấy vài
trăm gia đình. Đó đúng là điều được yêu cầu — và nó phải được nói ra
chứ không để người đọc tự phát hiện. Lợi nhuận chỉ còn vai trò **phá
hoà** ở trọng số rất nhỏ, để bộ tối ưu không chốt đúng một cấu hình
nằm sát mép mục tiêu không còn đệm nào.

### Bốn chỗ HỎNG THẬT trong tệp gốc, đã vá

| Mã | Hỏng thế nào |
|---|---|
| V1 | `lamTronGia` **không idempotent** — `f(300.000)=290.000` rồi `f(290.000)=280.000` |
| V2 | `f(999.999)=990.000` nhưng `f(1.000.000)=900.000` |
| V3 | giá "đuôi 9" chỉ áp **dưới mười triệu** |
| V4 | `giaiQuyMo` chia đôi mà **không kiểm điều kiện chia đôi** |

**V1 là chỗ nguy nhất.** `BUOC_GIA` có `1.0` để nghĩa *"không đổi"*, và
cái chặn `giaMoi === giaCu` **không nổ** vì hai số khác nhau. Mỗi vòng
leo đồi hạ **mọi giá một bước mà không phải vì điểm số** — mười hai
vòng là 300.000 xuống 180.000.

**V4 câm đúng ở chỗ nguy hiểm:** phép chia đôi chỉ đúng khi lợi nhuận
tăng theo quy mô. Có gói biên gộp âm thì càng đông càng lỗ, và phép
chia đôi **vẫn trả về một con số trông y hệt một con số đúng**. Nay nó
kiểm ba điểm mẫu trước, và không thoả thì **nói là không giải được**.

**Cách vá V1–V3 là TÁCH HAI VIỆC:** `lamTron` là một phép kỹ thuật và
nó idempotent; `giaDep` (đuôi 9) là một **quyết định giá** và nó chạy
**đúng một lần lúc trình ra**, không chạy trong vòng lặp.

**Và bản vá đầu của tôi sai đúng chỗ V2 vừa vá:** `giaDep(1.000.000)`
ra 900.000, rồi lần gọi sau 900.000 thuộc bậc mười nghìn nên hạ tiếp
còn 890.000. Một giá đứng ngay **đáy bậc** thì không có kiểu "đuôi 9"
nào giữ nó ở lại bậc ấy — để nguyên là câu trả lời đúng.

### Hai thứ khác đã sửa

**Ràng buộc CỨNG tách riêng khỏi ràng buộc mềm.** Vượt trần người dạy
là cấu hình **không tồn tại**, không phải cấu hình kém điểm — trộn hai
loại vào một con số phạt thì một cấu hình không tuyển nổi người vẫn
thắng nhờ điểm đẹp. Mỗi ràng buộc phải khai `cung: true|false`.

**Tỷ giá quy đổi ra khỏi biểu thức.** `MOI_GIA_DINH` và
`MOI_DONG_GIA_TB` quyết định bộ tối ưu chọn hạ giá hay mở rộng — một
gia đình ≡ hạ giá trung bình **20.000đ**. Nằm lẫn trong một biểu thức
thì không ai thấy nó và không ai hỏi ai đặt. Nay có tên riêng và mục
chờ **TU-01**.

Và ngưỡng cải thiện của leo đồi tính **theo tỷ lệ**: `+1` tuyệt đối ở
thang tỷ đồng nằm dưới cả sai số dấu phẩy động, nên cái chặn ấy không
chặn gì.

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
