# GEN VIỆT 365 — hệ thống huấn luyện nhân tài

Ứng dụng trình bày **toàn bộ** hệ thống GEN VIỆT 365 của Học viện GITA: kiến trúc, giáo
trình, mô hình chi hội, bộ đo, biểu mẫu, dữ liệu và lộ trình 30 năm (2026 – 2056).

**43 nhóm · 264 màn · 17 vai.** Có ô tìm — gõ `/` để nhảy vào. Không cần cài gì, không có bước dựng.

Bản viết đầy đủ:
- [`../docs/GEN_VIET_365.md`](../docs/GEN_VIET_365.md) — tập 1 · kiến trúc
- [`../docs/GEN_VIET_365_VAN_HANH.md`](../docs/GEN_VIET_365_VAN_HANH.md) — tập 2 · vận hành
- [`../docs/GEN_VIET_365_CHUYEN_MON.md`](../docs/GEN_VIET_365_CHUYEN_MON.md) — tập 3 · chuyên môn và đội ngũ
- [`../docs/GEN_VIET_365_PHAN_QUYEN.md`](../docs/GEN_VIET_365_PHAN_QUYEN.md) — tập 4 · phân quyền và bảo mật
- [`../docs/GEN_VIET_365_THU_VIEN.md`](../docs/GEN_VIET_365_THU_VIEN.md) — tập 5 · thư viện Gen Việt (bản sinh ra)
- [`../docs/GEN_VIET_365_TRAI_NGHIEM.md`](../docs/GEN_VIET_365_TRAI_NGHIEM.md) — tập 6 · trải nghiệm, giá trị và tin cậy (bản sinh ra)
- [`../docs/GEN_VIET_365_THUONG_HIEU.md`](../docs/GEN_VIET_365_THUONG_HIEU.md) — tập 7 · nhận diện thương hiệu, bản quyền và toàn cầu (bản sinh ra)
- [`../docs/GEN_VIET_365_CAM_TAY.md`](../docs/GEN_VIET_365_CAM_TAY.md) — tập 8 · cầm lên dùng được, và tra cứu (bản sinh ra)
- [`../docs/GEN_VIET_365_NHUONG_QUYEN.md`](../docs/GEN_VIET_365_NHUONG_QUYEN.md) — tập 9 · bộ hồ sơ nhượng quyền (bản sinh ra)
- [`../docs/GEN_VIET_365_TIM_THAY.md`](../docs/GEN_VIET_365_TIM_THAY.md) — tập 10 · tìm thấy được và đáng tin (bản sinh ra)
- [`../docs/GEN_VIET_365_CHUYEN_DE.md`](../docs/GEN_VIET_365_CHUYEN_DE.md) — tập 11 · chuyên đề và giáo án (bản sinh ra)
- [`../docs/GEN_VIET_365_CAP_DO.md`](../docs/GEN_VIET_365_CAP_DO.md) — tập 12 · hệ mười cấp độ và 52 tuần (bản sinh ra)
- [`../docs/GEN_VIET_365_VAN_HANH_CHI_TIET.md`](../docs/GEN_VIET_365_VAN_HANH_CHI_TIET.md) — tập 13 · vận hành chi tiết (bản sinh ra)
- [`../docs/GEN_VIET_365_MASTER_TRAI.md`](../docs/GEN_VIET_365_MASTER_TRAI.md) — tập 14 · Master, trại và VIP (bản sinh ra)
- [`../docs/GEN_VIET_365_DE_AN.md`](../docs/GEN_VIET_365_DE_AN.md) — tập 15 · đề án và bộ trình bày (bản sinh ra)
- [`../docs/GEN_VIET_365_THAM_CHIEU.md`](../docs/GEN_VIET_365_THAM_CHIEU.md) — tập 16 · tham chiếu mô hình chi hội (bản sinh ra)
- [`../docs/GEN_VIET_365_BANG_KE_TAC_PHAM.md`](../docs/GEN_VIET_365_BANG_KE_TAC_PHAM.md) — phụ lục · bảng kê tác phẩm cho hồ sơ quyền tác giả (bản sinh ra)

## Dựng — MỘT lệnh

