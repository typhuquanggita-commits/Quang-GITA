/**
 * KET XUAT TINH (prerender)
 *
 * VI SAO DAY LA VIEC QUYET DINH, khong phai mot toi uu them:
 *
 * Mot ung dung mot trang gui ve trinh duyet mot tep HTML gan nhu rong, roi
 * JavaScript moi dung noi dung. Google BIET chay JavaScript — nhung:
 *
 *  - No chay o luot thu hai, cach luot dau tu vai gio den vai ngay. Trang moi
 *    vao chi muc cham hon han doi thu dung HTML tinh.
 *  - Cac bo thu thap MANG XA HOI (Facebook, Zalo, Messenger, Twitter) KHONG
 *    chay JavaScript. Chia se mot dia chi se ra o trong khong tieu de, khong
 *    mo ta, khong anh — va do la kenh lan truyen lon nhat o Viet Nam.
 *  - Diem trai nghiem (LCP) bi keo xuong vi noi dung dau tien phai doi JS tai
 *    xong, va Core Web Vitals la mot yeu to xep hang.
 *
 * Kich ban nay dung Chromium dung trong ban build that, cho trang dung xong,
 * roi ghi HTML DA DUNG vao dung duong dan tinh. Ket qua: bo thu thap nhan duoc
 * mot trang day du ngay o luot dau, con nguoi dung van co ung dung day du.
 *
 * Chi ket xuat cac duong dan CHO LAP CHI MUC. Man hinh chua du lieu hoc tap ca
 * nhan khong duoc ket xuat — vua vo nghia vua rui ro.
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const DIST = resolve('dist');
const PORT = 4319;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

/** May chu tinh co SPA fallback — dung dieu kien ma ban trien khai that phai co. */
function serve() {
  return createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);
    let file = join(DIST, decodeURIComponent(url.pathname));
    if (!existsSync(file) || !extname(file)) file = join(DIST, 'index.html');
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  });
}

const { ROUTES_SEO } = await import('../src/data/seo.ts').catch(() => ({ ROUTES_SEO: null }));

/** Doc bang route tu chinh ma nguon de khong bao gio lech. */
async function routes() {
  if (ROUTES_SEO) return ROUTES_SEO.filter((r) => r.index).map((r) => r.path);
  const source = await readFile(resolve('src/data/seo.ts'), 'utf8');
  const found = [...source.matchAll(/path:\s*'([^']+)'[\s\S]*?index:\s*(true|false)/g)];
  return found.filter((m) => m[2] === 'true').map((m) => m[1]);
}

const server = serve();
await new Promise((done) => server.listen(PORT, done));

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage();

const paths = await routes();
let written = 0;

for (const path of paths) {
  await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' });
  // Cho den khi React da dung xong noi dung that, khong phai khung cho.
  await page.waitForSelector('h1', { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(250);

  const html = await page.evaluate(() => `<!doctype html>\n${document.documentElement.outerHTML}`);

  const dir = path === '/' ? DIST : join(DIST, path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html, 'utf8');

  const title = await page.title();
  console.log(`  ${path.padEnd(24)} ${title.slice(0, 60)}`);
  written += 1;
}

/*
 * Anh chia se (Open Graph).
 *
 * Bo thu thap mang xa hoi khong chay JavaScript, nen anh nay phai la mot tep
 * that o dia chi co dinh. Ve bang chinh dau hieu va bang mau cua bo nhan dien
 * de khong lech khoi san pham.
 */
const OG = `<!doctype html><html><head><meta charset="utf-8"><style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;display:flex;flex-direction:column;justify-content:center;
       gap:28px;padding:80px;background:#ffffff;
       font-family:Georgia,'Times New Roman',serif;color:#123C6E}
  .mark{height:120px}
  h1{font-size:62px;line-height:1.15;letter-spacing:-.02em;font-weight:700}
  p{font-size:30px;line-height:1.4;color:#3b475a;font-family:system-ui,sans-serif}
  .bar{height:10px;width:260px;background:linear-gradient(90deg,#2E6FBF 0 40%,#E02B20 40% 70%,#5B9BD8 70% 100%);border-radius:99px}
</style></head><body>
  <img class="mark" src="/logo-gita-mark.svg" alt="">
  <h1>Luyện thi Đánh giá năng lực HSA</h1>
  <p>Định vị đầu vào · Lộ trình cá nhân hóa · 2.000 phiếu luyện · Đề mẫu kèm barem</p>
  <div class="bar"></div>
</body></html>`;

const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await og.goto(`http://localhost:${PORT}/`);
await og.setContent(OG, { waitUntil: 'networkidle' });
await og.screenshot({ path: join(DIST, 'og-hsa365.png') });
await og.close();
console.log('  og-hsa365.png          1200×630 — ảnh chia sẻ mạng xã hội');

await browser.close();
server.close();

console.log(`\nĐã kết xuất tĩnh ${written} đường dẫn. Bộ thu thập và trình duyệt nhận được HTML đầy đủ ngay ở lượt đầu.`);
