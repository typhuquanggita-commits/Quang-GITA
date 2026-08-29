#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · BỘ KIỂM PHÁT HÀNH
   Chạy trước MỌI lần phát hành:  node genviet365/tools/kiem-tra.cjs

   Hai lớp kiểm:
   · Lớp tĩnh  — đọc kho bằng vm, không cần trình duyệt. Bắt lỗi cấu
     trúc: màn thiếu, khoá tra hỏng, khối lạ, bảng lệch cột, màu sai
     định dạng, ô rỗng, chữ tạm.
   · Lớp chạy  — mở bằng Chromium thật (nếu có playwright). Bắt lỗi
     chỉ hiện ra khi dựng: lỗi JS, màn rỗng ruột, tràn ngang, và
     QUAN TRỌNG NHẤT: vào thẳng bằng #hash một màn không có quyền
     thì phải ra thẻ khoá, không ra nội dung.

   Mã thoát khác 0 nghĩa là KHÔNG được phát hành.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var GOC = path.join(__dirname, '..');
var TEP = ['du-lieu.js', 'du-lieu-daotao.js', 'du-lieu-vanhanh.js', 'du-lieu-kythuat.js',
           'du-lieu-chuyenmon.js', 'du-lieu-congdong.js', 'du-lieu-thuvien.js', 'du-lieu-quyen.js',
           'quyen.js', 'man-hinh.js'];
var MAY = [];

var loi = [], canh = [];
function L(m) { loi.push(m); }
function C(m) { canh.push(m); }

/* ── nạp kho trong hộp cát ───────────────────────────── */
var hop = { window: {}, localStorage: null, document: null, location: null };
hop.window.window = hop.window;
vm.createContext(hop);
TEP.concat(MAY).forEach(function (t) {
  var p = path.join(GOC, t);
  if (!fs.existsSync(p)) { L('Thiếu tệp kho: ' + t); return; }
  try { vm.runInContext(fs.readFileSync(p, 'utf8'), hop, { filename: t }); }
  catch (x) { L('Kho ' + t + ' không nạp được: ' + x.message); }
});
var G = hop.window.GV;
if (!G) { console.error('KHÔNG NẠP ĐƯỢC KHO. Dừng.'); process.exit(2); }

/* ── danh sách loại khối lấy thẳng từ lớp giao diện ──── */
var gd = fs.readFileSync(path.join(GOC, 'giao-dien.js'), 'utf8');
var LOAI = {};
(gd.match(/K\.([a-zA-Z0-9_]+)\s*=\s*function/g) || []).forEach(function (m) {
  LOAI[m.replace(/K\.|\s*=\s*function/g, '')] = true;
});
if (!Object.keys(LOAI).length) L('Không đọc được loại khối nào từ giao-dien.js');

