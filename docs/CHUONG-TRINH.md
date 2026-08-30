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

Có **198 ô** = 33 chuyên đề × 6 cấp độ. Mỗi ô nhận một số phiếu tỉ lệ với:

```
trọng số ô = tỉ trọng phần thi × tỉ trọng chuyên đề trong phần × tỉ trọng cấp độ
```

- **Tỉ trọng phần thi**: mỗi phần 1/3. Trong phần 3 có sáu nhóm tự chọn (năm chủ đề
  khoa học cộng Tiếng Anh), mỗi nhóm được 1/6 của 1/3.
- **Tỉ trọng chuyên đề**: khai báo trong `src/data/topics.ts`, cộng lại đúng bằng 1
  trong mỗi nhóm (có bài test canh giữ).
- **Tỉ trọng cấp độ**: 14% / 18% / 20% / 20% / 16% / 12% — dày ở giữa, vì cấp 3–4 là
  nơi phần lớn người học ở lại lâu nhất.

Phần lẻ được chia bằng **phương pháp số dư lớn nhất (Hare)**, kèm **sàn tối thiểu
6 phiếu cho mỗi ô** — đúng bằng số loại phiếu, để mọi cấp độ của mọi chuyên đề đều
có đủ cả sáu loại. Tổng luôn đúng bằng 2000 — đây là bất biến, không phải kết quả
may mắn.

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

## 4. Sáu loại phiếu của mỗi chuyên đề

Đây **không phải** sáu biến thể của cùng một thứ. Mỗi loại phiếu trả lời một câu
hỏi khác nhau, và thứ tự giữa chúng là thứ tự sư phạm chứ không phải thứ tự tùy ý.

| Mã | Loại phiếu | Trả lời câu hỏi | Đạt khi |
|---|---|---|---|
| **LT** | Phiếu lý thuyết | Tôi có nắm đúng khái niệm và công thức không? | Viết lại được công thức và nêu được điều kiện áp dụng mà không nhìn tài liệu |
| **DB** | Phiếu dạng bài & đọc vị | Nhìn đề là biết ngay đây là dạng gì chưa? | Đọc đề trong 10 giây là gọi được tên dạng và hướng giải |
| **KN** | Phiếu kỹ năng & phương pháp | Tôi có làm gọn và đúng quy trình không? | Làm trong thời gian mục tiêu mà không phải nghĩ bước tiếp theo là gì |
| **NC** | Phiếu luyện nâng cao | Tôi xử lý được câu nhiều bước và có bẫy không? | Nhận ra bẫy trước khi mắc, thay vì sau khi xem đáp án |
| **OT** | Phiếu ôn thi | Trộn mọi dạng, tôi còn nhận ra được không? | Kết quả không thấp hơn phiếu kỹ năng |
| **PT** | Phiếu thi | Dưới áp lực thời gian thật, tôi được bao nhiêu? | Đạt 90% trong đúng thời gian quy định |

**Bỏ qua bước 2 là lý do phổ biến nhất khiến người học "hiểu bài mà không làm
được"**: họ biết cách giải nhưng không nhận ra khi nào thì dùng cách nào. Phiếu
dạng bài & đọc vị tồn tại chính vì mắt xích này.

Trong mỗi cấp độ của mỗi tuyến, năm loại đầu lặp lại theo đúng thứ tự trên, và
**phiếu thi luôn đặt ở cuối** để chốt cấp độ. Một bài test bảo đảm mọi ô
(chuyên đề × cấp độ) đều có đủ cả sáu loại — đó cũng là lý do mỗi ô nhận **tối
thiểu 6 phiếu**.

### Tham số kỹ thuật của từng loại

| Loại | Hệ số thời gian | Dịch độ khó | Ngưỡng thành thạo |
|---|---|---|---|
| Lý thuyết | 1,30× | −1 | 85% |
| Dạng bài & đọc vị | 1,15× | −1 | 85% |
| Kỹ năng & phương pháp | 1,00× | 0 | 85% |
| Luyện nâng cao | 1,00× | +1 | 88% |
| Ôn thi | 0,95× | 0 | 85% |
| Phiếu thi | 0,85× | +1 | 90% |

---

## 5. Cấu trúc một phiếu

Mỗi phiếu có đúng **3 chặng**, chia theo tỉ lệ 30% / 45% / 25%. Tên và mục tiêu
của ba chặng **lấy theo loại phiếu**, không dùng chung một khuôn — chặng 3 của
phiếu lý thuyết ("điều kiện & ngoại lệ") khác hẳn chặng 3 của phiếu thi
("phần phân loại"):

| Loại phiếu | Chặng 1 | Chặng 2 | Chặng 3 |
|---|---|---|---|
| Lý thuyết | Khái niệm | Công thức | Điều kiện & ngoại lệ |
| Dạng bài & đọc vị | Dấu hiệu nhận biết | Phân loại dạng | Dạng lai & dễ nhầm |
| Kỹ năng & phương pháp | Quy trình chuẩn | Luyện thành thạo | Rút gọn thao tác |
| Luyện nâng cao | Khởi động | Nhiều bước | Câu phân loại |
| Ôn thi | Rà kiến thức | Trộn dạng | Mô phỏng đề |
| Phiếu thi | Phần dễ ăn điểm | Phần lõi | Phần phân loại |

