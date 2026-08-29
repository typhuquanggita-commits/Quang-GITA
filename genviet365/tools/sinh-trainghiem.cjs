#!/usr/bin/env node
/* Sinh docs/GEN_VIET_365_TRAI_NGHIEM.md từ ba kho: trải nghiệm, giá trị,
   tin cậy. Bản markdown là bản SINH RA — sửa nội dung thì sửa kho rồi
   chạy lại:  node genviet365/tools/sinh-trainghiem.cjs                */
'use strict';
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var GOC = path.join(__dirname, '..');
var hop = { window: {} };
hop.window.window = hop.window;
vm.createContext(hop);
['du-lieu-trainghiem.js', 'du-lieu-giatri.js', 'du-lieu-tincay.js'].forEach(function (t) {
  vm.runInContext(fs.readFileSync(path.join(GOC, t), 'utf8'), hop);
});
var G = hop.window.GV;

var r = [];
function d(s) { return String(s).replace(/\|/g, '\\|').replace(/\n/g, ' '); }
function bang(cot, hang) {
  r.push('| ' + cot.join(' | ') + ' |', '|' + cot.map(function () { return '---'; }).join('|') + '|');
  hang.forEach(function (h) { r.push('| ' + h.map(d).join(' | ') + ' |'); });
  r.push('');
}
function luat(ds) { ds.forEach(function (x, i) { r.push((i + 1) + '. ' + x); }); r.push(''); }
function chuong(n, t, dan) { r.push('---', '', '## ' + n + '. ' + t, '', dan, ''); }

r.push('# GEN VIỆT 365 · TRẢI NGHIỆM, GIÁ TRỊ VÀ TIN CẬY', '');
r.push('**Tập 6.** Bốn tập đầu nói hệ này *là gì* và *chạy thế nào*. Tập 5 nói nó lấy chất');
r.push('liệu từ đâu. Tập này trả lời câu hỏi còn lại, và là câu hỏi quyết định hệ có sống');
r.push('được hay không: **đứng từ phía gia đình nhìn vào, hệ này cảm thấy như thế nào — và');
r.push('lấy gì chứng minh rằng nó có tác dụng thật.**', '');
r.push('> Một kiến trúc đẹp mà gia đình không cảm thấy gì thì chỉ là một sơ đồ. Một lời hứa');
r.push('> không có thứ để đền thì chỉ là một câu quảng cáo. Một kết quả không có bằng chứng');
r.push('> ngoài hệ thì chỉ là một niềm tin dễ chịu.', '');
r.push('Bản trực quan: mở `genviet365/index.html`, nhóm 14 · 15 · 16.', '');

/* ─── PHẦN A ─── */
r.push('---', '', '# PHẦN A · TRẢI NGHIỆM VÀ CAM KẾT', '');

chuong('A1', 'Hành trình 365 ngày của một gia đình',
  'Không phải phễu bán hàng. Đây là bản đồ **cảm xúc**: ở mỗi chặng phụ huynh đang nghĩ gì,\nsợ gì, và hệ đặt cái gì vào tay họ. Mỗi chặng có một *dấu hiệu đang rơi* và một *việc cứu* —\nđó là phần giá trị nhất, vì biết trước chỗ người ta hay rời đi thì mới giữ được.');
G.TN_HANH_TRINH.forEach(function (x) {
  r.push('### ' + x.ma + ' · ' + x.t + '  ·  ' + x.khi, '');
  r.push('**Phụ huynh đang nghĩ.** ' + x.nghi, '');
  r.push('**Điều họ sợ.** ' + x.so, '');
  r.push('**Hệ làm gì.**', '');
  x.lam.forEach(function (y) { r.push('- ' + y); });
  r.push('');
  r.push('- **Gia đình cầm về:** ' + x.vat);
  r.push('- **Dấu hiệu đang rơi:** ' + x.roi);
  r.push('- **Việc cứu:** ' + x.cuu, '');
});
r.push('**Ba điều xuyên suốt chín chặng**', '');
luat(G.TU_XUYEN || ['Mỗi chặng phải để lại một vật cầm được. Chặng nào không có vật thì chặng ấy không được nhớ.',
  'Mỗi chặng có một dấu hiệu đang rơi được định nghĩa trước — không đợi tới lúc gia đình nói mới biết.',
  'Việc cứu luôn là một việc, không phải một lời. Gọi điện thuyết phục không phải việc cứu.']);

