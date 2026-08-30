#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   SINH BẢNG KÊ TÁC PHẨM CHO HỒ SƠ ĐĂNG KÝ QUYỀN TÁC GIẢ

   Vì sao phải sinh chứ không viết tay. Hồ sơ đăng ký cần mô tả
   CHÍNH XÁC tác phẩm: gồm bao nhiêu phần, mỗi phần bao nhiêu mục,
   định hình ngày nào, và phần nào là sáng tạo riêng, phần nào rút
   từ tài liệu đã có, phần nào là tham chiếu của bên thứ ba.

   Một bảng kê viết tay sẽ lệch ngay ở lần sửa nội dung tiếp theo,
   và một hồ sơ có số liệu lệch là hồ sơ yếu. Bảng kê này sinh từ
   chính kho, nên nó không bao giờ lệch — và mã băm bản dựng đi kèm
   là bằng chứng thời điểm định hình.

   Chạy:  node genviet365/tools/sinh-ho-so-bq.cjs
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var fs = require('fs'), path = require('path'), vm = require('vm');
var GOC = path.join(__dirname, '..');
var hop = { window: {} }; hop.window.window = hop.window; vm.createContext(hop);
var TEP = fs.readFileSync(path.join(GOC, 'tools/kiem-tra.cjs'), 'utf8')
  .match(/var TEP = \[([\s\S]*?)\];/)[1].match(/'([^']+)'/g)
  .map(function (x) { return x.slice(1, -1); });
TEP.forEach(function (t) { vm.runInContext(fs.readFileSync(path.join(GOC, t), 'utf8'), hop, { filename: t }); });
var G = hop.window.GV;

var r = [];
function d(s) { return String(s).replace(/\|/g, '\\|').replace(/\n/g, '<br>'); }
function bang(cot, hang) {
  r.push('| ' + cot.join(' | ') + ' |', '|' + cot.map(function () { return '---'; }).join('|') + '|');
  hang.forEach(function (h) { r.push('| ' + h.map(d).join(' | ') + ' |'); });
  r.push('');
}
function luat(ds) { ds.forEach(function (x, i) { r.push((i + 1) + '. ' + x); }); r.push(''); }
function chuong(n, t, dan) { r.push('---', '', '## ' + n + '. ' + t, '', dan, ''); }

/* ── đếm ─────────────────────────────────────────────────── */
var soMan = Object.keys(G.MAN).length;
var soNhom = G.NHOM.length;
var soKhoi = 0;
Object.keys(G.MAN).forEach(function (v) { soKhoi += (G.MAN[v].khoi || []).length; });
var soPhanTu = 0, khoDs = [];
Object.keys(G.TU).forEach(function (k) {
  var v = G.TU[k];
  if (Array.isArray(v)) { soPhanTu += v.length; }
});
/* thành phần: mọi khoá kho là mảng, kèm số phần tử */
Object.keys(G).forEach(function (k) {
  if (!/^[A-Z][A-Z0-9_]*$/.test(k)) return;
  if (k === 'TU' || k === 'MAN' || k === 'NHOM' || k === 'TU_TU_DONG') return;
  var v = G[k];
  if (Array.isArray(v) && v.length) khoDs.push([k, String(v.length)]);
});
khoDs.sort(function (a, b) { return a[0] < b[0] ? -1 : 1; });

/* nhóm nguồn theo sổ nguồn */
var rut = 0, trung = 0, no = 0;
(G.SN_TEP || []).forEach(function (x) {
  if (x[2] === 'ĐÃ RÚT') rut++;
  else if (x[2] === 'TRÙNG BẢN') trung++;
  else if (x[2] === 'CHƯA ĐỌC ĐƯỢC') no++;
});

/* ── văn bản ─────────────────────────────────────────────── */
r.push('# GEN VIỆT 365 · BẢNG KÊ TÁC PHẨM', '');
r.push('**Phụ lục hồ sơ đăng ký quyền tác giả.** Bản kê này **sinh tự động từ chính tác phẩm**,');
r.push('không gõ tay. Mọi con số trong đây là kết quả đếm tại thời điểm dựng, nên không có');
r.push('khả năng lệch với nội dung thật.', '');
bang(['Mục', 'Nội dung'], [
  ['Tên tác phẩm', 'GEN VIỆT 365 — Hệ điều hành phát triển con người'],
  ['Loại hình', 'Tác phẩm viết · chương trình máy tính (phần giao diện tra cứu)'],
  ['Chủ sở hữu', 'Học viện GITA'],
  ['Mã bản dựng', G.DAU.ma],
  ['Ngày định hình bản này', G.DAU.ngay],
  ['Số phần nội dung', soNhom + ' nhóm'],
  ['Số mục nội dung', soMan + ' màn'],
  ['Số khối trình bày', String(soKhoi)],
  ['Số phần tử dữ liệu', String(soPhanTu)],
  ['Số kho dữ liệu thành phần', String(khoDs.length)],
  ['Số tệp mã nguồn', String(TEP.length + 3)]
]);
r.push('> **Mã bản dựng là bằng chứng thời điểm.** Nó là mã băm SHA-256 rút gọn của toàn bộ nội');
r.push('> dung tác phẩm tại thời điểm dựng. Đổi một chữ trong kho thì mã đổi theo. Giữ lại mã này');
r.push('> cùng ngày dựng là cách chứng minh bản nào có trước — xem tập 7, mục đóng dấu thời gian.', '');

