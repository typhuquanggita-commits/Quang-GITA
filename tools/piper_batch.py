#!/usr/bin/env python3
"""
Dựng hàng loạt câu bằng Piper, nạp mỗi model đúng một lần.

Nhận vào stdin một mảng JSON:
    [{"model": "...onnx", "text": "...", "out": "...wav",
      "length": 1.0, "noise": 0.6, "noise_w": 0.75}, ...]

Gọi trực tiếp piper qua thư viện Python thay vì chạy lại tiến trình cho từng
câu. Một tập podcast có ba mươi câu thì cách cũ nạp model ba mươi lần; cách này
nạp hai lần. Nhanh hơn khoảng một bậc.
"""
import json
import sys
import wave

from piper import PiperVoice, SynthesisConfig


def main() -> int:
    jobs = json.load(sys.stdin)
    cache: dict[str, PiperVoice] = {}
    done = 0

    for job in jobs:
        path = job["model"]
        if path not in cache:
            cache[path] = PiperVoice.load(path)
        voice = cache[path]

        cfg = SynthesisConfig(
            length_scale=job.get("length", 1.0),
            noise_scale=job.get("noise", 0.6),
            noise_w_scale=job.get("noise_w", 0.75),
            normalize_audio=True,
        )

        with wave.open(job["out"], "wb") as wav:
            voice.synthesize_wav(job["text"], wav, syn_config=cfg)
        done += 1

    print(json.dumps({"ok": True, "count": done, "models": len(cache)}))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:  # noqa: BLE001
        print(json.dumps({"ok": False, "error": str(exc)}), file=sys.stderr)
        sys.exit(1)
