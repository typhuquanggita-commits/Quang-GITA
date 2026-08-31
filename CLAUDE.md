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
| Kho vừa đóng đổi gì | `node tools/soi-doi-kho.js` | 3 giây |

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
4. Bump số bản ở `src/data.core.js`, `desktop/package.json`, `sw.js`

**Không bao giờ `git add kho-goc/` hay `kho/khoa.json`.**

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

## Một phép kiểm chưa từng đỏ thì chưa phải phép kiểm

Viết xong một phép kiểm mới thì **cố tình làm hỏng dữ liệu** để xem nó có
đỏ đúng chỗ không, rồi mới trả dữ liệu về. Luật này đã bắt được ba phép
kiểm câm trong kho này.

---

## Việc còn chờ chủ hệ thống, không phải chờ mã

- Bật GitHub Pages: `Settings → Pages → Source: GitHub Actions`
- Trỏ DNS cho `gita.edu.vn`
- Điền pháp nhân vào `LICENSE` và `NOTICE`
- Điền hệ số lương ở `CV_HANG[].heSoGhiChu`
- Điền học phí ở `G.HP_TANG[].gia`
- Đặt ngưỡng chuyển tuyến y tế / tâm lý
