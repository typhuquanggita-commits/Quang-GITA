# ENGWILL365

**Hệ thống học tiếng Anh cá nhân hoá — từ số 0 đến IELTS 8.0 trong 36 tháng.**

> ENGlish + WILL + 365 — Tiếng Anh không phải tài năng, là Ý CHÍ nhân với 365 ngày.

Một ứng dụng web trình bày trọn vẹn một hệ thống học tiếng Anh 3 năm: lộ trình theo cột
mốc, thư viện phương pháp đã kiểm chứng, chuỗi bài giảng, bài luyện hằng ngày, bí kíp,
kiến trúc thói quen, lập trình tư duy, hệ thống câu lạc bộ và cơ chế kiểm định.

## ⚡ Chu kỳ tăng tốc 21 · 90 ngày

Lớp tăng tốc đặt **lên trên** lộ trình 36 tháng, không thay thế nó. Bốn vòng 21 ngày
cộng 6 ngày hợp nhất thành 90 ngày. Mỗi vòng chỉ tấn công **một** kỹ năng hẹp:

| Vòng | Ngày | Hứa | Cổng thoát |
|------|------|-----|------------|
| MỞ TAI | 1–21 | Tai tách được ranh giới từ | Chép chính tả 45s đạt >85% |
| BẬT PHẢN XẠ | 22–42 | 40 tình huống dưới 1,5 giây | Độ trễ trung bình <1,5s |
| DÀI HƠI | 43–63 | Nói 2 phút không sập câu | <3 từ đệm/phút |
| RA THẾ GIỚI | 64–84 | 21 nhiệm vụ thật | ≥7 nhiệm vụ với người lạ |

**Một ngày = 6 khối, 89 phút**, giãn cách từ lúc mở mắt tới trước khi ngủ: MỒI 3′ →
NẠP 20′ (lúc đi lại) → PHẢN XẠ 7′ (trưa, app đo độ trễ) → NHIỆM VỤ 5′ → ĐẦU RA 10′ →
GIEO ĐÊM 4′. Ba câu mục tiêu của ngày xuất hiện ở cả sáu khối.

> **Về "học bằng tiềm thức":** nghe khi ngủ đã bị bác bỏ — não không mã hoá ngôn ngữ
> mới trong giấc ngủ sâu. Hệ thống xây trên **năm cơ chế có bằng chứng** tạo ra đúng
> trải nghiệm "ngấm mà không phải cố": học ngầm theo thống kê · mồi ngữ cảnh · tự động
> hoá truy xuất · củng cố trong giấc ngủ (ôn *trước* khi ngủ) · giãn cách trong ngày.
> Tab Chu kỳ ghi rõ ba tuyên bố phổ biến bị loại bỏ và lý do.

## ⚠ Giọng Việt ngoại tuyến không có thanh điệu

Đây là giới hạn kỹ thuật quan trọng nhất của phần âm thanh. Ghi lại để không
ai đi lại con đường đã dò.

**Phát hiện.** Không model Piper tiếng Việt nào biểu diễn được thanh điệu. Sáu
từ `ma · mà · mả · mã · má · mạ` đi vào model như một.

**Vì sao.** Piper dùng một bảng ký hiệu IPA chung **130 ký tự cho mọi ngôn
ngữ**, và trong đó không có ký hiệu thanh điệu nào. espeak-ng *có* phiên âm
thanh điệu, mã hoá bằng chữ số:

```
"ma mà mả mã má mạ"  →  mˈaː7  mˌaː2  mˈaː4  mˈaː5  mˈaːɜ  mˈaː6
                            ↑      ↑      ↑      ↑             ↑
                        chỉ chữ số phân biệt sáu thanh — và bị loại hết
```

**Bằng chứng đo được.** 17% âm vị bị bỏ qua, trong đó 44 lần là dấu thanh.
Dựng riêng sáu từ một thanh: `mà` là thanh huyền phải **đi xuống** thì lại đi
lên 225→232 Hz; `má` là thanh sắc phải **lên gắt** thì gần như phẳng 198→200 Hz.

**Không sửa được bằng hậu kỳ.** Thông tin thanh điệu chưa từng đi vào model,
kể cả lúc huấn luyện. Không bộ lọc hay bộ chỉnh cao độ nào tạo lại được thứ
chưa bao giờ tồn tại.

**Vấn đề thứ hai.** Cả hai model tiếng Việt xuất ở **16 kHz** — mất toàn bộ
dải trên 8 kHz. Đo trên bản dựng thật: chỉ **1%** năng lượng nằm trên 8 kHz.
Model tiếng Anh là 22 kHz, nên phần tiếng Anh nghe hẳn hơn phần tiếng Việt —
chênh lệch đó không do cách trộn.

**Lối ra.**

```bash
export GOOGLE_TTS_KEY=...
node tools/make-podcast.mjs --tts google    # vi-VN-Neural2-A/D · 24 kHz · có thanh điệu
```

Hoặc `--tts gemini`, hoặc thu giọng người thật. Cả hai backend đã có sẵn trong
pipeline, chỉ cần khoá API.

```bash
python3 tools/kiem-am-viet.py    # tự kiểm chứng toàn bộ phát hiện trên
```

## 🎚 Khớp giọng mẫu

