#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   SINH TỆP VÉC-TƠ CHO HAI DẤU HIỆU THẬT
     nhan-dien/gen-viet-*.svg   ·   nhan-dien/gita-*.svg

   QUAN TRỌNG — đọc trước khi dùng:
   Đây là bản DỰNG LẠI theo dấu hiệu gốc của Học viện, để hệ thống
   này dựng được trên màn hình. Khi nộp hồ sơ quyền tác giả, đăng ký
   nhãn hiệu, hoặc giao cho nhà in, PHẢI dùng TỆP GỐC của Học viện,
   không dùng tệp sinh ra ở đây.
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var fs = require('fs'), path = require('path');
var RA = path.join(__dirname, '..', 'nhan-dien');

/* ── màu thật, lấy từ dấu hiệu gốc ─────────────────────────── */
var DO = '#E01B22';     /* đỏ cờ — nét chữ V và chữ GEN VIỆT */
var VANG = '#F7C013';   /* vàng sao — ngôi sao và các nấc chuỗi xoắn */
var LAM = '#1C60AE';    /* lam — vành quỹ đạo và chữ GITA */
var LAM_N = '#4A8FD0';  /* lam nhạt — vệt ngoài của GITA */

function so(n) { return Math.round(n * 100) / 100; }

/* ── ngôi sao năm cánh, một đỉnh hướng lên ─────────────────── */
function sao(cx, cy, R, xoay) {
  var r = R * 0.382, d = [], i, a, b;
  for (i = 0; i < 10; i++) {
    a = -Math.PI / 2 + (xoay || 0) + i * Math.PI / 5;
    b = (i % 2 === 0) ? R : r;
    d.push((i ? 'L' : 'M') + so(cx + b * Math.cos(a)) + ' ' + so(cy + b * Math.sin(a)));
  }
  return d.join('') + 'Z';
}

/* ── chuỗi xoắn kép: hai sợi quấn quanh một trục ───────────── */
function xoan(x0, y0, x1, y1, bien, vong, buoc) {
  var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy);
  var ux = dx / L, uy = dy / L, px = uy, py = -ux;   /* trục và pháp tuyến */
  function soi(pha) {
    var d = [], i, t, s, X, Y;
    for (i = 0; i <= buoc; i++) {
      t = i / buoc;
      /* biên độ hẹp dần ở hai đầu — chuỗi thắt lại khi tới điểm nối */
      s = Math.sin(Math.PI * t);
      X = x0 + dx * t + px * bien * s * Math.sin(2 * Math.PI * vong * t + pha);
      Y = y0 + dy * t + py * bien * s * Math.sin(2 * Math.PI * vong * t + pha);
      d.push((i ? 'L' : 'M') + so(X) + ' ' + so(Y));
    }
    return d.join('');
  }
  /* Các nấc nối hai sợi. Phải đặt đúng chỗ hai sợi XA NHAU NHẤT —
     tức chỗ sin đạt cực trị — chứ không phải chỗ chúng giao nhau,
     nếu không nấc bị hai sợi lấp mất và chỉ còn thấy một chấm. */
  var nac = [], k, t2, s2, g, ax, ay, bx, by, soNac = Math.max(1, Math.round(2 * vong));
  for (k = 0; k < soNac; k++) {
    t2 = (2 * k + 1) / (4 * vong);          /* θ = π/2, 3π/2, 5π/2 … */
    if (t2 > 0.97) break;
    s2 = Math.sin(Math.PI * t2);
    g = bien * s2 * Math.sin(2 * Math.PI * vong * t2);
    ax = x0 + dx * t2 + px * g;  ay = y0 + dy * t2 + py * g;
    bx = x0 + dx * t2 - px * g;  by = y0 + dy * t2 - py * g;
    nac.push('M' + so(ax) + ' ' + so(ay) + 'L' + so(bx) + ' ' + so(by));
  }
  return { a: soi(0), b: soi(Math.PI), nac: nac };
}

