/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Kiểm tầng SEO trên BẢN ĐÃ ĐÓNG GÓI, không kiểm mã nguồn.
 * Chạy: npm run build && npx tsx tools/sinh-anh-og.mjs && npx tsx tools/sinh-seo.mjs && npx tsx tools/kiem-seo.mjs
 *
 * VÌ SAO ĐỌC dist/ CHỨ KHÔNG ĐỌC MÃ NGUỒN
 *   Máy tìm kiếm không đọc mã nguồn. Nó tải đúng những tệp trong dist/ và
 *   xếp hạng dựa trên đó. Bài kiểm nào đọc mã nguồn thì chỉ chứng minh ý
 *   định, còn bài kiểm đọc dist/ chứng minh kết quả — và giữa hai thứ đó
 *   có đúng chỗ mà mọi lỗi đóng gói lọt qua.
 *
 * BÀI KIỂM NÀY PHẢI ĐỔ ĐƯỢC
 *   Mỗi mục dưới đây đều đã được thử bằng cách cố tình làm hỏng mã rồi xem
 *   nó có đỏ không. Bài kiểm không bao giờ đỏ được là bài kiểm vô dụng.
 */
import {readFileSync, existsSync, statSync} from 'node:fs';
import {join} from 'node:path';

const {TRANG_CONG_KHAI, TRANG_NOI_BO, GOC, duongDanCuaTab, anhOg} =
  await import('../data/seo.ts');

const DIST = 'dist';
let loi = 0;
const dat = (m) => console.log(`  ✓ ${m}`);
const hong = (m) => {
  loi++;
  console.log(`  ✗ ${m}`);
};

console.log('\n  KIỂM TẦNG SEO\n');

const tepCua = (duong) =>
  duong === '/' ? join(DIST, 'index.html') : join(DIST, duong.slice(1), 'index.html');

/* Trích một thuộc tính từ HTML. Đủ tin cậy vì HTML này do chính hệ thống
   sinh ra, không phải HTML lạ ngoài mạng. */
const meta = (h, ten, theo = 'name') => {
  const r = new RegExp(`<meta[^>]+${theo}="${ten}"[^>]*>`, 'i').exec(h);
  if (!r) return null;
  const c = /content="([^"]*)"/i.exec(r[0]);
  return c ? c[1] : null;
};
const the = (h, re) => {
  const r = re.exec(h);
  return r ? r[1] : null;
};
const goBo = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

/* ====================== 1. TỆP CÓ ĐỦ VÀ ĐỌC ĐƯỢC ====================== */
const trangs = [];
for (const t of [...TRANG_CONG_KHAI, ...TRANG_NOI_BO]) {
  const duong = duongDanCuaTab(t.tabId);
  const tep = tepCua(duong);
  if (!existsSync(tep)) {
    hong(`${duong} — không có tệp ${tep}`);
    continue;
  }
  trangs.push({t, duong, html: readFileSync(tep, 'utf8'), congKhai: t.congKhai});
}
trangs.length === TRANG_CONG_KHAI.length + TRANG_NOI_BO.length
  ? dat(`${trangs.length} địa chỉ đều có tệp HTML riêng`)
  : hong('thiếu tệp HTML cho một số địa chỉ');

const congKhai = trangs.filter((x) => x.congKhai);

/* ====================== 2. THẺ H1 VÀ NGÔN NGỮ ========================= */
for (const x of congKhai) {
  const soH1 = (x.html.match(/<h1[\s>]/g) || []).length;
  if (soH1 !== 1) hong(`${x.duong} — có ${soH1} thẻ <h1>, phải đúng một`);
  const noiDung = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(x.html);
  const chu = noiDung ? noiDung[1].replace(/<[^>]+>/g, '').trim() : '';
  if (chu.length < 8) hong(`${x.duong} — thẻ <h1> rỗng hoặc quá ngắn: "${chu}"`);
  if (!/<html[^>]+lang="vi"/i.test(x.html)) hong(`${x.duong} — thẻ <html> thiếu lang="vi"`);
}
dat('mỗi trang công khai đúng một <h1> có chữ, và khai lang="vi"');

/* ====================== 3. TIÊU ĐỀ VÀ MÔ TẢ ========================== */
/*
 * Google cắt tiêu đề quanh 60 ký tự và mô tả quanh 160. Quá dài thì phần
 * quan trọng bị cắt mất; trùng nhau thì Google gộp các trang lại và chỉ
 * hiện một, tức là mất phần lớn số trang.
 */
