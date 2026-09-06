/* ═══════════════════════════════════════════════════════════════
   GITA 365 — THỬ CỬA VÀO MỚI

       node tools/thu-worker.js

   Bộ thử gọi ĐÚNG hàm fetch của may-chu/worker.js, qua một Request
   thật và nhận về một Response thật. Không dựng lại luồng xử lý ở đây:
   dựng lại là thử một bản chép, và bản chép thì đúng cho tới hôm bản
   thật đổi.

   Chỗ duy nhất phải dựng là D1 — Cloudflare không chạy được ở máy này.
   Lớp dựng ấy mỏng đúng ba hàm (.bind .first .all .run) và chạy trên
   node:sqlite, tức là chạy trên CÙNG một cỗ máy cơ sở dữ liệu mà D1
   dùng. Câu lệnh nào chạy ở đây thì chạy ở đó.

   ═══════════ MỖI PHÉP ĐO Ở ĐÂY LÀ MỘT CÂU HỎI VỀ AN TOÀN ═══════════

   Cửa vào là chỗ duy nhất người lạ chạm được. Nên bộ thử này không đo
   "chạy có ra kết quả không" — nó đo những chỗ mà một câu trả lời SAI
   sẽ mở ra một cánh cửa: dò được email nào đã đăng ký, dùng token của
   người khác, giữ phiên cũ sau khi đổi mật khẩu, rút khoá kho hàng
   loạt, nhận khoá của gói không được cấp.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const path = require('path');
process.chdir(path.join(__dirname, '..'));
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite');

const dinhDangVN = n => Number(n || 0).toLocaleString('vi-VN') + 'đ';
let loi = 0;
const bao = (ok, ten, ct) => {
  if (!ok) loi++;
  console.log((ok ? '  ✓ ' : '  ✗ ') + ten + (ct ? ' — ' + ct : ''));
};

/* ═══════════════ LỚP DỰNG D1 ═══════════════
   Ba hàm, không hơn. Mỗi hàm thêm vào đây là một chỗ bộ thử có thể
   khác bản thật mà không ai biết. */
function dungD1(db) {
  return {
    prepare(sql) {
      let dv = [];
      const o = {
        bind(...a) { dv = a; return o; },
        async first() { return db.prepare(sql).get(...dv) ?? null; },
        async all()   { return {results: db.prepare(sql).all(...dv)}; },
        async run()   {
          const r = db.prepare(sql).run(...dv);
          return {meta: {changes: Number(r.changes || 0)}};
        }
      };
      return o;
    }
  };
}

/* ═══════════════ LỚP DỰNG KHO TỆP R2 ═══════════════
   Bốn hàm Worker thật sự gọi: get · put · delete, và get trả về một đối
   tượng có .text() và .arrayBuffer(). Không thêm gì nữa — mỗi hàm thừa
   là một chỗ bộ thử có thể khác bản thật mà không ai biết. */
function dungR2() {
  const tep = new Map();
  return {
    _tep: tep,
    async get(k) {
      if (!tep.has(k)) return null;
      const b = tep.get(k);
      return {async text() { return b; }, async arrayBuffer() { return Buffer.from(b); }};
    },
    async put(k, v) { tep.set(k, Buffer.isBuffer(v) ? v.toString('utf8') : String(v)); },
    async delete(k) { tep.delete(k); }
  };
}


(async () => {
console.log('\nTHỬ CỬA VÀO MỚI — Worker thật, D1 dựng trên node:sqlite\n');

const db = new DatabaseSync(':memory:');
db.exec(fs.readFileSync('may-chu/csdl.sql', 'utf8'));

const worker = (await import('../may-chu/worker.js')).default;
const nen    = await import('../may-chu/nen.js');

const kho = dungR2();
/* HỘP THƯ GIẢ. guiThu đẩy thư vào đây thay vì gọi ra mạng — nên bộ thử
   đọc được ĐÚNG lá thư người dùng sẽ nhận, kể cả mã sáu số nằm trong
   đó. Không có nó thì phần đăng ký chỉ kiểm được "có trả về ok không",
   mà chỗ dễ sai nhất lại là NỘI DUNG thư đi tới đâu và mang gì. */
const hopThu = [];
const env = {
  CSDL: dungD1(db),
  HOSO: kho,
  GHI_THU: hopThu,
  GITA_DIA_CHI_WEB: 'https://gita.edu.vn',
  GITA_TIEU: 'tieu-thu-nghiem-khong-dung-that',
  GITA_KHOA_KY: 'khoa-ky-thu-nghiem-khong-dung-that',
  GITA_KHOA_KHO: JSON.stringify({
    nen: 'khoa-nen', nghe: 'khoa-nghe', 'nghe-cao': 'khoa-nghe-cao',
    tang1: 'k1', tang2: 'k2', tang3: 'k3', tang4: 'k4', tang5: 'k5'
  })
};

const goi = async y => {
  const r = await worker.fetch(new Request('https://gita.test/', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(y)
  }), env);
  return {ma: r.status, than: await r.json(), tieuDe: r.headers};
};

/* ═══════════════ 1 · DỰNG TÀI KHOẢN ═══════════════ */
console.log('1 · DỰNG TÀI KHOẢN');
async function themNguoi(id, u, mk, role, opt) {
  const muoi = nen.muoiMoi();
  db.prepare('INSERT INTO users (id,username,hoTen,email,role,portal,pwSalt,pwHash,active,' +
    'createdAt,mustChangePw) VALUES (?,?,?,?,?,?,?,?,?,?,?)').run(
    id, u, 'Người ' + id, u, role, (opt && opt.portal) || 'ph',
    muoi, await nen.bamMoi(mk, muoi, env.GITA_TIEU),
    (opt && opt.active === 0) ? 0 : 1, new Date().toISOString(),
    (opt && opt.mustChangePw) ? 1 : 0);
}
/* Một tài khoản CỐ Ý còn bản băm KIỂU CŨ — để phép đo nâng bản băm ở
   mục 3 có thứ thật để nâng, chứ không nâng một bản do chính nó vừa
   dựng bằng cách mới. */
async function themNguoiBamCu(id, u, mk, role) {
  const muoi = nen.muoiMoi();
  db.prepare('INSERT INTO users (id,username,hoTen,email,role,portal,pwSalt,pwHash,active,createdAt) ' +
    'VALUES (?,?,?,?,?,?,?,?,1,?)').run(
    id, u, 'Người ' + id, u, role, 'ph', muoi,
    await nen.bamCu(mk, muoi, env.GITA_TIEU), new Date().toISOString());
}

await themNguoi('U-ph', 'phuhuynh@gita365.vn', 'MatKhauRieng2026!', 'R13');
await themNguoi('U-coach', 'coach@gita365.vn', 'MatKhauRieng2026!', 'R07', {portal: 'coach'});
await themNguoi('U-gv', 'giaovien@gita365.vn', 'MatKhauRieng2026!', 'R08', {portal: 'coach'});
await themNguoi('U-khoa', 'bikhoa@gita365.vn', 'MatKhauRieng2026!', 'R13', {active: 0});
await themNguoi('U-tam', 'mktam@gita365.vn', 'MatKhauRieng2026!', 'R13', {mustChangePw: 1});
await themNguoiBamCu('U-cu', 'bamcu@gita365.vn', 'MatKhauRieng2026!', 'R13');
db.prepare('INSERT INTO students (id,hoTen,tier,phuHuynhId,createdAt) VALUES (?,?,?,?,?)')
  .run('HV-1', 'Con nhà A', 3, 'U-ph', new Date().toISOString());
bao(db.prepare('SELECT count(*) c FROM users').get().c === 6, 'dựng 6 tài khoản thử');

/* ═══════════════ 2 · ĐĂNG NHẬP ═══════════════ */
console.log('\n2 · ĐĂNG NHẬP');
const dn = await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(dn.than.ok && dn.than.token, 'mật khẩu đúng thì vào được', 'vai ' + dn.than.role);
bao(dn.than.tier === 3, 'trả về đúng tầng đang học, đọc từ hồ sơ học viên', 'tầng ' + dn.than.tier);
bao(dn.than.token && dn.than.token.length === 64,
  'token 32 byte ngẫu nhiên thật, không phải UUID', dn.than.token.length + ' ký tự hex');

const sai = await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'sai-roi'});
const khong = await goi({fn: 'dangNhap', u: 'khongcoai@gita365.vn', mk: 'gi-cung-duoc'});
bao(!sai.than.ok && !khong.than.ok, 'sai mật khẩu và không có tài khoản đều bị từ chối');
bao(sai.than.error === khong.than.error,
  'HAI CÂU TỪ CHỐI GIỐNG HỆT NHAU — không dò được email nào đã đăng ký',
  JSON.stringify(sai.than.error));

