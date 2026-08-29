#!/usr/bin/env python3
"""
Đo ĐỘ CHÍNH XÁC THẬT của công cụ khớp giọng.

Cách đo: lấy chính 10 giọng của dàn, dựng lại bằng một câu CHƯA từng dùng để
đo, rồi hỏi công cụ "giọng này giống ai nhất". Đáp án đúng đã biết trước.

Đây là phép thử tự thân — nó chỉ nói lên công cụ có nhận ra chính giọng của
mình hay không. Nó KHÔNG nói lên công cụ khớp giọng người thật tốt đến đâu.
"""
import os, sys, wave, tempfile
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from khop_giong_lib import doc_dan_giong
from dac_trung_giong import mfcc
import importlib.util
_sp = importlib.util.spec_from_file_location('kg', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'khop-giong.py'))
kg = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(kg)
from piper import PiperVoice, SynthesisConfig

V = os.path.expanduser("~/.local/share/piper-voices/en-us-libritts-high.onnx")
# Câu này KHÔNG phải câu dùng lúc đo dàn giọng — nếu dùng lại thì phép thử vô nghĩa.
CAU = ("So here is what I want you to try before our next session. "
       "Pick one situation, practise it out loud ten times, and record yourself on the last one.")

voice = PiperVoice.load(V)
dan = doc_dan_giong()
vec = kg.lap_ho_so(dan)
_M = np.array([vec[v["id"]] for v in dan])
sd = _M.std(axis=0) + 1e-9
tmp = tempfile.mktemp(suffix=".wav")

dung_1, dung_2, trong_nhieu, tong = 0, 0, 0, 0
print("\n  ĐỘ CHÍNH XÁC CỦA CÔNG CỤ KHỚP GIỌNG\n")
for v in dan:
    with wave.open(tmp, "wb") as w:
        voice.synthesize_wav(CAU, w, syn_config=SynthesisConfig(speaker_id=v["speaker"]))
    q = mfcc(tmp)
    cung_gioi = [x for x in dan if x["gioi"] == v["gioi"]]
    kc = {x["id"]: float(np.linalg.norm((q - vec[x["id"]]) / sd)) for x in cung_gioi}
    xep = sorted(cung_gioi, key=lambda x: kc[x["id"]])
    ds = [kc[x["id"]] for x in xep]
    vi_tri = [x["id"] for x in xep].index(v["id"]) + 1
    hoa = 1 + sum(1 for d in ds[1:] if (d - ds[0]) / ds[0] < 0.06)
    tong += 1
    dung_1 += vi_tri == 1
    dung_2 += vi_tri <= 2
    trong_nhieu += hoa > 1
    dau = "✓" if vi_tri == 1 else ("~" if vi_tri == 2 else "✗")
    print(f"  {dau} {v['ten']:<6} ({v['gioi']}) → xếp hạng {vi_tri}/{len(cung_gioi)}"
          f"   {hoa} giọng sát nhau dưới 6%")
os.remove(tmp)

print(f"\n  Đúng ở hạng 1: {dung_1}/{tong}  ({dung_1*100//tong}%)")
print(f"  Đúng trong 2 hạng đầu: {dung_2}/{tong}  ({dung_2*100//tong}%)")
print(f"  Số lần hạng nhất và hạng nhì sát nhau dưới 6%: {trong_nhieu}/{tong}")
print(f"\n  Đọc con số này cho đúng: công cụ thu hẹp lựa chọn, không thay tai người.\n")
