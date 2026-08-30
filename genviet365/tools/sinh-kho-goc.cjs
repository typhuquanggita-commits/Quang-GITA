#!/usr/bin/env node
/* Sinh bốn tập tài liệu từ các kho rút thẳng từ tài liệu gốc của
   Học viện: chuyên đề và giáo án · hệ mười cấp độ · vận hành chi
   tiết · sách Master, trại và học viện VIP.
   Bản markdown là bản SINH RA — sửa nội dung thì sửa kho rồi chạy:
     node genviet365/tools/sinh-kho-goc.cjs                       */
'use strict';
var fs = require('fs'), path = require('path'), vm = require('vm');
var GOC = path.join(__dirname, '..');
var RA = path.join(GOC, '..', 'docs');
var hop = { window: {} }; hop.window.window = hop.window; vm.createContext(hop);
['du-lieu-tuan52.js', 'du-lieu-capdo.js', 'du-lieu-chuyende.js', 'du-lieu-giaoan.js',
 'du-lieu-vanhanh2.js', 'du-lieu-master.js', 'du-lieu-trai-vip.js', 'du-lieu-socai.js']
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
function luoi(ds) {
  ds.forEach(function (x) { r.push('### ' + x.t, '', x.n, '', '> ' + x.vi, ''); });
}
function moc(ds) { ds.forEach(function (x) { r.push('### ' + x.m + ' · ' + x.t, ''); gach(x.v); }); }
function lich(ds) { bang(['Mốc', 'Việc', 'Ai', 'Vì sao'], ds.map(function (x) { return [x.p, x.m, x.ai || '—', x.y]; })); }
function giaoan(ds) {
  ds.forEach(function (x) {
    r.push('### ' + x.p + ' · ' + x.t + '  *(' + x.ai + ')*', '', x.n, '');
    r.push('> **Lời Coach nói.** ' + x.loi, '');
    r.push('- **Dấu hiệu buổi đang hỏng:** ' + x.hong, '');
  });
}
function xuat(ten) {
  fs.writeFileSync(path.join(RA, ten), r.join('\n'));
  var n = r.length; r = []; return n;
}
var dong = {};

/* ══════════ TẬP 11 · CHUYÊN ĐỀ VÀ GIÁO ÁN ══════════ */
r.push('# GEN VIỆT 365 · CHUYÊN ĐỀ VÀ GIÁO ÁN', '');
r.push('**Tập 11.** Đây là tập trả món nợ lớn nhất của cả bộ tài liệu.', '');
r.push('> Suốt nhiều tháng, hệ thống **nói** “600 chuyên đề mười hai khối”, “52 tuần chuyên đề”,');
r.push('> “100 chương trình huấn luyện” ở hàng chục chỗ — mà **chưa nơi nào viết ra chúng**.');
r.push('> Không ai phát hiện, vì không ai đếm. Tập này và tập 12 viết ra đủ, lấy từ chính kho');
r.push('> tài liệu gốc của Học viện, và bộ kiểm phát hành nay **đếm** ở mỗi lần dựng.', '');
r.push('Bản trực quan: mở `genviet365/index.html`, nhóm 22 và nhóm 31.', '');

chuong('1', 'Năm nhóm cố định — theo đúng tên tài liệu gốc',
  'Một phát hiện phải nói ngay: tên năm nhóm trong tài liệu gốc **khác hẳn** cách gọi\nvẫn lưu hành. Bản dựng trước ghi có “Thể chất — Sức bền” và “Tài năng — Sáng tạo”;\ntài liệu gốc không có hai nhóm ấy. Khi hai bên lệch, tài liệu của Học viện đúng.');
luoi(G.CD_NHOM);
r.push('### Khung chương trình năm khối tiểu học', '');
bang(G.CD_KHUNG[0], G.CD_KHUNG.slice(1));

chuong('2', 'Hai trăm năm mươi chuyên đề có mã',
  'Bộ **duy nhất** trong toàn kho gốc có hệ mã `GV<khối>.<nhóm>.<số>` thật.\nKhối 1 đến khối 5, mỗi khối năm mươi chuyên đề.');
bang(G.CD_DE_TAI[0], G.CD_DE_TAI.slice(1));
r.push('Hai chỗ cần biết trước khi dùng: bản gốc khối 2 **thiếu hẳn** mã GV2.1.03 — nhảy từ');
r.push('`.02` sang `.04`; và bản triển khai chi tiết của khối 4, khối 5 chưa tồn tại, mới chỉ');
r.push('có tên chuyên đề. Đây là khoảng trống thật trong kho của Học viện.', '');

