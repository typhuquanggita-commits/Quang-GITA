#!/usr/bin/env node
/* Sinh docs/GEN_VIET_365_THUONG_HIEU.md từ hai kho: thương hiệu và bản
   quyền. Bản markdown là bản SINH RA — sửa nội dung thì sửa kho rồi
   chạy lại:  node genviet365/tools/sinh-thuonghieu.cjs               */
'use strict';
var fs = require('fs'), path = require('path'), vm = require('vm');
var GOC = path.join(__dirname, '..');
var hop = { window: {} }; hop.window.window = hop.window; vm.createContext(hop);
['du-lieu-thuonghieu.js', 'du-lieu-banquyen.js'].forEach(function (t) {
  vm.runInContext(fs.readFileSync(path.join(GOC, t), 'utf8'), hop);
});
var G = hop.window.GV, r = [];
function d(s) { return String(s).replace(/\|/g, '\\|').replace(/\n/g, ' '); }
function bang(cot, hang) {
  r.push('| ' + cot.join(' | ') + ' |', '|' + cot.map(function () { return '---'; }).join('|') + '|');
  hang.forEach(function (h) { r.push('| ' + h.map(d).join(' | ') + ' |'); });
  r.push('');
}
function luat(ds) { ds.forEach(function (x, i) { r.push((i + 1) + '. ' + x); }); r.push(''); }
function chuong(n, t, dan) { r.push('---', '', '## ' + n + '. ' + t, '', dan, ''); }

r.push('# GEN VIỆT 365 · NHẬN DIỆN THƯƠNG HIỆU, BẢN QUYỀN VÀ TOÀN CẦU', '');
r.push('**Tập 7.** Sáu tập trước dựng nên hệ. Tập này làm ba việc còn lại: **đặt cho hệ một');
r.push('bộ mặt** nhận ra được, **xác lập quyền** đối với những gì đã tạo ra, và **vạch đường**');
r.push('đưa nó ra ngoài biên giới mà không loãng chất.', '');
r.push('> Nhận diện không phải cái logo. Nhận diện là thứ khiến người ta nhận ra mình khi chưa');
r.push('> nhìn thấy tên — trong một câu nói, một cách trao huy hiệu, một khoảng trắng trên trang giấy.', '');
r.push('**Phần B và C của tập này chạm tới pháp luật.** Đọc mục 0 trước khi đọc tiếp.', '');
r.push('Bản trực quan có hình vẽ dấu hiệu: mở `genviet365/index.html`, nhóm 17 · 18.', '');

/* ── A ── */
r.push('---', '', '# PHẦN A · BỘ NHẬN DIỆN THƯƠNG HIỆU', '');

chuong('A1', 'Nền tảng thương hiệu',
  'Sáu điều dưới đây là phần **không được đổi khi thấy chán**. Chúng chỉ đổi khi có bằng chứng\nrằng chúng sai — và bằng chứng ấy phải mạnh hơn cảm giác của bất kỳ ai.');
G.TH_NEN.forEach(function (x) { r.push('**' + x.t + '.** ' + x.n, '', '> ' + x.vi, ''); });
r.push('### Bốn khác biệt không sao chép được', '');
bang(['Khác biệt', 'Là gì', 'Vì sao khó chép'], G.TH_KHAC_BIET.map(function (x) { return [x.t, x.n, x.vi]; }));

chuong('A2', 'Kiến trúc thương hiệu',
  'Mô hình thương hiệu mẹ bảo chứng: GITA đứng sau, Gen Việt 365 đứng trước, sản phẩm mang tên riêng.');
bang(['Tầng', 'Tên', 'Vai trò', 'Là gì', 'Xuất hiện ở đâu'],
  G.TH_KIEN_TRUC.map(function (x) { return [x.ma, x.t, x.tang, x.n, x.vd]; }));
r.push('### Bảy luật đặt tên', '');
luat(G.TH_LUAT_TEN);

