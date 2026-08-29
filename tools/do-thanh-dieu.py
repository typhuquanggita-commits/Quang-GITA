#!/usr/bin/env python3
"""
Đo THANH ĐIỆU trong một file audio tiếng Việt, bằng số chứ không bằng cảm tính.

    python3 tools/do-thanh-dieu.py mau.wav
    python3 tools/do-thanh-dieu.py a.wav b.wav --so-sanh

VÌ SAO CẦN CÔNG CỤ NÀY
  tools/kiem-am-viet.py chứng minh được rằng bản đồ âm vị của Piper KHÔNG chứa
  ký hiệu thanh điệu — tức là lỗi nằm ở đầu vào của model. Nhưng nó chỉ soi
  được model Piper. Muốn chọn nguồn tổng hợp giọng cho cả sản phẩm thì phải đo
  được ĐẦU RA của bất kỳ nguồn nào: Google, FPT, Vbee, VieNeu, hay bản thu
  người thật. Công cụ này đo trên sóng âm nên áp cho mọi nguồn như nhau.

ĐO CÁI GÌ
  Bài thử là sáu âm tiết chỉ khác nhau ở thanh:  ma  mà  mả  mã  má  mạ
  Đọc đúng tiếng Việt thì sáu đường cao độ này TÁCH HẲN nhau. Đọc không có
  thanh thì chúng gần như trùng nhau. Vậy chỉ cần đo độ tách là đủ kết luận,
  KHÔNG cần một bộ phân loại thanh — và nhờ thế phép đo không mang theo sai số
  của bộ phân loại đó.

    tach_tb    khoảng cách trung bình giữa 15 cặp đường, tính bằng nửa cung
    tach_min   cặp gần nhau nhất — cặp dễ nghe nhầm nhất
    huong      dấu của (cao độ cuối trừ cao độ đầu) cho từng âm tiết

NÓI RÕ GIỚI HẠN CỦA CHÍNH NÓ
  Ngưỡng "đạt" ở đây CHƯA hiệu chuẩn bằng bản thu người bản ngữ, vì phiên làm
  việc này không có sẵn bản thu nào. Vì vậy công cụ chỉ khẳng định một chiều:
  dưới 1,5 nửa cung thì chắc chắn là KHÔNG có thanh điệu — sáu đường trùng
  nhau tới mức đó thì không cách nào là tiếng Việt đúng. Còn trên mức đó, hãy
  dùng --so-sanh để xếp hạng các nguồn với nhau, và hiệu chuẩn lại ngưỡng khi
  có bản thu người thật bằng chính lệnh này.
"""
import argparse
import math
import os
import subprocess
import sys
import tempfile
import wave

import numpy as np

SR = 16000
KHUNG = 0.040          # cửa sổ 40ms
BUOC = 0.010           # bước 10ms
F0_MIN, F0_MAX = 70.0, 400.0
DIEM = 10              # số điểm chuẩn hoá trên mỗi đường cao độ
NGUONG_PHANG = 1.5     # dưới mức này (nửa cung) thì coi là đường phẳng

# Sáu thanh, viết theo đúng thứ tự bài thử.
BAI_THU = ["ma", "mà", "mả", "mã", "má", "mạ"]
TEN_THANH = ["ngang", "huyền", "hỏi", "ngã", "sắc", "nặng"]
# Hướng mong đợi ở cuối âm tiết: +1 lên, -1 xuống, 0 gần phẳng.
HUONG_MONG = [0, -1, -1, +1, +1, -1]


def doc_wav(duong: str) -> np.ndarray:
    """Giải mã bất kỳ định dạng nào về một dãy mẫu 16 kHz một kênh."""
    with tempfile.TemporaryDirectory() as tmp:
        wav = os.path.join(tmp, "x.wav")
        r = subprocess.run(
            ["ffmpeg", "-v", "error", "-y", "-i", duong,
             "-ac", "1", "-ar", str(SR), "-f", "wav", wav],
            capture_output=True, text=True,
        )
        if r.returncode != 0:
            sys.exit(f"  Không đọc được {duong}\n  {r.stderr.strip()[:300]}")
        with wave.open(wav, "rb") as w:
            raw = w.readframes(w.getnframes())
    x = np.frombuffer(raw, dtype=np.int16).astype(np.float64) / 32768.0
    return x


