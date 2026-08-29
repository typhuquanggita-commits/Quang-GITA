#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sinh 01-kien-truc/07-phan-quyen-va-bao-mat.md từ data/phan_quyen.py."""
from __future__ import annotations
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "04-cong-cu" / "data"))
from phan_quyen import VAI_TRO, TAI_NGUYEN, QUYEN, TANG, BAT_BIEN  # noqa: E402

OUT = ROOT / "01-kien-truc" / "07-phan-quyen-va-bao-mat.md"

BAO_MAT = """
---

## 5. MÔ HÌNH BẢO MẬT BA LỚP — VÀ RANH GIỚI THẬT SỰ

> Phần này nói thẳng: **cái gì đang thực sự chặn được, cái gì mới chỉ là chặn nhầm lẫn.**
> Không nên tin vào một lớp bảo vệ mà nó không có khả năng cung cấp.

### Lớp 1 — Phân quyền phía trình duyệt (đang có trong bản online)

Hệ thống online hiện tại là **một trang tĩnh chạy trên máy người xem**. Phân quyền cài
trong trang có tác dụng:

- ✅ Ngăn **nhầm lẫn**: học sinh không vô tình mở phiếu lời giải trước khi làm bài;
  tư vấn không vô tình lọt vào màn hình chấm điểm.
- ✅ Cho mỗi vai trò một giao diện đúng việc của mình.
- ❌ **Không** ngăn được người cố tình: ai mở công cụ nhà phát triển của trình duyệt
  đều có thể xem toàn bộ dữ liệu nhúng trong trang, kể cả đáp án.

**Kết luận:** ở bản online hiện tại, **đáp án và đề thi phải coi như đã công khai với
bất kỳ ai được chia sẻ đường dẫn.** Vì vậy quy tắc vận hành bắt buộc:

1. **Chỉ chia sẻ đường dẫn cho đúng người cần.** Trang mặc định ở chế độ riêng tư.
2. **Không dùng bản online làm nơi thi thật.** Thi thật dùng bản in, hoặc chờ Lớp 3.
3. Vai trò quản trị trong bản online chỉ là **chế độ xem**, không phải tài khoản.

### Lớp 2 — Quyền của nền tảng xuất bản (ranh giới thật, do nền tảng thực thi)

Hai cơ chế sau **do nền tảng cưỡng chế**, người xem không vượt qua được bằng trình duyệt:

| Cơ chế | Nó chặn được gì |
|---|---|
| **Quyền chia sẻ trang** | Người chưa được chia sẻ **không mở được trang**, kể cả có đường dẫn. |
| **Luật ghi của kho dữ liệu** | Người chỉ được quyền xem **không ghi được** vào kho dữ liệu chung. Chỉ tài khoản được cấp quyền sửa mới ghi được. |

Đây là ranh giới an ninh thật của bản online. Cấu hình đang dùng:

```
capabilities: { db: { rules: [
    { path: "",      read: "interact", write: "admin"    },
    { path: "hoso",  read: "interact", write: "interact" }
]}}
```

Nghĩa là: **mọi người được chia sẻ đều đọc và ghi được hồ sơ học tập của mình**, nhưng
**chỉ người được cấp quyền sửa mới ghi được vào vùng dữ liệu chung** (cấu hình lớp,
trạng thái mở đề). Người chỉ có quyền xem không phá được dữ liệu chung.

### Lớp 3 — Hệ thống có máy chủ (lộ trình bắt buộc trước khi vận hành thật)

Muốn phân quyền là **an ninh thật** chứ không chỉ là giao diện, phải có máy chủ. Yêu cầu
tối thiểu khi triển khai:

| # | Yêu cầu | Vì sao bắt buộc |
|---:|---|---|
| 1 | Xác thực tập trung, mật khẩu băm bằng thuật toán chậm có muối | Không bao giờ lưu mật khẩu dạng đọc được |
| 2 | Xác thực hai lớp cho GV, CO, TV, ASP, AHT, GDDH, SA | Tài khoản quản trị là mục tiêu tấn công số một |
| 3 | Kiểm quyền **tại máy chủ** cho từng lời gọi, không tin dữ liệu từ trình duyệt | Trình duyệt luôn có thể bị sửa |
| 4 | Đáp án và đề thi **không gửi xuống trình duyệt** trước thời điểm được phép | Đây là lỗ hổng lớn nhất của mọi hệ thống thi trực tuyến |
| 5 | Đề thi phát theo phiên, có hạn giờ, có mã phiên riêng cho từng học viên | Chống chia sẻ đề giữa các phòng thi |
| 6 | Nhật ký bất biến cho mọi thao tác đọc hồ sơ học viên và mọi thao tác của SA | Truy vết khi có sự cố |
| 7 | Mã hoá dữ liệu khi truyền và khi lưu; sao lưu định kỳ có kiểm thử phục hồi | Bảo vệ dữ liệu trẻ em |
| 8 | Giới hạn tần suất gọi và chống dò mật khẩu | Chống tấn công tự động |
| 9 | Rà soát quyền định kỳ 6 tháng một lần; thu hồi quyền ngay khi nhân sự nghỉ việc | Quyền thừa là rủi ro tích luỹ |
| 10 | Quy trình xử lý sự cố lộ dữ liệu, có thời hạn thông báo cho phụ huynh | Nghĩa vụ với người học chưa thành niên |

---

## 6. BẢO VỆ DỮ LIỆU HỌC VIÊN

Học viên là **trẻ em**. Dữ liệu của các em được xử lý theo ba nguyên tắc:

**6.1. Thu thập tối thiểu.** Hệ thống chỉ lưu những gì phục vụ việc học: họ tên, lớp,
tuyến, kết quả bài làm. **Không** thu thập ngày sinh chi tiết, địa chỉ nhà, số điện thoại
của trẻ, hình ảnh hay bất kỳ thông tin nào không dùng để dạy học.

**6.2. Tách định danh khỏi kết quả.** Trong bản online:

- **Họ tên chỉ nằm trên máy của chính người học** (bộ nhớ trình duyệt), **không** được
  đẩy lên kho dữ liệu dùng chung.
- Kết quả học tập đẩy lên kho dữ liệu được gắn với **một mã hồ sơ ngẫu nhiên**, không
  gắn với tên.
- Hệ quả: người khác mở cùng trang không đọc được tên của em nào.

**6.3. Quyền của người học và phụ huynh.**

| Quyền | Cách thực hiện |
|---|---|
| Xem toàn bộ dữ liệu của mình | Nút **Sao chép hồ sơ** trong trang Hồ sơ học viên |
| Yêu cầu sửa dữ liệu sai | Báo giáo viên phụ trách; sửa điểm phải tạo bản chấm lại có nhật ký |
| Yêu cầu xoá dữ liệu | Nút **Xoá toàn bộ**; với hệ thống có máy chủ thì gửi yêu cầu tới Admin hệ thống |
| Biết dữ liệu được dùng làm gì | Ghi rõ trong Bản cam kết ba bên khi nhập học |

---

## 7. QUY TẮC VẬN HÀNH BẮT BUỘC

1. **Không dùng chung tài khoản.** Mỗi người một tài khoản, kể cả trợ giảng.
2. **Không gửi đáp án qua nhóm chat chung.** Phiếu GP phát đúng người, đúng thời điểm.
3. **Đề thi mốc bản `D01` chỉ mở đúng buổi thi.** Các biến thể còn lại dùng để luyện.
4. **Máy tính lớp học phải khoá màn hình khi rời chỗ**, không lưu mật khẩu trên trình duyệt.
5. **Nhân sự nghỉ việc: thu hồi quyền trong 24 giờ**, chuyển giao lớp trong 72 giờ.
6. **Mỗi 6 tháng rà soát toàn bộ danh sách tài khoản và quyền**, ghi biên bản.
7. **Sự cố lộ dữ liệu: báo Super Admin trong 1 giờ**, báo phụ huynh trong 72 giờ.

---

## 8. VIỆC CÒN LẠI TRƯỚC KHI VẬN HÀNH THẬT

- [ ] Đối chiếu ma trận quyền ở mục 3 với quy định quyền hiện hành của **GITA365** và
      chỉnh cho khớp — bảng này đang là **thiết kế đề xuất**, chưa phải bản sao quy định
      của GITA365.
- [ ] Chốt danh sách vai trò thực tế: có cần tách **Trợ giảng** khỏi Giáo viên, tách
      **Kế toán học vụ** khỏi Giám đốc điều hành hay không.
- [ ] Triển khai Lớp 3 (máy chủ) trước khi dùng hệ thống để **thi thật**.
- [ ] Ký cam kết bảo mật dữ liệu học viên với toàn bộ nhân sự có quyền đọc hồ sơ.
"""


