# QUY TRÌNH BIÊN SOẠN MỘT CỤM CHUYÊN ĐỀ

> Đơn vị giao việc là **một cụm**, không phải một phiếu. Một cụm gồm **13 tài liệu**:
> 6 phiếu học + 6 phiếu lời giải + 1 phiếu hướng dẫn ôn chắc.

---

## 1. Nhận việc

Mở `02-chi-muc/chi-muc-L{lớp}-{tuyến}.md`, tìm cụm được giao, chép ra:

- tên cụm, nhóm chuyên đề, số thứ tự phiếu, tuần, học kỳ, mốc;
- **danh sách dạng bài** của cụm — đây là ranh giới nội dung, không được đi ra ngoài.

## 2. Thứ tự làm — không đảo

| Bước | Sản phẩm | Vì sao đứng ở vị trí này |
|:--:|---|---|
| 1 | **Phiếu `HD`** | Là xương sống: bản đồ chương, bảng công thức, bảng dạng bài. Làm trước thì sáu phiếu sau bám cùng một khung. |
| 2 | **Phiếu `LT`** | Dựng key lý thuyết và sơ đồ tư duy bảy ô. |
| 3 | **Phiếu `DB`** | Mỗi dạng bài đủ năm mục; phần Đọc vị đủ bốn bước. |
| 4 | **Phiếu `KN`** | 30 câu tốc độ, kỹ năng trình bày, dò soát ba tầng, kịch bản thuyết trình. |
| 5 | **Phiếu `NC`** | Mức M1 đến M5, có 2–4 bẫy ở hai phần cuối. |
| 6 | **Phiếu `OT`** | Ma trận đề của chương, bài phân hoá, thi đấu phản biện. |
| 7 | **Phiếu `TH`** | Bài kiểm tra kết thúc cụm. |
| 8 | **Sáu phiếu `GP`** | Viết sau cùng, khi đã có toàn bộ đề. |

## 3. Giải thử độc lập — bắt buộc

Người **thứ hai** giải toàn bộ phiếu, **không nhìn đáp án**. Mọi chênh lệch phải xử lý
xong trước khi viết phiếu `GP`. Ghi tên người giải thử vào cuối phiếu.

## 4. Đối chiếu số học bằng máy

Mọi đáp số phải được kiểm bằng một đoạn tính ngắn, **không tin vào nhẩm tay**. Ví dụ:

    def th(T, H): return (T + H) // 2, (T - H) // 2
    print(th(84, 6))         # kỳ vọng (45, 39)
    print(24 * 15, 360 // 12)  # kỳ vọng 360 30

Ba phép kiểm bắt buộc với nhóm chuyên đề D:

1. `(Tổng + Hiệu) % 2 == 0` — nếu lẻ thì bài vô nghiệm trong số tự nhiên.
2. `Tổng % Số_các_số_hạng == 0` — nếu dư thì trung bình cộng ra số lẻ.
3. Mọi phép chia trong Phần I và Phần II phải chia hết.

## 5. Kiểm định tự động

    python3 04-cong-cu/validate_phieu.py 03-phieu/T1/L4/GITA-T1-L4-C01-NC.md
    python3 04-cong-cu/validate_phieu.py --all
    python3 04-cong-cu/kiem_toan.py

Phiếu chỉ được phát hành khi **cả hai lệnh sau đều sạch lỗi**: `validate_phieu.py --all`
và `kiem_toan.py`.

## 6. Kết xuất bản in

    python3 04-cong-cu/render_html.py 03-phieu/T1/L4/GITA-T1-L4-C01-NC.md

Sinh ra hai tệp trong `04-cong-cu/ban-in/`: bản **ĐỀ** phát cho học viên và bản **ĐÁP ÁN**
dành cho huấn luyện viên. Mở bằng trình duyệt rồi in ra PDF hoặc in giấy khổ A4.
**Không bao giờ phát nhầm bản ĐÁP ÁN cho học viên** — bản này có dải màu đỏ ở góc phải trên.

## 7. Cập nhật hệ thống online

    python3 04-cong-cu/build_web_data.py
    python3 04-cong-cu/build_artifact.py

---

## Mười lỗi hay gặp nhất khi biên soạn

| # | Lỗi | Cách tránh |
|---:|---|---|
| 1 | Đáp số ra số lẻ ở Phần I và Phần II | Chọn số liệu ngược từ đáp số đẹp |
| 2 | Tổng và hiệu khác tính chẵn lẻ trong bài tổng – hiệu | Kiểm tra tổng cộng hiệu có chia hết cho 2 |
| 3 | Bài trung bình cộng cho ra số thập phân ngoài ý muốn | Chọn tổng chia hết cho số các số hạng |
| 4 | Quên ghi đơn vị ở đáp số | Soát tầng 1 trước khi nộp bản thảo |
| 5 | Đặt bẫy ở Phần I hoặc Phần II | Bẫy chỉ được đặt ở hai phần cuối |
| 6 | Dùng thuật ngữ trung học cơ sở | Bộ kiểm định chặn, nhưng nên tự tránh từ đầu |
| 7 | Câu đề dài quá 35 chữ | Tách câu hoặc gạch đầu dòng dữ kiện |
| 8 | Số ý một bài dưới 4 hoặc trên 10 | Bộ kiểm định chặn |
| 9 | Thiếu Gợi ý ba tầng ở hai phần cuối | Bộ kiểm định chặn |
| 10 | Tên phiếu không khớp chỉ mục | Chép nguyên văn từ chỉ mục, không tự đặt lại |
