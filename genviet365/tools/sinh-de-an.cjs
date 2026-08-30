#!/usr/bin/env node
/* Sinh tập 15 (đề án và bộ trình bày) và tập 16 (tham chiếu chi hội)
   từ ba kho rút thẳng từ tài liệu gốc.
     node genviet365/tools/sinh-de-an.cjs                            */
'use strict';
var fs = require('fs'), path = require('path'), vm = require('vm');
var GOC = path.join(__dirname, '..');
var RA = path.join(GOC, '..', 'docs');
var hop = { window: {} }; hop.window.window = hop.window; vm.createContext(hop);
['du-lieu-deana.js', 'du-lieu-slide.js', 'du-lieu-bni.js']
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
function moc(ds) { ds.forEach(function (x) { r.push('### ' + x.m + ' · ' + x.t, ''); gach(x.v); }); }
function lich(ds) { bang(['Mốc', 'Việc', 'Ai', 'Vì sao'], ds.map(function (x) { return [x.p, x.m, x.ai || '—', x.y]; })); }
function xuat(ten) { fs.writeFileSync(path.join(RA, ten), r.join('\n')); var n = r.length; r = []; return n; }
var dong = {};

/* ══════════ TẬP 15 · ĐỀ ÁN VÀ BỘ TRÌNH BÀY ══════════ */
r.push('# GEN VIỆT 365 · ĐỀ ÁN THÀNH LẬP VÀ BỘ TRÌNH BÀY', '');
r.push('**Tập 15.** Hai thứ một người đi mở câu lạc bộ cần cầm theo: bộ hồ sơ để **ký**,');
r.push('và bộ trình bày để **nói**.', '');
r.push('Bản trực quan: nhóm 34 và nhóm 35.', '');

r.push('---', '', '# PHẦN A · ĐỀ ÁN THÀNH LẬP', '');
chuong('A1', 'Tám mục của một bộ đề án',
  'Thứ tự này không đảo được. Hiệu trưởng đọc mục I và mục VIII trước; phần giữa\nđọc sau, nếu hai mục đầu thuyết phục. **Mục I phải gói trong ba dòng** — một đề án\nmở đầu bằng nửa trang lý luận là đề án bị gấp lại ở dòng thứ tư.');
moc(G.DA_CAU_TRUC);

chuong('A2', 'Căn cứ pháp lý — và chỗ hồ sơ còn yếu nhất',
  'Đây là phát hiện quan trọng nhất khi soi bộ đề án gốc, và là tin xấu cần nghe sớm.');
r.push('> Hai tài liệu đề án gốc cộng lại **chỉ nêu bốn văn bản**, và **không văn bản nào được');
r.push('> dẫn kèm điều khoản**. Nghị định 79/2017/NĐ-CP xuất hiện đúng một lần, trong một câu ở');
r.push('> mục VII, không chỉ ra điều nào cho phép lập câu lạc bộ trong trường. Hai văn bản còn');
r.push('> lại thậm chí không có số hiệu trong nguồn.', '');
bang(G.DA_CAN_CU[0], G.DA_CAN_CU.slice(1));
r.push('**Việc phải làm trước khi nộp cấp Sở hoặc cấp Bộ**', '');
gach([
  'Mỗi dòng trên bổ sung: số hiệu đầy đủ, ngày ban hành, và ĐIỀU — KHOẢN cụ thể được viện dẫn.',
  'Bản dựng này cố ý **không tự thêm** văn bản nào ngoài bốn cái nguồn nêu. Thêm một nghị định mà tài liệu gốc không có là tạo ra rủi ro pháp lý dưới danh nghĩa giúp đỡ.',
  'Bảng ánh xạ sang Chương trình giáo dục phổ thông 2018 ở tập 7 là phần bù mạnh nhất cho điểm yếu này — nó chứng minh nội dung phù hợp chuẩn quốc gia, kể cả khi phần viện dẫn văn bản còn mỏng.'
]);

chuong('A3', 'Cơ cấu tổ chức và bảng RACI',
  'Bảng RACI gốc của đề án **đạt chuẩn** — mỗi dòng đúng một chữ A. Điều này hiếm:\nphần lớn bảng RACI trong tài liệu thực tế có dòng hai chữ A, tức hai người cùng\nchịu trách nhiệm cuối, tức không ai chịu.');
