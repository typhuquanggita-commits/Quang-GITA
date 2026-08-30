#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
BỘ KIỂM ĐỊNH TỰ ĐỘNG — HỆ TÀI LIỆU HỌC VIỆN GITA / LEADER BOOM

Chạy:  python3 tools/kiem_dinh.py            # kiểm toàn bộ, in báo cáo
       python3 tools/kiem_dinh.py --json     # xuất JSON cho CI
       python3 tools/kiem_dinh.py --nhom LK  # chỉ chạy một nhóm kiểm

Mã lỗi trả về: 0 = không có lỗi CHẶN, 1 = có lỗi CHẶN.

Ba mức nghiêm trọng:
  CHẶN     — sai chuẩn an toàn hoặc chuẩn chuyên môn. Không được phát hành.
  CẢNH BÁO — sai tính nhất quán. Phải sửa trước bản phát hành kế tiếp.
  GHI CHÚ  — điểm cần chú ý, không chặn.
"""
import io
import os, re, sys, json, unicodedata
from collections import Counter, defaultdict

GOC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(GOC, 'docs')

CHAN, CANH_BAO, GHI_CHU = 'CHẶN', 'CẢNH BÁO', 'GHI CHÚ'
loi = []


def bao(nhom, muc, tep, thong_diep, chi_tiet=''):
    loi.append({'nhom': nhom, 'muc': muc, 'tep': tep,
                'thong_diep': thong_diep, 'chi_tiet': chi_tiet})


def nap_tep():
    ds = {}
    for r, _, fs in os.walk(DOCS):
        for f in fs:
            if f.endswith('.md'):
                p = os.path.join(r, f)
                ds[os.path.relpath(p, GOC)] = open(p, encoding='utf-8').read()
    return ds


# ══════════════════════════════════════════════════════════════════
# LK · LIÊN KẾT
# ══════════════════════════════════════════════════════════════════
def kiem_lien_ket(ds):
    import urllib.parse
    tong = 0
    duoc_tro_toi = set()
    for tep, s in ds.items():
        thu_muc = os.path.dirname(os.path.join(GOC, tep))
        for m in re.finditer(r'\[[^\]]*\]\(([^)\s]+)\)', s):
            t = m.group(1)
            if t.startswith(('http', '#', 'mailto:')):
                continue
            tong += 1
            duong = urllib.parse.unquote(t.split('#')[0])
            if not duong:
                continue
            dich = os.path.normpath(os.path.join(thu_muc, duong))
            if not os.path.exists(dich):
                bao('LK', CHAN, tep, f'Liên kết gãy → {t}')
            else:
                duoc_tro_toi.add(os.path.relpath(dich, GOC))
    # tài liệu mồ côi — không tài liệu nào trỏ tới
    for tep in ds:
        if tep.endswith('README.md') or tep == 'docs/README.md':
            continue
        if tep not in duoc_tro_toi:
            bao('LK', CANH_BAO, tep, 'Tài liệu mồ côi — không tài liệu nào liên kết tới')
    # liên kết trần (URL thô không có nhãn) — bỏ qua URL nằm trong khối mã
    for tep, s in ds.items():
        khoi_ma = [(mo.start(), mo.end())
                   for mo in re.finditer(r'```.*?```|`[^`\n]+`', s, re.S)]
        for m in re.finditer(r'(?<!\()(?<!\[)https?://\S+', s):
            if any(a <= m.start() < b for a, b in khoi_ma):
                continue
            if '](' not in s[max(0, m.start()-80):m.start()]:
                bao('LK', GHI_CHU, tep, 'Liên kết ngoài dạng thô, nên đặt nhãn', m.group(0)[:60])
                break
    return tong


# ══════════════════════════════════════════════════════════════════
# MA · SỔ ĐĂNG KÝ MÃ
# ══════════════════════════════════════════════════════════════════
SO_MA = {
    'NL': (1, 18, 'năng lực'),
    'BM': (1, 20, 'biểu mẫu'),
    'CC': (1, 14, 'công cụ đánh giá'),
}
NHOM_N = {f'N{i:02d}' for i in range(1, 12)}


def kiem_ma(ds):
    dung = defaultdict(set)
    for tep, s in ds.items():
        for tien_to, (lo, hi, ten) in SO_MA.items():
            for m in re.finditer(rf'\b{tien_to}-(\d{{2}})\b', s):
                so = int(m.group(1))
                dung[tien_to].add(so)
                if not (lo <= so <= hi):
                    bao('MA', CHAN, tep,
                        f'Mã {tien_to}-{m.group(1)} ngoài dải hợp lệ {tien_to}-{lo:02d}…{tien_to}-{hi:02d} ({ten})')
        for m in re.finditer(r'\bN(\d{2})-(\d{2})\b', s):
            nhom = f'N{m.group(1)}'
            so = int(m.group(2))
            if nhom not in NHOM_N:
                bao('MA', CHAN, tep, f'Nhóm vấn đề {nhom} không tồn tại (chỉ có N01–N11)')
            elif not (1 <= so <= 20):
                bao('MA', CHAN, tep, f'Mã phác đồ {m.group(0)} ngoài dải 01–20')
    # mã chưa bao giờ được dùng
    for tien_to, (lo, hi, ten) in SO_MA.items():
        thieu = sorted(set(range(lo, hi + 1)) - dung[tien_to])
        if thieu:
            bao('MA', GHI_CHU, '(toàn hệ)',
                f'Mã {ten} chưa được tham chiếu ở đâu: ' + ', '.join(f'{tien_to}-{x:02d}' for x in thieu))


# ══════════════════════════════════════════════════════════════════
# PD · PHÁC ĐỒ
# ══════════════════════════════════════════════════════════════════
MUC_BAT_BUOC = ['Biểu hiện quan sát được', 'Đo bằng gì', 'Giả thuyết nguyên nhân',
                'Đòn bẩy chính', 'Năng lực liên quan', 'Tiêu chí đạt',
                'Hồ sơ đầu ra', 'Dấu hiệu vượt phạm vi']


def kiem_phac_do(ds):
    tong = 0
    for tep, s in ds.items():
        if '/phac-do/N' not in tep.replace('\\', '/'):
            continue
        nhom = os.path.basename(tep)[:3]
        khoi = re.split(r'\n### ', s)[1:]
        ma_thay = []
        for b in khoi:
            dong = b.split('\n')[0]
            m = re.match(r'(N\d\d-\d\d) · (.+)', dong)
            if not m:
                continue
            ma, ten = m.group(1), m.group(2).strip()
            ma_thay.append(ma)
            tong += 1
            for muc in MUC_BAT_BUOC:
                if muc not in b:
                    bao('PD', CHAN, tep, f'{ma} thiếu mục bắt buộc "{muc}"')
            if not re.search(r'NL-\d\d', b):
                bao('PD', CHAN, tep, f'{ma} không gắn mã năng lực nào')
            if len(b.split()) < 250:
                bao('PD', CANH_BAO, tep, f'{ma} quá ngắn ({len(b.split())} từ) — phác đồ chuẩn 550–750')
        mong_doi = [f'{nhom}-{i:02d}' for i in range(1, 21)]
        thieu = [x for x in mong_doi if x not in ma_thay]
        if thieu:
            bao('PD', CHAN, tep, f'Thiếu {len(thieu)} phác đồ: ' + ', '.join(thieu[:6]))
        trung = [x for x, c in Counter(ma_thay).items() if c > 1]
        if trung:
            bao('PD', CHAN, tep, 'Mã phác đồ trùng: ' + ', '.join(trung))
    if tong != 220:
        bao('PD', CHAN, '(toàn hệ)', f'Tổng phác đồ = {tong}, phải bằng 220')
    return tong


# ══════════════════════════════════════════════════════════════════
# NT · NGUYÊN TẮC CHUYÊN MÔN
# ══════════════════════════════════════════════════════════════════
# "cá biệt hoá" = cá thể hoá, thuật ngữ sư phạm hợp lệ — không phải nhãn dán.
NHAN_DAN = (r'(lười biếng|hư hỏng|dốt nát|\bdốt\b|cá biệt(?!\s*hoá|\s*hóa)'
            r'|vô kỷ luật|chậm chạp|tăng động(?!\s*viên)|thiểu năng)')
HINH_PHAT = r'(phạt chống đẩy|bắt chống đẩy|chạy phạt|phạt tiền|phạt bằng bài tập|chép phạt|bắt quỳ)'
GIA_KHOA_HOC = r'(thần số học|sinh trắc học vân tay|sinh trắc vân tay|\bMBTI\b|\bDISC\b|nhân tướng|chiêm tinh)'

# Ngữ cảnh hợp lệ ở cấp CÂU: câu cấm, ví dụ sai, mô tả vi phạm, bảng đối chiếu.
CAU_CAM = (r'(không\s+\S+|cấm|tuyệt đối|đã gỡ|thay bằng|ví dụ sai|vi phạm|trượt'
           r'|sai lầm|❌|⬜|bỏ toàn bộ|loại bỏ|nghiêm cấm|không bao giờ|tránh'
           r'|thay vì|đừng|đã có sẵn|bị đặt câu hỏi|mô tả biểu hiện)')

# Ngữ cảnh hợp lệ ở cấp MỤC: cả mục nói về điều bị cấm hoặc điều làm sai.
MUC_CAM = (r'(không dùng|không sử dụng|cấm|nhãn dán|sai lầm|vi phạm|điều .{0,12}không'
           r'|bảng kiểm|từ ngữ cấm|giọng nói|đối chiếu|thay vì|tránh|rà soát'
           r'|giới hạn|đe doạ|rủi ro|khủng hoảng|tuyệt đối|ranh giới|chuẩn'
           r'|trượt|hành vi|hình phạt|kỷ luật|an toàn)')


def _tieu_de_muc(s, vi_tri):
    """Trả về tiêu đề mục (## hoặc ###) chứa vị trí này."""
    truoc = s[:vi_tri]
    m = None
    for m in re.finditer(r'^#{2,4} (.+)$', truoc, re.M):
        pass
    return m.group(1) if m else ''


def _trong_ten_rieng_hoac_trich_dan(s, m):
    """Từ khoá nằm trong tên riêng in đậm hoặc trong ngoặc kép trích ví dụ sai."""
    dong_dau = s.rfind('\n', 0, m.start()) + 1
    dong_cuoi = s.find('\n', m.end())
    dong = s[dong_dau:dong_cuoi if dong_cuoi > 0 else len(s)]
    vt = m.start() - dong_dau
    for mo in re.finditer(r'`[^`]+`|\*\*[^*]+\*\*|(?<!\*)\*[^*]+\*(?!\*)'
                          r'|"[^"]{2,80}"|«[^»]+»', dong):
        if mo.start() <= vt < mo.end():
            return True
    return False


def _co_ngu_canh_cam(s, m):
    if _trong_ten_rieng_hoac_trich_dan(s, m):
        return True
    doan = s[max(0, m.start() - 160):m.end() + 90]
    if re.search(CAU_CAM, doan, re.I):
        return True
    return re.search(MUC_CAM, _tieu_de_muc(s, m.start()), re.I) is not None


def kiem_nguyen_tac(ds):
    for tep, s in ds.items():
        if 'kiem_dinh' in tep:
            continue
        for ten, mau, muc in (('nhãn dán', NHAN_DAN, CHAN),
                              ('hình phạt', HINH_PHAT, CHAN),
                              ('công cụ giả khoa học', GIA_KHOA_HOC, CHAN)):
            for m in re.finditer(mau, s, re.I):
                if _co_ngu_canh_cam(s, m):
                    continue
                truoc = re.sub(r'\s+', ' ', s[max(0, m.start() - 55):m.start()])
                sau = re.sub(r'\s+', ' ', s[m.end():m.end() + 55])
                bao('NT', muc, tep, f'Dùng {ten} ngoài ngữ cảnh cấm: «{m.group(0)}»',
                    f'…{truoc}⟦{m.group(0)}⟧{sau}…')


# ══════════════════════════════════════════════════════════════════
# AT · BẤT BIẾN AN TOÀN
# ══════════════════════════════════════════════════════════════════
BAT_BIEN = [
    ('Giấc ngủ tối thiểu', r'ngủ\s*(?:tối thiểu|ít nhất|≥)\s*([\d,\.]+)\s*giờ', {'8,5', '8.5'}),
    ('Số mốc điểm danh', r'điểm danh[^.\n]{0,25}?(\d+)\s*mốc', {'5'}),
    ('Tỉ lệ ACT nhóm chuẩn', r'ACT\s*[:：]\s*học viên\s*[≤<]?\s*1\s*[:：]\s*(\d+)', {'10'}),
    ('Nhịp đúc kết tối thiểu', r'đúc kết[^.\n]{0,20}?[≥>]\s*(\d+)\s*phút', {'15'}),
    ('Review ngày 7', r'[Rr]eview[^.\n]{0,40}?(?:tối thiểu|≥)\s*(\d+)\s*phút', {'30'}),
    ('Đồng hành gia đình', r'(\d+)\s*phút\s*(?:mỗi ngày|/ngày)[^.\n]{0,30}?(?:đồng hành|không nhắc bài)', {'10'}),
]


# Dấu hiệu đoạn văn đang TRÍCH LẠI một giá trị sai để nói rằng nó sai.
VI_DU_SAI = (r'(dương tính giả|ví dụ sai|lỗi thật|bắt được lỗi|phát hiện|đã sửa'
             r'|vi phạm|không được|sai chuẩn|thay bằng|trước đây|❌)')


def _la_trich_dan_loi(s, m):
    """Giá trị sai được trích lại trong ngoặc/in nghiêng/mã, giữa đoạn nói nó sai."""
    if not _trong_ten_rieng_hoac_trich_dan(s, m):
        return False
    doan = s[max(0, m.start() - 220):m.end() + 220]
    return re.search(VI_DU_SAI, doan, re.I) is not None


def kiem_an_toan(ds):
    for ten, mau, hop_le in BAT_BIEN:
        for tep, s in ds.items():
            if 'kiem_dinh' in tep:
                continue
            for m in re.finditer(mau, s, re.I):
                if m.group(1) not in hop_le and not _la_trich_dan_loi(s, m):
                    bao('AT', CHAN, tep,
                        f'{ten}: giá trị {m.group(1)!r}, chuẩn là {"/".join(sorted(hop_le))}',
                        re.sub(r'\s+', ' ', m.group(0))[:90])


# ══════════════════════════════════════════════════════════════════
# HL · HAI LỚP TÓM TẮT ↔ TÁC NGHIỆP
# ══════════════════════════════════════════════════════════════════
CAP_HAI_LOP = [
 ('docs/thu-vien-chuyen-mon-gita/01-thu-vien-220-van-de.md', 'phac-do'),
 ('docs/thu-vien-chuyen-mon-gita/02-khung-nang-luc-18.md', '11-rubric'),
 ('docs/thu-vien-chuyen-mon-gita/03-bo-cong-cu-danh-gia.md', '13-ngan-hang'),
 ('docs/thu-vien-chuyen-mon-gita/04-bo-bieu-mau.md', '12-bieu-mau'),
 ('docs/thu-vien-chuyen-mon-gita/05-thu-vien-hoat-dong.md', '14-the-hoat-dong'),
 ('docs/thu-vien-chuyen-mon-gita/07-dong-hanh-phu-huynh.md', '15-chuong-trinh'),
 ('docs/thu-vien-chuyen-mon-gita/08-nen-tang-so-va-ai.md', '16-nen-tang-so'),
 ('docs/leader-boom-365/05-trai-7-ngay.md', '14-giao-an'),
 ('docs/leader-boom-365/06-tang2-giai-ma-21-ngay.md', '16-tang2'),
 ('docs/leader-boom-365/08-danh-gia-do-luong.md', '17-do-luong'),
 ('docs/he-thong-huan-luyen-gita/03-tuyen-sinh.md', '19-tuyen-sinh'),
 ('docs/he-thong-huan-luyen-gita/04-chuan-bi-D90-D1.md', '20-chuan-bi'),
 ('docs/he-thong-huan-luyen-gita/05-dao-tao-doi-ngu.md', '17-dao-tao'),
 ('docs/he-thong-huan-luyen-gita/07-to-chuc-dieu-hanh.md', '21-van-hanh'),
 ('docs/he-thong-huan-luyen-gita/08-hau-can.md', '21-van-hanh'),
 ('docs/he-thong-huan-luyen-gita/09-y-te-an-toan.md', '18-y-te'),
 ('docs/he-thong-huan-luyen-gita/10-tai-chinh.md', '23-tai-chinh'),
 ('docs/he-thong-huan-luyen-gita/11-di-chuyen.md', '21-van-hanh'),
 ('docs/he-thong-huan-luyen-gita/12-ho-so-sau-trai.md', '22-ho-so-sau-trai'),
 ('docs/he-thong-huan-luyen-gita/14-he-thong-365-ngay.md', '16-365'),
]


def kiem_hai_lop(ds):
    for tom_tat, dau_hieu in CAP_HAI_LOP:
        s = ds.get(tom_tat)
        if s is None:
            bao('HL', CANH_BAO, tom_tat, 'Bản tóm tắt trong danh sách cặp không tồn tại')
            continue
        if dau_hieu not in s:
            bao('HL', CANH_BAO, tom_tat, f'Bản tóm tắt không trỏ sang bản tác nghiệp ({dau_hieu})')
    for tep, s in ds.items():
        if re.search(r'-chi-tiet\.md$|17-bang-tra-cuu|18-nguong-theo', tep):
            if 'BẢN TÁC NGHIỆP' not in s:
                bao('HL', CANH_BAO, tep, 'Bản tác nghiệp thiếu khối nhận dạng và trỏ ngược')


# ══════════════════════════════════════════════════════════════════
# CT · CẤU TRÚC TÀI LIỆU
# ══════════════════════════════════════════════════════════════════
def kiem_cau_truc(ds):
    for tep, s in ds.items():
        dong = s.split('\n')
        h1 = [l for l in dong if l.startswith('# ')]
        if not h1:
            bao('CT', CANH_BAO, tep, 'Không có tiêu đề cấp 1')
        elif len(h1) > 1 and '/phac-do/' not in tep and 'giao-an-chi-tiet' not in tep:
            bao('CT', GHI_CHU, tep, f'Có {len(h1)} tiêu đề cấp 1 — nên chỉ có 1')
        so = [int(m.group(1)) for m in re.finditer(r'^## (\d+)\.', s, re.M)]
        if so and 'giao-an-chi-tiet' not in tep:
            if so != sorted(so):
                bao('CT', CANH_BAO, tep, f'Đánh số mục không tăng dần: {so}')
            trung = [x for x, c in Counter(so).items() if c > 1]
            if trung:
                bao('CT', CANH_BAO, tep, f'Số mục trùng: {trung}')
        # bảng markdown hỏng: hàng tiêu đề không có hàng phân cách
        for i, l in enumerate(dong[:-1]):
            if l.strip().startswith('|') and l.count('|') >= 3:
                ke = dong[i + 1].strip()
                truoc = dong[i - 1].strip() if i else ''
                if not re.match(r'^\|[\s:\-|]+\|$', ke) and not truoc.startswith('|'):
                    bao('CT', CANH_BAO, tep, f'Bảng dòng {i+1} có thể thiếu hàng phân cách',
                        l.strip()[:70])
                    break
        # ký tự thay thế / lỗi mã hoá
        if '\ufffd' in s:
            bao('CT', CHAN, tep, 'Có ký tự lỗi mã hoá U+FFFD')


# ══════════════════════════════════════════════════════════════════
# GV · GIỌNG VIẾT LEADER BOOM
# ══════════════════════════════════════════════════════════════════
CAM_GIONG = [
    (r'\b(tuyệt vời|xuất sắc nhất|hàng đầu Việt Nam|số 1 Việt Nam|đỉnh cao|thần kỳ|kỳ diệu)\b',
     'Ngôn ngữ quảng cáo — hệ này nói bằng cơ chế và số, không bằng tính từ'),
    (r'(thay đổi (?:hoàn toàn |)(?:con bạn|cuộc đời) (?:sau |chỉ sau |trong )\d+ ngày)',
     'Hứa vượt cam kết chuẩn 7/21/90/365'),
    (r'\b(cam kết \d+% (?:thành công|hiệu quả)|đảm bảo kết quả|chắc chắn thành công)\b',
     'Cam kết kết quả — vi phạm nguyên tắc 8'),
    (r'\b(các em thân mến|quý phụ huynh kính mến|kính thưa)\b',
     'Giọng nghi lễ — tài liệu chuyên môn dùng giọng trực tiếp'),
]
EMOJI = re.compile('[\U0001F300-\U0001FAFF\u2600-\u27BF]')
EMOJI_CHO_PHEP = set('✅❌⬜⚠️🔴🔧📘🏠★☐✓✗→↺·')


def kiem_giong_viet(ds):
    for tep, s in ds.items():
        if 'kiem_dinh' in tep:
            continue
        for mau, ly_do in CAM_GIONG:
            for m in re.finditer(mau, s, re.I):
                if _co_ngu_canh_cam(s, m):
                    continue
                bao('GV', CANH_BAO, tep, ly_do, re.sub(r'\s+', ' ', m.group(0))[:70])
        if '/phac-do/' in tep or '-chi-tiet' in tep:
            em = [c for c in EMOJI.findall(s) if c not in EMOJI_CHO_PHEP]
            if em:
                bao('GV', GHI_CHU, tep,
                    f'Có {len(em)} emoji ngoài bộ cho phép trong tài liệu chuyên môn',
                    ' '.join(sorted(set(em))[:8]))
        # câu quá dài — khó đọc trong tài liệu tác nghiệp
        if '-chi-tiet' in tep or '/phac-do/' in tep:
            # chỉ đo văn xuôi: bỏ bảng, khối mã, tiêu đề, đường kẻ ngang
            van_xuoi = '\n'.join(
                l for l in s.split('\n')
                if not l.lstrip().startswith(('|', '#', '---', '```', '> |')))
            dai = [c for c in re.split(r'[.!?]["»\u201d]?[\s*]', van_xuoi)
                   if len(c.split()) > 90 and '|' not in c]
            if len(dai) > 3:
                bao('GV', GHI_CHU, tep, f'{len(dai)} câu dài trên 90 từ — cân nhắc tách')


# ══════════════════════════════════════════════════════════════════
# TL · TRÙNG LẶP
# ══════════════════════════════════════════════════════════════════
def chuan_hoa(t):
    t = unicodedata.normalize('NFC', t).lower()
    t = re.sub(r'[*`_>|#·—–\-]', '', t)
    return re.sub(r'\s+', ' ', t).strip()


def kiem_trung_lap(ds):
    khoi = defaultdict(list)
    for tep, s in ds.items():
        for b in re.split(r'\n\s*\n', s):
            n = chuan_hoa(b)
            if len(n) >= 200:
                khoi[n].append(tep)
    for n, teps in khoi.items():
        u = sorted(set(teps))
        # khối nhận dạng hai lớp là mẫu bắt buộc — nhóm HL đòi nó, không tính trùng
        if re.match(r'(📘|🔧) bản (tóm tắt điều hành|tác nghiệp)', n):
            continue
        if len(u) > 1:
            bao('TL', GHI_CHU, u[0], f'Khối trùng nguyên văn với {len(u)-1} tệp khác',
                f'{n[:70]}… → {", ".join(os.path.basename(x) for x in u[1:3])}')


# ══════════════════════════════════════════════════════════════════
# CHẠY
# ══════════════════════════════════════════════════════════════════
NHOM_TEN = {
    'LK': 'Liên kết', 'MA': 'Sổ đăng ký mã', 'PD': 'Phác đồ',
    'NT': 'Nguyên tắc chuyên môn', 'AT': 'Bất biến an toàn',
    'HL': 'Cấu trúc hai lớp', 'CT': 'Cấu trúc tài liệu',
    'GV': 'Giọng viết Leader Boom', 'TL': 'Trùng lặp',
}


# ══════════════════════════════════════════════════════════════════
# ĐỒNG BỘ SỐ LIỆU — số tài liệu / số từ chỉ được viết ở một nơi: đo được
# ══════════════════════════════════════════════════════════════════
def dong_bo_so_lieu(ds, so_lk, so_pd):
    """Ghi lại số đo thật vào mọi chỉ mục. Số liệu chép tay là số liệu sẽ sai."""
    n = len(ds)
    tu = sum(len(v.split()) for v in ds.values())
    tu_lam_tron = f'{round(tu, -3) // 1000:,}'.replace(',', '.') + '.000'
    da_sua = []
    for tep in sorted(ds):
        duong = os.path.join(GOC, tep)
        s = io.open(duong, encoding='utf-8').read()
        goc = s
        s = re.sub(r'\d+ tài liệu · 9 bộ', f'{n} tài liệu · 9 bộ', s)
        s = re.sub(r'\*\*\d+ tài liệu · 9 bộ · khoảng [\d.]+ từ\.\*\*',
                   f'**{n} tài liệu · 9 bộ · khoảng {tu_lam_tron} từ.**', s)
        s = re.sub(r'\*\*\d+ tài liệu, [^*]{0,20} [\d.]+ từ, hơn \d+ liên kết nội bộ\*\*',
                   f'**{n} tài liệu, hơn {tu_lam_tron} từ, {so_lk} liên kết nội bộ**', s)
        if s != goc:
            io.open(duong, 'w', encoding='utf-8').write(s)
            da_sua.append(tep)
    print(f'  Đã đồng bộ số liệu ({n} tài liệu · {tu:,} từ · {so_lk} liên kết · '
          f'{so_pd} phác đồ) vào {len(da_sua)} tệp:')
    for t in da_sua:
        print(f'    · {t}')
    return 0


def main():
    chi_nhom = None
    if '--nhom' in sys.argv:
        chi_nhom = sys.argv[sys.argv.index('--nhom') + 1].upper()
    ds = nap_tep()
    so_lk = kiem_lien_ket(ds)
    kiem_ma(ds)
    so_pd = kiem_phac_do(ds)
    kiem_nguyen_tac(ds)
    kiem_an_toan(ds)
    kiem_hai_lop(ds)
    kiem_cau_truc(ds)
    kiem_giong_viet(ds)
    kiem_trung_lap(ds)

    if '--dong-bo' in sys.argv:
        return dong_bo_so_lieu(ds, so_lk, so_pd)

    kq = [x for x in loi if not chi_nhom or x['nhom'] == chi_nhom]
    if '--json' in sys.argv:
        print(json.dumps({'loi': kq, 'so_tai_lieu': len(ds),
                          'so_lien_ket': so_lk, 'so_phac_do': so_pd},
                         ensure_ascii=False, indent=1))
        return 1 if any(x['muc'] == CHAN for x in kq) else 0

    tong_tu = sum(len(s.split()) for s in ds.values())
    print('═' * 78)
    print('  BỘ KIỂM ĐỊNH HỆ TÀI LIỆU GITA / LEADER BOOM')
    print('═' * 78)
    print(f'  {len(ds)} tài liệu · {tong_tu:,} từ · {so_lk} liên kết nội bộ · {so_pd} phác đồ\n')

    dem = Counter(x['muc'] for x in kq)
    for ma, ten in NHOM_TEN.items():
        nhom_loi = [x for x in kq if x['nhom'] == ma]
        c = Counter(x['muc'] for x in nhom_loi)
        trang_thai = '✓ ĐẠT' if not nhom_loi else \
            ('✗ CHẶN' if c[CHAN] else '! CẦN SỬA')
        chi = f"{c[CHAN]} chặn · {c[CANH_BAO]} cảnh báo · {c[GHI_CHU]} ghi chú" if nhom_loi else ''
        print(f'  [{ma}] {ten:<26} {trang_thai:<11} {chi}')

    if kq:
        print('\n' + '─' * 78)
        for muc, gioi_han in ((CHAN, 60), (CANH_BAO, 25), (GHI_CHU, 10)):
            ds_muc = [x for x in kq if x['muc'] == muc]
            if not ds_muc:
                continue
            print(f'\n  ▸ {muc} ({len(ds_muc)})')
            for x in ds_muc[:gioi_han]:
                print(f'    {x["nhom"]} · {x["tep"]}')
                print(f'       {x["thong_diep"]}')
                if x['chi_tiet']:
                    print(f'       ⟨{x["chi_tiet"][:110]}⟩')
            if len(ds_muc) > gioi_han:
                print(f'    … và {len(ds_muc)-gioi_han} mục nữa')

    print('\n' + '═' * 78)
    print(f'  KẾT LUẬN: {dem[CHAN]} CHẶN · {dem[CANH_BAO]} CẢNH BÁO · {dem[GHI_CHU]} GHI CHÚ')
    print('  → ' + ('KHÔNG ĐƯỢC PHÁT HÀNH khi còn lỗi CHẶN.' if dem[CHAN]
                    else 'Đạt điều kiện phát hành.'))
    print('═' * 78)
    return 1 if dem[CHAN] else 0


if __name__ == '__main__':
    sys.exit(main())
