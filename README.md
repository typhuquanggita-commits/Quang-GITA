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

## Chạy ứng dụng

**Yêu cầu:** Node.js 18+

```bash
npm install
npm run dev      # mở http://localhost:3000
```

```bash
npm run build    # build production vào dist/
npm run preview  # xem thử bản build
```

Ứng dụng chạy hoàn toàn tĩnh — không cần API key, không gọi mạng.

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

content/
  podcast-scripts.json Kịch bản podcast — nguồn dùng chung cho app và công cụ dựng

tools/
  make-podcast.mjs     Dựng MP3 + RSS từ kịch bản (piper / google / gemini / espeak)
  piper_batch.py       Sinh giọng theo lô — nạp mỗi model một lần, nhanh gấp 6
  fetch-voices.sh      Tải model giọng Piper
  make-brand.mjs       Dựng 59 ấn phẩm nhận diện (SVG + PNG) từ dữ liệu
  cast_voices.py       Sàng lọc giọng bằng âm học + dựng băng audition

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
