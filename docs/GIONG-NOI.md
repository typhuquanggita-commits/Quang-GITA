# Chọn nguồn giọng cho ENGWIN365

Tài liệu này trả lời một câu hỏi: **lấy giọng ở đâu để phần audio tiếng Việt đạt
mức tốt nhất có thể trên thế giới hiện nay** — và trả lời bằng số đo, không bằng
lời quảng cáo của nhà cung cấp.

---

## 1. Vấn đề hiện tại, đo bằng số

Sáu tập podcast trong `audio/` đang dựng bằng Piper. Người nghe bản ngữ nhận xét
là "không chuẩn" dù từng âm tiết nghe rõ. Hai phép đo độc lập cho cùng một kết luận.

**Phép đo thứ nhất — soi đầu vào của model** (`tools/kiem-am-viet.py`):
espeak-ng phiên âm tiếng Việt CÓ kèm thanh điệu, mã bằng chữ số. Bản đồ âm vị
của Piper là bảng IPA dùng chung cho mọi ngôn ngữ, 130 ký hiệu, **không có một
ký hiệu thanh điệu nào**. Mọi chữ số bị loại bỏ im lặng trước khi vào model —
kể cả lúc huấn luyện. Model chưa bao giờ nhìn thấy thanh điệu.

**Phép đo thứ hai — soi đầu ra trên sóng âm** (`tools/do-thanh-dieu.py`):
đọc sáu âm tiết chỉ khác nhau ở thanh — `ma mà mả mã má mạ` — rồi đo khoảng
cách giữa sáu đường cao độ.

| Nguồn | Tách trung bình | Cặp gần nhất | Hướng đúng |
|---|---|---|---|
| Piper `vi-25hours-single-low` | 2,25 nửa cung | **0,16** nửa cung | 2/6 |
| Piper `vi-vivos-x-low` | 3,24 nửa cung | 1,16 nửa cung | 2/6 |

Hai con số cần đọc kỹ:

- **Cặp gần nhất 0,16 nửa cung** — hai thanh khác nghĩa nằm cách nhau một phần
  sáu của một nửa cung. Tai người không tách nổi. Đó là lý do người nghe thấy sai
  mà không chỉ ra được sai chỗ nào.
- **Hướng đúng 2/6** — đoán mò giữa ba hướng (lên, xuống, phẳng) cũng ra khoảng
  2/6. Tức là hướng cao độ ở đây **không mang thông tin gì**. Cả sáu âm tiết của
  model 25hours đều đi lên hoặc phẳng; không có âm nào đi xuống, trong khi tiếng
  Việt có ba thanh phải đi xuống.

Bộ đo tự kiểm trước khi đo (`--tu-kiem`) bằng ba tín hiệu có cao độ biết trước;
nó báo thiếu 0,65 nửa cung trên một đường trượt 7,02 nửa cung. Sai số ấy lệch về
phía **an toàn**: nó làm nhỏ độ tách chứ không làm to, nên không thể tạo ra kết
luận "có thanh điệu" giả.

**Kết luận: không sửa được bằng hậu kỳ.** Không có bộ lọc, bộ nén hay phép cân
bằng nào tạo lại được thông tin chưa từng đi vào model. Phải đổi nguồn.

---

## 2. Bốn nhóm phương án

### Nhóm A — Thu giọng người thật

Vẫn là mức tốt nhất thế giới, và không có nhóm nào dưới đây thay được hoàn toàn.

| | |
|---|---|
| **Được** | Không có vấn đề thanh điệu. Có cảm xúc thật, có hơi thở, có chỗ ngập ngừng đúng lúc. Giọng trở thành tài sản thương hiệu — học viên nhớ người dẫn, không nhớ "một giọng máy dễ nghe". |
| **Mất** | Tốn tiền và tốn lịch. Sửa một câu trong kịch bản là phải hẹn thu lại. |
| **Giá tham khảo** | Phát thanh viên chuyên nghiệp tại Việt Nam: khoảng 300.000–800.000 đ mỗi phút thành phẩm, hoặc trọn gói theo buổi. Sáu tập hiện tại khoảng 60 phút. |
| **Hợp với** | Phần **cố định** của sản phẩm: nhạc hiệu, lời chào, sáu tập podcast lõi, video giới thiệu. |

### Nhóm B — Nhà cung cấp chuyên tiếng Việt

FPT.AI, Vbee, Zalo AI, Viettel AI. Model huấn luyện riêng cho tiếng Việt.

| | |
|---|---|
| **Được** | Thanh điệu đúng vì model sinh ra để làm việc đó. Có giọng Bắc, Trung, Nam. Quan trọng không kém: họ xử lý **chuẩn hoá văn bản tiếng Việt** — số, ngày tháng, viết tắt, tên riêng nước ngoài — chỗ mà mọi máy đọc đa ngữ đều vấp. "IELTS 6.5" hay "band 7.0" đọc sai là hỏng cả câu trong một sản phẩm dạy tiếng Anh. |
| **Mất** | Phải trả tiền theo lượt gọi và phải gửi văn bản ra ngoài. Giọng vẫn là giọng máy. |
| **Giá tham khảo** | FPT.AI tính theo lượt gọi; Vbee có gói thuê bao từ khoảng 6 USD/tháng. Cả hai đều có bản dùng thử. |
| **Hợp với** | Phần **thay đổi thường xuyên**: bài giảng mới, phản hồi cá nhân hoá, nội dung sinh theo từng học viên. |

### Nhóm C — Nhà cung cấp toàn cầu

Google Cloud TTS (`vi-VN-Neural2-A/D`, và dòng Chirp 3: HD nay đã có tiếng Việt),
Microsoft Azure, ElevenLabs.

