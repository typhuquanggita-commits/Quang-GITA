/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Chuyển bản dựng một-tệp thành tệp đăng được lên Artifact.
 *
 * Artifact tự bọc nội dung trong khung <!doctype><html><head></head><body>,
 * nên tệp gửi lên KHÔNG được mang khung của riêng nó. Công cụ này bóc vỏ, giữ
 * lại phần đầu và phần thân, rồi chèn thêm một lớp CSS nền.
 *
 * Vì sao cần lớp CSS đó: khung của Artifact đặt nền sáng và phông hệ thống
 * 14px. App này cam kết một giao diện tối duy nhất; nếu không sơn nền và phông
 * rõ ràng thì trang sẽ mượn nền của vật chủ và chữ thành không đọc được.
 *
 * Chạy:  SINGLE=1 npm run build && node tools/xuat-mot-tep.mjs
 */
import {readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const NGUON = path.join(ROOT, 'dist', 'index.html');
const DICH = path.join(ROOT, 'engwin365-artifact.html');

// Tên sản phẩm, không kèm lời giải thích. Đây là tên hiện trên thẻ trình duyệt
// và trong thư viện Artifact, nên nó phải là MỘT CÁI TÊN.
const TIEU_DE = 'ENGWIN365';

const NEN = `<title>${TIEU_DE}</title>
<style>
  /* App cam kết một giao diện tối duy nhất. Khung của Artifact đặt nền sáng và
     phông hệ thống 14px, nên phải ghi đè rõ ràng ở đây — để trống thì trang sẽ
     mượn nền của vật chủ và chữ thành không đọc được. */
  html { background: #020617; color-scheme: dark; }
  body {
    margin: 0;
    background: #020617;
    color: #e2e8f0;
    font-size: 16px;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  :focus-visible { outline: 2px solid #38bdf8; outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>`;

const src = readFileSync(NGUON, 'utf8');

if (!src.includes('<script type="module"')) {
  console.error(
    '  Bản dựng chưa được gộp thành một tệp.\n' +
      '  Chạy:  SINGLE=1 npm run build\n',
  );
  process.exit(1);
}

const lay = (the) => {
  const mo = src.indexOf(`<${the}`);
  const dong = src.indexOf(`</${the}`);
  if (mo < 0 || dong < 0) throw new Error(`Không thấy thẻ <${the}>`);
  return src.slice(src.indexOf('>', mo) + 1, dong);
};

let head = lay('head')
  // Artifact tự gắn biểu tượng, và ./favicon.svg không tồn tại ở đó.
  .replace(/<link rel="icon"[^>]*>\s*/g, '')
  // Tiêu đề được đặt lại ở khối NEN bên dưới.
  .replace(/<title>[\s\S]*?<\/title>\s*/g, '');

const out = `${head}\n${NEN}\n${lay('body')}`;

const cam = ['<!doctype', '<html', '<head', '<body'].filter((t) =>
  out.toLowerCase().includes(t),
);
if (cam.length) {
  console.error(`  Còn sót thẻ khung: ${cam.join(', ')}`);
  process.exit(1);
}
if (!out.includes('<title>')) {
  console.error('  Thiếu thẻ <title>');
  process.exit(1);
}

writeFileSync(DICH, out, 'utf8');
console.log(
  `\n  Đã xuất  ${path.relative(ROOT, DICH)}  ` +
    `(${(out.length / 1024).toFixed(0)} kB)\n  Tiêu đề: ${TIEU_DE}\n`,
);
