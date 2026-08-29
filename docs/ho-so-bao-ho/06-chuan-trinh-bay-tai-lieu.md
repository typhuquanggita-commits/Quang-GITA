# 06 · CHUẨN TRÌNH BÀY TÀI LIỆU

> Mọi tài liệu thuộc chương trình Leader Boom phải trình bày theo chuẩn này — để bộ tài liệu
> **nhìn ra là một hệ thống**, và để mỗi bản phát hành đều **truy được nguồn** khi rò rỉ.

---

## 1. Định danh tài liệu

Mọi tài liệu có một mã duy nhất, in ở bìa và chân trang.

```
LB - CT - 1.0
│    │    └── Phiên bản: <lớn>.<nhỏ>
│    └─────── Bộ tài liệu
└──────────── Thương hiệu
```

| Mã bộ | Bộ tài liệu |
|---|---|
| `CT` | Bản mô tả chương trình chuẩn |
| `LB` | `leader-boom-365/` — chương trình chuyên môn |
| `VH` | `he-thong-huan-luyen-gita/` — vận hành |
| `TV` | `thu-vien-chuyen-mon-gita/` — thư viện chuyên môn |
| `AT` | `an-toan-va-phan-quyen/` — an toàn và phân quyền |
| `TH` | `nhan-dien-thuong-hieu/` — nhận diện thương hiệu |
| `NQ` | `nhuong-quyen-leader-boom/` — nhượng quyền |
| `CĐ` | `cong-dong-leader-boom/` — cộng đồng |
| `BH` | `ho-so-bao-ho/` — hồ sơ bảo hộ |

**Ví dụ:** `LB-TV-1.0` là Thư viện chuyên môn phiên bản 1.0 · `LB-NQ-1.2` là bộ nhượng quyền
phiên bản 1.2.

**Quy tắc số phiên bản:** thay đổi nội dung chuyên môn → tăng số **lớn** *(1.0 → 2.0)* và phải
đăng ký lại · sửa lỗi, cập nhật số liệu → tăng số **nhỏ** *(1.0 → 1.1)*.

---

## 2. Trang bìa chuẩn

Bố cục cố định, không thay đổi giữa các bộ.

```
┌─────────────────────────────────────────────┐
│                                             │
│              [LOGO LEADER BOOM]             │  ← căn giữa, chiều cao 45 mm
│                                             │     vùng an toàn = chiều cao chữ "L"
│                                             │
│  ─────────────────────────────────────────  │  ← đường kẻ Vàng Kim #C6A443, dày 2 pt
│                                             │
│        TÊN TÀI LIỆU VIẾT HOA                │  ← Oswald 600, 28 pt, Xanh Sâu #0B1E8C
│        Phụ đề mô tả một dòng                │  ← Be Vietnam Pro 400, 13 pt, Xám Ghi
│                                             │
│  ─────────────────────────────────────────  │  ← đường kẻ Đường Kẻ #DDE1EA, 0,5 pt
│                                             │
│        Mã tài liệu    LB-XX-1.0             │  ← JetBrains Mono 10 pt
│        Phiên bản      1.0                   │
│        Ngày chốt      __/__/____            │
│        Chủ sở hữu     Học viện GITA         │
│        Phân loại      Nội bộ / Đối tác      │
│                                             │
│                                             │
│  ─────────────────────────────────────────  │
│  © Học viện GITA · Bản quyền được bảo hộ    │  ← chân bìa
│  Cấp cho: [TÊN ĐƠN VỊ] · Mã bản: [MÃ]       │
└─────────────────────────────────────────────┘
```

**Bốn mức phân loại — ghi ở bìa và chân trang:**

| Mức | Nhãn | Ai được xem |
|---|---|---|
| **Công khai** | `CÔNG KHAI` | Ai cũng xem được |
| **Gia đình** | `DÀNH CHO GIA ĐÌNH` | Phụ huynh học viên |
| **Nội bộ** | `NỘI BỘ` | Nhân sự Học viện |
| **Đối tác** | `ĐỐI TÁC · ĐÃ KÝ NDA` | Đơn vị nhận quyền, sau khi ký NDA |

---

## 3. Chuẩn kiểu chữ và màu

Theo [`../nhan-dien-thuong-hieu/`](../nhan-dien-thuong-hieu/README.md) — không tự chọn phông khác.

