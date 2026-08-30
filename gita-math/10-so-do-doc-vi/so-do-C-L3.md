# SƠ ĐỒ ĐỌC VỊ ĐỀ BÀI — NHÓM C · LỚP 3

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · *Tư duy xuất sắc, Bản lĩnh dẫn đầu* · gita.edu.vn
Nhóm chuyên đề **C — Dãy số & Quy luật** · Lớp 3
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

Bảng này rút thẳng từ ngân hàng mẫu bài của nhóm, đúng phạm vi lớp 3. Học **theo hàng ngang**: mỗi hàng đọc thành một câu có nghĩa từ đề bài tới lời giải.

| Mức | Dấu hiệu nhìn thấy trong đề | Dạng bài | Phương pháp | Lối tắt | Bẫy |
|:--:|---|---|---|---|---|
| M1 | Dãy số kèm dấu … ở cuối | Tìm quy luật dãy cách đều | Tính hiệu các cặp liên tiếp rồi cộng tiếp | Ghi khoảng cách vào giữa các số hạng để nhìn ra quy luật ngay. | — |
| M1 | Dãy có ô trống ở giữa | Điền số hạng còn thiếu của dãy cách đều | Xác định khoảng cách từ cặp liền nhau đã biết | Nếu chỗ trống nằm giữa hai số đã biết thì nó bằng trung bình cộng của hai số ấy. | — |
| M2 | Dãy có số đầu, số cuối, khoảng cách đều | Đếm số hạng dãy cách đều | (cuối − đầu) : khoảng cách + 1 | Dãy số liên tiếp từ a đến b có b − a + 1 số hạng. | Quên cộng 1 |
| M2 | Dãy có ô trống ở giữa | Điền số hạng còn thiếu | Xác định khoảng cách từ cặp liền nhau | Chỗ trống nằm giữa hai số đã biết thì bằng trung bình cộng của chúng. | Hai số hai bên chỗ trống cách nhau hai khoảng |
| M2 | Một dãy số thật ngoài đời, các số cách nhau đều nhau | Dãy số cách đều | Số hạng thứ k = số đầu + (k − 1) × khoảng cách | Nhớ một câu: **số vật = số khoảng + 1** khi đếm cả hai đầu. | Đếm số nhà bằng cách lấy hiệu chia khoảng cách |
| M3 | Dãy số kết thúc bằng dấu … | Tìm quy luật dãy số | Thử hiệu → thử thương → thử dãy hiệu | Số sau gấp đôi số trước là dấu hiệu quen nhất của dãy nhân. | — |
| M3 | Hình xếp thêm đều đặn theo thứ tự | Quy luật hình đưa về dãy số | Lập bảng ba hình đầu rồi áp công thức | Ba hình đầu là đủ để khẳng định quy luật cách đều. | Nhân với n thay vì (n − 1) |
| M4 | “Trồng cây”, “cột điện”, “quanh ao” | Bài toán trồng cây | Số khoảng rồi chọn công thức theo trường hợp | Khép kín thì số cây bằng đúng số khoảng. | Bốn trường hợp trồng cây |
| M4 | “Có bao nhiêu số … từ … đến …” | Đếm số hạng dãy cách đều theo điều kiện | Tìm hai đầu hợp lệ rồi đếm | Số các số chia hết cho d từ 1 đến n bằng phần nguyên của n : d. | Hai đầu khoảng chưa chắc thoả điều kiện |
| M5 | Dãy lặp lại một nhóm số cố định | Dãy tuần hoàn | Chia lấy dư để định vị | Tổng n số hạng = tổng một chu kì × số chu kì đầy đủ + phần dư. | Số dư 0 |
| M5 | Hiệu giữa các số hạng tăng đều đặn | Dãy có hiệu tăng đều | Lập dãy hiệu rồi cộng dần | Số hạng thứ n = số đầu + (n − 1) × n : 2 khi hiệu là 1, 2, 3… | — |

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

**Đề 1.** Vẽ hình minh hoạ trước khi tính. Đoạn đường dài 18 m, trồng cây cách nhau 2 m, trồng cả hai đầu. Cần bao nhiêu cây?

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 2.** Tìm quy luật rồi viết tiếp ba số hạng của mỗi dãy. 11, 22, 33, 44, …

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 3.** Dãy bắt đầu bằng 1; hiệu giữa hai số hạng liên tiếp lần lượt là 1, 2, 3, 4, … Viết năm số hạng đầu của dãy.

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 4.** Đếm số số hạng của mỗi dãy. Dãy 3, 13, 23, …, 323 có bao nhiêu số hạng?

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 5.** Dãy lặp lại mãi nhóm 5, 3, 3: 5, 3, 3, 5, 3, 3, … Số hạng thứ 115 của dãy là số nào?

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 6.** Điền số thích hợp vào chỗ chấm. 20, 30, 40, 50, …, 70

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 7.** Vẽ ba hình đầu ra nháp rồi tìm quy luật. Hình thứ 1 có 6 que diêm, mỗi hình sau hơn hình trước 2 que. Hình thứ 2 có bao nhiêu que?

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 8.** Tìm quy luật rồi viết số hạng tiếp theo. 7, 21, 63, 189, 567, …

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 9.** Đếm số lượng, không cần liệt kê. Có bao nhiêu số lẻ từ 111 đến 317?

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

**Đề 10.** Điền số thích hợp vào chỗ chấm. 10, 17, …, 31, 38, 45

- Dạng bài: ...........................................  Dấu hiệu: ...........................................

---

### Đáp án phần luyện đọc vị

| # | Dạng bài | Dấu hiệu |
|:--:|---|---|
| 1 | Bài toán trồng cây | “Trồng cây”, “cột điện”, “quanh ao” |
| 2 | Tìm quy luật dãy cách đều | Dãy số kèm dấu … ở cuối |
| 3 | Dãy có hiệu tăng đều | Hiệu giữa các số hạng tăng đều đặn |
| 4 | Đếm số hạng dãy cách đều | Dãy có số đầu, số cuối, khoảng cách đều |
| 5 | Dãy tuần hoàn | Dãy lặp lại một nhóm số cố định |
| 6 | Điền số hạng còn thiếu | Dãy có ô trống ở giữa |
| 7 | Quy luật hình đưa về dãy số | Hình xếp thêm đều đặn theo thứ tự |
| 8 | Tìm quy luật dãy số | Dãy số kết thúc bằng dấu … |
| 9 | Đếm số hạng dãy cách đều theo điều kiện | “Có bao nhiêu số … từ … đến …” |
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
