# ENGWIN RADIO — thư mục audio

File `.mp3` trong thư mục này **không được commit** (xem `.gitignore`) vì chúng là
sản phẩm dựng ra từ kịch bản, không phải nguồn. Nguồn nằm ở
[`content/podcast-scripts.json`](../content/podcast-scripts.json).

## Dựng lại toàn bộ

```bash
apt-get install -y ffmpeg               # chỉ cần làm một lần
pip install piper-tts
bash tools/fetch-voices.sh              # tải model giọng, ~235 MB, một lần
node tools/make-podcast.mjs --rss
```

Khoảng 2 phút cho 6 tập. Kết quả: 6 file MP3 128kbps, âm lượng đã chuẩn hoá về
-16 LUFS (chuẩn podcast), có sẵn thẻ ID3, kèm `feed.xml` để đăng lên nền tảng.

## Sáu vai giọng

| Vai | Model | Ghi chú |
|-----|-------|---------|
| `ANH` | `en-us-ryan-high` | Anh–Mỹ nam. Giọng mẫu mặc định — học viên shadowing theo nên đọc chậm hơn nhịp thường 8%. |
| `ANH-NỮ` | `en-us-libritts-high` (giọng 92) | Anh–Mỹ nữ. Dùng khi cần hai người đối thoại bằng tiếng Anh. |
| `ANH-ANH` | `en-gb-southern_english_female-low` | Anh–Anh nữ. IELTS dùng cả hai giọng nên học viên phải quen cả hai. |
| `ANH-ANH-NAM` | `en-gb-alan-low` | Anh–Anh nam, dùng xen kẽ cho đa dạng. |
| `DẪN` | `vi-25hours-single-low` | Tiếng Việt, nhịp bình thường. |
| `CỐ VẤN` | `vi-25hours-single-low` | Cùng model nhưng chậm hơn 13% và hạ cao độ 9% — giọng thứ hai phân biệt được mà vẫn giữ chất lượng model tốt nhất. |

Kịch bản gọi theo tên vai; công cụ tra sang model. Đổi giọng cho toàn series bằng
cách sửa hằng `VOICES` ở đầu [`tools/make-podcast.mjs`](../tools/make-podcast.mjs).

`vi-vivos-x-low` có **65 giọng** khác nhau — nếu cần đổi giọng vùng miền, thêm
`speaker: <số>` vào cấu hình vai và thử các số khác nhau.

## Bốn việc làm cho bản dựng liền mạch

Sửa trong hằng `MIX` ở đầu `tools/make-podcast.mjs`:

1. **Cắt lặng thừa.** Piper tự chèn ~76ms lặng ở hai đầu mỗi câu. Cộng với khoảng
   nghỉ trong kịch bản thành nghỉ đúp — đây là nguyên nhân chính gây rời rạc.
2. **Căn lại nhịp nghỉ.** Khoảng nghỉ trong kịch bản vốn chỉnh theo espeak đọc
   nhanh; piper đọc chậm hơn nên nhân hệ số `pauseScale` 0,68 và chặn trong khoảng
   0,22–2,2 giây. **Riêng dòng `LẶNG` giữ nguyên** vì khoảng lặng 15–20 giây trong
   bài lập trình tư duy là chủ đích, không được co.
3. **Nền phòng thay im lặng tuyệt đối.** Nhiễu nâu ở -68dB, không nghe thấy được
   nhưng xoá cảm giác "chết máy" giữa các câu.
4. **Hậu kỳ dễ nghe.** Cắt ù <70Hz · hạ 180Hz cho bớt đục · nhấc 3kHz cho rõ phụ
   âm · nén nhẹ · chuẩn hoá -16 LUFS.

## Giọng Hà Nội chuẩn — giới hạn hiện tại

Model tiếng Việt của Piper **không khai báo dataset**, nên không xác minh được
giọng vùng nào. Nếu cần bảo đảm giọng Bắc chuẩn Hà Nội ở mức phát thanh, dùng
Google Cloud TTS — `vi-VN-Neural2-A` và `vi-VN-Neural2-D` là giọng Bắc chuẩn:

```bash
export GOOGLE_TTS_KEY=...
node tools/make-podcast.mjs --tts google --rss
```

Cấu hình vai đã trỏ sẵn sang hai giọng đó, chỉ cần khoá.

## Vì sao không dùng espeak nữa

`espeak-ng` là bộ tổng hợp **formant** — về bản chất không thể tự nhiên. Với podcast
dạy tiếng Anh, để giọng máy đọc câu mẫu là **có hại**: học viên shadowing theo sẽ
bắt chước sai nhịp và sai trọng âm. Backend `espeak` vẫn còn trong công cụ, nhưng
chỉ dùng khi không tải được model piper.

## Chất lượng cao hơn nữa

Piper chạy ngoại tuyến và miễn phí, đủ tốt cho phát hành. Nếu cần tự nhiên hơn nữa:

```bash
export GOOGLE_TTS_KEY=...      # Google Cloud Text-to-Speech, giọng Neural2
node tools/make-podcast.mjs --tts google --rss

export GEMINI_API_KEY=...      # Gemini TTS, tự nhiên nhất
node tools/make-podcast.mjs --tts gemini --rss
```

Đổi giọng cho toàn series bằng cách sửa hằng `VOICES` ở đầu
[`tools/make-podcast.mjs`](../tools/make-podcast.mjs).

## Thu bằng giọng người

Với định dạng **Lập trình tư duy**, khoảng lặng và hơi thở quyết định hiệu quả —
nên thu bằng người thật. Kịch bản đã đánh dấu sẵn từng khoảng lặng tính bằng giây
(trường `p` trong JSON, và hiển thị trong tab Podcast của ứng dụng), người đọc chỉ
việc bám theo.
