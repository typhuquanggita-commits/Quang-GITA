<div align="center">

# SAT365

**Nền tảng luyện thi Digital SAT theo chuẩn quốc tế — tích hợp mô thức huấn luyện GITA**

*A Digital SAT preparation and assessment platform, built to the published test
specification, with the GITA training model woven through it.*

</div>

---

## Điều làm nên khác biệt / What makes this different

Phần lớn nền tảng luyện SAT là ngân hàng câu hỏi có đồng hồ đếm ngược. SAT365
khác ở ba điểm, và cả ba đều kiểm chứng được:

Most SAT platforms are a question bank with a countdown. SAT365 differs in
three ways, and all three are verifiable:

**1. Điểm số được sản sinh bằng tâm trắc học thật.**
Không có bảng tra điểm thô. Năng lực được ước lượng bằng mô hình IRT hai tham
số qua phương pháp EAP, rồi quy đổi tuyến tính sang thang 200–800. Đây là lý
do một bài thi thích ứng có thể chấm điểm một cách có căn cứ — 20 câu đúng ở
nhánh khó và 20 câu đúng ở nhánh dễ không phải là cùng một năng lực.

*Scores come from real psychometrics.* No raw-score lookup table. Ability is
estimated under a 2PL IRT model via EAP, then transformed onto the reported
scale. This is what makes an adaptive test defensibly scorable.

**2. Trình thi dựng theo đúng quy trình vận hành.**
Hai module thích ứng mỗi phần, định tuyến sau module 1, nghỉ 10 phút, câu
field-test không tính điểm, máy tính đồ thị, bảng công thức, đánh dấu xem lại,
loại phương án, highlight bài đọc. Đồng hồ là mốc thời gian tuyệt đối — đóng
tab rồi quay lại không được thêm giờ.

*The exam player follows the operational workflow*, down to the module clock
being an absolute timestamp rather than a countdown in memory.

**3. Mô thức GITA đo cả con người, không chỉ điểm số.**
Bốn trụ — Mục tiêu, Nội lực, Tài năng, Hành động — được chấm từ hành vi nền
tảng đã quan sát được, không phải từ bảng hỏi. Kèm năm tầng hấp thu, ba đấu
trường ứng dụng (gia đình – trường học – xã hội), và thang cấp chuyên môn cho
tư vấn viên, giáo viên và huấn luyện viên.

*The GITA training model* scores four pillars from observed behaviour, gates
delivery by absorption tier, and transfers the method into family, school, and
society. See [docs/gita/README.md](docs/gita/README.md).

---