chuong('A3', 'Ấn Gen Việt — dấu hiệu',
  'Ấn triện là vật chứng nhận của người Việt suốt nghìn năm: đóng dấu nghĩa là *tôi chịu trách\nnhiệm về điều này*. Hệ này sống bằng bằng chứng có người xác nhận — nên dấu hiệu của nó\nphải là một con dấu.');
r.push('**Dựng hình.** Lưới 120 × 120 đơn vị:', '');
r.push('```');
r.push('khung     ô vuông bo góc  x=10 y=10 w=100 h=100 rx=16  nét 7');
r.push('nét trái  (38,40) → (60,84)                            nét 8, đầu tròn  — LUÔN LIỀN');
r.push('sáu chấm  trên đoạn (60,84) → (82,40), bán kính 3.4              — LUÔN CÓ QUÃNG');
r.push('vùng an toàn  25 đơn vị mỗi phía = một phần tư cạnh khung');
r.push('cỡ nhỏ nhất   16 px trên màn hình · 6 mm khi in');
r.push('```', '');
G.TH_AN_Y_NIEM.forEach(function (x) { r.push('**' + x.t + '.** ' + x.n, '', '> ' + x.vi, ''); });
r.push('### Năm biến thể', '');
bang(['Mã', 'Biến thể', 'Là gì', 'Dùng ở đâu', 'Cỡ nhỏ nhất'],
  G.TH_AN_BIEN_THE.map(function (x) { return [x.ma, x.t, x.n, x.dung, x.toi]; }));
r.push('### Mười luật dùng ấn', '');
luat(G.TH_AN_LUAT);
r.push('### Tám cách dùng sai', '');
bang(['Cách sai', 'Vì sao sai'], G.TH_AN_SAI);

chuong('A4', 'Bảng màu',
  'Kế thừa nguyên vẹn nhận diện Học viện GITA. **Mọi mã màu chữ đã qua bộ kiểm tương phản\nWCAG AA ở cả hai chế độ sáng và tối** — bộ kiểm phát hành chặn nếu một mã tụt dưới 4.5 : 1.');
bang(['Màu', 'HEX', 'RGB', 'CMYK', 'Pantone (gần đúng)', 'Vai trò', 'Tương phản nền sáng'],
  G.TH_MAU.map(function (x) { return [x.t, x.hex, x.rgb, x.cmyk, x.pantone, x.vai, x.tp]; }));
r.push('### Sáu luật dùng màu', '');
luat(G.TH_MAU_LUAT);

chuong('A5', 'Bộ chữ',
  'Ba phông, mỗi phông một việc. Và một bộ thay thế **bắt buộc phải chạy được** khi phông\nngoài bị chặn — điều xảy ra thật ở Trung Quốc và trong nhiều mạng nội bộ.');
G.TH_CHU.forEach(function (x) {
  r.push('**' + x.t + '** · *' + x.vai + '* · ' + x.can, '', x.n, '', '> ' + x.vi, '');
});
r.push('### Thang chữ', '');
bang(['Dùng ở đâu', 'Phông và độ đậm', 'Cỡ', 'Ghi chú'], G.TH_THANG_CHU);

chuong('A6', 'Hình ảnh và hoạ tiết',
  'Luật đạo đức đứng trước luật thẩm mỹ. Một tấm ảnh đẹp mà vi phạm luật đầu thì không dùng.');
r.push('### Sáu luật đạo đức khi chụp trẻ', '');
luat(G.TH_HINH_DAO_DUC);
r.push('### Bốn nguyên tắc thẩm mỹ', '');
bang(['Nguyên tắc', 'Là gì', 'Vì sao'], G.TH_HINH_THAM_MY.map(function (x) { return [x.t, x.n, x.vi]; }));
r.push('### Ba hoạ tiết', '');
bang(['Hoạ tiết', 'Là gì', 'Dùng ở đâu'], G.TH_HOA_TIET.map(function (x) { return [x.t, x.n, x.vi]; }));

