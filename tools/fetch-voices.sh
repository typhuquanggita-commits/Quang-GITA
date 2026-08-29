#!/usr/bin/env bash
# Tải model giọng cho Piper — chạy một lần, khoảng 510 MB.
#
#   bash tools/fetch-voices.sh
#
# Model được lưu vào ~/.local/share/piper-voices (đổi bằng biến PIPER_VOICES).
set -euo pipefail

DIR="${PIPER_VOICES:-$HOME/.local/share/piper-voices}"
BASE="https://github.com/rhasspy/piper/releases/download/v0.0.2"

# Giọng dùng trong ENGWIN RADIO. Thêm bớt ở đây rồi sửa hằng VOICES
# trong tools/make-podcast.mjs cho khớp.
VOICES=(
  "voice-en-us-ryan-high"                    # Mỹ nam, chất lượng cao — vai ANH
  "voice-en-us-libritts-high"                # Mỹ, 904 giọng — vai ANH-NỮ
  "voice-en-gb-southern_english_female-low"  # Anh-Anh nữ — vai ANH-ANH
  "voice-en-gb-alan-low"                     # Anh-Anh nam — vai ANH-ANH-NAM
  "voice-vi-25hours-single-low"              # Việt, một giọng — vai DẪN và CỐ VẤN
  "voice-vi-vivos-x-low"                     # Việt, 65 giọng — để chọn giọng vùng miền
)

mkdir -p "$DIR"
cd "$DIR"

for v in "${VOICES[@]}"; do
  name="${v#voice-}"
  if [ -f "$name.onnx" ]; then
    printf '  %-30s đã có\n' "$name"
    continue
  fi
  printf '  %-30s đang tải... ' "$name"
  if curl -sLf -o "$v.tar.gz" --max-time 300 "$BASE/$v.tar.gz"; then
    tar xzf "$v.tar.gz" && rm -f "$v.tar.gz"
    printf 'xong\n'
  else
    printf 'LỖI\n'
    rm -f "$v.tar.gz"
  fi
done

echo
echo "  Thư mục: $DIR"
ls -1 "$DIR"/*.onnx 2>/dev/null | while read -r f; do
  printf '    %-34s %5.0f MB\n' "$(basename "$f")" "$(( $(stat -c%s "$f") / 1048576 ))"
done
