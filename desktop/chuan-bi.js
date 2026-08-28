/* Chép web app vào desktop/app/ trước khi đóng gói.
   Một nguồn sự thật duy nhất: sửa nội dung ở gốc, bản máy tính tự có. */
'use strict';
const fs = require('fs');
const path = require('path');

const GOC = path.join(__dirname, '..');
const DICH = path.join(__dirname, 'app');
const LAY = ['index.html', 'cau-hinh.js', 'src', 'assets', 'manifest.webmanifest', 'kho'];

function chep(tu, den) {
  const st = fs.statSync(tu);
  if (st.isDirectory()) {
    fs.mkdirSync(den, { recursive: true });
    for (const t of fs.readdirSync(tu)) chep(path.join(tu, t), path.join(den, t));
  } else {
    fs.mkdirSync(path.dirname(den), { recursive: true });
    fs.copyFileSync(tu, den);
  }
}

fs.rmSync(DICH, { recursive: true, force: true });
for (const m of LAY) {
  const tu = path.join(GOC, m);
  if (!fs.existsSync(tu)) { console.error('Thiếu: ' + m); process.exit(1); }
  chep(tu, path.join(DICH, m));
}

/* Bộ khoá KHÔNG bao giờ được đóng vào ứng dụng.
   Bản máy tính lấy khoá từ tệp giấy phép trong thư mục dữ liệu người dùng. */
const khoaLo = path.join(DICH, 'kho', 'khoa.json');
if (fs.existsSync(khoaLo)) { fs.rmSync(khoaLo); console.log('Đã loại kho/khoa.json khỏi gói cài — đúng.'); }

/* Bản máy tính không dùng service worker — nội dung đã nằm sẵn trong ứng dụng */
const ip = path.join(DICH, 'index.html');
let html = fs.readFileSync(ip, 'utf8');
html = html.replace(/if \('serviceWorker' in navigator[\s\S]*?\n\}\n/, '');
fs.writeFileSync(ip, html);

let n = 0;
(function dem(d) { for (const t of fs.readdirSync(d)) {
  const p = path.join(d, t);
  fs.statSync(p).isDirectory() ? dem(p) : n++;
} })(DICH);
console.log('Đã chuẩn bị ' + n + ' tệp vào desktop/app/');