/* ── DẤU HIỆU GEN VIỆT ─────────────────────────────────────── */
function genViet(o) {
  o = o || {};
  var d = o.mot ? o.mot : null;              /* bản một màu */
  var cDo = d || DO, cVang = d || VANG, cLam = d || LAM;
  var h = xoan(96, 316, 214, 556, 40, 1.75, 120);

  return [
    /* vành quỹ đạo lam — vòng hở phía trên, chữ V xuyên qua */
    '<path d="M228 620 C120 620 34 592 34 558 C34 538 63 521 110 511 ' +
      'C80 521 64 535 64 550 C64 578 137 601 228 601 C319 601 392 578 392 550 ' +
      'C392 535 376 521 346 511 C393 521 422 538 422 558 C422 592 336 620 228 620 Z" fill="' + cLam + '"/>',
    /* nét phải của chữ V — vươn lên, thắt dần về đỉnh */
    '<path d="M414 84 C398 168 352 306 300 428 C270 500 238 578 218 622 ' +
      'L160 588 C192 500 236 386 282 274 C332 154 388 114 414 84 Z" fill="' + cDo + '"/>',
    /* nét trái — chuỗi xoắn kép, phần GEN của cái tên */
    '<g fill="none" stroke="' + cDo + '" stroke-width="26" stroke-linecap="round">' +
      '<path d="' + h.a + '"/><path d="' + h.b + '"/></g>',
    '<g fill="none" stroke="' + cVang + '" stroke-width="15" stroke-linecap="round">' +
      h.nac.map(function (n) { return '<path d="' + n + '"/>'; }).join('') + '</g>',
    /* ngôi sao vàng ở đỉnh nét vươn */
    '<path d="' + sao(420, 46, 40) + '" fill="' + cVang + '"/>'
  ].join('\n  ');
}

/* ── DẤU HIỆU GITA ─────────────────────────────────────────── */
function gita(o) {
  o = o || {};
  var d = o.mot ? o.mot : null;
  var cLam = d || LAM, cLamN = d || LAM_N, cDo = d || DO;
  /* Vệt cong: một cung ellipse có bề dày, quét từ dưới-trái vòng lên
     trên và tắt dần về bên phải — đúng nhịp của dấu hiệu gốc. */
  function vet(rx, ry, w, mau, quay, cx, cy) {
    var x0 = cx - rx, x1 = cx + rx * 0.82;
    return '<path transform="rotate(' + quay + ' ' + cx + ' ' + cy + ')" d="' +
      'M' + so(x0) + ' ' + cy + ' A' + rx + ' ' + ry + ' 0 0 1 ' + so(x1) + ' ' + so(cy - ry * 0.78) + ' ' +
      'L' + so(x1 - w * 0.5) + ' ' + so(cy - ry * 0.78 + w * 0.72) + ' ' +
      'A' + so(rx - w) + ' ' + so(ry - w) + ' 0 0 0 ' + so(x0 + w) + ' ' + cy + ' Z" fill="' + mau + '"/>';
  }
  return [
    vet(224, 92, 16, cLamN, -6, 232, 118),
    vet(200, 76, 15, cLam, -6, 232, 118),
    vet(176, 60, 12, cDo, -6, 232, 118),
    '<text x="250" y="146" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" ' +
      'font-size="80" font-weight="700" fill="' + cLam + '" letter-spacing="1">GITA</text>',
    '<g fill="' + cLam + '">' +
      [0, 1, 2, 3, 4].map(function (i) {
        return '<path d="' + sao(384 + i * 20, 24 - Math.abs(i - 2) * 4, 10) + '"/>';
      }).join('') + '</g>'
  ].join('\n  ');
}

/* ── xuất tệp ──────────────────────────────────────────────── */
function boc(ten, vb, than, ghi) {
  return '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<!-- ' + ten + '\n' +
    '     Học viện GITA · ' + ghi + '\n' +
    '     BẢN DỰNG LẠI cho hệ thống trình bày. Khi nộp hồ sơ quyền tác\n' +
    '     giả, đăng ký nhãn hiệu, hoặc giao cho nhà in thì PHẢI dùng\n' +
    '     TỆP GỐC của Học viện, không dùng tệp này. -->\n' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '" role="img" aria-label="' + ten + '">\n' +
    '  <title>' + ten + '</title>\n  ' + than + '\n</svg>\n';
}

