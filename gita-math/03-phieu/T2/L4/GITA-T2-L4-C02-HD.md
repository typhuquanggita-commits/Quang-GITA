---
ma: "GITA-T2-L4-C02-HD"
tuyen: "T2"
lop: 4
cum: 2
cum_ten: "Dãy số cách đều và quy luật bảng số"
loai: "HD"
loai_ten: "Phiếu Hướng dẫn ôn chắc chuyên đề"
nhom_ma: "C"
nhom_ten: "Dãy số & Quy luật"
ten: "Dãy số cách đều và quy luật bảng số — Hướng dẫn ôn chắc chuyên đề"
hoc_ky: "HK1"
tuan: 3
---

# PHIẾU HƯỚNG DẪN ÔN CHẮC CHUYÊN ĐỀ · GITA-T2-L4-C02-HD

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · *Tư duy xuất sắc, Bản lĩnh dẫn đầu* · gita.edu.vn
Tuyến 2 — Nâng cao thi CLC & thi Chuyên · Lớp 4 · Tuần 3 · HK1
**Cụm chuyên đề C02 — Dãy số cách đều và quy luật bảng số**
Nhóm chuyên đề **C — Dãy số & Quy luật**
Phiếu này dùng để **tự ôn chắc cả cụm** sau khi đã học xong sáu buổi. Không cần giáo viên nhắc.

---

## 1. BẢN ĐỒ CHƯƠNG

```
CỤM C02 — Dãy số cách đều và quy luật bảng số
├── Dãy số cách đều — công thức số hạng thứ n
├── Số số hạng và tổng của dãy số cách đều
├── Dãy số theo quy luật nhân và dãy Fibonacci
├── Tổng dãy số cách đều và dãy số đặc biệt
└── Quy luật bảng số và ma trận số
```

| Buổi | Loại phiếu | Mã phiếu | Sản phẩm phải có sau buổi |
|:--:|---|---|---|
| 1 | Lý thuyết | `GITA-T2-L4-C02-LT` | Sơ đồ tư duy chương tự vẽ |
| 2 | Dạng bài & Đọc vị | `GITA-T2-L4-C02-DB` | Bảng dạng bài — dấu hiệu điền đủ |
| 3 | Kỹ năng & Phương pháp | `GITA-T2-L4-C02-KN` | Sổ lỗi và kịch bản thuyết trình |
| 4 | Luyện nâng cao | `GITA-T2-L4-C02-NC` | Bài IV, V đã chữa và ghi lỗi |
| 5 | Ôn thi | `GITA-T2-L4-C02-OT` | Điểm bài ôn và bảng phân tích lỗi |
| 6 | Thi chương | `GITA-T2-L4-C02-TH` | Điểm bài thi chương |

---

## 2. BẢNG CÔNG THỨC VÀ QUY TẮC PHẢI THUỘC

Học thuộc theo cặp **dạng bài – công thức**, không học rời.

| # | Dùng cho dạng bài | Công thức hoặc quy tắc |
|---:|---|---|
| 1 | Đếm số hạng dãy cách đều | Công thức đếm số hạng |
| 2 | Quy luật hình đưa về dãy số | Dãy cách đều, số hạng thứ n, tổng dãy |
| 3 | Điền số hạng còn thiếu của dãy cách đều | Dãy số cách đều |
| 4 | Dãy số theo quy luật nhân | Dãy nhân, phép nhân liên tiếp |
| 5 | Bài toán chu kỳ | Dãy cách đều; đổi đơn vị giờ – phút |
| 6 | Bài toán trồng cây | Quan hệ số cây – số khoảng |
| 7 | Tổng dãy số cách đều | Công thức tổng dãy cách đều |
| 8 | Định vị số hạng, kiểm tra một số có thuộc dãy | Dãy cách đều, phép chia có dư |
| 9 | Tổng dãy đặc biệt | Ba công thức tổng cơ bản |
| 10 | Dãy số truy hồi có quy tắc rẽ nhánh | Dãy số cho bởi quy tắc, tính lần lượt |
| 11 | Dãy tuần hoàn | Phép chia có dư, tính tuần hoàn |
| 12 | Dãy số cách đều | Số hạng thứ n của dãy cách đều; đếm số hạng |
| 13 | Tổng và trung bình cộng của dãy cách đều | Dãy cách đều, trung bình cộng |

