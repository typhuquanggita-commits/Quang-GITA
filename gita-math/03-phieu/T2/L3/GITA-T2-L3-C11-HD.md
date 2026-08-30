---
ma: "GITA-T2-L3-C11-HD"
tuyen: "T2"
lop: 3
cum: 11
cum_ten: "Tổng dãy số và quy luật nâng cao"
loai: "HD"
loai_ten: "Phiếu Hướng dẫn ôn chắc chuyên đề"
nhom_ma: "C"
nhom_ten: "Dãy số & Quy luật"
ten: "Tổng dãy số và quy luật nâng cao — Hướng dẫn ôn chắc chuyên đề"
hoc_ky: "HK2"
tuan: 21
---

# PHIẾU HƯỚNG DẪN ÔN CHẮC CHUYÊN ĐỀ · GITA-T2-L3-C11-HD

**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · *Tư duy xuất sắc, Bản lĩnh dẫn đầu* · gita.edu.vn
Tuyến 2 — Nâng cao thi CLC & thi Chuyên · Lớp 3 · Tuần 21 · HK2
**Cụm chuyên đề C11 — Tổng dãy số và quy luật nâng cao**
Nhóm chuyên đề **C — Dãy số & Quy luật**
Phiếu này dùng để **tự ôn chắc cả cụm** sau khi đã học xong sáu buổi. Không cần giáo viên nhắc.

---

## 1. BẢN ĐỒ CHƯƠNG

```
CỤM C11 — Tổng dãy số và quy luật nâng cao
├── Tổng dãy số cách đều — kỹ thuật ghép cặp
├── Dãy số: tìm số hạng còn thiếu ở giữa dãy
├── Quy luật trong dãy phép tính
├── Dãy số kết hợp bài toán trồng cây
└── Tổng ôn dãy số và quy luật nâng cao
```

| Buổi | Loại phiếu | Mã phiếu | Sản phẩm phải có sau buổi |
|:--:|---|---|---|
| 1 | Lý thuyết | `GITA-T2-L3-C11-LT` | Sơ đồ tư duy chương tự vẽ |
| 2 | Dạng bài & Đọc vị | `GITA-T2-L3-C11-DB` | Bảng dạng bài — dấu hiệu điền đủ |
| 3 | Kỹ năng & Phương pháp | `GITA-T2-L3-C11-KN` | Sổ lỗi và kịch bản thuyết trình |
| 4 | Luyện nâng cao | `GITA-T2-L3-C11-NC` | Bài IV, V đã chữa và ghi lỗi |
| 5 | Ôn thi | `GITA-T2-L3-C11-OT` | Điểm bài ôn và bảng phân tích lỗi |
| 6 | Thi chương | `GITA-T2-L3-C11-TH` | Điểm bài thi chương |

---

## 2. BẢNG CÔNG THỨC VÀ QUY TẮC PHẢI THUỘC

Học thuộc theo cặp **dạng bài – công thức**, không học rời.

| # | Dùng cho dạng bài | Công thức hoặc quy tắc |
|---:|---|---|
| 1 | Quy luật hình đưa về dãy số | Dãy cách đều, số hạng thứ n |
| 2 | Tìm quy luật dãy số | Dãy cách đều, dãy nhân, dãy hiệu tăng đều |
| 3 | Bài toán trồng cây | Quan hệ số cây – số khoảng |
| 4 | Tìm quy luật dãy cách đều | Dãy số cách đều |
| 5 | Đếm số hạng dãy cách đều | Dãy cách đều |
| 6 | Dãy tuần hoàn | Phép chia có dư, tính tuần hoàn |
| 7 | Dãy có hiệu tăng đều | Dãy hiệu, tổng dãy cách đều |
| 8 | Đếm số hạng dãy cách đều theo điều kiện | Dãy cách đều, dấu hiệu chia hết |

---

## 3. BẢNG DẠNG BÀI VÀ DẤU HIỆU NHẬN BIẾT

