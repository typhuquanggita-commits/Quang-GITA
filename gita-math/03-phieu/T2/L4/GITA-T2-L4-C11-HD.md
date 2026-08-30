---
ma: "GITA-T2-L4-C11-HD"
tuyen: "T2"
lop: 4
cum: 11
cum_ten: "Dãy số hình, đánh số trang và dãy số dạng đề thi"
loai: "HD"
loai_ten: "Phiếu Hướng dẫn ôn chắc chuyên đề"
nhom_ma: "C"
nhom_ten: "Dãy số & Quy luật"
ten: "Dãy số hình, đánh số trang và dãy số dạng đề thi — Hướng dẫn ôn chắc chuyên đề"
hoc_ky: "HK2"
tuan: 21
---

# PHIẾU HƯỚNG DẪN ÔN CHẮC CHUYÊN ĐỀ · GITA-T2-L4-C11-HD

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · *Tư duy xuất sắc, Bản lĩnh dẫn đầu* · gita.edu.vn
Tuyến 2 — Nâng cao thi CLC & thi Chuyên · Lớp 4 · Tuần 21 · HK2
**Cụm chuyên đề C11 — Dãy số hình, đánh số trang và dãy số dạng đề thi**
Nhóm chuyên đề **C — Dãy số & Quy luật**
Phiếu này dùng để **tự ôn chắc cả cụm** sau khi đã học xong sáu buổi. Không cần giáo viên nhắc.

---

## 1. BẢN ĐỒ CHƯƠNG

```
CỤM C11 — Dãy số hình, đánh số trang và dãy số dạng đề thi
├── Dãy số hình: số chấm, số ô vuông, số que
├── Tìm số hạng còn thiếu và số hạng bị xoá của dãy số
├── Dãy số và bài toán đánh số trang sách
├── Bài toán dãy số dạng đề thi vào lớp 6
└── Tổng ôn dãy số và quy luật nâng cao
```

| Buổi | Loại phiếu | Mã phiếu | Sản phẩm phải có sau buổi |
|:--:|---|---|---|
| 1 | Lý thuyết | `GITA-T2-L4-C11-LT` | Sơ đồ tư duy chương tự vẽ |
| 2 | Dạng bài & Đọc vị | `GITA-T2-L4-C11-DB` | Bảng dạng bài — dấu hiệu điền đủ |
| 3 | Kỹ năng & Phương pháp | `GITA-T2-L4-C11-KN` | Sổ lỗi và kịch bản thuyết trình |
| 4 | Luyện nâng cao | `GITA-T2-L4-C11-NC` | Bài IV, V đã chữa và ghi lỗi |
| 5 | Ôn thi | `GITA-T2-L4-C11-OT` | Điểm bài ôn và bảng phân tích lỗi |
| 6 | Thi chương | `GITA-T2-L4-C11-TH` | Điểm bài thi chương |

---

## 2. BẢNG CÔNG THỨC VÀ QUY TẮC PHẢI THUỘC

Học thuộc theo cặp **dạng bài – công thức**, không học rời.

