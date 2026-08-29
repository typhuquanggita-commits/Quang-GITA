#!/usr/bin/env node
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ENGWILL RADIO — công cụ dựng podcast từ kịch bản.
 *
 *   node tools/make-podcast.mjs                  # dựng tất cả tập, backend piper (neural)
 *   node tools/make-podcast.mjs --ep ep01        # dựng một tập
 *   node tools/make-podcast.mjs --tts google     # chất lượng phát hành (cần GOOGLE_TTS_KEY)
 *   node tools/make-podcast.mjs --tts gemini     # giọng tự nhiên nhất (cần GEMINI_API_KEY)
 *   node tools/make-podcast.mjs --rss            # sinh thêm feed RSS để đăng podcast
 *
 * Backend:
 *   piper   — MẶC ĐỊNH. Neural, chạy ngoại tuyến, không cần key, không tốn tiền.
 *             Giọng Mỹ ryan-high cho mọi câu tiếng Anh; giọng Việt cho phần dẫn.
 *             Cài: pip install piper-tts, rồi tải model (xem audio/README.md).
 *   espeak  — bộ tổng hợp formant, giọng máy. Chỉ dùng khi không tải được model
 *             piper. Không nên dùng cho câu mẫu tiếng Anh: học viên shadowing theo
 *             sẽ bắt chước sai nhịp và sai trọng âm.
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
// 24 kHz là tần số gốc của Google Neural2 và Gemini TTS. Chốt ở 22050 như
// trước sẽ ép hai nguồn đó hạ mẫu, mất chất lượng ngay từ đầu. Model Piper
// tiếng Anh 22050 thì nâng lên 24000 là vô hại.
const RATE = 24000;
const PIPER_DIR =
  process.env.PIPER_VOICES ||
  join(process.env.HOME || '/root', '.local', 'share', 'piper-voices');

/* ----------------------------- tham số dòng lệnh ------------------------- */

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--')
    ? argv[i + 1]
    : fallback;
};
const flag = (name) => argv.includes(`--${name}`);

const TTS = arg('tts', 'piper');
const ONLY = arg('ep', null);

/*
 * Chặn cờ lạ. Trước đây gõ nhầm "--only ep01" thay vì "--ep ep01" thì cờ bị
 * bỏ qua im lặng và công cụ dựng cả sáu tập — mất năm phút mới biết mình gõ
 * sai. Cờ không nhận ra thì dừng ngay, đừng đoán ý người dùng.
 */
const CO_HOP_LE = new Set(['tts', 'ep', 'rss']);
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (!a.startsWith('--')) continue;
  const ten = a.slice(2);
  if (!CO_HOP_LE.has(ten)) {
    console.error(
      `\n  Không có cờ "${a}".\n` +
        `  Cờ hợp lệ: ${[...CO_HOP_LE].map((x) => '--' + x).join(', ')}\n` +
        `  Dựng một tập là: --ep ep01\n`,
    );
    process.exit(1);
  }
}

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

// Làm tròn TỔNG giây trước rồi mới tách phút — làm tròn phần dư trước sẽ cho
// ra "20:60" khi phần dư là 59,6 giây.
const secs = (n) => {
  const t = Math.round(n);
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};

/* --------------------------- cấu hình giọng ------------------------------ */

/**
 * Ba vai trong kịch bản, ánh xạ sang giọng của từng backend.
 * Sửa ở đây là đổi giọng cho toàn bộ series.
 */
