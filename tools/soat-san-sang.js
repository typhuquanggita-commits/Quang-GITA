#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — SOÁT SẴN SÀNG TRƯỚC KHI CHẠY THẬT

       node tools/soat-san-sang.js

   ══ VÌ SAO CẦN CÁI NÀY KHI ĐÃ CÓ kiem-trien-khai.js ══

   kiem-trien-khai.js chạy SAU, từ ngoài internet nhìn vào, và nó chỉ
   chạy được khi đã có một địa chỉ sống. Nghĩa là chỗ nó bắt lỗi là
   chỗ máy chủ ĐÃ chạy với một cấu hình thiếu — khoá chưa nạp thì
   người dùng thật đã gặp màn "chưa mở được kho" trước khi ai chạy bộ
   kiểm.

   Bộ này chạy TRƯỚC, ở máy của người triển khai, và trả lời đúng một
   câu: còn thiếu gì để bấm nút phát hành.

   ══ VÀ VÌ SAO NÓ KHÔNG PHẢI MỘT BẢN GHI NHỚ ══

   Danh sách "trước khi chạy thật" trước nay nằm trong đầu bài và
   trong chú giải wrangler.toml. Một danh sách như thế mục theo đúng
   cách sổ TR_CHUA đã mục: thêm một bí mật mới ở bản sau mà quên chép
   sang danh sách, thì lượt triển khai kế tiếp thiếu đúng cái ấy và
   không ai biết.

   Nên bộ này KHÔNG khai tay danh sách bí mật. Nó đọc thẳng
   may-chu/wrangler.toml, nhặt mọi tên bí mật mà chính tệp ấy dặn nạp,
   rồi đối chiếu với những gì Cloudflare đang giữ. Thêm một bí mật vào
   wrangler.toml là nó tự có mặt ở đây.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const GOC = path.join(__dirname, '..');
let thieu = 0, nhacNho = 0;

function dat(ok, ten, ct) {
  if (!ok) thieu++;
  console.log((ok ? '  ✓ ' : '  ✗ ') + ten + (ct ? ' — ' + ct : ''));
}
function nhac(ten, ct) { nhacNho++; console.log('  ! ' + ten + (ct ? ' — ' + ct : '')); }
function doc(p) { try { return fs.readFileSync(path.join(GOC, p), 'utf8'); } catch (e) { return ''; } }

console.log('\nSOÁT SẴN SÀNG TRƯỚC KHI CHẠY THẬT\n');

/* ═══════════ A · BÍ MẬT MÁY CHỦ ═══════════ */
console.log('A · BÍ MẬT MÁY CHỦ (Cloudflare Workers)');

const wr = doc('may-chu/wrangler.toml');
/* Đọc tên bí mật từ chính lời dặn trong tệp cấu hình, không khai tay.
   Khai tay là dựng bản thứ hai của một danh sách, và bản thứ hai mục. */
const canCo = [...new Set((wr.match(/wrangler secret put\s+([A-Z_]+)/g) || [])
  .map(x => x.split(/\s+/).pop()))].sort();

if (!canCo.length) {
  dat(false, 'đọc được danh sách bí mật từ may-chu/wrangler.toml',
    'không thấy dòng "wrangler secret put" nào — tệp cấu hình vừa đổi hình?');
} else {
  console.log('  Tệp cấu hình dặn nạp ' + canCo.length + ' bí mật: ' + canCo.join(', '));

  /* Hỏi Cloudflare xem đang giữ những gì. Không đăng nhập được thì
     NÓI RA là chưa hỏi được, chứ không im lặng báo thiếu — báo thiếu
     một thứ có thật là cách chắc nhất để người ta thôi đọc bộ soát. */
  let dangGiu = null;
  try {
    const ra = execFileSync('npx', ['--yes', 'wrangler', 'secret', 'list'],
      { cwd: path.join(GOC, 'may-chu'), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
        timeout: 90000 });
    dangGiu = (ra.match(/"name"\s*:\s*"([A-Z_]+)"/g) || [])
      .map(x => x.split('"')[3]);
  } catch (e) {
    dangGiu = null;
  }

  if (dangGiu === null) {
    nhac('CHƯA HỎI ĐƯỢC CLOUDFLARE',
      'wrangler chưa đăng nhập ở máy này, hoặc không có mạng. Chạy "npx wrangler login" ' +
      'rồi chạy lại để bộ soát tự đối chiếu.');
    console.log('\n  Lệnh nạp từng bí mật, chạy trong thư mục may-chu/:');
    canCo.forEach(k => console.log('    npx wrangler secret put ' + k));
  } else {
    canCo.forEach(k => dat(dangGiu.indexOf(k) >= 0, 'đã nạp ' + k,
      dangGiu.indexOf(k) >= 0 ? '' : 'chạy: npx wrangler secret put ' + k));
    const thua = dangGiu.filter(k => canCo.indexOf(k) < 0);
    if (thua.length) nhac('Cloudflare còn giữ bí mật không ai dùng: ' + thua.join(', '),
      'bí mật thừa không làm hỏng gì, nhưng nó là một khoá còn sống mà không ai nhớ để làm gì');
  }
}