chuong('3', 'Sáu trăm chuyên đề phát triển tài năng',
  'Trọn mười hai khối, lớp 1 tới lớp 12. Mỗi dòng viết theo đúng ba phần của bản gốc:\n**tên gần gũi — ý tưởng lõi — minh chứng nhỏ đo được**.');
r.push('> Con số *600 chuyên đề* mà hệ vẫn nói **không** nằm ở tài liệu Cấp 1 — tài liệu ấy chỉ');
r.push('> có 250. Đúng 600 nằm ở một tài liệu khác hẳn, và tài liệu ấy **không đánh mã nào cả**.');
r.push('> Hai trục được giữ riêng; không gán mã GV cho sáu trăm dòng này.', '');
bang(G.CD_TAI_NANG[0], G.CD_TAI_NANG.slice(1));

chuong('4', 'Khung chuyên đề đầy đủ và sáu mươi nhóm năng lực', 'Bốn mươi hai chuyên đề đã có khung chi tiết.');
bang(G.CD_KHUNG_CD[0], G.CD_KHUNG_CD.slice(1));
r.push('### Sáu mươi nhóm năng lực trên mười hai khối', '');
bang(G.CD_TRUC[0], G.CD_TRUC.slice(1));

chuong('5', 'Khung cứng một buổi và một tiết',
  'Phát hiện quan trọng nhất khi đọc kho giáo án: các chuyên đề tiểu học **không phải\ngiáo án rời**. Chúng dùng chung một khung cứng — 2 tiết × 45 phút, 5 pha mỗi tiết,\ncùng mốc 8–10–12–12–3 — và mỗi chuyên đề chỉ thay **ba thứ**: một câu chuyện, một\nkhẩu quyết ba tới năm chữ, và một bộ 20–40 thẻ tình huống.');
r.push('### Khung một buổi câu lạc bộ · chín mươi phút', ''); giaoan(G.GA_KHUNG_BUOI);
r.push('### Khung hai tiết tiểu học · mười một pha', ''); giaoan(G.GA_KHUNG_TIET);
r.push('### Giáo án hai chuyên đề mẫu, đủ hai tiết', ''); giaoan(G.CD_GIAO_AN);

chuong('6', 'Hai mươi khẩu quyết',
  'Khẩu quyết là **hạt nhân** của một chuyên đề tiểu học. Em quên hết mọi thứ khác\nvẫn còn nhớ ba tới năm chữ này.');
luoi(G.GA_KHAU_QUYET);

chuong('7', 'Bảy mươi ba buổi đã soạn và ngân hàng hoạt động', 'Cầm lên dạy được.');
bang(['Mã', 'Khối', 'Tên buổi', 'Mục tiêu', 'Hoạt động chính', 'Đầu ra'], G.GA_BUOI);
r.push('> **Sạn của nguồn, giữ nguyên thay vì âm thầm sửa:** mã `GV2.02` bị gán cho hai chuyên');
r.push('> đề khác nhau ở hai tệp, và bảy chuyên đề mang mã không khớp nhóm mô-đun của chính');
r.push('> danh mục ở đầu tệp. Học viện nên chốt lại bảng mã trước khi in.', '');
r.push('### Ngân hàng ba mươi hai hoạt động', '');
bang(['Tên hoạt động', 'Khối phù hợp', 'Thời lượng', 'Cách chơi', 'Rèn điều gì'], G.GA_HOAT_DONG);

chuong('8', 'Mười lăm tuần một học kỳ', 'Từ phiếu khảo sát xuất phát tới tuần đối chiếu lại chính phiếu ấy.');
bang(['Tuần', 'Nội dung', 'Trọng tâm', 'Sản phẩm tuần'], G.GA_HOC_KY);
r.push('### Mười bốn biểu mẫu học kỳ', '');
bang(['Mã', 'Biểu mẫu', 'Dùng ở tuần', 'Để làm gì'], G.GA_BIEU_MAU);
r.push('### Chín phần của Phần 0', ''); moc(G.GA_PHAN_0);

