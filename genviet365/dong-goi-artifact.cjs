#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · BỘ GỘP
   Gộp kho, bộ máy phân quyền, lớp giao diện và bảng màu thành MỘT
   trang tự chứa. Nguồn sự thật vẫn là các tệp du-lieu*.js — tệp gộp
   là bản sinh ra, không sửa tay.

     node genviet365/dong-goi-artifact.cjs [ra.html]
     node genviet365/dong-goi-artifact.cjs --vai=R16 --bac=B3 [ra.html]

   KHÔNG có --vai  → bản đầy đủ, có thanh đổi vai để xem thử.
   CÓ --vai        → BẢN CẮT: chỉ đóng gói phần nội dung vai ấy có
                     quyền. Đây là hàng rào thật của một trang tĩnh —
                     thứ không gửi đi là thứ không lộ được. Kho gốc
                     không nằm trong tệp ra, và thanh đổi vai bị khoá.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var goc = __dirname;
var doiSo = process.argv.slice(2);
var vai = null, bac = 'B1', ra = null;
doiSo.forEach(function (a) {
  if (a.indexOf('--vai=') === 0) vai = a.slice(6);
  else if (a.indexOf('--bac=') === 0) bac = a.slice(6);
  else if (a.indexOf('--') !== 0) ra = a;
});

var KHO = ['du-lieu.js', 'du-lieu-daotao.js', 'du-lieu-vanhanh.js', 'du-lieu-kythuat.js',
           'du-lieu-chuyenmon.js', 'du-lieu-congdong.js', 'du-lieu-thuvien.js', 'du-lieu-trainghiem.js',
  'du-lieu-giatri.js', 'du-lieu-tincay.js', 'du-lieu-thuonghieu.js', 'du-lieu-banquyen.js',
  'du-lieu-camtay.js', 'du-lieu-tracuu.js', 'du-lieu-tuyen.js', 'du-lieu-tuan52.js', 'du-lieu-socai.js', 'du-lieu-nhuongquyen.js', 'du-lieu-seo.js', 'du-lieu-quyen.js',
           'quyen.js', 'man-hinh.js', 'nen/dau-hieu.js', 'nen/dan-xuat.js', 'nen/so-lieu.js', 'nen/dau-ban.js'];
var MAY = ['giao-dien.js'];

function doc(t) { return fs.readFileSync(path.join(goc, t), 'utf8'); }

var FONT = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400' +
  '&family=Playfair+Display:ital,wght@0,600;1,600&family=IBM+Plex+Mono:wght@400;500&display=swap';

var css = doc('style.css');
var phan;

if (!vai) {
  ra = ra || path.join(goc, 'gen-viet-365.html');
  phan = KHO.concat(MAY).map(function (t) { return '<script>\n' + doc(t) + '\n</script>\n'; }).join('');
} else {
  ra = ra || path.join(goc, 'gen-viet-365-' + vai + '.html');
  /* Nạp kho trong hộp cát rồi CẮT — chỉ giữ phần vai này có quyền. */
  var hop = { window: {} };
  hop.window.window = hop.window;
  vm.createContext(hop);
  KHO.forEach(function (t) {
    vm.runInContext(doc(t), hop, { filename: t });
  });
  var G = hop.window.GV;
  if (!G.timVai(vai)) { console.error('Không có vai ' + vai); process.exit(1); }

  var manGiu = Object.keys(G.MAN).filter(function (v) { return G.duocPhep(vai, bac, v); });
  var MAN = {}, TU = {}, dungTu = {};
  manGiu.forEach(function (v) {
    MAN[v] = G.MAN[v];
    (G.MAN[v].khoi || []).forEach(function (o) { if (o.tu) dungTu[o.tu] = true; });
  });
  Object.keys(dungTu).forEach(function (k) { if (k in G.TU) TU[k] = G.TU[k]; });
  var NHOM = G.NHOM.map(function (n) {
    return { id: n.id, no: n.no, t: n.t, s: n.s, mau: n.mau,
             ds: n.ds.filter(function (i) { return MAN[i.v]; }) };
  }).filter(function (n) { return n.ds.length; });

  var catGon = {
    META: G.META, NHOM: NHOM, MAN: MAN, TU: TU,
    VAI: G.VAI, QUYEN_MAX: G.QUYEN_MAX, GHI_DE: G.GHI_DE,
    BAC_MO: G.BAC_MO, BAC_SO: G.BAC_SO, TANG_HT_UI: G.TANG_HT_UI,
    SO: G.SO, DAU: G.DAU, LIEN_QUAN: G.LIEN_QUAN,
    /* LUAT_QUYEN và TY_LE chỉ màn Bảng phân quyền dùng — bản cắt
       không mang theo, để không gửi đi thứ vai này không mở được. */
    KHOA_VAI: vai, KHOA_BAC: bac
  };
  /* Bản cắt vẫn cần BỘ MÁY quyền (quyen.js) để dựng thẻ khoá và màn
     Phạm vi — nhưng không cần bất cứ tệp kho nào. */
  phan = '<script>\nwindow.GV = ' + JSON.stringify(catGon, null, 1) + ';\n</script>\n' +
         ['quyen.js'].concat(MAY).map(function (t) {
           return '<script>\n' + doc(t) + '\n</script>\n';
         }).join('');
  console.log('Bản cắt cho ' + vai + (G.timVai(vai).theoBac ? ' bậc ' + bac : '') +
              ': giữ ' + manGiu.length + '/' + Object.keys(G.MAN).length + ' màn · ' +
              Object.keys(TU).length + '/' + Object.keys(G.TU).length + ' khoá tra. ' +
              'Kho gốc KHÔNG nằm trong tệp ra.');
}

var trang =
  '<title>Kiến trúc Gen Việt 365</title>\n' +
  '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '<link rel="stylesheet" href="' + FONT + '">\n' +
  '<style>\n' + css + '\n</style>\n' +
  '<div id="ung-dung"></div>\n' + phan;

fs.writeFileSync(ra, trang, 'utf8');
console.log('Đã gộp → ' + ra + '  (' + Math.round(Buffer.byteLength(trang) / 1024) + ' KB)');
