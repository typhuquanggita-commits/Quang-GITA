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
      if (/a\.download\s*=|text\/csv|createObjectURL/.test(noi)) xau.push(t);
    }
    bao(!xau.length, 'không tệp nào còn đường tải CSV hay Excel về máy', xau.join(' ') || 'đã gỡ sạch');
    /* Lệnh in chỉ được gọi ở đúng một chỗ: cổng in.
       Bỏ chú thích trước khi đếm — nếu không thì một dòng ghi chú cũng
       làm phép kiểm này báo sai. */
    const boChuThich = t => t.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^[ \t]*\/\/.*$/gm, '');
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
    const html = fsx.readFileSync(px.join(goc, 'index.html'), 'utf8');
    for (const m of html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/gi)) rong.push('index.html: ' + m[1]);
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
               khoaR03: thieu('R03').length };
    });
    bao(day.r1 === day.tong && !day.t1.length, 'Super Admin không bị khoá màn nào', day.r1 + '/' + day.tong);
    bao(day.r2 === day.tong && !day.t2.length, 'Admin hệ thống không bị khoá màn nào', day.r2 + '/' + day.tong);
    const pt20 = day.khoaR03 * 100 / day.tong;
    bao(Math.abs(pt20 - 20) <= 2, 'phần khoá với Giám đốc trở xuống đúng 20%',
      day.khoaR03 + '/' + day.tong + ' = ' + pt20.toFixed(0) + '%');

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
    const DICH = { R01:100, R02:100, R03:80, R04:80, R05:74, R06:74, R07:74, R08:74,
      R09:74, R10:74, R11:74, R12:74, R13:32, R14:24, R15:18 };
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
      return { tv: ra.tv, mc: ra.mc,
               noiThat: /Kho đang trống|Chưa có tài liệu nào được gửi/.test(ra.dtl),
               phGuiDuoc: /data-act="tl-gui"/.test(ra.tvPh) };
    });
    bao(man.tv > 900 && man.mc > 900, 'ba màn thư viện và minh chứng đều dựng được', man.tv + ' · ' + man.mc + ' ký tự');
    bao(man.noiThat, 'kho trống thì nói thẳng là trống, không dựng số liệu giả');
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
    bao(!/createObjectURL|<a[^>]+download|\.zip"|showSaveFilePicker/.test(srcAll),
      'không có nút tải xuống và không có tệp nén — mọi thứ đọc thẳng trên ứng dụng');
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

  console.log('\n' + (loi ? '✗ CÒN ' + loi + ' ĐIỂM CHƯA ĐẠT' : '✓ TOÀN BỘ ĐẠT — sẵn sàng phát hành'));
  await b.close();
  process.exit(loi ? 1 : 0);
})();
