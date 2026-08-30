#!/usr/bin/env node
/* Sinh tập 17 (an toàn trại · thiết kế nghiên cứu) và tập 18 (Mật Mã
   Gen Việt · điều hành hệ thống).
     node genviet365/tools/sinh-bo-sung.cjs                        */
'use strict';
var fs = require('fs'), path = require('path'), vm = require('vm');
var GOC = path.join(__dirname, '..');
var RA = path.join(GOC, '..', 'docs');
var hop = { window: {} }; hop.window.window = hop.window; vm.createContext(hop);
['du-lieu-antoan.js', 'du-lieu-nghiencuu.js', 'du-lieu-matma.js',
 'du-lieu-dangnhap.js', 'du-lieu-socai.js', 'du-lieu-songuon.js']
  .forEach(function (t) { vm.runInContext(fs.readFileSync(path.join(GOC, t), 'utf8'), hop); });
var G = hop.window.GV;

var r = [];
function d(s) { return String(s).replace(/\|/g, '\\|').replace(/\n/g, '<br>'); }
function bang(cot, hang) {
  r.push('| ' + cot.join(' | ') + ' |', '|' + cot.map(function () { return '---'; }).join('|') + '|');
  hang.forEach(function (h) { r.push('| ' + h.map(d).join(' | ') + ' |'); });
  r.push('');
}
function luat(ds) { ds.forEach(function (x, i) { r.push((i + 1) + '. ' + x); }); r.push(''); }
function gach(ds) { ds.forEach(function (x) { r.push('- ' + x); }); r.push(''); }
function chuong(n, t, dan) { r.push('---', '', '## ' + n + '. ' + t, '', dan, ''); }
function luoi(ds) { ds.forEach(function (x) { r.push('### ' + x.t, '', x.n, '', '> ' + x.vi, ''); }); }
function lich(ds) { bang(['Mốc', 'Việc', 'Ai', 'Vì sao'], ds.map(function (x) { return [x.p, x.m, x.ai || '—', x.y]; })); }
function giaoan(ds) {
  ds.forEach(function (x) {
    r.push('### ' + x.p + ' · ' + x.t + '  *(' + x.ai + ')*', '', x.n, '');
    r.push('> **Lời người dẫn.** ' + x.loi, '');
    r.push('- **Dấu hiệu đang hỏng:** ' + x.hong, '');
  });
}
function cd4(ds, nhan) {
  bang(['Mục', nhan[0], nhan[1], nhan[2], nhan[3]],
    ds.map(function (x) { return [x.t, x.dh, x.can, x.lam, x.bay]; }));
}
function xuat(ten) { fs.writeFileSync(path.join(RA, ten), r.join('\n')); var n = r.length; r = []; return n; }
var dong = {};

/* ══════════ TẬP 17 ══════════ */
r.push('# GEN VIỆT 365 · AN TOÀN TRẠI VÀ THIẾT KẾ NGHIÊN CỨU', '');
r.push('**Tập 17.** Hai phần **biên soạn mới** để lấp hai khoảng trống mà chính chuẩn của hệ');
r.push('đang đòi — chứ không phải hai phần rút từ kho tài liệu gốc.', '');
r.push('> **Trạng thái: chờ Hội đồng Chuyên môn duyệt.** Bộ kiểm chặn việc tự chuyển sang *đã');
r.push('> chốt*. Riêng phần an toàn còn cần **một cán bộ y tế có chứng chỉ và một luật sư rà');
r.push('> lại** trước khi tổ chức trại thật. Đây là khung theo thông lệ tốt, **không thay thế**');
r.push('> tư vấn chuyên môn.', '');
r.push('Bản trực quan: nhóm 37 và nhóm 38.', '');

r.push('---', '', '# PHẦN A · AN TOÀN TRẠI', '');
r.push('**Vì sao phần này tồn tại.** Soi kho thì thấy khoảng trống không chỉ là *thiếu chương');
r.push('an toàn*. Chính phần pháp lý của hệ đã tự quy định sẵn hai hạng mục — **bảo hiểm tai');
r.push('nạn bắt buộc với mọi hoạt động ngoài cơ sở**, và **hồ sơ an toàn từng hoạt động gồm');
r.push('danh mục kiểm, người trực từng ca, số khẩn cấp, phương án y tế**. Nghĩa là trại Leader');
r.push('Boom không vi phạm một chuẩn ở đâu xa: nó vi phạm chuẩn của chính hệ. Và kỳ kiểm định');
r.push('nhượng quyền biến việc ấy thành hậu quả cụ thể — phần an toàn trẻ em **bằng không thì');
r.push('cả kỳ không đạt, bất kể tổng điểm**.', '');