Có một giọng thật mà bạn muốn dàn giọng nghe giống? Đưa file audio vào:

```bash
python3 tools/khop-giong.py mau-giong-nu.mp3 --gioi nu
python3 tools/khop-giong.py mau-nam.m4a --gioi nam --tu 0:03 --den 0:18
```

Công cụ đo giọng mẫu rồi xếp hạng dàn giọng theo độ gần, và nói rõ khi hạng
nhất với hạng nhì sát nhau tới mức số đo không tách được.

**Cách làm, và một kết quả phản trực giác.** Bản đầu dùng ba con số — cao độ,
độ sáng phổ, biến thiên cao độ — và chỉ đúng **3/10**, gần bằng đoán mò (2/10).
Lý do đo được: cho cùng một người nói năm câu khác nhau, cao độ trung vị xê
dịch tới 27–42 Hz, trong khi cả năm giọng nữ của dàn chỉ nằm trong 20 Hz —
nhiễu lớn hơn tín hiệu.

Bản hiện tại dùng **MFCC**, mô tả hình dạng bao phổ tức là các cộng hưởng riêng
của khoang miệng và thanh quản từng người. Đo lại trên đúng phép thử cũ:
**10/10 đúng hạng nhất** (9/10 với một câu thử khác). Cao độ vẫn dùng, nhưng
đúng việc của nó: tách nam/nữ, không xếp hạng trong cùng một giới.

```bash
python3 tools/khop-giong.test.py    # tự đo lại độ chính xác
```

> Công cụ khớp **chất giọng**, không khớp **giọng vùng miền** hay ngữ điệu. Nó
> không biết một giọng có chuẩn Hà Nội hay không, cũng không biết chuẩn Anh-Anh
> hay Anh-Mỹ. Kết quả là danh sách rút gọn để bạn nghe, không phải phán quyết.

## 🎚 Dàn 10 giọng & hai chuẩn phát âm

Tuyển từ **904 giọng** bằng bộ sàng lọc âm học rồi mới nghe để chốt:

```bash
python3 tools/cast_voices.py --scan 140 --reel   # → audio/casting/audition-10-giong-anh.mp3
```

Sàng theo tần số cơ bản (nam 110–140Hz, nữ 190–215Hz — vùng giọng 20–28 tuổi), độ sáng
phổ (~1.700Hz, phụ âm rõ), biến thiên cao độ (~26, dẫn sinh động), dải động (~17dB).

Kèm **chuẩn chất giọng MC bản tin** (tốc độ, cao độ, năng lượng, độ rõ, thái độ, nhịp
nghỉ — mỗi mục có câu chỉ đạo cho người đọc) và **bảng đối chiếu Anh–Anh / Anh–Mỹ**
8 đặc điểm: rhoticity, nhóm BATH, /t/ chớp, nhóm LOT, yod-dropping, trọng âm, ngữ điệu,
từ vựng — mỗi đặc điểm ghi rõ dạy ở cấp độ nào và vì sao quan trọng.

## 📋 Bộ đề tốt nghiệp học viên

**9 bài thi**: 4 cuối vòng 21 ngày + 5 cuối tầng của tháp học tập. Mọi tiêu chí đạt
là một **con số quan sát được** — độ trễ tính bằng giây, độ chính xác tính bằng phần
trăm, số từ đệm mỗi phút, số câu không lỗi. Không có tiêu chí nào là "nói khá trôi chảy".

Mỗi bài có 4–5 phần, ghi rõ nội dung, thời lượng, ngưỡng đạt, điều kiện đậu, phương án
khi chưa đạt, và cách coi thi. Bài tốt nghiệp Tầng 5 là bài duy nhất chấm bằng **kết quả
của người khác** — người bạn kèm có lên cấp không, nhóm bạn dẫn có ai lên cấp không.

## 🏆 Kiểm định nhân sự & đào tạo tự động

**8 trục × 5 tầng bài kiểm tra × 6 vai × 5 bậc.**

Năm tầng dựng theo **tháp Miller** — chuẩn quốc tế cho đánh giá năng lực nghề:

| Tầng | Miller | Diễn được không |
|------|--------|-----------------|
| 1 · BIẾT | Knows | Học tủ được — chỉ là tầng sàng lọc |
| 2 · BIẾT CÁCH | Knows how | Khó hơn, phần giải thích lộ người chọn mò |
| 3 · PHÂN TÍCH CA | Knows how sâu | Lộ ngay ai kê cùng lộ trình cho 3 hồ sơ khác nhau |
| 4 · MÔ PHỎNG | Shows how | Không diễn được — tỉ lệ nói đo bằng máy |
| 5 · THỰC CHIẾN | Does | Chấm bằng **kết quả của người khác** |

Sáu vai — Học viên · Phụ huynh · CTV · Tư vấn · Coach · Giáo viên — mỗi vai có trọng số
trục riêng và 5 bậc năng lực. **Bậc 3 trở lên bắt buộc có tầng 4; bậc 4 trở lên bắt buộc
có tầng 5.** Không ai được cấp bậc hành nghề chỉ bằng làm bài trắc nghiệm.

