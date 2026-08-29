#!/usr/bin/env node
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ENGWILL RADIO — công cụ dựng podcast từ kịch bản.
 *
 *   node tools/make-podcast.mjs                  # dựng tất cả tập, backend espeak
 *   node tools/make-podcast.mjs --ep ep01        # dựng một tập
 *   node tools/make-podcast.mjs --tts google     # chất lượng phát hành (cần GOOGLE_TTS_KEY)
 *   node tools/make-podcast.mjs --tts gemini     # giọng tự nhiên nhất (cần GEMINI_API_KEY)
 *   node tools/make-podcast.mjs --rss            # sinh thêm feed RSS để đăng podcast
 *
 * Backend:
 *   espeak  — chạy ngoại tuyến, không cần key, không tốn tiền. Giọng máy, dùng để
 *             duyệt kịch bản và canh thời lượng trước khi thu thật.
 *   google  — Google Cloud Text-to-Speech. Giọng Neural2 cho cả tiếng Việt và tiếng Anh.
 *   gemini  — Gemini TTS. Giọng tự nhiên nhất hiện có, hợp với định dạng đối thoại.
 */

import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync, mkdirSync, rmSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SCRIPTS = join(ROOT, 'content', 'podcast-scripts.json');
const OUT = join(ROOT, 'audio');
const TMP = join(OUT, '.tmp');
const RATE = 22050;

/* ----------------------------- tham số dòng lệnh ------------------------- */

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--')
    ? argv[i + 1]
    : fallback;
};
const flag = (name) => argv.includes(`--${name}`);

const TTS = arg('tts', 'espeak');
const ONLY = arg('ep', null);

/* ------------------------------ tiện ích --------------------------------- */

const sh = (cmd, args) =>
  execFileSync(cmd, args, {stdio: ['ignore', 'pipe', 'pipe']});

const has = (cmd) => {
  try {
    execFileSync('which', [cmd], {stdio: 'ignore'});
    return true;
  } catch {
    return false;
  }
};

const secs = (n) => `${Math.floor(n / 60)}:${String(Math.round(n % 60)).padStart(2, '0')}`;

/* --------------------------- cấu hình giọng ------------------------------ */

/**
 * Ba vai trong kịch bản, ánh xạ sang giọng của từng backend.
 * Sửa ở đây là đổi giọng cho toàn bộ series.
 */
const VOICES = {
  DẪN: {
    espeak: {voice: 'vi+f3', speed: 148, pitch: 58},
    google: {name: 'vi-VN-Neural2-A', lang: 'vi-VN', rate: 0.96, pitch: 1.0},
    gemini: 'Kore',
  },
  'CỐ VẤN': {
    espeak: {voice: 'vi+m3', speed: 136, pitch: 32},
    google: {name: 'vi-VN-Neural2-D', lang: 'vi-VN', rate: 0.9, pitch: -2.0},
    gemini: 'Charon',
  },
  ANH: {
    espeak: {voice: 'en-gb', speed: 142, pitch: 45},
    google: {name: 'en-GB-Neural2-B', lang: 'en-GB', rate: 0.92, pitch: 0.0},
    gemini: 'Puck',
  },
};

/* ------------------------------ backend TTS ------------------------------ */

function ttsEspeak(line, out) {
  const v = VOICES[line.s]?.espeak ?? VOICES['DẪN'].espeak;
  sh('espeak-ng', [
    '-v', v.voice,
    '-s', String(v.speed),
    '-p', String(v.pitch),
    '-g', '4',
    '-w', out,
    line.t,
  ]);
}