def tach_am_tiet(x: np.ndarray, can: int) -> list[np.ndarray]:
    """
    Cắt dãy mẫu thành đúng `can` đoạn theo khoảng lặng.

    Ngưỡng lặng dò dần chứ không đặt cứng: mỗi nguồn tổng hợp chèn lượng lặng
    khác nhau, đặt cứng một ngưỡng thì nguồn này cắt đúng nguồn kia cắt sai.
    """
    n = int(KHUNG * SR)
    b = int(BUOC * SR)
    nang = np.array([
        float(np.sqrt(np.mean(x[i:i + n] ** 2)))
        for i in range(0, max(1, len(x) - n), b)
    ])
    if not len(nang) or nang.max() <= 0:
        return []
    for ty in [0.02, 0.03, 0.05, 0.08, 0.12, 0.18, 0.25]:
        nguong = nang.max() * ty
        keu = nang > nguong
        doan, dau = [], None
        for i, k in enumerate(keu):
            if k and dau is None:
                dau = i
            elif not k and dau is not None:
                if i - dau >= 5:            # bỏ đoạn ngắn hơn 50ms
                    doan.append((dau, i))
                dau = None
        if dau is not None and len(keu) - dau >= 5:
            doan.append((dau, len(keu)))
        if len(doan) == can:
            return [x[d * b:c * b + n] for d, c in doan]
    return []


def f0_khung(khung: np.ndarray) -> float:
    """Cao độ của một cửa sổ, bằng tự tương quan. Trả 0 nếu không rung thanh."""
    k = khung - khung.mean()
    if np.sqrt(np.mean(k ** 2)) < 1e-3:
        return 0.0
    r = np.correlate(k, k, mode="full")[len(k) - 1:]
    if r[0] <= 0:
        return 0.0
    lo, hi = int(SR / F0_MAX), min(int(SR / F0_MIN), len(r) - 1)
    if hi <= lo:
        return 0.0
    cua = r[lo:hi]
    i = int(np.argmax(cua)) + lo
    # Rung thanh thật thì đỉnh tự tương quan phải nổi rõ so với gốc.
    if r[i] / r[0] < 0.30:
        return 0.0
    return SR / i


def duong_cao_do(doan: np.ndarray) -> np.ndarray:
    """Đường cao độ đã chuẩn hoá về `DIEM` điểm, tính bằng nửa cung."""
    n = int(KHUNG * SR)
    b = int(BUOC * SR)
    f0 = np.array([
        f0_khung(doan[i:i + n]) for i in range(0, max(1, len(doan) - n), b)
    ])
    co = f0[f0 > 0]
    if len(co) < 4:
        return np.zeros(DIEM)
    # Bỏ hai đầu: chuyển tiếp phụ âm hay cho cao độ rác.
    idx = np.where(f0 > 0)[0]
    f0 = f0[idx[0]:idx[-1] + 1]
    f0 = np.where(f0 > 0, f0, np.nan)
    # Nội suy chỗ mất rung để đường liền, nhưng giữ nguyên độ dài thật.
    hop = np.isnan(f0)
    if hop.all():
        return np.zeros(DIEM)
    f0[hop] = np.interp(np.flatnonzero(hop), np.flatnonzero(~hop), f0[~hop])
    goc = np.median(f0)
    nua_cung = 12.0 * np.log2(f0 / goc)
    return np.interp(np.linspace(0, 1, DIEM), np.linspace(0, 1, len(f0)), nua_cung)


