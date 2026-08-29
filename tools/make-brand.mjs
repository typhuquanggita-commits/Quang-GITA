#!/usr/bin/env node
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ENGWILL365 — dựng bộ nhận diện.
 *
 *   node tools/make-brand.mjs            # dựng tất cả, SVG + PNG
 *   node tools/make-brand.mjs --only logo
 *   node tools/make-brand.mjs --svg-only # bỏ qua bước xuất PNG
 *
 * Mọi ấn phẩm được sinh từ dữ liệu, không vẽ tay. Thêm một cấp độ trong
 * data/levels.ts là có thêm một huy hiệu; đổi một mã màu trong data/brand.ts là
 * toàn bộ bộ ấn phẩm đổi theo.
 *
 * Cần: rsvg-convert (apt-get install -y librsvg2-bin) và font Inter
 *      (apt-get install -y fonts-inter).
 */

import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'brand');

const argv = process.argv.slice(2);
const only = (() => {
  const i = argv.indexOf('--only');
  return i >= 0 ? argv[i + 1] : null;
})();
const svgOnly = argv.includes('--svg-only');

/* ----------------------- đọc dữ liệu từ nguồn TS ------------------------- */

/**
 * data/*.ts là TypeScript nên Node không nạp trực tiếp được. Thay vì thêm bước
 * biên dịch, ta trích đúng những mảng cần bằng biểu thức chính quy. Đổi dữ liệu
 * trong file TS là công cụ này thấy ngay, không cần đồng bộ tay.
 */
function readTs(file) {
  return readFileSync(join(ROOT, 'data', file), 'utf8');
}

function extractTiers() {
  const src = readTs('brand.ts');
  const block = src.slice(src.indexOf('export const TIER_COLORS'));
  return [...block.matchAll(
    /\{tier:\s*(\d+),\s*code:\s*'([^']+)',\s*from:\s*'([^']+)',\s*to:\s*'([^']+)'\}/g,
  )].map((m) => ({tier: +m[1], code: m[2], from: m[3], to: m[4]}));
}

function extractLevels() {
  const src = readTs('levels.ts');
  return [...src.matchAll(
    /id:\s*'(L\d-\d)',[\s\S]*?tierId:\s*'(tier-\d)',\s*no:\s*(\d+),\s*name:\s*'([^']+)',\s*epithet:\s*'([^']+)'/g,
  )].map((m) => ({id: m[1], tierId: m[2], no: +m[3], name: m[4], epithet: m[5]}));
}

function extractFormats() {
  const raw = JSON.parse(
    readFileSync(join(ROOT, 'content', 'podcast-scripts.json'), 'utf8'),
  );
  return {series: raw.series, formats: raw.formats};
}

const TIERS = extractTiers();
const LEVELS = extractLevels();
const {series: SERIES, formats: FORMATS} = extractFormats();

const INK = '#020617';
const PAPER = '#FAFAF9';
const BRIGHT = '#F1F5F9';
const MUTED = '#64748B';

/* ------------------------------ tiện ích --------------------------------- */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

let count = {svg: 0, png: 0};

function write(rel, svg) {
  const path = join(OUT, rel);
  mkdirSync(dirname(path), {recursive: true});
  writeFileSync(path, svg);
  count.svg++;
  return path;
}

function raster(svgPath, width) {
  if (svgOnly) return;
  const png = svgPath.replace(/\.svg$/, '.png');
  try {
    execFileSync('rsvg-convert', ['-w', String(width), '-o', png, svgPath], {
      stdio: 'pipe',
    });
    count.png++;
  } catch (e) {
    console.error(`  xuất PNG lỗi: ${svgPath} — ${e.message.slice(0, 80)}`);
  }
}

/* ------------------------------- LOGO ------------------------------------ */

/**
 * Dấu hiệu: một vòng tròn CÒN HỞ (365 ngày, khoảng hở là ngày hôm nay chưa học)
 * bao quanh năm vạch đi lên (năm tầng của tháp học tập, chuyển màu hồng → tím).
 */