chuong('9', 'Luật và dấu hiệu hỏng', 'Rút từ chính cách tài liệu gốc được viết.');
r.push('### Hai mươi luật biên soạn chuyên đề', ''); luat(G.CD_LUAT);
r.push('### Mười tám luật dạy một buổi', ''); luat(G.GA_LUAT);
r.push('### Mười lăm dấu hiệu buổi đang hỏng', ''); gach(G.GA_HONG);
r.push('### Bảy tuần giá trị', '');
bang(G.CD_GIA_TRI_7_TUAN[0], G.CD_GIA_TRI_7_TUAN.slice(1));

r.push('---', '', '*Tập 11 sinh ra từ `du-lieu-chuyende.js` và `du-lieu-giaoan.js`.*', '');
dong.t11 = xuat('GEN_VIET_365_CHUYEN_DE.md');

/* ══════════ TẬP 12 · HỆ MƯỜI CẤP ĐỘ VÀ 52 TUẦN ══════════ */
r.push('# GEN VIỆT 365 · HỆ MƯỜI CẤP ĐỘ VÀ NĂM MƯƠI HAI TUẦN', '');
r.push('**Tập 12.** Hai thang vận hành của câu lạc bộ, viết ra đủ.', '');
r.push('Bản trực quan: nhóm 22 và nhóm 29.', '');

chuong('1', 'Mười cấp độ và điều kiện đạt từng cấp',
  'Bảy cột cho mỗi cấp: ai, bao lâu, đạt khi nào, rèn cái gì, trọng tâm năng lực.');
bang(G.CD10_CAP[0] && G.CD10_CAP[0].length === 7
  ? ['Cấp', 'Tên gọi', 'Đối tượng', 'Thời gian', 'Điều kiện đạt', 'Trọng tâm huấn luyện', 'Năng lực chính']
  : ['Cấp', 'Tên gọi', 'Đối tượng', 'Thời gian', 'Điều kiện đạt', 'Trọng tâm', 'Năng lực'], G.CD10_CAP);
r.push('> **Điều đáng chú ý nhất trong nguồn:** hệ này chấm đạo đức như một *tiêu chí loại*, không');
r.push('> phải điểm trừ. Tham gia bắt nạt thì không đạt Cấp 2. Làm xấu hình ảnh CLB thì không đạt');
r.push('> Cấp 5. Vi phạm ở Cấp 8 thì xét hạ cấp. Danh hiệu Cấp 10 có cơ chế thu hồi ghi thành văn.');
r.push('> Bộ lọc F3/F4 — ảnh hưởng tích cực và tư duy phục vụ — đặt ở Cấp 5, tức **nhân cách được');
r.push('> lọc trước khi trao quyền dẫn người** ở Cấp 6–7.', '');

chuong('2', 'Một trăm chương trình huấn luyện',
  'Mười cấp × mười chương trình. Cả một trăm đều **có thật** trong tài liệu gốc —\nkhông dòng nào suy ra.');
bang(['Mã', 'Cấp', 'Tên chương trình', 'Mục tiêu', 'Nội dung chính', 'Thời lượng và cách làm', 'Biểu mẫu', 'Đánh giá'], G.CD10_CT);

chuong('3', 'Nhóm năng lực, thang Pin và chuẩn đầu ra', 'Ba cách nói về cùng một tiến bộ.');
luoi(G.CD10_NANG_LUC);
r.push('### Năm mức Pin', '');
r.push('Thang Pin là cách hệ nói chuyện với học sinh nhỏ tuổi về tiến bộ mà không dùng chữ');
r.push('“cấp độ”. Cùng một sự thật, hai ngôn ngữ: người lớn đọc cấp, em đọc màu pin.', '');
luoi(G.CD10_PIN);
r.push('### Chuẩn đầu ra bốn góc nhìn', '');
r.push('Công cụ chống **lạm phát danh hiệu** mạnh nhất trong cả hệ. Một em được công nhận Cấp 6');
r.push('mà gia đình không thấy gì khác ở nhà thì hồ sơ ấy có vấn đề — dù CLB chấm đủ điểm.', '');
bang(['Cấp', 'Góc nhìn', 'Nhìn thấy gì'], G.CD10_CHUAN_RA);

chuong('4', 'Ba mươi quy trình chuẩn và bộ quy chuẩn CLB',
  'Ba mươi SOP là thứ khiến một CLB chạy được khi người sáng lập vắng mặt.');