chuong('1', 'Bảng kê phần và mục',
  'Mỗi dòng là một **mục** của tác phẩm, kèm phần chứa nó và tầng quyền truy cập.\nCột tầng quyền có ý nghĩa pháp lý: nó cho thấy tác phẩm có **cơ chế kiểm soát\ntruy cập theo vai**, chứ không phải một tập tài liệu mở.');
var hang = [];
G.NHOM.forEach(function (n) {
  (n.ds || []).forEach(function (i) {
    var m = G.MAN[i.v] || {};
    hang.push([n.no, n.t, i.v, m.t || i.t, m.q || '—', String((m.khoi || []).length)]);
  });
});
bang(['Phần', 'Tên phần', 'Mã mục', 'Tên mục', 'Tầng quyền', 'Số khối'], hang);

chuong('2', 'Bảng kê kho dữ liệu thành phần',
  'Nội dung của tác phẩm tách rời khỏi cách trình bày. Mỗi kho dưới đây là một\ntập dữ liệu độc lập, dùng lại được ở nhiều mục.');
var cot = [];
for (var i = 0; i < khoDs.length; i += 3) {
  cot.push([khoDs[i] ? khoDs[i][0] : '', khoDs[i] ? khoDs[i][1] : '',
            khoDs[i + 1] ? khoDs[i + 1][0] : '', khoDs[i + 1] ? khoDs[i + 1][1] : '',
            khoDs[i + 2] ? khoDs[i + 2][0] : '', khoDs[i + 2] ? khoDs[i + 2][1] : '']);
}
bang(['Kho', 'Số mục', 'Kho', 'Số mục', 'Kho', 'Số mục'], cot);

chuong('3', 'Phân định nguồn gốc nội dung',
  'Phần quan trọng nhất của hồ sơ, và phần dễ bị bỏ qua nhất. Một hồ sơ khai\ntoàn bộ là sáng tạo riêng trong khi có phần rút từ tài liệu bên thứ ba là hồ\nsơ có rủi ro. Ở đây phân định rõ ba loại.');
bang(['Loại nội dung', 'Thuộc về ai', 'Có trong tác phẩm ở đâu', 'Xử lý trong hồ sơ'], [
  ['Tài liệu gốc của Học viện GITA',
   'Học viện GITA — chủ sở hữu',
   rut + ' tệp đã rút thành kho: chương trình 12 khối, hệ 10 cấp độ, 52 tuần, cẩm nang vận hành, sách Master, trại, học viện VIP',
   'Kê khai là tác phẩm gốc của chủ sở hữu. Đây là phần lớn nhất của tác phẩm.'],
  ['Kiến trúc, phân quyền, bộ kiểm, cách trình bày',
   'Sáng tạo riêng cho tác phẩm này',
   'Bảy lớp kiến trúc · hai trục phân quyền · bộ kiểm tám lớp · 65 loại khối trình bày · sổ yêu cầu · sổ nguồn',
   'Kê khai là phần sáng tạo mới, có tính nguyên gốc rõ rệt.'],
  ['Tham chiếu của bên thứ ba',
   'Thuộc về tổ chức khác — KHÔNG thuộc Học viện',
   'Mô hình chi hội BNI · mô hình câu lạc bộ học đường Nhật Bản',
   'KHÔNG kê khai là tác phẩm của mình. Chỉ học cơ chế, không sao chép thương hiệu hay nguyên văn. Phần đối chiếu là bình luận và phân tích — có tính nguyên gốc riêng.'],
  ['Văn bản quy phạm pháp luật',
   'Nhà nước',
   'Nghị định 79/2017/NĐ-CP · Nghị quyết 29-NQ/TW · Nghị quyết 71-NQ/TW · Chương trình giáo dục phổ thông 2018',
   'Không thuộc phạm vi quyền tác giả. Chỉ viện dẫn số hiệu, không chép nội dung.']
]);

chuong('4', 'Bảng kê nguồn đã khai thác',
  'Sổ nguồn của tác phẩm, đưa vào hồ sơ để chứng minh **quá trình hình thành**.\nMột tác phẩm nêu được mình dựng từ những gì thì mạnh hơn một tác phẩm chỉ\nnêu kết quả.');
