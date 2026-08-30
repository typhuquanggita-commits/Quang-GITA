#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Chuyển phiếu Markdown -> dữ liệu JSON cho hệ thống làm bài online GITA.

  python3 04-cong-cu/build_web_data.py

Đầu ra: 09-online/data/gita-data.json  gồm
  - meta      : thông tin bộ tài liệu
  - nhom      : 8 nhóm chuyên đề + 6 năng lực tư duy
  - chi_muc   : 600 dòng chỉ mục phiếu (rút gọn trường)
  - ban_do    : 9 bản đồ kiến thức (tiêu đề + đường dẫn)
  - phieu     : các phiếu đã biên soạn, tách tới từng ý và từng mục đáp án
  - test      : 3 đề test đầu vào (dạng đọc + đáp án)
"""
from __future__ import annotations
import argparse, collections, json, re, sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))
from nhom_chuyen_de import NHOM, TU_DUY  # noqa: E402
from ban_do_kien_thuc import BAN_DO  # noqa: E402
from loai_phieu import LOAI, CHUOI_BUOI  # noqa: E402
from phan_quyen import VAI_TRO, TAI_NGUYEN, QUYEN, TANG, BAT_BIEN  # noqa: E402
from so_do_doc_vi import CAU_MO, CAY, CHOT, DOC_NHAM  # noqa: E402
from khoi_mam import (KHOI as KHOI_MAM, TWM as TWM_MAM,  # noqa: E402
                       MACH as MACH_MAM, DOI_CHIEU_CAM as DOI_CHIEU_MAM,
                       LUAT_HUNG_THU as LUAT_MAM)

OUT_DIR = ROOT / "09-online" / "data"
MOC_DAP_AN = "## HƯỚNG DẪN GIẢI VÀ ĐÁP ÁN"

RE_PHAN = re.compile(
    r"^##\s+PHẦN\s+([A-EIVX]+)\s*—\s*(.+?)\s*·\s*(?:Mức\s+(\S+)\s*·\s*)?"
    r"(\d+)\s*phút\s*·\s*(\d+)\s*điểm\s*$", re.M)
RE_BAI = re.compile(r"^###\s+Bài\s+(\d+)\.\s*\((\d+)\s*điểm\)\s*(.*)$", re.M)
RE_Y = re.compile(r"^\s{0,3}([a-z])\)\s+(.*)$")
RE_DA_BAI = re.compile(r"^###\s+Bài\s+([A-EIVX]+)\.(\d+)\s*$", re.M)
MUC_DA = ["Đáp số", "Hướng giải", "Nhãn tư duy", "Lỗi thường gặp", "Gợi ý 3 tầng"]
LA_MA = ["I", "II", "III", "IV", "V"]


RE_HANG_BANG = re.compile(r"^\|(.*)\|\s*$")
DAU_NEN = chr(2)          # tiền tố đánh dấu một tham chiếu vào bảng chuỗi


def tach_dong_md(md: str):
    """Tách Markdown thành mảng dòng; dòng bảng tách tiếp thành mảng ô.

    Nhờ vậy bộ nén chuỗi bên dưới gom được những ô lặp lại hàng nghìn lần trong
    bảng phân tích chuyên sâu của 600 phiếu lời giải.
    """
    ra = []
    for dong in md.split("\n"):
        m = RE_HANG_BANG.match(dong)
        if m and set(dong) - set("|-: "):
            ra.append([c.strip() for c in m.group(1).split("|")])
        else:
            ra.append(dong)
    return ra


def nen_chuoi(data: dict) -> dict:
    """Thay mọi chuỗi lặp lại bằng tham chiếu vào một bảng chuỗi dùng chung.

    Nội dung 1 296 tài liệu dùng đi dùng lại vài nghìn câu giống hệt nhau (hướng
    giải, điểm chốt, sáu cột phân tích của cùng một mẫu bài). Gom lại một bảng
    giúp dữ liệu web nhỏ đi khoảng ba lần mà không mất bất kỳ chữ nào.
    """
    dem = collections.Counter()

    def duyet(x):
        if isinstance(x, str):
            if len(x) >= 12:
                dem[x] += 1
        elif isinstance(x, list):
            for i in x:
                duyet(i)
        elif isinstance(x, dict):
            for i in x.values():
                duyet(i)

    duyet(data)
    bang = [s for s, c in dem.items() if c >= 2]
    chi_so = {s: i for i, s in enumerate(bang)}

    def thay(x):
        if isinstance(x, str):
            return DAU_NEN + str(chi_so[x]) if x in chi_so else x
        if isinstance(x, list):
            return [thay(i) for i in x]
        if isinstance(x, dict):
            return {k: thay(v) for k, v in x.items()}
        return x

    # Bảng chuỗi phải là khoá **đầu tiên**: bộ đọc phía trình duyệt dùng
    # JSON.parse với hàm reviver, mà reviver chỉ tra được bảng nếu bảng đã dựng xong.
    ra = {"bang_chuoi": bang}
    ra.update(thay(data))
    return ra


def tach_front_matter(text: str):
    if not text.startswith("---"):
        return {}, text
    end = text.find("\n---", 3)
    return yaml.safe_load(text[3:end]), text[end + 4:]


def tach_y(khoi: str) -> tuple[str, list[dict]]:
    """Trả về (đề dẫn, danh sách ý)."""
    dan, ys = [], []
    for dong in khoi.splitlines():
        m = RE_Y.match(dong)
        if m:
            ys.append({"ma": m.group(1), "noi_dung": m.group(2).strip()})
        elif ys:
            if dong.strip():
                ys[-1]["noi_dung"] += " " + dong.strip()
        else:
            if dong.strip() and not dong.startswith("###"):
                dan.append(dong.rstrip())
    return "\n".join(dan).strip(), ys


def tach_dap_an(da_text: str) -> dict:
    """Bổ mục đáp án thành {'I.1': {dap_so, huong_giai, ...}}."""
    kq: dict[str, dict] = {}
    vt = [(m.start(), m.group(1), m.group(2)) for m in RE_DA_BAI.finditer(da_text)]
    vt_end = [v[0] for v in vt[1:]] + [len(da_text)]
    for (start, phan, bai), end in zip(vt, vt_end):
        khoi = da_text[start:end]
        muc: dict[str, str] = {}
        hien_tai = None
        for dong in khoi.splitlines()[1:]:
            m = re.match(r"^\*\*(" + "|".join(MUC_DA) + r")[:：]?\*\*\s*(.*)$", dong.strip())
            if m:
                hien_tai = m.group(1)
                muc[hien_tai] = m.group(2).strip()
            elif hien_tai and dong.strip():
                muc[hien_tai] += " " + dong.strip()
        kq[f"{phan}.{bai}"] = {
            "dap_so": muc.get("Đáp số", ""),
            "huong_giai": muc.get("Hướng giải", ""),
            "nhan_tu_duy": muc.get("Nhãn tư duy", ""),
            "loi_thuong_gap": muc.get("Lỗi thường gặp", ""),
            "goi_y": muc.get("Gợi ý 3 tầng", ""),
        }
    return kq


def dap_so_theo_y(chuoi: str) -> dict[str, str]:
    """'a) 42 · b) 8 · c) 200' -> {'a': '42', 'b': '8', 'c': '200'}"""
    ra: dict[str, str] = {}
    phan = re.split(r"\s*·\s*", chuoi)
    for p in phan:
        m = re.match(r"^([a-z])\)\s*(.+)$", p.strip())
        if m:
            ra[m.group(1)] = m.group(2).strip()
    return ra


def doc_phieu(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    fm, than = tach_front_matter(text)
    de, da = than.split(MOC_DAP_AN, 1) if MOC_DAP_AN in than else (than, "")
    bang_da = tach_dap_an(da)

    phan_m = list(RE_PHAN.finditer(de))
    ranh = [m.start() for m in phan_m] + [len(de)]
    phan_list = []
    for i, m in enumerate(phan_m):
        khoi = de[ranh[i]:ranh[i + 1]]
        bai_m = list(RE_BAI.finditer(khoi))
        rb = [b.start() for b in bai_m] + [len(khoi)]
        bai_list = []
        for j, b in enumerate(bai_m):
            than_bai = khoi[rb[j]:rb[j + 1]]
            dan, ys = tach_y(than_bai)
            khoa = f"{m.group(1)}.{b.group(1)}"
            da_bai = bang_da.get(khoa, {})
            theo_y = dap_so_theo_y(da_bai.get("dap_so", ""))
            for y in ys:
                y["dap_so"] = theo_y.get(y["ma"], "")
            bai_list.append({
                "so": int(b.group(1)), "ma": khoa, "diem": int(b.group(2)),
                "tieu_de": b.group(3).strip(), "dan": dan, "y": ys, "dap_an": da_bai,
            })
        phan_list.append({
            "so": m.group(1), "ten": m.group(2), "muc": m.group(3) or "",
            "phut": int(m.group(4)), "diem": int(m.group(5)), "bai": bai_list,
        })
    return {"meta": fm, "phan": phan_list,
            "tong_y": sum(len(b["y"]) for p in phan_list for b in p["bai"])}


def doc_test(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    fm, than = tach_front_matter(text)
    moc = "## ĐÁP ÁN VÀ BẢNG CHẤM"
    de, da = than.split(moc, 1) if moc in than else (than, "")
    return {"meta": fm, "de_md": de.strip(), "dap_an_md": da.strip()}


def main() -> None:
    ap = argparse.ArgumentParser(description="Dựng dữ liệu web cho hệ thống GITA")
    ap.add_argument("--lop", type=int, choices=(3, 4, 5),
                    help="chỉ nhúng trọn nội dung của khối lớp này (chỉ mục vẫn đủ)")
    ap.add_argument("--ra", type=Path, help="đường dẫn tệp JSON đầu ra")
    ap.add_argument("--lien-ket",
                    help='JSON {"3": "https://…", "5": "https://…"} — địa chỉ bản của khối '
                         'khác; bỏ trống thì đọc 09-online/dia-chi-ban.json')
    a = ap.parse_args()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    chi_muc = json.loads((ROOT / "02-chi-muc" / "index-master.json").read_text(encoding="utf-8"))
    gon = [{"ma": r["ma"], "t": r["tuyen"], "l": r["lop"], "cum": r["cum"],
            "cum_ten": r["cum_ten"], "lp": r["loai"], "lp_ten": r["loai_ten"],
            "g": r["nhom_ma"], "ten": r["ten"], "hk": r["hoc_ky"], "tuan": r["tuan"],
            "stt": r["stt"], "moc": r["moc_kiem_tra"], "hoc": r["la_buoi_hoc"],
            "buoi": r.get("buoi_trong_cum"),
            "kem": r.get("kem_theo")} for r in chi_muc]

    # Danh mục cụm chuyên đề tách riêng để không lặp danh sách dạng bài 13 lần
    cum_ds, da_co = [], set()
    for r in chi_muc:
        khoa = (r["lop"], r["tuyen"], r["cum"])
        if not r["cum"] or khoa in da_co:
            continue
        da_co.add(khoa)
        cum_ds.append({"khoa": f"L{r['lop']}-{r['tuyen']}-C{r['cum']:02d}",
                       "l": r["lop"], "t": r["tuyen"], "cum": r["cum"],
                       "ten": r["cum_ten"], "g": r["nhom_ma"], "hk": r["hoc_ky"],
                       "tuan": r["tuan"], "dang_bai": r["dang_bai"]})

    phieu, kem = {}, {}
    for p in sorted((ROOT / "03-phieu").rglob("GITA-*.md")):
        text = p.read_text(encoding="utf-8")
        fm, than = tach_front_matter(text)
        if fm.get("loai") in ("GP", "HD"):
            kem[fm["ma"]] = {"meta": fm, "md": tach_dong_md(than.strip())}
            continue
        d = doc_phieu(p)
        phieu[d["meta"]["ma"]] = d

    de_thi_idx = json.loads((ROOT / "07-de-thi" / "index-de-thi.json").read_text(encoding="utf-8"))
    de_thi = [{"ma": d["ma"], "ho": d["ho"], "lop": d["lop"], "moc": d["moc"],
               "moc_ten": d["moc_ten"], "ten": d["ten"], "pham_vi": d["pham_vi"],
               "thoi_luong": d["thoi_luong"], "thang_diem": d["thang_diem"],
               "bt": d["ma"].rsplit("-", 1)[-1] if d["ho"] != "ON" else None}
              for d in de_thi_idx]
    de_soan = {}
    for f in (ROOT / "07-de-thi").rglob("GITA-*.md"):
        t = f.read_text(encoding="utf-8")
        fm, than = tach_front_matter(t)
        moc_da = "## ĐÁP ÁN VÀ BIỂU ĐIỂM"
        de, da = than.split(moc_da, 1) if moc_da in than else (than, "")
        de_soan[f.stem] = {"meta": fm, "de_md": de.strip(), "dap_an_md": da.strip()}

    test = {}
    for p in sorted((ROOT / "08-test-dau-vao").glob("test-dau-vao-*.md")):
        d = doc_test(p)
        test[d["meta"]["ma_de"]] = d

    lo_trinh = []
    for f in sorted((ROOT / "05-lo-trinh").glob("lo-trinh-*.md")):
        md = f.read_text(encoding="utf-8")
        t, lop = f.stem.split("-")[2], int(f.stem.split("-")[3][1:])
        lo_trinh.append({"ma": f.stem, "t": t, "l": lop,
                         "ten": md.splitlines()[0].lstrip("# "), "md": tach_dong_md(md)})

    so_do = []
    for f in sorted((ROOT / "10-so-do-doc-vi").glob("so-do-*.md")):
        md = f.read_text(encoding="utf-8")
        g, lop = f.stem.split("-")[2], int(f.stem.split("-")[3][1:])
        so_do.append({"ma": f.stem, "g": g, "l": lop,
                      "ten": md.splitlines()[0].lstrip("# "), "md": tach_dong_md(md)})

    # Khối Mầm — mẫu giáo lớn, lớp 1, lớp 2. Nhúng cả hai bản của mỗi buổi:
    # bản của trẻ và bản người lớn ngồi cùng. Ở tuổi này người lớn là một phần
    # của học liệu, nên thiếu bản người lớn là thiếu một nửa bộ tài liệu.
    mam, mam_noi = [], {}
    p_mam = ROOT / "12-khoi-mam" / "index-khoi-mam.json"
    if p_mam.exists():
        for x in json.loads(p_mam.read_text(encoding="utf-8")):
            mam.append({k: x[k] for k in
                        ("ma", "khoi", "khoi_ten", "tuoi", "chu_de", "chu_de_ten",
                         "mach", "mach_ten", "cam", "buoi", "thoi_luong",
                         "thang_diem", "yeu_cau", "twm", "chuan")})
            for hau, khoa in (("", "tre"), ("-NL", "nguoi_lon")):
                f = ROOT / "12-khoi-mam" / x["khoi"] / f"{x['ma']}{hau}.md"
                if f.exists():
                    # Bóc khối khai báo YAML đầu tệp: nó là siêu dữ liệu cho bộ
                    # sinh, không phải nội dung cho người đọc. Để nguyên thì màn
                    # hình mở ra bằng một đoạn `ma: "..." khoi: "..."` khó hiểu.
                    md = f.read_text(encoding="utf-8")
                    if md.startswith("---"):
                        md = md.split("\n---", 1)[-1].lstrip("-\n")
                    mam_noi.setdefault(x["ma"], {})[khoa] = tach_dong_md(md)

    ban_do = []
    for f in sorted((ROOT / "06-ban-do-kien-thuc").glob("*.md")):
        md = f.read_text(encoding="utf-8")
        ban_do.append({"ma": f.stem, "ten": md.splitlines()[0].lstrip("# "), "md": md})

    # Mạch kiến thức có cấu trúc — dùng cho mục "Kiến thức liên quan" của từng bài
    mach = []
    for (lop, ky), ds in BAN_DO.items():
        for m in ds:
            mach.append({"lop": lop, "ky": ky, "ten": m["ten"], "nhom": m["nhom"],
                         "cot_loi": m["cot_loi"], "phai_thuoc": m["phai_thuoc"],
                         "loi": m["loi"], "tu_kiem": m["tu_kiem"]})

    data = {
        "meta": {"ten": "Hệ thống Toán Tiểu học CLC — Học viện GITA",
                 "phien_ban": "1.0",
                 "tong_tai_lieu": len(gon),
                 "tong_phieu_hoc": sum(1 for r in gon if r["hoc"]),
                 "tong_cum": sum(1 for r in gon if r["lp"] == "HD"),
                 "phieu_da_bien_soan": len(phieu),
                 "tai_lieu_kem_da_bien_soan": len(kem)},
        "loai": {k: {"ten": v["ten"], "giao_an": v["giao_an"], "muc_tieu": v["muc_tieu"],
                     "cau_truc": v["cau_truc"]} for k, v in LOAI.items()},
        "chuoi_buoi": CHUOI_BUOI,
        "phan_quyen": {"vai_tro": VAI_TRO, "tai_nguyen": TAI_NGUYEN,
                       "quyen": {t: {v: list(QUYEN[t][v]) for v in VAI_TRO}
                                 for t in TAI_NGUYEN},
                       "tang": TANG, "bat_bien": BAT_BIEN},
        "nhom": {k: {"ten": v["ten"], "mo_ta": v["mo_ta"], "td": v["td"], "mau": v["mau"]}
                 for k, v in NHOM.items()},
        "tu_duy": TU_DUY,
        "chi_muc": gon,
        "cum": cum_ds,
        "ban_do": ban_do,
        "so_do": so_do,
        "lo_trinh": lo_trinh,
        "cay_doc_vi": {"mo": CAU_MO, "cay": CAY, "chot": CHOT, "nham": DOC_NHAM},
        "mach": mach,
        "phieu": phieu,
        "kem": kem,
        "test": test,
        "de_thi": de_thi,
        "de_soan": de_soan,
        "mam": mam,
        "mam_noi": mam_noi,
        "mam_khung": {"khoi": KHOI_MAM, "twm": TWM_MAM, "mach": MACH_MAM,
                      "cam": DOI_CHIEU_MAM, "hung_thu": LUAT_MAM},
    }
    if a.lop:
        data["phieu"] = {k: v for k, v in phieu.items() if v["meta"]["lop"] == a.lop}
        data["kem"] = {k: v for k, v in kem.items() if v["meta"]["lop"] == a.lop}
        data["meta"]["khoi_lop"] = a.lop
    dc = ROOT / "09-online" / "dia-chi-ban.json"
    data["lien_ket_khoi"] = (json.loads(a.lien_ket) if a.lien_ket
                             else (json.loads(dc.read_text(encoding="utf-8"))
                                   if dc.exists() else {}))
    data = nen_chuoi(data)
    out = a.ra or (OUT_DIR / (f"gita-data-L{a.lop}.json" if a.lop else "gita-data.json"))
    out.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    phieu, kem = data["phieu"], data["kem"]
    kb = out.stat().st_size / 1024
    print(f"✔ {out.relative_to(ROOT)} — {kb:.0f} KB · bảng chuỗi {len(data['bang_chuoi'])} mục")
    print(f"  chỉ mục: {len(gon)} phiếu · đã biên soạn: {len(phieu)} · test: {len(test)}"
          f" · kèm (GP/HD): {len(kem)} · bản đồ: {len(ban_do)} · sơ đồ đọc vị: {len(so_do)}"
          f" · khối Mầm: {len(mam)} buổi × 2 bản"
          f" · mạch: {len(mach)}"
          f" · cụm: {len(cum_ds)} · đề thi: {len(de_thi)} (đã soạn {len(de_soan)})")
    print(f"  nhúng trọn nội dung: {len(phieu)} phiếu học + {len(kem)} phiếu kèm"
          + (f" (khối lớp {a.lop})" if a.lop else " (toàn bộ ba khối)"))


if __name__ == "__main__":
    main()