def main() -> None:
    L = ["# HỆ PHÂN QUYỀN VÀ BẢO MẬT — HỌC VIỆN GITA", "",
         "**HỌC VIỆN PHÁT TRIỂN TÀI NĂNG TOÀN CẦU — GITA** · gita.edu.vn", "",
         "> Tài liệu này quy định **ai được làm gì với dữ liệu và học liệu nào**, và nói rõ",
         "> **ranh giới bảo mật thật sự** của bản online hiện tại. Bảng quyền được sinh tự",
         "> động từ `04-cong-cu/data/phan_quyen.py` nên tài liệu và phần mềm không lệch nhau.", "",
         "---", "", "## 1. TÁM VAI TRÒ", "",
         "| Mã | Vai trò | Bậc | Phạm vi dữ liệu | Mô tả |", "|:--:|---|:--:|---|---|"]
    for k, v in sorted(VAI_TRO.items(), key=lambda x: x[1]["bac"]):
        L.append(f"| **{k}** | {v['ten']} | {v['bac']} | {v['pham_vi']} | {v['mo_ta']} |")

    L += ["", "**Bậc** chỉ dùng để giải quyết xung đột quyền: khi hai vai trò cùng áp lên "
          "một người thì lấy quyền của bậc cao hơn, **trừ** các quy tắc bất biến ở mục 4.", "",
          "## 2. MƯỜI SÁU NHÓM TÀI NGUYÊN", "",
          "| Mã | Tài nguyên |", "|:--:|---|"]
    L += [f"| `{k}` | {v} |" for k, v in TAI_NGUYEN.items()]

    L += ["", "## 3. MA TRẬN QUYỀN", "",
          "Ký hiệu: **X** không có quyền · **R** xem · **R!** xem có điều kiện · "
          "**R°** xem bản rút gọn · **RW** xem và sửa · **RWD** xem, sửa, xoá · "
          "**A** phê duyệt hoặc cấp quyền.", "",
          "| Tài nguyên | " + " | ".join(f"**{k}**" for k in VAI_TRO) + " |",
          "|---|" + ":--:|" * len(VAI_TRO)]
    for t in TAI_NGUYEN:
        L.append(f"| {TAI_NGUYEN[t]} | " +
                 " | ".join(QUYEN[t][v][0] for v in VAI_TRO) + " |")

    L += ["", "### 3.1. Điều kiện kèm theo", "",
          "| Tài nguyên | Vai trò | Quyền | Điều kiện |", "|---|:--:|:--:|---|"]
    for t in TAI_NGUYEN:
        for v in VAI_TRO:
            q, dk = QUYEN[t][v]
            if dk:
                L.append(f"| {TAI_NGUYEN[t]} | {v} | {q} | {dk} |")

    L += ["", "## 4. CHÍN QUY TẮC BẤT BIẾN", "",
          "Không vai trò nào — kể cả Super Admin — được cấu hình để phá các quy tắc sau:", ""]
    L += [f"{i}. {r}" for i, r in enumerate(BAT_BIEN, 1)]

    L += ["", "## 5. TẦNG NĂNG LỰC HỌC VIÊN — CÁI GÌ ĐƯỢC MỞ", "",
          "Tầng được tính lại sau **mỗi lần nộp bài**, lấy trung bình ba phiếu gần nhất. "
          "Giáo viên có quyền **nâng tầng thủ công** cho một học viên, nhưng phải ghi lý do.", "",
          "| Tầng | Tên | Ngưỡng | Loại phiếu được mở | Tuyến | Biến thể đề mốc | Bộ ĐGNL |",
          "|:--:|---|---:|---|---|---|:--:|"]
    for t in TANG:
        L.append(f"| **{t['ma']}** | {t['ten']} | ≥ {t['nguong']}% | "
                 f"{', '.join(t['mo'])} | {', '.join(t['tuyen'])} | "
                 f"{', '.join(t['de_moc']) or '—'} | {'có' if t['de_nl'] else '—'} |")
    L += ["", "`T2*` nghĩa là **chỉ mở Tuyến 2 ở đúng nhóm chuyên đề mà học viên đã đạt M4**, "
          "không mở toàn bộ Tuyến 2.", "",
          "**Diễn giải từng tầng:**", ""]
    L += [f"- **{t['ma']} — {t['ten']}:** {t['mo_ta']}" for t in TANG]
    L.append("")
    # đổi số thứ tự mục của phần bảo mật cho khớp
    L.append(BAO_MAT.replace("## 5. MÔ HÌNH", "## 6. MÔ HÌNH")
             .replace("## 6. BẢO VỆ", "## 7. BẢO VỆ")
             .replace("## 7. QUY TẮC", "## 8. QUY TẮC")
             .replace("## 8. VIỆC CÒN LẠI", "## 9. VIỆC CÒN LẠI"))
    OUT.write_text("\n".join(L), encoding="utf-8")
    print(f"✔ {OUT.relative_to(ROOT)} — {len(VAI_TRO)} vai trò × {len(TAI_NGUYEN)} tài nguyên "
          f"= {len(VAI_TRO) * len(TAI_NGUYEN)} ô ma trận")


if __name__ == "__main__":
    main()
