#!/usr/bin/env python3
"""
Kiểm xem một model Piper có biểu diễn được THANH ĐIỆU tiếng Việt không.

    python3 tools/kiem-am-viet.py

VÌ SAO PHẢI CÓ BÀI KIỂM NÀY
  Giọng Việt do Piper sinh ra bị người nghe bản ngữ nhận xét là "không chuẩn"
  dù từng âm tiết nghe rõ. Nguyên nhân không nằm ở khâu trộn âm hay ở tần số
  lấy mẫu, mà nằm sâu hơn nhiều:

  espeak-ng phiên âm tiếng Việt CÓ kèm thanh điệu, mã hoá bằng chữ số:
      "Tôi học tiếng Anh" →  t̪ˈo1j  hˈɔ6k  t̪ˈiɛɜŋ  ˈe-1ɲ
  Những chữ số 1, 2, 4, 5, 6 chính là sáu thanh của tiếng Việt.

  Nhưng bản đồ âm vị của model Piper là BẢNG IPA DÙNG CHUNG cho mọi ngôn ngữ,
  130 ký hiệu, và trong đó KHÔNG có một ký hiệu thanh điệu nào. Mọi chữ số bị
  loại bỏ im lặng trước khi vào model.

  Hệ quả: model không bao giờ nhận được thông tin thanh điệu — kể cả lúc huấn
  luyện. Nó chỉ có thể đoán một thanh trung bình. Với tiếng Việt, nơi thanh
  điệu mang nghĩa, đó là lỗi không sửa được bằng hậu kỳ.

  Bài kiểm này đo tỉ lệ âm vị bị rơi để kết luận đó có bằng chứng, không phải
  bằng cảm tính.
"""
import collections
import json
import os
import subprocess
import sys

VOICES = os.path.expanduser("~/.local/share/piper-voices/")
THANH = set("123456")

CAU_THU = [
    "Tôi học tiếng Anh mỗi ngày.",
    "Chào bạn, đây là Engwin Radio.",
    "Vì sao bạn nghe không ra, dù biết hết các từ?",
    "Hôm nay chúng ta sẽ nói về một câu hỏi rất nhiều người gặp phải.",
    "Bảy ngày liên tiếp, mỗi ngày hai mươi phút.",
    "Ma, mà, mả, mã, má, mạ — sáu thanh khác nhau, sáu nghĩa khác nhau.",
]


def ipa(cau, giong="vi"):
    r = subprocess.run(
        ["espeak-ng", "-v", giong, "--ipa", "-q", cau],
        capture_output=True, text=True,
    )
    return r.stdout.strip()


def kiem(ten_model):
    p = os.path.join(VOICES, ten_model + ".onnx.json")
    if not os.path.exists(p):
        return None
    d = json.load(open(p, encoding="utf-8"))
    pid = set(d["phoneme_id_map"].keys())

    tong = roi = 0
    rot = collections.Counter()
    for c in CAU_THU:
        for ch in ipa(c):
            if ch in " \n":
                continue
            tong += 1
            if ch not in pid:
                roi += 1
                rot[ch] += 1
    so_thanh = sum(n for ch, n in rot.items() if ch in THANH)
    return {
        "so_ky_hieu": len(pid),
        "sample_rate": d.get("audio", {}).get("sample_rate"),
        "co_thanh": sorted(pid & THANH),
        "tong": tong,
        "roi": roi,
        "thanh_roi": so_thanh,
        "rot": rot,
    }


def main():
    models = [f[:-10] for f in sorted(os.listdir(VOICES)) if f.endswith(".onnx.json")]
    viet = [m for m in models if m.startswith("vi-")]
    if not viet:
        sys.exit("Không thấy model tiếng Việt nào trong " + VOICES)

    print("\n  KIỂM THANH ĐIỆU TIẾNG VIỆT TRÊN MODEL PIPER\n")
    print("  Mẫu phiên âm espeak-ng — các chữ số là thanh điệu:")
    print(f"    {ipa(CAU_THU[-1])}\n")

    hong = 0
    for m in viet:
        k = kiem(m)
        if not k:
            continue
        dat = len(k["co_thanh"]) == 6
        hong += not dat
        print(f"  {'✓' if dat else '✗'} {m}")
        print(f"      bản đồ âm vị     : {k['so_ky_hieu']} ký hiệu")
        print(f"      tần số lấy mẫu   : {k['sample_rate']} Hz"
              f"{'  ← hẹp băng thông, mất dải trên 8 kHz' if k['sample_rate'] and k['sample_rate'] <= 16000 else ''}")
        print(f"      ký hiệu thanh    : "
              f"{k['co_thanh'] if k['co_thanh'] else 'KHÔNG CÓ — không biểu diễn được thanh điệu'}")
        print(f"      âm vị bị bỏ qua  : {k['roi']}/{k['tong']} "
              f"({k['roi'] / k['tong'] * 100:.1f}%), "
              f"trong đó {k['thanh_roi']} là dấu thanh")
        top = ", ".join(
            f"{ch!r}×{n}{' (thanh)' if ch in THANH else ''}"
            for ch, n in k["rot"].most_common(6)
        )
        print(f"      rơi nhiều nhất   : {top}\n")

    if hong:
        print("  KẾT LUẬN")
        print("  Không model Piper tiếng Việt nào ở đây biểu diễn được thanh điệu.")
        print("  Đây là giới hạn của bảng ký hiệu dùng chung 130 ký tự mà Piper dùng")
        print("  cho mọi ngôn ngữ, không phải lỗi cấu hình. Hậu kỳ không sửa được:")
        print("  thông tin thanh điệu chưa từng đi vào model.")
        print()
        print("  Muốn giọng Việt chuẩn thanh điệu, phải đổi nguồn tổng hợp:")
        print("    npm run podcast -- --tts=google   (vi-VN-Neural2 / Wavenet, 24 kHz)")
        print("    npm run podcast -- --tts=gemini")
        print("  hoặc thu giọng người thật.\n")
    else:
        print("  KẾT LUẬN: model biểu diễn đủ sáu thanh.\n")
    return 1 if hong else 0


if __name__ == "__main__":
    sys.exit(main())