function monogram({size = 512, ring = true} = {}) {
  const c = size / 2;
  const r = size * 0.42;
  const sw = size * 0.075;

  // Cung hở: bắt đầu -100°, quét 320°, chừa 40° ở phía trên bên phải.
  const a0 = (-100 * Math.PI) / 180;
  const a1 = (220 * Math.PI) / 180;
  const p = (a) => `${(c + r * Math.cos(a)).toFixed(2)} ${(c + r * Math.sin(a)).toFixed(2)}`;
  const arc = `M ${p(a0)} A ${r} ${r} 0 1 1 ${p(a1)}`;

  // Năm vạch đi lên, canh giữa trong vòng.
  const bw = size * 0.072;
  const gap = size * 0.038;
  const totalW = 5 * bw + 4 * gap;
  const x0 = c - totalW / 2;
  const baseY = c + size * 0.155;
  const heights = [0.11, 0.165, 0.22, 0.275, 0.33].map((h) => h * size);

  const bars = heights
    .map((h, i) => {
      const x = x0 + i * (bw + gap);
      return `<rect x="${x.toFixed(2)}" y="${(baseY - h).toFixed(2)}" width="${bw.toFixed(2)}" height="${h.toFixed(2)}" rx="${(bw / 2).toFixed(2)}" fill="url(#tier${i + 1})"/>`;
    })
    .join('');

  const grads = TIERS.map(
    (t, i) =>
      `<linearGradient id="tier${i + 1}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${t.from}"/><stop offset="1" stop-color="${t.to}"/></linearGradient>`,
  ).join('');

  return {
    defs: `${grads}<linearGradient id="ringGrad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${TIERS[0].from}"/><stop offset="0.5" stop-color="${TIERS[2].to}"/><stop offset="1" stop-color="${TIERS[4].to}"/></linearGradient>`,
    body: `${ring ? `<path d="${arc}" fill="none" stroke="url(#ringGrad)" stroke-width="${sw.toFixed(2)}" stroke-linecap="round"/>` : ''}${bars}`,
  };
}

function logoMonogram(dark = true) {
  const S = 512;
  const m = monogram({size: S});
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
<defs>${m.defs}</defs>
<rect width="${S}" height="${S}" rx="112" fill="${dark ? INK : PAPER}"/>
${m.body}
</svg>`;
}

function wordmark(x, y, fs, dark = true) {
  return `<text x="${x}" y="${y}" font-family="Inter Display, Inter, sans-serif" font-size="${fs}" font-weight="800" letter-spacing="${(-0.03 * fs).toFixed(2)}" fill="${dark ? BRIGHT : INK}">ENGWILL<tspan fill="url(#ringGrad)">365</tspan></text>`;
}

function logoHorizontal(dark = true) {
  const H = 160;
  const W = 700;
  const mark = 120;
  const m = monogram({size: mark});
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>${m.defs}</defs>
<rect width="${W}" height="${H}" fill="${dark ? INK : PAPER}"/>
<g transform="translate(24 20)">${m.body}</g>
${wordmark(180, 88, 54, dark)}
<text x="182" y="118" font-family="Inter, sans-serif" font-size="15" font-weight="500" letter-spacing="2.6" fill="${MUTED}">0 → IELTS 8.0 · 1.095 NGÀY</text>
</svg>`;
}

function logoStacked(dark = true) {
  const W = 520;
  const H = 620;
  const mark = 300;
  const m = monogram({size: mark});
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>${m.defs}</defs>
<rect width="${W}" height="${H}" fill="${dark ? INK : PAPER}"/>
<g transform="translate(${(W - mark) / 2} 40)">${m.body}</g>
<g text-anchor="middle">
${wordmark(W / 2, 445, 62, dark).replace('<text ', '<text text-anchor="middle" ')}
<text x="${W / 2}" y="482" font-family="Inter, sans-serif" font-size="16" font-weight="500" letter-spacing="3" fill="${MUTED}">ENGLISH + WILL + 365</text>
<text x="${W / 2}" y="546" font-family="Inter, sans-serif" font-size="19" font-weight="400" fill="${dark ? '#94A3B8' : '#475569'}">Tiếng Anh không phải tài năng,</text>
<text x="${W / 2}" y="574" font-family="Inter, sans-serif" font-size="19" font-weight="400" fill="${dark ? '#94A3B8' : '#475569'}">là Ý CHÍ nhân với 365 ngày.</text>
</g>
</svg>`;
}

function logoWordmarkOnly(dark = true) {
  const W = 620;
  const H = 130;
  const m = monogram({size: 10});
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>${m.defs}</defs>
<rect width="${W}" height="${H}" fill="${dark ? INK : PAPER}"/>
${wordmark(24, 78, 62, dark)}
<text x="26" y="108" font-family="Inter, sans-serif" font-size="14" font-weight="500" letter-spacing="2.8" fill="${MUTED}">0 → IELTS 8.0 · 1.095 NGÀY</text>
</svg>`;
}

