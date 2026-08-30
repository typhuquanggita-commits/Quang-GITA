# 30 — CHUYỂN GIAO TẦNG 2 LÊN TẦNG 3

*`19` mô tả phễu tầng 1 (nhóm → công cụ → tài khoản). Chương này mô tả đoạn tiếp: từ **buổi định hướng nhóm nhỏ**
sang **khóa trên web app** và **khóa huấn luyện offline của GITA**.
Đây là đoạn duy nhất trong toàn hệ thống có yếu tố bán hàng — nên nó là đoạn có nhiều luật nhất.*

---

## 30.1 · Vì sao đoạn này dễ làm hỏng cả hệ thống

Ba tháng xây niềm tin có thể mất trong một buổi.

Người ta vào nhóm vì được nói rõ: **ở đây không bán gì**. Lời hứa đó là tài sản lớn nhất của cộng đồng.
Nếu buổi định hướng hóa ra là một buổi chốt đơn, thì người dự không chỉ không mua — họ kể lại cho người khác,
và cái giá không nằm ở một đơn hàng mà nằm ở toàn bộ độ tin của nhóm.

**Nguyên tắc gốc của chương này:**
> Buổi định hướng phải **có giá trị trọn vẹn cho người không mua gì cả**.
> Nếu một người dự đủ 45 phút, không mua gì, và vẫn về với một việc làm được — thì buổi đó thành công.

Đây không phải lời khuyên đạo đức. Đó là cơ chế: một buổi chỉ có giá trị khi mua thì người ta cảm nhận được ngay
trong 5 phút đầu, và họ đóng lại — cả buổi lẫn cánh cửa.

---

## 30.2 · Ai được mời, ai không

**Điều kiện cần, cả bốn:**

| # | Điều kiện | Đo bằng |
|---|---|---|
| 1 | Đã ở nhóm ≥ 14 ngày | `THANH_VIEN` cột ngày duyệt |
| 2 | Có ≥ 3 bình luận trong 30 ngày | `THANH_VIEN` cột bình luận |
| 3 | Đã kể ra **một vấn đề cụ thể** của mình | Đọc bình luận, ghi lại nguyên văn |
| 4 | Đã làm ít nhất **một việc** từ nội dung nhóm và có báo lại | Bình luận báo kết quả |

**Không mời, dù họ hỏi:**
- Người mới vào dưới 14 ngày. Mời sớm là tín hiệu "nhóm này để bán", và người mới nhạy với tín hiệu đó nhất.
- Người chỉ thả cảm xúc, chưa từng bình luận. Họ chưa sẵn sàng, và một lời mời sẽ đẩy họ ra.
- Người đang trong tình huống nhạy cảm (`24`). Buổi này không phải chỗ cho người đang khủng hoảng.
- Người đã dự hai buổi mà chưa làm việc nào giữa hai buổi. Mời lần ba là làm phiền.

**Số lượng:** tối đa **12 người/buổi**. Trên 12 thì không còn là nhóm nhỏ, và người ít nói sẽ im hoàn toàn.

**Tần suất:** một buổi/tháng, đúng vào bài khép tháng. Nhiều hơn làm loãng giá trị và biến nó thành lịch bán hàng.

---

## 30.3 · Lời mời — ba nơi, ba cách

**Nơi 1 · Bài khép tháng trong nhóm.** Một đoạn, cuối bài, không tô đậm quá mức:
> Tháng sau tôi mở **một buổi định hướng nhóm nhỏ 45 phút, miễn phí, tối đa 12 người**.
> Không bán gì trong buổi đó, tôi nói trước. Ai muốn tham gia thì bình luận một chữ "có" ở đây.

Bình luận "có" là một hành động công khai — nó vừa là đăng ký vừa là tín hiệu tương tác cho thuật toán (`15`).

**Nơi 2 · Nhắn riêng, trong 24 giờ sau khi họ bình luận "có".** Dùng `23`/D2.

**Nơi 3 · Mời chủ động người đủ bốn điều kiện nhưng không bình luận "có".** Dùng `23`/D1 —
và bắt buộc có một câu nêu **lý do cụ thể vì sao mời họ**, dẫn đúng điều họ đã viết. Không có câu đó thì đừng gửi.

---

## 30.4 · Kịch bản buổi 45 phút

*Giữ đúng 45 phút. Kéo dài thành 90 phút là dấu hiệu buổi đã trượt sang bán hàng.*

