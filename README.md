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

**3. Hệ thống huấn luyện tự động, và nó giải thích được mọi quyết định.**
Mỗi ngày, engine đọc toàn bộ dữ liệu của người học và xếp sẵn buổi học: từng
khối cụ thể, đúng thứ tự, câu hỏi đã chọn xong. Người học mở lên là làm được
ngay. Quan trọng hơn: mọi khối đều truy được về một luật, và mọi luật khi kích
hoạt đều ghi lại chính xác dữ liệu nào đã kích hoạt nó. Hệ thống cũng biết khi
nào phải dừng lại và gọi người thật — bỏ học kéo dài, kết quả đi xuống dù vẫn
nỗ lực, mục tiêu vượt quá quỹ thời gian.

*A 100% automated coach that can always explain itself.* Every block traces to
a rule; every rule records the evidence that fired it. It refuses to prescribe
past what it knows, and it escalates rather than quietly issuing homework to a
learner in trouble. See [docs/AUTOPILOT.md](docs/AUTOPILOT.md).

**4. Mô thức GITA đo cả con người, không chỉ điểm số.**
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
| **Hiệu chuẩn MMLE-EM** | Ước lượng tham số câu hỏi từ dữ liệu thật, kèm thống kê fit, sàng lọc DIF và liên kết thang đo |

### Delivery

Trình thi chuẩn Bluebook · máy tính đồ thị tự viết parser · bảng công thức ·
highlight theo offset ký tự · điều hướng câu hỏi · màn nghỉ · nhật ký tính
toàn vẹn ghi đúng những gì trình duyệt quan sát được, không hơn.

### Content

166 câu hỏi phân loại theo blueprint chính thức, mỗi câu có lời giải và phân
tích từng phương án nhiễu · bộ sinh câu toán tham số hoá với đáp án tính bằng
code, mọi lượt sinh đều được kiểm chứng · 60 từ vựng học thuật.

### Automated coaching

21 luật can thiệp có thứ tự ưu tiên · chương trình học mỗi ngày với ngân sách
thời gian theo mức tải · nhật ký quyết định trưng bằng chứng · leo thang định
tuyến theo cấp chuyên môn người xử lý.

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
| [AUTOPILOT](docs/AUTOPILOT.md) | Hệ tự động quyết định thế nào, và cách kiểm toán một quyết định |
| [GITA](docs/gita/README.md) | Mô thức huấn luyện, đầy đủ bảy tài liệu |

---

## Giới hạn cần biết trước / Limits, stated plainly

Đây là những điều một người cân nhắc dùng hệ thống này xứng đáng được biết
trước, không phải sau:

- **Tham số IRT là giá trị tạm do người soạn gán, chưa hiệu chuẩn.** Cỗ máy
  thay thế chúng đã có sẵn trong `src/engine/calibration.ts` và đã được kiểm
  chứng bằng bài toán phục hồi tham số; thứ còn thiếu là dữ liệu bài làm thật,
  không phải mã nguồn. Quy trình đầy đủ nằm trong
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
167 unit tests      tâm trắc học, lắp ráp đề, hiệu chuẩn, phân quyền, GITA, autopilot
 51 browser checks  onboarding, mọi tuyến, đổi vai trò, phòng thi, máy tính, GITA
  1 bank check      bất biến cấu trúc và độ sâu của ngân hàng câu hỏi
```

```bash
npm test             # unit
npm run check:bank   # ngân hàng câu hỏi
npm run test:browser # trên bản build thật
```

Kiểm thử trình duyệt chạy trên bản build thật qua Playwright và coi bất kỳ lỗi
console nào là thất bại. CI chạy cả ba trên mỗi lần push.

---

<div align="center">
<sub>Apache-2.0</sub>
</div>