bang(['Ban', 'Mã SOP', 'Quy trình', 'Chỉ tiêu', 'Chấm đạt khi nào'], G.CD10_SOP);
r.push('### Bộ quy chuẩn', '');
bang(['Hạng mục', 'Chi tiết', 'Chuẩn phải giữ'], G.CD10_QUY_CHUAN);
r.push('### Chuẩn giao tiếp', '');
bang(['Kênh', 'Hạng mục', 'Chuẩn', 'Không được dùng'], G.CD10_GIAO_TIEP);
r.push('### Mười hai luật của hệ cấp độ', ''); luat(G.CD10_LUAT);

chuong('5', 'Bốn chu kỳ của một năm sinh hoạt',
  'Năm mươi hai tuần không phải năm mươi hai chủ đề rời. Chúng là bốn chu kỳ nối nhau,\nvà thứ tự ấy **không đảo được**.');
luoi(G.T52_CHU_KY.map(function (c) {
  return { t: c.ma + ' · ' + c.t + '  (' + c.tuan + ')', n: c.hoi, vi: c.n };
}));
r.push('Thứ tự này do chính tài liệu gốc đặt ra ở tuần 1, và nó có lý do: **một em chưa giữ nổi');
r.push('lời hứa với chính mình thì không nên được trao một đội.** Mọi CLB rút gọn bằng cách nhảy');
r.push('thẳng vào dự án đều hỏng ở cùng một chỗ.', '');

chuong('6', 'Năm mươi hai tuần chuyên đề',
  'Đủ cả năm mươi hai tuần, lấy đúng chữ trong tài liệu gốc: chủ đề tuần,\nmục tiêu chung, và đầu ra bắt buộc.');
G.T52_CHU_KY.forEach(function (c) {
  r.push('### ' + c.ma + ' · ' + c.t + ' · ' + c.tuan, '');
  bang(['Tuần', 'Chủ đề tuần', 'Mục tiêu chung', 'Đầu ra bắt buộc'],
    G.T52_TUAN.filter(function (w) { return w.ky === c.ma; })
      .map(function (w) { return ['Tuần ' + w.s, w.t, w.m, w.r]; }));
});
r.push('Cột **đầu ra bắt buộc** là cột quan trọng nhất. Một tuần không nộp đủ đầu ra thì tuần ấy');
r.push('chưa xong, dù buổi sinh hoạt đã diễn ra đông vui. Đây cũng là cột mà kỳ kiểm định nhượng');
r.push('quyền soi đầu tiên.', '');

r.push('---', '', '*Tập 12 sinh ra từ `du-lieu-capdo.js` và `du-lieu-tuan52.js`.*', '');
dong.t12 = xuat('GEN_VIET_365_CAP_DO.md');

/* ══════════ TẬP 13 · VẬN HÀNH CHI TIẾT ══════════ */
r.push('# GEN VIỆT 365 · CẨM NANG VẬN HÀNH CHI TIẾT', '');
r.push('**Tập 13.** Chạy được một buổi, và chạy được một nhiệm kỳ.', '');
r.push('> **Một mâu thuẫn thật trong kho gốc, nói ra thay vì lặng lẽ chọn một bộ:** bốn tài liệu');
r.push('> nguồn dùng **ba bộ tên tổ chức khác nhau** cho cùng một câu lạc bộ. Bộ thứ nhất (Quy');
r.push('> trình họp, Lịch trình sinh hoạt) gọi mười hai Ban là Khơi Dậy · Trái Tim · Phẩm Chất ·');
r.push('> Phong Cách · Văn Hoá · Lan Tỏa · Trí Tuệ · Bản Lĩnh · Kết Nối · Tinh Thần · Bàn Chân ·');
r.push('> Tài Năng. Bộ thứ hai (Chương trình điều hành) là một danh sách mười hai Ban khác hẳn.');
r.push('> Bộ thứ ba (Cẩm nang vận hành) không dùng tên Ban mà dùng chức danh quản trị.');
r.push('> Tập này lấy **bộ thứ nhất** làm chuẩn, vì chỉ bộ ấy có mô tả nhiệm vụ hằng tuần chi');
r.push('> tiết. Cột cuối bảng sơ đồ nối sang hệ chức danh — phép nối ấy **là suy ra từ nhiệm vụ');
r.push('> trùng khớp**, không phải câu chữ có sẵn. Hợp nhất được, nhưng phải do Học viện quyết.', '');
r.push('Bản trực quan: nhóm 32.', '');

