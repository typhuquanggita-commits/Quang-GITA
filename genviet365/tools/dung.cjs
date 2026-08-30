#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · MỘT LỆNH DỰNG
     node genviet365/tools/dung.cjs            dựng và kiểm đủ
     node genviet365/tools/dung.cjs --nhanh    bỏ lớp trình duyệt

   Trước tệp này, phát hành một bản cần nhớ SÁU lệnh chạy đúng thứ
   tự, và bốn chỗ phải sửa tay cho khớp số. Quên một bước thì bản
   phát hành mang số liệu cũ mà không ai biết.

   Nay: một lệnh. Nó tự làm bảy việc, và DỪNG ở việc đầu tiên hỏng.
     1  soi cú pháp mọi tệp
     2  đóng dấu bản: mã băm nội dung và ngày dựng
     3  sinh lại bốn tập tài liệu và năm tệp dấu hiệu
     4  vá số liệu trong tài liệu viết tay cho khớp hệ thật
     5  chạy bộ kiểm phát hành đủ lớp
     6  gộp bản đầy đủ và các bản cắt theo vai
     7  in ra bảng số của bản vừa dựng
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var fs = require('fs');
var path = require('path');
var vm = require('vm');
var cp = require('child_process');
var crypto = require('crypto');

var GOC = path.join(__dirname, '..');
var REPO = path.join(GOC, '..');
var NHANH = process.argv.indexOf('--nhanh') > -1;
var t0 = Date.now();
var buoc = 0;

