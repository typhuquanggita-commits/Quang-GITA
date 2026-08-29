#!/usr/bin/env python3
"""
Soi chính tả tiếng Việt trên TOÀN BỘ văn xuôi của dự án.

Chỉ soi văn xuôi thật — chuỗi ký tự trong mã nguồn, chữ hiện trên giao diện,
lời thoại podcast, và dòng văn trong tài liệu. Không soi tên biến, không soi
mã lệnh, không soi khối mã trong markdown.
"""
import re, glob, json, sys, os

VN = re.compile(
    r'[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]',
    re.I,
)
STR = re.compile(
    r"'((?:[^'\\]|\\.){10,})'|\"((?:[^\"\\]|\\.){10,})\"|`((?:[^`\\$]|\\.){10,})`",
    re.S,
)
# Chữ nằm thẳng trong JSX: >  ...chữ...  <
JSX_TEXT = re.compile(r'>([^<>{}]{10,})<')
COMMENT = re.compile(r'//[^\n]*|/\*.*?\*/', re.S)


def scan_source(patterns, with_jsx=False, with_comments=False):
    for pat in patterns:
        for f in sorted(glob.glob(pat, recursive=True)):
            src = open(f, encoding='utf-8').read()
            for m in STR.finditer(src):
                t = m.group(1) or m.group(2) or m.group(3)
                if VN.search(t):
                    yield f, src[:m.start()].count('\n') + 1, t
            if with_jsx:
                for m in JSX_TEXT.finditer(src):
                    t = m.group(1).strip()
                    if VN.search(t):
                        yield f, src[:m.start()].count('\n') + 1, t
            if with_comments:
                for m in COMMENT.finditer(src):
                    if VN.search(m.group(0)):
                        yield f, src[:m.start()].count('\n') + 1, m.group(0)


def scan_markdown(files):
    for f in files:
        if not os.path.exists(f):
            continue
        fence = False
        for i, line in enumerate(open(f, encoding='utf-8'), 1):
            if line.startswith('```'):
                fence = not fence
                continue
            if fence or line.lstrip().startswith(('|', '#', '    ')):
                continue
            if VN.search(line):
                yield f, i, line.strip()


def prose():
    yield from scan_source(['data/*.ts', 'types.ts'])
    yield from scan_source(
        ['App.tsx', 'components/**/*.tsx'], with_jsx=True, with_comments=True
    )
    yield from scan_source(['desktop/*.cjs', 'tools/*.mjs'], with_comments=True)
    d = json.load(open('content/podcast-scripts.json', encoding='utf-8'))
    for e in d['episodes']:
        for i, l in enumerate(e['lines']):
            if l['l'] == 'vi' and l['t']:
                yield f"podcast:{e['id']}", i + 1, l['t']
    yield from scan_markdown(
        ['README.md', 'BAOMAT.md', 'docs/ENGWIN365.md', 'audio/README.md',
         'brand/README.md']
    )


BAD = {
    'xúc tích': 'súc tích', 'bổ xung': 'bổ sung', 'chia sẽ': 'chia sẻ',
    'sử lý': 'xử lý', 'xử dụng': 'sử dụng', 'cọ sát': 'cọ xát',
    'khoảng khắc': 'khoảnh khắc', 'suông sẻ': 'suôn sẻ',
    'xuất xắc': 'xuất sắc', 'suất sắc': 'xuất sắc', 'vãn còn': 'vẫn còn',
    'nghành': 'ngành', 'qui trình': 'quy trình', 'qui tắc': 'quy tắc',
    'qui luật': 'quy luật', 'trau truốt': 'trau chuốt',
    'sáng lạng': 'xán lạn', 'vô hình chung': 'vô hình trung',
    'đường xá': 'đường sá', 'giành cho': 'dành cho', 'tựu chung': 'tựu trung',
    'chuẩn đoán': 'chẩn đoán', 'điểm xuyến': 'điểm xuyết',
    'thăm quan': 'tham quan', 'yếu điểm': 'điểm yếu', 'chín mùi': 'chín muồi',
    'sát nhập': 'sáp nhập', 'đề xuất ': 'đề xuất ', 'lãng mạng': 'lãng mạn',
    'phong phanh': 'phong thanh', 'trầm trồ': 'trầm trồ',
    'dấu diếm': 'giấu giếm', 'che dấu': 'che giấu', 'giả thiết ':
    'giả thiết ', 'sơ xuất': 'sơ suất', 'thắt chặc': 'thắt chặt',
}
# Bỏ những cặp trùng nhau (không phải lỗi) để tránh báo giả.
BAD = {k: v for k, v in BAD.items() if k.strip() != v.strip()}

issues, n = [], 0
for f, ln, t in prose():
    n += 1
    low = t.lower()
    for bad, good in BAD.items():
        if bad in low:
            issues.append((f, ln, bad, good, t.strip()[:90]))
    # Hai luật trình bày dưới đây chỉ áp cho văn xuôi thật sự một dòng.
    # Chuỗi nhiều dòng thường là mã lệnh hoặc chú thích bọc quanh mã, ở đó
    # khoảng trắng là thụt đầu dòng chứ không phải lỗi.
    if '\n' in t or t.lstrip().startswith(('//', '/*', '*')):
        continue
    if re.search(r'\s+[,.;:!?](?:\s|$)', t) and 'http' not in low:
        issues.append((f, ln, 'khoảng trắng trước dấu câu', '—', t.strip()[:90]))
    if re.search(r'\w  +\w', t):
        issues.append((f, ln, 'hai khoảng trắng liền', '—', t.strip()[:90]))

print(f'── Đã soi {n} đoạn văn xuôi tiếng Việt ──')
if not issues:
    print('  ✓ KHÔNG CÒN LỖI CHÍNH TẢ')
    sys.exit(0)
for f, ln, bad, good, ctx in issues:
    print(f'  ✗ {f}:{ln}  "{bad}" → "{good}"\n      {ctx}')
print(f'\n  {len(issues)} lỗi')
sys.exit(1)
