# ENGWIN365

**Hệ thống học tiếng Anh cá nhân hoá — từ số 0 đến IELTS 8.0 trong 36 tháng.**

> ENGlish + WIN + 365 — Tiếng Anh không phải tài năng, là 365 lần THẮNG chính mình.

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

### 🎙 Podcast — ENGWIN RADIO
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
| **Tài liệu** | 45 nguồn | Phân theo xương sống / hỗ trợ / tuỳ chọn, kèm hướng dẫn dùng ở tháng nào |
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

## 🔍 Chống rỗng ruột và khai khống

Hai dạng rỗng ruột nguy hiểm nhất trong một hệ thống lớn, và cách hệ này chặn:

**Khai khống** — app tự khai một con số mà dữ liệu không có. Người dùng tin vào
con số đó nên không ai kiểm bằng mắt: con số nào cũng trông hợp lý. Thanh điều
hướng từng ghi *"37 nguồn đã sàng lọc"* trong khi kho có **45**.

**Mục có vỏ mà không có ruột** — 268 bài giảng từng chỉ có tiêu đề và kết quả,
trung bình **15 chữ mỗi bài**, và **235/268 bài không nối bài luyện nào**: học
xong không biết phải làm gì. Nay cả 268 bài đều có bài luyện đúng chủ đề, nêu rõ
**bẫy thường gặp tại đúng điểm đó**, và 138 bài kèm mã phác đồ lỗi.

```bash
npm run test:so    # đối chiếu mọi con số app tự khai với dữ liệu thật
```

Bài kiểm này canh bốn thứ: mọi con số trong thanh điều hướng khớp dữ liệu; mọi
chuỗi bài giảng khai đúng số bài; mọi bài giảng có bài luyện hợp lệ và nêu bẫy;
không mảng nào rỗng, không trường nội dung nào trống. Nó cũng tự phát hiện khi
chính luật kiểm của nó đã lỗi thời — luật không còn khớp nhãn tab nào thì báo
hỏng, vì bảng kiểm chết là bảng không kiểm gì cả.

## 🔀 Hai tuyến, một động cơ

Hệ thống chở **hai lộ trình khác nhau**, và trước bản này chúng nằm lẫn trong cùng
một dãy tab — gia đình mở app lên không biết mục nào là của con mình. Tab **Hai
tuyến** tách chúng ra, và thanh bên có bộ lọc **Tuyến của tôi** ẩn hẳn những mục
không thuộc tuyến đã chọn.

| | 🎯 Tuyến IELTS 8.0 | 🏛 Tuyến chuyên Anh vào 10 |
|---|---|---|
| Đích | Band 8.0, không kỹ năng nào dưới 7.0 | Đỗ chuyên, biên an toàn 0,5–1,0 điểm, bài chuyên từ 7,0 |
| Thời lượng | 36 tháng | 22 tháng |
| Cách đo | **Tuyệt đối** — band không phụ thuộc thí sinh khác | **Tương đối** — phải vượt điểm chuẩn do thí sinh khác đẩy lên |
| Thi lại | Không giới hạn | **Một lần duy nhất** |
| Nói | Chiếm ¼ điểm, phỏng vấn 11–14 phút | Không có trong đề viết của Sở |
| Ngữ pháp | Không hỏi riêng, chấm gián tiếp | Khối lớn nhất: 25 câu, trọng số 2,9 |
| Lõi ngày | 55 phút, giữ nguyên suốt 36 tháng | 60 / 70 / 90 phút theo bậc đầu vào |
| Bậc thang | 25 cấp trong 5 tầng | 7 cấp |

**Khác biệt sâu nhất không nằm ở đề thi mà ở cách đo.** IELTS thi lại được, nên tối
ưu cho *đỉnh*. Chuyên có đúng một ngày, nên tối ưu cho *biên an toàn và độ ổn định*
— thà 7,2 ở cả ba đề còn hơn 8,0 rồi 6,0, vì ngày thi có thể rơi vào đề thứ hai.
Mọi khác biệt còn lại chảy ra từ đó, và bảng phân kỳ trong app liệt kê đủ **10 trục**.

**Bảy phần lõi hai tuyến làm giống hệt nhau** — chuỗi ngày, bảng IPA, học theo cụm,
ôn giãn cách, nghe có nhiệm vụ, sổ lỗi, và luật "chưa đủ nền thì chưa vào đề". Đây
là lý do đổi tuyến ở tháng 12 **không mất năm đầu**, chỉ đổi phần trên.

**Sáu kiểu lẫn tuyến, mỗi kiểu kèm cái giá tính được.** Ví dụ đắt nhất: học sinh
tuyến chuyên luyện Writing Task 2 kiểu IELTS, viết bốn đoạn trong khối viết 30 phút
vốn đã gánh 16 câu biến đổi câu — bỏ trống đúng phần cho điểm chắc nhất, mất 1,0–1,5
điểm. Ngược lại, người tuyến IELTS cày trắc nghiệm ngữ pháp 40 câu trong khi IELTS
không có phần hỏi ngữ pháp riêng. Cảnh báo phủ **cả hai chiều**, không thiên vị tuyến nào.

### Phần tinh tuý — lọc từ dữ liệu, không chọn bằng cảm tính

Mỗi tuyến có một bản rút gọn: bản một trang, **lõi ngày** không được cắt, **đòn bẩy**,
**việc phải cắt bỏ**, và **chặn đường** — những mốc phải dừng lại trả lời thật.

Phần lọc không viết tay:

- **Đòn bẩy tuyến chuyên** lấy nguyên 9 phác đồ nâng cấp trong hệ thống, sắp theo số
  tuần tăng dần — còn ít thời gian thì làm từ trên xuống. Rẻ nhất là quy tắc trọng âm
  theo hậu tố (2 tuần) và đổi thứ tự làm bài phần viết (2 tuần).
- **Xương sống tuyến IELTS** đếm tần suất bài luyện qua 12 mùa: `d-errorreview` và
  `d-task2` có mặt ở 7 mùa, `d-anki` 6 mùa. Nhưng tần suất đo *độ trải*, không đo độ
  quan trọng — `d-phonics` chỉ xuất hiện một mùa mà bỏ thì hỏng cả ba năm, nên phần
  đòn bẩy lấy cả hai loại và nói rõ vì sao.
- **Lõi ngày tuyến chuyên** tính ra từ nhịp của từng bậc: ba khối cố định 40 phút, toàn
  bộ chênh lệch dồn vào một khối theo giai đoạn. Tổng luôn khớp đúng 60/70/90/60 phút
  của bốn bậc, không thể lệch khi ai đó sửa số ở một chỗ.

`npx tsx tools/kiem-tuyen.ts` đối chiếu bản đồ tab với thanh điều hướng thật trong
`App.tsx` theo cả hai chiều, kiểm mọi mã bài luyện được nhắc tới có thật, và soát các
con số viết trong văn xuôi so với số tính được từ dữ liệu đề — "25 câu", "trọng số
2,9", "16 câu biến đổi câu", "30 trên 50 điểm xét tuyển". Lệch một chỗ là hỏng.

## 🧭 Bốn chữ G · I · T · A

Bốn chữ theo **định nghĩa gốc của học viện**, giữ nguyên **31 thành tố**, không rút gọn
và không diễn giải lại:

| Chữ | | Thành tố |
|---|---|---|
| **G** | Goal — HỆ THỐNG MỤC TIÊU | Hệ thống mục tiêu · Kết quả xuất sắc · Đích đến của quá trình học tập rèn luyện |
| **I** | Inspirits — NỘI LỰC VÀ KHÁT KHAO | Động lực · Khát khao · Đam mê · Mong muốn · Nội lực · Sự khác biệt · Niềm tin · Bản lĩnh |
| **T** | Talent — TÀI NĂNG VÀ THẾ MẠNH | Tài năng · Điểm mạnh · Sở trường · Tư duy xuất sắc · Sự khác biệt · Tốc độ · Tập trung · Khả năng vượt trội · Định hướng xuất sắc |
| **A** | Action/Academy — HÀNH ĐỘNG VÀ MÔI TRƯỜNG | Quyết đoán · Kiên trì · Sáng tạo · Chăm chỉ · Cẩn thận · Tối ưu · Lộ trình theo thói quen thành công · Cấp độ hành động 20/80 · Môi trường thi đua · Nhóm bạn xuất sắc teamwork · Học tập gắn phát triển bản thân |