bang(G.DA_TO_CHUC[0], G.DA_TO_CHUC.slice(1));
r.push('### Bảng RACI', '');
bang(G.DA_RACI[0], G.DA_RACI.slice(1));

chuong('A4', 'Chỉ tiêu hai năm và cơ sở tâm lý lứa tuổi', '');
bang(G.DA_KPI[0], G.DA_KPI.slice(1));
r.push('### Năm cơ sở tâm lý lứa tuổi 12–15', '');
r.push('Phần hội đồng thẩm định luôn hỏi mà bộ đề tài hiện có chưa giữ lại được.', '');
bang(G.DA_TAM_LY[0], G.DA_TAM_LY.slice(1));

chuong('A5', 'Kế hoạch mười hai tháng',
  'Cách viết mốc ở đây đáng học: mỗi mốc ghi **việc → kết quả đo được**, không chỉ\nghi việc. Một kế hoạch chỉ liệt kê việc thì cuối quý không ai kết luận được là\nđạt hay chưa.');
G.DA_KE_HOACH_12.forEach(function (q) {
  r.push('### ' + q.q + ' · ' + q.chu + '  *(' + q.tuan + ')*', '');
  bang(['Mốc', 'Việc và kết quả'], q.moc.map(function (m) { return [m.t, m.v]; }));
});

chuong('A6', 'Bộ mẫu biểu và thiết kế nghiên cứu', '');
bang(G.DA_BIEU_MAU[0], G.DA_BIEU_MAU.slice(1));
r.push('### Thiết kế nghiên cứu sâu', '');
r.push('> Kho gốc chỉ dựng thiết kế đầy đủ cho **GV-R1, GV-R2 và GV-R6**. Bảy đề tài còn lại mới');
r.push('> có tên, mục tiêu và sản phẩm. Đây là khoảng trống nội dung của Học viện, cần biên soạn');
r.push('> mới — không phải khoảng trống khai thác. Một đề tài không có giả thuyết thì không đăng');
r.push('> ký được cấp Sở, vì hội đồng hỏi câu đó đầu tiên.', '');
bang(G.DA_NGHIEN_CUU[0], G.DA_NGHIEN_CUU.slice(1));
r.push('### Mười sáu luật viết và bảo vệ một đề án', ''); luat(G.DA_LUAT);

r.push('---', '', '# PHẦN B · BỘ TRÌNH BÀY', '');
chuong('B1', 'Hai mươi hai slide giới thiệu',
  'Cột **thông điệp phải đọng lại** quan trọng hơn cột nội dung. Người nghe quên hết\ncác gạch đầu dòng; thứ còn lại sau buổi là một câu. Slide nào không nêu được câu\nấy thì nên bỏ.');
bang(['Slide', 'Tiêu đề', 'Nội dung chính', 'Thông điệp phải đọng lại', 'Ghi chú người trình bày'], G.SL_BO_SLIDE);
r.push('> Bản slide gốc **bỏ trống hẳn** các ô ngày thành lập, số thành viên và thành tựu. Bản');
r.push('> dựng này không điền hộ — điền số chưa có là cách nhanh nhất để mất uy tín ngay buổi');
r.push('> đầu. Thay vào đó có kịch bản KB-8 cho đúng tình huống bị hỏi con số chưa có.', '');

chuong('B2', 'Chín kịch bản nói',
  'Mỗi kịch bản có câu mở, ba câu giữa, câu kết — và quan trọng nhất là **điều không\nđược nói**. Phần lớn buổi giới thiệu hỏng không phải vì thiếu ý hay, mà vì một câu\nhứa quá tay nói ra lúc đang được cổ vũ.');
G.SL_KICH_BAN.forEach(function (x) {
  r.push('### ' + x.ma + ' · ' + x.t, '', '*' + x.khi + ' · ' + x.ai + '*', '');
  r.push('**Mở đầu.** ' + x.mo, '');
  r.push('**Ba câu giữa**', ''); gach(x.giua);
  r.push('**Kết.** ' + x.ket, '');
  r.push('> **Không được nói.** ' + x.cam, '');
});

chuong('B3', 'Mười hai thông điệp lõi',
  'Dùng lại được ở mọi kênh — trang web, thư gửi phụ huynh, bài đăng, hồ sơ đề án.\nMột thông điệp đã đứng vững trước một hội đồng nhà trường thì cũng đứng vững\ntrong một dòng kết quả tìm kiếm.');
luoi(G.SL_THONG_DIEP);
r.push('### Mười hai luật trình bày', ''); luat(G.SL_LUAT);

