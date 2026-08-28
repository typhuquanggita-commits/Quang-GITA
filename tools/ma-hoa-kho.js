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
  'NGHILE', 'SUKIEN', 'HEALTH', 'DUYET', 'AUDIT', 'TODAY', 'LEVELS', 'DIEM', 'HUYHIEU', 'KPI100', 'MATRAN',
  'QUA', 'HOAHONG', 'DANDAT', 'BRAND', 'RASOAT', 'TAMNHIN100', 'TANG100', 'WOW',
  'NHATBAN', 'CHIPHI', 'NGONTU_RANH', 'DAISU', 'BAIHOC', 'QUA1000', 'QUA_DANG', 'KETNOI', 'LIENKET'];

const NGHE = ['MOTHUC', 'SACH', 'BANDO_A3', 'POSTER', 'SODO', 'PHACDO',
  'DIEMCHAM', 'NGONTU', 'NGONTU_TANG', 'THAYVI', 'MAUTHOAI', 'PERSONA',
  'CHUAN1000', 'HAILONG', 'TAILIEU', 'AIPOLICY', 'KPI', 'DINHTUYEN', 'AINANGCAP',
  'LACHAN', 'BENCH', 'BENCH_AI',
  'LUAT_TK', 'TAIKHOAN_KPI', 'YEUCAU_MO', 'HANG_TL', 'DAU_MAT', 'QUYTRINH',
  'VANBAN', 'TAICHINH_QT', 'THANHTRA', 'RASOAT_KH', 'BANDO_TUVAN', 'BANDO_COACH',
  'XUAT', 'TINHHUONG', 'KHUNG_T5', 'THANHTOAN',
  'REFERRAL', 'CHANDUNG_KH', 'DOLUONG_KH', 'PHANHANG', 'CHUAN_VIP', 'NHANSU_TT', 'CAYTIEN',
  'HOSO_VIP', 'CHUYENDOI', 'XUONG_SONG', 'NGUON_VAITRO', 'SACH_THAMKHAO', 'PHUONGPHAP', 'VANTAY', 'AICHAM', 'TAILIEU_GOC'];

const goi = {};
goi.nen  = Object.fromEntries(NEN.map(k => [k, G[k]]).filter(([, v]) => v !== undefined));
goi.nghe = Object.fromEntries(NGHE.map(k => [k, G[k]]).filter(([, v]) => v !== undefined));
for (let t = 1; t <= 5; t++)
  goi['tang' + t] = {
    KICHBAN: (G.KICHBAN || []).filter(k => k.tang === 'T' + t),
    TEST750: (G.TEST750 || []).filter(b => b.tang === 'T' + t),
    ['MATRAN_T' + t]: G['MATRAN_T' + t] || []
  };

/* ─── Mã hoá ───
   Khoá được GIỮ NGUYÊN giữa các lần mã hoá lại. Đổi khoá là mọi giấy
   phép đã cấp cho khách và cho đội ngũ đều hết dùng được ngay lập tức.
   Muốn đổi khoá thật (khi nghi rò rỉ) thì chạy:  node tools/ma-hoa-kho.js --doi-khoa
   rồi cấp lại giấy phép cho toàn bộ người đang dùng. */
fs.mkdirSync(RA, { recursive: true });
const doiKhoa = process.argv.includes('--doi-khoa');
let khoaCu = {};
if (!doiKhoa) {
  try { khoaCu = JSON.parse(fs.readFileSync(path.join(RA, 'khoa.json'), 'utf8')).khoa || {}; }
  catch { khoaCu = {}; }
}
if (doiKhoa) console.log('  ⚠ ĐỔI KHOÁ: mọi giấy phép đã cấp sẽ hết hiệu lực. Phải cấp lại toàn bộ.\n');
const khoa = {};
let tong = 0;
let giu = 0;