| # | Dùng cho dạng bài | Công thức hoặc quy tắc |
|---:|---|---|
| 1 | Tổng dãy đặc biệt | Ba công thức tổng cơ bản |
| 2 | Bài toán trồng cây | Quan hệ số cây – số khoảng |
| 3 | Dãy số theo quy luật nhân | Dãy nhân, phép nhân liên tiếp |
| 4 | Đếm số hạng dãy cách đều | Công thức đếm số hạng |
| 5 | Dãy số cách đều | Số hạng thứ n của dãy cách đều; đếm số hạng |
| 6 | Định vị số hạng, kiểm tra một số có thuộc dãy | Dãy cách đều, phép chia có dư |
| 7 | Tổng và trung bình cộng của dãy cách đều | Dãy cách đều, trung bình cộng |
| 8 | Tìm quy luật dãy cách đều | Dãy số cách đều |
| 9 | Đếm số lần xuất hiện của một chữ số | Dãy cách đều, cấu tạo số |
| 10 | Dãy số truy hồi có quy tắc rẽ nhánh | Dãy số cho bởi quy tắc, tính lần lượt |
| 11 | Dãy tuần hoàn | Phép chia có dư, tính tuần hoàn |
| 12 | Dãy số quy luật bậc hai hoặc xen kẽ | Dãy hiệu, dãy con xen kẽ |
| 13 | Quy luật hình đưa về dãy số | Dãy cách đều, số hạng thứ n, tổng dãy |
| 14 | Đếm và tính tổng dãy con thoả điều kiện chia hết | Dãy cách đều, bội chung nhỏ nhất |

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
| Tổng dãy đặc biệt | Dãy toàn số lẻ, toàn số chẵn, hoặc số tự nhiên liên tiếp | Đếm số số hạng rồi áp công thức | Tổng n số lẻ đầu tiên luôn là một số chính phương — dùng để kiểm tra nhanh. |
| Bài toán trồng cây | Từ khoá “trồng cây”, “cột điện”, “quanh ao”, “hai đầu” | Tính số khoảng rồi chọn đúng công thức theo trường hợp | Khép kín thì số cây bằng đúng số khoảng — không cộng, không trừ. |
| Dãy số theo quy luật nhân | Các số tăng rất nhanh, hiệu không đều | Thử hiệu, rồi thử thương | Số sau gấp đôi số trước là dấu hiệu quen nhất của dãy nhân. |
| Đếm số hạng dãy cách đều | Dãy có số đầu, số cuối và khoảng cách đều | (cuối − đầu) : khoảng cách + 1 | Dãy số tự nhiên liên tiếp từ a đến b có b − a + 1 số hạng. |
| Dãy số cách đều | Một dãy số thật ngoài đời, các số cách nhau đều nhau | Số hạng thứ k = số đầu + (k − 1) × khoảng cách | Nhớ một câu: **số vật = số khoảng + 1** khi đếm cả hai đầu. |
| Định vị số hạng, kiểm tra một số có thuộc dãy | Câu hỏi “là số hạng thứ mấy”, “có thuộc dãy không” | (số − đầu) : khoảng cách, xét dư rồi cộng 1 | Mọi số hạng của dãy đều có cùng số dư khi chia cho khoảng cách. |
| Tổng và trung bình cộng của dãy cách đều | Đề cho số số hạng, khoảng cách và một đầu của dãy | Tìm hai đầu dãy → tổng → trung bình cộng | Mọi cặp số hạng cách đều hai đầu đều có tổng bằng nhau. |
| Tìm quy luật dãy cách đều | Dãy số kèm dấu … ở cuối | Tính hiệu các cặp liên tiếp rồi cộng tiếp | Ghi khoảng cách vào giữa các số hạng để nhìn ra quy luật ngay. |
| Đếm số lần xuất hiện của một chữ số | Câu hỏi “chữ số … xuất hiện bao nhiêu lần” | Đếm theo từng hàng rồi cộng | Từ 1 đến 100, mỗi chữ số từ 1 đến 9 xuất hiện đúng 20 lần (riêng chữ số 1 là 21 lần vì có số 100). |
| Dãy số truy hồi có quy tắc rẽ nhánh | Đề mô tả cách lập số hạng từ số hạng liền trước | Lập bảng, tính lần lượt, bám sát vị trí | Chỉ cần tính tới số hạng được hỏi, không cần tính cả dãy. |
| Dãy tuần hoàn | Dãy lặp lại một nhóm số cố định | Chia vị trí cho chu kì, dùng số dư định vị | Tổng n số hạng = tổng một chu kì × số chu kì đầy đủ + tổng phần dư. |
| Dãy số quy luật bậc hai hoặc xen kẽ | Hiệu giữa các số hạng không bằng nhau | Lập dãy hiệu; tách dãy con theo vị trí | Dãy 1, 4, 9, 16, 25 là các số chính phương — nhớ để nhận ra ngay. |
| Quy luật hình đưa về dãy số | Đề mô tả hình xếp thêm đều đặn theo thứ tự | Lập bảng vài hình đầu, tìm khoảng cách, áp công thức | Chỉ cần ba hình đầu là đủ để khẳng định quy luật cách đều. |
| Đếm và tính tổng dãy con thoả điều kiện chia hết | Đề hỏi riêng các số chẵn, số chia hết cho … trong một dãy | Xác định dãy con cách đều rồi đếm, tính tổng | Nếu khoảng cách của dãy gốc đã chia hết cho số chia thì hoặc tất cả, hoặc không số hạng nào thoả điều kiện. |

