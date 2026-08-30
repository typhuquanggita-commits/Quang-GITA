---
ma: "GITA-T2-L5-C03-HD"
tuyen: "T2"
lop: 5
cum: 3
cum_ten: "Dãy số cách đều, dãy phân số và dãy số đặc biệt"
loai: "HD"
loai_ten: "Phiếu Hướng dẫn ôn chắc chuyên đề"
nhom_ma: "C"
nhom_ten: "Dãy số & Quy luật"
ten: "Dãy số cách đều, dãy phân số và dãy số đặc biệt — Hướng dẫn ôn chắc chuyên đề"
hoc_ky: "HK1"
tuan: 5
---

# PHIẾU HƯỚNG DẪN ÔN CHẮC CHUYÊN ĐỀ · GITA-T2-L5-C03-HD

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · *Tư duy xuất sắc, Bản lĩnh dẫn đầu* · gita.edu.vn
Tuyến 2 — Nâng cao thi CLC & thi Chuyên · Lớp 5 · Tuần 5 · HK1
**Cụm chuyên đề C03 — Dãy số cách đều, dãy phân số và dãy số đặc biệt**
Nhóm chuyên đề **C — Dãy số & Quy luật**
Phiếu này dùng để **tự ôn chắc cả cụm** sau khi đã học xong sáu buổi. Không cần giáo viên nhắc.

---

## 1. BẢN ĐỒ CHƯƠNG

```
CỤM C03 — Dãy số cách đều, dãy phân số và dãy số đặc biệt
├── Dãy số cách đều — công thức tổng quát
├── Dãy phân số theo quy luật
├── Dãy số đặc biệt: Fibonacci, dãy bình phương, dãy số tam giác
├── Tổng của dãy số có quy luật nhân
└── Dãy số hình học và bài toán đếm số hạng
```

| Buổi | Loại phiếu | Mã phiếu | Sản phẩm phải có sau buổi |
|:--:|---|---|---|
| 1 | Lý thuyết | `GITA-T2-L5-C03-LT` | Sơ đồ tư duy chương tự vẽ |
| 2 | Dạng bài & Đọc vị | `GITA-T2-L5-C03-DB` | Bảng dạng bài — dấu hiệu điền đủ |
| 3 | Kỹ năng & Phương pháp | `GITA-T2-L5-C03-KN` | Sổ lỗi và kịch bản thuyết trình |
| 4 | Luyện nâng cao | `GITA-T2-L5-C03-NC` | Bài IV, V đã chữa và ghi lỗi |
| 5 | Ôn thi | `GITA-T2-L5-C03-OT` | Điểm bài ôn và bảng phân tích lỗi |
| 6 | Thi chương | `GITA-T2-L5-C03-TH` | Điểm bài thi chương |

---

## 2. BẢNG CÔNG THỨC VÀ QUY TẮC PHẢI THUỘC

Học thuộc theo cặp **dạng bài – công thức**, không học rời.

| # | Dùng cho dạng bài | Công thức hoặc quy tắc |
|---:|---|---|
| 1 | Tìm số hạng thứ n của dãy cách đều | Công thức số hạng tổng quát của dãy cách đều |
| 2 | Dãy số quy luật bậc hai hoặc xen kẽ | Dãy hiệu, dãy con xen kẽ |
| 3 | Đếm số lần xuất hiện của một chữ số | Dãy cách đều, cấu tạo số |
| 4 | Tổng dãy số cách đều | Công thức tổng dãy cách đều |
| 5 | Dãy tuần hoàn | Phép chia có dư, tính tuần hoàn |
| 6 | Đếm và tính tổng dãy con thoả điều kiện chia hết | Dãy cách đều, bội chung nhỏ nhất |
| 7 | Định vị số hạng, kiểm tra một số có thuộc dãy | Dãy cách đều, phép chia có dư |
| 8 | Đếm số hạng dãy cách đều | Công thức đếm số hạng |
| 9 | Bài toán chu kỳ | Dãy cách đều; đổi đơn vị giờ – phút |
| 10 | Quy luật hình đưa về dãy số | Dãy cách đều, số hạng thứ n, tổng dãy |
| 11 | Tổng và trung bình cộng của dãy cách đều | Dãy cách đều, trung bình cộng |
| 12 | Tổng dãy đặc biệt | Ba công thức tổng cơ bản |
| 13 | Tìm quy luật dãy cách đều | Dãy số cách đều |
| 14 | Dãy có hiệu tăng đều (hiệu bậc hai) | Dãy hiệu, tổng dãy cách đều |