const khoa = await goi({fn: 'dangNhap', u: 'bikhoa@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(!khoa.than.ok && khoa.than.code === 'LOCKED',
  'nhưng ĐÚNG mật khẩu thì nói thật là tài khoản đang khoá',
  'tới đây người hỏi đã chứng minh họ là chủ tài khoản');

/* ═══════════════ 3 · NÂNG BẢN BĂM, KHÔNG BẮT AI ĐẶT LẠI ═══════════════ */
console.log('\n3 · NÂNG BẢN BĂM MẬT KHẨU');
const truoc = db.prepare('SELECT pwHash FROM users WHERE id = ?').get('U-cu').pwHash;
bao(!truoc.startsWith('pbkdf2$'), 'tài khoản này đang giữ bản băm KIỂU CŨ — SHA-256 một vòng',
  truoc.slice(0, 16) + '…');
const dnCu = await goi({fn: 'dangNhap', u: 'bamcu@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(dnCu.than.ok, 'bản băm cũ vẫn đăng nhập được — không ai bị bắt đặt lại mật khẩu');
const sau = db.prepare('SELECT pwHash FROM users WHERE id = ?').get('U-cu').pwHash;
bao(sau.startsWith('pbkdf2$'), 'và bản băm được thay bằng PBKDF2 NGAY trong lượt ấy',
  sau.split('$')[1] + ' vòng');
const dnCu2 = await goi({fn: 'dangNhap', u: 'bamcu@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(dnCu2.than.ok, 'nâng xong vẫn đăng nhập được bằng đúng mật khẩu cũ');
bao(!(await goi({fn: 'dangNhap', u: 'bamcu@gita365.vn', mk: 'MatKhauRieng2027!'})).than.ok,
  'và mật khẩu sai vẫn bị từ chối sau khi nâng');

/* ═══════════════ 4 · PHIÊN ═══════════════ */
console.log('\n4 · PHIÊN');
const tk = dn.than.token;
bao((await goi({fn: 'capKhoa', token: tk, u: 'phuhuynh@gita365.vn', goi: ['nen']})).than.ok,
  'token đúng thì qua cửa');
bao((await goi({fn: 'capKhoa', token: tk, u: 'coach@gita365.vn'})).than.code === 'AUTH',
  'TÊN GỬI LÊN PHẢI KHỚP PHIÊN — không dùng được token của người khác');
bao((await goi({fn: 'capKhoa', token: 'bia-ra-mot-token', u: 'phuhuynh@gita365.vn'})).than.code === 'AUTH',
  'token bịa thì bị chặn');

db.prepare('UPDATE sessions SET exp = ? WHERE id = ?').run(Date.now() - 1000, tk);
bao((await goi({fn: 'capKhoa', token: tk, u: 'phuhuynh@gita365.vn'})).than.code === 'AUTH',
  'phiên quá hạn thì hết dùng được');
db.prepare('UPDATE sessions SET exp = ? WHERE id = ?').run(Date.now() + 3600e3, tk);

/* ═══════════════ 5 · CẤP KHOÁ ĐÚNG PHẠM VI ═══════════════ */
console.log('\n5 · CẤP KHOÁ — ĐÚNG PHẠM VI, KHÔNG HƠN');
const ckPh = (await goi({fn: 'capKhoa', token: tk, u: 'phuhuynh@gita365.vn'})).than;
bao(ckPh.ok && ckPh.phamVi.join(',') === 'nen,tang1,tang2,tang3',
  'phụ huynh tầng 3 nhận nền + tầng 1-2-3, KHÔNG có tầng 4-5',
  ckPh.phamVi.join(', '));
bao(!ckPh.khoa['tang4'] && !ckPh.khoa['tang5'] && !ckPh.khoa['nghe'],
  'và trong khoá trả về cũng không có tầng 4, tầng 5 hay gói nghề');

const ckXin = (await goi({fn: 'capKhoa', token: tk, u: 'phuhuynh@gita365.vn',
  goi: ['nen', 'tang5', 'nghe', 'nghe-cao']})).than;
bao(ckXin.phamVi.join(',') === 'nen',
  'XIN THÊM GÓI KHÔNG ĐƯỢC CẤP THÌ KHÔNG ĐƯỢC — máy chủ giao nhau với phạm vi, không tin danh sách máy khách gửi lên',
  'xin 4 gói, nhận ' + ckXin.phamVi.join(', '));

const dnC = await goi({fn: 'dangNhap', u: 'coach@gita365.vn', mk: 'MatKhauRieng2026!'});
const ckC = (await goi({fn: 'capKhoa', token: dnC.than.token, u: 'coach@gita365.vn'})).than;
bao(ckC.phamVi.indexOf('nghe-cao') >= 0, 'Coach (bậc 7) nhận được gói NGHỀ CAO — hồ sơ khách tầng 4-5');

const dnG = await goi({fn: 'dangNhap', u: 'giaovien@gita365.vn', mk: 'MatKhauRieng2026!'});
const ckG = (await goi({fn: 'capKhoa', token: dnG.than.token, u: 'giaovien@gita365.vn'})).than;
bao(ckG.phamVi.indexOf('nghe') >= 0 && ckG.phamVi.indexOf('nghe-cao') < 0,
  'Giáo viên (bậc 8) nhận gói nghề nhưng KHÔNG nhận gói nghề cao',
  'chốt của chủ hệ: tầng 4-5 chỉ từ Coach lên — ' + ckG.phamVi.join(', '));

const dnT = await goi({fn: 'dangNhap', u: 'mktam@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(dnT.than.ok && dnT.than.phaiDoiMk, 'mật khẩu tạm vẫn đăng nhập được');
bao((await goi({fn: 'capKhoa', token: dnT.than.token, u: 'mktam@gita365.vn'})).than.code === 'MUSTCHANGE',
  'nhưng mật khẩu tạm KHÔNG mở được kho — nó đã đi qua log và qua email');

/* ═══════════════ 6 · ĐỔI MẬT KHẨU ĐÁ PHIÊN KHÁC ═══════════════ */
console.log('\n6 · ĐỔI MẬT KHẨU');
const dnA = await goi({fn: 'dangNhap', u: 'coach@gita365.vn', mk: 'MatKhauRieng2026!'});
const dnB = await goi({fn: 'dangNhap', u: 'coach@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(dnA.than.token !== dnB.than.token, 'mở được hai phiên cùng lúc trên hai máy');

bao(!(await goi({fn: 'doiMatKhau', token: dnA.than.token, u: 'coach@gita365.vn',
  cu: 'sai', moi: 'MotChuoiKhacHan2026!'})).than.ok, 'sai mật khẩu cũ thì không đổi được');
bao(!(await goi({fn: 'doiMatKhau', token: dnA.than.token, u: 'coach@gita365.vn',
  cu: 'MatKhauRieng2026!', moi: 'password123'})).than.ok,
  'mật khẩu mới dễ đoán thì bị chặn ngay lần đầu');

const doi = (await goi({fn: 'doiMatKhau', token: dnA.than.token, u: 'coach@gita365.vn',
  cu: 'MatKhauRieng2026!', moi: 'MotChuoiKhacHan2026!'})).than;
bao(doi.ok, 'đổi được mật khẩu');
bao((await goi({fn: 'capKhoa', token: dnB.than.token, u: 'coach@gita365.vn'})).than.code === 'AUTH',
  'ĐỔI MẬT KHẨU ĐÁ LUÔN PHIÊN TRÊN MÁY KHÁC — kẻ giữ token cũ mất quyền ngay',
  'đá ' + doi.daPhien + ' phiên');
bao((await goi({fn: 'capKhoa', token: dnA.than.token, u: 'coach@gita365.vn'})).than.ok,
  'nhưng phiên đang dùng để đổi thì giữ lại — không tự đá mình ra');
bao((await goi({fn: 'dangNhap', u: 'coach@gita365.vn', mk: 'MotChuoiKhacHan2026!'})).than.ok &&
    !(await goi({fn: 'dangNhap', u: 'coach@gita365.vn', mk: 'MatKhauRieng2026!'})).than.ok,
  'mật khẩu mới dùng được, mật khẩu cũ hết dùng được');

/* ═══════════════ 7 · CHẶN NHỊP ═══════════════ */
console.log('\n7 · CHẶN NHỊP');
for (let i = 0; i < 12; i++)
  await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'doan-thu-' + i});
const chan = await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(!chan.than.ok && chan.than.code === 'RATE',
  'đoán liên tiếp thì bị chặn, KỂ CẢ khi gõ đúng mật khẩu ở lượt sau',
  chan.than.error);
bao(db.prepare("SELECT count(*) c FROM chanNhip WHERE khoa LIKE 'dangNhapSai%'").get().c > 0,
  'số đếm nằm trong CƠ SỞ DỮ LIỆU, không nằm trong bộ nhớ từng máy chủ',
  'Worker chạy ở hàng trăm nơi cùng lúc — đếm trong bộ nhớ thì rải đều lượt thử là qua được');

/* Đăng nhập đúng thì xoá số đếm — người gõ nhầm vài lần rồi gõ đúng
   không bị phạt tiếp ở lần sau. */
db.exec("DELETE FROM chanNhip WHERE khoa LIKE 'dangNhapSai%'");
await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'sai'});
await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'MatKhauRieng2026!'});
bao(db.prepare("SELECT count(*) c FROM chanNhip WHERE khoa LIKE 'dangNhapSai%'").get().c === 0,
  'gõ đúng thì số đếm được xoá — gõ nhầm vài lần không bị phạt sang lần sau');

/* ═══════════════ 8 · ĐỒNG BỘ HỒ SƠ ═══════════════ */
console.log('\n8 · ĐỒNG BỘ HỒ SƠ');
db.prepare("UPDATE users SET maKhachHang = 'GITA-0001' WHERE id = 'U-ph'").run();
db.prepare("UPDATE users SET maKhachHang = 'GITA-0002' WHERE id = 'U-gv'").run();

const dnP = await goi({fn: 'dangNhap', u: 'phuhuynh@gita365.vn', mk: 'MatKhauRieng2026!'});
const tkP = dnP.than.token;
const day1 = await goi({fn: 'dongBo', token: tkP, u: 'phuhuynh@gita365.vn',
  day: {journal: {'n-1': 'tối nay con tự ngồi vào bàn'}},
  mocTruong: {'journal.n-1': 1000}});
bao(day1.than.ok && day1.than.keo.journal['n-1'] === 'tối nay con tự ngồi vào bàn',
  'đẩy lên rồi kéo về đúng thứ vừa đẩy');
bao(kho._tep.has('hoso/U-ph.json'),
  'RUỘT hồ sơ nằm trong KHO TỆP, không nằm trong bảng',
  'nền cũ nhét cả khối JSON vào MỘT Ô Sheets — trần 50.000 ký tự, trong khi mã tin trần là 512 KB');
bao(!db.prepare('SELECT * FROM hosoApp WHERE uid = ?').get('U-ph').khoaTep.includes('journal'),
  'bảng chỉ giữ CHỖ TRỎ và kích cỡ',
  db.prepare('SELECT khoaTep, coByte FROM hosoApp WHERE uid = ?').get('U-ph').khoaTep);

/* GỘP THEO TỪNG TRƯỜNG: hai máy sửa hai việc khác nhau thì giữ CẢ HAI. */
const day2 = await goi({fn: 'dongBo', token: tkP, u: 'phuhuynh@gita365.vn',
  day: {journal: {'n-2': 'ghi từ máy thứ hai'}},
  mocTruong: {'journal.n-2': 2000}});
bao(day2.than.keo.journal['n-1'] && day2.than.keo.journal['n-2'],
  'GỘP THEO TỪNG TRƯỜNG — máy thứ hai đẩy lên không xoá việc máy thứ nhất đã ghi',
  Object.keys(day2.than.keo.journal).join(', '));

/* Mốc cũ hơn thì KHÔNG thắng — nếu không thì một máy để lâu không mở
   sẽ ghi đè lên mọi thứ vừa làm trên máy khác. */
const cu = await goi({fn: 'dongBo', token: tkP, u: 'phuhuynh@gita365.vn',
  day: {journal: {'n-2': 'bản CŨ từ máy để lâu không mở'}},
  mocTruong: {'journal.n-2': 500}});
bao(cu.than.keo.journal['n-2'] === 'ghi từ máy thứ hai',
  'MỐC CŨ HƠN THÌ KHÔNG THẮNG — máy để lâu không mở không ghi đè việc vừa làm',
  'và bản mới hơn đi ngược về máy ấy ở phần keo');

/* Nhóm không có trong danh sách thì từ chối, và NÓI RA đã bỏ qua gì. */
const la = await goi({fn: 'dongBo', token: tkP, u: 'phuhuynh@gita365.vn',
  day: {nhomBiaRa: {x: 1}}, mocTruong: {'nhomBiaRa.x': 9000}});
bao(la.than.boQua.indexOf('nhomBiaRa') >= 0,
  'nhóm ngoài danh sách bị bỏ qua và ĐƯỢC NÓI RA — không im lặng nuốt mất');

/* Trần kích thước. */
const to = await goi({fn: 'dongBo', token: tkP, u: 'phuhuynh@gita365.vn',
  day: {journal: {big: 'x'.repeat(600 * 1024)}}, mocTruong: {'journal.big': 9999}});
bao(to.than.code === 'TOOBIG', 'gói quá 512 KB bị từ chối — không đẩy cả kho lên bằng một lệnh');

/* SAO LƯU TRƯỚC KHI GHI ĐÈ, và giữ đúng mười bản gần nhất. */
const soSao = db.prepare('SELECT count(*) c FROM hosoAppSaoLuu WHERE uid = ?').get('U-ph').c;
bao(soSao >= 1, 'có sao lưu trước mỗi lần ghi đè', soSao + ' bản');
for (let i = 0; i < 14; i++)
  await goi({fn: 'dongBo', token: tkP, u: 'phuhuynh@gita365.vn',
    day: {journal: {['lap-' + i]: 'x'}}, mocTruong: {['journal.lap-' + i]: 3000 + i}});
const sauDon = db.prepare('SELECT count(*) c FROM hosoAppSaoLuu WHERE uid = ?').get('U-ph').c;
bao(sauDon === 10, 'giữ đúng MƯỜI bản sao lưu gần nhất, dọn ngay chứ không đợi bộ dọn đêm',
  sauDon + ' bản · ' + [...kho._tep.keys()].filter(k => k.startsWith('hoso-sao/U-ph')).length + ' tệp trong kho');
bao([...kho._tep.keys()].filter(k => k.startsWith('hoso-sao/U-ph')).length === 10,
  'và tệp trong kho cũng được xoá theo — không để lại tệp mồ côi tính tiền hằng tháng');

/* ── CẮT CỤM DÙNG CHUNG THEO TỪNG NHÀ ──
   Đây là chỗ một câu trả lời sai làm rò dữ liệu nhà này sang nhà khác. */
console.log('');
const dnCo = await goi({fn: 'dangNhap', u: 'coach@gita365.vn', mk: 'MotChuoiKhacHan2026!'});
const dbCo = await goi({fn: 'dongBo', token: dnCo.than.token, u: 'coach@gita365.vn',
  day: {}, caiDat: {
    khothem: {luc: 5000, du: {'GITA-0001|tl·A1': 'tư liệu nhà 1', 'GITA-0002|tl·B1': 'tư liệu nhà 2'}},
    ca: {luc: 5000, du: {'ca-1': 'nguyên văn lời gia đình kể, có tên và số điện thoại'}}
  }});
bao(dbCo.than.ok && dbCo.than.caiDat.ca, 'Coach (bậc 7) ghi và nhận lại được hồ sơ ca');
bao(Object.keys(dbCo.than.caiDat.khothem.du).length === 2, 'và nhận CẢ cụm tư liệu của mọi nhà');

const dbPh = await goi({fn: 'dongBo', token: tkP, u: 'phuhuynh@gita365.vn', day: {}});
bao(!dbPh.than.caiDat.ca,
  'PHỤ HUYNH KHÔNG NHẬN HỒ SƠ CA — nó mang tên nhà, số điện thoại và nguyên văn lời gia đình kể');
bao(!dbPh.than.caiDat.phanquyen && !dbPh.than.caiDat.tainguyen,
  'phụ huynh cũng không nhận bảng phân quyền hay mức dùng tài nguyên của đội ngũ');
const kt = dbPh.than.caiDat.khothem;
bao(kt && Object.keys(kt.du).length === 1 && kt.du['GITA-0001|tl·A1'],
  'CẮT THEO MÃ NHÀ — phụ huynh nhà 1 chỉ nhận tư liệu của nhà 1',
  'trả nguyên khối là gửi tư liệu nhà khác xuống máy họ, và mở khoá tư liệu ấy cho tất cả');

/* Gia đình chỉ đẩy được LỜI XIN, không ghi được vào cụm tư liệu. */
await goi({fn: 'dongBo', token: tkP, u: 'phuhuynh@gita365.vn', day: {},
  caiDat: {khothem: {luc: 9999, du: {'GITA-0001|tl·TU-GHI': 'nhà tự ghi vào kho tư liệu'}},
           xinthem: {luc: 9999, du: [{nha: 'GITA-0001', xin: 'cho con thêm bài đọc'}]}}});
const soi = await goi({fn: 'dongBo', token: dnCo.than.token, u: 'coach@gita365.vn', day: {}});
bao(!soi.than.caiDat.khothem.du['GITA-0001|tl·TU-GHI'],
  'GIA ĐÌNH KHÔNG GHI ĐƯỢC vào cụm tư liệu — chỉ Tư vấn và Coach mới ghi',
  'chặn ở máy chủ, không chặn ở màn hình');
bao(soi.than.caiDat.xinthem && soi.than.caiDat.xinthem.du.length === 1,
  'nhưng LỜI XIN của gia đình thì lên được — đó là đường duy nhất họ đặt yêu cầu');

/* ═══════════════ 9 · ĐĂNG KÝ, MÃ SÁU SỐ QUA EMAIL, KÍCH HOẠT ═══════════════ */
console.log('\n9 · ĐĂNG KÝ QUA EMAIL');
const thuCuoi = () => hopThu[hopThu.length - 1] || {den:'', tieuDe:'(chưa có thư)', than:''};
const HOSO_MOI = {hoTen: 'Trần Thị B', email: 'nhamoi@vidu.vn', dienThoai: '0912345678',
  tenCon: 'Trần Văn C', lop: '7', tinh: 'Hà Nội'};

/* Kiểm dữ liệu vào TRƯỚC khi gửi thư — sai định dạng thì không tốn một
   lá thư nào, và cũng không tạo một dòng chờ nào. */
hopThu.length = 0;
bao(!(await goi({fn: 'dangKy', hoSo: {...HOSO_MOI, email: 'khong-phai-email'}})).than.ok &&
    !(await goi({fn: 'dangKy', hoSo: {...HOSO_MOI, dienThoai: '123'}})).than.ok &&
    !(await goi({fn: 'dangKy', hoSo: {...HOSO_MOI, tenCon: ''}})).than.ok,
  'email sai, điện thoại sai, thiếu tên con — đều bị chặn');
bao(hopThu.length === 0, 'và không lá thư nào bị gửi đi cho ba lượt sai ấy');

const dk = await goi({fn: 'dangKy', hoSo: HOSO_MOI});
bao(dk.than.ok && /mã sáu số/.test(dk.than.thongBao), 'đăng ký nhận về lời nhắn chờ mã');
bao(hopThu.length === 1 && thuCuoi().den === 'nhamoi@vidu.vn',
  'thư đi đúng địa chỉ người đăng ký', thuCuoi().tieuDe);
const maOtp = (thuCuoi().than.match(/là: (\d{6})/) || [])[1];
bao(!!maOtp && maOtp.length === 6, 'thư mang MÃ SÁU SỐ đọc được', maOtp);

/* Mã KHÔNG được nằm nguyên văn trong cơ sở dữ liệu. Một bản sao lưu lọt
   ra là mọi mã đang chờ đều đọc được, và mỗi mã ấy mở một tài khoản mới
   mang tên người khác. */
const dong = db.prepare("SELECT * FROM dangKyCho WHERE email = 'nhamoi@vidu.vn'").get();
bao(dong && dong.otpHash && dong.otpHash.indexOf(maOtp) < 0 && dong.otpHash.length === 64,
  'mã trong sổ đã BĂM, không nằm nguyên văn');

/* Câu trả lời phải GIỐNG HỆT nhau cho email đã có và email chưa có. */
const dkTrung = await goi({fn: 'dangKy',
  hoSo: {...HOSO_MOI, email: 'phuhuynh@gita365.vn'}});
bao(dkTrung.than.ok && dkTrung.than.thongBao.replace('phuhuynh@gita365.vn', 'nhamoi@vidu.vn')
      === dk.than.thongBao,
  'EMAIL ĐÃ CÓ TÀI KHOẢN trả lời Y HỆT email chưa có — không dò được ai đã đăng ký');
bao(/đã có tài khoản/.test(thuCuoi().tieuDe),
  'nhưng vẫn gửi một thư nhắc, để người THẬT biết phải làm gì', thuCuoi().tieuDe);

/* Nhập sai mã: đếm lùi và huỷ mã, không cho dò mãi. */
bao(!(await goi({fn: 'xacThucOtp', email: 'nhamoi@vidu.vn', ma: '000000'})).than.ok,
  'mã sai thì từ chối');
const sai2 = await goi({fn: 'xacThucOtp', email: 'nhamoi@vidu.vn', ma: '111111'});
bao(/Còn \d+ lần/.test(sai2.than.error || ''), 'và nói còn mấy lần nhập', sai2.than.error);
for (let i = 0; i < 4; i++)
  await goi({fn: 'xacThucOtp', email: 'nhamoi@vidu.vn', ma: '222222'});
bao(!(await goi({fn: 'xacThucOtp', email: 'nhamoi@vidu.vn', ma: maOtp})).than.ok,
  'SAI QUÁ NĂM LẦN THÌ HUỶ MÃ — kể cả sau đó gõ đúng mã cũng không qua');

/* Gửi lại mã: mã cũ chết, mã mới sống. */
hopThu.length = 0;
db.prepare("DELETE FROM chanNhip WHERE khoa LIKE 'dangKy%'").run();
await goi({fn: 'guiLaiOtp', email: 'nhamoi@vidu.vn'});
const maMoi = (thuCuoi().than.match(/: (\d{6})/) || [])[1];
bao(!!maMoi && maMoi !== maOtp, 'gửi lại thì ra mã KHÁC', maMoi);
bao(!(await goi({fn: 'xacThucOtp', email: 'nhamoi@vidu.vn', ma: maOtp})).than.ok,
  'mã cũ hết dùng được sau khi gửi lại');

const xt = await goi({fn: 'xacThucOtp', email: 'nhamoi@vidu.vn', ma: maMoi});
bao(xt.than.ok, 'mã mới đúng thì qua');
const lien = (thuCuoi().than.match(/#kichhoat=([a-f0-9]+)/) || [])[1];
bao(!!lien && lien.length === 64,
  'và thư kế tiếp mang ĐƯỜNG DẪN kích hoạt — người đăng ký phải quay lại TỪ hòm thư',
  'token ' + lien.length + ' ký tự hex');
const dong2 = db.prepare("SELECT * FROM dangKyCho WHERE email = 'nhamoi@vidu.vn'").get();
bao(!dong2.otpHash, 'bản băm mã đã xoá sau khi dùng xong — bí mật dùng rồi thì không giữ lại');

/* Kích hoạt: cùng một luật mật khẩu với chỗ đổi mật khẩu. */
bao(!(await goi({fn: 'kichHoat', token: lien, mk: '1234567890'})).than.ok,
  'MẬT KHẨU DỄ ĐOÁN KHÔNG MỞ ĐƯỢC TÀI KHOẢN MỚI',
  'nền cũ để cửa này chỉ đòi mười ký tự, nên đúng chuỗi này mở được');
bao(!(await goi({fn: 'kichHoat', token: 'bia-ra', mk: 'MotChuoiTuTe2026!'})).than.ok,
  'đường dẫn bịa thì không mở được');

hopThu.length = 0;
const kh = await goi({fn: 'kichHoat', token: lien, mk: 'MotChuoiTuTe2026!'});
bao(kh.than.ok && /^GITA-\d{4}$/.test(kh.than.maKhachHang || ''),
  'kích hoạt xong, cấp mã số khách hàng', kh.than.maKhachHang);
bao(/tài khoản đã mở/.test(thuCuoi().tieuDe), 'và gửi thư báo đã mở');

const dnMoi = await goi({fn: 'dangNhap', u: 'nhamoi@vidu.vn', mk: 'MotChuoiTuTe2026!'});
bao(dnMoi.than.ok && dnMoi.than.role === 'R13', 'tài khoản mới đăng nhập được ngay', dnMoi.than.role);
const hvMoi = db.prepare("SELECT * FROM students WHERE phuHuynhId = ?").get(
  db.prepare("SELECT id FROM users WHERE email = 'nhamoi@vidu.vn'").get().id);
bao(hvMoi && hvMoi.hoTen === 'Trần Văn C' && Number(hvMoi.tier) === 0,
  'và có hồ sơ học viên ở TẦNG 0 — chờ KPI và xác nhận thanh toán, máy chủ không tự nâng');

bao(!(await goi({fn: 'kichHoat', token: lien, mk: 'MotChuoiTuTe2026!'})).than.ok,
  'ĐƯỜNG DẪN DÙNG MỘT LẦN — bấm lại không mở thêm tài khoản thứ hai');

/* MÃ SỐ KHÁCH HÀNG KHÔNG ĐƯỢC TRÙNG. Nền cũ đếm count(*)+1 và phải
   quây trong khoá; ở đây là một câu lệnh cộng thêm, không cần khoá. */
const dem = {};
for (let i = 0; i < 30; i++) {
  db.prepare("DELETE FROM chanNhip").run();
  const e = 'nha' + i + '@vidu.vn';
  await goi({fn: 'dangKy', hoSo: {...HOSO_MOI, email: e}});
  const m = (thuCuoi().than.match(/là: (\d{6})/) || [])[1];
  await goi({fn: 'xacThucOtp', email: e, ma: m});
  const t = (thuCuoi().than.match(/#kichhoat=([a-f0-9]+)/) || [])[1];
  const r = await goi({fn: 'kichHoat', token: t, mk: 'MotChuoiTuTe2026!'});
  dem[r.than.maKhachHang] = (dem[r.than.maKhachHang] || 0) + 1;
}
bao(Object.keys(dem).length === 30 && Object.values(dem).every(x => x === 1),
  'ba mươi lượt kích hoạt ra BA MƯƠI mã khác nhau, không lượt nào trùng',
  Object.keys(dem).sort()[0] + ' … ' + Object.keys(dem).sort().pop());

/* Trần gửi thư: chặn người dội thư vào một hòm thư. */
db.prepare("DELETE FROM chanNhip").run();
hopThu.length = 0;
for (let i = 0; i < 6; i++) await goi({fn: 'dangKy', hoSo: {...HOSO_MOI, email: 'doi@vidu.vn'}});
bao(hopThu.length <= 3, 'một địa chỉ không nhận quá ba thư đăng ký mỗi giờ',
  hopThu.length + ' thư trong 6 lượt');
bao((await goi({fn: 'dangKy', hoSo: {...HOSO_MOI, email: 'doi@vidu.vn'}})).than.ok,
  'và lượt bị chặn vẫn trả lời Y HỆT lượt thường — người dội thư không biết mình đã bị chặn');

/* Chữ người dùng gõ không được nhét nội dung vào thư mang tên GITA. */
db.prepare("DELETE FROM chanNhip").run();
hopThu.length = 0;
await goi({fn: 'dangKy', hoSo: {...HOSO_MOI, email: 'chennoidung@vidu.vn',
  hoTen: 'A\nBcc: nan-nhan@vidu.vn\nNội dung giả mạo'}});
bao(hopThu.length === 1 && thuCuoi().than.indexOf('\nBcc:') < 0,
  'HỌ TÊN TỰ ĐẶT KHÔNG XUỐNG DÒNG ĐƯỢC trong thân thư',
  'thư mang tên Học viện GITA, để nguyên là mở một chỗ nhét nội dung tuỳ ý');

/* ═══════════════ 10 · QUÊN VÀ ĐẶT LẠI MẬT KHẨU ═══════════════ */
console.log('\n10 · QUÊN VÀ ĐẶT LẠI MẬT KHẨU');
db.prepare("DELETE FROM chanNhip").run();
hopThu.length = 0;

const qCo = await goi({fn: 'quenMatKhau', u: 'nhamoi@vidu.vn'});
const qKhong = await goi({fn: 'quenMatKhau', u: 'khong-ai-co@vidu.vn'});
bao(qCo.than.ok && qKhong.than.ok && qCo.than.thongBao === qKhong.than.thongBao,
  'TÀI KHOẢN CÓ THẬT VÀ KHÔNG CÓ TRẢ LỜI Y HỆT — cửa này không thành công cụ dò',
  JSON.stringify(qCo.than.thongBao));
bao(hopThu.length === 1 && hopThu[0].den === 'nhamoi@vidu.vn',
  'nhưng chỉ tài khoản có thật mới nhận được thư', hopThu.length + ' thư cho 2 lượt xin');
const maQ = (thuCuoi().than.match(/\n\s+(\d{6})\n/) || [])[1];
bao(!!maQ, 'thư mang mã sáu số', maQ);

const gQ = db.prepare("SELECT * FROM maLayLai").get();
bao(gQ && gQ.bam && gQ.bam.indexOf(maQ) < 0, 'mã trong sổ đã BĂM, không nằm nguyên văn');

/* Xin mã bằng EMAIL rồi đặt lại bằng chính email ấy — và mã lưu theo
   uid nên hai đường vào cùng trỏ về một tài khoản. */
bao(!(await goi({fn: 'datLaiMatKhau', u: 'nhamoi@vidu.vn', ma: '000000',
  moi: 'ChuoiHoanToanKhac2026!'})).than.ok, 'mã sai thì từ chối');

/* Mật khẩu yếu chỉ được chê SAU khi mã đã đúng — chê trước là nói cho
   người dò biết họ đoán đúng tên tài khoản. */
const yeuTruoc = await goi({fn: 'datLaiMatKhau', u: 'khong-ai-co@vidu.vn',
  ma: '123456', moi: '123456789012'});
bao(yeuTruoc.than.code === 'EXPIRED',
  'tài khoản không có + mật khẩu yếu → vẫn chỉ nói "mã hết hạn"',
  'chê mật khẩu trước khi kiểm mã là xác nhận tài khoản có thật');

const yeuSau = await goi({fn: 'datLaiMatKhau', u: 'nhamoi@vidu.vn', ma: maQ,
  moi: 'password12345'});
bao(yeuSau.than.code === 'WEAK',
  'nhưng mã ĐÚNG + mật khẩu yếu thì chê thẳng', yeuSau.than.error);

const dl = await goi({fn: 'datLaiMatKhau', u: 'nhamoi@vidu.vn', ma: maQ,
  moi: 'ChuoiHoanToanKhac2026!'});
bao(dl.than.ok, 'mã đúng + mật khẩu tử tế thì đặt lại được');
bao((await goi({fn: 'dangNhap', u: 'nhamoi@vidu.vn', mk: 'ChuoiHoanToanKhac2026!'})).than.ok &&
    !(await goi({fn: 'dangNhap', u: 'nhamoi@vidu.vn', mk: 'MotChuoiTuTe2026!'})).than.ok,
  'mật khẩu mới dùng được, mật khẩu cũ hết dùng được');
bao(!(await goi({fn: 'datLaiMatKhau', u: 'nhamoi@vidu.vn', ma: maQ,
  moi: 'MotChuoiKhacNua2026!'})).than.ok,
  'MÃ DÙNG MỘT LẦN — đặt lại xong thì mã ấy chết');
bao(/đã được đặt lại/.test(thuCuoi().tieuDe),
  'và gửi thư báo — thứ duy nhất cho người thật biết có chuyện, nếu không phải họ làm',
  thuCuoi().tieuDe);
bao(/giờ Việt Nam/.test(thuCuoi().than),
  'thư ghi giờ VIỆT NAM, không phải giờ UTC',
  'người đọc ở Việt Nam; một mốc UTC làm họ tưởng chuyện xảy ra lúc khác rồi bỏ qua');

/* ĐÁ MỌI PHIÊN — kể cả phiên đang mở của chính người ấy. */
db.prepare("DELETE FROM chanNhip").run();
const dnA2 = await goi({fn: 'dangNhap', u: 'nhamoi@vidu.vn', mk: 'ChuoiHoanToanKhac2026!'});
const dnB2 = await goi({fn: 'dangNhap', u: 'nhamoi@vidu.vn', mk: 'ChuoiHoanToanKhac2026!'});
await goi({fn: 'quenMatKhau', u: 'nhamoi@vidu.vn'});
const maQ2 = (thuCuoi().than.match(/\n\s+(\d{6})\n/) || [])[1];
await goi({fn: 'datLaiMatKhau', u: 'nhamoi@vidu.vn', ma: maQ2, moi: 'ChuoiThuBa2026!'});
bao((await goi({fn: 'capKhoa', token: dnA2.than.token, u: 'nhamoi@vidu.vn'})).than.code === 'AUTH' &&
    (await goi({fn: 'capKhoa', token: dnB2.than.token, u: 'nhamoi@vidu.vn'})).than.code === 'AUTH',
  'ĐẶT LẠI MẬT KHẨU ĐÁ MỌI PHIÊN, không trừ cái nào',
  'người dùng cửa này thường vừa mất quyền kiểm soát tài khoản — giữ lại một phiên là giữ nguyên cánh cửa họ vừa đi khoá');

/* Sai năm lần thì huỷ mã. */
db.prepare("DELETE FROM chanNhip").run();
await goi({fn: 'quenMatKhau', u: 'nhamoi@vidu.vn'});
const maQ3 = (thuCuoi().than.match(/\n\s+(\d{6})\n/) || [])[1];
let cuoiCung = null;
for (let i = 0; i < 5; i++)
  cuoiCung = await goi({fn: 'datLaiMatKhau', u: 'nhamoi@vidu.vn',
    ma: '90000' + i, moi: 'ChuoiThuTu2026!'});
bao(cuoiCung.than.code === 'LOCKED', 'sai năm lần thì HUỶ mã', cuoiCung.than.error);
bao((await goi({fn: 'datLaiMatKhau', u: 'nhamoi@vidu.vn', ma: maQ3,
  moi: 'ChuoiThuTu2026!'})).than.code === 'EXPIRED',
  'và mã đúng sau đó cũng không dùng được nữa');

/* Xin mã mới thì mã cũ chết — một tài khoản chỉ một mã sống. */
db.prepare("DELETE FROM chanNhip").run();
await goi({fn: 'quenMatKhau', u: 'nhamoi@vidu.vn'});
const maCu = (thuCuoi().than.match(/\n\s+(\d{6})\n/) || [])[1];
await goi({fn: 'quenMatKhau', u: 'nhamoi@vidu.vn'});
const maMoi2 = (thuCuoi().than.match(/\n\s+(\d{6})\n/) || [])[1];
bao(db.prepare("SELECT count(*) c FROM maLayLai").get().c === 1,
  'MỘT TÀI KHOẢN CHỈ MỘT MÃ SỐNG — xin mã mới là mã cũ chết',
  'để nhiều mã cùng sống là chỉ cần đoán trúng một cái trong số đó');
bao(maCu !== maMoi2 &&
    !(await goi({fn: 'datLaiMatKhau', u: 'nhamoi@vidu.vn', ma: maCu, moi: 'ChuoiThuNam2026!'})).than.ok,
  'và mã cũ hết dùng được ngay');

/* Trần xin mã. */
db.prepare("DELETE FROM chanNhip").run();
hopThu.length = 0;
for (let i = 0; i < 8; i++) await goi({fn: 'quenMatKhau', u: 'nhamoi@vidu.vn'});
bao(hopThu.length <= 5, 'một tài khoản xin mã tối đa năm lần mỗi giờ',
  hopThu.length + ' thư trong 8 lượt');

/* Tài khoản đang khoá thì không xin được mã — nhưng vẫn trả lời y hệt. */
db.prepare("DELETE FROM chanNhip").run();
hopThu.length = 0;
const qKhoa = await goi({fn: 'quenMatKhau', u: 'bikhoa@gita365.vn'});
bao(qKhoa.than.ok && hopThu.length === 0,
  'tài khoản đang khoá: không gửi mã, nhưng vẫn trả lời y hệt');

/* ═══════════════ 11 · DỌN THEO LỊCH ═══════════════

   Bốn bảng ở nền mới chỉ lớn lên nếu không ai dọn. Đây đúng lớp việc mà
   bản 9.79 dựng cho nền cũ; chuyển nền thì phải mang theo, nếu không thì
   vừa gỡ được một chỗ tắc lại dựng lại đúng chỗ ấy ở nơi mới. */
console.log('\n11 · DỌN THEO LỊCH');
const donDep = (await import('../may-chu/worker.js')).donDep;

/* Đặt vào mỗi bảng một dòng ĐÃ CHẾT và một dòng CÒN SỐNG. Phép đo chỉ
   có nghĩa khi nó chứng minh được cả hai vế: dọn đúng thứ chết, và
   KHÔNG đụng thứ còn sống. */
const nay = Date.now();
db.prepare("INSERT INTO sessions (id,uid,exp,createdAt) VALUES ('S-chet','U-ph',?,'')").run(nay - 1000);
db.prepare("INSERT INTO sessions (id,uid,exp,createdAt) VALUES ('S-song','U-ph',?,'')").run(nay + 3600e3);
db.prepare("INSERT INTO chanNhip (khoa,dem,hetHan) VALUES ('chet',1,?)").run(nay - 2 * 86400e3);
db.prepare("INSERT INTO chanNhip (khoa,dem,hetHan) VALUES ('song',1,?)").run(nay + 3600e3);
db.prepare("INSERT INTO maLayLai (uid,muoi,bam,hetHan,sai) VALUES ('U-chet','m','b',?,0)").run(nay - 2 * 3600e3);
db.prepare("INSERT INTO maLayLai (uid,muoi,bam,hetHan,sai) VALUES ('U-song','m','b',?,0)").run(nay + 600e3);
const cuLam = new Date(nay - 40 * 86400e3).toISOString();
db.prepare("INSERT INTO dangKyCho (id,email,trangThai,createdAt) VALUES ('D-chet','a@b.vn','choOtp',?)").run(cuLam);
db.prepare("INSERT INTO dangKyCho (id,email,trangThai,createdAt) VALUES ('D-cho','c@d.vn','choKichHoat',?)").run(cuLam);

const don = await donDep(env);
const co = (b, id, cot) => !!db.prepare('SELECT 1 FROM ' + b + ' WHERE ' + (cot || 'id') + ' = ?').get(id);
bao(!co('sessions','S-chet') && co('sessions','S-song'), 'phiên hết hạn bị dọn, phiên còn sống ở lại');
bao(!co('chanNhip','chet','khoa') && co('chanNhip','song','khoa'), 'dòng chặn nhịp quá hạn bị dọn');
bao(!co('maLayLai','U-chet','uid') && co('maLayLai','U-song','uid'), 'mã lấy lại mật khẩu đã chết bị dọn');
bao(!co('dangKyCho','D-chet') && co('dangKyCho','D-cho'),
  'đăng ký bỏ dở quá 30 ngày bị dọn, nhưng lượt ĐANG CHỜ KÍCH HOẠT thì giữ',
  'người ta có thể mở thư cũ và bấm vào');
bao(don.tongXoa === 4, 'nói ra đã xoá bao nhiêu dòng', don.ke.join(' · '));
bao(!!db.prepare("SELECT 1 FROM audit WHERE viec = 'DON_DEP'").get(),
  'và ghi một dòng vào nhật ký SAU khi dọn',
  'một bộ dọn chạy im lặng là một bộ dọn không ai kiểm được');

/* ═══════════════ 12 · QUYỀN XEM HỒ SƠ KHÁCH, VÀ NÂNG TẦNG ═══════════════ */
console.log('\n12 · QUYỀN XEM HỒ SƠ KHÁCH');
db.prepare("DELETE FROM chanNhip").run();
await themNguoi('U-sa', 'superadmin@gita365.vn', 'MatKhauRieng2026!', 'R01', {portal:'admin'});
await themNguoi('U-dg', 'danhgia@gita365.vn', 'MatKhauRieng2026!', 'R10', {portal:'coach'});
const luc4 = new Date().toISOString();
db.prepare("INSERT INTO students (id,hoTen,tier,phuHuynhId,createdAt) VALUES ('HV-T4','Nhà tầng 4',4,'U-x',?)").run(luc4);
db.prepare("INSERT INTO students (id,hoTen,tier,phuHuynhId,createdAt) VALUES ('HV-T5','Nhà tầng 5',5,'U-y',?)").run(luc4);

const tkSA = (await goi({fn:'dangNhap', u:'superadmin@gita365.vn', mk:'MatKhauRieng2026!'})).than.token;
const tkGV = (await goi({fn:'dangNhap', u:'giaovien@gita365.vn', mk:'MatKhauRieng2026!'})).than.token;
const tkDG = (await goi({fn:'dangNhap', u:'danhgia@gita365.vn', mk:'MatKhauRieng2026!'})).than.token;
const tkCoach = (await goi({fn:'dangNhap', u:'coach@gita365.vn', mk:'MotChuoiKhacHan2026!'})).than.token;

/* CHIỀU MỘT — TRẦN VAI, chặn thật kể cả với Super Admin. */
const capGV = await goi({fn:'capQuyenXem', token:tkSA, u:'superadmin@gita365.vn',
  cap:{nguoiDuocCap:'giaovien@gita365.vn', vai:'R08', tang:['T4'],
       hetHan:'2027-01-01', lyDo:'thử'}});
bao(!capGV.than.ok && (capGV.than.vuotTran||[]).length === 1,
  'TRẦN CHẶN CẢ SUPER ADMIN — cấp tầng 4 cho Giáo viên là từ chối',
  'trần mà người cao nhất phá được thì nó là một lời khuyên, không phải trần');

bao(!(await goi({fn:'capQuyenXem', token:tkCoach, u:'coach@gita365.vn',
  cap:{nguoiDuocCap:'giaovien@gita365.vn', vai:'R07', tang:['T4'],
       hetHan:'2027-01-01', lyDo:'thử'}})).than.ok,
  'chỉ Super Admin cấp được quyền — Coach bấm cũng không');

bao(!(await goi({fn:'capQuyenXem', token:tkSA, u:'superadmin@gita365.vn',
  cap:{nguoiDuocCap:'coach@gita365.vn', vai:'R07', tang:['T4','T5'], hetHan:'2027-01-01'}})).than.ok,
  'KHÔNG CẤP QUYỀN MÀ KHÔNG CÓ LÝ DO');
bao(!(await goi({fn:'capQuyenXem', token:tkSA, u:'superadmin@gita365.vn',
  cap:{nguoiDuocCap:'coach@gita365.vn', vai:'R07', tang:['T4','T5'], lyDo:'x'}})).than.ok,
  'và không cấp giấy phép KHÔNG HẠN — hôm giao là giao mãi');
bao(!(await goi({fn:'capQuyenXem', token:tkSA, u:'superadmin@gita365.vn',
  cap:{nguoiDuocCap:'coach@gita365.vn', vai:'R07', tang:['T4'],
       hetHan:'2020-01-01', lyDo:'x'}})).than.ok,
  'ngày hết hạn phải nằm ở tương lai');

/* CHIỀU HAI — GIẤY PHÉP. Đủ trần mà chưa cấp thì vẫn là không. */
const truocCap = await goi({fn:'xemKhachCao', token:tkCoach, u:'coach@gita365.vn'});
bao(!truocCap.than.ok && /Chưa được Super Admin cấp quyền/.test(truocCap.than.error),
  'Coach ĐỦ TRẦN tầng 4-5 nhưng CHƯA CÓ GIẤY PHÉP thì vẫn không xem được',
  truocCap.than.error);

const cap = await goi({fn:'capQuyenXem', token:tkSA, u:'superadmin@gita365.vn',
  cap:{nguoiDuocCap:'coach@gita365.vn', vai:'R07', tang:['T4','T5'],
       hetHan:'2027-01-01', lyDo:'kèm hai nhà tầng cao quý 4'}});
bao(cap.than.ok, 'cấp cho Coach thì được', cap.than.tang.join(','));
bao(!(await goi({fn:'capQuyenXem', token:tkSA, u:'superadmin@gita365.vn',
  cap:{nguoiDuocCap:'coach@gita365.vn', vai:'R07', tang:['T4'],
       hetHan:'2027-06-01', lyDo:'chồng thêm'}})).than.ok,
  'KHÔNG CẤP HAI GIẤY PHÉP CÙNG LÚC — không ai biết bản nào đang chạy');

const xem = await goi({fn:'xemKhachCao', token:tkCoach, u:'coach@gita365.vn'});
bao(xem.than.ok && xem.than.so === 2, 'cấp rồi thì xem được hồ sơ tầng 4-5', xem.than.so + ' hồ sơ');

/* CHIỀU BA — TRẦN MỤC. Đủ tầng mà không đủ mục thì vẫn là không. */
const capDG = await goi({fn:'capQuyenXem', token:tkSA, u:'superadmin@gita365.vn',
  cap:{nguoiDuocCap:'danhgia@gita365.vn', vai:'R10', tang:['T4','T5'],
       hetHan:'2027-01-01', lyDo:'chấm KPI quý 4'}});
bao(capDG.than.ok, 'Chuyên gia đánh giá ĐỦ TRẦN tầng 4-5, cấp được');
const xemDG = await goi({fn:'xemKhachCao', token:tkDG, u:'danhgia@gita365.vn'});
bao(!xemDG.than.ok && /Chỉ xem được: kpi/.test(xemDG.than.error),
  'NHƯNG CHỈ ĐƯỢC MỤC KPI — đủ tầng mà không đủ mục thì vẫn là không',
  xemDG.than.error);

/* Giáo viên: không có tên trong trần nào. */
const xemGV = await goi({fn:'xemKhachCao', token:tkGV, u:'giaovien@gita365.vn'});
bao(!xemGV.than.ok, 'Giáo viên không xem được hồ sơ khách, ở mọi tầng');
const soiGV = await goi({fn:'soiQuyenXem', token:tkGV, u:'giaovien@gita365.vn'});
bao(soiGV.than.tranVai.length === 0,
  'và tự soi thì thấy trần vai RỖNG — danh sách trắng, vai không có tên là không có');

/* TRẦN ĐỌC LẠI LÚC DÙNG, không tin cột vai đã ghi trong giấy phép. */
db.prepare("UPDATE users SET role = 'R08' WHERE id = 'U-coach'").run();
db.prepare("UPDATE sessions SET role = 'R08' WHERE uid = 'U-coach'").run();
const sauHa = await goi({fn:'xemKhachCao', token:tkCoach, u:'coach@gita365.vn'});
bao(!sauHa.than.ok,
  'HẠ BẬC MỘT NGƯỜI THÌ QUYỀN MẤT NGAY, không đợi giấy phép hết hạn',
  'giấy phép vẫn nằm đó với cột vai R07 — tin cột ấy là để người vừa bị hạ bậc giữ nguyên quyền');
db.prepare("UPDATE users SET role = 'R07' WHERE id = 'U-coach'").run();
db.prepare("UPDATE sessions SET role = 'R07' WHERE uid = 'U-coach'").run();

/* THU HỒI — đánh dấu, không xoá. */
const th = await goi({fn:'thuHoiQuyenXem', token:tkSA, u:'superadmin@gita365.vn',
  nguoiDuocCap:'coach@gita365.vn'});
bao(th.than.ok, 'thu hồi được');
bao(!(await goi({fn:'xemKhachCao', token:tkCoach, u:'coach@gita365.vn'})).than.ok,
  'thu hồi rồi thì hết xem được NGAY');
bao(db.prepare("SELECT count(*) c FROM quyenXem WHERE nguoiDuocCap='coach@gita365.vn'").get().c === 1,
  'nhưng DÒNG SỔ VẪN CÒN — xoá là xoá luôn bằng chứng đã từng cấp',
  'đúng thứ cần trả lời khi có chuyện');

/* HẾT HẠN THÌ TỰ TẮT. */
db.prepare("UPDATE quyenXem SET thuHoiLuc = NULL, hetHan = ? WHERE nguoiDuocCap='coach@gita365.vn'")
  .run(new Date(Date.now() - 1000).toISOString());
bao(!(await goi({fn:'xemKhachCao', token:tkCoach, u:'coach@gita365.vn'})).than.ok,
  'GIẤY PHÉP HẾT HẠN TỰ TẮT — không chờ ai nhớ ra đi gỡ');

/* MỖI LƯỢT QUA CỬA MỘT DÒNG SỔ, kể cả lượt bị từ chối. */
bao(db.prepare("SELECT count(*) c FROM audit WHERE viec='XEMKHACH_CAO'").get().c >= 1 &&
    db.prepare("SELECT count(*) c FROM audit WHERE viec='XEMKHACH_TUCHOI'").get().c >= 3,
  'mỗi lượt qua cửa MỘT DÒNG SỔ, kể cả lượt bị từ chối',
  'ngày một hồ sơ rò ra ngoài thì câu "ai đã mở nó" chỉ trả lời được nếu hôm nay đã ghi');

console.log('\n12b · NÂNG TẦNG');
db.prepare("INSERT INTO users (id,username,hoTen,email,role,portal,active,createdAt,maKhachHang) " +
  "VALUES ('U-nhaA','nhaA@vidu.vn','Nhà A','nhaA@vidu.vn','R13','ph',1,?,'GITA-9001')").run(luc4);
db.prepare("INSERT INTO users (id,username,hoTen,email,role,portal,active,createdAt,maKhachHang) " +
  "VALUES ('U-nhaB','nhaB@vidu.vn','Nhà B','nhaB@vidu.vn','R13','ph',1,?,'GITA-9002')").run(luc4);
db.prepare("INSERT INTO students (id,hoTen,tier,kpi,phuHuynhId,createdAt) VALUES ('HV-A','Con nhà A',1,85,'U-nhaA',?)").run(luc4);
db.prepare("INSERT INTO students (id,hoTen,tier,kpi,phuHuynhId,createdAt) VALUES ('HV-B','Con nhà B',1,90,'U-nhaB',?)").run(luc4);
db.prepare("INSERT INTO thanhToan (id,maKhachHang,tier,trangThai,daDung) VALUES ('TT-A','GITA-9001',2,'daXacNhan',0)").run();

bao(!(await goi({fn:'nangTang', token:tkCoach, u:'coach@gita365.vn',
  maHocVien:'HV-A', tang:2, maKhachHang:'GITA-9001'})).than.ok,
  'chỉ R01–R03 nâng tầng được — Coach bấm cũng không');

/* PHIẾU CỦA NHÀ A KHÔNG MỞ TẦNG CHO CON NHÀ B. */
const lechNha = await goi({fn:'nangTang', token:tkSA, u:'superadmin@gita365.vn',
  maHocVien:'HV-B', tang:2, maKhachHang:'GITA-9001'});
bao(!lechNha.than.ok && /không khớp/.test(lechNha.than.error),
  'PHIẾU CỦA NHÀ A KHÔNG MỞ ĐƯỢC TẦNG CHO CON NHÀ B',
  'trước 9.44 mã lấy thẳng từ thân yêu cầu, không đối chiếu hồ sơ học viên');

db.prepare("UPDATE students SET kpi = 70 WHERE id = 'HV-A'").run();
const kpiThap = await goi({fn:'nangTang', token:tkSA, u:'superadmin@gita365.vn',
  maHocVien:'HV-A', tang:2, maKhachHang:'GITA-9001'});
bao(!kpiThap.than.ok && /80%/.test(kpiThap.than.error), 'KPI dưới 80% thì không nâng',
  kpiThap.than.error);
db.prepare("UPDATE students SET kpi = 85 WHERE id = 'HV-A'").run();

bao(!(await goi({fn:'nangTang', token:tkSA, u:'superadmin@gita365.vn',
  maHocVien:'HV-A', tang:4, maKhachHang:'GITA-9001'})).than.ok,
  'chỉ nâng được MỘT tầng mỗi lần, theo thứ tự');

const nt = await goi({fn:'nangTang', token:tkSA, u:'superadmin@gita365.vn',
  maHocVien:'HV-A', tang:2, maKhachHang:'GITA-9001'});
bao(nt.than.ok && Number(db.prepare("SELECT tier FROM students WHERE id='HV-A'").get().tier) === 2,
  'đủ KPI + đúng phiếu + đúng nhà thì nâng được');

/* NHÀ CHUYỂN TỪ NỀN CŨ SANG CÓ MÃ MÀ CHƯA CÓ TỆP. GITA-9001 dựng bằng
   INSERT thẳng, không đi qua đường kích hoạt — đúng trạng thái của mọi
   nhà chuyển từ Sheets sang. Trước bản 9.89 nâng tầng cho nhà như thế
   thì UPDATE hoSoKhach đổi 0 dòng và trôi qua lặng lẽ, còn lịch thu vẫn
   dựng đủ: công nợ treo cho một mã không tra được. Phép đối soát ở mục
   15 bắt được nó (DS-2) ngay lần chạy đầu, trên chính dữ liệu thử này. */
const tepVa = db.prepare("SELECT * FROM hoSoKhach WHERE maKhachHang='GITA-9001'").get();
bao(!!tepVa && tepVa.uidPhuHuynh === 'U-nhaA' && Number(tepVa.tang) === 2,
  'NHÀ CHƯA CÓ TỆP THÌ NÂNG TẦNG MỞ TỆP LUÔN — không để công nợ treo cho một mã không tra được',
  'trạng thái của mọi nhà chuyển từ nền Sheets sang');
bao(db.prepare("SELECT count(*) c FROM kyThu WHERE maKhachHang NOT IN " +
  "(SELECT maKhachHang FROM hoSoKhach)").get().c === 0,
  'và không còn kỳ thu nào treo ngoài sổ tệp');

db.prepare("UPDATE students SET tier = 1 WHERE id = 'HV-A'").run();
const lai = await goi({fn:'nangTang', token:tkSA, u:'superadmin@gita365.vn',
  maHocVien:'HV-A', tang:2, maKhachHang:'GITA-9001'});
bao(!lai.than.ok,
  'PHIẾU THANH TOÁN DÙNG MỘT LẦN — không đánh dấu thì một phiếu mở tầng cho bao nhiêu học viên cũng được',
  lai.than.error);

/* ═══════════════ 13 · CHỨNG CỨ HOA HỒNG ═══════════════

   Tệp duy nhất ra tiền thật. Mọi thứ khác sai thì sửa; chỗ này sai thì
   kết thúc ở toà chứ không kết thúc ở một bản vá. Nên phép đo ở đây
   phải PHÁ ĐƯỢC, không chỉ chạy được. */
console.log('\n13 · CHỨNG CỨ HOA HỒNG');
const BAN_CC = {nhiemVu:'NV-01', ngayLam:'2026-09-01', loai:'kem',
  noiDung:'Ngồi cùng nhà B một buổi, chốt nếp học tối.'};

const kyCC = await goi({fn:'kyChungCu', token:tkCoach, u:'coach@gita365.vn', cc:BAN_CC});
bao(kyCC.than.ok && kyCC.than.bienNhan.chuKy.length === 64,
  'ký được, trả về biên nhận có chữ ký HMAC-SHA256', kyCC.than.bienNhan.ma);
const maCC = kyCC.than.bienNhan.ma;

bao(kyCC.than.bienNhan.chuKy.indexOf(maCC.slice(3)) < 0 &&
    maCC.indexOf(kyCC.than.bienNhan.chuKy.slice(0, 6)) < 0,
  'MÃ KHÔNG MANG MỘT MẨU CHỮ KÝ NÀO',
  'nền cũ ghép 6 ký tự chữ ký vào mã — in 24 bit ra chỗ ai cũng đọc được');

bao(JSON.stringify(kyCC.than).indexOf('khoa-ky-thu-nghiem') < 0,
  'KHOÁ KÝ KHÔNG ĐI TRONG PHẢN HỒI, không một mẩu nào');

/* nguoiGhi lấy từ PHIÊN, không lấy từ thân yêu cầu. */
const giaTen = await goi({fn:'kyChungCu', token:tkCoach, u:'coach@gita365.vn',
  cc:{...BAN_CC, nguoiGhi:'superadmin@gita365.vn', noiDung:'thử ghi tên người khác'}});
bao(db.prepare("SELECT nguoiGhi FROM chungCu WHERE ma = ?").get(giaTen.than.bienNhan.ma).nguoiGhi
      === 'coach@gita365.vn',
  'NGƯỜI GHI LẤY TỪ PHIÊN — gửi tên người khác lên cũng không ăn thua',
  'nhận từ thân yêu cầu thì ghi tên ai cũng được, và cả bảng chứng cứ mất nghĩa');

/* GIỜ MÁY CHỦ, không phải giờ máy khách. */
const gioGia = await goi({fn:'kyChungCu', token:tkCoach, u:'coach@gita365.vn',
  cc:{...BAN_CC, gioMayChu:'2020-01-01T00:00:00.000Z', noiDung:'thử đóng giờ giả'}});
bao(new Date(gioGia.than.bienNhan.gioMayChu).getFullYear() >= 2026,
  'GIỜ ĐÓNG LÀ GIỜ MÁY CHỦ — giờ máy khách đổi được trong ba giây',
  gioGia.than.bienNhan.gioMayChu);

/* Soi: ký lại từ dữ liệu đang lưu rồi so. */
const soi1 = await goi({fn:'soiChungCu', token:tkCoach, u:'coach@gita365.vn', ma:maCC});
bao(soi1.than.ok && soi1.than.khop === true, 'soi bản chưa ai đụng thì KHỚP');
bao(JSON.stringify(soi1.than).indexOf('khoa-ky-thu-nghiem') < 0,
  'và lượt soi cũng không trả khoá ra');

/* ── SỬA LÉN THẲNG VÀO BẢNG THÌ LỘ ──
   Đây là phép đo quan trọng nhất của cả mục. Lớp ký không NGĂN được
   người ta sửa; nó làm cho việc sửa KHÔNG GIẤU ĐƯỢC. */
db.prepare("UPDATE chungCu SET noiDung = ? WHERE ma = ?")
  .run('Ngồi cùng nhà B BA buổi, chốt nếp học tối.', maCC);
const soi2 = await goi({fn:'soiChungCu', token:tkCoach, u:'coach@gita365.vn', ma:maCC});
bao(soi2.than.khop === false,
  'SỬA LÉN THẲNG VÀO BẢNG THÌ CHỮ KÝ KHÔNG KHỚP — kể cả người có quyền quản trị cơ sở dữ liệu',
  'lớp ký không ngăn được người ta sửa; nó làm cho việc sửa không giấu được');
db.prepare("UPDATE chungCu SET noiDung = ? WHERE ma = ?").run(BAN_CC.noiDung, maCC);
bao((await goi({fn:'soiChungCu', token:tkCoach, u:'coach@gita365.vn', ma:maCC})).than.khop === true,
  'trả nội dung về đúng cũ thì khớp lại — chữ ký đo NỘI DUNG, không đo lần sửa');

/* Đổi giờ cũng lộ y hệt. */
db.prepare("UPDATE chungCu SET gioMayChu = '2020-01-01T00:00:00.000Z' WHERE ma = ?").run(maCC);
bao((await goi({fn:'soiChungCu', token:tkCoach, u:'coach@gita365.vn', ma:maCC})).than.khop === false,
  'lùi dấu giờ cũng làm chữ ký lệch — giờ nằm TRONG chuỗi được ký');
db.prepare("UPDATE chungCu SET gioMayChu = ? WHERE ma = ?").run(kyCC.than.bienNhan.gioMayChu, maCC);

/* ── NGƯỜI GHI KHÔNG TỰ XÁC NHẬN CHO MÌNH ── */
bao(!(await goi({fn:'xacNhanChungCu', token:tkCoach, u:'coach@gita365.vn', ma:maCC})).than.ok,
  'NGƯỜI GHI KHÔNG TỰ XÁC NHẬN CHO MÌNH ĐƯỢC',
  'chỗ chống làm giả mạnh nhất của cả hệ — mạnh hơn mọi chữ ký');

const xn = await goi({fn:'xacNhanChungCu', token:tkSA, u:'superadmin@gita365.vn', ma:maCC});
bao(xn.than.ok, 'người KHÁC xác nhận thì được', xn.than.xacNhan.ai);
bao(!(await goi({fn:'xacNhanChungCu', token:tkDG, u:'danhgia@gita365.vn', ma:maCC})).than.ok,
  'xác nhận rồi thì người thứ hai không ghi đè lên được',
  'trên một bản ghi dựng lên để đứng được khi đối chất');
bao(db.prepare("SELECT xacNhanBoi FROM chungCu WHERE ma=?").get(maCC).xacNhanBoi
      === 'superadmin@gita365.vn',
  'và tên người xác nhận đầu tiên vẫn nguyên');

/* ── SAI THÌ ĐÍNH CHÍNH, KHÔNG SỬA, KHÔNG XOÁ ── */
const dc = await goi({fn:'kyChungCu', token:tkCoach, u:'coach@gita365.vn',
  cc:{...BAN_CC, noiDung:'Đính chính: một buổi, không phải ba.', dinhChinhCho:maCC}});
bao(dc.than.ok, 'ghi được bản đính chính trỏ về bản cũ');
bao(db.prepare("SELECT count(*) c FROM chungCu WHERE ma IN (?,?)").get(maCC, dc.than.bienNhan.ma).c === 2,
  'CẢ HAI BẢN CÙNG Ở LẠI — xoá bản sai là xoá luôn bằng chứng đã từng có bản sai',
  'đúng thứ bên đối tụng sẽ hỏi');
bao(!(await goi({fn:'kyChungCu', token:tkCoach, u:'coach@gita365.vn',
  cc:{...BAN_CC, dinhChinhCho:'CC-khong-co-that'}})).than.ok,
  'đính chính cho một bản không có thì từ chối');

/* Thiếu trường và nội dung quá dài. */
bao(!(await goi({fn:'kyChungCu', token:tkCoach, u:'coach@gita365.vn',
  cc:{nhiemVu:'NV-01'}})).than.ok, 'thiếu trường thì không ký');
bao(!(await goi({fn:'kyChungCu', token:tkCoach, u:'coach@gita365.vn',
  cc:{...BAN_CC, noiDung:'x'.repeat(4001)}})).than.ok, 'nội dung quá 4000 ký tự thì từ chối');

/* Mỗi lượt soi một dòng sổ — nền cũ không ghi chỗ này. */
bao(db.prepare("SELECT count(*) c FROM audit WHERE viec='CHUNGCU_SOI'").get().c >= 4,
  'mỗi lượt SOI một dòng sổ',
  'nội dung một bản chứng cứ là chuyện riêng của hai nhà; ai mở nó ra thì phải trả lời được');

/* Không có khoá ký thì KHÔNG ký bừa. */
const khongKhoa = await worker.fetch(new Request('https://gita.test/', {
  method:'POST', headers:{'Content-Type':'application/json'},
  body: JSON.stringify({fn:'kyChungCu', token:tkCoach, u:'coach@gita365.vn', cc:BAN_CC})
}), {...env, GITA_KHOA_KY: ''});
bao(khongKhoa.status === 500,
  'máy chủ CHƯA NẠP KHOÁ KÝ thì từ chối ký, không ký bằng một khoá rỗng',
  'ký bằng khoá rỗng là phát ra một biên nhận trông như thật mà không chứng được gì');

/* ═══════════════ 14 · TỆP KHÁCH HÀNG VÀ TÀI CHÍNH ═══════════════ */
console.log('\n14 · TỆP KHÁCH HÀNG');
db.prepare("DELETE FROM chanNhip").run();

/* Nhà đăng ký mới phải có TỆP ngay, không đợi lượt nâng tầng đầu tiên. */
const eMoi = 'nhatep@vidu.vn';
await goi({fn:'dangKy', hoSo:{...HOSO_MOI, email:eMoi, maGioiThieu:'GITA-0003'}});
const mTep = (thuCuoi().than.match(/là: (\d{6})/) || [])[1];
await goi({fn:'xacThucOtp', email:eMoi, ma:mTep});
const lkTep = (thuCuoi().than.match(/#kichhoat=([a-f0-9]+)/) || [])[1];
const khTep = await goi({fn:'kichHoat', token:lkTep, mk:'MotChuoiTuTe2026!'});
const nhaMoi = khTep.than.maKhachHang;
const tepDb = db.prepare("SELECT * FROM hoSoKhach WHERE maKhachHang = ?").get(nhaMoi);
bao(!!tepDb, 'kích hoạt xong là CÓ TỆP KHÁCH HÀNG ngay', nhaMoi);
bao(tepDb && tepDb.boTro === 'GITA-0003',
  'và tệp giữ MÃ NHÀ BẢO TRỢ — gốc của hoa hồng', tepDb && tepDb.boTro);
bao(tepDb && tepDb.tang === 0 && tepDb.trangThai === 'dangHoc',
  'mở ở tầng 0, trạng thái đang học');

/* Gia đình đọc được tệp CỦA MÌNH, không đọc được tệp nhà khác. */
const tkNhaMoi = (await goi({fn:'dangNhap', u:eMoi, mk:'MotChuoiTuTe2026!'})).than.token;
bao((await goi({fn:'xemTepKhach', token:tkNhaMoi, u:eMoi, maKhachHang:nhaMoi})).than.ok,
  'gia đình đọc được tệp của chính mình');
const tromTep = await goi({fn:'xemTepKhach', token:tkNhaMoi, u:eMoi, maKhachHang:'GITA-0003'});
bao(!tromTep.than.ok && tromTep.than.code === 'NOPERM',
  'nhưng KHÔNG đọc được tệp nhà khác',
  'tệp mang tên nhà, tên con, tên phụ huynh và tình hình tiền nong — gửi nhầm là gửi trọn cả bốn');

const tepSA = await goi({fn:'xemTepKhach', token:tkSA, u:'superadmin@gita365.vn', maKhachHang:nhaMoi});
bao(tepSA.than.ok && tepSA.than.tep.phuHuynh && tepSA.than.tep.hocVien,
  'đội ngũ đọc được, và tệp GỘP đủ bốn nguồn thành một bản',
  'phụ huynh · học viên · tệp · lịch sử tầng');
bao(tepSA.than.tep.phuHuynh.hoTen && !tepDb.hoTenPhuHuynh,
  'tên phụ huynh TRỎ về users, không chép vào bảng',
  'chép lại là dựng bản thứ hai của một sự thật, và hai bản sẽ có ngày lệch nhau');

/* Sửa được coach/tư vấn/băng — KHÔNG sửa được tầng. */
const suaOk = await goi({fn:'suaTepKhach', token:tkSA, u:'superadmin@gita365.vn',
  maKhachHang:nhaMoi, sua:{coach:'coach@gita365.vn', band:'VANG'}});
bao(suaOk.than.ok && suaOk.than.daSua === 2, 'sửa được coach và băng');
bao(!(await goi({fn:'suaTepKhach', token:tkSA, u:'superadmin@gita365.vn',
  maKhachHang:nhaMoi, sua:{band:'TIM'}})).than.ok, 'băng ngoài bốn màu thì từ chối');
const suaTang = await goi({fn:'suaTepKhach', token:tkSA, u:'superadmin@gita365.vn',
  maKhachHang:nhaMoi, sua:{tang:5, ghiChu:'thử'}});
bao(db.prepare("SELECT tang FROM hoSoKhach WHERE maKhachHang=?").get(nhaMoi).tang === 0 &&
    (suaTang.than.khongSuaDuoc||[]).indexOf('tang') >= 0,
  'TẦNG KHÔNG SỬA ĐƯỢC Ở ĐÂY, và trường bị chặn được NÓI RA',
  'cho sửa tầng ở đây là dựng một cửa sau đi vòng qua cổng KPI và cổng thanh toán');

console.log('\n14b · TÀI CHÍNH — PHẢI THU TÁCH KHỎI ĐÃ THU');
const {GIA_TANG, SUY_RA} = await import('../may-chu/tai-chinh.js');

/* NHÀ BẢO TRỢ PHẢI CÓ KPI THẬT thì hoa hồng mới sinh. Bản đầu của phép
   đo này quên bước ấy và đỏ ở mục hoa hồng — luật đúng, phép đo thiếu.
   Ghi lại vì đó cũng là điều kiện thật: kèm mà nếp nhà mình không đạt
   thì không có hoa hồng, dù nhà kia có vượt tầng. */
db.prepare("UPDATE students SET kpi = 90 WHERE id = " +
  "(SELECT maHocVien FROM hoSoKhach WHERE maKhachHang = 'GITA-0003')").run();

/* Nâng tầng thì DỰNG LỊCH THU của tầng mới. */
db.prepare("UPDATE students SET kpi = 85 WHERE id = (SELECT maHocVien FROM hoSoKhach WHERE maKhachHang=?)").run(nhaMoi);
db.prepare("INSERT INTO thanhToan (id,maKhachHang,tier,trangThai,daDung) VALUES ('TT-M1',?,1,'daXacNhan',0)").run(nhaMoi);
const lenT1 = await goi({fn:'nangTang', token:tkSA, u:'superadmin@gita365.vn',
  maHocVien: db.prepare("SELECT maHocVien FROM hoSoKhach WHERE maKhachHang=?").get(nhaMoi).maHocVien,
  tang:1, maKhachHang:nhaMoi});
bao(lenT1.than.ok && lenT1.than.soKyThu === 0,
  'TẦNG 1 GIÁ 0 THÌ KHÔNG SINH KỲ THU NÀO',
  'một dòng "phải thu 0 đồng" là một dòng công nợ giả, và nó làm mọi bản kê có rác');
bao(db.prepare("SELECT count(*) c FROM lichSuTang WHERE maKhachHang=?").get(nhaMoi).c === 1,
  'và ghi MỘT DÒNG LỊCH SỬ TẦNG — nền cũ chỉ đổi cột tier rồi thôi');

/* Lên tầng 3: BA kỳ, đúng nhịp bảng học phí khai. */
db.prepare("UPDATE students SET tier = 2, kpi = 85 WHERE id = (SELECT maHocVien FROM hoSoKhach WHERE maKhachHang=?)").run(nhaMoi);
db.prepare("UPDATE hoSoKhach SET tang = 2 WHERE maKhachHang = ?").run(nhaMoi);
db.prepare("INSERT INTO thanhToan (id,maKhachHang,tier,trangThai,daDung) VALUES ('TT-M3',?,3,'daXacNhan',0)").run(nhaMoi);
const lenT3 = await goi({fn:'nangTang', token:tkSA, u:'superadmin@gita365.vn',
  maHocVien: db.prepare("SELECT maHocVien FROM hoSoKhach WHERE maKhachHang=?").get(nhaMoi).maHocVien,
  tang:3, maKhachHang:nhaMoi});
bao(lenT3.than.ok && lenT3.than.soKyThu === 3,
  'TẦNG 3 SINH BA KỲ THU — đúng nhịp bảng học phí khai',
  'nền cũ chỉ có MỘT dòng đúng/sai cho cả tầng, nên hai kỳ sau biến mất khỏi sổ');
const kyT3 = db.prepare("SELECT * FROM kyThu WHERE maKhachHang=? AND tang=3 ORDER BY ky").all(nhaMoi);
bao(kyT3.map(x=>x.ngayThu).join(',') === '1,43,64',
  'ba kỳ rơi đúng ngày 1 · 43 · 64', kyT3.map(x=>x.ngayThu).join(' · '));
bao(kyT3.reduce((a,x)=>a+x.phaiThu,0) === GIA_TANG[3],
  'TỔNG BA KỲ ĐÚNG BẰNG GIÁ GÓI, không lệch đồng nào',
  'chia đều rồi làm tròn từng kỳ thì tổng lệch vài đồng, và một bản kê lệch vài đồng là một bản kê phải đi giải thích');
bao(kyT3[1].congTruoc && kyT3[0].congTruoc === null,
  'kỳ 2 và 3 khai CỔNG PHẢI NGHIỆM THU TRƯỚC, kỳ 1 thì không');

/* Dựng lịch hai lần không nhân đôi công nợ. */
const {dungLichThu} = await import('../may-chu/tai-chinh.js');
await dungLichThu(env.CSDL, nhaMoi, 3, new Date().toISOString());
bao(db.prepare("SELECT count(*) c FROM kyThu WHERE maKhachHang=? AND tang=3").get(nhaMoi).c === 3,
  'dựng lịch LẦN HAI không nhân đôi công nợ',
  'dựng hai lần là nhân đôi công nợ một nhà, và không ai nhìn ra cho tới lúc đối chiếu');

/* Phiếu thu: ghi → duyệt, và người ghi không tự duyệt. */
const gp = await goi({fn:'ghiPhieuThu', token:tkCoach, u:'coach@gita365.vn',
  phieu:{maKhachHang:nhaMoi, idKy:kyT3[0].id, soTien:kyT3[0].phaiThu,
         hinhThuc:'chuyenKhoan', maThamChieu:'FT26090100123'}});
bao(gp.than.ok && gp.than.trangThai === 'choDuyet', 'ghi được phiếu thu, trạng thái CHỜ DUYỆT');
bao(!(await goi({fn:'ghiPhieuThu', token:tkNhaMoi, u:eMoi,
  phieu:{maKhachHang:nhaMoi, soTien:1000, hinhThuc:'tienMat'}})).than.ok,
  'phụ huynh không ghi được phiếu thu');
bao(!(await goi({fn:'ghiPhieuThu', token:tkCoach, u:'coach@gita365.vn',
  phieu:{maKhachHang:nhaMoi, soTien:1000, hinhThuc:'bitcoin'}})).than.ok,
  'hình thức thu ngoài ba loại thì từ chối');

/* Công nợ TRƯỚC khi duyệt — phiếu chờ duyệt chưa trừ nợ. */
const cn1 = await goi({fn:'congNo', token:tkSA, u:'superadmin@gita365.vn', maKhachHang:nhaMoi});
bao(cn1.than.tongConNo === GIA_TANG[3],
  'PHIẾU CHỜ DUYỆT CHƯA TRỪ NỢ — chỉ tiền đã duyệt mới vào sổ',
  cn1.than.tongConNo + 'đ còn nợ');

bao(!(await goi({fn:'duyetPhieuThu', token:tkCoach, u:'coach@gita365.vn', id:gp.than.id})).than.ok,
  'người ghi phiếu KHÔNG TỰ DUYỆT phiếu của mình',
  'người ghi phiếu là người nói "đã nhận tiền"; tự duyệt luôn thì không có lớp nào đứng giữa lời nói và sổ sách');

const dp = await goi({fn:'duyetPhieuThu', token:tkSA, u:'superadmin@gita365.vn', id:gp.than.id});
bao(dp.than.ok, 'người KHÁC duyệt thì được');
bao(!(await goi({fn:'duyetPhieuThu', token:tkSA, u:'superadmin@gita365.vn', id:gp.than.id})).than.ok,
  'duyệt rồi thì không duyệt lại được');

const cn2 = await goi({fn:'congNo', token:tkSA, u:'superadmin@gita365.vn', maKhachHang:nhaMoi});
bao(cn2.than.tongDaThu === kyT3[0].phaiThu &&
    cn2.than.tongConNo === GIA_TANG[3] - kyT3[0].phaiThu,
  'duyệt rồi thì CÔNG NỢ = PHẢI THU − ĐÃ THU',
  'đã thu ' + cn2.than.tongDaThu + 'đ · còn nợ ' + cn2.than.tongConNo + 'đ');
bao(cn2.than.ke.length === 3 && cn2.than.ke[1].daThu === 0,
  'và KỲ CHƯA THU ĐỒNG NÀO VẪN CÓ TRONG BẢN KÊ',
  'lọc sau khi đọc về thì kỳ chưa thu là kỳ dễ rơi ra nhất — mà đó đúng là kỳ cần nhìn thấy');

/* Gia đình xem được công nợ của mình, không xem của nhà khác. */
bao((await goi({fn:'congNo', token:tkNhaMoi, u:eMoi, maKhachHang:nhaMoi})).than.ok &&
    !(await goi({fn:'congNo', token:tkNhaMoi, u:eMoi, maKhachHang:'GITA-0003'})).than.ok,
  'gia đình xem công nợ CỦA MÌNH, không xem của nhà khác');

/* Hoa hồng sinh khi nhà được kèm vượt tầng. */
const hhDb = db.prepare("SELECT * FROM hoaHongTra WHERE nhaDuocKem = ?").all(nhaMoi);
bao(hhDb.length >= 1, 'nhà có bảo trợ vượt tầng thì SINH HOA HỒNG cho nhà bảo trợ',
  hhDb.length + ' khoản');
const hhT3 = hhDb.filter(x => x.tangVuot === 3)[0];
bao(hhT3 && hhT3.goiCanCu === GIA_TANG[3] &&
    hhT3.soTien === Math.round(GIA_TANG[3] * hhT3.phanTram / 100),
  'tiền hoa hồng tính trên GÓI CỦA NHÀ ĐƯỢC KÈM',
  hhT3 && (hhT3.bac + ' · ' + hhT3.phanTram + '% · ' + hhT3.soTien + 'đ'));
bao(!hhDb.some(x => x.tangVuot === 1),
  'TẦNG 1 KHÔNG SINH HOA HỒNG — điều khoản, không phải phép nhân ra 0');
bao(hhDb.every(x => x.phanTram <= 10), 'không khoản nào vượt trần 10%');

/* Bản kê chỉ R01–R03. */
bao(!(await goi({fn:'banKeTaiChinh', token:tkCoach, u:'coach@gita365.vn'})).than.ok,
  'Coach không xem được bản kê tài chính — nó gộp tiền của cả hệ');
const bk = (await goi({fn:'banKeTaiChinh', token:tkSA, u:'superadmin@gita365.vn'})).than;
bao(bk.ok && bk.daThu.tien === kyT3[0].phaiThu && bk.hoaHongPhaiTra.so >= 1,
  'bản kê gộp đúng: đã thu, chờ duyệt, hoàn, hoa hồng phải trả',
  'đã thu ' + bk.daThu.tien + 'đ · hoa hồng phải trả ' + bk.hoaHongPhaiTra.tien + 'đ');
bao(bk.suyRa && bk.suyRa.length === SUY_RA.length,
  'và bản kê IN RA những chỗ tôi SUY RA chứ chủ hệ chưa khai',
  SUY_RA.map(x => x.ma).join(' · '));
bao(!('loiNhuan' in bk),
  'bản kê KHÔNG tự cộng ra một con số lợi nhuận',
  'chi phí vận hành không nằm trong hệ này, nên con số ấy sẽ sai và sẽ được ai đó mang đi họp');

/* ═══════════════ 15 · TÁM TÌNH HUỐNG TIỀN NONG NGOÀI ĐƯỜNG THẲNG ═══════════════

   Đường thẳng — dựng lịch, ghi phiếu, duyệt, xem nợ — là đường ÍT XẢY
   RA NHẤT. Mục này đo những đường còn lại. */
console.log('\n15 · TÁM TÌNH HUỐNG TIỀN NONG');

/* ── CỔNG: KỲ SAU CHỈ THU KHI KỲ TRƯỚC ĐÃ TRẢ ĐỦ ── */
const ky2 = kyT3[1], ky3 = kyT3[2];
const truocCong = await goi({fn:'ghiPhieuThu', token:tkCoach, u:'coach@gita365.vn',
  phieu:{maKhachHang:nhaMoi, idKy:ky3.id, soTien:ky3.phaiThu, hinhThuc:'chuyenKhoan'}});
bao(!truocCong.than.ok && truocCong.than.code === 'CONGTRUOC',
  'KHÔNG THU ĐƯỢC KỲ 3 KHI KỲ 2 CÒN THIẾU',
  'tới 9.88 cột congTruoc được GHI mà không được ĐỌC — luật nằm trong dữ liệu như một lời chú thích');

/* ── KHÔNG THU THỪA VÀO MỘT KỲ ── */
const thua = await goi({fn:'ghiPhieuThu', token:tkCoach, u:'coach@gita365.vn',
  phieu:{maKhachHang:nhaMoi, idKy:ky2.id, soTien:ky2.phaiThu + 1000, hinhThuc:'tienMat'}});
bao(!thua.than.ok && thua.than.code === 'THUTHUA',
  'thu THỪA vào một kỳ thì từ chối, và nói còn thiếu bao nhiêu', thua.than.error);

/* ── HUỶ MỘT PHIẾU ĐÃ DUYỆT ── */
const noTruocHuy = (await goi({fn:'congNo', token:tkSA, u:'superadmin@gita365.vn',
  maKhachHang:nhaMoi})).than.tongConNo;
bao(!(await goi({fn:'huyPhieuThu', token:tkSA, u:'superadmin@gita365.vn',
  id:gp.than.id})).than.ok, 'huỷ mà KHÔNG NÓI LÝ DO thì từ chối');
const huy = await goi({fn:'huyPhieuThu', token:tkSA, u:'superadmin@gita365.vn',
  id:gp.than.id, lyDo:'Ngân hàng hoàn giao dịch FT26090100123'});
bao(huy.than.ok, 'huỷ được phiếu đã duyệt, có lý do');
bao(db.prepare("SELECT trangThai FROM phieuThu WHERE id=?").get(gp.than.id).trangThai === 'huy',
  'HUỶ LÀ ĐÁNH DẤU, dòng vẫn còn',
  'xoá là xoá luôn bằng chứng tiền đã từng được ghi nhận và đã từng được duyệt');
const noSauHuy = (await goi({fn:'congNo', token:tkSA, u:'superadmin@gita365.vn',
  maKhachHang:nhaMoi})).than.tongConNo;
bao(noSauHuy === noTruocHuy + gp.than_soTien_bo || noSauHuy > noTruocHuy,
  'và CÔNG NỢ TỰ ĐÚNG LẠI ngay',
  'số dư luôn được TÍNH, không được GIỮ, nên nó không bao giờ lệch với chứng từ');

/* ── KHOẢN THU NGOÀI LỊCH, GÁN VÀO KỲ SAU ── */
const ngoai = await goi({fn:'ghiPhieuThu', token:tkCoach, u:'coach@gita365.vn',
  phieu:{maKhachHang:nhaMoi, soTien:kyT3[0].phaiThu, hinhThuc:'chuyenKhoan',
         ghiChu:'khách chuyển trước khi có kỳ'}});
await goi({fn:'duyetPhieuThu', token:tkSA, u:'superadmin@gita365.vn', id:ngoai.than.id});
bao(db.prepare("SELECT idKy FROM phieuThu WHERE id=?").get(ngoai.than.id).idKy === null,
  'ghi được KHOẢN THU NGOÀI LỊCH — khách chuyển trước khi có kỳ');
const gan = await goi({fn:'ganPhieuVaoKy', token:tkSA, u:'superadmin@gita365.vn',
  id:ngoai.than.id, idKy:kyT3[0].id});
bao(gan.than.ok, 'gán được vào một kỳ về sau',
  'không có đường gán thì tiền nằm trong sổ mà không trừ nợ của ai');
bao(!(await goi({fn:'ganPhieuVaoKy', token:tkSA, u:'superadmin@gita365.vn',
  id:ngoai.than.id, idKy:ky2.id})).than.ok, 'gán rồi thì không gán lại sang kỳ khác');

/* ── HOÀN TIỀN ── */
const hoanThieuLuat = await goi({fn:'deXuatHoan', token:tkCoach, u:'coach@gita365.vn',
  hoan:{maKhachHang:nhaMoi, soTien:1000000, theoLuat:'vì khách đòi', lyDo:'x'}});
bao(!hoanThieuLuat.than.ok,
  'đề xuất hoàn mà KHÔNG NÊU LUẬT HOÀN thì từ chối',
  'một lượt hoàn không nêu luật là một lượt hoàn không đứng được khi có người hỏi');

const LUAT_T3 = 'Mỗi chuỗi 21 ngày là một đơn vị. Dừng giữa chuỗi thì chuỗi đó ' +
  'không hoàn; các chuỗi chưa bắt đầu thì hoàn đủ.';
const quaHoan = await goi({fn:'deXuatHoan', token:tkCoach, u:'coach@gita365.vn',
  hoan:{maKhachHang:nhaMoi, soTien:99000000, theoLuat:LUAT_T3, lyDo:'gia đình dừng'}});
bao(!quaHoan.than.ok && quaHoan.than.code === 'QUAHOAN',
  'KHÔNG HOÀN QUÁ SỐ ĐÃ THU', 'một sổ hoàn nhiều hơn thu là một sổ có tiền chảy ra từ hư không');

const dxHoan = await goi({fn:'deXuatHoan', token:tkCoach, u:'coach@gita365.vn',
  hoan:{maKhachHang:nhaMoi, soTien:1000000, theoLuat:LUAT_T3, lyDo:'gia đình dừng sau chuỗi 1'}});
bao(dxHoan.than.ok, 'đề xuất hoàn đúng luật thì được', dinhDangVN(dxHoan.than.conHoanDuoc));
bao(!(await goi({fn:'duyetHoan', token:tkCoach, u:'coach@gita365.vn',
  id:dxHoan.than.id})).than.ok, 'người ĐỀ XUẤT không tự duyệt hoàn được');

const hhTruoc = db.prepare("SELECT count(*) c FROM hoaHongTra WHERE nhaDuocKem=? AND trangThai='phaiTra'").get(nhaMoi).c;
const dHoan = await goi({fn:'duyetHoan', token:tkSA, u:'superadmin@gita365.vn', id:dxHoan.than.id});
bao(dHoan.than.ok, 'người khác duyệt thì được');
bao(hhTruoc > 0 && db.prepare("SELECT count(*) c FROM hoaHongTra WHERE nhaDuocKem=? AND trangThai='phaiTra'").get(nhaMoi).c === 0,
  'HOÀN TIỀN RỒI THÌ HOA HỒNG CHƯA TRẢ BỊ HUỶ THEO',
  'hoa hồng tính trên GÓI của nhà được kèm; gói ấy không còn nguyên thì khoản dựa trên nó cũng vậy');
bao(db.prepare("SELECT count(*) c FROM hoaHongTra WHERE trangThai='huy'").get().c > 0,
  'và khoản bị huỷ vẫn còn dòng, có lý do');

/* ── TRẢ HOA HỒNG: PHẢI CÓ CHỨNG CỨ ĐÃ XÁC NHẬN ──

   Trả khoản vừa bị huỷ ở trên về 'phaiTra' để thử tiếp đường trả.
   PHẢI XOÁ LUÔN huyLuc: trạng thái và mốc là hai nửa của cùng một sự
   thật, và để lại một mốc huỷ trên một dòng chưa huỷ là dựng một dòng
   không tả được — sổ hoa hồng đọc mốc chứ không đọc trạng thái, nên
   khoản ấy vừa bị trừ ở dòng huỷ vừa biến khỏi số dư cuối kỳ, và đẳng
   thức lệch đúng một lần số tiền ấy. Đúng chỗ này đã đỏ thật khi phép
   đo cân đối quý đang chạy được thêm vào. */
db.prepare("UPDATE hoaHongTra SET trangThai='phaiTra', huyLuc=NULL WHERE nhaDuocKem=?")
  .run(nhaMoi);
const hhId = db.prepare("SELECT id FROM hoaHongTra WHERE nhaDuocKem=? LIMIT 1").get(nhaMoi).id;
bao(!(await goi({fn:'traHoaHong', token:tkSA, u:'superadmin@gita365.vn', id:hhId})).than.ok,
  'CHƯA GẮN CHỨNG CỨ thì chưa trả hoa hồng',
  'bảng chứng cứ dựng ra để đứng được khi đối chất; tiền vẫn ra được khi chưa ai xác nhận thì bảng ấy chỉ là thủ tục');

const ccChuaXac = await goi({fn:'kyChungCu', token:tkCoach, u:'coach@gita365.vn',
  cc:{nhiemVu:'NV-02', ngayLam:'2026-09-02', loai:'kem', noiDung:'Buổi kèm nhà mới.'}});
await goi({fn:'ganChungCuHoaHong', token:tkSA, u:'superadmin@gita365.vn',
  id:hhId, maChungCu:ccChuaXac.than.bienNhan.ma});
bao(!(await goi({fn:'traHoaHong', token:tkSA, u:'superadmin@gita365.vn', id:hhId})).than.ok,
  'gắn chứng cứ CHƯA ĐƯỢC XÁC NHẬN thì vẫn chưa trả');
await goi({fn:'xacNhanChungCu', token:tkSA, u:'superadmin@gita365.vn',
  ma:ccChuaXac.than.bienNhan.ma});
const traHH = await goi({fn:'traHoaHong', token:tkSA, u:'superadmin@gita365.vn', id:hhId});
bao(traHH.than.ok, 'xác nhận rồi thì trả được', dinhDangVN(traHH.than.soTien));
bao(!(await goi({fn:'traHoaHong', token:tkSA, u:'superadmin@gita365.vn', id:hhId})).than.ok,
  'trả rồi thì không trả lại lần hai — tiền đã ra thì không gọi về được');

/* ── ĐÓNG KỲ CHƯA TỚI HẠN KHI NHÀ NGHỈ ── */
const truocDong = db.prepare("SELECT count(*) c FROM kyThu WHERE maKhachHang=?").get(nhaMoi).c;
const dongKy = await goi({fn:'dongKyChuaToi', token:tkSA, u:'superadmin@gita365.vn',
  maKhachHang:nhaMoi, lyDo:'gia đình xin nghỉ từ 06/09'});
bao(dongKy.than.ok && dongKy.than.daDong > 0,
  'đóng được kỳ CHƯA TỚI HẠN khi nhà nghỉ', dongKy.than.daDong + '/' + truocDong + ' kỳ');
bao(db.prepare("SELECT count(*) c FROM kyThu WHERE maKhachHang=? AND id IN " +
  "(SELECT idKy FROM phieuThu WHERE idKy IS NOT NULL AND trangThai='daDuyet')").get(nhaMoi).c > 0,
  'nhưng KỲ ĐÃ THU MỘT PHẦN THÌ GIỮ NGUYÊN',
  'phần ấy đi qua đường hoàn tiền, nơi có luật hoàn và có người duyệt');

/* ── DANH SÁCH QUÁ HẠN TOÀN HỆ ── */
bao(!(await goi({fn:'dsQuaHan', token:tkCoach, u:'coach@gita365.vn'})).than.ok,
  'Coach không xem được danh sách quá hạn của cả hệ');
const qh = await goi({fn:'dsQuaHan', token:tkSA, u:'superadmin@gita365.vn'});
bao(qh.than.ok && typeof qh.than.tongConNo === 'number',
  'người tài chính hỏi ngược được: HÔM NAY NHỮNG NHÀ NÀO QUÁ HẠN',
  qh.than.so + ' kỳ · ' + dinhDangVN(qh.than.tongConNo));

/* ── ĐỐI SOÁT ── */
bao(!(await goi({fn:'doiSoat', token:tkCoach, u:'coach@gita365.vn'})).than.ok,
  'Coach không chạy được đối soát');
const ds1 = await goi({fn:'doiSoat', token:tkSA, u:'superadmin@gita365.vn'});
bao(ds1.than.ok, 'đối soát chạy được', ds1.than.sach ? 'sổ sạch' : ds1.than.soLech + ' chỗ lệch');

/* PHÉP ĐỐI SOÁT TỰ CHỨNG MINH CHƯA CÂM: dựng một chỗ lệch có thật rồi
   đòi nó nêu ra. Một phép đối soát chưa từng đỏ thì chưa phải đối soát. */
db.prepare("INSERT INTO kyThu (id,maKhachHang,tang,ky,soKy,ngayThu,phaiThu,taoLuc) " +
  "VALUES ('KT-MOCOI','GITA-KHONG-CO-THAT',3,1,1,1,1000,?)").run(new Date().toISOString());
const ds2 = await goi({fn:'doiSoat', token:tkSA, u:'superadmin@gita365.vn'});
bao(!ds2.than.sach && ds2.than.lech.some(x => x.ma === 'DS-2'),
  'dựng một kỳ thu treo cho nhà không có tệp → ĐỐI SOÁT NÊU RA',
  ds2.than.lech.map(x => x.ma).join(' · '));
/* Gỡ chỗ lệch đi thì phải THÔI NÊU. Đo bằng SỐ chỗ lệch DS-2 trước và
   sau, không đòi DS-2 biến mất hẳn: đòi biến mất hẳn là gắn phép đo này
   vào việc cả sổ thử phải sạch DS-2 — hôm nào một mục khác dựng thêm
   một nhà treo thì phép đo này đỏ vì lý do của mục ấy, chứ không phải
   vì đối soát sai. */
const soTruoc = (ds2.than.lech.find(x => x.ma === 'DS-2') || {so: 0}).so;
db.prepare("DELETE FROM kyThu WHERE id='KT-MOCOI'").run();
const ds3 = await goi({fn:'doiSoat', token:tkSA, u:'superadmin@gita365.vn'});
const soSau = (ds3.than.lech.find(x => x.ma === 'DS-2') || {so: 0}).so;
bao(soSau === soTruoc - 1,
  'gỡ chỗ lệch đi thì đối soát thôi nêu nó',
  'DS-2: ' + soTruoc + ' → ' + soSau);
bao(ds2.than.vi.indexOf('KHÔNG SỬA GÌ') >= 0,
  'và đối soát KHÔNG SỬA GÌ — chỉ nêu ra',
  'mỗi chỗ lệch có một câu chuyện riêng, và máy không biết câu chuyện ấy');

/* ═══════════════ 15b · BỐN NHỊP BÁO CÁO ═══════════════

   Thu theo NGÀY · chốt theo TUẦN · tổng hợp THÁNG–QUÝ để đổi chiến
   lược · kế toán theo QUÝ và NĂM, trọn tới mức khai thuế được.

   Dữ liệu thử ở đây dựng bằng MỐC CỐ ĐỊNH trong quá khứ, không dùng
   "bây giờ": một bộ thử phụ thuộc vào giờ chạy là một bộ thử xanh ban
   ngày và đỏ lúc nửa đêm. */
console.log('\n15b · BỐN NHỊP BÁO CÁO');

const bc = await import('../may-chu/bao-cao.js');

/* ── MÚI GIỜ: CHỖ TIỀN RƠI NHẦM TUẦN ──

   6 giờ 30 sáng THỨ HAI giờ Việt Nam có mốc UTC là 23 giờ 30 CHỦ NHẬT.
   Cắt tuần theo UTC thì khoản ấy rơi vào tuần TRƯỚC — một tuần có thể
   đã chốt rồi. Mỗi tuần có một khoảng bảy tiếng như thế, và nó rơi
   đúng vào giờ người ta hay chuyển khoản nhất. */
const sangThuHai = '2026-03-01T23:30:00.000Z';        /* = 06:30 T2 02/03 giờ VN */
const tuanCuaNo  = bc.dungKy('tuan', '2026-03-02');
bao(tuanCuaNo.ky === '2026-W10' &&
    sangThuHai >= tuanCuaNo.tuLuc && sangThuHai <= tuanCuaNo.denLuc,
  'TIỀN VÀO 6H30 SÁNG THỨ HAI GIỜ VIỆT NAM RƠI ĐÚNG TUẦN ẤY — không rơi về tuần trước',
  'mốc UTC của nó là 23h30 Chủ nhật; cắt tuần theo UTC là sai bảy tiếng mỗi tuần');

/* Tuần ISO: tuần chứa Thứ Năm quyết định năm của tuần. 01/01/2027 là
   Thứ Sáu, nên tuần ấy thuộc về 2026 chứ không phải tuần 1 của 2027. */
bao(bc.dungKy('tuan', '2027-01-01').ky === '2026-W53',
  'tuần ISO bắc qua giao thừa thuộc về năm CŨ — tuần chứa Thứ Năm quyết định năm',
  bc.dungKy('tuan', '2027-01-01').ky);
bao(bc.dungKy('quy', '2026-08-15').ky === '2026-Q3' &&
    bc.dungKy('quy', '2026-08-15').denNgay === '2026-09-30',
  'quý dựng đúng từ một ngày bất kỳ trong quý');

/* ── DỰNG MỘT TUẦN CÓ THẬT ĐỂ CHỐT ──
   Tuần 2026-W10: Thứ Hai 02/03 → Chủ nhật 08/03, giờ Việt Nam. */
const W = bc.dungKy('tuan', '2026-03-02');
db.prepare("INSERT INTO hoSoKhach (maKhachHang,uidPhuHuynh,tang,trangThai,vaoLuc,suaLuc) " +
  "VALUES ('GITA-BC01','U-nhaA',3,'dangHoc',?,?)").run(W.tuLuc, W.tuLuc);
db.prepare("INSERT INTO kyThu (id,maKhachHang,tang,ky,soKy,ngayThu,phaiThu,hanLuc,taoLuc) " +
  "VALUES ('KT-BC01','GITA-BC01',3,1,3,1,1000000,?,?)").run(W.tuLuc, W.tuLuc);
db.prepare("INSERT INTO phieuThu (id,maKhachHang,idKy,soTien,hinhThuc,nguoiGhi,ghiLuc," +
  "nguoiDuyet,duyetLuc,trangThai) VALUES ('PT-BC01','GITA-BC01','KT-BC01',600000," +
  "'chuyenKhoan','tuvan@gita365.vn',?,'superadmin@gita365.vn',?,'daDuyet')")
  .run(sangThuHai, sangThuHai);
db.prepare("INSERT INTO phieuThu (id,maKhachHang,idKy,soTien,hinhThuc,nguoiGhi,ghiLuc," +
  "nguoiDuyet,duyetLuc,trangThai) VALUES ('PT-BC02','GITA-BC01','KT-BC01',400000," +
  "'tienMat','tuvan@gita365.vn',?,'superadmin@gita365.vn',?,'daDuyet')")
  .run('2026-03-05T03:00:00.000Z', '2026-03-05T03:00:00.000Z');

/* HAI CHỖ LÀM CHO ĐẲNG THỨC CÔNG NỢ CÓ THỂ SAI.

   Không có hai dòng này thì tiền thực thu tình cờ bằng tiền thu vào kỳ,
   và phép đo "báo cáo kế toán cân" xanh với CẢ công thức đúng lẫn công
   thức sai — tức là một phép đo câm. Thử phá đã bắt được đúng chỗ ấy.

     · PT-BC03 — khách chuyển 250.000đ KHÔNG GẮN KỲ NÀO. Tiền đã vào
       sổ nhưng chưa trừ nợ của ai.
     · PT-BC04 — nộp trước từ tháng 12/2025 cho một kỳ mãi tháng 3/2026
       mới tới hạn. Nằm ngoài "thu trong kỳ" nhưng vẫn làm giảm công nợ
       cuối kỳ. */
db.prepare("INSERT INTO phieuThu (id,maKhachHang,soTien,hinhThuc,nguoiGhi,ghiLuc," +
  "nguoiDuyet,duyetLuc,trangThai) VALUES ('PT-BC03','GITA-BC01',250000," +
  "'chuyenKhoan','tuvan@gita365.vn',?,'superadmin@gita365.vn',?,'daDuyet')")
  .run('2026-03-06T04:00:00.000Z', '2026-03-06T04:00:00.000Z');

db.prepare("INSERT INTO kyThu (id,maKhachHang,tang,ky,soKy,ngayThu,phaiThu,hanLuc,taoLuc) " +
  "VALUES ('KT-BC02','GITA-BC01',3,2,3,43,500000,?,?)")
  .run('2026-03-04T02:00:00.000Z', '2025-12-01T00:00:00.000Z');
db.prepare("INSERT INTO phieuThu (id,maKhachHang,idKy,soTien,hinhThuc,nguoiGhi,ghiLuc," +
  "nguoiDuyet,duyetLuc,trangThai) VALUES ('PT-BC04','GITA-BC01','KT-BC02',500000," +
  "'chuyenKhoan','tuvan@gita365.vn',?,'superadmin@gita365.vn',?,'daDuyet')")
  .run('2025-12-20T02:00:00.000Z', '2025-12-20T02:00:00.000Z');

/* ── 1 · THU THEO NGÀY ── */
bao(!(await goi({fn:'soNgay', token:tkCoach, u:'coach@gita365.vn', ngay:'2026-03-02'})).than.ok,
  'Coach không mở được sổ thu theo ngày của cả hệ');
const ng = await goi({fn:'soNgay', token:tkSA, u:'superadmin@gita365.vn', ngay:'2026-03-02'});
bao(ng.than.ok && ng.than.daThu === 600000 && ng.than.thuocTuan === '2026-W10',
  'sổ thu theo NGÀY khớp từng phiếu — 600.000đ ngày 02/03, thuộc tuần 2026-W10');
bao(ng.than.theoHinhThuc.chuyenKhoan === 600000 && !ng.than.theoHinhThuc.tienMat,
  'và CHIA THEO HÌNH THỨC — tiền mặt đếm ở két, chuyển khoản khớp sao kê',
  'gộp chung một số là bỏ mất phép đối chiếu duy nhất của thủ quỹ');

/* ── 2 · CHỐT TUẦN ── */
bao(!(await goi({fn:'chotTuan', token:tkCoach, u:'coach@gita365.vn', ngay:'2026-03-02'})).than.ok,
  'Coach không chốt được sổ');

const chuaHet = await goi({fn:'chotTuan', token:tkSA, u:'superadmin@gita365.vn',
  ngay: new Date().toISOString().slice(0, 10)});
bao(!chuaHet.than.ok && chuaHet.than.code === 'CHUAHET',
  'KHÔNG CHỐT ĐƯỢC MỘT TUẦN CHƯA HẾT — chốt giữa tuần là ghi một con số rồi tuần ấy vẫn còn ngày để tiền vào',
  chuaHet.than.error);

const ch = await goi({fn:'chotTuan', token:tkSA, u:'superadmin@gita365.vn', ngay:'2026-03-02'});
bao(ch.than.ok && ch.than.ky === '2026-W10' && ch.than.thu === 1250000 &&
    ch.than.ghiNhan === 1500000 && ch.than.vanTay.length === 64,
  'chốt tuần 2026-W10 — thu 1.250.000đ · ghi nhận 1.500.000đ · có vân tay',
  ch.than.vanTay.slice(0, 16) + '…');

const lai2 = await goi({fn:'chotTuan', token:tkSA, u:'superadmin@gita365.vn', ngay:'2026-03-02'});
bao(!lai2.than.ok && lai2.than.code === 'DACHOT', 'chốt rồi thì không chốt đè lên');
bao(!(await goi({fn:'chotTuan', token:tkSA, u:'superadmin@gita365.vn',
  ngay:'2026-03-02', chotLai:true})).than.ok,
  'CHỐT LẠI PHẢI CÓ LÝ DO — không có vết thì "đã chốt" chỉ có nghĩa tới lần chốt lại sau');

/* ── 3 · SOÁT CHỐT: VÂN TAY LÀ DẤU CỦA TẬP DÒNG ── */
const sc1 = await goi({fn:'soatChot', token:tkSA, u:'superadmin@gita365.vn'});
bao(sc1.than.ok && sc1.than.sach, 'chốt xong soát ngay thì sạch');

/* Huỷ một phiếu NẰM TRONG tuần đã chốt. Sổ tuần ấy phải GIỮ NGUYÊN, và
   khoản giảm phải hiện ra thành một bút toán điều chỉnh. */
const huyTrongChot = await goi({fn:'huyPhieuThu', token:tkSA, u:'superadmin@gita365.vn',
  id:'PT-BC02', lyDo:'Ngân hàng báo hoàn giao dịch'});
bao(huyTrongChot.than.ok && huyTrongChot.than.dieuChinh &&
    huyTrongChot.than.dieuChinh.kyBiAnhHuong === '2026-W10',
  'HUỶ MỘT PHIẾU TRONG TUẦN ĐÃ CHỐT SINH RA BÚT TOÁN ĐIỀU CHỈNH — sổ đã đóng thì không sửa, khoản giảm rơi vào kỳ đang mở',
  'trỏ ngược về ' + (huyTrongChot.than.dieuChinh || {}).kyBiAnhHuong);

bao(Number(db.prepare("SELECT thu FROM soChot WHERE ky='2026-W10'").get().thu) === 1250000,
  'và SỐ ĐÃ CHỐT KHÔNG ĐỔI — bản in tháng trước với bản in lại tháng sau phải ra cùng một số');

const sc2 = await goi({fn:'soatChot', token:tkSA, u:'superadmin@gita365.vn'});
const l10 = (sc2.than.lech || []).find(x => x.ky === '2026-W10');
bao(!sc2.than.sach && l10 && l10.chenh === -400000,
  'SOÁT CHỐT NÊU RA tuần đã động sau khi chốt — chênh 400.000đ',
  'vân tay là dấu của TẬP DÒNG, không phải của con số tổng');
bao(l10 && l10.daGiaiThich && l10.soButToanDieuChinh === 1,
  'và nêu KÈM rằng chỗ động ấy ĐÃ CÓ BÚT TOÁN GIẢI THÍCH — một chỗ đã có người xử lý, không phải một chỗ chưa ai biết');

/* ── 4 · TỔNG HỢP THÁNG · QUÝ ĐỂ ĐỔI CHIẾN LƯỢC ── */
bao(!(await goi({fn:'tongHop', token:tkCoach, u:'coach@gita365.vn',
  loai:'thang', moc:'2026-03'})).than.ok, 'Coach không xem được bản tổng hợp');
const thg = await goi({fn:'tongHop', token:tkSA, u:'superadmin@gita365.vn',
  loai:'thang', moc:'2026-03'});
bao(thg.than.ok && thg.than.ky === '2026-03' && thg.than.soVoi === '2026-02',
  'bản tổng hợp LUÔN CÓ KỲ TRƯỚC ĐỂ SO — một con số đứng một mình không đổi được chiến lược của ai',
  thg.than.ky + ' so với ' + thg.than.soVoi);
bao(thg.than.tyLeThu.nay !== undefined && Array.isArray(thg.than.theoTang) &&
    Array.isArray(thg.than.theoNguoiKem),
  'và cắt theo TẦNG và theo NGƯỜI KÈM — tổng đi xuống thì câu hỏi tiếp theo luôn là "xuống ở đâu"',
  'tỷ lệ thu ' + thg.than.tyLeThu.nay + '%');
const q1 = await goi({fn:'tongHop', token:tkSA, u:'superadmin@gita365.vn',
  loai:'quy', moc:'2026-Q1'});
bao(q1.than.ok && q1.than.soVoi === '2025-Q4', 'tổng hợp theo QUÝ so ngược sang quý trước');

/* ── 5 · BÁO CÁO KẾ TOÁN PHẢI CÂN ── */
const ktq = await goi({fn:'baoCaoKeToan', token:tkSA, u:'superadmin@gita365.vn',
  loai:'quy', moc:'2026-Q1'});
bao(ktq.than.ok && ktq.than.canDoi.can,
  'BÁO CÁO KẾ TOÁN CÂN — đầu kỳ + phát sinh − thu vào kỳ − thu trước nay tới hạn = cuối kỳ',
  'lệch công nợ ' + ktq.than.canDoi.lechCongNo + ' · lệch hoa hồng ' + ktq.than.canDoi.lechHoaHong);
/* Bản này chạy SAU lượt huỷ PT-BC02 ở trên, nên tiền thực thu là
   850.000đ chứ không phải 1.250.000đ — còn doanh thu ghi nhận vẫn
   nguyên 1.500.000đ, vì huỷ một phiếu không xoá kỳ thu nào. */
bao(ktq.than.A_doanhThu.ghiNhanTrongKy === 1500000 && ktq.than.B_tienMat.thucThu === 850000,
  'HAI CON SỐ, KHÔNG PHẢI MỘT — doanh thu ghi nhận 1.500.000đ, tiền thực thu 850.000đ',
  'hiệu của chúng chính là công nợ; nền cũ chỉ có con số thứ hai');

/* Hai khoản này là chỗ đẳng thức công nợ có thể sai, nên phải hiện
   thành số trên mặt bản chứ không nằm im trong phép tính. */
bao(ktq.than.C_congNo.thuChuaGanKy === 250000 &&
    ktq.than.C_congNo.thuTruocNayToiHan === 500000,
  'và NÊU RIÊNG hai khoản làm lệch: 250.000đ chưa gắn kỳ · 500.000đ nộp trước nay tới hạn',
  'tiền đã vào sổ mà chưa trừ nợ của ai là một việc phải làm, không phải một con số để ngắm');
/* Từ 9.91 hệ có cả hai nửa nên phép trừ chạy được — nhưng kết quả của
   nó KHÔNG được gọi là lợi nhuận, và bản kê phải tự nói ra vì sao. */
bao(ktq.than.G_chenhLechThuChi.khongPhaiLoiNhuan === true &&
    ktq.than.G_chenhLechThuChi.thieuNhungGi.length >= 3 &&
    typeof ktq.than.G_chenhLechThuChi.chenhLech === 'number',
  'CÓ CHÊNH LỆCH THU CHI NHƯNG KHÔNG GỌI LÀ LỢI NHUẬN — doanh thu ghi dồn tích, chi phí ghi tiền ra, hai cơ sở khác nhau',
  'và bản kê tự kê ra bốn thứ nó còn thiếu, thay vì để người đọc tự đoán');
/* BÚT TOÁN ĐIỀU CHỈNH RƠI VÀO KỲ ĐANG MỞ, KHÔNG VÀO KỲ BỊ ẢNH HƯỞNG.

   Phiếu thuộc quý I; huỷ nó hôm nay thì khoản giảm thuộc về quý ĐANG
   CHẠY, có trỏ ngược về tuần 2026-W10. Quý I giữ nguyên con số cũ —
   đó chính là điều làm cho một kỳ đã chốt có nghĩa. */
bao(ktq.than.E_butToanDieuChinh.so === 0,
  'quý ĐÃ QUA không nhận thêm bút toán nào — kỳ đã đóng là đã đóng');
const ktNay = await goi({fn:'baoCaoKeToan', token:tkSA, u:'superadmin@gita365.vn',
  loai:'quy', moc:new Date().toISOString().slice(0, 10)});
const e = ktNay.than.E_butToanDieuChinh;
bao(e.so === 1 && e.tien === -400000 && e.chiTiet[0].kyBiAnhHuong === '2026-W10',
  'BÚT TOÁN RƠI VÀO KỲ ĐANG MỞ, TRỎ NGƯỢC VỀ KỲ BỊ ẢNH HƯỞNG — nêu RIÊNG, không cộng lẫn vào doanh thu phát sinh',
  'quý đang chạy · −400.000đ · thuộc về ' + e.chiTiet[0].kyBiAnhHuong);

/* ── ĐẲNG THỨC HOA HỒNG PHẢI BỊ THỬ BẰNG MỘT LƯỢT HUỶ THẬT ──

   Đẳng thức "phải trả đầu kỳ + sinh − đã trả − huỷ = phải trả cuối kỳ"
   xanh suốt cho tới đây chỉ vì trong kỳ chưa có khoản nào bị huỷ. Một
   đẳng thức chưa từng bị thử thì chưa phải đẳng thức — thử phá đã bắt
   đúng chỗ này: gỡ cột huyLuc đi mà không phép đo nào đỏ.

   Nên dựng một lượt huỷ THẬT, đi qua đúng đường thật: hoàn tiền cho
   nhà được kèm thì hoa hồng chưa trả của nhà bảo trợ bị huỷ theo. */
db.prepare("INSERT INTO hoaHongTra (id,nhaKem,nhaDuocKem,tangVuot,bac,phanTram," +
  "goiCanCu,soTien,trangThai,sinhLuc) VALUES ('HH-BC01','GITA-9001','GITA-BC01',3," +
  "'B5',5,6000000,300000,'phaiTra',?)").run(new Date().toISOString());

/* Và một khoản SINH TỪ QUÝ I, còn nguyên tới hết quý I, mãi hôm nay
   mới bị huỷ. Đây mới là chỗ cột huyLuc thật sự cần thiết: bản báo cáo
   quý I chạy hôm nay phải nói đúng số dư CỦA LÚC ẤY, không được đổi
   theo một lượt huỷ xảy ra sau đó ba quý.

   Đọc trạng thái hôm nay rồi suy ngược là cách làm cho sổ của mọi kỳ
   quá khứ đổi theo mỗi thao tác hôm nay — và lúc ấy không bản báo cáo
   nào dựng lại được. */
db.prepare("INSERT INTO hoaHongTra (id,nhaKem,nhaDuocKem,tangVuot,bac,phanTram," +
  "goiCanCu,soTien,trangThai,sinhLuc) VALUES ('HH-BC02','GITA-9002','GITA-BC01',2," +
  "'B5',5,4000000,200000,'phaiTra','2026-03-03T02:00:00.000Z')").run();

const dxBC = await goi({fn:'deXuatHoan', token:tkCoach, u:'coach@gita365.vn',
  hoan:{maKhachHang:'GITA-BC01', soTien:100000, idPhieuThu:'PT-BC01',
    theoLuat:'T3 chuỗi chưa bắt đầu thì hoàn đủ', lyDo:'Gia đình chuyển nơi ở'}});
const dyBC = await goi({fn:'duyetHoan', token:tkSA, u:'superadmin@gita365.vn',
  id:dxBC.than.id});
bao(dxBC.than.ok && dyBC.than.ok, 'dựng một lượt hoàn thật cho nhà có hoa hồng chưa trả');
bao(db.prepare("SELECT trangThai, huyLuc FROM hoaHongTra WHERE id='HH-BC01'").get()
      .trangThai === 'huy' &&
    !!db.prepare("SELECT huyLuc FROM hoaHongTra WHERE id='HH-BC01'").get().huyLuc,
  'khoản hoa hồng bị huỷ theo, VÀ CÓ MỐC HUỶ — trạng thái và mốc là hai nửa của một sự thật');

const ktCan = await goi({fn:'baoCaoKeToan', token:tkSA, u:'superadmin@gita365.vn',
  loai:'quy', moc:new Date().toISOString().slice(0, 10)});
bao(ktCan.than.D_hoaHong.soHuy === 2 && ktCan.than.D_hoaHong.huy === 500000,
  'quý đang chạy CÓ khoản hoa hồng bị huỷ thật — 2 khoản, 500.000đ');
bao(ktCan.than.canDoi.can,
  'VÀ VẪN CÂN CẢ HAI ĐẲNG THỨC — kể cả khi trong kỳ có huỷ hoa hồng và có hoàn tiền',
  'lệch công nợ ' + ktCan.than.canDoi.lechCongNo +
  ' · lệch hoa hồng ' + ktCan.than.canDoi.lechHoaHong);

/* QUÝ I ĐỌC LẠI HÔM NAY PHẢI RA SỐ DƯ CỦA LÚC ẤY.

   HH-BC02 sinh tháng 3, còn nguyên tới hết quý I, mới bị huỷ hôm nay.
   Nên số dư hoa hồng cuối quý I vẫn phải CÓ nó. Đọc trạng thái hôm nay
   thay vì đọc mốc thì nó biến mất khỏi quý I, và bản quý I in ra hồi
   tháng 4 với bản in lại hôm nay ra hai số khác nhau. */
const q1Lai = await goi({fn:'baoCaoKeToan', token:tkSA, u:'superadmin@gita365.vn',
  loai:'quy', moc:'2026-Q1'});
bao(q1Lai.than.D_hoaHong.sinhTrongKy === 200000 &&
    q1Lai.than.D_hoaHong.huy === 0 &&
    q1Lai.than.D_hoaHong.phaiTraCuoiKy >= 200000,
  'MỘT KỲ ĐÃ QUA ĐỌC LẠI HÔM NAY VẪN RA SỐ DƯ CỦA LÚC ẤY — khoản huỷ hôm nay không xoá ngược vào quý I',
  'sinh 200.000đ trong quý I · huỷ 0 trong quý I · vẫn còn trong số dư cuối quý');
bao(q1Lai.than.canDoi.can,
  'và quý I vẫn cân sau khi có một lượt huỷ xảy ra ba quý sau đó',
  'lệch hoa hồng ' + q1Lai.than.canDoi.lechHoaHong);

/* Khoản hoàn này gắn vào PT-BC01 — phiếu nằm trong tuần ĐÃ CHỐT — nên
   nó cũng phải sinh một bút toán điều chỉnh trỏ về đúng tuần ấy. */
bao(dyBC.than.dieuChinh && dyBC.than.dieuChinh.kyBiAnhHuong === '2026-W10',
  'và HOÀN TIỀN CHO MỘT PHIẾU TRONG TUẦN ĐÃ CHỐT cũng trỏ ngược về đúng tuần ấy',
  'bút toán phải trỏ về kỳ của PHIẾU GỐC, không phải kỳ hôm nay');

/* ── 6 · BỘ SỐ KHAI THUẾ ── */
bao(!(await goi({fn:'boSoKhaiThue', token:tkSA, u:'superadmin@gita365.vn',
  loai:'quy', moc:'2026-Q1'})).than.ok === false, 'R01 mở được bộ số khai thuế');
const thue = await goi({fn:'boSoKhaiThue', token:tkSA, u:'superadmin@gita365.vn',
  loai:'quy', moc:'2026-Q1'});
bao(thue.than.ok && thue.than.doanhThu.ghiNhan === 1500000 &&
    thue.than.doanhThu.nguon.indexOf('kyThu') >= 0,
  'mỗi chỉ tiêu kèm NGUỒN SỐ — kế toán tra ngược được về từng dòng, không phải tin lời máy');
bao(Array.isArray(thue.than.chiHoaHong.theoNguoiNhan) &&
    thue.than.chiHoaHong.vi.indexOf('từng lượt') >= 0,
  'hoa hồng trả về TỪNG LƯỢT CHI cho TỪNG người — khấu trừ tính theo lượt, không theo tổng kỳ');
bao(thue.than.choKeToanXacNhan.length === 5 &&
    !/thuế suất là|phải nộp|khấu trừ 10/.test(JSON.stringify(thue.than)),
  'MÁY KHÔNG KẾT LUẬN NGHĨA VỤ THUẾ — không tự nhân một tỷ lệ nào vào',
  thue.than.choKeToanXacNhan.length + ' chỗ chờ kế toán xác nhận: ' +
    thue.than.choKeToanXacNhan.map(x=>x.ma).join(' · '));
bao(!thue.than.chuaSanSang.sanSang && thue.than.chuaSanSang.tuanChuaChot.length > 0,
  'và NÊU CHỖ CHƯA SẴN SÀNG TRƯỚC KHI NỘP — tuần chưa chốt là con số còn có thể đổi',
  thue.than.chuaSanSang.tuanChuaChot.length + ' tuần chưa chốt trong quý');

/* ═══════════════ 15c · NỬA CÒN LẠI CỦA CUỐN SỔ ═══════════════

   Tiền RA · tiền được GIẢM · tiền phải ĐÒI · tiền mặt phải ĐẾM. */
console.log('\n15c · SỔ CHI · MIỄN GIẢM · NHẮC THU · KÉT');

/* Phiên phụ huynh lấy mới ở đây: token của mục 1 đã đi qua mười lăm
   mục và có thể đã bị đá khi đổi mật khẩu. Một phép đo đỏ vì token hết
   hạn là một phép đo nói sai về thứ nó định đo. */
const tkPh2 = (await goi({fn:'dangNhap', u:'phuhuynh@gita365.vn',
  mk:'MatKhauRieng2026!'})).than.token;

/* Đề xuất chi là việc của quản lý (R01–R05), không phải của Coach:
   Coach kèm nhà, không quyết tiền thuê mặt bằng. Nên mục này cần một
   tài khoản R05 — và chính chỗ ấy là một phép đo: Coach bấm vào cũng
   không được. */
await themNguoi('U-tc', 'truongcoach@gita365.vn', 'MatKhauRieng2026!', 'R05',
  {portal:'coach'});
const tkTC = (await goi({fn:'dangNhap', u:'truongcoach@gita365.vn',
  mk:'MatKhauRieng2026!'})).than.token;
bao(!(await goi({fn:'ghiChi', token:tkCoach, u:'coach@gita365.vn',
  chi:{khoanMuc:'matBang', soTien:3000000, hinhThuc:'chuyenKhoan',
    dienGiai:'Thuê phòng học tháng 3'}})).than.ok,
  'Coach không đề xuất được khoản chi — Coach kèm nhà, không quyết tiền thuê mặt bằng');

/* ── 1 · SỔ CHI ── */
bao(!(await goi({fn:'ghiChi', token:tkPh2, u:'phuhuynh@gita365.vn',
  chi:{khoanMuc:'matBang', soTien:5000000, hinhThuc:'chuyenKhoan',
    dienGiai:'Thuê văn phòng tháng 3'}})).than.ok,
  'phụ huynh không đề xuất được khoản chi');

const mucLa = await goi({fn:'ghiChi', token:tkTC, u:'truongcoach@gita365.vn',
  chi:{khoanMuc:'anBuoiTrua', soTien:100000, hinhThuc:'tienMat', dienGiai:'Ăn trưa cả nhóm'}});
bao(!mucLa.than.ok && /Khoản mục phải/.test(mucLa.than.error),
  'KHOẢN MỤC LÀ DANH SÁCH TRẮNG — gõ tự do thì sáu tháng sau có bốn khoản mục cho một thứ',
  'và không bản tổng hợp nào cộng đúng');

bao(!(await goi({fn:'ghiChi', token:tkTC, u:'truongcoach@gita365.vn',
  chi:{khoanMuc:'matBang', soTien:5000000, hinhThuc:'chuyenKhoan', dienGiai:'ok'}})).than.ok,
  'khoản chi phải có DIỄN GIẢI rõ — sang năm phải dựng lại được câu chuyện');

bao(!(await goi({fn:'ghiChi', token:tkTC, u:'truongcoach@gita365.vn',
  chi:{khoanMuc:'matBang', soTien:5000000, hinhThuc:'chuyenKhoan',
    dienGiai:'Thuê văn phòng', ngayChi:'2027-12-01T00:00:00.000Z'}})).than.ok,
  'ngày chi không được nằm ở tương lai — khoản chi ghi khi tiền đã ra');

/* Khoản chi rơi vào tuần 2026-W10 ĐÃ CHỐT, để thử luôn bút toán. */
const cp1 = await goi({fn:'ghiChi', token:tkTC, u:'truongcoach@gita365.vn',
  chi:{khoanMuc:'matBang', soTien:3000000, hinhThuc:'chuyenKhoan',
    dienGiai:'Thuê phòng học tháng 3/2026', ngayChi:'2026-03-04T03:00:00.000Z',
    coHoaDon:true, maHoaDon:'HD-0001', nhaCungCap:'Cty ABC'}});
bao(cp1.than.ok && cp1.than.trangThai === 'choDuyet', 'đề xuất được khoản chi có hoá đơn');

bao(!(await goi({fn:'duyetChi', token:tkTC, u:'truongcoach@gita365.vn', id:cp1.than.id})).than.ok,
  'R05 đề xuất được nhưng KHÔNG duyệt được — duyệt chi là R01–R03');

/* Số tiền phải TỪ 1,5 triệu trở lên, nếu không khoản này đi lối tự ghi
   và cổng "không tự duyệt" không có gì để chặn — phép đo sẽ xanh mà
   không đo được thứ nó định đo. */
const cpTuDuyet = await goi({fn:'ghiChi', token:tkSA, u:'superadmin@gita365.vn',
  chi:{khoanMuc:'haTang', soTien:2000000, hinhThuc:'chuyenKhoan',
    dienGiai:'Gia hạn tên miền gita.edu.vn'}});
const tuDuyet = await goi({fn:'duyetChi', token:tkSA, u:'superadmin@gita365.vn',
  id:cpTuDuyet.than.id});
bao(!tuDuyet.than.ok && tuDuyet.than.code === 'TUDUYET',
  'NGƯỜI ĐỀ XUẤT CHI KHÔNG TỰ DUYỆT — tiền đi RA thì phải có người thứ hai đứng giữa',
  'một người vừa quyết chi vừa duyệt chi là một người lấy được tiền ra khỏi Học viện');

/* NGƯỠNG: khoản lớn chỉ R01 duyệt. Thử bằng một hồ sơ vai R03 truyền
   thẳng vào hàm — không tráo một tên nào trên G, đúng luật v9.79. */
const cpTo = await goi({fn:'ghiChi', token:tkTC, u:'truongcoach@gita365.vn',
  chi:{khoanMuc:'tiepThi', soTien:50000000, hinhThuc:'chuyenKhoan',
    dienGiai:'Chiến dịch truyền thông quý 4'}});
bao(cpTo.than.ok && cpTo.than.canR01,
  'khoản vượt ngưỡng báo NGAY Ở BƯỚC ĐỀ XUẤT rằng phải lên tới R01',
  'để người đề xuất không chờ một cấp duyệt sẽ không bao giờ duyệt được');
const ct = await import('../may-chu/chi-tieu.js');
const thuR03 = await ct.duyetChi({id:cpTo.than.id}, env, env.CSDL,
  {uid:'U-gd', u:'giamdoc@gita365.vn', role:'R03'});
bao(!thuR03.ok && thuR03.code === 'VUOTTRAN',
  'VÀ R03 KHÔNG DUYỆT ĐƯỢC KHOẢN VƯỢT NGƯỠNG — cái sai đắt nhất không được đi qua cửa dễ nhất',
  thuR03.error);

const dcp = await goi({fn:'duyetChi', token:tkSA, u:'superadmin@gita365.vn', id:cp1.than.id});
bao(dcp.than.ok && dcp.than.dieuChinh && dcp.than.dieuChinh.kyBiAnhHuong === '2026-W10',
  'DUYỆT MỘT KHOẢN CHI THUỘC TUẦN ĐÃ CHỐT cũng sinh bút toán điều chỉnh',
  'chi phí động vào kỳ đã đóng y như phiếu thu, nên phải để lại vết y như thế');

const sc = await goi({fn:'soChi', token:tkSA, u:'superadmin@gita365.vn'});
bao(sc.than.ok && sc.than.tongDaDuyet === 3000000 &&
    sc.than.theoKhoanMuc[0].coHoaDon === 3000000,
  'sổ chi cắt theo KHOẢN MỤC và tách riêng phần CÓ HOÁ ĐƠN',
  'khoản không hoá đơn vẫn là tiền đã ra thật, nhưng đứng khác khi tính thuế');

/* ── NGƯỠNG XIN DUYỆT CHI · CHỐT 9.92 ──

   "Các khoản chi trên 1,5 triệu đồng đều phải khai báo xin cấp duyệt
   chi." Dưới ngưỡng đi lối tự ghi; từ ngưỡng trở lên phải xin duyệt. */
const nho = await goi({fn:'ghiChi', token:tkTC, u:'truongcoach@gita365.vn',
  chi:{khoanMuc:'vanPhong', soTien:300000, hinhThuc:'tienMat',
    dienGiai:'Giấy in và mực cho văn phòng', ngayChi:'2026-05-04T02:00:00.000Z'}});
bao(nho.than.ok && nho.than.tuGhi && nho.than.trangThai === 'daDuyet',
  'KHOẢN DƯỚI 1,5 TRIỆU GHI THẲNG VÀO SỔ — bắt hai người ký cho một khoản ba trăm nghìn là làm cho cả cái cổng duyệt bị né',
  dinhDangVN(nho.than.soTien) + ' · lối tự ghi');

const vua = await goi({fn:'ghiChi', token:tkTC, u:'truongcoach@gita365.vn',
  chi:{khoanMuc:'daoTao', soTien:1500000, hinhThuc:'chuyenKhoan',
    dienGiai:'In tài liệu khoá tháng 5', ngayChi:'2026-05-04T02:00:00.000Z'}});
bao(vua.than.ok && !vua.than.tuGhi && vua.than.trangThai === 'choDuyet',
  'ĐÚNG 1,5 TRIỆU LÀ ĐÃ PHẢI XIN DUYỆT — "trên 1,5 triệu" tính từ 1,5 triệu trở lên, không phải từ 1,5 triệu lẻ một đồng',
  vua.than.vi);

/* CHIA NHỎ ĐỂ NÉ NGƯỠNG — chỗ mọi cổng duyệt theo số tiền đều bị né.
   Ba khoản một triệu tư cùng khoản mục, cùng người, trong một tuần. */
const chia1 = await goi({fn:'ghiChi', token:tkTC, u:'truongcoach@gita365.vn',
  chi:{khoanMuc:'tiepThi', soTien:1400000, hinhThuc:'chuyenKhoan',
    dienGiai:'Chạy quảng cáo đợt 1', ngayChi:'2026-06-01T02:00:00.000Z'}});
bao(chia1.than.ok && chia1.than.tuGhi, 'khoản 1,4 triệu đầu tiên vẫn đi lối tự ghi');
const chia2 = await goi({fn:'ghiChi', token:tkTC, u:'truongcoach@gita365.vn',
  chi:{khoanMuc:'tiepThi', soTien:1400000, hinhThuc:'chuyenKhoan',
    dienGiai:'Chạy quảng cáo đợt 2', ngayChi:'2026-06-03T02:00:00.000Z'}});
bao(chia2.than.ok && !chia2.than.tuGhi && chia2.than.trangThai === 'choDuyet' &&
    chia2.than.gopBayNgay === 2800000,
  'NHƯNG KHOẢN THỨ HAI BỊ ĐẨY QUA CỔNG DUYỆT — một ngưỡng không có phép soi chia nhỏ thì không phải ngưỡng',
  'cộng dồn 7 ngày ' + dinhDangVN(chia2.than.gopBayNgay) + ' · ' + chia2.than.vi);

/* Cửa sổ trượt quanh NGÀY CHI, không quanh hôm nay: chia theo ngày là
   cách né tiếp theo, và nó dễ y như cách đầu. Cách nhau hơn bảy ngày
   thì là hai khoản thật, không phải một khoản bị cắt đôi. */
const xaNgay = await goi({fn:'ghiChi', token:tkTC, u:'truongcoach@gita365.vn',
  chi:{khoanMuc:'tiepThi', soTien:1400000, hinhThuc:'chuyenKhoan',
    dienGiai:'Chạy quảng cáo tháng sau', ngayChi:'2026-07-15T02:00:00.000Z'}});
bao(xaNgay.than.ok && xaNgay.than.tuGhi,
  'cách nhau hơn bảy ngày thì lại là hai khoản thật — phép soi chặn chia nhỏ, không chặn chi tiêu');

/* Khoản mục khác thì không cộng dồn: mua giấy in không phải là chia
   nhỏ tiền quảng cáo. */
const mucKhac = await goi({fn:'ghiChi', token:tkTC, u:'truongcoach@gita365.vn',
  chi:{khoanMuc:'vanPhong', soTien:1400000, hinhThuc:'tienMat',
    dienGiai:'Mua máy in cho phòng học', ngayChi:'2026-06-02T02:00:00.000Z'}});
bao(mucKhac.than.ok && mucKhac.than.tuGhi,
  'và khoản mục khác thì không cộng dồn — mua giấy in không phải chia nhỏ tiền quảng cáo');

const scLoi = await goi({fn:'soChi', token:tkSA, u:'superadmin@gita365.vn'});
bao(scLoi.than.loiTuGhi.so === 4 && scLoi.than.quaCuaDuyet.so === 1 &&
    scLoi.than.nguong.phaiXinDuyet === 1500000,
  'SỔ CHI NÊU RIÊNG HAI LỐI — khoản nào có hai người ký, khoản nào chỉ một',
  scLoi.than.loiTuGhi.so + ' khoản tự ghi · ' + scLoi.than.quaCuaDuyet.so + ' khoản qua cửa duyệt');

/* Khoản đã vào sổ theo lối tự ghi thì KHÔNG đi duyệt lại được — nó đã
   là daDuyet, và cổng duyệt chỉ ăn dòng đang choDuyet. */
bao(!(await goi({fn:'duyetChi', token:tkSA, u:'superadmin@gita365.vn',
  id:nho.than.id})).than.ok,
  'khoản đã tự ghi thì không duyệt lại được — nó đã ở trong sổ rồi');

/* ── 2 · MIỄN GIẢM ── */
const kyBC2 = 'KT-BC02';
bao(!(await goi({fn:'deXuatMienGiam', token:tkPh2, u:'phuhuynh@gita365.vn',
  mienGiam:{idKy:kyBC2, soTien:100000, loai:'hocBong', theoLuat:'x', lyDo:'y'}})).than.ok,
  'phụ huynh không tự đề xuất miễn giảm cho nhà mình');

bao(!(await goi({fn:'deXuatMienGiam', token:tkCoach, u:'coach@gita365.vn',
  mienGiam:{idKy:kyBC2, soTien:100000, loai:'hocBong', lyDo:'Hoàn cảnh khó khăn'}})).than.ok,
  'PHẢI GHI GIẢM THEO LUẬT NÀO — một khoản giảm không dẫn được về luật nào là một khoản do một người quyết',
  'và người ấy sẽ phải trả lời một mình');

/* KT-BC01 phải thu 1.000.000đ, đã thu 600.000đ (PT-BC02 đã bị huỷ ở
   mục 15b), nên còn 400.000đ. Giảm 500.000đ là giảm quá. */
const giamQua = await goi({fn:'deXuatMienGiam', token:tkCoach, u:'coach@gita365.vn',
  mienGiam:{idKy:'KT-BC01', soTien:500000, loai:'hocBong',
    theoLuat:'Học bổng toàn phần cho con em cán bộ', lyDo:'Xét duyệt tháng 3'}});
bao(!giamQua.than.ok && giamQua.than.code === 'GIAMQUA',
  'KHÔNG GIẢM QUÁ PHẦN CÒN LẠI CỦA KỲ — giảm quá là dựng ra một công nợ âm',
  'và đó cũng là cổng chặn chuyện giảm nhiều hơn phải thu rồi hoàn phần chênh');

const mg1 = await goi({fn:'deXuatMienGiam', token:tkCoach, u:'coach@gita365.vn',
  mienGiam:{idKy:'KT-BC01', soTien:400000, loai:'hoanCanh',
    theoLuat:'Quy chế học bổng GITA điều 4: giảm tối đa 40% cho gia đình khó khăn',
    lyDo:'Gia đình có hai con cùng học, thu nhập giảm'}});
bao(mg1.than.ok && mg1.than.conLaiCuaKy === 400000, 'đề xuất miễn giảm đúng luật thì được');

bao(!(await goi({fn:'duyetMienGiam', token:tkCoach, u:'coach@gita365.vn',
  id:mg1.than.id})).than.ok, 'Coach không duyệt được miễn giảm');

const noTruoc = (await goi({fn:'congNo', token:tkSA, u:'superadmin@gita365.vn',
  maKhachHang:'GITA-BC01'})).than.tongConNo;
const dmg = await goi({fn:'duyetMienGiam', token:tkSA, u:'superadmin@gita365.vn',
  id:mg1.than.id});
const noSau = await goi({fn:'congNo', token:tkSA, u:'superadmin@gita365.vn',
  maKhachHang:'GITA-BC01'});
bao(dmg.than.ok && noSau.than.tongConNo === noTruoc - 400000,
  'DUYỆT MIỄN GIẢM THÌ CÔNG NỢ GIẢM THEO — mà cam kết gốc ở kyThu giữ nguyên',
  noTruoc + 'đ → ' + noSau.than.tongConNo + 'đ');
bao(noSau.than.tongMienGiam === 400000 &&
    noSau.than.ke.find(x => x.idKy === 'KT-BC01').phaiThu === 1000000,
  'và bản kê nêu CẢ BA con số — phải đóng 1.000.000đ, được giảm 400.000đ, đã đóng 600.000đ',
  'sửa thẳng phaiThu là xoá mất cam kết gốc; ghi phiếu thu giả là thổi phồng tiền thực thu');

/* Bốn chỗ tính công nợ phải trừ miễn giảm GIỐNG HỆT NHAU. Nhà đã được
   giảm hết phần còn lại thì phải rời khỏi danh sách quá hạn — nếu
   dsQuaHan không trừ, nó vẫn nằm đó và người ta vẫn đi đòi. */
const qhSau = await goi({fn:'dsQuaHan', token:tkSA, u:'superadmin@gita365.vn'});
bao(!qhSau.than.ds.some(x => x.idKy === 'KT-BC01'),
  'VÀ NHÀ ĐƯỢC GIẢM HẾT RỜI KHỎI DANH SÁCH QUÁ HẠN — bốn chỗ tính công nợ dùng CHUNG một phép trừ',
  'viết lại phép trừ ở từng chỗ là cách chắc nhất để một nhà được học bổng vẫn bị đi đòi');

/* ── 3 · NHẮC THU ──

   GITA-BC01 vừa được giảm hết phần còn lại nên nó KHÔNG còn quá hạn —
   đó chính là phép đo ngay trên. Nên dựng thêm một kỳ quá hạn thật để
   thử phần nhắc thu; đặt hạn ở tháng 4 để không đụng vào các con số
   của quý I mà mục 15b đã đo. */
db.prepare("INSERT INTO kyThu (id,maKhachHang,tang,ky,soKy,ngayThu,phaiThu,hanLuc,taoLuc) " +
  "VALUES ('KT-BC03','GITA-BC01',3,3,3,64,500000,'2026-04-15T02:00:00.000Z',?)")
  .run('2026-03-01T00:00:00.000Z');

/* ── 3 · NHẮC THU ── */
bao(!(await goi({fn:'ghiNhacThu', token:tkCoach, u:'coach@gita365.vn',
  nhac:{maKhachHang:'GITA-BC01', kenh:'goiDien', ketQua:'huaTra', noiDung:'Đã gọi, nhà hứa trả'}})).than.ok,
  'NHÀ HỨA TRẢ THÌ PHẢI GHI HẸN NGÀY NÀO — một lời hứa không có ngày thì tuần sau lại gọi hỏi đúng câu cũ');

const henCu = new Date(Date.now() - 5 * 86400e3).toISOString();
bao(!(await goi({fn:'ghiNhacThu', token:tkCoach, u:'coach@gita365.vn',
  nhac:{maKhachHang:'GITA-BC01', kenh:'goiDien', ketQua:'huaTra',
    noiDung:'Nhà hứa trả', henLuc:henCu}})).than.ok,
  'hẹn trả nằm ở quá khứ thì từ chối — một cái hẹn đã qua không phải hẹn');

const nt1 = await goi({fn:'ghiNhacThu', token:tkCoach, u:'coach@gita365.vn',
  nhac:{maKhachHang:'GITA-BC01', idKy:'KT-BC02', kenh:'goiDien', ketQua:'huaTra',
    noiDung:'Gọi 10h sáng, mẹ cháu nói lương về ngày 20 sẽ chuyển đủ',
    henLuc:new Date(Date.now() + 3 * 86400e3).toISOString()}});
bao(nt1.than.ok && nt1.than.laLanThu === 1,
  'ghi được lượt nhắc, có kênh, có nội dung, có hẹn — LÀM VIỆC TRÊN HỆ THỐNG có bằng chứng',
  'không ghi thì ngày người phụ trách nghỉ là ngày câu trả lời biến mất');

const ls = await goi({fn:'lichSuNhacThu', token:tkCoach, u:'coach@gita365.vn',
  maKhachHang:'GITA-BC01'});
bao(ls.than.ok && ls.than.soLan === 1 && !!ls.than.henGanNhat,
  'lịch sử nhắc thu trả về cả hẹn gần nhất');

/* Danh sách quá hạn phải mang theo "đã nhắc mấy lần, kết quả gì" —
   không có thì nó là danh sách nhìn thì biết nhưng không làm được. */
const qhNhac = (await goi({fn:'dsQuaHan', token:tkSA, u:'superadmin@gita365.vn'}))
  .than.ds.find(x => x.maKhachHang === 'GITA-BC01');
bao(qhNhac && qhNhac.soLanNhac === 1 && qhNhac.ketQuaLanCuoi === 'huaTra' && !!qhNhac.henTraLuc,
  'DANH SÁCH QUÁ HẠN MANG THEO LỊCH SỬ NHẮC — nhà đã hứa trả tuần sau không bị gọi như nhà chưa ai liên lạc',
  'đã nhắc ' + qhNhac.soLanNhac + ' lần · ' + qhNhac.ketQuaLanCuoi);

const chuaDenHen = await goi({fn:'denHenChuaTra', token:tkSA, u:'superadmin@gita365.vn'});
bao(chuaDenHen.than.ok && !chuaDenHen.than.ds.some(x => x.maKhachHang === 'GITA-BC01'),
  'nhà HẸN TUẦN SAU chưa vào danh sách đến hẹn — khác với danh sách quá hạn');
db.prepare("UPDATE nhacThu SET henLuc = ? WHERE id = ?")
  .run(new Date(Date.now() - 86400e3).toISOString(), nt1.than.id);
const denHen = await goi({fn:'denHenChuaTra', token:tkSA, u:'superadmin@gita365.vn'});
bao(denHen.than.ds.some(x => x.maKhachHang === 'GITA-BC01'),
  'tới ngày hẹn mà chưa trả thì VÀO danh sách phải gọi hôm nay',
  'nhà đang nợ mà hẹn tuần sau thì chưa phải gọi — hai việc khác nhau');

/* ── 4 · CHỐT KÉT ── */
const ngayKet = '2026-03-05';   /* PT-BC02 400.000đ tiền mặt, đã bị huỷ */
db.prepare("INSERT INTO phieuThu (id,maKhachHang,soTien,hinhThuc,nguoiGhi,ghiLuc," +
  "nguoiDuyet,duyetLuc,trangThai) VALUES ('PT-KET','GITA-BC01',200000,'tienMat'," +
  "'tuvan@gita365.vn','2026-03-05T04:00:00.000Z','superadmin@gita365.vn'," +
  "'2026-03-05T04:00:00.000Z','daDuyet')").run();

const ketLech = await goi({fn:'chotKet', token:tkSA, u:'superadmin@gita365.vn',
  ngay:ngayKet, demThuc:150000});
bao(!ketLech.than.ok && ketLech.than.code === 'LECHKHONGLYDO' &&
    ketLech.than.theoSo === 200000 && ketLech.than.chenh === -50000,
  'KÉT LỆCH MÀ KHÔNG CÓ LÝ DO THÌ KHÔNG CHỐT ĐƯỢC — cho chốt lặng lẽ là dựng ra một chỗ tiền biến mất hợp lệ',
  'sổ nói 200.000đ, đếm được 150.000đ');

const ketOk = await goi({fn:'chotKet', token:tkSA, u:'superadmin@gita365.vn',
  ngay:ngayKet, demThuc:150000, lyDo:'Trả lại tiền thừa cho phụ huynh, quên ghi phiếu'});
bao(ketOk.than.ok && ketOk.than.chenh === -50000 && !ketOk.than.khop,
  'lệch CÓ lý do thì chốt được, và lệch ở lại trong dòng',
  'một két không bao giờ lệch là một két chưa bao giờ được đếm');

const dsKet = await goi({fn:'dsChotKet', token:tkSA, u:'superadmin@gita365.vn'});
bao(dsKet.than.ok && dsKet.than.soNgayLech === 1 && dsKet.than.tongLech === -50000,
  'sổ két đếm được bao nhiêu ngày lệch và lệch tổng bao nhiêu');

/* ── 5 · CẢ BA THỨ MỚI PHẢI VÀO ĐÚNG BẢN KẾ TOÁN ── */
const ktMoi = await goi({fn:'baoCaoKeToan', token:tkSA, u:'superadmin@gita365.vn',
  loai:'quy', moc:'2026-Q1'});
bao(ktMoi.than.F_chiPhi.tongChi === 3000000 &&
    ktMoi.than.F_chiPhi.coHoaDon === 3000000 &&
    ktMoi.than.F_chiPhi.khongHoaDon === 0,
  'bản kế toán quý I giờ CÓ NỬA CHI — 3.000.000đ, tách sẵn phần có hoá đơn');
/* MIỄN GIẢM CÓ HIỆU LỰC TỪ LÚC DUYỆT, KHÔNG LÙI NGƯỢC.
   Khoản giảm duyệt hôm nay rơi vào quý ĐANG CHẠY; quý I giữ nguyên số
   của nó. Cùng một luật với mốc huỷ hoa hồng — và cùng một lý do: một
   bản báo cáo quá khứ phải dựng lại được. */
bao(ktMoi.than.A_doanhThu.mienGiam === 0,
  'quý I KHÔNG nhận khoản miễn giảm duyệt hôm nay — miễn giảm có hiệu lực từ lúc duyệt, không lùi ngược');
const ktNay2 = await goi({fn:'baoCaoKeToan', token:tkSA, u:'superadmin@gita365.vn',
  loai:'quy', moc:new Date().toISOString().slice(0, 10)});
bao(ktNay2.than.A_doanhThu.mienGiam === 400000 &&
    ktNay2.than.A_doanhThu.hoanTien !== ktNay2.than.A_doanhThu.giamTruDoanhThu &&
    ktNay2.than.A_doanhThu.giamTruDoanhThu ===
      ktNay2.than.A_doanhThu.hoanTien + ktNay2.than.A_doanhThu.mienGiam,
  'HOÀN TIỀN VÀ MIỄN GIẢM NÊU RIÊNG — hoàn là tiền đã ra, miễn giảm là tiền chưa từng vào',
  'gộp một dòng thì không ai biết Học viện đang trả lại hay đang cho đi');
bao(ktNay2.than.canDoi.can,
  'và quý ĐANG CHẠY — quý có cả hoàn, cả miễn giảm, cả huỷ hoa hồng — vẫn cân',
  'lệch công nợ ' + ktNay2.than.canDoi.lechCongNo +
  ' · lệch hoa hồng ' + ktNay2.than.canDoi.lechHoaHong);
bao(ktMoi.than.canDoi.can,
  'VÀ ĐẲNG THỨC CÔNG NỢ VẪN CÂN sau khi thêm miễn giảm vào cả hai vế',
  'lệch công nợ ' + ktMoi.than.canDoi.lechCongNo +
  ' · lệch hoa hồng ' + ktMoi.than.canDoi.lechHoaHong);

const thueMoi = await goi({fn:'boSoKhaiThue', token:tkSA, u:'superadmin@gita365.vn',
  loai:'quy', moc:'2026-Q1'});
bao(thueMoi.than.chuaSanSang.ngayKetConLech.length === 1 &&
    thueMoi.than.chuaSanSang.khoanChiConChoDuyet === 0,
  'bộ số khai thuế NÊU LUÔN két còn lệch và khoản chi còn treo — nộp rồi mới xử lý thì phải khai bổ sung',
  '1 ngày két lệch trong quý');

/* ═══════════════ 16 · VIỆC CHƯA PORT PHẢI BÁO TO ═══════════════ */
console.log('\n16 · VIỆC CHƯA CHUYỂN SANG NỀN MỚI');
/* Lấy một việc CÒN TRONG danh sách chưa port, không gõ cứng tên: gõ
   cứng thì tới hôm port xong việc ấy, phép đo này đỏ vì lý do của riêng
   nó — đúng chuyện vừa xảy ra khi dongBo được port. */
const conLai = Object.keys((await import('../may-chu/worker.js')).CHUA_PORT || {})[0];
const cp = (await goi({fn: conLai, token: tk, u: 'phuhuynh@gita365.vn'})).than;
bao(cp.code === 'CHUAPORT',
  'việc chưa port trả về mã riêng, không lẫn với "yêu cầu không hợp lệ" — thử "' + conLai + '"',
  cp.error);
const bia = (await goi({fn: 'mot-viec-khong-co-that', token: tk})).than;
bao(bia.code !== 'CHUAPORT' && !bia.ok, 'còn việc bịa ra thì vẫn là yêu cầu không hợp lệ',
  bia.error);

/* ═══════════════ 17 · KHÔNG RÒ RA NGOÀI ═══════════════ */
console.log('\n17 · KHÔNG RÒ RA NGOÀI');
const xau = {prepare(){ throw new Error('SQLITE_ERROR: no such column: users.matKhauThat'); }};
const rNo = await worker.fetch(new Request('https://gita.test/', {
  method: 'POST', headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({fn: 'dangNhap', u: 'a@b.vn', mk: 'x'})
}), {...env, CSDL: xau});
const jNo = await rNo.json();
bao(rNo.status === 500 && !/SQLITE|users\.|column/i.test(JSON.stringify(jNo)),
  'lỗi cơ sở dữ liệu KHÔNG lọt ra máy khách — tên bảng, tên cột là bản đồ cho người đi dò',
  JSON.stringify(jNo.error));

const gt = await worker.fetch(new Request('https://gita.test/', {method: 'GET'}), env);
const jGt = await gt.json();
bao(jGt.ok && jGt.daNapKhoa === 8 && !JSON.stringify(jGt).includes('khoa-nen'),
  'cửa trạng thái nói ĐÃ NẠP MẤY KHOÁ mà không trả khoá nào',
  'đã nạp ' + jGt.daNapKhoa + ' gói');

/* ═══════════════ 18 · PHÉP SOI TỰ CHỨNG MINH CHƯA CÂM ═══════════════

   Mười bảy mục trên xanh hết. Một bộ thử chưa từng đỏ thì chưa phải bộ thử.
   Ở đây phá bằng cách truyền một hồ sơ vai KHÁC vào chính hàm tính
   phạm vi — không tráo hàm toàn cục, đúng luật đã ghi ở v9.79. */
console.log('\n18 · PHÉP SOI TỰ CHỨNG MINH CHƯA CÂM');
const pv = (await import('../may-chu/worker.js')).phamViCapPhep;
bao(pv({role: 'R13', tier: 5}).indexOf('tang5') >= 0 &&
    pv({role: 'R13', tier: 2}).indexOf('tang3') < 0,
  'đổi tầng trong hồ sơ thì phạm vi đổi theo — phép soi phạm vi không phải hằng số',
  'T5 → ' + pv({role: 'R13', tier: 5}).length + ' gói · T2 → ' + pv({role: 'R13', tier: 2}).length + ' gói');
bao(pv({role: 'R99', tier: 5}).join(',') === 'nen',
  'vai LẠ chỉ nhận phần nền — danh sách trắng, không phải danh sách cấm',
  'vai chưa tồn tại hôm nay cũng không lọt được');

console.log('');
/* process.exit() KHÔNG đợi stdout ghi xong khi đầu ra là tệp hay ống —
   dòng cuối cùng biến mất, và người đọc bản ghi thấy một bộ thử dừng
   giữa chừng không rõ vì sao. Đặt mã thoát rồi để Node tự kết thúc. */
if (loi) { console.log('✗ CÒN ' + loi + ' CHỖ CHƯA ĐẠT'); process.exitCode = 1; return; }
console.log('✓ TOÀN BỘ ĐẠT — cửa vào mới chạy đúng');
})();