chuong('A1', 'Mười bốn điều kiện mở trại',
  'Thiếu một điều thôi là không được mở. Đây không phải danh sách mong muốn — đây là ngưỡng.');
gach(G.AT_KHONG_CHAY);

chuong('A2', 'Chuẩn bị từ D-30 tới D-1',
  'Phần lớn việc an toàn phải xong **trước khi xe lăn bánh**. Làm tại chỗ thì đã muộn.');
lich(G.AT_TRUOC_TRAI);
r.push('### Ba mức báo động', '');
bang(['Mức', 'Nghĩa', 'Ai quyết', 'Kèm theo gì', 'Áp dụng khi nào'],
  G.AT_MUC_BAO_DONG.map(function (x) { return [x.m, x.t, x.quyen, x.ho, x.bang]; }));

chuong('A3', 'Mười hai loại sự cố',
  'Mỗi loại có dấu hiệu nhận ra, việc phải làm, và cái bẫy mà người chưa quen hay mắc.');
cd4(G.AT_SU_CO, ['Dấu hiệu nhận ra', 'Việc đầu tiên', 'Rồi làm gì', 'Bẫy thường mắc']);
r.push('> Mọi thẻ sự cố nghiêm trọng đều kết bằng cùng một chuỗi: **gọi cấp cứu → đưa tới cơ sở');
r.push('> y tế → báo gia đình**. Không thẻ nào để người phụ trách trại tự xử. Kho này cố ý');
r.push('> **không** ghi tên thuốc kèm liều lượng và **không** hướng dẫn thủ thuật vượt quá sơ');
r.push('> cứu cơ bản. Chỉ bốn đầu số công cộng toàn quốc được ghi sẵn: 115 · 114 · 113 · 111.', '');

chuong('A4', 'Ranh giới người lớn, hoạt động dưới nước và giờ đêm',
  'Ba vùng rủi ro cao nhất của mọi trại thiếu niên. Hai vùng đầu gây thương tích;\nvùng thứ ba gây thứ không chữa được.');
r.push('Phần này **cố ý không chép lại** mười điều bảo vệ trẻ em ở tập 6 — nó chỉ thêm phần');
r.push('riêng của môi trường **ở lại qua đêm**, và một điều dễ bỏ qua: *hỗ trợ viên là cựu học');
r.push('viên không được tính là người lớn trực*.', '');
r.push('### Ranh giới người lớn với trẻ', ''); luat(G.AT_RANH_GIOI);
r.push('### Hoạt động dưới nước và giờ đêm', ''); luat(G.AT_NUOC_VA_DEM);

chuong('A5', 'Nhận và xử lý tố giác trong thời gian trại',
  'Bước thứ nhất là bước quyết định: phải có người nhận tố giác **công khai ngay từ\nngày đầu**, chứ không phải khi đã có chuyện.');
bang(['Bước', 'Việc', 'Điều kiện', 'Được gì', 'Ranh giới'],
  G.AT_TO_GIAC.map(function (x) { return [x.v, x.t, x.dk, x.duoc, x.bac]; }));
r.push('Hai người được chỉ định, **một nam một nữ**, ảnh và tên dán ở nơi mọi em nhìn thấy.');
r.push('Một quy trình tố giác mà trẻ không biết hỏi ai thì không tồn tại, dù đã viết ra giấy.', '');

chuong('A6', 'Túi y tế, bộ hồ sơ và mười tám luật an toàn', '');
bang(['Nhóm', 'Hạng mục', 'Số lượng tối thiểu', 'Dùng khi nào'], G.AT_TUI_Y_TE);
r.push('### Bộ hồ sơ AT-01 → AT-19', '');
bang(['Mã', 'Hồ sơ', 'Ai ký', 'Ai giữ', 'Lưu bao lâu'], G.AT_HO_SO);
r.push('> Mọi định mức trong hai bảng trên là mức kho này **đặt theo thông lệ**, không trích từ');
r.push('> văn bản pháp luật nào. Kho cố ý không dẫn số hiệu văn bản mà mình không kiểm chứng');
r.push('> được. Học viện cần đối chiếu với quy định hiện hành của địa phương trước khi ban hành.', '');
r.push('### Mười tám luật an toàn', ''); luat(G.AT_LUAT_TRAI);

