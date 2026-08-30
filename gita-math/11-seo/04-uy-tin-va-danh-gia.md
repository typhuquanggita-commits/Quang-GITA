# UY TÍN VÀ ĐÁNH GIÁ NĂM SAO

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn

> Yêu cầu đặt ra là **đánh giá chất lượng năm sao**. Tài liệu này nói cách đạt được nó
> một cách bền, và nói thẳng vì sao cách nhanh — tự viết vài dòng khen rồi gắn năm ngôi
> sao vào mã trang — là cách chắc chắn nhất để mất tất cả.

---

## 1. VÌ SAO KHÔNG ĐƯỢC TỰ GẮN SỐ SAO

Ba lý do, xếp theo mức thiệt hại tăng dần:

**Thứ nhất, nó không hoạt động.** Google không hiện đánh giá mà một tổ chức tự viết về
chính mình. Khối `aggregateRating` gắn trên trang của chính tổ chức ấy bị bỏ qua — công
sức đổ vào đó không đổi lấy được ngôi sao nào trên trang kết quả.

**Thứ hai, nó vi phạm chính sách.** Đánh giá phải đến trực tiếp từ người dùng thật. Đánh
giá tự viết hoặc mua được là vi phạm chính sách dữ liệu có cấu trúc, và hình phạt không
chỉ rơi vào trang vi phạm mà **gỡ toàn bộ kết quả mở rộng của cả tên miền** — mất luôn
cả vệt đường dẫn, cả thông tin khoá học, trên toàn bộ 2 003 trang.

**Thứ ba, và quan trọng nhất, nó nói dối phụ huynh.** Người đang cân nhắc gửi con đi học
đọc dòng đánh giá ấy để ra một quyết định thật. Một con số bịa ra ở đó không phải là mẹo
xếp hạng, nó là lời nói dối với người đang tin mình.

Vì ba lý do ấy, việc chặn được viết thẳng vào mã chứ không để ở mức nhắc nhở:
`seo.xep_danh_gia()` chỉ trả về khối đánh giá khi có dữ liệu thật, và
`kiem_toan_seo.py` báo lỗi và chặn phát hành nếu thấy `AggregateRating` xuất hiện mà
chưa có dữ liệu ấy.

## 2. NĂM SAO THẬT ĐẾN TỪ ĐÂU

Từ đúng một chỗ: **học viên học xong thấy khác đi và nói ra điều ấy.** Mọi thứ dưới đây
chỉ là cách thu thập và trình bày cho trung thực.

### 2.1. Hỏi vào đúng lúc

Lộ trình 34 tuần có **bốn cổng kiểm tra** ở tuần 8, 16, 25 và 33. Đó là bốn thời điểm
tự nhiên để hỏi, vì học viên vừa thấy kết quả của mình bằng con số.

Hỏi ngay sau buổi học đầu tiên thì chưa có gì để nói. Hỏi lúc kết thúc khoá thì đã muộn
— người đã đi rồi thường không trả lời nữa.

### 2.2. Hỏi ba câu, không hỏi mười câu

| Câu | Vì sao hỏi |
|---|---|
| Chấm từ 1 đến 5 sao | Con số để tổng hợp |
| **Điều gì có ích nhất với con?** | Câu trả lời cho biết phần nào của chương trình thật sự có tác dụng |
| **Điều gì cần sửa?** | Câu này quan trọng hơn câu trên. Phiếu hỏi không có chỗ chê là phiếu hỏi để tự khen |

Phiếu hỏi dài làm tỉ lệ trả lời tụt thẳng. Ba câu đủ để có cả con số lẫn lời.

### 2.3. Xin phép trước khi đăng

Ý kiến chỉ được đăng khi người viết đồng ý cho đăng kèm tên và vai trò. Ý kiến không
được phép vẫn tính vào điểm trung bình nhưng không hiện nội dung.

## 3. CÁCH GHI VÀ CÔNG BỐ

Đánh giá được giữ trong `11-seo/danh-gia/danh-gia.json`. Chưa có tệp ấy thì trang
`/danh-gia/` hiện đúng một câu: *chưa có đánh giá nào được đăng* — và đó là câu trung
thực, không phải chỗ trống đáng ngại.

