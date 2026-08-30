#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
KNS365 · BỘ KIỂM ĐỊNH TỰ ĐỘNG KHO TÀI LIỆU
==========================================
Chạy:  python3 KNS365/18-KIEM-DINH-CHAT-LUONG/kiem-dinh.py
       python3 ... --json     (xuất JSON cho CI)

Kiểm 9 nhóm:
  H  Hình thức     bảng markdown, khối mã, khoảng trắng cuối dòng
  L  Liên kết      mọi liên kết nội bộ .md/.html phải tồn tại
  M  Mã hiệu       mọi mã CT- TC- DC-KIT- R- phải nằm trong danh mục đã khai
  C  Cấu trúc cụm  mỗi tệp KHỐI phải đủ 24 cụm, mỗi cụm đủ khối bắt buộc
  T  Thuật ngữ     cấm hệ cũ (6 đai, GITA-4, KM/ĐH/TT/DD) ngoài chỗ ghi chú
  A  An toàn       cụm ⚠️ phải có hotline 111 hoặc dẫn tới phác đồ
  N  Nhất quán     mã cụm trong tệp phải khớp tên tệp; không trùng, không sót
  D  Dẫn đường     mọi tệp phải có lối vào từ README
  P  Phong cách    quy tắc biên tập riêng của KNS365
