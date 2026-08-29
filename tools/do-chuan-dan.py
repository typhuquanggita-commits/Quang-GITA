#!/usr/bin/env python3
"""
Chấm một file audio theo CHUẨN DẪN của ENGWIN365.

    python3 tools/do-chuan-dan.py audio/ep01-*.mp3 --gioi nam
    python3 tools/do-chuan-dan.py audio/*.mp3 --gioi nam --gon

VÌ SAO CÓ CÔNG CỤ NÀY
  Chuẩn dẫn trước đây chỉ là chữ trong tài liệu: "tốc độ 145–160 từ/phút",
  "nghỉ 0,3–0,5 giây". Không ai kiểm được, nên không ai tuân. Công cụ này đo
  file thật rồi đối chiếu với đúng những ngưỡng đó trong data/voices.ts — một
  nguồn sự thật duy nhất cho cả tài liệu, giao diện và bài chấm.

NÓI RÕ MỘT ĐIỀU VỀ "GIỌNG NHƯ BTV VTV"
  Cái làm nên chất bản tin KHÔNG phải chất giọng trời cho của một người cụ thể.
  Đó là kỹ thuật: tốc độ ổn định, cao độ có nhấn mà không kịch, năng lượng
  không tụt về cuối, phụ âm không nuốt, và trên hết là KỶ LUẬT NGẮT NGHỈ. Tất
  cả những thứ đó đo được, luyện được, và lặp lại được — nên chúng nằm ở đây.
  Chất giọng riêng của một người thì không sao chép, và cũng không nên.

CÁCH ĐO ÂM TIẾT, VÀ VÌ SAO KHÔNG ĐO "TỪ"
  Máy đếm được đỉnh của đường bao năng lượng — mỗi âm tiết có một nhân nguyên
  âm tạo một đỉnh. Máy KHÔNG biết đâu là ranh giới từ, nên ngưỡng ở đây đặt
  theo âm tiết/phút, không phải từ/phút. Quy đổi tham khảo: tiếng Việt khoảng
  1,6 âm tiết một từ, tiếng Anh khoảng 1,4.

  Tham số bộ đếm (cửa sổ 40ms, khoảng cách tối thiểu 80ms, ngưỡng 0,10×đỉnh)
  hiệu chuẩn trên năm câu tiếng Anh sạch cho sai số 4,4%. NHƯNG đối chiếu với
  kịch bản gốc của một tập podcast thật — trộn tiếng Việt, nhiều người nói —
  thì nó ĐẾM THỪA 14%. Con số 4,4% chỉ đúng cho audio sạch một giọng.

  Vì vậy: khi có kịch bản, hãy dùng --kich-ban để đếm CHÍNH XÁC từ chữ thay vì
  ước lượng từ sóng âm. Mỗi âm tiết tiếng Việt viết rời bằng khoảng trắng nên
  đếm được tuyệt đối; tiếng Anh đếm theo cụm nguyên âm.

  Mẫu số là THỜI LƯỢNG TRỪ CÁC KHOẢNG NGHỈ, tức tốc độ khi đang thực sự nói.
  Dùng tổng khung vượt ngưỡng năng lượng làm mẫu số sẽ cho ra con số phóng đại
  gấp đôi — đó là lỗi của bản đầu tiên, đã sửa.

GIỚI HẠN
  Công cụ chấm CẢ FILE làm một. Một tập podcast trộn tiếng Việt với câu mẫu
  tiếng Anh đọc chậm, và trộn nhiều người nói, nên các con số là trung bình
  của những thứ khác nhau — dùng làm rào chắn thô, không phải thước đo chính
  xác cho từng đoạn. Khi phát hiện file có nhiều người nói, công cụ tự bỏ qua
  phần chấm cao độ thay vì báo một con số trung bình vô nghĩa.
"""
import argparse
import glob
import json
import math
import os
import re
import subprocess
import sys
import tempfile
import wave

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AM_TIET_MOI_TU_EN = 1.4