---

## 3. BẢNG DẠNG BÀI VÀ DẤU HIỆU NHẬN BIẾT

Trước khi tra bảng, đi qua cây quyết định đọc vị của nhóm chuyên đề. Bản đầy đủ kèm bộ đề luyện đọc vị ở `10-so-do-doc-vi/so-do-C-L4.md`.

```
ĐỌC ĐỀ → Đề cho một dãy số, dãy hình, hoặc hỏi số hạng thứ mấy?
1. Lấy số sau trừ số trước, các hiệu có bằng nhau không?
     ĐÚNG → Dãy cách đều: dùng công thức số hạng thứ n và tổng dãy
2. Lấy số sau chia số trước, các thương có bằng nhau không?
     ĐÚNG → Dãy nhân: nhân tiếp với thương ấy
3. Dãy các hiệu có cách đều không?
     ĐÚNG → Dãy hiệu bậc hai: số hạng thứ n = số đầu + tổng (n − 1) hiệu đầu
4. Dãy có lặp lại một nhóm số cố định?
     ĐÚNG → Dãy tuần hoàn: chia vị trí cho độ dài chu kì, xét số dư
5. Đề nói về trồng cây, cột điện, cưa gỗ, số tiết học?
     ĐÚNG → Quan hệ số điểm – số khoảng: tính số khoảng trước, rồi cộng 1, bằng, hay trừ 1
```

| Dạng bài | Dữ liệu nhận biết | Phương pháp áp dụng | Cách xử lý nhanh nhất |
|---|---|---|---|
| Đếm số hạng dãy cách đều | Dãy có số đầu, số cuối và khoảng cách đều | (cuối − đầu) : khoảng cách + 1 | Dãy số tự nhiên liên tiếp từ a đến b có b − a + 1 số hạng. |
| Quy luật hình đưa về dãy số | Đề mô tả hình xếp thêm đều đặn theo thứ tự | Lập bảng vài hình đầu, tìm khoảng cách, áp công thức | Chỉ cần ba hình đầu là đủ để khẳng định quy luật cách đều. |
| Điền số hạng còn thiếu của dãy cách đều | Dãy có ô trống ở giữa | Xác định khoảng cách từ cặp liền nhau đã biết | Nếu chỗ trống nằm giữa hai số đã biết thì nó bằng trung bình cộng của hai số ấy. |
| Dãy số theo quy luật nhân | Các số tăng rất nhanh, hiệu không đều | Thử hiệu, rồi thử thương | Số sau gấp đôi số trước là dấu hiệu quen nhất của dãy nhân. |
| Bài toán chu kỳ | Một sự việc lặp lại đều đặn theo thời gian | Quy về phút, dùng công thức dãy cách đều, đổi ngược lại giờ | Số chuyến trong một giờ = 60 chia khoảng cách, nhẩm ngay được. |
| Bài toán trồng cây | Từ khoá “trồng cây”, “cột điện”, “quanh ao”, “hai đầu” | Tính số khoảng rồi chọn đúng công thức theo trường hợp | Khép kín thì số cây bằng đúng số khoảng — không cộng, không trừ. |
| Tổng dãy số cách đều | Dãy cộng dài, các số cách đều | Đếm số hạng → (đầu + cuối) × số hạng : 2 | Tổng = trung bình cộng của số đầu và số cuối, nhân với số số hạng. |
| Định vị số hạng, kiểm tra một số có thuộc dãy | Câu hỏi “là số hạng thứ mấy”, “có thuộc dãy không” | (số − đầu) : khoảng cách, xét dư rồi cộng 1 | Mọi số hạng của dãy đều có cùng số dư khi chia cho khoảng cách. |
| Tổng dãy đặc biệt | Dãy toàn số lẻ, toàn số chẵn, hoặc số tự nhiên liên tiếp | Đếm số số hạng rồi áp công thức | Tổng n số lẻ đầu tiên luôn là một số chính phương — dùng để kiểm tra nhanh. |
| Dãy số truy hồi có quy tắc rẽ nhánh | Đề mô tả cách lập số hạng từ số hạng liền trước | Lập bảng, tính lần lượt, bám sát vị trí | Chỉ cần tính tới số hạng được hỏi, không cần tính cả dãy. |
| Dãy tuần hoàn | Dãy lặp lại một nhóm số cố định | Chia vị trí cho chu kì, dùng số dư định vị | Tổng n số hạng = tổng một chu kì × số chu kì đầy đủ + tổng phần dư. |
| Dãy số cách đều | Một dãy số thật ngoài đời, các số cách nhau đều nhau | Số hạng thứ k = số đầu + (k − 1) × khoảng cách | Nhớ một câu: **số vật = số khoảng + 1** khi đếm cả hai đầu. |
| Tìm quy luật dãy cách đều | Dãy số kèm dấu … ở cuối | Tính hiệu các cặp liên tiếp rồi cộng tiếp | Ghi khoảng cách vào giữa các số hạng để nhìn ra quy luật ngay. |
| Tổng và trung bình cộng của dãy cách đều | Đề cho số số hạng, khoảng cách và một đầu của dãy | Tìm hai đầu dãy → tổng → trung bình cộng | Mọi cặp số hạng cách đều hai đầu đều có tổng bằng nhau. |