**4 khoá đào tạo tự động** (CTV 12h · Tư vấn 24h · Coach 30h · Giáo viên 36h), mỗi mô-đun
có cổng chặn, và hệ thống **tự chỉ định mô-đun bù đúng trục bị trượt** thay vì bắt học
lại từ đầu.

## Tầng vận hành học viện

Bốn tab dành cho người **triển khai** hệ thống cho học viên, tách khỏi phần dành cho người học:

### 🏛 Học viện — triết lý và mô thức
- **7 nguyên lý gốc rễ** — mỗi nguyên lý có câu hỏi gốc, cách làm sai, cách làm đúng, hệ quả
- **Tháp học tập 5 tầng** — KHAI NHĨ → KHAI NHÃN → KHAI KHẨU → KHAI THỦ → KHAI ĐẠO,
  mỗi tầng ghi rõ học viên làm gì, cố vấn làm gì, và **khoảnh khắc WOW** của tầng đó
- **Mô thức GITA** 4 pha: GIEO · ĐẮM · THỬ · THĂNG — mỗi pha có vị thế cố vấn, các nước
  đi, công cụ NLP tương ứng, và điểm hỏng thường gặp
- **Vòng 11 bước chuẩn** — Niềm tin → Tư duy → Cảm xúc → Hành vi → Thói quen → Chuỗi
  thử thách → Bài học quý → Giải pháp tháo gỡ → Các bước rèn luyện → Về đích →
  Chúc mừng & Nhận thưởng. Mỗi bước có **lời thoại mẫu cho cố vấn** và sản phẩm để lại
- **10 kỹ thuật NLP** có lời thoại từng bước và cảnh báo khi dùng sai, lọc được theo pha GITA
- **4 lớp môi trường tối ưu** — vật lý, số, xã hội, thời gian, mỗi lớp có cách kiểm tra
- **Vai trò cố vấn** — 6 chuyển dịch từ "người giảng" sang "cố vấn" + 6 phác đồ xử lý
  tình huống khó (học viên bí, muốn bỏ, im lặng, đòi đốt cháy giai đoạn…)

### 🏅 25 Cấp độ
5 tầng × 5 cấp. Mỗi cấp là một **động từ học viên vừa làm được**, không phải danh hiệu
trừu tượng — BẮT SÓNG · LỌC NHIỄU · BẮT NHỊP · THẤU ÂM · NGHE THẤU · CHẠM CHỮ · LƯỚT DÒNG…
Mỗi cấp có điều kiện vào, nhiệm vụ, thử thách, tiêu chí đạt, huy hiệu và quyền mở khoá.

### 📝 Chấm bài
- **4 phần bắt buộc** sau mọi bài nộp, có **mẫu điền sẵn**: Bản nhận xét → Chiến lược
  cải thiện → Hướng dẫn khắc phục chi tiết → Bài tập thực hành nhuần nhuyễn
- **Thư viện 20 phác đồ lỗi** phổ biến của người Việt, mã hoá thống nhất (PA/GR/WR/SP/RD/LS/VO).
  Mỗi phác đồ: ví dụ sai–đúng, **nguyên nhân gốc**, chiến lược, các bước sửa, 2 bài luyện
  dưới 20 phút, và tiêu chí quan sát được để biết lỗi đã đóng
- Cam kết: phản hồi trong 48 giờ · chốt đúng **một** lỗi mục tiêu mỗi chu kỳ

### ◈ Nhận diện thương hiệu
Hệ thống nhận diện đầy đủ, **59 ấn phẩm sinh tự động từ dữ liệu**:

```bash
apt-get install -y librsvg2-bin fonts-inter
node tools/make-brand.mjs                  # 59 SVG + 59 PNG, vài giây
```

Ý tưởng lõi: **vòng tròn còn hở** — 365 ngày vẽ thành một vòng nhưng không bao giờ
khép kín, khoảng hở chính là ngày hôm nay bạn chưa học. Bên trong là năm vạch đi lên
chuyển màu hồng → tím, ứng với năm tầng của tháp học tập. Logo vì thế là bản đồ thu
nhỏ của lộ trình, không phải hình trang trí.

Gồm: 9 file logo (4 biến thể × 2 nền + favicon) · 5 huy hiệu tầng · **25 huy hiệu cấp
độ** · 6 ảnh bìa podcast 3000×3000 · **4 sơ đồ dạy học** (tháp học tập, quỹ đạo 36
tháng, sơ đồ nối âm, bảng 12 nguyên âm IPA) · 10 thẻ trích dẫn. Kèm bảng màu, thang
chữ, luật khoảng cách, luật dùng logo và brief nhiếp ảnh.

Thêm một cấp độ vào `data/levels.ts` là có thêm huy hiệu; đổi một mã màu trong
`data/brand.ts` là cả 59 file đổi theo — bộ nhận diện không bao giờ lệch khỏi nội dung.

### 🎙 Podcast — ENGWILL RADIO
**6 tập có kịch bản đầy đủ từng câu**, 5 định dạng chương trình (5 Phút Mỗi Sáng ·
Giải Mã Lỗi · Đối Thoại Cố Vấn · Lập Trình Tư Duy · Shadowing Lab).

Kịch bản là **dữ liệu**, audio là thứ dựng ra từ dữ liệu đó:

