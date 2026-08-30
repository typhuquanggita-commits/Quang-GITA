"""
@license
SPDX-License-Identifier: Apache-2.0

Sinh tệp âm cho toàn bộ kịch bản nghe.
Chạy: python3 tools/sinh-am-nghe.py

VÌ SAO SINH BẰNG MÁY CHỨ KHÔNG THU NGƯỜI THẬT
  Ba mươi kịch bản, bốn giọng, và mỗi lần sửa một chữ là phải thu lại. Thu
  người thật cho từng bản nháp là không khả thi. Sinh bằng máy thì lời trong
  data/nghe.ts LUÔN khớp với tiếng phát ra — không có đường lệch.

  Đổi lại, giọng máy đọc rõ hơn người thật. Giới hạn đó ghi thẳng trong
  NGHE_CREED chứ không giấu: phần bắt thông tin luyện tốt, phần đoán thái độ
  qua giọng thì không thay được người thật.

BA NÚM ĐỘ KHÓ ĐỀU THẬT, KHÔNG PHẢI NHÃN DÁN
  · nhịp nói — kịch bản khai SỐ TỪ MỖI PHÚT mong muốn, không khai hệ số dài
               âm. Lý do: cùng một hệ số cho ra tốc độ khác hẳn trên từng
               giọng — anh-nam đọc 154 từ/phút ở hệ số 1.0 còn my-nam đọc
               248. Nên bộ sinh chạy HAI LƯỢT: lượt một sinh thử ở hệ số 1.0
               và đo nhịp thật, lượt hai tính lại hệ số để chạm đúng đích.
               Nhờ vậy nhãn "230 từ/phút" là con số đo được, không phải mong
               muốn suông.
  · giọng   — bốn model khác nhau, Mỹ và Anh-Anh, nam và nữ
  · nhiễu   — trộn tạp âm trắng ở đúng tỉ số tín hiệu trên nhiễu đã khai,
              tính bằng công suất thật của từng tệp chứ không nhân một hằng số
"""
import json
import os
import re
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np
from piper import PiperVoice, SynthesisConfig

GOC = Path(__file__).resolve().parent.parent
RA = GOC / "audio" / "nghe"
GIONG_DIR = Path(os.path.expanduser("~/.local/share/piper-voices"))

# Đọc bảng kịch bản từ chính data/nghe.ts. Không chép lại danh sách sang đây:
# hai bản danh sách là hai chỗ để lệch nhau.
def doc_kich_ban():
    src = (GOC / "data" / "nghe.ts").read_text(encoding="utf-8")
    khoi = src[src.index("export const KICH_BAN"): src.index("export const kichBanCuaChuyenDe")]
    ra = []
    for m in re.finditer(r"\{\s*\n?\s*id: '([^']+)'.*?\n\s*\},", khoi, re.S):
        cum = m.group(0)
        def lay(ten, mac_dinh=None):
            r = re.search(rf"{ten}: '([^']*)'", cum) or re.search(rf"{ten}: ([0-9.]+)", cum)
            return r.group(1) if r else mac_dinh
        loi = re.search(r"loi:\s*'((?:[^'\\]|\\.)*)'", cum, re.S)
        if not loi:
            continue
        ra.append({
            "id": m.group(1),
            "giong": lay("giong"),
            "nhipTu": float(lay("nhipTu", "160")),
            "nhieuDb": float(lay("nhieuDb")) if lay("nhieuDb") else None,
            "loi": loi.group(1).replace("\\'", "'"),
        })
    return ra


TEP_GIONG = {
    "my-nu": "en-us-lessac-medium",
    "my-nam": "en-us-libritts-high",
    "anh-nu": "en-gb-southern_english_female-low",
    "anh-nam": "en-gb-alan-low",
}


def tron_nhieu(duong_wav: Path, snr_db: float) -> None:
    """Trộn tạp âm trắng ở đúng tỉ số tín hiệu trên nhiễu đã khai.

    Tính theo công suất THẬT của từng tệp. Nhân một hằng số cố định thì tệp
    to sẽ nghe sạch còn tệp nhỏ sẽ chìm hẳn — cùng một nhãn "10 dB" mà độ khó
    khác nhau, tức là nhãn nói dối.
    """
    with wave.open(str(duong_wav), "rb") as w:
        tham_so = w.getparams()
        khung = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64)
    cong_suat_tin = np.mean(khung ** 2)
    cong_suat_nhieu = cong_suat_tin / (10 ** (snr_db / 10))
    nhieu = np.random.default_rng(12345).normal(0, np.sqrt(cong_suat_nhieu), khung.shape)
    tron = np.clip(khung + nhieu, -32768, 32767).astype(np.int16)
    with wave.open(str(duong_wav), "wb") as w:
        w.setparams(tham_so)
        w.writeframes(tron.tobytes())


