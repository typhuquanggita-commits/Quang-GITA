# ENGWILL RADIO — thư mục audio

File `.mp3` trong thư mục này **không được commit** (xem `.gitignore`) vì chúng là
sản phẩm dựng ra từ kịch bản, không phải nguồn. Nguồn nằm ở
[`content/podcast-scripts.json`](../content/podcast-scripts.json).

## Dựng lại toàn bộ

```bash
apt-get install -y espeak-ng ffmpeg     # chỉ cần làm một lần
node tools/make-podcast.mjs --rss
```

Khoảng 30 giây cho 6 tập. Kết quả: 6 file MP3 128kbps, âm lượng đã chuẩn hoá về
-16 LUFS (chuẩn podcast), có sẵn thẻ ID3, kèm `feed.xml` để đăng lên nền tảng.

## Chất lượng phát hành

Backend `espeak` chạy ngoại tuyến và miễn phí, nhưng là giọng máy. Dùng nó để
**duyệt kịch bản và canh nhịp** — nghe bản này là biết ngay chỗ nào lê thê, chỗ
nào hụt, trước khi tốn tiền thu thật.

Khi cần bản phát hành:

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