r.push('---', '', '# PHẦN B · THIẾT KẾ NGHIÊN CỨU', '');
r.push('Kho gốc chỉ dựng thiết kế đầy đủ cho **GV-R1, GV-R2 và GV-R6**. Bảy đề tài còn lại chỉ');
r.push('có tên, mục tiêu và sản phẩm — **không có giả thuyết**. Một đề tài không có giả thuyết');
r.push('thì không đăng ký được cấp Sở, vì hội đồng hỏi câu đó đầu tiên.', '');

chuong('B1', 'Bảy thiết kế nghiên cứu', '');
bang(G.NC_THIET_KE[0], G.NC_THIET_KE.slice(1));

chuong('B2', 'Rủi ro thiết kế của từng đề tài',
  'Mỗi thẻ nói bối cảnh, các bước triển khai, ai xác nhận — và quan trọng nhất là\n**chỗ yếu nhất của chính thiết kế ấy**.');
bang(['Mã', 'Đề tài', 'Trục', 'Bối cảnh và khoảng trống', 'Các bước triển khai', 'Ai xác nhận', 'Rủi ro thiết kế lớn nhất'],
  G.NC_CHI_TIET.map(function (x) { return [x.ma, x.t, x.truc, x.n, x.lam, x.xn, x.vi]; }));
gach([
  '**GV-R5 buộc phải chia hai pha** vì bộ test Mật mã Gen Tài Năng chưa từng được kiểm định — pha A xây và thử công cụ, pha A không đạt thì dừng. Rủi ro lớn nhất là hiệu ứng dán nhãn lên chính đứa trẻ.',
  '**GV-R4 cần ba nhánh chứ không phải hai**, vì bảy bước luôn đi kèm mentor. Chỉ có can thiệp và không can thiệp thì không tách được tác dụng của quy trình khỏi tác dụng của việc có người lớn quan tâm đều đặn.',
  '**GV-R8 không có giả thuyết nhân quả**, và kho nói thẳng như vậy. Luật riêng của nó: viết cột *chưa đáp ứng* trước cột *đã đáp ứng*, nếu không báo cáo sẽ trượt thành một bài ca ngợi.'
]);

chuong('B3', 'Mười sai lầm thiết kế hay mắc',
  'Đề tài học sinh hỏng ở mười chỗ này nhiều hơn tất cả chỗ khác cộng lại.');
bang(['Sai lầm', 'Dấu hiệu', 'Phanh'], G.NC_SAI_LAM.map(function (x) { return [x.t, x.dau, x.phanh]; }));
r.push('Sai lầm nặng nhất không phải cỡ mẫu nhỏ — đó là **người dạy đồng thời là người chấm**.');
r.push('Nó làm hỏng mọi con số về sau, và không sửa được bằng cách tăng cỡ mẫu.', '');

chuong('B4', 'Đạo đức nghiên cứu khi đối tượng là trẻ',
  'Mười ba điều không thương lượng. Một đề tài vi phạm bất kỳ điều nào thì kết quả có\nđẹp đến mấy cũng không dùng được.');
luat(G.NC_DAO_DUC);
r.push('Hai điều dễ bị bỏ qua nhất: **quyền rút khỏi nghiên cứu bất cứ lúc nào mà không bị');
r.push('thiệt**, và **không để nhóm đối chứng bị thiệt về giáo dục** — nhóm đối chứng phải được');
r.push('nhận chương trình sau khi nghiên cứu kết thúc, chứ không phải bị bỏ lại làm nền so sánh.', '');

chuong('B5', 'Bộ hồ sơ nộp cấp Sở và mười sáu luật',
  'Cột cuối biến một danh mục giấy tờ thành một buổi tập bảo vệ.');
bang(G.NC_HO_SO_SO[0], G.NC_HO_SO_SO.slice(1));
r.push('### Mười sáu luật làm nghiên cứu ứng dụng trong trường', ''); luat(G.NC_LUAT);

r.push('---', '', '*Tập 17 sinh ra từ `du-lieu-antoan.js` và `du-lieu-nghiencuu.js`.*', '');
dong.t17 = xuat('GEN_VIET_365_AN_TOAN_NGHIEN_CUU.md');