**Phân biệt hai trục, vì rất dễ lẫn.** Bốn **CHỮ** chạy **song song** suốt hành trình —
không chữ nào xong trước chữ nào. Bốn **PHA** của 12 bước (HIỂU MÌNH · RÈN MÌNH · BỨT
PHÁ · TRƯỞNG THÀNH) đi **tuần tự** theo thời gian. Ở pha nào cũng có đủ bốn chữ, chỉ
khác trọng số. Có bài kiểm ép hai trục không được lẫn vào nhau.

Mỗi chữ ghi cả **dấu hiệu khi CÓ** lẫn **dấu hiệu khi THIẾU** — không có hai dấu hiệu
này thì cả bảng chỉ là khẩu hiệu — cộng cách đo và ít nhất ba chỗ nó nối vào hệ thống.

**Bốn cấp hành động theo 20/80:** LÀM ĐỦ (100% công sức → 40% kết quả) → LÀM ĐÚNG CHỖ
(60% → 70%) → LÀM SỚM (60% → 85%) → LÀM CÙNG NGƯỜI KHÁC (70% → 100%). Kèm lời nói thẳng:
*hai mươi và tám mươi là cách nói, không phải kết quả đo; cái đúng là nguyên tắc, không
phải con số.*

**Năm luật thiết kế môi trường:** thi đua với chính mình trước · nhóm bốn người không
nhóm mười · ghép lệch một bậc không ghép ngang · sai công khai được phép · mỗi tuần một
sản phẩm ra ngoài nhóm.

## 🏡 GITA hoá ba sân — 36 ô

Một học sinh sống ba nơi. Mô thức chỉ chạy ở lớp thì hai nơi còn lại vẫn theo luật cũ,
và em phải đổi người mỗi lần bước qua cửa — **chính chỗ đổi người đó là nơi phần lớn
tiến bộ bị mất.**

**12 bước × 3 sân (gia đình · trường học · xã hội) = 36 ô.** Mỗi ô nói bốn thứ: bước ấy
trông như thế nào ở sân đó, người lớn làm gì, học sinh làm gì, và **hai dấu hiệu** để
biết nó đang chạy hay đang hỏng. 36 dấu hiệu hỏng đều khác nhau, có bài kiểm ép điều đó.

**Nói thẳng:** học viện *không kiểm soát được* sân gia đình và sân xã hội. Bảng này là
thứ **đề nghị**, không phải thứ bắt buộc — nên mỗi ô viết ở dạng một việc làm được trong
một tuần, chứ không phải một triết lý cần tin.

**5 tầng hấp thu của khách hàng × 6 cấp chuyên môn của người phục vụ.** Mỗi tầng ghi rõ
nhận gì, chiều sâu tới đâu, đo bằng gì, và **chưa hợp với gì**. Mỗi cấp chuyên môn ghi
rõ giao được tới tầng nào, làm được gì, **chưa làm được gì**, và nâng cấp bằng bằng chứng
nào.

## 🏅 Đối chiếu chuẩn quốc tế — 16 chuẩn

"Chất lượng quốc tế" là một câu nói, không phải một bằng chứng. Bảng này đổi câu nói ấy
thành thứ kiểm được: **16 chuẩn có tên, có nguồn**, mỗi chuẩn một kết luận thẳng kèm bằng
chứng và kèm phần còn thiếu.

| | Chuẩn |
|---|---|
| **Đạt (9)** | WCAG 2.1 AA · CEFR · Bloom sửa đổi · Kim tự tháp Miller · Thiết kế ngược (UbD) · Học theo mức thành thạo · Luyện tập có chủ đích · Nhớ chủ động & ôn giãn cách · Dựng bản phát hành kiểm chứng được |
| **Đạt một phần (6)** | Section 508 / ADA · UDL (CAST) · ACTFL · Khung Danielson · FERPA · COPPA |
| **Chưa đạt (1)** | ISO/IEC 27001 và SOC 2 |

**Luật của bảng:** chỉ ghi *đạt* khi có một bài kiểm tự động, một con số, hoặc một tệp cụ
thể chứng minh được — và có bài kiểm ép đúng luật đó. Không có bằng chứng thì ghi *đạt
một phần* hoặc *chưa đạt*, kể cả khi cảm thấy đã làm tốt.

**Một bảng đối chiếu mà chỗ nào cũng đạt là một bảng quảng cáo.** Bảng này có chuẩn chưa
đạt và chúng được để nguyên. Và đối chiếu chuẩn **không phải chứng nhận** — chưa có tổ
chức nào ngoài học viện kiểm lại nó.

## 🧾 Hai nghìn phiếu luyện và hai nghìn nhiệm vụ chia sẻ

**80 dạng bài × 25 cấp độ = 2.000 phiếu**, mỗi phiếu **20 câu** — tổng **40.000 câu**.
Mỗi phiếu kèm đúng một **nhiệm vụ chia sẻ**, chia về một phần luyện trong hệ thống.

Năm phần nối nhau thành một chuỗi, **không đảo được**:

| Phần | Câu | Trọng số | Vai trò |
|---|---|---|---|
| KHỞI | 2 | 10% | Gọi lại cái đã biết để có chỗ móc cái mới vào |
| MẪU | 3 | 15% | Xem một mẫu làm sẵn, chép lại đúng cách làm |
| DẪN | 5 | 25% | Tự làm nhưng còn giàn giáo đỡ |
| TỰ | 8 | 35% | Bỏ giàn giáo, tự làm sạch |
| CHUỖI | 2 | 15% | Nối tất cả thành một sản phẩm liền mạch |

Không cho nhảy phần: làm phần TỰ khi chưa qua phần MẪU thì học viên đoán mò, và cái
sai đầu tiên được lặp lại suốt phần còn lại.

**Luồng 10 bước** — nhận phiếu → làm từng phần → hoàn thành chuỗi câu → chấm → báo kết
quả → nhận xét tình hình → đưa giải pháp tối ưu → định hướng → nhiệm vụ chia sẻ → xét
nâng giai đoạn. Mỗi bước ghi rõ ai làm, ra cái gì, và **chặn khi nào**.

**KPI 90% có hai điều kiện, không phải một.** Phải làm tối thiểu 8 phiếu, VÀ từ 90% số
phiếu đạt ngưỡng. Chỉ xét trung bình thì một chuỗi `95, 92, 90, 91, 88, 94, 96, 93` có
trung bình 92,4% — nhưng chỉ 87,5% số phiếu đạt, và một phiếu tệ bị che mất. Hai điều
kiện cùng lúc chặn đúng chỗ đó.

## 🗂️ Bộ phiếu theo chuyên đề — 80 chuyên đề × 7 loại

Mỗi chuyên đề có **bộ bảy phiếu** đi đúng thứ tự học một chuyên đề từ đầu tới lúc thi
được, và **mỗi phiếu có một phiếu giải riêng** đi kèm.

| # | Phiếu | Mục đích | Phút |
|---|---|---|---|
| 1 | **LÝ THUYẾT** | Hiểu bản chất trước khi chạm vào câu hỏi nào | 25 |
| 2 | **DẠNG BÀI + ĐỌC VỊ** | Nhìn một câu là biết ngay nó hỏi gì | 30 |
| 3 | **KỸ NĂNG, PHƯƠNG PHÁP** | Biến quy trình thành thói quen tay | 35 |
| 4 | **LUYỆN NÂNG CAO** | Gặp câu khó và câu bẫy trong điều kiện an toàn | 40 |
| 5 | **ÔN THI** | Trộn dạng, bấm giờ, chưa tính điểm | 30 |
| 6 | **THI** | Đo thật, đúng điều kiện, ghi vào hồ sơ | 30 |
| 7 | **ÔN CHẮC CHUYÊN ĐỀ** | Chốt lại để không rơi rụng sau ba tháng | 15 |

**560 phiếu + 560 phiếu giải = 1.120 phiếu**, tổng **273 giờ**.

**Thứ tự không đảo được.** Nhảy thẳng vào phiếu 5 và 6 là cách học phổ biến nhất và
cũng kém hiệu quả nhất: luyện đề khi chưa đọc vị được dạng bài thì mỗi câu là một câu
mới, và không có gì tích luỹ. Mỗi loại phiếu ghi rõ **chặn khi nào**.