Trước khi tra bảng, đi qua cây quyết định đọc vị của nhóm chuyên đề. Bản đầy đủ kèm bộ đề luyện đọc vị ở `10-so-do-doc-vi/so-do-C-L3.md`.

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
| Quy luật hình đưa về dãy số | Hình xếp thêm đều đặn theo thứ tự | Lập bảng ba hình đầu rồi áp công thức | Ba hình đầu là đủ để khẳng định quy luật cách đều. |
| Tìm quy luật dãy số | Dãy số kết thúc bằng dấu … | Thử hiệu → thử thương → thử dãy hiệu | Số sau gấp đôi số trước là dấu hiệu quen nhất của dãy nhân. |
| Bài toán trồng cây | “Trồng cây”, “cột điện”, “quanh ao” | Số khoảng rồi chọn công thức theo trường hợp | Khép kín thì số cây bằng đúng số khoảng. |
| Tìm quy luật dãy cách đều | Dãy số kèm dấu … ở cuối | Tính hiệu các cặp liên tiếp rồi cộng tiếp | Ghi khoảng cách vào giữa các số hạng để nhìn ra quy luật ngay. |
| Đếm số hạng dãy cách đều | Dãy có số đầu, số cuối, khoảng cách đều | (cuối − đầu) : khoảng cách + 1 | Dãy số liên tiếp từ a đến b có b − a + 1 số hạng. |
| Dãy tuần hoàn | Dãy lặp lại một nhóm số cố định | Chia lấy dư để định vị | Tổng n số hạng = tổng một chu kì × số chu kì đầy đủ + phần dư. |
| Điền số hạng còn thiếu của dãy cách đều | Dãy có ô trống ở giữa | Xác định khoảng cách từ cặp liền nhau đã biết | Nếu chỗ trống nằm giữa hai số đã biết thì nó bằng trung bình cộng của hai số ấy. |
| Dãy có hiệu tăng đều | Hiệu giữa các số hạng tăng đều đặn | Lập dãy hiệu rồi cộng dần | Số hạng thứ n = số đầu + (n − 1) × n : 2 khi hiệu là 1, 2, 3… |
| Điền số hạng còn thiếu | Dãy có ô trống ở giữa | Xác định khoảng cách từ cặp liền nhau | Chỗ trống nằm giữa hai số đã biết thì bằng trung bình cộng của chúng. |
| Đếm số hạng dãy cách đều theo điều kiện | “Có bao nhiêu số … từ … đến …” | Tìm hai đầu hợp lệ rồi đếm | Số các số chia hết cho d từ 1 đến n bằng phần nguyên của n : d. |

---

## 4. LỘ TRÌNH ÔN BỐN BUỔI

| Buổi ôn | Việc làm | Thời lượng | Sản phẩm |
|:--:|---|:--:|---|
| 1 | Đọc lại bản đồ chương ở mục 1, tự vẽ lại sơ đồ tư duy cụm C11 mà không nhìn phiếu | 45 phút | Sơ đồ tư duy tự vẽ |
| 2 | Học thuộc bảng công thức mục 2, kiểm tra chéo trong nhóm hai bạn | 45 phút | Đọc thuộc không nhìn |
| 3 | Làm lại phiếu `GITA-T2-L3-C11-NC` phần IV và V, chấm bằng phiếu `GITA-T2-L3-C11-NC-GP` | 60 phút | Sổ lỗi cập nhật |
| 4 | Làm lại phiếu `GITA-T2-L3-C11-TH` trong đúng 90 phút, tự chấm | 90 phút | Điểm và bảng phân tích lỗi |

---

## 5. CHECKLIST TỰ KIỂM

Trả lời được ngay trong 10 giây thì đánh ✔. Phải nghĩ lâu thì đánh ✘ và làm lại phần tương ứng.