chuong('B4', 'Buổi họp tham khảo, và bẫy số liệu chồng lớp',
  'Bộ slide tham khảo chứa **hai lớp số liệu chồng nhau** — một trang tiếng Anh cũ và\nmột trang tiếng Việt mới hơn, với những con số khác hẳn. Người đi trình bày rất dễ\nchiếu nhầm trang cũ rồi bị hỏi lại.');
lich(G.SL_BUOI_HOP);
gach([
  'Mọi con số dẫn từ nguồn bên ngoài phải ghi kèm mốc thời gian và nơi lấy. Số không có mốc là số không dùng được sau sáu tháng.',
  'Không chiếu số liệu của tổ chức khác như thể là số liệu của Gen Việt. Đây vừa là chuyện trung thực, vừa là chuyện pháp lý.',
  'Mốc phút trong bảng trên là suy theo khung chín mươi phút — tệp gốc đánh số slide chứ không ghi giờ. Thứ tự và nội dung thì đúng gốc.'
]);
r.push('### Sáu luận điểm — mối quan hệ là tài sản', '');
r.push('Tệp nguồn nặng 49 MB và phần lớn nội dung nằm trong ảnh, nên chỉ rút được phần chữ');
r.push('đọc được. Sáu luận điểm dưới đây là đúng phần ấy, không suy đoán thêm.', '');
G.SL_QUAN_HE.forEach(function (x) { r.push('**' + x.so + '. ' + x.t + '**', '', x.n, '', '> ' + x.v, ''); });

r.push('---', '', '*Tập 15 sinh ra từ `du-lieu-deana.js` và `du-lieu-slide.js`.*', '');
dong.t15 = xuat('GEN_VIET_365_DE_AN.md');

/* ══════════ TẬP 16 · THAM CHIẾU CHI HỘI ══════════ */
r.push('# GEN VIỆT 365 · THAM CHIẾU MÔ HÌNH CHI HỘI', '');
r.push('**Tập 16.** Học viện yêu cầu ngay từ đầu rằng CLB Gen Việt phải có **tầng chiều sâu**');
r.push('như mô hình BNI. Tập này trả lời yêu cầu ấy bằng cơ chế cụ thể, không bằng cảm hứng.', '');
r.push('> **Ranh giới phải nói ngay.** Đây là tài liệu tham chiếu của **BNI Global, LLC** — không');
r.push('> phải tài sản của Học viện. Gen Việt học *cơ chế*, không dùng lại thương hiệu, không sao');
r.push('> chép văn bản, không bê nguyên lịch trình họp. Phần đối chiếu và phần bình luận trong');
r.push('> tập này là sáng tạo riêng và có tính nguyên gốc; phần mô tả mô hình gốc thì không.', '');
r.push('Bản trực quan: nhóm 36.', '');

chuong('1', 'Mười bốn cơ chế tạo chiều sâu',
  'Thứ khiến một người ở lại nhiều năm thay vì rời sau vài tháng.');
luoi(G.BN_TANG_SAU);

chuong('2', 'Hai cơ chế sắc nhất — và Gen Việt hiện chưa có',
  'Đọc hết ba tài liệu thì thấy thứ giữ chân người **không phải chỉ tiêu hay hình\nphạt**, mà là hai chi tiết rất nhỏ.');
r.push('**Một — bảng số bị kiểm chứng ngược.** Mỗi tuần, Phó Chủ tịch rút ngẫu nhiên *hai phiếu');
r.push('giới thiệu của hai tuần trước* và hỏi lại người nhận: đã liên hệ chưa, có phải cơ hội');
r.push('thật không. Nghĩa là con số không trôi dần về phía báo cáo cho đẹp. Đây là cơ chế chống');
r.push('lạm phát số liệu rẻ nhất mà một tổ chức có thể có.', '');
r.push('**Hai — đánh giá tháng thứ bảy.** Nói chuyện với người còn *năm sáu tháng nữa* mới tới');
r.push('hạn gia hạn, và do một người **có quan hệ tốt nhưng cố ý không quá thân** thực hiện. Nói');
r.push('chuyện lúc chưa có áp lực quyết định thì nghe được sự thật; nói lúc sắp hết hạn thì chỉ');
r.push('nghe được lời khách sáo.', '');
r.push('Cả hai bê sang chi hội học sinh gần như nguyên xi: cơ chế thứ nhất áp vào phiếu ghi nhận');
r.push('và bảng đầu ra tuần, cơ chế thứ hai áp vào nhịp giữa nhiệm kỳ sáu tháng ở tập 13.', '');