## 🔑 Bộ giải đề và bảng phân tích chuyên sâu

**80 bộ giải · 240 điểm kiến thức · 320 bước nghĩ · 240 bẫy.** Mỗi bộ trả lời bốn câu
hỏi mà một học viên vừa làm sai thật sự cần:

1. Dạng này **kiểm** cái gì — điểm kiến thức, không phải chủ đề chung chung
2. **Nghĩ** thế nào cho đúng — quy trình từng bước, áp được cho mọi câu
3. **Sai** thì sai ở đâu — ba lựa chọn sai hay gặp, kèm chỗ lập luận gãy
4. **Làm gì tiếp** — bài giảng nào, bài luyện nào

**Bảng phân tích chuyên sâu** trong phiếu giải: mỗi điểm kiến thức nói rõ *bản chất là
gì* và *hay bị nhầm với cái gì*. Đáp án cho biết mình sai; bảng phân tích cho biết mình
sai **vì đâu** — và chỉ cái thứ hai mới sửa được cho lần sau.

**Hai luật, có bài kiểm giữ:**

- **Chỉ mở đáp án SAU khi đã nộp.** Xem trước thì học viên đọc lời giải rồi tưởng mình
  đã hiểu — đó là cảm giác quen thuộc, không phải năng lực. Bài kiểm giao diện xác nhận
  bảng phân tích không xuất hiện trước khi bấm.
- **240 lời giải thích "sai ở đâu" đều khác nhau.** Chép một lời giải cho nhiều dạng là
  rỗng ruột trá hình, nên có phép kiểm đếm trùng lặp.

*Vì sao không viết sẵn 40.000 lời giải riêng:* hai nghìn phiếu × hai mươi câu là bốn
mươi nghìn câu. Viết riêng từng lời giải thì mỗi cái chỉ dùng được đúng một lần và phần
lớn sẽ lặp nhau. Cái **thật sự chuyển giao được** là quy trình nghĩ và ba bẫy của dạng
bài — thứ dùng lại được ở mọi câu cùng dạng, kể cả câu chưa gặp.

## 🚀 Bản 1.5.0 — gấp năm lần bản trước, đo được

"Chất lượng gấp năm lần" chỉ có nghĩa khi nó là con số kiểm được. Đây là bốn con số đó,
và mỗi con số có một bài kiểm tự động giữ.

| | v1.2.0 | **v1.5.0** | |
|---|---|---|---|
| Câu hỏi có đáp án bấm được | 120 | **600** | **×5** |
| Chuyên đề có ngân hàng câu | 10 / 80 | **50 / 80** | **×5** |
| Nhận xét riêng cho từng lựa chọn | 480 | **2.400** | **×5** |
| Gói tải lần đầu | 1.217 kB | **671 kB** | **−45%** |

Con số cuối là con số đáng chú ý nhất: **nội dung tăng gấp năm mà thứ người dùng phải
tải trước khi thấy được gì lại giảm gần một nửa.**

**Ngân hàng nay phủ sáu kỹ năng**, không còn dồn vào ngữ pháp: phát âm 120 câu · ngữ pháp
120 · từ vựng 120 · đọc 96 · viết 96 · tư duy học tập 48. Đáp án rải đều bốn ô
(149/152/150/149) nên đoán theo vị trí không ăn được điểm nào.

### Vì sao gói tải lần đầu lại nhỏ đi

`data/index.ts` là một thùng tái xuất mọi mô-đun dữ liệu, và `App.tsx` nạp nó ngay từ
đầu. Hễ thùng còn tái xuất `data/nganhang.ts` thì **cả 39 thẻ đều phải tải 451 KB ngân
hàng câu hỏi** — kể cả thẻ Hiến chương vốn không liên quan gì tới nó.

Năm mô-đun nặng mà mỗi cái chỉ có **đúng một thẻ** dùng tới đã được gỡ khỏi thùng chung;
các thẻ cần chúng nạp thẳng từ đường dẫn riêng. Rollup nhờ đó xếp được chúng vào đúng
chunk của thẻ, và người dùng chỉ tải khi thật sự mở thẻ ấy.

Trong lúc làm, bốn mô-đun tưởng là dùng riêng hoá ra có người dùng thứ hai — `academy`
(thẻ Cấp độ cũng cần), `feedback`, `podcast`, `training` (cả ba đều bị `data/timkiem.ts`
dùng để dựng chỉ mục tìm kiếm). Chúng được trả lại thùng chung. Tách sai thì trình biên
dịch báo ngay, nên đây là loại tối ưu an toàn.

`tools/kiem-hieu-nang.mjs` giữ kết quả này: nó đặt trần 800 kB cho gói tải lần đầu,
kiểm ngân hàng có thật sự nằm ở chunk riêng không, và soi thẳng `data/index.ts` xem có
mô-đun nặng nào lén quay lại thùng chung không.

### Nói thẳng phần chưa làm được

**Ba mươi chuyên đề còn lại chưa có câu trắc nghiệm** — toàn bộ *nghe* và *nói*, cộng
đọc bài dài, viết đoạn và viết luận tự do. Chúng cần ngữ liệu âm thanh, bài đọc có bản
quyền, hoặc một người chấm. Chúng vẫn có bộ giải đề và phiếu chuyên đề, nhưng không có
câu bấm được. Con số 600 là con số thật của phần bấm được, không phải con số của cả
hệ thống.

Giọng Việt ngoại tuyến **vẫn chưa có thanh điệu**, và **vẫn chưa có chứng chỉ ký mã** nên
Windows còn cảnh báo SmartScreen. Hai việc này không đổi ở 1.5.0.

## ✍️ Ngân hàng câu hỏi — bấm chọn, chấm, xem đáp án

Bộ giải đề dạy **cách nghĩ** cho tám mươi dạng bài. Ngân hàng câu hỏi là chỗ có **câu cụ
thể để bấm**: **600 câu · 50 chuyên đề · 2.400 lựa chọn · 2.400 nhận xét · 145 câu dựng theo
bẫy có sẵn**. Tab **Làm bài · xem đáp án**.

**Bốn nhận xét cho bốn lựa chọn, không phải một.** Phần lớn ngân hàng câu hỏi chỉ ghi
đáp án đúng. Ở đây mỗi ô đều có một dòng riêng: ô đúng nói *vì sao đúng*, ba ô sai nói
*chỗ lập luận gãy*. Học viên chọn sai thì nhận lại đúng lý do của cái sai **mình vừa
chọn**, chứ không nhận một lời giải chung cho cả câu.

**Dây nhiễu dựng theo bẫy có tên.** Ba bẫy của mỗi chuyên đề đã viết sẵn trong bộ giải
đề. Bốn mươi câu ở đây dựng theo đúng ba bẫy đó, nên khi học viên chọn sai thì hệ thống
biết em vừa rơi vào **bẫy số mấy** — thông tin dùng được, khác hẳn với việc chỉ biết em
chọn sai. Lịch sử đếm bẫy hay mắc nhất.

**Đáp án rải đều bốn ô — và đây là một lỗi đã bắt được.** Bản nháp dồn **74/120** đáp án
vào ô B: học viên cứ chọn B mà không đọc gì cũng được **62%**. Bài kiểm bắt được, và
cách sửa là xoay vòng bốn ô theo số thứ tự câu — xoay vòng giữ nguyên cặp *lựa chọn ↔
nhận xét* nên không thể lệch nhận xét sang nhầm ô, và vì tính từ số thứ tự nên kết quả
cố định qua mọi lần chạy. Nay là **149 / 152 / 150 / 149** trên 600 câu. Năm câu mà bốn ô vốn đã có thứ
tự thật (âm tiết một, hai, ba…) được ghi tên và giữ nguyên.

**Phạm vi, nói thẳng.** Mười chuyên đề là những chỗ tính đúng sai **kiểm được chắc
chắn**: ngữ pháp, trọng âm, giới từ, dạng từ, biến đổi câu, cấu trúc song song. **Bảy
mươi chuyên đề còn lại** — nghe, nói, đọc bài dài — cần ngữ liệu âm thanh và bài đọc có
bản quyền, nên chúng dùng bộ giải đề và phiếu chuyên đề chứ **chưa** có câu trắc nghiệm.
Đó là giới hạn thật, ghi ra thay vì để người dùng tự phát hiện.

