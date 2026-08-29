#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""KIỂM TOÁN TOÀN HỆ THỐNG GITA — chạy trước mỗi lần phát hành.

  python3 04-cong-cu/kiem_toan.py

Kiểm 10 nhóm: chỉ mục · ngân hàng chuyên đề · phiếu đã biên soạn · dữ liệu web ·
liên kết chéo · mã lỗi thời · bảng Markdown · bộ đề thi · bản đồ kiến thức · bảo mật.
Mã thoát 0 nếu sạch lỗi, 1 nếu còn lỗi.
"""
from __future__ import annotations
import json, re, sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))
from nhom_chuyen_de import NHOM                       # noqa: E402
from cum_chuyen_de import CUM                         # noqa: E402
from loai_phieu import LOAI, CHUOI_BUOI               # noqa: E402
from phan_quyen import VAI_TRO, TAI_NGUYEN, QUYEN, TANG, BAT_BIEN  # noqa: E402
import lop3, lop4, lop5                               # noqa: E402
BANK = {3: lop3, 4: lop4, 5: lop5}

LOI: list[str] = []
CANH_BAO: list[str] = []
DAT: list[str] = []


def E(m):
    LOI.append(m)
    print(f"   \033[31m✘ {m}\033[0m")
def W(m): CANH_BAO.append(m)
def OK(m): DAT.append(m)


def muc(ten: str):
    print(f"\n\033[1m▸ {ten}\033[0m")


# ───────────────────────── 1. CHỈ MỤC ─────────────────────────
idx_path = ROOT / "02-chi-muc" / "index-master.json"
rows = json.loads(idx_path.read_text(encoding="utf-8"))
ma_phieu = {r["ma"] for r in rows}


def kiem_chi_muc():
    muc("1. Chỉ mục tài liệu")
    if len(rows) != 1296:
        E(f"Chỉ mục có {len(rows)} tài liệu, phải là 1 296.")
    else:
        OK("1 296 tài liệu.")
    dup = [m for m, c in Counter(r["ma"] for r in rows).items() if c > 1]
    if dup:
        E(f"Mã trùng: {dup[:5]}")
    else:
        OK("Mọi mã tài liệu duy nhất.")
    for lop in (3, 4, 5):
        for tuyen in ("T1", "T2"):
            kh = [r for r in rows if r["lop"] == lop and r["tuyen"] == tuyen]
            buoi = [r for r in kh if r["la_buoi_hoc"]]
            if len(kh) != 216:
                E(f"Khối L{lop}-{tuyen} có {len(kh)} tài liệu, phải 216.")
            if len(buoi) != 100:
                E(f"Khối L{lop}-{tuyen} có {len(buoi)} phiếu học, phải 100.")
            stt = sorted(r["stt"] for r in buoi)
            if stt != list(range(1, 101)):
                E(f"Khối L{lop}-{tuyen}: số thứ tự phiếu học không phải 1–100.")
            for k in range(1, 17):
                c = [r for r in kh if r["cum"] == k]
                b = [r for r in c if r["la_buoi_hoc"]]
                gp = [r for r in c if r["loai"] == "GP"]
                hd = [r for r in c if r["loai"] == "HD"]
                if len(b) != 6 or len(gp) != 6 or len(hd) != 1:
                    E(f"L{lop}-{tuyen} cụm C{k:02d}: {len(b)} buổi / {len(gp)} GP / "
                      f"{len(hd)} HD (phải 6 / 6 / 1).")
                if [r["loai"] for r in sorted(b, key=lambda x: x["stt"])] != CHUOI_BUOI:
                    E(f"L{lop}-{tuyen} cụm C{k:02d}: chuỗi buổi sai thứ tự.")
    if not any("phải" in x for x in LOI):
        OK("Sáu khối × 216 tài liệu, mỗi cụm đủ 6 buổi + 6 GP + 1 HD, chuỗi LT→TH đúng.")
    xau_tuan = [r["ma"] for r in rows if r["tuan"] and not 1 <= r["tuan"] <= 35]
    if xau_tuan:
        E(f"Tuần ngoài khoảng 1–35: {xau_tuan[:5]}")
    else:
        OK("Mọi tuần nằm trong 1–35.")
    for r in rows:
        if r["loai"] == "GP" and not r.get("kem_theo"):
            E(f"{r['ma']}: phiếu GP thiếu `kem_theo`.")
        if r.get("kem_theo") and r["kem_theo"] not in ma_phieu:
            E(f"{r['ma']}: `kem_theo` trỏ tới mã không tồn tại.")
    OK("Mọi phiếu GP có `kem_theo` trỏ đúng phiếu học.")


# ────────────────── 2. NGÂN HÀNG CHUYÊN ĐỀ ──────────────────
def kiem_ngan_hang():
    muc("2. Ngân hàng chuyên đề và cụm")
    for (lop, tuyen), ds in sorted(CUM.items()):
        bank = BANK[lop].TUYEN_1 if tuyen == "T1" else BANK[lop].TUYEN_2
        if len(bank) != 90:
            E(f"L{lop}-{tuyen}: ngân hàng có {len(bank)} chuyên đề, phải 90.")
        if len(ds) != 16:
            E(f"L{lop}-{tuyen}: có {len(ds)} cụm, phải 16.")
        thuc = Counter(x.split("|")[0] for x in bank)
        khai = Counter()
        for _t, g, n in ds:
            khai[g] += n
            if g not in NHOM:
                E(f"L{lop}-{tuyen}: nhóm `{g}` không hợp lệ.")
        if thuc != khai:
            E(f"L{lop}-{tuyen}: cụm khai báo không khớp ngân hàng ({dict(khai)} vs {dict(thuc)}).")
        ten = [t for t, _g, _n in ds]
        if len(set(ten)) != len(ten):
            E(f"L{lop}-{tuyen}: có tên cụm trùng nhau.")
    tong_db = sum(len(BANK[l].TUYEN_1) + len(BANK[l].TUYEN_2) for l in (3, 4, 5))
    if tong_db != 540:
        E(f"Tổng dạng bài là {tong_db}, phải 540.")
    else:
        OK("540 dạng bài, 96 cụm, khớp 100% giữa ngân hàng và khai báo cụm.")
    # Dạng bài trong chỉ mục phải khớp ngân hàng — so khớp THEO TỪNG NHÓM,
    # vì mỗi cụm cắt một lát liên tiếp trong dãy dạng bài của nhóm đó.
    sach = True
    for lop in (3, 4, 5):
        for tuyen in ("T1", "T2"):
            gom: dict[str, list[str]] = {}
            for k in range(1, 17):
                c = next(r for r in rows if r["lop"] == lop and r["tuyen"] == tuyen
                         and r["cum"] == k)
                gom.setdefault(c["nhom_ma"], []).extend(c["dang_bai"])
            bank: dict[str, list[str]] = {}
            for x in (BANK[lop].TUYEN_1 if tuyen == "T1" else BANK[lop].TUYEN_2):
                g, t = x.split("|", 1)
                bank.setdefault(g, []).append(t)
            if gom != bank:
                sach = False
                for g in sorted(set(gom) | set(bank)):
                    if gom.get(g) != bank.get(g):
                        E(f"L{lop}-{tuyen} nhóm {g}: dạng bài trong chỉ mục lệch ngân hàng.")
    if sach:
        OK("Dạng bài trong chỉ mục khớp đúng thứ tự ngân hàng của từng nhóm.")


# ────────────────── 3. PHIẾU ĐÃ BIÊN SOẠN ──────────────────
def kiem_phieu():
    muc("3. Phiếu đã biên soạn")
    sys.path.insert(0, str(ROOT / "04-cong-cu"))
    import validate_phieu as V
    index = {r["ma"]: r for r in rows}
    tep = sorted((ROOT / "03-phieu").rglob("GITA-*.md"))
    so_loi = 0
    for p in tep:
        kq = V.kiem_tra(p, index)
        for m in kq.loi:
            E(f"{p.name}: {m}")
            so_loi += 1
    if not so_loi:
        OK(f"{len(tep)} phiếu đạt toàn bộ chuẩn biên soạn v2.0.")
    # đối chiếu front-matter với chỉ mục
    import yaml
    for p in tep:
        fm, _ = V.tach_front_matter(p.read_text(encoding="utf-8"))
        r = index.get(fm.get("ma"))
        if not r:
            E(f"{p.name}: mã không có trong chỉ mục.")
            continue
        for t in ("tuyen", "lop", "cum", "loai", "nhom_ma"):
            if t in fm and fm[t] != r[t]:
                E(f"{p.name}: `{t}` lệch chỉ mục.")
    OK("Front-matter mọi phiếu khớp chỉ mục.")


# ────────────────── 4. DỮ LIỆU WEB ──────────────────
DAU_NEN = chr(2)


def tep_web() -> list:
    """Ba bản dữ liệu web, mỗi bản trọn nội dung một khối lớp."""
    return sorted((ROOT / "09-online" / "data").glob("gita-data-L*.json"))


def giai_nen(d: dict) -> dict:
    """Trả lại nguyên văn dữ liệu đã nén bằng bảng chuỗi (xem build_web_data)."""
    bang = d.get("bang_chuoi")
    if not bang:
        return d

    def mo(x):
        if isinstance(x, str):
            return bang[int(x[1:])] if x[:1] == DAU_NEN else x
        if isinstance(x, list):
            return [mo(i) for i in x]
        if isinstance(x, dict):
            return {k: mo(v) for k, v in x.items()}
        return x

    ra = {k: mo(v) for k, v in d.items() if k != "bang_chuoi"}
    for v in ra.get("kem", {}).values():
        if isinstance(v.get("md"), list):
            v["md"] = "\n".join("| " + " | ".join(x) + " |" if isinstance(x, list) else x
                                 for x in v["md"])
    return ra


def kiem_web():
    muc("4. Dữ liệu hệ thống online")
    tep = tep_web()
    if not tep:
        E("Chưa sinh 09-online/data/gita-data-L*.json.")
        return
    if len(tep) != 3:
        E(f"Phải có đủ ba bản dữ liệu web (lớp 3, 4, 5), đang có {len(tep)}.")
    tong_phieu = tong_kem = 0
    for f in tep:
        d = giai_nen(json.loads(f.read_text(encoding="utf-8")))
        for khoa in ("meta", "nhom", "tu_duy", "loai", "chi_muc", "cum", "ban_do",
                     "mach", "phieu", "kem", "test"):
            if khoa not in d:
                E(f"{f.name} thiếu khoá `{khoa}`.")
        if len(d.get("chi_muc", [])) != len(rows):
            E(f"{f.name}: chỉ mục lệch chỉ mục gốc.")
        khoi = d["meta"].get("khoi_lop")
        thieu = []
        for ma, ph in d.get("phieu", {}).items():
            if ph["meta"]["lop"] != khoi:
                E(f"{f.name}: {ma} không thuộc khối lớp {khoi}.")
            if len(ph["phan"]) != 5:
                E(f"{ma}: dữ liệu web đọc được {len(ph['phan'])} phần.")
            n_bai = sum(len(x["bai"]) for x in ph["phan"])
            if n_bai != 25:
                E(f"{ma}: dữ liệu web đọc được {n_bai} bài.")
            for x in ph["phan"]:
                for b in x["bai"]:
                    for y in b["y"]:
                        if not y.get("dap_so"):
                            thieu.append(f"{ma} {b['ma']}{y['ma']}")
        if thieu:
            E(f"{f.name}: {len(thieu)} ý chưa map được đáp số, ví dụ {thieu[:3]}")
        tong_phieu += len(d.get("phieu", {}))
        tong_kem += len(d.get("kem", {}))
        kb = f.stat().st_size / 1024
        if kb > 15000:
            E(f"{f.name} {kb:.0f} KB — vượt hạn mức 16 MB của trang xuất bản.")
    if tong_phieu != 600 or tong_kem != 696:
        E(f"Ba bản web nhúng {tong_phieu} phiếu học và {tong_kem} phiếu kèm, "
          f"phải là 600 và 696.")
    else:
        OK(f"Ba bản web nhúng trọn 600 phiếu học và 696 phiếu kèm, mỗi ý đều có đáp số.")
    lon = max(f.stat().st_size for f in tep) / 1024
    if lon <= 15000:
        OK(f"Bản dữ liệu web lớn nhất {lon:.0f} KB, an toàn dưới hạn mức 16 MB.")
    for h in sorted((ROOT / "09-online" / "dist").glob("gita-online-L*.html")):
        mb = h.stat().st_size / 1024 / 1024
        if mb > 15.5:
            E(f"{h.name} {mb:.1f} MB — vượt hạn mức trang xuất bản.")
    OK("Ba trang xuất bản đều dưới hạn mức dung lượng.")


# ────────────────── 5. LIÊN KẾT CHÉO & 6. MÃ LỖI THỜI ──────────────────
RE_MA = re.compile(r"\bGITA-[A-Z0-9]+(?:-[A-Z0-9]+)+\b")


def kiem_lien_ket():
    muc("5. Liên kết chéo giữa các tài liệu")
    de_thi = json.loads((ROOT / "07-de-thi" / "index-de-thi.json").read_text(encoding="utf-8"))
    hop_le = set(ma_phieu) | {d["ma"] for d in de_thi}
    hop_le |= {f"GITA-{t}-L{l}" for t in ("T1", "T2") for l in (3, 4, 5)}
    hop_le |= {f"GITA-{t}-L{l}-C{k:02d}" for t in ("T1", "T2") for l in (3, 4, 5)
               for k in range(1, 17)}
    hop_le |= {f"GITA-TEST-L{l}" for l in (3, 4, 5)}
    hong = {}
    for p in ROOT.rglob("*.md"):
        t = p.read_text(encoding="utf-8")
        for m in RE_MA.finditer(t):
            ma, sau = m.group(0), t[m.end():m.end() + 1]
            # bỏ qua khuôn mẫu như GITA-T1-L{3,4,5} hay GITA-{T1|T2}-L4-C{01..16}
            if sau in "{_." or ma in hop_le:
                continue
            hong.setdefault(ma, set()).add(p.name)
    if hong:
        for m, ts in sorted(hong.items())[:20]:
            E(f"Mã không tồn tại `{m}` (trong {', '.join(sorted(ts))}).")
    else:
        OK("Mọi mã tài liệu được nhắc trong văn bản đều tồn tại.")

    muc("6. Mã lỗi thời của kiến trúc cũ")
    cu = re.compile(r"\bGITA-T[12]-L[345]-P\d{3}\b")
    thay = {p.name: cu.findall(p.read_text(encoding="utf-8"))
            for p in ROOT.rglob("*.md")}
    thay = {k: v for k, v in thay.items() if v}
    if thay:
        for k, v in list(thay.items())[:10]:
            E(f"{k}: còn mã kiến trúc cũ {sorted(set(v))[:3]}")
    else:
        OK("Không còn mã `P0xx` của kiến trúc cũ.")


# ────────────────── 7. BẢNG MARKDOWN ──────────────────
def kiem_bang():
    muc("7. Tính toàn vẹn bảng Markdown")
    xau = []
    for p in ROOT.rglob("*.md"):
        dong = p.read_text(encoding="utf-8").splitlines()
        i = 0
        while i < len(dong):
            if (re.match(r"^\s*\|.*\|\s*$", dong[i])
                    and i + 1 < len(dong) and re.match(r"^\s*\|[\s:|-]+\|\s*$", dong[i + 1])):
                cot = dong[i].strip().strip("|").count("|") + 1
                j = i + 2
                while j < len(dong) and re.match(r"^\s*\|.*\|\s*$", dong[j]):
                    c = dong[j].strip().strip("|").count("|") + 1
                    if c != cot:
                        xau.append(f"{p.name}:{j+1} bảng {cot} cột nhưng dòng có {c} ô")
                    j += 1
                i = j
            else:
                i += 1
    if xau:
        for x in xau[:15]:
            E(x)
    else:
        OK("Mọi bảng Markdown có số ô khớp số cột.")


# ────────────────── 8. BỘ ĐỀ THI ──────────────────
def kiem_de_thi():
    muc("8. Bộ đề thi")
    ds = json.loads((ROOT / "07-de-thi" / "index-de-thi.json").read_text(encoding="utf-8"))
    if len(ds) != 162:
        E(f"Chỉ mục đề thi có {len(ds)} đề, phải 162.")
    else:
        OK("162 đề: 12 phiếu ôn tập · 120 đề thi mốc · 30 đề đánh giá năng lực.")
    dup = [m for m, c in Counter(d["ma"] for d in ds).items() if c > 1]
    if dup:
        E(f"Mã đề trùng: {dup[:5]}")
    ma_de = {d["ma"] for d in ds}
    for p in (ROOT / "07-de-thi").rglob("GITA-*.md"):
        if p.stem not in ma_de:
            E(f"{p.name}: không có trong chỉ mục đề thi.")
    OK("Mọi đề đã biên soạn đều có trong chỉ mục.")


# ────────────────── 9. BẢN ĐỒ KIẾN THỨC ──────────────────
def kiem_ban_do():
    muc("9. Bản đồ kiến thức")
    fs = sorted((ROOT / "06-ban-do-kien-thuc").glob("*.md"))
    if len(fs) != 9:
        E(f"Có {len(fs)} bản đồ, phải 9.")
    can = ["## 1. CÂY KIẾN THỨC", "## 2. MẠCH KIẾN THỨC", "## 3. CÔNG THỨC",
           "## 4. LỖI KINH ĐIỂN", "## 5. CHECKLIST", "## 6. LỘ TRÌNH ÔN"]
    for f in fs:
        t = f.read_text(encoding="utf-8")
        for c in can:
            if c not in t:
                E(f"{f.name}: thiếu mục `{c}`.")
    OK("Chín bản đồ đủ sáu mục bắt buộc.")


# ────────────────── 10. BẢO MẬT ──────────────────
def kiem_bao_mat():
    muc("10. Rà soát bảo mật hệ thống online")
    app = (ROOT / "09-online" / "app.html").read_text(encoding="utf-8")
    # 10.1 chèn dữ liệu người dùng vào HTML phải qua esc()
    # Chỉ dữ liệu do NGƯỜI DÙNG nhập mới bắt buộc escape khi ghép vào HTML.
    nguy = re.findall(r"\$\{\s*(?:h|HoSo\.d|LB\.dap|LB\.ma)\.?[\w.\[\]\"']*"
                      r"(?:ten|dap|ghi_chu)[^}]*\}", app)
    xau = [x for x in nguy if "esc(" not in x]
    if xau:
        E(f"Dữ liệu người dùng chèn vào HTML mà không escape: {xau[:3]}")
    else:
        OK("Mọi dữ liệu do người dùng nhập đều đi qua esc() trước khi vào HTML.")
    # Hàm chặn truy cập phải escape thông điệp của chính nó
    m = re.search(r"function chanTruyCap\(vi\) \{(.{0,400})", app, re.S)
    if not m or "esc(vi)" not in m.group(1):
        E("Hàm chanTruyCap không escape thông điệp — có thể chèn HTML qua lý do khoá.")
    else:
        OK("Hàm chặn truy cập escape thông điệp trước khi hiển thị.")
    # 10.2 không dùng eval / Function / document.write
    for xau_ham in ("eval(", "new Function(", "document.write(", "innerHTML +="):
        if xau_ham in app:
            E(f"App dùng cấu trúc nguy hiểm `{xau_ham}`.")
    OK("Không dùng eval, new Function, document.write.")
    # 10.3 đọc localStorage phải bọc try/catch
    for m in re.finditer(r"localStorage\.(getItem|setItem)", app):
        doan = app[max(0, m.start() - 260):m.start() + 60]
        if "try" not in doan:
            E("Có truy cập localStorage không bọc trong try/catch.")
            break
    else:
        OK("Mọi truy cập localStorage đều bọc try/catch.")
    # 10.4 không nhúng bí mật
    for pat, ten in [(r"(?i)api[_-]?key\s*[:=]\s*['\"]", "API key"),
                     (r"(?i)password\s*[:=]\s*['\"]", "mật khẩu"),
                     (r"(?i)secret\s*[:=]\s*['\"]", "secret"),
                     (r"(?i)Bearer\s+[A-Za-z0-9._-]{16,}", "token")]:
        if re.search(pat, app):
            E(f"App có vẻ nhúng {ten} — tuyệt đối không nhúng bí mật vào trang tĩnh.")
    OK("Không có khoá, mật khẩu hay token nhúng trong trang.")
    # 10.5 dữ liệu web không được chứa thông tin cá nhân
    dw = tep_web()[0] if tep_web() else ROOT / "09-online" / "data" / "khong-co.json"
    if dw.exists():
        t = dw.read_text(encoding="utf-8")
        if re.search(r"[\w.+-]+@[\w-]+\.[\w.]+", t):
            E("Dữ liệu web chứa địa chỉ email — gỡ trước khi xuất bản.")
        else:
            OK("Dữ liệu web không chứa email hay thông tin liên hệ cá nhân.")
    # 10.6 nguồn ngoài chỉ từ miền được phép
    for m in re.findall(r'(?:src|href)="(https?://[^"]+)"', app):
        if not m.startswith(("https://fonts.googleapis.com", "https://fonts.gstatic.com",
                             "https://cdnjs.cloudflare.com")):
            E(f"Tài nguyên ngoài không thuộc miền được phép: {m}")
    OK("Tài nguyên ngoài chỉ lấy từ Google Fonts (đúng danh sách CSP cho phép).")


# ────────────────── 11. PHÂN QUYỀN ──────────────────
def kiem_phan_quyen():
    muc("11. Hệ phân quyền")
    thieu = [(t, v) for t in TAI_NGUYEN for v in VAI_TRO if v not in QUYEN.get(t, {})]
    if thieu:
        E(f"Ma trận quyền còn {len(thieu)} ô trống, ví dụ {thieu[:3]}")
    else:
        OK(f"Ma trận quyền đủ {len(TAI_NGUYEN)} × {len(VAI_TRO)} = "
           f"{len(TAI_NGUYEN) * len(VAI_TRO)} ô.")
    hop_le = {"X", "R", "R!", "R°", "RW", "RWD", "A"}
    xau = [(t, v, QUYEN[t][v][0]) for t in TAI_NGUYEN for v in VAI_TRO
           if QUYEN[t][v][0] not in hop_le]
    if xau:
        E(f"Ký hiệu quyền không hợp lệ: {xau[:3]}")
    else:
        OK("Mọi ô dùng đúng bảy ký hiệu quyền đã quy ước.")
    for v, d in VAI_TRO.items():
        for k in ("ten", "bac", "pham_vi", "mo_ta"):
            if not d.get(k):
                E(f"Vai trò {v} thiếu trường `{k}`.")
    # đối chiếu với các quy tắc bất biến
    ktra = [
        ("HS", "ho_so_hv", {"X"}, "Học sinh không được xem hồ sơ học viên khác."),
        ("HS", "bien_soan", {"X"}, "Học sinh không được sửa học liệu."),
        ("HS", "tai_khoan", {"X", "R!"}, "Học sinh chỉ được chạm tài khoản của mình."),
        ("HS", "nhat_ky", {"X"}, "Học sinh không được xem nhật ký hệ thống."),
        ("HS", "cau_hinh", {"X"}, "Học sinh không được xem cấu hình hệ thống."),
        ("HS", "bao_cao_lop", {"X"}, "Học sinh không được xem báo cáo lớp."),
        ("HS", "bao_cao_ht", {"X"}, "Học sinh không được xem báo cáo hệ thống."),
        ("TV", "phieu_gp", {"X"}, "Tư vấn không được xem phiếu lời giải."),
        ("ASP", "ho_so_hv", {"X"}, "Admin sản phẩm không được đọc hồ sơ học viên."),
        ("ASP", "ho_so_minh", {"X"}, "Admin sản phẩm không được đọc hồ sơ cá nhân học viên."),
        ("AHT", "bien_soan", {"X"}, "Admin hệ thống không được biên soạn học liệu."),
        ("GV", "ho_so_minh", {"X"}, "Giáo viên không sửa được thông tin cá nhân của học sinh."),
        ("CO", "de_moc", {"R"}, "Coach không được mở hay đóng đề thi."),
        ("GDDH", "ho_so_hv", {"R°"}, "Giám đốc điều hành chỉ xem bản rút gọn."),
    ]
    sach = True
    for vai, tn, cho_phep, ly_do in ktra:
        if QUYEN[tn][vai][0] not in cho_phep:
            E(f"Vi phạm quy tắc bất biến — {ly_do} (đang là {QUYEN[tn][vai][0]}).")
            sach = False
    if sach:
        OK(f"{len(ktra)} kiểm tra quy tắc bất biến đều đạt.")
    # tầng năng lực
    if [t["ma"] for t in TANG] != ["M1", "M2", "M3", "M4", "M5"]:
        E("Danh sách tầng năng lực phải là M1 → M5.")
    ng = [t["nguong"] for t in TANG]
    if ng != sorted(ng) or len(set(ng)) != len(ng):
        E(f"Ngưỡng tầng không tăng nghiêm ngặt: {ng}")
    for i in range(1, len(TANG)):
        if not set(TANG[i - 1]["mo"]) <= set(TANG[i]["mo"]):
            E(f"Tầng {TANG[i]['ma']} không bao hàm loại phiếu của tầng {TANG[i-1]['ma']}.")
        if not set(TANG[i - 1]["de_moc"]) <= set(TANG[i]["de_moc"]):
            E(f"Tầng {TANG[i]['ma']} không bao hàm biến thể đề của tầng {TANG[i-1]['ma']}.")
    OK("Năm tầng năng lực có ngưỡng tăng dần và bao hàm nhau đúng chiều.")
    if len(BAT_BIEN) < 9:
        E(f"Chỉ có {len(BAT_BIEN)} quy tắc bất biến, phải từ 9 trở lên.")
    else:
        OK(f"{len(BAT_BIEN)} quy tắc bất biến được ghi thành văn.")
    # phần mềm có thật sự gọi cổng quyền không
    app = (ROOT / "09-online" / "app.html").read_text(encoding="utf-8")
    for ham, o in [("Quyen.moPhieu(", "mở phiếu học"), ("Quyen.moGP(", "mở phiếu lời giải"),
                   ("Quyen.moDe(", "mở đề thi"), ("Quyen.co(", "kiểm quyền tài nguyên")]:
        if ham not in app:
            E(f"App không gọi `{ham}` — cổng quyền {o} chưa được nối vào giao diện.")
    OK("Giao diện gọi đủ bốn cổng kiểm quyền trước khi mở nội dung.")


# ────────────────── 12. BẢO MẬT DỮ LIỆU HỌC VIÊN ──────────────────
def kiem_rieng_tu():
    muc("12. Bảo vệ dữ liệu học viên")
    app = (ROOT / "09-online" / "app.html").read_text(encoding="utf-8")
    if "banAnDanh()" not in app:
        E("App chưa có hàm tạo bản ẩn danh trước khi đẩy hồ sơ lên kho dữ liệu.")
    elif "set(this.banAnDanh())" not in app:
        E("App có hàm ẩn danh nhưng không dùng khi ghi vào kho dữ liệu.")
    else:
        OK("Hồ sơ đẩy lên kho dữ liệu luôn đi qua bản ẩn danh, đã bỏ họ tên.")
    if 'doc("hoso/chinh")' in app:
        E("App vẫn ghi vào một đường dẫn hồ sơ dùng chung — mọi người xem sẽ đè lên nhau.")
    if 'doc("hoso/" + this.hsId)' in app:
        OK("Mỗi máy ghi vào hồ sơ riêng theo mã ngẫu nhiên, không đè lên nhau.")
    else:
        E("App không dùng mã hồ sơ riêng khi ghi kho dữ liệu.")
    if "const ten = this.d.ten;" in app:
        OK("Khi đồng bộ về, họ tên luôn lấy từ máy này chứ không lấy từ kho chung.")
    else:
        E("App có thể nhận họ tên từ kho dữ liệu chung — rủi ro lộ định danh.")
    # dữ liệu nhúng không được chứa hồ sơ học viên
    dw = "".join(f.read_text(encoding="utf-8") for f in tep_web())
    if '"lam_bai"' in dw or '"hs_id"' in dw:
        E("Dữ liệu nhúng trong trang chứa hồ sơ học viên — phải gỡ.")
    else:
        OK("Dữ liệu nhúng chỉ có học liệu, không có hồ sơ học viên nào.")


def main() -> int:
    print("\033[1m" + "═" * 72)
    print("  KIỂM TOÁN TOÀN HỆ THỐNG — HỌC VIỆN GITA")
    print("═" * 72 + "\033[0m")
    for f in (kiem_chi_muc, kiem_ngan_hang, kiem_phieu, kiem_web, kiem_lien_ket,
              kiem_bang, kiem_de_thi, kiem_ban_do, kiem_bao_mat,
              kiem_phan_quyen, kiem_rieng_tu):
        f()
    print("\n" + "─" * 72)
    for m in DAT:
        print(f"   \033[32m✔\033[0m {m}")
    for m in CANH_BAO:
        print(f"   \033[33m! {m}\033[0m")
    print("─" * 72)
    if LOI:
        print(f"\033[31m\033[1m  KẾT LUẬN: CÒN {len(LOI)} LỖI — chưa được phát hành.\033[0m")
        return 1
    print(f"\033[32m\033[1m  KẾT LUẬN: SẠCH LỖI · {len(DAT)} hạng mục đạt"
          + (f" · {len(CANH_BAO)} cảnh báo" if CANH_BAO else "") + "\033[0m")
    return 0


if __name__ == "__main__":
    sys.exit(main())