const VOICES = {
  DẪN: {
    piper: {model: 'vi-25hours-single-low', length: 1.02, pitchShift: 1.0},
    espeak: {voice: 'vi+f3', speed: 148, pitch: 58},
    google: {name: 'vi-VN-Neural2-A', lang: 'vi-VN', rate: 0.96, pitch: 1.0},
    gemini: 'Kore',
  },
  'CỐ VẤN': {
    // Cùng model với người dẫn nhưng chậm hơn và hạ cao độ 9% — cho ra một giọng
    // thứ hai phân biệt được mà vẫn giữ nguyên chất lượng của model tốt nhất.
    piper: {model: 'vi-25hours-single-low', length: 1.13, pitchShift: 0.91},
    espeak: {voice: 'vi+m3', speed: 136, pitch: 32},
    google: {name: 'vi-VN-Neural2-D', lang: 'vi-VN', rate: 0.9, pitch: -2.0},
    gemini: 'Charon',
  },
  // Giọng Mỹ mặc định cho câu mẫu. Đọc chậm hơn nhịp thường 8% vì học viên
  // shadowing theo — nhanh quá thì không bám kịp.
  ANH: {
    piper: {model: 'en-us-ryan-high', length: 1.08, pitchShift: 1.0},
    espeak: {voice: 'en-us', speed: 138, pitch: 45},
    google: {name: 'en-US-Neural2-D', lang: 'en-US', rate: 0.9, pitch: 0.0},
    gemini: 'Puck',
  },
  // Giọng Mỹ nữ — dùng khi cần hai người đối thoại bằng tiếng Anh.
  'ANH-NỮ': {
    piper: {model: 'en-us-libritts-high', speaker: 92, length: 1.08, pitchShift: 1.0},
    espeak: {voice: 'en-us+f3', speed: 138, pitch: 55},
    google: {name: 'en-US-Neural2-F', lang: 'en-US', rate: 0.9, pitch: 0.0},
    gemini: 'Aoede',
  },
  // Giọng Anh-Anh. IELTS dùng cả hai giọng nên học viên phải quen cả hai.
  'ANH-ANH': {
    piper: {model: 'en-gb-southern_english_female-low', length: 1.06, pitchShift: 1.0},
    espeak: {voice: 'en-gb-x-rp', speed: 138, pitch: 50},
    google: {name: 'en-GB-Neural2-A', lang: 'en-GB', rate: 0.9, pitch: 0.0},
    gemini: 'Kore',
  },
  'ANH-ANH-NAM': {
    piper: {model: 'en-gb-alan-low', length: 1.06, pitchShift: 1.0},
    espeak: {voice: 'en-gb', speed: 138, pitch: 42},
    google: {name: 'en-GB-Neural2-B', lang: 'en-GB', rate: 0.9, pitch: 0.0},
    gemini: 'Charon',
  },
};

/* --------------------------- tinh chỉnh nghe -----------------------------
 * Ba con số quyết định độ "liền mạch" của bản dựng. Sửa ở đây rồi dựng lại là
 * nghe khác ngay, không phải sửa kịch bản.
 * ------------------------------------------------------------------------ */
const MIX = {
  /* Kịch bản ghi khoảng nghỉ theo nhịp đọc của espeak (nhanh). Piper đọc chậm
   * và tự nhiên hơn nên giữ nguyên con số cũ sẽ thành lê thê. Nhân hệ số này. */
  pauseScale: TTS === 'piper' ? 0.68 : 1.0,
  /* Khoảng nghỉ tối thiểu và tối đa, tính bằng giây — chặn hai đầu cực đoan. */
  pauseMin: 0.22,
  pauseMax: 2.2,
  /* Khoảng lặng trong phòng thu không bao giờ là im lặng tuyệt đối. Nền nhiễu
   * cực nhỏ này không nghe thấy được nhưng xoá đi cảm giác "chết máy" giữa các
   * câu — đây là khác biệt lớn nhất giữa bản nghe như máy đọc và bản nghe như
   * podcast thật. */
  roomTone: -68,
  /* Vuốt đầu và cuối mỗi mảnh để không có tiếng tạch khi ghép. */
  fade: 0.014,
  /* Ngưỡng cắt khoảng lặng thừa mà piper tự chèn vào đầu và cuối mỗi câu. */
  trimThreshold: '-50dB',
};

/* ------------------------------ backend TTS ------------------------------ */

/** Mô tả một câu cần dựng bằng piper — dùng cho lô. */
function piperJob(line, out, dir) {
  const v = VOICES[line.s]?.piper ?? VOICES['DẪN'].piper;
  const model = join(PIPER_DIR, `${v.model}.onnx`);
  if (!existsSync(model)) {
    throw new Error(
      `Thiếu model ${v.model}.onnx trong ${PIPER_DIR} — chạy: bash tools/fetch-voices.sh`,
    );
  }
  return {
    job: {
      model,
      text: line.t,
      out: join(dir, `${out}-piper.wav`),
      length: v.length,
      // noise thấp hơn mặc định cho giọng đều và ít rung — dễ nghe hơn khi
      // nghe liên tục hai mươi phút.
      noise: 0.55,
      noise_w: 0.7,
      speaker: v.speaker ?? 0,
    },
    pitchShift: v.pitchShift ?? 1.0,
  };
}