def do_giay(duong: Path) -> float:
    """Độ dài thật của một tệp âm, tính bằng giây."""
    r = subprocess.run(
        ["ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", str(duong)],
        capture_output=True, text=True,
    )
    return float(json.loads(r.stdout)["format"]["duration"])


def main() -> int:
    RA.mkdir(parents=True, exist_ok=True)
    kbs = doc_kich_ban()
    if not kbs:
        print("  ✗ không đọc được kịch bản nào từ data/nghe.ts")
        return 1
    print(f"\n  SINH ÂM CHO {len(kbs)} KỊCH BẢN NGHE\n")

    nho: dict[str, PiperVoice] = {}
    tong = 0
    for kb in kbs:
        tep_model = TEP_GIONG[kb["giong"]]
        if tep_model not in nho:
            duong = GIONG_DIR / f"{tep_model}.onnx"
            if not duong.exists():
                print(f"  ✗ thiếu giọng {tep_model} — chạy bash tools/fetch-voices.sh")
                return 1
            nho[tep_model] = PiperVoice.load(str(duong))
        giong = nho[tep_model]

        so_tu = len(kb["loi"].split())
        wav = RA / f"{kb['id']}.wav"

        # LẶP TỚI KHI CHẠM ĐÍCH.
        #
        # Hai lượt không đủ: quan hệ giữa hệ số dài âm và nhịp nói KHÔNG
        # tuyến tính hoàn toàn — khoảng lặng đầu cuối và ngắt câu không giãn
        # cùng tỉ lệ với âm tiết. Ở đích 130 từ/phút, một lượt hiệu chỉnh
        # mới xuống tới 153, còn lệch 18%.
        #
        # Nên lặp: mỗi lượt đo lại rồi chỉnh hệ số theo đúng tỉ lệ còn lệch.
        # Vùng chậm cần nhiều lượt hơn: giọng my-nam đi từ 233 xuống 130 từ
        # mỗi phút phải qua hệ số hơn 2.0, và mỗi lượt chỉ khép được một
        # phần khoảng cách. Tám lượt là thừa cho mọi kịch bản đã có; ra khỏi
        # vòng ngay khi lệch dưới 2% để không sinh lại vô ích.
        he_so = 1.0
        nhip_that = 0.0
        for _ in range(8):
            with wave.open(str(wav), "wb") as w:
                giong.synthesize_wav(kb["loi"], w, SynthesisConfig(length_scale=he_so))
            nhip_that = so_tu / do_giay(wav) * 60
            if abs(nhip_that - kb["nhipTu"]) / kb["nhipTu"] < 0.02:
                break
            he_so *= nhip_that / kb["nhipTu"]

        if kb["nhieuDb"] is not None:
            tron_nhieu(wav, kb["nhieuDb"])

        mp3 = RA / f"{kb['id']}.mp3"
        r = subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav), "-b:a", "64k", str(mp3)],
            capture_output=True,
        )
        wav.unlink()
        if r.returncode != 0:
            print(f"  ✗ ffmpeg hỏng ở {kb['id']}: {r.stderr.decode()[:120]}")
            return 1
        cỡ = mp3.stat().st_size
        tong += cỡ
        lech = abs(nhip_that - kb["nhipTu"]) / kb["nhipTu"] * 100
        nhan = f"{kb['giong']:<8} đích {kb['nhipTu']:.0f} → thật {nhip_that:.0f} wpm (lệch {lech:.1f}%)"
        if kb["nhieuDb"]:
            nhan += f" · nhiễu {kb['nhieuDb']:.0f}dB"
        if lech > 8:
            print(f"  ✗ {kb['id']:<12} {nhan}")
            return 1
        print(f"  ✓ {kb['id']:<12} {cỡ // 1024:>4} kB   {nhan}")

    print(f"\n  ĐẠT — {len(kbs)} tệp, tổng {tong / 1024 / 1024:.2f} MB\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