const dsTieuDe = new Map();
const dsMoTa = new Map();
for (const x of congKhai) {
  const tieuDe = goBo(the(x.html, /<title>([\s\S]*?)<\/title>/i) || '');
  const moTa = goBo(meta(x.html, 'description') || '');
  if (!tieuDe) hong(`${x.duong} — không có <title>`);
  else if (tieuDe.length > 70) hong(`${x.duong} — tiêu đề ${tieuDe.length} ký tự, Google cắt quanh 60`);
  if (!moTa) hong(`${x.duong} — không có meta description`);
  else if (moTa.length < 70) hong(`${x.duong} — mô tả chỉ ${moTa.length} ký tự, quá mỏng để dùng làm đoạn trích`);
  else if (moTa.length > 165) hong(`${x.duong} — mô tả ${moTa.length} ký tự, Google cắt quanh 160`);
  if (dsTieuDe.has(tieuDe)) hong(`tiêu đề trùng giữa ${dsTieuDe.get(tieuDe)} và ${x.duong}`);
  else dsTieuDe.set(tieuDe, x.duong);
  if (dsMoTa.has(moTa)) hong(`mô tả trùng giữa ${dsMoTa.get(moTa)} và ${x.duong}`);
  else dsMoTa.set(moTa, x.duong);
}
dat(`${congKhai.length} tiêu đề và ${congKhai.length} mô tả đều riêng, không trùng, trong khung Google hiện được`);

/* ====================== 4. CANONICAL VÀ ROBOTS ======================= */
for (const x of trangs) {
  const can = the(x.html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  const dung = `${GOC}${x.duong}`;
  if (x.congKhai) {
    if (!can) hong(`${x.duong} — không có canonical`);
    else if (can !== dung) hong(`${x.duong} — canonical trỏ sai: ${can} (phải là ${dung})`);
  }
  const rb = meta(x.html, 'robots') || '';
  if (x.congKhai && /noindex/i.test(rb)) hong(`${x.duong} — trang công khai mà mang noindex`);
  if (!x.congKhai && !/noindex/i.test(rb))
    hong(`${x.duong} — trang nội bộ mà KHÔNG có noindex sẵn trong HTML`);
}
dat('canonical tự trỏ đúng địa chỉ; 5 trang nội bộ mang noindex sẵn trong HTML');

/* ====================== 5. THẺ CHIA SẺ VÀ ẢNH ======================== */
for (const x of congKhai) {
  for (const [ten, theo] of [
    ['og:title', 'property'],
    ['og:description', 'property'],
    ['og:url', 'property'],
    ['og:type', 'property'],
    ['og:image', 'property'],
    ['og:locale', 'property'],
    ['twitter:card', 'name'],
  ]) {
    if (!meta(x.html, ten, theo)) hong(`${x.duong} — thiếu thẻ ${ten}`);
  }
  const anh = meta(x.html, 'og:image', 'property');
  if (anh && !anh.startsWith('https://'))
    hong(`${x.duong} — og:image không phải địa chỉ tuyệt đối: ${anh}`);
  if (anh !== anhOg(x.t.tabId)) hong(`${x.duong} — og:image không khớp bảng ảnh`);
  const tepAnh = join(DIST, 'og', `${x.t.duongDan}.jpg`);
  if (!existsSync(tepAnh)) hong(`${x.duong} — không có tệp ảnh chia sẻ ${tepAnh}`);
  else if (statSync(tepAnh).size > 300 * 1024)
    hong(`${x.duong} — ảnh chia sẻ ${Math.round(statSync(tepAnh).size / 1024)} kB, quá nặng`);
}
dat(`${congKhai.length} trang có đủ thẻ chia sẻ và một ảnh 1200×630 tồn tại thật`);

/* ====================== 6. DỮ LIỆU CÓ CẤU TRÚC ======================= */
const LOAI_CHO_PHEP = new Set([
  'EducationalOrganization', 'WebPage', 'BreadcrumbList', 'Course',
]);
for (const x of congKhai) {
  const khoi = [...x.html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )];
  if (khoi.length < 3) hong(`${x.duong} — chỉ ${khoi.length} khối dữ liệu có cấu trúc, phải có ít nhất 3`);
  for (const k of khoi) {
    let o;
    try {
      o = JSON.parse(k[1]);
    } catch (e) {
      hong(`${x.duong} — khối JSON-LD hỏng: ${e.message}`);
      continue;
    }
    if (o['@context'] !== 'https://schema.org')
      hong(`${x.duong} — @context sai: ${o['@context']}`);
    if (!LOAI_CHO_PHEP.has(o['@type']))
      hong(`${x.duong} — @type "${o['@type']}" không nằm trong danh sách đã kiểm`);
  }
}
dat('mọi khối JSON-LD phân tích được, đúng schema.org, và chỉ dùng loại đã kiểm');