**Lượt ngân hàng lưu riêng với hồ sơ phiếu luyện.** Phiếu luyện có năm phần theo KHUNG
và có cấp độ; ngân hàng thì theo chuyên đề và loại phiếu, cùng một câu dùng được ở mọi
cấp độ. Gộp chung thì phép phân tích sẽ chia trung bình theo phần cho những bản ghi
không có phần — con số trả ra sai mà không ai thấy. Nên hai khoá riêng, mỗi phép phân
tích chỉ đọc đúng loại của mình.

## 🗃️ Hồ sơ học viên và lộ trình cá nhân hoá

Mỗi lần làm phiếu để lại một bản ghi. Bản ghi tích luỹ thành hồ sơ, và hồ sơ sinh ra lộ
trình cá nhân hoá **bằng phép tính trên số liệu thật**.

Hồ sơ phân tích: xu hướng, trung bình, tỉ lệ đạt, chuỗi ngày, mạnh yếu **theo kỹ năng**
và **theo phần của phiếu**, cùng danh sách cảnh báo.

**Ba quyết định thiết kế, mỗi cái có bài kiểm:**

1. **Hồ sơ nằm trên máy người học, không gửi đi đâu.** Bản máy tính lưu trong két đã mã
   hoá; bản web lưu trong bộ nhớ trình duyệt. Đổi máy là mất hồ sơ — điều đó được nói rõ
   chứ không giấu.
2. **Chỉ kết luận khi đủ dữ liệu.** Dưới ba lần làm thì báo "chưa đủ dữ liệu", không đoán
   xu hướng. Dao động dưới 3 điểm phần trăm gọi là *đi ngang* — dao động tự nhiên giữa
   các lần lớn hơn mức đó, nên gọi là lên hay xuống ở dưới ngưỡng ấy là **đọc nhiễu thành
   tín hiệu**.
3. **Mỗi việc đề nghị đều kèm bằng chứng bằng số.** Ví dụ: *"Dồn hai tuần vào kỹ năng
   Nghe — Nghe trung bình 76% qua 3 lần, thấp nhất trong 2 kỹ năng đã làm."* Lời khuyên
   không có bằng chứng thì người học không có cách nào kiểm.

Lộ trình tối đa **ba việc**, đúng theo luật của kho giải pháp: kê nhiều hơn ba là cách
chắc chắn để không việc nào được làm đủ liều.

## 📚 Hai nghìn bài giảng chuyên sâu

**4 trụ × 20 chủ đề × 25 cấp độ = 2.000 bài**, tổng **613 giờ** nội dung.

| Trụ | Vai trò | Thiếu thì sao |
|---|---|---|
| **TƯ DUY** | Vì sao mình học, và điều gì làm mình bỏ cuộc | Bỏ giữa chừng, dù kỹ thuật rất tốt |
| **KIẾN THỨC** | Thứ phải biết, không thể tự suy ra | Trần thấp — luyện mãi vẫn kẹt vì thiếu nguyên liệu |
| **KỸ NĂNG** | Thứ chỉ có qua lặp lại, không qua đọc hiểu | Biết mà không làm được, và điểm không lên |
| **PHƯƠNG PHÁP** | Cách học sao cho mỗi giờ sinh lợi nhiều nhất | Cày nhiều mà đi chậm, rồi kết luận sai rằng mình không có năng khiếu |

Cùng chủ đề "nối âm" ở cấp 1 là **nhận ra** hiện tượng; ở cấp 25 là **tự điều chỉnh**
theo tốc độ người nghe. Câu hỏi lõi không đổi; học liệu, độ sâu và việc sau bài thì đổi.

**Ưu tiên cho hai trường khó nhất.** Chuyên Anh của Sư phạm và của Ngoại ngữ nhiều năm
liền có điểm chuẩn cao nhất Hà Nội. **775 bài** được đánh dấu trọng yếu cho hai kỳ thi
ấy, và tuyến chuyên đi theo **ưu tiên** chứ không theo số thứ tự — vì họ chỉ có 22 tháng
và một ngày thi duy nhất. Đánh dấu này dựa trên đặc điểm **ổn định** của đề chuyên (khối
ngữ pháp lớn, bài đọc dài, phần biến đổi câu), không dựa trên đề của một năm cụ thể.

Mỗi bài nối tới đúng một phiếu luyện. *Bài giảng không có phiếu đi kèm là bài giảng chỉ
để nghe cho sướng tai.*

## 📑 Bộ 2.000 đề — bảy chiều phân tích

Mỗi phiếu luyện có một bảng phân tích riêng trả lời bảy câu hỏi mà học viên vừa làm xong
thật sự cần: **kiến thức · dạng bài · đọc vị · phương pháp làm · bước giải · mẹo xử lý và
nhận diện bẫy · bí kíp**. Cộng **10.000 dòng barem** — mỗi đề năm phần.

**Nói thẳng đây là gì và KHÔNG là gì.** Đây **không** phải 2.000 đề với 40.000 câu viết
tay riêng từng câu. Viết bằng ấy câu thì mỗi câu dùng được đúng một lần, phần lớn lặp
nhau, và không ai đọc hết được. Thứ chuyển giao được là **cách đọc vị dạng bài và quy
trình nghĩ** — cái đó dùng lại được ở mọi câu cùng dạng, kể cả câu chưa gặp. Câu cụ thể
bấm được nằm ở **ngân hàng câu hỏi**; đề trọn vẹn nằm ở **đề thi mẫu**. Ba tầng, ba việc.

**Đếm cho đúng, đừng để con số 2.000 nói quá.** Cả 2.000 bảng đều khác nhau — có bài kiểm
đếm. Nhưng không phải chiều nào cũng có 2.000 biến thể: *kiến thức* và *dạng bài* biến
theo từng **cấp** (25 bản khác nhau trong một dạng), còn *phương pháp*, *mẹo theo tầng* và
*bí kíp* biến theo **tầng** — chỉ **5** biến thể. Đó là chủ ý: năm cấp trong cùng một tầng
thì đúng là nên làm bài giống nhau. Bài kiểm ép creed phải nói ra điều này.

**Chuẩn chấm nghiêm dần theo tầng, và có bài kiểm giữ chiều đó.** Tầng 1 chưa trừ điểm
trình bày; tầng 5 trừ mọi lỗi, không châm chước. Nếu tầng 5 chấm dễ hơn tầng 1 thì thước
đo đi ngược — học viên lên tầng lại thấy điểm cao hơn dù làm kém đi.

Barem nói rõ **trừ điểm ở đâu**, không chỉ nói cho điểm ở đâu. Chỗ người chấm hay châm
chước chính là chỗ thành bất công giữa hai học viên.

## 📄 Bốn đề thi mẫu trọn vẹn

Hệ thống trước đây mới có **ma trận** đề. Ma trận dạy được cách chia giờ nhưng không cho
cái cảm giác ngồi trước một đề thật từ câu một tới câu cuối.

**58 câu · 58 lời giải riêng · 10 phần · 10 barem · 2 bài đọc.**

| Đề | Kỳ thi | Cấu trúc thật | Bản mẫu |
|---|---|---|---|
| Chuyên Anh Sở Hà Nội | Vào 10 chuyên | 120 phút · ~86 câu · 5 phần | 28 câu, phủ đủ 5 phần |
| Ngoại ngữ chung Hà Nội | Vào 10 công lập | 60 phút · 40 câu · 24 mã đề | 12 câu, có cả 5 dạng thực tế mới |
| Chuyên KHTN vòng 2 | Chuyên KHTN | 90 phút · nặng suy luận | 8 câu, đúng các cấu trúc vòng 2 hay ra |
| Tốt nghiệp THPT | Tốt nghiệp | 50 phút · 40 câu · 3 khối | 10 câu, phủ đủ 3 khối |

Mỗi đề có: **thứ tự làm bài khuyến nghị** kèm lý do, **cách chia giờ** từng phần, **barem
chấm** từng phần, và một **cảnh báo riêng** cho kỳ thi đó. Mỗi câu neo về một dạng bài
trong hệ thống, nên làm sai là tra ngay được bộ giải đề của dạng đó.

**Vì sao rút gọn, và nói ra thay vì giấu.** Câu thứ hai mươi cùng một dạng gần như không
dạy thêm gì; một dạng chưa gặp thì dạy rất nhiều. Nên mỗi đề mẫu ít câu hơn đề thật nhưng
**phủ đủ mọi dạng** của phần đó, và số câu thật được ghi ngay trong đề.

