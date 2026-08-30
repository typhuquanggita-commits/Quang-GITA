# SƠ ĐỒ ĐỌC VỊ ĐỀ BÀI — NHÓM C · LỚP 4

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · *Tư duy xuất sắc, Bản lĩnh dẫn đầu* · gita.edu.vn
Nhóm chuyên đề **C — Dãy số & Quy luật** · Lớp 4
Năng lực tư duy chính: **TD4** Tư duy thuật toán & quy nạp · **TD1** Tư duy cấu trúc

> **Đọc vị là gì.** Là trả lời xong năm câu hỏi *trước khi* đặt bút tính: đề nói về cái gì · dấu hiệu nào · kiến thức nào · phương pháp nào · lối tắt và bẫy ở đâu. Học sinh giỏi không giải nhanh hơn — họ **nhận ra dạng bài nhanh hơn**.

**Phạm vi nhóm này:** Dãy cách đều, dãy nhân, dãy hình, quy luật bảng số, tổng dãy, số hạng thứ n, đánh số trang, đếm chữ số.

---

## 1. CÂY QUYẾT ĐỊNH ĐỌC VỊ

Đọc từ trên xuống, dừng lại ở câu hỏi đầu tiên trả lời **ĐÚNG**.

```
ĐỌC ĐỀ  ─►  Đề cho một dãy số, dãy hình, hoặc hỏi số hạng thứ mấy?
│
├─ 1. Lấy số sau trừ số trước, các hiệu có bằng nhau không?
│     ├─ ĐÚNG  Dãy cách đều: dùng công thức số hạng thứ n và tổng dãy
│     └─ SAI   Chưa đều; thử tiếp
│
├─ 2. Lấy số sau chia số trước, các thương có bằng nhau không?
│     ├─ ĐÚNG  Dãy nhân: nhân tiếp với thương ấy
│     └─ SAI   Chưa đều; thử tiếp
│
├─ 3. Dãy các hiệu có cách đều không?
│     ├─ ĐÚNG  Dãy hiệu bậc hai: số hạng thứ n = số đầu + tổng (n − 1) hiệu đầu
│     └─ SAI   Chưa đều; thử tiếp
│
├─ 4. Dãy có lặp lại một nhóm số cố định?
│     ├─ ĐÚNG  Dãy tuần hoàn: chia vị trí cho độ dài chu kì, xét số dư
│     └─ SAI   Chưa phải; thử tiếp
│
└─ 5. Đề nói về trồng cây, cột điện, cưa gỗ, số tiết học?
      ├─ ĐÚNG  Quan hệ số điểm – số khoảng: tính số khoảng trước, rồi cộng 1, bằng, hay trừ 1
      └─ SAI   Không thuộc nhóm C — quay lại câu mở đầu

Gọi tên được dạng bài rồi, hỏi tiếp ba câu chốt:
   1. Đề hỏi cái gì — mình sắp trả lời đúng câu ấy chứ?
   2. Đáp số phải mang đơn vị nào?
   3. Có bẫy nào trong bài này không — đơn vị lệch, mốc đổi, hay số dư bị bỏ quên?
```

---

## 2. BẢNG DẤU HIỆU — DẠNG BÀI — PHƯƠNG PHÁP

Bảng này rút thẳng từ ngân hàng mẫu bài của nhóm, đúng phạm vi lớp 4. Học **theo hàng ngang**: mỗi hàng đọc thành một câu có nghĩa từ đề bài tới lời giải.

