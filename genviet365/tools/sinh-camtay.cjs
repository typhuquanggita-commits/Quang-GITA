#!/usr/bin/env node
/* Sinh docs/GEN_VIET_365_CAM_TAY.md từ hai kho: cầm tay và tra cứu.
   Bản markdown là bản SINH RA — sửa nội dung thì sửa kho rồi chạy lại:
     node genviet365/tools/sinh-camtay.cjs                            */
'use strict';
var fs = require('fs'), path = require('path'), vm = require('vm');
var GOC = path.join(__dirname, '..');
var hop = { window: {} }; hop.window.window = hop.window; vm.createContext(hop);
['du-lieu-camtay.js', 'du-lieu-tracuu.js'].forEach(function (t) {
  vm.runInContext(fs.readFileSync(path.join(GOC, t), 'utf8'), hop);
});
var G = hop.window.GV, r = [];
function d(s) { return String(s).replace(/\|/g, '\\|').replace(/\n/g, '<br>'); }
function bang(cot, hang) {
  r.push('| ' + cot.join(' | ') + ' |', '|' + cot.map(function () { return '---'; }).join('|') + '|');
  hang.forEach(function (h) { r.push('| ' + h.map(d).join(' | ') + ' |'); });
  r.push('');
}
function luat(ds) { ds.forEach(function (x, i) { r.push((i + 1) + '. ' + x); }); r.push(''); }
function chuong(n, t, dan) { r.push('---', '', '## ' + n + '. ' + t, '', dan, ''); }

r.push('# GEN VIỆT 365 · CẦM LÊN DÙNG ĐƯỢC', '');
r.push('**Tập 8.** Bảy tập trước **mô tả** hệ thống. Tập này **giao** ra thứ dùng được sáng mai.', '');
r.push('> Rà lại toàn hệ thì thấy chín thứ được hứa nhiều lần mà chưa bao giờ được viết ra:');
r.push('> bộ bảy câu hỏi bàn ăn, bản đọc ca một trang, thư tuần, thư tay của Coach, Goal Map,');
r.push('> bản đồ cá nhân mười một ô, sổ phục hồi, giáo án, và Sổ Chuẩn. **Một hệ dạy trẻ');
r.push('> “hứa thì phải giữ” mà tự nó hứa suông thì mất nhiều hơn là thiếu một trang.**');
r.push('> Tập này trả những món nợ ấy, và bộ kiểm phát hành nay chặn nếu chúng treo trở lại.', '');
r.push('Bản trực quan: mở `genviet365/index.html`, nhóm 19 · 20 — hoặc gõ `/` để tìm.', '');

r.push('---', '', '# PHẦN A · BỘ CẦM TAY', '');

chuong('A1', 'Bảy câu hỏi bàn ăn',
  'Thứ gửi cho gia đình ở chặng đầu tiên, **trước khi bán bất cứ thứ gì**. Đây là thứ duy nhất\ntrong cả hệ được phát cho người *chưa* là gia đình của mình — nên nó phải đủ tốt để đứng một mình.');
G.CT_BAY_CAU.forEach(function (x) {
  r.push('### ' + x.so + '. ' + x.t, '');
  r.push('- **Vì sao hỏi câu này:** ' + x.n);
  r.push('- **Dấu hiệu con đang mở:** ' + x.v);
  r.push('- **Không được làm:** ' + x.k, '');
});
r.push('**Bảy luật khi dùng**', ''); luat(G.CT_BAY_LUAT);

chuong('A2', 'Bản đọc ca một trang',
  'Thứ gia đình cầm về sau buổi tư vấn đầu tiên, **dù họ không mua gì**. Bảy mục, đúng một trang.');
bang(['Mục', 'Ghi gì', 'Ví dụ'], G.CT_DOC_CA.map(function (x) { return [x.t, x.n, x.vi]; }));
r.push('**Sáu luật viết bản đọc ca**', ''); luat(G.CT_DOC_CA_LUAT);