---

## 4. LỘ TRÌNH ÔN BỐN BUỔI

| Buổi ôn | Việc làm | Thời lượng | Sản phẩm |
|:--:|---|:--:|---|
| 1 | Đọc lại bản đồ chương ở mục 1, tự vẽ lại sơ đồ tư duy cụm C11 mà không nhìn phiếu | 45 phút | Sơ đồ tư duy tự vẽ |
| 2 | Học thuộc bảng công thức mục 2, kiểm tra chéo trong nhóm hai bạn | 45 phút | Đọc thuộc không nhìn |
| 3 | Làm lại phiếu `GITA-T2-L4-C11-NC` phần IV và V, chấm bằng phiếu `GITA-T2-L4-C11-NC-GP` | 60 phút | Sổ lỗi cập nhật |
| 4 | Làm lại phiếu `GITA-T2-L4-C11-TH` trong đúng 90 phút, tự chấm | 90 phút | Điểm và bảng phân tích lỗi |

---

## 5. CHECKLIST TỰ KIỂM

Trả lời được ngay trong 10 giây thì đánh ✔. Phải nghĩ lâu thì đánh ✘ và làm lại phần tương ứng.

- [ ] **1.** Em nêu được dấu hiệu nhận biết của dạng “Tổng dãy đặc biệt” chứ?
- [ ] **2.** Em nhớ công thức: Ba công thức tổng cơ bản?
- [ ] **3.** Em nêu được dấu hiệu nhận biết của dạng “Bài toán trồng cây” chứ?
- [ ] **4.** Em nhớ công thức: Quan hệ số cây – số khoảng?
- [ ] **5.** Em nêu được dấu hiệu nhận biết của dạng “Dãy số theo quy luật nhân” chứ?
- [ ] **6.** Em nhớ công thức: Dãy nhân, phép nhân liên tiếp?
- [ ] **7.** Em nêu được dấu hiệu nhận biết của dạng “Đếm số hạng dãy cách đều” chứ?
- [ ] **8.** Em nhớ công thức: Công thức đếm số hạng?
- [ ] **9.** Em nêu được dấu hiệu nhận biết của dạng “Dãy số cách đều” chứ?
- [ ] **10.** Em nhớ công thức: Số hạng thứ n của dãy cách đều; đếm số hạng?
- [ ] **11.** Em nêu được dấu hiệu nhận biết của dạng “Định vị số hạng, kiểm tra một số có thuộc dãy” chứ?
- [ ] **12.** Em nhớ công thức: Dãy cách đều, phép chia có dư?
- [ ] **13.** Em nêu được dấu hiệu nhận biết của dạng “Tổng và trung bình cộng của dãy cách đều” chứ?
- [ ] **14.** Em nhớ công thức: Dãy cách đều, trung bình cộng?
- [ ] **15.** Em nêu được dấu hiệu nhận biết của dạng “Tìm quy luật dãy cách đều” chứ?
- [ ] **16.** Em nhớ công thức: Dãy số cách đều?
- [ ] **17.** Em nêu được dấu hiệu nhận biết của dạng “Đếm số lần xuất hiện của một chữ số” chứ?
- [ ] **18.** Em nhớ công thức: Dãy cách đều, cấu tạo số?
- [ ] **19.** Em nêu được dấu hiệu nhận biết của dạng “Dãy số truy hồi có quy tắc rẽ nhánh” chứ?
- [ ] **20.** Em nhớ công thức: Dãy số cho bởi quy tắc, tính lần lượt?