| Thành phần | Phông | Cỡ | Màu |
|---|---|---|---|
| Tên tài liệu ở bìa | **Oswald** 600, viết hoa | 28 pt | Xanh Sâu `#0B1E8C` |
| Tiêu đề cấp 1 | Oswald 600, viết hoa | 18 pt | Xanh Sâu `#0B1E8C` |
| Tiêu đề cấp 2 | Oswald 500 | 14 pt | Than `#151821` |
| Nội dung | **Be Vietnam Pro** 400 | 11 pt · **giãn dòng ≥ 1,5** | Than `#151821` |
| Chú thích, chân trang | Be Vietnam Pro 400 | 8,5 pt | Xám Ghi `#5B6273` |
| Mã, số liệu, bảng số | **JetBrains Mono** 400 | 9,5 pt | Xanh Sâu `#0B1E8C` |
| Cảnh báo bắt buộc | Be Vietnam Pro 600 | 11 pt | Đỏ Dừng `#A3231B` |

> **Giãn dòng tối thiểu 1,5 là bắt buộc** — dấu tiếng Việt chồng hai tầng, giãn dòng nhỏ hơn
> làm chữ chồng dấu. Đây là lỗi trình bày dễ thấy nhất và dễ tránh nhất.

**Ba quy tắc màu:** không dùng Vàng Boom `#FCFF00` làm màu chữ trên nền trắng *(TH-08)* ·
dùng Xanh Sâu `#0B1E8C` cho chữ và nền lớn thay cho Xanh Leader `#0000FE` · giữ tỉ lệ
**60 – 25 – 10 – 5**.

---

## 4. Chân trang và dòng bản quyền

Mọi trang, không có ngoại lệ:

```
LB-TV-1.0 · Thư viện chuyên môn GITA        NỘI BỘ         Trang 47 / 260
© Học viện GITA. Bản quyền được bảo hộ. Cấp cho: Đơn vị Hải Phòng · Bản: HP-004
```

| Thành phần | Bắt buộc | Ghi chú |
|---|---|---|
| Mã tài liệu và phiên bản | ✅ | |
| Tên tài liệu rút gọn | ✅ | |
| Mức phân loại | ✅ | |
| Số trang / tổng số trang | ✅ | Đánh liên tục cả tác phẩm |
| Dòng bản quyền | ✅ | |
| **Tên đơn vị được cấp và mã bản** | ✅ với bản cấp ra ngoài | **Đây là dấu định danh — xem §5** |
| Số Giấy chứng nhận đăng ký | Khi đã có | Thêm vào sau khi được cấp |

**Dòng bản quyền đầy đủ, đặt ở trang sau bìa:**

> © [năm] **Học viện GITA**. Bản quyền được bảo hộ.
> `LEADER BOOM`, `GITA`, `GITA 365` và bộ nhận diện thương hiệu là tài sản của Học viện GITA.
> Tài liệu này được cấp cho **[tên đơn vị]** theo hợp đồng số **[số]** ngày **[ngày]**.
> Nghiêm cấm sao chép, phân phối, hoặc tạo tác phẩm phái sinh dưới mọi hình thức khi chưa có
> sự đồng ý bằng văn bản của Học viện GITA.
> Mọi bản đều mang mã định danh riêng và có thể truy nguồn.

---

## 5. Dấu định danh từng bản — biện pháp rẻ nhất, hiệu quả nhất

**Nguyên tắc:** mỗi bản mềm hoặc bản in cấp ra ngoài mang **một mã duy nhất**, gắn với người nhận.

| Vị trí | Nội dung |
|---|---|
| Chân trang mọi trang | Tên đơn vị + mã bản |
| Chìm mờ giữa trang *(bản mềm)* | Mã bản, độ mờ 6–8%, không cản đọc |
| Siêu dữ liệu tệp | Tên người nhận, ngày cấp, mã hợp đồng |
| Sổ cấp phát | Bảng: mã bản · người nhận · ngày cấp · hợp đồng · ngày thu hồi |

**Cấu trúc mã bản:** `[MÃ ĐƠN VỊ]-[SỐ THỨ TỰ]` — ví dụ `HP-004` là bản thứ 4 cấp cho đơn vị Hải Phòng.