/* ---------------------------- HUY HIỆU ----------------------------------- */

function tierEmblem(t) {
  const S = 512;
  const c = S / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
<defs>
<linearGradient id="g" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${t.from}"/><stop offset="1" stop-color="${t.to}"/></linearGradient>
<linearGradient id="glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.to}" stop-opacity="0.18"/><stop offset="1" stop-color="${t.from}" stop-opacity="0"/></linearGradient>
</defs>
<rect width="${S}" height="${S}" rx="112" fill="${INK}"/>
<rect width="${S}" height="${S}" rx="112" fill="url(#glow)"/>
<circle cx="${c}" cy="${c}" r="196" fill="none" stroke="url(#g)" stroke-width="6" opacity="0.35"/>
<circle cx="${c}" cy="${c}" r="168" fill="none" stroke="url(#g)" stroke-width="14"/>
<text x="${c}" y="${c - 34}" text-anchor="middle" font-family="Inter Display, Inter, sans-serif" font-size="132" font-weight="900" fill="url(#g)">${t.tier}</text>
<text x="${c}" y="${c + 34}" text-anchor="middle" font-family="Inter, sans-serif" font-size="15" font-weight="600" letter-spacing="4" fill="${MUTED}">TẦNG</text>
<text x="${c}" y="${c + 96}" text-anchor="middle" font-family="Inter Display, Inter, sans-serif" font-size="40" font-weight="800" letter-spacing="1" fill="${BRIGHT}">${esc(t.code)}</text>
</svg>`;
}

function levelBadge(lv, t) {
  const S = 512;
  const c = S / 2;
  // Năm chấm chỉ vị trí cấp trong tầng — nhìn là biết đang ở cấp mấy.
  const dots = [1, 2, 3, 4, 5]
    .map((n) => {
      const x = c - 72 + (n - 1) * 36;
      const on = n <= lv.no;
      return `<circle cx="${x}" cy="${S - 92}" r="${on ? 9 : 6}" fill="${on ? 'url(#g)' : '#1E293B'}"/>`;
    })
    .join('');

  const name = esc(lv.name);
  const fs = name.length > 11 ? 44 : name.length > 8 ? 52 : 60;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
<defs>
<linearGradient id="g" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${t.from}"/><stop offset="1" stop-color="${t.to}"/></linearGradient>
<linearGradient id="glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.to}" stop-opacity="0.16"/><stop offset="1" stop-color="${t.from}" stop-opacity="0"/></linearGradient>
</defs>
<rect width="${S}" height="${S}" rx="112" fill="${INK}"/>
<rect width="${S}" height="${S}" rx="112" fill="url(#glow)"/>
<rect x="18" y="18" width="${S - 36}" height="${S - 36}" rx="96" fill="none" stroke="url(#g)" stroke-width="3" opacity="0.4"/>
<text x="${c}" y="118" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="600" letter-spacing="4" fill="${MUTED}">${esc(t.code)} · CẤP ${lv.no}</text>
<g transform="translate(${c - 40} 150)">
  <rect x="0" y="52" width="14" height="28" rx="7" fill="url(#g)" opacity="0.5"/>
  <rect x="22" y="38" width="14" height="42" rx="7" fill="url(#g)" opacity="0.68"/>
  <rect x="44" y="22" width="14" height="58" rx="7" fill="url(#g)" opacity="0.84"/>
  <rect x="66" y="4" width="14" height="76" rx="7" fill="url(#g)"/>
</g>
<text x="${c}" y="${c + 66}" text-anchor="middle" font-family="Inter Display, Inter, sans-serif" font-size="${fs}" font-weight="900" letter-spacing="-1" fill="${BRIGHT}">${name}</text>
<text x="${c}" y="${c + 106}" text-anchor="middle" font-family="Inter, sans-serif" font-size="15" font-weight="400" fill="${MUTED}">${esc(lv.epithet.length > 46 ? lv.epithet.slice(0, 44) + '…' : lv.epithet)}</text>
${dots}
</svg>`;
}