"""
import re, io, os, sys, glob, json, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # .../KNS365
REL  = lambda p: os.path.relpath(p, os.path.dirname(ROOT))

# ── danh mục mã hợp lệ (nguồn sự thật) ────────────────────────────────────────
HO_RUBRIC = {'TCH','KEH','THQ','ATT','SKH','CAM','SUC','GIA','NOI','NHO',
             'TUD','STA','HOC','SO','TAI','KTA','HNG','LAN','PHS','THS'}
PHA_TRO_CHOI = set('EGITA')
NHOM = {'N1','N2','N3','N4','N5'}

# thuật ngữ đã bị thay — chỉ được xuất hiện kèm ngữ cảnh "không dùng / đã thay"
TU_CAM = {
    r'\b6 đai\b'            : 'hệ 6 đai đã bị thay bằng 10 Cấp Độ · hệ Pin',
    r'\bGITA-4\b'           : 'thang GITA-4 đã bị thay bằng 4 ô chấm B1–B4',
    r'◔ KM'                 : 'nhãn KM/ĐH/TT/DD đã bị thay bằng B1–B4',
    r'\bĐai Trắng\b'        : 'tên đai cũ — dùng "Cấp 1 ⚪ Pin Trắng"',
    r'\bĐai mục tiêu\b'     : 'tên đai cũ — dùng "Cấp Độ mục tiêu"',
}
# Ngữ cảnh miễn trừ — dòng đang NÓI VỀ việc thuật ngữ đó đã bị bỏ, hoặc đang
# trích nó làm ví dụ sai. So khớp không phân biệt hoa thường, bỏ dấu ** markdown.
NGU_CANH_MIEN = ('không dùng','đã bị thay','thay hoàn toàn','thay bằng','bản trước',
                 'đã loại','hệ cũ','nhãn cũ','tên đai cũ','đã thay','bỏ toàn bộ',
                 'thay nhãn','loại bỏ','không phải','cấm','trái giọng','viết sai',
                 'ví dụ sai','bỏ bảng','vs','↔','→','đang có','từng ghi','trước đây',
                 '≠','(thay ','bảng 6 đai','"6 đai"','"gita-4"')

def _san(l):
    """chuẩn hoá dòng để so ngữ cảnh: bỏ ** markdown, hạ chữ thường"""
    return l.replace('*','').replace('`','').lower()

# quy tắc biên tập riêng KNS365
PHONG_CACH = [
    (r'con phải chia sẻ',      'P1', 'dùng "con CHỌN chia sẻ" — không ép trẻ chia sẻ'),
    (r'học sinh yếu\b',        'P2', 'không gọi học sinh là "yếu" — dùng bậc B1/B2'),
    (r'\bhọc sinh kém\b',      'P2', 'không gọi học sinh là "kém"'),
    (r'đảm bảo (?:đỗ|thành công|kết quả)', 'P3', 'không cam kết kết quả tuyệt đối'),
    (r'xếp hạng học sinh(?! công khai)',   'P4', 'kiểm lại: hệ cấm xếp hạng học sinh'),
]

def npipe(l): return len(re.findall(r'(?<!\\)\|', l))

class Loi:
    def __init__(s, ma, tep, dong, mo_ta, muc='LỖI'):
        s.ma, s.tep, s.dong, s.mo_ta, s.muc = ma, tep, dong, mo_ta, muc
    def __repr__(s):
        vt = f'{s.tep}:{s.dong}' if s.dong else s.tep
        return f'[{s.ma}] {vt} — {s.mo_ta}'

loi = []
def bao(ma, tep, dong, mo_ta, muc='LỖI'):
    loi.append(Loi(ma, REL(tep), dong, mo_ta, muc))

# ── nạp toàn bộ tệp ───────────────────────────────────────────────────────────
md   = sorted(glob.glob(os.path.join(ROOT,'**','*.md'),  recursive=True))
html = sorted(glob.glob(os.path.join(ROOT,'**','*.html'),recursive=True))
noi_dung = {f: io.open(f,encoding='utf-8').read() for f in md}

# ══ H · HÌNH THỨC ═════════════════════════════════════════════════════════════
def kiem_hinh_thuc():
    for f, s in noi_dung.items():
        dong = s.split('\n')
        fence = 0; intab = False; cot = 0
        for i, l in enumerate(dong, 1):
            t = l.strip()
            if t.startswith('```'):
                fence ^= 1; intab = False; continue
            if fence: continue
            if t.startswith('|') and t.endswith('|') and npipe(t) >= 2:
                n = npipe(t)
                if not intab: intab, cot = True, n
                elif n != cot:
                    bao('H1', f, i, f'bảng lệch cột: cần {cot} gạch đứng, có {n}')
            else:
                intab = False
        if fence:
            bao('H2', f, None, 'khối mã ``` không đóng')
        if s and not s.endswith('\n'):
            bao('H3', f, None, 'tệp không kết thúc bằng dòng trống', 'NHẮC')

# ══ L · LIÊN KẾT ══════════════════════════════════════════════════════════════
def kiem_lien_ket():
    for f, s in noi_dung.items():
        base = os.path.dirname(f)
        for m in re.finditer(r'\]\(([^)#\s]+\.(?:md|html|py))(?:#[^)]*)?\)', s):
            t = m.group(1)
            if t.startswith(('http://','https://','mailto:')): continue
            dich = os.path.normpath(os.path.join(base, t))
            if not os.path.exists(dich):
                bao('L1', f, s[:m.start()].count('\n')+1, f'liên kết hỏng → {t}')

# ══ M · MÃ HIỆU ═══════════════════════════════════════════════════════════════
def kiem_ma_hieu():
    for f, s in noi_dung.items():
        for m in re.finditer(r'R-([A-Z]{3})-(\d{2})', s):
            if m.group(1) not in HO_RUBRIC:
                bao('M1', f, s[:m.start()].count('\n')+1,
                    f'mã rubric lạ: R-{m.group(1)}-{m.group(2)} — họ "{m.group(1)}" chưa khai trong bộ 19 rubric gốc')
        for m in re.finditer(r'CT-(\d{2})', s):
            if not 1 <= int(m.group(1)) <= 40:
                bao('M2', f, s[:m.start()].count('\n')+1, f'mã công cụ ngoài dải 01–40: CT-{m.group(1)}')
        for m in re.finditer(r'TC-([A-Z])-(\d{3})', s):
            if m.group(1) not in PHA_TRO_CHOI:
                bao('M3', f, s[:m.start()].count('\n')+1, f'pha trò chơi lạ: TC-{m.group(1)}-{m.group(2)}')
        for m in re.finditer(r'DC-KIT-(\d{2})', s):
            if not 1 <= int(m.group(1)) <= 10:
                bao('M4', f, s[:m.start()].count('\n')+1, f'mã kit ngoài dải 01–10: DC-KIT-{m.group(1)}')
        for m in re.finditer(r'K(\d{2})-N(\d)-(\d{2})', s):
            if not 1 <= int(m.group(1)) <= 12:
                bao('M5', f, s[:m.start()].count('\n')+1, f'khối ngoài dải 01–12: {m.group(0)}')
            if f'N{m.group(2)}' not in NHOM:
                bao('M6', f, s[:m.start()].count('\n')+1, f'nhóm kỹ năng lạ: {m.group(0)}')

# ══ C + N · CẤU TRÚC CỤM & NHẤT QUÁN ══════════════════════════════════════════
KHOI_MOI = {}   # tệp KHOI-xx đã chuyển sang hệ mã mới
def kiem_cau_truc_khoi():
    for k in range(1, 13):
        f = os.path.join(ROOT,'01-CHUONG-TRINH-KHUNG',f'KHOI-{k:02d}.md')
        if f not in noi_dung:
            bao('C0', f, None, 'thiếu tệp đặc tả khối'); continue
        s = noi_dung[f]
        cum = re.findall(r'^### `?(K\d{2}-N\d-\d{2})`?', s, re.M)
        cu  = re.findall(r'^### `?(K\d{2}-M\d-\d{2})`?', s, re.M)
        moi = bool(cum) and not cu
        KHOI_MOI[k] = moi
        if not moi:
            bao('C1', f, None,
                f'chưa chuyển sang hệ mã Kxx-Nn-zz (còn {len(cu)} cụm mã cũ)', 'CHỜ')
            continue
        if len(cum) != 24:
            bao('C2', f, None, f'có {len(cum)} cụm, cần đúng 24')
        if len(set(cum)) != len(cum):
            trung = [c for c,n in collections.Counter(cum).items() if n>1]
            bao('C3', f, None, f'mã cụm trùng: {", ".join(trung)}')
        sai = [c for c in cum if not c.startswith(f'K{k:02d}-')]
        if sai:
            bao('C4', f, None, f'mã cụm không khớp khối: {", ".join(sai)}')
        # mỗi cụm phải có đủ khối bắt buộc
        khoi_cum = re.split(r'^### ', s, flags=re.M)[1:]
        for kc in khoi_cum:
            ten = kc.split('\n',1)[0].strip()
            if not re.match(r'`?K\d{2}-N\d-\d{2}`?', ten): continue
            thieu = []
            if '**ĐẠT**' not in kc:            thieu.append('bảng 2 vạch ĐẠT/XUẤT SẮC')
            if 'BUỔI 1' not in kc:             thieu.append('tiến trình BUỔI 1')
            if 'BUỔI 2' not in kc:             thieu.append('tiến trình BUỔI 2')
            if 'Rubric:' not in kc:            thieu.append('mã rubric')
            if 'Bắc cầu' not in kc:            thieu.append('bắc cầu học tập')
            if '90′' not in kc and 'ĐIỂM CẮT' not in kc: thieu.append('điểm cắt 90′')
            if thieu:
                bao('C5', f, None, f'{ten}: thiếu {", ".join(thieu)}')

# ══ T · THUẬT NGỮ ═════════════════════════════════════════════════════════════
def kiem_thuat_ngu():
    for f, s in noi_dung.items():
        dong = s.split('\n')
        for i, l in enumerate(dong, 1):
            for pat, giai in TU_CAM.items():
                if re.search(pat, l):
                    if any(nc in _san(l) for nc in NGU_CANH_MIEN): continue
                    bao('T1', f, i, f'thuật ngữ hệ cũ — {giai}')

# ══ A · AN TOÀN ═══════════════════════════════════════════════════════════════
def kiem_an_toan():
    for k in range(1, 13):
        f = os.path.join(ROOT,'01-CHUONG-TRINH-KHUNG',f'KHOI-{k:02d}.md')
        if f not in noi_dung or not KHOI_MOI.get(k): continue
        s = noi_dung[f]
        for kc in re.split(r'^### ', s, flags=re.M)[1:]:
            ten = kc.split('\n',1)[0].strip()
            if '⚠️' not in ten: continue
            ma = re.match(r'`?(K\d{2}-N\d-\d{2})`?', ten)
            ma = ma.group(1) if ma else ten[:20]
            co_hotline = '111' in kc
            co_phac_do = 'PHAC-DO' in kc or 'phác đồ' in kc
            if not (co_hotline or co_phac_do):
                bao('A1', f, None,
                    f'{ma}: cụm đánh dấu ⚠️ nhưng không nhắc hotline 111 và không dẫn tới phác đồ')

# ══ D · DẪN ĐƯỜNG ═════════════════════════════════════════════════════════════
def kiem_dan_duong():
    rd = os.path.join(ROOT,'README.md')
    if rd not in noi_dung:
        bao('D0', rd, None, 'thiếu README'); return
    s = noi_dung[rd]
    dan = {os.path.normpath(m) for m in re.findall(r'\]\(([^)#\s]+\.(?:md|html))\)', s)}
    tat_ca = {os.path.relpath(p, ROOT) for p in md + html}
    tat_ca.discard('README.md')
    for t in sorted(tat_ca - dan):
        bao('D1', os.path.join(ROOT,t), None, 'tệp không có lối vào từ README', 'NHẮC')

# ══ P · PHONG CÁCH ════════════════════════════════════════════════════════════
def kiem_phong_cach():
    for f, s in noi_dung.items():
        for i, l in enumerate(s.split('\n'), 1):
            for pat, ma, giai in PHONG_CACH:
                if re.search(pat, l, re.I):
                    if any(nc in _san(l) for nc in
                           ('cấm','không được','không nói','tránh','thay bằng','⛔',
                            'không gọi','không phải','không xếp hạng','không trung thực',
                            'viết sai','ví dụ sai','chốt chặn','trái giọng')):
                        continue
                    bao(ma, f, i, giai, 'NHẮC')

# ── chạy ──────────────────────────────────────────────────────────────────────
def main():
    kiem_hinh_thuc(); kiem_lien_ket(); kiem_ma_hieu()
    kiem_cau_truc_khoi(); kiem_thuat_ngu(); kiem_an_toan()
    kiem_dan_duong(); kiem_phong_cach()

    if '--json' in sys.argv:
        print(json.dumps([vars(x) for x in loi], ensure_ascii=False, indent=1)); return

    nhom = collections.OrderedDict([
        ('H','Hình thức'),('L','Liên kết'),('M','Mã hiệu'),('C','Cấu trúc cụm'),
        ('T','Thuật ngữ'),('A','An toàn'),('D','Dẫn đường'),('P','Phong cách')])
    dem = collections.Counter(x.ma[0] for x in loi)
    muc = collections.Counter(x.muc for x in loi)

    print('═'*74)
    print(f'  KNS365 · KIỂM ĐỊNH KHO TÀI LIỆU — {len(md)} tệp md · {len(html)} tệp html')
    print('═'*74)
    for k, ten in nhom.items():
        n = dem.get(k,0)
        print(f'  {k}  {ten:16} {"✅ sạch" if n==0 else f"⚠️  {n} mục"}')
    print('─'*74)
    print(f'  LỖI {muc.get("LỖI",0)}   ·   CHỜ XỬ LÝ {muc.get("CHỜ",0)}   ·   NHẮC {muc.get("NHẮC",0)}')
    print('═'*74)
    for m in ('LỖI','CHỜ','NHẮC'):
        ds = [x for x in loi if x.muc == m]
        if not ds: continue
        print(f'\n▼ {m} ({len(ds)})')
        for x in ds[:60]: print('   ', x)
        if len(ds) > 60: print(f'    … và {len(ds)-60} mục nữa')
    sys.exit(1 if muc.get('LỖI',0) else 0)

if __name__ == '__main__':
    main()