```bash
apt-get install -y ffmpeg && pip install piper-tts
bash tools/fetch-voices.sh                 # model giọng, ~235 MB, tải một lần
node tools/make-podcast.mjs --rss          # → 6 file MP3 + feed.xml, ~2 phút
```

Mặc định dùng **Piper** — TTS neural chạy ngoại tuyến, miễn phí. **Sáu vai giọng**:
Anh–Mỹ nam/nữ, Anh–Anh nam/nữ (IELTS dùng cả hai giọng nên học viên phải quen cả
hai), và hai vai tiếng Việt tách nhau bằng cao độ.

Chuỗi hậu kỳ làm bản dựng liền mạch: cắt lặng thừa piper tự chèn (nguyên nhân
chính gây rời rạc), căn lại nhịp nghỉ theo tốc độ đọc thật, nền phòng -68dB thay
im lặng tuyệt đối, EQ và nén nhẹ trước khi chuẩn hoá -16 LUFS. Khoảng lặng 15–20
giây trong bài lập trình tư duy được giữ nguyên vì đó là chủ đích.

Ba backend khác cắm được: `google` (Cloud TTS Neural2), `gemini` (Gemini TTS),
`espeak` (formant — chỉ dùng khi không tải được model piper). Output đã chuẩn hoá
-16 LUFS, có thẻ ID3, kèm RSS. Sửa một câu trong kịch bản rồi chạy lại lệnh là có
bản mới — không phải hẹn phòng thu.

### 🎥 Xưởng học liệu
**11 bản thiết kế sản xuất** — bản vẽ kỹ thuật để ê-kíp quay dựng, không phải file media:
video bài giảng, video cận miệng 44 âm IPA, bộ audio shadowing 150 đoạn, bộ chép chính tả
200 đoạn, 1.200 ảnh bối cảnh thật, 25 sổ tay cấp độ, bộ công cụ chấm bài, audio lập trình
tư duy, video chân dung học viên, 84 giáo án dẫn club, bộ ấn phẩm môi trường.
Mỗi hạng mục có cấu trúc từng phút, thông số kỹ thuật, và phần **tài sản tái sử dụng**.
Kèm **trình tự triển khai 3 giai đoạn** — mở lớp được sau 8 tuần với Tầng 1 hoàn chỉnh.

> **Hai điểm cần biết:** (1) Xưởng học liệu giao *bản thiết kế sản xuất*, không giao file
> audio/video. (2) Mô thức GITA trong `data/academy.ts` là bản dựng theo nghĩa "cố vấn dẫn
> đường" — thay hằng `GITA_PHASES` bằng mô thức thật của bạn thì toàn hệ thống cập nhật theo.

---

## Cá nhân hoá — tab **Kế hoạch của tôi**

Trả lời 13 câu (~5 phút), hệ thống tính lại lộ trình bằng **phép toán giờ học**
lấy từ chính quỹ đạo trong `data/system.ts`, không phải bằng lời động viên:

- **Cột mốc xuất phát** — theo trình độ thật, bỏ qua những mốc bạn đã vượt
- **Số giờ còn thiếu & số tháng thật sự cần** — `(giờ đích − giờ đã có) ÷ quỹ ngày`
- **Phán quyết khả thi** — Dư dả / Vừa khít / Căng / **Không khả thi**, kèm ba đòn bẩy
  có số cụ thể (tăng lên bao nhiêu phút · giãn thêm bao nhiêu tháng · mức band thực tế đạt được)
- **Nguyên mẫu người học** — chấm điểm từ 12 phát biểu hành vi, ra siêu năng lực + điểm mù
- **Phân bổ 4 trụ cột** — chỉnh theo nguyên mẫu (người đọc được đẩy Đầu ra, người
  giao tiếp được đẩy Ghi nhớ…)
- **Nhịp Ngày Đủ / Ngày Bận** — xếp vào đúng khung giờ đỉnh bạn chọn, tổng khớp
  chính xác quỹ thời gian bạn khai
- **10 việc/ngày rút gọn** theo quỹ thật (45 phút → còn 7 việc)
- **Bộ tài liệu đã lọc** theo trình độ + ngân sách + kiểu học, kèm danh sách tạm loại bỏ
- **Rủi ro riêng** — ngân sách 0đ làm hở Luật số 4, không nói to được ở nhà,
  đã bỏ dở ≥ 3 lần, mục tiêu lệch quỹ thời gian… mỗi rủi ro kèm cách bịt cụ thể

Câu trả lời lưu trong `localStorage` của trình duyệt, không gửi đi đâu.

> Bộ máy này được thiết kế để **nói thẳng**. Ví dụ thật: mất gốc + mục tiêu 8.0 +
> hạn 12 tháng + 45 phút/ngày → *"Cần khoảng 52 tháng nhưng bạn chỉ có 12 tháng —
> chênh gấp 4,3 lần. Không có phương pháp nào rút ngắn được khoảng cách này, vì
> tiếp thu ngôn ngữ bị chặn bởi số giờ tiếp xúc chứ không bởi kỹ thuật."*

---

Hệ thống có **hai tầng**. Tầng **La Bàn** trả lời *vì ai và vì sao*. Tầng
**Lộ trình** trả lời *làm gì và làm thế nào*. Thiếu tầng thứ nhất, tầng thứ hai
chỉ là một thời khoá biểu — và thời khoá biểu nào cũng bị bỏ ở tháng thứ tư.