/* ====================== 7. KHÔNG CÓ TRANG MỒ CÔI ===================== */
/*
 * Máy tìm kiếm đi theo thẻ <a href>, không bấm nút. Một trang chỉ có trong
 * sitemap mà không có đường dẫn tới từ trang khác là trang mồ côi: nó được
 * thu thập chậm, và không nhận được chút uy tín nào từ phần còn lại.
 */
const goc = congKhai.find((x) => x.duong === '/');
if (!goc) hong('không có trang gốc');
else {
  const lienKet = new Set(
    [...goc.html.matchAll(/<a[^>]+href="(\/[^"#?]*)"/g)].map((m) => m[1]),
  );
  const mocoi = congKhai.filter((x) => x.duong !== '/' && !lienKet.has(x.duong));
  mocoi.length
    ? hong(`${mocoi.length} trang mồ côi, không có liên kết từ trang gốc: ${mocoi.map((x) => x.duong).join(', ')}`)
    : dat(`mọi trang công khai đều có liên kết <a href> từ trang gốc (${lienKet.size} liên kết)`);

  const roRi = congKhai.length && TRANG_NOI_BO.some((t) => lienKet.has(duongDanCuaTab(t.tabId)));
  roRi
    ? hong('trang gốc dẫn link tới địa chỉ nội bộ — khách vãng lai không mở được')
    : dat('trang gốc không dẫn link tới địa chỉ nội bộ nào');
}

/* ====================== 8. SITEMAP VÀ ROBOTS.TXT ===================== */
const sm = readFileSync(join(DIST, 'sitemap.xml'), 'utf8');
const trongSm = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => goBo(m[1]));
const canCo = TRANG_CONG_KHAI.map((t) => `${GOC}${duongDanCuaTab(t.tabId)}`);
const thieu = canCo.filter((u) => !trongSm.includes(u));
const thua = trongSm.filter((u) => !canCo.includes(u));
thieu.length && hong(`sitemap thiếu ${thieu.length} địa chỉ: ${thieu.slice(0, 3).join(', ')}`);
thua.length && hong(`sitemap có ${thua.length} địa chỉ thừa: ${thua.slice(0, 3).join(', ')}`);
!thieu.length && !thua.length && dat(`sitemap khớp đúng ${canCo.length} địa chỉ công khai, không thiếu không thừa`);

const mai = Date.now() + 86_400_000;
let ngayHong = 0;
for (const m of sm.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
  const d = Date.parse(m[1]);
  if (Number.isNaN(d) || d > mai) ngayHong++;
}
ngayHong
  ? hong(`${ngayHong} giá trị lastmod không hợp lệ hoặc nằm ở tương lai`)
  : dat('mọi lastmod đều là mốc thời gian hợp lệ và không nằm ở tương lai');

for (const m of sm.matchAll(/<priority>([^<]+)<\/priority>/g)) {
  const v = Number(m[1]);
  if (!(v >= 0 && v <= 1)) hong(`priority ngoài khoảng 0..1: ${m[1]}`);
}
if (/changefreq/.test(sm)) hong('sitemap còn changefreq — Google bỏ qua nó, ghi vào chỉ là một câu sai');

const rb = readFileSync(join(DIST, 'robots.txt'), 'utf8');
/^Sitemap:\s*\S+/m.test(rb) ? dat('robots.txt chỉ tới sitemap') : hong('robots.txt không chỉ tới sitemap');
/^Disallow:\s*\/\s*$/m.test(rb)
  ? hong('robots.txt có "Disallow: /" — chặn toàn bộ tên miền khỏi tìm kiếm')
  : dat('robots.txt không chặn nhầm đường nào');

/* ====================== 9. TRANG 404 ================================= */
const tep404 = join(DIST, '404.html');
if (!existsSync(tep404)) hong('không có 404.html — địa chỉ hỏng sẽ rơi vào trang mặc định của nơi đăng');
else {
  const h4 = readFileSync(tep404, 'utf8');
  if (!/noindex/i.test(h4)) hong('404.html không có noindex');
  const soLien = (h4.match(/<a[^>]+href="\//g) || []).length;
  if (soLien < 5) hong(`404.html chỉ có ${soLien} lối đi tiếp`);
  else dat(`404.html là trang thật, có noindex và ${soLien} lối đi tiếp`);
}

/* ====================== 10. NỘI DUNG CÓ SẴN TRONG HTML =============== */
/*
 * Đây là mục quan trọng nhất của cả bài kiểm. Nếu HTML trả về rỗng thì mọi
 * thứ ở trên chỉ là thẻ meta đẹp trên một trang trắng.
 */
let mong = 0;
for (const x of congKhai) {
  const than = /<main[^>]*>([\s\S]*?)<\/main>/i.exec(x.html);
  const chu = than ? than[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length : 0;
  if (chu < 400) {
    hong(`${x.duong} — chỉ ${chu} ký tự nội dung trong HTML, máy tìm kiếm coi là trang mỏng`);
    mong++;
  }
}
mong || dat(`${congKhai.length} trang đều có nội dung thật sẵn trong HTML, không đợi JavaScript`);

/* ====== 11. KHÔNG CÒN ĐỊA CHỈ MÁY ĐÓNG GÓI TRONG TỆP PHÁT HÀNH ======== */
/*
 * Bộ nạp mô-đun của Vite chèn <link rel="modulepreload"> bằng địa chỉ
 * tuyệt đối, kèm cả cổng của máy chủ xem trước lúc dựng sẵn. Lưu nguyên
 * thì mỗi trang mang theo một địa chỉ localhost đóng băng: trên máy người
 * dùng là liên kết chết, bị CSP chặn vì khác gốc, và lộ cổng máy đóng gói.
 *
 * Trang vẫn hiện ra bình thường nên lỗi này trôi qua rất dễ. Mục kiểm này
 * là thứ duy nhất chặn được nó.
 */
{
  const dinh = [];
  for (const x of trangs) {
    const m = x.html.match(/https?:\/\/(localhost|127\.0\.0\.1)[:0-9]*/g);
    if (m) dinh.push(`${x.duong} (${[...new Set(m)].join(', ')})`);
  }
  dinh.length
    ? hong(`${dinh.length} trang còn địa chỉ máy đóng gói trong HTML: ${dinh.slice(0, 3).join('; ')}`)
    : dat('không trang nào còn địa chỉ localhost của máy đóng gói');

  const ngoai = [];
  for (const x of congKhai) {
    for (const m of x.html.matchAll(/<(?:script|link)[^>]+(?:src|href)="(https?:\/\/[^"]+)"/g)) {
      if (!m[1].startsWith(GOC)) ngoai.push(`${x.duong} → ${m[1]}`);
    }
  }
  ngoai.length
    ? hong(`${ngoai.length} tài nguyên nạp từ ngoài tên miền: ${ngoai.slice(0, 3).join('; ')}`)
    : dat('không trang nào nạp script hay kiểu dáng từ tên miền khác');
}

/* ============ 12. CON SỐ TRONG DỮ LIỆU CÓ CẤU TRÚC LÀ SỐ THẬT ========= */
/*
 * data/seo.ts ghi thẳng số phút mỗi ngày thay vì tính từ bảng bậc, để
 * không kéo cả data/chuyenanh.ts vào gói tải lần đầu. Đổi lại thì chỗ này
 * phải đối chiếu — bài kiểm chạy lúc đóng gói nên nhập gì cũng không ai
 * phải tải. Không có mục này thì con số ghi tay sẽ lệch trong im lặng.
 */
const {BANDS} = await import('../data/chuyenanh.ts');
const phutThat = Math.round(
  BANDS.reduce((s, b) => s + b.dailyMinutes, 0) / BANDS.length,
);
const khoiCourse = (() => {
  const h = readFileSync(tepCua('/'), 'utf8');
  for (const k of h.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const o = JSON.parse(k[1]);
      if (o['@type'] === 'Course') return o;
    } catch {
      /* mục 6 đã báo khối hỏng rồi */
    }
  }
  return null;
})();
if (!khoiCourse) hong('trang gốc không có khối Course');
else {
  const khai = khoiCourse.hasCourseInstance?.courseWorkload;
  khai === `PT${phutThat}M`
    ? dat(`Course khai ${khai} mỗi ngày, khớp đúng trung bình ${phutThat} phút của bảng bậc`)
    : hong(`Course khai courseWorkload ${khai} nhưng bảng bậc cho ra PT${phutThat}M`);
  if (khoiCourse.offers) hong('Course khai giá — chưa có bảng giá thật trong mã nguồn');
}

console.log(`\n  ${loi === 0 ? `ĐẠT — ${congKhai.length} trang công khai đủ điều kiện kỹ thuật để xếp hạng` : `HỎNG — ${loi} lỗi`}\n`);
process.exit(loi === 0 ? 0 : 1);
