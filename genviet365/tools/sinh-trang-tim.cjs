#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════
   GEN VIỆT 365 · SINH TRANG TĨNH CHO MÁY TÌM KIẾM

   Vì sao cần bước này. Bản dựng chính là một trang duy nhất, đổi
   màn bằng dấu thăng (#nq-goi). Google KHÔNG lập chỉ mục phần sau
   dấu thăng như một địa chỉ riêng — lược đồ thu thập cũ đã bị bỏ
   từ 2015. Nghĩa là dù có 167 màn, máy tìm kiếm chỉ thấy MỘT trang.

   Nên bước này dựng sẵn mỗi màn CÔNG KHAI thành một tệp .html
   riêng, có địa chỉ riêng, thẻ tiêu đề riêng, thẻ mô tả riêng và
   khai báo dữ liệu có cấu trúc riêng — rồi trỏ về bản đầy đủ.
   Chỉ dựng màn quyền "chung"; mọi màn cần đăng nhập đều gắn
   noindex và không vào bản đồ trang.

   Chạy:  node genviet365/tools/sinh-trang-tim.cjs
   ═══════════════════════════════════════════════════════════════ */
'use strict';
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var GOC = path.join(__dirname, '..');
var RA = path.join(GOC, '..', 'ban-phat-hanh', 'trang');
var GOC_URL = 'https://genviet365.vn';

/* ── nạp kho để lấy tiêu đề, câu dẫn và quyền ────────────── */
var hop = { window: {}, localStorage: null, document: null, location: null };
hop.window.window = hop.window;
vm.createContext(hop);
var TEP = fs.readFileSync(path.join(GOC, 'tools/kiem-tra.cjs'), 'utf8')
  .match(/var TEP = \[([\s\S]*?)\];/)[1].match(/'([^']+)'/g)
  .map(function (s) { return s.slice(1, -1); });
TEP.forEach(function (t) {
  vm.runInContext(fs.readFileSync(path.join(GOC, t), 'utf8'), hop, { filename: t });
});
var G = hop.window.GV;


/* ── kiểu riêng của trang tĩnh ───────────────────────────── */
var CSS = fs.readFileSync(path.join(GOC, 'style.css'), 'utf8');
var CSS_TINH = [
  '',
  '/* trang tĩnh: không có điều hướng bên trái nên phần chính chiếm hết bề ngang */',
  'body.trang-tinh{display:block}',
  '.trang-tinh .chinh{max-width:920px;margin:0 auto;padding:28px 20px 8px}',
  '.dau-tinh{max-width:920px;margin:0 auto;padding:18px 20px 0;display:flex;',
  '  gap:14px;align-items:baseline;flex-wrap:wrap}',
  '.dau-tinh a{font-weight:700;letter-spacing:.06em;text-decoration:none;color:var(--chu)}',
  '.nhom-tinh{font-size:12px;letter-spacing:.08em;color:var(--muc3)}',
  '.chan-tinh{max-width:920px;margin:0 auto;padding:8px 20px 48px;',
  '  border-top:1px solid var(--vien);color:var(--muc3);font-size:14px}',
  '.chan-tinh p{margin:16px 0 0}'
].join('\n');

