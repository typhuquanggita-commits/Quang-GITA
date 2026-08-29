/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import raw from '../content/podcast-scripts.json';

/* ==========================================================================
   ENGWILL RADIO — podcast đồng hành
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

export const PRODUCTION_PIPELINE = {
  title: 'Dựng audio từ kịch bản',
  oneLine:
    'Kịch bản là dữ liệu, audio là thứ dựng ra từ dữ liệu đó. Sửa một câu trong kịch bản rồi chạy lại lệnh là có bản mới, không phải hẹn phòng thu.',
  commands: [
    {cmd: 'node tools/make-podcast.mjs', desc: 'Dựng toàn bộ tập bằng TTS ngoại tuyến'},
    {cmd: 'node tools/make-podcast.mjs --ep ep01', desc: 'Dựng đúng một tập'},
    {cmd: 'node tools/make-podcast.mjs --tts google', desc: 'Chất lượng phát hành (cần GOOGLE_TTS_KEY)'},
    {cmd: 'node tools/make-podcast.mjs --tts gemini', desc: 'Giọng tự nhiên nhất (cần GEMINI_API_KEY)'},
    {cmd: 'node tools/make-podcast.mjs --rss', desc: 'Sinh thêm feed RSS để đăng lên nền tảng podcast'},
  ],
  backends: [
    {
      id: 'espeak',
      name: 'espeak-ng',
      cost: 'Miễn phí, chạy ngoại tuyến',
      quality: 'Giọng máy, nghe rõ nhưng không tự nhiên',
      useFor:
        'Duyệt kịch bản và canh thời lượng trước khi thu thật. Nghe bản này để biết chỗ nào lê thê, chỗ nào hụt, trước khi tốn tiền thu.',
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