function tieu(s) { buoc++; console.log('\n' + buoc + '  ' + s); }
function ok(s) { console.log('   ✓ ' + s); }
function chet(s, chiTiet) {
  console.error('\n   ✗ ' + s);
  if (chiTiet) console.error(String(chiTiet).split('\n').map(function (x) {
    return '     ' + x;
  }).join('\n'));
  console.error('\nDỪNG Ở BƯỚC ' + buoc + '. Không dựng ra bản nào.');
  process.exit(1);
}
function chay(lenh) {
  try { return cp.execSync(lenh, { cwd: REPO, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch (e) { return { loi: true, ra: (e.stdout || '') + (e.stderr || '') }; }
}

/* ── danh sách tệp: đọc từ chính bộ kiểm, không chép lại ────── */
var vanKiem = fs.readFileSync(path.join(GOC, 'tools/kiem-tra.cjs'), 'utf8');
var TEP = vanKiem.match(/var TEP = \[([\s\S]*?)\];/)[1].match(/'([^']+)'/g)
  .map(function (x) { return x.slice(1, -1); });
var MOI = TEP.concat(['giao-dien.js']);

/* ── 1 · đóng dấu bản ───────────────────────────────────────
   Mã băm của toàn bộ nội dung. Đổi một chữ trong kho thì mã đổi.
   Đây vừa là số hiệu bản, vừa là bằng chứng thời điểm cho hồ sơ
   quyền tác giả — xem tập 7, mục "sáu cách đóng dấu thời gian". */
tieu('ĐÓNG DẤU BẢN');
var bam = crypto.createHash('sha256');
MOI.concat(['style.css', 'index.html'])
   .filter(function (t) { return t !== 'nen/dau-ban.js'; })   /* không tự băm chính mình */
   .sort().forEach(function (t) {
  bam.update(t).update(fs.readFileSync(path.join(GOC, t)));
});
var ma = bam.digest('hex').slice(0, 12);
var ngay = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(GOC, 'nen/dau-ban.js'),
  '/* SINH RA bởi tools/dung.cjs — không sửa tay.\n' +
  '   Mã băm của toàn bộ nội dung tại thời điểm dựng. Đổi một chữ\n' +
  '   trong kho thì mã đổi theo, nên nó vừa là số hiệu bản vừa là\n' +
  '   bằng chứng thời điểm cho hồ sơ quyền tác giả. */\n' +
  "'use strict';\n(function (G) {\n  G.DAU = { ma: '" + ma + "', ngay: '" + ngay + "' };\n" +
  '})(window.GV = window.GV || {});\n', 'utf8');
ok('mã ' + ma + ' · ngày ' + ngay);

/* ── 2 · cú pháp ───────────────────────────────────────────── */
tieu('SOI CÚ PHÁP');
MOI.forEach(function (t) {
  var r = chay('node --check ' + JSON.stringify(path.join(GOC, t)));
  if (r.loi) chet('Cú pháp hỏng ở ' + t, r.ra);
});
ok(MOI.length + ' tệp JS · cú pháp sạch');

/* ── 3 · sinh lại tài liệu và dấu hiệu ─────────────────────── */
tieu('SINH LẠI TÀI LIỆU VÀ DẤU HIỆU');
['ve-dau-hieu.cjs', 'sinh-thu-vien.cjs', 'sinh-trainghiem.cjs', 'sinh-thuonghieu.cjs',
 'sinh-camtay.cjs', 'sinh-nhuongquyen.cjs']
  .forEach(function (t) {
    var r = chay('node ' + JSON.stringify(path.join(GOC, 'tools', t)));
    if (r.loi) chet('Bộ sinh ' + t + ' hỏng', r.ra);
    ok(String(r).trim().split('\n').pop());
  });

/* ── 4 · vá số liệu trong tài liệu viết tay ────────────────── */
tieu('VÁ SỐ LIỆU TRONG TÀI LIỆU VIẾT TAY');
var hop = { window: {} };
hop.window.window = hop.window;
vm.createContext(hop);
TEP.forEach(function (t) {
  vm.runInContext(fs.readFileSync(path.join(GOC, t), 'utf8'), hop, { filename: t });
});
var G = hop.window.GV;
var SO = G.SO;
if (!SO) chet('nen/dan-xuat.js không dựng ra GV.SO');

/* Chỉ vá những mẫu câu CƠ HỌC — số nhóm, số màn, số loại khối,
   số khoá tra. Văn xuôi vẫn do người viết; chỉ con số là của máy. */
var VA = [
  [/(\d+) nhóm · (\d+) màn/g, SO.nhom + ' nhóm · ' + SO.man + ' màn'],
  [/(\d+) nhóm · (\d+) màn · (\d+) vai/g, SO.nhom + ' nhóm · ' + SO.man + ' màn · ' + SO.vai + ' vai'],
  [/dựng thử (\d+) màn/g, 'dựng thử ' + SO.man + ' màn'],
  [/toàn bộ (\d+) màn/g, 'toàn bộ ' + SO.man + ' màn'],
  [/Dựng thật (\d+) màn/g, 'Dựng thật ' + SO.man + ' màn'],
  [/(\d+) màn · (\d+) mục điều hướng · (\d+) loại khối · (\d+) khoá tra/g,
   SO.man + ' màn · ' + SO.man + ' mục điều hướng · ' + SO.loaiKhoi +
   ' loại khối · ' + SO.khoaTra + ' khoá tra'],
  [/`GV\.NHOM` \((\d+) nhóm điều hướng\) · `GV\.MAN` \((\d+) màn/g,
   '`GV.NHOM` (' + SO.nhom + ' nhóm điều hướng) · `GV.MAN` (' + SO.man + ' màn'],
  [/Lớp dựng: (\d+) loại khối/g, 'Lớp dựng: ' + SO.loaiKhoi + ' loại khối']
];
var TL = ['docs/GEN_VIET_365.md', 'docs/GEN_VIET_365_VAN_HANH.md',
          'docs/GEN_VIET_365_CHUYEN_MON.md', 'docs/GEN_VIET_365_PHAN_QUYEN.md',
          'genviet365/README.md'];
var soVa = 0;
TL.forEach(function (t) {
  var d = path.join(REPO, t);
  if (!fs.existsSync(d)) return;
  var v = fs.readFileSync(d, 'utf8'), cu = v;
  VA.forEach(function (r) { v = v.replace(r[0], r[1]); });
  if (v !== cu) { fs.writeFileSync(d, v, 'utf8'); soVa++; ok('vá ' + t); }
});
ok(soVa ? soVa + ' tệp được vá số liệu' : 'số liệu trong tài liệu đã khớp');

/* ── 5 · bộ kiểm phát hành ─────────────────────────────────── */
tieu('BỘ KIỂM PHÁT HÀNH' + (NHANH ? ' (bỏ lớp trình duyệt)' : ''));
var rk = chay('node ' + JSON.stringify(path.join(GOC, 'tools/kiem-tra.cjs')) +
              (NHANH ? ' --tinh' : ''));
if (rk.loi) chet('Bộ kiểm báo lỗi — KHÔNG ĐƯỢC PHÁT HÀNH', rk.ra);
String(rk).trim().split('\n').forEach(function (x) { if (x.trim()) ok(x.trim()); });

/* ── 6 · gộp ───────────────────────────────────────────────── */
tieu('GỘP BẢN PHÁT HÀNH');
var raGoc = process.env.GV_RA || path.join(REPO, 'ban-phat-hanh');
if (!fs.existsSync(raGoc)) fs.mkdirSync(raGoc, { recursive: true });
var ban = [['', '', 'gen-viet-365.html', 'bản đầy đủ']];
[['R16', 'B1'], ['R15', 'B1'], ['R08', 'B1'], ['R17', 'B1']].forEach(function (c) {
  ban.push([c[0], c[1], 'gen-viet-365-' + c[0].toLowerCase() + '.html',
            'bản cắt cho ' + c[0]]);
});
ban.forEach(function (b) {
  var lenh = 'node ' + JSON.stringify(path.join(GOC, 'dong-goi-artifact.cjs')) +
    (b[0] ? ' --vai=' + b[0] + ' --bac=' + b[1] : '') +
    ' ' + JSON.stringify(path.join(raGoc, b[2]));
  var r = chay(lenh);
  if (r.loi) chet('Gộp hỏng: ' + b[3], r.ra);
  var kb = Math.round(fs.statSync(path.join(raGoc, b[2])).size / 1024);
  ok(b[2] + '  ' + kb + ' KB  · ' + b[3]);
});

/* ── 7 · trang tĩnh cho máy tìm kiếm ────────────────────────
   Bản đầy đủ đổi màn bằng dấu thăng, và máy tìm kiếm không lập
   chỉ mục phần sau dấu thăng. Nên mỗi màn công khai còn được dựng
   thành một tệp riêng có địa chỉ riêng — xem nhóm 28. */
tieu('TRANG TĨNH CHO MÁY TÌM KIẾM');
var rTim = chay('node ' + JSON.stringify(path.join(GOC, 'tools/sinh-trang-tim.cjs')));
if (rTim.loi) chet('Sinh trang tĩnh hỏng', rTim.ra);
String(rTim).trim().split('\n').forEach(function (d) {
  if (d.trim()) console.log('   ' + d.trim().replace(/^[✓!]\s*/, function (m) { return m; }));
});

/* ── 8 · bảng số ───────────────────────────────────────────── */
tieu('BẢN VỪA DỰNG');
var d2 = [
  ['mã bản', ma], ['ngày', ngay],
  ['nhóm', SO.nhom], ['màn', SO.man], ['khối dựng', SO.khoi],
  ['loại khối', SO.loaiKhoi], ['khoá tra', SO.khoaTra + '  (tự đăng ký ' + SO.khoaTuDong + ')'],
  ['vai', SO.vai + ' trong hệ + ' + SO.vaiNgoai + ' ngoài hệ'],
  ['tầng hiển thị', SO.tang], ['bậc nhân tài', SO.bac], ['trục năng lực', SO.truc],
  ['chân dung Thư viện', SO.chanDung], ['cam kết dịch vụ', SO.camKet],
  ['mục từ điển', SO.tuDien]
];
d2.forEach(function (r) {
  console.log('   ' + String(r[0]).padEnd(22) + r[1]);
});
console.log('\nĐẠT. Dựng xong trong ' + ((Date.now() - t0) / 1000).toFixed(1) + ' giây.');
console.log('Bản phát hành nằm ở ' + raGoc);