chuong('1', 'Sơ đồ tổ chức', 'Mười bốn vị trí, kèm phép nối sang hệ chức danh của Cẩm nang.');
bang(G.VH2_SO_DO[0], G.VH2_SO_DO.slice(1));

chuong('2', 'Trước, trong và sau một buổi sinh hoạt',
  'Năm mươi bảy mốc, từ tối Chủ nhật tuần trước tới lúc bàn giao nhiệm kỳ.');
r.push('### Trước buổi · hai mươi bảy mốc', ''); lich(G.VH2_TRUOC);
r.push('### Trong buổi · mười bốn mốc', ''); lich(G.VH2_TRONG);
r.push('### Sau buổi · mười sáu mốc', ''); lich(G.VH2_SAU);
r.push('Hai con số cứng nhất rút được từ nguồn: nhiệm kỳ ban điều hành **sáu tháng**, và lịch');
r.push('chuyển giao có kèm cặp — làm phó ban từ tháng ba, làm trưởng ban từ tháng năm, người');
r.push('tiền nhiệm rút xuống phó ban. Chính cơ chế ấy giữ cho một CLB không tan sau một nhiệm kỳ.', '');

chuong('3', 'Nhiệm vụ mười hai Ban',
  'Mỗi Ban có việc hằng tuần, việc hằng tháng, và — quan trọng nhất — danh sách\n**việc không được làm**.');
G.VH2_BAN12.forEach(function (b) {
  r.push('### ' + b.v, '');
  r.push('**Hằng tuần**', ''); gach(b.tuan);
  r.push('**Hằng tháng**', ''); gach(b.thang);
  r.push('**Không được làm**', ''); gach(b.khong);
  r.push('- **Đo bằng:** ' + b.do, '');
});
r.push('### Vòng cải tiến PDCA', ''); moc(G.VH2_PDCA);

chuong('4', 'RACI và bộ chỉ số', 'Mười lăm đầu việc có người chịu trách nhiệm cuối; mười sáu chỉ số có ngưỡng.');
bang(G.VH2_RACI[0], G.VH2_RACI.slice(1));
r.push('### Mười sáu chỉ số', '');
bang(G.VH2_KPI[0], G.VH2_KPI.slice(1));
r.push('Cột cuối làm bảng này khác một bảng KPI thông thường: mỗi chỉ số rơi ngưỡng đều có sẵn');
r.push('**việc phải làm**, nên không ai phải họp để quyết định xem nên làm gì.', '');

chuong('5', 'Mười lăm cảnh báo sớm',
  'Cờ Vàng xử trong **bảy ngày**. Cờ Đỏ xử trong **hai mươi tư giờ**.\nBốn vùng chạm vào là Đỏ ngay, không qua Vàng.');
bang(['Cảnh báo', 'Dấu hiệu quan sát được', 'Phanh'],
  G.VH2_CANH_BAO.map(function (x) { return [x.t, x.dau, x.phanh]; }));

chuong('6', 'Hai mươi biểu mẫu và ba mươi hai luật vận hành', 'BM-01 tới BM-20.');
bang(G.VH2_BIEU_MAU[0], G.VH2_BIEU_MAU.slice(1));
r.push('### Ba mươi hai luật vận hành', ''); luat(G.VH2_LUAT);

r.push('---', '', '*Tập 13 sinh ra từ `du-lieu-vanhanh2.js`.*', '');
dong.t13 = xuat('GEN_VIET_365_VAN_HANH_CHI_TIET.md');

/* ══════════ TẬP 14 · MASTER, TRẠI VÀ VIP ══════════ */
r.push('# GEN VIỆT 365 · SÁCH MASTER, TRẠI VÀ HỌC VIỆN VIP', '');
r.push('**Tập 14.** Hệ tư tưởng nền, và hai chương trình cao điểm.', '');
r.push('Bản trực quan: nhóm 30 và nhóm 33.', '');

r.push('---', '', '# PHẦN A · SÁCH MASTER GEN VIỆT', '');
chuong('A1', 'Vì sao một thế hệ cần một bản đồ', 'Tám luận điểm mở đầu, nguyên chữ tác giả.');
luoi(G.MS_LOI_MO);
r.push('> Mệnh đề trung tâm của cả cuốn sách: **bản lĩnh và giá trị không được tải xuống qua bài');
r.push('> giảng — chúng được rèn qua quyết định và nén qua trải nghiệm.** Toàn bộ kiến trúc ba lớp');
r.push('> và bốn vòng của Gen Việt dựng ra để làm đúng việc rèn ấy mà không phụ thuộc vào cảm');
r.push('> hứng của từng thầy cô.', '');

