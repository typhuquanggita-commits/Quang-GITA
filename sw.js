/* ═══════════════════════════════════════════════════════════════
   GITA 365 · v7.0 — SERVICE WORKER
   Cài một lần, dùng được cả khi mất mạng. Toàn bộ kho tri thức
   nằm trong máy — không cần đường truyền để mở bản đồ nhà mình.
   ═══════════════════════════════════════════════════════════════ */
const CACHE = 'gita365-v8-0-0';
/* Danh sách này phải khớp với thứ tự thẻ <script> trong index.html.
   Thiếu tệp thì lần cài đầu vẫn chạy — trình xử lý fetch bên dưới cache
   lại mọi thứ tải về — nhưng mất mạng ngay sau khi cài thì vỡ. */
const FILES = [
  './', './index.html', './manifest.webmanifest',
  './assets/style.css', './kho/mau.json',
  './kho/nen.enc', './kho/nghe.enc',
  './kho/tang1.enc', './kho/tang2.enc', './kho/tang3.enc', './kho/tang4.enc', './kho/tang5.enc',
  './assets/style.css',
  './assets/fonts.css',
  './assets/fonts/bevietnampro-400-italic-latin.woff2',
  './assets/fonts/bevietnampro-400-italic-vietnamese.woff2',
  './assets/fonts/bevietnampro-400-normal-latin.woff2',
  './assets/fonts/bevietnampro-400-normal-vietnamese.woff2',
  './assets/fonts/bevietnampro-600-normal-latin.woff2',
  './assets/fonts/bevietnampro-600-normal-vietnamese.woff2',
  './assets/fonts/bevietnampro-700-normal-latin.woff2',
  './assets/fonts/bevietnampro-700-normal-vietnamese.woff2',
  './assets/fonts/bevietnampro-800-normal-latin.woff2',
  './assets/fonts/bevietnampro-800-normal-vietnamese.woff2',
  './assets/fonts/playfairdisplay-500-italic-latin.woff2',
  './assets/fonts/playfairdisplay-500-italic-vietnamese.woff2',
  './assets/fonts/playfairdisplay-600-normal-latin.woff2',
  './assets/fonts/playfairdisplay-600-normal-vietnamese.woff2',
  './assets/icons/icon-192.png', './assets/icons/icon-512.png', './assets/icons/maskable-512.png',
  './src/data.core.js', './src/i18n.js', './src/data.tuyen.js', './src/data.accounts.js',
  './src/ui.js', './cau-hinh.js', './src/logo-gita.js',
  './src/nhan-dien.js', './src/nhan-dien-loi.js', './src/loi-khach.js',
  './src/loi-hoc-vien.js', './src/quy-trinh.js', './src/mat-khau.js',
  './src/dang-ky.js', './src/dong-bo.js', './src/nap-giay-phep.js',
  './src/kho-khoa.js', './src/guard.js', './src/khoa-sao-chep.js',
  './src/views.js', './src/views2.js', './src/views3.js',
  './src/views4.js', './src/views5.js', './src/views6.js',
  './src/views7.js', './src/views8.js', './src/views9.js',
  './src/views10.js', './src/sua-noi-dung.js', './src/sap-xep.js',
  './src/views11.js', './src/khung-trong.js', './src/vong-nhac.js',
  './src/ban-do-ca-nhan.js', './src/chuyen-cam-hung.js', './src/nhat-ky-thi-viet.js',
  './src/do-thoi-gian.js', './src/gioi-thieu.js', './src/chuyen-the-gioi.js',
  './src/nghe-chuyen.js', './src/sat-hach.js', './src/khoa-dao-tao.js',
  './src/ma-tran-bang.js', './src/tu-lieu-day-du.js', './src/luat-lam-viec.js',
  './src/views-hanh-trinh.js', './src/theo-doi-tai-nguyen.js', './src/kho-tong.js',
  './src/noi-may-chu.js', './src/kho-khach.js', './src/quy-trinh-xu-ly.js',
  './src/tro-ly-ai.js', './src/tro-ly-chat.js', './src/thu-vien.js',
  './src/duong-vao.js', './src/soat-day-du.js', './src/tuyen.js', './src/chieu-sau.js',
  './src/app.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(FILES))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[GITA] cache install:', err))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Ưu tiên bản trong máy, đồng thời làm mới ngầm ở nền */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // font ngoài để trình duyệt tự lo

  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
