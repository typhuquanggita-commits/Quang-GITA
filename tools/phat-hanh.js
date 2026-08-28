#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MỘT LỆNH PHÁT HÀNH

       node tools/phat-hanh.js            đóng gói và kiểm, không đẩy
       node tools/phat-hanh.js --day      kiểm xong thì commit và đẩy luôn

   Làm đủ chuỗi việc, đúng thứ tự, dừng ngay khi có việc nào hỏng:

     1. Mã hoá lại kho          (giữ nguyên khoá — giấy phép cũ vẫn dùng được)
     2. Sinh tệp nạp khoá       cho máy chủ cấp phép
     3. Thử máy chủ cấp phép    với ROLES thật của v6.9, không cần mạng
     4. Dựng bản một tệp        để gửi khách xem thử
     5. Chạy bộ kiểm phát hành  75+ màn hình × 19 vai, XSS, phạm vi cấp phép
     6. Soát tài sản            không để lọt kho gốc hay khoá lên kho mã
     7. (--day) commit và đẩy   CI tự dựng bộ cài Windows mới

   Thay cho năm lệnh rời phải nhớ đúng thứ tự.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const { execFileSync, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const GOC = path.join(__dirname, '..');
const DAY = process.argv.includes('--day');
const t0 = Date.now();

let buoc = 0;
function tieuDe(ten) {
  buoc++;
  console.log('\n' + '─'.repeat(64));
  console.log('  BƯỚC ' + buoc + ' · ' + ten);
  console.log('─'.repeat(64));
}
function chay(lenh, dv, opt) {
  try {
    execFileSync(lenh, dv || [], { cwd: GOC, stdio: 'inherit', ...(opt || {}) });
  } catch (e) {
    console.error('\n✗ DỪNG Ở BƯỚC ' + buoc + ' — ' + lenh + ' ' + (dv || []).join(' '));
    console.error('  Sửa xong chạy lại. Không có gì được đẩy lên.');
    process.exit(1);
  }
}
function co(p) { return fs.existsSync(path.join(GOC, p)); }

/* ─── 0. Điều kiện cần ─── */
if (!co('kho-goc')) {
  console.error('Không thấy kho-goc/. Đây là nội dung gốc chưa mã hoá, không nằm trong kho mã.');
  console.error('Khôi phục kho-goc/ rồi chạy lại.');
  process.exit(1);
}

/* ─── 1. Mã hoá kho ─── */
tieuDe('MÃ HOÁ KHO');
chay('node', ['tools/ma-hoa-kho.js']);

/* ─── 2. Tệp nạp khoá ─── */
tieuDe('SINH TỆP NẠP KHOÁ CHO MÁY CHỦ CẤP PHÉP');
chay('node', ['tools/tao-nap-khoa.js']);

/* ─── 3. Thử máy chủ cấp phép ─── */
tieuDe('THỬ MÁY CHỦ CẤP PHÉP');
const V69 = process.env.GITA_V69 || '';
if (V69 && fs.existsSync(path.join(V69, '00_Config.gs'))) {
  chay('node', ['tools/thu-may-chu-cap-phep.js', V69]);
} else {
  try {
    execFileSync('node', ['tools/thu-may-chu-cap-phep.js'], { cwd: GOC, stdio: 'inherit' });
  } catch (e) {
    console.log('  ⚠ Bỏ qua — không tìm thấy mã nguồn v6.9.');
    console.log('    Đặt biến GITA_V69 trỏ tới thư mục src của v6.9 để kiểm cả phần này.');
  }
}

/* ─── 4. Bản một tệp ─── */
tieuDe('DỰNG BẢN MỘT TỆP ĐỂ GỬI KHÁCH');
chay('python3', ['tools/dong-goi.py']);

/* ─── 5. Bộ kiểm phát hành ─── */
tieuDe('BỘ KIỂM PHÁT HÀNH');
let mayChu = null;
try {
  execSync('curl -sf -o /dev/null http://127.0.0.1:8099/index.html', { cwd: GOC });
} catch (e) {
  console.log('  Chưa có máy chủ tĩnh ở cổng 8099 — tự bật.');
  mayChu = require('child_process').spawn('npx',
    ['--yes', 'http-server', '-p', '8099', '-s', '.'],
    { cwd: GOC, detached: true, stdio: 'ignore' });
  mayChu.unref();
  const den = Date.now() + 30000;
  for (;;) {
    try { execSync('curl -sf -o /dev/null http://127.0.0.1:8099/index.html'); break; }
    catch (e2) {
      if (Date.now() > den) { console.error('  ✗ Máy chủ tĩnh không lên được.'); process.exit(1); }
      execSync('sleep 1');
    }
  }
}
chay('node', ['tools/kiem-tra.js']);
if (mayChu) { try { process.kill(-mayChu.pid); } catch (e) {} }

/* ─── 6. Soát tài sản trước khi đẩy ─── */
tieuDe('SOÁT TÀI SẢN TRƯỚC KHI ĐẨY');
let ro = 0;
const CAM = ['kho-goc/', 'kho/khoa.json', 'giay-phep/'];
const theoDoi = execSync('git ls-files', { cwd: GOC, encoding: 'utf8' }).split('\n');
CAM.forEach(function (c) {
  const dinh = theoDoi.filter(function (f) { return f && f.indexOf(c) === 0; });
  if (dinh.length) { ro++; console.log('  ✗ ' + c + ' đang nằm trong kho mã: ' + dinh.slice(0, 3).join(' ')); }
  else console.log('  ✓ ' + c.padEnd(16) + 'không lọt lên kho mã');
});
/* Tệp .enc phải thật sự là dữ liệu đã mã hoá, không phải JSON đọc được */
const encs = fs.readdirSync(path.join(GOC, 'kho')).filter(function (f) { return f.endsWith('.enc'); });
let doc = 0;
encs.forEach(function (f) {
  const b = fs.readFileSync(path.join(GOC, 'kho', f)).subarray(28, 228).toString('utf8');
  if (/[{}"]/.test(b) && /[a-zA-Z]{6}/.test(b)) doc++;
});
if (doc) { ro++; console.log('  ✗ ' + doc + ' tệp .enc đọc được bằng mắt — chưa mã hoá đúng'); }
else console.log('  ✓ ' + encs.length + ' tệp .enc đều không đọc được nếu không có khoá');
if (ro) { console.error('\n✗ DỪNG — có tài sản sắp lọt ra ngoài. Không đẩy gì cả.'); process.exit(1); }

/* ─── 7. Đẩy ─── */
if (DAY) {
  tieuDe('COMMIT VÀ ĐẨY');
  const nhanh = execSync('git rev-parse --abbrev-ref HEAD', { cwd: GOC, encoding: 'utf8' }).trim();
  const doi = execSync('git status --porcelain', { cwd: GOC, encoding: 'utf8' }).trim();
  if (!doi) {
    console.log('  Không có gì thay đổi. Bỏ qua.');
  } else {
    chay('git', ['add', '-A']);
    const loi = process.env.GITA_LOI || 'Cập nhật nội dung và đóng gói lại';
    chay('git', ['commit', '-q', '-m', loi]);
    let xong = false;
    for (let i = 0; i < 4 && !xong; i++) {
      try { execFileSync('git', ['push', '-u', 'origin', nhanh], { cwd: GOC, stdio: 'inherit' }); xong = true; }
      catch (e) {
        const cho = Math.pow(2, i + 1);
        console.log('  Đẩy hỏng, chờ ' + cho + 's rồi thử lại…');
        execSync('sleep ' + cho);
      }
    }
    if (!xong) { console.error('  ✗ Đẩy hỏng sau 4 lần thử.'); process.exit(1); }
    console.log('  Đã đẩy lên ' + nhanh + '. CI đang dựng bộ cài Windows mới.');
  }
} else {
  console.log('\n  (chưa đẩy — thêm --day nếu muốn commit và đẩy luôn)');
}

console.log('\n' + '═'.repeat(64));
console.log('  ✓ XONG — ' + Math.round((Date.now() - t0) / 1000) + ' giây');
console.log('═'.repeat(64));
console.log('  Bản gửi khách   : GITA365_v72_GIOI_THIEU.html');
console.log('  Nạp vào máy chủ : giay-phep/GITA_KHOA_KHO.txt');
console.log('  Bộ cài Windows  : github.com/typhuquanggita-commits/Quang-GITA/releases/tag/may-tinh-moi-nhat');
console.log('');