## Tầng 1 — LA BÀN (hiến chương cá nhân, viết ở ngôi thứ nhất)

| # | Mục | Nội dung |
|---|-----|----------|
| 01 | **Tại sao** | 3 tầng lý do + quy trình khai vấn 25 phút ◆ |
| 02 | **Kết quả xuất sắc** | 5 bậc: điểm thi → năng lực thật → tài sản → bằng chứng công khai → tác động |
| 03 | **Con người tôi trở thành** | Tuyên bố bản sắc + 7 đặc tính, mỗi đặc tính có "làm gì dưới áp lực" |
| 04 | **Chiến lược** | 6 cược chiến lược, mỗi cược có đánh đổi và điều kiện chứng minh nó SAI |
| 05 | **Kế hoạch rèn luyện** | Ngày (3 phiên bản: Đủ 105′ / Bận 35′ / Tệ 2′) · Tuần · Tháng |
| 06 | **10 việc quan trọng** | 3 danh sách × 10 việc, xếp theo ưu tiên, đánh dấu bắt buộc |
| 07 | **KPI** | 10 chỉ số dẫn/trễ, mỗi chỉ số có **lằn đỏ** + 5 chỉ số cố tình KHÔNG đo |
| 08 | **Tư duy 20/80** | 7 nước đi chiếm ~80% khác biệt, mỗi cái có tình huống kích hoạt |
| 09 | **Quy tắc thành công** | 12 quy tắc, mỗi quy tắc kèm điều khoản xử lý khi lỡ |
| 10 | **Phương pháp khác biệt** | 8 điều làm khác số đông: "phần lớn người học" vs "tôi làm" |
| 11 | **Điểm mạnh của tôi** | Tự kiểm 7 câu ◆ + 6 nguyên mẫu người học, mỗi loại có siêu năng lực & điểm mù |

◆ = mục chỉ bạn mới trả lời được; hệ thống cung cấp bản nháp mạnh + quy trình để bạn thay thế.

Kết thúc bằng **Tuyên ngôn** 8 dòng — in ra, dán lên bàn học.

## Tầng 2 — LỘ TRÌNH

| Phần | Số lượng | Mô tả |
|------|----------|-------|
| **Lộ trình** | 12 cột mốc | Mỗi mốc 13 tuần, có tên riêng, một ý tưởng lớn, nhịp tuần cụ thể, cổng thoát và danh sách bẫy |
| **Phương pháp** | 28 | Từ Krashen, Ericsson, Bjork, Dweck, Clear, Arguelles, Lewis, Nation… — đã sàng lọc cho người Việt |
| **Bài giảng** | 268 bài / 10 chuỗi | Foundation · Fluency · Academic · IELTS · Mindset |
| **Luyện tập** | 31 bài luyện | Mỗi bài có mục tiêu, các bước, dấu hiệu thành công, đường nâng cấp |
| **Bí kíp** | 24 chiến thuật | Bí mật + nước đi + bằng chứng + phản mẫu |
| **Tài liệu** | 37 nguồn | Phân theo xương sống / hỗ trợ / tuỳ chọn, kèm hướng dẫn dùng ở tháng nào |
| **Thói quen** | 12 thói quen · 6 nghi thức | Tín hiệu → hành vi → phần thưởng, kèm phiên bản 2 phút |
| **Tư duy** | 10 mô-đun | Câu chuyện cũ ✕ → câu chuyện mới ✓ + nghi thức thực hành |
| **Club** | 7 câu lạc bộ | Kèm luật vận hành và kịch bản cho người dẫn |
| **Kiểm định** | 12 cổng | Không đạt thì lặp lại 4 tuần, không đi tiếp |

## Quỹ đạo

```
Tháng  0 ──── 12 ──── 24 ──── 36
Band  0.0    5.0     6.5     8.0
CEFR  Pre-A1  B1      B2+     C1+
Từ     300   3.000   6.800  10.000
Input    0h    450h  1.080h  1.800h
```

## 🎓 Đào tạo nâng cao · kèm cặp 1–1 · thang nghề coach

Bốn khoá nhập môn tạo ra **người làm được việc**. Tầng này tạo ra **người nhân
bản được năng lực đó sang người khác** — vì một học viện chỉ lớn được bằng tốc
độ đào tạo người dạy, không phải bằng tốc độ tuyển học viên.

> Không phải ai làm giỏi cũng dạy được. Đây là hai năng lực khác nhau, và hệ
> thống nói thẳng điều đó thay vì thăng chức cho người giỏi việc rồi để họ thất
> bại ở vai mới.

**Kèm cặp 1–1.** Sáu mươi phút, sáu khối. Học viên nói **35 phút**, cố vấn nói
**15 phút** — cố vấn luôn nói ít hơn, và điều đó có bài kiểm tra tự động canh.
Mỗi buổi chốt đúng **một** điều cần sửa, không bao giờ hai. Nhịp kèm giãn dần
qua 4 chặng và **có ngày kết thúc**: mục tiêu là học viên không cần cố vấn nữa.