| Phút | Phần | Nội dung |
|---|---|---|
| 0–5 | **Mở** | Nói rõ ba điều: buổi này 45 phút · không bán gì · mỗi người sẽ về với một việc |
| 5–15 | **Mỗi người một câu** | Từng người đọc câu mô tả vấn đề đã chuẩn bị. Người dẫn **chỉ ghi lại**, không bình luận |
| 15–30 | **Tách ba tầng** | Lấy 2–3 câu tiêu biểu, tách thành hiện tượng / thói quen / niềm tin (`01`). Cả nhóm cùng làm |
| 30–40 | **Mỗi người chốt một việc** | Một việc, làm trong 7 ngày, nhỏ đến mức chắc chắn làm được |
| 40–45 | **Khép** | Nói về bước tiếp theo *nếu có ai muốn*, không quá 3 phút. Hẹn nhắn lại vào ngày thứ 7 |

**Phần 5 phút cuối — nói đúng như thế này, không hơn:**
> "Nếu ai muốn đi sâu hơn phần vừa rồi thì trên web app có [tên khóa]. Tôi không nói thêm về nó ở đây.
> Ai muốn biết thì nhắn tôi sau buổi này, tôi trả lời đầy đủ, kể cả phần khóa đó **không** làm được.
> Còn không thì việc 7 ngày vừa chốt là đủ cho tháng này rồi."

**Sáu điều tuyệt đối không làm trong buổi:**
1. Không nói giá, trừ khi có người hỏi trực tiếp.
2. Không nói "ưu đãi chỉ hôm nay", "còn 3 suất" — trừ khi đó là sự thật kiểm chứng được.
3. Không gọi tên ai để hỏi "anh/chị có muốn đăng ký không".
4. Không chiếu bảng giá, không chia sẻ màn hình có nội dung bán hàng.
5. Không dùng chuyện của người dự làm ví dụ bán hàng ngay tại chỗ.
6. Không kéo dài quá 45 phút để "nói nốt về khóa học".

---

## 30.5 · Bảy ngày sau buổi — đoạn quyết định

Phần lớn giá trị của buổi nằm ở **bảy ngày sau nó**, không nằm trong buổi.

| Ngày | Việc | Kịch bản |
|---|---|---|
| 0 (ngay sau buổi) | Nhắn từng người: ghi lại đúng việc họ chốt | `23`/D4 |
| 3 | **Không nhắn gì.** Để họ làm | — |
| 7 | Nhắn đúng một câu: làm được chưa | `23`/D5 |
| 7 (nếu chưa làm) | Hỏi chỗ kẹt, **giả định việc quá to chứ không phải họ lười** | `23`/D5 |
| 10–14 | Chỉ với người **đã làm xong** và **chủ động hỏi** — trả lời đầy đủ về khóa | `23`/D6 |

**Luật cứng:** không giới thiệu khóa cho người **chưa làm xong việc 7 ngày**.

Lý do không phải đạo đức mà là hiệu quả: người chưa làm nổi một việc nhỏ trong 7 ngày sẽ không hoàn thành một khóa học,
sẽ không có kết quả, và sẽ trở thành một người kể lại rằng khóa học không có tác dụng. Bán cho họ là **lỗ**, không phải lãi.

---

## 30.6 · Nói về khóa học thế nào

Chỉ nói khi **họ hỏi trước**. Khi đó dùng `23`/D6, gồm ba phần bắt buộc:

**1 · Mô tả, không hứa.** Tên khóa · thời lượng · hình thức · học phí · nội dung xử lý đúng vấn đề của họ.
Không dùng: *"sẽ thay đổi cuộc đời"*, *"cam kết kết quả"*, *"bí quyết"* (`27.5`).

**2 · Nói cả điều khóa không làm được.** Bắt buộc, không phải tùy chọn.
> *"Khóa này không hợp với người đang muốn tìm câu trả lời nhanh."*
> *"Nếu anh/chị chưa làm xong việc 7 ngày vừa rồi thì khoan đã — khóa này không giải quyết được cái đó."*

Đây là câu có sức thuyết phục cao nhất trong toàn bộ hệ thống, vì nó là bằng chứng duy nhất người nói không đang bán.

**3 · Không tạo áp lực thời gian.**
> *"Không có ưu đãi giới hạn thời gian gì cả. Anh/chị suy nghĩ bao lâu cũng được, giá không đổi."*

Nếu có ưu đãi thật thì nói đúng sự thật, có ngày kết thúc thật, và không nhắc lại quá một lần.

---

## 30.7 · Ba cửa của tầng 3, và ai hợp cửa nào

