# KẾ HOẠCH SẢN XUẤT VÀ DUYỆT HỌC LIỆU GITA

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn

> Phiên bản 2.0. Giai đoạn **sản xuất** đã hoàn tất; tài liệu này nay là kế hoạch
> **duyệt và phát hành**.

---

## 1. TỔNG KHỐI LƯỢNG VÀ TÌNH TRẠNG

| Hạng mục | Số lượng | Tình trạng |
|---|---:|---|
| Cụm chuyên đề (chương) | 96 | đủ |
| Phiếu học 90 phút | 576 | đủ, đạt kiểm định |
| Phiếu kiểm tra mốc | 24 | đủ, đạt kiểm định |
| Phiếu Lời giải & Phân tích chuyên sâu | 600 | đủ, đạt kiểm định |
| Phiếu Hướng dẫn ôn chắc chuyên đề | 96 | đủ, đạt kiểm định |
| **Cộng trong `03-phieu/`** | **1 296** | **1 296 / 1 296 đạt** |
| Phiếu ôn tập mốc · đề thi mốc · đề đánh giá năng lực | 12 · 120 · 30 | chỉ mục đủ, 3 đề mẫu đã soạn |
| Bản đồ kiến thức | 9 | đủ |
| Bộ test đầu vào bốn trục | 3 | đủ |
| Sơ đồ đọc vị đề bài (8 nhóm × 3 lớp) | 24 | đủ |
| Lộ trình học 34 tuần (2 tuyến × 3 lớp) | 6 | đủ |

Kiểm định: `validate_phieu.py --all` → **0 lỗi**. Kiểm toán: `kiem_toan.py` →
**36 / 36 hạng mục đạt**.

## 2. CÁCH KHO ĐƯỢC DỰNG

Kho không được gõ tay mà được **sinh bằng mã**, theo một nguyên tắc bất di bất dịch:
**mọi đáp số do máy tính ra, không do người gõ.** Người biên soạn viết lời dẫn, hướng
giải, lỗi thường gặp, gợi ý ba tầng và sáu cột bảng phân tích — tất cả đóng gói trong
**241 mẫu bài** phủ kín 8 nhóm chuyên đề × 5 mức × 3 lớp. Cả 120 ô (lớp × nhóm × mức)
đều có từ hai mẫu trở lên, và cả **538 dạng bài** của ngân hàng đều có mẫu khớp.

| Lớp phần mềm | Nơi để | Việc |
|---|---|---|
| Khung mẫu bài | `04-cong-cu/sinh/khung.py` | định dạng số Việt Nam, bối cảnh, đối tượng `Bai`, `Mau` |
| Thư viện mẫu | `04-cong-cu/sinh/mau_*.py` | 241 mẫu, mỗi mẫu tự chọn số liệu và tự tính đáp số |
| Bảng phương pháp giải | `04-cong-cu/data/phuong_phap.py` | 16 phương pháp — trục thứ hai của chương trình |
| Bộ chọn mẫu | `04-cong-cu/lap/chon.py` | chọn năm mẫu cho một phần, ưu tiên khớp dạng bài của cụm |
| Phần có cấu trúc | `04-cong-cu/lap/meta.py` | sơ đồ tư duy, bảng dạng bài, đọc vị, kỹ năng, thuyết trình |
| Bộ lắp phiếu | `04-cong-cu/lap/phieu.py` | kết xuất đề và hướng dẫn giải |
| Bộ lắp phiếu kèm | `04-cong-cu/lap/kem.py` | phiếu GP bảy mục và phiếu HD bảy mục |
| Bộ chạy cả kho | `04-cong-cu/sinh_kho.py` | sinh 1 296 tài liệu trong khoảng 3 giây |
| Cây đọc vị viết tay | `04-cong-cu/data/so_do_doc_vi.py` | 8 cây quyết định, 47 nút, 8 cặp chữ dễ nhầm |
| Bộ sinh sơ đồ đọc vị | `04-cong-cu/build_so_do.py` | 24 sơ đồ trong `10-so-do-doc-vi/` |
| Bộ sinh lộ trình | `04-cong-cu/build_lo_trinh.py` | 6 lộ trình 34 tuần trong `05-lo-trinh/` |

Hạt giống ngẫu nhiên chốt theo **mã phiếu**, nên sinh lại bao nhiêu lần cũng ra đúng
tài liệu ấy, và phiếu GP luôn khớp từng ý với phiếu học tương ứng.

## 3. VIỆC CÒN LẠI — DUYỆT NGƯỜI

Máy đã bảo đảm được: đúng cấu trúc, đúng thang điểm, đúng số ý, mọi ý có đáp số, đáp số
tính đúng, không dùng thuật ngữ THCS, có đủ bẫy và gợi ý ba tầng. Máy **không** bảo đảm
được: lời văn tự nhiên, độ khó vừa tầm học viên thật, và sự ăn khớp giữa bài với đúng
tiến độ của lớp. Đó là phần việc của chủ biên.

**Thứ tự duyệt — ưu tiên theo mức ảnh hưởng:**

| Vòng | Duyệt gì | Số tài liệu | Vì sao trước |
|:--:|---|---:|---|
| 1 | 24 phiếu kiểm tra mốc `MOC` | 24 | dùng để chấm và xếp tầng năng lực, sai là sai cả lộ trình |
| 2 | 96 phiếu `TH` thi chương | 96 | quyết định đóng cụm hay học lại |
| 3 | 96 phiếu `NC` luyện nâng cao | 96 | phần IV và V là chỗ phân hoá học sinh giỏi |
| 4 | 96 phiếu `HD` hướng dẫn ôn chắc | 96 | học viên tự ôn theo phiếu này khi không có giáo viên |
| 5 | 288 phiếu `LT` `DB` `KN` | 288 | nội dung nền, ít rủi ro hơn |
| 6 | 600 phiếu `GP` | 600 | sinh cùng hạt giống với phiếu học, duyệt sau cùng |