**Thang nghề coach — 5 bậc.** Trợ giảng → Coach tập sự → Coach → Coach dẫn dắt
→ Chủ nhiệm chuyên môn. Giờ giám sát **tăng rồi giảm về 0** (bậc 1 chỉ ngồi
xem nên cần ít giám sát hơn bậc 2 là bậc bắt đầu tự dẫn), giờ tự đứng tăng đơn
điệu. Mỗi bậc ghi rõ **điều chưa được làm**, không chỉ điều được làm. Cổng lên
bậc 4 đo bằng kết quả của **người khác**: hai coach mình kèm phải lên bậc.

**Bốn khoá nâng cao bậc 4–5** cho CTV, Tư vấn, Coach, Giáo viên. Mọi bài tốt
nghiệp đều đo bằng kết quả của người khác, không đo bằng bài của chính mình.

## ⭐ Lộ trình xuất sắc

Rút 36 tháng xuống khoảng 24 — nhưng **không phải bằng cách học nhiều giờ hơn**.
Sáu khác biệt, không cái nào là tăng thời lượng, và mỗi cái đều nêu **cái giá
phải trả**:

| | Chuẩn | Xuất sắc |
|---|---|---|
| Vùng luyện | đúng ~80% | đúng ~60% — sai nhiều hơn quen |
| Độ trễ phản hồi | 24–48 giờ | vài giây tới vài phút |
| Nguồn nội dung | học liệu biên soạn | nội dung thật chưa biên tập |
| Đầu ra | nộp cho coach | công khai, có người thật đọc |
| Nhịp ôn | lịch cố định | điều chỉnh theo độ trễ đo được |
| Người đồng hành | cố vấn + CLB | đồng cấp mỗi tuần + người giỏi hơn hẳn mỗi tháng |

**Bốn điều kiện vào, không ngoại lệ** — trong đó có điều kiện *đã từng đứt
chuỗi và tự kéo mình về*: người chưa từng gãy thì chưa biết mình gãy kiểu gì.

**Bốn lối ra**, và quay về lộ trình chuẩn **không tính là thất bại** — đi hết
36 tháng vẫn hơn bỏ ở tháng 8.

```bash
npx tsx tools/kiem-dao-tao.ts   # kiểm mọi con số của tầng đào tạo
```

## 📊 Đánh giá định kỳ & kho 1.000 giải pháp

Ba nhịp đo lồng nhau, mỗi nhịp trả lời một câu hỏi khác nhau:

| Nhịp | Thời lượng | Trả lời câu hỏi | Ai chấm |
|---|---|---|---|
| **Tuần** | 15 phút | Tuần này có thật sự bỏ công không? | Chủ yếu máy |
| **21 ngày** | 45 phút | Kỹ năng hẹp đã tự động chưa? | Máy + người |
| **90 ngày** | 150 phút | Năng lực đã đổi bậc chưa? | Người, không phải người dạy mình |
| **Hành trình** | 240 phút | Có dùng được tiếng Anh trong đời thật không? | Người + việc thật |

Một người có thể qua bài tuần mà vẫn trượt bài 21 ngày. Đó không phải lỗi hệ
thống — đó chính là lý do phải có ba nhịp: **nỗ lực không tự thành kỹ năng, và
kỹ năng hẹp không tự thành năng lực.**

**Không có ô tự chấm nào ảnh hưởng tới quyết định.** Tự đánh giá là công cụ tốt
để phản tỉnh nhưng là dữ liệu tồi để ra quyết định.

**Chống học giả:** 8 luật, mỗi luật nêu rõ cách gian lận, dấu hiệu, cách kiểm
và cách xử lý. Trong đó có một mục không phải gian lận mà là bi kịch phổ biến
nhất — *cày nhiều giờ mà không tiến bộ* — và cách xử lý là đổi phương pháp chứ
không tăng giờ.

**Phần thưởng** gắn với bằng chứng khó làm giả hơn là làm thật. Huy hiệu hiếm
nhất hệ thống là **QUAY LẠI**: chỉ người từng đứt chuỗi rồi quay lại mới có.

### Kho 1.000 giải pháp

`40 triệu chứng × 25 cấp độ = 1.000 đơn kê`, sinh bằng hàm thuần.

Nói thẳng cách kho này được tạo: đây **không** phải 1.000 đoạn văn viết tay rời
rạc — đó sẽ là 1.000 đoạn na ná nhau và không ai kiểm được. Mỗi triệu chứng
được viết kỹ **một** lần (nguyên nhân gốc, việc phải làm, bài luyện, cách đo
lại), rồi đặt vào từng cấp độ: **tầng** quyết định học liệu và liều, **cấp**
quyết định ngưỡng. Cùng một triệu chứng "nghe hụt âm cuối" cần đơn khác hẳn ở
tầng 1 (đoạn 45 giây có hình) so với tầng 5 (bài giảng học thuật 8 phút).

Trợ lý AI chạy 6 bước: **THU → ĐO → CHẨN → KÊ → THEO → CHUYỂN**. Hai cửa cứng:

- Chẩn tối đa **ba** triệu chứng một lúc. Kê nhiều hơn là cách chắc chắn để
  không đơn nào được làm.
- Hai đơn liên tiếp không tác dụng thì AI **dừng kê** và giao hồ sơ cho cố vấn
  người thật. Nó không được thử đơn thứ ba — khi hai lần đều trượt, vấn đề gần
  như luôn nằm ngoài phạm vi nó nhìn thấy: sức khoẻ, công việc, gia đình, động lực.