async function ttsGoogle(line, out) {
  const key = process.env.GOOGLE_TTS_KEY;
  if (!key) throw new Error('Thiếu biến môi trường GOOGLE_TTS_KEY');
  const v = VOICES[line.s]?.google ?? VOICES['DẪN'].google;
  const res = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${key}`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: {text: line.t},
        voice: {languageCode: v.lang, name: v.name},
        audioConfig: {
          audioEncoding: 'LINEAR16',
          sampleRateHertz: RATE,
          speakingRate: v.rate,
          pitch: v.pitch,
        },
      }),
    },
  );
  if (!res.ok) throw new Error(`Google TTS ${res.status}: ${await res.text()}`);
  const {audioContent} = await res.json();
  writeFileSync(out, Buffer.from(audioContent, 'base64'));
}

async function ttsGemini(line, out) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('Thiếu biến môi trường GEMINI_API_KEY');
  const voice = VOICES[line.s]?.gemini ?? 'Kore';
  const res = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'x-goog-api-key': key},
      body: JSON.stringify({
        contents: [{parts: [{text: line.t}]}],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {prebuiltVoiceConfig: {voiceName: voice}},
          },
        },
      }),
    },
  );
  if (!res.ok) throw new Error(`Gemini TTS ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const b64 = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!b64) throw new Error('Gemini TTS không trả về audio');
  // Gemini trả PCM 24kHz mono thô, phải bọc thành WAV.
  const pcm = Buffer.from(b64, 'base64');
  const hdr = Buffer.alloc(44);
  hdr.write('RIFF', 0);
  hdr.writeUInt32LE(36 + pcm.length, 4);
  hdr.write('WAVEfmt ', 8);
  hdr.writeUInt32LE(16, 16);
  hdr.writeUInt16LE(1, 20);
  hdr.writeUInt16LE(1, 22);
  hdr.writeUInt32LE(24000, 24);
  hdr.writeUInt32LE(24000 * 2, 28);
  hdr.writeUInt16LE(2, 32);
  hdr.writeUInt16LE(16, 34);
  hdr.write('data', 36);
  hdr.writeUInt32LE(pcm.length, 40);
  writeFileSync(out, Buffer.concat([hdr, pcm]));
}

const BACKENDS = {espeak: ttsEspeak, google: ttsGoogle, gemini: ttsGemini};

/* ------------------------------- dựng tập -------------------------------- */

function silence(seconds, out) {
  sh('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'lavfi',
    '-i', `anullsrc=r=${RATE}:cl=mono`,
    '-t', String(seconds),
    out,
  ]);
}

/** Chuẩn hoá mọi mảnh về cùng tần số lấy mẫu và số kênh trước khi ghép. */
function normalise(inFile, outFile) {
  sh('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-i', inFile,
    '-ar', String(RATE), '-ac', '1',
    outFile,
  ]);
}

function duration(file) {
  const out = sh('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-of', 'csv=p=0',
    file,
  ]);
  return parseFloat(String(out).trim());
}

async function buildEpisode(ep, series, format) {
  const dir = join(TMP, ep.id);
  rmSync(dir, {recursive: true, force: true});
  mkdirSync(dir, {recursive: true});

  const parts = [];
  const synth = BACKENDS[TTS];
  if (!synth) throw new Error(`Backend không hợp lệ: ${TTS}`);

  for (let i = 0; i < ep.lines.length; i++) {
    const line = ep.lines[i];
    const n = String(i).padStart(3, '0');

    if (line.s !== 'LẶNG' && line.t.trim()) {
      const raw = join(dir, `${n}-raw.wav`);
      const norm = join(dir, `${n}.wav`);
      await synth(line, raw);
      normalise(raw, norm);
      parts.push(norm);
    }

    const pause = line.p ?? 0.4;
    if (pause > 0) {
      const sil = join(dir, `${n}-sil.wav`);
      silence(pause, sil);
      parts.push(sil);
    }
  }

  // Ghép bằng concat demuxer — an toàn hơn filter_complex khi có hàng trăm mảnh.
  const list = join(dir, 'list.txt');
  writeFileSync(list, parts.map((p) => `file '${p}'`).join('\n'));
  const merged = join(dir, 'merged.wav');
  sh('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, merged]);

  // Chuẩn hoá âm lượng về -16 LUFS (chuẩn podcast) rồi mã hoá MP3.
  const mp3 = join(OUT, `${ep.id}-${slug(ep.title)}.mp3`);
  sh('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-i', merged,
    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11',
    '-codec:a', 'libmp3lame', '-b:a', '128k', '-ar', '44100',
    '-metadata', `title=${ep.no}. ${ep.title}`,
    '-metadata', `artist=${series.name}`,
    '-metadata', `album=${format?.name ?? series.name}`,
    '-metadata', `track=${ep.no}`,
    '-metadata', `comment=${ep.takeaway}`,
    '-metadata', 'genre=Education',
    mp3,
  ]);

  rmSync(dir, {recursive: true, force: true});
  return {file: mp3, seconds: duration(mp3)};
}