**Không dùng để đoán đề.** Cấu trúc và công thức điểm thay đổi theo từng năm và từng
trường. Đề mẫu để luyện cảm giác và luyện phân bổ giờ. Trước mỗi mùa thi **phải** đối
chiếu lại với đề án tuyển sinh chính thức — mỗi đề tự mang lời nhắc đó, và có bài kiểm ép
lời nhắc phải còn ở đó.

Bài kiểm `tools/kiem-dethi.ts` bắt được **bốn lỗi thật** trong chính bản soạn đầu: một
barem cụt, một bài đọc quá ngắn so với số câu hỏi, và hai đề quên ghi mình là bản rút gọn.
Nó cũng soát đáp án có rải đều bốn ô không — dồn vào một ô là thí sinh đoán trúng mà
không hiểu.

## 🛡 Bảo mật — bốn lỗ hổng đã bịt

Rà soát toàn bộ bản máy tính và bản web, tìm ra bốn chỗ hổng thật và bịt cả bốn. Mỗi
chỗ đều có bài kiểm giữ (`npm run test:baomat`, 38 phép kiểm đọc thẳng mã nguồn).

1. **CSP cho script nội tuyến.** Bản máy tính chạy `script-src 'self' 'unsafe-inline'`
   trong khi bản dựng **không có thẻ script nội tuyến nào** — tức là đang tự bỏ đi lớp
   chặn XSS mạnh nhất mà CSP có, đổi lấy không gì cả. Nay là `script-src 'self'`, và
   bài kiểm **đếm** số script nội tuyến trong bản dựng để chứng minh điều kiện đó vẫn
   đúng. **Bản web trước đó không có CSP nào cả** — không máy chủ nào đặt hộ đầu trang
   cho nó — nay mang chính sách trong thẻ meta.
2. **Quyền `media` mở cả webcam.** Trong Electron, `media` gộp micro **và** camera; trả
   `true` cho `media` mà không xét `mediaTypes` là mở luôn webcam — thứ khối PHẢN XẠ
   không cần đến bao giờ. Nay chỉ chấp thuận khi yêu cầu có audio và không có video, và
   chặn ở **cả hai cửa** (`setPermissionRequestHandler` lẫn `setPermissionCheckHandler`
   — chỉ đặt một cửa là còn cửa kia mở). Thêm: từ chối mọi thiết bị HID/USB/cổng nối
   tiếp, và chặn `will-attach-webview` ở tầng ứng dụng.
3. **Đổi mã khoá làm mất hồ sơ khi mất điện.** Bản cũ ghi `vault.json` bằng khoá mới
   **trước** rồi mới mã hoá lại `profile.enc`. Mất điện giữa hai bước đó thì két có
   khoá mới còn hồ sơ vẫn nằm dưới khoá cũ — mở được két mà không đọc được gì, và
   không có đường lùi. Nay hai bản mới được dàn sẵn rồi đổi tên theo thứ tự cố định,
   kèm **luật phục hồi quyết định được** cho cả hai trạng thái dở dang. Mọi lần ghi
   xuống két đều qua `ghi nguyên tử` (tệp tạm + `fsync` + đổi tên). Và nếu hồ sơ đang
   hỏng thì hệ thống **từ chối đổi mã khoá**, thay vì chôn vĩnh viễn một tệp có thể
   vẫn cứu được bằng mã cũ.
4. **Thời gian chờ chống dò mã về không khi tắt ứng dụng.** Số lần nhập sai nằm trong
   một biến của tiến trình chính, nên người dò mã chỉ cần tắt rồi mở lại. Nay nó nằm
   trong `vault.json`. Cố ý **không** khoá vĩnh viễn sau N lần sai: ở đây không có máy
   chủ, không có đường khôi phục, nên khoá vĩnh viễn nghĩa là một đứa trẻ nghịch bàn
   phím xoá được cả hồ sơ ba năm. Thời gian chờ tăng luỹ thừa tới trần 30 giây và
   không bao giờ tự về không.

Két nay có **60 phép kiểm** (trước là 36), gồm cả hai kịch bản mất điện dựng lại thật.

**Còn nguyên và vẫn nói thẳng:** chưa có chứng chỉ ký mã (~200–400 USD/năm) nên
Windows vẫn cảnh báo SmartScreen; và chưa có ISO 27001 / SOC 2.

## 🧯 Bật `strict` cho TypeScript

Kho này chạy `strict: false` từ đầu. Bật lên thì ra **5.235 lỗi** — nhưng 4.973 trong
số đó là TS7026, tức là TypeScript không tìm thấy khai báo kiểu của React, chứ không
phải lỗi mã. Trỏ `paths` về `preact/compat` (đúng thứ **thật sự chạy** lúc chạy) thì
còn **41 lỗi thật**:

- **19 chỗ `e.target.value`** — dưới kiểu của preact, `e.target` là `EventTarget | null`.
  Đổi sang `e.currentTarget.value`: vừa đúng kiểu, vừa đúng ngữ nghĩa (với ô nhập có
  điều khiển thì `currentTarget` mới là phần tử gắn handler; `target` có thể là con).
- **2 chỗ `possibly undefined`** — chính là lỗi tôi vừa tạo ra khi làm thẻ có thể bị
  chặn. Sửa bằng một màn hình dự phòng nói rõ chuyện gì xảy ra, không phải bằng `!`.

Nay **`strict: true`, 0 lỗi**.

## 🔧 Mọi script tự chạy được

Năm bài kiểm chạy bằng trình duyệt vốn nối cứng tới `localhost:4173` và cho rằng có
người đã bật máy chủ sẵn. Ai chạy `npm run test:web` mà chưa bật thì nhận về một vệt
`ERR_CONNECTION_REFUSED` — không nói được là thiếu máy chủ, và trông hệt như phần mềm
hỏng. Nay `tools/mo-xem-truoc.mjs` tự dựng máy chủ trên **cổng còn trống** (không phải
cổng cố định: hai bài kiểm chạy song song trên cùng cổng thì cái sau nối vào bản dựng
của cái trước và cho kết quả sai mà vẫn xanh), đợi tới khi nó trả lời thật, rồi dọn đi
— kể cả khi bài kiểm hỏng giữa chừng.

## 🔐 Phân quyền theo cấp độ học viên và cấp độ giáo viên

**39 quyền · 18 bậc · 7 thang — và nay đã được BẬT, không chỉ mô tả.**

Tám nhóm vai theo đúng quy định quyền của GITA365:

| Thang | Bậc | Mở được |
|---|---|---|
| Học viên | 5 tầng năng lực (KHAI NHĨ → TINH LUYỆN) | 30 → 32 thẻ |
| Giảng dạy | TRỢ GIẢNG → COACH TẬP SỰ → COACH → COACH DẪN DẮT → CHỦ NHIỆM CHUYÊN MÔN | 32 → **37** thẻ |
| Gia đình | PHỤ HUYNH | 26 thẻ |
| Kinh doanh | CỘNG TÁC VIÊN → TƯ VẤN | 26 thẻ |
| Sản phẩm | **ADMIN SẢN PHẨM** | 30 thẻ |
| Điều hành | **GIÁM ĐỐC ĐIỀU HÀNH** | 27 thẻ |
| Vận hành | QUẢN TRỊ HỌC VỤ → **ADMIN HỆ THỐNG** → **SUPER ADMIN** | 26 thẻ |

**Con số đáng chú ý nhất trong bảng trên: SUPER ADMIN mở được ÍT thẻ hơn một COACH.**
Đó không phải lỗi — đó là cả thiết kế. Super Admin gán được quyền, xoá được hồ sơ, khôi
phục được dữ liệu, đóng băng được hệ thống; và **không** chấm bài, **không** nâng hạ cấp
độ, **không** cấp chứng nhận, **không** quyết định chính sách học thuật. Một người vừa
sửa được điểm vừa xoá được dấu vết mình vừa sửa thì mọi con số của học viện đều mất giá
trị. Có bài kiểm ở **cả hai tầng** — bảng quyền và tầng thi hành — vì một luật chỉ được
kiểm ở một chỗ là một luật dễ vỡ.

Ba tách bạch khác cùng loại:

