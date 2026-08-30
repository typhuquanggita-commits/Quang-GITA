#!/usr/bin/env node
/* Sinh docs/GEN_VIET_365_NHUONG_QUYEN.md và docs/GEN_VIET_365_TIM_THAY.md
   từ hai kho: nhượng quyền và hiện diện số.
   Bản markdown là bản SINH RA — sửa nội dung thì sửa kho rồi chạy lại:
     node genviet365/tools/sinh-nhuongquyen.cjs                       */
'use strict';
var fs = require('fs'), path = require('path'), vm = require('vm');
var GOC = path.join(__dirname, '..');
var hop = { window: {} }; hop.window.window = hop.window; vm.createContext(hop);
['du-lieu-nhuongquyen.js', 'du-lieu-seo.js'].forEach(function (t) {
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
function gach(ds) { ds.forEach(function (x) { r.push('- ' + x); }); r.push(''); }
function chuong(n, t, dan) { r.push('---', '', '## ' + n + '. ' + t, '', dan, ''); }

/* ═══════════ TẬP 9 · NHƯỢNG QUYỀN ═══════════ */
r.push('# GEN VIỆT 365 · BỘ HỒ SƠ NHƯỢNG QUYỀN', '');
r.push('**Tập 9.** Tám tập trước trả lời *hệ này là gì*. Tập này trả lời một câu khác hẳn:');
r.push('**người khác cầm hệ này đi mở ở nơi khác thì cầm cái gì, theo luật nào, và mất quyền khi nào.**', '');
r.push('> Nguyên tắc biên soạn của cả tập: **không có điều khoản nào chỉ để ràng buộc.**');
r.push('> Mỗi điều khoản bảo vệ một thứ cụ thể — đứa trẻ, chất lượng, hoặc tên gọi.');
r.push('> Điều nào không bảo vệ được gì thì đã bỏ đi trước khi tập này được viết ra.', '');
r.push('Bản trực quan: mở `genviet365/index.html`, nhóm 27 — hoặc gõ `/` để tìm.', '');

chuong('1', 'Bốn gói nhượng quyền',
  'Bốn gói **không khác nhau ở chất lượng, chỉ khác nhau ở phạm vi**. Gói nhỏ nhất cũng\nphải qua đúng năm chặng và đúng ngưỡng kiểm định như gói lớn nhất.');
G.NQ_GOI.forEach(function (x) {
  r.push('### ' + x.ma + ' · ' + x.t + '  *(' + x.nhip + ')*', '');
  r.push('**Dành cho.** ' + x.cho, '');
  r.push('**Gồm những gì**', ''); gach(x.gom);
  r.push('> **Cam kết đầu ra.** ' + x.cam, '');
  r.push('> **Không phù hợp với ai.** ' + x.khong, '');
});

chuong('2', 'Được trao gì và không được trao gì',
  'Phần lớn tranh chấp nhượng quyền trên thị trường bắt đầu ở chỗ hai bên hiểu khác nhau\nvề *cái đã được trao*. Bảng này viết ra để không còn chỗ hiểu khác.');
bang(['Hạng mục', 'Được trao', 'Không được trao', 'Vì sao'], G.NQ_TRAO);

chuong('3', 'Điều kiện tiên quyết',
  'Sáu nhóm. **Không nhóm nào bù được nhóm khác** — đủ tiền không bù được thiếu người,\nvà đủ người không bù được thiếu giấy tờ pháp lý.');
G.NQ_DIEU_KIEN.forEach(function (x) {
  r.push('### ' + x.m + ' · ' + x.t, ''); gach(x.v);
});
r.push('Nhóm cuối — **ý định** — là nhóm duy nhất không đo được bằng hồ sơ, và cũng là nhóm');
r.push('loại nhiều hồ sơ nhất.', '');

chuong('4', 'Hành trình 180 ngày mở một điểm',
  'Năm chặng, sáu tháng, **không rút gọn cho ai**. Mỗi chặng có một cổng, và cổng chỉ có\nhai trạng thái: qua hoặc chưa qua.');
G.NQ_CHANG.forEach(function (x) {
  r.push('### ' + x.ma + ' · ' + x.t + '  *(' + x.nam + ')*', '');
  r.push('*' + x.hoi + '*', '');
  r.push('**Việc lõi**', ''); gach(x.lam);
  r.push('- **Đích:** ' + x.dich.join(' · '));
  r.push('- **Cổng sang chặng sau:** ' + x.cong);
  r.push('- **Rủi ro chính:** ' + x.rui, '');
});

chuong('5', 'Đào tạo và cấp chứng nhận',
  '**Chất lượng đi theo người, không đi theo giấy phép.** Nên đây là phần dài nhất của cả\nhành trình: 96 giờ, năm học phần, có thi và có ngưỡng đạt.');
bang(['Mã', 'Học phần', 'Thời lượng', 'Nội dung', 'Đạt khi nào'], G.NQ_HOC_PHAN);
r.push('Chứng nhận có thời hạn hai năm và gắn với **người**, không gắn với cơ sở. Đây là lý do');
r.push('một điểm không thể mua chuẩn một lần rồi giữ mãi.', '');

chuong('6', 'Kiểm định · sáu phần · 100 điểm',
  'Ngưỡng đạt **85**. Phần an toàn trẻ em có một luật riêng: **bằng không thì cả kỳ không\nđạt, bất kể tổng điểm là bao nhiêu.**');
G.NQ_KIEM_DINH.forEach(function (x) {
  r.push('### ' + x.t + '  ·  ' + x.d + ' điểm', '');
  bang(['Khoảng điểm', 'Mô tả'], x.muc);
});
r.push('### Bốn mức chế tài', '');
bang(['Mức', 'Tên', 'Quyền còn lại', 'Kèm theo gì', 'Áp dụng khi nào'],
  G.NQ_CHE_TAI.map(function (x) { return [x.m, x.t, x.quyen, x.ho, x.bang]; }));

chuong('7', 'Cấu trúc phí',
  'Bảy khoản. Tập này ghi **cấu trúc và nguyên tắc, không ghi con số** — con số nằm trong\nbiểu phí có hiệu lực theo năm, ký kèm hợp đồng.');
bang(['Khoản', 'Nộp khi nào', 'Hoàn lại hay không', 'Đổi lấy gì'], G.NQ_PHI);

chuong('8', 'Lãnh thổ và độc quyền',
  '**Độc quyền là phần thưởng cho việc giữ chuẩn, không phải quyền tự nhiên có được nhờ\nđã nộp phí.**');
G.NQ_LANH_THO.forEach(function (x) {
  r.push('### ' + x.t, '', x.n, '', '> ' + x.vi, '');
});

chuong('9', 'Mười sáu điều khoản bắt buộc',
  'Cột cuối không phải chú thích — nó là **lý do tồn tại** của từng điều.');
bang(['Điều', 'Nội dung bắt buộc', 'Bảo vệ điều gì'], G.NQ_HOP_DONG);

chuong('10', 'Bộ hồ sơ bàn giao',
  'Bàn giao bằng lời rồi bổ sung giấy sau là cách nhanh nhất để về sau **không ai chứng\nminh được đã trao gì**. Ba lớp dưới đây bàn giao một lần, có biên bản, có chữ ký hai bên.');
G.NQ_BAN_GIAO.forEach(function (x) {
  r.push('### ' + x.m + ' · ' + x.t, ''); gach(x.v);
});

chuong('11', 'Mười hai luật nhượng quyền',
  'Luật là thứ **không thương lượng trong phòng họp**. Viết ra trước để không phải quyết\nđịnh lúc đang có áp lực.');
luat(G.NQ_LUAT);
r.push('### Bảy điều Học viện từ chối làm', '');
r.push('Danh sách này quan trọng ngang danh sách những điều Học viện làm được.', '');
gach(G.NQ_TU_CHOI);

chuong('12', 'Câu hỏi thường gặp',
  'Chín câu, chia theo người hỏi. Bao gồm cả những câu mà **trả lời thẳng sẽ làm mất một\nsố hồ sơ**.');
G.NQ_FAQ.forEach(function (n) {
  r.push('### ' + n.nhom, '');
  n.ds.forEach(function (x) { r.push('**' + x.h + '**', '', x.d, ''); });
});

r.push('---', '');
r.push('*Tập 9 là bản sinh ra từ `genviet365/du-lieu-nhuongquyen.js`. Sửa nội dung thì sửa kho');
r.push('rồi chạy `node genviet365/tools/sinh-nhuongquyen.cjs` — không sửa thẳng vào tệp này.*', '');

fs.writeFileSync(path.join(GOC, '..', 'docs', 'GEN_VIET_365_NHUONG_QUYEN.md'), r.join('\n'));
var d1 = r.length;

/* ═══════════ TẬP 10 · TÌM THẤY ĐƯỢC ═══════════ */
r = [];
r.push('# GEN VIỆT 365 · TÌM THẤY ĐƯỢC VÀ ĐÁNG TIN', '');
r.push('**Tập 10.** Chín tập trước dựng ra thứ đáng để người ta tìm. Tập này lo việc **người');
r.push('cần nó tìm ra được nó.**', '');
r.push('> Phải nói thẳng ngay dòng đầu: **không ai — kể cả Google — bảo đảm được vị trí số một.**');
r.push('> Thứ làm được là làm cho trang này trở thành **câu trả lời tốt nhất hiện có** cho một');
r.push('> câu hỏi cụ thể, rồi để máy tìm kiếm không còn lựa chọn nào tốt hơn. Toàn bộ tập này');
r.push('> phục vụ đúng một việc đó — và từ chối mọi cách đi tắt.', '');
r.push('Bản trực quan: mở `genviet365/index.html`, nhóm 28 — hoặc gõ `/` để tìm.', '');

chuong('1', 'Bảy nguyên tắc',
  'Bảy nguyên tắc này **không phải bảy thủ thuật**. Chúng là cùng một hệ giá trị mà tập 6\nđã dùng cho bằng chứng và tập 5 đã dùng cho cam kết dịch vụ, chỉ đem áp vào chỗ khác.');
G.SE_NGUYEN_TAC.forEach(function (x) {
  r.push('### ' + x.so + '. ' + x.t, '', x.n, '', '> ' + x.v, '');
});
r.push('### Bảy việc không làm', ''); gach(G.SE_KHONG);

chuong('2', 'Bản đồ ý định tìm kiếm',
  'Tám nhóm người gõ tám kiểu câu khác nhau về cùng một thứ. Ai gõ câu nào thì đang ở\nđâu trong quyết định của họ.');
bang(['Người tìm', 'Câu họ gõ', 'Ý định thật', 'Trang phải trả lời', 'Bằng chứng đi kèm'],
  G.SE_Y_DINH);
r.push('> Bảng này **cố ý không ghi lượng tìm kiếm.** Lượng tìm kiếm phải đo bằng số thật từ');
r.push('> báo cáo truy vấn sau khi trang đã chạy, không đoán trước bằng công cụ ước lượng.');
r.push('> Ghi một con số đoán vào đây rồi nhiều tháng sau vẫn dùng nó để quyết định là cách');
r.push('> một bản kế hoạch tự lừa mình.', '');
r.push('### Sáu cụm nội dung', '');
G.SE_CUM.forEach(function (x) { r.push('**' + x.m + ' · ' + x.t + '**', ''); gach(x.v); });

chuong('3', 'Bốn tín hiệu uy tín · E-E-A-T',
  'E-E-A-T không phải một chỉ số Google công bố. Nó là **cách người chấm chất lượng của\nGoogle đọc một trang** — và bốn thứ họ tìm thì hệ này chứng minh được bằng vật liệu đã có.');
G.SE_EEAT.forEach(function (x) {
  r.push('### ' + x.t, '', x.n, '', x.vi, '');
});
r.push('Tín hiệu thứ tư — **đáng tin** — có trọng số cao nhất, và cũng khó làm giả nhất, vì nó');
r.push('đo bằng những chỗ một trang **tự nói điều bất lợi cho mình**.', '');

chuong('4', 'Mười hai hạng mục kỹ thuật',
  'Cột cuối không ghi việc phải làm — nó ghi **chỗ việc ấy đã được làm** trong chính bản dựng này.');
bang(['Hạng mục', 'Chuẩn phải đạt', 'Làm ở đâu trong bản này'], G.SE_KY_THUAT);
r.push('### Dữ liệu có cấu trúc · mẫu khai báo', '', '```json');
G.SE_SCHEMA.split('\n').forEach(function (x) { r.push(x); });
r.push('```', '');
r.push('Khai báo thật được sinh tự động từ kho vào thẻ `script` kiểu `ld+json`, nên nó **không');
r.push('bao giờ lệch với nội dung thật** — sửa kho là khai báo đổi theo.', '');
r.push('### Một giới hạn phải nói rõ', '');
r.push('Bản đầy đủ là **một trang duy nhất**, đổi màn bằng dấu thăng. Google **không lập chỉ mục');
r.push('phần sau dấu thăng** như một địa chỉ riêng — lược đồ thu thập cũ đã bị bỏ từ 2015.');
r.push('Nghĩa là nếu chỉ có bản đầy đủ, máy tìm kiếm chỉ thấy MỘT trang, dù bên trong có hàng');
r.push('trăm màn. Nên bước dựng còn sinh mỗi màn **công khai** thành một tệp `.html` riêng trong');
r.push('`ban-phat-hanh/trang/`, có địa chỉ riêng, thẻ tiêu đề riêng và khai báo riêng, kèm');
r.push('`sitemap.xml` và `robots.txt`. Mọi màn cần đăng nhập **không** được sinh ra và **không**');
r.push('vào bản đồ trang.', '');

chuong('5', 'Hệ phản hồi năm sao',
  'Sáu bước, theo đúng thứ tự. Bước khó nhất là bước thứ tư: **gửi lời mời cho tất cả, kể\ncả những gia đình biết chắc sẽ chê.**');
G.SE_PHAN_HOI.forEach(function (x) {
  r.push('### Bước ' + x.v + ' · ' + x.t, '');
  r.push('- **Làm thế nào:** ' + x.dk);
  r.push('- **Được gì:** ' + x.duoc);
  r.push('- **Ranh giới:** ' + x.bac, '');
});
r.push('### Sáu luật phản hồi', ''); luat(G.SE_PH_LUAT);

chuong('6', 'Tám chỉ số phải đo',
  '**Đo theo cụm, không đo theo từ khoá đơn lẻ.** Vị trí của một từ khoá đơn dao động hằng\nngày và không nói lên điều gì.');
bang(['Chỉ số', 'Đo bằng gì', 'Nhịp đọc', 'Đọc ra điều gì'], G.SE_DO);

chuong('7', 'Chín mươi ngày đầu tiên',
  'Ba đợt ba mươi ngày, **đúng thứ tự** — phủ nội dung trước khi có nền kỹ thuật là viết\ncho không ai đọc.');
G.SE_90.forEach(function (x) {
  r.push('### ' + x.q + ' · ' + x.chu + '  *(' + x.tuan + ')*', '');
  bang(['Mốc', 'Việc'], x.moc.map(function (m) { return [m.t, m.v]; }));
});
r.push('Sau chín mươi ngày **không có đợt thứ tư, chỉ có vòng lặp**: đọc báo cáo truy vấn và');
r.push('chọn ba câu hỏi mới cho chu kỳ sau.', '');

r.push('---', '');
r.push('*Tập 10 là bản sinh ra từ `genviet365/du-lieu-seo.js`. Sửa nội dung thì sửa kho rồi');
r.push('chạy `node genviet365/tools/sinh-nhuongquyen.cjs` — không sửa thẳng vào tệp này.*', '');

fs.writeFileSync(path.join(GOC, '..', 'docs', 'GEN_VIET_365_TIM_THAY.md'), r.join('\n'));
console.log('Đã sinh docs/GEN_VIET_365_NHUONG_QUYEN.md · ' + d1 + ' dòng ' +
  'và docs/GEN_VIET_365_TIM_THAY.md · ' + r.length + ' dòng');