- [ ] **1.** Em nêu được dấu hiệu nhận biết của dạng “Quy luật hình đưa về dãy số” chứ?
- [ ] **2.** Em nhớ công thức: Dãy cách đều, số hạng thứ n?
- [ ] **3.** Em nêu được dấu hiệu nhận biết của dạng “Tìm quy luật dãy số” chứ?
- [ ] **4.** Em nhớ công thức: Dãy cách đều, dãy nhân, dãy hiệu tăng đều?
- [ ] **5.** Em nêu được dấu hiệu nhận biết của dạng “Bài toán trồng cây” chứ?
- [ ] **6.** Em nhớ công thức: Quan hệ số cây – số khoảng?
- [ ] **7.** Em nêu được dấu hiệu nhận biết của dạng “Tìm quy luật dãy cách đều” chứ?
- [ ] **8.** Em nhớ công thức: Dãy số cách đều?
- [ ] **9.** Em nêu được dấu hiệu nhận biết của dạng “Đếm số hạng dãy cách đều” chứ?
- [ ] **10.** Em nhớ công thức: Dãy cách đều?
- [ ] **11.** Em nêu được dấu hiệu nhận biết của dạng “Dãy tuần hoàn” chứ?
- [ ] **12.** Em nhớ công thức: Phép chia có dư, tính tuần hoàn?
- [ ] **13.** Em nêu được dấu hiệu nhận biết của dạng “Điền số hạng còn thiếu của dãy cách đều” chứ?
- [ ] **14.** Em nhớ công thức: Dãy số cách đều?
- [ ] **15.** Em nêu được dấu hiệu nhận biết của dạng “Dãy có hiệu tăng đều” chứ?
- [ ] **16.** Em nhớ công thức: Dãy hiệu, tổng dãy cách đều?
- [ ] **17.** Em nêu được dấu hiệu nhận biết của dạng “Điền số hạng còn thiếu” chứ?
- [ ] **18.** Em nhớ công thức: Dãy số cách đều?
- [ ] **19.** Em nêu được dấu hiệu nhận biết của dạng “Đếm số hạng dãy cách đều theo điều kiện” chứ?
- [ ] **20.** Em nhớ công thức: Dãy cách đều, dấu hiệu chia hết?

**Chuẩn đạt:** ✔ từ 18/20 câu trở lên.

---

## 6. SỔ LỖI MẪU

Đây là những lỗi học viên khoá trước mắc nhiều nhất ở cụm này. Chép vào sổ lỗi của em, kèm cột cách phòng.

| # | Lỗi thường gặp | Cách phòng |
|---:|---|---|
| 1 | Nhân khoảng cách với n nên thừa đúng một khoảng. | Kiểm chứng công thức với hình thứ 2 trước khi dùng cho hình thứ n. |
| 2 | Không tìm ra hiệu đều thì bỏ cuộc. | Viết dãy hiệu xuống ngay dưới dãy gốc. |
| 3 | Máy móc cộng 1 cho mọi trường hợp. | Vẽ một hình nhỏ với ba khoảng để đếm thử. |
| 4 | Chỉ xét hai số đầu rồi vội kết luận. | Viết hiệu giữa các số hạng ngay dưới dấu ngoặc giữa chúng. |
| 5 | Quên cộng 1. | Thử với dãy ngắn ba số để kiểm tra công thức. |
| 6 | Dư 0 mà lấy phần tử đầu tiên. | Kiểm chứng với một vị trí nhỏ đã biết trước khi làm vị trí lớn. |
| 7 | Lấy hiệu của hai số cách nhau một chỗ trống làm khoảng cách. | Đánh số thứ tự vị trí rồi mới tính khoảng cách. |
| 8 | Không tìm ra hiệu đều thì bỏ cuộc, không thử dãy hiệu. | Luôn viết dãy hiệu trước khi kết luận không có quy luật. |
| 9 | Lấy hiệu hai số cách nhau một chỗ trống làm khoảng cách. | Đánh số thứ tự vị trí rồi mới tính khoảng cách. |
| 10 | Lấy luôn hai đầu khoảng làm số đầu và số cuối của dãy. | Viết ba số đầu và ba số cuối của dãy trước khi áp công thức. |

---

## 7. TIÊU CHÍ ÔN CHẮC

Cụm này chỉ được coi là **đã ôn chắc** khi đủ cả bốn điều kiện sau.

| # | Tiêu chí | Ngưỡng đạt |
|---:|---|---|
| 1 | Điểm phiếu thi chương `GITA-T2-L3-C11-TH` | ≥ 80/100 |
| 2 | Checklist tự kiểm ở mục 5 | ≥ 90% số câu đánh ✔ |
| 3 | Bảng công thức mục 2 | Đọc thuộc, không nhìn sách |
| 4 | Sổ lỗi | Mỗi lỗi ở mục 6 đều có một dòng cách phòng do em tự viết |

Chưa đạt thì **học lại phiếu `GITA-T2-L3-C11-NC`** và làm bài tương tự trong phiếu `GITA-T2-L3-C11-NC-GP`, chưa mở cụm mới.

---

**Người biên soạn:** Ban chuyên môn Học viện GITA
**Phiên bản:** 2.0 · Chuẩn biên soạn phiếu GITA v2.0 · Đáp số do bộ sinh nội dung GITA tính, đã đối chiếu tự động.