def doc_nguong():
    """Đọc ngưỡng thẳng từ data/voices.ts — không chép lại con số sang đây."""
    src = open(os.path.join(ROOT, "data", "voices.ts"), encoding="utf-8").read()
    ng = {}
    for m in re.finditer(
        r"metric: '([^']+)', min: ([\d.-]+), max: ([\d.-]+), unit: '([^']+)'"
        r"(?:, scope: '([^']+)')?",
        src,
    ):
        ten, lo, hi, dv, pv = m.groups()
        ng.setdefault(ten, []).append(
            {"min": float(lo), "max": float(hi), "unit": dv, "scope": pv or "chung"}
        )
    return ng


def am_tiet_tu_chu(text, lang):
    """Đếm âm tiết từ CHỮ — chính xác, không ước lượng."""
    if lang == "vi":
        # Mỗi âm tiết tiếng Việt là một tiếng viết rời.
        return len(re.findall(r"[A-Za-zÀ-ỹ]+", text))
    n = 0
    for w in re.findall(r"[A-Za-z']+", text.lower()):
        cum = len(re.findall(r"[aeiouy]+", w))
        if w.endswith("e") and cum > 1:
            cum -= 1
        n += max(1, cum)
    return n


def so_giong_kich_ban(ep_id):
    """
    Đếm số giọng khác nhau trong một tập, đọc thẳng từ kịch bản.

    Cần con số này vì ba tiêu chí — cao độ, biến thiên cao độ, độ rõ phổ — là
    thuộc tính của MỘT giọng. Đo chúng trên file trộn nhiều giọng sẽ cho số
    cao giả: mỗi lần chuyển từ giọng nữ tiếng Việt sang giọng nam tiếng Anh,
    máy ghi nhận đó là một bước nhảy cao độ, dù thực ra không ai nói sai cả.
    """
    d = json.load(open(os.path.join(ROOT, "content", "podcast-scripts.json"),
                       encoding="utf-8"))
    ep = next((e for e in d["episodes"] if e["id"] == ep_id), None)
    if ep is None:
        return None
    return len({l["s"] for l in ep["lines"] if l["s"] != "LẶNG"})


def lang_co_y(ep_id):
    """
    Lặng CỐ Ý của một tập: tổng số giây và số khối, theo kịch bản.

    Có tập dành hẳn 15–20 giây cho học viên tự ngẫm. Đó là thiết kế, không phải
    dead air — tính chung vào tỉ lệ im lặng sẽ báo lỗi một thứ đang làm đúng.
    """
    d = json.load(open(os.path.join(ROOT, "content", "podcast-scripts.json"),
                       encoding="utf-8"))
    ep = next((e for e in d["episodes"] if e["id"] == ep_id), None)
    if ep is None:
        return 0.0, 0
    khoi = [l for l in ep["lines"] if l["s"] == "LẶNG"]
    return sum(l.get("p", 0.0) for l in khoi), len(khoi)


def am_tiet_kich_ban(ep_id):
    """Tổng âm tiết của một tập, đọc thẳng từ kịch bản gốc."""
    d = json.load(open(os.path.join(ROOT, "content", "podcast-scripts.json"),
                       encoding="utf-8"))
    ep = next((e for e in d["episodes"] if e["id"] == ep_id), None)
    if ep is None:
        return None
    return sum(am_tiet_tu_chu(l["t"], l["l"])
               for l in ep["lines"] if l["s"] != "LẶNG" and l.get("t"))


def sang_wav(nguon):
    dich = tempfile.mktemp(suffix=".wav")
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", nguon,
         "-ar", "22050", "-ac", "1", "-vn", dich],
        check=True,
    )
    return dich


def do_lufs(nguon):
    """Đo độ to tổng thể bằng bộ lọc loudnorm của ffmpeg."""
    r = subprocess.run(
        ["ffmpeg", "-i", nguon, "-af", "loudnorm=print_format=json", "-f", "null", "-"],
        capture_output=True, text=True,
    )
    m = re.search(r'"input_i"\s*:\s*"(-?[\d.]+)"', r.stderr)
    return float(m.group(1)) if m else None