---

## 3. BẢNG DẠNG BÀI VÀ DẤU HIỆU NHẬN BIẾT

Trước khi tra bảng, đi qua cây quyết định đọc vị của nhóm chuyên đề. Bản đầy đủ kèm bộ đề luyện đọc vị ở `10-so-do-doc-vi/so-do-C-L5.md`.

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
| Tìm số hạng thứ n của dãy cách đều | Đề hỏi “số hạng thứ …” | Đếm số khoảng rồi nhân với khoảng cách | Thử công thức với n = 1 và n = 2 để chắc chắn không lệch một khoảng. |
| Dãy số quy luật bậc hai hoặc xen kẽ | Hiệu giữa các số hạng không bằng nhau | Lập dãy hiệu; tách dãy con theo vị trí | Dãy 1, 4, 9, 16, 25 là các số chính phương — nhớ để nhận ra ngay. |
| Đếm số lần xuất hiện của một chữ số | Câu hỏi “chữ số … xuất hiện bao nhiêu lần” | Đếm theo từng hàng rồi cộng | Từ 1 đến 100, mỗi chữ số từ 1 đến 9 xuất hiện đúng 20 lần (riêng chữ số 1 là 21 lần vì có số 100). |
| Tổng dãy số cách đều | Dãy cộng dài, các số cách đều | Đếm số hạng → (đầu + cuối) × số hạng : 2 | Tổng = trung bình cộng của số đầu và số cuối, nhân với số số hạng. |
| Dãy tuần hoàn | Dãy lặp lại một nhóm số cố định | Chia vị trí cho chu kì, dùng số dư định vị | Tổng n số hạng = tổng một chu kì × số chu kì đầy đủ + tổng phần dư. |
| Đếm và tính tổng dãy con thoả điều kiện chia hết | Đề hỏi riêng các số chẵn, số chia hết cho … trong một dãy | Xác định dãy con cách đều rồi đếm, tính tổng | Nếu khoảng cách của dãy gốc đã chia hết cho số chia thì hoặc tất cả, hoặc không số hạng nào thoả điều kiện. |
| Định vị số hạng, kiểm tra một số có thuộc dãy | Câu hỏi “là số hạng thứ mấy”, “có thuộc dãy không” | (số − đầu) : khoảng cách, xét dư rồi cộng 1 | Mọi số hạng của dãy đều có cùng số dư khi chia cho khoảng cách. |
| Đếm số hạng dãy cách đều | Dãy có số đầu, số cuối và khoảng cách đều | (cuối − đầu) : khoảng cách + 1 | Dãy số tự nhiên liên tiếp từ a đến b có b − a + 1 số hạng. |
| Bài toán chu kỳ | Một sự việc lặp lại đều đặn theo thời gian | Quy về phút, dùng công thức dãy cách đều, đổi ngược lại giờ | Số chuyến trong một giờ = 60 chia khoảng cách, nhẩm ngay được. |
| Quy luật hình đưa về dãy số | Đề mô tả hình xếp thêm đều đặn theo thứ tự | Lập bảng vài hình đầu, tìm khoảng cách, áp công thức | Chỉ cần ba hình đầu là đủ để khẳng định quy luật cách đều. |
| Tổng và trung bình cộng của dãy cách đều | Đề cho số số hạng, khoảng cách và một đầu của dãy | Tìm hai đầu dãy → tổng → trung bình cộng | Mọi cặp số hạng cách đều hai đầu đều có tổng bằng nhau. |
| Tổng dãy đặc biệt | Dãy toàn số lẻ, toàn số chẵn, hoặc số tự nhiên liên tiếp | Đếm số số hạng rồi áp công thức | Tổng n số lẻ đầu tiên luôn là một số chính phương — dùng để kiểm tra nhanh. |
| Tìm quy luật dãy cách đều | Dãy số kèm dấu … ở cuối | Tính hiệu các cặp liên tiếp rồi cộng tiếp | Ghi khoảng cách vào giữa các số hạng để nhìn ra quy luật ngay. |
| Dãy có hiệu tăng đều (hiệu bậc hai) | Hiệu giữa các số hạng tăng đều đặn | Lập dãy hiệu, tính tổng hiệu, cộng vào số hạng đầu | Với hiệu 1, 2, 3, … thì số hạng thứ n = số đầu + (n − 1) × n : 2. |