chuong('A2', 'Mười hai khoảnh khắc quyết định',
  'Cảm nhận của cả một năm được quyết định ở khoảng mười hai điểm. Làm đúng mười hai điểm này\nthì phần còn lại được tha thứ; làm sai thì phần còn lại không cứu nổi. Cột *thường thấy*\nkhông phải để chê ai — nó là mặc định mà mọi tổ chức trôi về nếu không ai giữ.');
bang(['#', 'Khoảnh khắc', 'Thường thấy', 'Chuẩn Gen Việt', 'Đo bằng'],
  G.TN_KHOANH_KHAC.map(function (x) { return [x.so, x.t, x.thuong, x.minh, x.do]; }));

chuong('A3', 'Mười hai cam kết dịch vụ',
  'Hứa ít mà giữ được. Điều làm nên khác biệt không phải lời hứa — mà là **thứ đền khi không\ngiữ được**, đền tự động, không đợi gia đình đòi. Cột cuối cùng là cột quan trọng nhất của\ncả bảng: người ta không nhớ mình đúng bao nhiêu lần, người ta nhớ cách mình xử lúc mình sai.');
bang(['Mã', 'Hứa gì', 'Đo bằng', 'Ngưỡng', 'Không giữ được thì đền'],
  G.TN_CAM_KET.map(function (x) { return [x.ma, x.hua, x.do, x.nguong, x.den]; }));

chuong('A4', 'Cổng phụ huynh',
  'Phụ huynh không cần biết mọi thứ. Họ cần biết bảy thứ, đúng lúc, và không phải đi hỏi.');
bang(['Thấy gì', 'Là gì', 'Luật đi kèm'], G.TN_CONG_PH.map(function (x) { return [x.t, x.n, x.vi]; }));
r.push('**Sáu luật của cổng**', '');
luat(G.TN_LUAT_PH);

chuong('A5', 'Mười bốn hiện vật, và cách trao',
  'Giá vốn mỗi thứ vài chục nghìn; giá trị cảm xúc gấp trăm lần — nhưng chỉ khi trao đúng cách.\nPhát hàng loạt cuối buổi là cách chắc chắn nhất để giết một hiện vật. Cột *trao thế nào*\nquan trọng hơn cột *là gì*.');
bang(['Hiện vật', 'Trao khi nào', 'Ai trao', 'Trao thế nào', 'Vì sao quan trọng'],
  G.TN_HIEN_VAT.map(function (x) { return [x.t, x.khi, x.ai, x.cach, x.vi]; }));

chuong('A6', 'Khi hỏng việc — năm bước phục hồi dịch vụ',
  'Gia đình từng phàn nàn và được xử tử tế trung thành hơn gia đình chưa bao giờ phàn nàn.\nPhàn nàn là quà, với điều kiện mình xử nó như quà.');
bang(['Bước', 'Làm gì', 'Ai làm', 'Cụ thể', 'Đầu ra'],
  G.TN_PHUC_HOI.map(function (x) { return [x.b, x.t, x.ai, x.n, x.ra]; }));
r.push('**Tám loại phàn nàn thường gặp**', '');
bang(['Phàn nàn', 'Ai xử lý', 'Trong bao lâu', 'Bù gì'], G.TN_PHAN_NAN);
r.push('**Sáu luật xử phàn nàn**', '');
luat(G.TN_LUAT_PN);

chuong('A7', 'Khi con muốn nghỉ',
  'Lý do được nói gần như không bao giờ là lý do thật. Chữa lý do được nói thì mất người;\ntìm ra lý do thật thì giữ được.');
G.TN_NGHI.forEach(function (x) {
  r.push('### ' + x.t, '');
  r.push('- **Lý do thật đằng sau:** ' + x.dh);
  r.push('- **Cách kiểm:** ' + x.can);
  r.push('- **Việc phải làm:** ' + x.lam);
  r.push('- **Không được làm:** ' + x.bay, '');
});
r.push('**Ra đi tử tế.** Cách một tổ chức tiễn người quyết định người ấy kể lại về nó thế nào', 'trong mười năm sau.', '');
luat(G.TN_RA_DI);