if (!fs.existsSync(RA)) fs.mkdirSync(RA, { recursive: true });
var ds = [
  ['gen-viet-mau.svg', '0 0 460 640', genViet(), 'GEN VIỆT — bản màu đầy đủ'],
  ['gen-viet-do.svg', '0 0 460 640', genViet({ mot: DO }), 'GEN VIỆT — một màu đỏ'],
  ['gen-viet-trang.svg', '0 0 460 640', genViet({ mot: '#FFFFFF' }), 'GEN VIỆT — bản đảo, trắng trên nền đặc'],
  ['gen-viet-muc.svg', '0 0 460 640', genViet({ mot: '#0E1826' }), 'GEN VIỆT — một màu mực, cho dập nổi và khắc'],
  ['gita-mau.svg', '0 0 470 165', gita(), 'GITA — bản màu đầy đủ'],
  ['gita-lam.svg', '0 0 470 165', gita({ mot: LAM }), 'GITA — một màu lam'],
  ['gita-trang.svg', '0 0 470 165', gita({ mot: '#FFFFFF' }), 'GITA — bản đảo']
];
ds.forEach(function (x) {
  fs.writeFileSync(path.join(RA, x[0]), boc(x[3], x[1], x[2], x[3]), 'utf8');
});

/* ── THẺ CHIA SẺ 1200×630 ────────────────────────────────────
   Ảnh hiện ra khi ai đó dán đường dẫn vào tin nhắn hoặc mạng xã
   hội. Vẽ bằng véc-tơ để không bao giờ lệch với dấu hiệu thật.
   Lưu ý khi triển khai: một số nền tảng chưa đọc được SVG trong
   thẻ og:image — xuất thêm bản PNG cùng tên trước khi công bố. */
function theChiaSe() {
  var g = '<rect width="1200" height="630" fill="#0E1826"/>' +
    '<rect x="0" y="0" width="1200" height="6" fill="' + DO + '"/>' +
    '<rect x="0" y="624" width="1200" height="6" fill="' + VANG + '"/>' +
    '<g transform="translate(96,60) scale(0.79)">' + genViet() + '</g>' +
    '<g fill="#FFFFFF" font-family="Be Vietnam Pro, Segoe UI, sans-serif">' +
    '<text x="520" y="250" font-size="92" font-weight="700" letter-spacing="6">GEN VIỆT 365</text>' +
    '<text x="524" y="322" font-size="34" font-weight="500" fill="' + VANG + '"' +
    ' letter-spacing="4">THẮP SÁNG — VƯƠN MÌNH</text>' +
    '<text x="524" y="404" font-size="27" fill="#C9D4E2">Hệ điều hành phát triển con người</text>' +
    '<text x="524" y="446" font-size="27" fill="#C9D4E2">của Học viện GITA</text>' +
    '<text x="524" y="530" font-size="22" fill="#8FA2B8" letter-spacing="2">' +
    '15 GIAI ĐOẠN · 5 TUYẾN · 12 KHỐI LỚP</text></g>';
  return boc('GEN VIỆT 365 — thẻ chia sẻ', '0 0 1200 630', g, 'GEN VIỆT 365 — Thắp sáng, vươn mình');
}
fs.writeFileSync(path.join(RA, 'chia-se.svg'), theChiaSe(), 'utf8');
/* Xuất thêm mô-đun cho lớp giao diện, để trang web và tệp in dùng
   CHUNG một hình. Trước đây hai chỗ vẽ riêng, và đó là cách chắc
   chắn nhất để chúng lệch nhau sau vài tháng. */
function js(t) { return JSON.stringify(t); }
fs.writeFileSync(path.join(__dirname, '..', 'nen', 'dau-hieu.js'),
  '/* SINH RA bởi tools/ve-dau-hieu.cjs — KHÔNG SỬA TAY.\n' +
  '   Sửa hình thì sửa bộ vẽ rồi chạy lại:\n' +
  '     node genviet365/tools/ve-dau-hieu.cjs\n' +
  '   Trang web và tệp in trong nhan-dien/ dùng CHUNG mã này. */\n' +
  "'use strict';\n(function (G) {\n" +
  '  G.HINH = {\n' +
  '    mau: ' + js(DO) + ', vang: ' + js(VANG) + ', lam: ' + js(LAM) + ', lamN: ' + js(LAM_N) + ',\n' +
  '    gvVB: ' + js('0 0 460 640') + ', gitaVB: ' + js('0 0 470 165') + ',\n' +
  '    gv: function (m) { return m ? ' + js(genViet({ mot: '@@' })) + '.split("@@").join(m) : ' + js(genViet()) + '; },\n' +
  '    gita: function (m) { return m ? ' + js(gita({ mot: '@@' })) + '.split("@@").join(m) : ' + js(gita()) + '; }\n' +
  '  };\n})(window.GV = window.GV || {});\n', 'utf8');
console.log('Đã xuất ' + (ds.length + 1) + ' tệp véc-tơ và nen/dau-hieu.js → ' + RA);
