# Khung chương trình: 2.000 phiếu luyện và 2.000 nhiệm vụ

Tài liệu này mô tả cách bộ phiếu được dựng, cách một phiếu vận hành, và các quy tắc
lên cấp — lên giai đoạn.

---

## 1. Vì sao sinh phiếu thay vì gõ tay

Gõ tay 2000 phiếu tạo ra ba vấn đề không thể sửa được về sau:

- **Không kiểm tra được tính nhất quán.** Không ai đọc hết 2000 tệp để phát hiện một
  phiếu cấp 5 lại toàn câu nhận biết.
- **Lệch ngay khi khung thay đổi.** Đổi ngưỡng thành thạo từ 85% xuống 80% nghĩa là
  sửa 2000 chỗ.
- **Không mở rộng được.** Thêm 500 câu hỏi mới không tự động cải thiện phiếu nào cả.

Bộ phiếu ở đây được **sinh ra từ đặc tả** trong `src/data/worksheets.ts`. Đổi khung
chương trình một chỗ, cả 2000 phiếu cập nhật theo. Thêm câu hỏi vào ngân hàng, các
phiếu tự động lấy câu mới mà không phải sửa gì.

---

## 2. Phân bổ 2.000 phiếu

Có **180 ô** = 30 chuyên đề × 6 cấp độ. Mỗi ô nhận một số phiếu tỉ lệ với:

```
trọng số ô = tỉ trọng phần thi × tỉ trọng chuyên đề trong phần × tỉ trọng cấp độ
```

- **Tỉ trọng phần thi**: mỗi phần 1/3. Trong phần 3, mỗi môn tự chọn được 1/5 của 1/3.
- **Tỉ trọng chuyên đề**: khai báo trong `src/data/topics.ts`, cộng lại đúng bằng 1
  trong mỗi nhóm (có bài test canh giữ).
- **Tỉ trọng cấp độ**: 14% / 18% / 20% / 20% / 16% / 12% — dày ở giữa, vì cấp 3–4 là
  nơi phần lớn người học ở lại lâu nhất.

Phần lẻ được chia bằng **phương pháp số dư lớn nhất (Hare)**, kèm sàn tối thiểu 1
phiếu cho mỗi ô. Tổng luôn đúng bằng 2000 — đây là bất biến, không phải kết quả may mắn.

---

## 3. Sáu cấp độ, ba giai đoạn

| Cấp | Tên | Giai đoạn | Số câu | Giây/câu | Độ khó | KN |
|---|---|---|---|---|---|---|
| 1 | Khởi động | 1 — Nền tảng | 8 | 60 | 1–2 | 40 |
| 2 | Cơ bản | 1 — Nền tảng | 10 | 70 | 1–3 | 60 |
| 3 | Vận dụng | 2 — Tăng tốc | 12 | 75 | 2–3 | 90 |
| 4 | Thành thạo | 2 — Tăng tốc | 12 | 65 | 2–4 | 120 |
| 5 | Nâng cao | 3 — Bứt phá | 14 | 70 | 3–5 | 160 |
| 6 | Đỉnh cao | 3 — Bứt phá | 15 | 60 | 4–5 | 220 |

Lưu ý chỗ **giây/câu giảm** khi lên cấp 4 và cấp 6: đó là chủ ý. Ở những cấp đó, cái
cần rèn không phải là độ khó mà là tốc độ giữ được độ chính xác.

---

## 4. Tám dạng phiếu

Chuỗi dạng phiếu lặp lại trong mỗi tuyến, để người học luôn luân phiên giữa "hiểu",
"nhanh", "chính xác" và "tổng hợp" thay vì làm mãi một kiểu bài rồi tưởng mình đã giỏi.

| Dạng | Hệ số thời gian | Dịch độ khó | Ràng buộc |
|---|---|---|---|
| Khởi động | 1,25× | −1 | Không giới hạn thời gian |
| Rèn kỹ năng | 1× | 0 | Đủ 3 chặng trong một lượt |
| Tốc độ | 0,75× | −1 | Quá giờ vẫn chấm nhưng không tính thành thạo |
| Chính xác | 1,15× | 0 | Sai quá 2 câu phải làm lại |
| Tổng hợp | 1× | 0 | Không biết trước dạng bài từng câu |
| Ôn lại | 1,1× | 0 | Nên làm sau buổi học chính ít nhất một ngày |
| Thử thách | 1× | +1 | Đạt từ 85% mới tính là vượt |
| Vượt ải | 0,95× | +1 | Đạt từ 90% mới mở khóa cấp tiếp theo |

Phiếu cuối của mỗi cấp trong mỗi tuyến **luôn** là phiếu vượt ải; phiếu áp chót là
thử thách. Bài test canh giữ điều này cho cả 180 ô.

---

## 5. Cấu trúc một phiếu

Mỗi phiếu có đúng **3 chặng**, chia theo tỉ lệ 30% / 45% / 25%:

| Chặng | Mục tiêu | Độ khó |
|---|---|---|
| 1 — Khởi động | Lấy nhịp, kiểm tra nền tảng | −1 so với cấp |
| 2 — Rèn luyện | Phần lõi, đúng mức của cấp | đúng cấp |
| 3 — Bứt tốc | Kéo trần năng lực lên | +1 so với cấp |

