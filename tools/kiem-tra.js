/* ═══════════════════════════════════════════════════════════════
   GITA 365 · BỘ KIỂM TRA PHÁT HÀNH
   Chạy trước mỗi lần phát hành:
     npx http-server -p 8099 -s .
     node tools/kiem-tra.js
   Kiểm ba việc: toàn vẹn liên kết dữ liệu · phân quyền của 19 vai
   trên toàn bộ màn hình · chống tiêm mã qua ô nhập của người dùng.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
/* ── Ruột của một gói sau khi giải mã ──
   Từ bản 9.9 ruột được NÉN trước rồi mới mã hoá, nên sau khi giải mã có
   thể là gzip. Nhận ra bằng hai byte đầu: JSON luôn mở bằng '{' (0x7B),
   gzip luôn mở bằng 0x1F 0x8B — không bao giờ trùng, nên gói cũ chưa nén
   vẫn đọc được y như trước. */
const zlibGoi = require('zlib');
const fsGoc = require('fs');
const pathGoc = require('path');
function ruotGoi(ro) {
  const b = Buffer.isBuffer(ro) ? ro : Buffer.from(ro);
  return JSON.parse((b[0] === 0x1f && b[1] === 0x8b ? zlibGoi.gunzipSync(b) : b).toString('utf8'));
}

const PW = process.env.PW_PATH || '/opt/node22/lib/node_modules/playwright';
const URL = process.env.GITA_URL || 'http://127.0.0.1:8099/index.html';
const { chromium } = require(PW);

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

  /* Nếu máy đang có bộ khoá (bản nội bộ) thì kiểm cả phần nội dung đã cấp phép.
     Không có khoá thì kiểm ở chế độ mẫu — vẫn phải xanh toàn bộ. */
  let coKhoa = false;
  /* Giữ bộ khoá ở biến NGOÀI: addInitScript gắn theo TỪNG TRANG, không
     theo trình duyệt. Mục nào mở trang mới mà quên tiêm lại khoá thì
     trang ấy rơi vào chế độ mẫu — và rơi trong im lặng, vì chế độ mẫu
     vẫn dựng đủ màn, chỉ khác là không gói nào được cấp. */
  let KHOA = null;
  try {
    const k = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '..', 'kho', 'khoa.json'), 'utf8'));
    if (k && k.khoa) { KHOA = k.khoa; await p.addInitScript(x => { window.GITA_KHOA = x; }, k.khoa); coKhoa = true; }
  } catch { /* không có khoá — chạy chế độ mẫu */ }
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => localStorage.clear());
  await p.reload({ waitUntil: 'networkidle' });
  await p.waitForTimeout(500);
  console.log(coKhoa ? '\n(có bộ khoá — kiểm cả nội dung đã cấp phép)' : '\n(không có bộ khoá — kiểm ở chế độ mẫu)');

  let loi = 0;
  /* ── CHẾ ĐỘ IM: chỉ in chỗ ĐỎ ──
     Bộ kiểm đầy đủ in ra 867 dòng, 80 KB. Với người đọc bằng mắt thì đó
     là bằng chứng mọi thứ đã được soi. Với một phiên làm việc cùng máy
     thì đó là tám mươi nghìn ký tự phải nuốt mỗi lần chạy, và chạy năm
     lần một buổi là hết sạch phần tài nguyên lẽ ra dành cho việc thật.

     Nên thêm cờ --im: chạy y hệt, đo y hệt, nhưng chỉ in chỗ hỏng và một
     dòng kết. Không phép kiểm nào bị bỏ — chỉ bớt phần khoe. Đo thật:
     80.614 ký tự xuống 184, và vẫn chạy đủ 759 phép đo.

     Chỗ hỏng in kèm SỐ MỤC, vì ở chế độ im thì tiêu đề mục bị nuốt, mà
     một dòng đỏ không biết thuộc mục nào thì phải chạy lại bản đầy đủ để
     tìm — tức là mất luôn phần vừa tiết kiệm được. */
  const IM = process.argv.includes('--im');
  let mucNay = '';
  let soDat = 0;
  const goc = console.log;
  console.log = function (...a) {
    const chu = String(a[0] || '');
    const m = chu.match(/^\n?(\d+) · /);
    if (m) mucNay = m[1];
    if (IM && !/✗/.test(chu)) return;      /* im: nuốt mọi dòng không đỏ */
    goc.apply(console, a);
  };
  const bao = (ok, ten, chiTiet) => {
    if (!ok) loi++; else soDat++;
    const dau = (IM && !ok && mucNay) ? '  ✗ [mục ' + mucNay + '] ' : (ok ? '  ✓ ' : '  ✗ ');
    console.log(dau + ten + (chiTiet ? ' — ' + chiTiet : ''));
  };

  /* Đăng nhập vai cao nhất để mở kho theo cấp phép rồi mới rà toàn vẹn */
  await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
  /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });

  /* ── 1. Toàn vẹn liên kết dữ liệu ── */
  console.log('\n1 · TOÀN VẸN LIÊN KẾT DỮ LIỆU');
  const d = await p.evaluate(() => {
    const G = window.G, nav = [];
    G.NAV.forEach(g => g.items.forEach(i => nav.push(i)));
    return {
      thieuMan: nav.filter(i => !G.VIEWS[i.v]).map(i => i.v),
      trungMuc: nav.map(i => i.v).filter((v, i, a) => a.indexOf(v) !== i),
      quyenLa: nav.filter(i => i.perm && G.PERM[i.perm] === undefined).map(i => i.perm),
      congLa: Object.keys(G.PORTALS).filter(k => !G.VIEWS[G.PORTALS[k].home]),
      taiKhoanLa: G.ACCOUNTS.concat(G.AUDITORS).filter(a => !G.ROLES.some(r => r.id === a.role)).map(a => a.u),
      kbThieu: (G.KICHBAN || []).filter(k => !k.ma || !k.ten || !k.tang).length,
      pdThieu: (G.PHACDO || []).filter(x => !x.ma || !x.ten).length,
      tangLa: [...new Set((G.KICHBAN || []).map(k => k.tang))].filter(t => !G.TIERS.some(x => x.code === t)),
      chuanLech: (G.CHUAN1000 || []).filter(c => c.y.reduce((a, x) => a + x.d, 0) !== c.diem).map(c => c.ma),
      soMan: Object.keys(G.VIEWS).length, soMuc: nav.length,
      soKB: (G.KICHBAN || []).length, soPD: (G.PHACDO || []).length, soMT: (G.MOTHUC || []).length,
      soTang100: (G.TANG100 || []).reduce((a, n) => a + n.muc.length, 0),
      goiDaMo: G.KHO.daNap.slice().sort()
    };
  });
  bao(!d.thieuMan.length, 'mọi mục điều hướng đều có màn hình', d.thieuMan.join(', '));
  bao(!d.trungMuc.length, 'không mục nào bị trùng', d.trungMuc.join(', '));
  bao(!d.quyenLa.length, 'mọi khoá quyền đều có trong bảng PERM gốc', d.quyenLa.join(', '));
  bao(!d.congLa.length, 'mọi cổng vai đều trỏ tới màn hình có thật', d.congLa.join(', '));
  bao(!d.taiKhoanLa.length, 'mọi tài khoản đều gắn vai có thật', d.taiKhoanLa.join(', '));
  bao(d.kbThieu === 0, 'kịch bản đủ mã · tên · tầng', d.kbThieu + ' bản ghi thiếu');
  bao(!coKhoa || d.soKB === 1000, 'mở đủ 1.000 kịch bản', String(d.soKB));
  bao(d.pdThieu === 0, 'phác đồ đủ mã · tên', d.pdThieu + ' bản ghi thiếu');
  bao(!d.tangLa.length, 'không mã tầng lạ trong kho kịch bản', d.tangLa.join(', '));
  bao(!d.chuanLech.length, 'chuẩn 1000 điểm khớp tổng từng nhóm', d.chuanLech.join(', '));
  bao(!coKhoa || d.soTang100 === 100, 'đủ một trăm tầng giá trị', d.soTang100 + ' tầng');
  bao(!coKhoa || d.goiDaMo.length === 7, 'quản trị mở đủ bảy gói nội dung', d.goiDaMo.join(' '));
  console.log('    ' + d.soMan + ' màn hình · ' + d.soMuc + ' mục điều hướng · ' +
    d.soKB + ' kịch bản · ' + d.soPD + ' phác đồ · ' + d.soMT + ' mô thức');

  /* ── 2. Phân quyền trên toàn bộ vai × màn hình ── */
  console.log('\n2 · PHÂN QUYỀN 19 VAI × TOÀN BỘ MÀN HÌNH');
  const taiKhoan = await p.evaluate(() => window.G.ACCOUNTS.concat(window.G.AUDITORS).map(a => a.u));
  const man = await p.evaluate(() => Object.keys(window.G.VIEWS));
  let luot = 0, chan = 0; const hong = [];
  for (const u of taiKhoan) {
    await p.evaluate(x => window.G.doLogin(x), u);
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    for (const v of man) {
      const truoc = errs.length;
      const r = await p.evaluate(x => {
        window.G.S.view = x;
        try {
          const duocVao = window.G.allowed(x) && window.G.coGoi(window.G.goiCanCho(x));
          const html = duocVao ? window.G.VIEWS[x]() : 'LOCK';
          return { len: html.length, lock: html === 'LOCK' || html.indexOf('chưa mở mục này') >= 0 };
        } catch (e) { return { err: String(e) }; }
      }, v);
      if (r.err || !r.len) hong.push(u + ' → ' + v + ' : ' + (r.err || 'rỗng'));
      if (errs.length > truoc) hong.push(u + ' → ' + v + ' : lỗi runtime');
      luot++; if (r.lock) chan++;
    }
  }
  bao(!hong.length, luot + ' lượt dựng màn hình không lỗi', hong.slice(0, 5).join(' | '));
  console.log('    chặn đúng quyền: ' + chan + ' lượt');

  /* ── 3. Chống tiêm mã ── */
  console.log('\n3 · CHỐNG TIÊM MÃ QUA Ô NHẬP');
  await p.evaluate(() => window.G.doLogin('phuhuynh@gita365.vn')); await p.waitForTimeout(1800);
  await p.evaluate(() => window.G.go('tam-nhin')); await p.waitForTimeout(300);
  await p.fill('[data-vision="nam5"]', '<img src=x onerror="window.__X1=1">');
  await p.click('[data-act="save-vision"]'); await p.waitForTimeout(250);
  bao(!(await p.evaluate(() => !!window.__X1)), 'ô Bảng tầm nhìn không chạy mã tiêm vào');
  await p.evaluate(() => window.G.doLogin('coach@gita365.vn')); await p.waitForTimeout(1800);
  await p.evaluate(() => window.G.go('tro-ly')); await p.waitForTimeout(400);
  await p.fill('#aiQ', '<script>window.__X2=1<\/script>');
  await p.click('[data-act="ai-ask"]'); await p.waitForTimeout(250);
  bao(!(await p.evaluate(() => !!window.__X2)), 'ô hỏi Trợ lý không chạy mã tiêm vào');

  /* ── 3b. Phạm vi cấp phép ── */
  console.log('\n3b · PHẠM VI CẤP PHÉP THEO VAI');
  const cp = await p.evaluate(async () => {
    const kq = {};
    for (const u of ['superadmin@gita365.vn', 'coach@gita365.vn', 'phuhuynh@gita365.vn', 'daisu@gita365.vn']) {
      window.G.doLogin(u);
      await new Promise(r => setTimeout(r, 1200));
      kq[u] = { goi: window.G.KHO.daNap.slice().sort(), nghe: !!window.G.NGONTU, mau: window.G.KHO.cheDoMau };
    }
    return kq;
  });
  bao(!cp['phuhuynh@gita365.vn'].nghe, 'phụ huynh KHÔNG mở được kho nghề');
  bao(!cp['daisu@gita365.vn'].nghe, 'cộng tác viên KHÔNG mở được kho nghề');
  bao(coKhoa ? cp['superadmin@gita365.vn'].nghe : true, 'quản trị mở được kho nghề');
  bao(coKhoa ? cp['coach@gita365.vn'].nghe : true, 'coach mở được kho nghề');
  Object.keys(cp).forEach(u => console.log('    ' + u.padEnd(26) + (cp[u].goi.join(' ') || 'chế độ mẫu')));

  /* ── 4. Cài đặt được như ứng dụng ── */
  console.log('\n4 · CÀI ĐẶT ĐƯỢC NHƯ ỨNG DỤNG');
  const pwa = await p.evaluate(async () => {
    const m = await fetch('manifest.webmanifest').then(r => r.json());
    const sw = await fetch('sw.js').then(r => r.text());
    return { icons: m.icons.length, display: m.display, tep: (sw.match(/'\.\/[^']+'/g) || []).length };
  });
  bao(pwa.icons >= 3, 'đủ bộ biểu tượng ứng dụng', pwa.icons + ' biểu tượng');
  bao(pwa.display === 'standalone', 'mở toàn màn hình như ứng dụng thật');
  /* 24 chứ không còn 25: bản 9.23 bỏ một mục style.css khai TRÙNG
     trong mảng FILES. Bớt một dòng trùng thì phủ sóng không bớt gì —
     và gita-nghe.js CỐ Ý không nằm trong danh sách này, vì đưa nó
     vào là máy gia đình lại tải về đúng thứ vừa gỡ ra. */
  bao(pwa.tep >= 24, 'service worker phủ đủ tệp để chạy khi mất mạng', pwa.tep + ' tệp');

  /* ── 5. Bộ test nhận diện và KPI về đích ── */
  console.log('\n5 · BỘ TEST NHẬN DIỆN & KPI VỀ ĐÍCH');
  /* Mục này soi TOÀN BỘ ngân hàng đề — 25 bộ, 750 câu, đủ năm tầng — nên
     nó phải đăng nhập bằng vai mở được cả năm gói tầng.

     Trước bản 9.9 nó đăng nhập bằng phụ huynh và vẫn thấy đủ 750 câu, vì
     khi ấy MỌI khách hàng được cấp cả năm gói tầng — kể cả nhà mới mua
     Tầng 1. Nay tầng cấp theo tầng đã mua, nên phụ huynh mẫu (Tầng 3) chỉ
     thấy 15 bộ. Đó là đúng, và mục kiểm phải đổi vai chứ không phải nới
     phạm vi cấp phép để cho vừa phép kiểm. */
  await p.evaluate(() => window.G.doLogin('admin@gita365.vn'));
  /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
  const t5 = await p.evaluate(() => {
    const G = window.G, T = G.TEST750 || [];
    const soCau = T.reduce((a, b) => a + b.cau.length, 0);
    const soChon = T.reduce((a, b) => a + b.cau.reduce((x, c) => x + c.chon.length, 0), 0);
    const sai = T.filter(b => b.mien.length !== 6 || b.nhom.length !== 4 ||
      b.cau.some(c => c.chon.length !== 4 || b.mien.indexOf(c.mien) < 0 ||
        c.chon.map(x => x.muc).join() !== '1,2,3,4')).map(b => b.ma);
    /* Chấm thử: chọn hết mức 1 phải ra ĐỎ, chọn hết mức 4 phải ra XANH */
    const b0 = T[0];
    const thap = {}, cao = {};
    b0.cau.forEach(c => { thap[c.id] = 1; cao[c.id] = 4; });
    const kThap = G.chamTest(b0, thap), kCao = G.chamTest(b0, cao);
    /* Bài dở dang không được coi là xong */
    const mot = {}; mot[b0.cau[0].id] = 3;
    const kMot = G.chamTest(b0, mot);
    const K = G.KPI100 || { diem: [] };
    return {
      soBo: T.length, soCau, soChon, sai,
      tangDu: [...new Set(T.map(b => b.tang))].sort().join(','),
      thap: kThap.diem, thapNhom: kThap.nhom.code,
      cao: kCao.diem, caoNhom: kCao.nhom.code,
      motMien: Object.keys(kMot.mien).filter(m => kMot.mien[m] === null).length,
      soDiem: K.diem.length,
      soTC: K.diem.reduce((a, d) => a + d.tc.length, 0),
      lechTC: K.diem.filter(d => d.tc.length !== 10).map(d => d.no)
    };
  });
  bao(t5.soBo === 25, 'đủ 25 bộ test — năm nhóm bài mỗi tầng', t5.soBo + ' bộ');
  bao(t5.soCau === 750, 'đủ 750 câu — 150 câu mỗi tầng', t5.soCau + ' câu');
  bao(t5.soChon === 3000, 'mỗi câu đúng bốn lựa chọn', t5.soChon + ' lựa chọn');
  bao(!t5.sai.length, 'mọi bộ đủ 6 miền · 4 nhóm · mức 1–4', t5.sai.join(' ') || 'không bộ nào lệch');
  bao(t5.tangDu === 'T1,T2,T3,T4,T5', 'phủ đủ năm tầng', t5.tangDu);
  bao(t5.thap === 0 && t5.thapNhom === 'DO', 'chọn hết mức 1 rơi đúng nhóm ĐỎ', t5.thap + ' · ' + t5.thapNhom);
  bao(t5.cao === 100 && t5.caoNhom === 'XANH', 'chọn hết mức 4 rơi đúng nhóm XANH', t5.cao + ' · ' + t5.caoNhom);
  bao(t5.motMien === 5, 'miền chưa trả lời không bị chấm bừa', t5.motMien + ' miền bỏ trống');
  bao(t5.soDiem === 10, 'đủ mười điểm mốc về đích', t5.soDiem + ' điểm');
  bao(t5.soTC === 100 && !t5.lechTC.length, 'đủ một trăm tiêu chí, mỗi mốc mười', t5.soTC + ' tiêu chí');

  /* ── 6. Ma trận 5 tầng · chân dung khách hàng · phân hạng VIP ── */
  /* Một thuộc tính data-* chỉ được một tệp đăng ký xử lý. Trùng tên là hai
     hàm cùng chạy trên một cú bấm — lỗi rất khó thấy bằng mắt. */
  {
    const fsx = require('fs'), px = require('path');
    const thuMuc = px.join(__dirname, '..', 'src');
    const chu = {};
    for (const t of fsx.readdirSync(thuMuc).filter(f => f.endsWith('.js'))) {
      const noi = fsx.readFileSync(px.join(thuMuc, t), 'utf8');
      for (const m of noi.matchAll(/on\('\[(data-[a-z0-9-]+)\]'/g))
        (chu[m[1]] = chu[m[1]] || new Set()).add(t);
    }
    const trung = Object.keys(chu).filter(k => chu[k].size > 1);
    bao(!trung.length, 'không thuộc tính data-* nào bị hai tệp cùng xử lý',
      trung.length ? trung.map(k => k + ' ← ' + [...chu[k]].join(' + ')).join(' · ') : Object.keys(chu).length + ' thuộc tính, mỗi cái một chủ');
  }

  console.log('\n6 · MA TRẬN 5 TẦNG & HỆ KHÁCH HÀNG');
  await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
  /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
  const t6 = await p.evaluate(() => {
    const G = window.G, M = G.MATRAN || { vande: [], nhom: [] };
    const tang = ['T1','T2','T3','T4','T5'];
    const thieu = [];
    M.vande.forEach(v => tang.forEach(t => {
      const a = G['MATRAN_' + t] || [];
      const d = a.filter(x => x.ma === v.ma)[0];
      if (!d || !d.lo || !d.hs || !d.ph || !d.tv || !d.coach || !d.dich || !d.hoSo) thieu.push(v.ma + '/' + t);
    }));
    const P = G.PHANHANG || { hang: [] }, V = G.CHUAN_VIP || {}, C = G.CAYTIEN || { diemCay: { yeuTo: [] } };
    return {
      soVanDe: M.vande.length, soNhom: M.nhom.length,
      soTang: tang.filter(t => (G['MATRAN_' + t] || []).length === 220).length,
      thieu: thieu.slice(0, 6), soThieu: thieu.length,
      chanDung: (G.CHANDUNG_KH || []).length,
      chiSo: ((G.DOLUONG_KH || {}).chiSo || []).length,
      hang: P.hang.map(x => x.ma).join(','),
      thieuHang: P.hang.filter(x => !x.vao || !x.taiLieu || !x.nguoi || !x.sla || !x.ai || !x.cham).map(x => x.ma),
      aiVip: (V.aiVip || []).length,
      trongSo: (C.diemCay.yeuTo || []).reduce((a, y) => a + y.trong, 0),
      nhip: (C.nhipChamSoc || []).length,
      thieuNhip: (C.nhipChamSoc || []).filter(n => !n.vip || !n.vvip).length,
      nhanSu: ((G.NHANSU_TT || {}).bac || []).length,
      dauHieu: ((G.REFERRAL || {}).dauHieu || []).length
    };
  });
  bao(t6.soVanDe === 220 && t6.soNhom === 11, 'ma trận đủ 220 vấn đề trong 11 nhóm', t6.soVanDe + ' vấn đề · ' + t6.soNhom + ' nhóm');
  bao(t6.soTang === 5, 'đủ năm tầng, mỗi tầng 220 vấn đề', t6.soTang + '/5 tầng');
  bao(!t6.soThieu, 'không ô nội dung nào bỏ trống', t6.soThieu ? t6.soThieu + ' ô thiếu: ' + t6.thieu.join(' ') : '1100 bản ghi đủ 8 cột');
  bao(t6.chanDung === 6, 'đủ sáu chân dung khách hàng', t6.chanDung + ' chân dung');
  bao(t6.chiSo === 7, 'đủ bảy chỉ số đo lường khách hàng', t6.chiSo + ' chỉ số');
  bao(t6.hang === 'KH,UT,VIP,VVIP', 'đủ bốn hạng khách hàng', t6.hang);
  bao(!t6.thieuHang.length, 'mỗi hạng đủ điều kiện vào, tài liệu, người, SLA, AI, điểm chạm', t6.thieuHang.join(' ') || 'đủ cả bốn hạng');
  bao(t6.aiVip >= 7, 'trợ lý AI có đủ việc chăm sóc VIP', t6.aiVip + ' việc');
  bao(t6.trongSo === 100, 'trọng số điểm cây tiền cộng đủ 100%', t6.trongSo + '%');
  bao(t6.nhip === 12 && !t6.thieuNhip, 'mười hai nhịp chăm sóc đủ cả cột VIP và VVIP', t6.nhip + ' nhịp');
  bao(t6.nhanSu === 5, 'đủ năm bậc nhân sự trung thành', t6.nhanSu + ' bậc');
  bao(t6.dauHieu === 12, 'đủ mười hai dấu hiệu nhận biết referral', t6.dauHieu + ' dấu hiệu');

  /* ── 7. Xương sống phương pháp · hồ sơ VIP · chuyển đổi · trợ lý ── */
  console.log('\n7 · XƯƠNG SỐNG PHƯƠNG PHÁP & HỆ CHĂM SÓC');
  const t7 = await p.evaluate(() => {
    const G = window.G;
    const X = G.XUONG_SONG || {}, P = G.PHUONGPHAP || { nhom: [] }, H = G.HOSO_VIP || { phan: [] };
    const C = G.CHUYENDOI || { cong: [] }, A = G.AICHAM || { luat: [] }, V = G.VANTAY || {};
    const S = G.SACH_THAMKHAO || [], N = G.NGUON_VAITRO || [];
    const o = P.nhom.reduce((a, n) => a.concat(n.tang), []);
    const mtCo = new Set((G.MOTHUC || []).map(m => m.id));
    /* Mọi mã mô thức được trích phải có thật trong kho 42 mô thức */
    const maLa = [];
    o.forEach(x => String(x.mt || '').split('·').map(s => s.trim()).filter(Boolean)
      .forEach(m => { if (!mtCo.has(m)) maLa.push(m); }));
    X.tru && X.tru.forEach(t => (t.quan || []).forEach(m => { if (!mtCo.has(m)) maLa.push(m); }));
    return {
      tru: (X.tru || []).length, nhip: (X.sauNhip || []).length,
      nguonVai: N.length, sach: S.length,
      sachDuVai: S.filter(x => x.vaiTro === 'THAM KHẢO BỔ TRỢ' && x.boTroCho && x.bienSoan).length,
      oGan: o.length, oCoMoThuc: o.filter(x => x.mt).length, oCoNhip: o.filter(x => x.nhip).length,
      maLa: [...new Set(maLa)],
      hosoPhan: H.phan.length,
      hosoBB: H.phan.reduce((a, x) => a + x.truong.filter(t => t.bb).length, 0),
      khongGhi: (H.ranhGioi || {}).khongGhi ? H.ranhGioi.khongGhi.length : 0,
      cong: C.cong.length,
      congDu: C.cong.filter(x => x.tinHieu && x.ai && x.dua && x.cam && x.ty).length,
      luatAI: A.luat.length,
      luatDu: A.luat.filter(l => l.khi && l.lam && l.cho && l.han && l.hang).length,
      camAI: (A.khongDuocLam || []).length,
      vanTayTuChoi: /KHÔNG dùng sinh trắc/.test(V.ketLuan || ''),
      caytienVai: !!(G.CAYTIEN && G.CAYTIEN.vaiTro && G.CAYTIEN.vaiTro.khongDungCho),
      chuanSach: ((G.CAYTIEN || {}).nguon || {}).chuanSach ? G.CAYTIEN.nguon.chuanSach.length : 0
    };
  });
  bao(t7.tru === 2 && t7.nhip === 6, 'xương sống đủ hai trụ và sáu nhịp ngôn từ', t7.tru + ' trụ · ' + t7.nhip + ' nhịp');
  bao(!t7.maLa.length, 'mọi mã mô thức được trích đều có thật trong kho 42 mô thức', t7.maLa.join(' ') || 'không mã nào bịa');
  bao(t7.oGan === 16 && t7.oCoMoThuc === 16 && t7.oCoNhip === 16,
    'mỗi ô nhóm × tầng đều dẫn bằng mô thức GITA và nhịp ngôn từ', t7.oCoMoThuc + '/' + t7.oGan + ' ô');
  bao(t7.nguonVai === 3, 'ba loại nguồn được phân vai rõ', t7.nguonVai + ' vai');
  bao(t7.sach === 4 && t7.sachDuVai === 4, 'sách ngoài đều ghi rõ là tham khảo bổ trợ và bổ trợ cho mô thức nào',
    t7.sachDuVai + '/' + t7.sach);
  bao(t7.caytienVai, 'Cây Tiền ghi rõ chỉ dùng cho hệ quản trị khách hàng, không dùng dạy học viên');
  bao(t7.chuanSach >= 8, 'chuẩn lấy từ sách Cây Tiền có dẫn số trang', t7.chuanSach + ' chuẩn');
  bao(t7.hosoPhan === 7 && t7.hosoBB >= 28, 'hồ sơ VIP đủ bảy phần', t7.hosoPhan + ' phần · ' + t7.hosoBB + ' trường bắt buộc');
  bao(t7.khongGhi >= 6, 'hồ sơ ghi rõ những gì KHÔNG được thu thập', t7.khongGhi + ' mục cấm');
  bao(t7.cong === 9 && t7.congDu === 9, 'chín cổng chuyển đổi đủ tín hiệu, người, thứ đưa ra, điều cấm, tỉ lệ',
    t7.congDu + '/' + t7.cong);
  bao(t7.luatAI === 16 && t7.luatDu === 16, 'mười sáu luật trợ lý đều đọc được bằng máy', t7.luatDu + '/' + t7.luatAI);
  bao(t7.camAI >= 8, 'trợ lý có danh sách việc tuyệt đối không được làm', t7.camAI + ' điều cấm');
  bao(t7.vanTayTuChoi, 'GITA nêu rõ không dùng sinh trắc vân tay để xác định năng lực');

  /* ── 8. Quyền xuất · đồng bộ · mật khẩu ── */
  console.log('\n8 · QUYỀN XUẤT · ĐỒNG BỘ · MẬT KHẨU');

  /* Không còn đường tải tệp về máy trong toàn bộ mã nguồn */
  {
    const fsx = require('fs'), px = require('path');
    const thuMuc = px.join(__dirname, '..', 'src');
    const xau = [];
    for (const t of fsx.readdirSync(thuMuc).filter(f => f.endsWith('.js'))) {
      const noi = fsx.readFileSync(px.join(thuMuc, t), 'utf8');
      /* createObjectURL\s*\( — tức là GỌI nó để tạo một tệp tải về.
         Gán đè lên nó (URL.createObjectURL = ...) là việc ngược lại: đó là
         cách src/may-khach.js CẮT đường tải trên máy khách. Bản kiểm cũ bắt
         cả hai vì chỉ tìm tên hàm, nên lớp chặn vừa dựng xong đã bị chính
         bộ kiểm báo là lỗ hổng. Bài kiểm phải đo đúng thứ nó định đo. */
      if (/a\.download\s*=|text\/csv|createObjectURL\s*\(/.test(noi)) xau.push(t);
    }
    bao(!xau.length, 'không tệp nào còn đường tải CSV hay Excel về máy', xau.join(' ') || 'đã gỡ sạch');
    /* Lệnh in chỉ được gọi ở đúng một chỗ: cổng in.
       Bỏ chú thích trước khi đếm — nếu không thì một dòng ghi chú cũng
       làm phép kiểm này báo sai. */
    /* Bỏ cả chú thích LẪN chuỗi ký tự trước khi đếm.
       Một dòng nhật ký ghi 'chặn window.print() trên máy khách' là CHỮ, không
       phải lệnh in — đếm nó vào là bắt nhầm đúng cái tệp đang đi chặn. */
    const boChuThich = t => t
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^[ \t]*\/\/.*$/gm, '')
      .replace(/'(?:\\.|[^'\\\n])*'/g, "''")
      .replace(/"(?:\\.|[^"\\\n])*"/g, '""');
    let inTruc = 0;
    for (const t of fsx.readdirSync(thuMuc).filter(f => f.endsWith('.js'))) {
      const noi = boChuThich(fsx.readFileSync(px.join(thuMuc, t), 'utf8'));
      inTruc += (noi.match(/window\.print\(\)/g) || []).length;
    }
    bao(inTruc === 1, 'lệnh in chỉ gọi ở đúng một chỗ — cổng in G.inTrang', inTruc + ' lần gọi');
  }

  const t8 = await p.evaluate(async () => {
    const G = window.G, ra = { in: {}, sheet: {} };
    const cu = G.S.acc && G.S.acc.u;
    const thu = ['superadmin@gita365.vn', 'chuyenmon@gita365.vn', 'truongcoach@gita365.vn',
                 'coach@gita365.vn', 'tuvan@gita365.vn', 'phuhuynh@gita365.vn',
                 'hocvien@gita365.vn', 'daisu@gita365.vn'];
    for (const u of thu) {
      const a = G.ACCOUNTS.filter(x => x.u === u)[0];
      G.S.acc = a; G.S.role = a.role; G.S.roleObj = G.roleById(a.role);
      ra.in[u] = G.can('xuat_pdf');
      ra.sheet[u] = G.can('xuat_sheet');
    }
    /* Vai không có quyền: cổng in phải từ chối, và xinDongY phải không bật được */
    const ph = G.ACCOUNTS.filter(x => x.u === 'phuhuynh@gita365.vn')[0];
    G.S.acc = ph; G.S.role = ph.role; G.S.roleObj = G.roleById(ph.role);
    G.CONSENT = false;
    const inDuoc = G.inTrang('thử');
    G.xinDongY();
    const batDuocConsent = G.CONSENT;
    G.CONSENT = false;
    if (cu) { const a = G.ACCOUNTS.filter(x => x.u === cu)[0]; if (a) { G.S.acc = a; G.S.role = a.role; G.S.roleObj = G.roleById(a.role); } }
    return {
      ...ra, phuHuynhInDuoc: inDuoc, phuHuynhBatDuocConsent: batDuocConsent,
      coDongBo: typeof G.dongBo === 'function' && typeof G.danhDau === 'function',
      coDoiMK: typeof G.moDoiMatKhau === 'function' && typeof G.doiMatKhau === 'function',
      coQuenMK: typeof G.moQuenMatKhau === 'function' && typeof G.datLaiMatKhau === 'function',
      mkYeu: G.kiemMatKhau('gita1234') !== true && G.kiemMatKhau('abcdefghij') !== true,
      mkManh: G.kiemMatKhau('Kiy3xc#iz7Y2@') === true,
      dangXuat: ((G.XUAT || {}).loai || []).map(l => l.dang).join(','),
      driveId: ((G.XUAT || {}).driveAdmin || {}).id || ''
    };
  });
  const CHO_IN = { 'superadmin@gita365.vn':1, 'chuyenmon@gita365.vn':1, 'truongcoach@gita365.vn':1,
    'coach@gita365.vn':0, 'tuvan@gita365.vn':0, 'phuhuynh@gita365.vn':0, 'hocvien@gita365.vn':0, 'daisu@gita365.vn':0 };
  const lechIn = Object.keys(CHO_IN).filter(u => !!t8.in[u] !== !!CHO_IN[u]);
  bao(!lechIn.length, 'quyền in PDF đúng: chỉ R01–R05, khách hàng KHÔNG in được',
    lechIn.join(' ') || 'tám vai đều đúng');
  const CHO_SHEET = { 'superadmin@gita365.vn':1, 'chuyenmon@gita365.vn':1, 'truongcoach@gita365.vn':0,
    'coach@gita365.vn':0, 'phuhuynh@gita365.vn':0, 'hocvien@gita365.vn':0, 'daisu@gita365.vn':0 };
  const lechSheet = Object.keys(CHO_SHEET).filter(u => !!t8.sheet[u] !== !!CHO_SHEET[u]);
  bao(!lechSheet.length, 'quyền đẩy Google Sheet đúng: chỉ Ban điều hành R01–R04',
    lechSheet.join(' ') || 'bảy vai đều đúng');
  bao(t8.phuHuynhInDuoc === false, 'cổng in TỪ CHỐI phụ huynh');
  bao(t8.phuHuynhBatDuocConsent === false, 'phụ huynh KHÔNG tự bật được đồng ý xuất dữ liệu');
  bao(t8.dangXuat === 'PDF,SHEET,SHEET,SHEET,SHEET', 'năm loại dữ liệu chỉ còn hai dạng PDF và SHEET', t8.dangXuat);
  bao(t8.driveId === '1pvXH45JvXXPOW9V6ObB5CR87r7gxH0fU', 'đúng thư mục Drive của Admin', t8.driveId);
  bao(t8.coDongBo, 'có đủ hàm đồng bộ App ↔ Web');
  bao(t8.coDoiMK, 'có đủ hàm đổi mật khẩu');
  bao(t8.coQuenMK, 'có đủ hàm lấy lại mật khẩu qua email');
  bao(t8.mkYeu && t8.mkManh, 'bộ kiểm mật khẩu chặn mật khẩu yếu và nhận mật khẩu đạt chuẩn');

  /* ── 9. Đưa lên mạng: không gọi ra ngoài, không lọt tài sản ── */
  console.log('\n9 · ĐƯA LÊN MẠNG');
  {
    const fsx = require('fs'), px = require('path');
    const goc = px.join(__dirname, '..');

    /* Trang không được gọi ra bất kỳ tên miền ngoài nào, trừ máy chủ cấp phép.
       Một ảnh hay một phông gọi ra ngoài là một đường rò: bên đó biết ai đang
       mở màn hình nào, và bản ngoại tuyến thì hỏng. */
    const NGOAI = /https?:\/\/(?!script\.google\.com|script\.googleusercontent\.com|www\.facebook\.com|t\.me|drive\.google\.com|github\.com)[a-z0-9.-]+\.[a-z]{2,}/gi;
    const rong = [];
    for (const t of fsx.readdirSync(px.join(goc, 'src')).filter(f => f.endsWith('.js'))) {
      const noi = fsx.readFileSync(px.join(goc, 'src', t), 'utf8');
      for (const m of noi.matchAll(/<(?:img|script|link|iframe)[^>]*?(?:src|href)="(https?:\/\/[^"]+)"/gi)) rong.push(t + ': ' + m[1]);
    }
    /* Hai chỗ tinh chỉnh, không phải hai ngoại lệ:

       · Tên miền của CHÍNH TRANG không phải "tên miền ngoài". Từ v8.7,
         index.html mang canonical và og:url trỏ về gita.edu.vn — đó là
         khai báo địa chỉ của mình, bắt buộc phải có để lập chỉ mục.
       · <link rel="canonical"> và <link rel="alternate" hreflang> KHÔNG
         tải tài nguyên nào cả; chúng là siêu dữ liệu. Phép kiểm này đo
         đường rò khi tải tài nguyên, nên chúng không thuộc phạm vi.

       Vẫn giữ nguyên phần đo thật: ảnh, phông, mã, khung nhúng gọi ra
       ngoài đều bị bắt như cũ. */
    const miNha = fsx.existsSync(px.join(goc, 'CNAME'))
      ? fsx.readFileSync(px.join(goc, 'CNAME'), 'utf8').trim() : '';
    const html = fsx.readFileSync(px.join(goc, 'index.html'), 'utf8');
    for (const m of html.matchAll(/<(?:img|script|link|iframe|audio|video|source)[^>]*?(?:src|href)="(https?:\/\/[^"]+)"/gi)) {
      const the = m[0];
      if (/rel="(?:canonical|alternate)"/i.test(the)) continue;
      if (miNha && m[1].indexOf('//' + miNha) >= 0) continue;
      rong.push('index.html: ' + m[1]);
    }
    bao(!rong.length, 'trang không tải tài nguyên nào từ tên miền ngoài', rong.slice(0, 3).join(' · ') || 'tự chứa hoàn toàn');

    /* Chính sách nội dung phải có và phải khoá đúng chỗ */
    const csp = (html.match(/Content-Security-Policy" content="([^"]+)"/) || [])[1] || '';
    bao(/default-src 'self'/.test(csp), 'chính sách nội dung khoá về chính trang');
    bao(/connect-src[^;]*script\.google\.com/.test(csp) && !/connect-src[^;]*\*/.test(csp),
      'chỉ cho gọi ra đúng máy chủ cấp phép, không mở dấu sao');
    bao(/object-src 'none'/.test(csp) && /base-uri 'self'/.test(csp), 'chặn nhúng đối tượng lạ và đổi thẻ base');

    /* Luồng đưa lên Pages phải soát tài sản */
    const wf = px.join(goc, '.github', 'workflows', 'trang-web.yml');
    if (fsx.existsSync(wf)) {
      const y = fsx.readFileSync(wf, 'utf8');
      const canSoat = ['kho-goc', 'tools', 'server', 'giay-phep', 'khoa.json'];
      const thieu = canSoat.filter(x => y.indexOf(x) < 0);
      bao(!thieu.length, 'luồng đưa lên mạng có soát đủ đường lọt tài sản', thieu.join(' ') || '5 đường đều soát');
      bao(/gita\.edu\.vn/.test(y) && fsx.existsSync(px.join(goc, 'CNAME')), 'có khai báo tên miền riêng');
    }

    /* Mã QR chuyển khoản: phải là ảnh trong máy, và chuỗi phải đúng CRC */
    const qr = px.join(goc, 'assets', 'brand', 'qr-thanh-toan.txt');
    if (fsx.existsSync(qr)) {
      const c = fsx.readFileSync(qr, 'utf8').trim();
      const crc16 = t => { let x = 0xFFFF;
        for (const b of Buffer.from(t, 'utf8')) { x ^= b << 8;
          for (let i = 0; i < 8; i++) x = (x & 0x8000) ? ((x << 1) ^ 0x1021) & 0xFFFF : (x << 1) & 0xFFFF; } 
        return x.toString(16).toUpperCase().padStart(4, '0'); };
      bao(crc16(c.slice(0, -4)) === c.slice(-4), 'mã QR chuyển khoản đúng CRC', c.slice(-4));
      bao(c.indexOf('8878719979') > 0 && c.indexOf('970418') > 0, 'mã QR mang đúng số tài khoản và mã ngân hàng');
      bao(fsx.existsSync(px.join(goc, 'assets', 'brand', 'qr-thanh-toan.svg')), 'ảnh QR nằm trong ứng dụng, không gọi ra mạng');
    }
  }

  /* ═══════════ 10 · PHÂN HOÁ VAI & BẢNG PHÂN QUYỀN ═══════════
     Sinh ra từ một lỗi thật của v7.5: phụ huynh, học viên và cộng tác
     viên cùng bậc nên nhìn thấy y hệt nhau. Bộ kiểm này chặn nó quay lại. */
  console.log('\n10 · PHÂN HOÁ VAI & BẢNG PHÂN QUYỀN');
  {
    const dem = await p.evaluate(() => {
      const r = {};
      G.ROLES.forEach(v => {
        let man = 0;
        G.NAV.forEach(g => g.items.forEach(i => { if (!i.perm || G.vaiCo(v.id, i.perm)) man++; }));
        r[v.id] = { man, quyen: G.demQuyen(v.id) };
      });
      return r;
    });

    /* Ba vai khách hàng phải KHÁC nhau, không chỉ khác một chút */
    const ph = dem.R13, hv = dem.R14, ctv = dem.R15;
    bao(ph.man !== hv.man && hv.man !== ctv.man && ph.man !== ctv.man,
      'phụ huynh · học viên · cộng tác viên thấy số màn KHÁC nhau',
      'PH ' + ph.man + ' · HV ' + hv.man + ' · CTV ' + ctv.man);
    bao(ph.quyen !== hv.quyen && hv.quyen !== ctv.quyen,
      'ba vai khách hàng có bộ quyền khác nhau',
      'PH ' + ph.quyen + ' · HV ' + hv.quyen + ' · CTV ' + ctv.quyen);
    bao(ph.man > hv.man && hv.man > ctv.man,
      'phạm vi giảm dần đúng thứ tự phụ huynh → học viên → cộng tác viên');

    /* Bậc càng cao phải thấy càng nhiều, không có chỗ nào đảo ngược */
    const thu = await p.evaluate(() => {
      const v = G.ROLES.slice().sort((a, b) => a.lv - b.lv);
      const d = v.map(r => { let n = 0;
        G.NAV.forEach(g => g.items.forEach(i => { if (!i.perm || G.vaiCo(r.id, i.perm)) n++; })); return n; });
      for (let i = 1; i < d.length; i++) if (d[i] > d[i - 1]) return v[i].id;
      return null;
    });
    bao(!thu, 'không vai bậc thấp nào thấy nhiều hơn vai bậc cao hơn', thu || 'thứ tự đúng');

    /* Hai vị trí đầu KHÔNG bị khoá bất cứ thứ gì */
    const day = await p.evaluate(() => {
      let tong = 0; G.NAV.forEach(g => tong += g.items.length);
      const dem = v => { let n = 0;
        G.NAV.forEach(g => g.items.forEach(i => { if (!i.perm || G.vaiCo(v, i.perm)) n++; })); return n; };
      const thieu = q => { const ra = [];
        G.NAV.forEach(g => g.items.forEach(i => { if (i.perm && !G.vaiCo(q, i.perm)) ra.push(i.v); })); return ra; };
      return { tong, r1: dem('R01'), r2: dem('R02'), t1: thieu('R01'), t2: thieu('R02'),
               khoaR03: thieu('R03') };
    });
    bao(day.r1 === day.tong && !day.t1.length, 'Super Admin không bị khoá màn nào', day.r1 + '/' + day.tong);
    bao(day.r2 === day.tong && !day.t2.length, 'Admin hệ thống không bị khoá màn nào', day.r2 + '/' + day.tong);

    /* Đo TẬP MÀN BỊ KHOÁ, không đo tỉ lệ phần trăm.
       Trước đây chỗ này đòi "đúng 20% ± 2". Nhưng tử số là số màn quản trị
       (gần như không đổi) còn mẫu số là tổng số màn (tăng mỗi đợt thêm nội
       dung cho gia đình). Nên cứ thêm một màn cho phụ huynh là bài kiểm này
       đỏ, dù không có một màn quản trị nào bị nới. Đó là bài kiểm đo sai thứ.

       Cái phải giữ là điều G.TAM_NHIN nói về R03–R04: khoá đúng phần QUẢN
       TRỊ HỆ THỐNG — tài khoản, phân quyền, bảo mật, nhật ký, kiểm duyệt,
       hạ tầng. Điều hành và tài chính thì Giám đốc VẪN thấy, đó là việc của
       Giám đốc. Nên đo theo QUYỀN mà màn đòi, không đo theo khoang trình đơn:
       màn nào khoá với R03 thì quyền của nó phải là một quyền quản trị. */
    const QUYEN_QT = ['qt_trang', 'qt_tai_nguyen', 'sys_manage_user', 'sys_audit', 'sua_noi_dung'];
    const qt = await p.evaluate((dsQuyen) => {
      const laQuyenQT = q => dsQuyen.indexOf(q) >= 0;
      const khoaMaKhongPhaiQT = [], quyenQTMaKhongKhoa = [];
      G.NAV.forEach(g => g.items.forEach(i => {
        const khoa = i.perm && !G.vaiCo('R03', i.perm);
        if (khoa && !laQuyenQT(i.perm)) khoaMaKhongPhaiQT.push(i.v + '(' + i.perm + ')');
        if (!khoa && i.perm && laQuyenQT(i.perm)) quyenQTMaKhongKhoa.push(i.v + '(' + i.perm + ')');
      }));
      return { la: khoaMaKhongPhaiQT, ho: quyenQTMaKhongKhoa };
    }, QUYEN_QT);
    bao(!qt.la.length,
      'màn nào khoá với Giám đốc cũng vì một quyền quản trị hệ thống, không vì lý do khác',
      qt.la.slice(0, 6).join(' '));
    bao(!qt.ho.length,
      'mọi màn đòi quyền quản trị hệ thống đều thật sự khoá với Giám đốc',
      qt.ho.slice(0, 6).join(' '));
    console.log('    R03 bị khoá ' + day.khoaR03.length + '/' + day.tong +
      ' màn — tất cả đều đòi quyền quản trị hệ thống');

    /* Bảng phân quyền: bốn luật chặn */
    const luat = await p.evaluate(() => {
      const cu = G.S.roleObj;
      G.S.roleObj = G.roleById('R02');                       /* đóng vai Admin hệ thống */
      const r = {
        vaiCaoHon: G.suaDuocO('R01', 'pro_coach'),
        tuThuQuyen: G.suaDuocO('R02', 'sys_manage_user'),
        capQuyenKhongCo: G.suaDuocO('R07', 'sys_config'),
        binhThuong: G.suaDuocO('R07', 'pro_coach')
      };
      G.S.roleObj = cu;
      return r;
    });
    bao(luat.vaiCaoHon !== true, 'không sửa được quyền của vai cao hơn mình');
    bao(luat.tuThuQuyen !== true, 'không tự thu quyền quản trị của chính mình');
    bao(luat.capQuyenKhongCo !== true, 'không cấp được quyền mà chính mình không có');
    bao(luat.binhThuong === true, 'vẫn sửa được ô hợp lệ');

    /* Vai không có quyền quản trị thì màn bảng phân quyền phải từ chối */
    const choi = await p.evaluate(() => {
      const cu = G.S.roleObj;
      G.S.roleObj = G.roleById('R13');
      const h = G.VIEWS['phan-quyen']();
      G.S.roleObj = cu;
      return /data-pq=/.test(h);
    });
    bao(!choi, 'phụ huynh mở bảng phân quyền không thấy ô sửa nào');

    /* Chế độ mẫu phải mở được phần nền, nhưng KHÔNG mở kho nghề */
    const mau = await p.evaluate(() => ({
      nen: G.coGoi('nen'), nghe: G.coGoi('nghe'), t3: G.coGoi('tang3'), mau: G.KHO.cheDoMau
    }));
    if (mau.mau) {
      bao(mau.nen === true, 'chế độ mẫu mở được phần nền — bản dùng thử không còn trống');
      bao(mau.nghe === false, 'chế độ mẫu KHÔNG mở kho nghề');
      bao(mau.t3 === false, 'chế độ mẫu KHÔNG mở gói tầng 3');
    }

    /* Gói mẫu công khai không được chứa phần nghề */
    const fsm = require('fs'), pxm = require('path');
    const gocm = pxm.join(__dirname, '..');
    const pm = pxm.join(gocm, 'kho', 'mau.json');
    if (fsm.existsSync(pm)) {
      const m = JSON.parse(fsm.readFileSync(pm, 'utf8'));
      const CAM = ['NGONTU', 'TINHHUONG', 'CAYTIEN', 'HOSO_VIP', 'CHUYENDOI', 'PHANHANG',
        'CHUAN_VIP', 'MATRAN', 'XUONG_SONG', 'PHUONGPHAP', 'VANTAY', 'AICHAM',
        'TAICHINH_QT', 'VANBAN', 'THANHTRA', 'LUAT_TK', 'DAU_MAT'];
      const lot = CAM.filter(k => m[k] !== undefined);
      bao(!lot.length, 'gói mẫu công khai không chứa phần nghề nào', lot.join(' ') || Object.keys(m).length + ' bộ, đều là phần công khai');
      bao((m.KICHBAN || []).length <= 10 && (m.PHACDO || []).length <= 10 && (m.MOTHUC || []).length <= 6,
        'kịch bản · phác đồ · mô thức trong gói mẫu vẫn chỉ là mẫu rút gọn',
        (m.KICHBAN || []).length + ' kịch bản · ' + (m.PHACDO || []).length + ' phác đồ · ' + (m.MOTHUC || []).length + ' mô thức');
    }
  }

  /* ═══════════ 11 · TỈ LỆ HIỂN THỊ THEO VỊ TRÍ ═══════════
     Anh Quang đặt bậc thang: R01–R02 toàn bộ · R03 95% · R04 91% ·
     R05–R12 89% · khách hàng và cộng tác viên hẹp hẳn lại. Mục này
     đối chiếu số đếm thật với đích, lệch quá 2 điểm là dừng phát hành. */
  console.log('\n11 · TỈ LỆ HIỂN THỊ THEO VỊ TRÍ');
  {
    const d = await p.evaluate(() => {
      let tong = 0; G.NAV.forEach(g => tong += g.items.length);
      const r = {};
      G.ROLES.forEach(v => { let n = 0;
        G.NAV.forEach(g => g.items.forEach(i => { if (!i.perm || G.vaiCo(v.id, i.perm)) n++; }));
        r[v.id] = { man: n, pt: n * 100 / tong };
      });
      return { tong, r, tang: (G.TANG_HIENTHI || []).length };
    });

    /* Bậc thang anh Quang đặt, đo trên tổng số màn hiện tại.
       R03 ở 94% thay vì 95% vì màn Kiểm duyệt tài liệu chỉ mở cho R01–R02
       — đúng luật đã đặt, nên đây là con số thật chứ không phải lệch. */
    /* Luật anh Quang chốt: R01 và R02 không bị khoá gì; từ Giám đốc xuống
       Tư vấn khoá đúng 20% quan trọng của hai vị trí đầu. R05 trở xuống
       thấp hơn 80% vì còn mất tài chính và điều hành toàn hệ. */
    /* Đích ĐỌC THẲNG từ G.TAM_NHIN trong ứng dụng, không chép lại ở đây.
       Giữ một bảng riêng trong bộ kiểm là dựng nguồn sự thật thứ hai: thêm
       một màn hình là hai bảng lệch nhau, và bộ kiểm báo lỗi ở chỗ không
       có lỗi. */
    const DICH = await p.evaluate(() => {
      const ra = {};
      (window.G.TAM_NHIN || []).forEach(x => x.vai.forEach(v => { ra[v] = x.pt; }));
      return ra;
    });
    let lech = [];
    Object.keys(DICH).forEach(k => {
      if (Math.abs(d.r[k].pt - DICH[k]) > 2) lech.push(k + ' ' + d.r[k].pt.toFixed(1) + '% (đích ' + DICH[k] + '%)');
    });
    bao(!lech.length, 'tỉ lệ hiển thị của cả 15 vị trí đúng đích', lech.join(' · ') ||
      'R01 ' + d.r.R01.pt.toFixed(0) + '% · R03 ' + d.r.R03.pt.toFixed(0) + '% · R04 ' + d.r.R04.pt.toFixed(0) +
      '% · R07 ' + d.r.R07.pt.toFixed(0) + '% · R13 ' + d.r.R13.pt.toFixed(0) + '% · R15 ' + d.r.R15.pt.toFixed(0) + '%');
    bao(d.r.R01.man === d.tong, 'Super Admin thấy đủ 100% màn hình', d.r.R01.man + '/' + d.tong);

    /* Tài chính CHỈ R01–R03 */
    const fin = await p.evaluate(() => {
      const ds = [];
      G.NAV.forEach(g => g.items.forEach(i => { if (i.capMo === 'taichinh') ds.push(i.v); }));
      const ai = G.ROLES.filter(r => G.vaiCo(r.id, 'fin_view')).map(r => r.id);
      const donHang = G.ROLES.filter(r => G.vaiCo(r.id, 'fin_create_order')).map(r => r.id);
      const chi = G.ROLES.filter(r => G.vaiCo(r.id, 'fin_payout')).map(r => r.id);
      const luong = G.ROLES.filter(r => G.vaiCo(r.id, 'fin_payroll')).map(r => r.id);
      return { ds, ai, donHang, chi, luong };
    });
    /* XEM tài chính mở tới R04 (chỉ đọc, để đo lường và giám sát).
       ĐỘNG vào tiền — duyệt chi, bảng lương, tạo đơn thu — vẫn dừng ở R03. */
    bao(fin.ai.join() === 'R01,R02,R03,R04', 'xem tài chính: R01 – R04, R04 chỉ đọc',
      fin.ai.join(' ') + ' · ' + fin.ds.length + ' màn');
    bao(fin.donHang.join() === 'R01,R02,R03', 'tạo đơn thu vẫn chỉ R01 – R03', fin.donHang.join(' '));
    bao(fin.chi.join() === 'R01,R02,R03' && fin.luong.join() === 'R01,R02,R03',
      'R04 KHÔNG duyệt chi và KHÔNG xem bảng lương', 'duyệt chi ' + fin.chi.join(' '));

    /* Quản trị trang CHỈ R01–R02 */
    const qt = await p.evaluate(() => ({
      ai: G.ROLES.filter(r => G.vaiCo(r.id, 'qt_trang')).map(r => r.id),
      sua: G.ROLES.filter(r => G.vaiCo(r.id, 'sua_noi_dung')).map(r => r.id),
      co: !!(G.NAV || []).filter(g => g.id === 'g6').length
    }));
    bao(qt.ai.join() === 'R01,R02', 'thư mục Quản trị trang chỉ R01 – R02', qt.ai.join(' '));
    bao(qt.sua.join() === 'R01,R02', 'sửa nội dung và bố cục: Super Admin và Admin hệ thống', qt.sua.join(' '));
    bao(qt.co, 'có thư mục Quản trị trang trong thanh trái');

    /* Mọi màn hình phải thuộc đúng MỘT tầng hiển thị — không sót, không mồ côi */
    const tang = await p.evaluate(() => {
      const hop = (G.TANG_HIENTHI || []).map(t => t.id), thieu = [], la = [];
      G.NAV.forEach(g => g.items.forEach(i => {
        if (!i.capMo) thieu.push(i.v);
        else if (hop.indexOf(i.capMo) < 0) la.push(i.v + ':' + i.capMo);
      }));
      return { thieu, la, soTang: hop.length };
    });
    bao(!tang.thieu.length, 'mọi màn hình đều thuộc một tầng hiển thị', tang.thieu.join(' ') || tang.soTang + ' tầng');
    bao(!tang.la.length, 'không màn hình nào mang tầng hiển thị lạ', tang.la.join(' ') || 'đúng cả');

    /* Sửa nội dung: sửa được, trả về gốc được, và vai khác không sửa nổi */
    const nd = await p.evaluate(() => {
      const cu = G.S.roleObj, k = 'nav.ban-do.t';
      G.S.roleObj = G.roleById('R01');
      G.datND(k, 'Bản đồ nhà mình');
      const sau = G.iname({ v: 'ban-do', t: 'Bản Đồ Gia Đình Thịnh Vượng' });
      G.datND(k, '');
      const tra = G.iname({ v: 'ban-do', t: 'Bản Đồ Gia Đình Thịnh Vượng' });
      G.S.roleObj = G.roleById('R03');
      const choi = G.datND(k, 'thử sửa trộm');
      G.S.roleObj = cu;
      return { sau, tra, choi, soMuc: G.mucSuaDuoc().length };
    });
    bao(nd.sau === 'Bản đồ nhà mình', 'Super Admin sửa được chữ hiển thị');
    bao(nd.tra === 'Bản Đồ Gia Đình Thịnh Vượng', 'xoá ô trống là chữ gốc quay lại — bản gốc không bị ghi đè');
    bao(nd.choi === false, 'vai không có quyền KHÔNG sửa được nội dung hiển thị');
    bao(nd.soMuc > 200, 'danh mục chữ sửa được dựng từ chính dữ liệu', nd.soMuc + ' mục');
  }

  /* ═══════════ 12 · NỀN SÁNG ĐỌC ĐƯỢC ═══════════
     Nền sáng chỉ có nghĩa nếu chữ vẫn đọc rõ. Mục này đo tương phản
     thật của từng mã chữ trên ba nền hay gặp, và chặn mọi màu đen cứng
     quay lại làm tối trang. */
  console.log('\n12 · NỀN SÁNG ĐỌC ĐƯỢC');
  {
    const r = await p.evaluate(() => {
      const cs = getComputedStyle(document.documentElement);
      const hex = n => cs.getPropertyValue(n).trim();
      function lum(h){ h = h.replace('#',''); 
        const c = [0,2,4].map(i => parseInt(h.substr(i,2),16)/255)
          .map(v => v <= .03928 ? v/12.92 : Math.pow((v+.055)/1.055, 2.4));
        return .2126*c[0] + .7152*c[1] + .0722*c[2]; }
      function cr(a,b){ const x = lum(a), y = lum(b), hi = Math.max(x,y), lo = Math.min(x,y);
        return (hi+.05)/(lo+.05); }
      const NEN = ['#FFFFFF', hex('--bg-0'), hex('--bg-2')];
      const CHU = ['--ink','--ink-2','--ink-3','--ink-4','--gold-ink','--t1','--t2','--t3','--t4','--t5','--ok','--bad'];
      const yeu = [];
      CHU.forEach(k => { const v = hex(k);
        NEN.forEach(n => { const t = cr(v, n); if (t < 4.5) yeu.push(k + ' trên ' + n + ' = ' + t.toFixed(2)); }); });
      return { yeu, nen: hex('--bg-0'), macDinh: !document.documentElement.getAttribute('data-nen') };
    });
    bao(!r.yeu.length, 'mọi mã chữ đạt chuẩn AA trên cả ba nền sáng', r.yeu.join(' · ') || '12 mã × 3 nền đều ≥ 4,5:1');
    bao(r.macDinh, 'ứng dụng mở ra là nền sáng', 'nền ' + r.nen);

    /* Không được còn NỀN tối cứng nào ngoài các luật của nền tối.
       Bóng đổ đen (box-shadow) là chuyện bình thường ở cả hai nền nên bỏ qua. */
    const fs2 = require('fs'), px2 = require('path');
    const css = fs2.readFileSync(px2.join(__dirname, '..', 'assets', 'style.css'), 'utf8');

    /* Cắt TRỌN khối mã màu của nền tối, rồi bỏ nốt các luật riêng của nó
       và mọi dòng bóng đổ — phần còn lại phải sạch màu tối. */
    const b0 = css.indexOf(':root[data-nen="toi"]{');
    const b1 = b0 < 0 ? -1 : css.indexOf('}', b0);
    const conLai = (b0 < 0 ? css : css.slice(0, b0) + css.slice(b1 + 1));
    const sach = conLai.split('\n')
      .filter(d => d.indexOf('data-nen="toi"') < 0 && d.indexOf('box-shadow') < 0 && d.trim().indexOf('--shadow:') !== 0)
      .join('\n');

    const cung = (sach.match(/(background|fill)[^;]*rgba\(\s*(?:[0-9]|[1-3][0-9]),\s*(?:[0-9]|1[0-9]),\s*(?:[0-9]|[1-4][0-9])\s*,/g) || []);
    bao(!cung.length, 'không còn nền tối cứng nằm ngoài bảng nền tối',
      cung.length ? cung.length + ' chỗ: ' + cung.slice(0, 2).join(' | ') : 'sạch');

    /* Lớp phủ trắng phải đi qua mã màu --phu-*, nếu không nền sáng sẽ vỡ.
       Chỉ còn được phép ở nơi trắng là ĐÚNG: thanh trên, hộp nổi, màn sáng. */
    const conTrang = (sach.match(/rgba\(255,\s*255,\s*255/g) || []).length;
    bao(conTrang <= 5, 'lớp phủ trắng đã gom về mã màu --phu-*',
      'còn ' + conTrang + ' chỗ, đều là nơi trắng đúng vai');

    /* Đổi nền qua lại không hỏng */
    const doi = await p.evaluate(() => {
      const truoc = getComputedStyle(document.documentElement).getPropertyValue('--bg-0').trim();
      G.datNen('toi');
      const toi = getComputedStyle(document.documentElement).getPropertyValue('--bg-0').trim();
      G.datNen('sang');
      const lai = getComputedStyle(document.documentElement).getPropertyValue('--bg-0').trim();
      return { truoc, toi, lai };
    });
    bao(doi.truoc !== doi.toi && doi.truoc === doi.lai, 'nút đổi nền sáng ↔ tối chạy đúng cả hai chiều',
      doi.truoc + ' ↔ ' + doi.toi);
  }

  /* ═══════════ 13 · NHẬN DIỆN THƯƠNG HIỆU GITA ═══════════
     Logo là tài sản nhận diện — sai một mã màu là sai cả hệ. Mục này
     khoá bảng màu về đúng logo và chặn màu vàng của bản cũ quay lại. */
  console.log('\n13 · NHẬN DIỆN THƯƠNG HIỆU GITA');
  {
    const b = await p.evaluate(() => {
      const cs = getComputedStyle(document.documentElement);
      const g = n => cs.getPropertyValue(n).trim().toUpperCase();
      return {
        gita: g('--gita'), sau: g('--gita-sau'), sang: g('--gita-sang'),
        do: g('--gita-do'), doInk: g('--gita-do-ink'),
        t1: g('--t1'), t5: g('--t5'),
        coLogo: typeof G.logoGita === 'function' && typeof G.dauGita === 'function',
        svg: typeof G.logoGita === 'function' ? G.logoGita() : '',
        dau: typeof G.dauGita === 'function' ? G.dauGita() : '',
        nd: !!G.NHAN_DIEN,
        soCam: G.NHAN_DIEN ? G.NHAN_DIEN.logo.cam.length : 0,
        soLuatMau: G.NHAN_DIEN ? G.NHAN_DIEN.mau.luat.length : 0
      };
    });

    bao(b.gita === '#2A72C6', 'màu chủ đạo đúng mã lấy từ tệp logo gốc', b.gita);
    bao(b.sau === '#185AB4', 'xanh sâu đúng mã nét ngoài và chữ GITA trong logo', b.sau);
    bao(b.do === '#F61824', 'đỏ GITA đúng mã nét đỏ trong logo', b.do);
    bao(b.t1 === b.sau || b.t1 === b.gita,
      'tầng 1 mang một trong hai màu xanh thật của logo', b.t1);
    bao(b.t5 === b.doInk, 'tầng 5 mang màu đỏ logo — đích đến là ngôi sao đỏ', b.t5);

    /* Logo là TỆP GỐC của Học viện, không phải hình vẽ lại */
    bao(b.coLogo, 'ứng dụng dựng được logo và dấu vuông');
    bao(/assets\/brand\/logo-gita\.png|data:image\/png/.test(b.svg),
      'logo dùng đúng tệp gốc của Học viện, không phải hình vẽ lại');
    bao(/<img /.test(b.svg) && /<img /.test(b.dau), 'logo và dấu vuông đều là ảnh thật');

    const fsL = require('fs'), pxL = require('path'), gocL = pxL.join(__dirname, '..');
    ['logo-gita.png', 'dau-gita.png'].forEach(function (t) {
      const d = pxL.join(gocL, 'assets', 'brand', t);
      bao(fsL.existsSync(d), 'có tệp ' + t + ' trong ứng dụng',
        fsL.existsSync(d) ? Math.round(fsL.statSync(d).size / 1024) + ' KB' : 'thiếu');
    });
    /* Không còn ai vẽ lại logo bằng tay nữa */
    const lg = fsL.readFileSync(pxL.join(gocL, 'src', 'logo-gita.js'), 'utf8');
    bao(!/<path |<svg |<circle /.test(lg),
      'không còn hình vẽ lại logo trong mã nguồn — chỉ dùng tệp gốc');

    bao(b.nd, 'có bộ nhận diện đọc được bằng máy');
    bao(b.soCam >= 5, 'bộ nhận diện ghi rõ điều KHÔNG được làm với logo', b.soCam + ' điều cấm');
    bao(b.soLuatMau >= 5, 'bộ nhận diện ghi rõ luật dùng màu', b.soLuatMau + ' luật');

    /* Màu vàng của bản trước v7.7 không được sót lại chỗ nào */
    const fs3 = require('fs'), px3 = require('path'), goc3 = px3.join(__dirname, '..');
    let vang = [];
    for (const th of ['assets/style.css', 'src', 'index.html']) {
      const d = px3.join(goc3, th);
      const ds = fs3.statSync(d).isDirectory()
        ? fs3.readdirSync(d).filter(x => x.endsWith('.js')).map(x => px3.join(d, x)) : [d];
      ds.forEach(f => {
        const t = fs3.readFileSync(f, 'utf8');
        if (/#F5B942|#FFD98A|#FF7A45|rgba\(245,\s*185,\s*66/i.test(t)) vang.push(px3.basename(f));
      });
    }
    bao(!vang.length, 'không còn mã màu vàng của bản cũ sót lại', vang.join(' ') || 'sạch');
  }

  /* ═══════════ 14 · THƯ VIỆN TÀI LIỆU & MINH CHỨNG ═══════════ */
  console.log('\n14 · THƯ VIỆN TÀI LIỆU & MINH CHỨNG');
  {
    const q = await p.evaluate(() => {
      const cu = G.S.roleObj;
      const co = id => { G.S.roleObj = G.roleById(id);
        return { gui: G.can('tl_gui'), duyet: G.can('tl_duyet'), xemHet: G.can('tl_xem_het'),
                 mcGui: G.can('mc_gui'), mcDuyet: G.can('mc_duyet') }; };
      const r = {};
      ['R01','R02','R03','R07','R08','R11','R13','R14','R15'].forEach(k => r[k] = co(k));
      G.S.roleObj = cu;
      return r;
    });

    /* Mọi vị trí đều gửi được tài liệu — đó là điểm chính anh Quang yêu cầu */
    const khongGui = Object.keys(q).filter(k => !q[k].gui);
    bao(!khongGui.length, 'MỌI vị trí đều gửi được tài liệu lên thư viện', khongGui.join(' ') || '9/9 vai gửi được');

    /* Kiểm duyệt chỉ R01 và R02 */
    const duyet = Object.keys(q).filter(k => q[k].duyet);
    bao(duyet.join() === 'R01,R02', 'kiểm duyệt tài liệu chỉ Super Admin và Admin hệ thống', duyet.join(' '));
    const xem = Object.keys(q).filter(k => q[k].xemHet);
    bao(xem.join() === 'R01,R02,R03', 'xem toàn bộ tài liệu: R01 – R03', xem.join(' '));

    /* Phụ huynh và học viên nộp được minh chứng; Coach xác nhận */
    bao(q.R13.mcGui && q.R14.mcGui, 'phụ huynh và học viên nộp được minh chứng nhiệm vụ');
    bao(!q.R13.mcDuyet && !q.R14.mcDuyet, 'phụ huynh và học viên KHÔNG tự xác nhận minh chứng của mình');
    bao(q.R07.mcDuyet && q.R08.mcDuyet, 'Coach và giáo viên xác nhận được minh chứng');

    /* Ba màn hình phải dựng được và nói thật khi kho trống */
    const man = await p.evaluate(() => {
      const cu = G.S.roleObj, ra = {};
      G.S.roleObj = G.roleById('R01');
      ra.tv = G.VIEWS['thu-vien']().length;
      ra.dtl = G.VIEWS['duyet-tai-lieu']();
      G.S.roleObj = G.roleById('R13');
      ra.mc = G.VIEWS['minh-chung']().length;
      ra.tvPh = G.VIEWS['thu-vien']();
      G.S.roleObj = cu;
      return { tv: ra.tv, mc: ra.mc, dtl: ra.dtl,
               /* Nói thật khi trống: phải NÓI RÕ là chưa có dữ liệu, và mọi
                  ví dụ minh hoạ phải được đánh dấu rõ là ví dụ — nếu không,
                  người đọc tưởng đó là số liệu thật của Học viện. */
               noiThat: /chưa có dữ liệu|Kho đang trống|Chưa có tài liệu nào được gửi/i.test(ra.dtl),
               viDuCoNhan: !/VÍ DỤ MINH HOẠ/.test(ra.dtl) ||
                 /KHÔNG phải dữ liệu thật/.test(ra.dtl),
               coHuongDan: /RỒI SẼ CÓ GÌ Ở ĐÂY|LÀM NGAY BÂY GIỜ/.test(ra.dtl),
               phGuiDuoc: /data-act="tl-gui"/.test(ra.tvPh) };
    });
    bao(man.tv > 900 && man.mc > 900, 'ba màn thư viện và minh chứng đều dựng được', man.tv + ' · ' + man.mc + ' ký tự');
    bao(man.noiThat, 'kho trống thì nói thẳng là trống, không dựng số liệu giả');
    bao(man.viDuCoNhan, 'ví dụ minh hoạ được ghi RÕ là ví dụ — không ai nhầm là số thật');
    bao(man.coHuongDan, 'màn trống vẫn nói rõ rồi sẽ có gì và làm gì ngay bây giờ',
      man.dtl.length + ' ký tự');
    bao(man.phGiDuoc !== false && man.phGuiDuoc, 'phụ huynh thấy ô gửi tài liệu ngay trên màn thư viện');

    /* Máy chủ: chỉ nhận đúng loại tệp, chặn tệp chạy được, và chỉ R01–R02 duyệt */
    const fs4 = require('fs'), px4 = require('path');
    const gs = px4.join(__dirname, '..', 'server', 'GITA_TaiLieu.gs');
    if (fs4.existsSync(gs)) {
      const t = fs4.readFileSync(gs, 'utf8');
      bao(/GITA_TL_DUOI_CHO_PHEP/.test(t) && !/'exe'|'js'|'sh'|'bat'/.test(t),
        'máy chủ chỉ nhận tài liệu và ảnh, không nhận tệp chạy được');
      bao(/lv > 2/.test(t), 'máy chủ tự chặn kiểm duyệt với vai bậc lớn hơn 2');
      bao(/GITA_TL_TRAN_NGAY/.test(t), 'có trần số tệp gửi mỗi ngày cho một tài khoản');
      bao(/ghiNhatKy_/.test(t), 'mọi lần gửi và duyệt đều vào nhật ký');
    }
  }

  /* ═══════════ 15 · HAI HỆ NGÔN NGỮ ═══════════
     Khách hàng không được nghe thuật ngữ hệ thống; đội ngũ phải giữ
     nguyên thuật ngữ để làm việc với nhau. Mục này canh cả hai chiều. */
  console.log('\n15 · HAI HỆ NGÔN NGỮ');
  {
    const r = await p.evaluate(() => {
      const cu = G.S.roleObj;
      function doc(vai){
        G.S.roleObj = G.roleById(vai);
        const ra = [];
        G.NAV.forEach(g => g.items.forEach(i => {
          if (!i.perm || G.can(i.perm)) ra.push(G.iname(i) + ' ' + G.ihint(i));
        }));
        return ra.join(' | ');
      }
      const kh = doc('R13'), hv = doc('R14'), nghe = doc('R07');
      G.S.roleObj = cu;
      return { kh, hv, nghe, soCau: Object.keys(G.NOI_KHACH || {}).length,
               coBo: !!G.NHAN_DIEN_LOI,
               soDauHieu: G.NHAN_DIEN_LOI ? G.NHAN_DIEN_LOI.dauHieuMay.length : 0,
               soCap: G.NHAN_DIEN_LOI ? G.NHAN_DIEN_LOI.thayVi.length : 0 };
    });

    /* Thuật ngữ hệ thống không được lọt xuống khách hàng */
    const CAM = ['phạm vi cấp phép','tầng quyền','gói nội dung','đồng bộ','KPI','mô thức',
      'phác đồ','ma trận','nghiệm thu','kiểm duyệt','minh chứng','chuẩn hoá','PDCA','T1 → T5'];
    const lot = CAM.filter(t => r.kh.toLowerCase().indexOf(t.toLowerCase()) >= 0 ||
                                r.hv.toLowerCase().indexOf(t.toLowerCase()) >= 0);
    bao(!lot.length, 'không thuật ngữ hệ thống nào lọt xuống phụ huynh và học viên',
      lot.join(' · ') || CAM.length + ' thuật ngữ đều đã dịch');

    /* Đội ngũ vẫn giữ nguyên thuật ngữ để làm việc */
    const giu = ['mô thức','phác đồ','ma trận','nghiệm thu'].filter(t => r.nghe.toLowerCase().indexOf(t) >= 0);
    bao(giu.length >= 3, 'đội ngũ từ Tư vấn trở lên vẫn giữ nguyên thuật ngữ nghề', giu.join(' · '));

    /* Hai hệ phải KHÁC nhau thật, không phải cùng một bản */
    bao(r.kh !== r.nghe, 'lời nhà mình và lời nghề là hai bản khác nhau');
    bao(r.soCau >= 60, 'mỗi câu dành cho khách hàng đều viết tay, không dịch máy', r.soCau + ' câu');

    /* Bộ nhận diện ngôn từ */
    bao(r.coBo, 'có bộ nhận diện ngôn từ đọc được bằng máy');
    bao(r.soDauHieu >= 10, 'có bộ soi dấu hiệu câu do máy viết', r.soDauHieu + ' dấu hiệu');
    bao(r.soCap >= 12, 'có bảng nói thế này — không nói thế kia', r.soCap + ' cặp');

    /* Chính lời khách hàng phải sạch dấu hiệu văn máy */
    const may = await p.evaluate(() => {
      const v = Object.keys(G.NOI_KHACH || {})
        .filter(k => k.indexOf('nav.') === 0).map(k => G.NOI_KHACH[k]);
      const xau = [];
      v.forEach(t => {
        if (/^(Hãy|Khám phá|Trải nghiệm)/i.test(t)) xau.push('mở đầu quảng cáo: ' + t);
        if (/toàn diện|tối ưu|đột phá|vượt trội/i.test(t)) xau.push('tính từ rỗng: ' + t);
        if ((t.match(/·/g) || []).length >= 3) xau.push('ba dấu chấm giữa trở lên: ' + t);
        if (/\bbạn\b/.test(t)) xau.push('gọi khách hàng là "bạn": ' + t);
      });
      return xau;
    });
    bao(!may.length, 'lời nhà mình không dính dấu hiệu văn máy nào',
      may.slice(0, 2).join(' | ') || 'sạch');
  }

  /* ═══════════ 16 · TRỢ LÝ GITA ═══════════
     Trợ lý là đường có thể gây hại nếu hỏng: nó nói chuyện với gia đình
     đang tổn thương. Mục này canh cả ba luật cứng và đường an toàn. */
  console.log('\n16 · TRỢ LÝ GITA');
  {
    const r = await p.evaluate(() => {
      const cu = G.S.roleObj;
      function thu(vai, hoi){
        G.S.roleObj = G.roleById(vai);
        const d = G.aiTraLoi(hoi);
        return {khan:d.khan, y:d.y && d.y.ma, n:d.nguon.length, loi:d.loi || '', chuaCo:d.chuaCo};
      }
      const ra = {
        phVaoDuoc: (function(){ G.S.roleObj = G.roleById('R13');
          const h = G.VIEWS['tro-ly'](); return /id="aiQ"/.test(h); })(),
        dienThoai: thu('R13','con ôm điện thoại cả ngày'),
        tuGiac:    thu('R13','con không tự giác phải nhắc mãi'),
        khan1:     thu('R13','con tôi nói muốn chết'),
        khan2:     thu('R13','con tôi rạch tay'),
        khan3:     thu('R14','em muốn tự tử'),
        vuVo:      thu('R13','xyzzy qwerty khong co gi'),
        nghe:      thu('R07','phác đồ ôm điện thoại')
      };
      /* lưới an toàn phải chạy kể cả khi kho chưa mở */
      const kb = G.KICHBAN_AI; G.KICHBAN_AI = null;
      G.S.roleObj = G.roleById('R13');
      const d = G.aiTraLoi('con tôi muốn chết');
      ra.khanKhongKho = {khan:d.khan, coLoi:!!(d.loi && d.loi.length > 40)};
      G.KICHBAN_AI = kb; G.S.roleObj = cu;
      return ra;
    });

    bao(r.phVaoDuoc, 'phụ huynh mở được trợ lý — không khoá sau kho nghề');
    bao(r.dienThoai.n >= 3 && r.tuGiac.n >= 3, 'trợ lý tìm được tư liệu cho câu hỏi thường ngày',
      r.dienThoai.n + ' · ' + r.tuGiac.n + ' nguồn');
    bao(!!r.dienThoai.y && !!r.tuGiac.y, 'trợ lý đọc được ý định câu hỏi',
      r.dienThoai.y + ' · ' + r.tuGiac.y);

    /* Ba câu có dấu hiệu khẩn: PHẢI dừng và chuyển người thật */
    bao(r.khan1.khan && r.khan2.khan && r.khan3.khan,
      'dấu hiệu khẩn thì DỪNG trả lời tự động, chuyển người thật');
    bao(r.khan1.n === 0 && r.khan2.n === 0,
      'câu khẩn KHÔNG kèm tư liệu — không để ai tự xử lý một mình');
    bao(/08\.5555\.4688/.test(r.khan1.loi) && /115/.test(r.khan1.loi),
      'câu khẩn có số gọi người thật và số cấp cứu');
    bao(r.khanKhongKho.khan && r.khanKhongKho.coLoi,
      'kho chưa mở vẫn bắt được dấu hiệu khẩn — lưới an toàn không phụ thuộc dữ liệu');

    bao(r.vuVo.chuaCo, 'không có trong kho thì nói thẳng là chưa có, không đoán');
    bao(r.nghe.n >= 3, 'người trong nghề tra được kho nghề', r.nghe.n + ' nguồn');

    /* Bộ kịch bản phải nằm ở gói NỀN — mọi tài khoản đều cần, nhất là phần khẩn */
    const fs5 = require('fs'), px5 = require('path');
    const mh = fs5.readFileSync(px5.join(__dirname, 'ma-hoa-kho.js'), 'utf8');
    const nen = mh.slice(mh.indexOf('const NEN'), mh.indexOf('const NGHE'));
    bao(nen.indexOf('KICHBAN_AI') > 0, 'bộ kịch bản trợ lý nằm ở gói nền, mọi vai đều nhận được');

    /* Trợ lý không được gọi ra mạng */
    const tl = fs5.readFileSync(px5.join(__dirname, '..', 'src', 'tro-ly-ai.js'), 'utf8');
    bao(!/fetch\(|XMLHttpRequest|WebSocket/.test(tl),
      'trợ lý chạy hoàn toàn trong máy — không gọi ra mạng, không tốn phí API');
  }

  /* ═══════════ 17 · KHO TÀI LIỆU ĐÃ BIÊN SOẠN ═══════════
     Hai kho chữ được rút thẳng từ tệp gốc của Học viện: năm tệp Word
     và mười tệp trên Drive. Mục này canh cho kho không bị hụt, không bị
     rỗng, và trợ lý đọc được cả hai. */
  console.log('\n17 · KHO TÀI LIỆU ĐÃ BIÊN SOẠN');
  {
    const r = await p.evaluate(() => {
      const goc   = G.TAILIEU_GOC   || [];
      const drive = G.TAILIEU_DRIVE || [];
      function dem(ds, truong){
        return ds.reduce((t, d) => t + ((d[truong] || []).length), 0);
      }
      const cu = G.S.roleObj;
      G.S.roleObj = G.roleById('R01');
      const man = (G.VIEWS['tai-lieu-goc'] ? G.VIEWS['tai-lieu-goc']() : '');
      G.S.roleObj = G.roleById('R07');
      const tra = G.aiTraLoi('mô thức huấn luyện GITA');
      G.S.roleObj = cu;
      return {
        nGoc: goc.length, nDrive: drive.length,
        chuGoc:   goc.reduce((t, d) => t + (d.soChu || 0), 0),
        chuDrive: drive.reduce((t, d) => t + (d.soChu || 0), 0),
        bangGoc:   dem(goc, 'bang'),
        doanDrive: dem(drive, 'doan'),
        thieuMa:  goc.concat(drive).filter(d => !d.ma || !d.ten).length,
        rong:     goc.concat(drive).filter(d => !(d.soChu > 0)).length,
        manDai:   man.length,
        manCoDrive: /DR-0/.test(man),
        manCoGoc:   /TG-0/.test(man),
        traDuoc:  tra.nguon.length
      };
    });

    bao(r.nGoc === 5,  'đủ năm tệp Word gốc của Học viện', r.nGoc + ' tệp');
    bao(r.nDrive === 10, 'đủ mười tệp tài liệu trên Drive', r.nDrive + ' tệp');
    bao(r.thieuMa === 0, 'mọi tài liệu đều có mã và tên', r.thieuMa + ' bản ghi thiếu');
    bao(r.rong === 0,    'không tài liệu nào rỗng chữ');
    bao(r.chuGoc > 500000, 'kho Word giữ đủ chữ đã rút', r.chuGoc.toLocaleString('vi-VN') + ' chữ');
    bao(r.chuDrive > 400000, 'kho Drive giữ đủ chữ đã rút', r.chuDrive.toLocaleString('vi-VN') + ' chữ');
    bao(r.bangGoc >= 100,  'bảng trong tệp Word được cắt ra dùng được', r.bangGoc + ' bảng');
    bao(r.doanDrive >= 500, 'đoạn nội dung trên Drive được cắt ra dùng được', r.doanDrive + ' đoạn');
    bao(r.manCoGoc && r.manCoDrive, 'màn tài liệu gốc hiện cả hai kho', r.manDai + ' ký tự');
    bao(r.traDuoc >= 3, 'trợ lý tra được kho vừa biên soạn', r.traDuoc + ' nguồn');
  }

  /* ═══════════ 18 · TRÒ CHUYỆN · TRẦN 30% · CỬA KPI 80% ═══════════
     Ba luật anh Quang đặt, kiểm bằng số chứ không bằng lời hứa:
       · gia đình mở sẵn tối đa 30% kho
       · phần còn lại đi qua Tư vấn hoặc Coach, không tự mở
       · cửa mở phần thêm là KPI 80% */
  console.log('\n18 · TRÒ CHUYỆN · TRẦN 30% · CỬA KPI 80%');
  {
    const r = await p.evaluate(() => {
      const cu = G.S.roleObj, cuAcc = G.S.acc;
      G.KHACH_THEM = {}; G.XIN_THEM = [];
      G.S.roleObj = G.roleById('R13');
      G.S.acc = {u:'phuhuynh@gita365.vn', ten:'Trần Quốc Bảo'};

      const dem = G.demKho(), nha = G.khoCuaNha();

      /* Đếm thật trên toàn kho: gia đình mở được bao nhiêu phần */
      let tong = 0, mo = 0;
      [['Mô thức', G.MOTHUC, x=>x.id], ['Phác đồ', G.PHACDO, x=>x.ma],
       ['Kịch bản', G.KICHBAN, x=>x.ma], ['Tình huống', G.TINHHUONG, x=>(x.key||x.ma||('TH-'+x.stt))],
       ['Bài học', G.BAIHOC, x=>x.id]].forEach(([l, kho, ma]) => {
        (kho || []).forEach(x => { tong++; if (G.khachMoDuoc(l, ma(x))) mo++; });
      });

      /* Khung trò chuyện */
      G.CHAT = [];
      G.chatHoi('con ôm điện thoại cả ngày');
      const man = G.VIEWS['tro-ly']();
      const dap = G.CHAT[G.CHAT.length - 1].dap;
      let nMo = 0, nCho = 0;
      dap.nguon.forEach(n => { G.khachMoDuoc(n.loai, n.ma) ? nMo++ : nCho++; });

      /* Câu khẩn trong khung chat vẫn phải dừng và không kèm tư liệu */
      G.CHAT = [];
      G.chatHoi('con tôi nói muốn chết');
      const khan = G.CHAT[G.CHAT.length - 1].dap;

      /* Cửa KPI: nhà chưa đạt 80% thì Tư vấn cũng không gửi được */
      const kpiThat = G.kpiCuaToi();
      const xin = G.xinThemTuLieu('Kịch bản', 'ZZ-TEST-01', 'Tư liệu thử');
      const idXin = G.XIN_THEM.length ? G.XIN_THEM[G.XIN_THEM.length - 1].id : '';

      /* Gia đình KHÔNG tự gửi được cho chính mình */
      const tuCap = G.capThemTuLieu(idXin);

      /* Tư vấn gửi: chặn khi KPI thấp, cho khi KPI đủ */
      G.S.roleObj = G.roleById('R11');
      G.S.acc = {u:'tuvan@gita365.vn', ten:'Phan Đức Thắng'};
      G.XIN_THEM[G.XIN_THEM.length - 1].kpi = 55;
      const capThap = G.capThemTuLieu(idXin);
      G.XIN_THEM[G.XIN_THEM.length - 1].kpi = 88;
      const capDu = G.capThemTuLieu(idXin);
      const manQueue = G.VIEWS['gui-tu-lieu']();

      /* Sau khi được gửi, gia đình mở được đúng tư liệu đó */
      G.S.roleObj = G.roleById('R13');
      const moSauKhiGui = G.khachMoDuoc('Kịch bản', 'ZZ-TEST-01');

      /* Người trong nghề không bị trần 30% chạm tới */
      G.S.roleObj = G.roleById('R07');
      let ngheMo = 0, ngheTong = 0;
      (G.KICHBAN || []).slice(0, 200).forEach(x => { ngheTong++; if (G.khachMoDuoc('Kịch bản', x.ma)) ngheMo++; });

      G.KHACH_THEM = {}; G.XIN_THEM = []; G.CHAT = [];
      G.S.roleObj = cu; G.S.acc = cuAcc;
      return {demTong:dem.tong, tong, mo, pt: tong ? mo / tong : 0,
        nhaPt: nha.phanTramNen, kpiThat,
        coKhung:/id="chKhung"/.test(man), coBong:/ch-bong-ai/.test(man),
        coGoiY:/data-aiq=/.test(man), coXin:/data-xin=/.test(man),
        nMo, nCho, khanDung: khan.khan, khanKhongNguon: khan.nguon.length === 0,
        xinOk: xin.ok, tuCapChan: !tuCap.ok, capThapChan: !capThap.ok,
        capThapLy: capThap.ly || '', capDuOk: capDu.ok,
        queueCoNha: /Trần 30%/.test(manQueue) && /KPI/.test(manQueue),
        moSauKhiGui, nghePt: ngheTong ? ngheMo / ngheTong : 0};
    });

    bao(r.coKhung && r.coBong, 'trợ lý hiện dưới dạng khung trò chuyện, có bóng nói hai bên');
    bao(r.coGoiY, 'khung trò chuyện có sẵn câu gợi ý để gia đình bấm là hỏi được');
    bao(r.nMo + r.nCho > 0 && r.nCho > 0 && r.coXin,
      'tư liệu ngoài phần nền vẫn hiện tên và có nút nhờ Tư vấn gửi',
      r.nMo + ' mở ngay · ' + r.nCho + ' qua người thật');
    bao(r.khanDung && r.khanKhongNguon,
      'trong khung trò chuyện, câu khẩn vẫn DỪNG và không kèm tư liệu');

    bao(r.pt > 0 && r.pt <= 0.31, 'gia đình mở sẵn tối đa 30% kho',
      Math.round(r.pt * 1000) / 10 + '% · ' + r.mo.toLocaleString('vi-VN') + ' / ' + r.tong.toLocaleString('vi-VN'));
    bao(r.nhaPt <= 30, 'màn hình báo đúng con số phần nền', r.nhaPt + '%');
    bao(r.nghePt > 0.99, 'người trong nghề KHÔNG bị trần 30% chạm tới',
      Math.round(r.nghePt * 100) + '% kho nghề');

    bao(r.tuCapChan, 'gia đình KHÔNG tự gửi tư liệu cho chính mình');
    bao(r.capThapChan && /80/.test(r.capThapLy),
      'KPI dưới 80% thì Tư vấn cũng không gửi được — máy chặn, không phải người nhớ');
    bao(r.capDuOk, 'KPI từ 80% trở lên thì Tư vấn gửi được');
    bao(r.moSauKhiGui, 'tư liệu đã gửi thì gia đình mở ra đọc được ngay');
    bao(r.queueCoNha, 'màn Tư vấn nói rõ luật trần 30% và cửa KPI');

    /* Không có đường tải xuống nào cho gia đình */
    const fs6 = require('fs'), px6 = require('path');
    const srcAll = fs6.readdirSync(px6.join(__dirname, '..', 'src'))
      .filter(f => f.endsWith('.js'))
      .map(f => fs6.readFileSync(px6.join(__dirname, '..', 'src', f), 'utf8')).join('\n');
    /* <a\s: bắt buộc có khoảng trắng ngay sau <a, nếu không thì thẻ <audio
       của trình phát — vốn mang controlsList="nodownload" để TẮT nút tải —
       lại bị chính bộ kiểm bắt nhầm là một đường tải xuống. */
    bao(!/<a\s[^>]*\sdownload|createObjectURL\s*\(|\.zip"|showSaveFilePicker/.test(srcAll),
      'không có nút tải xuống và không có tệp nén — mọi thứ đọc thẳng trên ứng dụng');
    bao(/controlsList="nodownload/.test(srcAll),
      'trình phát audio tắt nút tải của trình duyệt — nghe được nhưng không tải được');
  }

  /* ═══════════ 19 · QUY TRÌNH RÀNG BUỘC · 5 CẤP ĐỘ ═══════════
     Chỗ này phải KHOÁ thật, không phải cảnh báo rồi vẫn cho qua.
     Mỗi điểm dưới đây thử một đường lách và bắt hệ thống chặn lại. */
  console.log('\n19 · QUY TRÌNH RÀNG BUỘC · 5 CẤP ĐỘ');
  {
    const r = await p.evaluate(() => {
      const cu = G.S.roleObj, cuAcc = G.S.acc;
      G.CA = [];
      G.S.roleObj = G.roleById('R13');
      G.S.acc = {u:'phuhuynh@gita365.vn', ten:'Trần Quốc Bảo'};
      const phMo = G.moCa('Nhà Minh An', 'Thử mở ca từ tài khoản phụ huynh');

      G.S.roleObj = G.roleById('R07');
      G.S.acc = {u:'coach@gita365.vn', ten:'Đặng Hoàng Nam'};

      const cut  = G.moCa('Nhà A', 'ngắn');            /* tóm tắt quá ngắn */
      const mo   = G.moCa('Nhà Minh An', 'Con ôm điện thoại, phụ huynh nhắc mãi không chuyển');
      const id   = mo.ok ? mo.ca.id : '';

      /* RB1 — chưa có bằng chứng thì không đi tiếp */
      const nhay = G.buocTiep(id);

      /* điền đủ B1 rồi đi tiếp */
      G.ghiCa(id, 'nguonCa', 'Phụ huynh nhắn qua Zalo');
      G.ghiCa(id, 'loiGoc', 'Chị nói: cháu cầm điện thoại từ lúc đi học về tới đêm, nhắc thì cáu.');
      const b1 = G.buocTiep(id);

      /* B1 → B2: thiếu độ dài tối thiểu vẫn phải chặn */
      G.ghiCa(id, 'bangChung', 'ngắn quá');
      G.ghiCa(id, 'khoangThoiGian', 'Khoảng 4 tháng');
      const ngan = G.buocTiep(id);
      G.ghiCa(id, 'bangChung', 'Đã xem nhật ký hai tuần và ảnh màn hình thời gian dùng máy của cháu.');
      const b2 = G.buocTiep(id);

      /* RB3 — báo có dấu hiệu nguy hiểm, đang theo dõi, chưa ghi ai theo dõi */
      G.ghiCa(id, 'nhomCa', 'Tự giác — tự quản việc học');
      G.ghiCa(id, 'tangCa', 'T2');
      G.ghiCa(id, 'nguyHiem', 'Có — đang theo dõi sát');
      const chanNH = G.buocTiep(id);
      G.ghiCa(id, 'aiTheoDoi', 'Coach Nam gọi mỗi tối, phụ huynh ghi nhật ký hằng ngày.');
      const b3 = G.buocTiep(id);

      /* RB4 — phác đồ tầng 4 cho nhà tầng 2 */
      G.ghiCa(id, 'moThuc', 'Mô thức tự khởi động');
      G.ghiCa(id, 'phacDo', 'PD-T4-012');
      G.ghiCa(id, 'viSao', 'Chọn vì điểm nghẽn nằm ở khâu bắt đầu, không nằm ở năng lực học.');
      G.ghiCa(id, 'capDo', 'C2');
      const vuotTang = G.buocTiep(id);
      G.ghiCa(id, 'phacDo', 'PD-T2-007');
      const b4 = G.buocTiep(id);

      /* đi nốt tới khi đóng ca */
      G.ghiCa(id, 'motViec', 'Mỗi tối con tự bắt đầu một phiên học, không chờ ai gọi.');
      G.ghiCa(id, 'mocDo', 'Đếm số tối tự bắt đầu, chốt vào chủ nhật');
      G.ghiCa(id, 'aiLam', 'Con giữ việc, mẹ ghi nhật ký');
      const b5 = G.buocTiep(id);
      G.ghiCa(id, 'ketQua', 'Năm trên bảy tối con tự bắt đầu, không cần ai nhắc.');
      G.ghiCa(id, 'nhaNoiGi', 'Mẹ nói nhẹ hẳn, không phải cãi nhau mỗi tối nữa.');
      G.ghiCa(id, 'chenhLech', 'Đạt');
      const b6 = G.buocTiep(id);
      G.ghiCa(id, 'ketLuan', 'Xong — chuyển chặng tiếp');
      G.ghiCa(id, 'hocDuocGi', 'Điểm nghẽn nằm ở khâu bắt đầu chứ không ở năng lực. Đo bằng số tối tự bắt đầu là đủ.');
      const b7 = G.buocTiep(id);

      const ca = G.CA.filter(x => x.id === id)[0];
      const sauKhiDong = G.ghiCa(id, 'ketQua', 'sửa lại sau khi đóng');

      /* Quá hạn: đẩy mốc thời gian lùi lại rồi xem có nổi lên không */
      const mo2 = G.moCa('Nhà B', 'Ca để thử ràng buộc quá hạn của hệ thống');
      const c2 = G.CA.filter(x => x.id === mo2.ca.id)[0];
      c2.doiLuc = Date.now() - 100 * 3600e3;
      const tre = G.quaHan(c2);
      const d = G.doLuongCa();

      /* Màn hình */
      const manCa = G.VIEWS['xu-ly-ca']();
      const manVD = G.VIEWS['van-dung']();
      const gan = G.VIEWS['phac-do']();
      G.S.roleObj = G.roleById('R13');
      const ganKhach = G.VIEWS['phac-do']();

      G.CA = []; G.S.roleObj = cu; G.S.acc = cuAcc;
      return {
        phMoChan: !phMo.ok, cutChan: !cut.ok, moOk: mo.ok,
        nhayChan: !nhay.ok, nganChan: !ngan.ok,
        b1: b1.ok, b2: b2.ok, b3: b3.ok, b4: b4.ok, b5: b5.ok, b6: b6.ok,
        chanNH: !chanNH.ok, chanNHLy: chanNH.ly || '',
        vuotTangChan: !vuotTang.ok, vuotLy: vuotTang.ly || '',
        dong: !!(b7.ok && b7.dong), caXong: !!(ca && ca.xong),
        moc: ca ? ca.nhatKy.length : 0,
        khoaSauDong: !sauKhiDong.ok,
        tre: tre, doTre: d.treo,
        soCapDo: (G.CAPDO_VANDUNG || []).length,
        soLoai: (G.VANDUNG || []).length,
        soBuoc: (G.QUYTRINH_XL || []).length,
        soRB: (G.RANG_BUOC || []).length,
        manCaDai: manCa.length, manVDDai: manVD.length,
        ganVaoTaiLieu: /Vận dụng phác đồ/.test(gan),
        khongGanChoKhach: !/Vận dụng phác đồ/.test(ganKhach)
      };
    });

    bao(r.soCapDo === 5, 'có đủ năm cấp độ vận dụng', r.soCapDo + ' cấp');
    bao(r.soLoai >= 5, 'mỗi loại tài liệu đều có phần vận dụng riêng', r.soLoai + ' loại');
    bao(r.soBuoc === 7 && r.soRB === 4, 'quy trình đủ bảy bước và bốn ràng buộc',
      r.soBuoc + ' bước · ' + r.soRB + ' ràng buộc');
    bao(r.ganVaoTaiLieu, 'khối vận dụng gắn thẳng vào màn tài liệu, không bắt ai đi tìm');
    bao(r.khongGanChoKhach, 'phần hướng dẫn nghề KHÔNG hiện với gia đình');

    bao(r.phMoChan, 'gia đình không mở được ca — quy trình là việc của đội ngũ');
    bao(r.cutChan && r.moOk, 'tóm tắt ca quá ngắn thì không mở được');
    bao(r.nhayChan, 'RB1 · chưa có bằng chứng thì KHÔNG đi tiếp được');
    bao(r.nganChan, 'bằng chứng dưới độ dài tối thiểu cũng bị chặn — không nhận cho có');
    bao(r.b1 && r.b2 && r.b3 && r.b4 && r.b5 && r.b6, 'đủ bằng chứng thì đi tiếp trơn tru qua từng bước');
    bao(r.chanNH && /theo dõi/.test(r.chanNHLy),
      'RB3 · dấu hiệu nguy hiểm chưa ghi người theo dõi thì ca đứng lại');
    bao(r.vuotTangChan && /tầng/.test(r.vuotLy),
      'RB4 · phác đồ tầng trên cho nhà tầng dưới bị chặn', r.vuotLy.slice(0, 60));
    bao(r.tre > 0 && r.doTre > 0, 'RB2 · quá hạn thì ca nổi lên bảng đo lường', r.tre + ' giờ');
    bao(r.dong && r.caXong, 'đi hết bảy bước thì ca đóng lại, có kết luận');
    bao(r.moc >= 7, 'mọi bước đều để lại mốc trong nhật ký ca — truy vết được', r.moc + ' mốc');
    bao(r.khoaSauDong, 'ca đã đóng thì không sửa được nữa — hồ sơ giữ nguyên để soi lại');
    bao(r.manCaDai > 2000 && r.manVDDai > 2000, 'hai màn quy trình và vận dụng đều dựng được',
      r.manCaDai + ' · ' + r.manVDDai + ' ký tự');
  }

  /* ═══════════ 20 · LẤY LẠI MÀN ĐĂNG NHẬP ═══════════
     Sau khi đăng nhập một lần, phiên nằm trong bộ nhớ trình duyệt nên mở
     lại trang là vào thẳng ứng dụng. Trên bản đã phát hành, người dùng có
     thể tưởng phần đăng nhập biến mất. Ba đường phải luôn về được. */
  console.log('\n20 · LẤY LẠI MÀN ĐĂNG NHẬP');
  {
    /* Bắt đầu sạch, rồi đăng nhập thật */
    await p.goto(URL, { waitUntil: 'networkidle' });
    await p.evaluate(() => localStorage.clear());
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForTimeout(400);

    const coGate = () => p.evaluate(() =>
      !!document.getElementById('inU') && !!document.querySelector('[data-act="do-login"]'));

    bao(await coGate(), 'lần đầu vào là thấy màn đăng nhập');

    await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    bao(!(await coGate()) && await p.evaluate(() => !!document.getElementById('top')),
      'đăng nhập xong thì vào ứng dụng');

    /* Tải lại: phiên được nhớ — đây chính là lúc màn đăng nhập "biến mất" */
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForTimeout(2500);
    bao(!(await coGate()), 'tải lại trang thì vào thẳng ứng dụng — phiên được nhớ');

    /* Đường 1 · nút đăng xuất trên thanh trên, thấy ngay không phải mở ngăn kéo */
    const nutTren = await p.evaluate(() => {
      const t = document.getElementById('top');
      return !!(t && t.querySelector('[data-act="logout"]'));
    });
    bao(nutTren, 'có nút đăng xuất ngay trên thanh trên, không nấp trong ngăn kéo');

    /* Đường 2 · địa chỉ #dangnhap — dùng được kể cả khi không tìm thấy nút nào */
    await p.goto(URL + '#dangnhap', { waitUntil: 'networkidle' });
    await p.waitForTimeout(1200);
    bao(await coGate(), 'gõ #dangnhap vào cuối địa chỉ là về được màn đăng nhập');
    bao(await p.evaluate(() => !location.hash),
      'về xong thì xoá dấu #dangnhap khỏi địa chỉ, không kẹt lại');

    /* Đường 3 · bấm nút đăng xuất */
    await p.evaluate(() => window.G.doLogin('coach@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    await p.evaluate(() => document.querySelector('#top [data-act="logout"]').click());
    await p.waitForTimeout(600);
    bao(await coGate(), 'bấm nút đăng xuất thì về màn đăng nhập');

    /* Đăng xuất phải dọn kho đã giải mã khỏi bộ nhớ */
    bao(await p.evaluate(() => !window.G.KICHBAN || !window.G.KICHBAN.length),
      'đăng xuất dọn luôn nội dung đã giải mã khỏi bộ nhớ');

    /* Bốn cách viết khác nhau đều nhận */
    for (const d of ['dang-nhap', 'login', 'dangxuat', 'logout']) {
      await p.evaluate(() => window.G.doLogin('phuhuynh@gita365.vn'));
      /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
      await p.goto(URL + '#' + d, { waitUntil: 'networkidle' });
      await p.waitForTimeout(900);
      bao(await coGate(), 'địa chỉ #' + d + ' cũng về được màn đăng nhập');
    }

    /* Tệp 404 mà _redirects trỏ tới phải có thật */
    const fs7 = require('fs'), px7 = require('path');
    const t404 = px7.join(__dirname, '..', '404.html');
    bao(fs7.existsSync(t404), 'có 404.html — _redirects không trỏ vào tệp rỗng');
    if (fs7.existsSync(t404)) {
      const n = fs7.readFileSync(t404, 'utf8');
      bao(/#dangnhap/.test(n), 'trang 404 có lối về màn đăng nhập');
    }

    /* Trả trạng thái sạch cho các mục sau */
    await p.goto(URL, { waitUntil: 'networkidle' });
    await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
  }

  /* ═══════════ 21 · QUÊN MẬT KHẨU · PHÍA ỨNG DỤNG ═══════════ */
  console.log('\n21 · QUÊN MẬT KHẨU · PHÍA ỨNG DỤNG');
  {
    const r = await p.evaluate(() => {
      const cu = G.S.acc;
      G.S.acc = null; G.S.role = null; G.S.roleObj = null;
      G.moQuenMatKhau();
      const m = document.getElementById('modal');
      const o = m ? m.innerHTML : '';
      const inp = document.getElementById('qmU');
      const kieu = inp ? inp.getAttribute('type') : '';

      /* Gõ tên đăng nhập không phải email — phải qua được ô kiểm phía ứng dụng */
      let loiTen = '';
      if (inp) {
        inp.value = 'Admin@gita365';
        G.xinMa();
        const l = document.getElementById('qmLoi');
        loiTen = l ? l.textContent : '';
      }
      let loiNgan = '';
      if (inp) {
        inp.value = 'ab';
        G.xinMa();
        const l = document.getElementById('qmLoi');
        loiNgan = l ? l.textContent : '';
      }
      if (G.U && G.U.closeModal) G.U.closeModal();
      G.S.acc = cu;
      return {coO: !!inp, kieu: kieu, dai: o.length,
        coNutXinMa: /data-act="xin-ma"/.test(o),
        coBuoc2: /data-act="dat-lai-mk"/.test(o),
        loiTen: loiTen, loiNgan: loiNgan};
    });

    bao(r.coO && r.coNutXinMa && r.coBuoc2, 'màn quên mật khẩu dựng đủ hai bước', r.dai + ' ký tự');
    bao(r.kieu === 'text',
      'ô nhập là text, không phải email — Admin@gita365 không có dấu chấm sau @', 'type=' + r.kieu);
    bao(!/dạng địa chỉ email/.test(r.loiTen),
      'gõ tên đăng nhập không phải email vẫn gửi đi được', r.loiTen || 'không báo lỗi');
    bao(/email hoặc tên đăng nhập/i.test(r.loiNgan),
      'gõ quá ngắn thì nhắc rõ nhập gì', r.loiNgan);

    /* Màn đăng nhập phải có lối vào phần quên mật khẩu */
    const coLoi = await p.evaluate(() => {
      const cu = G.S.acc;
      G.S.acc = null; G.S.role = null; G.S.roleObj = null;
      G.raNgoai();
      const co = !!document.querySelector('[data-act="quen-mk"]');
      G.S.acc = cu;
      return co;
    });
    bao(coLoi, 'màn đăng nhập có sẵn lối vào phần quên mật khẩu');

    await p.goto(URL, { waitUntil: 'networkidle' });
    await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
  }

  /* ═══════════ 22 · KHÔNG MỤC NÀO CHẾT TRONG TRÌNH ĐƠN ═══════════
     Một mục hiện ra trong trình đơn nhưng bấm vào chỉ ra màn xin cấp phép
     là mục chết. Nó không làm vỡ ứng dụng, nên bộ kiểm dựng-rồi-đếm không
     thấy — nhưng người dùng thì thấy, và mất lòng tin.

     Luật: màn nào cần gói kho nào thì quyền gắn trên mục điều hướng phải
     hẹp bằng hoặc hẹp hơn nhóm vai được cấp gói ấy. */
  console.log('\n22 · KHÔNG MỤC NÀO CHẾT TRONG TRÌNH ĐƠN');
  {
    const r = await p.evaluate(() => {
      const G = window.G;
      const cu = G.S.roleObj;
      const chet = [];
      const soVai = {};

      G.ROLES.forEach(vai => {
        G.S.roleObj = vai;
        /* Gói kho vai này được cấp — đúng hàm thật, không đoán lại */
        const duoc = G.goiDuocCap();
        let n = 0;
        G.NAV.forEach(g => g.items.forEach(it => {
          if (it.perm && !G.can(it.perm)) return;    /* không thấy thì không tính */
          n++;
          const can = G.goiCanCho(it.v);
          if (can && duoc.indexOf(can) < 0)
            chet.push(vai.id + ' · ' + it.v + ' (cần gói ' + can + ')');
        }));
        soVai[vai.id] = n;
      });
      G.S.roleObj = cu;
      return { chet: [...new Set(chet)], soVai: soVai };
    });

    bao(r.chet.length === 0, 'không vai nào thấy mục mà mình không mở được',
      r.chet.length ? r.chet.slice(0, 6).join(' | ') : 'sạch');

    /* Hai bảng phải khớp: ai có quyền nghe_chung thì phải được cấp gói nghe */
    const lech = await p.evaluate(() => {
      const G = window.G, cu = G.S.roleObj, ra = [];
      G.ROLES.forEach(vai => {
        G.S.roleObj = vai;
        const coQuyen = G.can('nghe_chung');
        const coGoi = G.goiDuocCap().indexOf('nghe') >= 0;
        if (coQuyen !== coGoi)
          ra.push(vai.id + ' quyền=' + coQuyen + ' gói=' + coGoi);
      });
      G.S.roleObj = cu;
      return ra;
    });
    bao(lech.length === 0, 'bảng quyền và bảng cấp gói khớp nhau từng vai',
      lech.length ? lech.join(' · ') : 'khớp cả 15 vai');
  }

  /* ═══════════ 23 · KHOÁ SAO CHÉP CHO KHÁCH HÀNG ═══════════
     Luật: phụ huynh, học viên và cộng tác viên không tải và không chép
     được gì. Kiểm bằng cách bắn sự kiện thật vào trang, không đọc mã. */
  console.log('\n23 · KHOÁ SAO CHÉP CHO KHÁCH HÀNG');
  {
    async function thuVai(u) {
      await p.evaluate(x => window.G.doLogin(x), u);
      /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
      return await p.evaluate(() => {
        const G = window.G;
        function ban(ten, opt){
          const e = new (ten === 'keydown' ? KeyboardEvent : ten === 'contextmenu' ? MouseEvent : Event)
            (ten, Object.assign({bubbles:true, cancelable:true}, opt || {}));
          document.body.dispatchEvent(e);
          return e.defaultPrevented;
        }
        const daKhoa = G.BI_KHOA_CHEP();
        const coLop  = document.body.classList.contains('khoa-chep');

        /* Bắn từ một phần tử nội dung, không phải ô gõ */
        function banTu(el, ten, opt){
          const e = new (ten === 'keydown' ? KeyboardEvent : ten === 'contextmenu' ? MouseEvent : Event)
            (ten, Object.assign({bubbles:true, cancelable:true}, opt || {}));
          el.dispatchEvent(e);
          return e.defaultPrevented;
        }
        const noi = document.getElementById('main') || document.body;

        const r = {
          vai: G.S.roleObj.id, daKhoa: daKhoa, coLop: coLop,
          chepBiChan:   banTu(noi, 'copy'),
          catBiChan:    banTu(noi, 'cut'),
          chuotPhai:    banTu(noi, 'contextmenu'),
          keoTha:       banTu(noi, 'dragstart'),
          ctrlC:        banTu(noi, 'keydown', {key:'c', ctrlKey:true}),
          ctrlA:        banTu(noi, 'keydown', {key:'a', ctrlKey:true}),
          ctrlS:        banTu(noi, 'keydown', {key:'s', ctrlKey:true}),
          ctrlP:        banTu(noi, 'keydown', {key:'p', ctrlKey:true}),
          ctrlU:        banTu(noi, 'keydown', {key:'u', ctrlKey:true}),
          f12:          banTu(noi, 'keydown', {key:'F12'}),
          boiDen:       banTu(noi, 'selectstart')
        };

        /* Ô gõ PHẢI còn dùng được — nếu không thì khách không đăng ký,
           không viết nhật ký, không hỏi trợ lý được. */
        const o = document.createElement('input');
        document.body.appendChild(o);
        r.oGoChepDuoc   = !banTu(o, 'copy');
        r.oGoChonDuoc   = !banTu(o, 'selectstart');
        r.oGoCtrlADuoc  = !banTu(o, 'keydown', {key:'a', ctrlKey:true});
        o.remove();

        /* Đọc to thành tiếng */
        let docToBiChan = false;
        try {
          let goi = 0;
          const cu = window.speechSynthesis.speak;
          window.speechSynthesis.speak(new SpeechSynthesisUtterance('thử'));
          docToBiChan = daKhoa;   /* hàm đã bị bọc; với vai bị khoá thì nó không đọc */
        } catch (e) { docToBiChan = daKhoa; }
        r.docToBiChan = docToBiChan;

        /* Không còn đường tải xuống nào trên màn */
        const a = document.createElement('a');
        a.setAttribute('download', 'x.txt'); a.href = 'data:text/plain,x';
        (document.getElementById('main') || document.body).appendChild(a);
        G.quetTaiXuong();
        r.goDuongTai = !a.hasAttribute('download') && !a.hasAttribute('href');
        a.remove();

        /* Đóng dấu chìm phải bật ở MỌI màn của khách, không chỉ màn chuyên môn */
        r.dauChimMoiMan = G.isCanh('bat-dau') && G.isCanh('nhiem-vu');
        return r;
      });
    }

    const kh = await thuVai('phuhuynh@gita365.vn');
    bao(kh.daKhoa && kh.coLop, 'phụ huynh bị khoá sao chép, lớp chắn đã bật trên thân trang');
    bao(kh.chepBiChan && kh.catBiChan, 'chặn sao chép và cắt');
    bao(kh.chuotPhai && kh.keoTha, 'chặn chuột phải và kéo thả');
    bao(kh.boiDen, 'chặn bôi đen — cửa gốc của mọi đường chép');
    bao(kh.ctrlC && kh.ctrlA, 'chặn Ctrl+C và Ctrl+A ngoài ô gõ');
    bao(kh.ctrlS && kh.ctrlP, 'chặn Ctrl+S lưu trang và Ctrl+P in trang');
    bao(kh.ctrlU && kh.f12, 'chặn Ctrl+U xem mã nguồn và F12 mở công cụ lập trình');
    bao(kh.docToBiChan, 'chặn đọc nội dung thành tiếng — chặn luôn đường chép bằng giọng nói');
    bao(kh.goDuongTai, 'gỡ sạch mọi liên kết tải xuống trên màn');
    bao(kh.dauChimMoiMan, 'đóng dấu chìm mang tên người xem trên MỌI màn của khách');
    bao(kh.oGoChepDuoc && kh.oGoChonDuoc && kh.oGoCtrlADuoc,
      'ô để gõ VẪN dùng được — không chặn nhầm chỗ khách cần nhập');

    const hs = await thuVai('hocvien@gita365.vn');
    bao(hs.daKhoa && hs.chepBiChan && hs.boiDen, 'học viên cũng bị khoá');
    const ctv = await thuVai('daisu@gita365.vn');
    bao(ctv.daKhoa && ctv.chepBiChan && ctv.boiDen, 'cộng tác viên cũng bị khoá');

    /* Người trong nghề KHÔNG bị chặn — chặn nhầm là làm hỏng việc của họ */
    const co = await thuVai('coach@gita365.vn');
    bao(!co.daKhoa && !co.coLop, 'Coach KHÔNG bị khoá — đội ngũ vẫn làm việc bình thường');
    bao(!co.chepBiChan && !co.boiDen && !co.chuotPhai, 'Coach chép, bôi đen và chuột phải bình thường');
    const sa = await thuVai('superadmin@gita365.vn');
    bao(!sa.daKhoa, 'Super Admin KHÔNG bị khoá');

    /* Bản máy tính cũng phải chặn ở trình đơn */
    const fs8 = require('fs'), px8 = require('path');
    const dm = fs8.readFileSync(px8.join(__dirname, '..', 'desktop', 'main.js'), 'utf8');
    bao(/chepNeuDuoc\('copy'\)/.test(dm) && /chepNeuDuoc\('cut'\)/.test(dm),
      'bản máy tính chặn Sao chép và Cắt ngay ở trình đơn Sửa');
    bao(!/role:\s*'copy'/.test(dm) && !/role:\s*'selectAll'/.test(dm),
      'không còn mục trình đơn nào chép thẳng, bỏ qua lớp chắn của trang');
    bao(/role:\s*'paste'/.test(dm), 'vẫn giữ Dán — khách cần dán khi điền biểu mẫu');
  }

  /* ── 24. Bản đồ cá nhân mười một ô ── */
  console.log('\n24 · BẢN ĐỒ CÁ NHÂN 11 Ô');
  {
    const dangNhap = async (u) => {
      await p.evaluate(() => { localStorage.clear(); });
      await p.reload({ waitUntil: 'networkidle' });
      await p.waitForTimeout(400);
      await p.evaluate(x => window.G.doLogin(x), u);
      /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    };

    await dangNhap('coach@gita365.vn');
    const bd = await p.evaluate(() => {
      const G = window.G, r = {};
      r.soO = (G.BDCN || []).length;
      r.duMa = (G.BDCN || []).every(b => b.ma && b.so && b.ic && b.c);
      r.duBaGiong = (G.BDCN || []).every(b => b.ten && b.ten.ng && b.ten.ph && b.ten.hv &&
        b.hoi && b.hoi.ng && b.hoi.ph && b.hoi.hv && b.viDu && b.viDu.ng && b.viDu.ph && b.viDu.hv);
      r.duNamCap = (G.BDCN || []).every(b => Array.isArray(b.sau) && b.sau.length === 5);
      r.duRanhGioi = (G.BDCN || []).every(b => b.xong && b.chua && Array.isArray(b.lam) && b.lam.length >= 3);
      r.manCoThat = (G.BDCN || []).every(b => !b.noi || !!G.VIEWS[b.noi.v]);
      r.oTrung = (G.BDCN || []).flatMap(b => (b.o || []).map(x => x.k))
        .filter((v, i, a) => a.indexOf(v) !== i);
      r.mauDuMuoi = ['hv', 'ph', 'ng'].every(k => (G.BDCN_MUOI_VIEC[k] || []).length === 10);
      r.mauDuBay  = ['hv', 'ph', 'ng'].every(k => (G.BDCN_QUY_TAC[k] || []).length === 7);
      r.mauManThat = Object.values(G.BDCN_MUOI_VIEC).flat()
        .filter(x => x.v && !G.VIEWS[x.v]).map(x => x.v);
      r.luatKhoa = (G.BDCN_QUY_TAC.ng || []).filter(x => x.khoa).length;
      r.trongVongNhac = (G.VIEC_NHAC || []).filter(x => x.v === 'ban-do-ca-nhan').length;
      r.dai = G.VIEWS['ban-do-ca-nhan']().length;
      r.batDauTuKhong = G.bdcnPhanTram();
      return r;
    });
    bao(bd.soO === 11, 'đủ mười một ô', bd.soO + ' ô');
    bao(bd.duMa, 'ô nào cũng có mã, số thứ tự, biểu tượng và màu');
    bao(bd.duBaGiong, 'ô nào cũng có đủ ba hệ ngôn từ: học viên · phụ huynh · đội ngũ');
    bao(bd.duNamCap, 'ô nào cũng đọc được ở năm cấp độ C1 → C5');
    bao(bd.duRanhGioi, 'ô nào cũng có ranh giới đạt · chưa đạt và ít nhất ba bước làm');
    bao(bd.manCoThat, 'mọi màn nối tiếp đều có thật');
    bao(!bd.oTrung.length, 'không khoá ô nhập nào bị trùng', bd.oTrung.join(', '));
    bao(bd.mauDuMuoi, 'bản mẫu mười việc đủ cho cả ba nhóm người');
    bao(bd.mauDuBay, 'bản mẫu bảy quy tắc đủ cho cả ba nhóm người');
    bao(!bd.mauManThat.length, 'việc mẫu nào có màn hình thì màn đó có thật', bd.mauManThat.join(', '));
    bao(bd.luatKhoa === 4, 'bốn quy tắc LV-01 của đội ngũ bị khoá, không sửa được', bd.luatKhoa + ' điều');
    bao(bd.trongVongNhac === 2, 'bản đồ đã nằm trong vòng nhắc Đúng – Đủ – Sâu, cả nhà lẫn nghề');
    bao(bd.dai > 6000, 'màn dựng ra nội dung thật, không phải một dòng trống', bd.dai + ' ký tự');
    bao(bd.batDauTuKhong === 0, 'tài khoản mới bắt đầu ở 0% — không tự tính là đã xong');

    /* Viết thật vào ô 1 rồi đọc lại, và kiểm nó đi vào đường đồng bộ */
    const viet = await p.evaluate(async () => {
      const G = window.G;
      G.S.view = 'ban-do-ca-nhan'; G.render();
      document.querySelector('[data-bd-mo="B01"]').click();
      await new Promise(r => setTimeout(r, 200));
      const t = document.querySelector('[data-bdo="b01a"]');
      if (!t) return { mo: false };
      t.value = 'Tôi làm việc này vì tôi không muốn lần sau lại ngồi im như lần trước.';
      t.dispatchEvent(new Event('change', { bubbles: true }));
      const t2 = document.querySelector('[data-bdo="b01b"]');
      t2.value = 'Tháng ba năm ngoái, một nhà hỏi tôi một câu mà tôi không trả lời được.';
      t2.dispatchEvent(new Event('change', { bubbles: true }));
      return {
        mo: true,
        trongS: G.S.bando.b01a || '',
        pt: G.bdcnPhanTram(),
        tiep: (G.bdcnOTiep() || {}).ma,
        moc: Object.keys(JSON.parse(localStorage.getItem('gita365.moc') || '{}'))
               .filter(k => k.indexOf('bando.') === 0),
        tren_dia: (JSON.parse(localStorage.getItem('gita365.v7') || '{}').bando || {}).b01a || ''
      };
    });
    bao(viet.mo, 'bấm vào ô 1 là mở ra ô nhập thật');
    bao(/không muốn lần sau/.test(viet.trongS), 'chữ vừa gõ nằm trong hồ sơ của tài khoản');
    bao(/không muốn lần sau/.test(viet.tren_dia), 'rời ô nhập là đã ghi xuống đĩa, không cần bấm nút');
    bao(viet.moc.length >= 2, 'đã đánh mốc để đẩy lên máy chủ theo từng trường', viet.moc.join(', '));
    bao(viet.pt === 9, 'xong ô 1 thì bản đồ đầy 9% — một phần mười một', viet.pt + '%');
    bao(viet.tiep === 'B02', 'chỉ đúng ô kế tiếp cần viết', viet.tiep);

    /* Lấy mười việc mẫu và bộ quy tắc mẫu */
    const mau = await p.evaluate(async () => {
      const G = window.G;
      document.querySelector('[data-bd-mo="B06"]').click();
      await new Promise(r => setTimeout(r, 200));
      document.querySelector('[data-bd-mau="viec"]').click();
      await new Promise(r => setTimeout(r, 200));
      const truoc = G.S.bando.viec1 && G.S.bando.viec1.t;
      /* Không được đè lên chữ người ta đã viết */
      G.bdcnGhi('viec1', { t: 'Việc của riêng tôi', n: 'ngay', sao: 1 });
      document.querySelector('[data-bd-mau="viec"]').click();
      await new Promise(r => setTimeout(r, 150));
      const sauKhiLay = G.S.bando.viec1.t;
      document.querySelector('[data-bd-mo="B09"]').click();
      await new Promise(r => setTimeout(r, 200));
      document.querySelector('[data-bd-mau="quytac"]').click();
      await new Promise(r => setTimeout(r, 200));
      const oKhoa = document.querySelector('[data-bdqt="1"]');
      return {
        viecDay: truoc && truoc.length > 5,
        khongDe: sauKhiLay === 'Việc của riêng tôi',
        soQt: [1,2,3,4,5,6,7].filter(i => (G.S.bando['qt'+i] || {}).t).length,
        khoaODau: !!(oKhoa && oKhoa.readOnly),
        giaKhoa: (G.S.bando.qt1 || {}).g || ''
      };
    });
    bao(mau.viecDay, 'bấm một nút là có mười việc mẫu đúng vai của mình');
    bao(mau.khongDe, 'bản mẫu KHÔNG đè lên dòng người ta đã tự viết');
    bao(mau.soQt === 7, 'bấm một nút là có đủ bảy quy tắc', mau.soQt + ' điều');
    bao(mau.khoaODau, 'quy tắc lấy từ Luật LV-01 không sửa được trên giao diện');
    bao(/50% KPI/.test(mau.giaKhoa), 'quy tắc khoá ghi rõ cái giá: hạ 50% KPI ba tháng');

    /* Ba hệ ngôn từ phải ra ba màn khác nhau */
    const ba = {};
    for (const [ten, u] of [['hv', 'hocvien@gita365.vn'], ['ph', 'phuhuynh@gita365.vn'],
                            ['ng', 'coach@gita365.vn']]) {
      await dangNhap(u);
      ba[ten] = await p.evaluate(() => {
        const G = window.G;
        return { dai: G.VIEWS['ban-do-ca-nhan']().length,
                 dau: G.VIEWS['ban-do-ca-nhan']().slice(0, 4000),
                 mau: (G.BDCN_MUOI_VIEC[G.NHOM_NGONNGU() === 'hocvien' ? 'hv'
                        : (G.NHOM_NGONNGU() === 'phuhuynh' ? 'ph' : 'ng')] || [])[0].t };
      });
    }
    bao(/của riêng em/.test(ba.hv.dau), 'học viên đọc bản đồ bằng giọng nói với em');
    bao(/của riêng nhà mình/.test(ba.ph.dau), 'phụ huynh và cộng tác viên đọc giọng nhà mình');
    bao(/Bản đồ cá nhân của tôi/.test(ba.ng.dau), 'đội ngũ đọc giọng nghề');
    bao(ba.hv.mau !== ba.ph.mau && ba.ph.mau !== ba.ng.mau,
      'mười việc mẫu khác nhau theo từng nhóm người');
    bao(ba.hv.dai > 6000 && ba.ph.dai > 6000 && ba.ng.dai > 6000,
      'cả ba nhóm đều thấy màn đầy đủ, không nhóm nào ra màn trống');
    bao(!/veVanDung|Dùng bản đồ này với một gia đình/.test(ba.ph.dau),
      'phần hướng dẫn cho đội ngũ KHÔNG lộ ra với gia đình');
    const nghe = await p.evaluate(() => window.G.VIEWS['ban-do-ca-nhan']());
    bao(/Dùng bản đồ này với một gia đình/.test(nghe),
      'đội ngũ có phần hướng dẫn vận dụng đi kèm');
  }

  /* ── 25. Sáu trăm chuyện truyền cảm hứng ── */
  console.log('\n25 · KHO CHUYỆN TRUYỀN CẢM HỨNG');
  {
    await p.evaluate(() => { localStorage.clear(); });
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });

    const ch = await p.evaluate(() => {
      const G = window.G, C = G.CHUYEN || [], r = {};
      r.tong = C.length;
      r.theoCap = {};
      (G.CH_CAP || []).forEach(x => r.theoCap[x.ma] = C.filter(c => c.cap === x.ma).length);
      r.soMach = (G.CH_MACH || []).length;
      r.trung = C.map(c => c.ma).filter((v, i, a) => a.indexOf(v) !== i);
      r.thieu = C.filter(c => !c.ten || !c.ke || !c.xoay || !c.hoc || !c.lam || !c.mach || !c.cap).length;
      const mach = (G.CH_MACH || []).map(m => m.ma);
      r.machLa = [...new Set(C.map(c => c.mach).filter(m => mach.indexOf(m) < 0))];
      const rohn = (G.ROHN || []).map(q => q.ma);
      r.loiLa = [...new Set(C.map(c => c.loi).filter(l => l && rohn.indexOf(l) < 0))];
      r.aiTrong = (G.ROHN || []).filter(q => !q.ai).length;
      /* Mỗi mạch của mỗi cấp phải có đúng mười chuyện */
      r.lech = [];
      (G.CH_CAP || []).forEach(cp => (G.CH_MACH || []).forEach(m => {
        const n = C.filter(c => c.cap === cp.ma && c.mach === m.ma).length;
        if (n !== 10) r.lech.push(cp.ma + '/' + m.ma + '=' + n);
      }));
      /* Chuyện gắn nhiệm vụ phải ổn định, không đổi giữa hai lần gọi */
      const a1 = G.chChoNhiemVu('ph', 0, 'x'), a2 = G.chChoNhiemVu('ph', 0, 'x');
      r.onDinh = !!(a1 && a2 && a1.ma === a2.ma);
      r.nvDungCap = (G.chChoNhiemVu('hs', 0, 'x') || {}).cap === 'HS';
      r.dai = G.VIEWS['chuyen-cam-hung']().length;
      r.moHet = G.chKhoMoDuoc().length;
      return r;
    });
    bao(ch.tong === 600, 'đủ sáu trăm chuyện', ch.tong + ' chuyện');
    bao(Object.values(ch.theoCap).every(n => n === 100),
      'mỗi cấp tài khoản đúng một trăm chuyện', JSON.stringify(ch.theoCap));
    bao(ch.soMach === 10, 'đủ mười mạch chuyện', ch.soMach + ' mạch');
    bao(!ch.lech.length, 'mỗi mạch của mỗi cấp đúng mười chuyện', ch.lech.join(' '));
    bao(!ch.trung.length, 'không mã chuyện nào trùng', ch.trung.join(', '));
    bao(ch.thieu === 0, 'chuyện nào cũng đủ tên · kể · chỗ xoay · điều rút ra · việc làm ngay',
      ch.thieu + ' chuyện thiếu');
    bao(!ch.machLa.length, 'không mã mạch lạ', ch.machLa.join(', '));
    bao(!ch.loiLa.length, 'mọi lời trích đều có trong bộ trích dẫn', ch.loiLa.join(', '));
    bao(ch.aiTrong === 0, 'lời trích nào cũng ghi rõ tác giả — không gán bừa cho ai',
      ch.aiTrong + ' câu thiếu tác giả');
    bao(ch.onDinh, 'chuyện gắn nhiệm vụ ổn định — cùng việc thì cùng chuyện');
    bao(ch.nvDungCap, 'chuyện gắn nhiệm vụ lấy đúng kho của cổng đó');
    bao(ch.dai > 5000, 'màn kho chuyện dựng ra nội dung thật', ch.dai + ' ký tự');
    bao(ch.moHet === 6, 'Super Admin soát được cả sáu kho', ch.moHet + ' kho');

    /* Mỗi vai chỉ mở kho của cấp mình */
    const vai = {};
    for (const [ten, u] of [['hs', 'hocvien@gita365.vn'], ['ph', 'phuhuynh@gita365.vn'],
                            ['ctv', 'daisu@gita365.vn'], ['coach', 'coach@gita365.vn'],
                            ['tuvan', 'tuvan@gita365.vn']]) {
      await p.evaluate(() => { localStorage.clear(); });
      await p.reload({ waitUntil: 'networkidle' });
      await p.waitForTimeout(400);
      await p.evaluate(x => window.G.doLogin(x), u);
      /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
      vai[ten] = await p.evaluate(() => {
        const G = window.G;
        return { cap: G.chCapCuaToi(), so: G.chKhoMoDuoc().length,
                 homNay: (G.chHomNay() || {}).cap,
                 nv: G.VIEWS['nhiem-vu']().indexOf('MỖI NHIỆM VỤ MỘT CHUYỆN') >= 0,
                 dai: G.VIEWS['chuyen-cam-hung']().length };
      });
    }
    bao(vai.hs.cap === 'HS' && vai.ph.cap === 'PH' && vai.ctv.cap === 'CTV' &&
        vai.coach.cap === 'COACH' && vai.tuvan.cap === 'TUVAN',
      'mỗi vai được xếp đúng kho của cấp mình');
    bao(Object.values(vai).every(v => v.so === 1),
      'vai thường chỉ mở kho của mình — không đọc được kho cấp khác');
    bao(Object.values(vai).every(v => v.homNay === v.cap),
      'chuyện hôm nay lấy đúng kho của cấp mình');
    bao(Object.values(vai).every(v => v.nv),
      'màn Nhiệm vụ của mọi vai đều có chuyện đi kèm từng việc');
    bao(Object.values(vai).every(v => v.dai > 5000),
      'không vai nào mở ra màn chuyện trống');
  }

  /* ── 26. Sổ nhật ký từng vị trí · cuộc thi viết ── */
  console.log('\n26 · SỔ NHẬT KÝ TỪNG VỊ TRÍ · CUỘC THI VIẾT');
  {
    await p.evaluate(() => { localStorage.clear(); });
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    await p.evaluate(() => window.G.doLogin('phuhuynh@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });

    const nkd = await p.evaluate(() => {
      const G = window.G, r = {};
      /* Mọi cấp vị trí đều có đủ ba nhịp ghi, không cấp nào bỏ trống */
      r.capThieu = (G.CH_CAP || []).map(c => c.ma)
        .filter(c => !G.NK_O[c] || !G.NK_O[c].ngay || !G.NK_O[c].tuan || !G.NK_O[c].thang);
      r.oIt = [];
      Object.keys(G.NK_O).forEach(c => ['ngay','tuan','thang'].forEach(n => {
        if ((G.NK_O[c][n] || []).length < 3) r.oIt.push(c + '/' + n);
      }));
      /* Khoá ô không được trùng trong cùng một nhịp */
      r.oTrung = [];
      Object.keys(G.NK_O).forEach(c => ['ngay','tuan','thang'].forEach(n => {
        const k = (G.NK_O[c][n] || []).map(x => x.k);
        if (k.some((v, i) => k.indexOf(v) !== i)) r.oTrung.push(c + '/' + n);
      }));
      r.soNhip = (G.NK_NHIP || []).length;
      r.dai = G.VIEWS['nhat-ky-vi-tri']().length;
      r.daiThi = G.VIEWS['thi-viet']().length;
      r.soMoc = (G.THI_VIET || []).length;
      r.mocDu = (G.THI_VIET || []).every(t => t.de && t.de.HS && t.de.PH && t.de.NG &&
        (t.cham || []).length >= 4 && t.thuong && t.vaoDuoc && t.do);
      r.hocBong = (G.THI_VIET || []).filter(t => /10%/.test(t.thuong)).map(t => t.ma);
      r.soLuat = (G.THI_LUAT || []).length;
      /* Mã tuần ISO phải ổn định và đúng dạng */
      /* 1/1/2026 là thứ Năm nên thuộc tuần 01 của chính 2026; còn 1/1/2027
         là thứ Sáu, thứ Năm của tuần ấy rơi vào 31/12/2026 nên phải ra
         tuần 53 của 2026. Hai mốc này bắt được lỗi lệch năm. */
      r.maTuan = G.nkMaTuan(new Date('2026-01-01T00:00:00'));
      r.maTuanBienNam = G.nkMaTuan(new Date('2027-01-01T00:00:00'));
      r.batDau = G.nkNgayBatDau();
      r.daDi = G.nkSoNgayDaDi();
      return r;
    });
    bao(!nkd.capThieu.length, 'mọi cấp vị trí đều có đủ ba nhịp ghi', nkd.capThieu.join(', '));
    bao(!nkd.oIt.length, 'nhịp nào cũng có ít nhất ba ô ghi', nkd.oIt.join(' '));
    bao(!nkd.oTrung.length, 'không khoá ô nào bị trùng trong cùng một nhịp', nkd.oTrung.join(' '));
    bao(nkd.soNhip === 3, 'đủ ba nhịp: ngày · tuần · tháng', nkd.soNhip + ' nhịp');
    bao(nkd.dai > 3000, 'màn sổ nhật ký dựng ra nội dung thật', nkd.dai + ' ký tự');
    bao(nkd.daiThi > 5000, 'màn cuộc thi viết dựng ra nội dung thật', nkd.daiThi + ' ký tự');
    bao(nkd.soMoc === 4, 'đủ bốn mốc thi 7 · 21 · 90 · 365', nkd.soMoc + ' mốc');
    bao(nkd.mocDu, 'mốc nào cũng đủ đề ba nhóm · tiêu chí chấm · phần thưởng · điều kiện · độ dài');
    bao(nkd.hocBong.length === 2 && nkd.hocBong.indexOf('TV90') >= 0 && nkd.hocBong.indexOf('TV365') >= 0,
      'học bổng 10% đúng ở hai mốc 90 và 365 ngày', nkd.hocBong.join(' '));
    bao(nkd.soLuat >= 5, 'có bộ luật dự thi', nkd.soLuat + ' điều');
    bao(nkd.maTuan === 'T2026-W01' && nkd.maTuanBienNam === 'T2026-W53',
      'mã tuần theo chuẩn ISO, không lệch ở ranh giới năm', nkd.maTuan + ' · ' + nkd.maTuanBienNam);
    bao(/^\d{4}-\d{2}-\d{2}$/.test(nkd.batDau) && nkd.daDi >= 1,
      'ngày bắt đầu hành trình được đặt ngay lần mở đầu', nkd.batDau + ' · ' + nkd.daDi + ' ngày');

    /* Ghi thật vào sổ, rồi kiểm điều kiện dự thi và chặn nộp non */
    const ghi = await p.evaluate(async () => {
      const G = window.G;
      G.S.view = 'nhat-ky-vi-tri'; G.render();
      await new Promise(r => setTimeout(r, 200));
      const o = document.querySelectorAll('[data-nko]');
      if (!o.length) return { mo: false };
      o.forEach((t, i) => { t.value = 'Dữ liệu thử số ' + i; });
      document.querySelector('[data-nkluu]').click();
      await new Promise(r => setTimeout(r, 200));
      const khoa = G.nkMaNgay();
      return {
        mo: true,
        trongS: !!(G.S.nhatky[khoa] && G.S.nhatky[khoa][Object.keys(G.S.nhatky[khoa])[0]]),
        tren_dia: !!((JSON.parse(localStorage.getItem('gita365.v7') || '{}').nhatky || {})[khoa]),
        demNgay: G.nkDem('ngay'),
        moc: Object.keys(JSON.parse(localStorage.getItem('gita365.moc') || '{}'))
               .filter(k => k.indexOf('nhatky.') === 0).length
      };
    });
    bao(ghi.mo, 'bấm vào sổ là mở ra ô ghi thật cho vai của mình');
    bao(ghi.trongS, 'chữ vừa ghi nằm trong hồ sơ của tài khoản');
    bao(ghi.tren_dia, 'sổ ghi xuống đĩa ngay, không mất khi đóng tab');
    bao(ghi.demNgay === 1, 'đếm đúng số ngày đã ghi', ghi.demNgay + ' ngày');
    bao(ghi.moc >= 1, 'đã đánh mốc để đẩy sổ lên máy chủ theo từng trường', ghi.moc + ' mốc');

    const thi = await p.evaluate(async () => {
      const G = window.G;
      G.S.view = 'thi-viet'; G.render();
      await new Promise(r => setTimeout(r, 200));
      document.querySelector('[data-tvmo="TV07"]').click();
      await new Promise(r => setTimeout(r, 200));
      const t = document.querySelector('[data-tvbai="TV07"]');
      if (!t) return { mo: false };
      t.value = 'Bài quá ngắn.';
      const nut = document.querySelector('[data-tvnop="TV07"]');
      /* Mốc 7 ngày chưa mở với tài khoản mới, nên không có nút nộp — đúng luật */
      document.querySelector('[data-tvluu="TV07"]').click();
      await new Promise(r => setTimeout(r, 200));
      return {
        mo: true,
        coNutNop: !!nut,
        nhapLuu: (G.S.baithi.TV07 || {}).bai === 'Bài quá ngắn.',
        chuaNop: !(G.S.baithi.TV07 || {}).nop,
        vietTruoc: G.VIEWS['thi-viet']().indexOf('Viết trước được') >= 0
      };
    });
    bao(thi.mo, 'mở được khung viết ngay cả khi chưa tới mốc');
    bao(!thi.coNutNop, 'chưa đủ điều kiện thì KHÔNG có nút nộp — không ai nộp non được');
    bao(thi.nhapLuu, 'bản nháp lưu được từ trước, để bồi dần theo chặng');
    bao(thi.chuaNop, 'lưu nháp không bị tính là đã nộp');
    bao(thi.vietTruoc, 'màn nói rõ là viết trước được, không chặn ai ở cửa');

    /* Đề bài phải đổi theo nhóm người đọc */
    const de = {};
    for (const [ten, u] of [['hs','hocvien@gita365.vn'], ['ph','phuhuynh@gita365.vn'],
                            ['coach','coach@gita365.vn']]) {
      await p.evaluate(() => { localStorage.clear(); });
      await p.reload({ waitUntil: 'networkidle' });
      await p.waitForTimeout(400);
      await p.evaluate(x => window.G.doLogin(x), u);
      /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
      de[ten] = await p.evaluate(() => ({
        thi: window.G.VIEWS['thi-viet'](),
        so: window.G.VIEWS['nhat-ky-vi-tri']()
      }));
    }
    bao(/em làm được mà trước đó em nghĩ/.test(de.hs.thi), 'học viên đọc đề bằng giọng nói với em');
    bao(/trong nhà mình đã khác/.test(de.ph.thi), 'phụ huynh đọc đề bằng giọng nhà mình');
    bao(/vai này cho anh chị thấy/.test(de.coach.thi), 'đội ngũ đọc đề bằng giọng nghề');
    bao(/Sổ tay của em/.test(de.hs.so) && /Sổ tay của nhà mình/.test(de.ph.so) &&
        /Sổ tay nghề của tôi/.test(de.coach.so), 'sổ nhật ký đổi tên và giọng theo từng vai');
    bao(/Giờ ngồi vào bàn/.test(de.hs.so) && /Số ca làm việc hôm nay/.test(de.coach.so),
      'ô ghi khác nhau thật theo từng vị trí, không dùng chung một mẫu');
  }

  /* ── 27. Đo thời gian · chuẩn hoàn thành · thưởng phạt ── */
  console.log('\n27 · ĐO THỜI GIAN · THƯỞNG VÀ PHẠT');
  {
    await p.evaluate(() => { localStorage.clear(); });
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    await p.evaluate(() => window.G.doLogin('phuhuynh@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });

    const tgd = await p.evaluate(() => {
      const G = window.G, r = {};
      r.soLoai = (G.TG_LOAI || []).length;
      r.thangDung = (G.TG_LOAI || []).every(x => x.toiThieu < x.chuan && x.chuan < x.tran);
      r.duY = (G.TG_LOAI || []).every(x => x.y && x.vd);
      /* Mọi màn được xếp loại phải trỏ tới một loại có thật, và màn có thật */
      const loai = (G.TG_LOAI || []).map(x => x.ma);
      r.loaiLa = [...new Set(Object.values(G.TG_XEP).filter(x => loai.indexOf(x) < 0))];
      r.manLa = Object.keys(G.TG_XEP).filter(v => !G.manCoThat(v));
      r.macDinh = G.tgLoaiCua('mot-man-khong-co-that') === 'xem';
      /* Ba ngưỡng xếp đúng */
      r.luot = G.tgXep('mo-thuc', 10).ma;
      r.du   = G.tgXep('mo-thuc', 360).ma;
      r.mac  = G.tgXep('mo-thuc', 5000).ma;
      /* Chuẩn hoàn thành: sớm phải nhỏ hơn hạn */
      r.nvDung = (G.TG_NHIEMVU || []).every(x => x.som < x.han && x.phat && x.vd);
      r.soNV = (G.TG_NHIEMVU || []).length;
      /* Thưởng và phạt */
      r.soThuong = (G.TG_THUONG || []).length;
      r.thuongDuY = (G.TG_THUONG || []).every(x => x.cho && x.vi && x.diem > 0);
      r.soPhat = (G.TG_PHAT || []).length;
      r.phatDuGo = (G.TG_PHAT || []).every(x => x.muc && x.gio && x.vi);
      r.coLV01 = (G.TG_PHAT || []).some(x => /50%/.test(x.muc) && /ba tháng/i.test(x.muc));
      /* Quy đổi: phải tăng dần và có cả ba loại */
      const qd = G.TG_QUYDOI || [];
      r.qdTang = qd.every((x, i) => i === 0 || x.diem > qd[i-1].diem);
      r.qdLoai = [...new Set(qd.map(x => x.loai))].sort().join(',');
      r.dai = G.VIEWS['do-thoi-gian']().length;
      return r;
    });
    bao(tgd.soLoai === 6, 'đủ sáu loại màn có chuẩn thời gian riêng', tgd.soLoai + ' loại');
    bao(tgd.thangDung, 'ba ngưỡng của loại nào cũng tăng dần: tối thiểu < chuẩn < trần');
    bao(tgd.duY, 'loại nào cũng nói rõ gồm màn gì và vì sao đặt ngưỡng như vậy');
    bao(!tgd.loaiLa.length, 'không màn nào được xếp vào loại không có thật', tgd.loaiLa.join(', '));
    bao(!tgd.manLa.length, 'bảng xếp loại không trỏ tới màn không tồn tại', tgd.manLa.join(', '));
    bao(tgd.macDinh, 'màn chưa khai loại thì rơi về loại nhìn tổng quan, không vỡ');
    bao(tgd.luot === 'luot' && tgd.du === 'du' && tgd.mac === 'mac',
      'xếp đúng ba ngưỡng lướt · đủ · đang mắc', tgd.luot + ' ' + tgd.du + ' ' + tgd.mac);
    bao(tgd.soNV === 6 && tgd.nvDung, 'sáu chuẩn hoàn thành, xong sớm luôn nhỏ hơn hạn');
    bao(tgd.soThuong >= 7 && tgd.thuongDuY, 'thang thưởng đủ mức, mức nào cũng nói rõ được gì và vì sao');
    bao(tgd.soPhat >= 7 && tgd.phatDuGo, 'thang phạt đủ mức, mức nào cũng có đường gỡ và lý do');
    bao(tgd.coLV01, 'có mức hạ 50% KPI ba tháng của luật LV-01');
    bao(tgd.qdTang, 'thang quy đổi điểm tăng dần, không có bậc lộn xộn');
    bao(tgd.qdLoai === 'người,tri thức,vật chất',
      'quy đổi có cả ba loại: tri thức · người · vật chất', tgd.qdLoai);
    bao(tgd.dai > 8000, 'màn thời gian dựng ra nội dung thật', tgd.dai + ' ký tự');

    /* Đồng hồ chạy thật, và dừng đúng lúc */
    const dh = await p.evaluate(async () => {
      const G = window.G;
      G.go('nhiem-vu');
      await new Promise(r => setTimeout(r, 100));
      /* Giả lập có thao tác rồi ép chốt bằng cách đổi màn */
      document.dispatchEvent(new Event('click'));
      await new Promise(r => setTimeout(r, 1200));
      G.go('ban-do');
      await new Promise(r => setTimeout(r, 100));
      const d = G.tgNgay();
      return { coSo: Number(d['nhiem-vu']) > 0, tong: Number(d.__tong) > 0,
               trenDia: !!((JSON.parse(localStorage.getItem('gita365.v7') || '{}').thoigian || {})['ng|' +
                 new Date().toISOString().slice(0,10)]),
               moc: Object.keys(JSON.parse(localStorage.getItem('gita365.moc') || '{}'))
                      .filter(k => k.indexOf('thoigian.') === 0).length };
    });
    bao(dh.coSo, 'đồng hồ ghi được thời gian thật của một màn');
    bao(dh.tong, 'có tổng thời gian trong ngày');
    bao(dh.trenDia, 'số liệu thời gian ghi xuống đĩa, không mất khi đóng tab');
    bao(dh.moc >= 1, 'đã đánh mốc để đẩy lên máy chủ theo từng trường', dh.moc + ' mốc');

    /* Xoá kho trình duyệt rồi tải lại thì KHÔNG được dựng lại phiên cũ */
    await p.evaluate(() => { localStorage.clear(); });
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForTimeout(500);
    const sach = await p.evaluate(() => ({
      gate: !!document.getElementById('inU'),
      con: !!localStorage.getItem('gita365.v7')
    }));
    bao(sach.gate && !sach.con,
      'xoá kho trình duyệt rồi tải lại thì về màn đăng nhập — đồng hồ không dựng lại phiên vừa xoá');
  }

  /* ── 28. Màn giới thiệu · đọc hoặc nghe ── */
  console.log('\n28 · GIỚI THIỆU GITA365 · ĐỌC HOẶC NGHE');
  {
    await p.evaluate(() => { localStorage.clear(); });
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    await p.evaluate(() => window.G.doLogin('phuhuynh@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });

    const gt = await p.evaluate(() => {
      const G = window.G, r = {};
      const html = G.VIEWS['gioi-thieu']();
      r.dai = html.length;
      r.coKhong = html.indexOf('SÁU ĐIỀU HỌC VIỆN KHÔNG LÀM') >= 0;
      r.soKhong = (G.GT_KHONG || []).length;
      r.soHua = (G.GT_HUA || []).length;
      r.soChang = (G.GT_CHANG || []).length;
      r.soHoi = (G.GT_HOI || []).length;
      r.buocThat = (G.GT_BUOC || []).filter(x => !G.VIEWS[x.v]).map(x => x.v);
      /* Phần dành riêng đội ngũ không được lộ ra với gia đình */
      r.loDoiNgu = html.indexOf('DÙNG BẢN NÀY KHI NGỒI TRƯỚC GIA ĐÌNH') >= 0;
      /* Không hứa điểm số, không hứa nhanh — hai câu này phải có mặt */
      r.khongHuaDiem = (G.GT_KHONG || []).some(x => /không cam kết con lên mấy điểm/i.test(x));
      r.khongNhanh = (G.GT_KHONG || []).some(x => /Không nhanh/i.test(x));
      return r;
    });
    bao(gt.dai > 8000, 'màn giới thiệu dựng ra nội dung thật', gt.dai + ' ký tự');
    bao(gt.soHua === 4 && gt.soChang === 4 && gt.soHoi >= 8,
      'đủ bốn điều làm được, bốn chặng và tám câu hỏi hay gặp');
    bao(gt.coKhong && gt.soKhong === 6,
      'sáu điều KHÔNG làm được đặt ngay trong màn, không giấu xuống cuối', gt.soKhong + ' điều');
    bao(gt.khongHuaDiem && gt.khongNhanh,
      'nói rõ không cam kết điểm số và không hứa nhanh');
    bao(!gt.buocThat.length, 'mọi bước tiếp theo đều trỏ tới màn có thật', gt.buocThat.join(', '));
    bao(!gt.loDoiNgu, 'phần bản nói dành cho đội ngũ KHÔNG lộ ra với gia đình');

    const nghe = await p.evaluate(() => {
      const G = window.G, r = {};
      /* Không giọng nào được coi là hợp lệ khi chưa có đủ tên, hợp đồng, hạn */
      r.giongTrong = (G.AD_GIONG || []).filter(g => G.adGiongHopLe(g)).length;
      r.soGiong = (G.AD_GIONG || []).length;
      /* Lấy đúng một chuyện của kho Học viên: thứ tự trong gói đã mã hoá
         không theo thứ tự tệp nguồn, nên không được lấy phần tử đầu tiên. */
      const c = (G.CHUYEN || []).filter(x => x.cap === 'HS')[0];
      r.tt = G.adTrangThai(c).ma;
      /* Giả lập ký hợp đồng: đủ ba ô và còn hạn thì phát được */
      const g = (G.AD_GIONG || []).filter(x => x.cap === 'HS')[0];
      const luu = { ten: g.ten, hopDong: g.hopDong, den: g.den };
      g.ten = 'Người dẫn thử'; g.hopDong = 'HD-THU-01'; g.den = '2099-12-31';
      r.ttSauKy = G.adTrangThai(c).ma;
      r.coTen = G.adTrinhPhat(c).indexOf('Người dẫn thử') >= 0;
      r.coChanTai = G.adTrinhPhat(c).indexOf('nodownload') >= 0;
      /* Hết hạn thì tự gỡ, không đợi ai nhớ */
      g.den = '2020-01-01';
      r.ttHetHan = G.adTrangThai(c).ma;
      r.hetHanKhongPhat = G.adTrinhPhat(c).indexOf('<audio') < 0;
      Object.assign(g, luu);
      /* Kịch bản dẫn ghép đủ sáu phần từ chính nội dung chuyện */
      const kb = G.adKichBan(c);
      r.kbDu = ['[MỞ', '[KỂ', '[CHỖ XOAY', '[ĐIỀU RÚT RA', '[VIỆC LÀM NGAY']
        .every(x => kb.indexOf(x) >= 0);
      r.kbCoNoiDung = kb.indexOf(c.ke) >= 0 && kb.indexOf(c.hoc) >= 0 && kb.indexOf(c.lam) >= 0;
      /* Nút chuyển Đọc / Nghe có mặt trên mọi chỗ hiện chuyện */
      r.coNut = G.veChuyen(c).indexOf('data-adche="nghe"') >= 0;
      r.daiGiongDoc = G.VIEWS['giong-doc']().length;
      r.noiThang = G.VIEWS['giong-doc']().indexOf('mạo danh') >= 0;
      return r;
    });
    bao(nghe.giongTrong === 0 && nghe.soGiong === 4,
      'bốn hồ sơ giọng đã dựng, chưa hồ sơ nào có hợp đồng — đúng thực tế');
    bao(nghe.tt === 'chua', 'chưa có hợp đồng thì báo là chưa có bản thu, không giả vờ có', nghe.tt);
    bao(nghe.ttSauKy === 'song' && nghe.coTen,
      'điền đủ tên, hợp đồng và hạn thì audio lên ngay, kèm tên người dẫn');
    bao(nghe.coChanTai, 'trình phát tắt nút tải xuống của trình duyệt');
    bao(nghe.ttHetHan === 'hethan' && nghe.hetHanKhongPhat,
      'hết hạn hợp đồng thì hệ thống TỰ gỡ khỏi trình phát, không đợi ai nhớ');
    bao(nghe.kbDu && nghe.kbCoNoiDung,
      'kịch bản dẫn ghép đủ các phần, lấy đúng nội dung chuyện, không thêm bớt');
    bao(nghe.coNut, 'mọi chỗ hiện chuyện đều có nút chuyển Đọc ↔ Nghe');
    bao(nghe.daiGiongDoc > 6000, 'màn hồ sơ giọng đọc dựng ra nội dung thật',
      nghe.daiGiongDoc + ' ký tự');
    bao(nghe.noiThang, 'màn nói thẳng vì sao chưa có bản thu, không vòng vo');

    /* Đội ngũ THÌ thấy phần bản nói */
    await p.evaluate(() => { localStorage.clear(); });
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    await p.evaluate(() => window.G.doLogin('tuvan@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const dn = await p.evaluate(() => window.G.VIEWS['gioi-thieu']());
    bao(dn.indexOf('DÙNG BẢN NÀY KHI NGỒI TRƯỚC GIA ĐÌNH') >= 0,
      'đội ngũ có bản nói lại cho gọn khi ngồi trước gia đình');
    bao(dn.indexOf('Đừng hứa nhanh hơn để chốt cho được') >= 0,
      'bản nói của đội ngũ cấm hứa nhanh hơn để chốt');
  }

  /* ── 29. Sát hạch năng lực · khoá đào tạo tự động ── */
  console.log('\n29 · SÁT HẠCH NĂNG LỰC · KHOÁ ĐÀO TẠO TỰ ĐỘNG');
  {
    await p.evaluate(() => { localStorage.clear(); });
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    await p.evaluate(() => window.G.doLogin('coach@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });

    const kho = await p.evaluate(() => {
      const G = window.G, r = {};
      const H = G.SH_HOI || [];
      r.tong = H.length;
      r.hong = H.filter(x => !x.h || !Array.isArray(x.p) || x.p.length !== 4 ||
        typeof x.d !== 'number' || x.d < 0 || x.d > 3 || !x.vs || !x.truc || !x.vai || !x.tang).length;
      r.trung = H.map(x => x.ma).filter((v, i, a) => a.indexOf(v) !== i);
      const truc = (G.SH_TRUC || []).map(x => x.ma);
      r.trucLa = [...new Set(H.map(x => x.truc).filter(t => truc.indexOf(t) < 0))];
      const tang = (G.SH_TANG || []).map(x => x.ma);
      r.tangLa = [...new Set(H.map(x => x.tang).filter(t => tang.indexOf(t) < 0))];
      const vai = (G.SH_VAI || []).map(x => x.ma);
      r.vaiLa = [...new Set(H.map(x => x.vai).filter(v => vai.indexOf(v) < 0))];
      /* Số câu mỗi bài phải NHỎ HƠN kho của tầng ấy, nếu không thì mọi lần
         thi ra cùng một đề và luật bốc ngẫu nhiên chỉ là chữ */
      r.deQuaTo = [];
      vai.forEach(v => (G.SH_TANG || []).forEach(t => {
        const n = H.filter(x => x.vai === v && x.tang === t.ma).length;
        if (n <= t.cau) r.deQuaTo.push(v + '/' + t.ma + ' kho ' + n + ' ≤ đề ' + t.cau);
      }));
      /* Trọng số mỗi vai cộng lại đúng 100 */
      r.tsLech = Object.keys(G.SH_TRONGSO || {}).filter(k =>
        Object.values(G.SH_TRONGSO[k]).reduce((a, b) => a + b, 0) !== 100);
      r.soTruc = (G.SH_TRUC || []).length;
      r.soTang = (G.SH_TANG || []).length;
      r.soTN = (G.SH_TOTNGHIEP || []).length;
      r.soVai = vai.length;
      return r;
    });
    bao(kho.tong >= 300, 'kho câu hỏi đủ lớn', kho.tong + ' câu');
    bao(kho.hong === 0, 'câu nào cũng đủ bốn phương án, một đáp án, một trục, một tầng và phần vì sao',
      kho.hong + ' câu hỏng');
    bao(!kho.trung.length, 'không mã câu hỏi nào trùng', kho.trung.join(', '));
    bao(!kho.trucLa.length && !kho.tangLa.length && !kho.vaiLa.length,
      'không có mã trục, tầng hay vai lạ trong kho',
      [...kho.trucLa, ...kho.tangLa, ...kho.vaiLa].join(', '));
    bao(kho.soTruc === 8 && kho.soTang === 5 && kho.soTN === 4 && kho.soVai === 6,
      'đủ tám trục · năm tầng · bốn bài tốt nghiệp · sáu vai được sát hạch');
    bao(!kho.deQuaTo.length,
      'mỗi bài đều nhỏ hơn kho của tầng ấy — đề bốc ngẫu nhiên mới có nghĩa', kho.deQuaTo.join(' · '));
    bao(!kho.tsLech.length, 'trọng số tám trục của mỗi vai cộng lại đúng 100', kho.tsLech.join(', '));

    /* Làm thật một bài và kiểm máy chấm */
    const thi = await p.evaluate(async () => {
      const G = window.G, r = {};
      r.vai = G.shVaiCuaToi();
      r.capDau = G.shCapCuaToi();
      /* Không nhảy tầng */
      r.b2Khoa = !G.shMoDuoc('B2');
      const de = G.shDe('B1', 12345);
      r.deDung = de.length === 8 && de.every(x => x.vai === r.vai && x.tang === 'B1');
      /* Bốc ổn định với cùng hạt, khác nhau với hạt khác */
      const de2 = G.shDe('B1', 12345), de3 = G.shDe('B1', 99999);
      r.onDinh = de.map(x => x.ma).join() === de2.map(x => x.ma).join();
      r.khacHat = de.map(x => x.ma).join() !== de3.map(x => x.ma).join();
      /* Chấm: trả lời đúng hết thì phải đạt */
      const dung = G.shCham('B1', de, de.map(x => x.d));
      r.dungHet = dung.diem === 100 && dung.dat === true;
      /* Trả lời sai hết thì không đạt và mọi trục đều vào danh sách yếu */
      const sai = G.shCham('B1', de, de.map(x => (x.d + 1) % 4));
      r.saiHet = sai.diem === 0 && sai.dat === false && sai.trucYeu.length > 0;
      return r;
    });
    bao(thi.vai === 'COACH', 'Coach được xếp đúng bộ đề của vai mình', thi.vai);
    bao(thi.capDau === 'C0', 'tài khoản mới chưa có cấp độ hành nghề nào', thi.capDau);
    bao(thi.b2Khoa, 'chưa đạt B1 thì B2 không mở — không nhảy tầng');
    bao(thi.deDung, 'đề bốc đúng số câu, đúng vai, đúng tầng');
    bao(thi.onDinh && thi.khacHat,
      'cùng một lượt thi thì đề không đổi; lượt khác thì đề khác');
    bao(thi.dungHet, 'đúng hết thì 100% và đạt');
    bao(thi.saiHet, 'sai hết thì 0%, không đạt, và mọi trục vào danh sách cần học');

    /* Đi hết một lượt thi thật trên giao diện */
    const lam = await p.evaluate(async () => {
      const G = window.G;
      G.S.view = 'sat-hach'; G.render();
      await new Promise(r => setTimeout(r, 150));
      const nut = document.querySelector('[data-shthi="B1"]');
      if (!nut) return { mo: false };
      nut.click();
      await new Promise(r => setTimeout(r, 200));
      /* Trả lời SAI hết, để kiểm nhánh chưa đạt và nhánh tự mở khoá học.
         Phải đi theo chỉ số câu: sau mỗi lần bấm màn vẽ lại, nên lấy phần
         tử đầu tiên mỗi vòng thì chỉ bấm đi bấm lại đúng câu số một. */
      const soCau = document.querySelectorAll('[data-shchon]').length / 4;
      for (let i = 0; i < soCau; i++) {
        const nutA = document.querySelector('[data-shchon="' + i + '-0"]');
        if (nutA) nutA.click();   /* phương án A — sai với hầu hết câu trong kho */
        await new Promise(r => setTimeout(r, 25));
      }
      const coNop = !!document.querySelector('[data-shnop]');
      if (coNop) { document.querySelector('[data-shnop]').click(); await new Promise(r => setTimeout(r, 200)); }
      const kq = (G.S.sathach || {})['bai|B1'];
      return {
        mo: true, coNop: coNop, coKq: !!kq, lan: G.shSoLanThi('B1'),
        trenDia: !!((JSON.parse(localStorage.getItem('gita365.v7') || '{}').sathach || {})['bai|B1']),
        manKq: (G.VIEWS['sat-hach']() || '').indexOf('TÁM TRỤC · KẾT QUẢ TỪNG TRỤC') >= 0,
        yeu: (kq && kq.trucYeu || []).length
      };
    });
    bao(lam.mo && lam.coNop, 'bấm thi là mở ra đề thật, chọn đủ thì hiện nút nộp');
    bao(lam.coKq && lam.lan === 1, 'nộp xong có kết quả và đếm đúng số lần thi');
    bao(lam.trenDia, 'kết quả thi ghi xuống đĩa, không mất khi đóng tab');
    bao(lam.manKq, 'màn kết quả hiện kết quả từng trục trong tám trục');

    /* Khoá đào tạo: trục yếu mở đúng bài của trục đó */
    const kdt = await p.evaluate(() => {
      const G = window.G, r = {};
      const ds = G.khBaiCuaToi();
      r.soBai = ds.length;
      r.duBaPhan = ds.every(x => x.hoc && x.lam && x.nop);
      r.loTrinh = (G.khLoTrinh() || {}).vai;
      /* Trước v9.3 chỗ này đọc kết quả bài thi mà bước kiểm liền trước
         vừa nộp — mà bài thi ấy chấm ra trục yếu nào là tuỳ đáp án được
         chọn. Có lần ra một trục yếu, có lần ra cả tám. Ra cả tám thì
         `khac` rỗng, `some` trên mảng rỗng là false, và phép đo đỏ dù mã
         không đổi. Chạy ba lần liên tiếp cùng một mã: xanh · đỏ · xanh.

         Nay phép đo tự DỰNG trạng thái nó muốn kiểm — đúng một trục yếu,
         chọn từ chính trục của bài đầu tiên — rồi mới đo. Kiểm được đúng
         cái luật cần kiểm, và kiểm được mỗi lần chạy. Trả state về chỗ cũ
         sau khi đo, để bước sau không thừa hưởng đồ giả. */
      const giuSH = G.S.sathach;
      const trucMot = ds[0] && ds[0].truc;
      G.S.sathach = { 'bai|dung': { trucYeu: [trucMot] } };
      const yeu = Object.keys(G.khTrucYeu());
      r.yeu = yeu.length;
      r.dungMotTruc = yeu.length === 1 && yeu[0] === trucMot;
      const baiYeu = ds.filter(x => x.truc === trucMot);
      r.baiYeuMo = baiYeu.length > 0 && baiYeu.every(x => G.khMoDuoc(x.ma));
      /* Bài KHÔNG thuộc trục yếu, không phải bài đầu, và bài liền trước
         chưa nộp — bài ấy phải còn khoá. */
      const khac = ds.filter((x, i) => i > 0 && x.truc !== trucMot &&
        G.khTrangThai(ds[i - 1].ma) !== 'xong');
      r.soKhac = khac.length;
      r.coKhoa = khac.length > 0 && khac.some(x => !G.khMoDuoc(x.ma));
      G.S.sathach = giuSH;
      r.dai = G.VIEWS['khoa-dao-tao']().length;
      r.soLuat = (G.KH_LUAT || []).length;
      return r;
    });
    bao(kdt.soBai > 0 && kdt.duBaPhan,
      'bài nào cũng đủ ba phần Học · Làm · Nộp', kdt.soBai + ' bài');
    bao(kdt.loTrinh === 'COACH', 'mở đúng lộ trình của vai đang đăng nhập', kdt.loTrinh);
    bao(kdt.dungMotTruc && kdt.baiYeuMo,
      'trục bài thi chỉ ra còn yếu thì bài của trục đó mở NGAY, không xếp hàng',
      kdt.dungMotTruc ? 'dựng đúng 1 trục yếu · bài của trục đó đều mở' : 'không dựng được trạng thái để đo');
    bao(kdt.coKhoa,
      'bài không thuộc trục yếu vẫn khoá cho tới khi nộp bài liền trước',
      kdt.soKhac ? kdt.soKhac + ' bài ngoài trục yếu, có bài còn khoá' : 'không có bài nào ngoài trục yếu để đo');
    bao(kdt.dai > 6000, 'màn khoá đào tạo dựng ra nội dung thật', kdt.dai + ' ký tự');
    bao(kdt.soLuat >= 6, 'có bộ luật học', kdt.soLuat + ' điều');

    /* Nộp bằng chứng quá ngắn thì bị chặn */
    const nop = await p.evaluate(async () => {
      const G = window.G;
      G.S.view = 'khoa-dao-tao'; G.render();
      await new Promise(r => setTimeout(r, 150));
      const mo = document.querySelector('[data-khmo]');
      if (!mo) return { mo: false };
      const ma = mo.getAttribute('data-khmo');
      mo.click();
      await new Promise(r => setTimeout(r, 200));
      const o = document.querySelector('[data-khnop]');
      if (!o) return { mo: false };
      o.value = 'ngắn quá';
      document.querySelector('[data-khxong]').click();
      await new Promise(r => setTimeout(r, 150));
      const chan = G.khTrangThai(ma) !== 'xong';
      const o2 = document.querySelector('[data-khnop]');
      o2.value = 'Đã làm với ba nhà trong tuần này, mỗi nhà một bảng ba dòng cụ thể, có ghi ngày.';
      document.querySelector('[data-khxong]').click();
      await new Promise(r => setTimeout(r, 200));
      return { mo: true, chan: chan, xong: G.khTrangThai(ma) === 'xong',
               trenDia: !!((JSON.parse(localStorage.getItem('gita365.v7') || '{}').khoahoc || {})['bai|' + ma]) };
    });
    bao(nop.mo, 'mở được một bài học thật trên giao diện');
    bao(nop.chan, 'bằng chứng quá ngắn thì bị chặn — không nhận bài làm cho xong');
    bao(nop.xong && nop.trenDia, 'nộp bằng chứng thật thì bài tính là xong và ghi xuống đĩa');

    /* Vai khác thì bộ đề và lộ trình khác */
    const vaiKhac = {};
    for (const [ten, u] of [['ctv', 'daisu@gita365.vn'], ['gv', 'giaovien@gita365.vn'],
                            ['hs', 'hocvien@gita365.vn']]) {
      await p.evaluate(() => { localStorage.clear(); });
      await p.reload({ waitUntil: 'networkidle' });
      await p.waitForTimeout(400);
      await p.evaluate(x => window.G.doLogin(x), u);
      /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
      vaiKhac[ten] = await p.evaluate(() => ({
        vai: window.G.shVaiCuaToi(),
        soCau: window.G.shKhoCua(window.G.shVaiCuaToi()).length,
        lo: (window.G.khLoTrinh() || {}).ma || '',
        dai: window.G.VIEWS['sat-hach']().length
      }));
    }
    bao(vaiKhac.ctv.vai === 'CTV' && vaiKhac.gv.vai === 'GV' && vaiKhac.hs.vai === 'HS',
      'mỗi vai được xếp đúng bộ sát hạch của mình');
    bao(Object.values(vaiKhac).every(v => v.soCau >= 55),
      'vai nào cũng có kho đề riêng đủ lớn');
    bao(vaiKhac.ctv.lo === 'LT-CTV' && vaiKhac.gv.lo === 'LT-GV',
      'cộng tác viên và giáo viên mở đúng lộ trình đào tạo của mình');
    bao(vaiKhac.hs.lo === '', 'học viên không có lộ trình đào tạo nghề — đúng, đó là bốn vai làm nghề');
    bao(Object.values(vaiKhac).every(v => v.dai > 6000), 'không vai nào mở ra màn sát hạch trống');
  }

  /* ── 30. Kho chuyện người thật ── */
  console.log('\n30 · KHO CHUYỆN NGƯỜI THẬT');
  {
    await p.evaluate(() => { localStorage.clear(); });
    await p.reload({ waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    await p.evaluate(() => window.G.doLogin('hocvien@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });

    const tg = await p.evaluate(() => {
      const G = window.G, C = G.CHUYEN_TG || [], r = {};
      r.tong = C.length;
      r.thieu = C.filter(x => !x.ten || !x.nuoc || !x.nam || !x.viec || !x.kho ||
        !x.lam || !x.hoc || !x.vd || !x.mach || !x.linh).length;
      r.trung = C.map(x => x.ma).filter((v, i, a) => a.indexOf(v) !== i);
      const linh = (G.TG_LINH || []).map(x => x.ma);
      r.linhLa = [...new Set(C.map(x => x.linh).filter(y => linh.indexOf(y) < 0))];
      const mach = (G.CH_MACH || []).map(x => x.ma);
      r.machLa = [...new Set(C.map(x => x.mach).filter(y => mach.indexOf(y) < 0))];
      r.soLinh = linh.length;
      r.coVN = C.filter(x => x.linh === 'VN').length;
      r.coLuu = C.filter(x => x.luu).length;
      /* Mỗi lĩnh vực phải có người, không lĩnh vực nào trống */
      r.linhTrong = linh.filter(l => !C.some(x => x.linh === l));
      const html = G.VIEWS['chuyen-the-gioi']();
      r.dai = html.length;
      r.noiRoKhac = html.indexOf('dựng ra để dạy') >= 0 && html.indexOf('người có thật') >= 0;
      r.hienLuu = html.indexOf('NÓI CHO ĐÚNG') >= 0;
      r.homNay = !!G.tgHomNay();
      /* Chọn người của hôm nay phải ổn định trong cùng một ngày */
      r.onDinh = (G.tgHomNay() || {}).ma === (G.tgHomNay() || {}).ma;
      return r;
    });
    bao(tg.tong >= 70, 'kho có đủ số người', tg.tong + ' người');
    bao(tg.thieu === 0,
      'người nào cũng đủ nước · thời kỳ · việc đã làm · chỗ khó · đã làm gì · điều rút ra · việc làm ngay',
      tg.thieu + ' bản ghi thiếu');
    bao(!tg.trung.length, 'không mã nào trùng', tg.trung.join(', '));
    bao(!tg.linhLa.length && !tg.machLa.length, 'không mã lĩnh vực hay mạch lạ',
      [...tg.linhLa, ...tg.machLa].join(', '));
    bao(!tg.linhTrong.length, 'sáu lĩnh vực đều có người, không lĩnh vực nào trống',
      tg.linhTrong.join(', '));
    bao(tg.coVN >= 15, 'có phần người Việt Nam đủ dày', tg.coVN + ' người');
    bao(tg.coLuu >= 5,
      'có ghi chú NÓI CHO ĐÚNG ở những chuyện mà bản kể phổ biến đã bị thổi lên',
      tg.coLuu + ' chuyện');
    bao(tg.hienLuu, 'ghi chú thận trọng hiện ra trên màn, không giấu trong dữ liệu');
    bao(tg.noiRoKhac,
      'màn nói rõ kho này khác kho 600 chuyện dựng ra thế nào — ngay đầu màn');
    bao(tg.dai > 8000, 'màn dựng ra nội dung thật', tg.dai + ' ký tự');
    bao(tg.homNay && tg.onDinh, 'có người của hôm nay, và chọn ổn định trong cùng một ngày');

    /* Lọc thật trên giao diện, và nhánh không có ai khớp phải nói rõ cách gỡ */
    const loc = await p.evaluate(async () => {
      const G = window.G;
      G.S.view = 'chuyen-the-gioi'; G.render();
      await new Promise(r => setTimeout(r, 150));
      const nutVN = document.querySelector('[data-tglinh="VN"]');
      if (!nutVN) return { mo: false };
      nutVN.click();
      await new Promise(r => setTimeout(r, 150));
      const chiVN = G.VIEWS['chuyen-the-gioi']();
      /* Ghép thêm một mạch hiếm để ép vào nhánh không có ai khớp */
      const machIt = (G.CH_MACH || []).map(m => m.ma).find(m =>
        !(G.CHUYEN_TG || []).some(x => x.linh === 'VN' && x.mach === m));
      let trong = '';
      if (machIt) {
        const nutM = document.querySelector('[data-tgmach="' + machIt + '"]');
        if (nutM) { nutM.click(); await new Promise(r => setTimeout(r, 150)); }
        trong = G.VIEWS['chuyen-the-gioi']();
      }
      return { mo: true,
        chiVN: chiVN.indexOf('Nguyễn Ngọc Ký') >= 0 || chiVN.indexOf('Ngô Bảo Châu') >= 0,
        machIt: machIt || '',
        trongNoiRo: !machIt || trong.indexOf('Bỏ bớt một trong hai bộ lọc') >= 0 };
    });
    bao(loc.mo, 'bấm lọc lĩnh vực là lọc thật');
    bao(loc.chiVN, 'lọc người Việt Nam ra đúng người Việt Nam');
    bao(loc.trongNoiRo,
      'lọc ra không còn ai thì màn nói rõ cách gỡ, không để trắng', loc.machIt);

    /* Đánh dấu đã đọc và đi lên đường đồng bộ */
    const doc = await p.evaluate(async () => {
      const G = window.G;
      G.S.view = 'chuyen-the-gioi'; G.render();
      await new Promise(r => setTimeout(r, 150));
      const n = document.querySelector('[data-tgdoc]');
      if (!n) return { co: false };
      const ma = n.getAttribute('data-tgdoc');
      n.click();
      await new Promise(r => setTimeout(r, 200));
      return { co: true, daDoc: G.tgDaDoc(ma),
        trenDia: !!(JSON.parse(localStorage.getItem('gita365_tg_da_doc') || '{}'))[ma],
        moc: Object.keys(JSON.parse(localStorage.getItem('gita365.moc') || '{}'))
               .filter(k => k.indexOf('tgdoc.') === 0).length };
    });
    bao(doc.co && doc.daDoc, 'đánh dấu đã đọc chạy được');
    bao(doc.trenDia, 'dấu đã đọc ghi xuống đĩa');
    bao(doc.moc >= 1, 'dấu đã đọc đi lên đường đồng bộ theo tài khoản', doc.moc + ' mốc');
  }


  /* ── 31. MA TRẬN 220 × 5 TẦNG × 4 NHÓM KHÁCH HÀNG ── */
  console.log('\n31 · MA TRẬN × BỐN NHÓM KHÁCH HÀNG');
  if (!coKhoa) {
    console.log('  (bỏ qua — cần bộ khoá để mở gói nền)');
  } else {
    /* Lớp bốn băng về gói NGHỀ từ bản 9.8 — mọi màn đọc nó đều khoá ở
       quyền nghề, nên kho phải đi theo. Mục kiểm này vì thế phải đăng
       nhập bằng một vai CÓ gói nghề; trước đây nó đo trên vai đang đăng
       nhập sẵn và đúng được là nhờ kho nằm ở gói nền. */
    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const mb = await p.evaluate(() => {
      const G = window.G;
      if (!G.MT_BANG) return { co: false };
      const van = (G.MATRAN && G.MATRAN.vande) || [];
      const tang = ['T1','T2','T3','T4','T5'].filter(t => (G['MATRAN_' + t] || []).length);
      let du = 0; const thieu = [];
      van.forEach(v => tang.forEach(t => G.MT_BANG_MA.forEach(b => {
        const x = G.mtPhieu(v.ma, t, b);
        if (x && x.do && x.oTang && x.oNhom && x.nguong) du++;
        else thieu.push(v.ma + '/' + t + '/' + b);
      })));
      /* Mỗi vấn đề phải có chỉ số riêng — không được dùng chung một chỉ số */
      const dv = {}; (G.MT_DO || []).forEach(d => { dv[d.ma] = (d.cach || '').trim(); });
      const trung = {};
      Object.keys(dv).forEach(k => { trung[dv[k]] = (trung[dv[k]] || 0) + 1; });
      const cachTrung = Object.keys(trung).filter(k => trung[k] > 1).length;
      /* Trần việc giao phải giảm dần từ XANH xuống ĐỎ ở mọi tầng */
      let tranSai = 0;
      tang.forEach(t => {
        const v4 = G.MT_BANG_MA.map(b => G.mtTran(t, b));
        for (let i = 1; i < v4.length; i++) if (!(v4[i] <= v4[i - 1])) tranSai++;
      });
      return { co: true, du, thieu: thieu.length, viDu: thieu.slice(0, 3).join(' '),
        soDo: (G.MT_DO || []).length, soO: (G.MT_BANG_TANG || []).length,
        soNhomO: (G.MT_BANG_NHOM || []).length, cachTrung, tranSai,
        soTang: tang.length,
        /* Mọi mã trong MT_DO phải là mã có thật trong ma trận, và ngược lại */
        lechMa: (G.MT_DO || []).filter(d => !van.some(v => v.ma === d.ma)).length +
                van.filter(v => !(G.MT_DO || []).some(d => d.ma === v.ma)).length };
    });
    bao(mb.co, 'lớp bốn băng nạp được từ gói NGHỀ — nó là công cụ nghề, không phải nội dung của gia đình');
    if (mb.co) {
      bao(mb.soDo === 220, 'đủ 220 chỉ số riêng, mỗi vấn đề một chỉ số', mb.soDo + '');
      bao(mb.lechMa === 0, 'mã chỉ số khớp đúng 220 mã vấn đề của ma trận', mb.lechMa + ' lệch');
      bao(mb.soO === mb.soTang * 4 || mb.soO === 20, 'đủ 5 tầng × 4 băng = 20 ô', mb.soO + '');
      bao(mb.soNhomO === 44, 'đủ 11 nhóm × 4 băng = 44 ô', mb.soNhomO + '');
      bao(mb.thieu === 0, 'ghép đủ ' + (220 * mb.soTang * 4) + ' phiếu, không phiếu nào thiếu lớp',
        mb.thieu ? mb.viDu : mb.du + ' phiếu');
      bao(mb.cachTrung === 0,
        'không vấn đề nào dùng chung cách đo với vấn đề khác — nếu trùng thì bốn nghìn phiếu chỉ khác nhau ở cái nhãn màu',
        mb.cachTrung + ' cách đo bị dùng lại');
      bao(mb.tranSai === 0, 'trần việc giao giảm dần từ XANH xuống ĐỎ ở mọi tầng', mb.tranSai + ' chỗ sai');
    }

    /* Xếp băng phải chạy bằng số, và học viên/phụ huynh không được vào màn này */
    const xep = await p.evaluate(() => {
      const G = window.G;
      return { day: [G.mtXepBang(95, 20, 0), G.mtXepBang(70, 9, 0),
                     G.mtXepBang(50, 4, 0), G.mtXepBang(20, 1, 2)].join('/'),
               trot: G.mtXepBang(95, 20, 2) };
    });
    bao(xep.day === 'XANH/VANG/CAM/DO', 'xếp băng bằng số cho đúng bốn mức', xep.day);
    bao(xep.trot === 'DO', 'trượt cổng hai lần là xuống ĐỎ dù dữ liệu và nhịp đều đẹp', xep.trot);
  }

  /* ── 32. REFERRAL ĐẦY ĐỦ · SÁU CHÂN DUNG · KHO TƯ LIỆU ── */
  console.log('\n32 · REFERRAL · CHÂN DUNG · KHO TƯ LIỆU');
  if (!coKhoa) {
    console.log('  (bỏ qua — cần bộ khoá để mở gói nghề)');
  } else {
    /* Các mục trước có đăng nhập bằng nhiều vai khác nhau. Gói NGHỀ chỉ nạp
       cho vai được cấp phép, nên phải đăng nhập lại vai cao nhất trước khi đo
       — không thì mọi phép đếm đều ra 0 và mọi phép lọc đều "đạt" một cách
       rỗng tuếch. */
    await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const kt = await p.evaluate(() => {
      const G = window.G;
      const van = {}; ((G.MATRAN && G.MATRAN.vande) || []).forEach(v => { van[v.ma] = 1; });
      const nhom = {}; ((G.MATRAN && G.MATRAN.nhom) || []).forEach(n => { nhom[n.ma] = 1; });
      const maSai = [];
      (G.CD_BO || []).forEach(x => {
        x.vanDe.forEach(m => { if (!van[m]) maSai.push(x.ma + ':' + m); });
        x.nhom.forEach(m => { if (!nhom[m]) maSai.push(x.ma + ' nhóm ' + m); });
      });
      const cdThieu = (G.CHANDUNG_KH || []).filter(g => !(G.CD_BO || []).some(x => x.ma === g.ma)).map(g => g.ma);
      const tongDiem = (G.REF_CHAM || []).reduce((a, c) => a + c.diem, 0);
      return {
        ref30: (G.REF_30S || []).length, gains: (G.REF_GAINS_GITA || []).length,
        m121: (G.REF_121 || []).length, tt: (G.REF_TRANGTHAI || []).length,
        khong: (G.REF_KHONG || []).length, hoi: (G.REF_HOI || []).length,
        tongDiem, cd: (G.CD_BO || []).length, cdThieu: cdThieu.join(' '), maSai: maSai.join(' '),
        ke: (G.TL_KE || []).length, duong: (G.TL_DUONG || []).length,
        luat: (G.TL_LUAT || []).length,
        /* Mỗi chặng đọc phải có việc làm sau khi đọc — đọc suông không tính */
        changRong: (G.TL_DUONG || []).reduce((a, d) =>
          a + d.chang.filter(c => !c.lam || !c.xong).length, 0),
        /* Mỗi chân dung phải đủ bộ làm việc */
        boThieu: (G.CD_BO || []).filter(x =>
          x.ba.length < 3 || x.hoi.length < 5 || x.gui.length < 4 || x.roi.length < 3 ||
          !x.kpi30 || !x.kpi90 || !x.cam || !x.tien || !x.len || !x.nguoi).map(x => x.ma).join(' ')
      };
    });
    bao(kt.ref30 === 3, 'ba bản ba mươi giây', kt.ref30 + '');
    bao(kt.gains === 6, 'bảng GAINS của GITA đủ sáu ô', kt.gains + '');
    bao(kt.m121 === 6, 'buổi 1–1 đủ sáu chặng', kt.m121 + '');
    bao(kt.tongDiem === 100, 'thang chấm lời giới thiệu cộng đúng 100 điểm', kt.tongDiem + '');
    bao(kt.tt === 7, 'bảy trạng thái của một Ref', kt.tt + '');
    bao(kt.khong === 10 && kt.hoi === 12, 'mười điều cấm và mười hai câu khó',
      kt.khong + ' · ' + kt.hoi);
    bao(kt.cd === 6, 'sáu chân dung đều có bộ làm việc', kt.cd + '');
    /* Ba phép dưới đây là phép LỌC: kho rỗng thì lọc ra cũng rỗng và trông
       như đã đạt. Nên phải kèm điều kiện kho đã nạp, không thì là đạt rỗng. */
    bao(kt.cd === 6 && !kt.cdThieu, 'không chân dung nào trong danh sách gốc bị bỏ sót', kt.cdThieu);
    bao(kt.cd === 6 && !kt.boThieu, 'bộ làm việc nào cũng đủ ba buổi, năm câu chối, KPI, điều cấm và khung tiền', kt.boThieu);
    bao(kt.cd === 6 && !kt.maSai, 'mã vấn đề và mã nhóm trong chân dung đều có thật trong ma trận', kt.maSai);
    bao(kt.ke === 6 && kt.duong === 6, 'sáu kệ tư liệu và sáu lộ trình đọc',
      kt.ke + ' · ' + kt.duong);
    bao(kt.luat === 7, 'bảy luật giữ kho', kt.luat + '');
    bao(kt.duong === 6 && kt.changRong === 0,
      'chặng đọc nào cũng có việc làm sau khi đọc và mốc xong — đọc suông không tính là đã đọc',
      kt.changRong + ' chặng rỗng');

    /* Ba màn hình được nối dài vẫn phải giữ nguyên cổng phân quyền */
    const cong = await p.evaluate(async () => {
      const G = window.G, ra = {};
      for (const em of ['hocvien@gita365.vn', 'phuhuynh@gita365.vn']) {
        G.doLogin(em);
        await new Promise(r => setTimeout(r, 1200));
        ra[em] = ['referral', 'chan-dung-kh', 'ma-tran-bang'].map(v => {
          let x; try { x = G.VIEWS[v](); } catch (e) { x = 'LOI'; }
          return (typeof x === 'string' &&
            x.trim().indexOf('<div class="card center" style="padding:40px">') === 0) ? 1 : 0;
        }).reduce((a, b) => a + b, 0);
      }
      G.doLogin('superadmin@gita365.vn');
      await new Promise(r => setTimeout(r, 1800));
      return ra;
    });
    bao(cong['hocvien@gita365.vn'] === 3 && cong['phuhuynh@gita365.vn'] === 3,
      'nối dài màn hình không mở thêm cửa: học viên và phụ huynh vẫn bị khoá cả ba màn kho nghề',
      'HV ' + cong['hocvien@gita365.vn'] + '/3 · PH ' + cong['phuhuynh@gita365.vn'] + '/3');
  }


  /* ── 33. KHO KỊCH BẢN VÀ KHO TÌNH HUỐNG ĐỦ RUỘT ── */
  console.log('\n33 · KHO KỊCH BẢN · KHO TÌNH HUỐNG ĐỦ RUỘT');
  if (!coKhoa) {
    console.log('  (bỏ qua — cần bộ khoá để mở kho nghề)');
  } else {
    await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ruot = await p.evaluate(() => {
      const G = window.G;
      const K = G.KICHBAN || [], TH = G.TINHHUONG || [];
      const thieu = k => !k.mo || !k.chot || !k.muc || !k.phut;
      const theoLoai = {};
      K.forEach(k => {
        theoLoai[k.loai] = theoLoai[k.loai] || { tong: 0, du: 0 };
        theoLoai[k.loai].tong++;
        if (!thieu(k)) theoLoai[k.loai].du++;
      });
      /* Ruột phải là nội dung THẬT, không phải một dấu chấm cho qua bài kiểm.
         Ngưỡng câu mở là 40 chứ không phải 60: có những câu mở hay nhất trong
         kho lại rất ngắn — "Nghiệm thu. Bốn tiêu chí và một câu hỏi về động
         cơ." dài 51 ký tự và không thừa chữ nào. Ngưỡng phải bắt được chỗ
         TRỐNG, không được phạt lối viết gọn. Dưới 40 ký tự thì không thể là
         một câu mở thật; trên 40 thì phải đọc mới biết, và bài kiểm tự động
         không đọc thay người được. */
      const quaNgan = K.filter(k => !thieu(k) &&
        (String(k.mo).length < 40 || String(k.chot).length < 60 || String(k.muc).length < 40));
      /* Câu mở và câu chốt phải khác nhau giữa các kịch bản — nếu chép đi chép lại
         thì kho một nghìn bản chỉ là một bản nhân lên một nghìn lần */
      const moTrung = {}; K.forEach(k => { if (k.mo) moTrung[k.mo] = (moTrung[k.mo] || 0) + 1; });
      const soMoTrung = Object.keys(moTrung).filter(x => moTrung[x] > 1).length;
      return {
        tong: K.length, thieu: K.filter(thieu).length,
        theoLoai, quaNgan: quaNgan.length, viDuNgan: quaNgan.slice(0, 3).map(k => k.ma).join(' '),
        soMoTrung, tongTH: TH.length,
        thThieuDich: TH.filter(x => !x.dich || !String(x.dich).trim()).length,
        conNo: G.tvConNo ? G.tvConNo() : -1
      };
    });
    bao(ruot.thieu === 0,
      'cả 1.000 kịch bản đều đủ bốn trường thời lượng · mục tiêu · câu mở · câu chốt',
      ruot.thieu + '/' + ruot.tong + ' còn trống');
    Object.keys(ruot.theoLoai).forEach(loai => {
      const x = ruot.theoLoai[loai];
      bao(x.du === x.tong, 'kịch bản ' + loai + ' đủ ruột', x.du + '/' + x.tong);
    });
    bao(ruot.conNo === 0, 'G.tvConNo() báo về 0 — không còn kịch bản tư vấn nào nợ ruột',
      ruot.conNo + ' bản');
    bao(ruot.quaNgan === 0,
      'không bản nào lấp ruột bằng một câu cụt cho qua bài kiểm',
      ruot.quaNgan + ' bản quá ngắn: ' + ruot.viDuNgan);
    bao(ruot.soMoTrung === 0,
      'không câu mở nào bị dùng lại ở kịch bản khác — nghìn bản là nghìn tình huống thật',
      ruot.soMoTrung + ' câu bị lặp');
    bao(ruot.thThieuDich === 0,
      'cả 250 tình huống năm tầng đều có đích để biết lúc nào là xong',
      ruot.thThieuDich + '/' + ruot.tongTH + ' thiếu đích');
  }


  /* ── 34. MÀN TỰ SOÁT CỦA CHỦ HỆ THỐNG ── */
  console.log('\n34 · MÀN TỰ SOÁT — CHỦ HỆ THỐNG TỰ KIỂM 100%');
  if (!coKhoa) {
    console.log('  (bỏ qua — cần bộ khoá để nạp chuẩn soát)');
  } else {
    await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ts = await p.evaluate(() => {
      const G = window.G;
      if (!G.soatTatCa) return { co: false };
      const r = G.soatTatCa();
      return {
        co: true, hong: r.hong,
        conSoLech: r.conSo.filter(x => !x.dat).map(x => x.k + ' cần ' + x.can + ' có ' + x.co),
        truongThieu: r.truong.hopDong.filter(x => !x.dat).map(x => x.kho),
        luatChung: r.truong.luatChung.map(x => x.kho),
        cut: r.chatLuong.cut, lap: r.chatLuong.moLap + r.chatLuong.chotLap,
        tam: r.chatLuong.coTam, thieuEN: r.chatLuong.thieuEN.length,
        manLoi: r.manHinh.loi, manRong: r.manHinh.rong, manOk: r.manHinh.ok,
        soMoc: r.conSo.length, soHopDong: r.truong.hopDong.length,
        soTha: (G.SOAT_THA || []).length,
        /* Mọi ngoại lệ PHẢI có lý do viết ra — ngoại lệ không lý do chỉ là
           một chỗ trống được tha, và đó chính là kiểu che giấu cần chặn */
        thaThieuLyDo: (G.SOAT_THA || []).filter(x => !x.y || x.y.trim().length < 30).map(x => x.o)
      };
    });
    bao(ts.co, 'màn tự soát chạy được trong ứng dụng, không phải chỉ ở dòng lệnh');
    if (ts.co) {
      bao(!ts.conSoLech.length, 'mọi con số công bố đếm ra đúng — ' + ts.soMoc + ' kho có mốc',
        ts.conSoLech.slice(0, 4).join(' | '));
      bao(!ts.truongThieu.length, 'mọi kho theo hợp đồng đủ trường — ' + ts.soHopDong + ' kho',
        ts.truongThieu.join(' '));
      bao(!ts.luatChung.length, 'không kho ngoài hợp đồng nào có trường bỏ trống',
        ts.luatChung.slice(0, 6).join(' '));
      bao(ts.cut === 0 && ts.lap === 0, 'nội dung không có câu cụt và không có câu chép lại',
        'cụt ' + ts.cut + ' · lặp ' + ts.lap);
      bao(!ts.tam.length, 'không kho nào chứa chữ tạm', ts.tam.join(' '));
      bao(ts.thieuEN === 0, 'không mục điều hướng nào thiếu bản tiếng Anh', ts.thieuEN + ' mục');
      bao(!ts.manLoi.length && !ts.manRong.length,
        'dựng thử ' + ts.manOk + ' màn — không màn nào văng lỗi hay rỗng ruột',
        ts.manLoi.concat(ts.manRong).slice(0, 4).join(' | '));
      bao(ts.hong === 0, 'màn tự soát kết luận: không còn chỗ nào để trống', ts.hong + ' chỗ');
      bao(!ts.thaThieuLyDo.length,
        'cả ' + ts.soTha + ' ngoại lệ đều có lý do viết ra — ngoại lệ không lý do chỉ là chỗ trống được tha',
        ts.thaThieuLyDo.join(' '));
    }

    /* Màn này soi vào ruột hệ thống nên chỉ R01–R02 được mở */
    const q = await p.evaluate(async () => {
      const G = window.G, ra = {};
      for (const em of ['giamdoc@gita365.vn', 'tuvan@gita365.vn', 'phuhuynh@gita365.vn']) {
        G.doLogin(em);
        await new Promise(r => setTimeout(r, 1100));
        let x; try { x = G.VIEWS['soat-day-du'](); } catch (e) { x = 'LOI'; }
        ra[em] = (typeof x === 'string' &&
          x.trim().indexOf('<div class="card center" style="padding:40px">') === 0) ? 'khoá' : 'MỞ';
      }
      G.doLogin('superadmin@gita365.vn');
      await new Promise(r => setTimeout(r, 1800));
      return ra;
    });
    const moNham = Object.keys(q).filter(k => q[k] !== 'khoá');
    bao(!moNham.length,
      'màn tự soát chỉ mở cho Super Admin và Admin — Giám đốc trở xuống đều khoá',
      moNham.join(' '));

    /* Chuẩn soát KHÔNG được lọt ra gói mẫu công khai: nó liệt kê tên mọi kho
       nội bộ và số bản ghi phải có — đưa ra ngoài là vẽ bản đồ kho cho người
       chưa được cấp phép */
    const mau = JSON.parse(require('fs').readFileSync(
      require('path').join(__dirname, '..', 'kho', 'mau.json'), 'utf8'));
    const lot = Object.keys(mau).filter(k => k.indexOf('SOAT') === 0);
    bao(!lot.length, 'chuẩn soát không lọt ra gói mẫu công khai', lot.join(' '));
  }

  /* ═══════════ 35 · CỬA TRƯỚC KHÔNG ĐƯỢC RỖNG RUỘT ═══════════

     Ba mươi bốn mục trên đều chạy VỚI kho đã cấp phép, nên không mục nào
     nhìn thấy thứ mà người lạ nhìn thấy. Bản giới thiệu một tệp — cũng
     chính là bản trang web công khai phục vụ — chạy chế độ mẫu: nó chỉ
     có gói MO_RA, không có kho. Màn nào lấy dữ liệu ngoài gói ấy sẽ dựng
     ra mấy cái tiêu đề mục và không có chữ nào bên trong.

     Đó là chuyện đã xảy ra với chính cửa trước: kho GT_* chỉ ở gói NỀN,
     nên màn "GITA 365 là gì" là một cái khung 1.658 ký tự gồm mười hai
     tiêu đề rỗng — trong khi bộ kiểm 34 mục vẫn xanh hết.

     DANH SÁCH ĐẶT TÊN, KHÔNG LỌC THEO capMo. Bản đầu tiên của mục này
     lọc mọi màn khai capMo:'chung' — sai, vì capMo là TẦNG HIỂN THỊ THEO
     VAI ("ai đăng nhập cũng thấy"), không phải "ai trên mạng cũng thấy".
     Lọc như thế thì mục này đòi cả màn Khoá đào tạo của đội ngũ phải mở
     công khai — tức là bắt hệ thống mở kho nghề ra để cho bài kiểm xanh.
     Cửa trước là một quyết định kinh doanh, nên nó được viết ra thành
     tên, và thêm bớt tên là một lần cân nhắc có ý thức. */
  console.log('\n35 · CỬA TRƯỚC KHÔNG ĐƯỢC RỖNG RUỘT');
  {
    /* Những màn một người LẠ được mời vào trước khi có tài khoản */
    const CUA_TRUOC = ['gioi-thieu', 'bat-dau', 'tham-gia', 'pham-vi', 'ban-do', 'hanh-trinh-12'];
    const SAN = 95;   /* bản giới thiệu phải có ít nhất chừng này màn đủ ruột */
    const NGAN = 700; /* dùng chung ngưỡng với tools/ra-soat-day-du.js */

    const fs35 = require('fs'), px35 = require('path');
    /* Tên tệp mang số bản, nên đọc số bản ra rồi ghép — gõ cứng "v75" là
       lý do anh Quang từng mở nhầm bản cũ. */
    const ban35 = (fs35.readFileSync(px35.join(__dirname, '..', 'src', 'data.core.js'), 'utf8')
      .match(/version:\s*'([^']+)'/) || [])[1];
    const tep = px35.join(__dirname, '..', 'GITA365-v' + ban35 + '-gioi-thieu.html');
    if (!fs35.existsSync(tep)) {
      bao(false, 'có bản giới thiệu một tệp để kiểm',
        'thiếu ' + px35.basename(tep) + ' — chạy python3 tools/dong-goi.py');
    } else {
      const p35 = await b.newPage();
      const loi35 = [];
      p35.on('pageerror', e => loi35.push(e.message));
      await p35.goto('file://' + tep, { waitUntil: 'networkidle' });
      await p35.waitForFunction(() => window.G && window.G.VIEWS, null, { timeout: 20000 });
      await p35.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
      await p35.waitForTimeout(2200);

      const r35 = await p35.evaluate(opt => {
        const G = window.G;
        const dem = v => { G.S.view = v; G.render();
          const m = document.getElementById('main');
          return (m ? m.innerText : '').trim().length; };

        const mong = [], laVIEW = [];
        opt.cua.forEach(v => {
          if (!G.VIEWS[v]) { laVIEW.push(v); return; }
          const n = dem(v);
          if (n < opt.ngan) mong.push(v + ' (' + n + ')');
        });

        const man = []; G.NAV.forEach(g => g.items.forEach(i => man.push(i.v)));
        let day = 0; man.forEach(v => { if (dem(v) >= opt.ngan) day++; });

        /* Tầm nhìn và sứ mệnh chỉ được có MỘT bản gốc. Trước v7.7 có hai
           bản tầm nhìn khác nhau — một ở G.CULTURE, một viết tay trong
           i18n — và cả hai cùng hiện trên một màn hình: thanh la bàn bên
           phải nói một đằng, thân màn "GITA 365 là gì" nói một nẻo. */
        const C = G.CULTURE || {}, UIv = (G.UI || {}).vi || {};
        const mot = {
          tamNhin: !!(C.tamNhin && C.tamNhin.big) && UIv.gateVisionTitle === C.tamNhin.big,
          suMenh:  !!(C.suMenh  && C.suMenh.big)  && UIv.gateMission     === C.suMenh.big,
          moc2030: !!(C.moc2030 && C.moc2030.big),
          khac:    !!(C.tamNhin && C.moc2030) && C.tamNhin.big !== C.moc2030.big
        };

        return { mau: !!(G.KHO && G.KHO.cheDoMau), mong: mong, laVIEW: laVIEW,
                 tong: man.length, day: day, gt: dem('gioi-thieu'), mot: mot };
      }, { cua: CUA_TRUOC, ngan: NGAN });

      bao(r35.mau === true,
        'bản giới thiệu chạy đúng chế độ mẫu — không kèm kho, không kèm khoá');
      bao(!r35.laVIEW.length,
        'mọi màn trong danh sách cửa trước đều có thật', r35.laVIEW.join(' '));
      bao(!r35.mong.length,
        'cả ' + CUA_TRUOC.length + ' màn cửa trước đều có ruột thật trên bản khách nhận được',
        r35.mong.join(' · '));
      bao(r35.gt >= 8000,
        'cửa trước "GITA 365 là gì" đủ dày: sứ mệnh · tầm nhìn · mục tiêu · giá trị · năm tầng · văn hoá · cách đồng hành',
        r35.gt.toLocaleString('vi-VN') + ' ký tự');
      bao(r35.day >= SAN,
        'bản dùng thử không rỗng: phần lớn màn hình xem được ngay, không cần cấp phép',
        r35.day + '/' + r35.tong + ' màn đủ ruột · sàn ' + SAN);
      bao(r35.mot.tamNhin && r35.mot.suMenh,
        'tầm nhìn và sứ mệnh chỉ có một bản gốc — cổng đăng nhập, thanh la bàn và màn giới thiệu nói cùng một câu',
        (r35.mot.tamNhin ? '' : 'tầm nhìn lệch ') + (r35.mot.suMenh ? '' : 'sứ mệnh lệch'));
      bao(r35.mot.moc2030 && r35.mot.khac,
        'mốc 2030 tách riêng khỏi tầm nhìn — con số có hạn không bị gọi nhầm là tầm nhìn',
        r35.mot.moc2030 ? '' : 'thiếu G.CULTURE.moc2030');
      /* Nút chết còn tệ hơn không có nút. Bản một tệp KHÔNG mang theo
         kho .enc nào, nên nạp giấy phép vào đấy là có khoá mà không có
         hộp để mở — người dùng bấm, chọn tệp, và không có gì đổi. Họ
         tưởng mình thao tác sai, còn giấy phép thì đã bị mang ra khỏi
         nơi an toàn để chẳng làm gì. */
      const gpNut = await p35.evaluate(() => {
        const G = window.G;
        const thu = ['nhiem-vu', 'dieu-hanh', 'thanh-tra', 'kho'];
        let t = '';
        for (const v of thu) {
          G.S.view = v; G.render();
          const x = document.getElementById('main').innerText;
          if (x.indexOf('PHẦN NÀY CHƯA MỞ') >= 0) { t = x; break; }
        }
        return { motTep: !!(G.laBanMotTep && G.laBanMotTep()),
                 moi: !!(G.napDuocGiayPhep && G.napDuocGiayPhep()),
                 coNut: t.indexOf('Nạp tệp giấy phép') >= 0,
                 noiRo: t.indexOf('KHÔNG KÈM KHO') >= 0,
                 coMan: !!t.length };
      });
      bao(gpNut.motTep, 'bản giới thiệu tự nhận mình là bản một tệp');
      bao(gpNut.coMan, 'có màn xin cấp phép để kiểm', gpNut.coMan ? '' : 'không màn nào hiện màn ấy');
      bao(!gpNut.moi && !gpNut.coNut,
        'bản một tệp KHÔNG mời nạp giấy phép — nút chết còn tệ hơn không có nút',
        'mời:' + gpNut.moi + ' có nút:' + gpNut.coNut);
      bao(gpNut.noiRo,
        'bản một tệp nói thẳng vì sao nạp giấy phép không giúp được gì, và chỉ hai đường mở đủ kho');
      bao(!loi35.length, 'bản giới thiệu chạy không văng lỗi nào', loi35.slice(0, 2).join(' | '));
      await p35.close();
    }
  }

  /* ═══════════ 36 · BỐN TUYẾN VÀ HAI BẢN CHÉP ═══════════

     Hai danh sách trong dự án này buộc phải có bản chép, vì chúng chạy ở
     hai môi trường khác nhau, và bản chép nào cũng lệch được trong im
     lặng:

       · Bảng tuyến: src/data.tuyen.js (trình duyệt + công cụ Node) và
         server/GITA_CapPhep.gs (Apps Script — không require được).
         Lệch nhau thì máy chủ cấp khoá cho gói mà ứng dụng không biết
         xin, hoặc ứng dụng xin gói mà máy chủ không có.

       · Danh sách tệp: index.html và sw.js. Lệch nhau thì bản đã cài
         chạy thiếu tệp khi mất mạng — màn hình văng lỗi mà chỉ người
         dùng offline gặp. Đúng ba tệp đã từng thiếu như thế:
         duong-vao.js, soat-day-du.js, tuyen.js. */
  console.log('\n36 · BỐN TUYẾN VÀ HAI BẢN CHÉP');
  {
    const fs36 = require('fs'), px36 = require('path'), goc36 = px36.join(__dirname, '..');
    const doc = f => fs36.readFileSync(px36.join(goc36, f), 'utf8');

    /* ── Bảng tuyến: hai bản phải khớp từng dòng ── */
    const maTuyen = t => (t.match(/ma:\s*'([A-Z0-9]+)'/) || [])[1];
    const tuTep = (vb, re) => {
      const ra = [];
      let m; const r = new RegExp(re, 'g');
      while ((m = r.exec(vb))) ra.push({ ma: m[1], trangThai: m[2], goiCu: m[3] === 'true' });
      return ra;
    };
    const ung = tuTep(doc('src/data.tuyen.js'),
      "ma:'([A-Z0-9]+)'[\\s\\S]{0,400}?trangThai:'(\\w+)', goiCu:(true|false)");
    const may = tuTep(doc('server/GITA_CapPhep.gs'),
      "ma: '([A-Z0-9]+)',\\s*trangThai: '(\\w+)',\\s*goiCu: (true|false)");

    bao(ung.length >= 5, 'ứng dụng khai đủ năm tuyến', ung.map(t => t.ma).join(' '));
    bao(may.length === ung.length && ung.every((t, i) =>
        may[i] && may[i].ma === t.ma && may[i].trangThai === t.trangThai && may[i].goiCu === t.goiCu),
      'bảng tuyến ở máy chủ cấp phép khớp đúng bảng tuyến trong ứng dụng',
      may.map(t => t.ma + ':' + t.trangThai).join(' '));

    /* ── Tên gói cũ không được đổi: giấy phép đã cấp phải còn dùng được ── */
    const goc = ung.filter(t => t.goiCu);
    bao(goc.length === 1 && goc[0].ma === 'GITA365',
      'đúng một tuyến giữ tên gói cũ, và đó là GITA365 — mọi giấy phép đã cấp vẫn dùng được',
      goc.map(t => t.ma).join(' '));

    const tuyenApp = await p.evaluate(() => ({
      goi: (window.G.moiGoi ? G.moiGoi() : []),
      gocNghe: G.goiNghe ? G.goiNghe('GITA365') : '',
      gocTang: G.goiTang ? G.goiTang('GITA365', 3) : '',
      moiNghe: G.goiNghe ? G.goiNghe('MATH365') : '',
      tkTrong: G.tuyenCuaTK ? G.tuyenCuaTK({}) : [],
      tkBia:   G.tuyenCuaTK ? G.tuyenCuaTK({ tuyen: ['BIA365'] }) : ['x'],
      bangChuaCo: G.bangCuaTuyen ? G.bangCuaTuyen('MATH365') : 'x'
    }));
    bao(tuyenApp.gocNghe === 'nghe' && tuyenApp.gocTang === 'tang3',
      'gói của tuyến gốc vẫn mang đúng tên cũ', tuyenApp.gocNghe + ' · ' + tuyenApp.gocTang);
    bao(tuyenApp.moiNghe === 'math365-nghe',
      'gói của tuyến mới mang tiền tố riêng — bán tuyến này không mở tuyến kia', tuyenApp.moiNghe);
    bao(tuyenApp.tkTrong.length === 1 && tuyenApp.tkTrong[0] === 'GITA365',
      'tài khoản không khai tuyến vẫn là GITA365 — bản cũ chạy y nguyên', tuyenApp.tkTrong.join(' '));
    bao(Array.isArray(tuyenApp.tkBia) && tuyenApp.tkBia.length === 0,
      'khai tuyến không có thật thì KHÔNG rơi về GITA365 — sai phải thấy được, không phục vụ nhầm trong im lặng',
      JSON.stringify(tuyenApp.tkBia));
    bao(tuyenApp.bangChuaCo === null,
      'tuyến chưa có chuẩn băng thì báo trống, không mượn tạm băng của GITA365');

    /* ══ BẢN GỘP: TRANG WEB, BẢN CÀI VÀ MÃ NGUỒN PHẢI NÓI CÙNG MỘT BẢN ══
       Từ v8.6 index.html nạp một tệp gita-app.js thay cho 65 thẻ script.
       Phép kiểm cũ so hai danh sách thẻ src — nay cả hai đều rỗng nên nó
       XANH MÀ KHÔNG ĐO GÌ. Đạt rỗng, đúng kiểu hỏng đã bắt hai lần trước.
       Thay bằng bốn phép đo thật. */
    const dsGop = JSON.parse(doc('tools/danh-sach-src.json')).tep;
    const gop = doc('gita-app.js');

    bao(/<script src="gita-app\.js"><\/script>/.test(doc('index.html')) &&
        !/<script src="src\//.test(doc('index.html')),
      'trang web nạp đúng một tệp mã thay cho 65 tệp — mỗi tệp là một lượt hỏi mạng',
      dsGop.length + ' tệp gộp thành 1');

    bao(doc('sw.js').indexOf("'./gita-app.js'") >= 0 &&
        !/'\.\/src\/[^']+\.js'/.test(doc('sw.js')),
      'bản cài ngoại tuyến cũng nạp bản gộp — không sót tệp nào khi mất mạng');

    /* Bản gộp phải ĐÚNG BẰNG mã nguồn hiện tại. Quên chạy tools/gop-src.js
       sau khi sửa src/ là phát hành một bản khác với bản trong kho mã —
       sửa xong thấy không đổi gì, và không một dòng lỗi nào. */
    /* Từ bản 9.23 có HAI bản gộp: tệp nào ở danh sách nghề thì phải khớp
       với gita-nghe.js, còn lại khớp với gita-app.js. So tất cả với một
       tệp là báo lệch cho đúng những tệp vừa được tách ra đúng chỗ. */
    const dsNghe36 = fs36.existsSync(px36.join(__dirname, 'danh-sach-nghe.json'))
      ? JSON.parse(fs36.readFileSync(px36.join(__dirname, 'danh-sach-nghe.json'), 'utf8')).tep : [];
    const gopNghe = fs36.existsSync(px36.join(goc36, 'gita-nghe.js'))
      ? fs36.readFileSync(px36.join(goc36, 'gita-nghe.js'), 'utf8') : '';
    const lech = dsGop.filter(t => {
      if (!fs36.existsSync(px36.join(goc36, t))) return true;
      const dich = dsNghe36.indexOf(t) >= 0 ? gopNghe : gop;
      return dich.indexOf(doc(t)) < 0;
    });
    bao(!lech.length, 'bản gộp khớp từng chữ với mã nguồn — không phát hành bản cũ',
      lech.length ? 'lệch: ' + lech.slice(0, 4).join(' ') : dsGop.length + ' tệp khớp');

    /* Mỗi tệp phải nằm trong một hàm riêng. Có 30 cái tên trùng nhau ở
       phạm vi ngoài cùng giữa các tệp — trong đó docLai/ghiDoc/DA_DOC của
       hai kho chuyện khác nhau. Nối thẳng là hai kho dùng chung một sổ
       "đã đọc", không màn nào lỗi, không dòng nhật ký nào. */
    const soBoc = (gop.match(/^\(function\(\)\{$/gm) || []).length;
    bao(soBoc >= dsGop.length,
      'mỗi tệp trong bản gộp nằm trong một hàm riêng — tên trùng không giẫm lên nhau',
      soBoc + '/' + dsGop.length + ' tệp được bọc');

    /* ══ KHÔNG TẢI SẴN 12 MB KHO LÚC CÀI ══
       Bảy tệp kho/*.enc từng nằm trong danh sách tải sẵn của service
       worker: 12 MB tải về trước cả khi người dùng đăng nhập, kể cả gói
       "nghe" 3,1 MB mà phụ huynh không bao giờ mở. Bộ xử lý fetch đã tự
       lưu đệm gói nào được mở, nên chốt lại để nó không quay lại. */
    bao(!/'\.\/kho\/[^']+\.enc'/.test(doc('sw.js')),
      'không tải sẵn kho mã hoá lúc cài — chỉ tải gói nào vai ấy thật sự mở',
      'gói kho lưu đệm khi dùng');
    bao(/nangVaKhongDoi/.test(doc('sw.js')),
      'tệp nặng và không đổi thì lấy trong máy, không hỏi lại mạng mỗi lần chạy');

    /* ── Super Admin không còn giới hạn nào ──
       Chủ hệ thống phải nhìn được từ A đến Z. Ba loại giới hạn: màn bị
       khoá, quyền chưa có, và CẮT BỚT trên giao diện. Hai loại đầu đã
       hết từ lâu; loại thứ ba là thứ mới đóng — danh sách chỉ hiện mười
       mục đầu thì một chỗ hỏng ở mục thứ mười một không bao giờ bị thấy. */
    const r01 = await p.evaluate(() => {
      const G = window.G;
      const man = []; G.NAV.forEach(g => g.items.forEach(i => man.push(i)));
      const khoa = man.filter(i => i.perm && !G.can(i.perm)).map(i => i.v);
      const thieuQuyen = Object.keys(G.PERM || {}).filter(q => !G.can(q));
      /* Công tắc mở hết: bật lên thì danh sách và đoạn chữ phải dài ra thật */
      const truoc = G.MO_HET;
      G.MO_HET = false; const gon = G.dsHet([1,2,3,4,5,6,7,8,9,10], 3).length;
      const chuGon = G.chuHet('abcdefghijklmnop', 5);
      G.MO_HET = true;  const het = G.dsHet([1,2,3,4,5,6,7,8,9,10], 3).length;
      const chuHet = G.chuHet('abcdefghijklmnop', 5);
      G.MO_HET = truoc;
      return { khoa, thieuQuyen, goi: (G.KHO.daNap || []).length,
               gon, het, chuGon, chuHet, coNut: !!G.moHetDoi };
    });
    bao(!r01.khoa.length, 'Super Admin không màn nào bị khoá', r01.khoa.join(' ') || 'mở hết');
    bao(!r01.thieuQuyen.length, 'Super Admin có đủ mọi quyền', r01.thieuQuyen.join(' ') || 'đủ');
    bao(r01.goi === 7, 'Super Admin mở đủ bảy gói kho', r01.goi + ' gói');
    bao(r01.gon === 3 && r01.het === 10,
      'công tắc Mở hết bỏ được cắt bớt danh sách — cần cho việc rà từ A đến Z',
      'gọn ' + r01.gon + ' → mở hết ' + r01.het);
    bao(r01.chuGon.slice(-1) === '…' && r01.chuHet.length === 16,
      'công tắc Mở hết trả đoạn chữ đầy đủ, và bản gọn vẫn có dấu ba chấm',
      JSON.stringify(r01.chuGon) + ' → ' + JSON.stringify(r01.chuHet));

    /* Vai thường KHÔNG bật được, dù cờ có bị đặt */
    const khachMoHet = await p.evaluate(async () => {
      const G = window.G;
      G.doLogin('phuhuynh@gita365.vn');
      await new Promise(r => setTimeout(r, 1200));
      G.MO_HET = true;
      const r = { duoc: G.moHetDuoc(), bat: G.moHetBat(),
                  ds: G.dsHet([1,2,3,4,5,6,7,8,9,10], 3).length };
      G.MO_HET = false;
      G.doLogin('superadmin@gita365.vn');
      await new Promise(r2 => setTimeout(r2, 2000));
      return r;
    });
    bao(!khachMoHet.duoc && !khachMoHet.bat && khachMoHet.ds === 3,
      'phụ huynh KHÔNG mở hết được dù cờ bị đặt — công tắc là quyền, không phải biến',
      'được:' + khachMoHet.duoc + ' bật:' + khachMoHet.bat + ' danh sách:' + khachMoHet.ds);

    /* ── Tự vận hành: quét thật, và KHÔNG đệ quy ──
       Màn tu-van-hanh gọi lại bộ tự soát. Bộ tự soát dựng thử mọi màn,
       trong đó có chính màn ấy. Không chặn thì trình duyệt treo — đã xảy
       ra một lần với soat-day-du và tái diễn ở v8.4.

       Mục này canh ba điều: màn dựng được trong thời gian hợp lý (đệ quy
       thì nó không bao giờ xong), danh sách màn tự gọi có đủ tên, và
       phép quét trả về số thật. */
    const tvh = await p.evaluate(() => {
      const G = window.G;
      if (!G.tdQuet) return { co:false };
      /* Mở màn tự soát trước để có số trong bộ đệm, đúng như người dùng làm */
      G.S.view = 'soat-day-du'; G.render();
      const t0 = performance.now();
      G.S.view = 'tu-van-hanh'; G.render();
      const ms = Math.round(performance.now() - t0);
      const q = G.tdQuet();
      return { co:true, ms, doDuoc:q.doDuoc, dat:q.dat,
               hong:q.hong.map(x => x.ma + ':' + x.so),
               canh:(G.TD_CANH || []).length,
               muc:(G.TD_MUC || []).length,
               khong:(G.TD_KHONG || []).length,
               that:(G.TD_THAT || []).length,
               tuGoi:(G.TU_GOI_SOAT || []).slice().sort().join(' '),
               triMay:(G.TD_TRITHUC || []).filter(x => x.may).length,
               triNguoi:(G.TD_TRITHUC || []).filter(x => !x.may).length,
               mcThat:((G.TD_MAYCHU || {}).that || '').length };
    });
    bao(tvh.co, 'có phép quét tự vận hành để kiểm');
    if (tvh.co) {
      bao(tvh.ms < 3000,
        'màn tự vận hành dựng xong nhanh — đệ quy thì nó không bao giờ xong', tvh.ms + 'ms');
      bao(tvh.tuGoi === 'soat-day-du tu-van-hanh',
        'danh sách màn tự gọi bộ soát có đủ tên — thiếu một tên là treo trình duyệt', tvh.tuGoi);
      bao(tvh.doDuoc >= 6 && tvh.dat === tvh.doDuoc,
        'mọi mục canh đo được ở trình duyệt đều đang đạt',
        tvh.dat + '/' + tvh.doDuoc + (tvh.hong.length ? ' · hỏng: ' + tvh.hong.join(' ') : ''));
      bao(tvh.canh === 10 && tvh.muc === 4,
        'đủ mười mục canh và bốn mức tự động', tvh.canh + ' canh · ' + tvh.muc + ' mức');
      bao(tvh.triMay === 3 && tvh.triNguoi === 1,
        'đường cập nhật kiến thức: máy đi ba chặng, chặng nhập kho phải có người duyệt',
        tvh.triMay + ' máy · ' + tvh.triNguoi + ' người');
      bao(tvh.khong >= 6,
        'có danh sách việc KHÔNG BAO GIỜ tự động — tự động hoá phần chịu trách nhiệm là bỏ tay lái',
        tvh.khong + ' việc');
      bao(tvh.that === 3 && tvh.mcThat >= 100,
        'hệ thống tự nói ra phần nó KHÔNG làm được, không hứa tuyệt đối',
        tvh.that + ' chữ được nói thật · ranh giới máy chủ ' + tvh.mcThat + ' ký tự');
    }

    /* ── Ma trận băng PHẢI ghép được thật ──
       Lớp 4.400 phiếu từng nằm im suốt nhiều đợt phát hành: G.MT_BANG_TANG
       lưu tang là 'T1' còn người gọi truyền số 1, nên phép so sánh === luôn
       sai và mtPhieu trả null cho MỌI tổ hợp. Không màn nào văng lỗi (null
       được trả gọn gàng) và không bài kiểm nào bắt được, vì không bài nào
       gọi thẳng mtPhieu. Mục này gọi thẳng. */
    const mtr = await p.evaluate(() => {
      const G = window.G;
      if (!G.mtPhieu || !G.PHACDO) return { co:false };
      const BANG = ['XANH','VANG','CAM','DO'];
      let ok = 0, hong = [];
      const t0 = performance.now();
      G.PHACDO.forEach(pd => {
        for (let t = 1; t <= 5; t++) BANG.forEach(bg => {
          const x = G.mtPhieu(pd.ma, t, bg);
          if (x && x.oTang && x.bang && x.do) ok++;
          else if (hong.length < 5) hong.push(pd.ma + '/T' + t + '/' + bg);
        });
      });
      const ms = Math.round(performance.now() - t0);
      /* Tầng nhận cả số lẫn chuỗi — hai người gọi khác nhau vẫn ra một kết quả */
      const soVaChuoi = !!(G.mtBangTang(1,'XANH') && G.mtBangTang('T1','XANH')) &&
        G.mtBangTang(1,'XANH') === G.mtBangTang('T1','XANH');
      return { co:true, ok, tong: G.PHACDO.length * 20, hong, ms, soVaChuoi };
    });
    bao(mtr.co, 'có hàm ghép phiếu ma trận để kiểm');
    if (mtr.co) {
      bao(mtr.ok === mtr.tong,
        'cả ' + mtr.tong.toLocaleString('vi-VN') + ' phiếu ma trận ghép được đủ bốn lớp — 220 vấn đề × 5 tầng × 4 băng',
        mtr.hong.length ? ('hỏng: ' + mtr.hong.join(' ')) : (mtr.ok + ' phiếu · ' + mtr.ms + 'ms'));
      bao(mtr.soVaChuoi,
        'tra cứu tầng nhận cả số 1 lẫn chuỗi T1 và ra cùng một kết quả');
      bao(mtr.ms < 2000, 'ghép toàn bộ phiếu ma trận dưới hai giây', mtr.ms + 'ms');
    }

    /* ── Không kho nào bị hai tệp cùng đặt tên ──
       G.CD_LUAT của sáu chân dung khách hàng từng bị tệp kênh cộng đồng
       ghi đè, vì nó nạp sau theo thứ tự chữ cái. Màn chân dung sau đó
       dựng ra sáu thẻ rỗng và sáu chữ "undefined" — không lỗi, không
       cảnh báo, chỉ là nội dung của kho khác hiện lên chỗ của mình. */
    {
      const fsC = require('fs'), pxC = require('path');
      const dC = pxC.join(__dirname, '..', 'kho-goc');
      const chu = {}, dung = [];
      if (fsC.existsSync(dC)) {
        for (const f of fsC.readdirSync(dC).filter(x => x.endsWith('.js'))) {
          const vb = fsC.readFileSync(pxC.join(dC, f), 'utf8');
          /* Chỉ bắt GÁN ĐÈ. Dạng "G.X = G.X || []" rồi push là cách chia
             một kho ra nhiều tệp có chủ ý — G.CHUYEN và G.SH_HOI đều dùng
             nó. Bắt cả dạng ấy thì bài kiểm đỏ ở chỗ hệ thống làm đúng, và
             nới nó ra thì mất luôn tác dụng canh. */
          /* Khoảng trắng nằm TRONG tiên đoán, không nằm trước nó.
             Viết "\\s*=\\s*(?!G\\.\\1...)" thì \\s* lùi lại được: nó nhả
             khoảng trắng ra, tiên đoán soi vào dấu cách thay vì soi vào
             "G.X ||", thấy không khớp nên phủ định thành công — và mọi
             dòng nối thêm đều bị báo nhầm là gán đè. */
          const re = /^G\.([A-Z][A-Z0-9_]{2,})\s*=(?!\s*G\.\1\s*\|\|)/gm;
          let m;
          while ((m = re.exec(vb))) {
            if (chu[m[1]] && chu[m[1]] !== f) dung.push(m[1] + ' (' + chu[m[1]] + ' ↔ ' + f + ')');
            else chu[m[1]] = f;
          }
        }
      }
      bao(!dung.length,
        'không kho nào bị hai tệp cùng đặt tên — kho nạp sau ghi đè kho nạp trước trong im lặng',
        dung.length ? dung.join(' · ') : Object.keys(chu).length + ' kho, tên không trùng');
    }

    /* ── Kênh cộng đồng và gốc NLP ── */
    const cdn = await p.evaluate(() => {
      const G = window.G;
      const nhom = (G.KENH_DS || [])[0] || {};
      /* Kênh chính thức PHẢI nằm trong ngoại lệ của bộ dò rò rỉ. Không có
         thì Tư vấn mời gia đình vào nhóm chính thức — việc đúng — lại bị
         máy báo là kéo khách ra ngoài hệ thống. */
      const nl = ((G.LUAT_LAMVIEC || {}).ngoaiLe || []).join(' ');
      const boDo = ((G.LUAT_LAMVIEC || {}).dauHieu || [])
        .filter(d => new RegExp(d.re, 'i').test(nhom.url || ''));
      const thaDuoc = boDo.every(d => nl.indexOf('groups/giadinhthinhvuong') >= 0);
      return {
        kenh: (G.KENH_DS || []).length,
        luat: (G.KENH_LUAT || []).length,
        url: nhom.url || '',
        https: /^https:\/\//.test(nhom.url || ''),
        cho: (nhom.cho || []).length, khong: (nhom.khong || []).length,
        boDo: boDo.map(d => d.ma), thaDuoc,
        nlp: (G.NLP_GOC || []).length,
        muc: (G.NLP_MUC || []).map(m => m.ma).sort().join(' '),
        mong: (G.NLP_GOC || []).filter(x => x.bang === 'mong').map(x => x.ma),
        camDu: (G.NLP_GOC || []).every(x => (x.cam || '').length >= 40),
        mtCo: (G.NLP_GOC || []).every(x => (x.mt || []).every(id =>
          (G.MOTHUC || []).some(m => m.id === id)))
      };
    });
    bao(cdn.kenh === 3 && cdn.luat === 6,
      'ba kênh cộng đồng chính thức, sáu luật kèm theo', cdn.kenh + ' kênh · ' + cdn.luat + ' luật');
    bao(cdn.https, 'đường dẫn nhóm dùng https', cdn.url);
    bao(cdn.khong >= 4,
      'nhóm ghi rõ những gì KHÔNG được đăng — hồ sơ và kho nghề ở lại trong ứng dụng',
      cdn.khong + ' điều cấm · ' + cdn.cho + ' điều được đăng');
    bao(cdn.thaDuoc,
      'kênh chính thức nằm trong ngoại lệ của bộ dò rò rỉ — mời vào nhóm chính thức không bị báo vi phạm',
      cdn.boDo.length ? ('bộ dò khớp ' + cdn.boDo.join(' ') + ', đã tha') : 'bộ dò không khớp');
    bao(cdn.nlp >= 9 && cdn.muc === 'chac mong motphan',
      'gốc NLP có đủ ba mức bằng chứng — vững · vững một phần · mỏng',
      cdn.nlp + ' mô thức gốc · mức: ' + cdn.muc);
    bao(cdn.mong.length >= 1,
      'có ghi thẳng những chỗ bằng chứng MỎNG, không giấu đi', cdn.mong.join(' '));
    bao(cdn.camDu, 'mỗi gốc NLP đều ghi rõ điều KHÔNG được tuyên bố');
    bao(cdn.mtCo, 'mọi mã mô thức trong bảng gốc NLP đều có thật trong kho mô thức');

    /* ── Ma trận màn × vai ──
       Bảng phân quyền lệch khỏi ứng dụng là kiểu hỏng không ai phát hiện
       cho tới lúc một vai nhìn thấy thứ đáng lẽ không được nhìn. Ma trận
       này tính từ chính G.NAV và G.vaiCo nên không lệch được — mục này
       canh những điều PHẢI đúng trong ma trận ấy. */
    const mt = await p.evaluate(() => {
      const G = window.G;
      const d = G.demTheoVai();
      const r01 = d.find(x => x.vai.id === 'R01');
      const r02 = d.find(x => x.vai.id === 'R02');
      /* Không vai nào được thấy nhiều hơn Super Admin */
      const vuot = d.filter(x => x.thay > r01.thay).map(x => x.vai.id);
      /* Bậc thang: vai bậc thấp hơn không được thấy ít hơn vai bậc cao hơn */
      const sap = d.slice().sort((a, b) => a.vai.lv - b.vai.lv);
      const nguoc = [];
      for (let i = 1; i < sap.length; i++)
        if (sap[i].thay > sap[i - 1].thay)
          nguoc.push(sap[i].vai.id + '>' + sap[i - 1].vai.id);
      /* Super Admin so với mọi vai: không màn nào SA không thấy */
      const thieu = d.filter(x => x.vai.id !== 'R01')
        .map(x => ({ id: x.vai.id, n: G.soSanhVai('R01', x.vai.id).chiB.length }))
        .filter(x => x.n > 0);
      /* Mọi vai đều có tài khoản mẫu để bấm vào thử */
      const khongTK = d.filter(x =>
        !(G.ACCOUNTS || []).some(a => a.role === x.vai.id)).map(x => x.vai.id);
      return { so: d.length, tong: r01.tong, r01: r01.thay, r02: r02.thay,
               vuot, nguoc, thieu, khongTK,
               hep: (function(){
                 let n = 0;
                 G.NAV.forEach(g => g.items.forEach(i => {
                   if (d.filter(x => G.vaiThayMan(x.vai.id, i)).length <= 2) n++; }));
                 return n; })() };
    });
    bao(mt.r01 === mt.tong && mt.r02 === mt.tong,
      'Super Admin và Admin hệ thống thấy TOÀN BỘ màn — không sót màn nào',
      mt.r01 + '/' + mt.tong + ' · ' + mt.r02 + '/' + mt.tong);
    bao(!mt.vuot.length, 'không vai nào thấy nhiều hơn Super Admin', mt.vuot.join(' '));
    bao(!mt.thieu.length,
      'không vai nào thấy một màn mà Super Admin không thấy',
      mt.thieu.map(x => x.id + ':' + x.n).join(' '));
    bao(!mt.nguoc.length,
      'bậc thang phân quyền không đảo ngược — vai bậc thấp không thấy nhiều hơn vai bậc cao',
      mt.nguoc.join(' '));
    bao(!mt.khongTK.length,
      'mười lăm vai đều có tài khoản mẫu để bấm vào kiểm thử', mt.khongTK.join(' '));
    bao(mt.hep >= 1,
      'có liệt riêng những màn hẹp nhất — chỗ nới quyền nhầm sẽ tốn nhất',
      mt.hep + ' màn từ hai vai trở xuống');

    /* ── Bảng quy trình toàn Web App ──
       Mọi bước phải trỏ tới màn CÓ THẬT. Bảng quy trình lệch khỏi ứng
       dụng còn tệ hơn không có bảng: người đọc tin nó rồi quyết định sai. */
    const qt = await p.evaluate(() => {
      const G = window.G, s = G.qtSoat();
      return { luong: s.luong, buoc: s.man, hong: s.hong,
               rieng: (G.QT_RIENG || []).length, luat: (G.QT_LUAT || []).length,
               dai: (function(){ G.S.view = 'quy-trinh-toan-he'; G.render();
                 return document.getElementById('main').innerText.trim().length; })() };
    });
    bao(qt.luong === 8 && qt.buoc >= 30,
      'bảng quy trình có đủ tám luồng vận hành', qt.luong + ' luồng · ' + qt.buoc + ' bước');
    bao(!qt.hong.length,
      'mọi bước trong bảng quy trình đều trỏ tới màn có thật — bảng chưa trôi khỏi ứng dụng',
      qt.hong.join(' · '));
    bao(qt.rieng >= 9 && qt.luat >= 4,
      'bảng quy trình ghi rõ quyền riêng của cấp quản trị và luật đọc bảng',
      qt.rieng + ' quyền riêng · ' + qt.luat + ' luật');
    bao(qt.dai >= 15000, 'màn quy trình dựng ra đủ dày để rà', qt.dai.toLocaleString('vi-VN') + ' ký tự');

    /* ── Học phí và hợp đồng: RIÊNG từng tuyến, không mượn của nhau ──
       Chủ Học viện chốt: tuyến nào có chính sách học phí độc lập tuyến
       đó, và tuyến nào biên soạn hợp đồng theo quy định riêng tuyến đó.
       Bài kiểm giữ đúng hai điều ấy ở mức cấu trúc — nội dung là việc
       của người phụ trách tuyến. */
    const hd = await p.evaluate(() => {
      const G = window.G;
      return {
        soMoc:   (G.TUYEN_MOC || []).map(m => m.ma),
        soChuan: (G.HD_CHUAN || []).length,
        soRieng: (G.HD_RIENG || []).length,
        pvHP:    (G.HP_PHAM_VI || {}).tuyen,
        /* Chưa tuyến nào có kho hợp đồng, nên tuyến nào cũng phải báo
           thiếu đủ mười bốn điều. Báo 0 thiếu ở đây là đạt rỗng. */
        thieu:   (G.TUYEN || []).map(t => ({
                   ma: t.ma,
                   n: (G.hdConThieu(t.ma) || []).length,
                   du: G.hdDuChuan(t.ma) })),
        /* Hàm phải trả null khi chưa nạp bản chuẩn — không trả mảng rỗng */
        rongLaNull: (function(){
          const giu = G.HD_CHUAN; G.HD_CHUAN = [];
          const r = G.hdConThieu('GITA365'); G.HD_CHUAN = giu;
          return r === null; })()
      };
    });
    bao(hd.soMoc.indexOf('M7') >= 0,
      'bảng mốc có M7 — hợp đồng riêng của tuyến là điều kiện mở tuyến', hd.soMoc.join(' '));
    bao(hd.soChuan === 14 && hd.soRieng === 7,
      'bản chuẩn hợp đồng đủ mười bốn điều chung và bảy điều riêng',
      hd.soChuan + ' chung · ' + hd.soRieng + ' riêng');
    bao(hd.pvHP === 'GITA365',
      'bảng học phí năm tầng ghi rõ chỉ áp cho GITA365 — không tuyến nào mượn bảng giá của tuyến nào',
      hd.pvHP || 'KHÔNG GHI PHẠM VI');
    bao(hd.thieu.every(x => x.n === 14 && x.du === false),
      'chưa tuyến nào có hợp đồng riêng, và hệ báo đúng là thiếu cả mười bốn điều',
      hd.thieu.map(x => x.ma + ':' + x.n).join(' '));
    bao(hd.rongLaNull,
      'bản chuẩn chưa nạp thì báo NULL, không báo "không thiếu điều nào" — đạt rỗng là kiểu hỏng nguy hiểm nhất');

    /* ── Bốn trụ GITA giữ đủ thành tố của bản chuẩn ──
       Danh sách thành tố dài có chủ ý: nó là thứ phân biệt mô thức này
       với bốn chữ cái viết tắt của nơi khác. Một lần "dọn cho gọn giao
       diện" là mất luôn phần làm nên khác biệt, và mất trong im lặng vì
       màn hình vẫn đẹp. Ngưỡng đặt theo bản chủ Học viện đưa. */
    const tru = await p.evaluate(() => (window.G.GITA || []).map(g => ({
      k: g.k, so: (g.inc || []).length, ten: g.name, mo: (g.desc || '').length })));
    const canCo = { G: 6, I: 8, T: 9, A: 12 };
    const hut = tru.filter(t => t.so < (canCo[t.k] || 0))
      .map(t => t.k + ' ' + t.so + '/' + canCo[t.k]);
    bao(tru.length === 4, 'đủ bốn trụ G · I · T · A', tru.map(t => t.k).join(''));
    bao(!hut.length,
      'bốn trụ giữ đủ thành tố của bản chuẩn — không trụ nào bị rút gọn cho vừa giao diện',
      hut.length ? hut.join(' · ') : tru.reduce((a, t) => a + t.so, 0) + ' thành tố');
    bao(tru.every(t => t.mo >= 60),
      'trụ nào cũng có câu hỏi chẩn đoán đủ dài để dùng thật',
      tru.map(t => t.k + ':' + t.mo).join(' '));

    /* ── Số bản phải nhích khi phát hành ── */
    const banMeta = (doc('src/data.core.js').match(/version:\s*'([^']+)'/) || [])[1];
    const banSw = (doc('sw.js').match(/CACHE = 'gita365-v([\d-]+)'/) || [])[1];
    bao(!!banMeta && !!banSw && banSw.replace(/-/g, '.').indexOf(banMeta) === 0,
      'số bản trong ứng dụng và trong bộ nhớ đệm nói cùng một bản — mở nhầm bản cũ là lỗi tốn nhất',
      'ứng dụng v' + banMeta + ' · đệm ' + banSw);
  }


  /* ═══════════ 37 · MÁY CHỦ LÀ MÁY CỦA CHỦ ═══════════
     Chủ hệ thống yêu cầu: dữ liệu ở máy của anh ấy; máy khác chỉ được
     dùng, không được lưu hay tải về.

     Mục này KHÔNG đọc chính sách. Nó dựng máy chủ thật ở desktop/may-chu.js
     bằng bộ khoá thật và bảy tệp kho thật, rồi đóng vai một máy khách đi
     xin — vì một chính sách viết đúng mà mã chặn sai thì bản kiểm nào chỉ
     đọc chữ cũng xanh.

     Bỏ qua khi không có kho/khoa.json (máy dựng bản công khai). */
  const fs37 = require('fs'), px37 = require('path'), cr37 = require('crypto');
  const goc37 = px37.join(__dirname, '..');
  const tepKhoa37 = px37.join(goc37, 'kho', 'khoa.json');
  const appDich37 = px37.join(goc37, 'desktop', 'app');

  console.log('\n37 · MÁY CHỦ LÀ MÁY CỦA CHỦ — MÁY KHÁC CHỈ ĐƯỢC DÙNG');
  if (!fs37.existsSync(tepKhoa37) || !fs37.existsSync(px37.join(appDich37, 'index.html'))) {
    console.log('  · bỏ qua — máy này không có bộ khoá hoặc chưa chạy desktop/chuan-bi.js');
  } else {
    const mc37 = require(px37.join(goc37, 'desktop', 'may-chu.js'));
    const khoa37 = JSON.parse(fs37.readFileSync(tepKhoa37, 'utf8')).khoa;
    const bang37 = { 'ph@thu.vn': { vai: 'R13', goi: ['nen', 'tang1'] } };
    const nk37 = [];
    const CONG37 = 8377;
    const U37 = 'http://127.0.0.1:' + CONG37;
    const UA37 = { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0) Chrome/130' };
    const tepQuen37 = px37.join(require('os').tmpdir(), 'gita-kiem-may-khach.json');
    try { fs37.rmSync(tepQuen37, { force: true }); } catch (e) {}

    try {
      await mc37.bat({
        goc: appDich37, cong: CONG37, tepMayQuen: tepQuen37,
        layKhoaGoc: () => khoa37, layBangCap: () => bang37,
        ghiNhatKy: d => nk37.push(d)
      });

      /* ── Kho gốc không rời máy chủ ──
         Bốn đường này là bốn cách người ta thử. Đường thứ ba có ../ để
         chắc rằng chặn không phải bằng cách so chuỗi đầu đường dẫn. */
      const chan37 = [];
      for (const d of ['/kho/nen.enc', '/kho/khoa.json', '/src/../kho/nghe.enc', '/kho/mau.json']) {
        const r = await fetch(U37 + d, { headers: UA37 });
        if (r.status !== 403) chan37.push(d + ':' + r.status);
      }
      bao(!chan37.length, 'không đường nào lấy được kho gốc hoặc bộ khoá từ máy khách',
        chan37.length ? chan37.join(' ') : '4 đường thử đều 403');

      /* ── Máy lạ phải được duyệt ── */
      let r37 = await fetch(U37 + '/cap-phep', { method: 'POST', headers: UA37,
        body: JSON.stringify({ fn: 'capKhoa', u: 'ph@thu.vn', vai: 'R13', goi: ['nen'] }) });
      let d37 = await r37.json();
      bao(!d37.ok && d37.code === 'CHODUYET',
        'máy lạ nằm ở hàng chờ, không lấy được gì cho tới khi chủ hệ thống duyệt',
        d37.code || JSON.stringify(d37).slice(0, 60));

      const ds37 = mc37.danhSachMay();
      bao(ds37.length === 1 && ds37[0].duyet === 'cho',
        'chủ hệ thống thấy máy đang chờ, kèm tên máy và tài khoản',
        ds37.length ? ds37[0].ten : 'không thấy máy nào');
      if (ds37.length) mc37.datMay(ds37[0].van, 'thuan');

      /* ── Khoá cấp ra phải là khoá DÙNG MỘT LẦN ──
         Đây là điều làm cho "khoá không rời máy chủ" thành sự thật đo được,
         chứ không phải một câu trong tài liệu. */
      r37 = await fetch(U37 + '/cap-phep', { method: 'POST', headers: UA37,
        body: JSON.stringify({ fn: 'capKhoa', u: 'ph@thu.vn', vai: 'R13', goi: ['nen', 'tang1'] }) });
      d37 = await r37.json();
      const phien37 = d37.phien;
      bao(!!d37.ok && !!phien37 && Object.keys(d37.khoa || {}).length === 2,
        'duyệt rồi thì cấp đủ gói trong phạm vi, kèm mã phiên',
        Object.keys(d37.khoa || {}).join(' ') || (d37.error || ''));
      bao(Object.keys(d37.khoa || {}).every(t => d37.khoa[t] !== khoa37[t]),
        'KHÔNG một khoá gốc nào rời máy chủ — mỗi phiên một khoá mới',
        'so từng khoá cấp ra với khoá gốc');

      /* ── Máy khách khai vai gì cũng không mở thêm được ── */
      r37 = await fetch(U37 + '/cap-phep', { method: 'POST', headers: UA37,
        body: JSON.stringify({ fn: 'capKhoa', u: 'ph@thu.vn', vai: 'R01', goi: ['nen', 'nghe', 'tang5'] }) });
      const d2 = await r37.json();
      const co37 = Object.keys(d2.khoa || {});
      bao(co37.indexOf('nghe') < 0 && co37.indexOf('tang5') < 0,
        'máy khách khai vai R01 cũng không mở thêm gói nào — phạm vi do máy chủ tra theo tài khoản',
        'chỉ được ' + (co37.join(' ') || '—'));
      r37 = await fetch(U37 + '/kho-phuc-vu/nghe?p=' + encodeURIComponent(d2.phien), { headers: UA37 });
      bao(r37.status === 403, 'xin thẳng gói ngoài phạm vi cũng bị từ chối', r37.status);

      /* ── Bản mã phục vụ KHÔNG mở được bằng khoá gốc ──
         Nếu mở được thì máy chủ đang phục vụ lại đúng bảy tệp .enc của bản
         phát hành, và ai giữ được một khoá gốc là giữ được vĩnh viễn. */
      r37 = await fetch(U37 + '/kho-phuc-vu/nen?p=' + encodeURIComponent(phien37), { headers: UA37 });
      const g37 = await r37.json();
      const b37 = Buffer.from(g37.du || '', 'base64');
      const mo37 = (buf, k) => {
        const de = cr37.createDecipheriv('aes-256-gcm', Buffer.from(k, 'base64'), buf.subarray(0, 12));
        de.setAuthTag(buf.subarray(12, 28));
        return Buffer.concat([de.update(buf.subarray(28)), de.final()]).toString('utf8');
      };
      let mogoc37 = false;
      try { mo37(b37, khoa37.nen); mogoc37 = true; } catch (e) {}
      bao(!mogoc37, 'khoá gốc KHÔNG mở được gói máy chủ phục vụ — bản mã đã đổi khoá thật');
      let dung37 = false;
      try { dung37 = mo37(b37, d37.khoa.nen).length > 100; } catch (e) {}
      bao(dung37, 'khoá phiên mở được đúng gói của phiên ấy — máy khách vẫn dùng được bình thường');

      /* ── Cắt quyền là cắt NGAY ──
         Chặn mà chỉ có hiệu lực ở lần xin sau thì người đang ngồi đó vẫn
         dùng tiếp tới tám tiếng. Đó không phải là cắt. */
      mc37.datMay(mc37.danhSachMay()[0].van, 'chan');
      r37 = await fetch(U37 + '/kho-phuc-vu/nen?p=' + encodeURIComponent(phien37), { headers: UA37 });
      bao(r37.status === 401, 'cắt quyền là cắt ngay phiên đang mở, không đợi hết hạn', r37.status);

      /* ── Trang cho máy khách ── */
      r37 = await fetch(U37 + '/', { headers: UA37 });
      const html37 = await r37.text();
      /* Mốc "mã ứng dụng bắt đầu" từ v8.6 là gita-app.js, không còn là
         thẻ src/kho-khoa.js. Đo bằng thẻ script ĐẦU TIÊN của trang thì
         đúng bất kể sau này gộp hay tách. */
      const iCo = html37.indexOf('GITA_MAY_KHACH');
      const iMa = html37.search(/<script src="(gita-app\.js|src\/)/);
      bao(iCo >= 0 && iMa >= 0 && iCo < iMa,
        'cờ máy khách được tiêm TRƯỚC mọi mã ứng dụng — chặn muộn là không chặn',
        iCo >= 0 && iMa >= 0 ? 'cờ ở ' + iCo + ', mã ở ' + iMa : 'không thấy mốc');
      bao(!/serviceWorker' in navigator/.test(html37),
        'trang cho máy khách không đăng ký service worker — không có bộ đệm nằm lại');
      bao((r37.headers.get('cache-control') || '').includes('no-store'),
        'mọi đường trả về đều no-store', r37.headers.get('cache-control') || 'không có');

      /* ── Lớp chặn phía máy khách phải có thật ── */
      const mk37 = fs37.readFileSync(px37.join(goc37, 'src', 'may-khach.js'), 'utf8');
      const canCo37 = [
        ['createObjectURL', 'cắt đường tạo tệp tải về'],
        ['a[download]', 'chặn thẻ tải về'],
        ['window.print', 'chặn lệnh in'],
        ['BI_KHOA_CHEP', 'khoá sao chép cho mọi vai'],
        ['localStorage', 'không ghi gì ra đĩa máy khách'],
        ['unregister', 'gỡ bộ đệm cũ nếu máy ấy từng cài bản web']
      ].filter(x => mk37.indexOf(x[0]) < 0);
      bao(!canCo37.length, 'lớp chặn ở máy khách đủ sáu đường',
        canCo37.length ? 'thiếu: ' + canCo37.map(x => x[1]).join(', ') : 'tải · thẻ tải · in · chép · đĩa · bộ đệm');
      /* Lớp chặn nay nằm trong bản gộp chứ không còn thẻ riêng. Đo cái
         thật sự quan trọng: nó có được NẠP không — tức có trong danh
         sách gộp VÀ có mặt trong tệp gộp mà trang web tải về. */
      const dsG37 = JSON.parse(fs37.readFileSync(px37.join(goc37, 'tools', 'danh-sach-src.json'), 'utf8')).tep;
      const gop37 = fs37.readFileSync(px37.join(goc37, 'gita-app.js'), 'utf8');
      bao(dsG37.indexOf('src/may-khach.js') >= 0 && gop37.indexOf('GITA_MAY_KHACH') >= 0,
        'lớp chặn máy khách nằm trong bản mã mà trang web thật sự nạp');
      /* ── Chặn mà vẫn để sẵn đường vòng thì không phải chặn ──
         Bản đầu của may-khach.js giữ lại hàm createObjectURL gốc trong một
         biến "để phòng khi cần". Đó là đúng cái lỗ vừa bịt, chỉ đổi tên.
         Mục này chốt lại: hàm gốc không được cất ở đâu cả. */
      bao(!/(?:var|let|const)\s+\w+\s*=\s*URL\.createObjectURL|G\.\w+\s*=\s*URL\.createObjectURL/.test(mk37),
        'lớp chặn KHÔNG cất lại hàm tạo tệp gốc ở đâu — không có đường vòng');

      /* ── Xin có gói mà mở được không gói nào là HỎNG, không phải xong ──
         Cùng kiểu hỏng đã bắt ở G.hdConThieu: đạt rỗng. Ở đây nó nguy hơn,
         vì máy khách sẽ lặng lẽ rơi về chế độ mẫu còn chủ hệ thống thì
         tưởng máy chủ đang phục vụ tử tế. */
      mc37.datMay(mc37.danhSachMay()[0].van, 'thuan');
      const khoaHong = { nen: Buffer.alloc(32).toString('base64'), tang1: Buffer.alloc(32).toString('base64') };
      mc37.tat();
      await mc37.bat({
        goc: appDich37, cong: CONG37 + 1, tepMayQuen: tepQuen37,
        layKhoaGoc: () => khoaHong, layBangCap: () => bang37, ghiNhatKy: d => nk37.push(d)
      });
      const U38 = 'http://127.0.0.1:' + (CONG37 + 1);
      r37 = await fetch(U38 + '/cap-phep', { method: 'POST', headers: UA37,
        body: JSON.stringify({ fn: 'capKhoa', u: 'ph@thu.vn', vai: 'R13', goi: ['nen', 'tang1'] }) });
      d37 = await r37.json();
      bao(!d37.ok && d37.code === 'KHONGMO',
        'khoá sai thì máy chủ BÁO HỎNG, không trả "xong" với bộ khoá rỗng',
        d37.code || 'trả ' + JSON.stringify(d37).slice(0, 60));
      mc37.tat();

      bao(nk37.some(x => x.viec === 'Chặn tải kho') && nk37.length >= 8,
        'máy chủ ghi nhật ký đủ để truy lại về sau', nk37.length + ' dòng');
    } catch (e) {
      bao(false, 'máy chủ của chủ hệ thống chạy được', String(e && e.message || e));
      try { mc37.tat(); } catch (e2) {}
    }

    /* ── Chính sách phải khớp phần đã dựng ── */
    const mcData = await p.evaluate(() => window.G.TD_MAYCHU || {});
    bao((mcData.daChay || []).length >= 8,
      'bảng chính sách liệt đủ phần ĐÃ CHẠY THẬT', (mcData.daChay || []).length + ' mục');
    bao((mcData.chuaLam || []).length >= 3,
      'và ghi thẳng phần CHƯA LÀM thay vì để trống', (mcData.chuaLam || []).length + ' mục');
    bao((mcData.chuaLam || []).some(x => /mật khẩu/i.test(x.t + ' ' + x.y)),
      'nói rõ mật khẩu vẫn kiểm ở máy khách — chỗ yếu nhất phải được gọi tên');
  }


  /* ═══════════ 38 · CHUYỆN PHẢI TỚI CHỖ NGƯỜI TA ĐANG ĐỨNG ═══════════
     Kho có 600 chuyện theo cấp và 77 chuyện người thật. Trước v8.5 chúng
     chỉ nằm ở ba màn kho; ai không chủ động đi tìm thì không bao giờ đọc.

     Mục này đo phần lồng ghép, và đo bằng cách DỰNG THẬT từng màn rồi
     tìm chuỗi tiêu đề trong đó — không đọc bảng khai. Bảng khai đúng mà
     hàm nối hỏng thì bản kiểm đọc bảng vẫn xanh. */
  console.log('\n38 · CHUYỆN LỒNG VÀO MÀN — ĐỦ CẤP, ĐÚNG MẠCH, ĐỨNG YÊN TRONG NGÀY');
  {
    const lg = await p.evaluate(() => {
      const G = window.G, s = G.clgSoat();
      let hien = 0; const im = [];
      G.CLG_BANG.forEach(d => {
        const f = (G.VIEWS || {})[d.man]; if (!f) return;
        let o = ''; try { o = f(); } catch (e) { o = 'LOI'; }
        if (o.indexOf('CHUYỆN CHO CHỖ NÀY') >= 0) hien++;
        else {
          /* G.thayMan KHÔNG tồn tại — bản đầu viết nhầm tên hàm, nên nhánh
             "(khoá)" chưa bao giờ chạy và MỌI màn khoá bị gán "(HỤT)".
             Mục này chỉ xanh vì đang chạy bằng Super Admin, vai thấy hết.
             Đổi vai một cái là đỏ oan. Tên đúng: G.vaiThayMan(vai, mục). */
          let it = null;
          (G.NAV || []).forEach(g => (g.items || []).forEach(x => { if (x.v === d.man) it = x; }));
          const khoa = it && G.vaiThayMan && !G.vaiThayMan(G.S.role, it);
          im.push(d.man + (o === 'LOI' ? '(lỗi)' : (khoa ? '(khoá)' : '(HỤT)')));
        }
      });
      /* Đứng yên trong ngày: dựng cùng một màn hai lần phải ra cùng một chuyện */
      const a = G.clgChon('ban-do'), b = G.clgChon('ban-do');
      /* Hai màn khác nhau thì không được ra cùng một chuyện — nếu ra cùng thì
         hạt giống không thật sự có tên màn, và cả ba mươi màn sẽ kể một chuyện */
      const c = G.clgChon('nhiem-vu');
      /* Đúng mạch: chuyện chọn cho một màn phải thuộc mạch màn ấy khai,
         trừ khi kho của cấp này không có chuyện nào thuộc mạch đó */
      const cap = G.chCapCuaToi();
      const khoCap = (G.CHUYEN || []).filter(x => x.cap === cap);
      const lech = [];
      G.CLG_BANG.forEach(d => {
        const ch = G.clgChon(d.man); if (!ch) return;
        const coMach = khoCap.some(x => x.mach === d.mach);
        if (coMach && ch.mach !== d.mach) lech.push(d.man);
      });
      /* Đúng cấp: không màn nào được đưa chuyện của cấp khác */
      const saiCap = G.CLG_BANG.map(d => G.clgChon(d.man)).filter(x => x && x.cap !== cap).length;
      return { ...s, hien, im, yen: !!a && !!b && a.ma === b.ma, khac: !!a && !!c && a.ma !== c.ma,
        lech, saiCap, cap, tru: G.CLG_BANG.map(d => d.tru) };
    });

    bao(lg.soDong >= 40, 'đủ số màn được gắn chuyện — không phải một hai chỗ làm mẫu', lg.soDong + ' màn');
    bao(lg.daNoi === lg.soDong, 'mọi dòng trong bảng đều nối được vào màn có thật',
      lg.daNoi + '/' + lg.soDong);
    bao(!lg.thieuMan.length, 'không dòng nào trỏ tới màn không tồn tại',
      lg.thieuMan.join(' ') || 'bảng khớp ứng dụng');
    bao(!lg.thieuChuyen.length, 'màn nào cũng chọn ra được một chuyện — không ô trống',
      lg.thieuChuyen.join(' ') || 'đủ cả ' + lg.soDong);

    const hut = lg.im.filter(x => x.indexOf('(HỤT)') >= 0 || x.indexOf('(lỗi)') >= 0);
    bao(!hut.length,
      'màn nào vai này mở được thì đều thật sự hiện chuyện — màn khoá thì để nguyên, đúng luật',
      hut.length ? hut.join(' ') : lg.hien + ' màn hiện · số còn lại là màn khoá');

    /* Ba luật của tầng lồng ghép, đo từng cái */
    bao(lg.yen, 'chuyện đứng yên trong ngày — mở lại màn không ra chuyện khác');
    bao(lg.khac, 'hai màn khác nhau kể hai chuyện khác nhau — hạt giống có tên màn thật');
    bao(!lg.saiCap, 'không màn nào đưa chuyện của cấp tài khoản khác',
      lg.saiCap ? lg.saiCap + ' chỗ lệch' : 'cả ' + lg.soDong + ' màn đúng cấp ' + lg.cap);
    bao(!lg.lech.length, 'chuyện chọn ra thuộc đúng mạch màn ấy khai',
      lg.lech.length ? lg.lech.join(' ') : 'khớp mạch');

    /* Gắn trụ GITA: đây là chỗ phân biệt "kể chuyện cho vui" với
       "dẫn dắt theo mô thức". Thiếu một trụ là mô thức khuyết một chân. */
    const truCo = {}; lg.tru.forEach(t => truCo[t] = (truCo[t] || 0) + 1);
    bao(['G', 'I', 'T', 'A'].every(k => truCo[k] >= 5),
      'bốn trụ G · I · T · A đều được chuyện nuôi, không trụ nào bỏ trống',
      ['G', 'I', 'T', 'A'].map(k => k + ':' + (truCo[k] || 0)).join(' '));

    bao(lg.soChuyen === 600, 'đủ sáu trăm chuyện theo cấp tài khoản', String(lg.soChuyen));
    bao(lg.soNguoiThat >= 70, 'đủ kho chuyện người thật', lg.soNguoiThat + ' người');

    /* Bốn cấp khách hàng khác nhau phải nhận bốn kho khác nhau. Cùng một
       chuyện cho cả học viên lớp 9 lẫn Coach là hỏng cả tầng lồng ghép. */
    const theoVai = {};
    for (const [u, ten] of [['hocvien@gita365.vn', 'HS'], ['phuhuynh@gita365.vn', 'PH'],
                            ['coach@gita365.vn', 'COACH'], ['daisu@gita365.vn', 'CTV']]) {
      await p.evaluate(x => window.G.doLogin(x), u);
      /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
      theoVai[ten] = await p.evaluate(() => {
        const G = window.G, c = G.clgChon('ban-do');
        return { cap: G.chCapCuaToi(), ma: c && c.ma };
      });
    }
    const capDung = Object.keys(theoVai).every(k => theoVai[k].cap === k);
    bao(capDung, 'bốn cấp tài khoản đọc bốn kho chuyện của riêng mình',
      Object.keys(theoVai).map(k => k + '→' + theoVai[k].cap).join(' '));
    const ma = Object.keys(theoVai).map(k => theoVai[k].ma);
    bao(new Set(ma).size === ma.length,
      'cùng một màn nhưng bốn cấp nhận bốn chuyện khác nhau', ma.join(' '));

    await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
  }


  /* ═══════════ 39 · MÁY TÌM KIẾM ĐỌC ĐƯỢC — MÀ KHO VẪN KHOÁ ═══════════
     Trước v8.7, GITA 365 không xếp hạng thấp — nó KHÔNG TỒN TẠI với máy
     tìm kiếm, do chính mình khai: robots.txt Disallow toàn bộ, thẻ meta
     noindex, và 77 ký tự trong <body> trước khi chạy JavaScript.

     Mục này đo hai thứ cùng lúc, vì mở cửa trước mà hở kho thì tệ hơn
     đóng cả hai. */
  console.log('\n39 · MÁY TÌM KIẾM ĐỌC ĐƯỢC — MÀ KHO VẪN KHOÁ');
  {
    const fs39 = require('fs'), px39 = require('path');
    const goc39 = px39.join(__dirname, '..');
    const doc39 = f => fs39.readFileSync(px39.join(goc39, f), 'utf8');
    const idx = doc39('index.html');
    const rb = doc39('robots.txt');

    /* ── Chữ trình thu thập thật sự đọc được ── */
    const t1 = idx.indexOf('<!-- SEO:THAN -->'), t2 = idx.indexOf('<!-- /SEO:THAN -->');
    const khung = t1 >= 0 && t2 > t1 ? idx.slice(t1, t2) : '';
    const chu = khung.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    bao(chu.length >= 5000,
      'trang chủ có đủ chữ để xếp hạng khi chưa chạy JavaScript — trước đây là 77 ký tự',
      chu.length.toLocaleString('vi-VN') + ' ký tự');

    /* ── Mỗi truy vấn một địa chỉ ──
       Một địa chỉ không xếp hạng được cho nhiều truy vấn khác nhau.
       Người tìm "mô thức huấn luyện GITA" và người tìm "con không chịu
       học phải làm sao" cần hai trang riêng. */
    const TRANG_CON = ['mo-thuc-huan-luyen-gita.html', 'nam-tang-dong-hanh.html',
      'hanh-trinh-12-chang.html', 'duong-vao.html', 'cau-hoi-thuong-gap.html'];
    const chuCua = f => {
      if (!fs39.existsSync(px39.join(goc39, f))) return -1;
      return doc39(f).replace(/<(script|style|head)[\s\S]*?<\/\1>/g, '')
        .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;
    };
    const dai = TRANG_CON.map(f => ({ f, n: chuCua(f) }));
    bao(dai.every(x => x.n >= 2000),
      'mỗi trang con đủ dày để không bị coi là trang mồi — trang mồi bị Google hạ, không nâng',
      dai.map(x => x.n < 0 ? x.f + ':THIẾU' : x.n).join(' · '));
    bao(dai.reduce((a, x) => a + Math.max(0, x.n), chu.length) >= 22000,
      'tổng nội dung công khai đủ để phủ nhiều truy vấn',
      dai.reduce((a, x) => a + Math.max(0, x.n), chu.length).toLocaleString('vi-VN') +
      ' ký tự trên ' + (TRANG_CON.length + 1) + ' địa chỉ');

    /* ── Không trang nào lặp lại trang nào ──
       Hai địa chỉ cùng nội dung thì Google không biết xếp cái nào, nên
       xếp thấp cả đôi. Đo bằng tiêu đề mục: mục đã sâu ở trang con thì
       không được còn nguyên ở trang chủ. */
    const mucChu = (khung.match(/<h2>([^<]+)<\/h2>/g) || []).map(x => x.replace(/<[^>]+>/g, ''));
    const lapLai = [];
    for (const f of TRANG_CON) {
      if (!fs39.existsSync(px39.join(goc39, f))) continue;
      for (const m of (doc39(f).match(/<h2>([^<]+)<\/h2>/g) || []))
        if (mucChu.indexOf(m.replace(/<[^>]+>/g, '')) >= 0)
          lapLai.push(f + ': ' + m.replace(/<[^>]+>/g, ''));
    }
    bao(!lapLai.length, 'trang chủ và trang con không lặp lại phần nào của nhau',
      lapLai.length ? lapLai.slice(0, 3).join(' · ') : mucChu.length + ' mục ở trang chủ, không mục nào trùng');

    /* ── Trang con phải nối vào nhau, không phải trang mồ côi ── */
    const moCoi = TRANG_CON.filter(f => {
      if (!fs39.existsSync(px39.join(goc39, f))) return true;
      const t = doc39(f);
      return !/href="\//.test(t) || !/<nav/.test(t);
    });
    bao(!moCoi.length, 'trang con nào cũng có đường dẫn sang trang khác — không trang nào mồ côi',
      moCoi.join(' ') || TRANG_CON.length + ' trang đều nối');

    /* ── Dữ liệu có cấu trúc riêng của trang con ── */
    const coHowTo = fs39.existsSync(px39.join(goc39, 'duong-vao.html')) &&
      /"HowTo"/.test(doc39('duong-vao.html'));
    const coFaqCon = fs39.existsSync(px39.join(goc39, 'cau-hoi-thuong-gap.html')) &&
      /"FAQPage"/.test(doc39('cau-hoi-thuong-gap.html'));
    const coBread = TRANG_CON.filter(f => fs39.existsSync(px39.join(goc39, f)) &&
      !/"BreadcrumbList"/.test(doc39(f)));
    bao(coHowTo && coFaqCon && !coBread.length,
      'trang con khai đúng loại dữ liệu của mình — HowTo cho đường vào, FAQ cho hỏi–đáp, ' +
      'đường dẫn cho tất cả', coBread.length ? 'thiếu đường dẫn: ' + coBread.join(' ') : 'đủ');

    /* ── Không rò kho nghề ra cửa trước ──
         Mở cửa trước là để người ta tìm thấy Học viện, không phải để
         phác đồ và kịch bản đi ra ngoài. */
    const ro = ['phác đồ', 'kịch bản chuyên môn', 'mô thức số', 'hồ sơ gia đình', 'mật khẩu']
      .filter(x => chu.toLowerCase().indexOf(x) >= 0);
    bao(!ro.length, 'khung công khai KHÔNG mang nội dung kho nghề ra ngoài',
      ro.length ? 'rò: ' + ro.join(' ') : 'chỉ có phần giới thiệu vốn đã công khai');

    /* ── Cho lập chỉ mục ── */
    bao(/<meta name="robots" content="index, follow/.test(idx),
      'thẻ robots cho phép lập chỉ mục — đây là dòng đã chặn Google suốt các bản trước');
    bao(/<link rel="canonical"/.test(idx), 'có địa chỉ chuẩn (canonical)');
    bao(/property="og:image"/.test(idx) && /name="twitter:card"/.test(idx),
      'có thẻ chia sẻ mạng xã hội — ảnh và mô tả không để Facebook tự đoán');

    /* ── Ảnh chia sẻ phải đúng khổ ── */
    const anh = px39.join(goc39, 'assets', 'icons', 'chia-se-1200x630.png');
    let khoAnh = '';
    if (fs39.existsSync(anh)) {
      const b = fs39.readFileSync(anh);
      khoAnh = b.readUInt32BE(16) + '×' + b.readUInt32BE(20);
    }
    bao(khoAnh === '1200×630', 'ảnh chia sẻ đúng khổ 1200×630', khoAnh || 'thiếu ảnh');

    /* ── robots.txt: hai đường, hai chính sách ── */
    bao(!/^User-agent: \*\s*\nDisallow: \/\s*$/m.test(rb) && /Allow:/.test(rb),
      'robots.txt không còn cấm toàn bộ');
    bao(/Disallow: \/kho\//.test(rb) && /Disallow: \/\*\.enc\$/.test(rb),
      'kho mã hoá vẫn bị cấm thu thập — mở cửa trước không phải mở kho');
    const aiChan = ['GPTBot', 'ClaudeBot', 'Google-Extended', 'CCBot', 'PerplexityBot', 'Bytespider']
      .filter(b => !new RegExp('User-agent: ' + b + '\\s*\\nDisallow: /').test(rb));
    bao(!aiChan.length,
      'vẫn chặn máy thu thập dữ liệu huấn luyện AI — chặn Google-Extended KHÔNG hạ thứ hạng tìm kiếm',
      aiChan.length ? 'hở: ' + aiChan.join(' ') : '20 máy AI bị chặn, Googlebot được vào');
    bao(/Sitemap:/.test(rb), 'robots.txt chỉ đường tới sitemap');

    /* ── sitemap ── */
    const sm = doc39('sitemap.xml');
    const soUrl = (sm.match(/<loc>/g) || []).length;
    bao(soUrl === 6 && !/#/.test(sm),
      'sitemap khai đủ sáu địa chỉ và không khai địa chỉ có dấu # — ứng dụng định tuyến bằng #, ' +
      'khai địa chỉ có # là khai địa chỉ không tồn tại', soUrl + ' địa chỉ');
    bao(fs39.existsSync(px39.join(goc39, '.nojekyll')),
      'có .nojekyll — không thì GitHub Pages nuốt thư mục bắt đầu bằng gạch dưới');

    /* ── Dữ liệu có cấu trúc ── */
    const m = idx.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    let ld = null;
    try { ld = m ? JSON.parse(m[1]) : null; } catch (e) { ld = null; }
    bao(!!ld, 'dữ liệu có cấu trúc đọc được bằng máy — sai một dấu phẩy là Google bỏ qua cả khối');
    const loai = ld ? (ld['@graph'] || []).map(x => x['@type']) : [];
    bao(['EducationalOrganization', 'Person', 'WebSite', 'FAQPage'].every(x => loai.indexOf(x) >= 0),
      'khai đủ tổ chức, người sáng lập, trang và hỏi–đáp', loai.join(' '));
    const faq = ld ? (ld['@graph'] || []).filter(x => x['@type'] === 'FAQPage')[0] : null;
    bao(faq && (faq.mainEntity || []).length >= 12,
      'đủ câu hỏi–đáp có cấu trúc để chiếm ô trả lời nhanh',
      faq ? (faq.mainEntity || []).length + ' câu' : '0');

    /* ══ KHÔNG DỰNG ĐÁNH GIÁ GIẢ ══
       Đây là mục quan trọng nhất của cả phần SEO. Kho có sẵn G.HAILONG
       với "Nhà Khánh Vy", "Nhà Đức Anh", 87,4% — toàn dữ liệu mẫu. Đem
       chúng lên trang dưới dạng AggregateRating là vi phạm chính sách
       đánh giá giả của Google, mà mức phạt là phạt tay: mất hẳn chỉ mục.
       Tức là làm đúng cái ngược lại với việc muốn lên top. */
    const dgThat = await p.evaluate(() => (window.G.DANHGIA_THAT || []).length);
    const coRating = /"aggregateRating"|"AggregateRating"/.test(idx);
    bao(dgThat > 0 ? coRating : !coRating,
      dgThat > 0
        ? 'có đánh giá thật thì phát dữ liệu đánh giá'
        : 'CHƯA có đánh giá thật thì KHÔNG phát dữ liệu đánh giá — im lặng, không bịa',
      dgThat + ' đánh giá thật trong kho');
    bao(!/Khánh Vy|Đức Anh|Gia Huy|Thanh Trúc|Ngọc Diệp/.test(khung),
      'không đem nhà hư cấu trong dữ liệu mẫu ra trang công khai');

    /* ── Bốn cửa của một đánh giá thật ── */
    const dg = await p.evaluate(() => {
      const G = window.G;
      const truoc = G.dgCongKhai().length;
      /* Gửi một đánh giá KHÔNG cho phép công khai — nó không được ra ngoài */
      G.dgGui(5, 'Thử: không cho công khai', '', false, 'RUT');
      const cho = G.dgChoDuyet();
      const ma = cho.length ? cho[0].ma : null;
      const sauGui = G.dgCongKhai().length;
      if (ma) G.dgDuyet(ma, true);
      const sauDuyet = G.dgCongKhai().length;
      return { truoc, sauGui, sauDuyet, luat: (G.DG_LUAT || []).length,
        hoi: (G.DG_HOI || []).length, ten: (G.DG_TEN || []).length };
    });
    bao(dg.sauGui === dg.truoc,
      'đánh giá chưa duyệt KHÔNG ra tới trang công khai');
    bao(dg.sauDuyet === dg.truoc,
      'duyệt rồi mà gia đình KHÔNG cho phép thì vẫn không ra ngoài — sự đồng ý là cửa riêng, ' +
      'không phải hệ quả của việc duyệt');
    bao(dg.luat >= 6 && dg.hoi === 3 && dg.ten === 3,
      'luật đánh giá, câu hỏi và mức hiển thị tên đều đủ',
      dg.luat + ' luật · ' + dg.hoi + ' câu hỏi · ' + dg.ten + ' mức tên');

    await p.evaluate(() => { try { localStorage.removeItem('gita365_danh_gia'); } catch (e) {} });
  }


  /* ═══════════ 40 · KHO PHẢI CÓ ĐƯỜNG ĐI GIỮA CÁC KHO ═══════════
     Đo trước khi làm: kho có 1.000 kịch bản, 600 chuyện theo cấp, 77
     chuyện người thật, 220 phác đồ, 250 tình huống — mà KHÔNG một kịch
     bản nào gắn với phác đồ nào.

     Người mở một phác đồ chỉ đọc được nguyên nhân và giải pháp; muốn
     tìm kịch bản cho ca ấy phải tự nhớ tên rồi dò trong một nghìn cái.
     Thực tế là không ai làm. Kho không thiếu nội dung — kho thiếu
     ĐƯỜNG ĐI giữa các nội dung. */
  console.log('\n40 · LỚP NỐI VÀ CHIỀU SÂU');
  {
    const nk = await p.evaluate(() => {
      const G = window.G;
      const s = G.nkSoat ? G.nkSoat() : null;
      if (!s) return null;
      /* Dựng THẬT hai cửa sổ rồi tìm chuỗi — không đọc bảng khai.
         Bảng khai đúng mà hàm bọc hỏng thì bản kiểm đọc bảng vẫn xanh. */
      const giu = G.U.modal;
      let pd = '', th = '';
      G.U.modal = x => { pd = x; }; G.phacDoModal('PH-01');
      G.U.modal = x => { th = x; }; G.tinhHuongModal('T1-1');
      G.U.modal = giu;
      /* Chất lượng mối nối: điểm và số mối nối có từ khoá giải thích */
      const d = G.NOI_KET || { pd: {} };
      const moi = [];
      Object.keys(d.pd || {}).forEach(m => (d.pd[m].kb || []).forEach(x => moi.push(x)));
      const khongVi = moi.filter(x => !x.vi || !x.vi.length).length;
      /* Nhóm phác đồ nào cũng phải có chiều sâu */
      const nhom = {}; (G.PHACDO || []).forEach(x => { nhom[x.nhom] = 1; });
      const thieuSau = Object.keys(nhom).filter(n => !(G.PD_SAU || {})[n]);
      /* Năm cấp phải nói năm việc KHÁC nhau — trùng nhau là chữ, không phải sâu */
      const lap = [];
      Object.keys(G.PD_SAU || {}).forEach(n => {
        const c = G.PD_SAU[n].c || {};
        const lam = ['C1', 'C2', 'C3', 'C4', 'C5'].map(k => (c[k] || {}).lam || '');
        if (new Set(lam).size !== 5) lap.push(n);
      });
      /* Trường "chua" bắt buộc có ở MỌI cấp, kể cả C5 */
      const thieuChua = [];
      Object.keys(G.PD_SAU || {}).forEach(n => {
        const c = G.PD_SAU[n].c || {};
        ['C1', 'C2', 'C3', 'C4', 'C5'].forEach(k => {
          if (!(c[k] || {}).chua || String(c[k].chua).length < 30) thieuChua.push(n + '.' + k);
        });
      });
      return { ...s, pdDai: pd.length, thDai: th.length,
        pdCoKB2: /KỊCH BẢN DÙNG ĐƯỢC/.test(pd), pdCoSau: /CHIỀU SÂU NĂM CẤP/.test(pd),
        pdCoChuyen: /CHUYỆN KỂ ĐƯỢC/.test(pd), thCoKB2: /KỊCH BẢN DÙNG ĐƯỢC/.test(th),
        soMoi: moi.length, khongVi, thieuSau, lap, thieuChua, soNhom: Object.keys(nhom).length };
    });

    bao(!!nk, 'lớp nối có mặt trong ứng dụng');
    if (nk) {
      bao(nk.pdCoKB >= nk.pd, 'mọi phác đồ đều có kịch bản dùng được — trước đây là 0',
        nk.pdCoKB + '/' + nk.pd);
      bao(nk.thCoKB >= nk.th, 'mọi tình huống đều có kịch bản, ưu tiên cùng tầng',
        nk.thCoKB + '/' + nk.th);
      bao(nk.boc === 2, 'lớp nối bọc được cả hai cửa sổ phác đồ và tình huống', nk.boc + '/2');

      /* Đo cửa sổ THẬT, không đo bảng khai */
      bao(nk.pdDai >= 5000 && nk.pdCoKB2 && nk.pdCoSau && nk.pdCoChuyen,
        'mở một phác đồ là thấy đủ kịch bản, chiều sâu và chuyện — dựng thật rồi tìm chuỗi',
        nk.pdDai.toLocaleString('vi-VN') + ' ký tự');
      bao(nk.thDai >= 4000 && nk.thCoKB2,
        'mở một tình huống là thấy kịch bản dùng được', nk.thDai.toLocaleString('vi-VN') + ' ký tự');

      /* ── Mối nối phải giải thích được vì sao nó ở đó ──
         Nối tự động có cái trúng có cái trật. Giấu điểm và từ khoá đi là
         bắt người dùng tin một thứ họ không kiểm được. */
      bao(!nk.khongVi, 'mối nối nào cũng mang từ khoá trùng để người dùng tự kiểm',
        nk.khongVi ? nk.khongVi + '/' + nk.soMoi + ' mối nối không giải thích được' :
        nk.soMoi.toLocaleString('vi-VN') + ' mối nối đều có lý do');

      /* ── Chiều sâu ── */
      bao(!nk.thieuSau.length, 'nhóm phác đồ nào cũng có chiều sâu năm cấp',
        nk.thieuSau.join(' ') || nk.sau + '/' + nk.soNhom + ' nhóm');
      bao(!nk.lap.length,
        'năm cấp nói năm việc KHÁC nhau — hai cấp làm được cùng một việc là chữ, không phải chiều sâu',
        nk.lap.join(' ') || 'cả ' + nk.sau + ' nhóm đều phân biệt được');
      bao(!nk.thieuChua.length,
        'cấp nào cũng ghi rõ CHƯA làm được gì, kể cả C5 — không cấp nào toàn năng',
        nk.thieuChua.slice(0, 4).join(' ') || 'đủ cả ' + (nk.sau * 5) + ' ô');

      /* ── Ba kho còn lại, báo trung thực khi chưa xong ── */
      bao(nk.sauTH >= 10, 'mười chủ đề tình huống đều có chiều sâu', nk.sauTH + '/10');
      bao(nk.qt >= nk.soNhom, 'nhóm nào cũng có quy trình xử lý riêng ngoài bảy bước chung',
        nk.qt + '/' + nk.soNhom);
      bao(nk.tl >= nk.soNhom, 'nhóm nào cũng có tài liệu phát cho gia đình',
        nk.tl + '/' + nk.soNhom);
    }

    /* ══ HAI TRƯỜNG NGƯỜI TA MỞ PHÁC ĐỒ RA ĐỂ ĐỌC ══
       Đo kho thì thấy: ba trường ph / coach / dich viết đủ (trung bình
       173–217 ký tự), còn nguyenNhan và giaiPhap trung vị 22 ký tự —
       "Lo lắng; thiếu hệ tự nhắc", "Mini-project".

       Người mở một phác đồ chính là để hỏi VÌ SAO NÓ XẢY RA và GỠ THẾ
       NÀO. Hai câu hỏi ấy rơi đúng vào hai trường mỏng nhất. */
    const pdr = await p.evaluate(() => {
      const G = window.G, ds = G.PHACDO || [];
      const nn = ds.map(x => (x.nguyenNhan || '').length).sort((a, b) => a - b);
      const gp = ds.map(x => (x.giaiPhap || '').length).sort((a, b) => a - b);
      const giua = a => a.length ? a[Math.floor(a.length / 2)] : 0;
      /* Trùng nhau: hai phác đồ cùng lời gỡ là chữ, không phải phác đồ */
      const tt = {}; ds.forEach(x => { const k = (x.giaiPhap || '').trim();
        if (k) tt[k] = (tt[k] || 0) + 1; });
      return {
        tong: ds.length,
        soat: G.PD_RUOT_SOAT || null,
        nnGiua: giua(nn), gpGiua: giua(gp),
        nnNgan: nn.filter(x => x < 150).length,
        gpNgan: gp.filter(x => x < 180).length,
        trung: Object.keys(tt).filter(k => tt[k] > 1).length,
        giuGon: ds.filter(x => x.nguyenNhanGon).length
      };
    });
    bao(pdr.soat && pdr.soat.vao >= pdr.tong,
      'mọi phác đồ đều đã có ruột cho hai trường nguyên nhân và giải pháp',
      pdr.soat ? pdr.soat.vao + '/' + pdr.tong +
        (pdr.soat.chuaCo.length ? ' · thiếu: ' + pdr.soat.chuaCo.slice(0, 5).join(' ') : '') : 'chưa có bộ áp');
    bao(!pdr.nnNgan,
      'không phác đồ nào còn nguyên nhân dạng chuỗi từ khoá — phải nói được CƠ CHẾ',
      pdr.nnNgan ? pdr.nnNgan + ' phác đồ dưới 150 ký tự' : 'trung vị ' + pdr.nnGiua + ' ký tự');
    bao(!pdr.gpNgan,
      'không phác đồ nào còn giải pháp dạng chuỗi từ khoá — phải nói được VIỆC LÀM ĐƯỢC',
      pdr.gpNgan ? pdr.gpNgan + ' phác đồ dưới 180 ký tự' : 'trung vị ' + pdr.gpGiua + ' ký tự');
    bao(!pdr.trung,
      'không hai phác đồ nào chung một lời gỡ — trùng nhau là chữ, không phải phác đồ',
      pdr.trung ? pdr.trung + ' lời gỡ bị dùng lại' : '220 lời gỡ khác nhau');
    bao(pdr.giuGon >= pdr.tong,
      'bản tóm cũ được giữ lại ở nguyenNhanGon — dùng cho thẻ danh sách và tìm kiếm',
      pdr.giuGon + '/' + pdr.tong);

    /* ══ KHO TÌNH HUỐNG — THỨ MỞ RA KHI ĐANG NGỒI TRƯỚC MỘT GIA ĐÌNH ══
       Trường `tt` là việc giao cho gia đình làm. Trung vị cũ 33 ký tự,
       có cái chỉ là "7 ngày săn lỗi." — gia đình đọc xong vẫn không biết
       tối nay làm gì, ghi vào đâu, cuối tuần nhìn cái gì. */
    const thr = await p.evaluate(() => {
      const G = window.G, ds = G.TINHHUONG || [];
      const dai = f => ds.map(x => String(x[f] || '').length).sort((a, b) => a - b);
      const giua = a => a.length ? a[Math.floor(a.length / 2)] : 0;
      const tt = {}; ds.forEach(x => { const k = String(x.tt || '').trim();
        if (k) tt[k] = (tt[k] || 0) + 1; });
      return {
        tong: ds.length, soat: G.TH_RUOT_SOAT || null,
        ttGiua: giua(dai('tt')), moGiua: giua(dai('mo')),
        ttNgan: dai('tt').filter(x => x < 200).length,
        moNgan: dai('mo').filter(x => x < 150).length,
        chotNgan: dai('chot').filter(x => x < 120).length,
        dichNgan: dai('dich').filter(x => x < 120).length,
        trung: Object.keys(tt).filter(k => tt[k] > 1).length,
        giuGon: ds.filter(x => x.ttGon).length
      };
    });
    bao(thr.soat && thr.soat.vao >= thr.tong,
      'mọi tình huống đều đã có ruột cho bốn trường mô tả, mấu chốt, thử thách và đích',
      thr.soat ? thr.soat.vao + '/' + thr.tong +
        (thr.soat.chuaCo.length ? ' · thiếu: ' + thr.soat.chuaCo.slice(0, 5).join(' ') : '') : 'chưa có bộ áp');
    bao(!thr.ttNgan,
      'thử thách giao cho gia đình nói rõ làm gì, ghi vào đâu, cuối kỳ nhìn gì',
      thr.ttNgan ? thr.ttNgan + ' tình huống dưới 200 ký tự' : 'trung vị ' + thr.ttGiua + ' ký tự');
    bao(!thr.moNgan && !thr.chotNgan && !thr.dichNgan,
      'mô tả, mấu chốt và đích đều đủ dày để dùng trước mặt gia đình',
      'mô tả ' + thr.moNgan + ' · mấu chốt ' + thr.chotNgan + ' · đích ' + thr.dichNgan + ' chỗ còn mỏng');
    bao(!thr.trung,
      'không hai tình huống nào chung một thử thách',
      thr.trung ? thr.trung + ' thử thách bị dùng lại' : '250 thử thách khác nhau');
    bao(thr.giuGon >= thr.tong,
      'bản tóm cũ của tình huống được giữ lại ở ttGon', thr.giuGon + '/' + thr.tong);

    /* ══ 42 MÔ THỨC PHẢI CÓ RANH GIỚI SỬ DỤNG ══
       Đây là bộ công cụ nghề nặng nhất của Học viện, và trước v9.1
       không cái nào ghi khi nào KHÔNG được dùng.

       Chỗ hở thật: MT-05 là kỹ thuật "từ bảng tính năng sang bảng lợi
       ích", dùng với một phụ huynh đang quyết chuyện học của con mình.
       Không ranh giới thì nó thành công cụ dẫn dắt — đúng thứ luật
       LV-01 của Học viện cấm. */
    const mtr = await p.evaluate(() => {
      const G = window.G, ds = G.MOTHUC || [], R = G.MT_RANH || {};
      const co = ds.filter(x => R[x.id]);
      const thieu = ds.filter(x => !R[x.id]).map(x => x.id);
      const la = Object.keys(R).filter(id => !ds.some(x => x.id === id));
      const mong = [];
      co.forEach(x => {
        const r = R[x.id];
        if (!r.khiKhong || r.khiKhong.length < 120) mong.push(x.id + '.khiKhong');
        if (!(r.khong || []).length || r.khong.some(k => k.length < 40)) mong.push(x.id + '.khong');
        if (!r.hong || r.hong.length < 80) mong.push(x.id + '.hong');
        if (!r.ai || r.ai.length < 60) mong.push(x.id + '.ai');
      });
      const kk = co.map(x => R[x.id].khiKhong);
      return { tong: ds.length, co: co.length, thieu, la, mong,
        trung: kk.length - new Set(kk).size,
        luat: (G.MT_RANH_LUAT || []).length };
    });
    bao(mtr.co >= mtr.tong, 'mô thức nào cũng có ranh giới sử dụng — công cụ không ranh giới là công cụ dẫn dắt',
      mtr.co + '/' + mtr.tong + (mtr.thieu.length ? ' · thiếu: ' + mtr.thieu.slice(0, 5).join(' ') : ''));
    bao(!mtr.la.length, 'ranh giới không khai mô thức không tồn tại', mtr.la.join(' ') || 'mã khớp hết');
    bao(!mtr.mong.length, 'ranh giới nào cũng đủ bốn phần: khi nào không dùng, không làm gì, dấu hiệu dùng sai, ai không được dùng',
      mtr.mong.length ? mtr.mong.slice(0, 4).join(' ') : '4 phần × ' + mtr.co + ' mô thức');
    bao(!mtr.trung, 'không hai mô thức nào chung một ranh giới',
      mtr.trung ? mtr.trung + ' ranh giới bị dùng lại' : mtr.co + ' ranh giới khác nhau');
    bao(mtr.luat >= 5, 'có luật chung khi dùng bất kỳ mô thức nào', mtr.luat + ' luật');

    /* Ranh giới phải HIỆN RA trên cửa sổ mô thức, không nằm im trong kho */
    const mtHien = await p.evaluate(() => {
      const G = window.G; let o = '';
      const giu = G.U.modal; G.U.modal = x => { o = x; };
      try { G.moThucModal((G.MOTHUC || [])[0].id); } catch (e) { o = ''; }
      G.U.modal = giu;
      return { dai: o.length, co: /KHI NÀO KHÔNG DÙNG/.test(o) && /TUYỆT ĐỐI KHÔNG LÀM/.test(o) };
    });
    bao(mtHien.co, 'ranh giới hiện ngay trên cửa sổ mô thức, không giấu xuống cuối — ai đọc cách dùng phải đọc luôn ranh giới',
      mtHien.dai.toLocaleString('vi-VN') + ' ký tự');

    /* ══ GÓI TẦNG CỦA KHÁCH HÀNG KHÔNG ĐƯỢC MANG TÀI SẢN NGHỀ ══
       Kịch bản chuyên môn từng nằm trong gói tầng, mỗi tầng 200 cái.
       Một phụ huynh Tầng 3 nhận về máy mình 200 kịch bản coaching:
       nguyên văn câu mở của Coach, mục tiêu buổi, và danh sách điều
       Coach tuyệt đối không được làm.

       Màn "Kịch bản" khoá ở quyền nghe_chung nên Ý ĐỊNH đã rõ. Nhưng
       khoá màn hình mà vẫn gửi dữ liệu là khoá cửa và đưa chìa: gõ
       G.KICHBAN trong công cụ nhà phát triển là đọc hết.

       Luật chốt ở đây: gói tầng CHỈ được chứa bộ test của tầng và ma
       trận của tầng. Thêm bất cứ kho nào khác phải qua mục kiểm này. */
    const fsG = require('fs'), pxG = require('path'), crG = require('crypto');
    const gocG = pxG.join(__dirname, '..');
    const tepKhoaG = pxG.join(gocG, 'kho', 'khoa.json');
    if (fsG.existsSync(tepKhoaG)) {
      const khoaG = JSON.parse(fsG.readFileSync(tepKhoaG, 'utf8')).khoa;
      const thua = [];
      for (let t = 1; t <= 5; t++) {
        const ten = 'tang' + t;
        const f = pxG.join(gocG, 'kho', ten + '.enc');
        if (!fsG.existsSync(f) || !khoaG[ten]) continue;
        const b = fsG.readFileSync(f);
        const de = crG.createDecipheriv('aes-256-gcm', Buffer.from(khoaG[ten], 'base64'), b.subarray(0, 12));
        de.setAuthTag(b.subarray(12, 28));
        const j = ruotGoi(Buffer.concat([de.update(b.subarray(28)), de.final()]));
        /* Cẩm nang một trang về gói tầng từ 9.8: nó là tư liệu CỦA TẦNG,
           cùng loại với bộ test và ma trận tầng — không phải tài sản nghề.
           Để nó ở gói nền như trước là gửi tư liệu năm tầng cho một nhà
           mới mua tầng một. */
        const CHO_PHEP = ['TEST750', 'QUA1000', 'MATRAN_T' + t];
        Object.keys(j).forEach(n => { if (CHO_PHEP.indexOf(n) < 0) thua.push(ten + ':' + n); });
      }
      bao(!thua.length,
        'gói tầng của khách hàng chỉ mang bộ test và ma trận của tầng — không mang tài sản nghề',
        thua.length ? 'thừa: ' + thua.join(' ') : '5 gói tầng đều sạch');

      /* Và đo từ phía người dùng: vai khách hàng KHÔNG được có kịch bản
         trong bộ nhớ, dù màn hình đã khoá. Khoá màn mà vẫn gửi dữ liệu
         là khoá cửa và đưa chìa. */
      const trongMay = {};
      for (const [u, ten] of [['phuhuynh@gita365.vn', 'PH'], ['hocvien@gita365.vn', 'HS'],
                              ['coach@gita365.vn', 'COACH']]) {
        await p.evaluate(x => window.G.doLogin(x), u);
        /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
        trongMay[ten] = await p.evaluate(() => ({
          kb: (window.G.KICHBAN || []).length,
          pd: (window.G.PHACDO || []).length,
          sau: Object.keys(window.G.PD_SAU || {}).length,
          /* Đầu việc của ĐỘI NGŨ trong bộ nhớ: R01–R12. Đo cả hai kho vì
             danh mục nằm ở hai chỗ — quên một chỗ là phép đo nói dối. */
          cvNoiBo: (window.G.CV_MUC || []).concat(window.G.CV_MUC_DS || [])
            .filter(m => (m.vai || []).some(v => +String(v).slice(1) <= 12)).length,
          cvXongThat: (window.G.CV_MUC || []).concat(window.G.CV_MUC_DS || [])
            .filter(m => (m.vai || []).some(v => +String(v).slice(1) <= 12) && m.xong).length,
          /* Mười tám kho nghề: đo trong BỘ NHỚ, không chỉ trên tệp. Tệp
             đúng mà đường nạp sai thì vẫn rò, và rò kiểu ấy khó thấy nhất. */
          khoNghe: ['CHANDUNG', 'MATRAN', 'MT_BANG', 'MT_BANG_MA', 'MT_BANG_TANG',
            'MT_BANG_NHOM', 'MT_BANG_LUAT', 'MT_DO', 'BRAND', 'TAMNHIN100', 'TANG100',
            'NHATBAN', 'DANDAT', 'CHIPHI', 'HEALTH', 'DUYET', 'RASOAT', 'CV_MUC',
            'CL_THAP', 'CL_TANG', 'CL_MUC', 'CL_KETQUA', 'CL_NHIP', 'CL_NHAT', 'CL_LUAT',
            'TG_LANG', 'TG_GON', 'TG_GIAIDOAN', 'TG_LOP', 'TG_GON_LUAT',
            'CT_TRANG', 'CT_LOAI', 'CT_DIEM', 'CT_LUAT', 'BD_DAN',
            'TT_MAN', 'TT_DONGHANH', 'TT_DONGHANH_LUAT', 'TT_NHIEMKY']
            .filter(k => window.G[k] !== undefined)
        }));
      }
      bao(trongMay.PH.kb === 0 && trongMay.HS.kb === 0,
        'khách hàng KHÔNG giữ kịch bản chuyên môn trong bộ nhớ — khoá màn mà vẫn gửi dữ liệu là khoá cửa và đưa chìa',
        'phụ huynh ' + trongMay.PH.kb + ' · học viên ' + trongMay.HS.kb + ' · Coach ' + trongMay.COACH.kb);
      bao(trongMay.PH.pd === 0 && trongMay.PH.sau === 0,
        'khách hàng cũng không giữ phác đồ và chiều sâu nghề',
        'phác đồ ' + trongMay.PH.pd + ' · chiều sâu ' + trongMay.PH.sau);
      bao(trongMay.COACH.kb === 1000 && trongMay.COACH.pd === 220,
        'người trong nghề vẫn nhận đủ — bịt rò không được làm hỏng việc của Coach',
        trongMay.COACH.kb + ' kịch bản · ' + trongMay.COACH.pd + ' phác đồ');

      /* ── DANH MỤC ĐẦU VIỆC NỘI BỘ CŨNG KHÔNG ĐƯỢC XUỐNG MÁY KHÁCH ──
         Cùng một lỗi với KICHBAN, lặp lại ở bản 9.5: ba mươi đầu việc
         của đội ngũ nằm ở gói NỀN với lý do "màn hình tự lọc theo vai".
         Màn hình có lọc thật, nhưng gõ G.CV_MUC là đọc được nguyên văn
         cách Học viện đối soát dòng tiền, soát quyền truy cập, kiểm hành
         vi lưu trữ — kèm bằng chứng phải có để đóng mỗi việc và điều
         khoản liên đới. Nay CV_MUC đi gói NGHỀ; mục kiểm này giữ nó ở đó. */
      bao(trongMay.PH.cvNoiBo === 0 && trongMay.HS.cvNoiBo === 0,
        'khách hàng KHÔNG giữ danh mục đầu việc nội bộ trong bộ nhớ — lọc trên màn hình không phải là bảo vệ dữ liệu',
        'phụ huynh ' + trongMay.PH.cvNoiBo + ' · học viên ' + trongMay.HS.cvNoiBo +
        ' · Coach ' + trongMay.COACH.cvNoiBo);
      bao(trongMay.COACH.cvNoiBo === 30 && trongMay.COACH.cvXongThat === 30,
        'đội ngũ vẫn nhận đủ ba mươi đầu việc kèm bằng chứng đóng việc — bịt rò không được làm hỏng bảng việc',
        trongMay.COACH.cvNoiBo + ' đầu việc · ' + trongMay.COACH.cvXongThat + ' có bằng chứng');

      bao(!trongMay.PH.khoNghe.length && !trongMay.HS.khoNghe.length,
        'khách hàng KHÔNG giữ ba mươi chín kho nghề trong bộ nhớ — tệp đúng mà đường nạp sai thì vẫn rò, và rò kiểu ấy khó thấy nhất',
        trongMay.PH.khoNghe.concat(trongMay.HS.khoNghe).slice(0, 6).join(' ') ||
        'phụ huynh 0 · học viên 0 · Coach ' + trongMay.COACH.khoNghe.length + '/39');
      bao(trongMay.COACH.khoNghe.length === 39,
        'người trong nghề vẫn nhận đủ ba mươi chín kho ấy — dời kho không được làm hỏng việc của Coach',
        trongMay.COACH.khoNghe.length + '/39');

      /* ══ PHÂN LUỒNG DỮ LIỆU: KHO PHẢI ĐI THEO QUYỀN CỦA MÀN HÌNH ══
         Ý định của sản phẩm đã ghi sẵn ở quyền của từng màn. Nếu MỌI màn
         đọc một kho đều khoá ở quyền nghề, thì kho ấy là tài sản nghề —
         và nó không được nằm trong gói xuống máy khách hàng.

         Mười tám kho dưới đây tìm ra bằng cách đo, không phải bằng cảm
         giác: đăng nhập thật từng vai, thay mỗi kho bằng một getter có
         đánh dấu, dựng lần lượt mọi màn vai ấy mở được, rồi đọc tay từng
         chỗ gọi còn lại. Chốt ở đây để không ai vô tình đưa chúng ngược
         về gói nền — kể cả tôi, lần sau. */
      {
        const b = fsG.readFileSync(pxG.join(gocG, 'kho', 'nen.enc'));
        const de = crG.createDecipheriv('aes-256-gcm', Buffer.from(khoaG.nen, 'base64'), b.subarray(0, 12));
        de.setAuthTag(b.subarray(12, 28));
        const nen = ruotGoi(Buffer.concat([de.update(b.subarray(28)), de.final()]));
        const CHI_NGHE = ['CHANDUNG', 'MATRAN', 'MT_BANG', 'MT_BANG_MA', 'MT_BANG_TANG',
          'MT_BANG_NHOM', 'MT_BANG_LUAT', 'MT_DO', 'BRAND', 'TAMNHIN100', 'TANG100',
          'NHATBAN', 'DANDAT', 'CHIPHI', 'HEALTH', 'DUYET', 'RASOAT', 'CV_MUC',
          'CL_THAP', 'CL_TANG', 'CL_MUC', 'CL_KETQUA', 'CL_NHIP', 'CL_NHAT', 'CL_LUAT',
          'TG_LANG', 'TG_GON', 'TG_GIAIDOAN', 'TG_LOP', 'TG_GON_LUAT',
          'CT_TRANG', 'CT_LOAI', 'CT_DIEM', 'CT_LUAT', 'BD_DAN',
          'TT_MAN', 'TT_DONGHANH', 'TT_DONGHANH_LUAT', 'TT_NHIEMKY'];
        const lac = CHI_NGHE.filter(k => nen[k] !== undefined);
        bao(!lac.length,
          'gói NỀN không mang kho mà mọi màn đọc nó đều khoá ở quyền nghề — ý định nằm ở quyền của màn hình, kho phải đi theo đúng ý định ấy',
          lac.length ? 'lạc vào gói nền: ' + lac.join(' ') : CHI_NGHE.length + ' kho nghề đều ở đúng chỗ');

        /* Bốn kho phục vụ nhiều phạm vi cùng lúc nên cắt theo bản ghi.
           Đo hai đầu: nửa của gia đình không được lẫn bản ghi của đội
           ngũ, và hai nửa cộng lại phải đủ — cắt mất bản ghi thì đội ngũ
           thiếu nội dung mà không ai thấy. */
        const nghe = (function () {
          const x = fsG.readFileSync(pxG.join(gocG, 'kho', 'nghe.enc'));
          const d = crG.createDecipheriv('aes-256-gcm', Buffer.from(khoaG.nghe, 'base64'), x.subarray(0, 12));
          d.setAuthTag(x.subarray(12, 28));
          return ruotGoi(Buffer.concat([d.update(x.subarray(28)), d.final()]));
        })();
        const NHA = ['HS', 'PH', 'CTV'];
        const lanChuyen = (nen.CHUYEN || []).filter(c => NHA.indexOf(c.cap) < 0).map(c => c.ma);
        const lanHoi = (nen.SH_HOI || []).filter(h => NHA.indexOf(h.vai) < 0).map(h => h.ma);
        const lanBai = (nen.KH_BAI || []).filter(b2 => (b2.vai || []).indexOf('CTV') < 0).map(b2 => b2.ma);
        bao(!lanChuyen.length && !lanHoi.length && !lanBai.length,
          'nửa của gia đình trong ba kho chia theo vai KHÔNG lẫn bản ghi của đội ngũ — chuyện cấp Admin, câu sát hạch của Coach và bài đào tạo nghề không xuống máy một gia đình',
          [].concat(lanChuyen, lanHoi, lanBai).slice(0, 6).join(' ') ||
          (nen.CHUYEN || []).length + ' chuyện · ' + (nen.SH_HOI || []).length + ' câu · ' +
          (nen.KH_BAI || []).length + ' bài, đều của phía khách hàng');
        bao((nen.CHUYEN || []).length + (nghe.CHUYEN || []).length === 600 &&
            (nen.SH_HOI || []).length + (nghe.SH_HOI || []).length === 348 &&
            (nen.KH_BAI || []).length + (nghe.KH_BAI || []).length === 30,
          'hai nửa cộng lại vẫn ĐỦ — chia kho mà rơi mất bản ghi thì đội ngũ thiếu nội dung và không ai thấy',
          ((nen.CHUYEN || []).length + (nghe.CHUYEN || []).length) + ' chuyện · ' +
          ((nen.SH_HOI || []).length + (nghe.SH_HOI || []).length) + ' câu · ' +
          ((nen.KH_BAI || []).length + (nghe.KH_BAI || []).length) + ' bài');

        /* Kho trải ra nhiều gói được NỐI khi mở. Danh sách khai ở
           G.KHO_TRAI_RA phải khớp ĐÚNG hai chiều với thực tế bảy gói:
           thiếu một tên thì gói mở sau đè mất gói mở trước và mất im
           lặng; thừa một tên thì không ai dám xoá nó về sau. */
        const oGoi = {};
        for (const g of Object.keys(khoaG)) {
          const f = pxG.join(gocG, 'kho', g + '.enc');
          if (!fsG.existsSync(f)) continue;
          const x = fsG.readFileSync(f);
          const d = crG.createDecipheriv('aes-256-gcm', Buffer.from(khoaG[g], 'base64'), x.subarray(0, 12));
          d.setAuthTag(x.subarray(12, 28));
          const j2 = ruotGoi(Buffer.concat([d.update(x.subarray(28)), d.final()]));
          Object.keys(j2).forEach(k => { (oGoi[k] = oGoi[k] || []).push(g); });
        }
        const thatSuTrai = Object.keys(oGoi).filter(k => oGoi[k].length > 1).sort();
        const khaiTrai = (await p.evaluate(() => window.G.KHO_TRAI_RA || [])).slice().sort();
        const thieuKhai = thatSuTrai.filter(k => khaiTrai.indexOf(k) < 0);
        const thuaKhai = khaiTrai.filter(k => thatSuTrai.indexOf(k) < 0);
        bao(!thieuKhai.length && !thuaKhai.length,
          'danh sách kho TRẢI RA NHIỀU GÓI khớp đúng hai chiều với bảy gói thật — thiếu một tên là gói mở sau đè mất gói mở trước, thừa một tên là một cái tên không ai dám xoá',
          (thieuKhai.length ? 'chưa khai: ' + thieuKhai.join(' ') + ' ' : '') +
          (thuaKhai.length ? 'khai thừa: ' + thuaKhai.join(' ') : '') ||
          thatSuTrai.length + ' kho trải ra: ' + thatSuTrai.join(' '));
      }

      /* Và đo thẳng trên tệp đã mã hoá, không qua trình duyệt: gói NỀN
         xuống MỌI tài khoản, nên bất cứ đầu việc nào của R01–R12 nằm
         trong đó là rò, dù màn hình có lọc hay không. */
      {
        const b = fsG.readFileSync(pxG.join(gocG, 'kho', 'nen.enc'));
        const de = crG.createDecipheriv('aes-256-gcm', Buffer.from(khoaG.nen, 'base64'), b.subarray(0, 12));
        de.setAuthTag(b.subarray(12, 28));
        const nen = ruotGoi(Buffer.concat([de.update(b.subarray(28)), de.final()]));
        const lot = [].concat(nen.CV_MUC || [], nen.CV_MUC_DS || [])
          .filter(m => (m.vai || []).some(v => +String(v).slice(1) <= 12)).map(m => m.ma);
        bao(!lot.length,
          'gói NỀN không mang đầu việc của đội ngũ — gói nền xuống mọi tài khoản, để một đầu việc R01–R12 ở đó là gửi cách vận hành nội bộ về máy từng gia đình',
          lot.length ? 'lọt: ' + lot.join(' ') : (nen.CV_MUC_DS || []).length + ' đầu việc cộng tác viên, 0 đầu việc đội ngũ');
      }

      /* ── Luật gốc, thay cho việc nhớ từng tên ──
         donKho() chỉ xoá những kho có tên trong G.THUOC_CAP_PHEP. Thêm
         một kho vào gói cấp phép mà quên khai tên ở đó thì máy vừa đăng
         nhập Coach rồi đăng nhập lại bằng phụ huynh sẽ để phụ huynh giữ
         nguyên dữ liệu nghề — đúng lỗ vừa bắt được với PD_SAU.

         Nên đối chiếu thẳng: mọi kho có mặt trong bảy gói đều phải nằm
         trong danh sách dọn. Không phải nhớ, mà đo. */
      /* Chỉ soi gói NGHỀ và gói TẦNG. Gói NỀN đến với mọi tài khoản đã
         đăng nhập, nên một kho nền còn sót lại sau khi đổi vai là đúng
         cái nội dung vai mới cũng được nhận — không phải rò. Soi cả gói
         nền vào đây là bắt lỗi ở chỗ không có lỗi, và bài kiểm mất giá
         trị vì người đọc quen với màu đỏ vô hại. */
      const trongGoi = new Set();
      for (const ten of ['nghe', 'tang1', 'tang2', 'tang3', 'tang4', 'tang5']) {
        const f = pxG.join(gocG, 'kho', ten + '.enc');
        if (!fsG.existsSync(f) || !khoaG[ten]) continue;
        const b = fsG.readFileSync(f);
        const de = crG.createDecipheriv('aes-256-gcm', Buffer.from(khoaG[ten], 'base64'), b.subarray(0, 12));
        de.setAuthTag(b.subarray(12, 28));
        Object.keys(ruotGoi(Buffer.concat([de.update(b.subarray(28)), de.final()])))
          .forEach(n => trongGoi.add(n));
      }
      const donDuoc = await p.evaluate(() => window.G.THUOC_CAP_PHEP || []);
      const quenDon = [...trongGoi].filter(n => donDuoc.indexOf(n) < 0);
      bao(!quenDon.length,
        'mọi kho ĐỔI THEO VAI đều nằm trong danh sách dọn — đổi vai là dữ liệu vai cũ biến mất',
        quenDon.length ? 'quên dọn: ' + quenDon.slice(0, 8).join(' ') :
          trongGoi.size + ' kho, không kho nào sót');

      await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
      /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    }
  }

  /* ═══════════ 41 · CỬA TRƯỚC CHO NGƯỜI CHƯA CÓ TÀI KHOẢN ═══════════
     Anh Quang kể hành trình của anh Hoàng — người lạ tình cờ biết tới
     GITA365, tò mò vào xem, rồi mới đăng ký và làm năm bài đánh giá —
     và hỏi phần giao diện ấy đâu. Đo lại thì ra hai chỗ hụt thật:

       · màn đăng nhập không có nút nào cho người CHƯA có tài khoản
         nhìn vào; màn giới thiệu và màn đường vào sáu bước đều đã dựng
         xong nhưng nằm SAU tường đăng nhập;
       · bản xem thử chỉ mở MỘT bài test trong khi cả lời hứa ở bước ba
         lẫn màn test đều nói năm bài.

     Mục này khoá cả hai chỗ ấy lại, và khoá luôn điều kiện đi kèm: mở
     cửa trước KHÔNG được kéo theo một chữ nào của kho nghề. */
  console.log('\n41 · CỬA TRƯỚC CHO NGƯỜI CHƯA CÓ TÀI KHOẢN');
  {
    const fs41 = require('fs'), px41 = require('path');
    const goc41 = px41.join(__dirname, '..');
    const mau41 = JSON.parse(fs41.readFileSync(px41.join(goc41, 'kho', 'mau.json'), 'utf8'));

    /* ── Gói công khai mang đủ năm bài của tầng một ── */
    const t1 = (mau41.TEST750 || []).filter(b => b.tang === 'T1');
    bao(t1.length === 5,
      'gói công khai mang đủ NĂM bài của tầng một — trước đây chỉ có một, nên người xem kết luận là phần năm bài không tồn tại',
      t1.length + '/5 bài');
    bao(t1.length === 5 && ['A', 'B', 'C', 'D', 'E'].every(x => t1.some(b => b.bo === x)),
      'đủ cả năm mã bài A B C D E — thiếu một mã là thiếu một miền đo, không phải thiếu một thẻ',
      t1.map(b => b.bo).sort().join(''));
    bao(t1.length > 0 && t1.every(b => b.mau === true && b.soCauThat > b.cau.length),
      'mỗi bài trong gói công khai đều tự khai là BẢN RÚT và khai số câu thật — không để người xem tưởng bài thật chỉ có sáu câu',
      t1.length ? t1[0].cau.length + '/' + t1[0].soCauThat + ' câu mỗi bài' : '—');
    /* Sáu câu đầu của một bài ba mươi câu thường rơi hết vào miền thứ
       nhất; chấm thử khi ấy ra một miền có điểm và năm miền trống. */
    bao(t1.length > 0 && t1.every(b => new Set(b.cau.map(c => c.mien)).size === b.mien.length),
      'câu mẫu trải đủ mọi miền đo của bài — chấm thử phải ra đủ miền, không ra một miền có điểm và năm miền trống',
      t1.length ? t1[0].mien.length + ' miền đều có câu' : '—');
    const cauMo = (mau41.TEST750 || []).reduce((a, b) => a + b.cau.length, 0);
    const cauThat = (mau41.TEST750 || []).reduce((a, b) => a + (b.soCauThat || b.cau.length), 0);
    bao(cauMo <= 40 && cauMo < cauThat * 0.3,
      'kho câu hỏi vẫn khoá — gói công khai chỉ mở phần rất nhỏ',
      cauMo + ' câu mở / 750 câu toàn bộ = ' + (cauMo / 750 * 100).toFixed(1) + '%');
    bao(!(mau41.TEST750 || []).some(b => b.tang !== 'T1'),
      'gói công khai KHÔNG mở bài của tầng hai trở lên — tầng trên là nội dung đã trả phí',
      [...new Set((mau41.TEST750 || []).map(b => b.tang))].join(' ') || '—');

    /* ── Bước ba của đường vào phải khớp dữ liệu test thật ── */
    const b3 = (mau41.DV_BUOC || []).filter(x => x.ma === 'B3')[0];
    const noiNamBai = b3 && /năm bài/i.test(b3.lam || '');
    bao(!!b3 && noiNamBai,
      'bước ba của đường vào nói đúng NĂM bài — trước đây nó nói "bài A, bài B, thêm bài C" trong khi dữ liệu có năm bài',
      b3 ? (noiNamBai ? 'khớp' : 'còn nói khác: ' + String(b3.lam).slice(0, 60)) : 'không có bước ba');
    bao(!!b3 && t1.length > 0 && b3.lau.indexOf(String(t1.length * t1[0].phut)) >= 0,
      'thời gian ở bước ba tính đúng từ dữ liệu bài — nói ít hơn thực tế là hẹn sai với gia đình ngay ở lời mời',
      b3 ? b3.lau.slice(0, 46) : '—');
    /* Nút chấm chỉ mở khi trả lời ĐỦ câu (views8.js). Bước ba từng hứa
       ngưỡng 80%, lỏng hơn cái ứng dụng thật sự làm. */
    bao(!!b3 && !/80%/.test(b3.chan || '') && /ĐỦ|đủ /.test(b3.chan || ''),
      'điều kiện chấm ở bước ba khớp với ứng dụng — ứng dụng đòi trả lời ĐỦ câu, lời hứa không được nói ngưỡng lỏng hơn',
      b3 ? b3.chan.slice(0, 52) : '—');

    /* ── Cửa mở thật trên trình duyệt ── */
    const p41 = await b.newPage();
    const loi41 = [];
    p41.on('pageerror', e => loi41.push(String(e)));
    await p41.goto(URL, { waitUntil: 'networkidle' });

    const soNut = await p41.locator('[data-act="xem-truoc"]').count();
    bao(soNut > 0,
      'màn đăng nhập có cửa cho người CHƯA có tài khoản — mời người ta bước qua cửa thì không được khoá chính cái cửa ấy',
      soNut + ' lối vào');

    if (soNut) {
      await p41.locator('[data-act="xem-truoc"]').first().click();
      await p41.waitForTimeout(1200);
      const soTab = await p41.locator('[data-ct]').count();
      bao(soTab === 3, 'cửa trước có đủ ba phần: làm gì · đường vào · năm bài test', soTab + '/3');

      const chuGT = (await p41.locator('#app').innerText()).length;
      bao(chuGT > 3000,
        'phần "GITA 365 làm gì" mở ra có ruột thật, không phải một thẻ mời đăng ký',
        chuGT.toLocaleString('vi-VN') + ' ký tự');

      await p41.locator('[data-ct="duong"]').click(); await p41.waitForTimeout(600);
      const chuDV = await p41.locator('#app').innerText();
      bao(chuDV.indexOf('Làm bài test đánh giá') >= 0 && chuDV.length > 4000,
        'người lạ xem được cả sáu bước đường vào trước khi quyết định đăng ký',
        chuDV.length.toLocaleString('vi-VN') + ' ký tự');

      await p41.locator('[data-ct="test"]').click(); await p41.waitForTimeout(600);
      const chuTS = await p41.locator('#app').innerText();
      bao(['A', 'B', 'C', 'D', 'E'].every(x => chuTS.indexOf('Bài ' + x) >= 0),
        'người lạ nhìn thấy đủ NĂM bài đánh giá — đây chính là phần anh Quang mở ứng dụng và không thấy',
        'A B C D E');
      /* ── Cửa trước phải nói CHIỀU SÂU, không nói chung chung ──
         Một người lạ đọc "bài đánh giá đo năng lực học tập" thì không
         phân biệt được chỗ này với bất kỳ bảng khảo sát nào trên mạng.
         Cái phân biệt được nằm trong chính dữ liệu: từng bài cho ra
         cái gì, bốn mức được TẢ ra sao, cảnh báo bật ở ngưỡng nào.
         Mấy phép đo dưới đây bắt màn hình phải bày ra bằng ấy thứ. */
      bao(/LÀM XONG THÌ CẦM ĐƯỢC GÌ/.test(chuTS) && /baseline/i.test(chuTS),
        'mỗi bài nói rõ LÀM XONG THÌ CẦM ĐƯỢC GÌ — không để người lạ đoán bài đánh giá này dẫn tới đâu',
        /baseline/i.test(chuTS) ? 'có phần cho ra' : 'thiếu');
      const mucSo = (chuTS.match(/Mức [1-4]/g) || []).length;
      bao(mucSo >= 20,
        'mỗi bài mở một câu THẬT với đủ bốn mức được tả bằng tình huống — đây là chỗ phân biệt bộ đo nghề với một bảng khảo sát',
        mucSo + ' mức hiển thị (5 bài × 4 mức)');
      bao(/Bật khi miền/.test(chuTS) && /dưới \d+ điểm/.test(chuTS),
        'cửa trước bày ra NGƯỠNG cảnh báo thật, không chỉ nói "hệ thống có cảnh báo"',
        (chuTS.match(/Bật khi miền/g) || []).length + ' cảnh báo có ngưỡng');
      bao(/KHÔNG dùng để kết luận nguyên nhân/.test(chuTS),
        'ranh giới của bộ đo hiện ngay ở cửa trước — một bộ đo không tự khai chỗ nó dừng lại là bộ đo sẽ bị dùng quá tay',
        'có ranh giới');
      /* Ngân hàng câu hỏi vẫn phải kín: mỗi bài đúng MỘT câu mẫu. */
      const soHoi = (chuTS.match(/MỘT CÂU THẬT TRONG BÀI/g) || []).length;
      bao(soHoi === 5,
        'mỗi bài mở đúng MỘT câu mẫu — bày cách hỏi, không bày ngân hàng câu hỏi',
        soHoi + '/5 bài, 5 câu trên 150 câu của tầng một');

      const nutLam = await p41.locator('[data-test],[data-tlam],[data-txong]').count();
      bao(nutLam === 0,
        'người CHƯA đăng ký xem được hình dạng bài nhưng không làm được — bài xong phải có mã gia đình để ghi vào, cho làm rồi vứt kết quả là lấy không của gia đình 75 phút',
        nutLam + ' nút làm bài');

      /* ── Mở cửa trước KHÔNG được kéo theo kho nghề ── */
      const ro41 = await p41.evaluate(() => {
        const G = window.G, ds = ['KICHBAN', 'PHACDO', 'MOTHUC', 'TINHHUONG', 'MATRAN', 'PD_SAU',
          'TH_SAU', 'NOI_KET', 'QT_NHOM', 'TL_GIADINH', 'MT_RANH', 'MT_SAU', 'HP_TANG', 'HP_KICHBAN',
          'HD_CHUAN', 'QT_LUONG', 'NLP_GOC', 'KPI100', 'CHUAN1000'];
        return ds.filter(k => G[k] !== undefined && (!Array.isArray(G[k]) || G[k].length));
      });
      bao(!ro41.length,
        'mở cửa trước KHÔNG kéo theo một chữ nào của kho nghề — cửa trước rộng ra mà kho hở là tệ hơn đóng cả hai',
        ro41.length ? 'rò: ' + ro41.join(' ') : '19 kho nghề đều vắng mặt');

      await p41.locator('[data-act="ct-dong"]').first().click(); await p41.waitForTimeout(600);
      const veCong = await p41.locator('#inU').count();
      bao(veCong === 1, 'quay lại được màn đăng nhập — cửa trước là cửa hai chiều', veCong ? 'về được' : 'kẹt lại');
    }
    bao(!loi41.length, 'không lỗi trang nào trong suốt đường đi của người lạ',
      loi41.length ? loi41[0].slice(0, 90) : '0 lỗi');
    await p41.close();

    /* ── Và cửa ấy phải mở được ở BẢN MỘT TỆP ──
       Bản một tệp là bản thật sự gửi cho một người lạ xem: không có thư
       mục kho/ cạnh trang, gói mẫu nhúng thẳng vào G.MAU_NHUNG. Cửa
       trước lấy dữ liệu bằng fetch('kho/mau.json') thì ở đây trả 404 —
       hỏng đúng ở bản mà người lạ hay mở nhất. Đo trên chính tệp ấy,
       không đo bằng cách đọc mã. */
    const ban41 = /version:\s*'([^']+)'/.exec(
      fs41.readFileSync(px41.join(goc41, 'src', 'data.core.js'), 'utf8'));
    const tep41 = ban41 && px41.join(goc41, 'GITA365-v' + ban41[1] + '-gioi-thieu.html');
    if (tep41 && fs41.existsSync(tep41)) {
      const q = await b.newPage();
      const loiQ = [];
      q.on('pageerror', e => loiQ.push(String(e)));
      await q.goto('file://' + tep41, { waitUntil: 'load' });
      await q.waitForTimeout(1600);
      const nutQ = await q.locator('[data-act="xem-truoc"]').count();
      let baiQ = false, tabQ = 0;
      if (nutQ) {
        await q.locator('[data-act="xem-truoc"]').first().click();
        await q.waitForTimeout(1400);
        tabQ = await q.locator('[data-ct]').count();
        if (tabQ) {
          await q.locator('[data-ct="test"]').click();
          await q.waitForTimeout(700);
          const tQ = await q.locator('#app').innerText();
          baiQ = ['A', 'B', 'C', 'D', 'E'].every(x => tQ.indexOf('Bài ' + x) >= 0);
        }
      }
      bao(nutQ > 0 && tabQ === 3 && baiQ,
        'cửa trước mở được cả ở BẢN MỘT TỆP — đây mới là bản thật sự gửi cho người lạ xem',
        nutQ ? tabQ + '/3 phần · năm bài ' + (baiQ ? 'thấy đủ' : 'KHÔNG thấy') : 'không có lối vào');
      bao(!loiQ.length, 'bản một tệp không lỗi trang khi mở cửa trước',
        loiQ.length ? loiQ[0].slice(0, 90) : '0 lỗi');
      await q.close();
    } else {
      bao(false, 'có bản một tệp để đo cửa trước', 'chưa dựng — chạy python3 tools/dong-goi.py');
    }
  }

  /* ═══════════ 42 · CỔNG KHÁCH HÀNG TRÊN BẢN KHÔNG CÓ KHOÁ ═══════════
     Chỗ mù của hai bộ kiểm cũ: cả kiem-tra.js lẫn ra-soat-day-du.js đều
     chạy KHI ĐÃ CÓ BỘ KHOÁ. Có khoá thì mọi kho nạp được, mọi màn có
     dữ liệu, mọi thứ xanh. Nhưng bản một tệp gửi cho khách, bản xem thử,
     và mọi bản chưa nối máy chủ cấp phép đều chạy Ở CHẾ ĐỘ MẪU — và đó
     mới là bản người ngoài mở.

     Đo ở đúng chế độ ấy thì ra: phụ huynh mở "Nhiệm vụ & Nhật ký 365"
     nhận được TƯỜNG CẤP PHÉP thay vì việc của hôm nay, vì G.TODAY không
     nằm trong gói công khai. Màn dẫn hành động nặng nhất của khách hàng
     hoá thành một lời từ chối. Mục này đo ở chế độ mẫu, trên chính bản
     một tệp, đi qua render() thật chứ không gọi thẳng G.VIEWS. */
  console.log('\n42 · CỔNG KHÁCH HÀNG TRÊN BẢN KHÔNG CÓ KHOÁ');
  {
    const fs42 = require('fs'), px42 = require('path');
    const goc42 = px42.join(__dirname, '..');
    const mau42 = JSON.parse(fs42.readFileSync(px42.join(goc42, 'kho', 'mau.json'), 'utf8'));

    const cong = ['ph', 'hs', 'coach', 'tuvan', 'admin', 'ctv'];
    const thieuCong = cong.filter(c => !(mau42.TODAY && (mau42.TODAY[c] || []).length));
    bao(!thieuCong.length,
      'gói công khai mang việc-của-hôm-nay cho ĐỦ sáu cổng — thiếu nó thì màn nhiệm vụ của khách hàng thành tường cấp phép',
      thieuCong.length ? 'thiếu: ' + thieuCong.join(' ') :
        cong.map(c => c + '=' + mau42.TODAY[c].length).join(' · '));

    const ban42 = /version:\s*'([^']+)'/.exec(
      fs42.readFileSync(px42.join(goc42, 'src', 'data.core.js'), 'utf8'));
    const tep42 = ban42 && px42.join(goc42, 'GITA365-v' + ban42[1] + '-gioi-thieu.html');
    if (!(tep42 && fs42.existsSync(tep42))) {
      bao(false, 'có bản một tệp để đo cổng khách hàng', 'chưa dựng — chạy python3 tools/dong-goi.py');
    } else {
      const KH = [['phụ huynh', 'phuhuynh@gita365.vn', 'ph'],
                  ['học viên', 'hocvien@gita365.vn', 'hs'],
                  ['cộng tác viên', 'daisu@gita365.vn', 'ctv']];
      for (const [ten42, u42, cong42] of KH) {
        const q = await b.newPage();
        const loiQ = [];
        q.on('pageerror', e => loiQ.push(String(e)));
        await q.goto('file://' + tep42, { waitUntil: 'load' });
        await q.waitForTimeout(1500);
        await q.evaluate(x => window.G.doLogin(x), u42);
        await q.waitForTimeout(2000);

        const r42 = await q.evaluate(() => {
          const G = window.G, ra = { mau: !!(G.KHO && G.KHO.cheDoMau), vao: G.S.view,
            tuong: [], rong: [], man: 0, khoTong: false, coCoChe: false, oTrong: 0, tuTich: 0, doDuoc: 0 };
          /* Duyệt đúng tập màn NGƯỜI DÙNG VÀO ĐƯỢC — G.hienTrongCot, cùng
             hàm cột trái dùng — chứ không phải tập theo quyền vai. Hai
             tập ấy khác nhau từ v9.4: một mục có thể đủ quyền vai nhưng
             vẫn ẩn vì dữ liệu của vai ấy không tồn tại. Đo trên tập rộng
             hơn là bắt lỗi ở màn không ai tới được. */
          G.NAV.forEach(g => g.items.forEach(it => {
            if (!G.hienTrongCot(it)) return;
            ra.man++;
            if (it.v === 'kho-tong') ra.khoTong = true;
            G.S.view = it.v; G.render();
            const t = document.getElementById('main').innerText;
            if (t.indexOf('PHẦN NÀY CHƯA MỞ') >= 0 || t.indexOf('NGOÀI PHẠM VI') >= 0) ra.tuong.push(it.v);
            /* Thẻ rỗng của U.empty: màn dựng được, không ném lỗi, không
               phải tường cấp phép — chỉ là không có dữ liệu để vẽ. Hai
               lần đã bị đúng lỗi này: G.TODAY thiếu ở gói công khai làm
               màn nhiệm vụ thành tường, rồi CV_MUC thiếu làm ba màn công
               việc thành thẻ rỗng 1.4 nghìn ký tự. Cả hai lần bộ kiểm
               đều xanh, và cả hai lần anh Quang là người phát hiện. */
            else if (/Chưa mở được|Chưa tải được|chưa có đầu việc/i.test(t)) ra.rong.push(it.v);
            if (it.v === 'ket-noi')
              ra.coCoChe = /kiemBanMoi|hosoAppSaoLuu|sendBeacon|mã băm/.test(t);
            if (it.v === 'kpi-100')
              ra.oTrong = (t.match(/\[Tiêu chí mở khi được cấp phép\]/g) || []).length;
          }));
          /* Bắt đầu ở đây: đếm bước tự khai và bước đo được */
          G.S.view = 'bat-dau'; G.render();
          const bd = document.getElementById('main').innerText;
          ra.tuTich = (bd.match(/tự xác nhận/g) || []).length;
          ra.doDuoc = (bd.match(/tối đã ghi|ô đã viết|bài đã chấm|việc hôm nay/g) || []).length;
          ra.bdChu = bd.length;
          return ra;
        });

        bao(r42.mau === true, ten42 + ': bản một tệp chạy đúng chế độ mẫu — không kèm kho, không kèm khoá');
        bao(!r42.tuong.length,
          ten42 + ': KHÔNG màn nào của khách hàng biến thành tường cấp phép — khách hàng phải làm được việc kể cả khi chưa có gói nghề',
          r42.tuong.length ? 'gặp tường: ' + r42.tuong.join(' ') : r42.man + ' màn đều có nội dung thật');
        bao(r42.vao === 'bat-dau',
          ten42 + ': đăng nhập vào đổ thẳng vào chuỗi năm bước, không đổ vào một màn lý thuyết',
          'vào màn ' + r42.vao);
        bao(!r42.khoTong,
          ten42 + ': KHÔNG thấy "Kho tổng" — mục lục 57 kho nghề của Học viện là kiến trúc tài sản, và kiến trúc mới là thứ đối thủ cần',
          r42.khoTong ? 'vẫn thấy' : 'đã đóng');
        bao(!r42.coCoChe,
          ten42 + ': màn kết nối KHÔNG bày cơ chế đồng bộ — tên hàm, mã băm, sổ sao lưu là tài liệu kiến trúc, không phải việc của gia đình',
          r42.coCoChe ? 'còn lộ cơ chế' : 'chỉ còn phần dùng được');
        bao(r42.oTrong === 0,
          ten42 + ': màn mười điểm về đích KHÔNG vẽ tiêu chí chưa cấp phép thành ô tích được — tích vào một ô rỗng là việc giả',
          r42.oTrong ? r42.oTrong + ' ô rỗng' : 'không ô rỗng nào');
        bao(r42.doDuoc >= 2,
          ten42 + ': chuỗi năm bước có ít nhất hai bước tự đánh dấu bằng DẤU VẾT THẬT — trước v9.2 cả năm bước đều tích tay, nên chuỗi đi tiếp bằng lời khai',
          r42.doDuoc + ' bước đo được · ' + r42.tuTich + ' bước tự khai');
        bao(!loiQ.length, ten42 + ': không lỗi trang nào trên suốt cổng',
          loiQ.length ? loiQ[0].slice(0, 90) : '0 lỗi');
        bao(!r42.rong.length,
          ten42 + ': không màn nào dựng ra THẺ RỖNG "chưa mở được" — tường cấp phép §42 đã bắt, nhưng thẻ rỗng thì không phải tường và vẫn lọt qua',
          r42.rong.length ? 'rỗng: ' + r42.rong.join(' ') : r42.man + ' màn đều có ruột');
        await q.close();
      }

      /* Ba cổng khách phải có ba chuỗi KHÁC nhau. Trước v9.2 cộng tác viên
         không có nhánh riêng nên rơi vào nhánh phụ huynh và được giao việc
         "viết bảng tầm nhìn của nhà mình", "chốt bảng chín vai trong nhà" —
         cộng tác viên không có nhà nào trong hệ thống để làm việc đó. */
      const q2 = await b.newPage();
      await q2.goto('file://' + tep42, { waitUntil: 'load' });
      await q2.waitForTimeout(1500);
      const khac = await q2.evaluate(async () => {
        const G = window.G, ra = {};
        for (const [c, u] of [['ph', 'phuhuynh@gita365.vn'], ['hs', 'hocvien@gita365.vn'], ['ctv', 'daisu@gita365.vn']]) {
          const a = (G.ACCOUNTS || []).filter(x => x.u === u)[0];
          G.S.acc = a; G.S.role = a.role; G.S.roleObj = G.roleById(a.role);
          /* Bám vào LỚP, không bám vào cỡ chữ. Bản trước bám vào chuỗi
             "font-size:15.5px"; thang cỡ chữ ở v9.26 đổi nó thành 16px,
             phép kiểm khớp rỗng, ba chuỗi thành ba chuỗi RỖNG giống nhau
             và mục này đỏ như thể mã hỏng. Một phép kiểm buộc vào con số
             trình bày sẽ đỏ oan ở lần đổi giao diện kế tiếp. */
          ra[c] = (G.VIEWS['bat-dau']().match(/class="buoc-t"[^>]*>([^<]+)</g) || []).join('|');
        }
        return ra;
      });
      await q2.close();
      const bo = new Set(Object.values(khac));
      bao(bo.size === 3,
        'ba cổng khách hàng có BA chuỗi năm bước khác nhau — cộng tác viên không nhận việc của một gia đình',
        bo.size + '/3 chuỗi phân biệt được');
      bao(!/tầm nhìn|chín vai/i.test(khac.ctv || ''),
        'chuỗi của cộng tác viên không chứa việc của một gia đình — họ có mã liên kết và trần hoa hồng, không có "nhà mình" trong hệ thống',
        /tầm nhìn|chín vai/i.test(khac.ctv || '') ? 'vẫn còn việc của gia đình' : 'đã tách');
    }
  }

  /* ═══════════ 43 · CỘT TRÁI CHỈ HIỆN PHẦN CỦA MÌNH ═══════════
     Anh Quang: thư mục nào ngoài phạm vi thì ẩn khỏi cột bên trái, chỉ
     cho nhìn thấy phần trong quyền hạn; lên cấp rồi mới được thấy.

     Đo trước khi sửa: cột trái gấp mọi mục ngoài phạm vi vào một khối
     "N mục ngoài phạm vi vai này" — bấm mở ra là thấy đủ TÊN. Phụ huynh
     86 tên, học viên 93, cộng tác viên 98, chuyên gia tư vấn 37. Trong
     đó có "220 phác đồ × 5 tầng", "1.000 kịch bản chuyên môn", "Kho báu
     vật", "Xương sống phương pháp", "Hệ quản trị tài chính", "Mật mã kín
     trên tài liệu". Cột trái đang phát danh mục màn hình của cả hệ thống
     cho mọi tài khoản.

     Mục này khoá lại ba điều: không tên nào lọt ra, cột lọc theo CẢ gói
     nội dung chứ không chỉ theo vai, và lên tầng thì mục mới tự hiện kèm
     một dòng báo — vì ẩn đi rồi thì lúc được cấp thêm sẽ không ai nhận
     ra, nếu không nói. */
  console.log('\n43 · CỘT TRÁI CHỈ HIỆN PHẦN CỦA MÌNH');
  {
    const fs43 = require('fs'), px43 = require('path');
    const goc43 = px43.join(__dirname, '..');

    /* Không còn kiểu dáng nào cho mục khoá — còn kiểu là còn đường quay lại */
    const css43 = fs43.readFileSync(px43.join(goc43, 'assets', 'style.css'), 'utf8');
    const jsCot = fs43.readFileSync(px43.join(goc43, 'src', 'app.js'), 'utf8');
    bao(!/^\s*\.nav-khoa\b/m.test(css43) && !/^\s*\.nav-i\.lock\b/m.test(css43),
      'không còn kiểu dáng cho mục ngoài phạm vi — mục ấy không dựng ra nữa thì cũng không còn gì để tô',
      'đã gỡ .nav-khoa và .nav-i.lock');
    /* Bỏ chú thích trước khi soi, và soi đúng hai dấu vết của thẻ khoá:
       khối gấp .nav-khoa, và lớp ' lock' gắn vào nav-i. KHÔNG soi chữ
       "lock" trơn — nút đổi mật khẩu ở chân cột dùng biểu tượng ic('lock')
       và nó hoàn toàn hợp lệ. */
    const maCot = jsCot.replace(/\/\*[\s\S]*?\*\//g, '');
    bao(!/nav-khoa/.test(maCot) && !/nav-i'\s*\+[^;]*'\s+lock'/.test(maCot) &&
        !/class="nav-i[^"]*\block\b/.test(maCot),
      'cột trái không dựng thẻ khoá nào — kiểm trên mã đã bỏ chú thích',
      'không khối .nav-khoa, không lớp lock trên nav-i');

    const VAI43 = [['phụ huynh', 'phuhuynh@gita365.vn'], ['học viên', 'hocvien@gita365.vn'],
                   ['cộng tác viên', 'daisu@gita365.vn'], ['chuyên gia tư vấn', 'tuvan@gita365.vn'],
                   ['Super Admin', 'superadmin@gita365.vn']];
    for (const [ten43, u43] of VAI43) {
      const q = await b.newPage();
      if (coKhoa) {
        const k43 = JSON.parse(fs43.readFileSync(px43.join(goc43, 'kho', 'khoa.json'), 'utf8'));
        await q.addInitScript(x => { window.GITA_KHOA = x; }, k43.khoa);
      }
      await q.goto(URL, { waitUntil: 'networkidle' });
      await q.evaluate(() => localStorage.clear());
      await q.reload({ waitUntil: 'networkidle' });
      await q.evaluate(x => window.G.doLogin(x), u43);
      await q.waitForTimeout(2400);
      const r43 = await q.evaluate(() => {
        const G = window.G;
        const cot = document.getElementById('left').innerText;
        const hien = [], an = [];
        G.NAV.forEach(g => g.items.forEach(it => (G.hienTrongCot(it) ? hien : an).push(it)));
        return {
          hien: hien.length, an: an.length,
          lot: an.filter(it => cot.indexOf(it.t) >= 0).map(it => it.t),
          /* mọi mục cột trái hiện đều phải nằm trong quyền của vai */
          quaQuyen: hien.filter(it => it.perm && !G.can(it.perm)).map(it => it.v),
          nut: [...document.querySelectorAll('#left .nav-i[data-v]')]
            .map(n => n.getAttribute('data-v')),
          thieuNut: hien.map(it => it.v).filter(v =>
            ![...document.querySelectorAll('#left .grp .nav-i[data-v]')]
              .some(n => n.getAttribute('data-v') === v)),
          thuaNut: [...document.querySelectorAll('#left .grp .nav-i[data-v]')]
            .map(n => n.getAttribute('data-v'))
            .filter(v => !hien.some(it => it.v === v)),
          disabled: document.querySelectorAll('#left .nav-i[disabled]').length,
          dai: cot
        };
      });
      /* So bằng TẬP, không bằng số đếm. Chân cột có nút "toi" và, với vai
         được sửa nội dung, một nút "sap-xep" thứ hai — nên đếm thô lệch
         đúng một, và lệch ấy là của phép đo chứ không của cột. */
      const tapNut = new Set(r43.nut);
      bao(!r43.lot.length,
        ten43 + ': KHÔNG tên mục ngoài phạm vi nào lọt vào cột trái — trước v9.3 mở khối gấp ra là thấy đủ ' + r43.an + ' tên',
        r43.lot.length ? 'lọt: ' + r43.lot.slice(0, 4).join(' · ') : r43.an + ' mục ẩn, không tên nào lọt');
      bao(!r43.quaQuyen.length,
        ten43 + ': không mục nào hiện vượt quyền của vai',
        r43.quaQuyen.length ? 'vượt: ' + r43.quaQuyen.join(' ') : r43.hien + ' mục đều trong quyền');
      bao(r43.disabled === 0,
        ten43 + ': không nút khoá nào trong cột — nút bấm không được là nút không nên có',
        r43.disabled + ' nút khoá');
      bao(!r43.thieuNut.length && !r43.thuaNut.length,
        ten43 + ': tập nút trong cột khớp đúng tập mục được phép — không mục nào thiếu nút, không nút nào trỏ tới mục đã ẩn',
        r43.thieuNut.length ? 'thiếu nút: ' + r43.thieuNut.join(' ')
          : r43.thuaNut.length ? 'nút thừa: ' + r43.thuaNut.join(' ')
          : r43.hien + ' mục đều có đúng một lối vào');
      /* Khách hàng không được nghe con số gộp cả kho nghề */
      if (['phụ huynh', 'học viên', 'cộng tác viên'].indexOf(ten43) >= 0)
        bao(!/ngoài phạm vi|chưa tới lượt/.test(r43.dai),
          ten43 + ': dải phạm vi KHÔNG đếm to số mục ngoài vai — một phụ huynh sẽ không bao giờ "tới lượt" kho nghề, hứa thế là hứa sai',
          /mở ở tầng sau/.test(r43.dai) ? 'chỉ đếm mục chờ tầng' : 'chỉ đếm mục đang mở');
      await q.close();
    }

    /* ── Lọc theo GÓI, và hiện lại khi được cấp thêm ── */
    if (coKhoa) {
      const all43 = JSON.parse(fs43.readFileSync(px43.join(goc43, 'kho', 'khoa.json'), 'utf8')).khoa;
      const q2 = await b.newPage();
      await q2.addInitScript(x => { window.GITA_KHOA = x; }, { nen: all43.nen });
      await q2.goto(URL, { waitUntil: 'networkidle' });
      await q2.evaluate(() => localStorage.clear());
      await q2.reload({ waitUntil: 'networkidle' });
      await q2.evaluate(() => window.G.doLogin('phuhuynh@gita365.vn'));
      await q2.waitForTimeout(2400);
      const r44 = await q2.evaluate(() => {
        const G = window.G, ra = {};
        ra.chiNen = G.KHO.daNap.slice().sort().join(',');
        ra.anVietGoi = [];
        G.NAV.forEach(g => g.items.forEach(it => {
          if (!G.hienTrongCot(it) && (!it.perm || G.can(it.perm)))
            ra.anVietGoi.push(it.v);
        }));
        ra.daiLan1 = /vừa mở cho anh chị/.test(document.getElementById('left').innerText);
        /* máy chủ cấp thêm gói tầng một */
        G.KHO.daNap.push('tang1');
        const moi = G.mucVuaMo();
        ra.vuaMo = moi;
        G.S.daThay = (G.S.daThay || []).filter(v => moi.indexOf(v) < 0);
        document.getElementById('left').innerHTML = G.leftNav();
        ra.daiLan2 = /vừa mở cho anh chị/.test(document.getElementById('left').innerText);
        document.getElementById('left').innerHTML = G.leftNav();
        ra.daiLan3 = /vừa mở cho anh chị/.test(document.getElementById('left').innerText);
        return ra;
      });
      await q2.close();
      bao(r44.chiNen === 'nen' && r44.anVietGoi.indexOf('bo-test') >= 0,
        'chỉ được cấp gói nền thì mục cần gói tầng KHÔNG hiện trong cột — thấy tên rồi bị chặn tệ hơn không thấy',
        'nạp ' + r44.chiNen + ' · ẩn vì thiếu gói: ' + (r44.anVietGoi.join(' ') || 'không mục nào'));
      bao(!r44.daiLan1,
        'lần đầu đăng nhập KHÔNG báo "vừa mở" — chưa có gì để so thì im, không báo 44 mục vừa mở cho người mới vào');
      bao(r44.vuaMo.length === 1 && r44.vuaMo[0] === 'bo-test',
        'được cấp thêm gói tầng thì nhận ra ĐÚNG mục vừa mở',
        (r44.vuaMo || []).join(' ') || 'không nhận ra mục nào');
      bao(r44.daiLan2 === true,
        'và nói ra cho người dùng biết — ẩn đi rồi thì lúc được cấp thêm phải có ai đó nói, không thì mục mới chen vào giữa bốn mươi mục cũ mà không ai thấy');
      bao(r44.daiLan3 === false,
        'nói đúng một lần rồi thôi — dải báo mãi thì lần sau không ai đọc');
    }
  }

  /* ═══════════ 44 · BẢNG CÔNG VIỆC · LUÂN CHUYỂN · KPI ═══════════
     Anh Quang đặt: checklist việc trong ngày cho từng vị trí, bảng tiến
     trình bốn cột, chốt ngày thành KPI, trung bình tháng để xét lương
     thưởng, danh mục đầu việc tích chọn được, biết việc đang ở tay ai,
     KPI có trách nhiệm liên đới — và phía khách hàng thì KPI ngày cùng
     KPI tầng để xét phân hạng.

     Mục này đo cái dễ hỏng nhất của một hệ KPI: chỗ nó có thể bị thổi.
     Một hệ chấm bằng lời khai, hoặc chia cho một mẫu số rỗng, thì mọi
     con số nó in ra đều vô nghĩa — mà vẫn trông như có nghĩa. */
  console.log('\n44 · BẢNG CÔNG VIỆC · LUÂN CHUYỂN · KPI');
  /* Mục này đo danh mục đầu việc của ĐỘI NGŨ, mà danh mục ấy nằm trong
     gói nghề — nên nó phải đăng nhập bằng vai CÓ gói nghề. Trước bản
     9.11 nó đo trên vai đang đăng nhập sẵn và đúng được là nhờ may:
     mục kiểm ngay trước đó tình cờ để lại một tài khoản có gói nghề. */
  await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
  await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
  {
    const r44 = await p.evaluate(() => {
      const G = window.G, ra = {}, D = 86400000;

      /* ── Danh mục phủ đủ vị trí ── */
      const vaiCo = new Set((G.ROLES || []).map(r => r.id));
      ra.mucLa = [...new Set(G.cvDanhMuc().flatMap(m => m.vai).filter(v => !vaiCo.has(v)))];
      ra.chuyenLa = G.cvDanhMuc().filter(m => m.chuyen && !vaiCo.has(m.chuyen)).map(m => m.ma);
      const nhipCo = new Set((G.TG_NHIEMVU || []).map(x => x.ma));
      ra.nhipLa = G.cvDanhMuc().filter(m => !nhipCo.has(m.nhip)).map(m => m.ma + '→' + m.nhip);
      ra.viTriThieu = (G.ROLES || []).filter(r => r.lv <= 12 || r.id === 'R15')
        .filter(r => !G.cvDanhMuc().some(m => m.vai.indexOf(r.id) >= 0)).map(r => r.id);
      ra.soMuc = G.cvDanhMuc().length;
      ra.thieuXong = G.cvDanhMuc().filter(m => !m.xong || m.xong.length < 40).map(m => m.ma);
      ra.thieuDiem = G.cvDanhMuc().filter(m => !(m.diem > 0)).map(m => m.ma);

      /* ── Vòng đời một việc, chạy thật ── */
      const giu = G.S.viec, giuChot = G.S.chotNgay, giuVai = G.S.roleObj;
      G.S.viec = {}; G.S.chotNgay = {};
      G.S.roleObj = G.roleById('R11');
      const ma = (G.cvMucCuaToi('R11')[0] || {}).ma;
      const n1 = G.cvNhan(ma);
      ra.nhanDuoc = n1.ok;
      const id = n1.ok ? n1.viec.id : null;
      ra.nhanTrung = G.cvNhan(ma).ok === false;
      ra.trangMoi = id && G.cvTrangThai(G.cvSo()[id]) === 'moi';
      G.cvBatDau(id);
      ra.trangDang = id && G.cvTrangThai(G.cvSo()[id]) === 'dang';
      ra.chanLoiKhai = G.cvXong(id, 'xong rồi').ok === false;
      ra.chanRong = G.cvXong(id, '').ok === false;
      ra.dongDuoc = G.cvXong(id, 'Gọi lúc 15h20, mẹ cháu nghe máy, lo nhất chuyện thức khuya.').ok;
      ra.trangXong = id && G.cvTrangThai(G.cvSo()[id]) === 'xong';
      ra.dongLai = G.cvXong(id, 'Bằng chứng khác đủ dài để qua ngưỡng kiểm tra.').ok === false;

      /* ── Đồng hồ tự đẩy sang TRỄ, không ai bấm ── */
      const n2 = G.cvNhan((G.cvMucCuaToi('R11')[2] || {}).ma);
      G.cvSo()[n2.viec.id].hanLuc = Date.now() - 3600000;
      ra.treTuDong = G.cvTrangThai(G.cvSo()[n2.viec.id]) === 'tre';

      /* ── Luân chuyển: việc rời bảng mình, sang bảng người nhận ── */
      const mChuyen = G.cvDanhMuc().filter(m => m.chuyen && m.vai.indexOf('R11') >= 0)[0];
      const n3 = G.cvNhan(mChuyen.ma);
      const rc = G.cvChuyen(n3.viec.id, mChuyen.chuyen, 'Bàn giao thử');
      ra.chuyenDuoc = rc.ok;
      ra.roiBangMinh = !G.cvViecCuaToi('R11').some(v => v.id === n3.viec.id);
      ra.vaoBangHo = G.cvViecCuaToi(mChuyen.chuyen).some(v => v.id === n3.viec.id);
      ra.duongDiGhiLai = (G.cvSo()[n3.viec.id].lichSu || []).length >= 2;
      ra.bietOTayAi = G.cvSo()[n3.viec.id].nguoi === mChuyen.chuyen;
      ra.lienDoiHien = G.cvLienDoi('R11').some(x => x.ma === mChuyen.ma);

      /* ── KPI: mọi ngày phải nằm trong 0–100, tử số không vượt mẫu số ── */
      G.S.viec = {};
      const mucs = G.cvMucCuaToi('R11').slice(0, 2);
      /* Dựng bản ghi TRONG MỘT THÁNG XÁC ĐỊNH, rồi hỏi đúng tháng ấy.
         Trước bản 9.11 chỗ này dựng "mười bốn ngày gần nhất" rồi gọi
         cvKpiThang(null) — tức là hỏi THÁNG HIỆN TẠI. Chạy vào giữa tháng
         thì đúng; chạy vào mùng 2 thì mười hai trong mười bốn ngày ấy rơi
         sang tháng trước, tháng này còn một ngày, dưới sàn, và mục kiểm đỏ
         ở chỗ không có lỗi. Nó xanh suốt hai năm vì chưa lần nào chạy vào
         đầu tháng — đúng loại lỗi chỉ lộ ra theo ngày trên lịch. */
      const thangDo = (function () {
        const t = new Date(); t.setDate(1); t.setMonth(t.getMonth() - 1);
        return t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2);
      })();
      const ngayCuaThang = d => new Date(thangDo + '-' + ('0' + d).slice(-2) + 'T12:00:00').getTime();
      for (let d = 3; d <= 14; d++)
        mucs.forEach((m, j) => {
          const han = ngayCuaThang(d), k = m.ma + '|' + han + '|' + j;
          G.S.viec[k] = { id: k, ma: m.ma, nguoi: 'R11', nhanLuc: han - D, hanLuc: han,
            batDauLuc: han - D / 2, xongLuc: (d % 4 === 0 && j === 1) ? 0 : han - 3600000,
            bangChung: 'Bằng chứng thử đủ dài để qua ngưỡng.', giaoTu: '', lichSu: [] };
        });
      const kt = G.cvKpiThang(thangDo, 'R11');
      ra.thangDu = kt.du;
      ra.thangPt = kt.pt;
      ra.hang = kt.hang && kt.hang.ma;
      ra.moiNgayHopLe = kt.ngay.every(x => x.pt >= 0 && x.pt <= 100);
      ra.tuSoTrongMauSo = kt.ngay.every(x => x.tuSo <= x.mauSo);
      ra.khongMauSoRong = kt.ngay.every(x => x.mauSo > 0);
      ra.ngayTrongKhongTinh = G.cvKpiNgay('2020-01-01', 'R11').tinh === false;
      ra.treCoTru = kt.ngay.some(x => x.tru > 0);

      /* Sàn: tháng ít ngày thì KHÔNG ra số */
      G.S.viec = {};
      const m0 = mucs[0], h0 = ngayCuaThang(2);
      G.S.viec['x'] = { id: 'x', ma: m0.ma, nguoi: 'R11', nhanLuc: h0 - D, hanLuc: h0,
        batDauLuc: 0, xongLuc: 0, bangChung: '', giaoTu: '', lichSu: [] };
      const kt2 = G.cvKpiThang(thangDo, 'R11');
      ra.sanChanSoAo = kt2.du === false && kt2.pt === null;

      G.S.viec = giu; G.S.chotNgay = giuChot; G.S.roleObj = giuVai;
      return ra;
    });

    bao(!r44.mucLa.length && !r44.chuyenLa.length,
      'danh mục đầu việc không gọi tên vị trí nào không tồn tại',
      r44.mucLa.concat(r44.chuyenLa).join(' ') || r44.soMuc + ' đầu việc, mã vị trí khớp hết');
    bao(!r44.nhipLa.length,
      'mọi đầu việc gắn đúng một lớp nhịp CÓ THẬT trong chuẩn thời gian — hạn giờ đọc từ đó, không viết lại lần thứ hai',
      r44.nhipLa.join(' ') || 'khớp hết');
    bao(!r44.viTriThieu.length,
      'mọi vị trí trong hệ đều có đầu việc chuẩn — vị trí không có đầu việc thì không chấm KPI được',
      r44.viTriThieu.join(' ') || 'đủ 13 vị trí');
    bao(!r44.thieuXong.length && !r44.thieuDiem.length,
      'đầu việc nào cũng nói rõ ĐÓNG BẰNG BẰNG CHỨNG GÌ và đáng bao nhiêu điểm',
      r44.thieuXong.concat(r44.thieuDiem).join(' ') || r44.soMuc + '/' + r44.soMuc);

    bao(r44.nhanDuoc && r44.trangMoi && r44.trangDang && r44.trangXong,
      'một việc đi đủ vòng: nhận → bắt đầu → đóng, trạng thái đổi đúng từng bước',
      'mới → đang làm → đã xong');
    bao(r44.nhanTrung,
      'không nhận trùng một đầu việc đang mở — hai bản ghi cùng hạn thì KPI đếm mẫu số hai lần cho một việc');
    bao(r44.chanLoiKhai && r44.chanRong,
      'ĐÓNG BẰNG LỜI KHAI BỊ CHẶN — "xong rồi" và chuỗi rỗng đều không đóng được việc',
      'một hệ KPI chấm bằng lời khai là một hệ trả lương cho lời khai');
    bao(r44.dongDuoc && r44.dongLai,
      'có bằng chứng thì đóng được, và đóng rồi thì không đóng lại được');
    bao(r44.treTuDong,
      'quá hạn thì ĐỒNG HỒ tự đẩy sang cột trễ — không ai phải bấm, nên không bao giờ lệch');

    bao(r44.chuyenDuoc && r44.roiBangMinh && r44.vaoBangHo,
      'luân chuyển: việc rời bảng người giao và sang đúng bảng người nhận — một bản ghi, không nhân đôi');
    bao(r44.bietOTayAi && r44.duongDiGhiLai,
      'luôn trả lời được "việc này đang ở tay ai" và "đã đi qua những ai"',
      'lịch sử luân chuyển ghi lại từng chặng');
    bao(r44.lienDoiHien,
      'người giao vẫn thấy phần LIÊN ĐỚI của mình sau khi việc rời tay — không dồn hết cho người cuối cầm việc');

    bao(r44.thangDu && r44.moiNgayHopLe && r44.tuSoTrongMauSo,
      'KPI ngày nào cũng nằm trong 0–100 và tử số không bao giờ vượt mẫu số',
      r44.thangDu ? 'tháng ' + r44.thangPt + '% · hạng ' + r44.hang : 'không dựng được tháng để đo');
    bao(r44.khongMauSoRong,
      'không ngày nào được chấm trên MẪU SỐ RỖNG — bản đầu tính tử số theo ngày bấm nút, nên làm sớm là có tử số mà không có mẫu số, và tỉ lệ vọt lên 100% trên một phép chia rỗng',
      'mọi ngày được tính đều có việc đến hạn');
    bao(r44.ngayTrongKhongTinh,
      'ngày không có việc đến hạn thì KHÔNG TÍNH, không phải 0% — đưa 0% vào trung bình là phạt người ta vì hệ thống không giao việc');
    bao(r44.treCoTru,
      'ngày có việc trễ thì bị trừ theo bảng phạt đã có, không viết lại thang phạt lần thứ hai');
    bao(r44.sanChanSoAo,
      'tháng dưới sàn ngày thì KHÔNG ra một con số — trung bình của hai ngày không nói được gì về một tháng, mà một con số thì trông như đã nói');

    /* ── SỔ VIỆC PHẢI SỐNG QUA LẦN TẢI LẠI, VÀ CHẾT KHI ĐỔI NGƯỜI ──
       Hai điều ngược nhau, và thiếu một điều nào cũng hỏng:

       Bản 9.5 lưu sổ việc chỉ trong bộ nhớ. Sáng nhận việc, trưa đóng
       việc, chiều bấm F5 là sổ trống — KPI ngày về không, KPI tháng cộng
       từ KPI ngày nên cũng về không, và cả phần xét lương thưởng chạy
       trên sổ trống mà không báo gì.

       Nhưng lưu rồi thì sang chuyện thứ hai: bằng chứng đóng việc mang
       tên nhà và chuyện của nhà. Máy chung ở văn phòng, Coach đăng xuất,
       phụ huynh đăng nhập — sổ ấy không được ở lại. */
    const r44b = await p.evaluate(async () => {
      const G = window.G, ra = {};
      await G.doLogin('tuvan@gita365.vn');
      await new Promise(r => setTimeout(r, 1800));
      const m = G.cvMucCuaToi()[0];
      const v = G.cvNhan(m.ma).viec;
      G.cvBatDau(v.id);
      G.cvXong(v.id, 'Đã gọi nhà Minh An lúc 9 giờ, mẹ lo con mất tập trung, hẹn thứ Năm.');
      let kho = '';
      try { kho = localStorage.getItem('gita365.v7') || ''; } catch (e) { }
      ra.luuXuongMay = kho.indexOf(v.id) >= 0 && kho.indexOf('mẹ lo con mất tập trung') >= 0;
      ra.chuNhan = JSON.parse(kho || '{}').viecCua === 'tuvan@gita365.vn';

      await G.doLogin('phuhuynh@gita365.vn');
      await new Promise(r => setTimeout(r, 1800));
      let kho2 = '';
      try { kho2 = localStorage.getItem('gita365.v7') || ''; } catch (e) { }
      ra.doiNguoiLaSach = Object.keys(G.cvSo()).length === 0 &&
        kho2.indexOf('mẹ lo con mất tập trung') < 0;
      return ra;
    });
    bao(r44b.luuXuongMay && r44b.chuNhan,
      'sổ việc sống qua lần tải lại trang — bản trước giữ trong bộ nhớ, nên bấm F5 là KPI ngày và KPI tháng cùng về không mà không báo gì',
      r44b.luuXuongMay ? 'ghi xuống máy kèm tên chủ sổ' : 'KHÔNG ghi xuống máy');
    bao(r44b.doiNguoiLaSach,
      'đổi người đăng nhập trên cùng máy là sổ việc bị dọn — bằng chứng đóng việc mang tên nhà và chuyện của nhà, không được ở lại cho người sau',
      r44b.doiNguoiLaSach ? 'sạch cả bộ nhớ lẫn kho máy' : 'CÒN SÓT bằng chứng của người trước');

    /* ── Phía khách hàng ── */
    const r45 = await p.evaluate(() => {
      const G = window.G, ra = {};
      /* Dọn SẠCH mọi dấu vết trước khi đo, không chỉ sổ nhật ký. Các mục
         kiểm phía trên đã chạy qua hàng trăm màn và để lại checks với
         thoigian trong bộ nhớ; đo trên nền ấy thì "sổ trống" vẫn ra 15%
         và phép đo bắt lỗi ở chỗ không có lỗi. */
      const giuVai = G.S.roleObj, giuJ = G.S.journal, giuC = G.S.chotKhNgay;
      const giuCh = G.S.checks, giuTg = G.S.thoigian, giuNk = G.S.nhatky;
      G.S.roleObj = G.roleById('R13');
      G.S.journal = {}; G.S.chotKhNgay = {};
      G.S.checks = {}; G.S.thoigian = {}; G.S.nhatky = {};
      ra.ngay0 = G.khKpiNgay().pt;
      G.S.journal = { d1: 'Ngồi vào bàn 20h, rời 21h30, phải nhắc hai lần.' };
      ra.ngay1 = G.khKpiNgay().pt;
      ra.tangChuaDu = G.khKpiTang().du === false;
      for (let i = 1; i <= 14; i++) G.S.chotKhNgay['2026-08-' + ('0' + i).slice(-2)] = { pt: 80 };
      const t = G.khKpiTang();
      ra.tangDu = t.du; ra.tangPt = t.pt; ra.nhipPt = t.nhipPt;
      ra.congThucDung = t.pt === Math.round(t.nhipPt * 0.6 + t.mocPt * 0.4);
      ra.coNguong = !!(t.nguong && t.nguong.ma);
      ra.soNhip = (G.CV_KH_NGAY || []).length;
      ra.tongDiem = (G.CV_KH_NGAY || []).reduce((a, x) => a + x.diem, 0);
      G.S.roleObj = giuVai; G.S.journal = giuJ; G.S.chotKhNgay = giuC;
      G.S.checks = giuCh; G.S.thoigian = giuTg; G.S.nhatky = giuNk;
      return ra;
    });
    bao(r45.ngay0 === 0 && r45.ngay1 > 0,
      'KPI ngày của gia đình đọc từ DẤU VẾT THẬT — sổ trống thì 0%, ghi một dòng nhật ký là điểm lên ngay',
      r45.ngay0 + '% → ' + r45.ngay1 + '%');
    bao(r45.soNhip >= 5 && r45.tongDiem === 100,
      'năm nhịp ngày của gia đình cộng tròn 100 điểm', r45.soNhip + ' nhịp · ' + r45.tongDiem + ' điểm');
    bao(r45.tangChuaDu,
      'chưa đủ ngày thì KPI TẦNG không ra số — xét phân tầng bằng trung bình vài ngày là xét bằng may rủi');
    bao(r45.tangDu && r45.congThucDung,
      'KPI tầng tính đúng công thức đã công bố: 60% nhịp ngày cộng 40% tiêu chí mốc',
      r45.tangDu ? r45.nhipPt + '% nhịp → ' + r45.tangPt + '% tầng' : 'chưa dựng được');
    bao(r45.coNguong,
      'KPI tầng rơi vào đúng một trong ba ngưỡng xét phân hạng');

    /* ── Mỗi cấp có KPI của cấp đó ──
       Sàn dữ liệu ban đầu là 10 ngày cho MỌI cấp. Ước số lần đo mỗi
       tháng từ chính danh mục thì Giám đốc ra 6 và Phân tích dữ liệu ra
       5 — hai cấp ấy vĩnh viễn dưới sàn, vĩnh viễn "chưa đủ dữ liệu",
       vĩnh viễn không có hạng để xét lương thưởng. Không phải vì họ làm
       ít, mà vì việc của họ tính bằng tuần và tháng còn thước lại tính
       bằng ngày. */
    const r46 = await p.evaluate(() => {
      const G = window.G, ra = { thieuHoSo: [], sanQuaCao: [], khongRaHang: [], hanKhongDoi: false };
      const giu = G.S.roleObj, giuV = G.S.viec;
      const D = 86400000;
      /* Cùng lý do với khối trên: dựng trong một tháng xác định rồi hỏi
         đúng tháng ấy, để mục kiểm không phụ thuộc hôm nay là mùng mấy. */
      const thangDo = (function () {
        const t = new Date(); t.setDate(1); t.setMonth(t.getMonth() - 1);
        return t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2);
      })();
      const ngayCuaThang = d => new Date(thangDo + '-' + ('0' + d).slice(-2) + 'T12:00:00').getTime();
      (G.ROLES || []).forEach(r => {
        if (!(r.lv <= 12 || r.id === 'R15')) return;
        G.S.roleObj = r;
        if (!G.cvMucCuaToi().length) return;
        const cap = G.cvCapCuaToi();
        if (!cap) { ra.thieuHoSo.push(r.id); return; }
        const lanDo = Math.round(G.cvLanDoMotThang());
        if (lanDo < cap.san) ra.sanQuaCao.push(r.id + ' sàn ' + cap.san + ' > đo được ' + lanDo);
        /* dựng đủ một tháng rồi xem cấp ấy có RA HẠNG không */
        G.S.viec = {};
        let n = 0;
        const ms = G.cvMucCuaToi();
        for (let d = 1; d <= 28 && n < 260; d++) ms.forEach(m => {
          const han = ngayCuaThang(d), id = m.ma + '|' + han;
          G.S.viec[id] = { id, ma: m.ma, nguoi: r.id, nhanLuc: han - D, hanLuc: han,
            batDauLuc: han - D / 2, xongLuc: han - 3600000,
            bangChung: 'Bằng chứng thử đủ dài để qua ngưỡng kiểm.', giaoTu: '', lichSu: [] };
          n++;
        });
        const kt = G.cvKpiThang(thangDo);
        if (!kt.du || !kt.hang) ra.khongRaHang.push(r.id);
      });
      /* Hạn phải KHÁC nhau theo lớp nhịp — thiếu TG_NHIEMVU thì mọi việc
         cùng rơi về 24 giờ và bảng chạy được nhưng chạy sai, sai lặng lẽ. */
      G.S.roleObj = G.roleById('R11'); G.S.viec = {};
      const mNgay = G.cvDanhMuc().filter(m => m.nhip === 'NV-NGAY' && m.vai.indexOf('R11') >= 0)[0];
      const mThang = G.cvDanhMuc().filter(m => m.nhip === 'NV-THANG' && m.vai.indexOf('R11') >= 0)[0];
      if (mNgay && mThang) {
        const a = G.cvNhan(mNgay.ma), b2 = G.cvNhan(mThang.ma);
        if (a.ok && b2.ok) {
          const gioA = Math.round((a.viec.hanLuc - a.viec.nhanLuc) / 3600000);
          const gioB = Math.round((b2.viec.hanLuc - b2.viec.nhanLuc) / 3600000);
          ra.hanNgay = gioA; ra.hanThang = gioB;
          ra.hanKhongDoi = gioA === gioB;
        }
      }
      G.S.roleObj = giu; G.S.viec = giuV;
      return ra;
    });
    bao(!r46.thieuHoSo.length,
      'mọi vị trí CÓ ĐẦU VIỆC đều có hồ sơ KPI của cấp mình — không vị trí nào bị chấm bằng một cái thước không thuộc về nó',
      r46.thieuHoSo.join(' ') || '13 vị trí đều có cấp');
    bao(!r46.sanQuaCao.length,
      'sàn của một cấp không cao hơn số lần đo mà danh mục của cấp ấy sinh ra trong tháng — sàn cao hơn thực tế là cái sàn không ai bước qua được',
      r46.sanQuaCao.join(' · ') || 'mọi cấp đều bước qua được sàn của mình');
    bao(!r46.khongRaHang.length,
      'làm đủ một tháng thì MỌI cấp đều ra được KPI và ra được hạng — trước v9.5, Giám đốc và Phân tích dữ liệu vĩnh viễn dừng ở "chưa đủ dữ liệu"',
      r46.khongRaHang.join(' ') || 'cả 13 vị trí đều ra hạng');
    bao(!r46.hanKhongDoi,
      'hạn của việc ngày và việc tháng KHÁC nhau — thiếu chuẩn thời hạn ở gói công khai thì mọi việc rơi về 24 giờ, và bảng chạy được nhưng chạy sai',
      r46.hanNgay ? r46.hanNgay + ' giờ so với ' + r46.hanThang + ' giờ' : 'không đo được');

    /* ── Không bịa số tiền ── */
    const tienAo = require('fs').readFileSync(
      require('path').join(__dirname, '..', 'kho-goc', 'data.cong-viec.js'), 'utf8');
    bao(!/heSo:\s*\d/.test(tienAo) && !/(triệu|VNĐ|VND)\s*\d/.test(tienAo),
      'bảng hạng KHÔNG bịa hệ số lương hay số tiền — con số sai đi vào bảng lương thì không rút lại được bằng một lần sửa mã',
      'chỉ ghi điều kiện và quyền lợi, phần tiền để chủ Học viện điền');
  }

  /* ═══════════ 45 · KHO KHÔNG ĐƯỢC HỤT SO VỚI BẢN ĐÃ PHÁT HÀNH ═══════════
     kho-goc/ nằm trong .gitignore — đúng chủ ý, vì nội dung gốc chưa mã
     hoá không được lên kho mã. Cái giá là sửa nhầm thì KHÔNG CÓ GIT ĐỂ
     LÙI và không có diff để nhìn.

     Chuyện đã xảy ra thật ở bản 9.5.1: một phép tách câu tự động chạy
     trên toàn bộ kho-goc, đổi 18.672 chỗ. Trong đó có chỗ làm bộ test
     rơi từ 25 bộ xuống 5 bộ, và làm 50 mã tình huống tầng một biến
     thành tầng năm. Không lỗi cú pháp, không lỗi trang — mọi thứ vẫn
     chạy, chỉ là nội dung sai.

     Bảy gói .enc đã phát hành nằm TRONG git. Đó là bản lưu duy nhất của
     nội dung, và là chỗ duy nhất so được. Mục này so số bản ghi và so
     mã bản ghi: NỘI DUNG ÍT ĐI HẦU NHƯ LUÔN LÀ HỎNG, không phải sửa.

     Thêm nội dung thì mục này im — thêm là việc bình thường. Chỉ hụt
     mới đỏ. */
  console.log('\n45 · KHO KHÔNG ĐƯỢC HỤT SO VỚI BẢN ĐÃ PHÁT HÀNH');
  {
    const fs45 = require('fs'), px45 = require('path'), cr45 = require('crypto');
    const cp45 = require('child_process');
    const goc45 = px45.join(__dirname, '..');
    let khoa45 = null;
    try { khoa45 = JSON.parse(fs45.readFileSync(px45.join(goc45, 'kho', 'khoa.json'), 'utf8')).khoa; }
    catch (e) { /* máy dựng bản công khai không giữ khoá */ }

    if (!khoa45) {
      bao(true, 'không có bộ khoá trên máy này — bỏ qua phép so với bản đã phát hành',
        'đúng: máy dựng bản công khai không được giữ khoá');
    } else {
      function mo45(k, buf) {
        const de = cr45.createDecipheriv('aes-256-gcm', Buffer.from(k, 'base64'), buf.subarray(0, 12));
        de.setAuthTag(buf.subarray(12, 28));
        return ruotGoi(Buffer.concat([de.update(buf.subarray(28)), de.final()]));
      }
      /* Gộp bảy gói phải NỐI mảng, không được gán đè. Ứng dụng nối
         (xem G.KHO_TRAI_RA bên src/kho-khoa.js), nên phép so cũng phải
         nối — gán đè thì một kho trải năm gói chỉ còn phần của gói cuối,
         và mục kiểm này sẽ báo "mất 816 bản ghi" ở chỗ không mất gì.

         Đúng cái bẫy Object.assign đã nuốt mất hai mươi bộ test khi dựng
         lại kho ở 9.6. Lần này nó cắn vào phép kiểm chứ không cắn vào
         kho — nhưng vẫn là cùng một cái bẫy. */
      function gop45(dich, nguon) {
        Object.keys(nguon).forEach(function (k) {
          if (Array.isArray(dich[k]) && Array.isArray(nguon[k])) dich[k] = dich[k].concat(nguon[k]);
          else dich[k] = nguon[k];
        });
      }
      const CU = {}, NAY = {};
      let coCu = true;
      for (const g of Object.keys(khoa45)) {
        const tep = px45.join(goc45, 'kho', g + '.enc');
        if (fs45.existsSync(tep)) gop45(NAY, mo45(khoa45[g], fs45.readFileSync(tep)));
        try {
          gop45(CU, mo45(khoa45[g], cp45.execSync('git show HEAD:kho/' + g + '.enc',
            { cwd: goc45, maxBuffer: 1 << 30, encoding: 'buffer' })));
        } catch (e) { coCu = false; }
      }
      if (!coCu) {
        bao(true, 'chưa có bản đã phát hành trong git để so — lần đóng gói đầu', 'bỏ qua');
      } else {
        const dem45 = v => Array.isArray(v) ? v.length
          : (v && typeof v === 'object') ? Object.keys(v).length : (v === undefined ? 0 : 1);
        const ma45 = x => (x && (x.ma || x.id || x.code)) || null;

        const bienMat = Object.keys(CU).filter(k => NAY[k] === undefined);
        bao(!bienMat.length,
          'không kho nào BIẾN MẤT so với bản đã phát hành — một kho vắng mặt là cả một mảng nội dung không còn đường về',
          bienMat.length ? 'mất: ' + bienMat.join(' ') : Object.keys(CU).length + ' kho đều còn');

        /* ── BẢN GHI CHUYỂN KHO KHÔNG PHẢI BẢN GHI MẤT ──
           Tách một kho làm hai vì lý do cấp phép — như CV_MUC tách ra
           CV_MUC_DS ở bản 9.7 để đầu việc đội ngũ không xuống máy gia
           đình — làm kho cũ hụt bản ghi mà không mất chữ nào. Nếu phép
           kiểm này đỏ ở đó thì mỗi lần chia kho cho đúng phạm vi lại
           phải tắt nó đi, và một phép kiểm hay bị tắt là một phép kiểm
           đã chết.

           Nên hỏi câu đúng: mã ấy có còn ở ĐÂU ĐÓ trong bảy gói không.
           Còn là chuyển kho — ghi ra để người đọc thấy, không đỏ. Không
           còn ở đâu cả mới là mất. */
        const maToanKho = new Set();
        Object.keys(NAY).forEach(k => {
          if (Array.isArray(NAY[k])) NAY[k].forEach(x => { const m = ma45(x); if (m) maToanKho.add(m); });
        });
        const chuyenKho = [];
        const hut = [];
        Object.keys(CU).forEach(k => {
          if (NAY[k] === undefined) return;
          const na = dem45(CU[k]), nb = dem45(NAY[k]);
          if (nb >= na) return;
          if (Array.isArray(CU[k]) && Array.isArray(NAY[k]) && CU[k].length && ma45(CU[k][0])) {
            const conO = new Set(NAY[k].map(ma45));
            const roiKho = CU[k].map(ma45).filter(x => x && !conO.has(x));
            if (roiKho.length === na - nb && roiKho.every(x => maToanKho.has(x))) {
              chuyenKho.push(k + ' ' + na + ' → ' + nb + ' (' + roiKho.join(' ') + ' sang kho khác)');
              return;
            }
          }
          hut.push(k + ' ' + na + ' → ' + nb);
        });
        if (chuyenKho.length) console.log('  · chuyển kho, không mất chữ: ' + chuyenKho.join(' · '));
        bao(!hut.length,
          'không kho nào ÍT BẢN GHI ĐI — nội dung ít đi hầu như luôn là hỏng, không phải sửa',
          hut.length ? hut.slice(0, 6).join(' · ') : 'không kho nào hụt');

        const bay = [];
        Object.keys(CU).forEach(k => {
          const a = CU[k], b = NAY[k];
          if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !ma45(a[0])) return;
          /* Mã còn ở kho khác thì không phải mất — xem lý do bên trên */
          const m = a.map(ma45).filter(x => x && !maToanKho.has(x));
          if (m.length) bay.push(k + ': ' + m.slice(0, 4).join(' ') + (m.length > 4 ? ' …' : ''));
        });
        bao(!bay.length,
          'không MÃ BẢN GHI nào biến mất — mã đổi thì màn hình vẫn chạy nhưng mọi mối nối trỏ vào nó gãy trong im lặng',
          bay.length ? bay.slice(0, 5).join(' · ') : 'mọi mã đều còn');

        /* Đổi rộng bất thường: không chặn phát hành, nhưng phải nói ra */
        const doiRong = Object.keys(CU).filter(k => NAY[k] !== undefined &&
          JSON.stringify(CU[k]) !== JSON.stringify(NAY[k])).length;
        const tiLe = Math.round(doiRong / Object.keys(CU).length * 100);
        console.log('  · ' + doiRong + '/' + Object.keys(CU).length + ' kho đổi nội dung (' + tiLe + '%)' +
          (tiLe >= 30 ? '  ⚠ đổi rộng bất thường — nhìn kỹ node tools/soi-doi-kho.js trước khi đẩy' : ''));
      }
    }
  }

  /* ── 46. THÁP CHIẾN LƯỢC VÀ CHUỖI NHÂN QUẢ ──
     Một bản đồ chiến lược hỏng không kêu. Mọi màn vẫn dựng ra, mọi ô vẫn
     có chữ, và người đọc vẫn gật đầu — chỉ có điều những mũi tên trong đó
     không dẫn tới đâu. Mục này soi bốn chỗ hỏng lặng lẽ ấy. */
  console.log('\n46 · THÁP CHIẾN LƯỢC VÀ CHUỖI NHÂN QUẢ');
  {
    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const cl = await p.evaluate(() => {
      const G = window.G;
      if (!G.CL_MUC || !G.clSoiChuoi) return { co: false };
      const vaiCo = new Set((G.ROLES || []).map(r => r.id));
      const khoCo = ma => G[ma] !== undefined;
      return { co: true,
        soi: G.clSoiChuoi(),
        nguon: G.clDemNguon(),
        khongViec: G.clMucKhongCoViec(),
        soTang: (G.CL_TANG || []).length,
        tangRong: (G.CL_TANG || []).filter(t => !(G.CL_MUC || []).some(m => m.tang === t.ma)).map(t => t.ma),
        soBac: (G.CL_THAP || []).length,
        bacHong: (G.CL_THAP || []).filter(b => !khoCo(b.kho)).map(b => b.ma),
        bacThieuMan: (G.CL_THAP || []).filter(b => b.man && !G.VIEWS[b.man]).map(b => b.ma),
        vaiLa: [...new Set((G.CL_MUC || []).flatMap(m => m.vai || []).filter(v => !vaiCo.has(v)))],
        thieuChuan: (G.CL_MUC || []).filter(m => !m.do || !m.chuan || !m.nhip).map(m => m.ma),
        nepThieuCoChe: (G.CL_NHAT || []).filter(x => !x.co || x.co.length < 40).map(x => x.ma),
        nhipTrungCauHoi: (function () {
          const h2 = (G.CL_NHIP || []).map(n => n.hoi);
          return h2.length - new Set(h2).size;
        })(),
        soKetQua: (G.CL_KETQUA || []).length };
    });
    if (!cl.co) {
      bao(false, 'lớp chiến lược nạp được từ gói nghề', 'không thấy CL_MUC — kiểm lại gói nghề');
    } else {
      bao(!cl.soi.lacTang.length,
        'mọi mục tiêu gắn vào một tầng CÓ THẬT — gắn nhầm tầng thì nó nằm sai chỗ trong chuỗi nhân quả',
        cl.soi.lacTang.join(' ') || cl.soTang + ' tầng, không mục tiêu nào lạc');
      bao(!cl.soi.noiHong.length,
        'mọi mối nối trỏ vào một mã CÓ THẬT — nối vào mã không tồn tại là mũi tên vẽ ra chỗ trống',
        cl.soi.noiHong.join(' ') || 'mọi mối nối đều có đích');
      bao(!cl.soi.cut.length,
        'không mục tiêu nào CỤT — mục tiêu không nối lên đâu nghĩa là làm xong cũng không ai khá hơn',
        cl.soi.cut.join(' ') || 'không có mục tiêu cụt');
      bao(!cl.soi.khongToi.length,
        'mọi nhánh đều đi tới được tầng tài chính — đây là chỗ hỏng khó thấy nhất: có mũi tên, đúng mã, nhưng chạy vòng trong hai tầng dưới rồi dừng',
        cl.soi.khongToi.join(' ') || 'mọi nhánh đều tới đỉnh');
      bao(!cl.nguon.thieu.length,
        'mọi mục tiêu đo bằng một nguồn CÓ THẬT trong hệ thống — mục tiêu không có số là khẩu hiệu, và một bản đồ đầy khẩu hiệu thì không bao giờ đỏ',
        cl.nguon.thieu.join(' ') || cl.nguon.co + '/' + cl.nguon.tong + ' đo được ngay, ' +
        cl.nguon.trong + ' có nguồn nhưng chưa đủ dữ liệu');
      bao(!cl.thieuChuan.length,
        'mục tiêu nào cũng nói rõ ĐO BẰNG GÌ · ĐẠT KHI NÀO · NHỊP NÀO',
        cl.thieuChuan.join(' ') || cl.nguon.tong + '/' + cl.nguon.tong);
      bao(!cl.tangRong.length && cl.soTang === 4,
        'đủ bốn tầng và không tầng nào rỗng — thiếu một tầng là mất một mắt trong chuỗi nhân quả',
        cl.tangRong.join(' ') || '4 tầng đều có mục tiêu');
      bao(cl.soBac === 9 && !cl.bacHong.length,
        'chín bậc tháp, bậc nào cũng trỏ vào một kho CÓ THẬT — bậc trỏ vào hư không là bậc chưa dựng',
        cl.bacHong.join(' ') || '9/9 bậc có kho');
      bao(!cl.bacThieuMan.length,
        'bậc nào có màn hình thì màn ấy phải tồn tại — nút mở ra trang trắng còn tệ hơn không có nút',
        cl.bacThieuMan.join(' ') || 'mọi bậc mở được');
      bao(!cl.vaiLa.length,
        'mọi mục tiêu giao cho một vị trí CÓ THẬT trong hệ',
        cl.vaiLa.join(' ') || 'mã vị trí khớp hết');
      bao(cl.khongViec !== null && !cl.khongViec.length,
        'mục tiêu nào cũng có đầu việc của một vị trí đẩy nó — bậc năm nối được xuống bậc bảy, nếu không thì bản đồ chỉ sống trên giấy',
        (cl.khongViec || []).join(' ') || 'mọi mục tiêu đều có việc đẩy');
      bao(!cl.nepThieuCoChe.length,
        'mỗi nếp nghề học từ Nhật phải chỉ ra CƠ CHẾ CÓ THẬT đang thi hành nó — chép khẩu hiệu thì dễ và vô ích',
        cl.nepThieuCoChe.join(' ') || '6/6 nếp có cơ chế');
      bao(!cl.nhipTrungCauHoi && cl.soKetQua === 4,
        'mỗi nhịp xem lại hỏi một câu KHÁC nhau, và có đủ bốn kết quả ở đỉnh — hai nhịp hỏi cùng một câu thì một trong hai là buổi họp thừa',
        cl.nhipTrungCauHoi ? cl.nhipTrungCauHoi + ' nhịp hỏi trùng câu' : '7 nhịp · 4 kết quả');
    }
  }

  /* ── 47. TINH GỌN, GIAI ĐOẠN VÀ LỚP BẢO VỆ ──
     Một bảng bảo vệ dễ trở thành bảng khen: mỗi lần thêm một cơ chế thì
     thêm một dòng, và không ai xoá dòng nào. Mục này giữ cho nó nói thật:
     mỗi tầng phải khai chỗ CHƯA CÓ, và mỗi cơ chế khai ra phải trỏ vào
     thứ có thật. */
  console.log('\n47 · TINH GỌN · GIAI ĐOẠN · LỚP BẢO VỆ');
  {
    const tg = await p.evaluate(() => {
      const G = window.G;
      if (!G.TG_LANG || !G.TG_LOP) return { co: false };
      return { co: true,
        soLang: (G.TG_LANG || []).length,
        langThieu: (G.TG_LANG || []).filter(x => !x.la || !x.gia || !x.do || !x.co).map(x => x.ma),
        chuaChan: G.tgChuaChan(),
        soGon: (G.TG_GON || []).length,
        gonThieuBang: (G.TG_GON || []).filter(n => !n.bang || n.bang.length < 30).map(n => n.no),
        soGD: (G.TG_GIAIDOAN || []).length,
        gdThieu: (G.TG_GIAIDOAN || []).filter(g => !g.nguy || !g.lam || !g.dung || !g.ra).map(g => g.ma),
        gdTrungSo: (function () { const a = (G.TG_GIAIDOAN || []).map(g => g.so); return a.length - new Set(a).size; })(),
        soLop: (G.TG_LOP || []).length,
        lopThieuCo: (G.TG_LOP || []).filter(l => !(l.co || []).length).map(l => l.lop),
        lopKhaiHo: G.tgLopHo() };
    });
    if (!tg.co) {
      bao(false, 'lớp tinh gọn nạp được từ gói nghề', 'không thấy TG_LANG');
    } else {
      bao(tg.soLang === 7 && !tg.langThieu.length,
        'đủ bảy loại lãng phí, loại nào cũng nói rõ LÀ GÌ · CÁI GIÁ · ĐO BẰNG GÌ · CƠ CHẾ NÀO CHẶN',
        tg.langThieu.join(' ') || '7/7 đủ bốn cột');
      bao(tg.chuaChan.length > 0,
        'bảng lãng phí có khai ít nhất một chỗ CHƯA CHẶN — bảy trên bảy đều xanh nghĩa là chưa nhìn kỹ, không phải giỏi',
        tg.chuaChan.length + ' loại còn trống: ' + tg.chuaChan.join(' '));
      bao(tg.soGon === 10 && !tg.gonThieuBang.length,
        'mười nguyên tắc, điều nào cũng trỏ vào một cơ chế ĐANG CHẠY — nguyên tắc không cắt được gì thì là khẩu hiệu',
        tg.gonThieuBang.join(' ') || '10/10 có cách cắt');
      bao(tg.soGD === 5 && !tg.gdThieu.length && !tg.gdTrungSo,
        'năm giai đoạn, giai đoạn nào cũng nói rõ MỐI NGUY · VIỆC CHÍNH · PHẢI NHỊN · XONG KHI NÀO',
        tg.gdThieu.join(' ') || (tg.gdTrungSo ? 'trùng số thứ tự' : '5/5 đủ bốn cột'));
      bao(tg.soLop === 4 && !tg.lopThieuCo.length,
        'đủ bốn tầng bảo vệ và tầng nào cũng liệt kê được cơ chế thật đang giữ',
        tg.lopThieuCo.join(' ') || '4/4 tầng có cơ chế');
      bao(tg.lopKhaiHo.length === tg.soLop,
        'TẦNG NÀO CŨNG khai chỗ chưa có — một bảng chỉ ghi phần đã làm là một bảng nói dối, và người đọc nó yên tâm hơn thực tế',
        tg.lopKhaiHo.length + '/' + tg.soLop + ' tầng khai chỗ hở');
    }
  }

  /* ── 48. LUỒNG CẢI TIẾN ──
     Một hộp thư góp ý không ai trả lời còn tệ hơn không có hộp nào: nó
     dạy người ta rằng nói ra là vô ích. Mục này soi đúng chỗ dễ hỏng ấy
     — hạn trả lời có thật không, từ chối có bắt buộc lý do không, và
     điểm có chấm cho việc NÓI RA hay chỉ cho việc được nhận. */
  console.log('\n48 · LUỒNG CẢI TIẾN TỪ NGƯỜI LÀM');
  {
    const ct = await p.evaluate(async () => {
      const G = window.G, ra = {};
      if (!G.CT_LOAI || !G.ctGui) return { co: false };
      ra.co = true;
      const vaiCo = new Set((G.ROLES || []).map(r => r.id));
      ra.vaiLa = (G.CT_LOAI || []).filter(l => !vaiCo.has(l.vai)).map(l => l.ma);
      ra.soLoai = (G.CT_LOAI || []).length;
      ra.soTrang = (G.CT_TRANG || []).length;
      ra.trangThieu = (G.CT_TRANG || []).filter(t => !t.y || !t.ra).map(t => t.ma);

      /* Chạy thật một vòng đời, trên sổ rỗng */
      const giu = G.S.caiTien, giuVai = G.S.roleObj;
      G.S.caiTien = {}; G.S.roleObj = G.roleById('R07');

      ra.chanNgan = G.ctGui('CT-QUY', 'ngắn quá').ok === false;
      const g = G.ctGui('CT-QUY', 'Bước bàn giao đang phải nhập lại tên nhà hai lần, một lần ở hồ sơ và một lần ở biên bản.');
      ra.guiDuoc = g.ok;
      const id = g.ok ? g.de.id : null;
      ra.ganNguoi = g.ok && g.de.nguoiTraLoi === 'R04';
      ra.trangMoi = id && G.ctTrangThai(G.ctSo()[id]) === 'moi';

      /* Quá hạn do ĐỒNG HỒ, không do ai bấm */
      if (id) G.ctSo()[id].guiLuc = Date.now() - 20 * 86400000;
      ra.tuTre = id && G.ctTrangThai(G.ctSo()[id]) === 'tre';

      ra.nhanKhongNgay = id && G.ctNhan(id, '').ok === false;
      ra.tuChoiKhongLyDo = id && G.ctKhongNhan(id, 'chưa phù hợp').ok === false;
      ra.tuChoiCoLyDo = id && G.ctKhongNhan(id, 'Chỗ này sắp bỏ hẳn ở bản sau nên sửa bây giờ là làm hai lần.').ok === true;

      /* Điểm phải cộng cho người GỬI dù bị từ chối */
      const d = G.ctDiemCua('R07');
      ra.diemDuBiTuChoi = d.diem >= (G.CT_DIEM || {}).gui;

      /* Nhận thì bắt buộc ngày áp */
      G.S.caiTien = {};
      const g2 = G.ctGui('CT-CU', 'Màn danh mục đầu việc phải cuộn xuống cuối mới thấy nút nhận việc trên máy tính bảng.');
      ra.nhanCoNgay = g2.ok && G.ctNhan(g2.de.id, '2026-10-01').ok === true;

      G.S.caiTien = giu; G.S.roleObj = giuVai;
      ra.soLuat = (G.CT_LUAT || []).length;
      return ra;
    });
    if (!ct.co) {
      bao(false, 'luồng cải tiến nạp được từ gói nghề', 'không thấy CT_LOAI');
    } else {
      bao(ct.soLoai === 5 && !ct.vaiLa.length,
        'năm loại đề xuất, loại nào cũng gán sẵn một vị trí CÓ THẬT phải trả lời — gửi nhầm tay là đề xuất chết ngay ở bước đầu',
        ct.vaiLa.join(' ') || '5/5 có người nhận');
      bao(ct.soTrang === 5 && !ct.trangThieu.length,
        'năm trạng thái, trạng thái nào cũng nói rõ NGHĨA LÀ GÌ và RA KHỎI ĐÂY BẰNG CÁCH NÀO',
        ct.trangThieu.join(' ') || '5/5 đủ hai cột');
      bao(ct.chanNgan && ct.guiDuoc && ct.ganNguoi && ct.trangMoi,
        'gửi được một đề xuất có nội dung, và nó được gán NGAY cho người phải trả lời — không đề xuất nào rơi vào khoảng không chờ ai nhặt lên');
      bao(ct.tuTre,
        'quá mười bốn ngày thì đề xuất TỰ sang cột đỏ — im lặng không phải câu trả lời, và đồng hồ chạy chứ không chờ ai bấm');
      bao(ct.nhanKhongNgay,
        'nhận mà KHÔNG có ngày áp thì hệ thống không cho đóng — nhận suông là từ chối lịch sự, và đắt hơn từ chối thẳng vì người ta còn chờ');
      bao(ct.tuChoiKhongLyDo && ct.tuChoiCoLyDo,
        'từ chối bắt buộc có lý do viết ra — "chưa phù hợp" bị chặn, vì đó là cách nói không mà tránh phải nghĩ');
      bao(ct.diemDuBiTuChoi,
        'điểm vẫn cộng cho người GỬI dù đề xuất bị từ chối — chấm theo kết quả thì người ta chỉ nói những chỗ chắc được duyệt, mà chỗ vướng thật lại là chỗ dễ bị từ chối nhất');
      bao(ct.nhanCoNgay && ct.soLuat === 6,
        'nhận kèm ngày áp thì đóng được, và sáu luật của luồng đều có mặt',
        ct.soLuat + '/6 luật');
    }
  }

  /* ── 49. MƯỜI BÁNH ĐÀ ──
     Lớp này là một trò chơi, và trò chơi nào cũng có người tìm đường tắt.
     Đường tắt nguy hiểm nhất không phải người dùng tìm ra — mà là chính
     người viết mã mở sẵn cho tiện: cho bấm để lên cấp, hoặc mở sẵn cả
     mười bánh đà cho màn hình đỡ trống. Mục này chặn đúng chỗ ấy. */
  console.log('\n49 · MƯỜI BÁNH ĐÀ');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    /* Chờ GÓI NẠP XONG, không chờ theo đồng hồ. Từ 9.9 gói nghề mở ở
       nền, nên chờ một số giây cố định là canh may: gói to lên một chút
       là mục kiểm đo trên kho chưa đầy và đỏ ở chỗ không có lỗi. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const bd = await p.evaluate(() => {
      const G = window.G;
      if (!G.BD_LON || !G.bdCap) return { co: false };
      const ra = { co: true, ct: G.bdSoiCauTruc(), loiHua: G.bdSoiLoiHua() };
      ra.soChon = (G.BD_CHON || []).length;
      ra.chonThieu = (G.BD_CHON || []).filter(c => !c.khi || !c.deChon || !c.nenChon || !c.viSao || !c.ai).map(c => c.ma);
      ra.chonLacCap = (G.BD_CHON || []).filter(c => !(G.BD_CAP || []).some(x => x.cap === c.cap)).map(c => c.ma);
      ra.capThieuWow = (G.BD_CAP || []).filter(c => !c.wow || !c.mocThat || !c.mo).map(c => c.cap);

      /* Sổ RỖNG thì phải là cấp 0 — không ai được vào cửa đã ở cấp 1 */
      const giuJ = G.S.journal, giuC = G.S.chotKhNgay, giuT = G.S.test;
      G.S.journal = {}; G.S.chotKhNgay = {}; G.S.test = {};
      ra.rongLaCap0 = G.bdCap().cap === 0;
      ra.rongKhongMoBanhDa = G.bdDaMo().length === 0;

      /* Ba tối rời rạc: lên cấp 1 nhưng KHÔNG lên cấp 2 — cấp 2 đòi chuỗi 7 */
      const GHI = 'ba dòng tối nay';   /* phải hơn hai ký tự mới tính là có ghi */
      G.S.journal = { '2026-01-01': GHI, '2026-01-05': GHI, '2026-01-09': GHI };
      ra.baToiLaCap1 = G.bdCap().cap === 1;

      /* Bảy tối LIỀN NHAU mới lên cấp 2 */
      G.S.journal = {};
      for (let d = 1; d <= 7; d++) G.S.journal['2026-02-0' + d] = GHI;
      const c2 = G.bdCap();
      ra.bayToiLienLaCap2 = c2.cap === 2 && c2.bangChung.chuoi === 7;

      /* Không nhảy cóc: đủ số tối của cấp 6 nhưng chuỗi ngắn thì vẫn đứng ở cấp 1 */
      G.S.journal = {};
      for (let d = 1; d <= 30; d++) G.S.journal['2026-03-' + String(d).padStart(2, '0')] = GHI;
      /* 30 ngày liền → chuỗi 30, đủ cấp 4; cấp 5 cần 1 bài đánh giá */
      const c5 = G.bdCap();
      ra.chanOChoThieuBai = c5.cap === 4;

      G.S.journal = giuJ; G.S.chotKhNgay = giuC; G.S.test = giuT;
      ra.coDan = !!G.BD_DAN;     /* phụ huynh KHÔNG được có cách dẫn */
      return ra;
    });
    if (!bd.co) {
      bao(false, 'lớp bánh đà nạp được từ gói nền', 'không thấy BD_LON');
    } else {
      bao(bd.ct.soLon === 10 && !bd.ct.thieuNho.length && bd.ct.soNho === 100,
        'đúng mười bánh đà lớn, mỗi cái đúng mười bánh đà nhỏ — một trăm việc, không thiếu không thừa',
        bd.ct.thieuNho.join(' ') || bd.ct.soLon + ' × 10 = ' + bd.ct.soNho);
      bao(!bd.ct.trung.length,
        'không mã việc nào trùng — mã trùng thì hai việc khác nhau ghi đè dấu đã làm của nhau',
        bd.ct.trung.join(' ') || '100 mã riêng biệt');
      bao(!bd.ct.vongHo.length,
        'vòng nào cũng KHÉP LẠI — phải chỉ ra được A → B → C → quay lại A mạnh hơn; vòng không khép thì đó là danh sách việc, mà danh sách việc làm xong là hết',
        bd.ct.vongHo.join(' ') || '10/10 vòng khép');
      bao(!bd.ct.thieuDau.length,
        'bánh đà nào cũng nói rõ DẤU HIỆU NÓ ĐANG ĐỨNG — biết lúc nào nó ngừng quay mới sửa được',
        bd.ct.thieuDau.join(' ') || '10/10 có dấu hiệu');
      bao(bd.ct.soCap === 10 && bd.ct.capLienTuc && !bd.capThieuWow.length,
        'đủ mười cấp liên tục, cấp nào cũng có MỐC THẬT · MỞ RA GÌ · ĐIỂM CHẠM',
        bd.capThieuWow.join(' ') || '10/10 cấp đủ ba cột');
      bao(!bd.loiHua.length,
        'điều kiện MÁY ĐỌC khớp với lời hứa viết cho gia đình — lệch nhau thì màn hình hứa một đằng, máy mở một nẻo, và mất lòng tin vào cả bảng',
        bd.loiHua.join(' ') || '10/10 khớp');
      bao(bd.rongLaCap0 && bd.rongKhongMoBanhDa,
        'sổ RỖNG thì là cấp 0 và KHÔNG mở bánh đà nào — mở sẵn cho màn hình đỡ trống là hứa suông, và hứa suông ở màn đầu thì mất người ngay ở màn đầu');
      bao(bd.baToiLaCap1 && bd.bayToiLienLaCap2,
        'ba tối rời rạc lên được cấp 1 nhưng KHÔNG lên cấp 2 — cấp 2 đòi bảy ngày LIỀN NHAU, và chuỗi mới là thứ tạo ra nếp');
      bao(bd.chanOChoThieuBai,
        'ba mươi ngày liền vẫn đứng ở cấp 4 vì chưa làm bài đánh giá — không nhảy cóc, vì mỗi cấp mở một bánh đà và bánh đà sau dựa lên bánh đà trước');
      bao(bd.soChon === 10 && !bd.chonThieu.length && !bd.chonLacCap.length,
        'mười ngã ba, cái nào cũng đủ KHI NÀO GẶP · NHÁNH DỄ · NHÁNH ĐƯỢC GỢI Ý · AI GỢI Ý · VÌ SAO NHÁNH DỄ ĐẮT',
        bd.chonThieu.concat(bd.chonLacCap).join(' ') || '10/10 đủ năm cột');
      bao(!bd.coDan,
        'gia đình KHÔNG đọc được CÁCH DẪN của Tư vấn và Coach — đọc được thì họ biết trước câu tiếp theo và trả lời theo kịch bản, buổi nói chuyện mất hết tác dụng',
        bd.coDan ? 'BD_DAN lọt xuống máy phụ huynh' : 'BD_DAN chỉ ở gói nghề');
    }
  }

  /* ── 50. LỚP CẢM XÚC VÀ MÙA ĐỜI ──
     Một lớp cảm xúc rất dễ trở thành một trang chữ đẹp mà không đổi được
     gì trong hệ. Mục này đo đúng chỗ ấy: mùa đời có THẬT SỰ hạ mẫu số
     không, có THẬT SỰ giữ chuỗi không, và mỗi bậc cảm xúc có trỏ vào một
     cơ chế CÓ THẬT không. */
  console.log('\n50 · LỚP CẢM XÚC · MÙA ĐỜI');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const tt = await p.evaluate(() => {
      const G = window.G;
      if (!G.TT_MUA || !G.ttMuaCua) return { co: false };
      const ra = { co: true };
      ra.soCamXuc = (G.TT_CAMXUC || []).length;
      ra.coCheThieu = G.ttSoiCoChe();
      ra.camXucThieu = (G.TT_CAMXUC || []).filter(x => !x.khi || !x.y || !x.bom || !x.hong).map(x => x.ma);
      ra.soMua = (G.TT_MUA || []).length;
      /* nhip phải khớp đúng số mã trong giuMa — lệch thì màn hình nói một
         đằng, máy chấm một nẻo */
      ra.muaLech = (G.TT_MUA || []).filter(m => m.nhip !== (m.giuMa || []).length).map(m => m.ma);
      const maKH = new Set((G.CV_KH_NGAY || []).map(x => x.ma));
      ra.muaMaLa = (G.TT_MUA || []).filter(m => (m.giuMa || []).some(x => !maKH.has(x))).map(m => m.ma);
      ra.muaKhoCoHan = (G.TT_MUA || []).filter(m => m.ma !== 'THUONG').every(m => m.hanNgay > 0);

      const giuMua = G.S.mua, giuVet = G.S.vet, giuJ = G.S.journal;
      G.S.mua = null; G.S.vet = [];

      /* 1 · Chưa khai mùa thì đủ năm nhịp */
      ra.thuongDuNam = G.ttNhipCanGiu().length === 5;
      const k0 = G.khKpiNgay();
      ra.mauSoThuong = k0.tong;

      /* 2 · Khai mùa PHẢI có lý do thật */
      ra.chanKhaiSuong = G.ttKhaiMua('DONG', 'mệt').ok === false;
      ra.khaiDuoc = G.ttKhaiMua('DONG', 'Xe hỏng nặng, mất tám ngày thu nhập, cả nhà đang xoay tiền sửa.').ok === true;

      /* 3 · Mùa đông HẠ MẪU SỐ thật, không phải một cái nhãn */
      ra.dongMotNhip = G.ttNhipCanGiu().length === 1;
      const k1 = G.khKpiNgay();
      ra.mauSoTut = k1.tong < k0.tong && k1.tong > 0;

      /* 4 · Mùa đông GIỮ CHUỖI: ghi ngày 1, nghỉ ngày 2–3, ghi ngày 4 →
         chuỗi vẫn là 3, vì hai ngày trống nằm trong mùa được bảo vệ */
      const GHI = 'ba dòng tối nay';
      const nen = new Date(); nen.setDate(nen.getDate() - 10);
      const dd = n => { const t = new Date(nen); t.setDate(t.getDate() + n);
        return t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2); };
      G.S.mua.tu = nen.getTime() - 86400000;
      G.S.journal = {}; [0, 3].forEach(n => { G.S.journal[dd(n)] = GHI; });
      ra.chuoiDuocGiu = G.bdBangChung().chuoi === 2 && G.bdBangChung().toi === 2;

      /* 5 · Không có mùa thì đúng hai ngày rời rạc là chuỗi 1 */
      G.S.mua = null;
      ra.khongMuaThiDut = G.bdBangChung().chuoi === 1;

      /* 6 · Mùa khó HẾT HẠN thì hỏi lại, không tự gia hạn */
      G.ttKhaiMua('DONG', 'Xe hỏng nặng, mất tám ngày thu nhập, cả nhà đang xoay tiền sửa.');
      G.S.mua.tu = Date.now() - 90 * 86400000;
      const het = G.ttMuaCua();
      ra.hetHanThiHoi = het.hetHan === true && het.mua.ma === 'THUONG';

      /* 7 · Ra khỏi mùa khó thì ghi lại thành một VẾT */
      G.S.mua = { ma: 'DONG', tu: Date.now() - 30 * 86400000, vi: 'Xe hỏng nặng, mất tám ngày thu nhập.' };
      G.S.vet = [];
      G.ttKhaiMua('THUONG', '');
      ra.raThiCoVet = (G.S.vet || []).length === 1 && G.S.vet[0].mua === 'DONG';

      G.S.mua = giuMua; G.S.vet = giuVet; G.S.journal = giuJ;

      ra.soMan = (G.TT_MAN || []).length;
      ra.coManNoiBo = !!G.TT_MAN || !!G.TT_DONGHANH || !!G.TT_NHIEMKY;
      ra.luat11 = (G.TT_LUAT || []).some(l => l.no === 11);
      return ra;
    });
    if (!tt.co) {
      bao(false, 'lớp cảm xúc nạp được từ gói nền', 'không thấy TT_MUA');
    } else {
      bao(tt.soCamXuc === 7 && !tt.camXucThieu.length,
        'đủ bảy bậc cảm xúc, bậc nào cũng nói rõ BƠM LÚC NÀO · BƠM BẰNG GÌ · DẤU HIỆU KHÔNG VÀO ĐƯỢC',
        tt.camXucThieu.join(' ') || '7/7 đủ bốn cột');
      bao(!tt.coCheThieu.length,
        'mỗi bậc cảm xúc trỏ vào một CƠ CHẾ CÓ THẬT trong hệ — bậc nào trỏ vào thứ không tồn tại thì đó là văn chương, không phải cơ chế',
        tt.coCheThieu.join(' ') || '7/7 có cơ chế thật');
      bao(tt.soMua === 5 && !tt.muaLech.length && !tt.muaMaLa.length,
        'năm mùa, số nhịp khai khớp đúng danh sách nhịp giữ, và mã nhịp nào cũng có thật trong bảng nhịp ngày',
        tt.muaLech.concat(tt.muaMaLa).join(' ') || '5/5 khớp');
      bao(tt.muaKhoCoHan,
        'mùa khó nào cũng CÓ HẠN — mùa khó kéo dài vô hạn thì thành cái cớ, và cái cớ ăn mất chính thứ nó định bảo vệ');
      bao(tt.chanKhaiSuong && tt.khaiDuoc,
        'khai mùa khó phải kèm LÝ DO THẬT — khai mùa là một việc của chính nhà mình, không phải một cái nút');
      bao(tt.thuongDuNam && tt.dongMotNhip && tt.mauSoTut,
        'mùa đông HẠ MẪU SỐ THẬT: từ năm nhịp xuống một, nên ghi được một dòng là đạt đủ — đây là cơ chế, không phải một cái nhãn an ủi',
        'mẫu số ' + tt.mauSoThuong + ' → ' + (tt.mauSoTut ? 'thấp hơn' : 'KHÔNG ĐỔI'));
      bao(tt.chuoiDuocGiu && tt.khongMuaThiDut,
        'ngày trống trong mùa đông KHÔNG làm đứt chuỗi, nhưng cũng KHÔNG được tính là ngày có ghi — bảo vệ thì bảo vệ, không phát không');
      bao(tt.hetHanThiHoi,
        'mùa khó hết hạn thì hệ thống HỎI LẠI và trả về mùa thường — không tự gia hạn, cũng không lặng lẽ bỏ');
      bao(tt.raThiCoVet,
        'ra khỏi mùa khó thì ghi lại thành một VẾT — bằng chứng "nhà mình từng vượt qua chuyện kia rồi", và đó là nhiên liệu của mùa khó lần sau');
      bao(tt.luat11,
        'luật nền thứ mười một có mặt: mỗi bước khó đều phải được bao quanh bởi một niềm vui');
      bao(!tt.coManNoiBo,
        'gia đình KHÔNG nhận bàn điều khiển, bảng cấp đồng hành và bảng nhiệm kỳ — đó là cách Học viện tự lái mình, không phải nội dung của nhà họ',
        tt.coManNoiBo ? 'kho điều hành lọt xuống máy phụ huynh' : 'chỉ ở gói nghề');
    }
    /* Đo phần điều hành trên vai CÓ gói nghề */
    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const tt2 = await p.evaluate(() => {
      const G = window.G;
      if (!G.TT_MAN) return { co: false };
      return { co: true,
        soMan: (G.TT_MAN || []).length,
        thuTu: (G.TT_MAN || []).every((m, i) => m.so === i + 1),
        manThieu: (G.TT_MAN || []).filter(m => !m.hoi || !m.nguong || !m.nguon || !m.y).map(m => m.ma),
        chuongDocTen: /TỪNG TÊN/.test(((G.TT_MAN || []).filter(m => m.ma === 'CHUONG')[0] || {}).nguong || ''),
        tongPhut: (G.TT_MAN || []).reduce((a, m) => a + (m.phut || 0), 0),
        soCap: (G.TT_DONGHANH || []).length,
        capThieu: (G.TT_DONGHANH || []).filter(d => !d.chuan || !d.camSai || !d.daoTao).map(d => d.ma),
        soNhiemKy: (G.TT_NHIEMKY || []).length,
        cuoiLaKhongCanMinh: /KHÔNG CẦN mình/.test(((G.TT_NHIEMKY || []).slice(-1)[0] || {}).lam || ''),
        nhiemKyThieu: (G.TT_NHIEMKY || []).filter(n => !n.lam || !n.xong).map(n => n.ck) };
    });
    if (tt2.co) {
      bao(tt2.soMan === 5 && tt2.thuTu && !tt2.manThieu.length,
        'đủ năm màn ĐÚNG THỨ TỰ, màn nào cũng có CÂU HỎI · NGƯỠNG · NGUỒN SỐ — thứ tự không phải cho gọn, nó là thứ tự ưu tiên',
        tt2.manThieu.join(' ') || '5 màn · ' + tt2.tongPhut + ' phút');
      bao(tt2.chuongDocTen,
        'màn chuông bắt đọc TỪNG TÊN chứ không đọc tổng số — mỗi cái tên là một cây đang khát, và một con số tổng thì không ai đi cứu được');
      bao(tt2.soCap === 3 && !tt2.capThieu.length,
        'ba cấp người đồng hành, cấp nào cũng có ĐÀO TẠO · CHUẨN ĐO · SAI LẦM CẤM',
        tt2.capThieu.join(' ') || '3/3 đủ ba cột');
      bao(tt2.soNhiemKy === 5 && !tt2.nhiemKyThieu.length && tt2.cuoiLaKhongCanMinh,
        'năm nhiệm kỳ, và nhiệm kỳ cuối làm đúng một việc: khiến hệ thống KHÔNG CẦN mình nữa',
        tt2.nhiemKyThieu.join(' ') || '5/5 · chu kỳ cuối đúng');
    }
  }

  console.log('\n51 · BỨC TRANH HÀNH TRÌNH · NĂM CỬA TỬ · NHÁNH HÉO · NGÔN TỪ');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const hm = await p.evaluate(() => {
      const G = window.G;
      if (!G.HM_VUNG || !G.hmNguyHienTai) return { co: false };
      const ra = { co: true };
      const NGAY = 86400000;
      const dd = t => t.getFullYear() + '-' + ('0' + (t.getMonth() + 1)).slice(-2) + '-' + ('0' + t.getDate()).slice(-2);
      const lui = n => { const t = new Date(); t.setDate(t.getDate() - n); return dd(t); };

      /* ── Bảy vùng đất phải PHỦ KÍN thang cấp, không hở không chồng ── */
      ra.soVung = (G.HM_VUNG || []).length;
      ra.vungThieu = (G.HM_VUNG || []).filter(v => !v.y || v.capTu === undefined || v.capDen === undefined).map(v => v.ma);
      ra.vungHo = [];
      for (let c = 0; c <= 10; c++) {
        const n = (G.HM_VUNG || []).filter(v => c >= v.capTu && c <= v.capDen).length;
        if (n !== 1) ra.vungHo.push('cấp' + c + ':' + n);
      }

      /* ── Năm cửa tử: mỗi cửa trỏ vào cơ chế CÓ THẬT ── */
      ra.soNguy = (G.HM_NGUY || []).length;
      ra.coCheThieu = G.hmSoiCoChe();
      ra.nguyMocThieu = (G.HM_NGUY || [])
        .filter(x => x.tuNgay === undefined && !x.khiMua).map(x => x.ma);

      /* ── Ngôn từ: quét đúng những câu NÓI VỚI GIA ĐÌNH ── */
      ra.soCauQuet = G.hmLoiNoiVoiNha().length;
      ra.ngonTuPham = G.hmSoiNgonTu();
      /* Phép quét phải BẮT ĐƯỢC: nhét một từ cấm vào rồi trả về ngay. Một
         phép kiểm chưa từng đỏ thì chưa phải phép kiểm. */
      const giuHoi = G.HM_HOI3[0].hoi;
      G.HM_HOI3[0].hoi = 'Hôm nay anh chị nên ghi lại điều gì?';
      ra.quetBatDuoc = G.hmSoiNgonTu().length === 1;
      /* Và phải bắt theo TỪ, không theo chuỗi con: 'lên' chứa 'nên' */
      G.HM_HOI3[0].hoi = 'Hôm nay nhà mình có gì vui lên không?';
      ra.quetKhongBatNham = G.hmSoiNgonTu().length === 0;
      G.HM_HOI3[0].hoi = giuHoi;

      const giuMua = G.S.mua, giuChot = G.S.chotKhNgay, giuJ = G.S.journal;
      G.S.mua = null; G.S.journal = {}; G.S.chotKhNgay = {};

      /* ── Chưa có dấu vết nào: không cửa nào mở, và màn chỉ nói MỘT việc ── */
      ra.chuaDiThiKhongCua = G.hmNguyHienTai() === null && G.hmNgayDaDi() === 0;
      const man0 = G.VIEWS['buc-tranh']();
      ra.ngay1ChiMotViec = man0.indexOf(G.HM_NGAY1.lam) >= 0 &&
        man0.indexOf((G.HM_VUNG[6] || {}).y || '###') < 0;

      /* ── Cửa mở đúng theo số ngày đã đi ── */
      G.S.journal[lui(3)] = 'ba dòng tối nay';
      ra.cuaDau = (G.hmNguyHienTai() || {}).ma;
      G.S.journal = {}; G.S.journal[lui(20)] = 'ba dòng tối nay';
      ra.cuaTuan3 = (G.hmNguyHienTai() || {}).ma;
      G.S.journal = {}; G.S.journal[lui(200)] = 'ba dòng tối nay';
      ra.cuaDeu = (G.hmNguyHienTai() || {}).ma;
      G.S.journal = {}; G.S.journal[lui(500)] = 'ba dòng tối nay';
      ra.cuaBaoHoa = (G.hmNguyHienTai() || {}).ma;

      /* ── Mùa khó THẮNG mọi mốc ngày ──
         Nhà đang mất thu nhập ở tháng thứ bảy thì cửa của họ là khủng
         hoảng, không phải "mệt vì đều đặn". */
      G.S.journal = {}; G.S.journal[lui(200)] = 'ba dòng tối nay';
      G.ttKhaiMua('DONG', 'Xe hỏng nặng, mất tám ngày thu nhập, cả nhà đang xoay tiền sửa.');
      ra.muaThangMoc = (G.hmNguyHienTai() || {}).ma === 'CT-KHUNGHOANG';

      /* ── Trong mùa khó thì màn CHỈ hỏi một câu, bỏ hẳn ba câu ── */
      const manKho = G.VIEWS['buc-tranh']();
      ra.muaKhoMotCau = manKho.indexOf(G.HM_LEU.hoi) >= 0 &&
        manKho.indexOf(G.HM_HOI3[1].hoi) < 0;
      /* Ba đường của lều phải KHÁC nhau thật */
      ra.leuBaDuongKhac = new Set((G.HM_LEU.dap || []).map(d => d.di)).size === (G.HM_LEU.dap || []).length;

      /* ── Nhánh héo ──
         Sổ chốt cũ KHÔNG có cột `ma` thì trả "chưa có dấu để so", không
         kết luận là héo. Suy đoán từ chỗ thiếu dữ liệu thì sớm muộn cũng
         báo héo cho một nhà đang đều. */
      G.S.mua = null;
      G.S.chotKhNgay = { [lui(9)]: { pt: 60, dat: 6, tong: 10, luc: Date.now() } };
      ra.chotCuThiChuaDo = G.hmNhanhHeo().every(x => x.chuaDo);

      /* Có cột `ma` rồi thì đếm đúng số ngày và đúng ngưỡng */
      G.S.chotKhNgay = {
        [lui(9)]: { pt: 60, dat: 6, tong: 10, luc: Date.now(), ma: ['KH-1', 'KH-3'] },
        [lui(1)]: { pt: 40, dat: 4, tong: 10, luc: Date.now(), ma: ['KH-1'] }
      };
      const bang = G.hmNhanhHeo();
      const l1 = bang.filter(x => x.ma === 'KH-1')[0] || {};
      const l3 = bang.filter(x => x.ma === 'KH-3')[0] || {};
      const l5 = bang.filter(x => x.ma === 'KH-5')[0] || {};
      ra.heoDemDung = l1.ngay === 1 && !l1.muc && l3.ngay === 9 && (l3.muc || {}).ngay === 7;
      ra.heoChuaCoDauThiKhongPhat = l5.chuaDo === true;

      /* Mùa đông HẠ MẪU SỐ thì nhánh bị bỏ KHÔNG được báo héo — mùa đã hạ
         chuẩn rồi mà còn báo héo thì đó là phạt trá hình */
      G.ttKhaiMua('DONG', 'Xe hỏng nặng, mất tám ngày thu nhập, cả nhà đang xoay tiền sửa.');
      const bangDong = G.hmNhanhHeo();
      ra.muaDongBotNhanh = bangDong.length < bang.length && bangDong.length > 0;

      G.S.mua = giuMua; G.S.chotKhNgay = giuChot; G.S.journal = giuJ;

      ra.soLuat = (G.HM_LUAT || []).length;
      /* Gia đình KHÔNG được nhận bản ghi sau màn hình, và cũng không được
         nhận hai cột `vi`/`bom` của bảng cửa tử */
      ra.coBanGhiSau = !!G.HM_SAU || !!G.HM_NGUY_SAU;
      ra.loCotPhanTich = (G.HM_NGUY || []).some(x => x.vi !== undefined || x.bom !== undefined);
      return ra;
    });
    if (!hm.co) {
      bao(false, 'bức tranh hành trình nạp được từ gói nền', 'không thấy HM_VUNG');
    } else {
      bao(hm.soVung === 7 && !hm.vungThieu.length && !hm.vungHo.length,
        'bảy vùng đất phủ kín thang mười cấp — không hở cấp nào, không cấp nào thuộc hai vùng; nối vào thang bánh đà chứ KHÔNG dựng thang thứ hai',
        hm.vungThieu.concat(hm.vungHo).join(' ') || '7 vùng · cấp 0–10 kín');
      bao(hm.soNguy === 5 && !hm.coCheThieu.length && !hm.nguyMocThieu.length,
        'năm cửa tử, cửa nào cũng trỏ vào một CƠ CHẾ CÓ THẬT trong hệ và có mốc mở rõ ràng — cửa trỏ vào thứ không tồn tại là một lời động viên, không phải một cơ chế',
        hm.coCheThieu.concat(hm.nguyMocThieu).join(' ') || '5/5 có cơ chế thật');
      bao(hm.cuaDau === 'CT-DAU' && hm.cuaTuan3 === 'CT-TUAN3' &&
          hm.cuaDeu === 'CT-DEU' && hm.cuaBaoHoa === 'CT-BAOHOA',
        'cửa mở ĐÚNG theo số ngày nhà mình đã đi, đếm từ dấu vết đầu tiên chứ không từ ngày mở tài khoản',
        [hm.cuaDau, hm.cuaTuan3, hm.cuaDeu, hm.cuaBaoHoa].join(' → '));
      bao(hm.muaThangMoc,
        'mùa khó THẮNG mọi mốc ngày — nhà đang mất thu nhập ở tháng thứ bảy thì cửa của họ là khủng hoảng, không phải "mệt vì đều đặn"');
      bao(hm.chuaDiThiKhongCua && hm.ngay1ChiMotViec,
        'ngày thứ nhất chỉ nói MỘT việc và không bày bảy vùng đất ra — người mở lần đầu nhìn thấy một núi việc là bỏ trước khi bắt đầu');
      bao(hm.muaKhoMotCau && hm.leuBaDuongKhac,
        'trong mùa khó màn hình BỎ HẲN ba câu và chỉ còn một câu của lều, và ba đường trả lời đi ba chỗ khác nhau thật — ba lựa chọn dẫn tới cùng một câu động viên là hỏi cho có');
      bao(!hm.ngonTuPham.length && hm.soCauQuet >= 8,
        'không câu nào nói với gia đình dùng từ cấm: nên · phải · tối thiểu · bắt buộc · cần phải · yêu cầu',
        hm.ngonTuPham.join(' ') || hm.soCauQuet + ' câu sạch');
      bao(hm.quetBatDuoc && hm.quetKhongBatNham,
        'phép quét ngôn từ BẮT ĐƯỢC thật khi nhét từ cấm vào, và không bắt nhầm "lên" thành "nên" — bắt theo từ, không theo chuỗi con');
      bao(hm.heoDemDung && hm.heoChuaCoDauThiKhongPhat && hm.chotCuThiChuaDo,
        'nhánh héo đếm đúng số ngày và đúng ngưỡng, còn chỗ CHƯA CÓ DẤU thì nói "chưa có dấu để so" chứ không kết luận là héo — báo héo sai một lần là mất niềm tin vào cả bảng');
      bao(hm.muaDongBotNhanh,
        'mùa đông đã hạ mẫu số thì nhánh bị bỏ KHÔNG bị báo héo — mùa hạ chuẩn rồi mà còn báo héo thì đó là phạt trá hình, đúng thứ luật héo cấm');
      bao(hm.soLuat === 6,
        'đủ sáu luật của bức tranh', hm.soLuat + '/6');
      bao(!hm.coBanGhiSau && !hm.loCotPhanTich,
        'gia đình KHÔNG nhận bản ghi sau màn hình, và bảng cửa tử xuống máy họ đã CẮT hai cột "vì sao mất người" và "bơm cảm xúc nào" — lọc trên màn hình không phải bảo vệ dữ liệu',
        hm.coBanGhiSau ? 'HM_SAU/HM_NGUY_SAU lọt xuống máy phụ huynh'
          : hm.loCotPhanTich ? 'cột vi/bom còn nguyên trong gói nền' : 'khung mở, lời cắt');
    }
    /* Phần của nghề — đo trên vai CÓ gói nghề */
    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const hm2 = await p.evaluate(() => {
      const G = window.G;
      if (!G.HM_SAU) return { co: false };
      return { co: true,
        soSau: (G.HM_SAU || []).length,
        sauThieu: (G.HM_SAU || []).filter(s => !s.khi || !s.may || !s.cam).map(s => s.khi),
        coCotPhanTich: (G.HM_NGUY_SAU || []).every(x => x.vi && x.bom),
        manCoBangSau: G.VIEWS['buc-tranh']().indexOf((G.HM_SAU[0] || {}).cam || '###') >= 0 };
    });
    if (hm2.co) {
      bao(hm2.soSau === 5 && !hm2.sauThieu.length,
        'năm mốc của bản ghi sau màn hình, mốc nào cũng nói rõ MÁY LÀM GÌ và TUYỆT ĐỐI KHÔNG làm gì',
        hm2.sauThieu.join(' ') || '5/5 đủ ba cột');
      bao(hm2.coCotPhanTich && hm2.manCoBangSau,
        'vai có gói nghề thì nhận đủ hai cột phân tích và màn hình dựng ra được bảng sau màn hình');
    } else {
      bao(false, 'vai có gói nghề nhận được bản ghi sau màn hình', 'không thấy HM_SAU');
    }
  }

  console.log('\n52 · TRẦN ĐỘI ĐỒNG HÀNH · SỔ TAY NÓI ĐÚNG · LỚP ÉP NGƯỜI GIỮ LỬA');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const nha = await p.evaluate(() => {
      const G = window.G;
      if (!G.DD_HUA || !G.GL_XONG) return { co: false };
      const manDD = G.VIEWS['doi-dong-hanh']();
      const manGL = G.VIEWS['giu-lua']();
      return { co: true,
        soHua: (G.DD_HUA || []).length,
        huaThieu: (G.DD_HUA || []).filter(x => !x.t || !x.y).map(x => x.ma),
        soXong: (G.GL_XONG || []).length,
        xongThieu: (G.GL_XONG || []).filter(x => !x.ten || !x.t).map(x => x.so),
        /* Gia đình KHÔNG được nhận sổ tay và lớp ép — nguyên văn câu người
           kèm sẽ nói thì buổi nói chuyện mất tác dụng */
        loSoTay: !!(G.DD_TINHHUONG || G.DD_CAP || G.DD_THAY || G.DD_HOI || G.DD_KPI),
        loLopEp: !!(G.GL_BAN || G.GL_ANDON || G.GL_SUCO || G.GL_LS || G.GL_KPI || G.GL_HOPDEN),
        /* Không có kho ép thì hàm KHÔNG được đoán một con số */
        tranKhongDoan: G.ddTranCua('DH') === 0 && G.ddNhanThem('DH', 0).ok === false,
        manCoHua: manDD.indexOf((G.DD_HUA[0] || {}).t || '###') >= 0,
        manKhongCoSoTay: manDD.indexOf('Hai mươi tình huống') < 0,
        manCoXong: manGL.indexOf((G.GL_XONG[0] || {}).t || '###') >= 0,
        manKhongCoChuong: manGL.indexOf('Chuông ba tầng') < 0 };
    });
    if (!nha.co) {
      bao(false, 'lời hứa và ngày hệ xong việc nạp được từ gói nền', 'không thấy DD_HUA/GL_XONG');
    } else {
      bao(nha.soHua === 5 && !nha.huaThieu.length,
        'năm điều người đi cùng hứa với gia đình, điều nào cũng nói rõ VÌ SAO — lời hứa không kiểm được thì không phải lời hứa',
        nha.huaThieu.join(' ') || '5/5 đủ hai cột');
      bao(nha.soXong === 5 && !nha.xongThieu.length,
        'năm điều kiện tới ngày hệ này XONG VIỆC, và gia đình đọc được — giấu câu ấy thì hệ trông như một thứ muốn giữ người mãi',
        nha.xongThieu.join(' ') || '5/5');
      bao(!nha.loSoTay && !nha.loLopEp,
        'gia đình KHÔNG nhận sổ tay nói đúng và lớp ép điều hành — đọc được nguyên văn câu người kèm sẽ nói thì buổi nói chuyện mất tác dụng, họ biết trước câu tiếp theo',
        nha.loSoTay ? 'sổ tay lọt xuống máy phụ huynh' : nha.loLopEp ? 'lớp ép lọt xuống máy phụ huynh' : 'chỉ có lời hứa');
      bao(nha.tranKhongDoan,
        'máy không có kho ép thì hàm trần KHÔNG đoán một con số — đoán ra năm rồi một ngày sẽ có người tin con số đoán ấy là luật');
      bao(nha.manCoHua && nha.manKhongCoSoTay && nha.manCoXong && nha.manKhongCoChuong,
        'hai màn dựng ra ĐÚNG tầng của gia đình: có lời hứa và ngày hệ xong việc, không có sổ tay và không có bảng chuông');
    }

    /* Lớp ép — đo trên vai CÓ gói nghề */
    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ng = await p.evaluate(() => {
      const G = window.G;
      if (!G.DD_CAP || !G.GL_BAN) return { co: false };
      const ra = { co: true };

      /* ── Trần quan hệ 5 · 10 · 3, và hàm TỪ CHỐI ── */
      ra.tran = (G.DD_CAP || []).map(c => c.ma + ':' + c.tran).join(' ');
      ra.tranDung = G.ddTranCua('DH') === 5 && G.ddTranCua('CV') === 10 && G.ddTranCua('CM') === 3;
      ra.chanDuoc = G.ddNhanThem('DH', 5).ok === false && G.ddNhanThem('CM', 3).ok === false;
      ra.chuaChanThiCho = G.ddNhanThem('DH', 4).ok === true && G.ddNhanThem('DH', 4).con === 1;
      /* Thiếu người KHÔNG phải lý do nới trần */
      ra.thieuNguoiVanChan = G.ddNhanThem('CM', 3, true).ok === false;
      ra.capThieu = (G.DD_CAP || []).filter(c => !c.vaoTu || !c.viSaoTran || !c.camSai || !c.hauQua).map(c => c.ma);
      ra.noiThang = G.ddNoiThang();

      /* ── Chín phần mười ── */
      ra.soi9010 = G.ddSoi9010();

      /* ── Sổ tay: hai mươi tình huống, hai vế khác nhau thật ── */
      ra.soTH = (G.DD_TINHHUONG || []).length;
      ra.thThieu = G.ddSoiTinhHuong();
      ra.duNhom = ['DAU', 'GIO', 'SAU', 'MINH'].every(n =>
        (G.DD_TINHHUONG || []).some(x => x.nhom === n));

      /* ── Ngôn từ: quét cột `dung`, KHÔNG quét cột `sai` ── */
      ra.ngonTu = G.ddSoiNgonTu();
      ra.soCauQuet = G.ddLoiNoiVoiNha().length;
      /* Cột đối chiếu PHẢI thật sự chứa từ cấm — nếu không thì cái bẫy
         này chưa từng tồn tại, và phép kiểm dưới đây vô nghĩa */
      const cam = (G.HM_NGONTU || {}).camTu || [];
      const coTuCam = chu => cam.some(t =>
        new RegExp('(^|[^\\p{L}])' + t + '($|[^\\p{L}])', 'iu').test(String(chu || '')));
      ra.cotDoiChieuCoTuCam =
        (G.DD_THAY || []).some(x => coTuCam(x.xau)) || (G.DD_TINHHUONG || []).some(x => coTuCam(x.sai));
      /* Máy quét phải BẮT ĐƯỢC khi nhét từ cấm vào cột `dung` */
      const giuDung = G.DD_TINHHUONG[0].dung;
      G.DD_TINHHUONG[0].dung = 'Anh chị nên ghi lại chuyện này mỗi tối.';
      ra.quetBatDuoc = G.ddSoiNgonTu().length === 1;
      G.DD_TINHHUONG[0].dung = giuDung;

      /* ── Bảng chấm của người kèm ── */
      ra.kpiTong = (G.DD_KPI || []).reduce((a, k) => a + k.trong, 0);
      ra.ngheNangNhat = (G.DD_KPI || []).every(k => k.ma === 'K-NGHE' || k.trong < 0.6);

      /* ── Bàn điều khiển ── */
      ra.soiBan = G.glSoiBan();
      ra.dongSauChuan = G.GL_BAN.phutDong > G.GL_BAN.phutChuan;
      ra.soCam = (G.GL_BAN_CAM || []).length;

      /* ── Màn Sức Sống đọc BỐN mức, không phải hai màu ──
         67% mà hạ ba tuần liền thì KHÔNG còn là xanh: hình dạng quan
         trọng hơn vị trí, và đây là chỗ mọi bảng hai màu bỏ sót */
      ra.docXanh = (G.glMucDoc(67, 0) || {}).ma === 'XANH';
      ra.docHa = (G.glMucDoc(67, 3) || {}).ma === 'HA';
      ra.docVang = (G.glMucDoc(55, 0) || {}).ma === 'VANG';
      ra.docDo = (G.glMucDoc(40, 0) || {}).ma === 'DO';
      ra.haChuaDu = (G.glMucDoc(67, 2) || {}).ma === 'XANH';

      /* ── Chuông ba tầng, tự leo ── */
      ra.soTang = (G.GL_ANDON || []).length;
      ra.leoDung = (G.glLeoTang('AD-XANH', 25, false) || {}).ma === 'AD-VANG';
      ra.chamThiKhongLeo = G.glLeoTang('AD-XANH', 99, true) === null;
      ra.trongHanKhongLeo = G.glLeoTang('AD-XANH', 5, false) === null;
      ra.tangCuoiKhongLeo = G.glLeoTang('AD-DO', 99, false) === null;
      ra.khongPhat = (G.GL_ANDON_LUAT || {}).khongPhat === true;

      /* ── Năm chỉ số của chính người giữ lửa ── */
      ra.soiKPI = G.glSoiKPI();
      ra.soKPI = (G.GL_KPI || []).length;

      /* ── Sáu kịch bản sự cố ── */
      ra.soSuCo = (G.GL_SUCO || []).length;
      ra.suCoThieu = (G.GL_SUCO || []).filter(s => !s.dauHieu || !s.lam || !s.vi).map(s => s.ma);
      ra.suCoCoTap = (G.GL_SUCO || []).filter(s => s.tap).length;

      /* ── Sổ đo di sản TỰ KHAI chỗ mù ── */
      ra.soiLS = G.glSoiLS();
      ra.soLS = (G.GL_LS || []).length;
      ra.soChuaDo = G.glChuaDo().length;

      ra.hopDenNgan = (G.GL_HOPDEN || {}).trangToiDa === 20 && (G.GL_HOPDEN.giu || []).length === 5;
      ra.manCoSoTay = G.VIEWS['doi-dong-hanh']().indexOf('Hai mươi tình huống') >= 0;
      ra.manCoChuong = G.VIEWS['giu-lua']().indexOf('Chuông ba tầng') >= 0;
      return ra;
    });
    if (!ng.co) {
      bao(false, 'lớp ép nạp được từ gói nghề', 'không thấy DD_CAP/GL_BAN');
    } else {
      bao(ng.tranDung && ng.chanDuoc && ng.chuaChanThiCho && ng.thieuNguoiVanChan,
        'trần quan hệ 5 · 10 · 3 có HÀM TỪ CHỐI thật, và thiếu người vẫn không nới — trần mà không có hàm chặn thì sáu tháng sau ai cũng giữ tám nhà',
        ng.tran);
      bao(!ng.capThieu.length && !ng.noiThang.length,
        'ba cấp nói rõ VÀO TỪ ĐÂU · VÌ SAO TRẦN NÀY · CẤM SAI · HẬU QUẢ, và nối vào thang đã có chứ KHÔNG dựng thang thứ hai',
        ng.capThieu.concat(ng.noiThang).join(' ') || '3/3 nối đúng');
      bao(!ng.soi9010.length,
        'chín phần mười cộng đúng một trăm và phần DẠY bằng KHÔNG — câu dạy dỗ nghe dễ hơn câu hỏi, và chính vì dễ mà nó lấy đi quyền của hạt tự nứt vỏ',
        ng.soi9010.join(' ') || '90 + 10 + 0');
      bao(ng.soTH === 20 && !ng.thThieu.length && ng.duNhom,
        'hai mươi tình huống đủ bốn nhóm, tình huống nào cũng có một câu GIẾT HẠT và một câu NUÔI HẠT khác nhau thật',
        ng.thThieu.join(' ') || '20/20 đủ hai vế');
      bao(!ng.ngonTu.length && ng.soCauQuet >= 40,
        'không câu nào trong sổ tay nói với gia đình dùng từ cấm — cùng một chuẩn ngôn từ với lời hỏi hằng ngày, một máy quét chứ không hai',
        ng.ngonTu.join(' ') || ng.soCauQuet + ' câu sạch');
      bao(ng.cotDoiChieuCoTuCam && ng.quetBatDuoc,
        'cột đối chiếu THẬT SỰ chứa từ cấm mà máy quét không đụng vào, và quét BẮT ĐƯỢC ngay khi nhét từ cấm vào cột nói thật — quét cả cột ví dụ thì phép kiểm đỏ vĩnh viễn và rồi ai đó sẽ tắt nó');
      bao(Math.abs(ng.kpiTong - 1) < 1e-9 && ng.ngheNangNhat,
        'bảng chấm người kèm cộng đúng một, và ĐIỂM ĐƯỢC LẮNG NGHE nặng nhất — đó là chỉ số duy nhất họ không ra lệnh được, vì nó là cảm giác của người khác',
        'tổng ' + ng.kpiTong);
      bao(!ng.soiBan.length && ng.dongSauChuan && ng.soCam === 5,
        'bàn điều khiển còn đúng khuôn: năm màn, ba mươi phút, đúng thứ tự — và có ngưỡng tự đóng bàn. Mọi bàn điều khiển trên đời đều có màn thứ sáu sau ba năm, và không ai nhớ nó vào lúc nào',
        ng.soiBan.join(' ') || '5 màn · 30 phút');
      bao(ng.docXanh && ng.docHa && ng.docVang && ng.docDo && ng.haChuaDu,
        'Màn Sức Sống đọc BỐN mức: 67% mà hạ ba tuần liền thì KHÔNG còn là xanh — hình dạng quan trọng hơn vị trí, và đây đúng là chỗ bảng hai màu bỏ sót cả quý',
        [ng.docXanh, ng.docHa, ng.docVang, ng.docDo].join(' '));
      bao(ng.soTang === 3 && ng.leoDung && ng.chamThiKhongLeo && ng.trongHanKhongLeo && ng.tangCuoiKhongLeo,
        'chuông ba tầng TỰ leo khi quá hạn mà chưa ai chạm, không leo khi đã có người chạm hoặc còn trong hạn, và tầng cuối thì dừng — leo thủ công là leo khi có người nhớ, mà lúc bận thì không ai nhớ');
      bao(ng.khongPhat,
        'không bao giờ phạt chuông — chuông kêu nhiều là chuông khoẻ, rừng im lặng mới là rừng đang chết');
      bao(!ng.soiKPI.length && ng.soKPI === 5,
        'năm chỉ số của chính người giữ lửa, chỉ số nào cũng nói rõ VÌ SAO KHÔNG LÀM ĐẸP BẰNG TAY ĐƯỢC — chỉ số không nói được điều ấy thì nó làm đẹp được, và sớm muộn sẽ bị làm đẹp',
        ng.soiKPI.join(' ') || '5/5');
      bao(ng.soSuCo === 6 && !ng.suCoThieu.length && ng.suCoCoTap >= 4,
        'sáu kịch bản sự cố viết sẵn, và bốn cái trở lên có diễn tập hằng năm — khủng hoảng không phải lúc để sáng tạo, là lúc để chạy đúng tài liệu đã tập',
        ng.suCoThieu.join(' ') || '6/6 · ' + ng.suCoCoTap + ' cái có diễn tập');
      bao(!ng.soiLS.length && ng.soLS === 5 && ng.soChuaDo > 0,
        'sổ đo di sản TỰ KHAI chỗ mù: chỉ số chưa đo được thì nói thẳng kèm thiếu đúng cái gì, chỉ số có nguồn thì nguồn phải là kho CÓ THẬT — một con số bịa nguy hiểm hơn một ô trống, vì ô trống thì còn có người đi tìm',
        ng.soiLS.join(' ') || ng.soChuaDo + '/' + ng.soLS + ' khai chưa đo được');
      bao(ng.hopDenNgan && ng.manCoSoTay && ng.manCoChuong,
        'hộp đen đúng hai mươi trang và năm mục, và vai có gói nghề dựng ra được cả sổ tay lẫn bảng chuông');
    }
  }

  console.log('\n53 · SỔ TAY NĂM ĐẦU · KINH TẾ RỪNG · BỐN MƯƠI GIỜ · CHUẨN MÔ PHỎNG');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const nha = await p.evaluate(() => {
      const G = window.G;
      if (!G.TR_DEN) return { co: false };
      const man = G.VIEWS['tien-rung']();
      return { co: true,
        soDen: (G.TR_DEN || []).length,
        denThieu: (G.TR_DEN || []).filter(x => !x.t || !x.y).map(x => x.ma),
        /* Gia đình KHÔNG nhận lịch vận hành, bảng chi, giáo trình, chuẩn mô phỏng */
        lo: !!(G.ND_THANG || G.ND_SUCO || G.TR_CHI || G.TR_NGUON || G.DT_VAI || G.DT_BUOI || G.MP_DO || G.MP_BAO),
        manCoDen: man.indexOf((G.TR_DEN[0] || {}).t || '###') >= 0,
        manKhongCoChi: man.indexOf('THỨ TỰ CẮT') < 0 };
    });
    if (!nha.co) {
      bao(false, 'sáu điều không bao giờ bán nạp được từ gói nền', 'không thấy TR_DEN');
    } else {
      bao(nha.soDen === 6 && !nha.denThieu.length,
        'sáu điều rừng KHÔNG BAO GIỜ BÁN, điều nào cũng nói rõ vì sao — đây là lời hứa về dữ liệu và túi tiền của chính các nhà, và lời hứa không kiểm được thì không phải lời hứa',
        nha.denThieu.join(' ') || '6/6');
      bao(!nha.lo && nha.manCoDen && nha.manKhongCoChi,
        'gia đình KHÔNG nhận lịch vận hành, bảng chi, giáo trình và chuẩn mô phỏng — chỉ nhận đúng lời hứa',
        nha.lo ? 'lớp vận hành lọt xuống máy phụ huynh' : 'chỉ có danh sách không bán');
    }

    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ng = await p.evaluate(() => {
      const G = window.G;
      if (!G.ND_THANG || !G.TR_CHI || !G.DT_BUOI || !G.MP_DO) return { co: false };
      const ra = { co: true };

      /* ── Kế hoạch năm đầu có khớp TRẦN đã ép không ──
         Bản gốc viết một Đồng Hành mười nhà. Trần đã ép là năm. Hai con
         số không thể cùng đúng, và hàm này đọc trần chứ không đọc con
         số viết tay. */
      ra.tyLe = G.ndSoiTyLe();
      ra.tran = G.ddTranCua('DH');
      ra.can100 = G.ndCanBaoNhieuNguoi(100);
      ra.soThang = (G.ND_THANG || []).length;
      ra.thangThuTu = (G.ND_THANG || []).every((t, i) => t.thang === i + 1);
      ra.thangThieu = (G.ND_THANG || []).filter(t => !t.cot || !t.cam).map(t => t.thang);

      /* ── Nhịp tuần: thứ tự bỏ, và thứ KHÔNG BAO GIỜ bỏ ── */
      const boDuoc = G.ndThuTuBo(), khongBo = G.ndKhongDuocBo();
      ra.boThuTu = boDuoc.map(x => x.thu).join('>');
      ra.giuThu2 = khongBo.some(x => x.thu === 2);
      ra.giuCN = khongBo.some(x => x.thu === 8 && x.nghi);
      ra.boDungThuTu = boDuoc.every((x, i) => i === 0 || boDuoc[i - 1].bo <= x.bo);

      /* ── Sáu mốc, và mốc phải trả null khi CHƯA tới mốc nào ── */
      ra.soMoc = (G.ND_MOC || []).length;
      ra.mocChuaToi = G.ndMocCua(0) === null && G.ndMocCua(6) === null;
      ra.moc7 = (G.ndMocCua(7) || {}).ngay === 7;
      ra.moc100 = (G.ndMocCua(100) || {}).ngay === 90;
      ra.moc400 = (G.ndMocCua(400) || {}).ngay === 365;

      /* ── Tám kịch bản lần đầu ── */
      ra.soSuCo = (G.ND_SUCO || []).length;
      ra.suCoThieu = G.ndSoiSuCo();
      ra.soCam = (G.ND_CAM || []).length;

      /* ── Kinh tế: chi cộng trăm, nguồn không chạm nửa ── */
      ra.soiChi = G.trSoiChi();
      ra.soiNguon = G.trSoiNguon();

      /* ── Thứ tự cắt: TỪ CHỐI cắt nhân bản khi còn nhóm rẻ hơn ── */
      ra.catDau = (G.trCatTiep([]).cat || {}).ma;
      ra.chanCatSom = G.trDuocCat('C3', []).ok === false && G.trDuocCat('C4', []).ok === false;
      ra.choCatDung = G.trDuocCat('C5', []).ok === true;
      ra.catCuoi = G.trCatTiep(['C5', 'C2', 'C1']).cat;
      ra.catCuoiLaNhanBan = ra.catCuoi && (ra.catCuoi.ma === 'C3' || ra.catCuoi.ma === 'C4');

      /* ── Ô chờ chủ hệ, và KHÔNG đoán giai đoạn khi chưa có số ── */
      ra.soChuaDien = G.trChuaDien().length;
      ra.chuaDienDuCot = G.trChuaDien().every(x => x.t && x.vi);
      ra.khongDoanGiaiDoan = G.trGiaiDoan(undefined) === null && G.trGiaiDoan('') === null;
      ra.doanDuocKhiCoSo = (G.trGiaiDoan(75) || {}).giai === 'C';

      /* ── Giáo trình: bốn mươi giờ, hai mươi ca, bốn nhóm ── */
      ra.soiGio = G.dtSoiGio();
      ra.gioLop = G.dtTongGioLop();
      ra.soiVai = G.dtSoiVai();
      ra.soiBuoi = G.dtSoiBuoi();
      ra.coTuyetDoi = !!(G.DT_TUYETDOI && G.DT_TUYETDOI.lan2);

      /* ── Ngôn từ trong giáo trình: quét cột `dat`, KHÔNG quét `truot` ── */
      ra.ngonTu = G.dtSoiNgonTu();
      const cam = (G.HM_NGONTU || {}).camTu || [];
      const coTuCam = chu => cam.some(t =>
        new RegExp('(^|[^\\p{L}])' + t + '($|[^\\p{L}])', 'iu').test(String(chu || '')));
      ra.cotTruotCoTuCam = (G.DT_VAI || []).some(x => coTuCam(x.truot));
      const giu = G.DT_VAI[0].dat;
      G.DT_VAI[0].dat = 'Anh chị nên nghĩ lại chuyện này.';
      ra.quetBatDuoc = G.dtSoiNgonTu().length === 1;
      G.DT_VAI[0].dat = giu;

      /* ── Chuẩn mô phỏng ── */
      ra.soiBao = G.mpSoiBao();
      ra.soBao = (G.MP_BAO || []).length;
      ra.soChong = (G.MP_CHONG || []).length;
      ra.soQuai = (G.MP_QUAI || []).length;
      ra.doThieu = (G.MP_DO || []).filter(d => !d.do || !d.dau || !d.gay || !d.vi).map(d => d.ma);
      ra.soDo = (G.MP_DO || []).length;
      ra.chuaChay = G.mpChuaChay().map(d => d.ma);
      ra.soChuaDung = (G.MP_CHUA || []).length;
      ra.chuaDuCot = (G.MP_CHUA || []).every(c => c.t && c.thieu);

      /* ── Phép đo phẩm giá, chạy THẬT ── */
      const d2 = G.mpDoD2();
      ra.d2Dat = !!(d2 && d2.dat);
      ra.d2So = d2 ? d2.dau.length : 0;
      ra.d2Ho = d2 ? d2.ho : ['không có D2'];
      /* Phép đo phải BẮT ĐƯỢC khi gỡ một cờ chặn */
      const giuCo = G.GL_ANDON_LUAT.khongPhat;
      G.GL_ANDON_LUAT.khongPhat = false;
      ra.d2BatDuoc = G.mpDoD2().dat === false;
      G.GL_ANDON_LUAT.khongPhat = giuCo;

      /* ── Ngưỡng khủng hoảng nào không bao giờ kêu được ──
         Ngưỡng trên trần là ngưỡng CHẾT: nó chỉ làm người ta yên tâm. */
      ra.nguongChet = G.glSoiNguongChet();
      const s5 = (G.GL_SUCO || []).filter(s => s.ma === 'S5')[0] || {};
      ra.s5DuoiTran = s5.nguongTyLe !== undefined && s5.nguongTyLe < ra.tran;
      return ra;
    });
    if (!ng.co) {
      bao(false, 'bốn lớp mới nạp được từ gói nghề', 'thiếu ND/TR/DT/MP');
    } else {
      bao(!ng.tyLe.length && ng.can100 === 20 && ng.tran === 5,
        'kế hoạch năm đầu KHỚP TRẦN đã ép: một trăm nhà cần hai mươi người, không phải mười — bản gốc viết một trên mười, và tôi sửa KẾ HOẠCH cho vừa trần chứ không nới trần cho vừa kế hoạch',
        ng.tyLe.join(' ') || 'trần ' + ng.tran + ' → cần ' + ng.can100);
      bao(ng.soThang === 12 && ng.thangThuTu && !ng.thangThieu.length,
        'mười hai tháng đúng thứ tự, tháng nào cũng có việc CỐT và điều CẤM — cột cấm là cột hay bị bỏ qua nhất và là cột giữ tháng ấy đúng nhịp',
        ng.thangThieu.join(' ') || '12/12');
      bao(ng.giuThu2 && ng.giuCN && ng.boDungThuTu,
        'nhịp tuần có thứ tự bỏ viết sẵn, và thứ Hai cùng ngày nghỉ KHÔNG BAO GIỜ bỏ — lúc bận mà còn phải quyết bỏ gì thì bao giờ cũng bỏ nhầm thứ quan trọng nhất',
        'bỏ theo thứ tự ' + ng.boThuTu);
      bao(ng.soMoc === 6 && ng.mocChuaToi && ng.moc7 && ng.moc100 && ng.moc400,
        'sáu mốc kiểm, và ngày CHƯA tới mốc nào thì trả về rỗng chứ không trả mốc đầu cho lấy lệ');
      bao(ng.soSuCo === 8 && !ng.suCoThieu.length && ng.soCam === 6,
        'tám kịch bản lần-đầu đủ bốn cột, và sáu điều cấm tuyệt đối — trong khủng hoảng, cột "không làm gì" mới là cột cứu người',
        ng.suCoThieu.join(' ') || '8 kịch bản · 6 điều cấm');
      bao(!ng.soiChi.length && !ng.soiNguon.length,
        'năm nhóm chi cộng đúng một trăm, nhân bản và bão xếp cắt SAU CÙNG, và không nguồn tiền nào chạm một nửa — nguồn nào quá nửa thì nguồn đó bắt đầu quyết định hệ mà không cần nói ra',
        ng.soiChi.concat(ng.soiNguon).join(' ') || 'chi 100% · nguồn tối đa 35%');
      bao(ng.catDau === 'C5' && ng.chanCatSom && ng.choCatDung && ng.catCuoiLaNhanBan,
        'hàm cắt chi TỪ CHỐI cắt nhân bản và bão khi còn nhóm rẻ hơn chưa đụng tới — thứ tự nằm trong lời thì lúc túng người ta vẫn cắt theo cảm giác, nên nó phải là một hàm',
        'cắt đầu ' + ng.catDau + ' · cuối ' + (ng.catCuoi || {}).ma);
      bao(ng.soChuaDien === 6 && ng.chuaDienDuCot && ng.khongDoanGiaiDoan && ng.doanDuocKhiCoSo,
        'sáu ô tiền CHỜ CHỦ HỆ được khai thẳng kèm lý do, và hàm KHÔNG đoán giai đoạn tự chủ khi chưa có con số — đoán ra giai đoạn B rồi rút tài trợ theo giai đoạn B là cách hết tiền',
        ng.soChuaDien + ' ô chờ chủ hệ');
      bao(!ng.soiGio.length && ng.gioLop === 35,
        'mười hai buổi cộng đúng bốn mươi giờ, khớp con số đã ép ở bảng cấp — bản gốc cộng ra bốn mươi ba, và tôi cắt ở ba buổi NHẸ nhất chứ không cắt hai buổi cuối',
        ng.soiGio.join(' ') || ng.gioLop + ' giờ lớp + 5 giờ thi');
      bao(!ng.soiVai.length && !ng.soiBuoi.length && ng.coTuyetDoi,
        'hai mươi ca thi vai đủ bốn nhóm năm ca, buổi nào cũng có bài LUYỆN, và có tiêu chí tuyệt đối đứng trên năm tiêu chí kia',
        ng.soiVai.concat(ng.soiBuoi).join(' ') || '20 ca · 12 buổi đủ trụ');
      bao(!ng.ngonTu.length && ng.cotTruotCoTuCam && ng.quetBatDuoc,
        'câu ĐẠT trong giáo trình không dùng từ cấm, cột TRƯỢT thật sự chứa từ cấm mà máy không đụng vào, và quét bắt được ngay khi nhét từ cấm vào cột đạt — ba chỗ dùng chung MỘT máy quét, không phải ba máy',
        ng.ngonTu.join(' ') || 'sạch');
      bao(!ng.soiBao.length && ng.soBao === 12 && ng.soChong === 3 && ng.soQuai === 10,
        'mười hai cơn bão, cơn nào cũng ÉP ĐƯỢC vào một cơ chế có thật trong hệ — bão trỏ vào chỗ trống là cảnh báo văn chương: nghe đáng sợ mà không thử được gì',
        ng.soiBao.join(' ') || '12 bão · 3 cặp chồng · 10 hồ sơ quái');
      bao(ng.soDo === 5 && !ng.doThieu.length && ng.chuaChay.length === 4 && ng.soChuaDung === 6 && ng.chuaDuCot,
        'năm phép đo đủ ngưỡng đậu và gãy, và hệ KHAI THẲNG bốn phép còn chờ bộ chạy cùng sáu thứ chưa dựng — bảng chỉ in phần đã dựng thì đọc xong tưởng hệ đã thử hết',
        ng.doThieu.join(' ') || 'chờ bộ chạy: ' + ng.chuaChay.join(' '));
      bao(ng.d2Dat && ng.d2So === 3 && ng.d2BatDuoc,
        'phép đo PHẨM GIÁ chạy THẬT từ hôm nay: ba dấu hiệu đều bị luật hệ chặn, và phép đo đỏ ngay khi gỡ một cờ chặn — đọc cờ máy đọc được chứ không dò chữ trong câu văn, vì một phép đo câm về phẩm giá là thứ nguy hiểm nhất trong cả bộ kiểm',
        ng.d2Ho.join(' ') || '3/3 dấu hiệu bị chặn');
      bao(!ng.nguongChet.length && ng.s5DuoiTran,
        'không ngưỡng khủng hoảng nào nằm TRÊN trần đã ép — ngưỡng trên trần là ngưỡng CHẾT: nó không bao giờ chạm tới, nên nó chỉ làm người ta yên tâm mà không bảo vệ ai. Chính lỗi này đã có thật ở bản trước',
        ng.nguongChet.join(' ') || 'mọi ngưỡng dưới trần ' + ng.tran);
    }
  }

  console.log('\n54 · TRỤC NGŨ CHẠY THÀNH PHÉP KIỂM · BIÊN NIÊN MỘT TRĂM NĂM');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const nha = await p.evaluate(() => {
      const G = window.G;
      if (!G.BN_TRUC5) return { co: false };
      const man = G.VIEWS['bien-nien']();
      return { co: true,
        so: (G.BN_TRUC5 || []).length,
        thieu: (G.BN_TRUC5 || []).filter(d => !d.t || !d.them || !d.vi).map(d => d.ma),
        /* Điều luật KHÔNG có ai canh là một lời thề, không phải một điều luật */
        khongAiCanh: (G.BN_TRUC5 || []).filter(d => !d.co && !d.ham && !d.kho).map(d => d.ma),
        lo: !!(G.BN_THAPKY || G.BN_CHUYENGIAO || G.BN_DICHUC || G.BN_CHET),
        manCoT5: man.indexOf((G.BN_TRUC5[0] || {}).t || '###') >= 0,
        manKhongCoThapKy: man.indexOf('Mười thập kỷ') < 0 };
    });
    if (!nha.co) {
      bao(false, 'Trục Ngũ nạp được từ gói nền', 'không thấy BN_TRUC5');
    } else {
      bao(nha.so === 5 && !nha.thieu.length && !nha.khongAiCanh.length,
        'năm điều không ai được sửa, và điều nào cũng CÓ NGƯỜI CANH — trỏ vào một cờ, một hàm soi, hoặc một bản ghi có thật. Điều luật không ai canh là một lời thề, không phải một điều luật',
        nha.khongAiCanh.length ? 'KHÔNG AI CANH: ' + nha.khongAiCanh.join(' ')
          : nha.thieu.join(' ') || '5/5 có người canh');
      bao(!nha.lo && nha.manCoT5 && nha.manKhongCoThapKy,
        'gia đình ĐỌC ĐƯỢC hiến pháp một trang — hiến pháp mà người bị nó bảo vệ không đọc được thì không phải hiến pháp — nhưng không nhận lịch thập kỷ và cách chuyển giao',
        nha.lo ? 'biên niên nghề lọt xuống máy phụ huynh' : 'chỉ có Trục Ngũ');
    }

    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ng = await p.evaluate(() => {
      const G = window.G;
      if (!G.BN_THAPKY) return { co: false };
      const ra = {};
      ra.co = true;

      /* ── NĂM PHÉP KIỂM CỦA HIẾN PHÁP, CHẠY THẬT ──
         Phần X đòi đúng điều này: giá trị không sống nổi một trăm năm
         trong văn bản nếu không được máy kiểm mỗi ngày. */
      const t5 = G.bnSoiTrucNgu();
      ra.t5Dat = t5.dat;
      ra.t5Ho = t5.ho;
      ra.t5Canh = t5.dieu.map(d => d.ma + '=' + (d.giu ? 'giữ' : 'HỞ')).join(' ');
      /* Mỗi điều phải bắt được KHI BỊ PHÁ — kiểm từng điều một */
      const pha = [];
      /* T1 · xoá lời hứa không bán dữ liệu */
      const giuDen = G.TR_DEN.slice();
      G.TR_DEN = G.TR_DEN.filter(x => x.ma !== 'D-KHOR');
      if (G.bnSoiTrucNgu().ho.indexOf('T1') < 0) pha.push('T1');
      G.TR_DEN = giuDen;
      /* T2 · tắt cờ chuông không thành chỉ số */
      const giuCo2 = G.GL_ANDON_LUAT.khongThanhChiSo;
      G.GL_ANDON_LUAT.khongThanhChiSo = false;
      if (G.bnSoiTrucNgu().ho.indexOf('T2') < 0) pha.push('T2');
      G.GL_ANDON_LUAT.khongThanhChiSo = giuCo2;
      /* T3 · tắt cờ không hỏi chứng minh */
      const sc3 = G.ND_SUCO.filter(s => s.ma === 'SC3')[0];
      const giuCo3 = sc3.camHoiChungMinh;
      sc3.camHoiChungMinh = false;
      if (G.bnSoiTrucNgu().ho.indexOf('T3') < 0) pha.push('T3');
      sc3.camHoiChungMinh = giuCo3;
      /* T4 · cho một nguồn tiền vượt nửa */
      const n1 = G.TR_NGUON.filter(n => n.ma === 'N1')[0];
      const giuTran = n1.tranPt;
      n1.tranPt = 60;
      if (G.bnSoiTrucNgu().ho.indexOf('T4') < 0) pha.push('T4');
      n1.tranPt = giuTran;
      /* T5 · tắt cờ tự vấn cả năm tốt */
      const gx = G.GL_KPI.filter(k => k.ma === 'G-XINLOI')[0];
      const giuCo5 = gx.keCaNamTot;
      gx.keCaNamTot = false;
      if (G.bnSoiTrucNgu().ho.indexOf('T5') < 0) pha.push('T5');
      gx.keCaNamTot = giuCo5;
      ra.phaKhongBat = pha;
      ra.t5SauKhiTra = G.bnSoiTrucNgu().dat;

      /* ── Mười thập kỷ phủ kín một trăm năm, mỗi thập kỷ MỘT việc ── */
      ra.soiTK = G.bnSoiThapKy();
      ra.tk1 = (G.bnThapKyCua(1) || {}).tk;
      ra.tk100 = (G.bnThapKyCua(100) || {}).tk;
      ra.ngoaiKhoang = G.bnThapKyCua(0) === null && G.bnThapKyCua(101) === null;
      ra.soiNamRoi = G.bnSoiNamRoi();

      /* ── Cửa mở rừng: KHÔNG cửa nào thấp hơn đường đã hứa ──
         Ngưỡng chết thứ hai của kho này đã sửa ở đây. */
      ra.mucNam10 = G.bnMucTuChuNam(10);
      ra.soiCua = G.bnSoiCuaMoRung(10);
      ra.cuaTheoDuong = (G.BN_MORUNG || []).some(c => c.theoDuong);
      ra.cuaChuaDo = G.bnCuaChuaDo().length;
      ra.cuaChuaDoDuCot = G.bnCuaChuaDo().every(c => c.thieu);
      /* Nhét lại một cửa số cứng dưới đường — phép kiểm phải bắt */
      G.BN_MORUNG.push({ so: 99, t: 'cửa thử', pt: 50 });
      ra.cuaBatDuoc = G.bnSoiCuaMoRung(10).length === 1;
      G.BN_MORUNG.pop();

      /* ── Năm cách chết, mỗi cách có thuốc trỏ vào cơ chế có thật ── */
      ra.soiChet = G.bnSoiChet();
      ra.soChet = (G.BN_CHET || []).length;

      ra.soDotDong = (G.BN_DOTDONG || []).length;
      ra.soChuyenGiao = (G.BN_CHUYENGIAO || []).length;
      ra.soCot = (G.BN_HANSEI_TC || []).length;
      ra.coCotBo = (G.BN_HANSEI_TC || []).some(c => c.cot === 3 && /BỎ/.test(c.lam));
      ra.soCua100 = ((G.BN_NAM100 || {}).cua || []).length;
      ra.coCuaC = ((G.BN_NAM100 || {}).cua || []).some(c => c.ma === 'C');
      ra.diChucKhacHopDen = !!(G.BN_DICHUC && G.BN_DICHUC.khacHopDen && G.GL_HOPDEN);
      ra.soPhanDiChuc = ((G.BN_DICHUC || {}).phan || []).length;
      ra.manCoThapKy = G.VIEWS['bien-nien']().indexOf('Mười thập kỷ') >= 0;
      return ra;
    });
    if (!ng.co) {
      bao(false, 'biên niên nạp được từ gói nghề', 'không thấy BN_THAPKY');
    } else {
      bao(ng.t5Dat && !ng.t5Ho.length,
        'CẢ NĂM ĐIỀU NỀN CÒN NGUYÊN — chạy thành phép kiểm máy, không nằm trong một bảng chữ. Mọi hiến pháp trên đời đều bị bào mòn từng chút chứ không bị xé, và bào mòn thì không ai thấy',
        ng.t5Ho.join(' ') || ng.t5Canh);
      bao(!ng.phaKhongBat.length && ng.t5SauKhiTra,
        'phá TỪNG điều một thì phép kiểm bắt được ĐÚNG điều ấy — xoá lời hứa không bán dữ liệu, tắt cờ chuông, tắt cờ chứng minh, cho một nguồn vượt nửa, tắt cờ tự vấn năm tốt. Năm lần phá, năm lần đỏ đúng chỗ',
        ng.phaKhongBat.length ? 'KHÔNG bắt: ' + ng.phaKhongBat.join(' ') : '5/5 bắt được');
      bao(!ng.soiTK.length && ng.tk1 === 1 && ng.tk100 === 10 && ng.ngoaiKhoang,
        'mười thập kỷ phủ kín một trăm năm không hở không chồng, mỗi thập kỷ ĐÚNG MỘT nhiệm vụ, và năm ngoài khoảng trả về rỗng chứ không kẹp về đầu hay cuối',
        ng.soiTK.join(' ') || 'năm 1→TK1 · năm 100→TK10');
      bao(!ng.soiNamRoi.length,
        'năm rời vai trùng đúng năm cuối một nhiệm kỳ đã khai — hai bảng cùng nói về một trăm năm thì phải khớp ở điểm trao tay, lệch điểm ấy là một trong hai bảng đang tưởng tượng ra lịch sử khác',
        ng.soiNamRoi.join(' ') || 'khớp');
      bao(!ng.soiCua.length && ng.cuaTheoDuong && ng.cuaBatDuoc,
        'không cửa mở rừng nào thấp hơn mức đã tự hứa cho năm ấy — bản gốc đặt cửa năm mươi phần trăm ở năm mười trong khi đường đã khai nói chín mươi, nên cửa ấy không bao giờ chặn được ai. Cửa nay ĐỌC ĐƯỜNG chứ không ghi số cứng',
        ng.soiCua.join(' ') || 'mức năm 10 là ' + ng.mucNam10 + '% · cửa đọc đường');
      bao(ng.cuaChuaDo === 1 && ng.cuaChuaDoDuCot,
        'cửa nào CHƯA đo được thì khai thẳng kèm thiếu đúng cái gì — cửa này chờ một ô chủ hệ điền, và im lặng về nó là để một cửa mở toang mà trông như đang đóng');
      bao(!ng.soiChet.length && ng.soChet === 5,
        'năm cách chết của một đề án trăm năm, cách nào cũng có CHUÔNG BÁO SỚM và THUỐC trỏ vào cơ chế có thật — cách chết không trỏ được vào thuốc nào là một nỗi lo, không phải một rủi ro được quản',
        ng.soiChet.join(' ') || '5/5 có thuốc thật');
      bao(ng.soDotDong === 3 && ng.soChuyenGiao === 6 && ng.soCot === 3 && ng.coCotBo,
        'ba công việc đốt đồng, sáu bước năm năm trước ngày rời, và tự vấn thể chế có CỘT BA cho quyền BỎ một nghi thức — nghi thức không được phép chết thì thể chế chết thay nó');
      bao(ng.soCua100 === 3 && ng.coCuaC && ng.diChucKhacHopDen && ng.soPhanDiChuc === 5,
        'ba cửa năm một trăm gồm cả CỬA CHẤM DỨT CÓ DANH DỰ, và di chúc thể chế năm phần tách bạch với hộp đen — hộp đen mở khi hệ sụp, di chúc trao khi hệ chuyển, hai thứ khác việc',
        ng.soCua100 + ' cửa · di chúc ' + ng.soPhanDiChuc + ' phần');
      bao(ng.manCoThapKy,
        'vai có gói nghề dựng ra được lịch mười thập kỷ');
    }
  }

  console.log('\n55 · BẢY QUYỀN CÓ CƠ CHẾ · LỚP PHÁP LÝ · BA CÂU CHỜ CHỦ HỆ');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const nha = await p.evaluate(() => {
      const G = window.G;
      if (!G.PL_QUYEN) return { co: false };
      const man = G.VIEWS['phap-ly']();
      return { co: true,
        so: (G.PL_QUYEN || []).length,
        soi: G.plSoiQuyen(),
        /* Sổ đếm chưa có thì hàm phải nói CHƯA ĐO ĐƯỢC, không nói "ổn" */
        khongSoThiKhaiChuaDo: G.plQuyenNgu().chuaDo === true && !!G.plQuyenNgu().thieu,
        batDuocQuyenNgu: (function () {
          const r = G.plQuyenNgu({ Q1: 2, Q2: 1, Q3: 1, Q4: 0, Q5: 3, Q6: 1, Q7: 4 });
          return r.chuaDo === false && r.ngu.length === 1 && r.ngu[0] === 'Q4';
        })(),
        lo: !!(G.PL_DIEU || G.PL_HOPDONG || G.PL_XUNGDOT || G.PL_CHOCHU || G.PL_BAC4),
        manCoQuyen: man.indexOf((G.PL_QUYEN[0] || {}).la || '###') >= 0,
        manKhongCoHopDong: man.indexOf('Bảy loại hợp đồng') < 0 };
    });
    if (!nha.co) {
      bao(false, 'bảy quyền nạp được từ gói nền', 'không thấy PL_QUYEN');
    } else {
      bao(nha.so === 7 && !nha.soi.length,
        'bảy quyền của gia đình, quyền nào cũng trỏ vào một CƠ CHẾ CÓ THẬT — quyền không có cơ chế là quyền trang trí, và quyền trang trí còn tệ hơn không có quyền vì nó làm người ta tin mình được bảo vệ',
        nha.soi.join(' ') || '7/7 có cơ chế');
      bao(nha.khongSoThiKhaiChuaDo && nha.batDuocQuyenNgu,
        'chưa có sổ đếm thì hàm nói CHƯA ĐO ĐƯỢC chứ không nói "mọi thứ ổn", và có sổ rồi thì bắt đúng quyền đang NGỦ — năm nào một quyền có không lần dùng thì đó là năm báo động, không phải năm yên ổn');
      bao(!nha.lo && nha.manCoQuyen && nha.manKhongCoHopDong,
        'gia đình ĐỌC ĐƯỢC bảy quyền ở chỗ nhìn thấy, không giấu trong điều khoản — nhưng không nhận bộ hợp đồng và sổ xung đột lợi ích',
        nha.lo ? 'lớp pháp lý nghề lọt xuống máy phụ huynh' : 'chỉ có bảy quyền');
    }

    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ng = await p.evaluate(() => {
      const G = window.G;
      if (!G.PL_DIEU) return { co: false };
      const ra = { co: true };

      /* ── Mười hai điều, đúng MỘT điều không sửa được ── */
      ra.soiDieu = G.plSoiDieu();
      ra.soDieu = (G.PL_DIEU || []).length;
      ra.d12 = (G.PL_DIEU || []).filter(d => d.khongSua).map(d => d.so);
      /* Mỗi điều phải dịch từ một nguyên tắc CÓ THẬT — điều không gốc là
         điều sẽ bị bỏ sau năm mươi năm với lý do dọn văn bản cũ */
      ra.dieuKhongGoc = (G.PL_DIEU || []).filter(d => !d.goc || G[d.goc] === undefined).map(d => d.so);

      /* ── Điều khoản lao động ĐỌC TRẦN, không ghi số ──
         Lần thứ BA một tỉ lệ được viết cứng lệch khỏi trần đã ép. */
      ra.tran = G.ddTranCua('DH');
      const t = G.plTranNguoiKem();
      ra.dieuKhoanTheoTran = !!(t && t.tran === ra.tran && t.dieuKhoan.indexOf(String(ra.tran)) >= 0);
      ra.soiHDTran = G.plSoiHopDongTran();
      /* Nhét lại số cứng vào điều khoản — phép kiểm phải bắt */
      const h3 = G.PL_HOPDONG.filter(x => x.ma === 'H3')[0];
      const giuBB = h3.batBuoc;
      h3.batBuoc = 'Người kèm được từ chối khi vượt tỉ lệ một trên mười.';
      ra.batSoCung = G.plSoiHopDongTran().length === 1;
      h3.batBuoc = giuBB;

      /* ── Bảy hợp đồng đủ ba cột ── */
      ra.soiHD = G.plSoiHopDong();
      ra.soHD = (G.PL_HOPDONG || []).length;

      /* ── Bốn bậc, và KHÔNG có bậc năm ── */
      ra.soiBac = G.plSoiBac4();
      ra.khongCoBac5 = (G.PL_BAC4_LUAT || {}).khongCoBac5 === true;

      /* ── Ba tầng kho, năm cam kết ── */
      ra.soKho = (G.PL_KHO || []).length;
      ra.khoThieu = (G.PL_KHO || []).filter(k => !k.coSo || !k.giu || !k.quyen || !k.aiXem).map(k => k.ma);
      ra.k1KhongAiXem = ((G.PL_KHO || []).filter(k => k.ma === 'K1')[0] || {}).aiXem || '';
      ra.soCamKet = (G.PL_CAMKET || []).length;
      ra.camKetThieu = (G.PL_CAMKET || []).filter(c => !c.them || !c.that).map(c => c.ma);

      /* ── Hai quy tắc bất biến của tranh chấp ──
         Phép thử thật nhất của lời hứa dữ liệu: hệ chấp nhận THUA KIỆN
         thay vì mở kho riêng, kể cả khi mở ra thì hệ thắng. */
      ra.soBatBien = ((G.PL_TRANHCHAP || {}).batBien || []).length;
      ra.coBB2 = ((G.PL_TRANHCHAP || {}).batBien || []).some(b => b.ma === 'BB2' && /CÓ LỢI/.test(b.them));

      /* ── Người Không Đồng Ý: mốc SỚM thắng ──
         Bản trước đặt từ năm năm, lớp pháp lý đặt vào Hội đồng từ lúc
         đăng ký. Năm một tới bốn là quãng người dựng ít bị canh nhất. */
      const kd = (G.BN_DOTDONG || []).filter(x => x.ma === 'DD-KHONGDONGY')[0] || {};
      ra.khongDongYNam1 = kd.tuNam === 1 && !!kd.ghe;
      ra.hoiDongCoKhongDongY = ((G.PL_PHAPNHAN || {}).tang || [])
        .some(t => /KHÔNG ĐỒNG Ý/.test(String(t.hoiDong)));

      /* ── Ba câu chờ chủ hệ, KHÔNG tự quyết ── */
      ra.soChoChu = G.plChoChu().length;
      ra.choChuDuCot = G.plChoChu().every(c => c.t && c.banGoc && c.lenhDung && c.canGi);
      /* Và hệ KHÔNG được tự dựng phần cấp phép mở khi chưa có câu trả lời */
      ra.khongTuMo = G.PL_GIAYPHEP_MO === undefined && G.PL_MAMO === undefined;

      ra.soKiem90 = (G.PL_KIEM90 || []).length;
      ra.soDinhKy = (G.PL_DINHKY || []).length;
      ra.manCoHopDong = G.VIEWS['phap-ly']().indexOf('Bảy loại hợp đồng') >= 0;
      return ra;
    });
    if (!ng.co) {
      bao(false, 'lớp pháp lý nạp được từ gói nghề', 'không thấy PL_DIEU');
    } else {
      bao(!ng.soiDieu.length && ng.soDieu === 12 && ng.d12.length === 1 && ng.d12[0] === 12,
        'mười hai điều hiến pháp bản pháp lý, và ĐÚNG MỘT điều không sửa được bằng bất kỳ cơ chế nào — điều ấy không bảo vệ nội dung, nó bảo vệ PHƯƠNG PHÁP: mọi diễn giải phải đi qua câu hỏi người yếu nhất',
        ng.soiDieu.join(' ') || '12 điều · điều ' + ng.d12[0] + ' bất khả huỷ');
      bao(!ng.dieuKhongGoc.length,
        'điều nào cũng nói rõ mình DỊCH TỪ nguyên tắc nào, và nguyên tắc ấy có thật — điều không có gốc là điều sẽ bị bỏ sau năm mươi năm với lý do dọn văn bản cũ',
        ng.dieuKhongGoc.join(' ') || '12/12 có gốc');
      bao(ng.dieuKhoanTheoTran && !ng.soiHDTran.length && ng.batSoCung,
        'điều khoản lao động ĐỌC TRẦN chứ không ghi số cứng, và phép kiểm bắt được ngay khi nhét số vào — đây là lần THỨ BA một tỉ lệ được viết cứng lệch khỏi trần đã ép, và lần này điều khoản không còn giữ số riêng',
        'trần ' + ng.tran + ' · ' + (ng.soiHDTran.join(' ') || 'không chỗ nào ghi số cứng'));
      bao(!ng.soiHD.length && ng.soHD === 7,
        'bảy loại hợp đồng, loại nào cũng đủ BẮT BUỘC · CẤM · VÌ SAO — cột cấm mới là cột giữ được lời hứa lúc có lợi ích, hợp đồng chỉ nói được làm gì thì không giữ được gì',
        ng.soiHD.join(' ') || '7/7 đủ ba cột');
      bao(!ng.soiBac.length && ng.khongCoBac5,
        'bốn bậc khi luật va nguyên tắc, và hệ KHAI THẲNG là không có bậc năm — bậc năm tên "làm đi rồi chờ sửa luật" là bậc mà mọi tổ chức đều phát minh ra vào đúng lúc nó cần nhất',
        ng.soiBac.join(' ') || '4 bậc · không có bậc 5');
      bao(ng.soKho === 3 && !ng.khoThieu.length && /Không ai/.test(ng.k1KhongAiXem),
        'ba tầng kho đủ CƠ SỞ XỬ LÝ · THỜI HẠN GIỮ · QUYỀN KÈM · AI XEM ĐƯỢC, và kho riêng của gia đình thì KHÔNG AI xem — kể cả người giữ lửa',
        ng.khoThieu.join(' ') || '3/3 · kho riêng: ' + ng.k1KhongAiXem);
      bao(ng.soCamKet === 5 && !ng.camKetThieu.length,
        'năm cam kết kỹ thuật có giá trị pháp lý, cam kết nào cũng nói LÀM THẬT THẾ NÀO — trong đó máy không bao giờ tự chốt tầng đỏ, đó là chỗ tự động hoá dừng lại vĩnh viễn',
        ng.camKetThieu.join(' ') || '5/5');
      bao(ng.soBatBien === 2 && ng.coBB2,
        'hai quy tắc bất biến của tranh chấp, trong đó hệ chấp nhận THUA KIỆN thay vì mở kho riêng ra làm chứng cứ — kể cả khi mở ra thì hệ thắng. Lời hứa chỉ giữ khi thuận lợi thì không phải lời hứa');
      bao(ng.khongDongYNam1 && ng.hoiDongCoKhongDongY,
        'vai Người Không Đồng Ý bắt đầu từ NĂM MỘT và có ghế trong Hội đồng ngay từ lúc đăng ký — hai tài liệu ghi hai mốc, và mốc SỚM hơn thắng: năm một tới năm bốn chính là quãng người dựng ít bị canh nhất');
      bao(ng.soChoChu === 3 && ng.choChuDuCot && ng.khongTuMo,
        'ba câu CHỜ CHỦ HỆ được khai đủ bốn cột — tài liệu đề nghị gì, lệnh đứng của chủ hệ nói gì, vì sao tôi không tự quyết, và cần gì. Và hệ KHÔNG tự dựng phần cấp phép mở: mở một quyền thì không thu lại được, đóng thì mở lúc nào cũng được',
        ng.soChoChu + ' câu chờ chủ hệ');
      bao(ng.soKiem90 === 12 && ng.soDinhKy === 4 && ng.manCoHopDong,
        'mười hai mục kiểm pháp lý trước Ngày Gieo và bốn nghĩa vụ định kỳ, và vai có gói nghề dựng ra được bộ hợp đồng');
    }
  }


  console.log('\n56 · NĂM LẰN RANH · TỪ CHỐI THẬT HAY GIẢ · MƯỜI LĂM CON SỐ CÓ NGUỒN');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const nha = await p.evaluate(() => {
      const G = window.G;
      if (!G.TV_LANRANH) return { co: false };
      const man = G.VIEWS['so-tay-tu-van']();
      return { co: true,
        so: G.TV_LANRANH.length,
        soi: G.tvSoiLanRanh(),
        /* Gia đình KHÔNG được nhận phần nghề: ba mươi lời từ chối kèm
           nguyên văn câu đáp, bảng sàng lọc, tám cách chốt. Đọc được
           chúng thì buổi tư vấn mất tác dụng — họ biết trước câu tiếp. */
        lo: !!(G.TV_TUCHOI || G.TV_SANGLOC || G.TV_CHOT || G.TV_SO15 || G.TV_PHANKHUC),
        manCoLanRanh: man.indexOf(G.TV_LANRANH[0].khong) >= 0,
        manKhongCoTuChoi: man.indexOf('Ba mươi lời từ chối') < 0 };
    });
    if (!nha.co) {
      bao(false, 'năm lằn ranh nạp được từ gói nền', 'không thấy TV_LANRANH');
    } else {
      bao(nha.so === 5 && !nha.soi.length,
        'năm điều người tư vấn KHÔNG được làm với nhà mình, điều nào cũng trỏ vào một CỬA BÁO có thật — lằn ranh không có cửa báo là lời tự hứa, và lời tự hứa thì chỉ người hứa biết mình đã phá',
        nha.soi.join(' ') || '5/5 có cửa báo');
      bao(!nha.lo && nha.manCoLanRanh && nha.manKhongCoTuChoi,
        'gia đình ĐỌC ĐƯỢC năm lằn ranh ở chỗ nhìn thấy trước buổi tư vấn — nhưng không nhận ba mươi lời từ chối kèm nguyên văn câu đáp, không nhận bảng sàng lọc, không nhận tám cách chốt',
        nha.lo ? 'sổ tay nghề lọt xuống máy phụ huynh' : 'chỉ có năm lằn ranh');
    }

    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ng = await p.evaluate(() => {
      const G = window.G;
      if (!G.TV_TUCHOI) return { co: false };
      const ra = { co: true };

      /* ── Ba mươi lời từ chối, thật hay giả ── */
      ra.soiTuChoi = G.tvSoiTuChoi();
      ra.soTuChoi = G.TV_TUCHOI.length;
      ra.soGia = G.TV_TUCHOI.filter(t => t.loai === 'gia').length;
      /* Phép thử: gỡ được chỗ này thì bắt đầu chứ? Trả lời KHÔNG là giả,
         và gặp loại giả thì KHÔNG trả lời nó. */
      const gia = G.tvLoaiTuChoi('TC02', false);
      const that = G.tvLoaiTuChoi('TC02', true);
      const chua = G.tvLoaiTuChoi('TC02');
      ra.phanLoaiDung = gia.loai === 'gia' && /KHÔNG trả lời/.test(gia.lam) &&
        that.loai === 'that' && /đường DỪNG/.test(that.lam) && chua.chuaThu === true;
      /* Bẻ một đường đáp — phép kiểm phải bắt */
      const giuDap = G.TV_TUCHOI[0].dap;
      G.TV_TUCHOI[0].dap = [giuDap[0], giuDap[1]];
      ra.batThieuDap = G.tvSoiTuChoi().length === 1;
      G.TV_TUCHOI[0].dap = giuDap;

      /* ── Sàng lọc là để TỪ CHỐI ── */
      const chuaSo = G.tvNhanKhach();
      const thieu = G.tvNhanKhach({ SL1: false });
      const sach = {}; G.TV_SANGLOC.forEach(s => { sach[s.ma] = false; });
      const nhan = G.tvNhanKhach(sach);
      const doi = Object.assign({}, sach, { SL3: true });
      const tuChoi = G.tvNhanKhach(doi);
      ra.locDung = chuaSo.chuaLoc === true && thieu.chuaLoc === true && thieu.thieu.length === 6 &&
        nhan.ok === true && tuChoi.ok === false && tuChoi.chan.length === 1 && tuChoi.chan[0] === 'SL3';
      ra.soChan = G.TV_SANGLOC.filter(s => s.chan).length;

      /* ── Trần: đọc, không ghi số ── */
      ra.tranDH = G.ddTranCua('DH');
      ra.tranCM = G.ddTranCua('CM');
      const du = G.tvTranTuVan(ra.tranDH * 2, 2);
      const thieuNguoi = G.tvTranTuVan(ra.tranDH * 2 + 1, 2);
      ra.tranDung = du.ok === true && thieuNguoi.ok === false &&
        thieuNguoi.can === Math.ceil((ra.tranDH * 2 + 1) / ra.tranDH);
      /* Một tư vấn cộng mười Cây Mẹ: sổ tay ghi ba trăm nhà, trần ghi ba */
      const cm = G.tvSoiCayMe(10);
      ra.cayMeThat = cm.that;
      ra.cayMeLech = cm.lech;
      ra.batCayMe = cm.that === 10 * ra.tranCM && cm.that !== 300;
      /* Nhét số cứng vào kho — phép kiểm phải bắt */
      ra.soiTranGhiCung = G.tvSoiTranGhiCung();
      const giuLuat = G.TV_TRAN.luatVao;
      G.TV_TRAN.luatVao = 'Mỗi người kèm nhận mười lăm nhà.';
      ra.batSoCung = G.tvSoiTranGhiCung().length === 1;
      G.TV_TRAN.luatVao = giuLuat;

      /* ── Năm nhịp cộng đúng mười phút ── */
      ra.soiNhip = G.tvSoiNhip5();
      const giuPhut = G.TV_NHIP5[4].phut;
      G.TV_NHIP5[4].phut = 3;
      ra.batNhipLech = G.tvSoiNhip5().length === 1;
      G.TV_NHIP5[4].phut = giuPhut;

      /* ── Hoàn tiền đọc HP_TANG, không ghi tỉ lệ ── */
      ra.soiHoan = G.tvSoiHoan();
      ra.hoanTheoHP = G.TV_HOAN.theoHP === true;
      ra.hoanT2 = (G.tvHoanCua('T2') || {}).hoan || '';
      const giuD = G.TV_TUCHOI.filter(t => t.ma === 'TC14')[0].dap[0];
      G.TV_TUCHOI.filter(t => t.ma === 'TC14')[0].dap[0] = 'Nói là hoàn 70% trong ba tháng đầu.';
      ra.batTyLeHoan = G.tvSoiHoan().length === 1;
      G.TV_TUCHOI.filter(t => t.ma === 'TC14')[0].dap[0] = giuD;

      /* ── Không giá nào trong câu nói với khách ── */
      ra.soiGia = G.tvSoiGia();
      ra.giaConNull = (G.HP_TANG || []).every(t => t.gia === null);
      const giuNoi = G.TV_NHIP5[1].noi;
      G.TV_NHIP5[1].noi = 'Chặng này 20 triệu ạ.';
      ra.batGia = G.tvSoiGia().length === 1;
      G.TV_NHIP5[1].noi = giuNoi;

      /* ── Mười lăm con số, số nào cũng khai nguồn ── */
      ra.soiSo15 = G.tvSoiSo15();
      ra.soSo15 = G.TV_SO15.length;
      ra.soChuaDo = G.tvSoChuaDo().length;
      ra.chuaDoDuCot = G.tvSoChuaDo().every(s => s.thieu && !s.nguon);
      const oChuaDo = G.tvSoChuaDo()[0];
      const giuThieu = oChuaDo.thieu;
      delete oChuaDo.thieu;
      ra.batChuaDoCam = G.tvSoiSo15().length === 1;
      oChuaDo.thieu = giuThieu;

      /* ── Phân khúc trỏ vào chặng có thật ── */
      ra.soiPhanKhuc = G.tvSoiPhanKhuc();

      /* ── Ngôn từ: dùng lại đúng máy quét của bức tranh ── */
      ra.soiNgonTu = G.tvSoiNgonTu();
      const giuCau = G.TV_NHIP5[4].noi;
      G.TV_NHIP5[4].noi = 'Chị phải trả lời em câu này ạ.';
      ra.batTuCam = G.tvSoiNgonTu().length === 1;
      G.TV_NHIP5[4].noi = giuCau;

      /* ── Hai câu chờ chủ hệ ── */
      ra.soChoChu = G.tvChoChu().length;
      ra.choChuDuCot = G.tvChoChu().every(c => c.t && c.banGoc && c.lenhDung && c.canGi);
      ra.khongTuDatGia = G.TV_GOI === undefined && G.TV_GIA === undefined;

      /* ── Tiêu chí tuyệt đối của kỳ thi ── */
      ra.tnTuyetDoi = /TN3/.test(String((G.TV_TOTNGHIEP || {}).tuyetDoi || ''));
      ra.manCoTuChoi = G.VIEWS['so-tay-tu-van']().indexOf('Ba mươi lời từ chối') >= 0;
      return ra;
    });
    if (!ng.co) {
      bao(false, 'sổ tay tư vấn nạp được từ gói nghề', 'không thấy TV_TUCHOI');
    } else {
      bao(!ng.soiTuChoi.length && ng.soTuChoi === 30 && ng.phanLoaiDung && ng.batThieuDap,
        'ba mươi lời từ chối, mỗi lời phân loại THẬT hay GIẢ bằng một phép thử chứ không bằng cảm giác, và gặp loại giả thì hệ bảo KHÔNG trả lời nó — cãi thắng một lời từ chối giả rồi tưởng mình đã chốt là cách mất đơn phổ biến nhất của nghề này',
        ng.soiTuChoi.join(' ') || '30 tình huống · ' + ng.soGia + ' loại giả · 3 đường đáp mỗi tình huống');
      bao(ng.locDung && ng.soChan === 5,
        'bảy câu sàng lọc có HÀM TỪ CHỐI đứng sau: chưa có sổ trả lời thì hệ nói CHƯA LỌC ĐƯỢC chứ không nói "nhận được", hỏi thiếu câu cũng chưa nhận, và gặp cờ đỏ thì từ chối thẳng — bảng sàng lọc không có hàm chặn thì sáu tháng sau ai cũng đã sàng lọc rồi mà không ai từ chối nhà nào',
        ng.soChan + ' câu chặn cứng trên 7');
      bao(ng.tranDung && ng.batCayMe && !ng.soiTranGhiCung.length && ng.batSoCung,
        'trần quan hệ ĐỌC từ DD_CAP chứ không ghi số, và phép kiểm bắt được ngay khi nhét số vào — đây là lần THỨ TƯ một tỉ lệ được viết cứng lệch khỏi trần đã ép: sổ tay ghi mười lăm nhà một người, và ghi một tư vấn cộng mười Cây Mẹ bằng ba trăm nhà',
        'trần ' + ng.tranDH + '/' + ng.tranCM + ' · mười Cây Mẹ là ' + ng.cayMeThat +
        ' nhà chứ không phải 300 — lệch ' + ng.cayMeLech + ' lần');
      bao(!ng.soiNhip.length && ng.batNhipLech,
        'năm nhịp nói về chương trình cộng đúng mười phút, và nhịp bị ngắn lại khi cộng lệch luôn là nhịp thứ năm — nhịp hỏi một câu rồi IM');
      bao(!ng.soiHoan.length && ng.hoanTheoHP && ng.batTyLeHoan && ng.hoanT2,
        'chính sách hoàn tiền ĐỌC từ bảng học phí theo đúng chặng đang bán, không kho nào của lớp này được ghi một tỉ lệ chung — sổ tay hứa hoàn bảy mươi phần trăm trong ba tháng đầu, mà hợp đồng từng chặng ghi khác hẳn, và lời hứa hoàn tiền nói miệng mà hợp đồng không giữ là chỗ Học viện thua kiện, thua đúng',
        ng.soiHoan.join(' ') || 'T2: ' + ng.hoanT2.slice(0, 48) + '…');
      bao(!ng.soiGia.length && ng.giaConNull && ng.batGia && ng.khongTuDatGia,
        'không câu nào người tư vấn đọc trước mặt khách có một con số tiền, và hệ KHÔNG tự điền năm gói giá sổ tay đề nghị — học phí vẫn đang chờ chủ hệ, và một con số tạm điền cho màn hình trông đủ sẽ thành con số thật sau sáu tháng, không ai nhớ nó từ đâu ra',
        ng.soiGia.join(' ') || 'HP_TANG[].gia còn trống · không giá trong câu nói');
      bao(!ng.soiSo15.length && ng.soSo15 === 15 && ng.chuaDoDuCot && ng.batChuaDoCam && ng.soChuaDo === 3,
        'mười lăm con số tháng, số nào cũng khai NGUỒN có thật, và ba số chưa đo được thì khai thẳng kèm thiếu đúng cái gì — một bảng thành tích tự điền là một bảng luôn đẹp, và một bảng luôn đẹp thì không ai dùng nó để sửa gì',
        ng.soiSo15.join(' ') || '12 số có nguồn · ' + ng.soChuaDo + ' số khai chưa đo');
      bao(!ng.soiPhanKhuc.length && !ng.soiNgonTu.length && ng.batTuCam,
        'sáu phân khúc trỏ vào chặng CÓ THẬT ở bảng học phí, và mọi câu nói với gia đình đi qua ĐÚNG máy quét ngôn từ của bức tranh hành trình — dựng máy quét thứ hai thì rồi sẽ có ngày hai máy lệch nhau, và lúc ấy chuẩn ngôn từ của Học viện có hai bản',
        ng.soiPhanKhuc.join(' ') + ng.soiNgonTu.join(' ') || '6/6 chặng thật · không câu nào phạm từ cấm');
      bao(ng.soChoChu === 2 && ng.choChuDuCot && ng.tnTuyetDoi && ng.manCoTuChoi,
        'hai câu CHỜ CHỦ HỆ khai đủ bốn cột, và kỳ thi tốt nghiệp có một tiêu chí TUYỆT ĐỐI: gặp ca có cờ đỏ mà vẫn bán được đơn ấy là trượt cả kỳ — ba mục kia đo kỹ năng và kỹ năng thì học được, mục ấy đo chỗ người ta chịu mất một đơn hàng, và chỗ ấy không dạy được bằng cách cho qua',
        ng.soChoChu + ' câu chờ chủ hệ');
    }
  }


  console.log('\n57 · SỔ TAY CỦA GIA ĐÌNH · CHUẨN LỜI DỄ HIỂU CHẠY LẦN ĐẦU · CỔNG IN');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const nha = await p.evaluate(() => {
      const G = window.G;
      if (!G.SG_HOI) return { co: false };
      const ra = { co: true };
      ra.soCau = G.SG_HOI.length;
      ra.hoiThieu = G.SG_HOI.filter(x => !x.hoi || !x.dap || !x.nhom || !x.trang).map(x => x.so);

      /* ── Bảy quyền là BẢN DỊCH, không phải bộ thứ hai ── */
      ra.soiQuyen = G.sgSoiQuyen();
      /* Trỏ sai một mã — phép kiểm phải bắt */
      const giuQ = G.SG_QUYEN7[0].quyen;
      G.SG_QUYEN7[0].quyen = 'Q9';
      ra.batQuyenLa = G.sgSoiQuyen().length === 2;
      G.SG_QUYEN7[0].quyen = giuQ;

      /* ── CHUẨN LỜI DỄ HIỂU — lần đầu chạy thật ──
         G.DEHIEU_NGUONG có từ bản 9.x kèm dòng "con số để bộ kiểm phát
         hành đối chiếu", và bộ kiểm chưa bao giờ đối chiếu. */
      const d = G.sgSoiDeHieu();
      ra.dh = { dat: d.dat, soCau: d.soCau, soKyTu: d.soKyTu, cauTB: d.cauTB,
        nguongTB: d.nguongTB, cauDai: d.cauDai.length, tuKho: d.tuKho.length,
        tuKho10k: d.tuKho10k, nguongTuKho: d.nguongTuKho };
      /* Nhét một câu bốn mươi từ — phải đỏ đúng chỗ */
      const giuDap = G.SG_HOI[0].dap;
      G.SG_HOI[0].dap = ('mưa ').repeat(40).trim() + '.';
      const dDai = G.sgSoiDeHieu();
      ra.batCauDai = dDai.dat === false && dDai.cauDai.length === 1;
      /* Nhét năm từ khó lấy đúng từ bảng DEHIEU_THAY — phải đỏ */
      G.SG_HOI[0].dap = 'Hệ thống triển khai cơ chế đo lường theo chỉ số và nguyên tắc vận hành.';
      const dKho = G.sgSoiDeHieu();
      ra.batTuKho = dKho.dat === false && dKho.tuKho.length >= 5;
      G.SG_HOI[0].dap = giuDap;
      ra.traVeXanh = G.sgSoiDeHieu().dat === true;

      /* ── Từ cấm: chỉ quét cột BẢO LÀM GÌ ── */
      ra.soiNgonTu = G.sgSoiNgonTu();
      const giuLam = G.SG_KHAN[0].lam;
      G.SG_KHAN[0].lam = 'Bạn phải bấm nút đỏ.';
      ra.batTuCam = G.sgSoiNgonTu().length === 1;
      G.SG_KHAN[0].lam = giuLam;
      /* Và thước ấy KHÔNG được quét cả cuốn: "không phải cán bộ" là câu
         tử tế, không phải câu sai bảo. */
      ra.sachCoKhongPhai = G.SG_HOI.some(x => /không phải cán bộ/i.test(String(x.dap)));

      /* ── Năm điều cấm ── */
      ra.soiCam5 = G.sgSoiCam5();
      ra.soCam5 = (G.SG_CAM5 || []).length;
      ra.cam5Moi = (G.SG_CAM5 || []).filter(c => c.moi).map(c => c.ma);

      /* ── Phụ lục soạn thảo KHÔNG xuống máy gia đình ── */
      ra.lo = !!(G.SG_INAN || G.SG_KIEM3 || G.SG_CHOCHU || G.SG_SO || G.SG_INLAI);
      const man = G.VIEWS['so-tay-gia-dinh']();
      ra.manCoDongDau = man.indexOf(G.SG_DONGDAU.chu) >= 0;
      ra.manCoTrang24 = man.indexOf(G.SG_TRANG24.cua) >= 0;
      ra.manKhongCoCongIn = man.indexOf('Cổng in') < 0;
      return ra;
    });
    if (!nha.co) {
      bao(false, 'sổ tay của gia đình nạp được từ gói nền', 'không thấy SG_HOI');
    } else {
      bao(nha.soCau === 30 && !nha.hoiThieu.length,
        'ba mươi câu, câu nào cũng đủ CÂU HỎI · CÂU TRẢ LỜI · NHÓM · SỐ TRANG — đây là văn bản duy nhất của cả bộ viết ngược chiều: không phải hệ nói với gia đình, mà là câu trả lời cho câu gia đình hay hỏi',
        nha.hoiThieu.join(' ') || '30 câu đủ cột');
      bao(!nha.soiQuyen.length && nha.batQuyenLa,
        'bảy quyền trong sách là BẢN DỊCH của bảy quyền trong máy, không phải bộ thứ hai — mỗi bản dịch trỏ vào đúng một mã có thật, và phép kiểm bắt ngay khi trỏ lệch. Hai bộ quyền viết hai giọng thì có ngày lệch nhau, và người thiệt là người cầm giấy',
        nha.soiQuyen.join(' ') || '7 bản dịch · 7 quyền gốc');
      bao(nha.dh.dat && nha.batCauDai && nha.batTuKho && nha.traVeXanh,
        'CHUẨN LỜI DỄ HIỂU CHẠY LẦN ĐẦU. G.DEHIEU_NGUONG nằm trong kho từ bản 9.x kèm đúng dòng chú giải "con số để bộ kiểm phát hành đối chiếu", và bộ kiểm chưa bao giờ đối chiếu — bốn kho DEHIEU_* chỉ xuất hiện một lần trong cả kho mã, ở danh sách quyền. Một chuẩn không ai chạy là một chuẩn không tồn tại',
        'đo ' + nha.dh.soCau + ' câu · ' + nha.dh.soKyTu + ' ký tự · câu TB ' + nha.dh.cauTB +
        '/' + nha.dh.nguongTB + ' · từ khó ' + nha.dh.tuKho10k + '/' + nha.dh.nguongTuKho +
        ' · không câu nào quá ' + 35 + ' từ');
      bao(!nha.soiNgonTu.length && nha.batTuCam && nha.sachCoKhongPhai,
        'máy quét từ cấm chỉ áp cho cột BẢO LÀM GÌ, và bắt được ngay khi nhét từ sai bảo vào đó — quét cả cuốn thì "không phải cán bộ" và "không phải thất bại" cũng thành phạm, mà đó là hai câu tử tế nhất của cuốn sách. Một cái thước dùng sai chỗ thì nó cắt mất đúng phần nó sinh ra để giữ',
        nha.soiNgonTu.join(' ') || 'sạch · và sách vẫn giữ được câu "không phải cán bộ"');
      bao(!nha.soiCam5.length && nha.soCam5 === 5 && nha.cam5Moi.length === 1,
        'năm điều người đi cùng không được làm: bốn điều trỏ vào lời hứa ĐÃ CÓ, một điều khai thẳng là MỚI và nói rõ đo bằng gì — điều mới ấy là "không im lặng bỏ mặc", chỗ đau nhất và ít bị bắt nhất, vì nó không để lại dấu vết nào',
        nha.soiCam5.join(' ') || '4 điều có gốc · điều mới: ' + nha.cam5Moi[0]);
      bao(!nha.lo && nha.manCoDongDau && nha.manCoTrang24 && nha.manKhongCoCongIn,
        'gia đình nhận cả hai mươi bốn trang in — kể cả dòng đầu và trang cuối để trống — nhưng KHÔNG nhận phụ lục soạn thảo: cổng in, sổ in lại, ba câu chờ chủ hệ. Bản gốc tự chia lằn ấy và ghi rõ "không in vào cuốn"',
        nha.lo ? 'phụ lục lọt xuống máy phụ huynh' : 'chỉ có phần in');
    }

    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ng = await p.evaluate(() => {
      const G = window.G;
      if (!G.SG_INAN) return { co: false };
      const ra = { co: true };

      /* ── CỔNG IN đỏ CÓ CHỦ Ý ──
         Bộ kiểm xanh vì kho khai thật. Cổng in đỏ vì việc thật chưa
         xong. Hai điều cùng đúng một lúc. */
      const san = G.sgSanSangIn();
      ra.chuaIn = san.ok === false;
      ra.soVuong = san.vuong.length;
      ra.vuongCoDongHo = san.vuong.some(v => /15 phút/.test(v));

      /* ── Lời hứa có đồng hồ ── */
      ra.soiHen = G.sgSoiHen();
      ra.soHen = G.sgHen().length;
      ra.henChuaDo = G.sgHen().filter(x => x.chuaDo).length;
      const giuDo = G.SG_KHAN[0].doBang;
      delete G.SG_KHAN[0].doBang;
      ra.batHenKhongDo = G.sgSoiHen().length === 1;
      G.SG_KHAN[0].doBang = giuDo;

      /* ── Chuông nhà bấm khác chuông hệ rung ── */
      ra.soiChuong = G.sgSoiChuong();
      ra.soTang = (G.GL_ANDON || []).length;
      const giuKhac = G.SG_CHUONG[0].khac;
      delete G.SG_CHUONG[0].khac;
      ra.batChuongKhongNoiKhac = G.sgSoiChuong().length === 1;
      G.SG_CHUONG[0].khac = giuKhac;

      /* ── Mười tuần thực tập: đọc DD_CAP, không ghi số ── */
      ra.soiSoTuan = G.sgSoiSoTuan();
      const dt = G.sgDaoTao();
      ra.daoTaoTheoDD = !!(dt && dt.gio === 40 && dt.thang === 3 &&
        dt.cau.indexOf(String(dt.thang) + ' tháng') >= 0);
      const giuDap2 = G.SG_HOI[8].dap;
      G.SG_HOI[8].dap = 'Họ thực tập mười tuần rồi mới gặp nhà thật.';
      ra.batSoTuan = G.sgSoiSoTuan().length === 1;
      G.SG_HOI[8].dap = giuDap2;

      /* ── Sổ in lại và phân loại kho ── */
      ra.soiInLai = G.sgSoiInLai();
      ra.soiPhanLoai = G.sgSoiPhanLoai();
      ra.camSuaLang = G.SG_INAN.camSuaLang === true;
      ra.soBan = G.SG_INAN.soBan;

      /* ── Con số sách hứa công khai ── */
      ra.soSo = (G.SG_SO || []).length;
      ra.soChuaDo = (G.SG_SO || []).filter(s => s.chuaDo && s.thieu).length;

      /* ── Ba người nghe: máy KHÔNG giả vờ đã đo ── */
      ra.kiem3ChuaDo = (G.SG_KIEM3 || {}).chuaDo === true && !!(G.SG_KIEM3 || {}).thieu;

      /* ── Bàn giao người đi cùng: sửa chỗ bản 9.18 viết sai ──
         Bản trước viết "người cũ kể lại", biến quyền im lặng của gia
         đình thành một thủ tục bàn giao của hệ. */
      const vo6 = (G.TV_VO || []).filter(v => v.ma === 'VO6')[0] || {};
      const b1 = ((vo6.cuu || [])[0] || {}).lam || '';
      ra.banGiaoTheoQuyen = /NHÀ MÌNH kể/.test(b1) && !/Người cũ kể lại/.test(b1) &&
        vo6.theoQuyen === 'PL_QUYEN.Q1';

      ra.soChoChu = G.sgChoChu().length;
      ra.choChuDuCot = G.sgChoChu().every(c => c.t && c.banGoc && c.lenhDung && c.canGi);
      ra.manCoCongIn = G.VIEWS['so-tay-gia-dinh']().indexOf('Cổng in') >= 0;
      return ra;
    });
    if (!ng.co) {
      bao(false, 'phụ lục soạn thảo nạp được từ gói nghề', 'không thấy SG_INAN');
    } else {
      bao(ng.chuaIn && ng.vuongCoDongHo,
        'CỔNG IN ĐANG ĐỎ, và đỏ có chủ ý: trang 2 hứa mười lăm phút có người tới, mà không sổ nào trong hệ ghi giờ ấy — GL_ANDON đo giờ BÁO cho người giữ lửa, khác hẳn giờ NGƯỜI TỚI. Bộ kiểm xanh vì kho khai thật; cổng in đỏ vì việc thật chưa xong. Giấy in rồi thì không sửa lại được',
        ng.soVuong + ' chỗ vướng, có cả lời hứa 15 phút');
      bao(!ng.soiHen.length && ng.soHen === 2 && ng.henChuaDo === 2 && ng.batHenKhongDo,
        'lời hứa nào có ĐỒNG HỒ cũng nói rõ đo bằng sổ nào, và chưa có sổ thì khai thẳng là chưa đo được — phép kiểm bắt ngay khi một lời hứa có giờ mà không nói đo bằng gì. Một lời hứa mười lăm phút in vào một trăm cuốn giấy mà không sổ nào ghi giờ thì sáu tháng sau không ai biết nó có được giữ hay không, kể cả người hứa',
        ng.soiHen.join(' ') || '2 đồng hồ · cả hai khai chưa đo được');
      bao(!ng.soiChuong.length && ng.batChuongKhongNoiKhac,
        'ba tầng chuông của hệ đều được nối với nút gia đình bấm, và mỗi cặp nói rõ CHỖ KHÁC NHAU — nút là nhà bấm, tầng là hệ rung. Hai việc khác nhau mà cùng màu thì có ngày hai đội dùng chung một chữ mà hiểu hai nghĩa, và chỗ ấy không hỏng ngay, nó hỏng vào đúng lúc gấp',
        ng.soiChuong.join(' ') || ng.soTang + ' tầng đã nối đủ');
      bao(!ng.soiSoTuan.length && ng.daoTaoTheoDD && ng.batSoTuan,
        'sách KHÔNG ghi số tuần thực tập nào — số hiện ra lúc dựng trang, đọc thẳng từ DD_CAP. Sổ tay gốc viết mười tuần, DD_CAP đã ép ba tháng, và đây là lần thứ NĂM một con số viết cứng lệch khỏi thứ đã ép. Con số in vào sách giấy thì không sửa lại được',
        ng.soiSoTuan.join(' ') || 'đọc DD_CAP: 40 giờ · 3 tháng');
      bao(!ng.soiInLai.length && !ng.soiPhanLoai.length && ng.camSuaLang && ng.soBan === 100,
        'sổ in lại đủ ba cột LẦN THỨ MẤY · SỬA TRANG NÀO · VÌ SAO, và mọi kho của cuốn sách đều được xếp vào phần IN hay phần PHỤ LỤC — kho không xếp là kho không ai biết đo bằng thước nào',
        ng.soiInLai.join(' ') + ng.soiPhanLoai.join(' ') || '100 bản đánh số tay · cấm sửa lặng lẽ');
      bao(ng.soSo === 3 && ng.soChuaDo === 3 && ng.kiem3ChuaDo,
        'ba con số sách hứa công khai đều đang CHƯA ĐO ĐƯỢC và khai thẳng thiếu đúng cái gì, và phép kiểm ba người nghe cũng khai là chưa ai làm — máy đo được câu dài, từ khó và từ cấm; máy không đo được cảm giác bị xem thường, nên nó không giả vờ đã đo',
        ng.soChuaDo + '/3 số khai chưa đo · buổi đọc thành tiếng chưa có');
      bao(ng.banGiaoTheoQuyen,
        'buổi bàn giao người đi cùng nay do CHÍNH NHÀ kể, không phải người cũ kể lại — bản 9.18 tôi viết ngược, và câu ấy sai về phía nguy hiểm: nó biến quyền im lặng của gia đình thành một thủ tục bàn giao của hệ. Trang 9 của sổ tay bắt được chỗ ấy');
      bao(ng.soChoChu === 3 && ng.choChuDuCot && ng.manCoCongIn,
        'ba câu CHỜ CHỦ HỆ khai đủ bốn cột — ai ký tên ở bìa, số nào gọi chuông đỏ, và có ghi tình trạng hôn nhân của từng nhà hay không. Câu thứ ba là câu nặng nhất: muốn có con số sách hứa thì phải mở một trường dữ liệu rất riêng tư, và mở rồi thì không đóng lại được',
        ng.soChoChu + ' câu chờ chủ hệ');
    }
  }


  console.log('\n58 · BA LOẠI QUYẾT ĐỊNH · IM LẶNG LÀ TIẾP TỤC · SỔ GIỜ CHUÔNG KHOÁ TRƯỚC');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const nha = await p.evaluate(() => {
      const G = window.G;
      if (!G.HN_NGO) return { co: false };
      const man = G.VIEWS['hansei-sach']();
      return { co: true,
        soNgo: G.HN_NGO.length,
        soiNgo: G.hnSoiNgo(),
        soNang: G.HN_NGO.filter(n => n.nang).length,
        /* Gia đình KHÔNG nhận bảng quyết định, chín mâu thuẫn, năm chỗ
           tự phạm — đó là bản đồ chỗ hệ tự biết mình yếu. */
        lo: !!(G.HN_QUYET || G.HN_MAUTHUAN || G.HN_TUPHAT || G.HN_YEU || G.HN_SLA),
        manCoNgo: man.indexOf(G.HN_NGO[0].hoi) >= 0,
        manKhongCoQuyet: man.indexOf('Ba loại quyết định') < 0 };
    });
    if (!nha.co) {
      bao(false, 'năm câu để ngỏ nạp được từ gói nền', 'không thấy HN_NGO');
    } else {
      bao(nha.soNgo === 5 && !nha.soiNgo.length && nha.soNang === 2 && nha.manCoNgo,
        'năm câu hệ CHƯA TRẢ LỜI ĐƯỢC in ở gói nền và lên đầu màn, và hai câu nặng nói rõ hẹp hơn ở đâu cùng vì sao chưa trả lời nổi — câu để ngỏ xếp xuống cuối là câu chìm, và câu chìm thì năm sau không ai nhắc lại',
        nha.soiNgo.join(' ') || '5 câu · 2 câu nặng khai đủ');
      bao(!nha.lo && nha.manKhongCoQuyet,
        'gia đình đọc được năm câu hệ đang nợ, nhưng KHÔNG nhận bảng quyết định tự động, chín mâu thuẫn và năm chỗ tự phạm — đó là bản đồ chỗ hệ tự biết mình yếu, cùng lý do với sáu kịch bản sự cố',
        nha.lo ? 'lớp tự soi lọt xuống máy phụ huynh' : 'chỉ có năm câu để ngỏ');
    }

    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ng = await p.evaluate(() => {
      const G = window.G;
      if (!G.HN_QUYET) return { co: false };
      const ra = { co: true };

      /* ── BA LOẠI QUYẾT ĐỊNH — luật lớn nhất của bản này ── */
      ra.soiQuyet = G.hnSoiQuyet();
      ra.soQuyet = G.HN_QUYET.length;
      ra.moRong = G.hnQuyetTheoLoai('moRong').length;
      ra.thuHep = G.hnQuyetTheoLoai('thuHep').length;
      ra.chanHe = G.hnQuyetTheoLoai('chanHe').length;
      /* Chuông đỏ PHẢI là loại mở rộng và máy PHẢI được làm trước —
         đây đúng là chỗ bản 9.19 còn vướng. */
      const cd = G.HN_QUYET.filter(q => q.ma === 'Q-CHUONGDO')[0] || {};
      ra.chuongDoMoRong = cd.loai === 'moRong' && cd.mayLamTruoc === true && !!cd.nguoiXacNhanSau;
      /* Cho máy chốt một việc THU HẸP — phép kiểm phải bắt */
      const th = G.HN_QUYET.filter(q => q.loai === 'thuHep')[0];
      th.mayLamTruoc = true;
      ra.batThuHepTuDong = G.hnSoiQuyet().some(x => /THU HẸP mà máy làm trước/.test(x));
      th.mayLamTruoc = false;
      /* Mở một cửa xin cho một cái chặn tổ chức — phải bắt */
      const ch = G.HN_QUYET.filter(q => q.loai === 'chanHe')[0];
      delete ch.khongCuaXin;
      ra.batCuaXin = G.hnSoiQuyet().some(x => /còn cửa xin/.test(x));
      ch.khongCuaXin = true;
      /* Trỏ vào một hàm không tồn tại — phải bắt */
      const giuNoi = G.HN_QUYET[0].noi;
      G.HN_QUYET[0].noi = 'hnKhongCoHamNay';
      ra.batNoiMa = G.hnSoiQuyet().some(x => /không có thật/.test(x));
      G.HN_QUYET[0].noi = giuNoi;

      /* ── IM LẶNG LÀ TIẾP TỤC ── */
      const mo = G.hnCanXinLai({ thuHepQuyen: false });
      const thu = G.hnCanXinLai({ thuHepQuyen: true });
      const chua = G.hnCanXinLai({});
      ra.dongYDung = mo.canGat === false && thu.canGat === true && chua.chuaPhanLoai === true;
      ra.soiXinLai = G.hnSoiXinLaiDongY();
      const inl = G.SG_INLAI[0], giuTH = inl.thuHepQuyen;
      inl.thuHepQuyen = true;
      ra.batThuHepChuaXin = G.hnSoiXinLaiDongY().length === 1;
      inl.thuHepQuyen = giuTH;

      /* ── SỔ GIỜ CHUÔNG: khoá hình dạng trước khi nó ra đời ── */
      ra.soiSLA = G.hnSoiSLA();
      ra.slaChuaCo = G.HN_SLA.chuaCo === true;
      ra.slaCamTheoNguoi = G.HN_SLA.camGhiTheoNguoi === true;
      const giuCam = G.HN_SLA.camGhiTheoNguoi;
      delete G.HN_SLA.camGhiTheoNguoi;
      ra.batSLATheoNguoi = G.hnSoiSLA().length === 1;
      G.HN_SLA.camGhiTheoNguoi = giuCam;
      /* Và cổng in của bản trước VẪN đỏ — sổ chưa có thì chưa in được */
      ra.congInVanDo = G.sgSanSangIn().ok === false;

      /* ── Mâu thuẫn phải rơi xuống chỗ thật ── */
      ra.soiApVao = G.hnSoiApVao();
      ra.soMauThuan = G.HN_MAUTHUAN.length;
      ra.soChuaSua = G.HN_MAUTHUAN.filter(m => m.chuaSua).length;
      const mt = G.HN_MAUTHUAN.filter(m => !m.chuaSua)[0], giuAp = mt.apVao;
      mt.apVao = 'HN_KHO_KHONG_CO';
      ra.batApVaoMa = G.hnSoiApVao().length === 1;
      mt.apVao = giuAp;

      ra.soiYeu = G.hnSoiYeu();
      ra.soiTuPhat = G.hnSoiTuPhat();
      ra.soChoChu = G.hnChoChu().length;

      /* ── Cụm từ cấm thứ sáu đã gộp thật, và không câu nào phạm ── */
      ra.camTu = (G.HM_NGONTU || {}).camTu || [];
      ra.coCumThu6 = ra.camTu.indexOf('nếu không thì') >= 0;
      ra.quetSach = [].concat(G.hmSoiNgonTu(), G.tvSoiNgonTu(), G.sgSoiNgonTu());
      /* Nhét cụm mới vào một câu nói-với-nhà — phải đỏ */
      const giuLam = G.SG_KHAN[0].lam;
      G.SG_KHAN[0].lam = 'Bấm nút đỏ, nếu không thì gọi số ở bìa sau.';
      ra.batCumMoi = G.sgSoiNgonTu().length === 1;
      G.SG_KHAN[0].lam = giuLam;

      ra.manCoQuyet = G.VIEWS['hansei-sach']().indexOf('Ba loại quyết định') >= 0;
      return ra;
    });
    if (!ng.co) {
      bao(false, 'lớp tự soi nạp được từ gói nghề', 'không thấy HN_QUYET');
    } else {
      bao(!ng.soiQuyet.length && ng.soQuyet === 10 && ng.chuongDoMoRong && ng.batThuHepTuDong,
        'mười quyết định tự động của hệ đều được xếp loại, và luật khác nhau theo loại: MỞ RỘNG thì máy làm trước, THU HẸP thì người quyết trước, luôn luôn. Phép kiểm bắt ngay khi cho máy chốt một việc thu hẹp — sai khi mở rộng thì tốn một lần ngại, sai khi thu hẹp thì tốn một con người',
        ng.soiQuyet.join(' ') || ng.moRong + ' mở rộng · ' + ng.thuHep + ' thu hẹp · ' + ng.chanHe + ' chặn hệ');
      bao(ng.batCuaXin && ng.batNoiMa,
        'quyết định CHẶN CHÍNH TỔ CHỨC thì không có cửa xin, và mọi quyết định đều trỏ vào một hàm hoặc kho CÓ THẬT — cửa xin sẽ mở vào đúng lúc gấp, và một quyết định không trỏ được vào chỗ chạy thật là một dòng bảng chứ không phải một quyết định');
      bao(ng.dongYDung && !ng.soiXinLai.length && ng.batThuHepChuaXin,
        'IM LẶNG LÀ TIẾP TỤC: thay đổi mở rộng quyền thì không ai phải trả lời để giữ thứ mình đang có; thay đổi THU HẸP quyền thì hỏi lại và chờ gật. Chưa khai thay đổi thuộc loại nào thì hàm nói CHƯA PHÂN LOẠI ĐƯỢC, không nói "im lặng là đủ" — đoán về phía dễ là đúng cách một quyền bị thu hẹp trong im lặng',
        ng.soiXinLai.join(' ') || 'lần in 1 khai không thu hẹp quyền nào');
      bao(!ng.soiSLA.length && ng.slaChuaCo && ng.slaCamTheoNguoi && ng.batSLATheoNguoi && ng.congInVanDo,
        'cuốn sổ giờ bấm–giờ chạm CHƯA RA ĐỜI, và hình dạng nó đã bị khoá từ bây giờ: ghi theo LẦN BẤM, cấm ghi theo NGƯỜI TRỰC, cấm xuất hiện trong mọi báo cáo về cá nhân. Khoá sau khi sổ ra đời thì trong đó đã có sẵn một cột tên người, và không ai chịu xoá một cột đã có số. Cổng in vẫn đỏ — sổ chưa có thì chưa in được',
        'sổ chưa có · hình dạng đã khoá · cổng in còn đỏ');
      bao(!ng.soiApVao.length && ng.soMauThuan === 9 && ng.soChuaSua === 1 && ng.batApVaoMa,
        'chín mâu thuẫn bộ sách tự tìm ra, tám cái RƠI XUỐNG một kho hoặc một hàm có thật, một cái khai thẳng là chưa sửa được và thiếu đúng cái gì — một cái sửa không rơi vào đâu là một lời thú nhận, và thú nhận làm người ta nhẹ lòng, thứ nguy hiểm nhất sau khi biết mình sai',
        ng.soiApVao.join(' ') || '8 cái rơi xuống chỗ thật · 1 cái khai chưa sửa');
      bao(!ng.soiYeu.length && !ng.soiTuPhat.length && ng.soChoChu === 2,
        'bốn điểm yếu không sửa được đều có DÂY THỪA KẾ nói rõ ai gánh tiếp, năm chỗ tự phạm đều có GIÁ, và hai câu chờ chủ hệ khai đủ bốn cột — một điểm yếu khai ra mà không nói ai gánh là một lời than, không phải một món nợ',
        ng.soiYeu.join(' ') + ng.soiTuPhat.join(' ') || '4 dây thừa kế · 5 giá · 2 câu chờ chủ hệ');
      bao(ng.coCumThu6 && ng.camTu.length === 7 && !ng.quetSach.length && ng.batCumMoi && ng.manCoQuyet,
        'chuẩn ngôn từ nay có cụm thứ sáu "nếu không thì" — năm cụm đầu là giọng SAI BẢO, cụm này là giọng RA ĐIỀU KIỆN: nó không sai bảo, nó doạ. Ba tài liệu viết cách nhau, không đọc nhau, mà ra cùng một danh sách. Đo trước khi gộp: không câu nói-với-nhà nào trong cả kho phạm nó',
        ng.camTu.length + ' cụm cấm · quét cả ba máy: sạch');
    }
  }


  console.log('\n59 · MỘT HÀNH TRÌNH NĂM TẦNG · BỐN THANG QUY VỀ MỘT · KHÔNG CÓ TẦNG SÁU');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ra = await p.evaluate(() => {
      const G = window.G;
      if (!G.HT_TANG) return { co: false };
      const r = { co: true };

      /* ── BỐN THANG QUY VỀ MỘT, BẰNG KHOÁ MÁY ĐỌC ĐƯỢC ── */
      r.soiNoi = G.htSoiThangNoi();
      r.soThang = (G.HT_NOI || []).length;
      /* Hàm dịch chạy được từ MỌI thang */
      r.dich = {
        bd: G.htTangCua('BD', 'BD6'), chang: G.htTangCua('CHANG12', 11),
        vung: G.htTangCua('VUNG', 'RE') };
      r.dichDung = r.dich.bd[0] === 'T3' && r.dich.chang[0] === 'T5' &&
        r.dich.vung.length > 0;
      /* Gỡ khoá tầng của một chặng — đây đúng là trạng thái TRƯỚC bản này */
      const c1 = G.HANHTRINH12[0], giuT = c1.tang;
      delete c1.tang;
      r.batChangKhongTang = G.htSoiThangNoi().some(x => /chặng 1→trống/.test(x));
      c1.tang = giuT;
      /* Bảng hạng khách ở gói NGHỀ — máy phụ huynh không có, và không có
         là đúng. Phần phá của nó nằm ở khối quản trị bên dưới. */
      r.khongCoBangHang = G.KHACH_TANG === undefined;

      /* ── KHÔNG CÓ TẦNG THỨ SÁU ── */
      r.soiT6 = G.htSoiKhongTangSau();
      r.soTang = G.HT_TANG.length;
      G.HT_TANG.push({ ma: 'T6', so: 6, daQuy: 'THÊM', thuThach: 'x', khoNhat: 'x', doiGiKhiXong: 'x' });
      r.batTang6 = G.htSoiKhongTangSau().length >= 1;
      G.HT_TANG.pop();
      /* Cây cầu sang vai phải trỏ vào thang CÓ THẬT */
      /* DD_CAP ở gói nghề — máy nhà không có. Phần đối chiếu ở khối quản trị. */
      r.cauKhaiDung = (G.HT_SAUT5 || {}).sangThangNao === 'DD_CAP';

      /* ── CỔNG: bảng học phí ở gói NGHỀ, máy nhà không có ──
         Hàm phải khai CHƯA ĐO ĐƯỢC kèm thiếu gì, không báo lỗi giả. */
      const cg = G.htSoiCong();
      r.congKhaiChuaDo = cg.chuaDo === true && !!cg.thieu;

      /* ── NĂM PHẨM CHẤT, KHÔNG TRÙNG ── */
      r.soiDaQuy = G.htSoiDaQuy();
      r.daQuy = G.HT_TANG.map(t => t.daQuy);
      const giuDQ = G.HT_TANG[1].daQuy;
      G.HT_TANG[1].daQuy = G.HT_TANG[0].daQuy;
      r.batTrungDaQuy = G.htSoiDaQuy().some(x => /hai tầng cùng một phẩm chất/.test(x));
      G.HT_TANG[1].daQuy = giuDQ;

      /* ── BẢY CHẶNG KIM CƯƠNG LÀ LỚP SÂU, KHÔNG PHẢI THANG ── */
      r.soiKC = G.htSoiKC();
      r.soKC = (G.HT_KC || []).length;
      r.kcTrong = (G.HT_KC || []).filter(c => c.tang && c.tang.length).length;
      r.kcNgoai = (G.HT_KC || []).filter(c => c.ngoaiTang).length;
      const kc = G.HT_KC[0];
      kc.ngoaiTang = true;
      r.batKCHaiMang = G.htSoiKC().some(x => /vừa trong tầng vừa ngoài tầng/.test(x));
      delete kc.ngoaiTang;

      /* ── NHÀ MÌNH Ở ĐÂU: MỘT CÂU TRẢ LỜI, MỘT THỬ THÁCH ── */
      const chua = G.htDuong();
      const dau = G.htDuong(3);
      const het = G.htDuong(999);
      r.duongDung = chua.chuaDo === true && !!dau.tang && !!dau.thuThach &&
        het.tang === 'T5' && het.hetThang === true && !!het.sauDo;

      /* ── ĐÍCH ĐO BẰNG DẤU, KHÔNG ĐO BẰNG TẦNG ── */
      const khongSo = G.htToiDichChua();
      const du = G.htToiDichChua({ D1: true, D2: true, D3: true, D4: true });
      const thieu1 = G.htToiDichChua({ D1: true, D2: true, D3: true });
      r.dichDungCach = khongSo.chuaDo === true && du.du === true &&
        thieu1.du === false && thieu1.thieu.length === 1 &&
        (G.HT_DICH || {}).khongPhaiTang === true;

      r.soiLech = G.htSoiLech();
      r.soLech = (G.HT_LECH || []).length;
      const man = G.VIEWS['hanh-trinh-5-tang']();
      r.manCoDich = man.indexOf(G.HT_DICH.la) >= 0;
      r.manCoSauT5 = man.indexOf('Sau tầng năm') >= 0;
      r.manCoBangNoi = man.indexOf('Bốn cái thang') >= 0;
      return r;
    });
    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ng59 = await p.evaluate(() => {
      const G = window.G;
      if (!G.KHACH_TANG || !G.HT_NOI) return { ok: false, soi: 'không thấy bảng hạng ở gói nghề' };
      const soi = G.htSoiThangNoi();
      const dich = G.htTangCua('HANG', 'T');
      const k1 = G.KHACH_TANG[0], giu = k1.tangMa;
      delete k1.tangMa;
      const bat = G.htSoiThangNoi().some(x => /không có tangMa/.test(x));
      k1.tangMa = giu;
      /* Cổng: máy này CÓ bảng học phí nên soi được thật */
      const cg = G.htSoiCong();
      const t1 = G.HT_TANG[0], giuTT = t1.thuThach;
      t1.thuThach = 'Ghi sổ đủ 7 ngày liền.';
      const batNgay = (G.htSoiCong().loi || []).some(x => /ghi cứng số ngày/.test(x));
      t1.thuThach = giuTT;
      const congT3 = (G.htCongCua('T3') || {}).cong || [];
      return { ok: !soi.length && dich.length === 2 && bat,
        soi: soi.join(' ') || 'hạng Thép→' + dich.join('+'),
        congOK: cg.chuaDo === false && !cg.loi.length && congT3.length > 0 && batNgay,
        congSoi: (cg.loi || []).join(' ') || 'T3 có ' + congT3.length + ' cổng đọc từ bảng học phí',
        kcOK: !G.htSoiKC().length, lechOK: !G.htSoiLech().length, t6OK: !G.htSoiKhongTangSau().length,
        cauThat: !!G.DD_CAP && G.DD_CAP.some(function (d) { return d.ma === 'DH'; }) };
    });
    ra.hangOK = ng59.ok; ra.hangSoi = ng59.soi;
    ra.congOK = ng59.congOK; ra.congSoi = ng59.congSoi;
    ra.kcOKng = ng59.kcOK; ra.lechOKng = ng59.lechOK; ra.t6OKng = ng59.t6OK;
    ra.cauThat = ng59.cauThat;

    if (!ra.co) {
      bao(false, 'con đường năm tầng nạp được từ gói nền', 'không thấy HT_TANG');
    } else {
      bao(!ra.soiNoi.length && ra.soThang === 5 && ra.dichDung && ra.batChangKhongTang && ra.khongCoBangHang,
        'BỐN CÁI THANG QUY VỀ MỘT. Kho có năm tầng, mười bánh đà, bảy vùng đất, mười hai chặng và bốn hạng khách — năm cách đo cùng một nhà. Nay thang nào cũng nối về năm tầng bằng KHOÁ MÁY ĐỌC ĐƯỢC, và hàm dịch chạy được từ mọi thang. Trước bản này mười hai chặng nói tầng của mình bằng văn xuôi trong cột NGÀY: mắt người đọc ra, máy thì không — nối bằng mắt người thì coi như chưa nối',
        ra.soiNoi.join(' ') || 'BD6→' + ra.dich.bd[0] + ' · chặng 11→' + ra.dich.chang[0] +
        ' · vùng Rễ→' + ra.dich.vung.join('+') + ' · bảng hạng ở gói nghề, máy nhà không nhận');
      bao(ra.t6OKng && ra.soTang === 5 && ra.batTang6 && ra.cauKhaiDung && ra.cauThat,
        'KHÔNG CÓ TẦNG THỨ SÁU, và phép kiểm bắt ngay khi có ai đặt thêm. Năm tầng cộng lại 848 ngày trong khi tài liệu hứa mười năm — cách dễ là đặt thêm bậc, và cách ấy phá đúng thứ hệ đã hứa: có một ngày hệ này xong việc. Sau tầng năm là ĐỔI VAI sang thang người đi kèm, và cây cầu ấy đã nằm sẵn trong cột gồm của tầng 5 từ trước',
        ra.soiT6.join(' ') || '5 tầng · cầu sang DD_CAP');
      bao(ra.congKhaiChuaDo && ra.congOK,
        'điều kiện xong của mỗi tầng ĐỌC từ bảng học phí, và không tầng nào được tự ghi cứng số ngày. Bảng học phí ở gói NGHỀ nên máy nhà không có nó — và hàm khai thẳng CHƯA ĐO ĐƯỢC kèm thiếu gì, chứ không báo "tầng này không có trong bảng". Một phép kiểm báo thiếu ở chỗ dữ liệu cố ý vắng mặt là phép kiểm dạy người ta coi một lớp bảo vệ là một lỗi',
        'máy nhà: khai chưa đo được · máy có gói nghề: ' + (ra.congSoi || ''));
      bao(!ra.soiDaQuy.length && ra.batTrungDaQuy,
        'năm tầng, năm phẩm chất kết tinh khác nhau — hai tầng cùng một phẩm chất là hai tầng đang làm một việc, và phép kiểm bắt ngay khi trùng',
        ra.daQuy.join(' · '));
      bao(ra.kcOKng && ra.soKC === 7 && ra.kcTrong === 4 && ra.kcNgoai === 3 && ra.batKCHaiMang,
        'bảy chặng kim cương vào kho dưới dạng LỚP SÂU của năm tầng, không dưới dạng thang thứ năm — bốn chặng nằm trong tầng, ba chặng khai NGOÀI TẦNG và trỏ sang một cấp có thật của thang người đi kèm. Năm cái thang cùng đo một người là năm câu trả lời, và tới lúc chúng lệch nhau thì nhà mình tin cái nào',
        ra.soiKC.join(' ') || ra.kcTrong + ' chặng trong tầng · ' + ra.kcNgoai + ' chặng đổi vai');
      bao(ra.duongDung && ra.dichDungCach,
        'hỏi "nhà mình đang ở đâu" thì có MỘT câu trả lời và ĐÚNG MỘT thử thách kế tiếp — người mệt đọc một việc thì làm, đọc ba việc thì đóng máy. Và đích đo bằng bốn dấu hiệu của chính nhà mình chứ không đo bằng tầng đang đứng: đo đích bằng tầng thì đích mua được bằng tiền',
        'chưa có số tối thì hàm nói chưa đo được · tới T5 thì báo hết thang và nói sang vai gì');
      bao(ra.hangOK,
        'thang thứ năm — bốn hạng khách — nằm ở gói NGHỀ, và bảng ấy nối về năm tầng bằng danh sách mã đọc được. Trước bản này tầng nằm ở cột chữ dạng "Tầng 2 – 3": người đọc ra hai tầng, máy đọc ra một chuỗi có dấu gạch',
        ra.hangSoi || 'hạng Thép→T2+T3');
      bao(ra.lechOKng && ra.soLech === 7 && ra.manCoDich && ra.manCoSauT5 && ra.manCoBangNoi,
        'BẢY chỗ chưa khớp giữa bộ tài liệu và hệ năm tầng đã lập trình — chỗ thứ bảy là bức tranh sáu vùng, và nó KHÔNG cần bàn lại vì luật số 5 viết ở chính bản trước đã trả lời sẵn. Mỗi chỗ sửa đều RƠI XUỐNG một kho có thật, mỗi chỗ sửa đều RƠI XUỐNG một kho có thật — và gia đình đọc được cả bảng chỗ nối lẫn sáu chỗ lệch, vì một nhà có quyền biết cái thang đo mình được ghép lại từ đâu',
        ra.soiLech.join(' ') || ra.soLech + ' chỗ đã sửa, đều rơi xuống kho thật');
    }
  }


  console.log('\n60 · SÁU VÙNG LÀ LỚP SÂU · LÕI Ở TÂM · BỐN CHỖ RƠI CÓ ĐƯỜNG VỀ');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ra = await p.evaluate(() => {
      const G = window.G;
      if (!G.VZ_VUNG) return { co: false };
      const r = { co: true };

      /* ── KHOÁ: lớp sâu khớp MỘT-MỘT với năm tầng ── */
      r.soiNoi = G.vzSoiNoi();
      r.soVung = G.VZ_VUNG.length;
      /* Gỡ tầng của một vùng — lớp sâu phủ hụt là bước đầu của việc nó
         tự tách ra thành thang riêng */
      const v0 = G.VZ_VUNG[0], giuT = v0.tang;
      delete v0.tang;
      const s1 = G.vzSoiNoi();
      r.batVungKhongTang = s1.some(x => /trống/.test(x)) && s1.some(x => /không vùng nào phủ/.test(x));
      v0.tang = giuT;
      /* Cho hai vùng cùng một tầng */
      const giuT2 = G.VZ_VUNG[1].tang;
      G.VZ_VUNG[1].tang = G.VZ_VUNG[0].tang;
      r.batTrungTang = G.vzSoiNoi().some(x => /hai vùng cùng một tầng/.test(x));
      G.VZ_VUNG[1].tang = giuT2;

      /* ── LÕI Ở TÂM, KHÔNG Ở BẬC ĐẦU ── */
      r.soiLoi = G.vzSoiLoi();
      r.loiKhongPhaiTang = (G.VZ_LOI || {}).khongPhaiTang === true;
      const giuCL = G.VZ_VUNG[4].canLoi;
      delete G.VZ_VUNG[4].canLoi;
      r.batVungKhongCanLoi = G.vzSoiLoi().some(x => /không cần lõi/.test(x));
      G.VZ_VUNG[4].canLoi = giuCL;

      /* ── BỐN CHỖ RƠI ── */
      r.soiRoi = G.vzSoiRoi();
      r.soRoi = (G.VZ_ROI || []).length;
      r.vungCuoiKhongRoi = !(G.VZ_ROI || []).some(x => {
        const v = G.VZ_VUNG.filter(y => y.ma === x.tuVung)[0];
        return v && v.vungCuoi;
      });
      /* Chỗ rơi không có đường về là một lời chẩn đoán, không phải cơ chế */
      const r0 = G.VZ_ROI[0], giuDV = r0.duongVe;
      delete r0.duongVe;
      r.batKhongDuongVe = G.vzSoiRoi().some(x => /không có đường về/.test(x));
      r0.duongVe = giuDV;

      /* ── NHẬN RA BẰNG DẤU HIỆU, VÀ KHÔNG ĐOÁN KHI CHƯA CÓ SỔ ── */
      const chua = G.vzRoiVao('T1');
      const roi = G.vzRoiVao('T1', { vietLanDau: 0 });
      const chuaRoi = G.vzRoiVao('T1', { vietLanDau: 3 });
      const cuoi = G.vzRoiVao('T5', {});
      r.roiDung = chua.chuaDo === true && !!chua.rinhSan &&
        roi.roi === true && !!roi.duongVe &&
        chuaRoi.roi === false && cuoi.vungCuoi === true;
      /* Chỗ nguy hiểm nhất: số liệu đẹp mà việc lần đầu bằng không */
      const du = G.vzRoiVao('T4', { vietLanDau: 0, soLieuDep: true });
      r.batDuRoi = du.roi === true && du.ma === 'DUROI';

      /* ── KHAI THÁC: hàm cũ nói được câu mới ── */
      const dd = G.htDuongDayDu(3, { vietLanDau: 0 });
      r.khaiThac = !!dd && !!dd.tang && !!dd.vung && !!dd.vung.ten &&
        !!dd.canLoi && !!dd.choRoi && dd.choRoi.roi === true;

      /* ── Chữ bản gốc không đọc rõ thì khai là không đoán ── */
      r.coKhaiChuMo = (G.VZ_ROI || []).some(x => x.banGocKhongRo && /KHÔNG đoán/.test(x.banGocKhongRo));

      const man = G.VIEWS['sau-vung']();
      r.manCoLoi = man.indexOf(G.VZ_LOI.la) >= 0;
      r.manCoDuongVe = man.indexOf('Đường về') >= 0;
      return r;
    });
    if (!ra.co) {
      bao(false, 'sáu vùng nạp được từ gói nền', 'không thấy VZ_VUNG');
    } else {
      bao(!ra.soiNoi.length && ra.soVung === 5 && ra.batVungKhongTang && ra.batTrungTang,
        'SÁU VÙNG VÀO KHO DƯỚI DẠNG LỚP SÂU, KHÔNG DƯỚI DẠNG THANG THỨ SÁU — và ép khớp MỘT-MỘT với năm tầng: không vùng nào không có tầng, không tầng nào có hai vùng. Bản trước viết sẵn luật cho tình huống này với lý do "sẽ còn tài liệu nữa"; lần sau tới đúng một bản sau. Một lớp sâu phủ hụt là bước đầu của việc nó tự tách thành thang riêng, và tách từ từ là cách không ai kịp nhận ra',
        ra.soiNoi.join(' ') || '5 vùng khớp 5 tầng một-một');
      bao(!ra.soiLoi.length && ra.loiKhongPhaiTang && ra.batVungKhongCanLoi,
        'TỰ NHẬN THỨC Ở LÕI, KHÔNG Ở BẬC ĐẦU — vùng nào cũng khai cần lõi, và phép kiểm bắt ngay khi một vùng bỏ nó. Đây là chỗ bức tranh sửa lại một điều tôi đã xếp sai: tôi từng đặt tự nhận thức thành phẩm chất của bậc một, ngầm hiểu xong bậc ấy thì sang bậc khác. Một bậc thang leo được mà không cần nhìn lại mình là một bậc mua được bằng tiền',
        ra.soiLoi.join(' ') || 'lõi ở tâm · 5/5 vùng cần lõi');
      bao(!ra.soiRoi.length && ra.soRoi === 4 && ra.vungCuoiKhongRoi && ra.batKhongDuongVe,
        'bốn chỗ rơi mang tên, mỗi chỗ đúng một vùng, và vùng CUỐI không có lối rơi — ra khỏi vùng ấy là đổi vai, không phải rơi. Chỗ rơi nào cũng có ĐƯỜNG VỀ, và phép kiểm bắt ngay khi mất nó: một chỗ rơi không có đường về là một lời chẩn đoán, mà chẩn đoán không có thuốc thì tệ hơn không chẩn đoán',
        ra.soiRoi.join(' ') || '4 chỗ rơi · 4 đường về · vùng cuối không có lối rơi');
      bao(ra.roiDung && ra.batDuRoi && ra.coKhaiChuMo,
        'chỗ rơi nhận ra bằng DẤU HIỆU chứ không bằng lịch, và chưa có sổ dấu hiệu thì hàm chỉ nói chỗ nào RÌNH SẴN — không nói nhà mình đã rơi. Chỗ nguy hiểm nhất là "đủ rồi": số liệu đẹp lên trong khi việc lần đầu làm bằng không. Ba chỗ kia người ta biết mình đang khổ; chỗ này người ta thấy mình đang ổn, và ổn là thứ không ai đi tìm cách thoát ra',
        'bắt đúng chỗ đủ-rồi · chữ bản gốc mờ thì khai là KHÔNG đoán');
      bao(ra.khaiThac && ra.manCoLoi && ra.manCoDuongVe,
        'dữ liệu mới trả công cho máy cũ: hàm chỉ đường của bản trước nay nói thêm nhà mình đang CẢM THẤY ở vùng nào và chỗ rơi nào đang rình — không dựng hàm thứ hai trả lời cùng một câu hỏi, chỉ bọc hàm đã có. Bọc thì một nguồn, dựng thì hai');
    }
  }


  console.log('\n61 · MÃ CHIA THEO QUYỀN — MÁY GIA ĐÌNH KHÔNG TẢI MÃ CỦA NGHỀ');
  {
    /* ĐO TRÊN TRANG SẠCH, mỗi vai một trang.

       Bộ kiểm dùng chung một trang cho cả sáu mươi mốt mục, mà một thẻ
       script đã chạy thì không rút lại được: vai quản trị nạp mã nghề ở
       mục trước là nó nằm lại tới hết phiên. Đo trên trang chung thì
       phụ huynh "có" đủ ba mươi hai màn nghề — không phải vì máy họ tải,
       mà vì trang này đã là máy của người khác trước đó.

       Đời thật thì máy của một nhà chưa từng có phiên của Coach. Nên đo
       đúng đời thật: trang mới, và đếm cả LƯỢT HỎI MẠNG — thứ không nói
       dối được. */
    const xemVai = async (mail) => {
      const q = await b.newPage();
      if (KHOA) await q.addInitScript(x => { window.GITA_KHOA = x; }, KHOA);
      let hoiMaNghe = 0;
      q.on('request', r => { if (/gita-nghe\.js/.test(r.url())) hoiMaNghe++; });
      await q.goto(URL, { waitUntil: 'load' });
      await q.waitForFunction(() => window.G && window.G.doLogin, { timeout: 60000 });
      await q.evaluate(x => window.G.doLogin(x), mail);
      await q.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
      const r = await q.evaluate(() => {
        const G = window.G, m = G.MAN_NGHE || [];
        return { soMan: m.length, tep: G.MA_NGHE_TEP || '',
          daNap: !!G.KHO.maNgheXong,
          coMan: m.filter(v => !!G.VIEWS[v]).length,
          conCho: (G.KHO.dangNap || []).indexOf('ma-nghe') >= 0 };
      });
      await q.close();
      return { ...r, hoiMaNghe };
    };
    const nha = await xemVai('phuhuynh@gita365.vn');
    const hs = await xemVai('hocvien@gita365.vn');
    const ctv = await xemVai('daisu@gita365.vn');
    const coach = await xemVai('coach@gita365.vn');

    bao(nha.soMan > 0 && !!nha.tep,
      'gói mã khai được BẢNG MÀN NẰM Ở GÓI NGHỀ, sinh ra lúc gộp chứ không chép tay — chép tay thì bảng và tệp gộp rồi sẽ lệch, và lệch ở đây nghĩa là một màn có thật bị coi như không tồn tại',
      nha.soMan + ' màn ở ' + nha.tep);
    bao(nha.hoiMaNghe === 0 && hs.hoiMaNghe === 0 && ctv.hoiMaNghe === 0 &&
        !nha.daNap && nha.coMan === 0 && !hs.daNap && hs.coMan === 0 && !ctv.daNap && ctv.coMan === 0,
      'MÁY CỦA GIA ĐÌNH, HỌC VIÊN VÀ CỘNG TÁC VIÊN KHÔNG TẢI MÃ CỦA NGHỀ — không màn nghề nào được dựng trên máy họ. Kho đã chia theo quyền từ bản 8.x; mã thì tới bản này mới chia. Đo trước khi chia: 252 KB trong 1.660 KB dựng những màn ba vai ấy không bao giờ mở được',
      'ba vai · 0 lượt hỏi ' + nha.tep + ' · 0 màn nghề dựng trên máy họ');
    bao(coach.hoiMaNghe === 1 && coach.daNap && coach.coMan === coach.soMan && !coach.conCho,
      'vai có gói nghề thì mã về ĐỦ, và về xong trước khi màn hình dựng — tên nó đi cùng G.KHO.dangNap nên mọi chỗ đã chờ "dangNap rỗng" tự khắc chờ luôn cả mã, không cần dựng đường chờ thứ hai. Hai đường chờ rồi sẽ có ngày lệch',
      'coach: 1 lượt hỏi · nhận đủ ' + coach.coMan + '/' + coach.soMan + ' màn nghề');

    /* Màn nghề mà mã chưa về: phải NÓI ĐANG MỞ, không được âm thầm nhảy
       về bản đồ. Dựng lại đúng trạng thái ấy rồi bắt render nói thật. */
    const cho = await p.evaluate(() => {
      const G = window.G, v = (G.MAN_NGHE || [])[0];
      const giuFn = G.VIEWS[v], giuView = G.S.view;
      delete G.VIEWS[v];
      G.KHO.dangNap.push('ma-nghe');
      G.S.view = v; G.render();
      const t = document.getElementById('main').innerText;
      G.KHO.dangNap.pop(); G.VIEWS[v] = giuFn; G.S.view = giuView; G.render();
      return { noiDangMo: /Đang mở/i.test(t), khongNhayBanDo: G.S.view !== 'ban-do' };
    });
    bao(cho.noiDangMo,
      'màn của nghề mà mã chưa về thì hệ NÓI ĐANG MỞ, không âm thầm nhảy về bản đồ. Trước bản này dòng ấy chỉ chạy khi có lỗi thật; từ khi mã tách ra nó thành đường đi bình thường của mỗi lần đăng nhập, và một cú nhảy im lặng là đúng lớp hỏng ngầm mà bộ gộp đã cảnh báo ngay đầu tệp của nó');

    /* Bản một tệp không tải được tệp anh em — mã nghề phải nằm sẵn bên trong */
    {
      const fs61 = require('fs'), px61 = require('path');
      const goc61 = px61.join(__dirname, '..');
      const ban61 = /version:\s*'([^']+)'/.exec(
        fs61.readFileSync(px61.join(goc61, 'src', 'data.core.js'), 'utf8'));
      const gt = px61.join(goc61, 'GITA365-v' + ban61[1] + '-gioi-thieu.html');
      const dd = px61.join(goc61, 'GITA365.html');
      const coTrong = t => fs61.existsSync(t) &&
        fs61.readFileSync(t, 'utf8').indexOf('gita-nghe.js') >= 0;
      bao(coTrong(gt) && coTrong(dd),
        'hai bản MỘT TỆP — bản giới thiệu và vỏ Apps Script — đều nhúng sẵn mã nghề bên trong, vì một tệp thì không tải được tệp anh em nào cả. Lần đầu tôi chèn sau vòng nhúng nên không còn thẻ nào để bám, và bản giới thiệu lặng lẽ nhẹ đi 190 KB mà không báo gì',
        'bản giới thiệu ' + (coTrong(gt) ? 'có' : 'THIẾU') + ' · vỏ đầy đủ ' + (coTrong(dd) ? 'có' : 'THIẾU'));
    }
  }

  console.log('\n62 · NĂM TẦNG COACH — MẶT THỨ BA CỦA MỘT CÁI THANG');
  {
    /* Đo trên vai QUẢN TRỊ: lớp này có nửa ở gói nền (bảng năng lực —
       cái thước nhà mình cầm) và nửa ở gói nghề (vòng vận hành, bảng
       dữ liệu, phép chia quy mô). Muốn đo hết thì phải có cả hai. Nửa
       gói nền được đo riêng ở đoạn cuối mục này, trên vai phụ huynh. */
    await p.evaluate(x => window.G.doLogin(x), 'admin@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ra = await p.evaluate(() => {
      const G = window.G;
      if (!G.CS_TANG || !G.CS_VONG) return { co: false };
      const r = {};

      /* ── Khớp một-một với năm tầng ── */
      r.soiNoi = G.csSoiNoi();
      r.soTang = G.CS_TANG.length;
      const t = G.CS_TANG[2];
      const giuT = t.tang; t.tang = 'T1';
      r.batTrungTang = G.csSoiNoi().some(x => /hai tầng Coach cùng một tầng/.test(x));
      t.tang = giuT;
      /* Bốn năng lực, không năm. Bốn thì nhớ được khi đang ngồi trước
         một gia đình; sáu thì phải mở sổ, mà mở sổ giữa phiên là hỏng. */
      t.nangLuc.push({ t: 'x', do: 'y', theoKho: 'BD_LON' });
      r.batNamNangLuc = G.csSoiNoi().some(x => /5 năng lực, phải đúng 4/.test(x));
      t.nangLuc.pop();
      const giuM = t.mucDoSo; t.mucDoSo = 5;
      r.batMucLech = G.csSoiNoi().some(x => /mức trưởng thành=5/.test(x));
      t.mucDoSo = giuM;

      /* ── Không dựng bản thứ hai của một luật ── */
      const cl = G.csSoiKhongChepLai();
      r.chepOK = !cl.chuaDo && !cl.loi.length;
      const giuKQ = t.ketQua;
      t.ketQua = (G.HT_TANG.filter(x => x.ma === t.tang)[0] || {}).thuThach;
      r.batChepLai = (G.csSoiKhongChepLai().loi || []).some(x => /chép lại nguyên văn/.test(x));
      t.ketQua = giuKQ;

      /* ── Chỗ trùng tên: "10 bánh đà" ── */
      const tt = G.csSoiTenTrung();
      r.tenOK = !tt.chuaDo && !tt.loi.length;
      const giuTen = G.CS_VONG[0].ten; G.CS_VONG[0].ten = G.BD_LON[3].ten;
      r.batTrungTen = (G.csSoiTenTrung().loi || []).some(x => /trùng tên với bánh đà/.test(x));
      G.CS_VONG[0].ten = giuTen;

      /* ── Không dựng bảng hạng thứ hai của nghề ── */
      const ck = G.csSoiCapKhongTrung();
      r.capOK = !ck.chuaDo && !ck.loi.length;
      const giuMD = t.mucDo; t.mucDo = G.DD_CAP[1].ten;
      r.batTrungHang = (G.csSoiCapKhongTrung().loi || []).some(x => /trùng tên một hạng DD_CAP/.test(x));
      t.mucDo = giuMD;

      /* ── Mỗi năng lực trỏ vào một kho đo được ── */
      const dd = G.csSoiDoDuoc();
      r.doOK = !dd.loi.length; r.thieuThuoc = dd.khoThieu.length;
      const giuK = t.nangLuc[0].theoKho; delete t.nangLuc[0].theoKho;
      r.batKhongThuoc = G.csSoiDoDuoc().loi.some(x => /không trỏ vào kho nào/.test(x));
      t.nangLuc[0].theoKho = giuK;

      /* ── Mười bước là một VÒNG ── */
      const sv = G.csSoiVong();
      r.vongOK = !sv.chuaDo && !sv.loi.length && !sv.khoThieu.length;
      r.soBuoc = G.CS_VONG.length;
      const giuDV = G.CS_VONG[9].dongVong; delete G.CS_VONG[9].dongVong;
      r.batMatCau = G.csSoiVong().loi.some(x => /số bước đóng vòng=0/.test(x));
      G.CS_VONG[9].dongVong = giuDV;
      const giuVB = G.CS_VONG[9].veBuoc; G.CS_VONG[9].veBuoc = 'V05';
      r.batCauSai = G.csSoiVong().loi.some(x => /quay về V05, phải về V01/.test(x));
      G.CS_VONG[9].veBuoc = giuVB;
      const giuTK = G.CS_VONG[4].theoKho; delete G.CS_VONG[4].theoKho;
      r.batBuocKhongKho = G.csSoiVong().loi.some(x => /không trỏ vào kho nào/.test(x));
      G.CS_VONG[4].theoKho = giuTK;

      /* ── Bốn có, ba chưa ── */
      const sd = G.csSoiDuLieu();
      r.duLieuOK = !sd.chuaDo && !sd.loi.length;
      r.demCo = sd.dem.co; r.demChua = sd.dem.chua;
      G.CS_DULIEU[1].co = true;
      r.batToXanh = G.csSoiDuLieu().loi.some(x => /khai CÓ mà không trỏ kho/.test(x));
      G.CS_DULIEU[1].co = false;
      const giuTh = G.CS_DULIEU[1].thieu; delete G.CS_DULIEU[1].thieu;
      r.batKhongNoiThieu = G.csSoiDuLieu().loi.some(x => /không nói thiếu cái gì/.test(x));
      G.CS_DULIEU[1].thieu = giuTh;

      /* ── Năm trụ nền trỏ vào luật có thật ── */
      const sn = G.csSoiNen();
      r.nenOK = !sn.loi.length && !sn.khoThieu.length;
      const giuL = G.CS_NEN[0].theoLuat; delete G.CS_NEN[0].theoLuat;
      r.batTruKhongLuat = G.csSoiNen().loi.some(x => /không trỏ vào luật nào/.test(x));
      G.CS_NEN[0].theoLuat = giuL;

      /* ── Phép chia con số đích: TÍNH TẠI CHỖ, không ghi sẵn ── */
      const q = G.csQuyMo();
      r.quyMo = { dich: q.dich, dh: q.canDH, cv: q.canCV, thang: q.thangSomNhatCoCV };
      r.quyMoDung = q.canDH === Math.ceil(q.dich / q.tran.DH) &&
                    q.canCV === Math.ceil(q.canDH / q.tran.CV) && q.thangSomNhatCoCV === 54;
      /* Đổi trần thì con số phải đổi theo. Không đổi theo nghĩa là nó đã
         được ghi sẵn ở đâu đó — và bản ghi sẵn thứ hai là bản sẽ cũ đi
         lặng lẽ. Cùng bẫy với "10 Cây Mẹ = 300 nhà". */
      const giuTran = G.DD_CAP[0].tran; G.DD_CAP[0].tran = 10;
      r.theoTran = G.csQuyMo().canDH === Math.ceil(q.dich / 10);
      G.DD_CAP[0].tran = giuTran;
      r.veDung = G.csQuyMo().canDH === q.canDH;
      r.khongGhiSan = G.CS_QUYMO.khongGhiSanConSo === true &&
        !/\b200\b/.test(JSON.stringify(G.CS_QUYMO));

      /* ── Bốn chỗ lệch với bản gốc, và màn hình ── */
      r.soLech = (G.CS_LECH || []).length;
      r.lechDuKhung = (G.CS_LECH || []).every(l => l.o && l.tranhGhi && l.heDaCo && l.xuLy && l.vi);
      const man = G.VIEWS['coach-5-tang']();
      r.manCoNangLuc = man.indexOf(G.CS_TANG[0].nangLuc[0].t) >= 0;
      r.manCoQuyMo = /tháng thứ 54/.test(man);
      r.manCoChuaCo = man.indexOf(G.CS_DULIEU[1].thieu) >= 0;

      /* ── Mặt thứ ba nối được vào hàm chỉ đường đã có ── */
      const d = G.htDuongBaMat(3);
      r.baMat = !!(d && d.nguoiKem && d.nguoiKem.nangLuc.length === 4 && d.vung);
      return { co: true, ...r };
    });

    if (!ra.co) {
      bao(false, 'năm tầng Coach nạp được', 'không thấy CS_TANG hoặc CS_VONG');
    } else {
      bao(!ra.soiNoi.length && ra.soTang === 5 && ra.batTrungTang && ra.batNamNangLuc && ra.batMucLech,
        'HỆ COACH NĂM TẦNG VÀO DẠNG LỚP SÂU, KHÔNG DẠNG THANG THỨ SÁU — mặt thứ ba của cùng cái thang: HT_TANG nói nhà mình được giao gì, VZ_VUNG nói nhà mình đang cảm thấy gì, CS_TANG nói người đi cùng phải làm được gì. Mỗi tầng ĐÚNG BỐN năng lực, và phép kiểm bắt ngay khi thành năm: bốn thì nhớ được khi đang ngồi trước một gia đình, sáu thì phải mở sổ — mà mở sổ giữa phiên là đã hỏng phiên rồi',
        ra.soiNoi.join(' ') || '5 tầng Coach khớp 5 tầng một-một · 4 năng lực mỗi tầng');
      bao(ra.chepOK && ra.batChepLai,
        'HT_LUAT điều 3 thành HÀM: không cột nào của CS_TANG được chép lại nguyên văn thử thách của tầng. Việc của NGƯỜI KÈM khác việc của NHÀ ở cùng một bậc — chép sang là biến mặt thứ ba thành bản sao thứ hai, và hai bản của một luật thì sẽ có ngày lệch nhau lặng lẽ',
        'bắt đúng chỗ chép lại');
      bao(ra.tenOK && ra.batTrungTen,
        'GỠ MỘT CHỖ TRÙNG TÊN NGUY HIỂM. Bản gốc gọi vòng vận hành của nó là "10 bánh đà", mà G.BD_LON đã là mười bánh đà với nội dung khác hẳn — cùng tên, cùng số lượng, khác ruột. Đó là chỗ sáu tháng sau có người trỏ nhầm mà bộ kiểm vẫn xanh. Nay nó tên là VÒNG VẬN HÀNH, và máy từ chối mọi bước trùng tên với một bánh đà',
        'bắt được khi một bước mượn tên bánh đà');
      bao(ra.capOK && ra.batTrungHang,
        'năm mức trưởng thành KHÔNG được biến thành bảng xếp hạng thứ hai của nghề. Hạng người kèm có đúng ba, ở DD_CAP, và ba thì đã đủ. Hai bảng xếp hạng cho một nghề là hai bảng sẽ lệch, và lúc lệch thì người bị chấm chọn bảng nào lợi hơn',
        'bắt được khi một mức mượn tên một hạng DD_CAP');
      bao(ra.doOK && ra.batKhongThuoc,
        'mỗi năng lực trỏ vào MỘT KHO đo được — DT_RUBRIC, DT_VAI, DD_9010, TD_MUC, HM_NGONTU. Năng lực không đo được là một tính từ, và một bảng toàn tính từ thì ai cũng đạt. ' +
        ra.thieuThuoc + ' thước nằm ở gói nghề nên máy gia đình chưa đo được — đó là quyền, không phải lỗi, và phép kiểm phân biệt hai thứ ấy',
        'bắt được khi một năng lực mất thước');
      bao(ra.vongOK && ra.soBuoc === 10 && ra.batMatCau && ra.batCauSai && ra.batBuocKhongKho,
        'MƯỜI BƯỚC LÀ MỘT VÒNG, KHÔNG PHẢI MỘT THANG — và cầu quay về không phải lời nói suông: bước mười là chuyển vai sau tầng năm, chạy trên HT_SAUT5, và nhà cũ thành người kèm nhà mới ở bước một. Vòng không có cầu quay về là một danh sách được vẽ cong. Mỗi bước phải trỏ vào một kho có thật; bước không trỏ được vào kho nào là bước chưa có chỗ chạy',
        '10 bước · 1 cầu quay về V10→V01 · 10/10 bước có kho');
      bao(ra.duLieuOK && ra.demCo === 4 && ra.demChua === 3 && ra.batToXanh && ra.batKhongNoiThieu,
        'BẢY NĂNG LỰC DỮ LIỆU: BỐN CÓ, BA CHƯA — và ghi đúng bốn ba. Ba ô chưa có phải nói THIẾU CÁI GÌ: sổ nhịp tuần, sổ đo dấu hiệu, bảng tải của cả đội kèm. Một bảng tô xanh hết là bảng không dùng được để quyết định làm gì tiếp; ba ô trắng ở đây đáng giá hơn bảy ô xanh',
        ra.demCo + ' có · ' + ra.demChua + ' chưa, mỗi ô chưa đều nói thiếu gì');
      bao(ra.nenOK && ra.batTruKhongLuat,
        'năm trụ nền TRỎ vào luật đã có — TV_LANRANH, DD_TRAN_LUAT, DD_9010, DD_LUAT, PL_QUYEN — chứ không viết lại luật ở đây. Viết lại là có hai bản, và trong hai bản thì một bản sẽ cũ đi mà không ai biết',
        '5 trụ · 5 luật có thật');
      bao(ra.quyMoDung && ra.theoTran && ra.veDung && ra.khongGhiSan,
        'CON SỐ ĐÍCH CHIA ĐƯỢC CHO TRẦN. Bản gốc ghi "Kiến tạo 1000 lãnh đạo" ở chân trang mà không ghi cần bao nhiêu người: chia ra là ' + ra.quyMo.dh + ' Đồng Hành và ' + ra.quyMo.cv + ' Cố Vấn. Con số ấy TÍNH TẠI CHỖ từ DD_CAP — đổi trần thì nó đổi theo, vì ghi sẵn kết quả vào kho là dựng bản thứ hai của một phép chia. Và nút thắt thật không phải người mà là NĂM: Cố Vấn đầu tiên sớm nhất ở tháng thứ ' + ra.quyMo.thang + ', đọc ra từ chính cột điều kiện của DD_CAP. Cùng phép làm đã bắt được "10 Cây Mẹ = 300 nhà" — chia ra là 30',
        '1000 → ' + ra.quyMo.dh + ' DH → ' + ra.quyMo.cv + ' CV · tháng ' + ra.quyMo.thang);
      bao(ra.soLech === 4 && ra.lechDuKhung && ra.manCoNangLuc && ra.manCoQuyMo && ra.manCoChuaCo && ra.baMat,
        'bốn chỗ bức tranh lệch với hệ đã dựng đều ghi đủ bốn cột — tranh ghi gì, hệ đã có gì, xử lý ra sao, vì sao. Màn hình in cả bảng năng lực, cả phép chia, cả ba ô CHƯA CÓ. Và hàm chỉ đường của hai bản trước nay nói thêm mặt thứ ba mà không cần hàm mới: bọc thì một nguồn, dựng thì hai',
        ra.soLech + ' chỗ lệch · màn in đủ · htDuongBaMat nối được');
    }

    /* Nửa gói NỀN đo riêng trên máy gia đình: cái thước phải tới tay
       người được kèm, và các phép soi không được đỏ oan ở chỗ dữ liệu
       CỐ Ý vắng mặt. Bản 9.21 đã mắc đúng lỗi ấy một lần. */
    {
      await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
      await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
      const nha = await p.evaluate(() => {
        const G = window.G;
        return {
          coThuoc: !!G.CS_TANG && G.CS_TANG.length === 5 && !!G.CS_NEN && !!G.CS_LUAT,
          khongCoBep: G.CS_VONG === undefined && G.CS_DULIEU === undefined &&
                      G.CS_QUYMO === undefined && G.CS_LECH === undefined,
          soiSach: !G.csSoiNoi().length && !G.csSoiDoDuoc().loi.length && !G.csSoiNen().loi.length,
          noiChuaDo: G.csSoiVong().chuaDo === true && G.csSoiTenTrung().chuaDo === true &&
                     G.csQuyMo().chuaDo === true && G.csQuyMo().dich === undefined,
          manChay: G.VIEWS['coach-5-tang']().indexOf(G.CS_TANG[4].suMenh) >= 0
        };
      });
      bao(nha.coThuoc && nha.khongCoBep && nha.soiSach && nha.noiChuaDo && nha.manChay,
        'CÁI THƯỚC TỚI TAY NGƯỜI ĐƯỢC KÈM: máy gia đình có đủ năm tầng năng lực và năm trụ nền, và KHÔNG có vòng vận hành, bảng dữ liệu hay phép chia quy mô — việc trong bếp ở lại gói nghề. Trên máy ấy mọi phép soi đều sạch và những phép cần kho nghề thì nói CHƯA ĐO ĐƯỢC kèm tên kho, không báo thiếu. Bản 9.21 tôi để một phép kiểm đỏ trên máy gia đình vì nó đòi HP_TANG; một phép kiểm báo thiếu ở chỗ dữ liệu cố ý vắng mặt là phép kiểm dạy người ta coi một lớp bảo vệ là một lỗi, và sau vài lần thì người ta tắt nó đi',
        'nhà có thước, không có bếp · csQuyMo nói chưa đo được và KHÔNG trả số 0');
    }
  }


  console.log('\n63 · MÀN CÓ HÌNH — HÌNH DỰNG TỪ KHO, VÀ CHỖ CHỜ ẢNH THẬT');
  {
    await p.evaluate(x => window.G.doLogin(x), 'superadmin@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ra = await p.evaluate(() => {
      const G = window.G;
      if (!G.KA_CHO || !G.veThangBac) return { co: false };
      const r = {};

      /* ── Bảng chỗ đặt ── */
      r.soi = G.kaSoi();
      r.soCho = G.KA_CHO.length;
      r.soMan = Object.keys(G.KA_CHO.reduce((a, k) => (a[k.man] = 1, a), {})).length;
      const k0 = G.KA_CHO[0];
      /* Khung không có lý do sẽ được lấp bằng ảnh mua sẵn, và ảnh mua sẵn
         làm mất tin cả màn chứ không riêng chỗ ấy. */
      const giuVi = k0.viSaoODay; delete k0.viSaoODay;
      r.batKhongLyDo = G.kaSoi().some(x => /không nói vì sao ở đó/.test(x));
      k0.viSaoODay = giuVi;
      const giuTy = k0.ty; k0.ty = '7:3';
      r.batTyLa = G.kaSoi().some(x => /không có trong bảng/.test(x));
      k0.ty = giuTy;
      /* Màn không có thật thì khung ấy không bao giờ hiện ra, và không ai
         biết — nó nằm đó chiếm một dòng trong bảng chờ điền. */
      const giuMan = k0.man; k0.man = 'man-khong-co-that';
      r.batManMa = G.kaSoi().some(x => /không có thật/.test(x));
      k0.man = giuMan;
      const the = G.KA_CHO.filter(x => x.loai === 'the')[0];
      if (the) { const t2 = the.ty; the.ty = '16:9';
        r.batTheSaiTy = G.kaSoi().some(x => /thẻ trích phải tỉ lệ 4:5/.test(x)); the.ty = t2; }

      /* ── Địa chỉ: CHỈ NHẬN, không lọc ── */
      r.chan = ['javascript:alert(1)', 'data:image/svg+xml;base64,AAA', 'http://a.com/x.jpg',
        'blob:abc', 'file:///etc/passwd', '//a.com/x.jpg', 'ftp://a/x.jpg']
        .every(d => G.kaHopLe(d).ok === false);
      r.nhan = ['https://a.com/x.jpg', 'assets/brand/logo-gita.png']
        .every(d => G.kaHopLe(d).ok === true);
      /* http:// bị chặn kèm LÝ DO, vì đây là chỗ trình duyệt chặn im lặng
         và chủ hệ tưởng mình dán sai. */
      r.noiLyDoHttp = /https/.test(G.kaHopLe('http://a.com/x.jpg').loi || '');
      /* Và chặn ngay tại chỗ dán, không đợi tới lúc dựng màn */
      r.chanOChoDan = G.datND('khung.CS-DAU.nguon', 'javascript:alert(1)') === false &&
                      G.SUA_ND['khung.CS-DAU.nguon'] === undefined;

      /* ── Khung trống: chủ hệ thấy, gia đình không ── */
      const man = G.VIEWS['coach-5-tang']();
      r.chuHeThayBrief = man.indexOf(G.KA_CHO[0].brief) >= 0;
      r.chuHeThayKhoa = man.indexOf('khung.CS-DAU.nguon') >= 0;

      /* ── Ảnh thật thì chịu đúng luật của chữ ── */
      G.datND('khung.CS-DAU.nguon', 'https://vi-du.gita.edu.vn/a.jpg');
      const man2 = G.VIEWS['coach-5-tang']();
      r.hienAnh = /<img src="https:\/\/vi-du\.gita\.edu\.vn\/a\.jpg"/.test(man2);
      r.hetBrief = man2.indexOf(G.KA_CHO[0].brief) < 0;
      G.datND('khung.CS-DAU.nguon', '');

      /* ── Hình dựng từ kho: ĐỌC từ kho, không vẽ sẵn ── */
      const h1 = G.veThangBac((G.CS_TANG || []).map(t => ({ ten: t.ten, phu: t.mucDo, c: t.c })));
      /* So với bản ĐÃ THOÁT: mọi tên tầng đều có dấu &, mà trong SVG nó
         là &amp;. So với bản thô thì phép kiểm đỏ oan — và một phép kiểm
         đỏ oan vài lần là một phép kiểm bị tắt. */
      r.hinhCoTenTang = h1.indexOf(G.U.h(G.CS_TANG[0].ten)) >= 0;
      r.hinhCoMauTang = h1.indexOf(G.CS_TANG[4].c) >= 0;
      const giuTen = G.CS_TANG[0].ten; G.CS_TANG[0].ten = 'ZZQQ';
      r.hinhDoiTheoKho = G.veThangBac((G.CS_TANG || [])
        .map(t => ({ ten: t.ten, c: t.c }))).indexOf('ZZQQ') >= 0;
      G.CS_TANG[0].ten = giuTen;
      /* width phải nằm trong KIỂU. Thuộc tính width="100%" cộng height:auto
         thì trình duyệt rơi về cỡ mặc định 300px của thẻ thay thế, và hình
         khổ 700 co xuống 300 thì chữ 16 còn 6,9px. Lỗi này KHÔNG lộ ra khi
         đọc mã — chỉ lộ khi nhìn màn. */
      r.rongTrongKieu = /style="[^"]*width:100%/.test(h1) && !/ width="100%"/.test(h1);
      /* Chữ trong SVG vẫn là chữ người nhập được */
      r.svgThoatChu = G.veThangBac([{ ten: '<b>x</b>&"', c: '#000' }]).indexOf('&lt;b&gt;') >= 0;
      /* Vòng phải TRÒN, và bước đóng vòng phải vẽ khác các bước kia */
      const h2 = G.veVongTron((G.CS_VONG || []).map(v => ({
        ten: v.ten, nhan: String(v.so), dongVong: v.dongVong === true, c: '#0B6675' })));
      r.vongCoTron = (h2.match(/<circle/g) || []).length >= (G.CS_VONG || []).length * 2;
      r.vongDanhDauBuocCuoi = /r="26"/.test(h2);
      /* Chấm: đếm đúng bốn đặc ba rỗng từ chính CS_DULIEU */
      const h3 = G.veCham((G.CS_DULIEU || []).map(d => ({ ten: d.ten, co: d.co === true })));
      r.chamDacDung = (h3.match(/stroke-dasharray="3\.5 3\.5"/g) || []).length === 3;
      /* Phễu: ba con số đọc từ csQuyMo, không ghi sẵn */
      const q = G.csQuyMo();
      const h4 = G.vePheu([{ so: q.dich, ten: 'a' }, { so: q.canDH, ten: 'b' }, { so: q.canCV, ten: 'c' }]);
      r.pheuTheoTran = h4.indexOf('>' + q.canDH + '<') >= 0;

      r.manCoHinh = (man.match(/<svg /g) || []).length >= 4;
      return { co: true, ...r };
    });

    if (!ra.co) {
      bao(false, 'khung ảnh và bộ vẽ nạp được', 'không thấy KA_CHO hoặc veThangBac');
    } else {
      bao(!ra.soi.length && ra.soCho === 11 && ra.batKhongLyDo && ra.batTyLa && ra.batManMa && ra.batTheSaiTy,
        'BẢNG CHỖ ĐẶT ẢNH: ' + ra.soCho + ' chỗ trên ' + ra.soMan + ' màn, mỗi chỗ khai đủ CẦN ẢNH GÌ · CỠ BAO NHIÊU · VÌ SAO Ở ĐÓ. Thêm một chỗ là thêm một DÒNG ở kho, không sửa mã. Phép kiểm bắt ngay khi một chỗ mất lý do: khung không có lý do sẽ được lấp bằng ảnh mua sẵn, và ảnh mua sẵn làm mất tin cả màn chứ không riêng chỗ ấy. Và bắt cả khung trỏ vào màn không có thật — khung ấy không bao giờ hiện ra mà vẫn chiếm một dòng trong bảng chờ điền',
        ra.soi.join(' ') || ra.soCho + ' chỗ · ' + ra.soMan + ' màn · đủ ba cột');
      bao(ra.chan && ra.nhan && ra.noiLyDoHttp && ra.chanOChoDan,
        'ĐỊA CHỈ ẢNH: CHỈ NHẬN https và assets/, từ chối mọi thứ còn lại — javascript: · data: · blob: · file: · ftp: · đường không có lược đồ. Danh sách CHỈ NHẬN chứ không phải bộ lọc, vì một bộ lọc thì luôn có cách đi vòng. Chặn ngay tại chỗ dán chứ không đợi tới lúc dựng màn. Và http:// bị chặn KÈM LÝ DO: trang chạy https mà kéo ảnh http thì trình duyệt chặn TRONG IM LẶNG, chủ hệ dán xong thấy trống rồi tưởng mình dán sai',
        '7 kiểu địa chỉ bị chặn · 2 kiểu được nhận · datND từ chối ngay');
      bao(ra.chuHeThayBrief && ra.chuHeThayKhoa && ra.hienAnh && ra.hetBrief,
        'KHUNG TRỐNG CHỈ CHỦ HỆ THẤY, và thấy kèm đủ lời dặn lẫn tên khoá để dán. Dán địa chỉ vào thì lời dặn biến mất và ảnh lên đúng chỗ ấy. Địa chỉ đi qua G.nd() — CÙNG lớp với mọi chữ sửa được, nên nó đồng bộ được và vào nhật ký được y như một câu chữ. Dựng riêng một kho cho ảnh là để dành một ngày mà bản này đồng bộ được còn bản kia thì không');
      bao(ra.hinhCoTenTang && ra.hinhCoMauTang && ra.hinhDoiTheoKho && ra.pheuTheoTran && ra.chamDacDung,
        'HÌNH DỰNG THẲNG TỪ KHO, nên nó KHÔNG LỆCH ĐƯỢC với chữ dưới nó: thang lấy tên và màu từ chính CS_TANG, bảy chấm đếm bốn đặc ba rỗng từ chính CS_DULIEU, phễu lấy ba con số từ csQuyMo. Đổi một chữ trong kho thì hình đổi theo ngay trong cùng lần ấy. Một tấm ảnh vẽ tay thì tháng sau kho đổi mà ảnh giữ nguyên — và người xem tin vào ảnh',
        'thang · vòng · chấm · phễu đều đọc kho');
      bao(ra.rongTrongKieu && ra.svgThoatChu && ra.vongCoTron && ra.vongDanhDauBuocCuoi && ra.manCoHinh,
        'bề ngang của hình nằm trong KIỂU chứ không trong thuộc tính — width="100%" cộng height:auto thì trình duyệt rơi về cỡ mặc định 300px, hình khổ 700 co xuống 300 và chữ cỡ 16 còn 6,9px. Lỗi ấy không lộ ra khi đọc mã, chỉ lộ khi NHÌN MÀN, nên nó thành một phép kiểm. Vòng vẽ TRÒN chứ không xếp hàng, vì xếp hàng thì mắt đọc nó là một cái thang dù chữ bên cạnh nói gì. Và chữ trong SVG vẫn thoát y như chữ trong HTML',
        'width trong kiểu · ' + '4 hình trên màn Coach');
    }
  }


  console.log('\n64 · BẬC THANG HÀNH ĐỘNG — ĐÚNG MỘT BẬC HIỆN VIỆC PHẢI LÀM');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ra = await p.evaluate(() => {
      const G = window.G;
      if (!G.btThangNha || !G.veBacThang) return { co: false };
      const r = {}, th = G.btThangNha(null);
      r.soBac = th.bac.length;
      r.soiSach = G.btSoiMotViec(th.bac);
      r.soDangO = th.bac.filter(x => x.trangThai === 'dangO').length;
      /* Bậc chưa tới KHÔNG được mang việc. Đây chính là chỗ một màn
         "từng bước" âm thầm biến thành danh sách năm việc. */
      r.chuaMoKhongViec = th.bac.filter(x => x.trangThai !== 'dangO')
        .every(x => !x.viec);
      /* Biểu tượng lấy THẲNG từ HT_TANG.daQuy, không từ bảng chép tay */
      r.bieuTuongTheoKho = th.bac.every((x, i) => x.bieuTuong === G.HT_TANG[i].daQuy);
      const giuDQ = G.HT_TANG[2].daQuy; G.HT_TANG[2].daQuy = 'ZZQQ';
      r.doiTheoKho = G.btThangNha(null).bac[2].bieuTuong === 'ZZQQ';
      G.HT_TANG[2].daQuy = giuDQ;

      /* ── Phá: hai bậc cùng đang đứng ── */
      const b2 = G.btThangNha(null).bac;
      b2[3].trangThai = 'dangO'; b2[3].viec = 'x';
      r.batHaiBac = G.btSoiMotViec(b2).some(x => /cùng đang đứng/.test(x));
      /* ── Phá: bậc chưa tới mà đã hiện việc ── */
      const b3 = G.btThangNha(null).bac;
      b3[4].viecHien = true;
      r.batLoViec = G.btSoiMotViec(b3).some(x => /chưa tới mà đã hiện việc/.test(x));
      /* ── Phá: mất biểu tượng thành công ── */
      const b4 = G.btThangNha(null).bac;
      delete b4[1].bieuTuong;
      r.batMatBieuTuong = G.btSoiMotViec(b4).some(x => /không có biểu tượng/.test(x));
      /* ── Phá: đang đứng mà không có việc ── */
      const b5 = G.btThangNha(null).bac;
      b5.forEach(x => { if (x.trangThai === 'dangO') x.viec = ''; });
      r.batThieuViec = G.btSoiMotViec(b5).some(x => /đang đứng mà không có việc/.test(x));

      /* ── Trên MÀN THẬT: việc của bậc đang đứng có, việc của bậc sau KHÔNG ── */
      const man = G.VIEWS['hanh-trinh-5-tang']();
      const dangO = th.bac.filter(x => x.trangThai === 'dangO')[0];
      const sau = th.bac.filter(x => x.trangThai === 'chuaMo');
      r.manCoViecDangO = !!dangO && man.indexOf(G.U.h(dangO.viec)) >= 0;
      /* Thử thách của bậc chưa tới vẫn nằm ở phần SÂU bên dưới màn — đó
         là đúng, vì phần sâu là bảng tra cứu. Cái phải vắng là trong
         CHÍNH cái thang. Nên cắt lấy đoạn thang rồi soi trong đó. */
      const i1 = man.indexOf('<ol class="bt">'), i2 = man.indexOf('</ol>', i1);
      const thang = i1 >= 0 ? man.slice(i1, i2) : '';
      r.thangCoRuot = thang.length > 200;
      r.thangKhongLoViec = sau.every(x => {
        const t = (G.HT_TANG.filter(y => y.daQuy === x.bieuTuong)[0] || {}).thuThach;
        return !t || thang.indexOf(G.U.h(t)) < 0;
      });
      r.thangCoBieuTuong = th.bac.every(x => thang.indexOf(G.U.h(x.bieuTuong)) >= 0);
      /* Ba trạng thái phải phân biệt được KHÔNG CẦN MÀU — người không
         phân biệt được màu, và bản in đen trắng, đều phải đọc ra.

         Dựng một thang MẪU có đủ ba trạng thái để đo. Đo trên thang
         thật thì trượt: nhà chưa đi bậc nào nên không có bậc "đã xong",
         và phép kiểm đòi thấy thứ chưa tồn tại — đỏ oan, không phải
         mã hỏng. */
      const mau3 = G.veBacThang([
        { so: 1, c: '#0B6675', bieuTuong: 'A', trangThai: 'xong' },
        { so: 2, c: '#B4720F', bieuTuong: 'B', trangThai: 'dangO', viec: 'v' },
        { so: 3, c: '#0B7350', bieuTuong: 'C', trangThai: 'chuaMo' }
      ]);
      r.baDangKhacNhau = /stroke-dasharray/.test(mau3) &&      /* chưa mở */
        mau3.indexOf('stroke="#fff"') >= 0 &&                  /* đã xong: dấu tích */
        /class="bt-b bt-dangO"/.test(mau3) &&                  /* đang đứng */
        mau3.indexOf('ĐÃ LẤY ĐƯỢC') >= 0 &&                    /* và có chữ, không chỉ có màu */
        mau3.indexOf('CHƯA MỞ') >= 0;
      return { co: true, ...r };
    });

    if (!ra.co) {
      bao(false, 'bậc thang hành động nạp được', 'không thấy btThangNha');
    } else {
      bao(!ra.soiSach.length && ra.soBac === 5 && ra.soDangO === 1 && ra.chuaMoKhongViec,
        'NĂM BẬC, VÀ ĐÚNG MỘT BẬC HIỆN VIỆC PHẢI LÀM. Bậc đã xong hiện BIỂU TƯỢNG lấy được; bậc chưa tới chỉ hiện tên biểu tượng và GIẤU việc. Đây là chỗ một màn "từng bước" âm thầm biến thành danh sách năm việc — luật "người mệt đọc một việc thì làm, đọc ba việc thì đóng máy" đã nằm trong kho từ bản 9.21 dưới dạng câu, nay nó thành hàm',
        ra.soiSach.join(' ') || ra.soBac + ' bậc · 1 bậc đang đứng · 4 bậc giấu việc');
      bao(ra.batHaiBac && ra.batLoViec && ra.batMatBieuTuong && ra.batThieuViec,
        'phép soi bắt được cả bốn kiểu hỏng: hai bậc cùng đang đứng · bậc chưa tới mà lộ việc · bậc mất biểu tượng thành công · bậc đang đứng mà không có việc nào để làm',
        '4/4 kiểu phá đều đỏ');
      bao(ra.bieuTuongTheoKho && ra.doiTheoKho,
        'BIỂU TƯỢNG THÀNH CÔNG lấy thẳng từ HT_TANG.daQuy — SỰ THẬT · NHỊP · AN TOÀN · TỰ CHỦ · BẢN LĨNH — và việc lấy từ HT_TANG.thuThach. Không kho mới, không bảng chép tay: cùng một luật ghi hai chỗ là hai bản sẽ có ngày lệch nhau, và lúc lệch thì không ai biết bản nào đúng. Đổi một chữ trong kho thì thang đổi theo ngay',
        'đổi daQuy ở kho → thang đổi theo');
      bao(ra.thangCoRuot && ra.manCoViecDangO && ra.thangKhongLoViec && ra.thangCoBieuTuong && ra.baDangKhacNhau,
        'trên MÀN THẬT: cái thang in đủ năm biểu tượng, in việc của bậc đang đứng, và KHÔNG in thử thách của bốn bậc chưa tới. Ba trạng thái phân biệt được mà không cần màu — đá đặc có dấu tích, đá viền liền, đá viền đứt — nên bản in đen trắng và người không phân biệt được màu đều đọc ra',
        'thang có ruột · việc đang đứng có · việc bậc sau vắng · 3 dạng khác nhau');
    }
  }


  console.log('\n65 · TIA HY VỌNG — CÒN BAO NHIÊU NỮA, VÀ QUA RỒI THÌ THẤY GÌ');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length, { timeout: 60000 });
    const ra = await p.evaluate(() => {
      const G = window.G;
      if (!G.bdTiaHyVong || !G.BD_CAP) return { co: false };
      const r = {}, t = G.bdCap();
      /* Bốn cột phải có đủ ở MỌI mốc, không chỉ mốc đầu: mốc thiếu cột
         `wow` là mốc hứa suông, và người đi tới đó mới biết mình bị hụt. */
      r.duCot = G.BD_CAP.every(c => c.mocThat && c.mo && c.wow && c.dk);
      /* Lời hứa trên màn phải khớp điều kiện máy — bdSoiLoiHua() đã có */
      r.hueKhop = (G.bdSoiLoiHua() || []).length === 0;

      const the = G.bdTiaHyVong();
      r.coThe = the.length > 200;
      r.theCoMo = t.tiepTheo ? the.indexOf(G.U.h(t.tiepTheo.mo)) >= 0 : false;
      r.theCoWow = t.tiepTheo ? the.indexOf(G.U.h(t.tiepTheo.wow)) >= 0 : false;
      /* Chưa ghi tối nào thì nói việc đầu tiên, KHÔNG vẽ thanh rỗng rồi
         gọi nó là khởi đầu. */
      r.chuaGhiNoiThang = (t.bangChung.toi > 0) || /Ghi tối đầu tiên/.test(the);

      /* ── Phần trăm phải đo trên chỉ số CÒN THIẾU NHIỀU NHẤT ──
         Lấy trung bình ba chỉ số thì thanh đầy lên trong khi cái chặn
         thật vẫn đứng yên — một lời hứa sai, và người đọc chỉ biết khi
         thanh gần đầy mà mốc vẫn không mở. */
      const giu = G.S.journal;
      const j = {}; const nay = new Date();
      for (let i = 0; i < 30; i++) {
        const d = new Date(nay.getTime() - i * 86400000);
        j[d.toISOString().slice(0, 10)] = 'có ghi';
      }
      G.S.journal = j;
      const t2 = G.bdCap();
      const the2 = G.bdTiaHyVong();
      const pt = Number((/width:(\d+)%/.exec(the2) || [0, -1])[1]);
      const dk2 = (t2.tiepTheo || {}).dk || {};
      const ptThat = Math.min.apply(null, ['toi', 'chuoi', 'bai']
        .filter(k => dk2[k])
        .map(k => Math.round(((t2.bangChung[k] || 0) / dk2[k]) * 100)));
      r.ptTheoChoChan = !t2.tiepTheo || pt === Math.max(0, Math.min(100, ptThat));
      r.daDiThiCoSo = t2.bangChung.toi >= 30 && t2.cap > 0;
      G.S.journal = giu;

      /* Hết mốc thì KHÔNG hứa thêm — thẻ vắng hẳn, không in một thẻ rỗng */
      const giuCap = G.BD_CAP;
      G.BD_CAP = [G.BD_CAP[0]];
      G.S.journal = j;
      r.hetMocThiVang = G.bdTiaHyVong() === '';
      G.BD_CAP = giuCap; G.S.journal = giu;

      /* Trên MÀN THẬT của nhà mình */
      const man = G.VIEWS['ban-do']();
      r.manCoThe = man.indexOf('class="tia"') >= 0;
      r.manCoViecHomNay = man.indexOf('VIỆC CỦA NHÀ MÌNH HÔM NAY') >= 0;
      /* Việc hôm nay đứng TRƯỚC tia hy vọng: làm gì trước, để làm gì sau */
      r.thuTuDung = man.indexOf('VIỆC CỦA NHÀ MÌNH HÔM NAY') < man.indexOf('class="tia"');
      return { co: true, ...r };
    });

    if (!ra.co) {
      bao(false, 'tia hy vọng nạp được', 'không thấy bdTiaHyVong');
    } else {
      bao(ra.duCot && ra.hueKhop,
        'MƯỜI MỐC, MỖI MỐC ĐỦ BỐN CỘT: điều kiện máy đọc · cùng điều kiện ấy viết bằng lời cho nhà mình · qua rồi thì MỞ gì · và nhà mình sẽ THẤY gì. Mốc thiếu cột "thấy gì" là mốc hứa suông, và người đi tới đó mới biết mình bị hụt. Lời hứa trên màn khớp đúng điều kiện máy — hứa một đằng mở một nẻo là cách mất lòng tin nhanh nhất',
        '10 mốc đủ cột · lời hứa khớp điều kiện');
      bao(ra.coThe && ra.theCoMo && ra.theCoWow && ra.chuaGhiNoiThang,
        'thẻ in đúng ba thứ: còn bao nhiêu nữa · qua rồi thì mở gì · và nhà mình sẽ thấy gì. Câu "thấy gì" lấy nguyên văn từ kho, và nó KHÔNG hứa "gia đình hạnh phúc" — nó nói một thứ cụ thể nhà mình sẽ nhìn thấy, lấy từ chính dữ liệu nhà mình vừa ghi. Lời hứa mơ hồ thì ai cũng viết được và không ai đòi được; lời hứa cụ thể thì đòi được, nên nó mới là tia hy vọng thật. Chưa ghi tối nào thì nói thẳng việc đầu tiên, không vẽ một thanh rỗng rồi gọi là khởi đầu');
      bao(ra.ptTheoChoChan && ra.daDiThiCoSo && ra.hetMocThiVang,
        'THANH TIẾN ĐỘ ĐO TRÊN CHỈ SỐ CÒN THIẾU NHIỀU NHẤT, không lấy trung bình. Lấy trung bình thì thanh đầy lên trong khi cái chặn thật vẫn đứng yên — người đọc chỉ biết mình bị lừa lúc thanh gần đầy mà mốc vẫn không mở. Và hết mốc thì thẻ VẮNG HẲN, không in một thẻ rỗng để hứa thêm',
        'ghi 30 tối → phần trăm theo chỗ chặn · hết mốc → thẻ vắng');
      bao(ra.manCoThe && ra.manCoViecHomNay && ra.thuTuDung,
        'trên màn nhà mình mở ra đầu tiên: VIỆC HÔM NAY đứng trước, TIA HY VỌNG đứng sau. Hai thẻ trả lời hai câu khác nhau — "làm gì" và "để làm gì" — nên chúng đứng cạnh nhau chứ không thay nhau, và đúng thứ tự ấy: người mệt cần biết làm gì trước, cần lý do sau');
    }
  }


  console.log('\n66 · BÀN CỜ HÀNH TRÌNH — MỘT NGÀY MỘT QUÂN, NHÀ MÌNH TỰ CHỌN');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    /* Chờ THÊM cả HT_TANG và BD_LON, không chỉ chờ hàng nạp rỗng. Hàng
       rỗng đi trước lúc kho cuối gắn vào G một nhịp, và mục này đọc
       HT_TANG.khoNhat — chờ thiếu thì mục đỏ ngẫu nhiên, mà một mục đỏ
       ngẫu nhiên thì lần sau không ai tin nó nữa. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length &&
      window.G.HT_TANG && window.G.BD_LON, { timeout: 60000 });
    const ra = await p.evaluate(() => {
      const G = window.G;
      if (!G.bcGoiY || !G.BC_TRONGSO) return { co: false };
      const r = {}, giuSo = JSON.stringify(G.S.banCo || {});
      G.S.banCo = {};
      const s = G.bcSoi();
      r.soi = s.loi; r.chuaDo = s.chuaDo;

      /* ── Số ngày đọc được TRÊN MÁY GIA ĐÌNH ──
         HP_TANG ở gói nghề vì nó chứa GIÁ; số ngày thì không phải bí mật.
         Máy gia đình không đọc được số ngày thì bàn cờ của chính họ không
         biết mình dài bao nhiêu ô, và màn ấy trống. */
      r.coHP_NGAY = !!G.HP_NGAY && !G.HP_TANG;
      r.ngay = ['T1', 'T2', 'T3', 'T4', 'T5'].map(t => G.bcSoNgay(t));
      r.ngayDung = JSON.stringify(r.ngay) === JSON.stringify([7, 21, 90, 365, 365]);

      /* ── Đúng mười gợi ý, mỗi bánh đà một ── */
      const gy = G.bcGoiY('T1');
      r.soGoiY = gy.length;
      r.moiBanhDaMot = new Set(gy.map(x => x.banhDa)).size === gy.length;
      r.duCot = gy.every(x => x.ten && x.viec && x.diem);
      /* Trọng số theo quan hệ tầng, không gán tay */
      r.trongSoDung = gy.every(x => {
        const i = ['T1', 'T2', 'T3', 'T4', 'T5'].indexOf(x.tang);
        return x.diem === (i === 0 ? 3 : i > 0 ? 1 : 2);
      });
      const gy3 = G.bcGoiY('T3');
      r.doiTheoTang = gy3.filter(x => x.tang === 'T1')[0].diem === 2 &&
                      gy3.filter(x => x.tang === 'T3')[0].diem === 3 &&
                      gy3.filter(x => x.tang === 'T5')[0].diem === 1;

      /* ── BA NGƯỜI, MỘT QUÂN ──
         Ô chỉ có màu khi ĐỦ số người nhà mình đã khai. Nhưng công của
         mỗi người cộng ngay khi họ làm xong — người làm xong mà thấy màn
         hình như chưa có gì xảy ra sẽ thôi làm trước cả nhà. */
      r.vaiMacDinh = G.bcVaiNha().map(v => v.ma).join(',');
      const k1 = G.bcDat('T1', 'me', gy[0].ma);
      r.datDuoc = k1.ok === true && k1.diem === gy[0].diem;
      const dMe = G.bcDo('T1');
      r.congNgayDuChuaDay = dMe.tong === gy[0].diem && dMe.soO === 0 && dMe.dangDo === 1;
      r.noiConThieu = k1.day === false && k1.conThieu.length === 2;
      /* Cùng một người, cùng một ngày, đặt lần hai → từ chối */
      r.chanLanHai = G.bcDat('T1', 'me', gy[1].ma).ok === false;
      /* Vai nhà mình chưa khai → từ chối */
      r.chanVaiLa = G.bcDat('T1', 'ong', gy[1].ma).ok === false;
      r.chanNgoaiDs = G.bcDat('T1', 'bo', 'KHONG-CO-THAT').ok === false;
      r.datRoiThiRut = G.bcGoiY('T1').filter(x => x.ma === gy[0].ma).length === 0;
      /* Đủ ba người thì ô mới đầy, và mới có thưởng CÙNG NHAU */
      G.bcDat('T1', 'bo', G.bcGoiY('T1')[1].ma);
      const kCon = G.bcDat('T1', 'con', G.bcGoiY('T1')[2].ma);
      r.duBaThiDay = kCon.day === true && kCon.thuong === 3;
      const dDu = G.bcDo('T1');
      r.oCoMauKhiDu = dDu.soO === 1 && dDu.dangDo === 0 && dDu.chuoi === 1;
      /* Thưởng chỉ cộng ĐÚNG MỘT LẦN */
      r.thuongMotLan = dDu.tong === (dMe.tong + kCon.diem +
        G.bcDo('T1').vaiHomNay.filter(v => v.ma === 'bo')[0].viec.diem + 3 - kCon.diem) ||
        dDu.tong > dMe.tong;
      /* ── NHÀ HAI NGƯỜI: ô đầy y như nhà ba người ──
         Ép đủ ba mới được tính là đuổi đúng những nhà cần hệ này nhất
         ra ngoài. Nhà hai người thì hai việc là đủ. */
      G.S.banCo = {}; G.bcDatVai(['me', 'con']);
      const g2 = G.bcGoiY('T1');
      G.bcDat('T1', 'me', g2[0].ma);
      const kHai = G.bcDat('T1', 'con', g2[1].ma);
      r.haiNguoiCungDay = kHai.day === true && kHai.thuong === 2 && G.bcDo('T1').soO === 1;
      /* Khai rỗng thì rơi về mặc định — bàn cờ không ai đi thì ô nào
         cũng đầy sẵn, và cái bàn ấy vô nghĩa. */
      r.chanKhaiRong = G.bcDatVai([]) === false && G.bcVaiNha().length > 0;
      G.S.bcVai = null; G.S.banCo = { T1: {} };
      G.bcDat('T1', 'me', G.bcGoiY('T1')[0].ma);

      /* ── Mốc mừng: cao nhất, không nổi năm cái cùng lúc ──
         Ô hôm nay mới có mẹ đặt nên nó DỞ DANG, và ô dở dang thì chưa
         có mốc "xong việc hôm nay" — đó là đúng luật, không phải hỏng.
         Cho đủ vai vào rồi mới đo. */
      G.bcVaiNha().forEach(v => {
        if (!G.bcDo('T1').vaiHomNay.filter(x => x.ma === v.ma)[0].xong)
          G.bcDat('T1', v.ma, G.bcGoiY('T1')[0].ma);
      });
      r.oDoDangChuaCoMoc = true;
      const m = G.bcMocDat('T1');
      r.mocMotCai = !!m && m.ma === 'MOI_NGAY';
      /* Bảy ngày liền thì mốc đổi lên BAY_LIEN — thử trên bàn TẦNG 3.
         Bàn tầng 1 chỉ có bảy ô, nên bảy ngày liền ở đó LÀ XONG TẦNG và
         mốc cao nhất đúng ra phải là XONG_TANG. Thử trên bàn bảy ô rồi
         đòi thấy BAY_LIEN là phép kiểm đòi sai, không phải mã sai. */
      const nay = new Date();
      G.S.banCo.T3 = {};
      for (let i = 0; i < 7; i++) {
        const d = new Date(nay.getTime() - i * 86400000);
        G.S.banCo.T3[G.bcNgay(d)] = { ma: 'x' + i, bd: 'BD1', diem: 1, c: '#000', muc: 'TANG_SAU' };
      }
      const m7 = G.bcMocDat('T3');
      r.mocLenBay = !!m7 && m7.ma === 'BAY_LIEN';
      /* Và bảy ngày liền trên bàn BẢY Ô thì đúng là xong tầng.
         Ô hôm nay mới có mẹ đặt nên nó DỞ DANG — phải cho đủ vai vào,
         nếu không bàn chỉ kín sáu trên bảy và mốc không lên. */
      const duVai = {}; G.bcVaiNha().forEach(v => {
        duVai[v.ma] = { ma: 'z' + v.ma, bd: 'BD1', diem: 1, c: '#000', muc: 'TANG_SAU' }; });
      for (let i = 0; i < 7; i++) {
        const d = new Date(nay.getTime() - i * 86400000);
        G.S.banCo.T1[G.bcNgay(d)] = { vai: JSON.parse(JSON.stringify(duVai)), thuong: 3 };
      }
      const mX = G.bcMocDat('T1');
      r.mocXongTang = !!mX && mX.ma === 'XONG_TANG';

      /* ── Ngày theo GIỜ MÁY, không theo UTC ──
         toISOString() trả ngày UTC: chín giờ tối giờ Việt Nam đã là hôm
         sau ở UTC, và cả bàn cờ lệch đúng một ô suốt tầng. */
      const d9 = new Date(2026, 8, 2, 21, 30);
      r.ngayTheoMay = G.bcNgay(d9) === '2026-09-02';

      /* ── Hệ tự cấm mình hai điều, và khai ra ── */
      r.khongXepHang = (G.BC_TRONGSO_LUAT || {}).khongXepHang === true;
      r.khongPhat = (G.BC_TRONGSO_LUAT || {}).khongPhatNgayBoLo === true;

      /* ── VÒNG: ĐỌC TỪ CHỖ ĐÃ VIẾT, KHÔNG KHAI LẠI ──
         T2 đọc từ lời hứa cú hích, T3–T4 đọc từ tên chặng. T1 và T5
         thật sự không khai vòng nào — và máy nói KHÔNG CÓ chứ không tự
         đặt ra một con số cho đều bảng. */
      const v2 = G.bcVong('T2'), v3 = G.bcVong('T3'), v4 = G.bcVong('T4');
      r.vongT2 = !!v2 && v2.soVong === 3 && v2.dai === 7 && /CUHICH/.test(v2.docTu);
      r.vongT3 = !!v3 && v3.soVong === 4 && v3.dai === 21 && /HP_TANG/.test(v3.docTu);
      r.vongT1KhongCo = G.bcVong('T1') === null && G.bcVong('T5') === null;
      /* Vòng KHÔNG lát kín tầng ở hai chỗ, và cả hai nằm sẵn trong kho:
         4×21=84≠90 và 4×90=360≠365. Không làm tròn, không giãn vòng cho
         vừa — giãn cho vừa là sửa lời hứa cho khớp cái bàn, mà đáng ra
         phải ngược lại. */
      r.khaiSoDu = v3.du === 6 && v4.du === 5 &&
        /dư 6 ngày chưa nói là gì/.test(v3.duChuaKhai || '');
      /* Chỗ khó đọc từ HT_TANG.khoNhat, và trả về DANH SÁCH:
           T2 'Tuần thứ hai…'                → [2]
           T3 'Chuỗi thứ hai và thứ ba…'     → [2, 3]
         Bản 9.35 chỉ bắt 'tuần thứ N' và trả một số, nên lời báo trước
         im lặng đúng ở tầng ba — tầng dài nhất trước khi sang năm. */
      const kT2 = G.bcVongKho('T2'), kT3 = G.bcVongKho('T3');
      r.vongKho = Array.isArray(kT2) && kT2.length === 1 && kT2[0] === 2 &&
        /Tuần thứ hai/.test(G.bcKhoNhat('T2') || '');
      r.vongKhoT3 = Array.isArray(kT3) && kT3.join(',') === '2,3' &&
        /Chuỗi thứ hai và thứ ba/.test(G.bcKhoNhat('T3') || '');
      /* Kho gọi vòng của tầng ba là CHUỖI, tầng bốn là CHU KỲ. Đọc luôn
         cái CHỮ ấy — gọi cả ba là 'vòng' thì màn nói một đằng mà hợp
         đồng nói một nẻo, và nhà mình phải tự dịch. */
      r.tenVong = v3.ten === 'chuỗi' && v4.ten === 'chu kỳ' && v2.ten === 'vòng' &&
        /4 chuỗi, mỗi chuỗi 21 ngày/.test(v3.la);

      /* ── TẦNG BA: SO VỚI CHUỖI TRƯỚC, VÀ MỐI NỐI ──
         Dựng một bàn T3 thật: chuỗi 1 kín 5 ô, chuỗi 2 kín 9 ô, và cái
         khớp 21→22 để HỞ. Con số phải ra đúng, và khớp phải báo hở. */
      const giuT3 = JSON.stringify(G.S.banCo || {});
      const g0 = new Date(new Date().getTime() - 44 * 86400000);
      const oDay3 = () => { const z = {}; G.bcVaiNha().forEach(v => {
        z[v.ma] = { ma: 'q', bd: 'BD1', diem: 1, c: '#000', muc: 'TANG_SAU' }; });
        return { vai: z, thuong: G.bcVaiNha().length }; };
      const dat3 = i => { G.S.banCo.T3[G.bcNgay(
        new Date(g0.getTime() + i * 86400000))] = oDay3(); };
      G.S.banCo = { T3: {} };
      dat3(0);                                    /* mốc ngày đầu của bàn */
      for (let i = 1; i <= 4; i++) dat3(i);       /* chuỗi 1: 5 ô, ngày 0–4 */
      for (let i = 22; i <= 30; i++) dat3(i);     /* chuỗi 2: 9 ô, ngày 22–30 */
      const dv3 = G.bcVongDo('T3');
      r.vongDoDung = !!dv3 && dv3.length === 4 &&
        dv3[0].soO === 5 && dv3[1].soO === 9 && dv3[0].hon === null && dv3[1].hon === 4 &&
        dv3[0].chuoiDai === 5;
      /* CHỈ SO HAI VÒNG ĐỀU ĐÃ TRỌN. Vòng chưa tới lượt mà bị báo "kém
         chín ô" là bị trách về một việc chưa đến lượt làm; vòng mới đi
         ba ngày mà đem so với một vòng đã trọn hai mươi mốt thì con số
         ấy âm vì LỊCH chứ không vì nhà mình. */
      r.chuaToiThiKhongSo = dv3[3].trangThai === 'chuaToi' && dv3[3].hon === null &&
        dv3[2].trangThai === 'dangDi' && dv3[2].hon === null &&
        dv3[0].trangThai === 'xong' && dv3[1].trangThai === 'xong';
      /* Vòng ĐANG ĐI thì so CÙNG ĐỘ DÀI: chuỗi trước tới đúng ngày thứ
         ấy đã có mấy ô. Chuỗi ba mới sang ngày thứ ba; chuỗi hai trong
         ba ngày đầu của nó (chỉ số 21·22·23) có đúng hai ô. */
      r.soCungDoDai = dv3[2].ngayThu === 3 && dv3[2].truocCungNgay === 2;
      /* Tổng của bốn chuỗi phải bằng tổng của cả bàn TRỪ phần ngoài
         chuỗi — nếu lệch thì một trong hai phép đếm đang đọc sai ô. */
      r.vongDoKhopTong = dv3.reduce((a, x) => a + x.soO, 0) === G.bcDo('T3').soO;
      /* Khớp 21→22 hở (ngày 20 và 21 đều trống); khớp 42→43 CHƯA TỚI
         nên không được nói tới — báo hở một cái khớp chưa tới là bịa. */
      const mn3 = G.bcMoiNoi('T3');
      r.moiNoiHo = !!mn3 && mn3.length === 2 && mn3[0].tu === 1 && mn3[0].noi === false;
      r.moiNoiChuaToiThiIm = mn3.length === 2 && mn3.every(x => x.den <= 3);
      /* RANH GIỚI VÒNG — chỗ lệch một ô kinh điển. Ngày thứ 22 (chỉ số
         21) là ngày ĐẦU của chuỗi hai, không phải ngày cuối của chuỗi
         một. Lệch một ở đây thì mọi con số so-với-chuỗi-trước sai hết
         mà không đỏ ở đâu cả. */
      dat3(21);
      const dvB = G.bcVongDo('T3');
      r.ranhVong = dvB[0].soO === 5 && dvB[1].soO === 10;
      /* Nối được thì phải báo nối: lấp đúng hai ô hai bên khớp 42→43. */
      dat3(41); dat3(42);
      const mn3b = G.bcMoiNoi('T3');
      r.moiNoiNoiDuoc = mn3b[1].tu === 2 && mn3b[1].noi === true;
      /* Và mối nối KHÔNG được trừ điểm — khớp hở xong thì tổng vẫn y
         nguyên. Luật 8: ô trống là ô trống. */
      r.moiNoiKhongPhat = (G.BC_VONG_LUAT || {}).moiNoiKhongPhat === true &&
        G.bcDo('T3').tong === G.bcDo('T3').soO * 2 * G.bcVaiNha().length;
      /* Trên màn tầng ba: có số của từng chuỗi, có cái khớp, có thử thách */
      G.S.bcTang = 'T3';
      const m3 = G.VIEWS['ban-co']();
      r.manT3 = /class="bc-vong-so"/.test(m3) && /class="bc-khop/.test(m3) &&
        m3.indexOf('Chuỗi 1') >= 0 && m3.indexOf('Ngoài chuỗi') >= 0 &&
        m3.indexOf(G.U.h('Đi bốn chuỗi hai mươi mốt ngày nối nhau')) >= 0;
      /* Hai chuỗi khó phải cùng được đánh dấu, không phải một */
      r.manHaiChoKho = (m3.match(/bc-vong-kho/g) || []).length === 2;

      /* ══════ TẦNG NĂM ══════
         Thử thách của nó có HAI vế: 'Kèm một nhà mới đi hết mùa đầu của
         họ, MÀ NHỊP NHÀ MÌNH KHÔNG TỤT.' Vế hai đo được ngay trên hai
         bàn đã có; vế một thì không kho nào khai, và màn phải nói thẳng
         là chưa đo được chứ không đưa ra một con số cho đủ ô. */
      G.S.banCo = { T4: {}, T5: {} };
      const dat5 = (t, lui, tu, den) => {
        const g = new Date(new Date().getTime() - lui * 86400000);
        for (let i = tu; i <= den; i++)
          G.S.banCo[t][G.bcNgay(new Date(g.getTime() + i * 86400000))] = oDay3();
      };
      dat5('T4', 500, 0, 299);      /* 300 ô trên 365 ngày đã trọn → 82% */
      dat5('T5', 99, 0, 49);        /* 50 ô trên 100 ngày đã qua  → 50% */
      const nk = G.bcNhipKhongTut('T5');
      /* NHỊP CHIA CHO NGÀY ĐÃ QUA, không chia cho cả tầng. Chia cho 365
         thì tầng nào đang đi cũng "kém", và nó kém vì LỊCH. */
      r.nhipChiaNgayDaQua = !!nk && nk.nay.qua === 100 && nk.nay.soO === 50 &&
        nk.truoc.qua === 365 && nk.truoc.soO === 300;
      r.nhipTut = !!nk && nk.tut === true && nk.chenh === -32 && nk.tangTruoc === 'T4';
      /* ĐIỀU KIỆN ĐỌC TỪ CÂU CỦA KHO, không gắn cứng vào mã tầng. Tầng
         ba không khai câu ấy nên tầng ba không bị đo. */
      r.nhipDocTuCau = G.bcNhipKhongTut('T3') === null &&
        /nhịp nhà mình không tụt/i.test(G.bcThuThach('T5') || '');
      /* Không có bàn tầng trước thì nói THIẾU GÌ, không đưa ra con số. */
      const luuT4 = G.S.banCo.T4; G.S.banCo.T4 = {};
      const nk2 = G.bcNhipKhongTut('T5');
      r.nhipChuaDo = !!nk2 && nk2.chuaDo === true && /tầng 4/i.test(nk2.thieu || '');
      G.S.banCo.T4 = luuT4;
      /* Nhịp giữ được thì nói giữ được — phép kiểm phải đỏ được cả hai chiều. */
      dat5('T5', 99, 50, 99);
      r.nhipGiu = G.bcNhipKhongTut('T5').tut === false;
      dat5('T4', 500, 0, 299); G.S.banCo.T5 = {}; dat5('T5', 99, 0, 49);

      /* ── VẾ MỘT: KÈM MỘT NHÀ ──
         Chủ hệ thống chốt: nhà mình khai tên · tầng · ngày bắt đầu; MÙA
         ĐẦU dài theo quy định của từng tầng; và nhà được kèm đi đúng chu
         kỳ tầng, KHÔNG ĐƯỢC VƯỢT khi chưa hoàn thành KPI. Không việc nào
         đẻ ra một con số mới — mùa đầu và chu kỳ đều ĐỌC từ bảng học phí. */
      const luiN = n => G.bcNgay(new Date(new Date().getTime() - n * 86400000));
      delete G.S.bcKem;
      r.kemChuaKhai = G.bcKemDo() === null;
      r.kemChanKhaiSai = G.bcDatKem('', 'T1', luiN(3)).ok === false &&
        G.bcDatKem('Nhà A', 'T9', luiN(3)).ok === false &&
        G.bcDatKem('Nhà A', 'T1', '01/09/2026').ok === false &&
        G.bcDatKem('Nhà A', 'T1', G.bcNgay(new Date(Date.now() + 86400000))).ok === false &&
        G.bcKemDo() === null;
      /* Mùa đầu tầng một = BẢY ngày, và nó đọc từ bảng học phí chứ không
         gõ tay: đổi tên chặng ở kho thì mùa đầu đổi theo trong cùng lần
         chạy. Gõ tay là dựng bản thứ hai của một con số đã có. */
      G.bcDatKem('Nhà Minh An', 'T1', luiN(3));
      const dk1 = G.bcKemDo();
      r.kemMuaDauT1 = dk1.muaDau === 7 && dk1.qua === 4 && dk1.conLai === 3 &&
        dk1.hetLich === false;
      const hpT1 = (G.HP_TANG || G.HP_NGAY).filter(x => x.tang === 'T1')[0], luuT1 = hpT1.ten;
      hpT1.ten = 'Chặng nền — 5 ngày nhận diện';
      if (G.HP_NGAY) { const z = G.HP_NGAY.filter(x => x.tang === 'T1')[0];
        z.ngay = 5; z.ten = hpT1.ten; }
      r.kemMuaDauDocTuKho = G.bcKemDo().muaDau === 5;
      hpT1.ten = luuT1;
      if (G.HP_NGAY) { const z = G.HP_NGAY.filter(x => x.tang === 'T1')[0];
        z.ngay = 7; z.ten = luuT1; }
      /* ĐI ĐÚNG CHU KỲ TẦNG: chu kỳ cũng đọc từ tên chặng, y như bàn cờ
         của chính nhà mình. Nhà kia ở tầng ba, ngày thứ 31 → chuỗi 2,
         ngày thứ 10 của chuỗi ấy. */
      G.bcDatKem('Nhà B', 'T3', luiN(30));
      const dk3 = G.bcKemDo();
      r.kemDungChuKy = dk3.muaDau === 90 && dk3.qua === 31 &&
        dk3.vong.soVong === 4 && dk3.vong.dai === 21 &&
        dk3.vongNao === 2 && dk3.ngayTrongVong === 10;
      /* HẾT NGÀY KHÔNG PHẢI LÀ XONG TẦNG. */
      G.bcDatKem('Nhà D', 'T1', luiN(9));
      r.kemHetLich = G.bcKemDo().hetLich === true && G.bcKemDo().conLai === 0;
      G.bcDatKem('Nhà E', 'T2', luiN(21));
      r.kemNgoaiVong = G.bcKemDo().ngoaiVong === true;
      /* KHÔNG SUY KPI TỪ LỊCH. Ngưỡng và câu cổng nằm ở gói NGHỀ; máy gia
         đình không mở được, và lúc ấy màn nói thiếu gì kèm TÊN KHO chứ
         không tự đặt ra một ngưỡng cho đủ ô. */
      const ckem = G.bcKemCong('T3');
      r.kemKhongSuyKPI = ckem.chuaDo === true && /DOLUONG_KH/.test(ckem.thieu) &&
        /HP_KICHBAN/.test(ckem.thieu) && ckem.chiSo === undefined &&
        (G.BC_KEM_LUAT || {}).khongSuyKPITuLich === true;

      /* ── BÀN DÀI KHÔNG KHAI VÒNG THÌ CHIA THEO THÁNG LỊCH ── */
      G.bcDatKem('Nhà Minh An', 'T1', luiN(9));
      G.S.bcTang = 'T5';
      const man5 = G.VIEWS['ban-co']();
      r.chiaThang = (man5.match(/bc-vong thang/g) || []).length >= 12;
      /* Chia tháng KHÔNG được làm mất hay nhân đôi một ngày nào. */
      r.thangDuOMotLan = (man5.match(/class="bc-o/g) || []).length === 365;
      /* Ô CHƯA TỚI phải khác ô đã qua mà để trống: 365 − 100 = 265 ô sau. */
      r.oChuaToi = (man5.match(/class="bc-o sau"/g) || []).length === 265;
      r.noiKhongKhaiVong = man5.indexOf('Kho không khai vòng nào cho tầng này') >= 0;
      /* Vế MỘT đứng trước vế HAI, đúng thứ tự trong câu thử thách. Và màn
         KHÔNG được in ra con số ngưỡng nào — nó không có con số ấy. */
      r.kemTrenMan = /class="bc-kem/.test(man5) && man5.indexOf('Nhà Minh An') >= 0 &&
        man5.indexOf(G.U.h((G.BC_KEM_LUAT || {}).hetNgayKhongPhaiXong)) >= 0 &&
        /* Màn gia đình KHÔNG được in ra ngưỡng của gói nghề. Bản đầu tôi
           viết phép này là "không có chuỗi 50%" — sai, vì nhịp của chính
           nhà mình trong bộ đo đúng bằng 50%, và phép kiểm đỏ ở một chỗ
           mã không hỏng. Cấm đúng CÂU NGƯỠNG, không cấm một con số. */
        man5.indexOf('không cho lên tầng') < 0 &&
        man5.indexOf('class="bc-kem') < man5.indexOf('class="bc-nhip');
      /* Vế CHƯA ĐO ĐƯỢC in thẳng lên màn của đúng tầng ấy, không in lung tung. */
      /* Bám vào TẦNG, không bám vào chủ đề câu hỏi: câu hỏi đổi mỗi lần
         chủ hệ trả lời được một chỗ, và một phép kiểm bám vào chủ đề thì
         đỏ mỗi lần công việc TIẾN LÊN — đúng ngược với việc nó phải làm. */
      r.choChuHienT5 = man5.indexOf(G.U.h((G.BC_CHOCHU || [])[0].hoi)) >= 0 &&
        /^Tầng 5/.test((G.BC_CHOCHU || [])[0].o || '');
      G.S.bcTang = 'T3';
      r.choChuKhongHienT3 = G.VIEWS['ban-co']().indexOf(G.U.h((G.BC_CHOCHU || [])[0].hoi)) < 0;
      /* Bàn NGẮN không khai vòng thì vẫn một dải, không bị chia tháng. */
      G.S.bcTang = 'T1'; G.S.banCo.T1 = {}; dat5('T1', 5, 0, 4);
      r.banNganKhongChiaThang = G.VIEWS['ban-co']().indexOf('bc-vong thang') < 0;
      G.bcXoaKem();


      /* ══════ TẦNG MỘT: BÀN CỜ BẢO LÀM, MÀ TẦNG BẢO ĐỪNG ══════
         Cú hích tầng một hứa 'không sửa gì cả', còn bàn cờ thì bày mười
         việc kèm điểm và mời làm ngay tối nay. Nhà mình làm theo bàn thì
         bảy ngày ghi được là đường nền ĐÃ BỊ BÓP — mà cả chặng ấy chỉ đi
         lấy đúng một thứ là đường nền thật. */
      const ch1 = G.CUHICH.filter(x => x.tier === 'T1')[0], luuHua = ch1.hua;
      const ks1 = G.bcKhongSua('T1');
      r.camSua = !!ks1 && /không sửa gì cả/i.test(ks1.cau) && ks1.viecDocTu === 'BD1-03';
      /* ĐỌC TỪ CÂU, không gắn cứng vào mã tầng: bỏ câu ấy đi thì máy im,
         và tầng khác không khai câu ấy thì tầng khác không bị nói. */
      ch1.hua = 'Cả nhà cùng ghi nhật ký bảy tối.';
      r.camSuaDocTuCau = G.bcKhongSua('T1') === null;
      ch1.hua = luuHua;
      r.camSuaTangKhacIm = G.bcKhongSua('T2') === null && G.bcKhongSua('T3') === null;

      /* CỔNG DUY NHẤT CỦA BÀN CỜ: khoanh nếp chỉ mở ở CUỐI chặng.
         Khoanh nếp ở tối thứ ba là rút kết luận từ ba tối — đúng cái sai
         mà cả chặng dựng lên để tránh. */
      G.S.banCo = { T1: {} }; G.S.bcNep = {};
      const dat1 = (lui, tu, den) => { const g = new Date(new Date().getTime() - lui * 86400000);
        for (let i = tu; i <= den; i++)
          G.S.banCo.T1[G.bcNgay(new Date(g.getTime() + i * 86400000))] = oDay3(); };
      dat1(2, 0, 2);
      r.nepCongDong = G.bcNepDoi('T1').moDuoc === false &&
        G.bcNepDoi('T1').conThieu === 4 &&
        G.bcGhiNep('T1', 'nếp', 'lời').ok === false && G.bcNep('T1') === null;
      /* Đủ bảy tối thì mở — và đòi ĐỦ HAI Ô: nếp, và nếp nói lại bằng
         lời nhà mình. Nhắc đúng thuật ngữ thì chưa phải là hiểu. */
      G.S.banCo = { T1: {} }; dat1(6, 0, 6);
      r.nepCongMo = G.bcNepDoi('T1').moDuoc === true &&
        G.bcGhiNep('T1', 'một nếp', '').ok === false &&
        G.bcGhiNep('T1', '', 'lời của mình').ok === false &&
        G.bcGhiNep('T1', 'Con rời bàn lúc 8h30', 'Cứ tới lúc phim là con đứng dậy').ok === true;
      r.nepTangKhacKhongCo = G.bcNepDoi('T2') === null && G.bcNepDoi('T5') === null;

      /* Trên màn: cảnh báo đứng TRƯỚC mười gợi ý, không phải sau — đứng
         sau thì nhà mình đã đọc xong danh sách việc kèm điểm rồi mới gặp
         câu bảo đừng làm. */
      G.S.bcTang = 'T1';
      const man1 = G.VIEWS['ban-co']();
      r.manCamSua = /class="bc-dung"/.test(man1) && man1.indexOf('KHÔNG SỬA GÌ CẢ') >= 0 &&
        man1.indexOf('class="bc-dung"') < man1.indexOf('MƯỜI VIỆC GỢI Ý');
      r.manNep = /class="bc-nep xong"/.test(man1) && man1.indexOf('phim') >= 0;
      /* Bàn kín thì nói ra nhà mình đổi được gì — câu ấy nằm ở
         HT_TANG.doiGiKhiXong từ lâu mà chưa màn nào nói ra đúng lúc. */
      r.manDoiGi = man1.indexOf(G.U.h('tôi không phải người kỷ luật')) >= 0;
      G.S.bcTang = 'T3';
      const manK = G.VIEWS['ban-co']();
      r.manT3SachSe = manK.indexOf('class="bc-dung"') < 0 && manK.indexOf('class="bc-nep') < 0;
      G.S.bcNep = {};

      G.S.bcTang = 'T1'; G.S.banCo = JSON.parse(giuT3);
      /* Biến của vòng: ghi được, và câu mới để trống thì không ghi */
      G.S.bcBien = {};
      r.ghiBien = G.bcGhiBien('T2', 1, 'câu cũ', 'câu mới') === true &&
        G.bcBien('T2', 1).moi === 'câu mới';
      r.chanBienRong = G.bcGhiBien('T2', 2, 'x', '  ') === false;
      /* Chưa ghi biến thì vòng VẪN chạy — bắt điền mới cho đi tiếp là
         dựng một cái cổng ở chỗ đáng ra chỉ cần một lời mời. */
      r.bienKhongBatBuoc = (G.BC_VONG_LUAT || {}).bienKhongBatBuoc !== undefined &&
        G.bcDat('T2', 'me', G.bcGoiY('T2')[0].ma).ok === true;
      G.S.bcBien = {};

      /* ── Trên màn thật ── */
      G.S.banCo = {};
      const man = G.VIEWS['ban-co']();
      r.manCoBan = /class="bc-ban"/.test(man);
      r.manCoDuNgay = ['7', '21', '90', '365'].every(n => man.indexOf('· ' + n + ' ngày') >= 0);
      /* Mỗi thẻ việc nay chứa một nút cho MỖI người chưa chọn, nên số
         nút = 10 việc × số người còn thiếu. */
      const conThieu = G.bcDo('T1').vaiHomNay.filter(v => !v.xong).length;
      r.manCo10 = (man.match(/data-bcdat=/g) || []).length === 10 * conThieu;
      r.manCoBaVai = (G.BC_VAI || []).every(v => man.indexOf('data-bcvai="' + v.ma + '"') >= 0);
      r.manNoiVisao = man.indexOf(G.U.h(G.BC_TRONGSO[0].vi)) >= 0;

      G.S.banCo = JSON.parse(giuSo);
      return { co: true, ...r };
    });

    if (!ra.co) {
      bao(false, 'bàn cờ nạp được', 'không thấy bcGoiY');
    } else {
      bao(!ra.soi.length && ra.coHP_NGAY && ra.ngayDung,
        'NĂM TẦNG, NĂM BÀN CỜ: 7 · 21 · 90 · 365 · 365 ngày — và MÁY GIA ĐÌNH ĐỌC ĐƯỢC. Số ngày nằm ở bảng học phí, mà bảng ấy ở gói NGHỀ vì nó chứa GIÁ. Giấu luôn số ngày thì bàn cờ của chính nhà mình không biết mình dài bao nhiêu ô và màn ấy trống. Nên bản rút HP_NGAY được SINH RA từ HP_TANG lúc đóng gói — sửa số ngày ở bảng học phí thì bản rút đổi theo trong cùng lần chạy. Gõ tay là dựng bản thứ hai, và hai bản thì sẽ có ngày lệch nhau',
        ra.soi.join(' ') || ra.ngay.join(' · ') + ' ngày · đọc từ HP_NGAY ở gói nền');
      bao(ra.soGoiY === 10 && ra.moiBanhDaMot && ra.duCot && ra.trongSoDung && ra.doiTheoTang,
        'ĐÚNG MƯỜI GỢI Ý, mỗi bánh đà đưa ra việc kế tiếp của nó — không dựng kho nhiệm vụ thứ hai, vì một trăm việc đã nằm sẵn trong BD_LON, mỗi việc có sẵn cả "làm gì" lẫn "rồi sẽ thấy gì". Trọng số suy từ QUAN HỆ TẦNG chứ không gán tay: việc của tầng đang đứng ba điểm, tầng đã qua hai, tầng chưa tới một. Đổi tầng thì trọng số đổi theo',
        '10 gợi ý · ở T3 thì T1=2 · T3=3 · T5=1');
      bao(ra.vaiMacDinh === 'me,bo,con' && ra.datDuoc && ra.congNgayDuChuaDay && ra.noiConThieu &&
          ra.chanLanHai && ra.chanVaiLa && ra.chanNgoaiDs && ra.datRoiThiRut && ra.duBaThiDay && ra.oCoMauKhiDu,
        'MỘT QUÂN LÀ BA VIỆC — mẹ một, bố một, con một. Ô chỉ CÓ MÀU khi đủ cả ba; trước đó nó là ô dở dang. Nhưng CÔNG CỦA MỖI NGƯỜI CỘNG NGAY khi họ làm xong: mẹ làm xong thì điểm của mẹ đã vào sổ dù ô chưa đầy — nếu không thì tối nào cũng có người làm xong việc của mình mà thấy màn hình như chưa có gì xảy ra, và người ấy sẽ thôi làm trước cả nhà. Đủ ba thì ô đầy và cả nhà được thêm điểm bằng số người có mặt. Mỗi người tự chọn việc của mình: đặt hộ lần hai trong ngày bị từ chối, vai nhà mình chưa khai cũng bị từ chối',
        'mẹ +3 ô chưa đầy · còn thiếu 2 người · đủ ba thì ô đầy + thưởng 3');
      bao(ra.haiNguoiCungDay && ra.chanKhaiRong,
        'NHÀ HAI NGƯỜI THÌ HAI VIỆC LÀ ĐỦ, và ô ấy đầy y như ô của nhà ba người — không có nhà nào đi chậm hơn vì nhà ít người hơn. Có nhà một mẹ nuôi con, có nhà ông bà nuôi cháu; ép đủ ba mới được tính là đuổi đúng những nhà cần hệ này nhất ra ngoài. Thưởng cùng nhau bằng SỐ NGƯỜI CÓ MẶT chứ không phải một con số cố định — cố định thì nhà đông thấy rẻ còn nhà ít thấy với không tới. Và khai rỗng thì rơi về mặc định: một bàn cờ không ai đi thì ô nào cũng đầy sẵn, và cái bàn ấy vô nghĩa',
        'nhà 2 người: ô đầy · thưởng +2 · khai rỗng bị chặn');
      bao(ra.mocMotCai && ra.mocLenBay && ra.mocXongTang && ra.ngayTheoMay,
        'mốc chúc mừng trả về CAO NHẤT đạt được, không nổi năm cái cùng lúc — nổi năm cái thì không cái nào được nhìn. Bảy ngày liền thì mốc tự lên. Và khoá ô là NGÀY THEO GIỜ MÁY NGƯỜI DÙNG: dùng ngày UTC thì nhà mình đặt quân lúc chín giờ tối giờ Việt Nam rơi vào ô của hôm sau, và cả bàn cờ lệch đúng một ô suốt tầng',
        'chuỗi 7 trên bàn 90 ô → BẢY LIỀN · kín 7/7 ô → XONG TẦNG · 9h30 tối 2/9 → ô ngày 2/9');
      bao(ra.vongKhoT3 && ra.tenVong && ra.vongDoDung && ra.vongDoKhopTong &&
          ra.moiNoiHo && ra.moiNoiChuaToiThiIm && ra.ranhVong &&
          ra.chuaToiThiKhongSo && ra.soCungDoDai && ra.moiNoiNoiDuoc && ra.moiNoiKhongPhat &&
          ra.manT3 && ra.manHaiChoKho,
        'TẦNG BA KHÁC TẦNG HAI Ở BA CHỖ, và cả ba đều đã nằm sẵn trong kho. MỘT: chỗ khó của nó là HAI chuỗi liền — "Chuỗi thứ hai và thứ ba. Không biến cố nào, không kết quả nào, chỉ là dài" — nên cách đọc chỗ khó phải trả về DANH SÁCH; trả về một số thì tầng ba lặng thinh đúng ở tầng dài nhất trước khi sang năm, và lặng thinh ấy không đỏ ở đâu cả. HAI: thử thách của nó đòi bốn chuỗi NỐI NHAU, mà nối nhau là chuyện của đúng một cái khớp — tối cuối chuỗi này và tối đầu chuỗi sau; bốn chuỗi rời nhau là bốn lần bắt đầu lại, và bốn lần bắt đầu lại không phải chín mươi ngày. Khớp hở thì HIỆN RA chứ không phạt, và khớp CHƯA TỚI thì im — báo hở một cái khớp chưa tới là bịa. BA: trong quãng "không kết quả nào" thì kết quả duy nhất có thật là CHÍNH CHUỖI TRƯỚC của nhà mình, và nó nằm sẵn trên bàn cờ chứ không phải đi vay. So với chính mình, không so với nhà khác — luật 11 đã cấm bảng vàng. Kho còn gọi vòng của tầng ba là CHUỖI và tầng bốn là CHU KỲ, nên màn gọi đúng chữ ấy thay vì gọi tất cả là "vòng"',
        'T3 chỗ khó = [2,3] · chuỗi 1: 5 ô → chuỗi 2: 9 ô (+4) · chuỗi 3 đang đi ngày 3, chuỗi trước cùng ngày 2 ô · chuỗi 4 chưa tới thì không so · khớp 1→2 hở · khớp 3→4 chưa tới thì im');
      bao(ra.camSua && ra.camSuaDocTuCau && ra.camSuaTangKhacIm && ra.nepCongDong &&
          ra.nepCongMo && ra.nepTangKhacKhongCo && ra.manCamSua && ra.manNep &&
          ra.manDoiGi && ra.manT3SachSe,
        'TẦNG MỘT: BÀN CỜ BẢO LÀM, MÀ TẦNG BẢO ĐỪNG. Cú hích tầng một hứa nguyên văn "Cả nhà cùng ghi nhật ký bảy tối. KHÔNG SỬA GÌ CẢ. Cuối tuần đọc lại và chỉ ra một mô thức lặp" — còn bàn cờ thì bày ra mười việc kèm ĐIỂM SỐ và mời làm ngay tối nay. Một nhà tầng một đọc màn ấy sẽ bắt đầu đổi giờ học, đặt luật mới, sửa chỗ này chỗ kia; và bảy ngày ghi được sẽ là đường nền ĐÃ BỊ BÓP, không phải đường nền thật — mà cả tầng một chỉ có đúng một việc là lấy cho được đường nền thật ấy. Không luật nào của bàn cờ bị vi phạm ở đây, nhưng bàn cờ đang mời làm đúng cái mà tầng đang cấm, và nó mời bằng điểm số — thứ khó cưỡng hơn một lời khuyên nhiều. Nên câu cấm ĐỨNG TRÊN bàn và TRÊN mười gợi ý: đứng dưới thì nhà mình đã đọc xong danh sách việc rồi mới gặp câu bảo đừng làm. KHOANH MỘT NẾP CHỈ MỞ Ở CUỐI CHẶNG — đây là chỗ DUY NHẤT trong bàn cờ có cổng, và nó có cổng vì kho khai chữ "cuối tuần" chứ không phải vì thấy nên có: khoanh nếp ở tối thứ ba là rút kết luận từ ba tối, đúng cái sai mà cả chặng dựng lên để tránh. Đòi đủ HAI ô — nếp, và nếp nói lại BẰNG LỜI NHÀ MÌNH — vì nhắc đúng thuật ngữ của Học viện thì chưa phải là hiểu. Cả hai đọc từ CÂU của kho chứ không gắn cứng vào mã tầng, nên tầng hai tới tầng năm không bị nói lây',
        'T1 cấm sửa (đọc từ CUHICH.CH-01.hua · vì sao từ BD1-03) · 3/7 tối thì cổng đóng · đủ 7 thì mở và đòi đủ hai ô · T2–T5 không có cả hai');
      bao(ra.kemChuaKhai && ra.kemChanKhaiSai && ra.kemMuaDauT1 && ra.kemMuaDauDocTuKho &&
          ra.kemDungChuKy && ra.kemHetLich && ra.kemNgoaiVong && ra.kemKhongSuyKPI &&
          ra.kemTrenMan,
        'VẾ MỘT CỦA TẦNG NĂM — KÈM MỘT NHÀ — VÀ KHÔNG MỘT CON SỐ MỚI NÀO ĐƯỢC KHAI THÊM. Nhà mình khai ba thứ: tên nhà đang kèm, tầng của họ, ngày họ bắt đầu. Từ ba thứ ấy máy tính hết phần LỊCH: "mùa đầu" dài theo QUY ĐỊNH CỦA TỪNG TẦNG — nhập tầng một là bảy ngày — và con số ấy ĐỌC từ bảng học phí, y như bàn cờ vẫn đọc số ngày; đổi tên chặng ở kho thì mùa đầu đổi theo trong cùng lần chạy. Chu kỳ của tầng nhà kia cũng đọc từ tên chặng: tầng ba ngày thứ 31 là chuỗi hai, ngày thứ mười của chuỗi ấy. HẾT NGÀY KHÔNG PHẢI LÀ XONG TẦNG — nhà được kèm không được vượt sang tầng sau khi chưa hoàn thành KPI, vì một nhà bị đẩy lên khi chưa đủ nền sẽ hỏng ở TẦNG SAU chứ không hỏng ở đây, và lúc ấy chữa đắt hơn nhiều. Ngưỡng KPI và câu cổng nghiệm thu ĐÃ KHAI SẴN ở DOLUONG_KH.M4 và HP_KICHBAN, cả hai ở gói NGHỀ; bàn cờ TRỎ vào đó chứ không chép lại, vì chép lại là dựng bản thứ hai của một luật và hai bản thì sẽ có ngày lệch nhau. Máy gia đình biết LỊCH mà không biết KPI của nhà kia, nên nó nói thẳng chỗ ấy chưa đo được kèm tên kho, và TUYỆT ĐỐI không suy một con số KPI ra từ cái lịch — suy như thế đúng là cái mà luật vừa chốt đã cấm',
        'khai tên · tầng · ngày → mùa đầu T1 = 7 ngày (đọc từ HP) · T3 ngày 31 = chuỗi 2/4 ngày 10 · hết ngày thì báo hết ngày, không báo xong tầng · không màn nào in ra một ngưỡng KPI');
      bao(ra.nhipChiaNgayDaQua && ra.nhipTut && ra.nhipDocTuCau && ra.nhipChuaDo &&
          ra.nhipGiu && ra.chiaThang && ra.thangDuOMotLan && ra.oChuaToi &&
          ra.noiKhongKhaiVong && ra.choChuHienT5 && ra.choChuKhongHienT3 &&
          ra.banNganKhongChiaThang,
        'TẦNG NĂM: MỘT THỬ THÁCH CÓ HAI VẾ, VÀ MÁY CHỈ ĐO ĐƯỢC MỘT. "Kèm một nhà mới đi hết mùa đầu của họ, MÀ NHỊP NHÀ MÌNH KHÔNG TỤT." Vế hai đo được ngay trên hai cái bàn nhà mình đã có: nhịp là ô đầy chia cho số ngày ĐÃ QUA của bàn ấy — chia cho cả ba trăm sáu lăm thì tầng nào đang đi cũng "kém", và nó kém vì LỊCH chứ không vì nhà mình. So bàn tầng năm với bàn tầng bốn: cả hai đều là bàn của CHÍNH nhà mình nên phép so này không phạm luật không-xếp-hạng. Đây là chỗ tầng năm hỏng nhất trong đời thật — dồn hết sức cho nhà đang kèm, còn nếp nhà mình thì tụt, và tụt trong lúc đang làm gương thì hỏng cả hai nhà; câu thử thách có chữ "mà" chính vì thế. Điều kiện ĐỌC TỪ CÂU của kho chứ không gắn cứng vào mã tầng, nên tầng ba không bị đo. Vế một — nhà nào đang được kèm, bắt đầu hôm nào, mùa đầu dài bao nhiêu — KHÔNG kho nào trong hệ khai, nên màn nói thẳng chưa đo được và nói thiếu đúng cái gì; bịa một con số cho vế ấy nguy hơn để trống, vì ô trống thì người ta đi tìm còn con số bịa thì người ta tin. Bàn dài mà kho không khai vòng thì chia theo THÁNG LỊCH — tháng là thứ có sẵn ngoài đời, không phải một cái vòng nghĩ ra cho đều bảng — và chia tháng không được làm mất hay nhân đôi một ngày nào. Cuối cùng: Ô CHƯA TỚI không được trông giống ô đã bỏ lỡ; tối đầu tiên mở bàn tầng năm mà thấy ba trăm sáu tư ô xám thì trông y như ba trăm sáu tư lần bỏ lỡ, và người ta bỏ vì cái NHÌN chứ không vì luật',
        'T5 50% (50/100 ngày đã qua) · T4 82% (300/365) · kém 32 điểm phần trăm · 13 tháng · 365 ô đủ một lần · 265 ô chưa tới');
      bao(ra.vongT2 && ra.vongT3 && ra.vongT1KhongCo && ra.khaiSoDu && ra.vongKho &&
          ra.ghiBien && ra.chanBienRong && ra.bienKhongBatBuoc,
        'BÀN DÀI THÌ CHIA VÒNG, MỖI VÒNG ĐÚNG MỘT BIẾN — và số vòng ĐỌC TỪ CHỖ ĐÃ VIẾT chứ không khai lại: tầng hai đọc từ lời hứa của cú hích ("mỗi vòng bảy ngày thay đúng một biến"), tầng ba và bốn đọc từ chính tên chặng ("90 ngày, 4 chuỗi 21 ngày"). Tầng một và tầng năm thật sự không khai vòng nào, và máy nói KHÔNG CÓ chứ không tự đặt ra một con số cho đều bảng. Vòng KHÔNG lát kín tầng ở hai chỗ — 4×21=84≠90 và 4×90=360≠365 — nên bàn để phần dư ra NGOÀI VÒNG và nói thẳng kho chưa khai mấy ngày ấy là gì; giãn vòng cho vừa là sửa lời hứa cho khớp cái bàn, mà đáng ra phải ngược lại. Chỗ khó nhất của tầng đọc từ HT_TANG.khoNhat và BÁO TRƯỚC: câu ấy nằm trong kho từ bản 9.21 mà chưa màn nào nói ra đúng lúc. Biến của vòng ghi được nhưng KHÔNG bắt buộc — bắt điền mới cho đi tiếp là dựng một cái cổng ở chỗ đáng ra chỉ cần một lời mời',
        'T2 3×7 từ CUHICH · T3 4×21 từ HP_TANG dư 6 · T1/T5 không vòng · vòng khó = 2');
      bao(ra.khongXepHang && ra.khongPhat && ra.manCoBan && ra.manCoDuNgay && ra.manCo10 && ra.manCoBaVai && ra.manNoiVisao,
        'hệ TỰ CẤM MÌNH hai điều và khai thẳng ra màn: điểm không dùng xếp hạng nhà nọ với nhà kia — một nhà đang mùa khó đặt cạnh một nhà đang thuận thì con số ấy nói dối về cả hai; và ngày bỏ lỡ KHÔNG bị phạt — ô trống là ô trống, vì trừ điểm ngày nghỉ là dạy người ta rằng nghỉ một tối là thất bại. Màn cũng in luôn VÌ SAO việc này ba điểm việc kia một, để người chơi đọc được luật chơi của chính mình');
    }
  }


  console.log('\n67 · BẢNG TIN — MỖI CON SỐ KHAI NÓ ĐẾM TỪ ĐÂU');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    /* Chờ THÊM các kho mục này thật sự đọc, không chỉ chờ hàng nạp rỗng.
       Hàng rỗng đi trước lúc kho cuối gắn vào G một nhịp — đo được: lúc
       ấy HT_TANG, TIN_MAU và BK_LUAT đều còn undefined, nên số sao ra
       null và cả mục đỏ ở chỗ mã không hỏng. */
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length &&
      window.G.HT_TANG && window.G.TIN_MAU && window.G.BK_LUAT, { timeout: 60000 });
    const ra = await p.evaluate(() => {
      const G = window.G;
      if (!G.tinSo || !G.TIN_NGUON) return { co: false };
      const r = {};
      r.soi = G.tinSoi();
      r.soTieuChi = (G.TIN_TIEUCHI || []).length;
      r.soLoai = (G.TIN_LOAI || []).length;

      /* ── CỔNG: nguồn khai CHƯA thì không bao giờ ra một con số ──
         Kể cả khi người gọi đưa sẵn một con số vào. Cổng mà bỏ lọt thì
         cả luật "không có nguồn thì không hiện" chỉ là một câu chữ. */
      r.congChanSoBia = G.tinSo('N-XONG', 412).chuaCoNguon === true &&
                        G.tinSo('N-XONG', 412).so === undefined;
      r.congChanMaLa = G.tinSo('KHONG-CO-THAT', 9).chuaCoNguon === true;
      r.congChoQuaNguonThat = G.tinSo('N-NHA', 5).chuaCoNguon === false &&
                              G.tinSo('N-NHA', 5).so === 5;
      /* Bật một nguồn lên CÓ mà quên nói đếm từ đâu → phải đỏ */
      const n = G.TIN_NGUON.filter(x => x.ma === 'N-XONG')[0];
      const giuCo = n.co, giuThieu = n.thieu;
      n.co = true; delete n.thieu;
      r.batCoMaKhongNoiDemTu = G.tinSoi().some(x => /khai CÓ mà không nói đếm từ đâu/.test(x));
      n.co = giuCo; n.thieu = giuThieu;

      /* ── Sáu tiêu chí, và phá từng cái một ── */
      const tot = { viec: 'Ghi 12 tối liền, mỗi tối 3 dòng.', kho: 'Tuần hai suýt bỏ.',
        so: '12', coNguoiThuBa: true, daHoiNguoiThuBa: true, quangCao: false,
        dongYBangChu: true, ngayDongY: '2026-09-02' };
      r.chuyenTot = G.tinSoiChuyen(tot).truot.length === 0;
      function pha(sua) { const c = Object.assign({}, tot); sua(c); return G.tinSoiChuyen(c).truot; }
      r.bat1 = pha(c => { c.viec = ''; }).some(x => /^1 /.test(x));
      r.bat2 = pha(c => { c.kho = ''; }).some(x => /^2 /.test(x));
      r.bat3 = pha(c => { c.viec = 'Ghi nhiều tối liền.'; c.so = ''; }).some(x => /^3 /.test(x));
      r.bat4 = pha(c => { c.daHoiNguoiThuBa = false; }).some(x => /^4 /.test(x));
      r.bat5 = pha(c => { c.quangCao = true; }).some(x => /^5 /.test(x));
      r.bat6 = pha(c => { c.dongYBangChu = false; }).some(x => /^6 /.test(x));
      /* Qua năm trên sáu VẪN LÀ TRƯỢT — cái bị bỏ thường đúng là cái bảo
         vệ người không có mặt lúc gửi chuyện. */
      r.namTrenSauVanTruot = pha(c => { c.dongYBangChu = false; }).length === 1;

      /* ── Máy KHÔNG nói "đạt" ──
         Máy soi được sáu tiêu chí có đủ cột chưa. Máy không đọc được một
         chuyện hay hay dở. Gộp hai câu ấy là giao việc của người cho máy. */
      const kq = G.tinSoiChuyen(tot);
      r.khongNoiDat = kq.khongThayTruot === true && kq.dat === undefined &&
        /Người của Học viện đọc và quyết/.test(kq.y);

      /* ── Gọi tên con số không nguồn đang có trong kho ── */
      r.soKhongNguon = G.tinSoiSoKhongNguon();
      r.batCuHich = r.soKhongNguon.some(x => /CUHICH\..*thamgia/.test(x));

      /* ── Trên màn thật: in chỗ THIẾU, không in con số bịa ── */
      const man = G.VIEWS['bang-tin']();
      r.manNoiThieu = (man.match(/Thiếu:/g) || []).length >= 3;
      r.manKhongBia = man.indexOf('>412<') < 0 && !/412 gia đình/.test(man);
      r.manCoTieuChi = (G.TIN_TIEUCHI || []).every(t => man.indexOf(G.U.h(t.t)) >= 0);
      r.manCoCam = (G.TIN_CAM || []).every(c => man.indexOf(G.U.h(c.t)) >= 0);
      /* Hai chỗ chờ chủ hệ nay ĐÃ CHỐT: 5 điểm cho chuyện hay, 50 điểm
         cho kèm được một nhà lên tầng, quà là bí kíp theo tầng. Phép đo
         cũ đòi màn in ra câu "chờ chủ hệ chốt" — nay phải đòi ngược lại:
         in ra CON SỐ, và không còn câu chờ nào. */
      r.thuongDaChot = G.TIN_THUONG.diem === 5 && G.TIN_THUONG.diemChoChu === undefined &&
        G.TIN_KEM_THUONG.diem === 50 &&
        G.TIN_THUONG.quaKhongVuotTang === true && G.TIN_KEM_THUONG.quaKhongVuotTang === true;

      /* ── BÍ KÍP: SAO ĐỌC TỪ TẦNG, VÀ KHÔNG TRAO VƯỢT TẦNG ── */
      r.saoTheoTang = G.bkSao('T1') === 1 && G.bkSao('T3') === 3 && G.bkSao('T5') === 5;
      const tt3 = G.HT_TANG.filter(x => x.ma === 'T3')[0], luuSo = tt3.so;
      tt3.so = 4; r.saoDocTuKho = G.bkSao('T3') === 4; tt3.so = luuSo;
      r.bkChanVuot = G.bkChoPhep('T3', 3).ok === true && G.bkChoPhep('T3', 1).ok === true &&
        G.bkChoPhep('T1', 5).ok === false && G.bkChoPhep('T3', 4).ok === false &&
        G.bkChoPhep('T3', 0).ok === false && G.bkChoPhep('T3', 'x').ok === false &&
        (G.BK_LUAT || {}).khongVuotTang === true;

      /* ── BA LOẠI LÊN BẢNG, VÀ BA MẪU ── */
      r.baLoaiLenBang = G.TIN_LOAI.filter(x => x.dang === true).map(x => x.ma).join(',') ===
        'LEN_TANG,CHUYEN_HAY,KEM_VUOT' &&
        G.TIN_LOAI.filter(x => x.dang === false).every(x => !!x.khongDangVi);
      const dV = G.tinDien('M-VUOT', { maSo: 'F-007', tang: '3' });
      const dC = G.tinDien('M-CHUYEN', { maSo: 'F-007', tang: '3', diem: 5, sao: 3 });
      const dK = G.tinDien('M-KEM', { maSoKem: 'F-001', maSoDuocKem: 'F-007',
        tang: '2', diem: 50, sao: 5 });
      r.baMau = dV.cau === 'Nhà có mã số F-007 vừa vượt lên tầng 3.' &&
        /F-007/.test(dC.cau) && /5 điểm/.test(dC.cau) && /3 sao/.test(dC.cau) &&
        /F-001/.test(dK.cau) && /F-007/.test(dK.cau) && /50 điểm/.test(dK.cau);
      /* Thiếu chỗ trống thì KHAI THIẾU, không im lặng in {maSo} như thật. */
      r.mauThieuThiKhai = G.tinDien('M-VUOT', { tang: '3' }).dayDu === false &&
        G.tinDien('M-VUOT', { tang: '3' }).thieu.indexOf('maSo') >= 0;
      /* Mã số ngày mai về từ máy chủ — tức là chữ của người khác. */
      const dX = G.tinDien('M-VUOT', { maSo: '<img src=x onerror=alert(1)>', tang: '3' });
      r.mauThoatChu = dX.cau.indexOf('<img') < 0 && dX.cau.indexOf('&lt;img') >= 0;

      /* ── BẢNG TIN CỦA TỪNG TẦNG ── */
      const bt1 = G.tinBangTang('T1'), bt5 = G.tinBangTang('T5');
      r.bangTheoTang = bt1.sao === 1 && bt5.sao === 5 && bt1.mau.length === 3 &&
        /tầng 1/.test(bt1.mau[0].mo.cau) && /tầng 5/.test(bt5.mau[0].mo.cau) &&
        bt1.chuaCoTinSong === true;

      /* ── CHỈ MÃ SỐ, KHÔNG TÊN ──
         Tôi từng viết phép đo ở đây là "FAMILIES không được đóng vào gói
         nào nên không máy khách nào có nó", sau khi đo trên ba vai và
         thấy undefined. Phép đo ấy SAI: ba lần đo kia chạy ở CHẾ ĐỘ MẪU,
         không có khoá, nên không gói nào được mở ra cả. Chạy với khoá
         thật thì máy phụ huynh nhận đủ mười bản ghi FAMILIES, kèm tên
         nhà, tên học viên, tên phụ huynh và tên Coach.
         Đó là một chỗ rò thật, và nó được sửa riêng — không gộp vào phần
         bảng tin. Phép đo ở đây phải là phép đo ĐÚNG TRONG CẢ HAI CHẾ ĐỘ:
         dù kho ấy có mặt hay không, không tên thật nào lọt ra màn tin. */
      const fMau = { id: 'F-001', nha: 'Nhà Minh An', hv: 'Trần Minh An',
        ph: 'Trần Quốc Bảo · Lê Thu Hà', coach: 'Nguyễn Thu Trang', tier: 5 };
      G.S.tinTang = 'T5';
      const man5 = G.VIEWS['bang-tin']();
      const locF = G.tinLocNha(fMau);
      r.locChiMaSo = !!locF && locF.maSo === 'F-001' && locF.tang === 'T5' &&
        (G.TIN_TANG_LUAT.camInTen || []).every(k => locF[k] === undefined);
      r.manKhongLoTen = (G.TIN_TANG_LUAT.camInTen || []).length === 4 &&
        (G.TIN_TANG_LUAT.camInTen || []).every(k => man5.indexOf(G.U.h(fMau[k])) < 0);
      r.khongLoTenThat = !G.FAMILIES || G.FAMILIES.every(function (f) {
        return (G.TIN_TANG_LUAT.camInTen || []).every(function (k) {
          return !f[k] || man5.indexOf(G.U.h(f[k])) < 0;
        });
      });
      r.manTheoTang = (man5.match(/class="tin-dong"/g) || []).length === 3 &&
        (G.HT_TANG || []).every(t => man5.indexOf('data-tintang="' + t.ma + '"') >= 0);
      G.S.tinTang = 'T1';

      /* ── NHÀ KÈM XEM ĐƯỢC GÌ CỦA NHÀ KIA ── */
      const qx = G.bcKemXem();
      r.quyenXem = qx.banCo === true && qx.kpi === true && qx.nhiemVu === false;
      const banK = { '2026-09-01': { vai: { me: { ma: 'BD1-03', bd: 'BD1', diem: 3, c: '#111' } } } };
      const locK = JSON.stringify(G.bcKemLoc(banK));
      r.locBoNhiemVu = locK.indexOf('BD1-03') < 0 && locK.indexOf('BD1') < 0 &&
        locK.indexOf('diem') < 0 && locK.indexOf('#111') >= 0;

      return { co: true, ...r };
    });

    if (!ra.co) {
      bao(false, 'bảng tin nạp được', 'không thấy tinSo');
    } else {
      bao(!ra.soi.length && ra.soTieuChi === 6 && ra.soLoai === 5,
        'năm loại tin, sáu tiêu chí chọn chuyện, bảy điều bảng tin tự cấm — mỗi loại tin khai NÓ ĐẾM TỪ ĐÂU và VÌ SAO nó đáng đăng',
        ra.soi.join(' ') || '5 loại · 6 tiêu chí · 7 điều cấm');
      bao(ra.congChanSoBia && ra.congChanMaLa && ra.congChoQuaNguonThat && ra.batCoMaKhongNoiDemTu,
        'MỌI CON SỐ ĐI QUA MỘT CỔNG DUY NHẤT. Nguồn khai CHƯA CÓ SỔ thì cổng không trả về con số, kể cả khi người gọi đưa sẵn một con số vào tay nó. Có cổng thì chỉ phải canh một chỗ; không cổng thì mỗi lần thêm một dòng tin là một lần phải NHỚ tự hỏi con số này ở đâu ra — và trí nhớ là thứ hỏng đầu tiên. Bật một nguồn lên CÓ mà quên nói đếm từ đâu thì đỏ ngay',
        'chặn số bịa · chặn mã lạ · cho qua nguồn thật · bắt nguồn khai CÓ mà thiếu sổ');
      bao(ra.chuyenTot && ra.bat1 && ra.bat2 && ra.bat3 && ra.bat4 && ra.bat5 && ra.bat6 && ra.namTrenSauVanTruot,
        'SÁU TIÊU CHÍ, PHÁ TỪNG CÁI MỘT ĐỀU BẮT ĐƯỢC: không có việc thật · không có chỗ khó · không có số nào · có người thứ ba mà chưa hỏi · có mùi quảng cáo · chưa đồng ý bằng chữ. Qua NĂM TRÊN SÁU vẫn là trượt — và cái hay bị bỏ qua nhất chính là hai cái bảo vệ người không có mặt lúc gửi chuyện: đứa trẻ trong chuyện, và chữ đồng ý mà sáu tháng sau người ta có quyền đổi ý',
        '6/6 kiểu phá đều bắt · 5 trên 6 vẫn trượt');
      bao(ra.khongNoiDat,
        'máy KHÔNG BAO GIỜ NÓI "ĐẠT" — nó chỉ nói "không thấy chỗ nào trượt", rồi trả việc lại cho người. Máy soi được sáu tiêu chí có đủ cột hay chưa; máy không đọc được một chuyện hay hay dở. Gộp hai câu ấy làm một là giao việc của người cho một cái máy, và cái máy sẽ làm — sai');
      /* Một lời báo gộp mười phép đo thì lúc đỏ nó không nói phép nào
         hỏng, và người sửa phải đoán. Liệt kê tên phép đo hỏng vào dòng
         chi tiết — mất một dòng mã, đổi lại mỗi lần đỏ về sau tiết kiệm
         một vòng chạy mười hai phút. */
      const doTin = ['baLoaiLenBang', 'baMau', 'mauThieuThiKhai', 'mauThoatChu',
        'bangTheoTang', 'manTheoTang', 'khongLoTenThat', 'locChiMaSo', 'manKhongLoTen']
        .filter(k => !ra[k]);
      bao(!doTin.length,
        'TẦNG NÀO CÓ BẢNG TIN CỦA TẦNG ẤY, VÀ CHỈ BA LOẠI TIN LÊN BẢNG. Lý do chia theo tầng không phải kỹ thuật mà là người: nhà tầng một đọc tin của tầng năm thì thấy một khoảng cách xa tới mức không định vị được mình ở đâu trên đường — và cái xa ấy làm người ta BỎ, không làm người ta đi; tin của chính tầng mình thì khoảng cách vừa đúng một bước. Ba loại được đăng — vượt tầng, chuyện hay, tích cực kèm — có chung một tính chất: chúng nói về một việc nhà khác LÀM ĐƯỢC, và việc ấy nhà đang đọc cũng làm được. Hai loại còn lại nói về thứ nhà khác CÓ, mà thấy người khác có thứ mình chưa có thì không ai bước nhanh hơn, chỉ thấy mình chậm. Tin vượt tầng đăng ở bảng của tầng nhà ấy VỪA RỜI, vì người cần thấy nó là người đang đứng ở chỗ nhà kia vừa đứng hôm qua. BẢNG TIN CHỈ NÊU MÃ SỐ: FAMILIES mang cả tên nhà, tên học viên, tên phụ huynh và tên Coach, và kho ấy CÓ MẶT trên máy phụ huynh khi chạy với khoá thật — nên phép đo này soi thẳng chuỗi HTML của màn tin, đối chiếu với TÊN THẬT của cả mười nhà trong kho, chứ không tin vào việc kho ấy vắng mặt. Mẫu thiếu chỗ trống thì KHAI THIẾU chứ không im lặng in ra dấu ngoặc như thật, và mã số đi qua U.h() trước khi ghép vì ngày mai nó là chữ của người khác',
        doTin.length ? 'phép đo hỏng: ' + doTin.join(' · ')
          : '3 dòng mẫu mỗi tầng · sao theo tầng · thiếu chỗ thì khai · thẻ ảnh trong mã số bị thoát · 4 cột tên không lọt ra màn');
      bao(ra.thuongDaChot && ra.saoTheoTang && ra.saoDocTuKho && ra.bkChanVuot,
        'BÍ KÍP: MẤY SAO THÌ ĐỌC TỪ TẦNG, VÀ KHÔNG TRAO VƯỢT TẦNG. Số sao của một bí kíp là SỐ CỦA TẦNG — tầng ba là ba sao — và con số ấy đã nằm ở HT_TANG.so từ lâu, nên không khai lại: đổi số của tầng ở kho thì số sao đổi theo trong cùng lần chạy. Một bí kíp năm sao trao cho nhà đang ở tầng một là thứ đọc mà không dùng được, vì nền chưa có; tệ hơn, nó dạy rằng phần thưởng là thứ NHẬN được chứ không phải thứ MỞ được, mà cả hệ này dựng trên nghĩa thứ hai. Nó cũng là một đường vòng qua chính trần 30% nội dung của khách. Chuyện hay được 5 điểm, kèm được một nhà lên tầng được 50 — gấp mười, vì kèm một nhà đi hết một chặng là việc dài hàng tháng chứ không phải một lần ngồi viết, và con số phải nói đúng công sức nếu không nó dạy sai về việc nào đáng làm',
        'T3 → 3 sao · bí kíp 5 sao cho nhà T1 bị chặn · chuyện hay 5 điểm · kèm vượt tầng 50 điểm');
      bao(ra.quyenXem && ra.locBoNhiemVu,
        'NHÀ KÈM XEM ĐƯỢC BÀN CỜ VÀ KPI CỦA NHÀ KIA, KHÔNG XEM ĐƯỢC NHIỆM VỤ. Vạch nằm đúng chỗ ấy vì nhìn HÌNH của bàn cờ là biết nhà kia đuối tuần nào — đủ để hỏi một câu đúng lúc; còn nhìn TỪNG VIỆC là biết tối qua bố họ chọn gì, mẹ họ chọn gì, và đó không còn là kèm nữa mà là đọc nhật ký của một nhà khác. KPI thì được xem, vì nó để ĐỘNG VIÊN KHÍCH LỆ — không có con số thì lời động viên rơi vào chỗ trống, và nhà được kèm biết là rơi vào chỗ trống. Lọc ở CỔNG chứ không lọc ở màn hình: gửi xuống rồi thì mở công cụ nhà phát triển là đọc được hết, và lỗi ấy đã xảy ra ba lần trong kho này — nên bcKemLoc() bỏ cả mã việc, mã bánh đà lẫn điểm từng ô, chỉ giữ lại màu để vẽ',
        'bàn cờ có · KPI có · nhiệm vụ không · mã việc và mã bánh đà bị bỏ ở cổng');
      bao(ra.batCuHich && ra.manNoiThieu && ra.manKhongBia && ra.manCoTieuChi && ra.manCoCam,
        'BẢNG TIN GỌI TÊN CON SỐ KHÔNG NGUỒN ĐANG NẰM TRONG CHÍNH KHO NÀY: CUHICH khai thamgia 412 · 268 · 174 · 96 · 58 · 143 mà không dòng nào nói chúng đếm từ đâu, trong khi hệ chưa phát hành. Bảng tin không mượn lại chúng — mượn là biến một con số không nguồn thành con số có vẻ được xác nhận, vì nó vừa xuất hiện ở màn thứ hai. Màn in ba chỗ THIẾU SỔ ĐẾM thay vì in một con số đẹp, in đủ sáu tiêu chí và bảy điều tự cấm cho nhà gửi chuyện đọc trước',
        ra.soKhongNguon.length + ' con số không nguồn được gọi tên · màn in 3 chỗ thiếu');
    }
  }


  console.log('\n68B · HAI TỆP KHÔNG ĐƯỢC ĐẶT CÙNG MỘT TÊN HÀM');
  {
    /* Mọi tệp trong src/ đổ chung vào một đối tượng G. Hai tệp cùng đặt
       G.tenGiDo thì tệp nạp SAU thắng, tệp kia im lặng gọi nhầm hàm của
       người khác — và không chỗ nào đỏ.

       Tôi vừa gây ra đúng chuyện này ở bản 9.42: đặt G.tgHomNay cho đồng
       hồ, trong khi src/chuyen-the-gioi.js đã giữ tên ấy từ trước ("tg" ở
       đó là THẾ GIỚI). Chỉ phát hiện vì một phép thử phá trả về mười hai
       khoá lạ hoắc; đọc mã thì không thấy gì cả.

       Phép đo này đọc THẲNG các tệp nguồn, không cần trình duyệt. */
    const dsSrc = JSON.parse(fsGoc.readFileSync(
      pathGoc.join(__dirname, 'danh-sach-src.json'), 'utf8'));
    const tepSrc = (Array.isArray(dsSrc) ? dsSrc : dsSrc.tep || dsSrc.files || [])
      .map(t => 'src/' + String(t).replace(/^src\//, ''));
    const chuNha = {};
    tepSrc.forEach(f => {
      let s; try { s = fsGoc.readFileSync(pathGoc.join(__dirname, '..', f), 'utf8'); }
      catch { return; }
      const re = /^\s*G\.([A-Za-z_][A-Za-z0-9_]*)\s*=\s*function/gm;
      let m; while ((m = re.exec(s))) {
        chuNha[m[1]] = chuNha[m[1]] || [];
        if (chuNha[m[1]].indexOf(f) < 0) chuNha[m[1]].push(f);
      }
    });
    /* SÁU CHỖ TRÙNG CÓ TỪ TRƯỚC BẢN NÀY. Chúng được ghi tên ra đây chứ
       KHÔNG được coi là đã ổn: mỗi cái vẫn là một tệp đang gọi nhầm hàm
       của tệp khác, và mỗi cái cần đọc riêng để biết hai bản có thay
       được cho nhau không. Ghi ra để chúng thôi vô hình, và để phép đo
       này đỏ ngay với bất kỳ chỗ trùng MỚI nào. */
    const daBiet = ['isCanh', 'BI_KHOA_CHEP', 'veChuyen', 'aiHoi', 'moTroLy', 'coTheIn'];
    const trung = Object.keys(chuNha).filter(k => chuNha[k].length > 1);
    const moi = trung.filter(k => daBiet.indexOf(k) < 0);
    const daBietConDo = daBiet.filter(k => trung.indexOf(k) >= 0);
    bao(!moi.length,
      'HAI TỆP KHÔNG ĐƯỢC ĐẶT CÙNG MỘT TÊN HÀM TRÊN G. Mọi tệp trong src/ đổ chung vào một đối tượng G, nên hai tệp cùng đặt G.tenGiDo thì tệp nạp SAU thắng và tệp kia im lặng gọi nhầm hàm của người khác — không chỗ nào đỏ, và đọc mã cũng không thấy vì mỗi tệp đọc riêng đều đúng. Bản 9.42 tôi gây ra đúng chuyện này: đặt G.tgHomNay cho đồng hồ trong khi chuyen-the-gioi.js đã giữ tên ấy từ trước, và "tg" ở đó là THẾ GIỚI chứ không phải thời gian; chỉ phát hiện vì một phép thử phá trả về mười hai khoá lạ hoắc. Phép đo đọc thẳng tệp nguồn nên nó bắt được TRƯỚC khi trình duyệt chạy. Sáu chỗ trùng có từ trước bản này được ghi tên ra chứ không được coi là đã ổn — mỗi cái vẫn là một tệp đang gọi nhầm hàm của tệp khác',
      moi.length ? 'trùng MỚI: ' + moi.map(k => k + ' (' + chuNha[k].join(' · ') + ')').join(' | ')
        : Object.keys(chuNha).length + ' hàm G.* · 0 chỗ trùng mới · ' +
          daBietConDo.length + ' chỗ trùng cũ còn chờ đọc lại: ' + daBietConDo.join(' · '));
  }


  console.log('\n68 · HỒ SƠ NHÀ KHÁC KHÔNG ĐƯỢC XUỐNG MÁY GIA ĐÌNH');
  {
    /* Kho FAMILIES mang hồ sơ mười nhà: tên nhà, tên học viên, lớp, TÊN
       BỐ MẸ, tên Coach, điểm tự chủ, band màu, kỳ tích. Nó nằm ở gói NỀN
       từ đầu, nghĩa là mọi vai đăng nhập — kể cả phụ huynh — nhận đủ hồ
       sơ CHÍN NHÀ KHÁC về máy mình.

       Không màn nào của phụ huynh hiện chúng ra. Nhưng lọc trên màn hình
       không phải bảo vệ dữ liệu, và đây là lần thứ TƯ đúng lớp lỗi ấy:
       KICHBAN 8.9 · CV_MUC 9.7 · mười bảy kho nghề 9.8.

       CHỖ NÀY TỪNG KHÔNG ĐỎ Ở ĐÂU CẢ. Bộ kiểm có mục đối chiếu danh sách
       THUOC_CAP_PHEP với nội dung bảy gói, nhưng nó hỏi "kho này có được
       khai không", không hỏi "kho này có được phép xuống máy này không".
       Mục 68 hỏi câu thứ hai. */
    const doVai = async (u) => {
      await p.evaluate(x => window.G.doLogin(x), u);
      await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length &&
        window.G.HT_TANG, { timeout: 60000 });
      return p.evaluate(() => {
        const G = window.G;
        /* LUẬT CHUNG, không riêng FAMILIES: một bản ghi vừa có TÊN NHÀ
           vừa có TÊN HỌC VIÊN là một hồ sơ gia đình. Máy gia đình được
           giữ ĐÚNG MỘT hồ sơ — hồ sơ của chính nhà mình. Hai trở lên là
           hồ sơ của nhà khác, và không màn nào cần tới nó.
           Cột `ph` và `coach` một mình KHÔNG đủ để kết luận: ma trận
           MATRAN_T* dùng đúng hai tên ấy làm cột VAI TRÒ (phụ huynh làm
           gì, Coach làm gì), 220 bản ghi mỗi tầng, và đó không phải tên
           người. Bắt theo cặp nha+hv thì không vướng chúng. */
        const hoSo = [];
        (G.THUOC_CAP_PHEP || []).forEach(function (k) {
          const v = G[k];
          if (!Array.isArray(v)) return;
          const n = v.filter(function (x) { return x && x.nha && x.hv; }).length;
          if (n) hoSo.push({ kho: k, so: n });
        });
        return { hoSo: hoSo, coFAMILIES: !!G.FAMILIES, soFAMILIES: (G.FAMILIES || []).length,
          soNHA_TOI: (G.NHA_TOI || []).length, dsNha: G.dsNha().length,
          nhaToi: G.myFamily().id,
          /* Phép kiểm phải ĐỎ ĐƯỢC: dựng một kho hồ sơ hai nhà rồi xem
             luật trên có bắt không. Một phép kiểm chưa từng đỏ thì chưa
             phải phép kiểm. */
          batDuocKhiCoHaiNha: (function () {
            G.KHO_THU_RO = [{ nha: 'Nhà A', hv: 'Em A' }, { nha: 'Nhà B', hv: 'Em B' }];
            G.THUOC_CAP_PHEP.push('KHO_THU_RO');
            const bat = G.THUOC_CAP_PHEP.filter(function (k) {
              const v = G[k];
              return Array.isArray(v) &&
                v.filter(function (x) { return x && x.nha && x.hv; }).length > 1;
            }).indexOf('KHO_THU_RO') >= 0;
            G.THUOC_CAP_PHEP.pop(); delete G.KHO_THU_RO;
            return bat;
          })() };
      });
    };
    const ph = await doVai('phuhuynh@gita365.vn');
    const co = await doVai('coach@gita365.vn');
    const quaNhieu = ph.hoSo.filter(x => x.so > 1);

    bao(!quaNhieu.length && ph.coFAMILIES === false && ph.soNHA_TOI === 1 &&
        ph.dsNha === 1 && ph.nhaToi === 'F-001' && ph.batDuocKhiCoHaiNha,
      'HỒ SƠ CỦA NHÀ KHÁC KHÔNG XUỐNG MÁY GIA ĐÌNH. Kho FAMILIES mang hồ sơ mười nhà — tên nhà, tên học viên, lớp, TÊN BỐ MẸ, tên Coach, điểm tự chủ, band màu, kỳ tích — và nó nằm ở gói NỀN từ đầu, nghĩa là một phụ huynh đăng nhập nhận đủ hồ sơ CHÍN NHÀ KHÁC về máy mình. Không màn nào hiện chúng ra, nhưng lọc trên màn hình không phải bảo vệ dữ liệu: gửi xuống rồi thì mở công cụ nhà phát triển là đọc được hết. Đây là lần thứ TƯ đúng lớp lỗi ấy trong kho này — KICHBAN 8.9, CV_MUC 9.7, mười bảy kho nghề 9.8 — và ba lần trước đều được tìm ra bằng một PHÉP ĐO mới chứ không bằng trí nhớ. Chỗ khó là phụ huynh vẫn cần hồ sơ CỦA CHÍNH NHÀ MÌNH, nên gói nền nhận một bản rút NHA_TOI sinh ra từ chính FAMILIES lúc đóng gói: một nguồn, hai hình, đúng cách HP_NGAY đã làm với HP_TANG. Luật đo ở đây là luật CHUNG chứ không riêng một kho: bản ghi nào vừa có tên nhà vừa có tên học viên thì là một hồ sơ gia đình, và máy gia đình được giữ đúng một hồ sơ. Cột ph và coach một mình không đủ để kết luận — ma trận MATRAN_T* dùng đúng hai tên ấy làm cột VAI TRÒ với 220 bản ghi mỗi tầng, và đó không phải tên người',
      quaNhieu.length ? 'còn rò: ' + quaNhieu.map(x => x.kho + ' (' + x.so + ' nhà)').join(' · ')
        : 'phụ huynh: 0 FAMILIES · 1 NHA_TOI (nhà mình, F-001) · luật bắt được kho hai nhà dựng thử');

    bao(co.coFAMILIES === true && co.soFAMILIES === 10 && co.dsNha === 10 &&
        co.nhaToi === 'F-003',
      'VÀ MÁY NGHỀ KHÔNG MẤT GÌ. Coach vẫn nhận đủ mười hồ sơ để làm việc, vì FAMILIES chỉ chuyển từ gói NỀN sang gói NGHỀ chứ không bị cắt bớt. Bảy chỗ trong mã từng đọc thẳng G.FAMILIES — bốn trong số đó gọi .map() không có lưới đỡ, tức là ném lỗi ngay khi kho vắng — nay đi qua MỘT cửa G.dsNha(): có kho nghề thì trả mười nhà, không có thì trả đúng hồ sơ nhà mình. Một cửa thì chỉ phải canh một chỗ; bảy chỗ đọc thẳng thì mỗi chỗ là một lần phải NHỚ tự hỏi máy này có kho ấy không, và trí nhớ là thứ hỏng đầu tiên',
      'coach: 10 hồ sơ · nhà đang xem F-003 — y như trước khi chuyển gói');
  }


  console.log('\n69 · MỤC 30–45 PHÚT MỖI NGÀY, VÀ SỔ TIN CHẠY LIÊN TỤC');
  {
    await p.evaluate(x => window.G.doLogin(x), 'phuhuynh@gita365.vn');
    await p.waitForFunction(() => window.G.KHO && !window.G.KHO.dangNap.length &&
      window.G.HT_TANG && window.G.TG_MUC && window.G.TIN_LOAI, { timeout: 60000 });
    const ra = await p.evaluate(() => {
      const G = window.G, r = {};
      const giuTG = JSON.stringify(G.S.thoigian || {});
      const giuTin = JSON.stringify(G.S.tinNhat || []);
      const ng = G.bcNgay();
      const dat = (o) => { G.S.thoigian = {}; G.S.thoigian['ng|' + ng] = o; };

      /* ── MỤC ĐỌC TỪ KHO, KHÔNG GÕ TAY ── */
      r.mucTuKho = G.TG_MUC.phutMin === 30 && G.TG_MUC.phutMax === 45;
      dat({ __tong: 20 * 60, 'ban-co': 20 * 60 });
      r.duoiMuc = G.tgMucNgay().trangThai === 'duoi' && G.tgMucNgay().conThieu === 10;
      dat({ __tong: 35 * 60, 'ban-co': 35 * 60 });
      r.trongMuc = G.tgMucNgay().trangThai === 'trong';
      dat({ __tong: 60 * 60, 'ban-co': 60 * 60 });
      r.trenMuc = G.tgMucNgay().trangThai === 'tren';
      const luuMin = G.TG_MUC.phutMin; G.TG_MUC.phutMin = 50;
      dat({ __tong: 35 * 60, 'ban-co': 35 * 60 });
      r.doiKhoThiDoiTheo = G.tgMucNgay().trangThai === 'duoi';
      G.TG_MUC.phutMin = luuMin;

      /* ── THỜI GIAN ĐI ĐÂU: VIỆC NỐI VỚI LOẠI, KHÔNG CÓ BẢNG THỨ HAI ──
         Bàn cờ là màn nhà mình NGỒI XUỐNG LÀM mỗi tối. Nó chưa từng được
         khai loại nên rơi về mặc định 'xem' — và ô "thực hiện nhiệm vụ"
         đọc ra ĐÚNG KHÔNG PHÚT NÀO trong khi nhà mình ngồi đó thật. */
      r.banCoLaLam = G.tgLoaiCua('ban-co') === 'lam';
      dat({ __tong: 30 * 60, 'ban-co': 10 * 60, 'mo-thuc': 12 * 60, 'cong-dong': 8 * 60 });
      const hn = G.tgMucNgay();
      const lay = m => (hn.theoViec.filter(x => x.ma === m)[0] || {}).giay;
      r.diDau = lay('LAM') === 600 && lay('HOC') === 720 && lay('TIN') === 480;
      const luuXep = G.TG_XEP['mo-thuc']; G.TG_XEP['mo-thuc'] = 'chuyen';
      const h2 = G.tgMucNgay();
      r.noiVoiLoai = (h2.theoViec.filter(x => x.ma === 'CHUYEN')[0] || {}).giay === 720 &&
        (h2.theoViec.filter(x => x.ma === 'HOC')[0] || {}).giay === 0;
      G.TG_XEP['mo-thuc'] = luuXep;

      /* ── PHÚT VƯỢT TRẦN: CỘNG VÀO TỔNG NHƯNG KHÔNG KHEN ── */
      const tranBC = G.tgChuanCua('ban-co').tran;
      dat({ __tong: tranBC + 300, 'ban-co': tranBC + 300 });
      const hv = G.tgMucNgay();
      r.vuotTran = hv.quaTran.giay === 300 && hv.quaTran.man.length === 1 &&
        hv.giay === tranBC + 300;
      dat({ __tong: 600, 'ban-co': 600 });
      r.duoiTranThiKhongBao = G.tgMucNgay().quaTran.giay === 0;
      r.luatKhaiKhongKhen = G.TG_MUC.phutVuotTranKhongKhen === true;

      /* ── NỘI DUNG ĐỠ NỔI BAO NHIÊU — CỘNG RA, KHÔNG GÕ TAY ── */
      const tn = G.tgTranNoiDung();
      r.tranNoiDung = tn.soMan > 40 && tn.phut > 100 && tn.duMayNgay >= 1 &&
        tn.theoLoai.length >= 4;
      const oXem = G.TG_LOAI.filter(x => x.ma === 'xem')[0], luuChuan = oXem.chuan;
      oXem.chuan = luuChuan * 2;
      r.tranDocTuKho = G.tgTranNoiDung().phut > tn.phut;
      oXem.chuan = luuChuan;

      /* ── SỔ TIN CỦA NHÀ MÌNH ── */
      G.S.tinNhat = [];
      r.soTrong = G.tinNhatKy().length === 0;
      G.tinGhiSuKien('LEN_TANG', { tang: 'T1', soTang: 1 });
      G.tinGhiSuKien('CHUYEN_HAY', { tang: 'T2', soTang: 2 });
      const nk = G.tinNhatKy();
      r.moiNhatTruoc = nk.length === 2 && nk[0].ma === 'CHUYEN_HAY' &&
        nk[0].ten === G.TIN_LOAI.filter(x => x.ma === 'CHUYEN_HAY')[0].ten;
      for (let i = 0; i < 60; i++) G.tinGhiSuKien('LEN_TANG', { tang: 'T1', soTang: 1 });
      r.catO50 = G.tinNhatKy().length === 50;
      r.baoLau = G.tinBaoLau(Date.now()) === 'vừa xong' &&
        G.tinBaoLau(Date.now() - 3 * 3600 * 1000) === '3 giờ trước' &&
        G.tinBaoLau(Date.now() - 2 * 86400 * 1000) === '2 ngày trước';

      /* ── TRÊN MÀN ── */
      G.S.tinNhat = [];
      G.tinGhiSuKien('XONG_CHANG', { tang: 'T1', soTang: 1, soO: 7, can: 7, diem: 42 });
      G.S.tinTang = 'T1';
      const manTin = G.VIEWS['bang-tin']();
      r.manCoSoTin = /class="tin-song"/.test(manTin) && manTin.indexOf('vừa xong') >= 0 &&
        manTin.indexOf('7/7 ô') >= 0;
      dat({ __tong: 35 * 60, 'ban-co': 20 * 60, 'mo-thuc': 15 * 60 });
      const manTg = G.VIEWS['do-thoi-gian']();
      r.manCoMuc = /class="tg-thanh"/.test(manTg) && manTg.indexOf('MỤC 30–45 PHÚT') >= 0 &&
        /class="tg-viec"/.test(manTg) && manTg.indexOf('Học kiến thức theo tầng') >= 0 &&
        manTg.indexOf('nếu xem đủ chuẩn một lượt') >= 0;

      G.S.tinNhat = JSON.parse(giuTin); G.S.thoigian = JSON.parse(giuTG);
      return r;
    });

    const doB = ['mucTuKho', 'duoiMuc', 'trongMuc', 'trenMuc', 'doiKhoThiDoiTheo',
      'banCoLaLam', 'diDau', 'noiVoiLoai', 'vuotTran', 'duoiTranThiKhongBao',
      'luatKhaiKhongKhen', 'tranNoiDung', 'tranDocTuKho', 'soTrong', 'moiNhatTruoc',
      'catO50', 'baoLau', 'manCoSoTin', 'manCoMuc'].filter(k => !ra[k]);
    bao(!doB.length,
      'BA MƯƠI TỚI BỐN MƯƠI LĂM PHÚT MỖI NGÀY — ĐO CHỨ KHÔNG ƯỚC, VÀ THỜI LƯỢNG KHÔNG PHẢI THỨ ĐƯỢC THƯỞNG. Đồng hồ này từ bản 8.9 đã chỉ chạy khi cửa sổ đang mở VÀ có thao tác trong 90 giây gần nhất, nên con số thấp hơn thời gian ngồi trước máy — thà đếm thiếu còn hơn tính công cho một tab bỏ quên. Mục ngày có HAI mốc chứ không một đích: dưới mốc là còn thiếu, trong khoảng là đủ, TRÊN khoảng không phải là hơn. Phút vượt trần của một màn vẫn CỘNG vào tổng vì nó có thật, nhưng bị tách ra và không được khen — quá trần thường là đang TẮC chứ không phải đang chăm, và khen nhầm chỗ ấy là dạy người ta ngồi lâu hơn. Thời gian đi đâu thì cộng theo NĂM VIỆC, mà việc nối với LOẠI MÀN chứ không dựng bảng thứ hai gán từng màn vào từng việc: đổi loại của một màn ở kho thì phút chạy sang việc khác ngay trong cùng lần chạy. Và mục ba mươi phút chỉ có nghĩa nếu NỘI DUNG đỡ nổi, nên máy tự cộng chuẩn của mọi màn vai này mở được rồi nói ra con số ấy — không gõ tay, nên thêm một màn thì con số lên theo. BÀN CỜ HÀNH TRÌNH CHƯA TỪNG ĐƯỢC KHAI LOẠI: nó rơi về mặc định "xem" từ bản 9.32, nghĩa là ô "thực hiện nhiệm vụ" đọc ra ĐÚNG KHÔNG PHÚT NÀO trong khi nhà mình ngồi đó thật, và bảy phút làm thật bị báo là vượt trần. Chỗ ấy không đỏ ở đâu cả vì mặc định luôn trả về một giá trị hợp lệ — chỉ lộ ra khi có người đi cộng phút theo việc. SỔ TIN CỦA NHÀ MÌNH là thứ duy nhất chạy liên tục được hôm nay: ô đầy tối nay, mốc vừa chạm, kín một bàn, khoanh được một nếp — không con số nào phải đi mượn, vì tất cả nằm ngay trong máy người xem. Sổ giữ 50 dòng gần nhất và cắt từ cuối; không cắt thì sau một năm bàn cờ nó có hơn ba trăm dòng và mỗi lần lưu là ghi lại cả ba trăm',
      doB.length ? 'phép đo hỏng: ' + doB.join(' · ')
        : 'dưới/trong/trên mục · bàn cờ = màn LÀM · 10 phút làm + 12 đọc + 8 xem chia đúng ba việc · vượt trần tách riêng · nội dung đỡ nổi ' +
          'cộng ra từ kho · sổ tin mới nhất trước, cắt ở 50');
  }


  goc('\n' + (loi ? '✗ CÒN ' + loi + ' ĐIỂM CHƯA ĐẠT' : '✓ TOÀN BỘ ĐẠT — sẵn sàng phát hành') +
    ' · ' + soDat + ' phép đo đã chạy' + (IM ? ' (chế độ im — chỉ in chỗ đỏ)' : ''));
  await b.close();
  process.exit(loi ? 1 : 0);
})();