chuong('A7', 'Giọng thương hiệu',
  'Năm nguyên tắc, và một bảng đối chiếu để ai cũng nói giống nhau — khác ở giọng, không\nkhác ở nội dung.');
G.TH_GIONG.forEach(function (x) { r.push(x.so + '. **' + x.t + '** — ' + x.n, '   > ' + x.v); });
r.push('');
r.push('### Bảng nói và không nói', '');
bang(['Không nói thế này', 'Nói thế này'], G.TH_GIONG_BANG);

chuong('A8', 'Ứng dụng và bộ tệp bàn giao',
  'Mười sáu hạng mục, mỗi hạng mục ghi rõ dùng biến thể nào, cỡ nào, và điều gì không được quên.');
bang(['Hạng mục', 'Biến thể và màu', 'Kích thước', 'Điều không được quên'], G.TH_UNG_DUNG);
r.push('### Bộ tệp bàn giao', '');
bang(['Hạng mục', 'Định dạng', 'Gồm gì'], G.TH_TEP);
r.push('### Bảy luật giữ nhận diện', '');
luat(G.TH_LUAT_GIU);

/* ── B ── */
r.push('---', '', '# PHẦN B · BẢN QUYỀN VÀ ĐỀ ÁN QUỐC GIA', '');
r.push('## 0. Ranh giới của phần này — đọc trước', '');
luat(G.BQ_RANH_GIOI);

chuong('B1', 'Danh mục tài sản trí tuệ',
  'Không đếm được thì không giữ được. Mười hai tài sản, mỗi thứ một loại quyền và một nơi\nđăng ký khác nhau.');
bang(['Tài sản', 'Loại quyền', 'Nơi đăng ký', 'Ghi chú', 'Thứ tự ưu tiên'], G.BQ_TAI_SAN);

chuong('B2', 'Đăng ký quyền tác giả',
  'Quyền đã phát sinh **từ lúc tác phẩm được định hình**. Đăng ký không tạo ra quyền — đăng ký\ntạo ra chứng cứ.');
G.BQ_QUYEN_TG.forEach(function (x) { r.push('**' + x.t + '.** ' + x.n, '', '> ' + x.vi, ''); });
r.push('### Tám thứ trong hồ sơ', '');
bang(['Giấy tờ', 'Là gì', 'Chỗ hay sai'], G.BQ_HO_SO_TG);
r.push('### Sáu cách đóng dấu thời gian — làm được ngay hôm nay', '');
luat(G.BQ_DONG_DAU_TG);

chuong('B3', 'Đăng ký nhãn hiệu',
  '**Ngày nộp đơn là ngày xác lập quyền ưu tiên.** Phần lớn các nước theo nguyên tắc ai nộp\ntrước người đó được — không phải ai dùng trước.');
bang(['Bước', 'Làm gì', 'Ai làm', 'Cụ thể', 'Đầu ra'],
  G.BQ_NHAN_HIEU.map(function (x) { return [x.b, x.t, x.ai, x.n, x.ra]; }));
r.push('### Năm nhóm phải nộp', '');
bang(['Nhóm', 'Phạm vi', 'Vì sao cần', 'Bảo hộ được gì'], G.BQ_NHOM_NICE);

chuong('B4', 'Đề án cấp quốc gia',
  'Một đề án được xét dễ hơn nhiều khi nó **phục vụ một chủ trương đã có**, thay vì đề xuất\nmột chủ trương mới.');
bang(['Bước', 'Làm gì', 'Ai làm', 'Cụ thể', 'Đầu ra'],
  G.BQ_DE_AN.map(function (x) { return [x.b, x.t, x.ai, x.n, x.ra]; }));
r.push('### Cấu trúc hồ sơ mười một phần', '');
bang(['Phần', 'Gồm gì', 'Chỗ quyết định'], G.BQ_CAU_TRUC_DA);

