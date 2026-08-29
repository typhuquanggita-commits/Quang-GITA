# Nhận diện HSA365

> Nhận diện không phải là logo và bảng màu. Nhận diện là **những gì chúng tôi từ
> chối làm** khi việc đó dễ hơn và bán được nhiều hơn.

---

## 1. Một câu định vị

**HSA365 là hệ thống huấn luyện theo mô thức GITA cho kỳ thi Đánh giá năng lực
HSA — nơi mọi con số đều dẫn tới một việc cụ thể phải làm hôm nay.**

Ba từ khóa, theo thứ tự quan trọng:

1. **Huấn luyện**, không phải kho đề. Kho đề bán số lượng; huấn luyện bán sự thay
   đổi có đo được.
2. **Mô thức GITA**, không phải mẹo thi. Mẹo hết tác dụng khi đề đổi; mô thức thì không.
3. **Dẫn tới việc phải làm**, không dừng ở điểm số. Một con số không nói cho ai
   biết phải làm gì tiếp.

---

## 2. Bảy điều làm nên khác biệt

Mỗi điều dưới đây đều kiểm chứng được trong sản phẩm, không phải lời quảng cáo.

### 2.1 Đo năng lực bằng mô hình đo lường thật, không bằng phần trăm câu đúng

Tỉ lệ đúng chỉ có nghĩa khi đề cùng độ khó. HSA365 dùng **mô hình Rasch (IRT một
tham số)** để tách độ khó của câu khỏi năng lực của người học, nên 8/10 câu khó và
8/10 câu dễ cho ra hai kết luận khác nhau. Điểm dự báo được **chiếu** lên phân bố
độ khó của một đề chuẩn thay vì ngoại suy tuyến tính.

> Đây là chuẩn đo lường được dùng trong các kỳ thi chuẩn hóa quốc tế. Hầu hết ứng
> dụng luyện thi chỉ hiển thị phần trăm.

### 2.2 Bốn trụ cột, không chỉ một

Hầu hết sản phẩm chỉ đo trụ **Action** — số câu, số giờ, chuỗi ngày. HSA365 đo cả
bốn, và hiển thị **trụ nào đang trống**. Người học chăm chỉ mà không tiến bộ
thường không thiếu nỗ lực; họ thiếu một trong ba trụ còn lại.

### 2.3 Nói thật về điểm may rủi và về sự tự tin sai chỗ

Người học tự khai mức tự tin cho từng câu. Hệ thống đối chiếu và chỉ ra hai thứ
mà không sản phẩm nào khác dám hiển thị:

- **Câu đúng nhờ đoán** — không lặp lại được trong phòng thi.
- **Câu sai dù tự tin** — lỗ hổng "không biết là mình không biết", nguy hiểm nhất.

### 2.4 Quy tắc 20/80 được tính, không được hô

"Tập trung vào việc quan trọng" là lời khuyên vô dụng nếu không nói *việc nào*.
HSA365 tính vùng 20/80 bằng công thức trọng số × khoảng còn thiếu, rồi **đối chiếu
với hành vi thật 14 ngày qua** để cho biết công sức có rơi đúng chỗ hay không.

### 2.5 Chương trình sinh ra từ đặc tả, không gõ tay

2.000 phiếu luyện và 2.000 nhiệm vụ được sinh từ một khung chương trình duy nhất.
Hệ quả: đổi ngưỡng KPI một chỗ thì cả 2.000 phiếu cập nhật theo; thêm câu hỏi vào
ngân hàng thì phiếu tự động phong phú hơn mà không phải sửa gì. Và **có bài test
canh giữ** rằng số phiếu đúng bằng 2.000, không phiếu nào lặp câu, mỗi cấp độ của
mỗi tuyến đều kết thúc bằng một phiếu vượt ải.

### 2.6 Tài liệu và phần mềm dùng chung một nguồn

Khung mô thức được định nghĩa **một lần** trong `src/data/gita.ts`. Màn hình Mô
thức GITA in ra chính dữ liệu đó; các tài liệu trong `docs/GITA/` diễn giải chính
cấu trúc đó; bộ test canh giữ tính toàn vẹn của nó. Không bao giờ có chuyện tài
liệu nói một đằng, phần mềm chạy một nẻo.

### 2.7 Dữ liệu thuộc về người học

Toàn bộ tiến độ nằm trên máy của người dùng. Không tài khoản, không máy chủ,
không thu thập. Xuất ra JSON và nhập lại được bất cứ lúc nào. Ứng dụng chạy đầy đủ
khi ngoại tuyến — mất mạng giữa bài thi 195 phút không làm mất bài.

---

## 3. Nguyên tắc thiết kế

### Mỗi con số phải dẫn tới một hành động

Không hiển thị chỉ số chỉ vì đo được. Mỗi biểu đồ, mỗi phần trăm trên màn hình đều
kèm một câu trả lời cho *"vậy tôi làm gì?"*.

### Nói thật, kể cả khi khó nghe

- Người tự nhận "tự học được" nhưng chuỗi ngày bằng 0 thì vẫn hiện tầng H1.
- Ngân hàng câu hỏi chưa đủ thì hiển thị chỉ số độ phủ, không giấu.
- AI có thể sai thì ghi rõ ngay dưới mỗi câu trả lời của AI.
- Lớp kiểm soát quyền phía client không phải ranh giới bảo mật thì nói thẳng
  trong sản phẩm, không chỉ trong tài liệu kỹ thuật.

### Ít lựa chọn hơn ở tầng thấp