```bash
node genviet365/tools/dung.cjs            # dựng và kiểm đủ
node genviet365/tools/dung.cjs --nhanh    # bỏ lớp trình duyệt
```

Nó tự làm bảy việc và **dừng ở việc đầu tiên hỏng**: đóng dấu bản (mã băm nội dung) · soi
cú pháp · sinh lại bốn tập tài liệu và năm tệp dấu hiệu · vá số liệu trong tài liệu viết tay ·
chạy bộ kiểm sáu lớp · gộp bản đầy đủ và bốn bản cắt theo vai · in bảng số.

Trước tệp này, phát hành một bản cần nhớ **sáu lệnh chạy đúng thứ tự** và **bốn chỗ phải sửa
tay cho khớp số**. Quên một bước thì bản phát hành mang số liệu cũ mà không ai biết.

## Tầng nền — thứ không còn phải sửa tay

| Trước | Nay |
|---|---|
| 132 dòng keo dán `X: GV.X` trong `man-hinh.js` | Kho **tự đăng ký** vào bảng khoá tra |
| 12 dòng phần trăm trong `du-lieu-quyen.js`, sửa tay mỗi lần thêm màn | **Đếm thật** từ kho màn và bộ máy quyền |
| Bảng % theo bậc học viên, sửa tay | Đếm thật |
| Số liệu rải trong 5 tệp tài liệu, sửa tay | Bộ dựng **vá tự động** |
| Hai bảng vai chép tay ở hai tệp, lệch nhau 16 với 17 | Một nguồn sự thật, bảng kia **sinh ra** từ nó |
| Không có đường ngang giữa các màn | **Tính** bằng từ hiếm dùng chung |

## Chạy

Mở thẳng `genviet365/index.html`, hoặc:

```bash
npx http-server -p 8099 -s .
```

## Trước khi phát hành — chạy bộ kiểm

```bash
node genviet365/tools/kiem-tra.cjs
```

Mã thoát khác 0 nghĩa là **không được phát hành**. Bộ kiểm soi **sáu lớp**: cấu trúc kho, rò rỉ
ở bản cắt, dựng thật bằng Chromium, cổng phân quyền (vào thẳng bằng `#hash`), **ô tìm** (gõ
đúng tiêu đề một màn ngoài quyền không được ra kết quả), và **tương phản màu** — mọi mã màu
chữ phải đạt WCAG AA 4.5 : 1 ở cả chế độ sáng và tối.

Ngoài ra bộ kiểm chặn bốn loại lỗi mà mắt người gần như không thấy:

- **Lời hứa treo** — kho nhắc tới một hiện vật (“bộ bảy câu hỏi bàn ăn”, “Sổ Chuẩn”) mà không
  chỗ nào giao nội dung của nó.
- **Số lệch** — tiêu đề nói “Mười hai khoảnh khắc” mà mảng có mười ba.
- **Va chạm tên** — hai kho cùng đặt `GV.X`; kho nạp sau đè kho trước, âm thầm, và màn dựng
  ra khung rỗng. *Đã xảy ra thật một lần với tên `VAI`.*
- **Khối rỗng** — một khối dựng ra đủ khung nhưng không có chữ. Cả màn vẫn dài nên phép đo
  tổng ký tự không thấy.

## Gộp thành một tệp để gửi đi

```bash
node genviet365/dong-goi-artifact.cjs [đường-dẫn-ra]              # bản đầy đủ
node genviet365/dong-goi-artifact.cjs --vai=R16 --bac=B1 ra.html  # BẢN CẮT
```

**Bản cắt** chỉ đóng gói phần nội dung vai ấy có quyền — kho gốc không nằm trong tệp ra, và
thanh đổi vai bị khoá. Đây là hàng rào thật của một trang tĩnh: *thứ không gửi đi là thứ
không lộ được.*

Sinh ra một trang tự chứa (CSS và mười tám tệp JS nhúng sẵn, chỉ còn phông chữ gọi ra ngoài)
để đăng làm Artifact, gửi qua thư hoặc mở trên máy không có kho mã. Tệp gộp là **bản sinh
ra** — không sửa tay; sửa xong nguồn thì gộp lại.

## Bản đồ tệp