def do_cac_duong(duong_cd: list[np.ndarray], dai: list[float]) -> dict:
    """Tính các số đo từ sáu đường cao độ đã chuẩn hoá."""
    khoang = []
    for i in range(len(duong_cd)):
        for j in range(i + 1, len(duong_cd)):
            khoang.append(float(np.sqrt(np.mean((duong_cd[i] - duong_cd[j]) ** 2))))
    # Thanh ngang phải PHẲNG, nên không chấm bằng dấu mà bằng độ lệch: dưới
    # NGUONG_PHANG nửa cung mới coi là phẳng. Nếu chỉ xét dấu thì một đường
    # đi lên bốn nửa cung vẫn được tính đúng cho thanh ngang — đó là chấm sai.
    huong = []
    for c in duong_cd:
        d = float(c[-1] - c[0])
        huong.append(0 if abs(d) < NGUONG_PHANG else int(np.sign(d)))
    return {
        "tach_tb": float(np.mean(khoang)),
        "tach_min": float(np.min(khoang)),
        "huong": huong,
        "dai": dai,
        "duong": [c.tolist() for c in duong_cd],
    }


def tu_kiem() -> int:
    """
    Tự kiểm bộ đo bằng ba tín hiệu có cao độ BIẾT TRƯỚC.

    Không có bước này thì con số "0,16 nửa cung" ở phần trên vô nghĩa: nó có
    thể là dấu hiệu nguồn tổng hợp không có thanh điệu, mà cũng có thể chỉ là
    bộ dò cao độ hỏng. Ba tín hiệu dưới đây tách hai khả năng đó ra.

    Sai số đã biết: bộ đo báo thiếu khoảng 0,65 nửa cung trên một đường trượt
    7,02 nửa cung, tức khoảng 9%, do hai đầu đường bị cửa sổ 40ms cắt bớt. Sai
    số này lệch về phía AN TOÀN — nó làm nhỏ độ tách chứ không làm to, nên
    không thể tạo ra kết luận "có thanh điệu" giả.
    """
    print("\n  TỰ KIỂM BỘ ĐO\n")
    bai = [("phẳng", 200.0, 200.0), ("lên", 200.0, 300.0), ("xuống", 300.0, 200.0)]
    xau = 0
    with tempfile.TemporaryDirectory() as tmp:
        for ten, f1, f2 in bai:
            t = np.arange(int(SR * 0.5)) / SR
            f = np.linspace(f1, f2, len(t))
            pha = 2 * np.pi * np.cumsum(f) / SR
            # Có hài thì mới giống giọng người; tự tương quan cần hài để bám.
            x = 0.5 * np.sin(pha) + 0.3 * np.sin(2 * pha) + 0.15 * np.sin(3 * pha)
            x = (x / np.max(np.abs(x)) * 0.8 * 32767).astype(np.int16)
            duong = os.path.join(tmp, f"{ten}.wav")
            with wave.open(duong, "wb") as w:
                w.setnchannels(1)
                w.setsampwidth(2)
                w.setframerate(SR)
                w.writeframes(x.tobytes())
            mong = 12.0 * math.log2(f2 / f1)
            c = duong_cao_do(doc_wav(duong))
            do = float(c[-1] - c[0])
            dat = abs(do - mong) <= 1.0
            xau += 0 if dat else 1
            print(f"    {'✓' if dat else '✗'} {ten:6s} đo {do:+6.2f} nửa cung, "
                  f"mong {mong:+6.2f}, lệch {do - mong:+5.2f}")
    print("\n  " + ("ĐẠT — bộ đo bám đúng cao độ\n" if xau == 0
                    else f"HỎNG — {xau} phép sai\n"))
    return xau


def do_mot_tep(duong: str, can: int = 6) -> dict:
    """Một file chứa cả sáu âm tiết, cách nhau bằng khoảng lặng."""
    x = doc_wav(duong)
    doan = tach_am_tiet(x, can)
    if not doan:
        return {"loi": f"không tách được đúng {can} âm tiết — hãy thu rời từng "
                       f"âm tiết rồi dùng --rieng"}
    return do_cac_duong([duong_cao_do(d) for d in doan], [len(d) / SR for d in doan])