Người ở tầng H1 thấy tối đa ba việc. Càng nhiều lựa chọn càng dễ bỏ cuộc. Tính
năng mở dần theo tầng không phải để tạo cảm giác phần thưởng — nó để giảm tải nhận
thức đúng lúc.

### Không có gì được phép làm gián đoạn bài thi

Trong lúc làm bài, mọi thứ không phải câu hỏi đều là nhiễu: không thông báo, không
quảng cáo, không gợi ý, không huy hiệu. Bản nháp được lưu liên tục để đóng tab
giữa chừng cũng không mất bài.

---

## 4. Giọng nói

| Đặc điểm | Ví dụ nên | Ví dụ tránh |
|---|---|---|
| **Trực tiếp** | "Bỏ trống 3 câu là mất điểm chắc chắn." | "Bạn có thể cân nhắc việc trả lời đầy đủ hơn." |
| **Giải thích cơ chế** | "Đọc lại tạo cảm giác hiểu bài mà không tạo ra năng lực." | "Hãy cố gắng học hiệu quả hơn nhé!" |
| **Không phán xét** | "Chuỗi đang bằng 0. Quay lại trong 24 giờ là đủ." | "Bạn đã bỏ lỡ 5 ngày rồi đấy!" |
| **Không thổi phồng** | "Tăng 4 điểm so với lần trước." | "Tuyệt vời! Bạn đang tiến bộ vượt bậc! 🎉" |
| **Cụ thể** | "Làm 10 câu về kỹ năng tính tỉ trọng." | "Hãy ôn lại phần Địa lý." |

Không dùng: dấu chấm than dồn dập, biểu tượng cảm xúc trong nội dung học thuật,
lời khen chung chung, ngôn ngữ tạo áp lực khan hiếm ("chỉ còn 3 ngày!").

---

## 5. Hình ảnh

| Yếu tố | Quy định |
|---|---|
| **Chữ** | Ngăn xếp phông hệ thống. Không tải phông ngoài — ứng dụng phải chạy ngoại tuyến |
| **Màu nền tảng** | Token ngữ nghĩa (`canvas`, `surface`, `fg`, `line`…), không dùng thẳng bảng màu thư viện |
| **Màu biểu đồ** | Ba khe phân loại đã kiểm định cho cả hai chế độ màu và cho người mù màu |
| **Chế độ tối** | Bảng màu riêng được chọn cho nền tối, không phải đảo ngược tự động |
| **Biểu tượng** | Tự vẽ trên lưới 24px, nét 1,75 — một ngôn ngữ hình học duy nhất |
| **Chuyển động** | Tối đa 240ms, tôn trọng `prefers-reduced-motion` |
| **Bo góc** | Thẻ 1rem, nút 0,5rem. Không trộn nhiều bán kính trong một khối |

**Không dùng:** ảnh chụp học sinh cười tươi, huy chương ba chiều, hiệu ứng pháo
hoa khi hoàn thành, thanh tiến độ giả.

---

## 6. Những gì HSA365 từ chối làm

Danh sách này quan trọng hơn danh sách tính năng.

### ✕ Xếp hạng công khai giữa người học

Nó tối ưu cho việc tránh thua chứ không cho việc học. Thi đua trong HSA365 luôn là
**so với chính mình của tuần trước**.

### ✕ Chuỗi ngày gây tội lỗi

Không có thông báo kiểu "bạn sắp mất chuỗi 30 ngày!". Chuỗi là công cụ đo, không
phải công cụ ép. Hệ thống hiển thị **tỉ lệ giữ 28 ngày** bên cạnh chuỗi chính vì
lý do đó.

### ✕ Cam kết điểm số

Không hứa "đảm bảo 140 điểm". Hệ thống đưa ra **điểm dự báo có cơ sở đo lường**
kèm khoảng tin cậy, và nói rõ nó là dự báo.

### ✕ Khóa nội dung học thuật sau tường phí trong lúc người học đang làm bài

Không ngắt giữa chừng để mời nâng cấp.

### ✕ Thu thập dữ liệu học tập lên máy chủ khi không cần thiết

Kiến trúc mặc định là không có máy chủ. Nếu về sau có đồng bộ, nó phải là **tùy
chọn**, và dữ liệu vẫn xuất ra được đầy đủ.

### ✕ Dùng AI làm nguồn đúng sai

AI chỉ giảng lại theo cách khác, gợi ý, và ra thêm bài. Lời giải chính thức luôn
đến từ ngân hàng câu hỏi đã được thẩm định. Mỗi câu trả lời của AI đều kèm cảnh
báo đối chiếu.

### ✕ Trò chơi hóa che lấp việc học

Điểm kinh nghiệm chỉ cộng cho **lần cải thiện**, không cộng lại mỗi lượt — nếu
không, người học sẽ cày lại một phiếu dễ để leo cấp mà không hề tiến bộ.

---

## 7. Cách kiểm chứng nhận diện

Nhận diện chỉ có giá trị khi kiểm được. Sáu câu hỏi để rà lại mỗi khi thêm tính năng:

1. Con số mới này có dẫn tới một hành động cụ thể không?
2. Nó có nói thật kể cả khi sự thật khó nghe không?
3. Nó có làm tăng số lựa chọn cho người ở tầng thấp không?
4. Nó có gián đoạn bài thi không?
5. Nó có tạo ra so sánh giữa người học không?
6. Nó có làm tài liệu và phần mềm lệch nhau không?

Trả lời "có" cho bất kỳ câu nào từ 3 đến 6 là lý do đủ để loại bỏ tính năng đó.
