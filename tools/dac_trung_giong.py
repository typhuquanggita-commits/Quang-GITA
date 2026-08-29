#!/usr/bin/env python3
"""
Đặc trưng nhận dạng giọng nói — MFCC.

Vì sao phải có tệp này: một con số "độ sáng phổ" không đủ để phân biệt hai
giọng. Cái phân biệt người này với người kia là HÌNH DẠNG của bao phổ — vị trí
các cộng hưởng do khoang miệng và thanh quản của riêng họ tạo ra. MFCC là cách
chuẩn để mô tả hình dạng đó bằng một dãy số ngắn.

Cách làm, đúng trình tự kinh điển:
  1. Nhấn trước (pre-emphasis) để bù độ dốc tự nhiên của phổ giọng nói.
  2. Cắt khung 25ms, bước 10ms, nhân cửa sổ Hamming.
  3. Phổ công suất, rồi dồn qua 26 bộ lọc mel — thang mel mô phỏng cách tai
     người phân giải tần số: mịn ở tần thấp, thô ở tần cao.
  4. Lấy loga, rồi biến đổi cosin rời rạc để tách các hệ số ít tương quan.
  5. Giữ hệ số 1–12. Bỏ hệ số 0 vì nó chỉ là năng lượng chung — thay đổi theo
     âm lượng thu, không nói gì về chất giọng.

Chỉ lấy khung CÓ TIẾNG. Khung im lặng chỉ chứa nhiễu nền, đưa vào sẽ làm loãng.
"""
import numpy as np
import wave


def _mel(f):
    return 2595.0 * np.log10(1.0 + f / 700.0)


def _mel_nguoc(m):
    return 700.0 * (10.0 ** (m / 2595.0) - 1.0)


def _bo_loc_mel(n_loc, n_fft, sr, f_min=60.0, f_max=8000.0):
    f_max = min(f_max, sr / 2)
    diem = _mel_nguoc(np.linspace(_mel(f_min), _mel(f_max), n_loc + 2))
    bin_ = np.floor((n_fft + 1) * diem / sr).astype(int)
    fb = np.zeros((n_loc, n_fft // 2 + 1))
    for i in range(n_loc):
        a, b, c = bin_[i], bin_[i + 1], bin_[i + 2]
        if b == a:
            b = a + 1
        if c == b:
            c = b + 1
        if c >= fb.shape[1]:
            break
        fb[i, a:b] = np.linspace(0, 1, b - a, endpoint=False)
        fb[i, b:c] = np.linspace(1, 0, c - b, endpoint=False)
    return fb


def mfcc(path, n_he_so=12, n_loc=26):
    """Trả về vector đặc trưng của một file wav, hoặc None nếu không đủ tiếng."""
    with wave.open(path, "rb") as w:
        sr = w.getframerate()
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64)
    if x.size < sr // 2:
        return None
    x /= 32768.0
    x = np.append(x[0], x[1:] - 0.97 * x[:-1])          # nhấn trước

    n = int(0.025 * sr)
    hop = int(0.010 * sr)
    n_fft = 1
    while n_fft < n:
        n_fft *= 2

    khung = np.array([x[i:i + n] for i in range(0, len(x) - n, hop)])
    if khung.shape[0] < 20:
        return None
    nang_luong = np.sqrt(np.mean(khung ** 2, axis=1) + 1e-12)
    co_tieng = nang_luong > nang_luong.max() * 0.25
    khung = khung[co_tieng]
    if khung.shape[0] < 10:
        return None

    pho = np.abs(np.fft.rfft(khung * np.hamming(n), n_fft)) ** 2 / n_fft
    fb = _bo_loc_mel(n_loc, n_fft, sr)
    nang = np.log(pho @ fb.T + 1e-10)

    # DCT-II, giữ hệ số 1..n_he_so (bỏ hệ số 0 = năng lượng chung).
    k = np.arange(n_loc)
    dct = np.cos(np.pi * np.outer(np.arange(1, n_he_so + 1), (k + 0.5)) / n_loc)
    he_so = nang @ dct.T * np.sqrt(2.0 / n_loc)

    return np.concatenate([he_so.mean(axis=0), he_so.std(axis=0)])
