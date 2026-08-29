/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import raw from '../content/podcast-scripts.json';

/* ==========================================================================
   ENGWIN RADIO — podcast đồng hành
   Kịch bản nằm ở content/podcast-scripts.json, dùng chung cho cả ứng dụng này
   lẫn công cụ dựng audio tools/make-podcast.mjs. Một nguồn dữ liệu duy nhất.
   ========================================================================== */

export type PodcastSpeaker = 'DẪN' | 'CỐ VẤN' | 'ANH' | 'LẶNG';

export interface PodcastLine {
  /** Vai nói */
  s: string;
  /** Ngôn ngữ: vi hoặc en */
  l: string;
  /** Lời thoại */
  t: string;
  /** Khoảng lặng sau câu này, tính bằng giây */
  p?: number;
}

export interface PodcastFormat {
  id: string;
  name: string;
  duration: string;
  cadence: string;
  purpose: string;
  structure: string;
}

export interface PodcastEpisode {
  id: string;
  formatId: string;
  no: number;
  title: string;
  forLevel: string;
  takeaway: string;
  task: string;
  lines: PodcastLine[];
}

export const PODCAST_SERIES = raw.series as {
  name: string;
  tagline: string;
  why: string;
  voices: Record<string, string>;
};

export const PODCAST_FORMATS = raw.formats as PodcastFormat[];
export const PODCAST_EPISODES = raw.episodes as PodcastEpisode[];

/** Ước lượng thời lượng: ~2,2 từ mỗi giây khi đọc chậm, cộng các khoảng lặng. */
export function estimateSeconds(ep: PodcastEpisode): number {
  const words = ep.lines.reduce(
    (s, l) => s + (l.t ? l.t.split(/\s+/).length : 0),
    0,
  );
  const pauses = ep.lines.reduce((s, l) => s + (l.p ?? 0), 0);
  return words / 2.2 + pauses;
}

/** Sáu vai giọng. Kịch bản gọi theo tên vai, công cụ tra sang model tương ứng. */
export const VOICE_ROLES = [
  {role: 'DẪN', lang: 'Tiếng Việt', desc: 'Người dẫn — nhịp bình thường, vai người bạn đồng hành.'},
  {role: 'CỐ VẤN', lang: 'Tiếng Việt', desc: 'Cố vấn — chậm hơn 13%, hạ cao độ 9%, vai người đi trước.'},
  {role: 'ANH', lang: 'Anh–Mỹ nam', desc: 'Giọng mẫu mặc định. Đọc chậm hơn nhịp thường 8% để học viên bám kịp khi shadowing.'},
  {role: 'ANH-NỮ', lang: 'Anh–Mỹ nữ', desc: 'Dùng khi cần hai người đối thoại bằng tiếng Anh.'},
  {role: 'ANH-ANH', lang: 'Anh–Anh nữ', desc: 'Giọng Anh chuẩn. IELTS dùng cả hai giọng nên học viên phải quen cả hai.'},
  {role: 'ANH-ANH-NAM', lang: 'Anh–Anh nam', desc: 'Giọng Anh nam, dùng xen kẽ cho đa dạng.'},
];

/** Bốn thông số quyết định độ liền mạch — sửa trong MIX ở tools/make-podcast.mjs. */
export const MIX_NOTES = [
  {
    name: 'Cắt lặng thừa',
    what: 'Piper tự chèn khoảng 76ms lặng ở đầu và cuối mỗi câu. Cộng với khoảng nghỉ trong kịch bản thành nghỉ đúp — đây là nguyên nhân chính gây cảm giác rời rạc. Chuỗi mới cắt sạch rồi mới chèn đúng khoảng nghỉ đã định.',
  },
  {
    name: 'Căn lại nhịp nghỉ',
    what: 'Khoảng nghỉ trong kịch bản vốn chỉnh theo espeak đọc nhanh. Piper đọc chậm và tự nhiên hơn nên giữ nguyên sẽ thành lê thê. Nhân hệ số 0,68 và chặn trong khoảng 0,22 đến 2,2 giây. Riêng dòng LẶNG giữ nguyên vì đó là chủ đích của bài tư duy.',
  },
  {
    name: 'Nền phòng thay im lặng tuyệt đối',
    what: 'Phòng thu thật không bao giờ im lặng hoàn toàn. Nền nhiễu nâu ở -68dB không nghe thấy được nhưng xoá đi cảm giác "chết máy" giữa các câu.',
  },
  {
    name: 'Hậu kỳ dễ nghe',
    what: 'Cắt ù dưới 70Hz, hạ 180Hz cho bớt đục, nhấc 3kHz cho rõ phụ âm, nén nhẹ để không phải chỉnh loa giữa chừng, rồi chuẩn hoá -16 LUFS theo chuẩn podcast.',
  },
];