```json
{
  "cap_nhat": "2026-09-15",
  "so_luot": 24,
  "diem_trung_binh": 4.6,
  "y_kien": [
    {
      "nguoi": "Nguyễn Thị …",
      "vai": "Phụ huynh học sinh lớp 4",
      "ngay": "2026-09-10",
      "sao": 5,
      "noi_dung": "…",
      "dong_y_dang": true
    }
  ]
}
```

Nhập và kiểm tệp ấy bằng:

```
python3 04-cong-cu/nhap_danh_gia.py --kiem          # kiểm tệp hiện có
python3 04-cong-cu/nhap_danh_gia.py --tinh-lai      # tính lại số lượt và điểm trung bình
```

Công cụ này **tự tính** `so_luot` và `diem_trung_binh` từ danh sách ý kiến, để hai con
số ấy không bao giờ có thể được gõ tay lệch với dữ liệu.

### 3.1. Ngưỡng năm lượt

`xep_danh_gia()` không trả về gì khi dưới 5 lượt. Không phải quy định của Google, mà là
vì trung bình của 2–3 lượt không nói lên điều gì: một người chấm 5 sao và một người chấm
3 sao cho ra "4,0" trông như một kết luận, nhưng thực chất là nhiễu.

### 3.2. Đăng cả ý kiến chê

Ý kiến chê được đăng **cùng chỗ với ý kiến khen**, và kèm phần trả lời của Hội đồng
chuyên môn về việc đã sửa gì. Hai lý do: một trang toàn năm sao làm người đọc nghi ngờ
nhiều hơn là tin, và một lời chê được trả lời tử tế thuyết phục hơn mười lời khen.

### 3.3. Không đổi quà lấy đánh giá

Đánh giá mua được bằng quà thì không còn là thông tin, chỉ còn là quảng cáo — và người
đọc nhận ra điều đó nhanh hơn người viết tưởng.

## 4. UY TÍN KHÔNG NẰM Ở SỐ SAO

Với chủ đề dạy toán cho trẻ em, cỗ máy tìm kiếm — và phụ huynh — đánh giá nặng ba câu
hỏi, không câu nào trong đó là "mấy sao":

| Câu hỏi | Trả lời ở đâu | Tình trạng |
|---|---|---|
| **Ai viết nội dung này?** | `/ve-chung-toi/` | ⚠ Đang ghi "Hội đồng chuyên môn" chung chung. **Phải thay bằng tên thật, ảnh thật, chuyên môn thật** |
| **Viết dựa trên gì?** | `/quy-trinh-bien-soan/` | ✔ Đã ghi đầy đủ: đáp số do máy tính ra, kiểm định tự động, vòng duyệt của người, nguồn tham chiếu, cách báo lỗi |
| **Có ai kiểm chứng chưa?** | `/danh-gia/` và các trang dẫn về | ⚠ Chờ đánh giá thật và chờ trang khác dẫn về |

Việc ở dòng đầu — **đứng tên thật** — có tác động lớn nhất trên mỗi giờ công bỏ ra trong
toàn bộ chiến lược tìm kiếm này. Nó không cần lập trình, không cần ngân sách, và hiện là
việc đang bị bỏ trống.

## 5. NHỮNG GÌ ĐÃ ĐƯỢC LÀM SẴN ĐỂ ĐỠ CHO UY TÍN

| Đã có | Ở đâu |
|---|---|
| Trang quy trình biên soạn viết thẳng, kể cả chỗ chưa hoàn hảo | `/quy-trinh-bien-soan/` |
| Cam kết công khai ba điều không làm với đánh giá | `/danh-gia/` |
| Nói rõ không đoán chỉ tiêu, không đoán điểm chuẩn, không bán "đề tủ" | `/thi-vao-6/` và bảy trang trường |
| Ngày cập nhật ở chân mọi trang | mọi trang |
| Kênh báo lỗi đề và đáp án, kèm cam kết sửa | `/quy-trinh-bien-soan/` |
| Khối nhận diện tổ chức gắn trên toàn bộ 2 003 trang | `seo.to_chuc()` |

Sáu điều này không tạo ra ngôi sao nào trên trang kết quả. Chúng tạo ra thứ khó hơn và
bền hơn: **lý do để tin**.
