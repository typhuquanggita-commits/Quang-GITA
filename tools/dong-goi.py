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

# 3. Bỏ phần chỉ dùng cho bản nhiều tệp
html = html.replace('<link rel="manifest" href="manifest.webmanifest">', '')
html = re.sub(r"if \('serviceWorker' in navigator.*?\n\}\n", '', html, flags=re.S)

# 4. Nhúng toàn bộ mã nguồn, đúng thứ tự
def nhung(m):
    p = m.group(1)
    if not os.path.exists(p):
        sys.exit('Thiếu tệp: ' + p)
    return '<script>\n/* ── %s ── */\n%s\n</script>' % (p, open(p, encoding='utf-8').read())
html = re.sub(r'<script src="([^"]+)"></script>', nhung, html)

# 5. Chế độ mẫu: nhúng sẵn gói mẫu, không có kho, không có khoá
mau = open('kho/mau.json', encoding='utf-8').read()
html = html.replace('<script>\nG.boot();',
  '<script>\n/* Bản giới thiệu — chế độ mẫu, không kèm kho tri thức */\n'
  'G.MAU_NHUNG = ' + mau + ';\n'
  'G.napKho = function(){ G.KHO.cheDoMau = true; G.KHO.daNap = [];\n'
  '  G.KICHBAN = G.MAU_NHUNG.KICHBAN || []; G.PHACDO = G.MAU_NHUNG.PHACDO || [];\n'
  '  G.MOTHUC = G.MAU_NHUNG.MOTHUC || []; return Promise.resolve(); };\n'
  'G.boot();')

out = 'GITA365_v71_GIOI_THIEU.html'
open(out, 'w', encoding='utf-8').write(html)
print('%s · %d KB' % (out, os.path.getsize(out) // 1024))