export const PRODUCTION_PIPELINE = {
  title: 'Dựng audio từ kịch bản',
  oneLine:
    'Kịch bản là dữ liệu, audio là thứ dựng ra từ dữ liệu đó. Sửa một câu trong kịch bản rồi chạy lại lệnh là có bản mới, không phải hẹn phòng thu.',
  commands: [
    {cmd: 'bash tools/fetch-voices.sh', desc: 'Tải model giọng Piper — chạy một lần, ~235 MB'},
    {cmd: 'node tools/make-podcast.mjs', desc: 'Dựng toàn bộ tập bằng Piper (neural, ngoại tuyến)'},
    {cmd: 'node tools/make-podcast.mjs --ep ep01', desc: 'Dựng đúng một tập'},
    {cmd: 'node tools/make-podcast.mjs --tts google', desc: 'Cloud TTS Neural2 (cần GOOGLE_TTS_KEY)'},
    {cmd: 'node tools/make-podcast.mjs --tts gemini', desc: 'Giọng tự nhiên nhất (cần GEMINI_API_KEY)'},
    {cmd: 'node tools/make-podcast.mjs --rss', desc: 'Sinh thêm feed RSS để đăng lên nền tảng podcast'},
  ],
  backends: [
    {
      id: 'piper',
      name: 'Piper — MẶC ĐỊNH',
      cost: 'Miễn phí, chạy ngoại tuyến, không cần khoá',
      quality:
        'Neural. Giọng Mỹ en-us-ryan-high cho câu mẫu tiếng Anh, giọng Việt cho phần dẫn. Đủ tốt để phát hành.',
      useFor:
        'Mặc định cho toàn series. Sinh giọng theo lô nên dựng 6 tập chỉ mất khoảng hai phút.',
      setup: 'pip install piper-tts && bash tools/fetch-voices.sh',
    },
    {
      id: 'espeak',
      name: 'espeak-ng',
      cost: 'Miễn phí, chạy ngoại tuyến',
      quality:
        'Bộ tổng hợp formant — giọng máy, về bản chất không thể tự nhiên.',
      useFor:
        'Chỉ dùng khi không tải được model Piper. KHÔNG dùng cho câu mẫu tiếng Anh: học viên shadowing theo sẽ bắt chước sai nhịp và sai trọng âm.',
      setup: 'apt-get install -y espeak-ng ffmpeg',
    },
    {
      id: 'google',
      name: 'Google Cloud Text-to-Speech',
      cost: 'Khoảng 16 USD cho mỗi 1 triệu ký tự, có hạn mức miễn phí hằng tháng',
      quality: 'Giọng Neural2 — tự nhiên, có cả tiếng Việt lẫn tiếng Anh chuẩn',
      useFor:
        'Phát hành thật. Ổn định, đọc số và tên riêng chính xác, phù hợp cho toàn bộ series dài hạn.',
      setup: 'Bật Text-to-Speech API trong Google Cloud, lấy khoá, đặt biến GOOGLE_TTS_KEY',
    },
    {
      id: 'gemini',
      name: 'Gemini TTS',
      cost: 'Tính theo token, rẻ hơn thu phòng thu rất nhiều',
      quality: 'Tự nhiên nhất hiện có, giữ được cảm xúc và nhịp nói',
      useFor:
        'Các tập định dạng Đối thoại cố vấn, nơi chất giọng và cảm xúc quyết định hiệu quả.',
      setup: 'Lấy khoá tại Google AI Studio, đặt biến GEMINI_API_KEY',
    },
  ],
  humanNote:
    'Ba backend trên đều là giọng tổng hợp. Với các tập Lập trình tư duy — nơi khoảng lặng và hơi thở quyết định hiệu quả — nên thu bằng giọng người thật. Kịch bản trong hệ thống đã đánh dấu sẵn từng khoảng lặng tính bằng giây, người đọc chỉ việc bám theo.',
};