chuong('A3', 'Giáo án buổi 1 khoá nền · chín mươi phút',
  'Chạy được từng phút. Ba thứ trong giáo án này không đổi được: **đón từng người ở cửa**,\n**trao huy hiệu thành nghi thức**, và **tiễn ra cửa**. Bỏ ba thứ đó thì còn lại là một lớp\nhọc bình thường.');
G.CT_GIAO_AN.forEach(function (x) {
  r.push('### ' + x.p + ' · ' + x.t  + '  *(' + x.ai + ')*', '');
  r.push(x.n, '');
  r.push('> **Lời Coach nói.** ' + x.loi, '');
  r.push('- **Dấu hiệu buổi đang hỏng:** ' + x.hong, '');
});
r.push('**Dụng cụ phải có sẵn trước giờ**', '');
G.CT_GIAO_AN_DUNG.forEach(function (x) { r.push('- ' + x); }); r.push('');

chuong('A4', 'Bốn kịch bản gọi điện',
  'Hệ hứa nhiều cuộc gọi trong bảng cam kết dịch vụ. Đây là nội dung của chúng.');
G.CT_KICH_BAN.forEach(function (x) {
  r.push('### ' + x.ma + ' · ' + x.t, '', '*' + x.khi + ' · ' + x.ai + '*', '');
  r.push('**Mở đầu.** ' + x.mo, '');
  r.push('**Ba câu giữa.**', '');
  x.giua.forEach(function (y, i) { r.push((i + 1) + '. ' + y); });
  r.push('');
  r.push('**Kết.** ' + x.ket, '');
  r.push('- **Không được nói:** ' + x.cam, '');
});
r.push('**Sáu luật gọi**', ''); luat(G.CT_GOI_LUAT);

chuong('A5', 'Năm lá thư mẫu',
  'Bản viết sẵn để làm mẫu **nhịp và độ dài**, không phải để chép. Chép nguyên si thì phụ huynh\nthứ hai sẽ nhận ra, và lúc ấy mất nhiều hơn được.');
G.CT_THU.forEach(function (x) {
  r.push('### ' + x.ma + ' · ' + x.t, '', '*' + x.khi + '*', '');
  r.push('**Cấu trúc.**', '');
  x.cau.forEach(function (y) { r.push('- ' + y); });
  r.push('', '**Thư viết sẵn.**', '', '```');
  r.push(x.vd);
  r.push('```', '');
  r.push('- **Không được:** ' + x.cam, '');
});

chuong('A6', 'Ba cuốn sổ của học viên',
  'Bản đồ cá nhân mười một ô · Goal Map · sổ phục hồi. Ba cuốn này là nơi bằng chứng của\ntrục G1 và trục I6 thật sự sinh ra.');
r.push('### Bản đồ cá nhân mười một ô', '');
r.push('Viết lần đầu ở buổi 3 khoá nền, rồi viết lại mỗi 90 ngày. **Giữ cả bản cũ** — đọc hai');
r.push('bản cạnh nhau là bằng chứng mạnh nhất của cả một chu kỳ.', '');
bang(['Ô', 'Câu hỏi trong ô', 'Vì sao có ô này'], G.CT_BAN_DO_11);
r.push('### Goal Map', '');
bang(['Ô', 'Ghi gì', 'Ghi chú'], G.CT_GOAL_MAP.map(function (x) { return [x.t, x.n, x.vi]; }));
r.push('### Sổ phục hồi', '');
bang(['Ô', 'Ghi gì', 'Ghi chú'], G.CT_SO_PHUC_HOI.map(function (x) { return [x.t, x.n, x.vi]; }));
r.push('**Sáu luật của ba cuốn sổ**', ''); luat(G.CT_SO_LUAT);

chuong('A7', 'Mười hai câu phỏng vấn Coach',
  'Mỗi câu ghi rõ đang tìm gì, dấu hiệu nhận, và dấu hiệu loại.');