r.push('Tổng: **' + (G.SN_TEP || []).length + ' dòng tệp** — ' + rut + ' đã rút · ' +
  trung + ' trùng bản · ' + no + ' chưa đọc được.', '');
bang(['Tệp', 'Cỡ', 'Trạng thái', 'Rút ra được gì', 'Kho chứa'], G.SN_TEP || []);

chuong('5', 'Bảng kê yêu cầu đã đáp ứng',
  'Sổ yêu cầu, đưa vào hồ sơ để chứng minh tác phẩm được đặt hàng và nghiệm thu\ntheo yêu cầu cụ thể của chủ sở hữu.');
bang(['Mã', 'Yêu cầu', 'Đáp ứng ở mục nào'],
  (G.SC_YEU_CAU || []).map(function (x) { return [x.ma, x.y, (x.man || []).join(' · ')]; }));

chuong('6', 'Bằng chứng tính toàn vẹn',
  'Tác phẩm mang sẵn cơ chế tự kiểm. Đây là thứ hiếm gặp trong hồ sơ đăng ký, và\nnó chứng minh tác phẩm **không phải một tập tài liệu rời được gom lại**.');
bang(['Lớp kiểm', 'Kiểm điều gì', 'Không đạt thì sao'], [
  ['Kiểm tĩnh', 'Cấu trúc: mục thiếu, khoá hỏng, bảng lệch cột, ô rỗng, chữ tạm', 'Chặn phát hành'],
  ['Sổ cái yêu cầu', 'Mỗi yêu cầu viện dẫn mục và kho có thật', 'Chặn phát hành'],
  ['Món nợ số', 'Mọi con số hứa trong văn xuôi khớp số phần tử thật', 'Chặn phát hành'],
  ['Sổ nguồn', 'Mỗi tệp đã rút nêu được kho chứa, mỗi món nợ nêu được cách gỡ', 'Chặn phát hành'],
  ['Bản cắt', 'Nội dung ngoài quyền không lọt vào bản phát cho vai thấp', 'Chặn phát hành'],
  ['Lớp chạy', 'Mọi mục dựng ra được bằng trình duyệt thật, không mục nào rỗng ruột', 'Chặn phát hành'],
  ['Cổng quyền', 'Vào thẳng bằng đường dẫn một mục ngoài quyền phải ra thẻ khoá', 'Chặn phát hành'],
  ['Tương phản màu', 'Mọi mã màu chữ đạt ngưỡng WCAG AA 4.5:1 trên cả hai chế độ', 'Chặn phát hành']
]);
r.push('Mã bản dựng `' + G.DAU.ma + '` ngày ' + G.DAU.ngay + ' là bản đã qua đủ tám lớp trên.', '');

chuong('7', 'Điều cần lưu ý khi nộp',
  'Rút từ chính phần bản quyền của tác phẩm (tập 7).');
luat([
  'Quyền tác giả phát sinh **tự động** từ khi tác phẩm được định hình, không phụ thuộc việc đã đăng ký. Đăng ký là để **chứng minh** khi có tranh chấp, không phải để **có** quyền.',
  'Nộp kèm bản in của bảng kê này cùng bản lưu điện tử có mã băm. Hai thứ đối chiếu được với nhau là bằng chứng thời điểm mạnh nhất mà không tốn thêm chi phí.',
  'Phần tham chiếu bên thứ ba ở chương 3 phải giữ nguyên trong hồ sơ. Khai thiếu phần này để hồ sơ gọn hơn là tự tạo ra rủi ro về sau.',
  'Mỗi lần nội dung đổi đáng kể thì dựng lại, lưu mã băm mới, và giữ cả mã cũ. Chuỗi mã băm theo thời gian là lịch sử hình thành tác phẩm.',
  'Nhãn hiệu và quyền tác giả là hai thủ tục khác nhau ở hai cơ quan khác nhau. Bảng kê này phục vụ quyền tác giả; phần nhãn hiệu xem tập 7.',
  'Không nộp phần dữ liệu người học vào bất kỳ hồ sơ nào. Dữ liệu trẻ em có ràng buộc pháp lý riêng, nặng hơn dữ liệu thường.'
]);

r.push('---', '');
r.push('*Bảng kê này sinh ra bởi `genviet365/tools/sinh-ho-so-bq.cjs` từ chính nội dung tác phẩm.');
r.push('Dựng lại thì số liệu tự cập nhật. Không sửa thẳng vào tệp này.*', '');

fs.writeFileSync(path.join(GOC, '..', 'docs', 'GEN_VIET_365_BANG_KE_TAC_PHAM.md'), r.join('\n'));
console.log('Đã sinh docs/GEN_VIET_365_BANG_KE_TAC_PHAM.md · ' + r.length + ' dòng · ' +
  soMan + ' mục · ' + khoDs.length + ' kho · ' + soPhanTu + ' phần tử');