const slug = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);

/* --------------------------------- RSS ----------------------------------- */

function buildRss(series, built) {
  const esc = (s) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const items = built
    .map(
      (b) => `    <item>
      <title>${esc(`${b.ep.no}. ${b.ep.title}`)}</title>
      <description>${esc(b.ep.takeaway)}</description>
      <itunes:duration>${secs(b.seconds)}</itunes:duration>
      <itunes:episode>${b.ep.no}</itunes:episode>
      <guid isPermaLink="false">engwill-${b.ep.id}</guid>
      <enclosure url="REPLACE_BASE_URL/${b.file.split('/').pop()}" type="audio/mpeg" length="0"/>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>${esc(series.name)}</title>
    <description>${esc(series.tagline)}</description>
    <language>vi</language>
    <itunes:category text="Education"/>
    <itunes:explicit>false</itunes:explicit>
${items}
  </channel>
</rss>`;
  writeFileSync(join(OUT, 'feed.xml'), xml);
  return join(OUT, 'feed.xml');
}

/* --------------------------------- chạy ---------------------------------- */

(async () => {
  for (const bin of ['ffmpeg', 'ffprobe']) {
    if (!has(bin)) {
      console.error(`Thiếu ${bin}. Cài bằng: apt-get install -y ffmpeg`);
      process.exit(1);
    }
  }
  if (TTS === 'espeak' && !has('espeak-ng')) {
    console.error('Thiếu espeak-ng. Cài bằng: apt-get install -y espeak-ng');
    process.exit(1);
  }
  if (!existsSync(SCRIPTS)) {
    console.error(`Không tìm thấy kịch bản: ${SCRIPTS}`);
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(SCRIPTS, 'utf8'));
  const eps = ONLY ? data.episodes.filter((e) => e.id === ONLY) : data.episodes;
  if (!eps.length) {
    console.error(`Không có tập nào khớp: ${ONLY}`);
    process.exit(1);
  }

  mkdirSync(OUT, {recursive: true});
  mkdirSync(TMP, {recursive: true});

  console.log(`\n  ${data.series.name} — dựng ${eps.length} tập, backend: ${TTS}\n`);

  const built = [];
  for (const ep of eps) {
    const format = data.formats.find((f) => f.id === ep.formatId);
    process.stdout.write(`  ${ep.id}  ${ep.title.slice(0, 46).padEnd(48)}`);
    try {
      const r = await buildEpisode(ep, data.series, format);
      built.push({ep, ...r});
      const kb = Math.round(readFileSync(r.file).length / 1024);
      console.log(`${secs(r.seconds).padStart(6)}  ${String(kb).padStart(5)} KB`);
    } catch (e) {
      console.log(`LỖI: ${e.message}`);
    }
  }

  rmSync(TMP, {recursive: true, force: true});

  const total = built.reduce((s, b) => s + b.seconds, 0);
  console.log(`\n  Xong ${built.length}/${eps.length} tập · tổng ${secs(total)} · thư mục audio/`);

  if (flag('rss') && built.length) {
    const f = buildRss(data.series, built);
    console.log(`  Feed RSS: ${f} (thay REPLACE_BASE_URL bằng tên miền của bạn)`);
  }
  console.log();
})();