| Tệp | Giữ gì |
|---|---|
| `du-lieu.js` | Lõi kiến trúc: 7 nguyên lý · 7 lớp · hộ chiếu · 6 bậc · 4 trụ × 12 trục × 5 mức · 5 phẩm chất · nhịp 365 · 5 hình thái · mô hình chi hội · 4 môi trường · băng màu · KPI · mã hoá · vai · tài chính · 7 rủi ro · 6 chặng · 90 ngày đầu · nguồn |
| `du-lieu-daotao.js` | Lộ trình từng bậc (chu kỳ 90 ngày) · khoá nền 8 buổi · 24 chuyên đề · thiết kế trại và 21 ngày hậu trại · bộ test đầu vào · đào tạo ban điều hành |
| `du-lieu-vanhanh.js` | Lịch năm 52 tuần · sổ tay 6 vai · sổ tay 3 môi trường · cổng nghiệm thu 100 điểm · 4 báo cáo · 14 biểu mẫu · an toàn và đạo đức · năm đầu tiên |
| `du-lieu-chuyenmon.js` | Ma trận 8 × 8 · quy trình 10 bước · 11 nhóm giải pháp · thư viện 100 chiến lược · thang mức hỗ trợ · cơ chế xử lý tự động theo KPI |
| `du-lieu-congdong.js` | Đường vào 6 bước · mạch tư vấn · buổi tư vấn đầu · 4 chân dung gia đình · đại sứ · bảng thay-vì · nghi lễ · hệ ghi nhận · chuỗi WOW · nghề Coach · 7 năng lực · tuyển và thử việc · chuẩn dự giờ |
| `du-lieu-thuvien.js` | Thư viện Gen Việt: 7 nguyên tắc biên soạn · 6 quyển · 45 chân dung danh nhân, danh tướng, hiền tài, nhà khoa học, người đương thời · 12 mô thức tư duy Việt · bảng phẩm chất · cách đưa vào nhịp tuần · nguồn |
| `du-lieu-trainghiem.js` | Hành trình 365 ngày của một gia đình · 12 khoảnh khắc quyết định · 12 cam kết dịch vụ có mức đền · cổng phụ huynh · 14 hiện vật · 5 bước phục hồi dịch vụ · 6 lý do nghỉ thật · 6 chỉ số cảm nhận |
| `du-lieu-giatri.js` | 5 gói và luật giá · chồng giá trị · 3 lớp bảo đảm · đơn vị kinh tế và bốn ngưỡng · phễu tuyển sinh · bộ thông điệp · 12 phản đối · hợp tác nhà trường · nhân rộng và lõi bất biến |
| `du-lieu-tincay.js` | 3 tầng bằng chứng · 8 chỉ số ngoài hệ · theo dõi dọc 30 năm · kiểm định · 10 luật đỏ bảo vệ trẻ · dữ liệu · 5 cấp khủng hoảng và 24 giờ vàng · 10 hồ sơ pháp lý · câu hỏi thường gặp · sổ ghi lỗi công khai |
| `du-lieu-thuonghieu.js` | Nền tảng và kiến trúc thương hiệu · ý niệm Ấn Gen Việt và 5 biến thể · 10 luật dùng ấn · 8 cách dùng sai · 9 màu đủ hệ mã · 3 phông và thang chữ · luật ảnh trẻ em · giọng thương hiệu · 16 ứng dụng · bộ tệp bàn giao |
| `du-lieu-banquyen.js` | 12 tài sản trí tuệ · đăng ký quyền tác giả và nhãn hiệu · 5 nhóm Nice · đề án cấp quốc gia · **ánh xạ sang Chương trình GDPT 2018** · Berne và Madrid · bản địa hoá 3 tầng · tuân thủ theo vùng · lộ trình toàn cầu · chống xâm phạm |
| `nen/dan-xuat.js` | **Tầng dẫn xuất** — kho tự đăng ký khoá tra · tỉ lệ hiển thị từng vai và từng bậc · bảng vai theo tổ chức · bộ số của hệ · màn liên quan |
| `nen/so-lieu.js` | **Tầng số liệu** — đọc số viết bằng chữ trong tiêu đề (“Mười hai khoảnh khắc”) rồi đối chiếu với độ dài mảng thật. Trả lời câu hỏi *hệ này nói về chính nó có đúng không* |
| `nen/dau-ban.js` | Mã băm nội dung và ngày dựng — **bản sinh ra**, không sửa tay |
| `du-lieu-tuyen.js` | **Năm tuyến Gen Việt, rút từ kho tài liệu gốc của Học viện** — định vị nguyên văn · 5 tuyến · **mô hình 15 giai đoạn** · pipeline 5 cấp · 10 cấp độ CLB · 9 nhóm năng lực A–F · 12 Ban · 5 nhóm × 12 khối lớp · 90 ngày và 5S · dự án phụng sự và 6 sự kiện · 10 đề tài GV-R · 14 nguồn |
| `du-lieu-camtay.js` | **Phần giao ra, không mô tả:** bảy câu hỏi bàn ăn · bản đọc ca một trang · giáo án buổi 1 từng phút · 4 kịch bản gọi điện · 5 thư mẫu có bản viết sẵn · bản đồ 11 ô, Goal Map, sổ phục hồi · 12 câu phỏng vấn Coach · bảng chấm cổng chi tiết |
| `du-lieu-tracuu.js` | Từ điển thuật ngữ có cột tiếng Anh · Sổ Chuẩn và tám cột của nó · bản đồ toàn hệ tám phần · mười đường đọc theo vai |
| `du-lieu-quyen.js` | 17 vai · 13 tầng hiển thị · bảng ghi đè · bậc năng lực học viên → bậc quyền · tỉ lệ hiển thị mong muốn · 6 luật phân quyền |
| `quyen.js` | **Bộ máy quyền** — một nguồn sự thật cho ứng dụng, bộ gộp và bộ kiểm: `duocPhep()` · `lyDoKhoa()` · `demMan()` |
| `tools/sinh-thu-vien.cjs` | Sinh `docs/GEN_VIET_365_THU_VIEN.md` từ kho thư viện — bản markdown là **bản sinh ra**, sửa kho rồi chạy lại |
| `tools/sinh-trainghiem.cjs` | Sinh `docs/GEN_VIET_365_TRAI_NGHIEM.md` từ ba kho trải nghiệm · giá trị · tin cậy |
| `tools/sinh-thuonghieu.cjs` | Sinh `docs/GEN_VIET_365_THUONG_HIEU.md` **và** năm tệp SVG gốc của dấu hiệu vào `nhan-dien/` |
| `nhan-dien/` | Tệp gốc của Ấn Gen Việt — **bản sinh ra**, không sửa tay |
| `tools/dung.cjs` | **Một lệnh dựng** — bảy bước, dừng ở bước đầu tiên hỏng |
| `tools/sinh-camtay.cjs` | Sinh `docs/GEN_VIET_365_CAM_TAY.md` từ hai kho cầm tay và tra cứu |
| `tools/kiem-tra.cjs` | **Bộ kiểm phát hành** — bốn lớp: tĩnh · bản cắt · chạy thật · cổng phân quyền |
| `du-lieu-kythuat.js` | Cấu trúc hộ chiếu JSON · 5 luật ghi dữ liệu · 12 bảng lưu · 9 đường máy chủ · 10 quyền · 7 nguyên tắc dựng phần mềm |
| `man-hinh.js` | `GV.NHOM` (43 nhóm điều hướng) · `GV.MAN` (264 màn, mỗi màn là danh sách KHỐI) · `GV.TU` (bảng tra nối khối tới dữ liệu) |
| `giao-dien.js` | Lớp dựng: 65 loại khối · vẽ Ấn Gen Việt bằng SVG · bộ máy tìm bỏ dấu, lọc theo quyền · vỏ ứng dụng · định tuyến theo hash · nhớ màn đang đọc |
| `style.css` | Bảng màu lấy từ nhận diện GITA · kiểu chữ · bố cục · sáng và tối |
| `index.html` | Vỏ — nạp phông rồi nạp mười tám tệp JS theo đúng thứ tự |
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

Rồi mở thử toàn bộ 264 màn ở cả hai chế độ sáng và tối, và ở khổ điện thoại — bộ kiểm cần
bắt được ba thứ: màn dựng ra quá ngắn, khối thiếu loại, và trang tràn ngang.
