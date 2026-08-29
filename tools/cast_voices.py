#!/usr/bin/env python3
"""
Tuyển giọng cho ENGWILL RADIO.

    python3 tools/cast_voices.py --scan 140      # sàng lọc 140 ứng viên
    python3 tools/cast_voices.py --reel          # dựng băng audition từ danh sách đã lọc

Model en-us-libritts-high có 904 giọng. Nghe hết là không khả thi, nên bước một
là SÀNG LỌC BẰNG SỐ ĐO: tần số cơ bản để tách nam/nữ và ước lượng độ trẻ, độ vang
và dải động để lọc giọng khoẻ, độ sáng phổ để lọc giọng rõ. Bước hai mới là nghe.

Tiêu chí đặt theo yêu cầu: nam nữ 20–28 tuổi, khoẻ, to, rõ ràng.
Giọng trẻ thường có F0 cao hơn và phổ sáng hơn giọng trung niên.
"""
import argparse
import json
import math
import os
import subprocess
import sys
import wave

import numpy as np
from piper import PiperVoice, SynthesisConfig

VOICES = os.path.expanduser("~/.local/share/piper-voices/")
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "audio", "casting")

# Câu thử: đủ dài để đo ổn định, có cả nguyên âm mở lẫn phụ âm xát để lộ độ rõ.
PROBE = ("Right, let's get straight into today's session. "
         "Listen carefully, repeat after me, and don't worry about mistakes.")