/**
 * Dựng cả lô trong MỘT tiến trình Python. Piper nạp model mất vài giây; nếu gọi
 * lại tiến trình cho từng câu thì một tập ba mươi câu phải nạp ba mươi lần.
 * Gộp lô đưa số lần nạp về đúng bằng số model dùng trong tập.
 */
function piperBatch(jobs) {
  if (!jobs.length) return;
  const helper = join(dirname(fileURLToPath(import.meta.url)), 'piper_batch.py');
  execFileSync('python3', [helper], {
    input: JSON.stringify(jobs),
    stdio: ['pipe', 'pipe', 'pipe'],
    maxBuffer: 1 << 24,
  });
}

/** Hạ cao độ mà giữ nguyên thời lượng, để tách giọng cố vấn khỏi giọng dẫn. */
function pitchShift(inFile, outFile, factor) {
  const sr = Number(
    String(
      sh('ffprobe', [
        '-v', 'error',
        '-select_streams', 'a',
        '-show_entries', 'stream=sample_rate',
        '-of', 'csv=p=0',
        inFile,
      ]),
    ).trim(),
  );
  sh('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-i', inFile,
    '-af',
    `asetrate=${Math.round(sr * factor)},aresample=${sr},atempo=${(1 / factor).toFixed(4)}`,
    outFile,
  ]);
}

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

/*
 * Cảnh báo về thanh điệu tiếng Việt.
 *
 * Bảng ký hiệu của Piper là bảng IPA dùng chung 130 ký tự cho mọi ngôn ngữ và
 * KHÔNG có ký hiệu thanh điệu nào. espeak-ng phiên âm tiếng Việt có kèm thanh
 * bằng chữ số, nhưng mọi chữ số đó bị loại trước khi vào model — khoảng 14%
 * tổng số âm vị. Model chưa từng nhận được thông tin thanh điệu, kể cả lúc
 * huấn luyện, nên không hậu kỳ nào sửa được.
 *
 * Kiểm chứng: python3 tools/kiem-am-viet.py
 */
let daCanhBaoThanh = false;

function canhBaoThanhDieu(eps) {
  if (daCanhBaoThanh) return;
  const coTiengViet = eps.some((e) =>
    e.lines.some((l) => l.l === 'vi' && l.s !== 'LẶNG' && l.t),
  );
  if (!coTiengViet) return;
  daCanhBaoThanh = true;
  console.log(
    '\n  ⚠ CẢNH BÁO — GIỌNG VIỆT KHÔNG CÓ THANH ĐIỆU\n' +
      '    Backend piper đang dựng các dòng tiếng Việt bằng model không biểu\n' +
      '    diễn được thanh điệu. Sáu từ ma/mà/mả/mã/má/mạ đi vào model như\n' +
      '    một. Người nghe bản ngữ sẽ thấy sai ngay.\n' +
      '    Muốn giọng Việt chuẩn: --tts google  (cần GOOGLE_TTS_KEY)\n' +
      '    Kiểm chứng vấn đề:     python3 tools/kiem-am-viet.py\n',
  );
}

/* ------------------------------- dựng tập -------------------------------- */

/**
 * Khoảng nghỉ giữa các câu. Dùng nền nhiễu nâu cực nhỏ thay cho im lặng tuyệt
 * đối: tai người nghe ra ngay sự khác biệt giữa "phòng thu yên tĩnh" và "âm
 * thanh bị tắt", và chính chỗ đó tạo cảm giác đứt quãng.
 */
function silence(seconds, out) {
  sh('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'lavfi',
    '-i', `anoisesrc=color=brown:sample_rate=${RATE}:amplitude=1`,
    '-t', String(seconds),
    '-af', `volume=${MIX.roomTone}dB`,
    '-ac', '1',
    out,
  ]);
}

/**
 * Chuẩn hoá một mảnh giọng trước khi ghép.
 *
 * Bốn việc, theo đúng thứ tự:
 *   1. Cắt khoảng lặng thừa ở đầu và cuối — piper tự chèn khoảng 76ms mỗi câu,
 *      cộng với khoảng nghỉ trong kịch bản thành nghỉ đúp, nghe rời rạc.
 *   2. Vuốt 14ms hai đầu để chỗ ghép không có tiếng tạch.
 *   3. Cắt tần số dưới 75Hz — không có gì hữu ích ở đó, chỉ có ù nền.
 *   4. Đưa về cùng tần số lấy mẫu và một kênh.
 *
 * Mẹo areverse: ffmpeg chỉ vuốt được từ đầu file nếu không biết độ dài. Lật
 * ngược, vuốt đầu, lật lại — thành ra vuốt được cuối mà không cần đo độ dài.
 */