/* --------------------------- BÌA PODCAST --------------------------------- */

function podcastCover(title, subtitle, tierIdx, big) {
  const S = 3000;
  const t = TIERS[tierIdx % TIERS.length];
  const m = monogram({size: 620});
  const words = String(title).split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > 15) {
      lines.push(cur.trim());
      cur = w;
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}">
<defs>${m.defs}
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${INK}"/><stop offset="1" stop-color="#0B1220"/></linearGradient>
<linearGradient id="acc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.from}"/><stop offset="1" stop-color="${t.to}"/></linearGradient>
<radialGradient id="halo" cx="0.5" cy="0.28" r="0.55"><stop offset="0" stop-color="${t.to}" stop-opacity="0.22"/><stop offset="1" stop-color="${t.to}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${S}" height="${S}" fill="url(#bg)"/>
<rect width="${S}" height="${S}" fill="url(#halo)"/>
<g transform="translate(${(S - 620) / 2} 300)">${m.body}</g>
<text x="${S / 2}" y="1200" text-anchor="middle" font-family="Inter Display, Inter, sans-serif" font-size="150" font-weight="900" letter-spacing="-4" fill="${BRIGHT}">ENGWILL<tspan fill="url(#acc)">365</tspan></text>
<text x="${S / 2}" y="1310" text-anchor="middle" font-family="Inter, sans-serif" font-size="62" font-weight="600" letter-spacing="22" fill="${MUTED}">RADIO</text>
<rect x="${S / 2 - 120}" y="1420" width="240" height="10" rx="5" fill="url(#acc)"/>
${lines
    .map(
      (l, i) =>
        `<text x="${S / 2}" y="${1680 + i * (big ? 210 : 190)}" text-anchor="middle" font-family="Inter Display, Inter, sans-serif" font-size="${big ? 190 : 168}" font-weight="800" letter-spacing="-4" fill="url(#acc)">${esc(l)}</text>`,
    )
    .join('\n')}
<text x="${S / 2}" y="${1760 + lines.length * (big ? 210 : 190)}" text-anchor="middle" font-family="Inter, sans-serif" font-size="72" font-weight="400" fill="#94A3B8">${esc(subtitle)}</text>
<text x="${S / 2}" y="${S - 190}" text-anchor="middle" font-family="Inter, sans-serif" font-size="58" font-weight="400" fill="${MUTED}">${esc(SERIES.tagline)}</text>
</svg>`;
}

/* ---------------------------- SƠ ĐỒ DẠY ---------------------------------- */

function diagramPyramid() {
  const W = 1500;
  const H = 900;
  // Chỉ mục 0..4 ứng với tầng 1..5.
  const names = [
    ['KHAI NHĨ', 'Nghe · Đọc · Tiếp nhận', '~10–20%'],
    ['KHAI NHÃN', 'Xem · Săn cấu trúc', '~30%'],
    ['KHAI KHẨU', 'Nói · Thảo luận', '~50%'],
    ['KHAI THỦ', 'Làm ra sản phẩm', '~75%'],
    ['KHAI ĐẠO', 'Dạy lại người khác', '~90%'],
  ];

  // Vẽ từ đỉnh xuống: hàng trên cùng là tầng 5, hàng dưới cùng là tầng 1.
  const rows = [4, 3, 2, 1, 0]
    .map((idx, row) => {
      const [name, mode, pct] = names[idx];
      const y = 120 + row * 132;
      // Thu hẹp vừa phải để hàng ngắn nhất vẫn đủ chỗ cho tên và tỉ lệ.
      const inset = row * 52;
      const w = W - 340 - inset * 2;
      const x = 190 + inset;
      return `<g>
