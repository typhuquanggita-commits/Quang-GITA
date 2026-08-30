#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — SOI THAY ĐỔI CỦA KHO SO VỚI BẢN ĐÃ PHÁT HÀNH

       node tools/soi-doi-kho.js

   Vì sao cần tệp này. kho-goc/ nằm trong .gitignore — đó là chủ ý, vì
   nội dung gốc chưa mã hoá không được lên kho mã. Nhưng cái giá là:
   sửa nhầm kho-goc thì KHÔNG CÓ GIT ĐỂ LÙI, và cũng không có diff để
   nhìn trước khi đóng gói.

   Chuyện đã xảy ra thật ở bản 9.5.1: một phép tách câu tự động chạy
   trên toàn bộ kho-goc, đổi 18.672 chỗ, và không ai thấy gì cho tới
   khi bộ kiểm đỏ. Phần cứu được là nhờ kho/*.enc đã phát hành nằm
   TRONG git — bảy gói mã hoá ấy là bản lưu duy nhất của nội dung.

   Nên tệp này làm đúng một việc: giải mã bảy gói ở lần commit gần nhất,
   giải mã bảy gói vừa đóng, rồi nói thẳng kho nào đổi, đổi bao nhiêu
   bản ghi, và bản ghi nào biến mất. Chạy nó TRƯỚC khi đẩy là thấy được
   sức công phá của việc mình vừa làm.

   Không có kho/khoa.json thì bỏ qua — máy dựng bản công khai không giữ
   khoá, và đó là đúng.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const GOC = path.join(__dirname, '..');

function mo(khoaB64, buf) {
  const de = crypto.createDecipheriv('aes-256-gcm', Buffer.from(khoaB64, 'base64'), buf.subarray(0, 12));
  de.setAuthTag(buf.subarray(12, 28));
  return JSON.parse(Buffer.concat([de.update(buf.subarray(28)), de.final()]).toString('utf8'));
}

let khoa;
try {
  khoa = JSON.parse(fs.readFileSync(path.join(GOC, 'kho', 'khoa.json'), 'utf8')).khoa;
} catch (e) {
  console.log('Không có kho/khoa.json — bỏ qua phép soi này.');
  process.exit(0);
}

/* Đếm bản ghi của một kho, dù nó là mảng hay object */
function dem(v) {
  if (Array.isArray(v)) return v.length;
  if (v && typeof v === 'object') return Object.keys(v).length;
  return v === undefined ? 0 : 1;
}
function maCua(x) { return (x && (x.ma || x.id || x.code)) || null; }

const CU = {}, NAY = {};
let coCu = true;
for (const g of Object.keys(khoa)) {
  const tep = path.join(GOC, 'kho', g + '.enc');
  if (fs.existsSync(tep)) Object.assign(NAY, mo(khoa[g], fs.readFileSync(tep)));
  try {
    Object.assign(CU, mo(khoa[g], execSync('git show HEAD:kho/' + g + '.enc',
      { cwd: GOC, maxBuffer: 1 << 30, encoding: 'buffer' })));
  } catch (e) { coCu = false; }
}
if (!coCu) {
  console.log('Chưa có bản đã phát hành trong git để so — đây là lần đóng gói đầu.');
  process.exit(0);
}

const ten = [...new Set(Object.keys(CU).concat(Object.keys(NAY)))].sort();
const doi = [], mat = [], them = [], hut = [];
ten.forEach(k => {
  const a = CU[k], b = NAY[k];
  if (a !== undefined && b === undefined) { mat.push(k); return; }
  if (a === undefined && b !== undefined) { them.push(k + ' (' + dem(b) + ')'); return; }
  if (JSON.stringify(a) === JSON.stringify(b)) return;
  const na = dem(a), nb = dem(b);
  doi.push({ k, na, nb });
  if (nb < na) hut.push(k + ' ' + na + ' → ' + nb);
  /* Bản ghi biến mất theo mã — đây là dấu hiệu hỏng rõ nhất */
  if (Array.isArray(a) && Array.isArray(b) && a.length && maCua(a[0])) {
    const co = new Set(b.map(maCua));
    const bay = a.map(maCua).filter(m => m && !co.has(m));
    if (bay.length) hut.push(k + ' mất mã: ' + bay.slice(0, 5).join(' ') + (bay.length > 5 ? ' …' : ''));
  }
});

console.log('\n─────────── KHO ĐỔI GÌ SO VỚI BẢN ĐÃ PHÁT HÀNH ───────────');
console.log('  tổng kho: ' + ten.length + ' · đổi nội dung: ' + doi.length +
  ' · thêm mới: ' + them.length + ' · biến mất: ' + mat.length);
if (them.length) console.log('\n  KHO MỚI\n    ' + them.join('\n    '));
if (mat.length)  console.log('\n  ⚠ KHO BIẾN MẤT\n    ' + mat.join('\n    '));
if (doi.length) {
  console.log('\n  KHO ĐỔI NỘI DUNG');
  doi.forEach(d => console.log('    ' + d.k.padEnd(20) +
    (d.na === d.nb ? d.na + ' bản ghi, đổi nội dung' : d.na + ' → ' + d.nb + ' bản ghi')));
}
if (hut.length) {
  console.log('\n  ⚠⚠ CHỖ CẦN NHÌN KỸ — có thứ ÍT ĐI hoặc BIẾN MẤT');
  hut.forEach(x => console.log('    ' + x));
  console.log('\n  Nội dung ít đi hầu như luôn là hỏng, không phải sửa.');
  console.log('  Nếu đúng là chủ ý thì bỏ qua; nếu không thì DỪNG, đừng đẩy.');
}
if (!doi.length && !mat.length && !them.length)
  console.log('\n  Không kho nào đổi. Gói vừa đóng giống hệt bản đã phát hành.');
console.log('');
process.exit(0);