---

## 4. LỘ TRÌNH ÔN BỐN BUỔI

| Buổi ôn | Việc làm | Thời lượng | Sản phẩm |
|:--:|---|:--:|---|
| 1 | Đọc lại bản đồ chương ở mục 1, tự vẽ lại sơ đồ tư duy cụm C02 mà không nhìn phiếu | 45 phút | Sơ đồ tư duy tự vẽ |
| 2 | Học thuộc bảng công thức mục 2, kiểm tra chéo trong nhóm hai bạn | 45 phút | Đọc thuộc không nhìn |
| 3 | Làm lại phiếu `GITA-T2-L4-C02-NC` phần IV và V, chấm bằng phiếu `GITA-T2-L4-C02-NC-GP` | 60 phút | Sổ lỗi cập nhật |
| 4 | Làm lại phiếu `GITA-T2-L4-C02-TH` trong đúng 90 phút, tự chấm | 90 phút | Điểm và bảng phân tích lỗi |

---

## 5. CHECKLIST TỰ KIỂM

Trả lời được ngay trong 10 giây thì đánh ✔. Phải nghĩ lâu thì đánh ✘ và làm lại phần tương ứng.

- [ ] **1.** Em nêu được dấu hiệu nhận biết của dạng “Đếm số hạng dãy cách đều” chứ?
- [ ] **2.** Em nhớ công thức: Công thức đếm số hạng?
- [ ] **3.** Em nêu được dấu hiệu nhận biết của dạng “Quy luật hình đưa về dãy số” chứ?
- [ ] **4.** Em nhớ công thức: Dãy cách đều, số hạng thứ n, tổng dãy?
- [ ] **5.** Em nêu được dấu hiệu nhận biết của dạng “Điền số hạng còn thiếu của dãy cách đều” chứ?
- [ ] **6.** Em nhớ công thức: Dãy số cách đều?
- [ ] **7.** Em nêu được dấu hiệu nhận biết của dạng “Dãy số theo quy luật nhân” chứ?
- [ ] **8.** Em nhớ công thức: Dãy nhân, phép nhân liên tiếp?
- [ ] **9.** Em nêu được dấu hiệu nhận biết của dạng “Bài toán chu kỳ” chứ?
- [ ] **10.** Em nhớ công thức: Dãy cách đều; đổi đơn vị giờ – phút?
- [ ] **11.** Em nêu được dấu hiệu nhận biết của dạng “Bài toán trồng cây” chứ?
- [ ] **12.** Em nhớ công thức: Quan hệ số cây – số khoảng?
- [ ] **13.** Em nêu được dấu hiệu nhận biết của dạng “Tổng dãy số cách đều” chứ?
- [ ] **14.** Em nhớ công thức: Công thức tổng dãy cách đều?
- [ ] **15.** Em nêu được dấu hiệu nhận biết của dạng “Định vị số hạng, kiểm tra một số có thuộc dãy” chứ?
- [ ] **16.** Em nhớ công thức: Dãy cách đều, phép chia có dư?
- [ ] **17.** Em nêu được dấu hiệu nhận biết của dạng “Tổng dãy đặc biệt” chứ?
- [ ] **18.** Em nhớ công thức: Ba công thức tổng cơ bản?
- [ ] **19.** Em nêu được dấu hiệu nhận biết của dạng “Dãy số truy hồi có quy tắc rẽ nhánh” chứ?
- [ ] **20.** Em nhớ công thức: Dãy số cho bởi quy tắc, tính lần lượt?