def do_tat_ca(wav, lufs):
    with wave.open(wav, "rb") as w:
        sr = w.getframerate()
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64)
    x /= 32768.0
    thoi_luong = len(x) / sr
    if thoi_luong < 5:
        return None

    # Đường bao năng lượng, khung 20ms bước 10ms.
    n, hop = int(0.020 * sr), int(0.010 * sr)
    rms = np.array([math.sqrt(float(np.mean(x[i:i + n] ** 2)) + 1e-12)
                    for i in range(0, len(x) - n, hop)])
    t_khung = hop / sr
    # Ngưỡng im lặng: 2% của đỉnh, KHÔNG phải 10%.
    # Hiệu chuẩn bằng chân lý nền: kịch bản ep01 có đúng 6,3 giây nghỉ (4% thời
    # lượng). Ngưỡng 10% cho ra 36% — nó xếp cả phụ âm nhẹ và đuôi câu đang tắt
    # dần vào loại im lặng. Ngưỡng 2% cho 7,1%, khớp với 4% nghỉ theo kịch bản
    # cộng các quãng ngắt tự nhiên trong câu.
    nguong_tieng = rms.max() * 0.02

    # --- Khoảng lặng: chuỗi khung liên tiếp dưới ngưỡng, dài ít nhất 0,25s ---
    lang = rms < nguong_tieng
    cac_nghi, dem = [], 0
    for v in lang:
        if v:
            dem += 1
        else:
            if dem * t_khung >= 0.25:
                cac_nghi.append(dem * t_khung)
            dem = 0
    if dem * t_khung >= 0.25:
        cac_nghi.append(dem * t_khung)

    # --- Âm tiết: đếm đỉnh của đường bao đã làm trơn ---
    # Tham số hiệu chuẩn trên câu đã đếm tay, sai số 4,4%.
    k = max(1, int(0.040 / t_khung))
    cach_toi_thieu = max(1, int(0.080 / t_khung))
    tron = np.convolve(rms, np.ones(k) / k, mode="same")
    nguong_dinh = tron.max() * 0.10  # ngưỡng đếm đỉnh âm tiết, khác ngưỡng im lặng
    dinh = []
    for i in range(1, len(tron) - 1):
        if tron[i] > tron[i - 1] and tron[i] >= tron[i + 1] and tron[i] > nguong_dinh:
            if not dinh or i - dinh[-1] >= cach_toi_thieu:
                dinh.append(i)
    # Mẫu số: thời lượng trừ các khoảng nghỉ — tốc độ khi đang thực sự nói.
    giay_noi = max(0.1, thoi_luong - sum(cac_nghi))
    am_tiet_moi_giay = len(dinh) / giay_noi

    # --- F0 bằng tự tương quan, chỉ trên khung có tiếng ---
    khung = [x[i:i + int(0.04 * sr)] for i in range(0, len(x) - int(0.04 * sr), int(0.02 * sr))]
    r2 = np.array([math.sqrt(float(np.mean(f ** 2)) + 1e-12) for f in khung])
    co_tieng = [f for f, r in zip(khung, r2) if r > r2.max() * 0.25]
    f0s, lo, hi = [], int(sr / 320), int(sr / 70)
    for f in co_tieng:
        f = f - f.mean()
        ac = np.correlate(f, f, mode="full")[len(f) - 1:]
        seg = ac[lo:hi]
        if seg.size and ac[0] > 0:
            j = int(np.argmax(seg)) + lo
            if ac[j] / ac[0] > 0.3:
                f0s.append(sr / j)

    # --- Phổ: trọng tâm và tỉ lệ năng lượng trên 2kHz ---
    noi = np.concatenate(co_tieng) if co_tieng else x
    pho = np.abs(np.fft.rfft(noi * np.hanning(len(noi))))
    tan = np.fft.rfftfreq(len(noi), 1 / sr)
    centroid = float(np.sum(tan * pho) / (np.sum(pho) + 1e-12))
    ti_le_cao = float(np.sum(pho[tan > 2000]) / (np.sum(pho) + 1e-12))

    # --- Trôi năng lượng: một phần ba đầu so với một phần ba cuối ---
    db = 20 * np.log10(rms + 1e-12)
    co = db[rms > nguong_tieng]
    ba = len(co) // 3
    troi = abs(float(np.median(co[:ba]) - np.median(co[-ba:]))) if ba > 5 else 0.0

    # Nhiều người nói? Nếu có cả khung dưới 155Hz lẫn trên 155Hz với tỉ lệ
    # đáng kể thì file trộn giọng nam và nữ — trung bình F0 khi đó vô nghĩa.
    nhieu_nguoi = False
    if f0s:
        cao = float(np.mean(np.array(f0s) > 155))
        nhieu_nguoi = 0.15 < cao < 0.85

    return {
        "nhieu_nguoi": nhieu_nguoi,
        "thoi_luong": thoi_luong,
        "am_tiet_phut": am_tiet_moi_giay * 60,
        "f0": float(np.median(f0s)) if f0s else 0.0,
        "f0_var": float(np.std(f0s)) if f0s else 0.0,
        "centroid": centroid,
        "ti_le_cao_tan": ti_le_cao,
        "nghi_trung_binh": float(np.median(cac_nghi)) if cac_nghi else 0.0,
        "so_nghi": len(cac_nghi) / (thoi_luong / 60),
        "ti_le_lang": float(np.mean(lang)),
        "troi_nang_luong": troi,
        "lufs": lufs,
    }