```bash
npx tsx tools/kiem-danh-gia.ts   # kiểm kho 1.000 đơn và 4 bộ đề
```

## 📔 Hồ sơ 365 ngày

Ba trăm sáu mươi lăm ngày đã được viết sẵn: mỗi ngày một tiêu điểm, một nhiệm
vụ đời thật, một thước đo, một bằng chứng phải nộp. Người học không phải tự
nghĩ ra việc cho ngày mai — vì mỗi lần phải tự quyết định là một lần có cơ hội
trì hoãn.

| | |
|---|---|
| Cấu trúc | 4 quý × 90 ngày + 5 ngày trắng |
| Mỗi quý | 4 vòng 21 ngày + 6 ngày hợp nhất |
| Mỗi ngày | 6 khối: MỒI · NẠP · PHẢN XẠ · NHIỆM VỤ · ĐẦU RA · GIEO ĐÊM |
| Tổng thời lượng năm 1 | 286 giờ, trung bình 47 phút/ngày |
| Bài ra vòng | 16 (mỗi vòng một bài) |
| Bằng chứng phải nộp | 360 |

Toàn bộ 365 ngày được **sinh ra từ cấu trúc** bằng hàm thuần `buildYear()`
trong `data/dossier.ts`, không phải gõ tay 365 lần. Cùng đầu vào luôn cho cùng
kết quả, nên hồ sơ in ra hôm nay và hồ sơ in ra sang năm là một.

Lịch ôn theo giãn cách: mỗi ngày ôn lại các ngày cách đó 1, 3, 7, 14, 30 và 60
ngày.

## Chạy ứng dụng

**Yêu cầu:** Node.js 18+

```bash
npm install
npm run dev      # mở http://localhost:3000
```

```bash
npm run build    # dựng bản web vào dist/
npm run preview  # xem thử bản đã dựng
```

Ứng dụng chạy hoàn toàn tĩnh — không cần API key, không gọi mạng. Bản dựng
không tham chiếu tới bất kỳ tên miền bên ngoài nào; điều này được kiểm chứng
tự động bằng `npm run test:web`.

## Xuất bản web

`npm run build` sinh ra thư mục `dist/` — tải thẳng lên Netlify, Cloudflare
Pages, Vercel, hoặc bất kỳ máy chủ tĩnh nào. Tệp `dist/_headers` đã có sẵn các
tiêu đề bảo mật cho Netlify và Cloudflare Pages.

Muốn giới hạn ai xem được, phải chặn ở **tầng máy chủ** — xem
[BAOMAT.md](BAOMAT.md). Đừng đặt màn hình đăng nhập bằng JavaScript vào trang
tĩnh: đó là bảo mật giả, ai mở công cụ nhà phát triển cũng bỏ qua được.

## Xuất bản máy tính (Windows)

```bash
npm run pack:win     # dựng bản web rồi đóng gói .exe vào release/
```

Sinh ra hai tệp trong `release/`:

| Tệp | Dùng khi nào |
|---|---|
| `ENGWILL365-1.0.0-windows-x64.exe` | Bộ cài đặt — tạo lối tắt, có gỡ cài đặt |
| `ENGWILL365-1.0.0-windows-portable.exe` | Bản chạy thẳng, không cần cài |

Bản máy tính khác bản web ở một điểm: nó có **két dữ liệu mã hoá**. Lần mở đầu
tiên sẽ hỏi đặt mã khoá; hồ sơ học tập được mã hoá bằng AES-256-GCM với khoá
dẫn xuất từ mã đó bằng scrypt. Mã khoá không được lưu ở đâu cả — mất mã là mất
hồ sơ. Chi tiết trong [BAOMAT.md](BAOMAT.md).

> Đóng gói trên Linux cần `wine`. Trên Windows thì không cần gì thêm.
> Tệp cài đặt chưa được ký số nên SmartScreen sẽ cảnh báo ở lần cài đầu tiên.

## Kiểm tra tự động

```bash
npm run audit         # kiểu dữ liệu · dựng · tham chiếu chéo · chính tả tiếng Việt
npm run test:vault    # 36 phép thử két dữ liệu
npm run test:desktop  # 19 phép thử bản máy tính
npm run test:web      # kiểm tra bản web bằng trình duyệt thật
npx tsx tools/kiem-danh-gia.ts   # kiểm kho 1.000 đơn và 4 bộ đề
```

## Cấu trúc mã nguồn

