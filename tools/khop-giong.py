#!/usr/bin/env python3
"""
Khớp một giọng mẫu có thật với dàn giọng của ENGWIN RADIO.

    python3 tools/khop-giong.py mau-giong-nu.mp3 --gioi nu
    python3 tools/khop-giong.py mau-nam.m4a --gioi nam --tu 0:03 --den 0:18
    python3 tools/khop-giong.py mau.wav --gioi nu --mo-rong 200

VÌ SAO CÓ CÔNG CỤ NÀY
  Tôi không nghe được. Nhưng giọng người đo được, và hai giọng gần nhau về hình
  dạng bao phổ thì nghe cũng gần nhau. Công cụ đo giọng mẫu của bạn rồi xếp
  hạng dàn giọng theo độ gần.

DÙNG ĐẶC TRƯNG GÌ, VÀ VÌ SAO
  Bản đầu tiên của công cụ này dùng ba con số: cao độ, độ sáng phổ, biến thiên
  cao độ. Đo lại thì nó chỉ đúng 3/10 — gần bằng đoán mò (2/10). Lý do: cho
  CÙNG một người nói năm câu khác nhau, cao độ trung vị xê dịch tới 27–42 Hz,
  trong khi cả năm giọng nữ của dàn chỉ nằm trong 20 Hz. Nhiễu lớn hơn tín hiệu.

  Bản này dùng MFCC — mô tả HÌNH DẠNG bao phổ, tức là vị trí các cộng hưởng do
  khoang miệng và thanh quản của riêng người đó tạo ra. Đo lại trên đúng phép
  thử cũ: 9/10 đúng hạng nhất, 10/10 nằm trong hai hạng đầu.

  Cao độ vẫn dùng, nhưng đúng việc của nó: tách nam/nữ (cách nhau ~80 Hz, thừa
  sức vượt nhiễu). Không dùng để xếp hạng trong cùng một giới.

ĐỘ TIN CẬY ĐƯỢC BÁO RA SAO
  Đo trên dàn giọng: khoảng cách khi CÙNG người nói là 2,7–8,8; khi KHÁC người
  là 4,0–12,2. Hai dải này CHỒNG LÊN NHAU, nên một con số tuyệt đối không trả
  lời được câu "người này có trong dàn không". Cái tin được là THỨ HẠNG. Vì vậy
  công cụ báo khoảng cách giữa hạng nhất và hạng nhì: cách xa thì kết quả chắc,
  sát nhau thì phải nghe mới chọn được.

GIỚI HẠN PHẢI BIẾT TRƯỚC
  - Công cụ khớp CHẤT GIỌNG, không khớp GIỌNG VÙNG MIỀN hay ngữ điệu. Nó không
    biết một giọng có chuẩn Hà Nội hay không, cũng không biết chuẩn Anh-Anh hay
    Anh-Mỹ. Kết quả là danh sách rút gọn để bạn NGHE, không phải phán quyết.
  - Nếu file mẫu có nhạc nền, số đo sẽ sai. Công cụ tự cảnh báo khi phát hiện;
    hãy dùng --tu/--den để cắt lấy đoạn chỉ có tiếng nói.
  - Dàn giọng là giọng tổng hợp tiếng Anh; mẫu của bạn có thể là người thật nói
    tiếng Việt. Bao phổ vẫn so được, nhưng đây là so xuyên ngôn ngữ — hãy coi
    thứ hạng là gợi ý mạnh, không phải bằng chứng.
"""
import argparse
import json
import math
import os
import subprocess
import sys
import tempfile
import wave

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from cast_voices import measure, PROBE, VOICES          # noqa: E402
from dac_trung_giong import mfcc                        # noqa: E402
from khop_giong_lib import doc_dan_giong                # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HO_SO = os.path.join(ROOT, "audio", "casting", "mfcc-dan-giong.json")


def sang_wav(nguon, tu=None, den=None):
    """Đổi file mẫu sang wav 22050Hz một kênh — cùng định dạng với dàn giọng."""
    dich = tempfile.mktemp(suffix=".wav")
    cmd = ["ffmpeg", "-y", "-loglevel", "error"]
    if tu:
        cmd += ["-ss", tu]
    if den:
        cmd += ["-to", den]
    cmd += ["-i", nguon, "-ar", "22050", "-ac", "1", "-vn", dich]
    subprocess.run(cmd, check=True)
    return dich