**Chuẩn đạt:** ✔ từ 18/20 câu trở lên.

---

## 6. SỔ LỖI MẪU

Đây là những lỗi học viên khoá trước mắc nhiều nhất ở cụm này. Chép vào sổ lỗi của em, kèm cột cách phòng.

| # | Lỗi thường gặp | Cách phòng |
|---:|---|---|
| 1 | Quên cộng 1 nên thiếu một số hạng. | Thử với dãy ngắn (3 số hạng) để kiểm chứng công thức. |
| 2 | Vẽ tay từng hình để đếm, không kịp thời gian với hình thứ hai, ba chục. | Lập bảng ba hình đầu để tìm khoảng cách rồi mới dùng công thức. |
| 3 | Lấy hiệu của hai số cách nhau một chỗ trống làm khoảng cách. | Đánh số thứ tự vị trí rồi mới tính khoảng cách. |
| 4 | Cố ép dãy nhân thành dãy cộng nên tìm ra quy luật sai. | Thử cả hai: hiệu trước, thương sau. |
| 5 | Quên cộng 1 khi đếm số chuyến, hoặc cộng phút vào giờ mà không đổi. | Viết mọi mốc thời gian ra phút kể từ chuyến đầu. |
| 6 | Máy móc cộng 1 cho mọi trường hợp. | Vẽ một đoạn ngắn với 3 khoảng để đếm thử trước khi áp dụng. |
| 7 | Quên chia 2, kết quả gấp đôi đáp số đúng. | Kiểm tra bằng dãy ngắn: 1 + 2 + 3 = 6, công thức phải cho đúng 6. |
| 8 | Chia được số nguyên rồi quên cộng 1, hoặc bỏ qua phần dư. | Luôn ghi rõ thương và số dư khi chia. |
| 9 | Nhầm số hạng cuối với số lượng số hạng khi áp công thức. | Đếm số số hạng trước rồi mới thay vào công thức. |
| 10 | Áp dụng nhầm nhánh quy tắc vì không để ý vị trí. | Kẻ bảng hai dòng: dòng trên ghi vị trí, dòng dưới ghi số hạng. |
| 11 | Lấy số dư 0 rồi lấy phần tử đầu tiên của chu kì. | Kiểm chứng bằng một vị trí nhỏ đã biết trước khi làm vị trí lớn. |
| 12 | Lấy (số cuối − số đầu) : 2 rồi trả lời luôn. | Thử với dãy ngắn: 1, 3, 5 có 3 số nhưng chỉ 2 khoảng. |
| 13 | Chỉ xét hai số đầu rồi vội kết luận. | Viết hiệu giữa các số hạng ngay dưới dấu ngoặc giữa chúng. |
| 14 | Tính tổng rồi chia — dài hơn và dễ sai khi số hạng nhiều. | Nhớ tính chất trung bình cộng để kiểm tra chéo kết quả tổng. |

---

## 7. TIÊU CHÍ ÔN CHẮC

Cụm này chỉ được coi là **đã ôn chắc** khi đủ cả bốn điều kiện sau.

| # | Tiêu chí | Ngưỡng đạt |
|---:|---|---|
| 1 | Điểm phiếu thi chương `GITA-T2-L4-C02-TH` | ≥ 80/100 |
| 2 | Checklist tự kiểm ở mục 5 | ≥ 90% số câu đánh ✔ |
| 3 | Bảng công thức mục 2 | Đọc thuộc, không nhìn sách |
| 4 | Sổ lỗi | Mỗi lỗi ở mục 6 đều có một dòng cách phòng do em tự viết |

Chưa đạt thì **học lại phiếu `GITA-T2-L4-C02-NC`** và làm bài tương tự trong phiếu `GITA-T2-L4-C02-NC-GP`, chưa mở cụm mới.

---

**Người biên soạn:** Ban chuyên môn Học viện GITA
**Phiên bản:** 2.0 · Chuẩn biên soạn phiếu GITA v2.0 · Đáp số do bộ sinh nội dung GITA tính, đã đối chiếu tự động.