---

## 4. LỘ TRÌNH ÔN BỐN BUỔI

| Buổi ôn | Việc làm | Thời lượng | Sản phẩm |
|:--:|---|:--:|---|
| 1 | Đọc lại bản đồ chương ở mục 1, tự vẽ lại sơ đồ tư duy cụm C03 mà không nhìn phiếu | 45 phút | Sơ đồ tư duy tự vẽ |
| 2 | Học thuộc bảng công thức mục 2, kiểm tra chéo trong nhóm hai bạn | 45 phút | Đọc thuộc không nhìn |
| 3 | Làm lại phiếu `GITA-T2-L5-C03-NC` phần IV và V, chấm bằng phiếu `GITA-T2-L5-C03-NC-GP` | 60 phút | Sổ lỗi cập nhật |
| 4 | Làm lại phiếu `GITA-T2-L5-C03-TH` trong đúng 90 phút, tự chấm | 90 phút | Điểm và bảng phân tích lỗi |

---

## 5. CHECKLIST TỰ KIỂM

Trả lời được ngay trong 10 giây thì đánh ✔. Phải nghĩ lâu thì đánh ✘ và làm lại phần tương ứng.

- [ ] **1.** Em nêu được dấu hiệu nhận biết của dạng “Tìm số hạng thứ n của dãy cách đều” chứ?
- [ ] **2.** Em nhớ công thức: Công thức số hạng tổng quát của dãy cách đều?
- [ ] **3.** Em nêu được dấu hiệu nhận biết của dạng “Dãy số quy luật bậc hai hoặc xen kẽ” chứ?
- [ ] **4.** Em nhớ công thức: Dãy hiệu, dãy con xen kẽ?
- [ ] **5.** Em nêu được dấu hiệu nhận biết của dạng “Đếm số lần xuất hiện của một chữ số” chứ?
- [ ] **6.** Em nhớ công thức: Dãy cách đều, cấu tạo số?
- [ ] **7.** Em nêu được dấu hiệu nhận biết của dạng “Tổng dãy số cách đều” chứ?
- [ ] **8.** Em nhớ công thức: Công thức tổng dãy cách đều?
- [ ] **9.** Em nêu được dấu hiệu nhận biết của dạng “Dãy tuần hoàn” chứ?
- [ ] **10.** Em nhớ công thức: Phép chia có dư, tính tuần hoàn?
- [ ] **11.** Em nêu được dấu hiệu nhận biết của dạng “Đếm và tính tổng dãy con thoả điều kiện chia hết” chứ?
- [ ] **12.** Em nhớ công thức: Dãy cách đều, bội chung nhỏ nhất?
- [ ] **13.** Em nêu được dấu hiệu nhận biết của dạng “Định vị số hạng, kiểm tra một số có thuộc dãy” chứ?
- [ ] **14.** Em nhớ công thức: Dãy cách đều, phép chia có dư?
- [ ] **15.** Em nêu được dấu hiệu nhận biết của dạng “Đếm số hạng dãy cách đều” chứ?
- [ ] **16.** Em nhớ công thức: Công thức đếm số hạng?
- [ ] **17.** Em nêu được dấu hiệu nhận biết của dạng “Bài toán chu kỳ” chứ?
- [ ] **18.** Em nhớ công thức: Dãy cách đều; đổi đơn vị giờ – phút?
- [ ] **19.** Em nêu được dấu hiệu nhận biết của dạng “Quy luật hình đưa về dãy số” chứ?
- [ ] **20.** Em nhớ công thức: Dãy cách đều, số hạng thứ n, tổng dãy?