/* ══════════ TẬP 18 ══════════ */
r.push('# GEN VIỆT 365 · MẬT MÃ GEN VIỆT VÀ ĐIỀU HÀNH HỆ THỐNG', '');
r.push('**Tập 18.** Một phần về **người**, một phần về **máy** — và cả hai nói về cùng một thứ:');
r.push('làm sao để cái tốt còn lại sau khi người dựng nó đi khỏi.', '');
r.push('Bản trực quan: nhóm 39 và nhóm 40.', '');

r.push('---', '', '# PHẦN A · MẬT MÃ GEN VIỆT', '');
r.push('Thư viện đã có **chiến tích** và **tư duy để đời** của bốn mươi lăm chân dung. Cột còn');
r.push('thiếu là cột thứ ba: **sản phẩm để đời**.', '');
r.push('> **Biên soạn mới.** Tên nhân vật, chiến tích và mô thức giữ nguyên theo Thư viện; lớp');
r.push('> sản phẩm và hệ mật mã là mới. **Cần một người có chuyên môn sử học rà lại niên đại và');
r.push('> sử liệu trước khi đưa vào dạy.** Mười ba trên bốn mươi lăm dòng ghi thẳng "Lưu ý" ngay');
r.push('> trong ô để phân biệt truyền thuyết với sử liệu.', '');

chuong('A1', 'Bốn mươi lăm sản phẩm để đời',
  'Cột *sản phẩm* cố ý không nhận những câu như “tinh thần yêu nước”. Nó phải chỉ ra\nđược: một cuốn sách, một bộ luật, một công trình, một trường phái, một định chế,\nmột phương pháp. Thứ chỉ ra được thì học sinh mới đi xem được.');
bang(['Nhân vật', 'Quyển', 'Sản phẩm hoặc di sản để đời', 'Hôm nay còn thấy ở đâu', 'Em dùng lại được gì ngay tuần này'],
  G.MM_SAN_PHAM);

chuong('A2', 'Mười hai mật mã lặp lại',
  'Đọc bốn mươi lăm đời người rồi hỏi: điều gì lặp lại? Những điều lặp lại ấy là mật\nmã — và mật mã thì **dùng lại được**.');
G.MM_MA.forEach(function (x) { r.push('### ' + x.so + '. ' + x.t, '', x.n, '', '> ' + x.v, ''); });
r.push('Đây là chỗ Thư viện thôi là một bộ sưu tập và bắt đầu là một **bộ công cụ**. Một câu');
r.push('chuyện hay thì nghe xong thấy xúc động; một mật mã thì tuần sau dùng được.', '');
r.push('> **Một điều đáng chú ý khi đối chiếu.** Mã dày nhất trong bốn mươi lăm người là *làm');
r.push('> cái mình không hưởng* — bảy nhân vật mang nó làm mã chính, nhiều hơn mọi mã về chiến');
r.push('> thắng. Còn *thắng rồi vẫn giữ lễ*, mã nổi tiếng nhất của bộ sách, chỉ có một người.', '');

chuong('A3', 'Ai mang mật mã nào',
  'Bảng này dùng để **chọn nhân vật cho một buổi**, không phải để xếp hạng ai hơn ai.');
bang(['Nhân vật', 'Mật mã chính', 'Mật mã phụ', 'Vì sao xếp vậy'], G.MM_DOI_CHIEU);

chuong('A4', 'Kể một câu chuyện trong bảy phút', 'Khớp với hạt giống tri thức bảy phút mà hệ đã có.');
giaoan(G.MM_KE_CHUYEN);
r.push('### Bảy câu hỏi mở sau mỗi câu chuyện', ''); luoi(G.MM_KHOI_BAY);
r.push('### Mười lăm luật dùng nhân vật lịch sử trong dạy trẻ', ''); luat(G.MM_LUAT);

r.push('---', '', '# PHẦN B · ĐIỀU HÀNH HỆ THỐNG', '');
r.push('> **Một điều phải nói ngay dòng đầu, vì nói muộn thì thành lừa dối:** cổng đăng nhập');
r.push('> trong một trang tĩnh **không phải một hàng rào an ninh**. Mã chạy trên máy người dùng;');
r.push('> ai mở công cụ phát triển của trình duyệt cũng đổi được vai của mình.', '');

