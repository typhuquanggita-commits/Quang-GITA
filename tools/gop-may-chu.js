/* ═══════════════════════════════════════════════════════════════
   GITA 365 — GỘP MÃ MÁY CHỦ THÀNH MỘT TỆP

       node tools/gop-may-chu.js

   Bảy tệp trong server/ là cách chia để đọc và sửa. Nhưng người dựng máy
   chủ phải dán bảy lần, và chỉ cần quên một tệp là cả bộ đứng im theo kiểu
   rất khó đoán ra.

   Công cụ này gộp bảy tệp ấy thành server/GITA365_TATCA.gs — dán một lần.
   Nội dung nguyên văn, không cắt bớt dòng nào. Chạy lại sau mỗi lần sửa mã
   máy chủ; tools/phat-hanh.js tự gọi nên thường không phải nhớ.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const GOC = path.join(__dirname, '..', 'server');

const PHAN = [
  ['GITA_Nen.gs',      'LỚP NỀN — bảng dữ liệu, phiên, băm mật khẩu, nhật ký, đăng nhập'],
  ['GITA_CapPhep.gs',  'CẤP PHÉP — doPost, cửa vào duy nhất, và việc cấp khoá mở kho'],
  ['GITA_DangKy.gs',   'ĐĂNG KÝ — OTP, kích hoạt, mã số khách hàng, nâng tầng'],
  ['GITA_MatKhau.gs',  'MẬT KHẨU — đổi, quên, đặt lại bằng mã'],
  ['GITA_TaiLieu.gs',  'TÀI LIỆU — nhận tài liệu và minh chứng, kiểm duyệt'],
  ['GITA_DongBo.gs',   'ĐỒNG BỘ — hồ sơ và cài đặt giữa bản web và bản cài trên máy'],
  ['GITA_XuatSheet.gs','XUẤT SHEET — đẩy bảng tính về thư mục Drive của Học viện'],
  ['GITA_BanWeb.gs',   'BẢN WEB — doGet: phục vụ trang, trả gói kho, báo tình trạng']
];

const DAU = `/**
 * ═══════════════════════════════════════════════════════════════════════
 *  GITA 365 — MÁY CHỦ  ·  TOÀN BỘ TRONG MỘT TỆP
 *  Học viện GITA · Trương Nhật Quang · 08.5555.4688
 * ═══════════════════════════════════════════════════════════════════════
 *
 *  Bảy phần mã của máy chủ gộp lại một chỗ, để dán MỘT LẦN thay vì bảy lần.
 *  Nội dung y hệt bảy tệp trong thư mục server/ của kho mã — không cắt bớt.
 *
 *  ── KHÔNG CÓ MẬT KHẨU NÀO TRONG TỆP NÀY ──
 *  Mã nguồn đi qua kho mã, qua tin nhắn, qua email, qua màn hình người khác
 *  nhìn thấy. Một mật khẩu đặt cứng trong mã là mật khẩu đã lộ từ dòng đầu
 *  tiên nó được viết ra. Nên máy chủ tự sinh mật khẩu tạm khi cài đặt, hiện
 *  một lần trong log, gửi kèm một thư, rồi KHÔNG mở kho cho tới khi mật khẩu
 *  ấy được đổi.
 *
 *  ── LÀM THEO ĐÚNG BỐN BƯỚC ──
 *
 *  1. Vào script.google.com bằng tài khoản Google của Học viện.
 *     New project → đổi tên thành GITA 365 → xoá hết nội dung Code.gs
 *     → dán TOÀN BỘ tệp này vào.
 *
 *  2. Kiểm hai dòng ngay dưới đây. Sai thì sổ dữ liệu nằm nhầm chỗ.
 *
 *  3. Chọn hàm  caiDatLanDau  → Run.
 *     Google hỏi quyền ở lần đầu: Review permissions → chọn tài khoản →
 *     Advanced → Go to GITA 365 (unsafe) → Allow.
 *     ("unsafe" chỉ nghĩa là dự án chưa qua kiểm duyệt của Google.
 *      Đây là mã của chính Học viện.)
 *
 *     Log sẽ hiện MẬT KHẨU TẠM của Admin@gita365. Chép ngay — nó không hiện
 *     lại lần thứ hai. Một bản cũng được gửi tới email hệ thống.
 *     Lỡ mất thì chạy hàm  datLaiMatKhauSuperAdmin  để sinh mật khẩu mới.
 *
 *  4. Thêm một tệp mã nữa tên GITA_NapKhoa, dán nội dung tệp bộ khoá,
 *     chọn hàm  napBoKhoaMotLan  → Run → log báo "Đã nạp 7 khoá"
 *     → XOÁ tệp GITA_NapKhoa khỏi dự án ngay lập tức.
 *
 *  Rồi triển khai:
 *     Deploy → New deployment → bánh răng → Web app
 *        Execute as      : Me
 *        Who has access  : Anyone
 *     → Deploy → chép địa chỉ kết thúc bằng /exec
 *
 *  Cuối cùng, trong ứng dụng GITA 365: đăng nhập Super Admin →
 *  Quản trị trang → Nối máy chủ → dán địa chỉ → Lưu → Gọi thử.
 *
 *  Lần đăng nhập đầu, ứng dụng sẽ đưa thẳng tới màn đổi mật khẩu. Kho chỉ
 *  mở sau khi đổi xong — đây là chặn thật ở máy chủ, không phải lời nhắc.
 *
 *  Hướng dẫn đầy đủ, kể cả phần xử lý khi có trục trặc: docs/MAY_CHU.md
 * ═══════════════════════════════════════════════════════════════════════
 */
`;

let ra = DAU;
let dong = 0;
for (const [ten, mo] of PHAN) {
  const s = fs.readFileSync(path.join(GOC, ten), 'utf8');
  dong += s.split('\n').length;
  ra += '\n\n/* ═══════════════════════════════════════════════════════════════════════\n' +
        '   ' + mo + '\n' +
        '   (nguyên văn server/' + ten + ')\n' +
        '   ═══════════════════════════════════════════════════════════════════════ */\n\n' +
        s.replace(/\s+$/, '') + '\n';
}

const RA = path.join(GOC, 'GITA365_TATCA.gs');
fs.writeFileSync(RA, ra);

/* Soát ngay: cú pháp phải chạy được, và không mật khẩu nào lọt vào. */
try { new Function(ra); }
catch (e) { console.error('  ✗ Tệp gộp sai cú pháp: ' + e.message); process.exit(1); }

const lo = /toiyeugita365|password\s*=\s*['"]|pwHash:\s*hashPw_\(['"][^'"]{4,}['"]/.exec(ra);
if (lo) { console.error('  ✗ Có mật khẩu nằm cứng trong mã: ' + lo[0]); process.exit(1); }

/* Apps Script chỉ cho MỘT doGet và MỘT doPost trong cả dự án. Gộp nhầm hai
   cái là dự án không lưu được, mà lỗi báo ra thì mơ hồ. Đếm ngay ở đây. */
['doGet', 'doPost'].forEach(function (h) {
  const n = (ra.match(new RegExp('^function\\s+' + h + '\\s*\\(', 'gm')) || []).length;
  if (n !== 1) {
    console.error('  ✗ Phải có đúng một hàm ' + h + ', đang có ' + n + '.');
    process.exit(1);
  }
});

console.log('  ✓ server/GITA365_TATCA.gs — ' + PHAN.length + ' phần · ' +
  ra.split('\n').length + ' dòng · ' + Math.round(ra.length / 1024) + ' KB');
console.log('  ✓ cú pháp chạy được · đúng một doGet và một doPost · không mật khẩu nằm cứng');