**Chuẩn đạt:** ✔ từ 18/20 câu trở lên.

---

## 6. SỔ LỖI MẪU

Đây là những lỗi học viên khoá trước mắc nhiều nhất ở cụm này. Chép vào sổ lỗi của em, kèm cột cách phòng.

| # | Lỗi thường gặp | Cách phòng |
|---:|---|---|
| 1 | Nhân khoảng cách với n nên kết quả thừa đúng một khoảng. | Kiểm chứng công thức với n = 1: phải ra đúng số hạng đầu. |
| 2 | Chỉ thử một hướng rồi bỏ cuộc. | Luôn viết dãy hiệu xuống dưới dãy gốc trước khi kết luận. |
| 3 | Đếm số lượng **số** chứa chữ số đó thay vì số **lần** xuất hiện. | Kẻ bảng: hàng đơn vị – hàng chục – hàng trăm, đếm riêng rồi cộng. |
| 4 | Quên chia 2, kết quả gấp đôi đáp số đúng. | Kiểm tra bằng dãy ngắn: 1 + 2 + 3 = 6, công thức phải cho đúng 6. |
| 5 | Lấy số dư 0 rồi lấy phần tử đầu tiên của chu kì. | Kiểm chứng bằng một vị trí nhỏ đã biết trước khi làm vị trí lớn. |
| 6 | Duyệt từng số hạng để đếm — không kịp khi dãy dài hàng trăm số. | Tìm số hạng đầu tiên thoả điều kiện rồi xác định khoảng cách mới. |
| 7 | Chia được số nguyên rồi quên cộng 1, hoặc bỏ qua phần dư. | Luôn ghi rõ thương và số dư khi chia. |
| 8 | Quên cộng 1 nên thiếu một số hạng. | Thử với dãy ngắn (3 số hạng) để kiểm chứng công thức. |
| 9 | Quên cộng 1 khi đếm số chuyến, hoặc cộng phút vào giờ mà không đổi. | Viết mọi mốc thời gian ra phút kể từ chuyến đầu. |
| 10 | Vẽ tay từng hình để đếm, không kịp thời gian với hình thứ hai, ba chục. | Lập bảng ba hình đầu để tìm khoảng cách rồi mới dùng công thức. |
| 11 | Tính tổng rồi chia — dài hơn và dễ sai khi số hạng nhiều. | Nhớ tính chất trung bình cộng để kiểm tra chéo kết quả tổng. |
| 12 | Nhầm số hạng cuối với số lượng số hạng khi áp công thức. | Đếm số số hạng trước rồi mới thay vào công thức. |
| 13 | Chỉ xét hai số đầu rồi vội kết luận. | Viết hiệu giữa các số hạng ngay dưới dấu ngoặc giữa chúng. |
| 14 | Cộng n hiệu thay vì (n − 1) hiệu. | Kiểm chứng với n = 2: chỉ cộng đúng một hiệu. |

---

## 7. TIÊU CHÍ ÔN CHẮC

Cụm này chỉ được coi là **đã ôn chắc** khi đủ cả bốn điều kiện sau.

| # | Tiêu chí | Ngưỡng đạt |
|---:|---|---|
| 1 | Điểm phiếu thi chương `GITA-T2-L5-C03-TH` | ≥ 80/100 |
| 2 | Checklist tự kiểm ở mục 5 | ≥ 90% số câu đánh ✔ |
| 3 | Bảng công thức mục 2 | Đọc thuộc, không nhìn sách |
| 4 | Sổ lỗi | Mỗi lỗi ở mục 6 đều có một dòng cách phòng do em tự viết |

Chưa đạt thì **học lại phiếu `GITA-T2-L5-C03-NC`** và làm bài tương tự trong phiếu `GITA-T2-L5-C03-NC-GP`, chưa mở cụm mới.

---

**Người biên soạn:** Ban chuyên môn Học viện GITA
**Phiên bản:** 2.0 · Chuẩn biên soạn phiếu GITA v2.0 · Đáp số do bộ sinh nội dung GITA tính, đã đối chiếu tự động.