bang(['Câu hỏi', 'Đang tìm gì', 'Dấu hiệu nhận', 'Dấu hiệu loại'], G.CT_PHONG_VAN);
r.push('**Sáu luật phỏng vấn**', ''); luat(G.CT_PV_LUAT);

chuong('A8', 'Bảng chấm cổng nghiệm thu chi tiết',
  'Sáu cột của cổng 100 điểm, mở ra thành thang chấm từng mức. **Người chấm không cần biết\nem ấy là ai** — đó là tính năng, không phải thiếu sót.');
G.CT_CHAM.forEach(function (x) {
  r.push('### ' + x.t + ' · ' + x.d + ' điểm', '');
  bang(['Khoảng điểm', 'Cho khi nào'], x.muc);
});
r.push('**Sáu luật chấm**', ''); luat(G.CT_CHAM_LUAT);

r.push('---', '', '# PHẦN B · TRA CỨU', '');

chuong('B1', 'Từ điển thuật ngữ',
  'Cột tiếng Anh **không phải bản dịch marketing** — nó là bản giải nghĩa để dùng trong hồ sơ\nquốc tế và khi làm việc với đối tác nước ngoài. Tên riêng của hệ thì giữ nguyên tiếng Việt.');
G.TC_TU_DIEN.forEach(function (n) {
  r.push('### ' + n.n, '');
  bang(['Thuật ngữ', 'Nghĩa', 'Trong hồ sơ quốc tế', 'Ở đâu'], n.ds);
});
r.push('**Năm luật dùng từ**', ''); luat(G.TC_TU_LUAT);

chuong('B2', 'Sổ Chuẩn',
  'Sổ ghi **mọi lần chuẩn của hệ bị đổi**. Không có sổ này thì bảy nguyên lý bất biến chỉ bất\nbiến trên lời nói. Sổ Chuẩn được nhắc tám lần khắp hệ trước khi nó được định nghĩa — đó là\nmột món nợ, và mục này trả nợ ấy.');
G.TC_SO_CHUAN_LA.forEach(function (x) { r.push('**' + x.t + '.** ' + x.n, '', '> ' + x.vi, ''); });
r.push('### Tám cột của sổ', '');
bang(['Cột', 'Ghi gì', 'Chỗ hay sai'], G.TC_SO_CHUAN_COT);
r.push('### Năm dòng đầu tiên', '');
r.push('Dòng **SC-2026-004** sinh ra từ một lỗi thật — và đó là loại dòng có giá trị nhất trong cả sổ.', '');
bang(['Số hiệu', 'Lớp', 'Đổi gì', 'Vì sao', 'Đã thử gì trước khi quyết', 'Trỏ về'], G.TC_SO_CHUAN_MAU);

chuong('B3', 'Bản đồ toàn hệ và mười đường đọc',
  'Không ai đọc hai mươi nhóm theo thứ tự, và cũng không nên. Bảng dưới gom chúng thành\ntám phần theo **việc**, không theo số thứ tự.');
bang(['Phần', 'Nhóm', 'Gồm gì', 'Đọc khi nào'],
  G.TC_BAN_DO.map(function (x) { return [x.t, x.nhom, x.n, x.vi]; }));
r.push('### Mười đường đọc', '');
bang(['Bạn là ai', 'Đọc theo thứ tự', 'Vì sao thứ tự này'], G.TC_DUONG_DOC);

r.push('---', '');
r.push('*Học viện GITA · Trương Nhật Quang · 08.5555.4688 — Cầm lên dùng được, bản 1.0*');

var ra = path.join(GOC, '..', 'docs', 'GEN_VIET_365_CAM_TAY.md');
fs.writeFileSync(ra, r.join('\n') + '\n', 'utf8');
console.log('Đã sinh ' + ra + ' · ' + r.length + ' dòng');