/* ── công cụ chữ ─────────────────────────────────────────── */
function e(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function j(s) { return JSON.stringify(String(s)); }

/* thẻ tiêu đề: dưới 60 ký tự, đặt nội dung trước, thương hiệu sau */
function tieuDe(m) {
  var t = m.t.replace(/\s+/g, ' ').trim();
  var day = t + ' · GEN VIỆT 365';
  if (day.length <= 60) return day;
  if (t.length <= 60) return t;
  return t.slice(0, 57).replace(/\s+\S*$/, '') + '…';
}

/* thẻ mô tả: 140–160 ký tự, cắt ở ranh giới từ, không cắt giữa chữ */
function moTa(m) {
  var p = (m.p || m.t).replace(/\*/g, '').replace(/\s+/g, ' ').trim();
  if (p.length <= 160) return p;
  var c = p.slice(0, 157);
  var k = c.lastIndexOf(' ');
  return (k > 120 ? c.slice(0, k) : c) + '…';
}

/* nhóm chứa màn — dùng cho đường dẫn phân cấp */
var NHOM_CUA = {};
(G.NHOM || []).forEach(function (n) {
  (n.ds || []).forEach(function (i) { NHOM_CUA[i.v] = n; });
});

/* ── khai báo dữ liệu có cấu trúc ───────────────────────── */
function toChuc() {
  return {
    '@type': 'EducationalOrganization',
    '@id': GOC_URL + '/#hocvien',
    name: 'Học viện GITA',
    alternateName: 'GEN VIỆT 365',
    slogan: 'Gen Việt Thắp Sáng Vươn Mình',
    description: 'Hệ điều hành phát triển con người của Học viện GITA: mười lăm giai đoạn, ' +
      'năm tuyến vận hành, mười hai khối lớp, mười cấp độ câu lạc bộ.',
    areaServed: 'VN',
    inLanguage: 'vi-VN',
    knowsAbout: ['giáo dục phẩm chất', 'câu lạc bộ học đường', 'huấn luyện lãnh đạo trẻ',
                 'hoạt động trải nghiệm hướng nghiệp', 'nghiên cứu khoa học học sinh']
  };
}

function chuongTrinh() {
  return {
    '@type': 'EducationalOccupationalProgram',
    '@id': GOC_URL + '/#chuongtrinh',
    name: 'GEN VIỆT 365',
    provider: { '@id': GOC_URL + '/#hocvien' },
    educationalProgramMode: 'part-time',
    programPrerequisites: 'Học sinh phổ thông từ lớp 1 đến lớp 12',
    occupationalCategory: 'Phát triển năng lực và phẩm chất',
    inLanguage: 'vi-VN'
  };
}

/* câu hỏi thường gặp — chỉ gắn vào đúng màn có khối faq, để khai
   báo không bao giờ nói nhiều hơn thứ trang thật đang hiển thị */
function hoiDap(m) {
  var tu = null;
  (m.khoi || []).forEach(function (o) { if (o.k === 'faq' && o.tu) tu = o.tu; });
  if (!tu || !G[tu]) return null;
  var ds = [];
  G[tu].forEach(function (n) {
    (n.ds || []).forEach(function (x) {
      ds.push({ '@type': 'Question', name: x.h,
        acceptedAnswer: { '@type': 'Answer', text: String(x.d).replace(/\*/g, '') } });
    });
  });
  if (!ds.length) return null;
  return { '@type': 'FAQPage', mainEntity: ds };
}

function khaiBao(v, m) {
  var n = NHOM_CUA[v];
  var g = [toChuc(), chuongTrinh(), {
    '@type': 'WebPage',
    '@id': GOC_URL + '/trang/' + v + '.html',
    name: m.t,
    description: moTa(m),
    inLanguage: 'vi-VN',
    isPartOf: { '@id': GOC_URL + '/#trang' },
    publisher: { '@id': GOC_URL + '/#hocvien' },
    about: { '@id': GOC_URL + '/#chuongtrinh' }
  }, {
    '@type': 'WebSite',
    '@id': GOC_URL + '/#trang',
    url: GOC_URL + '/',
    name: 'GEN VIỆT 365',
    inLanguage: 'vi-VN',
    publisher: { '@id': GOC_URL + '/#hocvien' }
  }, {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'GEN VIỆT 365', item: GOC_URL + '/' },
      { '@type': 'ListItem', position: 2, name: n ? n.t : 'Nội dung',
        item: GOC_URL + '/#' + v },
      { '@type': 'ListItem', position: 3, name: m.t }
    ]
  }];
  var fq = hoiDap(m);
  if (fq) g.push(fq);
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': g }, null, 2);
}

/* ── dựng nội dung màn bằng Chromium thật ────────────────── */
function dungBangTrinhDuyet(ds) {
  var pw;
  try { pw = require('/opt/node22/lib/node_modules/playwright'); }
  catch (x) { try { pw = require('playwright'); } catch (y) { return Promise.resolve(null); } }
  return pw.chromium.launch().then(function (b) {
    return b.newPage({ viewport: { width: 1100, height: 900 } }).then(function (p) {
      return p.goto('file://' + path.join(GOC, 'index.html'),
        { waitUntil: 'domcontentloaded' }).then(function () {
        return p.evaluate(async function (ds2) {
          var nhip = function () { return new Promise(function (r) { setTimeout(r, 0); }); };
          var ra = {};
          for (var i = 0; i < ds2.length; i++) {
            location.hash = ds2[i];
            await nhip();
            var c = document.querySelector('.chinh');
            /* bỏ khối liên quan và điều hướng cuối màn — chúng trỏ
               bằng dấu thăng, vô nghĩa trong trang tĩnh */
            var ban = c.cloneNode(true);
            Array.prototype.forEach.call(ban.querySelectorAll('.lq, .dh-cuoi, nav'),
              function (x) { x.remove(); });
            ra[ds2[i]] = ban.innerHTML;
          }
          return ra;
        }, ds);
      }).then(function (ra) { return b.close().then(function () { return ra; }); });
    });
  });
}