chuong('B5', 'Ánh xạ sang Chương trình giáo dục phổ thông 2018',
  'Hội đồng thẩm định **không đọc hệ của mình bằng ngôn ngữ của mình** — họ đọc bằng ngôn ngữ\nchuẩn quốc gia. Bảng này là cây cầu, và là phần được đọc kỹ nhất trong cả hồ sơ đề án.');
r.push('### Năm phẩm chất', '');
bang(['Phẩm chất Gen Việt', 'Nghĩa là gì', 'Phẩm chất Chương trình 2018', 'Bằng chứng thu được'], G.BQ_ANH_XA_PC);
r.push('### Mười hai trục', '');
bang(['Trục', 'Đo gì', 'Năng lực Chương trình 2018', 'Bằng chứng thu được'], G.BQ_ANH_XA_NL);
r.push('### Năm luật của bảng ánh xạ', '');
luat(G.BQ_ANH_XA_LUAT);

/* ── C ── */
r.push('---', '', '# PHẦN C · TRIỂN KHAI TOÀN CẦU', '');

chuong('C1', 'Ra quốc tế',
  'Quyền tác giả đã có sẵn ở phần lớn thế giới nhờ Công ước Berne. Nhãn hiệu thì không —\nvà nhãn hiệu là thứ bị chiếm mất.');
G.BQ_QUOC_TE.forEach(function (x) { r.push('**' + x.t + '.** ' + x.n, '', '> ' + x.vi, ''); });

chuong('C2', 'Bản địa hoá ba tầng',
  'Dịch nguyên · thích ứng · tái tạo. Nhầm tầng là cách nhanh nhất để vừa mất chất vừa mất người.');
G.BQ_BAN_DIA.forEach(function (x) {
  r.push('### ' + x.t, '');
  r.push('- **Phần nào thuộc tầng này:** ' + x.dh);
  r.push('- **Nguyên tắc:** ' + x.can);
  r.push('- **Làm thế nào:** ' + x.lam);
  r.push('- **Bẫy:** ' + x.bay, '');
});

chuong('C3', 'Tuân thủ theo vùng',
  'Luật bảo vệ trẻ em và dữ liệu khác nhau đáng kể giữa các vùng. **Không suy diễn từ luật\nViệt Nam sang nước khác.**');
bang(['Vùng', 'Khung pháp lý chính', 'Điểm phải đáp ứng', 'Việc phải làm trước khi vào'], G.BQ_TUAN_THU);

chuong('C4', 'Lộ trình toàn cầu',
  'Bốn chặng, ba mươi năm, và một cổng phải qua trước khi sang chặng sau. Lộ trình này chạy\n**song song** với sáu chặng phát triển hệ ở tập 1, không thay thế.');
G.BQ_LO_TRINH.forEach(function (x) {
  r.push('### ' + x.ma + ' · ' + x.t + '  ·  ' + x.nam, '', '*' + x.hoi + '*', '');
  x.lam.forEach(function (y) { r.push('- ' + y); });
  r.push('');
  r.push('- **Đích:** ' + x.dich.join(' · '));
  r.push('- **Cổng sang chặng sau:** ' + x.cong);
  r.push('- **Rủi ro chính:** ' + x.rui, '');
});

chuong('C5', 'Chống xâm phạm',
  'Năm cấp, và một nguyên tắc: **bằng chứng phải có sẵn trước khi cần**, không đi thu thập\nsau khi phát hiện.');
bang(['Cấp', 'Dấu hiệu', 'Xử thế nào'], G.BQ_CHONG.map(function (x) { return [x.t, x.dau, x.phanh]; }));
r.push('### Bảy việc giữ bằng chứng — làm sẵn, không đợi', '');
luat(G.BQ_BANG_CHUNG);

