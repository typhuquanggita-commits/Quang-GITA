/* ═══════════════════════════════════════════════════════════════
   GITA 365 — TẠO GIẤY PHÉP CHO MỘT MÁY

       node tools/tao-giay-phep.js "Tên người dùng" [số tháng] [gói…]

   Ví dụ:
     node tools/tao-giay-phep.js "Trương Nhật Quang" 24
     node tools/tao-giay-phep.js "Coach Minh" 12 nen nghe tang1 tang2

   Ra: giay-phep/giay-phep-<tên>.json

   Đưa tệp này cho đúng người, họ mở ứng dụng máy tính rồi vào
   menu Trợ giúp → Nạp giấy phép. Khoá chỉ nằm trong bộ nhớ phiên
   làm việc, không ghi ra đĩa.

   ⚠ Tệp giấy phép mang khoá thật. Không đưa lên kho mã, không gửi
   qua kênh công khai, không dùng chung một tệp cho nhiều người —
   mỗi bản cấp cho một người là một dấu vết truy nguồn.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const GOC = path.join(__dirname, '..');
const KHOA = path.join(GOC, 'kho', 'khoa.json');
const RA = path.join(GOC, 'giay-phep');

const TAT_CA = ['nen', 'nghe', 'tang1', 'tang2', 'tang3', 'tang4', 'tang5'];

const dv = process.argv.slice(2);
const nguoi = dv[0];
if (!nguoi) {
  console.error('Thiếu tên người được cấp.\n' +
    '  node tools/tao-giay-phep.js "Tên người dùng" [số tháng] [gói…]');
  process.exit(1);
}
const thang = Number(dv[1]) > 0 ? Number(dv[1]) : 24;
const xin = dv.slice(2).filter(g => TAT_CA.indexOf(g) >= 0);
const goi = xin.length ? xin : TAT_CA;

if (!fs.existsSync(KHOA)) {
  console.error('Chưa có kho/khoa.json. Chạy trước: node tools/ma-hoa-kho.js');
  process.exit(1);
}
const bo = JSON.parse(fs.readFileSync(KHOA, 'utf8')).khoa;
const thieu = goi.filter(g => !bo[g]);
if (thieu.length) {
  console.error('Bộ khoá thiếu gói: ' + thieu.join(', '));
  process.exit(1);
}

const hetHan = new Date();
hetHan.setMonth(hetHan.getMonth() + thang);

const gp = {
  chuY: 'GIẤY PHÉP SỬ DỤNG GITA 365 — cấp riêng cho một người, một máy. ' +
        'Sao chép, chia sẻ hoặc trích xuất nội dung ra ngoài phạm vi được cấp là vi phạm hợp đồng.',
  capCho: nguoi,
  soGiayPhep: 'GP-' + crypto.randomBytes(6).toString('hex').toUpperCase(),
  capLuc: new Date().toISOString(),
  hetHan: hetHan.toISOString(),
  phamVi: goi,
  khoa: Object.fromEntries(goi.map(g => [g, bo[g]]))
};
/* Dấu truy nguồn: biết bản rò rỉ là bản của ai mà không cần mở tệp. */
gp.dauTruyNguon = crypto.createHash('sha256')
  .update(gp.soGiayPhep + '|' + nguoi + '|' + gp.capLuc).digest('hex').slice(0, 32);

fs.mkdirSync(RA, { recursive: true });
const ten = 'giay-phep-' + nguoi.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/đ/gi, 'd').replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase() + '.json';
const duong = path.join(RA, ten);
fs.writeFileSync(duong, JSON.stringify(gp, null, 2));

console.log('  Đã cấp: ' + gp.soGiayPhep);
console.log('  Cho   : ' + nguoi);
console.log('  Phạm vi: ' + goi.join(' '));
console.log('  Hết hạn: ' + hetHan.toLocaleDateString('vi-VN'));
console.log('  Tệp   : ' + path.relative(GOC, duong));
console.log('\n  Mở ứng dụng máy tính → Trợ giúp → Nạp giấy phép → chọn tệp này.');
console.log('  ⚠ giay-phep/ nằm trong .gitignore. Đừng đẩy tệp này lên kho mã.');
