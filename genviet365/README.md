# GEN VIỆT 365 — hệ thống huấn luyện nhân tài

Ứng dụng trình bày **toàn bộ** hệ thống GEN VIỆT 365 của Học viện GITA: kiến trúc, giáo
trình, mô hình chi hội, bộ đo, biểu mẫu, dữ liệu và lộ trình 30 năm (2026 – 2056).

**16 nhóm · 100 màn · 17 vai.** Không cần cài gì, không có bước dựng.

Bản viết đầy đủ:
- [`../docs/GEN_VIET_365.md`](../docs/GEN_VIET_365.md) — tập 1 · kiến trúc
- [`../docs/GEN_VIET_365_VAN_HANH.md`](../docs/GEN_VIET_365_VAN_HANH.md) — tập 2 · vận hành
- [`../docs/GEN_VIET_365_CHUYEN_MON.md`](../docs/GEN_VIET_365_CHUYEN_MON.md) — tập 3 · chuyên môn và đội ngũ
- [`../docs/GEN_VIET_365_PHAN_QUYEN.md`](../docs/GEN_VIET_365_PHAN_QUYEN.md) — tập 4 · phân quyền và bảo mật
- [`../docs/GEN_VIET_365_THU_VIEN.md`](../docs/GEN_VIET_365_THU_VIEN.md) — tập 5 · thư viện Gen Việt (bản sinh ra)
- [`../docs/GEN_VIET_365_TRAI_NGHIEM.md`](../docs/GEN_VIET_365_TRAI_NGHIEM.md) — tập 6 · trải nghiệm, giá trị và tin cậy (bản sinh ra)

## Chạy

Mở thẳng `genviet365/index.html`, hoặc:

```bash
npx http-server -p 8099 -s .
```

## Trước khi phát hành — chạy bộ kiểm

```bash
node genviet365/tools/kiem-tra.cjs
```

Mã thoát khác 0 nghĩa là **không được phát hành**. Bộ kiểm soi bốn lớp: cấu trúc kho, rò rỉ
ở bản cắt, dựng thật bằng Chromium, và cổng phân quyền (thử vào thẳng bằng `#hash` vào từng
màn ngoài quyền).

## Gộp thành một tệp để gửi đi

```bash
node genviet365/dong-goi-artifact.cjs [đường-dẫn-ra]              # bản đầy đủ
node genviet365/dong-goi-artifact.cjs --vai=R16 --bac=B1 ra.html  # BẢN CẮT
```

**Bản cắt** chỉ đóng gói phần nội dung vai ấy có quyền — kho gốc không nằm trong tệp ra, và
thanh đổi vai bị khoá. Đây là hàng rào thật của một trang tĩnh: *thứ không gửi đi là thứ
không lộ được.*

Sinh ra một trang tự chứa (CSS và mười bốn tệp JS nhúng sẵn, chỉ còn phông chữ gọi ra ngoài)
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
| `du-lieu-quyen.js` | 17 vai · 13 tầng hiển thị · bảng ghi đè · bậc năng lực học viên → bậc quyền · tỉ lệ hiển thị mong muốn · 6 luật phân quyền |
| `quyen.js` | **Bộ máy quyền** — một nguồn sự thật cho ứng dụng, bộ gộp và bộ kiểm: `duocPhep()` · `lyDoKhoa()` · `demMan()` |
| `tools/sinh-thu-vien.cjs` | Sinh `docs/GEN_VIET_365_THU_VIEN.md` từ kho thư viện — bản markdown là **bản sinh ra**, sửa kho rồi chạy lại |
| `tools/sinh-trainghiem.cjs` | Sinh `docs/GEN_VIET_365_TRAI_NGHIEM.md` từ ba kho trải nghiệm · giá trị · tin cậy |
| `tools/kiem-tra.cjs` | **Bộ kiểm phát hành** — bốn lớp: tĩnh · bản cắt · chạy thật · cổng phân quyền |
| `du-lieu-kythuat.js` | Cấu trúc hộ chiếu JSON · 5 luật ghi dữ liệu · 12 bảng lưu · 9 đường máy chủ · 10 quyền · 7 nguyên tắc dựng phần mềm |
| `man-hinh.js` | `GV.NHOM` (16 nhóm điều hướng) · `GV.MAN` (100 màn, mỗi màn là danh sách KHỐI) · `GV.TU` (bảng tra nối khối tới dữ liệu) |
| `giao-dien.js` | Lớp dựng: 52 loại khối · vỏ ứng dụng · định tuyến theo hash · nhớ màn đang đọc |
| `style.css` | Bảng màu lấy từ nhận diện GITA · kiểu chữ · bố cục · sáng và tối |
| `index.html` | Vỏ — nạp phông rồi nạp mười bốn tệp JS theo đúng thứ tự |
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

Rồi mở thử toàn bộ 100 màn ở cả hai chế độ sáng và tối, và ở khổ điện thoại — bộ kiểm cần
bắt được ba thứ: màn dựng ra quá ngắn, khối thiếu loại, và trang tràn ngang.