**Không câu nào lặp lại trong cùng một phiếu.** Nếu kho câu của chuyên đề chưa đủ,
phiếu được bù bằng câu **cùng phần thi** (cùng chủ đề tự chọn nếu là phần 3) thay vì
lặp lại câu cũ. Nếu cả phần thi cũng không đủ, số câu của phiếu được **rút ngắn
một cách trung thực** — màn hình *Thư viện phiếu luyện* hiển thị chỉ số **độ phủ
ngân hàng** để nói rõ chuyên đề nào đang thiếu bao nhiêu câu.

**Trạng thái hiện tại: đủ 100%.** Ngân hàng có 992 câu, mỗi chuyên đề trong số 33
chuyên đề đều có tối thiểu 15 câu — bằng đúng số câu của phiếu cấp 6, là phiếu dài
nhất. Nghĩa là hiện không phiếu nào phải mượn câu khác chuyên đề hay bị rút ngắn.
Hai cơ chế bù ở trên vẫn giữ nguyên, vì chúng là lưới an toàn cho lúc khung chương
trình đổi chứ không phải cho tình trạng thiếu câu.

---

## 6. Hai tài liệu đi kèm

Mỗi phiếu luyện không đứng một mình. Bộ tài liệu của một chuyên đề gồm ba lớp:

```
PL-TOA-STA-L3-004   Phiếu luyện          — bài để làm
LG-TOA-STA-L3-004   Phiếu lời giải       — lời giải đầy đủ + bảng phân tích chuyên sâu
HD-TOA-STA          Phiếu hướng dẫn      — một phiếu cho cả chuyên đề
```

### Phiếu lời giải + bảng phân tích chuyên sâu (`LG-…`)

Một phiếu cho mỗi phiếu luyện, cùng bộ câu, mở tại `#/solutions?worksheet=<mã>`.
Nội dung:

- Từng câu: đề bài, phương án đã chọn, đáp án đúng, lời giải chính thức, và **lý
  do vì sao phương án đã chọn lại sai**.
- **Phiếu kiến thức liên quan** của chuyên đề: ý lõi, công thức, dạng bài kèm dấu
  hiệu, bẫy hay mắc, chiến thuật thời gian.
- Câu cùng dạng để luyện lại ngay.
- **Bảng phân tích chuyên sâu**: phân loại lỗi (kiến thức / kỹ năng / chiến
  thuật), bốn lát cắt theo chuyên đề — kỹ năng — mức độ — thời gian, và bảng chi
  tiết từng câu.

> Phiếu lời giải mở được **như một tài liệu độc lập** ngay cả khi chưa làm bài,
> nhưng **bảng phân tích chuyên sâu chỉ mở sau khi nộp bài lần đầu**: đọc lời giải
> trước khi làm sẽ xóa mất giá trị chẩn đoán — hệ thống không thể biết bạn sai vì
> kiến thức, vì kỹ năng hay vì chiến thuật.

### Phiếu hướng dẫn ôn chắc chuyên đề (`HD-…`)

Một phiếu cho mỗi chuyên đề, mở tại `#/topic?id=<mã chuyên đề>`. Bốn phần:

1. **Kiến thức phải nắm** — ý lõi, công thức, dạng bài & dấu hiệu đọc vị, bẫy hay
   mắc, chiến thuật thời gian.
2. **Lộ trình sáu loại phiếu qua sáu cấp độ**, kèm trạng thái đã làm đến đâu và
   liên kết tới phiếu lời giải của từng phiếu.
3. **Danh sách kiểm "thế nào là đã ôn chắc"** — tám tiêu chí đo được: sáu tiêu chí
   bám theo sáu loại phiếu, cộng độ bền kiến thức (không còn câu quá hạn) và độ
   thành thạo từ 80%.
4. **Kế hoạch bảy ngày**, sinh từ chính các tiêu chí chưa đạt, theo đúng thứ tự sư
   phạm, và luôn kết thúc bằng một bước tự kiểm.

Đây là phiếu trả lời câu hỏi mà bộ giải đề không trả lời được: *"thế nào thì coi
là tôi đã ôn chắc chuyên đề này?"*

---

## 7. Nhiệm vụ

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

## 8. Dòng chảy sau khi nộp

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

## 9. Quy tắc tiến độ

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

## 10. Xuất tài liệu

```bash
npm run catalogue
```

Sinh ra trong `catalogue/`:

| Tệp | Nội dung |
|---|---|
| `phieu-luyen.csv` | 2000 phiếu: mã phiếu, loại phiếu, mã phiếu lời giải, mã phiếu hướng dẫn, ba chặng, danh sách mã câu hỏi, tiêu chí đạt |
| `nhiem-vu.csv` | 2000 nhiệm vụ kèm lời giao việc và ràng buộc |
| `phieu-huong-dan-on-chac.csv` | 30 phiếu hướng dẫn ôn chắc: kiến thức phải nắm và tiêu chí ôn chắc của từng chuyên đề |
| `chuong-trinh.json` | Khung chương trình + toàn bộ phiếu + nhiệm vụ, dạng máy đọc |

Cả hai CSV có BOM UTF-8 nên Excel trên Windows mở đúng tiếng Việt.