chuong('A8', 'Đo cảm nhận',
  'Không đo bằng câu “anh chị hài lòng chứ ạ”. Câu ấy chỉ đo được mức lịch sự của người được hỏi.\nSáu chỉ số dưới đây đo **hành vi**, và ba trong sáu chỉ số hỏi trẻ hoặc quan sát trẻ, không\nhỏi người trả tiền.');
bang(['Chỉ số', 'Đo thế nào', 'Ngưỡng đỏ → làm gì', 'Nhịp'],
  G.TN_DO_CAM.map(function (x) { return [x.b, x.n, x.lam, x.cham]; }));

/* ─── PHẦN B ─── */
r.push('---', '', '# PHẦN B · GIÁ TRỊ VÀ TĂNG TRƯỞNG', '');
r.push('> Luật trùm lên toàn bộ phần này: **tiền không mua bậc.** Tiền mua chỗ ngồi, mua thời');
r.push('> gian của người kèm, mua công cụ. Bậc chỉ đổi bằng bằng chứng.', '');

chuong('B1', 'Năm gói',
  'Mỗi gói có một mục **“không phù hợp với ai”**. Mục ấy quan trọng hơn mục “gồm gì”: bán đúng\nngười thì giữ được người; bán sai người thì mất cả tiền lẫn danh dự.');
G.GT_GOI.forEach(function (x) {
  r.push('### ' + x.ma + ' · ' + x.t + '  ·  ' + x.nhip, '');
  r.push('*' + x.cho + '*', '');
  x.gom.forEach(function (y) { r.push('- ' + y); });
  r.push('');
  r.push('- **Cam kết đầu ra:** ' + x.cam);
  r.push('- **Không phù hợp với ai:** ' + x.khong, '');
});
r.push('**Bảy luật về giá**', '');
luat(G.GT_LUAT_GIA);

chuong('B2', 'Chồng giá trị',
  'Bảng này chỉ có tác dụng nếu từng dòng đều thật và kiểm được. Thổi phồng một dòng thì cả\nbảng mất giá trị. Khi phụ huynh nói “đắt quá”, phần lớn không phải đắt — mà là *chưa thấy đáng*.');
bang(['Hạng mục', 'Gia đình nhận gì', 'Tương đương thị trường', 'Ghi chú trung thực'], G.GT_CHONG);

chuong('B3', 'Ba lớp bảo đảm',
  'Điều kiện phải rõ tới mức không cãi nhau được. Bảo đảm mập mờ còn tệ hơn không có bảo đảm:\nnó tạo kỳ vọng rồi phản bội kỳ vọng ấy đúng lúc người ta cần mình nhất.');
G.GT_BAO_DAM.forEach(function (x) {
  r.push('### ' + x.t, '');
  r.push('- **Điều kiện:** ' + x.dk);
  r.push('- **Được gì:** ' + x.duoc);
  r.push('- **Ai phán quyết:** ' + x.ai);
  r.push('- **Giới hạn nói rõ:** ' + x.gioi, '');
});

chuong('B4', 'Đơn vị kinh tế',
  'Không có bảng này thì mọi lý tưởng ở các tập trước đều là lý tưởng của người khác trả tiền.\nCác tỉ lệ là khoảng tham chiếu để dựng mô hình, không phải con số tuyệt đối cho mọi địa phương.');
bang(['Khoản', 'Gồm gì', 'Tỉ trọng tham chiếu', 'Ghi chú'], G.GT_KINH_TE);
r.push('**Bốn ngưỡng phải nhớ**', '');
G.GT_LUAT_KT.forEach(function (x) {
  r.push('- **' + x.m + ' · ' + x.t + '**');
  x.v.forEach(function (y) { r.push('  - ' + y); });
});
r.push('');

chuong('B5', 'Phễu tuyển sinh năm tầng',
  'Tầng cuối cùng là tầng duy nhất mà đầu tư vào nó không bao giờ lỗ.');
bang(['Tầng', 'Là gì', 'Ai giữ', 'Việc làm', 'Ngưỡng chuyển'],
  G.GT_PHEU.map(function (x) { return [x.b, x.t, x.ai, x.n, x.ra]; }));

