#!/usr/bin/env python3
"""GITA 365 — đóng gói BẢN GIỚI THIỆU thành một tệp HTML chạy được ở mọi nơi.

⚠ Bản một tệp KHÔNG chứa kho tri thức. Nó chạy ở chế độ mẫu: đủ để xem
giao diện, hành trình và la bàn văn hoá, nhưng nội dung chuyên môn chỉ mở
khi đăng nhập vào bản có nối máy chủ cấp phép.

    python3 tools/dong-goi.py

Ra: GITA365_v70_MOT_TEP.html — mở bằng trình duyệt, gửi qua email, dán vào
Apps Script, hoặc chép vào USB. Không cần mạng, không cần cài gì.
Bản nhiều tệp (index.html) mới là bản cài được như ứng dụng (PWA).
"""
import re, os, sys, base64

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

html = open('index.html', encoding='utf-8').read()

# 1. Nhúng tệp kiểu dáng
css = open('assets/style.css', encoding='utf-8').read()
html = html.replace('<link rel="stylesheet" href="assets/style.css">',
                    '<style>\n' + css + '\n</style>')

# 1b. Nhúng bộ chữ dạng dữ liệu — bản một tệp không tải gì từ mạng
fonts = open('assets/fonts.css', encoding='utf-8').read()
def _chu(m):
    ten = m.group(1)
    d = base64.b64encode(open(os.path.join('assets', ten), 'rb').read()).decode()
    return "url(data:font/woff2;base64,%s)" % d
fonts = re.sub(r"url\((fonts/[^)]+\.woff2)\)", _chu, fonts)
html = html.replace('<link rel="stylesheet" href="assets/fonts.css">',
                    '<style>\n' + fonts + '\n</style>')

# 2. Nhúng biểu tượng ứng dụng dạng dữ liệu
def b64(p):
    return 'data:image/png;base64,' + base64.b64encode(open(p, 'rb').read()).decode()
html = html.replace('href="assets/icons/icon-192.png"', 'href="%s"' % b64('assets/icons/icon-192.png'))

# 2b. Nhúng logo chuẩn — bản một tệp không có thư mục assets đi kèm nên
#     ảnh phải nằm ngay trong tệp, nếu không logo sẽ vỡ khi gửi cho khách.
for _ten in ('logo-gita.png', 'dau-gita.png'):
    _d = os.path.join('assets', 'brand', _ten)
    if os.path.exists(_d):
        html = html.replace("assets/brand/" + _ten, b64(_d))

# 3. Bỏ phần chỉ dùng cho bản nhiều tệp
html = html.replace('<link rel="manifest" href="manifest.webmanifest">', '')
html = re.sub(r"if \('serviceWorker' in navigator.*?\n\}\n", '', html, flags=re.S)

# 4. Nhúng toàn bộ mã nguồn, đúng thứ tự
def nhung(m):
    p = m.group(1)
    if not os.path.exists(p):
        sys.exit('Thiếu tệp: ' + p)
    ma = open(p, encoding='utf-8').read()
    if p.endswith('logo-gita.js'):
        for _t in ('logo-gita.png', 'dau-gita.png'):
            _d = os.path.join('assets', 'brand', _t)
            if os.path.exists(_d):
                ma = ma.replace("assets/brand/" + _t, b64(_d))
    return '<script>\n/* ── %s ── */\n%s\n</script>' % (p, ma)
html = re.sub(r'<script src="([^"]+)"></script>', nhung, html)

# 5. Chế độ mẫu: nhúng sẵn gói mẫu, không có kho, không có khoá
mau = open('kho/mau.json', encoding='utf-8').read()
html = html.replace('<script>\nG.boot();',
  '<script>\n/* Bản giới thiệu — chế độ mẫu, không kèm kho tri thức */\n'
  'G.MAU_NHUNG = ' + mau + ';\n'
  'G.napKho = function(){ G.KHO.cheDoMau = true; G.KHO.daNap = [];\n'
  '  G.KICHBAN = G.MAU_NHUNG.KICHBAN || []; G.PHACDO = G.MAU_NHUNG.PHACDO || [];\n'
  '  Object.keys(G.MAU_NHUNG).forEach(function(k){ G[k] = G.MAU_NHUNG[k]; });\n'
  '  G.MOTHUC = G.MAU_NHUNG.MOTHUC || []; G.TEST750 = G.MAU_NHUNG.TEST750 || [];\n'
  '  return Promise.resolve(); };\n'
  '/* Bản giới thiệu mở hết đường đi để xem được toàn bộ khung; màn hình nào\n'
  '   cần nội dung đã cấp phép thì tự hiện màn xin cấp phép. */\n'
  'G.coGoi = function(){ return true; };\n'
  'G.boot();')

out = 'GITA365_v75_GIOI_THIEU.html'
open(out, 'w', encoding='utf-8').write(html)
print('%s · %d KB' % (out, os.path.getsize(out) // 1024))

# ══════════════════════════════════════════════════════════════════
# 6. BẢN ĐẦY ĐỦ MỘT TỆP — để Apps Script phục vụ
#
# Khác bản giới thiệu ở đúng một chỗ: KHÔNG nhúng dữ liệu mẫu và KHÔNG
# ghi đè napKho. Nó giữ nguyên đường xin khoá thật, nên khi Apps Script
# tiêm địa chỉ máy chủ vào thì kho mở đủ theo vai và tầng.
#
# Vỏ ứng dụng đi một tệp, bảy gói .enc đi riêng — vì gộp cả 11 MB kho vào
# một tệp HTML thì trình duyệt phải tải hết mới hiện được chữ đầu tiên,
# kể cả với tài khoản chỉ được cấp một gói.
# ══════════════════════════════════════════════════════════════════
day = html  # bản trước bước 5, dựng lại từ đầu để khỏi lẫn
day = open('index.html', encoding='utf-8').read()
day = day.replace('<link rel="stylesheet" href="assets/style.css">', '<style>\n' + css + '\n</style>')
day = day.replace('<link rel="stylesheet" href="assets/fonts.css">', '<style>\n' + fonts + '\n</style>')
day = day.replace('href="assets/icons/icon-192.png"', 'href="%s"' % b64('assets/icons/icon-192.png'))
for _ten in ('logo-gita.png', 'dau-gita.png'):
    _d = os.path.join('assets', 'brand', _ten)
    if os.path.exists(_d):
        day = day.replace("assets/brand/" + _ten, b64(_d))
day = day.replace('<link rel="manifest" href="manifest.webmanifest">', '')
day = re.sub(r"if \('serviceWorker' in navigator.*?\n\}\n", '', day, flags=re.S)
day = re.sub(r'<script src="([^"]+)"></script>', nhung, day)

out2 = 'GITA365.html'
open(out2, 'w', encoding='utf-8').write(day)
print('%s · %d KB  (vỏ đầy đủ — Apps Script phục vụ, kho đi riêng)'
      % (out2, os.path.getsize(out2) // 1024))