def chon_nguong(ng, ten, gioi):
    for b in ng.get(ten, []):
        if b["scope"] in (gioi, "chung"):
            return b
    return None


# Tiêu chí nào lấy ngưỡng nào, và tên hiển thị.
BANG = [
    ("Tốc độ",            "am_tiet_phut",     "am_tiet_phut"),
    ("Cao độ",            "f0",               "f0"),
    ("Biến thiên cao độ", "f0_var",           "f0_var"),
    ("Độ rõ (phổ)",       "centroid",         "centroid"),
    ("Năng lượng cao tần", "ti_le_cao_tan",   "ti_le_cao_tan"),
    ("Nghỉ trung bình",   "nghi_trung_binh",  "nghi_trung_binh"),
    ("Số lần nghỉ",       "so_nghi",          "so_nghi"),
    ("Tỉ lệ im lặng",     "ti_le_lang",       "ti_le_lang"),
    ("Trôi năng lượng",   "troi_nang_luong",  "troi_nang_luong"),
    ("Độ to tổng",        "lufs",             "lufs"),
]


# Ba tiêu chí chỉ có nghĩa khi file chỉ có MỘT giọng.
THEO_GIONG = ("f0", "f0_var", "centroid")


def cham(m, ng, gioi, gon=False):
    dat = thieu = 0
    dong = []
    tham_khao = []
    nhieu = m.get("so_giong", 1) > 1 or m.get("nhieu_nguoi")
    for nhan, khoa, ten_ng in BANG:
        b = chon_nguong(ng, ten_ng, gioi)
        v = m.get(khoa)
        if b is None or v is None:
            continue
        if nhieu and khoa in THEO_GIONG:
            tham_khao.append(f"    · {nhan:<20} {v:8.2f}  (tham khảo — file nhiều giọng)")
            continue
        ok = b["min"] <= v <= b["max"]
        dat += ok
        thieu += not ok
        huong = "" if ok else (" ↓ thấp hơn chuẩn" if v < b["min"] else " ↑ cao hơn chuẩn")
        dong.append(f"    {'✓' if ok else '✗'} {nhan:<20} {v:8.2f}  "
                    f"chuẩn {b['min']}–{b['max']} {b['unit']}{huong}")
    if not gon:
        print("\n".join(dong))
        if tham_khao:
            print("\n".join(tham_khao))
            print(f"    · {m.get('so_giong', '?')} giọng trong tập — ba tiêu chí trên là")
            print("      thuộc tính của một giọng, chấm chung sẽ cao giả. Muốn chấm")
            print("      thật thì phải đo từng giọng riêng, chưa làm được ở đây.")
    return dat, thieu


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="+")
    ap.add_argument("--gioi", choices=["nam", "nữ", "nu"], default="nam")
    ap.add_argument("--gon", action="store_true", help="Chỉ in tổng kết mỗi file")
    ap.add_argument("--kich-ban", action="store_true",
                    help="Đếm âm tiết chính xác từ kịch bản (suy mã tập từ tên file)")
    a = ap.parse_args()
    gioi = "nữ" if a.gioi in ("nữ", "nu") else "nam"

    ng = doc_nguong()
    if not ng:
        sys.exit("Không đọc được ngưỡng từ data/voices.ts")

    ds = []
    for pat in a.files:
        ds.extend(sorted(glob.glob(pat)) or [pat])

    print(f"\n  CHẤM THEO CHUẨN DẪN — giọng {gioi}\n")
    tong_dat = tong_thieu = 0
    for f in ds:
        if not os.path.exists(f):
            print(f"  ✗ không thấy {f}")
            continue
        wav = sang_wav(f)
        m = do_tat_ca(wav, do_lufs(f))
        os.remove(wav)
        if m is None:
            print(f"  ✗ {os.path.basename(f)}: quá ngắn để chấm")
            continue
        chinh_xac = False
        if a.kich_ban:
            mm = re.match(r"(ep\d+)", os.path.basename(f))
            if mm:
                m["so_giong"] = so_giong_kich_ban(mm.group(1)) or 1
                # Lặng cố ý bị trừ khỏi các chỉ số về NGHỈ, nhưng KHÔNG được
                # cộng lại vào thời gian nói — nó vẫn là lúc không ai nói. Vì
                # vậy giây nói được chốt TRƯỚC, từ tỉ lệ im lặng gốc.
                lcy, so_khoi = lang_co_y(mm.group(1))
                m["giay_noi"] = m["thoi_luong"] * (1 - m["ti_le_lang"])
                if lcy > 0:
                    m["lang_co_y"] = lcy
                    con_lai = max(1.0, m["thoi_luong"] - lcy)
                    lang_that = max(0.0, m["ti_le_lang"] * m["thoi_luong"] - lcy)
                    m["ti_le_lang"] = lang_that / con_lai
                    so_lan = m["so_nghi"] * (m["thoi_luong"] / 60)
                    con = max(0.0, so_lan - so_khoi)
                    m["so_nghi"] = con / (con_lai / 60)
                    if con >= 1:
                        m["nghi_trung_binh"] = lang_that / con
            n = am_tiet_kich_ban(mm.group(1)) if mm else None
            if n:
                giay_noi = m.get("giay_noi", m["thoi_luong"] * (1 - m["ti_le_lang"]))
                m["am_tiet_phut"] = n / max(0.1, giay_noi) * 60
                chinh_xac = True
        nhan_do = "đếm từ kịch bản" if chinh_xac else "ước lượng ±14%"
        if m.get("lang_co_y"):
            nhan_do += f" · trừ {m['lang_co_y']:.0f}s lặng cố ý"
        print(f"  ▸ {os.path.basename(f)}  ({m['thoi_luong'] / 60:.1f} phút) "
              f"· tốc độ {nhan_do}")
        d, t = cham(m, ng, gioi, a.gon)
        tong_dat += d
        tong_thieu += t
        print(f"    → {d} đạt / {t} lệch\n")

    tong = tong_dat + tong_thieu
    if tong:
        print(f"  TỔNG: {tong_dat}/{tong} tiêu chí đạt ({tong_dat * 100 // tong}%)\n")
        print(f"  Ngưỡng đọc từ data/voices.ts — sửa ở đó thì cả tài liệu, giao diện")
        print(f"  và bài chấm này đổi theo.\n")


if __name__ == "__main__":
    main()