chuong('B6', 'Bộ thông điệp',
  'Thông điệp không phải khẩu hiệu. Nó là *thứ mình dám bị kiểm chứng*. Mỗi câu đều có một màn\ntrong hệ chứng minh cho nó — nếu không có, câu ấy phải bị bỏ.');
G.GT_THONG_DIEP.forEach(function (x) { r.push('**' + x.t + '.** ' + x.n, ''); });

chuong('B7', 'Mười hai phản đối thường gặp',
  'Nguyên tắc chung: **không phản bác**. Hỏi lại một câu sâu hơn, rồi im lặng chờ. Cột *điều\nthật đằng sau* phải đọc trước; ba cột còn lại vô dụng nếu đọc sai cột ấy.');
G.GT_PHAN_DOI.forEach(function (x) {
  r.push('### ' + x.t, '');
  r.push('- **Điều thật đằng sau:** ' + x.sau);
  r.push('- **Hỏi lại một câu:** ' + x.hoi);
  r.push('- **Nói gì:** ' + x.noi);
  r.push('- **Không nói gì:** ' + x.khong, '');
});

chuong('B8', 'Hợp tác nhà trường',
  'Thứ nhà trường cần không phải “kỹ năng sống”. Họ cần lớp dễ quản hơn, phong trào có sản phẩm,\nvà phụ huynh bớt phàn nàn. Bán đúng thứ người ngồi đối diện đang phải chịu trách nhiệm thì cửa mở.');
bang(['Mô hình', 'Bán cho ai', 'Họ thật sự cần gì', 'Mình đưa gì', 'Bẫy'],
  G.GT_NHA_TRUONG.map(function (x) { return [x.t, x.dh, x.can, x.lam, x.bay]; }));

chuong('B9', 'Nhân rộng mà không loãng chất',
  'Ba đường, ba tốc độ, ba mức rủi ro. Đường lành nhất là đường chậm nhất — và chậm là tính năng,\nkhông phải lỗi.');
bang(['Đường', 'Là gì', 'Điều kiện', 'Được cầm gì · không được cầm gì', 'Rủi ro chính'],
  G.GT_NHAN_RONG.map(function (x) { return [x.t, x.dh, x.can, x.lam, x.bay]; }));
r.push('**Bảy thứ không bên nào được sửa**', '');
luat(G.GT_LOI_BAT_BIEN);

/* ─── PHẦN C ─── */
r.push('---', '', '# PHẦN C · BẰNG CHỨNG VÀ TIN CẬY', '');

chuong('C1', 'Đo tác động thật',
  'Một hệ nói về nhân tài mà không chứng minh được mình có tác dụng thì cũng chỉ là một niềm\ntin dễ chịu. Phần lớn tổ chức giáo dục dừng ở tầng một rồi gọi đó là kết quả.');
r.push('**Ba tầng bằng chứng**', '');
G.TC_TANG_BC.forEach(function (x) {
  r.push('' + x.so + '. **' + x.t + '** — ' + x.n);
  r.push('   ' + x.v);
});
r.push('');
r.push('**Tám chỉ số ngoài hệ.** Điểm chung: chúng xảy ra ở nơi hệ *không có mặt*.', '');
bang(['Chỉ số', 'Đo gì', 'Lấy ở đâu', 'Trụ'], G.TC_CHI_SO);
r.push('**Năm bước thiết kế phép đo**', '');
bang(['Bước', 'Làm gì', 'Ai làm', 'Cụ thể', 'Đầu ra'],
  G.TC_THIET_KE.map(function (x) { return [x.b, x.t, x.ai, x.n, x.ra]; }));
r.push('**Sáu luật trung thực**', '');
luat(G.TC_LUAT_DO);

chuong('C2', 'Theo dõi dọc ba mươi năm',
  'Tài sản mà không đối thủ nào sao chép được trong ngắn hạn, vì thứ duy nhất tạo ra nó là\nthời gian. Bắt đầu từ khoá đầu tiên, năm 2026; mốc cuối rơi đúng vào 2056.');