| Mức | Dấu hiệu nhìn thấy trong đề | Dạng bài | Phương pháp | Lối tắt | Bẫy |
|:--:|---|---|---|---|---|
| M1 | Dãy số kèm dấu … ở cuối | Tìm quy luật dãy cách đều | Tính hiệu các cặp liên tiếp rồi cộng tiếp | Ghi khoảng cách vào giữa các số hạng để nhìn ra quy luật ngay. | — |
| M1 | Dãy có ô trống ở giữa | Điền số hạng còn thiếu của dãy cách đều | Xác định khoảng cách từ cặp liền nhau đã biết | Nếu chỗ trống nằm giữa hai số đã biết thì nó bằng trung bình cộng của hai số ấy. | Hai số hai bên chỗ trống cách nhau hai khoảng |
| M1 | Các số tăng rất nhanh, hiệu không đều | Dãy số theo quy luật nhân | Thử hiệu, rồi thử thương | Số sau gấp đôi số trước là dấu hiệu quen nhất của dãy nhân. | — |
| M1 | Đề hỏi “số hạng thứ …” | Tìm số hạng thứ n của dãy cách đều | Đếm số khoảng rồi nhân với khoảng cách | Thử công thức với n = 1 và n = 2 để chắc chắn không lệch một khoảng. | Nhân với n thay vì (n − 1) |
| M2 | Dãy có số đầu, số cuối và khoảng cách đều | Đếm số hạng dãy cách đều | (cuối − đầu) : khoảng cách + 1 | Dãy số tự nhiên liên tiếp từ a đến b có b − a + 1 số hạng. | Quên cộng 1 |
| M2 | Dãy cộng dài, các số cách đều | Tổng dãy số cách đều | Đếm số hạng → (đầu + cuối) × số hạng : 2 | Tổng = trung bình cộng của số đầu và số cuối, nhân với số số hạng. | Quên chia 2 |
| M2 | Đề mô tả hình xếp thêm đều đặn theo thứ tự | Quy luật hình đưa về dãy số | Lập bảng vài hình đầu, tìm khoảng cách, áp công thức | Chỉ cần ba hình đầu là đủ để khẳng định quy luật cách đều. | — |
| M2 | Hiệu giữa các số hạng không bằng nhau | Dãy số quy luật bậc hai hoặc xen kẽ | Lập dãy hiệu; tách dãy con theo vị trí | Dãy 1, 4, 9, 16, 25 là các số chính phương — nhớ để nhận ra ngay. | — |
| M3 | Câu hỏi “là số hạng thứ mấy”, “có thuộc dãy không” | Định vị số hạng, kiểm tra một số có thuộc dãy | (số − đầu) : khoảng cách, xét dư rồi cộng 1 | Mọi số hạng của dãy đều có cùng số dư khi chia cho khoảng cách. | Số không thuộc dãy |
| M3 | Câu hỏi “chữ số … xuất hiện bao nhiêu lần” | Đếm số lần xuất hiện của một chữ số | Đếm theo từng hàng rồi cộng | Từ 1 đến 100, mỗi chữ số từ 1 đến 9 xuất hiện đúng 20 lần (riêng chữ số 1 là 21 lần vì có số 100). | Số 33, 44… chứa hai lần cùng một chữ số |
| M3 | Đề mô tả cách lập số hạng từ số hạng liền trước | Dãy số truy hồi có quy tắc rẽ nhánh | Lập bảng, tính lần lượt, bám sát vị trí | Chỉ cần tính tới số hạng được hỏi, không cần tính cả dãy. | Quy tắc khác nhau ở vị trí chẵn và lẻ |
| M4 | Đề cho số số hạng, khoảng cách và một đầu của dãy | Tổng và trung bình cộng của dãy cách đều | Tìm hai đầu dãy → tổng → trung bình cộng | Mọi cặp số hạng cách đều hai đầu đều có tổng bằng nhau. | — |
| M4 | Từ khoá “trồng cây”, “cột điện”, “quanh ao”, “hai đầu” | Bài toán trồng cây | Tính số khoảng rồi chọn đúng công thức theo trường hợp | Khép kín thì số cây bằng đúng số khoảng — không cộng, không trừ. | Bốn trường hợp trồng cây khác nhau |
| M4 | Đề hỏi riêng các số chẵn, số chia hết cho … trong một dãy | Đếm và tính tổng dãy con thoả điều kiện chia hết | Xác định dãy con cách đều rồi đếm, tính tổng | Nếu khoảng cách của dãy gốc đã chia hết cho số chia thì hoặc tất cả, hoặc không số hạng nào thoả điều kiện. | — |
| M5 | Dãy lặp lại một nhóm số cố định | Dãy tuần hoàn | Chia vị trí cho chu kì, dùng số dư định vị | Tổng n số hạng = tổng một chu kì × số chu kì đầy đủ + tổng phần dư. | Số dư 0 ứng với phần tử cuối chu kì |
| M5 | Dãy toàn số lẻ, toàn số chẵn, hoặc số tự nhiên liên tiếp | Tổng dãy đặc biệt | Đếm số số hạng rồi áp công thức | Tổng n số lẻ đầu tiên luôn là một số chính phương — dùng để kiểm tra nhanh. | Nhầm số hạng cuối với số lượng số hạng |

---

## 3. TÁM CẶP CHỮ DỄ ĐỌC NHẦM

Đọc sai một chữ là đi sai cả bài. Học thuộc tám cặp này.

| Cặp chữ dễ nhầm | Khác nhau ở chỗ |
|---|---|
| “gấp … lần” và “kém … lần” | một cái nhân, một cái chia |
| “nhiều hơn” và “gấp” | một cái cộng, một cái nhân |
| “của số đó” và “của số còn lại” | đổi hẳn số bị nhân ở bước sau |
| “tổng” và “hiệu” | quyết định chia cho tổng số phần hay hiệu số phần |
| “xung quanh” và “khắp mặt” | một cái chu vi, một cái diện tích |
| “ít nhất để chắc chắn” và “ít nhất có thể” | một cái xét trường hợp xấu nhất, một cái xét trường hợp may nhất |
| “ngược chiều” và “cùng chiều” | một cái tổng vận tốc, một cái hiệu vận tốc |
| “lãi bao nhiêu phần trăm” | luôn tính theo **giá mua**, không theo giá bán |

