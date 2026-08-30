#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   GITA 365 — RÀ SOÁT CHỖ TRỐNG

       npx http-server -p 8099 -s .
       node tools/ra-soat-day-du.js

   Bộ kiểm phát hành (tools/kiem-tra.js) hỏi: "màn hình có chạy không?"
   Bộ này hỏi câu khác: "màn hình có RỖNG chỗ nào không?"

   Chạy hết mọi màn hình của mọi vai rồi soi bảy loại chỗ trống:

     1. Màn dựng ra quá ngắn      — có khung mà không có ruột
     2. Chữ tạm                   — "đang cập nhật", "sắp có", TODO, Lorem
     3. Ô rỗng trên màn            — nhãn có, nội dung không
     4. Bản ghi thiếu trường       — kho dữ liệu có ô để trống
     5. Mảng rỗng                  — biến toàn cục khai báo mà không có gì
     6. Chuỗi chưa dịch            — mục có tiếng Việt mà không có tiếng Anh
     7. Nút bấm không tới đâu      — data-* không có người nhận

   Ra 0 là không còn chỗ nào để trống.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
const PW = process.env.PW_PATH || '/opt/node22/lib/node_modules/playwright';
const URL = process.env.GITA_URL || 'http://127.0.0.1:8099/index.html';
const { chromium } = require(PW);

/* Ngưỡng: dưới mức này thì màn coi như chưa có ruột. Thẻ khoá và thẻ
   "chưa mở được" là chặn có chủ đích, không tính là trống. */
