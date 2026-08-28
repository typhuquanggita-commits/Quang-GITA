/* ═══════════════════════════════════════════════════════════════
   GITA 365 — MÃ HOÁ KHO TÀI SẢN
   Đọc nội dung gốc trong kho-goc/, chia thành các gói theo phạm vi
   cấp phép, mã hoá AES-256-GCM và xuất ra kho/*.enc

       node tools/ma-hoa-kho.js

   Ra hai thứ:
     kho/*.enc        — gói đã mã hoá, phát hành kèm ứng dụng được
     kho/khoa.json    — BỘ KHOÁ, nạp vào máy chủ cấp phép.
                        TUYỆT ĐỐI KHÔNG đưa tệp này lên kho mã.

   Khoá KHÔNG nằm trong ứng dụng. Máy chủ chỉ trả khoá của những gói
   mà vai và tầng của người đăng nhập được cấp phép.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const GOC = path.join(__dirname, '..');
const NGUON = path.join(GOC, 'kho-goc');
const RA = path.join(GOC, 'kho');

/* ─── Nạp nội dung gốc ─── */
global.window = {};
for (const t of fs.readdirSync(NGUON).filter(f => f.endsWith('.js')).sort())
  require(path.join(NGUON, t));
const G = global.window.G;

/* ─── Chia gói theo phạm vi cấp phép ─── */
const NEN = ['VANHANH', 'CHUYENDICH', 'CHANDUNG', 'LOTRINH', 'FAMILIES', 'TEAM', 'CUHICH',
  'NGHILE', 'SUKIEN', 'HEALTH', 'DUYET', 'AUDIT', 'TODAY', 'LEVELS', 'DIEM', 'HUYHIEU',
  'QUA', 'HOAHONG', 'DANDAT', 'BRAND', 'RASOAT', 'TAMNHIN100', 'TANG100', 'WOW',
  'NHATBAN', 'CHIPHI', 'NGONTU_RANH', 'DAISU', 'BAIHOC'];

const NGHE = ['MOTHUC', 'SACH', 'BANDO_A3', 'POSTER', 'SODO', 'PHACDO',
  'DIEMCHAM', 'NGONTU', 'NGONTU_TANG', 'THAYVI', 'MAUTHOAI', 'PERSONA',
  'CHUAN1000', 'HAILONG', 'TAILIEU', 'AIPOLICY', 'KPI', 'DINHTUYEN', 'AINANGCAP',
  'LACHAN', 'BENCH', 'BENCH_AI',
  'LUAT_TK', 'TAIKHOAN_KPI', 'YEUCAU_MO', 'HANG_TL', 'DAU_MAT', 'QUYTRINH'];

const goi = {};
goi.nen  = Object.fromEntries(NEN.map(k => [k, G[k]]).filter(([, v]) => v !== undefined));
goi.nghe = Object.fromEntries(NGHE.map(k => [k, G[k]]).filter(([, v]) => v !== undefined));
for (let t = 1; t <= 5; t++)
  goi['tang' + t] = { KICHBAN: (G.KICHBAN || []).filter(k => k.tang === 'T' + t) };

/* ─── Mã hoá ─── */
fs.mkdirSync(RA, { recursive: true });
const khoa = {};
let tong = 0;

for (const [ten, du] of Object.entries(goi)) {
  const ro = Buffer.from(JSON.stringify(du), 'utf8');
  const k = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', k, iv);
  const ma = Buffer.concat([c.update(ro), c.final()]);
  const tag = c.getAuthTag();
  /* iv (12) + tag (16) + dữ liệu */
  fs.writeFileSync(path.join(RA, ten + '.enc'), Buffer.concat([iv, tag, ma]));
  khoa[ten] = k.toString('base64');
  tong += ma.length;
  console.log('  ' + ten.padEnd(8) + ' ' + String(Math.round(ro.length / 1024)).padStart(4) + ' KB → ' +
    String(Math.round(ma.length / 1024)).padStart(4) + ' KB đã mã hoá');
}

fs.writeFileSync(path.join(RA, 'khoa.json'), JSON.stringify({
  chuY: 'BỘ KHOÁ MẬT — nạp vào máy chủ cấp phép, không bao giờ đưa lên kho mã.',
  taoLuc: new Date().toISOString(),
  thuatToan: 'AES-256-GCM',
  khoa
}, null, 2));

/* ─── Gói mẫu công khai: đủ để xem giao diện, không lộ kho ─── */
const mau = {
  KICHBAN: (G.KICHBAN || []).filter(k => k.tang === 'T1').slice(0, 8)
    .map(k => ({ ...k, mo: (k.mo || '').slice(0, 90) + '… [cần cấp phép]', chot: undefined, khong: undefined })),
  PHACDO: (G.PHACDO || []).slice(0, 6)
    .map(p => ({ ma: p.ma, nhom: p.nhom, nhomTen: p.nhomTen, ten: p.ten })),
  MOTHUC: (G.MOTHUC || []).slice(0, 4)
    .map(m => ({ id: m.id, title: m.title, summary: (m.summary || '').slice(0, 120) + '… [cần cấp phép]' }))
};
fs.writeFileSync(path.join(RA, 'mau.json'), JSON.stringify(mau));

console.log('\n  Tổng ' + Math.round(tong / 1024) + ' KB đã mã hoá · ' +
  Object.keys(khoa).length + ' gói · khoá ghi vào kho/khoa.json');
console.log('  ⚠ kho/khoa.json và kho-goc/ đều nằm trong .gitignore — kiểm lại trước khi đẩy.');