function normalise(inFile, outFile) {
  const trim = `silenceremove=start_periods=1:start_threshold=${MIX.trimThreshold}:start_silence=0.02:detection=peak`;
  const fade = `afade=t=in:st=0:d=${MIX.fade}`;
  sh('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-i', inFile,
    '-af',
    [trim, 'areverse', trim, fade, 'areverse', fade, 'highpass=f=75'].join(','),
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
  const isPiper = TTS === 'piper';
  const synth = BACKENDS[TTS];
  if (!isPiper && !synth) throw new Error(`Backend không hợp lệ: ${TTS}`);

  // Với piper, sinh toàn bộ giọng của tập trong một tiến trình duy nhất.
  const shifts = new Map();
  if (isPiper) {
    const jobs = [];
    ep.lines.forEach((line, i) => {
      if (line.s === 'LẶNG' || !line.t.trim()) return;
      const n = String(i).padStart(3, '0');
      const {job, pitchShift: f} = piperJob(line, n, dir);
      jobs.push(job);
      shifts.set(n, f);
    });
    piperBatch(jobs);
  }

  for (let i = 0; i < ep.lines.length; i++) {
    const line = ep.lines[i];
    const n = String(i).padStart(3, '0');

    if (line.s !== 'LẶNG' && line.t.trim()) {
      const raw = join(dir, `${n}-raw.wav`);
      const norm = join(dir, `${n}.wav`);
      if (isPiper) {
        const src = join(dir, `${n}-piper.wav`);
        const f = shifts.get(n) ?? 1.0;
        if (f !== 1.0) {
          pitchShift(src, raw, f);
        } else {
          sh('ffmpeg', ['-y', '-loglevel', 'error', '-i', src, raw]);
        }
      } else {
        await synth(line, raw);
      }
      normalise(raw, norm);
      parts.push(norm);
    }

    // Khoảng lặng ở dòng LẶNG là chủ đích của kịch bản — học viên cần đúng
    // mười lăm tới hai mươi giây để tự trả lời. Không co, không chặn trần.
    // Chỉ khoảng nghỉ giữa các câu nói mới bị căn lại theo nhịp đọc.
    const raw = line.p ?? 0.4;
    const pause =
      line.s === 'LẶNG'
        ? raw
        : Math.min(MIX.pauseMax, Math.max(MIX.pauseMin, raw * MIX.pauseScale));
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
    // Cắt ù dưới 70Hz · nhấc nhẹ dải hiện diện 2–4kHz cho rõ phụ âm · nén nhẹ
    // để chênh lệch to nhỏ giữa các câu không làm người nghe phải chỉnh loa ·
    // chuẩn hoá về -16 LUFS theo chuẩn podcast.
    '-af',
    [
      'highpass=f=70',
      'equalizer=f=3000:t=q:w=1.1:g=2.2',
      'equalizer=f=180:t=q:w=1.0:g=-1.4',
      'acompressor=threshold=-20dB:ratio=2.4:attack=8:release=180:makeup=1.5',
      'loudnorm=I=-16:TP=-1.5:LRA=9',
    ].join(','),
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
  if (TTS === 'piper') {
    try {
      execFileSync('python3', ['-m', 'piper', '--help'], {stdio: 'ignore'});
    } catch {
      console.error('Thiếu piper. Cài bằng: pip install piper-tts');
      process.exit(1);
    }
    const need = [...new Set(Object.values(VOICES).map((v) => v.piper.model))];
    const missing = need.filter(
      (m) => !existsSync(join(PIPER_DIR, `${m}.onnx`)),
    );
    if (missing.length) {
      console.error(`\n  Thiếu model giọng trong ${PIPER_DIR}:`);
      missing.forEach((m) => console.error(`    ${m}.onnx`));
      console.error('\n  Tải bằng: bash tools/fetch-voices.sh\n');
      process.exit(1);
    }
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

  if (TTS === 'piper' || TTS === 'espeak') canhBaoThanhDieu(eps);

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
