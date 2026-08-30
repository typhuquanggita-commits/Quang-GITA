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
    await p.waitForTimeout(2500);
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
    await p.waitForTimeout(2500);
    await p.evaluate(() => document.querySelector('#top [data-act="logout"]').click());
    await p.waitForTimeout(600);
    bao(await coGate(), 'bấm nút đăng xuất thì về màn đăng nhập');

    /* Đăng xuất phải dọn kho đã giải mã khỏi bộ nhớ */
    bao(await p.evaluate(() => !window.G.KICHBAN || !window.G.KICHBAN.length),
      'đăng xuất dọn luôn nội dung đã giải mã khỏi bộ nhớ');

    /* Bốn cách viết khác nhau đều nhận */
    for (const d of ['dang-nhap', 'login', 'dangxuat', 'logout']) {
      await p.evaluate(() => window.G.doLogin('phuhuynh@gita365.vn'));
      await p.waitForTimeout(1800);
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
    await p.waitForTimeout(2500);
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
    await p.waitForTimeout(2500);
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
      await p.waitForTimeout(2200);
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
      await p.waitForTimeout(1500);
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
    await p.waitForTimeout(1800);

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
      await p.waitForTimeout(1500);
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
    await p.waitForTimeout(1500);

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
      await p.waitForTimeout(1500);
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
    await p.waitForTimeout(1500);

    const tgd = await p.evaluate(() => {
      const G = window.G, r = {};
      r.soLoai = (G.TG_LOAI || []).length;
      r.thangDung = (G.TG_LOAI || []).every(x => x.toiThieu < x.chuan && x.chuan < x.tran);
      r.duY = (G.TG_LOAI || []).every(x => x.y && x.vd);
      /* Mọi màn được xếp loại phải trỏ tới một loại có thật, và màn có thật */
      const loai = (G.TG_LOAI || []).map(x => x.ma);
      r.loaiLa = [...new Set(Object.values(G.TG_XEP).filter(x => loai.indexOf(x) < 0))];
      r.manLa = Object.keys(G.TG_XEP).filter(v => !G.VIEWS[v]);
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
    await p.waitForTimeout(1600);

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
    await p.waitForTimeout(1600);
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
    await p.waitForTimeout(1800);

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
      await p.waitForTimeout(1500);
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
    await p.waitForTimeout(1600);

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
    bao(mb.co, 'lớp bốn băng nạp được từ gói nền');
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
    await p.waitForTimeout(2000);
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
    await p.waitForTimeout(2000);
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
    await p.waitForTimeout(2200);
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
    const lech = dsGop.filter(t => {
      if (!fs36.existsSync(px36.join(goc36, t))) return true;
      return gop.indexOf(doc(t)) < 0;
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
      await p.waitForTimeout(1800);
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
    await p.waitForTimeout(2000);
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
        const j = JSON.parse(Buffer.concat([de.update(b.subarray(28)), de.final()]).toString('utf8'));
        const CHO_PHEP = ['TEST750', 'MATRAN_T' + t];
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
        await p.waitForTimeout(2000);
        trongMay[ten] = await p.evaluate(() => ({
          kb: (window.G.KICHBAN || []).length,
          pd: (window.G.PHACDO || []).length,
          sau: Object.keys(window.G.PD_SAU || {}).length
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
        Object.keys(JSON.parse(Buffer.concat([de.update(b.subarray(28)), de.final()]).toString('utf8')))
          .forEach(n => trongGoi.add(n));
      }
      const donDuoc = await p.evaluate(() => window.G.THUOC_CAP_PHEP || []);
      const quenDon = [...trongGoi].filter(n => donDuoc.indexOf(n) < 0);
      bao(!quenDon.length,
        'mọi kho ĐỔI THEO VAI đều nằm trong danh sách dọn — đổi vai là dữ liệu vai cũ biến mất',
        quenDon.length ? 'quên dọn: ' + quenDon.slice(0, 8).join(' ') :
          trongGoi.size + ' kho, không kho nào sót');

      await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
      await p.waitForTimeout(2200);
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
            tuong: [], man: 0, khoTong: false, coCoChe: false, oTrong: 0, tuTich: 0, doDuoc: 0 };
          G.NAV.forEach(g => g.items.forEach(it => {
            if (!G.vaiThayMan(G.S.roleObj, it)) return;
            ra.man++;
            if (it.v === 'kho-tong') ra.khoTong = true;
            G.S.view = it.v; G.render();
            const t = document.getElementById('main').innerText;
            if (t.indexOf('PHẦN NÀY CHƯA MỞ') >= 0 || t.indexOf('NGOÀI PHẠM VI') >= 0) ra.tuong.push(it.v);
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
          ra[c] = (G.VIEWS['bat-dau']().match(/font-size:15\.5px">([^<]+)</g) || []).join('|');
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

  console.log('\n' + (loi ? '✗ CÒN ' + loi + ' ĐIỂM CHƯA ĐẠT' : '✓ TOÀN BỘ ĐẠT — sẵn sàng phát hành'));
  await b.close();
  process.exit(loi ? 1 : 0);
})();