| Cửa | Hình thức | Hợp với ai | Dấu hiệu nhận ra |
|---|---|---|---|
| **Khóa nền tảng trên web app** | Tự học, theo tiến độ riêng | Người bận, người ngại nói trước đám đông, người muốn thử trước | Hỏi về nội dung, không hỏi về lịch |
| **Khóa đào tạo trực tuyến** | Có lịch, có nhóm học, có người dẫn | Người cần bị "ép nhịp", người học một mình hay bỏ | Đã bỏ dở một khóa tự học trước đó |
| **Khóa huấn luyện offline của GITA** | Gặp mặt, cường độ cao | Người đã làm xong nhiều việc nhỏ và đang mắc ở một chỗ lớn | Đã dự ≥2 buổi định hướng và có kết quả cụ thể |

**Không đẩy ai lên cửa cao hơn mức họ sẵn sàng.** Người chưa hoàn thành một khóa tự học mà đăng ký offline
gần như luôn không có kết quả — và một người không có kết quả là mất mát lớn hơn một người chưa mua.

Khi phân vân, **luôn chọn cửa thấp hơn**. Người có kết quả ở cửa thấp sẽ tự đi lên cửa cao; người thất bại ở cửa cao thường không quay lại.

---

## 30.8 · Đo lường — sáu số, và số nào mới đáng nhìn

| # | Chỉ số | Công thức | Ngưỡng khỏe |
|---|---|---|---|
| 1 | Tỉ lệ nhận lời | Số dự ÷ số được mời | ≥ 60% |
| 2 | Tỉ lệ có mặt | Số dự thật ÷ số nhận lời | ≥ 70% |
| 3 | Tỉ lệ chốt việc | Số chốt được một việc ÷ số dự | ≥ 90% |
| 4 | **Tỉ lệ làm xong việc 7 ngày** | Số báo đã làm ÷ số chốt việc | **≥ 50%** |
| 5 | Tỉ lệ chủ động hỏi về khóa | Số tự hỏi ÷ số dự | 20–40% |
| 6 | Tỉ lệ đăng ký | Số đăng ký ÷ số dự | 10–20% |

**Số 4 là số duy nhất đáng nhìn hằng tháng.** Nó dự báo tất cả các số còn lại và nó là số duy nhất
đo được **giá trị thật đã được tạo ra**, không phải giao dịch đã xảy ra.

Khi số 4 dưới 30%: việc chốt đang quá to. Sửa bằng cách bắt mọi người chốt việc nhỏ hơn nữa trong phần 30–40 phút.
Khi số 6 cao mà số 4 thấp: buổi đang bán tốt và tạo giá trị kém. **Đây là tình trạng nguy hiểm nhất** — nó tạo doanh thu
ngắn hạn và phá cộng đồng dài hạn. Dừng lại và xem lại kịch bản buổi.

---

## 30.9 · Người không mua — và vì sao họ quan trọng hơn người mua

80–90% người dự buổi sẽ không đăng ký gì. Cách đối xử với họ quyết định hệ thống này sống được bao lâu.

**Ba luật:**
1. **Không nhắn thêm về khóa học sau lần trả lời đầu.** Một lần là thông tin, hai lần là chào hàng, ba lần là làm phiền.
2. **Không đối xử khác đi trong nhóm.** Không giảm mức chăm sóc bình luận, không bỏ họ khỏi danh sách vinh danh.
3. **Vẫn mời họ buổi sau**, nếu họ vẫn đủ bốn điều kiện — nhưng tối đa hai lần, rồi dừng.

**Vì sao điều này quan trọng:** người dự buổi mà không mua và vẫn được đối xử tử tế trở thành nguồn giới thiệu
đáng tin nhất mà cộng đồng có — vì họ là người duy nhất có thể nói câu *"tôi dự buổi đó, không mua gì, và họ không làm phiền tôi."*

Câu đó bán được nhiều hơn mọi bài quảng cáo.

---

## 30.10 · Danh mục kiểm tra sau mỗi buổi

Chạy trong 30 phút sau khi buổi kết thúc, ghi vào `SO_CA`.

- [ ] Buổi có kết thúc đúng trong 45 phút không?
- [ ] Có ai không nói câu nào suốt buổi không? (Nếu có: lần sau gọi tên họ ở phần 5–15 phút)
- [ ] Mọi người đều chốt được một việc chưa?
- [ ] Việc ai chốt trông có vẻ quá to? (Ghi tên, nhắn riêng đề nghị làm nhỏ lại)
- [ ] Mình có nói giá khi không ai hỏi không?
- [ ] Mình có nói câu "khóa này không làm được gì" không?
- [ ] Có ai kể chuyện nhạy cảm cần chuyển sang `24` không?
- [ ] Đã nhắn `23`/D4 cho từng người trong ngày chưa?
- [ ] Đã đặt lịch nhắn ngày thứ 7 chưa?
- [ ] Ghi sáu số của 30.8 vào `KPI_TUAN` chưa?