**Định mức đề nghị:** một chủ biên duyệt 8 phiếu một buổi 3 giờ. Vòng 1 đến vòng 4 (312
tài liệu) hết khoảng 39 buổi; chia cho 4 chủ biên là **10 buổi mỗi người**.

**Cách ghi kết quả duyệt:** mỗi tài liệu ghi một dòng vào `05-lo-trinh/so-duyet.csv`
(`ma, người duyệt, ngày, đạt|sửa|làm lại, ghi chú`). Tài liệu bị đánh `sửa` thì sửa
thẳng vào tệp Markdown; tài liệu `làm lại` thì sửa **mẫu bài** trong `04-cong-cu/sinh/`
rồi chạy lại `sinh_kho.py --ghi-de`, vì lỗi ở mẫu là lỗi lặp lại ở hàng chục phiếu.

## 4. THƯỚC ĐO CHẤT LƯỢNG

Cụm `GITA-T1-L4-C03` — *Trung bình cộng, tổng – hiệu và bài toán đại lượng* — và phiếu
`GITA-T2-L5-C04-NC` là **bản viết tay chuẩn vàng**. Bộ sinh không ghi đè hai bản này.
Khi phân vân một phiếu sinh tự động đã đủ chất lượng chưa, mở chuẩn vàng ra so ba điểm:

1. Lời dẫn của bài có nói rõ tình huống không, hay chỉ là một mệnh lệnh trống?
2. Phần V có thật sự đòi tư duy khác phần IV, hay chỉ là số to hơn?
3. Bảng phân tích sáu cột có đọc ngang thành một câu có nghĩa không?

## 5. MỞ RỘNG THƯ VIỆN MẪU

Thư viện 241 mẫu là **tài sản gốc** của hệ thống: thêm một mẫu tốt là nâng chất lượng
hàng chục phiếu cùng lúc. Không còn ô trống và không còn dạng bài nào chưa phủ, nên
việc mở rộng từ đây là **làm dày chỗ mỏng**, không phải vá chỗ thủng.

Đo bằng `kiem_tra_mau.py`: sàn hiện tại là **2 mẫu một ô**, chạm sàn ở phần lớn các ô
của lớp 3. Ưu tiên bổ sung, theo thứ tự:

| Ưu tiên | Ô còn mỏng | Vì sao |
|:--:|---|---|
| 1 | Lớp 3 — nhóm A, B, C, mức M2 → M5 | đúng sàn 2 mẫu, mà lớp 3 có 200 phiếu rút từ đây |
| 2 | Nhóm E, F, G, H — mức M5 lớp 4 và 5 | phần V phải phân hoá được học sinh giỏi với xuất sắc |
| 3 | Nhóm D — mức M4 lớp 4 | nhóm đông dạng bài nhất, mẫu càng nhiều càng ít lặp |

Ngưỡng nên giữ: **mỗi ô ≥ 2 mẫu** là bắt buộc (`kiem_tra_mau.py` báo lỗi nếu tụt),
**≥ 4 mẫu** là mức thoải mái để một phiếu năm bài không phải dùng lại mẫu.

**Cách thêm một mẫu:** viết một hàm trong `04-cong-cu/sinh/mau_x.py`, gắn `@dang_ky`,
chạy `python3 04-cong-cu/kiem_tra_mau.py`, rồi `sinh_kho.py --ghi-de`. Không cần sửa gì
khác trong hệ thống.

## 6. PHÁT HÀNH BẢN ONLINE

Kho đủ nặng 53 MB nên bản online tách theo khối lớp; địa chỉ ba bản ghi tại
`09-online/dia-chi-ban.json`. Quy trình phát hành lại sau mỗi vòng duyệt:

```
python3 04-cong-cu/sinh_kho.py --ghi-de
python3 04-cong-cu/build_so_do.py
python3 04-cong-cu/build_lo_trinh.py
python3 04-cong-cu/validate_phieu.py --all
python3 04-cong-cu/kiem_toan.py
for L in 3 4 5; do
  python3 04-cong-cu/build_web_data.py --lop $L
  python3 04-cong-cu/build_artifact.py --lop $L
done
```

Chỉ phát hành khi cả hai lệnh kiểm tra đều báo **sạch lỗi**.

## 7. PHÁT HÀNH BẢN CÔNG KHAI LÊN GOOGLE

Bản online ở mục 6 là trang riêng tư, không lên được công cụ tìm kiếm. Bản công khai là
một website tĩnh riêng, dựng từ cùng kho học liệu:

```
python3 04-cong-cu/build_site.py        # 2 003 trang HTML vào 11-seo/site/
python3 04-cong-cu/kiem_toan_seo.py     # 28 hạng mục, phải sạch lỗi
```

Chiến lược, chuẩn kỹ thuật và các bước đưa lên tên miền nằm ở `11-seo/`.

**Luật ghi phải khai lại ở mỗi lần xuất bản.** Cấu hình `capabilities` ở mục 4 của
`01-kien-truc/07` là tham số của lệnh xuất bản, không nằm trong tệp HTML: xuất bản mà
quên khai thì bản đó rơi về quyền ghi mặc định — ai mở được trang cũng ghi được vào
vùng dữ liệu chung. Sau mỗi lần phát hành, đối chiếu cả ba bản đều báo `db[2 rules]`.