---

## 4. LUYỆN ĐỌC VỊ — 10 ĐỀ, KHÔNG GIẢI

Với mỗi đề dưới đây, **không giải**. Chỉ trả lời hai câu: đây là dạng bài gì, và dấu hiệu nào cho biết điều đó.

**Đề 1.** Tính số cây cần trồng trong mỗi trường hợp. Trồng cây quanh một cái ao hình tròn có chu vi 108 m, hai cây liền nhau cách nhau 6 m. Cần bao nhiêu cây?

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 2.** Cho dãy: 14, 19, 24, …, 779. Dãy có bao nhiêu số hạng?

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 3.** Cho dãy số: 17, 32, 47, 62, … (mỗi số hơn số liền trước 15 đơn vị). Số hạng thứ 5 của dãy là số nào?

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 4.** Cho dãy 6, 12, 18, …, 2 100. Dãy có bao nhiêu số hạng?

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 5.** Tính nhanh mỗi tổng, nêu công thức đã dùng. 1 + 3 + 5 + … + 199 (tổng 100 số lẻ đầu tiên)

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 6.** Tìm quy luật rồi viết tiếp ba số hạng của mỗi dãy. 14, 29, 44, 59, …

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 7.** Quan sát quy luật số que diêm rồi trả lời. Hình thứ 1 có 3 que diêm, mỗi hình sau hơn hình liền trước 5 que. Hình thứ 5 có bao nhiêu que diêm?

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 8.** Tính tổng mỗi dãy. Tính tổng: 15 + 17 + 19 + … + 63

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 9.** Dãy số được lập theo ba quy tắc sau.

- Số hạng đầu bằng 3.
- Số hạng ở **vị trí chẵn** bằng số hạng liền trước nhân 2 rồi cộng 3.
- Số hạng ở **vị trí lẻ** bằng số hạng liền trước cộng 3 nhân với số thứ tự của số hạng liền trước. Viết ba số hạng đầu tiên của dãy.

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 10.** Điền số thích hợp vào chỗ chấm. 4, 13, 22, …, 40, 49

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

---

### Đáp án phần luyện đọc vị

| # | Dạng bài | Dấu hiệu |
|:--:|---|---|
| 1 | Bài toán trồng cây | Từ khoá “trồng cây”, “cột điện”, “quanh ao”, “hai đầu” |
| 2 | Định vị số hạng, kiểm tra một số có thuộc dãy | Câu hỏi “là số hạng thứ mấy”, “có thuộc dãy không” |
| 3 | Tìm số hạng thứ n của dãy cách đều | Đề hỏi “số hạng thứ …” |
| 4 | Đếm và tính tổng dãy con thoả điều kiện chia hết | Đề hỏi riêng các số chẵn, số chia hết cho … trong một dãy |
| 5 | Tổng dãy đặc biệt | Dãy toàn số lẻ, toàn số chẵn, hoặc số tự nhiên liên tiếp |
| 6 | Tìm quy luật dãy cách đều | Dãy số kèm dấu … ở cuối |
| 7 | Quy luật hình đưa về dãy số | Đề mô tả hình xếp thêm đều đặn theo thứ tự |
| 8 | Tổng dãy số cách đều | Dãy cộng dài, các số cách đều |
| 9 | Dãy số truy hồi có quy tắc rẽ nhánh | Đề mô tả cách lập số hạng từ số hạng liền trước |
| 10 | Điền số hạng còn thiếu của dãy cách đều | Dãy có ô trống ở giữa |

---

## 5. TỰ KIỂM — ĐÃ ĐỌC VỊ CHẮC CHƯA

| # | Tiêu chí | Đạt khi |
|:--:|---|---|
| 1 | Gọi tên dạng bài | Trong 10 giây kể từ khi đọc xong đề |
| 2 | Chỉ ra dấu hiệu | Gạch chân được đúng cụm từ trong đề |
| 3 | Nêu phương pháp | Nói được các bước trước khi tính |
| 4 | Nhớ bẫy | Kể được ít nhất một bẫy của dạng ấy |
| 5 | Bộ 10 đề ở mục 4 | Đúng từ 9/10 dạng bài trở lên |

Chưa đạt tiêu chí 5 thì đọc lại mục 2 và làm lại mục 4 với bộ đề khác.

---

**Người biên soạn:** Ban chuyên môn Học viện GITA
**Phiên bản:** 2.0 · Cây quyết định do người viết, bảng dấu hiệu do bộ sinh nội dung rút từ ngân hàng mẫu bài.