> Khi một tài liệu xuất hiện ở nơi không được phép, mã trên trang cho biết nó rò từ đâu.
> **Việc mọi người biết cơ chế này tồn tại đã đủ ngăn phần lớn hành vi chia sẻ ra ngoài** —
> giá trị phòng ngừa lớn hơn giá trị truy vết.

---

## 6. Cấu trúc nội dung chuẩn của một tài liệu

| Phần | Bắt buộc | Nội dung |
|---|---|---|
| **Bìa** | ✅ | Theo §2 |
| **Trang bản quyền** | ✅ | Dòng bản quyền đầy đủ · lịch sử phiên bản |
| **Mục lục** | ✅ với tài liệu > 10 trang | Có số trang |
| **Phần 1 — mục đích và phạm vi** | ✅ | Tài liệu này trả lời câu hỏi gì, ai dùng |
| **Nội dung chính** | ✅ | Đánh số mục liên tục `1.`, `1.1`, `1.1.1` |
| **Liên kết tới tài liệu khác** | ✅ | Mục cuối cùng, thống nhất toàn bộ |
| **Lịch sử phiên bản** | ✅ | Bảng: phiên bản · ngày · nội dung thay đổi · người duyệt |

**Ba quy tắc viết** áp dụng toàn hệ: nêu **cơ chế**, không nêu khẩu hiệu · mỗi tuyên bố có **số
hoặc nguồn** · **nói rõ điều hệ thống chưa biết** thay vì bỏ trống.

---

## 7. Bảng kiểm trước khi phát hành một tài liệu

| ⬜ | Hạng mục |
|---|---|
| ⬜ | Mã tài liệu và số phiên bản đúng quy tắc §1 |
| ⬜ | Bìa đúng bố cục §2, logo đúng vùng an toàn, không sửa logo *(TH-01)* |
| ⬜ | Phông chữ và màu đúng §3 · giãn dòng ≥ 1,5 |
| ⬜ | Chân trang đủ 6 thành phần bắt buộc §4 |
| ⬜ | Dòng bản quyền đầy đủ ở trang sau bìa |
| ⬜ | Mã định danh bản đã gán và đã ghi vào sổ cấp phát §5 |
| ⬜ | Mức phân loại đúng với người nhận |
| ⬜ | Đã gỡ nội dung nhóm D nếu bản này ra ngoài |
| ⬜ | Không có hình ảnh học viên thiếu đồng ý *(TH-07)* |
| ⬜ | Không hứa vượt bốn cam kết chuẩn *(TH-06)* |
| ⬜ | Lịch sử phiên bản đã cập nhật |
| ⬜ | Đã qua duyệt theo TH-09 nếu là ấn phẩm mang logo |

---

## 8. Liên kết

- Quy trình chốt phiên bản: [`07-chot-phien-ban.md`](07-chot-phien-ban.md)
- Bản mô tả chương trình chuẩn: [`05-ban-mo-ta-chuong-trinh.md`](05-ban-mo-ta-chuong-trinh.md)
- Hệ màu và kiểu chữ đầy đủ: [`../nhan-dien-thuong-hieu/03-mau-sac.md`](../nhan-dien-thuong-hieu/03-mau-sac.md) · [`../nhan-dien-thuong-hieu/04-typography.md`](../nhan-dien-thuong-hieu/04-typography.md)
- Mười quy tắc thương hiệu: [`../nhan-dien-thuong-hieu/README.md`](../nhan-dien-thuong-hieu/README.md)

---

## 9. Tệp mẫu dùng ngay

[`../../brand/mau-tai-lieu/bia-tai-lieu-chuan.html`](../../brand/mau-tai-lieu/bia-tai-lieu-chuan.html) —
mẫu ba trang khổ A4, đúng chuẩn §2, §4 và §6:

| Trang | Nội dung |
|---|---|
| 1 | **Bìa** — logo, đường kẻ Vàng Kim, tên tài liệu, khối định danh, nhãn phân loại, chân bìa có mã bản |
| 2 | **Trang bản quyền** — tuyên bố quyền đầy đủ + bảng lịch sử phiên bản |
| 3 | **Mẫu trang nội dung** — minh hoạ chân trang chuẩn sáu thành phần |

**Cách dùng:** mở tệp trong trình duyệt → sửa nội dung trong dấu `[ ]` → In → Lưu thành PDF,
khổ A4, tỉ lệ 100%, **bật in màu nền**. Logo đã nhúng sẵn trong tệp, không cần tệp rời.