- **ADMIN SẢN PHẨM duyệt và phát hành, nhưng KHÔNG tự sửa bộ chuẩn.** Gộp quyền soạn với
  quyền duyệt vào một vai là bỏ luôn giá trị của bước duyệt. Vai này cũng **không xem hồ
  sơ học viên** — người làm nội dung không cần dữ liệu từng em để làm tốt việc của mình.
- **GIÁM ĐỐC ĐIỀU HÀNH đặt chính sách học thuật nhưng KHÔNG có tay kỹ thuật để tự sửa
  con số trong cấu hình.** Không ai vừa đặt luật vừa tự tay sửa luật.
- **ADMIN HỆ THỐNG lo kỹ thuật hằng ngày nhưng KHÔNG gán quyền, KHÔNG xoá hồ sơ.** Hai
  việc không đảo ngược đó nằm ở bậc trên.

### Bật thật nghĩa là gì

Thẻ không thuộc quyền của vai thì **không được dựng** — nó không nằm trong cây DOM dưới
dạng bị ẩn. Dựng rồi che đi là kiểu chặn giả. Bài kiểm giao diện xác nhận đúng điều đó,
và xác nhận rằng vai mặc định mở 32/37 thẻ chứ không phải 37 — nếu mọi vai đều mở được
mọi thẻ thì tầng này chỉ là trang trí.

**Không thẻ nào biến mất lặng lẽ.** Dải vai trên đầu màn hình luôn hiện vai đang dùng,
số quyền, số thẻ mở và số thẻ ẩn. Ẩn mà không nói là cách chắc chắn để người dùng tưởng
phần mềm hỏng.

### Một chỗ mạnh hơn giao diện, và đúng một chỗ

Trên **bản máy tính**, vai được cất trong **chính cái két đã mã hoá** đang giữ hồ sơ.
Muốn đổi vai phải mở được két, tức là phải có mã khoá. Bài kiểm khói chứng minh điều đó
chạy thật: ghi vai vào két, **xoá sạch localStorage**, nạp lại trang — giao diện lấy
lại đúng vai từ két và thi hành nó; khoá két lại thì không đọc được vai nữa.

Trên **bản web** thì vai nằm trong bộ nhớ trình duyệt và đổi được bằng tay. Điều đó
được ghi thẳng ra màn hình, ngay trong bảng đổi vai, chứ không giấu.

**Nói trước một điều:** phân quyền ở giao diện **không phải bảo mật**. Ai mở công cụ nhà
phát triển đều đổi được vai của mình. Nó ngăn nhầm lẫn, không ngăn được người cố ý —
hiệu lực thật chỉ có khi máy chủ kiểm lại vai ở từng thao tác. Tệp này là bản thiết kế
cho tầng đó và bản mô tả cho vận hành học viện, không phải bản thay thế.

Bốn nguyên tắc, và mỗi cái đều có bài kiểm giữ:

1. **Đặc quyền tối thiểu** — mỗi quyền phải trả lời được "vì sao nó bị chặn". Quyền nào
   không trả lời được thì mở cho tất cả.
2. **Không ai tự nâng mình** — học viên tầng 5 vẫn không nâng cấp độ được cho ai.
3. **Việc không đảo ngược cần hai người** — 13 việc, và cả 13 đều đồng thời ghi nhật ký.
   Ngoại lệ duy nhất là **đóng băng hệ thống khẩn cấp**: một người kéo được thì mới kịp,
   bù lại nó ghi nhật ký và phải giải trình trong 24 giờ.
4. **Quyền kỹ thuật không kèm quyền chuyên môn** — xem bảng trên.

`tools/kiem-quyen.ts` ép thừa kế phải **đơn điệu** — bậc trên luôn có đủ mọi quyền của
bậc dưới — và soát 32 cặp tách bạch trách nhiệm bằng khẳng định cụ thể.
`tools/kiem-phien.ts` kiểm tầng thi hành: mọi thẻ trong `App.tsx` phải được neo vào một
quyền **có thật** (thẻ quên khai báo sẽ bị khoá với *mọi* vai — phải đỏ lên ở đây chứ
không phải để người dùng phát hiện), mọi vai phải mở được ít nhất một thẻ, và mọi lần
bị chặn phải nói được **vì sao** cùng **vai nào mở được**.

## 🎯 Luyện thi chuyên Anh & lớp chất lượng cao vào 10 — Hà Nội

Vào từ **lớp 8**, thi tháng 6 cuối lớp 9. **Hai mươi hai tháng.** Đích: đỗ chuyên
với **biên an toàn 0,5–1,0 điểm** trên điểm chuẩn, bài chuyên **từ 7,0**.

> **Vì sao nhắm trên điểm chuẩn.** Điểm chuẩn đổi theo từng năm và không ai
> đoán được; nhắm đúng bằng điểm chuẩn năm ngoái là đặt cả hai năm ôn luyện vào
> tay may rủi.

> ⚠ **Cấu trúc đề và công thức điểm THAY ĐỔI theo từng năm và từng trường.** Các
> con số trong hệ thống theo cấu trúc những năm gần đây của đề chuyên Sở Hà Nội.
> Trước mỗi mùa thi phải đối chiếu lại với đề án tuyển sinh chính thức rồi sửa
> hằng `EXAM_SPEC` — cả lộ trình tự cập nhật theo.

**Máy tính ngược từ đích** — nhập điểm chuẩn dự kiến, biên an toàn muốn có, và
điểm ba môn chung; hệ thống tính ra bài chuyên phải đạt bao nhiêu và **cần đúng
bao nhiêu câu ở từng phần**. Bài chuyên nhân hệ số hai, nên mỗi điểm ở đây đáng
gấp đôi một điểm ở môn chung.

| Phần đề chuyên | Câu | Phút | Điểm |
|---|---|---|---|
| Nghe | 20 | 25 | 2,3 |
| Ngữ âm | 5 | 5 | 0,6 |
| Từ vựng – Ngữ pháp | 25 | 25 | 2,9 |
| Đọc | 20 | 35 | 2,3 |
| Viết | 16 | 30 | 1,9 |

**Test đầu vào 150 phút** rồi chia **4 bậc năng lực**. Bậc D được khuyên **không
nhắm chuyên** trong 22 tháng — đây là lời khuyên trung thực, vì nhận một em bậc
D vào lớp luyện chuyên là lấy tiền của gia đình để bán một xác suất rất thấp.

Phỏng vấn phụ huynh **riêng**, không có mặt học sinh: hai bên thường trả lời
khác nhau về cùng một câu hỏi — *ai là người muốn thi chuyên*.

**5 giai đoạn / 22 tháng**, phủ liền mạch không hở:

| GĐ | Lớp | Tháng | Mục tiêu |
|---|---|---|---|
| 1 | 8 · HK I | 1–5 | Dựng nền âm và từ — chưa đụng đề thi |
| 2 | 8 · HK II | 6–10 | Ngữ pháp lõi thành phản xạ, đọc đủ nhanh |
| 3 | Hè 8→9 | 11–12 | **Tăng tốc** — chỗ bậc B quyết định đỗ hay trượt |
| 4 | 9 · HK I | 13–18 | Vào đề có hệ thống |
| 5 | 9 · HK II | 19–22 | Về đích và giữ biên |

**7 cấp phải vượt** (Mở tai → Vốn cụm → Ngữ pháp phản xạ → Đọc không sợ dài →
Viết ăn điểm chắc → Đủ điểm → **Giữ biên**), mỗi cấp có lối gỡ khi tắc.

**9 phác đồ nâng cấp** theo từng phần đề, mỗi phác đồ nêu nguyên nhân gốc, số
tuần, và mức lên dự kiến. Ví dụ: *bỏ trống phần biến đổi câu vì hết giờ* → làm
biến đổi câu **trước** đoạn luận → lấy lại 1,0–1,5 điểm mà không cần giỏi hơn.

```bash
npx tsx tools/kiem-chuyen.ts             # kiểm cấu trúc đề, bậc, 22 tháng, phác đồ
node tools/kiem-may-tinh-diem.mjs        # kiểm số học của máy tính điểm
```

## 🧬 Mô thức GITA — 12 bước và 300 bài định hướng

Toàn bộ phần này lấy từ **tài liệu gốc của học viện**: sơ đồ hành trình 12
bước, sơ đồ tư duy viết tay, và hai sơ đồ BNI của Trương Nhật Quang.