**Chuẩn đạt:** ✔ từ 18/20 câu trở lên.

---

## 6. SỔ LỖI MẪU

Đây là những lỗi học viên khoá trước mắc nhiều nhất ở cụm này. Chép vào sổ lỗi của em, kèm cột cách phòng.

| # | Lỗi thường gặp | Cách phòng |
|---:|---|---|
| 1 | Nhầm số hạng cuối với số lượng số hạng khi áp công thức. | Đếm số số hạng trước rồi mới thay vào công thức. |
| 2 | Máy móc cộng 1 cho mọi trường hợp. | Vẽ một đoạn ngắn với 3 khoảng để đếm thử trước khi áp dụng. |
| 3 | Cố ép dãy nhân thành dãy cộng nên tìm ra quy luật sai. | Thử cả hai: hiệu trước, thương sau. |
| 4 | Quên cộng 1 nên thiếu một số hạng. | Thử với dãy ngắn (3 số hạng) để kiểm chứng công thức. |
| 5 | Lấy (số cuối − số đầu) : 2 rồi trả lời luôn. | Thử với dãy ngắn: 1, 3, 5 có 3 số nhưng chỉ 2 khoảng. |
| 6 | Chia được số nguyên rồi quên cộng 1, hoặc bỏ qua phần dư. | Luôn ghi rõ thương và số dư khi chia. |
| 7 | Tính tổng rồi chia — dài hơn và dễ sai khi số hạng nhiều. | Nhớ tính chất trung bình cộng để kiểm tra chéo kết quả tổng. |
| 8 | Chỉ xét hai số đầu rồi vội kết luận. | Viết hiệu giữa các số hạng ngay dưới dấu ngoặc giữa chúng. |
| 9 | Đếm số lượng **số** chứa chữ số đó thay vì số **lần** xuất hiện. | Kẻ bảng: hàng đơn vị – hàng chục – hàng trăm, đếm riêng rồi cộng. |
| 10 | Áp dụng nhầm nhánh quy tắc vì không để ý vị trí. | Kẻ bảng hai dòng: dòng trên ghi vị trí, dòng dưới ghi số hạng. |
| 11 | Lấy số dư 0 rồi lấy phần tử đầu tiên của chu kì. | Kiểm chứng bằng một vị trí nhỏ đã biết trước khi làm vị trí lớn. |
| 12 | Chỉ thử một hướng rồi bỏ cuộc. | Luôn viết dãy hiệu xuống dưới dãy gốc trước khi kết luận. |
| 13 | Vẽ tay từng hình để đếm, không kịp thời gian với hình thứ hai, ba chục. | Lập bảng ba hình đầu để tìm khoảng cách rồi mới dùng công thức. |
| 14 | Duyệt từng số hạng để đếm — không kịp khi dãy dài hàng trăm số. | Tìm số hạng đầu tiên thoả điều kiện rồi xác định khoảng cách mới. |

---

## 7. TIÊU CHÍ ÔN CHẮC

Cụm này chỉ được coi là **đã ôn chắc** khi đủ cả bốn điều kiện sau.

| # | Tiêu chí | Ngưỡng đạt |
|---:|---|---|
| 1 | Điểm phiếu thi chương `GITA-T2-L4-C11-TH` | ≥ 80/100 |
| 2 | Checklist tự kiểm ở mục 5 | ≥ 90% số câu đánh ✔ |
| 3 | Bảng công thức mục 2 | Đọc thuộc, không nhìn sách |
| 4 | Sổ lỗi | Mỗi lỗi ở mục 6 đều có một dòng cách phòng do em tự viết |

Chưa đạt thì **học lại phiếu `GITA-T2-L4-C11-NC`** và làm bài tương tự trong phiếu `GITA-T2-L4-C11-NC-GP`, chưa mở cụm mới.

---

**Người biên soạn:** Ban chuyên môn Học viện GITA
**Phiên bản:** 2.0 · Chuẩn biên soạn phiếu GITA v2.0 · Đáp số do bộ sinh nội dung GITA tính, đã đối chiếu tự động.