chuong('B1', 'Bốn lớp kiểm soát, và lớp nào cưỡng chế được', '');
luoi(G.DN_BA_LOP);
r.push('**Hàng rào thật là bản cắt.** Mỗi vai nhận một tệp riêng, và nội dung ngoài quyền');
r.push('*không có trong tệp* — không phải bị ẩn, mà là không tồn tại. Kiểm chứng thật với bản');
r.push('cắt cho học viên R16: các chuỗi đặc trưng của bảng điều khiển đều **không xuất hiện lần');
r.push('nào**.', '');
r.push('### Vậy cổng này để làm gì', '');
gach([
  '**Nhận diện** — biết ai đang đọc, để màn hình nói đúng ngôn ngữ của vai ấy.',
  '**Đặt mặc định đúng** — mở ra là thấy phần của mình, không lạc giữa hơn hai trăm màn.',
  '**Nhắc trách nhiệm** — người bấm “tôi là Coach” đã tự nhận một ràng buộc, và điều đó có giá trị dù không cưỡng chế được.'
]);
r.push('### Vai để chọn ở cổng', '');
bang(['Mã', 'Vai', 'Mở tới đâu', 'Ai là người này'], G.DN_TAI_KHOAN);
r.push('### Sáu luật cổng', ''); luat(G.DN_LUAT);

chuong('B2', 'Hợp đồng máy chủ tối thiểu',
  'Khi Học viện dựng bản có máy chủ thật, đây là mức thấp nhất chấp nhận được.');
bang(['Hạng mục', 'Mức tối thiểu', 'Ghi chú'], G.DN_MAY_CHU);
r.push('Hạng mục quan trọng nhất là hạng mục thứ hai: **máy chủ quyết định trả về gì, không tin');
r.push('bất cứ giá trị nào do trình duyệt gửi lên**. Bảng phân quyền hiện có dùng lại nguyên vẹn.', '');
r.push('> Khi lên máy chủ thật, cổng đăng nhập tĩnh phải bị **thay hẳn** chứ không phải bọc thêm.', '');

chuong('B3', 'Kho tổng tra soát',
  'Bốn cuốn sổ của hệ, gom về một chỗ. Chỉ Super Admin và Admin hệ thống mở được —\n**không vì nội dung nhạy cảm**, mà vì người khác đọc dễ hiểu nhầm: một món nợ *đã\nghi công khai* trông giống một lỗi *bị giấu*.');
luoi(G.TS_MUC);
r.push('### Sáu luật giữ kho tra soát', ''); luat(G.TS_LUAT);

chuong('B4', 'Bốn cuốn sổ — con số tại thời điểm sinh tập này',
  'Mọi con số dưới đây do **máy đếm**, không do người điền.');
var treo = (G.SC_XUAT_XU || []).filter(function (x) { return x[1] === 'BIÊN SOẠN'; });
var rut = (G.SN_TEP || []).filter(function (x) { return x[2] === 'ĐÃ RÚT'; }).length;
bang(['Sổ', 'Đếm được', 'Bộ kiểm soi gì'], [
  ['Sổ cái yêu cầu', G.SC_YEU_CAU.length + ' dòng yêu cầu', 'Từng viện dẫn màn và kho có thật không'],
  ['Món nợ số', G.SC_MON_NO.length + ' con số đã hứa', 'Con số hứa có khớp số phần tử thật không'],
  ['Sổ nguồn', G.SN_TEP.length + ' dòng tệp · ' + rut + ' đã rút · ' + G.SN_NO.length + ' món nợ',
   'Tệp đã rút có nêu được kho chứa không; món nợ có nêu cách gỡ không'],
  ['Sổ xuất xứ', G.SC_XUAT_XU.length + ' tệp kho · ' + treo.length + ' chờ duyệt',
   'Sổ có khớp danh sách tệp thật trên đĩa không, cả hai chiều']
]);
r.push('### Đang chờ Hội đồng Chuyên môn duyệt', '');
bang(['Tệp kho', 'Chứa gì', 'Trạng thái'], treo.map(function (x) { return [x[0], x[2], x[3]]; }));
r.push('Không kho nào trong bảng trên được đưa vào dạy hay nộp hồ sơ khi còn ở trạng thái này.', '');

r.push('---', '', '*Tập 18 sinh ra từ `du-lieu-matma.js` và `du-lieu-dangnhap.js`.*', '');
dong.t18 = xuat('GEN_VIET_365_MAT_MA_DIEU_HANH.md');

console.log('Đã sinh 2 tập: an toàn và nghiên cứu ' + dong.t17 +
  ' dòng · mật mã và điều hành ' + dong.t18 + ' dòng');