for (const [ten, du] of Object.entries(goi)) {
  const ro = Buffer.from(JSON.stringify(du), 'utf8');
  const k = khoaCu[ten] ? Buffer.from(khoaCu[ten], 'base64') : crypto.randomBytes(32);
  if (khoaCu[ten] && k.length === 32) giu++; else if (khoaCu[ten]) throw new Error('Khoá cũ của gói ' + ten + ' không đúng 32 byte.');
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

/* ─── Gói mẫu công khai: đủ để xem giao diện, không lộ kho ───
   Chỉ những phần GITA 365 vẫn nói ra ngoài khi giới thiệu: câu chuyện
   chuyển hoá, lộ trình năm tầng, kiến trúc trăm năm, chuỗi trải nghiệm,
   cách ghi nhận và nhận diện thương hiệu. Phần nghề — 1.000 kịch bản,
   220 phác đồ, 42 mô thức, ngôn từ dẫn dắt, tình huống, văn bản, tài
   chính, quản trị — KHÔNG nằm ở đây. */
const MO_RA = [
  /* Phần GITA vẫn nói ra ngoài khi giới thiệu */
  'CHUYENDICH', 'LOTRINH', 'TIERS', 'TAMNHIN100', 'TANG100', 'WOW',
  'NHATBAN', 'LEVELS', 'DIEM', 'HUYHIEU', 'QUA_DANG', 'BRAND', 'BAIHOC',
  /* Mở thêm ở v7.6 — mô hình công khai và nhịp sống nhà mình.
     Lý do: khoá những phần này làm gia đình không dùng được ứng dụng
     hằng ngày, trong khi chúng đã nằm trong tài liệu giới thiệu và
     trang web của Học viện. Phần NGHỀ vẫn khoá nguyên: 1.000 kịch bản
     đầy đủ, 220 phác đồ, 42 mô thức, ngôn từ dẫn dắt, 250 tình huống,
     ma trận, xương sống phương pháp, hệ VIP và Cây Tiền, toàn bộ quản
     trị và tài chính. */
  'VANHANH',      /* 5 khoang · 9 vai — mô hình lõi, đã công bố */
  'CHANDUNG',     /* mười chân dung thành công */
  'CUHICH',       /* cú hích lớn trong nhà */
  'NGHILE',       /* thói quen và nghi lễ gia đình */
  'SUKIEN',       /* sự kiện và lửa trại */
  'KETNOI',       /* kết nối hệ sinh thái */
  'LIENKET',      /* liên kết giữa các phần */
  'DAISU',        /* chương trình đại sứ — điều kiện công khai */
  'HOAHONG',      /* bốn cấp và trần hoa hồng 10% — điều khoản thương mại công khai */
  'NGONTU_RANH',  /* sáu ranh giới — luật an toàn, càng nhiều người biết càng tốt */
  'QUA',          /* cách ghi nhận và trao quà */
  'DANDAT'        /* hành trình người dẫn dắt — phần giới thiệu nghề */
];
const mau = {
  ...Object.fromEntries(MO_RA.map(k => [k, G[k]]).filter(([, v]) => v !== undefined)),
  KICHBAN: (G.KICHBAN || []).filter(k => k.tang === 'T1').slice(0, 8)
    .map(k => ({ ...k, mo: (k.mo || '').slice(0, 90) + '… [cần cấp phép]', chot: undefined, khong: undefined })),
  PHACDO: (G.PHACDO || []).slice(0, 6)
    .map(p => ({ ma: p.ma, nhom: p.nhom, nhomTen: p.nhomTen, ten: p.ten })),
  MOTHUC: (G.MOTHUC || []).slice(0, 4)
    .map(m => ({ id: m.id, title: m.title, summary: (m.summary || '').slice(0, 120) + '… [cần cấp phép]' })),
  /* Mười điểm về đích: mở tên và ý nghĩa, mở đủ tiêu chí của điểm mốc
     đầu tiên. Chín mốc còn lại chỉ đếm số tiêu chí, không mở nội dung. */
  KPI100: G.KPI100 && {
    ...G.KPI100,
    diem: G.KPI100.diem.map((d, i) => ({
      ...d, tc: i === 0 ? d.tc : d.tc.map(() => '[Tiêu chí mở khi được cấp phép]')
    }))
  },
  /* Một bài test rút gọn, đủ để thấy cách chấm và cách phân nhóm. */
  TEST750: (G.TEST750 || []).filter(b => b.tang === 'T1').slice(0, 1)
    .map(b => ({ ...b, mau: true, cau: b.cau.slice(0, 6) }))
};
fs.writeFileSync(path.join(RA, 'mau.json'), JSON.stringify(mau));

console.log('\n  Tổng ' + Math.round(tong / 1024) + ' KB đã mã hoá · ' +
  Object.keys(khoa).length + ' gói · khoá ghi vào kho/khoa.json');
console.log('  Giữ nguyên ' + giu + ' khoá cũ' + (giu ? ' — giấy phép đã cấp vẫn dùng được.' : '.'));
console.log('  ⚠ kho/khoa.json và kho-goc/ đều nằm trong .gitignore — kiểm lại trước khi đẩy.');