/* ── 1. điều hướng ↔ màn hình ────────────────────────── */
var trongNav = {}, demNav = 0, trung = [];
(G.NHOM || []).forEach(function (n) {
  if (!n.id || !n.no || !n.t) L('Nhóm thiếu trường: ' + JSON.stringify(n).slice(0, 60));
  if (!/^#[0-9A-Fa-f]{6}$/.test(n.mau || '')) L('Nhóm ' + n.t + ' có mã màu sai: ' + n.mau);
  (n.ds || []).forEach(function (i) {
    demNav++;
    if (trongNav[i.v]) trung.push(i.v);
    trongNav[i.v] = n;
    if (!G.MAN[i.v]) L('Điều hướng trỏ tới màn không tồn tại: ' + i.v);
    if (!i.t || !i.h) L('Mục điều hướng thiếu tên hoặc gợi ý: ' + i.v);
  });
});
trung.forEach(function (v) { L('Mã màn xuất hiện hai lần trong điều hướng: ' + v); });
Object.keys(G.MAN || {}).forEach(function (v) {
  if (!trongNav[v]) L('Màn có trong kho nhưng không có trong điều hướng: ' + v);
});

/* ── 2. từng màn ─────────────────────────────────────── */
var dungTu = {};
function quetChuoi(o, duong) {
  if (typeof o === 'string') {
    if (o.trim() === '') L('Chuỗi rỗng tại ' + duong);
    if (/(\bTODO\b|\bFIXME\b|\bXXX\b|đang cập nhật|sắp ra mắt|nội dung sẽ bổ sung)/.test(o))
      L('Chữ tạm tại ' + duong + ': ' + o.slice(0, 50));
  } else if (Array.isArray(o)) {
    /* cho/cam trong bảng ghi đè được phép rỗng — rỗng nghĩa là
       "vai này không cấp thêm gì" chứ không phải quên điền */
    if (!o.length && !/\.(cho|cam)$/.test(duong)) L('Mảng rỗng tại ' + duong);
    o.forEach(function (x, i) { quetChuoi(x, duong + '[' + i + ']'); });
  } else if (o && typeof o === 'object') {
    Object.keys(o).forEach(function (k) { quetChuoi(o[k], duong + '.' + k); });
  }
}

Object.keys(G.MAN || {}).forEach(function (v) {
  var m = G.MAN[v];
  ['k', 't', 'khoi'].forEach(function (f) { if (!m[f]) L('Màn ' + v + ' thiếu trường ' + f); });
  if (!m.p) C('Màn ' + v + ' không có câu dẫn (p)');
  if (!m.q) L('Màn ' + v + ' CHƯA GẮN QUYỀN (q)');
  else if (!G.QUYEN_MAX || !(m.q in G.QUYEN_MAX)) L('Màn ' + v + ' gắn quyền lạ: ' + m.q);
  if (m.bac && !/^B[1-6]$/.test(m.bac)) L('Màn ' + v + ' có bậc tối thiểu lạ: ' + m.bac);
  (m.khoi || []).forEach(function (o, i) {
    var d = v + '.khoi[' + i + ']';
    if (!o.k) { L(d + ' thiếu loại khối'); return; }
    if (!LOAI[o.k]) L(d + ' dùng loại khối không tồn tại: ' + o.k);
    if (o.tu) {
      dungTu[o.tu] = true;
      if (!(o.tu in G.TU)) { L(d + ' trỏ tới khoá tra không có: ' + o.tu); return; }
      var dl = G.TU[o.tu];
      if (dl == null || (Array.isArray(dl) && !dl.length)) L(d + ' lấy dữ liệu rỗng: ' + o.tu);
      if (o.k === 'bang' && Array.isArray(dl)) {
        dl.forEach(function (h, j) {
          if (!Array.isArray(h)) L(d + ' bảng có dòng không phải mảng (dòng ' + j + ')');
          else if (h.length !== o.cot.length)
            L(d + ' bảng lệch cột: đầu bảng ' + o.cot.length + ' ô, dòng ' + j + ' có ' + h.length);
        });
      }
    } else if (o.k === 'bang' && o.hang) {
      o.hang.forEach(function (h, j) {
        if (h.length !== o.cot.length) L(d + ' bảng tay lệch cột ở dòng ' + j);
      });
    } else if (!o.ds && !o.t && o.k !== 'muc' && o.k !== 'phamvi') {
      C(d + ' không có tu, ds hay t');
    }
  });
});

/* ── 3. khoá tra mồ côi ──────────────────────────────── */
Object.keys(G.TU || {}).forEach(function (k) {
  if (!dungTu[k]) C('Khoá tra không màn nào dùng: ' + k);
});

/* ── 4. mã màu trong kho ─────────────────────────────── */
function quetMau(o, duong) {
  if (o && typeof o === 'object') {
    Object.keys(o).forEach(function (k) {
      if (k === 'mau' && typeof o[k] === 'string' && !/^#[0-9A-Fa-f]{6}$/.test(o[k]))
        L('Mã màu sai định dạng tại ' + duong + '.' + k + ': ' + o[k]);
      else quetMau(o[k], duong + '.' + k);
    });
  }
}
Object.keys(G).forEach(function (k) {
  if (k === 'MAN' || k === 'TU' || k === 'NHOM') return;
  quetMau(G[k], 'GV.' + k);
});

/* ── 5. quét chuỗi rỗng và chữ tạm trên toàn kho ─────── */
Object.keys(G).forEach(function (k) {
  if (k === 'TU') return;               /* TU chỉ là bản chiếu của kho */
  quetChuoi(G[k], 'GV.' + k);
});

/* ── 6. phân quyền ───────────────────────────────────── */
if (!G.VAI || !G.QUYEN_MAX) {
  L('Chưa có bảng vai hoặc bảng quyền (du-lieu-quyen.js)');
} else {
  var maVai = {};
  G.VAI.forEach(function (r) {
    if (maVai[r.ma]) L('Mã vai trùng: ' + r.ma);
    maVai[r.ma] = r;
    if (typeof r.lv !== 'number') L('Vai ' + r.ma + ' thiếu bậc lv');
    if (!r.t || !r.ln) L('Vai ' + r.ma + ' thiếu tên hoặc mô tả');
  });
  if (typeof G.duocPhep !== 'function') L('Chưa nạp được bộ máy quyền (quyen.js)');
  /* Đếm bằng CHÍNH bộ máy mà ứng dụng dùng — không tính lại theo cách
     riêng, vì hai chỗ tính khác nhau là hai chỗ sẽ lệch nhau. */
  var demVai = {};
  G.VAI.forEach(function (r) {
    var d = G.demMan(r.ma, 'B1');
    demVai[r.ma] = d;
    if (d === 0) L('Vai ' + r.ma + ' (' + r.t + ') không mở được màn nào');
  });
  /* vai theo bậc: bậc cao phải mở nhiều hơn hoặc bằng bậc thấp */
  G.VAI.filter(function (r) { return r.theoBac; }).forEach(function (r) {
    var truoc = -1;
    G.BAC_MO.forEach(function (b) {
      var d = G.demMan(r.ma, b.bac);
      if (d < truoc) L('Vai ' + r.ma + ' bậc ' + b.bac + ' mở ÍT hơn bậc trước (' + d + ' < ' + truoc + ')');
      truoc = d;
    });
  });
  var tong = Object.keys(G.MAN).length;
  if (demVai.R01 !== tong) L('Super Admin phải thấy toàn bộ ' + tong + ' màn, hiện thấy ' + demVai.R01);
  /* đối chiếu tỉ lệ mong muốn */
  (G.TY_LE || []).forEach(function (r) {
    r.vai.forEach(function (ma) {
      var that = Math.round(demVai[ma] / tong * 100);
      if (Math.abs(that - r.pt) > 3)
        L('Vai ' + ma + ' mở ' + that + '% số màn, bảng TY_LE ghi ' + r.pt + '% (lệch quá 3 điểm)');
    });
  });
  /* mọi quyền khai báo phải được ít nhất một màn dùng */
  var dungQ = {};
  Object.keys(G.MAN).forEach(function (v) { dungQ[G.MAN[v].q] = true; });
  Object.keys(G.QUYEN_MAX).forEach(function (q) {
    if (!dungQ[q]) C('Quyền khai báo nhưng không màn nào dùng: ' + q);
  });
}

/* ── 6b. Thư viện: số chân dung khai báo phải khớp số thật ── */
if (G.TV_QUYEN) {
  var maQ = ['TV_Q1', 'TV_Q2', 'TV_Q3', 'TV_Q4', 'TV_Q5', 'TV_Q6'];
  G.TV_QUYEN.forEach(function (q, i) {
    var that = (G[maQ[i]] || []).length;
    if (q.so !== that)
      L('Thư viện: ' + q.q + ' khai ' + q.so + ' chân dung nhưng kho có ' + that);
  });
  maQ.forEach(function (k2) {
    (G[k2] || []).forEach(function (n, j) {
      ['ten', 'nam', 'danh', 'viec', 'quyet', 'mothuc', 'tru', 'pc', 'lam', 'hoi'].forEach(function (f) {
        if (!n[f]) L('Chân dung ' + k2 + '[' + j + '] (' + (n.ten || '?') + ') thiếu trường ' + f);
      });
    });
  });
}

/* ── 7. vỏ và bộ gộp phải nạp đủ tệp ─────────────────── */
var html = fs.readFileSync(path.join(GOC, 'index.html'), 'utf8');
TEP.concat(['giao-dien.js']).forEach(function (t) {
  if (html.indexOf(t) < 0) L('index.html chưa nạp ' + t);
});
var goi = fs.readFileSync(path.join(GOC, 'dong-goi-artifact.cjs'), 'utf8');
TEP.concat(['giao-dien.js']).forEach(function (t) {
  if (goi.indexOf(t) < 0) L('dong-goi-artifact.cjs chưa gộp ' + t);
});
if (html.indexOf('Content-Security-Policy') < 0) L('index.html chưa đặt Content-Security-Policy');

/* ── 8. lớp giao diện: những thứ không được có ───────── */
if (/\beval\s*\(|new Function\s*\(/.test(gd)) L('giao-dien.js có eval hoặc new Function');
if (/document\.write/.test(gd)) L('giao-dien.js có document.write');
/* mọi biểu thức nội suy vào HTML phải qua e() hoặc dm() */
/* Chỉ soi những chỗ nội suy một TRƯỜNG DỮ LIỆU (có dấu chấm) mà không
   đi qua e(), dm(), mau() hay ds(). Số đếm cục bộ và .length thì tha. */
var noiSuy = gd.match(/'\s*\+\s*(?!e\(|dm\(|mau\(|ds\()[A-Za-z_][A-Za-z0-9_]*\.[A-Za-z0-9_.]+\s*\+\s*'/g) || [];
noiSuy.filter(function (m) { return !/\.length/.test(m); })
      .forEach(function (m) { L('Trường dữ liệu vào HTML mà chưa thoát ký tự: ' + m.trim()); });

/* ── LỚP CHẠY — mở bằng trình duyệt thật ─────────────── */
function lopChay(xong) {
  var pw;
  try { pw = require('/opt/node22/lib/node_modules/playwright'); }
  catch (x) { try { pw = require('playwright'); } catch (y) {
    C('Không có playwright — bỏ qua lớp chạy. Cài rồi chạy lại trước khi phát hành thật.');
    return xong();
  } }
  var duong = 'file://' + path.join(GOC, 'index.html');
  pw.chromium.launch().then(function (b) {
    return b.newPage({ viewport: { width: 1400, height: 1000 } }).then(function (p) {
      var loiJs = [];
      p.on('pageerror', function (er) { loiJs.push(er.message); });
      return p.goto(duong, { waitUntil: 'domcontentloaded' }).then(function () {
        /* 1. mọi màn dựng được, với vai Super Admin */
        return p.evaluate(async function () {
          var G = window.GV, xau = [];
          var nhip = function () { return new Promise(function (r) { setTimeout(r, 0); }); };
          var ds = Object.keys(G.MAN);
          for (var i = 0; i < ds.length; i++) {
            location.hash = ds[i];
            await nhip();
            var m = document.querySelector('.chinh');
            var t = m.innerText || '';
            if (t.length < 400) xau.push(ds[i] + ' dựng ra chỉ ' + t.length + ' ký tự');
            if (/thiếu loại khối|undefined|\[object Object\]/.test(m.innerHTML))
              xau.push(ds[i] + ' có dấu hiệu dựng hỏng');
          }
          return xau;
        });
      }).then(function (xau) {
        console.log('LỚP CHẠY  · dựng thử ' + Object.keys(G.MAN).length + ' màn với vai Super Admin');
        xau.forEach(function (m) { L('Lớp chạy: ' + m); });
        /* 2. CỔNG: vào thẳng bằng hash một màn ngoài quyền phải ra thẻ khoá */
        return p.evaluate(async function () {
          var G = window.GV, hong = [];
          var nhip = function () { return new Promise(function (r) { setTimeout(r, 0); }); };
          var thu = [['R16', 'B1'], ['R16', 'B4'], ['R15', 'B1'], ['R17', 'B1'],
                     ['R14', 'B1'], ['R13', 'B1'], ['R05', 'B1'], ['R12', 'B1']];
          for (var i = 0; i < thu.length; i++) {
            var vai = thu[i][0], bac = thu[i][1];
            localStorage.setItem('genviet365.vai', vai);
            localStorage.setItem('genviet365.bac', bac);
            location.hash = '';
            window.GVdung(document.getElementById('ung-dung'));
            await nhip();
            var ds = Object.keys(G.MAN);
            for (var j = 0; j < ds.length; j++) {
              var v = ds[j];
              if (G.duocPhep(vai, bac, v)) continue;
              location.hash = v;
              await nhip();
              var m = document.querySelector('.chinh');
              if (!m.querySelector('.the.khoa'))
                hong.push(vai + '/' + bac + ' vào được ' + v + ' mà không bị khoá');
              if (m.querySelectorAll('table, .bso, .clg, .lt, .thap, .vong').length)
                hong.push(vai + '/' + bac + ' thấy nội dung của ' + v + ' dù bị khoá');
              if (document.querySelector('.muc a[data-v="' + v + '"]'))
                hong.push(vai + '/' + bac + ' vẫn còn mục ' + v + ' trong mục lục');
            }
          }
          localStorage.removeItem('genviet365.vai');
          localStorage.removeItem('genviet365.bac');
          localStorage.removeItem('genviet365.man');
          return hong;
        });
      }).then(function (hong) {
        var thuVai = [['R16','B1'],['R16','B4'],['R15','B1'],['R17','B1'],
                      ['R14','B1'],['R13','B1'],['R05','B1'],['R12','B1']];
        var soLan = 0;
        thuVai.forEach(function (c2) {
          Object.keys(G.MAN).forEach(function (v) { if (!G.duocPhep(c2[0], c2[1], v)) soLan++; });
        });
        console.log('CỔNG      · thử vào thẳng ' + soLan + ' màn ngoài quyền, trên ' +
                    thuVai.length + ' cấu hình vai · ' + (hong.length ? hong.length + ' chỗ lọt' : 'không chỗ nào lọt'));
        hong.slice(0, 12).forEach(function (m) { L('CỔNG PHÂN QUYỀN: ' + m); });
        if (hong.length > 12) L('CỔNG PHÂN QUYỀN: và ' + (hong.length - 12) + ' lỗi nữa');
        /* 3. tràn ngang ở ba khổ */
        var kho = [[1400, 1000], [900, 800], [390, 844]];
        var buoc = Promise.resolve([]);
        kho.forEach(function (k) {
          buoc = buoc.then(function (acc) {
            return p.setViewportSize({ width: k[0], height: k[1] }).then(function () {
              return p.evaluate(async function (rong) {
                var G = window.GV, xau = [];
                var nhip = function () { return new Promise(function (r) { setTimeout(r, 0); }); };
                var ds = Object.keys(G.MAN);
                for (var i = 0; i < ds.length; i++) {
                  location.hash = ds[i];
                  await nhip();
                  if (document.documentElement.scrollWidth > window.innerWidth + 1)
                    xau.push(ds[i] + ' tràn ngang ở khổ ' + rong);
                }
                return xau;
              }, k[0]).then(function (x) { return acc.concat(x); });
            });
          });
        });
        return buoc;
      }).then(function (tran) {
        console.log('KHỔ MÀN   · soi tràn ngang ở 1400, 900 và 390 điểm ảnh');
        tran.slice(0, 8).forEach(function (m) { L('Lớp chạy: ' + m); });
        loiJs.forEach(function (m) { L('Lỗi JS khi chạy: ' + m); });
        return b.close();
      });
    });
  }).then(xong).catch(function (x) { L('Lớp chạy hỏng: ' + x.message); xong(); });
}

/* ── LỚP CẮT — bản phát hành cho vai thấp có thật sự không mang
      theo phần ngoài quyền không ─────────────────────────────── */
function lopCat() {
  var cp = require('child_process');
  var os = require('os');
  var thu = [['R16', 'B1'], ['R16', 'B4'], ['R15', 'B1'], ['R17', 'B1'], ['R14', 'B1']];
  var goi = path.join(GOC, 'dong-goi-artifact.cjs');
  thu.forEach(function (c2) {
    var ra = path.join(os.tmpdir(), 'gv-cat-' + c2[0] + '-' + c2[1] + '.html');
    try {
      cp.execFileSync(process.execPath, [goi, '--vai=' + c2[0], '--bac=' + c2[1], ra],
                      { stdio: 'ignore' });
    } catch (x) { L('Không dựng được bản cắt cho ' + c2[0] + ': ' + x.message); return; }
    var noi = fs.readFileSync(ra, 'utf8');
    /* Một chuỗi có thể xuất hiện hợp lệ trong phần vai này ĐƯỢC thấy
       (ví dụ tên một màn bị khoá được nhắc trong bảng tầng hiển thị,
       hay trong một bảng so sánh mà vai này mở được). Nên không so
       "có hay không", mà so SỐ LẦN: nhiều hơn phần hợp lệ mới là rò. */
    var duocThay = { TANG: G.TANG_HT_UI, VAI: G.VAI, BAC: G.BAC_MO, MAN: {}, TU: {} };
    Object.keys(G.MAN).forEach(function (v) {
      if (!G.duocPhep(c2[0], c2[1], v)) return;
      duocThay.MAN[v] = G.MAN[v];
      (G.MAN[v].khoi || []).forEach(function (o) {
        if (o.tu && (o.tu in G.TU)) duocThay.TU[o.tu] = G.TU[o.tu];
      });
    });
    var vanHopLe = JSON.stringify(duocThay);
    function dem(chuoi, kim) {
      if (!kim) return 0;
      var d = 0, i = chuoi.indexOf(kim);
      while (i > -1) { d++; i = chuoi.indexOf(kim, i + kim.length); }
      return d;
    }
    function roRi(kim) { return kim && dem(noi, kim) > dem(vanHopLe, kim); }
    var lot = [];
    Object.keys(G.MAN).forEach(function (v) {
      if (G.duocPhep(c2[0], c2[1], v)) return;
      var m = G.MAN[v];
      if (roRi(m.t)) lot.push('tiêu đề màn ' + v);
      (m.khoi || []).forEach(function (o) {
        if (!o.tu || !(o.tu in G.TU)) return;
        var dl = G.TU[o.tu], mau1 = null;
        if (Array.isArray(dl) && dl.length) {
          var d0 = dl[0];
          if (Array.isArray(d0)) mau1 = d0[0];
          else if (typeof d0 === 'string') mau1 = d0;
          else if (d0 && typeof d0 === 'object') {
            var kk = Object.keys(d0).filter(function (x) {
              return typeof d0[x] === 'string' && d0[x].length > 25;
            });
            if (kk.length) mau1 = d0[kk[0]];
          }
        } else if (typeof dl === 'string') mau1 = dl.slice(0, 60);
        if (mau1 && mau1.length > 25 && roRi(mau1)) lot.push('dữ liệu ' + o.tu);
      });
    });
    var da = {};
    lot = lot.filter(function (x) { if (da[x]) return false; da[x] = 1; return true; });
    if (lot.length) {
      lot.slice(0, 6).forEach(function (x) {
        L('RÒ RỈ BẢN CẮT ' + c2[0] + '/' + c2[1] + ': tệp vẫn chứa ' + x);
      });
      if (lot.length > 6) L('RÒ RỈ BẢN CẮT ' + c2[0] + ': và ' + (lot.length - 6) + ' chỗ nữa');
    }
    try { fs.unlinkSync(ra); } catch (x) {}
  });
  console.log('BẢN CẮT   · dựng ' + thu.length + ' bản cho vai thấp và soi rò rỉ nội dung ngoài quyền');
}

/* ── kết ─────────────────────────────────────────────── */
function ket() {
console.log('KIỂM TĨNH · ' + Object.keys(G.MAN || {}).length + ' màn · ' +
            demNav + ' mục điều hướng · ' + Object.keys(LOAI).length + ' loại khối · ' +
            Object.keys(G.TU || {}).length + ' khoá tra');
if (canh.length) { console.log('\nCẢNH BÁO (' + canh.length + ')'); canh.forEach(function (m) { console.log('  · ' + m); }); }
if (loi.length) {
  console.log('\nLỖI (' + loi.length + ')');
  loi.forEach(function (m) { console.log('  ✗ ' + m); });
  console.log('\nKHÔNG ĐƯỢC PHÁT HÀNH.');
  process.exit(1);
}
console.log('\nKhông lỗi. Đạt.');
}

if (loi.length) { ket(); } else { lopCat(); lopChay(ket); }