def measure(path):
    """Đo bốn chỉ số âm học từ một file wav."""
    with wave.open(path, "rb") as w:
        sr = w.getframerate()
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64)
    if x.size < sr // 2:
        return None
    x /= 32768.0

    # Khung 40ms, chỉ giữ khung có tiếng.
    n = int(0.04 * sr)
    frames = [x[i:i + n] for i in range(0, len(x) - n, n // 2)]
    rms = np.array([math.sqrt(float(np.mean(f ** 2)) + 1e-12) for f in frames])
    voiced = [f for f, r in zip(frames, rms) if r > rms.max() * 0.25]
    if len(voiced) < 8:
        return None

    # F0 bằng tự tương quan, giới hạn 70–320Hz.
    f0s = []
    lo, hi = int(sr / 320), int(sr / 70)
    for f in voiced:
        f = f - f.mean()
        ac = np.correlate(f, f, mode="full")[len(f) - 1:]
        seg = ac[lo:hi]
        if seg.size and ac[0] > 0:
            k = int(np.argmax(seg)) + lo
            if ac[k] / ac[0] > 0.3:
                f0s.append(sr / k)
    if len(f0s) < 5:
        return None

    # Độ sáng phổ — proxy cho độ rõ của phụ âm.
    spec = np.abs(np.fft.rfft(np.concatenate(voiced) * np.hanning(len(np.concatenate(voiced)))))
    freqs = np.fft.rfftfreq(len(np.concatenate(voiced)), 1 / sr)
    centroid = float(np.sum(freqs * spec) / (np.sum(spec) + 1e-12))

    db = 20 * np.log10(rms + 1e-12)
    return {
        "f0": float(np.median(f0s)),
        "f0_var": float(np.std(f0s)),          # biến thiên cao độ — giọng dẫn sinh động
        "centroid": centroid,                   # độ sáng — độ rõ phụ âm
        "level": float(np.median(db[rms > rms.max() * 0.25])),
        "range": float(np.percentile(db, 95) - np.percentile(db, 20)),
    }


def score(m):
    """Chấm điểm theo tiêu chí: trẻ, khoẻ, rõ, sinh động."""
    female = m["f0"] > 155
    # Vùng F0 lý tưởng cho giọng 20–28 tuổi.
    ideal = 205 if female else 122
    youth = max(0.0, 1 - abs(m["f0"] - ideal) / 70)
    # Độ rõ: phổ sáng nhưng không chói.
    clarity = max(0.0, 1 - abs(m["centroid"] - 1700) / 1400)
    # Sinh động: có biến thiên cao độ, nhưng không lạc giọng.
    lively = max(0.0, 1 - abs(m["f0_var"] - 26) / 34)
    # Khoẻ: dải động vừa phải, không bẹt cũng không nhảy loạn.
    strong = max(0.0, 1 - abs(m["range"] - 17) / 15)
    return 0.32 * youth + 0.30 * clarity + 0.22 * lively + 0.16 * strong, female


def scan(n_scan):
    os.makedirs(OUT, exist_ok=True)
    cfgp = json.load(open(VOICES + "en-us-libritts-high.onnx.json"))
    total = cfgp["num_speakers"]
    ids = list(range(0, total, max(1, total // n_scan)))[:n_scan]

    print(f"\n  Sàng lọc {len(ids)}/{total} giọng của en-us-libritts-high\n")
    voice = PiperVoice.load(VOICES + "en-us-libritts-high.onnx")
    tmp = os.path.join(OUT, "_probe.wav")
    rows = []
    for i, sid in enumerate(ids):
        cfg = SynthesisConfig(speaker_id=sid, length_scale=1.0, noise_scale=0.55,
                              noise_w_scale=0.7, normalize_audio=True)
        try:
            with wave.open(tmp, "wb") as w:
                voice.synthesize_wav(PROBE, w, syn_config=cfg)
            m = measure(tmp)
        except Exception:
            m = None
        if m:
            s, female = score(m)
            rows.append({"speaker": sid, "score": round(s, 4),
                         "gender": "nữ" if female else "nam", **{k: round(v, 1) for k, v in m.items()}})
        if (i + 1) % 20 == 0:
            print(f"    đã đo {i + 1}/{len(ids)}")
    os.path.exists(tmp) and os.remove(tmp)

    rows.sort(key=lambda r: -r["score"])
    top = {"nam": [r for r in rows if r["gender"] == "nam"][:5],
           "nữ": [r for r in rows if r["gender"] == "nữ"][:5]}
    manifest = {"model": "en-us-libritts-high", "scanned": len(rows), "shortlist": top}
    json.dump(manifest, open(os.path.join(OUT, "shortlist.json"), "w"),
              ensure_ascii=False, indent=2)

    print(f"\n  Đo được {len(rows)} giọng. Tốp 5 mỗi giới:\n")
    print(f"    {'':4}{'giọng':>7} {'điểm':>6} {'F0':>6} {'sáng':>7} {'biến thiên':>11}")
    for g in ("nam", "nữ"):
        for k, r in enumerate(top[g], 1):
            print(f"    {g if k == 1 else '':4}{r['speaker']:>7} {r['score']:>6.3f} "
                  f"{r['f0']:>5.0f}Hz {r['centroid']:>6.0f}Hz {r['f0_var']:>10.0f}")
    print(f"\n  → {os.path.join(OUT, 'shortlist.json')}\n")
    return manifest


def reel(manifest=None):
    """Dựng băng audition: mỗi ứng viên tự xưng số rồi đọc câu mẫu."""
    path = os.path.join(OUT, "shortlist.json")
    manifest = manifest or json.load(open(path))
    voice = PiperVoice.load(VOICES + manifest["model"] + ".onnx")

    cands = []
    for g in ("nam", "nữ"):
        cands += [(r["speaker"], g) for r in manifest["shortlist"][g]]

    files = []
    for i, (sid, g) in enumerate(cands, 1):
        cfg = SynthesisConfig(speaker_id=sid, length_scale=1.06, noise_scale=0.55,
                              noise_w_scale=0.7, normalize_audio=True)
        raw = os.path.join(OUT, f"_c{i}.wav")
        with wave.open(raw, "wb") as w:
            voice.synthesize_wav(f"Voice number {i}. {PROBE}", w, syn_config=cfg)
        norm = os.path.join(OUT, f"_n{i}.wav")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", raw, "-af",
                        "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.02:detection=peak,"
                        "areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.02:detection=peak,"
                        "afade=t=in:d=0.014,areverse,afade=t=in:d=0.014,highpass=f=75",
                        "-ar", "22050", "-ac", "1", norm], check=True)
        files.append(norm)
        os.remove(raw)
        print(f"    {i:>2}. giọng {sid} ({g})")

    gap = os.path.join(OUT, "_gap.wav")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i",
                    "anoisesrc=color=brown:sample_rate=22050:amplitude=1", "-t", "0.8",
                    "-af", "volume=-68dB", "-ac", "1", gap], check=True)

    lst = os.path.join(OUT, "_list.txt")
    with open(lst, "w") as f:
        for p in files:
            f.write(f"file '{p}'\nfile '{gap}'\n")

    mp3 = os.path.join(OUT, "audition-10-giong-anh.mp3")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0",
                    "-i", lst, "-af",
                    "highpass=f=70,equalizer=f=3000:t=q:w=1.1:g=2.2,"
                    "equalizer=f=180:t=q:w=1.0:g=-1.4,"
                    "acompressor=threshold=-20dB:ratio=2.4:attack=8:release=180:makeup=1.5,"
                    "loudnorm=I=-16:TP=-1.5:LRA=9",
                    "-ar", "44100", "-b:a", "128k", mp3], check=True)
    for p in files + [gap, lst]:
        os.path.exists(p) and os.remove(p)
    print(f"\n  → {mp3}\n")
    return mp3


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--scan", type=int, default=0)
    ap.add_argument("--reel", action="store_true")
    a = ap.parse_args()
    man = scan(a.scan) if a.scan else None
    if a.reel:
        reel(man)
    if not a.scan and not a.reel:
        ap.print_help()