/* ── khung trang tĩnh ────────────────────────────────────── */
function khung(v, m, than) {
  var n = NHOM_CUA[v];
  return '<!doctype html>\n<html lang="vi">\n<head>\n' +
    '<meta charset="utf-8">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>' + e(tieuDe(m)) + '</title>\n' +
    '<meta name="description" content="' + e(moTa(m)) + '">\n' +
    '<link rel="canonical" href="' + GOC_URL + '/trang/' + v + '.html">\n' +
    '<meta name="color-scheme" content="light dark">\n' +
    '<meta property="og:type" content="article">\n' +
    '<meta property="og:site_name" content="GEN VIỆT 365">\n' +
    '<meta property="og:locale" content="vi_VN">\n' +
    '<meta property="og:title" content="' + e(tieuDe(m)) + '">\n' +
    '<meta property="og:description" content="' + e(moTa(m)) + '">\n' +
    '<meta property="og:url" content="' + GOC_URL + '/trang/' + v + '.html">\n' +
    '<meta property="og:image" content="' + GOC_URL + '/nhan-dien/chia-se.svg">\n' +
    '<meta property="og:image:width" content="1200">\n' +
    '<meta property="og:image:height" content="630">\n' +
    '<meta name="twitter:card" content="summary_large_image">\n' +
    '<style>\n' + CSS + CSS_TINH + '\n</style>\n' +
    '<script type="application/ld+json">\n' + khaiBao(v, m) + '\n</script>\n' +
    '</head>\n<body class="trang-tinh">\n' +
    '<a class="bo-qua" href="#noi-dung">Tới nội dung</a>\n' +
    '<header class="dau-tinh">\n' +
    '<a href="../gen-viet-365.html">GEN VIỆT 365</a>' +
    (n ? '<span class="nhom-tinh">' + e(n.no + ' · ' + n.t) + '</span>' : '') +
    '</header>\n' +
    '<main class="chinh" id="noi-dung">\n' + than + '\n</main>\n' +
    '<footer class="chan-tinh">\n' +
    '<p>Màn này là một phần của hệ vận hành GEN VIỆT 365 — Học viện GITA. ' +
    'Bản đầy đủ có ô tìm, điều hướng theo nhóm và phân quyền theo vai: ' +
    '<a href="../gen-viet-365.html#' + e(v) + '">mở bản đầy đủ tại màn này</a>.</p>\n' +
    '</footer>\n</body>\n</html>\n';
}

/* ── chạy ────────────────────────────────────────────────── */
var CONG_KHAI = Object.keys(G.MAN).filter(function (v) { return G.MAN[v].q === 'chung'; });

dungBangTrinhDuyet(CONG_KHAI).then(function (than) {
  if (!than) {
    console.log('   ! không có playwright — bỏ qua bước sinh trang tĩnh');
    return;
  }
  fs.mkdirSync(RA, { recursive: true });
  var dem = 0;
  CONG_KHAI.forEach(function (v) {
    if (!than[v]) return;
    fs.writeFileSync(path.join(RA, v + '.html'), khung(v, G.MAN[v], than[v]));
    dem++;
  });

  /* bản đồ trang */
  var ngay = new Date().toISOString().slice(0, 10);
  var sm = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    '  <url><loc>' + GOC_URL + '/</loc><lastmod>' + ngay +
    '</lastmod><priority>1.0</priority></url>\n' +
    CONG_KHAI.filter(function (v) { return than[v]; }).map(function (v) {
      return '  <url><loc>' + GOC_URL + '/trang/' + v + '.html</loc><lastmod>' + ngay +
        '</lastmod><priority>0.8</priority></url>';
    }).join('\n') + '\n</urlset>\n';
  fs.writeFileSync(path.join(RA, '..', 'sitemap.xml'), sm);

  /* tệp chặn — bản cắt theo vai KHÔNG được lập chỉ mục */
  var rb = '# GEN VIỆT 365\n' +
    'User-agent: *\n' +
    'Allow: /\n' +
    '# Bản cắt theo vai chứa nội dung nội bộ — không lập chỉ mục.\n' +
    'Disallow: /gen-viet-365-r08.html\n' +
    'Disallow: /gen-viet-365-r15.html\n' +
    'Disallow: /gen-viet-365-r16.html\n' +
    'Disallow: /gen-viet-365-r17.html\n\n' +
    'Sitemap: ' + GOC_URL + '/sitemap.xml\n';
  fs.writeFileSync(path.join(RA, '..', 'robots.txt'), rb);

  console.log('   ✓ ' + dem + ' trang tĩnh cho màn công khai');
  console.log('   ✓ sitemap.xml · robots.txt');
}).catch(function (x) {
  console.error('   ✗ sinh trang tĩnh hỏng: ' + x.message);
  process.exit(1);
});