> **Một đính chính.** Bản trước của hệ thống có bốn pha **G–I–T–A**
> (GIEO · IN · THẤM · ÁP) do tôi tự dựng khi chưa có tài liệu gốc, và đã ghi rõ
> là bản tạm. Tài liệu gốc cho thấy **GITA là tên học viện, không phải viết tắt
> của bốn pha**. Bốn pha thật là **HIỂU MÌNH → RÈN MÌNH → BỨT PHÁ → TRƯỞNG
> THÀNH**. Bốn pha bịa đã được thay, và có phép kiểm tự động canh để điều đó
> không lặp lại.

**Hành trình 12 bước** — mỗi bước ghi rõ các điểm chính từ tài liệu gốc, mốc
tháng, và **tiếng Anh nằm ở đâu trong bước đó**. Tiếng Anh không phải môn tách
rời: nó là một trong ba trục của bước 05, và là nơi mười một bước còn lại được
kiểm chứng.

**Bàn đạp phát triển cá nhân** — ba luồng chạy song song từ sơ đồ viết tay:

| Luồng | Chuỗi |
|---|---|
| THÓI QUEN | → tiêu chí lựa chọn → nguồn lực hệ thống → giải pháp → **tài năng** |
| HÀNH ĐỘNG | → đòn bẩy → công cụ, dụng cụ → **nghị lực** |
| TRẢI NGHIỆM | → tốc độ → niềm tin → **hành vi** |

Cả ba đổ về **KỶ LUẬT**. Kỷ luật là *kết quả*, không phải điểm xuất phát — đó là
chỗ hầu hết chương trình hiểu ngược.

**Bốn phễu lọc** — Ngôn ngữ, Trải nghiệm, Ký ức, Niềm tin: nơi thông điệp của cố
vấn bị méo trước khi tới học viên. Mỗi phễu nêu rõ nó làm méo gì và cố vấn phải
làm gì để đi xuyên qua.

**Năm lối chiến lược** chuyển từ BNI: Givers Gain, đúng người → đúng thông điệp
→ đúng quy trình → WOW trải nghiệm → nhân tầng. BNI dựng hệ thống để *một lời
giới thiệu sinh ra lời giới thiệu tiếp theo*; học viện cần đúng cấu trúc đó cho
việc *một học viên thành công sinh ra học viên thành công tiếp theo*.

### 300 bài định hướng

`12 bước × 5 chủ đề × 5 nấc = 300`, sinh bằng hàm thuần.

- **5 chủ đề** xuyên suốt: Nhận thức · Niềm tin · Thói quen · Hành động · Kết nối
- **5 nấc thấm**: Biết → Hiểu → Làm được → Thành thói quen → **Dạy lại**

Bài định hướng **khác** bài học. Hệ thống đã có 268 bài giảng dạy kiến thức;
300 bài này là buổi **chỉnh hướng** 20 phút: vì sao đang làm việc này, đang ở
đâu, bước kế tiếp là gì. Mỗi bài kết thúc bằng một việc làm được ngay, không
phải một điều để suy ngẫm.

```bash
npx tsx tools/kiem-gita.ts   # kiểm 12 bước, 4 phễu, 5 lối, và 300 bài
```

**Hai chỗ tôi chưa đọc chắc trong tài liệu gốc** — được ghi công khai trong app
thay vì đoán bừa: tiêu đề ghi *"4 Phễu Lọc"* nhưng liệt kê **năm** tên; và dòng
*"3 an + Độ"* tôi chưa ra nghĩa nên chưa đưa vào hệ thống.

## 🤖 Trợ lý AI của học viện

Trả lời câu hỏi khó nhất mỗi sáng — **hôm nay tôi làm gì** — bằng dữ liệu của
chính học viên, không bằng lời khuyên chung chung.

> Trợ lý có **đúng một việc**: đưa người học tới buổi luyện tiếp theo. Một trợ
> lý trả lời hay mọi câu hỏi mà học viên vẫn không luyện là một trợ lý đã thất
> bại.

**Bản giao việc hôm nay** — tab Trợ lý AI có bản chạy thật, không phải ảnh minh
hoạ: đổi ngày, quỹ thời gian, cấp độ, gói và triệu chứng, xem đúng thứ trợ lý
sẽ trả về. Nội dung dựng từ hồ sơ 365 ngày, 25 cấp độ và kho 1.000 đơn kê.

Bản giao việc gồm đúng sáu phần và **không có bốn thứ**: không quá một màn
hình, không có lựa chọn nào để người học phải quyết, không có lời động viên
chung chung, không hiện tiến độ của người khác.

**Phạm vi theo gói.** Ba gói — Tự học, Có kèm, Kèm sâu — mỗi gói ghi rõ trợ lý
được làm gì và **không** được làm gì. Không gói nào cho trợ lý chấm bài nói,
bài viết tự luận, hay xét lên tầng.

**11 kho tri thức**, mỗi kho kèm giới hạn riêng. Ví dụ: kho 1.000 đơn kê chỉ
được lấy đơn đúng cấp độ học viên đang ở, kể cả khi đơn của cấp khác nghe hợp
lý hơn.

**10 việc làm được**, mỗi việc có rào chắn. Đáng chú ý là hai việc cuối: *từ
chối đúng cách* (nói thẳng không làm được, vì sao, và ai làm được) và *dừng và
gọi người* (gặp dấu hiệu kiệt sức hay khủng hoảng thì dừng giao bài ngay,
không trấn an, chuyển coach mà không chờ học viên đồng ý).

**6 tín hiệu thói quen** đo bằng dữ liệu chứ không hỏi cảm nhận. Chỉ số dự báo
bỏ cuộc mạnh nhất là **tốc độ quay lại** sau khi đứt chuỗi, không phải độ dài
chuỗi.

**Thang giữ chân 5 nấc.** Bỏ một ngày → trợ lý **im lặng**. Bỏ bảy ngày → trợ
lý **dừng nhắc hoàn toàn** và chuyển người. Khi quay lại → **không nhắc gì tới
quãng nghỉ**, vì nhắc lại là cách nhanh nhất để họ nghỉ tiếp.