```
data/                  Toàn bộ nội dung hệ thống, tách khỏi giao diện
  profile.ts           13 câu hỏi + bộ máy suy dẫn kế hoạch cá nhân (hàm thuần)
  academy.ts           Triết lý gốc rễ · tháp 5 tầng · GITA · NLP · môi trường · cố vấn
  levels.ts            25 cấp độ (5 tầng × 5 cấp)
  feedback.ts          Khung chấm bài 4 phần + thư viện 20 phác đồ lỗi
  production.ts        11 bản thiết kế sản xuất học liệu + trình tự triển khai
  podcast.ts           Engwill Radio — 5 định dạng, 6 tập, cấu hình pipeline
  brand.ts             Hệ thống nhận diện — màu, chữ, khoảng cách, luật logo
  sprint.ts            Chu kỳ 21/90 ngày + 5 cơ chế học có bằng chứng
  voices.ts            Dàn 10 giọng · chuẩn MC · đối chiếu Anh-Anh/Anh-Mỹ
  certify.ts           8 trục · 5 tầng Miller · 6 vai × 5 bậc · quy tắc chấm
  exams.ts             9 bài thi tốt nghiệp + 4 khoá đào tạo tự động
  dossier.ts           Hồ sơ 365 ngày — 4 quý, 16 vòng, sinh bằng hàm thuần
  assess.ts            4 bộ đề định kỳ · 8 luật liêm chính · 6 bậc thưởng · quy trình AI
  solutions.ts         40 triệu chứng → kho 1.000 đơn kê, sinh bằng hàm thuần
  training.ts          Kèm cặp 1–1 · 5 bậc coach · 4 khoá nâng cao · lộ trình xuất sắc
  nhip.ts              Suy ra nhịp học từ tổng giờ và số tuần

content/
  podcast-scripts.json Kịch bản podcast — nguồn dùng chung cho app và công cụ dựng

tools/
  make-podcast.mjs     Dựng MP3 + RSS từ kịch bản (piper / google / gemini / espeak)
  piper_batch.py       Sinh giọng theo lô — nạp mỗi model một lần, nhanh gấp 6
  fetch-voices.sh      Tải model giọng Piper
  make-brand.mjs       Dựng 59 ấn phẩm nhận diện (SVG + PNG) từ dữ liệu
  cast_voices.py       Sàng lọc giọng bằng âm học + dựng băng audition
  kiem-tham-chieu.py   Soi tham chiếu chéo giữa các tệp dữ liệu
  kiem-chinh-ta.py     Soi chính tả tiếng Việt trên toàn bộ văn xuôi
  kiem-ban-web.mjs     Kiểm tra bản web đã dựng bằng trình duyệt thật
  dac_trung_giong.py   Trích MFCC — đặc trưng nhận dạng giọng nói
  khop-giong.py        Khớp một giọng mẫu có thật với dàn 10 giọng
  khop-giong.test.py   Đo độ chính xác của công cụ khớp giọng
  kiem-am-viet.py      Kiểm model có biểu diễn được thanh điệu tiếng Việt không

desktop/               Bản máy tính (Electron)
  main.cjs             Tiến trình chính — cách ly, CSP, giao thức app://, 9 kênh IPC
  preload.cjs          Cầu nối duy nhất giữa trang và tiến trình chính
  vault.cjs            Két dữ liệu — scrypt + AES-256-GCM
  vault.test.cjs       36 phép thử két
  smoke.cjs            19 phép thử bản máy tính chạy trên Electron thật

brand/                 Ấn phẩm — SVG có commit, PNG dựng lại được

audio/                 Sản phẩm dựng ra, không commit — xem audio/README.md
  charter.ts           LA BÀN — 11 mục hiến chương cá nhân + tuyên ngôn
  system.ts            Hiến chương: 5 luật, 7 trụ cột, quỹ đạo, ngân sách thời gian
  roadmap.ts           12 cột mốc × 36 tháng
  methods.ts           28 phương pháp
  drills.ts            31 bài luyện
  lectures.ts          10 chuỗi bài giảng · 268 bài
  playbooks.ts         24 bí kíp
  resources.ts         37 tài liệu
  habits.ts            12 thói quen + 6 nghi thức
  mindset.ts           10 mô-đun lập trình tư duy
  clubs.ts             7 câu lạc bộ + 12 cổng kiểm định

components/engwill/    Một component cho mỗi tab
types.ts               Kiểu dữ liệu lõi
docs/ENGWILL365.md     Sổ tay vận hành — bản rút gọn để dùng hằng ngày
```

Nội dung nằm hoàn toàn trong `data/` dưới dạng dữ liệu có kiểu. Muốn cá nhân hoá lộ
trình — đổi nhịp tuần, thêm tài liệu, sửa mục tiêu — chỉ cần sửa file dữ liệu tương ứng;
giao diện tự cập nhật theo.

## Bắt đầu từ đâu

1. Mở ứng dụng, vào tab **Kế hoạch của tôi**, trả lời 13 câu (~5 phút). Trả lời
   thật, kể cả khi khó nghe — chọn trình độ hoặc quỹ thời gian cao hơn thực tế
   chỉ khiến kế hoạch sụp ở tuần thứ ba.
2. Sang tab **La Bàn**. Dành 45 phút viết cho xong **mục 01 (Tại sao)**
   và **mục 11 (Điểm mạnh)** bằng câu trả lời thật của bạn — đây là hai mục quyết
   định bạn có đi hết 3 năm hay không.
3. Đọc [`docs/ENGWILL365.md`](docs/ENGWILL365.md) — sổ tay vận hành, 10 phút.
4. Sang tab **Lộ trình**, mở đúng cột mốc xuất phát mà hệ thống đã tính cho bạn.
5. Làm đúng buổi học của ngày mai.

Hệ thống này là một bản thiết kế, không phải một lời hứa. Nó chỉ tạo ra kết quả khi được
vận hành mỗi ngày.