r.push('---', '');
r.push('*Học viện GITA · Trương Nhật Quang · 08.5555.4688 — Nhận diện thương hiệu, bản quyền và toàn cầu, bản 1.0*');

/* ── Xuất tệp SVG gốc ────────────────────────────────────────
   Cùng một toạ độ với bản vẽ trong giao-dien.js. Đây là tệp bàn
   giao cho nhà in và cho xưởng chế tác — không vẽ lại bằng tay. */
var CHAM = [[63.74, 76.52], [67.39, 69.22], [71.04, 61.91],
            [74.70, 54.61], [78.35, 47.30], [82.00, 40.00]];
function svgAn(c, ten) {
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<!-- ẤN GEN VIỆT · ' + ten + '\n' +
    '     Học viện GITA · GEN VIỆT 365 · bản 1.0\n' +
    '     Lưới 120 × 120. Nét trái LUÔN LIỀN (bảy nguyên lý).\n' +
    '     Sáu chấm LUÔN CÓ QUÃNG (sáu bậc). Không vẽ lại bằng tay. -->\n' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120"\n' +
    '     role="img" aria-label="Ấn Gen Việt">\n' +
    '  <title>Ấn Gen Việt</title>\n' +
    '  <rect x="10" y="10" width="100" height="100" rx="16" fill="none" stroke="' + c + '" stroke-width="7"/>\n' +
    '  <path d="M38 40L60 84" fill="none" stroke="' + c + '" stroke-width="8" stroke-linecap="round"/>\n' +
    CHAM.map(function (d2) {
      return '  <circle cx="' + d2[0] + '" cy="' + d2[1] + '" r="3.4" fill="' + c + '"/>\n';
    }).join('') + '</svg>\n';
}
var thuMuc = path.join(GOC, 'nhan-dien');
if (!fs.existsSync(thuMuc)) fs.mkdirSync(thuMuc);
var ban = [['an-gen-viet-lam.svg', '#185AB4', 'bản thường ngày · lam GITA'],
           ['an-gen-viet-son.svg', '#BE0E16', 'bản nghi lễ · đỏ son'],
           ['an-gen-viet-muc.svg', '#0E1826', 'bản một nét · mực'],
           ['an-gen-viet-dao.svg', '#FFFFFF', 'bản đảo · trắng trên nền đặc'],
           ['an-gen-viet-theo-mau-chu.svg', 'currentColor', 'ăn theo màu chữ nơi nhúng']];
ban.forEach(function (b2) { fs.writeFileSync(path.join(thuMuc, b2[0]), svgAn(b2[1], b2[2]), 'utf8'); });
fs.writeFileSync(path.join(thuMuc, 'DOC-TRUOC.md'),
  '# Ấn Gen Việt — tệp gốc\n\n' +
  'Năm tệp trong thư mục này là **bản sinh ra** từ `tools/sinh-thuonghieu.cjs`.\n' +
  'Không sửa tay. Cần đổi thì sửa toạ độ trong bộ sinh rồi chạy lại:\n\n' +
  '```bash\nnode genviet365/tools/sinh-thuonghieu.cjs\n```\n\n' +
  '| Tệp | Dùng khi nào |\n|---|---|\n' +
  ban.map(function (b2) { return '| `' + b2[0] + '` | ' + b2[2] + ' |'; }).join('\n') + '\n\n' +
  'Luật dùng ấn, vùng an toàn và tám cách dùng sai: xem tập 7,\n' +
  '`docs/GEN_VIET_365_THUONG_HIEU.md`, mục A3.\n', 'utf8');
console.log('Đã xuất ' + ban.length + ' tệp SVG → ' + thuMuc);

var ra = path.join(GOC, '..', 'docs', 'GEN_VIET_365_THUONG_HIEU.md');
fs.writeFileSync(ra, r.join('\n') + '\n', 'utf8');
console.log('Đã sinh ' + ra + ' · ' + r.length + ' dòng');