def do_bo_tep(duong: list[str]) -> dict:
    """
    Sáu file, mỗi file một âm tiết, đúng thứ tự ma mà mả mã má mạ.

    Cách này chắc hơn hẳn cách cắt theo khoảng lặng: có nguồn tổng hợp đọc
    liền sáu âm tiết trong hơn một giây mà không chừa khoảng nghỉ nào, cắt kiểu
    gì cũng sai. Thu rời thì không có gì để cắt sai.
    """
    if len(duong) != len(BAI_THU):
        return {"loi": f"cần đúng {len(BAI_THU)} file, nhận {len(duong)}"}
    doan = [doc_wav(d) for d in duong]
    return do_cac_duong([duong_cao_do(d) for d in doan], [len(d) / SR for d in doan])


def in_ket_qua(ten: str, kq: dict) -> None:
    if "loi" in kq:
        print(f"  {ten}: {kq['loi']}")
        return
    print(f"\n  {ten}")
    print(f"    tách trung bình  {kq['tach_tb']:5.2f} nửa cung")
    print(f"    cặp gần nhất     {kq['tach_min']:5.2f} nửa cung")
    dung = sum(1 for i, h in enumerate(kq["huong"]) if h == HUONG_MONG[i])
    print(f"    hướng đúng       {dung}/6")
    for i, (am, h, d) in enumerate(zip(BAI_THU, kq["huong"], kq["dai"])):
        mui = {1: "lên", -1: "xuống", 0: "phẳng"}[h]
        mong = {1: "lên", -1: "xuống", 0: "phẳng"}[HUONG_MONG[i]]
        dau = "✓" if h == HUONG_MONG[i] else "✗"
        print(f"      {dau} {am:4s} {TEN_THANH[i]:6s} {mui:6s} (mong đợi {mong:6s})  {d*1000:4.0f} ms")
    if kq["tach_tb"] < 1.5:
        print("    ⚠ Dưới 1,5 nửa cung — sáu thanh gần như trùng nhau.")
        print("      Đây KHÔNG phải tiếng Việt đúng, và không sửa được bằng hậu kỳ.")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("tep", nargs="*", help="file audio đọc sáu âm tiết ma mà mả mã má mạ")
    ap.add_argument("--tu-kiem", action="store_true",
                    help="kiểm chính bộ đo bằng tín hiệu có cao độ biết trước")
    ap.add_argument("--am-tiet", type=int, default=6, help="số âm tiết trong file")
    ap.add_argument("--rieng", action="store_true",
                    help="mỗi file một âm tiết, đúng thứ tự ma mà mả mã má mạ")
    ap.add_argument("--ten", default="", help="tên nguồn để in ra khi dùng --rieng")
    ap.add_argument("--so-sanh", action="store_true", help="xếp hạng nhiều nguồn")
    a = ap.parse_args()

    if a.tu_kiem:
        return tu_kiem()
    if not a.tep:
        ap.error("cần ít nhất một file audio, hoặc --tu-kiem")

    print("\n  ĐO THANH ĐIỆU —", " ".join(BAI_THU))
    ket = []
    if a.rieng:
        kq = do_bo_tep(a.tep)
        ten = a.ten or os.path.basename(os.path.dirname(os.path.abspath(a.tep[0])))
        in_ket_qua(ten, kq)
        if "loi" not in kq:
            ket.append((ten, kq))
    else:
        for t in a.tep:
            kq = do_mot_tep(t, a.am_tiet)
            in_ket_qua(os.path.basename(t), kq)
            if "loi" not in kq:
                ket.append((os.path.basename(t), kq))

    if a.so_sanh and len(ket) > 1:
        print("\n  XẾP HẠNG (tách càng lớn càng rõ thanh)\n")
        for i, (ten, kq) in enumerate(sorted(ket, key=lambda x: -x[1]["tach_tb"]), 1):
            print(f"   {i}. {ten:44s} {kq['tach_tb']:5.2f} nửa cung")

    print()
    return 0 if ket else 1


if __name__ == "__main__":
    sys.exit(main())