chuong('A2', 'Mười bốn luận điểm nền', 'Mỗi luận điểm là một câu hỏi sống còn.');
G.MS_LUAN_DIEM.forEach(function (x) {
  r.push('### ' + x.so + '. ' + x.t, '', x.n, '', '> ' + x.v, '');
});

chuong('A3', 'Ba chặng của ba mươi năm', 'Gieo Hạt · Rèn Lửa · Bay Cao — chia theo tuổi, không theo lớp.');
G.MS_CHANG.forEach(function (x) {
  r.push('### ' + x.ma + ' · ' + x.t + '  *(' + x.nam + ')*', '', '*' + x.hoi + '*', '');
  r.push('**Nút gia tốc**', ''); gach(x.lam);
  r.push('- **Đích:** ' + x.dich.join(' · '));
  r.push('- **Cổng sang chặng sau:** ' + x.cong);
  r.push('- **Rủi ro chính:** ' + x.rui, '');
});

chuong('A4', 'Mười tám mô thức', 'Bộ công cụ tư duy của sách, có mã tra được.');
bang(['Mã', 'Mô thức', 'Trục', 'Nội dung', 'Làm gì', 'Ai xác nhận'],
  G.MS_MO_THUC.map(function (x) { return [x.ma, x.t, x.truc, x.n, x.lam, x.xn]; }));

chuong('A5', 'Năm rủi ro chiến lược',
  'Điều hiếm gặp: **chính tác giả đặt tên cho năm cách mà mô hình của mình có thể hỏng.**\nMột mô hình tự nêu được điều đó thì đáng tin hơn một mô hình chỉ nêu ưu điểm.');
bang(['Rủi ro', 'Dấu hiệu', 'Phanh'], G.MS_RUI.map(function (x) { return [x.t, x.dau, x.phanh]; }));

chuong('A6', 'Khung sách và hai mươi sáu câu đáng trích',
  'Một điều nói rõ thay vì lấp liếm: bản *Khung sách* và ba bản thảo đã viết mô tả\n**hai cuốn sách khác nhau** — dàn ý là năm phần mười tám chương, bản đã viết là\nmười bốn chương theo ba chặng. Kho giữ cả hai và không tự hoà làm một. Bản dàn ý\ncũng khuyết tiêu đề PHẦN II; các chương 5–8 nằm ở khoảng trống ấy nên được giữ\nđúng vị trí nguồn, không đặt tên thay tác giả.');
moc(G.MS_KHUNG_SACH);
r.push('### Hai mươi sáu câu đáng trích', '');
bang(['Câu', 'Ở đâu trong sách'], G.MS_TRICH);
r.push('### Mười lăm luật rút ra', ''); luat(G.MS_LUAT);

r.push('---', '', '# PHẦN B · TRẠI LEADER BOOM', '');
chuong('B1', 'Bảy ngày trại',
  'Từ thức tỉnh bản thân tới bàn giao. Mỗi ngày có một cổng, và không ngày nào là ngày chơi.');
G.TV2_TRAI_KHUNG.forEach(function (x) {
  r.push('### ' + x.ma + ' · ' + x.t, '', '*' + x.nam + '*', '');
  r.push('**Việc lõi**', ''); gach(x.lam);
  r.push('- **Đích:** ' + x.dich.join(' · '));
  r.push('- **Cổng sang ngày sau:** ' + x.cong);
  r.push('- **Rủi ro chính:** ' + x.rui, '');
});
r.push('> Tài liệu gốc có **hai phương án bảy ngày mâu thuẫn nhau** — Ngày 2 vừa được ghi là');
r.push('> “Soi gương”, vừa được ghi là “Kỷ luật và thói quen”. Bản trên lấy phương án trong bảng');
r.push('> huấn luyện viên vì phương án ấy đủ sáu cột. Học viện nên chốt lại một bản.', '');

chuong('B2', 'Lịch ngày một và chương trình hậu trại',
  'Chỉ Ngày 1 được trích trọn vẹn vì chỉ Ngày 1 có lịch chi tiết trong nguồn.\nCột *ai phụ trách* là suy ra từ cột “gợi ý phong cách” của bản gốc.');
lich(G.TV2_TRAI_LICH);
r.push('### Sáu mốc hậu trại', ''); moc(G.TV2_TRAI_HAU);