**Không câu nào lặp lại trong cùng một phiếu.** Nếu kho câu của chuyên đề chưa đủ,
phiếu được bù bằng câu **cùng phần thi** (cùng môn tự chọn nếu là phần 3) thay vì lặp
lại câu cũ. Nếu cả phần thi cũng không đủ, số câu của phiếu được **rút ngắn một cách
trung thực** — màn hình *Thư viện phiếu luyện* hiển thị chỉ số **độ phủ ngân hàng** để
nói rõ chuyên đề nào đang thiếu bao nhiêu câu.

Thứ tự câu được xoay vòng theo số thứ tự phiếu, nên hai phiếu liên tiếp trong cùng một
tuyến không trùng bộ câu.

---

## 6. Nhiệm vụ

Phiếu luyện là **tài liệu**; nhiệm vụ là **việc được giao**. Mỗi phiếu tương ứng đúng
một nhiệm vụ, nên bộ nhiệm vụ cũng có đúng 2000 mục, phân bổ sẵn cho ba phần luyện
theo cùng tỉ trọng.

Nhiệm vụ bổ sung ba thứ mà phiếu không có:

- **Lời giao việc rõ ràng** — làm gì, trong bao lâu, đúng bao nhiêu câu là xong, đúng
  bao nhiêu câu là thành thạo.
- **Ràng buộc riêng theo dạng phiếu** — siết giờ, giới hạn số câu sai...
- **Điều kiện mở khóa**, tạo thành chuỗi nhiệm vụ liên tục trong từng tuyến.

Mã nhiệm vụ có dạng `NV-0001`; mã phiếu có dạng `PL-TOA-ARI-L1-001`
(`PL-<mã môn>-<mã chuyên đề>-L<cấp>-<số thứ tự>`).

---

## 7. Dòng chảy sau khi nộp

Toàn bộ phần "sau khi bấm Nộp" nằm trong `src/lib/progression.ts` — tách khỏi giao
diện để mọi kết luận đều kiểm chứng được bằng test.

1. **Chấm kết quả** — `gradeWorksheet` trả về tỉ lệ đúng theo từng chặng, thời gian so
   với ngân sách, số câu bỏ trống, số câu đúng nhờ đoán, số câu sai dù tự tin, số câu
   sa lầy quá gấp đôi thời gian mục tiêu.
2. **Nhận xét tình hình** — `diagnose` chỉ ra *nguyên nhân*, không chỉ mô tả lại con
   số. Ví dụ: sai ở chặng 1 nghĩa là lỗ hổng nằm ở phần nền chứ không phải ở độ khó,
   nên phải lùi cấp chứ không phải cố lên cấp.
3. **Giải pháp tối ưu** — `prescribe` đưa việc cụ thể, đo đếm được, làm được hôm nay.
4. **Định hướng** — `nextStep` chọn một trong: làm lại, củng cố thêm một phiếu cùng
   cấp, sang phiếu tiếp theo, nhận thử thách, hoặc xét lên cấp.
5. **Xem lại lời giải** — từng câu, kèm lý do vì sao phương án đã chọn lại sai.

---

## 8. Quy tắc tiến độ

| Ngưỡng | Giá trị |
|---|---|
| Hoàn thành phiếu | ≥ 70% |
| Thành thạo phiếu | ≥ 85% (phiếu vượt ải: 90%) **và** thời gian ≤ 125% ngân sách |
| Lên cấp trong tuyến | thành thạo ≥ 3 phiếu ở cấp hiện tại **và** đã vượt ải |
| Xét lên giai đoạn | **KPI ≥ 90%** **và** hoàn thành ≥ 60% số phiếu của giai đoạn |

**KPI của một giai đoạn** = trung bình tỉ lệ đúng *tốt nhất* trên các phiếu đã làm của
giai đoạn đó. Chỉ tính trên phiếu đã làm, để người mới bắt đầu không bị hiển thị KPI
0%. Nhưng điều kiện độ phủ 60% ngăn việc "làm 3 phiếu dễ rồi đòi lên giai đoạn".

**Điểm kinh nghiệm chỉ cộng cho lần cải thiện**, không cộng lại mỗi lượt — ngược lại
người học sẽ cày lại một phiếu dễ để leo cấp mà không hề tiến bộ. Đồng thời **kết quả
tốt nhất luôn được giữ**, không bị ghi đè bởi lần làm kém hơn, nên không ai bị phạt vì
làm lại để ôn tập.

---

## 9. Xuất tài liệu

```bash
npm run catalogue
```

Sinh ra trong `catalogue/`:

| Tệp | Nội dung |
|---|---|
| `phieu-luyen.csv` | 2000 phiếu, đầy đủ đặc tả và danh sách mã câu hỏi |
| `nhiem-vu.csv` | 2000 nhiệm vụ kèm lời giao việc và ràng buộc |
| `chuong-trinh.json` | Khung chương trình + toàn bộ phiếu + nhiệm vụ, dạng máy đọc |

Cả hai CSV có BOM UTF-8 nên Excel trên Windows mở đúng tiếng Việt.