```bash
node tools/kiem-tro-ly.mjs   # quét 54 tổ hợp ngày × quỹ thời gian
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

## 🔎 Tầng SEO — 34 trang xếp hạng được thay vì 1

### Vấn đề gốc, nói thẳng

Trước tầng này, cả ứng dụng có **39 thẻ nội dung nhưng đúng một địa chỉ**.
Google xếp hạng địa chỉ, không xếp hạng thẻ. Ba mươi tám thẻ còn lại không
tồn tại đối với người đang tìm kiếm — không phải xếp hạng thấp, mà là **không
có gì để xếp hạng**.

Và trước khi nói bất cứ điều gì khác: **không ai bảo đảm được vị trí số một**,
ai nói bảo đảm được thì đang bán một thứ họ không có. Thứ hạng phụ thuộc vào
đối thủ trong cùng truy vấn, vào số trang uy tín dẫn link về, vào tuổi tên
miền — không thứ nào nằm trong mã nguồn. Cái mã nguồn quyết định được là
**điều kiện cần**, và phần này làm cho đủ điều kiện cần.

### Bốn thứ đã sửa, theo thứ tự đòn bẩy

| # | Trước | Sau | Vì sao quan trọng |
|---|---|---|---|
| 1 | 1 địa chỉ cho 39 thẻ | 39 địa chỉ riêng, mỗi thẻ một trang | Google xếp hạng địa chỉ |
| 2 | Điều hướng bằng `<button onClick>` | `<a href>` thật | Máy tìm kiếm **không bấm nút**; 34 trang từng là 34 trang mồ côi |
| 3 | Không trang nào có `<h1>` | Đúng một `<h1>` mỗi trang | Tín hiệu mạnh nhất trên trang, và là điểm vào cho trình đọc màn hình |
| 4 | HTML rỗng, nội dung do JS dựng | 34 trang HTML dựng sẵn có nội dung | Máy tìm kiếm đọc được ở **lượt đầu**, không đợi lượt chạy JS |

### Trang công khai và trang nội bộ — vì sao phải tách

Năm thẻ chỉ mở cho vai vận hành (chấm bài, đào tạo giáo viên, podcast, tuyển
giọng đọc, xưởng học liệu). Nếu đưa chúng vào sitemap thì người tìm kiếm bấm
vào, vào tới nơi, **bị đẩy sang trang khác**, rồi bấm quay lại. Google đọc
đúng chuỗi đó là "trang không đáp ứng truy vấn" — vừa mất một kết quả, vừa để
lại tín hiệu xấu cho cả tên miền.

Nên: sitemap, liên kết nội bộ và bản dựng sẵn **chỉ gồm 34 trang công khai**;
5 trang nội bộ mang `noindex` đặt sẵn trong HTML. Danh sách này **không gõ
tay** — nó tính thẳng từ bảng phân quyền, nên sửa quyền là nó đổi theo.

Cũng vì thế **không dùng `Disallow`** trong robots.txt: `Disallow` nghĩa là
"đừng tải", mà không tải thì không đọc được `noindex`, và trang vẫn lọt vào
kết quả — lọt vào mà không có mô tả.

### Ba thứ cố tình không làm

| Không dùng | Vì sao |
|---|---|
| `FAQPage` | Cần cặp hỏi/đáp **hiện ra trên trang**; đánh dấu hỏi/đáp không có là vi phạm chính sách. Ngoài ra từ 2023 Google chỉ hiện FAQ cho trang y tế và cơ quan nhà nước |
| `SearchAction` | Google đã ngừng ô tìm kiếm trong kết quả từ cuối 2024 — giữ lại chỉ là mã chết |
| `hreflang` | Chỉ có nghĩa khi có nhiều bản ngôn ngữ. Trang này chỉ có tiếng Việt |

Vụn bánh mì cũng chỉ **hai bậc**, không ba: địa chỉ ở đây phẳng, bịa ra một
tầng trung gian không tồn tại thì Google đối chiếu với địa chỉ thật và bỏ luôn
cả vụn.

### `lastmod` là ngày sửa thật, không phải ngày đóng gói

Cách phổ biến là ghi ngày hôm nay vào mọi địa chỉ mỗi lần dựng. Đó là nói
dối, và khi Google thấy sai nhiều lần thì nó **bỏ qua `lastmod` của cả tên
miền** — lúc đó trang sửa thật cũng không được thu thập lại sớm nữa.

`tools/ngay-sua.mjs` tính ngày thật của từng trang: tra thẻ nào dựng bằng
thành phần nào, đọc các tên nhập từ kho dữ liệu, tra mỗi tên khai báo ở tệp
nào, rồi lấy ngày commit **muộn nhất** trong số đó. Mỗi trang phụ thuộc 3–6
tệp và có một mốc thời gian của riêng nó.

### Ảnh chia sẻ sinh bằng mã

34 ảnh 1200×630 sinh lúc đóng gói từ chính tiêu đề trang, màu lấy từ bộ nhận
diện GITA (`data/brand.ts`). Không có ảnh thì mọi liên kết dán vào Zalo hay
Messenger hiện ra một ô trống — và ô trống thì gần như không ai bấm. Sinh bằng
mã nên tiêu đề trên ảnh **luôn khớp** tiêu đề trang, không có đường lệch.

### Chạy và kiểm

```bash
npm run build:web    # dựng + sinh tệp SEO + kiểm lại, cả ba trong một lệnh
npm run seo          # chỉ sinh: 34 ảnh og, robots.txt, sitemap.xml, 39 HTML, 404.html
npm run test:seo     # 14 nhóm kiểm, đọc dist/ chứ không đọc mã nguồn
```

`tools/kiem-seo.mjs` đọc **bản đã đóng gói**, không đọc mã nguồn: máy tìm kiếm
cũng chỉ tải đúng những tệp đó. Bảy phép thử ngược đã chạy để chứng minh bài
kiểm đỏ được thật — bỏ một liên kết, đổi `<h1>` thành `<h2>`, thêm
`changefreq`, gỡ `noindex`, đặt `Disallow: /`, xoá `404.html`, làm hỏng một
khối JSON-LD; cả bảy đều bị bắt.

### Còn thiếu gì — nói thẳng

Mã nguồn đã lo xong phần kỹ thuật. Ba thứ còn lại **không nằm trong mã nguồn**
và không ai lập trình thay được:

- **Tên miền thật.** `data/seo.ts` đang đặt `GOC = 'https://engwin365.gita365.vn'`.
  Đổi một dòng đó là sitemap, canonical và ảnh chia sẻ đổi theo.
- **Liên kết từ nơi khác dẫn về.** Đây là yếu tố xếp hạng lớn nhất còn lại, và
  nó đến từ việc có người thật thấy nội dung đáng dẫn link.
- **Đăng ký Google Search Console** rồi nộp `sitemap.xml`. Không nộp thì Google
  vẫn tìm ra, nhưng chậm hơn nhiều và không có số liệu để sửa.

## Xuất bản web

`npm run build:web` sinh ra thư mục `dist/` đầy đủ — tải thẳng lên Netlify,
Cloudflare Pages, Vercel, hoặc bất kỳ máy chủ tĩnh nào. Dùng `build:web` chứ
không dùng `build`: bản chỉ `build` thiếu toàn bộ tệp SEO nên **không xếp hạng
được**.

Tệp `dist/_headers` đã có sẵn tiêu đề bảo mật và quy tắc nhớ đệm cho Netlify
và Cloudflare Pages: `/assets/*` mang mã băm trong tên nên nhớ vĩnh viễn, còn
HTML thì luôn hỏi lại máy chủ — nhớ lâu HTML nghĩa là người dùng xem bản cũ
sau khi đã phát hành bản mới.

Nơi đăng phải trả `404.html` cho địa chỉ không có thật, **đừng** đặt quy tắc
chuyển mọi địa chỉ về `index.html`: làm thế thì địa chỉ hỏng trả về mã 200 kèm
nội dung không khớp — đúng định nghĩa "404 mềm", một trong những lỗi bị hạ giá
rõ nhất.

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
| `ENGWIN365-1.0.0-windows-x64.exe` | Bộ cài đặt — tạo lối tắt, có gỡ cài đặt |
| `ENGWIN365-1.0.0-windows-portable.exe` | Bản chạy thẳng, không cần cài |

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
npm run test:seo      # 14 nhóm kiểm tầng SEO trên bản đã đóng gói
npm run test:a11y     # WCAG 2.1 mức A và AA trên cả 39 thẻ
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
  podcast.ts           Engwin Radio — 5 định dạng, 6 tập, cấu hình pipeline
  brand.ts             Hệ thống nhận diện — màu, chữ, khoảng cách, luật logo
  sprint.ts            Chu kỳ 21/90 ngày + 5 cơ chế học có bằng chứng
  voices.ts            Dàn 10 giọng · chuẩn MC · đối chiếu Anh-Anh/Anh-Mỹ
  certify.ts           8 trục · 5 tầng Miller · 6 vai × 5 bậc · quy tắc chấm
  exams.ts             9 bài thi tốt nghiệp + 4 khoá đào tạo tự động
  dossier.ts           Hồ sơ 365 ngày — 4 quý, 16 vòng, sinh bằng hàm thuần
  assess.ts            4 bộ đề định kỳ · 8 luật liêm chính · 6 bậc thưởng · quy trình AI
  solutions.ts         40 triệu chứng → kho 1.000 đơn kê, sinh bằng hàm thuần
  training.ts          Kèm cặp 1–1 · 5 bậc coach · 4 khoá nâng cao · lộ trình xuất sắc
  assistant.ts         Trợ lý AI — 3 gói · 11 kho tri thức · 10 việc · thang giữ chân
  gita.ts              Mô thức GITA gốc — 12 bước · bàn đạp · 4 phễu · 5 lối BNI
  lessons300.ts        300 bài định hướng, sinh từ 12 bước × 5 chủ đề × 5 nấc
  chuyenanh.ts         Lộ trình chuyên Anh & CLC vào 10 — 22 tháng, tính ngược từ đích
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

components/engwin/    Một component cho mỗi tab
types.ts               Kiểu dữ liệu lõi
docs/ENGWIN365.md     Sổ tay vận hành — bản rút gọn để dùng hằng ngày
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
3. Đọc [`docs/ENGWIN365.md`](docs/ENGWIN365.md) — sổ tay vận hành, 10 phút.
4. Sang tab **Lộ trình**, mở đúng cột mốc xuất phát mà hệ thống đã tính cho bạn.
5. Làm đúng buổi học của ngày mai.

Hệ thống này là một bản thiết kế, không phải một lời hứa. Nó chỉ tạo ra kết quả khi được
vận hành mỗi ngày.