G.TC_THEO_DOI.forEach(function (x) {
  r.push('- **' + x.m + ' · ' + x.t + '**');
  x.v.forEach(function (y) { r.push('  - ' + y); });
});
r.push('');
r.push('**Năm luật của dữ liệu theo dõi dọc**', '');
luat(G.TC_LUAT_TD);

chuong('C3', 'Kiểm định',
  'Nội kiểm hằng quý giữ cho hệ không trôi. Ngoại kiểm hằng năm giữ cho hệ không tự huyễn hoặc.');
bang(['Hạng mục', 'Ai kiểm', 'Nhịp', 'Ngưỡng', 'Không đạt thì sao'], G.TC_KIEM_DINH);

chuong('C4', 'Mười luật đỏ bảo vệ trẻ em',
  'Không có mức phạt trung gian cho luật đỏ. Vi phạm là chấm dứt, và điều tra sau khi đã đình chỉ.\nMọi người trong hệ ký nhận từng điều trước buổi đầu tiên tiếp xúc với trẻ.');
luat(G.TC_BAO_VE);

chuong('C5', 'Dữ liệu của con',
  'Thu tối thiểu, giữ có hạn, và trả lại quyền cho chính người ấy khi đủ tuổi.');
bang(['Nguyên tắc', 'Là gì', 'Cụ thể'], G.TC_DU_LIEU.map(function (x) { return [x.t, x.n, x.vi]; }));

chuong('C6', 'Năm cấp khủng hoảng và hai mươi tư giờ vàng',
  'Phân cấp trước, để lúc xảy ra không phải bàn xem việc này to hay nhỏ.');
bang(['Cấp', 'Dấu hiệu', 'Phanh'], G.TC_KHUNG_HOANG.map(function (x) { return [x.t, x.dau, x.phanh]; }));
r.push('**Hai mươi tư giờ vàng.** Trình tự không đổi theo mức độ nghiêm trọng.', '');
bang(['Bước', 'Làm gì', 'Ai làm', 'Cụ thể', 'Đầu ra'],
  G.TC_24H.map(function (x) { return [x.b, x.t, x.ai, x.n, x.ra]; }));

chuong('C7', 'Mười hồ sơ phải có',
  'Giấy tờ không tạo ra chất lượng. Nhưng thiếu giấy tờ thì một sự cố nhỏ đủ để xoá sạch mười\nnăm gây dựng.');
bang(['Hồ sơ', 'Vì sao cần · gồm gì', 'Ai giữ', 'Nhịp cập nhật'], G.TC_PHAP_LY);

chuong('C8', 'Câu hỏi thường gặp',
  'Sáu nhóm người hỏi. Bộ câu trả lời này là **một nguồn duy nhất**: ai trong hệ cũng trả lời\ngiống nhau — khác nhau ở giọng, không khác ở nội dung.');
G.TC_FAQ.forEach(function (n) {
  r.push('### ' + n.nhom, '');
  n.ds.forEach(function (x) { r.push('**' + x.h + '**', '', x.d, ''); });
});

chuong('C9', 'Sổ ghi lỗi công khai',
  'Rất ít tổ chức dám làm việc này. Đó chính là lý do nên làm: thứ ai cũng làm được thì không\ntạo ra niềm tin. Một hệ nói với trẻ rằng *sai thì nhận và làm lại* mà bản thân nó không dám\nghi lại cái sai của mình thì đang dạy điều ngược với điều nó nói.');
bang(['Mục', 'Là gì', 'Cụ thể'], G.TC_SO_LOI.map(function (x) { return [x.t, x.n, x.vi]; }));
r.push('**Sáu lỗi đã lường trước.** Viết *trước khi* chúng xảy ra, để khi mắc thì nhận ra ngay.', '');
bang(['Lỗi', 'Ai bị ảnh hưởng', 'Đã sửa gì', 'Luật sinh ra từ lỗi này'], G.TC_LOI_MAU);

r.push('---', '');
r.push('*Học viện GITA · Trương Nhật Quang · 08.5555.4688 — Trải nghiệm, giá trị và tin cậy, bản 1.0*');

var ra = path.join(GOC, '..', 'docs', 'GEN_VIET_365_TRAI_NGHIEM.md');
fs.writeFileSync(ra, r.join('\n') + '\n', 'utf8');
console.log('Đã sinh ' + ra + ' · ' + r.length + ' dòng');