chuong('3', 'Sáu chặng của một hành trình thành viên',
  'Bản Accelerate Journey là một tập trình chiếu **kể chuyện** chứ không phải giáo\ntrình: nó theo một người thật đi từ chỗ mất sạch nền cũ tới chỗ dẫn được người\nkhác. Nó cho thấy điều mà bảng chỉ số không cho thấy.');
G.BN_HANH_TRINH.forEach(function (x) {
  r.push('### ' + x.ma + ' · ' + x.t + '  *(' + x.nam + ')*', '', '*' + x.hoi + '*', '');
  r.push('**Việc lõi**', ''); gach(x.lam);
  r.push('- **Đích:** ' + x.dich.join(' · '));
  r.push('- **Cổng sang chặng sau:** ' + x.cong);
  r.push('- **Rủi ro chính:** ' + x.rui, '');
});

chuong('4', 'Đối chiếu hai mươi trục',
  'Mỗi ô ở cột ba mở đầu bằng **Đã có** — kiểm chứng được trong kho hiện tại — hoặc\n**Đề xuất** — suy ra, chưa có trong hệ. Phân biệt ấy ngăn việc đọc bảng này rồi\ntưởng Gen Việt đã làm hết.');
bang(['Trục', 'Cách BNI làm', 'Gen Việt: đã có hay đề xuất', 'Điều chỉnh vì đối tượng là học sinh'], G.BN_DOI_CHIEU);

chuong('5', 'Mười hai thứ không được bê sang môi trường học đường',
  'Danh sách này quan trọng **ngang** danh sách những thứ học được. Một mô hình dành\ncho người trưởng thành tự nguyện có những cơ chế trở thành có hại khi áp lên trẻ em.');
gach(G.BN_KHONG_BE);
r.push('Bốn thứ nguy hiểm nhất: **chỉ tiêu giới thiệu bắt buộc** — buộc trẻ đi tuyển người để');
r.push('giữ chỗ của mình; **phạt tiền** khi vắng mặt; **điều tra mạng xã hội ứng viên**; và lý do');
r.push('loại mơ hồ kiểu *thái độ không phù hợp* — thứ mở đường cho loại người một cách tuỳ tiện');
r.push('mà không phải giải thích.', '');
r.push('### Mười bốn luật khi áp mô hình chi hội cho học sinh', ''); luat(G.BN_LUAT);

chuong('6', 'Ghế, chỉ số và quy trình họp',
  'Phần cơ học của mô hình. Lịch trình họp của BNI **không đổi từ năm 1985**, và cẩm\nnang gốc nói thẳng rằng vài chi hội có ý tốt muốn sửa cho hợp hoàn cảnh riêng —\nrồi hỏng. Đây là bằng chứng cho một điều Gen Việt cũng giữ.');
bang(['Ghế', 'Nhiệm vụ', 'Nhiệm kỳ', 'Chấm bằng gì'], G.BN_VAI);
r.push('### Mười ba chỉ số sức khoẻ chi hội', '');
bang(['Chỉ số', 'Đo cái gì', 'Ai đo', 'Đọc ra điều gì'], G.BN_CHI_SO);
r.push('### Hai mươi mốc của một buổi họp', '');
lich(G.BN_QUY_TRINH_HOP);
gach([
  'Bốn trang cuối của cẩm nang gốc là ảnh nên không rút được chữ. Phần Passport to Success chi tiết và phụ lục tái gia nhập vì vậy chưa có trong kho.',
  'Bản gốc có sạn: tiêu đề trang V-C-P in nhầm thành “V.C.D”, và một tiêu đề có đơn vị thời gian đọc không rõ nên không chép lại.',
  '**Không dùng lại lịch trình họp này nguyên văn** trong tài liệu mang tên Gen Việt. Tập 13 đã có quy trình riêng, dựng từ tài liệu của chính Học viện.'
]);

r.push('---', '', '*Tập 16 sinh ra từ `du-lieu-bni.js`.*', '');
dong.t16 = xuat('GEN_VIET_365_THAM_CHIEU.md');

console.log('Đã sinh 2 tập: đề án ' + dong.t15 + ' dòng · tham chiếu ' + dong.t16 + ' dòng');
