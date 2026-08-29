# ENGWILL RADIO — thư mục audio

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

## Giọng đang dùng

| Vai | Model | Ghi chú |
|-----|-------|---------|
| ANH | `en-us-ryan-high` | Giọng Mỹ, chất lượng cao. Đây là giọng học viên shadowing theo — không thay bằng giọng kém tự nhiên hơn. |
| DẪN | `vi-25hours-single-low` | Giọng Việt, nhịp bình thường. |
| CỐ VẤN | `vi-25hours-single-low` | Cùng model nhưng chậm hơn 13% và hạ cao độ 9% — cho ra giọng thứ hai phân biệt được mà vẫn giữ chất lượng của model tốt nhất. |

Đổi giọng cho toàn series bằng cách sửa hằng `VOICES` ở đầu
[`tools/make-podcast.mjs`](../tools/make-podcast.mjs). Script `fetch-voices.sh`
cũng tải sẵn `en-us-lessac-medium` (giọng nữ Mỹ) để dự phòng.

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