<rect x="${x}" y="${y}" width="${w}" height="112" rx="14" fill="url(#p${idx})" opacity="0.14"/>
<rect x="${x}" y="${y}" width="6" height="112" rx="3" fill="url(#p${idx})"/>
<text x="${x + 30}" y="${y + 46}" font-family="Inter Display, Inter, sans-serif" font-size="34" font-weight="800" fill="${BRIGHT}">${name}</text>
<text x="${x + 30}" y="${y + 80}" font-family="Inter, sans-serif" font-size="20" font-weight="400" fill="#94A3B8">${mode}</text>
<text x="${x + w - 30}" y="${y + 68}" text-anchor="end" font-family="Inter Display, Inter, sans-serif" font-size="40" font-weight="800" fill="url(#p${idx})">${pct}</text>
<text x="${x - 34}" y="${y + 68}" text-anchor="end" font-family="Inter Display, Inter, sans-serif" font-size="46" font-weight="900" fill="#1E293B">${idx + 1}</text>
</g>`;
    })
    .join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>${TIERS.map((t, i) => `<linearGradient id="p${i}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.from}"/><stop offset="1" stop-color="${t.to}"/></linearGradient>`).join('')}</defs>
<rect width="${W}" height="${H}" fill="${INK}"/>
<text x="190" y="72" font-family="Inter Display, Inter, sans-serif" font-size="42" font-weight="900" letter-spacing="-1" fill="${BRIGHT}">THÁP HỌC TẬP 5 TẦNG</text>
${rows}
<text x="190" y="${H - 60}" font-family="Inter, sans-serif" font-size="21" font-weight="400" fill="${MUTED}">Càng lên cao, tỉ lệ ghi nhớ càng lớn — và học viên càng phải chủ động.</text>
<text x="190" y="${H - 28}" font-family="Inter, sans-serif" font-size="21" font-weight="400" fill="${MUTED}">Mọi tầng dưới chỉ là đường dẫn tới tầng đỉnh: dạy lại cho người khác.</text>
</svg>`;
}