const NGAN = 700;

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });

  let coKhoa = false;
  try {
    const k = JSON.parse(require('fs').readFileSync(
      require('path').join(__dirname, '..', 'kho', 'khoa.json'), 'utf8'));
    if (k && k.khoa) { await p.addInitScript(x => { window.GITA_KHOA = x; }, k.khoa); coKhoa = true; }
  } catch { /* không có khoá — chạy chế độ mẫu */ }
  if (!coKhoa) {
    console.error('✗ Cần bộ khoá (kho/khoa.json) để soi được nội dung đã cấp phép.');
    console.error('  Chạy: node tools/ma-hoa-kho.js');
    await b.close();
    process.exit(1);
  }

  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.goto(URL, { waitUntil: 'networkidle' });
  await p.evaluate(() => localStorage.clear());
  await p.reload({ waitUntil: 'networkidle' });
  await p.waitForTimeout(400);

  let loi = 0;
  const bao = (ok, ten, chiTiet) => {
    if (!ok) loi++;
    console.log((ok ? '  ✓ ' : '  ✗ ') + ten + (chiTiet ? ' — ' + chiTiet : ''));
  };

  /* Danh sách tài khoản để đi hết các vai */
  const ai = await p.evaluate(() => (window.G.ACCOUNTS || []).map(a => a.e || a.email || a.u));
  console.log('\n(có bộ khoá — soi cả nội dung đã cấp phép · ' + ai.length + ' vai)');

  /* ══════ 1 · MÀN RỖNG VÀ CHỮ TẠM ══════ */
  console.log('\n1 · MÀN RỖNG · CHỮ TẠM · Ô RỖNG');
  const quet = await p.evaluate(async (opt) => {
    const G = window.G;
    const NGAN = opt.NGAN;
    const KHOA = '<div class="card center" style="padding:40px">';
    /* Chữ tạm: chỉ bắt chữ THẬT SỰ là chỗ trống. "Đang cập nhật" trong một
       câu nói về quy trình thì không phải chỗ trống, nên bắt theo cụm đứng
       một mình trong một ô, không bắt theo từ nằm giữa câu. */
    const TAM = [
      /\bTODO\b/i, /\bFIXME\b/i, /lorem ipsum/i, /coming soon/i,
      /\bXXX\b/, /\bTBD\b/i,
      /placeholder(?!=)/i,   /* placeholder="…" là thuộc tính ô nhập, không phải chữ tạm */
      />\s*(đang cập nhật|sắp có|sắp ra mắt|chưa có nội dung|nội dung đang|đang xây dựng)\s*</i,
      />\s*(undefined|null|NaN|\[object Object\])\s*</
    ];
    const ra = { ngan: [], tam: [], oRong: [], loi: [] };
    const daXet = {};

    for (const em of opt.ai) {
      G.doLogin(em);
      await new Promise(r => setTimeout(r, 900));
      const vai = (G.S.roleObj || {}).short || em;
      const man = [];
      (G.NAV || []).forEach(g => (g.items || []).forEach(i => man.push(i.v)));

      for (const v of man) {
        let html;
        try { html = G.VIEWS[v] ? G.VIEWS[v]() : null; }
        catch (e) { ra.loi.push(vai + ' · ' + v + ' · ' + e.message); continue; }
        if (typeof html !== 'string') { ra.loi.push(vai + ' · ' + v + ' · không trả về chuỗi'); continue; }
        const t = html.trim();
        /* Thẻ khoá là chặn có chủ đích, không phải chỗ trống */
        if (t.indexOf(KHOA) === 0) continue;

        /* Màn nói rõ "phần này nằm trong kho nghề" hay "mở khi được cấp
           phép" là chặn có chủ đích giống thẻ khoá, không phải màn rỗng. */
        const coLoiChan = /kho nghề|cấp phép|chưa mở được|chưa có|Đăng nhập lại|chưa thao tác được|dành cho/i.test(t);
        if (t.length < NGAN && !coLoiChan && !daXet['n' + v]) {
          daXet['n' + v] = 1;
          ra.ngan.push(v + ' (' + t.length + ' ký tự, vai ' + vai + ')');
        }
        for (const rx of TAM) {
          if (rx.test(html) && !daXet['t' + v + rx.source]) {
            daXet['t' + v + rx.source] = 1;
            const m = html.match(rx);
            ra.tam.push(v + ' · ' + String(m && m[0]).slice(0, 60).replace(/\s+/g, ' '));
          }
        }
        /* Ô rỗng: nhãn có mà nội dung trống. Bỏ qua thẻ TRANG TRÍ — vạch
           kẻ, ô đệm, chấm tròn: chúng rỗng đúng nghĩa vì phần nhìn thấy
           nằm ở nền, ở màu và ở kích thước, không nằm ở chữ: vạch kẻ, ô
           màu trong bộ nhận diện, chấm tròn đầu dòng. */
        const TRANG_TRI =
          /height:|width:|background|border-radius|color:|flex:none|class="[^"]*\b(grow|tr|dot|mau|line|sep|bar|ring|chip|nd-[a-z-]+)\b/;
        const rong = (html.match(/<(p|b|span|div)[^>]*>\s*<\/\1>/g) || [])
          .filter(x => !TRANG_TRI.test(x));
        if (rong.length > 2 && !daXet['o' + v]) {
          daXet['o' + v] = 1;
          ra.oRong.push(v + ' · ' + rong.length + ' thẻ rỗng');
        }
      }
      localStorage.clear();
    }
    return ra;
  }, { ai, NGAN });

  bao(!quet.loi.length, 'mọi màn hình dựng ra không lỗi', quet.loi.slice(0, 3).join(' | '));
  bao(!quet.ngan.length, 'không màn nào có khung mà không có ruột (dưới ' + NGAN + ' ký tự)',
    quet.ngan.slice(0, 5).join(' | '));
  bao(!quet.tam.length, 'không còn chữ tạm nào trên giao diện', quet.tam.slice(0, 5).join(' | '));
  bao(!quet.oRong.length, 'không màn nào có nhiều ô rỗng', quet.oRong.slice(0, 5).join(' | '));

  /* ══════ 2 · KHO DỮ LIỆU CÓ Ô ĐỂ TRỐNG ══════ */
  console.log('\n2 · BẢN GHI THIẾU TRƯỜNG · MẢNG RỖNG');
  await p.evaluate(() => window.G.doLogin('superadmin@gita365.vn'));
  await p.waitForTimeout(2200);
  const kho = await p.evaluate(() => {
    const G = window.G;
    /* Trường được phép để trống, kèm lý do — mỗi ngoại lệ phải có lý do,
       không thì nó chỉ là chỗ trống được tha.

       NGUỒN GỐC là G.SOAT_THA trong kho (kho-goc/data.soat-day-du.js) —
       cùng bảng mà màn tự soát trong ứng dụng dùng. Bảng dưới đây chỉ
       BỔ SUNG những ngoại lệ mà bảng kia chưa có, và được gộp vào ở
       ngay dưới. Trước v7.8 hai bảng nằm rời nhau, nên thêm một ngoại lệ
       ở một bên là bên kia vẫn đỏ — đúng chuyện đã xảy ra với
       TUYEN.doBang. */
    const THA = {
      'AD_GIONG.ten':      'hồ sơ giọng đọc để trống có chủ đích: chưa ký hợp đồng thu âm thì không được điền tên ai',
      'AD_GIONG.hopDong':  'như trên — số hợp đồng chỉ điền khi đã ký thật',
      'AD_GIONG.den':      'như trên — hạn dùng chỉ có khi có hợp đồng',
      'MATRAN_T1.quyTrinh':'cột quy trình của tầng 1 gộp vào cột lộ trình',
      'MATRAN_T2.quyTrinh':'như trên',
      'MATRAN_T3.quyTrinh':'như trên',
      'MATRAN_T4.quyTrinh':'như trên',
      'MATRAN_T5.quyTrinh':'như trên',
      'CHUYEN_TG.luu':     'ghi chú NÓI CHO ĐÚNG chỉ có ở chuyện mà bản kể phổ biến đã bị thổi lên',
      'AD_GIONG.tu':       'như ba trường kia của hồ sơ giọng đọc: ngày bắt đầu chỉ có khi đã ký hợp đồng thu âm',
      'TAILIEU_GOC.soTrang':'tài liệu Word không có số trang cố định — đếm chữ mới là đơn vị đúng',
      'KICHBAN.ngay':      'kịch bản không gắn với một ngày cụ thể (khai vấn, xử lý tình huống) thì ngay để null đúng nghĩa',
      'HP_TANG.gia':       'mức học phí là quyết định của chủ Học viện — điền bừa vào đây thì người tư vấn sẽ đọc nó ra trước mặt gia đình',
      'QUA1000.pd':        'quà thuộc nhóm "Nền tảng chung" không gắn với một trong 220 mã phác đồ — pd để null là đúng nghĩa',
      'BDCN.o':            'ô B06 và B09 dùng bảng riêng (BDCN_MUOI_VIEC, BDCN_QUY_TAC) thay cho ô nhập chung',
      'TANG_HIENTHI.perm': 'nhóm "chung cho mọi tài khoản" không có điều kiện quyền — perm null là đúng nghĩa',
      'KHACH_TANG.nhipDonVi':'hạng Chì không có nhịp thăm hỏi định kỳ, nên không có đơn vị nhịp'
    };
    /* Gộp bảng ngoại lệ của kho vào — một ngoại lệ khai một lần là cả
       màn tự soát lẫn bộ rà soát này cùng biết. */
    (G.SOAT_THA || []).forEach(x => { if (x && x.o && !THA[x.o]) THA[x.o] = x.y || ''; });
    const thieu = [], rong = [];
    Object.keys(G).forEach(k => {
      if (!/^[A-Z][A-Z0-9_]*$/.test(k)) return;      /* chỉ soi kho dữ liệu */
      const v = G[k];
      if (!Array.isArray(v)) return;
      /* Mảng TRẠNG THÁI LÚC CHẠY — dữ liệu của chính người dùng, rỗng khi
         chưa ai làm gì. Rỗng ở đây là đúng, không phải chỗ trống. */
      const TRANG_THAI = ['SOI_LUAT','XIN_THEM','CA','AI_HOI','CHAT','THUVIEN',
                          'MINHCHUNG','SECLOG','NHOM','CHUYEN_DOC','TG_DOC'];
      /* Kho rỗng CÓ CHỦ Ý phải được khai ở G.RONG_CO_Y, kèm lý do và điều
         kiện lấp. Danh sách TRANG_THAI cứng ở trên là bản cũ, giữ lại để
         tương thích; sổ khai mới là đường chính, vì nó bắt người tha phải
         viết ra vì sao — tha lặng một lần là mở đường tha lần sau. */
      const KHAI = ((window.G.RONG_CO_Y || []).map(x => x.kho));
      if (!v.length) { if (TRANG_THAI.indexOf(k) < 0 && KHAI.indexOf(k) < 0) rong.push(k); return; }
      if (typeof v[0] !== 'object' || v[0] === null) return;
      /* Trường nào có ở đa số bản ghi thì coi là trường bắt buộc */
      const dem = {};
      v.forEach(r => r && typeof r === 'object' &&
        Object.keys(r).forEach(f => { dem[f] = (dem[f] || 0) + 1; }));
      const batBuoc = Object.keys(dem).filter(f => dem[f] >= v.length * 0.9);
      batBuoc.forEach(f => {
        if (THA[k + '.' + f]) return;
        const so = v.filter(r => {
          if (!r || typeof r !== 'object') return false;
          const x = r[f];
          if (x === undefined || x === null) return true;
          if (typeof x === 'string' && !x.trim()) return true;
          if (Array.isArray(x) && !x.length) return true;
          return false;
        }).length;
        if (so) thieu.push(k + '.' + f + ' · ' + so + '/' + v.length + ' bản ghi trống');
      });
    });
    return { thieu, rong };
  });
  bao(!kho.thieu.length, 'không kho nào có bản ghi để trống trường bắt buộc',
    kho.thieu.slice(0, 8).join(' | '));
  /* ── Kiểm chính sổ khai rỗng ──
     Sổ này là chỗ duy nhất được phép tha một kho rỗng, nên nó phải chặt
     hơn thứ nó tha: mỗi dòng phải nói rõ VÌ SAO và LẤP KHI NÀO, và không
     dòng nào được ở lại sau khi kho đã có dữ liệu. */
  const G_RONG = await p.evaluate(() => (window.G.RONG_CO_Y || []).map(x => x.kho));
  const soKhai = await p.evaluate(() => {
    const G = window.G, ds = G.RONG_CO_Y || [];
    return {
      so: ds.length,
      mong: ds.filter(x => !x.vi || String(x.vi).length < 80).map(x => x.kho),
      thieuLap: ds.filter(x => !x.lapKhi || String(x.lapKhi).length < 20).map(x => x.kho),
      cu: ds.filter(x => Array.isArray(G[x.kho]) && G[x.kho].length).map(x => x.kho),
      laKho: ds.filter(x => G[x.kho] === undefined).map(x => x.kho)
    };
  });
  /* Không đặt sàn số lượng — một con số tuỳ tiện chỉ tạo áp lực khai thêm
     cho đủ. Điều thật sự phải chốt là kho đánh giá công khai có mặt trong
     sổ, vì đó là kho mà việc lấp bừa gây hại nhất. */
  bao((G_RONG || []).indexOf('DANHGIA_THAT') >= 0,
    'kho đánh giá công khai được khai rõ là rỗng có chủ ý — không ai lấp nó cho bộ rà soát xanh',
    soKhai.so + ' kho được khai');
  bao(!soKhai.mong.length, 'mỗi dòng trong sổ nói rõ VÌ SAO rỗng, đủ dài để người sau hiểu',
    soKhai.mong.join(' ') || 'mọi lý do đều đủ dài');
  bao(!soKhai.thieuLap.length, 'và nói rõ LẤP KHI NÀO — không có mốc lấp thì là bỏ quên, không phải chủ ý',
    soKhai.thieuLap.join(' ') || 'mọi dòng đều có mốc lấp');
  bao(!soKhai.cu.length, 'không dòng nào ở lại sau khi kho đã có dữ liệu — lời tha cũ phải gỡ đi',
    soKhai.cu.join(' ') || 'sổ còn đúng');
  bao(!soKhai.laKho.length, 'sổ không khai kho không tồn tại', soKhai.laKho.join(' ') || 'tên kho đều có thật');

  bao(!kho.rong.length, 'không mảng dữ liệu nào khai báo mà rỗng ngoài sổ khai',
    kho.rong.slice(0, 8).join(' | '));

  /* ══════ 3 · CHUỖI CHƯA DỊCH ══════ */
  console.log('\n3 · BẢN TIẾNG ANH');
  const dich = await p.evaluate(() => {
    const G = window.G;
    const man = [];
    (G.NAV || []).forEach(g => (g.items || []).forEach(i => man.push(i.v)));
    const en = G.ITEM_EN || {};
    const thieu = man.filter(v => !en[v]);
    const hong = Object.keys(en).filter(k => !Array.isArray(en[k]) || en[k].length < 2 ||
      !String(en[k][0]).trim() || !String(en[k][1]).trim());
    return { tong: man.length, thieu, hong };
  });
  bao(!dich.thieu.length, 'mọi mục điều hướng đều có bản tiếng Anh',
    dich.thieu.length + '/' + dich.tong + ' thiếu: ' + dich.thieu.slice(0, 8).join(' '));
  bao(!dich.hong.length, 'không bản dịch nào để trống một nửa', dich.hong.slice(0, 8).join(' '));

  /* ══════ 4 · NÚT BẤM KHÔNG TỚI ĐÂU ══════ */
  console.log('\n4 · NÚT BẤM CÓ NGƯỜI NHẬN');
  const nut = await p.evaluate(async () => {
    const G = window.G;
    /* Gom mọi thuộc tính data-* mà giao diện dựng ra, rồi đối chiếu với
       các bộ nhận sự kiện đã đăng ký trong mã nguồn. */
    const dung = {};
    const man = [];
    (G.NAV || []).forEach(g => (g.items || []).forEach(i => man.push(i.v)));
    for (const v of man) {
      let html; try { html = G.VIEWS[v] ? G.VIEWS[v]() : ''; } catch { continue; }
      if (typeof html !== 'string') continue;
      const m = html.match(/\sdata-([a-z0-9-]+)=/g) || [];
      m.forEach(x => { const t = x.trim().slice(5).replace('=', ''); dung[t] = (dung[t] || 0) + 1; });
    }
    return dung;
  });
  /* Đọc mã nguồn để biết thuộc tính nào đã có bộ nhận */
  const fs = require('fs'), path = require('path');
  const goc = path.join(__dirname, '..', 'src');
  let ma = '';
  for (const t of fs.readdirSync(goc)) if (t.endsWith('.js')) ma += fs.readFileSync(path.join(goc, t), 'utf8');
  /* Thuộc tính chỉ để đánh dấu hoặc để lọc, không cần bộ nhận */
  /* Thuộc tính chỉ để lọc, để đánh dấu, hoặc đi kèm một data-act khác —
     không cần bộ nhận riêng. */
  const KHONG_CAN = ['f', 'v', 'go', 'act', 'mtp', 'shchon', 'tgmach', 'nhom', 'ma',
                     'id', 'k', 'tang', 'cap', 'loai', 'u', 'l'];
  /* Bộ nhận có thể viết ba kiểu:  '[data-x]'  ·  "data-x]"  ·  '['+t+']' với
     t lấy từ danh sách. Kiểu thứ ba chỉ tra được bằng tên trong dấu nháy. */
  const khongNhan = Object.keys(nut).filter(t =>
    KHONG_CAN.indexOf(t) < 0 &&
    ma.indexOf('data-' + t + ']') < 0 &&
    ma.indexOf("'data-" + t + "'") < 0 &&
    ma.indexOf('"data-' + t + '"') < 0);
  bao(!khongNhan.length, 'mọi nút bấm trên giao diện đều có bộ nhận sự kiện',
    khongNhan.slice(0, 10).join(' '));

  /* ══════ 5 · HÀM CANH CỬA PHẢI CÓ THẬT ══════
     Lớp chỗ trống khó thấy nhất: `G.foo ? G.foo(x) : 'một dòng dự phòng'`
     — nếu G.foo chưa từng được định nghĩa thì câu điều kiện LUÔN rơi xuống
     nhánh dự phòng, và màn hình vĩnh viễn chỉ có một dòng chữ. Không lỗi,
     không cảnh báo, chỉ là ruột rỗng đội lốt phòng hờ.

     Đúng một lỗi loại này đã nằm trong kho: so-tay-nhan-dien gọi
     G.manChuaCapPhep — một hàm không tồn tại — nên màn ấy chỉ dựng ra
     136 ký tự thay vì màn xin cấp phép đầy đủ. */
  console.log('\n5 · HÀM CANH CỬA PHẢI CÓ THẬT');
  {
    const fs = require('fs'), path = require('path');
    const thuMuc = path.join(__dirname, '..', 'src');
    const ten = new Set();
    for (const f of fs.readdirSync(thuMuc)) {
      if (!f.endsWith('.js')) continue;
      const ma = fs.readFileSync(path.join(thuMuc, f), 'utf8');
      /* Bắt đúng dạng "G.foo ? G.foo(" và "G.foo && G.foo(" */
      const re = /G\.([A-Za-z_$][\w$]*)\s*(\?|&&)\s*G\.\1\s*\(/g;
      let m; while ((m = re.exec(ma))) ten.add(m[1]);
    }
    const ds = Array.from(ten).sort();
    const thieu = await p.evaluate(list =>
      list.filter(n => typeof window.G[n] !== 'function'), ds);
    bao(!thieu.length,
      'mọi hàm được canh trước khi gọi đều tồn tại thật — ' + ds.length + ' hàm được soi',
      thieu.length ? ('KHÔNG CÓ: G.' + thieu.join(' · G.')) : '');
  }

  /* ══════ 6 · KHÔNG LỖI TRANG ══════ */
  console.log('\n6 · KHÔNG LỖI TRANG');
  bao(!errs.length, 'không lỗi nào khi chạy hết mọi màn của mọi vai', errs.slice(0, 3).join(' | '));

  console.log('\n' + (loi
    ? '✗ CÒN ' + loi + ' CHỖ TRỐNG PHẢI LẤP'
    : '✓ KHÔNG CÒN CHỖ NÀO ĐỂ TRỐNG'));
  await b.close();
  process.exit(loi ? 1 : 0);
})();
