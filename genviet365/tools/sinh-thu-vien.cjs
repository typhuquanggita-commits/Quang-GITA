#!/usr/bin/env node
/* Sinh docs/GEN_VIET_365_THU_VIEN.md từ kho du-lieu-thuvien.js.
   Bản markdown là bản SINH RA — sửa nội dung thì sửa kho rồi chạy lại:
     node genviet365/tools/sinh-thu-vien.cjs                          */
'use strict';
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var GOC = path.join(__dirname, '..');
var hop = { window: {} };
hop.window.window = hop.window;
vm.createContext(hop);
vm.runInContext(fs.readFileSync(path.join(GOC, 'du-lieu-thuvien.js'), 'utf8'), hop);
var G = hop.window.GV;

var r = [];
function d(s) { return String(s).replace(/\|/g, '\\|'); }

r.push('# GEN VIỆT 365 · THƯ VIỆN GEN VIỆT', '');
r.push('**Tập 5 — bộ sách sáu quyển.** Bốn mươi lăm chân dung người Việt xuất sắc, và mười hai');
r.push('mô thức tư duy rút ra từ họ.', '');
r.push('> Đây **không phải** một danh sách tấm gương. Mỗi chân dung phải trả lời được bốn câu:');
r.push('> người ấy đứng trước quyết định gì · chọn thế nào · mô thức rút ra là gì · và tuần này');
r.push('> học viên làm được việc gì từ đó. Chân dung nào không trả lời được cả bốn thì chưa vào sách.', '');
r.push('Bản trực quan: mở `genviet365/index.html`, nhóm 13.', '', '---', '');

r.push('## Bảy nguyên tắc biên soạn', '');
G.TV_NGUYEN_TAC.forEach(function (x, i) { r.push((i + 1) + '. **' + x.t + '.** ' + x.n); });
r.push('', '---', '', '## Sáu quyển', '');
r.push('| Quyển | Câu hỏi trung tâm | Số chân dung |', '|---|---|---|');
G.TV_QUYEN.forEach(function (q) {
  r.push('| **' + q.q + ' · ' + q.t + '** | ' + d(q.hoi) + ' | ' + q.so + ' |');
});
r.push('');

function ve(ten, ds) {
  r.push('---', '', '## ' + ten, '');
  ds.forEach(function (x) {
    r.push('### ' + x.ten + '  ·  ' + x.nam, '*' + x.danh + '*', '');
    r.push('**Việc lớn nhất.** ' + x.viec, '');
    r.push('**Quyết định then chốt.** ' + x.quyet, '');
    r.push('> **Mô thức rút ra.** ' + x.mothuc, '');
    r.push('`Trụ ' + x.tru + '` · `' + x.pc + '`', '');
    r.push('- **Tuần này em làm được:** ' + x.lam);
    r.push('- **Câu hỏi phản biện:** ' + x.hoi);
    if (x.luu) r.push('- *Ghi chú sử liệu:* ' + x.luu);
    r.push('');
  });
}
ve('QUYỂN 1 · GIỮ NƯỚC', G.TV_Q1);
ve('QUYỂN 2 · DỰNG NƯỚC', G.TV_Q2);
ve('QUYỂN 3 · HIỀN TÀI', G.TV_Q3);
ve('QUYỂN 4 · TRÍ TUỆ KHOA HỌC', G.TV_Q4);
ve('QUYỂN 5 · VĂN HIẾN', G.TV_Q5);
ve('QUYỂN 6 · NGƯỜI ĐƯƠNG THỜI', G.TV_Q6);

r.push('---', '', '## Mười hai mô thức tư duy Việt', '');
r.push('| # | Mô thức | Từ ai | Nghĩa là gì | Dùng hôm nay |', '|---|---|---|---|---|');
G.TV_MO_THUC.forEach(function (m) {
  r.push('| ' + m.so + ' | **' + m.t + '** | ' + d(m.tu) + ' | ' + d(m.n) + ' | ' + d(m.nay) + ' |');
});
r.push('');
r.push('Mười hai mô thức này **không thay thế** 100 chiến lược trong kho nghề — chúng đứng ở tầng');
r.push('cao hơn. Chiến lược trả lời *làm thế nào*; mô thức trả lời *nghĩ theo hướng nào*. Một Coach');
r.push('giỏi dùng cả hai: mô thức để chọn hướng, chiến lược để đi.', '');

r.push('---', '', '## Bảng phẩm chất', '');
r.push('| Phẩm chất | Chân dung | Câu hỏi để cả chi hội cùng nghĩ |', '|---|---|---|');
G.TV_PHAM_CHAT.forEach(function (x) {
  r.push('| **' + x.pc + '** | ' + d(x.ai) + ' | ' + d(x.hoi) + ' |');
});
r.push('');

r.push('---', '', '## Đưa bộ sách vào nhịp tuần', '');
r.push('| Ở đâu | Nhịp | Làm thế nào | Kiểm bằng gì |', '|---|---|---|---|');
G.TV_CACH_DUNG.forEach(function (x) {
  r.push('| **' + x.noi + '** | ' + d(x.nhip) + ' | ' + d(x.lam) + ' | ' + d(x.kiem) + ' |');
});
r.push('');
r.push('**Ba phút kể quyết định then chốt, hai phút rút mô thức, hai phút giao việc** — không kể');
r.push('tiểu sử. Một chân dung kể thành mười phút tiểu sử là một chân dung bị lãng phí.', '');
r.push('Và một điều phải giữ: đọc xong mỗi chân dung, **câu hỏi phản biện là bắt buộc**. Bộ sách');
r.push('này nuôi lòng tự trọng, không nuôi lòng tự tôn — mà lòng tự trọng thì phải chịu được câu hỏi.', '');

r.push('---', '', '## Nguồn và cách tra', '');
r.push('| Loại nguồn | Cụ thể |', '|---|---|');
G.TV_NGUON.forEach(function (x) { r.push('| **' + x.t + '** | ' + d(x.l) + ' |'); });
r.push('');
r.push('---', '');
r.push('*Học viện GITA · Trương Nhật Quang · 08.5555.4688 — Thư viện Gen Việt, bản 1.0*');

var ra = path.join(GOC, '..', 'docs', 'GEN_VIET_365_THU_VIEN.md');
fs.writeFileSync(ra, r.join('\n') + '\n', 'utf8');
console.log('Đã sinh ' + ra + ' · ' + r.length + ' dòng · ' +
  (G.TV_Q1.length + G.TV_Q2.length + G.TV_Q3.length +
   G.TV_Q4.length + G.TV_Q5.length + G.TV_Q6.length) + ' chân dung');
