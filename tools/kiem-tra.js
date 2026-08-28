/* ═══════════════════════════════════════════════════════════════
   GITA 365 · BỘ KIỂM TRA PHÁT HÀNH
   Chạy trước mỗi lần phát hành:
     npx http-server -p 8099 -s .
     node tools/kiem-tra.js
   Kiểm ba việc: toàn vẹn liên kết dữ liệu · phân quyền của 19 vai
   trên toàn bộ màn hình · chống tiêm mã qua ô nhập của người dùng.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const PW = process.env.PW_PATH || '/opt/node22/lib/node_modules/playwright';
const URL = process.env.GITA_URL || 'http://127.0.0.1:8099/index.html';
const { chromium } = require(PW);

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

  /* Nếu máy đang có bộ khoá (bản nội bộ) thì kiểm cả phần nội dung đã cấp phép.
     Không có khoá thì kiểm ở chế độ mẫu — vẫn phải xanh toàn bộ. */
  let coKhoa = false;
  try {
    const k = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '..', 'kho', 'khoa.json'), 'utf8'));
    if (k && k.khoa) { await p.addInitScript(x => { window.GITA_KHOA = x; }, k.khoa); coKhoa = true; }
  } catch { /* không có khoá — chạy chế độ mẫu */ }
  const errs = [];
  p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => localStorage.clear());
  await p.reload({ waitUntil: 'networkidle' });
  await p.waitForTimeout(500);
  console.log(coKhoa ? '\n(có bộ khoá — kiểm cả nội dung đã cấp phép)' : '\n(không có bộ khoá — kiểm ở chế độ mẫu)');

  let loi = 0;
  const bao = (ok, ten, chiTiet) => {
    if (!ok) loi++;
    console.log((ok ? '  ✓ ' : '  ✗ ') + ten + (chiTiet ? ' — ' + chiTiet : ''));
  };

  /* Đăng nhập vai cao nhất để mở kho theo cấp phép rồi mới rà toàn vẹn */
  await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
  await p.waitForTimeout(2500);

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
    await p.waitForTimeout(40);
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
  bao(pwa.tep >= 25, 'service worker phủ đủ tệp để chạy khi mất mạng', pwa.tep + ' tệp');

  /* ── 5. Bộ test nhận diện và KPI về đích ── */
  console.log('\n5 · BỘ TEST NHẬN DIỆN & KPI VỀ ĐÍCH');
  await p.evaluate(() => window.G.doLogin('phuhuynh@gita365.vn'));
  await p.waitForTimeout(2000);
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
  await p.waitForTimeout(3000);
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

  console.log('\n' + (loi ? '✗ CÒN ' + loi + ' ĐIỂM CHƯA ĐẠT' : '✓ TOÀN BỘ ĐẠT — sẵn sàng phát hành'));
  await b.close();
  process.exit(loi ? 1 : 0);
})();