function diagramTrajectory() {
  const W = 1400;
  const H = 760;
  const pad = {l: 130, r: 90, t: 110, b: 110};
  const pts = [
    [0, 0], [3, 3], [6, 4], [9, 4.5], [12, 5], [15, 5.5],
    [18, 6], [21, 6.5], [24, 6.5], [27, 7], [30, 7.5], [33, 7.5], [36, 8],
  ];
  const x = (m) => pad.l + (m / 36) * (W - pad.l - pad.r);
  const y = (b) => H - pad.b - (b / 9) * (H - pad.t - pad.b);
  const line = pts.map(([m, b]) => `${x(m).toFixed(1)},${y(b).toFixed(1)}`).join(' ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
<linearGradient id="tg" x1="0" y1="0" x2="1" y2="0">${TIERS.map((t, i) => `<stop offset="${i / 4}" stop-color="${t.from}"/>`).join('')}<stop offset="1" stop-color="${TIERS[4].to}"/></linearGradient>
<linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#38BDF8" stop-opacity="0.2"/><stop offset="1" stop-color="#38BDF8" stop-opacity="0"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="${INK}"/>
<text x="${pad.l}" y="62" font-family="Inter Display, Inter, sans-serif" font-size="42" font-weight="900" letter-spacing="-1" fill="${BRIGHT}">QUỸ ĐẠO 36 THÁNG</text>
${[0, 2, 4, 6, 8].map((b) => `<line x1="${pad.l}" y1="${y(b)}" x2="${W - pad.r}" y2="${y(b)}" stroke="#1E293B" stroke-width="1.5"/><text x="${pad.l - 22}" y="${y(b) + 8}" text-anchor="end" font-family="Inter, sans-serif" font-size="20" fill="${MUTED}">${b.toFixed(1)}</text>`).join('')}
${[12, 24, 36].map((m) => `<line x1="${x(m)}" y1="${pad.t}" x2="${x(m)}" y2="${H - pad.b}" stroke="#1E293B" stroke-width="1.5" stroke-dasharray="6 8"/><text x="${x(m)}" y="${H - pad.b + 40}" text-anchor="middle" font-family="Inter, sans-serif" font-size="21" fill="${MUTED}">Tháng ${m}</text>`).join('')}
<polygon points="${x(0)},${y(0)} ${line} ${x(36)},${y(0)}" fill="url(#fill)"/>
<polyline points="${line}" fill="none" stroke="url(#tg)" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
${pts.map(([m, b]) => `<circle cx="${x(m)}" cy="${y(b)}" r="8" fill="${INK}" stroke="#38BDF8" stroke-width="4"/>`).join('')}
${[[12, 5, 'B1'], [24, 6.5, 'B2+'], [36, 8, 'C1+']].map(([m, b, l]) => `<text x="${x(m)}" y="${y(b) - 28}" text-anchor="middle" font-family="Inter Display, Inter, sans-serif" font-size="30" font-weight="800" fill="${BRIGHT}">${b.toFixed(1)}</text><text x="${x(m)}" y="${y(b) - 60}" text-anchor="middle" font-family="Inter, sans-serif" font-size="19" fill="${MUTED}">${l}</text>`).join('')}
</svg>`;
}

function diagramLinking() {
  const W = 1400;
  const H = 620;
  const rows = [
    ['an  apple', 'a·napple', 'Phụ âm cuối nhảy sang nguyên âm đầu'],
    ['picked  up', 'pick·tup', 'Âm /d/ đọc thành /t/ rồi nối sang'],
    ['what do you', 'whaddaya', 'Nuốt âm và đồng hoá'],
    ['next  day', 'neks·day', 'Rụng âm /t/ giữa hai phụ âm'],
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${TIERS[0].from}"/><stop offset="1" stop-color="${TIERS[2].to}"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="${INK}"/>
<text x="120" y="72" font-family="Inter Display, Inter, sans-serif" font-size="42" font-weight="900" letter-spacing="-1" fill="${BRIGHT}">VÌ SAO BẠN NGHE KHÔNG RA</text>
<text x="120" y="112" font-family="Inter, sans-serif" font-size="22" fill="${MUTED}">Bạn biết hết các từ. Vấn đề là khi chúng dính vào nhau.</text>
${rows
    .map(([a, b, note], i) => {
      const y = 190 + i * 100;
      return `<g>
<text x="120" y="${y}" font-family="DejaVu Sans Mono, monospace" font-size="34" fill="#94A3B8">${esc(a)}</text>
<text x="500" y="${y}" font-family="Inter, sans-serif" font-size="30" fill="${MUTED}">→</text>
<text x="560" y="${y}" font-family="DejaVu Sans Mono, monospace" font-size="34" font-weight="bold" fill="url(#lg)">${esc(b)}</text>
<text x="900" y="${y}" font-family="Inter, sans-serif" font-size="20" fill="${MUTED}">${esc(note)}</text>
</g>`;
    })
    .join('\n')}
<rect x="120" y="${H - 110}" width="${W - 240}" height="4" rx="2" fill="#1E293B"/>
<text x="120" y="${H - 60}" font-family="Inter, sans-serif" font-size="22" fill="#94A3B8">Cách chữa: chép chính tả 45 giây mỗi ngày, phân loại lỗi thành ba nhóm.</text>
</svg>`;
}

function diagramVowels() {
  const W = 1200;
  const H = 760;
  // Trục ngang: lưỡi trước → sau. Trục dọc: lưỡi cao → thấp.
  // Toạ độ đã giãn để không vòng tròn nào chồng lên vòng khác.
  const V = [
    ['iː', 0.10, 0.05, 'sheep'],
    ['ɪ', 0.24, 0.18, 'ship'],
    ['e', 0.20, 0.42, 'bed'],
    ['æ', 0.30, 0.85, 'cat'],
    ['ʌ', 0.60, 0.72, 'cup'],
    ['ɑː', 0.72, 0.88, 'car'],
    ['ɒ', 0.86, 0.80, 'hot'],
    ['ɔː', 0.90, 0.55, 'saw'],
    ['ʊ', 0.76, 0.22, 'book'],
    ['uː', 0.92, 0.05, 'blue'],
    ['ɜː', 0.46, 0.46, 'bird'],
    ['ə', 0.58, 0.28, 'about'],
  ];
  const px = (v) => 220 + v * (W - 400);
  const py = (v) => 190 + v * (H - 380);

  // Hình thang chuẩn của bảng nguyên âm: cạnh trên rộng, cạnh dưới thu vào bên trái.
  const quad = [
    [0.06, 0.0], [0.96, 0.0], [0.92, 0.96], [0.26, 0.96],
  ]
    .map(([a, b]) => `${px(a).toFixed(0)},${py(b).toFixed(0)}`)
    .join(' ');

  /** Ký hiệu độ dài ː vẽ nhỏ lại cho cân với chữ cái. */
  const sym = (s) =>
    s.endsWith('ː')
      ? `${esc(s.slice(0, -1))}<tspan font-size="0.62em" dy="-0.04em">ː</tspan>`
      : esc(s);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs><linearGradient id="vg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${TIERS[0].from}"/><stop offset="1" stop-color="${TIERS[4].to}"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="${INK}"/>
<text x="120" y="68" font-family="Inter Display, Inter, sans-serif" font-size="40" font-weight="900" letter-spacing="-1" fill="${BRIGHT}">12 NGUYÊN ÂM ĐƠN</text>
<text x="120" y="106" font-family="Inter, sans-serif" font-size="20" fill="${MUTED}">Vị trí lưỡi trong khoang miệng — càng sang phải lưỡi càng lùi về sau.</text>
<polygon points="${quad}" fill="none" stroke="#1E293B" stroke-width="2.5"/>
<text x="${px(0.04)}" y="${py(0) - 22}" font-family="Inter, sans-serif" font-size="16" letter-spacing="2.5" fill="${MUTED}">TRƯỚC</text>
<text x="${px(0.88)}" y="${py(0) - 22}" font-family="Inter, sans-serif" font-size="16" letter-spacing="2.5" fill="${MUTED}">SAU</text>
<text x="${px(0.06) - 22}" y="${py(0.02)}" text-anchor="end" font-family="Inter, sans-serif" font-size="16" letter-spacing="2.5" fill="${MUTED}">CAO</text>
<text x="${px(0.26) - 22}" y="${py(0.96)}" text-anchor="end" font-family="Inter, sans-serif" font-size="16" letter-spacing="2.5" fill="${MUTED}">THẤP</text>
${V.map(
    ([s, cx, cy, ex]) => `<g>
<circle cx="${px(cx).toFixed(0)}" cy="${py(cy).toFixed(0)}" r="33" fill="url(#vg)" opacity="0.16"/>
<circle cx="${px(cx).toFixed(0)}" cy="${py(cy).toFixed(0)}" r="33" fill="none" stroke="url(#vg)" stroke-width="2.5"/>
<text x="${px(cx).toFixed(0)}" y="${(py(cy) + 11).toFixed(0)}" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-size="29" font-weight="bold" fill="${BRIGHT}">${sym(s)}</text>
<text x="${px(cx).toFixed(0)}" y="${(py(cy) + 56).toFixed(0)}" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" fill="${MUTED}">${esc(ex)}</text>
</g>`,
  ).join('\n')}
<text x="120" y="${H - 34}" font-family="Inter, sans-serif" font-size="19" fill="${MUTED}">Cặp dễ nhầm nhất với người Việt: iː/ɪ (sheep–ship) · æ/ʌ (cat–cup) · ɜː/ə (bird–about)</text>
</svg>`;
}

/* ------------------------------ THẺ TRÍCH -------------------------------- */

function quoteCard(text, source, tierIdx, portrait = false) {
  const W = 1080;
  const H = portrait ? 1920 : 1080;
  const t = TIERS[tierIdx % TIERS.length];
  const m = monogram({size: 92});
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > 26) {
      lines.push(cur.trim());
      cur = w;
    } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  const startY = H / 2 - (lines.length * 78) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>${m.defs}
<linearGradient id="q" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${t.from}"/><stop offset="1" stop-color="${t.to}"/></linearGradient>
<radialGradient id="h" cx="0.5" cy="0.3" r="0.7"><stop offset="0" stop-color="${t.to}" stop-opacity="0.14"/><stop offset="1" stop-color="${t.to}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="${INK}"/>
<rect width="${W}" height="${H}" fill="url(#h)"/>
<rect x="96" y="${startY - 92}" width="90" height="8" rx="4" fill="url(#q)"/>
${lines.map((l, i) => `<text x="96" y="${startY + i * 78}" font-family="Inter Display, Inter, sans-serif" font-size="62" font-weight="800" letter-spacing="-1.5" fill="${BRIGHT}">${esc(l)}</text>`).join('\n')}
<text x="96" y="${startY + lines.length * 78 + 62}" font-family="Inter, sans-serif" font-size="28" font-weight="400" fill="${MUTED}">${esc(source)}</text>
<g transform="translate(96 ${H - 150})">${m.body}</g>
<text x="206" y="${H - 92}" font-family="Inter Display, Inter, sans-serif" font-size="34" font-weight="800" letter-spacing="-1" fill="${BRIGHT}">ENGWILL<tspan fill="url(#q)">365</tspan></text>
</svg>`;
}

/* --------------------------------- CHẠY ---------------------------------- */

const groups = {
  logo() {
    for (const dark of [true, false]) {
      const s = dark ? 'dark' : 'light';
      raster(write(`logo/monogram-${s}.svg`, logoMonogram(dark)), 512);
      raster(write(`logo/horizontal-${s}.svg`, logoHorizontal(dark)), 1400);
      raster(write(`logo/stacked-${s}.svg`, logoStacked(dark)), 1040);
      raster(write(`logo/wordmark-${s}.svg`, logoWordmarkOnly(dark)), 1240);
    }
    raster(write('logo/favicon.svg', logoMonogram(true)), 128);
  },
  tier() {
    TIERS.forEach((t) =>
      raster(write(`tier/tang-${t.tier}-${slug(t.code)}.svg`, tierEmblem(t)), 512),
    );
  },
  level() {
    LEVELS.forEach((lv) => {
      const t = TIERS[Number(lv.tierId.split('-')[1]) - 1];
      raster(
        write(`level/${lv.id}-${slug(lv.name)}.svg`, levelBadge(lv, t)),
        512,
      );
    });
  },
  podcast() {
    raster(
      write('podcast/cover-series.svg', podcastCover('ENGWILL RADIO', 'Podcast đồng hành', 2, true)),
      1400,
    );
    FORMATS.forEach((f, i) =>
      raster(
        write(`podcast/cover-${slug(f.name)}.svg`, podcastCover(f.name, f.duration, i, false)),
        1400,
      ),
    );
  },
  diagram() {
    raster(write('diagram/thap-hoc-tap.svg', diagramPyramid()), 2000);
    raster(write('diagram/quy-dao-36-thang.svg', diagramTrajectory()), 2000);
    raster(write('diagram/noi-am.svg', diagramLinking()), 2000);
    raster(write('diagram/nguyen-am-ipa.svg', diagramVowels()), 1800);
  },
  card() {
    const quotes = [
      ['Người thắng không phải người học nhiều nhất trong một ngày, mà là người không bỏ ngày nào trong 1.095 ngày.', 'Đặt cược lớn của hệ thống', 4],
      ['Một ngày lỡ là tai nạn. Hai ngày lỡ là khởi đầu của việc bỏ cuộc.', 'Luật số 1 — Không Số Không', 0],
      ['Lỗi là dữ liệu, không phải bản án.', 'Tư duy 20/80 — nước đi số 1', 3],
      ['Hiểu 92% và đọc tiếp mạnh hơn hiểu 100% và bỏ cuộc.', 'Mô-đun tư duy — Mơ hồ', 2],
      ['Ngày tệ nhất, tôi vẫn ôn năm thẻ — không phải để tiến bộ, mà để giữ con người mình.', 'Tuyên ngôn', 1],
    ];
    quotes.forEach(([q, s, i], n) => {
      raster(write(`card/quote-${n + 1}.svg`, quoteCard(q, s, i, false)), 1080);
      raster(write(`card/quote-${n + 1}-doc.svg`, quoteCard(q, s, i, true)), 1080);
    });
  },
};

function slug(s) {
  return String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

if (!svgOnly) {
  try {
    execFileSync('which', ['rsvg-convert'], {stdio: 'ignore'});
  } catch {
    console.error(
      '\n  Thiếu rsvg-convert. Cài bằng: apt-get install -y librsvg2-bin fonts-inter\n  Hoặc chạy với --svg-only để chỉ sinh SVG.\n',
    );
    process.exit(1);
  }
}

mkdirSync(OUT, {recursive: true});
console.log('\n  ENGWILL365 — dựng bộ nhận diện\n');

const todo = only ? [only] : Object.keys(groups);
for (const g of todo) {
  if (!groups[g]) {
    console.error(`  Nhóm không hợp lệ: ${g} (có: ${Object.keys(groups).join(', ')})`);
    process.exit(1);
  }
  const before = {...count};
  groups[g]();
  console.log(
    `  ${g.padEnd(10)} ${String(count.svg - before.svg).padStart(3)} SVG` +
      (svgOnly ? '' : ` · ${String(count.png - before.png).padStart(3)} PNG`),
  );
}

console.log(
  `\n  Tổng ${count.svg} SVG${svgOnly ? '' : ` · ${count.png} PNG`} → thư mục brand/\n`,
);