def dung_giong(model_path, speaker, text):
    from piper import PiperVoice, SynthesisConfig
    t = tempfile.mktemp(suffix=".wav")
    v = PiperVoice.load(model_path)
    with wave.open(t, "wb") as w:
        v.synthesize_wav(text, w, syn_config=SynthesisConfig(speaker_id=speaker))
    return t


def lap_ho_so(dan):
    """
    Lập hồ sơ MFCC cho dàn giọng, lưu lại để lần sau khỏi dựng lại.

    Hồ sơ phụ thuộc vào câu dùng để dựng, nên câu đó được ghi kèm; đổi câu thì
    phải lập lại hồ sơ, nếu không sẽ so hai thứ không cùng gốc.
    """
    if os.path.exists(HO_SO):
        d = json.load(open(HO_SO, encoding="utf-8"))
        if d.get("cau") == PROBE and set(d["vec"]) == {v["id"] for v in dan}:
            return {k: np.array(v) for k, v in d["vec"].items()}

    print("  Lập hồ sơ MFCC cho dàn giọng (chỉ làm một lần)…")
    from piper import PiperVoice, SynthesisConfig
    vec = {}
    for model in sorted({v["model"] for v in dan}):
        mp = os.path.join(VOICES, model + ".onnx")
        pv = PiperVoice.load(mp)
        for v in [x for x in dan if x["model"] == model]:
            t = tempfile.mktemp(suffix=".wav")
            with wave.open(t, "wb") as w:
                pv.synthesize_wav(PROBE, w,
                                  syn_config=SynthesisConfig(speaker_id=v["speaker"]))
            vec[v["id"]] = mfcc(t)
            os.remove(t)
    os.makedirs(os.path.dirname(HO_SO), exist_ok=True)
    json.dump({"cau": PROBE, "vec": {k: list(map(float, x)) for k, x in vec.items()}},
              open(HO_SO, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    return vec


def canh_bao_nhac_nen(path):
    """
    Đoán xem file có nhạc nền không.

    Tiếng nói thuần có khoảng lặng thật giữa các câu; nhạc nền lấp đầy chúng,
    nên tỉ lệ khung im lặng tụt rất thấp. Dấu hiệu gián tiếp — chỉ cảnh báo.
    """
    with wave.open(path, "rb") as w:
        sr = w.getframerate()
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768.0
    n = int(0.04 * sr)
    rms = np.array([math.sqrt(float(np.mean(x[i:i + n] ** 2)) + 1e-12)
                    for i in range(0, len(x) - n, n)])
    return None if rms.size == 0 else float(np.mean(rms < rms.max() * 0.06))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mau", help="File audio mẫu (mp3, m4a, wav, mp4…)")
    ap.add_argument("--gioi", choices=["nam", "nu"], required=True)
    ap.add_argument("--tu", help="Cắt từ, ví dụ 0:03")
    ap.add_argument("--den", help="Cắt đến, ví dụ 0:18")
    ap.add_argument("--mo-rong", type=int, default=0, metavar="N",
                    help="Quét thêm N giọng thô của libritts để tìm giọng gần hơn")
    a = ap.parse_args()

    if not os.path.exists(a.mau):
        sys.exit(f"Không thấy file: {a.mau}")

    print(f"\n  KHỚP GIỌNG MẪU — {os.path.basename(a.mau)}\n")
    wav = sang_wav(a.mau, a.tu, a.den)
    lang = canh_bao_nhac_nen(wav)
    m = measure(wav)
    q = mfcc(wav)
    if m is None or q is None:
        sys.exit("  Không đo được: đoạn audio quá ngắn hoặc không có tiếng nói rõ.")

    print(f"  Số đo giọng mẫu:")
    print(f"    F0 (cao độ)        {m['f0']:6.1f} Hz")
    print(f"    Trọng tâm phổ      {m['centroid']:6.0f} Hz")
    print(f"    Biến thiên cao độ  {m['f0_var']:6.1f} Hz")
    print(f"    Dải động           {m['range']:6.1f} dB")

    gioi_do = "nữ" if m["f0"] > 155 else "nam"
    mong = "nữ" if a.gioi == "nu" else "nam"
    if gioi_do != mong:
        print(f"\n  ⚠ Bạn khai giọng {mong} nhưng F0 đo được {m['f0']:.0f}Hz — thiên về giọng {gioi_do}.")
        print(f"    Có thể đoạn cắt lẫn giọng người khác hoặc lẫn nhạc nền.")
    if lang is not None and lang < 0.04:
        print(f"\n  ⚠ Chỉ {lang * 100:.1f}% số khung im lặng — nhiều khả năng có NHẠC NỀN.")
        print(f"    Số đo sẽ lệch. Dùng --tu/--den để cắt lấy đoạn chỉ có tiếng nói.")

    dan = doc_dan_giong()
    vec = lap_ho_so(dan)
    cung = [v for v in dan if v["gioi"] == mong]
    M = np.array([vec[v["id"]] for v in dan])
    sd = M.std(axis=0) + 1e-9

    kc = {v["id"]: float(np.linalg.norm((q - vec[v["id"]]) / sd)) for v in cung}
    xep = sorted(cung, key=lambda v: kc[v["id"]])
    ds = [kc[v["id"]] for v in xep]

    print(f"\n  Dàn giọng {mong} xếp theo độ gần với mẫu:\n")
    print(f"    {'':2} {'Giọng':10} {'F0':>7} {'Phổ':>7}   Cách mẫu")
    for i, v in enumerate(xep, 1):
        sao = "★" if i == 1 else " "
        print(f"  {sao} {i}. {v['ten']:<10} {v['f0']:5.0f}Hz {v['centroid']:5.0f}Hz "
              f"{kc[v['id']]:9.2f}")

    khe = (ds[1] - ds[0]) / ds[0] if len(ds) > 1 and ds[0] > 0 else 0.0
    print()
    if khe >= 0.15:
        print(f"  {xep[0]['ten']} dẫn trước {xep[1]['ten']} {khe * 100:.0f}% — kết quả rõ ràng.")
    elif khe >= 0.06:
        print(f"  {xep[0]['ten']} dẫn trước {xep[1]['ten']} chỉ {khe * 100:.0f}% — nên nghe cả hai.")
    else:
        print(f"  {xep[0]['ten']} và {xep[1]['ten']} sát nhau ({khe * 100:.0f}%) — số đo không tách được.")
        print(f"  Phải nghe mới chọn.")

    if a.mo_rong:
        print(f"\n  Quét thêm {a.mo_rong} giọng thô của libritts…")
        from piper import PiperVoice, SynthesisConfig
        pv = PiperVoice.load(os.path.join(VOICES, "en-us-libritts-high.onnx"))
        them = []
        for sp in range(a.mo_rong):
            t = tempfile.mktemp(suffix=".wav")
            with wave.open(t, "wb") as w:
                pv.synthesize_wav(PROBE, w, syn_config=SynthesisConfig(speaker_id=sp))
            mm, qq = measure(t), mfcc(t)
            os.remove(t)
            if mm is None or qq is None:
                continue
            if (mm["f0"] > 155) != (a.gioi == "nu"):
                continue
            them.append((float(np.linalg.norm((q - qq) / sd)), sp, mm))
            if (sp + 1) % 25 == 0:
                print(f"    … {sp + 1}/{a.mo_rong}")
        them.sort()
        print(f"\n  Năm giọng thô gần mẫu nhất:\n")
        for d, sp, mm in them[:5]:
            dau = "  ← gần hơn cả dàn hiện tại" if d < ds[0] else ""
            print(f"    speaker {sp:<4} F0 {mm['f0']:5.0f}Hz  phổ {mm['centroid']:5.0f}Hz  "
                  f"cách {d:6.2f}{dau}")

    os.remove(wav)
    print(f"\n  Đây là danh sách rút gọn để BẠN NGHE, không phải phán quyết.")
    print(f"  Công cụ khớp chất giọng, không khớp giọng vùng miền hay ngữ điệu.\n")


if __name__ == "__main__":
    main()
