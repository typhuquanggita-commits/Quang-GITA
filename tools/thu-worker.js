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

db.prepare("UPDATE students SET tier = 1 WHERE id = 'HV-A'").run();
const lai = await goi({fn:'nangTang', token:tkSA, u:'superadmin@gita365.vn',
  maHocVien:'HV-A', tang:2, maKhachHang:'GITA-9001'});
bao(!lai.than.ok,
  'PHIẾU THANH TOÁN DÙNG MỘT LẦN — không đánh dấu thì một phiếu mở tầng cho bao nhiêu học viên cũng được',
  lai.than.error);

/* ═══════════════ 13 · VIỆC CHƯA PORT PHẢI BÁO TO ═══════════════ */
console.log('\n13 · VIỆC CHƯA CHUYỂN SANG NỀN MỚI');
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

/* ═══════════════ 14 · KHÔNG RÒ RA NGOÀI ═══════════════ */
console.log('\n14 · KHÔNG RÒ RA NGOÀI');
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

/* ═══════════════ 15 · PHÉP SOI TỰ CHỨNG MINH CHƯA CÂM ═══════════════

   Mười bốn mục trên xanh hết. Một bộ thử chưa từng đỏ thì chưa phải bộ thử.
   Ở đây phá bằng cách truyền một hồ sơ vai KHÁC vào chính hàm tính
   phạm vi — không tráo hàm toàn cục, đúng luật đã ghi ở v9.79. */
console.log('\n15 · PHÉP SOI TỰ CHỨNG MINH CHƯA CÂM');
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