/* ═══════════ B · CẤU HÌNH BẢN WEB ═══════════ */
console.log('\nB · BẢN WEB');

const ch = doc('cau-hinh.js');
const coDiaChi = /API_CAP_PHEP\s*[:=]\s*['"]https?:\/\//.test(ch);
if (coDiaChi) dat(true, 'cau-hinh.js đã trỏ vào một máy chủ thật');
else nhac('cau-hinh.js chưa trỏ máy chủ',
  'bản web sẽ chạy CHẾ ĐỘ MẪU — đúng cho bản xem thử, thiếu cho bản chạy thật');

const cname = doc('CNAME').trim();
dat(!!cname, 'CNAME có tên miền', cname || 'trống — bản web sẽ chạy ở địa chỉ mặc định của GitHub Pages');

const wf = doc('.github/workflows/trang-web.yml');
dat(/pages/i.test(wf), 'có luồng GitHub Actions dựng trang',
  wf ? '' : 'thiếu .github/workflows/trang-web.yml');
nhac('Bật GitHub Pages là việc bấm tay',
  'Settings → Pages → Source: GitHub Actions. Không có lệnh nào làm hộ được, ' +
  'và luồng ở trên chạy xong vẫn không lên trang nếu chưa bật.');

/* ═══════════ C · TÀI SẢN KHÔNG ĐƯỢC LỌT ═══════════ */
console.log('\nC · TÀI SẢN');

const gi = doc('.gitignore');
dat(/^kho-goc\/?$/m.test(gi), 'kho-goc/ nằm trong .gitignore');
dat(/khoa\.json/.test(gi), 'kho/khoa.json nằm trong .gitignore');

let theoDoi = '';
try {
  theoDoi = execFileSync('git', ['ls-files', 'kho-goc', 'kho/khoa.json'],
    { cwd: GOC, encoding: 'utf8' });
} catch (e) { theoDoi = ''; }
dat(!theoDoi.trim(), 'kho mã KHÔNG đang theo dõi kho-goc/ hay khoá',
  theoDoi.trim() ? 'ĐANG THEO DÕI: ' + theoDoi.trim().split('\n').slice(0, 3).join(' · ') : '');

const soEnc = fs.existsSync(path.join(GOC, 'kho'))
  ? fs.readdirSync(path.join(GOC, 'kho')).filter(f => /\.enc$/.test(f)).length : 0;
dat(soEnc >= 8, 'có đủ gói kho đã mã hoá', soEnc + ' tệp .enc');

/* ═══════════ D · VIỆC CHỜ NGƯỜI, KHÔNG CHỜ MÃ ═══════════ */
console.log('\nD · CHỜ NGƯỜI, KHÔNG CHỜ MÃ');
nhac('Đường lấy sao kê ngân hàng',
  'ba đường: webhook của ngân hàng · cổng thanh toán · nhập tay từ sao kê. ' +
  'Cửa nganHangBao đã sẵn cho cả ba; chọn đường nào là quyết định của chủ hệ.');
nhac('SPF và DKIM cho tên miền gửi thư',
  'thiếu thì thư báo dòng doanh thu vào hộp rác, và không ai biết là nó đã gửi.');
nhac('Hệ số lương ba vị trí phòng tài chính (L-01)',
  'Màn Phòng Kế toán – Tài chính → Lương → Đặt hệ số. Chưa đặt thì bảng lương ' +
  'vẫn chấm điểm, phần tiền để trống.');

/* ═══════════ KẾT ═══════════ */
console.log('');
if (thieu) {
  console.log('✗ CÒN ' + thieu + ' CHỖ THIẾU' +
    (nhacNho ? ' · và ' + nhacNho + ' việc chờ người' : ''));
  process.exitCode = 1;
} else {
  console.log('✓ KHÔNG THIẾU CHỖ NÀO MÁY SOÁT ĐƯỢC' +
    (nhacNho ? ' · còn ' + nhacNho + ' việc chờ người, xem phần ! ở trên' : ''));
}