chuong('B3', 'Mười ba điều an toàn — và chỗ tài liệu gốc còn thiếu',
  'Đây là chỗ **mỏng nhất trong toàn bộ kho**, và nói thẳng ra thì tốt hơn là lấp\nđầy bằng chữ.');
r.push('Tài liệu trại **không có chương an toàn riêng**: không quy định y tế, không sơ cứu, không');
r.push('bảo hiểm, không quy trình sự cố. Mười ba điều dưới đây gom từ “Luật chơi Leader Boom”,');
r.push('phiếu cam kết và các ô rủi ro rải rác — không bịa thêm điều nào.', '');
luat(G.TV2_TRAI_AN_TOAN);
r.push('> **Bắt buộc bổ sung trước khi tổ chức trại thật:** phương án y tế và sơ cứu tại chỗ ·');
r.push('> danh sách bệnh nền và dị ứng của từng học viên · bảo hiểm · quy trình sự cố và số điện');
r.push('> thoại khẩn cấp. Bốn thứ này là điều kiện bắt buộc theo phần bảo vệ trẻ em ở tập 6, và');
r.push('> kỳ kiểm định nhượng quyền chấm phần an toàn trẻ em **bằng không** nếu còn vi phạm.', '');

r.push('---', '', '# PHẦN C · HỌC VIỆN GEN VIỆT VIP', '');
chuong('C1', 'Chương trình điều hành mười bước', '');
bang(G.TV2_VIP_CHUONG_TRINH[0], G.TV2_VIP_CHUONG_TRINH.slice(1));
r.push('### Chuẩn đầu vào và đầu ra', ''); luoi(G.TV2_VIP_CHUAN);
r.push('### Quyền và nghĩa vụ đi kèm', '');
bang(G.TV2_VIP_QUYEN_LOI[0], G.TV2_VIP_QUYEN_LOI.slice(1));
r.push('Mỗi quyền đều có nghĩa vụ nằm ngay cạnh. Đó là cách duy nhất để một chương trình gọi là');
r.push('VIP không biến thành một chương trình bán chỗ ngồi.', '');

r.push('---', '', '# PHẦN D · THAM CHIẾU MÔ HÌNH NHẬT BẢN', '');
r.push('> **Cảnh báo về chính tài liệu nguồn, quan trọng hơn nội dung.** Tệp *Mô hình Bukatsu*');
r.push('> trong kho đã bị **tìm và thay thế toàn văn**: chữ “Bukatsu” bị đổi thành “Gen Việt”,');
r.push('> cặp “senpai — kōhai” bị đổi thành “Gen A — Gen V”. Dấu vết còn nguyên: tiêu đề đọc thành');
r.push('> “Mô hình Gen Việt–Gen Việt”, và nhiều câu hụt chữ như *“Chuẩn thành viên và kỷ luật');
r.push('> (kiểu … nhưng nhân văn)”*. Tài liệu tham chiếu ấy hiện **không còn từ khoá nào để tra');
r.push('> cứu ngược** — chữ “Bukatsu” chỉ còn sót ở tên tệp. Phần dưới chỉ khẳng định đúng những');
r.push('> gì tài liệu *thật sự viết*; việc gọi tên mô hình Nhật Bản là khôi phục từ tên tệp.');
r.push('> **Học viện nên tìm lại bản gốc chưa bị thay chữ trước khi dùng phần này trong hồ sơ');
r.push('> chính thức.**', '');
bang(['Bài học', 'Điều tài liệu lấy', 'Vì sao lấy được', 'Gen Việt làm gì', 'Chỗ không bê nguyên'],
  G.TV2_BUKATSU.map(function (x) { return [x.t, x.dh, x.can, x.lam, x.bay]; }));
r.push('### Đối chiếu chín trục', '');
bang(G.TV2_BUKATSU_DOI_CHIEU[0], G.TV2_BUKATSU_DOI_CHIEU.slice(1));

r.push('---', '', '*Tập 14 sinh ra từ `du-lieu-master.js` và `du-lieu-trai-vip.js`.*', '');
dong.t14 = xuat('GEN_VIET_365_MASTER_TRAI.md');

console.log('Đã sinh 4 tập: chuyên đề ' + dong.t11 + ' dòng · cấp độ ' + dong.t12 +
  ' dòng · vận hành ' + dong.t13 + ' dòng · master ' + dong.t14 + ' dòng');