| | |
|---|---|
| **Được** | Hạ tầng ổn định, tài liệu tốt, SSML đầy đủ — điều khiển được tốc độ và chỗ ngắt, thứ **bắt buộc phải có** cho phần shadowing vì học viên đọc đuổi theo. Đường vào đã có sẵn trong kho mã: `node tools/make-podcast.mjs --tts google`. |
| **Mất** | Model đa ngữ nên tiếng Việt là một trong hàng trăm ngôn ngữ, không phải trọng tâm. Chuẩn hoá văn bản tiếng Việt yếu hơn nhóm B. |
| **Hợp với** | Phần **tiếng Anh** — đây mới là chỗ nhóm này mạnh nhất, và cũng là giọng mẫu học viên bắt chước. |

### Nhóm D — Mã nguồn mở, chạy ngoại tuyến

VieNeu-TTS, F5-TTS-Vietnamese, VietTTS.

| | |
|---|---|
| **Được** | Miễn phí, **chạy hẳn trên máy** — hợp đúng với cam kết "không gọi ra Internet" của bản máy tính. VieNeu-TTS v3-Turbo: giấy phép Apache-2.0, âm 48 kHz, chạy bằng ONNX trên CPU không cần PyTorch, 20 giọng dựng sẵn ba miền, nhân bản giọng từ mẫu 3–8 giây. Vì là model sinh riêng cho tiếng Việt nên thanh điệu nằm trong model, không bị rơi như Piper. |
| **Mất** | Phải tự vận hành. Chất lượng nhích lên từng bản, không có cam kết dịch vụ. |
| **Hợp với** | Sinh audio **theo yêu cầu ngay trên máy học viên**: đọc câu học viên vừa viết, đọc lại lỗi vừa mắc — thứ không thể gọi ra máy chủ cho từng lượt. |

**Đã kiểm được tới đâu trong phiên này:** gói `vieneu` 3.3.0 cài thành công vào
môi trường ảo (kéo theo `onnxruntime` và `sea-g2p` — bộ chuyển chữ sang âm cho
tiếng Đông Nam Á, chính là chỗ giữ thanh điệu). **Chưa chạy sinh audio được**,
vì `huggingface.co` bị chính sách mạng của tổ chức chặn ở tầng proxy (403 khi
CONNECT). Cần chạy trên máy có đường ra tới HuggingFace, rồi đo lại bằng
`tools/do-thanh-dieu.py` trước khi đưa vào sản phẩm.

---

## 3. Khuyến nghị

Không có một nguồn nào tối ưu cho mọi phần. Chia theo việc:

| Phần của sản phẩm | Nguồn | Lý do |
|---|---|---|
| Sáu tập podcast lõi, nhạc hiệu, lời chào | **Người thật** | Đây là giọng thương hiệu, nghe hàng nghìn lần. Đáng tiền. |
| Giọng mẫu tiếng Anh cho shadowing | **Google hoặc Azure**, giọng neural | Cần SSML để hạ tốc độ đúng 8% như chuẩn hiện tại, và cần cả giọng Anh–Mỹ lẫn Anh–Anh vì đề IELTS dùng cả hai. |
| Bài giảng tiếng Việt sinh thường xuyên | **FPT.AI hoặc Vbee** | Thanh điệu đúng, và chuẩn hoá được "IELTS 6.5", "band 7.0", "Task 2". |
| Đọc theo yêu cầu trên máy học viên | **VieNeu-TTS** | Ngoại tuyến, miễn phí, không phá cam kết không gọi ra Internet. |

**Việc phải làm trước tiên, và rẻ nhất:** thu **một** bản `ma mà mả mã má mạ`
bằng giọng người thật, rồi chạy `tools/do-thanh-dieu.py`. Con số đó là mốc chuẩn
để hiệu chuẩn ngưỡng đạt, và từ đó mọi nguồn ứng viên đều chấm được trên cùng
một thước. Hiện ngưỡng chỉ khẳng định được một chiều: dưới 1,5 nửa cung là chắc
chắn không có thanh điệu.

---

## 4. Cách chấm một nguồn ứng viên

```bash
# 1. Kiểm chính bộ đo trước, luôn luôn
python3 tools/do-thanh-dieu.py --tu-kiem

# 2. Nhờ nguồn ứng viên đọc sáu âm tiết, thu rời từng file
#    theo đúng thứ tự: ma  mà  mả  mã  má  mạ
python3 tools/do-thanh-dieu.py --rieng --ten "FPT.AI giọng Bắc nữ" \
    ung-vien/1.wav ung-vien/2.wav ung-vien/3.wav \
    ung-vien/4.wav ung-vien/5.wav ung-vien/6.wav

# 3. Xếp hạng nhiều nguồn cạnh nhau
python3 tools/do-thanh-dieu.py --so-sanh a.wav b.wav c.wav

# 4. Chấm cả bản dựng theo chuẩn dẫn: tốc độ, ngắt nghỉ, năng lượng
python3 tools/do-chuan-dan.py audio/ep01-*.mp3 --gioi nam
```

Đọc kết quả theo đúng thứ tự này: **tách trung bình** cho biết sáu thanh có tách
nhau không; **cặp gần nhất** cho biết cặp nào dễ nghe nhầm nhất — số này quan
trọng hơn số trung bình, vì một cặp trùng là một cặp từ mất nghĩa; **hướng đúng**
cho biết model có đi đúng chiều của từng thanh không.

---

## 5. Hai việc còn nợ

1. **Sáu tập podcast vẫn xưng "Engwin Radio" theo tên cũ và vẫn thiếu thanh
   điệu.** Chúng phải dựng lại sau khi chốt nguồn, không vá được.
2. **Ngưỡng đạt chưa hiệu chuẩn.** Cần một bản thu người thật để đặt mốc trên.