## Chạy thử / Running it

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # typecheck, then production build
npm run preview   # serve the build
npm test          # 109 engine unit tests
npm run typecheck # types only
```

Không cần khoá API, không cần máy chủ, không cần cấu hình. Toàn bộ dữ liệu học
tập nằm trên chính thiết bị.

No API key, no backend, no configuration. All learner data stays on the device.

---

## Bên trong / What is here

### Assessment engine

| | |
| --- | --- |
| **IRT 2PL + EAP** | Ước lượng năng lực hữu hạn cho cả bài làm đúng hết và sai hết — nơi phương pháp hợp lý cực đại phân kỳ |
| **Thang 400–1600** | Quy đổi 200–800 mỗi phần, làm tròn chục, có sai số chuẩn báo cáo kèm |
| **Lắp ráp đề tại chỗ** | Đúng trọng số lĩnh vực, tỉ lệ độ khó, kích thước module, vị trí câu field-test |
| **Định tuyến hai giai đoạn** | Module 2 chọn theo năng lực đo từ module 1; nhánh dễ giới hạn trần điểm |
| **Chọn câu theo Fisher information** | Cân bằng nội dung và kiểm soát phơi nhiễm cho phần luyện tập |
| **SM-2 có sửa đổi** | Quên một thẻ làm ngắn khoảng lặp chứ không đặt lại về 0 |
| **Phân loại lỗi** | Tách hổng kiến thức, bất cẩn, và vội — ba loại cần ba cách chữa khác nhau |

### Delivery

Trình thi chuẩn Bluebook · máy tính đồ thị tự viết parser · bảng công thức ·
highlight theo offset ký tự · điều hướng câu hỏi · màn nghỉ · nhật ký tính
toàn vẹn ghi đúng những gì trình duyệt quan sát được, không hơn.

### Content

166 câu hỏi phân loại theo blueprint chính thức, mỗi câu có lời giải và phân
tích từng phương án nhiễu · bộ sinh câu toán tham số hoá với đáp án tính bằng
code, mọi lượt sinh đều được kiểm chứng · 60 từ vựng học thuật.

### Access control

Ba vai trò, bốn cấp giáo viên tích luỹ, phạm vi theo lớp, nhật ký kiểm toán,
và năm cấp độ học sinh mở khoá nội dung mà **không bao giờ** cấp thêm quyền.

### GITA

Bốn trụ chấm từ bằng chứng · năm tầng hấp thu có cổng · ba đấu trường với nghi
thức và chỉ báo · thư viện thói quen theo quy tắc 20/80 · sổ tay coach phân
theo cấp chuyên môn.

---

## Tài liệu / Documentation

Bắt đầu từ [docs/README.md](docs/README.md). Mỗi tài liệu trả lời một câu hỏi
và ghi rõ nó dành cho ai.

| | |
| --- | --- |
| [SPEC](docs/SPEC.md) | SAT365 tái hiện gì, và cố ý khác ở đâu |
| [PSYCHOMETRICS](docs/PSYCHOMETRICS.md) | Điểm được sản sinh thế nào, và cần gì để dùng được trong vận hành thật |
| [ARCHITECTURE](docs/ARCHITECTURE.md) | Hệ thống được ghép ra sao, và vì sao chọn cách đó |
| [ACCESSIBILITY](docs/ACCESSIBILITY.md) | Chuẩn trợ năng đạt được và cách kiểm chứng |
| [SECURITY](docs/SECURITY.md) | Tính toàn vẹn bài thi bảo đảm được gì — và không bảo đảm được gì |
| [ROLES](docs/ROLES.md) | Ai được làm gì, và cấp độ được *giành* chứ không được *gán* |
| [CONTENT](docs/CONTENT.md) | Quy trình soạn, duyệt và chấp nhận một câu hỏi |
| [GITA](docs/gita/README.md) | Mô thức huấn luyện, đầy đủ bảy tài liệu |

---

## Giới hạn cần biết trước / Limits, stated plainly

Đây là những điều một người cân nhắc dùng hệ thống này xứng đáng được biết
trước, không phải sau:

- **Tham số IRT là giá trị tạm do người soạn gán, chưa hiệu chuẩn.** Đủ để
  vận hành và kiểm thử toàn bộ cỗ máy chấm điểm; chưa đủ để báo cáo một điểm
  số mà ai đó nên hành động dựa vào. Quy trình thay thế nằm trong
  [PSYCHOMETRICS](docs/PSYCHOMETRICS.md).
- **Ngân hàng 166 câu đủ cho một lượt thi full-length**, nhưng vận hành thật
  cần vài trăm câu mỗi phần để kiểm soát phơi nhiễm.
- **Phân quyền và giám sát chạy phía trình duyệt.** Đúng cho một công cụ học
  cá nhân; không đủ cho tuyển sinh, xếp lớp hay cấp chứng chỉ. Chi tiết trong
  [SECURITY](docs/SECURITY.md).
- **SAT365 không phải là SAT** và không liên kết với College Board. Điểm báo
  cáo là ước lượng từ ngân hàng của chính nền tảng này.

---

## Kiểm thử / Verification

```
109 unit tests   engine tâm trắc học, lắp ráp đề, phân quyền, GITA
 55 browser checks  onboarding, mọi tuyến, đổi vai trò, phòng thi, máy tính, GITA
```

Kiểm thử trình duyệt chạy trên bản build thật qua Playwright và yêu cầu console
sạch tuyệt đối.

---

<div align="center">
<sub>Apache-2.0</sub>
</div>
